import type { Metadata } from "next";
import { fetchAttractions } from "@/lib/data";
import { AttractionsGrid } from "@/components/attractions/attractions-grid";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Attractions & Rides",
  description:
    "Explore 20+ thrilling water rides and attractions at Aerocity Water Park - from high-speed slides to relaxing lazy rivers.",
};

export default async function AttractionsPage() {
  const attractions = await fetchAttractions();

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex items-center overflow-hidden bg-primary py-20 text-primary-foreground lg:py-32">
        <div className="absolute inset-0">
          <Image
            src="/images/water-slides.jpg"
            alt="Colorful water slides at Aerocity"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center lg:px-8">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
            Rides & Fun
          </span>
          <h1 className="mb-4 text-balance text-4xl font-bold sm:text-5xl">
            Our Attractions
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-primary-foreground/80">
            Discover 20+ world-class water rides designed for every thrill
            level. From heart-racing slides to peaceful lazy rivers.
          </p>
        </div>
      </section>

      <AttractionsGrid attractions={attractions} />
    </>
  );
}
