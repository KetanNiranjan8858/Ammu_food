"use client";

import React, { useEffect, useRef } from "react";
import { Sparkles, Heart, Moon, Shield, SunMedium } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ICONS = [Sparkles, Heart, Moon, Shield, SunMedium];

export default function BenefitsSection() {
  const { content } = useSiteContent();
  const benefits = content.benefits;
  const items = benefits.items || [];
  const theme = content.theme || { activeTheme: "heritage" };
  const activeTheme = theme.activeTheme || "heritage";
  const isHeritage = activeTheme === "heritage";
  const isTraditional = activeTheme === "traditional";
  const isProfessional = activeTheme === "professional";

  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
          y: 25,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "all",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className={`py-20 relative overflow-hidden transition-colors duration-500 border-b ${
        isHeritage
          ? "bg-[#FAF7F2] text-[#1E1A18] border-[#EAE2D8]"
          : isTraditional
          ? "bg-[#17060B] border-[#D4AF37]/20 text-white"
          : isProfessional
          ? "bg-[#0C0D0E] border-stone-800 text-white"
          : "bg-[#140F0D] border-[#D4AF37]/15 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest transition ${
              isHeritage
                ? "bg-[#9E2A2B]/10 text-[#9E2A2B] border border-[#9E2A2B]/20"
                : isTraditional
                ? "bg-[#881337]/50 text-[#FDD835]"
                : isProfessional
                ? "bg-[#18191D] text-stone-200"
                : "bg-[#881337]/40 text-[#FDD835]"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isHeritage ? "text-[#9E2A2B]" : isProfessional ? "text-stone-300" : "text-[#D4AF37]"}`} />
            <span>{benefits.badge}</span>
          </div>
          <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
            isHeritage ? "text-[#1E1A18]" : "text-white"
          }`}>
            {benefits.title}
          </h2>
          <p className={`text-sm sm:text-base font-light ${
            isHeritage ? "text-[#61554D]" : "text-stone-300"
          }`}>
            {benefits.subtitle}
          </p>
        </div>

        {/* Benefits Grid: Open Minimalist Column Spread (Heavy Card Boxes Removed) */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {items.map((item, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <div
                key={idx}
                className={`benefit-card group cursor-default pt-4 border-t transition-colors duration-400 space-y-3 ${
                  isHeritage
                    ? "border-stone-300 hover:border-[#9E2A2B]"
                    : "border-white/10 hover:border-[#D4AF37]"
                }`}
              >
                {/* Floating Minimalist Icon & Index Number */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition duration-400 ${
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
                  <span className={`font-mono text-xs transition ${
                    isHeritage ? "text-stone-400 group-hover:text-stone-600" : "text-stone-600 group-hover:text-stone-400"
                  }`}>
                    0{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`font-serif text-lg font-bold transition duration-300 ${
                  isHeritage ? "text-[#1E1A18] group-hover:text-[#9E2A2B]" : "text-white group-hover:text-[#FDD835]"
                }`}>
                  {item.title}
                </h3>

                {/* Description */}
                <p className={`text-xs leading-relaxed transition duration-300 ${
                  isHeritage ? "text-[#61554D] group-hover:text-[#1E1A18]" : "text-stone-400 group-hover:text-stone-300"
                }`}>
                  {item.desc}
                </p>

                {/* Subtle Category Pill */}
                {item.category && (
                  <div className="pt-1">
                    <span className={`text-[10px] font-semibold tracking-wider uppercase ${
                      isHeritage ? "text-[#9E2A2B]" : "text-[#D4AF37]"
                    }`}>
                      {item.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
