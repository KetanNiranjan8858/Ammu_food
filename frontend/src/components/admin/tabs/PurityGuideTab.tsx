"use client";

import React from "react";
import { PurityGuideConfig, PurityTest } from "@/lib/types";
import { Beaker } from "lucide-react";

interface PurityGuideTabProps {
  purityGuide: PurityGuideConfig;
  onChange: (updated: PurityGuideConfig) => void;
}

export default function PurityGuideTab({ purityGuide, onChange }: PurityGuideTabProps) {
  const handleTestChange = (index: number, field: keyof PurityTest, value: string) => {
    const updated = [...purityGuide.tests];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...purityGuide, tests: updated });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-800 pb-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Beaker className="w-5 h-5 text-[#D4AF37]" />
          <span>Interactive Saffron Purity Testing Guide</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-1">
          Educates consumers on how to verify 100% pure Kashmiri Saffron at home (Cold Water Test, Baking Soda Test, Finger Rub Test).
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Badge Tag
            </label>
            <input
              type="text"
              value={purityGuide.badge}
              onChange={(e) => onChange({ ...purityGuide, badge: e.target.value })}
              className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Section Title
            </label>
            <input
              type="text"
              value={purityGuide.title}
              onChange={(e) => onChange({ ...purityGuide, title: e.target.value })}
              className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Section Subtitle
            </label>
            <input
              type="text"
              value={purityGuide.subtitle}
              onChange={(e) => onChange({ ...purityGuide, subtitle: e.target.value })}
              className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
            />
          </div>
        </div>

        {/* The 3 Purity Tests */}
        <div className="space-y-6 pt-2">
          {purityGuide.tests.map((test, idx) => (
            <div key={idx} className="p-6 bg-[#1D1614] border border-stone-800 rounded-2xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                    Test #{idx + 1} Title
                  </label>
                  <input
                    type="text"
                    value={test.title}
                    onChange={(e) => handleTestChange(idx, "title", e.target.value)}
                    className="w-full bg-[#140F0E] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white font-bold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    value={test.badge}
                    onChange={(e) => handleTestChange(idx, "badge", e.target.value)}
                    className="w-full bg-[#140F0E] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  How To Perform Step
                </label>
                <input
                  type="text"
                  value={test.summary}
                  onChange={(e) => handleTestChange(idx, "summary", e.target.value)}
                  className="w-full bg-[#140F0E] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-stone-200 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-[#172018] border border-emerald-500/30 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-emerald-400">
                    Genuine AMMu Pure Result:
                  </span>
                  <textarea
                    rows={3}
                    value={test.pureResult}
                    onChange={(e) => handleTestChange(idx, "pureResult", e.target.value)}
                    className="w-full bg-transparent text-xs text-stone-200 outline-none resize-none"
                  />
                </div>

                <div className="p-3 bg-[#241517] border border-rose-500/30 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-rose-400">
                    Adulterated / Fake Saffron Result:
                  </span>
                  <textarea
                    rows={3}
                    value={test.fakeResult}
                    onChange={(e) => handleTestChange(idx, "fakeResult", e.target.value)}
                    className="w-full bg-transparent text-xs text-stone-300 outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

