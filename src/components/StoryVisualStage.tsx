"use client";

import React, { useState, useEffect } from "react";
import { Volume2, Sparkles, Sun, Snowflake, Eye, Check } from "lucide-react";

interface StoryVisualStageProps {
  slideId: number; // 3, 4, or 5
  playChime?: (type: "correct" | "click" | "fanfare") => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

interface HotspotItem {
  id: string;
  name: string;
  bangla: string;
  x: number; // percentage
  y: number; // percentage
  icon: string;
}

export default function StoryVisualStage({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}: StoryVisualStageProps) {
  const [activeHotspot, setActiveHotspot] = useState<HotspotItem | null>(null);
  const [characterAction, setCharacterAction] = useState<string | null>(null);

  // Trigger micro-animation on character click
  const handleCharacterClick = (char: "ant" | "grasshopper" | "sun") => {
    setCharacterAction(char);
    if (playChime) playChime("click");

    if (char === "grasshopper") {
      if (slideId === 5) {
        handleSpeak("I am cold and hungry! The days are so cold.");
      } else {
        handleSpeak("Tra-la-la! I am dancing and singing happily!");
      }
    } else if (char === "ant") {
      if (slideId === 5) {
        handleSpeak("I am warm and happy in my cozy home with plenty of food.");
      } else {
        handleSpeak("I am carrying an ear of corn to store food for winter.");
      }
    } else if (char === "sun") {
      handleSpeak("It is a bright and warm sunny summer morning.");
    }

    setTimeout(() => setCharacterAction(null), 1500);
  };

  const handleHotspotClick = (item: HotspotItem) => {
    setActiveHotspot(item);
    if (playChime) playChime("click");
    handleSpeak(item.name);
    setTimeout(() => setActiveHotspot(null), 3000);
  };

  // Define Hotspots based on slide
  const getHotspots = (): HotspotItem[] => {
    if (slideId === 3) {
      return [
        { id: "sun", name: "Sun", bangla: "সূর্য", x: 82, y: 18, icon: "☀️" },
        { id: "ant", name: "Ant", bangla: "পিঁপড়া", x: 26, y: 68, icon: "🐜" },
        { id: "grasshopper", name: "Grasshopper", bangla: "ঘাসফড়িং", x: 68, y: 62, icon: "🦗" },
        { id: "grass", name: "Grassy Field", bangla: "ঘাসযুক্ত মাঠ", x: 48, y: 84, icon: "🌾" },
      ];
    } else if (slideId === 4) {
      return [
        { id: "corn", name: "Ear of corn", bangla: "ভুট্টার ছড়া", x: 28, y: 52, icon: "🌽" },
        { id: "ant", name: "Hardworking Ant", bangla: "পরিশ্রমী পিঁপড়া", x: 34, y: 68, icon: "🐜" },
        { id: "grasshopper", name: "Lazy Grasshopper", bangla: "অলস ঘাসফড়িং", x: 74, y: 64, icon: "🦗" },
        { id: "house", name: "Ant's House", bangla: "পিঁপড়ার বাসা", x: 12, y: 78, icon: "🏡" },
      ];
    } else {
      // Slide 5: Winter
      return [
        { id: "cold", name: "Cold Winter", bangla: "কনকনে শীত", x: 80, y: 18, icon: "❄️" },
        { id: "starving", name: "Starving Grasshopper", bangla: "অনাহারী ঘাসফড়িং", x: 75, y: 68, icon: "🥶" },
        { id: "cozy", name: "Cozy Home", bangla: "উষ্ণ ও আরামদায়ক ঘর", x: 25, y: 72, icon: "🔥" },
        { id: "food", name: "Plenty of food", bangla: "প্রচুর জমানো খাবার", x: 38, y: 82, icon: "🌽" },
      ];
    }
  };

  const hotspots = getHotspots();

  return (
    <div
      className={`rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden relative transition-all duration-300 select-none flex flex-col ${
        isFullTheater ? "min-h-[460px] md:min-h-[520px]" : "min-h-[380px] md:min-h-[420px]"
      } ${
        slideId === 5
          ? "bg-gradient-to-b from-sky-100 via-slate-100 to-sky-200"
          : "bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100"
      }`}
    >
      {/* 🏷️ Top Scene Badge Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs border border-slate-200/80 shadow-2xs pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-black text-slate-700">
            {slideId === 3 && "☀️ গ্রীষ্মের সকাল: দুই ভালো বন্ধু"}
            {slideId === 4 && "🐜🌽 মেঠোপথ: পিঁপড়ার কাজ ও ঘাসফড়িংয়ের ডাক"}
            {slideId === 5 && "❄️ শীতের আগমন: অলসতা বনাম দূরদর্শিতার ফল"}
          </span>
        </div>

        {/* Action Cues */}
        <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50/90 border border-purple-200 text-purple-800 text-[11px] font-bold shadow-2xs pointer-events-auto">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>চরিত্র বা বস্তুতে ক্লিক করে উচ্চারণ শুনুন</span>
        </div>
      </div>

      {/* 🖼️ MAIN SVG CANVAS */}
      <div className="flex-1 w-full h-full relative flex items-center justify-center p-2 pt-10">
        <svg
          viewBox="0 0 800 480"
          className="w-full h-full max-h-[500px] object-contain drop-shadow-xs"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft Shadow */}
            <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.12" />
            </filter>
            
            {/* Gradients */}
            <linearGradient id="summerSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="60%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>

            <linearGradient id="winterSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            <linearGradient id="lushGrass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="40%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>

            <linearGradient id="snowGround" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="60%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            <linearGradient id="warmHearth" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="50%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fbcfe8" />
            </linearGradient>
          </defs>

          {/* ========================================================== */}
          {/* SLIDE 3: SUMMER MORNING - TWO FRIENDS                     */}
          {/* ========================================================== */}
          {slideId === 3 && (
            <g id="scene-slide-3">
              {/* Sky Background */}
              <rect x="0" y="0" width="800" height="480" rx="20" fill="url(#summerSky)" />

              {/* Radiant Sun with gentle pulse */}
              <g 
                onClick={() => handleCharacterClick("sun")} 
                className="cursor-pointer group"
                transform="translate(670, 90)"
              >
                <circle cx="0" cy="0" r="55" fill="#fde047" opacity="0.35" className="animate-pulse" />
                <circle cx="0" cy="0" r="42" fill="#facc15" stroke="#eab308" strokeWidth="2.5" />
                {/* Sun Rays */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * 45 * Math.PI) / 180;
                  const x1 = Math.cos(angle) * 46;
                  const y1 = Math.sin(angle) * 46;
                  const x2 = Math.cos(angle) * 56;
                  const y2 = Math.sin(angle) * 56;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#f59e0b"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  );
                })}
                {/* Sun smile */}
                <circle cx="-12" cy="-8" r="4" fill="#854d0e" />
                <circle cx="12" cy="-8" r="4" fill="#854d0e" />
                <path d="M -15 8 Q 0 20 15 8" fill="none" stroke="#854d0e" strokeWidth="3" strokeLinecap="round" />
              </g>

              {/* Floating Fluffy Clouds */}
              <g opacity="0.92">
                <ellipse cx="160" cy="85" rx="50" ry="24" fill="#ffffff" />
                <ellipse cx="205" cy="75" rx="40" ry="26" fill="#ffffff" />
                <ellipse cx="125" cy="90" rx="35" ry="18" fill="#ffffff" />

                <ellipse cx="440" cy="110" rx="45" ry="20" fill="#ffffff" />
                <ellipse cx="480" cy="100" rx="35" ry="22" fill="#ffffff" />
              </g>

              {/* Distant Blue Hills */}
              <path
                d="M 0 310 Q 180 200 400 280 Q 620 220 800 300 L 800 480 L 0 480 Z"
                fill="#86efac"
                opacity="0.65"
              />

              {/* Main Rolling Grassy Field */}
              <path
                d="M 0 330 Q 220 280 480 320 Q 680 340 800 310 L 800 480 L 0 480 Z"
                fill="url(#lushGrass)"
              />

              {/* Grass details & flowers */}
              <path
                d="M 120 380 Q 125 350 135 345 M 125 380 Q 135 355 145 350 M 340 400 Q 345 370 355 365 M 580 390 Q 590 360 605 355"
                stroke="#15803d"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="80" cy="410" r="6" fill="#f43f5e" />
              <circle cx="280" cy="420" r="5" fill="#ec4899" />
              <circle cx="510" cy="430" r="6" fill="#fbbf24" />

              {/* ================= CHARACTER 1: ANT ================= */}
              <g
                onClick={() => handleCharacterClick("ant")}
                className="cursor-pointer group"
                transform={`translate(210, 310) ${characterAction === "ant" ? "scale(1.1) translate(-10, -10)" : ""}`}
                style={{ transition: "transform 0.2s" }}
              >
                {/* Ground shadow */}
                <ellipse cx="40" cy="72" rx="35" ry="8" fill="#000000" opacity="0.22" />
                {/* Ant Body - 3 Segments */}
                <circle cx="18" cy="52" r="14" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                <circle cx="36" cy="46" r="11" fill="#92400e" stroke="#451a03" strokeWidth="2" />
                <circle cx="52" cy="38" r="10" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                {/* Friendly Eye */}
                <circle cx="56" cy="36" r="3.5" fill="#ffffff" />
                <circle cx="57" cy="36" r="1.8" fill="#000000" />
                {/* Antennae */}
                <path d="M 54 30 Q 60 16 66 20" fill="none" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
                <path d="M 50 30 Q 52 14 58 16" fill="none" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
                {/* Legs */}
                <path
                  d="M 18 58 L 10 70 M 24 58 L 22 70 M 34 52 L 35 70 M 42 50 L 46 68 M 50 44 L 56 65"
                  stroke="#451a03"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Tiny Speech / Label */}
                <rect x="0" y="80" width="80" height="20" rx="10" fill="#ffffff" stroke="#fcd34d" filter="url(#softShadow)" />
                <text x="40" y="94" fontSize="10" fontWeight="bold" fill="#78350f" textAnchor="middle">
                  🐜 Ant
                </text>
              </g>

              {/* ================= CHARACTER 2: GRASSHOPPER (DANCING) ================= */}
              <g
                onClick={() => handleCharacterClick("grasshopper")}
                className="cursor-pointer group"
                transform={`translate(530, 240) ${characterAction === "grasshopper" ? "scale(1.12) translate(-10, -15)" : ""}`}
                style={{ transition: "transform 0.2s" }}
              >
                {/* Musical Notes Floating */}
                <text x="110" y="20" fontSize="22" fill="#8b5cf6" className="animate-bounce">
                  🎵
                </text>
                <text x="30" y="10" fontSize="18" fill="#ec4899">
                  🎶
                </text>
                {/* Ground shadow */}
                <ellipse cx="65" cy="145" rx="45" ry="10" fill="#000000" opacity="0.22" />

                {/* Grasshopper Body Parts */}
                {/* Hind Leg (Bent, ready to spring) */}
                <path
                  d="M 55 105 Q 85 50 110 80 L 105 142"
                  fill="none"
                  stroke="#3f6212"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M 40 105 Q 20 60 5 90 L 15 142"
                  fill="none"
                  stroke="#3f6212"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Thorax and Abdomen */}
                <ellipse cx="60" cy="100" rx="35" ry="16" transform="rotate(-25 60 100)" fill="#65a30d" stroke="#365314" strokeWidth="2.5" />
                <path
                  d="M 78 88 Q 120 100 135 125 Q 100 125 70 105 Z"
                  fill="#84cc16"
                  stroke="#365314"
                  strokeWidth="2"
                />
                {/* Head */}
                <circle cx="36" cy="80" r="16" fill="#84cc16" stroke="#365314" strokeWidth="2.5" />
                {/* Big Happy Eye */}
                <circle cx="32" cy="75" r="5" fill="#ffffff" />
                <circle cx="31" cy="75" r="2.5" fill="#14532d" />
                {/* Wide Smiling Mouth */}
                <path d="M 28 88 Q 38 96 46 88" fill="none" stroke="#14532d" strokeWidth="2.5" strokeLinecap="round" />
                {/* Long Antennae */}
                <path d="M 32 65 Q 20 30 10 35" fill="none" stroke="#365314" strokeWidth="2" strokeLinecap="round" />
                <path d="M 36 65 Q 40 25 50 28" fill="none" stroke="#365314" strokeWidth="2" strokeLinecap="round" />

                {/* Little Violin / Musical Fiddle in hand */}
                <path d="M 20 95 L 50 82" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
                <rect x="42" y="76" width="16" height="12" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />

                {/* Name Label */}
                <rect x="15" y="152" width="100" height="22" rx="11" fill="#ffffff" stroke="#86efac" strokeWidth="1.5" filter="url(#softShadow)" />
                <text x="65" y="167" fontSize="11" fontWeight="bold" fill="#15803d" textAnchor="middle">
                  🦗 Grasshopper
                </text>
              </g>
            </g>
          )}

          {/* ========================================================== */}
          {/* SLIDE 4: HARD WORK VS PLAY - CARRYING CORN                */}
          {/* ========================================================== */}
          {slideId === 4 && (
            <g id="scene-slide-4">
              {/* Sky Background */}
              <rect x="0" y="0" width="800" height="480" rx="20" fill="url(#summerSky)" />

              {/* Warm Summer Sun */}
              <circle cx="100" cy="80" r="45" fill="#facc15" stroke="#eab308" strokeWidth="2" />
              <circle cx="100" cy="80" r="58" fill="#fde047" opacity="0.3" className="animate-pulse" />

              {/* Pathway Across Field */}
              <path
                d="M 0 320 Q 250 280 500 320 Q 700 340 800 310 L 800 480 L 0 480 Z"
                fill="url(#lushGrass)"
              />
              {/* Sandy Dirt Trail where ant walks */}
              <path
                d="M 0 410 Q 300 380 600 420 Q 700 430 800 410 L 800 480 L 0 480 Z"
                fill="#fde68a"
                opacity="0.85"
              />

              {/* Ant's Underground Anthill Entrance (Left) */}
              <g transform="translate(60, 360)">
                <ellipse cx="40" cy="35" rx="45" ry="18" fill="#78350f" />
                <ellipse cx="40" cy="35" rx="30" ry="11" fill="#292524" />
                <path d="M 10 35 Q 40 5 70 35 Z" fill="#92400e" opacity="0.7" />
                <rect x="0" y="48" width="80" height="18" rx="9" fill="#ffffff" stroke="#ca8a04" filter="url(#softShadow)" />
                <text x="40" y="61" fontSize="10" fontWeight="bold" fill="#78350f" textAnchor="middle">
                  🏡 Ant's House
                </text>
              </g>

              {/* ================= HARDWORKING ANT CARRYING CORN ================= */}
              <g
                onClick={() => handleCharacterClick("ant")}
                className="cursor-pointer group"
                transform={`translate(260, 310) ${characterAction === "ant" ? "scale(1.1) translate(-10, -10)" : ""}`}
                style={{ transition: "transform 0.2s" }}
              >
                {/* Ant shadow */}
                <ellipse cx="45" cy="85" rx="38" ry="8" fill="#000000" opacity="0.25" />

                {/* THE GOLDEN EAR OF CORN (Carried on shoulder/back) */}
                <g transform="translate(10, 10) rotate(-15 40 40)">
                  {/* Green husk wrapping */}
                  <path d="M 25 35 Q 35 15 50 18 Q 40 40 25 35 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
                  <path d="M 20 40 Q 15 20 30 25 Q 30 45 20 40 Z" fill="#16a34a" stroke="#15803d" strokeWidth="1.5" />
                  {/* Golden Corn Cob */}
                  <ellipse cx="50" cy="35" rx="32" ry="15" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
                  {/* Kernel texture */}
                  <path
                    d="M 32 30 L 68 25 M 30 35 L 70 32 M 32 40 L 66 38 M 42 22 L 40 46 M 52 22 L 50 46 M 60 22 L 58 46"
                    stroke="#d97706"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  {/* Corn Label Tag */}
                  <rect x="15" y="-5" width="75" height="18" rx="9" fill="#fef08a" stroke="#ca8a04" filter="url(#softShadow)" />
                  <text x="52" y="8" fontSize="9" fontWeight="900" fill="#854d0e" textAnchor="middle">
                    🌽 Ear of Corn
                  </text>
                </g>

                {/* Ant Body - Bearing weight with determination */}
                <circle cx="25" cy="65" r="14" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                <circle cx="44" cy="58" r="12" fill="#92400e" stroke="#451a03" strokeWidth="2" />
                <circle cx="58" cy="50" r="10" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                {/* Determined Eye & Sweat Drop */}
                <circle cx="62" cy="48" r="3.5" fill="#ffffff" />
                <circle cx="63" cy="48" r="1.8" fill="#000000" />
                <circle cx="60" cy="38" r="2.5" fill="#38bdf8" />
                {/* Antennae */}
                <path d="M 60 42 Q 68 30 74 34" fill="none" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
                {/* Legs carrying weight */}
                <path
                  d="M 22 72 L 15 85 M 32 70 L 30 85 M 42 66 L 45 84 M 52 62 L 58 80"
                  stroke="#451a03"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </g>

              {/* ================= LAUGHING GRASSHOPPER ON LAWN CHAIR/LEAF ================= */}
              <g
                onClick={() => handleCharacterClick("grasshopper")}
                className="cursor-pointer group"
                transform={`translate(550, 270) ${characterAction === "grasshopper" ? "scale(1.1) translate(-10, -10)" : ""}`}
                style={{ transition: "transform 0.2s" }}
              >
                {/* Ground shadow */}
                <ellipse cx="60" cy="115" rx="55" ry="12" fill="#000000" opacity="0.22" />

                {/* Large Green Leaf Lounger */}
                <path
                  d="M 0 110 Q 50 80 120 100 Q 140 120 70 120 Q 20 120 0 110 Z"
                  fill="#4ade80"
                  stroke="#16a34a"
                  strokeWidth="2"
                />

                {/* Reclining Grasshopper */}
                <ellipse cx="65" cy="85" rx="35" ry="16" transform="rotate(-15 65 85)" fill="#65a30d" stroke="#365314" strokeWidth="2" />
                <circle cx="40" cy="70" r="16" fill="#84cc16" stroke="#365314" strokeWidth="2" />
                {/* Laughing Eyes (Arc) */}
                <path d="M 33 68 Q 36 64 39 68 M 41 68 Q 44 64 47 68" stroke="#14532d" strokeWidth="2" fill="none" strokeLinecap="round" />
                {/* Wide Open Laughing Mouth */}
                <path d="M 32 76 Q 40 88 48 76 Z" fill="#ef4444" stroke="#14532d" strokeWidth="2" />
                {/* Waving hand at the ant */}
                <path d="M 50 78 Q 30 50 15 55" fill="none" stroke="#365314" strokeWidth="3.5" strokeLinecap="round" />

                {/* Comic Speech Bubble */}
                <g transform="translate(-140, -45)">
                  <rect x="0" y="0" width="190" height="48" rx="14" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" filter="url(#softShadow)" />
                  <polygon points="170,48 185,48 180,60" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" />
                  <rect x="168" y="46" width="18" height="4" fill="#ffffff" />
                  <text x="95" y="20" fontSize="11" fontWeight="bold" fill="#0284c7" textAnchor="middle">
                    "Hey Ant! Why work so hard?"
                  </text>
                  <text x="95" y="36" fontSize="10" fontWeight="600" fill="#475569" textAnchor="middle">
                    Come &amp; enjoy the sun! ☀️
                  </text>
                </g>
              </g>
            </g>
          )}

          {/* ========================================================== */}
          {/* SLIDE 5: WINTER CONTRAST - OUTSIDE COLD VS COZY ANTHILL   */}
          {/* ========================================================== */}
          {slideId === 5 && (
            <g id="scene-slide-5">
              {/* Cold Gloomy Winter Sky */}
              <rect x="0" y="0" width="800" height="480" rx="20" fill="url(#winterSky)" />

              {/* Cold Gloomy Sun behind cloud */}
              <circle cx="700" cy="80" r="35" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" opacity="0.6" />
              <ellipse cx="680" cy="85" rx="55" ry="22" fill="#94a3b8" opacity="0.5" />

              {/* Bare, Leafless Winter Trees */}
              <g stroke="#475569" strokeWidth="4" strokeLinecap="round" fill="none">
                <path d="M 640 330 L 640 210 M 640 250 L 600 200 M 640 230 L 680 180 M 600 200 L 590 170 M 680 180 L 710 160" />
              </g>

              {/* Falling Dry Leaves */}
              <g fill="#b45309" stroke="#78350f" strokeWidth="1">
                <path d="M 590 230 Q 600 240 595 245 Q 585 240 590 230 Z" transform="rotate(25 590 230)" />
                <path d="M 670 210 Q 680 220 675 225 Q 665 220 670 210 Z" transform="rotate(-30 670 210)" />
                <path d="M 620 280 Q 630 290 625 295 Q 615 290 620 280 Z" transform="rotate(45 620 280)" />
              </g>

              {/* Snowy Frozen Ground Surface */}
              <path
                d="M 0 310 Q 250 290 500 320 Q 700 310 800 320 L 800 480 L 0 480 Z"
                fill="url(#snowGround)"
              />

              {/* ================= LEFT 50%: CROSS-SECTION OF ANT'S COZY WARM HOME ================= */}
              <g transform="translate(40, 270)">
                {/* Underground Burrow Outline */}
                <path
                  d="M 0 50 Q 180 30 360 50 L 360 190 L 0 190 Z"
                  fill="url(#warmHearth)"
                  stroke="#78350f"
                  strokeWidth="3"
                />

                {/* Warm Hearth / Glowing Lantern */}
                <circle cx="70" cy="110" r="30" fill="#fef08a" opacity="0.4" className="animate-pulse" />
                <rect x="62" y="98" width="16" height="24" rx="4" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                <circle cx="70" cy="110" r="5" fill="#fef08a" />
                <text x="70" y="92" fontSize="14" textAnchor="middle">
                  🔥
                </text>

                {/* Mountain of Stored Food (Corn & Berries) */}
                <g transform="translate(130, 95)">
                  <ellipse cx="40" cy="45" rx="35" ry="12" fill="#78350f" opacity="0.2" />
                  <text x="25" y="42" fontSize="26">
                    🌽
                  </text>
                  <text x="45" y="38" fontSize="26">
                    🌽
                  </text>
                  <text x="35" y="22" fontSize="24">
                    🌰
                  </text>
                  <text x="55" y="24" fontSize="20">
                    🍇
                  </text>
                </g>

                {/* Happy Warm Ant Drinking Tea */}
                <g 
                  onClick={() => handleCharacterClick("ant")} 
                  className="cursor-pointer"
                  transform="translate(230, 80)"
                >
                  <circle cx="20" cy="45" r="12" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                  <circle cx="36" cy="40" r="10" fill="#92400e" stroke="#451a03" strokeWidth="2" />
                  <circle cx="48" cy="34" r="9" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                  {/* Happy closed smile eye */}
                  <path d="M 45 32 Q 48 28 51 32" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />
                  {/* Cozy wool scarf */}
                  <rect x="38" y="42" width="12" height="6" rx="2" fill="#ef4444" />
                  {/* Teacup in hand */}
                  <rect x="54" y="38" width="10" height="8" rx="2" fill="#38bdf8" />
                  <path d="M 58 36 Q 60 30 62 34" stroke="#ffffff" strokeWidth="1.5" fill="none" />
                </g>

                {/* Cozy Room Label */}
                <rect x="80" y="160" width="180" height="22" rx="11" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.5" filter="url(#softShadow)" />
                <text x="170" y="175" fontSize="11" fontWeight="bold" fill="#78350f" textAnchor="middle">
                  🏡 Ant's Cozy Home (Plenty of Food)
                </text>
              </g>

              {/* ================= RIGHT 50%: FREEZING OUTSIDE - STARVING GRASSHOPPER ================= */}
              <g
                onClick={() => handleCharacterClick("grasshopper")}
                className="cursor-pointer group"
                transform={`translate(560, 270) ${characterAction === "grasshopper" ? "scale(1.08) translate(-5, -5)" : ""}`}
                style={{ transition: "transform 0.2s" }}
              >
                {/* Shivering Snow Base */}
                <ellipse cx="65" cy="115" rx="45" ry="10" fill="#cbd5e1" opacity="0.6" />

                {/* Shivering Grasshopper (Cold, pale green/blue) */}
                <ellipse cx="60" cy="85" rx="30" ry="16" transform="rotate(-30 60 85)" fill="#64748b" stroke="#334155" strokeWidth="2" />
                <circle cx="36" cy="65" r="15" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
                {/* Sad, Tearful Shivering Face */}
                <circle cx="32" cy="62" r="3.5" fill="#ffffff" />
                <circle cx="32" cy="62" r="1.8" fill="#1e293b" />
                <path d="M 30 75 Q 36 68 42 75" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                {/* Shivering Lines */}
                <path d="M 12 55 L 18 58 M 10 70 L 16 72 M 75 75 L 82 78" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />

                {/* Drooping sad antennae */}
                <path d="M 32 50 Q 25 35 15 45" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

                {/* Comic Frost / Shiver Speech Bubble */}
                <g transform="translate(-50, -45)">
                  <rect x="0" y="0" width="150" height="38" rx="12" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1.5" filter="url(#softShadow)" />
                  <text x="75" y="16" fontSize="10" fontWeight="bold" fill="#0369a1" textAnchor="middle">
                    "Brrr! No food to eat..."
                  </text>
                  <text x="75" y="30" fontSize="10" fontWeight="bold" fill="#e11d48" textAnchor="middle">
                    Weak &amp; Sad 🥶
                  </text>
                </g>

                {/* Name Label */}
                <rect x="15" y="125" width="115" height="22" rx="11" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" filter="url(#softShadow)" />
                <text x="72" y="140" fontSize="10" fontWeight="bold" fill="#334155" textAnchor="middle">
                  🦗 Starving Grasshopper
                </text>
              </g>
            </g>
          )}
        </svg>

        {/* 🌟 Floating Hotspot Click Badges Overlay */}
        <div className="absolute inset-0 pointer-events-none p-4">
          {hotspots.map((h) => {
            const isActive = activeHotspot?.id === h.id;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => handleHotspotClick(h)}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black transition-all duration-200 shadow-md ${
                  isActive
                    ? "bg-purple-600 text-white scale-110 ring-4 ring-purple-300"
                    : "bg-white/95 text-slate-800 hover:bg-purple-50 hover:text-purple-900 hover:scale-105 border border-slate-200"
                }`}
                title={`ক্লিক করে "${h.name}" উচ্চারণ ও অর্থ শুনুন`}
              >
                <span>{h.icon}</span>
                <span className="text-[11px] font-bold">{h.name}</span>
                <span className="text-[10px] text-purple-700 bg-purple-100/80 px-1.5 py-0.2 rounded-md">
                  {h.bangla}
                </span>
                <Volume2 className="w-3 h-3 text-purple-500 shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      {/* 💡 Bottom Prompt Strip */}
      <div className="bg-white/90 backdrop-blur-xs px-4 py-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-bold text-purple-900 flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-purple-600" />
            <span>স্মার্ট হটস্পট:</span>
          </span>
          <span className="hidden sm:inline text-slate-500 font-medium">
            ছবিতে থাকা যেকোনো ব্যাজ বা চরিত্রে ট্যাপ করে সরাসরি উচ্চারণ শুনুন
          </span>
        </div>

        <span className="text-[11px] font-bold text-slate-400">
          NCTB Class 3 English • Vector Art
        </span>
      </div>
    </div>
  );
}
