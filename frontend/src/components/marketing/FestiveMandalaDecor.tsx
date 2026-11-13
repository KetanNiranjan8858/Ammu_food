"use client";

import React from "react";
import { useSiteContent } from "@/context/SiteContentContext";

// Symmetrical Sacred Mandala SVG Vector with Lotus Petals, Sunburst & Concentric Geometry
export function MandalaSvg({ className = "w-64 h-64", opacity = 0.15 }: { className?: string; opacity?: number }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={{ opacity }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="1">
        {/* Outer Ring */}
        <circle cx="100" cy="100" r="95" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="90" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="82" strokeWidth="0.5" />

        {/* 16 Radial Petals */}
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 100 100)`}>
            {/* Outer Diamond */}
            <path d="M100 10 L106 28 L100 40 L94 28 Z" fill="currentColor" fillOpacity="0.08" />
            <circle cx="100" cy="16" r="2" fill="currentColor" />
            {/* Mid Arch */}
            <path d="M100 40 C110 52 110 68 100 80 C90 68 90 52 100 40 Z" fill="currentColor" fillOpacity="0.05" />
          </g>
        ))}

        {/* Mid Concentric Rings */}
        <circle cx="100" cy="100" r="62" strokeWidth="1" />
        <circle cx="100" cy="100" r="54" strokeWidth="0.6" strokeDasharray="2 2" />
        <circle cx="100" cy="100" r="42" strokeWidth="0.8" />

        {/* Inner 8 Lotus Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 100 100)`}>
            <path d="M100 58 C108 72 108 85 100 95 C92 85 92 72 100 58 Z" fill="currentColor" fillOpacity="0.12" />
            <circle cx="100" cy="68" r="1.5" fill="currentColor" />
          </g>
        ))}

        {/* Inner Core Bindu & Concentric Rings */}
        <circle cx="100" cy="100" r="28" strokeWidth="1" />
        <circle cx="100" cy="100" r="18" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="8" fill="currentColor" fillOpacity="0.25" strokeWidth="1.2" />
        <circle cx="100" cy="100" r="3" fill="currentColor" />
      </g>
    </svg>
  );
}

// Ornate Festive Divider Band with Center Lotus Mandala
export function FestiveDivider() {
  const { content } = useSiteContent();
  const theme = content.theme?.activeTheme || "traditional";
  if (theme !== "traditional") return null;

  return (
    <div className="w-full flex items-center justify-center my-6 gap-3 pointer-events-none select-none text-[#D4AF37]">
      <div className="h-[1px] flex-1 max-w-xs bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
      <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1F0E12] border border-[#D4AF37]/40 rounded-full shadow-gold-glow">
        <span className="text-xs">✦</span>
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#FDD835]">
          {content.theme?.festivalName || "Shubh Utsav Special"}
        </span>
        <span className="text-xs">✦</span>
      </div>
      <div className="h-[1px] flex-1 max-w-xs bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
    </div>
  );
}

// Festive Mandala Decorator Component
export default function FestiveMandalaDecor() {
  const { content } = useSiteContent();
  const themeConfig = content.theme || { activeTheme: "traditional", showFestiveMandalas: true };

  // Only render mandalas when traditional festive mode is active
  if (themeConfig.activeTheme !== "traditional" || !themeConfig.showFestiveMandalas) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none">
      {/* Top Left Corner Rotating Mandala */}
      <div className="absolute -top-32 -left-32 text-[#D4AF37] animate-spin-slow">
        <MandalaSvg className="w-96 h-96 sm:w-[500px] sm:h-[500px]" opacity={0.16} />
      </div>

      {/* Top Right Corner Counter-Rotating Mandala */}
      <div className="absolute -top-24 -right-24 text-[#FDD835] animate-spin-reverse-slow">
        <MandalaSvg className="w-80 h-80 sm:w-[420px] sm:h-[420px]" opacity={0.12} />
      </div>

      {/* Floating Center Subtle Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#D4AF37] animate-spin-slow">
        <MandalaSvg className="w-[650px] h-[650px] sm:w-[850px] sm:h-[850px]" opacity={0.06} />
      </div>

      {/* Bottom Corner Ornaments */}
      <div className="absolute -bottom-36 -right-36 text-[#D4AF37] animate-spin-reverse-slow">
        <MandalaSvg className="w-96 h-96 sm:w-[480px] sm:h-[480px]" opacity={0.14} />
      </div>
    </div>
  );
}

