"use client";

import { useBooking } from "@/lib/booking-context";
import { BookingStepper } from "./booking-stepper";
import { StepDateTickets } from "./step-date-tickets";
import { StepOffer } from "./step-offer";
import { StepDetails } from "./step-details";
import { StepReview } from "./step-review";
import { StepPayment } from "./step-payment";

export function BookingFlow() {
  const { step } = useBooking();

  return (
    <div>
      <BookingStepper />
      {step === 1 && <StepDateTickets />}
      {step === 2 && <StepOffer />}
      {step === 3 && <StepDetails />}
      {step === 4 && <StepReview />}
      {step === 5 && <StepPayment />}
    </div>
  );
}
