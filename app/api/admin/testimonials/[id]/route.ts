// app/api/admin/testimonials/[id]/route.ts - Admin testimonial details, approve, update, delete
import { NextResponse } from 'next/server';
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { ForbiddenError, NotFoundError, ValidationError } from "@/lib/errors";

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
      throw new ForbiddenError("Only admins can access this");
    }

    const testimonialId = parseIdFromUrl(request);
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

export async function PUT(request: Request) {
  try {
    const { auth, error } = await withAuth(request as any);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can update testimonials");
    }

    const testimonialId = parseIdFromUrl(request);
    if (isNaN(testimonialId)) {
      throw new NotFoundError("Invalid testimonial ID");
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
    });

    if (!testimonial) {
      throw new NotFoundError("Testimonial not found");
    }

    const body = await (request as any).json();
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

export async function DELETE(request: Request) {
  try {
    const { auth, error } = await withAuth(request as any);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can delete testimonials");
    }

    const testimonialId = parseIdFromUrl(request);
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
