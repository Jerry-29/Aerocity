"use client";

import {
  LayoutDashboard,
  CalendarCheck,
  PlusCircle,
  Ticket,
  Tag,
  Users,
  Image,
  MessageSquare,
  Megaphone,
  QrCode,
} from "lucide-react";
import { Sidebar, type SidebarLink } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

const adminLinks: SidebarLink[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Book Tickets", href: "/admin/book", icon: PlusCircle },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { label: "Tickets & Pricing", href: "/admin/tickets", icon: Ticket },
  { label: "Offers", href: "/admin/offers", icon: Tag },
  { label: "Agents", href: "/admin/agents", icon: Users },
  { label: "Media Gallery", href: "/admin/media", icon: Image },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { label: "Contact Queries", href: "/admin/contacts", icon: MessageSquare },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { label: "Validate Entry", href: "/admin/validate", icon: QrCode },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar links={adminLinks} panelLabel="Admin Panel" />
      <div className="flex flex-1 flex-col lg:ml-64">
        <DashboardHeader />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
