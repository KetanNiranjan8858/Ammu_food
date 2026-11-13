"use client";

import React from "react";
import { NutritionConfig } from "@/lib/types";
import { ShieldCheck, Plus, Trash2 } from "lucide-react";

interface NutritionTabProps {
  nutrition: NutritionConfig;
  onChange: (updated: NutritionConfig) => void;
}

export default function NutritionTab({ nutrition, onChange }: NutritionTabProps) {
  const handleChecklistChange = (index: number, val: string) => {
    const updated = [...(nutrition.checklist || [])];
    updated[index] = val;
    onChange({ ...nutrition, checklist: updated });
  };

  const addChecklistItem = () => {
    onChange({
      ...nutrition,
      checklist: [...(nutrition.checklist || []), "100% Organic Certified"],
    });
  };

  const removeChecklistItem = (index: number) => {
    const updated = (nutrition.checklist || []).filter((_, idx) => idx !== index);
    onChange({ ...nutrition, checklist: updated });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-800 pb-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
          <span>Nutrition Facts & FSSAI Lab Certification</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-1">
          Displays the authentic back-of-pack nutrition table image and zero-additive guarantee.
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Section Badge Tag
            </label>
            <input
              type="text"
              value={nutrition.badge}
              onChange={(e) => onChange({ ...nutrition, badge: e.target.value })}
              className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Pack Label Note (Floating Badge)
            </label>
            <input
              type="text"
              value={nutrition.labelNote || ""}
              onChange={(e) => onChange({ ...nutrition, labelNote: e.target.value })}
              className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
              placeholder="Official Pack Label • FSSAI Lic. 22720559000206"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Section Headline Title
          </label>
          <input
            type="text"
            value={nutrition.title}
            onChange={(e) => onChange({ ...nutrition, title: e.target.value })}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Introductory Description
          </label>
          <textarea
            rows={2}
            value={nutrition.description}
            onChange={(e) => onChange({ ...nutrition, description: e.target.value })}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl p-3 text-xs text-white outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-[#1F1715] rounded-2xl border border-stone-800">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#FDD835] mb-1.5">
              Zero-Additive Guarantee Title
            </label>
            <input
              type="text"
              value={nutrition.guaranteeTitle}
              onChange={(e) => onChange({ ...nutrition, guaranteeTitle: e.target.value })}
              className="w-full bg-[#150F0E] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Zero-Additive Guarantee Text
            </label>
            <textarea
              rows={2}
              value={nutrition.guaranteeText}
              onChange={(e) => onChange({ ...nutrition, guaranteeText: e.target.value })}
              className="w-full bg-[#150F0E] border border-stone-700 focus:border-[#D4AF37] rounded-xl p-3 text-xs text-white outline-none"
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-stone-300">
              Guarantee Checklist Items
            </label>
            <button
              onClick={addChecklistItem}
              className="text-xs text-[#D4AF37] hover:text-[#FDD835] flex items-center gap-1 font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Item</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(nutrition.checklist || []).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleChecklistChange(idx, e.target.value)}
                  className="flex-1 bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                />
                <button
                  onClick={() => removeChecklistItem(idx)}
                  className="p-2 text-stone-500 hover:text-rose-400 rounded-lg hover:bg-rose-950/30"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

