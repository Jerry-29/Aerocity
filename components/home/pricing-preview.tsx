import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { TicketCategory, Offer } from "@/lib/types";

interface PricingPreviewProps {
  categories: TicketCategory[];
  offer: Offer | null;
}

export function PricingPreview({ categories, offer }: PricingPreviewProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-secondary">
            Pricing
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Ticket Prices
          </h2>
          <p className="text-pretty text-muted-foreground">
            Choose the perfect ticket for your visit. All tickets include
            unlimited access to rides for the full day.
          </p>
          {offer && offer.isActive && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {offer.name} - Special prices available!
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group flex flex-col rounded-xl border bg-card p-6 transition-all hover:border-secondary/30 hover:shadow-lg"
            >
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                {cat.name}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {cat.description}
              </p>

              <div className="mb-4 flex items-baseline gap-2">
                {cat.offerPrice ? (
                  <>
                    <span className="text-3xl font-bold text-primary">
                      {formatPrice(cat.offerPrice)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(cat.basePrice)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(cat.basePrice)}
                  </span>
                )}
              </div>

              <ul className="mb-6 flex flex-1 flex-col gap-2">
                {cat.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary"
          >
            View Full Pricing Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
