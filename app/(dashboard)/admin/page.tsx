"use client";

import { useRouter } from "next/navigation";
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
import {
  adminDashboardStats,
  mockBookings,
} from "@/lib/admin-data";
import type { AdminBooking } from "@/lib/admin-types";

const recentColumns: Column<AdminBooking>[] = [
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
  {
    key: "bookedByRole",
    label: "Type",
    render: (row) => <StatusBadge status={row.bookedByRole} />,
  },
];

export default function AdminDashboardPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of today{"'"}s operations
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Bookings Today"
          value={String(adminDashboardStats.totalBookingsToday)}
          icon={CalendarCheck}
          trend="+12% vs yesterday"
          trendUp
        />
        <StatCard
          title="Revenue Today"
          value={formatPrice(adminDashboardStats.revenueToday)}
          icon={IndianRupee}
          trend="+8% vs yesterday"
          trendUp
        />
        <StatCard
          title="Active Agents"
          value={String(adminDashboardStats.activeAgents)}
          icon={Users}
        />
        <StatCard
          title="Pending Reviews"
          value={String(adminDashboardStats.pendingTestimonials)}
          icon={MessageSquare}
        />
      </div>

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
          data={mockBookings.slice(0, 10)}
          keyField="id"
          onRowClick={(row) =>
            router.push(`/admin/bookings/${row.bookingReference}`)
          }
        />
      </div>
    </div>
  );
}
