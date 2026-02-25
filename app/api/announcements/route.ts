// app/api/announcements/route.ts - Public announcements (active only)
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";

export async function GET(request: NextRequest) {
  try {
    const raw = await prisma.announcement.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    const now = new Date().toISOString().split("T")[0];
    const parseMeta = (content: string) => {
      const pr = content.match(/\[PRIORITY:(\d+)\]/i);
      const val = content.match(/\[VALID:([0-9-]+),([0-9-]+)\]/i);
      const aud = content.match(/\[AUDIENCE:(PUBLIC|AGENT|ADMIN)\]/i);
      return {
        priority: pr ? parseInt(pr[1], 10) : 0,
        validFrom: val ? val[1] : null,
        validTo: val ? val[2] : null,
        audience: aud ? aud[1].toUpperCase() : "PUBLIC",
      };
    };

    const filtered = raw
      .map((a: any) => {
        const meta = parseMeta(a.content || "");
        return { ...a, __meta: meta };
      })
      .filter((a: any) => {
        const { validFrom, validTo, audience } = a.__meta;
        if (audience !== "PUBLIC") return false;
        if (validFrom && now < validFrom) return false;
        if (validTo && now > validTo) return false;
        return true;
      })
      .sort((a: any, b: any) => {
        const pa = a.__meta.priority || 0;
        const pb = b.__meta.priority || 0;
        if (pb !== pa) return pb - pa;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .map((a: any) => {
        return {
          ...a,
          content: (a.content || "").replace(/\s*\[(PRIORITY|VALID|AUDIENCE):[^\]]+\]\s*/gi, "").trim(),
        };
      });

    return NextResponse.json(
      createSuccessResponse("Announcements retrieved", filtered),
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
