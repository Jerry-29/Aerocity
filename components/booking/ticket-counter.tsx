"use client";

import { Minus, Plus } from "lucide-react";

interface TicketCounterProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export function TicketCounter({
  value,
  onChange,
  max = 20,
}: TicketCounterProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value === 0}
        className="flex h-8 w-8 items-center justify-center rounded-full border bg-background text-foreground transition-all hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-8 text-center text-base font-semibold text-foreground tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-8 w-8 items-center justify-center rounded-full border bg-primary text-primary-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
