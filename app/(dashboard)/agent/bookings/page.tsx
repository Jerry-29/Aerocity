"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatPrice } from "@/lib/utils";
import { mockBookings, paginateData } from "@/lib/admin-data";
import type { AdminBooking } from "@/lib/admin-types";

const agentBookings = mockBookings.filter((b) => b.bookedByRole === "AGENT");

const columns: Column<AdminBooking>[] = [
  { key: "bookingReference", label: "Reference", sortable: true },
  { key: "customerName", label: "Customer", sortable: true },
  { key: "customerMobile", label: "Mobile" },
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
    key: "paymentMethod",
    label: "Payment",
    render: (row) => <StatusBadge status={row.paymentMethod} />,
  },
  {
    key: "createdAt",
    label: "Created",
    sortable: true,
    render: (row) => new Date(row.createdAt).toLocaleDateString("en-IN"),
  },
];

export default function AgentBookingsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return agentBookings.filter((b) => {
      if (status !== "ALL" && b.paymentStatus !== status) return false;
      if (dateFrom && b.visitDate < dateFrom) return false;
      if (dateTo && b.visitDate > dateTo) return false;
      if (
        search &&
        !b.bookingReference.toLowerCase().includes(search.toLowerCase()) &&
        !b.customerName.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [search, status, dateFrom, dateTo]);

  const paginated = paginateData(filtered, page, 20);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View all bookings you have created
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[200px]">
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Reference or name..."
              className="w-full rounded-lg border bg-card py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="ALL">All</option>
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            From
          </label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            To
          </label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={paginated.content}
        keyField="id"
        onRowClick={(row) =>
          router.push(`/agent/bookings/${row.bookingReference}`)
        }
        emptyMessage="No bookings match your filters"
      />

      <DataTablePagination
        currentPage={paginated.currentPage}
        totalPages={paginated.totalPages}
        totalElements={paginated.totalElements}
        onPageChange={setPage}
      />
    </div>
  );
}
