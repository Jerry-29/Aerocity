"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Loader2,
  Mail,
  Minus,
  Phone,
  Plus,
  Ticket,
  User,
} from "lucide-react";
import { cn, formatPrice, validateEmail, validateMobile } from "@/lib/utils";
import { apiGet, apiPost, isSuccessResponse } from "@/lib/api-client";

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

interface TicketSelection {
  categoryId: number;
  categoryName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface TicketOption {
  id: number;
  name: string;
  description: string;
  customerPrice: number;
  agentPrice: number;
}

const STEPS = [
  { step: 1, label: "Date & Tickets" },
  { step: 2, label: "Customer Details" },
  { step: 3, label: "Review" },
  { step: 4, label: "Payment" },
];

export default function AdminBookPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [visitDate, setVisitDate] = useState("");
  const [tickets, setTickets] = useState<Record<number, number>>({});
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"ONLINE" | "OFFLINE">(
    "OFFLINE",
  );
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [availableTickets, setAvailableTickets] = useState<TicketOption[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(true);
  const [razorpayReady, setRazorpayReady] = useState(false);

  const selections: TicketSelection[] = useMemo(() => {
    return availableTickets
      .filter((t) => (tickets[t.id] || 0) > 0)
      .map((t) => ({
        categoryId: t.id,
        categoryName: t.name,
        quantity: tickets[t.id],
        unitPrice: t.customerPrice,
        totalPrice: t.customerPrice * tickets[t.id],
      }));
  }, [availableTickets, tickets]);

  const totalAmount = selections.reduce((s, t) => s + t.totalPrice, 0);
  const totalTickets = selections.reduce((s, t) => s + t.quantity, 0);

  useEffect(() => {
    const fetchTickets = async () => {
      setTicketsLoading(true);
      setError("");
      const response = await apiGet<TicketOption[]>("/api/tickets");
      if (!isSuccessResponse(response)) {
        setError(response.error || response.message || "Failed to load tickets");
        setAvailableTickets([]);
        setTicketsLoading(false);
        return;
      }
      const data = Array.isArray(response.data) ? response.data : [];
      setAvailableTickets(
        data.map((ticket) => ({
          id: ticket.id,
          name: ticket.name,
          description: ticket.description,
          customerPrice: Number(ticket.customerPrice),
          agentPrice: Number(ticket.agentPrice),
        })),
      );
      setTicketsLoading(false);
    };
    fetchTickets();
  }, []);

  useEffect(() => {
    const existing = document.getElementById("razorpay-checkout");
    if (existing) {
      setRazorpayReady(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-checkout";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayReady(true);
    script.onerror = () => {
      setRazorpayReady(false);
      setError("Failed to load payment system. Please refresh.");
    };
    document.body.appendChild(script);
  }, []);

  const updateQty = (id: number, delta: number) => {
    setTickets((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, Math.min(20, current + delta));
      return { ...prev, [id]: next };
    });
  };

  const canNext = () => {
    if (step === 1) return !ticketsLoading && visitDate && totalTickets > 0;
    if (step === 2) return name.trim() && validateMobile(mobile);
    if (step === 3) return true;
    return false;
  };

  const handleNext = () => {
    setError("");
    if (step === 2) {
      if (!name.trim()) {
        setError("Customer name is required");
        return;
      }
      if (!validateMobile(mobile)) {
        setError("Enter a valid 10-digit mobile number");
        return;
      }
      if (email && !validateEmail(email)) {
        setError("Enter a valid email address");
        return;
      }
    }
    setStep((s) => s + 1);
  };

  const downloadTicket = async (reference: string) => {
    try {
      const response = await fetch(`/api/bookings/${reference}/ticket`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to download ticket");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${reference}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to download ticket");
    }
  };

  const handlePay = async () => {
    setProcessing(true);
    setError("");
    try {
      const items = selections.map((item) => ({
        ticketId: item.categoryId,
        quantity: item.quantity,
      }));

      const response = await apiPost<{
        bookingReference: string;
        totalAmount: number | string;
        razorpayOrderId?: string | null;
      }>("/api/bookings", {
        visitDate,
        items,
        customerName: name.trim(),
        customerMobile: mobile.trim(),
        customerEmail: email.trim() || undefined,
        bookedByRole: "CUSTOMER",
        paymentMethod,
      });

      if (!isSuccessResponse(response)) {
        setError(response.error || response.message || "Failed to create booking");
        return;
      }

      const createdBooking = response.data;

      if (paymentMethod === "ONLINE") {
        if (!razorpayReady || !window.Razorpay) {
          setError("Payment system is not ready. Please refresh and try again.");
          return;
        }

        const razorpayOrderId = createdBooking.razorpayOrderId;
        if (!razorpayOrderId) {
          setError("Missing payment order. Please try again.");
          return;
        }

        const amount = Number(createdBooking.totalAmount) || 0;
        const razorpay = new window.Razorpay({
          key:
            process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
            process.env.RAZORPAY_KEY_ID,
          order_id: razorpayOrderId,
          amount: Math.round(amount * 100),
          currency: "INR",
          name: "Aerocity",
          description: `Booking ${createdBooking.bookingReference}`,
          prefill: {
            name: name.trim(),
            email: email.trim() || "",
            contact: mobile.trim(),
          },
          handler: async (response: RazorpayResponse) => {
            const verify = await apiPost("/api/bookings/verify-payment", {
              bookingReference: createdBooking.bookingReference,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              amount,
            });

            if (!isSuccessResponse(verify)) {
              setError(
                verify.error || verify.message || "Payment verification failed",
              );
              setProcessing(false);
              return;
            }

            setBookingRef(createdBooking.bookingReference);
            setCompleted(true);
            setProcessing(false);
            downloadTicket(createdBooking.bookingReference);
          },
          modal: {
            ondismiss: () => {
              setProcessing(false);
              setError("Payment cancelled. Please try again.");
            },
          },
        });
        razorpay.open();
        return;
      }

      setBookingRef(createdBooking.bookingReference);
      setCompleted(true);
      downloadTicket(createdBooking.bookingReference);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create booking");
    } finally {
      if (paymentMethod !== "ONLINE") {
        setProcessing(false);
      }
    }
  };

  const today = new Date().toISOString().split("T")[0];

  if (completed) {
    return (
      <div className="mx-auto max-w-lg py-8 text-center">
        <div className="rounded-xl border bg-card p-8 shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Booking Confirmed!
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The booking has been created successfully.
          </p>
          <div className="mt-4 rounded-lg bg-muted/50 px-4 py-3">
            <p className="text-xs text-muted-foreground">Booking Reference</p>
            <p className="text-lg font-bold font-mono text-primary">
              {bookingRef}
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-left">
            <div>
              <p className="text-xs text-muted-foreground">Customer</p>
              <p className="font-medium text-foreground">{name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Mobile</p>
              <p className="font-medium text-foreground">{mobile}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Visit Date</p>
              <p className="font-medium text-foreground">
                {new Date(visitDate).toLocaleDateString("en-IN")}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="font-bold text-primary">
                {formatPrice(totalAmount)}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => router.push(`/admin/bookings/${bookingRef}`)}
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              View Booking
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setVisitDate("");
                setTickets({});
                setName("");
                setMobile("");
                setEmail("");
                setPaymentMethod("OFFLINE");
                setCompleted(false);
                setBookingRef("");
              }}
              className="rounded-lg border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Book Tickets</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create a customer booking with admin access
        </p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {STEPS.map((s) => (
          <div
            key={s.step}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors",
              step === s.step
                ? "bg-primary text-primary-foreground"
                : step > s.step
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                step === s.step
                  ? "bg-primary-foreground text-primary"
                  : step > s.step
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted-foreground/20 text-muted-foreground",
              )}
            >
              {step > s.step ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                s.step
              )}
            </span>
            {s.label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {error && (
            <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div className="rounded-xl border bg-card p-5 shadow-sm">
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CalendarDays className="h-4 w-4" />
                  Visit Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-64"
                />
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-foreground">
                  Select Tickets
                </h3>
                {ticketsLoading && (
                  <div className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
                    Loading tickets...
                  </div>
                )}
                {!ticketsLoading && availableTickets.length === 0 && (
                  <div className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
                    No tickets available right now.
                  </div>
                )}
                {!ticketsLoading &&
                  availableTickets.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                          <Ticket className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {t.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t.description}
                          </p>
                          <p className="mt-0.5 text-sm font-bold text-secondary">
                            {formatPrice(t.customerPrice)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQty(t.id, -1)}
                          disabled={(tickets[t.id] || 0) <= 0}
                          className="flex h-8 w-8 items-center justify-center rounded-md border text-foreground disabled:opacity-30"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-foreground">
                          {tickets[t.id] || 0}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(t.id, 1)}
                          disabled={(tickets[t.id] || 0) >= 20}
                          className="flex h-8 w-8 items-center justify-center rounded-md border text-foreground disabled:opacity-30"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="mb-4 text-base font-semibold text-foreground">
                Customer Information
              </h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Customer Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) =>
                        setMobile(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="10-digit mobile number"
                      className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Email (optional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="customer@email.com"
                      className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4">
              <div className="rounded-xl border bg-card p-5 shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-foreground">
                  Booking Summary
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Visit Date</p>
                    <p className="font-medium text-foreground">
                      {new Date(visitDate).toLocaleDateString("en-IN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Customer</p>
                    <p className="font-medium text-foreground">{name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Mobile</p>
                    <p className="font-medium text-foreground">{mobile}</p>
                  </div>
                  {email && (
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{email}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl border bg-card p-5 shadow-sm">
                <h3 className="mb-3 text-base font-semibold text-foreground">
                  Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("OFFLINE")}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors",
                      paymentMethod === "OFFLINE"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    <Banknote className="h-6 w-6 text-green-600" />
                    <span className="text-sm font-medium text-foreground">
                      Offline Payment
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Cash / UPI
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("ONLINE")}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors",
                      paymentMethod === "ONLINE"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    <CreditCard className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      Online Payment
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Razorpay
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="mb-4 text-base font-semibold text-foreground">
                Confirm and Pay
              </h3>
              <div className="flex flex-col gap-3 text-sm">
                {selections.map((s) => (
                  <div
                    key={s.categoryId}
                    className="flex items-center justify-between"
                  >
                    <span className="text-muted-foreground">
                      {s.categoryName} x{s.quantity}
                    </span>
                    <span className="font-medium text-foreground">
                      {formatPrice(s.totalPrice)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between text-base font-semibold">
                    <span>Total</span>
                    <span className="text-primary">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePay}
                disabled={processing || (paymentMethod === "ONLINE" && !razorpayReady)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    Confirm Booking
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-base font-semibold text-foreground">
              Summary
            </h3>
            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Tickets</span>
                <span className="font-medium text-foreground">
                  {totalTickets}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">
                  {formatPrice(totalAmount)}
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between text-base font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => (step > 1 ? setStep((s) => s - 1) : router.back())}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!canNext() || step === 4}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground hover:brightness-110 disabled:opacity-50"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
