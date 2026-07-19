import type { Metadata } from "next";
import { WorkPageContent } from "@/components/sections/WorkPageContent";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Syntra.studio portfolio and case study structure using supplied product screenshots with clearly marked placeholder case study content.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return <WorkPageContent />;
}
