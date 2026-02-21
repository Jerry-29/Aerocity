// app/api/admin/announcements/route.ts - Admin announcements management (list and create)
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { validateAnnouncementRequest } from "@/lib/validators";
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

    const isActive = searchParams.get("isActive");

    const where: any = {};
    if (isActive !== null) {
      where.isActive = isActive === "true";
    }

    const [announcements, total] = await Promise.all([
      prisma.announcement.findMany({
        where,
        orderBy: { displayOrder: "asc" },
        skip,
        take: limit,
      }),
      prisma.announcement.count({ where }),
    ]);

    return NextResponse.json(
      createPaginatedResponse(
        "Announcements retrieved",
        announcements,
        page,
        limit,
        total,
      ),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get announcements error:", error);

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to retrieve announcements", error.message),
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can create announcements");
    }

    const body = await request.json();

    const validation = validateAnnouncementRequest(body);
    if (!validation.valid) {
      throw new ValidationError(validation.message, validation.field);
    }

    const { title, message, type, isActive, displayOrder } = body;

    const announcement = await prisma.announcement.create({
      data: {
        title,
        message,
        type: type || "info",
        isActive: isActive !== false,
        displayOrder: displayOrder || 1,
      },
    });

    return NextResponse.json(
      createSuccessResponse("Announcement created successfully", announcement),
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create announcement error:", error);

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
      createErrorResponse("Failed to create announcement", error.message),
      { status: 500 },
    );
  }
}
