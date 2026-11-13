"use client";

import React from "react";
import { ShieldCheck, Award, SunMedium, Sparkles, Truck } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

const ICONS = [Award, Sparkles, SunMedium, ShieldCheck, Truck];

export default function TrustBadges() {
  const { content } = useSiteContent();
  const badges = content.trustBadges || [];
  const theme = content.theme || { activeTheme: "heritage" };
  const activeTheme = theme.activeTheme || "heritage";
  const isHeritage = activeTheme === "heritage";
  const isTraditional = activeTheme === "traditional";
  const isProfessional = activeTheme === "professional";

  return (
    <section
      className={`py-6 sm:py-8 relative z-10 transition-colors duration-500 border-b border-t ${
        isHeritage
          ? "bg-[#F3ECE1] border-[#E8DFD3] text-[#1E1A18]"
          : isTraditional
          ? "bg-[#16060B]/90 border-[#D4AF37]/20 text-white"
          : isProfessional
          ? "bg-[#0B0C0E] border-stone-800/80 text-white"
          : "bg-[#140F0D]/90 border-[#D4AF37]/15 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Open, borderless horizontal flow — no individual box containers */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center">
          {badges.map((b, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <div
                key={idx}
                className="flex items-center gap-3 group cursor-default transition-transform duration-300 hover:translate-y-[-2px]"
              >
                {/* Minimalist Floating Icon (No heavy box) */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isHeritage
                      ? "bg-[#9E2A2B]/10 text-[#9E2A2B] group-hover:bg-[#9E2A2B] group-hover:text-white"
                      : isTraditional
                      ? "bg-[#881337]/40 text-[#FDD835] group-hover:bg-[#881337] group-hover:text-white"
                      : isProfessional
                      ? "bg-stone-800/60 text-stone-200 group-hover:bg-stone-700"
                      : "bg-[#881337]/30 text-[#D4AF37] group-hover:bg-[#881337] group-hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <h4
                    className={`text-xs font-bold transition duration-300 leading-tight ${
                      isHeritage
                        ? "text-[#1E1A18] group-hover:text-[#9E2A2B]"
                        : isProfessional
                        ? "text-stone-100 group-hover:text-white"
                        : "text-stone-100 group-hover:text-[#FDD835]"
                    }`}
                  >
                    {b.title}
                  </h4>
                  <p className={`text-[11px] leading-tight mt-0.5 transition duration-300 ${
                    isHeritage ? "text-[#6B6158]" : "text-stone-400 group-hover:text-stone-300"
                  }`}>
                    {b.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
