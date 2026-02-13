"use client";

import { useState } from "react";
import { X, Megaphone } from "lucide-react";
import type { Announcement } from "@/lib/types";

interface AnnouncementBannerProps {
  announcements: Announcement[];
}

export function AnnouncementBanner({ announcements }: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || announcements.length === 0) return null;

  const announcement = announcements[0];

  return (
    <div className="relative flex items-center justify-center gap-2 bg-accent px-4 py-2 text-accent-foreground">
      <Megaphone className="hidden h-4 w-4 shrink-0 sm:block" />
      <p className="text-center text-xs font-medium sm:text-sm">
        <span className="font-semibold">{announcement.title}</span>
        {" "}
        {announcement.message}
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-2 flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-accent-foreground/10"
        aria-label="Dismiss announcement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
