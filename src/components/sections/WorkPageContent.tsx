import { BriefcaseBusiness, FileText, ImageIcon } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { WorkCard } from "@/components/cards/WorkCard";
import { workItems } from "@/data/work";

const readinessItems = [
  {
    icon: ImageIcon,
    label: "Supplied screenshots",
    text: "Only the provided product images are used for portfolio visuals.",
  },
  {
    icon: FileText,
    label: "Placeholder copy",
    text: "Unknown case study fields remain visibly marked until approved content arrives.",
  },
  {
    icon: BriefcaseBusiness,
    label: "Detail routes",
    text: "Each project already has a case study route ready for final writing.",
  },
];

export function WorkPageContent() {
  return (
    <main id="main-content" className="bg-brand-charcoal px-6 pb-24 pt-32 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-[0.82fr_0.58fr] lg:items-end">
            <div>
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
                Portfolio
              </p>
              <h1 className="mt-4 max-w-4xl font-heading text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-offwhite sm:text-6xl">
                Work shaped around real product screens.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--text-on-dark-secondary)]">
                Case studies are structured and ready for final content. Until then, the page uses
                the supplied screenshots with transparent placeholders for project details,
                outcomes, and live links.
              </p>
            </div>

            <div className="grid gap-3">
              {readinessItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    className="rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-5"
                    key={item.label}
                  >
                    <div className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-cyan">
                        <Icon aria-hidden size={20} />
                      </span>
                      <div>
                        <h2 className="font-heading text-sm font-semibold text-brand-offwhite">
                          {item.label}
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-[color:var(--text-on-dark-secondary)]">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {workItems.map((work, index) => (
            <FadeIn delay={index * 0.08} key={work.slug}>
              <WorkCard priority={index === 0} variant="featured" work={work} />
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
}
