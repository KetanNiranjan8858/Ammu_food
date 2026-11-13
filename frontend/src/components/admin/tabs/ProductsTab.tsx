"use client";

import React, { useState } from "react";
import { Product, ProductFilter } from "@/lib/types";
import {
  ShoppingBag,
  Plus,
  Trash2,
  Edit3,
  Star,
  Sparkles,
  Filter,
  Tag,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ProductEditModal from "../ProductEditModal";

const DEFAULT_FILTERS: ProductFilter[] = [
  { id: "all", label: "All Packs" },
  { id: "retail", label: "Single 1g Packs" },
  { id: "multipack", label: "Family & Multi-Packs" },
  { id: "gifting", label: "Luxury & Gifting" },
  { id: "bulk", label: "Wholesale (10g–25g+)" },
];

interface ProductsTabProps {
  products: Product[];
  onChange: (products: Product[]) => void;
  filters?: ProductFilter[];
  onFiltersChange?: (filters: ProductFilter[]) => void;
}

export default function ProductsTab({
  products,
  onChange,
  filters = DEFAULT_FILTERS,
  onFiltersChange,
}: ProductsTabProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeAdminFilter, setActiveAdminFilter] = useState<string>("all");
  const [showFiltersManager, setShowFiltersManager] = useState<boolean>(false);

  // New filter category form state
  const [newFilterId, setNewFilterId] = useState("");
  const [newFilterLabel, setNewFilterLabel] = useState("");

  const handleEdit = (prod: Product) => {
    setEditingProduct({ ...prod });
    setModalOpen(true);
  };

  const handleCreateNew = () => {
    const newId = `ammu-product-${Date.now()}`;
    const newProd: Product = {
      id: newId,
      name: "AMMu Kashmiri Saffron Grade A++",
      weight: "1 Gram",
      price: 350,
      originalPrice: 499,
      badge: "Special Edition",
      category: "retail",
      description: "100% pure Kashmiri Mongra saffron threads. Single origin Pampore harvest.",
      features: [
        "Airtight sealed freshness container",
        "Grade A++ Kashmiri Mongra",
        "Certified FSSAI 22720559000206",
        "Pan-India fast dispatch"
      ],
      image: "/images/ammu-gold-tin.webp",
      popular: false,
      links: {
        meesho: "https://www.meesho.com",
        amazon: "https://www.amazon.in",
        flipkart: "https://www.flipkart.com"
      }
    };
    setEditingProduct(newProd);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to remove this product from the catalog?")) {
      const updated = products.filter((p) => p.id !== id);
      onChange(updated);
    }
  };

  const handleTogglePopular = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, popular: !p.popular } : p
    );
    onChange(updated);
  };

  const handleToggleLandingPage = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, showOnLandingPage: !p.showOnLandingPage } : p
    );
    onChange(updated);
  };

  const handleSaveProduct = (savedProduct: Product) => {
    const exists = products.some((p) => p.id === savedProduct.id);
    let updated: Product[];
    if (exists) {
      updated = products.map((p) => (p.id === savedProduct.id ? savedProduct : p));
    } else {
      updated = [...products, savedProduct];
    }
    onChange(updated);
  };

  // Filter categories management
  const handleAddFilter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFilterLabel.trim()) return;

    const id = (newFilterId.trim() || newFilterLabel.toLowerCase().replace(/[^a-z0-9]/g, "-")).toLowerCase();
    if (filters.some((f) => f.id === id)) {
      alert("A filter with this ID already exists. Please choose another name.");
      return;
    }

    const updated = [...filters, { id, label: newFilterLabel.trim() }];
    if (onFiltersChange) {
      onFiltersChange(updated);
    }
    setNewFilterId("");
    setNewFilterLabel("");
  };

  const handleUpdateFilterLabel = (id: string, newLabel: string) => {
    const updated = filters.map((f) => (f.id === id ? { ...f, label: newLabel } : f));
    if (onFiltersChange) {
      onFiltersChange(updated);
    }
  };

  const handleDeleteFilter = (id: string) => {
    if (id === "all") {
      alert("The 'All Packs' root filter cannot be deleted.");
      return;
    }
    if (window.confirm(`Are you sure you want to remove the filter category '${id}'? Products with this category will default to retail.`)) {
      const updated = filters.filter((f) => f.id !== id);
      if (onFiltersChange) {
        onFiltersChange(updated);
      }
      if (activeAdminFilter === id) {
        setActiveAdminFilter("all");
      }
    }
  };

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

  // Filtered products for admin view
  const visibleProducts = products.filter((p) => matchesFilter(p, activeAdminFilter));

  return (
    <div className="space-y-6">
      {/* Tab Header */}
      <div className="border-b border-stone-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <span>Product Catalog Manager ({products.length} Products)</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Top 4 products appear on the main marketing landing page, and all {products.length} products appear on the dedicated <strong>/products</strong> page.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowFiltersManager(!showFiltersManager)}
            className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
              showFiltersManager
                ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#FDD835]"
                : "bg-stone-900 border-stone-700 text-stone-300 hover:text-white"
            }`}
          >
            <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Manage Filter Categories ({filters.length})</span>
            {showFiltersManager ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleCreateNew}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E59819] text-black font-extrabold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Admin Filters Manager Accordion Box */}
      {showFiltersManager && (
        <div className="p-5 sm:p-6 bg-[#1A1412] border-2 border-[#D4AF37]/40 rounded-3xl space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
            <div>
              <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#D4AF37]" />
                <span>Marketing Page Filter Categories</span>
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                These filters appear on both the landing page product section and the full /products catalog page.
              </p>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#881337] text-[#FDD835] font-bold">
              Live Interactive Filters
            </span>
          </div>

          {/* Current Active Filters List */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-stone-300">
              Active Filter Buttons & Labels
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filters.map((f) => {
                const count = products.filter((p) => matchesFilter(p, f.id)).length;
                return (
                  <div
                    key={f.id}
                    className="p-3 bg-[#130E0D] border border-stone-800 rounded-2xl flex items-center justify-between gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase">
                          {f.id}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-stone-800 text-stone-400 rounded-full font-mono">
                          {count} items
                        </span>
                      </div>
                      <input
                        type="text"
                        value={f.label}
                        disabled={f.id === "all"}
                        onChange={(e) => handleUpdateFilterLabel(f.id, e.target.value)}
                        className="w-full bg-transparent text-xs font-bold text-white outline-none mt-1 border-b border-transparent focus:border-[#D4AF37]"
                      />
                    </div>

                    {f.id !== "all" && (
                      <button
                        onClick={() => handleDeleteFilter(f.id)}
                        className="p-1.5 text-stone-500 hover:text-rose-400 rounded-lg hover:bg-rose-950/30 transition flex-shrink-0"
                        title="Delete this filter"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add New Filter Category Form */}
          <form
            onSubmit={handleAddFilter}
            className="p-4 bg-[#140F0E] border border-stone-800 rounded-2xl flex flex-col sm:flex-row items-center gap-3"
          >
            <div className="flex-1 w-full sm:w-auto">
              <label className="block text-[10px] text-stone-400 uppercase font-bold mb-1">
                New Filter Display Label
              </label>
              <input
                type="text"
                required
                value={newFilterLabel}
                onChange={(e) => setNewFilterLabel(e.target.value)}
                placeholder="e.g. Bridal Hampers, Special Reserves"
                className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
              />
            </div>

            <div className="w-full sm:w-44">
              <label className="block text-[10px] text-stone-400 uppercase font-bold mb-1">
                Filter ID (slug)
              </label>
              <input
                type="text"
                value={newFilterId}
                onChange={(e) => setNewFilterId(e.target.value)}
                placeholder="e.g. bridal"
                className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-stone-300 font-mono outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2 mt-4 sm:mt-5 bg-[#D4AF37] hover:bg-[#E59819] text-black font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 flex-shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Category</span>
            </button>
          </form>
        </div>
      )}

      {/* Admin Quick Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-800 pb-3">
        <span className="text-xs text-stone-400 font-medium mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3 text-[#D4AF37]" />
          <span>Category View:</span>
        </span>
        {filters.map((f) => {
          const isActive = activeAdminFilter === f.id;
          const count = products.filter((p) => matchesFilter(p, f.id)).length;
          return (
            <button
              key={f.id}
              onClick={() => setActiveAdminFilter(f.id)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                isActive
                  ? "bg-[#D4AF37] text-black shadow"
                  : "bg-stone-900 text-stone-300 hover:text-white border border-stone-800"
              }`}
            >
              <span>{f.label}</span>
              <span className={`text-[10px] px-1.5 rounded-full ${isActive ? "bg-black/20 text-black" : "bg-stone-800 text-stone-400"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {visibleProducts.map((p, index) => {
          const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
          const categoryObj = filters.find((f) => f.id === p.category);
          const categoryName = categoryObj ? categoryObj.label : p.category || "General";

          return (
            <div
              key={p.id || index}
              className={`p-5 rounded-3xl border transition duration-300 flex flex-col justify-between ${
                p.popular
                  ? "bg-gradient-to-b from-[#251719] to-[#181311] border-[#D4AF37] shadow-gold-glow"
                  : "bg-[#181311] border-stone-800 hover:border-stone-700"
              }`}
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 object-contain rounded-xl border border-stone-800 bg-black/40 p-1 flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-mono text-[#D4AF37] font-bold">
                          #{index + 1}
                        </span>

                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1F1715] text-[#FDD835] border border-[#D4AF37]/30 font-semibold">
                          {categoryName}
                        </span>

                        {p.badge && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#881337] text-white font-bold">
                            {p.badge}
                          </span>
                        )}

                        {p.popular && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37] text-black font-extrabold flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5 fill-black" />
                            Featured
                          </span>
                        )}

                        {p.showOnLandingPage && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 font-bold">
                            Live on Home
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif font-bold text-sm text-white mt-1 line-clamp-1">
                        {p.name}
                      </h3>
                      <p className="text-xs text-stone-400 font-medium">{p.weight}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleTogglePopular(p.id)}
                    title={p.popular ? "Unmark as Popular" : "Mark as Popular"}
                    className={`p-2 rounded-xl transition ${
                      p.popular
                        ? "text-[#FDD835] bg-[#FDD835]/15"
                        : "text-stone-500 hover:text-stone-300 bg-stone-900"
                    }`}
                  >
                    <Star className={`w-4 h-4 ${p.popular ? "fill-[#FDD835]" : ""}`} />
                  </button>
                </div>

                {/* Price Matrix */}
                <div className="mt-4 p-3 bg-[#130E0D] rounded-2xl flex items-center justify-between border border-stone-800/80">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-lg font-bold text-[#FDD835]">
                      ₹{p.price}
                    </span>
                    <span className="text-xs text-stone-500 line-through">
                      ₹{p.originalPrice}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-500/30">
                    {discount}% OFF
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-stone-300 mt-3 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>

                {/* Marketplace Links Status */}
                <div className="mt-3 flex items-center gap-2 text-[10px] text-stone-400">
                  <span className={p.links?.meesho ? "text-[#FF69B4] font-bold" : "opacity-40"}>
                    Meesho ✓
                  </span>
                  <span>•</span>
                  <span className={p.links?.amazon ? "text-[#FF9900] font-bold" : "opacity-40"}>
                    Amazon ✓
                  </span>
                  <span>•</span>
                  <span className={p.links?.flipkart ? "text-[#2874F0] font-bold" : "opacity-40"}>
                    Flipkart ✓
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-1.5 rounded-xl text-xs text-stone-500 hover:text-rose-400 hover:bg-rose-950/30 flex items-center gap-1 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleLandingPage(p.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                      p.showOnLandingPage
                        ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#FDD835]"
                        : "bg-stone-900 border-stone-800 text-stone-400 hover:text-white"
                    }`}
                    title="Toggle whether this product appears on the homepage collection"
                  >
                    <span>{p.showOnLandingPage ? "✓ On Home Page" : "+ Show on Home"}</span>
                  </button>

                  <button
                    onClick={() => handleEdit(p)}
                    className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-200 hover:text-white flex items-center gap-1.5 transition border border-stone-700"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Edit Details</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {modalOpen && editingProduct && (
        <ProductEditModal
          product={editingProduct}
          filters={filters}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}
