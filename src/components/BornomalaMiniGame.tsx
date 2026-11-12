"use client";

import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
  Volume2,
  RotateCcw,
  Star,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Gamepad2,
} from "lucide-react";
import { VOWELS_DATA, CONSONANTS_DATA, NUMBERS_DATA, BornomalaItem } from "@/data/bornomalaData";
import {
  ENGLISH_ALPHABET_DATA,
  ENGLISH_VOWELS,
  ENGLISH_CONSONANTS,
  ENGLISH_NUMBERS_DATA,
  EnglishAlphabetItem,
} from "@/data/englishAlphabetData";
import { safeSpeak, stopSpeech, unlockMobileAudio } from "@/utils/mobileSpeech";
import { playSuccessChime, playStarDing, playGentlePlop, playPopSound } from "@/utils/bornomalaAudio";
import BornomalaBalloonPopGame from "./BornomalaBalloonPopGame";
import BornomalaMemoryGame from "./BornomalaMemoryGame";

interface Props {
  onBackToCanvas: () => void;
  onAddStars: (amount: number) => void;
  languageMode?: "bangla" | "english";
  teacherVoice?: "nabanita" | "pradeep" | "ana" | "guy";
  initialSeed?: number;
}

type ArcadeTab = "balloon-pop" | "quiz" | "memory";
type GameMode = "picture-to-letter" | "listen-to-letter" | "case-match";
type QuizCategory = "all" | "vowels" | "consonants" | "numbers";

function getCategoryPool(
  isEng: boolean,
  cat: QuizCategory
): (BornomalaItem | EnglishAlphabetItem)[] {
  if (isEng) {
    switch (cat) {
      case "vowels":
        return ENGLISH_VOWELS;
      case "consonants":
        return ENGLISH_CONSONANTS;
      case "numbers":
        return ENGLISH_NUMBERS_DATA;
      case "all":
      default:
        return ENGLISH_ALPHABET_DATA;
    }
  }
  switch (cat) {
    case "vowels":
      return VOWELS_DATA;
    case "consonants":
      return CONSONANTS_DATA;
    case "numbers":
      return NUMBERS_DATA;
    case "all":
    default:
      return [...VOWELS_DATA, ...CONSONANTS_DATA, ...NUMBERS_DATA];
  }
}

function getPhonicsCue(item: BornomalaItem | EnglishAlphabetItem): string | undefined {
  return "phonicsTtsCue" in item ? item.phonicsTtsCue : undefined;
}

function buildQuizRound(
  pool: (BornomalaItem | EnglishAlphabetItem)[],
  seed?: number
): { targetIndex: number; options: (BornomalaItem | EnglishAlphabetItem)[] } {
  if (pool.length === 0) return { targetIndex: 0, options: [] };
  const useDeterministicSeed = typeof seed === "number";
  const targetIndex = useDeterministicSeed
    ? Math.abs(Math.floor(seed)) % pool.length
    : Math.floor(Math.random() * pool.length);
  const target = pool[targetIndex];
  const targetCue = getPhonicsCue(target);
  const distractors: (BornomalaItem | EnglishAlphabetItem)[] = [];

  if (useDeterministicSeed) {
    // Spread deterministically across pool using prime step so SSR/initial open has no random calls
    let cursor = (targetIndex + 7) % pool.length;
    let guard = 0;
    while (distractors.length < 3 && guard < pool.length) {
      guard++;
      const candidate = pool[cursor];
      const candCue = getPhonicsCue(candidate);
      const conflictsCue = Boolean(targetCue && candCue && targetCue === candCue);
      if (
        candidate.id !== target.id &&
        !conflictsCue &&
        !distractors.some((d) => d.id === candidate.id)
      ) {
        distractors.push(candidate);
      }
      cursor = (cursor + 5) % pool.length;
    }
    const rotate = targetIndex % 4;
    const rawOpts = [target, ...distractors];
    const rotated = rawOpts.map((_, idx) => rawOpts[(idx + rotate) % rawOpts.length]);
    return { targetIndex, options: rotated };
  }

  let attempts = 0;
  while (distractors.length < 3 && attempts < 60) {
    attempts++;
    const rand = pool[Math.floor(Math.random() * pool.length)];
    const randCue = getPhonicsCue(rand);
    const conflictsCue = Boolean(targetCue && randCue && targetCue === randCue);
    if (
      rand.id !== target.id &&
      !conflictsCue &&
      !distractors.some((d) => d.id === rand.id)
    ) {
      distractors.push(rand);
    }
  }

  return {
    targetIndex,
    options: [target, ...distractors].sort(() => Math.random() - 0.5),
  };
}

export default function BornomalaMiniGame({
  onBackToCanvas,
  onAddStars,
  languageMode = "bangla",
  teacherVoice,
  initialSeed = 0,
}: Props) {
  const isEng = languageMode === "english";
  const [arcadeTab, setArcadeTab] = useState<ArcadeTab>("balloon-pop");
  const [gameMode, setGameMode] = useState<GameMode>("picture-to-letter");
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>("all");
  const [round, setRound] = useState(() =>
    buildQuizRound(getCategoryPool(isEng, "all"), initialSeed)
  );
  const [wrongOptionIds, setWrongOptionIds] = useState<string[]>([]);
  const [lastWrongItem, setLastWrongItem] = useState<BornomalaItem | EnglishAlphabetItem | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const advanceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const promptTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeVoice = isEng
    ? teacherVoice === "guy" || teacherVoice === "pradeep"
      ? "guy"
      : "ana"
    : teacherVoice === "pradeep" || teacherVoice === "guy"
      ? "pradeep"
      : "nabanita";

  const clearPendingTimers = () => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    if (promptTimerRef.current) {
      clearTimeout(promptTimerRef.current);
      promptTimerRef.current = null;
    }
  };

  const currentPool = getCategoryPool(isEng, selectedCategory);
  const currentIndex = round.targetIndex;
  const options = round.options;

  const speakTargetPrompt = (
    target: BornomalaItem | EnglishAlphabetItem,
    mode: GameMode = gameMode
  ) => {
    const isNum = target.type === "number";
    if (isEng) {
      if (mode === "case-match" && !isNum) {
        safeSpeak(`Find the small letter for capital ${target.char}!`, {
          lang: "en-US",
          voice: activeVoice,
          rate: 0.88,
        });
        return;
      }
      const cue = getPhonicsCue(target);
      const prompt = isNum
        ? `Find the number ${target.name}!`
        : cue
          ? `Listen carefully! Which letter says ${cue}, ${cue}?`
          : `Find the letter ${target.char}!`;
      safeSpeak(prompt, { lang: "en-US", voice: activeVoice, rate: 0.88 });
    } else {
      const soundText = target.pureSound || target.name;
      const prompt = isNum
        ? `খুঁজে বের করো সংখ্যা: ${soundText}`
        : `খুঁজে বের করো বর্ণ: ${soundText}`;
      safeSpeak(prompt, { lang: "bn-BD", voice: activeVoice, rate: 0.85 });
    }
  };

  // Cleanup speech & timers on unmount
  useEffect(() => {
    return () => {
      clearPendingTimers();
      stopSpeech();
    };
  }, []);

  // Shuffle and start a new round cleanly
  const startNewRound = (
    mode: GameMode = gameMode,
    category: QuizCategory = selectedCategory
  ) => {
    clearPendingTimers();
    setWrongOptionIds([]);
    setLastWrongItem(null);
    setIsCorrect(null);
    stopSpeech();

    const pool = getCategoryPool(isEng, category);
    if (pool.length === 0) return;

    const nextRound = buildQuizRound(pool);
    setRound(nextRound);
    const target = pool[nextRound.targetIndex];

    if (
      target &&
      (mode === "listen-to-letter" ||
        (mode === "case-match" && isEng && target.type !== "number"))
    ) {
      promptTimerRef.current = setTimeout(() => {
        speakTargetPrompt(target, mode);
      }, 200);
    }
  };

  const generateQuestion = () => {
    unlockMobileAudio({ primeSilent: true });
    startNewRound(gameMode, selectedCategory);
  };

  const handleModeSwitch = (nextMode: GameMode) => {
    playPopSound();
    unlockMobileAudio({ primeSilent: true });
    setGameMode(nextMode);
    startNewRound(nextMode, selectedCategory);
  };

  const handleCategorySwitch = (nextCat: QuizCategory) => {
    playPopSound();
    unlockMobileAudio({ primeSilent: true });
    const resolvedMode =
      nextCat === "numbers" && gameMode === "case-match"
        ? "picture-to-letter"
        : gameMode;
    setGameMode(resolvedMode);
    setSelectedCategory(nextCat);
    startNewRound(resolvedMode, nextCat);
  };

  const targetItem = currentPool[currentIndex] || currentPool[0];

  const handleSelectOption = (item: BornomalaItem | EnglishAlphabetItem) => {
    unlockMobileAudio({ primeSilent: true });
    if (isCorrect !== null) return;
    if (wrongOptionIds.includes(item.id)) return;

    if (item.id === targetItem.id) {
      const earnedStars = wrongOptionIds.length === 0 ? 10 : 5;
      setLastWrongItem(null);
      setIsCorrect(true);
      setScore((prev) => prev + earnedStars);
      setStreak((prev) => (wrongOptionIds.length === 0 ? prev + 1 : 0));
      onAddStars(earnedStars);
      playSuccessChime();
      playStarDing();

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#ec4899", "#3b82f6", "#10b981", "#f59e0b"]
      });

      const isNum = item.type === "number";
      if (isEng) {
        const praise = isNum
          ? `Awesome! ${item.char} means ${item.word}!`
          : `Awesome! ${item.char} is for ${item.word}!`;
        safeSpeak(praise, {
          lang: "en-US",
          voice: activeVoice,
          rate: 0.88,
        });
      } else {
        const praise = isNum
          ? `চমৎকার! ঠিক বলেছ! ${item.char} — ${item.word}!`
          : `চমৎকার! ঠিক বলেছ! ${item.char}-তে ${item.word}!`;
        safeSpeak(praise, {
          lang: "bn-BD",
          voice: activeVoice,
          rate: 0.9,
        });
      }

      // Auto advance after 1.6s using current mode & category
      clearPendingTimers();
      advanceTimerRef.current = setTimeout(() => {
        startNewRound(gameMode, selectedCategory);
      }, 1600);
    } else {
      setWrongOptionIds((prev) => [...prev, item.id]);
      setLastWrongItem(item);
      setIsCorrect(false);
      setStreak(0);
      playGentlePlop();
      if (isEng) {
        safeSpeak(`Try again! Pick another one!`, { lang: "en-US", voice: activeVoice, rate: 0.88 });
      } else {
        safeSpeak(`হলো না! আরেকটি চেষ্টা করো।`, { lang: "bn-BD", voice: activeVoice, rate: 0.9 });
      }
    }
  };

  const handleReplayAudio = () => {
    unlockMobileAudio({ primeSilent: true });
    speakTargetPrompt(targetItem, gameMode);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 🎮 Bornomala Game Arcade Master Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white rounded-3xl shadow-xl border border-indigo-700/60">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-2xl border border-white/20">
            <Gamepad2 className="w-6 h-6 text-amber-400 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base tracking-wide flex items-center gap-2">
              <span>{isEng ? "Bornomala Game Arcade" : "বর্ণমালা গেম আর্কেড"}</span>
              <span className="text-[10px] bg-amber-400 text-slate-900 font-black px-2 py-0.5 rounded-full uppercase">
                {isEng ? "Play & Learn" : "খেলাচ্ছলে শিক্ষা"}
              </span>
            </h3>
            <p className="text-[11px] text-indigo-200 hidden sm:block">
              {isEng
                ? "Fun educational games for literacy & foundational numeracy"
                : "প্রাক-প্রাথমিক ও প্রাথমিক শিশুদের জন্য আনন্দময় শিক্ষামূলক গেম"}
            </p>
          </div>
        </div>

        {/* Master Arcade Game Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-2xl border border-white/10">
          <button
            type="button"
            onClick={() => {
              playPopSound();
              unlockMobileAudio({ primeSilent: true });
              setArcadeTab("balloon-pop");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              arcadeTab === "balloon-pop"
                ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md scale-102"
                : "text-indigo-200 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>🎈</span>
            <span>{isEng ? "Balloon Pop" : "বেলুন পপ"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPopSound();
              unlockMobileAudio({ primeSilent: true });
              setArcadeTab("quiz");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              arcadeTab === "quiz"
                ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md scale-102"
                : "text-indigo-200 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>🎯</span>
            <span>{isEng ? "Letter Quiz" : "বর্ণ কুইজ"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPopSound();
              unlockMobileAudio({ primeSilent: true });
              setArcadeTab("memory");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              arcadeTab === "memory"
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md scale-102"
                : "text-indigo-200 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>🎴</span>
            <span>{isEng ? "Memory Flip" : "মেমোরি কার্ড"}</span>
          </button>
        </div>
      </div>

      {/* 🎈 TAB 1: BALLOON POP BLITZ GAME */}
      {arcadeTab === "balloon-pop" && (
        <BornomalaBalloonPopGame
          key={`balloon-${languageMode}`}
          onAddStars={onAddStars}
          languageMode={languageMode}
          teacherVoice={teacherVoice}
        />
      )}

      {/* 🎴 TAB 3: MEMORY MATCH FLIP GAME */}
      {arcadeTab === "memory" && (
        <BornomalaMemoryGame
          key={`memory-${languageMode}`}
          onAddStars={onAddStars}
          languageMode={languageMode}
          teacherVoice={teacherVoice}
        />
      )}

      {/* 🎯 TAB 2: CLASSIC PICTURE & PHONICS QUIZ */}
      {arcadeTab === "quiz" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Game Mode Switcher & Stats Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-200">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleModeSwitch("picture-to-letter")}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  gameMode === "picture-to-letter"
                    ? "bg-pink-600 text-white shadow-md scale-102"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {isEng ? "🖼️ Picture to Letter" : "🖼️ ছবি দেখে বর্ণ মেলাও"}
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch("listen-to-letter")}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  gameMode === "listen-to-letter"
                    ? "bg-purple-600 text-white shadow-md scale-102"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {isEng ? "🎧 Listen & Pick" : "🎧 শুনে বর্ণ বাছাই করো"}
              </button>
              {isEng && selectedCategory !== "numbers" && (
                <button
                  type="button"
                  onClick={() => handleModeSwitch("case-match")}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    gameMode === "case-match"
                      ? "bg-blue-600 text-white shadow-md scale-102"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  🔤 Capital ➔ Small Match
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs sm:text-sm font-bold">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{isEng ? `Score: ${score}` : `স্কোর: ${score}`}</span>
              </div>
              {streak > 1 && (
                <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold animate-pulse">
                  🔥 {streak} {isEng ? "Streak!" : "একটানা সঠিক!"}
                </div>
              )}
            </div>
          </div>

          {/* Category Filter Pills (Vowels, Consonants, Numbers) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="font-bold text-slate-500 shrink-0">{isEng ? "Topic:" : "বিষয়:"}</span>
            {(
              [
                { id: "all", label: isEng ? "All" : "সকল" },
                { id: "vowels", label: isEng ? "Vowels" : "স্বরবর্ণ" },
                { id: "consonants", label: isEng ? "Consonants" : "ব্যঞ্জনবর্ণ" },
                { id: "numbers", label: isEng ? "Numbers (০-১০০)" : "সংখ্যা (০-১০০)" },
              ] as { id: QuizCategory; label: string }[]
            ).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySwitch(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-slate-800 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Question Stage Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm text-center space-y-6">
            {/* Mode: Picture-to-Letter */}
            {gameMode === "picture-to-letter" && (
              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                  {isEng ? "Which letter starts this word?" : "এই ছবিটি কোন বর্ণের সাথে সম্পর্কিত?"}
                </p>
                <div className="flex flex-col items-center justify-center gap-2">
                  <span className="text-6xl sm:text-7xl filter drop-shadow-md select-none transform hover:scale-110 transition-transform">
                    {"imageEmoji" in targetItem && targetItem.imageEmoji ? targetItem.imageEmoji : "⭐"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-black text-slate-800">
                      {targetItem.word}
                    </span>
                    <button
                      type="button"
                      onClick={handleReplayAudio}
                      className="p-1.5 rounded-full hover:bg-slate-100 text-pink-600 transition-colors"
                      title={isEng ? "Listen audio" : "উচ্চারণ শুনুন"}
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  {"wordMeaningBn" in targetItem && targetItem.wordMeaningBn && (
                    <span className="text-xs font-semibold text-slate-500">
                      ({targetItem.wordMeaningBn})
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Mode: Listen-to-Letter */}
            {gameMode === "listen-to-letter" && (
              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                  {isEng ? "Listen carefully and choose the matching letter:" : "মনোযোগ দিয়ে শুনে সঠিক বর্ণটি নির্বাচন করো:"}
                </p>
                <div className="flex flex-col items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleReplayAudio}
                    className="relative group p-6 rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-xl hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-purple-300"
                    title={isEng ? "Click to replay audio" : "পুনরায় শুনতে ক্লিক করুন"}
                  >
                    <span className="absolute -inset-1 rounded-3xl bg-purple-400 opacity-40 group-hover:opacity-75 blur-sm animate-pulse" />
                    <span className="relative text-5xl sm:text-6xl filter drop-shadow select-none">
                      🎧
                    </span>
                  </button>
                  <span className="text-xs font-bold text-purple-700 animate-pulse">
                    {isEng ? "Tap headphone to listen again" : "শব্দ শুনতে হেডফোনে ট্যাপ করো"}
                  </span>
                </div>
              </div>
            )}

            {/* Mode: Capital to Small Match */}
            {gameMode === "case-match" && isEng && (
              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                  Match the Small Letter for:
                </p>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-24 h-24 rounded-3xl bg-blue-50 border-2 border-blue-300 flex items-center justify-center shadow-inner">
                    <span className="text-6xl font-black text-blue-700">
                      {targetItem.char}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    Capital {targetItem.char}
                  </span>
                </div>
              </div>
            )}

            {/* 4 Interactive Option Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto pt-2">
              {options.map((item) => {
                const isSelectedAndCorrect = isCorrect === true && item.id === targetItem.id;
                const isWrong = wrongOptionIds.includes(item.id);

                const displayGlyph =
                  gameMode === "case-match" && "lowerChar" in item
                    ? item.lowerChar
                    : item.char;

                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={isCorrect === true || isWrong}
                    onClick={() => handleSelectOption(item)}
                    className={`relative p-5 sm:p-6 rounded-2xl border-2 font-black transition-all transform active:scale-95 flex flex-col items-center justify-center gap-2 shadow-sm ${
                      isSelectedAndCorrect
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 scale-105 shadow-md ring-4 ring-emerald-200"
                        : isWrong
                        ? "border-rose-300 bg-rose-50 text-rose-400 opacity-50 cursor-not-allowed scale-95"
                        : "border-slate-200 bg-white hover:border-pink-400 hover:bg-pink-50/50 text-slate-800 hover:scale-102 shadow-xs"
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl">
                      {displayGlyph}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 truncate max-w-full">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Feedback Alert */}
            {(isCorrect === true || (isCorrect === false && lastWrongItem)) && (
              <div className="pt-2 animate-in zoom-in-95 duration-200">
                {isCorrect === true ? (
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-sm border border-emerald-200 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>
                      {isEng
                        ? targetItem.type === "number"
                          ? `Great! '${targetItem.char}' — ${targetItem.word} — Correct! 🎉`
                          : `Great! '${targetItem.char}' is for ${targetItem.word} — Correct! 🎉`
                        : targetItem.type === "number"
                        ? `দারুণ! '${targetItem.char}' (${targetItem.word}) — সঠিক উত্তর! 🎉`
                        : `দারুণ! '${targetItem.char}'-তে ${targetItem.word} — সঠিক উত্তর! 🎉`}
                    </span>
                  </div>
                ) : lastWrongItem ? (
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-100 text-amber-900 font-bold text-sm border border-amber-200 shadow-sm">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>
                      {(() => {
                        const wrongGlyph =
                          gameMode === "case-match" && "lowerChar" in lastWrongItem
                            ? lastWrongItem.lowerChar
                            : lastWrongItem.char;
                        return isEng
                          ? `Not '${wrongGlyph}' — try another option!`
                          : `'${wrongGlyph}' নয় — আরেকটি বিকল্প চেষ্টা করো!`;
                      })()}
                    </span>
                  </div>
                ) : null}
              </div>
            )}

            {/* Actions Footer */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={generateQuestion}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{isEng ? "Next Question" : "পরের প্রশ্ন"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Arcade Bottom Action: Return to Handwriting Canvas */}
      <div className="pt-2 flex items-center justify-center">
        <button
          type="button"
          onClick={onBackToCanvas}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-slate-900 hover:bg-black text-white font-black text-xs sm:text-sm shadow-md transition-all active:scale-95"
        >
          <span>{isEng ? "Back to Tracing Canvas" : "হাতেখড়ি ক্যানভাসে ফিরুন"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
