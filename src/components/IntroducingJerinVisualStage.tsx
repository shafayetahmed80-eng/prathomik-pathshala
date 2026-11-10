"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Volume2, School, UserCheck, Users, Heart, Award, Check, RefreshCw } from "lucide-react";

interface IntroducingJerinVisualStageProps {
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

type StudentAvatar = "jerin" | "alif" | "riya" | "farhan";

export default function IntroducingJerinVisualStage({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}: IntroducingJerinVisualStageProps) {
  // Mode: "campus" (School campus scene) or "id_card" (Interactive ID badge studio)
  const [viewMode, setViewMode] = useState<"campus" | "id_card">(() => {
    return slideId === 5 ? "id_card" : "campus";
  });

  const [selectedAvatar, setSelectedAvatar] = useState<StudentAvatar>("jerin");
  const [activeHotspot, setActiveHotspot] = useState<HotspotItem | null>(null);
  const [isApplauseActive, setIsApplauseActive] = useState<boolean>(false);

  // Sync mode with slide changes
  useEffect(() => {
    if (slideId === 5) {
      setViewMode("id_card");
    } else {
      setViewMode("campus");
    }
  }, [slideId]);

  const avatarProfiles: Record<StudentAvatar, { name: string; bangla: string; gender: "girl" | "boy"; age: string; role: string; introText: string }> = {
    jerin: {
      name: "Jerin",
      bangla: "জেরিন",
      gender: "girl",
      age: "8 Years Old",
      role: "Class 3 Student",
      introText: "Hello! I am Jerin. I am eight years old. I'm in Class 3 at Mohonpur Primary School. My father is a teacher and my mother is a banker. We are a very happy family!",
    },
    alif: {
      name: "Alif",
      bangla: "আলিফ",
      gender: "boy",
      age: "8 Years Old",
      role: "Class 3 Student",
      introText: "Hello! I am Alif. I am eight years old. I'm in Class 3 at Mohonpur Primary School. I love reading storybooks and playing football with friends!",
    },
    riya: {
      name: "Riya",
      bangla: "রিয়া",
      gender: "girl",
      age: "8 Years Old",
      role: "Class 3 Student",
      introText: "Hello! I am Riya. I am eight years old. I'm in Class 3 at Mohonpur Primary School. I live with my parents and my sister in Mohonpur.",
    },
    farhan: {
      name: "Farhan",
      bangla: "ফারহান",
      gender: "boy",
      age: "8 Years Old",
      role: "Class 3 Student",
      introText: "Hello! I am Farhan. I am eight years old. I study in Class 3 at Mohonpur Primary School. My family is very happy and caring!",
    },
  };

  const currentProfile = avatarProfiles[selectedAvatar];

  const handleSpeakIntro = () => {
    setIsApplauseActive(true);
    if (playChime) playChime("fanfare");
    handleSpeak(currentProfile.introText);
    setTimeout(() => setIsApplauseActive(false), 3000);
  };

  const handleHotspotClick = (item: HotspotItem) => {
    setActiveHotspot(item);
    if (playChime) playChime("click");
    handleSpeak(`${item.name}. ${item.bangla}`);
    setTimeout(() => setActiveHotspot(null), 3000);
  };

  const campusHotspots: HotspotItem[] = [
    { id: "school", name: "Mohonpur Primary School", bangla: "মোহনপুর প্রাথমিক বিদ্যালয়", x: 28, y: 32, icon: "🏫" },
    { id: "flag", name: "National Flag", bangla: "বাংলাদেশের জাতীয় পতাকা", x: 49, y: 18, icon: "🚩" },
    { id: "jerin", name: "Jerin (8 Years Old)", bangla: "জেরিন (৮ বছর বয়সী শিক্ষার্থী)", x: 48, y: 68, icon: "👧" },
    { id: "father", name: "Father (Teacher)", bangla: "বাবা (শিক্ষক)", x: 74, y: 55, icon: "👨‍🏫" },
    { id: "mother", name: "Mother (Banker)", bangla: "মা (ব্যাংক কর্মকর্তা)", x: 86, y: 56, icon: "👩‍💼" },
    { id: "brother", name: "Baby Brother (2 Years)", bangla: "ছোট ভাই (২ বছর)", x: 80, y: 78, icon: "👶" },
    { id: "bag", name: "School Bag", bangla: "স্কুল ব্যাগ ও বই", x: 42, y: 76, icon: "🎒" },
  ];

  const idCardHotspots: HotspotItem[] = [
    { id: "id_badge", name: "Student ID Card", bangla: "শিক্ষার্থীর পরিচয়পত্র", x: 50, y: 15, icon: "🆔" },
    { id: "photo", name: "Student Photo", bangla: "শিক্ষার্থীর ছবি", x: 28, y: 48, icon: "📸" },
    { id: "details", name: "Personal Details", bangla: "নাম, বয়স ও শ্রেণি", x: 62, y: 42, icon: "📝" },
    { id: "family", name: "Happy Family Info", bangla: "পিতা-মাতার পেশা ও পরিবার", x: 62, y: 70, icon: "👨‍👩‍👦" },
  ];

  const hotspots = viewMode === "campus" ? campusHotspots : idCardHotspots;

  return (
    <div
      className={`rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden relative transition-all duration-300 select-none flex flex-col ${
        isFullTheater ? "min-h-[460px] md:min-h-[520px]" : "min-h-[380px] md:min-h-[420px]"
      } bg-gradient-to-b from-sky-200 via-sky-50 to-emerald-100`}
    >
      {/* 🏷️ Top Controls Ribbon */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none">
        {/* View Switcher: Campus vs ID Card */}
        <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xs pointer-events-auto">
          <button
            onClick={() => {
              setViewMode("campus");
              if (playChime) playChime("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              viewMode === "campus"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <School className="w-3.5 h-3.5" />
            <span>স্কুল ও পরিবার</span>
          </button>
          <button
            onClick={() => {
              setViewMode("id_card");
              if (playChime) playChime("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              viewMode === "id_card"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>আইডি কার্ড স্টুডিও 🆔</span>
          </button>
        </div>

        {/* Profile Switcher & Audio Cue */}
        <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xs pointer-events-auto">
          {/* Avatar Switcher */}
          <div className="flex items-center gap-1 px-1 border-r border-slate-200">
            {(["jerin", "alif", "riya", "farhan"] as StudentAvatar[]).map((avKey) => (
              <button
                key={avKey}
                onClick={() => {
                  setSelectedAvatar(avKey);
                  if (playChime) playChime("click");
                }}
                className={`px-2 py-0.5 rounded-lg text-xs font-black transition-all ${
                  selectedAvatar === avKey
                    ? "bg-amber-500 text-white shadow-xs scale-105"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
                title={avatarProfiles[avKey].name}
              >
                {avKey === "jerin" ? "👧 জেরিন" : avKey === "alif" ? "👦 আলিফ" : avKey === "riya" ? "👧 রিয়া" : "👦 ফারহান"}
              </button>
            ))}
          </div>

          {/* Introduce Button */}
          <button
            onClick={handleSpeakIntro}
            className={`px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
              isApplauseActive
                ? "bg-emerald-600 text-white scale-105"
                : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-2xs active:scale-95"
            }`}
            title="জেরিনের আত্মপরিচয় শুনতে ক্লিক করুন"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>পরিচয় শোনো 🗣️</span>
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
            <filter id="jerinShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="6" stdDeviation="5" floodOpacity="0.18" />
            </filter>

            {/* School Wall Gradient */}
            <linearGradient id="schoolWall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>

            {/* Red Roof Gradient */}
            <linearGradient id="roofGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>

            {/* ID Card Hologram Gradient */}
            <linearGradient id="cardHolo" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            {/* ID Card Body Gradient */}
            <linearGradient id="idCardBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>
          </defs>

          {/* ========================================================= */}
          {/* MODE A: MOHONPUR PRIMARY SCHOOL CAMPUS & FAMILY SCENE */}
          {/* ========================================================= */}
          {viewMode === "campus" ? (
            <g id="campusScene">
              {/* Sky with Sun */}
              <circle cx="700" cy="70" r="45" fill="#facc15" opacity="0.9" />
              <circle cx="700" cy="70" r="75" fill="#fef08a" opacity="0.3" />

              {/* Gentle Clouds */}
              <g fill="#ffffff" opacity="0.85">
                <path d="M 80,80 Q 95,55 125,60 Q 150,50 170,70 Q 195,70 200,90 Q 205,110 180,110 L 95,110 Z" />
                <path d="M 520,50 Q 535,30 560,35 Q 580,25 595,45 Q 615,45 620,65 L 530,65 Z" opacity="0.75" />
              </g>

              {/* Green Hillocks & Trees Background */}
              <path d="M -20,320 Q 200,280 420,310 Q 640,290 820,315 L 820,480 L -20,480 Z" fill="#86efac" />
              <path d="M -20,350 Q 180,330 380,345 Q 600,335 820,350 L 820,480 L -20,480 Z" fill="#4ade80" />
              <path d="M -20,380 Q 220,370 450,385 Q 650,375 820,380 L 820,480 L -20,480 Z" fill="#22c55e" />

              {/* Trees on Left & Right */}
              <g transform="translate(40, 240)">
                <path d="M 25,120 L 25,60" stroke="#78350f" strokeWidth="8" strokeLinecap="round" />
                <circle cx="25" cy="50" r="35" fill="#15803d" />
                <circle cx="10" cy="40" r="28" fill="#16a34a" />
                <circle cx="40" cy="42" r="28" fill="#15803d" />
                <circle cx="25" cy="20" r="25" fill="#22c55e" />
              </g>

              {/* 🏫 Mohonpur Govt. Primary School Building */}
              <g transform="translate(110, 160)" filter="url(#jerinShadow)">
                {/* Main Building Base */}
                <rect x="0" y="80" width="280" height="130" fill="url(#schoolWall)" stroke="#ca8a04" strokeWidth="2.5" rx="6" />

                {/* Building Roof */}
                <polygon points="-15,80 140,20 295,80" fill="url(#roofGrad)" stroke="#991b1b" strokeWidth="2" />

                {/* School Signboard */}
                <rect x="40" y="48" width="200" height="26" fill="#1e3a8a" stroke="#ffffff" strokeWidth="1.5" rx="4" />
                <text x="140" y="65" fill="#ffffff" fontSize="10.5" fontWeight="black" textAnchor="middle">
                  MOHONPUR PRIMARY SCHOOL
                </text>

                {/* Classroom Windows */}
                <g fill="#38bdf8" stroke="#0369a1" strokeWidth="2">
                  <rect x="25" y="105" width="45" height="40" rx="3" />
                  <line x1="47" y1="105" x2="47" y2="145" />
                  <line x1="25" y1="125" x2="70" y2="125" />

                  <rect x="210" y="105" width="45" height="40" rx="3" />
                  <line x1="232" y1="105" x2="232" y2="145" />
                  <line x1="210" y1="125" x2="255" y2="125" />
                </g>

                {/* School Main Door & Steps */}
                <rect x="110" y="125" width="60" height="85" fill="#78350f" rx="3" />
                <rect x="116" y="132" width="22" height="72" fill="#9a3412" />
                <rect x="142" y="132" width="22" height="72" fill="#9a3412" />
                <circle cx="134" cy="168" r="2.5" fill="#facc15" />
                <circle cx="146" cy="168" r="2.5" fill="#facc15" />

                {/* Steps */}
                <rect x="95" y="210" width="90" height="8" fill="#cbd5e1" stroke="#94a3b8" />
                <rect x="90" y="218" width="100" height="8" fill="#94a3b8" />
              </g>

              {/* 🚩 National Flagpole in Front of School */}
              <g transform="translate(425, 120)">
                {/* Pole */}
                <line x1="0" y1="0" x2="0" y2="280" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                <circle cx="0" cy="0" r="5" fill="#facc15" />
                {/* Red & Green Bangladesh Flag */}
                <rect x="0" y="6" width="65" height="39" fill="#006a4e" rx="1" />
                <circle cx="28" cy="25" r="13" fill="#f42a41" />
                {/* Pedestal */}
                <rect x="-18" y="275" width="36" height="8" fill="#e2e8f0" stroke="#64748b" />
                <rect x="-24" y="283" width="48" height="8" fill="#cbd5e1" stroke="#64748b" />
              </g>

              {/* ======================================================= */}
              {/* 👧 MAIN CHARACTER: JERIN (Class 3 Student) */}
              {/* ======================================================= */}
              <g transform="translate(370, 260)" filter="url(#jerinShadow)">
                {/* Student Body (White & Blue uniform) */}
                <path d="M 25,65 L 10,135 L 55,135 L 42,65 Z" fill="#2563eb" /> {/* Blue skirt */}
                <rect x="18" y="45" width="30" height="26" fill="#ffffff" stroke="#cbd5e1" rx="2" /> {/* White shirt */}
                <polygon points="26,45 33,58 39,45" fill="#dc2626" /> {/* Red necktie */}

                {/* Head */}
                <circle cx="33" cy="26" r="16" fill="#fed7aa" />
                {/* Hair with Ponytails */}
                <path d="M 18,22 Q 33,10 48,22 Q 45,14 33,14 Z" fill="#1e293b" />
                <ellipse cx="14" cy="24" rx="5" ry="9" fill="#1e293b" />
                <ellipse cx="52" cy="24" rx="5" ry="9" fill="#1e293b" />
                {/* Red hair ribbons */}
                <circle cx="14" cy="18" r="3" fill="#ef4444" />
                <circle cx="52" cy="18" r="3" fill="#ef4444" />

                {/* Happy Face */}
                <circle cx="28" cy="24" r="2" fill="#1e293b" />
                <circle cx="38" cy="24" r="2" fill="#1e293b" />
                <circle cx="26" cy="29" r="2.5" fill="#fca5a5" opacity="0.6" />
                <circle cx="40" cy="29" r="2.5" fill="#fca5a5" opacity="0.6" />
                <path d="M 29,31 Q 33,36 37,31" stroke="#1e293b" strokeWidth="1.5" fill="none" />

                {/* Legs & Shoes */}
                <rect x="22" y="135" width="7" height="30" fill="#fed7aa" />
                <rect x="37" y="135" width="7" height="30" fill="#fed7aa" />
                <ellipse cx="24" cy="167" rx="8" ry="4" fill="#1e293b" />
                <ellipse cx="42" cy="167" rx="8" ry="4" fill="#1e293b" />

                {/* School Backpack on Side */}
                <rect x="42" y="50" width="16" height="28" rx="4" fill="#ef4444" stroke="#b91c1c" />
                <circle cx="50" cy="62" r="3" fill="#fde047" />

                {/* ID Badge on Shirt */}
                <rect x="22" y="52" width="10" height="12" rx="1.5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
                <line x1="24" y1="55" x2="30" y2="55" stroke="#ffffff" strokeWidth="1" />
                <line x1="24" y1="58" x2="28" y2="58" stroke="#ffffff" strokeWidth="1" />

                {/* Waving Hand */}
                <path d="M 18,52 L 2,42 L -6,46" stroke="#fed7aa" strokeWidth="4.5" strokeLinecap="round" />
                <circle cx="-7" cy="46" r="4.5" fill="#fed7aa" />

                {/* Name Tag Pill */}
                <g transform="translate(-10, 180)">
                  <rect x="0" y="0" width="86" height="24" rx="12" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                  <text x="43" y="16" fill="#1e3a8a" fontSize="12" fontWeight="black" textAnchor="middle">
                    👧 Jerin (8 yrs)
                  </text>
                </g>
              </g>

              {/* ======================================================= */}
              {/* 👨‍👩‍👦 JERIN'S FAMILY (Father, Mother, Baby Brother) */}
              {/* ======================================================= */}
              <g transform="translate(560, 225)" filter="url(#jerinShadow)">
                {/* Family Garden Fence/Arbor backdrop */}
                <rect x="-10" y="100" width="220" height="85" fill="#fef3c7" opacity="0.6" rx="8" />

                {/* 👨‍🏫 Father (Teacher) */}
                <g transform="translate(20, 10)">
                  {/* Body */}
                  <rect x="15" y="55" width="34" height="75" fill="#1e293b" rx="4" />
                  <rect x="22" y="55" width="20" height="30" fill="#f8fafc" /> {/* Shirt */}
                  <polygon points="30,55 33,70 35,55" fill="#dc2626" /> {/* Tie */}
                  {/* Head */}
                  <circle cx="32" cy="30" r="17" fill="#fed7aa" />
                  <path d="M 16,26 Q 32,12 48,26 Q 44,16 32,16 Z" fill="#0f172a" />
                  {/* Teacher Glasses */}
                  <rect x="21" y="27" width="9" height="7" rx="1" fill="none" stroke="#0f172a" strokeWidth="1.5" />
                  <rect x="34" y="27" width="9" height="7" rx="1" fill="none" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1="30" y1="30" x2="34" y2="30" stroke="#0f172a" strokeWidth="1.5" />
                  {/* Book in hand */}
                  <rect x="0" y="80" width="18" height="24" rx="2" fill="#dc2626" stroke="#ffffff" />
                  <line x1="9" y1="80" x2="9" y2="104" stroke="#ffffff" />
                  {/* Label */}
                  <rect x="2" y="138" width="60" height="20" rx="10" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
                  <text x="32" y="152" fill="#0369a1" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Teacher 👨‍🏫
                  </text>
                </g>

                {/* 👩‍💼 Mother (Banker) */}
                <g transform="translate(100, 18)">
                  {/* Traditional Saree */}
                  <path d="M 22,50 L 8,128 L 52,128 L 40,50 Z" fill="#9333ea" />
                  <path d="M 15,50 Q 32,68 45,95 L 35,128 L 18,128 Z" fill="#c084fc" />
                  {/* Head */}
                  <circle cx="30" cy="27" r="15" fill="#fed7aa" />
                  <path d="M 15,25 Q 30,12 45,25 Q 42,14 30,14 Z" fill="#1e293b" />
                  {/* Bun */}
                  <circle cx="44" cy="28" r="7" fill="#1e293b" />
                  {/* Bindi */}
                  <circle cx="30" cy="24" r="1.5" fill="#dc2626" />
                  {/* Eyes & Smile */}
                  <circle cx="25" cy="27" r="1.5" fill="#1e293b" />
                  <circle cx="35" cy="27" r="1.5" fill="#1e293b" />
                  <path d="M 26,33 Q 30,36 34,33" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                  {/* Briefcase/Office Bag in Hand */}
                  <rect x="42" y="82" width="20" height="16" rx="2" fill="#78350f" stroke="#d97706" />
                  <path d="M 47,82 L 47,78 Q 52,75 57,78 L 57,82" stroke="#78350f" strokeWidth="2" fill="none" />
                  {/* Label */}
                  <rect x="5" y="130" width="56" height="20" rx="10" fill="#ffffff" stroke="#9333ea" strokeWidth="1.5" />
                  <text x="33" y="144" fill="#7e22ce" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Banker 👩‍💼
                  </text>
                </g>

                {/* 👶 Little Brother (2 Years Old) */}
                <g transform="translate(70, 115)">
                  <circle cx="16" cy="18" r="12" fill="#fed7aa" />
                  <path d="M 6,16 Q 16,8 26,16 Z" fill="#1e293b" />
                  <rect x="6" y="28" width="20" height="22" rx="4" fill="#f59e0b" />
                  <circle cx="12" cy="18" r="1.5" fill="#1e293b" />
                  <circle cx="20" cy="18" r="1.5" fill="#1e293b" />
                  <path d="M 13,23 Q 16,26 19,23" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                  {/* Toy Ball */}
                  <circle cx="34" cy="38" r="9" fill="#ef4444" />
                  <path d="M 28,34 Q 34,38 40,34" stroke="#ffffff" strokeWidth="2" fill="none" />
                  {/* Label */}
                  <rect x="-10" y="55" width="68" height="18" rx="9" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="24" y="68" fill="#b45309" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Brother (2 yrs) 👶
                  </text>
                </g>
              </g>
            </g>
          ) : (
            /* ========================================================= */
            /* MODE B: INTERACTIVE DIGITAL STUDENT ID BADGE STUDIO */
            /* ========================================================= */
            <g id="idCardStudioScene">
              {/* Studio Desk Surface */}
              <rect x="50" y="20" width="700" height="440" rx="28" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="3" />
              <rect x="65" y="35" width="670" height="410" rx="20" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6,6" />

              {/* Lanyard Strap at the top */}
              <path d="M 385,-10 L 385,60 M 415,-10 L 415,60" stroke="#2563eb" strokeWidth="12" strokeLinecap="round" />
              <rect x="382" y="50" width="36" height="18" rx="4" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
              <ellipse cx="400" cy="68" rx="6" ry="10" fill="none" stroke="#64748b" strokeWidth="3" />

              {/* 🆔 THE STUDENT ID CARD */}
              <g transform="translate(180, 75)" filter="url(#jerinShadow)">
                {/* ID Card Base */}
                <rect x="0" y="0" width="440" height="310" rx="20" fill="url(#idCardBody)" stroke="#2563eb" strokeWidth="3" />

                {/* Card Top Header Banner */}
                <rect x="0" y="0" width="440" height="65" rx="20" fill="url(#cardHolo)" />
                <rect x="0" y="45" width="440" height="20" fill="#2563eb" /> {/* Straight cut under curve */}
                <circle cx="40" cy="32" r="20" fill="#ffffff" opacity="0.9" />
                <text x="40" y="38" fontSize="20" textAnchor="middle">🏫</text>
                <text x="75" y="28" fill="#ffffff" fontSize="13" fontWeight="black" letterSpacing="0.5">
                  MOHONPUR PRIMARY SCHOOL
                </text>
                <text x="75" y="46" fill="#e0f2fe" fontSize="10.5" fontWeight="bold">
                  STUDENT IDENTITY CARD • SESSION 2026
                </text>

                {/* Student Photo Frame */}
                <g transform="translate(25, 80)">
                  <rect x="0" y="0" width="115" height="145" rx="12" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.5" />
                  <rect x="4" y="4" width="107" height="137" rx="9" fill="#eff6ff" />

                  {/* Dynamic Student Face */}
                  <g transform="translate(57, 65)">
                    {/* Head */}
                    <circle cx="0" cy="0" r="32" fill="#fed7aa" />
                    {/* Hair according to avatar */}
                    {selectedAvatar === "jerin" || selectedAvatar === "riya" ? (
                      <g>
                        <path d="M -30,-8 Q 0,-34 30,-8 Q 24,-24 0,-24 Z" fill="#1e293b" />
                        <ellipse cx="-26" cy="2" rx="7" ry="14" fill="#1e293b" />
                        <ellipse cx="26" cy="2" rx="7" ry="14" fill="#1e293b" />
                        <circle cx="-26" cy="-8" r="4" fill="#ef4444" />
                        <circle cx="26" cy="-8" r="4" fill="#ef4444" />
                      </g>
                    ) : (
                      <g>
                        <path d="M -30,-8 Q 0,-34 30,-8 Q 15,-28 -5,-25 Z" fill="#1e293b" />
                      </g>
                    )}
                    {/* Eyes & Smile */}
                    <circle cx="-10" cy="-2" r="3" fill="#1e293b" />
                    <circle cx="10" cy="-2" r="3" fill="#1e293b" />
                    <circle cx="-12" cy="7" r="4" fill="#fca5a5" opacity="0.6" />
                    <circle cx="12" cy="7" r="4" fill="#fca5a5" opacity="0.6" />
                    <path d="M -8,11 Q 0,18 8,11" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    {/* Uniform collar */}
                    <path d="M -22,34 L 0,46 L 22,34 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                    <polygon points="-6,38 0,50 6,38" fill="#dc2626" />
                  </g>

                  {/* Verified Badge */}
                  <g transform="translate(35, 120)">
                    <rect x="0" y="0" width="45" height="16" rx="8" fill="#10b981" />
                    <text x="22" y="11" fill="#ffffff" fontSize="8" fontWeight="black" textAnchor="middle">
                      VERIFIED ✓
                    </text>
                  </g>
                </g>

                {/* Personal Information Rows */}
                <g transform="translate(155, 85)" fontSize="12" fill="#1e293b">
                  {/* Name */}
                  <text x="0" y="14" fill="#64748b" fontSize="10" fontWeight="bold">FULL NAME:</text>
                  <text x="75" y="14" fill="#1e3a8a" fontSize="15" fontWeight="black">{currentProfile.name} ({currentProfile.bangla})</text>

                  {/* Age & Class */}
                  <text x="0" y="42" fill="#64748b" fontSize="10" fontWeight="bold">AGE & CLASS:</text>
                  <text x="75" y="42" fill="#0f172a" fontWeight="black">8 Years Old • Class 3</text>

                  {/* Location */}
                  <text x="0" y="70" fill="#64748b" fontSize="10" fontWeight="bold">ADDRESS:</text>
                  <text x="75" y="70" fill="#0f172a" fontWeight="bold">Mohonpur, Bangladesh</text>

                  {/* Father's Profession */}
                  <text x="0" y="98" fill="#64748b" fontSize="10" fontWeight="bold">FATHER:</text>
                  <text x="75" y="98" fill="#0369a1" fontWeight="bold">School Teacher 👨‍🏫</text>

                  {/* Mother's Profession */}
                  <text x="0" y="126" fill="#64748b" fontSize="10" fontWeight="bold">MOTHER:</text>
                  <text x="75" y="126" fill="#7e22ce" fontWeight="bold">Banker 👩‍💼</text>

                  {/* Sibling */}
                  <text x="0" y="154" fill="#64748b" fontSize="10" fontWeight="bold">BROTHER:</text>
                  <text x="75" y="154" fill="#b45309" fontWeight="bold">2 Years Old 👶</text>
                </g>

                {/* Card Bottom Bar & QR Code */}
                <rect x="0" y="275" width="440" height="35" rx="10" fill="#f1f5f9" stroke="#e2e8f0" />
                <text x="25" y="296" fill="#059669" fontSize="11" fontWeight="black">
                  ⭐ &quot;We are a very happy family.&quot;
                </text>

                {/* Simulated Barcode / Stamp */}
                <g transform="translate(340, 281)" opacity="0.7">
                  <rect x="0" y="0" width="2" height="18" fill="#1e293b" />
                  <rect x="4" y="0" width="3" height="18" fill="#1e293b" />
                  <rect x="9" y="0" width="1" height="18" fill="#1e293b" />
                  <rect x="12" y="0" width="4" height="18" fill="#1e293b" />
                  <rect x="18" y="0" width="2" height="18" fill="#1e293b" />
                  <rect x="22" y="0" width="5" height="18" fill="#1e293b" />
                  <rect x="30" y="0" width="2" height="18" fill="#1e293b" />
                  <rect x="34" y="0" width="4" height="18" fill="#1e293b" />
                  <rect x="40" y="0" width="2" height="18" fill="#1e293b" />
                  <rect x="44" y="0" width="3" height="18" fill="#1e293b" />
                </g>
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
              {/* Outer ping */}
              <circle cx="0" cy="0" r="16" fill="#3b82f6" opacity="0.3" className="animate-ping" />
              {/* Core button */}
              <circle
                cx="0"
                cy="0"
                r="13"
                fill="#ffffff"
                stroke="#2563eb"
                strokeWidth="2.5"
                filter="url(#jerinShadow)"
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
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {viewMode === "campus"
              ? "🏫 মোহনপুর সরকারি প্রাথমিক বিদ্যালয় ও জেরিনের সুখী পরিবার"
              : `🆔 ডিজিটাল আইডি কার্ড স্টুডিও: ${currentProfile.name} • ৩য় শ্রেণি`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setViewMode(viewMode === "campus" ? "id_card" : "campus");
              if (playChime) playChime("click");
            }}
            className="px-2.5 py-1 rounded-xl text-xs font-black bg-purple-100 text-purple-800 hover:bg-purple-200 transition-all flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{viewMode === "campus" ? "আইডি কার্ড দেখুন" : "স্কুল ক্যাম্পাস দেখুন"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
