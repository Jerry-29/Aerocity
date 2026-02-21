// app/api/admin/announcements/[id]/route.ts - Admin announcement details, update, delete
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

    const announcementId = parseInt(params.id, 10);
    if (isNaN(announcementId)) {
      throw new NotFoundError("Invalid announcement ID");
    }

    const announcement = await prisma.announcement.findUnique({
      where: { id: announcementId },
    });

    if (!announcement) {
      throw new NotFoundError("Announcement not found");
    }

    return NextResponse.json(
      createSuccessResponse("Announcement retrieved", announcement),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get announcement error:", error);

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
      createErrorResponse("Failed to retrieve announcement", error.message),
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
      throw new ForbiddenError("Only admins can update announcements");
    }

    const announcementId = parseInt(params.id, 10);
    if (isNaN(announcementId)) {
      throw new NotFoundError("Invalid announcement ID");
    }

    const announcement = await prisma.announcement.findUnique({
      where: { id: announcementId },
    });

    if (!announcement) {
      throw new NotFoundError("Announcement not found");
    }

    const body = await request.json();
    const { title, message, type, isActive, displayOrder } = body;

    if (displayOrder !== undefined && displayOrder < 1) {
      throw new ValidationError("displayOrder must be >= 1", "displayOrder");
    }

    const updated = await prisma.announcement.update({
      where: { id: announcementId },
      data: {
        ...(title && { title }),
        ...(message && { message }),
        ...(type && { type }),
        ...(isActive !== undefined && { isActive }),
        ...(displayOrder !== undefined && { displayOrder }),
      },
    });

    return NextResponse.json(
      createSuccessResponse("Announcement updated successfully", updated),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Update announcement error:", error);

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
      createErrorResponse("Failed to update announcement", error.message),
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
      throw new ForbiddenError("Only admins can delete announcements");
    }

    const announcementId = parseInt(params.id, 10);
    if (isNaN(announcementId)) {
      throw new NotFoundError("Invalid announcement ID");
    }

    const announcement = await prisma.announcement.findUnique({
      where: { id: announcementId },
    });

    if (!announcement) {
      throw new NotFoundError("Announcement not found");
    }

    await prisma.announcement.delete({
      where: { id: announcementId },
    });

    return NextResponse.json(
      createSuccessResponse("Announcement deleted successfully", {
        id: announcementId,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Delete announcement error:", error);

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
      createErrorResponse("Failed to delete announcement", error.message),
      { status: 500 },
    );
  }
}
