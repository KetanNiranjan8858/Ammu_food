"use client";

import React, { useEffect, useRef } from "react";
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WhyAmmu() {
  const { content } = useSiteContent();
  const whyAmmu = content.whyAmmu;
  const theme = content.theme || { activeTheme: "traditional" };
  const activeTheme = theme.activeTheme || "traditional";
  const isTraditional = activeTheme === "traditional";
  const isProfessional = activeTheme === "professional";

  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (leftCardRef.current) {
        gsap.from(leftCardRef.current, {
          scrollTrigger: {
            trigger: leftCardRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          x: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (rightCardRef.current) {
        gsap.from(rightCardRef.current, {
          scrollTrigger: {
            trigger: rightCardRef.current,
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
      id="whyammu"
      ref={sectionRef}
      className={`py-20 text-white relative overflow-hidden transition-colors duration-500 border-b ${
        isTraditional
          ? "bg-[#14060A] border-[#D4AF37]/20"
          : isProfessional
          ? "bg-[#0C0D0E] border-stone-800"
          : "bg-[#130E0C] border-[#D4AF37]/15"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest transition ${
              isTraditional
                ? "bg-[#881337]/50 text-[#FDD835]"
                : isProfessional
                ? "bg-[#18191D] text-stone-200"
                : "bg-[#881337]/40 text-[#FDD835]"
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isProfessional ? "text-stone-300" : "text-[#D4AF37]"}`} />
            <span>{whyAmmu.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {whyAmmu.title}
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light">
            {whyAmmu.subtitle}
          </p>
        </div>

        {/* Comparison: Open Editorial Spread (Heavy Card Containers Removed) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto items-start">
          
          {/* Left Column: The AMMu Standard */}
          <div ref={leftCardRef} className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-[#D4AF37]/30">
              <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-black font-serif font-bold text-base flex items-center justify-center flex-shrink-0">
                A
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  {whyAmmu.ammuCard.title}
                </h3>
                <p className="text-xs text-[#D4AF37] font-semibold">
                  {whyAmmu.ammuCard.subtitle}
                </p>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-400 ml-auto" />
            </div>

            <div className="space-y-4 text-sm text-stone-200">
              {whyAmmu.ammuCard.points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                  <div className="leading-relaxed text-xs sm:text-sm">
                    <strong className="text-white font-semibold">{pt.title}: </strong>
                    <span className="text-stone-300">{pt.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Ordinary Commercial Brands */}
          <div ref={rightCardRef} className="space-y-6 md:border-l md:border-stone-800/80 md:pl-10 lg:pl-16">
            <div className="flex items-center gap-3 pb-3 border-b border-stone-800">
              <div className="w-9 h-9 rounded-full bg-stone-800 text-stone-400 font-serif font-bold text-base flex items-center justify-center flex-shrink-0">
                ✕
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-300">
                  {whyAmmu.marketCard.title}
                </h3>
                <p className="text-xs text-stone-500 font-semibold">
                  {whyAmmu.marketCard.subtitle}
                </p>
              </div>
              <AlertTriangle className="w-5 h-5 text-rose-500 ml-auto" />
            </div>

            <div className="space-y-4 text-sm text-stone-400">
              {whyAmmu.marketCard.points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-rose-500/80 flex-shrink-0 mt-1" />
                  <div className="leading-relaxed text-xs sm:text-sm">
                    <strong className="text-stone-300 font-semibold">{pt.title}: </strong>
                    <span className="text-stone-400">{pt.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
