"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { TicketCategory, Offer } from "@/lib/types";

export function PricingLoader() {
  const [categories, setCategories] = useState<TicketCategory[] | null>(null);
  const [offer, setOffer] = useState<Offer | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [ticketsRes, offersRes] = await Promise.all([
          fetch("/api/tickets", { cache: "no-store" }),
          fetch("/api/offers", { cache: "no-store" }),
        ]);
        if (!ticketsRes.ok) {
          if (mounted) {
            setCategories([]);
          }
          return;
        }
        const tjson = await ticketsRes.json();
        const items: any[] = Array.isArray(tjson?.data) ? tjson.data : [];
        const mapped: TicketCategory[] = items.map((t) => ({
          id: t.id,
          name: t.name,
          slug: String(t.slug || "").toLowerCase(),
          description: t.description || "",
          basePrice: Number(t.customerPrice ?? t.price ?? 0),
          offerPrice: null,
          includes: ["All rides and attractions access"],
        }));
        let active: Offer | null = null;
        if (offersRes.ok) {
          const ojson = await offersRes.json();
          const activeOffers: any[] = Array.isArray(ojson?.data)
            ? ojson.data
            : [];
          if (activeOffers.length > 0) {
            const sel = activeOffers[0];
            active = {
              id: sel.id,
              name: sel.name,
              description: sel.description || "",
              startDate: new Date(sel.startDate).toISOString().split("T")[0],
              endDate: new Date(sel.endDate).toISOString().split("T")[0],
              isActive: !!sel.isActive,
              discountPercentage: 0,
            };
            const prices: Array<{ ticketId: number; offerPrice: number }> =
              Array.isArray(sel.offerPrices) ? sel.offerPrices : [];
            for (let i = 0; i < mapped.length; i++) {
              const cat = mapped[i];
              const p = prices
                .filter((x) => x.ticketId === cat.id)
                .map((x) => Number(x.offerPrice));
              const best =
                p.length > 0
                  ? p.reduce((min, v) => (v < min ? v : min), p[0])
                  : null;
              mapped[i] = {
                ...cat,
                offerPrice: best !== null && best < cat.basePrice ? best : null,
              };
            }
          }
        }
        if (mounted) {
          setCategories(mapped);
          setOffer(active);
        }
      } catch {
        if (mounted) {
          setCategories([]);
          setOffer(null);
        }
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      {offer && offer.isActive && (() => {
        const raw = offer.description || "";
        const match = raw.match(/\[PERCENT:([0-9]+(\.[0-9]+)?)\]/);
        const pct = match ? parseFloat(match[1]) : null;
        const cleaned = raw.replace(/\s*\[PERCENT:[^\]]+\]\s*/g, "").trim();
        const message =
          pct !== null
            ? `${pct}% discount on all tickets. Special prices already applied below.`
            : cleaned || "Special prices are live now.";
        return (
          <section className="bg-accent/10 py-4">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 text-center sm:flex-row sm:justify-center sm:gap-4 lg:px-8">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
              </span>
              <p className="text-sm font-medium text-foreground">
                <span className="font-bold">{offer.name}</span> is live!{" "}
                {message}
              </p>
            </div>
          </section>
        );
      })()}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {!categories ? (
            <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
              Loading latest pricing...
            </div>
          ) : categories.length === 0 ? (
            <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
              No tickets available right now.
            </div>
          ) : (
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
                        <li key={item} className="flex items-start gap-2 text-sm">
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
          )}
        </div>
      </section>
    </>
  );
}
