"use client";

import React from "react";
import { Save, RotateCcw, ExternalLink, CheckCircle2, AlertCircle, RefreshCw, LogOut, User } from "lucide-react";

interface AdminHeaderProps {
  isSaving: boolean;
  saveMessage: string | null;
  onSave: () => void;
  onReset: () => void;
  currentUser?: { name: string; email: string; role: string } | null;
  onLogout?: () => void;
}

export default function AdminHeader({
  isSaving,
  saveMessage,
  onSave,
  onReset,
  currentUser,
  onLogout,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#161210]/95 backdrop-blur-md border-b border-[#D4AF37]/30 px-4 sm:px-8 py-4 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B33010] flex items-center justify-center p-0.5 shadow-gold-glow">
            <div className="w-full h-full rounded-full bg-[#181210] flex items-center justify-center font-serif font-bold text-[#D4AF37] text-lg">
              A
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-white">
                AMMU Admin Control Panel
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#881337] text-[#FDD835] border border-[#D4AF37]/40">
                Site CMS
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Live Content Editor & Customer Leads Manager
            </p>
          </div>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Status Message */}
          {saveMessage && (
            <div
              className={`text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 border animate-fadeIn ${
                saveMessage.toLowerCase().includes("fail") || saveMessage.toLowerCase().includes("error")
                  ? "bg-rose-950/70 border-rose-500 text-rose-300"
                  : "bg-emerald-950/70 border-emerald-500 text-emerald-300"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{saveMessage}</span>
            </div>
          )}

          {/* View Live Website Button */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-semibold text-stone-300 hover:text-white flex items-center gap-1.5 transition"
          >
            <span>Preview Marketing Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Reset to Factory Defaults */}
          <button
            onClick={onReset}
            className="px-3 py-2 rounded-xl bg-stone-900/60 hover:bg-rose-950/40 border border-stone-700 hover:border-rose-500 text-xs text-stone-400 hover:text-rose-300 flex items-center gap-1.5 transition"
            title="Restore original factory content"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          {/* Save Button */}
          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4A261] to-[#E59819] hover:from-[#E59819] hover:to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-gold-glow transition disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Saving to Disk...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-black" />
                <span>Save All Changes</span>
              </>
            )}
          </button>

          {/* User Profile & Sign Out Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-rose-950/80 border border-stone-800 hover:border-rose-600 text-stone-300 hover:text-rose-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              title={currentUser ? `Signed in as ${currentUser.email}` : "Sign Out"}
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

