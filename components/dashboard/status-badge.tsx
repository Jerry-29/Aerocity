import { cn } from "@/lib/utils";

const variants: Record<string, string> = {
  PAID: "bg-green-100 text-green-800",
  PENDING: "bg-amber-100 text-amber-800",
  FAILED: "bg-red-100 text-red-800",
  REFUNDED: "bg-blue-100 text-blue-800",
  ACTIVE: "bg-green-100 text-green-800",
  INACTIVE: "bg-gray-100 text-gray-700",
  SUSPENDED: "bg-red-100 text-red-800",
  ONLINE: "bg-blue-100 text-blue-800",
  OFFLINE: "bg-gray-100 text-gray-700",
  CUSTOMER: "bg-blue-100 text-blue-800",
  AGENT: "bg-purple-100 text-purple-800",
  INFO: "bg-blue-100 text-blue-800",
  PROMOTION: "bg-amber-100 text-amber-800",
  MAINTENANCE: "bg-orange-100 text-orange-800",
  IMAGE: "bg-cyan-100 text-cyan-800",
  VIDEO: "bg-pink-100 text-pink-800",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variants[status] || "bg-gray-100 text-gray-700",
        className
      )}
    >
      {status}
    </span>
  );
}
