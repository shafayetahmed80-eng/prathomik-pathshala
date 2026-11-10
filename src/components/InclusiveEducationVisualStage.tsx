"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Volume2, Heart, Award, Check, Users, ArrowRight, Play, Smile, Star, ShieldCheck, Sun, HelpCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface InclusiveEducationVisualStageProps {
  slideId: number;
  playChime?: (type: "correct" | "click" | "fanfare") => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

interface HotspotItem {
  id: string;
  name: string;
  bangla: string;
  detail: string;
  x: number; // percentage
  y: number; // percentage
  icon: string;
}

export default function InclusiveEducationVisualStage({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}: InclusiveEducationVisualStageProps) {
  // Modes: "ramp" | "ball_game" | "recitation" | "explore"
  const [activeMode, setActiveMode] = useState<"ramp" | "ball_game" | "recitation" | "explore">(() => {
    if (slideId === 5) return "ball_game";
    if (slideId === 4) return "ramp";
    if (slideId === 2) return "explore";
    return "ramp";
  });

  // Mode 1: Ramp state
  const [rampProgress, setRampProgress] = useState<number>(20); // 20% to 80%
  const [isMovingUpRamp, setIsMovingUpRamp] = useState<boolean>(false);

  // Mode 2: Ball Game state
  const [ballHolder, setBallHolder] = useState<"teacher" | "mita" | "rani" | "porshi">("teacher");
  const [passCount, setPassCount] = useState<number>(0);
  const [isCheering, setIsCheering] = useState<boolean>(false);

  // Mode 3: Recitation state
  const [isReciting, setIsReciting] = useState<boolean>(false);

  // Mode 4: Hotspots
  const [activeHotspot, setActiveHotspot] = useState<HotspotItem | null>(null);

  // Sync mode with slide changes
  useEffect(() => {
    if (slideId === 5) {
      setActiveMode("ball_game");
    } else if (slideId === 4) {
      setActiveMode("ramp");
    } else if (slideId === 2) {
      setActiveMode("explore");
    } else {
      setActiveMode("ramp");
    }
  }, [slideId]);

  // Ramp climb trigger
  const handleClimbRamp = () => {
    if (isMovingUpRamp) return;
    setIsMovingUpRamp(true);
    playChime?.("click");
    handleSpeak("Mita helps Rani push her wheelchair smoothly up the ramp into the classroom!");

    setRampProgress(20);
    const interval = setInterval(() => {
      setRampProgress((prev) => {
        if (prev >= 80) {
          clearInterval(interval);
          setIsMovingUpRamp(false);
          playChime?.("fanfare");
          confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
          return 80;
        }
        return prev + 10;
      });
    }, 250);
  };

  // Ball passing game
  const handlePassBall = (target: "teacher" | "mita" | "rani" | "porshi") => {
    setBallHolder(target);
    setPassCount((c) => c + 1);
    playChime?.("click");

    if (target === "rani") {
      setIsCheering(true);
      playChime?.("fanfare");
      handleSpeak("Hooray! Rani caught the ball! Great pass, friends!");
      confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => setIsCheering(false), 2500);
    } else if (target === "mita") {
      handleSpeak("Mita catches the ball and passes it joyfully!");
    } else if (target === "porshi") {
      handleSpeak("Porshi passes the ball smoothly!");
    } else {
      handleSpeak("Teacher passes the ball to start the game!");
    }
  };

  // Recitation trigger
  const handleStartRecitation = () => {
    setIsReciting(true);
    playChime?.("fanfare");
    const poemText = "The sun is bright, the sky is blue. We are friends, caring and true. Together we learn, together we play, happy and smiling every day!";
    handleSpeak(poemText);
    setTimeout(() => setIsReciting(false), 8000);
  };

  const HOTSPOTS: HotspotItem[] = [
    {
      id: "wheelchair",
      name: "Wheelchair",
      bangla: "হুইলচেয়ার (চাকাযুক্ত বিশেষ চেয়ার)",
      detail: "যে সকল শিক্ষার্থী পায়ে হেঁটে চলাচল করতে পারে না, তাদের স্বাচ্ছন্দ্যে চলাচলের জন্য হুইলচেয়ার ব্যবহৃত হয়।",
      x: 35,
      y: 65,
      icon: "♿",
    },
    {
      id: "ramp",
      name: "Accessible Ramp",
      bangla: "ঢালু পথ / র‍্যাম্প",
      detail: "সিঁড়ির পরিবর্তে চাকাযুক্ত চেয়ার সহজে ওঠার জন্য আধুনিক স্কুলে নির্মিত নিরাপদ ঢালু পথ।",
      x: 70,
      y: 72,
      icon: "📐",
    },
    {
      id: "caring_friend",
      name: "Caring Classmate (Mita)",
      bangla: "সহমর্মী সহপাঠী (মিতা)",
      detail: "মিতার মতো যত্নশীল বন্ধুরা প্রতিদিন রানিকে ক্লাসে যেতে ও পড়ালেখায় আন্তরিক সাহায্য করে।",
      x: 22,
      y: 55,
      icon: "🤝",
    },
    {
      id: "inclusive_game",
      name: "Adapted Ball Game",
      bangla: "সবার জন্য উপযুক্ত খেলা",
      detail: "শিক্ষক এমন বল পাসিং খেলার আয়োজন করেন যাতে রানিও সবার সাথে সমান আনন্দে অংশ নিতে পারে।",
      x: 80,
      y: 40,
      icon: "⚽",
    },
    {
      id: "recitation",
      name: "Recitation & Storytelling",
      bangla: "আবৃত্তি ও গল্প বলা",
      detail: "রানির শারীরিক প্রতিবন্ধকতা থাকলেও সে কবিতা আবৃত্তি ও সুন্দর গল্প বলায় ক্লাসে সেরা।",
      x: 48,
      y: 35,
      icon: "🎙️",
    },
  ];

  return (
    <div className={`flex flex-col h-full rounded-3xl bg-linear-to-b from-amber-50 via-sky-50 to-emerald-50 border border-slate-200 shadow-2xs overflow-hidden ${isFullTheater ? "p-4 sm:p-6" : "p-3 sm:p-4"}`}>
      {/* Top Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2.5 border-b border-amber-200/70 shrink-0">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-2xl bg-amber-500 text-white shadow-xs text-base">
            ♿
          </span>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-200">
                Joypur Primary School
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Inclusive Campus
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-black text-slate-800">
              Rani & Her Caring Friends (রানি ও তার সহপাঠীরা)
            </h3>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 bg-white/80 p-1 rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => {
              setActiveMode("ramp");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 whitespace-nowrap ${
              activeMode === "ramp"
                ? "bg-amber-500 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>🏫</span>
            <span>স্কুল র‍্যাম্প</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode("ball_game");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 whitespace-nowrap ${
              activeMode === "ball_game"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>⚽</span>
            <span>বল পাস খেলা</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode("recitation");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 whitespace-nowrap ${
              activeMode === "recitation"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>🎙️</span>
            <span>আবৃত্তি মঞ্চ</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode("explore");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 whitespace-nowrap ${
              activeMode === "explore"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>🔍</span>
            <span>ইনক্লুশন ল্যাব</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Canvas */}
      <div className="relative flex-1 min-h-[300px] w-full mt-2.5 rounded-2xl overflow-hidden border border-amber-200/60 bg-linear-to-b from-sky-200 via-sky-100 to-emerald-200 select-none flex flex-col justify-between p-3">
        {/* Background Atmosphere: Clouds, Sun & School Banner */}
        <div className="absolute top-2 left-3 flex items-center gap-2 z-10">
          <div className="px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-xs border border-sky-300 shadow-2xs text-[11px] font-black text-sky-900 flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: "12s" }} />
            <span>জয়পুর সরকারি প্রাথমিক বিদ্যালয় • অন্তর্ভুক্তিমূলক ক্যাম্পাস</span>
          </div>
        </div>

        {/* Clouds Animation in Sky */}
        <div className="absolute top-4 right-10 text-3xl opacity-60 pointer-events-none animate-pulse">
          ☁️
        </div>
        <div className="absolute top-7 left-1/3 text-2xl opacity-50 pointer-events-none">
          ☁️
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MODE 1: SCHOOL RAMP & CLASSROOM ENTRY                         */}
        {/* ------------------------------------------------------------- */}
        {activeMode === "ramp" && (
          <div className="relative w-full h-full flex flex-col justify-between z-10 pt-8">
            {/* School Building Facade at the top-right */}
            <div className="relative w-full flex justify-end pr-2 sm:pr-8">
              <div className="w-48 sm:w-64 p-3 rounded-2xl bg-amber-100/90 border-2 border-amber-300 shadow-sm text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-red-600 text-white text-[9px] font-black uppercase tracking-wider">
                  Class 3 Room
                </div>
                <div className="flex items-center justify-center gap-2 my-1">
                  <span className="text-2xl">🚪</span>
                  <div className="text-left">
                    <p className="text-[11px] font-black text-slate-800">শ্রেণিকক্ষ প্রবেশদ্বার</p>
                    <p className="text-[9px] text-slate-600 font-medium">প্রশস্ত দরজা ও মসৃণ মেঝে</p>
                  </div>
                </div>
                <div className="px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-300 text-[10px] font-bold text-emerald-800 inline-block">
                  ♿ হুইলচেয়ার উপযোগী
                </div>
              </div>
            </div>

            {/* The Sloped Ramp Visual */}
            <div className="relative w-full h-36 sm:h-44 mt-auto">
              {/* Ramp Concrete Surface */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 500 150">
                {/* Grass hill background */}
                <path d="M 0 150 L 0 110 Q 250 115 500 70 L 500 150 Z" fill="#86efac" opacity="0.6" />
                {/* Sloped Ramp Slab */}
                <path d="M 50 140 L 450 65 L 450 85 L 50 150 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                {/* Yellow safety tactile strip along the ramp */}
                <path d="M 60 136 L 440 68" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 4" />
                {/* Safety Handrail */}
                <path d="M 50 110 L 450 35" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                <line x1="100" y1="130" x2="100" y2="95" stroke="#3b82f6" strokeWidth="3" />
                <line x1="200" y1="110" x2="200" y2="75" stroke="#3b82f6" strokeWidth="3" />
                <line x1="300" y1="90" x2="300" y2="55" stroke="#3b82f6" strokeWidth="3" />
                <line x1="400" y1="70" x2="400" y2="38" stroke="#3b82f6" strokeWidth="3" />
              </svg>

              {/* Animated Characters on the Ramp (Rani in wheelchair & Mita pushing) */}
              <div
                className="absolute transition-all duration-300 ease-out flex items-end gap-1.5"
                style={{
                  left: `${rampProgress}%`,
                  bottom: `${15 + (rampProgress / 100) * 45}px`,
                  transform: "translateX(-50%)",
                }}
              >
                {/* Mita (Caring friend) */}
                <div className="flex flex-col items-center">
                  <div className="px-1.5 py-0.5 rounded-md bg-purple-600 text-white text-[9px] font-bold shadow-2xs whitespace-nowrap animate-bounce">
                    মিতা (Mita)
                  </div>
                  <div className="text-3xl sm:text-4xl filter drop-shadow-md">
                    👧
                  </div>
                </div>

                {/* Rani in Wheelchair */}
                <div className="flex flex-col items-center">
                  <div className="px-1.5 py-0.5 rounded-md bg-amber-600 text-white text-[9px] font-bold shadow-2xs whitespace-nowrap">
                    রানি (Rani) 😊
                  </div>
                  <div className="relative text-3xl sm:text-4xl filter drop-shadow-md">
                    <span className="inline-block transform -scale-x-100">👩‍🦽</span>
                    {/* Spinning wheel effect */}
                    {isMovingUpRamp && (
                      <span className="absolute -bottom-1 left-2 text-xs animate-spin text-amber-600">
                        ⚙️
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Ramp Start Marker */}
              <div className="absolute left-4 bottom-2 text-center">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-700 border border-slate-300 shadow-2xs">
                  র‍্যাম্পের শুরু 📍
                </span>
              </div>

              {/* Ramp End Marker */}
              <div className="absolute right-4 top-4 text-center">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                  ক্লাসরুম দুয়ার 🏁
                </span>
              </div>
            </div>

            {/* Bottom Interactive Control Panel for Ramp */}
            <div className="mt-2 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-xs border border-amber-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-amber-100 text-amber-700 text-sm">
                  🤝
                </span>
                <div>
                  <p className="text-xs font-black text-slate-800">
                    মিতার সহযোগিতা: র‍্যাম্প দিয়ে ক্লাসরুমে প্রবেশ
                  </p>
                  <p className="text-[11px] text-slate-600">
                    "Every morning, Mita helps push the wheelchair up the ramp."
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleClimbRamp}
                  disabled={isMovingUpRamp}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                    isMovingUpRamp
                      ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                      : "bg-linear-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 active:scale-95"
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isMovingUpRamp ? "র‍্যাম্প বেয়ে উঠছে..." : "র‍্যাম্প দিয়ে চলো ➔"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSpeak("Every morning, her friend Mita helps her push the wheelchair up the ramp into the classroom.")}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all shadow-2xs shrink-0"
                  title="উচ্চারণ শুনুন"
                >
                  <Volume2 className="w-4 h-4 text-purple-700" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE 2: INCLUSIVE PASSING BALL GAME                           */}
        {/* ------------------------------------------------------------- */}
        {activeMode === "ball_game" && (
          <div className="relative w-full h-full flex flex-col justify-between z-10 pt-4">
            {/* Top Score & Instruction */}
            <div className="flex items-center justify-between bg-white/90 p-2 rounded-xl border border-emerald-200 shadow-2xs">
              <div className="flex items-center gap-1.5">
                <span className="text-lg">⚽</span>
                <span className="text-xs font-black text-emerald-900">
                  ইনক্লুসিভ বল পাসিং খেলা (Passing the Ball Game)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-600">
                  মোট পাস: <strong className="text-emerald-700 font-black">{passCount}</strong>
                </span>
                {isCheering && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-pink-500 text-white animate-bounce shadow-xs">
                    🎉 সাবাশ রানি!
                  </span>
                )}
              </div>
            </div>

            {/* Circular Playground Layout */}
            <div className="relative flex-1 min-h-[200px] flex items-center justify-center">
              {/* Center Game Field */}
              <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full border-2 border-dashed border-emerald-400 bg-emerald-100/50 flex items-center justify-center relative">
                {/* Physical Education Teacher */}
                <div
                  onClick={() => handlePassBall("teacher")}
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer transition-transform hover:scale-105 ${
                    ballHolder === "teacher" ? "ring-4 ring-amber-400 rounded-2xl p-1 bg-amber-50" : ""
                  }`}
                >
                  <span className="text-2xl sm:text-3xl">👨‍🏫</span>
                  <span className="text-[10px] font-black px-1.5 py-0.2 rounded-md bg-blue-600 text-white shadow-2xs">
                    Teacher (শিক্ষক)
                  </span>
                  {ballHolder === "teacher" && (
                    <span className="absolute -bottom-2 text-xl animate-bounce">⚽</span>
                  )}
                </div>

                {/* Mita (Left) */}
                <div
                  onClick={() => handlePassBall("mita")}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 flex flex-col items-center cursor-pointer transition-transform hover:scale-105 ${
                    ballHolder === "mita" ? "ring-4 ring-amber-400 rounded-2xl p-1 bg-amber-50" : ""
                  }`}
                >
                  <span className="text-2xl sm:text-3xl">👧</span>
                  <span className="text-[10px] font-black px-1.5 py-0.2 rounded-md bg-purple-600 text-white shadow-2xs">
                    Mita (মিতা)
                  </span>
                  {ballHolder === "mita" && (
                    <span className="absolute -bottom-2 text-xl animate-bounce">⚽</span>
                  )}
                </div>

                {/* Porshi (Right) */}
                <div
                  onClick={() => handlePassBall("porshi")}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 flex flex-col items-center cursor-pointer transition-transform hover:scale-105 ${
                    ballHolder === "porshi" ? "ring-4 ring-amber-400 rounded-2xl p-1 bg-amber-50" : ""
                  }`}
                >
                  <span className="text-2xl sm:text-3xl">👦</span>
                  <span className="text-[10px] font-black px-1.5 py-0.2 rounded-md bg-teal-600 text-white shadow-2xs">
                    Porshi (পড়শী)
                  </span>
                  {ballHolder === "porshi" && (
                    <span className="absolute -bottom-2 text-xl animate-bounce">⚽</span>
                  )}
                </div>

                {/* Rani in Wheelchair (Center Bottom Focus) */}
                <div
                  onClick={() => handlePassBall("rani")}
                  className={`absolute -bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer transition-transform hover:scale-110 ${
                    ballHolder === "rani" ? "ring-4 ring-emerald-500 rounded-2xl p-1.5 bg-emerald-100 shadow-md" : ""
                  }`}
                >
                  <div className="relative">
                    <span className="text-3xl sm:text-4xl">👩‍🦽</span>
                    {ballHolder === "rani" && (
                      <span className="absolute -top-3 right-0 text-2xl animate-bounce">
                        ⚽✨
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-emerald-700 text-white shadow-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current text-amber-300" />
                    <span>Rani (রানি)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Controls for Passing Ball */}
            <div className="mt-2 p-2.5 rounded-2xl bg-white/95 border border-emerald-200 shadow-xs flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-slate-700 font-medium">
                👉 বন্ধুদের নামের ওপর ক্লিক করে রানিকে বল পাস করো:
              </p>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => handlePassBall("rani")}
                  className="px-3 py-1 rounded-xl text-xs font-black bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-xs flex items-center gap-1"
                >
                  <span>⚽ রানিকে বল দাও!</span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePassBall("mita")}
                  className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-purple-100 transition-all"
                >
                  <span>মিতাকে দাও</span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePassBall("porshi")}
                  className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-teal-100 transition-all"
                >
                  <span>পড়শীকে দাও</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE 3: STORYTELLING & RECITATION SPOTLIGHT                   */}
        {/* ------------------------------------------------------------- */}
        {activeMode === "recitation" && (
          <div className="relative w-full h-full flex flex-col justify-between z-10 pt-4">
            {/* Top Stage Spotlight Header */}
            <div className="bg-indigo-900/90 text-white p-2.5 rounded-2xl border border-indigo-700 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎙️</span>
                <div>
                  <h4 className="text-xs font-black">রানির আবৃত্তি ও গল্প বলার আসর (Talent Spotlight)</h4>
                  <p className="text-[10px] text-indigo-200">"Rani is very good at recitation and storytelling."</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-indigo-950">
                ⭐ Star Performer
              </span>
            </div>

            {/* Stage Center: Rani with Microphone & Cheerful Classmates */}
            <div className="flex-1 flex flex-col items-center justify-center p-3 relative">
              {/* Cheerful Poem Speech Bubble */}
              <div className={`max-w-md p-3.5 rounded-2xl bg-white border-2 border-indigo-400 shadow-md text-center transition-all ${isReciting ? "scale-105 ring-4 ring-amber-300" : ""}`}>
                <p className="text-xs sm:text-sm font-black text-indigo-950 leading-relaxed">
                  "The sun is bright, the sky is blue.<br />
                  We are friends, caring and true.<br />
                  Together we learn, together we play,<br />
                  Happy and smiling every day!" 🌟
                </p>
                <p className="text-[10px] text-slate-500 font-bold mt-1">
                  — রানি'র আবৃত্তিকৃত কবিতা (English Rhyme of Friendship)
                </p>
              </div>

              {/* Rani on Stage */}
              <div className="flex items-end justify-center gap-4 mt-3">
                <div className="text-2xl opacity-75">👏👦</div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl sm:text-5xl filter drop-shadow-md">
                    👩‍🦽🎙️
                  </div>
                  <span className="mt-1 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[11px] font-black shadow-xs">
                    Rani (রানি)
                  </span>
                </div>
                <div className="text-2xl opacity-75">👧👏</div>
              </div>
            </div>

            {/* Recitation Trigger Bar */}
            <div className="p-2.5 rounded-2xl bg-white border border-indigo-200 shadow-xs flex items-center justify-between gap-2">
              <p className="text-xs text-slate-700 font-medium">
                রানির কণ্ঠে ইংরেজি কবিতা শুনতে প্লে বাটনে ক্লিক করুন:
              </p>
              <button
                type="button"
                onClick={handleStartRecitation}
                className="px-4 py-2 rounded-xl text-xs font-black bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all shadow-xs flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isReciting ? "আবৃত্তি চলছে..." : "কবিতা আবৃত্তি শোনো"}</span>
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE 4: INCLUSION & ACCESSIBILITY EXPLORER                    */}
        {/* ------------------------------------------------------------- */}
        {activeMode === "explore" && (
          <div className="relative w-full h-full flex flex-col justify-between z-10 pt-4">
            {/* Top Explorer Banner */}
            <div className="bg-purple-900/90 text-white p-2.5 rounded-2xl border border-purple-700 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔍</span>
                <div>
                  <h4 className="text-xs font-black">অন্তর্ভুক্তি ও সহমর্মিতা ল্যাব (Inclusion & Accessibility)</h4>
                  <p className="text-[10px] text-purple-200">ছবিটির বিভিন্ন উপাদানে ক্লিক করে বিস্তারিত জানুন</p>
                </div>
              </div>
            </div>

            {/* Interactive Campus Map with Pulsing Hotspots */}
            <div className="relative flex-1 min-h-[220px] rounded-2xl bg-white/60 border border-purple-200 overflow-hidden my-2">
              {/* Campus Illustration Layout */}
              <div className="absolute inset-0 flex items-center justify-around p-4 opacity-80 pointer-events-none">
                <span className="text-5xl">🏫</span>
                <span className="text-5xl">👩‍🦽</span>
                <span className="text-5xl">👧</span>
                <span className="text-5xl">⚽</span>
              </div>

              {/* Hotspot Markers */}
              {HOTSPOTS.map((spot) => (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => {
                    setActiveHotspot(spot);
                    playChime?.("click");
                    handleSpeak(`${spot.name}. ${spot.bangla}.`);
                  }}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl border-2 transition-all flex items-center gap-1.5 shadow-md ${
                    activeHotspot?.id === spot.id
                      ? "bg-purple-600 text-white border-amber-300 scale-110 ring-4 ring-purple-300 z-20"
                      : "bg-white text-slate-800 border-purple-300 hover:scale-105 z-10"
                  }`}
                >
                  <span className="text-base">{spot.icon}</span>
                  <span className="text-[10px] font-black whitespace-nowrap">{spot.name}</span>
                </button>
              ))}
            </div>

            {/* Hotspot Detail Card Modal / Box */}
            {activeHotspot ? (
              <div className="p-3 rounded-2xl bg-white border-2 border-purple-400 shadow-md flex items-start justify-between gap-3 animate-in fade-in">
                <div className="flex items-start gap-2.5">
                  <span className="text-3xl p-1.5 rounded-xl bg-purple-100 border border-purple-200 shrink-0">
                    {activeHotspot.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-xs text-purple-950">{activeHotspot.name}</h4>
                      <span className="text-[10px] font-bold text-purple-700">({activeHotspot.bangla})</span>
                    </div>
                    <p className="text-[11px] text-slate-700 mt-0.5 leading-relaxed font-medium">
                      {activeHotspot.detail}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleSpeak(`${activeHotspot.name}. ${activeHotspot.detail}`)}
                  className="p-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 shrink-0 shadow-2xs"
                  title="বিস্তারিত শোনো"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="p-2.5 rounded-2xl bg-purple-50 border border-purple-200 text-center text-xs text-purple-800 font-bold">
                👉 উপরের যেকোনো বাটনে (Wheelchair, Ramp, Friends, Ball Game) ক্লিক করে বিস্তারিত জানুন।
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Educational Motto Bar */}
      <div className="mt-2.5 pt-2 border-t border-amber-200/80 flex items-center justify-between text-[11px] text-amber-950 font-bold shrink-0">
        <span className="flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>"In our school, every child is valued and respected equally."</span>
        </span>
        <span className="text-amber-800 text-[10px] font-semibold hidden sm:inline">
          আমাদের বিদ্যালয়ে প্রতিটি শিশু সমান মর্যাদাবান ও সম্মানিত ❤️
        </span>
      </div>
    </div>
  );
}
