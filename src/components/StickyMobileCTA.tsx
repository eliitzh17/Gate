"use client";

import { useI18n } from "./LandingPage";
import { useStickyBarVisible } from "@/lib/useStickyBarVisible";

export default function StickyMobileCTA() {
  const { dict } = useI18n();
  const t = dict.contact;
  const visible = useStickyBarVisible();

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-navy/95 backdrop-blur border-t border-gold/20 px-4 py-3 flex gap-3">
      <a href="tel:0546302880" className="flex-1 border border-gold/40 text-gold text-sm font-medium py-3 rounded-lg text-center flex items-center justify-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
        {t.callUs}
      </a>
      <a href="#contact" className="flex-1 bg-gold text-navy text-sm font-bold py-3 rounded-lg text-center">{t.leaveDetails}</a>
    </div>
  );
}
