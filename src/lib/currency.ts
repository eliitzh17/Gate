import type { Locale } from "./i18n";

export type Currency = "ILS" | "USD" | "AED";

export const currencies: Currency[] = ["ILS", "USD", "AED"];

export const currencySymbols: Record<Currency, string> = {
  ILS: "₪",
  USD: "$",
  AED: "د.إ",
};

export const currencyNames: Record<Currency, Record<Locale, string>> = {
  ILS: { he: "שקל", en: "ILS", ar: "شيكل" },
  USD: { he: "דולר", en: "USD", ar: "دولار" },
  AED: { he: "דירהם", en: "AED", ar: "درهم" },
};

export const defaultCurrencyByLocale: Record<Locale, Currency> = {
  he: "ILS",
  en: "USD",
  ar: "AED",
};

/** Rates are ILS-based: 1 ILS = X foreign. So to convert ILS→USD, multiply by rate. */
export type ExchangeRates = Record<Currency, number>;

export const fallbackRates: ExchangeRates = {
  ILS: 1,
  USD: 0.317,    // ~3.15 ILS per USD
  AED: 1.165,    // ~0.86 ILS per AED
};

export function convertFromILS(ilsAmount: number, currency: Currency, rates: ExchangeRates): number {
  if (currency === "ILS") return ilsAmount;
  return ilsAmount * rates[currency];
}

export function formatPrice(amount: number, currency: Currency): string {
  const symbol = currencySymbols[currency];
  // For ILS keep whole numbers, for foreign currencies round to nearest thousand for large amounts
  const rounded = currency === "ILS" ? Math.round(amount) : Math.round(amount);
  const formatted = rounded.toLocaleString("en-US");
  if (currency === "AED") return `${formatted} ${symbol}`;
  return `${symbol}${formatted}`;
}
