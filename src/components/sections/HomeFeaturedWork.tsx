import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { WorkCard } from "@/components/cards/WorkCard";
import { Button } from "@/components/ui/Button";
import { featuredWorkItems } from "@/data/work";

export function HomeFeaturedWork() {
  return (
    <section className="relative overflow-hidden bg-brand-charcoal px-6 py-24 text-brand-offwhite sm:px-10 lg:px-16 lg:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-violet/35 to-transparent"
      />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.74fr_1fr] lg:items-end">
          <FadeIn>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
              Featured Work
            </p>
            <h2 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] tracking-[-0.01em] sm:text-5xl">
              Real product screens, ready for full case study copy.
            </h2>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="max-w-2xl lg:ml-auto">
              <p className="text-lg leading-8 text-[color:var(--text-on-dark-secondary)]">
                The portfolio uses supplied screenshots only. Project narratives, results, tech
                stacks, and live links are clearly marked until the approved case study content is
                provided.
              </p>
              <Button className="mt-6" href="/work" variant="secondary">
                View all work
                <ArrowRight aria-hidden size={16} />
              </Button>
            </div>
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-5 xl:grid-cols-2">
          {featuredWorkItems.map((work, index) => (
            <FadeIn delay={index * 0.08} key={work.slug}>
              <WorkCard priority={index === 0} variant="featured" work={work} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
