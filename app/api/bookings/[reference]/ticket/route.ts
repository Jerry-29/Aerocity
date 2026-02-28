import { NextResponse } from 'next/server';
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { generateTicketPDF } from "@/lib/generate-ticket-pdf";

export async function GET(request: Request) {
  const { auth, error } = await withAuth(request as any);
  if (error) return error;

  const { pathname } = new URL(request.url);
  const segs = pathname.split("/").filter(Boolean);
  const reference = segs[segs.length - 1];
  const booking = await prisma.booking.findUnique({
    where: { bookingReference: reference },
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
    return NextResponse.json("Booking not found" as any, { status: 404 });
  }

  if (auth?.role === "AGENT" && booking.agentId !== auth.userId) {
    return NextResponse.json("Forbidden" as any, { status: 403 });
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

  return new NextResponse(pdfBuffer as any, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${booking.bookingReference}.pdf"`,
    },
  });
}
