"use client";

import { useState } from "react";
import { CalendarDays, ArrowRight, Info, Ticket } from "lucide-react";
import { useBooking } from "@/lib/booking-context";
import { TicketCounter } from "./ticket-counter";
import { PriceSummary } from "./price-summary";
import { cn, formatPrice } from "@/lib/utils";

function TicketItem({
  cat,
  qty,
  hasOffer,
  onUpdate,
}: {
  cat: any;
  qty: number;
  hasOffer: boolean;
  onUpdate: (qty: number) => void;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:border-primary/50 hover:shadow-md sm:flex-row",
        qty > 0 ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "bg-card border-border"
      )}
    >
      {/* Ticket Punch Holes (Visual Only) */}
      <div className="absolute -left-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rounded-full border bg-background sm:block" />
      <div className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rounded-full border bg-background sm:block" />

      {/* Main Content */}
      <div className="flex flex-1 flex-col p-4 sm:pr-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300",
              qty > 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
            )}>
              <Ticket className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-card-foreground">
                {cat.name}
              </h3>
              <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                Admission Ticket
              </p>
            </div>
          </div>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {cat.description}
        </p>

        <div className="mt-4 flex items-baseline gap-1.5">
          {hasOffer ? (
            <>
              <span className="text-xl font-black text-primary">
                {formatPrice(cat.offerPrice!)}
              </span>
              <span className="text-xs text-muted-foreground line-through decoration-destructive/50">
                {formatPrice(cat.basePrice)}
              </span>
              <div className="ml-1 rounded-full bg-destructive/10 px-1.5 py-0.5 text-[9px] font-bold text-destructive uppercase">
                Offer
              </div>
            </>
          ) : (
            <span className="text-xl font-black text-primary">
              {formatPrice(cat.basePrice)}
            </span>
          )}
        </div>
      </div>

      {/* Dashed Separator */}
      <div className="mx-4 border-t border-dashed border-border sm:mx-0 sm:my-4 sm:border-l sm:border-t-0" />

      {/* Control Area */}
      <div className="flex items-center justify-center p-4 sm:w-40 sm:bg-muted/30">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Quantity
          </span>
          <TicketCounter
            value={qty}
            onChange={onUpdate}
          />
          {qty > 0 && (
            <p className="animate-in fade-in slide-in-from-top-1 text-[10px] font-bold text-primary">
              Total: {formatPrice((hasOffer ? cat.offerPrice : cat.basePrice) * qty)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

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

  const toLocalYMD = (d: Date) => {
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().split("T")[0];
  };

  const getTicketQty = (catId: number) => {
    return formData.tickets.find((t) => t.categoryId === catId)?.quantity || 0;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      // Set to local noon to avoid timezone shifting to previous day
      const selected = new Date(val + "T12:00:00");
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

  const handleContinue = () => {
    // advance step then scroll the booking flow into view so the stepper is visible
    setStep(2);
    if (typeof window !== "undefined") {
      const el = document.getElementById("booking-flow");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      // fallback to top of page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
            value={formData.visitDate ? toLocalYMD(formData.visitDate) : ""}
            onChange={handleDateChange}
            className="w-full max-w-xs rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
          />
          {dateError && (
            <p className="mt-2 text-xs text-destructive">{dateError}</p>
          )}
        </div>

        {/* Offer Notice */}
        {offer && offer.isActive && (() => {
          const raw = offer.description || "";
          const match = raw.match(/\[PERCENT:([0-9]+(\.[0-9]+)?)\]/);
          const pct = match ? parseFloat(match[1]) : null;
          const cleaned = raw.replace(/\s*\[PERCENT:[^\]]+\]\s*/g, "").trim();
          const body = pct !== null
            ? `${pct}% discount on all tickets. Special prices already applied below.`
            : cleaned
              ? `${cleaned} Special prices already applied below.`
              : "Special prices already applied below.";
          return (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-accent/30 bg-accent/5 p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {offer.name} is live!
                </p>
                <p className="text-xs text-muted-foreground">
                  {body}
                </p>
              </div>
            </div>
          );
        })()}

        {/* Ticket Categories */}
        <div className="flex flex-col gap-6">
          {categories.map((cat) => (
            <TicketItem
              key={cat.id}
              cat={cat}
              qty={getTicketQty(cat.id)}
              hasOffer={!!(offer?.isActive && cat.offerPrice)}
              onUpdate={(qty) => updateTicket(cat.id, qty)}
            />
          ))}
        </div>

        {/* Continue Button */}
        <div className="mt-8">
          <button
            onClick={handleContinue}
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
