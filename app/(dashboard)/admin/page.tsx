"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CalendarCheck,
  IndianRupee,
  Users,
  MessageSquare,
  Plus,
  Upload,
  UserPlus,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatPrice } from "@/lib/utils";
import { apiGet, isSuccessResponse } from "@/lib/api-client";
import type { AdminBooking, AdminDashboardStats } from "@/lib/admin-types";

type DashboardApiData = {
  summary: {
    totalBookings: number;
    totalUsers: number;
    totalTickets: number;
    totalOffers: number;
    activeOffers: number;
    totalTestimonials: number;
    approvedTestimonials: number;
    featuredTestimonials: number;
    totalAnnouncements: number;
    pendingValidation: number;
    totalRevenue: number | string;
  };
};

const recentColumns: Column<AdminBooking>[] = [
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
  {
    key: "bookedByRole",
    label: "Type",
    render: (row) => <StatusBadge status={row.bookedByRole} />,
  },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch dashboard statistics
      const statsData = await apiGet<DashboardApiData>("/api/admin/dashboard");
      if (!isSuccessResponse(statsData)) {
        throw new Error(statsData.message || "Failed to load dashboard stats");
      }
      setStats({
        totalBookingsToday: Number(statsData.data.summary.totalBookings) || 0,
        revenueToday: Number(statsData.data.summary.totalRevenue) || 0,
        activeAgents: Number(statsData.data.summary.totalUsers) || 0,
        pendingTestimonials:
          Number(statsData.data.summary.totalTestimonials) -
            Number(statsData.data.summary.approvedTestimonials) || 0,
      });

      // Fetch recent bookings
      const bookingsData = await apiGet<AdminBooking[]>("/api/admin/bookings?page=1&pageSize=10");
      if (!isSuccessResponse(bookingsData)) {
        throw new Error(bookingsData.message || "Failed to load bookings");
      }
      setBookings(bookingsData.data || []);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of today{"'"}s operations
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary mx-auto mb-3"></div>
            <p className="text-sm text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">
            {error}
          </p>
          <button
            type="button"
            onClick={fetchDashboardData}
            className="mt-2 text-sm font-medium text-red-600 hover:text-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* KPI Stats */}
      {!loading && !error && stats && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Bookings Today"
            value={String(stats.totalBookingsToday)}
            icon={CalendarCheck}
            trend="+12% vs yesterday"
            trendUp
          />
          <StatCard
            title="Revenue Today"
            value={formatPrice(stats.revenueToday)}
            icon={IndianRupee}
            trend="+8% vs yesterday"
            trendUp
          />
          <StatCard
            title="Active Agents"
            value={String(stats.activeAgents)}
            icon={Users}
          />
          <StatCard
            title="Pending Reviews"
            value={String(stats.pendingTestimonials)}
            icon={MessageSquare}
          />
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/offers")}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Create Offer
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/agents")}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          <UserPlus className="h-4 w-4" />
          Add Agent
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/media")}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          <Upload className="h-4 w-4" />
          Upload Media
        </button>
      </div>

      {/* Recent Bookings */}
      {!loading && !error && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Recent Bookings
            </h2>
            <button
              type="button"
              onClick={() => router.push("/admin/bookings")}
              className="text-sm font-medium text-primary hover:underline"
            >
              View All
            </button>
          </div>
          <DataTable
            columns={recentColumns}
            data={bookings}
            keyField="id"
            onRowClick={(row) =>
              router.push(`/admin/bookings/${row.bookingReference}`)
            }
          />
        </div>
      )}
    </div>
  );
}
