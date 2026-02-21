// app/api/admin/testimonials/[id]/route.ts - Admin testimonial details, approve, update, delete
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

    const testimonialId = parseInt(params.id, 10);
    if (isNaN(testimonialId)) {
      throw new NotFoundError("Invalid testimonial ID");
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
    });

    if (!testimonial) {
      throw new NotFoundError("Testimonial not found");
    }

    return NextResponse.json(
      createSuccessResponse("Testimonial retrieved", testimonial),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get testimonial error:", error);

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
      createErrorResponse("Failed to retrieve testimonial", error.message),
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
      throw new ForbiddenError("Only admins can update testimonials");
    }

    const testimonialId = parseInt(params.id, 10);
    if (isNaN(testimonialId)) {
      throw new NotFoundError("Invalid testimonial ID");
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
    });

    if (!testimonial) {
      throw new NotFoundError("Testimonial not found");
    }

    const body = await request.json();
    const { isApproved, isFeatured, displayOrder, content, rating } = body;

    if (displayOrder !== undefined && displayOrder < 1) {
      throw new ValidationError("displayOrder must be >= 1", "displayOrder");
    }

    if (rating !== undefined && (rating < 1 || rating > 5)) {
      throw new ValidationError("rating must be between 1 and 5", "rating");
    }

    const updated = await prisma.testimonial.update({
      where: { id: testimonialId },
      data: {
        ...(isApproved !== undefined && { isApproved }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(displayOrder !== undefined && { displayOrder }),
        ...(content && { content }),
        ...(rating !== undefined && { rating }),
      },
    });

    return NextResponse.json(
      createSuccessResponse("Testimonial updated successfully", updated),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Update testimonial error:", error);

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
      createErrorResponse("Failed to update testimonial", error.message),
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
      throw new ForbiddenError("Only admins can delete testimonials");
    }

    const testimonialId = parseInt(params.id, 10);
    if (isNaN(testimonialId)) {
      throw new NotFoundError("Invalid testimonial ID");
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
    });

    if (!testimonial) {
      throw new NotFoundError("Testimonial not found");
    }

    await prisma.testimonial.delete({
      where: { id: testimonialId },
    });

    return NextResponse.json(
      createSuccessResponse("Testimonial deleted successfully", {
        id: testimonialId,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Delete testimonial error:", error);

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
      createErrorResponse("Failed to delete testimonial", error.message),
      { status: 500 },
    );
  }
}
