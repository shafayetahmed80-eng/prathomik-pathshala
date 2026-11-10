"use client";

import React, { useState } from "react";
import { 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  Award, 
  GraduationCap, 
  Heart,
  Users,
  CheckCircle2
} from "lucide-react";

interface RajuOccupationsC5VisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

export const RajuOccupationsC5VisualStage: React.FC<RajuOccupationsC5VisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"journey" | "workshop" | "occupations">("journey");

  // School visit drill simulation
  const [drillCompleted, setDrillCompleted] = useState<boolean>(false);

  const handleStartDrill = () => {
    setDrillCompleted(true);
    playChime("fanfare");
    handleSpeak("Excellent fire drill! The students listened to their teachers, stayed calm without panicking, and evacuated the building quietly and safely!");
  };

  const handleResetDrill = () => {
    setDrillCompleted(false);
    playChime("click");
  };

  return (
    <div className={`w-full bg-gradient-to-br from-red-950 via-slate-900 to-amber-950 rounded-2xl border-2 border-red-600/60 text-white overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xl ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-red-800/40 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-600/30">
            <Flame className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <h3 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
              Occupations: Raju the Firefighter
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-400/40">
                Class 5 • Unit 9
              </span>
            </h3>
            <p className="text-xs text-red-200/80 font-medium">
              পেশা, স্বেচ্ছাসেবা, নতুনদের প্রশিক্ষণ ও বিদ্যালয়ে নিরাপত্তা সচেতনতা
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-red-900/60 shadow-2xs">
          <button
            onClick={() => { setActiveTab("journey"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "journey" 
                ? "bg-red-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            👨‍🚒 রাজুর কর্মজীবন
          </button>
          <button
            onClick={() => { setActiveTab("workshop"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "workshop" 
                ? "bg-amber-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🏫 স্কুল নিরাপত্তা কর্মশালা
          </button>
          <button
            onClick={() => { setActiveTab("occupations"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "occupations" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🤝 মহৎ পেশাসমূহ
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="my-3 flex-1 flex flex-col justify-center">
        {activeTab === "journey" && (
          <div className="space-y-3.5">
            {/* 4 Steps Career Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                    Step 1: School Days
                  </span>
                  <h5 className="font-bold text-xs text-white mt-1.5">Class 5 Fire</h5>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Watched brave firefighters extinguish the sudden school fire.
                  </p>
                </div>
                <span className="text-2xl mt-2">🏫🔥</span>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    Step 2: After College
                  </span>
                  <h5 className="font-bold text-xs text-white mt-1.5">Volunteer Service</h5>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Joined volunteer fire department without any salary to serve people.
                  </p>
                </div>
                <span className="text-2xl mt-2">🤝🚒</span>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    Step 3: Profession
                  </span>
                  <h5 className="font-bold text-xs text-white mt-1.5">Full-time Job</h5>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Earns money putting out fires and rescuing people in danger.
                  </p>
                </div>
                <span className="text-2xl mt-2">👨‍🚒💼</span>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                    Step 4: Instructor
                  </span>
                  <h5 className="font-bold text-xs text-white mt-1.5">Safety Teacher</h5>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Trains new firefighters and visits schools to teach fire safety.
                  </p>
                </div>
                <span className="text-2xl mt-2">🎓👨‍🏫</span>
              </div>
            </div>

            <button
              onClick={() => {
                playChime("click");
                handleSpeak("Now Raju is a full-time firefighter. Most of the time his work is putting out fires, but he also teaches new firefighters about safety. He likes teaching very much!");
              }}
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <Volume2 className="w-4 h-4" />
              <span>রাজুর পূর্ণাঙ্গ কর্মজীবনের বিবরণ শুনুন (Listen to Career Summary)</span>
            </button>
          </div>
        )}

        {activeTab === "workshop" && (
          <div className="space-y-4">
            <div className="bg-amber-950/40 p-4 rounded-2xl border border-amber-700/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-amber-400" />
                  <div>
                    <h4 className="text-sm font-bold text-amber-200">
                      Raju's Free-Time School Safety Workshop
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      অবসর সময়ে রাজু বিদ্যালয়ে গিয়ে শিক্ষার্থীদের ৩টি জরুরি নিয়ম শেখান
                    </p>
                  </div>
                </div>

                {!drillCompleted ? (
                  <button
                    onClick={handleStartDrill}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white text-xs font-black shadow-md flex items-center gap-1.5 animate-pulse"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>মহড়া চালান (Run Safety Drill)</span>
                  </button>
                ) : (
                  <button
                    onClick={handleResetDrill}
                    className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>পুনরায় শুরু</span>
                  </button>
                )}
              </div>

              {/* Classroom Evacuation Scene */}
              <div className="h-36 bg-gradient-to-b from-slate-950 to-amber-950 rounded-xl border border-amber-800/80 p-3 flex items-center justify-around relative overflow-hidden">
                {/* Raju Instructing */}
                <div className="flex flex-col items-center">
                  <div className="text-5xl">👨‍🚒</div>
                  <span className="text-xs font-bold text-amber-300 mt-1">Instructor Raju</span>
                  <span className="text-[10px] text-slate-400">Teaching Students</span>
                </div>

                {/* 3 Safety Pillars Center */}
                <div className="flex flex-col gap-1 text-center">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-600/30 border border-emerald-500/50 text-xs font-bold text-emerald-200">
                    1. Do Not Panic (আতঙ্কিত হবে না)
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-blue-600/30 border border-blue-500/50 text-xs font-bold text-blue-200">
                    2. Listen to Teachers (শিক্ষকদের নির্দেশ শোনো)
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-purple-600/30 border border-purple-500/50 text-xs font-bold text-purple-200">
                    3. Leave Quietly (শান্তভাবে বের হও)
                  </span>
                </div>

                {/* Calm Students Evacuating */}
                <div className="flex flex-col items-center">
                  <div className={`text-5xl transition-all ${drillCompleted ? "animate-bounce" : ""}`}>
                    {drillCompleted ? "🚶‍♂️🚶‍♀️✨" : "👫"}
                  </div>
                  <span className={`text-xs font-bold mt-1 ${drillCompleted ? "text-emerald-300" : "text-slate-300"}`}>
                    {drillCompleted ? "Safe Evacuation! ✓" : "Orderly Students"}
                  </span>
                  <span className="text-[10px] text-slate-400">Calm & Prepared</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "occupations" && (
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-3xl block mb-1">👨‍🚒</span>
                <h5 className="font-bold text-xs text-red-300">Firefighter</h5>
                <p className="text-[11px] text-slate-300 mt-1">
                  Protects communities, puts out dangerous fires, and saves trapped lives.
                </p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-3xl block mb-1">👩‍🏫</span>
                <h5 className="font-bold text-xs text-amber-300">Teacher</h5>
                <p className="text-[11px] text-slate-300 mt-1">
                  Guides students with wisdom, leads evacuations, and builds the future.
                </p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-3xl block mb-1">🤝</span>
                <h5 className="font-bold text-xs text-emerald-300">Volunteer</h5>
                <p className="text-[11px] text-slate-300 mt-1">
                  Works selflessly without financial payment to bring happiness to society.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playChime("fanfare");
                handleSpeak("Every occupation that serves human lives with honesty and dedication is noble. Volunteering without money shows the highest virtue of humanity!");
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <Heart className="w-4 h-4 text-amber-200" />
              <span>পেশা ও সমাজসেবার মর্যাদা উপলব্ধি করুন</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Footer Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-red-800/40 pt-2.5 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Raju the Firefighter (Class 5 Occupations) • NCTB English</span>
        </div>
        <div className="flex items-center gap-2 text-amber-300 font-bold">
          <span>🤝 Volunteer spirit & dedication</span>
        </div>
      </div>
    </div>
  );
};

export default RajuOccupationsC5VisualStage;
