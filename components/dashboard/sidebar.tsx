"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Droplets, Menu, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SidebarLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarProps {
  links: SidebarLink[];
  panelLabel: string;
}

export function Sidebar({ links, panelLabel }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin" || href === "/agent") return pathname === href;
    return pathname.startsWith(href);
  };

  const nav = (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive(link.href)
                ? "bg-primary-foreground/10 text-primary-foreground"
                : "text-primary-foreground/60 hover:bg-primary-foreground/5 hover:text-primary-foreground/90"
            )}
          >
            <Icon className="h-4.5 w-4.5 shrink-0" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-primary transition-transform duration-300 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-primary-foreground/10 px-4 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/15">
              <Droplets className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-primary-foreground leading-tight">
                Aerocity
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-primary-foreground/60">
                {panelLabel}
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-primary-foreground/60 hover:text-primary-foreground lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto">{nav}</div>

        {/* Footer */}
        <div className="border-t border-primary-foreground/10 px-4 py-3">
          <p className="text-[10px] text-primary-foreground/40">
            Aerocity Management Portal
          </p>
        </div>
      </aside>
    </>
  );
}
