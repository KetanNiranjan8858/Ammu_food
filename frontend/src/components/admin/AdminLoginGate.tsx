"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Send,
  Inbox,
} from "lucide-react";

interface AdminLoginGateProps {
  onLoginSuccess: (user: any, token?: string) => void;
  sessionNotice?: string;
}

export default function AdminLoginGate({ onLoginSuccess, sessionNotice }: AdminLoginGateProps) {
  // Screen modes: 'login' | 'forgot-request' | 'forgot-verify'
  const [mode, setMode] = useState<"login" | "forgot-request" | "forgot-verify">("login");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password states
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status & feedback
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // 1. Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed. Please check your credentials.");
      }

      onLoginSuccess(data.user, data.token);
    } catch (err: any) {
      setErrorMsg(err.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Request OTP (Forgot Password Phase 1)
  const handleRequestOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate reset code.");
      }

      setSuccessMsg(
        data.message ||
          `A 6-digit verification code has been dispatched to ${resetEmail}. Please check your inbox.`
      );
      setMode("forgot-verify");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to request password reset code.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP helper
  const handleResendOtp = async () => {
    if (!resetEmail) return;
    setResending(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not resend code.");
      setSuccessMsg(
        `A fresh 6-digit code has been dispatched to ${resetEmail}. Check your inbox or spam folder.`
      );
    } catch (err: any) {
      setErrorMsg(err.message || "Could not resend code. Please try again.");
    } finally {
      setResending(false);
    }
  };

  // 3. Handle Verify OTP and Reset Password (Forgot Password Phase 2)
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMsg("New passwords do not match. Please re-type carefully.");
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: resetEmail,
          otp,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Password reset failed.");
      }

      setSuccessMsg("Password updated successfully! You can now sign in with your new password.");
      setEmail(resetEmail);
      setPassword("");
      setMode("login");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#100D0B] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#881337]/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-md w-full relative z-10">
        {/* Brand Emblem */}
        <div className="text-center mb-6 space-y-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F4A261] to-[#B33010] p-0.5 mx-auto shadow-gold-glow flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#181210] flex items-center justify-center font-serif font-bold text-[#D4AF37] text-2xl">
              A
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#881337]/50 border border-[#D4AF37]/30 text-[#FDD835] text-[10px] font-bold uppercase tracking-widest shadow">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Restricted Access Control</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1.5">
              AMMU Control Desk
            </h1>
            <p className="text-xs text-stone-400 mt-0.5">
              Authorized Personnel Authentication
            </p>
          </div>
        </div>

        {/* Card Box */}
        <div className="bg-[#181311] border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          {/* Inactivity / Session Expiry Notice */}
          {sessionNotice && (
            <div className="p-3.5 bg-amber-950/70 border border-amber-500/60 rounded-xl text-amber-200 text-xs flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="font-medium leading-relaxed">{sessionNotice}</span>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-3 bg-rose-950/70 border border-rose-600/60 rounded-xl text-rose-300 text-xs flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMsg && (
            <div className="p-3 bg-emerald-950/70 border border-emerald-600/60 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* MODE 1: LOGIN FORM */}
          {/* ======================================================== */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Administrator Email</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ketansinghniranjan24@gmail.com"
                  className="w-full bg-[#120E0D] border border-stone-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-500 outline-none transition"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Password</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("forgot-request");
                      setResetEmail(email || "ketansinghniranjan24@gmail.com");
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                    className="text-[11px] text-[#D4AF37] hover:text-[#FDD835] hover:underline font-medium cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full bg-[#120E0D] border border-stone-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl pl-4 pr-10 py-2.5 text-xs text-white placeholder-stone-500 outline-none transition"
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="gold-btn-hover w-full py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#F4A261] to-[#E59819] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shimmer-effect mt-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 fill-black" />
                    <span>Sign In to Admin Panel</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Security Policy Reminder (No Public Registration) */}
              <div className="pt-3 border-t border-stone-800 text-center">
                <p className="text-[11px] text-stone-400 leading-relaxed flex items-center justify-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Public registration is disabled. Administrator access is restricted.</span>
                </p>
              </div>
            </form>
          )}

          {/* ======================================================== */}
          {/* MODE 2: FORGOT PASSWORD - STEP 1 (REQUEST OTP TO EMAIL) */}
          {/* ======================================================== */}
          {mode === "forgot-request" && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div className="space-y-1 text-center pb-2 border-b border-stone-800">
                <div className="w-10 h-10 rounded-full bg-[#881337] text-[#D4AF37] flex items-center justify-center mx-auto mb-1">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Reset Admin Password
                </h3>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  Enter your registered administrator email. A secure 6-digit verification code will be sent to your inbox.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Registered Administrator Email</span>
                </label>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="e.g. ketansinghniranjan24@gmail.com"
                  className="w-full bg-[#120E0D] border border-stone-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-500 outline-none transition"
                />
              </div>

              <div className="p-3 bg-[#1D1412] border border-[#D4AF37]/30 rounded-xl text-[11px] text-stone-300 space-y-1">
                <div className="flex items-center gap-1.5 text-[#D4AF37] font-semibold">
                  <Inbox className="w-3.5 h-3.5" />
                  <span>Registered Inbox Delivery</span>
                </div>
                <p className="text-stone-400 leading-normal">
                  For strict security, verification codes are dispatched directly to your registered email address.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="gold-btn-hover w-full py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#F4A261] to-[#E59819] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Dispatching OTP Code...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Verification Code to Mail</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className="w-full py-2.5 text-stone-400 hover:text-white text-xs font-semibold transition flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </button>
            </form>
          )}

          {/* ======================================================== */}
          {/* MODE 3: FORGOT PASSWORD - STEP 2 (VERIFY EMAIL OTP & NEW PASSWORD) */}
          {/* ======================================================== */}
          {mode === "forgot-verify" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-1 text-center pb-2 border-b border-stone-800">
                <div className="w-10 h-10 rounded-full bg-[#881337] text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-1">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Enter Verification Code
                </h3>
                <p className="text-xs text-stone-400 font-light">
                  A 6-digit code has been sent to your registered mail:
                </p>
                <div className="inline-block mt-1 px-3 py-1 bg-[#231714] border border-[#D4AF37]/40 rounded-full text-[#FDD835] text-xs font-medium font-mono">
                  {resetEmail}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#FDD835] mb-1.5 flex items-center justify-between">
                  <span>6-Digit Verification OTP *</span>
                  <span className="text-[10px] text-stone-400 font-normal">Check Inbox &amp; Spam</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full bg-[#120E0D] border-2 border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-2.5 text-center font-mono text-xl font-bold tracking-[0.4em] text-[#FDD835] placeholder:tracking-normal placeholder:text-stone-600 placeholder:text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  New Password * (Min. 6 chars)
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full bg-[#120E0D] border border-stone-700 focus:border-[#D4AF37] rounded-xl pl-4 pr-10 py-2.5 text-xs text-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Confirm New Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full bg-[#120E0D] border border-stone-700 focus:border-[#D4AF37] rounded-xl pl-4 pr-10 py-2.5 text-xs text-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="gold-btn-hover w-full py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#F4A261] to-[#E59819] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify Code &amp; Update Password</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-800">
                <button
                  type="button"
                  disabled={resending}
                  onClick={handleResendOtp}
                  className="text-stone-400 hover:text-[#D4AF37] transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${resending ? "animate-spin" : ""}`} />
                  <span>{resending ? "Resending..." : "Resend Code"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                  className="text-[#D4AF37] hover:underline font-semibold cursor-pointer"
                >
                  Return to Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
