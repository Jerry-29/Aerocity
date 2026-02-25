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

export default async function TicketPage(props: {
  params: Promise<{ reference: string }>;
}) {
  const params = await props.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}/api/bookings/${params.reference}`, {
    // Revalidate on each request
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <section className="py-10 lg:py-16">
        <div className="mx-auto max-w-lg px-4 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Ticket Not Found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Please check your booking reference and try again.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Home className="h-4 w-4" />
              Go to Homepage
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const json = await res.json();
  const ticket = json?.data;
  const items: Array<{
    ticketId: number;
    ticketName: string;
    quantity: number;
    appliedPrice: number;
    totalPrice: number;
  }> = Array.isArray(ticket?.items) ? ticket.items : [];
  const totalAmount =
    typeof ticket?.totalAmount === "number"
      ? ticket.totalAmount
      : items.reduce(
          (s, i) => s + Number(i.appliedPrice || 0) * Number(i.quantity || 0),
          0
        );

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
                  {new Date(ticket.visitDate).toLocaleDateString("en-IN")}
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
              {items.map((t) => (
                <div
                  key={`${t.ticketId}-${t.ticketName}`}
                  className="flex items-center justify-between py-1 text-sm"
                >
                  <span className="text-card-foreground">
                    {t.ticketName} x{t.quantity}
                  </span>
                  <span className="font-medium text-card-foreground">
                    {formatPrice(t.totalPrice ?? Number(t.appliedPrice) * Number(t.quantity))}
                  </span>
                </div>
              ))}
              <div className="mt-3 flex items-center justify-between border-t pt-3">
                <span className="font-semibold text-card-foreground">
                  Total Paid
                </span>
                <span className="text-lg font-bold text-primary">
                  {formatPrice(totalAmount)}
                </span>
              </div>
            </div>

            <div className="rounded-lg bg-secondary/10 px-3 py-2 text-center text-xs font-medium text-secondary">
              Payment Status: {ticket.paymentStatus}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={`/api/bookings/${ticket.bookingReference}/ticket`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
          <Link
            href="/"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
          >
            <Download className="h-4 w-4" />
            Back to Home
          </Link>
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
