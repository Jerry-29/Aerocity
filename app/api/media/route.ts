// app/api/media/route.ts - Public media listing
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/db";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const type = searchParams.get("type");

    const where: any = { isPublic: true };
    if (category) where.category = category;
    if (type) where.type = type;

    const items = await prisma.media.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        type: true,
        url: true,
        thumbnailUrl: true,
        category: true,
        isPublic: true,
        createdAt: true,
      },
    });

    return NextResponse.json(createSuccessResponse("Media retrieved", items), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Get media error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to retrieve media", error.message),
      { status: 500 },
    );
  }
}

