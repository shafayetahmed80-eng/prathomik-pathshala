"use client";

import React, { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  Award, 
  Volume2, 
  ChevronRight, 
  Star, 
  CalendarDays,
  BookmarkCheck,
  Sun,
  CloudRain,
  Compass
} from "lucide-react";

interface CalendarMonthsVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

interface MonthData {
  id: number;
  name: string;
  bangla: string;
  ordinal: string;
  ordinalWord: string;
  days: number;
  season: string;
  highlight: string;
  emoji: string;
}

const MONTHS: MonthData[] = [
  { id: 1, name: "January", bangla: "জানুয়ারি", ordinal: "1st", ordinalWord: "first", days: 31, season: "Winter (শীত)", highlight: "New Year, cool morning breeze", emoji: "❄️" },
  { id: 2, name: "February", bangla: "ফেব্রুয়ারি", ordinal: "2nd", ordinalWord: "second", days: 28, season: "Spring (বসন্ত)", highlight: "21st February - Mother Language Day", emoji: "🌺" },
  { id: 3, name: "March", bangla: "মার্চ", ordinal: "3rd", ordinalWord: "third", days: 31, season: "Spring (বসন্ত)", highlight: "26th March - Independence Day", emoji: "🌿" },
  { id: 4, name: "April", bangla: "এপ্রিল", ordinal: "4th", ordinalWord: "fourth", days: 30, season: "Summer (গ্রীষ্ম)", highlight: "Pohela Boishakh - Bangla New Year", emoji: "☀️" },
  { id: 5, name: "May", bangla: "মে", ordinal: "5th", ordinalWord: "fifth", days: 31, season: "Summer (গ্রীষ্ম)", highlight: "1st May - International Workers' Day", emoji: "🥭" },
  { id: 6, name: "June", bangla: "জুন", ordinal: "6th", ordinalWord: "sixth", days: 30, season: "Monsoon (বর্ষা)", highlight: "Monsoon rains, green paddy fields", emoji: "🌧️" },
  { id: 7, name: "July", bangla: "জুলাই", ordinal: "7th", ordinalWord: "seventh", days: 31, season: "Monsoon (বর্ষা)", highlight: "Fresh rivers, school mid-term", emoji: "🌦️" },
  { id: 8, name: "August", bangla: "আগস্ট", ordinal: "8th", ordinalWord: "eighth", days: 31, season: "Monsoon (বর্ষা)", highlight: "Heavy downpours, water lilies bloom", emoji: "🪷" },
  { id: 9, name: "September", bangla: "সেপ্টেম্বর", ordinal: "9th", ordinalWord: "ninth", days: 30, season: "Autumn (শরৎ)", highlight: "White clouds, Kashful flowers bloom", emoji: "🌾" },
  { id: 10, name: "October", bangla: "অক্টোবর", ordinal: "10th", ordinalWord: "tenth", days: 31, season: "Autumn (শরৎ)", highlight: "Crisp autumn mornings, school sport trials", emoji: "🪁" },
  { id: 11, name: "November", bangla: "নভেম্বর", ordinal: "11th", ordinalWord: "eleventh", days: 30, season: "Late Autumn (হেমন্ত)", highlight: "Nabanna harvest festival, golden paddy", emoji: "🌾" },
  { id: 12, name: "December", bangla: "ডিসেম্বর", ordinal: "12th", ordinalWord: "twelfth", days: 31, season: "Winter (শীত)", highlight: "16th December - Victory Day & winter vacation", emoji: "🏆" }
];

export const CalendarMonthsVisualStage: React.FC<CalendarMonthsVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<MonthData>(MONTHS[0]);
  const [activeTab, setActiveTab] = useState<"calendar" | "ordinalGame" | "daysSorter" | "facts">("calendar");

  // Ordinal matching game state
  const [ordinalTarget, setOrdinalTarget] = useState<number>(1);
  const [ordinalScore, setOrdinalScore] = useState<number>(0);
  const [ordinalStreak, setOrdinalStreak] = useState<number>(0);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Days bucket sorter state
  const [sortedMonths, setSortedMonths] = useState<{ [key: string]: number[] }>({
    "31": [],
    "30": [],
    "28": []
  });
  const [monthToBucket, setMonthToBucket] = useState<MonthData | null>(MONTHS[0]);
  const [bucketCompleted, setBucketCompleted] = useState<boolean>(false);

  // Month selector handler
  const handleSelectMonth = (month: MonthData) => {
    setSelectedMonth(month);
    playChime("pop");
    handleSpeak(`${month.name}. The ${month.ordinalWord} month of the year. It has ${month.days} days.`);
  };

  // Ordinal Game Answer Check
  const handleOrdinalPick = (monthId: number) => {
    if (monthId === ordinalTarget) {
      playChime("correct");
      setOrdinalScore(prev => prev + 1);
      setOrdinalStreak(prev => prev + 1);
      const matched = MONTHS.find(m => m.id === monthId);
      setFeedbackMsg(`🎉 Excellent! ${matched?.name} is indeed the ${matched?.ordinalWord} (${matched?.ordinal}) month!`);
      // pick next target
      setTimeout(() => {
        const nextId = (ordinalTarget % 12) + 1;
        setOrdinalTarget(nextId);
        setFeedbackMsg(null);
      }, 1400);
    } else {
      playChime("wrong");
      setOrdinalStreak(0);
      const wrong = MONTHS.find(m => m.id === monthId);
      setFeedbackMsg(`❌ Oops! ${wrong?.name} is the ${wrong?.ordinalWord} month, not the ${MONTHS.find(m => m.id === ordinalTarget)?.ordinalWord} month. Try again!`);
    }
  };

  // Days Bucket sorter handler
  const handleDropToBucket = (bucketDays: "31" | "30" | "28") => {
    if (!monthToBucket) return;
    const correctDays = monthToBucket.days === 28 ? "28" : monthToBucket.days === 31 ? "31" : "30";

    if (bucketDays === correctDays) {
      playChime("correct");
      setSortedMonths(prev => ({
        ...prev,
        [bucketDays]: [...prev[bucketDays], monthToBucket.id]
      }));

      // Find next unsorted month
      const allSorted = [...sortedMonths["31"], ...sortedMonths["30"], ...sortedMonths["28"], monthToBucket.id];
      const remaining = MONTHS.find(m => !allSorted.includes(m.id));
      if (remaining) {
        setMonthToBucket(remaining);
      } else {
        setMonthToBucket(null);
        setBucketCompleted(true);
        playChime("fanfare");
      }
    } else {
      playChime("wrong");
    }
  };

  const resetSorter = () => {
    setSortedMonths({ "31": [], "30": [], "28": [] });
    setMonthToBucket(MONTHS[0]);
    setBucketCompleted(false);
    playChime("pop");
  };

  return (
    <div className={`w-full bg-gradient-to-br from-indigo-50 via-sky-50 to-amber-50 rounded-2xl border-2 border-indigo-200 overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xs ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
              The Calendar & 12 Months
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                Unit 4 • Lesson 6
              </span>
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              ১২টি ইংরেজি মাস, অর্ডিনাল সংখ্যা (1st–12th) এবং ৩৬৫ দিনের ক্যালেন্ডার
            </p>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-indigo-200 shadow-2xs">
          <button
            onClick={() => { setActiveTab("calendar"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === "calendar" 
                ? "bg-indigo-600 text-white shadow-xs" 
                : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>মাস চক্র</span>
          </button>
          <button
            onClick={() => { setActiveTab("ordinalGame"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === "ordinalGame" 
                ? "bg-indigo-600 text-white shadow-xs" 
                : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>অর্ডিনাল গেম</span>
          </button>
          <button
            onClick={() => { setActiveTab("daysSorter"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === "daysSorter" 
                ? "bg-indigo-600 text-white shadow-xs" 
                : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>দিন সংখ্যা বাছাই</span>
          </button>
          <button
            onClick={() => { setActiveTab("facts"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === "facts" 
                ? "bg-indigo-600 text-white shadow-xs" 
                : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>মৌসুম ও তথ্য</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="py-3 flex-1 flex flex-col justify-center">
        {/* TAB 1: 12-MONTH INTERACTIVE CALENDAR RIBBON & SPOTLIGHT */}
        {activeTab === "calendar" && (
          <div className="space-y-4">
            {/* Quick Month Ribbon */}
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
              {MONTHS.map((m) => {
                const isSelected = selectedMonth.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleSelectMonth(m)}
                    className={`p-2 rounded-xl text-center border-2 transition-all relative group flex flex-col items-center ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-700 shadow-md scale-105"
                        : "bg-white hover:bg-indigo-50 text-slate-800 border-indigo-100 shadow-2xs hover:border-indigo-300"
                    }`}
                  >
                    <span className="text-sm">{m.emoji}</span>
                    <span className="text-xs font-black truncate w-full">{m.name.slice(0, 3)}</span>
                    <span className={`text-[10px] font-bold ${isSelected ? "text-indigo-200" : "text-indigo-600"}`}>
                      {m.ordinal}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Month Detailed Spotlight Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-indigo-200 shadow-md relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-3xl">{selectedMonth.emoji}</span>
                    <div>
                      <h4 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                        {selectedMonth.name}
                        <span className="text-base font-bold text-slate-600">({selectedMonth.bangla})</span>
                        <button
                          onClick={() => handleSpeak(`${selectedMonth.name}. ${selectedMonth.ordinalWord} month.`)}
                          className="p-1 rounded-full text-indigo-600 hover:bg-indigo-50 transition-colors"
                          title="উচ্চারণ শুনুন"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </h4>
                      <p className="text-xs text-indigo-700 font-bold">
                        Ordinal Position: <span className="underline decoration-indigo-400 font-black">{selectedMonth.ordinal} ({selectedMonth.ordinalWord})</span> month of the year
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-center">
                    <span className="block text-[10px] font-bold text-amber-800 uppercase">মোট দিন</span>
                    <span className="text-xl font-black text-amber-700">{selectedMonth.days} days</span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-blue-50 border border-blue-200 text-center">
                    <span className="block text-[10px] font-bold text-blue-800 uppercase">ঋতু</span>
                    <span className="text-xs font-black text-blue-700">{selectedMonth.season}</span>
                  </div>
                </div>
              </div>

              {/* Month Feature / Bangladesh Context */}
              <div className="mt-4 pt-3 border-t border-indigo-50 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                  <span className="font-semibold">বিশেষ দিন ও বৈশিষ্ট্য:</span>
                  <span className="text-slate-900 font-bold">{selectedMonth.highlight}</span>
                </div>
                <button
                  onClick={() => {
                    const nextIndex = (selectedMonth.id % 12);
                    handleSelectMonth(MONTHS[nextIndex]);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 flex items-center gap-1 shrink-0"
                >
                  <span>পরবর্তী মাস</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDINAL NUMBERS MATCHING GAME */}
        {activeTab === "ordinalGame" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border-2 border-indigo-200 shadow-sm text-center">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-100 text-indigo-800 border border-indigo-200 inline-block mb-2">
                🎯 প্রশ্ন: Find the Month!
              </span>
              <h4 className="text-lg sm:text-xl font-black text-slate-900">
                Which month is the <span className="text-indigo-600 underline font-extrabold">{MONTHS.find(m => m.id === ordinalTarget)?.ordinalWord.toUpperCase()} ({MONTHS.find(m => m.id === ordinalTarget)?.ordinal})</span> month of the year?
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                নিচের ১২টি মাস থেকে সঠিক মাসটিতে ক্লিক করুন:
              </p>

              {feedbackMsg && (
                <div className="mt-2 text-sm font-bold animate-bounce text-indigo-700">
                  {feedbackMsg}
                </div>
              )}
            </div>

            {/* Month Options Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {MONTHS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleOrdinalPick(m.id)}
                  className="p-2.5 rounded-xl bg-white border-2 border-indigo-100 hover:border-indigo-500 hover:bg-indigo-50/80 transition-all text-center group shadow-2xs active:scale-95 flex flex-col items-center"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">{m.emoji}</span>
                  <span className="text-xs font-black text-slate-900 mt-0.5">{m.name}</span>
                  <span className="text-[10px] font-bold text-indigo-600">{m.bangla}</span>
                </button>
              ))}
            </div>

            {/* Score & Streak Footer */}
            <div className="flex items-center justify-between text-xs font-bold px-2 text-slate-600">
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>সঠিক উত্তর: <strong className="text-indigo-600">{ordinalScore}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>টানা নির্ভুল: <strong className="text-purple-600">{ordinalStreak}</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DAYS IN MONTH BUCKET SORTER */}
        {activeTab === "daysSorter" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-indigo-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h4 className="font-black text-sm sm:text-base text-slate-900">
                  Knuckle Rule: কোন মাসে কত দিন?
                </h4>
                <p className="text-xs text-slate-600">
                  ৭টি মাসে ৩১ দিন, ৪টি মাসে ৩০ দিন, আর ফেব্রুয়ারিতে ২৮ দিন!
                </p>
              </div>

              {monthToBucket ? (
                <div className="flex items-center gap-3 bg-amber-50 px-4 py-2 rounded-xl border border-amber-300 animate-pulse">
                  <span className="text-2xl">{monthToBucket.emoji}</span>
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase block">বাছাই করুন</span>
                    <span className="text-sm font-black text-amber-900">{monthToBucket.name} ({monthToBucket.bangla})</span>
                  </div>
                </div>
              ) : bucketCompleted ? (
                <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-300 text-emerald-800 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>অভিনন্দন! সব ১২টি মাস সঠিকভাবে সাজানো সম্পন্ন!</span>
                  <button onClick={resetSorter} className="p-1 hover:bg-emerald-100 rounded-lg">
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : null}
            </div>

            {/* 3 Buckets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 31 Days Bucket */}
              <div 
                onClick={() => handleDropToBucket("31")}
                className="bg-emerald-50/80 rounded-2xl p-3.5 border-2 border-emerald-300 text-center cursor-pointer hover:bg-emerald-100 transition-all group flex flex-col justify-between min-h-[140px]"
              >
                <div>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span className="text-base">📅</span>
                    <h5 className="font-black text-sm text-emerald-900">৩১ দিনের মাস (৭টি)</h5>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold block mb-2">Jan, Mar, May, Jul, Aug, Oct, Dec</span>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {sortedMonths["31"].map(id => {
                      const m = MONTHS.find(x => x.id === id);
                      return (
                        <span key={id} className="px-2 py-0.5 rounded-md text-[10px] font-black bg-white text-emerald-800 border border-emerald-200 shadow-2xs">
                          {m?.name.slice(0, 3)}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 group-hover:underline mt-2">
                  এখানে রাখতে ক্লিক করুন ➔
                </span>
              </div>

              {/* 30 Days Bucket */}
              <div 
                onClick={() => handleDropToBucket("30")}
                className="bg-blue-50/80 rounded-2xl p-3.5 border-2 border-blue-300 text-center cursor-pointer hover:bg-blue-100 transition-all group flex flex-col justify-between min-h-[140px]"
              >
                <div>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span className="text-base">📆</span>
                    <h5 className="font-black text-sm text-blue-900">৩০ দিনের মাস (৪টি)</h5>
                  </div>
                  <span className="text-[10px] text-blue-700 font-bold block mb-2">Apr, Jun, Sep, Nov</span>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {sortedMonths["30"].map(id => {
                      const m = MONTHS.find(x => x.id === id);
                      return (
                        <span key={id} className="px-2 py-0.5 rounded-md text-[10px] font-black bg-white text-blue-800 border border-blue-200 shadow-2xs">
                          {m?.name.slice(0, 3)}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-blue-700 group-hover:underline mt-2">
                  এখানে রাখতে ক্লিক করুন ➔
                </span>
              </div>

              {/* 28/29 Days Bucket */}
              <div 
                onClick={() => handleDropToBucket("28")}
                className="bg-purple-50/80 rounded-2xl p-3.5 border-2 border-purple-300 text-center cursor-pointer hover:bg-purple-100 transition-all group flex flex-col justify-between min-h-[140px]"
              >
                <div>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span className="text-base">✨</span>
                    <h5 className="font-black text-sm text-purple-900">২৮ দিনের বিশেষ মাস (১টি)</h5>
                  </div>
                  <span className="text-[10px] text-purple-700 font-bold block mb-2">February (Leap year এ ২৯ দিন)</span>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {sortedMonths["28"].map(id => {
                      const m = MONTHS.find(x => x.id === id);
                      return (
                        <span key={id} className="px-2 py-0.5 rounded-md text-[10px] font-black bg-white text-purple-800 border border-purple-200 shadow-2xs">
                          {m?.name.slice(0, 3)}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-purple-700 group-hover:underline mt-2">
                  এখানে রাখতে ক্লিক করুন ➔
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CALENDAR FACTS & 7 DAYS OF WEEK */}
        {activeTab === "facts" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-4 border-2 border-indigo-200 shadow-sm space-y-2">
              <h4 className="font-black text-sm text-indigo-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>মৌলিক সময় ও ক্যালেন্ডার তথ্য</span>
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span><strong>1 Year</strong> = 12 Months = 365 Days (সাধারণ বছর)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span><strong>1 Week</strong> = 7 Days (Sunday to Saturday)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span><strong>First Month:</strong> January (জানুয়ারি)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span><strong>Twelfth Month:</strong> December (ডিসেম্বর)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-4 border-2 border-indigo-200 shadow-sm space-y-2">
              <h4 className="font-black text-sm text-indigo-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                <span>ক্যাপিটাল লেটার ব্যাকরণ নিয়ম</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                ইংরেজি ব্যাকরণে সব <strong>বার (Days of the week)</strong> এবং <strong>মাস (Months of the year)</strong>-এর নামের প্রথম অক্ষর সর্বদা বড় হাতের (Capital letter) হবে।
              </p>
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-bold">
                ✓ Sunday, Monday, Tuesday...<br />
                ✓ January, February, March...
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Rhyme Pill */}
      <div className="mt-2 pt-2 border-t border-indigo-100 flex items-center justify-between text-xs text-indigo-900 font-medium">
        <span className="flex items-center gap-1.5 italic">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          "Thirty days has September, April, June and November; all the rest have thirty-one..."
        </span>
        <button
          onClick={() => handleSpeak("There are twelve months in an English year. January is the first month, and December is the twelfth and last month.")}
          className="text-xs font-black text-indigo-700 hover:text-indigo-900 flex items-center gap-1 shrink-0"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>পুরো পাঠ শুনুন</span>
        </button>
      </div>
    </div>
  );
};

export default CalendarMonthsVisualStage;
