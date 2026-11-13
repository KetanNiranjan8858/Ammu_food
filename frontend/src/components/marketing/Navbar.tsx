"use client";

import React, { useState } from "react";
import { Phone, Mail, Menu, X, Sparkles } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import { ThemeConfig } from "@/lib/types";

const DEFAULT_NAV_THEME: ThemeConfig = {
  activeTheme: "traditional",
  showFestiveMandalas: true,
  seasonalGreeting: "100% Pure Kashmiri Kesar Grade A++ • Order on Meesho, Amazon, Flipkart",
  festivalName: "Festival Special",
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { content } = useSiteContent();
  const company = content.company;
  const theme: ThemeConfig = content.theme || DEFAULT_NAV_THEME;

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md text-white shadow-xl transition-colors duration-300 ${
      theme.activeTheme === "professional"
        ? "bg-[#0C0D0E]/95 border-b border-stone-800"
        : theme.activeTheme === "traditional"
        ? "bg-[#14080B]/95 border-b border-[#D4AF37]/25"
        : "bg-[#120F0D]/95 border-b border-[#D4AF37]/20"
    }`}>
      {/* Top Notification Bar */}
      <div className={`py-1.5 px-4 text-xs font-medium tracking-wide ${
        theme.activeTheme === "professional"
          ? "bg-[#141518] text-stone-300 border-b border-stone-800"
          : theme.activeTheme === "traditional"
          ? "bg-gradient-to-r from-[#6B0F1A] via-[#881337] to-[#B33010] text-[#FFF9EB]"
          : "bg-gradient-to-r from-[#2B1B17] via-[#5C2314] to-[#1F1411] text-[#FFF9EB]"
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shimmer-effect ${
              theme.activeTheme === "professional"
                ? "bg-[#27272A] text-stone-100 border border-stone-600"
                : "bg-[#D4AF37] text-black"
            }`}>
              {theme.activeTheme === "traditional"
                ? (theme.festivalName || "Festival Special")
                : theme.activeTheme === "professional"
                ? "Export Grade Reserve"
                : "Verified Marketplace Stock"}
            </span>
            <span>
              {theme.seasonalGreeting || "100% Pure Kashmiri Kesar Grade A++ • Order on Meesho, Amazon, Flipkart"}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${company.rawPhone}`}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg hover:bg-black/20 hover:text-[#FDD835] transition duration-200"
            >
              <Phone className="w-3 h-3 text-[#D4AF37]" />
              <span>{company.phone}</span>
            </a>
            <span className="hidden md:inline opacity-40">|</span>
            <a
              href={`mailto:${company.email}`}
              className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-lg hover:bg-black/20 hover:text-[#FDD835] transition duration-200"
            >
              <Mail className="w-3 h-3 text-[#D4AF37]" />
              <span>{company.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with gentle hover glow */}
          <a href="/" className="flex items-center gap-3 group">
            {company.logo ? (
              <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-br from-[#D4AF37] via-[#F4A261] to-[#B33010] shadow-gold-glow flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-104 transition duration-500">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ) : (
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F4A261] to-[#B33010] flex items-center justify-center p-0.5 shadow-gold-glow group-hover:scale-104 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.35)] transition duration-500">
                <div className="w-full h-full rounded-full bg-[#1A1513] flex items-center justify-center">
                  <span className="text-xl font-bold font-serif text-[#D4AF37] tracking-wider group-hover:rotate-3 transition duration-500">
                    A
                  </span>
                </div>
              </div>
            )}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-wider text-white group-hover:text-[#FDD835] transition duration-300">
                  AMMU
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 bg-[#B33010]/60 text-[#FDD835] border border-[#D4AF37]/40 rounded uppercase tracking-widest group-hover:bg-[#B33010] transition duration-300">
                  Foods
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-[#D4AF37]/80 uppercase group-hover:text-[#D4AF37] transition duration-300">
                Leading Dried Fruits
              </p>
            </div>
          </a>

          {/* Desktop Nav Links with Expanding Underline Hover Effect */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-200">
            <a href="/products" className="nav-link-hover py-1 text-[#FDD835] font-bold">
              All Products
            </a>
            <a href="/#nutrition" className="nav-link-hover py-1">
              Nutritional Facts
            </a>
            <a href="/#why-ammu" className="nav-link-hover py-1">
              Why AMMu
            </a>
            <a href="/#purity-test" className="nav-link-hover py-1">
              Purity Test
            </a>
            <a href="/#benefits" className="nav-link-hover py-1">
              Uses
            </a>
            <a href="/reviews" className="nav-link-hover py-1 text-[#FDD835]">
              Reviews
            </a>
            <a href="/#faqs" className="nav-link-hover py-1">
              FAQs
            </a>
          </nav>

          {/* Action Buttons with Hover Lifts */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/#inquiry"
              className="gold-btn-hover flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-black bg-gradient-to-r from-[#D4AF37] via-[#F4A261] to-[#E59819] rounded-xl shadow-gold-glow shimmer-effect cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Submit Inquiry</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="#inquiry"
              className="px-3 py-1.5 text-xs font-bold bg-[#D4AF37] text-black rounded-lg hover:brightness-110 active:scale-95 transition"
            >
              Inquire
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1A1513] border-b border-[#D4AF37]/30 px-6 py-6 space-y-4">
          <a
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-[#FDD835] hover:text-white hover:translate-x-1.5 transition-all"
          >
            All Products (Full Collection)
          </a>
          <a
            href="/#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-stone-200 hover:text-[#D4AF37] hover:translate-x-1.5 transition-all"
          >
            Featured Packs
          </a>
          <a
            href="#nutrition"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-stone-200 hover:text-[#D4AF37] hover:translate-x-1.5 transition-all"
          >
            Nutritional Facts & FSSAI Lic
          </a>
          <a
            href="#why-ammu"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-stone-200 hover:text-[#D4AF37] hover:translate-x-1.5 transition-all"
          >
            Why AMMu Saffron
          </a>
          <a
            href="#purity-test"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-stone-200 hover:text-[#D4AF37] hover:translate-x-1.5 transition-all"
          >
            Purity & Lab Standards
          </a>
          <a
            href="#benefits"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-stone-200 hover:text-[#D4AF37] hover:translate-x-1.5 transition-all"
          >
            Culinary & Wellness Uses
          </a>
          <a
            href="/reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#FDD835] hover:text-white hover:translate-x-1.5 transition-all"
          >
            Customer Reviews (4.9★)
          </a>
          <a
            href="/#faqs"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-stone-200 hover:text-[#D4AF37] hover:translate-x-1.5 transition-all"
          >
            Frequently Asked Questions
          </a>

          <div className="pt-4 border-t border-stone-800">
            <a
              href="/#inquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 text-sm font-bold uppercase tracking-wider text-black bg-[#D4AF37] hover:brightness-110 active:scale-98 transition rounded-xl shadow-gold-glow text-center block cursor-pointer"
            >
              Go to Inquiry Desk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
