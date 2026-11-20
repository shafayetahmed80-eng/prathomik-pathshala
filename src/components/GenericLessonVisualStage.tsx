"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Volume2, 
  Printer, 
  Users, 
  Smile, 
  CheckCircle2, 
  HelpCircle 
} from "lucide-react";
import type { SlideItem, SlideDeck, SyllableWord } from "../data/slidesData";

interface GenericLessonVisualStageProps {
  slideId: number;
  currentSlide: SlideItem;
  deck: SlideDeck;
  playChime?: (type: "correct" | "click" | "fanfare") => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
  onOpenWorksheet?: () => void;
}

export default function GenericLessonVisualStage({
  slideId,
  currentSlide,
  deck,
  playChime,
  handleSpeak,
  isFullTheater = false,
  onOpenWorksheet,
}: GenericLessonVisualStageProps) {
  const [activeSpeakerIdx, setActiveSpeakerIdx] = useState<number | null>(null);
  const [selectedVocabWord, setSelectedVocabWord] = useState<SyllableWord | null>(null);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const hasDialogue = Boolean(currentSlide.content.dialogue && currentSlide.content.dialogue.length > 0);
  const hasVocab = Boolean(currentSlide.content.vocabulary && currentSlide.content.vocabulary.length > 0);
  const hasQuiz = Boolean(currentSlide.content.quiz);
  const isAssessmentSlide = slideId === 8 || currentSlide.title.toLowerCase().includes("assessment") || currentSlide.title.toLowerCase().includes("quiz");

  const handleCharacterSpeak = (text: string, idx: number) => {
    setActiveSpeakerIdx(idx);
    if (playChime) playChime("click");
    handleSpeak(text);
    setTimeout(() => setActiveSpeakerIdx(null), 3000);
  };

  const handleVocabClick = (item: SyllableWord) => {
    setSelectedVocabWord(item);
    if (playChime) playChime("click");
    handleSpeak(item.word);
  };

  const handleQuizAnswer = (option: string) => {
    setQuizSelectedOption(option);
    setQuizSubmitted(true);
    if (currentSlide.content.quiz && option.toLowerCase().includes(currentSlide.content.quiz.answer.toLowerCase())) {
      if (playChime) playChime("correct");
    } else {
      if (playChime) playChime("click");
    }
  };

  return (
    <div className={`relative flex flex-col justify-between h-full w-full rounded-3xl overflow-hidden border border-purple-100 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/70 p-4 sm:p-6 shadow-xs select-none ${isFullTheater ? "min-h-[480px]" : "min-h-[380px]"}`}>
      
      {/* 🏷️ Top Header Bar: Lesson, Unit & Grade info */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-purple-100/80">
        <div className="flex items-center gap-2">
          <span className="text-2xl sm:text-3xl p-1.5 rounded-2xl bg-white shadow-2xs border border-purple-100">{deck.thumbnailEmoji || "📚"}</span>
          <div>
            <span className="text-[10px] sm:text-xs font-black tracking-wide text-purple-700 uppercase">
              {deck.grade} • {deck.unit}
            </span>
            <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug line-clamp-1">
              {currentSlide.title}
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-xl bg-purple-600 text-white font-black text-[11px] shadow-2xs">
            স্লাইড {slideId} / {deck.totalSlides || 8}
          </span>
        </div>
      </div>

      {/* 🎭 Main Interactive Stage Area */}
      <div className="flex-1 my-3 flex flex-col justify-center min-h-0 overflow-y-auto pr-1">

        {/* 1️⃣ DIALOGUE STAGE: Interactive Character Avatars */}
        {hasDialogue && (
          <div className="space-y-3">
            <div className="text-center">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-[11px] font-bold">
                <Users className="w-3 h-3" />
                <span>সংলাপ পাঠ ও চরিত্রদের কথা শুনতে ছবিতে বা বাক্যে ক্লিক করো</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
              {currentSlide.content.dialogue!.map((dlg, idx) => {
                const isActive = activeSpeakerIdx === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleCharacterSpeak(dlg.text, idx)}
                    className={`cursor-pointer group flex items-start gap-3 p-3 rounded-2xl border transition-all duration-200 ${
                      isActive 
                        ? "bg-purple-600 text-white border-purple-600 shadow-md scale-102" 
                        : "bg-white/90 hover:bg-purple-50/80 text-slate-800 border-purple-100 hover:border-purple-300 shadow-2xs"
                    }`}
                  >
                    <div className="relative shrink-0">
                      <span className="text-2xl p-2 rounded-2xl bg-purple-100/80 inline-block shadow-2xs group-hover:scale-110 transition-transform">
                        {dlg.avatar || "🗣️"}
                      </span>
                      {isActive && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[11px] font-black uppercase ${isActive ? "text-purple-200" : "text-purple-700"}`}>
                          {dlg.speaker}
                        </span>
                        <Volume2 className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-amber-300 animate-pulse" : "text-slate-400 group-hover:text-purple-600"}`} />
                      </div>
                      <p className={`text-xs sm:text-sm font-bold mt-0.5 leading-snug ${isActive ? "text-white" : "text-slate-900"}`}>
                        &ldquo;{dlg.text}&rdquo;
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2️⃣ VOCABULARY LAB: Interactive Flashcards */}
        {!hasDialogue && hasVocab && (
          <div className="space-y-3">
            <div className="text-center">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>শব্দে ক্লিক করে সঠিক ব্রিটিশ ও দেশীয় উচ্চারণ শুনুন</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[320px] overflow-y-auto pr-1">
              {currentSlide.content.vocabulary!.map((v, vIdx) => {
                const isSelected = selectedVocabWord?.word === v.word;
                return (
                  <button key={vIdx} type="button" onClick={() => handleVocabClick(v)}
                    className={`text-left p-3 rounded-2xl border transition-all duration-150 flex flex-col justify-between ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-md scale-102"
                        : "bg-white hover:bg-emerald-50/60 border-emerald-100 hover:border-emerald-300 shadow-2xs"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xl p-1 bg-white/70 rounded-xl shadow-2xs">{v.icon || "📖"}</span>
                      <Volume2 className={`w-3.5 h-3.5 ${isSelected ? "text-amber-300" : "text-emerald-500"}`} />
                    </div>
                    <div className="mt-1.5">
                      <span className={`font-black text-sm block tracking-wide ${isSelected ? "text-white" : "text-slate-900"}`}>
                        {v.word}
                      </span>
                      <span className={`text-[10px] font-mono block ${isSelected ? "text-emerald-100" : "text-slate-500"}`}>
                        {v.phonetic}
                      </span>
                      <span className={`text-xs font-bold mt-1 block ${isSelected ? "text-emerald-100" : "text-emerald-700"}`}>
                        {v.meaning}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3️⃣ QUIZ & ASSESSMENT: Classroom Assessment Card */}
        {!hasDialogue && !hasVocab && hasQuiz && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-purple-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>ক্লাসরুম কুইজ</span>
              </span>
              {currentSlide.content.quiz!.hint && (
                <span className="text-[11px] text-slate-500 italic">
                  ইঙ্গিত: {currentSlide.content.quiz!.hint}
                </span>
              )}
            </div>

            <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
              {currentSlide.content.quiz!.question}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {currentSlide.content.quiz!.options.map((opt, optIdx) => {
                const isSelected = quizSelectedOption === opt;
                const isCorrect = opt.toLowerCase().includes(currentSlide.content.quiz!.answer.toLowerCase());
                let btnStyle = "bg-slate-50 hover:bg-purple-50 text-slate-800 border-slate-200 hover:border-purple-300";
                if (quizSubmitted) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-xs font-black";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-500 text-white border-rose-600";
                  }
                }
                return (
                  <button key={optIdx} type="button" onClick={() => handleQuizAnswer(opt)}
                    className={`p-2.5 rounded-xl border text-xs sm:text-sm font-bold text-left transition-all ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 4️⃣ SLIDE 8 & GENERAL OVERVIEW: Interactive Learning Outcomes & Worksheet Action */}
        {(!hasDialogue && !hasVocab && !hasQuiz) && (
          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-purple-100 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-purple-100 text-purple-700 text-lg">🎯</span>
                <div>
                  <h4 className="font-black text-sm sm:text-base text-slate-900">
                    আজকের পাঠের মূল শিখনফল (Learning Outcomes)
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">এনসিটিবি ২০২৬ পাঠ্যবই অনুযায়ী শ্রেণিভিত্তিক দক্ষতা</p>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                {currentSlide.content.englishText.slice(0, 3).map((line, lIdx) => (
                  <div 
                    key={lIdx} 
                    onClick={() => { if (playChime) playChime("click"); handleSpeak(line); }}
                    className="cursor-pointer group flex items-start gap-2.5 p-2 rounded-xl hover:bg-purple-50 border border-transparent hover:border-purple-200 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-purple-900 leading-snug">
                      {line}
                    </p>
                    <Volume2 className="w-3.5 h-3.5 text-slate-300 group-hover:text-purple-600 shrink-0 ml-auto self-center" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 📄 Highlighted Worksheet Banner on Slide 8 / Assessment Slides */}
        {isAssessmentSlide && onOpenWorksheet && (
          <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-white/20 text-white backdrop-blur-xs text-xl">
                📄
              </span>
              <div>
                <h5 className="font-black text-xs sm:text-sm text-white">
                  ক্লাসরুম প্র্যাকটিস ওয়ার্কশিট (২০ নম্বর)
                </h5>
                <p className="text-[11px] text-purple-100">
                  MCQ, শূন্যস্থান, সত্য-মিথ্যা ও প্রশ্নোত্তরসহ সম্পূর্ণ মূল্যায়নী শিট
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenWorksheet}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs shadow-xs transition-all hover:scale-105 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-900" />
              <span>ওয়ার্কশিট খুলুন ও প্রিন্ট করুন</span>
            </button>
          </div>
        )}

      </div>

      {/* 底部 Quick Interactive Ribbon */}
      <div className="pt-2 border-t border-purple-100/70 flex items-center justify-between text-[11px] text-slate-600 font-semibold">
        <span className="flex items-center gap-1">
          <Smile className="w-3.5 h-3.5 text-purple-600" />
          <span>প্রাথমিক পাঠশালা • NCTB ২০২৬ শতভাগ অনুসৃত</span>
        </span>
        <span className="text-purple-700 font-bold hidden sm:inline">
          {deck.topic}
        </span>
      </div>

    </div>
  );
}
