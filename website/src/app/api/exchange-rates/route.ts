import { NextResponse } from "next/server";

/**
 * Fetches exchange rates with ILS as base currency.
 * Returns how much 1 ILS is worth in USD and AED.
 * Uses open.er-api.com which provides daily rates (last business day).
 */

// Cache rates for 4 hours
let cachedRates: { ILS: number; USD: number; AED: number } | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 4 * 60 * 60 * 1000;

export async function GET() {
  const now = Date.now();

  if (cachedRates && now - cacheTimestamp < CACHE_TTL) {
    return NextResponse.json({
      rates: cachedRates,
      cached: true,
      updatedAt: new Date(cacheTimestamp).toISOString(),
    });
  }

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/ILS", {
      next: { revalidate: 14400 },
    });

    if (!res.ok) throw new Error(`Exchange rate API responded with ${res.status}`);

    const data = await res.json();

    if (data.result !== "success" || !data.rates) {
      throw new Error("Unexpected API response format");
    }

    cachedRates = {
      ILS: 1,
      USD: Math.round(data.rates.USD * 1_000_000) / 1_000_000,
      AED: Math.round(data.rates.AED * 1_000_000) / 1_000_000,
    };
    cacheTimestamp = now;

    return NextResponse.json({
      rates: cachedRates,
      cached: false,
      updatedAt: new Date(now).toISOString(),
    });
  } catch {
    const fallback = { ILS: 1, USD: 0.278, AED: 1.02 };
    return NextResponse.json(
      { rates: cachedRates || fallback, cached: true, error: "Failed to fetch live rates" },
      { status: cachedRates ? 200 : 502 },
    );
  }
}
