"use client";

import React, { useState, useEffect } from "react";
import { X, RefreshCw, Phone, MessageCircle, Mail, Clock, Inbox, ShieldCheck } from "lucide-react";
import { InquiryRecord } from "@/lib/inquiryStore";

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InquiryDrawer({ isOpen, onClose }: InquiryDrawerProps) {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchInquiries();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl h-full bg-[#181311] border-l border-[#D4AF37]/40 flex flex-col justify-between text-white shadow-2xl">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-[#1E1715]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="font-serif text-xl font-bold text-white">
                Captured Inquiries & Leads
              </h3>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Live inquiries received on Ammu Foods
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchInquiries}
              disabled={loading}
              title="Refresh"
              className="p-2 text-stone-400 hover:text-[#D4AF37] bg-stone-900 rounded-lg transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white bg-stone-900 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {inquiries.length === 0 ? (
            <div className="py-20 text-center space-y-3 text-stone-500">
              <Inbox className="w-12 h-12 mx-auto stroke-1" />
              <p className="text-sm">No customer inquiries recorded yet.</p>
              <p className="text-xs">Once someone fills the form, it will appear here in real time.</p>
            </div>
          ) : (
            inquiries.map((inq) => {
              const cleanPhone = inq.phone.replace(/[^0-9]/g, "");
              const whatsappLink = `https://wa.me/${cleanPhone.length === 10 ? "91" + cleanPhone : cleanPhone}?text=${encodeURIComponent(
                `Hello ${inq.name}, thank you for contacting Ammu Foods regarding ${inq.product}. How can we assist you with your order?`
              )}`;

              return (
                <div
                  key={inq.id}
                  className="bg-[#211A18] border border-stone-800 hover:border-[#D4AF37]/50 rounded-2xl p-4 sm:p-5 space-y-3 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-serif font-bold text-base text-white">
                        {inq.name}
                      </h4>
                      <p className="text-xs text-[#D4AF37] font-semibold mt-0.5">
                        {inq.product} &bull; ({inq.quantity})
                      </p>
                    </div>
                    <span className="text-[10px] bg-[#881337] px-2 py-0.5 rounded text-stone-200">
                      {inq.inquiryType}
                    </span>
                  </div>

                  {inq.message && inq.message !== "Interested in Ammu Foods Saffron." && (
                    <div className="text-xs bg-[#171210] p-3 rounded-xl text-stone-300 border border-stone-800">
                      <span className="text-stone-500 block text-[10px] uppercase font-bold">Notes/City:</span>
                      {inq.message}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-800 text-xs">
                    <div className="flex items-center gap-1 text-stone-400 text-[11px]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(inq.createdAt).toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${cleanPhone}`}
                        className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition"
                      >
                        <Phone className="w-3 h-3 text-emerald-400" />
                        Call
                      </a>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg flex items-center gap-1.5 text-xs font-semibold transition"
                      >
                        <MessageCircle className="w-3 h-3 fill-current" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-[#1E1715] border-t border-stone-800 text-xs text-stone-400 text-center">
          Inquiries are permanently archived in <code className="text-[#D4AF37]">src/data/inquiries.json</code>
        </div>

      </div>
    </div>
  );
}

