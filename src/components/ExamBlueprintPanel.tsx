"use client";

import React, { useState } from "react";
import { 
  ExamBlueprintConfig, 
  CategoryBlueprintConfig,
  SeenBlueprintConfig
} from "@/data/examQuestions";
import { 
  PRESET_OPTIONS, 
  PresetType, 
  calculateBlueprintTotal,
  calculateSeenMarks,
  CategoryGroup
} from "@/data/blueprintConfig";
import { getPassagesForSubject } from "@/data/seenPassages";
import { 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  RotateCcw, 
  Plus, 
  Minus, 
  CheckSquare, 
  Square,
  BookOpen,
  Calculator,
  Compass,
  FileCheck2,
  Layers
} from "lucide-react";

interface ExamBlueprintPanelProps {
  blueprint: ExamBlueprintConfig;
  onChange: (updatedBlueprint: ExamBlueprintConfig) => void;
  selectedPreset: PresetType;
  onSelectPreset: (preset: PresetType) => void;
  onGenerate: () => void;
  classId: string;
  subjectKey: string;
  seenConfig?: SeenBlueprintConfig;
  onSeenConfigChange?: (updated: SeenBlueprintConfig) => void;
}

export default function ExamBlueprintPanel({
  blueprint,
  onChange,
  selectedPreset,
  onSelectPreset,
  onGenerate,
  classId,
  subjectKey,
  seenConfig,
  onSeenConfigChange
}: ExamBlueprintPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | CategoryGroup>("all");

  const { totalQuestions, totalMarks } = calculateBlueprintTotal(blueprint, seenConfig);

  const availablePassages = getPassagesForSubject(classId, subjectKey);
  const isSeenApplicable = (subjectKey === "english" || subjectKey === "bangla") && availablePassages.length > 0;
  const seenMarksData = calculateSeenMarks(seenConfig);

  const handleToggleSeen = () => {
    if (!seenConfig || !onSeenConfigChange) return;
    onSeenConfigChange({
      ...seenConfig,
      enabled: !seenConfig.enabled
    });
  };

  const handlePassageSelect = (passageId: string) => {
    if (!seenConfig || !onSeenConfigChange) return;
    onSeenConfigChange({
      ...seenConfig,
      passageId
    });
  };

  const handleSeenSubCount = (key: "mcqCount" | "fillCount" | "trueFalseCount" | "shortCount", delta: number) => {
    if (!seenConfig || !onSeenConfigChange) return;
    const current = seenConfig.subQuestions[key];
    const nextVal = Math.max(0, current + delta);
    onSeenConfigChange({
      ...seenConfig,
      subQuestions: {
        ...seenConfig.subQuestions,
        [key]: nextVal
      }
    });
  };

  const handleSeenSubMarks = (key: "mcqMarks" | "fillMarks" | "trueFalseMarks" | "shortMarks", val: number) => {
    if (!seenConfig || !onSeenConfigChange) return;
    const safeMarks = Math.max(0.5, Math.min(10, val));
    onSeenConfigChange({
      ...seenConfig,
      subQuestions: {
        ...seenConfig.subQuestions,
        [key]: safeMarks
      }
    });
  };

  const handleToggleCategory = (key: string) => {
    const current = blueprint[key];
    if (!current) return;
    const nextEnabled = !current.enabled;
    const nextCount = nextEnabled && current.count === 0 ? 5 : current.count;
    
    onChange({
      ...blueprint,
      [key]: {
        ...current,
        enabled: nextEnabled,
        count: nextCount
      }
    });
  };

  const handleCountChange = (key: string, delta: number) => {
    const current = blueprint[key];
    if (!current) return;
    const nextCount = Math.max(0, current.count + delta);
    onChange({
      ...blueprint,
      [key]: {
        ...current,
        count: nextCount,
        enabled: nextCount > 0 ? true : current.enabled
      }
    });
  };

  const handleMarksChange = (key: string, newMarks: number) => {
    const current = blueprint[key];
    if (!current) return;
    const safeMarks = Math.max(0.5, Math.min(20, newMarks));
    onChange({
      ...blueprint,
      [key]: {
        ...current,
        marksPerQuestion: safeMarks
      }
    });
  };

  // Filter categories applicable to the current subject and selected group
  const allCategories = Object.values(blueprint);
  const filteredCategories = activeTab === "all" 
    ? allCategories 
    : allCategories.filter(cat => cat.group === activeTab);

  // Group counts for tabs
  const groupCounts = {
    all: allCategories.length,
    core: allCategories.filter(c => c.group === "core").length,
    language: allCategories.filter(c => c.group === "language").length,
    math: allCategories.filter(c => c.group === "math").length,
    science: allCategories.filter(c => c.group === "science").length
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs print:hidden overflow-hidden transition-all duration-300 mb-5">
      {/* Header Bar */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-slate-50 via-emerald-50/40 to-teal-50/30 border-b border-slate-200/80 flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-800">
                ডাইনামিক প্রশ্ন কাঠামো ও নম্বর বিন্যাস
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                {allCategories.length}টি ক্যাটাগরি উপলব্ধ
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              প্রশ্নের সংখ্যা, প্রতি প্রশ্নের নম্বর ও যেকোনো ক্যাটাগরি ইচ্ছামতো যুক্ত বা পরিবর্তন করুন
            </p>
          </div>
        </div>

        {/* Live Badges and Toggle Button */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold flex items-center gap-1.5">
              <span className="text-[11px] text-sky-600 font-medium hidden xs:inline">মোট প্রশ্ন:</span>
              <span className="font-black text-sky-900">{totalQuestions}টি</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
              <span className="text-[11px] text-emerald-600 font-medium hidden xs:inline">পূর্ণমান:</span>
              <span className="font-black text-emerald-900">{totalMarks} নম্বর</span>
            </div>
          </div>
          
          <button 
            type="button"
            className="p-1.5 rounded-lg hover:bg-slate-200/60 text-slate-500 transition-colors"
            aria-label={isOpen ? "কন্ট্রোলার সংকুচিত করুন" : "কন্ট্রোলার প্রসারিত করুন"}
          >
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-4 sm:p-6 space-y-5">
          {/* Preset Buttons */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              আদর্শ প্রিসেট সিলেক্ট করুন (১-ক্লিকে রেডি ফরম্যাট)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {PRESET_OPTIONS.map((opt) => {
                const isSelected = selectedPreset === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onSelectPreset(opt.id)}
                    className={`px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-emerald-600 border-emerald-700 text-white shadow-xs ring-2 ring-emerald-500/30"
                        : "bg-slate-50/80 hover:bg-slate-100/80 border-slate-200 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-xs">{opt.label}</span>
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                        isSelected ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-900"
                      }`}>
                        {opt.id === "nctb_summative" 
                          ? (classId === "pre-primary" || classId === "class-1" || classId === "class-2" ? "৫০ নম্বর" : "৭০ নম্বর")
                          : opt.marksBadge}
                      </span>
                    </div>
                    <span className={`text-[10px] line-clamp-1 ${
                      isSelected ? "text-emerald-100" : "text-slate-500"
                    }`}>
                      {opt.subLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 📖 Seen Comprehension (পাঠ্যাংশ ভিত্তিক সমন্বিত মূল্যায়ন) Card */}
          {isSeenApplicable && seenConfig && (
            <div className={`rounded-2xl border-2 transition-all p-4 sm:p-5 ${
              seenConfig.enabled 
                ? "bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border-amber-400 shadow-xs ring-1 ring-amber-400/30" 
                : "bg-slate-50 border-slate-200 opacity-80"
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/60">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleToggleSeen}
                    className="p-1 rounded text-amber-700 hover:text-amber-800 focus:outline-none cursor-pointer"
                  >
                    {seenConfig.enabled ? (
                      <CheckSquare className="w-5 h-5 text-amber-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base">📖</span>
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                        {subjectKey === "bangla"
                          ? "পাঠ্যবইয়ের পাঠ্যাংশ বা অনুচ্ছেদভিত্তিক মূল্যায়ন"
                          : "SEEN COMPREHENSION (পাঠ্যবইয়ের পাঠ্যাংশ)"}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                        {subjectKey === "bangla" ? "ক - বিভাগ" : "PART - A"} • {seenMarksData.totalMarks} নম্বর
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {subjectKey === "bangla"
                        ? "পাঠ্যবইয়ের গল্প বা অনুচ্ছেদের আলোকে ১ (MCQ), ২ (শূন্যস্থান), ৩ (সত্য/মিথ্যা), ৪ (প্রশ্নোত্তর) স্বয়ংক্রিয়ভাবে তৈরি হবে"
                        : "পাঠ্যবইয়ের প্যাসেজের আলোকে ১ (MCQ), ২ (Fill in blanks), ৩ (True/False), ৪ (Short Questions) তৈরি হবে"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={handleToggleSeen}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      seenConfig.enabled
                        ? "bg-amber-600 text-white shadow-xs hover:bg-amber-700"
                        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    {seenConfig.enabled ? "✓ চালু আছে" : "চালু করুন"}
                  </button>
                </div>
              </div>

              {seenConfig.enabled && (
                <div className="pt-4 space-y-4">
                  {/* Passage Selector */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white/90 p-3 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                      <label htmlFor="seen-passage-select" className="text-xs font-bold text-slate-800">
                        পাঠ্যবইয়ের প্যাসেজ নির্বাচন:
                      </label>
                    </div>
                    <select
                      id="seen-passage-select"
                      value={seenConfig.passageId}
                      onChange={(e) => handlePassageSelect(e.target.value)}
                      className="text-xs sm:text-sm font-semibold p-2 border border-amber-300 rounded-lg bg-amber-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 max-w-full sm:max-w-md"
                    >
                      <option value="auto">✨ স্বয়ংক্রিয় নির্বাচন (Auto - নির্বাচিত ইউনিট/লেসন অনুযায়ী)</option>
                      {availablePassages.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.unitTitle} • {p.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 4 Sub-questions Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {/* 1. MCQ */}
                    <div className="p-2.5 bg-white rounded-xl border border-amber-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>১. MCQ (টিক চিহ্ন)</span>
                        <span className="text-amber-700 font-black">
                          {seenConfig.subQuestions.mcqCount * seenConfig.subQuestions.mcqMarks} নম্বর
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleSeenSubCount("mcqCount", -1)}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-bold text-slate-800">{seenConfig.subQuestions.mcqCount}টি</span>
                          <button
                            type="button"
                            onClick={() => handleSeenSubCount("mcqCount", 1)}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <span>মান:</span>
                          <input
                            type="number"
                            min="0.5"
                            max="5"
                            step="0.5"
                            value={seenConfig.subQuestions.mcqMarks}
                            onChange={(e) => handleSeenSubMarks("mcqMarks", parseFloat(e.target.value) || 1)}
                            className="w-10 text-center font-bold p-0.5 border border-slate-300 rounded bg-slate-50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 2. Fill in the blanks */}
                    <div className="p-2.5 bg-white rounded-xl border border-amber-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>২. ক্লু সহ শূন্যস্থান</span>
                        <span className="text-amber-700 font-black">
                          {seenConfig.subQuestions.fillCount * seenConfig.subQuestions.fillMarks} নম্বর
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleSeenSubCount("fillCount", -1)}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-bold text-slate-800">{seenConfig.subQuestions.fillCount}টি</span>
                          <button
                            type="button"
                            onClick={() => handleSeenSubCount("fillCount", 1)}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <span>মান:</span>
                          <input
                            type="number"
                            min="0.5"
                            max="5"
                            step="0.5"
                            value={seenConfig.subQuestions.fillMarks}
                            onChange={(e) => handleSeenSubMarks("fillMarks", parseFloat(e.target.value) || 1)}
                            className="w-10 text-center font-bold p-0.5 border border-slate-300 rounded bg-slate-50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 3. True / False */}
                    <div className="p-2.5 bg-white rounded-xl border border-amber-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>৩. সত্য বা মিথ্যা</span>
                        <span className="text-amber-700 font-black">
                          {seenConfig.subQuestions.trueFalseCount * seenConfig.subQuestions.trueFalseMarks} নম্বর
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleSeenSubCount("trueFalseCount", -1)}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-bold text-slate-800">{seenConfig.subQuestions.trueFalseCount}টি</span>
                          <button
                            type="button"
                            onClick={() => handleSeenSubCount("trueFalseCount", 1)}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <span>মান:</span>
                          <input
                            type="number"
                            min="0.5"
                            max="5"
                            step="0.5"
                            value={seenConfig.subQuestions.trueFalseMarks}
                            onChange={(e) => handleSeenSubMarks("trueFalseMarks", parseFloat(e.target.value) || 1)}
                            className="w-10 text-center font-bold p-0.5 border border-slate-300 rounded bg-slate-50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 4. Short Answer Questions */}
                    <div className="p-2.5 bg-white rounded-xl border border-amber-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>৪. সংক্ষিপ্ত প্রশ্নোত্তর</span>
                        <span className="text-amber-700 font-black">
                          {seenConfig.subQuestions.shortCount * seenConfig.subQuestions.shortMarks} নম্বর
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleSeenSubCount("shortCount", -1)}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-bold text-slate-800">{seenConfig.subQuestions.shortCount}টি</span>
                          <button
                            type="button"
                            onClick={() => handleSeenSubCount("shortCount", 1)}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <span>মান:</span>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            step="0.5"
                            value={seenConfig.subQuestions.shortMarks}
                            onChange={(e) => handleSeenSubMarks("shortMarks", parseFloat(e.target.value) || 2)}
                            className="w-10 text-center font-bold p-0.5 border border-slate-300 rounded bg-slate-50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Group Filter Tabs (for easy category navigation) */}
          <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-slate-800 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>সকল ক্যাটাগরি ({groupCounts.all})</span>
            </button>

            {groupCounts.core > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("core")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === "core"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800"
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>মৌলিক ক্যাটাগরি ({groupCounts.core})</span>
              </button>
            )}

            {groupCounts.language > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("language")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === "language"
                    ? "bg-sky-700 text-white shadow-xs"
                    : "bg-sky-50 hover:bg-sky-100 text-sky-800"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>ভাষা ও ব্যাকরণ ({groupCounts.language})</span>
              </button>
            )}

            {groupCounts.math > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("math")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === "math"
                    ? "bg-amber-700 text-white shadow-xs"
                    : "bg-amber-50 hover:bg-amber-100 text-amber-800"
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>গণিত বিশেষ ({groupCounts.math})</span>
              </button>
            )}

            {groupCounts.science > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("science")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === "science"
                    ? "bg-purple-700 text-white shadow-xs"
                    : "bg-purple-50 hover:bg-purple-100 text-purple-800"
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>বিজ্ঞান ও অনুসন্ধান ({groupCounts.science})</span>
              </button>
            )}
          </div>

          {/* Dynamic Categories Grid */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                ক্যাটাগরি ভিত্তিক প্রশ্ন সংখ্যা ও প্রতি প্রশ্নের মান
              </label>
              <span className="text-[11px] text-slate-500 font-medium">
                টিক চিহ্ন তুলে দিলে ওই ক্যাটাগরি বাদ পড়বে
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {filteredCategories.map((cat) => {
                const subtotal = cat.enabled ? cat.count * cat.marksPerQuestion : 0;
                return (
                  <div
                    key={cat.key}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      cat.enabled
                        ? "bg-white border-slate-300 shadow-2xs ring-1 ring-emerald-500/10"
                        : "bg-slate-50/70 border-slate-200 opacity-60"
                    }`}
                  >
                    {/* Left: Checkbox + Label */}
                    <div 
                      onClick={() => handleToggleCategory(cat.key)}
                      className="flex items-center gap-2.5 cursor-pointer select-none flex-1 min-w-0"
                    >
                      <button
                        type="button"
                        className="text-emerald-600 focus:outline-hidden"
                      >
                        {cat.enabled ? (
                          <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-50 shrink-0" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400 shrink-0" />
                        )}
                      </button>
                      <div className="truncate">
                        <span className={`text-xs font-bold block truncate ${
                          cat.enabled ? "text-slate-800" : "text-slate-500 line-through"
                        }`}>
                          {cat.label}
                        </span>
                        {cat.description && (
                          <span className="text-[10px] text-slate-500 block truncate" title={cat.description}>
                            {cat.description}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Steppers + Marks Input + Subtotal */}
                    {cat.enabled && (
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Questions Count Stepper */}
                        <div className="flex items-center bg-slate-100 rounded-lg border border-slate-200 p-0.5">
                          <button
                            type="button"
                            onClick={() => handleCountChange(cat.key, -1)}
                            className="w-5 h-5 rounded flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
                            title="১টি কমান"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-black text-xs text-slate-800">
                            {cat.count}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCountChange(cat.key, 1)}
                            className="w-5 h-5 rounded flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
                            title="১টি বাড়ান"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Marks Per Question */}
                        <div className="flex items-center gap-0.5">
                          <span className="text-slate-400 text-xs">×</span>
                          <input
                            type="number"
                            min="0.5"
                            max="20"
                            step="0.5"
                            value={cat.marksPerQuestion}
                            onChange={(e) => handleMarksChange(cat.key, parseFloat(e.target.value) || 1)}
                            className="w-10 h-6 px-1 text-center text-xs font-bold rounded-md border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:border-emerald-500"
                            title="প্রতি প্রশ্নের নম্বর"
                          />
                        </div>

                        {/* Subtotal */}
                        <div className="w-10 text-right">
                          <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">
                            ={subtotal}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                বর্তমানে নির্বাচিত: <strong>{totalQuestions}টি প্রশ্ন</strong>, সর্বমোট পূর্ণমান <strong>{totalMarks} নম্বর</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectPreset("nctb_summative")}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ডিফল্ট রিসেট</span>
              </button>

              <button
                type="button"
                onClick={onGenerate}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer hover:shadow-emerald-600/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>এই ব্লুপ্রিন্টে প্রশ্নপত্র তৈরি করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
