"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  CalendarDays,
  User,
  Phone,
  Mail,
  Download,
  Printer,
  Home,
  QrCode,
  Tag,
} from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";
import { apiGet } from "@/lib/api-client";
import type { BookingConfirmation } from "@/lib/types";
import { buildTicketHtml } from "@/lib/ticket-template";

// Add print styles
const printStyles = `
  @media print {
    * { margin: 0 !important; padding: 0 !important; }
    body > * { display: none !important; }
    .ticket-container { display: block !important; }
    .no-print { display: none !important; }
  }
`;

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref");
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    if (!reference) return;

    const fetchBooking = async () => {
      try {
        const response = await apiGet(`/api/bookings/${reference}`);
        if (response.success) {
          const bookingData = response.data as any;
          setBooking(bookingData);
          // Generate QR code with just the booking reference (simpler QR code)
          const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${bookingData.bookingReference}`;
          setQrCodeUrl(qrUrl);
        }
      } catch (error) {
        console.error("Error fetching booking:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [reference]);

  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading your booking...</p>
        </div>
      </section>
    );
  }

  if (!booking) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            No Booking Found
          </h1>
          <p className="text-muted-foreground">
            We could not find your booking details. Please try booking again.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Book Tickets
          </Link>
        </div>
      </section>
    );
  }

  const handlePrint = () => {
    // Open a new window with the ticket
    const printWindow = window.open("", "PRINT", "height=800,width=1000");
    if (!printWindow) {
      alert("Please allow pop-ups to print the ticket");
      return;
    }

    const ticketHTML = buildTicketHtml({
      bookingReference: booking.bookingReference,
      visitDate: booking.visitDate,
      customerName: booking.customerName,
      customerMobile: booking.customerMobile,
      totalAmount: booking.totalAmount,
      qrCodeUrl,
      bookingItems: (booking?.bookingItems || []).map((item: any) => ({
        ticketName: item.ticketName,
        quantity: item.quantity,
        appliedPrice: item.appliedPrice,
      })),
    });
    printWindow.document.write(ticketHTML);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 250);
  };

  const handleDownloadPDF = () => {
    // Open a new window with the ticket
    const printWindow = window.open("", "PRINT", "height=800,width=1000");
    if (!printWindow) {
      alert("Please allow pop-ups to download the ticket");
      return;
    }

    const ticketHTML = buildTicketHtml({
      bookingReference: booking.bookingReference,
      visitDate: booking.visitDate,
      customerName: booking.customerName,
      customerMobile: booking.customerMobile,
      totalAmount: booking.totalAmount,
      qrCodeUrl,
      includePrintButton: true,
      bookingItems: (booking?.bookingItems || []).map((item: any) => ({
        ticketName: item.ticketName,
        quantity: item.quantity,
        appliedPrice: item.appliedPrice,
      })),
    });
    printWindow.document.write(ticketHTML);
    printWindow.document.close();
  };

  const visitDate = new Date(booking.visitDate);

  return (
    <section className="py-10 lg:py-16">
      <div className="mx-auto max-w-2xl px-4 lg:px-8">
        {/* Success Banner */}
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
            <CheckCircle className="h-10 w-10 text-secondary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Booking Confirmed!
          </h1>
          <p className="text-muted-foreground">
            Your tickets have been booked successfully. A confirmation
            WhatsApp message has been sent to your mobile.
          </p>
        </div>

        {/* Booking Reference */}
        <div className="ticket-to-print">
          <div className="mb-6 rounded-xl border-2 border-secondary bg-secondary/5 p-6 text-center">
            <p className="text-xs text-muted-foreground">Booking Reference</p>
            <p className="mt-1 text-2xl font-bold tracking-wider text-primary">
              {booking.bookingReference}
            </p>
          </div>

          {/* QR Code */}
          <div className="mb-6 flex flex-col items-center gap-3 rounded-xl border bg-card p-6">
            {qrCodeUrl ? (
              <>
                <img src={qrCodeUrl} alt="Booking QR Code" className="h-40 w-40 rounded-lg" />
                <p className="text-xs text-muted-foreground">
                  Show this QR code at the park entrance for quick entry
                </p>
              </>
            ) : (
              <div className="flex h-40 w-40 items-center justify-center rounded-xl bg-muted">
                <QrCode className="h-20 w-20 text-muted-foreground/40" />
              </div>
            )}
          </div>

          {/* Booking Details */}
          <div className="flex flex-col gap-4">
          {/* Visit Date */}
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-xs text-muted-foreground">Visit Date</p>
                <p className="font-semibold text-card-foreground">
                  {formatDate(visitDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Tickets */}
          <div className="rounded-xl border bg-card p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Tickets
            </h3>
            <div className="flex flex-col gap-2">
              {booking?.bookingItems?.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-card-foreground">
                    {item.ticketName}{" "}
                    <span className="text-muted-foreground">x{item.quantity}</span>
                  </span>
                  <span className="font-medium text-card-foreground">
                    {formatPrice(item.totalPrice)}
                  </span>
                </div>
              ))}
              {booking.offer && (
                <div className="mt-2 flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-2 text-xs text-accent">
                  <Tag className="h-3.5 w-3.5" />
                  {booking.offer.name} applied
                </div>
              )}
              <div className="mt-2 flex items-center justify-between border-t pt-3">
                <span className="text-base font-semibold text-card-foreground">
                  Total Paid
                </span>
                <span className="text-xl font-bold text-primary">
                  {formatPrice(booking.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="rounded-xl border bg-card p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Booked By
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-card-foreground">
                  {booking.customerName}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-card-foreground">
                  +91 {booking.customerMobile}
                </span>
              </div>
              {booking.customerEmail && (
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-card-foreground">
                    {booking.customerEmail}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>

        {/* Actions */}
        <div className="no-print mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handlePrint}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
          >
            <Printer className="h-4 w-4" />
            Print Ticket
          </button>
          <button
            onClick={handleDownloadPDF}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>

        <div className="no-print mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted-foreground">Loading confirmation...</p>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}

