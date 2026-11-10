"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Volume2, Heart, Sun, Moon, Flame, Trophy, Check, RefreshCw, Star, Users } from "lucide-react";
import confetti from "canvas-confetti";

interface OsmansVillageLifeVisualStageProps {
  slideId: number;
  playChime?: (type: "correct" | "click" | "fanfare") => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

export default function OsmansVillageLifeVisualStage({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}: OsmansVillageLifeVisualStageProps) {
  // Modes: "farm" (Morning farm chores) | "games" (Ha-du-du on open field) | "evening" (Homework by lamp light)
  const [activeTab, setActiveTab] = useState<"farm" | "games" | "evening">(() => {
    if (slideId === 5) return "farm";
    if (slideId === 6) return "games";
    return "farm";
  });

  // Morning farm state
  const [fedCows, setFedCows] = useState<boolean>(false);
  const [fedGoats, setFedGoats] = useState<boolean>(false);
  const [feedCount, setFeedCount] = useState<number>(0);

  // Ha-du-du game state
  const [isChanting, setIsChanting] = useState<boolean>(false);
  const [haduduScore, setHaduduScore] = useState<number>(0);

  // Evening study state
  const [lampOn, setLampOn] = useState<boolean>(true);
  const [homeworkDone, setHomeworkDone] = useState<boolean>(false);

  // Sync tab with slide changes
  useEffect(() => {
    if (slideId === 5) {
      setActiveTab("farm");
    } else if (slideId === 6) {
      setActiveTab("games");
    } else if (slideId === 4) {
      setActiveTab("farm");
    } else {
      setActiveTab("farm");
    }
  }, [slideId]);

  // Feed animals
  const handleFeedAnimals = () => {
    playChime?.("click");
    handleSpeak("Osman helps his elder brother feed fresh green grass to their cows and goats!");
    setFedCows(true);
    setFedGoats(true);
    setFeedCount((prev) => prev + 1);

    setTimeout(() => {
      playChime?.("fanfare");
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
    }, 1000);
  };

  // Play Ha-du-du
  const handlePlayHadudu = () => {
    setIsChanting(true);
    playChime?.("click");
    handleSpeak("Ha-du-du-du-du! Osman raids into the opponent court with great agility!");

    setTimeout(() => {
      setIsChanting(false);
      setHaduduScore((prev) => prev + 2);
      playChime?.("fanfare");
      confetti({ particleCount: 40, spread: 70, origin: { y: 0.5 } });
    }, 1800);
  };

  // Complete Homework
  const handleCompleteHomework = () => {
    playChime?.("correct");
    setHomeworkDone(true);
    handleSpeak("Osman finishes his English and Math homework under the soft light of the lamp!");
    setTimeout(() => {
      playChime?.("fanfare");
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
    }, 600);
  };

  return (
    <div
      className={`w-full rounded-3xl bg-linear-to-b from-amber-50 via-emerald-50/40 to-teal-50 border-2 border-emerald-200/80 p-3 sm:p-5 shadow-inner flex flex-col justify-between ${
        isFullTheater ? "min-h-[500px]" : "min-h-[420px]"
      }`}
    >
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-3 border-b border-emerald-200/70 gap-2 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-emerald-600 to-green-500 text-white flex items-center justify-center font-black text-xl shadow-md ring-2 ring-emerald-200 shrink-0">
            🌾
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Unit 5 • Lesson 3
              </span>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-full">
                Green Village Life (pp. 71–75)
              </span>
            </div>
            <h3 className="font-black text-slate-800 text-sm sm:text-base leading-tight mt-0.5">
              Osman's Village Life (ওসমানের শান্তিময় গ্রামীণ জীবন)
            </h3>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-white/90 p-1 rounded-2xl border border-emerald-200 shadow-2xs">
          <button
            onClick={() => {
              setActiveTab("farm");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === "farm"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Farm & Chores</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("games");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === "games"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Ha-du-du</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("evening");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === "evening"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Lamp Study</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="my-3 flex-1">
        {/* ======================================================== */}
        {/* TAB 1: MORNING FARM & CHORES                             */}
        {/* ======================================================== */}
        {activeTab === "farm" && (
          <div className="space-y-3">
            {/* Visual Village Scenery */}
            <div className="relative rounded-2xl bg-linear-to-b from-sky-200 via-amber-100 to-emerald-200 border-2 border-emerald-300 p-4 overflow-hidden shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-emerald-950 bg-white/80 px-2.5 py-0.5 rounded-xl border border-emerald-200 shadow-2xs">
                  🏡 Osman's Homestead & Paddy Fields
                </span>
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  Morning Sunrise 🌅
                </span>
              </div>

              {/* Animals & Grass feeding */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-2">
                <div className="p-3 bg-white/90 rounded-2xl border border-emerald-200 shadow-2xs flex flex-col items-center text-center">
                  <span className="text-4xl mb-1">🐄</span>
                  <span className="font-black text-xs text-slate-800">Cows (গরু)</span>
                  <span className="text-[10px] text-emerald-700 font-bold mt-1">
                    {fedCows ? "Fed with Green Grass 🌱" : "Waiting for Grass..."}
                  </span>
                </div>
                <div className="p-3 bg-white/90 rounded-2xl border border-emerald-200 shadow-2xs flex flex-col items-center text-center">
                  <span className="text-4xl mb-1">🐐</span>
                  <span className="font-black text-xs text-slate-800">Goats (ছাগল)</span>
                  <span className="text-[10px] text-emerald-700 font-bold mt-1">
                    {fedGoats ? "Chewing Fresh Leaves 🌿" : "Waiting for Grass..."}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1 p-3 bg-white/90 rounded-2xl border border-emerald-200 shadow-2xs flex flex-col items-center text-center justify-center">
                  <span className="text-3xl mb-1">🍚 🍲</span>
                  <span className="font-black text-xs text-slate-800">Morning Breakfast</span>
                  <span className="text-[10px] text-slate-600 font-medium mt-0.5">Hot Rice & Lentils (ডাল-ভাত)</span>
                </div>
              </div>
            </div>

            {/* Farm Controls */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-emerald-200 shadow-xs flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleFeedAnimals}
                  className="px-4 py-2 rounded-xl bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <span>🌱</span>
                  <span>Feed Green Grass (ঘাস খাওয়াও)</span>
                </button>
                <button
                  onClick={() =>
                    handleSpeak(
                      "Osman lives in a quiet green village surrounded by paddy fields and trees. First, he helps his elder brother feed green grass to their cows and goats. Then he eats hot rice and lentils for breakfast and walks to school."
                    )
                  }
                  className="p-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs font-bold text-slate-700">
                <span>Animals Fed: </span>
                <span className="font-black text-emerald-800">{feedCount} Times ★</span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: HA-DU-DU & AFTERNOON GAMES                        */}
        {/* ======================================================== */}
        {activeTab === "games" && (
          <div className="space-y-3">
            {/* Visual Playground */}
            <div className="relative rounded-2xl bg-linear-to-b from-sky-100 via-emerald-100 to-green-200 border-2 border-emerald-300 p-4 shadow-md text-center">
              <span className="text-xs font-black text-emerald-900 bg-white/80 px-2.5 py-0.5 rounded-xl border border-emerald-200 shadow-2xs inline-block mb-2">
                🏆 Open Green Field: Ha-du-du & Hide-and-Seek
              </span>

              {/* Ha-du-du Court */}
              <div className="my-2 p-3 bg-white/80 backdrop-blur-xs rounded-2xl border border-emerald-300 shadow-inner flex items-center justify-around">
                <div className="text-center">
                  <div className="text-3xl mb-1">👦 👦</div>
                  <span className="text-[11px] font-black text-emerald-800">Team Osman</span>
                </div>
                <div className="h-12 w-0.5 bg-emerald-400 border-dashed border-r-2" />
                <div className="text-center">
                  <div className="text-3xl mb-1">👦 👦</div>
                  <span className="text-[11px] font-black text-teal-800">Opponent Team</span>
                </div>
              </div>

              {isChanting && (
                <div className="mt-2 bg-emerald-800 text-white p-2 rounded-xl text-center shadow-lg text-xs font-black animate-pulse">
                  🏃💨 "Ha-du-du-du-du! Crossing the middle line!"
                </div>
              )}
            </div>

            {/* Game Controls */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-emerald-200 shadow-xs flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayHadudu}
                  disabled={isChanting}
                  className="px-4 py-2 rounded-xl bg-linear-to-r from-amber-600 to-emerald-600 hover:from-amber-700 hover:to-emerald-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Trophy className="w-4 h-4 text-amber-300" />
                  <span>Raid in Ha-du-du! (হা-ডু-ডু রেড)</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Match Points:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs">
                  {haduduScore} Points 🏅
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: EVENING HOMEWORK BY LAMP LIGHT                    */}
        {/* ======================================================== */}
        {activeTab === "evening" && (
          <div className="space-y-3">
            {/* Visual Night Room with Hurricane / Lamp */}
            <div className="relative rounded-2xl bg-linear-to-b from-slate-900 via-indigo-950 to-slate-900 border-2 border-amber-400/50 p-4 shadow-xl text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-amber-300 bg-black/40 px-2.5 py-0.5 rounded-xl border border-amber-400/30">
                  🪔 Evening Study Room in Village Home
                </span>
                <span className="text-xs font-bold text-slate-300 bg-white/10 px-2 py-0.5 rounded-full">
                  7:30 PM 🌙
                </span>
              </div>

              {/* Lamp & Desk */}
              <div className="flex flex-col items-center justify-center py-3">
                <div className="relative">
                  <span className={`text-5xl transition-all duration-300 ${lampOn ? "animate-pulse drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]" : "opacity-40"}`}>
                    🪔
                  </span>
                </div>
                <div className="w-44 h-8 bg-amber-900/60 rounded-xl border border-amber-600/50 mt-2 flex items-center justify-center gap-2 shadow-inner">
                  <span className="text-sm">📖</span>
                  <span className="text-[11px] font-bold text-amber-200">
                    {homeworkDone ? "Homework Completed! ⭐" : "Class 3 English & Math"}
                  </span>
                </div>
              </div>
            </div>

            {/* Homework Controls */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-emerald-200 shadow-xs flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCompleteHomework}
                  className="px-4 py-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <Check className="w-4 h-4 text-amber-300" />
                  <span>Finish Homework (বাড়ির কাজ করো)</span>
                </button>
                <button
                  onClick={() => setLampOn((prev) => !prev)}
                  className="p-2 rounded-xl bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all cursor-pointer"
                  title="Toggle Lamp"
                >
                  <Flame className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs font-bold text-slate-700">
                <span>Status: </span>
                <span className="font-black text-indigo-700">
                  {homeworkDone ? "All Done! 🌟" : "In Progress ✍️"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Profile Summary Badge */}
      <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between text-[11px] text-slate-600 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-emerald-950">👦 Osman (৩য় শ্রেণি)</span>
          <span>•</span>
          <span>Peaceful, green village life with fresh air & simplicity</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-800 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Village life brings peaceful harmony with nature!</span>
        </div>
      </div>
    </div>
  );
}
