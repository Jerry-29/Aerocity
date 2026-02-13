import type { Metadata } from "next";
import Image from "next/image";
import { fetchTestimonials } from "@/lib/data";
import { TestimonialsList } from "@/components/testimonials/testimonials-list";

export const metadata: Metadata = {
  title: "Testimonials & Reviews",
  description:
    "Read what our visitors say about Aerocity Water Park. Real reviews from real families who had an amazing time.",
};

export default async function TestimonialsPage() {
  const testimonials = await fetchTestimonials();

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex items-center overflow-hidden bg-primary py-20 text-primary-foreground lg:py-32">
        <div className="absolute inset-0">
          <Image
            src="/images/kids-pool.jpg"
            alt="Families enjoying Aerocity Water Park"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center lg:px-8">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
            Reviews
          </span>
          <h1 className="mb-4 text-balance text-4xl font-bold sm:text-5xl">
            What Our Visitors Say
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-primary-foreground/80">
            Real stories from real families who created unforgettable memories at
            Aerocity Water Park.
          </p>
        </div>
      </section>

      <TestimonialsList testimonials={testimonials} />
    </>
  );
}
