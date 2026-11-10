"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Volume2, Droplets, ShieldCheck, Check, RotateCcw, HeartPulse, Sparkle } from "lucide-react";

interface HandwashingVisualStageProps {
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

export default function HandwashingVisualStage({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}: HandwashingVisualStageProps) {
  // Step 1: Water & Soap, 2: Palms, 3: Back of hands, 4: Between fingers, 5: Thumbs, 6: Fingertips & Wrists
  const [activeStep, setActiveStep] = useState<number>(() => {
    if (slideId === 1) return 1;
    if (slideId === 3) return 2;
    if (slideId === 4) return 4;
    return 6; // full by default on slide 5
  });

  const [isWaterRunning, setIsWaterRunning] = useState<boolean>(true);
  const [hasSoap, setHasSoap] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<HotspotItem | null>(null);
  const [germsAlive, setGermsAlive] = useState<boolean>(false);

  // Sync step with slideId
  useEffect(() => {
    if (slideId === 1) {
      setActiveStep(1);
      setGermsAlive(true);
    } else if (slideId === 3) {
      setActiveStep(2);
      setGermsAlive(false);
    } else if (slideId === 4) {
      setActiveStep(4);
      setGermsAlive(false);
    } else if (slideId === 5) {
      setActiveStep(6);
      setGermsAlive(false);
    }
  }, [slideId]);

  const stepDescriptions: Record<number, { title: string; bangla: string; speech: string }> = {
    1: {
      title: "Step 1: Wet hands & apply soap",
      bangla: "প্রথমে পরিষ্কার পানিতে হাত ভিজিয়ে সাবান লাগাও",
      speech: "First, wet your hands with clean running water and apply soap.",
    },
    2: {
      title: "Step 2: Rub palms together",
      bangla: "দ্বিতীয়ত, দুই হাতের তালু একসাথে ঘষে ফেনা তৈরি করো",
      speech: "Second, rub your palms together to make rich soap lather.",
    },
    3: {
      title: "Step 3: Rub the back of both hands",
      bangla: "তৃতীয়ত, এক হাত দিয়ে অন্য হাতের উল্টো পিঠ ভালো করে ঘষো",
      speech: "Third, rub the back of both hands thoroughly.",
    },
    4: {
      title: "Step 4: Clean between your fingers",
      bangla: "চতুর্থত, দুই হাতের আঙুলের ফাঁকে ফাঁকে পরিষ্কার করো",
      speech: "Fourth, clean between your fingers with soap.",
    },
    5: {
      title: "Step 5: Rub around your thumbs",
      bangla: "পঞ্চমত, দুই হাতের বুড়ো আঙুল ঘুরিয়ে ঘুরিয়ে ঘষো",
      speech: "Fifth, rub around both of your thumbs.",
    },
    6: {
      title: "Step 6: Fingertips and wrists",
      bangla: "ষষ্ঠত, হাতের তালুতে নখের ডগা ঘষো এবং কবজি ধুয়ে নাও",
      speech: "Sixth, rub your fingertips on the palms and wash your wrists. Rinse and dry!",
    },
  };

  const handleStepSelect = (step: number) => {
    setActiveStep(step);
    if (playChime) playChime("click");
    if (step === 6) {
      if (playChime) playChime("fanfare");
    }
    const info = stepDescriptions[step];
    if (info) handleSpeak(info.speech);
  };

  const handleHotspotClick = (item: HotspotItem) => {
    setActiveHotspot(item);
    if (playChime) playChime("click");
    handleSpeak(`${item.name}. ${item.bangla}`);
    setTimeout(() => setActiveHotspot(null), 3000);
  };

  const hotspots: HotspotItem[] = [
    { id: "tap", name: "Running Clean Water", bangla: "পরিষ্কার বহমান পানি", x: 49, y: 16, icon: "🚰" },
    { id: "soap", name: "Foaming Soap", bangla: "জীবাণুনাশক সাবান ও ফেনা", x: 22, y: 35, icon: "🧼" },
    { id: "palms", name: "Palms (Silent L)", bangla: "হাতের তালু", x: 42, y: 55, icon: "🤲" },
    { id: "fingers", name: "Between Fingers", bangla: "আঙুলের ফাঁকের অংশ", x: 58, y: 46, icon: "🖐️" },
    { id: "thumbs", name: "Thumbs (Silent B)", bangla: "বুড়ো আঙুল", x: 34, y: 72, icon: "👍" },
    { id: "wrists", name: "Wrists (Silent W)", bangla: "হাতের কবজি", x: 50, y: 88, icon: "⌚" },
    { id: "towel", name: "Clean Towel", bangla: "পরিষ্কার শুকনো তোয়ালে", x: 78, y: 40, icon: "🧺" },
  ];

  return (
    <div
      className={`rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden relative transition-all duration-300 select-none flex flex-col ${
        isFullTheater ? "min-h-[460px] md:min-h-[520px]" : "min-h-[380px] md:min-h-[420px]"
      } bg-gradient-to-b from-sky-200 via-teal-50 to-emerald-100`}
    >
      {/* 🏷️ Top Interactive Bar: 6 Handwashing Steps */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none">
        {/* Step Selector Pills */}
        <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xs pointer-events-auto overflow-x-auto max-w-full">
          {[
            { step: 1, label: "১. পানি ও সাবান", icon: "💧" },
            { step: 2, label: "২. দুই তালু", icon: "🤲" },
            { step: 3, label: "৩. হাতের পিঠ", icon: "✋" },
            { step: 4, label: "৪. আঙুলের ফাঁক", icon: "🖐️" },
            { step: 5, label: "৫. বুড়ো আঙুল", icon: "👍" },
            { step: 6, label: "✨ ৬. নখ ও কবজি", icon: "🧼" },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => handleStepSelect(item.step)}
              className={`px-2 py-1 rounded-xl text-[10px] sm:text-[11px] font-black transition-all flex items-center gap-1 shrink-0 ${
                activeStep === item.step
                  ? "bg-teal-600 text-white shadow-xs scale-102"
                  : "bg-slate-100/80 text-slate-700 hover:bg-slate-200/80"
              }`}
            >
              <span>{item.icon}</span>
              <span className="hidden xs:inline">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xs pointer-events-auto">
          {/* Water tap toggle */}
          <button
            onClick={() => {
              setIsWaterRunning(!isWaterRunning);
              if (playChime) playChime("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition-all ${
              isWaterRunning
                ? "bg-sky-500 text-white shadow-2xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
            title="পানির কল চালু বা বন্ধ করুন"
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>{isWaterRunning ? "পানি বইছে" : "কল বন্ধ"}</span>
          </button>

          {/* Sound cue */}
          <button
            onClick={() => {
              if (playChime) playChime("fanfare");
              handleSpeak(stepDescriptions[activeStep].speech);
            }}
            className="px-2.5 py-1 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-2xs active:scale-95 flex items-center gap-1"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>ধাপের অডিও</span>
          </button>
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
            <filter id="handShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="8" stdDeviation="6" floodOpacity="0.16" />
            </filter>

            {/* Soap Bubble Gradient */}
            <radialGradient id="soapBubble" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#e0f2fe" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#bae6fd" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
            </radialGradient>

            {/* Clean Water Stream Gradient */}
            <linearGradient id="waterStream" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.5" />
            </linearGradient>

            {/* Hand Skin Gradient */}
            <linearGradient id="skinTone" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fdba74" />
            </linearGradient>

            {/* Chrome Tap Gradient */}
            <linearGradient id="chromeTap" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="40%" stopColor="#f8fafc" />
              <stop offset="70%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>

          {/* Clean Washbasin Background */}
          <rect x="80" y="30" width="640" height="425" rx="36" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="4" />
          <ellipse cx="400" cy="270" rx="270" ry="155" fill="#f0fdfa" stroke="#ccfbf1" strokeWidth="3" />
          <ellipse cx="400" cy="275" rx="245" ry="135" fill="#e6fffa" />

          {/* Drain at Basin Center */}
          <ellipse cx="400" cy="340" rx="28" ry="14" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
          <ellipse cx="400" cy="340" rx="18" ry="9" fill="#1e293b" />
          <circle cx="400" cy="340" r="4" fill="#64748b" />

          {/* 🚰 Modern Chrome Water Tap at Top */}
          <g transform="translate(365, 30)" filter="url(#handShadow)">
            {/* Tap Base */}
            <rect x="22" y="0" width="26" height="55" fill="url(#chromeTap)" rx="4" />
            <ellipse cx="35" cy="55" rx="22" ry="7" fill="url(#chromeTap)" />
            {/* Tap Arch Neck */}
            <path
              d="M 25,25 Q 35,-15 50,-15 Q 65,-15 70,30 L 60,32"
              fill="none"
              stroke="url(#chromeTap)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Spout */}
            <rect x="54" y="30" width="18" height="14" fill="url(#chromeTap)" rx="3" />

            {/* Water Flow Stream */}
            {isWaterRunning && (
              <g>
                <path
                  d="M 57,44 L 54,230 Q 63,250 72,230 L 69,44 Z"
                  fill="url(#waterStream)"
                  opacity="0.85"
                />
                {/* Splashing Droplets */}
                <circle cx="52" cy="225" r="4" fill="#38bdf8" opacity="0.8" className="animate-ping" />
                <circle cx="72" cy="235" r="3.5" fill="#38bdf8" opacity="0.8" className="animate-ping" />
                <circle cx="63" cy="245" r="5" fill="#0284c7" opacity="0.7" />
              </g>
            )}
          </g>

          {/* 🧼 Soap Dispenser on Left Side */}
          <g transform="translate(130, 110)" filter="url(#handShadow)">
            <rect x="15" y="45" width="46" height="85" rx="10" fill="#2dd4bf" stroke="#0d9488" strokeWidth="2" />
            <rect x="20" y="52" width="36" height="40" rx="6" fill="#5eead4" />
            <text x="38" y="76" fill="#115e59" fontSize="11" fontWeight="black" textAnchor="middle">SOAP</text>
            <text x="38" y="88" fill="#134e4a" fontSize="8" fontWeight="bold" textAnchor="middle">সাবান 🧼</text>
            {/* Pump Nozzle */}
            <rect x="33" y="28" width="10" height="18" fill="url(#chromeTap)" />
            <path d="M 20,28 L 44,28" stroke="url(#chromeTap)" strokeWidth="6" strokeLinecap="round" />
            <path d="M 20,28 L 16,35" stroke="url(#chromeTap)" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* 🧺 Clean Towel on Right Side */}
          <g transform="translate(615, 110)" filter="url(#handShadow)">
            <rect x="10" y="40" width="55" height="110" rx="8" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
            {/* Towel stripes */}
            <line x1="10" y1="60" x2="65" y2="60" stroke="#f59e0b" strokeWidth="3" />
            <line x1="10" y1="70" x2="65" y2="70" stroke="#f59e0b" strokeWidth="2" />
            <line x1="10" y1="130" x2="65" y2="130" stroke="#f59e0b" strokeWidth="4" />
            <text x="37" y="105" fill="#854d0e" fontSize="10" fontWeight="black" textAnchor="middle">TOWEL</text>
            <text x="37" y="118" fill="#713f12" fontSize="8" fontWeight="bold" textAnchor="middle">তোয়ালে 🧺</text>
            {/* Towel Hanger Bar */}
            <rect x="0" y="32" width="75" height="8" rx="4" fill="url(#chromeTap)" />
          </g>

          {/* ========================================================= */}
          {/* 🤲 THE INTERACTIVE HANDS & WASHING MOTIONS */}
          {/* ========================================================= */}
          <g transform="translate(250, 150)" filter="url(#handShadow)">
            {/* LEFT HAND */}
            <g transform={`translate(75, 45) rotate(${activeStep === 2 ? "12" : activeStep === 3 ? "20" : "5"})`}>
              {/* Wrist & Forearm */}
              <rect x="0" y="90" width="36" height="55" rx="8" fill="url(#skinTone)" stroke="#ea580c" strokeWidth="1.5" />
              {/* Palm */}
              <rect x="-8" y="30" width="52" height="65" rx="14" fill="url(#skinTone)" stroke="#ea580c" strokeWidth="1.5" />
              {/* Thumb */}
              <ellipse cx="-16" cy="55" rx="10" ry="18" fill="url(#skinTone)" stroke="#ea580c" strokeWidth="1.5" transform="rotate(-30, -16, 55)" />
              {/* 4 Fingers */}
              <rect x="-5" y="-15" width="11" height="50" rx="5" fill="url(#skinTone)" stroke="#ea580c" strokeWidth="1.5" />
              <rect x="8" y="-25" width="11" height="60" rx="5" fill="url(#skinTone)" stroke="#ea580c" strokeWidth="1.5" />
              <rect x="21" y="-20" width="11" height="55" rx="5" fill="url(#skinTone)" stroke="#ea580c" strokeWidth="1.5" />
              <rect x="34" y="-8" width="10" height="45" rx="5" fill="url(#skinTone)" stroke="#ea580c" strokeWidth="1.5" />
              {/* Fingernails */}
              <ellipse cx="0" cy="-10" rx="3" ry="4" fill="#fff7ed" />
              <ellipse cx="13" cy="-20" rx="3" ry="4" fill="#fff7ed" />
              <ellipse cx="26" cy="-15" rx="3" ry="4" fill="#fff7ed" />
              <ellipse cx="39" cy="-3" rx="3" ry="4" fill="#fff7ed" />
            </g>

            {/* RIGHT HAND */}
            <g transform={`translate(185, 45) rotate(${activeStep === 2 ? "-12" : activeStep === 3 ? "-15" : "-5"})`}>
              {/* Wrist & Forearm */}
              <rect x="0" y="90" width="36" height="55" rx="8" fill="url(#skinTone)" stroke="#ea580c" strokeWidth="1.5" />
              {/* Palm */}
              <rect x="-8" y="30" width="52" height="65" rx="14" fill="url(#skinTone)" stroke="#ea580c" strokeWidth="1.5" />
              {/* Thumb */}
              <ellipse cx="52" cy="55" rx="10" ry="18" fill="url(#skinTone)" stroke="#ea580c" strokeWidth="1.5" transform="rotate(30, 52, 55)" />
              {/* 4 Fingers */}
              <rect x="-8" y="-8" width="10" height="45" rx="5" fill="url(#skinTone)" stroke="#ea580c" strokeWidth="1.5" />
              <rect x="4" y="-20" width="11" height="55" rx="5" fill="url(#skinTone)" stroke="#ea580c" strokeWidth="1.5" />
              <rect x="17" y="-25" width="11" height="60" rx="5" fill="url(#skinTone)" stroke="#ea580c" strokeWidth="1.5" />
              <rect x="30" y="-15" width="11" height="50" rx="5" fill="url(#skinTone)" stroke="#ea580c" strokeWidth="1.5" />
              {/* Fingernails */}
              <ellipse cx="-3" cy="-3" rx="3" ry="4" fill="#fff7ed" />
              <ellipse cx="10" cy="-15" rx="3" ry="4" fill="#fff7ed" />
              <ellipse cx="23" cy="-20" rx="3" ry="4" fill="#fff7ed" />
              <ellipse cx="36" cy="-10" rx="3" ry="4" fill="#fff7ed" />
            </g>

            {/* Rich Foaming Soap Lather on Hands (Steps 2 to 6) */}
            {activeStep >= 2 && (
              <g id="soapLather">
                <circle cx="110" cy="70" r="14" fill="url(#soapBubble)" />
                <circle cx="130" cy="55" r="18" fill="url(#soapBubble)" />
                <circle cx="150" cy="75" r="16" fill="url(#soapBubble)" />
                <circle cx="125" cy="95" r="15" fill="url(#soapBubble)" />
                <circle cx="170" cy="65" r="17" fill="url(#soapBubble)" />
                <circle cx="185" cy="85" r="14" fill="url(#soapBubble)" />
                <circle cx="95" cy="50" r="12" fill="url(#soapBubble)" />
                <circle cx="140" cy="35" r="15" fill="url(#soapBubble)" />
                <circle cx="165" cy="40" r="13" fill="url(#soapBubble)" />
                {/* Floating micro bubbles */}
                <circle cx="75" cy="25" r="7" fill="url(#soapBubble)" />
                <circle cx="215" cy="35" r="9" fill="url(#soapBubble)" />
                <circle cx="145" cy="120" r="10" fill="url(#soapBubble)" />
                <circle cx="180" cy="115" r="8" fill="url(#soapBubble)" />
              </g>
            )}

            {/* Step Motion Cue Arrows & Callout */}
            <g transform="translate(145, 80)">
              {activeStep === 2 && (
                <g className="animate-pulse">
                  <path d="M -30,0 L 30,0 M 15,-10 L 30,0 L 15,10 M -15,-10 L -30,0 L -15,10" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <rect x="-70" y="25" width="140" height="22" rx="11" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
                  <text x="0" y="40" fill="#0369a1" fontSize="10" fontWeight="bold" textAnchor="middle">
                    ২য় ধাপ: দুই তালু ঘষা 🤲
                  </text>
                </g>
              )}
              {activeStep === 3 && (
                <g className="animate-pulse">
                  <path d="M 0,-30 L 0,30 M -10,15 L 0,30 L 10,15 M -10,-15 L 0,-30 L 10,-15" stroke="#7c3aed" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <rect x="-70" y="40" width="140" height="22" rx="11" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.5" />
                  <text x="0" y="55" fill="#6d28d9" fontSize="10" fontWeight="bold" textAnchor="middle">
                    ৩য় ধাপ: হাতের পিঠ ✋
                  </text>
                </g>
              )}
              {activeStep === 4 && (
                <g className="animate-pulse">
                  <rect x="-80" y="-35" width="160" height="22" rx="11" fill="#ffffff" stroke="#059669" strokeWidth="1.5" />
                  <text x="0" y="-20" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">
                    ৪র্থ ধাপ: আঙুলের ফাঁক 🖐️
                  </text>
                </g>
              )}
              {activeStep === 5 && (
                <g className="animate-pulse">
                  <circle cx="-50" cy="20" r="16" fill="none" stroke="#d97706" strokeWidth="3" strokeDasharray="6,4" />
                  <circle cx="50" cy="20" r="16" fill="none" stroke="#d97706" strokeWidth="3" strokeDasharray="6,4" />
                  <rect x="-80" y="45" width="160" height="22" rx="11" fill="#ffffff" stroke="#d97706" strokeWidth="1.5" />
                  <text x="0" y="60" fill="#b45309" fontSize="10" fontWeight="bold" textAnchor="middle">
                    ৫ম ধাপ: বুড়ো আঙুল পরিষ্কার 👍
                  </text>
                </g>
              )}
              {activeStep === 6 && (
                <g className="animate-pulse">
                  {/* Clean sparkles */}
                  <g fill="#f59e0b">
                    <polygon points="0,-40 5,-30 15,-28 7,-20 9,-10 0,-16 -9,-10 -7,-20 -15,-28 -5,-30" transform="translate(-60, 0) scale(0.6)" />
                    <polygon points="0,-40 5,-30 15,-28 7,-20 9,-10 0,-16 -9,-10 -7,-20 -15,-28 -5,-30" transform="translate(60, 0) scale(0.6)" />
                  </g>
                  <rect x="-90" y="55" width="180" height="24" rx="12" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
                  <text x="0" y="71" fill="#065f46" fontSize="11" fontWeight="black" textAnchor="middle">
                    ৬ষ্ঠ ধাপ: নখ ও কবজি ধোয়া ✨
                  </text>
                </g>
              )}
            </g>

            {/* Germs (Visible on Slide 1 or Step 1, dying as soap spreads) */}
            {(slideId === 1 || germsAlive) && (
              <g id="germMonsters" className="animate-bounce">
                {/* Germ 1 */}
                <g transform="translate(50, 40)">
                  <circle cx="0" cy="0" r="10" fill="#15803d" />
                  <circle cx="-3" cy="-2" r="1.5" fill="#ffffff" />
                  <circle cx="3" cy="-2" r="1.5" fill="#ffffff" />
                  <circle cx="-3" cy="-2" r="0.8" fill="#000000" />
                  <circle cx="3" cy="-2" r="0.8" fill="#000000" />
                  <path d="M -4,4 Q 0,6 4,4" stroke="#ffffff" strokeWidth="1" fill="none" />
                  {/* Spikes */}
                  <line x1="-12" y1="0" x2="-8" y2="0" stroke="#15803d" strokeWidth="2.5" />
                  <line x1="12" y1="0" x2="8" y2="0" stroke="#15803d" strokeWidth="2.5" />
                  <line x1="0" y1="-12" x2="0" y2="-8" stroke="#15803d" strokeWidth="2.5" />
                  <line x1="0" y1="12" x2="0" y2="8" stroke="#15803d" strokeWidth="2.5" />
                </g>
                {/* Germ 2 */}
                <g transform="translate(240, 60)">
                  <circle cx="0" cy="0" r="9" fill="#dc2626" />
                  <circle cx="-3" cy="-2" r="1.5" fill="#ffffff" />
                  <circle cx="3" cy="-2" r="1.5" fill="#ffffff" />
                  <circle cx="-3" cy="-2" r="0.8" fill="#000000" />
                  <circle cx="3" cy="-2" r="0.8" fill="#000000" />
                  <line x1="-10" y1="0" x2="-7" y2="0" stroke="#dc2626" strokeWidth="2" />
                  <line x1="10" y1="0" x2="7" y2="0" stroke="#dc2626" strokeWidth="2" />
                </g>
              </g>
            )}
          </g>

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
              {/* Outer ping */}
              <circle cx="0" cy="0" r="16" fill="#14b8a6" opacity="0.3" className="animate-ping" />
              {/* Core button */}
              <circle
                cx="0"
                cy="0"
                r="13"
                fill="#ffffff"
                stroke="#0d9488"
                strokeWidth="2.5"
                filter="url(#handShadow)"
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
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-4 py-2.5 rounded-2xl bg-slate-900/95 text-white shadow-xl border border-teal-400 flex items-center gap-3 animate-scale-up">
            <span className="text-xl p-1.5 rounded-xl bg-white/10">{activeHotspot.icon}</span>
            <div>
              <p className="text-sm font-black text-teal-300 flex items-center gap-1.5">
                <span>{activeHotspot.name}</span>
                <Volume2 className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              </p>
              <p className="text-xs text-slate-200 font-semibold">{activeHotspot.bangla}</p>
            </div>
          </div>
        )}
      </div>

      {/* 🧭 Bottom Status Ribbon */}
      <div className="p-2 sm:p-2.5 bg-white/95 border-t border-slate-200/80 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span>
            {stepDescriptions[activeStep]?.title}: {stepDescriptions[activeStep]?.bangla}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {activeStep < 6 && (
            <button
              onClick={() => handleStepSelect(activeStep + 1)}
              className="px-2.5 py-1 rounded-xl text-xs font-black bg-teal-600 text-white hover:bg-teal-700 active:scale-95 transition-all shadow-2xs"
            >
              পরবর্তী ধাপ ➔
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
