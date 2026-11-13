"use client";

import React from "react";
import { WhyAmmuConfig, WhyAmmuPoint } from "@/lib/types";
import { Layers, ShieldCheck, AlertTriangle } from "lucide-react";

interface WhyAmmuTabProps {
  whyAmmu: WhyAmmuConfig;
  onChange: (updated: WhyAmmuConfig) => void;
}

export default function WhyAmmuTab({ whyAmmu, onChange }: WhyAmmuTabProps) {
  const handleAmmuPointChange = (index: number, field: keyof WhyAmmuPoint, value: string) => {
    const updatedPoints = [...whyAmmu.ammuCard.points];
    updatedPoints[index] = { ...updatedPoints[index], [field]: value };
    onChange({
      ...whyAmmu,
      ammuCard: { ...whyAmmu.ammuCard, points: updatedPoints },
    });
  };

  const handleMarketPointChange = (index: number, field: keyof WhyAmmuPoint, value: string) => {
    const updatedPoints = [...whyAmmu.marketCard.points];
    updatedPoints[index] = { ...updatedPoints[index], [field]: value };
    onChange({
      ...whyAmmu,
      marketCard: { ...whyAmmu.marketCard, points: updatedPoints },
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-800 pb-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>Why AMMu Comparison Section</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-1">
          Comparison matrix contrasting AMMu 100% Grade A++ Kashmiri Mongra against ordinary adulterated market brands.
        </p>
      </div>

      {/* Main Section Headings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Section Badge
          </label>
          <input
            type="text"
            value={whyAmmu.badge}
            onChange={(e) => onChange({ ...whyAmmu, badge: e.target.value })}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Section Headline Title
          </label>
          <input
            type="text"
            value={whyAmmu.title}
            onChange={(e) => onChange({ ...whyAmmu, title: e.target.value })}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
          />
        </div>

        <div className="md:col-span-3">
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Section Subtitle
          </label>
          <input
            type="text"
            value={whyAmmu.subtitle}
            onChange={(e) => onChange({ ...whyAmmu, subtitle: e.target.value })}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
          />
        </div>
      </div>

      {/* Comparison Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* AMMu Foods Card */}
        <div className="p-6 bg-[#211719] border-2 border-[#D4AF37] rounded-3xl space-y-4">
          <div className="flex items-center gap-2 border-b border-[#D4AF37]/30 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-serif font-bold text-base text-white">
              AMMu Pure Kashmiri Saffron (Genuine Standard)
            </h3>
          </div>

          <div className="space-y-4">
            {whyAmmu.ammuCard.points.map((pt, idx) => (
              <div key={idx} className="p-3 bg-[#150F0E] rounded-xl border border-stone-800 space-y-1.5">
                <input
                  type="text"
                  value={pt.title}
                  onChange={(e) => handleAmmuPointChange(idx, "title", e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-emerald-400 outline-none"
                  placeholder="Feature Title"
                />
                <textarea
                  rows={2}
                  value={pt.desc}
                  onChange={(e) => handleAmmuPointChange(idx, "desc", e.target.value)}
                  className="w-full bg-transparent text-xs text-stone-300 outline-none resize-none"
                  placeholder="Feature Description"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Ordinary Market Brands Card */}
        <div className="p-6 bg-[#1D1615] border border-rose-900/50 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 border-b border-rose-900/40 pb-3">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h3 className="font-serif font-bold text-base text-stone-300">
              Ordinary Commercial Brands (Diluted / Adulterated)
            </h3>
          </div>

          <div className="space-y-4">
            {whyAmmu.marketCard.points.map((pt, idx) => (
              <div key={idx} className="p-3 bg-[#150F0E] rounded-xl border border-stone-800 space-y-1.5">
                <input
                  type="text"
                  value={pt.title}
                  onChange={(e) => handleMarketPointChange(idx, "title", e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-rose-400 outline-none"
                  placeholder="Market Flaw Title"
                />
                <textarea
                  rows={2}
                  value={pt.desc}
                  onChange={(e) => handleMarketPointChange(idx, "desc", e.target.value)}
                  className="w-full bg-transparent text-xs text-stone-400 outline-none resize-none"
                  placeholder="Market Flaw Description"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

