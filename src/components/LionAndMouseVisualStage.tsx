"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  CheckCircle2, 
  Heart, 
  ShieldCheck, 
  Scissors,
  Smile,
  AlertCircle
} from "lucide-react";

interface LionAndMouseVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

export const LionAndMouseVisualStage: React.FC<LionAndMouseVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeScene, setActiveScene] = useState<"meeting" | "rescue" | "moral">("meeting");

  // Rescue simulation state
  const [ropesCut, setRopesCut] = useState<number>(0);
  const [lionFreed, setLionFreed] = useState<boolean>(false);

  // Mouse animation trigger
  const [mouseTickled, setMouseTickled] = useState<boolean>(false);

  const handleTickleLion = () => {
    setMouseTickled(true);
    playChime("pop");
    handleSpeak("The playful mouse ran over the lion's nose! The king of the jungle woke up!");
    setTimeout(() => setMouseTickled(false), 2000);
  };

  const handleChewRope = () => {
    if (ropesCut < 4) {
      const next = ropesCut + 1;
      setRopesCut(next);
      playChime("click");
      if (next === 4) {
        setLionFreed(true);
        playChime("fanfare");
        handleSpeak("Hooray! The mouse chewed through the heavy ropes with sharp teeth and set the mighty lion free!");
      } else {
        handleSpeak("Nibble, nibble! The mouse chews the rope!");
      }
    }
  };

  const handleResetRescue = () => {
    setRopesCut(0);
    setLionFreed(false);
    playChime("click");
  };

  return (
    <div className={`w-full bg-gradient-to-br from-amber-950 via-stone-900 to-emerald-950 rounded-2xl border-2 border-amber-600/60 text-white overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xl ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-800/40 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-600/30">
            <span className="text-xl">🦁</span>
          </div>
          <div>
            <h3 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
              The Lion and the Mouse
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40">
                Class 4 • Unit 12
              </span>
            </h3>
            <p className="text-xs text-amber-200/80 font-medium">
              উপকথা: মহানুভবতা, ক্ষুদ্রতম বন্ধুর সাহায্য ও অটুট বন্ধুত্বের চিরন্তন নীতিকথা
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-amber-900/60 shadow-2xs">
          <button
            onClick={() => { setActiveScene("meeting"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeScene === "meeting" 
                ? "bg-amber-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🌿 বনে প্রথম দেখা
          </button>
          <button
            onClick={() => { setActiveScene("rescue"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeScene === "rescue" 
                ? "bg-red-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🪤 শিকারির জাল ও উদ্ধার
          </button>
          <button
            onClick={() => { setActiveScene("moral"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeScene === "moral" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🤝 বন্ধুত্ব ও নীতিকথা
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="my-3 flex-1 flex flex-col justify-center">
        {activeScene === "meeting" && (
          <div className="space-y-4">
            {/* Deep Jungle Meeting Scene */}
            <div className="bg-amber-900/30 p-4 rounded-2xl border border-amber-700/50 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌴</span>
                  <div>
                    <h4 className="text-sm font-bold text-amber-200">
                      Peaceful Sleep & A Tiny Playmate (গভীর জঙ্গলে)
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      সিংহ শান্তিতে ঘুমাচ্ছিল। ইঁদুরের লাফালাফিতে সিংহ জেগে উঠল!
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleTickleLion}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-black shadow-md flex items-center gap-1.5 animate-pulse"
                >
                  <span>🐭 ইঁদুরকে দৌড়ান (Play)</span>
                </button>
              </div>

              {/* Jungle Animation Stage */}
              <div className="h-36 bg-gradient-to-b from-stone-950 via-amber-950/60 to-emerald-950 rounded-xl border border-amber-800/60 p-3 flex items-center justify-around relative overflow-hidden">
                {/* Mighty Lion */}
                <div className="flex flex-col items-center">
                  <div className={`text-6xl transition-transform ${mouseTickled ? "scale-110" : ""}`}>
                    {mouseTickled ? "🦁" : "😴🦁"}
                  </div>
                  <span className="text-[11px] font-bold text-amber-300 mt-1">
                    {mouseTickled ? "Woken King!" : "Sleeping Lion"}
                  </span>
                  <span className="text-[10px] text-slate-400">King of Jungle</span>
                </div>

                {/* Speech Bubble */}
                <div className="bg-slate-900/90 px-3 py-2 rounded-xl border border-amber-500/50 max-w-[200px] text-center shadow-lg">
                  <p className="text-[11px] text-amber-200 italic font-medium leading-tight">
                    {mouseTickled 
                      ? '"How dare you wake me! I shall eat you!"' 
                      : '"Please forgive me! Someday I may help you!"'}
                  </p>
                </div>

                {/* Tiny Mouse */}
                <div className="flex flex-col items-center">
                  <div className={`text-5xl transition-transform ${mouseTickled ? "animate-bounce" : ""}`}>
                    🐭
                  </div>
                  <span className="text-[11px] font-bold text-rose-300 mt-1">Tiny Mouse</span>
                  <span className="text-[10px] text-slate-400">Playful & Humble</span>
                </div>
              </div>
            </div>

            {/* Dialogue Action Button */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  playChime("click");
                  handleSpeak("The mouse pleaded: O King of the jungle! Please forgive me this time. I will never forget your kindness. Maybe one day I can help you! The lion laughed, but let him go.");
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-2 shadow-md"
              >
                <Volume2 className="w-4 h-4" />
                <span>সিংহের মহানুভবতার সংলাপ শুনুন (Listen to Dialogue)</span>
              </button>
            </div>
          </div>
        )}

        {activeScene === "rescue" && (
          <div className="space-y-4">
            {/* Trapped Lion & Rescue Simulation */}
            <div className="bg-red-950/40 p-4 rounded-2xl border border-red-700/50 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🕸️</span>
                  <div>
                    <h4 className="text-sm font-bold text-red-200">
                      Hunter's Rope Net & Rescue (শিকারির জাল কর্তন)
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      ইঁদুরের ধারালো দাঁত দিয়ে দড়ি কেটে সিংহকে মুক্ত করো ({ropesCut}/4 টি দড়ি কাটা হয়েছে)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!lionFreed ? (
                    <button
                      onClick={handleChewRope}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-black shadow-md flex items-center gap-1.5 animate-pulse"
                    >
                      <Scissors className="w-4 h-4" />
                      <span>দড়ি কাটুন (Chew Rope!)</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleResetRescue}
                      className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>আবার খেলুন</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Net Rescue Stage */}
              <div className="h-36 bg-gradient-to-b from-slate-950 to-stone-950 rounded-xl border border-red-800/80 p-3 flex items-center justify-around relative overflow-hidden">
                {/* Trapped Lion */}
                <div className="flex flex-col items-center relative">
                  <div className="text-6xl relative">
                    {!lionFreed ? (
                      <span className="filter drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                        🦁
                      </span>
                    ) : (
                      <span className="animate-bounce">👑🦁</span>
                    )}
                    {!lionFreed && (
                      <span className="absolute inset-0 flex items-center justify-center text-4xl opacity-80 pointer-events-none">
                        🕸️
                      </span>
                    )}
                  </div>
                  <span className={`text-[11px] font-bold mt-1 ${lionFreed ? "text-emerald-300" : "text-red-300"}`}>
                    {lionFreed ? "Lion is Free! ✓" : "Trapped in Hunter's Net"}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {lionFreed ? "Grateful King" : "Roaring in Helplessness"}
                  </span>
                </div>

                {/* Sharp Teeth Mouse */}
                <div className="flex flex-col items-center">
                  <div className="text-5xl animate-pulse">
                    🐭
                  </div>
                  <span className="text-[11px] font-bold text-amber-300 mt-1">Sharp Teeth</span>
                  <span className="text-[10px] text-emerald-400 font-black">
                    {4 - ropesCut > 0 ? `${4 - ropesCut} ropes left` : "All ropes chewed! ✓"}
                  </span>
                </div>
              </div>
            </div>

            {/* Audio Button */}
            <button
              onClick={() => {
                playChime("click");
                handleSpeak("Hearing the roar, the little mouse ran quickly to the spot. Using his sharp little teeth, the mouse chewed through the heavy ropes and set the lion free!");
              }}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-bold flex items-center justify-center gap-2 border border-slate-700"
            >
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>উদ্ধারের বিবরণ শুনুন (Listen to Rescue Narration)</span>
            </button>
          </div>
        )}

        {activeScene === "moral" && (
          <div className="space-y-3.5">
            {/* Friendship Banner */}
            <div className="bg-gradient-to-r from-amber-900/40 via-emerald-900/40 to-teal-900/40 p-4 rounded-2xl border border-emerald-600/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <span className="text-5xl">🦁❤️🐭</span>
                <div>
                  <h4 className="text-sm font-black text-emerald-200">
                    Lifelong Friends (চিরদিনের অকৃত্রিম বন্ধু)
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    From that day on, the mighty king of the jungle and the tiny mouse became best friends forever.
                  </p>
                </div>
              </div>

              <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-emerald-600 text-white shadow-sm shrink-0">
                True Friendship
              </span>
            </div>

            {/* Three Core Moral Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-2xl mb-1 block">💖</span>
                <h5 className="font-bold text-xs text-amber-300">Kindness Repaid</h5>
                <p className="text-[11px] text-slate-300 mt-1">
                  The lion's mercy saved the mouse; later the mouse saved the lion's life.
                </p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-2xl mb-1 block">🌱</span>
                <h5 className="font-bold text-xs text-emerald-300">No Friend is Small</h5>
                <p className="text-[11px] text-slate-300 mt-1">
                  Even the smallest creature can perform mighty deeds in times of need.
                </p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-2xl mb-1 block">🌟</span>
                <h5 className="font-bold text-xs text-teal-300">Promise Kept</h5>
                <p className="text-[11px] text-slate-300 mt-1">
                  The tiny mouse kept his word and never forgot the lion's forgiveness.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playChime("fanfare");
                handleSpeak("Moral of the story: No act of kindness, no matter how small, is ever wasted. Even a tiny friend can be a mighty helper in danger!");
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 text-rose-300" />
              <span>উপকথার মূল নীতিকথা শুনুন (Listen to Moral)</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Footer Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-amber-800/40 pt-2.5 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>The Lion & The Mouse Suite • NCTB Primary English</span>
        </div>
        <div className="flex items-center gap-2 text-amber-300 font-bold">
          <span>✨ Kindness is never wasted (মহানুভবতা বৃথা যায় না)</span>
        </div>
      </div>
    </div>
  );
};

export default LionAndMouseVisualStage;
