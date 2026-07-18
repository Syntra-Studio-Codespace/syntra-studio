"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { globalPricingNotes } from "@/data/pricing-tiers";
import { useCurrency, type CurrencyCode } from "@/components/currency/CurrencyProvider";
import { cn } from "@/lib/utils/cn";

export function CurrencySwitcher() {
  const { currency, setCurrency, status } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);
  const statusLabel =
    status === "ready"
      ? "Exchange rates loaded"
      : status === "error"
        ? "Exchange rates unavailable"
        : "Exchange rates loading";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!switcherRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const chooseCurrency = (nextCurrency: CurrencyCode) => {
    setCurrency(nextCurrency);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={switcherRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Display currency"
        className={cn(
          "group inline-flex min-h-11 items-center gap-3 rounded-full border px-4 text-brand-offwhite backdrop-blur-xl transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan",
          "border-[color:var(--border-on-dark)] bg-brand-charcoal/82 shadow-[inset_0_1px_0_rgba(247,247,251,0.06),0_0_24px_rgba(34,211,238,0.04)]",
          "hover:border-brand-cyan/45 hover:bg-brand-offwhite/[0.06]",
          isOpen && "border-brand-cyan/55 bg-brand-offwhite/[0.08]",
        )}
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
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
        <span className="hidden font-heading text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--text-on-dark-secondary)] xl:inline">
          Currency
        </span>
        <span className="font-heading text-sm font-semibold tabular-nums text-brand-offwhite">
          {currency}
        </span>
        <ChevronDown
          aria-hidden
          className={cn(
            "text-[color:var(--text-on-dark-secondary)] transition group-hover:text-brand-cyan",
            isOpen && "rotate-180 text-brand-cyan",
          )}
          size={15}
          strokeWidth={2}
        />
      </button>

      {isOpen ? (
        <div
          className="absolute right-0 top-full z-50 mt-3 w-44 overflow-hidden rounded-2xl border border-[color:var(--border-on-dark)] bg-[color:rgba(15,15,23,0.96)] p-1.5 shadow-[0_24px_72px_rgba(0,0,0,0.44),0_0_42px_rgba(34,211,238,0.08)] backdrop-blur-xl"
          role="listbox"
        >
          {globalPricingNotes.supportedCurrencies.map((code) => {
            const isSelected = code === currency;

            return (
              <button
                aria-selected={isSelected}
                className={cn(
                  "flex min-h-10 w-full items-center justify-between rounded-xl px-3 font-heading text-sm font-semibold transition",
                  isSelected
                    ? "bg-brand-cyan text-brand-charcoal"
                    : "text-[color:var(--text-on-dark-secondary)] hover:bg-brand-offwhite/[0.06] hover:text-brand-offwhite",
                )}
                key={code}
                onClick={() => chooseCurrency(code)}
                role="option"
                type="button"
              >
                {code}
                {isSelected ? <Check aria-hidden size={16} strokeWidth={2.2} /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
