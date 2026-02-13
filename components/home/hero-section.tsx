import Image from "next/image";
import Link from "next/link";
import { Waves, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-waterpark.jpg"
          alt="Aerocity Water Park aerial view with water slides and pools"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 px-4 py-20 lg:px-8">
        <div className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm w-fit">
          <Waves className="h-4 w-4 text-accent" />
          <span className="text-xs font-medium text-primary-foreground sm:text-sm">
            Now Open for the 2026 Season
          </span>
        </div>

        <h1 className="max-w-3xl text-balance text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Make a Splash at{" "}
          <span className="text-accent">Aerocity</span>
        </h1>

        <p className="max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/85 sm:text-lg md:text-xl">
          Dive into a world of thrilling water slides, refreshing wave pools,
          and endless family fun. Your perfect day of adventure awaits!
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/booking"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition-all hover:brightness-110 sm:w-auto"
          >
            Book Tickets Now
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/attractions"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:border-primary-foreground/50 hover:bg-primary-foreground/10 sm:w-auto"
          >
            Explore Attractions
          </Link>
        </div>

        {/* Stats Row */}
        <div className="mt-6 flex flex-wrap gap-6 sm:gap-10">
          {[
            { value: "20+", label: "Water Rides" },
            { value: "50K+", label: "Happy Visitors" },
            { value: "15+", label: "Acres of Fun" },
            { value: "4.8", label: "Star Rating" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-2xl font-bold text-accent sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-xs text-primary-foreground/70 sm:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Wave Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="block w-full fill-background"
          style={{ height: "60px" }}
        >
          <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
