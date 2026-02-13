import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight, HelpCircle, ChevronDown } from "lucide-react";
import { fetchTicketCategories, fetchActiveOffer } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

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
  const [categories, offer] = await Promise.all([
    fetchTicketCategories(),
    fetchActiveOffer(),
  ]);

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

      {/* Offer Banner */}
      {offer && offer.isActive && (
        <section className="bg-accent/10 py-4">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 text-center sm:flex-row sm:justify-center sm:gap-4 lg:px-8">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
            </span>
            <p className="text-sm font-medium text-foreground">
              <span className="font-bold">{offer.name}</span> is live!{" "}
              {offer.description}
            </p>
          </div>
        </section>
      )}

      {/* Pricing Cards */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, index) => {
              const isPopular = index === 0;
              return (
                <div
                  key={cat.id}
                  className={`relative flex flex-col rounded-xl border bg-card p-6 transition-all hover:shadow-lg ${
                    isPopular ? "border-secondary shadow-md" : ""
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-4 py-1 text-xs font-semibold text-secondary-foreground">
                      Most Popular
                    </span>
                  )}
                  <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                    {cat.name}
                  </h3>
                  <p className="mb-6 text-sm text-muted-foreground">
                    {cat.description}
                  </p>

                  <div className="mb-6 flex items-baseline gap-2">
                    {cat.offerPrice ? (
                      <>
                        <span className="text-4xl font-bold text-primary">
                          {formatPrice(cat.offerPrice)}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(cat.basePrice)}
                        </span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-primary">
                        {formatPrice(cat.basePrice)}
                      </span>
                    )}
                  </div>
                  <span className="mb-4 text-xs text-muted-foreground">
                    per person / per visit
                  </span>

                  <ul className="mb-8 flex flex-1 flex-col gap-3">
                    {cat.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/booking"
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                      isPopular
                        ? "bg-secondary text-secondary-foreground hover:brightness-110"
                        : "border border-primary bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    Book Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Children under 3 years enter free. Group discounts available for 20+
            visitors.{" "}
            <Link
              href="/contact"
              className="font-medium text-primary hover:underline"
            >
              Contact us
            </Link>{" "}
            for details.
          </p>
        </div>
      </section>

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
