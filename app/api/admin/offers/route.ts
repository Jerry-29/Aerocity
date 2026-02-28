// app/api/admin/offers/route.ts - Admin offer management
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { validateOfferRequest } from "@/lib/validators";
import { createSuccessResponse, createErrorResponse, createPaginatedResponse } from "@/lib/responses";
import { ValidationError, ForbiddenError, ConflictError } from "@/lib/errors";

function embedPercent(desc: string | null | undefined, percentage?: number) {
  const base = desc?.replace(/\s*\[PERCENT:[^\]]+\]\s*/g, "")?.trim() || "";
  if (percentage === undefined || isNaN(percentage)) return base;
  return `${base} [PERCENT:${percentage}]`.trim();
}

export async function GET(request: NextRequest) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can access this resource");
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const activeOnly = searchParams.get("activeOnly") === "true";
    const ticketId = searchParams.get("ticketId");

    const where: any = {};
    if (activeOnly) {
      where.isActive = true;
    }

    if (ticketId) {
      where.offerPrices = {
        some: {
          ticketId: parseInt(ticketId, 10),
        },
      };
    }

    const total = await prisma.offer.count({ where });

    const offers = await prisma.offer.findMany({
      where,
      include: {
        offerPrices: {
          include: {
            ticket: true,
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      createPaginatedResponse(
        "Offers retrieved successfully",
        offers,
        page,
        pageSize,
        total,
      ),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get offers error:", error);

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to retrieve offers", error.message),
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can create offers");
    }

    const body = await request.json();
    const validation = validateOfferRequest(body);
    if (!validation.valid) {
      throw new ValidationError(validation.message || "Invalid request", validation.field);
    }

    const { name, description, startDate, endDate, isActive, offerPrices, percentageEnabled, percentage } = body;

    const willBeActive = isActive === undefined ? true : !!isActive;
    // Enforce maximum number of offers
    const totalOffers = await prisma.offer.count();
    if (totalOffers >= 5) {
      throw new ConflictError(
        "Maximum of 5 offers allowed. Delete or deactivate an existing offer before adding a new one.",
      );
    }
    if (willBeActive) {
      const existingActive = await prisma.offer.findFirst({
        where: { isActive: true },
        select: { id: true, name: true },
      });
      if (existingActive) {
        throw new ConflictError(
          `Another offer is already active (${existingActive.name}). Deactivate it before activating a new one.`,
        );
      }
    }

    const isPercent = !!percentageEnabled && typeof percentage === "number";

    // Create offer with offer prices or percentage flag in description
    const offer = await prisma.offer.create({
      data: {
        name,
        description: isPercent ? embedPercent(description, percentage) : (description || null),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isActive: willBeActive,
        appliesToAllCustomers: true,
        ...(isPercent
          ? {}
          : {
              offerPrices: {
                create: (offerPrices || []).map((price: any) => ({
                  ticketId: price.ticketId,
                  offerPrice: price.offerPrice,
                })),
              },
            }),
      },
      include: {
        offerPrices: {
          include: {
            ticket: true,
          },
        },
      },
    });

    return NextResponse.json(
      createSuccessResponse("Offer created successfully", offer),
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create offer error:", error);

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
      createErrorResponse("Failed to create offer", error.message),
      { status: 500 },
    );
  }
}
