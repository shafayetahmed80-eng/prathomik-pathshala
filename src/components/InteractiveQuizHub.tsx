"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  Smile, 
  Award, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  HelpCircle, 
  Flame, 
  Star,
  Sparkles,
  Shuffle
} from "lucide-react";
import { QUIZ_BANK, QuizQuestion } from "@/data/quizData";
import { DEEP_QUESTION_BANKS } from "@/data/questionPool";
import { safeSpeak, stopSpeech } from "@/utils/mobileSpeech";
import { Button, SegmentedControl, AudioButton, getButtonClasses } from "@/components/ui";

const GRADE_TABS = [
  { id: "pre-primary", label: "প্রাক-প্রাথমিক", icon: "🧸" },
  { id: "class-1", label: "১ম শ্রেণি", icon: "🎒" },
  { id: "class-2", label: "২য় শ্রেণি", icon: "✏️" },
  { id: "class-3", label: "৩য় শ্রেণি", icon: "📖" },
  { id: "class-4", label: "৪র্থ শ্রেণি", icon: "🔬" },
  { id: "class-5", label: "৫ম শ্রেণি", icon: "🎓" },
];

const SUBJECT_FILTERS = [
  { id: "all", label: "সকল বিষয়", icon: "🌟" },
  { id: "bangla", label: "বাংলা", icon: "📚" },
  { id: "english", label: "English", icon: "🔤" },
  { id: "math", label: "গণিত", icon: "📐" },
  { id: "science", label: "বিজ্ঞান", icon: "🔬" },
  { id: "bgs", label: "বাংলাদেশ ও বিশ্বপরিচয়", icon: "🌍" },
];

const SUBJECT_EMOJI_MAP: Record<string, string> = {
  bangla: "📖",
  english: "🔤",
  math: "📐",
  science: "🔬",
  bgs: "🌍",
  combined: "🎨"
};

const SUBJECT_LABEL_MAP: Record<string, string> = {
  bangla: "বাংলা",
  english: "English",
  math: "প্রাথমিক গণিত",
  science: "প্রাথমিক বিজ্ঞান",
  bgs: "বাংলাদেশ ও বিশ্বপরিচয়",
  combined: "আমার বই (সমন্বিত)"
};

const GRADE_LABEL_MAP: Record<string, string> = {
  "pre-primary": "প্রাক-প্রাথমিক",
  "class-1": "১ম শ্রেণি",
  "class-2": "২য় শ্রেণি",
  "class-3": "৩য় শ্রেণি",
  "class-4": "৪র্থ শ্রেণি",
  "class-5": "৫ম শ্রেণি",
};

// Helper to build a comprehensive, randomized quiz pool
function buildClassQuizPool(classId: string, subjectFilter: string): QuizQuestion[] {
  const result: QuizQuestion[] = [];

  // 1. Add base hand-crafted questions from QUIZ_BANK
  const baseQuestions = QUIZ_BANK.filter((q) => {
    if (q.classId !== classId) return false;
    if (subjectFilter === "all") return true;
    if (subjectFilter === "bangla") return q.subject.includes("বাংলা") || q.subject.includes("ছড়া");
    if (subjectFilter === "english") return q.subject.toLowerCase().includes("english");
    if (subjectFilter === "math") return q.subject.includes("গণিত") || q.subject.includes("গণনা");
    if (subjectFilter === "science") return q.subject.includes("বিজ্ঞান");
    if (subjectFilter === "bgs") return q.subject.includes("পরিচয়") || q.subject.includes("সমাজ");
    return true;
  });
  result.push(...baseQuestions);

  // 2. Dynamically extract and convert MCQs from DEEP_QUESTION_BANKS
  const bankKeys = Object.keys(DEEP_QUESTION_BANKS).filter(k => k.startsWith(classId));

  for (const k of bankKeys) {
    const subKey = k.replace(`${classId}-`, "");
    if (subjectFilter !== "all" && subKey !== subjectFilter) continue;

    const bank = DEEP_QUESTION_BANKS[k];
    if (bank && bank.mcq && bank.mcq.length > 0) {
      const subName = SUBJECT_LABEL_MAP[subKey] || subKey;
      const subEmoji = SUBJECT_EMOJI_MAP[subKey] || "✏️";

      bank.mcq.forEach((m, mIdx) => {
        // Skip duplicate ID if already in result
        if (result.some(r => r.id === m.id)) return;

        // Ensure 4 valid options
        const opts = m.options.map(opt => ({
          label: opt,
          isCorrect: opt.trim() === m.answer.trim()
        }));

        result.push({
          id: m.id || `quiz-${k}-${mIdx}`,
          classId,
          gradeName: GRADE_LABEL_MAP[classId] || classId,
          subject: subName,
          question: m.question,
          imageEmoji: subEmoji,
          options: opts,
          explanation: `একদম সঠিক! এই প্রশ্নের নির্ভুল উত্তর হলো: "${m.answer}"। 🎉`,
          hint: `চারটি বিকল্প মনোযোগ দিয়ে পড়ো এবং সঠিক উত্তরটি বাছাই করো।`
        });
      });
    }
  }

  return result;
}

// Randomly shuffle and pick a round of questions (default 10)
function pickQuizRound(pool: QuizQuestion[], roundSize: number = 10, shuffle: boolean = false): QuizQuestion[] {
  if (pool.length <= roundSize) return [...pool];
  if (!shuffle) return pool.slice(0, roundSize);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, roundSize);
}

export default function InteractiveQuizHub() {
  const [selectedClassId, setSelectedClassId] = useState<string>("class-1");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [roundSeed, setRoundSeed] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Generate question pool and current round questions
  const fullPool = useMemo(() => {
    return buildClassQuizPool(selectedClassId, selectedSubject);
  }, [selectedClassId, selectedSubject]);

  // Deterministic baseline for SSR prerender, randomized on client mount
  const [classQuestions, setClassQuestions] = useState<QuizQuestion[]>(() => {
    return pickQuizRound(buildClassQuizPool("class-1", "all"), 10, false);
  });

  useEffect(() => {
    setClassQuestions(pickQuizRound(fullPool, 10, true));
  }, [fullPool, roundSeed]);

  // Stop any active speech on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const currentQuestion: QuizQuestion | undefined = classQuestions[currentIndex] || classQuestions[0];

  const handleClassChange = (classId: string) => {
    stopSpeech();
    setIsSpeaking(false);
    setSelectedClassId(classId);
    setRoundSeed(prev => prev + 1);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setIsCompleted(false);
    setScore(0);
    setStreak(0);
  };

  const handleSubjectChange = (subjectId: string) => {
    stopSpeech();
    setIsSpeaking(false);
    setSelectedSubject(subjectId);
    setRoundSeed(prev => prev + 1);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setIsCompleted(false);
    setScore(0);
    setStreak(0);
  };

  const handleOptionClick = (index: number) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = currentQuestion.options[index]?.isCorrect;

    if (isCorrect) {
      setScore((prev) => prev + 50);
      setStreak((prev) => prev + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"]
      });
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    stopSpeech();
    setIsSpeaking(false);
    if (currentIndex + 1 < classQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#f59e0b", "#10b981", "#6366f1", "#ec4899"]
      });
    }
  };

  const handleRestart = () => {
    stopSpeech();
    setIsSpeaking(false);
    setRoundSeed(prev => prev + 1);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setIsCompleted(false);
    setScore(0);
    setStreak(0);
  };

  const handleSpeak = (text: string) => {
    setIsSpeaking(true);
    const isEn = /[a-zA-Z]/.test(text) && !/[\u0980-\u09FF]/.test(text);
    safeSpeak(text, {
      lang: isEn ? "en-US" : "bn-BD",
      rate: isEn ? 0.88 : 0.9,
      voice: isEn ? "ana" : "nabanita",
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  return (
    <article 
      aria-labelledby="quiz-hub-heading"
      className="bg-white rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200 shadow-lg space-y-6 w-full"
    >
      {/* Header Title & Live Gamified Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-3">
          <div 
            aria-hidden="true" 
            className="w-12 h-12 rounded-2xl bg-[#EEF8F3] border border-[#CBE5D8] flex items-center justify-center text-2xl shrink-0"
          >
            🎮
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFFBEB] border border-[#FFB020]/50 text-[#3A2300] text-xs font-semibold">
              <Smile className="w-3.5 h-3.5 text-[#D98A00]" aria-hidden="true" />
              <span>আনন্দ কুইজ হাব ও ব্রেন বুস্টার</span>
            </div>
            <h2 id="quiz-hub-heading" className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              খেলার ছলে জ্ঞান অর্জন
            </h2>
          </div>
        </div>

        {/* Gamified Stats Badges */}
        <div className="flex items-center gap-2 self-end sm:self-auto" role="status" aria-label="গেম স্কোর ও স্ট্রিক">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-[#3A2300] text-xs sm:text-sm font-semibold">
            <Star className="w-4 h-4 text-[#FFB020] fill-[#FFB020]" aria-hidden="true" />
            <span>{score} স্টার</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#EEF8F3] border border-[#CBE5D8] text-[#00563F] text-xs sm:text-sm font-semibold">
            <Flame className="w-4 h-4 text-[#006A4E] fill-[#006A4E]/20" aria-hidden="true" />
            <span>{streak} স্ট্রিক!</span>
          </div>
        </div>
      </div>

      {/* Grade Selector Navigation (Soft-Solid 2.0 SegmentedControl) */}
      <SegmentedControl
        value={selectedClassId}
        onChange={handleClassChange}
        ariaLabel="কুইজের শ্রেণি নির্বাচন"
        roleMode="tablist"
        size="md"
        options={GRADE_TABS.map((tab) => ({
          value: tab.id,
          label: `${tab.icon} ${tab.label}`,
        }))}
      />

      {/* Subject Filter Pills */}
      <div className="flex items-center justify-between gap-2 flex-wrap pt-1 border-t border-slate-100">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {SUBJECT_FILTERS.map((s) => {
            const isSelected = selectedSubject === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSubjectChange(s.id)}
                aria-pressed={isSelected}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-semibold shrink-0 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006A4E] min-h-[38px] cursor-pointer touch-manipulation ${
                  isSelected
                    ? "bg-[#006A4E] text-white"
                    : "bg-[#F8FAFC] text-slate-700 hover:bg-[#EEF8F3] hover:text-[#00563F] border border-[#D5DCE4]"
                }`}
              >
                <span aria-hidden="true" className="text-sm">{s.icon}</span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#006A4E]" />
          <span>উপলব্ধ: <strong>{fullPool.length}</strong>টি প্রশ্ন</span>
        </div>
      </div>

      {/* Quiz Body */}
      {isCompleted ? (
        /* Completion Screen */
        <section 
          aria-label="কুইজ সমাপ্তি ফলাফল" 
          className="text-center py-8 sm:py-10 space-y-6 animate-fade-in max-w-md mx-auto"
        >
          <div 
            aria-hidden="true"
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-[#FFFBEB] border-2 border-[#FFB020] flex items-center justify-center text-4xl sm:text-5xl shadow-md pp-pop"
          >
            🏆
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              দারুণ করেছ! অভিনন্দন! 🎉
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              তুমি এই রাউন্ডের ১০টি প্রশ্নের উত্তর সাফল্যের সাথে শেষ করেছ।
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFBEB] border border-[#FFB020]/50 flex items-center justify-around">
            <div>
              <p className="text-xs text-[#3A2300] font-semibold">মোট স্কোর</p>
              <p className="text-xl sm:text-2xl font-bold text-[#3A2300] mt-1">⭐ {score}</p>
            </div>
            <div className="w-px h-10 bg-[#FFB020]/40" aria-hidden="true" />
            <div>
              <p className="text-xs text-[#3A2300] font-semibold">সর্বোচ্চ স্ট্রিক</p>
              <p className="text-xl sm:text-2xl font-bold text-[#3A2300] mt-1">🔥 {streak}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="play-marigold"
              leftIcon={<Shuffle className="w-4 h-4" />}
              onClick={handleRestart}
              className="w-full sm:w-auto"
            >
              নতুন ১০টি প্রশ্ন দিয়ে খেলো
            </Button>
            <Link
              href="/"
              className={getButtonClasses({
                variant: "secondary",
                size: "lg",
                className: "w-full sm:w-auto",
              })}
            >
              🏠 হোমে ফিরুন
            </Link>
          </div>
        </section>
      ) : currentQuestion ? (
        /* Active Question */
        <section aria-label={`প্রশ্ন ${currentIndex + 1}`} className="space-y-6">
          {/* Progress Bar & Question Meta */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
              <span className="px-2.5 py-1 rounded-full bg-[#EEF8F3] text-[#00563F] border border-[#CBE5D8]">
                বিষয়: {currentQuestion.subject}
              </span>
              <span aria-live="polite">
                প্রশ্ন {currentIndex + 1} / {classQuestions.length}
              </span>
            </div>
            <div 
              className="w-full h-2 sm:h-2.5 bg-slate-100 rounded-full overflow-hidden" 
              role="progressbar" 
              aria-valuenow={currentIndex + 1} 
              aria-valuemin={1} 
              aria-valuemax={classQuestions.length}
            >
              <div
                className="h-full bg-[#006A4E] rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / classQuestions.length) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Question Text & Sound Recitation */}
          <div className="p-5 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 text-center space-y-4">
            <div className="text-5xl sm:text-6xl" aria-hidden="true">
              {currentQuestion.imageEmoji}
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900 leading-snug">
              {currentQuestion.question}
            </h3>

            <div className="flex items-center justify-center gap-2.5 pt-1 flex-wrap">
              <AudioButton
                isPlaying={isSpeaking}
                onClick={() => handleSpeak(currentQuestion.question)}
                size="md"
                ariaLabel="প্রশ্নটি পড়ে শোনাও"
                playingAriaLabel="প্রশ্ন পড়া হচ্ছে"
              />

              {currentQuestion.hint && (
                <Button
                  variant="tonal"
                  size="sm"
                  leftIcon={<HelpCircle className="w-4 h-4" />}
                  onClick={() => setShowHint(!showHint)}
                  aria-expanded={showHint}
                  aria-label="প্রশ্নের ইঙ্গিত দেখুন"
                >
                  ইঙ্গিত
                </Button>
              )}
            </div>

            {/* Hint Card */}
            {showHint && currentQuestion.hint && (
              <aside 
                aria-label="ইঙ্গিত"
                className="p-3 bg-[#FFFBEB] border border-[#FFB020]/50 rounded-2xl text-xs text-[#3A2300] font-medium animate-fade-in max-w-md mx-auto text-left"
              >
                💡 <strong>ইঙ্গিত:</strong> {currentQuestion.hint}
              </aside>
            )}
          </div>

          {/* Soft-Solid 2.0 Quiz MCQ Option Cards Grid */}
          <div 
            role="group" 
            aria-label="উত্তরের বিকল্পসমূহ"
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = option.isCorrect;
              const optionLetter = ["ক", "খ", "গ", "ঘ"][idx] || String(idx + 1);

              let btnStyles =
                "border-[#D5DCE4] bg-white hover:border-[#006A4E] hover:bg-[#EEF8F3]/40 text-[#0F172A]";
              let badgeStyles = "bg-[#F1F5F9] text-[#334155]";

              if (isAnswered) {
                if (isSelected && isCorrect) {
                  btnStyles = "border-[#10956A] bg-[#EEF8F3] text-[#00563F] pp-pop shadow-sm";
                  badgeStyles = "bg-[#10956A] text-white";
                } else if (isSelected && !isCorrect) {
                  btnStyles = "border-[#E5484D] bg-[#FFF5F5] text-[#A1271F] pp-shake shadow-sm";
                  badgeStyles = "bg-[#E5484D] text-white";
                } else if (!isSelected && isCorrect) {
                  btnStyles = "border-[#10956A] bg-[#EEF8F3]/70 text-[#00563F]";
                  badgeStyles = "bg-[#10956A] text-white";
                } else {
                  btnStyles = "border-slate-200 bg-[#F8FAFC] text-slate-400";
                  badgeStyles = "bg-slate-200 text-slate-400";
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(idx)}
                  aria-pressed={isSelected}
                  className={`min-h-[56px] p-3.5 sm:p-4 rounded-[16px] text-left border-2 font-semibold text-sm sm:text-base lg:text-lg transition-all flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006A4E] ${btnStyles}`}
                >
                  <span
                    aria-hidden="true"
                    className={`w-8 h-8 rounded-[10px] flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${badgeStyles}`}
                  >
                    {optionLetter}
                  </span>
                  <span className="flex-1 break-words leading-relaxed">{option.label}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-[#10956A] shrink-0" aria-label="সঠিক উত্তর" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-[#E5484D] shrink-0" aria-label="ভুল উত্তর" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation & Student Play-Green Next CTA */}
          {isAnswered && (
            <aside 
              aria-label="ফলাফল ও শিখন বার্তা"
              className="p-4 sm:p-5 rounded-2xl bg-[#EEF8F3] border border-[#CBE5D8] text-[#00563F] space-y-3 animate-fade-in"
            >
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                <Award className="w-4 h-4 text-[#006A4E] shrink-0" aria-hidden="true" />
                <span>শিখন তথ্য ও ব্যাখ্যা:</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-[#0F172A] font-medium">
                {currentQuestion.explanation}
              </p>

              <div className="pt-1 flex justify-end">
                <Button
                  variant="play-green"
                  rightIcon={<ChevronRight className="w-5 h-5 pp-arrow" />}
                  onClick={handleNext}
                >
                  {currentIndex + 1 < classQuestions.length ? "পরের প্রশ্ন" : "ফলাফল দেখো"}
                </Button>
              </div>
            </aside>
          )}
        </section>
      ) : (
        <div className="text-center py-12 text-slate-500 font-semibold">
          এই ক্যাটাগরিতে কোনো প্রশ্ন পাওয়া যায়নি। অন্য বিষয় নির্বাচন করুন।
        </div>
      )}
    </article>
  );
}
