"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSiteContent } from "@/context/SiteContentContext";
import { SiteContent, Product, WhyAmmuConfig, NutritionConfig, PurityGuideConfig, BenefitsConfig, FaqItem } from "@/lib/types";
import {
  AdminHeader,
  AdminSidebar,
  AdminTabKey,
  AdminLoginGate,
  AdminPasswordVerifyModal,
  CompanyTab,
  HeroTab,
  ProductsTab,
  BulkBannerTab,
  WhyAmmuTab,
  NutritionTab,
  PurityGuideTab,
  BenefitsTab,
  FaqsTab,
  ReviewsTab,
  InquiryConfigTab,
  InquiriesInboxTab,
  ThemeTab,
} from "@/components/admin";
import { Sparkles, Save, CheckCircle2 } from "lucide-react";

const TAB_INFO: Record<string, { label: string; desc: string }> = {
  theme: {
    label: "Seasonal Themes & Color Combinations",
    desc: "Switch between 3 luxury seasonal styles: Festive Traditional (with Mandalas), Professional Sleek, and Daily Classic.",
  },
  company: {
    label: "Brand Identity & Contact Details",
    desc: "Update official brand name, phone, WhatsApp, email, FSSAI license, and facility address.",
  },
  hero: {
    label: "Hero Showcase & Limited Offers",
    desc: "Edit top banner headlines, subtext, badges, and quick marketplace direct links.",
  },
  products: {
    label: "Product Catalog & Pricing",
    desc: "Add or edit 10+ saffron products, prices, weights, categories, and marketplace purchase URLs.",
  },
  whyammu: {
    label: "Why AMMu Comparison Table",
    desc: "Manage the comparison matrix of AMMu pure Grade-1 saffron vs market competitors.",
  },
  nutrition: {
    label: "Nutrition Facts & FSSAI Standards",
    desc: "Configure 100g nutritional breakdowns, ISO standards, and legal packaging disclosures.",
  },
  purity: {
    label: "Interactive Purity Testing Guide",
    desc: "Configure the 3 home authenticity tests: Cold Water, Baking Soda, and Warm Water tests.",
  },
  benefits: {
    label: "Culinary & Wellness Benefits",
    desc: "Edit benefits cards including pregnancy wellness, immunity, glowing skin, and recipes.",
  },
  faqs: {
    label: "Frequently Asked Questions",
    desc: "Add, modify, or remove FAQs to resolve common customer queries about saffron purity and shipping.",
  },
  reviews: {
    label: "Customer Reviews & Review Link",
    desc: "Manage customer reviews, star ratings, verified purchase status, and the external review link URL.",
  },
  inquiry: {
    label: "Customer Inquiry Desk Text",
    desc: "Edit customer inquiry headers, response speed guarantee, and lead capture messaging.",
  },
  leads: {
    label: "Customer Leads Inbox",
    desc: "Real-time log of customer inquiries received with contact phone numbers and requested quantities.",
  },
};

export default function AdminPage() {
  const { content, isSaving, saveMessage, updateContent, resetToDefaults } = useSiteContent();

  // Authentication State: null = verifying session, false = logged out, true = authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [sessionNotice, setSessionNotice] = useState<string>("");

  // Inactivity timeout: 5 minutes of no mouse/keyboard/scroll activity
  const IDLE_TIMEOUT_MS = 5 * 60 * 1000;
  const lastActivityRef = useRef<number>(Date.now());

  // Local draft state
  const [formData, setFormData] = useState<SiteContent>(content);
  const [activeTab, setActiveTab] = useState<AdminTabKey>("company");
  const editorRef = useRef<HTMLDivElement>(null);

  // Leads state
  const [leads, setLeads] = useState<any[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);

  // Security gate for sensitive parameters (Brand Identity & Contact Details)
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  const hasCompanyChanges = () => {
    if (!content?.company || !formData?.company) return false;
    return JSON.stringify(content.company) !== JSON.stringify(formData.company);
  };

  // Check existing session on mount:
  // Requires tab-isolated token (sessionStorage). Any newly opened tab starts logged out!
  useEffect(() => {
    async function verifySession() {
      // 1. Check tab-isolated token in sessionStorage (unique to this single tab)
      const tabToken = typeof window !== "undefined" ? sessionStorage.getItem("ammu_admin_tab_token") : null;
      if (!tabToken) {
        // Newly opened tab: require login
        setIsAuthenticated(false);
        return;
      }

      // 2. Check idle inactivity
      const lastActivity = Number(sessionStorage.getItem("ammu_admin_last_activity") || "0");
      if (lastActivity > 0 && Date.now() - lastActivity > IDLE_TIMEOUT_MS) {
        sessionStorage.removeItem("ammu_admin_tab_token");
        sessionStorage.removeItem("ammu_admin_last_activity");
        setIsAuthenticated(false);
        setSessionNotice("You were logged out after 5 minutes of inactivity for security. Please sign in again.");
        try {
          await fetch("/api/admin/logout", { method: "POST" });
        } catch {}
        return;
      }

      // 3. Verify tab token with backend
      try {
        const res = await fetch("/api/admin/me", {
          headers: { Authorization: `Bearer ${tabToken}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setIsAuthenticated(true);
            setCurrentUser(data.user);
            lastActivityRef.current = Date.now();
            sessionStorage.setItem("ammu_admin_last_activity", Date.now().toString());
            return;
          }
        }
        sessionStorage.removeItem("ammu_admin_tab_token");
        sessionStorage.removeItem("ammu_admin_last_activity");
        setIsAuthenticated(false);
      } catch (err) {
        setIsAuthenticated(false);
      }
    }
    verifySession();
  }, []);

  // Idle Inactivity Detection: Auto-logout after 5 minutes of no user interaction
  useEffect(() => {
    if (!isAuthenticated) return;

    const updateActivity = () => {
      lastActivityRef.current = Date.now();
      if (typeof window !== "undefined") {
        sessionStorage.setItem("ammu_admin_last_activity", Date.now().toString());
      }
    };

    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "click"];
    events.forEach((ev) => window.addEventListener(ev, updateActivity, { passive: true }));

    // Periodically verify idle threshold every 10 seconds
    const interval = setInterval(async () => {
      const elapsed = Date.now() - lastActivityRef.current;
      if (elapsed >= IDLE_TIMEOUT_MS) {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("ammu_admin_tab_token");
          sessionStorage.removeItem("ammu_admin_last_activity");
        }
        try {
          await fetch("/api/admin/logout", { method: "POST" });
        } catch {}
        setIsAuthenticated(false);
        setCurrentUser(null);
        setSessionNotice("You have been logged out after 5 minutes of inactivity for security. Please sign in again.");
      }
    }, 10000);

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, updateActivity));
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  // Sync draft whenever context refreshes
  useEffect(() => {
    if (content) {
      setFormData(content);
    }
  }, [content]);

  // Handle Tab Switch with smooth auto-scroll on mobile/tablet
  const handleSelectTab = (tab: AdminTabKey) => {
    setActiveTab(tab);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  // Fetch leads when user opens leads tab
  const fetchLeads = async () => {
    try {
      setLeadsLoading(true);
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        setLeads(data.inquiries || []);
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLeadsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "leads" && isAuthenticated) {
      fetchLeads();
    }
  }, [activeTab, isAuthenticated]);

  // Save handler with security gate for Brand Identity & Contact Details
  const handleSave = async () => {
    // If saving the company tab or if company brand/contact credentials were changed, require password verification
    if (activeTab === "company" || hasCompanyChanges()) {
      setIsVerifyModalOpen(true);
      return;
    }

    // Save non-sensitive tabs directly
    await updateContent(formData);
  };

  // Callback executed once administrator password has been validated
  const handleVerifiedSave = async () => {
    setIsVerifyModalOpen(false);
    await updateContent(formData);
  };

  // Reset handler
  const handleReset = async () => {
    if (
      window.confirm(
        "Are you sure you want to revert all content to factory defaults? Any unsaved edits will be discarded."
      )
    ) {
      await resetToDefaults();
    }
  };

  // Logout handler
  const handleLogout = async (reason?: string) => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("ammu_admin_tab_token");
      sessionStorage.removeItem("ammu_admin_last_activity");
    }
    setIsAuthenticated(false);
    setCurrentUser(null);
    if (reason === "idle") {
      setSessionNotice("You have been logged out after 5 minutes of inactivity for security. Please sign in again.");
    } else {
      setSessionNotice("");
    }
  };

  // Loading Session Gate
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#100D0B] flex flex-col items-center justify-center p-4 text-white">
        <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin mb-4" />
        <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold">
          Verifying AMMU Admin Security Credentials...
        </p>
      </div>
    );
  }

  // Login Gate (if not authenticated)
  if (!isAuthenticated) {
    return (
      <AdminLoginGate
        sessionNotice={sessionNotice}
        onLoginSuccess={(user, token) => {
          if (typeof window !== "undefined" && token) {
            sessionStorage.setItem("ammu_admin_tab_token", token);
            sessionStorage.setItem("ammu_admin_last_activity", Date.now().toString());
          }
          lastActivityRef.current = Date.now();
          setSessionNotice("");
          setIsAuthenticated(true);
          setCurrentUser(user);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#110D0C] text-white flex flex-col">
      {/* Top Save & Reset Toolbar */}
      <AdminHeader
        isSaving={isSaving}
        saveMessage={saveMessage}
        onSave={handleSave}
        onReset={handleReset}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left Modular Navigation Sidebar */}
        <AdminSidebar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          productsCount={formData.products?.length || 0}
          leadsCount={leads.length}
          unreadLeadsCount={leads.filter((l) => !l.status || l.status === "new").length}
          reviewsCount={formData.reviews?.items?.length || 0}
        />

        {/* Right Active Content Editor Tab */}
        <div ref={editorRef} className="flex-1 bg-[#171311] border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-xl scroll-mt-24">
          {activeTab === "theme" && (
            <ThemeTab
              theme={formData.theme}
              onChange={(updatedTheme) =>
                setFormData({
                  ...formData,
                  theme: updatedTheme,
                })
              }
            />
          )}

          {activeTab === "company" && (
            <CompanyTab
              company={formData.company}
              onChange={(field, value) =>
                setFormData({
                  ...formData,
                  company: { ...formData.company, [field]: value },
                })
              }
            />
          )}

          {activeTab === "hero" && (
            <HeroTab
              hero={formData.hero}
              onChange={(field, value) =>
                setFormData({
                  ...formData,
                  hero: { ...formData.hero, [field]: value },
                })
              }
            />
          )}

          {activeTab === "products" && (
            <ProductsTab
              products={formData.products || []}
              filters={formData.productFilters || []}
              onFiltersChange={(updatedFilters) =>
                setFormData({
                  ...formData,
                  productFilters: updatedFilters,
                })
              }
              onChange={(updatedProducts: Product[]) =>
                setFormData({
                  ...formData,
                  products: updatedProducts,
                })
              }
            />
          )}

          {activeTab === "bulk" && (
            <BulkBannerTab
              bulkBanner={formData.bulkBanner}
              onChange={(field, value) =>
                setFormData({
                  ...formData,
                  bulkBanner: { ...formData.bulkBanner, [field]: value },
                })
              }
            />
          )}

          {activeTab === "whyammu" && (
            <WhyAmmuTab
              whyAmmu={formData.whyAmmu}
              onChange={(updated: WhyAmmuConfig) =>
                setFormData({
                  ...formData,
                  whyAmmu: updated,
                })
              }
            />
          )}

          {activeTab === "nutrition" && (
            <NutritionTab
              nutrition={formData.nutrition}
              onChange={(updated: NutritionConfig) =>
                setFormData({
                  ...formData,
                  nutrition: updated,
                })
              }
            />
          )}

          {activeTab === "purity" && (
            <PurityGuideTab
              purityGuide={formData.purityGuide}
              onChange={(updated: PurityGuideConfig) =>
                setFormData({
                  ...formData,
                  purityGuide: updated,
                })
              }
            />
          )}

          {activeTab === "benefits" && (
            <BenefitsTab
              benefits={formData.benefits}
              onChange={(updated: BenefitsConfig) =>
                setFormData({
                  ...formData,
                  benefits: updated,
                })
              }
            />
          )}

          {activeTab === "faqs" && (
            <FaqsTab
              faqs={formData.faqs}
              onChange={(updated: FaqItem[]) =>
                setFormData({
                  ...formData,
                  faqs: updated,
                })
              }
            />
          )}

          {activeTab === "reviews" && (
            <ReviewsTab
              reviews={formData.reviews}
              onChange={(updatedReviews) =>
                setFormData({
                  ...formData,
                  reviews: updatedReviews,
                })
              }
            />
          )}

          {activeTab === "inquiry" && (
            <InquiryConfigTab
              inquiry={formData.inquiry}
              onChange={(field, value) =>
                setFormData({
                  ...formData,
                  inquiry: { ...formData.inquiry, [field]: value },
                })
              }
            />
          )}

          {activeTab === "leads" && (
            <InquiriesInboxTab
              leads={leads}
              isLoading={leadsLoading}
              onRefresh={fetchLeads}
              brandName={formData.company?.name || "AMMu Foods"}
            />
          )}
        </div>
      </main>

      {/* Security Verification Modal for Brand Identity & Contact Details */}
      <AdminPasswordVerifyModal
        isOpen={isVerifyModalOpen}
        adminEmail={currentUser?.email || "ketansinghniranjan24@gmail.com"}
        onClose={() => setIsVerifyModalOpen(false)}
        onVerified={handleVerifiedSave}
      />
    </div>
  );
}
