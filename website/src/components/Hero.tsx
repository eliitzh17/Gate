"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useI18n } from "./LandingPage";

export default function Hero() {
  const { dict } = useI18n();
  const t = dict.hero;
  const [videoActive, setVideoActive] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy">
      <Image src="/images/Gate_v1_hi-res_0821.jpg" alt="GATE Jerusalem" fill sizes="100vw" className="object-cover z-0" priority quality={85} />
      <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top, rgba(26,39,68,0.92) 0%, rgba(26,39,68,0.4) 50%, rgba(26,39,68,0.1) 100%)" }} />
      <div className="relative z-20 text-center px-4 pt-32 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-block mb-8">
          <span className="text-gold font-medium text-xs px-0 tracking-[0.3em] uppercase">{t.badge}</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-display text-white mb-6">
          {t.title1}<br /><span className="text-gold">{t.title2}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          {t.subtitle1}<br />{t.subtitle2}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="mt-2 mb-12 max-w-2xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-video cursor-pointer group" onClick={() => !videoActive && setVideoActive(true)}>
            {videoActive ? (
              <iframe src="https://www.youtube.com/embed/pkOtGPrMGlU?autoplay=1" title="GATE Jerusalem Promo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" />
            ) : (
              <>
                <Image src="/images/Gate_v5_hi-res_0904-副本-1.jpg" alt="GATE Jerusalem Video" fill sizes="(max-width: 672px) 100vw, 672px" className="object-cover" />
                <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/25 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="rounded-full bg-gold/90 group-hover:bg-gold group-hover:scale-110 flex items-center justify-center shadow-xl transition-all duration-300" style={{ width: 72, height: 72 }}>
                    <svg className="w-7 h-7 text-navy" style={{ marginRight: -3 }} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                  <span className="text-white/90 text-sm font-medium">{t.videoLabel}</span>
                </div>
              </>
            )}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#floors" className="bg-gold hover:bg-gold-light text-navy font-bold text-lg px-10 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]">{t.cta}</a>
          <button onClick={() => setVideoActive(true)} className="border-2 border-white/30 hover:border-gold text-white hover:text-gold font-medium text-lg px-10 py-4 rounded-lg transition-colors duration-300">{t.ctaFloors}</button>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-white/50">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
