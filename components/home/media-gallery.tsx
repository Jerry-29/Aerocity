"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Film } from "lucide-react";

type MediaItem = {
  id: number;
  type: "IMAGE" | "VIDEO";
  url: string;
  thumbnailUrl?: string | null;
  category: "GALLERY" | "ATTRACTION" | "GENERAL";
};

export function MediaGallery() {
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/api/media?category=GALLERY", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to load gallery");
        const json = await res.json();
        const list: any[] = Array.isArray(json?.data) ? json.data : [];
        if (mounted) {
          setItems(
            list.map((m) => ({
              id: m.id,
              type: m.type,
              url: m.url,
              thumbnailUrl: m.thumbnailUrl || m.url,
              category: m.category,
            })),
          );
        }
      } catch (e: any) {
        if (mounted) {
          setError(e?.message || "Failed to load gallery");
          setItems([]);
        }
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (!items) return null;
  if (items.length === 0) return null;

  return (
    <section className="bg-muted py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Gallery
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A peek into the fun at Aerocity
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.slice(0, 12).map((m) => (
            <div key={m.id} className="group relative aspect-square overflow-hidden rounded-xl border bg-card">
              {m.type === "IMAGE" ? (
                <Image
                  src={m.thumbnailUrl || m.url}
                  alt="Gallery"
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <video
                  className="h-full w-full object-cover"
                  preload="metadata"
                  playsInline
                  muted
                  autoPlay
                  loop
                  poster={m.thumbnailUrl || undefined}
                >
                  <source src={m.url} />
                </video>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
