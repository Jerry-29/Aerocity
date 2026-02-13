import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Droplets,
  Target,
  Heart,
  Award,
  Users,
  TreePalm,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Aerocity Water Park - our story, mission, and commitment to providing the best water park experience for families.",
};

const stats = [
  { value: "15+", label: "Acres of Land", icon: TreePalm },
  { value: "20+", label: "Water Rides", icon: Droplets },
  { value: "50,000+", label: "Happy Visitors", icon: Users },
  { value: "5+", label: "Years of Fun", icon: Award },
];

const values = [
  {
    icon: Heart,
    title: "Safety First",
    description:
      "Every ride, pool, and facility is maintained to the highest safety standards with trained lifeguards on duty at all times.",
  },
  {
    icon: Users,
    title: "Family Focus",
    description:
      "We design experiences that bring families together, from toddler pools to thrilling rides for adults.",
  },
  {
    icon: Droplets,
    title: "Cleanliness",
    description:
      "State-of-the-art water filtration and daily sanitation ensure a clean, hygienic environment throughout the park.",
  },
  {
    icon: Target,
    title: "Innovation",
    description:
      "We continuously invest in new rides, technology, and experiences to keep Aerocity fresh and exciting.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex items-center overflow-hidden bg-primary py-20 text-primary-foreground lg:py-32">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-waterpark.jpg"
            alt="Aerial view of Aerocity Water Park"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center lg:px-8">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
            Our Story
          </span>
          <h1 className="mb-4 text-balance text-4xl font-bold sm:text-5xl">
            About Aerocity Water Park
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-primary-foreground/80">
            Where every splash creates a memory and every visit becomes an
            adventure to remember.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/lazy-river.jpg"
                alt="Lazy river at Aerocity Water Park"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
                Our Journey
              </span>
              <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
                A Dream Born from the Love of Water
              </h2>
              <div className="flex flex-col gap-4 text-muted-foreground">
                <p className="text-pretty leading-relaxed">
                  Aerocity Water Park was born from a simple yet powerful idea:
                  to create a space where families can escape the ordinary and
                  dive into extraordinary fun. Founded with a passion for
                  aquatic entertainment, we set out to build a world-class water
                  park that would become the go-to destination for thrill-seekers
                  and relaxation lovers alike.
                </p>
                <p className="text-pretty leading-relaxed">
                  Spread across 15 acres of beautifully landscaped grounds,
                  Aerocity features over 20 water rides, from adrenaline-pumping
                  slides to serene lazy rivers. Our state-of-the-art facilities,
                  delicious food court, and dedicated kids zones ensure that
                  every member of the family has the time of their lives.
                </p>
                <p className="text-pretty leading-relaxed">
                  Today, Aerocity proudly serves over 50,000 visitors every
                  year, and we are just getting started. Our commitment to
                  safety, cleanliness, and unforgettable experiences remains at
                  the heart of everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-3 rounded-xl bg-card p-8 text-center shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10">
                  <stat.icon className="h-7 w-7 text-secondary" />
                </div>
                <span className="text-3xl font-bold text-primary">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-secondary">
              Our Values
            </span>
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground sm:text-4xl">
              What We Stand For
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="flex flex-col items-center gap-4 rounded-xl border bg-card p-6 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-16 text-secondary-foreground">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center">
          <h2 className="text-balance text-3xl font-bold sm:text-4xl">
            Come Experience the Magic
          </h2>
          <p className="text-pretty text-secondary-foreground/80">
            Plan your visit today and discover why thousands of families choose
            Aerocity as their favorite destination for fun and adventure.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition-all hover:brightness-110"
          >
            Book Your Visit
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
