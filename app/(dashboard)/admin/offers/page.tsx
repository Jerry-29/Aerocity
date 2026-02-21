"use client";

import { useEffect, useState } from "react";
import {
  Tag,
  Plus,
  X,
  Loader2,
  CheckCircle2,
  XCircle,
  CalendarDays,
  IndianRupee,
} from "lucide-react";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { apiGet, apiPost, apiPut, isSuccessResponse } from "@/lib/api-client";
import type { AdminOffer, OfferPrice } from "@/lib/admin-types";

const columns: Column<AdminOffer>[] = [
  { key: "name", label: "Offer Name", sortable: true },
  {
    key: "startDate",
    label: "Start Date",
    sortable: true,
    render: (row) => new Date(row.startDate).toLocaleDateString("en-IN"),
  },
  {
    key: "endDate",
    label: "End Date",
    sortable: true,
    render: (row) => new Date(row.endDate).toLocaleDateString("en-IN"),
  },
  {
    key: "isActive",
    label: "Status",
    render: (row) => (
      <StatusBadge status={row.isActive ? "ACTIVE" : "INACTIVE"} />
    ),
  },
  {
    key: "createdAt",
    label: "Created",
    render: (row) => new Date(row.createdAt).toLocaleDateString("en-IN"),
  },
];

const emptyForm = {
  name: "",
  startDate: "",
  endDate: "",
  prices: {} as Record<number, number>,
};

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<AdminOffer[]>([]);
  const [tickets, setTickets] = useState<
    Array<{ id: number; name: string; basePrice: number; offerPrice: number | null }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const activeOffer = offers.find((o) => o.isActive);

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [offersRes, ticketsRes] = await Promise.all([
        apiGet<any>("/api/admin/offers?page=1&pageSize=100"),
        apiGet<any>("/api/admin/tickets?page=1&pageSize=100"),
      ]);

      if (!isSuccessResponse(offersRes)) {
        throw new Error(offersRes.message || "Failed to load offers");
      }
      if (!isSuccessResponse(ticketsRes)) {
        throw new Error(ticketsRes.message || "Failed to load tickets");
      }

      const mappedOffers: AdminOffer[] = (offersRes.data || []).map((offer: any) => ({
        id: offer.id,
        name: offer.name,
        startDate: new Date(offer.startDate).toISOString().split("T")[0],
        endDate: new Date(offer.endDate).toISOString().split("T")[0],
        isActive: !!offer.isActive,
        prices: (offer.offerPrices || []).map((p: any) => ({
          ticketCategoryId: p.ticketId,
          ticketName: p.ticket?.name || "Unknown",
          offerPrice: Number(p.offerPrice),
        })),
        createdAt: offer.createdAt,
      }));
      setOffers(mappedOffers);

      const mappedTickets = (ticketsRes.data || []).map((t: any) => ({
        id: t.id,
        name: t.name,
        basePrice: Number(t.basePrice),
        offerPrice: t.offerPrice === null ? null : Number(t.offerPrice),
      }));
      setTickets(mappedTickets);
    } catch (err) {
      console.error("Failed to load offers page data:", err);
      setError(err instanceof Error ? err.message : "Failed to load offers");
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingId(null);
    const defaultPrices: Record<number, number> = {};
    tickets.forEach((t) => {
      defaultPrices[t.id] = t.offerPrice || t.basePrice;
    });
    setForm({ ...emptyForm, prices: defaultPrices });
    setError("");
    setShowForm(true);
  };

  const openEdit = (offer: AdminOffer) => {
    setEditingId(offer.id);
    const prices: Record<number, number> = {};
    offer.prices.forEach((p) => {
      prices[p.ticketCategoryId] = p.offerPrice;
    });
    setForm({
      name: offer.name,
      startDate: offer.startDate,
      endDate: offer.endDate,
      prices,
    });
    setError("");
    setShowForm(true);
  };

  const handleSave = async () => {
    setError("");
    if (!form.name.trim()) {
      setError("Offer name is required");
      return;
    }
    if (!form.startDate || !form.endDate) {
      setError("Start and end dates are required");
      return;
    }
    if (form.startDate > form.endDate) {
      setError("End date must be after start date");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));

    const prices: OfferPrice[] = tickets.map((t) => ({
      ticketCategoryId: t.id,
      ticketName: t.name,
      offerPrice: form.prices[t.id] || t.basePrice,
    }));

    try {
      const payload = {
        name: form.name,
        startDate: form.startDate,
        endDate: form.endDate,
        isActive: false,
        offerPrices: prices.map((p) => ({
          ticketId: p.ticketCategoryId,
          offerPrice: p.offerPrice,
        })),
      };

      const response = editingId
        ? await apiPut(`/api/admin/offers/${editingId}`, payload)
        : await apiPost("/api/admin/offers", payload);

      if (!isSuccessResponse(response as any)) {
        throw new Error((response as any).message || "Failed to save offer");
      }

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save offer");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (id: number) => {
    try {
      const offer = offers.find((o) => o.id === id);
      if (!offer) return;

      const response = await apiPut(`/api/admin/offers/${id}`, {
        isActive: !offer.isActive,
      });
      if (!isSuccessResponse(response as any)) {
        throw new Error((response as any).message || "Failed to update offer");
      }

      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update offer");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Offer Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create and manage special offers
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Create Offer
        </button>
      </div>

      {/* Active Offer Banner */}
      {activeOffer && (
        <div className="flex items-center justify-between rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <Tag className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <p className="text-sm font-semibold text-green-900">
                Active Offer: {activeOffer.name}
              </p>
              <p className="text-xs text-green-700">
                {new Date(activeOffer.startDate).toLocaleDateString("en-IN")} -{" "}
                {new Date(activeOffer.endDate).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => toggleActive(activeOffer.id)}
            className="flex items-center gap-1.5 rounded-lg bg-green-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-800"
          >
            <XCircle className="h-3.5 w-3.5" />
            Deactivate
          </button>
        </div>
      )}

      {loading && (
        <div className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">
          Loading offers...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Offers Table */}
      <DataTable
        columns={[
          ...columns,
          {
            key: "actions",
            label: "Actions",
            render: (row) => (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEdit(row);
                  }}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleActive(row.id);
                  }}
                  className={`flex items-center gap-1 text-xs font-medium ${
                    row.isActive
                      ? "text-destructive hover:underline"
                      : "text-green-600 hover:underline"
                  }`}
                >
                  {row.isActive ? "Deactivate" : "Activate"}
                </button>
              </div>
            ),
          },
        ]}
        data={offers}
        keyField="id"
        emptyMessage="No offers created yet"
      />

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
            aria-hidden="true"
          />
          <div className="relative mx-4 w-full max-w-lg rounded-xl border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {editingId ? "Edit Offer" : "Create New Offer"}
              </h3>
              <button
                type="button"
                onClick={() => setShowForm(false)}
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
                  Offer Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="e.g. Summer Splash Sale"
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    <CalendarDays className="mr-1 inline h-3.5 w-3.5" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, startDate: e.target.value }))
                    }
                    className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    <CalendarDays className="mr-1 inline h-3.5 w-3.5" />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, endDate: e.target.value }))
                    }
                    className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-foreground">
                  Offer Prices per Category
                </p>
                <div className="flex flex-col gap-2">
                  {tickets.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
                    >
                      <span className="text-sm text-foreground">{t.name}</span>
                      <div className="relative w-28">
                        <IndianRupee className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="number"
                          min={0}
                          value={form.prices[t.id] || 0}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              prices: {
                                ...p.prices,
                                [t.id]: Number(e.target.value),
                              },
                            }))
                          }
                          className="w-full rounded-md border bg-background py-1.5 pl-7 pr-2 text-sm outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
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
                {editingId ? "Save Changes" : "Create Offer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
