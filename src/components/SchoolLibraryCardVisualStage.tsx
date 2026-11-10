"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  Library, 
  CreditCard, 
  VolumeX, 
  Volume2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw, 
  ShieldCheck, 
  Bookmark, 
  AlertCircle,
  Award,
  BookMarked
} from "lucide-react";

interface SchoolLibraryCardVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

interface StoryBook {
  id: string;
  title: string;
  author: string;
  banglaTitle: string;
  category: string;
  emoji: string;
  pages: number;
}

const AVAILABLE_BOOKS: StoryBook[] = [
  { id: "b1", title: "The Clever Fox", author: "Aesop's Fables", banglaTitle: "চালাক শেয়ালের গল্প", category: "Fable", emoji: "🦊", pages: 24 },
  { id: "b2", title: "Tales of Panchatantra", author: "Vishnu Sharma", banglaTitle: "পঞ্চতন্ত্রের মজার গল্প", category: "Moral Tales", emoji: "🐘", pages: 32 },
  { id: "b3", title: "Adventure on the River", author: "Bangla Classic", banglaTitle: "নদীর বুকে রোমাঞ্চ", category: "Adventure", emoji: "⛵", pages: 28 },
  { id: "b4", title: "Science Around Us", author: "Children's Science", banglaTitle: "আমাদের চারপাশের বিজ্ঞান", category: "Discovery", emoji: "🔬", pages: 30 }
];

export const SchoolLibraryCardVisualStage: React.FC<SchoolLibraryCardVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"card" | "borrow" | "rules" | "care">("card");

  // Student Card State
  const [studentName, setStudentName] = useState<string>("Sadia Sultana");
  const [studentRoll, setStudentRoll] = useState<string>("07");
  const [selectedAvatar, setSelectedAvatar] = useState<string>("👧");

  // Borrowing State
  const [borrowedBook, setBorrowedBook] = useState<StoryBook | null>(AVAILABLE_BOOKS[0]);
  const [borrowDate, setBorrowDate] = useState<string>("10 March 2026");
  const [dueDate, setDueDate] = useState<string>("17 March 2026 (7 Days)");
  const [isReturned, setIsReturned] = useState<boolean>(false);

  // Silence Meter State
  const [soundLevel, setSoundLevel] = useState<number>(18); // dB (low = quiet library)
  const [soundFeedback, setSoundFeedback] = useState<string>("কার্ড পিন ড্রপ নীরবতা বজায় রয়েছে! চমৎকার!");

  // Book Care Checklist
  const [careChecklist, setCareChecklist] = useState<{ [key: string]: boolean }>({
    gentle: true,
    cleanHands: true,
    bookmark: true,
    noWriting: true
  });

  const handleSelectBook = (book: StoryBook) => {
    setBorrowedBook(book);
    setIsReturned(false);
    playChime("pop");
    handleSpeak(`You have borrowed ${book.title}. Remember to return it within seven days.`);
  };

  const handleReturnBook = () => {
    setIsReturned(true);
    playChime("fanfare");
    handleSpeak("Thank you for returning the book cleanly and on time! You earned a star.");
  };

  const toggleCareItem = (key: string) => {
    setCareChecklist(prev => {
      const next = { ...prev, [key]: !prev[key] };
      playChime("pop");
      return next;
    });
  };

  return (
    <div className={`w-full bg-gradient-to-br from-amber-50/70 via-emerald-50/50 to-teal-50 rounded-2xl border-2 border-emerald-200 overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xs ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-100 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
            <Library className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
              Our School Library & Card
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Unit 3 • Lesson 4
              </span>
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              লাইব্রেরি মেম্বারশিপ কার্ড, ৭ দিনের বই ধার ও নীরবতা বজায় রাখার শিষ্টাচার
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-emerald-200 shadow-2xs">
          <button
            onClick={() => { setActiveTab("card"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === "card" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>লাইব্রেরি কার্ড</span>
          </button>
          <button
            onClick={() => { setActiveTab("borrow"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === "borrow" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>বই ধার (৭ দিন)</span>
          </button>
          <button
            onClick={() => { setActiveTab("rules"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === "rules" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
            }`}
          >
            <VolumeX className="w-3.5 h-3.5" />
            <span>নীরবতা ও নিয়ম</span>
          </button>
          <button
            onClick={() => { setActiveTab("care"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === "care" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>বইয়ের যত্ন</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="py-3 flex-1 flex flex-col justify-center">
        {/* TAB 1: INTERACTIVE SCHOOL LIBRARY CARD */}
        {activeTab === "card" && (
          <div className="max-w-xl mx-auto w-full space-y-3">
            {/* The Library Membership Card */}
            <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 rounded-2xl p-4 sm:p-5 text-white shadow-lg border-2 border-emerald-400 relative overflow-hidden">
              {/* Card Watermark pattern */}
              <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
                <BookOpen className="w-48 h-48" />
              </div>

              {/* Card Top Banner */}
              <div className="flex items-center justify-between border-b border-emerald-400/40 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏫</span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-100">
                      Ideal Model Primary School
                    </h4>
                    <p className="text-[10px] text-emerald-200">
                      Student Library Membership Card • শিক্ষার্থী পাঠকেন্দ্র কার্ড
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-500/40 border border-emerald-300 text-white">
                  VALID 2026
                </span>
              </div>

              {/* Card Main Info Grid */}
              <div className="flex items-center gap-4">
                {/* Photo Frame */}
                <div className="w-20 h-24 rounded-xl bg-emerald-100 border-2 border-white/80 shadow-md flex flex-col items-center justify-center shrink-0 text-slate-800 relative">
                  <span className="text-4xl">{selectedAvatar}</span>
                  <span className="text-[9px] font-bold text-emerald-800 uppercase mt-1">Photo</span>
                </div>

                {/* Info Fields */}
                <div className="space-y-1.5 flex-1 text-xs">
                  <div className="flex items-baseline justify-between gap-2 border-b border-white/10 pb-1">
                    <span className="text-emerald-200 text-[11px] font-semibold">Name:</span>
                    <strong className="text-white font-black text-sm">{studentName}</strong>
                  </div>
                  <div className="grid grid-cols-2 gap-2 border-b border-white/10 pb-1">
                    <div>
                      <span className="text-emerald-200 text-[10px] block">Class:</span>
                      <strong className="text-white font-bold">Class 3 (৩য় শ্রেণি)</strong>
                    </div>
                    <div>
                      <span className="text-emerald-200 text-[10px] block">Roll No:</span>
                      <strong className="text-amber-300 font-black">{studentRoll}</strong>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-emerald-200 pt-0.5">
                    <span>Card ID: <strong>LIB-2026-C3-07</strong></span>
                    <span>Borrow Limit: <strong>1 Book / 7 Days</strong></span>
                  </div>
                </div>
              </div>

              {/* Barcode strip */}
              <div className="mt-3 pt-2 border-t border-emerald-400/30 flex items-center justify-between text-[10px] text-emerald-200">
                <span className="tracking-widest font-mono">|||| ||||| |||| |||||||| ||||</span>
                <span className="italic">Keep this card safely in your school bag</span>
              </div>
            </div>

            {/* Avatar & Name Selector Controls */}
            <div className="bg-white rounded-xl p-3 border border-emerald-200 shadow-2xs flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-700">ছবি পরিবর্তন:</span>
                {["👧", "👦", "🧒", "👧🏽", "🧑"].map((av) => (
                  <button
                    key={av}
                    onClick={() => { setSelectedAvatar(av); playChime("pop"); }}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm border transition-all ${
                      selectedAvatar === av ? "bg-emerald-100 border-emerald-500 scale-110" : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleSpeak(`This is ${studentName}'s library card. She reads in Class 3, roll number ${studentRoll}.`)}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center gap-1 shrink-0"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>কার্ডের তথ্য শুনুন</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: 7-DAY BOOK BORROWING & RETURN TRACKER */}
        {activeTab === "borrow" && (
          <div className="space-y-3">
            {/* Borrow Status Banner */}
            <div className="bg-white rounded-2xl p-4 border-2 border-emerald-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Rule: One Book for 7 Days
                  </span>
                  <span className="text-xs text-slate-500 font-medium">একবারে ১টি গল্প বই ৭ দিনের জন্য</span>
                </div>
                {borrowedBook && (
                  <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <span>ধার নেওয়া বই:</span>
                    <span className="text-emerald-700 underline">{borrowedBook.title} ({borrowedBook.banglaTitle})</span>
                  </h4>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!isReturned ? (
                  <button
                    onClick={handleReturnBook}
                    className="px-3.5 py-2 rounded-xl text-xs font-black bg-emerald-600 text-white hover:bg-emerald-700 shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>বই ফেরত দিন (Return Book)</span>
                  </button>
                ) : (
                  <div className="px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-300 text-teal-800 text-xs font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    <span>সফলভাবে ফেরত হয়েছে!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Available Storybooks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {AVAILABLE_BOOKS.map((b) => {
                const isCurrent = borrowedBook?.id === b.id;
                return (
                  <div
                    key={b.id}
                    onClick={() => handleSelectBook(b)}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isCurrent
                        ? "bg-emerald-50 border-emerald-500 shadow-md scale-102"
                        : "bg-white hover:bg-slate-50 border-slate-200 shadow-2xs hover:border-emerald-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl">{b.emoji}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {b.category}
                        </span>
                      </div>
                      <h5 className="font-black text-sm text-slate-900 leading-tight">{b.title}</h5>
                      <span className="text-xs text-emerald-700 font-bold block">{b.banglaTitle}</span>
                      <p className="text-[11px] text-slate-500 mt-1">লেখক: {b.author}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-600">{b.pages} পৃষ্ঠা</span>
                      {isCurrent ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> ধার নেওয়া
                        </span>
                      ) : (
                        <span className="text-emerald-600 hover:underline">ধার নিন ➔</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 7-Day Timeline Pill */}
            <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>ইস্যু তারিখ: <strong>{borrowDate}</strong> ➔ শেষ জমার তারিখ: <strong className="text-amber-800">{dueDate}</strong></span>
              </span>
              <span className="font-bold text-[11px] text-amber-700">বই সময়মতো ফেরত দেওয়া উত্তম শিষ্টাচার</span>
            </div>
          </div>
        )}

        {/* TAB 3: SILENCE METER & LIBRARY ETHICS */}
        {activeTab === "rules" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Silence Meter Simulator */}
            <div className="bg-white rounded-2xl p-4 border-2 border-emerald-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <VolumeX className="w-4 h-4 text-emerald-600" />
                  <span>লাইব্রেরি নীরবতা মিটার (Silence Monitor)</span>
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {soundLevel} dB (Strict Silence)
                </span>
              </div>

              {/* Decibel Bar */}
              <div className="space-y-1">
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200 flex">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                    style={{ width: `${(soundLevel / 60) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>০ dB (সম্পূর্ণ পিন-ড্রপ নীরবতা)</span>
                  <span>৩০ dB (ফিসফিস কথা)</span>
                  <span>৬০ dB (চিৎকার ❌)</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                ✓ <strong>Rule 1:</strong> "Inside the library, everyone must maintain strict silence." (সবাইকে অবশ্যই গভীর নীরবতা বজায় রাখতে হবে)।
              </div>

              {/* Sound Test Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    setSoundLevel(15);
                    setSoundFeedback("গভীর নীরবতা! সবাই মনোযোগ দিয়ে বই পড়ছে।");
                    playChime("correct");
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                >
                  🤫 পিন-ড্রপ সাইলেন্স
                </button>
                <button
                  onClick={() => {
                    setSoundLevel(45);
                    setSoundFeedback("সাবধান! লাইব্রেরিতে কথা বলা বা শব্দ করা নিষেধ!");
                    playChime("wrong");
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-100 text-rose-800 hover:bg-rose-200"
                >
                  📢 শব্দ পরীক্ষা
                </button>
              </div>
              <p className="text-[11px] text-slate-600 italic font-medium">{soundFeedback}</p>
            </div>

            {/* Library Dos and Don'ts */}
            <div className="bg-white rounded-2xl p-4 border-2 border-emerald-200 shadow-sm space-y-2">
              <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>লাইব্রেরির অবশ্য পালনীয় নিয়মাবলি</span>
              </h4>
              <ul className="text-xs text-slate-700 space-y-2 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>লাইব্রেরি কার্ড সাথে রাখা:</strong> বই ইস্যু করার সময় সর্বদা নিজের মেম্বারশিপ কার্ড দেখাতে হবে।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>পৃষ্ঠা আলতো করে উল্টানো:</strong> "We should turn the pages gently and keep the books clean."</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>৭ দিনের মধ্যে ফেরত:</strong> সময়মতো বই জমা দিয়ে অন্য সহপাঠীকে পড়ার সুযোগ দেওয়া।</span>
                </li>
                <li className="flex items-start gap-2 text-rose-700">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>খাবার খাওয়া নিষেধ:</strong> লাইব্রেরিতে কোনো প্রকার খাবার বা পানীয় আনা যাবে না।</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 4: BOOK CARE SIMULATOR */}
        {activeTab === "care" && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 border-2 border-emerald-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h4 className="font-black text-sm sm:text-base text-slate-900">
                  Book Care Inspector: বই যত্নের ৪টি গোল্ডেন রুল
                </h4>
                <p className="text-xs text-slate-600">
                  বই আমাদের পরম বন্ধু। বইয়ের যত্ন নিলে তা বহু বছর সুন্দর থাকে!
                </p>
              </div>

              <button
                onClick={() => handleSpeak("We should turn the pages gently and keep the books clean. Reading books opens our minds.")}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center gap-1 shrink-0"
              >
                <Volume2 className="w-4 h-4" />
                <span>নীতিবাক্য শুনুন</span>
              </button>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { key: "gentle", label: "Turn pages gently (পৃষ্ঠা আলতো করে উল্টানো)", emoji: "📖" },
                { key: "cleanHands", label: "Read with clean hands (পরিষ্কার হাতে বই ধরা)", emoji: "🧼" },
                { key: "bookmark", label: "Use a bookmark, don't fold corners (বুকমার্ক ব্যবহার)", emoji: "🔖" },
                { key: "noWriting", label: "Do not write or scribble on pages (পাতায় দাগ না দেওয়া)", emoji: "✏️" }
              ].map((item) => {
                const isChecked = careChecklist[item.key];
                return (
                  <div
                    key={item.key}
                    onClick={() => toggleCareItem(item.key)}
                    className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isChecked ? "bg-emerald-50 border-emerald-400" : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="text-xs font-bold text-slate-800">{item.label}</span>
                    </div>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                      isChecked ? "bg-emerald-600 text-white" : "border-2 border-slate-300"
                    }`}>
                      {isChecked && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer Quote Pill */}
      <div className="mt-2 pt-2 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-900 font-medium">
        <span className="flex items-center gap-1.5 italic">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          "Reading books opens our minds and helps us learn many new things about the world."
        </span>
        <span className="text-xs font-bold text-emerald-700">
          NCTB Page 48–52
        </span>
      </div>
    </div>
  );
};

export default SchoolLibraryCardVisualStage;
