"use client";

import React from "react";
import { InquiryConfig } from "@/lib/types";
import { Mail, Clock } from "lucide-react";

interface InquiryConfigTabProps {
  inquiry: InquiryConfig;
  onChange: (field: keyof InquiryConfig, value: string) => void;
}

export default function InquiryConfigTab({ inquiry, onChange }: InquiryConfigTabProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-stone-800 pb-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Mail className="w-5 h-5 text-[#D4AF37]" />
          <span>Unified Inquiry Desk Settings</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-1">
          Customize the headline and reassurance text on the single inquiry desk section (#inquiry).
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Badge Tag
          </label>
          <input
            type="text"
            value={inquiry.badge}
            onChange={(e) => onChange("badge", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
            placeholder="Official Saffron Inquiry Desk"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Section Title
          </label>
          <input
            type="text"
            value={inquiry.title}
            onChange={(e) => onChange("title", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition"
            placeholder="Have a Question or Need a Custom Order?"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Section Subtitle
          </label>
          <textarea
            rows={2}
            value={inquiry.subtitle}
            onChange={(e) => onChange("subtitle", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl p-3 text-sm text-white outline-none transition"
            placeholder="Whether you want a quick trial pack for home use..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Response Speed Notice</span>
          </label>
          <input
            type="text"
            value={inquiry.responseSpeedText || ""}
            onChange={(e) => onChange("responseSpeedText", e.target.value)}
            className="w-full bg-[#1A1412] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-[#FDD835] outline-none transition"
            placeholder="Typically responds in 15–30 minutes"
          />
        </div>
      </div>
    </div>
  );
}

