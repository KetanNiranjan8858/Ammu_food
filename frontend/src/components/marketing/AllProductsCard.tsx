"use client";

import React, { useState } from "react";
import { Sparkles, ExternalLink, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Product } from "@/lib/types";
import { useSiteContent } from "@/context/SiteContentContext";

interface AllProductsCardProps {
  product: Product;
}

export default function AllProductsCard({ product }: AllProductsCardProps) {
  const { content, updateContent } = useSiteContent();
  const theme = content.theme || { activeTheme: "traditional" };
  const activeTheme = theme.activeTheme || "traditional";
  const isTraditional = activeTheme === "traditional";
  const isProfessional = activeTheme === "professional";

  const [imgError, setImgError] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const images = (product.images && product.images.length > 0)
    ? product.images
    : [product.image];
  const currentImage = images[activeImgIndex] || product.image;

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const handleToggleLandingPage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newCheckedState = e.target.checked;
    setIsUpdating(true);

    try {
      const updatedProducts = (content.products || []).map((p) => {
        if (p.id === product.id) {
          return { ...p, showOnLandingPage: newCheckedState };
        }
        return p;
      });

      await updateContent({
        ...content,
        products: updatedProducts,
      });
    } catch (err) {
      console.error("Failed to update showOnLandingPage:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className={`rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 h-full border ${
        isTraditional
          ? "bg-gradient-to-b from-[#220B13] to-[#15070B] border-[#D4AF37]/30 hover:border-[#D4AF37]/60 shadow-lg"
          : isProfessional
          ? "bg-[#141519] border-stone-800 hover:border-stone-600 shadow-md"
          : "bg-gradient-to-b from-[#1E1412] to-[#120F0D] border-stone-800 hover:border-[#D4AF37]/40 shadow-lg"
      }`}
    >
      <div>
        {/* Top Floating Badge & Multi-Image Indicator */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#FDD835]">
            {product.commonName || "AMMu Pure Saffron"}
          </span>

          <div className="flex items-center gap-1.5">
            {images.length > 1 && (
              <span className="px-2 py-0.5 rounded-full bg-black/60 border border-stone-700/80 text-[9px] font-mono text-[#FDD835]">
                {activeImgIndex + 1}/{images.length}
              </span>
            )}
            {product.popular && (
              <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-black text-[9px] font-bold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 fill-black" />
                Popular
              </span>
            )}
          </div>
        </div>

        {/* Product Image Stage */}
        <div className="relative h-44 sm:h-48 rounded-xl overflow-hidden bg-black/30 flex items-center justify-center p-3 group">
          {!imgError ? (
            <img
              src={currentImage}
              alt={`${product.name} - view ${activeImgIndex + 1}`}
              onError={() => setImgError(true)}
              className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.8)] rounded-lg transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-4">
              <span className="text-3xl">🌾</span>
              <span className="text-xs font-semibold text-[#D4AF37] mt-1">
                {product.weight}
              </span>
            </div>
          )}

          {/* Carousel Arrow Controls */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevImage}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/70 hover:bg-[#D4AF37] text-white hover:text-black flex items-center justify-center transition opacity-0 group-hover:opacity-100 cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/70 hover:bg-[#D4AF37] text-white hover:text-black flex items-center justify-center transition opacity-0 group-hover:opacity-100 cursor-pointer shadow-md"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>

        {/* Product Title */}
        <h3 className="font-serif text-sm sm:text-base font-bold text-white tracking-wide leading-snug line-clamp-2 mt-3">
          {product.name}
        </h3>

        {/* Price Row */}
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl font-extrabold text-[#FDD835] font-serif tracking-tight">
            ₹{product.price}
          </span>
          <span className="text-xs line-through text-stone-500">
            ₹{product.originalPrice}
          </span>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full">
            {discountPercent}% OFF
          </span>
          <span className="text-xs text-stone-300 font-semibold ml-auto">
            {product.weight}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-white/5 space-y-2.5">
        {/* Marketplace Direct Text Links */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
            Order On:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {product.links.meesho && (
              <a
                href={product.links.meesho}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF69B4] hover:text-[#ff85c0] font-bold text-xs hover:underline flex items-center gap-0.5 transition"
                title="Buy on Meesho"
              >
                <span>Meesho</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            )}

            {product.links.flipkart && (
              <>
                {product.links.meesho && <span className="text-stone-600 text-[10px]">•</span>}
                <a
                  href={product.links.flipkart}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFE500] hover:text-yellow-300 font-bold text-xs hover:underline flex items-center gap-0.5 transition"
                  title="Buy on Flipkart"
                >
                  <span>Flipkart</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </>
            )}

            {product.links.amazon && (
              <>
                {(product.links.meesho || product.links.flipkart) && (
                  <span className="text-stone-600 text-[10px]">•</span>
                )}
                <a
                  href={product.links.amazon}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF9900] hover:text-amber-400 font-bold text-xs hover:underline flex items-center gap-0.5 transition"
                  title="Buy on Amazon"
                >
                  <span>Amazon</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </>
            )}
          </div>
        </div>

        {/* ========================================================
            SHOW ON LANDING PAGE OPTION CHECKBOX / TOGGLE
            ======================================================== */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <label className="inline-flex items-center gap-2 cursor-pointer select-none group/toggle">
            <input
              type="checkbox"
              checked={product.showOnLandingPage ?? false}
              onChange={handleToggleLandingPage}
              disabled={isUpdating}
              className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37] bg-stone-900 border-stone-700 cursor-pointer accent-[#D4AF37]"
            />
            <span
              className={`text-[11px] font-bold transition ${
                product.showOnLandingPage
                  ? "text-[#FDD835]"
                  : "text-stone-400 group-hover/toggle:text-stone-200"
              }`}
            >
              {product.showOnLandingPage ? "Show on Landing Page" : "Show on Landing Page"}
            </span>
          </label>

          {product.showOnLandingPage && (
            <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#FDD835] font-bold bg-[#D4AF37]/15 border border-[#D4AF37]/40 px-2 py-0.5 rounded-full">
              <Check className="w-2.5 h-2.5" />
              <span>On Home Page</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

