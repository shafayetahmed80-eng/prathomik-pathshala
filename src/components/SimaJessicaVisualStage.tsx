"use client";

import React, { useState } from "react";
import { 
  Train, 
  Clock, 
  MapPin, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  Heart, 
  MessageCircle,
  Globe,
  Smile
} from "lucide-react";

interface SimaJessicaVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

export const SimaJessicaVisualStage: React.FC<SimaJessicaVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"dialogue" | "platform" | "phrases">("dialogue");

  // Dialogue line counter
  const [dialogueStep, setDialogueStep] = useState<number>(0);

  // Train boarding state
  const [trainBoarded, setTrainBoarded] = useState<boolean>(false);

  const dialogueLines = [
    {
      speaker: "Sima",
      bangla: "সীমা",
      avatar: "👧",
      text: "Hello! May I introduce myself? I'm Sima.",
      meaning: "হ্যালো! আমি কি আমার পরিচয় দিতে পারি? আমি সীমা।"
    },
    {
      speaker: "Jessica",
      bangla: "জেসিকা",
      avatar: "👱‍♀️",
      text: "Hi! I'm Jessica. I'm from the United Kingdom.",
      meaning: "হাই! আমি জেসিকা। আমি যুক্তরাজ্য (যুক্তরাজ্য) থেকে এসেছি।"
    },
    {
      speaker: "Sima",
      bangla: "সীমা",
      avatar: "👧",
      text: "Where are you going, Jessica?",
      meaning: "তুমি কোথায় যাচ্ছ, জেসিকা?"
    },
    {
      speaker: "Jessica",
      bangla: "জেসিকা",
      avatar: "👱‍♀️",
      text: "I'm on holiday with my father. Our train leaves in 10 minutes!",
      meaning: "আমি বাবার সাথে ছুটিতে এসেছি। আমাদের ট্রেন ১০ মিনিট পরই ছাড়বে!"
    },
    {
      speaker: "Sima",
      bangla: "সীমা",
      avatar: "👧",
      text: "I'm going to Sylhet with my family. Have a good journey!",
      meaning: "আমি পরিবারের সাথে সিলেট যাচ্ছি। তোমার যাত্রা শুভ হোক!"
    },
    {
      speaker: "Jessica",
      bangla: "জেসিকা",
      avatar: "👱‍♀️",
      text: "Thanks, Sima! Have a nice time in Sylhet! Goodbye!",
      meaning: "ধন্যবাদ, সীমা! সিলেটে তোমার সময় সুন্দর কাটুক! বিদায়!"
    }
  ];

  const handleNextDialogue = () => {
    if (dialogueStep < dialogueLines.length - 1) {
      const next = dialogueStep + 1;
      setDialogueStep(next);
      playChime("pop");
      handleSpeak(dialogueLines[next].text);
    } else {
      setDialogueStep(0);
      playChime("click");
    }
  };

  const handleBoardTrain = () => {
    setTrainBoarded(true);
    playChime("fanfare");
    handleSpeak("Choo-choo! The train whistle blows! Sima and Jessica board their trains politely and wave goodbye!");
  };

  const handleResetBoarding = () => {
    setTrainBoarded(false);
    playChime("click");
  };

  const currentLine = dialogueLines[dialogueStep];

  return (
    <div className={`w-full bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 rounded-2xl border-2 border-blue-600/60 text-white overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xl ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-800/40 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30">
            <Train className="w-5 h-5 text-blue-200" />
          </div>
          <div>
            <h3 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
              Sima and Jessica at Railway Station
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/40">
                Class 5 • Unit 1
              </span>
            </h3>
            <p className="text-xs text-blue-200/80 font-medium">
              রেলওয়ে স্টেশনে কুশল বিনিময়, পরিচিতি ও ভ্রমণের ভদ্র সম্ভাষণ
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-blue-900/60 shadow-2xs">
          <button
            onClick={() => { setActiveTab("dialogue"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "dialogue" 
                ? "bg-blue-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            💬 কথোপকথন (Dialogue)
          </button>
          <button
            onClick={() => { setActiveTab("platform"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "platform" 
                ? "bg-indigo-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🚉 প্ল্যাটফর্ম ও ঘড়ি
          </button>
          <button
            onClick={() => { setActiveTab("phrases"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "phrases" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🤝 ভদ্র সম্ভাষণ
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="my-3 flex-1 flex flex-col justify-center">
        {activeTab === "dialogue" && (
          <div className="space-y-4">
            {/* Dialogue Exchange Stage */}
            <div className="bg-blue-900/30 p-4 rounded-2xl border border-blue-700/50 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚉</span>
                  <div>
                    <h4 className="text-sm font-bold text-blue-200">
                      Step-by-Step Railway Conversation
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      ধাপে ধাপে সীমা ও জেসিকার সংলাপ শুনুন (ধাপ {dialogueStep + 1} / {dialogueLines.length})
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNextDialogue}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black shadow-md flex items-center gap-1.5 animate-pulse"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>পরবর্তী সংলাপ ➔</span>
                </button>
              </div>

              {/* Character Avatars & Active Bubble */}
              <div className="h-40 bg-gradient-to-b from-slate-950 to-blue-950 rounded-xl border border-blue-800/80 p-3 flex items-center justify-around relative overflow-hidden">
                {/* Sima */}
                <div className={`flex flex-col items-center transition-all ${currentLine.speaker === "Sima" ? "scale-110 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" : "opacity-70"}`}>
                  <div className="text-5xl">👧</div>
                  <span className="text-xs font-black text-rose-300 mt-1">Sima</span>
                  <span className="text-[10px] text-slate-300">Going to Sylhet</span>
                </div>

                {/* Speech Bubble */}
                <div className="bg-slate-900/95 px-4 py-3 rounded-2xl border-2 border-blue-400 max-w-[260px] text-center shadow-xl">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span className="text-xs font-black text-amber-300">{currentLine.speaker}:</span>
                    <button
                      onClick={() => { playChime("pop"); handleSpeak(currentLine.text); }}
                      className="p-1 rounded bg-blue-500/20 hover:bg-blue-500 text-blue-200 hover:text-white"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs font-bold text-white leading-tight">
                    "{currentLine.text}"
                  </p>
                  <p className="text-[10px] text-blue-200/90 mt-1">
                    {currentLine.meaning}
                  </p>
                </div>

                {/* Jessica */}
                <div className={`flex flex-col items-center transition-all ${currentLine.speaker === "Jessica" ? "scale-110 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]" : "opacity-70"}`}>
                  <div className="text-5xl">👱‍♀️</div>
                  <span className="text-xs font-black text-amber-300 mt-1">Jessica</span>
                  <span className="text-[10px] text-slate-300">From United Kingdom</span>
                </div>
              </div>
            </div>

            {/* Quick Play Audio Button */}
            <button
              onClick={() => {
                playChime("click");
                handleSpeak("Sima and Jessica are at the railway station. They are talking. Sima is going to Sylhet with her family. Jessica is from the United Kingdom on holiday.");
              }}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-bold flex items-center justify-center gap-2 border border-slate-700"
            >
              <Volume2 className="w-4 h-4 text-blue-400" />
              <span>সম্পূর্ণ প্রেক্ষাপট শুনুন (Listen to Full Introduction)</span>
            </button>
          </div>
        )}

        {activeTab === "platform" && (
          <div className="space-y-4">
            <div className="bg-indigo-950/40 p-4 rounded-2xl border border-indigo-700/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <div>
                    <h4 className="text-sm font-bold text-indigo-200">
                      Platform 1 & 2: Trains Leaving Soon
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      জেসিকার ট্রেন ছাড়তে বাকি মাত্র ১০ মিনিট!
                    </p>
                  </div>
                </div>

                {!trainBoarded ? (
                  <button
                    onClick={handleBoardTrain}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-xs font-black shadow-md flex items-center gap-1.5 animate-bounce"
                  >
                    <Train className="w-4 h-4" />
                    <span>ট্রেনে উঠুন (Board Train!)</span>
                  </button>
                ) : (
                  <button
                    onClick={handleResetBoarding}
                    className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>প্ল্যাটফর্মে ফিরে যান</span>
                  </button>
                )}
              </div>

              {/* Train Simulation Stage */}
              <div className="h-36 bg-gradient-to-b from-slate-950 to-indigo-950 rounded-xl border border-indigo-800/80 p-3 flex items-center justify-around relative overflow-hidden">
                {/* Sima's Train */}
                <div className="flex flex-col items-center">
                  <div className="text-5xl">🚂</div>
                  <span className="text-xs font-bold text-emerald-300 mt-1">Sylhet Express</span>
                  <span className="text-[10px] text-slate-400">Platform 1 (Sima)</span>
                </div>

                {/* Departure Clock Center */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-4 border-amber-400 bg-black/60 flex flex-col items-center justify-center shadow-lg">
                    <span className="text-xs font-black text-amber-300">10 min</span>
                    <span className="text-[9px] text-slate-300 uppercase">Leaving</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase mt-1 ${trainBoarded ? "text-emerald-400" : "text-amber-300"}`}>
                    {trainBoarded ? "Train Departed! ✓" : "Waiting for Signal"}
                  </span>
                </div>

                {/* Jessica's Train */}
                <div className="flex flex-col items-center">
                  <div className="text-5xl">🚆</div>
                  <span className="text-xs font-bold text-rose-300 mt-1">Holiday Special</span>
                  <span className="text-[10px] text-slate-400">Platform 2 (Jessica)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "phrases" && (
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div 
                onClick={() => { playChime("pop"); handleSpeak("May I introduce myself? I'm Sima."); }}
                className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 cursor-pointer hover:border-blue-400 transition-all"
              >
                <span className="text-xs font-bold text-blue-300">1. Making Introduction</span>
                <p className="text-xs text-white font-black mt-0.5">"May I introduce myself?"</p>
                <p className="text-[11px] text-slate-300 mt-0.5">আমি কি নিজের পরিচয় দিতে পারি?</p>
              </div>

              <div 
                onClick={() => { playChime("pop"); handleSpeak("Have a good journey!"); }}
                className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 cursor-pointer hover:border-emerald-400 transition-all"
              >
                <span className="text-xs font-bold text-emerald-300">2. Wishing Safe Travel</span>
                <p className="text-xs text-white font-black mt-0.5">"Have a good journey!"</p>
                <p className="text-[11px] text-slate-300 mt-0.5">তোমার যাত্রা শুভ হোক!</p>
              </div>

              <div 
                onClick={() => { playChime("pop"); handleSpeak("Have a nice time in Sylhet!"); }}
                className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 cursor-pointer hover:border-amber-400 transition-all"
              >
                <span className="text-xs font-bold text-amber-300">3. Wishing a Good Time</span>
                <p className="text-xs text-white font-black mt-0.5">"Have a nice time in Sylhet!"</p>
                <p className="text-[11px] text-slate-300 mt-0.5">সিলেটে সুন্দর সময় কাটাও!</p>
              </div>

              <div 
                onClick={() => { playChime("pop"); handleSpeak("Goodbye! Nice meeting you!"); }}
                className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 cursor-pointer hover:border-rose-400 transition-all"
              >
                <span className="text-xs font-bold text-rose-300">4. Polite Farewell</span>
                <p className="text-xs text-white font-black mt-0.5">"Goodbye! Nice meeting you!"</p>
                <p className="text-[11px] text-slate-300 mt-0.5">বিদায়! তোমার সাথে দেখা হয়ে ভালো লাগল!</p>
              </div>
            </div>

            <button
              onClick={() => {
                playChime("fanfare");
                handleSpeak("Remember these polite expressions whenever you travel: May I introduce myself? Have a good journey! Nice meeting you! Goodbye!");
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Smile className="w-4 h-4" />
              <span>ভদ্র সম্ভাষণগুলো একসাথে অনুশীলন করুন (Practice Expressions)</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Footer Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-blue-800/40 pt-2.5 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-300" />
          <span>Sima & Jessica Suite • NCTB Class 5 English</span>
        </div>
        <div className="flex items-center gap-2 text-blue-300 font-bold">
          <span>🚂 Have a good journey! (যাত্রা শুভ হোক)</span>
        </div>
      </div>
    </div>
  );
};

export default SimaJessicaVisualStage;
