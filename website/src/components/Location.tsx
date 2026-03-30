"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useI18n } from "./LandingPage";

export default function Location() {
  const { dict } = useI18n();
  const t = dict.location;

  const destinations = [
    { time: "32", name: t.train, hook: t.trainHook, mode: t.byTrain, image: "/images/locations/tel-aviv.jpg" },
    { time: "5", name: t.lightRail, hook: t.lightRailHook, mode: t.byFoot, image: "/images/locations/light-rail.jpg" },
    { time: "10", name: t.knesset, hook: t.knessetHook, mode: t.byFoot, image: "/images/locations/knesset.jpg" },
    { time: "10", name: t.sacherPark, hook: t.sacherParkHook, mode: t.byFoot, image: "/images/locations/sacher-park.jpg" },
    { time: "15", name: t.machaneYehuda, hook: t.machaneYehudaHook, mode: t.byFoot, image: "/images/locations/machane-yehuda.jpg" },
    { time: "15", name: t.oldCity, hook: t.oldCityHook, mode: t.byRail, image: "/images/locations/old-city.jpg" },
  ];

  return (
    <section className="py-20 bg-white" id="location">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="text-3xl md:text-4xl font-bold text-center text-navy mb-4">{t.title}</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">{t.subtitle}</motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {destinations.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden h-64 cursor-default"
            >
              <Image
                src={d.image}
                alt={d.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />

              {/* Time + mode badge */}
              <div className="absolute top-4 end-4 bg-navy/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="text-gold">{d.time} {dict.common.min}</span>
                <span className="text-white/40">|</span>
                <span className="text-white/70">{d.mode}</span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 start-0 end-0 p-5">
                <h3 className="text-white font-bold text-lg mb-1">{d.name}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{d.hook}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
