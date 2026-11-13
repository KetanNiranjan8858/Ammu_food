"use client";

import React, { useState } from "react";
import { ExternalLink, RotateCw } from "lucide-react";
import { Product } from "@/lib/types";
import { useSiteContent } from "@/context/SiteContentContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { content } = useSiteContent();
  const theme = content.theme || { activeTheme: "heritage" };
  const activeTheme = theme.activeTheme || "heritage";
  const isHeritage = activeTheme === "heritage";
  const isTraditional = activeTheme === "traditional";
  const isProfessional = activeTheme === "professional";

  const [imgError, setImgError] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const images = (product.images && product.images.length > 0)
    ? product.images
    : [product.image];
  const currentImage = images[0] || product.image;

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      className={`flip-card-3d-wrapper select-none ${isFlipped ? "is-flipped" : ""}`}
      onClick={toggleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleFlip();
        }
      }}
      aria-label={`${product.name} - Hover or tap to flip for details and order links.`}
    >
      <div className="flip-card-3d-inner">
        {/* ========================================================
            FRONT FACE: ONLY IMAGE (NO BORDER, NO EXTRA TEXT)
            Product card fits image area seamlessly
            ======================================================== */}
        <div className="flip-card-3d-front rounded-2xl overflow-hidden bg-[#140F11] flex items-center justify-center">
          {!imgError ? (
            <img
              src={currentImage}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#1A1215] text-center p-4 rounded-2xl">
              <span className="text-5xl">🌾</span>
            </div>
          )}
        </div>

        {/* ========================================================
            BACK FACE: PRODUCT DETAILS & TEXT-ONLY ORDER LINKS
            (Compact & snug, extra space completely removed)
            ======================================================== */}
        <div
          className={`flip-card-3d-back rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between transition-colors duration-300 ${
            isHeritage
              ? "bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#F5EFE6] text-[#1E1A18] border border-[#EAE2D8] shadow-lg"
              : isTraditional
              ? "bg-gradient-to-b from-[#2B0E16] via-[#1E0A10] to-[#14070B] text-white"
              : isProfessional
              ? "bg-[#18191E] text-stone-100"
              : "bg-gradient-to-b from-[#261713] via-[#1D110F] to-[#140D0B] text-white"
          }`}
        >
          {/* Top Info Group */}
          <div>
            <div className="flex items-center justify-between pb-0.5">
              <span className={`text-[10px] font-bold tracking-wider uppercase ${
                isHeritage ? "text-[#9E2A2B]" : "text-[#FDD835]"
              }`}>
                {product.commonName || "AMMu Pure Kashmiri Kesar"}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFlip();
                }}
                className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded transition ${
                  isHeritage
                    ? "text-stone-600 hover:text-[#9E2A2B] bg-stone-200/70"
                    : "text-stone-400 hover:text-[#D4AF37] bg-black/40"
                }`}
                title="Flip back to image"
              >
                <RotateCw className="w-2.5 h-2.5" />
                <span>Front</span>
              </button>
            </div>

            {/* Product Title on Back */}
            <h3 className={`font-serif text-xs sm:text-sm font-bold tracking-wide leading-snug line-clamp-2 mt-1 ${
              isHeritage ? "text-[#1E1A18]" : "text-white"
            }`}>
              {product.name}
            </h3>

            {/* Price Row with Discount Badge & Weight */}
            <div className="flex items-baseline gap-2 pt-1">
              <span className={`text-lg sm:text-xl font-extrabold font-serif tracking-tight ${
                isHeritage ? "text-[#9E2A2B]" : "text-[#FDD835]"
              }`}>
                ₹{product.price}
              </span>
              <span className="text-xs line-through text-stone-400">
                ₹{product.originalPrice}
              </span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                isHeritage ? "text-emerald-800 bg-emerald-100" : "text-emerald-400 bg-emerald-950/80"
              }`}>
                {discountPercent}% OFF
              </span>
              <span className={`text-xs font-semibold ml-auto ${
                isHeritage ? "text-stone-600" : "text-stone-300"
              }`}>
                {product.weight}
              </span>
            </div>
          </div>

          {/* Bottom Order Links: TEXT-ONLY ORDER LINKS (Meesho, Flipkart, Amazon) */}
          <div className={`pt-1.5 border-t flex items-center justify-between text-xs ${
            isHeritage ? "border-stone-300/80" : "border-white/10"
          }`}>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${
              isHeritage ? "text-stone-600" : "text-stone-400"
            }`}>
              Order On:
            </span>

            <div className="flex items-center gap-2 flex-wrap">
              {product.links.meesho && (
                <a
                  href={product.links.meesho}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[#FF69B4] hover:text-[#ff85c0] font-bold text-xs hover:underline flex items-center gap-0.5 transition"
                  title="Buy on Meesho"
                >
                  <span>Meesho</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              )}

              {product.links.flipkart && (
                <>
                  {product.links.meesho && (
                    <span className="text-stone-600 text-[10px]">•</span>
                  )}
                  <a
                    href={product.links.flipkart}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
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
                    onClick={(e) => e.stopPropagation()}
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
        </div>
      </div>
    </div>
  );
}
