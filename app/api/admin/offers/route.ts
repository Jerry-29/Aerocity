// app/api/admin/offers/route.ts - Admin offer management
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { validateOfferRequest } from "@/lib/validators";
import { createSuccessResponse, createErrorResponse, createPaginatedResponse } from "@/lib/responses";
import { ValidationError, ForbiddenError } from "@/lib/errors";

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
    validateOfferRequest(body);

    const { name, description, startDate, endDate, isActive, offerPrices } = body;

    // Create offer with offer prices
    const offer = await prisma.offer.create({
      data: {
        name,
        description: description || null,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isActive: isActive !== undefined ? isActive : true,
        appliesToAllCustomers: true,
        offerPrices: {
          create: offerPrices.map((price: any) => ({
            ticketId: price.ticketId,
            offerPrice: price.offerPrice,
          })),
        },
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
