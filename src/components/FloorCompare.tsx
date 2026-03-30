"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "./LandingPage";
import { useCurrency } from "./CurrencyProvider";

const floorsData = [
  { number: 21, pricePerSqm: 20500, grossSqm: 1550, netSqm: 1131, totalPrice: 31775000, parking: 8, zone: "Mid-High", badge: "", views: "SW / NW / NE / SE" },
  { number: 22, pricePerSqm: 20500, grossSqm: 1550, netSqm: 1131, totalPrice: 31775000, parking: 8, zone: "Mid-High", badge: "", views: "SW / NW / NE / SE" },
  { number: 24, pricePerSqm: 20500, grossSqm: 1550, netSqm: 1131, totalPrice: 31775000, parking: 8, zone: "Mid-High", badge: "allElevators", views: "SW / NW / NE / SE" },
  { number: 35, pricePerSqm: 23500, grossSqm: 1700, netSqm: 1241, totalPrice: 39950000, parking: 8, zone: "Premium High", badge: "panoramic", views: "SW / NW / NE / SE" },
  { number: 37, pricePerSqm: 23500, grossSqm: 1700, netSqm: 1241, totalPrice: 39950000, parking: 8, zone: "Premium High", badge: "panoramic", views: "SW / NW / NE / SE" },
];

function fmt(n: number) { return n.toLocaleString("en-US"); }

export default function FloorCompare() {
  const { dict } = useI18n();
  const { fmtPrice } = useCurrency();
  const t = dict.compare;
  const ft = dict.floors;
  const [floorA, setFloorA] = useState(24);
  const [floorB, setFloorB] = useState(35);

  const a = floorsData.find((f) => f.number === floorA)!;
  const b = floorsData.find((f) => f.number === floorB)!;

  const rows: { label: string; valA: string; valB: string; highlight?: boolean }[] = [
    { label: t.zone, valA: a.zone === "Premium High" ? ft.premium : ft.midHigh, valB: b.zone === "Premium High" ? ft.premium : ft.midHigh },
    { label: t.totalPrice, valA: fmtPrice(a.totalPrice), valB: fmtPrice(b.totalPrice), highlight: true },
    { label: t.pricePerSqm, valA: fmtPrice(a.pricePerSqm), valB: fmtPrice(b.pricePerSqm) },
    { label: t.grossArea, valA: `${fmt(a.grossSqm)} ${dict.common.sqm}`, valB: `${fmt(b.grossSqm)} ${dict.common.sqm}` },
    { label: t.netArea, valA: `~${fmt(a.netSqm)} ${dict.common.sqm}`, valB: `~${fmt(b.netSqm)} ${dict.common.sqm}` },
    { label: t.parking, valA: `${a.parking}`, valB: `${b.parking}` },
    { label: t.views, valA: a.views, valB: b.views },
    { label: t.payment30, valA: fmtPrice(Math.round(a.totalPrice * 0.3)), valB: fmtPrice(Math.round(b.totalPrice * 0.3)) },
    { label: t.payment70, valA: fmtPrice(Math.round(a.totalPrice * 0.7)), valB: fmtPrice(Math.round(b.totalPrice * 0.7)) },
    { label: t.special, valA: a.badge ? ft[a.badge as keyof typeof ft] as string : "—", valB: b.badge ? ft[b.badge as keyof typeof ft] as string : "—" },
  ];

  return (
    <section className="py-20 bg-warm-white" id="compare">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-3xl md:text-4xl font-bold text-center text-navy mb-4"
        >
          {t.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 mb-10"
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          {/* Floor selectors */}
          <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[120px_1fr_1fr] border-b border-gray-100">
            <div className="hidden md:block" />
            {[{ selected: floorA, setSelected: setFloorA, other: floorB }, { selected: floorB, setSelected: setFloorB, other: floorA }].map((col, ci) => (
              <div key={ci} className="p-4 flex flex-wrap gap-2 justify-center border-s border-gray-100 first:border-s-0 md:first:border-s">
                {floorsData.map((f) => (
                  <button
                    key={f.number}
                    onClick={() => col.setSelected(f.number)}
                    disabled={f.number === col.other}
                    className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                      col.selected === f.number
                        ? "bg-gold text-navy shadow"
                        : f.number === col.other
                          ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                          : "bg-gray-100 text-navy hover:bg-gray-200"
                    }`}
                  >
                    {f.number}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[120px_1fr_1fr] bg-navy text-white">
            <div className="hidden md:block" />
            <div className="p-4 text-center border-s border-white/10 first:border-s-0 md:first:border-s">
              <div className="text-gold font-bold text-lg">{ft.floor} {floorA}</div>
              <div className="text-white/50 text-xs">{a.zone === "Premium High" ? ft.premium : ft.midHigh}</div>
            </div>
            <div className="p-4 text-center border-s border-white/10">
              <div className="text-gold font-bold text-lg">{ft.floor} {floorB}</div>
              <div className="text-white/50 text-xs">{b.zone === "Premium High" ? ft.premium : ft.midHigh}</div>
            </div>
          </div>

          {/* Comparison rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1fr_1fr] md:grid-cols-[120px_1fr_1fr] ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} ${row.highlight ? "bg-champagne/50" : ""}`}
            >
              <div className="hidden md:flex items-center px-4 py-3 text-xs font-medium text-gray-500">
                {row.label}
              </div>
              {[row.valA, row.valB].map((val, vi) => (
                <div key={vi} className="px-4 py-3 text-center border-s border-gray-100 first:border-s-0 md:first:border-s">
                  <div className="md:hidden text-[10px] text-gray-400 mb-0.5">{row.label}</div>
                  <div className={`text-sm font-medium ${row.highlight ? "text-gold font-bold text-base" : "text-navy"}`}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* CTA */}
          <div className="p-6 text-center border-t border-gray-100">
            <a href="#contact" className="inline-block bg-gold hover:bg-gold-light text-navy font-bold px-8 py-3 rounded-lg transition-all duration-300">
              {t.cta}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
