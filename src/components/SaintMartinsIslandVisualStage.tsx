"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Palmtree, 
  Ship, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  Compass, 
  Anchor,
  CheckCircle2, 
  Waves,
  Shell
} from "lucide-react";

interface SaintMartinsIslandVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

export const SaintMartinsIslandVisualStage: React.FC<SaintMartinsIslandVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"reef" | "turtle" | "voyage">("reef");
  const [selectedCoral, setSelectedCoral] = useState<number>(0);

  // Sea turtle nesting cycle stage (0: arriving on beach, 1: digging nest, 2: laying eggs, 3: hatching into sea)
  const [turtleStep, setTurtleStep] = useState<number>(0);

  // Voyage simulator progress
  const [voyageProgress, setVoyageProgress] = useState<number>(0);
  const voyageTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (voyageTimerRef.current) clearTimeout(voyageTimerRef.current);
    };
  }, []);

  const corals = [
    {
      name: "Brain Coral (ব্রেন কোরাল)",
      color: "from-amber-500/30 to-orange-900/40 border-amber-500/50",
      icon: "🧠",
      desc: "Has grooved surface resembling a human brain. Protects marine life.",
      banglaDesc: "মানুষের মস্তিষ্কের মতো খাঁজকাটা রূপবিশিষ্ট শক্ত প্রবাল।"
    },
    {
      name: "Staghorn Coral (হরিণের শিং প্রবাল)",
      color: "from-cyan-500/30 to-blue-900/40 border-cyan-500/50",
      icon: "🦌",
      desc: "Branches like deer antlers, providing nursery shelter for baby fish.",
      banglaDesc: "হরিণের শিংয়ের মতো শাখা-প্রশাখাযুক্ত প্রবাল যা ছোট মাছের আশ্রয়স্থল।"
    },
    {
      name: "Table Coral (টেবিল কোরাল)",
      color: "from-emerald-500/30 to-teal-900/40 border-emerald-500/50",
      icon: "🪸",
      desc: "Flat table-like structures where colorful sea fish bask in sunlight.",
      banglaDesc: "চওড়া টেবিলের মতো সমতল প্রবাল স্তর।"
    },
    {
      name: "Fan Coral (পাখা প্রবাল)",
      color: "from-pink-500/30 to-rose-900/40 border-pink-500/50",
      icon: "🪭",
      desc: "Gently sways with underwater ocean currents catching plankton.",
      banglaDesc: "সমুদ্রের পানির ঢেউয়ে দোলে এমন সুন্দর রঙিন পাখা প্রবাল।"
    }
  ];

  const turtleStages = [
    {
      title: "Step 1: Night Arrival (সৈকতে আগমন)",
      desc: "Mother sea turtle crawls quietly up the sandy beach under the starry night sky.",
      bangla: "মা কচ্ছপ রাতের চাঁদের আলোয় সেন্ট মার্টিন্স সৈকতে ধীরে ধীরে উঠে আসে।",
      icon: "🐢 🏖️"
    },
    {
      title: "Step 2: Digging Nest (বালির গর্ত খনন)",
      desc: "She uses her strong flippers to dig a safe, warm hole in the dry sand.",
      bangla: "শক্ত পাখনা দিয়ে বালির মধ্যে নিরাপদ ডিম রাখার গভীর গর্ত খোঁড়ে।",
      icon: "🕳️ 🐚"
    },
    {
      title: "Step 3: Laying Eggs (ডিম পাড়া)",
      desc: "She lays 80 to 120 round white eggs inside the nest and carefully covers them with sand.",
      bangla: "৮০-১২০টি নরম ডিম পেড়ে সাবধানে বালি দিয়ে ঢেকে মা কচ্ছপ সাগরে ফিরে যায়।",
      icon: "🥚 🥚"
    },
    {
      title: "Step 4: Hatching & Ocean Journey (ছানাদের সাগরে যাত্রা)",
      desc: "After about 50 days, cute baby turtles hatch and scurry happily into the blue waves!",
      bangla: "৫০ দিন পর ডিম ফুটে ফুটফুটে ছানারা নীল সাগরের ঢেউয়ের দিকে ছুটে যায়!",
      icon: "🌊 🐢 🌟"
    }
  ];

  const handleNextTurtleStep = () => {
    if (turtleStep < 3) {
      setTurtleStep(turtleStep + 1);
      playChime("pop");
      handleSpeak(turtleStages[turtleStep + 1].title + ". " + turtleStages[turtleStep + 1].desc);
    } else {
      setTurtleStep(0);
      playChime("click");
    }
  };

  const handleStartVoyage = () => {
    if (voyageTimerRef.current) clearTimeout(voyageTimerRef.current);
    setVoyageProgress(1);
    playChime("click");
    handleSpeak("Departing Teknaf on the sea truck! On the left are the green hills of Myanmar!");
    
    voyageTimerRef.current = setTimeout(() => {
      setVoyageProgress(2);
      playChime("fanfare");
      handleSpeak("Welcome to Saint Martin's Island! Crystal clear blue water of the Bay of Bengal!");
    }, 2500);
  };

  const handleResetVoyage = () => {
    if (voyageTimerRef.current) clearTimeout(voyageTimerRef.current);
    setVoyageProgress(0);
    playChime("click");
  };

  return (
    <div className={`w-full bg-gradient-to-br from-cyan-950 via-sky-950 to-slate-950 rounded-2xl border-2 border-cyan-500/60 text-white overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xl ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-800/40 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-md shadow-cyan-600/30">
            <Shell className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <h3 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
              How Far is Saint Martin's? Coral Island
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                Class 5 • Unit 12
              </span>
            </h3>
            <p className="text-xs text-cyan-200/80 font-medium">
              বাংলাদেশের একমাত্র প্রবাল দ্বীপ, সামুদ্রিক কচ্ছপ ও টেকনাফ থেকে সমুদ্রযাত্রা
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-cyan-900/60 shadow-2xs">
          <button
            onClick={() => { setActiveTab("reef"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "reef" 
                ? "bg-cyan-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🪸 প্রবাল ও সৈকত
          </button>
          <button
            onClick={() => { setActiveTab("turtle"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "turtle" 
                ? "bg-cyan-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🐢 কচ্ছপের জীবনচক্র
          </button>
          <button
            onClick={() => { setActiveTab("voyage"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "voyage" 
                ? "bg-cyan-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🚢 সমুদ্রযাত্রা সিমুলেটর
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="my-3 flex-1 flex flex-col justify-center">
        {activeTab === "reef" && (
          <div className="space-y-3">
            {/* Top highlight card */}
            <div className="bg-gradient-to-r from-sky-900/50 via-teal-900/40 to-blue-900/50 p-3 rounded-xl border border-cyan-500/40 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-cyan-200 flex items-center gap-2">
                  <Waves className="w-4 h-4 text-cyan-400" />
                  The Only Coral Island in Bangladesh
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  The water in the Bay of Bengal is clean and blue. You can see corals of different shapes and colours!
                </p>
              </div>
              <button 
                onClick={() => {
                  playChime("click");
                  handleSpeak("Saint Martin's Island is the only coral island in Bangladesh. The water in the Bay of Bengal is clean and blue!");
                }}
                className="p-2 rounded-lg bg-cyan-700/50 hover:bg-cyan-600 text-cyan-100 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Coral Reef Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {corals.map((coral, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedCoral(idx);
                    playChime("click");
                    handleSpeak(coral.name + ". " + coral.desc);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedCoral === idx
                      ? "bg-cyan-600/30 border-cyan-400 shadow-md scale-[1.02] ring-1 ring-cyan-400"
                      : "bg-slate-900/70 border-slate-800 hover:border-cyan-700"
                  }`}
                >
                  <div className="text-2xl mb-1">{coral.icon}</div>
                  <h5 className="font-bold text-xs text-white truncate">{coral.name}</h5>
                  <p className="text-[11px] text-cyan-200 mt-1 line-clamp-2">{coral.banglaDesc}</p>
                </div>
              ))}
            </div>

            {/* Island Special Delicacies & Peace */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div 
                onClick={() => {
                  playChime("pop");
                  handleSpeak("You can drink sweet green coconut water on Saint Martin's Island!");
                }}
                className="bg-slate-900/80 p-3 rounded-xl border border-emerald-500/40 flex items-center gap-3 cursor-pointer hover:border-emerald-400"
              >
                <div className="text-3xl">🥥</div>
                <div>
                  <h5 className="font-bold text-xs text-emerald-200">মিষ্টি ডাবের পানি (Sweet Coconut)</h5>
                  <p className="text-[11px] text-slate-300">সৈকতের নারিকেল গাছের সুমিষ্ট পানি তৃষ্ণা মেটায়।</p>
                </div>
              </div>

              <div 
                onClick={() => {
                  playChime("pop");
                  handleSpeak("You can eat delicious fresh sea fish prepared locally on the island!");
                }}
                className="bg-slate-900/80 p-3 rounded-xl border border-amber-500/40 flex items-center gap-3 cursor-pointer hover:border-amber-400"
              >
                <div className="text-3xl">🐟</div>
                <div>
                  <h5 className="font-bold text-xs text-amber-200">সুস্বাদু সামুদ্রিক মাছ (Delicious Sea Fish)</h5>
                  <p className="text-[11px] text-slate-300">রূপচাঁদা, কোরাল ও টুনা মাছের সুস্বাদু স্বাদ।</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "turtle" && (
          <div className="space-y-3">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-teal-500/40 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                  সামুদ্রিক কচ্ছপের বাসা ও ডিম পাড়ার ধাপ ({turtleStep + 1}/4)
                </span>
                <span className="text-2xl">{turtleStages[turtleStep].icon}</span>
              </div>

              <div className="bg-gradient-to-r from-teal-950/60 to-cyan-950/60 p-3 rounded-lg border border-teal-700/50 mb-3">
                <h4 className="font-black text-sm text-amber-300 mb-1">
                  {turtleStages[turtleStep].title}
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {turtleStages[turtleStep].desc}
                </p>
                <p className="text-xs text-teal-200/90 font-medium mt-1">
                  {turtleStages[turtleStep].bangla}
                </p>
              </div>

              {/* Progress dots */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {turtleStages.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setTurtleStep(idx);
                      playChime("click");
                      handleSpeak(turtleStages[idx].title + ". " + turtleStages[idx].desc);
                    }}
                    className={`h-2 rounded-full cursor-pointer transition-all ${
                      idx <= turtleStep ? "bg-cyan-400" : "bg-slate-700"
                    }`}
                  />
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    playChime("click");
                    handleSpeak(turtleStages[turtleStep].title + ". " + turtleStages[turtleStep].desc);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-200 flex items-center gap-1.5 border border-slate-700"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  উচ্চারণ শুনুন
                </button>

                <button
                  onClick={handleNextTurtleStep}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white shadow-xs flex items-center gap-1.5"
                >
                  {turtleStep === 3 ? "🔄 পুনরায় শুরু করো" : "পরবর্তী ধাপ ➡️"}
                </button>
              </div>
            </div>

            <div className="bg-amber-950/30 p-2.5 rounded-xl border border-amber-600/30 flex items-center gap-2 text-xs text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>সৈকতে সামুদ্রিক কচ্ছপের ডিম সংরক্ষণ করা আমাদের পরিবেশগত দায়িত্ব!</span>
            </div>
          </div>
        )}

        {activeTab === "voyage" && (
          <div className="space-y-3">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-500/40">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-sm text-cyan-200 flex items-center gap-2">
                  <Ship className="w-4 h-4 text-amber-400" />
                  Teknaf to Saint Martin's Journey (২ থেকে ২.৫ ঘণ্টার রোমাঞ্চকর ভ্রমণ)
                </h4>
                <span className="text-xs font-mono font-bold text-amber-300">
                  {voyageProgress === 0 ? "টেকনাফ ঘাট" : voyageProgress === 1 ? "সমুদ্রযাত্রারত (Naf River & Sea)" : "সেন্ট মার্টিন্স পৌঁছাল!"}
                </span>
              </div>

              {/* Journey Visualization Strip */}
              <div className="relative bg-gradient-to-r from-emerald-950 via-sky-900 to-cyan-950 p-4 rounded-xl border border-cyan-700/50 my-3 overflow-hidden">
                <div className="flex justify-between items-center text-xs font-bold mb-2">
                  <span className="text-emerald-300 flex items-center gap-1">
                    📍 Teknaf Port
                  </span>
                  <span className="text-amber-300 text-center text-[11px]">
                    ⛰️ Left: Green hills of Myanmar • Right: Blue Bay of Bengal 🌊
                  </span>
                  <span className="text-cyan-300 flex items-center gap-1">
                    🏝️ Saint Martin's Island
                  </span>
                </div>

                {/* Animated Ship Path */}
                <div className="w-full bg-slate-800/80 h-3 rounded-full relative my-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 transition-all duration-1000 rounded-full"
                    style={{ width: voyageProgress === 0 ? "5%" : voyageProgress === 1 ? "50%" : "100%" }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>Wooden Boat / Sea Truck</span>
                  <span>Duration: 2 to 2.5 hours</span>
                  <span>Pure Coral Reefs</span>
                </div>
              </div>

              {/* Start / Reset voyage controls */}
              <div className="flex items-center justify-between pt-1">
                {voyageProgress === 0 ? (
                  <button
                    onClick={handleStartVoyage}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
                  >
                    <Ship className="w-4 h-4" />
                    জাহাজে চড়ে সমুদ্রযাত্রা শুরু করো! (Start Voyage)
                  </button>
                ) : voyageProgress === 1 ? (
                  <div className="w-full py-2 text-center text-xs text-amber-300 font-bold animate-pulse">
                    🚢 জলযানটি নাফ নদী পেরিয়ে বঙ্গোপসাগরের নীল জলরাশি অতিক্রম করছে...
                  </div>
                ) : (
                  <div className="w-full flex items-center justify-between gap-2">
                    <span className="text-xs text-emerald-300 font-bold">
                      🎉 সেন্ট মার্টিন্স দ্বীপে স্বাগতম! প্রবাল ও নীল জলরাশি উপভোগ করো!
                    </span>
                    <button
                      onClick={handleResetVoyage}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-700"
                    >
                      <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                      পুনরায় শুরু
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Summary Footer */}
      <div className="border-t border-cyan-800/40 pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-cyan-200/80">
        <div className="flex items-center gap-2">
          <Palmtree className="w-3.5 h-3.5 text-amber-400" />
          <span>NCTB English For Today • Class 5 • Unit 12: How Far is Saint Martin's? (pp. 46–49)</span>
        </div>
        <div className="flex items-center gap-3 font-semibold">
          <span className="text-amber-300">একমাত্র প্রবাল দ্বীপ</span>
          <span>•</span>
          <span className="text-cyan-300">নীল জলরাশি</span>
          <span>•</span>
          <span className="text-emerald-300">মিষ্টি ডাবের পানি</span>
        </div>
      </div>
    </div>
  );
};
