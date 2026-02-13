"use client";

import { LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function DashboardHeader() {
  const { user, logout, isLoading } = useAuth();

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
