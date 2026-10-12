"use client";

import React from "react";
import { 
  BookOpen, 
  Flame, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Trophy, 
  ShieldAlert, 
  HelpCircle, 
  RotateCcw,
  CheckCircle2,
  Lock,
  LogOut
} from "lucide-react";
import { UserProfile } from "@/data/mockData";
import { soundManager } from "@/utils/sound";

interface HeaderProps {
  userProfile: UserProfile;
  activeTab: "chambers" | "vault" | "hall" | "hod";
  setActiveTab: (tab: "chambers" | "vault" | "hall" | "hod") => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  campusTickers: string[];
  onResetProgress: () => void;
  onUnlockAllDemo: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  campusTickers,
  onResetProgress,
  onUnlockAllDemo,
  onLogout,
}) => {
  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundManager.setMuted(!nextState);
    if (nextState) {
      soundManager.playClick();
    }
  };

  const handleTabClick = (tab: "chambers" | "vault" | "hall" | "hod") => {
    soundManager.playClick();
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-950/60 bg-[#070b13]/90 backdrop-blur-md shadow-2xl shadow-black/80">
      {/* Top Banner & Marquee Ticker */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950/50 via-slate-900 to-purple-950/40 border-b border-emerald-500/20 py-1.5 px-4 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold shrink-0 tracking-wider">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="uppercase text-[11px] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
              CAMPUS WIRE
            </span>
          </div>

          {/* Marquee ticker */}
          <div className="overflow-hidden whitespace-nowrap flex-1 mask-fade">
            <div className="animate-ticker flex gap-12 text-slate-300">
              {campusTickers.concat(campusTickers).map((ticker, idx) => (
                <span key={idx} className="flex items-center gap-2 hover:text-emerald-300 transition-colors cursor-default">
                  {ticker}
                </span>
              ))}
            </div>
          </div>

          {/* Quick debug helpers for tester */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onUnlockAllDemo}
              title="Demo shortcut: Clear all 5 chambers to test certificate"
              className="text-[11px] text-purple-300 hover:text-purple-100 bg-purple-950/60 hover:bg-purple-900/80 px-2 py-0.5 rounded border border-purple-500/30 transition-all flex items-center gap-1"
            >
              <CheckCircle2 className="w-3 h-3 text-purple-400" />
              Demo: Unlock All
            </button>
            <button
              onClick={onResetProgress}
              title="Reset reading challenge state"
              className="text-[11px] text-slate-400 hover:text-slate-200 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700 hover:border-slate-500 transition-all flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* App Title & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-900/80 to-slate-950 border border-emerald-500/40 shadow-lg shadow-emerald-950/50 group">
            <BookOpen className="w-6 h-6 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                BAND 1 EMI ENGLISH WEEK
              </span>
              <span className="text-[10px] font-mono text-purple-300/80 bg-purple-950/40 px-1.5 py-0.5 rounded border border-purple-500/20">
                OCT 2026 EDITION
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-purple-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                THE HAUNTED LIBRARY
              </span>
              <span className="text-slate-500 font-light hidden sm:inline">|</span>
              <span className="text-xs sm:text-sm font-medium text-slate-400 hidden sm:inline">
                5-Day Horror Challenge
              </span>
            </h1>
          </div>
        </div>

        {/* User Stats & Badges Bar */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Streak */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-amber-500/30 px-3 py-1.5 rounded-lg shadow-sm">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400 uppercase leading-none">Streak</div>
              <div className="text-xs font-bold text-amber-300 leading-tight">
                {userProfile.streakDays} Day{userProfile.streakDays > 1 ? "s" : ""}
              </div>
            </div>
          </div>

          {/* Total XP */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-emerald-500/40 px-3 py-1.5 rounded-lg shadow-sm shadow-emerald-950/40">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400 uppercase leading-none">Total XP</div>
              <div className="text-xs font-bold text-emerald-300 leading-tight">
                {userProfile.totalXp} XP
              </div>
            </div>
          </div>

          {/* Rank Badge */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-purple-500/30 px-3 py-1.5 rounded-lg shadow-sm">
            <div className="text-left">
              <div className="text-[10px] text-slate-400 uppercase leading-none">Rank</div>
              <div className="text-xs font-semibold text-purple-300 leading-tight">
                {userProfile.rank}
              </div>
            </div>
          </div>

          {/* Progress / Completed chambers */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-cyan-500/30 px-3 py-1.5 rounded-lg shadow-sm">
            <div className="text-left">
              <div className="text-[10px] text-slate-400 uppercase leading-none">Chambers</div>
              <div className="text-xs font-bold text-cyan-300 leading-tight">
                {userProfile.completedChambersCount}/{userProfile.totalChambersCount}
              </div>
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? "Mute audio" : "Unmute audio"}
            title={soundEnabled ? "Mute eerie sound effects" : "Enable sound effects"}
            className={`p-2 rounded-lg border transition-all ${
              soundEnabled
                ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:bg-emerald-900/80"
                : "bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-500"
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Logout / Lock Portal Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onLogout();
            }}
            title="Lock Archival Portal & Log Out"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-rose-950/60 hover:border-rose-500/60 text-slate-400 hover:text-rose-300 text-xs font-mono transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </div>

      {/* 4 Navigation Tabs */}
      <div className="border-t border-slate-800/80 bg-[#060a12]/95 px-4 sm:px-6">
        <nav className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-4 overflow-x-auto py-2 scrollbar-none" aria-label="Main Navigation">
          {/* Tab 1 */}
          <button
            onClick={() => handleTabClick("chambers")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "chambers"
                ? "bg-gradient-to-r from-emerald-950/90 to-slate-900 text-emerald-300 border border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
            }`}
          >
            <BookOpen className={`w-4 h-4 ${activeTab === "chambers" ? "text-emerald-400" : "text-slate-400"}`} />
            <span>1. 5-Day Chambers</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              Interactive
            </span>
          </button>

          {/* Tab 2 */}
          <button
            onClick={() => handleTabClick("vault")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "vault"
                ? "bg-gradient-to-r from-purple-950/90 to-slate-900 text-purple-300 border border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
            }`}
          >
            <ShieldAlert className={`w-4 h-4 ${activeTab === "vault" ? "text-purple-400" : "text-slate-400"}`} />
            <span>2. Haunted Vault & Badges</span>
            {userProfile.completedChambersCount === 5 ? (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                Cert Ready!
              </span>
            ) : (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-700 flex items-center gap-0.5">
                <Lock className="w-2.5 h-2.5" /> 5 Badges
              </span>
            )}
          </button>

          {/* Tab 3 */}
          <button
            onClick={() => handleTabClick("hall")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "hall"
                ? "bg-gradient-to-r from-amber-950/90 to-slate-900 text-amber-300 border border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
            }`}
          >
            <Trophy className={`w-4 h-4 ${activeTab === "hall" ? "text-amber-400" : "text-slate-400"}`} />
            <span>3. Hall of Fame</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-950/80 text-amber-400 border border-amber-500/30">
              Spook! Live
            </span>
          </button>

          {/* Tab 4 */}
          <button
            onClick={() => handleTabClick("hod")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "hod"
                ? "bg-gradient-to-r from-cyan-950/90 to-slate-900 text-cyan-300 border border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
            }`}
          >
            <HelpCircle className={`w-4 h-4 ${activeTab === "hod" ? "text-cyan-400" : "text-slate-400"}`} />
            <span>4. HOD Desk</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
              Ask Doofy AI
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};
