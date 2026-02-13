"use client";

import { useState } from "react";
import Image from "next/image";
import { Ruler } from "lucide-react";
import type { Attraction } from "@/lib/types";

interface AttractionsGridProps {
  attractions: Attraction[];
}

const categories = [
  { value: "all", label: "All" },
  { value: "thrill", label: "Thrill Rides" },
  { value: "family", label: "Family" },
  { value: "kids", label: "Kids Zone" },
  { value: "relaxation", label: "Relaxation" },
] as const;

const categoryColors: Record<string, string> = {
  thrill: "bg-destructive text-destructive-foreground",
  family: "bg-secondary text-secondary-foreground",
  kids: "bg-accent text-accent-foreground",
  relaxation: "bg-primary text-primary-foreground",
};

export function AttractionsGrid({ attractions }: AttractionsGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? attractions
      : attractions.filter((a) => a.category === activeFilter);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Filter Tabs */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeFilter === cat.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((attraction) => (
            <div
              key={attraction.id}
              className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={attraction.image}
                  alt={attraction.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span
                  className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium capitalize ${categoryColors[attraction.category] || ""}`}
                >
                  {attraction.category}
                </span>
              </div>
              <div className="flex flex-col gap-3 p-5">
                <h3 className="text-lg font-semibold text-card-foreground">
                  {attraction.name}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {attraction.description}
                </p>
                {attraction.heightRequirement && (
                  <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
                    <Ruler className="h-3.5 w-3.5 shrink-0" />
                    {attraction.heightRequirement}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-lg font-medium text-muted-foreground">
              No attractions found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
