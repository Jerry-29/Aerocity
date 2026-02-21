// app/api/admin/offers/[id]/route.ts - Get, update, delete offer
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { ForbiddenError, NotFoundError, ValidationError } from "@/lib/errors";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can access this resource");
    }

    const offerId = parseInt(params.id, 10);
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can update offers");
    }

    const offerId = parseInt(params.id, 10);
    if (isNaN(offerId)) {
      throw new NotFoundError("Invalid offer ID");
    }

    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
    });

    if (!offer) {
      throw new NotFoundError("Offer not found");
    }

    const body = await request.json();

    // Delete old offer prices if new ones provided
    if (body.offerPrices && Array.isArray(body.offerPrices)) {
      await prisma.offerTicketPrice.deleteMany({
        where: { offerId: offerId },
      });
    }

    const updated = await prisma.offer.update({
      where: { id: offerId },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.startDate && { startDate: new Date(body.startDate) }),
        ...(body.endDate && { endDate: new Date(body.endDate) }),
        ...(body.isActive !== undefined && { isActive: body.isActive }),
        ...(body.offerPrices &&
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can delete offers");
    }

    const offerId = parseInt(params.id, 10);
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
