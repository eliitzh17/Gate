"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "./LandingPage";
import { useCurrency } from "./CurrencyProvider";

const floorsData = [
  { number: 21, pricePerSqm: 20500, grossSqm: 1550, netSqm: 1131, totalPrice: 31775000, zone: "Mid-High" },
  { number: 22, pricePerSqm: 20500, grossSqm: 1550, netSqm: 1131, totalPrice: 31775000, zone: "Mid-High" },
  { number: 24, pricePerSqm: 20500, grossSqm: 1550, netSqm: 1131, totalPrice: 31775000, zone: "Mid-High" },
  { number: 35, pricePerSqm: 23500, grossSqm: 1700, netSqm: 1241, totalPrice: 39950000, zone: "Premium High" },
  { number: 37, pricePerSqm: 23500, grossSqm: 1700, netSqm: 1241, totalPrice: 39950000, zone: "Premium High" },
];

function fmt(n: number) { return n.toLocaleString("en-US"); }

export default function PaymentCalculator() {
  const { dict } = useI18n();
  const { fmtPrice } = useCurrency();
  const t = dict.calculator;
  const [selectedFloor, setSelectedFloor] = useState(21);
  const [parkingSpots, setParkingSpots] = useState(8);

  const floor = floorsData.find((f) => f.number === selectedFloor)!;
  const parkingCost = parkingSpots * 250000;
  const subtotal = floor.totalPrice + parkingCost;
  const vat = Math.round(subtotal * 0.17);
  const total = subtotal + vat;
  const payment30 = Math.round(total * 0.3);
  const payment70 = total - payment30;
  const pricePerNetSqm = Math.round(total / floor.netSqm);

  return (
    <section className="py-20 bg-navy" id="calculator">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-3xl md:text-4xl font-bold text-center text-white mb-4"
        >
          {t.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/60 mb-12"
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 md:p-8"
        >
          {/* Inputs */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">{t.selectFloor}</label>
              <div className="flex flex-wrap gap-2">
                {floorsData.map((f) => (
                  <button
                    key={f.number}
                    onClick={() => setSelectedFloor(f.number)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                      selectedFloor === f.number
                        ? "bg-gold text-navy shadow-lg"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {f.number}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">{t.parkingSpots}</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={parkingSpots}
                  onChange={(e) => setParkingSpots(Number(e.target.value))}
                  className="flex-1 accent-gold"
                />
                <span className="text-gold font-bold text-xl w-8 text-center">{parkingSpots}</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="border-t border-white/10 pt-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">{t.floorPrice} ({t.floor} {selectedFloor})</span>
              <span className="text-white font-medium">{fmtPrice(floor.totalPrice)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">{t.parkingLabel} ({parkingSpots})</span>
              <span className="text-white font-medium">{fmtPrice(parkingCost)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">{t.vat} (17%)</span>
              <span className="text-white font-medium">{fmtPrice(vat)}</span>
            </div>
            <div className="border-t border-white/10 pt-3 flex justify-between items-center">
              <span className="text-white font-bold">{t.total}</span>
              <span className="text-gold font-bold text-2xl">{fmtPrice(total)}</span>
            </div>
          </div>

          {/* Payment split */}
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 text-center">
              <div className="text-gold text-xs font-medium mb-1">{t.atPurchase} (30%)</div>
              <div className="text-white font-bold text-xl">{fmtPrice(payment30)}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-white/60 text-xs font-medium mb-1">{t.atDelivery} (70%)</div>
              <div className="text-white font-bold text-xl">{fmtPrice(payment70)}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-white/60 text-xs font-medium mb-1">{t.pricePerNet}</div>
              <div className="text-white font-bold text-xl">{fmtPrice(pricePerNetSqm)}</div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <a href="#contact" className="inline-block bg-gold hover:bg-gold-light text-navy font-bold px-10 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]">
              {t.cta}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
