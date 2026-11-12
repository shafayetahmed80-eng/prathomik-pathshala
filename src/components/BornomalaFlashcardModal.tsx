"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, Play, Pause, ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { BornomalaItem } from "@/data/bornomalaData";
import { EnglishAlphabetItem } from "@/data/englishAlphabetData";
import { safeSpeak, stopSpeech, unlockMobileAudio } from "@/utils/mobileSpeech";
import { playPopSound } from "@/utils/bornomalaAudio";

interface Props {
  items: (BornomalaItem | EnglishAlphabetItem)[];
  isOpen: boolean;
  onClose: () => void;
  languageMode?: "bangla" | "english";
  teacherVoice?: "nabanita" | "pradeep" | "ana" | "guy";
}

export default function BornomalaFlashcardModal({
  items,
  isOpen,
  onClose,
  languageMode = "bangla",
  teacherVoice,
}: Props) {
  const [index, setIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const advanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const safeLength = Math.max(1, items.length);
  const safeIndex = index >= safeLength ? 0 : index;
  const currentItem = items[safeIndex] || items[0];
  const isEng = languageMode === "english" || (currentItem && (/[a-zA-Z]/.test(currentItem.char) || ("upperChar" in currentItem)));
  const isNum = currentItem?.type === "number";

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  const handleClose = useCallback(() => {
    clearAdvanceTimer();
    setIsPlaying(false);
    stopSpeech();
    onClose();
  }, [clearAdvanceTimer, onClose]);

  const handleSpeakCurrent = useCallback(
    (item: BornomalaItem | EnglishAlphabetItem, onFinish?: () => void) => {
      const itemIsEng = /[a-zA-Z]/.test(item.char) || ("upperChar" in item);
      let text = item.speechPrompt;
      if (!text) {
        if (itemIsEng) {
          text =
            item.type === "number"
              ? `${item.name}. ${item.word}. ${item.rhyme}`
              : `Letter ${item.char}. ${item.char} is for ${item.word}. ${item.rhyme}`;
        } else {
          text = `${item.name}। ${item.char}-তে ${item.word}। ${item.rhyme}`;
        }
      }

      const resolvedVoice = itemIsEng
        ? teacherVoice === "guy" || teacherVoice === "pradeep"
          ? "guy"
          : "ana"
        : teacherVoice === "pradeep" || teacherVoice === "guy"
          ? "pradeep"
          : "nabanita";

      safeSpeak(text, {
        lang: itemIsEng ? "en-US" : "bn-BD",
        voice: resolvedVoice,
        rate: itemIsEng ? 0.88 : 0.85,
        onEnd: () => onFinish?.(),
        onError: () => onFinish?.(),
      });
    },
    [teacherVoice]
  );

  // Autoplay loop synchronized with speech ending
  useEffect(() => {
    if (!isOpen || !isPlaying || !currentItem) {
      clearAdvanceTimer();
      stopSpeech();
      return;
    }

    handleSpeakCurrent(currentItem, () => {
      // Pause for 1.4s after teacher speech finishes before switching to next card
      clearAdvanceTimer();
      advanceTimerRef.current = setTimeout(() => {
        setIndex((prev) => (prev + 1) % safeLength);
      }, 1400);
    });

    return () => {
      clearAdvanceTimer();
    };
  }, [isPlaying, safeIndex, isOpen, safeLength, currentItem, handleSpeakCurrent, clearAdvanceTimer]);

  const handleNext = useCallback(() => {
    playPopSound();
    unlockMobileAudio({ primeSilent: true });
    clearAdvanceTimer();
    stopSpeech();
    const nextIdx = (safeIndex + 1) % safeLength;
    setIndex(nextIdx);
    if (!isPlaying && items[nextIdx]) {
      handleSpeakCurrent(items[nextIdx]);
    }
  }, [clearAdvanceTimer, handleSpeakCurrent, isPlaying, items, safeIndex, safeLength]);

  const handlePrev = useCallback(() => {
    playPopSound();
    unlockMobileAudio({ primeSilent: true });
    clearAdvanceTimer();
    stopSpeech();
    const prevIdx = (safeIndex - 1 + safeLength) % safeLength;
    setIndex(prevIdx);
    if (!isPlaying && items[prevIdx]) {
      handleSpeakCurrent(items[prevIdx]);
    }
  }, [clearAdvanceTimer, handleSpeakCurrent, isPlaying, items, safeIndex, safeLength]);

  // Keyboard navigation listeners: Escape to close, Arrows to flip, Space to speak
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === "input" || targetTag === "textarea") return;

      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        if (currentItem) {
          playPopSound();
          unlockMobileAudio({ primeSilent: true });
          handleSpeakCurrent(currentItem);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose, handleNext, handlePrev, currentItem, handleSpeakCurrent]);

  if (!isOpen || !currentItem) return null;

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-pink-200 overflow-hidden flex flex-col my-auto relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="flashcard-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-pink-50">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎴</span>
            <h3 id="flashcard-title" className="text-sm sm:text-base font-black text-slate-900">
              ক্লাসরুম ফ্ল্যাশ কার্ড মোড ({safeIndex + 1}/{items.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Interactive Card Body */}
        <div className="p-8 sm:p-12 text-center space-y-6 bg-gradient-to-b from-white via-pink-50/30 to-purple-50/30">
          <div className="flex items-center justify-center gap-6 sm:gap-10">
            <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-3xl bg-pink-600 text-white flex items-center justify-center text-6xl sm:text-8xl font-black shadow-xl shadow-pink-500/20 border-4 border-pink-300">
              {isEng && "displayPair" in currentItem ? (currentItem as EnglishAlphabetItem).displayPair : currentItem.char}
            </div>
            <div className="text-7xl sm:text-9xl p-4 bg-white rounded-3xl shadow-lg border border-pink-100 animate-bounce duration-1000">
              {currentItem.imageEmoji}
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-block px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-bold">
              {currentItem.matraLabel || currentItem.type}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900">
              {isEng
                ? isNum
                  ? `${currentItem.char} — ${currentItem.word}`
                  : `${currentItem.char} is for ${currentItem.word}`
                : isNum
                ? `${currentItem.char} — ${currentItem.word}`
                : `${currentItem.char}-তে ${currentItem.word}`}
            </h2>
            {isEng && "wordMeaningBn" in currentItem && (
              <p className="text-sm font-bold text-slate-600">
                বাংলা অর্থ: {(currentItem as EnglishAlphabetItem).wordMeaningBn}
              </p>
            )}
            <p className="text-base sm:text-xl font-bold text-pink-800 max-w-md mx-auto">
              &quot;{currentItem.rhyme}&quot;
            </p>
            {isEng && "rhymeBn" in currentItem && (
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                {(currentItem as EnglishAlphabetItem).rhymeBn}
              </p>
            )}
            {"breakdown" in currentItem && currentItem.breakdown && (
              <p className="text-sm font-semibold text-purple-700 bg-purple-50 py-1.5 px-3 rounded-xl inline-block">
                গঠন: {(currentItem as BornomalaItem).breakdown}
              </p>
            )}
          </div>

          {/* Audio Button */}
          <div>
            <button
              type="button"
              onClick={() => {
                unlockMobileAudio({ primeSilent: true });
                handleSpeakCurrent(currentItem);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
            >
              <Volume2 className="w-5 h-5" />
              <span>উচ্চারণ ও ছড়া শোনো</span>
            </button>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={handlePrev}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs sm:text-sm font-bold shadow-xs transition-all"
            title="আগের বর্ণ (কিবোর্ড: ⬅️)"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>আগের বর্ণ</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playPopSound();
                unlockMobileAudio({ primeSilent: true });
                setIsPlaying(!isPlaying);
              }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all ${
                isPlaying
                  ? "bg-amber-500 text-white animate-pulse"
                  : "bg-slate-800 hover:bg-slate-900 text-white"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>বিরতি দাও</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>অটোপ্লে (স্মার্টবোর্ড)</span>
                </>
              )}
            </button>
            <span className="text-[11px] font-medium text-slate-400 hidden md:inline-block">
              কিবোর্ড: ⬅️ ➡️ • Space উচ্চারণ
            </span>
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs sm:text-sm font-bold shadow-xs transition-all"
            title="পরের বর্ণ (কিবোর্ড: ➡️)"
          >
            <span>পরের বর্ণ</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
