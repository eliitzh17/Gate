export type Locale = "he" | "en" | "ar";

export const locales: Locale[] = ["he", "en", "ar"];
export const defaultLocale: Locale = "he";

export const localeNames: Record<Locale, string> = {
  he: "עברית",
  en: "English",
  ar: "العربية",
};

export const localeFlags: Record<Locale, string> = {
  he: "https://flagcdn.com/w40/il.png",
  en: "https://flagcdn.com/w40/us.png",
  ar: "https://flagcdn.com/w40/sa.png",
};

export const dirMap: Record<Locale, "rtl" | "ltr"> = {
  he: "rtl",
  en: "ltr",
  ar: "rtl",
};

const dictionaries = {
  he: () => import("@/locales/he.json").then((m) => m.default),
  en: () => import("@/locales/en.json").then((m) => m.default),
  ar: () => import("@/locales/ar.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
