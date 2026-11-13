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
      className={`min-h-screen text-white relative theme-${activeTheme} ${
        activeTheme === "traditional"
          ? "bg-[#14080B]"
          : activeTheme === "professional"
          ? "bg-[#0C0D0E] bg-tech-grid"
          : "bg-[#120F0D]"
      }`}
    >
      {/* Traditional Sacred Mandalas (Festive Theme Background) */}
      <FestiveMandalaDecor />

      {/* Smooth Cursor Following Background Light with Inertia & Delay */}
      <CursorGlow />

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
