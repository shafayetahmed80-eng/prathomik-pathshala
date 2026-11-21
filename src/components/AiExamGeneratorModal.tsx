"use client";

import { useState, useEffect } from "react";
import { 
  Sparkles, 
  X, 
  BookOpen, 
  FileText, 
  Lightbulb, 
  Zap, 
  Award, 
  Key, 
  Plus, 
  Minus, 
  AlertCircle
} from "lucide-react";
import { NCTB_CURRICULUM_TOPICS } from "@/data/curriculumTopics";
import { CLASS_SUBJECTS_MAP, ExamQuestionItem } from "@/data/examQuestions";
import ChapterMultiSelect from "@/components/ChapterMultiSelect";
import { Button, IconButton, SegmentedControl } from "@/components/ui";

interface AiExamGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentClassId: string;
  currentSubjectKey: string;
  onExamGenerated: (examData: ExamQuestionItem, notice?: string) => void;
}

export default function AiExamGeneratorModal({
  isOpen,
  onClose,
  currentClassId,
  currentSubjectKey,
  onExamGenerated
}: AiExamGeneratorModalProps) {
  const [selectedClassId, setSelectedClassId] = useState<string>(currentClassId);
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<string>(currentSubjectKey);
  const [inputMode, setInputMode] = useState<"chapter" | "passage" | "custom_topic">("chapter");

  // Input states
  const [selectedChapterIds, setSelectedChapterIds] = useState<string[]>([]);
  const [selectedLessonIds, setSelectedLessonIds] = useState<string[]>([]);
  const [customPassage, setCustomPassage] = useState<string>("");
  const [customTopic, setCustomTopic] = useState<string>("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");

  // Target Counts
  const [counts, setCounts] = useState({
    mcq: 10,
    fillInTheBlanks: 5,
    trueFalse: selectedSubjectKey === "science" || selectedSubjectKey === "bgs" ? 5 : 0,
    matching: 1,
    wordMeaning: selectedSubjectKey === "bangla" || selectedSubjectKey === "english" ? 5 : 0,
    yuktaborno: selectedSubjectKey === "bangla" ? 5 : 0,
    shortQuestions: 5,
    broadQuestions: 5
  });

  // API Key & Settings
  const [userApiKey, setUserApiKey] = useState<string>("");
  const [showKeyInput, setShowKeyInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync with parent props on open
  useEffect(() => {
    if (isOpen) {
      setSelectedClassId(currentClassId);
      setSelectedSubjectKey(currentSubjectKey);
      try {
        const savedKey = localStorage.getItem("prathomik_gemini_api_key") || "";
        setUserApiKey(savedKey);
      } catch {}
    }
  }, [isOpen, currentClassId, currentSubjectKey]);

  // Available subjects for selected class
  const availableSubjects = CLASS_SUBJECTS_MAP[selectedClassId] || [];

  // Chapters for selected class and subject
  const subjectTopicsList = NCTB_CURRICULUM_TOPICS[selectedClassId] || [];
  const activeSubjectData = subjectTopicsList.find(s => s.subjectKey === selectedSubjectKey);
  const chapters = activeSubjectData?.chapters || [];
  const isEnglish = selectedSubjectKey === "english";
  const unitLabel = isEnglish ? "Unit" : "অধ্যায়";

  // Adjust counts on subject change
  const handleSubjectChange = (newSubKey: string) => {
    setSelectedSubjectKey(newSubKey);
    setSelectedChapterIds([]);
    setSelectedLessonIds([]);
    setCounts(prev => ({
      ...prev,
      trueFalse: newSubKey === "science" || newSubKey === "bgs" ? 5 : 0,
      wordMeaning: newSubKey === "bangla" || newSubKey === "english" ? 5 : 0,
      yuktaborno: newSubKey === "bangla" ? 5 : 0
    }));
  };

  // Live estimated marks
  const isClass1Or2 = selectedClassId === "pre-primary" || selectedClassId === "class-1" || selectedClassId === "class-2";
  const estimatedMarks = 
    (counts.mcq * (isClass1Or2 ? 2 : 1)) + 
    (counts.fillInTheBlanks * (isClass1Or2 ? 2 : (selectedSubjectKey === "math" ? 2 : (selectedSubjectKey === "english" ? 2 : 1)))) + 
    ((counts.trueFalse || 0) * 1) + 
    (counts.matching > 0 ? (isClass1Or2 ? (selectedSubjectKey === "math" ? 5 : 10) : (selectedSubjectKey === "english" ? 10 : 5)) : 0) + 
    (counts.wordMeaning * (isClass1Or2 ? 2 : 1)) + 
    (counts.yuktaborno * (isClass1Or2 ? 3 : 2)) + 
    (counts.shortQuestions * (isClass1Or2 ? 2 : (selectedSubjectKey === "math" ? 3 : (selectedSubjectKey === "english" ? 2 : (selectedSubjectKey === "bangla" ? 1 : 3))))) + 
    (counts.broadQuestions * (isClass1Or2 ? (selectedSubjectKey === "math" ? 5 : 10) : (selectedSubjectKey === "math" ? 6 : (selectedSubjectKey === "science" || selectedSubjectKey === "bgs" ? 6 : 5))));

  // Preset Handlers
  const applyPreset = (type: "nctb_summative" | "class_test" | "quiz") => {
    const isBangla = selectedSubjectKey === "bangla";
    const isSciBgs = selectedSubjectKey === "science" || selectedSubjectKey === "bgs";

    if (type === "quiz") {
      setCounts({
        mcq: 5,
        fillInTheBlanks: 5,
        trueFalse: 0,
        matching: 0,
        wordMeaning: 0,
        yuktaborno: 0,
        shortQuestions: 0,
        broadQuestions: 0
      });
    } else if (type === "class_test") {
      if (isClass1Or2) {
        setCounts({
          mcq: 4,
          fillInTheBlanks: 3,
          trueFalse: 0,
          matching: 0,
          wordMeaning: 0,
          yuktaborno: 0,
          shortQuestions: 2,
          broadQuestions: 0
        });
      } else {
        setCounts({
          mcq: 4,
          fillInTheBlanks: 3,
          trueFalse: 0,
          matching: 0,
          wordMeaning: 0,
          yuktaborno: 0,
          shortQuestions: 1,
          broadQuestions: 0
        });
      }
    } else if (type === "nctb_summative") {
      if (isClass1Or2) {
        // 50 marks
        if (selectedSubjectKey === "math") {
          setCounts({
            mcq: 5,
            fillInTheBlanks: 5,
            trueFalse: 0,
            matching: 1,
            wordMeaning: 0,
            yuktaborno: 0,
            shortQuestions: 5,
            broadQuestions: 3
          });
        } else if (selectedSubjectKey === "english") {
          setCounts({
            mcq: 5,
            fillInTheBlanks: 5,
            trueFalse: 0,
            matching: 1,
            wordMeaning: 5,
            yuktaborno: 0,
            shortQuestions: 5,
            broadQuestions: 0
          });
        } else if (selectedSubjectKey === "bangla") {
          setCounts({
            mcq: 5,
            fillInTheBlanks: 5,
            trueFalse: 0,
            matching: 1,
            wordMeaning: 5,
            yuktaborno: 0,
            shortQuestions: 5,
            broadQuestions: 0
          });
        } else {
          setCounts({
            mcq: 5,
            fillInTheBlanks: 5,
            trueFalse: 5,
            matching: 1,
            wordMeaning: 0,
            yuktaborno: 0,
            shortQuestions: 4,
            broadQuestions: 1
          });
        }
      } else {
        // 70 marks (Class 3, 4, 5)
        if (selectedSubjectKey === "math") {
          setCounts({
            mcq: 10,
            fillInTheBlanks: 5,
            trueFalse: 0,
            matching: 1,
            wordMeaning: 0,
            yuktaborno: 0,
            shortQuestions: 5,
            broadQuestions: 5
          });
        } else if (selectedSubjectKey === "english") {
          setCounts({
            mcq: 10,
            fillInTheBlanks: 5,
            trueFalse: 0,
            matching: 1,
            wordMeaning: 0,
            yuktaborno: 0,
            shortQuestions: 5,
            broadQuestions: 6
          });
        } else if (selectedSubjectKey === "bangla") {
          setCounts({
            mcq: 10,
            fillInTheBlanks: 5,
            trueFalse: 0,
            matching: 1,
            wordMeaning: 5,
            yuktaborno: 5,
            shortQuestions: 5,
            broadQuestions: 6
          });
        } else {
          setCounts({
            mcq: 10,
            fillInTheBlanks: 5,
            trueFalse: 5,
            matching: 1,
            wordMeaning: 0,
            yuktaborno: 0,
            shortQuestions: 5,
            broadQuestions: 5
          });
        }
      }
    }
  };

  // Save API key
  const handleSaveApiKey = (key: string) => {
    setUserApiKey(key);
    try {
      localStorage.setItem("prathomik_gemini_api_key", key.trim());
    } catch {}
  };

  // Generate Request
  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    const isAll = 
      (selectedChapterIds.length === 0 || selectedChapterIds.length === chapters.length) &&
      (!selectedLessonIds || selectedLessonIds.length === 0);

    const selectedChs = isAll
      ? chapters
      : chapters.filter(c => selectedChapterIds.includes(c.id));

    const selectedChapterNames = selectedChs.map(c => {
      const selectedLessonsInCh = c.lessons?.filter(l => 
        isAll || (selectedLessonIds.length === 0 ? true : selectedLessonIds.includes(l.id))
      ) || [];

      const lessonInfo = selectedLessonsInCh.length > 0 
        ? ` [Selected Lessons: ${selectedLessonsInCh.map(l => l.name).join(", ")}]` 
        : "";
      return `${c.name}${lessonInfo}: ${c.description}`;
    });
    const chapterName = selectedChapterNames.join(" | ");

    try {
      const response = await fetch("/api/ai/generate-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: selectedClassId,
          subjectKey: selectedSubjectKey,
          inputMode,
          chapterName,
          selectedChapterIds: isAll ? [] : selectedChapterIds,
          selectedLessonIds: isAll ? [] : selectedLessonIds,
          selectedChapterNames,
          customPassage,
          customTopic,
          difficulty,
          targetCounts: counts,
          userApiKey
        })
      });

      const resData = await response.json();

      if (resData.success && resData.data) {
        onExamGenerated(resData.data, resData.notice);
        onClose();
      } else {
        setErrorMsg(resData.message || "প্রশ্নপত্র জেনারেট করা সম্ভব হয়নি। পুনরায় চেষ্টা করুন।");
      }
    } catch (err: any) {
      setErrorMsg("নেটওয়ার্ক সংযোগ ত্রুটি। দয়া করে ইন্টারনেট সংযোগ পরীক্ষা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-modal-title"
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden text-slate-800"
      >
        {/* Modal Header */}
        <header className="p-4 sm:p-5 bg-[#0F172A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-xl shrink-0">
              ✨
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="ai-modal-title" className="text-base sm:text-lg font-bold leading-tight">
                  এআই প্রশ্নপত্র ও ওয়ার্কশিট জেনারেটর
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFB020] text-[#3A2300]">
                  Gemini AI
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                এনসিটিবি সিলেবাসের আলোকে যেকোনা বিষয়ের পূর্ণাঙ্গ প্রশ্ন তৈরি করুন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <IconButton
              icon={<Key className="w-4 h-4" />}
              ariaLabel="Gemini API Key সেটিংস"
              tooltipPosition="bottom"
              variant="ghost"
              size="sm"
              onClick={() => setShowKeyInput(!showKeyInput)}
              className={showKeyInput ? "bg-white text-[#0F172A] hover:bg-slate-100" : "bg-white/10 text-white hover:bg-white/20"}
            />
            <IconButton
              icon={<X className="w-4 h-4" />}
              ariaLabel="বন্ধ করুন"
              tooltipPosition="bottom"
              variant="ghost"
              size="sm"
              onClick={onClose}
              disabled={isLoading}
              className="bg-white/10 text-white hover:bg-white/20"
            />
          </div>
        </header>

        {/* API Key Drawer (Optional) */}
        {showKeyInput && (
          <div className="p-3.5 bg-amber-50 border-b border-amber-200 text-xs text-amber-900 space-y-2 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-bold flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-amber-700" />
                  Gemini API Key (ঐচ্ছিক):
                </p>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  আপনার নিজস্ব Google AI Studio API Key থাকলে নিচে যুক্ত করতে পারেন। কি না থাকলেও আমাদের প্রমিত কারিকুলাম ইঞ্জিন স্বয়ংক্রিয়ভাবে প্রশ্ন সাজিয়ে দেবে।
                </p>
              </div>
            </div>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={userApiKey}
              onChange={(e) => handleSaveApiKey(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-amber-300 bg-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-rose-50 border-b border-rose-200 text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Modal Body (Scrollable) */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs">
          
          {/* Class & Subject Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <label className="block mb-1 font-bold text-slate-700">শ্রেণি</label>
              <select
                value={selectedClassId}
                onChange={(e) => {
                  setSelectedClassId(e.target.value);
                  const newSubs = CLASS_SUBJECTS_MAP[e.target.value] || [];
                  if (newSubs.length > 0) handleSubjectChange(newSubs[0].key);
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="class-1">১ম শ্রেণি</option>
                <option value="class-2">২য় শ্রেণি</option>
                <option value="class-3">৩য় শ্রেণি</option>
                <option value="class-4">৪র্থ শ্রেণি</option>
                <option value="class-5">৫ম শ্রেণি</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-bold text-slate-700">বিষয়</label>
              <select
                value={selectedSubjectKey}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {availableSubjects.map((sub) => (
                  <option key={sub.key} value={sub.key}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Input Source Modes (3 Tabs) */}
          <div className="space-y-2.5">
            <label className="block font-bold text-slate-700">প্রশ্ন তৈরির উৎস নির্বাচন করুন:</label>
            <SegmentedControl
              value={inputMode}
              onChange={setInputMode}
              ariaLabel="প্রশ্ন তৈরির উৎস"
              roleMode="tablist"
              size="sm"
              fullWidth
              options={[
                {
                  value: "chapter",
                  label: "পাঠ্যবইয়ের অধ্যায়",
                  shortLabel: "অধ্যায়",
                  icon: <BookOpen className="w-3.5 h-3.5" />,
                },
                {
                  value: "passage",
                  label: "অনুচ্ছেদ পেস্ট",
                  shortLabel: "অনুচ্ছেদ",
                  icon: <FileText className="w-3.5 h-3.5" />,
                },
                {
                  value: "custom_topic",
                  label: "শিখনফল / টপিক",
                  shortLabel: "টপিক",
                  icon: <Lightbulb className="w-3.5 h-3.5" />,
                },
              ]}
            />

            {/* Mode 1: Chapter Select (Multi-Chapter Selection) */}
            {inputMode === "chapter" && (
              <div className="pt-1">
                <ChapterMultiSelect
                  chapters={chapters}
                  selectedIds={selectedChapterIds}
                  selectedLessonIds={selectedLessonIds}
                  onChange={(chIds, lIds) => {
                    setSelectedChapterIds(chIds);
                    setSelectedLessonIds(lIds);
                  }}
                  unitLabel={unitLabel}
                  label={`পরীক্ষার জন্য ${unitLabel} ও Lesson বেছে নিন:`}
                  placeholder={`এক বা একাধিক ${unitLabel} ও Lesson নির্বাচন করুন`}
                />
              </div>
            )}

            {/* Mode 2: Custom Passage Textarea */}
            {inputMode === "passage" && (
              <div className="pt-1">
                <textarea
                  rows={4}
                  placeholder="এখানে আপনার কোনো গল্প, কবিতা, বা রিডিং প্যাসেজের টেক্সট পেস্ট করুন... এআই এই লেখার ওপর ভিত্তি করে প্রশ্নপত্র সাজাবে।"
                  value={customPassage}
                  onChange={(e) => setCustomPassage(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-normal focus:outline-none focus:ring-2 focus:ring-sky-500 leading-relaxed"
                />
              </div>
            )}

            {/* Mode 3: Custom Topic */}
            {inputMode === "custom_topic" && (
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="যেমন: ভগ্নাংশের যোগ-বিয়োগের বাস্তব ডাকের অঙ্ক, অথবা পরিবেশ পরিচ্ছন্নতার ৫টি নিয়ম..."
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            )}
          </div>

          {/* Quick Presets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">এক ক্লিকে পরীক্ষার প্রিসেট:</span>
              <span className="text-[11px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                আনুমানিক পূর্ণমান: {estimatedMarks} নম্বর
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => applyPreset("nctb_summative")}
                className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100/80 text-left transition-all shadow-xs cursor-pointer"
              >
                <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>🎯 সরকারি মূল্যায়ন</span>
                </div>
                <p className="text-[10px] text-emerald-700 mt-0.5">
                  {isClass1Or2 ? "৫০ নম্বর (১ ঘণ্টা)" : "৭০ নম্বর (২ ঘণ্টা ৩০ মি.)"}
                </p>
              </button>

              <button
                type="button"
                onClick={() => applyPreset("class_test")}
                className="p-2.5 rounded-xl border border-sky-300 bg-sky-50/60 hover:bg-sky-100/80 text-left transition-all shadow-xs cursor-pointer"
              >
                <div className="flex items-center gap-1.5 font-bold text-sky-950">
                  <FileText className="w-4 h-4 text-sky-600" />
                  <span>⏱️ ধারাবাহিক ক্লাস টেস্ট</span>
                </div>
                <p className="text-[10px] text-sky-700 mt-0.5">
                  {isClass1Or2 ? "২০ নম্বর (৩০ মিনিট)" : "১০ নম্বর (২০ মিনিট)"}
                </p>
              </button>

              <button
                type="button"
                onClick={() => applyPreset("quiz")}
                className="p-2.5 rounded-xl border border-purple-300 bg-purple-50/60 hover:bg-purple-100/80 text-left transition-all shadow-xs cursor-pointer"
              >
                <div className="flex items-center gap-1.5 font-bold text-purple-950">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span>📝 কুইক প্র্যাকটিস কুইজ</span>
                </div>
                <p className="text-[10px] text-purple-700 mt-0.5">২০ নম্বর (২০ মিনিট)</p>
              </button>
            </div>
          </div>

          {/* Question Matrix Step Counters */}
          <div className="space-y-2.5">
            <span className="font-bold text-slate-700">প্রশ্নের ধরণ ও সংখ্যা কাস্টমাইজ করুন:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              {/* MCQ */}
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white">
                <div>
                  <span className="font-bold text-slate-800 block">১. বহুনির্বাচনি (MCQ)</span>
                  <span className="text-[10px] text-slate-500">{isClass1Or2 ? "প্রতিটি ২ নম্বর" : "প্রতিটি ১ নম্বর"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCounts({ ...counts, mcq: Math.max(0, counts.mcq - 1) })}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center font-bold text-sm text-sky-800">{counts.mcq}</span>
                  <button
                    type="button"
                    onClick={() => setCounts({ ...counts, mcq: Math.min(25, counts.mcq + 1) })}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Fill in Blanks */}
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white">
                <div>
                  <span className="font-bold text-slate-800 block">২. শূন্যস্থান পূরণ</span>
                  <span className="text-[10px] text-slate-500">{isClass1Or2 ? "প্রতিটি ২ নম্বর" : "প্রতিটি ১ নম্বর"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCounts({ ...counts, fillInTheBlanks: Math.max(0, counts.fillInTheBlanks - 1) })}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center font-bold text-sm text-sky-800">{counts.fillInTheBlanks}</span>
                  <button
                    type="button"
                    onClick={() => setCounts({ ...counts, fillInTheBlanks: Math.min(20, counts.fillInTheBlanks + 1) })}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* True / False */}
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white">
                <div>
                  <span className="font-bold text-slate-800 block">৩. সত্য/মিথ্যা (শুদ্ধ-অশুদ্ধ)</span>
                  <span className="text-[10px] text-slate-500">এনসিটিবি ২০২৬ নির্ধারিত (প্রতিটি ১ নম্বর)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCounts({ ...counts, trueFalse: Math.max(0, (counts.trueFalse || 0) - 1) })}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center font-bold text-sm text-sky-800">{counts.trueFalse || 0}</span>
                  <button
                    type="button"
                    onClick={() => setCounts({ ...counts, trueFalse: Math.min(15, (counts.trueFalse || 0) + 1) })}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Matching */}
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white">
                <div>
                  <span className="font-bold text-slate-800 block">৪. মিলকরণ ছক</span>
                  <span className="text-[10px] text-slate-500">৪টি জোড়া = ৪ নম্বর</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCounts({ ...counts, matching: Math.max(0, counts.matching - 1) })}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center font-bold text-sm text-sky-800">{counts.matching}</span>
                  <button
                    type="button"
                    onClick={() => setCounts({ ...counts, matching: Math.min(2, counts.matching + 1) })}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Short Questions */}
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white">
                <div>
                  <span className="font-bold text-slate-800 block">৫. সংক্ষিপ্ত প্রশ্ন</span>
                  <span className="text-[10px] text-slate-500">প্রতিটি ৩ নম্বর</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCounts({ ...counts, shortQuestions: Math.max(0, counts.shortQuestions - 1) })}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center font-bold text-sm text-sky-800">{counts.shortQuestions}</span>
                  <button
                    type="button"
                    onClick={() => setCounts({ ...counts, shortQuestions: Math.min(15, counts.shortQuestions + 1) })}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Broad Questions */}
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white">
                <div>
                  <span className="font-bold text-slate-800 block">৬. সমস্যা সমাধান / বর্ণনামূলক</span>
                  <span className="text-[10px] text-slate-500">প্রতিটি ৫ নম্বর</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCounts({ ...counts, broadQuestions: Math.max(0, counts.broadQuestions - 1) })}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center font-bold text-sm text-sky-800">{counts.broadQuestions}</span>
                  <button
                    type="button"
                    onClick={() => setCounts({ ...counts, broadQuestions: Math.min(8, counts.broadQuestions + 1) })}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Yuktaborno (Only for Bangla) */}
              {selectedSubjectKey === "bangla" && (
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white">
                  <div>
                    <span className="font-bold text-slate-800 block">৭. যুক্তবর্ণ বিশ্লেষণ</span>
                    <span className="text-[10px] text-slate-500">প্রতিটি ৩ নম্বর</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCounts({ ...counts, yuktaborno: Math.max(0, counts.yuktaborno - 1) })}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm text-sky-800">{counts.yuktaborno}</span>
                    <button
                      type="button"
                      onClick={() => setCounts({ ...counts, yuktaborno: Math.min(8, counts.yuktaborno + 1) })}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Word Meaning */}
              {(selectedSubjectKey === "bangla" || selectedSubjectKey === "english") && (
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white">
                  <div>
                    <span className="font-bold text-slate-800 block">৮. শব্দার্থ লিখন</span>
                    <span className="text-[10px] text-slate-500">প্রতিটি ২ নম্বর</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCounts({ ...counts, wordMeaning: Math.max(0, counts.wordMeaning - 1) })}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm text-sky-800">{counts.wordMeaning}</span>
                    <button
                      type="button"
                      onClick={() => setCounts({ ...counts, wordMeaning: Math.min(10, counts.wordMeaning + 1) })}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-1.5">
            <span className="font-bold text-slate-700 block">কাঠিন্যের মাত্রা (Difficulty Level):</span>
            <SegmentedControl
              value={difficulty}
              onChange={setDifficulty}
              ariaLabel="কাঠিন্যের মাত্রা"
              roleMode="radiogroup"
              size="sm"
              fullWidth
              options={[
                { value: "easy", label: "সহজ ও স্মরণমূলক", shortLabel: "সহজ" },
                { value: "medium", label: "মানসম্মত ও সুষম", shortLabel: "মানসম্মত" },
                { value: "hard", label: "চিন্তনদক্ষতামূলক", shortLabel: "উচ্চতর" },
              ]}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <footer className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="text-slate-500 text-[11px] hidden sm:block">
            এনসিটিবি প্রাথমিক শিক্ষাক্রমের আলোকে এআই প্রস্তুত করবে
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <Button
              variant="secondary"
              size="md"
              onClick={onClose}
              disabled={isLoading}
            >
              বাতিল
            </Button>

            <Button
              variant="ink"
              size="md"
              state={isLoading ? "loading" : "idle"}
              loadingLabel="প্রশ্ন প্রস্তুত করা হচ্ছে..."
              disabled={estimatedMarks === 0}
              leftIcon={<Sparkles className="w-4 h-4 text-[#FFB020]" />}
              onClick={handleGenerate}
              className="flex-1 sm:flex-initial"
            >
              সম্পূর্ণ প্রশ্নপত্র তৈরি করুন
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
