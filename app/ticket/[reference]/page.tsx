import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle,
  CalendarDays,
  User,
  Phone,
  QrCode,
  Download,
  Printer,
  Home,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Your Ticket",
  description: "View and download your Aerocity Water Park e-ticket.",
};

// Mock ticket data for the public ticket view
function getMockTicket(reference: string) {
  return {
    bookingReference: reference,
    visitDate: "Sunday, March 15, 2026",
    tickets: [
      {
        categoryId: 1,
        categoryName: "Adult With Food",
        quantity: 2,
        unitPrice: 999,
        totalPrice: 1998,
      },
      {
        categoryId: 3,
        categoryName: "Kid With Food",
        quantity: 1,
        unitPrice: 749,
        totalPrice: 749,
      },
    ],
    customerName: "Priya Sharma",
    customerMobile: "9876543210",
    totalAmount: 2747,
    paymentStatus: "success" as const,
  };
}

export default async function TicketPage(props: {
  params: Promise<{ reference: string }>;
}) {
  const params = await props.params;
  const ticket = getMockTicket(params.reference);

  return (
    <section className="py-10 lg:py-16">
      <div className="mx-auto max-w-lg px-4 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <CheckCircle className="h-10 w-10 text-secondary" />
          <h1 className="text-2xl font-bold text-foreground">
            Your E-Ticket
          </h1>
          <p className="text-sm text-muted-foreground">
            Aerocity Water Park
          </p>
        </div>

        {/* Ticket Card */}
        <div className="overflow-hidden rounded-xl border-2 border-primary/20 bg-card">
          {/* Top colored band */}
          <div className="bg-primary px-6 py-4 text-center text-primary-foreground">
            <p className="text-xs opacity-80">Booking Reference</p>
            <p className="text-xl font-bold tracking-wider">
              {ticket.bookingReference}
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center border-b py-6">
            <div className="flex h-32 w-32 items-center justify-center rounded-xl bg-muted">
              <QrCode className="h-16 w-16 text-muted-foreground/40" />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4 p-6">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-4 w-4 text-secondary" />
              <div>
                <p className="text-xs text-muted-foreground">Visit Date</p>
                <p className="text-sm font-semibold text-card-foreground">
                  {ticket.visitDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-secondary" />
              <div>
                <p className="text-xs text-muted-foreground">Booked By</p>
                <p className="text-sm font-semibold text-card-foreground">
                  {ticket.customerName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-secondary" />
              <div>
                <p className="text-xs text-muted-foreground">Mobile</p>
                <p className="text-sm font-semibold text-card-foreground">
                  +91 {ticket.customerMobile}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tickets
              </h3>
              {ticket.tickets.map((t) => (
                <div
                  key={t.categoryId}
                  className="flex items-center justify-between py-1 text-sm"
                >
                  <span className="text-card-foreground">
                    {t.categoryName} x{t.quantity}
                  </span>
                  <span className="font-medium text-card-foreground">
                    {formatPrice(t.totalPrice)}
                  </span>
                </div>
              ))}
              <div className="mt-3 flex items-center justify-between border-t pt-3">
                <span className="font-semibold text-card-foreground">
                  Total Paid
                </span>
                <span className="text-lg font-bold text-primary">
                  {formatPrice(ticket.totalAmount)}
                </span>
              </div>
            </div>

            <div className="rounded-lg bg-secondary/10 px-3 py-2 text-center text-xs font-medium text-secondary">
              Payment Status: Confirmed
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>
          <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted">
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <Home className="h-4 w-4" />
            Visit Aerocity Website
          </Link>
        </div>
      </div>
    </section>
  );
}
