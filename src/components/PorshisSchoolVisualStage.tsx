"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Volume2, Heart, Flag, Users, Flower2, Bell, Award, Check, RefreshCw, Star, Droplets } from "lucide-react";
import confetti from "canvas-confetti";

interface PorshisSchoolVisualStageProps {
  slideId: number;
  playChime?: (type: "correct" | "click" | "fanfare") => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

interface RhymePuzzle {
  word1: string;
  word2: string;
  bangla: string;
  solved: boolean;
}

export default function PorshisSchoolVisualStage({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}: PorshisSchoolVisualStageProps) {
  // Modes: "assembly" (Morning assembly & flag) | "classroom" (Puzzles & poems) | "garden" (School flower garden)
  const [activeTab, setActiveTab] = useState<"assembly" | "classroom" | "garden">(() => {
    if (slideId === 4 || slideId === 5) return "classroom";
    if (slideId === 6) return "garden";
    return "assembly";
  });

  // Morning Assembly state
  const [isAssembling, setIsAssembling] = useState<boolean>(false);
  const [assemblyCount, setAssemblyCount] = useState<number>(0);
  const [anthemPlaying, setAnthemPlaying] = useState<boolean>(false);

  // Classroom Puzzles
  const [rhymePairs, setRhymePairs] = useState<RhymePuzzle[]>([
    { word1: "School", word2: "Cool", bangla: "বিদ্যালয় ও মনোরম", solved: false },
    { word1: "Play", word2: "Day", bangla: "খেলা ও দিন", solved: false },
    { word1: "Learn", word2: "Turn", bangla: "শেখা ও পালা", solved: false },
    { word1: "Sun", word2: "Fun", bangla: "সূর্য ও আনন্দ", solved: false },
  ]);

  // School Garden state
  const [waterCount, setWaterCount] = useState<number>(0);
  const [isWatering, setIsWatering] = useState<boolean>(false);
  const [bellRinging, setBellRinging] = useState<boolean>(false);

  // Sync tab with slide changes
  useEffect(() => {
    if (slideId === 4 || slideId === 5) {
      setActiveTab("classroom");
    } else if (slideId === 6) {
      setActiveTab("garden");
    } else {
      setActiveTab("assembly");
    }
  }, [slideId]);

  // Assembly Anthem Trigger
  const handleStartAssembly = () => {
    setIsAssembling(true);
    setAnthemPlaying(true);
    playChime?.("click");
    handleSpeak("Attention! Students stand in line for the morning assembly, national anthem and physical exercises.");

    setTimeout(() => {
      setAnthemPlaying(false);
      setIsAssembling(false);
      setAssemblyCount((prev) => prev + 1);
      playChime?.("fanfare");
      confetti({ particleCount: 35, spread: 70, origin: { y: 0.6 } });
    }, 2000);
  };

  // Solve Rhyme Puzzle
  const handleSolvePuzzle = (index: number) => {
    if (rhymePairs[index].solved) return;
    playChime?.("correct");
    handleSpeak(`${rhymePairs[index].word1} rhymes with ${rhymePairs[index].word2}! Great job!`);

    setRhymePairs((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, solved: true } : item))
    );

    // If all solved, burst confetti
    const remaining = rhymePairs.filter((_, idx) => idx !== index && !_.solved).length;
    if (remaining === 0) {
      setTimeout(() => {
        playChime?.("fanfare");
        confetti({ particleCount: 50, spread: 80, origin: { y: 0.5 } });
      }, 400);
    }
  };

  // Reset Puzzles
  const handleResetPuzzles = () => {
    playChime?.("click");
    setRhymePairs((prev) => prev.map((p) => ({ ...p, solved: false })));
  };

  // Water School Garden
  const handleWaterGarden = () => {
    setIsWatering(true);
    playChime?.("click");
    handleSpeak("Porshi and her friends water the colorful flower garden in front of their school during the break!");

    setTimeout(() => {
      setIsWatering(false);
      setWaterCount((prev) => prev + 1);
      playChime?.("fanfare");
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
    }, 1200);
  };

  // Ring School Bell
  const handleRingBell = () => {
    setBellRinging(true);
    playChime?.("click");
    handleSpeak("Ting-ting-ting! The school bell rings for the joyful tiffin break!");

    setTimeout(() => {
      setBellRinging(false);
      playChime?.("fanfare");
    }, 1500);
  };

  return (
    <div
      className={`w-full rounded-3xl bg-linear-to-b from-sky-50 via-emerald-50/40 to-teal-50 border-2 border-emerald-200/80 p-3 sm:p-5 shadow-inner flex flex-col justify-between ${
        isFullTheater ? "min-h-[500px]" : "min-h-[420px]"
      }`}
    >
      {/* Top Banner / School Profile Header */}
      <div className="flex items-center justify-between pb-3 border-b border-emerald-200/70 gap-2 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-xl shadow-md ring-2 ring-emerald-200 shrink-0">
            🏫
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Unit 5 • Lesson 1
              </span>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-full">
                Joypur GPS, Kushtia (কুষ্টিয়া)
              </span>
            </div>
            <h3 className="font-black text-slate-800 text-sm sm:text-base leading-tight mt-0.5">
              Porshi's Joyful School Time (পড়শীর আনন্দময় বিদ্যালয়)
            </h3>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-white/90 p-1 rounded-2xl border border-emerald-200 shadow-2xs">
          <button
            onClick={() => {
              setActiveTab("assembly");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === "assembly"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            <Flag className="w-3.5 h-3.5" />
            <span>Assembly</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("classroom");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === "classroom"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Puzzles</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("garden");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === "garden"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            <Flower2 className="w-3.5 h-3.5" />
            <span>Garden</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="my-3 flex-1">
        {/* ======================================================== */}
        {/* TAB 1: MORNING ASSEMBLY & NATIONAL ANTHEM               */}
        {/* ======================================================== */}
        {activeTab === "assembly" && (
          <div className="space-y-3">
            {/* Visual Assembly Ground */}
            <div className="relative rounded-2xl bg-linear-to-b from-sky-200 via-emerald-100 to-green-200 border-2 border-emerald-300 p-4 overflow-hidden shadow-md">
              {/* Sun & Clouds */}
              <div className="absolute top-2 right-4 text-3xl animate-bounce duration-1000">☀️</div>
              <div className="absolute top-3 left-6 text-2xl opacity-75">☁️</div>

              {/* School Building Backdrop */}
              <div className="flex items-center justify-between mb-3 px-2">
                <div className="bg-white/80 backdrop-blur-xs px-3 py-1 rounded-xl border border-emerald-200 shadow-2xs">
                  <span className="text-xs font-bold text-emerald-900">
                    🏛️ Joypur Govt Primary School Building
                  </span>
                </div>
                <div className="bg-emerald-700 text-white px-2.5 py-0.5 rounded-full text-[11px] font-black">
                  Morning 9:00 AM
                </div>
              </div>

              {/* National Flagpole & Students Assembly */}
              <div className="flex items-end justify-center gap-6 py-2">
                {/* Students Line Left */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 text-2xl">
                    <span className={`transition-transform duration-300 ${isAssembling ? "scale-110" : ""}`}>👧</span>
                    <span className={`transition-transform duration-300 ${isAssembling ? "scale-110" : ""}`}>👦</span>
                    <span className={`transition-transform duration-300 ${isAssembling ? "scale-110" : ""}`}>👧</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-white/70 px-1.5 py-0.2 rounded mt-1">
                    Class 3 Students
                  </span>
                </div>

                {/* Flagpole Center */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    {/* Bangladesh Flag */}
                    <div
                      className={`w-14 h-9 bg-emerald-700 rounded-sm border border-emerald-800 flex items-center justify-center shadow-md relative ${
                        isAssembling ? "animate-pulse ring-2 ring-amber-400" : ""
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-rose-600 shadow-xs" />
                    </div>
                    {/* Pole */}
                    <div className="w-1.5 h-20 bg-slate-400 mx-auto rounded-t-xs shadow-inner" />
                  </div>
                  <div className="w-16 h-3 bg-slate-300 rounded-full border border-slate-400" />
                </div>

                {/* Headteacher & Teachers Right */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 text-2xl">
                    <span className={`transition-transform duration-300 ${isAssembling ? "scale-110" : ""}`}>👩‍🏫</span>
                    <span className={`transition-transform duration-300 ${isAssembling ? "scale-110" : ""}`}>👨‍🏫</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-white/70 px-1.5 py-0.2 rounded mt-1">
                    Teachers
                  </span>
                </div>
              </div>

              {/* Assembly Status Overlay */}
              {anthemPlaying && (
                <div className="mt-2 bg-emerald-800/90 text-white p-2.5 rounded-xl text-center shadow-lg border border-emerald-400 animate-fadeIn">
                  <p className="text-xs font-bold flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                    <span>🎶 Amar Shonar Bangla... Saluting the National Flag! 🇧🇩</span>
                  </p>
                </div>
              )}
            </div>

            {/* Assembly Interactive Controls */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-emerald-200 shadow-xs flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStartAssembly}
                  disabled={isAssembling}
                  className="px-4 py-2 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Flag className="w-4 h-4 text-amber-300" />
                  <span>Start Morning Assembly (সমাবেশ)</span>
                </button>
                <button
                  onClick={() =>
                    handleSpeak(
                      "Porshi is eight years old and reads in Class 3 at Joypur Government Primary School in Kushtia. The school day begins with the morning assembly, national anthem and physical exercises."
                    )
                  }
                  className="p-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-all cursor-pointer"
                  title="Listen to Assembly Story"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Assemblies Completed:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs">
                  {assemblyCount} ★
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: CLASSROOM PUZZLES & POEMS ARENA                   */}
        {/* ======================================================== */}
        {activeTab === "classroom" && (
          <div className="space-y-3">
            {/* Friendly Groups Banner */}
            <div className="p-3 bg-linear-to-r from-amber-50 to-emerald-50 rounded-2xl border border-amber-200 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧩</span>
                <div>
                  <h4 className="font-black text-slate-900 text-xs sm:text-sm">
                    Classroom Group Activity: Rhyme & Word Puzzles
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    শিক্ষক শিক্ষার্থীদের ছোট বন্ধুত্বপূর্ণ দলে ভাগ করে ধাঁধা মেলানো ও কবিতা আবৃত্তি করান।
                  </p>
                </div>
              </div>
              <button
                onClick={handleResetPuzzles}
                className="px-2.5 py-1 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Puzzles</span>
              </button>
            </div>

            {/* 4 Interactive Rhyme Pairs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {rhymePairs.map((pair, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSolvePuzzle(idx)}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer relative flex items-center justify-between ${
                    pair.solved
                      ? "border-emerald-500 bg-emerald-50/80 shadow-md ring-2 ring-emerald-300"
                      : "border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/40 shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">
                      {pair.solved ? "🌟" : "❓"}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5 font-black text-slate-800 text-sm">
                        <span className="text-emerald-700">{pair.word1}</span>
                        <span className="text-slate-400">↔</span>
                        <span className="text-teal-700">{pair.word2}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">
                        {pair.bangla}
                      </span>
                    </div>
                  </div>

                  {pair.solved ? (
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-600 text-white text-[11px] font-black flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Matched</span>
                    </span>
                  ) : (
                    <button className="px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-black transition-all">
                      Match ➔
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Teacher's Reading Corner note */}
            <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-200 text-[11px] text-sky-900 font-medium flex items-center justify-between">
              <span>💡 Porshi and her friends love reading English rhymes and solving joyful word puzzles!</span>
              <button
                onClick={() =>
                  handleSpeak(
                    "In the classroom, teacher divides students into small friendly groups to solve puzzles and read poems. School is a place of great joy and learning for Porshi."
                  )
                }
                className="p-1 rounded-lg bg-sky-200 hover:bg-sky-300 text-sky-900 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: SCHOOL FLOWER GARDEN & BREAK TIME                 */}
        {/* ======================================================== */}
        {activeTab === "garden" && (
          <div className="space-y-3">
            {/* Visual Flower Garden in front of school */}
            <div className="relative rounded-2xl bg-linear-to-b from-sky-100 via-emerald-100 to-green-100 border-2 border-emerald-300 p-4 overflow-hidden shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-emerald-900 bg-white/80 px-2.5 py-0.5 rounded-xl border border-emerald-200 shadow-2xs">
                  🌸 Flower Garden in Front of Joypur GPS
                </span>
                <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">
                  Tiffin Break Time 🌿
                </span>
              </div>

              {/* 4 Flower Beds */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-2">
                {[
                  { name: "Red Roses", bangla: "লাল গোলাপ", icon: "🌹", color: "border-rose-300 bg-rose-50/70" },
                  { name: "Yellow Marigolds", bangla: "গাঁদা ফুল", icon: "🌼", color: "border-amber-300 bg-amber-50/70" },
                  { name: "Cosmos & Zinnias", bangla: "কসমস ফুল", icon: "🌺", color: "border-purple-300 bg-purple-50/70" },
                  { name: "Sunflowers", bangla: "সূর্যমুখী ফুল", icon: "🌻", color: "border-yellow-300 bg-yellow-50/70" },
                ].map((flower, fIdx) => (
                  <div
                    key={fIdx}
                    className={`p-2.5 rounded-xl border-2 ${flower.color} flex flex-col items-center justify-center text-center shadow-xs transition-all ${
                      isWatering ? "scale-105" : ""
                    }`}
                  >
                    <span className="text-3xl mb-1">{flower.icon}</span>
                    <span className="font-black text-slate-800 text-xs">{flower.name}</span>
                    <span className="text-[10px] text-slate-600 font-medium">{flower.bangla}</span>
                    {waterCount > 0 && (
                      <span className="mt-1 text-[9px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                        Fresh & Blooming ✨
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {isWatering && (
                <div className="absolute inset-0 bg-sky-600/30 backdrop-blur-2xs flex items-center justify-center z-10 animate-fadeIn">
                  <div className="bg-white p-3 rounded-2xl shadow-xl flex items-center gap-2 border border-sky-300">
                    <Droplets className="w-5 h-5 text-sky-500 animate-bounce" />
                    <span className="font-black text-sky-900 text-xs sm:text-sm">
                      Watering the Flower Garden with Porshi! 💧
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Garden Controls */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-emerald-200 shadow-xs flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleWaterGarden}
                  disabled={isWatering}
                  className="px-4 py-2 rounded-xl bg-linear-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Droplets className="w-4 h-4 text-sky-300" />
                  <span>Water Garden (গাছে পানি দাও)</span>
                </button>
                <button
                  onClick={handleRingBell}
                  disabled={bellRinging}
                  className="px-3 py-2 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Bell className={`w-4 h-4 ${bellRinging ? "animate-spin" : ""}`} />
                  <span>Ring Bell 🔔</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Garden Health:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs">
                  {waterCount * 25}% Green 🌿
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Profile Summary Badge */}
      <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between text-[11px] text-slate-600 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-emerald-950">👧 Porshi (৮ বছর, ৩য় শ্রেণি)</span>
          <span>•</span>
          <span>জয়পুর সরকারি প্রাথমিক বিদ্যালয়, কুষ্টিয়া</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-800 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>School is a place of great joy and learning!</span>
        </div>
      </div>
    </div>
  );
}
