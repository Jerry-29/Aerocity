// app/api/admin/media/route.ts - Admin media list and upload
import { NextRequest, NextResponse } from "next/server";
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
    const form = await request.formData();
    const file = form.get("file") as File | null;
    const category = ((form.get("category") as string) || "GALLERY").toUpperCase();
    const type = ((form.get("type") as string) || "IMAGE").toUpperCase();
    const validTypes = new Set(["IMAGE", "VIDEO"]);
    const validCats = new Set(["GALLERY", "ATTRACTION", "GENERAL", "HERO"]);
    if (!validTypes.has(type) || !validCats.has(category)) {
      return NextResponse.json(
        createErrorResponse(
          "Please choose a valid media type and category",
          "Invalid type or category",
        ),
        { status: 400 },
      );
    }
    const activeParam = (form.get("active") as string) || "false";
    const shouldBeActive = activeParam.toLowerCase() === "true";
    if (!file) {
      return NextResponse.json(
        createErrorResponse("Validation failed", "file is required"),
        { status: 400 },
      );
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = path.extname(file.name || "").toLowerCase() || ".bin";
    const baseDir = path.join(process.cwd(), "public", "uploads");
    const subDir = path.join(
      baseDir,
      String(new Date().getFullYear()),
      String(new Date().getMonth() + 1).padStart(2, "0"),
    );
    await fs.mkdir(subDir, { recursive: true });
    const filename = `${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`;
    const fullPath = path.join(subDir, filename);
    await fs.writeFile(fullPath, buffer);
    const relPath = fullPath.split(path.join(process.cwd(), "public"))[1].replace(/\\/g, "/");
    const url = relPath.startsWith("/") ? relPath : `/${relPath}`;

    // Thumbnail generation temporarily disabled to avoid optional dependency issues (sharp)
    const thumbUrl: string | null = null;

    if (category === "HERO") {
      try {
        const heroCount = await prisma.media.count({ where: { category: "HERO" as any } });
        if (heroCount >= 2) {
          return NextResponse.json(
            createErrorResponse(
              "Limit reached: only two hero items are allowed",
              "Only two HERO items are allowed",
            ),
            { status: 400 },
          );
        }
      } catch (e: any) {
        return NextResponse.json(
          createErrorResponse(
            "Hero uploads are not enabled yet",
            "Run prisma migrate and generate to add HERO category",
          ),
          { status: 400 },
        );
      }
    }

    if (category === "HERO" && shouldBeActive) {
      try {
        await prisma.media.updateMany({
          where: { category: "HERO" as any, isPublic: true },
          data: { isPublic: false },
        });
      } catch {
        return NextResponse.json(
          createErrorResponse(
            "Hero uploads are not enabled yet",
            "Run prisma migrate and generate to add HERO category",
          ),
          { status: 400 },
        );
      }
    }

    const created = await prisma.media.create({
      data: {
        type: type as any,
        category: category as any,
        url,
        thumbnailUrl: thumbUrl || url,
        isPublic: category === "HERO" ? shouldBeActive : true,
        uploadedBy: String(auth?.userId || "admin"),
      },
    });

    return NextResponse.json(createSuccessResponse("Media uploaded", created), {
      status: 201,
    });
  } catch (error: any) {
    console.error("Admin media upload error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to upload media", error.message),
      { status: 500 },
    );
  }
}
