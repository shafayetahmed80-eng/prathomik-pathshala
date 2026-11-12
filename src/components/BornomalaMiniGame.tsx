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

interface Props {
  onBackToCanvas: () => void;
  onAddStars: (amount: number) => void;
  languageMode?: "bangla" | "english";
  teacherVoice?: "nabanita" | "pradeep" | "ana" | "guy";
  initialSeed?: number;
}

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
    if (isCorrect === true || wrongOptionIds.includes(item.id)) return;

    playPopSound();
    unlockMobileAudio({ primeSilent: true });

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
            {
              id: "all",
              label: isEng ? "🌈 All Letters" : "🌈 সকল বর্ণ ও সংখ্যা",
              activeCls: "bg-slate-800 text-white shadow-xs",
              idleCls: "bg-slate-100 text-slate-600 hover:bg-slate-200",
            },
            {
              id: "vowels",
              label: isEng ? "🌸 Vowels (5)" : "🌸 স্বরবর্ণ (১১)",
              activeCls: "bg-pink-600 text-white shadow-xs",
              idleCls: "bg-pink-50 text-pink-700 hover:bg-pink-100",
            },
            {
              id: "consonants",
              label: isEng ? "🌿 Consonants (21)" : "🌿 ব্যঞ্জনবর্ণ (৩৯)",
              activeCls: "bg-emerald-600 text-white shadow-xs",
              idleCls: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
            },
            {
              id: "numbers",
              label: isEng ? "🔢 Numbers (0-20)" : "🔢 সংখ্যা (০-২০)",
              activeCls: "bg-amber-600 text-white shadow-xs",
              idleCls: "bg-amber-50 text-amber-700 hover:bg-amber-100",
            },
          ] as const
        ).map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategorySwitch(cat.id)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
              selectedCategory === cat.id ? cat.activeCls : cat.idleCls
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Question Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border-2 border-pink-100 shadow-lg text-center space-y-6">
        {gameMode === "picture-to-letter" ? (
          <div className="space-y-3">
            <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block">
              {isEng
                ? targetItem.type === "number"
                  ? "Count / look at the card and tap the matching number"
                  : "Look at the picture and tap the correct letter"
                : targetItem.type === "number"
                ? "ছবি দেখে সঠিক সংখ্যাটিতে ট্যাপ করো"
                : "ছবি দেখে সঠিক বর্ণটিতে ট্যাপ করো"}
            </span>
            <div className="text-8xl sm:text-9xl p-4 bg-pink-50 rounded-3xl inline-block shadow-inner border border-pink-100 animate-bounce duration-1000">
              {targetItem.imageEmoji}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
              {targetItem.word} {"wordMeaningBn" in targetItem && targetItem.wordMeaningBn ? `(${targetItem.wordMeaningBn})` : ""}
            </h3>
          </div>
        ) : gameMode === "case-match" && isEng && targetItem.type !== "number" ? (
          <div className="space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
              Find the matching Small Letter (ছোটহাতের বর্ণ) for this Capital Letter:
            </span>
            <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-3xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-700 font-black text-6xl sm:text-7xl shadow-inner">
              {"upperChar" in targetItem ? targetItem.upperChar : targetItem.char}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800">
              Capital {targetItem.char} ➔ ?
            </h3>
          </div>
        ) : (
          <div className="space-y-4">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest block">
              {isEng
                ? targetItem.type === "number"
                  ? "Listen carefully and select the correct number"
                  : "Listen carefully and select the correct letter"
                : targetItem.type === "number"
                ? "মন দিয়ে শুনে সঠিক সংখ্যাটি নির্বাচন করো"
                : "মন দিয়ে শুনে সঠিক বর্ণটি নির্বাচন করো"}
            </span>
            <button
              type="button"
              onClick={handleReplayAudio}
              className={`w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-3xl flex items-center justify-center text-5xl shadow-md transition-all hover:scale-105 active:scale-95 ${
                isCorrect === null
                  ? "bg-purple-100 text-purple-600 ring-4 ring-purple-300/60 animate-pulse cursor-pointer"
                  : "bg-purple-50 text-purple-400 cursor-default"
              }`}
              title={isEng ? "Click to replay audio" : "উচ্চারণ পুনরায় শুনতে ক্লিক করো"}
              aria-label={isEng ? "Replay audio cue" : "উচ্চারণ আবার শুনুন"}
            >
              🎧
            </button>
            <div>
              <button
                type="button"
                onClick={handleReplayAudio}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <Volume2 className="w-5 h-5 animate-pulse" />
                <span>{isEng ? "Listen Again (Replay)" : "উচ্চারণ আবার শোনো"}</span>
              </button>
            </div>
          </div>
        )}

        {/* 4 Multi-choice Option Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto pt-4">
          {options.map((opt) => {
            const isWrongPicked = wrongOptionIds.includes(opt.id);
            const isThisTarget = opt.id === targetItem.id;
            const showOptionName = gameMode !== "case-match" || isCorrect === true;

            let buttonStyle = "bg-slate-50 hover:bg-pink-50 border-2 border-slate-200 text-slate-800";
            if (isCorrect === true) {
              if (isThisTarget) {
                buttonStyle = "bg-emerald-500 text-white border-2 border-emerald-600 scale-105 shadow-lg";
              } else if (isWrongPicked) {
                buttonStyle = "bg-rose-100 text-rose-500 border-2 border-rose-200 opacity-70";
              } else {
                buttonStyle = "opacity-40 bg-slate-100 border-slate-200 text-slate-400";
              }
            } else if (isWrongPicked) {
              buttonStyle = "bg-rose-500 text-white border-2 border-rose-600 animate-shake cursor-not-allowed opacity-90";
            }

            const optionGlyph = gameMode === "case-match" && "lowerChar" in opt
              ? opt.lowerChar
              : opt.char;

            return (
              <button
                key={opt.id}
                type="button"
                disabled={isCorrect === true || isWrongPicked}
                onClick={() => handleSelectOption(opt)}
                className={`h-24 sm:h-28 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-95 font-black text-4xl sm:text-5xl ${buttonStyle}`}
              >
                <span>{optionGlyph}</span>
                {showOptionName && (
                  <span className="text-[11px] font-semibold opacity-80">{opt.name}</span>
                )}
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
          <button
            type="button"
            onClick={onBackToCanvas}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm transition-colors"
          >
            <span>{isEng ? "Back to Canvas" : "হাতেখড়ি ক্যানভাসে ফিরুন"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
