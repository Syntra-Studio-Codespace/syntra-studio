import type { Metadata } from "next";
import { PricingPageContent } from "@/components/sections/PricingPageContent";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Syntra.studio pricing for business websites, NGO websites, landing pages, full-stack applications, WordPress sites, hosting, maintenance, and payment methods.",
};

export default function PricingPage() {
  return <PricingPageContent />;
}
