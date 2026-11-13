"use client";

import React, { useEffect, useRef } from "react";
import { Star, ArrowRight } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import { ReviewItem } from "@/lib/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DEFAULT_REVIEWS_CONFIG = {
  badge: "Customer Feedback • 4.9 / 5.0 Star Rating",
  title: "Trusted by Over 1,450+ Connoisseurs & Families",
  subtitle: "Read genuine feedback from mothers, master chefs, and saffron connoisseurs across India who experienced authentic AMMu Kashmiri Mongra purity.",
  averageRating: 4.9,
  totalReviewsCount: "1,450+ Reviews",
  items: [] as ReviewItem[],
};

export default function ReviewsSection() {
  const { content } = useSiteContent();
  const reviews = content.reviews || DEFAULT_REVIEWS_CONFIG;
  const items = reviews.items || [];
  const theme = content.theme || { activeTheme: "traditional" };
  const activeTheme = theme.activeTheme || "traditional";
  const isTraditional = activeTheme === "traditional";
  const isProfessional = activeTheme === "professional";

  // Display top 6 reviews in ultra-compact format so user can see more in less vertical space
  const displayedReviews = items.slice(0, 6);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 25,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "all",
        });
      }

      if (gridRef.current) {
        gsap.from(gridRef.current, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 25,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "all",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className={`py-14 text-white relative overflow-hidden transition-colors duration-500 border-t ${
        isTraditional
          ? "bg-gradient-to-b from-[#18070D] via-[#220B13] to-[#14080B] border-[#D4AF37]/30"
          : isProfessional
          ? "bg-[#0C0D0E] border-stone-800"
          : "bg-gradient-to-b from-[#120F0D] via-[#1A1312] to-[#120F0D] border-stone-800"
      }`}
    >
      {/* Ambient background lighting */}
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-60 rounded-full blur-[140px] pointer-events-none ${
          isTraditional ? "bg-[#881337]/25" : isProfessional ? "bg-white/[0.02]" : "bg-[#881337]/15"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto space-y-3">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider transition ${
              isTraditional
                ? "bg-[#3B151E] border border-[#D4AF37]/40 text-[#FDD835] shadow-crimson-glow"
                : isProfessional
                ? "bg-[#18191D] border border-stone-700 text-stone-200"
                : "bg-[#881337]/50 border border-[#D4AF37]/30 text-[#FDD835]"
            }`}
          >
            <Star className={`w-3 h-3 ${isProfessional ? "text-stone-300" : "fill-[#D4AF37] text-[#D4AF37]"}`} />
            <span>{reviews.badge || DEFAULT_REVIEWS_CONFIG.badge}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            {reviews.title || DEFAULT_REVIEWS_CONFIG.title}
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm font-light max-w-2xl mx-auto">
            {reviews.subtitle || DEFAULT_REVIEWS_CONFIG.subtitle}
          </p>

          {/* Social Proof Score Bar */}
          <div className="pt-1 flex items-center justify-center gap-3 text-xs">
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-xl transition ${
                isTraditional
                  ? "bg-[#250C13] border border-[#D4AF37]/40 text-[#FDD835]"
                  : isProfessional
                  ? "bg-[#16171B] border border-stone-700/80 text-stone-200"
                  : "bg-[#1C1614] border border-[#D4AF37]/30 text-[#FDD835]"
              }`}
            >
              <div className="flex items-center gap-0.5 text-[#FDD835]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#FDD835] text-[#FDD835]" />
                ))}
              </div>
              <span className="font-bold text-white text-xs">{reviews.averageRating || 4.9}</span>
              <span className="text-stone-400 text-[11px]">({reviews.totalReviewsCount || "1,450+ Reviews"})</span>
            </div>
          </div>
        </div>

        {/* Ultra-Compact Reviews Grid: Reduced card size, Rating in front of name, No location, No purchased, No verified badge */}
        <div
          ref={gridRef}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {displayedReviews.map((item) => (
            <div
              key={item.id}
              className="p-3.5 sm:p-4 rounded-xl flex flex-col justify-between transition-all duration-300 space-y-2 bg-white/[0.03] hover:bg-white/[0.06] border-t border-white/10 hover:border-[#D4AF37]/50 cursor-default"
            >
              <div className="space-y-1.5">
                {/* Customer Name + Rating in front of name + Date */}
                <div className="flex items-center justify-between gap-2 border-b pb-1.5 border-stone-800/60">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold text-xs text-white truncate">{item.name}</span>
                    <div className="flex items-center gap-0.5 text-[#FDD835] flex-shrink-0">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-[#FDD835] text-[#FDD835]" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] text-stone-500 font-mono flex-shrink-0">{item.date}</span>
                </div>

                {/* Review Headline */}
                <h4 className="font-serif text-xs font-bold text-stone-100 leading-snug line-clamp-1">
                  &ldquo;{item.title}&rdquo;
                </h4>

                {/* Review Body */}
                <p className="text-[11px] text-stone-300 font-light leading-relaxed line-clamp-2">
                  {item.comment}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Reviews Button */}
        <div className="mt-8 text-center">
          <a
            href="/reviews"
            className={`inline-flex items-center gap-2 px-6 py-2.5 font-bold text-xs uppercase tracking-wider rounded-xl transition duration-300 ${
              isProfessional
                ? "bg-[#E5E7EB] hover:bg-white text-stone-900 shadow-sm"
                : "gold-btn-hover bg-gradient-to-r from-[#D4AF37] via-[#F4A261] to-[#E59819] text-black shadow-gold-glow shimmer-effect"
            }`}
          >
            <span>View All Customer Reviews ({items.length}+ Reviews)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
