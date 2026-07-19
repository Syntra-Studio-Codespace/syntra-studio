import { ArrowRight, CalendarCheck, FileText, Mail } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";

const nextSteps = [
  {
    icon: FileText,
    label: "Share the brief",
    text: "Send the project type, timeline, budget range, and the outcome you want the site to create.",
  },
  {
    icon: CalendarCheck,
    label: "Scope the build",
    text: "Syntra.studio turns that into a clear plan, quote, and launch path before work begins.",
  },
  {
    icon: Mail,
    label: "Request an invoice",
    text: "Payments stay invoice-led, with the website and maintenance bundle discount applied manually.",
  },
];

export function HomeFinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-charcoal px-6 py-24 text-brand-offwhite sm:px-10 lg:px-16 lg:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_24%,rgba(59,47,212,0.24),transparent_28rem),radial-gradient(circle_at_82%_64%,rgba(34,211,238,0.1),transparent_26rem)]"
      />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.88fr_1fr] lg:items-end">
        <FadeIn>
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
            Start The Build
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] tracking-[-0.01em] sm:text-5xl lg:text-6xl">
            Ready for a site that feels designed, engineered, and launch-ready?
          </h2>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="max-w-2xl lg:ml-auto">
            <p className="text-lg leading-8 text-[color:var(--text-on-dark-secondary)]">
              Use the project form to start with enough context for a useful reply. Case studies,
              testimonials, and bank details can be filled in later as the live business materials
              arrive.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact" size="large">
                Start a Project
                <ArrowRight aria-hidden size={18} />
              </Button>
              <Button href="/pricing" size="large" variant="secondary">
                Review pricing
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl gap-4 md:grid-cols-3">
        {nextSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <FadeIn delay={index * 0.06} key={step.label}>
              <article className="h-full rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-6 shadow-[0_0_48px_rgba(34,211,238,0.04)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-cyan">
                  <Icon aria-hidden size={20} />
                </span>
                <h3 className="mt-6 font-heading text-xl font-semibold text-brand-offwhite">
                  {step.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--text-on-dark-secondary)]">
                  {step.text}
                </p>
              </article>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
