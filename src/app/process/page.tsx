import type { Metadata } from "next";
import { ProcessStory } from "@/components/sections/ProcessStory";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Syntra.studio process for shaping, planning, building, launching, and supporting web projects.",
};

export default function ProcessPage() {
  return (
    <main id="main-content" className="bg-brand-charcoal">
      <ProcessStory
        intro="A focused project flow keeps strategy, design, development, and launch support connected from the first decision through the final handoff."
        title="How Syntra.studio moves from brief to launch."
      />
    </main>
  );
}
