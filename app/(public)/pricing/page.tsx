import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HelpCircle, ChevronDown } from "lucide-react";
import { PricingLoader } from "@/components/pricing/pricing-loader";

export const metadata: Metadata = {
  title: "Pricing & Tickets",
  description:
    "View ticket prices for Aerocity Water Park. Choose from Adult and Kid packages with or without food. Book online for the best rates!",
};

const faqs = [
  {
    question: "What is the refund policy?",
    answer:
      "Tickets can be cancelled up to 24 hours before the visit date for a full refund. Cancellations within 24 hours are non-refundable. In case of park closure due to weather, a full refund or reschedule will be provided.",
  },
  {
    question: "Are there group discounts available?",
    answer:
      "Yes! Groups of 20 or more are eligible for special discounted rates. Please contact us directly for group pricing and corporate packages.",
  },
  {
    question: "What does the food package include?",
    answer:
      "The food package includes a full buffet lunch with both vegetarian and non-vegetarian options, along with unlimited water and one soft drink.",
  },
  {
    question: "Are children under 3 years free?",
    answer:
      "Yes, children under 3 years of age enter free of charge. They must be accompanied by a paying adult at all times.",
  },
  {
    question: "Can I upgrade my ticket at the park?",
    answer:
      "Yes, you can upgrade from a non-food ticket to a food-inclusive ticket at the counter by paying the difference.",
  },
  {
    question: "Is there a re-entry policy?",
    answer:
      "Re-entry is allowed on the same day with your valid ticket or QR code. Simply show it at the entrance gate.",
  },
];

export default async function PricingPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex items-center overflow-hidden bg-primary py-20 text-primary-foreground lg:py-32">
        <div className="absolute inset-0">
          <Image
            src="/images/wave-pool.jpg"
            alt="Wave pool at Aerocity"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center lg:px-8">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
            Tickets
          </span>
          <h1 className="mb-4 text-balance text-4xl font-bold sm:text-5xl">
            Pricing & Ticket Packages
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-primary-foreground/80">
            Transparent pricing with no hidden costs. Choose the package that
            suits your visit best.
          </p>
        </div>
      </section>

      <PricingLoader />

      {/* FAQ Section */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-secondary">
              FAQs
            </span>
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border bg-card"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-sm font-medium text-card-foreground [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 shrink-0 text-secondary" />
                    {faq.question}
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t px-5 pb-5 pt-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
