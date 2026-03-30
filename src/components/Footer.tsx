"use client";

import { useI18n } from "./LandingPage";

export default function Footer() {
  const { dict } = useI18n();
  const t = dict.footer;

  return (
    <footer className="bg-navy-light py-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm text-white/30">
          <a href="#" className="hover:text-gold transition-colors">{t.privacy}</a><span>|</span>
          <a href="#" className="hover:text-gold transition-colors">{t.terms}</a><span>|</span>
          <a href="#" className="hover:text-gold transition-colors">{t.accessibility}</a>
        </div>
        <div className="text-center text-xs text-white/50 max-w-3xl mx-auto leading-relaxed">{t.disclaimer}</div>
        <div className="text-center text-xs text-white/30 mt-4">&copy; 2026 GATE Jerusalem. כל הזכויות שמורות.</div>
      </div>
    </footer>
  );
}
