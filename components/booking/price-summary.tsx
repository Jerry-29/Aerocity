"use client";

import { useBooking } from "@/lib/booking-context";
import { formatPrice } from "@/lib/utils";

export function PriceSummary() {
  const { ticketSelections, totalAmount, formData, categories, offer } = useBooking();

  if (ticketSelections.length === 0) {
    return null;
  }

  // Calculate savings using the applied offer (if any)
  const appliedOffer = formData.offerApplied ?? offer;
  const savings = ticketSelections.reduce((sum, t) => {
    const cat = categories.find((c) => c.id === t.categoryId);
    if (!cat || !appliedOffer || !cat.offerPrice) return sum;
    return sum + (cat.basePrice - cat.offerPrice) * t.quantity;
  }, 0);

  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Order Summary
      </h3>
      <div className="flex flex-col gap-3">
        {ticketSelections.map((t) => (
          <div
            key={t.categoryId}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-muted-foreground">
              {t.categoryName} x{t.quantity}
            </span>
            <span className="font-medium text-card-foreground">
              {formatPrice(t.totalPrice)}
            </span>
          </div>
        ))}
        {savings > 0 && (
          <div className="flex items-center justify-between border-t pt-3 text-sm">
            <span className="text-secondary">You save</span>
            <span className="font-medium text-secondary">
              -{formatPrice(savings)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-base font-semibold text-card-foreground">
            Total
          </span>
          <span className="text-xl font-bold text-primary">
            {formatPrice(totalAmount)}
          </span>
        </div>
        {appliedOffer && (
          <div className="rounded-lg bg-accent/10 px-3 py-2 text-xs text-accent">
            Offer applied: {appliedOffer.name}
          </div>
        )}
      </div>
    </div>
  );
}
