// app/api/admin/media/[id]/route.ts - Admin media delete
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import path from "path";
import fs from "fs/promises";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;
    if (auth?.role !== "ADMIN") {
      return NextResponse.json(createErrorResponse("Forbidden", "Admins only"), {
        status: 403,
      });
    }
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(createErrorResponse("Not found", "Invalid id"), {
        status: 404,
      });
    }
    const body = await request.json();
    const { isPublic } = body || {};
    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) {
      return NextResponse.json(
        createErrorResponse("Not found", "Media not found"),
        { status: 404 },
      );
    }
    if (media.category === "HERO" && isPublic === true) {
      await prisma.media.updateMany({
        where: { category: "HERO", isPublic: true, NOT: { id } },
        data: { isPublic: false },
      });
    }
    const updated = await prisma.media.update({
      where: { id },
      data: {
        ...(typeof isPublic === "boolean" ? { isPublic } : {}),
      },
    });
    return NextResponse.json(createSuccessResponse("Media updated", updated), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Admin media update error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to update media", error.message),
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
      return NextResponse.json(createErrorResponse("Forbidden", "Admins only"), {
        status: 403,
      });
    }
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(createErrorResponse("Not found", "Invalid id"), {
        status: 404,
      });
    }
    const existing = await prisma.media.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        createErrorResponse("Not found", "Media not found"),
        { status: 404 },
      );
    }
    await prisma.media.delete({ where: { id } });
    try {
      if (existing.url?.startsWith("/uploads/")) {
        const filePath = path.join(process.cwd(), "public", existing.url);
        await fs.unlink(filePath).catch(() => {});
      }
      if (existing.thumbnailUrl && existing.thumbnailUrl !== existing.url && existing.thumbnailUrl.startsWith("/uploads/")) {
        const thumbPath = path.join(process.cwd(), "public", existing.thumbnailUrl);
        await fs.unlink(thumbPath).catch(() => {});
      }
    } catch {
      // ignore file deletion errors
    }
    return NextResponse.json(createSuccessResponse("Media deleted", { id }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Admin media delete error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to delete media", error.message),
      { status: 500 },
    );
  }
}
