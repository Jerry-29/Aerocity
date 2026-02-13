import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { PARK_INFO } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/wave-pool.jpg"
          alt="Wave pool at Aerocity Water Park"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-secondary/80" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center text-primary-foreground lg:px-8">
        <h2 className="text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">
          Ready for the Best Day Ever?
        </h2>
        <p className="max-w-2xl text-pretty text-lg text-primary-foreground/85">
          Gather your family and friends and head to Aerocity Water Park.
          Book online and skip the queue at the entrance!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-accent" />
            <span className="text-sm">
              Open {PARK_INFO.timings.weekday} (Weekdays)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-accent" />
            <span className="text-sm">
              {PARK_INFO.city}, {PARK_INFO.state}
            </span>
          </div>
        </div>

        <Link
          href="/booking"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-10 py-4 text-lg font-semibold text-accent-foreground transition-all hover:brightness-110"
        >
          Book Your Tickets Now
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
