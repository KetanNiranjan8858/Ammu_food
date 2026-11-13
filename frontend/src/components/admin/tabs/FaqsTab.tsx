"use client";

import React from "react";
import { FaqItem } from "@/lib/types";
import { HelpCircle, Plus, Trash2 } from "lucide-react";

interface FaqsTabProps {
  faqs: FaqItem[];
  onChange: (updated: FaqItem[]) => void;
}

export default function FaqsTab({ faqs, onChange }: FaqsTabProps) {
  const handleFaqChange = (index: number, field: keyof FaqItem, value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addFaq = () => {
    onChange([
      ...faqs,
      {
        q: "New question about AMMu Kashmiri Saffron?",
        a: "Answer explaining AMMu Foods pure saffron purity, packaging, or delivery details.",
      },
    ]);
  };

  const removeFaq = (index: number) => {
    if (window.confirm("Remove this FAQ item?")) {
      const updated = faqs.filter((_, idx) => idx !== index);
      onChange(updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#D4AF37]" />
            <span>Frequently Asked Questions Manager ({faqs.length})</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Edit common customer questions regarding prices, saffron storage, recipe usage, and marketplace orders.
          </p>
        </div>

        <button
          onClick={addFaq}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E59819] text-black font-extrabold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Add New FAQ</span>
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-5 bg-[#1C1614] border border-stone-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#D4AF37]">
                Question #{idx + 1}
              </span>
              <button
                onClick={() => removeFaq(idx)}
                className="text-xs text-stone-500 hover:text-rose-400 p-1 rounded-lg hover:bg-rose-950/30 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                Question Text
              </label>
              <input
                type="text"
                value={faq.q}
                onChange={(e) => handleFaqChange(idx, "q", e.target.value)}
                className="w-full bg-[#140F0E] border border-stone-700 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white font-bold outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                Answer Text
              </label>
              <textarea
                rows={3}
                value={faq.a}
                onChange={(e) => handleFaqChange(idx, "a", e.target.value)}
                className="w-full bg-[#140F0E] border border-stone-700 focus:border-[#D4AF37] rounded-xl p-3 text-xs text-stone-200 outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

