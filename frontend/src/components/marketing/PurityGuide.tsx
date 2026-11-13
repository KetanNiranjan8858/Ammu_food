"use client";

import React, { useState, useEffect, useRef } from "react";
import { Beaker, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PurityGuide() {
  const [activeTest, setActiveTest] = useState<number>(0);
  const [isFlying, setIsFlying] = useState<boolean>(false);
  const { content } = useSiteContent();
  const purityGuide = content.purityGuide;
  const tests = purityGuide.tests || [];
  const theme = content.theme || { activeTheme: "traditional" };
  const activeTheme = theme.activeTheme || "traditional";
  const isTraditional = activeTheme === "traditional";
  const isProfessional = activeTheme === "professional";

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  // Entrance animation for the section
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      if (stackRef.current) {
        gsap.from(stackRef.current, {
          scrollTrigger: {
            trigger: stackRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
          scale: 0.96,
          y: 35,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          clearProps: "all",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // "Tabs Flying Card": Ultra-Smooth Flight to Bottom-Right
  const handleSwitchTab = (newIndex: number) => {
    if (newIndex === activeTest || isFlying || !cardRef.current) return;
    setIsFlying(true);

    const currentCard = cardRef.current;

    // Timeline for the smooth bottom-right flight
    const tl = gsap.timeline({
      onComplete: () => {
        setIsFlying(false);
      },
    });

    // 1. Current card smoothly flies towards bottom-right
    tl.to(currentCard, {
      x: 100,
      y: 95,
      rotateZ: 6.5,
      scale: 0.95,
      opacity: 0,
      duration: 0.38,
      ease: "power2.inOut",
      onComplete: () => {
        // Switch state while card is off-center
        setActiveTest(newIndex);
      },
    });

    // 2. Incoming card smoothly glides in from top-left into center position
    tl.fromTo(
      currentCard,
      {
        x: -45,
        y: -40,
        rotateZ: -2.5,
        scale: 0.96,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        rotateZ: 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      }
    );
  };

  const currentTest = tests[activeTest] || tests[0];

  return (
    <section
      id="purity-test"
      ref={sectionRef}
      className={`py-20 text-white relative overflow-hidden transition-colors duration-500 border-t border-b ${
        isTraditional
          ? "bg-[#14080B] border-[#D4AF37]/30"
          : isProfessional
          ? "bg-[#0C0D0E] border-stone-800"
          : "bg-[#120F0D] border-[#D4AF37]/20"
      }`}
    >
      {/* Ambient background lighting */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[140px] pointer-events-none ${
          isTraditional ? "bg-[#881337]/25" : isProfessional ? "bg-white/[0.02]" : "bg-[#881337]/15"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest transition ${
              isTraditional
                ? "bg-[#881337]/60 border border-[#D4AF37]/40 text-[#FDD835] shadow-crimson-glow animate-badge"
                : isProfessional
                ? "bg-[#18191D] border border-stone-700 text-stone-200"
                : "bg-[#881337]/50 border border-[#D4AF37]/30 text-[#FDD835] shadow-crimson-glow animate-badge"
            }`}
          >
            <Beaker className={`w-3.5 h-3.5 ${isProfessional ? "text-stone-300" : "text-[#D4AF37]"}`} />
            <span>{purityGuide.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {purityGuide.title}
          </h2>

          <p className="text-stone-300 text-sm sm:text-base font-light">
            {purityGuide.subtitle}
          </p>
        </div>

        {/* 1. TABS: Interactive Flying Tab Controller */}
        <div className="mt-12 flex justify-center gap-2 sm:gap-4 flex-wrap">
          {tests.map((test, index) => {
            const isActive = activeTest === index;
            return (
              <button
                key={index}
                type="button"
                disabled={isFlying}
                onClick={() => handleSwitchTab(index)}
                className={`relative px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2.5 cursor-pointer select-none ${
                  isActive
                    ? isProfessional
                      ? "bg-[#E5E7EB] text-stone-900 shadow-lg scale-102 border border-white"
                      : "bg-gradient-to-r from-[#D4AF37] to-[#E59819] text-black shadow-gold-glow scale-102"
                    : isProfessional
                    ? "bg-[#141519] text-stone-300 hover:text-white border border-stone-800 hover:border-stone-600 hover:-translate-y-0.5"
                    : "bg-[#1E1412] text-stone-300 hover:text-white border border-stone-800 hover:border-[#D4AF37]/50 hover:bg-[#251A16] hover:-translate-y-0.5 hover:shadow-md"
                } ${isFlying ? "opacity-80 cursor-wait" : ""}`}
              >
                {/* Step Pill */}
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold transition ${
                    isActive
                      ? isProfessional
                        ? "bg-black/15 text-stone-900"
                        : "bg-black/25 text-black"
                      : isTraditional
                      ? "bg-[#881337] text-white"
                      : isProfessional
                      ? "bg-stone-800 text-stone-300"
                      : "bg-[#881337]/70 text-stone-200"
                  }`}
                >
                  0{index + 1}
                </span>

                <span>{test.title.replace(/^\d+\.\s*/, "")}</span>

                <span
                  className={`hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full ${
                    isActive
                      ? isProfessional
                        ? "bg-black/10 text-stone-900 font-semibold"
                        : "bg-black/20 text-black font-semibold"
                      : "opacity-60"
                  }`}
                >
                  {test.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. SMOOTH FLYING CARD (Flies to bottom-right on tab change) */}
        <div
          ref={stackRef}
          className="mt-10 max-w-4xl mx-auto relative select-none"
        >
          <div
            ref={cardRef}
            className={`relative rounded-3xl p-6 sm:p-10 shadow-2xl transition-colors duration-300 border-2 will-change-transform ${
              isTraditional
                ? "bg-gradient-to-b from-[#220B13] via-[#1D0910] to-[#16070C] border-[#D4AF37]/60 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_35px_rgba(212,175,55,0.2)]"
                : isProfessional
                ? "bg-[#16171B] border-stone-700 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
                : "bg-gradient-to-b from-[#1F1714] via-[#1A1210] to-[#140E0C] border-[#D4AF37]/50 shadow-2xl"
            }`}
          >
            {/* Clean Top Bar: Title & Step Tag (No arrows, no next button) */}
            <div className="flex items-center justify-between gap-3 pb-5 border-b border-stone-800/80">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shadow-md ${
                    isProfessional
                      ? "bg-stone-800 text-white"
                      : "bg-[#881337] text-[#FDD835]"
                  }`}
                >
                  0{activeTest + 1}
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
                    Purity Verification Test
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {currentTest.title}
                  </h3>
                </div>
              </div>

              {/* Status Badge */}
              <div
                className={`px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                  isProfessional
                    ? "bg-[#1F2026] text-stone-300 border border-stone-700"
                    : "bg-[#881337]/60 text-[#FDD835] border border-[#D4AF37]/35"
                }`}
              >
                {currentTest.badge}
              </div>
            </div>

            {/* Test Instructions Summary */}
            <div className="my-5 p-4 rounded-2xl bg-black/40 border border-stone-800/80 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#FDD835] block">
                  How To Perform At Home:
                </span>
                <p className="text-xs sm:text-sm text-stone-200 font-light leading-relaxed mt-0.5">
                  {currentTest.summary}
                </p>
              </div>
            </div>

            {/* Expected Results: Pure vs Fake */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              {/* Pure Result */}
              <div className="bg-[#122216]/90 border-2 border-emerald-500/50 hover:border-emerald-400 rounded-2xl p-5 space-y-2.5 shadow-lg transition duration-300 cursor-default">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>AMMu Pure Saffron (Authentic):</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light">
                  {currentTest.pureResult}
                </p>
              </div>

              {/* Fake Result */}
              <div className="bg-[#241014]/90 border-2 border-rose-500/50 hover:border-rose-400 rounded-2xl p-5 space-y-2.5 shadow-lg transition duration-300 cursor-default">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <span>Adulterated / Dyed Saffron (Fake):</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                  {currentTest.fakeResult}
                </p>
              </div>
            </div>

            {/* Clean Bottom Card Footer (Without bottom fly/arrow buttons) */}
            <div className="mt-8 pt-5 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
              <span className="flex items-center gap-2 text-center sm:text-left">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Every AMMu harvest is guaranteed 100% authentic Grade A++ Kashmiri Mongra.</span>
              </span>

              <span className="text-[11px] font-mono text-stone-500">
                Test 0{activeTest + 1} of 0{tests.length}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
