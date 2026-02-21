// app/api/admin/attractions/route.ts - Admin attractions management (list and create)
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { validateAttractionRequest } from "@/lib/validators";
import { createSuccessResponse, createErrorResponse, createPaginatedResponse } from "@/lib/responses";
import { ForbiddenError, ValidationError } from "@/lib/errors";

export async function GET(request: NextRequest) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can access this");
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const [attractions, total] = await Promise.all([
      prisma.attraction.findMany({
        orderBy: { displayOrder: "asc" },
        skip,
        take: limit,
      }),
      prisma.attraction.count(),
    ]);

    return NextResponse.json(
      createPaginatedResponse(
        "Attractions retrieved",
        attractions,
        page,
        limit,
        total,
      ),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get attractions error:", error);

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to retrieve attractions", error.message),
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can create attractions");
    }

    const body = await request.json();

    const validation = validateAttractionRequest(body);
    if (!validation.valid) {
      throw new ValidationError(validation.message, validation.field);
    }

    const { title, description, imageUrl, displayOrder } = body;

    const attraction = await prisma.attraction.create({
      data: {
        title,
        description,
        imageUrl,
        displayOrder: displayOrder || 1,
      },
    });

    return NextResponse.json(
      createSuccessResponse("Attraction created successfully", attraction),
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create attraction error:", error);

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
      createErrorResponse("Failed to create attraction", error.message),
      { status: 500 },
    );
  }
}
