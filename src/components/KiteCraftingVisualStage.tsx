"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Wind, Play, Check, RotateCcw, Volume2, Palette, ShieldCheck } from "lucide-react";

interface KiteCraftingVisualStageProps {
  slideId: number;
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

type KiteColor = "crimson" | "gold" | "sky" | "emerald" | "purple";

export default function KiteCraftingVisualStage({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}: KiteCraftingVisualStageProps) {
  // Step 1: Paper, 2: Straight Stick, 3: Arc Stick, 4: Glue & Tape, 5: String & Tail, 6: Flying in Sky!
  const [activeStep, setActiveStep] = useState<number>(() => {
    if (slideId === 1) return 6; // Fly preview
    if (slideId === 3) return 2; // Step 1-2
    if (slideId === 4) return 4; // Mid-assembly
    return 6; // Full studio by default for slide 5
  });

  const [kiteColor, setKiteColor] = useState<KiteColor>("crimson");
  const [isFlyingMode, setIsFlyingMode] = useState<boolean>(slideId === 1 || activeStep === 6);
  const [activeHotspot, setActiveHotspot] = useState<HotspotItem | null>(null);
  const [windGustActive, setWindGustActive] = useState<boolean>(false);

  // Sync step with slide changes
  useEffect(() => {
    if (slideId === 1) {
      setActiveStep(6);
      setIsFlyingMode(true);
    } else if (slideId === 3) {
      setActiveStep(3);
      setIsFlyingMode(false);
    } else if (slideId === 4) {
      setActiveStep(5);
      setIsFlyingMode(false);
    } else if (slideId === 5) {
      setActiveStep(6);
      setIsFlyingMode(true);
    }
  }, [slideId]);

  const handleStepSelect = (step: number) => {
    setActiveStep(step);
    if (playChime) playChime("click");
    if (step === 6) {
      setIsFlyingMode(true);
      if (playChime) playChime("fanfare");
      handleSpeak("Now your kite is ready to fly in the windy sky!");
    } else {
      setIsFlyingMode(false);
      const stepVoices: Record<number, string> = {
        1: "First, take a square piece of thin coloured paper.",
        2: "Next, place one bamboo stick straight down the middle.",
        3: "Bend the second stick into an arc across the paper.",
        4: "Fasten the sticks securely with strong glue and tape.",
        5: "Tie a long piece of light string and attach colourful paper ribbons for the tail.",
      };
      if (stepVoices[step]) handleSpeak(stepVoices[step]);
    }
  };

  const triggerWindGust = () => {
    setWindGustActive(true);
    if (playChime) playChime("click");
    handleSpeak("Whoosh! Feel the strong breeze lifting the kite higher!");
    setTimeout(() => setWindGustActive(false), 2500);
  };

  const handleHotspotClick = (item: HotspotItem) => {
    setActiveHotspot(item);
    if (playChime) playChime("click");
    handleSpeak(`${item.name}. ${item.bangla}`);
    setTimeout(() => setActiveHotspot(null), 3000);
  };

  const hotspots: HotspotItem[] = isFlyingMode
    ? [
        { id: "wind", name: "Windy Sky", bangla: "দমকা বাতাসযুক্ত আকাশ", x: 82, y: 18, icon: "💨" },
        { id: "kite", name: "Paper Kite", bangla: "উড়ন্ত কাগজের ঘুড়ি", x: 48, y: 35, icon: "🪁" },
        { id: "string", name: "Flying String", bangla: "উড্ডয়ন সুতা ও লাটাই", x: 62, y: 78, icon: "🧵" },
        { id: "ribbons", name: "Tail Ribbons", bangla: "রঙিন ফিতার লেজ", x: 38, y: 62, icon: "🎀" },
      ]
    : [
        { id: "paper", name: "Square Coloured Paper", bangla: "চারকোনা পাতলা রঙিন কাগজ", x: 32, y: 48, icon: "📄" },
        { id: "straight", name: "Straight Bamboo Stick", bangla: "সোজা বাঁশের কাঠি", x: 50, y: 22, icon: "🎋" },
        { id: "arc", name: "Bent Bamboo Arc", bangla: "ধনুকাকৃতি বাঁকানো কাঠি", x: 68, y: 44, icon: "🏹" },
        { id: "tape", name: "Glue and Tape", bangla: "শক্ত আঠা ও টেপ", x: 50, y: 52, icon: "🧷" },
        { id: "tail", name: "Ribbon Tail", bangla: "রঙিন ফিতার লেজ", x: 50, y: 88, icon: "🎀" },
      ];

  // Color map configs
  const colorSchemes = {
    crimson: {
      name: "লাল (Crimson)",
      grad1: "#ef4444",
      grad2: "#dc2626",
      accent: "#fca5a5",
      tail1: "#f59e0b",
      tail2: "#3b82f6",
      border: "border-red-500",
      bgBtn: "bg-red-500",
    },
    gold: {
      name: "হলুদ (Gold)",
      grad1: "#fbbf24",
      grad2: "#f59e0b",
      accent: "#fde68a",
      tail1: "#ef4444",
      tail2: "#8b5cf6",
      border: "border-amber-500",
      bgBtn: "bg-amber-500",
    },
    sky: {
      name: "আকাশি (Sky Blue)",
      grad1: "#38bdf8",
      grad2: "#0284c7",
      accent: "#bae6fd",
      tail1: "#f59e0b",
      tail2: "#ec4899",
      border: "border-sky-500",
      bgBtn: "bg-sky-500",
    },
    emerald: {
      name: "সবুজ (Emerald)",
      grad1: "#34d399",
      grad2: "#059669",
      accent: "#a7f3d0",
      tail1: "#ef4444",
      tail2: "#f59e0b",
      border: "border-emerald-500",
      bgBtn: "bg-emerald-500",
    },
    purple: {
      name: "বেগুনী (Purple)",
      grad1: "#a78bfa",
      grad2: "#7c3aed",
      accent: "#ddd6fe",
      tail1: "#fbbf24",
      tail2: "#06b6d4",
      border: "border-purple-500",
      bgBtn: "bg-purple-500",
    },
  };

  const curColor = colorSchemes[kiteColor];

  return (
    <div
      className={`rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden relative transition-all duration-300 select-none flex flex-col ${
        isFullTheater ? "min-h-[460px] md:min-h-[520px]" : "min-h-[380px] md:min-h-[420px]"
      } ${
        isFlyingMode
          ? "bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-100"
          : "bg-gradient-to-b from-amber-50/90 via-orange-50/50 to-slate-100"
      }`}
    >
      {/* 🏷️ Top Interactive Bar: Steps & Mode */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none">
        {/* Step Selector Pills */}
        <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-2xs pointer-events-auto overflow-x-auto max-w-full">
          {[
            { step: 1, label: "১. কাগজ", icon: "📄" },
            { step: 2, label: "২. সোজা কাঠি", icon: "🎋" },
            { step: 3, label: "৩. বাঁকা কাঠি", icon: "🏹" },
            { step: 4, label: "৪. আঠা ও টেপ", icon: "🧷" },
            { step: 5, label: "৫. সুতা ও লেজ", icon: "🎀" },
            { step: 6, label: "🚀 ৬. ওড়াও!", icon: "🪁" },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => handleStepSelect(item.step)}
              className={`px-2 py-1 rounded-xl text-[10px] sm:text-[11px] font-black transition-all flex items-center gap-1 shrink-0 ${
                activeStep === item.step
                  ? "bg-sky-600 text-white shadow-xs scale-102"
                  : "bg-slate-100/80 text-slate-700 hover:bg-slate-200/80"
              }`}
            >
              <span>{item.icon}</span>
              <span className="hidden xs:inline">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Action Controls & Color Swatches */}
        <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-2xs pointer-events-auto">
          {/* Color Chooser */}
          <div className="flex items-center gap-1 px-1 border-r border-slate-200">
            <Palette className="w-3.5 h-3.5 text-slate-500" />
            {(Object.keys(colorSchemes) as KiteColor[]).map((cKey) => (
              <button
                key={cKey}
                onClick={() => {
                  setKiteColor(cKey);
                  if (playChime) playChime("click");
                }}
                className={`w-4 h-4 rounded-full transition-transform ${colorSchemes[cKey].bgBtn} ${
                  kiteColor === cKey ? "ring-2 ring-slate-900 ring-offset-1 scale-110" : "opacity-80 hover:opacity-100"
                }`}
                title={colorSchemes[cKey].name}
              />
            ))}
          </div>

          {/* Wind Gust button in flying mode */}
          {isFlyingMode ? (
            <button
              onClick={triggerWindGust}
              className={`px-2 py-0.5 rounded-xl text-[10px] font-black flex items-center gap-1 transition-all ${
                windGustActive
                  ? "bg-sky-700 text-white scale-105"
                  : "bg-sky-100 text-sky-800 hover:bg-sky-200"
              }`}
            >
              <Wind className={`w-3 h-3 ${windGustActive ? "animate-spin" : ""}`} />
              <span>দমকা হাওয়া!</span>
            </button>
          ) : (
            <button
              onClick={() => handleStepSelect(6)}
              className="px-2 py-0.5 rounded-xl text-[10px] font-black bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1 shadow-2xs"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>আকাশে ওড়াও</span>
            </button>
          )}
        </div>
      </div>

      {/* 🖼️ SVG STAGE CANVAS */}
      <div className="flex-1 w-full h-full relative flex items-center justify-center p-2 pt-11">
        <svg
          viewBox="0 0 800 480"
          className="w-full h-full max-h-[500px] object-contain drop-shadow-xs"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft Shadow */}
            <filter id="kiteShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="3" dy="10" stdDeviation="8" floodOpacity="0.22" />
            </filter>

            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Kite Gradient */}
            <linearGradient id="kiteBodyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={curColor.grad1} />
              <stop offset="100%" stopColor={curColor.grad2} />
            </linearGradient>

            <linearGradient id="kiteFacetLeft" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="bambooGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d4a373" />
              <stop offset="50%" stopColor="#faedcd" />
              <stop offset="100%" stopColor="#bc6c25" />
            </linearGradient>

            <linearGradient id="woodTableGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="50%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#fcd34d" />
            </linearGradient>

            {/* Sun Rays for Sky */}
            <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#fde047" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ========================================================= */}
          {/* MODE A: FLYING IN WINDY SKY (Step 6 / Slide 1) */}
          {/* ========================================================= */}
          {isFlyingMode ? (
            <g id="windySkyScene">
              {/* Sun & Radiant Glow */}
              <circle cx="700" cy="80" r="110" fill="url(#sunGlow)" />
              <circle cx="700" cy="80" r="45" fill="#facc15" />

              {/* Drifting Clouds */}
              <g className="animate-pulse" opacity="0.85">
                {/* Cloud 1 */}
                <path
                  d="M 60,110 Q 75,80 110,85 Q 140,75 160,95 Q 190,95 195,120 Q 200,145 170,145 L 75,145 Q 50,140 60,110 Z"
                  fill="#ffffff"
                  filter="url(#kiteShadow)"
                />
                {/* Cloud 2 */}
                <path
                  d="M 520,60 Q 535,35 565,40 Q 590,30 610,50 Q 635,50 640,70 Q 645,95 620,95 L 535,95 Q 515,90 520,60 Z"
                  fill="#ffffff"
                  opacity="0.9"
                />
                {/* Cloud 3 */}
                <path
                  d="M 280,180 Q 295,160 320,165 Q 340,155 355,170 Q 375,170 380,185 L 290,185 Z"
                  fill="#ffffff"
                  opacity="0.6"
                />
              </g>

              {/* Distant Birds */}
              <g stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6">
                <path d="M 120,60 Q 130,50 140,60 Q 150,50 160,60" />
                <path d="M 210,80 Q 218,72 226,80 Q 234,72 242,80" />
                <path d="M 175,100 Q 181,94 187,100 Q 193,94 199,100" />
              </g>

              {/* Wind Flow Swooshes */}
              <g
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeDasharray="12,12"
                fill="none"
                opacity={windGustActive ? 0.9 : 0.4}
                className={windGustActive ? "animate-pulse" : ""}
              >
                <path d="M 20,240 C 150,220 280,260 420,230 C 560,200 680,240 780,220" />
                <path d="M 80,160 C 220,140 340,180 500,150 C 620,130 710,160 780,140" />
                <path d="M 40,320 C 180,300 310,340 450,310 C 600,280 720,320 780,300" />
              </g>

              {/* Village Ground & Greenery at Bottom */}
              <path
                d="M 0,430 Q 200,410 400,435 Q 600,420 800,430 L 800,480 L 0,480 Z"
                fill="#22c55e"
              />
              <path
                d="M 0,445 Q 250,435 500,450 Q 700,440 800,445 L 800,480 L 0,480 Z"
                fill="#16a34a"
              />

              {/* Distant Palm / Coconut Trees on Left Horizon */}
              <g transform="translate(40, 390)">
                <path d="M 20,40 Q 25,10 30,-20" stroke="#78350f" strokeWidth="4" fill="none" />
                <circle cx="30" cy="-22" r="14" fill="#15803d" />
                <circle cx="20" cy="-28" r="12" fill="#16a34a" />
                <circle cx="42" cy="-24" r="11" fill="#15803d" />
              </g>
              <g transform="translate(100, 400)">
                <path d="M 15,30 Q 18,5 20,-15" stroke="#78350f" strokeWidth="3" fill="none" />
                <circle cx="20" cy="-16" r="11" fill="#15803d" />
                <circle cx="12" cy="-20" r="9" fill="#16a34a" />
                <circle cx="28" cy="-18" r="9" fill="#15803d" />
              </g>

              {/* School Child Flying the Kite at Bottom Right */}
              <g transform="translate(680, 370)">
                {/* Child Body */}
                <ellipse cx="20" cy="55" rx="12" ry="18" fill="#3b82f6" />
                {/* Head */}
                <circle cx="20" cy="24" r="11" fill="#fed7aa" />
                {/* Hair */}
                <path d="M 10,22 Q 20,12 30,22 Q 28,14 18,14 Z" fill="#1e293b" />
                {/* Happy Face */}
                <circle cx="17" cy="23" r="1.5" fill="#1e293b" />
                <circle cx="23" cy="23" r="1.5" fill="#1e293b" />
                <path d="M 17,28 Q 20,31 23,28" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                {/* Arm holding string spool */}
                <path d="M 12,45 L -8,35" stroke="#fed7aa" strokeWidth="4" strokeLinecap="round" />
                <path d="M 28,45 L 8,38" stroke="#fed7aa" strokeWidth="4" strokeLinecap="round" />
                {/* Wooden Spool (লাটাই) */}
                <rect x="-16" y="28" width="12" height="14" rx="2" fill="#d97706" />
                <rect x="-14" y="31" width="8" height="8" rx="1" fill="#ef4444" />
                <line x1="-10" y1="22" x2="-10" y2="48" stroke="#78350f" strokeWidth="2.5" />
              </g>

              {/* Long Flying String from Spool to Kite */}
              <path
                d={
                  windGustActive
                    ? "M 670,402 C 610,360 520,300 440,215"
                    : "M 670,402 C 580,380 490,290 440,215"
                }
                stroke="#ffffff"
                strokeWidth="2"
                strokeDasharray="4,2"
                fill="none"
                opacity="0.9"
              />

              {/* MAIN SOARING KITE (With wind angle & flutter) */}
              <g
                transform={`translate(390, 140) rotate(${windGustActive ? "-18" : "-8"})`}
                className="transition-transform duration-700 ease-out"
                filter="url(#kiteShadow)"
              >
                {/* Kite Diamond Body */}
                <polygon
                  points="50,-80 120,25 50,110 -20,25"
                  fill="url(#kiteBodyGrad)"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />

                {/* Left Shading Facet for 3D crispness */}
                <polygon
                  points="50,-80 50,110 -20,25"
                  fill="url(#kiteFacetLeft)"
                />

                {/* Festive Contrast Corner Patches (Traditional Bangladeshi Rokomari Kite) */}
                <polygon points="50,-80 30,-50 70,-50" fill={curColor.accent} opacity="0.9" />
                <polygon points="-20,25 0,10 0,40" fill={curColor.accent} opacity="0.9" />
                <polygon points="120,25 100,10 100,40" fill={curColor.accent} opacity="0.9" />
                <polygon points="50,110 32,85 68,85" fill={curColor.accent} opacity="0.9" />

                {/* Straight Bamboo Spine */}
                <line
                  x1="50"
                  y1="-82"
                  x2="50"
                  y2="112"
                  stroke="url(#bambooGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* Bent Bamboo Arc */}
                <path
                  d="M -22,25 Q 50,-10 122,25"
                  stroke="url(#bambooGrad)"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Center Tape Joint */}
                <rect x="44" y="6" width="12" height="12" rx="2" fill="#ffffff" opacity="0.75" />

                {/* Bridle loop */}
                <path d="M 50,-30 L 40,35 L 50,90" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.8" />

                {/* Swaying Ribbon Tail */}
                <g>
                  {/* Tail String */}
                  <path
                    d={
                      windGustActive
                        ? "M 50,110 C 20,150 90,190 30,230 C -10,270 70,300 20,340"
                        : "M 50,110 C 35,140 75,175 40,210 C 10,245 60,280 35,315"
                    }
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    fill="none"
                  />

                  {/* Ribbon 1 */}
                  <g transform="translate(42, 135) rotate(-15)">
                    <polygon points="0,0 -8,-8 -8,8" fill={curColor.tail1} />
                    <polygon points="0,0 8,-8 8,8" fill={curColor.tail1} />
                    <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
                  </g>

                  {/* Ribbon 2 */}
                  <g transform="translate(62, 180) rotate(25)">
                    <polygon points="0,0 -8,-8 -8,8" fill={curColor.tail2} />
                    <polygon points="0,0 8,-8 8,8" fill={curColor.tail2} />
                    <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
                  </g>

                  {/* Ribbon 3 */}
                  <g transform="translate(32, 230) rotate(-20)">
                    <polygon points="0,0 -8,-8 -8,8" fill={curColor.tail1} />
                    <polygon points="0,0 8,-8 8,8" fill={curColor.tail1} />
                    <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
                  </g>

                  {/* Ribbon 4 */}
                  <g transform="translate(50, 280) rotate(20)">
                    <polygon points="0,0 -8,-8 -8,8" fill={curColor.tail2} />
                    <polygon points="0,0 8,-8 8,8" fill={curColor.tail2} />
                    <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
                  </g>

                  {/* Ribbon 5 (End tassel) */}
                  <g transform="translate(32, 325) rotate(-10)">
                    <polygon points="0,0 -10,-10 -10,10" fill="#ec4899" />
                    <polygon points="0,0 10,-10 10,10" fill="#ec4899" />
                    <circle cx="0" cy="0" r="3" fill="#ffffff" />
                  </g>
                </g>
              </g>

              {/* Cheerful Second Distant Kite */}
              <g transform="translate(180, 160) scale(0.4) rotate(15)" opacity="0.75">
                <polygon points="50,-80 120,25 50,110 -20,25" fill="#eab308" stroke="#ffffff" strokeWidth="3" />
                <line x1="50" y1="-80" x2="50" y2="110" stroke="#78350f" strokeWidth="5" />
                <path d="M 50,110 C 20,150 70,180 40,220" stroke="#ffffff" strokeWidth="4" fill="none" />
              </g>
            </g>
          ) : (
            /* ========================================================= */
            /* MODE B: WORKBENCH CRAFTING STUDIO (Steps 1 to 5) */
            /* ========================================================= */
            <g id="craftingWorkbenchScene">
              {/* Wooden Crafting Mat Background */}
              <rect x="50" y="20" width="700" height="440" rx="32" fill="url(#woodTableGrad)" stroke="#d97706" strokeWidth="3" />
              <rect x="70" y="40" width="660" height="400" rx="24" fill="#fffbeb" stroke="#fcd34d" strokeWidth="2" strokeDasharray="8,8" />

              {/* Grid Marks / Cutting Ruler Guidelines */}
              <g stroke="#fde68a" strokeWidth="1" opacity="0.6">
                {[100, 150, 200, 250, 300, 350, 400].map((y) => (
                  <line key={`grid-h-${y}`} x1="80" y1={y} x2="720" y2={y} />
                ))}
                {[150, 220, 290, 360, 440, 510, 580, 650].map((x) => (
                  <line key={`grid-v-${x}`} x1={x} y1="50" x2={x} y2="430" />
                ))}
              </g>

              {/* Step 1: The Square Sheet of Paper */}
              {activeStep >= 1 && (
                <g filter="url(#kiteShadow)">
                  {/* Square rotated 45 deg (Diamond) */}
                  <polygon
                    points="400,60 550,210 400,360 250,210"
                    fill="url(#kiteBodyGrad)"
                    stroke="#ffffff"
                    strokeWidth="3"
                  />

                  {/* Left Facet Highlight */}
                  <polygon
                    points="400,60 400,360 250,210"
                    fill="url(#kiteFacetLeft)"
                  />

                  {/* Center vertical fold crease guide */}
                  <line
                    x1="400"
                    y1="60"
                    x2="400"
                    y2="360"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                    opacity="0.6"
                  />

                  {/* Dimension / Angle badges for teachers */}
                  <text x="400" y="215" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" opacity="0.85">
                    Square Thin Coloured Paper
                  </text>
                  <text x="400" y="235" fill="#ffffff" fontSize="11" textAnchor="middle" opacity="0.8">
                    (পাতলা বর্গাকার রঙিন কাগজ)
                  </text>
                </g>
              )}

              {/* Step 2: Straight Bamboo Stick */}
              {activeStep >= 2 && (
                <g filter="url(#kiteShadow)">
                  {/* The Straight Bamboo Spine */}
                  <line
                    x1="400"
                    y1="55"
                    x2="400"
                    y2="365"
                    stroke="url(#bambooGrad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  {/* Bamboo nodes / markings */}
                  {[120, 180, 240, 300].map((nodeY) => (
                    <circle key={`node-${nodeY}`} cx="400" cy={nodeY} r="4" fill="#9a3412" opacity="0.7" />
                  ))}
                  {/* Label Pill */}
                  <g transform="translate(415, 110)">
                    <rect x="0" y="-12" width="145" height="24" rx="12" fill="#ffffff" stroke="#d97706" strokeWidth="1.5" />
                    <text x="12" y="4" fill="#92400e" fontSize="10" fontWeight="bold">
                      ১ম সোজা বাঁশের কাঠি 🎋
                    </text>
                  </g>
                </g>
              )}

              {/* Step 3: Bent Bamboo Arc Stick */}
              {activeStep >= 3 && (
                <g filter="url(#kiteShadow)">
                  {/* The Bow Arc */}
                  <path
                    d="M 246,210 Q 400,145 554,210"
                    stroke="url(#bambooGrad)"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Arc nodes */}
                  <circle cx="310" cy="182" r="3.5" fill="#9a3412" opacity="0.7" />
                  <circle cx="490" cy="182" r="3.5" fill="#9a3412" opacity="0.7" />

                  {/* Label Pill */}
                  <g transform="translate(480, 155)">
                    <rect x="0" y="-12" width="150" height="24" rx="12" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
                    <text x="12" y="4" fill="#0369a1" fontSize="10" fontWeight="bold">
                      ২য় বাঁকানো কাঠি (Arc) 🏹
                    </text>
                  </g>
                </g>
              )}

              {/* Step 4: Glue & Tape Patches */}
              {activeStep >= 4 && (
                <g>
                  {/* Top corner tape */}
                  <rect x="392" y="52" width="16" height="18" rx="2" fill="#ffffff" opacity="0.85" stroke="#94a3b8" strokeWidth="1" />
                  {/* Bottom corner tape */}
                  <rect x="392" y="350" width="16" height="18" rx="2" fill="#ffffff" opacity="0.85" stroke="#94a3b8" strokeWidth="1" />
                  {/* Left wing tape */}
                  <rect x="240" y="202" width="18" height="16" rx="2" fill="#ffffff" opacity="0.85" stroke="#94a3b8" strokeWidth="1" />
                  {/* Right wing tape */}
                  <rect x="542" y="202" width="18" height="16" rx="2" fill="#ffffff" opacity="0.85" stroke="#94a3b8" strokeWidth="1" />
                  {/* Center Intersection Tape & Cross binding */}
                  <rect x="390" y="170" width="20" height="20" rx="3" fill="#ffffff" opacity="0.85" stroke="#059669" strokeWidth="1.5" />
                  <line x1="390" y1="170" x2="410" y2="190" stroke="#059669" strokeWidth="1.5" />
                  <line x1="410" y1="170" x2="390" y2="190" stroke="#059669" strokeWidth="1.5" />

                  {/* Tape label */}
                  <g transform="translate(230, 260)">
                    <rect x="0" y="-12" width="155" height="24" rx="12" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
                    <text x="10" y="4" fill="#065f46" fontSize="10" fontWeight="bold">
                      আঠা ও টেপ দিয়ে আটকানো 🧷
                    </text>
                  </g>
                </g>
              )}

              {/* Step 5: Light String & Tail Ribbons */}
              {activeStep >= 5 && (
                <g filter="url(#kiteShadow)">
                  {/* String Bridle */}
                  <line x1="400" y1="110" x2="365" y2="230" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="3,2" />
                  <line x1="400" y1="310" x2="365" y2="230" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="3,2" />
                  <circle cx="365" cy="230" r="4" fill="#ef4444" />

                  {/* Big Tail with Ribbons at Bottom */}
                  <path
                    d="M 400,365 C 380,395 430,415 390,445"
                    stroke="#1e293b"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Bowtie Ribbons along tail */}
                  <g transform="translate(390, 390) rotate(-15)">
                    <polygon points="0,0 -10,-8 -10,8" fill={curColor.tail1} />
                    <polygon points="0,0 10,-8 10,8" fill={curColor.tail1} />
                    <circle cx="0" cy="0" r="3" fill="#ffffff" />
                  </g>

                  <g transform="translate(415, 415) rotate(20)">
                    <polygon points="0,0 -10,-8 -10,8" fill={curColor.tail2} />
                    <polygon points="0,0 10,-8 10,8" fill={curColor.tail2} />
                    <circle cx="0" cy="0" r="3" fill="#ffffff" />
                  </g>

                  <g transform="translate(390, 442) rotate(-10)">
                    <polygon points="0,0 -10,-8 -10,8" fill="#ec4899" />
                    <polygon points="0,0 10,-8 10,8" fill="#ec4899" />
                    <circle cx="0" cy="0" r="3" fill="#ffffff" />
                  </g>

                  {/* Label for Tail */}
                  <g transform="translate(435, 420)">
                    <rect x="0" y="-12" width="135" height="24" rx="12" fill="#fdf2f8" stroke="#db2777" strokeWidth="1.5" />
                    <text x="10" y="4" fill="#9d174d" fontSize="10" fontWeight="bold">
                      রঙিন ফিতার লেজ 🎀
                    </text>
                  </g>
                </g>
              )}

              {/* Tools on the Table */}
              <g transform="translate(110, 340)">
                {/* Scissors */}
                <path d="M 10,10 L 35,35 M 10,35 L 35,10" stroke="#64748b" strokeWidth="3" />
                <circle cx="10" cy="10" r="6" stroke="#64748b" strokeWidth="2" fill="none" />
                <circle cx="10" cy="35" r="6" stroke="#64748b" strokeWidth="2" fill="none" />
                <text x="45" y="26" fill="#64748b" fontSize="10" fontWeight="bold">Scissors ✂️</text>
              </g>

              <g transform="translate(100, 100)">
                {/* Glue Bottle */}
                <rect x="15" y="20" width="22" height="36" rx="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                <rect x="21" y="10" width="10" height="10" rx="1" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
                <text x="45" y="42" fill="#0369a1" fontSize="10" fontWeight="bold">Glue 🧴</text>
              </g>
            </g>
          )}

          {/* ========================================================= */}
          {/* INTERACTIVE HOTSPOTS OVERLAY */}
          {/* ========================================================= */}
          {hotspots.map((hs) => (
            <g
              key={hs.id}
              transform={`translate(${(hs.x / 100) * 800}, ${(hs.y / 100) * 480})`}
              className="cursor-pointer group"
              onClick={() => handleHotspotClick(hs)}
            >
              {/* Outer pulsing ring */}
              <circle cx="0" cy="0" r="16" fill="#38bdf8" opacity="0.3" className="animate-ping" />
              {/* Hotspot core button */}
              <circle
                cx="0"
                cy="0"
                r="13"
                fill="#ffffff"
                stroke="#0284c7"
                strokeWidth="2.5"
                filter="url(#kiteShadow)"
                className="group-hover:scale-125 transition-transform"
              />
              <text x="0" y="4" fontSize="11" textAnchor="middle">
                {hs.icon}
              </text>
            </g>
          ))}
        </svg>

        {/* 💬 Active Hotspot Card Popup */}
        {activeHotspot && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-4 py-2.5 rounded-2xl bg-slate-900/95 text-white shadow-xl border border-sky-400 flex items-center gap-3 animate-scale-up">
            <span className="text-xl p-1.5 rounded-xl bg-white/10">{activeHotspot.icon}</span>
            <div>
              <p className="text-sm font-black text-sky-300 flex items-center gap-1.5">
                <span>{activeHotspot.name}</span>
                <Volume2 className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              </p>
              <p className="text-xs text-slate-200 font-semibold">{activeHotspot.bangla}</p>
            </div>
          </div>
        )}
      </div>

      {/* 🧭 Bottom Status Ribbon */}
      <div className="p-2 sm:p-2.5 bg-white/95 border-t border-slate-200/80 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          <span>
            {isFlyingMode
              ? "💨 উড্ডয়ন মোড: বাতাস ও ঘুড়ির গতি পর্যবেক্ষণ করুন"
              : `🛠️ তৈরি ধাপ ${activeStep}/৫: ${
                  activeStep === 1
                    ? "চারকোনা রঙিন কাগজ"
                    : activeStep === 2
                    ? "মাঝখানে সোজা বাঁশের কাঠি"
                    : activeStep === 3
                    ? "আড়াআড়ি ধনুকাকৃতি কাঠি"
                    : activeStep === 4
                    ? "আঠা ও টেপ দিয়ে দৃঢ়করণ"
                    : "সুতা বাঁধা ও লেজের ফিতা"
                }`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!isFlyingMode && (
            <button
              onClick={() => handleStepSelect(Math.min(activeStep + 1, 6))}
              className="px-2.5 py-1 rounded-xl text-xs font-black bg-sky-600 text-white hover:bg-sky-700 active:scale-95 transition-all shadow-2xs"
            >
              পরবর্তী ধাপ ➔
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
