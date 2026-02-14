"use client";

import { ArrowRight, ArrowLeft, Tag, CheckCircle, Calendar } from "lucide-react";
import { useBooking } from "@/lib/booking-context";

export function StepOffer() {
  const { offer, formData, setStep } = useBooking();

  // Offers are applied automatically by the system if active
  const isApplied = !!offer?.isActive;

  const handleContinue = () => {
    setStep(3);
    if (typeof window !== "undefined") {
      const el = document.getElementById("booking-flow");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-2 text-xl font-semibold text-foreground sm:text-2xl">
        Available Offers
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Check out our current offers. Discounts are applied automatically to
        your ticket prices.
      </p>

      {offer && offer.isActive ? (
        <div
          className={`rounded-xl border-2 p-6 transition-all ${
            isApplied
              ? "border-secondary bg-secondary/5"
              : "border-border bg-card"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <Tag className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {offer.name}
                </h3>
                {isApplied && (
                  <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                    <CheckCircle className="h-3 w-3" />
                    Applied
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {offer.description}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                Valid: {offer.startDate} to {offer.endDate}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary">
              <CheckCircle className="h-4 w-4" />
              Offer applied
            </span>
            <p className="text-sm text-muted-foreground">
              This offer is applied automatically. Discount is reflected in the ticket prices.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-8 text-center">
          <Tag className="mx-auto mb-4 h-10 w-10 text-muted-foreground/40" />
          <h3 className="text-lg font-medium text-card-foreground">
            No Active Offers
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            There are no offers available right now. You can still proceed
            to book at regular prices.
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setStep(1)}
          className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          onClick={handleContinue}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
