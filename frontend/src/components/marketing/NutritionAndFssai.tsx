"use client";

import React, { useEffect, useRef } from "react";
import { ShieldCheck, Check } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function NutritionAndFssai() {
  const { content } = useSiteContent();
  const nutrition = content.nutrition;
  const company = content.company;
  const theme = content.theme || { activeTheme: "heritage" };
  const activeTheme = theme.activeTheme || "heritage";
  const isHeritage = activeTheme === "heritage";
  const isTraditional = activeTheme === "traditional";
  const isProfessional = activeTheme === "professional";

  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        gsap.from(leftColRef.current, {
          scrollTrigger: {
            trigger: leftColRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          x: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (rightColRef.current) {
        gsap.from(rightColRef.current, {
          scrollTrigger: {
            trigger: rightColRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          x: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="nutrition"
      ref={sectionRef}
      className={`py-20 relative overflow-hidden transition-colors duration-500 border-b ${
        isHeritage
          ? "bg-[#FAF7F2] text-[#1E1A18] border-[#EAE2D8]"
          : isTraditional
          ? "bg-[#16070B] border-[#D4AF37]/20 text-white"
          : isProfessional
          ? "bg-[#0C0D0E] border-stone-800 text-white"
          : "bg-[#140F0D] border-[#D4AF37]/15 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
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
            <ShieldCheck className={`w-3.5 h-3.5 ${isHeritage ? "text-[#9E2A2B]" : isProfessional ? "text-stone-300" : "text-[#D4AF37]"}`} />
            <span>{nutrition.badge}</span>
          </div>
          <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
            isHeritage ? "text-[#1E1A18]" : "text-white"
          }`}>
            {nutrition.title}
          </h2>
          <p className={`text-sm sm:text-base font-light ${
            isHeritage ? "text-[#61554D]" : "text-stone-300"
          }`}>
            {nutrition.description}
          </p>
        </div>

        {/* Content Layout: Open Editorial Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
          
          {/* Left: Product Pack Label Image */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group">
              <img
                src="/images/ammu-nutrition-facts.webp"
                alt="Ammu Saffron Nutrition Facts & FSSAI License"
                className="rounded-2xl max-h-[380px] w-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)] group-hover:scale-[1.02] transition duration-500"
              />
              <div className="mt-3 text-center">
                <span className={`text-[11px] font-mono ${isHeritage ? "text-[#7A6E65]" : "text-stone-400"}`}>
                  {nutrition.labelNote || `Official Pack Label • FSSAI Lic. ${company.fssaiLicense}`}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Key Facts Breakdown */}
          <div ref={rightColRef} className="lg:col-span-7 space-y-7">
            <div className="space-y-2">
              <span className={`text-xs font-bold uppercase tracking-widest ${
                isHeritage ? "text-[#9E2A2B]" : "text-[#D4AF37]"
              }`}>
                Zero-Additive Guarantee
              </span>
              <h3 className={`font-serif text-2xl sm:text-3xl font-bold ${
                isHeritage ? "text-[#1E1A18]" : "text-white"
              }`}>
                {nutrition.guaranteeTitle}
              </h3>
              <p className={`text-xs sm:text-sm font-light leading-relaxed ${
                isHeritage ? "text-[#61554D]" : "text-stone-300"
              }`}>
                {nutrition.guaranteeText}
              </p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {nutrition.checklist.map((item, idx) => (
                <div key={idx} className={`flex items-center gap-2.5 py-1 ${
                  isHeritage ? "text-[#3D342F]" : "text-stone-200"
                }`}>
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Packaging & Origin Matrix */}
            <div className={`pt-4 border-t space-y-3 ${
              isHeritage ? "border-stone-300/80" : "border-white/10"
            }`}>
              <div className={`flex justify-between items-center text-xs pb-2 border-b ${
                isHeritage ? "border-stone-200" : "border-white/5"
              }`}>
                <span className={isHeritage ? "text-[#7A6E65]" : "text-stone-400"}>FSSAI License No.</span>
                <span className={`font-mono font-bold ${isHeritage ? "text-[#9E2A2B]" : "text-[#FDD835]"}`}>{company.fssaiLicense}</span>
              </div>
              <div className={`flex justify-between items-center text-xs pb-2 border-b ${
                isHeritage ? "border-stone-200" : "border-white/5"
              }`}>
                <span className={isHeritage ? "text-[#7A6E65]" : "text-stone-400"}>Origin</span>
                <span className={`font-bold ${isHeritage ? "text-[#1E1A18]" : "text-white"}`}>Grown & Harvested in Kashmir, India</span>
              </div>
              <div className={`flex justify-between items-center text-xs pb-2 border-b ${
                isHeritage ? "border-stone-200" : "border-white/5"
              }`}>
                <span className={isHeritage ? "text-[#7A6E65]" : "text-stone-400"}>Packaged By</span>
                <span className={`font-bold ${isHeritage ? "text-[#3D342F]" : "text-stone-200"}`}>{company.manufacturer}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className={isHeritage ? "text-[#7A6E65]" : "text-stone-400"}>Facility Address</span>
                <span className={`font-bold text-[11px] text-right max-w-xs ${isHeritage ? "text-[#4A4039]" : "text-stone-300"}`}>{company.address}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
