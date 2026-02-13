"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Minus,
  Plus,
  User,
  Phone,
  Mail,
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle2,
  CreditCard,
  Banknote,
  Ticket,
} from "lucide-react";
import { cn, formatPrice, validateMobile, validateEmail, generateBookingReference } from "@/lib/utils";
import { mockAdminTickets } from "@/lib/admin-data";

interface TicketSelection {
  categoryId: number;
  categoryName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

const STEPS = [
  { step: 1, label: "Date & Tickets" },
  { step: 2, label: "Customer Details" },
  { step: 3, label: "Review" },
  { step: 4, label: "Payment" },
];

export default function AgentBookPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [visitDate, setVisitDate] = useState("");
  const [tickets, setTickets] = useState<Record<number, number>>({});
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"ONLINE" | "OFFLINE">(
    "OFFLINE"
  );
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const selections: TicketSelection[] = useMemo(() => {
    return mockAdminTickets
      .filter((t) => (tickets[t.id] || 0) > 0)
      .map((t) => ({
        categoryId: t.id,
        categoryName: t.name,
        quantity: tickets[t.id],
        unitPrice: t.agentPrice,
        totalPrice: t.agentPrice * tickets[t.id],
      }));
  }, [tickets]);

  const totalAmount = selections.reduce((s, t) => s + t.totalPrice, 0);
  const totalTickets = selections.reduce((s, t) => s + t.quantity, 0);

  const updateQty = (id: number, delta: number) => {
    setTickets((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, Math.min(20, current + delta));
      return { ...prev, [id]: next };
    });
  };

  const canNext = () => {
    if (step === 1) return visitDate && totalTickets > 0;
    if (step === 2)
      return name.trim() && validateMobile(mobile);
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

  const handlePay = async () => {
    setProcessing(true);
    setError("");
    await new Promise((r) => setTimeout(r, 1500));
    const ref = generateBookingReference();
    setBookingRef(ref);
    setCompleted(true);
    setProcessing(false);
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
              onClick={() =>
                router.push(`/agent/bookings/${bookingRef}`)
              }
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
          Create a new booking for a customer at agent pricing
        </p>
      </div>

      {/* Stepper */}
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
                : "bg-muted text-muted-foreground"
            )}
          >
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                step === s.step
                  ? "bg-primary-foreground text-primary"
                  : step > s.step
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted-foreground/20 text-muted-foreground"
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
        {/* Main Content */}
        <div className="lg:col-span-2">
          {error && (
            <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Step 1: Date & Tickets */}
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
                  Select Tickets (Agent Pricing)
                </h3>
                {mockAdminTickets.map((t) => (
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
                          {formatPrice(t.agentPrice)}{" "}
                          <span className="text-xs font-normal text-muted-foreground line-through">
                            {formatPrice(t.basePrice)}
                          </span>
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

          {/* Step 2: Customer Details */}
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

          {/* Step 3: Review */}
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

              {/* Payment Method */}
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
                        : "border-border hover:border-primary/50"
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
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <CreditCard className="h-6 w-6 text-blue-600" />
                    <span className="text-sm font-medium text-foreground">
                      Online (Razorpay)
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Card / Net Banking
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <div className="rounded-xl border bg-card p-6 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                {paymentMethod === "ONLINE" ? (
                  <CreditCard className="h-7 w-7 text-primary" />
                ) : (
                  <Banknote className="h-7 w-7 text-green-600" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {paymentMethod === "ONLINE"
                  ? "Proceed with Razorpay"
                  : "Confirm Offline Payment"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {paymentMethod === "ONLINE"
                  ? "The customer will be charged via Razorpay payment gateway"
                  : "Confirm that the customer has paid the amount in cash or via UPI"}
              </p>
              <p className="mt-4 text-3xl font-bold text-primary">
                {formatPrice(totalAmount)}
              </p>
              <button
                type="button"
                onClick={handlePay}
                disabled={processing}
                className="mt-6 flex items-center justify-center gap-2 mx-auto rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {processing && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {paymentMethod === "ONLINE"
                  ? "Pay with Razorpay"
                  : "Mark as Paid"}
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!canNext()}
                className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
          {step === 4 && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={processing}
                className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Review
              </button>
            </div>
          )}
        </div>

        {/* Price Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-base font-semibold text-foreground">
              Price Summary
            </h3>
            {selections.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No tickets selected
              </p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {selections.map((s) => (
                  <div key={s.categoryId} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {s.categoryName} x{s.quantity}
                    </span>
                    <span className="font-medium text-foreground">
                      {formatPrice(s.totalPrice)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-2.5">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total ({totalTickets} tickets)
                    </span>
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>
                </div>
                <p className="rounded-md bg-secondary/10 px-2 py-1 text-center text-xs font-medium text-secondary">
                  Agent pricing applied
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
