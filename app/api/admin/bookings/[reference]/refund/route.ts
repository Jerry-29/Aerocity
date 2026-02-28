// app/api/admin/bookings/[reference]/refund/route.ts - Process refund
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { refundPayment } from "@/lib/razorpay-utils";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { ForbiddenError, NotFoundError, ValidationError } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const { auth, error } = await withAuth(request as any);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can process refunds");
    }

    const { pathname } = new URL(request.url);
    const segs = pathname.split("/").filter(Boolean);
    const reference = segs[segs.length - 2]; // .../bookings/[reference]/refund
    const booking = await prisma.booking.findUnique({
      where: { bookingReference: reference },
    });

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    // Check if booking was paid
    if (booking.paymentStatus !== "PAID") {
      throw new ValidationError(
        "Can only refund paid bookings. Current status: " + booking.paymentStatus,
        "paymentStatus",
      );
    }

    // Check if already refunded
// app/api/admin/bookings/[reference]/refund/route.ts
    if (booking.paymentStatus === "REFUNDED" as any) {
      throw new ValidationError("Booking is already refunded", "paymentStatus");
    }

    const body = await (request as any).json();
    const { amount, reason } = body;

    if (!reason || reason.trim().length === 0) {
      throw new ValidationError("Refund reason is required", "reason");
    }

    // Process refund via Razorpay
    if (!booking.razorpayPaymentId) {
      throw new ValidationError(
        "Cannot refund: No payment ID associated with booking",
        "razorpayPaymentId",
      );
    }

    try {
      const refund = await refundPayment(booking.razorpayPaymentId, amount);

      // Update booking status
      const updated = await prisma.booking.update({
        where: { id: booking.id },
        data: {
          paymentStatus: "REFUNDED",
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(
        createSuccessResponse("Refund processed successfully", {
          bookingReference: updated.bookingReference,
          paymentStatus: updated.paymentStatus,
          razorpayRefundId: refund.id,
          refundAmount: amount || updated.totalAmount,
        }),
        { status: 200 },
      );
    } catch (paymentError: any) {
      console.error("Razorpay refund error:", paymentError);
      throw new ValidationError(
        `Razorpay refund failed: ${paymentError.message}`,
        "razorpay",
      );
    }
  } catch (error: any) {
    console.error("Process refund error:", error);

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

    if (error instanceof ValidationError) {
      return NextResponse.json(
        createErrorResponse("Validation failed", error.message),
        { status: 400 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to process refund", error.message),
      { status: 500 },
    );
  }
}
