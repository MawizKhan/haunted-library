"use client";

import React, { useState } from "react";
import { Badge, UserProfile } from "@/data/mockData";
import { 
  Lock, 
  Unlock, 
  Award, 
  Sparkles, 
  ShieldAlert, 
  Crown, 
  Radio, 
  Compass, 
  ScrollText, 
  BookOpenCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { CertificateModal } from "./CertificateModal";
import { soundManager } from "@/utils/sound";

interface VaultViewProps {
  badges: Badge[];
  userProfile: UserProfile;
}

export const VaultView: React.FC<VaultViewProps> = ({ badges, userProfile }) => {
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Map icon name to Lucide Icon
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpenCheck":
        return <BookOpenCheck className="w-8 h-8" />;
      case "Radio":
        return <Radio className="w-8 h-8" />;
      case "Compass":
        return <Compass className="w-8 h-8" />;
      case "ScrollText":
        return <ScrollText className="w-8 h-8" />;
      case "Crown":
        return <Crown className="w-8 h-8" />;
      default:
        return <Award className="w-8 h-8" />;
    }
  };

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const isAllCompleted = userProfile.completedChambersCount === 5 || unlockedCount === 5;

  const handleClaimCertificate = () => {
    if (!isAllCompleted) {
      soundManager.playWrong();
      return;
    }
    soundManager.playCorrect();
    setIsCertModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Vault Header Banner */}
      <div className="relative rounded-2xl border border-purple-900/60 bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 bg-purple-950/80 px-2.5 py-0.5 rounded border border-purple-500/30">
                Departmental Reliquary
              </span>
              <span className="text-xs font-mono text-slate-400">
                {unlockedCount} of 5 Badges Consecrated
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>THE HAUNTED VAULT OF SCHOLASTIC HONORS</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Every completed Chamber rewards a mystical badge sanctified by the English Panel. Unlock all 5 badges across the week to claim the Principal&apos;s Official Commendation Certificate for your academic record.
            </p>
          </div>

          {/* Certificate Claim Area */}
          <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950/80 backdrop-blur shrink-0 text-center w-full md:w-72 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
                Official Certificate
              </span>
            </div>

            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-amber-500 to-yellow-300 h-full transition-all duration-500"
                style={{ width: `${(unlockedCount / 5) * 100}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-400 font-mono mb-3">
              {isAllCompleted
                ? "All 5 Chambers Cleared! Sealed & Ready."
                : `${5 - unlockedCount} more chamber(s) required to break seal.`}
            </p>

            <button
              onClick={handleClaimCertificate}
              disabled={!isAllCompleted}
              className={`w-full py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                isAllCompleted
                  ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 hover:from-amber-400 hover:to-yellow-300 shadow-[0_0_20px_rgba(245,158,11,0.5)] cursor-pointer animate-bounce-slow"
                  : "bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed"
              }`}
            >
              {isAllCompleted ? (
                <>
                  <Award className="w-4 h-4 text-slate-950" />
                  <span>Claim Official Certificate</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-slate-600" />
                  <span>Claim Official Certificate (Locked)</span>
                </>
              )}
            </button>

            {/* Tester preview bypass */}
            <button
              onClick={() => {
                soundManager.playClick();
                setIsCertModalOpen(true);
              }}
              className="mt-2 text-[10px] text-purple-400 hover:text-purple-300 underline font-mono cursor-pointer"
            >
              (Preview Certificate Layout)
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 5 Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {badges.map((badge) => {
          const isUnlocked = badge.unlocked;

          return (
            <div
              key={badge.id}
              className={`group relative rounded-2xl border p-5 transition-all duration-300 flex flex-col justify-between select-none ${
                isUnlocked
                  ? "bg-gradient-to-b from-[#131b2e] to-[#0b0f19] border-purple-500/50 shadow-xl shadow-purple-950/40 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:-translate-y-1"
                  : "bg-slate-950/60 border-slate-800/80 opacity-70"
              }`}
            >
              {/* Badge Top Header */}
              <div>
                <div className="flex items-center justify-between gap-1 mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 uppercase font-semibold">
                    Day {badge.dayNumber} Chamber
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      badge.rarity === "Mythic"
                        ? "bg-rose-950/80 text-rose-300 border border-rose-500/40"
                        : badge.rarity === "Legendary"
                        ? "bg-amber-950/80 text-amber-300 border border-amber-500/40"
                        : badge.rarity === "Epic"
                        ? "bg-purple-950/80 text-purple-300 border border-purple-500/40"
                        : badge.rarity === "Rare"
                        ? "bg-cyan-950/80 text-cyan-300 border border-cyan-500/40"
                        : "bg-slate-900 text-slate-300 border border-slate-700"
                    }`}
                  >
                    {badge.rarity}
                  </span>
                </div>

                {/* Badge Icon Medallion */}
                <div className="my-3 flex justify-center">
                  <div
                    className={`relative w-20 h-20 rounded-2xl border-2 flex items-center justify-center transition-transform group-hover:scale-105 ${
                      isUnlocked
                        ? "bg-gradient-to-br from-purple-900/60 via-slate-900 to-indigo-950 border-purple-400 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                        : "bg-slate-900/80 border-slate-800 text-slate-600"
                    }`}
                  >
                    {getBadgeIcon(badge.iconName)}
                    {isUnlocked ? (
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-bold shadow">
                        ✓
                      </span>
                    ) : (
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs border border-slate-700">
                        <Lock className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="text-center mt-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-3 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>

              {/* Requirement & Flavor Quote */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                <div className="text-[11px] text-slate-400 leading-tight">
                  <strong className="text-slate-300 block font-mono text-[10px] uppercase">
                    UNLOCK CRITERIA:
                  </strong>
                  <span>{badge.requirement}</span>
                </div>

                <div className="text-[10px] text-slate-400/80 italic font-serif border-l border-purple-500/30 pl-2">
                  {badge.flavorQuote}
                </div>

                <div className="pt-1">
                  {isUnlocked ? (
                    <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> UNLOCKED & ARCHIVED
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> SEALED IN CHAMBER {badge.dayNumber}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        userProfile={userProfile}
      />
    </div>
  );
};
