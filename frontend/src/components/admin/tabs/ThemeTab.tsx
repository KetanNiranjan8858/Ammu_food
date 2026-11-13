"use client";

import React from "react";
import { ThemeConfig, ThemeMode } from "@/lib/types";
import {
  Palette,
  Sparkles,
  CheckCircle2,
  Sliders,
  Check,
  Sun,
  Crown,
  Briefcase,
  Flame,
  Award,
  Flower2,
} from "lucide-react";

interface ThemeTabProps {
  theme?: ThemeConfig;
  onChange: (updatedTheme: ThemeConfig) => void;
}

const DEFAULT_THEME: ThemeConfig = {
  activeTheme: "traditional",
  showFestiveMandalas: true,
  seasonalGreeting: "Festive Season Authentic Kashmir Harvest • 100% Pure Mongra",
  festivalName: "Festival Special",
};

interface ThemeOption {
  id: ThemeMode;
  name: string;
  tagline: string;
  badge: string;
  seasonRecommendation: string;
  icon: React.ElementType;
  colors: {
    bg: string;
    card: string;
    accent: string;
    highlight: string;
    glow: string;
  };
  features: string[];
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "heritage",
    name: "Heritage Ivory (Baby Saffron Style)",
    tagline: "India's Legacy Saffron House — Pure Cream, Terracotta Red & Editorial Serif Typography",
    badge: "Baby Saffron Iconic Style",
    seasonRecommendation: "Legacy Brand Presence, Luxury Connoisseurs & Year-Round Storefront",
    icon: Crown,
    colors: {
      bg: "#FAF7F2",
      card: "#FFFFFF",
      accent: "#9E2A2B",
      highlight: "#1E1A18",
      glow: "#C86D51",
    },
    features: [
      "Pure warm ivory cream background with warm ambient parchment glow",
      "Editorial serif typography with rich terracotta red italic accents",
      "Centered heritage hero layout inspired by Baby Saffron's legacy storefront",
      "Pill-shaped terracotta call-to-action buttons with soft luxury shadows",
      "Floating trust banner & circular terracotta chat widget",
    ],
  },
  {
    id: "traditional",
    name: "Traditional & Festive",
    tagline: "Heritage Indian Royal Crimson with Sacred Mandalas",
    badge: "Mandalas & Temple Gold",
    seasonRecommendation: "Festivals (Diwali, Eid, Karwa Chauth, Weddings & Special Celebrations)",
    icon: Flower2,
    colors: {
      bg: "#14080B",
      card: "#1F0E12",
      accent: "#D4AF37",
      highlight: "#FDD835",
      glow: "#881337",
    },
    features: [
      "Sacred rotating Mandala & Rangoli watermark background",
      "Ornate golden decorative divider bands with auspicious motifs",
      "Rich royal crimson and temple gold color palette",
      "Celebratory festival special badges on product cards",
    ],
  },
  {
    id: "professional",
    name: "Professional & Sleek",
    tagline: "Simple Minimalist Charcoal & Platinum Silver — Clean & Understated",
    badge: "Simple & Clean Minimalist",
    seasonRecommendation: "B2B Export, Corporate Gifting & Year-Round Connoisseurs",
    icon: Briefcase,
    colors: {
      bg: "#0C0D0E",
      card: "#16171A",
      accent: "#C5A880",
      highlight: "#E5E7EB",
      glow: "#27272A",
    },
    features: [
      "Simple, clean minimalist charcoal and slate palette",
      "Understated warm champagne and platinum silver accents",
      "No loud neon or heavy glows — pure executive simplicity",
      "Crisp typography and calm focus on saffron quality specifications",
    ],
  },
  {
    id: "daily",
    name: "Daily Harvest & Classic",
    tagline: "Warm Roasted Espresso with Authentic Saffron Amber",
    badge: "Natural Daily Wellness",
    seasonRecommendation: "Everyday Regular Browsing, Daily Wellness & Natural Farm Harvest",
    icon: Sun,
    colors: {
      bg: "#120F0D",
      card: "#1A1412",
      accent: "#D4AF37",
      highlight: "#F4A261",
      glow: "#B33010",
    },
    features: [
      "Warm roasted coffee-espresso earth tones",
      "Natural Kashmiri kesar amber and honey golden highlights",
      "Organic soft saffron glow animations",
      "Friendly, approachable everyday health & kitchen atmosphere",
    ],
  },
];

export default function ThemeTab({ theme = DEFAULT_THEME, onChange }: ThemeTabProps) {
  const current = theme || DEFAULT_THEME;
  const activeId = current.activeTheme || "traditional";

  const handleSelectTheme = (mode: ThemeMode) => {
    onChange({
      ...current,
      activeTheme: mode,
    });
  };

  const handleFieldChange = (field: keyof ThemeConfig, val: any) => {
    onChange({
      ...current,
      [field]: val,
    });
  };

  const activeOption = THEME_OPTIONS.find((t) => t.id === activeId) || THEME_OPTIONS[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-stone-800 pb-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#D4AF37]" />
          <span>Seasonal Design &amp; Color Theme Selector</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-1">
          Switch the website design according to the season. Choose between Traditional Festive (with Mandalas), Professional Clean (Minimalist), or Daily Harvest (Warm Saffron).
        </p>
      </div>

      {/* 3 Theme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {THEME_OPTIONS.map((opt) => {
          const isSelected = activeId === opt.id;
          const Icon = opt.icon;

          return (
            <div
              key={opt.id}
              onClick={() => handleSelectTheme(opt.id)}
              className={`rounded-3xl p-6 transition-all duration-300 relative flex flex-col justify-between cursor-pointer border-2 ${
                isSelected
                  ? "border-[#D4AF37] bg-[#1E1513] shadow-[0_0_30px_rgba(212,175,55,0.22)] scale-[1.02]"
                  : "border-stone-800 bg-[#161210] hover:border-stone-700 hover:bg-[#1A1412]"
              }`}
            >
              {/* Active Badge */}
              {isSelected && (
                <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E59819] text-black font-extrabold text-[10px] uppercase tracking-wider shadow-gold-glow flex items-center gap-1">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Active Live Theme</span>
                </div>
              )}

              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md flex-shrink-0"
                    style={{ backgroundColor: opt.colors.glow }}
                  >
                    <Icon className="w-6 h-6 text-[#FDD835]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      {opt.name}
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                      {opt.badge}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  {opt.tagline}
                </p>

                {/* Color Swatches Palette Preview */}
                <div className="p-3 bg-black/40 rounded-2xl border border-stone-800/80 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                    Palette Swatches:
                  </span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-xl border border-stone-700 flex items-center justify-center text-[9px] font-mono text-stone-400"
                      style={{ backgroundColor: opt.colors.bg }}
                      title={`Background: ${opt.colors.bg}`}
                    >
                      BG
                    </div>
                    <div
                      className="w-8 h-8 rounded-xl border border-stone-700 flex items-center justify-center text-[9px] font-mono text-stone-400"
                      style={{ backgroundColor: opt.colors.card }}
                      title={`Cards: ${opt.colors.card}`}
                    >
                      Card
                    </div>
                    <div
                      className="w-8 h-8 rounded-xl border border-stone-700 flex items-center justify-center text-[9px] font-mono text-black font-bold"
                      style={{ backgroundColor: opt.colors.accent }}
                      title={`Gold Accent: ${opt.colors.accent}`}
                    >
                      Gold
                    </div>
                    <div
                      className="w-8 h-8 rounded-xl border border-stone-700 flex items-center justify-center text-[9px] font-mono text-white font-bold"
                      style={{ backgroundColor: opt.colors.glow }}
                      title={`Festive Glow: ${opt.colors.glow}`}
                    >
                      Glow
                    </div>
                  </div>
                </div>

                {/* Season Recommendation */}
                <div className="p-2.5 rounded-xl bg-[#130E0C] border border-stone-800/60 text-[11px] text-stone-300">
                  <span className="font-bold text-[#D4AF37] block text-[10px] uppercase">
                    Best For Season:
                  </span>
                  <p className="text-stone-400 text-xs mt-0.5">{opt.seasonRecommendation}</p>
                </div>

                {/* Feature Bullet Points */}
                <ul className="space-y-1.5 text-xs text-stone-300 pt-1">
                  {opt.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[11px]">
                      <span className="text-[#D4AF37] mt-0.5">&bull;</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-stone-800/80">
                <button
                  type="button"
                  onClick={() => handleSelectTheme(opt.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#E59819] text-black shadow-gold-glow"
                      : "bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-black" />
                      <span>Current Active Theme</span>
                    </>
                  ) : (
                    <>
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Switch to This Theme</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Seasonal Parameters & Announcement Config */}
      <div className="bg-[#1A1412] border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          <div>
            <h3 className="font-serif text-lg font-bold text-white">
              Seasonal Accents &amp; Announcement Settings
            </h3>
            <p className="text-xs text-stone-400">
              Configure greeting texts and mandala ornaments for the currently selected theme.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Festival Name / Season Label */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Seasonal Tag / Badge Label
            </label>
            <input
              type="text"
              value={current.festivalName || "Festival Special"}
              onChange={(e) => handleFieldChange("festivalName", e.target.value)}
              placeholder="e.g. Festival Special / Diwali Utsav / Wedding Collection / Daily Reserve"
              className="w-full bg-[#14100E] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
            />
          </div>

          {/* Seasonal Greeting Text */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Top Announcement / Seasonal Greeting
            </label>
            <input
              type="text"
              value={current.seasonalGreeting || ""}
              onChange={(e) => handleFieldChange("seasonalGreeting", e.target.value)}
              placeholder="e.g. ✨ Festive Season Offer: Free Silver Saffron Spoon with 2g+ Orders!"
              className="w-full bg-[#14100E] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
            />
          </div>

          {/* Mandalas Toggle (Active in Traditional Mode) */}
          <div className="md:col-span-2 p-4 bg-[#140F0E] border border-stone-800 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#881337] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                <Flower2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  Display Authentic Indian Mandalas &amp; Festive Rangoli Watermarks
                </p>
                <p className="text-[11px] text-stone-400">
                  When enabled and Traditional theme is active, background mandalas gently rotate in the Hero and Why AMMu sections.
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input
                type="checkbox"
                checked={current.showFestiveMandalas !== false}
                onChange={(e) => handleFieldChange("showFestiveMandalas", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

