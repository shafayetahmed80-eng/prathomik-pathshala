"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import {
  Volume2,
  RotateCcw,
  Star,
  Sparkles,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Wand2,
  FlaskConical,
} from "lucide-react";
import { JUKTOBORNO_DATA } from "@/data/bornomalaData";
import { safeSpeak, stopSpeech, unlockMobileAudio } from "@/utils/mobileSpeech";
import {
  playSuccessChime,
  playStarDing,
  playGentlePlop,
  playPopSound,
  playMagicSparkle,
} from "@/utils/bornomalaAudio";

interface Props {
  onAddStars: (amount: number) => void;
  languageMode?: "bangla" | "english";
  teacherVoice?: "nabanita" | "pradeep" | "ana" | "guy";
}

interface JuktobornoPuzzle {
  id: string;
  conjunct: string;
  part1: string;
  part2: string;
  part1Sound: string;
  part2Sound: string;
  word: string;
  emoji: string;
  breakdown: string;
  exampleWords: string[];
  speechScript: string;
}

const BANGLA_PUZZLES: JuktobornoPuzzle[] = JUKTOBORNO_DATA.map((item) => {
  // Extract parts from item.name (e.g. "ক + ষ", "ত + র-ফলা")
  const rawParts = item.name.split("+").map((s) => s.trim());
  const part1 = rawParts[0] || "";
  let part2 = rawParts[1] || "";
  if (part2.includes("র-ফলা")) {
    part2 = "র";
  }

  const examples = item.example ? item.example.split(",").map((s) => s.trim()) : [item.word];

  return {
    id: item.id,
    conjunct: item.char,
    part1,
    part2,
    part1Sound: part1,
    part2Sound: part2,
    word: item.word,
    emoji: item.imageEmoji,
    breakdown: `${part1} + ${part2} = ${item.char}`,
    exampleWords: examples.slice(0, 3),
    speechScript: `${part1} আর ${part2} মিলে হয় ${item.char}! ${item.char}-তে ${item.word}!`,
  };
});

interface EnglishDigraphPuzzle {
  id: string;
  conjunct: string;
  part1: string;
  part2: string;
  part1Sound: string;
  part2Sound: string;
  word: string;
  emoji: string;
  breakdown: string;
  exampleWords: string[];
  speechScript: string;
}

const ENGLISH_PUZZLES: EnglishDigraphPuzzle[] = [
  { id: "ed1", conjunct: "SH", part1: "S", part2: "H", part1Sound: "S", part2Sound: "H", word: "Ship", emoji: "🚢", breakdown: "S + H = SH", exampleWords: ["Shark", "Shell", "Shop"], speechScript: "S and H combine to make SH! SH as in Ship!" },
  { id: "ed2", conjunct: "CH", part1: "C", part2: "H", part1Sound: "C", part2Sound: "H", word: "Cheese", emoji: "🧀", breakdown: "C + H = CH", exampleWords: ["Chair", "Cherry", "Child"], speechScript: "C and H combine to make CH! CH as in Cheese!" },
  { id: "ed3", conjunct: "TH", part1: "T", part2: "H", part1Sound: "T", part2Sound: "H", word: "Thumb", emoji: "👍", breakdown: "T + H = TH", exampleWords: ["Three", "Think", "Thunder"], speechScript: "T and H combine to make TH! TH as in Thumb!" },
  { id: "ed4", conjunct: "WH", part1: "W", part2: "H", part1Sound: "W", part2Sound: "H", word: "Whale", emoji: "🐋", breakdown: "W + H = WH", exampleWords: ["Wheel", "Whistle", "White"], speechScript: "W and H combine to make WH! WH as in Whale!" },
  { id: "ed5", conjunct: "PH", part1: "P", part2: "H", part1Sound: "P", part2Sound: "H", word: "Phone", emoji: "📱", breakdown: "P + H = PH", exampleWords: ["Photo", "Phoenix", "Dolphin"], speechScript: "P and H combine to make PH! PH as in Phone!" },
  { id: "ed6", conjunct: "ST", part1: "S", part2: "T", part1Sound: "S", part2Sound: "T", word: "Star", emoji: "⭐", breakdown: "S + T = ST", exampleWords: ["Stop", "Story", "Stone"], speechScript: "S and T combine to make ST! ST as in Star!" },
  { id: "ed7", conjunct: "BL", part1: "B", part2: "L", part1Sound: "B", part2Sound: "L", word: "Blue", emoji: "💙", breakdown: "B + L = BL", exampleWords: ["Black", "Block", "Blade"], speechScript: "B and L combine to make BL! BL as in Blue!" },
  { id: "ed8", conjunct: "GR", part1: "G", part2: "R", part1Sound: "G", part2Sound: "R", word: "Grapes", emoji: "🍇", breakdown: "G + R = GR", exampleWords: ["Green", "Grass", "Grow"], speechScript: "G and R combine to make GR! GR as in Grapes!" },
];

const BANGLA_INGREDIENTS = ["ক", "ষ", "জ", "ঞ", "ণ", "ত", "দ", "ধ", "ন", "প", "ম", "ব", "শ", "স", "হ", "র", "গ", "ট", "ড"];
const ENGLISH_INGREDIENTS = ["S", "H", "C", "T", "W", "P", "B", "L", "G", "R", "F", "M", "N", "D"];

interface IngredientBubble {
  uid: string;
  char: string;
  isUsed: boolean;
  color: string;
}

const BUBBLE_COLORS = [
  "from-violet-500 to-purple-700 text-white border-purple-300",
  "from-pink-500 to-rose-600 text-white border-pink-300",
  "from-sky-500 to-indigo-600 text-white border-sky-300",
  "from-amber-500 to-orange-600 text-white border-amber-300",
  "from-emerald-500 to-teal-600 text-white border-emerald-300",
];

interface RoundState {
  puzzle: JuktobornoPuzzle | EnglishDigraphPuzzle;
  bubbles: IngredientBubble[];
}

function generateRound(isEng: boolean): RoundState {
  const pool = isEng ? ENGLISH_PUZZLES : BANGLA_PUZZLES;
  const puzzle = pool[Math.floor(Math.random() * pool.length)];

  const targetChars = [puzzle.part1, puzzle.part2];
  const distractorsPool = isEng ? ENGLISH_INGREDIENTS : BANGLA_INGREDIENTS;
  const extraChars: string[] = [];

  while (extraChars.length < 4) {
    const candidate = distractorsPool[Math.floor(Math.random() * distractorsPool.length)];
    if (!targetChars.includes(candidate) && !extraChars.includes(candidate)) {
      extraChars.push(candidate);
    }
  }

  const allChars = [...targetChars, ...extraChars].sort(() => Math.random() - 0.5);

  const bubbles: IngredientBubble[] = allChars.map((char, idx) => ({
    uid: `bubble-${idx}-${Math.random()}`,
    char,
    isUsed: false,
    color: BUBBLE_COLORS[idx % BUBBLE_COLORS.length],
  }));

  return { puzzle, bubbles };
}

export default function BornomalaJuktobornoGame({
  onAddStars,
  languageMode = "bangla",
  teacherVoice,
}: Props) {
  const isEng = languageMode === "english";

  const [roundData, setRoundData] = useState<RoundState>(() => generateRound(isEng));
  const [cauldronSlot1, setCauldronSlot1] = useState<string | null>(null);
  const [cauldronSlot2, setCauldronSlot2] = useState<string | null>(null);
  const [bubbles, setBubbles] = useState<IngredientBubble[]>(() => roundData.bubbles);
  const [wobblingBubbleId, setWobblingBubbleId] = useState<string | null>(null);
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
    (puzzle: JuktobornoPuzzle | EnglishDigraphPuzzle) => {
      stopSpeech();
      if (isEng) {
        safeSpeak(`Magic Cauldron! Combine letters to create: ${puzzle.conjunct}!`, {
          lang: "en-US",
          voice: activeVoice,
          rate: 0.88,
        });
      } else {
        safeSpeak(`জাদুকরী হাঁড়িতে বর্ণ মিশিয়ে তৈরি করো: ${puzzle.conjunct}!`, {
          lang: "bn-BD",
          voice: activeVoice,
          rate: 0.85,
        });
      }
    },
    [isEng, activeVoice]
  );

  const initRound = useCallback(() => {
    if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    setIsCompleted(false);
    setCauldronSlot1(null);
    setCauldronSlot2(null);
    setWobblingBubbleId(null);

    const next = generateRound(isEng);
    setRoundData(next);
    setBubbles(next.bubbles);

    promptTimerRef.current = setTimeout(() => {
      speakPrompt(next.puzzle);
    }, 300);
  }, [isEng, speakPrompt]);

  // Initial prompt & unmount cleanup
  useEffect(() => {
    promptTimerRef.current = setTimeout(() => {
      speakPrompt(roundData.puzzle);
    }, 400);

    return () => {
      if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      stopSpeech();
    };
  }, [roundData.puzzle, speakPrompt]);

  const handleBubbleClick = (bubble: IngredientBubble) => {
    if (bubble.isUsed || isCompleted) return;

    unlockMobileAudio({ primeSilent: true });

    const p = roundData.puzzle;

    // Check if slot 1 is empty
    if (!cauldronSlot1) {
      if (bubble.char === p.part1) {
        playPopSound();
        setCauldronSlot1(bubble.char);
        setBubbles((prev) =>
          prev.map((b) => (b.uid === bubble.uid ? { ...b, isUsed: true } : b))
        );

        if (isEng) {
          safeSpeak(`${bubble.char}! Now add the second letter!`, {
            lang: "en-US",
            voice: activeVoice,
            rate: 0.9,
          });
        } else {
          safeSpeak(`${bubble.char}! এবার দ্বিতীয় বর্ণটি হাঁড়িতে ফেলো।`, {
            lang: "bn-BD",
            voice: activeVoice,
            rate: 0.88,
          });
        }
      } else {
        playGentlePlop();
        setWobblingBubbleId(bubble.uid);
        setTimeout(() => setWobblingBubbleId(null), 500);

        if (isEng) {
          safeSpeak(`That's not the first letter for ${p.conjunct}. Try another!`, {
            lang: "en-US",
            voice: activeVoice,
            rate: 0.9,
          });
        } else {
          safeSpeak(`এটি ${p.conjunct}-এর প্রথম বর্ণ নয়। অন্য বর্ণ দিয়ে চেষ্টা করো।`, {
            lang: "bn-BD",
            voice: activeVoice,
            rate: 0.88,
          });
        }
      }
      return;
    }

    // Slot 1 is already filled, check slot 2
    if (!cauldronSlot2) {
      if (bubble.char === p.part2) {
        setCauldronSlot2(bubble.char);
        setBubbles((prev) =>
          prev.map((b) => (b.uid === bubble.uid ? { ...b, isUsed: true } : b))
        );

        setIsCompleted(true);
        setScore((s) => s + 1);
        setStreak((st) => st + 1);
        onAddStars(20);
        playStarDing();

        setTimeout(() => {
          playMagicSparkle();
          playSuccessChime();
          confetti({
            particleCount: 65,
            spread: 85,
            origin: { y: 0.55 },
          });

          if (isEng) {
            safeSpeak(p.speechScript, {
              lang: "en-US",
              voice: activeVoice,
              rate: 0.9,
            });
          } else {
            safeSpeak(p.speechScript, {
              lang: "bn-BD",
              voice: activeVoice,
              rate: 0.88,
            });
          }
        }, 300);

        // Auto advance after 3.6s
        advanceTimerRef.current = setTimeout(() => {
          initRound();
        }, 3600);
      } else {
        playGentlePlop();
        setWobblingBubbleId(bubble.uid);
        setTimeout(() => setWobblingBubbleId(null), 500);

        if (isEng) {
          safeSpeak(`That's not the second letter! Try again!`, {
            lang: "en-US",
            voice: activeVoice,
            rate: 0.9,
          });
        } else {
          safeSpeak(`এটি দ্বিতীয় বর্ণ নয়! অন্য বর্ণ খুঁজো।`, {
            lang: "bn-BD",
            voice: activeVoice,
            rate: 0.88,
          });
        }
      }
    }
  };

  const handleResetCauldron = () => {
    playPopSound();
    unlockMobileAudio({ primeSilent: true });
    setCauldronSlot1(null);
    setCauldronSlot2(null);
    setIsCompleted(false);
    setBubbles((prev) => prev.map((b) => ({ ...b, isUsed: false })));
    speakPrompt(roundData.puzzle);
  };

  const handleReplayPrompt = () => {
    unlockMobileAudio({ primeSilent: true });
    speakPrompt(roundData.puzzle);
  };

  const puzzle = roundData.puzzle;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* 🌟 Header & Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gradient-to-r from-purple-50 via-fuchsia-50 to-indigo-50 rounded-2xl border border-purple-200 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-600 text-white rounded-xl shadow-xs">
            <Wand2 className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-purple-950 flex items-center gap-2">
              <span>{isEng ? "Magic Cauldron Workshop" : "যুক্তবর্ণ ম্যাজিক কর্মশালা"}</span>
              <span className="text-[10px] bg-purple-600 text-white font-black px-2 py-0.5 rounded-full uppercase">
                {isEng ? "Digraphs & Blends" : "বিশ্লিষ্ট রূপ শিখন"}
              </span>
            </h3>
            <p className="text-[11px] text-purple-800">
              {isEng
                ? "Drop the correct root letters into the magical pot to forge the blend!"
                : "জাদুকরী হাঁড়িতে মূল বর্ণগুলো ফেলে যুক্তবর্ণ তৈরির রহস্য শেখো!"}
            </p>
          </div>
        </div>

        {/* Score & Streak badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 rounded-xl border border-purple-200 text-xs font-bold text-purple-800 shadow-xs">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>{isEng ? "Forged:" : "তৈরি:"}</span>
            <span className="font-extrabold text-purple-700">{score}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-fuchsia-50 rounded-xl border border-fuchsia-200 text-xs font-bold text-fuchsia-800 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{isEng ? "Streak:" : "টানা:"}</span>
            <span className="font-extrabold text-fuchsia-700">{streak}</span>
          </div>
        </div>
      </div>

      {/* 🎯 Target Goal Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-700 via-indigo-700 to-fuchsia-800 text-white rounded-3xl p-5 shadow-lg border-2 border-purple-400/50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-4xl sm:text-5xl shadow-inner border border-white/30 animate-bounce">
              {puzzle.emoji}
            </div>

            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-purple-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                {isEng ? "Alchemist Mission" : "জাদুকরী মিশন"}
              </span>

              <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                {isEng ? (
                  <>
                    Forge the letter:{" "}
                    <span className="underline decoration-amber-300 underline-offset-4 font-black text-amber-300 text-2xl sm:text-3xl">
                      {puzzle.conjunct}
                    </span>
                  </>
                ) : (
                  <>
                    তৈরি করো যুক্তবর্ণ:{" "}
                    <span className="underline decoration-amber-300 underline-offset-4 font-black text-amber-300 text-2xl sm:text-3xl">
                      {puzzle.conjunct}
                    </span>
                  </>
                )}
              </h2>

              <p className="text-xs text-purple-200 mt-1">
                {isEng
                  ? "Which two letters combine together to create this sound?"
                  : "কোন দুটি মূল বর্ণ মিলে এই যুক্তবর্ণটি তৈরি হয়? নিচের বাবল থেকে বেছে নাও!"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReplayPrompt}
              className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-2xl border border-white/30 transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5 text-xs font-bold"
              title={isEng ? "Hear Mission" : "মিশন শোনো"}
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>{isEng ? "Hear Again" : "আবার শোনো"}</span>
            </button>

            <button
              type="button"
              onClick={handleResetCauldron}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 transition-all hover:scale-105 active:scale-95 text-xs font-bold flex items-center gap-1.5"
              title={isEng ? "Empty Cauldron" : "হাঁড়ি খালি করো"}
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isEng ? "Reset" : "রিসেট"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🧪 THE MAGIC CAULDRON WORKSHOP STAGE */}
      <div className="bg-gradient-to-b from-slate-950 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-purple-800 shadow-2xl relative overflow-hidden min-h-[380px] flex flex-col justify-between items-center">
        {/* Mystical Starry Sparks in the laboratory */}
        <div className="absolute top-4 left-8 text-amber-300 text-lg opacity-70 animate-pulse">✨</div>
        <div className="absolute top-8 right-12 text-purple-300 text-base opacity-80">⭐</div>
        <div className="absolute top-14 left-1/4 text-fuchsia-300 text-xs opacity-60">✨</div>
        <div className="absolute top-10 right-1/4 text-amber-200 text-xs opacity-50">⭐</div>

        {/* The Chemical Cauldron & Ingredients Slot Area */}
        <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
          {/* Top Formula Slots */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
            {/* Slot 1 Box */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-purple-300 font-bold uppercase mb-1">
                {isEng ? "Ingredient 1" : "১ম বর্ণ"}
              </span>
              <div
                className={`w-18 h-18 sm:w-22 sm:h-22 rounded-2xl border-2 flex items-center justify-center font-black text-3xl sm:text-4xl transition-all shadow-lg ${
                  cauldronSlot1
                    ? "bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-purple-300 animate-in zoom-in"
                    : "bg-purple-900/40 border-purple-400 border-dashed text-purple-400/60 shadow-inner"
                }`}
              >
                {cauldronSlot1 || "?"}
              </div>
            </div>

            {/* Plus Sign */}
            <div className="text-3xl sm:text-4xl font-black text-amber-400 pt-4 animate-pulse">
              +
            </div>

            {/* Slot 2 Box */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-purple-300 font-bold uppercase mb-1">
                {isEng ? "Ingredient 2" : "২য় বর্ণ"}
              </span>
              <div
                className={`w-18 h-18 sm:w-22 sm:h-22 rounded-2xl border-2 flex items-center justify-center font-black text-3xl sm:text-4xl transition-all shadow-lg ${
                  cauldronSlot2
                    ? "bg-gradient-to-br from-fuchsia-500 to-rose-600 text-white border-fuchsia-300 animate-in zoom-in"
                    : cauldronSlot1
                    ? "bg-purple-900/60 border-amber-400 border-dashed text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.3)]"
                    : "bg-purple-900/40 border-purple-400 border-dashed text-purple-400/60 shadow-inner"
                }`}
              >
                {cauldronSlot2 || "?"}
              </div>
            </div>

            {/* Equals Sign */}
            <div className="text-3xl sm:text-4xl font-black text-amber-400 pt-4">
              =
            </div>

            {/* Target Conjunct Outcome Box */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-amber-300 font-black uppercase mb-1">
                {isEng ? "Result" : "যুক্ত রূপ"}
              </span>
              <div
                className={`w-18 h-18 sm:w-22 sm:h-22 rounded-2xl border-2 flex items-center justify-center font-black text-3xl sm:text-4xl transition-all shadow-xl ${
                  isCompleted
                    ? "bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-400 text-slate-950 border-amber-200 animate-bounce shadow-[0_0_20px_#f59e0b]"
                    : "bg-black/60 border-amber-400/60 border-dashed text-amber-300/80"
                }`}
              >
                {isCompleted ? puzzle.conjunct : "?"}
              </div>
            </div>
          </div>

          {/* Magical Cauldron SVG / Illustration */}
          <div className="relative mt-4 flex flex-col items-center">
            {/* Glowing magic bubbles floating out of pot */}
            <div className="flex gap-2 -mb-2">
              <span className="text-base animate-bounce" style={{ animationDelay: "0.1s" }}>🫧</span>
              <span className="text-xl animate-bounce" style={{ animationDelay: "0.3s" }}>✨</span>
              <span className="text-base animate-bounce" style={{ animationDelay: "0.2s" }}>🫧</span>
            </div>

            {/* Pot rim & body */}
            <div className="w-36 sm:w-44 h-24 sm:h-28 bg-gradient-to-b from-slate-800 via-purple-900 to-slate-950 rounded-b-[45px] rounded-t-xl border-4 border-purple-500 shadow-2xl relative flex flex-col items-center justify-center">
              <div className="absolute -top-3 w-40 sm:w-48 h-6 bg-slate-800 rounded-full border-2 border-purple-400 shadow-md" />
              <FlaskConical className={`w-10 h-10 ${isCompleted ? "text-amber-400 animate-spin" : "text-purple-300/80"}`} />
              <span className="text-[10px] font-black text-purple-200 mt-1 uppercase tracking-wider">
                {isCompleted ? "✨ MAGIC FORGED! ✨" : "POTION CAULDRON"}
              </span>
            </div>
          </div>

          {/* Success Reveal: Formula & Example Words */}
          {isCompleted && (
            <div className="mt-5 p-4 bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-fuchsia-900/90 text-white rounded-2xl border-2 border-amber-300 shadow-2xl w-full text-center animate-in zoom-in duration-300">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-amber-300" />
                <h4 className="font-black text-lg text-amber-300 tracking-wide">
                  {puzzle.breakdown}
                </h4>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                <span className="text-xs font-bold text-purple-200">
                  {isEng ? "Example Words:" : "উদাহরণ শব্দসমূহ:"}
                </span>
                {puzzle.exampleWords.map((ex, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-black rounded-lg text-xs shadow-xs"
                  >
                    {ex}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={initRound}
                className="mt-3 py-1.5 px-4 bg-white text-purple-950 rounded-xl font-black text-xs hover:bg-purple-100 transition-all inline-flex items-center gap-1.5 shadow-md"
              >
                <span>{isEng ? "Forge Next Magic" : "পরবর্তী যুক্তবর্ণ তৈরি করো"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 🔮 INGREDIENT BUBBLES SHELF (Click/Tap to Drop into Pot) */}
      <div className="bg-gradient-to-b from-purple-50 to-indigo-50/50 rounded-3xl p-5 border-2 border-purple-200 shadow-sm">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-purple-100">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-extrabold text-slate-900">
              {isEng ? "Tap Ingredients to Drop into Cauldron:" : "উপাদান বর্ণ স্পর্শ করে হাঁড়িতে ফেলো:"}
            </h3>
          </div>
          <span className="text-xs font-bold text-purple-700">
            {isEng ? "Step 1 & Step 2" : "ধাপ ১ এবং ধাপ ২"}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-3">
          {bubbles.map((bubble) => {
            const isWobbling = wobblingBubbleId === bubble.uid;

            return (
              <button
                key={bubble.uid}
                type="button"
                onClick={() => handleBubbleClick(bubble)}
                disabled={bubble.isUsed || isCompleted}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 font-black text-2xl sm:text-3xl flex items-center justify-center transition-all duration-200 select-none touch-manipulation shadow-md ${
                  bubble.isUsed
                    ? "opacity-20 scale-90 border-slate-300 bg-slate-200 pointer-events-none"
                    : isWobbling
                    ? "animate-shake bg-rose-500 text-white border-rose-300 scale-105"
                    : `bg-gradient-to-br ${bubble.color} hover:scale-115 active:scale-95 cursor-pointer shadow-purple-500/30`
                }`}
                aria-label={`উপাদান ${bubble.char}`}
              >
                <span>{bubble.char}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
