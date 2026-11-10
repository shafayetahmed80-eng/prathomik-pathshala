"use client";

import React, { useState } from "react";
import { 
  Shirt, 
  Clock, 
  Heart, 
  GraduationCap, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  Scissors, 
  Banknote,
  Building2,
  CheckCircle2
} from "lucide-react";

interface ReshmaGarmentsWorkerVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

export const ReshmaGarmentsWorkerVisualStage: React.FC<ReshmaGarmentsWorkerVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"factory" | "routine" | "family">("factory");

  // Garment sewing simulator state
  const [stitchedPieces, setStitchedPieces] = useState<number>(0);
  const [isSewing, setIsSewing] = useState<boolean>(false);

  // Time slot inspection
  const [selectedShift, setSelectedShift] = useState<"standard" | "overtime">("standard");

  const handleStitchFabric = () => {
    setIsSewing(true);
    playChime("click");
    setTimeout(() => {
      setIsSewing(false);
      const next = stitchedPieces + 1;
      setStitchedPieces(next);
      if (next % 4 === 0) {
        playChime("fanfare");
        handleSpeak("Superb craftsmanship! A complete high-quality garment is stitched and ready for export.");
      } else {
        playChime("pop");
        handleSpeak("Stitching with care and skill.");
      }
    }, 450);
  };

  const handleResetStitch = () => {
    setStitchedPieces(0);
    playChime("click");
  };

  return (
    <div className={`w-full bg-gradient-to-br from-indigo-950 via-slate-900 to-rose-950 rounded-2xl border-2 border-indigo-700/60 text-white overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xl ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-800/40 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <Shirt className="w-5 h-5 text-indigo-200" />
          </div>
          <div>
            <h3 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
              Reshma: The Garments Worker
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/40">
                Class 4 • Unit 11
              </span>
            </h3>
            <p className="text-xs text-indigo-200/80 font-medium">
              কঠোর পরিশ্রম, পরিবারের প্রতি দায়িত্ববোধ ও মর্যাদাপূর্ণ জীবিকা নির্বাহের প্রেরণা
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-indigo-900/60 shadow-2xs">
          <button
            onClick={() => { setActiveTab("factory"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "factory" 
                ? "bg-indigo-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🧵 কারখানা ও সেলাই
          </button>
          <button
            onClick={() => { setActiveTab("routine"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "routine" 
                ? "bg-rose-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            ⏰ কর্মঘণ্টা ও ওভারটাইম
          </button>
          <button
            onClick={() => { setActiveTab("family"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "family" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🏡 কুড়িগ্রাম থেকে মিরপুর
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="my-3 flex-1 flex flex-col justify-center">
        {activeTab === "factory" && (
          <div className="space-y-4">
            {/* Interactive Sewing Machine Stage */}
            <div className="bg-indigo-900/40 p-4 rounded-2xl border border-indigo-700/50 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🪡</span>
                  <div>
                    <h4 className="text-sm font-bold text-indigo-200">
                      Garment Factory Sewing Station (সেলাই স্টেশন)
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      মিরপুরের কারখানায় রেশমার দক্ষ হাতের নিখুঁত সেলাই কাজ ({stitchedPieces} টি অংশ সম্পন্ন)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleStitchFabric}
                    disabled={isSewing}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white text-xs font-black shadow-md flex items-center gap-1.5 animate-pulse"
                  >
                    <Scissors className="w-4 h-4" />
                    <span>{isSewing ? "সেলাই হচ্ছে..." : "কাপড় সেলাই করুন (Stitch)"}</span>
                  </button>
                  {stitchedPieces > 0 && (
                    <button
                      onClick={handleResetStitch}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sewing Station Landscape */}
              <div className="h-36 bg-gradient-to-b from-slate-950 to-indigo-950 rounded-xl border border-indigo-800/80 p-3 flex items-center justify-around relative overflow-hidden">
                {/* Reshma Working */}
                <div className="flex flex-col items-center">
                  <div className="text-5xl">👩‍🏭</div>
                  <span className="text-[11px] font-bold text-rose-300 mt-1">Reshma (18 yrs)</span>
                  <span className="text-[10px] text-slate-400">Dedicated Worker</span>
                </div>

                {/* Sewing Machine Center */}
                <div className="flex flex-col items-center relative">
                  <div className={`text-6xl transition-transform ${isSewing ? "scale-110 animate-spin" : ""}`}>
                    ⚙️
                  </div>
                  <div className="absolute top-1 text-3xl">🪡</div>
                  <span className="text-[10px] font-bold text-indigo-300 mt-1">
                    Modern Sewing Machine
                  </span>
                </div>

                {/* Stitched Output Display */}
                <div className="flex flex-col items-center">
                  <div className="text-5xl relative">
                    👕
                    <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                      {stitchedPieces}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-300 mt-1">
                    Ready Garments
                  </span>
                  <span className="text-[10px] text-slate-400">Export Quality</span>
                </div>
              </div>
            </div>

            {/* Quick Garment Industry Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
              <div className="bg-slate-800/70 p-2.5 rounded-xl border border-indigo-800/50">
                <span className="text-xs font-bold text-indigo-400">Workplace</span>
                <p className="text-xs text-white font-black">Mirpur, Dhaka</p>
              </div>
              <div className="bg-slate-800/70 p-2.5 rounded-xl border border-indigo-800/50">
                <span className="text-xs font-bold text-rose-400">Regular Work Hours</span>
                <p className="text-xs text-white font-black">8:00 AM – 5:00 PM</p>
              </div>
              <div className="bg-slate-800/70 p-2.5 rounded-xl border border-indigo-800/50">
                <span className="text-xs font-bold text-emerald-400">Life Principle</span>
                <p className="text-xs text-white font-black">Dignity & Independence</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "routine" && (
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Regular Shift Card */}
              <div
                onClick={() => {
                  setSelectedShift("standard");
                  playChime("click");
                  handleSpeak("Regular work shift is from 8:00 am to 5:00 pm every day. Reshma works diligently to complete her production targets.");
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedShift === "standard"
                    ? "bg-indigo-900/50 border-indigo-400 shadow-md ring-1 ring-indigo-300"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-indigo-400" />
                  <h4 className="font-black text-sm text-white">Regular Shift: 8 AM – 5 PM</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Reshma works 9 hours every day from morning to evening, operating the sewing machine with focused attention.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-indigo-300 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>দৈনিক নিয়মিত কর্মঘণ্টা (৯ ঘণ্টা)</span>
                </div>
              </div>

              {/* Overtime Shift Card */}
              <div
                onClick={() => {
                  setSelectedShift("overtime");
                  playChime("click");
                  handleSpeak("Overtime work! Sometimes Reshma works extra hours after 5:00 pm to earn extra money for her family and brother's education.");
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedShift === "overtime"
                    ? "bg-rose-900/50 border-rose-400 shadow-md ring-1 ring-rose-300"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Banknote className="w-5 h-5 text-rose-400" />
                  <h4 className="font-black text-sm text-white">Overtime Work (অতিরিক্ত কাজ)</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Occasionally, Reshma voluntarily stays late to earn overtime pay, helping her support her parents and brother.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-300 font-bold">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>অতিরিক্ত আয় ও পরিবারের দায়িত্ব</span>
                </div>
              </div>
            </div>

            {/* Shift Audio Action Button */}
            <button
              onClick={() => {
                playChime("click");
                handleSpeak("Reshma works hard from 8:00 am to 5:00 pm every day. Sometimes she does overtime work to earn extra money for her beloved family.");
              }}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-bold flex items-center justify-center gap-2 border border-slate-700"
            >
              <Volume2 className="w-4 h-4 text-indigo-400" />
              <span>কর্মঘণ্টার বিবরণ শুনুন (Listen to Routine)</span>
            </button>
          </div>
        )}

        {activeTab === "family" && (
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {/* Kurigram Erosion */}
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-black px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    Origins
                  </span>
                  <h5 className="font-bold text-xs text-white mt-1.5">River Erosion in Kurigram</h5>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Eight years ago, river erosion took away their village home and farmland in Kurigram.
                  </p>
                </div>
                <span className="text-xl mt-2">🌊 🏚️</span>
              </div>

              {/* Reshma's Dignity */}
              <div className="bg-indigo-950/40 p-3.5 rounded-xl border border-indigo-700/50 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-black px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                    Mirpur, Dhaka
                  </span>
                  <h5 className="font-bold text-xs text-indigo-200 mt-1.5">Dignity of Labor</h5>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Her uncle helped her find a job. Reshma is proud to earn her own living with honesty and dignity.
                  </p>
                </div>
                <span className="text-xl mt-2">🏭 👩‍🏭</span>
              </div>

              {/* Brother Babul's Education */}
              <div className="bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-700/50 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Sacrifice & Love
                  </span>
                  <h5 className="font-bold text-xs text-emerald-200 mt-1.5">Babul's Education</h5>
                  <p className="text-[11px] text-slate-300 mt-1">
                    She sends hard-earned money to her parents and finances her younger brother Babul's schooling.
                  </p>
                </div>
                <span className="text-xl mt-2">👦 🎒 📚</span>
              </div>
            </div>

            <button
              onClick={() => {
                playChime("fanfare");
                handleSpeak("Reshma sends money to her parents in the village and supports her younger brother Babul's education in school. Reshma is proud to earn her own living with dignity.");
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 text-rose-300" />
              <span>রেশমার আত্মমর্যাদা ও পরিবারের অনুপ্রেরণামূলক বার্তা শুনুন</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Footer Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-indigo-800/40 pt-2.5 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-300" />
          <span>Reshma Garments Worker Suite • NCTB Primary English</span>
        </div>
        <div className="flex items-center gap-2 text-rose-300 font-bold">
          <span>✨ Earn living with dignity (মর্যাদাপূর্ণ জীবিকা)</span>
        </div>
      </div>
    </div>
  );
};

export default ReshmaGarmentsWorkerVisualStage;
