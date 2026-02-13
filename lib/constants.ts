import type { ParkInfo } from "./types";

export const PARK_INFO: ParkInfo = {
  name: "Aerocity",
  tagline: "Make a Splash, Create Memories",
  address: "Aerocity Water Park, NH-48, Near Airport",
  city: "Jaipur",
  state: "Rajasthan",
  pincode: "302029",
  phone: ["+91 98765 43210", "+91 98765 43211"],
  email: "info@aerocitywaterpark.com",
  timings: {
    weekday: "10:00 AM - 6:00 PM",
    weekend: "9:00 AM - 7:00 PM",
    holiday: "9:00 AM - 8:00 PM",
  },
  socialLinks: {
    facebook: "https://facebook.com/aerocitywaterpark",
    instagram: "https://instagram.com/aerocitywaterpark",
    youtube: "https://youtube.com/@aerocitywaterpark",
    twitter: "https://twitter.com/aerocitywp",
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Attractions", href: "/attractions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
] as const;

export const BOOKING_STEPS = [
  { step: 1, label: "Date & Tickets" },
  { step: 2, label: "Offers" },
  { step: 3, label: "Your Details" },
  { step: 4, label: "Review" },
  { step: 5, label: "Payment" },
] as const;
