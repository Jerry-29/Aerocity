"use client";

import { useBooking } from "@/lib/booking-context";
import { BookingStepper } from "./booking-stepper";
import { StepDateTickets } from "./step-date-tickets";
import { StepDetails } from "./step-details";
import { StepReview } from "./step-review";
import { StepPayment } from "./step-payment";

export function BookingFlow() {
  const { step } = useBooking();

  return (
    <div id="booking-flow">
      <BookingStepper />
      {step === 1 && <StepDateTickets />}
      {step === 2 && <StepDetails />}
      {step === 3 && <StepReview />}
      {step === 4 && <StepPayment />}
    </div>
  );
}
