import type { Metadata } from "next";
import { AboutPageContent } from "@/components/sections/AboutPageContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Syntra.studio, a solo web studio building polished websites, applications, WordPress experiences, and maintenance plans.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
