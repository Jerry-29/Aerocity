"use client";

import { useState } from "react";
import { CalendarDays, ArrowRight, Info } from "lucide-react";
import { useBooking } from "@/lib/booking-context";
import { TicketCounter } from "./ticket-counter";
import { PriceSummary } from "./price-summary";
import { formatPrice } from "@/lib/utils";

export function StepDateTickets() {
  const {
    formData,
    categories,
    offer,
    updateVisitDate,
    updateTicket,
    setStep,
    ticketSelections,
  } = useBooking();

  const [dateError, setDateError] = useState("");

  const getTicketQty = (catId: number) => {
    return formData.tickets.find((t) => t.categoryId === catId)?.quantity || 0;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      const selected = new Date(val + "T00:00:00");
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        setDateError("Please select a future date");
        return;
      }
      setDateError("");
      updateVisitDate(selected);
    } else {
      updateVisitDate(null);
    }
  };

  const canContinue =
    formData.visitDate && ticketSelections.length > 0 && !dateError;

  // Min date for date picker (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
      {/* Main Content */}
      <div className="flex-1">
        <h2 className="mb-2 text-xl font-semibold text-foreground sm:text-2xl">
          Select Date & Tickets
        </h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Choose your visit date and the number of tickets for each category.
        </p>

        {/* Date Picker */}
        <div className="mb-8">
          <label
            htmlFor="visit-date"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground"
          >
            <CalendarDays className="h-4 w-4 text-secondary" />
            Visit Date
          </label>
          <input
            id="visit-date"
            type="date"
            min={minDate}
            value={
              formData.visitDate
                ? formData.visitDate.toISOString().split("T")[0]
                : ""
            }
            onChange={handleDateChange}
            className="w-full max-w-xs rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
          />
          {dateError && (
            <p className="mt-2 text-xs text-destructive">{dateError}</p>
          )}
        </div>

        {/* Offer Notice */}
        {offer && offer.isActive && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-accent/30 bg-accent/5 p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {offer.name} is live!
              </p>
              <p className="text-xs text-muted-foreground">
                {offer.description} Special prices already applied below.
              </p>
            </div>
          </div>
        )}

        {/* Ticket Categories */}
        <div className="flex flex-col gap-4">
          {categories.map((cat) => {
            const hasOffer = offer?.isActive && cat.offerPrice;
            return (
              <div
                key={cat.id}
                className="flex flex-col gap-4 rounded-xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-card-foreground">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cat.description}
                  </p>
                  <div className="mt-2 flex items-baseline gap-2">
                    {hasOffer ? (
                      <>
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(cat.offerPrice!)}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(cat.basePrice)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(cat.basePrice)}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      / person
                    </span>
                  </div>
                </div>
                <TicketCounter
                  value={getTicketQty(cat.id)}
                  onChange={(qty) => updateTicket(cat.id, qty)}
                />
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="mt-8">
          <button
            onClick={() => setStep(2)}
            disabled={!canContinue}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Sidebar Summary */}
      <div className="lg:w-80">
        <div className="sticky top-24">
          <PriceSummary />
        </div>
      </div>
    </div>
  );
}
