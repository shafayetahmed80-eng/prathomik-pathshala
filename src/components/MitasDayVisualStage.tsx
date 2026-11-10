"use client";

import React, { useState } from "react";
import { 
  Clock, 
  Sun, 
  Moon, 
  Coffee, 
  School, 
  Home, 
  Heart, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  Volume2, 
  Award, 
  ChevronRight,
  AlarmClock
} from "lucide-react";

interface MitasDayVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

interface RoutineEvent {
  id: string;
  time: string;
  hour: number;
  label: string;
  bangla: string;
  actionEn: string;
  icon: string;
  phase: "morning" | "afternoon" | "evening" | "night";
  highlight: string;
}

const MITA_ROUTINE: RoutineEvent[] = [
  { id: "r1", time: "6:00 AM", hour: 6, label: "Wake Up", bangla: "ঘুম থেকে ওঠা", actionEn: "Mita gets up at six o'clock in the morning and washes her face.", icon: "🌅", phase: "morning", highlight: "Washes face with fresh cool water" },
  { id: "r2", time: "7:00 AM", hour: 7, label: "Breakfast & Teeth", bangla: "সকালের নাশতা ও দাঁত ব্রাশ", actionEn: "She has breakfast at seven o'clock, then brushes her teeth.", icon: "🍳", phase: "morning", highlight: "Healthy morning meal & dental hygiene" },
  { id: "r3", time: "9:00 AM", hour: 9, label: "Leave for School", bangla: "স্কুলে রওনা হওয়া", actionEn: "She leaves home for school at nine o'clock and walks to school.", icon: "🎒", phase: "morning", highlight: "Walking safely to primary school" },
  { id: "r4", time: "3:00 PM", hour: 15, label: "Visit Grandmother", bangla: "নানির বাড়ি যাওয়া", actionEn: "After school, at three o'clock, she visits her grandmother.", icon: "👵", phase: "afternoon", highlight: "Spending caring time with grandmother" },
  { id: "r5", time: "5:00 PM", hour: 17, label: "Return Home", bangla: "বাড়ি ফিরে আসা", actionEn: "Mita returns home at five o'clock in the afternoon.", icon: "🏡", phase: "afternoon", highlight: "Wash up and change school uniform" },
  { id: "r6", time: "7:00 PM", hour: 19, label: "Evening Homework", bangla: "সন্ধ্যার পড়াশোনা", actionEn: "In the evening, she diligently completes her school homework.", icon: "📖", phase: "evening", highlight: "Math, English and Bangla lesson review" },
  { id: "r7", time: "10:00 PM", hour: 22, label: "Bedtime", bangla: "ঘুমাতে যাওয়া", actionEn: "Mita goes to bed at ten o'clock for a restful sleep.", icon: "🌙", phase: "night", highlight: "Good night's rest for the next day" }
];

export const MitasDayVisualStage: React.FC<MitasDayVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"timeline" | "clock" | "quiz" | "routineGame">("timeline");
  const [selectedEvent, setSelectedEvent] = useState<RoutineEvent>(MITA_ROUTINE[0]);

  // Interactive Clock State
  const [clockHour, setClockHour] = useState<number>(6);

  // Sequence Matching Game State
  const [gameStep, setGameStep] = useState<number>(0);
  const [gameScore, setGameScore] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  const handleSelectEvent = (event: RoutineEvent) => {
    setSelectedEvent(event);
    setClockHour(event.hour > 12 ? event.hour - 12 : event.hour);
    playChime("pop");
    handleSpeak(event.actionEn);
  };

  const handleClockChange = (targetHour: number) => {
    setClockHour(targetHour);
    const matched = MITA_ROUTINE.find(e => (e.hour > 12 ? e.hour - 12 : e.hour) === targetHour);
    if (matched) {
      setSelectedEvent(matched);
      playChime("correct");
      handleSpeak(`At ${matched.time}, ${matched.actionEn}`);
    } else {
      playChime("pop");
    }
  };

  const handleGameAnswer = (eventId: string) => {
    const currentTarget = MITA_ROUTINE[gameStep];
    if (eventId === currentTarget.id) {
      playChime("correct");
      const nextScore = gameScore + 1;
      setGameScore(nextScore);
      if (gameStep + 1 < MITA_ROUTINE.length) {
        setGameStep(prev => prev + 1);
      } else {
        setGameCompleted(true);
        playChime("fanfare");
      }
    } else {
      playChime("wrong");
    }
  };

  const resetGame = () => {
    setGameStep(0);
    setGameScore(0);
    setGameCompleted(false);
    playChime("pop");
  };

  return (
    <div className={`w-full bg-gradient-to-br from-amber-50/70 via-sky-50 to-indigo-50/60 rounded-2xl border-2 border-amber-200 overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xs ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
            <AlarmClock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
              Mita's Daily Routine
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                Class 4 • Unit 2
              </span>
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              সকাল ৬টা থেকে রাত ১০টা: সময় বলা ও প্রাত্যহিক কাজের নিয়মাবলি
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-amber-200 shadow-2xs">
          <button
            onClick={() => { setActiveTab("timeline"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === "timeline" 
                ? "bg-amber-500 text-white shadow-xs" 
                : "text-slate-600 hover:text-amber-600 hover:bg-amber-50"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>টাইমলাইন</span>
          </button>
          <button
            onClick={() => { setActiveTab("clock"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === "clock" 
                ? "bg-amber-500 text-white shadow-xs" 
                : "text-slate-600 hover:text-amber-600 hover:bg-amber-50"
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>এনালগ ঘড়ি</span>
          </button>
          <button
            onClick={() => { setActiveTab("routineGame"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === "routineGame" 
                ? "bg-amber-500 text-white shadow-xs" 
                : "text-slate-600 hover:text-amber-600 hover:bg-amber-50"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>রুটিন গেম</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="py-3 flex-1 flex flex-col justify-center">
        {/* TAB 1: DAILY ROUTINE TIMELINE */}
        {activeTab === "timeline" && (
          <div className="space-y-3">
            {/* Quick Time Navigation Bar */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
              {MITA_ROUTINE.map((evt) => {
                const isSelected = selectedEvent.id === evt.id;
                return (
                  <button
                    key={evt.id}
                    onClick={() => handleSelectEvent(evt)}
                    className={`p-2 rounded-xl text-center border-2 transition-all flex flex-col items-center justify-between ${
                      isSelected
                        ? "bg-amber-500 text-white border-amber-600 shadow-md scale-102"
                        : "bg-white hover:bg-amber-50 text-slate-800 border-amber-100 shadow-2xs hover:border-amber-300"
                    }`}
                  >
                    <span className="text-xl">{evt.icon}</span>
                    <span className="text-[11px] font-black truncate w-full mt-0.5">{evt.time}</span>
                    <span className={`text-[10px] font-bold truncate w-full ${isSelected ? "text-amber-100" : "text-amber-700"}`}>
                      {evt.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Routine Spotlight Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-amber-200 shadow-md relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-4xl">{selectedEvent.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-200">
                          {selectedEvent.time}
                        </span>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          {selectedEvent.phase}
                        </span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5 flex items-center gap-2">
                        {selectedEvent.label} ({selectedEvent.bangla})
                        <button
                          onClick={() => handleSpeak(selectedEvent.actionEn)}
                          className="p-1 rounded-full text-amber-600 hover:bg-amber-50 transition-colors"
                          title="শুনুন"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed bg-amber-50/60 p-2.5 rounded-xl border border-amber-100">
                    "{selectedEvent.actionEn}"
                  </p>
                </div>

                {/* Clock indicator pill */}
                <div className="px-4 py-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white text-center shrink-0 shadow-md">
                  <Clock className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-lg font-black block">{selectedEvent.time}</span>
                  <span className="text-[10px] font-bold text-amber-100 block">o'clock format</span>
                </div>
              </div>

              {/* Habit highlight */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>গুরুত্বপূর্ণ অভ্যাস: <strong>{selectedEvent.highlight}</strong></span>
                </span>
                <button
                  onClick={() => {
                    const currentIndex = MITA_ROUTINE.findIndex(e => e.id === selectedEvent.id);
                    const nextIndex = (currentIndex + 1) % MITA_ROUTINE.length;
                    handleSelectEvent(MITA_ROUTINE[nextIndex]);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 flex items-center gap-1 shrink-0"
                >
                  <span>পরবর্তী কাজ</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE ANALOG CLOCK SIMULATOR */}
        {activeTab === "clock" && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-amber-200 shadow-sm space-y-4 text-center">
            <div className="max-w-md mx-auto">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-200 inline-block mb-1">
                ⏰ Tell the Time in English
              </span>
              <h4 className="text-base sm:text-lg font-black text-slate-900">
                নিচের যেকোনো সময়ে ক্লিক করে ঘড়ির কাঁটা ও মিতার কাজ দেখুন:
              </h4>
            </div>

            {/* Simulated Clock Face Visual */}
            <div className="flex items-center justify-center gap-6">
              <div className="w-36 h-36 rounded-full border-4 border-amber-500 bg-amber-50/50 relative shadow-inner flex items-center justify-center">
                {/* 12, 3, 6, 9 Numbers */}
                <span className="absolute top-1 font-black text-xs text-slate-700">12</span>
                <span className="absolute right-2 font-black text-xs text-slate-700">3</span>
                <span className="absolute bottom-1 font-black text-xs text-slate-700">6</span>
                <span className="absolute left-2 font-black text-xs text-slate-700">9</span>
                
                {/* Center Pin */}
                <div className="w-3 h-3 rounded-full bg-slate-900 z-10"></div>
                
                {/* Hour Hand (Rotated based on clockHour) */}
                <div 
                  className="absolute w-1 bg-slate-900 rounded-full origin-bottom"
                  style={{
                    height: "36px",
                    top: "36px",
                    transform: `rotate(${clockHour * 30}deg)`,
                    transformOrigin: "50% 100%"
                  }}
                />

                {/* Minute Hand (Pointing up to 12) */}
                <div 
                  className="absolute w-0.5 bg-amber-600 rounded-full origin-bottom"
                  style={{
                    height: "48px",
                    top: "24px",
                    transform: "rotate(0deg)",
                    transformOrigin: "50% 100%"
                  }}
                />
              </div>

              {/* Time details */}
              <div className="text-left space-y-1">
                <span className="text-2xl sm:text-3xl font-black text-amber-600">
                  {clockHour}:00 {clockHour >= 6 && clockHour <= 9 ? "AM" : "PM"}
                </span>
                <span className="block text-xs font-bold text-slate-700">
                  "It is {clockHour} o'clock."
                </span>
                <p className="text-xs text-slate-500 italic">
                  {selectedEvent ? selectedEvent.actionEn : "Practice time expressions."}
                </p>
              </div>
            </div>

            {/* Hours Quick Selector */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {[6, 7, 9, 3, 5, 10].map((h) => (
                <button
                  key={h}
                  onClick={() => handleClockChange(h)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    clockHour === h 
                      ? "bg-amber-500 text-white shadow-md scale-105" 
                      : "bg-slate-100 text-slate-700 hover:bg-amber-100"
                  }`}
                >
                  {h} o'clock
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DAILY ROUTINE SEQUENCE GAME */}
        {activeTab === "routineGame" && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 border-2 border-amber-200 shadow-sm text-center">
              {!gameCompleted ? (
                <>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-200 inline-block mb-1.5">
                    🎯 ধাপ {gameStep + 1} / {MITA_ROUTINE.length}: What happens next?
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    What does Mita do at <strong className="text-amber-600 underline">{MITA_ROUTINE[gameStep].time}</strong>?
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    সঠিক কাজটিতে ক্লিক করে মিতার দিনলিপি পূরণ করো:
                  </p>
                </>
              ) : (
                <div className="py-2 space-y-2">
                  <span className="text-4xl">🎉</span>
                  <h4 className="text-lg font-black text-emerald-800">
                    চমৎকার! তুমি মিতার পুরো দিনের রুটিন সঠিকভাবে মেলাতে পেরেছ!
                  </h4>
                  <p className="text-xs text-slate-600">
                    স্কোর: {gameScore} / {MITA_ROUTINE.length} • তুমি সময় মেনে চলায় দক্ষ!
                  </p>
                  <button
                    onClick={resetGame}
                    className="px-4 py-2 rounded-xl text-xs font-black bg-amber-500 text-white hover:bg-amber-600 shadow-md inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>আবার খেলুন</span>
                  </button>
                </div>
              )}
            </div>

            {!gameCompleted && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {MITA_ROUTINE.map((evt) => (
                  <button
                    key={evt.id}
                    onClick={() => handleGameAnswer(evt.id)}
                    className="p-3 rounded-xl bg-white border-2 border-amber-100 hover:border-amber-500 hover:bg-amber-50/80 transition-all text-center flex flex-col items-center shadow-2xs active:scale-95"
                  >
                    <span className="text-2xl">{evt.icon}</span>
                    <span className="text-xs font-black text-slate-900 mt-1">{evt.label}</span>
                    <span className="text-[10px] text-amber-700 font-bold">{evt.bangla}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Habit Pill */}
      <div className="mt-2 pt-2 border-t border-amber-100 flex items-center justify-between text-xs text-amber-900 font-medium">
        <span className="flex items-center gap-1.5 italic">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          "Early to bed and early to rise, makes a student healthy, wealthy and wise."
        </span>
        <span className="text-xs font-bold text-amber-700">
          NCTB Class 4 Page 6–9
        </span>
      </div>
    </div>
  );
};

export default MitasDayVisualStage;
