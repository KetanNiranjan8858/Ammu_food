"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  Clock,
  RefreshCw,
  User,
  Package,
  Trash2,
  CheckCircle2,
  Eye,
  EyeOff,
  Filter,
  AlertCircle,
  Inbox,
  CheckCheck,
} from "lucide-react";

function WhatsAppIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
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

interface InquiriesInboxTabProps {
  leads: any[];
  isLoading: boolean;
  onRefresh: () => void;
  brandName: string;
}

export default function InquiriesInboxTab({
  leads,
  isLoading,
  onRefresh,
  brandName,
}: InquiriesInboxTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "reviewed">("all");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Compute counts
  const unreadCount = leads.filter((l) => !l.status || l.status === "new").length;
  const reviewedCount = leads.filter((l) => l.status === "reviewed" || l.status === "contacted" || l.status === "completed").length;

  // Toggle Reviewed status
  const handleToggleReviewed = async (id: string, currentStatus: string) => {
    setActionLoadingId(id);
    const newStatus = (currentStatus === "reviewed" || currentStatus === "contacted" || currentStatus === "completed") ? "new" : "reviewed";
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to toggle reviewed status:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Delete an inquiry
  const handleDeleteInquiry = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete the inquiry from "${name || "this customer"}"?`)) {
      return;
    }
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/contact?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Filter inquiries
  const filtered = leads.filter((lead) => {
    // 1. Status Filter
    const isUnread = !lead.status || lead.status === "new";
    if (statusFilter === "unread" && !isUnread) return false;
    if (statusFilter === "reviewed" && isUnread) return false;

    // 2. Search query filter
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (lead.name || "").toLowerCase().includes(term) ||
      (lead.phone || "").toLowerCase().includes(term) ||
      (lead.email || "").toLowerCase().includes(term) ||
      (lead.topic || "").toLowerCase().includes(term) ||
      (lead.inquiryType || "").toLowerCase().includes(term) ||
      (lead.message || "").toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="border-b border-stone-800 pb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Inbox className="w-5 h-5 text-[#D4AF37]" />
            <span>Customer Inquiries Inbox ({leads.length})</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Real-time customer inquiries received from the Direct Customer Desk. Review leads, track unread items, or delete outdated submissions.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-auto flex-wrap">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 bg-[#150F0E] border border-stone-800 focus:border-[#D4AF37] rounded-xl text-xs text-white placeholder-stone-500 outline-none w-48 sm:w-60"
          />

          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-300 hover:text-white hover:border-[#D4AF37] transition cursor-pointer"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-[#D4AF37]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Status Filter Tabs (All / Unread / Reviewed) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-800/80 pb-3">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            statusFilter === "all"
              ? "bg-[#D4AF37] text-black shadow-gold-glow"
              : "bg-[#181311] border border-stone-800 text-stone-400 hover:text-white"
          }`}
        >
          <span>All Inquiries</span>
          <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-black/20 font-mono">
            {leads.length}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter("unread")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            statusFilter === "unread"
              ? "bg-[#881337] text-[#FDD835] border border-[#D4AF37]/50 shadow"
              : "bg-[#181311] border border-stone-800 text-stone-400 hover:text-white"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Unread / Left to Read</span>
          <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${unreadCount > 0 ? "bg-amber-400 text-black" : "bg-stone-800 text-stone-400"}`}>
            {unreadCount}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter("reviewed")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            statusFilter === "reviewed"
              ? "bg-emerald-950 text-emerald-300 border border-emerald-600 shadow"
              : "bg-[#181311] border border-stone-800 text-stone-400 hover:text-white"
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Reviewed</span>
          <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-stone-800 font-mono">
            {reviewedCount}
          </span>
        </button>

        {unreadCount > 0 && (
          <span className="text-[11px] text-amber-400 ml-auto hidden sm:inline">
            💡 You have <strong>{unreadCount}</strong> unread {unreadCount === 1 ? "inquiry" : "inquiries"} left to read.
          </span>
        )}
      </div>

      {/* Inquiries List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#171311] border border-stone-800/80 space-y-3">
          <Mail className="w-10 h-10 text-stone-600 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-stone-300">
            {statusFilter === "unread"
              ? "All caught up! No unread inquiries left."
              : statusFilter === "reviewed"
              ? "No reviewed inquiries found."
              : "No inquiries recorded yet."}
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            {statusFilter !== "all"
              ? "Switch filters or clear search to view all inquiries."
              : "When customers submit inquiries on the marketing page, their details will appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item, idx) => {
            const isUnread = !item.status || item.status === "new";
            const cleanDigits = (item.phone || "").replace(/[^0-9]/g, "");
            const leadTopic = item.topic || item.inquiryType || item.product || "General Inquiry";
            const whatsappUrl = `https://wa.me/${cleanDigits.startsWith("91") ? cleanDigits : `91${cleanDigits}`}?text=${encodeURIComponent(
              `Hello ${item.name}! Thank you for contacting ${brandName} regarding "${leadTopic}". We are here to assist you.`
            )}`;

            return (
              <div
                key={item.id || idx}
                className={`p-5 sm:p-6 rounded-3xl space-y-4 transition border ${
                  isUnread
                    ? "bg-[#1E1513] border-[#D4AF37]/60 shadow-[0_4px_25px_rgba(212,175,55,0.08)]"
                    : "bg-[#161210] border-stone-800/80 opacity-90 hover:opacity-100"
                }`}
              >
                {/* Top Row: User info, Status badge, Timestamp, Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800/80 pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center font-serif text-base flex-shrink-0 ${
                      isUnread
                        ? "bg-gradient-to-br from-[#881337] to-[#B33010] text-[#FDD835] ring-2 ring-[#D4AF37]/50"
                        : "bg-stone-800 text-stone-300"
                    }`}>
                      {(item.name || "C")[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-base text-white">
                          {item.name || "Anonymous Customer"}
                        </h4>

                        {/* Status Badge */}
                        {isUnread ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            <span>Unread</span>
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-emerald-950/70 text-emerald-300 border border-emerald-600/50 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>Reviewed</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-stone-400 mt-0.5">
                        <span className="font-mono text-stone-300">{item.phone || "No phone"}</span>
                        {item.email && (
                          <>
                            <span>&bull;</span>
                            <span className="text-stone-400">{item.email}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Header Actions: Review Toggle & Delete */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {/* Topic Badge */}
                    <span className="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-[#881337]/60 text-[#FDD835] border border-[#D4AF37]/30">
                      {leadTopic}
                    </span>

                    {/* Timestamp */}
                    {item.createdAt && (
                      <span className="text-[11px] text-stone-500 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    )}

                    {/* Delete Button */}
                    <button
                      type="button"
                      disabled={actionLoadingId === item.id}
                      onClick={() => handleDeleteInquiry(item.id, item.name)}
                      className="p-1.5 rounded-xl bg-stone-900 hover:bg-rose-950/70 border border-stone-800 hover:border-rose-600 text-stone-400 hover:text-rose-300 transition cursor-pointer"
                      title="Delete this inquiry permanently"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Lead Specifications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#120E0C] p-3.5 rounded-2xl border border-stone-800/60">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <div>
                      <span className="text-stone-400 block text-[10px]">Inquiry Topic:</span>
                      <span className="font-semibold text-white">{leadTopic}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="text-stone-400 block text-[10px]">Submission Source:</span>
                      <span className="font-semibold text-emerald-400">Direct Customer Desk (Online)</span>
                    </div>
                  </div>
                </div>

                {/* Customer Explanation Message */}
                {item.message && (
                  <div className="p-3.5 bg-[#140F0E] rounded-xl text-xs text-stone-300 leading-relaxed border-l-2 border-[#D4AF37]">
                    <span className="block text-[10px] uppercase font-bold text-stone-400 mb-1">
                      Detailed Customer Explanation:
                    </span>
                    &ldquo;{item.message}&rdquo;
                  </div>
                )}

                {/* Action Toolbar: Reviewed Toggle, WhatsApp, Phone, Email */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-800/60">
                  {/* Left: Contact Options */}
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow transition cursor-pointer"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp Customer</span>
                    </a>

                    {item.phone && (
                      <a
                        href={`tel:${cleanDigits}`}
                        className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Call Phone</span>
                      </a>
                    )}

                    {item.email && (
                      <a
                        href={`mailto:${item.email}?subject=Regarding your AMMu Saffron Inquiry`}
                        className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5 text-stone-400" />
                        <span>Send Email</span>
                      </a>
                    )}
                  </div>

                  {/* Right: Review Status Toggle & Delete */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={actionLoadingId === item.id}
                      onClick={() => handleToggleReviewed(item.id, item.status)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        isUnread
                          ? "bg-gradient-to-r from-[#D4AF37] to-[#E59819] text-black shadow-gold-glow hover:brightness-110"
                          : "bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700"
                      }`}
                    >
                      {isUnread ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-black" />
                          <span>Mark as Reviewed</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-stone-400" />
                          <span>Mark as Unread</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      disabled={actionLoadingId === item.id}
                      onClick={() => handleDeleteInquiry(item.id, item.name)}
                      className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-rose-950/70 border border-stone-800 hover:border-rose-600 text-rose-400 hover:text-rose-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
