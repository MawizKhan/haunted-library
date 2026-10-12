"use client";

import React, { useState, useEffect } from "react";
import { 
  initialMockData, 
  UserProfile, 
  Chamber, 
  Badge, 
  HouseStanding, 
  StudentScholar 
} from "@/data/mockData";
import { Header } from "@/components/Header";
import { ChambersView } from "@/components/ChambersView";
import { VaultView } from "@/components/VaultView";
import { HallOfFameView } from "@/components/HallOfFameView";
import { HODDeskView } from "@/components/HODDeskView";
import { LoginScreen } from "@/components/LoginScreen";
import { soundManager } from "@/utils/sound";

export default function HauntedLibraryApp() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialMockData.userProfile);
  const [chambers, setChambers] = useState<Chamber[]>(initialMockData.chambers);
  const [badges, setBadges] = useState<Badge[]>(initialMockData.badges);
  const [houses, setHouses] = useState<HouseStanding[]>(initialMockData.houses);
  const [topStudents, setTopStudents] = useState<StudentScholar[]>(initialMockData.topStudents);
  const [campusTickers, setCampusTickers] = useState<string[]>(initialMockData.campusTickers);
  const [activeTab, setActiveTab] = useState<"chambers" | "vault" | "hall" | "hod">("chambers");
  const [selectedChamberId, setSelectedChamberId] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

  // Helper to calculate rank based on XP
  const calculateRank = (xp: number) => {
    if (xp >= 1000) return "Grand Lexicographer";
    if (xp >= 650) return "High Inquisitor";
    if (xp >= 350) return "Cryptic Scholar";
    if (xp >= 150) return "Apprentice Occultist";
    return "Novice Reader";
  };

  // Handle quiz question answer
  const handleAnswerQuestion = (
    chamberId: number,
    questionId: string,
    isCorrect: boolean,
    xpReward: number
  ) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: userAnswers[questionId] || "" }));

    // Update answer state
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: chambers.find((c) => c.id === chamberId)?.questions.find((q) => q.id === questionId)?.options.find((o) => o.key === (isCorrect ? chambers.find((c) => c.id === chamberId)?.questions.find((q) => q.id === questionId)?.correctAnswer : ""))?.key || ""
    }));

    if (isCorrect && xpReward > 0) {
      setUserProfile((prev) => {
        const nextXp = prev.totalXp + xpReward;
        return {
          ...prev,
          totalXp: nextXp,
          rank: calculateRank(nextXp),
        };
      });

      // Update House Phoenix total XP
      setHouses((prev) =>
        prev.map((h) =>
          h.isUserHouse ? { ...h, totalXp: h.totalXp + xpReward } : h
        )
      );

      // Update Top Student entry for "You"
      setTopStudents((prev) =>
        prev.map((s) =>
          s.name.includes("You") ? { ...s, xp: s.xp + xpReward } : s
        )
      );
    }
  };

  // Handle Chamber Completion (when all questions answered correctly)
  const handleCompleteChamber = (chamberId: number) => {
    const currentChamber = chambers.find((c) => c.id === chamberId);
    if (!currentChamber || currentChamber.status === "completed") return;

    // 1. Mark chamber completed and unlock next chamber
    setChambers((prev) =>
      prev.map((c) => {
        if (c.id === chamberId) {
          return { ...c, status: "completed" };
        }
        if (c.id === chamberId + 1 && c.status === "locked") {
          return { ...c, status: "unlocked" };
        }
        return c;
      })
    );

    // 2. Unlock corresponding badge
    setBadges((prev) =>
      prev.map((b) =>
        b.dayNumber === currentChamber.day ? { ...b, unlocked: true } : b
      )
    );

    // 3. Award completion bonus XP
    setUserProfile((prev) => {
      const nextXp = prev.totalXp + currentChamber.xpReward;
      const nextCompleted = Math.min(5, prev.completedChambersCount + 1);
      return {
        ...prev,
        totalXp: nextXp,
        rank: calculateRank(nextXp),
        completedChambersCount: nextCompleted,
      };
    });

    // 4. Update House and Student
    setHouses((prev) =>
      prev.map((h) =>
        h.isUserHouse ? { ...h, totalXp: h.totalXp + currentChamber.xpReward } : h
      )
    );

    setTopStudents((prev) =>
      prev.map((s) =>
        s.name.includes("You")
          ? {
              ...s,
              xp: s.xp + currentChamber.xpReward,
              badgesUnlocked: Math.min(5, s.badgesUnlocked + 1),
            }
          : s
      )
    );

    // 5. Broadcast to campus ticker
    setCampusTickers((prev) => [
      `🎉 You just conquered Day ${currentChamber.day}: ${currentChamber.title}! (+${currentChamber.xpReward} XP)`,
      ...prev,
    ]);
  };

  // Handle Spook Button cheer
  const handleIncrementSpook = (houseId: string) => {
    setHouses((prev) =>
      prev.map((h) =>
        h.id === houseId ? { ...h, spookCount: h.spookCount + 1 } : h
      )
    );
    const targetHouse = houses.find((h) => h.id === houseId);
    if (targetHouse) {
      setCampusTickers((prev) => [
        `👻 Spook alert! ${targetHouse.name} just received a cheer!`,
        ...prev.slice(0, 10),
      ]);
    }
  };

  // Reset Progress
  const handleResetProgress = () => {
    soundManager.playClick();
    setUserProfile({ ...initialMockData.userProfile });
    setChambers([...initialMockData.chambers]);
    setBadges([...initialMockData.badges]);
    setHouses([...initialMockData.houses]);
    setTopStudents([...initialMockData.topStudents]);
    setUserAnswers({});
    setSelectedChamberId(1);
  };

  // Demo shortcut: Unlock all 5 chambers for evaluation
  const handleUnlockAllDemo = () => {
    soundManager.playChamberComplete();
    setUserProfile({
      ...initialMockData.userProfile,
      totalXp: 1250,
      rank: "Grand Lexicographer",
      completedChambersCount: 5,
    });
    setChambers((prev) =>
      prev.map((c) => ({ ...c, status: "completed" as const }))
    );
    setBadges((prev) =>
      prev.map((b) => ({ ...b, unlocked: true }))
    );
    setHouses((prev) =>
      prev.map((h) =>
        h.isUserHouse ? { ...h, totalXp: 14500 } : h
      )
    );
    setTopStudents((prev) =>
      prev.map((s) =>
        s.name.includes("You")
          ? { ...s, xp: 1250, badgesUnlocked: 5 }
          : s
      )
    );
    // Auto-fill answers for Day 1
    const completedAnswers: Record<string, string> = {
      "d1-q1": "B",
      "d1-q2": "C",
      "d2-q1": "B",
      "d2-q2": "A",
      "d3-q1": "A",
      "d4-q1": "A",
      "d5-q1": "A"
    };
    setUserAnswers(completedAnswers);
  };

  // Sync initial sound state
  useEffect(() => {
    soundManager.setMuted(!soundEnabled);
  }, [soundEnabled]);

  if (!isAuthenticated) {
    return (
      <LoginScreen
        onLoginSuccess={() => {
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans relative selection:bg-emerald-500 selection:text-slate-950">
      {/* Background ambient lighting elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-600/8 rounded-full blur-[120px]" />
      </div>

      {/* Main Header with navigation tabs */}
      <Header
        userProfile={userProfile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        campusTickers={campusTickers}
        onResetProgress={handleResetProgress}
        onUnlockAllDemo={handleUnlockAllDemo}
        onLogout={() => setIsAuthenticated(false)}
      />

      {/* Active Tab View Body */}
      <main className="relative z-10 flex-1 pb-16">
        {activeTab === "chambers" && (
          <ChambersView
            chambers={chambers}
            selectedChamberId={selectedChamberId}
            setSelectedChamberId={setSelectedChamberId}
            onAnswerQuestion={handleAnswerQuestion}
            onCompleteChamber={handleCompleteChamber}
            userAnswers={userAnswers}
          />
        )}

        {activeTab === "vault" && (
          <VaultView
            badges={badges}
            userProfile={userProfile}
          />
        )}

        {activeTab === "hall" && (
          <HallOfFameView
            houses={houses}
            topStudents={topStudents}
            userProfile={userProfile}
            onIncrementSpook={handleIncrementSpook}
          />
        )}

        {activeTab === "hod" && (
          <HODDeskView
            hodNotes={initialMockData.hodPedagogicalNotes}
            doofyQnAs={initialMockData.doofyQnAs}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-[#060911]/90 py-6 px-4 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">St. Jude&apos;s EMI English Department</span>
            <span>&bull;</span>
            <span>English Week 2026: The Haunted Library Challenge</span>
          </div>
          <div className="text-[11px] text-slate-600">
            HKDSE Paper 1 Reading Pedagogical Proof of Concept &bull; App Router &bull; Zero Backend
          </div>
        </div>
      </footer>
    </div>
  );
}
