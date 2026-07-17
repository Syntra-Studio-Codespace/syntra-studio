import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "@/components/pricing/PriceDisplay";
import type { PricingTier } from "@/data/pricing-tiers";
import { cn } from "@/lib/utils/cn";

type PricingCardProps = {
  tier: PricingTier;
};

export function PricingCard({ tier }: PricingCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-6 sm:p-8",
        tier.highlighted && "border-brand-violet/60 shadow-[0_0_48px_rgba(139,92,246,0.11)]",
        tier.category === "ngo" && "border-brand-violet/45",
      )}
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {tier.highlighted ? (
          <span className="rounded-full bg-brand-violet px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-brand-offwhite">
            Most Popular
          </span>
        ) : null}
        {tier.category === "ngo" ? (
          <span className="rounded-full border border-brand-violet/70 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-brand-violet">
            NGO Rate
          </span>
        ) : null}
      </div>

      <h3 className="font-heading text-2xl font-semibold text-brand-offwhite">{tier.name}</h3>
      <p className="mt-3 min-h-14 text-sm leading-6 text-[color:var(--text-on-dark-secondary)]">
        {tier.tagline}
      </p>

      <PriceDisplay className="mt-7" billingType={tier.billingType} price={tier.price} />

      {tier.ngoDiscountNote ? (
        <p className="mt-4 rounded-2xl border border-brand-violet/35 bg-brand-violet/10 p-3 text-sm text-brand-offwhite">
          {tier.ngoDiscountNote}
        </p>
      ) : null}

      <ul className="mt-7 grid gap-3 text-sm text-[color:var(--text-on-dark-secondary)]">
        {tier.features.map((feature) => (
          <li className="flex gap-3" key={feature}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {tier.billingNote ? (
        <p className="mt-5 text-xs leading-5 text-[color:var(--text-on-dark-secondary)]">
          {tier.billingNote}
        </p>
      ) : null}

      <Button
        className="mt-8 w-full"
        href={tier.ctaUrl}
        variant={tier.highlighted ? "primary" : "secondary"}
      >
        {tier.ctaLabel}
        <ArrowRight aria-hidden size={16} />
      </Button>
    </article>
  );
}
