"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shield, Lock, CreditCard, Loader2 } from "lucide-react";
import { useBooking } from "@/lib/booking-context";
import { formatPrice } from "@/lib/utils";
import { apiPost } from "@/lib/api-client";
import { toast } from "sonner";

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function StepPayment() {
  const router = useRouter();
  const { formData, ticketSelections, setStep } = useBooking();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [bookingReference, setBookingReference] = useState<string>("");
  const [razorpayOrderId, setRazorpayOrderId] = useState<string>("");
  const [bookingTotalAmount, setBookingTotalAmount] = useState<number>(0);

  // Calculate total from ticket selections (for display before booking is created)
  const calculatedTotal = ticketSelections.reduce(
    (sum, t) => sum + t.totalPrice,
    0,
  );

  // Display the booking's actual total if created, otherwise show calculated total
  const displayAmount =
    bookingTotalAmount > 0 ? bookingTotalAmount : calculatedTotal;

  // Load Razorpay script on component mount
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      setIsInitializing(false);
      console.log("✅ Razorpay script loaded successfully");
    };
    script.onerror = () => {
      console.error("❌ Failed to load Razorpay script");
      toast.error("Failed to load payment system. Please refresh.");
      setIsInitializing(false);
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      console.log("🚀 Starting payment process...");

      // Step 1: Create booking via API
      console.log("📝 Creating booking...");
      const bookingResponse = await apiPost("/api/bookings", {
        visitDate: formData.visitDate?.toISOString().split("T")[0],
        customerName: formData.customerName,
        customerMobile: formData.customerMobile,
        customerEmail: formData.customerEmail || undefined,
        items: ticketSelections.map((t) => ({
          ticketId: t.categoryId,
          quantity: t.quantity,
        })),
        offerId: formData.offerApplied?.id,
        bookedByRole: "CUSTOMER",
      });

      if (!bookingResponse.success || !bookingResponse.data) {
        throw new Error(bookingResponse.message || "Failed to create booking");
      }

      const booking = bookingResponse.data;
      setBookingReference(booking.bookingReference);
      setBookingTotalAmount(Number(booking.totalAmount));
      console.log("✅ Booking created:", booking.bookingReference);
      console.log("💰 Total Amount from booking:", booking.totalAmount);
      console.log("💰 Razorpay Order ID:", booking.razorpayOrderId);

      // Step 2: Initialize Razorpay payment
      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded");
      }

      const razorpay = new window.Razorpay({
        key:
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
          process.env.RAZORPAY_KEY_ID,
        order_id: booking.razorpayOrderId,
        amount: Math.round(Number(booking.totalAmount) * 100), // Convert to paise
        currency: "INR",
        name: "Aerocity",
        description: `Booking ${booking.bookingReference}`,
        prefill: {
          name: formData.customerName,
          email: formData.customerEmail || "",
          contact: formData.customerMobile,
        },
        handler: async (response: RazorpayResponse) => {
          await handlePaymentSuccess(
            response,
            booking.bookingReference,
            Number(booking.totalAmount),
          );
        },
        modal: {
          ondismiss: () => {
            console.log("❌ Payment modal closed");
            setIsProcessing(false);
            toast.error("Payment cancelled. Please try again.");
          },
        },
      });

      console.log("🎯 Opening Razorpay payment modal...");
      setRazorpayOrderId(booking.razorpayOrderId);
      razorpay.open();
    } catch (error: any) {
      console.error("❌ Payment error:", error);
      toast.error(error.message || "Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = async (
    response: RazorpayResponse,
    bookingRef: string,
    amount: number,
  ) => {
    try {
      console.log("✅ Payment successful! Verifying with server...");
      console.log("📦 Payment response:", response);

      // Step 3: Verify payment with backend
      const verifyResponse = await apiPost("/api/bookings/verify-payment", {
        bookingReference: bookingRef,
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
        amount: amount,
      });

      if (!verifyResponse.success) {
        throw new Error(
          verifyResponse.message || "Payment verification failed",
        );
      }

      console.log("✅ Payment verified successfully!");
      console.log("🎉 Booking confirmed:", bookingRef);

      // Store confirmation data
      const confirmationData = {
        bookingReference: bookingRef,
        visitDate: formData.visitDate?.toISOString() || "",
        tickets: ticketSelections,
        customerName: formData.customerName,
        customerMobile: formData.customerMobile,
        customerEmail: formData.customerEmail,
        totalAmount: amount,
        offerApplied: formData.offerApplied,
        paymentStatus: "PAID",
        razorpayPaymentId: response.razorpay_payment_id,
        createdAt: new Date().toISOString(),
      };

      sessionStorage.setItem(
        "booking_confirmation",
        JSON.stringify(confirmationData),
      );

      // Show success
      toast.success("Payment successful! Your booking is confirmed.");

      // Redirect to confirmation page
      router.push(`/booking/confirmation?ref=${bookingRef}`);
    } catch (error: any) {
      console.error("❌ Verification error:", error);
      toast.error(error.message || "Payment verification failed");
      setIsProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <h2 className="mb-2 text-xl font-semibold text-foreground sm:text-2xl">
        Payment
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Complete your payment to confirm your booking. Your payment is secured
        and processed by Razorpay.
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
              {formatPrice(displayAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {isInitializing && (
        <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
          <p className="text-xs text-yellow-800">
            🔄 Initializing payment system...
          </p>
        </div>
      )}

      {bookingReference && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3">
          <p className="text-xs text-green-800 font-mono">
            📋 Booking: {bookingReference}
          </p>
        </div>
      )}

      {razorpayOrderId && (
        <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
          <p className="text-xs text-blue-800 font-mono">
            🛒 Order: {razorpayOrderId}
          </p>
        </div>
      )}

      {/* Security Info */}
      <div className="mb-6 flex items-start gap-3 rounded-lg bg-muted p-4">
        <Shield className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
        <div className="text-xs text-muted-foreground">
          <p className="mb-1 font-medium text-foreground">🔒 Secure Payment</p>
          <p>
            Your payment is processed securely via Razorpay. We do not store any
            card details. All transactions are encrypted and PCI DSS compliant.
          </p>
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        disabled={isProcessing || isInitializing}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing Payment...
          </>
        ) : isInitializing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading Payment System...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            Pay {formatPrice(displayAmount)} with Razorpay
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        By proceeding, you agree to our terms of service and refund policy.
      </p>

      {/* Back Button */}
      <div className="mt-6">
        <button
          onClick={() => setStep(3)}
          disabled={isProcessing || isInitializing}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Review
        </button>
      </div>
    </div>
  );
}
