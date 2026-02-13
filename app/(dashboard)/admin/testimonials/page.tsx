"use client";

import { useState } from "react";
import {
  Star,
  CheckCircle2,
  XCircle,
  Eye,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockAdminTestimonials } from "@/lib/admin-data";
import type { AdminTestimonial } from "@/lib/admin-types";

type FilterTab = "all" | "pending" | "approved" | "rejected";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState(mockAdminTestimonials);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filtered = testimonials.filter((t) => {
    if (activeTab === "pending") return !t.isApproved && t.displayOrder === 0;
    if (activeTab === "approved") return t.isApproved;
    if (activeTab === "rejected") return !t.isApproved && t.displayOrder < 0;
    return true;
  });

  const pendingCount = testimonials.filter(
    (t) => !t.isApproved && t.displayOrder >= 0
  ).length;

  const approve = (id: number) => {
    setTestimonials((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isApproved: true, displayOrder: 1 } : t
      )
    );
  };

  const reject = (id: number) => {
    setTestimonials((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isApproved: false, displayOrder: -1 } : t
      )
    );
  };

  const toggleFeatured = (id: number) => {
    setTestimonials((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isFeatured: !t.isFeatured } : t
      )
    );
  };

  const tabs: { value: FilterTab; label: string; count?: number }[] = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending", count: pendingCount },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Testimonial Management
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review and manage customer testimonials
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-muted p-1">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setActiveTab(t.value)}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeTab === t.value
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
            {t.count !== undefined && t.count > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-accent-foreground">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Testimonial Cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-16 text-center">
          <Eye className="h-10 w-10 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            No testimonials in this category
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="flex flex-col rounded-xl border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {t.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {new Date(t.createdAt).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3.5 w-3.5",
                        i < t.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">
                {t.content}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {!t.isApproved && t.displayOrder >= 0 && (
                  <>
                    <button
                      type="button"
                      onClick={() => approve(t.id)}
                      className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => reject(t.id)}
                      className="flex items-center gap-1.5 rounded-lg bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground hover:bg-destructive/90"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      Reject
                    </button>
                  </>
                )}
                {t.isApproved && (
                  <button
                    type="button"
                    onClick={() => toggleFeatured(t.id)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                      t.isFeatured
                        ? "bg-amber-100 text-amber-800"
                        : "border text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <Crown className="h-3.5 w-3.5" />
                    {t.isFeatured ? "Featured" : "Make Featured"}
                  </button>
                )}
                {t.displayOrder < 0 && (
                  <span className="text-xs text-destructive">Rejected</span>
                )}
                {t.isApproved && (
                  <span className="text-xs text-green-600">Approved</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
