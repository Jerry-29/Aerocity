import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { ForbiddenError, NotFoundError } from "@/lib/errors";

export async function GET(request: Request, context: any) {
  try {
    const { auth, error } = await withAuth(request as any);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can access this");
    }

    const agentId = parseInt(context?.params?.id, 10);
    if (isNaN(agentId)) {
      throw new NotFoundError("Invalid agent ID");
    }

    const agent = await prisma.user.findUnique({
      where: { id: agentId },
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

    if (!agent || agent.role !== "AGENT") {
      throw new NotFoundError("Agent not found");
    }

    const [stats, recentBookings] = await Promise.all([
      prisma.booking.aggregate({
        _count: { _all: true },
        _sum: { totalAmount: true },
        where: {
          agentId,
          bookedByRole: "AGENT",
        },
      }),
      prisma.booking.findMany({
        where: {
          agentId,
          bookedByRole: "AGENT",
        },
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          bookingReference: true,
          visitDate: true,
          customerName: true,
          totalAmount: true,
          paymentStatus: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json(
      createSuccessResponse("Agent retrieved", {
        agent,
        stats: {
          totalBookings: stats._count._all || 0,
          totalRevenue: stats._sum.totalAmount || 0,
        },
        recentBookings,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get agent error:", error);

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }

    if (error instanceof NotFoundError) {
      return NextResponse.json(
        createErrorResponse("Not found", error.message),
        { status: 404 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to retrieve agent", error.message),
      { status: 500 },
    );
  }
}
