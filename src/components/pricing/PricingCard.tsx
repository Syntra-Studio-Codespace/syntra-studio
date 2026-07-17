import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "@/components/pricing/PriceDisplay";
import type { PricingTier } from "@/data/pricing-tiers";
import { cn } from "@/lib/utils/cn";

type PricingCardProps = {
  tier: PricingTier;
  tone?: "dark" | "light";
};

export function PricingCard({ tier, tone = "dark" }: PricingCardProps) {
  const isLight = tone === "light";
  const secondaryText = isLight
    ? "text-[color:var(--text-on-light-secondary)]"
    : "text-[color:var(--text-on-dark-secondary)]";
  const primaryText = isLight ? "text-brand-charcoal" : "text-brand-offwhite";

  return (
    <article
      className={cn(
        "relative flex h-full min-h-[34rem] flex-col overflow-hidden rounded-card border p-6 transition-[border-color,box-shadow] duration-200 sm:p-7",
        isLight
          ? "border-[color:var(--border-on-light)] bg-white text-brand-charcoal shadow-light-card hover:border-brand-indigo/28"
          : "border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] text-brand-offwhite hover:border-brand-cyan/35",
        tier.highlighted &&
          (isLight
            ? "border-brand-violet/45 shadow-[0_18px_48px_rgba(15,15,23,0.1)]"
            : "border-brand-violet/60 shadow-[0_0_48px_rgba(139,92,246,0.11)]"),
        tier.category === "ngo" && (isLight ? "border-brand-violet/35" : "border-brand-violet/45"),
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-1",
          tier.highlighted
            ? "bg-brand-violet"
            : tier.category === "ngo"
              ? "bg-brand-violet/70"
              : "bg-brand-cyan/70",
        )}
      />

      <div className="flex min-h-8 flex-wrap items-center gap-2">
        <span
          className={cn(
            "rounded-full px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.08em]",
            isLight
              ? "border border-[color:var(--border-on-light)] text-[color:var(--text-on-light-secondary)]"
              : "border border-[color:var(--border-on-dark)] text-[color:var(--text-on-dark-secondary)]",
          )}
        >
          {tier.billingType}
        </span>
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

      <div className="mt-7">
        <h3 className={`font-heading text-2xl font-semibold ${primaryText}`}>{tier.name}</h3>
        <p className={`mt-3 min-h-16 text-sm leading-6 ${secondaryText}`}>{tier.tagline}</p>
      </div>

      <PriceDisplay
        billingType={tier.billingType}
        className={cn(
          "mt-7 rounded-2xl border p-4",
          isLight
            ? "border-[color:var(--border-on-light)] bg-brand-offwhite"
            : "border-[color:var(--border-on-dark)] bg-brand-charcoal/70",
        )}
        price={tier.price}
        tone={tone}
      />

      {tier.ngoDiscountNote ? (
        <p
          className={cn(
            "mt-4 rounded-2xl border border-brand-violet/35 bg-brand-violet/10 p-3 text-sm",
            isLight ? "text-brand-charcoal" : "text-brand-offwhite",
          )}
        >
          {tier.ngoDiscountNote}
        </p>
      ) : null}

      <ul className={`mt-7 grid gap-3 text-sm ${secondaryText}`}>
        {tier.features.map((feature) => (
          <li className="flex gap-3" key={feature}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {tier.billingNote ? (
        <p className={`mt-5 text-xs leading-5 ${secondaryText}`}>{tier.billingNote}</p>
      ) : null}

      <Button
        className="mt-auto w-full translate-y-0 pt-8"
        href={tier.ctaUrl}
        variant={tier.highlighted ? "primary" : isLight ? "dark" : "secondary"}
      >
        {tier.ctaLabel}
        <ArrowRight aria-hidden size={16} />
      </Button>
    </article>
  );
}
