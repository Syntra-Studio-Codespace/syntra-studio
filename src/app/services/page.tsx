import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/sections/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Syntra.studio services for business websites, NGO websites, landing pages, full-stack web applications, and WordPress sites.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
