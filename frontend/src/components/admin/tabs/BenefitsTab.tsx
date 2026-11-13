"use client";

import React from "react";
import { BenefitsConfig, BenefitItem } from "@/lib/types";
import { Heart } from "lucide-react";

interface BenefitsTabProps {
  benefits: BenefitsConfig;
  onChange: (updated: BenefitsConfig) => void;
}

export default function BenefitsTab({ benefits, onChange }: BenefitsTabProps) {
  const handleItemChange = (index: number, field: keyof BenefitItem, value: string) => {
    const updated = [...benefits.items];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...benefits, items: updated });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-800 pb-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#D4AF37]" />
          <span>Health, Wellness & Culinary Benefits Cards</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-1">
          Highlights the 4 primary applications: Pregnancy/Saffron Milk, Glowing Skin, Gourmet Biryani/Sweets, and Mind/Mood balance.
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
              value={benefits.badge}
              onChange={(e) => onChange({ ...benefits, badge: e.target.value })}
              className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Section Title
            </label>
            <input
              type="text"
              value={benefits.title}
              onChange={(e) => onChange({ ...benefits, title: e.target.value })}
              className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Section Subtitle
            </label>
            <input
              type="text"
              value={benefits.subtitle}
              onChange={(e) => onChange({ ...benefits, subtitle: e.target.value })}
              className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
            />
          </div>
        </div>

        {/* 4 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {benefits.items.map((item, idx) => (
            <div key={idx} className="p-5 bg-[#1F1715] border border-stone-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#D4AF37] font-bold">
                  Card #{idx + 1}
                </span>
                <input
                  type="text"
                  value={item.category}
                  onChange={(e) => handleItemChange(idx, "category", e.target.value)}
                  className="bg-[#140F0E] text-[10px] uppercase font-bold text-[#D4AF37] border border-stone-800 rounded-lg px-2.5 py-1 outline-none"
                  placeholder="Category Name"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                  Card Headline
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleItemChange(idx, "title", e.target.value)}
                  className="w-full bg-[#140F0E] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                  Description Paragraph
                </label>
                <textarea
                  rows={3}
                  value={item.desc}
                  onChange={(e) => handleItemChange(idx, "desc", e.target.value)}
                  className="w-full bg-[#140F0E] border border-stone-700 focus:border-[#D4AF37] rounded-xl p-3 text-xs text-stone-300 outline-none resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

