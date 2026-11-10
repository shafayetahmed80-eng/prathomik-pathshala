"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Volume2, Heart, Clock, Utensils, Coffee, Check, RefreshCw, Star, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

interface FazleAnitaBreakfastVisualStageProps {
  slideId: number;
  playChime?: (type: "correct" | "click" | "fanfare") => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

interface FoodItem {
  id: string;
  name: string;
  bangla: string;
  icon: string;
  forPerson: "anita" | "fazle";
  served: boolean;
}

export default function FazleAnitaBreakfastVisualStage({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}: FazleAnitaBreakfastVisualStageProps) {
  // Modes: "table" (Dining table food serving) | "manners" (Polite requests) | "hygiene" (Handwashing before eating)
  const [activeTab, setActiveTab] = useState<"table" | "manners" | "hygiene">(() => {
    if (slideId === 4 || slideId === 5) return "table";
    if (slideId === 6) return "manners";
    return "table";
  });

  // Food items on table
  const [foods, setFoods] = useState<FoodItem[]>([
    { id: "egg", name: "Boiled Egg", bangla: "সেদ্ধ ডিম", icon: "🥚", forPerson: "anita", served: false },
    { id: "banana", name: "Sweet Banana", bangla: "মিষ্টি কলা", icon: "🍌", forPerson: "anita", served: false },
    { id: "mango", name: "Fresh Mango", bangla: "টাটকা আম", icon: "🥭", forPerson: "anita", served: false },
    { id: "milk", name: "Warm Milk", bangla: "কুসুম গরম দুধ", icon: "🥛", forPerson: "anita", served: false },
    { id: "ruti", name: "Hot Ruti", bangla: "গরম রুটি", icon: "🫓", forPerson: "fazle", served: false },
    { id: "veg", name: "Mixed Vegetables", bangla: "মিশ্র সবজি", icon: "🥗", forPerson: "fazle", served: false },
    { id: "tea", name: "Cup of Tea", bangla: "এক কাপ চা", icon: "☕", forPerson: "fazle", served: false },
  ]);

  // Handwashing state
  const [handsWashed, setHandsWashed] = useState<boolean>(false);

  // Sync tab with slide changes
  useEffect(() => {
    if (slideId === 5) {
      setActiveTab("table");
    } else if (slideId === 6) {
      setActiveTab("manners");
    } else if (slideId === 2) {
      setActiveTab("hygiene");
    } else {
      setActiveTab("table");
    }
  }, [slideId]);

  // Serve food item
  const handleServeFood = (id: string) => {
    playChime?.("click");
    setFoods((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          const next = !f.served;
          if (next) {
            handleSpeak(`${f.name}! ${f.bangla} served on the plate!`);
          }
          return { ...f, served: next };
        }
        return f;
      })
    );

    const remaining = foods.filter((f) => f.id !== id && !f.served).length;
    if (remaining === 0) {
      setTimeout(() => {
        playChime?.("fanfare");
        confetti({ particleCount: 45, spread: 75, origin: { y: 0.6 } });
        handleSpeak("Healthy food makes Fazle and Anita strong, active and cheerful!");
      }, 300);
    }
  };

  // Wash hands
  const handleWashHands = () => {
    playChime?.("click");
    setHandsWashed(true);
    handleSpeak("They always wash their hands with soap and water before eating. Clean hands keep germs away!");

    setTimeout(() => {
      playChime?.("fanfare");
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
    }, 800);
  };

  // Reset table
  const handleReset = () => {
    playChime?.("click");
    setFoods((prev) => prev.map((f) => ({ ...f, served: false })));
    setHandsWashed(false);
  };

  const servedCount = foods.filter((f) => f.served).length;
  const energyPercentage = Math.round((servedCount / foods.length) * 100);

  return (
    <div
      className={`w-full rounded-3xl bg-linear-to-b from-amber-50 via-orange-50/40 to-yellow-50 border-2 border-amber-200/80 p-3 sm:p-5 shadow-inner flex flex-col justify-between ${
        isFullTheater ? "min-h-[500px]" : "min-h-[420px]"
      }`}
    >
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-3 border-b border-amber-200/70 gap-2 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-black text-xl shadow-md ring-2 ring-amber-200 shrink-0">
            🍳
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                Unit 4 • Lesson 2
              </span>
              <span className="text-[10px] font-bold text-orange-700 bg-orange-100/80 px-2 py-0.5 rounded-full">
                Healthy Breakfast (pp. 54–57)
              </span>
            </div>
            <h3 className="font-black text-slate-800 text-sm sm:text-base leading-tight mt-0.5">
              Breakfast with Fazle and Anita (সকালের পুষ্টিকর নাশতা)
            </h3>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-white/90 p-1 rounded-2xl border border-amber-200 shadow-2xs">
          <button
            onClick={() => {
              setActiveTab("table");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === "table"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-600 hover:text-amber-700 hover:bg-amber-50"
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Table</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("manners");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === "manners"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-600 hover:text-amber-700 hover:bg-amber-50"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Manners</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("hygiene");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              activeTab === "hygiene"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-600 hover:text-amber-700 hover:bg-amber-50"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Clean Hands</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="my-3 flex-1">
        {/* ======================================================== */}
        {/* TAB 1: BREAKFAST DINING TABLE                            */}
        {/* ======================================================== */}
        {activeTab === "table" && (
          <div className="space-y-3">
            {/* Visual Table & Plates */}
            <div className="relative rounded-2xl bg-linear-to-b from-amber-100 via-orange-50 to-yellow-100 border-2 border-amber-300 p-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-amber-950 bg-white/80 px-2.5 py-0.5 rounded-xl border border-amber-200 shadow-2xs flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>7:00 AM Dining Room</span>
                </span>
                <span className="text-xs font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full">
                  Energy: {energyPercentage}% Strong & Cheerful ✨
                </span>
              </div>

              {/* 2 Plates for Anita & Fazle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
                {/* Anita's Plate */}
                <div className="p-3 bg-white/90 rounded-2xl border-2 border-rose-200 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-xs text-rose-800 flex items-center gap-1">
                      <span>👧 Anita's Plate</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">Eggs, Fruits & Milk</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {foods
                      .filter((f) => f.forPerson === "anita")
                      .map((f) => (
                        <button
                          key={f.id}
                          onClick={() => handleServeFood(f.id)}
                          className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer text-left ${
                            f.served
                              ? "bg-rose-50 border-rose-400 text-rose-950 shadow-xs"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-rose-50/50"
                          }`}
                        >
                          <span className="text-xl">{f.icon}</span>
                          <div>
                            <div className="text-[11px] font-black leading-tight">{f.name}</div>
                            <div className="text-[9px] text-slate-500">{f.bangla}</div>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>

                {/* Fazle's Plate */}
                <div className="p-3 bg-white/90 rounded-2xl border-2 border-amber-200 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-xs text-amber-800 flex items-center gap-1">
                      <span>👦 Fazle's Plate</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">Ruti, Veg & Tea</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {foods
                      .filter((f) => f.forPerson === "fazle")
                      .map((f) => (
                        <button
                          key={f.id}
                          onClick={() => handleServeFood(f.id)}
                          className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer text-left ${
                            f.served
                              ? "bg-amber-50 border-amber-400 text-amber-950 shadow-xs"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-amber-50/50"
                          }`}
                        >
                          <span className="text-xl">{f.icon}</span>
                          <div>
                            <div className="text-[11px] font-black leading-tight">{f.name}</div>
                            <div className="text-[9px] text-slate-500">{f.bangla}</div>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Table Controls */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-amber-200 shadow-xs flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Clear Table</span>
                </button>
                <button
                  onClick={() =>
                    handleSpeak(
                      "It is seven o'clock in the morning. Fazle and Anita are sitting at the table to have breakfast. Anita likes boiled eggs, sweet bananas and fresh mangoes. Fazle likes hot ruti, mixed vegetables and a cup of tea."
                    )
                  }
                  className="p-1.5 rounded-xl bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs font-bold text-slate-700">
                <span>Items Served: </span>
                <span className="font-black text-amber-800">{servedCount} of 7</span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: POLITE TABLE MANNERS                              */}
        {/* ======================================================== */}
        {activeTab === "manners" && (
          <div className="space-y-3">
            <div className="p-3 bg-linear-to-r from-amber-100 to-orange-100 rounded-2xl border border-amber-300">
              <span className="text-xs font-black text-amber-900 block mb-1">
                💬 Polite Table Requests: "Can I have..., please?"
              </span>
              <p className="text-[11px] text-slate-700">
                খাবার টেবিলে কোনো কিছু চাইতে হলে ভদ্রভাবে 'Please' ও 'Thank you' বলতে হয়।
              </p>
            </div>

            {/* 3 Dialogues */}
            <div className="space-y-2">
              {[
                {
                  q: "Can I have a banana, please?",
                  a: "Sure, here you are!",
                  b: "দয়া করে আমাকে একটি কলা দেবে কি? - অবশ্যই, এই নাও!",
                  icon: "🍌",
                },
                {
                  q: "Can I have a glass of milk, please?",
                  a: "Yes, of course! Here it is.",
                  b: "দয়া করে এক গ্লাস দুধ দেবে কি? - হ্যাঁ অবশ্যই! এই যে নাও।",
                  icon: "🥛",
                },
                {
                  q: "Thank you very much!",
                  a: "You are welcome!",
                  b: "তোমাকে অনেক ধন্যবাদ! - স্বাগতম!",
                  icon: "✨",
                },
              ].map((dialogue, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    playChime?.("click");
                    handleSpeak(`${dialogue.q} ... ${dialogue.a}`);
                  }}
                  className="p-2.5 bg-white rounded-xl border border-amber-200 shadow-2xs hover:border-amber-400 cursor-pointer flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{dialogue.icon}</span>
                    <div>
                      <div className="text-xs font-black text-slate-800">
                        {dialogue.q} <span className="text-amber-700 font-bold">➔ {dialogue.a}</span>
                      </div>
                      <div className="text-[10px] text-slate-500">{dialogue.b}</div>
                    </div>
                  </div>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: HANDWASHING BEFORE MEALS                          */}
        {/* ======================================================== */}
        {activeTab === "hygiene" && (
          <div className="space-y-3">
            <div className="p-4 bg-linear-to-b from-sky-50 to-teal-50 rounded-2xl border-2 border-teal-300 text-center shadow-md">
              <span className="text-4xl mb-2 block">🧼 💧 🤲</span>
              <h4 className="font-black text-sm text-teal-950">
                "They always wash their hands with soap and water before eating."
              </h4>
              <p className="text-xs text-teal-800 mt-1">
                খাওয়ার পূর্বে সবসময় সাবান ও পরিষ্কার পানি দিয়ে হাত ধোয়া বাধ্যতামূলক।
              </p>

              <div className="mt-4">
                <button
                  onClick={handleWashHands}
                  className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
                    handsWashed
                      ? "bg-teal-600 text-white shadow-teal-300 ring-2 ring-teal-400"
                      : "bg-linear-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 active:scale-95"
                  }`}
                >
                  {handsWashed ? "✅ Hands Clean & Germ-Free!" : "Wash Hands Now (হাত ধুয়ে নাও)"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Profile Summary Badge */}
      <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between text-[11px] text-slate-600 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-amber-950">👧 Anita & 👦 Fazle</span>
          <span>•</span>
          <span>Morning breakfast at 7:00 AM keeps us strong and active!</span>
        </div>
        <div className="flex items-center gap-1 text-amber-800 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>Healthy food, healthy body!</span>
        </div>
      </div>
    </div>
  );
}
