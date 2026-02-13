import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Attraction } from "@/lib/types";

interface PopularRidesProps {
  attractions: Attraction[];
}

const categoryColors: Record<string, string> = {
  thrill: "bg-destructive text-destructive-foreground",
  family: "bg-secondary text-secondary-foreground",
  kids: "bg-accent text-accent-foreground",
  relaxation: "bg-primary text-primary-foreground",
};

export function PopularRides({ attractions }: PopularRidesProps) {
  const featured = attractions.slice(0, 4);

  return (
    <section className="bg-muted py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end lg:mb-16">
          <div>
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-secondary">
              Our Attractions
            </span>
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              Popular Rides & Attractions
            </h2>
          </div>
          <Link
            href="/attractions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary"
          >
            View All Attractions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Rides Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((ride) => (
            <Link
              key={ride.id}
              href="/attractions"
              className="group overflow-hidden rounded-xl bg-card shadow-sm transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={ride.image}
                  alt={ride.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span
                  className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium capitalize ${categoryColors[ride.category] || ""}`}
                >
                  {ride.category}
                </span>
              </div>
              <div className="flex flex-col gap-2 p-4">
                <h3 className="text-base font-semibold text-card-foreground">
                  {ride.name}
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {ride.description}
                </p>
                {ride.heightRequirement && (
                  <span className="text-xs text-muted-foreground">
                    {ride.heightRequirement}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
