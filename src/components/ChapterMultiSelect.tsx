"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Minus, BookOpen, ListChecks, Layers, RotateCcw } from "lucide-react";
import { ChapterTopic } from "@/data/curriculumTopics";
import { Button } from "@/components/ui";

export interface ChapterMultiSelectProps {
  chapters: ChapterTopic[];
  selectedIds: string[]; // empty means all chapters selected
  selectedLessonIds?: string[]; // empty means all lessons in selected chapters
  onChange: (chapterIds: string[], lessonIds: string[]) => void;
  label?: string;
  placeholder?: string;
  unitLabel?: string; // "অধ্যায়" or "Unit"
}

export default function ChapterMultiSelect({
  chapters,
  selectedIds,
  selectedLessonIds = [],
  onChange,
  label,
  placeholder,
  unitLabel = "অধ্যায়"
}: ChapterMultiSelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [expandedUnitIds, setExpandedUnitIds] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const uLabel = unitLabel || "অধ্যায়";
  const displayLabel = label ?? `${uLabel} ও Lesson নির্বাচন`;
  const displayPlaceholder = placeholder ?? `${uLabel} ও Lesson বেছে নিন`;

  // Close when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const allChapterIds = chapters.map(c => c.id);
  const allLessonIds = chapters.flatMap(c => c.lessons?.map(l => l.id) || []);
  const hasAnyLessons = allLessonIds.length > 0;

  // Determine if explicitly none is selected (via sentinel "__none__")
  const isNoneSelected = 
    selectedIds.includes("__none__") || 
    (selectedLessonIds && selectedLessonIds.includes("__none__"));

  // Determine if all are selected (empty arrays or matching all lengths)
  const isAllSelected = 
    !isNoneSelected && 
    (selectedIds.length === 0 || selectedIds.length === chapters.length) &&
    (!selectedLessonIds || selectedLessonIds.length === 0 || selectedLessonIds.length === allLessonIds.length);

  // Compute effective active chapter IDs and lesson IDs
  let effectiveChapterIds: string[];
  let effectiveLessonIds: string[];

  if (isNoneSelected) {
    effectiveChapterIds = [];
    effectiveLessonIds = [];
  } else if (isAllSelected) {
    effectiveChapterIds = [...allChapterIds];
    effectiveLessonIds = [...allLessonIds];
  } else {
    effectiveChapterIds = [...selectedIds];
    effectiveLessonIds = [...selectedLessonIds];

    // If chapter is selected but selectedLessonIds is empty, default all lessons of selected chapters
    for (const ch of chapters) {
      if (effectiveChapterIds.includes(ch.id) && ch.lessons && ch.lessons.length > 0) {
        const hasLessonsInCh = ch.lessons.some(l => effectiveLessonIds.includes(l.id));
        if (!hasLessonsInCh && (!selectedLessonIds || selectedLessonIds.length === 0)) {
          effectiveLessonIds.push(...ch.lessons.map(l => l.id));
        }
      }
    }
  }

  // Toggle accordion expansion for a unit
  const toggleUnitExpansion = (unitId: string) => {
    setExpandedUnitIds(prev => 
      prev.includes(unitId) ? prev.filter(id => id !== unitId) : [...prev, unitId]
    );
  };

  // Global Select All
  const handleSelectAll = () => {
    onChange([], []);
  };

  // Global Select None (Clear All)
  const handleClearAll = () => {
    onChange(["__none__"], ["__none__"]);
  };

  // Helper to commit changes and normalize all/none state
  const commitSelection = (nextChapters: string[], nextLessons: string[]) => {
    const uniqueChapters = Array.from(new Set(nextChapters)).filter(id => id !== "__none__");
    const uniqueLessons = Array.from(new Set(nextLessons)).filter(id => id !== "__none__");

    if (uniqueChapters.length === 0 && uniqueLessons.length === 0) {
      onChange(["__none__"], ["__none__"]);
    } else if (
      (uniqueChapters.length === allChapterIds.length || uniqueChapters.length === 0) &&
      (!hasAnyLessons || uniqueLessons.length === allLessonIds.length || uniqueLessons.length === 0)
    ) {
      onChange([], []);
    } else {
      onChange(uniqueChapters, uniqueLessons);
    }
  };

  // Toggle chapter checkbox
  const handleToggleChapter = (ch: ChapterTopic) => {
    const chLessons = ch.lessons || [];
    const isSelected = effectiveChapterIds.includes(ch.id);

    let nextChapters = [...effectiveChapterIds];
    let nextLessons = [...effectiveLessonIds];

    if (chLessons.length > 0) {
      const selectedLessonsInCh = chLessons.filter(l => nextLessons.includes(l.id));
      const isAllInCh = selectedLessonsInCh.length === chLessons.length;

      if (isAllInCh) {
        // Unselect chapter and all its lessons
        nextChapters = nextChapters.filter(id => id !== ch.id);
        const chLessonIds = chLessons.map(l => l.id);
        nextLessons = nextLessons.filter(id => !chLessonIds.includes(id));
      } else {
        // Select chapter and all its lessons
        if (!nextChapters.includes(ch.id)) nextChapters.push(ch.id);
        for (const l of chLessons) {
          if (!nextLessons.includes(l.id)) nextLessons.push(l.id);
        }
      }
    } else {
      // Chapter without lessons
      if (isSelected) {
        nextChapters = nextChapters.filter(id => id !== ch.id);
      } else {
        nextChapters.push(ch.id);
      }
    }

    commitSelection(nextChapters, nextLessons);
  };

  // Toggle individual lesson checkbox
  const handleToggleLesson = (ch: ChapterTopic, lessonId: string) => {
    const chLessons = ch.lessons || [];
    let nextLessons = [...effectiveLessonIds];
    let nextChapters = [...effectiveChapterIds];

    if (nextLessons.includes(lessonId)) {
      nextLessons = nextLessons.filter(id => id !== lessonId);
    } else {
      nextLessons.push(lessonId);
    }

    // Check if any lessons in this chapter remain selected
    const remainingInCh = chLessons.filter(l => nextLessons.includes(l.id));
    if (remainingInCh.length > 0) {
      if (!nextChapters.includes(ch.id)) nextChapters.push(ch.id);
    } else {
      nextChapters = nextChapters.filter(id => id !== ch.id);
    }

    commitSelection(nextChapters, nextLessons);
  };

  // Select all lessons within a specific unit
  const handleSelectAllInUnit = (ch: ChapterTopic) => {
    const chLessons = ch.lessons || [];
    let nextLessons = [...effectiveLessonIds];
    let nextChapters = [...effectiveChapterIds];

    if (!nextChapters.includes(ch.id)) nextChapters.push(ch.id);
    for (const l of chLessons) {
      if (!nextLessons.includes(l.id)) nextLessons.push(l.id);
    }

    commitSelection(nextChapters, nextLessons);
  };

  // Select none (clear) within a specific unit
  const handleClearUnit = (ch: ChapterTopic) => {
    const chLessons = ch.lessons || [];
    const chLessonIds = chLessons.map(l => l.id);
    let nextLessons = effectiveLessonIds.filter(id => !chLessonIds.includes(id));
    let nextChapters = effectiveChapterIds.filter(id => id !== ch.id);

    commitSelection(nextChapters, nextLessons);
  };

  // Trigger button summary text
  let triggerText: string;
  let triggerTitle: string;
  if (isAllSelected) {
    triggerText = `সকল ${uLabel}${hasAnyLessons ? " ও Lesson" : ""}`;
    triggerTitle = `সকল ${uLabel} ও Lesson (${chapters.length}টি ${uLabel}${hasAnyLessons ? `, ${allLessonIds.length}টি Lesson` : ""})`;
  } else if (isNoneSelected) {
    triggerText = `কোনো ${uLabel} নির্বাচিত নয়`;
    triggerTitle = `কোনো ${uLabel} বা Lesson নির্বাচিত নয়`;
  } else {
    const activeChCount = effectiveChapterIds.length;
    const activeLCount = effectiveLessonIds.length;
    triggerText = hasAnyLessons
      ? `${activeChCount}টি ${uLabel} (${activeLCount} পাঠ)`
      : `${activeChCount}টি ${uLabel} নির্বাচিত`;
    triggerTitle = hasAnyLessons
      ? `${activeChCount}টি ${uLabel} (${activeLCount}টি Lesson নির্বাচিত)`
      : `${activeChCount}টি ${uLabel} নির্বাচিত`;
  }

  return (
    <div className="relative w-full" ref={containerRef}>
      {displayLabel && (
        <label className="block mb-1.5 text-slate-800 font-bold text-xs flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>{displayLabel}</span>
          </span>
          {!isAllSelected && (
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {isNoneSelected ? "কোনোটি নির্বাচিত নয়" : "কাস্টম ফিল্টার সক্রিয়"}
            </span>
          )}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        title={triggerTitle}
        className="w-full min-h-[40px] px-3 py-2 rounded-[12px] border border-[#D5DCE4] bg-white text-base sm:text-xs font-semibold text-[#0F172A] flex items-center justify-between gap-2 hover:border-[#94A3B8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006A4E] transition-colors cursor-pointer touch-manipulation"
      >
        <div className="flex items-center gap-2 min-w-0 truncate">
          <BookOpen className="w-4 h-4 text-[#006A4E] shrink-0" />
          <span className="truncate">{chapters.length === 0 ? displayPlaceholder : triggerText}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Hierarchical Popover Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 text-xs text-slate-800 space-y-2.5 animate-in fade-in zoom-in-95 duration-150 min-w-[320px] max-w-[460px]">
          
          {/* Global Quick Action Bar */}
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 px-0.5">
            <div>
              <span className="text-[11px] font-bold text-slate-700">
                মোট {chapters.length}টি {uLabel}
              </span>
              {hasAnyLessons && (
                <span className="text-[10px] text-slate-500 ml-1">
                  ({allLessonIds.length}টি Lesson)
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant={isAllSelected ? "primary" : "tonal"}
                size="sm"
                onClick={handleSelectAll}
              >
                সকল {uLabel} ও Lesson
              </Button>
              <Button
                variant={isNoneSelected ? "danger-tonal" : "ghost"}
                size="sm"
                onClick={handleClearAll}
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                title="সব নির্বাচন বাতিল করুন"
                className={!isNoneSelected ? "hover:bg-[#FEF2F1] hover:text-[#A1271F]" : undefined}
              >
                সব বাতিল
              </Button>
            </div>
          </div>

          {/* Unit & Lesson Tree List */}
          <div className="max-h-80 overflow-y-auto space-y-2 pr-1 no-scrollbar">
            {chapters.length === 0 ? (
              <p className="text-center py-5 text-slate-400 text-xs">কোনো {uLabel} পাওয়া যায়নি</p>
            ) : (
              chapters.map((ch) => {
                const chLessons = ch.lessons || [];
                const hasLessons = chLessons.length > 0;
                const isExpanded = expandedUnitIds.includes(ch.id);

                // Compute selection status for this unit
                let isUnitChecked = false;
                let isUnitPartial = false;
                let selectedLessonsCount = 0;

                if (hasLessons) {
                  const selectedInThisUnit = chLessons.filter(l => effectiveLessonIds.includes(l.id));
                  selectedLessonsCount = selectedInThisUnit.length;
                  isUnitChecked = selectedLessonsCount === chLessons.length && selectedLessonsCount > 0;
                  isUnitPartial = selectedLessonsCount > 0 && selectedLessonsCount < chLessons.length;
                } else {
                  isUnitChecked = effectiveChapterIds.includes(ch.id);
                  isUnitPartial = false;
                }

                return (
                  <div
                    key={ch.id}
                    className={`rounded-xl border transition-all ${
                      isUnitChecked || isUnitPartial
                        ? "bg-[#EEF8F3]/70 border-[#006A4E]/40"
                        : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {/* Unit Header Row */}
                    <div className="flex items-start gap-2.5 p-2.5 select-none">
                      {/* Unit Checkbox */}
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={isUnitChecked ? "true" : isUnitPartial ? "mixed" : "false"}
                        aria-label={`${ch.name} নির্বাচন`}
                        onClick={() => handleToggleChapter(ch)}
                        className={`w-6 h-6 min-w-[24px] min-h-[24px] rounded-lg border mt-0.5 flex items-center justify-center shrink-0 transition-colors cursor-pointer touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006A4E] ${
                          isUnitChecked
                            ? "bg-[#006A4E] border-[#006A4E] text-white"
                            : isUnitPartial
                            ? "bg-[#EEF8F3] border-[#006A4E] text-[#00563F]"
                            : "border-[#D5DCE4] bg-white hover:border-[#94A3B8]"
                        }`}
                        title={isUnitChecked ? "সব বাতিল করুন" : "এই ইউনিটের সকল লেসন নির্বাচন করুন"}
                      >
                        {isUnitChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        {isUnitPartial && <Minus className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      {/* Unit Title & Description */}
                      <button
                        type="button"
                        className="min-w-0 flex-1 text-left cursor-pointer touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006A4E] rounded-lg p-0.5"
                        onClick={() => handleToggleChapter(ch)}
                      >
                        <div className="flex items-center justify-between gap-1 flex-wrap mb-0.5">
                          <p className={`font-semibold leading-tight text-xs ${
                            isUnitChecked || isUnitPartial ? "text-[#00563F]" : "text-slate-800"
                          }`}>
                            {ch.name}
                          </p>
                          {ch.pageRange && (
                            <span className="text-[9px] font-semibold text-slate-600 bg-white/80 px-1.5 py-0.2 rounded border border-slate-200 shrink-0">
                              {ch.pageRange}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 leading-snug line-clamp-1">
                          {ch.description}
                        </p>
                      </button>

                      {/* Expand Lessons Chevron Button */}
                      {hasLessons && (
                        <button
                          type="button"
                          onClick={() => toggleUnitExpansion(ch.id)}
                          aria-expanded={isExpanded}
                          aria-label={isExpanded ? `${ch.name} লেসন তালিকা বন্ধ করুন` : `${ch.name} লেসন তালিকা খুলুন`}
                          className={`flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1.5 min-h-[32px] rounded-lg border transition-colors shrink-0 cursor-pointer touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006A4E] ${
                            isExpanded
                              ? "bg-[#EEF8F3] border-[#006A4E]/40 text-[#00563F]"
                              : selectedLessonsCount > 0
                              ? "bg-white border-[#CBE5D8] text-[#006A4E] hover:bg-[#EEF8F3]"
                              : "bg-white border-[#D5DCE4] text-slate-600 hover:bg-slate-100"
                          }`}
                          title={isExpanded ? "লেসন তালিকা বন্ধ করুন" : "লেসন তালিকা খুলুন"}
                        >
                          <ListChecks className="w-3.5 h-3.5 text-[#006A4E]" />
                          <span>
                            {selectedLessonsCount > 0 ? `${selectedLessonsCount}/${chLessons.length}` : `${chLessons.length}টি`}
                          </span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>

                    {/* Accordion Drawer: Individual Lessons */}
                    {hasLessons && isExpanded && (
                      <div className="px-2.5 pb-2.5 pt-1 border-t border-[#CBE5D8] bg-white/95 rounded-b-xl space-y-1.5 animate-in fade-in duration-150">
                        {/* Unit-Level Action Bar */}
                        <div className="flex items-center justify-between gap-1.5 pb-1 border-b border-slate-100 text-[10px]">
                          <span className="font-semibold text-slate-500">
                            লেসন নির্বাচন ({selectedLessonsCount}/{chLessons.length}):
                          </span>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="tonal"
                              size="sm"
                              onClick={() => handleSelectAllInUnit(ch)}
                              className="h-7 min-h-[28px] px-2 text-[10px] rounded-lg"
                            >
                              সব লেসন
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleClearUnit(ch)}
                              className="h-7 min-h-[28px] px-2 text-[10px] rounded-lg hover:bg-[#FEF2F1] hover:text-[#A1271F]"
                            >
                              বাদ দিন
                            </Button>
                          </div>
                        </div>

                        {/* Individual Lesson Rows */}
                        <div className="space-y-1 max-h-48 overflow-y-auto pr-0.5 no-scrollbar">
                          {chLessons.map((lesson) => {
                            const isLessonChecked = effectiveLessonIds.includes(lesson.id);
                            return (
                              <button
                                key={lesson.id}
                                type="button"
                                role="checkbox"
                                aria-checked={isLessonChecked}
                                onClick={() => handleToggleLesson(ch, lesson.id)}
                                className={`w-full text-left flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-colors text-[11px] touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006A4E] min-h-[38px] ${
                                  isLessonChecked
                                    ? "bg-[#EEF8F3] text-[#00563F] border border-[#CBE5D8]"
                                    : "hover:bg-slate-50 text-slate-700 border border-transparent"
                                }`}
                              >
                                <div
                                  className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                                    isLessonChecked
                                      ? "bg-[#006A4E] border-[#006A4E] text-white"
                                      : "border-slate-300 bg-white"
                                  }`}
                                >
                                  {isLessonChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <div className="min-w-0 flex-1 leading-snug">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="font-semibold">{lesson.name}</span>
                                    {lesson.page && (
                                      <span className="text-[9px] text-slate-500 font-normal shrink-0">
                                        {lesson.page}
                                      </span>
                                    )}
                                  </div>
                                  {lesson.description && (
                                    <p className="text-[9px] text-slate-500 truncate mt-0.2">
                                      {lesson.description}
                                    </p>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Popover Footer Done Button */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
            <span className="text-[10px] text-slate-600 font-medium truncate max-w-[260px]">
              {isAllSelected 
                ? `সবগুলো ${uLabel} ও Lesson থেকে প্রশ্ন তৈরি হবে` 
                : isNoneSelected
                ? `কোনোটি নির্বাচিত নয়`
                : `${effectiveChapterIds.length}টি ${uLabel}-এর ${effectiveLessonIds.length}টি Lesson নির্বাচিত`}
            </span>
            <Button
              variant="ink"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              সম্পন্ন
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
