"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarCheck,
  IndianRupee,
  TrendingUp,
  PlusCircle,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatPrice } from "@/lib/utils";
import { apiGet, apiPost, isSuccessResponse } from "@/lib/api-client";
import { useAuth } from "@/lib/auth-context";

type AgentDashboardResponse = {
  stats: {
    bookingsToday: number;
    totalBookings: number;
    revenueThisMonth: number | string;
  };
  recentBookings: AgentBooking[];
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

const columns: Column<AgentBooking>[] = [
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

export default function AgentDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [showReset, setShowReset] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [stats, setStats] = useState<AgentDashboardResponse["stats"] | null>(null);
  const [bookings, setBookings] = useState<AgentBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (user?.role !== "AGENT") return;
    if (user?.mustResetPassword) {
      setShowReset(true);
    }
  }, [user]);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setDashboardError(null);
        const response = await apiGet<AgentDashboardResponse>("/api/agent/dashboard");
        if (!isSuccessResponse(response)) {
          throw new Error(response.message || "Failed to load dashboard");
        }
        setStats({
          bookingsToday: Number(response.data.stats.bookingsToday) || 0,
          totalBookings: Number(response.data.stats.totalBookings) || 0,
          revenueThisMonth: Number(response.data.stats.revenueThisMonth) || 0,
        });
        setBookings(response.data.recentBookings || []);
      } catch (err) {
        setDashboardError(err instanceof Error ? err.message : "Failed to load dashboard");
        setStats(null);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    setResetSuccess("");

    if (newPassword.length < 6) {
      setResetError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError("Passwords do not match");
      return;
    }

    setResetLoading(true);
    try {
      const response = await apiPost("/api/auth/change-password", {
        newPassword,
        confirmPassword,
      });

      if (!isSuccessResponse(response)) {
        setResetError(response.error || response.message || "Failed to update password");
        return;
      }

      setResetSuccess("Password updated successfully");
      if (typeof window !== "undefined") {
        const cached = sessionStorage.getItem("aerocity_auth_session");
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (parsed?.user) {
              parsed.user.mustResetPassword = false;
              sessionStorage.setItem("aerocity_auth_session", JSON.stringify(parsed));
            }
          } catch {}
        }
      }
      setShowReset(false);
    } catch (error) {
      setResetError(error instanceof Error ? error.message : "Failed to update password");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your booking overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Bookings Today"
          value={String(stats?.bookingsToday ?? 0)}
          icon={CalendarCheck}
        />
        <StatCard
          title="Total Bookings"
          value={String(stats?.totalBookings ?? 0)}
          icon={TrendingUp}
        />
        <StatCard
          title="Revenue This Month"
          value={formatPrice(Number(stats?.revenueThisMonth) || 0)}
          icon={IndianRupee}
        />
      </div>

      {/* Quick Action */}
      <button
        type="button"
        onClick={() => router.push("/agent/book")}
        className="flex items-center gap-2 self-start rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
      >
        <PlusCircle className="h-4 w-4" />
        Book New Tickets
      </button>

      {/* Recent Bookings */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Recent Bookings
          </h2>
          <button
            type="button"
            onClick={() => router.push("/agent/bookings")}
            className="text-sm font-medium text-primary hover:underline"
          >
            View All
          </button>
        </div>
        <DataTable
          columns={columns}
          data={bookings}
          keyField="id"
          onRowClick={(row) =>
            router.push(`/agent/bookings/${row.bookingReference}`)
          }
          emptyMessage={
            loading
              ? "Loading bookings..."
              : dashboardError || "No bookings yet. Start by booking tickets!"
          }
        />
      </div>

      {showReset && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
          <div className="relative mx-4 w-full max-w-md rounded-xl border bg-card p-6 shadow-xl">
            <div className="mb-1 text-lg font-semibold text-foreground">
              Reset Password
            </div>
            <p className="text-sm text-muted-foreground">
              Set a new password to secure your account.
            </p>

            {resetError && (
              <div className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {resetError}
              </div>
            )}
            {resetSuccess && (
              <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">
                {resetSuccess}
              </div>
            )}

            <form onSubmit={handleResetPassword} className="mt-4 flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full rounded-lg border bg-background py-2.5 px-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full rounded-lg border bg-background py-2.5 px-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                type="submit"
                disabled={resetLoading}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {resetLoading && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/60 border-t-primary-foreground" />
                )}
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
