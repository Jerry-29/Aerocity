"use client";

import { LayoutDashboard, PlusCircle, CalendarCheck } from "lucide-react";
import { Sidebar, type SidebarLink } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

const agentLinks: SidebarLink[] = [
  { label: "Dashboard", href: "/agent", icon: LayoutDashboard },
  { label: "Book Tickets", href: "/agent/book", icon: PlusCircle },
  { label: "My Bookings", href: "/agent/bookings", icon: CalendarCheck },
];

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar links={agentLinks} panelLabel="Agent Panel" />
      <div className="flex flex-1 flex-col lg:ml-64">
        <DashboardHeader />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
