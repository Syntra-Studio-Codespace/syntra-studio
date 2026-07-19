import { ArrowRight, CircleDot, Layers3, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { siteSettings } from "@/data/site-settings";

const principles = [
  {
    icon: ShieldCheck,
    title: "Built with restraint",
    text: "Motion, layout, copy, and visual depth are used to support trust instead of adding noise.",
  },
  {
    icon: Layers3,
    title: "Designed as systems",
    text: "Each build is shaped around reusable content, components, accessibility, and performance from the start.",
  },
  {
    icon: CircleDot,
    title: "Solo-studio focus",
    text: "Syntra.studio is currently a solo company, so the site avoids team bios and keeps the story centered on the work.",
  },
];

export function AboutPageContent() {
  return (
    <main id="main-content" className="bg-brand-charcoal px-6 pb-24 pt-32 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-[0.82fr_0.58fr] lg:items-end">
            <div>
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
                About Syntra.studio
              </p>
              <h1 className="mt-4 max-w-4xl font-heading text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-offwhite sm:text-6xl">
                A small web studio for polished, technically serious digital experiences.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--text-on-dark-secondary)]">
                {siteSettings.tagline} The studio focuses on custom business websites, nonprofit
                sites, landing pages, full-stack applications, WordPress builds, and ongoing
                maintenance.
              </p>
            </div>

            <div className="rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-6">
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
                Current Structure
              </p>
              <p className="mt-4 text-base leading-7 text-[color:var(--text-on-dark-secondary)]">
                Syntra.studio is currently operated as a solo company. Team-member information is
                intentionally omitted until there is real team content to publish.
              </p>
              <Button className="mt-6 w-full" href="/work">
                View work
                <ArrowRight aria-hidden size={16} />
              </Button>
            </div>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <FadeIn delay={index * 0.08} key={principle.title}>
                <article className="h-full rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-cyan">
                    <Icon aria-hidden size={22} />
                  </span>
                  <h2 className="mt-6 font-heading text-2xl font-semibold text-brand-offwhite">
                    {principle.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-[color:var(--text-on-dark-secondary)]">
                    {principle.text}
                  </p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </main>
  );
}
