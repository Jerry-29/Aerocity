// app/api/bookings/route.ts - Create new booking
import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/booking-service";
import { validateBookingRequest } from "@/lib/validators";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { ValidationError, NotFoundError } from "@/lib/errors";
import { sendWhatsAppMessage } from "@/lib/whatsapp";
import { generateTicketPDF } from "@/lib/generate-ticket-pdf";
import { uploadTicket } from "@/lib/uploadTicket";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    validateBookingRequest(body);

    // Create booking
    const booking = await createBooking(body);

    // If offline booking (by agent or admin), generate ticket PDF now
    if (booking.paymentStatus === "PAID" || body?.paymentMethod === "OFFLINE") {
      try {
        const pdfBuffer = await generateTicketPDF({
          bookingReference: booking.bookingReference,
          customerName: booking.customerName,
          customerMobile: booking.customerMobile,
          visitDate: booking.visitDate,
          totalAmount: booking.totalAmount.toString(),
          tickets: booking.items.map((item: any) => ({
            name: item.ticketName,
            quantity: item.quantity,
            unitPrice: Number(item.appliedPrice),
            lineTotal: Number(item.totalPrice),
          })),
        });

        await uploadTicket(pdfBuffer, booking.bookingReference);
      } catch (pdfError) {
        console.error("Offline booking ticket generation failed:", pdfError);
      }
    }

    if ((body?.bookedByRole === "AGENT" || body?.bookedByRole === "ADMIN") && body?.paymentMethod === "OFFLINE") {
      (async () => {
        try {
          await sendWhatsAppMessage({
            phone: booking.customerMobile,
            name: booking.customerName,
            bookingId: booking.bookingReference,
            date: new Date(booking.visitDate).toISOString().split("T")[0],
            ticketsCount: booking.items.reduce(
              (sum: number, item: any) => sum + item.quantity,
              0,
            ),
          });
        } catch (notificationError) {
          console.error("Offline booking WhatsApp failed:", notificationError);
        }
      })();
    }

    return NextResponse.json(
      createSuccessResponse("Booking created successfully", booking),
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create booking error:", error);

    if (error instanceof ValidationError) {
      return NextResponse.json(
        createErrorResponse("Validation failed", error.message, "VALIDATION_ERROR"),
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
      createErrorResponse("Failed to create booking", error.message || "Internal server error"),
      { status: 500 },
    );
  }
}
