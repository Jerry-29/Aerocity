// app/api/attractions/route.ts - Public attractions list
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createSuccessResponse, createErrorResponse, createPaginatedResponse } from "@/lib/responses";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);
    const skip = (page - 1) * limit;

    const [attractions, total] = await Promise.all([
      prisma.attraction.findMany({
        orderBy: { displayOrder: "asc" },
        skip,
        take: limit,
      }),
      prisma.attraction.count(),
    ]);

    return NextResponse.json(
      createPaginatedResponse(
        "Attractions retrieved",
        attractions,
        page,
        limit,
        total,
      ),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get attractions error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to retrieve attractions", error.message),
      { status: 500 },
    );
  }
}
