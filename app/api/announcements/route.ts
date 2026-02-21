// app/api/announcements/route.ts - Public announcements (active only)
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";

export async function GET(request: NextRequest) {
  try {
    const announcements = await prisma.announcement.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        displayOrder: "asc",
      },
    });

    return NextResponse.json(
      createSuccessResponse("Announcements retrieved", announcements),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get announcements error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to retrieve announcements", error.message),
      { status: 500 },
    );
  }
}
