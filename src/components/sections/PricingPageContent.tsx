import { FadeIn } from "@/components/animations/FadeIn";
import { CurrencySwitcher } from "@/components/currency/CurrencySwitcher";
import { BundleDiscountCallout } from "@/components/sections/BundleDiscountCallout";
import { PaymentMethods } from "@/components/sections/PaymentMethods";
import { PricingCard } from "@/components/pricing/PricingCard";
import { globalPricingNotes, pricingGroups, pricingTiers } from "@/data/pricing-tiers";

export function PricingPageContent() {
  return (
    <main id="main-content" className="bg-brand-charcoal px-6 pb-24 pt-32 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-brand-cyan">
                Pricing
              </p>
              <h1 className="mt-4 max-w-4xl font-heading text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-offwhite sm:text-6xl">
                USD-first pricing with local-currency estimates.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--text-on-dark-secondary)]">
                All prices are stored in USD. Local estimates are shown for convenience and final
                invoices are issued in the agreed billing currency.
              </p>
            </div>
            <CurrencySwitcher />
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-4 rounded-card border border-[color:var(--border-on-dark)] bg-[color:var(--surface-dark-raised)] p-5 text-sm leading-6 text-[color:var(--text-on-dark-secondary)] md:grid-cols-3">
          <p>{globalPricingNotes.bundleDiscount}</p>
          <p>{globalPricingNotes.quoteValidity}</p>
          <p>{globalPricingNotes.depositPolicy}</p>
        </div>

        <div className="mt-10">
          <BundleDiscountCallout />
        </div>

        <div className="mt-16 grid gap-16">
          {pricingGroups.map((group) => {
            const tiers = pricingTiers.filter((tier) => tier.category === group.category);

            return (
              <section className="grid gap-6" key={group.category}>
                <div>
                  <h2 className="font-heading text-3xl font-semibold text-brand-offwhite">
                    {group.label}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[color:var(--text-on-dark-secondary)]">
                    {group.description}
                  </p>
                </div>
                <div className="grid gap-4 lg:grid-cols-3">
                  {tiers.map((tier) => (
                    <PricingCard key={`${tier.category}-${tier.name}`} tier={tier} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-16">
          <PaymentMethods />
        </div>

        <p className="mt-8 text-xs text-[color:var(--text-on-dark-secondary)]">
          Exchange-rate estimates use the no-key ExchangeRate-API open endpoint and may vary from
          final invoice values.
        </p>
      </section>
    </main>
  );
}
