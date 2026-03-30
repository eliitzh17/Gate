"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { useI18n } from "./LandingPage";

type Tab = "layout" | "models";

export default function FloorPlans() {
  const { dict } = useI18n();
  const t = dict.plans;
  const alt = dict.alt;
  const [activeTab, setActiveTab] = useState<Tab>("layout");
  const [activeModelGroup, setActiveModelGroup] = useState<"ABCH" | "DEFG">("ABCH");

  const modelDescs: Record<string, string> = { A: t.modelA, B: t.modelB, C: t.modelC, D: t.modelD, E: t.modelE, F: t.modelF, G: t.modelG, H: t.modelH };
  const models = { ABCH: ["A", "B", "C", "H"], DEFG: ["D", "E", "F", "G"] };

  return (
    <section className="py-20 bg-white" id="plans">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="text-3xl md:text-4xl font-bold text-center text-navy mb-4">{t.title}</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">{t.subtitle}</motion.p>

        <div className="flex justify-center gap-3 mb-10">
          <button onClick={() => setActiveTab("layout")} className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === "layout" ? "bg-navy text-white shadow-lg" : "bg-gray-light text-navy hover:bg-gray-medium"}`}>{t.layoutTab}</button>
          <button onClick={() => setActiveTab("models")} className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === "models" ? "bg-navy text-white shadow-lg" : "bg-gray-light text-navy hover:bg-gray-medium"}`}>{t.modelsTab}</button>
        </div>

        {activeTab === "layout" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="bg-gray-light rounded-2xl p-4 md:p-8">
              <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-inner bg-white"><Image src="/images/floor24-layout.png" alt={alt.floor24Layout} width={3573} height={2526} className="w-full h-auto" quality={90} /></div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-bold text-navy mb-2">{t.layoutTitle}</h3>
                <p className="text-gray-500 text-sm mb-4">{t.layoutDesc}</p>
                <a href="/plans/floor24-layout.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-navy hover:text-gold transition-colors text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  {t.downloadPdf}
                </a>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-6 flex items-center justify-between">
                <div><p className="text-sm font-medium text-navy">{t.teaser}</p><p className="text-xs text-gray-400 mt-0.5">{t.teaserDesc}</p></div>
                <button onClick={() => setActiveTab("models")} className="text-sm text-gold hover:text-gold-light font-medium flex items-center gap-1 transition-colors">
                  {t.viewModels}
                  <svg className="w-4 h-4 ltr:rotate-0 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "models" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="flex justify-center gap-3 mb-8">
              <button onClick={() => setActiveModelGroup("ABCH")} className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeModelGroup === "ABCH" ? "bg-gold text-navy shadow-md" : "bg-gray-light text-navy hover:bg-gray-medium"}`}>{t.modelsABCH}</button>
              <button onClick={() => setActiveModelGroup("DEFG")} className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeModelGroup === "DEFG" ? "bg-gold text-navy shadow-md" : "bg-gray-light text-navy hover:bg-gray-medium"}`}>{t.modelsDEFG}</button>
            </div>
            <div className="bg-gray-light rounded-2xl p-4 md:p-8">
              <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-inner bg-white"><Image key={activeModelGroup} src={activeModelGroup === "ABCH" ? "/images/floor24-models-ABCH.png" : "/images/floor24-models-DEFG.png"} alt={activeModelGroup === "ABCH" ? alt.floorModelsABCH : alt.floorModelsDEFG} width={5803} height={3351} className="w-full h-auto" quality={90} /></div>
              <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {models[activeModelGroup].map((id) => (<div key={id} className="bg-white rounded-lg p-4 text-center"><span className="text-lg font-bold text-gold">{t.model} {id}</span><p className="text-xs text-gray-500 mt-1">{modelDescs[id]}</p></div>))}
              </div>
              <div className="mt-6 text-center"><a href={activeModelGroup === "ABCH" ? "/plans/floor24-models-ABCH.pdf" : "/plans/floor24-models-DEFG.pdf"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-navy hover:text-gold transition-colors text-sm font-medium"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>{t.downloadModels}</a></div>
            </div>
          </motion.div>
        )}
        <p className="text-center text-sm text-gray-400 mt-6">{t.disclaimer}</p>
      </div>
    </section>
  );
}
