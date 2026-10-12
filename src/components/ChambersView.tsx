"use client";

import React, { useState } from "react";
import { 
  Chamber, 
  VocabularyItem, 
  QuizQuestion 
} from "@/data/mockData";
import { 
  Lock, 
  CheckCircle, 
  Sparkles, 
  Clock, 
  MapPin, 
  BookMarked, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  Award, 
  Lightbulb,
  AlertTriangle,
  RotateCcw,
  Compass
} from "lucide-react";
import { soundManager } from "@/utils/sound";
import confetti from "canvas-confetti";

interface ChambersViewProps {
  chambers: Chamber[];
  selectedChamberId: number;
  setSelectedChamberId: (id: number) => void;
  onAnswerQuestion: (chamberId: number, questionId: string, isCorrect: boolean, xpReward: number) => void;
  onCompleteChamber: (chamberId: number) => void;
  userAnswers: Record<string, string>; // questionId -> selectedOptionKey
}

export const ChambersView: React.FC<ChambersViewProps> = ({
  chambers,
  selectedChamberId,
  setSelectedChamberId,
  onAnswerQuestion,
  onCompleteChamber,
  userAnswers,
}) => {
  const [activeVocab, setActiveVocab] = useState<VocabularyItem | null>(null);
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  const currentChamber = chambers.find((c) => c.id === selectedChamberId) || chambers[0];

  // Helper to trigger speech synthesis for reading text or vocab
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    if (isReadingAloud) {
      setIsReadingAloud(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88; // slightly slower, dramatic eerie tone
    utterance.pitch = 0.95;
    utterance.onend = () => setIsReadingAloud(false);
    utterance.onerror = () => setIsReadingAloud(false);
    setIsReadingAloud(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSelectChamber = (chamber: Chamber) => {
    if (chamber.status === "locked") {
      soundManager.playWrong();
      return;
    }
    soundManager.playClick();
    setSelectedChamberId(chamber.id);
    setActiveVocab(null);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
    }
  };

  const handleOptionSelect = (q: QuizQuestion, optionKey: string) => {
    // If already answered correctly, avoid duplicate action
    if (userAnswers[q.id] === q.correctAnswer) return;

    const isCorrect = optionKey === q.correctAnswer;
    if (isCorrect) {
      soundManager.playCorrect();
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#10b981", "#34d399", "#a855f7", "#06b6d4"]
      });
    } else {
      soundManager.playWrong();
    }

    onAnswerQuestion(currentChamber.id, q.id, isCorrect, isCorrect ? q.xpReward : 0);

    // Check if all questions in this chamber will now be completed correctly
    const nextAnswers = { ...userAnswers, [q.id]: optionKey };
    const allCorrect = currentChamber.questions.every(
      (question) => nextAnswers[question.id] === question.correctAnswer
    );

    if (allCorrect && currentChamber.status !== "completed") {
      setTimeout(() => {
        soundManager.playChamberComplete();
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ["#10b981", "#fbbf24", "#a855f7"]
        });
        onCompleteChamber(currentChamber.id);
      }, 400);
    }
  };

  // Helper to render text with clickable vocabulary tooltips
  const renderInteractiveText = (text: string) => {
    // Collect all words from vocabulary
    const vocabWords = currentChamber.vocabulary.map((v) => v.word.toLowerCase());
    if (vocabWords.length === 0) return <span>{text}</span>;

    // Build regex to match vocabulary words case-insensitively
    const regex = new RegExp(`\\b(${vocabWords.join("|")})\\b`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((segment, index) => {
          const lower = segment.toLowerCase();
          const match = currentChamber.vocabulary.find((v) => v.word.toLowerCase() === lower);
          if (match) {
            const isCurrentlySelected = activeVocab?.word.toLowerCase() === lower;
            return (
              <span
                key={index}
                onClick={() => {
                  soundManager.playClick();
                  setActiveVocab(match);
                }}
                className={`relative inline-block px-1.5 py-0.5 mx-0.5 rounded cursor-pointer font-medium transition-all ${
                  isCurrentlySelected
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(16,185,129,0.8)] scale-105"
                    : "bg-emerald-950/80 text-emerald-300 hover:text-white hover:bg-emerald-800 border-b-2 border-emerald-400 hover:shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                }`}
                title={`Click to view HKDSE vocabulary note for '${match.word}'`}
              >
                {segment}
                <span className="inline-block text-[9px] ml-1 text-emerald-300/80 font-mono">✦</span>
              </span>
            );
          }
          return <span key={index}>{segment}</span>;
        })}
      </span>
    );
  };

  const answeredCount = currentChamber.questions.filter(
    (q) => userAnswers[q.id] === q.correctAnswer
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* 5-Day Horizontal Chamber Carousel / Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400 animate-spin-slow" />
            <h2 className="text-sm font-bold tracking-wider text-slate-300 uppercase font-mono">
              THE 5 CHAMBERS OF ARCHIVAL TERROR
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Clear all 5 to claim the Grand Certificate
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {chambers.map((chamber) => {
            const isSelected = chamber.id === currentChamber.id;
            const isCompleted = chamber.status === "completed";
            const isLocked = chamber.status === "locked";

            return (
              <div
                key={chamber.id}
                onClick={() => handleSelectChamber(chamber)}
                className={`group relative p-3 rounded-xl border text-left transition-all duration-200 select-none ${
                  isLocked
                    ? "bg-slate-950/60 border-slate-800/80 opacity-60 cursor-not-allowed"
                    : isSelected
                    ? "bg-gradient-to-b from-emerald-950/90 to-slate-900 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400 cursor-pointer scale-[1.02]"
                    : isCompleted
                    ? "bg-slate-900/90 border-teal-500/50 hover:border-teal-400 cursor-pointer shadow-md"
                    : "bg-slate-900/70 border-slate-700/80 hover:border-emerald-500/60 hover:bg-slate-900 cursor-pointer"
                }`}
              >
                {/* Header row */}
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-300">
                    DAY {chamber.day}
                  </span>
                  <div>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40">
                        <CheckCircle className="w-3 h-3 text-emerald-400" /> CLEARED
                      </span>
                    ) : isLocked ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                        <Lock className="w-2.5 h-2.5" /> LOCKED
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                        UNLOCKED
                      </span>
                    )}
                  </div>
                </div>

                {/* Chamber Title */}
                <h3 className="text-xs font-bold text-slate-100 line-clamp-2 leading-tight group-hover:text-emerald-300 transition-colors">
                  {chamber.title}
                </h3>

                {/* Sub details */}
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{chamber.readTime}</span>
                  <span className="text-amber-400 font-semibold">+{chamber.xpReward} XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chamber Display: Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Reading Text & Vocabulary Tooltip Panel (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-[#0d1322]/90 backdrop-blur-md p-5 sm:p-6 shadow-xl relative overflow-hidden">
            {/* Top ambient glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-purple-500" />

            {/* Chamber Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-400 border border-emerald-500/30">
                    Day {currentChamber.day} Narrative
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">
                    {currentChamber.genre}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <Clock className="w-3 h-3" /> {currentChamber.readTime}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {currentChamber.title}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{currentChamber.loreLocation}</span>
                </div>
              </div>

              {/* Narrator audio trigger */}
              <button
                onClick={() =>
                  speakText(
                    currentChamber.parts.map((p) => p.content.join(" ")).join(" ")
                  )
                }
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isReadingAloud
                    ? "bg-rose-950/80 border-rose-500/60 text-rose-300 animate-pulse"
                    : "bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
                }`}
                title="Use browser speech synthesis to read text in atmospheric cadence"
              >
                {isReadingAloud ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                    <span>Stop Narrator</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Eerie Narrator</span>
                  </>
                )}
              </button>
            </div>

            {/* Synopsis */}
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs italic text-slate-300 mb-6 flex items-start gap-2">
              <span className="text-purple-400 font-mono font-bold not-italic">LORE ARCHIVE:</span>
              <span>{currentChamber.synopsis}</span>
            </div>

            {/* Reading Parts */}
            <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-200">
              {currentChamber.parts.map((part) => (
                <div key={part.partNumber} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-px bg-emerald-500/30 flex-1" />
                    <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase bg-slate-900/90 px-2.5 py-0.5 rounded border border-emerald-500/30">
                      {part.partTitle}
                    </span>
                    <div className="h-px bg-emerald-500/30 flex-1" />
                  </div>

                  <div className="space-y-3">
                    {part.content.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-slate-300 tracking-wide font-serif text-[15px] sm:text-[16px] leading-7 bg-slate-950/20 p-2 rounded">
                        {renderInteractiveText(paragraph)}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Vocabulary Drawer / Tooltip Bar */}
            <div className="mt-8 pt-5 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
                    HKDSE VOCABULARY CODEX (CLICK WORD TO INSPECT)
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">
                  {currentChamber.vocabulary.length} target words
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {currentChamber.vocabulary.map((vocab) => {
                  const isSelected = activeVocab?.word === vocab.word;
                  return (
                    <button
                      key={vocab.word}
                      onClick={() => {
                        soundManager.playClick();
                        setActiveVocab(vocab);
                      }}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-mono transition-all cursor-pointer ${
                        isSelected
                          ? "bg-emerald-500 text-slate-950 font-bold border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.7)]"
                          : "bg-slate-950/80 text-emerald-300 border-slate-800 hover:border-emerald-500/60 hover:bg-slate-900"
                      }`}
                    >
                      {vocab.word} <span className="opacity-70 font-sans">({vocab.partOfSpeech})</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Vocabulary Deep Dive Card */}
              {activeVocab && (
                <div className="mt-4 p-4 rounded-xl border border-emerald-500/50 bg-gradient-to-br from-slate-950 via-[#0d1624] to-emerald-950/40 shadow-xl shadow-black/60 relative animate-fadeIn">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2 mb-2">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold text-emerald-300 font-mono">
                          {activeVocab.word}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {activeVocab.pronunciation}
                        </span>
                        <span className="text-[10px] text-purple-300 uppercase px-1.5 py-0.2 rounded bg-purple-950/80 border border-purple-500/30">
                          {activeVocab.partOfSpeech}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => speakText(activeVocab.word)}
                      className="text-xs text-slate-400 hover:text-emerald-300 p-1 rounded bg-slate-900 border border-slate-700"
                      title="Audio Pronunciation"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-200 mb-2 leading-relaxed">
                    <strong className="text-slate-400">Definition:</strong> {activeVocab.definition}
                  </p>

                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200/90 mb-2 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-400 font-mono text-[11px] block">
                        HKDSE PAPER 1 EXAM TIP:
                      </strong>
                      <span>{activeVocab.dseExamTip}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 italic border-l-2 border-slate-700 pl-2">
                    &ldquo;{activeVocab.exampleSentence}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: HKDSE Comprehension Quiz (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-[#0d1322]/90 backdrop-blur-md p-5 sm:p-6 shadow-xl relative overflow-hidden">
            {/* Top ambient glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-400 to-cyan-500" />

            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase">
                  <Sparkles className="w-4 h-4" /> HKDSE COMPREHENSION CHECK
                </div>
                <h3 className="text-base font-bold text-white mt-0.5">
                  Critical Paper 1 Questions
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-400">
                  {answeredCount}/{currentChamber.questions.length} Correct
                </span>
                <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-emerald-400 h-full transition-all duration-300"
                    style={{
                      width: `${(answeredCount / currentChamber.questions.length) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {currentChamber.questions.map((q) => {
                const selectedKey = userAnswers[q.id];
                const hasAnswered = !!selectedKey;
                const isCorrect = selectedKey === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border transition-all ${
                      hasAnswered
                        ? isCorrect
                          ? "bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                          : "bg-rose-950/30 border-rose-500/50"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-slate-300 flex items-center justify-center shrink-0">
                          Q{q.questionNumber}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30 uppercase">
                          {q.skillTested}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-amber-400 font-semibold shrink-0">
                        +{q.xpReward} XP
                      </span>
                    </div>

                    {/* Question text */}
                    <p className="text-sm font-semibold text-slate-100 mb-3 leading-snug">
                      {q.question}
                    </p>

                    {/* Options */}
                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const isThisOptionSelected = selectedKey === opt.key;
                        const isThisCorrect = opt.key === q.correctAnswer;

                        let optionStyle =
                          "bg-slate-900/80 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-emerald-500/50 cursor-pointer";

                        if (hasAnswered) {
                          if (isThisOptionSelected && isCorrect) {
                            optionStyle =
                              "bg-emerald-950 border-emerald-400 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.4)]";
                          } else if (isThisOptionSelected && !isCorrect) {
                            optionStyle =
                              "bg-rose-950 border-rose-500 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.3)]";
                          } else if (!isThisOptionSelected && isThisCorrect && !isCorrect) {
                            optionStyle = "bg-slate-900/80 border-emerald-500/60 text-emerald-300/80";
                          } else {
                            optionStyle = "bg-slate-950/60 border-slate-800 text-slate-500";
                          }
                        }

                        return (
                          <div
                            key={opt.key}
                            onClick={() => handleOptionSelect(q, opt.key)}
                            className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-3 transition-all ${optionStyle}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`w-5 h-5 rounded flex items-center justify-center font-mono font-bold text-[11px] shrink-0 ${
                                  isThisOptionSelected
                                    ? isCorrect
                                      ? "bg-emerald-500 text-slate-950"
                                      : "bg-rose-500 text-white"
                                    : "bg-slate-800 text-slate-300"
                                }`}
                              >
                                {opt.key}
                              </span>
                              <span className="leading-snug">{opt.text}</span>
                            </div>
                            {hasAnswered && isThisOptionSelected && (
                              <span className="shrink-0 font-bold">
                                {isCorrect ? "✓" : "✗"}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation feedback */}
                    {hasAnswered && (
                      <div
                        className={`mt-3 p-3 rounded-lg text-xs leading-relaxed border ${
                          isCorrect
                            ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-200"
                            : "bg-rose-950/60 border-rose-500/40 text-rose-200"
                        }`}
                      >
                        <div className="font-bold font-mono text-[11px] mb-1 flex items-center gap-1">
                          {isCorrect ? (
                            <>
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                              <span>CORRECT ANSWER! (+{q.xpReward} XP)</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                              <span>INCORRECT — EXPLANATION:</span>
                            </>
                          )}
                        </div>
                        <p>{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Chamber Cleared Completion Banner */}
            {answeredCount === currentChamber.questions.length && (
              <div className="mt-5 p-4 rounded-xl border border-emerald-500/60 bg-gradient-to-r from-emerald-950/90 via-teal-950/70 to-slate-950 text-center shadow-lg shadow-emerald-950/50 animate-pulse-glow">
                <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mb-2">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wide">
                  Chamber {currentChamber.day} Cleared!
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  You earned +{currentChamber.xpReward} XP and unlocked the corresponding badge in the Haunted Vault!
                </p>
                {currentChamber.day < 5 && (
                  <button
                    onClick={() => {
                      const nextChamber = chambers.find((c) => c.day === currentChamber.day + 1);
                      if (nextChamber) handleSelectChamber(nextChamber);
                    }}
                    className="mt-3 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5 mx-auto cursor-pointer"
                  >
                    <span>Proceed to Day {currentChamber.day + 1} Chamber</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
