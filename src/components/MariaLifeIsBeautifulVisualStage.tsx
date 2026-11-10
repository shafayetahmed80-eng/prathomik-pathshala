"use client";

import React, { useState } from "react";
import { 
  Heart, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  Sun, 
  Flower2, 
  Bird, 
  BookOpen, 
  GraduationCap, 
  Hand,
  CheckCircle2,
  Smile
} from "lucide-react";

interface MariaLifeIsBeautifulVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

export const MariaLifeIsBeautifulVisualStage: React.FC<MariaLifeIsBeautifulVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"senses" | "braille" | "dreams">("senses");

  // Interactive sensory experience state
  const [windowWarmth, setWindowWarmth] = useState<boolean>(false);
  const [birdsSinging, setBirdsSinging] = useState<boolean>(false);
  const [flowersSmelled, setFlowersSmelled] = useState<boolean>(false);

  // Braille character exploration
  const [activeBrailleIndex, setActiveBrailleIndex] = useState<number>(0);

  const brailleLetters = [
    { letter: "M", dots: [1, 3, 4], bangla: "ম", sound: "M for Maria" },
    { letter: "A", dots: [1], bangla: "আ", sound: "A for Apple" },
    { letter: "R", dots: [1, 2, 3, 5], bangla: "র", sound: "R for Rose" },
    { letter: "I", dots: [2, 4], bangla: "ই", sound: "I for Inspire" },
    { letter: "A", dots: [1], bangla: "আ", sound: "A for Ambition" },
  ];

  const dreams = [
    {
      title: "Go to University (বিশ্ববিদ্যালয়ে উচ্চশিক্ষা)",
      icon: "🎓",
      desc: "Maria wants to graduate from university with high honours. Her teachers are confident she will succeed!",
      banglaDesc: "শিক্ষকদের পূর্ণ আস্থা—মারিয়া একদিন কৃতিত্বের সাথে বিশ্ববিদ্যালয়ে পড়াশোনা শেষ করবে।"
    },
    {
      title: "Become a Writer (লেখক হয়ে বই রচনা)",
      icon: "✍️",
      desc: "She wants to write an inspiring book about her feelings, experiences, and triumph over challenges.",
      banglaDesc: "নিজের অনুভূতি ও জীবনের অনুপ্রেরণাদায়ী অভিজ্ঞতা নিয়ে একটি সুন্দর বই লিখতে চায়।"
    },
    {
      title: "Set up a School of Her Own (দৃষ্টিপ্রতিবন্ধী শিশুদের জন্য বিদ্যালয়)",
      icon: "🏫",
      desc: "Maria dreams of founding a school where visually impaired children can learn Braille and achieve their dreams.",
      banglaDesc: "দৃষ্টিপ্রতিবন্ধী শিশুদের ব্রেইল পদ্ধতিতে পাঠদান ও স্বাবলম্বী করার জন্য একটি বিদ্যালয় প্রতিষ্ঠা করতে চায়।"
    }
  ];

  const handleTouchWindow = () => {
    setWindowWarmth(true);
    playChime("click");
    handleSpeak("Maria puts her hand on the window glass. It is warm and sunny outside!");
  };

  const handleOpenWindow = () => {
    setBirdsSinging(true);
    playChime("fanfare");
    handleSpeak("Maria opens the window and the sweet singing of birds fills the room!");
  };

  const handleSmellFlowers = () => {
    setFlowersSmelled(true);
    playChime("pop");
    handleSpeak("She can smell the sweet and fresh scent of morning flowers!");
  };

  const handleResetMorning = () => {
    setWindowWarmth(false);
    setBirdsSinging(false);
    setFlowersSmelled(false);
    playChime("click");
  };

  return (
    <div className={`w-full bg-gradient-to-br from-amber-950 via-slate-900 to-rose-950 rounded-2xl border-2 border-amber-500/60 text-white overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xl ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-800/40 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-600/30">
            <Heart className="w-5 h-5 text-rose-200" />
          </div>
          <div>
            <h3 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
              Life is Beautiful: Maria's Inspiring Story
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40">
                Class 5 • Unit 20
              </span>
            </h3>
            <p className="text-xs text-amber-200/80 font-medium">
              বসন্তের সকাল, ব্রেইল লিপিতে স্পর্শের আলো ও মারিয়ার অদম্য স্বপ্নের গল্প
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-amber-900/60 shadow-2xs">
          <button
            onClick={() => { setActiveTab("senses"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "senses" 
                ? "bg-amber-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🌸 বসন্তের পঞ্চইন্দ্রিয়
          </button>
          <button
            onClick={() => { setActiveTab("braille"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "braille" 
                ? "bg-amber-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            ✋ ব্রেইল লিপি অনুশীলন
          </button>
          <button
            onClick={() => { setActiveTab("dreams"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "dreams" 
                ? "bg-amber-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🌟 মারিয়ার স্বপ্ন
          </button>
        </div>
      </div>

      {/* Main Dynamic Stage Body */}
      <div className="my-3 flex-1 flex flex-col justify-center">
        {activeTab === "senses" && (
          <div className="space-y-3">
            {/* Morning Sensory Simulation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Touch Warmth */}
              <div 
                onClick={handleTouchWindow}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  windowWarmth 
                    ? "bg-amber-600/30 border-amber-400 ring-1 ring-amber-400" 
                    : "bg-slate-900/80 border-slate-800 hover:border-amber-600/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Sun className="w-6 h-6 text-amber-400" />
                    {windowWarmth && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">১. স্পর্শে উষ্ণতা অনুভব</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    She puts her hand on the window glass. It is warm!
                  </p>
                </div>
                <button className="mt-3 py-1 px-2 rounded bg-amber-700/60 text-[11px] font-bold text-amber-100 hover:bg-amber-600">
                  {windowWarmth ? "উষ্ণ কাচ স্পর্শিত ✓" : "জানালায় হাত রাখো"}
                </button>
              </div>

              {/* Hearing Birds */}
              <div 
                onClick={handleOpenWindow}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  birdsSinging 
                    ? "bg-sky-600/30 border-sky-400 ring-1 ring-sky-400" 
                    : "bg-slate-900/80 border-slate-800 hover:border-sky-600/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Bird className="w-6 h-6 text-sky-400" />
                    {birdsSinging && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">২. পাখির কলকাকলি</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    She opens the window; singing birds fill the room!
                  </p>
                </div>
                <button className="mt-3 py-1 px-2 rounded bg-sky-700/60 text-[11px] font-bold text-sky-100 hover:bg-sky-600">
                  {birdsSinging ? "পাখির গান শুনছে 🎵" : "জানালা খোলো"}
                </button>
              </div>

              {/* Smelling Flowers */}
              <div 
                onClick={handleSmellFlowers}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  flowersSmelled 
                    ? "bg-rose-600/30 border-rose-400 ring-1 ring-rose-400" 
                    : "bg-slate-900/80 border-slate-800 hover:border-rose-600/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Flower2 className="w-6 h-6 text-rose-400" />
                    {flowersSmelled && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">৩. ফুলের মিষ্টি সুবাস</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    She smells the sweet, fresh flowers outside her home.
                  </p>
                </div>
                <button className="mt-3 py-1 px-2 rounded bg-rose-700/60 text-[11px] font-bold text-rose-100 hover:bg-rose-600">
                  {flowersSmelled ? "মিষ্টি ঘ্রাণ পেল 🌸" : "ফুলের সুবাস নাও"}
                </button>
              </div>
            </div>

            {/* Sensory synthesis quote */}
            <div className="bg-black/40 p-3 rounded-xl border border-white/10 flex items-center justify-between">
              <div className="text-xs text-amber-200">
                <span className="font-bold text-white">মারিয়া দৃষ্টিপ্রতিবন্ধী হলেও তার মন আনন্দ ও ভালোবাসায় পূর্ণ: </span>
                "Maria is happy. She goes to school every day and loves learning!"
              </div>
              {(windowWarmth || birdsSinging || flowersSmelled) && (
                <button 
                  onClick={handleResetMorning}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                  পুনরায় শুরু
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === "braille" && (
          <div className="space-y-3">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-amber-500/40">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
                  <Hand className="w-4 h-4 text-amber-400" />
                  What is Braille? (ব্রেইল লিপি কী?)
                </h4>
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                  Raised Dots (উঁচু বিন্দু)
                </span>
              </div>

              <p className="text-xs text-slate-200 mb-3">
                "Braille is a script that uses raised dots. Each letter is made from dots. People move their fingers across the raised dots to read."
              </p>

              {/* Interactive Braille Word Spell (M-A-R-I-A) */}
              <div className="flex justify-center items-center gap-2 sm:gap-4 my-2">
                {brailleLetters.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveBrailleIndex(idx);
                      playChime("click");
                      handleSpeak(item.sound + ". " + item.bangla);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col items-center min-w-[55px] ${
                      activeBrailleIndex === idx
                        ? "bg-amber-600/40 border-amber-400 scale-105 shadow-md ring-1 ring-amber-400"
                        : "bg-black/40 border-slate-800 hover:border-amber-700"
                    }`}
                  >
                    {/* Simulated 6-dot Braille Cell */}
                    <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-slate-950 rounded-lg border border-white/10 mb-2">
                      {[1, 4, 2, 5, 3, 6].map((dotNum) => (
                        <div
                          key={dotNum}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            item.dots.includes(dotNum)
                              ? "bg-amber-400 shadow-sm shadow-amber-400"
                              : "bg-slate-800"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-black text-sm text-white">{item.letter}</span>
                    <span className="text-[10px] text-amber-300">{item.bangla}</span>
                  </div>
                ))}
              </div>

              {/* Braille Audio Explainer */}
              <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-300">
                  আঙুল বুলিয়ে অনুভব করো: <strong>{brailleLetters[activeBrailleIndex].sound}</strong>
                </span>
                <button
                  onClick={() => {
                    playChime("fanfare");
                    handleSpeak("Maria learned to read Braille as a young child. She reads with her fingertips!");
                  }}
                  className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-xs"
                >
                  <Volume2 className="w-3.5 h-3.5 inline mr-1" />
                  ব্রেইল উচ্চারণ শুনুন
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "dreams" && (
          <div className="space-y-2.5">
            {dreams.map((dream, idx) => (
              <div
                key={idx}
                onClick={() => {
                  playChime("click");
                  handleSpeak(dream.title + ". " + dream.desc);
                }}
                className="bg-slate-900/80 p-3 rounded-xl border border-amber-500/30 hover:border-amber-400 cursor-pointer transition-all flex items-center gap-3"
              >
                <div className="text-3xl shrink-0">{dream.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-amber-200">{dream.title}</h4>
                  <p className="text-xs text-slate-300 mt-0.5">{dream.desc}</p>
                  <p className="text-[11px] text-emerald-300 mt-0.5">{dream.banglaDesc}</p>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-r from-rose-950/40 to-amber-950/40 p-2.5 rounded-xl border border-rose-500/30 flex items-center justify-between text-xs text-rose-200">
              <span className="font-medium">প্রতিবন্ধকতা কোনো বাধা নয়, ইচ্ছাশক্তিই বিজয়ের মূল চাবিকাঠি!</span>
              <button
                onClick={() => {
                  playChime("fanfare");
                  handleSpeak("Life is truly beautiful! Maria teaches us courage, hope, and kindness!");
                }}
                className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-xs shrink-0"
              >
                অনুপ্রেরণা 💖
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Summary Footer */}
      <div className="border-t border-amber-800/40 pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-amber-200/80">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>NCTB English For Today • Class 5 • Unit 20: Life is Beautiful (pp. 78–81)</span>
        </div>
        <div className="flex items-center gap-3 font-semibold">
          <span className="text-amber-300">ব্রেইল লিপি</span>
          <span>•</span>
          <span className="text-rose-300">উঁচু বিন্দু</span>
          <span>•</span>
          <span className="text-emerald-300">অদম্য আশাবাদ</span>
        </div>
      </div>
    </div>
  );
};
