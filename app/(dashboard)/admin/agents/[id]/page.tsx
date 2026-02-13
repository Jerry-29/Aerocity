"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  CalendarDays,
  IndianRupee,
  CalendarCheck,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog";
import { formatPrice } from "@/lib/utils";
import { mockAgents, mockBookings } from "@/lib/admin-data";
import type { AdminBooking } from "@/lib/admin-types";

const bookingCols: Column<AdminBooking>[] = [
  { key: "bookingReference", label: "Reference", sortable: true },
  { key: "customerName", label: "Customer", sortable: true },
  { key: "visitDate", label: "Visit Date", sortable: true },
  {
    key: "finalAmount",
    label: "Amount",
    sortable: true,
    render: (row) => formatPrice(row.finalAmount),
  },
  {
    key: "paymentStatus",
    label: "Status",
    render: (row) => <StatusBadge status={row.paymentStatus} />,
  },
];

export default function AdminAgentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const agentId = Number(params.id);
  const agent = mockAgents.find((a) => a.id === agentId);

  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [targetStatus, setTargetStatus] = useState<string>("");

  if (!agent) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-semibold text-foreground">Agent not found</p>
        <button
          type="button"
          onClick={() => router.push("/admin/agents")}
          className="mt-4 text-sm font-medium text-primary hover:underline"
        >
          Back to Agents
        </button>
      </div>
    );
  }

  const agentBookings = mockBookings.filter(
    (b) => b.agentId === agent.id
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/agents")}
          className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-foreground">{agent.name}</h1>
          <div className="mt-0.5 flex items-center gap-2">
            <StatusBadge status={agent.status} />
            <span className="text-sm text-muted-foreground">
              Since{" "}
              {new Date(agent.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Agent Info */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-foreground">
          Agent Information
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Name</p>
              <p className="text-sm font-medium text-foreground">
                {agent.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Mobile</p>
              <p className="text-sm font-medium text-foreground">
                {agent.mobile}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground">
                {agent.email || "Not set"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {agent.status !== "ACTIVE" && (
            <button
              type="button"
              onClick={() => {
                setTargetStatus("ACTIVE");
                setShowStatusDialog(true);
              }}
              className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700"
            >
              Activate
            </button>
          )}
          {agent.status !== "SUSPENDED" && (
            <button
              type="button"
              onClick={() => {
                setTargetStatus("SUSPENDED");
                setShowStatusDialog(true);
              }}
              className="rounded-lg bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground hover:bg-destructive/90"
            >
              Suspend
            </button>
          )}
          {agent.status === "ACTIVE" && (
            <button
              type="button"
              onClick={() => {
                setTargetStatus("INACTIVE");
                setShowStatusDialog(true);
              }}
              className="rounded-lg border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted"
            >
              Deactivate
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Bookings"
          value={String(agent.totalBookings)}
          icon={CalendarCheck}
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(agent.totalRevenue)}
          icon={IndianRupee}
        />
        <StatCard
          title="Member Since"
          value={new Date(agent.createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          icon={CalendarDays}
        />
      </div>

      {/* Booking History */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">
          Booking History
        </h2>
        <DataTable
          columns={bookingCols}
          data={agentBookings}
          keyField="id"
          onRowClick={(row) =>
            router.push(`/admin/bookings/${row.bookingReference}`)
          }
          emptyMessage="No bookings found for this agent"
        />
      </div>

      <ConfirmDialog
        open={showStatusDialog}
        title="Change Agent Status"
        description={`Are you sure you want to set ${agent.name}'s status to ${targetStatus}?`}
        confirmLabel={`Set ${targetStatus}`}
        variant={targetStatus === "SUSPENDED" ? "destructive" : "default"}
        onConfirm={() => {
          setShowStatusDialog(false);
        }}
        onCancel={() => setShowStatusDialog(false)}
      />
    </div>
  );
}
