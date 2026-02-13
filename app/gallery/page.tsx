import type { Metadata } from "next";
import Image from "next/image";
import { fetchGallery } from "@/lib/data";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Browse stunning photos of Aerocity Water Park - rides, events, food court, and more. See what awaits you!",
};

export default async function GalleryPage() {
  const gallery = await fetchGallery();

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex items-center overflow-hidden bg-primary py-20 text-primary-foreground lg:py-32">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-waterpark.jpg"
            alt="Aerocity Water Park panoramic view"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center lg:px-8">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
            Gallery
          </span>
          <h1 className="mb-4 text-balance text-4xl font-bold sm:text-5xl">
            Photo Gallery
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-primary-foreground/80">
            Get a glimpse of the fun, excitement, and beauty that awaits you at
            Aerocity Water Park.
          </p>
        </div>
      </section>

      <GalleryGrid items={gallery} />
    </>
  );
}
