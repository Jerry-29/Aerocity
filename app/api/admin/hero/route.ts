// app/api/admin/hero/route.ts - Admin hero selection
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth-middleware";
import { prisma } from "@/lib/db";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";

export async function GET(request: NextRequest) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;
    if (auth?.role !== "ADMIN") {
      return NextResponse.json(createErrorResponse("Forbidden", "Admins only"), {
        status: 403,
      });
    }
    const hero = await prisma.media.findFirst({
      where: { category: "HERO", isPublic: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(createSuccessResponse("Hero media", hero), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Admin get hero error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to load hero", error.message),
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
    const { id } = body || {};
    if (!id) {
      return NextResponse.json(
      createErrorResponse("Please select a hero item", "id is required"),
        { status: 400 },
      );
    }
    const media = await prisma.media.findUnique({ where: { id: Number(id) } });
    if (!media || media.category !== "HERO") {
      return NextResponse.json(
      createErrorResponse(
        "Please upload/select from the Hero category",
        "media must be in HERO category",
      ),
        { status: 400 },
      );
    }
    await prisma.media.updateMany({
      where: { category: "HERO", isPublic: true, NOT: { id: Number(id) } },
      data: { isPublic: false },
    });
    await prisma.media.update({
      where: { id: Number(id) },
      data: { isPublic: true },
    });
    return NextResponse.json(createSuccessResponse("Hero updated", { id }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Admin set hero error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to set hero", error.message),
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;
    if (auth?.role !== "ADMIN") {
      return NextResponse.json(createErrorResponse("Forbidden", "Admins only"), {
        status: 403,
      });
    }
    await prisma.media.updateMany({
      where: { category: "HERO", isPublic: true },
      data: { isPublic: false },
    });
    return NextResponse.json(createSuccessResponse("Hero cleared", {}), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Admin clear hero error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to clear hero", error.message),
      { status: 500 },
    );
  }
}
