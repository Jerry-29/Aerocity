import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";

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

