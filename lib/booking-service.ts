// lib/booking-service.ts - Booking business logic service
import { prisma } from "@/lib/db";
import { createRazorpayOrder, generateReceiptId } from "@/lib/razorpay-utils";
import { ValidationError, NotFoundError, ConflictError } from "@/lib/errors";
import Decimal from "decimal.js";

export interface BookingItemInput {
  ticketId: number;
  quantity: number;
}

export interface CreateBookingInput {
  visitDate: string; // YYYY-MM-DD format
  items: BookingItemInput[];
  customerName: string;
  customerMobile: string;
  customerEmail?: string;
  agentId?: number;
  bookedByRole?: "CUSTOMER" | "AGENT";
}

/**
 * Get active offers for a specific date
 */
async function getActiveOffersForDate(date: Date) {
  return prisma.offer.findMany({
    where: {
      isActive: true,
      startDate: { lte: date },
      endDate: { gte: date },
    },
    include: {
      offerPrices: true,
    },
  });
}

/**
 * Calculate best price for a ticket based on active offers
 */
function getBestPrice(
  ticketId: number,
  customerPrice: Decimal,
  agentPrice: Decimal,
  offers: Array<any>,
  isAgent: boolean,
): {
  appliedPrice: Decimal;
  isOfferApplied: boolean;
  offerId?: number;
} {
  let bestPrice = isAgent ? agentPrice : customerPrice;
  let isOfferApplied = false;
  let offerId: number | undefined;

  // Find the lowest price across all active offers
  for (const offer of offers) {
    for (const offerPrice of offer.offerPrices) {
      if (offerPrice.ticketId === ticketId) {
        if (offerPrice.offerPrice < bestPrice) {
          bestPrice = offerPrice.offerPrice;
          isOfferApplied = true;
          offerId = offer.id;
        }
      }
    }
  }

  return {
    appliedPrice: bestPrice,
    isOfferApplied,
    offerId,
  };
}

/**
 * Create a new booking
 */
export async function createBooking(input: CreateBookingInput) {
  // Parse visit date
  const visitDate = new Date(input.visitDate);
  if (isNaN(visitDate.getTime())) {
    throw new ValidationError("Invalid visitDate format", "visitDate");
  }

  // Get all tickets
  const ticketIds = input.items.map((item) => item.ticketId);
  const tickets = await prisma.ticket.findMany({
    where: {
      id: { in: ticketIds },
      isActive: true,
    },
  });

  if (tickets.length !== ticketIds.length) {
    throw new NotFoundError("One or more tickets not found or inactive");
  }

  // Check if agent exists (if bookedByRole is AGENT)
  let agentId: number | null = null;
  let isAgent = input.bookedByRole === "AGENT";

  if (isAgent && input.agentId) {
    const agent = await prisma.user.findUnique({
      where: { id: input.agentId },
    });
    if (!agent) {
      throw new NotFoundError("Agent not found");
    }
    agentId = input.agentId;
  }

  // Get active offers for the visit date
  const activeOffers = await getActiveOffersForDate(visitDate);

  // Create booking items and calculate total
  let totalAmount = new Decimal(0);
  const bookingItemsData: any[] = [];

  for (const item of input.items) {
    const ticket = tickets.find((t: any) => t.id === item.ticketId);
    if (!ticket) {
      throw new NotFoundError(`Ticket ${item.ticketId} not found`);
    }

    const { appliedPrice, isOfferApplied, offerId } = getBestPrice(
      item.ticketId,
      ticket.customerPrice as any,
      ticket.agentPrice as any,
      activeOffers,
      isAgent,
    );

    const itemTotal = appliedPrice.times(item.quantity);
    totalAmount = totalAmount.plus(itemTotal);

    bookingItemsData.push({
      ticketId: item.ticketId,
      quantity: item.quantity,
      basePrice: isAgent ? ticket.agentPrice : ticket.customerPrice,
      appliedPrice,
      isOfferApplied,
      totalPrice: itemTotal,
    });
  }

  // Generate booking reference
  const bookingReference = "BK_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);

  // Create Razorpay order
  let razorpayOrderId: string;
  try {
    const receiptId = generateReceiptId();
    const order = await createRazorpayOrder(
      parseFloat(totalAmount.toString()),
      receiptId,
    );
    razorpayOrderId = order.id;
  } catch (error) {
    console.error("Failed to create Razorpay order:", error);
    throw new ValidationError("Failed to initiate payment. Please try again.", "payment");
  }

  // Get the offer to use (if multiple, use the first one with lowest price)
  let selectedOfferId: number | null = null;
  for (const item of bookingItemsData) {
    if (item.isOfferApplied) {
      // Find the offer for this item
      const offer = activeOffers.find((o: any) =>
        o.offerPrices.some(
          (op: any) =>
            op.ticketId === item.ticketId && op.offerPrice === item.appliedPrice,
        ),
      );
      if (offer) {
        selectedOfferId = offer.id;
        break;
      }
    }
  }

  // Create booking in database
  const booking = await prisma.booking.create({
    data: {
      bookingReference,
      visitDate: visitDate,
      bookedByRole: input.bookedByRole || "CUSTOMER",
      agentId,
      customerName: input.customerName,
      customerMobile: input.customerMobile,
      customerEmail: input.customerEmail?.trim() || "",
      totalAmount,
      offerId: selectedOfferId,
      paymentStatus: "PENDING",
      razorpayOrderId,
      bookingItems: {
        create: bookingItemsData,
      },
    },
    include: {
      bookingItems: {
        include: {
          ticket: true,
        },
      },
    },
  });

  return {
    id: booking.id,
    bookingReference: booking.bookingReference,
    visitDate: booking.visitDate,
    items: booking.bookingItems.map((item: any) => ({
      ticketId: item.ticketId,
      ticketName: item.ticket.name,
      quantity: item.quantity,
      basePrice: item.basePrice,
      appliedPrice: item.appliedPrice,
      isOfferApplied: item.isOfferApplied,
      totalPrice: item.totalPrice,
    })),
    totalAmount: booking.totalAmount,
    paymentStatus: booking.paymentStatus,
    razorpayOrderId: booking.razorpayOrderId,
    createdAt: booking.createdAt,
  };
}

/**
 * Get booking by reference
 */
export async function getBookingByReference(reference: string) {
  const booking = await prisma.booking.findUnique({
    where: { bookingReference: reference },
    include: {
      bookingItems: {
        include: {
          ticket: true,
        },
      },
    },
  });

  if (!booking) {
    throw new NotFoundError("Booking not found");
  }

  return {
    id: booking.id,
    bookingReference: booking.bookingReference,
    visitDate: booking.visitDate,
    bookedByRole: booking.bookedByRole,
    agentId: booking.agentId,
    customerName: booking.customerName,
    customerMobile: booking.customerMobile,
    customerEmail: booking.customerEmail,
    totalAmount: booking.totalAmount,
    items: booking.bookingItems.map((item: any) => ({
      ticketId: item.ticketId,
      ticketName: item.ticket.name,
      quantity: item.quantity,
      basePrice: item.basePrice,
      appliedPrice: item.appliedPrice,
      isOfferApplied: item.isOfferApplied,
      totalPrice: item.totalPrice,
    })),
    paymentStatus: booking.paymentStatus,
    razorpayOrderId: booking.razorpayOrderId,
    razorpayPaymentId: booking.razorpayPaymentId,
    isValidated: booking.isValidated,
    createdAt: booking.createdAt,
  };
}
