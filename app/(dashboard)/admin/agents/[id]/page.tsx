"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
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
import { apiGet, apiPut, isSuccessResponse } from "@/lib/api-client";

type AgentDetail = {
  id: number;
  name: string;
  email: string | null;
  mobile: string;
  role: "AGENT";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  createdAt: string;
};

type AgentBooking = {
  id: number;
  bookingReference: string;
  visitDate: string;
  customerName: string;
  totalAmount: number | string;
  paymentStatus: string;
  createdAt: string;
};

type AgentDetailResponse = {
  agent: AgentDetail;
  stats: {
    totalBookings: number;
    totalRevenue: number | string;
  };
  recentBookings: AgentBooking[];
};

const bookingCols: Column<AgentBooking>[] = [
  { key: "bookingReference", label: "Reference", sortable: true },
  { key: "customerName", label: "Customer", sortable: true },
  { key: "visitDate", label: "Visit Date", sortable: true },
  {
    key: "totalAmount",
    label: "Amount",
    sortable: true,
    render: (row) => formatPrice(Number(row.totalAmount) || 0),
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
  const [agent, setAgent] = useState<AgentDetail | null>(null);
  const [stats, setStats] = useState<AgentDetailResponse["stats"] | null>(null);
  const [agentBookings, setAgentBookings] = useState<AgentBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [targetStatus, setTargetStatus] = useState<string>("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const fetchAgent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiGet<AgentDetailResponse>(
          `/api/admin/agents/${agentId}`,
        );
        if (!isSuccessResponse(response)) {
          throw new Error(response.message || "Failed to load agent");
        }
        setAgent(response.data.agent);
        setStats(response.data.stats);
        setAgentBookings(response.data.recentBookings || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load agent");
        setAgent(null);
        setStats(null);
        setAgentBookings([]);
      } finally {
        setLoading(false);
      }
    };

    if (!Number.isNaN(agentId)) {
      fetchAgent();
    }
  }, [agentId]);

  const handleUpdateStatus = async () => {
    if (!agent) return;
    setUpdatingStatus(true);
    try {
      const response = await apiPut(`/api/admin/users/${agent.id}`, {
        status: targetStatus,
      });
      if (!isSuccessResponse(response)) {
        throw new Error(response.message || "Failed to update status");
      }
      setAgent((prev) => (prev ? { ...prev, status: targetStatus as any } : prev));
      setShowStatusDialog(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading && !agent) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-semibold text-foreground">Loading agent...</p>
      </div>
    );
  }

  if (!agent && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-semibold text-foreground">
          {error || "Agent not found"}
        </p>
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

  return (
    !agent ? null : (
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

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

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
          value={String(stats?.totalBookings ?? 0)}
          icon={CalendarCheck}
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(Number(stats?.totalRevenue) || 0)}
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
          emptyMessage={
            loading ? "Loading bookings..." : "No bookings found for this agent"
          }
        />
      </div>

      <ConfirmDialog
        open={showStatusDialog}
        title="Change Agent Status"
        description={`Are you sure you want to set ${agent.name}'s status to ${targetStatus}?`}
        confirmLabel={`Set ${targetStatus}`}
        variant={targetStatus === "SUSPENDED" ? "destructive" : "default"}
        onConfirm={handleUpdateStatus}
        onCancel={() => setShowStatusDialog(false)}
        loading={updatingStatus}
      />
    </div>
    )
  );
}
