"use client";

import React, { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { Sparkles, Package, ArrowRight } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProductCatalog() {
  const { content } = useSiteContent();
  const products = content.products || [];
  const company = content.company;
  const theme = content.theme || { activeTheme: "heritage" };
  const activeTheme = theme.activeTheme || "heritage";
  const isHeritage = activeTheme === "heritage";
  const isTraditional = activeTheme === "traditional";
  const isProfessional = activeTheme === "professional";

  // Showcase products selected to be shown on the landing marketing page card collection
  const landingProducts = products.filter((p) => p.showOnLandingPage === true);
  const displayedProducts = landingProducts.length > 0
    ? landingProducts
    : products.slice(0, 4);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Initial scroll entrance animation (only runs ONCE on page load)
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
          y: 30,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "all",
        });
      }

      if (gridRef.current) {
        gsap.from(gridRef.current, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
          y: 35,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "all",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className={`py-16 relative transition-colors duration-500 ${
        isHeritage
          ? "bg-[#FAF7F2] text-[#1E1A18]"
          : isTraditional
          ? "bg-[#14080B] text-white"
          : isProfessional
          ? "bg-[#0C0D0E] text-white"
          : "bg-[#120F0D] text-white"
      }`}
    >
      {/* Background ambient lighting */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-80 rounded-full blur-[140px] pointer-events-none ${
          isHeritage
            ? "bg-[#C86D51]/10"
            : isTraditional
            ? "bg-[#881337]/25"
            : isProfessional
            ? "bg-white/[0.02]"
            : "bg-[#881337]/15"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Small "View All" Button inline with Heading */}
        <div
          ref={headerRef}
          className="catalog-header flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2"
        >
          <div className="space-y-2.5 text-center md:text-left">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest transition ${
                isHeritage
                  ? "bg-[#9E2A2B]/10 border border-[#9E2A2B]/30 text-[#9E2A2B]"
                  : isTraditional
                  ? "bg-[#881337]/60 border border-[#D4AF37]/40 text-[#FDD835] shadow-crimson-glow animate-badge"
                  : isProfessional
                  ? "bg-[#16171B] border border-stone-700 text-stone-200"
                  : "bg-[#881337]/50 border border-[#D4AF37]/30 text-[#FDD835] shadow-crimson-glow animate-badge"
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isHeritage ? "text-[#9E2A2B]" : isProfessional ? "text-stone-300" : "text-[#D4AF37]"}`} />
              <span>Direct From Kashmir Valley &bull; FSSAI Lic. {company.fssaiLicense}</span>
            </div>

            <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
              isHeritage ? "text-[#1E1A18]" : "text-white"
            }`}>
              Our Certified Saffron Collection
            </h2>

            <p className={`text-sm font-light max-w-xl ${isHeritage ? "text-[#61554D]" : "text-stone-300"}`}>
              Choose your preferred packaging and buy instantly on verified marketplaces (<strong>Meesho</strong>, <strong>Flipkart</strong>, <strong>Amazon</strong>).
            </p>
          </div>

          {/* Small View All Products Button positioned with the Heading */}
          <div className="flex justify-center md:justify-end flex-shrink-0">
            <a
              href="/products"
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition duration-300 shadow-sm ${
                isHeritage
                  ? "bg-[#9E2A2B] hover:bg-[#852324] text-white shadow-md hover:-translate-y-0.5"
                  : isProfessional
                  ? "bg-[#E5E7EB] hover:bg-white text-stone-900 border border-stone-300"
                  : "gold-btn-hover bg-gradient-to-r from-[#D4AF37] via-[#F4A261] to-[#E59819] text-black shadow-gold-glow shimmer-effect"
              }`}
            >
              <span>View All Products ({products.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Product Grid: Top 4 Products on Landing Page */}
        <div
          ref={gridRef}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {displayedProducts.length > 0 ? (
            displayedProducts.map((prod) => (
              <div key={prod.id} className="product-card-item animate-fadeIn">
                <ProductCard product={prod} />
              </div>
            ))
          ) : (
            <div
              className={`col-span-full p-12 text-center rounded-3xl space-y-3 border ${
                isProfessional
                  ? "bg-[#141518] border-stone-800"
                  : "bg-[#171311] border-stone-800"
              }`}
            >
              <Package className="w-8 h-8 text-stone-500 mx-auto" />
              <p className="text-sm font-semibold text-stone-300">
                No products found in this category.
              </p>
              <a
                href="/products"
                className="inline-block text-xs text-[#D4AF37] underline font-bold"
              >
                Browse All Products
              </a>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
