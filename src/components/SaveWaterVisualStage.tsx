"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Volume2, Droplets, Check, AlertTriangle, Wrench, ShieldCheck, Heart, Award, RefreshCw, Sun, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

interface SaveWaterVisualStageProps {
  slideId: number;
  playChime?: (type: "correct" | "click" | "fanfare") => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

interface WaterUseStation {
  id: string;
  name: string;
  bangla: string;
  icon: string;
  fact: string;
  liters: string;
}

export default function SaveWaterVisualStage({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}: SaveWaterVisualStageProps) {
  // Modes: "tap_lab" (interactive tap & leak) | "uses" (5 water uses) | "detective" (spot wastage game)
  const [activeMode, setActiveMode] = useState<"tap_lab" | "uses" | "detective">(() => {
    if (slideId === 5) return "tap_lab";
    if (slideId === 2 || slideId === 6) return "uses";
    return "tap_lab";
  });

  // Mode 1: Tap & Leak State
  const [isTapOpen, setIsTapOpen] = useState<boolean>(false);
  const [isLeaking, setIsLeaking] = useState<boolean>(true);
  const [savedLiters, setSavedLiters] = useState<number>(12);

  // Mode 2: Active Water Use Station
  const [activeStationId, setActiveStationId] = useState<string>("drinking");

  // Mode 3: Water Detective State (3 wastage spots to fix)
  const [fixedSpots, setFixedSpots] = useState<Record<string, boolean>>({
    brushing_tap: false,
    leaky_pipe: false,
    overflowing_bucket: false,
  });

  // Sync mode with slide changes
  useEffect(() => {
    if (slideId === 5) {
      setActiveMode("tap_lab");
    } else if (slideId === 1 || slideId === 2) {
      setActiveMode("uses");
    } else if (slideId === 6) {
      setActiveMode("detective");
    } else {
      setActiveMode("tap_lab");
    }
  }, [slideId]);

  // Turn Tap On/Off
  const toggleTap = () => {
    playChime?.("click");
    if (isTapOpen) {
      setIsTapOpen(false);
      setSavedLiters((l) => l + 5);
      handleSpeak("Great job! You turned off the tap tightly. You saved five liters of clean water!");
      playChime?.("correct");
    } else {
      setIsTapOpen(true);
      handleSpeak("The tap is running. Remember to turn it off when not in use!");
    }
  };

  // Fix Leaky Pipe
  const handleFixLeak = () => {
    if (!isLeaking) return;
    setIsLeaking(false);
    playChime?.("fanfare");
    setSavedLiters((l) => l + 15);
    handleSpeak("Hooray! Leaky pipe fixed! No more water drops wasted!");
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
  };

  // Reset Tap & Leak Simulator
  const handleResetSimulator = () => {
    setIsTapOpen(false);
    setIsLeaking(true);
    playChime?.("click");
  };

  // Fix Spot in Detective Game
  const handleFixSpot = (spotKey: "brushing_tap" | "leaky_pipe" | "overflowing_bucket") => {
    if (fixedSpots[spotKey]) return;
    playChime?.("correct");
    const updated = { ...fixedSpots, [spotKey]: true };
    setFixedSpots(updated);

    const allFixed = Object.values(updated).every(Boolean);
    if (allFixed) {
      playChime?.("fanfare");
      handleSpeak("Outstanding! You fixed all water wastages! You are a certified Water Hero!");
      confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });
    } else if (spotKey === "brushing_tap") {
      handleSpeak("Tap turned off while brushing teeth! 6 liters saved!");
    } else if (spotKey === "leaky_pipe") {
      handleSpeak("Leaky pipe repaired tightly! 10 liters saved!");
    } else {
      handleSpeak("Bucket filled and tap shut! No overflow!");
    }
  };

  const WATER_STATIONS: WaterUseStation[] = [
    {
      id: "drinking",
      name: "Drinking",
      bangla: "নিরাপদ পানীয় জল",
      icon: "🥛",
      fact: "Clean drinking water keeps our body hydrated, fresh and free from cholera.",
      liters: "২-৩ লিটার প্রতিদিন",
    },
    {
      id: "cooking",
      name: "Cooking Meals",
      bangla: "রান্নাবান্না ও খাদ্য প্রস্তুত",
      icon: "🍲",
      fact: "Boiling rice, lentils, and making delicious healthy meals for our family.",
      liters: "৫-১০ লিটার প্রতি পরিবার",
    },
    {
      id: "bathing",
      name: "Bathing & Cleaning",
      bangla: "গোসল ও পরিষ্কার-পরিচ্ছন্নতা",
      icon: "🚿",
      fact: "Washing our body with clean water and soap keeps away harmful germs.",
      liters: "১৫-২০ লিটার প্রতিদিন",
    },
    {
      id: "utensils",
      name: "Washing Utensils",
      bangla: "থালাবাসন ও হাঁড়িপাতিল ধোয়া",
      icon: "🍽️",
      fact: "Clean plates, spoons, and cooking pots ensure hygienic, safe food.",
      liters: "১০ লিটার প্রতি বেলা",
    },
    {
      id: "crops",
      name: "Growing Crops",
      bangla: "ফসলের ক্ষেতে পানি সেচ",
      icon: "🌾",
      fact: "Paddy, wheat, and vegetables cannot grow or produce food without water.",
      liters: "কৃষির প্রাণ",
    },
  ];

  const currentStation = WATER_STATIONS.find((s) => s.id === activeStationId) || WATER_STATIONS[0];

  return (
    <div className={`flex flex-col h-full rounded-3xl bg-linear-to-b from-sky-50 via-cyan-50 to-blue-50 border border-slate-200 shadow-2xs overflow-hidden ${isFullTheater ? "p-4 sm:p-6" : "p-3 sm:p-4"}`}>
      {/* Top Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2.5 border-b border-sky-200/80 shrink-0">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-2xl bg-sky-500 text-white shadow-xs text-base">
            💧
          </span>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-sky-100 text-sky-900 border border-sky-200">
                Unit 7 • Lesson 3
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 text-cyan-800">
                Water is Life
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-black text-slate-800">
              Save Our Water — Preventing Wastage (পানির অপচয় রোধ)
            </h3>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 bg-white/80 p-1 rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => {
              setActiveMode("tap_lab");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 whitespace-nowrap ${
              activeMode === "tap_lab"
                ? "bg-sky-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>🚰</span>
            <span>কল ও পাইপ ল্যাব</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode("uses");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 whitespace-nowrap ${
              activeMode === "uses"
                ? "bg-cyan-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>🌾</span>
            <span>পানির ৫ ব্যবহার</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode("detective");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 whitespace-nowrap ${
              activeMode === "detective"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>🔍</span>
            <span>অপচয় ডিটেকটিভ</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Canvas */}
      <div className="relative flex-1 min-h-[300px] w-full mt-2.5 rounded-2xl overflow-hidden border border-sky-200/80 bg-linear-to-b from-sky-100 via-sky-50 to-blue-100 select-none flex flex-col justify-between p-3">
        {/* Real-time Water Saved Live Badge */}
        <div className="absolute top-2.5 left-3 z-10 flex items-center gap-2">
          <div className="px-3 py-1 rounded-xl bg-white/95 backdrop-blur-xs border border-sky-300 shadow-2xs text-[11px] font-black text-sky-900 flex items-center gap-1.5">
            <Droplets className="w-4 h-4 text-sky-600 fill-sky-500 animate-bounce" />
            <span>মোট অপচয় রোধ:</span>
            <span className="px-1.5 py-0.2 rounded-md bg-sky-500 text-white font-black text-xs">
              {savedLiters} লিটার 💧
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MODE 1: INTERACTIVE WATER TAP & LEAK LAB                      */}
        {/* ------------------------------------------------------------- */}
        {activeMode === "tap_lab" && (
          <div className="relative w-full h-full flex flex-col justify-between z-10 pt-8">
            {/* Center Basin & Chrome Tap Visual */}
            <div className="relative flex-1 flex flex-col items-center justify-center">
              {/* Leaky Pipe alert if leaking */}
              {isLeaking && (
                <div className="mb-2 px-3 py-1 rounded-xl bg-amber-500 text-white text-[11px] font-black animate-pulse flex items-center gap-1.5 shadow-sm">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>সতর্কতা: পাইপে ফুটো হয়ে পানি পড়ছে! (Leaky pipe wasting water!)</span>
                </div>
              )}

              {/* Water Tap & Pipe Assembly */}
              <div className="relative w-64 h-44 flex flex-col items-center justify-start">
                {/* Wall Pipe */}
                <div className="w-10 h-16 bg-linear-to-b from-slate-400 to-slate-500 rounded-t-lg border-2 border-slate-600 relative">
                  {/* Leaky drip hole on pipe */}
                  {isLeaking && (
                    <div className="absolute top-8 -right-3 flex flex-col items-center">
                      <span className="text-[10px] font-bold text-amber-700 bg-white/80 px-1 rounded-xs">ফুটো!</span>
                      <span className="text-sm text-sky-500 animate-bounce">💧</span>
                    </div>
                  )}
                </div>

                {/* Tap Spout Neck (Curved) */}
                <div className="w-24 h-12 border-t-8 border-r-8 border-slate-400 rounded-tr-2xl relative -mt-3">
                  {/* Tap Knob Valve (Rotatable / Clickable) */}
                  <button
                    type="button"
                    onClick={toggleTap}
                    className={`absolute -top-6 -left-3 p-1.5 rounded-full border-2 transition-transform shadow-md ${
                      isTapOpen
                        ? "bg-red-500 text-white rotate-45 border-red-700"
                        : "bg-emerald-500 text-white rotate-0 border-emerald-700 hover:scale-110"
                    }`}
                    title={isTapOpen ? "কলটি শক্ত করে বন্ধ করুন" : "কলটি চালু করুন"}
                  >
                    <span className="text-xs font-black">⚙️</span>
                  </button>
                </div>

                {/* Tap Mouth */}
                <div className="w-8 h-4 bg-slate-500 border-2 border-slate-700 rounded-b-md relative -mt-2">
                  {/* Flowing Water Animation */}
                  {isTapOpen && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-24 bg-linear-to-b from-sky-400 via-sky-300 to-transparent opacity-85 animate-pulse rounded-full flex flex-col items-center justify-between">
                      <span className="text-xs text-white">💧</span>
                      <span className="text-xs text-white">💧</span>
                      <span className="text-xs text-white">💧</span>
                    </div>
                  )}
                  {/* Dripping single drop if closed but not tightly */}
                  {!isTapOpen && isLeaking && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm text-sky-500 animate-bounce">
                      💧
                    </div>
                  )}
                </div>

                {/* Basin / Bucket Bottom */}
                <div className="w-48 h-12 bg-linear-to-b from-slate-100 to-slate-200 border-2 border-slate-400 rounded-b-3xl mt-20 shadow-inner relative flex items-center justify-center">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                    {isTapOpen ? "পানি অপচয় হচ্ছে... ⚠️" : "কল শক্ত করে বন্ধ আছে ✅"}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Controls for Mode 1 */}
            <div className="mt-2 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-xs border border-sky-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-sky-100 text-sky-700 text-sm">
                  🚰
                </span>
                <div>
                  <p className="text-xs font-black text-slate-800">
                    "Always turn off the water tap tightly."
                  </p>
                  <p className="text-[11px] text-slate-600">
                    দাঁত মাজার বা থালাবাসন ধোয়ার সময় সবসময় পানির কল শক্ত করে বন্ধ রাখুন।
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={toggleTap}
                  className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-black transition-all shadow-xs flex items-center justify-center gap-1 ${
                    isTapOpen
                      ? "bg-red-500 text-white hover:bg-red-600 animate-pulse"
                      : "bg-sky-600 text-white hover:bg-sky-700"
                  }`}
                >
                  <span>{isTapOpen ? "🛑 কল বন্ধ করো (Turn off)" : "💧 কল চালাও (Turn on)"}</span>
                </button>

                {isLeaking && (
                  <button
                    type="button"
                    onClick={handleFixLeak}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-xs flex items-center gap-1"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>ফুটো মেরামত (Fix Leak)</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleResetSimulator}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all shadow-2xs"
                  title="পুনরায় শুরু"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE 2: 5 ESSENTIAL USES OF WATER                            */}
        {/* ------------------------------------------------------------- */}
        {activeMode === "uses" && (
          <div className="relative w-full h-full flex flex-col justify-between z-10 pt-4">
            {/* Top Explanation Banner */}
            <div className="bg-sky-900/90 text-white p-2.5 rounded-2xl border border-sky-700 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌾</span>
                <div>
                  <h4 className="text-xs font-black">আমাদের জীবনে পানির ৫টি প্রধান ব্যবহার (Uses of Water)</h4>
                  <p className="text-[10px] text-sky-200">"We need clean water for drinking, cooking, bathing, washing and growing crops."</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-cyan-300 text-cyan-950">
                Water is Life 💧
              </span>
            </div>

            {/* Interactive Grid of 5 Stations */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-2 flex-1">
              {WATER_STATIONS.map((station) => {
                const isSelected = activeStationId === station.id;
                return (
                  <div
                    key={station.id}
                    onClick={() => {
                      setActiveStationId(station.id);
                      playChime?.("click");
                      handleSpeak(`${station.name}. ${station.bangla}. ${station.fact}`);
                    }}
                    className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-between text-center ${
                      isSelected
                        ? "bg-white border-sky-500 shadow-md ring-2 ring-sky-300 scale-102"
                        : "bg-white/80 border-sky-200 hover:bg-white hover:border-sky-300"
                    }`}
                  >
                    <span className="text-3xl mb-1">{station.icon}</span>
                    <div>
                      <h5 className="font-black text-xs text-slate-800">{station.name}</h5>
                      <p className="text-[10px] text-sky-800 font-bold">{station.bangla}</p>
                    </div>
                    <span className="mt-1 px-1.5 py-0.2 rounded-md bg-sky-100 text-sky-700 text-[9px] font-bold">
                      {station.liters}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Selected Station Detail Spotlight Box */}
            <div className="p-3 rounded-2xl bg-white border-2 border-sky-300 shadow-sm flex items-start justify-between gap-3 animate-in fade-in">
              <div className="flex items-start gap-2.5">
                <span className="text-3xl p-1.5 rounded-xl bg-sky-100 border border-sky-200 shrink-0">
                  {currentStation.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-xs text-sky-950">{currentStation.name}</h4>
                    <span className="text-[10px] font-bold text-sky-700">({currentStation.bangla})</span>
                  </div>
                  <p className="text-[11px] text-slate-700 mt-0.5 leading-relaxed font-medium">
                    {currentStation.fact}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleSpeak(`${currentStation.name}. ${currentStation.bangla}. ${currentStation.fact}`)}
                className="p-2 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 shrink-0 shadow-2xs"
                title="শুনুন"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE 3: WATER DETECTIVE - SPOT & FIX WASTAGE                  */}
        {/* ------------------------------------------------------------- */}
        {activeMode === "detective" && (
          <div className="relative w-full h-full flex flex-col justify-between z-10 pt-4">
            {/* Top Mission Header */}
            <div className="bg-emerald-900/90 text-white p-2 rounded-2xl border border-emerald-700 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xl">🕵️‍♂️</span>
                <div>
                  <h4 className="text-xs font-black">ওয়াটার ডিটেকটিভ: অপচয় শনাক্ত ও বন্ধ করো!</h4>
                  <p className="text-[10px] text-emerald-200">লাল সতর্কবাণী চিহ্নিত ৩টি অপচয়ের স্থানে ক্লিক করে বন্ধ করুন</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-emerald-950">
                {Object.values(fixedSpots).filter(Boolean).length} / 3 মেরামত সম্পন্ন
              </span>
            </div>

            {/* 3 Wastage Challenge Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-2 flex-1">
              {/* Challenge 1: Tap left open while brushing teeth */}
              <div
                onClick={() => handleFixSpot("brushing_tap")}
                className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  fixedSpots.brushing_tap
                    ? "bg-emerald-50 border-emerald-500 shadow-xs"
                    : "bg-white border-amber-400 shadow-md hover:scale-102"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl">🪥 🚰</span>
                  {fixedSpots.brushing_tap ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <span className="px-1.5 py-0.5 rounded-md bg-amber-500 text-white text-[9px] font-black animate-pulse">
                      অপচয় হচ্ছে!
                    </span>
                  )}
                </div>
                <div className="my-1.5">
                  <h5 className="font-black text-xs text-slate-800">১. ব্রাশ করার সময় কল খোলা</h5>
                  <p className="text-[10px] text-slate-600 leading-snug">
                    দাঁত মাজার সময় কল অনর্থক ছেড়ে রাখা পানির বড় অপচয়।
                  </p>
                </div>
                <button
                  type="button"
                  className={`w-full py-1 rounded-xl text-[10px] font-black transition-all ${
                    fixedSpots.brushing_tap
                      ? "bg-emerald-200 text-emerald-900"
                      : "bg-amber-500 text-white hover:bg-amber-600 shadow-2xs"
                  }`}
                >
                  {fixedSpots.brushing_tap ? "✓ কল বন্ধ করা হয়েছে (Saved 6L)" : "🛑 কল শক্ত করে বন্ধ করো"}
                </button>
              </div>

              {/* Challenge 2: Leaky pipe in school yard */}
              <div
                onClick={() => handleFixSpot("leaky_pipe")}
                className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  fixedSpots.leaky_pipe
                    ? "bg-emerald-50 border-emerald-500 shadow-xs"
                    : "bg-white border-amber-400 shadow-md hover:scale-102"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl">🔧 💧</span>
                  {fixedSpots.leaky_pipe ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <span className="px-1.5 py-0.5 rounded-md bg-amber-500 text-white text-[9px] font-black animate-pulse">
                      ফুটো পাইপ!
                    </span>
                  )}
                </div>
                <div className="my-1.5">
                  <h5 className="font-black text-xs text-slate-800">২. ফুটো পাইপ দিয়ে ফোঁটা পড়া</h5>
                  <p className="text-[10px] text-slate-600 leading-snug">
                    "If you notice any leaky pipe, inform adults immediately."
                  </p>
                </div>
                <button
                  type="button"
                  className={`w-full py-1 rounded-xl text-[10px] font-black transition-all ${
                    fixedSpots.leaky_pipe
                      ? "bg-emerald-200 text-emerald-900"
                      : "bg-amber-500 text-white hover:bg-amber-600 shadow-2xs"
                  }`}
                >
                  {fixedSpots.leaky_pipe ? "✓ পাইপ মেরামত হয়েছে (Saved 10L)" : "🛠️ বড়দের জানিয়ে মেরামত করো"}
                </button>
              </div>

              {/* Challenge 3: Overflowing bucket */}
              <div
                onClick={() => handleFixSpot("overflowing_bucket")}
                className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  fixedSpots.overflowing_bucket
                    ? "bg-emerald-50 border-emerald-500 shadow-xs"
                    : "bg-white border-amber-400 shadow-md hover:scale-102"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl">🪣 🌊</span>
                  {fixedSpots.overflowing_bucket ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <span className="px-1.5 py-0.5 rounded-md bg-amber-500 text-white text-[9px] font-black animate-pulse">
                      বালতি উপচে পড়ছে!
                    </span>
                  )}
                </div>
                <div className="my-1.5">
                  <h5 className="font-black text-xs text-slate-800">৩. বালতি ভরে মেঝেতে পানি পড়া</h5>
                  <p className="text-[10px] text-slate-600 leading-snug">
                    বালতি পূর্ণ হলে সাথে সাথে কল বন্ধ করে পানি অপচয় রোধ করতে হবে।
                  </p>
                </div>
                <button
                  type="button"
                  className={`w-full py-1 rounded-xl text-[10px] font-black transition-all ${
                    fixedSpots.overflowing_bucket
                      ? "bg-emerald-200 text-emerald-900"
                      : "bg-amber-500 text-white hover:bg-amber-600 shadow-2xs"
                  }`}
                >
                  {fixedSpots.overflowing_bucket ? "✓ উপচে পড়া বন্ধ (Saved 8L)" : "🛑 বালতি পূর্ণ, কল বন্ধ করো"}
                </button>
              </div>
            </div>

            {/* Bottom Motto */}
            <div className="p-2 rounded-2xl bg-white border border-emerald-200 text-center text-xs text-emerald-900 font-bold">
              🌟 "Saving every single drop of water today will protect our future tomorrow!"
            </div>
          </div>
        )}
      </div>

      {/* Footer Golden Rule Bar */}
      <div className="mt-2.5 pt-2 border-t border-sky-200/80 flex items-center justify-between text-[11px] text-sky-950 font-bold shrink-0">
        <span className="flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-sky-600 fill-sky-600" />
          <span>"Water is precious and limited. Never waste a single drop."</span>
        </span>
        <span className="text-sky-800 text-[10px] font-semibold hidden sm:inline">
          পানি অত্যন্ত মূল্যবান ও সীমিত, এক ফোঁটাও অপচয় নয় 💧
        </span>
      </div>
    </div>
  );
}
