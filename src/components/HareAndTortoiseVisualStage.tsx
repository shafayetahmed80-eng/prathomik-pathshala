"use client";

import React, { useState } from "react";
import { 
  Trophy, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  Play, 
  Pause,
  Award, 
  Flame,
  CheckCircle2,
  TreePine,
  Waves
} from "lucide-react";

interface HareAndTortoiseVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

export const HareAndTortoiseVisualStage: React.FC<HareAndTortoiseVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"race" | "characters" | "moral">("race");

  // Race track stage (0: start, 1: hare sprints & sleeps, 2: tortoise passes, 3: tortoise wins)
  const [raceStep, setRaceStep] = useState<number>(0);

  const raceScenes = [
    {
      title: "Step 1: The Challenge at the Big Tree (দৌড় প্রতিযোগিতার সূচনা)",
      desc: "The proud hare laughs at the slow tortoise. They agree to start at the big tree and finish at the river!",
      bangla: "অহংকারী খরগোশ কচ্ছপকে উপহাস করায় কচ্ছপ দৌড়ের চ্যালেঞ্জ জানায়। বড় গাছের কাছে শুরু ও নদীর কাছে শেষ রেখা নির্ধারিত হয়।",
      harePos: "10%",
      tortoisePos: "8%",
      hareState: "🏃‍♂️ দ্রুত দৌড়াতে প্রস্তুত",
      tortoiseState: "🐢 ধীর পদক্ষেপে প্রস্তুত",
      icon: "🌳"
    },
    {
      title: "Step 2: Hare Sprints & Takes a Nap (খরগোশের অহংকার ও ঘুম)",
      desc: "The hare dashes out of sight, feels confident, and falls asleep under a shady tree for an hour!",
      bangla: "খরগোশ দ্রুত দৌড়ে দৃষ্টির বাইরে চলে যায় এবং কচ্ছপকে অনেক পেছনে দেখে গাছের ছায়ায় এক ঘণ্টার ঘুমে বিভোর হয়।",
      harePos: "52%",
      tortoisePos: "32%",
      hareState: "💤 গাছের নিচে গভীর ঘুমে মগ্ন",
      tortoiseState: "🐢 অবিরাম হেঁটে চলেছে (Steadily on and on)",
      icon: "💤"
    },
    {
      title: "Step 3: The Persistent Tortoise Passes (কচ্ছপের অবিচল এগিয়ে চলা)",
      desc: "The tortoise walks steadily on and on without stopping. Quietly, he passes the snoring hare!",
      bangla: "কচ্ছপ এক মুহূর্তও না থেমে অবিরাম হেঁটে যায়। নাক ডাকা ঘুমন্ত খরগোশকে ছাড়িয়ে সে এগিয়ে চলে!",
      harePos: "52%",
      tortoisePos: "68%",
      hareState: "😴 এখনো ঘুমাচ্ছে!",
      tortoiseState: "🚶‍♂️ শান্ত মনে খরগোশকে অতিক্রম করল",
      icon: "🐾"
    },
    {
      title: "Step 4: Victory at the River! (নদীর তীরে বিজয় ও প্রবাদ)",
      desc: "The tortoise crosses the finish line and wins! The hare wakes up in shock, but it is too late!",
      bangla: "কচ্ছপ নদীর তীরে ফিনিশ লাইন অতিক্রম করে বিজয়ী হয়! খরগোশ জেগে দৌড়েও আর সময় মেলাতে পারল না!",
      harePos: "82%",
      tortoisePos: "94%",
      hareState: "😱 হায় হায়! হেরে গেলাম!",
      tortoiseState: "🏆 বিজয়ী কচ্ছপ! Slow and steady wins the race!",
      icon: "🏁"
    }
  ];

  const handleNextRaceStep = () => {
    if (raceStep < 3) {
      const next = raceStep + 1;
      setRaceStep(next);
      if (next === 3) {
        playChime("fanfare");
        handleSpeak("The tortoise crossed the finish line and won the race! Slow and steady wins the race!");
      } else {
        playChime("pop");
        handleSpeak(raceScenes[next].title + ". " + raceScenes[next].desc);
      }
    } else {
      setRaceStep(0);
      playChime("click");
    }
  };

  return (
    <div className={`w-full bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 rounded-2xl border-2 border-emerald-500/60 text-white overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xl ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800/40 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
            <Trophy className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
              Story: The Hare and the Tortoise
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                Class 5 • Unit 14
              </span>
            </h3>
            <p className="text-xs text-emerald-200/80 font-medium">
              অহংকারী খরগোশ ও অবিচল কচ্ছপের দৌড় প্রতিযোগিতা • Slow and steady wins the race
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-emerald-900/60 shadow-2xs">
          <button
            onClick={() => { setActiveTab("race"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "race" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🏁 দৌড় প্রতিযোগিতা
          </button>
          <button
            onClick={() => { setActiveTab("characters"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "characters" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            👥 চরিত্র তুলনা
          </button>
          <button
            onClick={() => { setActiveTab("moral"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "moral" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            💡 গল্পের শিক্ষা
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="my-3 flex-1 flex flex-col justify-center">
        {activeTab === "race" && (
          <div className="space-y-3">
            {/* Race Track Simulation Container */}
            <div className="bg-slate-900/90 p-3 sm:p-4 rounded-xl border border-emerald-500/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-300">
                  {raceScenes[raceStep].title}
                </span>
                <span className="text-xs font-mono font-bold text-amber-300 bg-black/40 px-2 py-0.5 rounded border border-amber-400/30">
                  ধাপ {raceStep + 1} / 4
                </span>
              </div>

              {/* Graphical Track */}
              <div className="relative bg-gradient-to-r from-emerald-950 via-amber-950/40 to-blue-950 p-4 rounded-xl border border-emerald-700/50 my-2 overflow-hidden min-h-[140px] flex flex-col justify-between">
                {/* Landmarks on track */}
                <div className="flex justify-between items-center text-xs font-bold text-slate-300 border-b border-white/10 pb-1">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <TreePine className="w-4 h-4" /> Start (Big Tree)
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    🌳 Shady Nap Tree
                  </span>
                  <span className="flex items-center gap-1 text-cyan-400">
                    <Waves className="w-4 h-4" /> Finish Line (River) 🏁
                  </span>
                </div>

                {/* Hare Lane */}
                <div className="relative h-9 bg-black/30 rounded-lg flex items-center px-2 my-1 border border-white/5">
                  <span className="text-[10px] text-amber-300 font-bold mr-2 shrink-0">Hare:</span>
                  <div 
                    className="absolute transition-all duration-700 flex items-center gap-1"
                    style={{ left: raceScenes[raceStep].harePos }}
                  >
                    <span className="text-2xl drop-shadow">🐇</span>
                    <span className="text-[10px] font-bold bg-amber-600/80 px-1.5 py-0.5 rounded text-white shadow-xs whitespace-nowrap">
                      {raceScenes[raceStep].hareState}
                    </span>
                  </div>
                </div>

                {/* Tortoise Lane */}
                <div className="relative h-9 bg-black/30 rounded-lg flex items-center px-2 my-1 border border-white/5">
                  <span className="text-[10px] text-emerald-300 font-bold mr-2 shrink-0">Tortoise:</span>
                  <div 
                    className="absolute transition-all duration-700 flex items-center gap-1"
                    style={{ left: raceScenes[raceStep].tortoisePos }}
                  >
                    <span className="text-2xl drop-shadow">🐢</span>
                    <span className="text-[10px] font-bold bg-emerald-600/80 px-1.5 py-0.5 rounded text-white shadow-xs whitespace-nowrap">
                      {raceScenes[raceStep].tortoiseState}
                    </span>
                  </div>
                </div>
              </div>

              {/* Scene Narrative Box */}
              <div className="bg-black/40 p-2.5 rounded-lg border border-white/10 text-xs">
                <p className="text-slate-200 font-medium">{raceScenes[raceStep].desc}</p>
                <p className="text-emerald-200/90 text-[11px] mt-0.5">{raceScenes[raceStep].bangla}</p>
              </div>

              {/* Stepper Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    playChime("click");
                    handleSpeak(raceScenes[raceStep].desc);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-200 flex items-center gap-1.5 border border-slate-700"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  শুনুন
                </button>

                <button
                  onClick={handleNextRaceStep}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-md flex items-center gap-1.5"
                >
                  {raceStep === 3 ? "🔄 দৌড় পুনরায় শুরু করো" : "পরবর্তী দৃশ্য ➡️"}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "characters" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* The Hare */}
            <div 
              onClick={() => {
                playChime("click");
                handleSpeak("The hare was the fastest animal in the forest, but he was proud, boastful, and careless.");
              }}
              className="bg-slate-900/80 p-3.5 rounded-xl border border-amber-500/40 cursor-pointer hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">🐇</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40">
                    The Fastest Animal
                  </span>
                </div>
                <h4 className="font-bold text-sm text-amber-200">The Boastful Hare (অহংকারী খরগোশ)</h4>
                <ul className="text-xs text-slate-300 mt-2 space-y-1">
                  <li>• বনানীর সবচেয়ে দ্রুতগামী প্রাণী।</li>
                  <li>• কচ্ছপের ধীর গতি নিয়ে উপহাস করত।</li>
                  <li>• অতিরিক্ত আত্মবিশ্বাসে বনের পথে ঘুমে নিমগ্ন হয়।</li>
                  <li>• ফলাফল: অহংকারের কারণে দৌড়ে পরাজিত হয়।</li>
                </ul>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-amber-400 italic">
                "Hurry up! You are so slow! Can't you walk faster?"
              </div>
            </div>

            {/* The Tortoise */}
            <div 
              onClick={() => {
                playChime("click");
                handleSpeak("The tortoise was the slowest animal in the forest, but he was patient, humble, and never stopped walking.");
              }}
              className="bg-slate-900/80 p-3.5 rounded-xl border border-emerald-500/40 cursor-pointer hover:border-emerald-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">🐢</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                    The Winner
                  </span>
                </div>
                <h4 className="font-bold text-sm text-emerald-200">The Steady Tortoise (ধীরস্থির কচ্ছপ)</h4>
                <ul className="text-xs text-slate-300 mt-2 space-y-1">
                  <li>• বনানীর সবচেয়ে ধীরগতির প্রাণী।</li>
                  <li>• উপহাসের প্রতিবাদে শান্তভাবে চ্যালেঞ্জ গ্রহণ করে।</li>
                  <li>• কোনো বিশ্রাম না নিয়ে একনাগাড়ে অবিচল হেঁটে যায়।</li>
                  <li>• ফলাফল: অধ্যবসায় ও একাগ্রতায় প্রথম স্থান অর্জন করে।</li>
                </ul>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-emerald-400 italic">
                "Slow and steady wins the race!"
              </div>
            </div>
          </div>
        )}

        {activeTab === "moral" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-amber-950/60 via-emerald-950/60 to-slate-900 p-4 rounded-xl border-2 border-amber-400/50 shadow-lg text-center">
              <span className="text-4xl block mb-2">🌟 🏆 🐢</span>
              <h4 className="text-base sm:text-lg font-black text-amber-300 mb-1">
                "Slow and steady wins the race"
              </h4>
              <p className="text-xs sm:text-sm text-emerald-200 font-bold mb-2">
                (ধীর কিন্তু অবিচল ব্যক্তিই অবশেষে প্রতিযোগিতায় জয়ী হয়)
              </p>
              <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
                কোনো কাজ যতই কঠিন হোক না কেন, অহংকার না করে যদি প্রতিদিন একটু একটু করে ধৈর্য সহকারে এগিয়ে যাওয়া যায়, তবে জীবনে নিশ্চিত সাফল্য আসবে।
              </p>

              <button
                onClick={() => {
                  playChime("fanfare");
                  handleSpeak("Moral of the story: Slow and steady wins the race! Never give up, keep trying steadily every day!");
                }}
                className="mt-3 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                বাণীটি মনে রাখো!
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Summary Footer */}
      <div className="border-t border-emerald-800/40 pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-emerald-200/80">
        <div className="flex items-center gap-2">
          <TreePine className="w-3.5 h-3.5 text-amber-400" />
          <span>NCTB English For Today • Class 5 • Unit 14: The Hare and the Tortoise (pp. 54–57)</span>
        </div>
        <div className="flex items-center gap-3 font-semibold">
          <span className="text-amber-300">অহংকার পতনের মূল</span>
          <span>•</span>
          <span className="text-emerald-300">ধৈর্য ও অবিচলতা</span>
          <span>•</span>
          <span className="text-cyan-300">চূড়ান্ত বিজয়</span>
        </div>
      </div>
    </div>
  );
};
