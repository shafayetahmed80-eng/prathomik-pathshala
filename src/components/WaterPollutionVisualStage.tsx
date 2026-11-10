"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Volume2, Heart, Trash2, Megaphone, AlertTriangle, ShieldCheck, Fish, RefreshCw, Star, Check } from "lucide-react";
import confetti from "canvas-confetti";

interface WaterPollutionVisualStageProps {
  slideId: number;
  playChime?: (type: "correct" | "click" | "fanfare") => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

interface TrashItem {
  id: string;
  name: string;
  bangla: string;
  icon: string;
  cleaned: boolean;
}

export default function WaterPollutionVisualStage({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}: WaterPollutionVisualStageProps) {
  // Modes: "pond" (Interactive pond cleanup) | "rally" (Student rally & placards) | "diseases" (Waterborne disease guide)
  const [activeTab, setActiveTab] = useState<"pond" | "rally" | "diseases">(() => {
    if (slideId === 4 || slideId === 5) return "pond";
    if (slideId === 6) return "rally";
    return "pond";
  });

  // Floating trash items to clean up
  const [trashList, setTrashList] = useState<TrashItem[]>([
    { id: "plastic1", name: "Plastic Bottle", bangla: "প্লাস্টিকের বোতল", icon: "🧴", cleaned: false },
    { id: "chips1", name: "Chips Packet", bangla: "চিপসের খালি প্যাকেট", icon: "🍟", cleaned: false },
    { id: "garbage1", name: "Kitchen Garbage", bangla: "রান্নাঘরের বর্জ্য", icon: "🗑️", cleaned: false },
    { id: "clothes1", name: "Greasy Waste", bangla: "তেলতেলে ময়লা", icon: "🧼", cleaned: false },
  ]);

  // Rally state
  const [rallyCount, setRallyCount] = useState<number>(0);
  const [isChanting, setIsChanting] = useState<boolean>(false);

  // Sync tab with slide
  useEffect(() => {
    if (slideId === 5) {
      setActiveTab("pond");
    } else if (slideId === 6) {
      setActiveTab("rally");
    } else if (slideId === 2) {
      setActiveTab("diseases");
    } else {
      setActiveTab("pond");
    }
  }, [slideId]);

  // Clean single trash item
  const handleCleanTrash = (id: string) => {
    playChime?.("correct");
    setTrashList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          handleSpeak(`Cleaned up ${item.name}! Good deed!`);
          return { ...item, cleaned: true };
        }
        return item;
      })
    );

    const remaining = trashList.filter((item) => item.id !== id && !item.cleaned).length;
    if (remaining === 0) {
      setTimeout(() => {
        playChime?.("fanfare");
        confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });
        handleSpeak("The village pond is now sparkling clean and safe for all living creatures!");
      }, 300);
    }
  };

  // Reset trash
  const handleResetPond = () => {
    playChime?.("click");
    setTrashList((prev) => prev.map((item) => ({ ...item, cleaned: false })));
  };

  // Start Rally Chant
  const handleStartRally = () => {
    setIsChanting(true);
    playChime?.("click");
    handleSpeak(
      "Save our water! Protect our village pond! Stop throwing plastics and dirty garbage! Clean water is life!"
    );

    setTimeout(() => {
      setIsChanting(false);
      setRallyCount((prev) => prev + 1);
      playChime?.("fanfare");
      confetti({ particleCount: 35, spread: 70, origin: { y: 0.5 } });
    }, 2200);
  };

  const cleanedCount = trashList.filter((t) => t.cleaned).length;
  const cleanlinessPercentage = Math.round((cleanedCount / trashList.length) * 100);

  return (
    <div
      className={`w-full rounded-3xl bg-linear-to-b from-sky-50 via-teal-50/40 to-emerald-50 border-2 border-teal-200/80 p-3 sm:p-5 shadow-inner flex flex-col justify-between ${
        isFullTheater ? "min-h-[500px]" : "min-h-[420px]"
      }`}
    >
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-3 border-b border-teal-200/70 gap-2 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-cyan-600 to-teal-500 text-white flex items-center justify-center font-black text-xl shadow-md ring-2 ring-teal-200 shrink-0">
            🌊
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                Unit 7 • Lesson 1
              </span>
              <span className="text-[10px] font-bold text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded-full">
                Village Pond Ecology (pp. 97–100)
              </span>
            </div>
            <h3 className="font-black text-slate-800 text-sm sm:text-base leading-tight mt-0.5">
              Shihab & Kaniz at the Village Pond (পুকুরের পানি দূষণ প্রতিরোধ)
            </h3>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-white/90 p-1 rounded-2xl border border-teal-200 shadow-2xs">
          <button
            onClick={() => {
              setActiveTab("pond");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === "pond"
                ? "bg-teal-600 text-white shadow-xs"
                : "text-slate-600 hover:text-teal-700 hover:bg-teal-50"
            }`}
          >
            <Fish className="w-3.5 h-3.5" />
            <span>Pond Cleanup</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("rally");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === "rally"
                ? "bg-teal-600 text-white shadow-xs"
                : "text-slate-600 hover:text-teal-700 hover:bg-teal-50"
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Student Rally</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("diseases");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === "diseases"
                ? "bg-teal-600 text-white shadow-xs"
                : "text-slate-600 hover:text-teal-700 hover:bg-teal-50"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Health</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="my-3 flex-1">
        {/* ======================================================== */}
        {/* TAB 1: VILLAGE POND CLEANUP SIMULATOR                    */}
        {/* ======================================================== */}
        {activeTab === "pond" && (
          <div className="space-y-3">
            {/* Visual Pond Graphic */}
            <div
              className={`relative rounded-2xl border-2 p-4 overflow-hidden shadow-md transition-all duration-500 ${
                cleanlinessPercentage === 100
                  ? "bg-linear-to-b from-sky-200 via-cyan-100 to-teal-200 border-teal-400"
                  : "bg-linear-to-b from-amber-100/80 via-yellow-100/60 to-emerald-200/70 border-amber-300"
              }`}
            >
              {/* Header inside pond */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-slate-900 bg-white/80 px-2.5 py-0.5 rounded-xl border border-slate-200 shadow-2xs">
                  {cleanlinessPercentage === 100 ? "✨ Clean Village Pond" : "⚠️ Murky & Polluted Pond"}
                </span>
                <span
                  className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                    cleanlinessPercentage === 100
                      ? "bg-teal-600 text-white"
                      : "bg-amber-600 text-white"
                  }`}
                >
                  Pond Health: {cleanlinessPercentage}%
                </span>
              </div>

              {/* Water surface with floating items */}
              <div className="relative py-4 flex flex-col items-center justify-center min-h-[140px]">
                {/* Floating trash items to click and remove */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full">
                  {trashList.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => !item.cleaned && handleCleanTrash(item.id)}
                      className={`p-2.5 rounded-xl border-2 transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                        item.cleaned
                          ? "border-emerald-400 bg-emerald-50/70 opacity-60 line-through scale-95"
                          : "border-rose-300 bg-white/90 hover:border-rose-500 hover:scale-105 shadow-md animate-pulse"
                      }`}
                    >
                      <span className="text-3xl mb-1">{item.cleaned ? "✅" : item.icon}</span>
                      <span className="font-bold text-xs text-slate-800">{item.name}</span>
                      <span className="text-[10px] text-slate-500">{item.bangla}</span>
                      {!item.cleaned && (
                        <span className="mt-1 text-[9px] font-black text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded-full">
                          Click to Clean 🗑️
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Healthy fish swimming when cleaned */}
                {cleanlinessPercentage === 100 && (
                  <div className="mt-3 flex items-center gap-3 text-2xl animate-bounce">
                    <span>🐟</span>
                    <span>🪷</span>
                    <span>🐠</span>
                    <span>🪷</span>
                    <span>🐟</span>
                  </div>
                )}
              </div>
            </div>

            {/* Pond Controls */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-teal-200 shadow-xs flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetPond}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Pond</span>
                </button>
                <button
                  onClick={() =>
                    handleSpeak(
                      "One sunny afternoon, Shihab and Kaniz went to visit their village pond. They were saddened to see that the water looked murky and dirty."
                    )
                  }
                  className="p-1.5 rounded-xl bg-teal-100 text-teal-800 hover:bg-teal-200 transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs font-bold text-slate-700">
                <span>Items Cleaned: </span>
                <span className="font-black text-teal-700">{cleanedCount} of 4</span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: STUDENT AWARENESS RALLY                           */}
        {/* ======================================================== */}
        {activeTab === "rally" && (
          <div className="space-y-3">
            {/* Visual Rally Scene */}
            <div className="relative rounded-2xl bg-linear-to-b from-amber-100 via-sky-100 to-teal-100 border-2 border-amber-300 p-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-amber-900 bg-white/80 px-2.5 py-0.5 rounded-xl border border-amber-200 shadow-2xs">
                  📢 Student Awareness Rally with Headteacher
                </span>
                <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">
                  Village School Campaign 🇧🇩
                </span>
              </div>

              {/* Placards Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-3">
                <div className="p-3 bg-white rounded-xl border-2 border-rose-300 shadow-2xs text-center">
                  <span className="text-2xl mb-1 block">🚫 🧴</span>
                  <h5 className="font-black text-rose-700 text-xs sm:text-sm">Stop Plastic Waste!</h5>
                  <p className="text-[10px] text-slate-600 mt-0.5">পুকুরে প্লাস্টিকের প্যাকেট ও বোতল ফেলা বন্ধ করো</p>
                </div>
                <div className="p-3 bg-white rounded-xl border-2 border-teal-300 shadow-2xs text-center">
                  <span className="text-2xl mb-1 block">🌊 🐟</span>
                  <h5 className="font-black text-teal-700 text-xs sm:text-sm">Save Village Pond!</h5>
                  <p className="text-[10px] text-slate-600 mt-0.5">আমাদের প্রিয় পুকুরের পানি দূষণমুক্ত রাখো</p>
                </div>
                <div className="p-3 bg-white rounded-xl border-2 border-emerald-300 shadow-2xs text-center">
                  <span className="text-2xl mb-1 block">🩺 💧</span>
                  <h5 className="font-black text-emerald-700 text-xs sm:text-sm">Clean Water, Safe Life!</h5>
                  <p className="text-[10px] text-slate-600 mt-0.5">বিশুদ্ধ পানিই সুস্বাস্থ্যের চাবিকাঠি</p>
                </div>
              </div>

              {/* Animated Students Rallying */}
              <div className="flex items-center justify-center gap-3 py-1 text-3xl">
                <span className={`transition-transform duration-300 ${isChanting ? "scale-125" : ""}`}>👧</span>
                <span className={`transition-transform duration-300 ${isChanting ? "scale-125" : ""}`}>👦</span>
                <span className={`transition-transform duration-300 ${isChanting ? "scale-125" : ""}`}>👩‍🏫</span>
                <span className={`transition-transform duration-300 ${isChanting ? "scale-125" : ""}`}>👦</span>
                <span className={`transition-transform duration-300 ${isChanting ? "scale-125" : ""}`}>👧</span>
              </div>

              {isChanting && (
                <div className="mt-2 bg-amber-700 text-white p-2 rounded-xl text-center shadow-md animate-fadeIn text-xs font-black">
                  📢 "Stop Water Pollution! Protect Our Village Pond!"
                </div>
              )}
            </div>

            {/* Rally Controls */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-teal-200 shadow-xs flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStartRally}
                  disabled={isChanting}
                  className="px-4 py-2 rounded-xl bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Megaphone className="w-4 h-4" />
                  <span>Lead Student Rally (সচেতনতা র‍্যালি)</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Rallies Organized:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-800 font-black text-xs">
                  {rallyCount} ★
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: WATERBORNE DISEASES PREVENTION GUIDE             */}
        {/* ======================================================== */}
        {activeTab === "diseases" && (
          <div className="space-y-3">
            <div className="p-3 bg-linear-to-r from-rose-50 to-amber-50 rounded-2xl border border-rose-200 flex items-center gap-2.5">
              <span className="text-3xl">⚠️</span>
              <div>
                <h4 className="font-black text-rose-900 text-xs sm:text-sm">
                  Dangers of Polluted Water (দূষিত পানির স্বাস্থ্যঝুঁকি)
                </h4>
                <p className="text-[11px] text-slate-600">
                  Shihab told Kaniz that polluted water spreads cholera, typhoid and diarrhea.
                </p>
              </div>
            </div>

            {/* 3 Disease Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 bg-white rounded-xl border-2 border-rose-200 shadow-2xs">
                <span className="text-2xl mb-1 block">🦠</span>
                <h5 className="font-black text-rose-800 text-xs sm:text-sm">Cholera (কলেরা)</h5>
                <p className="text-[11px] text-slate-600 mt-1">Causes severe dehydration from drinking dirty water.</p>
              </div>
              <div className="p-3 bg-white rounded-xl border-2 border-amber-200 shadow-2xs">
                <span className="text-2xl mb-1 block">🤒</span>
                <h5 className="font-black text-amber-800 text-xs sm:text-sm">Typhoid (টাইফয়েড)</h5>
                <p className="text-[11px] text-slate-600 mt-1">High fever caused by bacterial contamination in water.</p>
              </div>
              <div className="p-3 bg-white rounded-xl border-2 border-cyan-200 shadow-2xs">
                <span className="text-2xl mb-1 block">💧</span>
                <h5 className="font-black text-cyan-800 text-xs sm:text-sm">Diarrhea (ডায়রিয়া)</h5>
                <p className="text-[11px] text-slate-600 mt-1">Stomach infection spread by unhygienic contaminated ponds.</p>
              </div>
            </div>

            {/* Audio Button */}
            <div className="p-2.5 bg-white rounded-xl border border-teal-200 text-[11px] text-teal-900 font-medium flex items-center justify-between shadow-2xs">
              <span>💡 Clean water is essential for life! Never throw rubbish into ponds.</span>
              <button
                onClick={() =>
                  handleSpeak(
                    "Shihab told Kaniz that polluted water spreads cholera, typhoid and diarrhea. They decided to talk to the village school headteacher and arrange a student rally to stop water pollution."
                  )
                }
                className="p-1 rounded-lg bg-teal-100 hover:bg-teal-200 text-teal-800 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Profile Summary Badge */}
      <div className="pt-2 border-t border-teal-200/80 flex items-center justify-between text-[11px] text-slate-600 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-teal-950">👦 Shihab & 👧 Kaniz</span>
          <span>•</span>
          <span>Student Environmental Champions</span>
        </div>
        <div className="flex items-center gap-1 text-teal-800 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Protect our village pond and keep water clean!</span>
        </div>
      </div>
    </div>
  );
}
