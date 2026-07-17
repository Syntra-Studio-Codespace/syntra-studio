"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { globalPricingNotes } from "@/data/pricing-tiers";

export type CurrencyCode = (typeof globalPricingNotes.supportedCurrencies)[number];

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  rates: Partial<Record<CurrencyCode, number>>;
  status: "idle" | "loading" | "ready" | "error";
  updatedAt?: string;
};

type ExchangeRateResponse = {
  result: "success" | "error";
  time_last_update_utc?: string;
  rates?: Record<string, number>;
};

const storageKey = "syntra.currency";
const defaultCurrency: CurrencyCode = "USD";
const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function detectCurrency(): CurrencyCode {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;
  const region = locale.split("-").at(-1)?.toUpperCase();

  const regionMap: Record<string, CurrencyCode> = {
    PK: "PKR",
    US: "USD",
    GB: "GBP",
    CA: "CAD",
    AU: "AUD",
    AE: "AED",
    SA: "SAR",
    IN: "INR",
  };

  return region ? (regionMap[region] ?? defaultCurrency) : defaultCurrency;
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(defaultCurrency);
  const [rates, setRates] = useState<Partial<Record<CurrencyCode, number>>>({ USD: 1 });
  const [status, setStatus] = useState<CurrencyContextValue["status"]>("idle");
  const [updatedAt, setUpdatedAt] = useState<string>();

  useEffect(() => {
    const savedCurrency = window.localStorage.getItem(storageKey) as CurrencyCode | null;

    setCurrencyState(
      savedCurrency && globalPricingNotes.supportedCurrencies.includes(savedCurrency)
        ? savedCurrency
        : detectCurrency(),
    );
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadRates() {
      setStatus("loading");

      try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD", {
          cache: "no-store",
        });
        const data = (await response.json()) as ExchangeRateResponse;

        if (!isMounted || data.result !== "success" || !data.rates) {
          throw new Error("Exchange rate response unavailable");
        }

        const supportedRates = Object.fromEntries(
          globalPricingNotes.supportedCurrencies.map((code) => [code, data.rates?.[code]]),
        ) as Partial<Record<CurrencyCode, number>>;

        setRates({ ...supportedRates, USD: 1 });
        setUpdatedAt(data.time_last_update_utc);
        setStatus("ready");
      } catch {
        if (isMounted) {
          setStatus("error");
        }
      }
    }

    loadRates();

    return () => {
      isMounted = false;
    };
  }, []);

  const setCurrency = (nextCurrency: CurrencyCode) => {
    setCurrencyState(nextCurrency);
    window.localStorage.setItem(storageKey, nextCurrency);
  };

  const value = useMemo(
    () => ({ currency, rates, setCurrency, status, updatedAt }),
    [currency, rates, status, updatedAt],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }

  return context;
}
