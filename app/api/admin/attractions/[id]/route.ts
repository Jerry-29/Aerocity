// app/api/admin/attractions/[id]/route.ts - Admin attraction details, update, delete
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
      throw new ForbiddenError("Only admins can access this");
    }

    const attractionId = parseInt(params.id, 10);
    if (isNaN(attractionId)) {
      throw new NotFoundError("Invalid attraction ID");
    }

    const attraction = await prisma.attraction.findUnique({
      where: { id: attractionId },
    });

    if (!attraction) {
      throw new NotFoundError("Attraction not found");
    }

    return NextResponse.json(
      createSuccessResponse("Attraction retrieved", attraction),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get attraction error:", error);

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
      createErrorResponse("Failed to retrieve attraction", error.message),
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
      throw new ForbiddenError("Only admins can update attractions");
    }

    const attractionId = parseInt(params.id, 10);
    if (isNaN(attractionId)) {
      throw new NotFoundError("Invalid attraction ID");
    }

    const attraction = await prisma.attraction.findUnique({
      where: { id: attractionId },
    });

    if (!attraction) {
      throw new NotFoundError("Attraction not found");
    }

    const body = await request.json();
    const { title, description, imageUrl, displayOrder } = body;

    if (displayOrder !== undefined && displayOrder < 1) {
      throw new ValidationError("displayOrder must be >= 1", "displayOrder");
    }

    const updated = await prisma.attraction.update({
      where: { id: attractionId },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(imageUrl && { imageUrl }),
        ...(displayOrder !== undefined && { displayOrder }),
      },
    });

    return NextResponse.json(
      createSuccessResponse("Attraction updated successfully", updated),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Update attraction error:", error);

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
      createErrorResponse("Failed to update attraction", error.message),
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
      throw new ForbiddenError("Only admins can delete attractions");
    }

    const attractionId = parseInt(params.id, 10);
    if (isNaN(attractionId)) {
      throw new NotFoundError("Invalid attraction ID");
    }

    const attraction = await prisma.attraction.findUnique({
      where: { id: attractionId },
    });

    if (!attraction) {
      throw new NotFoundError("Attraction not found");
    }

    await prisma.attraction.delete({
      where: { id: attractionId },
    });

    return NextResponse.json(
      createSuccessResponse("Attraction deleted successfully", {
        id: attractionId,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Delete attraction error:", error);

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
      createErrorResponse("Failed to delete attraction", error.message),
      { status: 500 },
    );
  }
}
