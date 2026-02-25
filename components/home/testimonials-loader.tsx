"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/types";
import { TestimonialsPreview } from "./testimonials-preview";

export function TestimonialsPreviewLoader() {
  const [items, setItems] = useState<Testimonial[] | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      setError("");
      try {
        const res = await fetch("/api/testimonials?featured=true", {
          cache: "no-store",
        });
        if (!res.ok) {
          if (mounted) setItems([]);
          return;
        }
        const json = await res.json();
        const data: any[] = Array.isArray(json?.data) ? json.data : [];
        const mapped: Testimonial[] = data.map((t: any) => ({
          id: t.id,
          name: t.name,
          rating: Number(t.rating) || 0,
          content: t.content || "",
          visitDate: t?.visitDate
            ? typeof t.visitDate === "string"
              ? t.visitDate.split("T")[0]
              : new Date(t.visitDate).toISOString().split("T")[0]
            : "",
          isApproved: true,
        }));
        if (mounted) setItems(mapped);
      } catch (e: any) {
        if (mounted) {
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
  return <TestimonialsPreview testimonials={items} />;
}
