"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail, Phone, Send, CheckCircle2, AlertCircle, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.889-9.888 9.889m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
    </svg>
  );
}

const INQUIRY_TOPICS = [
  "Product Purity & Authentication",
  "Pregnancy & Daily Wellness Recommendation",
  "Order Delivery & Express Dispatch",
  "Marketplace Purchase Help (Meesho / Amazon / Flipkart)",
  "Luxury Packaging & Gifting Sets",
  "Culinary & Chef Recommendations",
  "General Brand Question",
];

export default function InquirySection() {
  const { content } = useSiteContent();
  const company = content.company;
  const inquiry = content.inquiry;
  const theme = content.theme || { activeTheme: "traditional" };
  const activeTheme = theme.activeTheme || "traditional";
  const isTraditional = activeTheme === "traditional";
  const isProfessional = activeTheme === "professional";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    inquiryTopic: INQUIRY_TOPICS[0],
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      if (infoCardRef.current && formCardRef.current) {
        gsap.from([infoCardRef.current, formCardRef.current], {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.85,
          stagger: 0.2,
          ease: "power3.out",
          clearProps: "all",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          inquiryTopic: formData.inquiryTopic,
          topic: formData.inquiryTopic,
          inquiryType: formData.inquiryTopic,
          product: formData.inquiryTopic,
          quantity: "N/A",
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again or call our sales desk.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappChatUrl = `https://wa.me/${company.whatsappNumber || "917303817365"}?text=${encodeURIComponent(
    `Hello ${company.name}, I would like to chat with Customer Support regarding Kashmir Saffron Grade A++.`
  )}`;

  return (
    <section
      id="inquiry"
      ref={sectionRef}
      className={`py-24 text-white relative overflow-hidden transition-colors duration-500 ${
        isTraditional
          ? "bg-gradient-to-b from-[#14080B] via-[#1E0B12] to-[#14080B]"
          : isProfessional
          ? "bg-[#0C0D0E]"
          : "bg-gradient-to-b from-[#120F0D] via-[#1A1312] to-[#120F0D]"
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#881337]/15 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#881337]/50 border border-[#D4AF37]/30 text-[#FDD835] text-xs font-semibold uppercase tracking-widest shadow-crimson-glow animate-badge">
            <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
            {inquiry.badge}
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {inquiry.title}
          </h2>

          <p className="text-stone-300 text-sm sm:text-base font-light">
            {inquiry.subtitle}
          </p>
        </div>

        {/* Content Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Contact Card */}
          <div ref={infoCardRef} className="lg:col-span-5 space-y-5">
            <div className="bg-[#1C1614] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl card-hover-effect">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                  Customer Support Desk
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  Ammu Foods Direct Contact
                </h3>
                <p className="text-xs text-stone-300 font-light mt-1.5 leading-relaxed">
                  Inquiries are received directly by our team. Connect via official WhatsApp chat, direct phone, or submit your inquiry below.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                {/* 1. Dedicated WhatsApp Customer Support Button */}
                <a
                  href={whatsappChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-lift flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#17271B] to-[#121E15] border-2 border-[#25D366]/60 hover:border-[#25D366] transition duration-400 group cursor-pointer shadow-[0_4px_20px_rgba(37,211,102,0.18)]"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center text-white group-hover:scale-105 group-hover:rotate-3 transition duration-500 shadow-lg flex-shrink-0">
                    <WhatsAppIcon className="w-7 h-7 fill-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-[10px] uppercase font-bold text-[#25D366] tracking-wider">
                        Customer Support WhatsApp
                      </p>
                      <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    </div>
                    <p className="font-bold text-white group-hover:text-emerald-300 transition text-sm">
                      Chat on WhatsApp (+91 {company.rawPhone || "7303817365"})
                    </p>
                    <p className="text-[11px] text-stone-400">
                      Instant response &bull; Direct founder chat
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-[#25D366]/20 text-[#25D366] group-hover:translate-x-1 transition duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </a>

                {/* 2. Direct Sales Call */}
                <a
                  href={`tel:${company.rawPhone}`}
                  className="hover-lift flex items-center gap-4 p-3.5 rounded-2xl bg-[#241A18] border border-stone-800 hover:border-[#D4AF37] transition duration-400 group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#881337] flex items-center justify-center text-[#D4AF37] group-hover:scale-105 group-hover:rotate-2 transition duration-500 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-stone-400">Direct Phone Desk</p>
                    <p className="font-semibold text-white group-hover:text-[#FDD835] transition text-sm">
                      {company.phone}
                    </p>
                  </div>
                </a>

                {/* 3. Inquiry Email */}
                <a
                  href={`mailto:${company.email}`}
                  className="hover-lift flex items-center gap-4 p-3.5 rounded-2xl bg-[#241A18] border border-stone-800 hover:border-[#D4AF37] transition duration-400 group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#881337] flex items-center justify-center text-[#D4AF37] group-hover:scale-105 group-hover:rotate-2 transition duration-500 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-stone-400">Registered Support Email</p>
                    <p className="font-semibold text-white text-xs group-hover:text-[#FDD835] transition break-all">
                      {company.email}
                    </p>
                  </div>
                </a>

                {/* 4. Help Desk Response Speed */}
                <div className="hover-lift flex items-center gap-4 p-3.5 rounded-2xl bg-[#241A18] border border-stone-800 hover:border-[#D4AF37]/50 transition duration-400 group cursor-default">
                  <div className="w-11 h-11 rounded-xl bg-[#881337] flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition duration-500 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-stone-400">Response Speed</p>
                    <p className="font-semibold text-white text-xs group-hover:text-stone-200 transition">
                      {inquiry.responseSpeedText || "Typically responds in 15–30 minutes"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Regulatory Summary Box */}
            <div className="p-4 rounded-2xl bg-[#221618] border border-[#D4AF37]/30 flex items-center gap-3 text-xs text-stone-300">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
              <span>
                FSSAI Lic. <strong className="text-[#FDD835]">{company.fssaiLicense}</strong> &bull; Packaged by {company.manufacturer}, Jhansi.
              </span>
            </div>
          </div>

          {/* Right Column: Unified Interactive Inquiry Form */}
          <div ref={formCardRef} className="lg:col-span-7 bg-[#1C1614] border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative card-hover-effect">
            
            {success ? (
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto animate-badge">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-3xl font-bold text-white">
                    Inquiry Transmitted Successfully!
                  </h3>
                  <p className="text-stone-300 text-sm max-w-md mx-auto">
                    Your details have been dispatched to our registered administrator email (<strong>{company.email}</strong>). We will call or WhatsApp you at <strong>{formData.phone}</strong> shortly.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3.5 justify-center items-center">
                  {/* WhatsApp Fast Track Button */}
                  <a
                    href={`https://wa.me/${company.whatsappNumber || "917303817365"}?text=${encodeURIComponent(
                      `Hello Ammu Foods! I just submitted an inquiry for "${formData.inquiryTopic}". My name is ${formData.name} (${formData.phone}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Fast Track via WhatsApp Chat</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSuccess(false);
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        inquiryTopic: INQUIRY_TOPICS[0],
                        message: "",
                      });
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#241A18] hover:bg-stone-800 border border-[#D4AF37]/50 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                      Direct Customer Desk
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                      Send Us Your Inquiry
                    </h3>
                  </div>
                  <span className="text-[11px] text-[#D4AF37] font-semibold">
                    * Required
                  </span>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-rose-950/60 border border-rose-600/50 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* 1. Name & 2. Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ketan Singh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#14100E] border border-stone-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 outline-none transition"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 7303817365"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#14100E] border border-stone-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 outline-none transition"
                    />
                  </div>
                </div>

                {/* 3. Email & 4. Inquiry Topic */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. yourname@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#14100E] border border-stone-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 outline-none transition"
                    />
                  </div>

                  {/* Inquiry Topic */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Inquiry Topic *
                    </label>
                    <select
                      required
                      value={formData.inquiryTopic}
                      onChange={(e) => setFormData({ ...formData, inquiryTopic: e.target.value })}
                      className="w-full bg-[#14100E] border border-stone-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white outline-none transition cursor-pointer"
                    >
                      {INQUIRY_TOPICS.map((topic) => (
                        <option key={topic} value={topic} className="bg-[#14100E] text-white py-1">
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 5. Detailed Explanation (Optional Only) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-stone-300">
                      Detailed Explanation (Optional)
                    </label>
                    <span className="text-[10px] text-stone-400 font-medium">Optional</span>
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Share any specific queries, preferred quantity, questions on purity testing, or delivery location (optional)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#14100E] border border-stone-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl p-4 text-sm text-white placeholder-stone-500 outline-none transition"
                  />
                </div>

                {/* Submit button with shimmer */}
                <button
                  type="submit"
                  disabled={loading}
                  className="gold-btn-hover w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#F4A261] to-[#E59819] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-gold-glow flex items-center justify-center gap-2 disabled:opacity-50 shimmer-effect cursor-pointer"
                >
                  <Send className="w-4 h-4 fill-black" />
                  {loading ? "Transmitting..." : "Submit to Ammu Foods Desk"}
                </button>

                {/* Alternative Quick WhatsApp Direct Chat */}
                <div className="pt-2 text-center border-t border-stone-800/80">
                  <p className="text-[11px] text-stone-400 mb-1.5">
                    Your inquiry is delivered immediately to {company.email} &amp; logged in our secure system.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs">
                    <span className="text-stone-400">Prefer instant chat?</span>
                    <a
                      href={whatsappChatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-[#25D366] hover:text-emerald-300 hover:underline cursor-pointer"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                      <span>Chat directly on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
