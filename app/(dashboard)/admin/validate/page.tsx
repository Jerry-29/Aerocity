"use client";

import { useState } from "react";
import {
  QrCode,
  Search,
  CheckCircle2,
  XCircle,
  CalendarDays,
  User,
  Ticket,
  Loader2,
  Keyboard,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { mockBookings } from "@/lib/admin-data";
import type { AdminBooking } from "@/lib/admin-types";

interface ValidationEntry {
  reference: string;
  success: boolean;
  message: string;
  timestamp: string;
}

export default function AdminValidatePage() {
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    booking?: AdminBooking;
  } | null>(null);
  const [recentValidations, setRecentValidations] = useState<
    ValidationEntry[]
  >([]);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) return;

    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 800));

    const booking = mockBookings.find(
      (b) =>
        b.bookingReference.toLowerCase() === reference.trim().toLowerCase()
    );

    let validationResult: { success: boolean; message: string; booking?: AdminBooking };

    if (!booking) {
      validationResult = {
        success: false,
        message: "Booking not found. Please check the reference number.",
      };
    } else if (booking.paymentStatus !== "PAID") {
      validationResult = {
        success: false,
        message: `Booking is not paid. Current status: ${booking.paymentStatus}`,
        booking,
      };
    } else if (booking.isValidated) {
      validationResult = {
        success: false,
        message: `Entry already validated on ${new Date(
          booking.validatedAt!
        ).toLocaleString("en-IN")}`,
        booking,
      };
    } else {
      const today = new Date().toISOString().split("T")[0];
      if (booking.visitDate !== today) {
        validationResult = {
          success: false,
          message: `Ticket is for ${new Date(
            booking.visitDate
          ).toLocaleDateString("en-IN")}, not today.`,
          booking,
        };
      } else {
        validationResult = {
          success: true,
          message: "Entry validated successfully! Welcome to Aerocity.",
          booking,
        };
      }
    }

    setResult(validationResult);
    setRecentValidations((prev) => [
      {
        reference: reference.trim(),
        success: validationResult.success,
        message: validationResult.message,
        timestamp: new Date().toLocaleTimeString("en-IN"),
      },
      ...prev,
    ]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Validate Entry
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Scan QR code or enter booking reference to validate park entry
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Keyboard className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">
                Enter Booking Reference
              </h2>
            </div>
            <form onSubmit={handleValidate} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={reference}
                  onChange={(e) =>
                    setReference(e.target.value.toUpperCase())
                  }
                  placeholder="AERO-2026-XXXXXX"
                  className="w-full rounded-lg border bg-background py-3 pl-10 pr-4 text-sm font-mono outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={loading || !reference.trim()}
                className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <QrCode className="h-4 w-4" />
                )}
                Validate
              </button>
            </form>
          </div>

          {/* QR Scanner placeholder */}
          <div className="rounded-xl border-2 border-dashed border-border bg-card p-8 text-center">
            <QrCode className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              QR Code Scanner
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Camera-based QR scanning will be available in a future update
            </p>
          </div>
        </div>

        {/* Results + Recent */}
        <div className="flex flex-col gap-6">
          {/* Result Card */}
          {result && (
            <div
              className={cn(
                "rounded-xl border-2 p-6",
                result.success
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              )}
            >
              <div className="flex items-center gap-3">
                {result.success ? (
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-600" />
                )}
                <div>
                  <h3
                    className={cn(
                      "text-lg font-bold",
                      result.success ? "text-green-900" : "text-red-900"
                    )}
                  >
                    {result.success ? "Entry Granted" : "Entry Denied"}
                  </h3>
                  <p
                    className={cn(
                      "text-sm",
                      result.success ? "text-green-700" : "text-red-700"
                    )}
                  >
                    {result.message}
                  </p>
                </div>
              </div>

              {result.booking && (
                <div className="mt-4 rounded-lg bg-white/60 p-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {result.booking.customerName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {new Date(
                          result.booking.visitDate
                        ).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ticket className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {result.booking.items.reduce(
                          (s, i) => s + i.quantity,
                          0
                        )}{" "}
                        tickets
                      </span>
                    </div>
                    <div className="font-semibold text-primary">
                      {formatPrice(result.booking.finalAmount)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Recent Validations */}
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-foreground">
              Recent Validations
            </h2>
            {recentValidations.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No validations performed yet today
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {recentValidations.slice(0, 10).map((v, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      {v.success ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span className="font-mono text-xs text-foreground">
                        {v.reference}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {v.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
