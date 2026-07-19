import type { Metadata } from "next";
import { ContactPageContent } from "@/components/sections/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Syntra.studio for business websites, NGO websites, landing pages, full-stack applications, WordPress sites, hosting, or maintenance.",
};

export const runtime = "nodejs";

export default function ContactPage() {
  return <ContactPageContent />;
}
