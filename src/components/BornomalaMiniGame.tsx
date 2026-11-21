"use client";

import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
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
import BornomalaNumberCountingGame from "./BornomalaNumberCountingGame";
import BornomalaWordBuilderGame from "./BornomalaWordBuilderGame";
import BornomalaJuktobornoGame from "./BornomalaJuktobornoGame";
import BornomalaSequenceRunnerGame from "./BornomalaSequenceRunnerGame";
import { Button, SegmentedControl, AudioButton } from "@/components/ui";

interface Props {
  onBackToCanvas: () => void;
  onAddStars: (amount: number) => void;
  languageMode?: "bangla" | "english";
  teacherVoice?: "nabanita" | "pradeep" | "ana" | "guy";
  initialSeed?: number;
}

type ArcadeTab =
  | "balloon-pop"
  | "counting"
  | "word-builder"
  | "juktoborno"
  | "sequence"
  | "memory"
  | "quiz";
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
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#0F172A] text-white rounded-3xl shadow-md border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/10 rounded-2xl border border-white/15">
            <Gamepad2 className="w-6 h-6 text-[#FFB020]" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base tracking-wide flex items-center gap-2">
              <span>{isEng ? "Bornomala Game Arcade" : "বর্ণমালা গেম আর্কেড"}</span>
              <span className="text-[10px] bg-[#FFB020] text-[#3A2300] font-bold px-2 py-0.5 rounded-full uppercase">
                {isEng ? "Play & Learn" : "খেলাচ্ছলে শিক্ষা"}
              </span>
            </h3>
            <p className="text-[11px] text-slate-300 hidden sm:block">
              {isEng
                ? "Fun educational games for literacy & foundational numeracy"
                : "প্রাক-প্রাথমিক ও প্রাথমিক শিশুদের জন্য আনন্দময় শিক্ষামূলক গেম"}
            </p>
          </div>
        </div>

        {/* Master Arcade Game Switcher Tabs (Clean Soft-Solid pills, zero rainbow gradients) */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/10 p-1 rounded-2xl border border-white/10" role="tablist" aria-label="বর্ণমালা গেম নির্বাচন">
          {(
            [
              { id: "balloon-pop", icon: "🎈", label: isEng ? "Balloon Pop" : "বেলুন পপ" },
              { id: "counting", icon: "🍎", label: isEng ? "Number Safari" : "ফল গণনা ট্রেন" },
              { id: "word-builder", icon: "🚂", label: isEng ? "Word Train" : "শব্দ ট্রেন" },
              { id: "juktoborno", icon: "✨", label: isEng ? "Magic Blends" : "যুক্তবর্ণ ম্যাজিক" },
              { id: "sequence", icon: "🧩", label: isEng ? "Sequence Gap" : "ক্রমধারা রানার" },
              { id: "memory", icon: "🎴", label: isEng ? "Memory Flip" : "মেমোরি কার্ড" },
              { id: "quiz", icon: "🎯", label: isEng ? "Letter Quiz" : "বর্ণ কুইজ" },
            ] as const
          ).map((tab) => {
            const isSelected = arcadeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  playPopSound();
                  unlockMobileAudio({ primeSilent: true });
                  setArcadeTab(tab.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB020] ${
                  isSelected
                    ? "bg-[#FFB020] text-[#3A2300] shadow-xs"
                    : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
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

      {/* 🍎 TAB 2: NUMBER COUNTING & FRUIT BASKET GAME */}
      {arcadeTab === "counting" && (
        <BornomalaNumberCountingGame
          key={`counting-${languageMode}`}
          onAddStars={onAddStars}
          languageMode={languageMode}
          teacherVoice={teacherVoice}
        />
      )}

      {/* 🚂 TAB 3: WORD BUILDER TRAIN GAME */}
      {arcadeTab === "word-builder" && (
        <BornomalaWordBuilderGame
          key={`word-builder-${languageMode}`}
          onAddStars={onAddStars}
          languageMode={languageMode}
          teacherVoice={teacherVoice}
        />
      )}

      {/* ✨ TAB 4: JUKTOBORNO MAGIC WORKSHOP GAME */}
      {arcadeTab === "juktoborno" && (
        <BornomalaJuktobornoGame
          key={`juktoborno-${languageMode}`}
          onAddStars={onAddStars}
          languageMode={languageMode}
          teacherVoice={teacherVoice}
        />
      )}

      {/* 🧩 TAB 5: SEQUENCE RUNNER & MISSING LINK GAME */}
      {arcadeTab === "sequence" && (
        <BornomalaSequenceRunnerGame
          key={`sequence-${languageMode}`}
          onAddStars={onAddStars}
          languageMode={languageMode}
          teacherVoice={teacherVoice}
        />
      )}

      {/* 🎴 TAB 6: MEMORY MATCH FLIP GAME */}
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
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200">
            <SegmentedControl
              value={gameMode}
              onChange={handleModeSwitch}
              ariaLabel="গেম মোড নির্বাচন"
              roleMode="radiogroup"
              size="sm"
              options={[
                { value: "picture-to-letter", label: isEng ? "🖼️ Picture to Letter" : "🖼️ ছবি দেখে বর্ণ মেলাও" },
                { value: "listen-to-letter", label: isEng ? "🎧 Listen & Pick" : "🎧 শুনে বর্ণ বাছাই করো" },
                ...(isEng && selectedCategory !== "numbers"
                  ? [{ value: "case-match" as const, label: "🔤 Capital ➔ Small" }]
                  : []),
              ]}
            />

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFBEB] border border-[#FFB020]/50 text-[#3A2300] text-xs sm:text-sm font-semibold">
                <Star className="w-4 h-4 text-[#FFB020] fill-[#FFB020]" />
                <span>{isEng ? `Score: ${score}` : `স্কোর: ${score}`}</span>
              </div>
              {streak > 1 && (
                <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#EEF8F3] border border-[#CBE5D8] text-[#00563F] text-xs font-semibold">
                  🔥 {streak} {isEng ? "Streak!" : "একটানা সঠিক!"}
                </div>
              )}
            </div>
          </div>

          {/* Category Filter Pills (Vowels, Consonants, Numbers) */}
          <SegmentedControl
            value={selectedCategory}
            onChange={handleCategorySwitch}
            ariaLabel={isEng ? "Topic" : "বিষয় নির্বাচন"}
            roleMode="radiogroup"
            size="sm"
            options={[
              { value: "all", label: isEng ? "All" : "সকল" },
              { value: "vowels", label: isEng ? "Vowels" : "স্বরবর্ণ" },
              { value: "consonants", label: isEng ? "Consonants" : "ব্যঞ্জনবর্ণ" },
              { value: "numbers", label: isEng ? "Numbers (০-১০০)" : "সংখ্যা (০-১০০)" },
            ]}
          />

          {/* Question Stage Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm text-center space-y-6">
            {/* Mode: Picture-to-Letter */}
            {gameMode === "picture-to-letter" && (
              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                  {isEng ? "Which letter starts this word?" : "এই ছবিটি কোন বর্ণের সাথে সম্পর্কিত?"}
                </p>
                <div className="flex flex-col items-center justify-center gap-2">
                  <span className="text-6xl sm:text-7xl select-none">
                    {"imageEmoji" in targetItem && targetItem.imageEmoji ? targetItem.imageEmoji : "⭐"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-slate-900">
                      {targetItem.word}
                    </span>
                    <AudioButton
                      isPlaying={false}
                      onClick={handleReplayAudio}
                      size="sm"
                      ariaLabel={isEng ? "Listen audio" : "উচ্চারণ শুনুন"}
                    />
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
                  <Button
                    variant="play-marigold"
                    onClick={handleReplayAudio}
                    title={isEng ? "Click to replay audio" : "পুনরায় শুনতে ক্লিক করুন"}
                    className="h-auto py-4 px-8 rounded-[20px] flex-col gap-1.5"
                  >
                    <span className="text-4xl sm:text-5xl select-none" aria-hidden="true">🎧</span>
                    <span className="text-xs sm:text-sm font-bold">
                      {isEng ? "Tap to Listen Again" : "শব্দ শুনতে ট্যাপ করো"}
                    </span>
                  </Button>
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
                  <div className="w-24 h-24 rounded-3xl bg-[#EEF8F3] border-2 border-[#006A4E]/40 flex items-center justify-center shadow-inner">
                    <span className="text-6xl font-bold text-[#00563F]">
                      {targetItem.char}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    Capital {targetItem.char}
                  </span>
                </div>
              </div>
            )}

            {/* 4 Interactive Option Cards (Soft-Solid 2.0 Quiz Tiles) */}
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
                    className={`relative p-5 sm:p-6 rounded-[16px] border-2 font-bold transition-all flex flex-col items-center justify-center gap-2 cursor-pointer touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006A4E] ${
                      isSelectedAndCorrect
                        ? "border-[#10956A] bg-[#EEF8F3] text-[#00563F] pp-pop shadow-sm"
                        : isWrong
                        ? "border-[#E5484D] bg-[#FFF5F5] text-[#A1271F] opacity-60 cursor-not-allowed pp-shake"
                        : "border-[#D5DCE4] bg-white hover:border-[#006A4E] hover:bg-[#EEF8F3]/40 text-slate-900"
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
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#EEF8F3] text-[#00563F] font-semibold text-sm border border-[#10956A] shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-[#10956A]" />
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
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#FFF5F5] text-[#A1271F] font-semibold text-sm border border-[#E5484D]/50 shadow-xs">
                    <XCircle className="w-5 h-5 text-[#E5484D]" />
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
              <Button
                variant="play-green"
                leftIcon={<RotateCcw className="w-4 h-4" />}
                onClick={generateQuestion}
              >
                {isEng ? "Next Question" : "পরের প্রশ্ন"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Global Arcade Bottom Action: Return to Handwriting Canvas */}
      <div className="pt-2 flex items-center justify-center">
        <Button
          variant="ink"
          size="md"
          rightIcon={<ArrowRight className="w-4 h-4 pp-arrow" />}
          onClick={onBackToCanvas}
        >
          {isEng ? "Back to Tracing Canvas" : "হাতেখড়ি ক্যানভাসে ফিরুন"}
        </Button>
      </div>
    </div>
  );
}
