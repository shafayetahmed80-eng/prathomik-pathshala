"use client";

import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import {
  RotateCcw,
  Star,
  Sparkles,
  Trophy,
  CheckCircle2,
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

type MemoryCategory = "all" | "vowels" | "consonants" | "numbers";

interface MemoryCard {
  uniqueId: string;
  pairId: string;
  type: "symbol" | "picture" | "word";
  content: string; // letter/number or emoji/word
  subLabel?: string;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
  originalItem: BornomalaItem | EnglishAlphabetItem;
}

const CARD_COLORS = [
  "from-rose-500 to-pink-600",
  "from-sky-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-amber-400 to-orange-500",
  "from-purple-500 to-indigo-600",
  "from-cyan-400 to-blue-500",
];

function createMemoryDeck(pool: (BornomalaItem | EnglishAlphabetItem)[]): MemoryCard[] {
  if (pool.length === 0) return [];

  // Pick 4 unique random items
  const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
  const selectedItems = shuffledPool.slice(0, 4);

  const generatedCards: MemoryCard[] = [];

  selectedItems.forEach((item, idx) => {
    const color = CARD_COLORS[idx % CARD_COLORS.length];
    const pairId = item.id;

    // Card 1: Symbol (Letter / Number)
    generatedCards.push({
      uniqueId: `card-${item.id}-sym`,
      pairId,
      type: "symbol",
      content: item.char,
      subLabel: item.name,
      color,
      isFlipped: false,
      isMatched: false,
      originalItem: item,
    });

    // Card 2: Picture / Emoji representation
    const picContent = "imageEmoji" in item && item.imageEmoji ? item.imageEmoji : "⭐";
    const picWord = item.word || item.name;

    generatedCards.push({
      uniqueId: `card-${item.id}-pic`,
      pairId,
      type: "picture",
      content: picContent,
      subLabel: picWord,
      color,
      isFlipped: false,
      isMatched: false,
      originalItem: item,
    });
  });

  // Shuffle the 8 cards
  return generatedCards.sort(() => Math.random() - 0.5);
}

export default function BornomalaMemoryGame({
  onAddStars,
  languageMode = "bangla",
  teacherVoice,
}: Props) {
  const isEng = languageMode === "english";
  const [category, setCategory] = useState<MemoryCategory>("vowels");
  const [cards, setCards] = useState<MemoryCard[]>(() => {
    const initialPool = isEng ? ENGLISH_VOWELS : VOWELS_DATA;
    return createMemoryDeck(initialPool);
  });
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [matches, setMatches] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const activeVoice = isEng
    ? teacherVoice === "guy" || teacherVoice === "pradeep"
      ? "guy"
      : "ana"
    : teacherVoice === "pradeep" || teacherVoice === "guy"
      ? "pradeep"
      : "nabanita";

  // Unmount cleanup
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  // Start / Restart game with 4 pairs (8 cards total - perfect for young learners)
  const restartWithCategory = useCallback(
    (targetCat: MemoryCategory = category) => {
      stopSpeech();
      unlockMobileAudio({ primeSilent: true });
      setFlippedIndices([]);
      setMoves(0);
      setMatches(0);
      setIsWon(false);
      setIsLocked(false);

      let pool: (BornomalaItem | EnglishAlphabetItem)[] = [];
      if (isEng) {
        if (targetCat === "vowels") pool = ENGLISH_VOWELS;
        else if (targetCat === "consonants") pool = ENGLISH_CONSONANTS;
        else if (targetCat === "numbers") pool = ENGLISH_NUMBERS_DATA.slice(0, 21);
        else pool = ENGLISH_ALPHABET_DATA;
      } else {
        if (targetCat === "vowels") pool = VOWELS_DATA;
        else if (targetCat === "consonants") pool = CONSONANTS_DATA;
        else if (targetCat === "numbers") pool = NUMBERS_DATA.slice(0, 21);
        else pool = [...VOWELS_DATA, ...CONSONANTS_DATA];
      }

      setCards(createMemoryDeck(pool));
    },
    [category, isEng]
  );

  const handleCardClick = (index: number) => {
    if (isLocked) return;
    const card = cards[index];
    if (card.isFlipped || card.isMatched) return;

    unlockMobileAudio({ primeSilent: true });
    playPopSound();

    const newFlipped = [...flippedIndices, index];
    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, isFlipped: true } : c))
    );
    setFlippedIndices(newFlipped);

    // Speak card content
    if (card.type === "symbol") {
      const prompt = isEng ? card.originalItem.char : card.originalItem.pureSound || card.originalItem.name;
      safeSpeak(prompt, { lang: isEng ? "en-US" : "bn-BD", voice: activeVoice, rate: 0.88 });
    } else {
      safeSpeak(card.subLabel || "", { lang: isEng ? "en-US" : "bn-BD", voice: activeVoice, rate: 0.88 });
    }

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves((m) => m + 1);

      const firstIndex = newFlipped[0];
      const secondIndex = newFlipped[1];
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.pairId === secondCard.pairId) {
        // Match Found!
        playStarDing();
        playSuccessChime();
        setMatches((m) => {
          const nextM = m + 1;
          if (nextM === 4) {
            // Game Won!
            setIsWon(true);
            onAddStars(20);
            confetti({
              particleCount: 70,
              spread: 70,
              origin: { y: 0.6 },
            });
            const winPrompt = isEng
              ? "Congratulations! You found all matches! Super learner!"
              : "অভিনন্দন! তুমি সব জোড়া মিলিয়ে ফেলেছ! তুমি একজন সেরা শিক্ষার্থী!";
            safeSpeak(winPrompt, { lang: isEng ? "en-US" : "bn-BD", voice: activeVoice, rate: 0.9 });
          }
          return nextM;
        });

        setCards((prev) =>
          prev.map((c) =>
            c.pairId === firstCard.pairId ? { ...c, isMatched: true } : c
          )
        );
        setFlippedIndices([]);
        setIsLocked(false);
      } else {
        // No match: flip back after 1.1s
        playGentlePlop();
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIndex || i === secondIndex
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1100);
      }
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Sub Header / Category Selector & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 rounded-2xl border border-emerald-200 shadow-sm">
        {/* Category switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: "vowels", label: isEng ? "Vowels" : "স্বরবর্ণ (১১)" },
            { id: "consonants", label: isEng ? "Consonants" : "ব্যঞ্জনবর্ণ (৩৯)" },
            { id: "numbers", label: isEng ? "Numbers (০-২০)" : "সংখ্যা (০-২০)" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                const nextCat = cat.id as MemoryCategory;
                setCategory(nextCat);
                restartWithCategory(nextCat);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                category === cat.id
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white text-emerald-900 hover:bg-emerald-100/70 border border-emerald-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Score Stats */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 text-emerald-900 shadow-sm">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>
              {isEng ? "Pairs:" : "মিলেছে:"} {matches}/4
            </span>
          </div>

          <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 text-emerald-900 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>
              {isEng ? "Moves:" : "চেষ্টা:"} {moves}
            </span>
          </div>

          <button
            type="button"
            onClick={() => restartWithCategory(category)}
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl transition-all active:scale-95 shadow-sm"
            title="নতুন করে শুরু"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isEng ? "Reset" : "নতুন খেলা"}</span>
          </button>
        </div>
      </div>

      {/* 🎴 4x2 Responsive Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-2 sm:p-4 bg-gradient-to-b from-slate-50 to-indigo-50/40 rounded-3xl border-2 border-indigo-100">
        {cards.map((card, index) => {
          const isRevealed = card.isFlipped || card.isMatched;

          return (
            <button
              key={card.uniqueId}
              type="button"
              onClick={() => handleCardClick(index)}
              disabled={isRevealed || isLocked}
              className={`relative h-32 sm:h-36 rounded-2xl p-1 transition-all duration-300 transform perspective-1000 ${
                card.isMatched
                  ? "opacity-90 scale-98 ring-4 ring-emerald-400"
                  : isRevealed
                  ? "scale-102 ring-2 ring-indigo-400"
                  : "hover:scale-103 active:scale-95"
              }`}
            >
              {/* Card Face Down (Back) */}
              {!isRevealed ? (
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 border-2 border-indigo-300 shadow-md flex flex-col items-center justify-center text-white gap-1 group">
                  <span className="text-3xl filter drop-shadow animate-pulse">❓</span>
                  <span className="text-[10px] uppercase font-black tracking-widest text-indigo-200 opacity-80">
                    {isEng ? "Card" : "কার্ড"}
                  </span>
                </div>
              ) : (
                /* Card Face Up (Front) */
                <div
                  className={`w-full h-full rounded-xl bg-white border-2 ${
                    card.isMatched
                      ? "border-emerald-400 bg-emerald-50/50"
                      : "border-indigo-200"
                  } shadow-lg flex flex-col items-center justify-center p-2 animate-in zoom-in-95 duration-200`}
                >
                  {card.type === "symbol" ? (
                    <span className="text-4xl sm:text-5xl font-black text-indigo-900 drop-shadow-sm">
                      {card.content}
                    </span>
                  ) : (
                    <span className="text-4xl sm:text-5xl drop-shadow-sm animate-bounce-slow">
                      {card.content}
                    </span>
                  )}

                  {card.subLabel && (
                    <span className="mt-1 text-[11px] font-bold text-gray-700 truncate max-w-full text-center px-1">
                      {card.subLabel}
                    </span>
                  )}

                  {card.isMatched && (
                    <div className="absolute top-1.5 right-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100" />
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Victory Banner */}
      {isWon && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-white shadow-lg flex items-center justify-between gap-4 animate-in zoom-in-95 duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl">
              <Star className="w-8 h-8 fill-yellow-200 text-yellow-100 animate-spin-slow" />
            </div>
            <div>
              <h4 className="font-extrabold text-base sm:text-lg">
                {isEng ? "Super Job! All 4 Pairs Matched! 🎉" : "অসাধারণ! সব জোড়া মিলে গেছে! 🎉"}
              </h4>
              <p className="text-xs text-amber-50">
                {isEng
                  ? `Completed in ${moves} moves! You earned +20 Stars!`
                  : `${moves} বারে সব শেষ করেছ! অর্জিত হয়েছে +২০ স্টার!` }
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => restartWithCategory(category)}
            className="px-4 py-2 bg-white text-amber-900 rounded-xl font-black text-xs sm:text-sm hover:bg-amber-50 active:scale-95 transition-all shadow-md shrink-0"
          >
            {isEng ? "Play Again" : "আবার খেলুন"}
          </button>
        </div>
      )}
    </div>
  );
}
