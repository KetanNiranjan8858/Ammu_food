"use client";

import React from "react";
import {
  Building2,
  Sparkles,
  ShoppingBag,
  Layers,
  ShieldCheck,
  Beaker,
  Heart,
  HelpCircle,
  Star,
  Mail,
  Phone,
  ChevronRight,
  Palette,
} from "lucide-react";

export type AdminTabKey =
  | "theme"
  | "company"
  | "hero"
  | "products"
  | "bulk"
  | "whyammu"
  | "nutrition"
  | "purity"
  | "benefits"
  | "faqs"
  | "reviews"
  | "inquiry"
  | "leads";

interface AdminSidebarProps {
  activeTab: AdminTabKey;
  onSelectTab: (tab: AdminTabKey) => void;
  productsCount: number;
  leadsCount: number;
  unreadLeadsCount?: number;
  reviewsCount?: number;
}

const TABS: { id: AdminTabKey; label: string; icon: React.ElementType; badge?: string }[] = [
  { id: "theme", label: "Seasonal Themes & Colors", icon: Palette },
  { id: "company", label: "Brand & Contacts", icon: Building2 },
  { id: "hero", label: "Hero Showcase & Deals", icon: Sparkles },
  { id: "products", label: "Products Catalog", icon: ShoppingBag },
  { id: "whyammu", label: "Why AMMu Comparison", icon: Layers },
  { id: "nutrition", label: "Nutrition & FSSAI", icon: ShieldCheck },
  { id: "purity", label: "Purity Testing Guide", icon: Beaker },
  { id: "benefits", label: "Benefits & Uses", icon: Heart },
  { id: "faqs", label: "FAQs Manager", icon: HelpCircle },
  { id: "reviews", label: "Customer Reviews", icon: Star },
  { id: "inquiry", label: "Inquiry Desk Text", icon: Mail },
  { id: "leads", label: "Customer Leads Inbox", icon: Phone },
];

export default function AdminSidebar({
  activeTab,
  onSelectTab,
  productsCount,
  leadsCount,
  unreadLeadsCount,
  reviewsCount,
}: AdminSidebarProps) {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0 bg-[#171311] border border-stone-800 rounded-3xl p-4 shadow-xl space-y-1.5 self-start">
      <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-stone-400 border-b border-stone-800/80 mb-2 flex items-center justify-between">
        <span>Content Sections</span>
        <span className="text-[#D4AF37]">11 Tabs</span>
      </div>

      <nav className="space-y-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition duration-200 text-left cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-[#D4AF37] to-[#E59819] text-black shadow-gold-glow"
                  : "text-stone-300 hover:text-white hover:bg-[#221917] border border-transparent hover:border-[#D4AF37]/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-[#D4AF37]"}`} />
                <span>{tab.label}</span>
              </div>

              {tab.id === "products" && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-extrabold ${
                    isActive ? "bg-black/20 text-black" : "bg-[#881337] text-[#FDD835]"
                  }`}
                >
                  {productsCount}
                </span>
              )}

              {tab.id === "leads" && leadsCount > 0 && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-extrabold flex items-center gap-1 ${
                    isActive
                      ? "bg-black/20 text-black"
                      : (unreadLeadsCount ?? 0) > 0
                      ? "bg-[#881337] text-[#FDD835] border border-[#D4AF37]/50"
                      : "bg-emerald-950 text-emerald-300 border border-emerald-600/40"
                  }`}
                  title={`${unreadLeadsCount ?? 0} unread leads waiting`}
                >
                  {(unreadLeadsCount ?? 0) > 0 && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
                  <span>{leadsCount}</span>
                </span>
              )}

              {tab.id === "reviews" && (reviewsCount ?? 0) > 0 && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-extrabold ${
                    isActive ? "bg-black/20 text-black" : "bg-[#D4AF37]/20 text-[#FDD835] border border-[#D4AF37]/40"
                  }`}
                >
                  {reviewsCount}
                </span>
              )}

              {tab.id !== "products" && tab.id !== "leads" && tab.id !== "reviews" && (
                <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? "text-black" : "text-stone-500"}`} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick Tips Box */}
      <div className="mt-6 pt-4 border-t border-stone-800/80 px-2 text-[11px] text-stone-400 space-y-1">
        <p className="font-semibold text-stone-300">💡 Instant Updates</p>
        <p className="leading-relaxed">
          Edits made here update the marketing page instantly when you click <strong>Save All Changes</strong>.
        </p>
      </div>
    </aside>
  );
}

