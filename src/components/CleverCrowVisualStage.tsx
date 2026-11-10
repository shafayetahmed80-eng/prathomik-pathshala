"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  Lightbulb, 
  Droplets, 
  Award,
  Sun,
  Smile,
  CheckCircle2
} from "lucide-react";

interface CleverCrowVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

export const CleverCrowVisualStage: React.FC<CleverCrowVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"story" | "experiment" | "moral">("experiment");

  // Pitcher simulation state
  const [pebblesDropped, setPebblesDropped] = useState<number>(0);
  const [waterAtBrim, setWaterAtBrim] = useState<boolean>(false);
  const [crowDrank, setCrowDrank] = useState<boolean>(false);

  const handleDropPebble = () => {
    if (pebblesDropped < 5) {
      const next = pebblesDropped + 1;
      setPebblesDropped(next);
      playChime("pop");
      if (next === 5) {
        setWaterAtBrim(true);
        playChime("fanfare");
        handleSpeak("Plop! The water level rose to the brim! The clever crow can now reach the cool refreshing water!");
      } else {
        handleSpeak(`Plop! Pebble dropped! Water rises to level ${next}.`);
      }
    }
  };

  const handleDrinkWater = () => {
    setCrowDrank(true);
    playChime("correct");
    handleSpeak("The thirsty crow drank the refreshing cool water happily and flew away with joy! Where there is a will, there is a way!");
  };

  const handleReset = () => {
    setPebblesDropped(0);
    setWaterAtBrim(false);
    setCrowDrank(false);
    playChime("click");
  };

  // Water level height percentage
  const waterHeights = [20, 35, 50, 68, 85, 96];
  const currentHeight = waterHeights[pebblesDropped];

  return (
    <div className={`w-full bg-gradient-to-br from-amber-950 via-slate-900 to-sky-950 rounded-2xl border-2 border-amber-600/60 text-white overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xl ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-800/40 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-600/30">
            <span className="text-xl">🐦‍⬛</span>
          </div>
          <div>
            <h3 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
              The Clever Crow
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40">
                Class 4 • Unit 12
              </span>
            </h3>
            <p className="text-xs text-amber-200/80 font-medium">
              বুদ্ধিমান কাকের কলসি ও নুড়িপাথরের বৈজ্ঞানিক কৌশল এবং সমস্যা সমাধানের শিক্ষা
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-amber-900/60 shadow-2xs">
          <button
            onClick={() => { setActiveTab("story"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "story" 
                ? "bg-amber-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            ☀️ তৃষ্ণার্ত কাক
          </button>
          <button
            onClick={() => { setActiveTab("experiment"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "experiment" 
                ? "bg-sky-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🪨 নুড়িপাথর পরীক্ষা
          </button>
          <button
            onClick={() => { setActiveTab("moral"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "moral" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            💡 ইচ্ছা থাকলে উপায় হয়
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="my-3 flex-1 flex flex-col justify-center">
        {activeTab === "story" && (
          <div className="space-y-4">
            <div className="bg-amber-900/30 p-4 rounded-2xl border border-amber-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sun className="w-12 h-12 text-amber-400 animate-spin shrink-0" style={{ animationDuration: "20s" }} />
                <div>
                  <h4 className="text-sm font-bold text-amber-200">
                    Scorching Summer Afternoon (প্রখর গ্রীষ্মের দুপুর)
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    A thirsty crow flew across villages searching for water. Under a shady tree, he spotted a tall clay pitcher with water deep at the bottom!
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center shrink-0">
                <span className="text-5xl">🐦‍⬛ 🏺</span>
                <span className="text-[10px] text-amber-300 font-bold mt-1">Tall Clay Pitcher</span>
              </div>
            </div>

            {/* Narration audio button */}
            <button
              onClick={() => {
                playChime("click");
                handleSpeak("On a scorching summer afternoon, a thirsty crow was flying all over the village in search of water. At last, he saw a tall clay pitcher under a shady tree. But his beak could not reach the bottom!");
              }}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <Volume2 className="w-4 h-4" />
              <span>গল্পের সূচনা শুনুন (Listen to Story Introduction)</span>
            </button>
          </div>
        )}

        {activeTab === "experiment" && (
          <div className="space-y-4">
            {/* Pitcher Displacement Experiment Stage */}
            <div className="bg-sky-950/40 p-4 rounded-2xl border border-sky-700/50 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏺</span>
                  <div>
                    <h4 className="text-sm font-bold text-sky-200">
                      Water Displacement Simulator (পানির উচ্চতা বৃদ্ধি)
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      কলসিতে নুড়িপাথর ফেলুন ({pebblesDropped}/5 টি নুড়ি ফেলা হয়েছে)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!waterAtBrim ? (
                    <button
                      onClick={handleDropPebble}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-sky-600 hover:from-amber-500 hover:to-sky-500 text-white text-xs font-black shadow-md flex items-center gap-1.5 animate-pulse"
                    >
                      <span>🪨 নুড়ি ফেলুন (Drop Pebble)</span>
                    </button>
                  ) : !crowDrank ? (
                    <button
                      onClick={handleDrinkWater}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-md flex items-center gap-1.5 animate-bounce"
                    >
                      <Droplets className="w-4 h-4" />
                      <span>পানি পান করুন (Drink Water!)</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleReset}
                      className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>আবার চেষ্টা করুন</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Pitcher Simulation Visualization */}
              <div className="h-44 bg-gradient-to-b from-slate-950 to-sky-950 rounded-xl border border-sky-800/80 p-3 flex items-center justify-around relative overflow-hidden">
                {/* Crow on Left */}
                <div className="flex flex-col items-center">
                  <div className={`text-6xl transition-transform ${waterAtBrim && !crowDrank ? "rotate-12 translate-x-3" : crowDrank ? "animate-bounce" : ""}`}>
                    {crowDrank ? "🎉🐦‍⬛" : "🐦‍⬛"}
                  </div>
                  <span className="text-[11px] font-bold text-amber-300 mt-1">
                    {crowDrank ? "Happy Crow! ✓" : "Clever Crow"}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {crowDrank ? "Thirst Quenched" : "Watching Water Rise"}
                  </span>
                </div>

                {/* Interactive Tall Pitcher */}
                <div className="flex flex-col items-center">
                  {/* Pitcher Neck & Container */}
                  <div className="w-24 h-32 border-4 border-amber-700/80 rounded-b-3xl bg-amber-950/40 relative flex flex-col justify-end overflow-hidden p-1 shadow-inner">
                    {/* Water Level */}
                    <div 
                      className="w-full bg-gradient-to-t from-sky-600 to-cyan-400 rounded-b-2xl transition-all duration-500 relative flex items-start justify-center"
                      style={{ height: `${currentHeight}%` }}
                    >
                      <span className="text-[10px] font-black text-white/90 drop-shadow-xs">
                        {currentHeight}%
                      </span>
                    </div>

                    {/* Dropped Pebbles Accumulation */}
                    <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0.5 text-xs">
                      {Array.from({ length: pebblesDropped }).map((_, idx) => (
                        <span key={idx} className="animate-bounce">🪨</span>
                      ))}
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-sky-300 mt-1.5">
                    {waterAtBrim ? "Water at Brim! (কানায় কানায়)" : "Water Rising"}
                  </span>
                </div>

                {/* Pebble Pile on Ground */}
                <div className="flex flex-col items-center">
                  <div className="text-4xl">🪨🪨</div>
                  <span className="text-[11px] font-bold text-amber-200 mt-1">Pebbles</span>
                  <span className="text-[10px] text-slate-400">
                    {5 - pebblesDropped > 0 ? `${5 - pebblesDropped} pebbles left` : "All used! ✓"}
                  </span>
                </div>
              </div>
            </div>

            {/* Audio Step Button */}
            <button
              onClick={() => {
                playChime("click");
                handleSpeak("The clever crow took pebbles one by one in his beak and dropped them into the pitcher. Slowly, the water level rose to the brim!");
              }}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-bold flex items-center justify-center gap-2 border border-slate-700"
            >
              <Volume2 className="w-4 h-4 text-sky-400" />
              <span>নুড়িপাথর ফেলার বিবরণ শুনুন (Listen to Pebble Strategy)</span>
            </button>
          </div>
        )}

        {activeTab === "moral" && (
          <div className="space-y-3.5">
            {/* Proverb Banner */}
            <div className="bg-gradient-to-r from-amber-900/40 via-sky-900/40 to-emerald-900/40 p-4 rounded-2xl border border-amber-500/50 text-center">
              <span className="text-xs font-black uppercase tracking-widest text-amber-300 block mb-1">
                Timeless English Proverb
              </span>
              <h4 className="text-base sm:text-lg font-black text-white">
                "Where there is a will, there is a way."
              </h4>
              <p className="text-xs text-emerald-300 font-bold mt-1">
                ইচ্ছা থাকলে উপায় হয় — কঠিনতম সমস্যারও সমাধান বুদ্ধিতে মেলে
              </p>
            </div>

            {/* Three Problem-Solving Lessons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <Lightbulb className="w-6 h-6 text-amber-400 mx-auto mb-1" />
                <h5 className="font-bold text-xs text-amber-300">Observation</h5>
                <p className="text-[11px] text-slate-300 mt-1">
                  The crow observed the pebbles on the ground rather than giving up in despair.
                </p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <RotateCcw className="w-6 h-6 text-sky-400 mx-auto mb-1" />
                <h5 className="font-bold text-xs text-sky-300">Patience</h5>
                <p className="text-[11px] text-slate-300 mt-1">
                  Dropping pebbles one by one takes patient effort and continuous perseverance.
                </p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <Award className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                <h5 className="font-bold text-xs text-emerald-300">Intelligence</h5>
                <p className="text-[11px] text-slate-300 mt-1">
                  Brainpower and scientific thinking always overcome heavy physical obstacles.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playChime("fanfare");
                handleSpeak("Remember the clever crow's wisdom: Where there is a will, there is a way! Never give up in the face of difficulty. Think cleverly and patiently solve your challenges!");
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>প্রবাদের অনুপ্রেরণামূলক বাণী শুনুন (Listen to Proverb Wisdom)</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Footer Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-amber-800/40 pt-2.5 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-300" />
          <span>The Clever Crow Interactive Suite • NCTB Primary English</span>
        </div>
        <div className="flex items-center gap-2 text-amber-300 font-bold">
          <span>💡 Where there is a will, there is a way</span>
        </div>
      </div>
    </div>
  );
};

export default CleverCrowVisualStage;
