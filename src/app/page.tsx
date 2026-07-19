import { HomeHero } from "@/components/sections/HomeHero";
import { HomeFeaturedWork } from "@/components/sections/HomeFeaturedWork";
import { HomeFinalCta } from "@/components/sections/HomeFinalCta";
import { HomeServices } from "@/components/sections/HomeServices";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { ProcessStory } from "@/components/sections/ProcessStory";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustStrip } from "@/components/sections/TrustStrip";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <HomeHero />
      <TrustStrip />
      <HomeServices />
      <HomeFeaturedWork />
      <PricingPreview />
      <ProcessStory />
      <TestimonialsSection />
      <HomeFinalCta />
    </main>
  );
}
