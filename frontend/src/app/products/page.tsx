"use client";

import React, { useState, useMemo } from "react";
import { Navbar, Footer, CursorGlow, AllProductsCard, FloatingWhatsApp, FestiveMandalaDecor } from "@/components/marketing";
import { useSiteContent } from "@/context/SiteContentContext";
import { ProductFilter, Product } from "@/lib/types";
import { Sparkles, Search, SlidersHorizontal, ArrowLeft, Package } from "lucide-react";

const DEFAULT_FILTERS: ProductFilter[] = [
  { id: "all", label: "All Packs" },
  { id: "retail", label: "Single 1g Packs" },
  { id: "multipack", label: "Family & Multi-Packs" },
  { id: "gifting", label: "Luxury & Gifting" },
];

export default function AllProductsPage() {
  const { content } = useSiteContent();
  const products = content.products || [];
  const filters = (content.productFilters && content.productFilters.length > 0 ? content.productFilters : DEFAULT_FILTERS).filter(f => f.id !== "bulk");
  const company = content.company;

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "discount">("featured");

  // Robust matching on filter ID, category, and common name
  const matchesFilter = (prod: Product, filterId: string) => {
    if (filterId === "all") return true;
    const fLower = filterId.toLowerCase().trim();
    const catLower = (prod.category || "").toLowerCase().trim();
    const commLower = (prod.commonName || "").toLowerCase().trim();
    const nameLower = (prod.name || "").toLowerCase().trim();

    if (catLower === fLower) return true;
    if (commLower === fLower) return true;

    if (fLower === "ammu-gold" && (commLower.includes("gold") || catLower.includes("gold") || nameLower.includes("gold"))) return true;
    if (fLower === "kashmir-ki-rani" && (commLower.includes("rani") || catLower.includes("rani") || nameLower.includes("rani"))) return true;
    if (fLower === "ammu-pure" && (commLower.includes("pure") || catLower.includes("pure") || nameLower.includes("pure"))) return true;
    if (fLower === "multipack" && (catLower.includes("multipack") || commLower.includes("pack") || nameLower.includes("pack") || nameLower.includes("set"))) return true;
    if (fLower === "bulk" && (catLower.includes("bulk") || commLower.includes("bulk") || nameLower.includes("reserve") || nameLower.includes("catering") || nameLower.includes("hamper") || nameLower.includes("gift"))) return true;

    return false;
  };

  // Filter & Search & Sort logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((prod) => {
      // Category & common name filter
      const matchesCategory = matchesFilter(prod, activeFilter);

      // Keyword search
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        prod.name.toLowerCase().includes(query) ||
        (prod.commonName && prod.commonName.toLowerCase().includes(query)) ||
        prod.weight.toLowerCase().includes(query) ||
        prod.description.toLowerCase().includes(query) ||
        (prod.badge && prod.badge.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "discount") {
      result.sort((a, b) => {
        const discA = (a.originalPrice - a.price) / a.originalPrice;
        const discB = (b.originalPrice - b.price) / b.originalPrice;
        return discB - discA;
      });
    }

    return result;
  }, [products, activeFilter, searchQuery, sortBy]);

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

      {/* Background Ambience */}
      <CursorGlow />

      {/* Main Navigation */}
      <Navbar />

      {/* Hero Header */}
      <section
        className={`pt-14 pb-10 border-b relative overflow-hidden transition-colors duration-500 ${
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

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#881337]/50 border border-[#D4AF37]/30 text-[#FDD835] text-xs font-semibold uppercase tracking-widest shadow-crimson-glow">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              FSSAI Lic. {company.fssaiLicense} &bull; Kashmir Valley Sourcing
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Complete Certified Saffron Collection
            </h1>
            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              Browse all {products.length} authenticated Grade A++ Kashmiri Mongra saffron items. Available for instant purchase on <strong>Meesho</strong>, <strong>Amazon</strong>, and <strong>Flipkart</strong> with Pan-India express dispatch.
            </p>
          </div>

          {/* Filter Pills & Controls Bar */}
          <div className="mt-10 space-y-4">
            {/* Filter Categories */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {filters.map((f) => {
                const isActive = activeFilter === f.id;
                const count = products.filter((p) => matchesFilter(p, f.id)).length;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
                      isActive
                        ? "bg-gradient-to-r from-[#D4AF37] to-[#E59819] text-black shadow-gold-glow scale-102"
                        : "bg-[#1C1614] text-stone-300 hover:text-white border border-stone-800 hover:border-[#D4AF37]/50 hover:bg-[#251D1A]"
                    }`}
                  >
                    <span>{f.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? "bg-black/20 text-black" : "bg-stone-800 text-stone-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search and Sort Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-4xl mx-auto pt-2">
              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search packs, weight, or keyword..."
                  className="w-full pl-10 pr-4 py-2 bg-[#1A1412] border border-stone-800 focus:border-[#D4AF37] rounded-xl text-xs text-white placeholder-stone-500 outline-none transition"
                />
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-stone-400">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#1A1412] border border-stone-800 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
                >
                  <option value="featured">Featured Order</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between text-xs text-stone-400 mb-8 border-b border-stone-800/80 pb-3">
          <span>
            Showing <strong>{filteredAndSortedProducts.length}</strong> of {products.length} Certified Products
          </span>
          {activeFilter !== "all" && (
            <button
              onClick={() => setActiveFilter("all")}
              className="text-[#D4AF37] hover:underline"
            >
              Reset Category Filter
            </button>
          )}
        </div>

        {filteredAndSortedProducts.length === 0 ? (
          <div className="p-16 text-center bg-[#171311] border border-stone-800 rounded-3xl space-y-4 max-w-xl mx-auto">
            <Package className="w-12 h-12 text-stone-600 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-white">
              No products found
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              No saffron packs match your active search &ldquo;{searchQuery}&rdquo;. Try clearing your search or switching categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredAndSortedProducts.map((prod) => (
              <div key={prod.id} className="h-full">
                <AllProductsCard product={prod} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Customer Support */}
      <FloatingWhatsApp />
    </main>
  );
}

