"use client";

import React, { useState } from "react";
import { 
  TreePine, 
  MapPin, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  CheckCircle2, 
  Coffee, 
  Leaf, 
  Compass,
  Bird
} from "lucide-react";

interface SreemangalTeaVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

export const SreemangalTeaVisualStage: React.FC<SreemangalTeaVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"garden" | "lawachara" | "culture">("garden");

  // Tea plucking mini-activity
  const [pluckedCount, setPluckedCount] = useState<number>(0);
  const [basketFull, setBasketFull] = useState<boolean>(false);

  // Lawachara wildlife exploration
  const [selectedAnimal, setSelectedAnimal] = useState<string>("gibbon");

  const handlePluckLeaf = () => {
    if (pluckedCount < 8) {
      const next = pluckedCount + 1;
      setPluckedCount(next);
      playChime("pop");
      if (next === 8) {
        setBasketFull(true);
        playChime("fanfare");
        handleSpeak("Wonderful! Your bamboo basket is filled with fresh tender tea leaves. Two leaves and a bud!");
      } else {
        handleSpeak("Two leaves and a bud!");
      }
    }
  };

  const handleResetPluck = () => {
    setPluckedCount(0);
    setBasketFull(false);
    playChime("click");
  };

  const wildlifeData: { [key: string]: { name: string; bangla: string; desc: string; emoji: string } } = {
    gibbon: {
      name: "Hoolock Gibbon",
      bangla: "উল্লুক (বিরল বানর)",
      desc: "Bangladesh's only ape, swinging gracefully through the tall canopy of Lawachara.",
      emoji: "🐒"
    },
    deer: {
      name: "Barking Deer",
      bangla: "মায়া হরিণ",
      desc: "Shy reddish deer that roam peacefully among the forest bamboo groves.",
      emoji: "🦌"
    },
    hornbill: {
      name: "Great Hornbill",
      bangla: "রাজ ধনেশ পাখি",
      desc: "Spectacular large bird with a golden casque beak nesting in ancient rain trees.",
      emoji: "🦜"
    },
    teaCup: {
      name: "Seven Layer Tea",
      bangla: "নীলকণ্ঠের সাত রঙের চা",
      desc: "World-famous multi-layered tea invented in Sreemangal with distinct flavors in one glass.",
      emoji: "☕"
    }
  };

  return (
    <div className={`w-full bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 rounded-2xl border-2 border-emerald-700/60 text-white overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xl ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800/40 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
            <Leaf className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <h3 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
              Sreemangal: The Tea Capital
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                Class 4 • Unit 10
              </span>
            </h3>
            <p className="text-xs text-emerald-200/80 font-medium">
              মৌলভীবাজারের সবুজ চা বাগান, লাউয়াছড়া জাতীয় উদ্যান ও সাত রঙের চায়ের দেশ
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-emerald-900/60 shadow-2xs">
          <button
            onClick={() => { setActiveTab("garden"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "garden" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🍃 চা বাগান ও চয়ন
          </button>
          <button
            onClick={() => { setActiveTab("lawachara"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "lawachara" 
                ? "bg-teal-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🌲 লাউয়াছড়া উদ্যান
          </button>
          <button
            onClick={() => { setActiveTab("culture"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "culture" 
                ? "bg-amber-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            ☕ সাত রঙের চা ও ভূগোল
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="my-3 flex-1 flex flex-col justify-center">
        {activeTab === "garden" && (
          <div className="space-y-4">
            {/* Rolling Slopes & Plucking Simulation */}
            <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-700/50 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌱</span>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-200">
                      Tea Plucking on Hill Slopes (দুটি পাতা একটি কুঁড়ি)
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      কচি চা পাতা চয়ন করে বাঁশের খাঁচায় ভরুন ({pluckedCount}/8 টি পাতা সংগৃহীত)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!basketFull ? (
                    <button
                      onClick={handlePluckLeaf}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-xs font-black shadow-md flex items-center gap-1.5 animate-pulse"
                    >
                      <Leaf className="w-4 h-4" />
                      <span>পাতা তুলুন (Pluck Leaf!)</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleResetPluck}
                      className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>আবার শুরু করুন</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Scenic Landscape Representation */}
              <div className="h-36 bg-gradient-to-b from-teal-950 via-emerald-900/60 to-emerald-950 rounded-xl border border-emerald-800/80 p-3 flex items-center justify-around relative overflow-hidden">
                {/* Rolling Green Hills Background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none flex items-end">
                  <div className="w-full h-20 bg-emerald-600 rounded-t-full"></div>
                </div>

                {/* Left: Tea Garden Worker */}
                <div className="flex flex-col items-center relative z-10">
                  <div className="text-5xl">👩‍🌾</div>
                  <span className="text-[11px] font-bold text-amber-200 mt-1">
                    Tea Plucker (চা শ্রমিক)
                  </span>
                  <span className="text-[10px] text-slate-300">Bamboo Basket on Back</span>
                </div>

                {/* Center: Interactive Tea Bush */}
                <div className="flex flex-col items-center relative z-10">
                  <div className="relative">
                    <div className="text-6xl cursor-pointer hover:scale-105 transition-transform" onClick={handlePluckLeaf}>
                      🪴
                    </div>
                    {/* Plucked leaves counter badges */}
                    <div className="absolute -top-1 -right-2 bg-emerald-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-emerald-200 shadow-md">
                      {pluckedCount}
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-300 font-bold mt-1">
                    Tender Green Leaves
                  </span>
                </div>

                {/* Right: Bamboo Basket Collection */}
                <div className="flex flex-col items-center relative z-10">
                  <div className="text-5xl">🧺</div>
                  <span className="text-[11px] font-bold text-amber-200 mt-1">
                    Bamboo Basket (খাঁচা)
                  </span>
                  <span className={`text-[10px] font-black uppercase tracking-wider ${basketFull ? "text-emerald-300" : "text-slate-400"}`}>
                    {basketFull ? "Basket Full! ✓" : `${8 - pluckedCount} leaves needed`}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Sreemangal Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
              <div className="bg-slate-800/70 p-2.5 rounded-xl border border-emerald-800/50">
                <span className="text-xs font-bold text-emerald-400">Location</span>
                <p className="text-xs text-white font-black">Moulvibazar, Sylhet</p>
              </div>
              <div className="bg-slate-800/70 p-2.5 rounded-xl border border-emerald-800/50">
                <span className="text-xs font-bold text-emerald-400">Famous Title</span>
                <p className="text-xs text-white font-black">Tea Capital of Bangladesh</p>
              </div>
              <div className="bg-slate-800/70 p-2.5 rounded-xl border border-emerald-800/50">
                <span className="text-xs font-bold text-emerald-400">Nature & Climate</span>
                <p className="text-xs text-white font-black">Cool Breeze & Rolling Hills</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "lawachara" && (
          <div className="space-y-4">
            <div className="bg-teal-900/40 p-3.5 rounded-2xl border border-teal-700/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TreePine className="w-8 h-8 text-teal-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-black text-teal-200">
                    Lawachara National Park (লাউয়াছড়া জাতীয় উদ্যান)
                  </h4>
                  <p className="text-xs text-slate-300">
                    শ্রীমঙ্গলের চিরসবুজ রেইনফরেস্ট, বিরল উল্লুক, মায়াহরিণ ও রঙিন পাখির অভয়ারণ্য
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  playChime("click");
                  handleSpeak("Near the tea gardens lies the Lawachara National Park, home to rare monkeys, deer and colorful birds.");
                }}
                className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Volume2 className="w-4 h-4" />
                <span>শুনুন</span>
              </button>
            </div>

            {/* Wildlife Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {["gibbon", "deer", "hornbill"].map((key) => {
                const item = wildlifeData[key];
                return (
                  <div
                    key={key}
                    onClick={() => {
                      setSelectedAnimal(key);
                      playChime("click");
                      handleSpeak(`${item.name}. ${item.desc}`);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedAnimal === key
                        ? "bg-teal-800/60 border-teal-400 shadow-md ring-1 ring-teal-300"
                        : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-2xl">{item.emoji}</span>
                      <div>
                        <h5 className="font-black text-xs text-white">{item.name}</h5>
                        <p className="text-[10px] text-teal-300">{item.bangla}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Audio prompt button for selected wildlife */}
            <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{wildlifeData[selectedAnimal].emoji}</span>
                <p className="text-xs text-slate-200">
                  <strong className="text-teal-300">{wildlifeData[selectedAnimal].name}:</strong> {wildlifeData[selectedAnimal].desc}
                </p>
              </div>
              <button
                onClick={() => {
                  playChime("click");
                  handleSpeak(`${wildlifeData[selectedAnimal].name}: ${wildlifeData[selectedAnimal].desc}`);
                }}
                className="p-2 rounded-lg bg-teal-600/30 hover:bg-teal-600 text-teal-200 hover:text-white transition-all shrink-0"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === "culture" && (
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* 7-layer tea card */}
              <div className="bg-amber-950/40 p-4 rounded-2xl border border-amber-600/50 flex flex-col justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-600/30 border border-amber-400/50 flex items-center justify-center text-3xl">
                    ☕
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-amber-200">Seven-Layer Tea (সাত রঙের চা)</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      A visual and culinary wonder created by local tea maestro Romesh Ram Gour in Sreemangal. Seven different colored layers with distinct herbal and spiced flavors stay separate in one single transparent glass.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playChime("fanfare");
                    handleSpeak("Seven-layer tea is a famous wonder of Sreemangal. Seven colorful tea layers stay perfectly separated in a single glass!");
                  }}
                  className="mt-3 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>সাত রঙের চায়ের রহস্য শুনুন</span>
                </button>
              </div>

              {/* Geographical Guide */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-sm font-bold text-white">Geographical Highlights</h4>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                    <span><strong>Division:</strong> Sylhet Division (সিলেট বিভাগ)</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                    <span><strong>District:</strong> Moulvibazar District (মৌলভীবাজার জেলা)</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                    <span><strong>Main Attraction:</strong> Tea gardens, pineapple orchards, rubber plantations.</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                    <span><strong>Rainforest:</strong> Lawachara National Park (লাউয়াছড়া).</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-emerald-800/40 pt-2.5 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>Sreemangal Tea Interactive Suite • NCTB Primary English</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-300 font-bold">
          <span>🍃 Two leaves and a bud (দুটি পাতা একটি কুঁড়ি)</span>
        </div>
      </div>
    </div>
  );
};

export default SreemangalTeaVisualStage;
