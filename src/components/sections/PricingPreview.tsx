import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { PricingCard } from "@/components/pricing/PricingCard";
import { Button } from "@/components/ui/Button";
import { globalPricingNotes, pricingTiers } from "@/data/pricing-tiers";

const previewTiers = pricingTiers
  .filter((tier) => ["business", "ngo", "landing-page"].includes(tier.category))
  .slice(0, 3);

export function PricingPreview() {
  return (
    <section className="bg-brand-offwhite px-6 py-24 text-brand-charcoal sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-end">
          <FadeIn>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-indigo">
              Pricing Preview
            </p>
            <h2 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] tracking-[-0.01em] sm:text-5xl">
              Clear starting points, with custom quotes where scope matters.
            </h2>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="rounded-card border border-[color:var(--border-on-light)] bg-white p-6 shadow-light-card">
              <p className="text-base leading-7 text-[color:var(--text-on-light-secondary)]">
                {globalPricingNotes.bundleDiscount} {globalPricingNotes.quoteValidity}
              </p>
              <Button className="mt-5" href="/pricing" variant="dark">
                View full pricing
                <ArrowRight aria-hidden size={16} />
              </Button>
            </div>
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {previewTiers.map((tier, index) => (
            <FadeIn delay={index * 0.06} key={`${tier.category}-${tier.name}`}>
              <div className="[&_*]:border-[color:var(--border-on-light)] [&_article]:bg-brand-charcoal">
                <PricingCard tier={tier} />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
