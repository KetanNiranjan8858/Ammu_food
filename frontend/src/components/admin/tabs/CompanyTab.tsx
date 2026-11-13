"use client";

import React, { useState, useRef } from "react";
import { CompanyConfig } from "@/lib/types";
import { Building2, Phone, Mail, ShieldCheck, MapPin, Upload, Image as ImageIcon, Trash2, Sparkles, RefreshCw, Lock } from "lucide-react";

interface CompanyTabProps {
  company: CompanyConfig;
  onChange: (field: keyof CompanyConfig, value: string) => void;
}

export default function CompanyTab({ company, onChange }: CompanyTabProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onChange("logo", data.url);
    } catch (err: any) {
      console.warn("Upload endpoint issue, falling back to FileReader base64:", err);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange("logo", event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-800 pb-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#D4AF37]" />
          <span>Brand Identity & Contact Details</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-1">
          These credentials appear across the Navbar, Trust Badges, Footer, Inquiry Section, and official company disclosures.
        </p>
      </div>

      {/* High Security Parameter Notice */}
      <div className="p-3.5 bg-[#201514] border border-[#D4AF37]/50 rounded-2xl flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-stone-300">
          <div className="w-8 h-8 rounded-lg bg-[#881337] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-white">Protected Business Credentials</p>
            <p className="text-[11px] text-stone-400">Saving modifications to Brand Identity or Contact Details requires administrator password verification.</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#150F0E] border border-[#D4AF37]/30 rounded-full text-[10px] text-[#FDD835] font-bold uppercase tracking-wider flex-shrink-0">
          <Lock className="w-3 h-3 text-[#D4AF37]" />
          <span>Password Protected</span>
        </div>
      </div>

      {/* Brand Logo Editor Card */}
      <div className="p-5 sm:p-6 bg-[#1D1614] border-2 border-[#D4AF37]/40 rounded-3xl space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800/80 pb-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                Brand Logo Image
              </h3>
              <p className="text-xs text-stone-400">
                Upload your custom business logo to display in the header navbar and footer.
              </p>
            </div>
          </div>

          {company.logo && (
            <button
              type="button"
              onClick={() => onChange("logo", "")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-700/50 text-rose-300 hover:text-white hover:bg-rose-900 text-xs font-semibold transition self-start sm:self-auto cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset to Default Monogram</span>
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Logo Visual Preview Stage */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-[#140F0E] border-2 border-[#D4AF37]/60 p-1 shadow-gold-glow flex items-center justify-center overflow-hidden">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt="Company Logo Preview"
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <div className="w-full h-full rounded-xl bg-[#1A1513] flex items-center justify-center">
                  <span className="text-3xl font-serif font-bold text-[#D4AF37]">
                    A
                  </span>
                </div>
              )}
            </div>
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
              {company.logo ? "Custom Logo Active" : "Default Gold Monogram"}
            </span>
          </div>

          {/* Logo Actions and Input */}
          <div className="flex-1 w-full space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Logo Image URL or Local Path
              </label>
              <input
                type="text"
                value={company.logo || ""}
                onChange={(e) => onChange("logo", e.target.value)}
                placeholder="e.g. /images/ammu-logo.png or paste image URL / upload file below"
                className="w-full bg-[#140F0E] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-white outline-none transition"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="company-logo-upload-input"
              />
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#E59819] hover:brightness-110 active:scale-95 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Logo From Device</span>
                  </>
                )}
              </button>

              <span className="text-xs text-stone-400 font-light">
                PNG, SVG, JPG, or WEBP (Square or circle recommended)
              </span>
            </div>

            {uploadError && (
              <p className="text-xs text-rose-400">{uploadError}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Company Name */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Brand / Business Name
          </label>
          <input
            type="text"
            value={company.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
            placeholder="e.g. Ammu Foods"
          />
        </div>

        {/* Brand Title */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Brand Slogan / Title
          </label>
          <input
            type="text"
            value={company.brandTitle}
            onChange={(e) => onChange("brandTitle", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
            placeholder="e.g. Ammu - Leading Dried Fruits"
          />
        </div>

        {/* Tagline */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Tagline
          </label>
          <input
            type="text"
            value={company.tagline}
            onChange={(e) => onChange("tagline", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
            placeholder="e.g. 100% Pure Kashmiri Saffron (Kesar)"
          />
        </div>

        {/* Phone Display */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Display Phone Number</span>
          </label>
          <input
            type="text"
            value={company.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
            placeholder="+91 7303817365"
          />
        </div>

        {/* Raw Phone (for tel: links) */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Raw Digits Phone (tel: link)
          </label>
          <input
            type="text"
            value={company.rawPhone}
            onChange={(e) => onChange("rawPhone", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
            placeholder="7303817365"
          />
        </div>

        {/* WhatsApp Number (digits only with country code) */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            WhatsApp Number (e.g. 917303817365)
          </label>
          <input
            type="text"
            value={company.whatsappNumber}
            onChange={(e) => onChange("whatsappNumber", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
            placeholder="917303817365"
          />
        </div>

        {/* Help Desk Phone */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Help Desk Phone
          </label>
          <input
            type="text"
            value={company.helpDesk}
            onChange={(e) => onChange("helpDesk", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
            placeholder="+91-8090060273"
          />
        </div>

        {/* Primary Notification Email */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Primary Notification Email</span>
          </label>
          <input
            type="email"
            value={company.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
            placeholder="ketansinghniranjan24@gmail.com"
          />
          <p className="text-[10px] text-stone-400 mt-1">
            Customer inquiries submitted on the marketing page are routed to this address.
          </p>
        </div>

        {/* Secondary Email */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Secondary / Support Email
          </label>
          <input
            type="email"
            value={company.secondaryEmail}
            onChange={(e) => onChange("secondaryEmail", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
            placeholder="ammuonline21@gmail.com"
          />
        </div>

        {/* FSSAI License */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>FSSAI License Number</span>
          </label>
          <input
            type="text"
            value={company.fssaiLicense}
            onChange={(e) => onChange("fssaiLicense", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm font-mono text-[#FDD835] outline-none transition"
            placeholder="22720559000206"
          />
        </div>

        {/* Manufacturer */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Manufacturer / Packager
          </label>
          <input
            type="text"
            value={company.manufacturer}
            onChange={(e) => onChange("manufacturer", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
            placeholder="Infinity Food Consumer"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Facility / Packaging Address</span>
          </label>
          <input
            type="text"
            value={company.address}
            onChange={(e) => onChange("address", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
            placeholder="JDA Market Veerangana Nagar Medical Jhansi - 284128, Uttar Pradesh, India"
          />
        </div>
      </div>
    </div>
  );
}

