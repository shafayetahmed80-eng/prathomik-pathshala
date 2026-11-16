"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import {
  Volume2,
  RotateCcw,
  Star,
  Sparkles,
  Trophy,
  CheckCircle2,
  Compass,
} from "lucide-react";
import { VOWELS_DATA, CONSONANTS_DATA } from "@/data/bornomalaData";
import { ENGLISH_ALPHABET_DATA } from "@/data/englishAlphabetData";
import { safeSpeak, stopSpeech, unlockMobileAudio } from "@/utils/mobileSpeech";
import {
  playSuccessChime,
  playStarDing,
  playGentlePlop,
  playPopSound,
  playTrainWhistle,
  playCarriageSnap,
} from "@/utils/bornomalaAudio";

interface Props {
  onAddStars: (amount: number) => void;
  languageMode?: "bangla" | "english";
  teacherVoice?: "nabanita" | "pradeep" | "ana" | "guy";
}

type SequenceMode = "letters" | "numbers";

const BANGLA_DIGITS_ALL = [
  "০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "১০",
  "১১", "১২", "১৩", "১৪", "১৫", "১৬", "১৭", "১৮", "১৯", "২০",
  "২১", "২২", "২৩", "২৪", "২৫", "২৬", "২৭", "২৮", "২৯", "৩০",
  "৩১", "৩২", "৩৩", "৩৪", "৩৫", "৩৬", "৩৭", "৩৮", "৩৯", "৪০",
  "৪১", "৪২", "৪৩", "৪৪", "৪৫", "৪৬", "৪৭", "৪৮", "৪৯", "৫০",
  "৫১", "৫২", "৫৩", "৫৪", "৫৫", "৫৬", "৫৭", "৫৮", "৫৯", "৬০",
  "৬১", "৬২", "৬৩", "৬৪", "৬৫", "৬৬", "৬৭", "৬৮", "৬৯", "৭০",
  "৭১", "৭২", "৭৩", "৭৪", "৭৫", "৭৬", "৭৭", "৭৮", "৭৯", "৮০",
  "৮১", "৮২", "৮৩", "৮৪", "৮৫", "৮৬", "৮৭", "৮৮", "৮৯", "৯০",
  "৯১", "৯২", "৯৩", "৯৪", "৯৫", "৯৬", "৯৭", "৯৮", "৯৯", "১০০"
];

const BANGLA_LETTERS_ALL = [
  ...VOWELS_DATA.map((v) => v.char),
  ...CONSONANTS_DATA.map((c) => c.char),
];

const ENGLISH_LETTERS_ALL = ENGLISH_ALPHABET_DATA.filter((i) => i.type !== "number").map((i) => i.char);

interface SequencePuzzle {
  fullSequence: string[];
  missingIndex: number;
  correctAnswer: string;
  options: string[];
  mode: SequenceMode;
}

function generateSequencePuzzle(mode: SequenceMode, isEng: boolean): SequencePuzzle {
  let pool: string[] = [];

  if (isEng) {
    if (mode === "numbers") {
      pool = Array.from({ length: 50 }, (_, i) => `${i + 1}`);
    } else {
      pool = ENGLISH_LETTERS_ALL;
    }
  } else {
    if (mode === "numbers") {
      pool = BANGLA_DIGITS_ALL.slice(1, 51); // 1 to 50
    } else {
      pool = BANGLA_LETTERS_ALL;
    }
  }

  // Pick a starting point for a 4-item sequence
  const maxStart = Math.max(0, pool.length - 4);
  const startIdx = Math.floor(Math.random() * (maxStart + 1));
  const fullSequence = pool.slice(startIdx, startIdx + 4);

  // Missing index: 1 or 2 (middle gaps are best educational exercises)
  const missingIndex = Math.random() > 0.5 ? 1 : 2;
  const correctAnswer = fullSequence[missingIndex];

  // Distractors
  const distractors: string[] = [];
  const fullPool = [...pool];

  while (distractors.length < 3) {
    const candidate = fullPool[Math.floor(Math.random() * fullPool.length)];
    if (candidate !== correctAnswer && !distractors.includes(candidate)) {
      distractors.push(candidate);
    }
  }

  const options = [correctAnswer, ...distractors].sort(() => Math.random() - 0.5);

  return { fullSequence, missingIndex, correctAnswer, options, mode };
}

export default function BornomalaSequenceRunnerGame({
  onAddStars,
  languageMode = "bangla",
  teacherVoice,
}: Props) {
  const isEng = languageMode === "english";

  const [mode, setMode] = useState<SequenceMode>("letters");
  const [puzzle, setPuzzle] = useState<SequencePuzzle>(() =>
    generateSequencePuzzle("letters", isEng)
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [wobblingOption, setWobblingOption] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  const promptTimerRef = useRef<NodeJS.Timeout | null>(null);
  const advanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeVoice = isEng
    ? teacherVoice === "guy" || teacherVoice === "pradeep"
      ? "guy"
      : "ana"
    : teacherVoice === "pradeep" || teacherVoice === "guy"
      ? "pradeep"
      : "nabanita";

  const speakPrompt = useCallback(
    (p: SequencePuzzle) => {
      stopSpeech();
      if (isEng) {
        const text =
          p.mode === "numbers"
            ? `Find the missing number in the sequence!`
            : `Find the missing letter to complete the track!`;
        safeSpeak(text, { lang: "en-US", voice: activeVoice, rate: 0.88 });
      } else {
        const text =
          p.mode === "numbers"
            ? `রেললাইনের ক্রমধারায় ফাঁকা ঘরের সঠিক সংখ্যাটি বেছে নাও!`
            : `রেললাইনের ক্রমধারায় ফাঁকা ঘরের সঠিক বর্ণটি বেছে নাও!`;
        safeSpeak(text, { lang: "bn-BD", voice: activeVoice, rate: 0.85 });
      }
    },
    [isEng, activeVoice]
  );

  const initRound = useCallback(
    (curMode: SequenceMode = mode) => {
      if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      setIsCompleted(false);
      setSelectedAnswer(null);
      setWobblingOption(null);

      const next = generateSequencePuzzle(curMode, isEng);
      setPuzzle(next);

      promptTimerRef.current = setTimeout(() => {
        speakPrompt(next);
      }, 300);
    },
    [mode, isEng, speakPrompt]
  );

  // Initial prompt & unmount cleanup
  useEffect(() => {
    promptTimerRef.current = setTimeout(() => {
      speakPrompt(puzzle);
    }, 400);

    return () => {
      if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      stopSpeech();
    };
  }, [puzzle, speakPrompt]);

  const handleOptionClick = (option: string) => {
    if (isCompleted) return;

    unlockMobileAudio({ primeSilent: true });

    if (option === puzzle.correctAnswer) {
      // Correct option
      playCarriageSnap();
      setSelectedAnswer(option);
      setIsCompleted(true);
      setScore((s) => s + 1);
      setStreak((st) => st + 1);
      onAddStars(10);
      playStarDing();

      setTimeout(() => {
        playTrainWhistle();
        playSuccessChime();
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
        });

        const fullSeqText = puzzle.fullSequence.join(", ");
        if (isEng) {
          const praise = `Awesome! ${fullSeqText}! The missing one is ${puzzle.correctAnswer}!`;
          safeSpeak(praise, { lang: "en-US", voice: activeVoice, rate: 0.9 });
        } else {
          const praise = `চমৎকার! ${fullSeqText}! ফাঁকা ঘরে সঠিক উত্তর হলো ${puzzle.correctAnswer}!`;
          safeSpeak(praise, { lang: "bn-BD", voice: activeVoice, rate: 0.88 });
        }
      }, 300);

      // Advance after 2.8s
      advanceTimerRef.current = setTimeout(() => {
        initRound(mode);
      }, 2800);
    } else {
      // Wrong option
      playGentlePlop();
      setWobblingOption(option);
      setTimeout(() => setWobblingOption(null), 500);

      if (isEng) {
        safeSpeak("Not this one! Check the sequence before and after.", {
          lang: "en-US",
          voice: activeVoice,
          rate: 0.9,
        });
      } else {
        safeSpeak("হলো না! আগের ও পরের সংখ্যা বা বর্ণটি খেয়াল করো।", {
          lang: "bn-BD",
          voice: activeVoice,
          rate: 0.88,
        });
      }
    }
  };

  const handleModeChange = (nextMode: SequenceMode) => {
    playPopSound();
    unlockMobileAudio({ primeSilent: true });
    setMode(nextMode);
    initRound(nextMode);
  };

  const handleReplayPrompt = () => {
    unlockMobileAudio({ primeSilent: true });
    speakPrompt(puzzle);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* 🌟 Header & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 rounded-2xl border border-sky-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-sky-950 flex items-center gap-1.5 mr-1">
            <Compass className="w-4 h-4 text-sky-600" />
            <span>{isEng ? "Sequence Category:" : "ক্রমধারা নির্বাচন:"}</span>
          </span>

          <button
            type="button"
            onClick={() => handleModeChange("letters")}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
              mode === "letters"
                ? "bg-sky-600 text-white shadow-md scale-102"
                : "bg-white text-sky-800 hover:bg-sky-100/70 border border-sky-200"
            }`}
          >
            {isEng ? "🔤 Alphabet Sequence" : "🔤 বর্ণমালার ক্রমধারা"}
          </button>

          <button
            type="button"
            onClick={() => handleModeChange("numbers")}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
              mode === "numbers"
                ? "bg-sky-600 text-white shadow-md scale-102"
                : "bg-white text-sky-800 hover:bg-sky-100/70 border border-sky-200"
            }`}
          >
            {isEng ? "🔢 Number Sequence" : "🔢 সংখ্যার ক্রমধারা"}
          </button>
        </div>

        {/* Score & Streak badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 rounded-xl border border-sky-200 text-xs font-bold text-sky-800 shadow-xs">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>{isEng ? "Solved:" : "সঠিক:"}</span>
            <span className="font-extrabold text-sky-700">{score}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-amber-800 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{isEng ? "Streak:" : "টানা:"}</span>
            <span className="font-extrabold text-amber-700">{streak}</span>
          </div>
        </div>
      </div>

      {/* 🎯 Challenge Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white rounded-3xl p-5 shadow-lg border-2 border-sky-400/50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl sm:text-4xl shadow-inner border border-white/30 animate-pulse">
              🚂
            </div>

            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-sky-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                {isEng ? "Missing Link Runner" : "ক্রমধারার মিসিং লিংক"}
              </span>

              <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                {isEng ? "Fill the missing gap in the track!" : "রেললাইনের ফাঁকা ঘরের সঠিক বর্ণ বা সংখ্যা বসাও!"}
              </h2>

              <p className="text-xs text-sky-100 mt-1">
                {isEng
                  ? "Look at the sequence before and after to choose the correct plank below"
                  : "আগের ও পরের ঘর দেখে সঠিক স্লিপার নির্বাচন করে ট্রেন নিরাপদে পার করো"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReplayPrompt}
              className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-2xl border border-white/30 transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5 text-xs font-bold"
              title={isEng ? "Hear Instruction" : "নির্দেশ শোনো"}
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>{isEng ? "Hear Again" : "আবার শোনো"}</span>
            </button>

            <button
              type="button"
              onClick={() => initRound(mode)}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 transition-all hover:scale-105 active:scale-95 text-xs font-bold flex items-center gap-1.5"
              title={isEng ? "New Sequence" : "নতুন ধারা"}
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isEng ? "Next" : "নতুন"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🚂 THE RAILWAY BRIDGE & SEQUENCE PLATES */}
      <div className="bg-gradient-to-b from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-sky-800 shadow-xl overflow-hidden relative min-h-[300px] flex flex-col justify-between items-center">
        {/* River & Mountain Background elements */}
        <div className="absolute top-4 left-6 text-2xl opacity-60">🌄</div>
        <div className="absolute top-4 right-10 text-xl opacity-60">🌲</div>
        <div className="absolute -bottom-2 inset-x-0 h-10 bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-800 opacity-80 blur-xs" />

        {/* The 4-Plank Sequence Bridge Row */}
        <div className="relative z-10 w-full max-w-2xl my-auto">
          {/* Moving Toy Train passing over completed track */}
          <div
            className={`flex items-center gap-2 mb-3 transition-all duration-700 ${
              isCompleted ? "translate-x-32 sm:translate-x-56 scale-105" : "translate-x-0"
            }`}
          >
            <span className="text-3xl sm:text-4xl filter drop-shadow-md">🚂</span>
            <span className="text-2xl opacity-75">🚃</span>
            <span className="text-xl opacity-60">🚃</span>
          </div>

          {/* Sequence Planks / Track Ties */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full">
            {puzzle.fullSequence.map((item, idx) => {
              const isMissing = idx === puzzle.missingIndex;
              const isResolved = isMissing && isCompleted;

              return (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className={`w-full aspect-square max-w-[110px] rounded-2xl border-2 flex flex-col items-center justify-center font-black transition-all shadow-lg relative ${
                      isResolved
                        ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-300 animate-in zoom-in scale-105 shadow-[0_0_15px_#10b981]"
                        : isMissing
                        ? "bg-amber-500/20 border-amber-400 border-dashed text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.3)] animate-pulse"
                        : "bg-gradient-to-b from-sky-800 to-indigo-900 border-sky-400 text-white"
                    }`}
                  >
                    <span className="text-2xl sm:text-4xl font-black">
                      {isResolved ? selectedAnswer : isMissing ? "?" : item}
                    </span>

                    <span className="text-[10px] font-bold opacity-60 mt-1">
                      {isResolved ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 inline" />
                      ) : (
                        `ধাপ ${idx + 1}`
                      )}
                    </span>
                  </div>

                  {/* Railroad Ties underneath */}
                  <div className="w-12 h-2.5 bg-amber-900/90 rounded-xs mt-1 border-t border-amber-700" />
                </div>
              );
            })}
          </div>

          {/* Golden Rail Lines */}
          <div className="w-full h-1.5 bg-amber-400/80 rounded-full mt-2 shadow-[0_0_8px_#f59e0b]" />
        </div>

        {/* Success Card */}
        {isCompleted && (
          <div className="relative z-10 mt-4 p-3.5 bg-emerald-600 text-white rounded-2xl border border-emerald-400 shadow-lg text-center animate-in zoom-in duration-300 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-300" />
            <span className="font-extrabold text-sm sm:text-base">
              {isEng
                ? `Correct! Sequence completed with '${puzzle.correctAnswer}'! (+10 Stars)`
                : `চমৎকার! '${puzzle.correctAnswer}' দিয়ে ক্রমধারা সম্পূর্ণ হয়েছে! (+১০ স্টার)`}
            </span>
          </div>
        )}
      </div>

      {/* 🧩 CANDIDATE PLANKS (Options to Click & Fill the Gap) */}
      <div className="bg-gradient-to-b from-sky-50 to-indigo-50/50 rounded-3xl p-5 border-2 border-sky-200 shadow-sm">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-sky-100">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-600" />
            <h3 className="text-sm font-extrabold text-slate-900">
              {isEng ? "Pick the Correct Missing Plank:" : "সঠিক স্লিপারটি স্পর্শ করে ফাঁকা ঘরে বসাও:"}
            </h3>
          </div>
          <span className="text-xs font-bold text-sky-700">
            {isEng ? "4 Options" : "৪টি অপশন"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 py-2">
          {puzzle.options.map((opt, i) => {
            const isWobbling = wobblingOption === opt;

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleOptionClick(opt)}
                disabled={isCompleted}
                className={`py-4 sm:py-5 px-3 rounded-2xl border-2 font-black text-2xl sm:text-3xl flex items-center justify-center transition-all duration-200 select-none touch-manipulation shadow-md ${
                  isWobbling
                    ? "animate-shake bg-rose-500 text-white border-rose-300 scale-105"
                    : "bg-gradient-to-b from-white via-sky-50 to-blue-100 hover:from-sky-500 hover:to-indigo-600 hover:text-white border-sky-300 text-sky-950 hover:scale-105 active:scale-95 cursor-pointer"
                }`}
                aria-label={`অপশন ${opt}`}
              >
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
