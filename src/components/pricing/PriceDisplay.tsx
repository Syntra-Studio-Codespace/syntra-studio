"use client";

import { useCurrency } from "@/components/currency/CurrencyProvider";

type PriceDisplayProps = {
  price: string;
  billingType: "one-time" | "monthly" | "project-based";
  className?: string;
  tone?: "dark" | "light";
};

function parseUsdAmount(price: string) {
  const match = price.match(/\$([\d,]+)/);
  return match ? Number(match[1].replaceAll(",", "")) : null;
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "PKR" || currency === "INR" ? 0 : 2,
  }).format(amount);
}

function billingLabel(billingType: PriceDisplayProps["billingType"]) {
  if (billingType === "monthly") {
    return "monthly";
  }

  if (billingType === "project-based") {
    return "project-based";
  }

  return "one-time";
}

export function PriceDisplay({ price, billingType, className, tone = "dark" }: PriceDisplayProps) {
  const { currency, rates, status } = useCurrency();
  const amount = parseUsdAmount(price);
  const rate = rates[currency];
  const canConvert = amount !== null && currency !== "USD" && rate;
  const primaryText = tone === "light" ? "text-brand-charcoal" : "text-brand-offwhite";
  const secondaryText =
    tone === "light"
      ? "text-[color:var(--text-on-light-secondary)]"
      : "text-[color:var(--text-on-dark-secondary)]";

  return (
    <div className={className}>
      <p className={`font-heading text-4xl font-semibold tracking-[-0.01em] ${primaryText}`}>
        {price}
      </p>
      <p className={`mt-1 text-sm ${secondaryText}`}>USD canonical - {billingLabel(billingType)}</p>
      {canConvert ? (
        <p className="mt-3 text-sm font-semibold text-brand-cyan">
          Approx. {formatCurrency(amount * rate, currency)}
        </p>
      ) : null}
      {amount !== null && currency !== "USD" && status === "error" ? (
        <p className={`mt-3 text-sm ${secondaryText}`}>Local estimate unavailable.</p>
      ) : null}
    </div>
  );
}
