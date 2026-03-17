// app/api/hero/route.ts - Public hero media (image or video)
import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { prisma } from "@/lib/db";

export async function GET(_request: NextRequest) {
  try {
    console.log("API_HERO: Received request to fetch hero media.");
    let hero: any = null;
    try {
      const active = await prisma.media.findFirst({
        where: { category: "HERO" as any, isPublic: true },
        orderBy: { createdAt: "desc" },
      });
      console.log("API_HERO: Found active (isPublic: true) hero in DB:", active);

      hero =
        active ||
        (await prisma.media.findFirst({
          where: { category: "HERO" as any },
          orderBy: { createdAt: "desc" },
        }));
      if (!active) {
        console.log("API_HERO: No active hero found, using fallback hero:", hero);
      }
    } catch {
      hero = null;
    }
    // Fallback: use the latest GENERAL (public) if no HERO available
    if (!hero) {
      try {
        hero = await prisma.media.findFirst({
          where: { category: "GENERAL" as any, isPublic: true },
          orderBy: { createdAt: "desc" },
        });
      } catch {
        // ignore
      }
    }
    if (!hero) {
      try {
        hero = await prisma.media.findFirst({
          where: { category: "GALLERY" as any, isPublic: true },
          orderBy: { createdAt: "desc" },
        });
      } catch {
        // ignore
      }
    }
    return NextResponse.json(createSuccessResponse("Hero media", hero), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Get hero error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to load hero media", error.message),
      { status: 500 },
    );
  }
}
