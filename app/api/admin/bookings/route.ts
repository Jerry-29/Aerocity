// app/api/admin/bookings/route.ts - List and manage bookings
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
      throw new ForbiddenError("Only admins can access bookings");
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const status = searchParams.get("status"); // PENDING, PAID, FAILED, REFUNDED
    const agentId = searchParams.get("agentId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const bookedByRole = searchParams.get("bookedByRole"); // CUSTOMER, AGENT
    const isValidated = searchParams.get("isValidated");
    const search = searchParams.get("search");

    const where: any = {};

    if (status) {
      where.paymentStatus = status;
    }

    if (agentId) {
      where.agentId = parseInt(agentId, 10);
    }

    if (bookedByRole) {
      where.bookedByRole = bookedByRole;
    }

    if (isValidated !== undefined) {
      where.isValidated = isValidated === "true";
    }

    if (search && search.trim().length > 0) {
      where.OR = [
        {
          bookingReference: {
            contains: search.trim(),
            mode: "insensitive",
          },
        },
        {
          customerName: {
            contains: search.trim(),
            mode: "insensitive",
          },
        },
      ];
    }

    if (startDate && endDate) {
      where.visitDate = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    } else if (startDate) {
      where.visitDate = {
        gte: new Date(startDate),
      };
    } else if (endDate) {
      where.visitDate = {
        lte: new Date(endDate),
      };
    }

    const total = await prisma.booking.count({ where });

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        bookingItems: {
          include: { ticket: true },
        },
        offer: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    const formattedBookings = bookings.map((booking: any) => ({
      id: booking.id,
      bookingReference: booking.bookingReference,
      visitDate: booking.visitDate,
      bookedByRole: booking.bookedByRole,
      agentId: booking.agentId,
      customerName: booking.customerName,
      customerMobile: booking.customerMobile,
      customerEmail: booking.customerEmail,
      totalAmount: booking.totalAmount,
      items: booking.bookingItems.map((item: any) => ({
        ticketId: item.ticketId,
        ticketName: item.ticket.name,
        quantity: item.quantity,
        basePrice: item.basePrice,
        appliedPrice: item.appliedPrice,
        isOfferApplied: item.isOfferApplied,
        totalPrice: item.totalPrice,
      })),
      paymentStatus: booking.paymentStatus,
      razorpayOrderId: booking.razorpayOrderId,
      razorpayPaymentId: booking.razorpayPaymentId,
      isValidated: booking.isValidated,
      validatedAt: booking.validatedAt,
      offerApplied: booking.offer
        ? { id: booking.offer.id, name: booking.offer.name }
        : null,
      createdAt: booking.createdAt,
    }));

    return NextResponse.json(
      createPaginatedResponse(
        "Bookings retrieved successfully",
        formattedBookings,
        page,
        pageSize,
        total,
      ),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get bookings error:", error);

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to retrieve bookings", error.message),
      { status: 500 },
    );
  }
}
