// app/api/hero/route.ts - Public hero media (image or video)
import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(_request: NextRequest) {
  try {
    const startedAt = Date.now();
    const cid = `hero_${Math.random().toString(36).slice(2, 10)}`;
    console.log(JSON.stringify({
      cid,
      tag: "HERO_API_REQUEST",
      path: "/api/hero",
      ua: _request.headers.get("user-agent") || "",
      ip: _request.headers.get("x-forwarded-for") || "",
    }));
    let hero: any = null;
    try {
      const active = await prisma.media.findFirst({
        where: { category: "HERO" as any, isPublic: true },
        orderBy: { createdAt: "desc" },
      });
      console.log(JSON.stringify({
        cid,
        tag: "HERO_DB_ACTIVE",
        found: !!active,
        id: active?.id || null,
        type: active?.type || null,
        url: active?.url || null,
      }));

      hero =
        active ||
        (await prisma.media.findFirst({
          where: { category: "HERO" as any },
          orderBy: { createdAt: "desc" },
        }));
      if (!active) {
        console.log(JSON.stringify({
          cid,
          tag: "HERO_DB_FALLBACK",
          hero_id: hero?.id || null,
          type: hero?.type || null,
        }));
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
    console.log(JSON.stringify({
      cid,
      tag: "HERO_API_RESPONSE",
      duration_ms: Date.now() - startedAt,
      status: 200,
      hero_id: hero?.id || null,
      type: hero?.type || null,
      category: hero?.category || null,
      has_url: !!hero?.url,
    }));
    return NextResponse.json(createSuccessResponse("Hero media", hero), {
      status: 200,
    });
  } catch (error: any) {
    console.error(JSON.stringify({
      tag: "HERO_API_ERROR",
      path: "/api/hero",
      message: error?.message || String(error),
      stack: error?.stack || undefined,
    }));
    return NextResponse.json(
      createErrorResponse("Failed to load hero media", error.message),
      { status: 500 },
    );
  }
}
