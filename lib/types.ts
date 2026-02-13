export interface TicketCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  offerPrice: number | null;
  includes: string[];
}

export interface Offer {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  discountPercentage: number;
}

export interface Announcement {
  id: number;
  title: string;
  message: string;
  type: "promotion" | "info" | "warning";
  isActive: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  content: string;
  visitDate: string;
  isApproved: boolean;
}

export interface Attraction {
  id: number;
  name: string;
  description: string;
  category: "thrill" | "family" | "kids" | "relaxation";
  image: string;
  heightRequirement: string | null;
  isActive: boolean;
}

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: "rides" | "events" | "food" | "facilities" | "all";
}

export interface BookingFormData {
  visitDate: Date | null;
  tickets: TicketSelection[];
  customerName: string;
  customerMobile: string;
  customerEmail: string;
  offerApplied: Offer | null;
}

export interface TicketSelection {
  categoryId: number;
  categoryName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface BookingConfirmation {
  bookingReference: string;
  visitDate: string;
  tickets: TicketSelection[];
  customerName: string;
  customerMobile: string;
  customerEmail: string;
  totalAmount: number;
  offerApplied: Offer | null;
  paymentStatus: "success" | "pending" | "failed";
  createdAt: string;
}

export interface ParkInfo {
  name: string;
  tagline: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string[];
  email: string;
  timings: {
    weekday: string;
    weekend: string;
    holiday: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
  };
}
