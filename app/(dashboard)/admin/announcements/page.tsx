"use client";

import { useEffect, useState } from "react";
import {
  Megaphone,
  Plus,
  X,
  Loader2,
  CalendarDays,
  Trash2,
} from "lucide-react";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog";
import { apiGet, apiPost, apiPut, apiDelete, isSuccessResponse } from "@/lib/api-client";
import type { AdminAnnouncement } from "@/lib/admin-types";

const columns: Column<AdminAnnouncement>[] = [
  { key: "title", label: "Title", sortable: true },
  {
    key: "type",
    label: "Type",
    render: (row) => <StatusBadge status={row.type} />,
  },
  {
    key: "validFrom",
    label: "From",
    render: (row) => new Date(row.validFrom).toLocaleDateString("en-IN"),
  },
  {
    key: "validTo",
    label: "To",
    render: (row) => new Date(row.validTo).toLocaleDateString("en-IN"),
  },
  {
    key: "isActive",
    label: "Status",
    render: (row) => (
      <StatusBadge status={row.isActive ? "ACTIVE" : "INACTIVE"} />
    ),
  },
  { key: "displayOrder", label: "Order", sortable: true },
];

const emptyForm = {
  title: "",
  content: "",
  type: "INFO" as AdminAnnouncement["type"],
  validFrom: "",
  validTo: "",
  displayOrder: 1,
};

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AdminAnnouncement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<AdminAnnouncement | null>(
    null
  );

  const parseMeta = (content: string) => {
    const pr = content.match(/\[PRIORITY:(\d+)\]/i);
    const val = content.match(/\[VALID:([0-9-]+),([0-9-]+)\]/i);
    const aud = content.match(/\[AUDIENCE:(PUBLIC|AGENT|ADMIN)\]/i);
    return {
      priority: pr ? parseInt(pr[1], 10) : 0,
      validFrom: val ? val[1] : "",
      validTo: val ? val[2] : "",
      audience: aud ? (aud[1] as string) : "PUBLIC",
      clean: content.replace(/\s*\[(PRIORITY|VALID|AUDIENCE):[^\]]+\]\s*/gi, "").trim(),
    };
  };

  const fetchAll = async () => {
    try {
      setError("");
      const res = await apiGet<any>("/api/admin/announcements?page=1&limit=100");
      if (!isSuccessResponse(res)) {
        throw new Error(res.message || "Failed to load announcements");
      }
      const payload: any = res.data;
      const items: any[] = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];
      const mapped: AdminAnnouncement[] = items.map((a: any) => {
        const meta = parseMeta(a.content || "");
        return {
          id: a.id,
          title: a.title,
          content: meta.clean,
          type: (a.type || "INFO").toUpperCase(),
          validFrom: meta.validFrom || new Date(a.createdAt).toISOString().split("T")[0],
          validTo: meta.validTo || new Date(a.createdAt).toISOString().split("T")[0],
          isActive: !!a.isActive,
          displayOrder: meta.priority || 0,
          createdAt: a.createdAt,
        };
      });
      setAnnouncements(mapped);
    } catch (e: any) {
      setError(e?.message || "Failed to load announcements");
      setAnnouncements([]);
    }
  };

  useEffect(() => {
    void fetchAll();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  };

  const openEdit = (a: AdminAnnouncement) => {
    setEditingId(a.id);
    setForm({
      title: a.title,
      content: a.content,
      type: a.type,
      validFrom: a.validFrom,
      validTo: a.validTo,
      displayOrder: a.displayOrder,
    });
    setError("");
    setShowForm(true);
  };

  const handleSave = async () => {
    setError("");
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!form.content.trim()) {
      setError("Content is required");
      return;
    }
    if (!form.validFrom || !form.validTo) {
      setError("Valid from and to dates are required");
      return;
    }
    setSaving(true);
    try {
      const payload: any = {
        title: form.title,
        content: form.content,
        type: form.type,
        isActive: true,
        priority: form.displayOrder,
        validFrom: form.validFrom,
        validTo: form.validTo,
        audience: "PUBLIC",
      };
      const res = editingId
        ? await apiPut(`/api/admin/announcements/${editingId}`, payload)
        : await apiPost(`/api/admin/announcements`, payload);
      if (!isSuccessResponse(res)) {
        throw new Error((res as any).message || "Failed to save announcement");
      }
      await fetchAll();
      setShowForm(false);
    } catch (e: any) {
      setError(e?.message || "Failed to save announcement");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (id: number) => {
    const row = announcements.find((a) => a.id === id);
    if (!row) return;
    const res = await apiPut(`/api/admin/announcements/${id}`, {
      isActive: !row.isActive,
    });
    if (isSuccessResponse(res)) {
      await fetchAll();
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const res = await apiDelete(`/api/admin/announcements/${deleteTarget.id}`);
    if (isSuccessResponse(res)) {
      await fetchAll();
    }
    setDeleteTarget(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Announcements</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage park announcements and notices
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          New Announcement
        </button>
      </div>

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
                  className={`text-xs font-medium ${
                    row.isActive
                      ? "text-destructive"
                      : "text-green-600"
                  } hover:underline`}
                >
                  {row.isActive ? "Deactivate" : "Activate"}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTarget(row);
                  }}
                  className="text-xs font-medium text-destructive hover:underline"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ),
          },
        ]}
        data={announcements}
        keyField="id"
        emptyMessage="No announcements created yet"
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
                {editingId ? "Edit Announcement" : "New Announcement"}
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
                  Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="Announcement title"
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Content
                </label>
                <textarea
                  rows={3}
                  value={form.content}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, content: e.target.value }))
                  }
                  placeholder="Announcement details..."
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      type: e.target.value as AdminAnnouncement["type"],
                    }))
                  }
                  className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                >
                  <option value="INFO">Info</option>
                  <option value="PROMOTION">Promotion</option>
                  <option value="MAINTENANCE">Maintenance</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    <CalendarDays className="mr-1 inline h-3.5 w-3.5" />
                    Valid From
                  </label>
                  <input
                    type="date"
                    value={form.validFrom}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, validFrom: e.target.value }))
                    }
                    className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    <CalendarDays className="mr-1 inline h-3.5 w-3.5" />
                    Valid To
                  </label>
                  <input
                    type="date"
                    value={form.validTo}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, validTo: e.target.value }))
                    }
                    className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Display Order
                </label>
                <input
                  type="number"
                  min={1}
                  value={form.displayOrder}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      displayOrder: Number(e.target.value),
                    }))
                  }
                  className="w-24 rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
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
                {editingId ? "Save Changes" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Announcement"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
