"use client";

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
import { agentDashboardStats, mockBookings } from "@/lib/admin-data";
import type { AdminBooking } from "@/lib/admin-types";

const agentBookings = mockBookings.filter((b) => b.bookedByRole === "AGENT");

const columns: Column<AdminBooking>[] = [
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

export default function AgentDashboardPage() {
  const router = useRouter();

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
          value={String(agentDashboardStats.bookingsToday)}
          icon={CalendarCheck}
          trend="+3 vs yesterday"
          trendUp
        />
        <StatCard
          title="Total Bookings"
          value={String(agentDashboardStats.totalBookings)}
          icon={TrendingUp}
        />
        <StatCard
          title="Revenue This Month"
          value={formatPrice(agentDashboardStats.revenueThisMonth)}
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
          data={agentBookings.slice(0, 10)}
          keyField="id"
          onRowClick={(row) =>
            router.push(`/agent/bookings/${row.bookingReference}`)
          }
          emptyMessage="No bookings yet. Start by booking tickets!"
        />
      </div>
    </div>
  );
}
