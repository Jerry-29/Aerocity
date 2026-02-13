"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  User,
  Phone,
  Mail,
  CreditCard,
  QrCode,
  ShieldCheck,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog";
import { formatPrice } from "@/lib/utils";
import { mockBookings } from "@/lib/admin-data";

export default function AdminBookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reference = params.reference as string;
  const booking = mockBookings.find((b) => b.bookingReference === reference);

  const [showCancel, setShowCancel] = useState(false);
  const [showValidate, setShowValidate] = useState(false);

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-semibold text-foreground">Booking not found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Reference: {reference}
        </p>
        <button
          type="button"
          onClick={() => router.push("/admin/bookings")}
          className="mt-4 text-sm font-medium text-primary hover:underline"
        >
          Back to Bookings
        </button>
      </div>
    );
  }

  const totalTickets = booking.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Back + Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/bookings")}
          className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {booking.bookingReference}
          </h1>
          <p className="text-sm text-muted-foreground">
            Booked on{" "}
            {new Date(booking.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main info */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Booking Info */}
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-foreground">
              Booking Information
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Visit Date</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(booking.visitDate).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <QrCode className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Payment Status</p>
                  <StatusBadge status={booking.paymentStatus} />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Payment Method</p>
                  <StatusBadge status={booking.paymentMethod} />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Entry Validated</p>
                  <p className="text-sm font-medium text-foreground">
                    {booking.isValidated
                      ? `Yes - ${new Date(
                          booking.validatedAt!
                        ).toLocaleString("en-IN")}`
                      : "Not yet"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-foreground">
              Customer Details
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {booking.customerName}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {booking.customerMobile}
                </span>
              </div>
              {booking.customerEmail && (
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {booking.customerEmail}
                  </span>
                </div>
              )}
              {booking.agentName && (
                <div className="mt-2 rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Booked by Agent</p>
                  <p className="text-sm font-medium text-foreground">
                    {booking.agentName}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Ticket Breakdown */}
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-foreground">
              Ticket Breakdown
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-right">Qty</th>
                    <th className="px-4 py-2 text-right">Base Price</th>
                    <th className="px-4 py-2 text-right">Applied Price</th>
                    <th className="px-4 py-2 text-center">Offer</th>
                    <th className="px-4 py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {booking.items.map((item) => (
                    <tr key={item.ticketCategoryId} className="border-b last:border-0">
                      <td className="px-4 py-3 font-medium text-foreground">
                        {item.ticketName}
                      </td>
                      <td className="px-4 py-3 text-right">{item.quantity}</td>
                      <td className="px-4 py-3 text-right">
                        {formatPrice(item.basePrice)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {formatPrice(item.appliedPrice)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {item.isOfferApplied ? (
                          <CheckCircle2 className="mx-auto h-4 w-4 text-green-600" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        {formatPrice(item.totalPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar summary */}
        <div className="flex flex-col gap-4">
          {/* Summary Card */}
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-base font-semibold text-foreground">
              Summary
            </h3>
            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Total Tickets
                </span>
                <span className="font-medium text-foreground">
                  {totalTickets}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">
                  {formatPrice(booking.totalAmount)}
                </span>
              </div>
              {booking.discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(booking.discountAmount)}</span>
                </div>
              )}
              <div className="border-t pt-2">
                <div className="flex justify-between text-base font-bold">
                  <span className="text-foreground">Total Paid</span>
                  <span className="text-primary">
                    {formatPrice(booking.finalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          {(booking.razorpayOrderId || booking.razorpayPaymentId) && (
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="mb-3 text-base font-semibold text-foreground">
                Razorpay Details
              </h3>
              <div className="flex flex-col gap-2 text-xs">
                {booking.razorpayOrderId && (
                  <div>
                    <p className="text-muted-foreground">Order ID</p>
                    <p className="font-mono text-foreground">
                      {booking.razorpayOrderId}
                    </p>
                  </div>
                )}
                {booking.razorpayPaymentId && (
                  <div>
                    <p className="text-muted-foreground">Payment ID</p>
                    <p className="font-mono text-foreground">
                      {booking.razorpayPaymentId}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2">
            {!booking.isValidated && booking.paymentStatus === "PAID" && (
              <button
                type="button"
                onClick={() => setShowValidate(true)}
                className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
              >
                <ShieldCheck className="h-4 w-4" />
                Validate Entry
              </button>
            )}
            {booking.paymentStatus === "PAID" && (
              <button
                type="button"
                onClick={() => setShowCancel(true)}
                className="flex items-center justify-center gap-2 rounded-lg border border-destructive px-4 py-2.5 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
              >
                <XCircle className="h-4 w-4" />
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={showCancel}
        title="Cancel Booking"
        description={`Are you sure you want to cancel booking ${booking.bookingReference}? This action cannot be undone and a refund may need to be processed.`}
        confirmLabel="Cancel Booking"
        variant="destructive"
        onConfirm={() => {
          setShowCancel(false);
          // Will call API
        }}
        onCancel={() => setShowCancel(false)}
      />
      <ConfirmDialog
        open={showValidate}
        title="Validate Entry"
        description={`Mark booking ${booking.bookingReference} as validated? This confirms the customer has entered the park.`}
        confirmLabel="Validate"
        onConfirm={() => {
          setShowValidate(false);
          // Will call API
        }}
        onCancel={() => setShowValidate(false)}
      />
    </div>
  );
}
