"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Volume2, Heart, CheckCircle2, ShieldCheck, ShowerHead, Scissors, Shirt, RefreshCw, Star, Check } from "lucide-react";
import confetti from "canvas-confetti";

interface NusairCleanlinessVisualStageProps {
  slideId: number;
  playChime?: (type: "correct" | "click" | "fanfare") => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

interface HygieneHabit {
  id: string;
  title: string;
  bangla: string;
  time: string;
  icon: string;
  completed: boolean;
  instruction: string;
}

export default function NusairCleanlinessVisualStage({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}: NusairCleanlinessVisualStageProps) {
  // Modes: "checklist" (Daily hygiene routine checklist) | "brushing" (Toothbrushing simulator) | "uniform" (Ironed uniform)
  const [activeTab, setActiveTab] = useState<"checklist" | "brushing" | "uniform">(() => {
    if (slideId === 4 || slideId === 5) return "brushing";
    if (slideId === 6) return "uniform";
    return "checklist";
  });

  // 4 Core Hygiene Habits
  const [habits, setHabits] = useState<HygieneHabit[]>([
    {
      id: "brushing",
      title: "Brush Teeth Twice a Day",
      bangla: "দিনে দুইবার দাঁত মাজা",
      time: "Morning & Night",
      icon: "🪥",
      completed: false,
      instruction: "He brushes his teeth once in the morning and once before bed at night.",
    },
    {
      id: "bath",
      title: "Daily Refreshing Bath",
      bangla: "পরিষ্কার পানিতে সাবান দিয়ে গোসল",
      time: "Every Day",
      icon: "🚿",
      completed: false,
      instruction: "He takes a refreshing bath daily with clean water and toilet soap.",
    },
    {
      id: "nails",
      title: "Trim Fingernails & Toenails",
      bangla: "প্রতি শুক্রবারে নখ কাটা",
      time: "Every Friday",
      icon: "✂️",
      completed: false,
      instruction: "Every Friday he trims nails so dirt cannot enter his mouth.",
    },
    {
      id: "uniform",
      title: "Clean & Ironed Uniform",
      bangla: "ইস্ত্রি করা পরিপাটি পোশাক",
      time: "School Days",
      icon: "👔",
      completed: false,
      instruction: "He always wears clean and neatly ironed school uniform.",
    },
  ]);

  // Toothbrushing animation timer state
  const [brushingCount, setBrushingCount] = useState<number>(0);
  const [isBrushingActive, setIsBrushingActive] = useState<boolean>(false);

  // Sync tab with slide changes
  useEffect(() => {
    if (slideId === 4 || slideId === 5) {
      setActiveTab("brushing");
    } else if (slideId === 6) {
      setActiveTab("uniform");
    } else {
      setActiveTab("checklist");
    }
  }, [slideId]);

  // Toggle habit completion
  const handleToggleHabit = (id: string) => {
    playChime?.("click");
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const nextState = !h.completed;
          if (nextState) {
            handleSpeak(`Great! ${h.title}. ${h.bangla}`);
          }
          return { ...h, completed: nextState };
        }
        return h;
      })
    );

    // Check if all will be completed
    const updated = habits.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h));
    if (updated.every((h) => h.completed)) {
      setTimeout(() => {
        playChime?.("fanfare");
        confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });
        handleSpeak("Superb! You completed all cleanliness habits! Because of clean habits, Nusair rarely falls ill!");
      }, 300);
    }
  };

  // Trigger tooth brushing simulation
  const handleStartBrushing = () => {
    setIsBrushingActive(true);
    playChime?.("click");
    handleSpeak("Brush, brush, brush your teeth twice a day! Clean teeth make a sparkling smile!");

    setTimeout(() => {
      setIsBrushingActive(false);
      setBrushingCount((prev) => prev + 1);
      playChime?.("fanfare");
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
    }, 1800);
  };

  // Reset habits
  const handleReset = () => {
    playChime?.("click");
    setHabits((prev) => prev.map((h) => ({ ...h, completed: false })));
  };

  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <div
      className={`w-full rounded-3xl bg-linear-to-b from-teal-50 via-cyan-50/40 to-sky-50 border-2 border-teal-200/80 p-3 sm:p-5 shadow-inner flex flex-col justify-between ${
        isFullTheater ? "min-h-[500px]" : "min-h-[420px]"
      }`}
    >
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-3 border-b border-teal-200/70 gap-2 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-teal-600 to-cyan-500 text-white flex items-center justify-center font-black text-xl shadow-md ring-2 ring-teal-200 shrink-0">
            🧼
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                Unit 6 • Lesson 1
              </span>
              <span className="text-[10px] font-bold text-cyan-700 bg-cyan-100/80 px-2 py-0.5 rounded-full">
                Class 3 English (pp. 83–86)
              </span>
            </div>
            <h3 className="font-black text-slate-800 text-sm sm:text-base leading-tight mt-0.5">
              Nusair's Cleanliness & Daily Hygiene (নুসাইরের সুঅভ্যাস)
            </h3>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-white/90 p-1 rounded-2xl border border-teal-200 shadow-2xs">
          <button
            onClick={() => {
              setActiveTab("checklist");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === "checklist"
                ? "bg-teal-600 text-white shadow-xs"
                : "text-slate-600 hover:text-teal-700 hover:bg-teal-50"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Habits</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("brushing");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === "brushing"
                ? "bg-teal-600 text-white shadow-xs"
                : "text-slate-600 hover:text-teal-700 hover:bg-teal-50"
            }`}
          >
            <span>🪥</span>
            <span>Brushing</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("uniform");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === "uniform"
                ? "bg-teal-600 text-white shadow-xs"
                : "text-slate-600 hover:text-teal-700 hover:bg-teal-50"
            }`}
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>Uniform</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="my-3 flex-1">
        {/* ======================================================== */}
        {/* TAB 1: 4 HYGIENE HABITS CHECKLIST                       */}
        {/* ======================================================== */}
        {activeTab === "checklist" && (
          <div className="space-y-3">
            {/* Top Streak & Shield Bar */}
            <div className="p-3 bg-linear-to-r from-teal-500 to-cyan-600 text-white rounded-2xl shadow-md flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl">
                  🛡️
                </div>
                <div>
                  <h4 className="font-black text-sm">
                    Healthy Hygiene Shield: {completedCount * 25}% Protected
                  </h4>
                  <p className="text-[11px] text-teal-100 font-medium">
                    Because of his clean habits, Nusair rarely falls ill!
                  </p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="px-2.5 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* 4 Interactive Habit Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  onClick={() => handleToggleHabit(habit.id)}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer relative flex items-center justify-between ${
                    habit.completed
                      ? "border-teal-500 bg-teal-50/80 shadow-md ring-2 ring-teal-300"
                      : "border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50/40 shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl p-1.5 rounded-xl bg-teal-100/60 border border-teal-200 shrink-0">
                      {habit.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h5 className="font-black text-slate-900 text-xs sm:text-sm">
                          {habit.title}
                        </h5>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-cyan-100 text-cyan-800">
                          {habit.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                        {habit.bangla}
                      </p>
                    </div>
                  </div>

                  {habit.completed ? (
                    <span className="w-7 h-7 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-4 h-4" />
                    </span>
                  ) : (
                    <span className="w-7 h-7 rounded-xl border-2 border-slate-300 text-transparent flex items-center justify-center shrink-0">
                      ✓
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Voice Prompt Box */}
            <div className="p-2.5 bg-white rounded-xl border border-teal-200 text-[11px] text-teal-900 font-medium flex items-center justify-between shadow-2xs">
              <span>💡 Tap each habit to mark it completed for Nusair's daily routine!</span>
              <button
                onClick={() =>
                  handleSpeak(
                    "Nusair is a neat and healthy boy who studies in Class 3. He strictly follows good cleanliness habits every single day. Because of his clean habits, Nusair rarely falls ill."
                  )
                }
                className="p-1 rounded-lg bg-teal-100 hover:bg-teal-200 text-teal-800 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: TOOTHBRUSHING SIMULATOR                           */}
        {/* ======================================================== */}
        {activeTab === "brushing" && (
          <div className="space-y-3">
            {/* Visual Toothbrushing Mirror */}
            <div className="relative rounded-2xl bg-linear-to-b from-sky-100 via-cyan-100 to-teal-100 border-2 border-teal-300 p-4 overflow-hidden shadow-md text-center">
              <span className="text-xs font-black text-teal-900 bg-white/80 px-2.5 py-0.5 rounded-xl border border-teal-200 shadow-2xs inline-block mb-2">
                🪥 Bathroom Mirror: Sparkling Clean Teeth Routine
              </span>

              {/* Animated Face / Teeth */}
              <div className="flex flex-col items-center justify-center py-2">
                <div className="text-6xl mb-2 transition-transform duration-300">
                  {isBrushingActive ? "😮" : "😄"}
                </div>
                <div
                  className={`w-32 h-10 rounded-2xl bg-white border-2 border-slate-300 flex items-center justify-center gap-1 shadow-inner relative ${
                    isBrushingActive ? "animate-pulse ring-4 ring-cyan-300" : ""
                  }`}
                >
                  <span className="text-base">🦷</span>
                  <span className="text-base">🦷</span>
                  <span className="text-base">🦷</span>
                  <span className="text-base">🦷</span>
                  <span className="text-base">🦷</span>
                  {brushingCount > 0 && (
                    <span className="absolute -top-2 -right-2 text-xl animate-spin duration-1000">✨</span>
                  )}
                </div>
                <span className="text-[11px] font-bold text-teal-800 mt-2 bg-white/70 px-2 py-0.5 rounded-full">
                  Twice a Day: Morning after waking up & Night before bed!
                </span>
              </div>

              {isBrushingActive && (
                <div className="mt-2 bg-teal-800/90 text-white p-2 rounded-xl text-center shadow-lg border border-teal-400 animate-fadeIn">
                  <p className="text-xs font-bold flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
                    <span>Brushing teeth carefully: 2 minutes of circular cleaning! 🪥</span>
                  </p>
                </div>
              )}
            </div>

            {/* Brushing Controls */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-teal-200 shadow-xs flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStartBrushing}
                  disabled={isBrushingActive}
                  className="px-4 py-2 rounded-xl bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <span>🪥</span>
                  <span>Start Brushing Simulator (দাঁত মাজা)</span>
                </button>
                <button
                  onClick={() =>
                    handleSpeak(
                      "He brushes his teeth twice a day—once after waking up in the morning and once before going to bed at night."
                    )
                  }
                  className="p-2 rounded-xl bg-teal-100 text-teal-800 hover:bg-teal-200 transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Teeth Cleaned:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-teal-100 text-teal-800 font-black text-xs">
                  {brushingCount} Times ✨
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CLEAN & IRONED UNIFORM                            */}
        {/* ======================================================== */}
        {activeTab === "uniform" && (
          <div className="space-y-3">
            {/* Visual Wardrobe & Uniform */}
            <div className="relative rounded-2xl bg-linear-to-b from-blue-50 via-teal-50 to-cyan-50 border-2 border-teal-300 p-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-teal-900 bg-white/80 px-2.5 py-0.5 rounded-xl border border-teal-200 shadow-2xs">
                  👔 Nusair's School Uniform & Friday Grooming
                </span>
                <span className="text-xs font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded-full">
                  Neat & Tidy Boy 🌟
                </span>
              </div>

              {/* Grooming Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
                <div className="p-3 bg-white rounded-xl border border-teal-200 shadow-2xs flex items-center gap-3">
                  <span className="text-3xl">👔</span>
                  <div>
                    <h5 className="font-black text-slate-900 text-xs sm:text-sm">Clean Ironed Shirt</h5>
                    <p className="text-[11px] text-slate-600">Always washed and neatly ironed before school.</p>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-teal-200 shadow-2xs flex items-center gap-3">
                  <span className="text-3xl">✂️</span>
                  <div>
                    <h5 className="font-black text-slate-900 text-xs sm:text-sm">Friday Nail Trimming</h5>
                    <p className="text-[11px] text-slate-600">Trims nails every Friday so dirt cannot enter mouth.</p>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-teal-200 shadow-2xs flex items-center gap-3">
                  <span className="text-3xl">🧼</span>
                  <div>
                    <h5 className="font-black text-slate-900 text-xs sm:text-sm">Toilet Soap & Clean Water</h5>
                    <p className="text-[11px] text-slate-600">Takes a refreshing bath every day to remove germs.</p>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-teal-200 shadow-2xs flex items-center gap-3">
                  <span className="text-3xl">👞</span>
                  <div>
                    <h5 className="font-black text-slate-900 text-xs sm:text-sm">Polished Clean Shoes</h5>
                    <p className="text-[11px] text-slate-600">Clean socks and polished black shoes for class.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Audio Button */}
            <div className="p-3 bg-white rounded-2xl border border-teal-200 shadow-xs flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">
                "He always wears clean and ironed school uniform. Because of his clean habits, Nusair rarely falls ill."
              </span>
              <button
                onClick={() =>
                  handleSpeak(
                    "He always wears clean and ironed school uniform. Every Friday, he trims his fingernails and toenails so that dirt cannot enter his mouth. Because of his clean habits, Nusair rarely falls ill."
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-black flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Profile Summary Badge */}
      <div className="pt-2 border-t border-teal-200/80 flex items-center justify-between text-[11px] text-slate-600 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-teal-950">👦 Nusair (৩য় শ্রেণি)</span>
          <span>•</span>
          <span>Neat, clean and healthy habits every day</span>
        </div>
        <div className="flex items-center gap-1 text-teal-800 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Clean habits keep diseases away!</span>
        </div>
      </div>
    </div>
  );
}
