"use client";

import React, { useState } from "react";
import { HouseStanding, StudentScholar, UserProfile } from "@/data/mockData";
import { 
  Trophy, 
  Flame, 
  Ghost, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Medal,
  TrendingUp,
  Award
} from "lucide-react";
import { soundManager } from "@/utils/sound";

interface HallOfFameViewProps {
  houses: HouseStanding[];
  topStudents: StudentScholar[];
  userProfile: UserProfile;
  onIncrementSpook: (houseId: string) => void;
}

export const HallOfFameView: React.FC<HallOfFameViewProps> = ({
  houses,
  topStudents,
  userProfile,
  onIncrementSpook,
}) => {
  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState<"houses" | "students">("houses");
  const [spookFloatingList, setSpookFloatingList] = useState<{ id: number; houseId: string }[]>([]);

  const handleSpookClick = (houseId: string) => {
    soundManager.playSpook();
    onIncrementSpook(houseId);

    // Add floating ghost animation trigger
    const newGhost = { id: Date.now(), houseId };
    setSpookFloatingList((prev) => [...prev, newGhost]);

    setTimeout(() => {
      setSpookFloatingList((prev) => prev.filter((g) => g.id !== newGhost.id));
    }, 1200);
  };

  // Sort houses by total XP descending
  const sortedHouses = [...houses].sort((a, b) => b.totalXp - a.totalXp);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Banner */}
      <div className="relative rounded-2xl border border-amber-900/50 bg-gradient-to-r from-amber-950/40 via-slate-900 to-orange-950/40 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-500/30">
                INTER-HOUSE TOURNAMENT
              </span>
              <span className="text-xs font-mono text-slate-400">
                Live HKDSE Reading Week 2026
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <Trophy className="w-8 h-8 text-amber-400" />
              <span>THE HALL OF FAME: SANCTUM OF CHAMPIONS</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Inter-House standings for St. Jude&apos;s EMI College. Read chambers, answer comprehension challenges, and click <strong className="text-amber-300">Spook!</strong> to rally house spirits!
            </p>
          </div>

          {/* Toggle between House Standings & Top Students */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveLeaderboardTab("houses");
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeLeaderboardTab === "houses"
                  ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>House Standings</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveLeaderboardTab("students");
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeLeaderboardTab === "students"
                  ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Medal className="w-4 h-4" />
              <span>Top Scholars</span>
            </button>
          </div>
        </div>
      </div>

      {/* View 1: House Standings */}
      {activeLeaderboardTab === "houses" ? (
        <div className="space-y-6">
          {/* Top 3 Podiums */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sortedHouses.map((house, index) => {
              const isFirst = index === 0;
              const isUserHouse = house.isUserHouse;

              return (
                <div
                  key={house.id}
                  className={`relative rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 overflow-hidden ${
                    isUserHouse
                      ? "bg-gradient-to-b from-purple-950/70 via-slate-900 to-slate-950 border-purple-500 shadow-xl shadow-purple-950/50 ring-1 ring-purple-400"
                      : isFirst
                      ? "bg-gradient-to-b from-amber-950/60 via-slate-900 to-slate-950 border-amber-500/80 shadow-xl shadow-amber-950/40"
                      : "bg-[#0d1322]/80 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {/* Floating ghost animations for this house */}
                  {spookFloatingList
                    .filter((g) => g.houseId === house.id)
                    .map((ghost) => (
                      <span
                        key={ghost.id}
                        className="absolute bottom-12 right-6 text-2xl animate-float pointer-events-none"
                      >
                        👻 +1 Spook!
                      </span>
                    ))}

                  <div>
                    {/* Rank Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-black text-xs ${
                            index === 0
                              ? "bg-amber-500 text-slate-950 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                              : index === 1
                              ? "bg-slate-300 text-slate-950"
                              : index === 2
                              ? "bg-amber-700 text-white"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          #{index + 1}
                        </span>
                        {isUserHouse && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 font-bold">
                            YOUR HOUSE
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        {house.form}
                      </span>
                    </div>

                    {/* House Name & Motto */}
                    <h3 className="text-lg font-black text-white">{house.name}</h3>
                    <p className="text-xs text-slate-400 italic font-serif mt-0.5">
                      &ldquo;{house.motto}&rdquo;
                    </p>

                    {/* XP Big Display */}
                    <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                      <div className="text-left">
                        <span className="text-[10px] font-mono uppercase text-slate-400 block">
                          House Score
                        </span>
                        <span className="text-xl font-mono font-black text-amber-300">
                          {house.totalXp.toLocaleString()} XP
                        </span>
                      </div>
                      <Flame className="w-6 h-6 text-amber-400 animate-pulse" />
                    </div>
                  </div>

                  {/* Interactive Spook Button */}
                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Ghost className="w-3.5 h-3.5 text-purple-400" />
                      <span>{house.spookCount} Spooks</span>
                    </div>

                    <button
                      onClick={() => handleSpookClick(house.id)}
                      className="px-3 py-1.5 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-500/50 hover:border-purple-400 text-purple-200 text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                      title="Spook this house to send cheer and ghostly vibes!"
                    >
                      <Ghost className="w-3.5 h-3.5 text-purple-300" />
                      <span>Spook!</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Leaderboard Table */}
          <div className="rounded-2xl border border-slate-800 bg-[#0d1322]/90 backdrop-blur overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>OFFICIAL STANDINGS MATRIX</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Updated in real-time
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 font-mono text-slate-400 uppercase text-[11px]">
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">House Entity</th>
                    <th className="py-3 px-4">Cohort Form</th>
                    <th className="py-3 px-4">Spook Cheers</th>
                    <th className="py-3 px-4 text-right">Cumulative XP</th>
                    <th className="py-3 px-4 text-center">Cheer Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {sortedHouses.map((house, idx) => (
                    <tr
                      key={house.id}
                      className={`hover:bg-slate-900/60 transition-colors ${
                        house.isUserHouse ? "bg-purple-950/20" : ""
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-bold">
                        <span
                          className={`inline-block w-6 h-6 text-center leading-6 rounded ${
                            idx === 0
                              ? "bg-amber-500 text-slate-950 font-black"
                              : "text-slate-300"
                          }`}
                        >
                          #{idx + 1}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <span>{house.name}</span>
                          {house.isUserHouse && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-900 text-purple-200 border border-purple-500">
                              YOU
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono text-xs">
                        {house.form}
                      </td>
                      <td className="py-3 px-4 font-mono text-purple-300">
                        👻 {house.spookCount}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-amber-300 text-right text-base">
                        {house.totalXp.toLocaleString()} XP
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleSpookClick(house.id)}
                          className="px-2.5 py-1 rounded bg-slate-900 hover:bg-purple-950 border border-slate-700 hover:border-purple-500 text-xs font-mono text-slate-300 hover:text-purple-200 transition-all cursor-pointer"
                        >
                          + Spook!
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* View 2: Top Student Scholars */
        <div className="rounded-2xl border border-slate-800 bg-[#0d1322]/90 backdrop-blur overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono flex items-center gap-2">
              <Medal className="w-4 h-4 text-amber-400" />
              <span>INDIVIDUAL TOP LITERARY SCHOLARS</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Live Session Ranking
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 font-mono text-slate-400 uppercase text-[11px]">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Student Candidate</th>
                  <th className="py-3 px-4">Class & Form</th>
                  <th className="py-3 px-4">House Affiliation</th>
                  <th className="py-3 px-4">Badges Cleared</th>
                  <th className="py-3 px-4 text-right">Individual XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {topStudents.map((stud, idx) => {
                  const isYou = stud.name.includes("You");
                  return (
                    <tr
                      key={stud.id}
                      className={`hover:bg-slate-900/60 transition-colors ${
                        isYou ? "bg-emerald-950/30 font-bold" : ""
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-bold">
                        <span
                          className={`inline-block w-6 h-6 text-center leading-6 rounded ${
                            idx === 0
                              ? "bg-amber-500 text-slate-950 font-black"
                              : isYou
                              ? "bg-emerald-500 text-slate-950 font-bold"
                              : "text-slate-300"
                          }`}
                        >
                          #{idx + 1}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-mono text-slate-300">
                            {stud.avatarSeed}
                          </span>
                          <span>{isYou ? `${userProfile.name}` : stud.name}</span>
                          {isYou && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-500">
                              YOU
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono">
                        {stud.formClass}
                      </td>
                      <td className="py-3 px-4 text-purple-300 font-mono">
                        {stud.house}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-300">
                        {isYou ? `${userProfile.completedChambersCount}/5` : `${stud.badgesUnlocked}/5`} 🏅
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-amber-300 text-right text-base">
                        {isYou ? `${userProfile.totalXp} XP` : `${stud.xp} XP`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
