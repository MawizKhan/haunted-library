"use client";

import React from "react";
import { X, Award, ShieldCheck, Printer, Sparkles } from "lucide-react";
import { UserProfile } from "@/data/mockData";
import { soundManager } from "@/utils/sound";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  userProfile,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-2xl border-2 border-amber-500/60 bg-gradient-to-br from-[#0b0f19] via-[#111827] to-[#070b13] p-6 sm:p-10 shadow-2xl shadow-amber-500/20 text-white overflow-hidden">
        {/* Ornate corner borders */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-400" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-400" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-400" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Content */}
        <div className="text-center space-y-4 py-2 border-4 border-double border-amber-500/30 p-6 rounded-xl bg-slate-950/40">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-mono tracking-widest text-xs uppercase">
            <Sparkles className="w-4 h-4" />
            <span>ST. JUDE&apos;S EMI COLLEGE &bull; ENGLISH DEPARTMENT</span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 drop-shadow">
            CERTIFICATE OF LITERARY COMMENDATION
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-mono uppercase tracking-widest">
            BAND 1 EMI ENGLISH WEEK 2026 &bull; THE HAUNTED LIBRARY CHALLENGE
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent my-3" />

          <p className="text-xs sm:text-sm text-slate-400 italic">
            This is proudly presented to commemorate the formidable intellect and literary courage of
          </p>

          <div className="py-2">
            <span className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide border-b-2 border-amber-400 pb-1 px-8 inline-block shadow-sm">
              {userProfile.name}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            For successfully braving all <strong className="text-amber-300">5 Chambers of Archival Horror</strong>, deciphering high-level Gothic lexicon, demonstrating Band 5** inferential reading prowess, and amassing{" "}
            <span className="text-emerald-400 font-mono font-bold">{userProfile.totalXp} XP</span> for{" "}
            <span className="text-purple-400 font-bold">{userProfile.activeHouse}</span>.
          </p>

          {/* Seals and Signatures */}
          <div className="pt-6 mt-4 border-t border-slate-800 grid grid-cols-3 items-end gap-4 text-center">
            <div>
              <div className="text-xs font-serif text-slate-300 italic border-b border-slate-700 pb-1 mb-1">
                Mr. Alistair Sterling, M.Ed.
              </div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Head of English Department (HOD)
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 to-yellow-800 border-2 border-amber-300 flex items-center justify-center text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                <ShieldCheck className="w-8 h-8 text-amber-200" />
              </div>
              <span className="text-[9px] font-mono text-amber-300 uppercase mt-1 tracking-wider">
                OFFICIAL SEAL
              </span>
            </div>

            <div>
              <div className="text-xs font-serif text-slate-300 italic border-b border-slate-700 pb-1 mb-1">
                Sister Mary Ignatius, O.S.B.
              </div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Principal & Academic Dean
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
          >
            <Printer className="w-4 h-4" />
            Print / Save Certificate PDF
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
