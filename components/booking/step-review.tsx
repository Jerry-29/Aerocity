"use client";

import {
  ArrowLeft,
  CalendarDays,
  User,
  Phone,
  Mail,
  Tag,
  Pencil,
  CreditCard,
} from "lucide-react";
import { useBooking } from "@/lib/booking-context";
import { formatPrice, formatDate } from "@/lib/utils";

export function StepReview() {
  const { formData, ticketSelections, totalAmount, categories, offer, setStep } =
    useBooking();

  const savings = ticketSelections.reduce((sum, t) => {
    const cat = categories.find((c) => c.id === t.categoryId);
    if (!cat || !formData.offerApplied || !cat.offerPrice) return sum;
    return sum + (cat.basePrice - cat.offerPrice) * t.quantity;
  }, 0);

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-2 text-xl font-semibold text-foreground sm:text-2xl">
        Review Your Booking
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Please review all details before proceeding to payment.
      </p>

      <div className="flex flex-col gap-6">
        {/* Visit Date */}
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-xs text-muted-foreground">Visit Date</p>
                <p className="font-semibold text-card-foreground">
                  {formData.visitDate
                    ? formatDate(formData.visitDate)
                    : "Not selected"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setStep(1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
              aria-label="Edit date"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Tickets */}
        <div className="rounded-xl border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Tickets
            </h3>
            <button
              onClick={() => setStep(1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
              aria-label="Edit tickets"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {ticketSelections.map((t) => (
              <div
                key={t.categoryId}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-card-foreground">
                  {t.categoryName}{" "}
                  <span className="text-muted-foreground">x{t.quantity}</span>
                </span>
                <span className="font-medium text-card-foreground">
                  {formatPrice(t.totalPrice)}
                </span>
              </div>
            ))}
          </div>

          {formData.offerApplied && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-2 text-sm">
              <Tag className="h-4 w-4 text-accent" />
              <span className="text-accent">
                {formData.offerApplied.name} applied
              </span>
              {savings > 0 && (
                <span className="ml-auto font-medium text-secondary">
                  -{formatPrice(savings)}
                </span>
              )}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <span className="text-base font-semibold text-card-foreground">
              Total Amount
            </span>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(totalAmount)}
            </span>
          </div>
        </div>

        {/* Customer Details */}
        <div className="rounded-xl border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Your Details
            </h3>
            <button
              onClick={() => setStep(3)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
              aria-label="Edit details"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-card-foreground">
                {formData.customerName}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-card-foreground">
                +91 {formData.customerMobile}
              </span>
            </div>
            {formData.customerEmail && (
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-card-foreground">
                  {formData.customerEmail}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setStep(3)}
          className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          onClick={() => setStep(5)}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
        >
          <CreditCard className="h-4 w-4" />
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
