"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { Testimonial } from "@/lib/types";

interface TestimonialsPreviewProps {
  testimonials: Testimonial[];
}

export function TestimonialsPreview({ testimonials }: TestimonialsPreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleTestimonials = testimonials.slice(0, 6);

  const nextSlide = () => {
    setActiveIndex((prev) =>
      prev === visibleTestimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? visibleTestimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="bg-primary py-16 text-primary-foreground lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
            Testimonials
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold sm:text-4xl">
            What Our Visitors Say
          </h2>
          <p className="text-pretty text-primary-foreground/80">
            Thousands of families have made unforgettable memories at Aerocity.
            Here is what they have to say.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden gap-6 md:grid md:grid-cols-3">
          {visibleTestimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="relative md:hidden">
          <TestimonialCard
            testimonial={visibleTestimonials[activeIndex]}
          />
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {visibleTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex
                      ? "w-6 bg-accent"
                      : "w-2 bg-primary-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent/80"
          >
            Read All Reviews
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-primary-foreground/5 p-6 backdrop-blur-sm">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < testimonial.rating
                ? "fill-accent text-accent"
                : "text-primary-foreground/20"
            }`}
          />
        ))}
      </div>
      <p className="flex-1 text-sm leading-relaxed text-primary-foreground/90">
        &ldquo;{testimonial.content}&rdquo;
      </p>
      <div className="flex items-center gap-3 border-t border-primary-foreground/10 pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold">{testimonial.name}</p>
          <p className="text-xs text-primary-foreground/60">
            Visited {testimonial.visitDate}
          </p>
        </div>
      </div>
    </div>
  );
}
