"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, Eye, EyeOff, X, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";

interface AdminPasswordVerifyModalProps {
  isOpen: boolean;
  adminEmail: string;
  onClose: () => void;
  onVerified: () => void;
  title?: string;
  description?: string;
}

export default function AdminPasswordVerifyModal({
  isOpen,
  adminEmail,
  onClose,
  onVerified,
  title = "Verify Administrator Password",
  description = "Brand Identity & Contact Details are protected parameters. Please verify your password to confirm and apply these changes.",
}: AdminPasswordVerifyModalProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setErrorMsg("Please enter your administrator password.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("ammu_admin_tab_token") : null;
      const res = await fetch("/api/admin/verify-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Incorrect password. Verification failed.");
      }

      // Success
      setPassword("");
      onVerified();
    } catch (err: any) {
      setErrorMsg(err.message || "Incorrect administrator password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#181210] border-2 border-[#D4AF37]/50 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800/60 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#881337] to-[#B33010] border border-[#D4AF37]/50 flex items-center justify-center mx-auto text-[#FDD835] shadow-gold-glow">
            <Lock className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#881337]/50 border border-[#D4AF37]/30 text-[#FDD835] text-[10px] font-bold uppercase tracking-widest shadow">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>High-Security Parameter Gate</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
            {title}
          </h3>

          <p className="text-xs text-stone-300 font-light leading-relaxed">
            {description}
          </p>

          <div className="inline-block mt-1 px-3 py-1 bg-[#231714] border border-[#D4AF37]/30 rounded-full text-[#FDD835] text-xs font-mono">
            {adminEmail || "Administrator Account"}
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-rose-950/70 border border-rose-600/60 rounded-xl text-rose-300 text-xs flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center justify-between">
              <span>Admin Password *</span>
              <span className="text-[10px] text-stone-400">Required to authorize change</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoFocus
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your administrator password"
                className="w-full bg-[#120E0D] border-2 border-[#D4AF37]/50 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl pl-4 pr-10 py-3 text-sm text-white placeholder-stone-500 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 bg-[#241A18] hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white font-semibold text-xs rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="gold-btn-hover flex-1 py-3 bg-gradient-to-r from-[#D4AF37] via-[#F4A261] to-[#E59819] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm &amp; Save</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

