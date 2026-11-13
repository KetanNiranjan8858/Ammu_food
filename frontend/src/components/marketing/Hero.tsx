"use client";

import React from "react";
import { Sparkles, CheckCircle2, Award, ExternalLink, ArrowRight, Mail, ArrowDown } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import { MandalaSvg } from "./FestiveMandalaDecor";

export default function Hero() {
  const { content } = useSiteContent();
  const hero = content.hero;
  const company = content.company;
  const theme = content.theme || { activeTheme: "traditional", showFestiveMandalas: true };
  const activeTheme = theme.activeTheme || "traditional";
  const isTraditional = activeTheme === "traditional";
  const isProfessional = activeTheme === "professional";
  const showMandalas = theme.showFestiveMandalas !== false;
  const festivalName = theme.festivalName || "Festival Special";

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
      {/* 1. TRADITIONAL FESTIVAL SPECIAL BACKGROUND (Sacred Rotating Mandalas in Hero Section) */}
      {isTraditional && showMandalas && (
        <>
          {/* Large Majestic Golden Mandala Behind Right Product Showcase */}
          <div className="absolute right-[-80px] lg:right-[-20px] top-1/2 -translate-y-1/2 w-[520px] h-[520px] sm:w-[640px] sm:h-[640px] text-[#D4AF37] pointer-events-none animate-spin-slow opacity-25 z-0 select-none">
            <MandalaSvg className="w-full h-full" opacity={1} />
          </div>

          {/* Top-Left Counter-Rotating Sacred Mandala Behind Headline */}
          <div className="absolute -top-24 -left-24 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] text-[#FDD835] pointer-events-none animate-spin-reverse-slow opacity-20 z-0 select-none">
            <MandalaSvg className="w-full h-full" opacity={1} />
          </div>

          {/* Center-Bottom Auspicious Sacred Mandala Watermark */}
          <div className="absolute -bottom-36 left-1/2 -translate-x-1/2 w-[400px] h-[400px] text-[#D4AF37] pointer-events-none opacity-15 z-0 select-none">
            <MandalaSvg className="w-full h-full" opacity={1} />
          </div>
        </>
      )}

      {/* 2. AMBIENT GLOW SYSTEM */}
      {isTraditional ? (
        <>
          {/* Royal Crimson & Deep Festive Halo */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#881337]/50 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
          {/* Temple Gold Auspicious Glow */}
          <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#D4AF37]/30 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-[#14080B] to-transparent pointer-events-none" />
        </>
      ) : isProfessional ? (
        <>
          {/* Simple Clean Understated Ambient Light (Zero Neon / Simple Minimalist) */}
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#C5A880]/[0.04] rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-[#0C0D0E] to-transparent pointer-events-none" />
        </>
      ) : (
        <>
          {/* Daily Classic Warm Earth & Saffron Glow */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#881337]/30 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
          <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-[#120F0D] to-transparent pointer-events-none" />
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

            {/* Price Highlight Banner with card hover effect */}
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

            {/* Key Value Points with hover lift */}
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

            {/* Marketplace Buy Strip with Tactile Hover */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                Instant Online Orders:
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                {hero.meeshoLink && (
                  <a
                    href={hero.meeshoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="meesho-hover-btn px-4 py-2.5 rounded-xl bg-[#591438] border border-[#ff69b4]/40 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <span className="text-[#FF69B4] font-extrabold">Meesho</span>
                    <span>Order ₹{hero.dealPrice}</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                )}

                {hero.amazonLink && (
                  <a
                    href={hero.amazonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="amazon-hover-btn px-4 py-2.5 rounded-xl bg-[#232F3E] border border-[#FF9900]/40 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <span className="text-[#FF9900] font-extrabold">Amazon</span>
                    <span>Shop</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                )}

                {hero.flipkartLink && (
                  <a
                    href={hero.flipkartLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flipkart-hover-btn px-4 py-2.5 rounded-xl bg-[#1A3B70] border border-[#2874F0]/40 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <span className="text-[#FFE500] font-extrabold">Flipkart</span>
                    <span>Explore</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                )}
              </div>
            </div>

            {/* Direct Action Buttons with Scale & Glow */}
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
                <ArrowDown className={`w-3.5 h-3.5 ${isProfessional ? "text-stone-300" : "text-[#D4AF37]"}`} />
              </a>
            </div>

          </div>

          {/* Right Column: Hero Real Product Photo Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              <div
                className={`absolute -inset-2 rounded-3xl blur-xl ${
                  isTraditional
                    ? "bg-gradient-to-r from-[#D4AF37] via-[#881337] to-[#FDD835] opacity-35 animate-pulse-slow"
                    : isProfessional
                    ? "bg-white/[0.04]"
                    : "bg-gradient-to-r from-[#D4AF37] via-[#B33010] to-[#E59819] opacity-20 animate-pulse-slow"
                }`}
              />

              <div
                className={`relative rounded-3xl p-6 backdrop-blur-xl card-hover-effect transition duration-300 ${
                  isTraditional
                    ? "bg-[#1E0C11] border-2 border-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.22)]"
                    : isProfessional
                    ? "bg-[#16171A] border border-stone-700 shadow-xl"
                    : "bg-[#1A1513] border-2 border-[#D4AF37] shadow-2xl"
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-1.5">
                    <Award className={`w-4 h-4 ${isProfessional ? "text-stone-300" : "text-[#D4AF37]"}`} />
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        isProfessional ? "text-stone-200" : "text-[#D4AF37]"
                      }`}
                    >
                      Original Packaging
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-400">
                    FSSAI: {company.fssaiLicense}
                  </span>
                </div>

                {/* Real Product Image Showcase (Clean Floating Display) */}
                <div className="my-3 relative flex flex-col items-center justify-center group">
                  <img
                    src={hero.heroImage || "/images/ammu-gold-tin.webp"}
                    alt={hero.dealTitle}
                    className="max-h-64 w-auto object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.7)] rounded-xl group-hover:scale-105 transition duration-500 ease-out"
                  />
                  <div
                    className={`mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs transition ${
                      isProfessional
                        ? "bg-[#16171A] text-stone-300"
                        : "bg-[#14100E] text-stone-200"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-medium">
                      {hero.dealTitle} &bull; Rich Red Stigmas
                    </span>
                  </div>
                </div>

                {/* Quick Spec Matrix: Clean Horizontal Flow (Boxes Removed) */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs py-2.5 border-t border-white/10">
                  <div>
                    <p className="text-[10px] text-stone-400 uppercase tracking-wider">Grade</p>
                    <p className={`font-bold text-xs mt-0.5 ${isProfessional ? "text-stone-200" : "text-[#D4AF37]"}`}>
                      A++ Kashmiri
                    </p>
                  </div>
                  <div className="border-x border-white/10">
                    <p className="text-[10px] text-stone-400 uppercase tracking-wider">Origin</p>
                    <p className="font-bold text-stone-200 text-xs mt-0.5">Kashmir</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-stone-400 uppercase tracking-wider">Deal Price</p>
                    <p className={`font-bold text-xs mt-0.5 ${isProfessional ? "text-white" : "text-[#FDD835]"}`}>
                      ₹{hero.dealPrice}
                    </p>
                  </div>
                </div>

                {/* Scroll to Single Inquiry Section */}
                <a
                  href="#inquiry"
                  className={`mt-3 w-full py-3 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition duration-200 ${
                    isProfessional
                      ? "bg-[#27272A] hover:bg-[#323238] text-stone-100 border border-stone-600"
                      : "gold-btn-hover bg-[#881337] hover:bg-[#9E1B32] text-white border border-[#D4AF37]/40 hover:border-[#D4AF37]"
                  }`}
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isProfessional ? "text-stone-300" : "text-[#D4AF37]"}`} />
                  Contact Founder & Sourcing Desk
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
