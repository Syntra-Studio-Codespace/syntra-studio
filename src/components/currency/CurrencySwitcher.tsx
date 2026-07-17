"use client";

import { globalPricingNotes } from "@/data/pricing-tiers";
import { useCurrency, type CurrencyCode } from "@/components/currency/CurrencyProvider";

export function CurrencySwitcher() {
  const { currency, setCurrency, status } = useCurrency();

  return (
    <label className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[color:var(--border-on-dark)] bg-brand-offwhite/[0.03] px-3 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-brand-offwhite">
      <span className="sr-only">Display currency</span>
      <select
        aria-label="Display currency"
        className="cursor-pointer border-0 bg-transparent p-0 text-brand-offwhite focus:ring-0"
        onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
        value={currency}
      >
        {globalPricingNotes.supportedCurrencies.map((code) => (
          <option className="bg-brand-charcoal text-brand-offwhite" key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
      <span
        aria-label={status === "ready" ? "Exchange rates loaded" : "Exchange rates loading"}
        className="h-1.5 w-1.5 rounded-full bg-brand-cyan"
      />
    </label>
  );
}
