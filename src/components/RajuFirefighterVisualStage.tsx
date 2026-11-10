"use client";

import React, { useState } from "react";
import { 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  Volume2, 
  RotateCcw, 
  Sparkles, 
  Heart,
  AlertTriangle,
  Award,
  Truck,
  Droplets
} from "lucide-react";

interface RajuFirefighterVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

export const RajuFirefighterVisualStage: React.FC<RajuFirefighterVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"story" | "station" | "safety">("story");

  // Fire simulator state
  const [fireExtinguished, setFireExtinguished] = useState<boolean>(false);
  const [waterSprayed, setWaterSprayed] = useState<boolean>(false);

  // Equipment inspection state
  const [selectedTool, setSelectedTool] = useState<string>("truck");

  // Safety rules checklist
  const [safetyChecked, setSafetyChecked] = useState<{ [key: string]: boolean }>({
    noPanic: true,
    leaveQuietly: true,
    crawlSmoke: true,
    callEmergency: true
  });

  const handleExtinguish = () => {
    setWaterSprayed(true);
    playChime("pop");
    setTimeout(() => {
      setFireExtinguished(true);
      playChime("fanfare");
      handleSpeak("Great job! The fire is completely put out with water and teamwork. Everyone is safe!");
    }, 600);
  };

  const handleResetFire = () => {
    setFireExtinguished(false);
    setWaterSprayed(false);
    playChime("click");
  };

  const toggleSafetyCheck = (key: string) => {
    setSafetyChecked(prev => {
      const next = { ...prev, [key]: !prev[key] };
      playChime("pop");
      return next;
    });
  };

  const equipmentInfo: { [key: string]: { name: string; bangla: string; desc: string; icon: string } } = {
    truck: {
      name: "Fire Truck",
      bangla: "দমকল গাড়ি",
      desc: "Carries high-pressure water tanks, ladders, and rescue equipment.",
      icon: "🚒"
    },
    hose: {
      name: "Water Hose",
      bangla: "পানির পাইপ / হোসপাইপ",
      desc: "Shoots strong streams of water to extinguish heavy flames quickly.",
      icon: "🌊"
    },
    helmet: {
      name: "Fire Helmet & Uniform",
      bangla: "ফায়ার হেলমেট ও প্রতিরক্ষামূলক পোশাক",
      desc: "Heat-resistant coat and yellow safety helmet that protect firefighters from falling debris.",
      icon: "🪖"
    },
    extinguisher: {
      name: "Fire Extinguisher",
      bangla: "অগ্নি নির্বাপক যন্ত্র",
      desc: "Portable cylinder containing compressed chemical foam to put out small sudden fires.",
      icon: "🧯"
    }
  };

  return (
    <div className={`w-full bg-gradient-to-br from-slate-900 via-stone-900 to-red-950 rounded-2xl border-2 border-red-800/60 text-white overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xl ${
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
              Raju the Firefighter
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-400/40">
                Class 4 • Unit 8
              </span>
            </h3>
            <p className="text-xs text-red-200/80 font-medium">
              সাহসী রাজু ও ফায়ার সার্ভিসের বীরত্বপূর্ণ কাজ এবং অগ্নি নিরাপত্তা সচেতনতা
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-red-900/60 shadow-2xs">
          <button
            onClick={() => { setActiveTab("story"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "story" 
                ? "bg-red-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🏫 রাজুর গল্প
          </button>
          <button
            onClick={() => { setActiveTab("station"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "station" 
                ? "bg-amber-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🚒 অগ্নিনির্বাপক মহড়া
          </button>
          <button
            onClick={() => { setActiveTab("safety"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "safety" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🛡️ নিরাপত্তা নিয়মাবলী
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="my-3 flex-1 flex flex-col justify-center">
        {activeTab === "story" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-center">
            {/* Story Timeline Cards */}
            <div className="space-y-2.5">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    Class 5 Memory
                  </span>
                  <h4 className="text-xs font-bold text-slate-200">The Sudden School Fire</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  When Raju was in Class 5, a fire broke out. Everyone was afraid, but no one panicked. The brave teachers helped students leave safely.
                </p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    After College
                  </span>
                  <h4 className="text-xs font-bold text-slate-200">Volunteer Firefighter</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Inspired by the brave firefighters, Raju joined a volunteer fire department after college to serve society.
                </p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Full-time Profession
                  </span>
                  <h4 className="text-xs font-bold text-slate-200">Full-time Firefighter & Teacher</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Today Raju is a full-time firefighter. He puts out fires and teaches young children how to prevent fires and stay safe.
                </p>
              </div>
            </div>

            {/* Raju Profile Card & Audio Prompt */}
            <div className="bg-gradient-to-b from-red-900/40 to-slate-900/60 p-4 rounded-2xl border border-red-700/40 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-4xl shadow-lg shadow-red-500/30 mb-2 border-2 border-amber-300">
                👨‍🚒
              </div>
              <h4 className="text-base font-black text-amber-200">Firefighter Raju</h4>
              <p className="text-xs text-red-200 font-medium">Brave Firefighter & Safety Instructor</p>
              
              <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-500/20 text-red-200 border border-red-400/30">
                  🚒 Heroic
                </span>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30">
                  🤝 Volunteer
                </span>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30">
                  🎓 Safety Educator
                </span>
              </div>

              <button
                onClick={() => {
                  playChime("click");
                  handleSpeak("A long time ago, when Raju was in Class 5, there was a sudden fire in his school. Now Raju is a full-time firefighter. He helps put out fires and teaches young people fire safety.");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>রাজুর গল্প শুনুন (Listen to Story)</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === "station" && (
          <div className="space-y-4">
            {/* Interactive Fire Drill Stage */}
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔥</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">Interactive Fire Drill (অগ্নিনির্বাপক মহড়া)</h4>
                    <p className="text-[11px] text-slate-300">পানির হোসপাইপ দিয়ে আগুন নিভিয়ে জীবন রক্ষা করো</p>
                  </div>
                </div>

                {!fireExtinguished ? (
                  <button
                    onClick={handleExtinguish}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-black shadow-md flex items-center gap-1.5 animate-pulse"
                  >
                    <Droplets className="w-4 h-4" />
                    <span>পানি ছিটান (Extinguish Fire!)</span>
                  </button>
                ) : (
                  <button
                    onClick={handleResetFire}
                    className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>পুনরায় শুরু করুন</span>
                  </button>
                )}
              </div>

              {/* Fire Scene Simulation */}
              <div className="h-32 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-around relative overflow-hidden p-3">
                {/* School building simulation */}
                <div className="flex flex-col items-center">
                  <div className="text-4xl">🏫</div>
                  <span className="text-[10px] text-slate-400 font-bold mt-1">Primary School</span>
                </div>

                {/* Center Fire / Extinguished Flame */}
                <div className="flex flex-col items-center relative">
                  {!fireExtinguished ? (
                    <div className="flex flex-col items-center animate-bounce">
                      <div className="text-5xl drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">🔥</div>
                      <span className="text-[10px] font-black uppercase text-red-400 tracking-wider mt-1">
                        Active Fire!
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="text-5xl">💨✨</div>
                      <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Fire Extinguished!
                      </span>
                    </div>
                  )}

                  {waterSprayed && !fireExtinguished && (
                    <div className="absolute inset-0 flex items-center justify-center text-3xl animate-ping">
                      💦
                    </div>
                  )}
                </div>

                {/* Firefighter Raju & Truck */}
                <div className="flex items-center gap-2">
                  <div className="text-4xl animate-pulse">🚒</div>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl">👨‍🚒</div>
                    <span className="text-[10px] text-amber-300 font-bold mt-1">Raju with Hose</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipment Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.keys(equipmentInfo).map((key) => {
                const item = equipmentInfo[key];
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedTool(key);
                      playChime("click");
                      handleSpeak(`${item.name}. ${item.desc}`);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedTool === key
                        ? "bg-amber-500/20 border-amber-400 text-white shadow-xs"
                        : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-lg">{item.icon}</span>
                      <h5 className="font-bold text-xs truncate">{item.name}</h5>
                    </div>
                    <p className="text-[10px] text-amber-200/90 truncate">{item.bangla}</p>
                  </button>
                );
              })}
            </div>

            {/* Selected Tool Details Card */}
            <div className="bg-amber-950/30 p-3 rounded-xl border border-amber-500/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 rounded-xl bg-amber-500/20 border border-amber-400/40">
                  {equipmentInfo[selectedTool].icon}
                </span>
                <div>
                  <h5 className="text-xs font-black text-amber-200">
                    {equipmentInfo[selectedTool].name} ({equipmentInfo[selectedTool].bangla})
                  </h5>
                  <p className="text-[11px] text-slate-300">
                    {equipmentInfo[selectedTool].desc}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  playChime("click");
                  handleSpeak(`${equipmentInfo[selectedTool].name}: ${equipmentInfo[selectedTool].desc}`);
                }}
                className="p-2 rounded-lg bg-amber-600/30 hover:bg-amber-600 text-amber-200 hover:text-white transition-all shrink-0"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === "safety" && (
          <div className="space-y-3">
            <div className="bg-emerald-950/30 p-3 rounded-xl border border-emerald-500/40 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-xs text-emerald-200">
                <strong className="text-white">Raju's Fire Safety Rules:</strong> আগুন লাগলে কখনো আতঙ্কিত হবে না। শিক্ষকের নির্দেশনা মেনে শান্তভাবে বের হও।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div 
                onClick={() => toggleSafetyCheck("noPanic")}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                  safetyChecked.noPanic 
                    ? "bg-emerald-900/30 border-emerald-500 text-white" 
                    : "bg-slate-800/60 border-slate-700 text-slate-400"
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${safetyChecked.noPanic ? "text-emerald-400" : "text-slate-600"}`} />
                <div>
                  <h5 className="text-xs font-bold">1. Do not panic (আতঙ্কিত হবে না)</h5>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Stay calm and listen to the instructions of teachers and elders.
                  </p>
                </div>
              </div>

              <div 
                onClick={() => toggleSafetyCheck("leaveQuietly")}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                  safetyChecked.leaveQuietly 
                    ? "bg-emerald-900/30 border-emerald-500 text-white" 
                    : "bg-slate-800/60 border-slate-700 text-slate-400"
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${safetyChecked.leaveQuietly ? "text-emerald-400" : "text-slate-600"}`} />
                <div>
                  <h5 className="text-xs font-bold">2. Leave quietly & safely (শান্তভাবে বের হও)</h5>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Walk in an orderly line out of the building. Never push or run.
                  </p>
                </div>
              </div>

              <div 
                onClick={() => toggleSafetyCheck("crawlSmoke")}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                  safetyChecked.crawlSmoke 
                    ? "bg-emerald-900/30 border-emerald-500 text-white" 
                    : "bg-slate-800/60 border-slate-700 text-slate-400"
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${safetyChecked.crawlSmoke ? "text-emerald-400" : "text-slate-600"}`} />
                <div>
                  <h5 className="text-xs font-bold">3. Crawl under smoke (ধোঁয়ার নিচে হামাগুড়ি দাও)</h5>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Smoke rises up. Stay low to the ground where the air is clean.
                  </p>
                </div>
              </div>

              <div 
                onClick={() => toggleSafetyCheck("callEmergency")}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                  safetyChecked.callEmergency 
                    ? "bg-emerald-900/30 border-emerald-500 text-white" 
                    : "bg-slate-800/60 border-slate-700 text-slate-400"
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${safetyChecked.callEmergency ? "text-emerald-400" : "text-slate-600"}`} />
                <div>
                  <h5 className="text-xs font-bold">4. Dial 999 for Fire Service (জরুরি কল)</h5>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Immediately notify the fire department or adult guardians.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playChime("fanfare");
                handleSpeak("Remember Raju's golden rule: When there is a fire, do not panic! Leave the building quietly and safely. Stay low under smoke and call emergency service 999!");
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>নিরাপত্তা নিয়মগুলো একসাথে উচ্চারণ করুন (Practice Safety Pledge)</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Footer Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-red-800/40 pt-2.5 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Interactive Firefighter Raju Suite • NCTB Primary English</span>
        </div>
        <div className="flex items-center gap-2 text-red-300 font-bold">
          <span>🚒 Emergency Fire Service: 999</span>
        </div>
      </div>
    </div>
  );
};

export default RajuFirefighterVisualStage;
