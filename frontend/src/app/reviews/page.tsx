"use client";

import React, { useState, useMemo } from "react";
import { Navbar, Footer, CursorGlow, FloatingWhatsApp, FestiveMandalaDecor } from "@/components/marketing";
import { useSiteContent } from "@/context/SiteContentContext";
import { ReviewItem } from "@/lib/types";
import {
  Star,
  CheckCircle2,
  MapPin,
  ArrowLeft,
  Search,
  SlidersHorizontal,
  ThumbsUp,
  Package,
  Award,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function AllReviewsPage() {
  const { content } = useSiteContent();
  const reviews = content.reviews;
  const items: ReviewItem[] = reviews?.items || [];
  const company = content.company;

  const [activeFilter, setActiveFilter] = useState<"all" | "5star" | "pregnancy" | "culinary" | "gifting">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "highest">("newest");
  const [helpfulCount, setHelpfulCount] = useState<Record<string, number>>({});

  const handleHelpful = (id: string) => {
    setHelpfulCount((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // Filter & Search & Sort logic
  const filteredAndSortedReviews = useMemo(() => {
    let result = items.filter((item) => {
      // Category filter
      if (activeFilter === "5star" && item.rating !== 5) return false;
      if (activeFilter === "pregnancy") {
        const text = `${item.title} ${item.comment}`.toLowerCase();
        if (!text.includes("pregnancy") && !text.includes("milk") && !text.includes("baby") && !text.includes("wellness")) {
          return false;
        }
      }
      if (activeFilter === "culinary") {
        const text = `${item.title} ${item.comment}`.toLowerCase();
        if (!text.includes("biryani") && !text.includes("chef") && !text.includes("cook") && !text.includes("recipe") && !text.includes("flavor") && !text.includes("aroma")) {
          return false;
        }
      }
      if (activeFilter === "gifting") {
        const text = `${item.title} ${item.comment} ${item.productName}`.toLowerCase();
        if (!text.includes("gift") && !text.includes("tin") && !text.includes("packaging") && !text.includes("luxury") && !text.includes("pack")) {
          return false;
        }
      }

      // Search keyword
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          (item.name && item.name.toLowerCase().includes(q)) ||
          (item.location && item.location.toLowerCase().includes(q)) ||
          (item.title && item.title.toLowerCase().includes(q)) ||
          (item.comment && item.comment.toLowerCase().includes(q)) ||
          (item.productName && item.productName.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    });

    // Sort
    if (sortBy === "highest") {
      result.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    }

    return result;
  }, [items, activeFilter, searchQuery, sortBy]);

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

      <CursorGlow />

      {/* Main Navigation */}
      <Navbar />

      {/* Hero Header */}
      <section
        className={`pt-14 pb-12 border-b relative overflow-hidden transition-colors duration-500 ${
          activeTheme === "traditional"
            ? "bg-gradient-to-b from-[#1C060D] via-[#2A0A14] to-[#14080B] border-[#D4AF37]/35"
            : activeTheme === "professional"
            ? "bg-gradient-to-b from-[#101114] via-[#141518] to-[#0C0D0E] border-stone-800"
            : "bg-gradient-to-b from-[#1E1416] via-[#161110] to-[#120F0D] border-stone-800"
        }`}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-[#881337]/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-400 hover:text-[#D4AF37] transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home Page</span>
            </a>

            <div className="flex items-center gap-2 text-xs text-stone-400">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Customer Feedback &bull; FSSAI Lic. {company.fssaiLicense}</span>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                activeTheme === "traditional"
                  ? "bg-[#881337]/60 border border-[#D4AF37]/40 text-[#FDD835] shadow-crimson-glow"
                  : activeTheme === "professional"
                  ? "bg-[#18191D] border border-stone-700 text-stone-200"
                  : "bg-[#881337]/60 border border-[#D4AF37]/40 text-[#FDD835]"
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${activeTheme === "professional" ? "text-stone-300" : "fill-[#D4AF37] text-[#D4AF37]"}`} />
              <span>Customer Experiences &bull; 4.9★ Average</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              All Customer Reviews
            </h1>

            <p className="text-stone-300 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Read real experiences from families, pregnant mothers, and chefs across India who rely on AMMu Grade-1 Kashmiri Mongra Saffron for pure color, rich aroma, and wellness.
            </p>

            {/* Overall Rating Score Card */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
              <div className="flex items-center gap-2 bg-[#1C1614] border border-[#D4AF37]/35 px-4 py-2.5 rounded-2xl shadow-lg">
                <div className="flex items-center gap-1 text-[#FDD835]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FDD835] text-[#FDD835]" />
                  ))}
                </div>
                <span className="font-serif font-bold text-lg text-white">4.9</span>
                <span className="text-stone-400 font-medium">/ 5.0 Rating</span>
                <span className="text-stone-500 font-mono">({items.length} Displayed)</span>
              </div>

              <div className="flex items-center gap-2 bg-[#1C1614]/80 border border-stone-800 px-4 py-2.5 rounded-2xl text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Deliveries across 500+ Indian Cities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Reviews Container */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search & Filter Controls */}
        <div
          className={`rounded-3xl p-5 shadow-xl space-y-4 mb-8 border transition-colors duration-300 ${
            activeTheme === "traditional"
              ? "bg-[#1E0C12] border-[#D4AF37]/35"
              : activeTheme === "professional"
              ? "bg-[#141519] border-stone-800"
              : "bg-[#181211] border-stone-800"
          }`}
        >
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search reviews by name, city, comment, or pack name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#120F0E] border border-stone-700/80 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-stone-500 outline-none transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Selection */}
            <div className="flex items-center gap-2.5 self-end lg:self-auto text-xs">
              <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-stone-400 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#120F0E] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none cursor-pointer"
              >
                <option value="newest">Featured & Most Recent</option>
                <option value="highest">Highest Rating (5★ First)</option>
              </select>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-800/80">
            <span className="text-xs font-semibold text-stone-400 mr-1">Filter:</span>
            {[
              { id: "all", label: "All Reviews" },
              { id: "5star", label: "★ 5-Star Only" },
              { id: "pregnancy", label: "Pregnancy & Daily Milk" },
              { id: "culinary", label: "Royal Biryani & Chefs" },
              { id: "gifting", label: "Luxury Tins & Gifting" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition duration-200 cursor-pointer ${
                  activeFilter === f.id
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#E59819] text-black shadow-gold-glow"
                    : "bg-[#140F0E] text-stone-300 hover:text-white border border-stone-800 hover:border-[#D4AF37]/40"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        {filteredAndSortedReviews.length === 0 ? (
          <div className="p-16 text-center bg-[#171311] border border-stone-800 rounded-3xl space-y-4 max-w-lg mx-auto">
            <Package className="w-10 h-10 text-stone-600 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-white">No matching reviews found</h3>
            <p className="text-xs text-stone-400">
              Try adjusting your search query or switching the category filter above to see all reviews.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="px-5 py-2.5 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition hover:brightness-110"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAndSortedReviews.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl flex flex-col justify-between transition-all duration-300 space-y-2.5 bg-white/[0.03] hover:bg-white/[0.06] border-t border-white/10 hover:border-[#D4AF37]/50 cursor-default"
              >
                <div className="space-y-1.5">
                  {/* Name + Rating in front of name + Date */}
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
                  <h3 className="font-serif text-xs sm:text-sm font-bold text-white leading-snug line-clamp-1">
                    &ldquo;{item.title}&rdquo;
                  </h3>

                  {/* Review Body */}
                  <p className="text-[11px] sm:text-xs text-stone-300 font-light leading-relaxed line-clamp-3">
                    {item.comment}
                  </p>
                </div>

                {/* Helpful Button footer */}
                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => handleHelpful(item.id)}
                    className="inline-flex items-center gap-1 text-[10px] text-stone-400 hover:text-[#FDD835] transition cursor-pointer"
                  >
                    <ThumbsUp className="w-2.5 h-2.5" />
                    <span>Helpful ({helpfulCount[item.id] || 0})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 sm:p-10 bg-gradient-to-r from-[#1B1413] via-[#241719] to-[#1B1413] border border-[#D4AF37]/40 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FDD835] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AMMu Pure Grade A++ Kashmiri Kesar</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Experience Authentic Kashmiri Saffron Yourself
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl font-light">
              Order directly on verified marketplaces with express delivery across India, or contact our sales desk for custom inquiries.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="/products"
              className="gold-btn-hover px-7 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#F4A261] to-[#E59819] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-gold-glow flex items-center justify-center gap-2 shimmer-effect cursor-pointer"
            >
              <span>Explore Saffron Collection</span>
            </a>
            <a
              href="/#inquiry"
              className="px-6 py-3.5 bg-[#171210] hover:bg-[#251A18] text-stone-200 border border-stone-700 hover:border-[#D4AF37] font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Direct Customer Desk</span>
            </a>
          </div>
        </div>

      </section>

      <Footer />

      {/* Floating WhatsApp Customer Support */}
      <FloatingWhatsApp />
    </main>
  );
}

