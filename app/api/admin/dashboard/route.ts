// app/api/admin/dashboard/route.ts - Dashboard statistics and overview
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { ForbiddenError } from "@/lib/errors";

export async function GET(request: NextRequest) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can access this");
    }

    // Get counts and statistics
    const [
      totalBookings,
      totalUsers,
      totalTickets,
      totalOffers,
      totalTestimonials,
      totalAnnouncements,
      pendingValidation,
      recentBookings,
      bookingsByStatus,
      ticketPerformance,
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.user.count({ where: { role: "AGENT" } }),
      prisma.ticket.count(),
      prisma.offer.count(),
      prisma.testimonial.count(),
      prisma.announcement.count(),
      prisma.booking.count({ where: { isValidated: false } }),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          bookingReference: true,
          totalAmount: true,
          bookedByRole: true,
          isValidated: true,
          createdAt: true,
        },
      }),
      prisma.booking.groupBy({
        by: ["paymentStatus"],
        _count: { _all: true },
      }),
      prisma.bookingItem.groupBy({
        by: ["ticketId"],
        _sum: { quantity: true },
        _count: { ticketId: true },
        orderBy: { _count: { ticketId: "desc" } },
        take: 5,
      }),
    ]);

    // Get ticket details for top performers
    const topTicketIds = ticketPerformance.map((tp: any) => tp.ticketId);
    const topTickets = await prisma.ticket.findMany({
      where: { id: { in: topTicketIds } },
      select: { id: true, name: true, customerPrice: true },
    });

    const ticketPerformanceWithDetails = ticketPerformance.map((tp: any) => {
      const ticket = topTickets.find((t: any) => t.id === tp.ticketId);
      return {
        ticketId: tp.ticketId,
        ticketTitle: ticket?.name || "Unknown",
        ticketPrice: ticket?.customerPrice || 0,
        totalQuantitySold: tp._sum.quantity || 0,
        bookingCount: tp._count.ticketId,
      };
    });

    // Calculate revenue
    const totalRevenue = await prisma.booking.aggregate({
      _sum: { totalAmount: true },
    });

    // Count pending offers
    const activeOffers = await prisma.offer.count({
      where: { isActive: true },
    });

    // Testimonials stats
    const approvedTestimonials = await prisma.testimonial.count({
      where: { isApproved: true },
    });
    const featuredTestimonials = await prisma.testimonial.count({
      where: { isFeatured: true },
    });

    // Recent announcements
    const recentAnnouncements = await prisma.announcement.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        type: true,
        isActive: true,
        createdAt: true,
      },
    });

    const dashboard = {
      summary: {
        totalBookings,
        totalUsers,
        totalTickets,
        totalOffers,
        activeOffers,
        totalTestimonials,
        approvedTestimonials,
        featuredTestimonials,
        totalAnnouncements,
        pendingValidation,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
      },
      bookingsByStatus: bookingsByStatus.map((bs: any) => ({
        status: bs.paymentStatus,
        count: bs._count._all,
      })),
      recentBookings,
      topTickets: ticketPerformanceWithDetails,
      recentAnnouncements,
    };

    return NextResponse.json(
      createSuccessResponse("Dashboard statistics retrieved", dashboard),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get dashboard error:", error);

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to retrieve dashboard data", error.message),
      { status: 500 },
    );
  }
}
