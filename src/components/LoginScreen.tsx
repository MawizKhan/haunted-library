"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  Lock, 
  User, 
  Sparkles, 
  KeyRound, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Compass, 
  Ghost,
  ShieldCheck
} from "lucide-react";
import { soundManager } from "@/utils/sound";

export const HARDCODED_CREDENTIALS = {
  username: "reader404@stjudes.edu.hk",
  usernameAlias: "reader404",
  password: "horror2026",
  studentName: "You / Live Session (Reader 404)",
  school: "St. Jude's EMI College (Shatin)",
  house: "House Phoenix"
};

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    soundManager.playClick();

    const inputUser = username.trim().toLowerCase();
    const inputPass = password.trim();

    const isValidUser =
      inputUser === HARDCODED_CREDENTIALS.username.toLowerCase() ||
      inputUser === HARDCODED_CREDENTIALS.usernameAlias.toLowerCase();
    const isValidPass = inputPass === HARDCODED_CREDENTIALS.password;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (isValidUser && isValidPass) {
        soundManager.playCorrect();
        onLoginSuccess();
      } else {
        soundManager.playWrong();
        setErrorMessage(
          "Access Denied: Invalid Student Credentials. The archives remain sealed."
        );
      }
    }, 400);
  };

  const handleQuickAutofill = () => {
    soundManager.playClick();
    setUsername(HARDCODED_CREDENTIALS.username);
    setPassword(HARDCODED_CREDENTIALS.password);
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-[#070b13] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/8 rounded-full blur-[100px]" />
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-emerald-500/30 bg-[#0d1424]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/80">
        {/* Glow Accent Stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-purple-500 rounded-t-2xl" />

        {/* Portal Emblem */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-purple-950 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              <BookOpen className="w-8 h-8" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-500/30 mb-1.5">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>ST. JUDE&apos;S EMI COLLEGE &bull; SHATIN</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            THE HAUNTED LIBRARY
          </h1>
          <p className="text-xs text-purple-300/90 font-mono mt-0.5">
            5-Day Horror Challenge &bull; Archival Gateway
          </p>
        </div>

        {/* Hardcoded Credentials Notice Box */}
        <div className="mb-6 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5" /> AUTHORIZED ACCESS KEYS:
            </span>
            <button
              type="button"
              onClick={handleQuickAutofill}
              className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-500/30 transition-colors cursor-pointer"
            >
              ⚡ Click to Auto-fill
            </button>
          </div>
          <div className="space-y-1 font-mono text-[11px] text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-500">Username:</span>
              <span className="text-emerald-300 select-all font-semibold">
                {HARDCODED_CREDENTIALS.username}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Or Alias:</span>
              <span className="text-emerald-300 select-all font-semibold">
                {HARDCODED_CREDENTIALS.usernameAlias}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Password:</span>
              <span className="text-purple-300 select-all font-semibold">
                {HARDCODED_CREDENTIALS.password}
              </span>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>Candidate Email / Student ID</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. reader404@stjudes.edu.hk"
                className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Archival Passkey</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-slate-950 hover:from-emerald-400 hover:to-teal-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Compass className="w-4 h-4 animate-spin" />
                <span>Decrypting Archival Wards...</span>
              </>
            ) : (
              <>
                <Ghost className="w-4 h-4" />
                <span>Enter The Haunted Library</span>
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-[11px] font-mono text-slate-500">
          <span>Band 1 English Week Challenge 2026 &bull; Session Secured</span>
        </div>
      </div>
    </div>
  );
};
