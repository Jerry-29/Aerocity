"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  CheckCircle,
} from "lucide-react";
import { validateMobile, validateEmail } from "@/lib/utils";

export default function ContactPage() {
  const [info, setInfo] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoadError("");
      try {
        const res = await fetch("/api/contact", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load contact info");
        const json = await res.json();
        if (mounted) setInfo(json?.data || null);
      } catch (e: any) {
        if (mounted) setLoadError(e?.message || "Failed to load contact info");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.email && !validateEmail(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.whatsapp.trim())
      newErrors.whatsapp = "WhatsApp number is required";
    else if (!validateMobile(formData.whatsapp))
      newErrors.whatsapp = "Enter a valid 10-digit WhatsApp number";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.length > 300)
      newErrors.message = "Message must be 300 characters or fewer";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setSubmitting(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        const msg = j?.error || j?.message || "Failed to submit message";
        throw new Error(msg);
      }
      setSubmitted(true);
      setFormData({ name: "", email: "", whatsapp: "", message: "" });
    } catch (err: any) {
      setErrors({ form: err?.message || "Failed to submit message" });
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex items-center overflow-hidden bg-primary py-20 text-primary-foreground lg:py-32">
        <div className="absolute inset-0">
          <Image
            src="/images/food-court.jpg"
            alt="Aerocity Water Park facilities"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center lg:px-8">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
            Get In Touch
          </span>
          <h1 className="mb-4 text-balance text-4xl font-bold sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-primary-foreground/80">
            Have questions, feedback, or need help planning your visit? We are
            here to help!
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
            {/* Contact Info */}
            <div className="flex flex-col gap-8 lg:col-span-2">
              {loading && (
                <div className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">
                  Loading contact info...
                </div>
              )}
              {!loading && loadError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  {loadError}
                </div>
              )}
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">
                    Address
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {info?.address || ""}
                    <br />
                    {info?.city}, {info?.state} - {info?.pincode}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">
                    Phone
                  </h3>
                  {(info?.phone || []).map((p: string) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="block text-sm text-muted-foreground hover:text-primary"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">
                    Email
                  </h3>
                  <a
                    href={`mailto:${info?.email || ""}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {info?.email || ""}
                  </a>
                </div>
              </div>

              {/* Timings */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">
                    Park Timings
                  </h3>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <span>Weekdays: {info?.timings?.weekday || ""}</span>
                    <span>Weekends: {info?.timings?.weekend || ""}</span>
                    <span>Holidays: {info?.timings?.holiday || ""}</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-foreground">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  <a
                    href={info?.socialLinks?.facebook || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href={info?.socialLinks?.instagram || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href={info?.socialLinks?.youtube || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                  <a
                    href={info?.socialLinks?.twitter || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="rounded-xl border bg-card p-6 sm:p-8">
                <h2 className="mb-2 text-xl font-semibold text-card-foreground">
                  Send Us a Message
                </h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  Fill out the form below and we will get back to you within 24
                  hours.
                </p>
                {errors.form && (
                  <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {errors.form}
                  </div>
                )}

                {submitted ? (
                  <div className="flex flex-col items-center gap-4 rounded-lg bg-secondary/10 py-12 text-center">
                    <CheckCircle className="h-12 w-12 text-secondary" />
                    <h3 className="text-xl font-semibold text-card-foreground">
                      Message Sent!
                    </h3>
                    <p className="max-w-sm text-sm text-muted-foreground">
                      Thank you for reaching out. Our team will get back to you
                      shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-2 text-sm font-medium text-primary hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="grid gap-5 sm:grid-cols-2"
                    noValidate
                  >
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="contact-name"
                        className="text-sm font-medium text-card-foreground"
                      >
                        Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-secondary/20 ${
                          errors.name
                            ? "border-destructive"
                            : "focus:border-secondary"
                        }`}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <span className="text-xs text-destructive">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="contact-email"
                        className="text-sm font-medium text-card-foreground"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-secondary/20 ${
                          errors.email
                            ? "border-destructive"
                            : "focus:border-secondary"
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <span className="text-xs text-destructive">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* WhatsApp */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="contact-whatsapp"
                        className="text-sm font-medium text-card-foreground"
                      >
                        WhatsApp <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="contact-whatsapp"
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) =>
                          setFormData({ ...formData, whatsapp: e.target.value })
                        }
                        className={`rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-secondary/20 ${
                          errors.whatsapp
                            ? "border-destructive"
                            : "focus:border-secondary"
                        }`}
                        placeholder="9876543210"
                        maxLength={10}
                      />
                      {errors.whatsapp && (
                        <span className="text-xs text-destructive">
                          {errors.whatsapp}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <label
                        htmlFor="contact-message"
                        className="text-sm font-medium text-card-foreground"
                      >
                        Message <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        maxLength={300}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className={`resize-none rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-secondary/20 ${
                          errors.message
                            ? "border-destructive"
                            : "focus:border-secondary"
                        }`}
                        placeholder="How can we help you?"
                      />
                      <div className="mt-1 text-right text-[11px] text-muted-foreground">
                        {formData.message.length}/300
                      </div>
                      {errors.message && (
                        <span className="text-xs text-destructive">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60 sm:w-auto"
                      >
                        <Send className="h-4 w-4" />
                        {submitting ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16 overflow-hidden rounded-xl border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.0!2d75.7!3d26.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzAwLjAiTiA3NcKwNDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Aerocity Water Park Location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
