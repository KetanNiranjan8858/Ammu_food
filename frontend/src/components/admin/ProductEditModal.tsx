"use client";

import React, { useState, useRef } from "react";
import { Product, ProductFilter } from "@/lib/types";
import { X, Sparkles, Plus, Trash2, Check, Tag, Upload, Star, Image as ImageIcon, RefreshCw } from "lucide-react";

interface ProductEditModalProps {
  product: Product;
  filters?: ProductFilter[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export default function ProductEditModal({
  product: initialProduct,
  filters = [],
  isOpen,
  onClose,
  onSave,
}: ProductEditModalProps) {
  const [draft, setDraft] = useState<Product>(initialProduct);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const activeCategoryFilters = filters.filter((f) => f.id !== "all");

  // Normalized list of images for this product
  const imageList = (draft.images && draft.images.length > 0)
    ? draft.images
    : (draft.image ? [draft.image] : ["/images/ammu-gold-tin.webp"]);

  const handleSetPrimaryImage = (index: number) => {
    const selected = imageList[index];
    const remaining = imageList.filter((_, i) => i !== index);
    const updated = [selected, ...remaining];
    setDraft({
      ...draft,
      image: selected,
      images: updated,
    });
  };

  const handleRemoveImage = (index: number) => {
    if (imageList.length <= 1) {
      alert("A product must keep at least 1 image.");
      return;
    }
    const updated = imageList.filter((_, i) => i !== index);
    setDraft({
      ...draft,
      image: updated[0],
      images: updated,
    });
  };

  const handleAddImageUrl = () => {
    const url = newImageUrl.trim();
    if (!url) return;
    if (imageList.includes(url)) {
      alert("This image is already in the product gallery.");
      return;
    }
    const updated = [...imageList, url];
    setDraft({
      ...draft,
      image: updated[0],
      images: updated,
    });
    setNewImageUrl("");
  };

  const handleMultiUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploadingImages(true);

    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("file", f));

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.urls && data.urls.length > 0) {
        const updated = [...imageList, ...data.urls];
        setDraft({
          ...draft,
          image: updated[0],
          images: updated,
        });
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (err) {
      console.warn("Upload endpoint issue, falling back to FileReader base64:", err);
      const base64List: string[] = [];
      for (const file of files) {
        await new Promise<void>((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              base64List.push(event.target.result as string);
            }
            resolve();
          };
          reader.readAsDataURL(file);
        });
      }
      if (base64List.length > 0) {
        const updated = [...imageList, ...base64List];
        setDraft({
          ...draft,
          image: updated[0],
          images: updated,
        });
      }
    } finally {
      setUploadingImages(false);
      if (multiFileInputRef.current) multiFileInputRef.current.value = "";
    }
  };

  const handleFeatureChange = (index: number, val: string) => {
    const updated = [...(draft.features || [])];
    updated[index] = val;
    setDraft({ ...draft, features: updated });
  };

  const addFeature = () => {
    setDraft({
      ...draft,
      features: [...(draft.features || []), "100% Grade A++ Kashmiri Saffron"],
    });
  };

  const removeFeature = (index: number) => {
    setDraft({
      ...draft,
      features: (draft.features || []).filter((_, idx) => idx !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(draft);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#181210] border-2 border-[#D4AF37]/50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif text-xl font-bold text-white">
              {draft.id ? "Edit Product Item" : "Create New Saffron Product"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Full Name & Common Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Product Full Name
              </label>
              <input
                type="text"
                required
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className="w-full bg-[#120E0D] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2 text-xs text-white outline-none"
                placeholder="e.g. AMMu Gold Kashmiri Kesar (1g Tin)"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                Common Name / Series (Used for Filters)
              </label>
              <input
                type="text"
                value={draft.commonName || ""}
                onChange={(e) => setDraft({ ...draft, commonName: e.target.value })}
                className="w-full bg-[#120E0D] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2 text-xs text-white outline-none"
                placeholder="e.g. AMMu Gold, Kashmir Ki Rani, AMMu Pure Pot"
              />
            </div>
          </div>

          {/* Weight, Badge & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Net Weight / Unit
              </label>
              <input
                type="text"
                required
                value={draft.weight}
                onChange={(e) => setDraft({ ...draft, weight: e.target.value })}
                className="w-full bg-[#120E0D] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                placeholder="e.g. 1 Gram, 2 x 1g, 5 Grams"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Badge / Ribbons Tag
              </label>
              <input
                type="text"
                value={draft.badge || ""}
                onChange={(e) => setDraft({ ...draft, badge: e.target.value })}
                className="w-full bg-[#120E0D] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                placeholder="e.g. Best Seller, Value Pack"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D4AF37] mb-1 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                <span>Filter Category</span>
              </label>
              <select
                value={draft.category || (activeCategoryFilters[0]?.id || "retail")}
                onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                className="w-full bg-[#120E0D] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none cursor-pointer"
              >
                {activeCategoryFilters.length > 0 ? (
                  activeCategoryFilters.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="retail">Single 1g Packs</option>
                    <option value="multipack">Family & Multi-Packs</option>
                    <option value="gifting">Luxury & Gifting</option>
                    <option value="bulk">Wholesale (10g–25g+)</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Pricing & Popular Switch */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#201614] rounded-2xl border border-stone-800">
            <div>
              <label className="block text-xs font-semibold text-[#FDD835] mb-1">
                Selling Price (₹)
              </label>
              <input
                type="number"
                required
                value={draft.price}
                onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
                className="w-full bg-[#140F0E] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-sm font-bold text-[#FDD835] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">
                Original MRP (₹)
              </label>
              <input
                type="number"
                required
                value={draft.originalPrice}
                onChange={(e) => setDraft({ ...draft, originalPrice: Number(e.target.value) })}
                className="w-full bg-[#140F0E] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-sm text-stone-300 outline-none"
              />
            </div>

            <div className="flex flex-col justify-center items-start pt-3 space-y-2">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-white">
                <input
                  type="checkbox"
                  checked={draft.popular || false}
                  onChange={(e) => setDraft({ ...draft, popular: e.target.checked })}
                  className="rounded text-[#D4AF37] focus:ring-0 w-4 h-4 accent-[#D4AF37]"
                />
                <span>Highlight as Popular</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-[#FDD835]">
                <input
                  type="checkbox"
                  checked={draft.showOnLandingPage ?? false}
                  onChange={(e) => setDraft({ ...draft, showOnLandingPage: e.target.checked })}
                  className="rounded text-[#D4AF37] focus:ring-0 w-4 h-4 accent-[#D4AF37]"
                />
                <span>Show on Landing Page Card</span>
              </label>
              <span className="text-[10px] text-stone-500">Live 3D card displayed on homepage</span>
            </div>
          </div>

          {/* Multiple Product Images Manager */}
          <div className="p-4 sm:p-5 bg-[#1C1513] rounded-2xl border-2 border-[#D4AF37]/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  Product Gallery &bull; Multiple Images ({imageList.length})
                </h4>
              </div>
              <span className="text-[10px] text-stone-400">
                Star an image to set it as the primary cover.
              </span>
            </div>

            {/* Thumbnail Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {imageList.map((imgUrl, idx) => {
                const isPrimary = idx === 0;
                return (
                  <div
                    key={idx}
                    className={`relative rounded-xl overflow-hidden border p-2 flex flex-col items-center justify-between transition group ${
                      isPrimary
                        ? "bg-[#251816] border-[#D4AF37] shadow-gold-glow"
                        : "bg-[#140F0E] border-stone-800 hover:border-[#D4AF37]/50"
                    }`}
                  >
                    {/* Primary Badge */}
                    {isPrimary ? (
                      <span className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded bg-[#D4AF37] text-black text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-0.5 shadow">
                        <Star className="w-2.5 h-2.5 fill-black" />
                        Main
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetPrimaryImage(idx)}
                        className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded bg-black/70 hover:bg-[#D4AF37] text-stone-300 hover:text-black text-[9px] font-bold uppercase transition flex items-center gap-0.5 cursor-pointer"
                        title="Set as Main Cover Image"
                      >
                        <Star className="w-2.5 h-2.5" />
                        Set Main
                      </button>
                    )}

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1.5 right-1.5 z-10 p-1 rounded-full bg-black/70 hover:bg-rose-950 text-stone-400 hover:text-rose-300 transition cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>

                    {/* Image Preview */}
                    <div className="h-24 w-full flex items-center justify-center p-1">
                      <img
                        src={imgUrl}
                        alt={`Product image ${idx + 1}`}
                        className="max-h-full max-w-full object-contain filter drop-shadow rounded"
                      />
                    </div>

                    <div className="w-full text-center mt-1">
                      <span className="text-[9px] text-stone-400 font-mono block truncate max-w-full" title={imgUrl}>
                        {imgUrl.split("/").pop()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions: Multi-File Upload & URL Entry */}
            <div className="pt-2 border-t border-stone-800/80 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  ref={multiFileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleMultiUpload}
                  className="hidden"
                  id="multi-product-images-input"
                />
                <button
                  type="button"
                  disabled={uploadingImages}
                  onClick={() => multiFileInputRef.current?.click()}
                  className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#E59819] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {uploadingImages ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading Images...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Multiple Images From Device</span>
                    </>
                  )}
                </button>

                <span className="text-[11px] text-stone-400">
                  Select 1 or more images (PNG, WEBP, JPG)
                </span>
              </div>

              {/* Add by URL */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Or enter image URL / path e.g. /images/ammu-10g.svg..."
                  className="flex-1 bg-[#140F0E] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3 py-1.5 text-xs text-white outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddImageUrl();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 hover:border-[#D4AF37] rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Add Image
                </button>
              </div>

              {/* Quick Pick Presets */}
              <div className="flex items-center gap-2 text-[10px] text-stone-400 flex-wrap">
                <span className="font-semibold text-stone-300">Quick add preset:</span>
                {[
                  { name: "+ Gold Tin", path: "/images/ammu-gold-tin.webp" },
                  { name: "+ Round Pot", path: "/images/ammu-round-acrylic-jar.webp" },
                  { name: "+ Hex Jar", path: "/images/ammu-kashmir-ki-rani-jar.webp" },
                  { name: "+ 1g Pack", path: "/images/ammu-1g.svg" },
                  { name: "+ 2g Pack", path: "/images/ammu-2g.svg" },
                  { name: "+ 5g Pack", path: "/images/ammu-5g.svg" },
                  { name: "+ 10g Pack", path: "/images/ammu-10g.svg" },
                  { name: "+ Nutrition Label", path: "/images/ammu-nutrition-facts.webp" },
                ].map((preset, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => {
                      if (!imageList.includes(preset.path)) {
                        const updated = [...imageList, preset.path];
                        setDraft({
                          ...draft,
                          image: updated[0],
                          images: updated,
                        });
                      }
                    }}
                    className="text-[#D4AF37] hover:underline"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Short Description
            </label>
            <textarea
              rows={2}
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              className="w-full bg-[#120E0D] border border-stone-700 focus:border-[#D4AF37] rounded-xl p-3 text-xs text-white outline-none"
            />
          </div>

          {/* Marketplace Purchase Links */}
          <div className="p-4 bg-[#1E1715] rounded-2xl border border-stone-800 space-y-3">
            <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider">
              Marketplace Direct Buy Links
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#FF69B4] mb-1">
                  Meesho Link
                </label>
                <input
                  type="text"
                  value={draft.links?.meesho || ""}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      links: { ...draft.links, meesho: e.target.value },
                    })
                  }
                  className="w-full bg-[#140F0E] border border-stone-700 focus:border-[#FF69B4] rounded-xl px-3 py-1.5 text-[11px] text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#FF9900] mb-1">
                  Amazon Link
                </label>
                <input
                  type="text"
                  value={draft.links?.amazon || ""}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      links: { ...draft.links, amazon: e.target.value },
                    })
                  }
                  className="w-full bg-[#140F0E] border border-stone-700 focus:border-[#FF9900] rounded-xl px-3 py-1.5 text-[11px] text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#2874F0] mb-1">
                  Flipkart Link
                </label>
                <input
                  type="text"
                  value={draft.links?.flipkart || ""}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      links: { ...draft.links, flipkart: e.target.value },
                    })
                  }
                  className="w-full bg-[#140F0E] border border-stone-700 focus:border-[#2874F0] rounded-xl px-3 py-1.5 text-[11px] text-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Features Bullets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-stone-300">
                Key Features & Verification Bullets
              </label>
              <button
                type="button"
                onClick={addFeature}
                className="text-xs text-[#D4AF37] hover:text-[#FDD835] flex items-center gap-1 font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Feature</span>
              </button>
            </div>

            <div className="space-y-2">
              {(draft.features || []).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    className="flex-1 bg-[#120E0D] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3 py-1.5 text-xs text-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(idx)}
                    className="p-1.5 text-stone-500 hover:text-rose-400 rounded-lg hover:bg-rose-950/30"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-stone-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs text-stone-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E59819] text-black font-extrabold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 text-black" />
              <span>Apply Product Edits</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

