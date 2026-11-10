"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Volume2, 
  Car, 
  Footprints, 
  RotateCcw, 
  Sparkles, 
  Lightbulb,
  AlertCircle
} from "lucide-react";

interface TrafficSafetyVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

export const TrafficSafetyVisualStage: React.FC<TrafficSafetyVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"lights" | "crossing" | "rules">("lights");

  // Traffic Light State
  const [currentLight, setCurrentLight] = useState<"red" | "yellow" | "green">("red");
  const [pedestrianCrossed, setPedestrianCrossed] = useState<boolean>(false);

  // Safety Checklist State
  const [rulesChecked, setRulesChecked] = useState<{ [key: string]: boolean }>({
    zebra: true,
    overbridge: true,
    noRunning: true,
    lookBothWays: true
  });

  const handleLightChange = (light: "red" | "yellow" | "green") => {
    setCurrentLight(light);
    if (light === "red") {
      playChime("correct");
      handleSpeak("Red light is on! All vehicles must stop immediately. Pedestrians can cross safely on the zebra crossing.");
    } else if (light === "yellow") {
      playChime("pop");
      handleSpeak("Yellow light appears! Drivers must slow down and wait.");
    } else {
      playChime("click");
      handleSpeak("Green light shines! Vehicles can go safely. Pedestrians must wait on the footpath.");
    }
  };

  const handleCrossZebra = () => {
    if (currentLight === "red") {
      setPedestrianCrossed(true);
      playChime("fanfare");
      handleSpeak("Safe crossing! You crossed on the zebra crossing while cars are stopped.");
    } else {
      playChime("wrong");
      handleSpeak("Warning! Do not cross when light is green or yellow! Wait for the red light.");
    }
  };

  const toggleRule = (key: string) => {
    setRulesChecked(prev => {
      const next = { ...prev, [key]: !prev[key] };
      playChime("pop");
      return next;
    });
  };

  return (
    <div className={`w-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-2xl border-2 border-slate-700 text-white overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-lg ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/80 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
              Traffic Lights & Road Safety
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/40">
                Class 4 • Unit 7
              </span>
            </h3>
            <p className="text-xs text-slate-300 font-medium">
              লাল, হলুদ ও সবুজ বাতি, জেব্রা ক্রসিং ও সড়ক নিরাপত্তার অপরিহার্য নিয়ম
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700 shadow-2xs">
          <button
            onClick={() => { setActiveTab("lights"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "lights" 
                ? "bg-rose-600 text-white shadow-xs" 
                : "text-slate-400 hover:text-white hover:bg-slate-700"
            }`}
          >
            ট্রাফিক লাইট
          </button>
          <button
            onClick={() => { setActiveTab("crossing"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "crossing" 
                ? "bg-rose-600 text-white shadow-xs" 
                : "text-slate-400 hover:text-white hover:bg-slate-700"
            }`}
          >
            জেব্রা ক্রসিং
          </button>
          <button
            onClick={() => { setActiveTab("rules"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "rules" 
                ? "bg-rose-600 text-white shadow-xs" 
                : "text-slate-400 hover:text-white hover:bg-slate-700"
            }`}
          >
            সড়ক নিরাপত্তা নিয়ম
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="py-3 flex-1 flex flex-col justify-center">
        {/* TAB 1: INTERACTIVE 3-COLOUR TRAFFIC LIGHT */}
        {activeTab === "lights" && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* The Traffic Light Pole Housing */}
            <div className="w-24 bg-slate-950 p-3 rounded-3xl border-4 border-slate-700 shadow-2xl flex flex-col items-center gap-3">
              {/* Red Light */}
              <button
                onClick={() => handleLightChange("red")}
                className={`w-16 h-16 rounded-full transition-all duration-300 flex items-center justify-center ${
                  currentLight === "red"
                    ? "bg-rose-600 shadow-[0_0_25px_rgba(244,63,94,0.9)] scale-105 border-2 border-white"
                    : "bg-rose-950/60 opacity-40 hover:opacity-70"
                }`}
              >
                <span className="text-[10px] font-black uppercase text-white tracking-widest">STOP</span>
              </button>

              {/* Yellow Light */}
              <button
                onClick={() => handleLightChange("yellow")}
                className={`w-16 h-16 rounded-full transition-all duration-300 flex items-center justify-center ${
                  currentLight === "yellow"
                    ? "bg-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.9)] scale-105 border-2 border-white"
                    : "bg-amber-950/60 opacity-40 hover:opacity-70"
                }`}
              >
                <span className="text-[10px] font-black uppercase text-white tracking-widest">WAIT</span>
              </button>

              {/* Green Light */}
              <button
                onClick={() => handleLightChange("green")}
                className={`w-16 h-16 rounded-full transition-all duration-300 flex items-center justify-center ${
                  currentLight === "green"
                    ? "bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.9)] scale-105 border-2 border-white"
                    : "bg-emerald-950/60 opacity-40 hover:opacity-70"
                }`}
              >
                <span className="text-[10px] font-black uppercase text-white tracking-widest">GO</span>
              </button>
            </div>

            {/* Instruction & Status Panel */}
            <div className="max-w-sm space-y-3">
              <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-md">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  বর্তমান সিগন্যাল নির্দেশনা
                </span>
                {currentLight === "red" && (
                  <div className="space-y-1">
                    <h4 className="text-xl font-black text-rose-400 flex items-center gap-2">
                      🛑 RED: Stop Immediately!
                    </h4>
                    <p className="text-xs text-slate-300">
                      সব গাড়ি, বাস ও ট্রাক অবশ্যই থামবে। পথচারীরা জেব্রা ক্রসিং দিয়ে সাবধানে পার হতে পারবে।
                    </p>
                  </div>
                )}
                {currentLight === "yellow" && (
                  <div className="space-y-1">
                    <h4 className="text-xl font-black text-amber-400 flex items-center gap-2">
                      ⚠️ YELLOW: Slow Down & Wait!
                    </h4>
                    <p className="text-xs text-slate-300">
                      চালকরা গাড়ির গতি কমিয়ে অপেক্ষা করবেন। প্রস্তুত থাকুন।
                    </p>
                  </div>
                )}
                {currentLight === "green" && (
                  <div className="space-y-1">
                    <h4 className="text-xl font-black text-emerald-400 flex items-center gap-2">
                      🟢 GREEN: Vehicles Can Go!
                    </h4>
                    <p className="text-xs text-slate-300">
                      গাড়িগুলো নিরাপদে চলবে। পথচারীদের ফুটপাতে দাঁড়িয়ে অপেক্ষা করতে হবে।
                    </p>
                  </div>
                )}
              </div>

              {/* Light Switcher Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleLightChange("red")}
                  className="px-3 py-1.5 rounded-xl bg-rose-600/30 border border-rose-500 text-rose-300 text-xs font-bold hover:bg-rose-600 hover:text-white transition-all flex-1"
                >
                  লাল বাতি
                </button>
                <button
                  onClick={() => handleLightChange("yellow")}
                  className="px-3 py-1.5 rounded-xl bg-amber-600/30 border border-amber-500 text-amber-300 text-xs font-bold hover:bg-amber-600 hover:text-white transition-all flex-1"
                >
                  হলুদ বাতি
                </button>
                <button
                  onClick={() => handleLightChange("green")}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600/30 border border-emerald-500 text-emerald-300 text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all flex-1"
                >
                  সবুজ বাতি
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ZEBRA CROSSING SIMULATOR */}
        {activeTab === "crossing" && (
          <div className="space-y-4">
            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h4 className="font-black text-sm text-white">
                  জেব্রা ক্রসিং সিমুলেটর: রাস্তা পারাপারের সঠিক নিয়ম
                </h4>
                <p className="text-xs text-slate-300">
                  গাড়ি যখন লাল বাতিতে থামবে, তখনই কেবল জেব্রা ক্রসিং ব্যবহার করো!
                </p>
              </div>

              <button
                onClick={handleCrossZebra}
                className="px-4 py-2 rounded-xl text-xs font-black bg-rose-600 text-white hover:bg-rose-700 shadow-md flex items-center gap-1.5 active:scale-95 transition-all shrink-0"
              >
                <Footprints className="w-4 h-4" />
                <span>রাস্তা পার হোন (Cross Road)</span>
              </button>
            </div>

            {/* Simulated Road & Zebra Lines */}
            <div className="h-32 bg-slate-950 rounded-2xl border-2 border-slate-700 relative overflow-hidden flex items-center justify-around px-6">
              {/* Zebra stripes */}
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="w-8 h-24 bg-white/90 rounded-sm"></div>
              ))}

              {/* Cars or Pedestrian animation */}
              <div className="absolute inset-x-0 flex items-center justify-between px-8 pointer-events-none">
                <span className="text-3xl">🚗</span>
                {pedestrianCrossed && (
                  <span className="text-4xl animate-bounce">🚶‍♂️</span>
                )}
                <span className="text-3xl">🚌</span>
              </div>
            </div>

            {pedestrianCrossed && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-bold text-center">
                ✓ নিরাপদ পারাপার সম্পন্ন! ডানে-বামে তাকিয়ে সাবধানে রাস্তা পার হওয়া উত্তম নাগরিকের লক্ষণ।
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SAFETY RULES CHECKLIST */}
        {activeTab === "rules" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: "zebra", title: "Use Zebra Crossing", bangla: "সর্বদা জেব্রা ক্রসিং ব্যবহার করো", emoji: "🦓" },
              { key: "overbridge", title: "Use Foot Overbridge", bangla: "ব্যস্ত সড়কে ফুটওভার ব্রিজ ব্যবহার করো", emoji: "🌉" },
              { key: "noRunning", title: "Never Run Across Roads", bangla: "রাস্তায় কখনোই দৌড়াদৌড়ি করবে না", emoji: "🚫" },
              { key: "lookBothWays", title: "Look Left and Right", bangla: "রাস্তা পারের পূর্বে ডানে ও বামে তাকাও", emoji: "👀" }
            ].map((rule) => {
              const isChecked = rulesChecked[rule.key];
              return (
                <div
                  key={rule.key}
                  onClick={() => toggleRule(rule.key)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isChecked ? "bg-slate-800/90 border-emerald-500" : "bg-slate-900 border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{rule.emoji}</span>
                    <div>
                      <h5 className="font-black text-xs text-white">{rule.title}</h5>
                      <p className="text-[11px] text-slate-300">{rule.bangla}</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                    isChecked ? "bg-emerald-600 text-white" : "border-2 border-slate-600"
                  }`}>
                    {isChecked && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Quote Pill */}
      <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-medium">
        <span className="flex items-center gap-1.5 italic text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          "Following traffic rules saves valuable human lives!"
        </span>
        <span className="text-xs font-bold text-rose-400">
          NCTB Class 4 Page 36–39
        </span>
      </div>
    </div>
  );
};

export default TrafficSafetyVisualStage;
