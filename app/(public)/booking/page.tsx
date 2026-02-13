import type { Metadata } from "next";
import { fetchTicketCategories, fetchActiveOffer } from "@/lib/data";
import { BookingProvider } from "@/lib/booking-context";
import { BookingFlow } from "@/components/booking/booking-flow";

export const metadata: Metadata = {
  title: "Book Tickets",
  description:
    "Book your tickets online for Aerocity Water Park. Select date, choose ticket type, and pay securely with Razorpay.",
};

export default async function BookingPage() {
  const [categories, offer] = await Promise.all([
    fetchTicketCategories(),
    fetchActiveOffer(),
  ]);

  return (
    <section className="py-10 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">
            Book Your Tickets
          </h1>
          <p className="text-muted-foreground">
            Follow the steps below to complete your booking. It only takes a
            few minutes!
          </p>
        </div>

        <BookingProvider categories={categories} offer={offer}>
          <BookingFlow />
        </BookingProvider>
      </div>
    </section>
  );
}
