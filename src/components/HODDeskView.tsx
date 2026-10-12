"use client";

import React, { useState, useRef, useEffect } from "react";
import { HodNoteSection, DoofyQnA } from "@/data/mockData";
import { 
  Bot, 
  Send, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  MessageSquare, 
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Ghost
} from "lucide-react";
import { soundManager } from "@/utils/sound";

interface HODDeskViewProps {
  hodNotes: HodNoteSection[];
  doofyQnAs: DoofyQnA[];
}

interface ChatMessage {
  id: string;
  sender: "user" | "doofy";
  text: string;
  timestamp: string;
}

export const HODDeskView: React.FC<HODDeskViewProps> = ({
  hodNotes,
  doofyQnAs,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "doofy",
      text: "Greetings, intrepid scholar. I am Doofy, Senior Panel Chair & Spectral Archivist of St. Jude's English Department. Ask me anything concerning HKDSE Paper 1 Gothic reading strategies, sensory vocabulary, or archival secrets!",
      timestamp: "11:00 PM"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    soundManager.playClick();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");
    setIsTyping(true);

    // Find pre-programmed response by keyword matching
    const lowerQuery = query.toLowerCase();
    const matched = doofyQnAs.find((item) =>
      item.triggerKeywords.some((kw) => lowerQuery.includes(kw.toLowerCase()))
    );

    setTimeout(() => {
      let replyText = "";
      if (matched) {
        replyText = matched.response;
      } else if (lowerQuery.includes("hello") || lowerQuery.includes("hi")) {
        replyText =
          "Greetings! Ready to dissect the macabre prose of Hong Kong Gothic? Inquire about tone vs. mood, vocabulary strategies, or our Day 1 Shatin Tower lore!";
      } else if (lowerQuery.includes("help") || lowerQuery.includes("dse")) {
        replyText =
          "In HKDSE Paper 1 Section B2, examiners scrutinize your grasp of subtle nuance. Always locate the topic sentence, highlight auditory and visual adjectives, and avoid picking literal answers when metaphorical meaning is tested.";
      } else {
        replyText = `Fascinating observation regarding '${query}'. In Band 1 reading, every stylistic anomaly serves the overarching Gothic atmosphere. Pay close heed to the sensory adjectives (e.g., sibilant, crepuscular, inexorable) and notice how external gloom reflects internal dread!`;
      }

      soundManager.playCorrect();
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `doofy-${Date.now()}`,
          sender: "doofy",
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* HOD Header Banner */}
      <div className="relative rounded-2xl border border-cyan-900/60 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/30">
                Departmental Headquarters
              </span>
              <span className="text-xs font-mono text-slate-400">
                St. Jude&apos;s EMI English Panel
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-cyan-400" />
              <span>THE HOD DESK & PEDAGOGICAL SANCTUM</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Curricular alignment guidelines, HKDSE Paper 1 Section B2 reading frameworks, and direct strategy consultation with <strong className="text-cyan-300">Mr. Doofy</strong>, ghostly Head of English.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 6 cols: Pedagogical Focus Guidelines */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-[#0d1322]/90 backdrop-blur p-5 sm:p-6 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  Pedagogical Focus for English Week
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  Syllabus Mapping: HKDSE Curriculum & Assessment Guide
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {hodNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2.5 hover:border-cyan-500/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-cyan-300">
                      {note.title}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 shrink-0">
                      {note.category}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-amber-300/90 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Target: {note.examTarget}</span>
                  </div>

                  <ul className="space-y-1.5 pt-1 border-t border-slate-800/80 text-xs text-slate-300">
                    {note.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Teaching Framework Note */}
            <div className="mt-4 p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200/90 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-purple-300 font-mono text-[11px] block">
                  DEPARTMENTAL DIRECTIVE:
                </strong>
                <span>
                  Students who engage regularly with high-lexical-density horror narratives demonstrate a 34% increase in inferential accuracy on HKDSE Section B2 metaphorical analysis items.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 6 cols: Ask Doofy AI Chat Mock */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-[#0d1322]/90 backdrop-blur p-5 sm:p-6 shadow-xl flex flex-col h-[650px] relative overflow-hidden">
            {/* Ambient top glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-500" />

            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-900 to-slate-950 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                  <Ghost className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">Ask Doofy</h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                      ONLINE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Departmental Strategy Consultation
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                AI Mentor
              </span>
            </div>

            {/* Suggested Quick Prompt Chips */}
            <div className="mb-3 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Quick Consult Prompts:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {doofyQnAs.slice(0, 4).map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleSendMessage(q.questionPrompt)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/60 transition-all text-left truncate max-w-full cursor-pointer"
                  >
                    💬 {q.questionPrompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-2 scrollbar-thin">
              {messages.map((msg) => {
                const isDoofy = msg.sender === "doofy";

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      isDoofy ? "justify-start" : "justify-end"
                    }`}
                  >
                    {isDoofy && (
                      <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 text-xs mt-0.5">
                        <Ghost className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-xl p-3 text-xs sm:text-[13px] leading-relaxed ${
                        isDoofy
                          ? "bg-slate-950/90 border border-slate-800 text-slate-200 shadow-md whitespace-pre-line"
                          : "bg-cyan-600 text-white font-medium shadow-md shadow-cyan-950/50"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span
                        className={`text-[9px] font-mono block mt-1 ${
                          isDoofy ? "text-slate-500" : "text-cyan-200"
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>

                    {!isDoofy && (
                      <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 text-xs mt-0.5 font-mono">
                        YOU
                      </div>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-slate-950/60 p-2 rounded-lg border border-slate-800 w-fit">
                  <Ghost className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
                  <span>Doofy is consulting the Departmental Codex...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input Bar */}
            <div className="mt-3 pt-3 border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask Mr. Doofy about Gothic tone, HKDSE strategies..."
                  className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-950/50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
