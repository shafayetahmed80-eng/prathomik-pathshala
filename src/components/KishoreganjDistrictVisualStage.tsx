"use client";

import React, { useState } from "react";
import { 
  MapPin, 
  Landmark, 
  Award, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  Building2, 
  CheckCircle2, 
  Compass,
  BookOpen
} from "lucide-react";

interface KishoreganjDistrictVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

export const KishoreganjDistrictVisualStage: React.FC<KishoreganjDistrictVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"stats" | "landmarks" | "personalities">("stats");
  const [selectedLandmark, setSelectedLandmark] = useState<number>(0);
  const [selectedPerson, setSelectedPerson] = useState<number>(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);

  const stats = [
    { label: "দূরত্ব (Distance from Dhaka)", value: "145 km", icon: "🚗", detail: "ঢাকা থেকে সড়কপথে প্রায় ১৪৫ কিলোমিটার" },
    { label: "পৌরসভা (Municipalities)", value: "8", icon: "🏛️", detail: "কিশোরগঞ্জ পৌরসভাসহ মোট ৮টি পৌরসভা" },
    { label: "উপজেলা (Upazilas)", value: "13", icon: "🏢", detail: "করিমগঞ্জ, বাজিতপুর, কটিয়াদীসহ ১৩টি উপজেলা" },
    { label: "ইউনিয়ন (Unions)", value: "108", icon: "🏘️", detail: "সমগ্র জেলায় ১০৮টি ইউনিয়ন পরিষদ" },
    { label: "গ্রাম (Villages)", value: "1,745", icon: "🌾", detail: "সবুজ শ্যামল ১৭৪৫টি গ্রাম" },
    { label: "পৌরসভা আয়তন (Town Area)", value: "10 sq km", icon: "📐", detail: "শহরের মূল আয়তন প্রায় ১০ বর্গ কিমি" },
  ];

  const landmarks = [
    {
      name: "Solakia Eid Ground (শোলাকিয়া ঈদগাহ)",
      tag: "সবচেয়ে বড় ঈদ জামাত",
      desc: "The largest Eid fairgrounds where hundreds of thousands of people gather for Eid prayers.",
      banglaDesc: "বাংলাদেশের বৃহত্তম ঈদের জামাতের জন্য বিশ্ববিখ্যাত ঐতিহাসিক ময়দান।",
      fact: "Hundreds of thousands gather here for Eid congregation.",
      icon: "🕌",
      color: "from-emerald-600/30 to-teal-900/40 border-emerald-500/50"
    },
    {
      name: "Pagla Mosque (পাগলা মসজিদ)",
      tag: "নরসুন্দা নদীর তীরে",
      desc: "A well-known historic mosque on the bank of the Narasunda river where people donate generously.",
      banglaDesc: "নরসুন্দা নদীর তীরে অবস্থিত সুবিখ্যাত প্রাচীন পাগলা মসজিদ।",
      fact: "Known for extraordinary charitable donations and historic heritage.",
      icon: "🪙",
      color: "from-amber-600/30 to-yellow-900/40 border-amber-500/50"
    },
    {
      name: "Fort of Isa Khan, Jangalbari (ঈশা খাঁর জঙ্গলবাড়ি দুর্গ)",
      tag: "বারো ভূঁইয়ার দুর্গ",
      desc: "The historic fortress of Isa Khan, leader of the Baro-Bhuiyans, located at Jangalbari outside the town.",
      banglaDesc: "বাংলার বারো ভূঁইয়ার প্রধান বীর ঈশা খাঁর ঐতিহাসিক জঙ্গলবাড়ি দুর্গ।",
      fact: "Rich Mughal-era defense architecture in Bengal.",
      icon: "🏰",
      color: "from-orange-600/30 to-red-900/40 border-orange-500/50"
    },
    {
      name: "Shah Muhammad Mosque (শাহ মুহাম্মদ মসজিদ)",
      tag: "এগারসিন্দুর",
      desc: "A magnificent single-domed medieval mosque with exquisite terracotta design at Egaroshindhur.",
      banglaDesc: "এগারসিন্দুরে অবস্থিত অপরূপ মধ্যযুগীয় পোড়ামাটির অলংকরণযুক্ত মসজিদ।",
      fact: "Built in the 17th century with terracotta decorations.",
      icon: "✨",
      color: "from-blue-600/30 to-cyan-900/40 border-blue-500/50"
    },
    {
      name: "River Narasunda (নরসুন্দা নদী)",
      tag: "শহরের প্রাণপ্রবাহ",
      desc: "The tranquil river that gracefully flows through Kishoreganj town, creating a picturesque waterfront.",
      banglaDesc: "কিশোরগঞ্জ শহরের বুক চিরে বয়ে যাওয়া ঐতিহাসিক নরসুন্দা নদী ও লেকসিটি।",
      fact: "Flows right through the heart of the district town.",
      icon: "⛵",
      color: "from-sky-600/30 to-indigo-900/40 border-sky-500/50"
    }
  ];

  const personalities = [
    {
      name: "Chandrabati (চন্দ্রাবতী)",
      role: "First Woman Poet of Bangla Literature",
      banglaRole: "বাংলা সাহিত্যের প্রথম মহিলা কবি",
      achievement: "Wrote the poetic Bangla Ramayana from Sita's perspective.",
      banglaText: "তিনি ষোড়শ শতকে পাতুলী গ্রামে জন্মগ্রহণ করে রামায়ণ কাব্য রচনা করেন।",
      icon: "🪶",
      color: "from-rose-500/20 to-pink-900/30 border-rose-400/40"
    },
    {
      name: "Upendrakishore Roy Chowdhury & Sukumar Ray",
      role: "Pioneers of Children's Literature",
      banglaRole: "শিশুসাহিত্যের অমর স্রষ্টাদ্বয় (পিতা ও পুত্র)",
      achievement: "Famous for 'Tuntuni', 'Goopy Gyne Bagha Byne', and 'Abol Tabol'.",
      banglaText: "কিশোরগঞ্জের কটিয়াদীর মসূয়া গ্রামে এই ক্ষণজন্মা রায় পরিবারের আদি নিবাস।",
      icon: "📚",
      color: "from-amber-500/20 to-orange-900/30 border-amber-400/40"
    },
    {
      name: "Shilpacharya Zainul Abedin (শিল্পাচার্য জয়নুল আবেদিন)",
      role: "Pioneer of Modern Bangladeshi Art",
      banglaRole: "আধুনিক বাংলাদেশি চিত্রকলার জনক",
      achievement: "World-famous for his heart-touching 1943 Famine Sketches.",
      banglaText: "তাঁর কালজয়ী দুর্ভিক্ষ চিত্রমালার জন্য তিনি বিশ্বজুড়ে বরেণ্য ও স্মরণীয়।",
      icon: "🎨",
      color: "from-emerald-500/20 to-teal-900/30 border-emerald-400/40"
    },
    {
      name: "Syed Nazrul Islam (সৈয়দ নজরুল ইসলাম)",
      role: "First Acting President of Bangladesh",
      banglaRole: "মুজিবনগর সরকারের প্রথম অস্থায়ী রাষ্ট্রপতি",
      achievement: "Led the historic 1971 Mujibnagar Government during the Liberation War.",
      banglaText: "১৯৭১ সালের মহান মুক্তিযুদ্ধে বাংলাদেশের প্রথম অস্থায়ী রাষ্ট্রপতির দায়িত্ব পালন করেন।",
      icon: "🎖️",
      color: "from-indigo-500/20 to-purple-900/30 border-indigo-400/40"
    }
  ];

  const handleSelectLandmark = (idx: number) => {
    setSelectedLandmark(idx);
    playChime("click");
    handleSpeak(landmarks[idx].name + ". " + landmarks[idx].desc);
  };

  const handleSelectPerson = (idx: number) => {
    setSelectedPerson(idx);
    playChime("click");
    handleSpeak(personalities[idx].name + ". " + personalities[idx].role + ". " + personalities[idx].achievement);
  };

  const handleQuiz = (isCorrect: boolean) => {
    if (isCorrect) {
      setQuizAnswered(true);
      playChime("fanfare");
      handleSpeak("Correct! The largest Eid fairground in Bangladesh is Solakia Eid Ground in Kishoreganj!");
    } else {
      playChime("wrong");
      handleSpeak("Try again! Remember, hundreds of thousands pray at Solakia!");
    }
  };

  return (
    <div className={`w-full bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 rounded-2xl border-2 border-teal-600/60 text-white overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xl ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal-800/40 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/30">
            <Compass className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <h3 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
              My Home District: Kishoreganj
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/40">
                Class 5 • Unit 10
              </span>
            </h3>
            <p className="text-xs text-teal-200/80 font-medium">
              ঐতিহাসিক শোলাকিয়া ঈদগাহ, নদী নরসুন্দা ও বরেণ্য মনীষীদের গৌরবময় জেলা
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-teal-900/60 shadow-2xs">
          <button
            onClick={() => { setActiveTab("stats"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "stats" 
                ? "bg-teal-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            📊 জেলার তথ্য
          </button>
          <button
            onClick={() => { setActiveTab("landmarks"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "landmarks" 
                ? "bg-teal-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🕌 দর্শনীয় স্থান
          </button>
          <button
            onClick={() => { setActiveTab("personalities"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "personalities" 
                ? "bg-teal-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            ⭐ বরেণ্য কৃতী সন্তান
          </button>
        </div>
      </div>

      {/* Main Dynamic Stage Content */}
      <div className="my-3 flex-1 flex flex-col justify-center">
        {activeTab === "stats" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-teal-900/40 via-cyan-900/30 to-blue-900/40 p-3 rounded-xl border border-teal-700/50 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-teal-200 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  নামকরণের ইতিহাস (Origin of Name)
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  The name Kishoreganj comes from an old landlord known as <strong>Brojosundor Roy</strong> or <strong>Brojokishore Roy</strong>.
                </p>
              </div>
              <button 
                onClick={() => {
                  playChime("click");
                  handleSpeak("The name Kishoreganj comes from the name of an old landlord known as Brojosundor Roy or Brojokishore Roy.");
                }}
                className="p-2 rounded-lg bg-teal-700/50 hover:bg-teal-600 text-teal-100 transition-colors"
                title="Listen explanation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Grid of District Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {stats.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    playChime("click");
                    handleSpeak(`${item.label}: ${item.value}. ${item.detail}`);
                  }}
                  className="bg-slate-900/80 p-2.5 sm:p-3 rounded-xl border border-teal-800/40 hover:border-teal-400/60 cursor-pointer transition-all hover:scale-[1.02] shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-base sm:text-lg font-black text-amber-300 font-mono">
                      {item.value}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-teal-200">{item.label}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{item.detail}</p>
                </div>
              ))}
            </div>

            {/* Quick interactive check */}
            <div className="bg-slate-900/90 p-3 rounded-xl border border-amber-500/40 flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs text-amber-200">
                <span className="font-bold">কুইজ:</span> কিশোরগঞ্জ শহরের বুক চিরে কোন নদী বয়ে গেছে?
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleQuiz(false)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700"
                >
                  পদ্মা
                </button>
                <button
                  onClick={() => {
                    playChime("fanfare");
                    handleSpeak("Correct! The river Narasunda flows through Kishoreganj town!");
                  }}
                  className="px-2.5 py-1 rounded bg-teal-600 hover:bg-teal-500 text-xs font-bold text-white shadow-xs"
                >
                  নরসুন্দা নদী (Narasunda)
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "landmarks" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
            {/* Landmark Selector list */}
            <div className="md:col-span-5 space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {landmarks.map((lm, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectLandmark(idx)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                    selectedLandmark === idx
                      ? "bg-teal-600/30 border-teal-400 text-white shadow-md scale-[1.01]"
                      : "bg-slate-900/70 border-slate-800 hover:border-teal-700 text-slate-300"
                  }`}
                >
                  <span className="text-2xl">{lm.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate text-teal-100">{lm.name}</p>
                    <p className="text-[10px] text-amber-300 font-medium">{lm.tag}</p>
                  </div>
                  {selectedLandmark === idx && (
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                </div>
              ))}
            </div>

            {/* Featured Landmark Display Box */}
            <div className={`md:col-span-7 bg-gradient-to-br ${landmarks[selectedLandmark].color} p-4 rounded-xl border flex flex-col justify-between shadow-lg`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{landmarks[selectedLandmark].icon}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-black/40 text-amber-300 border border-amber-400/40">
                    {landmarks[selectedLandmark].tag}
                  </span>
                </div>
                <h4 className="text-base font-black text-white mb-1">
                  {landmarks[selectedLandmark].name}
                </h4>
                <p className="text-xs text-teal-100 font-medium mb-2 leading-relaxed">
                  {landmarks[selectedLandmark].desc}
                </p>
                <p className="text-xs text-amber-200/90 bg-black/30 p-2 rounded-lg border border-white/10">
                  {landmarks[selectedLandmark].banglaDesc}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-300 italic">
                  💡 {landmarks[selectedLandmark].fact}
                </span>
                <button
                  onClick={() => {
                    playChime("click");
                    handleSpeak(landmarks[selectedLandmark].name + ". " + landmarks[selectedLandmark].desc);
                  }}
                  className="px-2.5 py-1 rounded bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  শুনুন
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "personalities" && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {personalities.map((person, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectPerson(idx)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedPerson === idx
                      ? "bg-gradient-to-br from-teal-900/60 to-slate-900 border-teal-400 shadow-md ring-1 ring-teal-400"
                      : "bg-slate-900/70 border-slate-800 hover:border-teal-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl">{person.icon}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                        {person.banglaRole}
                      </span>
                    </div>
                    <h5 className="font-bold text-xs sm:text-sm text-white mb-0.5">
                      {person.name}
                    </h5>
                    <p className="text-xs text-amber-300 font-medium">
                      {person.role}
                    </p>
                    <p className="text-xs text-slate-300 mt-1 leading-snug">
                      {person.achievement}
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-teal-200/80">
                    <span className="truncate">{person.banglaText}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playChime("click");
                        handleSpeak(person.name + ". " + person.role + ". " + person.achievement);
                      }}
                      className="p-1 text-teal-300 hover:text-white"
                      title="Audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive celebration banner */}
            <div className="bg-gradient-to-r from-amber-950/40 via-teal-950/40 to-slate-900 p-2.5 rounded-xl border border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-amber-200">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>কিশোরগঞ্জ বাংলাদেশের শিল্প, সাহিত্য ও স্বাধীনতার এক অনন্য গৌরবগাথা!</span>
              </div>
              <button
                onClick={() => {
                  playChime("fanfare");
                  handleSpeak("Kishoreganj is proud of its great legends: Chandrabati, Sukumar Ray, Zainul Abedin, and Syed Nazrul Islam!");
                }}
                className="px-2 py-1 rounded bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white shadow-xs shrink-0"
              >
                গর্বের স্মারক 🌟
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Summary Footer */}
      <div className="border-t border-teal-800/40 pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-teal-200/80">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>NCTB English For Today • Class 5 • Unit 10: My Home District (pp. 38–42)</span>
        </div>
        <div className="flex items-center gap-3 font-semibold">
          <span className="text-amber-300">১০ বর্গ কিমি পৌরসভা</span>
          <span>•</span>
          <span className="text-teal-300">১৪৫ কিমি ঢাকা হতে</span>
          <span>•</span>
          <span className="text-emerald-300">শোলাকিয়া ঈদগাহ</span>
        </div>
      </div>
    </div>
  );
};
