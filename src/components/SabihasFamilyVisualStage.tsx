"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Volume2, Heart, Users, Home, Award, Check, Smile, UserCheck, Star, BookOpen } from "lucide-react";
import confetti from "canvas-confetti";

interface SabihasFamilyVisualStageProps {
  slideId: number;
  playChime?: (type: "correct" | "click" | "fanfare") => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  banglaRelation: string;
  age: string;
  role: string;
  icon: string;
  voiceIntro: string;
}

export default function SabihasFamilyVisualStage({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}: SabihasFamilyVisualStageProps) {
  // Modes: "family_home" | "family_tree" | "roles"
  const [activeMode, setActiveMode] = useState<"family_home" | "family_tree" | "roles">(() => {
    if (slideId === 5) return "family_tree";
    if (slideId === 6) return "roles";
    return "family_home";
  });

  // Selected Family Member Spotlight
  const [selectedMemberId, setSelectedMemberId] = useState<string>("sabiha");

  // Family Tree Quiz / Matching State
  const [matchedMembers, setMatchedMembers] = useState<Record<string, boolean>>({
    father: true,
    mother: true,
    sabiha: true,
    alvi: true,
  });

  // Sync mode with slide changes
  useEffect(() => {
    if (slideId === 5) {
      setActiveMode("family_tree");
    } else if (slideId === 6) {
      setActiveMode("roles");
    } else {
      setActiveMode("family_home");
    }
  }, [slideId]);

  const MEMBERS: FamilyMember[] = [
    {
      id: "father",
      name: "Mr. Aminul Islam",
      relation: "Father",
      banglaRelation: "বাবা / পিতা",
      age: "৪০ বছর",
      role: "Primary School Teacher (প্রাথমিক বিদ্যালয়ের শিক্ষক)",
      icon: "👨‍🏫",
      voiceIntro: "Her father, Mr. Aminul Islam, is a dedicated primary school teacher who loves teaching young children.",
    },
    {
      id: "mother",
      name: "Mrs. Fatema Begum",
      relation: "Mother",
      banglaRelation: "মা / মাতা",
      age: "৩৫ বছর",
      role: "Caring Homemaker (যত্নশীল গৃহিণী)",
      icon: "👩‍🍳",
      voiceIntro: "Her mother, Mrs. Fatema Begum, is a caring homemaker who takes loving care of the whole family.",
    },
    {
      id: "sabiha",
      name: "Sabiha",
      relation: "Daughter / Sister",
      banglaRelation: "সাবিহা (বড় বোন)",
      age: "৮ বছর (Eight years old)",
      role: "Student of Class 3 (৩য় শ্রেণির শিক্ষার্থী)",
      icon: "👧",
      voiceIntro: "Sabiha is eight years old and studies attentively in Class 3 at the village school.",
    },
    {
      id: "alvi",
      name: "Alvi",
      relation: "Younger Brother",
      banglaRelation: "আলভী (ছোট ভাই)",
      age: "৩ বছর (Three years old)",
      role: "Playful toddler (চঞ্চল ছোট ভাই)",
      icon: "👶",
      voiceIntro: "Alvi is Sabiha's younger brother. He is only three years old and loves playing with his toy ball.",
    },
  ];

  const currentMember = MEMBERS.find((m) => m.id === selectedMemberId) || MEMBERS[2];

  const handleSelectMember = (id: string) => {
    setSelectedMemberId(id);
    playChime?.("click");
    const member = MEMBERS.find((m) => m.id === id);
    if (member) {
      handleSpeak(member.voiceIntro);
    }
  };

  const handleTriggerFamilyLove = () => {
    playChime?.("fanfare");
    handleSpeak("They live in a peaceful village and love each other dearly! We are a happy family!");
    confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className={`flex flex-col h-full rounded-3xl bg-linear-to-b from-amber-50 via-rose-50 to-emerald-50 border border-slate-200 shadow-2xs overflow-hidden ${isFullTheater ? "p-4 sm:p-6" : "p-3 sm:p-4"}`}>
      {/* Top Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2.5 border-b border-amber-200/80 shrink-0">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-2xl bg-amber-500 text-white shadow-xs text-base">
            🏡
          </span>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-200">
                Unit 2 • Lesson 3
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                4 Family Members
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-black text-slate-800">
              My Family — Sabiha's Family (সাবিহার পরিবার)
            </h3>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 bg-white/80 p-1 rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => {
              setActiveMode("family_home");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 whitespace-nowrap ${
              activeMode === "family_home"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>👨‍👩‍👧‍👦</span>
            <span>পরিবারের সদস্য</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode("family_tree");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 whitespace-nowrap ${
              activeMode === "family_tree"
                ? "bg-rose-500 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>🌳</span>
            <span>ফ্যামিলি ট্রি</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode("roles");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 whitespace-nowrap ${
              activeMode === "roles"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>💼</span>
            <span>পেশা ও ভূমিকা</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Canvas */}
      <div className="relative flex-1 min-h-[300px] w-full mt-2.5 rounded-2xl overflow-hidden border border-amber-200/80 bg-linear-to-b from-sky-100 via-amber-50 to-emerald-100 select-none flex flex-col justify-between p-3">
        {/* Village Backdrop: Blue sky, trees & cozy village cottage */}
        <div className="absolute top-2.5 left-3 z-10 flex items-center gap-2">
          <div className="px-3 py-1 rounded-xl bg-white/95 backdrop-blur-xs border border-amber-300 shadow-2xs text-[11px] font-black text-amber-950 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-amber-600" />
            <span>শান্তিময় গ্রামীণ আবাস • ৪ জনের সুখী পরিবার</span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MODE 1: FAMILY LIVING ROOM & MEMBER SPOTLIGHT                 */}
        {/* ------------------------------------------------------------- */}
        {activeMode === "family_home" && (
          <div className="relative w-full h-full flex flex-col justify-between z-10 pt-8">
            {/* 4 Interactive Family Characters standing together */}
            <div className="flex-1 flex items-end justify-center gap-3 sm:gap-6 my-2">
              {MEMBERS.map((member) => {
                const isSelected = selectedMemberId === member.id;
                return (
                  <div
                    key={member.id}
                    onClick={() => handleSelectMember(member.id)}
                    className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "scale-110 -translate-y-2"
                        : "opacity-85 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    {/* Speech Badge */}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-black shadow-xs mb-1 whitespace-nowrap transition-all ${
                        isSelected
                          ? "bg-rose-500 text-white animate-bounce ring-2 ring-amber-300"
                          : "bg-white/90 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {member.name}
                    </span>

                    {/* Character Avatar Icon */}
                    <div
                      className={`relative p-2 rounded-2xl transition-all ${
                        isSelected
                          ? "bg-white shadow-lg border-2 border-rose-400 ring-4 ring-rose-200"
                          : "bg-white/70 shadow-2xs border border-slate-200"
                      }`}
                    >
                      <span className="text-3xl sm:text-5xl">{member.icon}</span>
                      {isSelected && (
                        <span className="absolute -top-2 -right-2 text-xs">⭐</span>
                      )}
                    </div>

                    {/* Relation Tag */}
                    <span className="mt-1 text-[10px] font-bold text-slate-700 bg-white/80 px-1.5 py-0.2 rounded-md shadow-2xs">
                      {member.relation}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Selected Member Info Spotlight Card */}
            <div className="mt-2 p-3 rounded-2xl bg-white/95 backdrop-blur-xs border-2 border-rose-300 shadow-md flex items-start justify-between gap-3 animate-in fade-in">
              <div className="flex items-start gap-3">
                <span className="text-3xl p-1.5 rounded-2xl bg-rose-100 border border-rose-200 shrink-0">
                  {currentMember.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-black text-xs sm:text-sm text-slate-900">{currentMember.name}</h4>
                    <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                      {currentMember.banglaRelation}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">
                      বয়স: {currentMember.age}
                    </span>
                  </div>
                  <p className="text-[11px] text-rose-900 font-bold mt-0.5">
                    {currentMember.role}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    {currentMember.voiceIntro}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleSpeak(currentMember.voiceIntro)}
                  className="p-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 transition-all shadow-2xs"
                  title="পরিচিতি শুনুন"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleTriggerFamilyLove}
                  className="px-2.5 py-1 rounded-xl text-[10px] font-black bg-rose-500 hover:bg-rose-600 text-white transition-all shadow-xs flex items-center gap-1"
                >
                  <Heart className="w-3 h-3 fill-current" />
                  <span>ভালোবাসা ❤️</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE 2: INTERACTIVE FAMILY TREE                               */}
        {/* ------------------------------------------------------------- */}
        {activeMode === "family_tree" && (
          <div className="relative w-full h-full flex flex-col justify-between z-10 pt-4">
            {/* Top Tree Banner */}
            <div className="bg-emerald-900/90 text-white p-2.5 rounded-2xl border border-emerald-700 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌳</span>
                <div>
                  <h4 className="text-xs font-black">সাবিহার ফ্যামিলি ট্রি (Family Tree Structure)</h4>
                  <p className="text-[10px] text-emerald-200">"There are four members in her family."</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-emerald-950">
                Parents & Children
              </span>
            </div>

            {/* Visual Tree Hierarchy */}
            <div className="flex-1 flex flex-col items-center justify-center my-2">
              {/* Generation 1: Parents */}
              <div className="flex items-center gap-8 relative">
                {/* Father */}
                <div
                  onClick={() => handleSelectMember("father")}
                  className="p-2 rounded-2xl bg-white border-2 border-emerald-300 shadow-sm flex flex-col items-center cursor-pointer hover:scale-105"
                >
                  <span className="text-3xl">👨‍🏫</span>
                  <span className="text-[10px] font-black text-slate-800">Mr. Aminul Islam</span>
                  <span className="text-[9px] font-bold text-emerald-700">Father (বাবা)</span>
                </div>

                <span className="text-xl text-rose-500">❤️</span>

                {/* Mother */}
                <div
                  onClick={() => handleSelectMember("mother")}
                  className="p-2 rounded-2xl bg-white border-2 border-emerald-300 shadow-sm flex flex-col items-center cursor-pointer hover:scale-105"
                >
                  <span className="text-3xl">👩‍🍳</span>
                  <span className="text-[10px] font-black text-slate-800">Mrs. Fatema Begum</span>
                  <span className="text-[9px] font-bold text-emerald-700">Mother (মা)</span>
                </div>
              </div>

              {/* Connecting Tree Lines */}
              <div className="w-0.5 h-6 bg-emerald-400 my-1" />
              <div className="w-36 h-0.5 bg-emerald-400 mb-1" />

              {/* Generation 2: Children */}
              <div className="flex items-center gap-8">
                {/* Daughter Sabiha */}
                <div
                  onClick={() => handleSelectMember("sabiha")}
                  className="p-2 rounded-2xl bg-white border-2 border-rose-300 shadow-sm flex flex-col items-center cursor-pointer hover:scale-105"
                >
                  <span className="text-3xl">👧</span>
                  <span className="text-[10px] font-black text-slate-800">Sabiha (8 yrs)</span>
                  <span className="text-[9px] font-bold text-rose-700">Daughter (মেয়ে)</span>
                </div>

                {/* Son Alvi */}
                <div
                  onClick={() => handleSelectMember("alvi")}
                  className="p-2 rounded-2xl bg-white border-2 border-amber-300 shadow-sm flex flex-col items-center cursor-pointer hover:scale-105"
                >
                  <span className="text-3xl">👶</span>
                  <span className="text-[10px] font-black text-slate-800">Alvi (3 yrs)</span>
                  <span className="text-[9px] font-bold text-amber-700">Son (ছেলে)</span>
                </div>
              </div>
            </div>

            {/* Bottom Lesson Motto */}
            <div className="p-2.5 rounded-2xl bg-white border border-emerald-200 text-center text-xs text-emerald-950 font-bold">
              বাবা, মা, সাবিহা এবং ছোট ভাই আলভী—এই চারজন নিয়ে সাবিহার একটি আদর্শ ও ভালোবাসাপূর্ণ পরিবার।
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE 3: ROLES & OCCUPATIONS EXPLORER                          */}
        {/* ------------------------------------------------------------- */}
        {activeMode === "roles" && (
          <div className="relative w-full h-full flex flex-col justify-between z-10 pt-4">
            {/* Top Banner */}
            <div className="bg-amber-900/90 text-white p-2.5 rounded-2xl border border-amber-700 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">💼</span>
                <div>
                  <h4 className="text-xs font-black">পেশা ও দায়িত্ব ল্যাব (Occupations & Daily Roles)</h4>
                  <p className="text-[10px] text-amber-200">পরিবারের সদস্যদের ভিন্ন ভিন্ন ভূমিকা ও পেশা জানুন</p>
                </div>
              </div>
            </div>

            {/* 4 Occupation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 flex-1">
              <div
                onClick={() => handleSpeak("Mr. Aminul Islam is a primary school teacher.")}
                className="p-2.5 rounded-2xl bg-white border-2 border-amber-300 hover:border-amber-500 cursor-pointer shadow-2xs flex items-start gap-2.5"
              >
                <span className="text-3xl p-1 rounded-xl bg-amber-100">👨‍🏫</span>
                <div>
                  <h5 className="font-black text-xs text-slate-900">Teacher (শিক্ষক)</h5>
                  <p className="text-[10px] text-amber-800 font-bold">পিতা: জনাব আমিনুল ইসলাম</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    প্রাথমিক বিদ্যালয়ে শিশুদের পরম স্নেহে পাঠদান করেন।
                  </p>
                </div>
              </div>

              <div
                onClick={() => handleSpeak("Mrs. Fatema Begum is a caring homemaker.")}
                className="p-2.5 rounded-2xl bg-white border-2 border-rose-300 hover:border-rose-500 cursor-pointer shadow-2xs flex items-start gap-2.5"
              >
                <span className="text-3xl p-1 rounded-xl bg-rose-100">👩‍🍳</span>
                <div>
                  <h5 className="font-black text-xs text-slate-900">Homemaker (গৃহিণী)</h5>
                  <p className="text-[10px] text-rose-800 font-bold">মাতা: ফাতেমা বেগম</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    রান্নাবান্না, ঘর সাজানো এবং সবার যত্ন নেওয়ার দায়িত্ব পালন করেন।
                  </p>
                </div>
              </div>

              <div
                onClick={() => handleSpeak("Sabiha is eight years old and studies in Class 3.")}
                className="p-2.5 rounded-2xl bg-white border-2 border-emerald-300 hover:border-emerald-500 cursor-pointer shadow-2xs flex items-start gap-2.5"
              >
                <span className="text-3xl p-1 rounded-xl bg-emerald-100">👧</span>
                <div>
                  <h5 className="font-black text-xs text-slate-900">Student (শিক্ষার্থী)</h5>
                  <p className="text-[10px] text-emerald-800 font-bold">কন্যা: সাবিহা (৮ বছর)</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    ৩য় শ্রেণির মনোযোগী ছাত্রী এবং ক্লাসের ভালো বন্ধুদের একজন।
                  </p>
                </div>
              </div>

              <div
                onClick={() => handleSpeak("Alvi is three years old and plays happily.")}
                className="p-2.5 rounded-2xl bg-white border-2 border-sky-300 hover:border-sky-500 cursor-pointer shadow-2xs flex items-start gap-2.5"
              >
                <span className="text-3xl p-1 rounded-xl bg-sky-100">👶</span>
                <div>
                  <h5 className="font-black text-xs text-slate-900">Younger Brother (ছোট ভাই)</h5>
                  <p className="text-[10px] text-sky-800 font-bold">পুত্র: আলভী (৩ বছর)</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    পরিবারের সবার আনন্দ ও ভালোবাসার কেন্দ্রবিন্দু।
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Card */}
            <div className="p-2 rounded-2xl bg-white border border-amber-200 text-center text-xs text-amber-950 font-bold">
              "They live in a peaceful village and love each other dearly."
            </div>
          </div>
        )}
      </div>

      {/* Footer Educational Motto Bar */}
      <div className="mt-2.5 pt-2 border-t border-amber-200/80 flex items-center justify-between text-[11px] text-amber-950 font-bold shrink-0">
        <span className="flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>"We love and respect all members of our family."</span>
        </span>
        <span className="text-amber-800 text-[10px] font-semibold hidden sm:inline">
          আমাদের পরিবারই আমাদের সুখ ও শক্তির ঠিকানা ❤️
        </span>
      </div>
    </div>
  );
}
