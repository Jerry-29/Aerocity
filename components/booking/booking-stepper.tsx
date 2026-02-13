"use client";

import { Check } from "lucide-react";
import { BOOKING_STEPS } from "@/lib/constants";
import { useBooking } from "@/lib/booking-context";

export function BookingStepper() {
  const { step } = useBooking();

  return (
    <nav aria-label="Booking progress" className="mb-8">
      <ol className="flex items-center justify-between">
        {BOOKING_STEPS.map((s, index) => {
          const isCompleted = step > s.step;
          const isCurrent = step === s.step;
          const isLast = index === BOOKING_STEPS.length - 1;

          return (
            <li
              key={s.step}
              className={`flex items-center ${isLast ? "" : "flex-1"}`}
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all sm:h-10 sm:w-10 ${
                    isCompleted
                      ? "bg-secondary text-secondary-foreground"
                      : isCurrent
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    s.step
                  )}
                </div>
                <span
                  className={`hidden text-center text-xs font-medium sm:block ${
                    isCurrent
                      ? "text-primary"
                      : isCompleted
                        ? "text-secondary"
                        : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={`mx-2 h-0.5 flex-1 rounded-full transition-all sm:mx-4 ${
                    isCompleted ? "bg-secondary" : "bg-muted"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
