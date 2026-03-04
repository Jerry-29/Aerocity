"use client";

import { useEffect, useState } from "react";
import { X, Megaphone } from "lucide-react";

type PublicAnnouncement = {
  id: number;
  title: string;
  content: string;
  type: string;
  isActive: boolean;
  createdAt: string;
};

export function AnnouncementModal() {
  const [announcement, setAnnouncement] = useState<PublicAnnouncement | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/api/announcements", { cache: "no-store" });
        if (!res.ok) return;
        const json = await res.json();
        const list: any[] = Array.isArray(json?.data) ? json.data : [];
        if (list.length === 0) return;
        const first = list[0];
        const seenKey = `announcement_seen_${first.id}`;
        if (sessionStorage.getItem(seenKey) === "true") return;
        if (mounted) {
          setAnnouncement({
            id: first.id,
            title: first.title,
            content: first.content || "",
            type: first.type || "info",
            isActive: !!first.isActive,
            createdAt: first.createdAt,
          });
          setOpen(true);
          sessionStorage.setItem(seenKey, "true");
        }
      } catch {
        // ignore
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (!open || !announcement) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-title"
      className="fixed inset-0 z-[200] flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      <div className="relative mx-4 w-full max-w-lg rounded-xl border bg-card shadow-xl">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-accent" />
            <h2 id="announcement-title" className="text-sm font-semibold">
              {announcement.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close announcement"
            className="rounded p-1 text-muted-foreground hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-5 py-4 text-sm leading-relaxed text-foreground">
          <div
            dangerouslySetInnerHTML={{
              __html: announcement.content,
            }}
          />
        </div>
        <div className="flex justify-end border-t px-5 py-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
