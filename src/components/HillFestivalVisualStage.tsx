"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Volume2, Heart, Award, Check, Waves, Sun, Flower2, Utensils, Mountain, Smile, Play, RefreshCw, Star } from "lucide-react";
import confetti from "canvas-confetti";

interface HillFestivalVisualStageProps {
  slideId: number;
  playChime?: (type: "correct" | "click" | "fanfare") => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

interface FloatingFlower {
  id: number;
  x: number; // percentage across river
  color: string;
  name: string;
}

export default function HillFestivalVisualStage({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}: HillFestivalVisualStageProps) {
  // Modes: "phool" (Day 1: Phool Biju) | "pachan" (Day 2: Mul Biju & Cooking) | "gajjya" (Day 3: Gajjya Pajjya & Blessings) | "explore"
  const [activeDay, setActiveDay] = useState<"phool" | "pachan" | "gajjya" | "explore">(() => {
    if (slideId === 5) return "phool";
    if (slideId === 4) return "phool";
    if (slideId === 6) return "pachan";
    return "phool";
  });

  // Day 1: Floating Flowers in Sangu River
  const [floatingFlowers, setFloatingFlowers] = useState<FloatingFlower[]>([
    { id: 1, x: 25, color: "#f43f5e", name: "Red Wild Orchid" },
    { id: 2, x: 50, color: "#fbbf24", name: "Yellow Forest Marigold" },
    { id: 3, x: 75, color: "#ec4899", name: "Pink Lotus" },
  ]);
  const [floatedCount, setFloatedCount] = useState<number>(3);

  // Day 2: Pachan Cooking Ingredients Added (5 items)
  const [pachanIngredients, setPachanIngredients] = useState<Record<string, boolean>>({
    bamboo: false,
    herbs: false,
    pumpkin: false,
    beans: false,
    papaya: false,
  });

  // Day 3: Elder Blessing
  const [hasReceivedBlessing, setHasReceivedBlessing] = useState<boolean>(false);

  // Sync with slide changes
  useEffect(() => {
    if (slideId === 5) {
      setActiveDay("phool");
    } else if (slideId === 6) {
      setActiveDay("pachan");
    } else if (slideId === 2) {
      setActiveDay("explore");
    } else {
      setActiveDay("phool");
    }
  }, [slideId]);

  // Float another flower in river
  const handleFloatFlower = () => {
    playChime?.("click");
    const colors = ["#f43f5e", "#fbbf24", "#ec4899", "#8b5cf6", "#38bdf8"];
    const names = ["Wild Orchid", "Forest Bloom", "River Petal", "Mountain Lily", "Biju Flower"];
    const randColor = colors[Math.floor(Math.random() * colors.length)];
    const randName = names[Math.floor(Math.random() * names.length)];

    const newFlower: FloatingFlower = {
      id: Date.now(),
      x: Math.floor(Math.random() * 70) + 15,
      color: randColor,
      name: randName,
    };

    setFloatingFlowers((prev) => [...prev.slice(-6), newFlower]);
    setFloatedCount((c) => c + 1);
    playChime?.("fanfare");
    handleSpeak(`Savana and Anika float fresh ${randName} in the river with prayers for peace and joy!`);
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
  };

  // Add ingredient to Pachan pot
  const handleAddIngredient = (key: string, name: string) => {
    if (pachanIngredients[key]) return;
    playChime?.("correct");
    const updated = { ...pachanIngredients, [key]: true };
    setPachanIngredients(updated);

    const count = Object.values(updated).filter(Boolean).length;
    if (count === 5) {
      playChime?.("fanfare");
      handleSpeak("Hooray! The traditional delicious Pachan is ready with more than thirty herbs! Shubho Biju!");
      confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });
    } else {
      handleSpeak(`Added fresh ${name} into the festive Pachan pot!`);
    }
  };

  // Receive Elder's Blessing
  const handleBlessing = () => {
    setHasReceivedBlessing(true);
    playChime?.("fanfare");
    handleSpeak("May the New Year bring you wisdom, good health, peace and happiness! Biju Shubheccha!");
    confetti({ particleCount: 35, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className={`flex flex-col h-full rounded-3xl bg-linear-to-b from-emerald-50 via-teal-50 to-amber-50 border border-slate-200 shadow-2xs overflow-hidden ${isFullTheater ? "p-4 sm:p-6" : "p-3 sm:p-4"}`}>
      {/* Top Header & Day Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2.5 border-b border-emerald-200/80 shrink-0">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-2xl bg-emerald-600 text-white shadow-xs text-base">
            🌸
          </span>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-200">
                Bandarban Hill Tracts
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                3 Joyful Days
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-black text-slate-800">
              Enjoying a Hill Festival — Biju in Bandarban (বান্দরবানে বিজু উৎসব)
            </h3>
          </div>
        </div>

        {/* 3 Days Selector Tabs */}
        <div className="flex items-center gap-1 bg-white/80 p-1 rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => {
              setActiveDay("phool");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 whitespace-nowrap ${
              activeDay === "phool"
                ? "bg-rose-500 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>🌺</span>
            <span>১. ফুল বিজু (Phool Biju)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveDay("pachan");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 whitespace-nowrap ${
              activeDay === "pachan"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>🍲</span>
            <span>২. মূল বিজু (Mul Biju)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveDay("gajjya");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 whitespace-nowrap ${
              activeDay === "gajjya"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>🕊️</span>
            <span>৩. গোজ্যাপোজ্যা (Gajjya Pajjya)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveDay("explore");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 whitespace-nowrap ${
              activeDay === "explore"
                ? "bg-teal-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>🏔️</span>
            <span>সংস্কৃতি ল্যাব</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Canvas */}
      <div className="relative flex-1 min-h-[300px] w-full mt-2.5 rounded-2xl overflow-hidden border border-emerald-200/80 bg-linear-to-b from-sky-200 via-emerald-100 to-amber-100 select-none flex flex-col justify-between p-3">
        {/* Scenic Background Hills of Bandarban */}
        <div className="absolute inset-0 pointer-events-none opacity-45">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 200">
            {/* Distant Blue Hills */}
            <path d="M 0 130 Q 120 70 250 120 T 500 90 L 500 200 L 0 200 Z" fill="#0284c7" opacity="0.3" />
            {/* Lush Green Hills */}
            <path d="M 0 150 Q 150 90 320 140 T 500 120 L 500 200 L 0 200 Z" fill="#059669" opacity="0.4" />
          </svg>
        </div>

        {/* Floating Sun at Dawn */}
        <div className="absolute top-2.5 left-3 z-10 flex items-center gap-2">
          <div className="px-3 py-1 rounded-xl bg-white/95 backdrop-blur-xs border border-emerald-300 shadow-2xs text-[11px] font-black text-emerald-950 flex items-center gap-1.5">
            <Sun className="w-4 h-4 text-amber-500 fill-amber-400 animate-spin" style={{ animationDuration: "14s" }} />
            <span>ভোরের শান্ত আলো • সাংগু নদী ও বান্দরবানের সবুজ পাহাড়</span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DAY 1: PHOOL BIJU — FLOATING FLOWERS IN RIVER                */}
        {/* ------------------------------------------------------------- */}
        {activeDay === "phool" && (
          <div className="relative w-full h-full flex flex-col justify-between z-10 pt-8">
            {/* Upper Bank: Anika and Savana in Traditional Dress */}
            <div className="flex items-center justify-between px-3 sm:px-6">
              <div className="flex items-end gap-3">
                <div className="flex flex-col items-center">
                  <span className="px-1.5 py-0.2 rounded-md bg-rose-600 text-white text-[9px] font-bold shadow-2xs">
                    Savana (সাভানা)
                  </span>
                  <span className="text-3xl sm:text-4xl filter drop-shadow-md">
                    👧🌸
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="px-1.5 py-0.2 rounded-md bg-amber-600 text-white text-[9px] font-bold shadow-2xs">
                    Anika (আনিকা)
                  </span>
                  <span className="text-3xl sm:text-4xl filter drop-shadow-md">
                    👧🌼
                  </span>
                </div>
              </div>

              {/* Day 1 Motto Card */}
              <div className="max-w-[200px] p-2 rounded-xl bg-white/90 border border-rose-300 shadow-2xs text-right">
                <p className="text-[10px] font-black text-rose-900">১ম দিন: ফুল বিজু</p>
                <p className="text-[9px] text-slate-600">ভোরে বন থেকে ফুল এনে নদীর জলে ভাসিয়ে শান্তির প্রার্থনা।</p>
              </div>
            </div>

            {/* Sangu River Flow Visual with Animated Floating Flowers */}
            <div className="relative w-full h-32 sm:h-40 rounded-2xl overflow-hidden mt-auto border-t-2 border-emerald-300 bg-linear-to-r from-sky-400 via-teal-300 to-sky-400 shadow-inner flex items-center">
              {/* Animated Wave Lines */}
              <div className="absolute inset-0 opacity-40 flex flex-col justify-around pointer-events-none">
                <div className="w-full h-1 bg-white animate-pulse" />
                <div className="w-full h-1 bg-white animate-pulse" style={{ animationDelay: "0.5s" }} />
                <div className="w-full h-1 bg-white animate-pulse" style={{ animationDelay: "1s" }} />
              </div>

              {/* Floating Flowers Along River */}
              {floatingFlowers.map((flower) => (
                <div
                  key={flower.id}
                  className="absolute transition-all duration-700 ease-out flex flex-col items-center animate-bounce"
                  style={{
                    left: `${flower.x}%`,
                    top: "40%",
                    transform: "translate(-50%, -50%)",
                    animationDuration: "2.5s",
                  }}
                >
                  <span className="text-2xl filter drop-shadow-sm">🌺</span>
                  <span className="text-[8px] font-bold bg-white/90 px-1 rounded-full text-slate-700 shadow-2xs whitespace-nowrap">
                    {flower.name}
                  </span>
                </div>
              ))}

              {/* River Bank Label */}
              <div className="absolute bottom-1 right-3 text-[10px] font-bold text-white/90 drop-shadow-sm">
                🌊 সাংগু নদী (Sangu River) • মোট ফুল ভাসানো: {floatedCount}টি
              </div>
            </div>

            {/* Bottom Controls for Day 1 */}
            <div className="mt-2 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-xs border border-rose-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-rose-100 text-rose-700 text-sm">
                  🌸
                </span>
                <div>
                  <p className="text-xs font-black text-slate-800">
                    "On the first day, children float wild flowers in the river."
                  </p>
                  <p className="text-[11px] text-slate-600">
                    ভোরে সংগৃহীত বনফুল নদীর স্রোতে ভাসিয়ে সুন্দর ও শান্তিময় নতুন বছরের প্রার্থনা।
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFloatFlower}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-black bg-rose-500 hover:bg-rose-600 text-white shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span>🌺 নদীতে নতুন ফুল ভাসাও!</span>
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* DAY 2: MUL BIJU — COOKING TRADITIONAL PACHAN                 */}
        {/* ------------------------------------------------------------- */}
        {activeDay === "pachan" && (
          <div className="relative w-full h-full flex flex-col justify-between z-10 pt-4">
            {/* Top Explanation */}
            <div className="bg-amber-900/90 text-white p-2.5 rounded-2xl border border-amber-700 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🍲</span>
                <div>
                  <h4 className="text-xs font-black">২য় দিন: মূল বিজু — ৩০ পদের পাঁচন রান্না (Mul Biju)</h4>
                  <p className="text-[10px] text-amber-200">"A delicious mixed vegetable dish called Pachan is cooked with more than thirty herbs."</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-amber-950">
                {Object.values(pachanIngredients).filter(Boolean).length} / 5 উপাদান যুক্ত
              </span>
            </div>

            {/* Steaming Pot & Interactive Ingredient Baskets */}
            <div className="flex-1 flex flex-col sm:flex-row items-center justify-around gap-4 my-2">
              {/* Giant Traditional Cooking Pot */}
              <div className="relative flex flex-col items-center">
                {/* Steam Rising Animation */}
                <div className="flex items-center gap-2 text-lg animate-pulse mb-1">
                  <span>♨️</span>
                  <span>♨️</span>
                  <span>♨️</span>
                </div>

                <div className="w-36 h-28 sm:w-44 sm:h-32 rounded-b-full bg-linear-to-b from-stone-700 to-stone-900 border-4 border-amber-800 shadow-lg flex items-center justify-center relative">
                  <div className="w-28 h-8 rounded-full bg-amber-600/70 border border-amber-300 absolute -top-4 flex items-center justify-center">
                    <span className="text-[11px] font-black text-white drop-shadow-sm">
                      সুস্বাদু পাঁচন (Pachan)
                    </span>
                  </div>
                  <span className="text-4xl">🍲</span>
                </div>

                <div className="w-40 h-3 bg-amber-950/40 rounded-full blur-xs mt-1" />
              </div>

              {/* 5 Herb & Vegetable Baskets to Click & Add */}
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-1.5 w-full sm:w-56">
                {[
                  { key: "bamboo", name: "Bamboo Shoot (বাঁশকোড়ল)", icon: "🎋" },
                  { key: "herbs", name: "Forest Herbs (পাহাড়ি শাক)", icon: "🌿" },
                  { key: "pumpkin", name: "Sweet Pumpkin (মিষ্টিকুমড়া)", icon: "🎃" },
                  { key: "beans", name: "Hill Beans (পাহাড়ি শিম)", icon: "🫛" },
                  { key: "papaya", name: "Green Papaya (কাঁচা পেঁপে)", icon: "🍈" },
                ].map((item) => {
                  const isAdded = pachanIngredients[item.key];
                  return (
                    <div
                      key={item.key}
                      onClick={() => handleAddIngredient(item.key, item.name)}
                      className={`p-2 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between text-xs font-bold ${
                        isAdded
                          ? "bg-emerald-100 border-emerald-500 text-emerald-950"
                          : "bg-white border-amber-300 hover:bg-amber-50 hover:border-amber-400 text-slate-800"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="text-base">{item.icon}</span>
                        <span className="text-[11px]">{item.name}</span>
                      </span>
                      {isAdded ? (
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                      ) : (
                        <span className="text-[10px] text-amber-700 font-black">+ দিন</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Motto */}
            <div className="p-2 rounded-2xl bg-white border border-amber-200 text-center text-xs text-amber-950 font-bold">
              মূল বিজুতে পাহাড়ি ঘরে ঘরে ৩০টিরও বেশি পদের ভেষজ দিয়ে পাঁচন রান্না হয় এবং আত্মীয়-স্বজনদের আপ্যায়ন করা হয়।
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* DAY 3: GAJJYA PAJJYA — REST & ELDERS' BLESSINGS             */}
        {/* ------------------------------------------------------------- */}
        {activeDay === "gajjya" && (
          <div className="relative w-full h-full flex flex-col justify-between z-10 pt-4">
            {/* Top Banner */}
            <div className="bg-indigo-900/90 text-white p-2.5 rounded-2xl border border-indigo-700 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🕊️</span>
                <div>
                  <h4 className="text-xs font-black">৩য় দিন: গোজ্যাপোজ্যা — বিশ্রাম ও গুরুজনদের আশীর্বাদ (Gajjya Pajjya)</h4>
                  <p className="text-[10px] text-indigo-200">"The third day is a peaceful day of rest and visiting elders for blessings."</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-indigo-300 text-indigo-950">
                Peace & Blessings 🌸
              </span>
            </div>

            {/* Peaceful Living Room with Grandfather & Children */}
            <div className="flex-1 flex flex-col items-center justify-center p-3 relative">
              {/* Grandfather's Blessing Bubble */}
              <div className={`max-w-md p-3.5 rounded-2xl bg-white border-2 border-indigo-300 shadow-md text-center transition-all ${hasReceivedBlessing ? "scale-105 ring-4 ring-amber-300" : ""}`}>
                <p className="text-xs sm:text-sm font-black text-indigo-950 leading-relaxed">
                  "May your new year be peaceful, sweet and joyful.<br />
                  Stay united, love nature, and respect everyone!" ✨
                </p>
                <p className="text-[10px] text-slate-500 font-bold mt-1">
                  — গুরুজনদের আশীর্বাদ ও শুভ বিজু শুভেচ্ছা (Elders' New Year Blessing)
                </p>
              </div>

              {/* Characters */}
              <div className="flex items-end justify-center gap-4 mt-3">
                <div className="flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl">👧🎁</span>
                  <span className="text-[10px] font-bold text-slate-700">Anika</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-4xl sm:text-5xl">👴🪷</span>
                  <span className="text-[11px] font-black px-2 py-0.2 rounded-full bg-indigo-600 text-white">
                    Elder (দাদু)
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl">👧🫖</span>
                  <span className="text-[10px] font-bold text-slate-700">Savana</span>
                </div>
              </div>
            </div>

            {/* Blessing Button */}
            <div className="p-2.5 rounded-2xl bg-white border border-indigo-200 shadow-xs flex items-center justify-between gap-2">
              <p className="text-xs text-slate-700 font-medium">
                গুরুজনদের কাছে নতুন বছরের স্নেহাশীর্বাদ গ্রহণ করতে ক্লিক করুন:
              </p>
              <button
                type="button"
                onClick={handleBlessing}
                className="px-4 py-2 rounded-xl text-xs font-black bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all shadow-xs flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>{hasReceivedBlessing ? "✓ আশীর্বাদ গ্রহণ সম্পন্ন" : "আশীর্বাদ গ্রহণ করো ➔"}</span>
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE 4: CULTURAL EXPLORER                                     */}
        {/* ------------------------------------------------------------- */}
        {activeDay === "explore" && (
          <div className="relative w-full h-full flex flex-col justify-between z-10 pt-4">
            {/* Top Explorer Banner */}
            <div className="bg-teal-900/90 text-white p-2.5 rounded-2xl border border-teal-700 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏔️</span>
                <div>
                  <h4 className="text-xs font-black">বান্দরবান সংস্কৃতি ল্যাব (Hill Festival Cultural Explorer)</h4>
                  <p className="text-[10px] text-teal-200">বিজু উৎসবের ঐতিহ্য ও সম্প্রীতির উপাদানগুলো জানুন</p>
                </div>
              </div>
            </div>

            {/* 4 Cultural Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-2 flex-1">
              <div
                onClick={() => handleSpeak("Phool Biju is the first day of Biju. Children float wild flowers in the river.")}
                className="p-3 rounded-2xl bg-white border-2 border-rose-200 hover:border-rose-400 cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌸</span>
                  <h5 className="font-black text-xs text-rose-950">ফুল বিজু (Phool Biju)</h5>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  বাংলা বছরের শেষ দুই দিন আগে ভোরে ফুল সংগ্রহ করে নদীর জলে ভাসিয়ে বিগত বছরের গ্লানি মুছে ফেলার রীতি।
                </p>
              </div>

              <div
                onClick={() => handleSpeak("Mul Biju is the second day. Families cook Pachan with thirty herbs.")}
                className="p-3 rounded-2xl bg-white border-2 border-amber-200 hover:border-amber-400 cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🍲</span>
                  <h5 className="font-black text-xs text-amber-950">মূল বিজু ও পাঁচন (Mul Biju)</h5>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  উৎসবের প্রধান দিন। ঘরে ঘরে নানা পদের পাহাড়ি শাকসবজি দিয়ে রান্না পাঁচন সবার সাথে ভাগ করে খাওয়া হয়।
                </p>
              </div>

              <div
                onClick={() => handleSpeak("Gajjya Pajjya is the third day of rest and seeking blessings from elders.")}
                className="p-3 rounded-2xl bg-white border-2 border-indigo-200 hover:border-indigo-400 cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🕊️</span>
                  <h5 className="font-black text-xs text-indigo-950">গোজ্যাপোজ্যা (Gajjya Pajjya)</h5>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  নতুন বছরের প্রথম দিন। দিনটি কাটানো হয় শান্তিতে, ঘরে বিশ্রাম নিয়ে এবং বয়োজ্যেষ্ঠদের সম্মান জানিয়ে।
                </p>
              </div>

              <div
                onClick={() => handleSpeak("Bandarban is a scenic hilly district with rich cultural harmony and unity.")}
                className="p-3 rounded-2xl bg-white border-2 border-teal-200 hover:border-teal-400 cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏔️</span>
                  <h5 className="font-black text-xs text-teal-950">বান্দরবানের সম্প্রীতি (Cultural Unity)</h5>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  পাহাড়, নদী ও নানা জাতিগোষ্ঠীর বর্ণাঢ্য মিলনমেলা যা আমাদের দেশের সাংস্কৃতিক বৈচিত্র্য ও ভালোবাসার প্রতীক।
                </p>
              </div>
            </div>

            {/* Bottom Motto */}
            <div className="p-2 rounded-2xl bg-white border border-teal-200 text-center text-xs text-teal-950 font-bold">
              "The hill festival fills everyone's heart with joy, harmony and unity."
            </div>
          </div>
        )}
      </div>

      {/* Footer Educational Motto Bar */}
      <div className="mt-2.5 pt-2 border-t border-emerald-200/80 flex items-center justify-between text-[11px] text-emerald-950 font-bold shrink-0">
        <span className="flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>"Harmony, peace and friendship in the beautiful hills of Bangladesh."</span>
        </span>
        <span className="text-emerald-800 text-[10px] font-semibold hidden sm:inline">
          বৈচিত্র্যের মাঝে ঐক্য ও সম্প্রীতির উৎসব ❤️
        </span>
      </div>
    </div>
  );
}
