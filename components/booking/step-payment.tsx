"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shield, Lock, CreditCard, Loader2 } from "lucide-react";
import { useBooking } from "@/lib/booking-context";
import { formatPrice, generateBookingReference } from "@/lib/utils";

export function StepPayment() {
  const router = useRouter();
  const { totalAmount, formData, ticketSelections, setStep } = useBooking();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate booking reference and store in sessionStorage for confirmation page
    const bookingRef = generateBookingReference();
    const confirmationData = {
      bookingReference: bookingRef,
      visitDate: formData.visitDate?.toISOString() || "",
      tickets: ticketSelections,
      customerName: formData.customerName,
      customerMobile: formData.customerMobile,
      customerEmail: formData.customerEmail,
      totalAmount,
      offerApplied: formData.offerApplied,
      paymentStatus: "success" as const,
      createdAt: new Date().toISOString(),
    };

    sessionStorage.setItem(
      "booking_confirmation",
      JSON.stringify(confirmationData)
    );

    router.push(`/booking/confirmation?ref=${bookingRef}`);
  };

  return (
    <div className="mx-auto max-w-lg">
      <h2 className="mb-2 text-xl font-semibold text-foreground sm:text-2xl">
        Payment
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Complete your payment to confirm your booking.
      </p>

      {/* Payment Summary Card */}
      <div className="mb-6 rounded-xl border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Payment Summary
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
          <div className="flex items-center justify-between border-t pt-3">
            <span className="text-lg font-semibold text-card-foreground">
              Total
            </span>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="mb-6 flex items-start gap-3 rounded-lg bg-muted p-4">
        <Shield className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
        <div className="text-xs text-muted-foreground">
          <p className="mb-1 font-medium text-foreground">Secure Payment</p>
          <p>
            Your payment is processed securely via Razorpay. We do not store
            any card details. All transactions are encrypted and PCI DSS
            compliant.
          </p>
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            Pay {formatPrice(totalAmount)} with Razorpay
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        By proceeding, you agree to our terms of service and refund policy.
      </p>

      {/* Back Button */}
      <div className="mt-6">
        <button
          onClick={() => setStep(4)}
          disabled={isProcessing}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Review
        </button>
      </div>
    </div>
  );
}
