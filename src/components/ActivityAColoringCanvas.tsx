"use client";

import React, { useState, useRef } from "react";
import confetti from "canvas-confetti";
import { Sparkles, RotateCcw, Palette, CheckCircle2, Paintbrush } from "lucide-react";

interface ActivityAColoringCanvasProps {
  playChime?: (type: "correct" | "click" | "fanfare") => void;
}

interface PaletteColor {
  id: string;
  name: string;
  hex: string;
  icon: string;
}

const PALETTE_COLORS: PaletteColor[] = [
  { id: "yellow", name: "সূর্যের হলুদ", hex: "#FACC15", icon: "☀️" },
  { id: "lime", name: "ঘাসফড়িং লাইম", hex: "#84CC16", icon: "🦗" },
  { id: "green", name: "শ্যামল ঘাস", hex: "#22C55E", icon: "🌾" },
  { id: "brown", name: "পিঁপড়ার বাদামী", hex: "#92400E", icon: "🐜" },
  { id: "amber", name: "ভুট্টার সোনালী", hex: "#F59E0B", icon: "🌽" },
  { id: "sky", name: "আকাশি নীল", hex: "#38BDF8", icon: "☁️" },
  { id: "pink", name: "ফুলের গোলাপী", hex: "#EC4899", icon: "🌸" },
  { id: "white", name: "মুছুন (সাদা)", hex: "#FFFFFF", icon: "🧼" },
];

const TARGET_AUTO_COLORS: Record<string, string> = {
  sky: "#E0F2FE",
  sun: "#FDE047",
  clouds: "#F8FAFC",
  hill: "#BBF7D0",
  grass: "#4ADE80",
  corn: "#F59E0B",
  ant: "#92400E",
  grasshopper: "#84CC16",
  flowers: "#F472B6",
};

export default function ActivityAColoringCanvas({ playChime }: ActivityAColoringCanvasProps) {
  const [activeColor, setActiveColor] = useState<string>("#84CC16"); // Default: Grasshopper lime
  const [coloredParts, setColoredParts] = useState<Record<string, string>>({});
  const [isAutoColoring, setIsAutoColoring] = useState<boolean>(false);
  const [activePartRipple, setActivePartRipple] = useState<string | null>(null);
  const [celebrated, setCelebrated] = useState<boolean>(false);
  const autoColorTimerRef = useRef<NodeJS.Timeout[]>([]);

  const handleColorPart = (partId: string) => {
    if (isAutoColoring) return;

    setColoredParts((prev) => {
      const next = { ...prev, [partId]: activeColor };
      
      // Trigger ripple
      setActivePartRipple(partId);
      setTimeout(() => setActivePartRipple(null), 400);

      if (playChime) {
        playChime(activeColor === "#FFFFFF" ? "click" : "click");
      }

      // Check if all primary parts are colored
      const coreParts = ["sun", "grass", "grasshopper", "ant", "corn"];
      const allCoreColored = coreParts.every((k) => next[k] && next[k] !== "#FFFFFF");

      if (allCoreColored && !celebrated) {
        setCelebrated(true);
        if (playChime) playChime("fanfare");
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      return next;
    });
  };

  const handleAutoColorMagic = () => {
    if (isAutoColoring) return;
    setIsAutoColoring(true);
    setCelebrated(false);

    // Clear existing timers
    autoColorTimerRef.current.forEach(clearTimeout);
    autoColorTimerRef.current = [];

    const sequence: { partId: string; color: string; delay: number }[] = [
      { partId: "sky", color: "#E0F2FE", delay: 100 },
      { partId: "sun", color: "#FDE047", delay: 400 },
      { partId: "clouds", color: "#F8FAFC", delay: 700 },
      { partId: "hill", color: "#BBF7D0", delay: 1000 },
      { partId: "grass", color: "#4ADE80", delay: 1300 },
      { partId: "corn", color: "#F59E0B", delay: 1600 },
      { partId: "ant", color: "#92400E", delay: 1900 },
      { partId: "grasshopper", color: "#84CC16", delay: 2200 },
      { partId: "flowers", color: "#F472B6", delay: 2500 },
    ];

    sequence.forEach(({ partId, color, delay }) => {
      const t = setTimeout(() => {
        setColoredParts((prev) => ({ ...prev, [partId]: color }));
        setActivePartRipple(partId);
        setTimeout(() => setActivePartRipple(null), 350);
        if (playChime) playChime("click");
      }, delay);
      autoColorTimerRef.current.push(t);
    });

    const finishTimer = setTimeout(() => {
      setIsAutoColoring(false);
      setCelebrated(true);
      if (playChime) playChime("fanfare");
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
      });
    }, 2800);
    autoColorTimerRef.current.push(finishTimer);
  };

  const handleReset = () => {
    autoColorTimerRef.current.forEach(clearTimeout);
    autoColorTimerRef.current = [];
    setIsAutoColoring(false);
    setColoredParts({});
    setCelebrated(false);
    if (playChime) playChime("click");
  };

  const getPartFill = (partId: string) => coloredParts[partId] || "#FFFFFF";

  return (
    <div className="rounded-3xl border border-purple-200 bg-gradient-to-br from-amber-50/70 via-white to-purple-50/70 p-3 sm:p-5 shadow-xs space-y-3">
      {/* Interactive Controls & Palette Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white/95 p-3 rounded-2xl border border-purple-100 shadow-2xs">
        {/* Color Palette Selector */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span className="text-xs font-black text-slate-700 flex items-center gap-1 mr-1 bg-purple-50 px-2.5 py-1 rounded-xl border border-purple-100">
            <Paintbrush className="w-3.5 h-3.5 text-purple-600" />
            <span>রং নির্বাচন:</span>
          </span>

          {PALETTE_COLORS.map((c) => {
            const isSelected = activeColor === c.hex;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setActiveColor(c.hex);
                  if (playChime) playChime("click");
                }}
                className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:py-1 rounded-xl text-xs font-bold transition-all duration-150 touch-manipulation active:scale-95 border min-h-[36px] min-w-[36px] sm:min-h-0 sm:min-w-0 ${
                  isSelected
                    ? "ring-2 ring-purple-500 scale-105 shadow-xs font-black border-purple-400 bg-purple-50 text-purple-900"
                    : "hover:bg-slate-50 border-slate-200/80 text-slate-700"
                }`}
                title={c.name}
              >
                <span
                  className="w-4 h-4 rounded-full border border-slate-300 shadow-2xs shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="hidden sm:inline text-[11px]">{c.name}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls: Auto-Magic & Reset */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
          <button
            type="button"
            onClick={handleAutoColorMagic}
            disabled={isAutoColoring}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs active:scale-95 ${
              isAutoColoring
                ? "bg-purple-300 text-white cursor-not-allowed animate-pulse"
                : "bg-purple-600 hover:bg-purple-700 text-white hover:shadow-md"
            }`}
            title="একটি ক্লিকে স্বয়ংক্রিয়ভাবে পুরো দৃশ্যপটে রং করার মোশন দেখো"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAutoColoring ? "রং হচ্ছে..." : "ম্যাজিক কালার মোশন"}</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-all active:scale-95"
            title="ছবিটি আবার সাদাকালো রেখাচিত্রে ফিরিয়ে নাও"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>সাদাকালো করো</span>
          </button>
        </div>
      </div>

      {/* 🖼️ Interactive SVG Coloring Stage */}
      <div className="relative rounded-2xl bg-white border border-slate-200 shadow-inner overflow-hidden flex items-center justify-center p-1 sm:p-2 touch-manipulation select-none">
        <svg
          viewBox="0 0 760 380"
          className="w-full h-auto max-h-[460px] select-none touch-manipulation"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="partShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* 1. Sky Background */}
          <rect
            x="0"
            y="0"
            width="760"
            height="380"
            rx="16"
            fill={getPartFill("sky")}
            onClick={() => handleColorPart("sky")}
            className="cursor-pointer transition-colors duration-500 hover:opacity-95"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />

          {/* 2. Clouds */}
          <g
            id="clouds"
            onClick={() => handleColorPart("clouds")}
            className="cursor-pointer transition-colors duration-500 hover:opacity-90"
            fill={getPartFill("clouds")}
            stroke="#475569"
            strokeWidth="2"
            strokeLinejoin="round"
          >
            {/* Cloud 1 */}
            <path d="M 280 75 Q 295 50 325 55 Q 350 40 375 60 Q 395 55 405 75 Q 415 95 390 100 L 290 100 Q 270 95 280 75 Z" />
            {/* Cloud 2 */}
            <path d="M 600 65 Q 615 45 640 50 Q 660 38 680 55 Q 695 50 705 68 Q 715 85 690 90 L 610 90 Q 590 85 600 65 Z" />
          </g>

          {/* 3. The Smiling Summer Sun */}
          <g
            id="sun"
            onClick={() => handleColorPart("sun")}
            className="cursor-pointer transition-all duration-500 hover:scale-105 origin-[110px_90px]"
          >
            {/* Sun Rays */}
            <g stroke="#334155" strokeWidth="3" strokeLinecap="round">
              <line x1="110" y1="35" x2="110" y2="20" />
              <line x1="110" y1="145" x2="110" y2="160" />
              <line x1="55" y1="90" x2="40" y2="90" />
              <line x1="165" y1="90" x2="180" y2="90" />
              <line x1="71" y1="51" x2="60" y2="40" />
              <line x1="149" y1="129" x2="160" y2="140" />
              <line x1="71" y1="129" x2="60" y2="140" />
              <line x1="149" y1="51" x2="160" y2="40" />
            </g>
            {/* Sun Body */}
            <circle
              cx="110"
              cy="90"
              r="38"
              fill={getPartFill("sun")}
              stroke="#334155"
              strokeWidth="3"
            />
            {/* Smiling Sun Face */}
            <ellipse cx="98" cy="84" rx="3.5" ry="4.5" fill="#1e293b" />
            <ellipse cx="122" cy="84" rx="3.5" ry="4.5" fill="#1e293b" />
            {/* Rosy Cheeks */}
            <circle cx="91" cy="94" r="3.5" fill="#fca5a5" opacity="0.6" />
            <circle cx="129" cy="94" r="3.5" fill="#fca5a5" opacity="0.6" />
            {/* Smile Curve */}
            <path
              d="M 100 97 Q 110 108 120 97"
              fill="none"
              stroke="#1e293b"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>

          {/* 4. Distant Rolling Hill */}
          <path
            id="hill"
            d="M 0 240 Q 200 170 420 215 T 760 210 L 760 300 L 0 300 Z"
            fill={getPartFill("hill")}
            onClick={() => handleColorPart("hill")}
            className="cursor-pointer transition-colors duration-500 hover:opacity-95"
            stroke="#334155"
            strokeWidth="2.5"
          />

          {/* 5. Foreground Grassy Field */}
          <g id="grass" onClick={() => handleColorPart("grass")} className="cursor-pointer">
            <path
              d="M 0 255 Q 180 220 380 255 T 760 240 L 760 380 L 0 380 Z"
              fill={getPartFill("grass")}
              className="transition-colors duration-500 hover:opacity-95"
              stroke="#1e293b"
              strokeWidth="3"
            />
            {/* Tuft of Grass Blades */}
            <path
              d="M 80 260 L 85 240 L 95 260 M 90 260 L 100 235 L 105 260 M 340 270 L 345 248 L 355 270 M 660 255 L 665 235 L 675 255"
              fill="none"
              stroke="#1e293b"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* 6. Wildflowers on Field */}
          <g
            id="flowers"
            onClick={() => handleColorPart("flowers")}
            className="cursor-pointer transition-colors duration-500"
            fill={getPartFill("flowers")}
            stroke="#1e293b"
            strokeWidth="2"
          >
            {/* Flower 1 */}
            <g transform="translate(60, 310)">
              <circle cx="0" cy="0" r="8" fill={getPartFill("flowers")} />
              <circle cx="0" cy="0" r="3" fill="#FACC15" />
              <line x1="0" y1="8" x2="0" y2="25" stroke="#1e293b" strokeWidth="2" />
            </g>
            {/* Flower 2 */}
            <g transform="translate(430, 320)">
              <circle cx="0" cy="0" r="9" fill={getPartFill("flowers")} />
              <circle cx="0" cy="0" r="3.5" fill="#FACC15" />
              <line x1="0" y1="9" x2="0" y2="28" stroke="#1e293b" strokeWidth="2" />
            </g>
            {/* Flower 3 */}
            <g transform="translate(710, 305)">
              <circle cx="0" cy="0" r="8" fill={getPartFill("flowers")} />
              <circle cx="0" cy="0" r="3" fill="#FACC15" />
              <line x1="0" y1="8" x2="0" y2="25" stroke="#1e293b" strokeWidth="2" />
            </g>
          </g>

          {/* 7. The Cheerful Grasshopper (Dancing & Singing) */}
          <g
            id="grasshopper"
            onClick={() => handleColorPart("grasshopper")}
            className="cursor-pointer transition-all duration-500 hover:scale-102 origin-[230px_230px]"
            filter="url(#partShadow)"
          >
            {/* Grasshopper Antennae */}
            <path
              d="M 215 155 Q 200 120 185 115 M 220 152 Q 215 118 208 110"
              fill="none"
              stroke="#1e293b"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Long Back Jumping Leg */}
            <path
              d="M 260 215 Q 295 160 305 180 Q 300 230 290 270 L 305 275"
              fill="none"
              stroke="#1e293b"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Front & Mid Legs */}
            <path
              d="M 210 225 L 200 255 L 190 260 M 235 230 L 235 260 L 245 265"
              fill="none"
              stroke="#1e293b"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Body / Abdomen */}
            <ellipse
              cx="255"
              cy="205"
              rx="38"
              ry="18"
              transform="rotate(15 255 205)"
              fill={getPartFill("grasshopper")}
              stroke="#1e293b"
              strokeWidth="3"
            />
            {/* Abdomen segments */}
            <line x1="265" y1="192" x2="272" y2="225" stroke="#1e293b" strokeWidth="2" />
            <line x1="278" y1="195" x2="285" y2="223" stroke="#1e293b" strokeWidth="2" />
            {/* Thorax */}
            <ellipse
              cx="225"
              cy="195"
              rx="18"
              ry="16"
              fill={getPartFill("grasshopper")}
              stroke="#1e293b"
              strokeWidth="3"
            />
            {/* Head */}
            <ellipse
              cx="205"
              cy="175"
              rx="17"
              ry="21"
              transform="rotate(-15 205 175)"
              fill={getPartFill("grasshopper")}
              stroke="#1e293b"
              strokeWidth="3"
            />
            {/* Big Cartoon Eye */}
            <circle cx="200" cy="168" r="6" fill="#FFFFFF" stroke="#1e293b" strokeWidth="2" />
            <circle cx="198" cy="168" r="3" fill="#1e293b" />
            {/* Big Singing Smile */}
            <path
              d="M 194 184 Q 202 194 212 186"
              fill="#FFFFFF"
              stroke="#1e293b"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Singing Musical Notes */}
            <g fill="#9333ea" stroke="#9333ea">
              <path d="M 170 145 q 5 -12 12 -5 v 18 a 3 3 0 1 1 -3 -3 h 3 v -10 z" />
              <path d="M 150 160 q 4 -10 10 -4 v 15 a 2.5 2.5 0 1 1 -2.5 -2.5 h 2.5 v -8 z" />
            </g>
            <text x="210" y="295" textAnchor="middle" className="text-[12px] font-bold fill-slate-700">
              Grasshopper
            </text>
          </g>

          {/* 8. The Hardworking Ant Carrying Corn */}
          <g
            id="ant"
            onClick={() => handleColorPart("ant")}
            className="cursor-pointer transition-all duration-500 hover:scale-102 origin-[540px_230px]"
            filter="url(#partShadow)"
          >
            {/* Ant Antennae */}
            <path
              d="M 525 195 Q 520 170 510 165 M 530 193 Q 530 168 522 160"
              fill="none"
              stroke="#1e293b"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Ant Walking Legs */}
            <path
              d="M 545 240 L 535 270 L 525 273 M 555 240 L 555 272 L 565 275 M 575 238 L 585 270 L 595 272"
              fill="none"
              stroke="#1e293b"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 3 Body Segments */}
            {/* Abdomen (Back) */}
            <ellipse
              cx="585"
              cy="222"
              rx="24"
              ry="18"
              fill={getPartFill("ant")}
              stroke="#1e293b"
              strokeWidth="3"
            />
            {/* Thorax (Middle) */}
            <ellipse
              cx="555"
              cy="225"
              rx="15"
              ry="13"
              fill={getPartFill("ant")}
              stroke="#1e293b"
              strokeWidth="3"
            />
            {/* Head (Front) */}
            <ellipse
              cx="530"
              cy="210"
              rx="16"
              ry="18"
              fill={getPartFill("ant")}
              stroke="#1e293b"
              strokeWidth="3"
            />
            {/* Smiling Ant Eye */}
            <circle cx="524" cy="204" r="4.5" fill="#FFFFFF" stroke="#1e293b" strokeWidth="1.5" />
            <circle cx="522" cy="204" r="2.2" fill="#1e293b" />
            {/* Determined Smile */}
            <path
              d="M 522 216 Q 528 222 534 216"
              fill="none"
              stroke="#1e293b"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text x="560" y="295" textAnchor="middle" className="text-[12px] font-bold fill-slate-700">
              Ant
            </text>
          </g>

          {/* 9. The Ear of Corn (Carried by Ant) */}
          <g
            id="corn"
            onClick={() => handleColorPart("corn")}
            className="cursor-pointer transition-all duration-500 hover:scale-105 origin-[555px_175px]"
          >
            {/* Corn Kernels Body */}
            <ellipse
              cx="555"
              cy="175"
              rx="32"
              ry="15"
              transform="rotate(-25 555 175)"
              fill={getPartFill("corn")}
              stroke="#1e293b"
              strokeWidth="3"
            />
            {/* Kernel Grid Lines */}
            <path
              d="M 535 180 L 575 160 M 542 188 L 582 170"
              stroke="#1e293b"
              strokeWidth="1.5"
              opacity="0.7"
            />
            {/* Green Husk / Leaves Wrapping */}
            <path
              d="M 520 185 Q 535 200 550 190 Q 535 180 520 185 Z"
              fill="#22C55E"
              stroke="#1e293b"
              strokeWidth="2"
            />
            <path
              d="M 515 178 Q 530 170 545 175 Q 525 165 515 178 Z"
              fill="#16A34A"
              stroke="#1e293b"
              strokeWidth="2"
            />
          </g>
        </svg>

        {/* Floating Success Pill when all colored */}
        {celebrated && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-emerald-600 text-white font-black text-xs shadow-md border border-emerald-400 flex items-center gap-1.5 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>অসাধারণ! সম্পূর্ণ ছবিতে রং করা সম্পন্ন হয়েছে! 🎉</span>
          </div>
        )}
      </div>
    </div>
  );
}
