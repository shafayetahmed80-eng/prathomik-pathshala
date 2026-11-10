"use client";

import React, { useState } from "react";
import { 
  Landmark, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  MapPin,
  Heart,
  Flag
} from "lucide-react";

interface LiberationWarMuseumVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

export const LiberationWarMuseumVisualStage: React.FC<LiberationWarMuseumVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"galleries" | "artifacts" | "declaration">("galleries");
  const [selectedGallery, setSelectedGallery] = useState<number>(1);
  const [selectedArtifact, setSelectedArtifact] = useState<number>(0);

  const galleries = [
    {
      id: 1,
      title: "Gallery 1: The Heritage & Path to Freedom",
      banglaTitle: "গ্যালারি ১: বাংলার ঐতিহ্য ও অধিকারের সংগ্রাম",
      icon: "📜",
      desc: "Rare photographs, newspapers and documents illustrating the ancient heritage of Bengal and the language movement of 1952.",
      highlights: "১৯৫২-এর ভাষা আন্দোলন ও স্বায়ত্তশাসনের ঐতিহাসিক দলিল ও আলোকচিত্র।"
    },
    {
      id: 2,
      title: "Gallery 2: Our Rights, Our Sacrifices",
      banglaTitle: "গ্যালারি ২: আমাদের অধিকার, আমাদের আত্মত্যাগ",
      icon: "📢",
      desc: "Historic Declaration of Independence by Bangabandhu Sheikh Mujibur Rahman. Visitors listen attentively to the historic proclamation.",
      highlights: "বঙ্গবন্ধু শেখ মুজিবুর রহমানের স্বাধীনতার ঐতিহাসিক ঘোষণা ও বীর জনতার আত্মত্যাগ।"
    },
    {
      id: 3,
      title: "Gallery 3: The Resistance & Freedom Fighters",
      banglaTitle: "গ্যালারি ৩: গেরিলা যুদ্ধ ও মুক্তিযোদ্ধাদের বীরত্ব",
      icon: "🎖️",
      desc: "Weapons, uniforms, transmitters, and radio sets used by the brave freedom fighters (Muktibahini).",
      highlights: "মুক্তিবাহিনীর গেরিলা যুদ্ধের অস্ত্রশস্ত্র ও স্বাধীন বাংলা বেতার কেন্দ্রের সরঞ্জাম।"
    },
    {
      id: 4,
      title: "Gallery 4: Our Victory, Our Values",
      banglaTitle: "গ্যালারি ৪: আমাদের বিজয়, আমাদের মূল্যবোধ",
      icon: "🕊️",
      desc: "Solemn memorial of martyred intellectuals and heroes. Preserving their personal belongings with eternal respect.",
      highlights: "শহীদ বুদ্ধিজীবীদের স্মৃতিচিহ্ন ও ১৬ ডিসেম্বরের ঐতিহাসিক বিজয়ের স্মারক।"
    }
  ];

  const artifacts = [
    {
      name: "A Pair of Glasses (চশমা)",
      owner: "Martyred Intellectual (শহীদ বুদ্ধিজীবী)",
      desc: "The spectacles worn by a martyred teacher while educating the young nation.",
      icon: "👓",
      bangla: "শ্রদ্ধেয় শিক্ষাগুরুর চোখের চশমা, যার মাধ্যমে তিনি জাতিকে জ্ঞানের আলো দেখাতেন।"
    },
    {
      name: "A Pen (একটি কলম)",
      owner: "Martyred Journalist / Writer (শহীদ সাংবাদিক ও লেখক)",
      desc: "The brave pen used to write fearless articles for freedom and human rights.",
      icon: "✒️",
      bangla: "সত্য ও স্বাধীনতার পক্ষে নির্ভীক সংবাদ ও কবিতা লেখার অমূল্য কলম।"
    },
    {
      name: "A Notebook / Diary (একটি নোটবুক)",
      owner: "Freedom Fighter (বীর মুক্তিযোদ্ধা)",
      desc: "Contains handwritten notes, dates, patriotic poems and messages from the battlefield.",
      icon: "📓",
      bangla: "রণাঙ্গনের স্মৃতি, কবিতার পঙ্ক্তি ও সহযোদ্ধাদের ঠিকানাসংবলিত ব্যক্তিগত ডায়েরি।"
    },
    {
      name: "A Soiled Shirt (রক্তাক্ত শার্ট)",
      owner: "Martyred Freedom Hero (শহীদ মুক্তিযোদ্ধা)",
      desc: "Preserving the sacred soil and sacrifice made for the sovereign flag of Bangladesh.",
      icon: "👔",
      bangla: "মাতৃভূমির স্বাধীনতার বেদীতে বুকের তাজা রক্তে রাঙানো পবিত্র পোশাক।"
    },
    {
      name: "A Money-bag (একটি মানিব্যাগ)",
      owner: "Martyr (দেশপ্রেমিক শহীদ)",
      desc: "Carried in pocket on the day of martyrdom, containing tiny family photos.",
      icon: "👛",
      bangla: "পকেটে সযত্নে রাখা পরিবারের ছোট্ট ছবি ও স্মৃতির স্মারক।"
    }
  ];

  const handleSelectGallery = (idx: number) => {
    setSelectedGallery(idx);
    playChime("click");
    handleSpeak(galleries[idx].title + ". " + galleries[idx].desc);
  };

  const handleSelectArtifact = (idx: number) => {
    setSelectedArtifact(idx);
    playChime("click");
    handleSpeak(artifacts[idx].name + ". " + artifacts[idx].desc);
  };

  return (
    <div className={`w-full bg-gradient-to-br from-red-950 via-slate-900 to-emerald-950 rounded-2xl border-2 border-emerald-600/60 text-white overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xl ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800/40 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-600/30">
            <Flag className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <h3 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
              The Liberation War Museum: A Field Trip
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                Class 5 • Unit 19
              </span>
            </h3>
            <p className="text-xs text-emerald-200/80 font-medium">
              ১৪ ডিসেম্বরের শিক্ষাসফর, মুক্তিযুদ্ধ জাদুঘরের ৪টি গ্যালারি ও শহীদের স্মারক
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-emerald-900/60 shadow-2xs">
          <button
            onClick={() => { setActiveTab("galleries"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "galleries" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🏛️ ৪টি স্থায়ী গ্যালারি
          </button>
          <button
            onClick={() => { setActiveTab("artifacts"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "artifacts" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            👓 শহীদের স্মৃতিচিহ্ন
          </button>
          <button
            onClick={() => { setActiveTab("declaration"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "declaration" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            📢 স্বাধীনতার ঘোষণা
          </button>
        </div>
      </div>

      {/* Main Dynamic Interactive Stage Content */}
      <div className="my-3 flex-1 flex flex-col justify-center">
        {activeTab === "galleries" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
            {/* Gallery Navigation list */}
            <div className="md:col-span-5 space-y-2">
              {galleries.map((g, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectGallery(idx)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center gap-2.5 ${
                    selectedGallery === idx
                      ? "bg-emerald-600/30 border-emerald-400 text-white shadow-md scale-[1.01]"
                      : "bg-slate-900/70 border-slate-800 hover:border-emerald-700 text-slate-300"
                  }`}
                >
                  <span className="text-2xl">{g.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-emerald-100 truncate">{g.title}</p>
                    <p className="text-[10px] text-amber-300 truncate">{g.banglaTitle}</p>
                  </div>
                  {selectedGallery === idx && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </div>
              ))}
            </div>

            {/* Featured Gallery Showcase Box */}
            <div className="md:col-span-7 bg-slate-900/90 p-4 rounded-xl border border-emerald-500/40 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{galleries[selectedGallery].icon}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Permanent Gallery {galleries[selectedGallery].id}
                  </span>
                </div>
                <h4 className="text-base font-black text-amber-300 mb-1">
                  {galleries[selectedGallery].title}
                </h4>
                <p className="text-xs text-slate-200 font-medium mb-2 leading-relaxed">
                  {galleries[selectedGallery].desc}
                </p>
                <p className="text-xs text-emerald-200/90 bg-black/40 p-2.5 rounded-lg border border-white/10">
                  {galleries[selectedGallery].highlights}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  10:00 AM – 12:30 PM (2.5 Hours Visit)
                </span>
                <button
                  onClick={() => {
                    playChime("click");
                    handleSpeak(galleries[selectedGallery].title + ". " + galleries[selectedGallery].desc);
                  }}
                  className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  বিবরণ শুনুন
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "artifacts" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-red-950/40 via-slate-900 to-emerald-950/40 p-3 rounded-xl border border-red-700/40 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-red-200 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  Gallery 4: Our Victory, Our Values — Personal Belongings
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  We fell silent in deep respect as we saw personal belongings of our martyred heroes.
                </p>
              </div>
              <button 
                onClick={() => {
                  playChime("click");
                  handleSpeak("As we went inside Gallery 4, we fell silent looking at the personal belongings of our martyred intellectuals.");
                }}
                className="p-2 rounded-lg bg-red-800/50 hover:bg-red-700 text-red-100 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Artifacts grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {artifacts.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectArtifact(idx)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between text-center ${
                    selectedArtifact === idx
                      ? "bg-red-950/60 border-red-400 shadow-md ring-1 ring-red-400"
                      : "bg-slate-900/70 border-slate-800 hover:border-red-700"
                  }`}
                >
                  <span className="text-3xl mx-auto mb-1">{item.icon}</span>
                  <p className="text-xs font-bold text-slate-100 truncate">{item.name}</p>
                  <p className="text-[10px] text-amber-300 truncate">{item.owner}</p>
                </div>
              ))}
            </div>

            {/* Featured Artifact Description Box */}
            <div className="bg-black/50 p-3 rounded-xl border border-white/10 flex items-center justify-between gap-2">
              <div>
                <h5 className="font-bold text-xs text-amber-300 flex items-center gap-1.5">
                  <span>{artifacts[selectedArtifact].icon}</span>
                  {artifacts[selectedArtifact].name} — {artifacts[selectedArtifact].owner}
                </h5>
                <p className="text-xs text-slate-200 mt-0.5">{artifacts[selectedArtifact].desc}</p>
                <p className="text-[11px] text-emerald-300 mt-0.5">{artifacts[selectedArtifact].bangla}</p>
              </div>
              <button
                onClick={() => {
                  playChime("fanfare");
                  handleSpeak(artifacts[selectedArtifact].name + ". " + artifacts[selectedArtifact].desc);
                }}
                className="px-2.5 py-1 rounded bg-red-700 hover:bg-red-600 text-white text-xs font-bold shrink-0 shadow-xs"
              >
                শ্রদ্ধাঞ্জলি 🌺
              </button>
            </div>
          </div>
        )}

        {activeTab === "declaration" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-red-950/60 via-amber-950/40 to-slate-900 p-4 rounded-xl border-2 border-amber-500/50 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Flag className="w-4 h-4 text-red-500" />
                  Gallery 2: The Declaration of Independence
                </span>
                <span className="text-xs font-mono font-bold text-emerald-300">
                  26 March 1971
                </span>
              </div>

              <blockquote className="bg-black/50 p-3 rounded-lg border-l-4 border-red-500 my-2 text-xs sm:text-sm text-slate-100 italic leading-relaxed">
                "Our teacher read out to us the Declaration of Independence by Bangabandhu Sheikh Mujibur Rahman. Some other visitors also stopped and listened attentively."
              </blockquote>

              <p className="text-xs text-amber-200/90 font-medium">
                বঙ্গবন্ধু শেখ মুজিবুর রহমানের ঐতিহাসিক স্বাধীনতার ঘোষণা পাঠ করার সময় পুরো গ্যালারির সকল দর্শনার্থী গভীর শ্রদ্ধায় পিনপতন নীরবতায় শ্রবণ করছিলেন।
              </p>

              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-300">
                  🇧🇩 An experience we would never forget.
                </span>
                <button
                  onClick={() => {
                    playChime("fanfare");
                    handleSpeak("At Gallery 2, our teacher read out the Declaration of Independence by Bangabandhu Sheikh Mujibur Rahman. It was an experience we would never forget!");
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-md flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  ঐতিহাসিক মুহূর্তটি স্মরণ করো
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Summary Footer */}
      <div className="border-t border-emerald-800/40 pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-emerald-200/80">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>NCTB English For Today • Class 5 • Unit 19: The Liberation War Museum (pp. 74–77)</span>
        </div>
        <div className="flex items-center gap-3 font-semibold">
          <span className="text-red-300">১৪ ডিসেম্বর শহীদ বুদ্ধিজীবী দিবস</span>
          <span>•</span>
          <span className="text-amber-300">৪টি স্থায়ী গ্যালারি</span>
          <span>•</span>
          <span className="text-emerald-300">অমর স্বাধীনতা</span>
        </div>
      </div>
    </div>
  );
};
