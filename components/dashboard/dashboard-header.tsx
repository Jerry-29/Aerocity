"use client";

import { useEffect, useState } from "react";
import { LogOut, Loader2, Bell } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function DashboardHeader() {
  const { user, logout, isLoading } = useAuth();
  const [contactCount, setContactCount] = useState<number>(0);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (user?.role !== "ADMIN") return;
      try {
        const res = await fetch("/api/admin/contacts?page=1&pageSize=1&status=NEW", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const json = await res.json();
        const total = json?.pagination?.totalElements ?? 0;
        if (mounted) setContactCount(Number(total) || 0);
      } catch {
        if (mounted) setContactCount(0);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [user?.role]);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-card px-4 py-3 lg:px-6">
      {/* Left spacer for mobile menu button */}
      <div className="w-10 lg:hidden" />

      <div className="hidden lg:block">
        <h2 className="text-sm font-medium text-muted-foreground">
          Welcome back,{" "}
          <span className="text-foreground">{user?.name || "User"}</span>
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {user?.role === "ADMIN" && (
          <a
            href="/admin/contacts"
            className="relative inline-flex items-center justify-center rounded-lg border px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
            aria-label="Contact queries"
            title="Contact queries"
          >
            <Bell className="h-4 w-4" />
            {contactCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                {contactCount > 99 ? "99+" : contactCount}
              </span>
            )}
          </a>
        )}
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            user?.role === "ADMIN"
              ? "bg-primary/10 text-primary"
              : "bg-secondary/10 text-secondary"
          }`}
        >
          {user?.role || "---"}
        </span>
        <button
          type="button"
          onClick={logout}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
