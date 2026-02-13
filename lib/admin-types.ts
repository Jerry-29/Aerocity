import type { TicketSelection } from "./types";

// Auth
export interface AuthUser {
  id: number;
  name: string;
  email?: string;
  mobile?: string;
  role: "ADMIN" | "AGENT";
}

export interface LoginRequest {
  type: "admin" | "agent";
  email?: string;
  mobile?: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

// Dashboard Stats
export interface AdminDashboardStats {
  totalBookingsToday: number;
  revenueToday: number;
  activeAgents: number;
  pendingTestimonials: number;
}

export interface AgentDashboardStats {
  bookingsToday: number;
  totalBookings: number;
  revenueThisMonth: number;
}

// Paginated Response
export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

// Admin Booking
export interface AdminBooking {
  id: number;
  bookingReference: string;
  qrCode: string;
  visitDate: string;
  items: BookingItem[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentStatus: "PAID" | "PENDING" | "FAILED" | "REFUNDED";
  paymentMethod: "ONLINE" | "OFFLINE";
  customerName: string;
  customerMobile: string;
  customerEmail: string;
  isValidated: boolean;
  validatedAt: string | null;
  bookedByRole: "CUSTOMER" | "AGENT";
  agentId: number | null;
  agentName: string | null;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  createdAt: string;
}

export interface BookingItem {
  ticketCategoryId: number;
  ticketName: string;
  quantity: number;
  basePrice: number;
  appliedPrice: number;
  isOfferApplied: boolean;
  totalPrice: number;
}

// Agent
export interface Agent {
  id: number;
  name: string;
  mobile: string;
  email: string | null;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  totalBookings: number;
  totalRevenue: number;
  createdAt: string;
}

// Admin Ticket Category (extended)
export interface AdminTicketCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  offerPrice: number | null;
  agentPrice: number;
  isActive: boolean;
}

// Admin Offer
export interface AdminOffer {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  prices: OfferPrice[];
  createdAt: string;
}

export interface OfferPrice {
  ticketCategoryId: number;
  ticketName: string;
  offerPrice: number;
}

// Admin Media
export interface AdminMedia {
  id: number;
  type: "IMAGE" | "VIDEO";
  url: string;
  thumbnailUrl: string;
  category: "GALLERY" | "ATTRACTION" | "GENERAL";
  isPublic: boolean;
  uploadedBy: number;
  createdAt: string;
}

// Admin Testimonial
export interface AdminTestimonial {
  id: number;
  name: string;
  rating: number;
  content: string;
  isApproved: boolean;
  isFeatured: boolean;
  displayOrder: number;
  createdAt: string;
}

// Admin Announcement
export interface AdminAnnouncement {
  id: number;
  title: string;
  content: string;
  type: "INFO" | "PROMOTION" | "MAINTENANCE";
  validFrom: string;
  validTo: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
}

// Validation
export interface ValidationResult {
  success: boolean;
  bookingReference: string;
  validatedAt: string;
  message: string;
  booking?: AdminBooking;
}

// Agent Booking Form
export interface AgentBookingFormData {
  visitDate: Date | null;
  tickets: TicketSelection[];
  customerName: string;
  customerMobile: string;
  customerEmail: string;
  paymentMethod: "ONLINE" | "OFFLINE";
}

// Booking Filters
export interface BookingFilters {
  dateFrom: string;
  dateTo: string;
  status: string;
  role: string;
  search: string;
  page: number;
}
