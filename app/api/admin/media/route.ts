// app/api/admin/media/route.ts - Admin media list and upload
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { createPaginatedResponse, createErrorResponse, createSuccessResponse } from "@/lib/responses";
import path from "path";
import fs from "fs/promises";

export async function GET(request: NextRequest) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;
    if (auth?.role !== "ADMIN") {
      return NextResponse.json(createErrorResponse("Forbidden", "Admins only"), {
        status: 403,
      });
    }
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "24", 10);
    const category = searchParams.get("category");
    const type = searchParams.get("type");
    const where: any = {};
    if (category && category !== "ALL") where.category = category;
    if (type && type !== "ALL") where.type = type;

    const [items, total] = await Promise.all([
      prisma.media.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.media.count({ where }),
    ]);

    return NextResponse.json(
      createPaginatedResponse("Media list", items, page, pageSize, total),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Admin media list error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to load media", error.message),
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;
    if (auth?.role !== "ADMIN") {
      return NextResponse.json(createErrorResponse("Forbidden", "Admins only"), {
        status: 403,
      });
    }

    const body = await request.json();
    const { url, type, category, active } = body;

    if (!url || !type || !category) {
      return NextResponse.json(
        createErrorResponse("Validation failed", "URL, type, and category are required"),
        { status: 400 },
      );
    }

    const validTypes = new Set(["IMAGE", "VIDEO"]);
    const validCats = new Set(["GALLERY", "ATTRACTION", "GENERAL", "HERO"]);
    if (!validTypes.has(type) || !validCats.has(category)) {
      return NextResponse.json(
        createErrorResponse("Invalid media type or category", "Validation failed"),
        { status: 400 },
      );
    }

    const shouldBeActive = active === true;

    const media = await prisma.media.create({
      data: {
        url,
        type,
        category,
        isPublic: category === "HERO" ? shouldBeActive : true,
        uploadedBy: auth.userId.toString(),
      },
    });

    if (category === "HERO" && shouldBeActive) {
      // Deactivate other hero banners if this one is active
      await prisma.media.updateMany({
        where: { category: "HERO", id: { not: media.id } },
        data: { isPublic: false },
      });
    }

    return NextResponse.json(
      createSuccessResponse("Media saved successfully", media),
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Admin media save error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to save media", error.message),
      { status: 500 },
    );
  }
}
