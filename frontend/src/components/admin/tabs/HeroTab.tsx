"use client";

import React from "react";
import { HeroConfig } from "@/lib/types";
import { Sparkles, ShoppingCart, Image as ImageIcon, Plus, Trash2 } from "lucide-react";

interface HeroTabProps {
  hero: HeroConfig;
  onChange: (field: keyof HeroConfig, value: any) => void;
}

export default function HeroTab({ hero, onChange }: HeroTabProps) {
  const handleKeyPointChange = (index: number, val: string) => {
    const updated = [...(hero.keyPoints || [])];
    updated[index] = val;
    onChange("keyPoints", updated);
  };

  const addKeyPoint = () => {
    onChange("keyPoints", [...(hero.keyPoints || []), "New Benefit Feature"]);
  };

  const removeKeyPoint = (index: number) => {
    const updated = (hero.keyPoints || []).filter((_, idx) => idx !== index);
    onChange("keyPoints", updated);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-800 pb-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          <span>Hero Section & Featured Marketplace Deal</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-1">
          Customize the main landing headlines, current promotional offer, deal pricing, and direct store links.
        </p>
      </div>

      <div className="space-y-5">
        {/* Top Announcement Badge */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Top Banner Badge
          </label>
          <input
            type="text"
            value={hero.badge}
            onChange={(e) => onChange("badge", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
            placeholder="100% Pure Saffron • FSSAI Lic. 22720559000206"
          />
        </div>

        {/* Main Headline & Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Main Headline (First Line)
            </label>
            <input
              type="text"
              value={hero.title}
              onChange={(e) => onChange("title", e.target.value)}
              className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
              placeholder="Pure Kashmiri Kesar"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Highlighted Title (Gold Gradient)
            </label>
            <input
              type="text"
              value={hero.titleHighlight}
              onChange={(e) => onChange("titleHighlight", e.target.value)}
              className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-[#FDD835] font-bold outline-none transition"
              placeholder="Grade A++ Saffron Threads"
            />
          </div>
        </div>

        {/* Subtitle / Description */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Hero Introduction Paragraph
          </label>
          <textarea
            rows={3}
            value={hero.description}
            onChange={(e) => onChange("description", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl p-4 text-sm text-white outline-none transition"
            placeholder="Describe origin, quality, and purity..."
          />
        </div>

        {/* Featured Deal Card Box */}
        <div className="p-6 bg-[#201715] border border-[#D4AF37]/30 rounded-2xl space-y-4">
          <h3 className="font-serif text-base font-bold text-[#FDD835] flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            <span>Featured Live Deal Settings (Hero Spotlight Card)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Deal Badge Tag
              </label>
              <input
                type="text"
                value={hero.dealBadge}
                onChange={(e) => onChange("dealBadge", e.target.value)}
                className="w-full bg-[#16110F] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Product Title
              </label>
              <input
                type="text"
                value={hero.dealTitle}
                onChange={(e) => onChange("dealTitle", e.target.value)}
                className="w-full bg-[#16110F] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Deal Price (₹)
              </label>
              <input
                type="number"
                value={hero.dealPrice}
                onChange={(e) => onChange("dealPrice", Number(e.target.value))}
                className="w-full bg-[#16110F] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs font-bold text-[#FDD835] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Original MRP (₹)
              </label>
              <input
                type="number"
                value={hero.dealOriginalPrice}
                onChange={(e) => onChange("dealOriginalPrice", Number(e.target.value))}
                className="w-full bg-[#16110F] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-stone-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Hero Product Image Path
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={hero.heroImage || "/images/ammu-gold-tin.webp"}
                onChange={(e) => onChange("heroImage", e.target.value)}
                className="w-full bg-[#16110F] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-stone-200 outline-none"
              />
              <img
                src={hero.heroImage || "/images/ammu-gold-tin.webp"}
                alt="Preview"
                className="w-10 h-10 object-contain rounded-lg border border-stone-700 bg-black/40 flex-shrink-0"
              />
            </div>
          </div>
        </div>

        {/* Marketplace Direct Buy Links */}
        <div className="space-y-4 pt-2">
          <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
            Direct Marketplace Purchase URLs (Hero Section)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#FF69B4] mb-1.5">
                Meesho Product URL
              </label>
              <input
                type="text"
                value={hero.meeshoLink || ""}
                onChange={(e) => onChange("meeshoLink", e.target.value)}
                className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#FF69B4] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                placeholder="https://www.meesho.com/..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#FF9900] mb-1.5">
                Amazon Product URL
              </label>
              <input
                type="text"
                value={hero.amazonLink || ""}
                onChange={(e) => onChange("amazonLink", e.target.value)}
                className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#FF9900] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                placeholder="https://www.amazon.in/..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2874F0] mb-1.5">
                Flipkart Product URL
              </label>
              <input
                type="text"
                value={hero.flipkartLink || ""}
                onChange={(e) => onChange("flipkartLink", e.target.value)}
                className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#2874F0] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                placeholder="https://www.flipkart.com/..."
              />
            </div>
          </div>
        </div>

        {/* Key Highlights Bullets */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-stone-300">
              Hero Key Highlight Bullets
            </label>
            <button
              onClick={addKeyPoint}
              className="text-xs text-[#D4AF37] hover:text-[#FDD835] flex items-center gap-1 font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Bullet</span>
            </button>
          </div>

          <div className="space-y-2">
            {(hero.keyPoints || []).map((pt, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={pt}
                  onChange={(e) => handleKeyPointChange(idx, e.target.value)}
                  className="flex-1 bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                />
                <button
                  onClick={() => removeKeyPoint(idx)}
                  className="p-2 text-stone-500 hover:text-rose-400 rounded-lg hover:bg-rose-950/30 transition"
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

