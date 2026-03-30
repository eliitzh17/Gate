"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import {
  type Currency,
  type ExchangeRates,
  defaultCurrencyByLocale,
  fallbackRates,
  convertFromILS,
  formatPrice,
} from "@/lib/currency";
import type { Locale } from "@/lib/i18n";

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  rates: ExchangeRates;
  /** Convert an ILS amount to the current currency and return formatted string */
  fmtPrice: (ilsAmount: number) => string;
  /** Convert an ILS amount to the current currency (raw number) */
  convert: (ilsAmount: number) => number;
  ratesLoaded: boolean;
}

const CurrencyCtx = createContext<CurrencyContextValue>(null!);

export function useCurrency() {
  return useContext(CurrencyCtx);
}

export default function CurrencyProvider({ lang, children }: { lang: Locale; children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(defaultCurrencyByLocale[lang]);
  const [rates, setRates] = useState<ExchangeRates>(fallbackRates);
  const [ratesLoaded, setRatesLoaded] = useState(false);

  // When language changes, update default currency
  useEffect(() => {
    setCurrency(defaultCurrencyByLocale[lang]);
  }, [lang]);

  // Fetch live rates
  useEffect(() => {
    let cancelled = false;
    async function fetchRates() {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/ILS");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data.result === "success" && data.rates) {
          setRates({
            ILS: 1,
            USD: Math.round(data.rates.USD * 1_000_000) / 1_000_000,
            AED: Math.round(data.rates.AED * 1_000_000) / 1_000_000,
          });
          setRatesLoaded(true);
        }
      } catch {
        // Keep fallback rates
      }
    }
    fetchRates();
    return () => { cancelled = true; };
  }, []);

  const convert = useCallback(
    (ilsAmount: number) => convertFromILS(ilsAmount, currency, rates),
    [currency, rates]
  );

  const fmtPrice = useCallback(
    (ilsAmount: number) => formatPrice(convertFromILS(ilsAmount, currency, rates), currency),
    [currency, rates]
  );

  return (
    <CurrencyCtx.Provider value={{ currency, setCurrency, rates, fmtPrice, convert, ratesLoaded }}>
      {children}
    </CurrencyCtx.Provider>
  );
}
