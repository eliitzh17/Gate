"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useI18n } from "./LandingPage";

function RotatingImage({ images, alt, interval = 2000 }: { images: string[]; alt: string; interval?: number }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={images[idx]}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// GATE Jerusalem — Shazar Blvd, near Chords Bridge, entrance to Jerusalem
const MAP_LAT = "31.7890";
const MAP_LNG = "35.2030";

export default function Location() {
  const { dict } = useI18n();
  const t = dict.location;

  const alt = dict.alt;
  const destinations = [
    { time: "5", name: t.lightRail, hook: t.lightRailHook, mode: t.byFoot, alt: alt.locationLightRail, images: ["/images/locations/light-rail-2.jpg", "/images/locations/light-rail-3.jpg"] },
    { time: "10", name: t.knesset, hook: t.knessetHook, mode: t.byFoot, alt: alt.locationKnesset, images: ["/images/locations/knesset-1.jpg", "/images/locations/knesset-2.jpg", "/images/locations/knesset-3.jpg"] },
    { time: "10", name: t.sacherPark, hook: t.sacherParkHook, mode: t.byFoot, alt: alt.locationSacherPark, images: ["/images/locations/sacher-park-2.jpg", "/images/locations/sacher-park-3.jpg"] },
    { time: "15", name: t.machaneYehuda, hook: t.machaneYehudaHook, mode: t.byFoot, alt: alt.locationMachaneYehuda, images: ["/images/locations/machane-yehuda-2.jpg", "/images/locations/machane-yehuda-4.jpg", "/images/locations/machane-yehuda-6.jpg"] },
    { time: "15", name: t.oldCity, hook: t.oldCityHook, mode: t.byRail, alt: alt.locationOldCity, images: ["/images/locations/old-city-1.jpg", "/images/locations/old-city-2.jpg", "/images/locations/old-city-3.jpg"] },
    { time: "32", name: t.train, hook: t.trainHook, mode: t.byTrain, alt: alt.locationTrain, images: ["/images/locations/tel-aviv-1.jpg", "/images/locations/tel-aviv-2.jpg"] },
  ];

  return (
    <section className="py-12 md:py-20 bg-white" id="location">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="text-3xl md:text-4xl font-bold text-center text-navy mb-4">{t.title}</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">{t.subtitle}</motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden h-64"
            >
              <RotatingImage images={d.images} alt={d.alt} interval={6000 + i * 300} />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent z-10" />

              {/* Time + mode badge */}
              <div className="absolute top-4 end-4 z-20 bg-navy/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="text-gold">{d.time} {dict.common.min}</span>
                <span className="text-white/40">|</span>
                <span className="text-white/70">{d.mode}</span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 start-0 end-0 p-5 z-20">
                <h3 className="text-white font-bold text-lg mb-1">{d.name}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{d.hook}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-xl font-bold text-navy text-center mb-6">{t.mapTitle}</h3>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 aspect-[4/3] md:aspect-[16/7]">
            <iframe
              src={`https://maps.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=16&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GATE Jerusalem Location"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
