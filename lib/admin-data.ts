import type {
  AdminDashboardStats,
  AgentDashboardStats,
  AdminBooking,
  Agent,
  AdminTicketCategory,
  AdminOffer,
  AdminMedia,
  AdminTestimonial,
  AdminAnnouncement,
  PaginatedResponse,
} from "./admin-types";

export const adminDashboardStats: AdminDashboardStats = {
  totalBookingsToday: 47,
  revenueToday: 58600,
  activeAgents: 12,
  pendingTestimonials: 5,
};

export const agentDashboardStats: AgentDashboardStats = {
  bookingsToday: 8,
  totalBookings: 234,
  revenueThisMonth: 187500,
};

export const mockBookings: AdminBooking[] = [
  {
    id: 1, bookingReference: "AERO-2026-100001", qrCode: "", visitDate: "2026-02-15",
    items: [
      { ticketCategoryId: 1, ticketName: "Adult With Food", quantity: 2, basePrice: 1200, appliedPrice: 999, isOfferApplied: true, totalPrice: 1998 },
      { ticketCategoryId: 3, ticketName: "Kid With Food", quantity: 1, basePrice: 900, appliedPrice: 749, isOfferApplied: true, totalPrice: 749 },
    ],
    totalAmount: 3300, discountAmount: 553, finalAmount: 2747,
    paymentStatus: "PAID", paymentMethod: "ONLINE",
    customerName: "Rahul Sharma", customerMobile: "9876543210", customerEmail: "rahul@example.com",
    isValidated: false, validatedAt: null,
    bookedByRole: "CUSTOMER", agentId: null, agentName: null,
    razorpayOrderId: "order_abc123", razorpayPaymentId: "pay_xyz789",
    createdAt: "2026-02-13T10:30:00Z",
  },
  {
    id: 2, bookingReference: "AERO-2026-100002", qrCode: "", visitDate: "2026-02-16",
    items: [
      { ticketCategoryId: 1, ticketName: "Adult With Food", quantity: 4, basePrice: 1200, appliedPrice: 850, isOfferApplied: false, totalPrice: 3400 },
    ],
    totalAmount: 4800, discountAmount: 1400, finalAmount: 3400,
    paymentStatus: "PAID", paymentMethod: "OFFLINE",
    customerName: "Anita Gupta", customerMobile: "9123456789", customerEmail: "anita@example.com",
    isValidated: true, validatedAt: "2026-02-16T09:15:00Z",
    bookedByRole: "AGENT", agentId: 1, agentName: "Vikram Agent",
    razorpayOrderId: null, razorpayPaymentId: null,
    createdAt: "2026-02-14T14:20:00Z",
  },
  {
    id: 3, bookingReference: "AERO-2026-100003", qrCode: "", visitDate: "2026-02-17",
    items: [
      { ticketCategoryId: 2, ticketName: "Adult Without Food", quantity: 3, basePrice: 800, appliedPrice: 699, isOfferApplied: true, totalPrice: 2097 },
      { ticketCategoryId: 4, ticketName: "Kid Without Food", quantity: 2, basePrice: 600, appliedPrice: 499, isOfferApplied: true, totalPrice: 998 },
    ],
    totalAmount: 3600, discountAmount: 505, finalAmount: 3095,
    paymentStatus: "PAID", paymentMethod: "ONLINE",
    customerName: "Deepak Patel", customerMobile: "9988776655", customerEmail: "deepak@example.com",
    isValidated: false, validatedAt: null,
    bookedByRole: "CUSTOMER", agentId: null, agentName: null,
    razorpayOrderId: "order_def456", razorpayPaymentId: "pay_ghi012",
    createdAt: "2026-02-13T16:45:00Z",
  },
  {
    id: 4, bookingReference: "AERO-2026-100004", qrCode: "", visitDate: "2026-02-14",
    items: [
      { ticketCategoryId: 1, ticketName: "Adult With Food", quantity: 1, basePrice: 1200, appliedPrice: 999, isOfferApplied: true, totalPrice: 999 },
    ],
    totalAmount: 1200, discountAmount: 201, finalAmount: 999,
    paymentStatus: "PENDING", paymentMethod: "ONLINE",
    customerName: "Meera Joshi", customerMobile: "9112233445", customerEmail: "",
    isValidated: false, validatedAt: null,
    bookedByRole: "CUSTOMER", agentId: null, agentName: null,
    razorpayOrderId: "order_jkl345", razorpayPaymentId: null,
    createdAt: "2026-02-13T18:00:00Z",
  },
  {
    id: 5, bookingReference: "AERO-2026-100005", qrCode: "", visitDate: "2026-02-18",
    items: [
      { ticketCategoryId: 1, ticketName: "Adult With Food", quantity: 6, basePrice: 1200, appliedPrice: 850, isOfferApplied: false, totalPrice: 5100 },
      { ticketCategoryId: 3, ticketName: "Kid With Food", quantity: 3, basePrice: 900, appliedPrice: 650, isOfferApplied: false, totalPrice: 1950 },
    ],
    totalAmount: 12600, discountAmount: 5550, finalAmount: 7050,
    paymentStatus: "PAID", paymentMethod: "OFFLINE",
    customerName: "Sunil Verma", customerMobile: "8877665544", customerEmail: "sunil@example.com",
    isValidated: false, validatedAt: null,
    bookedByRole: "AGENT", agentId: 2, agentName: "Priya Agent",
    razorpayOrderId: null, razorpayPaymentId: null,
    createdAt: "2026-02-12T11:30:00Z",
  },
  {
    id: 6, bookingReference: "AERO-2026-100006", qrCode: "", visitDate: "2026-02-13",
    items: [
      { ticketCategoryId: 2, ticketName: "Adult Without Food", quantity: 2, basePrice: 800, appliedPrice: 699, isOfferApplied: true, totalPrice: 1398 },
    ],
    totalAmount: 1600, discountAmount: 202, finalAmount: 1398,
    paymentStatus: "FAILED", paymentMethod: "ONLINE",
    customerName: "Kavita Singh", customerMobile: "7766554433", customerEmail: "kavita@example.com",
    isValidated: false, validatedAt: null,
    bookedByRole: "CUSTOMER", agentId: null, agentName: null,
    razorpayOrderId: "order_mno678", razorpayPaymentId: null,
    createdAt: "2026-02-13T08:20:00Z",
  },
];

export const mockAgents: Agent[] = [
  { id: 1, name: "Vikram Agent", mobile: "9876501234", email: "vikram@agent.com", status: "ACTIVE", totalBookings: 89, totalRevenue: 245000, createdAt: "2025-10-01T10:00:00Z" },
  { id: 2, name: "Priya Agent", mobile: "9876501235", email: "priya@agent.com", status: "ACTIVE", totalBookings: 67, totalRevenue: 189000, createdAt: "2025-11-15T10:00:00Z" },
  { id: 3, name: "Amit Travel Services", mobile: "9876501236", email: "amit@agent.com", status: "ACTIVE", totalBookings: 134, totalRevenue: 412000, createdAt: "2025-08-20T10:00:00Z" },
  { id: 4, name: "Ritu Tours", mobile: "9876501237", email: null, status: "INACTIVE", totalBookings: 23, totalRevenue: 56000, createdAt: "2025-12-01T10:00:00Z" },
  { id: 5, name: "Sanjay Holidays", mobile: "9876501238", email: "sanjay@agent.com", status: "SUSPENDED", totalBookings: 45, totalRevenue: 123000, createdAt: "2025-09-10T10:00:00Z" },
];

export const mockAdminTickets: AdminTicketCategory[] = [
  { id: 1, name: "Adult With Food", slug: "adult-with-food", description: "Full day access with buffet lunch", basePrice: 1200, offerPrice: 999, agentPrice: 850, isActive: true },
  { id: 2, name: "Adult Without Food", slug: "adult-without-food", description: "Full day access to all rides", basePrice: 800, offerPrice: 699, agentPrice: 600, isActive: true },
  { id: 3, name: "Kid With Food", slug: "kid-with-food", description: "Full day access for children (3-12) with buffet", basePrice: 900, offerPrice: 749, agentPrice: 650, isActive: true },
  { id: 4, name: "Kid Without Food", slug: "kid-without-food", description: "Full day access for children (3-12)", basePrice: 600, offerPrice: 499, agentPrice: 400, isActive: true },
];

export const mockOffers: AdminOffer[] = [
  {
    id: 1, name: "Summer Splash Sale", startDate: "2026-03-01", endDate: "2026-06-30", isActive: true,
    prices: [
      { ticketCategoryId: 1, ticketName: "Adult With Food", offerPrice: 999 },
      { ticketCategoryId: 2, ticketName: "Adult Without Food", offerPrice: 699 },
      { ticketCategoryId: 3, ticketName: "Kid With Food", offerPrice: 749 },
      { ticketCategoryId: 4, ticketName: "Kid Without Food", offerPrice: 499 },
    ],
    createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: 2, name: "Weekend Special", startDate: "2026-01-01", endDate: "2026-02-28", isActive: false,
    prices: [
      { ticketCategoryId: 1, ticketName: "Adult With Food", offerPrice: 1050 },
      { ticketCategoryId: 2, ticketName: "Adult Without Food", offerPrice: 720 },
      { ticketCategoryId: 3, ticketName: "Kid With Food", offerPrice: 800 },
      { ticketCategoryId: 4, ticketName: "Kid Without Food", offerPrice: 520 },
    ],
    createdAt: "2025-12-20T10:00:00Z",
  },
];

export const mockMedia: AdminMedia[] = [
  { id: 1, type: "IMAGE", url: "/images/hero-waterpark.jpg", thumbnailUrl: "/images/hero-waterpark.jpg", category: "GALLERY", isPublic: true, uploadedBy: 1, createdAt: "2026-01-10T10:00:00Z" },
  { id: 2, type: "IMAGE", url: "/images/water-slides.jpg", thumbnailUrl: "/images/water-slides.jpg", category: "ATTRACTION", isPublic: true, uploadedBy: 1, createdAt: "2026-01-10T10:05:00Z" },
  { id: 3, type: "IMAGE", url: "/images/wave-pool.jpg", thumbnailUrl: "/images/wave-pool.jpg", category: "GALLERY", isPublic: true, uploadedBy: 1, createdAt: "2026-01-10T10:10:00Z" },
  { id: 4, type: "IMAGE", url: "/images/lazy-river.jpg", thumbnailUrl: "/images/lazy-river.jpg", category: "GALLERY", isPublic: true, uploadedBy: 1, createdAt: "2026-01-10T10:15:00Z" },
  { id: 5, type: "IMAGE", url: "/images/kids-pool.jpg", thumbnailUrl: "/images/kids-pool.jpg", category: "ATTRACTION", isPublic: true, uploadedBy: 1, createdAt: "2026-01-10T10:20:00Z" },
  { id: 6, type: "IMAGE", url: "/images/food-court.jpg", thumbnailUrl: "/images/food-court.jpg", category: "GENERAL", isPublic: true, uploadedBy: 1, createdAt: "2026-01-10T10:25:00Z" },
];

export const mockAdminTestimonials: AdminTestimonial[] = [
  { id: 1, name: "Priya Sharma", rating: 5, content: "An absolutely fantastic experience! The kids loved every moment.", isApproved: true, isFeatured: true, displayOrder: 1, createdAt: "2026-01-15T10:00:00Z" },
  { id: 2, name: "Rahul Verma", rating: 4, content: "Great water park with well-maintained rides.", isApproved: true, isFeatured: false, displayOrder: 2, createdAt: "2026-01-20T10:00:00Z" },
  { id: 3, name: "Suresh Kumar", rating: 5, content: "Best value for money water park!", isApproved: true, isFeatured: true, displayOrder: 3, createdAt: "2026-02-05T10:00:00Z" },
  { id: 4, name: "Neha Agarwal", rating: 3, content: "Good experience but the food could be better.", isApproved: false, isFeatured: false, displayOrder: 0, createdAt: "2026-02-10T10:00:00Z" },
  { id: 5, name: "Raj Malhotra", rating: 5, content: "Perfect family outing. Will visit again!", isApproved: false, isFeatured: false, displayOrder: 0, createdAt: "2026-02-12T10:00:00Z" },
  { id: 6, name: "Anjali Desai", rating: 2, content: "Too crowded on weekends. Staff was helpful though.", isApproved: false, isFeatured: false, displayOrder: 0, createdAt: "2026-02-13T10:00:00Z" },
];

export const mockAnnouncements: AdminAnnouncement[] = [
  { id: 1, title: "Summer Splash Sale is LIVE!", content: "Get up to 20% off on all tickets. Book online now!", type: "PROMOTION", validFrom: "2026-02-01", validTo: "2026-06-30", isActive: true, displayOrder: 1, createdAt: "2026-02-01T10:00:00Z" },
  { id: 2, title: "Extended Weekend Hours", content: "Now open till 8 PM on weekends and holidays!", type: "INFO", validFrom: "2026-02-10", validTo: "2026-12-31", isActive: true, displayOrder: 2, createdAt: "2026-02-10T10:00:00Z" },
  { id: 3, title: "Cyclone Slide Maintenance", content: "Cyclone Slide will be closed for maintenance on Feb 20-21.", type: "MAINTENANCE", validFrom: "2026-02-18", validTo: "2026-02-22", isActive: false, displayOrder: 3, createdAt: "2026-02-15T10:00:00Z" },
];

// Mock paginated fetcher
export function paginateData<T>(data: T[], page: number, size: number = 20): PaginatedResponse<T> {
  const start = (page - 1) * size;
  const end = start + size;
  return {
    content: data.slice(start, end),
    totalElements: data.length,
    totalPages: Math.ceil(data.length / size),
    currentPage: page,
  };
}
