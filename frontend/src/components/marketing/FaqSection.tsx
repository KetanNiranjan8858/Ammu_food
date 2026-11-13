"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

export default function FaqSection() {
  const { content } = useSiteContent();
  const faqs = content.faqs || [];
  const theme = content.theme || { activeTheme: "traditional" };
  const activeTheme = theme.activeTheme || "traditional";
  const isTraditional = activeTheme === "traditional";
  const isProfessional = activeTheme === "professional";

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className={`py-20 text-white relative transition-colors duration-500 border-b ${
        isTraditional
          ? "bg-[#14060A] border-[#D4AF37]/20"
          : isProfessional
          ? "bg-[#0C0D0E] border-stone-800"
          : "bg-[#130E0C] border-[#D4AF37]/15"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest transition ${
              isTraditional
                ? "bg-[#881337]/50 text-[#FDD835]"
                : isProfessional
                ? "bg-[#18191D] text-stone-200"
                : "bg-[#881337]/40 text-[#FDD835]"
            }`}
          >
            <HelpCircle className={`w-3.5 h-3.5 ${isProfessional ? "text-stone-300" : "text-[#D4AF37]"}`} />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-300 text-sm font-light">
            Everything you need to know about AMMu Foods pure saffron, storage, and orders.
          </p>
        </div>

        {/* Clean Line-Divided Accordion (Box Containers Removed) */}
        <div className="border-t border-white/10 divide-y divide-white/10">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="transition-colors duration-300">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left py-5 sm:py-6 flex items-center justify-between gap-4 group transition cursor-pointer"
                >
                  <span
                    className={`font-serif text-base sm:text-lg font-bold transition duration-300 ${
                      isOpen
                        ? isProfessional ? "text-white" : "text-[#FDD835]"
                        : isProfessional ? "text-stone-200 group-hover:text-white" : "text-stone-200 group-hover:text-[#FDD835]"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 bg-[#D4AF37]/20 text-[#D4AF37]"
                        : "text-stone-500 group-hover:text-stone-300"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="pb-6 pr-6 text-xs sm:text-sm text-stone-300 leading-relaxed font-light animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
