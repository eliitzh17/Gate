"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useI18n } from "./LandingPage";

export default function Hero() {
  const { dict } = useI18n();
  const t = dict.hero;

  return (
    <>
      {/* Full-bleed image — no text overlay */}
      <section className="relative h-screen overflow-hidden bg-navy">
        <Image src="/images/Gate_v1_hi-res_0821.jpg" alt={dict.alt.heroMain} fill sizes="100vw" className="object-cover" priority quality={85} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-white/60">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Headline + CTAs below image */}
      <section className="bg-navy py-12 text-center px-4">
        <motion.h1 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-white mb-2">
          {t.title1} <span className="text-gold">{t.title2}</span>
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-8">
          <a href="#floors" className="bg-gold hover:bg-gold-light text-navy font-bold text-sm px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]">{t.cta}</a>
          <a href="#quarter" className="border-2 border-white/30 hover:border-gold text-white hover:text-gold font-medium text-sm px-8 py-3 rounded-lg transition-colors duration-300">{t.ctaQuarter}</a>
        </motion.div>
      </section>
    </>
  );
}
