"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import {
  Volume2,
  RotateCcw,
  Star,
  Sparkles,
  Trophy,
  Play,
  Pause,
  Zap,
} from "lucide-react";
import {
  VOWELS_DATA,
  CONSONANTS_DATA,
  NUMBERS_DATA,
  BornomalaItem,
} from "@/data/bornomalaData";
import {
  ENGLISH_ALPHABET_DATA,
  ENGLISH_VOWELS,
  ENGLISH_CONSONANTS,
  ENGLISH_NUMBERS_DATA,
  EnglishAlphabetItem,
} from "@/data/englishAlphabetData";
import { safeSpeak, stopSpeech, unlockMobileAudio } from "@/utils/mobileSpeech";
import {
  playSuccessChime,
  playStarDing,
  playGentlePlop,
  playPopSound,
} from "@/utils/bornomalaAudio";

interface Props {
  onAddStars: (amount: number) => void;
  languageMode?: "bangla" | "english";
  teacherVoice?: "nabanita" | "pradeep" | "ana" | "guy";
}

type SpeedMode = "slow" | "normal" | "blitz";
type GameCategory = "all" | "vowels" | "consonants" | "numbers";
type NumberRange = "all" | "0-20" | "21-50" | "51-100";

interface BalloonState {
  id: string;
  item: BornomalaItem | EnglishAlphabetItem;
  x: number; // percentage (10% to 80%)
  y: number; // percentage (starts at 105%, rises to -25%)
  speed: number; // percentage per frame
  colorIdx: number;
  swayOffset: number;
  swaySpeed: number;
  popping: boolean;
  wobbling: boolean;
}

const BALLOON_GRADIENTS = [
  {
    bg: "from-rose-500 via-pink-500 to-rose-600",
    border: "border-rose-300",
    shadow: "rgba(244, 63, 94, 0.4)",
    knot: "#e11d48",
  },
  {
    bg: "from-sky-500 via-blue-500 to-indigo-600",
    border: "border-sky-300",
    shadow: "rgba(14, 165, 233, 0.4)",
    knot: "#0284c7",
  },
  {
    bg: "from-emerald-500 via-teal-500 to-green-600",
    border: "border-emerald-300",
    shadow: "rgba(16, 185, 129, 0.4)",
    knot: "#059669",
  },
  {
    bg: "from-amber-400 via-orange-500 to-amber-600",
    border: "border-amber-200",
    shadow: "rgba(245, 158, 11, 0.4)",
    knot: "#d97706",
  },
  {
    bg: "from-purple-500 via-violet-500 to-purple-600",
    border: "border-purple-300",
    shadow: "rgba(168, 85, 247, 0.4)",
    knot: "#7c3aed",
  },
  {
    bg: "from-cyan-400 via-teal-400 to-emerald-500",
    border: "border-cyan-200",
    shadow: "rgba(6, 182, 212, 0.4)",
    knot: "#0891b2",
  },
];

function getInitialPool(isEng: boolean): (BornomalaItem | EnglishAlphabetItem)[] {
  return isEng ? ENGLISH_ALPHABET_DATA : [...VOWELS_DATA, ...CONSONANTS_DATA];
}

function createInitialBalloons(
  pool: (BornomalaItem | EnglishAlphabetItem)[],
  targetItem: BornomalaItem | EnglishAlphabetItem
): BalloonState[] {
  const initialBalloons: BalloonState[] = [];
  for (let i = 0; i < 5; i++) {
    const isTargetBalloon = i === 0;
    const item = isTargetBalloon
      ? targetItem
      : pool[Math.floor(Math.random() * pool.length)] || pool[0];
    initialBalloons.push({
      id: `b-init-${i}-${Math.random().toString(36).slice(2, 6)}`,
      item,
      x: 10 + i * 16,
      y: 35 + i * 18,
      speed: 0.35,
      colorIdx: i % BALLOON_GRADIENTS.length,
      swayOffset: i * 1.2,
      swaySpeed: 0.03,
      popping: false,
      wobbling: false,
    });
  }
  return initialBalloons;
}

export default function BornomalaBalloonPopGame({
  onAddStars,
  languageMode = "bangla",
  teacherVoice,
}: Props) {
  const isEng = languageMode === "english";
  const [category, setCategory] = useState<GameCategory>("all");
  const [numberRange, setNumberRange] = useState<NumberRange>("0-20");
  const [speedMode, setSpeedMode] = useState<SpeedMode>("normal");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [target, setTarget] = useState<BornomalaItem | EnglishAlphabetItem | null>(() => {
    const pool = getInitialPool(isEng);
    return pool[0] || null;
  });
  const [balloons, setBalloons] = useState<BalloonState[]>(() => {
    const pool = getInitialPool(isEng);
    return createInitialBalloons(pool, pool[0]);
  });
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [poppedCount, setPoppedCount] = useState<number>(0);
  const [floatingPoints, setFloatingPoints] = useState<
    { id: string; x: number; y: number; text: string }[]
  >([]);

  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const balloonsRef = useRef<BalloonState[]>([]);
  const targetRef = useRef<BornomalaItem | EnglishAlphabetItem | null>(null);
  const idCounterRef = useRef<number>(1);

  const activeVoice = isEng
    ? teacherVoice === "guy" || teacherVoice === "pradeep"
      ? "guy"
      : "ana"
    : teacherVoice === "pradeep" || teacherVoice === "guy"
      ? "pradeep"
      : "nabanita";

  // Keep refs in sync for the high-fps requestAnimationFrame loop
  useEffect(() => {
    balloonsRef.current = balloons;
    targetRef.current = target;
  }, [balloons, target]);

  // Build the active item pool based on category & number range
  const getActivePool = useCallback((): (BornomalaItem | EnglishAlphabetItem)[] => {
    if (isEng) {
      if (category === "vowels") return ENGLISH_VOWELS;
      if (category === "consonants") return ENGLISH_CONSONANTS;
      if (category === "numbers") {
        if (numberRange === "0-20") return ENGLISH_NUMBERS_DATA.slice(0, 21);
        if (numberRange === "21-50") return ENGLISH_NUMBERS_DATA.slice(21, 51);
        if (numberRange === "51-100") return ENGLISH_NUMBERS_DATA.slice(51, 101);
        return ENGLISH_NUMBERS_DATA;
      }
      return ENGLISH_ALPHABET_DATA;
    }

    if (category === "vowels") return VOWELS_DATA;
    if (category === "consonants") return CONSONANTS_DATA;
    if (category === "numbers") {
      if (numberRange === "0-20") return NUMBERS_DATA.slice(0, 21);
      if (numberRange === "21-50") return NUMBERS_DATA.slice(21, 51);
      if (numberRange === "51-100") return NUMBERS_DATA.slice(51, 101);
      return NUMBERS_DATA;
    }
    return [...VOWELS_DATA, ...CONSONANTS_DATA];
  }, [isEng, category, numberRange]);

  // Voice announcement for target
  const speakTarget = useCallback(
    (item: BornomalaItem | EnglishAlphabetItem) => {
      const isNum = item.type === "number";
      if (isEng) {
        const text = isNum
          ? `Pop the number ${item.name}!`
          : `Pop the balloon with letter ${item.char}!`;
        safeSpeak(text, { lang: "en-US", voice: activeVoice, rate: 0.88 });
      } else {
        const soundText = item.pureSound || item.name;
        const text = isNum
          ? `খুঁজে বেলুন ফাটাও: সংখ্যা ${soundText}`
          : `খুঁজে বের করো: ${soundText}`;
        safeSpeak(text, { lang: "bn-BD", voice: activeVoice, rate: 0.85 });
      }
    },
    [isEng, activeVoice]
  );

  // Speed multiplier
  const getSpeedMultiplier = useCallback(() => {
    switch (speedMode) {
      case "slow":
        return 0.7;
      case "blitz":
        return 1.4;
      case "normal":
      default:
        return 1.0;
    }
  }, [speedMode]);

  // Max active balloons on screen
  const getMaxBalloons = useCallback(() => {
    switch (speedMode) {
      case "slow":
        return 4;
      case "blitz":
        return 7;
      case "normal":
      default:
        return 5;
    }
  }, [speedMode]);

  // Spawn a fresh balloon
  const spawnBalloon = useCallback(
    (
      pool: (BornomalaItem | EnglishAlphabetItem)[],
      forceTarget?: BornomalaItem | EnglishAlphabetItem,
      startY = 105
    ): BalloonState => {
      const item =
        forceTarget || pool[Math.floor(Math.random() * pool.length)] || pool[0];
      const speedMult = getSpeedMultiplier();
      const baseSpeed = (0.28 + Math.random() * 0.16) * speedMult;

      return {
        id: `b-${idCounterRef.current++}-${Math.random().toString(36).slice(2, 6)}`,
        item,
        x: 8 + Math.random() * 74, // 8% to 82%
        y: startY,
        speed: baseSpeed,
        colorIdx: Math.floor(Math.random() * BALLOON_GRADIENTS.length),
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: 0.02 + Math.random() * 0.02,
        popping: false,
        wobbling: false,
      };
    },
    [getSpeedMultiplier]
  );

  // Pick a new target and ensure at least one balloon carries it
  const pickNewTarget = useCallback(
    (pool: (BornomalaItem | EnglishAlphabetItem)[]) => {
      if (pool.length === 0) return;
      const next = pool[Math.floor(Math.random() * pool.length)];
      setTarget(next);
      speakTarget(next);

      // Check if any current balloon has this target; if not, rebrand one
      setBalloons((prev) => {
        const hasTarget = prev.some((b) => b.item.id === next.id && !b.popping);
        if (hasTarget || prev.length === 0) return prev;
        const candidateIdx = Math.floor(Math.random() * prev.length);
        return prev.map((b, i) => (i === candidateIdx ? { ...b, item: next } : b));
      });
    },
    [speakTarget]
  );

  // Initialize game round with explicit options
  const restartGameWith = useCallback(
    (
      cat: GameCategory = category,
      rng: NumberRange = numberRange,
      spd: SpeedMode = speedMode
    ) => {
      stopSpeech();
      unlockMobileAudio({ primeSilent: true });
      setScore(0);
      setStreak(0);
      setPoppedCount(0);
      setFloatingPoints([]);

      let pool: (BornomalaItem | EnglishAlphabetItem)[] = [];
      if (isEng) {
        if (cat === "vowels") pool = ENGLISH_VOWELS;
        else if (cat === "consonants") pool = ENGLISH_CONSONANTS;
        else if (cat === "numbers") {
          if (rng === "0-20") pool = ENGLISH_NUMBERS_DATA.slice(0, 21);
          else if (rng === "21-50") pool = ENGLISH_NUMBERS_DATA.slice(21, 51);
          else if (rng === "51-100") pool = ENGLISH_NUMBERS_DATA.slice(51, 101);
          else pool = ENGLISH_NUMBERS_DATA;
        } else pool = ENGLISH_ALPHABET_DATA;
      } else {
        if (cat === "vowels") pool = VOWELS_DATA;
        else if (cat === "consonants") pool = CONSONANTS_DATA;
        else if (cat === "numbers") {
          if (rng === "0-20") pool = NUMBERS_DATA.slice(0, 21);
          else if (rng === "21-50") pool = NUMBERS_DATA.slice(21, 51);
          else if (rng === "51-100") pool = NUMBERS_DATA.slice(51, 101);
          else pool = NUMBERS_DATA;
        } else pool = [...VOWELS_DATA, ...CONSONANTS_DATA];
      }

      if (pool.length === 0) return;

      let maxB = 5;
      if (spd === "slow") maxB = 4;
      else if (spd === "blitz") maxB = 7;

      const newTarget = pool[Math.floor(Math.random() * pool.length)];
      setTarget(newTarget);
      speakTarget(newTarget);

      const initialBalloons: BalloonState[] = [];
      for (let i = 0; i < maxB; i++) {
        const isTargetBalloon = i === 0;
        const b = spawnBalloon(
          pool,
          isTargetBalloon ? newTarget : undefined,
          35 + i * 18
        );
        initialBalloons.push(b);
      }
      setBalloons(initialBalloons);
    },
    [category, numberRange, speedMode, isEng, speakTarget, spawnBalloon]
  );

  // Unmount cleanup
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      stopSpeech();
    };
  }, []);

  // Main 60fps Animation Loop
  useEffect(() => {
    if (isPaused) return;

    const updateFrame = () => {
      const now = performance.now();
      if (lastTimeRef.current === 0) lastTimeRef.current = now;
      const delta = Math.min(now - lastTimeRef.current, 50);
      lastTimeRef.current = now;
      const frameScale = delta / 16.66;

      const pool = getActivePool();
      const maxB = getMaxBalloons();
      const currentTarget = targetRef.current;

      setBalloons((prev) => {
        const updated = prev
          .map((b) => {
            if (b.popping) return b;
            const newY = b.y - b.speed * frameScale;
            const newSway = b.swayOffset + b.swaySpeed * frameScale;
            return {
              ...b,
              y: newY,
              swayOffset: newSway,
            };
          })
          // Filter out balloons that flew way past the top
          .filter((b) => b.y > -25 && !b.popping);

        // Respawn if count fell below max
        while (updated.length < maxB && pool.length > 0) {
          const hasTarget = updated.some(
            (b) => currentTarget && b.item.id === currentTarget.id
          );
          // If no balloon currently has the target, force one
          const mustBeTarget = !hasTarget && Math.random() < 0.45;
          const newB = spawnBalloon(
            pool,
            mustBeTarget && currentTarget ? currentTarget : undefined,
            105 + Math.random() * 15
          );
          updated.push(newB);
        }

        return updated;
      });

      animFrameRef.current = requestAnimationFrame(updateFrame);
    };

    animFrameRef.current = requestAnimationFrame(updateFrame);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPaused, getActivePool, getMaxBalloons, spawnBalloon]);

  // Handle Balloon Pop
  const handleBalloonClick = (balloon: BalloonState) => {
    if (balloon.popping || isPaused) return;
    unlockMobileAudio({ primeSilent: true });

    const isMatch = target && balloon.item.id === target.id;

    if (isMatch) {
      // 🌟 Correct Pop!
      playPopSound();
      playStarDing();
      playSuccessChime();

      // Trigger pop animation state
      setBalloons((prev) =>
        prev.map((b) => (b.id === balloon.id ? { ...b, popping: true } : b))
      );

      // Score and Stars (+10)
      setScore((s) => s + 10);
      setStreak((st) => st + 1);
      setPoppedCount((c) => c + 1);
      onAddStars(10);

      // Floating points indicator
      const ptId = `pt-${idCounterRef.current++}`;
      setFloatingPoints((prev) => [
        ...prev,
        { id: ptId, x: balloon.x, y: Math.max(10, balloon.y), text: "+10 ⭐" },
      ]);
      setTimeout(() => {
        setFloatingPoints((prev) => prev.filter((p) => p.id !== ptId));
      }, 900);

      // Confetti burst on streak milestones
      if ((streak + 1) % 3 === 0) {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: {
            x: Math.max(0.1, Math.min(0.9, balloon.x / 100)),
            y: Math.max(0.1, Math.min(0.8, balloon.y / 100)),
          },
        });
      }

      // Remove popped balloon and pick next target after short pause
      setTimeout(() => {
        setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
        const pool = getActivePool();
        pickNewTarget(pool);
      }, 350);
    } else {
      // ❌ Wrong Balloon (Gentle wobble, no harsh penalty)
      playGentlePlop();
      setStreak(0);
      setBalloons((prev) =>
        prev.map((b) => (b.id === balloon.id ? { ...b, wobbling: true } : b))
      );
      setTimeout(() => {
        setBalloons((prev) =>
          prev.map((b) => (b.id === balloon.id ? { ...b, wobbling: false } : b))
        );
      }, 450);
    }
  };

  return (
    <div className="relative w-full h-[620px] bg-gradient-to-b from-sky-100 via-indigo-50/60 to-purple-100 rounded-3xl border-2 border-indigo-200 overflow-hidden select-none shadow-xl flex flex-col">
      {/* Top Header Bar: Score, Target Prompt & Controls */}
      <div className="relative z-20 bg-white/85 backdrop-blur-md border-b border-indigo-100 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 shadow-sm">
        {/* Left: Target Audio & Letter Display */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => target && speakTarget(target)}
            className="group relative flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl shadow-md transition-all active:scale-95"
            title="পুনরায় প্রম্পট শুনুন"
          >
            <Volume2 className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-bold hidden sm:inline">
              {isEng ? "Listen" : "শুনুন"}
            </span>
          </button>

          {/* Big Target Letter Highlight */}
          {target && (
            <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-2xl border border-indigo-200">
              <span className="text-xs font-semibold text-indigo-700">
                {isEng ? "Target:" : "লক্ষ্য:"}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-900 tracking-tight">
                {target.char}
              </span>
              <span className="text-xs text-indigo-600 font-medium hidden md:inline">
                ({target.name})
              </span>
            </div>
          )}
        </div>

        {/* Center: Live Stats (Score & Streak) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 font-black text-sm shadow-sm">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500 animate-spin-slow" />
            <span>{score}</span>
          </div>

          {streak >= 2 && (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 font-bold text-xs animate-bounce">
              <Zap className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{streak}x {isEng ? "Streak" : "কম্বো"}!</span>
            </div>
          )}
        </div>

        {/* Right: Quick Settings & Restart */}
        <div className="flex items-center gap-2">
          {/* Pause / Play */}
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            title={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>

          {/* Restart */}
          <button
            type="button"
            onClick={() => restartGameWith(category, numberRange, speedMode)}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            title="নতুন করে শুরু"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub-bar: Category Tabs & Speed Selector */}
      <div className="relative z-10 bg-white/60 backdrop-blur-sm border-b border-indigo-100 px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Categories */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {[
            { id: "all", label: isEng ? "All Letters" : "সকল বর্ণ" },
            { id: "vowels", label: isEng ? "Vowels (স্বরবর্ণ)" : "স্বরবর্ণ (১১)" },
            { id: "consonants", label: isEng ? "Consonants" : "ব্যঞ্জনবর্ণ (৩৯)" },
            { id: "numbers", label: isEng ? "Numbers (০-১০০)" : "সংখ্যা (০-১০০)" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                const nextCat = cat.id as GameCategory;
                setCategory(nextCat);
                restartGameWith(nextCat, numberRange, speedMode);
              }}
              className={`px-2.5 py-1 rounded-xl font-bold transition-all ${
                category === cat.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white/80 text-indigo-900 hover:bg-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Number Decade Sub-filter (when numbers active) */}
        {category === "numbers" && (
          <div className="flex items-center gap-1 bg-white/80 p-0.5 rounded-xl border border-indigo-100">
            {(["0-20", "21-50", "51-100", "all"] as NumberRange[]).map((rng) => (
              <button
                key={rng}
                type="button"
                onClick={() => {
                  setNumberRange(rng);
                  restartGameWith(category, rng, speedMode);
                }}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-colors ${
                  numberRange === rng
                    ? "bg-purple-600 text-white"
                    : "text-purple-800 hover:bg-purple-50"
                }`}
              >
                {rng === "all" ? "সকল" : rng}
              </button>
            ))}
          </div>
        )}

        {/* Speed Selector */}
        <div className="flex items-center gap-1 bg-white/80 p-0.5 rounded-xl border border-indigo-100">
          {(["slow", "normal", "blitz"] as SpeedMode[]).map((spd) => (
            <button
              key={spd}
              type="button"
              onClick={() => {
                setSpeedMode(spd);
                restartGameWith(category, numberRange, spd);
              }}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-colors ${
                speedMode === spd
                  ? "bg-amber-500 text-white"
                  : "text-gray-600 hover:bg-amber-50"
              }`}
            >
              {spd === "slow"
                ? "🐢 ধীর"
                : spd === "normal"
                ? "🐇 স্বাভাবিক"
                : "⚡ দ্রুত"}
            </button>
          ))}
        </div>
      </div>

      {/* 🎈 Floating Sky Canvas (Game Play Area) */}
      <div className="relative flex-1 w-full overflow-hidden">
        {/* Background Clouds / Sky Elements */}
        <div className="absolute top-8 left-12 w-28 h-10 bg-white/40 rounded-full blur-[2px] pointer-events-none" />
        <div className="absolute top-20 right-16 w-36 h-12 bg-white/40 rounded-full blur-[2px] pointer-events-none" />
        <div className="absolute top-44 left-1/3 w-24 h-8 bg-white/30 rounded-full blur-[2px] pointer-events-none" />

        {/* Paused Overlay */}
        {isPaused && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-white">
            <Pause className="w-16 h-16 mb-2 animate-pulse text-amber-300" />
            <p className="text-xl font-bold">খেলা থামানো আছে</p>
            <button
              type="button"
              onClick={() => setIsPaused(false)}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all"
            >
              আবার খেলুন
            </button>
          </div>
        )}

        {/* Floating +10 Stars Popups */}
        {floatingPoints.map((pt) => (
          <div
            key={pt.id}
            style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
            className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2 text-lg sm:text-2xl font-black text-amber-500 drop-shadow-md animate-float-up flex items-center gap-1"
          >
            <span>{pt.text}</span>
            <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
          </div>
        ))}

        {/* The Animated Floating Balloons */}
        {balloons.map((balloon) => {
          const color = BALLOON_GRADIENTS[balloon.colorIdx];
          const swayX = Math.sin(balloon.swayOffset) * 12; // 12px sine-wave drift
          const is3Digit = balloon.item.char.length >= 3;

          return (
            <div
              key={balloon.id}
              onClick={() => handleBalloonClick(balloon)}
              style={{
                left: `calc(${balloon.x}% + ${swayX}px)`,
                top: `${balloon.y}%`,
                transform: `translate(-50%, -50%) ${
                  balloon.popping
                    ? "scale(1.4) rotate(15deg)"
                    : balloon.wobbling
                    ? "scale(0.92) rotate(-12deg)"
                    : "scale(1)"
                }`,
                opacity: balloon.popping ? 0 : 1,
                transition: balloon.popping
                  ? "transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 0.25s"
                  : balloon.wobbling
                  ? "transform 0.15s ease-in-out"
                  : "none",
              }}
              className="absolute z-10 cursor-pointer touch-none group"
            >
              {/* Balloon Egg Body */}
              <div
                style={{
                  boxShadow: `0 10px 25px -3px ${color.shadow}, inset 0 -6px 12px rgba(0,0,0,0.15), inset 0 8px 14px rgba(255,255,255,0.45)`,
                }}
                className={`relative w-20 h-24 sm:w-24 sm:h-28 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-br ${color.bg} border-2 ${color.border} flex items-center justify-center transition-transform group-hover:scale-105 active:scale-95`}
              >
                {/* 3D Balloon Gloss Highlight */}
                <div className="absolute top-2.5 left-3 w-4 h-7 bg-white/50 rounded-full rotate-[-25deg] blur-[1px] pointer-events-none" />

                {/* Letter / Number Glyph */}
                <span
                  className={`font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)] select-none text-center ${
                    is3Digit
                      ? "text-xl sm:text-2xl"
                      : "text-3xl sm:text-4xl"
                  }`}
                >
                  {balloon.item.char}
                </span>

                {/* Balloon Tied Knot */}
                <div
                  style={{ backgroundColor: color.knot }}
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-2 rounded-[40%_40%_60%_60%]"
                />

                {/* Balloon Hanging String (Wavy SVG) */}
                <svg
                  className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-4 h-6 text-gray-400/80 pointer-events-none"
                  viewBox="0 0 16 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M8 0 Q 3 8 9 14 T 8 24" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm border-t border-indigo-100 px-4 py-2 flex items-center justify-between text-xs text-indigo-900 font-semibold">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>
            {isEng ? "Balloons Popped:" : "ফাটানো বেলুন:"}{" "}
            <strong className="text-indigo-700">{poppedCount}</strong>
          </span>
        </div>
        <div className="text-gray-500 italic hidden sm:inline">
          {isEng
            ? "Tap the correct balloon to earn stars!"
            : "সঠিক বর্ণ/সংখ্যার বেলুনে ট্যাপ করে স্টার অর্জন করো!"}
        </div>
      </div>
    </div>
  );
}
