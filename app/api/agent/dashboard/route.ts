import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { ForbiddenError } from "@/lib/errors";

export async function GET(request: NextRequest) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "AGENT") {
      throw new ForbiddenError("Only agents can access this");
    }

    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [bookingsToday, totalBookings, revenueThisMonth, recentBookings] =
      await Promise.all([
        prisma.booking.count({
          where: {
            agentId: auth.userId,
            bookedByRole: "AGENT",
            createdAt: {
              gte: startOfToday,
              lte: endOfToday,
            },
          },
        }),
        prisma.booking.count({
          where: {
            agentId: auth.userId,
            bookedByRole: "AGENT",
          },
        }),
        prisma.booking.aggregate({
          _sum: { totalAmount: true },
          where: {
            agentId: auth.userId,
            bookedByRole: "AGENT",
            createdAt: { gte: startOfMonth },
          },
        }),
        prisma.booking.findMany({
          where: {
            agentId: auth.userId,
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
      createSuccessResponse("Agent dashboard loaded", {
        stats: {
          bookingsToday,
          totalBookings,
          revenueThisMonth: Number(revenueThisMonth._sum.totalAmount || 0),
        },
        recentBookings: recentBookings.map((booking: {
          id: number;
          bookingReference: string;
          visitDate: Date | string;
          customerName: string;
          totalAmount: any;
          paymentStatus: string;
          createdAt: Date | string;
        }) => ({
          id: booking.id,
          bookingReference: booking.bookingReference,
          visitDate: booking.visitDate,
          customerName: booking.customerName,
          totalAmount: booking.totalAmount,
          paymentStatus: booking.paymentStatus,
          createdAt: booking.createdAt,
        })),
      }),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Agent dashboard error:", error);

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to load agent dashboard", error.message),
      { status: 500 },
    );
  }
}
