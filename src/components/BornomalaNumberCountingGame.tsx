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
  TreeDeciduous,
  ShoppingBag,
} from "lucide-react";
import { safeSpeak, stopSpeech, unlockMobileAudio } from "@/utils/mobileSpeech";
import {
  playSuccessChime,
  playStarDing,
  playGentlePlop,
  playPopSound,
  playFruitPlop,
  playTrainWhistle,
} from "@/utils/bornomalaAudio";

interface Props {
  onAddStars: (amount: number) => void;
  languageMode?: "bangla" | "english";
  teacherVoice?: "nabanita" | "pradeep" | "ana" | "guy";
}

type NumberRange = "1-5" | "1-10" | "1-20";

interface FruitType {
  id: string;
  nameBn: string;
  nameEn: string;
  emoji: string;
  treeColor: string;
  accent: string;
}

const FRUITS: FruitType[] = [
  { id: "mango", nameBn: "পাকা আম", nameEn: "sweet mangoes", emoji: "🥭", treeColor: "from-amber-600 to-yellow-500", accent: "text-amber-500" },
  { id: "apple", nameBn: "লাল আপেল", nameEn: "red apples", emoji: "🍎", treeColor: "from-red-600 to-rose-500", accent: "text-rose-500" },
  { id: "orange", nameBn: "রসালো কমলা", nameEn: "juicy oranges", emoji: "🍊", treeColor: "from-orange-600 to-amber-500", accent: "text-orange-500" },
  { id: "strawberry", nameBn: "স্ট্রবেরি", nameEn: "strawberries", emoji: "🍓", treeColor: "from-pink-600 to-red-500", accent: "text-pink-500" },
  { id: "banana", nameBn: "পাকা কলা", nameEn: "ripe bananas", emoji: "🍌", treeColor: "from-yellow-500 to-amber-400", accent: "text-yellow-500" },
  { id: "watermelon", nameBn: "তরমুজ", nameEn: "watermelons", emoji: "🍉", treeColor: "from-emerald-600 to-green-500", accent: "text-emerald-500" },
];

const BANGLA_NUMBERS = [
  "শূন্য", "এক", "দুই", "তিন", "চার", "পাঁচ", "ছয়", "সাত", "আট", "নয়", "দশ",
  "এগারো", "বারো", "তেরো", "চৌদ্দ", "পনেরো", "ষোলো", "সতেরো", "আঠারো", "ঊনিশ", "বিশ"
];

const BANGLA_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "১০", "১১", "১২", "১৩", "১৪", "১৫", "১৬", "১৭", "১৮", "১৯", "২০"];

interface FruitItem {
  uid: string;
  x: number;
  y: number;
  isPlucked: boolean;
  scale: number;
}

interface RoundData {
  targetCount: number;
  selectedFruit: FruitType;
  treeFruits: FruitItem[];
}

function generateRoundData(range: NumberRange): RoundData {
  let min = 1;
  let max = 5;
  if (range === "1-10") {
    min = 2;
    max = 10;
  } else if (range === "1-20") {
    min = 5;
    max = 20;
  }

  const targetCount = Math.floor(Math.random() * (max - min + 1)) + min;
  const selectedFruit = FRUITS[Math.floor(Math.random() * FRUITS.length)];
  const totalOnTree = Math.min(24, Math.max(targetCount + 3, Math.floor(targetCount * 1.5)));
  const treeFruits: FruitItem[] = [];

  for (let i = 0; i < totalOnTree; i++) {
    const row = Math.floor(i / 6);
    const col = i % 6;
    const baseX = 15 + col * 12.5;
    const baseY = 16 + row * 18;
    const jitterX = (Math.random() - 0.5) * 6;
    const jitterY = (Math.random() - 0.5) * 6;

    treeFruits.push({
      uid: `fruit-${i}-${Math.random()}`,
      x: Math.max(10, Math.min(85, baseX + jitterX)),
      y: Math.max(12, Math.min(78, baseY + jitterY)),
      isPlucked: false,
      scale: 0.9 + Math.random() * 0.2,
    });
  }

  return { targetCount, selectedFruit, treeFruits };
}

export default function BornomalaNumberCountingGame({
  onAddStars,
  languageMode = "bangla",
  teacherVoice,
}: Props) {
  const isEng = languageMode === "english";

  const [range, setRange] = useState<NumberRange>("1-5");
  const [roundData, setRoundData] = useState<RoundData>(() => generateRoundData("1-5"));
  const [treeFruits, setTreeFruits] = useState<FruitItem[]>(() => roundData.treeFruits);
  const [basketFruits, setBasketFruits] = useState<{ uid: string; emoji: string }[]>([]);
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
    (target: number, fruit: FruitType) => {
      stopSpeech();
      if (isEng) {
        const text = `Pick ${target} ${fruit.nameEn} and put them into the basket!`;
        safeSpeak(text, { lang: "en-US", voice: activeVoice, rate: 0.88 });
      } else {
        const text = `ঝুড়িতে ${BANGLA_DIGITS[target]}টি ${fruit.nameBn} তুলে দাও!`;
        safeSpeak(text, { lang: "bn-BD", voice: activeVoice, rate: 0.85 });
      }
    },
    [isEng, activeVoice]
  );

  const initRound = useCallback(
    (currentRange: NumberRange = range) => {
      if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      setIsCompleted(false);
      setBasketFruits([]);

      const next = generateRoundData(currentRange);
      setRoundData(next);
      setTreeFruits(next.treeFruits);

      promptTimerRef.current = setTimeout(() => {
        speakPrompt(next.targetCount, next.selectedFruit);
      }, 300);
    },
    [range, speakPrompt]
  );

  // Initial prompt & speech cleanup
  useEffect(() => {
    promptTimerRef.current = setTimeout(() => {
      speakPrompt(roundData.targetCount, roundData.selectedFruit);
    }, 400);

    return () => {
      if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      stopSpeech();
    };
  }, [roundData.targetCount, roundData.selectedFruit, speakPrompt]);

  const handleFruitClick = (fruit: FruitItem) => {
    if (fruit.isPlucked || isCompleted) return;

    unlockMobileAudio({ primeSilent: true });

    const currentBasketCount = basketFruits.length;

    // Check if basket is already full
    if (currentBasketCount >= roundData.targetCount) {
      playGentlePlop();
      if (isEng) {
        safeSpeak("The basket is full! We reached our target!", {
          lang: "en-US",
          voice: activeVoice,
          rate: 0.9,
        });
      } else {
        safeSpeak("ঝুড়ি তো ভরে গেছে! সঠিক সংখ্যা পাওয়া গেছে।", {
          lang: "bn-BD",
          voice: activeVoice,
          rate: 0.88,
        });
      }
      return;
    }

    // Pluck fruit
    playFruitPlop();
    setTreeFruits((prev) =>
      prev.map((f) => (f.uid === fruit.uid ? { ...f, isPlucked: true } : f))
    );

    const nextCount = currentBasketCount + 1;
    setBasketFruits((prev) => [...prev, { uid: fruit.uid, emoji: roundData.selectedFruit.emoji }]);

    // Pronounce count
    if (isEng) {
      safeSpeak(`${nextCount}`, { lang: "en-US", voice: activeVoice, rate: 0.95 });
    } else {
      const bnWord = BANGLA_NUMBERS[nextCount] || `${nextCount}`;
      safeSpeak(bnWord, { lang: "bn-BD", voice: activeVoice, rate: 0.92 });
    }

    // Check if reached target
    if (nextCount === roundData.targetCount) {
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

        if (isEng) {
          const praise = `Awesome! You collected ${roundData.targetCount} ${roundData.selectedFruit.nameEn}! Well done!`;
          safeSpeak(praise, { lang: "en-US", voice: activeVoice, rate: 0.9 });
        } else {
          const praise = `চমৎকার! তুমি ${BANGLA_DIGITS[roundData.targetCount]}টি ${roundData.selectedFruit.nameBn} ঝুড়িতে তুলেছ! দারুণ হয়েছে!`;
          safeSpeak(praise, { lang: "bn-BD", voice: activeVoice, rate: 0.88 });
        }
      }, 350);

      advanceTimerRef.current = setTimeout(() => {
        initRound(range);
      }, 2800);
    }
  };

  const handleResetBasket = () => {
    playPopSound();
    unlockMobileAudio({ primeSilent: true });
    setBasketFruits([]);
    setIsCompleted(false);
    setTreeFruits((prev) => prev.map((f) => ({ ...f, isPlucked: false })));
    speakPrompt(roundData.targetCount, roundData.selectedFruit);
  };

  const handleRangeChange = (nextRange: NumberRange) => {
    playPopSound();
    unlockMobileAudio({ primeSilent: true });
    setRange(nextRange);
    initRound(nextRange);
  };

  const handleReplayPrompt = () => {
    unlockMobileAudio({ primeSilent: true });
    speakPrompt(roundData.targetCount, roundData.selectedFruit);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* 🌟 Header & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 rounded-2xl border border-emerald-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mr-1">
            <TreeDeciduous className="w-4 h-4 text-emerald-600" />
            <span>{isEng ? "Number Range:" : "সংখ্যার পাল্লা:"}</span>
          </span>

          <button
            type="button"
            onClick={() => handleRangeChange("1-5")}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
              range === "1-5"
                ? "bg-emerald-600 text-white shadow-md scale-102"
                : "bg-white text-emerald-800 hover:bg-emerald-100/70 border border-emerald-200"
            }`}
          >
            {isEng ? "1–5 (Easy)" : "১–৫ (সহজ)"}
          </button>

          <button
            type="button"
            onClick={() => handleRangeChange("1-10")}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
              range === "1-10"
                ? "bg-emerald-600 text-white shadow-md scale-102"
                : "bg-white text-emerald-800 hover:bg-emerald-100/70 border border-emerald-200"
            }`}
          >
            {isEng ? "1–10 (Standard)" : "১–১০ (স্ট্যান্ডার্ড)"}
          </button>

          <button
            type="button"
            onClick={() => handleRangeChange("1-20")}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
              range === "1-20"
                ? "bg-emerald-600 text-white shadow-md scale-102"
                : "bg-white text-emerald-800 hover:bg-emerald-100/70 border border-emerald-200"
            }`}
          >
            {isEng ? "1–20 (Advanced)" : "১–২০ (উন্নত)"}
          </button>
        </div>

        {/* Score & Streak badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-800 shadow-xs">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>{isEng ? "Wins:" : "বিজয়:"}</span>
            <span className="font-extrabold text-emerald-700">{score}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-amber-800 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{isEng ? "Streak:" : "টানা:"}</span>
            <span className="font-extrabold text-amber-700">{streak}</span>
          </div>
        </div>
      </div>

      {/* 🎯 Challenge Prompt Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 text-white rounded-3xl p-5 shadow-lg border-2 border-emerald-400/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl sm:text-4xl shadow-inner border border-white/30 animate-bounce">
              {roundData.selectedFruit.emoji}
            </div>

            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                {isEng ? "Counting Mission" : "ফল গণনার মিশন"}
              </span>

              <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                {isEng ? (
                  <>
                    Collect{" "}
                    <span className="underline decoration-amber-300 underline-offset-4 font-extrabold text-amber-300">
                      {roundData.targetCount}
                    </span>{" "}
                    {roundData.selectedFruit.nameEn}
                  </>
                ) : (
                  <>
                    ঝুড়িতে{" "}
                    <span className="underline decoration-amber-300 underline-offset-4 font-extrabold text-amber-300">
                      {BANGLA_DIGITS[roundData.targetCount]}টি
                    </span>{" "}
                    {roundData.selectedFruit.nameBn} তোলো!
                  </>
                )}
              </h2>

              <p className="text-xs text-emerald-100 mt-1">
                {isEng
                  ? "Tap on the fruits on the tree to pluck them into your basket"
                  : "গাছের ফলগুলোতে স্পর্শ করে একটি একটি করে ঝুড়িতে নামাও"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReplayPrompt}
              className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-2xl border border-white/30 transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5 text-xs font-bold"
              title={isEng ? "Listen to Mission" : "মিশনের নির্দেশ শোনো"}
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>{isEng ? "Hear Again" : "আবার শোনো"}</span>
            </button>

            <button
              type="button"
              onClick={handleResetBasket}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 transition-all hover:scale-105 active:scale-95 text-xs font-bold flex items-center gap-1.5"
              title={isEng ? "Empty Basket" : "ঝুড়ি খালি করো"}
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isEng ? "Reset" : "রিসেট"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🌳 Interactive Orchard Tree & Fruit Basket Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: The Big Orchard Tree (8 cols) */}
        <div className="lg:col-span-8 bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 rounded-3xl p-4 sm:p-6 border-2 border-emerald-300 shadow-md relative min-h-[380px] sm:min-h-[460px] flex flex-col justify-between overflow-hidden">
          {/* Sunny sky background clouds */}
          <div className="absolute top-4 left-6 text-3xl opacity-80 select-none animate-pulse">☁️</div>
          <div className="absolute top-8 right-12 text-4xl opacity-80 select-none">☀️</div>
          <div className="absolute top-16 right-36 text-2xl opacity-60 select-none">☁️</div>

          {/* Lush Green Tree Canopy SVG Shape */}
          <div className="relative w-full max-w-[500px] mx-auto aspect-4/3 my-auto">
            {/* Tree trunk */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-28 sm:h-36 bg-gradient-to-b from-amber-800 to-amber-950 rounded-b-2xl shadow-lg border-2 border-amber-950">
              <div className="w-1 h-12 bg-amber-900/60 mx-auto mt-4 rounded-full" />
              <div className="w-1 h-8 bg-amber-900/60 ml-3 mt-2 rounded-full" />
            </div>

            {/* Tree Leaves Circles */}
            <div className="absolute inset-x-2 top-2 bottom-16 sm:bottom-20 bg-gradient-to-b from-emerald-500 via-green-600 to-emerald-700 rounded-[60px] shadow-2xl border-4 border-emerald-400/80 overflow-hidden">
              <div className="absolute -top-8 -left-8 w-44 h-44 bg-green-400/40 rounded-full blur-xl pointer-events-none" />
              <div className="absolute top-10 right-0 w-48 h-48 bg-emerald-300/30 rounded-full blur-xl pointer-events-none" />

              {/* Hanging Fruits on the Tree */}
              {treeFruits.map((fruit) => (
                <button
                  key={fruit.uid}
                  type="button"
                  onClick={() => handleFruitClick(fruit)}
                  disabled={fruit.isPlucked || isCompleted}
                  style={{
                    left: `${fruit.x}%`,
                    top: `${fruit.y}%`,
                    transform: `translate(-50%, -50%) scale(${fruit.scale})`,
                  }}
                  className={`absolute p-2 rounded-2xl transition-all duration-300 select-none touch-manipulation group ${
                    fruit.isPlucked
                      ? "opacity-0 scale-0 pointer-events-none"
                      : "cursor-pointer hover:scale-125 active:scale-95 animate-in zoom-in"
                  }`}
                  aria-label={`${roundData.selectedFruit.nameBn} তোলো`}
                >
                  <span className="text-3xl sm:text-4xl filter drop-shadow-md group-hover:rotate-12 transition-transform block">
                    {roundData.selectedFruit.emoji}
                  </span>
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] text-emerald-900 opacity-60">
                    🍃
                  </span>
                </button>
              ))}
            </div>

            {/* Ground grassy hills */}
            <div className="absolute -bottom-4 inset-x-0 h-10 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 rounded-full shadow-inner border-t-2 border-emerald-400/60" />
          </div>

          {/* Bottom helpful hint */}
          <div className="relative z-10 text-center py-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur-xs rounded-full text-xs font-bold text-emerald-900 border border-emerald-300 shadow-xs">
              <span>👇</span>
              <span>
                {isEng
                  ? "Click any fruit above to pluck and count"
                  : "গাছের যেকোনো ফলে ক্লিক করে ঝুড়িতে ফেলো"}
              </span>
            </span>
          </div>
        </div>

        {/* Right Column: Fruit Basket & Progress Card (4 cols) */}
        <div className="lg:col-span-4 bg-gradient-to-b from-amber-50 to-orange-50 rounded-3xl p-5 border-2 border-amber-300 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-amber-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-500 text-white rounded-xl shadow-xs">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-amber-950">
                    {isEng ? "Collection Basket" : "ফলের ঝুড়ি"}
                  </h3>
                  <span className="text-[11px] text-amber-800 font-semibold">
                    {isEng ? "Count:" : "বর্তমান গণনা:"} {isEng ? basketFruits.length : BANGLA_DIGITS[basketFruits.length]} / {isEng ? roundData.targetCount : BANGLA_DIGITS[roundData.targetCount]}
                  </span>
                </div>
              </div>

              {/* Huge Visual Target Number Card */}
              <div className="px-3.5 py-1.5 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl shadow-md text-center">
                <span className="text-[10px] block font-bold uppercase opacity-90">
                  {isEng ? "Goal" : "লক্ষ্য"}
                </span>
                <span className="text-xl font-black">
                  {isEng ? roundData.targetCount : BANGLA_DIGITS[roundData.targetCount]}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-amber-200/80 rounded-full h-3 mb-4 overflow-hidden border border-amber-300">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${Math.min(100, (basketFruits.length / roundData.targetCount) * 100)}%`,
                }}
              />
            </div>

            {/* Basket Graphic & Plucked Fruit Drop Zone */}
            <div className="relative bg-gradient-to-b from-amber-100 to-amber-200/90 rounded-3xl p-4 border-2 border-dashed border-amber-400 min-h-[190px] flex flex-col justify-end items-center shadow-inner">
              {basketFruits.length === 0 ? (
                <div className="my-auto text-center p-4">
                  <div className="text-4xl mb-2 opacity-50">🧺</div>
                  <p className="text-xs font-bold text-amber-800/70">
                    {isEng ? "Basket is empty" : "ঝুড়ি এখন খালি"}
                  </p>
                  <p className="text-[11px] text-amber-700/60 mt-0.5">
                    {isEng ? "Pluck fruits from tree" : "গাছ থেকে ফল পেড়ে ঝুড়িতে নাও"}
                  </p>
                </div>
              ) : (
                <div className="w-full flex flex-wrap gap-2 justify-center items-center py-2 max-h-[180px] overflow-y-auto">
                  {basketFruits.map((item, idx) => (
                    <div
                      key={item.uid}
                      className="p-1.5 bg-white/90 rounded-xl shadow-xs border border-amber-200 animate-in zoom-in duration-200 flex items-center justify-center text-2xl relative"
                    >
                      <span>{item.emoji}</span>
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-600 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                        {isEng ? idx + 1 : BANGLA_DIGITS[idx + 1]}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Basket rim illustration */}
              <div className="w-full mt-2 pt-2 border-t border-amber-300/80 text-center">
                <span className="text-xs font-black text-amber-900 tracking-wide">
                  🧺 {isEng ? "Harvest Cart" : "ফলের খাঁচা"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Feedback Area */}
          <div className="mt-4 pt-3 border-t border-amber-200">
            {isCompleted ? (
              <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg border border-emerald-400 text-center animate-in zoom-in duration-300">
                <div className="flex items-center justify-center gap-1.5 font-black text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>{isEng ? "Mission Complete!" : "মিশন সফল হয়েছে!"}</span>
                </div>
                <p className="text-[11px] text-emerald-100 font-medium">
                  {isEng ? "+10 Stars Earned! Next challenge loading..." : "+১০ স্টার যোগ হয়েছে! পরবর্তী রাউন্ড আসছে..."}
                </p>
                <button
                  type="button"
                  onClick={() => initRound(range)}
                  className="mt-2 w-full py-1.5 bg-white text-emerald-800 rounded-xl font-black text-xs hover:bg-emerald-50 transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>{isEng ? "Next Challenge Now" : "এখনই পরবর্তী চ্যালেঞ্জ"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between text-xs text-amber-900 font-bold px-1">
                <span>
                  {isEng ? "Remaining to pick:" : "বাকি আছে:"}{" "}
                  <span className="text-amber-700 font-black">
                    {isEng
                      ? Math.max(0, roundData.targetCount - basketFruits.length)
                      : BANGLA_DIGITS[Math.max(0, roundData.targetCount - basketFruits.length)]}টি
                  </span>
                </span>
                <span className="text-amber-600 font-semibold">
                  ⭐ +১০ স্টার
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
