"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Filter, Loader2 } from "lucide-react";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { apiGet, apiPut, apiDelete, isSuccessResponse } from "@/lib/api-client";
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog";

type ContactQuery = {
  id: number;
  name: string;
  email: string | null;
  mobile: string;
  whatsapp: string;
  message: string;
  status: "NEW" | "IN_PROGRESS" | "RESOLVED";
  notes?: string | null;
  createdAt: string;
  updatedAt?: string;
};

const columns: Column<ContactQuery>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "whatsapp", label: "WhatsApp" },
  {
    key: "message",
    label: "Message",
    render: (row) => (
      <span title={row.message} className="block max-w-[280px] truncate text-sm">
        {row.message}
      </span>
    ),
  },
  { key: "status", label: "Status", sortable: true },
  {
    key: "createdAt",
    label: "Created",
    sortable: true,
    render: (row) => new Date(row.createdAt).toLocaleString("en-IN"),
  },
];

export default function AdminContactsPage() {
  const [items, setItems] = useState<ContactQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<string>("");
  const [preview, setPreview] = useState<ContactQuery | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactQuery | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError("");
      const url = `/api/admin/contacts?page=1&pageSize=100${
        status ? `&status=${encodeURIComponent(status)}` : ""
      }`;
      const res = await apiGet<any>(url);
      if (!isSuccessResponse(res)) {
        throw new Error(res.message || "Failed to load contact queries");
      }
      const payload = res.data;
      const list: any[] = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload)
          ? payload
          : [];
      setItems(
        list.map((c: any) => ({
          id: c.id,
          name: c.name,
          email: c.email || null,
          mobile: c.mobile,
          whatsapp: c.whatsapp,
          message: c.message,
          status: c.status || "NEW",
          notes: c.notes || null,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt || c.createdAt,
        })),
      );
    } catch (e: any) {
      setError(e?.message || "Failed to load contact queries");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const updateStatus = async (id: number, next: ContactQuery["status"]) => {
    const res = await apiPut(`/api/admin/contacts/${id}`, { status: next });
    if (isSuccessResponse(res)) {
      await fetchAll();
    }
  };

  const isDeletable = (row: ContactQuery) => {
    if (row.status !== "RESOLVED") return false;
    const dt = new Date(row.updatedAt || row.createdAt);
    const days = (Date.now() - dt.getTime()) / (1000 * 60 * 60 * 24);
    return days >= 45;
    };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    const res = await apiDelete(`/api/admin/contacts/${deleteTarget.id}`);
    setDeleteLoading(false);
    setDeleteTarget(null);
    if (isSuccessResponse(res)) {
      await fetchAll();
    } else {
      setError(res.message || "Failed to delete contact");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contact Queries</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View and manage contact messages sent from the website
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="">All</option>
            <option value="NEW">New</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">
          <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
          Loading queries...
        </div>
      )}
      {!loading && error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

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
                  onClick={() => setPreview(row)}
                  className="rounded-lg border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(row)}
                  disabled={!isDeletable(row)}
                  className="rounded-lg border px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:opacity-50"
                  title={
                    isDeletable(row)
                      ? "Delete this message"
                      : "Can delete only 45+ days after resolved"
                  }
                >
                  Delete
                </button>
                {row.status !== "IN_PROGRESS" && (
                  <button
                    type="button"
                    onClick={() => updateStatus(row.id, "IN_PROGRESS")}
                    className="rounded-lg border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                  >
                    Mark In Progress
                  </button>
                )}
                {row.status !== "RESOLVED" && (
                  <button
                    type="button"
                    onClick={() => updateStatus(row.id, "RESOLVED")}
                    className="rounded-lg border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                  >
                    Resolve
                  </button>
                )}
              </div>
            ),
          },
        ]}
        data={items}
        keyField="id"
        emptyMessage="No contact queries found"
      />

      {preview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-preview-title"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
          <div className="relative mx-4 w-full max-w-2xl rounded-xl border bg-card shadow-xl">
            <div className="flex items-center justify-between border-b px-5 py-3">
              <div>
                <h2
                  id="contact-preview-title"
                  className="text-sm font-semibold text-card-foreground"
                >
                  Message from {preview.name}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {new Date(preview.createdAt).toLocaleString("en-IN")} •{" "}
                  WhatsApp: {preview.whatsapp}
                  {preview.email ? ` • Email: ${preview.email}` : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="rounded-lg border px-2 py-1 text-sm text-muted-foreground hover:bg-muted"
              >
                Close
              </button>
            </div>
            <div className="max-h-[60vh] overflow-auto px-5 py-4">
              <pre className="whitespace-pre-wrap break-words text-sm text-foreground">
                {preview.message}
              </pre>
            </div>
            <div className="flex justify-end border-t px-5 py-3">
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Contact Message"
        description="This action permanently deletes the message. This is only allowed for messages resolved for 45+ days."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
