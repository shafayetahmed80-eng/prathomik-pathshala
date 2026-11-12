"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Printer, X } from "lucide-react";
import { BornomalaItem } from "@/data/bornomalaData";
import { EnglishAlphabetItem, EnglishCaseType } from "@/data/englishAlphabetData";

interface Props {
  item: BornomalaItem | EnglishAlphabetItem;
  isOpen: boolean;
  onClose: () => void;
  languageMode?: "bangla" | "english";
  englishCase?: EnglishCaseType;
}

interface RuledCellProps {
  isEng: boolean;
  isNumber?: boolean;
  char?: string;
}

/**
 * Shared 4-line (English) / 3-line (Bangla) primary ruled cell.
 * Uses separated SVG layers so horizontal rules span 100% width while
 * traceable dotted glyphs snap cleanly to the baseline without distortion.
 */
function RuledTracingCell({ isEng, isNumber = false, char }: RuledCellProps) {
  const isCombiningKar = Boolean(char && /^[\u09BE-\u09CC\u09D7]$/.test(char));
  // Single Bengali conjuncts like ক্ষ, জ্ঞ, হ্ম have UTF-16 length 3 even though they occupy 1 glyph cell.
  const is3DigitNumber = Boolean(char && isNumber && char.length >= 3);
  const isWideChar = Boolean(char && ((isEng && char.length >= 2) || (isNumber && char.length >= 2) || isCombiningKar));
  const engFontSize = is3DigitNumber ? 38 : isWideChar ? 48 : 62;
  const bnFontSize = is3DigitNumber ? 36 : isWideChar ? 44 : 58;
  const displayChar = isCombiningKar ? `\u25CC${char}` : char;

  return (
    <div
      className={`h-[76px] sm:h-20 rounded-lg border border-slate-200 relative overflow-hidden ${
        char ? "bg-slate-50/40" : "bg-white"
      }`}
    >
      {/* Background Ruled Guidelines */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }}
      >
        {isEng ? (
          <>
            {/* Middle zone soft sky highlight between Waistline (34%) and Baseline (68%) */}
            <rect x="0" y="34" width="100" height="34" fill="rgba(224, 242, 254, 0.55)" />
            <line x1="0" y1="18" x2="100" y2="18" stroke="#f43f5e" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
            <line x1="0" y1="34" x2="100" y2="34" stroke="#0284c7" strokeWidth="1.3" strokeDasharray="4 3" vectorEffect="non-scaling-stroke" />
            <line x1="0" y1="68" x2="100" y2="68" stroke="#312e81" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
            <line x1="0" y1="86" x2="100" y2="86" stroke="#f43f5e" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
          </>
        ) : (
          <>
            <line x1="0" y1="22" x2="100" y2="22" stroke="#fda4af" strokeWidth="1.5" strokeDasharray="5 3" vectorEffect="non-scaling-stroke" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#7dd3fc" strokeWidth="1.2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
            <line x1="0" y1="78" x2="100" y2="78" stroke="#fda4af" strokeWidth="1.5" strokeDasharray="5 3" vectorEffect="non-scaling-stroke" />
          </>
        )}
      </svg>

      {/* Foreground Dotted Traceable Letter */}
      {char && (
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          className="relative z-10 w-full h-full pointer-events-none select-none"
        >
          <text
            x="50"
            y={isEng ? 68 : 52}
            textAnchor="middle"
            dominantBaseline={isEng ? "alphabetic" : "central"}
            fontSize={isEng ? engFontSize : bnFontSize}
            fontWeight="800"
            fontFamily={
              isEng
                ? "'Comic Sans MS', 'Nunito', 'Fredoka', Arial, sans-serif"
                : "'Hind Siliguri', 'Noto Sans Bengali', sans-serif"
            }
            fill="#f1f5f9"
            stroke="#64748b"
            strokeWidth="1.6"
            strokeDasharray="2.5 2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ paintOrder: "stroke fill" }}
          >
            {displayChar}
          </text>
        </svg>
      )}
    </div>
  );
}

export default function BornomalaWorksheetModal({
  item,
  isOpen,
  onClose,
  languageMode = "bangla",
  englishCase = "upper",
}: Props) {
  const printAreaRef = useRef<HTMLDivElement>(null);
  const [overrideCase, setOverrideCase] = useState<{
    baseCase: EnglishCaseType;
    itemId: string;
    value: EnglishCaseType;
  } | null>(null);

  const worksheetCase: EnglishCaseType =
    overrideCase && overrideCase.baseCase === englishCase && overrideCase.itemId === item.id
      ? overrideCase.value
      : englishCase;

  const handleClose = useCallback(() => {
    setOverrideCase(null);
    onClose();
  }, [onClose]);

  // Keyboard Escape listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const isNumber = item.type === "number";
  const isEng =
    languageMode === "english" ||
    "upperChar" in item ||
    /[a-zA-Z]/.test(item.char);
  const engItem = isEng && "upperChar" in item ? (item as EnglishAlphabetItem) : null;

  const activeChar = (() => {
    if (isEng && engItem) {
      if (isNumber) return engItem.char;
      if (worksheetCase === "lower") return engItem.lowerChar;
      if (worksheetCase === "pair") return engItem.displayPair;
      return engItem.upperChar;
    }
    return item.char;
  })();

  const activeStrokeGuide = (() => {
    if (isEng && engItem) {
      if (isNumber) return engItem.strokeGuideUpper;
      if (worksheetCase === "lower") return engItem.strokeGuideLower;
      if (worksheetCase === "pair") return `${engItem.strokeGuideUpper} | ${engItem.strokeGuideLower}`;
      return engItem.strokeGuideUpper;
    }
    return item.strokeGuide;
  })();

  const caseBadgeLabel = (() => {
    if (!isEng) return item.matraLabel || item.name;
    if (isNumber) return item.matraLabel || "Number (সংখ্যা)";
    if (worksheetCase === "lower") return "Lowercase (ছোট হাতের)";
    if (worksheetCase === "pair") return "Capital & Small Pair";
    return "Uppercase (বড় হাতের)";
  })();

  const heroTitle = (() => {
    if (isEng) {
      return isNumber ? `${activeChar} — ${item.word}` : `${activeChar} is for ${item.word}`;
    }
    return isNumber ? `${item.char} — ${item.word}` : `${item.char}-তে ${item.word}`;
  })();

  const spellingTargetWord =
    isEng && !isNumber && worksheetCase === "lower" ? item.word.toLowerCase() : item.word;
  const spellingLeadChar =
    isEng && engItem && !isNumber
      ? worksheetCase === "lower"
        ? engItem.lowerChar
        : engItem.upperChar
      : item.char;

  const handlePrint = () => {
    const originalTitle = document.title;
    const safeChar = (activeChar || item.char || "বর্ণ").trim().replace(/[\\/:*?"<>|]/g, "_");
    document.title = isEng
      ? `Worksheet_${safeChar}_Prathomik_Pathshala`
      : `ওয়ার্কশিট_${safeChar}_প্রাথমিক_পাঠশালা`;

    const restoreTitle = () => {
      document.title = originalTitle;
      window.removeEventListener("afterprint", restoreTitle);
    };
    window.addEventListener("afterprint", restoreTitle);
    setTimeout(restoreTitle, 2500);

    window.print();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:overflow-visible my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="worksheet-title"
      >
        {/* Modal Controls Header (Hidden in Print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-200 bg-slate-50 print:hidden shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-lg font-bold">
              🖨️
            </div>
            <div>
              <h3 id="worksheet-title" className="text-base sm:text-lg font-black text-slate-900">
                {isEng
                  ? "ইংরেজি বর্ণমালা ও সংখ্যা অনুশীলন ওয়ার্কশিট"
                  : "হাতেখড়ি অনুশীলন ওয়ার্কশিট (A4 Printable)"}
              </h3>
              <p className="text-xs text-slate-500">
                {isEng
                  ? `'${activeChar}' অনুশীলনের জন্য ৪-লাইন প্রিন্ট-রেডি ওয়ার্কশিট`
                  : `'${activeChar}' বর্ণের জন্য অফলাইন প্রিন্ট-রেডি হোমওয়ার্ক শিট`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {isEng && !isNumber && engItem && (
              <div className="flex items-center bg-slate-200 p-0.5 rounded-xl text-xs font-bold">
                {(
                  [
                    { id: "upper", label: engItem.upperChar },
                    { id: "lower", label: engItem.lowerChar },
                    { id: "pair", label: engItem.displayPair },
                  ] as const
                ).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() =>
                      setOverrideCase({
                        baseCase: englishCase,
                        itemId: item.id,
                        value: c.id,
                      })
                    }
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      worksheetCase === c.id
                        ? "bg-white text-pink-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট করুন</span>
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-200 transition-colors"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Sheet Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 print:bg-white print:p-0 print:overflow-visible">
          <div
            ref={printAreaRef}
            className="worksheet-print-area max-w-[210mm] mx-auto bg-white p-6 sm:p-10 border border-slate-300 shadow-md rounded-2xl print:border-none print:shadow-none print:p-8 print:max-w-none print:w-full print:rounded-none"
          >
            {/* Sheet Header */}
            <div className="border-b-2 border-slate-800 pb-4 mb-6">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span className="font-bold text-pink-700">প্রাথমিক পাঠশালা • স্মার্ট এডুকেশন</span>
                <span>{isEng ? "English for Today • Class 1" : "প্রাক-প্রাথমিক ও ১ম শ্রেণি"}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-center text-slate-900 tracking-wide">
                {isEng
                  ? "ইংরেজি হাতের লেখা ও সংখ্যা অনুশীলন খাতা (4-Line Copybook)"
                  : "বাংলা বর্ণমালা ও হাতেখড়ি অনুশীলন খাতা"}
              </h1>
              <p className="text-center text-xs text-slate-500 mt-1">
                জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) কারিকুলাম অনুসরণে
              </p>

              {/* Student Metadata Fields */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-slate-700 mt-5 pt-3 border-t border-dashed border-slate-300">
                <div className="border-b border-slate-400 pb-1">নাম: _______________</div>
                <div className="border-b border-slate-400 pb-1">শ্রেণি: _______________</div>
                <div className="border-b border-slate-400 pb-1">রোল: _______________</div>
                <div className="border-b border-slate-400 pb-1">তারিখ: _______________</div>
              </div>
            </div>

            {/* Big Hero Card: Character + Picture + Rhyme */}
            <div className="grid grid-cols-12 gap-4 items-center p-5 rounded-2xl border-2 border-pink-200 bg-pink-50/40 mb-6">
              <div className="col-span-4 text-center border-r-2 border-pink-200 pr-2">
                <span
                  className={`${
                    (isEng && activeChar.length >= 2) || (isNumber && activeChar.length >= 2)
                      ? "text-5xl sm:text-6xl"
                      : "text-6xl sm:text-7xl"
                  } font-black text-pink-600 block leading-none`}
                >
                  {activeChar}
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-pink-800 mt-2 inline-block px-2.5 py-0.5 rounded-full bg-pink-100">
                  {caseBadgeLabel}
                </span>
              </div>
              <div className="col-span-8 pl-2 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-4xl">{item.imageEmoji}</span>
                  <div>
                    <h2 className="text-lg font-black text-slate-900">{heroTitle}</h2>
                    <p className="text-xs font-medium text-slate-600">
                      {isEng && engItem
                        ? isNumber
                          ? `বাংলা অর্থ: ${engItem.wordMeaningBn} • বানান: ${engItem.name}`
                          : `বাংলা অর্থ: ${engItem.wordMeaningBn} • Phonics: /${engItem.pureSound}/`
                        : `উচ্চারণ: ${item.name}`}
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-bold text-pink-900 bg-white/80 p-2 rounded-xl border border-pink-200">
                  ছড়া: &quot;{item.rhyme}&quot;
                </p>
                {activeStrokeGuide && (
                  <p className="text-[11px] text-slate-600 italic">
                    ✏️ লেখার নিয়ম: {activeStrokeGuide}
                  </p>
                )}
              </div>
            </div>

            {/* Tracing Activity Rows */}
            <div className="space-y-5 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                  <span>অনুশীলন ১: ডটের ওপর হাত ঘোরাও (Trace on the dotted letters)</span>
                </h3>
                {isEng && (
                  <span className="text-[10px] font-bold text-sky-800 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                    ৪-লাইন গাইড: নীল ঘর = ছোট অক্ষর • লাল দাগ = শীর্ষ/নিচ
                  </span>
                )}
              </div>

              {/* Dotted Tracing Line */}
              <div className="border-2 border-slate-300 rounded-xl p-3 bg-white">
                <div className="grid grid-cols-4 sm:grid-cols-8 print:grid-cols-8 gap-2 text-center">
                  {[...Array(8)].map((_, i) => (
                    <RuledTracingCell key={`trace-${i}`} isEng={isEng} isNumber={isNumber} char={activeChar} />
                  ))}
                </div>
              </div>

              <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5 pt-2">
                <span>অনুশীলন ২: নিজে নিজে সুন্দর করে লেখো (Write independently)</span>
              </h3>

              {/* Free Writing Grid */}
              <div className="border-2 border-slate-300 rounded-xl p-3 bg-white">
                <div className="grid grid-cols-4 sm:grid-cols-8 print:grid-cols-8 gap-2 text-center">
                  {[...Array(8)].map((_, i) => (
                    <RuledTracingCell key={`blank-${i}`} isEng={isEng} isNumber={isNumber} />
                  ))}
                </div>
              </div>
            </div>

            {/* Word building / Number Spelling & Coloring challenge */}
            <div className="border border-slate-300 rounded-2xl p-4 bg-slate-50/60 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-700">
                  {isNumber
                    ? isEng
                      ? "সংখ্যা গণনা ও বানান (Count & Write in Words):"
                      : "সংখ্যা গণনা ও কথায় লেখো:"
                    : isEng
                    ? "শব্দ গঠন ও বানান (Word Spelling Practice):"
                    : "শব্দ গঠন ও বানান অনুশীলন:"}
                </h4>
                <div className="text-sm font-black text-slate-800 bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                  {isNumber ? (
                    <>
                      <div>
                        {activeChar} = {item.imageEmoji} ({item.word})
                      </div>
                      <div className="text-xs font-semibold text-slate-600">
                        {isEng ? "Write in words:" : "কথায় বানান করে লেখো:"} ______________
                      </div>
                    </>
                  ) : item.type === "karchinho" || item.type === "juktoborno" ? (
                    <div className="space-y-1 text-xs sm:text-sm">
                      <div>
                        {"breakdown" in item && item.breakdown ? item.breakdown : `${item.char} — ${item.word}`}
                      </div>
                      <div className="text-xs font-semibold text-slate-600">
                        {item.word} শব্দটি ২ বার দেখে লেখো: __________, __________
                      </div>
                    </div>
                  ) : spellingTargetWord.toLowerCase().startsWith(spellingLeadChar.toLowerCase()) ? (
                    <div>
                      {spellingTargetWord} = {spellingLeadChar} + ______
                    </div>
                  ) : (
                    <div className="space-y-1 text-xs sm:text-sm">
                      <div>
                        শব্দে &apos;{spellingLeadChar}&apos; বর্ণটি খুঁজে গোল দাগ দাও: {spellingTargetWord}
                      </div>
                      <div className="text-xs font-semibold text-slate-600">
                        বর্ণটি পাশে লেখো: ______
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-700">
                  {isEng ? "ছবি আঁকো বা রঙ করো (Draw or Color):" : "ছবি আঁকো বা রঙ করো:"}
                </h4>
                <div className="h-16 rounded-xl border border-dashed border-slate-300 bg-white flex items-center justify-center text-xs text-slate-400 font-medium px-2 text-center">
                  {isEng && engItem
                    ? `এখানে রঙ পেন্সিল দিয়ে ${item.word} (${engItem.wordMeaningBn}) আঁকো`
                    : `এখানে তোমার পছন্দমতো রঙ পেন্সিল দিয়ে ${item.word} আঁকো`}
                </div>
              </div>
            </div>

            {/* Teacher / Parent Evaluation Box */}
            <div className="border-t-2 border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-700 gap-3">
              <div className="flex items-center gap-2">
                <span className="font-bold">শিক্ষক/অভিভাবকের মূল্যায়ন:</span>
                <span className="inline-flex gap-1 text-amber-500 font-bold">
                  ⭐⭐⭐ (চমৎকার) / ⭐⭐ (ভালো) / ⭐ (চেষ্টা করো)
                </span>
              </div>
              <div className="font-semibold text-slate-500">স্বাক্ষর: ____________________</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
