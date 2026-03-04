// app/api/admin/offers/[id]/route.ts - Get, update, delete offer
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { ForbiddenError, NotFoundError, ValidationError, ConflictError } from "@/lib/errors";

function embedPercent(desc: string | null | undefined, percentage?: number) {
  const base = desc?.replace(/\s*\[PERCENT:[^\]]+\]\s*/g, "")?.trim() || "";
  if (percentage === undefined || isNaN(percentage)) return base;
  return `${base} [PERCENT:${percentage}]`.trim();
}

function parseIdFromUrl(request: Request) {
  try {
    const { pathname } = new URL(request.url);
    const segs = pathname.split("/").filter(Boolean);
    const last = segs[segs.length - 1];
    return parseInt(last, 10);
  } catch {
    return NaN;
  }
}

export async function GET(request: Request) {
  try {
    const { auth, error } = await withAuth(request as any);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can access this resource");
    }

    const offerId = parseIdFromUrl(request);
    if (isNaN(offerId)) {
      throw new NotFoundError("Invalid offer ID");
    }

    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
      include: {
        offerPrices: {
          include: { ticket: true },
        },
      },
    });

    if (!offer) {
      throw new NotFoundError("Offer not found");
    }

    return NextResponse.json(
      createSuccessResponse("Offer retrieved successfully", offer),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get offer error:", error);

    if (error instanceof NotFoundError) {
      return NextResponse.json(
        createErrorResponse("Not found", error.message),
        { status: 404 },
      );
    }

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to retrieve offer", error.message),
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { auth, error } = await withAuth(request as any);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can update offers");
    }

    const offerId = parseIdFromUrl(request);
    if (isNaN(offerId)) {
      throw new NotFoundError("Invalid offer ID");
    }

    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
    });

    if (!offer) {
      throw new NotFoundError("Offer not found");
    }

    const body = await (request as any).json();

    if (body.isActive === true) {
      const existingActive = await prisma.offer.findFirst({
        where: {
          isActive: true,
          id: { not: offerId },
        },
        select: { id: true, name: true },
      });
      if (existingActive) {
        throw new ConflictError(
          `Another offer is already active (${existingActive.name}). Deactivate it before activating this one.`,
        );
      }
    }

    // Handle percentage vs per-ticket mode
    const isPercent = !!body.percentageEnabled && typeof body.percentage === "number";
    if (isPercent) {
      await prisma.offerTicketPrice.deleteMany({
        where: { offerId: offerId },
      });
      const newDesc = embedPercent(body.description ?? offer.description, body.percentage);
      await prisma.offer.update({
        where: { id: offerId },
        data: { description: newDesc },
      });
    } else {
      // When switching back to per-ticket, strip marker and allow prices to be recreated
      const cleanDesc = embedPercent(body.description ?? offer.description, undefined);
      await prisma.offer.update({
        where: { id: offerId },
        data: { description: cleanDesc },
      });
      if (body.offerPrices && Array.isArray(body.offerPrices)) {
        await prisma.offerTicketPrice.deleteMany({
          where: { offerId: offerId },
        });
      }
    }

    const updated = await prisma.offer.update({
      where: { id: offerId },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.startDate && { startDate: new Date(body.startDate) }),
        ...(body.endDate && { endDate: new Date(body.endDate) }),
        ...(body.isActive !== undefined && { isActive: body.isActive }),
        ...(!isPercent &&
          body.offerPrices &&
          Array.isArray(body.offerPrices) && {
            offerPrices: {
              create: body.offerPrices.map((price: any) => ({
                ticketId: price.ticketId,
                offerPrice: price.offerPrice,
              })),
            },
          }),
      },
      include: {
        offerPrices: {
          include: { ticket: true },
        },
      },
    });

    return NextResponse.json(
      createSuccessResponse("Offer updated successfully", updated),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Update offer error:", error);

    if (error instanceof NotFoundError) {
      return NextResponse.json(
        createErrorResponse("Not found", error.message),
        { status: 404 },
      );
    }

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }

    if (error instanceof ConflictError) {
      return NextResponse.json(
        createErrorResponse(
          error.message || "Only one offer can be active at a time",
          error.message,
          "CONFLICT",
        ),
        { status: 409 },
      );
    }

    if (error instanceof ValidationError) {
      return NextResponse.json(
        createErrorResponse("Validation failed", error.message),
        { status: 400 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to update offer", error.message),
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { auth, error } = await withAuth(request as any);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can delete offers");
    }

    const offerId = parseIdFromUrl(request);
    if (isNaN(offerId)) {
      throw new NotFoundError("Invalid offer ID");
    }

    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
    });

    if (!offer) {
      throw new NotFoundError("Offer not found");
    }

    // Delete offer (cascade will handle offerPrices)
    await prisma.offer.delete({
      where: { id: offerId },
    });

    return NextResponse.json(
      createSuccessResponse("Offer deleted successfully", { id: offerId }),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Delete offer error:", error);

    if (error instanceof NotFoundError) {
      return NextResponse.json(
        createErrorResponse("Not found", error.message),
        { status: 404 },
      );
    }

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to delete offer", error.message),
      { status: 500 },
    );
  }
}
