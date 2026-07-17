"use client";

import { ChevronDown } from "lucide-react";
import { globalPricingNotes } from "@/data/pricing-tiers";
import { useCurrency, type CurrencyCode } from "@/components/currency/CurrencyProvider";
import { cn } from "@/lib/utils/cn";

export function CurrencySwitcher() {
  const { currency, setCurrency, status } = useCurrency();
  const statusLabel =
    status === "ready"
      ? "Exchange rates loaded"
      : status === "error"
        ? "Exchange rates unavailable"
        : "Exchange rates loading";

  return (
    <label className="group relative inline-flex min-h-11 items-center gap-3 rounded-full border border-[color:var(--border-on-dark)] bg-brand-charcoal/72 px-4 text-brand-offwhite shadow-[inset_0_1px_0_rgba(247,247,251,0.06),0_0_24px_rgba(34,211,238,0.04)] backdrop-blur-xl transition hover:border-brand-cyan/45 hover:bg-brand-offwhite/[0.06]">
      <span className="sr-only">Display currency</span>
      <span className="hidden font-heading text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--text-on-dark-secondary)] xl:inline">
        Currency
      </span>
      <span
        aria-label={statusLabel}
        className={cn(
          "h-2 w-2 rounded-full",
          status === "ready" && "bg-brand-cyan shadow-[0_0_14px_rgba(34,211,238,0.78)]",
          status === "loading" && "animate-pulse bg-brand-violet",
          status === "idle" && "bg-brand-violet",
          status === "error" && "bg-brand-violet/50",
        )}
      />
      <select
        aria-label="Display currency"
        className="cursor-pointer appearance-none border-0 bg-transparent py-0 pl-0 pr-6 font-heading text-sm font-semibold text-brand-offwhite focus:ring-0"
        onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
        value={currency}
      >
        {globalPricingNotes.supportedCurrencies.map((code) => (
          <option className="bg-brand-charcoal text-brand-offwhite" key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-3.5 text-[color:var(--text-on-dark-secondary)] transition group-hover:text-brand-cyan"
        size={15}
        strokeWidth={2}
      />
    </label>
  );
}
