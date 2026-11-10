"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  Volume2, 
  RotateCcw, 
  Sparkles, 
  Star, 
  ArrowRight, 
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle
} from "lucide-react";
import { VOWELS_DATA, CONSONANTS_DATA, NUMBERS_DATA, BornomalaItem } from "@/data/bornomalaData";
import { ENGLISH_ALPHABET_DATA, ENGLISH_VOWELS, ENGLISH_CONSONANTS, ENGLISH_NUMBERS_DATA, EnglishAlphabetItem } from "@/data/englishAlphabetData";
import { safeSpeak, stopSpeech } from "@/utils/mobileSpeech";
import { playSuccessChime, playStarDing, playGentlePlop, playPopSound } from "@/utils/bornomalaAudio";

interface Props {
  onBackToCanvas: () => void;
  onAddStars: (amount: number) => void;
  languageMode?: "bangla" | "english";
}

type GameMode = "picture-to-letter" | "listen-to-letter" | "case-match";
type QuizCategory = "all" | "vowels" | "consonants" | "numbers";

export default function BornomalaMiniGame({ onBackToCanvas, onAddStars, languageMode = "bangla" }: Props) {
  const isEng = languageMode === "english";
  const [gameMode, setGameMode] = useState<GameMode>("picture-to-letter");
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>("all");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [options, setOptions] = useState<(BornomalaItem | EnglishAlphabetItem)[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<BornomalaItem | EnglishAlphabetItem | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  // Pool of items based on active category and language
  const getCategoryPool = (cat: QuizCategory): (BornomalaItem | EnglishAlphabetItem)[] => {
    if (isEng) {
      switch (cat) {
        case "vowels": return ENGLISH_VOWELS;
        case "consonants": return ENGLISH_CONSONANTS;
        case "numbers": return ENGLISH_NUMBERS_DATA;
        case "all":
        default:
          return ENGLISH_ALPHABET_DATA;
      }
    }
    switch (cat) {
      case "vowels": return VOWELS_DATA;
      case "consonants": return CONSONANTS_DATA;
      case "numbers": return NUMBERS_DATA;
      case "all":
      default:
        return [...VOWELS_DATA, ...CONSONANTS_DATA, ...NUMBERS_DATA];
    }
  };

  const currentPool = getCategoryPool(selectedCategory);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  // Shuffle and generate question
  const generateQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    stopSpeech();

    const pool = getCategoryPool(selectedCategory);
    if (pool.length === 0) return;

    // Pick random target
    const randomTargetIndex = Math.floor(Math.random() * pool.length);
    const target = pool[randomTargetIndex];
    setCurrentIndex(randomTargetIndex);

    // Pick 3 distractors
    const distractors: (BornomalaItem | EnglishAlphabetItem)[] = [];
    let attempts = 0;
    while (distractors.length < 3 && attempts < 40) {
      attempts++;
      const rand = pool[Math.floor(Math.random() * pool.length)];
      if (rand.id !== target.id && !distractors.some((d) => d.id === rand.id)) {
        distractors.push(rand);
      }
    }

    // Combine and shuffle options
    const shuffled = [target, ...distractors].sort(() => Math.random() - 0.5);
    setOptions(shuffled);

    // If listen mode, speak target
    if (gameMode === "listen-to-letter") {
      setTimeout(() => {
        if (isEng) {
          const sound = "pureSound" in target && target.pureSound ? target.pureSound : target.char;
          safeSpeak(`Find the letter: ${target.char}! Sound: ${sound}`, { lang: "en-US", voice: "ana", rate: 0.88 });
        } else {
          const soundText = target.pureSound || target.name;
          safeSpeak(`খুঁজে বের করো বর্ণ: ${soundText}`, { lang: "bn-BD", rate: 0.85 });
        }
      }, 200);
    } else if (gameMode === "case-match" && isEng) {
      setTimeout(() => {
        safeSpeak(`Find the small letter for capital ${target.char}!`, { lang: "en-US", voice: "ana", rate: 0.88 });
      }, 200);
    }
  };

  useEffect(() => {
    generateQuestion();
  }, [gameMode, selectedCategory, languageMode]);

  const targetItem = currentPool[currentIndex] || currentPool[0];

  const handleSelectOption = (item: BornomalaItem | EnglishAlphabetItem) => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks

    playPopSound();
    setSelectedAnswer(item);

    if (item.id === targetItem.id) {
      setIsCorrect(true);
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
      onAddStars(10);
      playSuccessChime();
      playStarDing();

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#ec4899", "#3b82f6", "#10b981", "#f59e0b"]
      });

      if (isEng) {
        safeSpeak(`Awesome! ${item.char} is for ${item.word}!`, {
          lang: "en-US",
          voice: "ana",
          rate: 0.88,
        });
      } else {
        safeSpeak(`চমৎকার! ঠিক বলেছ! ${item.char}-তে ${item.word}!`, {
          lang: "bn-BD",
          rate: 0.9,
        });
      }

      // Auto advance after 1.6s
      setTimeout(() => {
        generateQuestion();
      }, 1600);
    } else {
      setIsCorrect(false);
      setStreak(0);
      playGentlePlop();
      if (isEng) {
        safeSpeak(`Try again! You can do it!`, { lang: "en-US", voice: "ana", rate: 0.88 });
      } else {
        safeSpeak(`হলো না! আবার চেষ্টা করো।`, { lang: "bn-BD", rate: 0.9 });
      }
    }
  };

  const handleReplayAudio = () => {
    if (isEng) {
      if (gameMode === "case-match") {
        safeSpeak(`Find the small letter for capital ${targetItem.char}!`, { lang: "en-US", voice: "ana", rate: 0.88 });
      } else {
        const sound = "pureSound" in targetItem && targetItem.pureSound ? targetItem.pureSound : targetItem.char;
        safeSpeak(`Find the letter: ${targetItem.char}! Sound: ${sound}`, { lang: "en-US", voice: "ana", rate: 0.88 });
      }
    } else {
      const soundText = targetItem.pureSound || targetItem.name;
      safeSpeak(`খুঁজে বের করো বর্ণ: ${soundText}`, { lang: "bn-BD", rate: 0.85 });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Game Mode Switcher & Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-200">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setGameMode("picture-to-letter");
              playPopSound();
            }}
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
            onClick={() => {
              setGameMode("listen-to-letter");
              playPopSound();
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              gameMode === "listen-to-letter"
                ? "bg-purple-600 text-white shadow-md scale-102"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {isEng ? "🎧 Listen & Pick" : "🎧 শুনে বর্ণ বাছাই করো"}
          </button>
          {isEng && (
            <button
              type="button"
              onClick={() => {
                setGameMode("case-match");
                playPopSound();
              }}
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
        <button
          type="button"
          onClick={() => {
            playPopSound();
            setSelectedCategory("all");
          }}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
            selectedCategory === "all"
              ? "bg-slate-800 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {isEng ? "🌈 All Letters" : "🌈 সকল বর্ণ ও সংখ্যা"}
        </button>
        <button
          type="button"
          onClick={() => {
            playPopSound();
            setSelectedCategory("vowels");
          }}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
            selectedCategory === "vowels"
              ? "bg-pink-600 text-white shadow-xs"
              : "bg-pink-50 text-pink-700 hover:bg-pink-100"
          }`}
        >
          {isEng ? "🌸 Vowels (5)" : "🌸 স্বরবর্ণ (১১)"}
        </button>
        <button
          type="button"
          onClick={() => {
            playPopSound();
            setSelectedCategory("consonants");
          }}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
            selectedCategory === "consonants"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          }`}
        >
          {isEng ? "🌿 Consonants (21)" : "🌿 ব্যঞ্জনবর্ণ (৩৯)"}
        </button>
        <button
          type="button"
          onClick={() => {
            playPopSound();
            setSelectedCategory("numbers");
          }}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
            selectedCategory === "numbers"
              ? "bg-amber-600 text-white shadow-xs"
              : "bg-amber-50 text-amber-700 hover:bg-amber-100"
          }`}
        >
          {isEng ? "🔢 Numbers (0-20)" : "🔢 সংখ্যা (০-২০)"}
        </button>
      </div>

      {/* Main Question Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border-2 border-pink-100 shadow-lg text-center space-y-6">
        {gameMode === "picture-to-letter" ? (
          <div className="space-y-3">
            <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block">
              {isEng ? "Look at the picture and tap the correct letter" : "ছবি দেখে সঠিক বর্ণটিতে ট্যাপ করো"}
            </span>
            <div className="text-8xl sm:text-9xl p-4 bg-pink-50 rounded-3xl inline-block shadow-inner border border-pink-100 animate-bounce duration-1000">
              {targetItem.imageEmoji}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
              {targetItem.word} {"wordMeaningBn" in targetItem && targetItem.wordMeaningBn ? `(${targetItem.wordMeaningBn})` : ""}
            </h3>
          </div>
        ) : gameMode === "case-match" && isEng ? (
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
              {isEng ? "Listen carefully and select the correct letter" : "মন দিয়ে শুনে সঠিক বর্ণটি নির্বাচন করো"}
            </span>
            <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-3xl bg-purple-100 flex items-center justify-center text-purple-600 text-5xl shadow-md">
              🎧
            </div>
            <div>
              <button
                type="button"
                onClick={handleReplayAudio}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
              >
                <Volume2 className="w-5 h-5 animate-pulse" />
                <span>{isEng ? "Listen Again" : "উচ্চারণ আবার শোনো"}</span>
              </button>
            </div>
          </div>
        )}

        {/* 4 Multi-choice Option Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto pt-4">
          {options.map((opt) => {
            const isThisSelected = selectedAnswer?.id === opt.id;
            const isThisTarget = opt.id === targetItem.id;

            let buttonStyle = "bg-slate-50 hover:bg-pink-50 border-2 border-slate-200 text-slate-800";
            if (selectedAnswer) {
              if (isThisTarget) {
                buttonStyle = "bg-emerald-500 text-white border-2 border-emerald-600 scale-105 shadow-lg";
              } else if (isThisSelected) {
                buttonStyle = "bg-rose-500 text-white border-2 border-rose-600 animate-shake";
              } else {
                buttonStyle = "opacity-40 bg-slate-100 border-slate-200 text-slate-400";
              }
            }

            const optionGlyph = gameMode === "case-match" && "lowerChar" in opt
              ? opt.lowerChar
              : opt.char;

            return (
              <button
                key={opt.id}
                type="button"
                disabled={selectedAnswer !== null}
                onClick={() => handleSelectOption(opt)}
                className={`h-24 sm:h-28 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-95 font-black text-4xl sm:text-5xl ${buttonStyle}`}
              >
                <span>{optionGlyph}</span>
                <span className="text-[11px] font-semibold opacity-80">{opt.name}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Alert */}
        {selectedAnswer && (
          <div className="pt-2 animate-in zoom-in-95 duration-200">
            {isCorrect ? (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-sm border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>
                  {isEng
                    ? `Great! '${targetItem.char}' is for ${targetItem.word} — Correct! 🎉`
                    : `দারুণ! '${targetItem.char}'-তে ${targetItem.word} — সঠিক উত্তর! 🎉`}
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-100 text-rose-800 font-bold text-sm border border-rose-200 shadow-sm">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>
                  {isEng
                    ? `Incorrect! The correct letter was: '${targetItem.char}' (${targetItem.word})`
                    : `ভুল উত্তর! সঠিক উত্তর হলো: '${targetItem.char}' (${targetItem.word})`}
                </span>
              </div>
            )}
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
