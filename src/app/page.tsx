import { HomeHero } from "@/components/sections/HomeHero";
import { HomeServices } from "@/components/sections/HomeServices";
import { PricingPreview } from "@/components/sections/PricingPreview";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <HomeHero />
      <HomeServices />
      <PricingPreview />
    </main>
  );
}
