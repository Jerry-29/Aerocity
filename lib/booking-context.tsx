"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { BookingFormData, TicketCategory, Offer, TicketSelection } from "./types";

interface BookingContextType {
  step: number;
  setStep: (step: number) => void;
  formData: BookingFormData;
  categories: TicketCategory[];
  offer: Offer | null;
  updateVisitDate: (date: Date | null) => void;
  updateTicket: (categoryId: number, quantity: number) => void;
  updateCustomerDetails: (name: string, mobile: string, email: string) => void;
  applyOffer: (offer: Offer | null) => void;
  totalAmount: number;
  ticketSelections: TicketSelection[];
  reset: () => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}

const initialFormData: BookingFormData = {
  visitDate: null,
  tickets: [],
  customerName: "",
  customerMobile: "",
  customerEmail: "",
  offerApplied: null,
};

interface BookingProviderProps {
  children: ReactNode;
  categories: TicketCategory[];
  offer: Offer | null;
}

export function BookingProvider({
  children,
  categories,
  offer,
}: BookingProviderProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);

  // Auto-apply incoming offer (if any) so UI and ticket unit prices stay consistent
  useEffect(() => {
    if (offer && offer.isActive) {
      setFormData((prev) => {
        const updatedTickets = prev.tickets.map((t) => {
          const cat = categories.find((c) => c.id === t.categoryId);
          if (!cat) return t;
          const unitPrice = cat.offerPrice ?? cat.basePrice;
          return {
            ...t,
            unitPrice,
            totalPrice: unitPrice * t.quantity,
          };
        });
        return { ...prev, offerApplied: offer, tickets: updatedTickets };
      });
    }
  }, [offer, categories]);

  const updateVisitDate = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, visitDate: date }));
  };

  const updateTicket = (categoryId: number, quantity: number) => {
    setFormData((prev) => {
      const existing = prev.tickets.filter((t) => t.categoryId !== categoryId);
      if (quantity > 0) {
        const cat = categories.find((c) => c.id === categoryId);
        if (!cat) return prev;
        const unitPrice =
          formData.offerApplied && cat.offerPrice ? cat.offerPrice : cat.basePrice;
        existing.push({
          categoryId,
          categoryName: cat.name,
          quantity,
          unitPrice,
          totalPrice: unitPrice * quantity,
        });
      }
      return { ...prev, tickets: existing };
    });
  };

  const updateCustomerDetails = (
    name: string,
    mobile: string,
    email: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      customerName: name,
      customerMobile: mobile,
      customerEmail: email,
    }));
  };

  const applyOffer = (newOffer: Offer | null) => {
    setFormData((prev) => {
      const updatedTickets = prev.tickets.map((t) => {
        const cat = categories.find((c) => c.id === t.categoryId);
        if (!cat) return t;
        const unitPrice = newOffer && cat.offerPrice ? cat.offerPrice : cat.basePrice;
        return {
          ...t,
          unitPrice,
          totalPrice: unitPrice * t.quantity,
        };
      });
      return { ...prev, offerApplied: newOffer, tickets: updatedTickets };
    });
  };

  const ticketSelections = formData.tickets.filter((t) => t.quantity > 0);
  const totalAmount = ticketSelections.reduce((sum, t) => sum + t.totalPrice, 0);

  const reset = () => {
    setStep(1);
    setFormData(initialFormData);
  };

  return (
    <BookingContext.Provider
      value={{
        step,
        setStep,
        formData,
        categories,
        offer,
        updateVisitDate,
        updateTicket,
        updateCustomerDetails,
        applyOffer,
        totalAmount,
        ticketSelections,
        reset,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
