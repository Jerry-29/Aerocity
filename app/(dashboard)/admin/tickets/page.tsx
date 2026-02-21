"use client";

import { useState, useEffect, useRef } from "react";
import {
  Ticket,
  IndianRupee,
  Pencil,
  X,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatPrice } from "@/lib/utils";
import type { AdminTicketCategory } from "@/lib/admin-types";
import { apiGet, apiPut, isSuccessResponse } from "@/lib/api-client";

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<AdminTicketCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [editing, setEditing] = useState<AdminTicketCategory | null>(null);
  const [form, setForm] = useState({
    basePrice: 0,
    offerPrice: 0,
    agentPrice: 0,
  });
  const [saving, setSaving] = useState(false);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await apiGet<AdminTicketCategory[]>("/api/admin/tickets");
      if (!isSuccessResponse(data)) {
        throw new Error(data.message || "Failed to load tickets");
      }
      setTickets(data.data || []);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
      setError(err instanceof Error ? err.message : "Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (t: AdminTicketCategory) => {
    setEditing(t);
    setForm({
      basePrice: t.basePrice,
      offerPrice: t.offerPrice ?? 0,
      agentPrice: t.agentPrice,
    });
    setError("");
  };

  const handleSave = async () => {
    setError("");
    if (form.agentPrice > form.basePrice) {
      setError("Agent price cannot exceed base price");
      return;
    }
    if (form.offerPrice > 0 && form.offerPrice > form.basePrice) {
      setError("Offer price cannot exceed base price");
      return;
    }
    setSaving(true);
    try {
      if (editing?.id) {
        await apiPut(`/api/admin/tickets/${editing.id}`, {
          basePrice: form.basePrice,
          offerPrice: form.offerPrice || null,
          agentPrice: form.agentPrice,
        });
        fetchTickets();
      }
    } catch (err) {
      console.error("Failed to save ticket:", err);
      setError(err instanceof Error ? err.message : "Failed to save ticket");
    } finally {
      setSaving(false);
      setEditing(null);
    }
  };

  const toggleActive = (id: number) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t))
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Tickets & Pricing
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage ticket categories and pricing
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Loading tickets...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={fetchTickets}
            className="mt-2 text-sm font-medium text-red-600 hover:text-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Tickets Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tickets.map((t) => (
            <div
              key={t.id}
              className="flex flex-col rounded-xl border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Ticket className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {t.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {t.description}
                    </p>
                  </div>
                </div>
                <StatusBadge status={t.isActive ? "ACTIVE" : "INACTIVE"} />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 rounded-lg bg-muted/50 p-3">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Base
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {formatPrice(t.basePrice)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Offer
                  </p>
                  <p className="text-sm font-bold text-green-600">
                    {t.offerPrice ? formatPrice(t.offerPrice) : "---"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Agent
                  </p>
                  <p className="text-sm font-bold text-secondary">
                    {formatPrice(t.agentPrice)}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditing(t);
                    setForm({
                      basePrice: t.basePrice,
                      offerPrice: t.offerPrice ?? 0,
                      agentPrice: t.agentPrice,
                    });
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit Pricing
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No tickets message */}
      {!loading && !error && tickets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tickets found</p>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setEditing(null)}
            aria-hidden="true"
          />
          <div className="relative mx-4 w-full max-w-md rounded-xl border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Edit {editing.name}
              </h3>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && (
              <div className="mt-3 rounded-lg bg-destructive/10 p-2.5 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="mt-4 flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Base Price (INR)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="number"
                    min={0}
                    value={form.basePrice}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        basePrice: Number(e.target.value),
                      }))
                    }
                    className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Offer Price (INR)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="number"
                    min={0}
                    value={form.offerPrice}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        offerPrice: Number(e.target.value),
                      }))
                    }
                    className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Set to 0 to remove offer pricing
                </p>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Agent Price (INR)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="number"
                    min={0}
                    value={form.agentPrice}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        agentPrice: Number(e.target.value),
                      }))
                    }
                    className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-lg border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
