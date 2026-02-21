"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Download } from "lucide-react";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatPrice } from "@/lib/utils";
import { apiGet, isSuccessResponse } from "@/lib/api-client";
import type { AdminBooking } from "@/lib/admin-types";

const columns: Column<AdminBooking>[] = [
  { key: "bookingReference", label: "Reference", sortable: true },
  { key: "customerName", label: "Customer", sortable: true },
  { key: "customerMobile", label: "Mobile" },
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
    label: "Booked By",
    render: (row) => <StatusBadge status={row.bookedByRole} />,
  },
  {
    key: "createdAt",
    label: "Created",
    sortable: true,
    render: (row) => new Date(row.createdAt).toLocaleDateString("en-IN"),
  },
];

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [role, setRole] = useState("ALL");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalElements: 0,
  });

  useEffect(() => {
    void fetchBookings();
  }, [page, search, status, role, dateFrom, dateTo]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams({
        page: String(page),
        pageSize: "20",
      });

      if (status !== "ALL") params.set("status", status);
      if (role !== "ALL") params.set("bookedByRole", role);
      if (dateFrom) params.set("startDate", dateFrom);
      if (dateTo) params.set("endDate", dateTo);
      if (search.trim()) params.set("search", search.trim());

      const response = await apiGet<any>(`/api/admin/bookings?${params.toString()}`);
      if (!isSuccessResponse(response)) {
        throw new Error(response.message || "Failed to load bookings");
      }

      setBookings(Array.isArray(response.data) ? response.data : []);
      const meta = (response as any).pagination;
      setPagination({
        currentPage: meta?.currentPage || page,
        totalPages: meta?.totalPages || 1,
        totalElements: meta?.totalElements || 0,
      });
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      setError(err instanceof Error ? err.message : "Failed to load bookings");
      setBookings([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalElements: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">All Bookings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage and view all bookings
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
            <option value="ALL">All Statuses</option>
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="ALL">All</option>
            <option value="CUSTOMER">Customer</option>
            <option value="AGENT">Agent</option>
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
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Table */}
      {error && !loading && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {!error && (
        <DataTable
          columns={columns}
          data={bookings}
          keyField="id"
          onRowClick={(row) =>
            router.push(`/admin/bookings/${row.bookingReference}`)
          }
          emptyMessage={loading ? "Loading bookings..." : "No bookings match your filters"}
        />
      )}

      <DataTablePagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalElements={pagination.totalElements}
        onPageChange={setPage}
      />
    </div>
  );
}
