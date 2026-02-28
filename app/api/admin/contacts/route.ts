// app/api/admin/contacts/route.ts - List contact queries for admin
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { createPaginatedResponse, createErrorResponse } from "@/lib/responses";
import { ForbiddenError } from "@/lib/errors";
import { listContactMessages } from "@/lib/contact-fallback";

export async function GET(request: NextRequest) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;
    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can access this");
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);
    const status = searchParams.get("status");

    const where: any = {};
    if (status) where.status = status;

    // Fallback if ContactMessage model is not yet present
    const hasModel =
      (prisma as any).contactMessage &&
      typeof (prisma as any).contactMessage.findMany === "function";

    let items: any[] = [];
    let total = 0;
    if (hasModel) {
      [items, total] = await Promise.all([
        (prisma as any).contactMessage.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        (prisma as any).contactMessage.count({ where }),
      ]);
    } else {
      const res = await listContactMessages({ status: status || undefined, page, pageSize });
      items = res.items;
      total = res.total;
    }

    return NextResponse.json(
      createPaginatedResponse("Contact queries", items, page, pageSize, total),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get contacts error:", error);
    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }
    return NextResponse.json(
      createErrorResponse("Failed to retrieve contacts", error.message),
      { status: 500 },
    );
  }
}
