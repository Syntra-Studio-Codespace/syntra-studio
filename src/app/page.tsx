import { HomeHero } from "@/components/sections/HomeHero";
import { HomeServices } from "@/components/sections/HomeServices";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <HomeHero />
      <HomeServices />
    </main>
  );
}
