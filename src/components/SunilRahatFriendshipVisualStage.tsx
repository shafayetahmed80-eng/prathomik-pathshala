"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Volume2, Heart, Palette, BookOpen, Trophy, Check, RefreshCw, Star, Users } from "lucide-react";
import confetti from "canvas-confetti";

interface SunilRahatFriendshipVisualStageProps {
  slideId: number;
  playChime?: (type: "correct" | "click" | "fanfare") => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

export default function SunilRahatFriendshipVisualStage({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}: SunilRahatFriendshipVisualStageProps) {
  // Modes: "banyan" (Sharing tiffin under banyan tree) | "hobbies" (Drawing vs Adventure) | "football" (Playground match)
  const [activeTab, setActiveTab] = useState<"banyan" | "hobbies" | "football">(() => {
    if (slideId === 5) return "banyan";
    if (slideId === 6) return "football";
    if (slideId === 4) return "hobbies";
    return "banyan";
  });

  // Tiffin sharing state
  const [tiffinShared, setTiffinShared] = useState<boolean>(false);
  const [tiffinCount, setTiffinCount] = useState<number>(0);

  // Drawing & Reading state
  const [paintingColor, setPaintingColor] = useState<string>("sky");
  const [pageTurned, setPageTurned] = useState<boolean>(false);

  // Football goal state
  const [goalsScored, setGoalsScored] = useState<number>(0);
  const [isKicking, setIsKicking] = useState<boolean>(false);

  // Sync tab with slide changes
  useEffect(() => {
    if (slideId === 5) {
      setActiveTab("banyan");
    } else if (slideId === 6) {
      setActiveTab("football");
    } else if (slideId === 4) {
      setActiveTab("hobbies");
    } else {
      setActiveTab("banyan");
    }
  }, [slideId]);

  // Share Tiffin
  const handleShareTiffin = () => {
    playChime?.("click");
    setTiffinShared(true);
    setTiffinCount((prev) => prev + 1);
    handleSpeak("During the tiffin break, they sit under a big banyan tree and share their homemade food! Sharing is caring!");

    setTimeout(() => {
      playChime?.("fanfare");
      confetti({ particleCount: 35, spread: 70, origin: { y: 0.6 } });
    }, 800);
  };

  // Kick Football
  const handleKickFootball = () => {
    setIsKicking(true);
    playChime?.("click");
    handleSpeak("Goal! Sunil passes to Rahat, and Rahat shoots into the net!");

    setTimeout(() => {
      setIsKicking(false);
      setGoalsScored((prev) => prev + 1);
      playChime?.("fanfare");
      confetti({ particleCount: 40, spread: 75, origin: { y: 0.5 } });
    }, 1200);
  };

  return (
    <div
      className={`w-full rounded-3xl bg-linear-to-b from-emerald-50 via-teal-50/40 to-sky-50 border-2 border-emerald-200/80 p-3 sm:p-5 shadow-inner flex flex-col justify-between ${
        isFullTheater ? "min-h-[500px]" : "min-h-[420px]"
      }`}
    >
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-3 border-b border-emerald-200/70 gap-2 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-xl shadow-md ring-2 ring-emerald-200 shrink-0">
            🤝
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Unit 2 • Lesson 5
              </span>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-full">
                Best Friends & Classmates (pp. 31–34)
              </span>
            </div>
            <h3 className="font-black text-slate-800 text-sm sm:text-base leading-tight mt-0.5">
              My Friend — Sunil & Rahat (সুনীল ও রাহাতের বন্ধুত্ব)
            </h3>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-white/90 p-1 rounded-2xl border border-emerald-200 shadow-2xs">
          <button
            onClick={() => {
              setActiveTab("banyan");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === "banyan"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            <span>🌳</span>
            <span>Tiffin Tree</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("hobbies");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === "hobbies"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Hobbies</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("football");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === "football"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Football</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="my-3 flex-1">
        {/* ======================================================== */}
        {/* TAB 1: BANYAN TREE TIFFIN SHARING SPOT                   */}
        {/* ======================================================== */}
        {activeTab === "banyan" && (
          <div className="space-y-3">
            {/* Visual Banyan Tree Setting */}
            <div className="relative rounded-2xl bg-linear-to-b from-emerald-100 via-teal-100 to-green-200 border-2 border-emerald-300 p-4 shadow-md text-center overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-emerald-950 bg-white/80 px-2.5 py-0.5 rounded-xl border border-emerald-200 shadow-2xs">
                  🌳 Under the Big Banyan Tree
                </span>
                <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">
                  Tiffin Break Time 🍱
                </span>
              </div>

              {/* Sunil & Rahat sharing food */}
              <div className="py-2 flex items-center justify-around">
                {/* Sunil Left */}
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-1">👦</span>
                  <span className="font-black text-xs text-slate-800">Sunil</span>
                  <span className="text-[10px] text-emerald-800 bg-white/80 px-2 py-0.5 rounded-full mt-1">
                    Homemade Parata 🫓
                  </span>
                </div>

                {/* Shared Box Center */}
                <div
                  className={`p-3 rounded-2xl bg-white border-2 border-emerald-300 shadow-md flex flex-col items-center transition-all ${
                    tiffinShared ? "scale-110 ring-4 ring-amber-300" : ""
                  }`}
                >
                  <span className="text-3xl mb-1">🍱 🍎 🥪</span>
                  <span className="text-[11px] font-black text-emerald-900">
                    {tiffinShared ? "Tiffin Shared with Joy! ❤️" : "Click to Share Tiffin"}
                  </span>
                </div>

                {/* Rahat Right */}
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-1">👦</span>
                  <span className="font-black text-xs text-slate-800">Rahat</span>
                  <span className="text-[10px] text-teal-800 bg-white/80 px-2 py-0.5 rounded-full mt-1">
                    Sweet Mangoes 🥭
                  </span>
                </div>
              </div>
            </div>

            {/* Banyan Controls */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-emerald-200 shadow-xs flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShareTiffin}
                  className="px-4 py-2 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <span>🍱</span>
                  <span>Share Tiffin (টিফিন ভাগ করে খাও)</span>
                </button>
                <button
                  onClick={() =>
                    handleSpeak(
                      "Sunil and Rahat are classmates and best friends. Both of them read in Class 3. During the tiffin break, they sit under a big banyan tree and share their homemade food."
                    )
                  }
                  className="p-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs font-bold text-slate-700">
                <span>Friendship Moments: </span>
                <span className="font-black text-emerald-800">{tiffinCount} Times ★</span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: HOBBIES (DRAWING VS ADVENTURE)                    */}
        {/* ======================================================== */}
        {activeTab === "hobbies" && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Sunil's Drawing */}
              <div className="p-3 bg-white rounded-2xl border-2 border-indigo-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-indigo-900 flex items-center gap-1">
                      <Palette className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Sunil's Hobby: Drawing</span>
                    </span>
                    <span className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-bold">
                      Artist 🎨
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">"Sunil loves drawing pictures of green nature and boats."</p>

                  <div className="my-2 p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-center text-3xl">
                    ⛵ 🏞️ 🌳 ☀️
                  </div>
                </div>

                <button
                  onClick={() => {
                    playChime?.("click");
                    setPaintingColor((prev) => (prev === "sky" ? "sunset" : "sky"));
                    handleSpeak("Sunil loves drawing pictures of green nature, birds, and riverboats!");
                  }}
                  className="w-full py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Change Paint Palette 🎨
                </button>
              </div>

              {/* Rahat's Adventure Stories */}
              <div className="p-3 bg-white rounded-2xl border-2 border-amber-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-amber-900 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                      <span>Rahat's Hobby: Reading</span>
                    </span>
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold">
                      Bookworm 📚
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">"Rahat loves reading exciting adventure storybooks."</p>

                  <div className="my-2 p-3 rounded-xl bg-amber-50/60 border border-amber-100 text-center text-3xl">
                    🦁 🗺️ 🧭 🏰
                  </div>
                </div>

                <button
                  onClick={() => {
                    playChime?.("click");
                    setPageTurned((prev) => !prev);
                    handleSpeak("Rahat loves reading thrilling adventure stories of brave explorers!");
                  }}
                  className="w-full py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Turn Adventure Page 📖
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: SCHOOL PLAYGROUND FOOTBALL MATCH                  */}
        {/* ======================================================== */}
        {activeTab === "football" && (
          <div className="space-y-3">
            {/* Visual Football Ground */}
            <div className="relative rounded-2xl bg-linear-to-b from-sky-100 via-emerald-100 to-green-200 border-2 border-emerald-300 p-4 shadow-md text-center">
              <span className="text-xs font-black text-emerald-950 bg-white/80 px-2.5 py-0.5 rounded-xl border border-emerald-200 shadow-2xs inline-block mb-2">
                ⚽ School Ground: Afternoon Football Match
              </span>

              {/* Football Pitch */}
              <div className="my-2 p-3 bg-white/80 rounded-2xl border border-emerald-300 flex items-center justify-around">
                <div className="text-center">
                  <span className="text-3xl block">👦</span>
                  <span className="text-[10px] font-black text-slate-700">Sunil</span>
                </div>
                <div className={`text-4xl transition-all duration-300 ${isKicking ? "scale-150 rotate-45" : ""}`}>
                  ⚽
                </div>
                <div className="text-center">
                  <span className="text-3xl block">👦</span>
                  <span className="text-[10px] font-black text-slate-700">Rahat</span>
                </div>
                <div className="text-3xl">🥅</div>
              </div>

              {isKicking && (
                <div className="mt-1 bg-emerald-800 text-white p-1.5 rounded-xl text-center text-xs font-black animate-pulse">
                  ⚡ "Great pass by Sunil, and a fantastic goal by Rahat!"
                </div>
              )}
            </div>

            {/* Match Controls */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-emerald-200 shadow-xs flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleKickFootball}
                  disabled={isKicking}
                  className="px-4 py-2 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <span>⚽</span>
                  <span>Kick & Score Goal (গোল মারো)</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Goals Scored:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs">
                  {goalsScored} Goals 🏆
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Profile Summary Badge */}
      <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between text-[11px] text-slate-600 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-emerald-950">👦 Sunil & 👦 Rahat</span>
          <span>•</span>
          <span>Class 3 best friends: Walking, sharing tiffin & playing together!</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-800 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>True friendship makes school life full of joy!</span>
        </div>
      </div>
    </div>
  );
}
