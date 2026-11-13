"use client";

import React from "react";
import { BulkBannerConfig } from "@/lib/types";
import { Package } from "lucide-react";

interface BulkBannerTabProps {
  bulkBanner: BulkBannerConfig;
  onChange: (field: keyof BulkBannerConfig, value: string) => void;
}

export default function BulkBannerTab({ bulkBanner, onChange }: BulkBannerTabProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-stone-800 pb-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Package className="w-5 h-5 text-[#D4AF37]" />
          <span>Wholesale, Commercial & Wedding Gifting Banner</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-1">
          Appears right below the product catalog to capture high-value commercial restaurants, confectioners, and bulk wedding inquiries.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Banner Small Badge Tag
          </label>
          <input
            type="text"
            value={bulkBanner?.badge || ""}
            onChange={(e) => onChange("badge", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
            placeholder="Wholesale, Commercial & Wedding Gifting"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Banner Headline Title
          </label>
          <input
            type="text"
            value={bulkBanner?.title || ""}
            onChange={(e) => onChange("title", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
            placeholder="Need Bulk Saffron (25g to 1kg+) or Custom Hampers?"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Banner Detailed Description
          </label>
          <textarea
            rows={3}
            value={bulkBanner?.description || ""}
            onChange={(e) => onChange("description", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl p-4 text-sm text-white outline-none transition"
            placeholder="We supply sweet makers, hotels, fine dining restaurants..."
          />
        </div>
      </div>
    </div>
  );
}

