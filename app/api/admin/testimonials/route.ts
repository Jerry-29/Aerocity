// app/api/admin/testimonials/route.ts - Admin testimonials management
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { createPaginatedResponse, createErrorResponse } from "@/lib/responses";
import { ForbiddenError } from "@/lib/errors";

export async function GET(request: NextRequest) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can access this");
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const isApproved = searchParams.get("isApproved");
    const isFeatured = searchParams.get("isFeatured");

    const where: any = {};
    if (isApproved !== undefined) {
      where.isApproved = isApproved === "true";
    }
    if (isFeatured !== undefined) {
      where.isFeatured = isFeatured === "true";
    }

    const total = await prisma.testimonial.count({ where });

    const testimonials = await prisma.testimonial.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      createPaginatedResponse(testimonials, page, pageSize, total),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get admin testimonials error:", error);

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to retrieve testimonials", error.message),
      { status: 500 },
    );
  }
}
