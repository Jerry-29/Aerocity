import type {
  TicketCategory,
  Offer,
  Announcement,
  Testimonial,
  Attraction,
  GalleryItem,
} from "./types";
import { prisma } from "@/lib/db";
import { sql } from "@/lib/neon";

export const ticketCategories: TicketCategory[] = [
  {
    id: 1,
    name: "Adult With Food",
    slug: "adult-with-food",
    description: "Full day access to all rides and attractions with buffet lunch included",
    basePrice: 1200,
    offerPrice: 999,
    includes: [
      "All rides & attractions",
      "Buffet lunch",
      "Locker facility",
      "Changing room access",
      "Complimentary towel",
    ],
  },
  {
    id: 2,
    name: "Adult Without Food",
    slug: "adult-without-food",
    description: "Full day access to all rides and attractions",
    basePrice: 800,
    offerPrice: 699,
    includes: [
      "All rides & attractions",
      "Locker facility",
      "Changing room access",
    ],
  },
  {
    id: 3,
    name: "Kid With Food",
    slug: "kid-with-food",
    description: "Full day access for children (3-12 years) with buffet lunch included",
    basePrice: 900,
    offerPrice: 749,
    includes: [
      "All rides & attractions",
      "Kid-friendly buffet",
      "Locker facility",
      "Changing room access",
      "Complimentary towel",
    ],
  },
  {
    id: 4,
    name: "Kid Without Food",
    slug: "kid-without-food",
    description: "Full day access for children (3-12 years)",
    basePrice: 600,
    offerPrice: 300,
    includes: [
      "All rides & attractions",
      "Locker facility",
      "Changing room access",
    ],
  },
];

export const activeOffer: Offer = {
  id: 1,
  name: "Summer Splash Sale",
  description: "Enjoy special discounted rates on all ticket categories this summer!",
  startDate: "2026-03-01",
  endDate: "2026-06-30",
  isActive: true,
  discountPercentage: 15,
};

export const announcements: Announcement[] = [
  {
    id: 1,
    title: "Summer Splash Sale is LIVE!",
    message: "Get up to 20% off on all tickets. Book online now!",
    type: "promotion",
    isActive: true,
    createdAt: "2026-02-01",
  },
  {
    id: 2,
    title: "Extended Weekend Hours",
    message: "Now open till 8 PM on weekends and holidays!",
    type: "info",
    isActive: true,
    createdAt: "2026-02-10",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    content:
      "An absolutely fantastic experience! The kids loved every moment. The wave pool was the highlight, and the food court had great options. Will definitely visit again!",
    visitDate: "2026-01-15",
    isApproved: true,
  },
  {
    id: 2,
    name: "Rahul Verma",
    rating: 4,
    content:
      "Great water park with well-maintained rides. The staff was very helpful and safety standards were excellent. Only wish there were more shade areas.",
    visitDate: "2026-01-20",
    isApproved: true,
  },
  {
    id: 3,
    name: "Anita Gupta",
    rating: 5,
    content:
      "We celebrated our son's birthday here and it was magical! The group packages are worth it. Clean facilities and friendly atmosphere throughout.",
    visitDate: "2026-01-22",
    isApproved: true,
  },
  {
    id: 4,
    name: "Vikram Singh",
    rating: 5,
    content:
      "The Tornado Twist ride is insane! Best thrill ride I have experienced. Aerocity is hands down the best water park in the region. The online booking was super smooth too.",
    visitDate: "2025-12-30",
    isApproved: true,
  },
  {
    id: 5,
    name: "Meera Patel",
    rating: 4,
    content:
      "Lovely family outing! The lazy river was so relaxing and the kids zone kept our little ones entertained for hours. Food could be better but overall amazing experience.",
    visitDate: "2025-12-15",
    isApproved: true,
  },
  {
    id: 6,
    name: "Arjun Reddy",
    rating: 5,
    content:
      "Visited with my college friends and had the time of our lives! Every ride is well-maintained and the park is very clean. Highly recommend the food package.",
    visitDate: "2026-01-05",
    isApproved: true,
  },
  {
    id: 7,
    name: "Deepika Nair",
    rating: 4,
    content:
      "A perfect weekend getaway. The park is well-organized and the staff ensures everyone follows safety protocols. The buffet lunch was delicious!",
    visitDate: "2026-02-01",
    isApproved: true,
  },
  {
    id: 8,
    name: "Suresh Kumar",
    rating: 5,
    content:
      "Best value for money water park! The online ticket booking saved us so much time. No long queues at the entrance. The QR code entry system is brilliant.",
    visitDate: "2026-02-05",
    isApproved: true,
  },
];

export const attractions: Attraction[] = [
  {
    id: 1,
    name: "Tornado Twist",
    description:
      "Experience the ultimate thrill as you plunge through a twisting vortex of water at high speed. Not for the faint-hearted!",
    category: "thrill",
    image: "/images/water-slides.jpg",
    heightRequirement: "Min 120cm",
    isActive: true,
  },
  {
    id: 2,
    name: "Wave Pool",
    description:
      "Feel the ocean waves in our massive wave pool. Perfect for swimming and floating with family and friends.",
    category: "family",
    image: "/images/wave-pool.jpg",
    heightRequirement: null,
    isActive: true,
  },
  {
    id: 3,
    name: "Lazy River",
    description:
      "Float along our winding lazy river through tropical landscapes. A relaxing journey for all ages.",
    category: "relaxation",
    image: "/images/lazy-river.jpg",
    heightRequirement: null,
    isActive: true,
  },
  {
    id: 4,
    name: "Splash Kingdom",
    description:
      "A magical water playground designed for young adventurers with mini slides, fountains, and splash pads.",
    category: "kids",
    image: "/images/kids-pool.jpg",
    heightRequirement: "For ages 3-12",
    isActive: true,
  },
  {
    id: 5,
    name: "Aqua Racer",
    description:
      "Race your friends down parallel slides and find out who is the fastest. Four lanes of competitive fun!",
    category: "thrill",
    image: "/images/water-slides.jpg",
    heightRequirement: "Min 110cm",
    isActive: true,
  },
  {
    id: 6,
    name: "Family Splash Zone",
    description:
      "A multi-level water play structure with tipping buckets, water cannons, and gentle slides for the whole family.",
    category: "family",
    image: "/images/kids-pool.jpg",
    heightRequirement: null,
    isActive: true,
  },
  {
    id: 7,
    name: "Cyclone Slide",
    description:
      "A thrilling enclosed tube slide that spirals you through darkness before a dramatic splash landing.",
    category: "thrill",
    image: "/images/water-slides.jpg",
    heightRequirement: "Min 130cm",
    isActive: true,
  },
  {
    id: 8,
    name: "Rain Dance Arena",
    description:
      "Dance under cascading water jets with music and lights. A fun-filled experience for all ages, especially during events!",
    category: "family",
    image: "/images/wave-pool.jpg",
    heightRequirement: null,
    isActive: true,
  },
  {
    id: 9,
    name: "Toddler Lagoon",
    description:
      "A safe and shallow pool area with tiny slides and gentle sprays, specially designed for toddlers and infants.",
    category: "kids",
    image: "/images/kids-pool.jpg",
    heightRequirement: "For ages 1-5",
    isActive: true,
  },
  {
    id: 10,
    name: "Zen Pool",
    description:
      "A tranquil heated pool surrounded by lush greenery. Perfect for unwinding while the kids play.",
    category: "relaxation",
    image: "/images/lazy-river.jpg",
    heightRequirement: null,
    isActive: true,
  },
];

export const galleryItems: GalleryItem[] = [
  { id: 1, src: "/images/hero-waterpark.jpg", alt: "Aerocity Water Park aerial view", category: "facilities" },
  { id: 2, src: "/images/water-slides.jpg", alt: "Thrilling water slides", category: "rides" },
  { id: 3, src: "/images/wave-pool.jpg", alt: "Wave pool fun", category: "rides" },
  { id: 4, src: "/images/lazy-river.jpg", alt: "Relaxing lazy river", category: "rides" },
  { id: 5, src: "/images/kids-pool.jpg", alt: "Kids splash zone", category: "rides" },
  { id: 6, src: "/images/food-court.jpg", alt: "Food court dining area", category: "food" },
  { id: 7, src: "/images/hero-waterpark.jpg", alt: "Park panoramic view", category: "facilities" },
  { id: 8, src: "/images/wave-pool.jpg", alt: "Families enjoying wave pool", category: "events" },
  { id: 9, src: "/images/water-slides.jpg", alt: "Colorful slide towers", category: "rides" },
  { id: 10, src: "/images/food-court.jpg", alt: "Outdoor dining with shade", category: "food" },
  { id: 11, src: "/images/kids-pool.jpg", alt: "Children at play area", category: "events" },
  { id: 12, src: "/images/lazy-river.jpg", alt: "Tropical lazy river passage", category: "facilities" },
];

// Async mock data fetchers (ready to swap with real API calls)
export async function fetchTicketCategories(): Promise<TicketCategory[]> {
  try {
    if (sql) {
      const tickets = await (sql as any)`
        SELECT "id","name","slug","description","customerPrice","createdAt"
        FROM "Ticket"
        WHERE "isActive" = true
        ORDER BY "createdAt" DESC
      `;
      const offerPrices = await (sql as any)`
        SELECT otp."ticketId" AS "ticketId", otp."offerPrice" AS "offerPrice"
        FROM "OfferTicketPrice" AS otp
        JOIN "Offer" o ON o."id" = otp."offerId"
        WHERE o."isActive" = true
          AND o."startDate" <= NOW()
          AND o."endDate" >= NOW()
      `;
      const byTicket = new Map<number, number>();
      for (const row of offerPrices as any[]) {
        const tid = Number(row.ticketId);
        const val = Number(row.offerPrice);
        const prev = byTicket.get(tid);
        if (prev === undefined || val < prev) byTicket.set(tid, val);
      }
      return (tickets as any[]).map((t) => {
        const fallback = ticketCategories.find((x) => x.slug === t.slug);
        return {
          id: Number(t.id),
          name: t.name,
          slug: t.slug,
          description: t.description || "",
          basePrice: Number(t.customerPrice),
          offerPrice: byTicket.get(Number(t.id)) ?? null,
          includes:
            fallback?.includes && fallback.includes.length > 0
              ? fallback.includes
              : ["All rides and attractions access"],
        } satisfies TicketCategory;
      });
    }
    const now = new Date();
    const [tickets, activeOffers] = await Promise.all([
      prisma.ticket.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          customerPrice: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.offer.findMany({
        where: {
          isActive: true,
          startDate: { lte: now },
          endDate: { gte: now },
        },
        include: {
          offerPrices: true,
        },
      }),
    ]);

    return tickets.map((ticket: any) => {
      let bestOfferPrice: number | null = null;
      for (const offer of activeOffers) {
        for (const offerPrice of offer.offerPrices) {
          if (offerPrice.ticketId === ticket.id) {
            const candidate = Number(offerPrice.offerPrice);
            if (bestOfferPrice === null || candidate < bestOfferPrice) {
              bestOfferPrice = candidate;
            }
          }
        }
      }

      const fallback = ticketCategories.find((t) => t.slug === ticket.slug);
      return {
        id: ticket.id,
        name: ticket.name,
        slug: ticket.slug,
        description: ticket.description || "",
        basePrice: Number(ticket.customerPrice),
        offerPrice: bestOfferPrice,
        includes:
          fallback?.includes && fallback.includes.length > 0
            ? fallback.includes
            : ["All rides and attractions access"],
      } satisfies TicketCategory;
    });
  } catch (error) {
    console.error("fetchTicketCategories error:", error);
    // Avoid serving stale/static data; return empty to reflect current state
    return [];
  }
}

export async function fetchActiveOffer(): Promise<Offer | null> {
  try {
    const now = new Date();
    const current = await prisma.offer.findFirst({
      where: {
        isActive: true,
        startDate: { lte: now },
        endDate: { gte: now },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!current) return null;

    return {
      id: current.id,
      name: current.name,
      description: current.description || "",
      startDate: current.startDate.toISOString().split("T")[0],
      endDate: current.endDate.toISOString().split("T")[0],
      isActive: current.isActive,
      discountPercentage: 0,
    };
  } catch (err) {
    // Avoid showing a fake/legacy offer on failure
    return null;
  }
}

export async function fetchAnnouncements(): Promise<Announcement[]> {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || "";
    const res = await fetch(`${base}/api/announcements`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      const list: any[] = Array.isArray(json?.data) ? json.data : [];
      return list.map((a: any) => ({
        id: a.id,
        title: a.title,
        message: a.content || "",
        type: a.type || "info",
        isActive: !!a.isActive,
        createdAt: a.createdAt,
      }));
    }
  } catch {
    // ignore and fallback
  }
  return announcements.filter((a) => a.isActive);
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || "";
    const res = await fetch(`${base}/api/testimonials`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      const data: any[] = Array.isArray(json?.data) ? json.data : [];
      return data.map((t: any) => ({
        id: t.id,
        name: t.name,
        rating: Number(t.rating) || 0,
        content: t.content || "",
        visitDate:
          typeof t.visitDate === "string"
            ? t.visitDate.split("T")[0]
            : new Date(t.visitDate).toISOString().split("T")[0],
        isApproved: true,
      }));
    }
  } catch {
    // ignore and fallback
  }
  return testimonials.filter((t) => t.isApproved);
}

export async function fetchAttractions(): Promise<Attraction[]> {
  return attractions.filter((a) => a.isActive);
}

export async function fetchGallery(): Promise<GalleryItem[]> {
  return galleryItems;
}
