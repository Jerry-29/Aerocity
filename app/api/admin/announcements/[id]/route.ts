// app/api/admin/announcements/[id]/route.ts - Admin announcement details, update, delete
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

    const announcementId = parseIdFromUrl(request);
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

export async function PUT(request: Request) {
  try {
    const { auth, error } = await withAuth(request as any);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can update announcements");
    }

    const announcementId = parseIdFromUrl(request);
    if (isNaN(announcementId)) {
      throw new NotFoundError("Invalid announcement ID");
    }

    const announcement = await prisma.announcement.findUnique({
      where: { id: announcementId },
    });

    if (!announcement) {
      throw new NotFoundError("Announcement not found");
    }

    const body = await (request as any).json();
    const { title, content, message, type, isActive, priority, validFrom, validTo, audience } = body;

    const updated = await prisma.announcement.update({
      where: { id: announcementId },
      data: {
        ...(title && { title }),
        ...(content || message
          ? { content: embedMeta(content || message, { priority, validFrom, validTo, audience }) }
          : {}),
        ...(type && { type }),
        ...(isActive !== undefined && { isActive }),
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

function embedMeta(content: string, meta: any) {
  let out = (content || "").replace(/\s*\[(PRIORITY|VALID|AUDIENCE):[^\]]+\]\s*/gi, "").trim();
  if (meta?.priority !== undefined) out += ` [PRIORITY:${Number(meta.priority) || 0}]`;
  if (meta?.validFrom && meta?.validTo) out += ` [VALID:${meta.validFrom},${meta.validTo}]`;
  if (meta?.audience) out += ` [AUDIENCE:${String(meta.audience).toUpperCase()}]`;
  return out.trim();
}

export async function DELETE(request: Request) {
  try {
    const { auth, error } = await withAuth(request as any);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can delete announcements");
    }

    const announcementId = parseIdFromUrl(request);
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
