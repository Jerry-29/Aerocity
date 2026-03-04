"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatPrice } from "@/lib/utils";
import { apiGet, isSuccessResponse } from "@/lib/api-client";

interface AgentBookingRow {
  id: number;
  bookingReference: string;
  customerName: string;
  customerMobile: string;
  visitDate: string;
  totalAmount: number | string;
  paymentStatus: string;
  createdAt: string;
}

const columns: Column<AgentBookingRow>[] = [
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
  const [bookings, setBookings] = useState<AgentBookingRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalElements: 0,
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams({
          page: String(page),
          pageSize: "20",
        });

        if (status !== "ALL") params.set("status", status);
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

    fetchBookings();
  }, [page, status, dateFrom, dateTo, search]);

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
        data={bookings}
        keyField="id"
        onRowClick={(row) =>
          router.push(`/agent/bookings/${row.bookingReference}`)
        }
        emptyMessage={loading ? "Loading bookings..." : error || "No bookings match your filters"}
      />

      <DataTablePagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalElements={pagination.totalElements}
        onPageChange={setPage}
      />
    </div>
  );
}
