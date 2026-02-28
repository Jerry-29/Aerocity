// app/api/admin/users/route.ts - User management (list agents and create new agents)
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { validateUserCreationRequest } from "@/lib/validators";
import { createSuccessResponse, createErrorResponse, createPaginatedResponse } from "@/lib/responses";
import { ForbiddenError, ValidationError, ConflictError } from "@/lib/errors";
import bcrypt from "bcryptjs";
// import type { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can access this");
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;
    const role = searchParams.get("role") || "AGENT";
    const isActive = searchParams.get("isActive");

    const where = {
      role: role.toUpperCase(),
    };

    if (isActive !== null) {
      (where as any).status = isActive === "true" ? "ACTIVE" : { not: "ACTIVE" };
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: where as any,
        select: {
          id: true,
          name: true,
          email: true,
          mobile: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.user.count({ where: where as any }),
    ]);

    const userIds = users.map((u) => u.id);

    const bookingStats =
      userIds.length > 0
        ? await prisma.booking.groupBy({
            by: ["agentId"],
            where: {
              agentId: { in: userIds },
              bookedByRole: "AGENT",
            },
            _count: { _all: true },
            _sum: { totalAmount: true },
          })
        : [];

    const statsMap = new Map<number, { totalBookings: number; totalRevenue: number }>();
    for (const s of bookingStats) {
      if (s.agentId === null || s.agentId === undefined) continue;
      const revenue = (s as any)?._sum?.totalAmount ?? 0;
      const revenueNumber =
        revenue && typeof revenue === "object" && typeof (revenue as any).toNumber === "function"
          ? (revenue as any).toNumber()
          : Number(revenue || 0);
      statsMap.set(s.agentId, {
        totalBookings: s._count?._all || 0,
        totalRevenue: revenueNumber,
      });
    }

    const usersWithStats = users.map((u) => {
      const stats = statsMap.get(u.id) || { totalBookings: 0, totalRevenue: 0 };
      return {
        ...u,
        totalBookings: stats.totalBookings,
        totalRevenue: stats.totalRevenue,
      };
    });

    return NextResponse.json(
      createPaginatedResponse("Users retrieved", usersWithStats, page, limit, total),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get users error:", error);

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to retrieve users", error.message),
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can create users");
    }

    const body = await request.json();

    const validation = validateUserCreationRequest(body);
    if (!validation.valid) {
      throw new ValidationError(validation.message || "Validation failed", validation.field);
    }

    const { name, email, phone, password, role } = body;
    const normalizedRole = (role || "AGENT").toUpperCase();

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { mobile: phone }],
      },
    });

    if (existingUser) {
      throw new ConflictError(
        `User with this email or phone already exists`,
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        mobile: phone,
        passwordHash: hashedPassword,
        role: normalizedRole,
        status: "ACTIVE",
        mustResetPassword: normalizedRole === "AGENT",
      },
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      createSuccessResponse("User created successfully", user),
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create user error:", error);

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }

    if (error instanceof ValidationError) {
      return NextResponse.json(
        createErrorResponse("Validation failed", error.message),
        { status: 400 },
      );
    }

    if (error instanceof ConflictError) {
      return NextResponse.json(
        createErrorResponse("Conflict", error.message),
        { status: 409 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to create user", error.message),
      { status: 500 },
    );
  }
}
