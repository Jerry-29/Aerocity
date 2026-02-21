import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/db";
import { generateTicketPDF } from "@/lib/generate-ticket-pdf";
import { uploadTicket } from "@/lib/uploadTicket";

export async function POST(req: Request) {
  try {
    const { phone, ticketUrl, bookingId, name, date } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "phone is required" },
        { status: 400 },
      );
    }

    let resolvedTicketUrl: string | undefined = ticketUrl;

    if (!resolvedTicketUrl && bookingId) {
      try {
        const resource = await cloudinary.api.resource(`tickets/${bookingId}`, {
          resource_type: "raw",
        });
        resolvedTicketUrl = resource.secure_url;
      } catch(error) {
        console.error("Error fetching ticket from Cloudinary:", error);
        try {
          const booking = await prisma.booking.findUnique({
            where: { bookingReference: bookingId },
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

          if (booking) {
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

            resolvedTicketUrl = await uploadTicket(
              pdfBuffer,
              booking.bookingReference,
            );
          }
        } catch (regenerateError) {
          console.error("Ticket regenerate/upload failed:", regenerateError);
        }
      }
    }

    if (!resolvedTicketUrl) {
      return NextResponse.json(
        { error: "ticketUrl is required (or provide bookingId for lookup)" },
        { status: 400 },
      );
    }

    const cleanPhone = phone.replace(/\D/g, "");
console.log(resolvedTicketUrl)
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: cleanPhone,
          type: "document",
          document: {
            link: resolvedTicketUrl,
            filename: `${bookingId || "ticket"}.pdf`,
            caption: `🎟️ Your Ticket\n${name ? `Name: ${name}\n` : ""}${bookingId ? `Booking: ${bookingId}\n` : ""}${date ? `Date: ${date}` : ""}`.trim(),
          },
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to send document" },
      { status: 500 },
    );
  }
}
