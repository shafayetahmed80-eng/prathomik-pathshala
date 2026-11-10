"use client";

import { useRef, useEffect } from "react";
import { Printer, X, Download, Sparkles, CheckCircle2 } from "lucide-react";
import { BornomalaItem } from "@/data/bornomalaData";
import { EnglishAlphabetItem } from "@/data/englishAlphabetData";

interface Props {
  item: BornomalaItem | EnglishAlphabetItem;
  isOpen: boolean;
  onClose: () => void;
  languageMode?: "bangla" | "english";
  englishCase?: "upper" | "lower" | "pair";
}

export default function BornomalaWorksheetModal({ 
  item, 
  isOpen, 
  onClose, 
  languageMode = "bangla",
  englishCase = "upper" 
}: Props) {
  const printAreaRef = useRef<HTMLDivElement>(null);
  const isEng = languageMode === "english" || /[a-zA-Z]/.test(item.char) || ("upperChar" in item);

  // Keyboard Escape listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="worksheet-title"
      >
        {/* Modal Controls Header (Hidden in Print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 print:hidden shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-lg font-bold">
              🖨️
            </div>
            <div>
              <h3 id="worksheet-title" className="text-base sm:text-lg font-black text-slate-900">
                {isEng ? "ইংরেজি বর্ণমালা অনুশীলন ওয়ার্কশিট (English Alphabet Worksheet)" : "হাতেখড়ি অনুশীলন ওয়ার্কশিট (A4 Printable)"}
              </h3>
              <p className="text-xs text-slate-500">
                {isEng ? `'${item.char}' লেটারের জন্য অফলাইন প্র্যাকটিস শিট` : `'${item.char}' বর্ণের জন্য অফলাইন প্রিন্ট-রেডি হোমওয়ার্ক শিট`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট করুন</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-200 transition-colors"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Sheet Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 print:bg-white print:p-0 print:overflow-visible">
          <div 
            ref={printAreaRef}
            className="worksheet-print-area max-w-[210mm] mx-auto bg-white p-6 sm:p-10 border border-slate-300 shadow-md rounded-2xl print:border-none print:shadow-none print:p-8 print:max-w-none print:w-full print:rounded-none"
          >
            {/* Sheet Header */}
            <div className="border-b-2 border-slate-800 pb-4 mb-6">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span className="font-bold text-pink-700">প্রাথমিক পাঠশালা • স্মার্ট এডুকেশন</span>
                <span>{isEng ? "English for Today • Class 1" : "প্রাক-প্রাথমিক ও ১ম শ্রেণি"}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-center text-slate-900 tracking-wide">
                {isEng ? "ইংরেজি বর্ণমালা ও হাতের লেখা অনুশীলন খাতা (English Alphabet Handwriting)" : "বাংলা বর্ণমালা ও হাতেখড়ি অনুশীলন খাতা"}
              </h1>
              <p className="text-center text-xs text-slate-500 mt-1">
                জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) কারিকুলাম অনুসরণে
              </p>

              {/* Student Metadata Fields */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-slate-700 mt-5 pt-3 border-t border-dashed border-slate-300">
                <div className="border-b border-slate-400 pb-1">নাম: _______________</div>
                <div className="border-b border-slate-400 pb-1">শ্রেণি: _______________</div>
                <div className="border-b border-slate-400 pb-1">রোল: _______________</div>
                <div className="border-b border-slate-400 pb-1">তারিখ: _______________</div>
              </div>
            </div>

            {/* Big Hero Card: Character + Picture + Rhyme */}
            <div className="grid grid-cols-12 gap-4 items-center p-5 rounded-2xl border-2 border-pink-200 bg-pink-50/40 mb-6">
              <div className="col-span-4 text-center border-r-2 border-pink-200 pr-2">
                <span className="text-6xl sm:text-7xl font-black text-pink-600 block leading-none">
                  {isEng && "displayPair" in item ? (item as EnglishAlphabetItem).displayPair : item.char}
                </span>
                <span className="text-xs font-bold text-pink-800 mt-1 inline-block px-2.5 py-0.5 rounded-full bg-pink-100">
                  {isEng ? (item.matraLabel || "English Letter") : (item.matraLabel || item.name)}
                </span>
              </div>
              <div className="col-span-8 pl-2 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-4xl">{item.imageEmoji}</span>
                  <div>
                    <h2 className="text-lg font-black text-slate-900">
                      {isEng ? `${item.char} is for ${item.word}` : `${item.char}-তে ${item.word}`}
                    </h2>
                    <p className="text-xs font-medium text-slate-600">
                      {isEng && "wordMeaningBn" in item 
                        ? `বাংলা অর্থ: ${(item as EnglishAlphabetItem).wordMeaningBn} (Phonics: ${item.pureSound})` 
                        : `উচ্চারণ: ${item.name}`}
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-bold text-pink-900 bg-white/80 p-2 rounded-xl border border-pink-200">
                  ছড়া: &quot;{item.rhyme}&quot;
                </p>
                {item.strokeGuide && (
                  <p className="text-[11px] text-slate-600 italic">
                    ✏️ লেখার নিয়ম: {isEng && "strokeGuideUpper" in item ? (item as EnglishAlphabetItem).strokeGuideUpper : item.strokeGuide}
                  </p>
                )}
              </div>
            </div>

            {/* Tracing Activity Rows with 3-line Bangla Notebook Grid */}
            <div className="space-y-5 mb-6">
              <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                <span>অনুশীলন ১: ডটের ওপর হাত ঘোরাও (Trace on the dotted letters)</span>
              </h3>

              {/* Dotted Tracing Line */}
              <div className="border-2 border-slate-300 rounded-xl p-3 bg-white space-y-3">
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 text-center">
                  {[...Array(8)].map((_, i) => (
                    <div 
                      key={i}
                      className="h-20 rounded-lg border border-slate-200 flex flex-col justify-between p-1 bg-slate-50/50 relative overflow-hidden"
                    >
                      {/* Guides: 4-line for English, 3-line for Bangla */}
                      {isEng ? (
                        <>
                          <div className="absolute top-[18%] left-0 right-0 border-b border-rose-300" />
                          <div className="absolute top-[42%] left-0 right-0 border-b border-sky-300 border-dashed" />
                          <div className="absolute top-[66%] left-0 right-0 border-b border-indigo-400" />
                          <div className="absolute top-[88%] left-0 right-0 border-b border-rose-300" />
                        </>
                      ) : (
                        <>
                          <div className="absolute top-[20%] left-0 right-0 border-b border-pink-200 border-dashed" />
                          <div className="absolute top-[50%] left-0 right-0 border-b border-blue-200" />
                          <div className="absolute top-[80%] left-0 right-0 border-b border-pink-200 border-dashed" />
                        </>
                      )}
                      
                      <span className="text-4xl font-black text-slate-400 select-none z-10 m-auto" style={{ stroke: "#94a3b8", strokeDasharray: "2,2" }}>
                        {item.char}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5 pt-2">
                <span>অনুশীলন ২: নিজে নিজে সুন্দর করে লেখো (Write independently)</span>
              </h3>

              {/* Free Writing Grid */}
              <div className="border-2 border-slate-300 rounded-xl p-3 bg-white space-y-3">
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 text-center">
                  {[...Array(8)].map((_, i) => (
                    <div 
                      key={i}
                      className="h-20 rounded-lg border border-slate-200 flex flex-col justify-between p-1 bg-white relative overflow-hidden"
                    >
                      {/* Guides */}
                      {isEng ? (
                        <>
                          <div className="absolute top-[18%] left-0 right-0 border-b border-rose-300" />
                          <div className="absolute top-[42%] left-0 right-0 border-b border-sky-300 border-dashed" />
                          <div className="absolute top-[66%] left-0 right-0 border-b border-indigo-400" />
                          <div className="absolute top-[88%] left-0 right-0 border-b border-rose-300" />
                        </>
                      ) : (
                        <>
                          <div className="absolute top-[20%] left-0 right-0 border-b border-pink-200 border-dashed" />
                          <div className="absolute top-[50%] left-0 right-0 border-b border-blue-200" />
                          <div className="absolute top-[80%] left-0 right-0 border-b border-pink-200 border-dashed" />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Word building & Coloring challenge */}
            <div className="border border-slate-300 rounded-2xl p-4 bg-slate-50/60 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-700">
                  {isEng ? "শব্দ গঠন ও বানান (Word Spelling Practice):" : "শব্দ গঠন ও বানান অনুশীলন:"}
                </h4>
                <div className="text-sm font-black text-slate-800 bg-white p-3 rounded-xl border border-slate-200">
                  {item.word} = {item.char} + ______
                </div>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-700">
                  {isEng ? "ছবি আঁকো বা রঙ করো (Draw or Color):" : "ছবি আঁকো বা রঙ করো:"}
                </h4>
                <div className="h-16 rounded-xl border border-dashed border-slate-300 bg-white flex items-center justify-center text-xs text-slate-400 font-medium px-2 text-center">
                  {isEng 
                    ? `এখানে তোমার পছন্দমতো রঙ পেন্সিল দিয়ে ${item.word} (${item.char}) আঁকো`
                    : `এখানে তোমার পছন্দমতো রঙ পেন্সিল দিয়ে ${item.word} আঁকো`}
                </div>
              </div>
            </div>

            {/* Teacher / Parent Evaluation Box */}
            <div className="border-t-2 border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-700 gap-3">
              <div className="flex items-center gap-2">
                <span className="font-bold">শিক্ষক/অভিভাবকের মূল্যায়ন:</span>
                <span className="inline-flex gap-1 text-amber-500 font-bold">
                  ⭐⭐⭐ (চমৎকার) / ⭐⭐ (ভালো) / ⭐ (চেষ্টা করো)
                </span>
              </div>
              <div className="font-semibold text-slate-500">
                স্বাক্ষর: ____________________
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
