/** @jsxImportSource react */
"use client";

import { useEffect, useState } from "react";
import { BookingProvider } from "@/lib/booking-context";
import { BookingFlow } from "./booking-flow";
import type { TicketCategory, Offer } from "@/lib/types";

export function BookingLoader() {
  const [categories, setCategories] = useState<TicketCategory[] | null>(null);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      setError("");
      try {
        const [ticketsRes, offersRes] = await Promise.all([
          fetch("/api/tickets", { cache: "no-store" }),
          fetch("/api/offers", { cache: "no-store" }),
        ]);

        if (!ticketsRes.ok) {
          throw new Error("Failed to load tickets");
        }
        const ticketsJson = await ticketsRes.json();
        const items: any[] = Array.isArray(ticketsJson?.data)
          ? ticketsJson.data
          : [];
        const mapped: TicketCategory[] = items.map((t) => ({
          id: t.id,
          name: t.name,
          slug: String(t.slug || "").toLowerCase(),
          description: t.description || "",
          basePrice: parseFloat(String(t.customerPrice ?? t.price ?? 0)),
          offerPrice: null,
          includes: ["All rides and attractions access"],
        }));

        let active: Offer | null = null;
        if (offersRes.ok) {
          const offersJson = await offersRes.json();
          const activeOffers: any[] = Array.isArray(offersJson?.data)
            ? offersJson.data
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
            for (const idx in mapped) {
              const cat = mapped[idx as any];
              const p = prices
                .filter((x) => x.ticketId === cat.id)
                .map((x) => Number(x.offerPrice));
              const best =
                p.length > 0
                  ? p.reduce((min, v) => (v < min ? v : min), p[0])
                  : null;
              mapped[idx as any] = {
                ...cat,
                offerPrice: best !== null && best < cat.basePrice ? best : null,
              };
            }
          }
        }

        if (mounted) {
          setCategories(mapped);
          setOffer(active);
          const dbg = process.env.NEXT_PUBLIC_DEBUG_PRICING === "true";
          if (dbg) {
            const fam = mapped.find((c) => c.slug === "family-package");
            const payload = {
              familyPackage: fam,
              activeOffer: active,
            };
            // eslint-disable-next-line no-console
            console.debug("[pricing-debug]", payload);
          }
        }
      } catch (err: any) {
        if (mounted) {
          setError(err?.message || "Failed to load data");
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

  if (!categories) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        Loading tickets...
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}
      <BookingProvider categories={categories} offer={offer}>
        <BookingFlow />
      </BookingProvider>
    </>
  );
}
