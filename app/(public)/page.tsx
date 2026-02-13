import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { PopularRides } from "@/components/home/popular-rides";
import { PricingPreview } from "@/components/home/pricing-preview";
import { TestimonialsPreview } from "@/components/home/testimonials-preview";
import { CTASection } from "@/components/home/cta-section";
import {
  fetchAttractions,
  fetchTicketCategories,
  fetchTestimonials,
  fetchActiveOffer,
} from "@/lib/data";

export default async function HomePage() {
  const [attractions, categories, testimonials, offer] = await Promise.all([
    fetchAttractions(),
    fetchTicketCategories(),
    fetchTestimonials(),
    fetchActiveOffer(),
  ]);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PopularRides attractions={attractions} />
      <PricingPreview categories={categories} offer={offer} />
      <TestimonialsPreview testimonials={testimonials} />
      <CTASection />
    </>
  );
}
