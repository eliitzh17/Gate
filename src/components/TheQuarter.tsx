"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "./LandingPage";
import { renderGoldTitle } from "@/lib/renderGoldTitle";

const YOUTUBE_ID = "pkOtGPrMGlU";
const FB_VIDEO_URL =
  "https://www.facebook.com/EdenJerusalem/videos/2305304023226972/";

export default function TheQuarter() {
  const { dict } = useI18n();
  const t = dict.quarter;
  const [activeVideo, setActiveVideo] = useState<"youtube" | "facebook" | null>(null);

  const stats = [
    { value: t.stat1Value, unit: t.stat1Unit, label: t.stat1Label },
    { value: t.stat2Value, unit: t.stat2Unit, label: t.stat2Label },
    { value: t.stat3Value, unit: t.stat3Unit, label: t.stat3Label },
    { value: t.stat4Value, unit: t.stat4Unit, label: t.stat4Label },
    { value: t.stat5Value, unit: t.stat5Unit, label: t.stat5Label },
    { value: t.stat6Value, unit: t.stat6Unit, label: t.stat6Label },
  ];

  return (
    <section className="py-12 md:py-20 bg-navy text-white" id="quarter">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          {renderGoldTitle(t.title)}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/70 max-w-3xl mx-auto mb-16 text-lg"
        >
          {t.subtitle}
        </motion.p>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <p className="text-white/80 text-lg leading-relaxed text-center">
            {t.description}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.08 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors"
            >
              <div className="text-3xl md:text-4xl font-bold text-gold">
                {stat.value}
              </div>
              <div className="text-sm text-gold/70 font-medium mt-1">
                {stat.unit}
              </div>
              <div className="text-xs text-white/50 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Why the city promotes it + What's planned */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-gold mb-4">{t.whyTitle}</h3>
            <p className="text-white/70 leading-relaxed">{t.whyDesc}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-gold mb-4">{t.planned}</h3>
            <p className="text-white/70 leading-relaxed">{t.plannedDesc}</p>
          </motion.div>
        </div>

        {/* Videos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gold">
            {t.videoTitle}
          </h3>
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {/* YouTube Video — landscape, full width */}
            <div>
              <p className="text-white/50 text-sm text-center mb-3">{t.videoYoutube}</p>
              <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-video cursor-pointer group" onClick={() => activeVideo !== "youtube" && setActiveVideo("youtube")}>
                {activeVideo === "youtube" ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1`}
                    title="GATE Jerusalem Promo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${YOUTUBE_ID}/hqdefault.jpg`}
                      alt={t.videoYoutube}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-navy/50 group-hover:bg-navy/30 transition-colors duration-300" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <div className="rounded-full bg-gold/90 group-hover:bg-gold group-hover:scale-110 flex items-center justify-center shadow-xl transition-all duration-300 w-16 h-16">
                        <svg className="w-7 h-7 text-navy" style={{ marginInlineStart: 2 }} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Facebook Video — portrait, centered with natural aspect ratio */}
            <div>
              <p className="text-white/50 text-sm text-center mb-3">{t.videoFacebook}</p>
              <div className="relative rounded-xl overflow-hidden shadow-2xl mx-auto max-w-sm aspect-[9/16] cursor-pointer group" onClick={() => activeVideo !== "facebook" && setActiveVideo("facebook")}>
                {activeVideo === "facebook" ? (
                  <iframe
                    src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(FB_VIDEO_URL)}&show_text=false&width=320&height=568`}
                    title="Gateway Quarter Video"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none", overflow: "hidden" }}
                  />
                ) : (
                  <>
                    <div className="w-full h-full bg-gradient-to-br from-navy-light to-navy flex items-center justify-center">
                      <svg className="w-16 h-16 text-white/20" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                    </div>
                    <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <div className="rounded-full bg-gold/90 group-hover:bg-gold group-hover:scale-110 flex items-center justify-center shadow-xl transition-all duration-300 w-16 h-16">
                        <svg className="w-7 h-7 text-navy" style={{ marginInlineStart: 2 }} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
