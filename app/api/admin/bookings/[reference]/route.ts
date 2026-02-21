// app/api/admin/bookings/[reference]/route.ts - Get booking details
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { ForbiddenError, NotFoundError } from "@/lib/errors";

export async function GET(
  request: NextRequest,
  { params }: { params: { reference: string } },
) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can access this");
    }

    const booking = await prisma.booking.findUnique({
      where: { bookingReference: params.reference },
      include: {
        bookingItems: {
          include: { ticket: true },
        },
        offer: true,
      },
    });

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    const formattedBooking = {
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
      updatedAt: booking.updatedAt,
    };

    return NextResponse.json(
      createSuccessResponse("Booking retrieved successfully", formattedBooking),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get booking error:", error);

    if (error instanceof NotFoundError) {
      return NextResponse.json(
        createErrorResponse("Not found", error.message),
        { status: 404 },
      );
    }

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to retrieve booking", error.message),
      { status: 500 },
    );
  }
}
