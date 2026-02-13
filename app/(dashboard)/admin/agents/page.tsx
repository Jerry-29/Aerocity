"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  X,
  Loader2,
  Phone,
  Mail,
  User,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatPrice, validateMobile, validateEmail } from "@/lib/utils";
import { mockAgents } from "@/lib/admin-data";
import type { Agent } from "@/lib/admin-types";

const columns: Column<Agent>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "mobile", label: "Mobile" },
  { key: "email", label: "Email", render: (row) => row.email || "---" },
  {
    key: "status",
    label: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: "totalBookings",
    label: "Bookings",
    sortable: true,
  },
  {
    key: "totalRevenue",
    label: "Revenue",
    sortable: true,
    render: (row) => formatPrice(row.totalRevenue),
  },
  {
    key: "createdAt",
    label: "Created",
    render: (row) => new Date(row.createdAt).toLocaleDateString("en-IN"),
  },
];

const emptyForm = {
  name: "",
  mobile: "",
  email: "",
  password: "",
};

export default function AdminAgentsPage() {
  const router = useRouter();
  const [agents, setAgents] = useState(mockAgents);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [showPw, setShowPw] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleCreate = async () => {
    setError("");
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!validateMobile(form.mobile)) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    if (form.email && !validateEmail(form.email)) {
      setError("Enter a valid email address");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    const newAgent: Agent = {
      id: Date.now(),
      name: form.name,
      mobile: form.mobile,
      email: form.email || null,
      status: "ACTIVE",
      totalBookings: 0,
      totalRevenue: 0,
      createdAt: new Date().toISOString(),
    };
    setAgents((prev) => [newAgent, ...prev]);
    setSaving(false);
    setSuccessMsg(
      `Agent "${form.name}" created successfully. Mobile: ${form.mobile}, Password: ${form.password}`
    );
    setForm(emptyForm);
  };

  const toggleStatus = (id: number) => {
    setAgents((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        const next =
          a.status === "ACTIVE"
            ? "INACTIVE"
            : a.status === "INACTIVE"
            ? "ACTIVE"
            : "ACTIVE";
        return { ...a, status: next } as Agent;
      })
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Agent Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage booking agents and their accounts
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowCreate(true);
            setSuccessMsg("");
            setError("");
          }}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <UserPlus className="h-4 w-4" />
          Add Agent
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
                    router.push(`/admin/agents/${row.id}`);
                  }}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStatus(row.id);
                  }}
                  className={`text-xs font-medium ${
                    row.status === "ACTIVE"
                      ? "text-destructive"
                      : "text-green-600"
                  } hover:underline`}
                >
                  {row.status === "ACTIVE" ? "Deactivate" : "Activate"}
                </button>
              </div>
            ),
          },
        ]}
        data={agents}
        keyField="id"
        onRowClick={(row) => router.push(`/admin/agents/${row.id}`)}
        emptyMessage="No agents found"
      />

      {/* Create Agent Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setShowCreate(false)}
            aria-hidden="true"
          />
          <div className="relative mx-4 w-full max-w-md rounded-xl border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Add New Agent
              </h3>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {successMsg && (
              <div className="mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-800">
                {successMsg}
              </div>
            )}

            {error && (
              <div className="mt-3 rounded-lg bg-destructive/10 p-2.5 text-sm text-destructive">
                {error}
              </div>
            )}

            {!successMsg && (
              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Agent name"
                      className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="tel"
                      maxLength={10}
                      value={form.mobile}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          mobile: e.target.value.replace(/\D/g, ""),
                        }))
                      }
                      placeholder="10-digit mobile"
                      className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Email (optional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="agent@email.com"
                      className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Initial Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showPw ? "text" : "password"}
                      value={form.password}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, password: e.target.value }))
                      }
                      placeholder="Min 6 characters"
                      className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-10 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
                      {showPw ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
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
                    Create Agent
                  </button>
                </div>
              </div>
            )}

            {successMsg && (
              <button
                type="button"
                onClick={() => {
                  setShowCreate(false);
                  setSuccessMsg("");
                }}
                className="mt-4 w-full rounded-lg border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
