"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, Award, ExternalLink, ArrowRight, Mail, ArrowDown, ShieldCheck } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import { MandalaSvg } from "./FestiveMandalaDecor";

export default function Hero() {
  const { content } = useSiteContent();
  const hero = content.hero;
  const company = content.company;
  const theme = content.theme || { activeTheme: "heritage", showFestiveMandalas: false };
  const activeTheme = theme.activeTheme || "heritage";
  const isHeritage = activeTheme === "heritage";
  const isTraditional = activeTheme === "traditional";
  const isProfessional = activeTheme === "professional";
  const showMandalas = theme.showFestiveMandalas !== false;
  const festivalName = theme.festivalName || "Festival Special";

  const [cookieBannerOpen, setCookieBannerOpen] = useState(true);

  // =========================================================================
  // HERITAGE IVORY (BABY SAFFRON STYLE) HERO
  // Centered editorial luxury typography, ivory parchment, terracotta accents
  // =========================================================================
  if (isHeritage) {
    return (
      <section className="relative overflow-hidden bg-[#FAF7F2] text-[#1E1A18] pt-14 pb-20 sm:pt-20 sm:pb-28 transition-colors duration-500">
        {/* Soft Ambient Warm Parchment Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-[#F2EAE0]/70 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#C86D51]/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Eyebrow Tag: INDIA'S LEGACY SAFFRON HOUSE */}
          <div className="mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#9E2A2B]">
              INDIA&apos;S LEGACY SAFFRON HOUSE
            </span>
          </div>

          {/* Main Headline: The Saffron India has trusted since harvest */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1E1A18] leading-[1.12] max-w-4xl mx-auto">
            The Saffron India has{" "}
            <span className="block mt-1 sm:mt-2 font-serif italic font-normal text-[#9E2A2B]">
              trusted for generations.
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="mt-6 sm:mt-8 text-[#5C544E] text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            AMMu Saffron is India&apos;s legacy saffron house — ISO 3632 Grade A++ Kashmiri Mongra kesar, hand-graded and sealed for pure aroma, rich color and authentic health.
          </p>

          {/* Primary Action: SHOP PURE SAFFRON Button */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#products"
              className="px-9 py-4 rounded-full bg-[#9E2A2B] hover:bg-[#852324] text-white text-xs sm:text-sm font-bold uppercase tracking-widest shadow-[0_8px_25px_rgba(158,42,43,0.28)] hover:shadow-[0_12px_32px_rgba(158,42,43,0.38)] hover:-translate-y-0.5 transition duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>SHOP PURE SAFFRON</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#purity-test"
              className="px-7 py-4 rounded-full bg-white hover:bg-stone-50 text-[#1E1A18] border border-[#E0D5C7] text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-sm hover:-translate-y-0.5 transition duration-300 flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#9E2A2B]" />
              <span>Verify Purity Test</span>
            </a>
          </div>

          {/* Marketplace Badges Strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-[#6B6158]">
            <span className="font-medium">Order instantly on:</span>
            <div className="flex items-center gap-2.5 font-bold">
              <a
                href={hero.meeshoLink || "https://www.meesho.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF69B4] hover:underline"
              >
                Meesho
              </a>
              <span>•</span>
              <a
                href={hero.amazonLink || "https://www.amazon.in"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D97706] hover:underline"
              >
                Amazon
              </a>
              <span>•</span>
              <a
                href={hero.flipkartLink || "https://www.flipkart.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563EB] hover:underline"
              >
                Flipkart
              </a>
            </div>
            <span>•</span>
            <span className="text-[#9E2A2B] font-semibold">FSSAI Lic. {company.fssaiLicense}</span>
          </div>

          {/* Bottom Floating Cookie / Trust Banner (Matches Baby Saffron Screenshot) */}
          {cookieBannerOpen && (
            <div className="mt-14 sm:mt-20 max-w-2xl mx-auto bg-white/95 backdrop-blur-sm border border-[#EAE3D9] rounded-2xl p-4 sm:p-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row items-center justify-between gap-4 text-left animate-fadeIn">
              <div className="space-y-1">
                <p className="font-serif font-bold text-sm text-[#1E1A18]">
                  Help us improve AMMu Saffron
                </p>
                <p className="text-xs text-[#6B6158] leading-relaxed">
                  We verify authentic Grade A++ Kashmiri Mongra kesar with ISO 3632 lab certification. Direct from Kashmir valley farms.
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setCookieBannerOpen(false)}
                  className="px-6 py-2 rounded-full bg-[#9E2A2B] hover:bg-[#852324] text-white text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => setCookieBannerOpen(false)}
                  className="px-5 py-2 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 text-xs font-medium transition cursor-pointer"
                >
                  Decline
                </button>
              </div>
            </div>
          )}

        </div>
      </section>
    );
  }

  // =========================================================================
  // TRADITIONAL / PROFESSIONAL / DAILY THEMES
  // =========================================================================
  return (
    <section
      className={`relative overflow-hidden text-white pt-12 pb-20 lg:pt-16 lg:pb-28 transition-colors duration-500 ${
        isTraditional
          ? "bg-gradient-to-b from-[#1C060D] via-[#2A0A14] to-[#14080B] border-b border-[#D4AF37]/35 shadow-[inset_0_0_90px_rgba(136,19,55,0.3)]"
          : isProfessional
          ? "bg-gradient-to-b from-[#101114] via-[#141518] to-[#0C0D0E] border-b border-stone-800"
          : "bg-gradient-to-b from-[#16110F] via-[#1E1714] to-[#120F0D] border-b border-[#D4AF37]/20"
      }`}
    >
      {/* Sacred Rotating Mandalas in Hero Section */}
      {isTraditional && showMandalas && (
        <>
          <div className="absolute right-[-80px] lg:right-[-20px] top-1/2 -translate-y-1/2 w-[520px] h-[520px] sm:w-[640px] sm:h-[640px] text-[#D4AF37] pointer-events-none animate-spin-slow opacity-25 z-0 select-none">
            <MandalaSvg className="w-full h-full" opacity={1} />
          </div>
          <div className="absolute -top-24 -left-24 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] text-[#FDD835] pointer-events-none animate-spin-reverse-slow opacity-20 z-0 select-none">
            <MandalaSvg className="w-full h-full" opacity={1} />
          </div>
        </>
      )}

      {/* Ambient Glow */}
      {isTraditional ? (
        <>
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#881337]/50 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
          <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#D4AF37]/30 rounded-full blur-[140px] pointer-events-none" />
        </>
      ) : isProfessional ? (
        <>
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#C5A880]/[0.04] rounded-full blur-[130px] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#881337]/30 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-[140px] pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest transition duration-200 cursor-default ${
                isTraditional
                  ? "bg-[#3B151E] border border-[#D4AF37]/50 text-[#FDD835] shadow-crimson-glow animate-badge"
                  : isProfessional
                  ? "bg-[#18191D] border border-stone-700/80 text-stone-200 shadow-sm"
                  : "bg-[#3B151E] border border-[#D4AF37]/40 text-[#FDD835] shadow-crimson-glow animate-badge"
              }`}
            >
              <Sparkles className={`w-4 h-4 ${isProfessional ? "text-stone-300" : "text-[#D4AF37]"}`} />
              <span>
                {isTraditional
                  ? `✦ ${festivalName} • ${hero.badge} ✦`
                  : hero.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              {hero.title}{" "}
              <span
                className={`block mt-1 transition duration-300 ${
                  isProfessional
                    ? "text-[#E5E7EB] hover:text-white"
                    : "gold-gradient-text hover:brightness-125"
                }`}
              >
                {hero.titleHighlight}
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              {hero.description}
            </p>

            {/* Price Highlight Banner */}
            <div
              className={`p-4 sm:p-5 rounded-2xl max-w-xl mx-auto lg:mx-0 card-hover-effect transition duration-300 ${
                isTraditional
                  ? "bg-gradient-to-r from-[#2F0B13] via-[#44111D] to-[#2F0B13] border border-[#D4AF37]/55 shadow-[0_0_30px_rgba(212,175,55,0.18)]"
                  : isProfessional
                  ? "bg-[#16171B] border border-stone-700/80 shadow-md"
                  : "bg-gradient-to-r from-[#2A1619] via-[#3D1A1F] to-[#2A1619] border border-[#D4AF37]/40 shadow-xl"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        isProfessional ? "text-stone-300" : "text-[#D4AF37]"
                      }`}
                    >
                      {hero.dealBadge}
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-bold">
                      IN STOCK
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-white mt-0.5">
                    {hero.dealTitle}
                  </h3>
                  <p className="text-xs text-stone-400">
                    {hero.dealSubtitle}
                  </p>
                </div>
                <div className="text-center sm:text-right">
                  <div className="flex items-baseline gap-2 justify-center sm:justify-end">
                    <span
                      className={`text-3xl font-extrabold font-serif ${
                        isProfessional ? "text-white" : "text-[#FDD835]"
                      }`}
                    >
                      ₹{hero.dealPrice}
                    </span>
                    <span className="text-sm line-through text-stone-500">₹{hero.dealOriginalPrice}</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold">{hero.dealDiscount}</span>
                </div>
              </div>
            </div>

            {/* Key Value Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-stone-300">
              {hero.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2 p-1 rounded-lg hover:bg-stone-800/40 hover:text-white transition duration-200">
                  <CheckCircle2
                    className={`w-4 h-4 flex-shrink-0 ${
                      isProfessional ? "text-stone-300" : "text-[#D4AF37]"
                    }`}
                  />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <a
                href="#products"
                className={`w-full sm:w-auto px-7 py-3.5 font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer transition duration-300 ${
                  isProfessional
                    ? "bg-[#E5E7EB] hover:bg-white text-stone-900 shadow-md border border-stone-300"
                    : "gold-btn-hover bg-gradient-to-r from-[#D4AF37] via-[#F4A261] to-[#E59819] text-black shadow-gold-glow shimmer-effect"
                }`}
              >
                <span>Explore Saffron Collection</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#inquiry"
                className={`hover-lift w-full sm:w-auto px-6 py-3.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg transition duration-200 ${
                  isProfessional
                    ? "text-stone-200 bg-[#16171B] hover:bg-[#1E1F24] border border-stone-700 hover:border-stone-500"
                    : isTraditional
                    ? "text-white bg-[#260C13] hover:bg-[#34111A] border border-[#D4AF37]/50 hover:border-[#D4AF37]"
                    : "text-white bg-[#221715] hover:bg-[#2A1D1A] border border-[#D4AF37]/50 hover:border-[#D4AF37]"
                }`}
              >
                <Mail className={`w-4 h-4 ${isProfessional ? "text-stone-300" : "text-[#D4AF37]"}`} />
                <span>Go to Inquiry Desk</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden bg-black/40 border border-white/10 p-4 shadow-2xl">
              <img
                src={hero.heroImage || "/images/ammu-gold-tin.webp"}
                alt="AMMu Kashmiri Saffron"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
