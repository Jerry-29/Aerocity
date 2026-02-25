import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { PopularRides } from "@/components/home/popular-rides";
import { PricingPreview } from "@/components/home/pricing-preview";
import { TestimonialsPreviewLoader } from "@/components/home/testimonials-loader";
import { CTASection } from "@/components/home/cta-section";
import {
  fetchAttractions,
  fetchTicketCategories,
  fetchActiveOffer,
} from "@/lib/data";

export default async function HomePage() {
  const [attractions, categories, offer] = await Promise.all([
    fetchAttractions(),
    fetchTicketCategories(),
    fetchActiveOffer(),
  ]);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PopularRides attractions={attractions} />
      <PricingPreview categories={categories} offer={offer} />
      <TestimonialsPreviewLoader />
      <CTASection />
    </>
  );
}
