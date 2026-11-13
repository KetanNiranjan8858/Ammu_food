"use client";

import React from "react";
import {
  Navbar,
  Hero,
  TrustBadges,
  ProductCatalog,
  NutritionAndFssai,
  WhyAmmu,
  PurityGuide,
  BenefitsSection,
  ReviewsSection,
  InquirySection,
  FaqSection,
  Footer,
  CursorGlow,
  FloatingWhatsApp,
  FestiveMandalaDecor,
  FestiveDivider,
} from "@/components/marketing";
import { useSiteContent } from "@/context/SiteContentContext";

export default function Home() {
  const { content } = useSiteContent();
  const theme = content.theme || { activeTheme: "traditional" };
  const activeTheme = theme.activeTheme || "traditional";

  return (
    <main
      data-theme={activeTheme}
      className={`min-h-screen relative theme-${activeTheme} transition-colors duration-500 ${
        activeTheme === "heritage"
          ? "bg-[#FAF7F2] text-[#1E1A18]"
          : activeTheme === "traditional"
          ? "bg-[#14080B] text-white"
          : activeTheme === "professional"
          ? "bg-[#0C0D0E] bg-tech-grid text-white"
          : "bg-[#120F0D] text-white"
      }`}
    >
      {/* Traditional Sacred Mandalas (Festive Theme Background only) */}
      {activeTheme === "traditional" && <FestiveMandalaDecor />}

      {/* Smooth Cursor Following Background Light */}
      {activeTheme !== "heritage" && <CursorGlow />}

      {/* Navigation */}
      <Navbar />

      {/* Hero Showcase with Meesho/Amazon/Flipkart */}
      <Hero />

      {/* Festive Saffron Divider */}
      <FestiveDivider />

      {/* Trust & Quality Badges */}
      <TrustBadges />

      {/* Product Catalog: Pure Marketplace Purchase Links */}
      <ProductCatalog />

      {/* Real Nutrition Facts & Official FSSAI Pack Label */}
      <NutritionAndFssai />

      {/* Why AMMu Kashmiri Saffron */}
      <WhyAmmu />

      {/* Interactive Purity Testing Guide */}
      <PurityGuide />

      {/* Culinary & Health Benefits */}
      <BenefitsSection />

      {/* Festive Saffron Divider */}
      <FestiveDivider />

      {/* Verified Customer Reviews & Review Link */}
      <ReviewsSection />

      {/* Festive Saffron Divider */}
      <FestiveDivider />

      {/* Single Unified Inquiry Section: Retail & Wholesale */}
      <InquirySection />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Customer Support */}
      <FloatingWhatsApp />
    </main>
  );
}
