"use client";

import React, { useState } from "react";
import { 
  Home, 
  Tv, 
  BookOpen, 
  Music, 
  Scissors, 
  Sparkles, 
  Volume2, 
  Heart,
  CheckCircle2,
  Smile
} from "lucide-react";

interface SaikatsFamilyVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

export const SaikatsFamilyVisualStage: React.FC<SaikatsFamilyVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"family" | "english" | "hobbies">("family");

  // Selected member profile
  const [selectedMember, setSelectedMember] = useState<"saikat" | "father" | "mother">("saikat");

  // Cartoon TV state
  const [tvPlaying, setTvPlaying] = useState<boolean>(false);

  const familyData = {
    saikat: {
      name: "Saikat Islam",
      bangla: "সৈকত ইসলাম",
      role: "Class 5 Student",
      avatar: "👦",
      hobbies: "Watches cartoons on TV & reads English books about animals (tigers & lions).",
      speech: "Hello, I am Saikat! I live in Bogura. I want to improve my English, so I watch cartoons and read animal storybooks every day!"
    },
    father: {
      name: "Mr. Rashidul Islam",
      bangla: "জনাব রাশিদুল ইসলাম",
      role: "Banker",
      avatar: "👨‍💼",
      hobbies: "Writes creative stories and listens to music in his free time.",
      speech: "I am Saikat's father. I work as a banker, but in my free time I love writing stories and listening to soothing music."
    },
    mother: {
      name: "Mrs. Monwara Islam",
      bangla: "বেগম মনোয়ারা ইসলাম",
      role: "Housewife",
      avatar: "👩",
      hobbies: "Enjoys sewing and making dresses for friends and neighbours.",
      speech: "I am Saikat's mother. In my free time, I love sewing beautiful dresses. My neighbours often order dresses from me!"
    }
  };

  const handleToggleTv = () => {
    setTvPlaying(prev => !prev);
    playChime("pop");
    if (!tvPlaying) {
      handleSpeak("English cartoons are playing on TV! Saikat listens carefully to the English dialogues to improve his vocabulary!");
    }
  };

  const current = familyData[selectedMember];

  return (
    <div className={`w-full bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 rounded-2xl border-2 border-indigo-600/60 text-white overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xl ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-800/40 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <Home className="w-5 h-5 text-indigo-200" />
          </div>
          <div>
            <h3 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
              Saikat's Family in Bogura
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/40">
                Class 5 • Unit 3
              </span>
            </h3>
            <p className="text-xs text-indigo-200/80 font-medium">
              বগুড়ার ফ্ল্যাটে সৈকতের আদর্শ পরিবার, অবসর সময় ও ইংরেজি শেখার অনুপ্রেরণাদায়ী কৌশল
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-indigo-900/60 shadow-2xs">
          <button
            onClick={() => { setActiveTab("family"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "family" 
                ? "bg-indigo-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            👨‍👩‍👦 পরিবার পরিচিতি
          </button>
          <button
            onClick={() => { setActiveTab("english"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "english" 
                ? "bg-purple-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            📺 ইংরেজি শেখার কর্নার
          </button>
          <button
            onClick={() => { setActiveTab("hobbies"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "hobbies" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🎨 শখ ও অবসর সময়
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="my-3 flex-1 flex flex-col justify-center">
        {activeTab === "family" && (
          <div className="space-y-4">
            {/* Interactive Family Selector */}
            <div className="grid grid-cols-3 gap-2.5">
              {(["saikat", "father", "mother"] as const).map((key) => {
                const member = familyData[key];
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedMember(key);
                      playChime("pop");
                      handleSpeak(member.speech);
                    }}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      selectedMember === key
                        ? "bg-indigo-600/40 border-indigo-400 shadow-md ring-2 ring-indigo-300"
                        : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <span className="text-4xl block mb-1">{member.avatar}</span>
                    <h5 className="font-black text-xs text-white">{member.name}</h5>
                    <p className="text-[10px] text-indigo-300">{member.role}</p>
                  </button>
                );
              })}
            </div>

            {/* Selected Member Detail Showcase */}
            <div className="bg-indigo-950/50 p-4 rounded-2xl border border-indigo-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-4xl shrink-0">
                  {current.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-white">{current.name}</h4>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200">
                      {current.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {current.hobbies}
                  </p>
                </div>
              </div>

              <button
                onClick={() => { playChime("click"); handleSpeak(current.speech); }}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shrink-0"
              >
                <Volume2 className="w-4 h-4" />
                <span>পরিচিতি শুনুন</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === "english" && (
          <div className="space-y-4">
            <div className="bg-purple-950/40 p-4 rounded-2xl border border-purple-700/50 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Tv className="w-6 h-6 text-purple-400" />
                  <div>
                    <h4 className="text-sm font-bold text-purple-200">
                      Saikat's English Practice Room (কার্টুন ও বই)
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      সৈকত কীভাবে আনন্দ নিয়ে প্রতিদিন ইংরেজি শেখে তা দেখুন
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleToggleTv}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition-all ${
                    tvPlaying 
                      ? "bg-rose-600 hover:bg-rose-500 text-white" 
                      : "bg-purple-600 hover:bg-purple-500 text-white animate-pulse"
                  }`}
                >
                  <Tv className="w-4 h-4" />
                  <span>{tvPlaying ? "টিভি বন্ধ করুন" : "কার্টুন চালান (Turn on TV)"}</span>
                </button>
              </div>

              {/* TV & Reading Showcase */}
              <div className="h-36 bg-gradient-to-b from-slate-950 to-purple-950 rounded-xl border border-purple-800/80 p-3 flex items-center justify-around relative overflow-hidden">
                {/* Saikat Watching TV */}
                <div className="flex flex-col items-center">
                  <div className="text-5xl">👦📺</div>
                  <span className="text-xs font-bold text-purple-300 mt-1">Watching Cartoons</span>
                  <span className="text-[10px] text-slate-400">Listens to English Dialogues</span>
                </div>

                {/* Animated TV Screen Center */}
                <div className="w-32 h-24 rounded-xl border-4 border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-2 relative shadow-lg">
                  {tvPlaying ? (
                    <div className="flex flex-col items-center animate-bounce">
                      <span className="text-3xl">🐯🦁✨</span>
                      <span className="text-[9px] text-amber-300 font-bold uppercase mt-1">English Fun!</span>
                    </div>
                  ) : (
                    <div className="text-center text-slate-500">
                      <Tv className="w-6 h-6 mx-auto mb-1 opacity-50" />
                      <span className="text-[9px] uppercase font-bold">TV Standby</span>
                    </div>
                  )}
                </div>

                {/* Animal Books */}
                <div className="flex flex-col items-center">
                  <div className="text-5xl">📚🐅</div>
                  <span className="text-xs font-bold text-amber-300 mt-1">Animal Books</span>
                  <span className="text-[10px] text-slate-400">Tigers & Lions</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playChime("fanfare");
                handleSpeak("Saikat is in Class 5. He wants to improve his English, so he watches cartoons on TV every day. He also reads English books about animals, especially tigers and lions!");
              }}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-bold flex items-center justify-center gap-2 border border-slate-700"
            >
              <Volume2 className="w-4 h-4 text-purple-400" />
              <span>ইংরেজি শেখার উপায় শুনুন (Listen to Learning Method)</span>
            </button>
          </div>
        )}

        {activeTab === "hobbies" && (
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Father's Hobby */}
              <div 
                onClick={() => { playChime("pop"); handleSpeak("In his free time, Mr. Islam writes stories and listens to music."); }}
                className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 cursor-pointer hover:border-indigo-400 transition-all flex items-start gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-2xl shrink-0">
                  ✍️🎵
                </div>
                <div>
                  <h5 className="font-black text-xs text-blue-300">Father: Writing & Music</h5>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Mr. Rashidul Islam writes creative stories and listens to music to relax after work.
                  </p>
                </div>
              </div>

              {/* Mother's Hobby */}
              <div 
                onClick={() => { playChime("pop"); handleSpeak("In her free time, Mrs. Monwara Islam enjoys sewing. She makes dresses and gets orders from friends."); }}
                className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 cursor-pointer hover:border-rose-400 transition-all flex items-start gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-2xl shrink-0">
                  🧵👗
                </div>
                <div>
                  <h5 className="font-black text-xs text-rose-300">Mother: Sewing Dresses</h5>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Mrs. Monwara Islam loves sewing dresses and receives orders from friends and neighbours.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playChime("fanfare");
                handleSpeak("Every member of Saikat's family utilizes their free time constructively with healthy creative hobbies and self-improvement!");
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 text-rose-300" />
              <span>পরিবারের গঠনমূলক অবসর সময় উদযাপন করুন</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Footer Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-indigo-800/40 pt-2.5 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-300" />
          <span>Saikat's Family Suite • NCTB Class 5 English</span>
        </div>
        <div className="flex items-center gap-2 text-indigo-300 font-bold">
          <span>📚 Improve English every day (প্রতিদিন ইংরেজি শিখুন)</span>
        </div>
      </div>
    </div>
  );
};

export default SaikatsFamilyVisualStage;
