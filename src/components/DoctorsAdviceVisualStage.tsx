"use client";

import React, { useState } from "react";
import { 
  HeartPulse, 
  Thermometer, 
  Droplet, 
  ShieldCheck, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  Coffee,
  Check
} from "lucide-react";

interface DoctorsAdviceVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

export const DoctorsAdviceVisualStage: React.FC<DoctorsAdviceVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"symptoms" | "prescriptions" | "hygiene">("prescriptions");

  // Doctor's checklist
  const [adviceChecked, setAdviceChecked] = useState<{ [key: string]: boolean }>({
    energyFood: true,
    stayHome: true,
    waterJuice: true,
    tissueCover: true,
    separateUtensils: true
  });

  const toggleAdvice = (key: string) => {
    setAdviceChecked(prev => {
      const next = { ...prev, [key]: !prev[key] };
      playChime("pop");
      return next;
    });
  };

  const completedCount = Object.values(adviceChecked).filter(Boolean).length;

  return (
    <div className={`w-full bg-gradient-to-br from-rose-950 via-slate-900 to-indigo-950 rounded-2xl border-2 border-rose-600/60 text-white overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xl ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-800/40 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/30">
            <HeartPulse className="w-5 h-5 text-rose-200" />
          </div>
          <div>
            <h3 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
              Doctor's Advice for Sima
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/40">
                Class 5 • Unit 8
              </span>
            </h3>
            <p className="text-xs text-rose-200/80 font-medium">
              ফ্লু ও জ্বরে সুস্থ হয়ে ওঠার ৫টি অপরিহার্য চিকিৎসা ও স্বাস্থ্যবিধি
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-rose-900/60 shadow-2xs">
          <button
            onClick={() => { setActiveTab("symptoms"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "symptoms" 
                ? "bg-rose-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🤒 লক্ষণ ও ফ্লু
          </button>
          <button
            onClick={() => { setActiveTab("prescriptions"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "prescriptions" 
                ? "bg-amber-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🩺 ডাক্তারের ৫ পরামর্শ
          </button>
          <button
            onClick={() => { setActiveTab("hygiene"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "hygiene" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🧼 স্বাস্থ্যবিধি ও জীবাণু রোধ
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="my-3 flex-1 flex flex-col justify-center">
        {activeTab === "symptoms" && (
          <div className="space-y-4">
            <div className="bg-rose-950/40 p-4 rounded-2xl border border-rose-700/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-6 h-6 text-rose-400" />
                  <div>
                    <h4 className="text-sm font-bold text-rose-200">
                      Sima's Health Status Today (সীমার অসুস্থতা)
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      সীমা ফ্লু আক্রান্ত হওয়ায় আজ স্কুলে যেতে পারেনি
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-400/30">
                  Stay Home & Rest
                </span>
              </div>

              {/* Patient Stage Simulation */}
              <div className="h-36 bg-gradient-to-b from-slate-950 to-rose-950 rounded-xl border border-rose-800/80 p-3 flex items-center justify-around relative overflow-hidden">
                {/* Sima Resting */}
                <div className="flex flex-col items-center">
                  <div className="text-5xl">🛌👧</div>
                  <span className="text-xs font-bold text-rose-300 mt-1">Sima in Bed</span>
                  <span className="text-[10px] text-slate-400">Needs Warmth & Rest</span>
                </div>

                {/* Symptoms Badges */}
                <div className="flex flex-col gap-1.5 text-center">
                  <span className="px-2.5 py-1 rounded-lg bg-red-600/30 border border-red-500/50 text-xs font-bold text-red-200">
                    🌡️ Fever (জ্বর - feels warm)
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-600/30 border border-amber-500/50 text-xs font-bold text-amber-200">
                    🗣️ Cough & Sore Throat (কাশি ও গলাব্যথা)
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-purple-600/30 border border-purple-500/50 text-xs font-bold text-purple-200">
                    🤧 Flu Virus (ইনফ্লুয়েঞ্জা)
                  </span>
                </div>

                {/* Visiting Doctor */}
                <div className="flex flex-col items-center">
                  <div className="text-5xl">👨‍⚕️💊</div>
                  <span className="text-xs font-bold text-blue-300 mt-1">Doctor's Visit</span>
                  <span className="text-[10px] text-slate-400">Prescribed Advice</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playChime("click");
                handleSpeak("Sima is at home today. She didn't go to school because she has a cough, a sore throat, and a fever. She has the flu. The doctor told her what to do to get well soon!");
              }}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <Volume2 className="w-4 h-4" />
              <span>লক্ষণ ও ডাক্তারের নির্দেশিকা শুনুন (Listen to Symptoms)</span>
            </button>
          </div>
        )}

        {activeTab === "prescriptions" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Doctor's Recovery Checklist ({completedCount}/5 Rules Followed)</span>
              </span>
              <button
                onClick={() => {
                  setAdviceChecked({
                    energyFood: true,
                    stayHome: true,
                    waterJuice: true,
                    tissueCover: true,
                    separateUtensils: true
                  });
                  playChime("fanfare");
                }}
                className="text-[11px] text-amber-300 hover:underline"
              >
                সব টিক দিন (Check All)
              </button>
            </div>

            {/* 5 Prescription Items */}
            <div className="space-y-2">
              <div 
                onClick={() => toggleAdvice("energyFood")}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  adviceChecked.energyFood ? "bg-amber-950/40 border-amber-500 text-white" : "bg-slate-800/60 border-slate-700 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🍲</span>
                  <div>
                    <h5 className="font-bold text-xs text-white">1. Eat energy-giving food (শক্তিবর্ধক খাবার খাও)</h5>
                    <p className="text-[10px] text-slate-300">Try to eat even if you aren't hungry. You need strength!</p>
                  </div>
                </div>
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${adviceChecked.energyFood ? "text-amber-400" : "text-slate-600"}`} />
              </div>

              <div 
                onClick={() => toggleAdvice("stayHome")}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  adviceChecked.stayHome ? "bg-indigo-950/40 border-indigo-500 text-white" : "bg-slate-800/60 border-slate-700 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🛌</span>
                  <div>
                    <h5 className="font-bold text-xs text-white">2. Rest! Stay at home (বিশ্রাম নাও ও ঘরে থাকো)</h5>
                    <p className="text-[10px] text-slate-300">Don't go to school or work. Resting speeds up healing.</p>
                  </div>
                </div>
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${adviceChecked.stayHome ? "text-indigo-400" : "text-slate-600"}`} />
              </div>

              <div 
                onClick={() => toggleAdvice("waterJuice")}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  adviceChecked.waterJuice ? "bg-sky-950/40 border-sky-500 text-white" : "bg-slate-800/60 border-slate-700 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">💧</span>
                  <div>
                    <h5 className="font-bold text-xs text-white">3. Drink plenty of water or juice (প্রচুর পানি ও জুস)</h5>
                    <p className="text-[10px] text-slate-300">Clean water and natural juice are much better than soft drinks.</p>
                  </div>
                </div>
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${adviceChecked.waterJuice ? "text-sky-400" : "text-slate-600"}`} />
              </div>

              <div 
                onClick={() => toggleAdvice("tissueCover")}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  adviceChecked.tissueCover ? "bg-rose-950/40 border-rose-500 text-white" : "bg-slate-800/60 border-slate-700 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🧻</span>
                  <div>
                    <h5 className="font-bold text-xs text-white">4. Cover mouth & nose with tissue (টিস্যু ব্যবহার করো)</h5>
                    <p className="text-[10px] text-slate-300">Cover with a clean tissue, not your hand! Throw it away safely.</p>
                  </div>
                </div>
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${adviceChecked.tissueCover ? "text-rose-400" : "text-slate-600"}`} />
              </div>

              <div 
                onClick={() => toggleAdvice("separateUtensils")}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  adviceChecked.separateUtensils ? "bg-emerald-950/40 border-emerald-500 text-white" : "bg-slate-800/60 border-slate-700 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🍽️</span>
                  <div>
                    <h5 className="font-bold text-xs text-white">5. Use your own plate, cup & glass (আলাদা বাসন-কোসন)</h5>
                    <p className="text-[10px] text-slate-300">Wash hands often. Others can catch your illness from shared items!</p>
                  </div>
                </div>
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${adviceChecked.separateUtensils ? "text-emerald-400" : "text-slate-600"}`} />
              </div>
            </div>

            <button
              onClick={() => {
                playChime("fanfare");
                handleSpeak("Doctor's Advice: Eat energy food, rest at home, drink plenty of water and juice, cover your sneeze with a tissue, wash your hands, and use separate plates and cups!");
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <HeartPulse className="w-4 h-4" />
              <span>ডাক্তারের ৫টি পরামর্শ একসাথে শুনুন (Listen to All 5 Advice)</span>
            </button>
          </div>
        )}

        {activeTab === "hygiene" && (
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-3xl block mb-1">🧼</span>
                <h5 className="font-bold text-xs text-emerald-300">Wash Hands Often</h5>
                <p className="text-[11px] text-slate-300 mt-1">
                  Use soap and water for 20 seconds to wash away cold germs.
                </p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-3xl block mb-1">🧻</span>
                <h5 className="font-bold text-xs text-rose-300">Use Fresh Tissue</h5>
                <p className="text-[11px] text-slate-300 mt-1">
                  Never sneeze into your bare hands; germs easily transfer to objects.
                </p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-3xl block mb-1">🥛</span>
                <h5 className="font-bold text-xs text-sky-300">Own Cup & Glass</h5>
                <p className="text-[11px] text-slate-300 mt-1">
                  Protect family members by using your own drinking glass.
                </p>
              </div>
            </div>

            <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-600/50 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-xs text-slate-200">
                <strong className="text-emerald-300">Health Rule:</strong> অসুস্থ হলে অন্যকে সংক্রমিত না করার দায়িত্ব পালন করাই সচেতনতা ও সুনাগরিকের গুণ।
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-rose-800/40 pt-2.5 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-rose-300" />
          <span>Doctor's Advice Suite • NCTB Class 5 English</span>
        </div>
        <div className="flex items-center gap-2 text-rose-300 font-bold">
          <span>🩺 Get well soon! (দ্রুত সুস্থ হয়ে ওঠো)</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorsAdviceVisualStage;
