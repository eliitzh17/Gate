"use client";

import Link from "next/link";
import { locales, localeNames, localeFlags } from "@/lib/i18n";
import { currencies, currencySymbols, currencyNames } from "@/lib/currency";
import type { Currency } from "@/lib/currency";
import { useI18n } from "./LandingPage";
import { useCurrency } from "./CurrencyProvider";

export default function LanguageSwitcher() {
  const { lang } = useI18n();
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="fixed top-0 right-0 left-0 z-[60] bg-navy-light/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-8">
        {/* Currency switcher */}
        <div className="flex items-center gap-0.5">
          {currencies.map((c: Currency) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`flex items-center gap-1 px-2 py-0.5 text-xs rounded transition-colors ${
                currency === c
                  ? "text-gold font-bold"
                  : "text-white/50 hover:text-gold"
              }`}
            >
              <span className="text-[10px]">{currencySymbols[c]}</span>
              {currencyNames[c][lang]}
            </button>
          ))}
        </div>

        {/* Language switcher */}
        <div className="flex items-center gap-0.5">
          {locales.map((l) => (
            <Link
              key={l}
              href={`/${l}`}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 text-xs rounded transition-colors ${
                lang === l
                  ? "text-gold font-bold"
                  : "text-white/50 hover:text-gold"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={localeFlags[l]}
                alt=""
                width={18}
                height={13}
                className="rounded-[2px] object-cover"
              />
              {localeNames[l]}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
