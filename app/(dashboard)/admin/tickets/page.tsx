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
import { apiGet, apiPost, apiPut, isSuccessResponse } from "@/lib/api-client";

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<AdminTicketCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [editing, setEditing] = useState<AdminTicketCategory | null>(null);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string>("");
  // Use string inputs to avoid Number("") flicker to 0 while typing
  const [form, setForm] = useState({
    name: "",
    description: "",
    basePrice: "",
    agentPrice: "",
  });
  const [addForm, setAddForm] = useState({
    name: "",
    slug: "",
    description: "",
    basePrice: "",
    agentPrice: "",
    heightRequirement: "",
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
      name: String(t.name ?? ""),
      description: String(t.description ?? ""),
      basePrice: String(t.basePrice ?? ""),
      agentPrice: String(t.agentPrice ?? ""),
    });
    setError("");
  };

  const handleSave = async () => {
    setError("");
    const baseNum = parseFloat(form.basePrice);
    const agentNum = parseFloat(form.agentPrice);
    if (isNaN(baseNum) || isNaN(agentNum)) {
      setError("Enter valid numbers for prices");
      return;
    }
    if (agentNum > baseNum) {
      setError("Agent price cannot exceed base price");
      return;
    }
    setSaving(true);
    try {
      if (editing?.id) {
        await apiPut(`/api/admin/tickets/${editing.id}`, {
          name: form.name?.trim() || editing.name,
          description: form.description?.trim() || editing.description || null,
          customerPrice: baseNum,
          agentPrice: agentNum,
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

  const canCreate = () => {
    const baseNum = parseFloat(addForm.basePrice);
    const agentNum = parseFloat(addForm.agentPrice);
    return (
      addForm.name.trim().length > 0 &&
      addForm.slug.trim().length > 0 &&
      !isNaN(baseNum) &&
      !isNaN(agentNum) &&
      baseNum >= 0 &&
      agentNum >= 0 &&
      agentNum <= baseNum
    );
  };

  const handleCreate = async () => {
    setAddError("");
    if (!canCreate()) {
      setAddError("Please fill all fields correctly. Agent price cannot exceed base price.");
      return;
    }
    setSaving(true);
    try {
      const baseNum = parseFloat(addForm.basePrice);
      const agentNum = parseFloat(addForm.agentPrice);
      const res = await apiPost("/api/admin/tickets", {
        name: addForm.name.trim(),
        slug: addForm.slug.trim(),
        description: addForm.description.trim() || null,
        customerPrice: baseNum,
        agentPrice: agentNum,
        heightRequirement: addForm.heightRequirement
          ? Number(addForm.heightRequirement)
          : null,
        isActive: true,
      });
      if (!isSuccessResponse(res)) {
        throw new Error(res.message || "Failed to create ticket");
      }
      setAdding(false);
      setAddForm({
        name: "",
        slug: "",
        description: "",
        basePrice: "",
        agentPrice: "",
        heightRequirement: "",
      });
      fetchTickets();
    } catch (err) {
      setAddError(
        err instanceof Error ? err.message : "Failed to create ticket",
      );
    } finally {
      setSaving(false);
    }
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

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            setAddError("");
            setAdding(true);
          }}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Add Ticket
        </button>
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
                  onClick={() => openEdit(t)}
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
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Description
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Base Price (INR)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    inputMode="decimal"
                    value={form.basePrice}
                    onFocus={(e) => {
                      if (e.target.value === "0") e.target.select();
                    }}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, basePrice: e.target.value }))
                    }
                    onBlur={(e) => {
                      if (e.target.value.trim() === "") {
                        setForm((p) => ({ ...p, basePrice: String(editing?.basePrice ?? "") }));
                      }
                    }}
                    className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Agent Price (INR)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    inputMode="decimal"
                    value={form.agentPrice}
                    onFocus={(e) => {
                      if (e.target.value === "0") e.target.select();
                    }}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, agentPrice: e.target.value }))
                    }
                    onBlur={(e) => {
                      if (e.target.value.trim() === "") {
                        setForm((p) => ({ ...p, agentPrice: String(editing?.agentPrice ?? "") }));
                      }
                    }}
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
                onClick={async () => {
                  if (!editing) return;
                  try {
                    setSaving(true);
                    await apiPut(`/api/admin/tickets/${editing.id}`, {
                      isActive: !editing.isActive,
                    });
                    setEditing(null);
                    fetchTickets();
                  } catch (err) {
                    setError(
                      err instanceof Error ? err.message : "Failed to update status",
                    );
                  } finally {
                    setSaving(false);
                  }
                }}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-muted disabled:opacity-50"
              >
                {editing?.isActive ? "Deactivate" : "Activate"}
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

      {/* Add Modal */}
      {adding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setAdding(false)}
            aria-hidden="true"
          />
          <div className="relative mx-4 w-full max-w-md rounded-xl border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Add Ticket Category</h3>
              <button
                type="button"
                onClick={() => setAdding(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {addError && (
              <div className="mt-3 rounded-lg bg-destructive/10 p-2.5 text-sm text-destructive">
                {addError}
              </div>
            )}

            <div className="mt-4 flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Name</label>
                <input
                  type="text"
                  value={addForm.name}
                  onChange={(e) => setAddForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Adult With Food"
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Slug</label>
                <input
                  type="text"
                  value={addForm.slug}
                  onChange={(e) =>
                    setAddForm((p) => ({ ...p, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))
                  }
                  placeholder="adult-with-food"
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
                <input
                  type="text"
                  value={addForm.description}
                  onChange={(e) => setAddForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Full day access with buffet lunch"
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Base Price (INR)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    inputMode="decimal"
                    value={addForm.basePrice}
                    onFocus={(e) => {
                      if (e.target.value === "0") e.target.select();
                    }}
                    onChange={(e) => setAddForm((p) => ({ ...p, basePrice: e.target.value }))}
                    onBlur={(e) => {
                      if (e.target.value.trim() === "") {
                        setAddForm((p) => ({ ...p, basePrice: "" }));
                      }
                    }}
                    className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Agent Price (INR)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    inputMode="decimal"
                    value={addForm.agentPrice}
                    onFocus={(e) => {
                      if (e.target.value === "0") e.target.select();
                    }}
                    onChange={(e) => setAddForm((p) => ({ ...p, agentPrice: e.target.value }))}
                    onBlur={(e) => {
                      if (e.target.value.trim() === "") {
                        setAddForm((p) => ({ ...p, agentPrice: "" }));
                      }
                    }}
                    className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Height Requirement (cm)</label>
                <input
                  type="number"
                  min={0}
                  value={addForm.heightRequirement}
                  onChange={(e) => setAddForm((p) => ({ ...p, heightRequirement: e.target.value }))}
                  placeholder="120"
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setAdding(false)}
                className="rounded-lg border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreate}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
