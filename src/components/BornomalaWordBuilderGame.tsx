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
  Train,
  Layers,
} from "lucide-react";
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

type WordDifficulty = "easy-2" | "medium-3" | "all";

interface WordItem {
  id: string;
  word: string;
  letters: string[];
  emoji: string;
  meaningBn: string;
  meaningEn: string;
  phonicsSpell: string; // for speech
  difficulty: "2" | "3" | "4";
}

const BANGLA_WORDS: WordItem[] = [
  // 2-Letter Words
  { id: "bw1", word: "আম", letters: ["আ", "ম"], emoji: "🥭", meaningBn: "পাকা সুস্বাদু আম", meaningEn: "Mango", phonicsSpell: "আ... ম... আম!", difficulty: "2" },
  { id: "bw2", word: "বই", letters: ["ব", "ই"], emoji: "📗", meaningBn: "নতুন পাঠ্যবই", meaningEn: "Book", phonicsSpell: "ব... ই... বই!", difficulty: "2" },
  { id: "bw3", word: "বক", letters: ["ব", "ক"], emoji: "🦢", meaningBn: "সাদা সুন্দর বক", meaningEn: "Heron", phonicsSpell: "ব... ক... বক!", difficulty: "2" },
  { id: "bw4", word: "ঘর", letters: ["ঘ", "র"], emoji: "🏠", meaningBn: "ছোট্ট মিষ্টি ঘর", meaningEn: "House", phonicsSpell: "ঘ... র... ঘর!", difficulty: "2" },
  { id: "bw5", word: "জল", letters: ["জ", "ল"], emoji: "💧", meaningBn: "নির্মল সুপেয় জল", meaningEn: "Water", phonicsSpell: "জ... ল... জল!", difficulty: "2" },
  { id: "bw6", word: "ফল", letters: ["ফ", "ল"], emoji: "🍎", meaningBn: "মিষ্টি তাজা ফল", meaningEn: "Fruit", phonicsSpell: "ফ... ল... ফল!", difficulty: "2" },
  { id: "bw7", word: "ওল", letters: ["ও", "ল"], emoji: "🥔", meaningBn: "পুষ্টিকর ওল", meaningEn: "Yam", phonicsSpell: "ও... ল... ওল!", difficulty: "2" },
  { id: "bw8", word: "রথ", letters: ["র", "থ"], emoji: "🎡", meaningBn: "রথের সুন্দর মেলা", meaningEn: "Chariot", phonicsSpell: "র... থ... রথ!", difficulty: "2" },
  { id: "bw9", word: "ডাব", letters: ["ড", "া", "ব"], emoji: "🥥", meaningBn: "মিষ্টি ডাবের জল", meaningEn: "Green Coconut", phonicsSpell: "ড... া... ব... ডাব!", difficulty: "3" },
  { id: "bw10", word: "হাত", letters: ["হ", "া", "ত"], emoji: "🖐️", meaningBn: "পরিষ্কার দুটি হাত", meaningEn: "Hand", phonicsSpell: "হ... া... ত... হাত!", difficulty: "3" },
  { id: "bw11", word: "মাছ", letters: ["ম", "া", "ছ"], emoji: "🐟", meaningBn: "নদীর রূপালী মাছ", meaningEn: "Fish", phonicsSpell: "ম... া... ছ... মাছ!", difficulty: "3" },
  { id: "bw12", word: "ফুল", letters: ["ফ", "ু", "ল"], emoji: "🌸", meaningBn: "বাগানের লাল ফুল", meaningEn: "Flower", phonicsSpell: "ফ... ু... ল... ফুল!", difficulty: "3" },
  { id: "bw13", word: "বাঘ", letters: ["ব", "া", "ঘ"], emoji: "🐅", meaningBn: "সুন্দরবনের রয়েল বাঘ", meaningEn: "Tiger", phonicsSpell: "ব... া... ঘ... বাঘ!", difficulty: "3" },
  { id: "bw14", word: "গাছ", letters: ["গ", "া", "ছ"], emoji: "🌳", meaningBn: "ছায়াময় সবুজ গাছ", meaningEn: "Tree", phonicsSpell: "গ... া... ছ... গাছ!", difficulty: "3" },
  { id: "bw15", word: "কলম", letters: ["ক", "ল", "ম"], emoji: "🖊️", meaningBn: "লেখার সুন্দর কলম", meaningEn: "Pen", phonicsSpell: "ক... ল... ম... কলম!", difficulty: "3" },
  { id: "bw16", word: "শপথ", letters: ["শ", "প", "থ"], emoji: "🤝", meaningBn: "সততার দৃঢ় শপথ", meaningEn: "Oath", phonicsSpell: "শ... প... থ... শপথ!", difficulty: "3" },
];

const BANGLA_DISTRACTORS = ["ক", "খ", "গ", "ঘ", "চ", "ছ", "জ", "ট", "ড", "ত", "থ", "দ", "ধ", "ন", "প", "ফ", "ব", "ম", "য", "র", "ল", "শ", "স", "হ", "া", "ি", "ু"];

const ENGLISH_WORDS: WordItem[] = [
  // 3-Letter Words
  { id: "ew1", word: "CAT", letters: ["C", "A", "T"], emoji: "🐱", meaningBn: "বিড়াল", meaningEn: "Cat", phonicsSpell: "C... A... T... Cat!", difficulty: "3" },
  { id: "ew2", word: "DOG", letters: ["D", "O", "G"], emoji: "🐶", meaningBn: "কুকুর ছানা", meaningEn: "Dog", phonicsSpell: "D... O... G... Dog!", difficulty: "3" },
  { id: "ew3", word: "SUN", letters: ["S", "U", "N"], emoji: "☀️", meaningBn: "সূর্য", meaningEn: "Sun", phonicsSpell: "S... U... N... Sun!", difficulty: "3" },
  { id: "ew4", word: "BAT", letters: ["B", "A", "T"], emoji: "🏏", meaningBn: "খেলার ব্যাট", meaningEn: "Bat", phonicsSpell: "B... A... T... Bat!", difficulty: "3" },
  { id: "ew5", word: "BOX", letters: ["B", "O", "X"], emoji: "📦", meaningBn: "বাক্স", meaningEn: "Box", phonicsSpell: "B... O... X... Box!", difficulty: "3" },
  { id: "ew6", word: "CUP", letters: ["C", "U", "P"], emoji: "☕", meaningBn: "চা খাওয়ার কাপ", meaningEn: "Cup", phonicsSpell: "C... U... P... Cup!", difficulty: "3" },
  { id: "ew7", word: "BUS", letters: ["B", "U", "S"], emoji: "🚌", meaningBn: "যাত্রীবাহী বাস", meaningEn: "Bus", phonicsSpell: "B... U... S... Bus!", difficulty: "3" },
  { id: "ew8", word: "PEN", letters: ["P", "E", "N"], emoji: "🖊️", meaningBn: "লেখার কলম", meaningEn: "Pen", phonicsSpell: "P... E... N... Pen!", difficulty: "3" },
  { id: "ew9", word: "BED", letters: ["B", "E", "D"], emoji: "🛏️", meaningBn: "বিছানা", meaningEn: "Bed", phonicsSpell: "B... E... D... Bed!", difficulty: "3" },
  { id: "ew10", word: "FISH", letters: ["F", "I", "S", "H"], emoji: "🐟", meaningBn: "মাছ", meaningEn: "Fish", phonicsSpell: "F... I... S... H... Fish!", difficulty: "4" },
  { id: "ew11", word: "BIRD", letters: ["B", "I", "R", "D"], emoji: "🐦", meaningBn: "পাখি", meaningEn: "Bird", phonicsSpell: "B... I... R... D... Bird!", difficulty: "4" },
  { id: "ew12", word: "BOOK", letters: ["B", "O", "O", "K"], emoji: "📗", meaningBn: "বই", meaningEn: "Book", phonicsSpell: "B... O... O... K... Book!", difficulty: "4" },
  { id: "ew13", word: "TREE", letters: ["T", "R", "E", "E"], emoji: "🌳", meaningBn: "গাছ", meaningEn: "Tree", phonicsSpell: "T... R... E... E... Tree!", difficulty: "4" },
  { id: "ew14", word: "STAR", letters: ["S", "T", "A", "R"], emoji: "⭐", meaningBn: "তারা", meaningEn: "Star", phonicsSpell: "S... T... A... R... Star!", difficulty: "4" },
];

const ENGLISH_DISTRACTORS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "W", "Y"];

interface LetterWagon {
  uid: string;
  char: string;
  isUsed: boolean;
  colorIdx: number;
}

const CARRIAGE_COLORS = [
  "from-amber-400 to-orange-500 border-amber-300 text-amber-950",
  "from-rose-400 to-pink-500 border-rose-300 text-rose-950",
  "from-sky-400 to-blue-500 border-sky-300 text-sky-950",
  "from-emerald-400 to-teal-500 border-emerald-300 text-emerald-950",
  "from-purple-400 to-indigo-500 border-purple-300 text-purple-950",
];

interface WordRoundData {
  currentWord: WordItem;
  availableWagons: LetterWagon[];
}

function generateWordRoundData(diff: WordDifficulty, isEng: boolean): WordRoundData {
  const sourcePool = isEng ? ENGLISH_WORDS : BANGLA_WORDS;
  let filtered = sourcePool;
  if (diff === "easy-2") {
    filtered = sourcePool.filter((w) => w.difficulty === "2" || (isEng && w.difficulty === "3"));
  } else if (diff === "medium-3") {
    filtered = sourcePool.filter((w) => w.difficulty === "3");
  }

  const pool = filtered.length > 0 ? filtered : sourcePool;
  const currentWord = pool[Math.floor(Math.random() * pool.length)];

  const targetLetters = currentWord.letters;
  const distractorsPool = isEng ? ENGLISH_DISTRACTORS : BANGLA_DISTRACTORS;
  const extraChars: string[] = [];

  for (let i = 0; i < 3; i++) {
    const candidate = distractorsPool[Math.floor(Math.random() * distractorsPool.length)];
    if (!extraChars.includes(candidate)) {
      extraChars.push(candidate);
    }
  }

  const allChars = [...targetLetters, ...extraChars].sort(() => Math.random() - 0.5);

  const availableWagons: LetterWagon[] = allChars.map((char, index) => ({
    uid: `wagon-${index}-${Math.random()}`,
    char,
    isUsed: false,
    colorIdx: index % CARRIAGE_COLORS.length,
  }));

  return { currentWord, availableWagons };
}

export default function BornomalaWordBuilderGame({
  onAddStars,
  languageMode = "bangla",
  teacherVoice,
}: Props) {
  const isEng = languageMode === "english";

  const [difficulty, setDifficulty] = useState<WordDifficulty>("all");
  const [roundData, setRoundData] = useState<WordRoundData>(() =>
    generateWordRoundData("all", isEng)
  );
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [availableWagons, setAvailableWagons] = useState<LetterWagon[]>(
    () => roundData.availableWagons
  );
  const [wobblingWagonId, setWobblingWagonId] = useState<string | null>(null);
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
    (wordItem: WordItem) => {
      stopSpeech();
      if (isEng) {
        const text = `Assemble the train carriages to spell the word: ${wordItem.word}!`;
        safeSpeak(text, { lang: "en-US", voice: activeVoice, rate: 0.88 });
      } else {
        const text = `ট্রেনের বগিতে বর্ণ সাজিয়ে তৈরি করো: ${wordItem.word}!`;
        safeSpeak(text, { lang: "bn-BD", voice: activeVoice, rate: 0.85 });
      }
    },
    [isEng, activeVoice]
  );

  const initRound = useCallback(
    (diff: WordDifficulty = difficulty) => {
      if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      setIsCompleted(false);
      setPlacedLetters([]);
      setWobblingWagonId(null);

      const next = generateWordRoundData(diff, isEng);
      setRoundData(next);
      setAvailableWagons(next.availableWagons);

      promptTimerRef.current = setTimeout(() => {
        speakPrompt(next.currentWord);
      }, 300);
    },
    [difficulty, isEng, speakPrompt]
  );

  // Initial prompt & speech cleanup
  useEffect(() => {
    promptTimerRef.current = setTimeout(() => {
      speakPrompt(roundData.currentWord);
    }, 400);

    return () => {
      if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      stopSpeech();
    };
  }, [roundData.currentWord, speakPrompt]);

  const handleWagonClick = (wagon: LetterWagon) => {
    if (wagon.isUsed || isCompleted) return;

    unlockMobileAudio({ primeSilent: true });

    const nextSlotIndex = placedLetters.length;
    const expectedLetter = roundData.currentWord.letters[nextSlotIndex];

    if (wagon.char === expectedLetter) {
      playCarriageSnap();

      setAvailableWagons((prev) =>
        prev.map((w) => (w.uid === wagon.uid ? { ...w, isUsed: true } : w))
      );

      const nextPlaced = [...placedLetters, wagon.char];
      setPlacedLetters(nextPlaced);

      if (isEng) {
        safeSpeak(wagon.char, { lang: "en-US", voice: activeVoice, rate: 0.95 });
      } else {
        safeSpeak(wagon.char, { lang: "bn-BD", voice: activeVoice, rate: 0.92 });
      }

      if (nextPlaced.length === roundData.currentWord.letters.length) {
        setIsCompleted(true);
        setScore((s) => s + 1);
        setStreak((st) => st + 1);
        onAddStars(15);
        playStarDing();

        setTimeout(() => {
          playTrainWhistle();
          playSuccessChime();
          confetti({
            particleCount: 55,
            spread: 75,
            origin: { y: 0.6 },
          });

          if (isEng) {
            safeSpeak(`Awesome! ${roundData.currentWord.phonicsSpell} Well done!`, {
              lang: "en-US",
              voice: activeVoice,
              rate: 0.9,
            });
          } else {
            safeSpeak(`চমৎকার! ${roundData.currentWord.phonicsSpell} দারুণ হয়েছে!`, {
              lang: "bn-BD",
              voice: activeVoice,
              rate: 0.88,
            });
          }
        }, 350);

        advanceTimerRef.current = setTimeout(() => {
          initRound(difficulty);
        }, 3000);
      }
    } else {
      playGentlePlop();
      setWobblingWagonId(wagon.uid);
      setTimeout(() => setWobblingWagonId(null), 500);

      if (isEng) {
        safeSpeak("Not quite! Try the next letter of the word.", {
          lang: "en-US",
          voice: activeVoice,
          rate: 0.9,
        });
      } else {
        safeSpeak("হলো না! শব্দের পরের বর্ণটি খুঁজে বসাও।", {
          lang: "bn-BD",
          voice: activeVoice,
          rate: 0.88,
        });
      }
    }
  };

  const handleResetCarriages = () => {
    playPopSound();
    unlockMobileAudio({ primeSilent: true });
    setPlacedLetters([]);
    setIsCompleted(false);
    setAvailableWagons((prev) => prev.map((w) => ({ ...w, isUsed: false })));
    speakPrompt(roundData.currentWord);
  };

  const handleDifficultyChange = (nextDiff: WordDifficulty) => {
    playPopSound();
    unlockMobileAudio({ primeSilent: true });
    setDifficulty(nextDiff);
    initRound(nextDiff);
  };

  const handleReplayPrompt = () => {
    unlockMobileAudio({ primeSilent: true });
    speakPrompt(roundData.currentWord);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* 🌟 Header & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 rounded-2xl border border-amber-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5 mr-1">
            <Layers className="w-4 h-4 text-amber-600" />
            <span>{isEng ? "Difficulty:" : "শব্দের দৈর্ঘ্য:"}</span>
          </span>

          <button
            type="button"
            onClick={() => handleDifficultyChange("easy-2")}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
              difficulty === "easy-2"
                ? "bg-amber-600 text-white shadow-md scale-102"
                : "bg-white text-amber-800 hover:bg-amber-100/70 border border-amber-200"
            }`}
          >
            {isEng ? "Short Words" : "ছোট শব্দ (২ বর্ণ)"}
          </button>

          <button
            type="button"
            onClick={() => handleDifficultyChange("medium-3")}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
              difficulty === "medium-3"
                ? "bg-amber-600 text-white shadow-md scale-102"
                : "bg-white text-amber-800 hover:bg-amber-100/70 border border-amber-200"
            }`}
          >
            {isEng ? "Medium Words" : "মাঝারি শব্দ (৩ বর্ণ)"}
          </button>

          <button
            type="button"
            onClick={() => handleDifficultyChange("all")}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
              difficulty === "all"
                ? "bg-amber-600 text-white shadow-md scale-102"
                : "bg-white text-amber-800 hover:bg-amber-100/70 border border-amber-200"
            }`}
          >
            {isEng ? "All Words" : "সকল শব্দ"}
          </button>
        </div>

        {/* Score & Streak badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 rounded-xl border border-amber-200 text-xs font-bold text-amber-800 shadow-xs">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>{isEng ? "Words Built:" : "গঠিত শব্দ:"}</span>
            <span className="font-extrabold text-amber-700">{score}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 rounded-xl border border-rose-200 text-xs font-bold text-rose-800 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{isEng ? "Streak:" : "টানা:"}</span>
            <span className="font-extrabold text-rose-700">{streak}</span>
          </div>
        </div>
      </div>

      {/* 🎯 Clue Target Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 text-white rounded-3xl p-5 shadow-lg border-2 border-amber-300/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-4xl sm:text-5xl shadow-inner border border-white/30 animate-pulse">
              {roundData.currentWord.emoji}
            </div>

            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-amber-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                {isEng ? "Word Builder Mission" : "শব্দ জোড়া মিশন"}
              </span>

              <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                {isEng ? (
                  <>
                    Build the word:{" "}
                    <span className="underline decoration-amber-300 underline-offset-4 font-black text-amber-300 tracking-wider">
                      {roundData.currentWord.word}
                    </span>
                  </>
                ) : (
                  <>
                    তৈরি করো:{" "}
                    <span className="underline decoration-amber-300 underline-offset-4 font-black text-amber-300">
                      {roundData.currentWord.word}
                    </span>{" "}
                    ({roundData.currentWord.meaningBn})
                  </>
                )}
              </h2>

              <p className="text-xs text-amber-100 mt-1">
                {isEng
                  ? "Tap on the letter wagons below in the correct order to assemble the train!"
                  : "নিচের অক্ষরের বগিগুলোতে সঠিক ক্রমানুসারে স্পর্শ করে ট্রেনের বগি সাজাও!"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReplayPrompt}
              className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-2xl border border-white/30 transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5 text-xs font-bold"
              title={isEng ? "Hear Word Again" : "শব্দটি আবার শোনো"}
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>{isEng ? "Hear Word" : "আবার শোনো"}</span>
            </button>

            <button
              type="button"
              onClick={handleResetCarriages}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 transition-all hover:scale-105 active:scale-95 text-xs font-bold flex items-center gap-1.5"
              title={isEng ? "Clear Train" : "বগি খালি করো"}
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isEng ? "Reset" : "রিসেট"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🚂 THE TOY TRAIN TRACK AND CARRIAGES STAGE */}
      <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-indigo-700 shadow-xl overflow-hidden relative min-h-[300px]">
        {/* Starry Night Sky Background */}
        <div className="absolute top-4 left-10 text-xs text-amber-300 opacity-60">✨</div>
        <div className="absolute top-8 right-20 text-xs text-amber-300 opacity-80">⭐</div>
        <div className="absolute top-12 left-1/3 text-xs text-amber-200 opacity-40">✨</div>

        <div className="flex flex-col items-center justify-center my-4">
          {/* Train Locomotive + Carriages Row */}
          <div
            className={`flex items-end justify-center gap-2 sm:gap-3 py-6 px-4 overflow-x-auto max-w-full transition-transform duration-700 ${
              isCompleted ? "scale-105" : ""
            }`}
          >
            {/* Locomotive Engine */}
            <div className="flex flex-col items-center relative select-none">
              {/* Steam puff */}
              <div
                className={`text-2xl sm:text-3xl mb-1 transition-all ${
                  isCompleted ? "animate-bounce scale-125" : "animate-pulse opacity-70"
                }`}
              >
                💨
              </div>

              {/* Locomotive Body */}
              <div className="w-20 sm:w-24 h-24 sm:h-28 bg-gradient-to-t from-red-700 via-red-600 to-amber-500 rounded-t-3xl rounded-b-lg border-2 border-amber-300 shadow-2xl flex flex-col justify-between p-2 relative">
                {/* Smokestack */}
                <div className="absolute -top-3 left-3 w-4 h-5 bg-slate-900 rounded-t-sm border border-amber-300" />
                {/* Cabin window with conductor */}
                <div className="w-full h-8 bg-sky-200/90 rounded-xl border border-sky-400 flex items-center justify-center text-base shadow-inner">
                  👨‍✈️
                </div>
                {/* Locomotive Front Grill & Light */}
                <div className="flex items-center justify-between px-1">
                  <div className="w-4 h-4 bg-amber-300 rounded-full shadow-[0_0_8px_#f59e0b] animate-pulse" />
                  <span className="text-[11px] font-black text-amber-200 tracking-wider">
                    {isEng ? "EXPRESS" : "পাঠশালা"}
                  </span>
                </div>
              </div>

              {/* Train wheels */}
              <div className="flex justify-around w-full mt-1">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-slate-800 rounded-full border-2 border-amber-400 shadow-md flex items-center justify-center text-[10px] text-amber-300 animate-spin">
                  ⚙️
                </div>
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-slate-800 rounded-full border-2 border-amber-400 shadow-md flex items-center justify-center text-[10px] text-amber-300 animate-spin">
                  ⚙️
                </div>
              </div>
            </div>

            {/* Letter Carriage Slots */}
            {roundData.currentWord.letters.map((targetChar, slotIndex) => {
              const placedChar = placedLetters[slotIndex];
              const isFilled = Boolean(placedChar);
              const isCurrentTargetSlot = slotIndex === placedLetters.length;

              return (
                <div key={`slot-${slotIndex}`} className="flex flex-col items-center relative select-none">
                  {/* Carriage Hitch connector */}
                  <div className="w-2.5 h-1.5 bg-slate-500 mb-1" />

                  {/* Wagon Carriage Box */}
                  <div
                    className={`w-18 sm:w-22 h-20 sm:h-24 rounded-2xl flex flex-col items-center justify-center border-2 transition-all duration-300 relative shadow-lg ${
                      isFilled
                        ? "bg-gradient-to-b from-emerald-500 to-teal-600 border-emerald-300 text-white animate-in zoom-in"
                        : isCurrentTargetSlot
                        ? "bg-indigo-900/60 border-amber-400 border-dashed text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.3)]"
                        : "bg-slate-800/60 border-slate-700 border-dashed text-slate-500"
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl font-black">
                      {isFilled ? placedChar : isCurrentTargetSlot ? "?" : ""}
                    </span>

                    <span className="text-[9px] uppercase font-bold opacity-75 mt-0.5">
                      {isFilled ? (
                        <CheckCircle2 className="w-3 h-3 text-amber-300 inline" />
                      ) : (
                        `বগি ${slotIndex + 1}`
                      )}
                    </span>
                  </div>

                  {/* Carriage wheels */}
                  <div className="flex justify-around w-full mt-1">
                    <div className="w-5 h-5 bg-slate-800 rounded-full border-2 border-slate-400 flex items-center justify-center text-[8px] text-slate-300">
                      ●
                    </div>
                    <div className="w-5 h-5 bg-slate-800 rounded-full border-2 border-slate-400 flex items-center justify-center text-[8px] text-slate-300">
                      ●
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Railway Tracks Ground Line */}
          <div className="w-full max-w-xl mx-auto mt-1 flex flex-col items-center">
            {/* Rails */}
            <div className="w-full h-1 bg-amber-500/80 rounded-full shadow-[0_0_6px_#f59e0b]" />
            {/* Wooden Sleepers */}
            <div className="w-full flex justify-between px-2 -mt-1.5">
              {[...Array(14)].map((_, i) => (
                <div key={i} className="w-2.5 h-3 bg-amber-900 rounded-xs border-t border-amber-700" />
              ))}
            </div>
            <div className="w-full h-1 bg-amber-500/80 rounded-full mt-0.5" />
          </div>
        </div>

        {/* Completion Celebration Overlay in Train Station */}
        {isCompleted && (
          <div className="my-3 p-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl border-2 border-emerald-400 shadow-xl text-center animate-in zoom-in duration-300 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎉</span>
              <div className="text-left">
                <h4 className="font-black text-base text-amber-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>
                    {isEng
                      ? `Word Complete: ${roundData.currentWord.word}!`
                      : `শব্দ তৈরি সম্পন্ন: ${roundData.currentWord.word}!`}
                  </span>
                </h4>
                <p className="text-xs text-emerald-100 font-medium">
                  {isEng ? "+15 Stars Earned! Next word is arriving..." : "+১৫ স্টার যোগ হয়েছে! নতুন শব্দ আসছে..."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => initRound(difficulty)}
              className="px-4 py-2 bg-white text-emerald-900 font-black text-xs rounded-xl shadow-md hover:bg-emerald-50 transition-all flex items-center gap-1.5"
            >
              <span>{isEng ? "Next Word Now" : "পরবর্তী শব্দ"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 🧩 LETTER WAGONS POOL (Touch/Click to Assemble) */}
      <div className="bg-gradient-to-b from-slate-50 to-indigo-50/50 rounded-3xl p-5 border-2 border-indigo-200 shadow-sm">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-indigo-100">
          <div className="flex items-center gap-2">
            <Train className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-extrabold text-slate-900">
              {isEng ? "Tap Letters to Attach Carriages:" : "বর্ণ স্পর্শ করে বগিতে জোড়া লাগাও:"}
            </h3>
          </div>
          <span className="text-xs font-bold text-indigo-700">
            {placedLetters.length} / {roundData.currentWord.letters.length} {isEng ? "Placed" : "যুক্ত হয়েছে"}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-3">
          {availableWagons.map((wagon) => {
            const isWobbling = wobblingWagonId === wagon.uid;
            const styleColor = CARRIAGE_COLORS[wagon.colorIdx];

            return (
              <button
                key={wagon.uid}
                type="button"
                onClick={() => handleWagonClick(wagon)}
                disabled={wagon.isUsed || isCompleted}
                className={`w-14 h-16 sm:w-16 sm:h-18 rounded-2xl border-2 font-black text-2xl sm:text-3xl flex flex-col items-center justify-center transition-all duration-200 select-none touch-manipulation shadow-md ${
                  wagon.isUsed
                    ? "opacity-20 scale-90 border-slate-300 bg-slate-100 pointer-events-none"
                    : isWobbling
                    ? "animate-shake bg-rose-500 text-white border-rose-300 scale-105"
                    : `bg-gradient-to-b ${styleColor} hover:scale-110 active:scale-95 cursor-pointer`
                }`}
                aria-label={`অক্ষর ${wagon.char}`}
              >
                <span>{wagon.char}</span>
                <span className="text-[9px] opacity-60 font-medium">🚂</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
