"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, User, Phone, Mail } from "lucide-react";
import { useBooking } from "@/lib/booking-context";
import { validateMobile, validateEmail } from "@/lib/utils";
import { PriceSummary } from "./price-summary";

export function StepDetails() {
  const { formData, updateCustomerDetails, setStep } = useBooking();

  const [name, setName] = useState(formData.customerName);
  const [mobile, setMobile] = useState(formData.customerMobile);
  const [email, setEmail] = useState(formData.customerEmail);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!validateMobile(mobile))
      newErrors.mobile =
        "Enter a valid 10-digit Indian mobile number (starts with 6-9)";
    if (email && !validateEmail(email))
      newErrors.email = "Enter a valid email address";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      updateCustomerDetails(name.trim(), mobile.trim(), email.trim());
      setStep(4);
    }
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
      <div className="flex-1">
        <h2 className="mb-2 text-xl font-semibold text-foreground sm:text-2xl">
          Your Details
        </h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Enter your contact information. We will send your booking
          confirmation and ticket via SMS.
        </p>

        <div className="flex flex-col gap-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="customer-name"
              className="flex items-center gap-2 text-sm font-medium text-foreground"
            >
              <User className="h-4 w-4 text-secondary" />
              Full Name <span className="text-destructive">*</span>
            </label>
            <input
              id="customer-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-secondary/20 ${
                errors.name
                  ? "border-destructive"
                  : "focus:border-secondary"
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <span className="text-xs text-destructive">{errors.name}</span>
            )}
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="customer-mobile"
              className="flex items-center gap-2 text-sm font-medium text-foreground"
            >
              <Phone className="h-4 w-4 text-secondary" />
              Mobile Number <span className="text-destructive">*</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="rounded-lg border bg-muted px-3 py-2.5 text-sm text-muted-foreground">
                +91
              </span>
              <input
                id="customer-mobile"
                type="tel"
                value={mobile}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setMobile(val);
                }}
                className={`flex-1 rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-secondary/20 ${
                  errors.mobile
                    ? "border-destructive"
                    : "focus:border-secondary"
                }`}
                placeholder="9876543210"
                maxLength={10}
              />
            </div>
            {errors.mobile && (
              <span className="text-xs text-destructive">
                {errors.mobile}
              </span>
            )}
            <span className="text-xs text-muted-foreground">
              Your e-ticket will be sent to this number via SMS
            </span>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="customer-email"
              className="flex items-center gap-2 text-sm font-medium text-foreground"
            >
              <Mail className="h-4 w-4 text-secondary" />
              Email Address{" "}
              <span className="text-xs text-muted-foreground">(optional)</span>
            </label>
            <input
              id="customer-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-secondary/20 ${
                errors.email
                  ? "border-destructive"
                  : "focus:border-secondary"
              }`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <span className="text-xs text-destructive">{errors.email}</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => setStep(2)}
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

      {/* Sidebar */}
      <div className="lg:w-80">
        <div className="sticky top-24">
          <PriceSummary />
        </div>
      </div>
    </div>
  );
}
