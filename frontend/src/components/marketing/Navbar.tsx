"use client";

import React, { useState } from "react";
import { Phone, Mail, Menu, X, Sparkles, Search, User, ShoppingBag } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import { ThemeConfig } from "@/lib/types";

const DEFAULT_NAV_THEME: ThemeConfig = {
  activeTheme: "heritage",
  showFestiveMandalas: false,
  seasonalGreeting: "India's Legacy Saffron House • ISO 3632 Grade A++ Kashmiri Mongra Kesar",
  festivalName: "Heritage Reserve",
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { content } = useSiteContent();
  const company = content.company;
  const theme: ThemeConfig = content.theme || DEFAULT_NAV_THEME;
  const isHeritage = theme.activeTheme === "heritage";

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md shadow-sm transition-colors duration-300 ${
      isHeritage
        ? "bg-[#FAF7F2]/95 border-b border-[#EAE3D9] text-[#1E1A18]"
        : theme.activeTheme === "professional"
        ? "bg-[#0C0D0E]/95 border-b border-stone-800 text-white"
        : theme.activeTheme === "traditional"
        ? "bg-[#14080B]/95 border-b border-[#D4AF37]/25 text-white"
        : "bg-[#120F0D]/95 border-b border-[#D4AF37]/20 text-white"
    }`}>
      {/* Top Notification Bar */}
      <div className={`py-1.5 px-4 text-xs font-medium tracking-wide ${
        isHeritage
          ? "bg-[#F3ECE1] text-[#61554D] border-b border-[#E5DDD2]"
          : theme.activeTheme === "professional"
          ? "bg-[#141518] text-stone-300 border-b border-stone-800"
          : theme.activeTheme === "traditional"
          ? "bg-gradient-to-r from-[#6B0F1A] via-[#881337] to-[#B33010] text-[#FFF9EB]"
          : "bg-gradient-to-r from-[#2B1B17] via-[#5C2314] to-[#1F1411] text-[#FFF9EB]"
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
              isHeritage
                ? "bg-[#9E2A2B] text-white"
                : theme.activeTheme === "professional"
                ? "bg-[#27272A] text-stone-100 border border-stone-600"
                : "bg-[#D4AF37] text-black"
            }`}>
              {isHeritage
                ? "EST. KASHMIR"
                : theme.activeTheme === "traditional"
                ? (theme.festivalName || "Festival Special")
                : theme.activeTheme === "professional"
                ? "Export Grade Reserve"
                : "Verified Marketplace Stock"}
            </span>
            <span className="font-medium">
              {theme.seasonalGreeting || (isHeritage ? "India's Legacy Saffron House • ISO 3632 Grade A++ Mongra Kesar" : "100% Pure Kashmiri Kesar Grade A++ • Order on Meesho, Amazon, Flipkart")}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${company.rawPhone}`}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg transition duration-200 ${
                isHeritage ? "hover:text-[#9E2A2B]" : "hover:bg-black/20 hover:text-[#FDD835]"
              }`}
            >
              <Phone className={`w-3 h-3 ${isHeritage ? "text-[#9E2A2B]" : "text-[#D4AF37]"}`} />
              <span>{company.phone}</span>
            </a>
            <span className="hidden md:inline opacity-40">|</span>
            <a
              href={`mailto:${company.email}`}
              className={`hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-lg transition duration-200 ${
                isHeritage ? "hover:text-[#9E2A2B]" : "hover:bg-black/20 hover:text-[#FDD835]"
              }`}
            >
              <Mail className={`w-3 h-3 ${isHeritage ? "text-[#9E2A2B]" : "text-[#D4AF37]"}`} />
              <span>{company.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo (Baby Saffron Editorial Style in Heritage Mode) */}
          <a href="/" className="flex items-center gap-3 group">
            {isHeritage ? (
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#9E2A2B]/10 border border-[#9E2A2B]/30 flex items-center justify-center text-[#9E2A2B]">
                  <span className="font-serif font-bold text-lg">🌸</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold tracking-tight text-[#9E2A2B] group-hover:text-[#7A1E20] transition">
                    AMMu
                  </span>
                  <span className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-[#61554D]">
                    Saffron House
                  </span>
                </div>
              </div>
            ) : company.logo ? (
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
            {!isHeritage && (
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
            )}
          </a>

          {/* Desktop Nav Links (Centered Minimalist Navigation like Baby Saffron) */}
          <nav className={`hidden md:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase ${
            isHeritage ? "text-[#3D342F]" : "text-stone-200"
          }`}>
            <a href="/products" className={`py-1 transition ${isHeritage ? "hover:text-[#9E2A2B]" : "hover:text-[#FDD835]"}`}>
              Shop
            </a>
            <a href="/#products" className={`py-1 transition ${isHeritage ? "hover:text-[#9E2A2B]" : "hover:text-[#FDD835]"}`}>
              Gifts & Packs
            </a>
            <a href="/#purity-test" className={`py-1 transition ${isHeritage ? "hover:text-[#9E2A2B]" : "hover:text-[#FDD835]"}`}>
              Quality
            </a>
            <a href="/#benefits" className={`py-1 transition ${isHeritage ? "hover:text-[#9E2A2B]" : "hover:text-[#FDD835]"}`}>
              Health
            </a>
            <a href="/#why-ammu" className={`py-1 transition ${isHeritage ? "hover:text-[#9E2A2B]" : "hover:text-[#FDD835]"}`}>
              Stories
            </a>
            <a href="/reviews" className={`py-1 transition ${isHeritage ? "hover:text-[#9E2A2B]" : "hover:text-[#FDD835]"}`}>
              Reviews
            </a>
            <a href="/#nutrition" className={`py-1 transition ${isHeritage ? "hover:text-[#9E2A2B]" : "hover:text-[#FDD835]"}`}>
              About Us
            </a>
          </nav>

          {/* Right Utilities (Search, Sign in, Cart like Baby Saffron screenshot) */}
          <div className="hidden md:flex items-center gap-5">
            {isHeritage ? (
              <>
                <a
                  href="/products"
                  className="text-[#3D342F] hover:text-[#9E2A2B] transition p-1"
                  title="Search Saffron Collection"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </a>

                <a
                  href="/admin"
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#3D342F] hover:text-[#9E2A2B] transition"
                  title="Admin Portal"
                >
                  <User className="w-4 h-4" />
                  <span>Sign in</span>
                </a>

                <a
                  href="/#products"
                  className="relative p-1.5 text-[#3D342F] hover:text-[#9E2A2B] transition"
                  title="Shopping Bag"
                  aria-label="Shopping Bag"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#9E2A2B] text-white text-[10px] font-bold flex items-center justify-center">
                    0
                  </span>
                </a>
              </>
            ) : (
              <a
                href="/#inquiry"
                className="gold-btn-hover flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-black bg-gradient-to-r from-[#D4AF37] via-[#F4A261] to-[#E59819] rounded-xl shadow-gold-glow shimmer-effect cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            {isHeritage && (
              <a
                href="/#products"
                className="relative p-1 text-[#3D342F]"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#9E2A2B] text-white text-[10px] font-bold flex items-center justify-center">
                  0
                </span>
              </a>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition ${
                isHeritage ? "text-[#3D342F] hover:bg-stone-200/60" : "text-stone-300 hover:text-white hover:bg-stone-800"
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-6 py-6 space-y-4 border-b ${
          isHeritage
            ? "bg-[#FAF7F2] border-[#EAE3D9] text-[#1E1A18]"
            : "bg-[#1A1513] border-[#D4AF37]/30 text-stone-200"
        }`}>
          <a
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-base font-bold transition ${isHeritage ? "text-[#9E2A2B]" : "text-[#FDD835]"}`}
          >
            Shop All Saffron
          </a>
          <a
            href="/#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium hover:translate-x-1.5 transition-all"
          >
            Gifts & Packs
          </a>
          <a
            href="/#purity-test"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium hover:translate-x-1.5 transition-all"
          >
            Quality & Purity Testing
          </a>
          <a
            href="/#benefits"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium hover:translate-x-1.5 transition-all"
          >
            Health & Uses
          </a>
          <a
            href="/#why-ammu"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium hover:translate-x-1.5 transition-all"
          >
            Stories & Heritage
          </a>
          <a
            href="/reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium hover:translate-x-1.5 transition-all"
          >
            Customer Reviews
          </a>
          <a
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-base font-bold transition ${isHeritage ? "text-[#9E2A2B]" : "text-[#D4AF37]"}`}
          >
            Admin Sign in
          </a>
        </div>
      )}
    </header>
  );
}
