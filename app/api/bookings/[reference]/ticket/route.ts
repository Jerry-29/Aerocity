import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { generateTicketPDF } from "@/lib/generate-ticket-pdf";

export async function GET(
  request: NextRequest,
  { params }: { params: { reference: string } },
) {
  const { auth, error } = await withAuth(request);
  if (error) return error;

  const booking = await prisma.booking.findUnique({
    where: { bookingReference: params.reference },
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

  if (!booking) {
    return new Response("Booking not found", { status: 404 });
  }

  if (auth?.role === "AGENT" && booking.agentId !== auth.userId) {
    return new Response("Forbidden", { status: 403 });
  }

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

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${booking.bookingReference}.pdf"`,
    },
  });
}
