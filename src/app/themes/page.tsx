import type { Metadata } from "next";
import { ThemesPageContent } from "@/components/sections/ThemesPageContent";

export const metadata: Metadata = {
  title: "WordPress Themes",
  description:
    "Syntra.studio WordPress theme marketplace structure with an intentional coming-soon state until real themes are available.",
  alternates: {
    canonical: "/themes",
  },
};

export default function ThemesPage() {
  return <ThemesPageContent />;
}
