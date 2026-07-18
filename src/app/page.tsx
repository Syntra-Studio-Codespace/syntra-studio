import { HomeHero } from "@/components/sections/HomeHero";
import { HomeFeaturedWork } from "@/components/sections/HomeFeaturedWork";
import { HomeServices } from "@/components/sections/HomeServices";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { ProcessStory } from "@/components/sections/ProcessStory";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <HomeHero />
      <HomeServices />
      <HomeFeaturedWork />
      <PricingPreview />
      <ProcessStory />
    </main>
  );
}
