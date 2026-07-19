import { ExternalLink, Mail, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { ProjectInquiryForm } from "@/components/forms/ProjectInquiryForm";
import { siteSettings } from "@/data/site-settings";

const contactNotes = [
  "Server-side Zod validation",
  "Honeypot spam protection",
  "FormSubmit provider handoff",
  "No live checkout or payment collection",
];

export function ContactPageContent() {
  return (
    <main id="main-content" className="bg-brand-charcoal px-6 pb-24 pt-32 sm:px-10 lg:px-16">
      <section className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1fr]">
        <FadeIn>
          <div className="lg:sticky lg:top-28">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
              Start a Project
            </p>
            <h1 className="mt-4 max-w-3xl font-heading text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-offwhite sm:text-6xl">
              Tell Syntra.studio what you want to build.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--text-on-dark-secondary)]">
              Use this form for business websites, NGO sites, landing pages, full-stack
              applications, WordPress sites, and hosting or maintenance inquiries.
            </p>

            <div className="mt-8 grid gap-3">
              {contactNotes.map((note) => (
                <div
                  className="flex items-center gap-3 rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-4 text-sm text-[color:var(--text-on-dark-secondary)]"
                  key={note}
                >
                  <ShieldCheck aria-hidden className="text-brand-cyan" size={18} />
                  {note}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-5">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-cyan">
                  <Mail aria-hidden size={20} />
                </span>
                <div>
                  <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
                    Contact details
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--text-on-dark-secondary)]">
                    {siteSettings.contactEmail}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[color:var(--text-on-dark-secondary)]">
                    {siteSettings.contactLocation}
                  </p>
                  <Link
                    className="mt-3 inline-flex items-center gap-2 font-heading text-sm font-semibold text-brand-offwhite transition-colors hover:text-brand-cyan"
                    href={siteSettings.instagramUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Instagram
                    <ExternalLink aria-hidden size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-[1.5rem] border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-6 shadow-[0_0_56px_rgba(34,211,238,0.06)] sm:p-8">
            <div className="mb-8 flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-cyan text-brand-charcoal">
                <Sparkles aria-hidden size={21} />
              </span>
              <div>
                <h2 className="font-heading text-2xl font-semibold leading-tight text-brand-offwhite">
                  Project inquiry
                </h2>
                <p className="mt-2 text-sm leading-6 text-[color:var(--text-on-dark-secondary)]">
                  Required fields are marked with an asterisk. The email destination must be
                  configured before this accepts live inquiries.
                </p>
              </div>
            </div>
            <ProjectInquiryForm />
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
