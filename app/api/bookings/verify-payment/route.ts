// app/api/bookings/verify-payment/route.ts - Verify payment and update booking
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyRazorpaySignature } from "@/lib/razorpay-utils";
import { validatePaymentVerificationRequest } from "@/lib/validators";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { ValidationError, NotFoundError } from "@/lib/errors";
import { sendWhatsAppMessage } from "@/lib/whatsapp";
import { generateTicketPDF } from "@/lib/generate-ticket-pdf";
import { uploadTicket } from "@/lib/uploadTicket";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = validatePaymentVerificationRequest(body);
    if (!validation.valid) {
      return NextResponse.json(
        createErrorResponse(
          "Validation failed",
          validation.message || "Invalid payment verification request",
          "VALIDATION_ERROR",
        ),
        { status: 400 },
      );
    }

    const { bookingReference, razorpayOrderId, razorpayPaymentId, razorpaySignature, amount } = body;

    // Use database transaction for atomic payment processing
    const result = await prisma.$transaction(async (tx) => {
      // 1. Find booking and lock it (FOR UPDATE equivalent in Prisma)
      const booking = await tx.booking.findUnique({
        where: { bookingReference },
      });

      if (!booking) {
        throw new NotFoundError("Booking not found");
      }

      // 2. IDEMPOTENCY CHECK - if already paid, return success
      if (booking.paymentStatus === "PAID" && booking.razorpayPaymentId === razorpayPaymentId) {
        return {
          success: true,
          bookingReference: booking.bookingReference,
          paymentStatus: booking.paymentStatus,
          razorpayPaymentId: booking.razorpayPaymentId,
          message: "Payment already processed",
        };
      }

      // 3. PREVENT DOUBLE-PROCESSING - if payment already exists for different booking
      if (booking.razorpayPaymentId && booking.razorpayPaymentId !== razorpayPaymentId) {
        throw new ValidationError(
          "Booking already has a different payment. Cannot process new payment.",
          "razorpayPaymentId",
        );
      }

      // 4. ORDER ID VERIFICATION
      if (booking.razorpayOrderId && booking.razorpayOrderId !== razorpayOrderId) {
        throw new ValidationError(
          "Order ID mismatch. Payment verification failed.",
          "razorpayOrderId",
        );
      }

      // 5. AMOUNT VERIFICATION (CRITICAL SECURITY CHECK)
      const bookingAmount = Number(booking.totalAmount);
      const paidAmount = Number(amount);
      const tolerance = 0.01; // Allow 1 paisa difference for rounding

      if (Math.abs(bookingAmount - paidAmount) > tolerance) {
        console.warn(
          `Amount mismatch for booking ${bookingReference}: expected ${bookingAmount}, got ${paidAmount}`,
        );
        throw new ValidationError(
          "Payment amount does not match booking total. Fraud prevention triggered.",
          "amount",
        );
      }

      // 6. VERIFY RAZORPAY SIGNATURE
      const isValid = await verifyRazorpaySignature(
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      );

      if (!isValid) {
        // Payment signature invalid - update booking to FAILED
        await tx.booking.update({
          where: { id: booking.id },
          data: {
            paymentStatus: "FAILED",
            razorpayPaymentId,
          },
        });

        throw new ValidationError(
          "Invalid payment signature. Payment not verified.",
          "razorpaySignature",
        );
      }

      // 7. PAYMENT VERIFIED - Update booking to PAID
      const updatedBooking = await tx.booking.update({
        where: { id: booking.id },
        data: {
          paymentStatus: "PAID",
          razorpayOrderId,
          razorpayPaymentId,
        },
      });

      return {
        success: true,
        bookingReference: updatedBooking.bookingReference,
        paymentStatus: updatedBooking.paymentStatus,
        razorpayPaymentId: updatedBooking.razorpayPaymentId,
      };
    });

    // Run notifications server-side so they don't depend on client connectivity.
    (async () => {
      try {
        const booking = await prisma.booking.findUnique({
          where: { bookingReference: result.bookingReference },
          include: {
            bookingItems: {
              include: {
                ticket: {
                  select: { name: true },
                },
              },
            },
          },
        });

        if (!booking) return;

        let ticketUrl: string | undefined;
        try {
          const pdfBuffer = await generateTicketPDF({
            bookingReference: booking.bookingReference,
            customerName: booking.customerName,
            customerMobile: booking.customerMobile,
            visitDate: booking.visitDate,
            totalAmount: booking.totalAmount.toString(),
            tickets: booking.bookingItems.map((item) => ({
              name: item.ticket.name,
              quantity: item.quantity,
              unitPrice: Number(item.appliedPrice),
              lineTotal: Number(item.totalPrice),
            })),
          });

          ticketUrl = await uploadTicket(pdfBuffer, booking.bookingReference);
        } catch (pdfError) {
          console.error("Ticket PDF generation/upload failed:", pdfError);
        }

        await sendWhatsAppMessage({
          phone: booking.customerMobile,
          name: booking.customerName,
          bookingId: booking.bookingReference,
          date: new Date(booking.visitDate).toISOString().split("T")[0],
          ticketsCount: booking.bookingItems.reduce(
            (sum, item) => sum + item.quantity,
            0,
          ),
          ticketUrl,
        });
      } catch (notificationError) {
        console.error("Post-payment WhatsApp notification failed:", notificationError);
      }
    })();

    return NextResponse.json(
      createSuccessResponse(
        result.message || "Payment verified successfully",
        {
          bookingReference: result.bookingReference,
          paymentStatus: result.paymentStatus,
          razorpayPaymentId: result.razorpayPaymentId,
        },
      ),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Payment verification error:", error);

    if (error instanceof ValidationError) {
      return NextResponse.json(
        createErrorResponse(
          "Validation failed",
          error.message,
          "VALIDATION_ERROR",
        ),
        { status: 400 },
      );
    }

    if (error instanceof NotFoundError) {
      return NextResponse.json(
        createErrorResponse("Not found", error.message, "NOT_FOUND"),
        { status: 404 },
      );
    }

    return NextResponse.json(
      createErrorResponse(
        "Payment verification failed",
        error.message || "Internal server error",
      ),
      { status: 500 },
    );
  }
}
