"use client";

import React, { useState, useEffect } from "react";
import { 
  Printer, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  FileDown,
  Columns2,
  FileText,
  Pencil,
  Save,
  Sliders,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import AiExamGeneratorModal from "@/components/AiExamGeneratorModal";
import ChapterMultiSelect from "@/components/ChapterMultiSelect";
import ExamBlueprintPanel from "@/components/ExamBlueprintPanel";
import { NCTB_CURRICULUM_TOPICS } from "@/data/curriculumTopics";
import { buildRichExamFromPool, buildNctb2026ExamFromPool, buildDynamicExamFromPool } from "@/data/questionPool";
import { getNctb2026Blueprint } from "@/data/nctb2026Blueprints";
import { getDefaultBlueprint, getDefaultSeenConfig, PresetType, calculateBlueprintTotal } from "@/data/blueprintConfig";
import { 
  EXAM_DATABASE, 
  CLASS_SUBJECTS_MAP, 
  ExamQuestionItem,
  McqQuestion,
  FillBlankQuestion,
  ShortQuestion,
  BroadQuestion,
  YuktabornoQuestion,
  WordMeaningQuestion,
  TrueFalseQuestion,
  ExamBlueprintConfig,
  SeenBlueprintConfig,
  SeenPassageItem
} from "@/data/examQuestions";

export default function ExamWorksheetGenerator() {
  const [schoolName, setSchoolName] = useState<string>("মডেল সরকারি প্রাথমিক বিদ্যালয়");
  const [selectedClassId, setSelectedClassId] = useState<string>("class-3");
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<string>("bangla");
  const [examType, setExamType] = useState<string>("১ম/২য়/৩য় প্রান্তিক সামষ্টিক মূল্যায়ন ২০২৬");
  const [examTime, setExamTime] = useState<string>("২ ঘণ্টা ৩০ মিনিট");
  const [selectedPreset, setSelectedPreset] = useState<PresetType>("nctb_summative");
  const [blueprint, setBlueprint] = useState<ExamBlueprintConfig>(() => 
    getDefaultBlueprint("class-3", "bangla", "nctb_summative")
  );
  const [seenConfig, setSeenConfig] = useState<SeenBlueprintConfig>(() => 
    getDefaultSeenConfig("class-3", "bangla", "nctb_summative")
  );
  
  // Customization & Layout States
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);
  const [printTeacherCopy, setPrintTeacherCopy] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [paperMode, setPaperMode] = useState<"exam" | "worksheet">("exam");
  const [columnLayout, setColumnLayout] = useState<1 | 2>(1);
  const [fontSize, setFontSize] = useState<"compact" | "normal" | "large">("normal");

  // Feedback states
  const [copied, setCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [selectedChapterIds, setSelectedChapterIds] = useState<string[]>([]);
  const [selectedLessonIds, setSelectedLessonIds] = useState<string[]>([]);

  // Available subjects for the active class
  const availableSubjects = CLASS_SUBJECTS_MAP[selectedClassId] || [
    { key: "bangla", name: "বাংলা" },
    { key: "english", name: "English" },
    { key: "math", name: "গণিত" }
  ];

  const currentSubjectObj = availableSubjects.find(s => s.key === selectedSubjectKey) || availableSubjects[0];
  const selectedSubjectName = currentSubjectObj.name;

  // Chapters for the active class and subject
  const subjectTopicsList = NCTB_CURRICULUM_TOPICS[selectedClassId] || [];
  const activeSubjectData = subjectTopicsList.find(s => s.subjectKey === selectedSubjectKey);
  const currentChapters = activeSubjectData?.chapters || [];
  const isEnglish = selectedSubjectKey === "english";
  const unitLabel = isEnglish ? "Unit" : "অধ্যায়";

  // Active editable exam questions in state initialized with deterministic baseline
  const [activeExam, setActiveExam] = useState<ExamQuestionItem>(() => {
    return EXAM_DATABASE["class-3-bangla"] || EXAM_DATABASE["class-1-bangla"];
  });

  // Load fresh randomized NCTB 2026 blueprint on client mount
  useEffect(() => {
    const initialBp = getDefaultBlueprint("class-3", "bangla", "nctb_summative");
    const initialSeen = getDefaultSeenConfig("class-3", "bangla", "nctb_summative");
    setBlueprint(initialBp);
    setSeenConfig(initialSeen);
    const generated = buildDynamicExamFromPool("class-3", "bangla", initialBp, [], [], initialSeen);
    setActiveExam(generated);
  }, []);

  // Apply Blueprint Preset
  const handleApplyPreset = (preset: PresetType) => {
    setSelectedPreset(preset);
    const isClass1Or2 = selectedClassId === "pre-primary" || selectedClassId === "class-1" || selectedClassId === "class-2";

    if (preset === "nctb_summative") {
      setExamTime(isClass1Or2 ? "১ ঘণ্টা" : "২ ঘণ্টা ৩০ মিনিট");
      setPaperMode(isClass1Or2 ? "worksheet" : "exam");
      setExamType(prev => prev.includes("প্রান্তিক") || prev.includes("অর্ধবার্ষিক") ? prev : "১ম প্রান্তিক মূল্যায়ন ২০২৬");
    } else if (preset === "class_test") {
      setExamTime(isClass1Or2 ? "৩০ মিনিট" : "২০ মিনিট");
      setExamType("ধারাবাহিক মূল্যায়ন ও ক্লাস টেস্ট");
    } else if (preset === "quiz") {
      setExamTime("২০ মিনিট");
      setExamType("দৈনিক অনুশীলন ওয়ার্কশিট");
    } else if (preset === "annual") {
      setExamTime("২ ঘণ্টা ৩০ মিনিট");
      setExamType("বার্ষিক পরীক্ষা ২০২৬");
    } else if (preset === "custom") {
      setExamType("কাস্টম মূল্যায়ন পরীক্ষা");
    }

    const newBp = getDefaultBlueprint(selectedClassId, selectedSubjectKey, preset);
    const newSeen = getDefaultSeenConfig(selectedClassId, selectedSubjectKey, preset);
    setBlueprint(newBp);
    setSeenConfig(newSeen);
    const generated = buildDynamicExamFromPool(selectedClassId, selectedSubjectKey, newBp, selectedChapterIds, selectedLessonIds, newSeen);
    setActiveExam(generated);
    showToast(
      preset === "nctb_summative" 
        ? `🏛️ এনসিটিবি ২০২৬ সরকারি কাঠামো (${isClass1Or2 ? "৫০ নম্বর" : "৭০ নম্বর"}) প্রস্তুত!`
        : `⏱️ ${preset === "class_test" ? "ক্লাস টেস্ট" : preset === "quiz" ? "কুইজ" : preset === "annual" ? "বার্ষিক পরীক্ষা" : "কাস্টম ব্লুপ্রিন্ট"} প্রস্তুত করা হয়েছে!`
    );
  };

  // Generate directly from current interactive blueprint
  const handleGenerateWithBlueprint = () => {
    const generated = buildDynamicExamFromPool(selectedClassId, selectedSubjectKey, blueprint, selectedChapterIds, selectedLessonIds, seenConfig);
    setActiveExam(generated);
    showToast("🎯 আপনার কাস্টম ব্লুপ্রিন্ট অনুযায়ী প্রশ্নপত্র তৈরি করা হয়েছে!");
  };

  // Reload data when class or subject changes
  const handleClassChange = (newClassId: string) => {
    setSelectedClassId(newClassId);
    const isClass1Or2 = newClassId === "pre-primary" || newClassId === "class-1" || newClassId === "class-2";

    if (selectedPreset === "nctb_summative") {
      setExamTime(isClass1Or2 ? "১ ঘণ্টা" : "২ ঘণ্টা ৩০ মিনিট");
      setPaperMode(isClass1Or2 ? "worksheet" : "exam");
    } else if (selectedPreset === "class_test") {
      setExamTime(isClass1Or2 ? "৩০ মিনিট" : "২০ মিনিট");
    }

    const newSubjects = CLASS_SUBJECTS_MAP[newClassId] || [];
    const exists = newSubjects.some(s => s.key === selectedSubjectKey);
    const nextSubKey = exists ? selectedSubjectKey : (newSubjects[0]?.key || "bangla");
    if (!exists) setSelectedSubjectKey(nextSubKey);

    setSelectedChapterIds([]);
    setSelectedLessonIds([]);
    const newBp = getDefaultBlueprint(newClassId, nextSubKey, selectedPreset);
    const newSeen = getDefaultSeenConfig(newClassId, nextSubKey, selectedPreset);
    setBlueprint(newBp);
    setSeenConfig(newSeen);
    const generated = buildDynamicExamFromPool(newClassId, nextSubKey, newBp, [], [], newSeen);
    setActiveExam(generated);
  };

  const handleSubjectChange = (newSubKey: string) => {
    setSelectedSubjectKey(newSubKey);
    setSelectedChapterIds([]);
    setSelectedLessonIds([]);

    if (newSubKey === "english" && examType === "১ম/২য়/৩য় প্রান্তিক সামষ্টিক মূল্যায়ন ২০২৬") {
      setExamType("Terminal Summative Assessment 2026");
    } else if (newSubKey !== "english" && examType === "Terminal Summative Assessment 2026") {
      setExamType("১ম/২য়/৩য় প্রান্তিক সামষ্টিক মূল্যায়ন ২০২৬");
    }
    const newBp = getDefaultBlueprint(selectedClassId, newSubKey, selectedPreset);
    const newSeen = getDefaultSeenConfig(selectedClassId, newSubKey, selectedPreset);
    setBlueprint(newBp);
    setSeenConfig(newSeen);
    const generated = buildDynamicExamFromPool(selectedClassId, newSubKey, newBp, [], [], newSeen);
    setActiveExam(generated);
  };

  // Reset to fresh questions from rich pool
  const handleResetToDefault = () => {
    const generated = buildDynamicExamFromPool(selectedClassId, selectedSubjectKey, blueprint, selectedChapterIds, selectedLessonIds, seenConfig);
    setActiveExam(generated);
    showToast("বর্তমান কাঠামো অনুযায়ী নতুন প্রশ্ন সেট সাজানো হয়েছে!");
  };

  // AI Exam Generated Handler
  const handleAiExamGenerated = (newExam: ExamQuestionItem, notice?: string) => {
    setActiveExam(newExam);
    setSelectedClassId(newExam.classId);
    setSelectedSubjectKey(newExam.subject);
    const newBp = getDefaultBlueprint(newExam.classId, newExam.subject, "custom");
    const newSeen = getDefaultSeenConfig(newExam.classId, newExam.subject, "custom");
    setBlueprint(newBp);
    setSeenConfig(newSeen);
    setSelectedPreset("custom");
    showToast(notice || "✨ এআই দ্বারা সম্পূর্ণ নতুন প্রশ্নপত্র সফলভাবে প্রস্তুত করা হয়েছে!");
  };

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // LocalStorage Draft Save & Load
  const handleSaveDraft = () => {
    try {
      const draftKey = `draft_${selectedClassId}_${selectedSubjectKey}`;
      localStorage.setItem(draftKey, JSON.stringify({
        schoolName,
        examType,
        examTime,
        activeExam
      }));
      showToast("প্রশ্নপত্রের ড্রাফট লোকাল স্টোরেজে সংরক্ষিত হয়েছে!");
    } catch {
      showToast("ড্রাফট সংরক্ষণ ব্যর্থ হয়েছে");
    }
  };

  const handleLoadDraft = () => {
    try {
      const draftKey = `draft_${selectedClassId}_${selectedSubjectKey}`;
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.schoolName) setSchoolName(parsed.schoolName);
        if (parsed.examType) setExamType(parsed.examType);
        if (parsed.examTime) setExamTime(parsed.examTime);
        if (parsed.activeExam) setActiveExam(parsed.activeExam);
        showToast("সংরক্ষিত ড্রাফট সফলভাবে লোড করা হয়েছে!");
      } else {
        showToast("কোনো সংরক্ষিত ড্রাফট পাওয়া যায়নি");
      }
    } catch {
      showToast("ড্রাফট লোড করা যায়নি");
    }
  };

  // Reordering & Editing Handlers
  const moveItem = <T,>(arr: T[], index: number, direction: "up" | "down"): T[] => {
    const copy = [...arr];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= copy.length) return copy;
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    return copy;
  };

  // MCQ Handlers
  const handleUpdateMcq = (idx: number, field: keyof McqQuestion, value: any) => {
    const updated = [...activeExam.mcq];
    updated[idx] = { ...updated[idx], [field]: value };
    setActiveExam({ ...activeExam, mcq: updated });
  };
  const handleUpdateMcqOption = (qIdx: number, optIdx: number, val: string) => {
    const updated = [...activeExam.mcq];
    const opts = [...updated[qIdx].options];
    opts[optIdx] = val;
    updated[qIdx] = { ...updated[qIdx], options: opts };
    setActiveExam({ ...activeExam, mcq: updated });
  };
  const handleAddMcq = () => {
    const newQ: McqQuestion = {
      id: `mcq-custom-${Date.now()}`,
      question: "নতুন বহুনির্বাচনি প্রশ্ন লিখুন...",
      options: ["বিকল্প ক", "বিকল্প খ", "বিকল্প গ", "বিকল্প ঘ"],
      answer: "বিকল্প ক",
      marks: 2
    };
    setActiveExam({ ...activeExam, mcq: [...activeExam.mcq, newQ] });
  };
  const handleDeleteMcq = (idx: number) => {
    setActiveExam({ ...activeExam, mcq: activeExam.mcq.filter((_, i) => i !== idx) });
  };

  // Fill in blanks Handlers
  const handleUpdateFill = (idx: number, field: keyof FillBlankQuestion, value: any) => {
    const updated = [...activeExam.fillInTheBlanks];
    updated[idx] = { ...updated[idx], [field]: value };
    setActiveExam({ ...activeExam, fillInTheBlanks: updated });
  };
  const handleAddFill = () => {
    const newF: FillBlankQuestion = {
      id: `fill-custom-${Date.now()}`,
      sentence: "বাক্যের নির্দিষ্ট অংশ ____ পূরণ করুন।",
      answer: "সঠিক শব্দ",
      marks: 2
    };
    setActiveExam({ ...activeExam, fillInTheBlanks: [...activeExam.fillInTheBlanks, newF] });
  };
  const handleDeleteFill = (idx: number) => {
    setActiveExam({ ...activeExam, fillInTheBlanks: activeExam.fillInTheBlanks.filter((_, i) => i !== idx) });
  };

  // Matching Handlers
  const handleUpdateMatchingLeft = (idx: number, val: string) => {
    const left = [...activeExam.matching.left];
    left[idx] = val;
    setActiveExam({ ...activeExam, matching: { ...activeExam.matching, left } });
  };
  const handleUpdateMatchingRight = (idx: number, val: string) => {
    const right = [...activeExam.matching.right];
    right[idx] = val;
    setActiveExam({ ...activeExam, matching: { ...activeExam.matching, right } });
  };
  const handleAddMatchingRow = () => {
    setActiveExam({
      ...activeExam,
      matching: {
        ...activeExam.matching,
        left: [...activeExam.matching.left, "বাম পাশের তথ্য"],
        right: [...activeExam.matching.right, "ডান পাশের তথ্য"],
        marks: (activeExam.matching.marks || 4) + 1
      }
    });
  };
  const handleDeleteMatchingRow = (idx: number) => {
    if (activeExam.matching.left.length <= 1) return;
    setActiveExam({
      ...activeExam,
      matching: {
        ...activeExam.matching,
        left: activeExam.matching.left.filter((_, i) => i !== idx),
        right: activeExam.matching.right.filter((_, i) => i !== idx),
        marks: Math.max(1, (activeExam.matching.marks || 4) - 1)
      }
    });
  };

  // Short Question Handlers
  const handleUpdateShort = (idx: number, field: keyof ShortQuestion, value: any) => {
    const updated = [...activeExam.shortQuestions];
    updated[idx] = { ...updated[idx], [field]: value };
    setActiveExam({ ...activeExam, shortQuestions: updated });
  };
  const handleAddShort = () => {
    const newQ: ShortQuestion = {
      id: `short-custom-${Date.now()}`,
      question: "নতুন সংক্ষিপ্ত প্রশ্ন লিখুন...",
      answer: "সংক্ষিপ্ত প্রশ্নের নমুনা উত্তর।",
      marks: 3
    };
    setActiveExam({ ...activeExam, shortQuestions: [...activeExam.shortQuestions, newQ] });
  };
  const handleDeleteShort = (idx: number) => {
    setActiveExam({ ...activeExam, shortQuestions: activeExam.shortQuestions.filter((_, i) => i !== idx) });
  };

  // Broad Question Handlers
  const handleUpdateBroad = (idx: number, field: keyof BroadQuestion, value: any) => {
    const updated = [...activeExam.broadQuestions];
    updated[idx] = { ...updated[idx], [field]: value };
    setActiveExam({ ...activeExam, broadQuestions: updated });
  };
  const handleAddBroad = () => {
    const newB: BroadQuestion = {
      id: `broad-custom-${Date.now()}`,
      question: "নতুন বর্ণনামূলক অথবা সমস্যা সমাধান প্রশ্ন লিখুন...",
      answer: "বর্ণনামূলক প্রশ্নের বিস্তারিত উত্তর।",
      marks: 5
    };
    setActiveExam({ ...activeExam, broadQuestions: [...activeExam.broadQuestions, newB] });
  };
  const handleDeleteBroad = (idx: number) => {
    setActiveExam({ ...activeExam, broadQuestions: activeExam.broadQuestions.filter((_, i) => i !== idx) });
  };

  // Yuktaborno Handlers
  const handleUpdateYukta = (idx: number, field: keyof YuktabornoQuestion, value: any) => {
    const updated = [...(activeExam.yuktaborno || [])];
    updated[idx] = { ...updated[idx], [field]: value };
    setActiveExam({ ...activeExam, yuktaborno: updated });
  };
  const handleAddYukta = () => {
    const newY: YuktabornoQuestion = {
      id: `yukta-custom-${Date.now()}`,
      cluster: "ক্ষ",
      breakdown: "ক + ষ",
      word: "শিক্ষক",
      sentence: "শিক্ষক আমাদের আদর্শ পথ দেখান।",
      marks: 3
    };
    setActiveExam({ ...activeExam, yuktaborno: [...(activeExam.yuktaborno || []), newY] });
  };
  const handleDeleteYukta = (idx: number) => {
    setActiveExam({ ...activeExam, yuktaborno: (activeExam.yuktaborno || []).filter((_, i) => i !== idx) });
  };

  // Word Meaning Handlers
  const handleUpdateWord = (idx: number, field: keyof WordMeaningQuestion, value: any) => {
    const updated = [...(activeExam.wordMeaning || [])];
    updated[idx] = { ...updated[idx], [field]: value };
    setActiveExam({ ...activeExam, wordMeaning: updated });
  };
  const handleAddWord = () => {
    const newW: WordMeaningQuestion = {
      id: `word-custom-${Date.now()}`,
      word: "নতুন শব্দ",
      meaning: "শব্দের সহজ অর্থ",
      marks: 2
    };
    setActiveExam({ ...activeExam, wordMeaning: [...(activeExam.wordMeaning || []), newW] });
  };
  const handleDeleteWord = (idx: number) => {
    setActiveExam({ ...activeExam, wordMeaning: (activeExam.wordMeaning || []).filter((_, i) => i !== idx) });
  };

  // True / False Handlers (NCTB 2026 Official Item)
  const handleUpdateTrueFalse = (idx: number, field: keyof TrueFalseQuestion, value: any) => {
    const updated = [...(activeExam.trueFalse || [])];
    updated[idx] = { ...updated[idx], [field]: value };
    setActiveExam({ ...activeExam, trueFalse: updated });
  };
  const handleAddTrueFalse = () => {
    const newTf: TrueFalseQuestion = {
      id: `tf-custom-${Date.now()}`,
      statement: "নতুন বিবৃতি লিখুন...",
      isTrue: true,
      answer: "শুদ্ধ",
      marks: 1
    };
    setActiveExam({ ...activeExam, trueFalse: [...(activeExam.trueFalse || []), newTf] });
  };
  const handleDeleteTrueFalse = (idx: number) => {
    setActiveExam({ ...activeExam, trueFalse: (activeExam.trueFalse || []).filter((_, i) => i !== idx) });
  };

  // Real-time Dynamic Marks Calculation
  const mcqMarks = activeExam.mcq.reduce((acc, m) => acc + (Number(m.marks) || 0), 0);
  const fillMarks = activeExam.fillInTheBlanks.reduce((acc, f) => acc + (Number(f.marks) || 0), 0);
  const tfMarks = (activeExam.trueFalse || []).reduce((acc, tf) => acc + (Number(tf.marks) || 0), 0);
  const matchMarks = activeExam.matching.left.length > 0 ? (Number(activeExam.matching.marks) || 5) : 0;
  const yuktaMarks = (activeExam.yuktaborno || []).reduce((acc, y) => acc + (Number(y.marks) || 0), 0);
  const wordMarks = (activeExam.wordMeaning || []).reduce((acc, w) => acc + (Number(w.marks) || 0), 0);
  const shortMarks = activeExam.shortQuestions.reduce((acc, s) => acc + (Number(s.marks) || 0), 0);
  const broadMarks = activeExam.broadQuestions.reduce((acc, b) => acc + (Number(b.marks) || 0), 0);
  const rearrangeMarks = (activeExam.rearrange || []).reduce((acc, r) => acc + (Number(r.marks) || 0), 0);
  const oppositeMarks = (activeExam.oppositeWords || []).reduce((acc, o) => acc + (Number(o.marks) || 0), 0);
  const poemMarks = (activeExam.poemCompletion || []).reduce((acc, p) => acc + (Number(p.marks) || 0), 0);
  const oneWordMarks = (activeExam.oneWord || []).reduce((acc, o) => acc + (Number(o.marks) || 0), 0);
  const synonymMarks = (activeExam.synonyms || []).reduce((acc, s) => acc + (Number(s.marks) || 0), 0);
  const puncMarks = (activeExam.punctuation || []).reduce((acc, p) => acc + (Number(p.marks) || 0), 0);
  const whMarks = (activeExam.whQuestions || []).reduce((acc, w) => acc + (Number(w.marks) || 0), 0);
  const transMarks = (activeExam.translation || []).reduce((acc, t) => acc + (Number(t.marks) || 0), 0);
  const spellMarks = (activeExam.spelling || []).reduce((acc, s) => acc + (Number(s.marks) || 0), 0);
  const dialMarks = (activeExam.dialogue || []).reduce((acc, d) => acc + (Number(d.marks) || 0), 0);
  const formMarks = (activeExam.formFillup || []).reduce((acc, f) => acc + (Number(f.marks) || 0), 0);
  const mentalMarks = (activeExam.mentalMath || []).reduce((acc, m) => acc + (Number(m.marks) || 0), 0);
  const relationMarks = (activeExam.relationSymbols || []).reduce((acc, r) => acc + (Number(r.marks) || 0), 0);
  const placeValMarks = (activeExam.placeValue || []).reduce((acc, pv) => acc + (Number(pv.marks) || 0), 0);
  const inWordsMarks = (activeExam.inWords || []).reduce((acc, iw) => acc + (Number(iw.marks) || 0), 0);
  const geomMarks = (activeExam.geometry || []).reduce((acc, g) => acc + (Number(g.marks) || 0), 0);
  const timeMeasMarks = (activeExam.timeMeasurement || []).reduce((acc, tm) => acc + (Number(tm.marks) || 0), 0);
  const classMarks = (activeExam.classification || []).reduce((acc, c) => acc + (Number(c.marks) || 0), 0);
  const diffMarks = (activeExam.differences || []).reduce((acc, df) => acc + (Number(df.marks) || 0), 0);
  const causeMarks = (activeExam.causeEffect || []).reduce((acc, ce) => acc + (Number(ce.marks) || 0), 0);

  // 📖 Seen Comprehension Marks (ইংরেজি ও বাংলা বিষয়ের জন্য)
  const hasSeenSubject = selectedSubjectKey === "english" || selectedSubjectKey === "bangla";
  const seenPassage = hasSeenSubject ? activeExam.seenPassage : undefined;
  const seenMcqMarks = (seenPassage?.mcq || []).reduce((acc, m) => acc + (Number(m.marks) || 0), 0);
  const seenFillMarks = (seenPassage?.fillInTheBlanks || []).reduce((acc, f) => acc + (Number(f.marks) || 0), 0);
  const seenTfMarks = (seenPassage?.trueFalse || []).reduce((acc, tf) => acc + (Number(tf.marks) || 0), 0);
  const seenShortMarks = (seenPassage?.shortQuestions || []).reduce((acc, s) => acc + (Number(s.marks) || 0), 0);
  const seenTotalMarks = seenMcqMarks + seenFillMarks + seenTfMarks + seenShortMarks;

  const calculatedTotalMarks = (seenPassage ? seenTotalMarks : 0) + mcqMarks + fillMarks + tfMarks + matchMarks + yuktaMarks + wordMarks + shortMarks + broadMarks + rearrangeMarks + oppositeMarks + poemMarks + oneWordMarks + synonymMarks + puncMarks + whMarks + transMarks + spellMarks + dialMarks + formMarks + mentalMarks + relationMarks + placeValMarks + inWordsMarks + geomMarks + timeMeasMarks + classMarks + diffMarks + causeMarks;

  const classLabelText = 
    selectedClassId === "pre-primary" ? (isEnglish ? "Pre-Primary (4+ & 5+ Combined)" : "প্রাক-প্রাথমিক (৪+ ও ৫+ সমন্বিত)") :
    selectedClassId === "class-1" ? (isEnglish ? "Class 1" : "১ম শ্রেণি") : 
    selectedClassId === "class-2" ? (isEnglish ? "Class 2" : "২য় শ্রেণি") : 
    selectedClassId === "class-3" ? (isEnglish ? "Class 3" : "৩য় শ্রেণি") : 
    selectedClassId === "class-4" ? (isEnglish ? "Class 4" : "৪র্থ শ্রেণি") : (isEnglish ? "Class 5" : "৫ম শ্রেণি");

  // Browser Print (Student Copy vs Teacher Solution Copy)
  const handlePrint = (withAnswers: boolean = false) => {
    setPrintTeacherCopy(withAnswers);
    setTimeout(() => {
      window.print();
    }, 60);
  };

  // High-Fidelity MS Word (.doc) Exporter
  const handleExportWord = () => {
    const sheetEl = document.getElementById("printable-exam-sheet");
    if (!sheetEl) return;

    // Clone element to sanitize for Word without affecting live React DOM
    const clone = sheetEl.cloneNode(true) as HTMLElement;

    // 1. Remove interactive buttons, edit toolbars, delete icons
    clone.querySelectorAll("button, .print\\:hidden, svg, [aria-hidden='true']").forEach(el => el.remove());

    // 2. If in edit mode, replace input/textarea elements with their textual values
    clone.querySelectorAll("input, textarea").forEach((el: any) => {
      const span = document.createElement("span");
      span.innerText = el.value || "";
      el.parentNode?.replaceChild(span, el);
    });

    // 3. Remove answers if showAnswerKey is false
    if (!showAnswerKey) {
      clone.querySelectorAll(".bg-emerald-50, .text-emerald-700, .text-emerald-800").forEach(el => el.remove());
    }

    const contentHtml = clone.innerHTML;
    const wordDocument = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${schoolName} - ${classLabelText} - ${selectedSubjectName}</title>
        <style>
          @page { size: 21cm 29.7cm; margin: 1.5cm 1.5cm 1.5cm 1.5cm; mso-page-orientation: portrait; }
          body { font-family: 'Kalpurush', 'SolaimanLipi', 'SutonnyMJ', 'Nirmala UI', 'Arial', sans-serif; font-size: 11pt; line-height: 1.45; color: #111; }
          h2 { font-size: 16pt; font-weight: bold; margin: 0; padding: 0; text-align: center; }
          h3 { font-size: 13pt; font-weight: bold; margin: 4px 0; text-align: center; }
          p { margin: 4px 0; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 12px; }
          table { width: 100%; border-collapse: collapse; margin-top: 6px; margin-bottom: 8px; }
          th, td { border: 1px solid #444; padding: 6px; font-size: 10.5pt; text-align: left; vertical-align: top; }
          .dotted { border-bottom: 1px dashed #777; height: 18px; margin-top: 6px; margin-bottom: 6px; }
          .box-drawing { border: 2px dashed #999; height: 130px; text-align: center; padding-top: 50px; color: #777; margin: 8px 0; }
        </style>
      </head>
      <body>
        ${contentHtml}
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff" + wordDocument], { type: "application/msword;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${schoolName}_${classLabelText}_${selectedSubjectName}_প্রশ্নপত্র.doc`.replace(/\s+/g, "_");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("MS Word (.doc) ফাইল সফলভাবে প্রস্তুত হয়েছে!");
  };

  // Copy Plain Text
  const handleCopy = () => {
    let secIndex = (hasSeenSubject && activeExam.seenPassage) ? 5 : 1;
    let questionsText = "";

    if (hasSeenSubject && activeExam.seenPassage) {
      const sp = activeExam.seenPassage;
      const isBengali = selectedSubjectKey === "bangla";
      questionsText += (isBengali ? `ক - বিভাগ: পাঠ্যবইয়ের পাঠ্যাংশ বা অনুচ্ছেদভিত্তিক মূল্যায়ন (পূর্ণমান: ${seenTotalMarks})\n` : `PART - A: SEEN COMPREHENSION (Mark: ${seenTotalMarks})\n`) +
        (isBengali ? `নিচের অনুচ্ছেদটি মনোযোগ দিয়ে পড়ো এবং ১, ২, ৩ ও ৪ নং প্রশ্নের উত্তর দাও:\n` : `Read the text carefully and answer questions 1, 2, 3 and 4:\n`) +
        `"${sp.sourceText}"\n\n` +
        (isBengali ? `১. সঠিক উত্তরটি খাতায় লেখো:\n` : `1. Choose the best answer from the alternatives:\n`) +
        sp.mcq.map((m, i) => `   (${isBengali ? ['ক','খ','গ','ঘ'][i] || (i+1) : String.fromCharCode(97 + i)}) ${m.question}\n      ${isBengali ? 'ক)' : 'i)'} ${m.options[0]}  ${isBengali ? 'খ)' : 'ii)'} ${m.options[1]}  ${isBengali ? 'গ)' : 'iii)'} ${m.options[2]}  ${isBengali ? 'ঘ)' : 'iv)'} ${m.options[3]}`).join("\n") + "\n\n" +
        (isBengali ? `২. নিচের শব্দগুলো দিয়ে শূন্যস্থান পূরণ করো [${sp.clues.join(", ")}]:\n` : `2. Fill in the blanks with the given words from the box [${sp.clues.join(", ")}]:\n`) +
        sp.fillInTheBlanks.map((f, i) => `   (${isBengali ? ['ক','খ','গ','ঘ','ঙ'][i] || (i+1) : String.fromCharCode(97 + i)}) ${f.sentence}`).join("\n") + "\n\n" +
        (isBengali ? `৩. সত্য অথবা মিথ্যা নির্ণয় করো:\n` : `3. Write 'True' or 'False':\n`) +
        sp.trueFalse.map((tf, i) => `   (${isBengali ? ['ক','খ','গ','ঘ','ঙ'][i] || (i+1) : String.fromCharCode(97 + i)}) ${tf.statement}`).join("\n") + "\n\n" +
        (isBengali ? `৪. নিচের প্রশ্নগুলোর সংক্ষেপে উত্তর দাও:\n` : `4. Answer the following short questions:\n`) +
        sp.shortQuestions.map((q, i) => `   (${isBengali ? ['ক','খ','গ','ঘ','ঙ'][i] || (i+1) : String.fromCharCode(97 + i)}) ${q.question}`).join("\n") + "\n\n" +
        (isBengali ? `খ - বিভাগ: ব্যাকরণ, নির্মিতি ও অন্যান্য মূল্যায়ন\n` : `PART - B: GRAMMAR, VOCABULARY & WRITING\n`);
    }

    if (activeExam.mcq.length > 0) {
      questionsText += `\n${secIndex++}. সঠিক উত্তরটি খাতায় লেখ:\n` +
        activeExam.mcq.map((m, i) => `(${i + 1}) ${m.question}\n   ক. ${m.options[0]}   খ. ${m.options[1]}   গ. ${m.options[2]}   ঘ. ${m.options[3]}`).join("\n") + "\n";
    }

    if (activeExam.fillInTheBlanks.length > 0) {
      questionsText += `\n${secIndex++}. উপযুক্ত শব্দ দিয়ে শূন্যস্থান পূরণ করো:\n` +
        activeExam.fillInTheBlanks.map((f, i) => `(${i + 1}) ${f.sentence}`).join("\n") + "\n";
    }

    if (activeExam.trueFalse && activeExam.trueFalse.length > 0) {
      questionsText += `\n${secIndex++}. সত্য হলে 'শুদ্ধ' এবং মিথ্যা হলে 'অশুদ্ধ' লেখো:\n` +
        activeExam.trueFalse.map((tf, i) => `(${i + 1}) ${tf.statement}`).join("\n") + "\n";
    }

    if (activeExam.matching.left.length > 0) {
      questionsText += `\n${secIndex++}. বাম পাশের সাথে ডান পাশ মিল করো:\n` +
        activeExam.matching.left.map((l, i) => `(${i + 1}) ${l}  <--->  ${activeExam.matching.right[i]}`).join("\n") + "\n";
    }

    if (activeExam.wordMeaning && activeExam.wordMeaning.length > 0) {
      questionsText += `\n${secIndex++}. শব্দার্থ লেখো:\n` +
        activeExam.wordMeaning.map((w, i) => `(${i + 1}) ${w.word}`).join("\n") + "\n";
    }

    if (activeExam.yuktaborno && activeExam.yuktaborno.length > 0) {
      questionsText += `\n${secIndex++}. যুক্তবর্ণ ভেঙে শব্দ ও বাক্যে প্রয়োগ করো:\n` +
        activeExam.yuktaborno.map((y, i) => `(${i + 1}) ${y.cluster}`).join("\n") + "\n";
    }

    if (activeExam.shortQuestions.length > 0) {
      questionsText += `\n${secIndex++}. সংক্ষিপ্ত প্রশ্নের উত্তর দাও:\n` +
        activeExam.shortQuestions.map((q, i) => `(${i + 1}) ${q.question}`).join("\n") + "\n";
    }

    if (activeExam.broadQuestions.length > 0) {
      questionsText += `\n${secIndex++}. সমস্যা সমাধান ও বর্ণনামূলক প্রশ্ন:\n` +
        activeExam.broadQuestions.map((b, i) => `(${i + 1}) ${b.question}`).join("\n") + "\n";
    }

    const chaptersText = selectedChapterIds.length === 0 || selectedChapterIds.length === currentChapters.length 
      ? `সম্পূর্ণ বই` 
      : selectedLessonIds.length > 0 
      ? `${selectedChapterIds.length}টি ${unitLabel} (${selectedLessonIds.length}টি Lesson)`
      : `${selectedChapterIds.length}টি ${unitLabel}`;

    const text = `
${schoolName}
${examType}
শ্রেণি: ${classLabelText} | বিষয়: ${selectedSubjectName} | ${unitLabel}: ${chaptersText}
সময়: ${examTime} | পূর্ণমান: ${calculatedTotalMarks}

${questionsText.trim()}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast("ক্লিপবোর্ডে কপি করা হয়েছে!");
  };

  // Font size classes for paper sheet
  const fontSizeClasses = {
    compact: "text-xs sm:text-xs leading-snug",
    normal: "text-xs sm:text-sm leading-relaxed",
    large: "text-sm sm:text-base leading-loose"
  }[fontSize];

  let questionSectionCounter = seenPassage ? 5 : 1;

  return (
    <article 
      aria-labelledby="exam-maker-heading"
      className="bg-white rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200 shadow-xl space-y-6 sm:space-y-8 print:p-0 print:border-none print:shadow-none w-full"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Banner */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 print:hidden">
        <div className="flex items-center gap-3">
          <div 
            aria-hidden="true" 
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-emerald-600 flex items-center justify-center text-white text-2xl shadow-md shadow-sky-500/20 shrink-0"
          >
            📝
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 id="exam-maker-heading" className="text-xl sm:text-2xl font-black text-slate-900">
                স্মার্ট প্রশ্নপত্র ও ওয়ার্কশিট স্টুডিও
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                ডায়নামিক V2
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              এনসিটিবি প্রাথমিক শিক্ষাক্রমের আলোকে কাস্টমাইজেবল প্রশ্নপত্র ও হাতে লেখার ওয়ার্কশিট বিল্ডার
            </p>
          </div>
        </div>

        {/* Primary Action Controls */}
        <div className="flex items-center gap-2 self-start lg:self-auto flex-wrap">
          {/* ✨ AI Magic Generator Button */}
          <button
            type="button"
            onClick={() => setIsAiModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white shadow-md shadow-indigo-500/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>✨ এআই জেনারেটর</span>
          </button>

          {/* Edit Mode Toggle */}
          <button
            type="button"
            onClick={() => setIsEditMode(!isEditMode)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
              isEditMode
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20 hover:bg-amber-600"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>{isEditMode ? "✓ সম্পাদনা সম্পন্ন" : "প্রশ্ন সম্পাদনা মোড"}</span>
          </button>

          {/* Answer Key Toggle */}
          <button
            type="button"
            onClick={() => setShowAnswerKey(!showAnswerKey)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
              showAnswerKey
                ? "bg-emerald-100 text-emerald-900 hover:bg-emerald-200"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
            aria-pressed={showAnswerKey}
          >
            {showAnswerKey ? <EyeOff className="w-3.5 h-3.5 text-emerald-700" /> : <Eye className="w-3.5 h-3.5 text-slate-600" />}
            <span>{showAnswerKey ? "উত্তরমালা লুকান" : "উত্তরমালা দেখুন"}</span>
          </button>

          {/* Word Download */}
          <button
            type="button"
            onClick={handleExportWord}
            title="মাইক্রোসফট ওয়ার্ড (.doc) ফাইল ডাউনলোড করুন"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 border border-blue-200"
          >
            <FileDown className="w-3.5 h-3.5 text-blue-600" />
            <span>Word (.doc)</span>
          </button>

          {/* Copy Plain Text */}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "কপি হয়েছে!" : "কপি"}</span>
          </button>

          {/* Print / PDF Button Group */}
          <div className="inline-flex items-center rounded-xl shadow-md shadow-emerald-600/20">
            <button
              type="button"
              onClick={() => handlePrint(false)}
              title="শিক্ষার্থীদের জন্য পরিষ্কার প্রশ্নপত্র প্রিন্ট বা PDF করুন"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-l-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট / PDF</span>
            </button>
            <button
              type="button"
              onClick={() => handlePrint(true)}
              title="উত্তরমালাসহ শিক্ষকের সমাধান কপি প্রিন্ট করুন"
              className="inline-flex items-center gap-1 px-2.5 py-2 rounded-r-xl text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-emerald-100 border-l border-emerald-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
            >
              <span>+উত্তরমালা</span>
            </button>
          </div>
        </div>
      </header>

      {/* 🛠️ Dynamic Studio Toolbar (Mode, Layout, Storage) */}
      <section 
        aria-label="লেআউট ও স্টুডিও কন্ট্রোল" 
        className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-sky-50/60 to-emerald-50/60 border border-sky-100 print:hidden text-xs"
      >
        <div className="flex items-center gap-3 flex-wrap">
          {/* Mode Switch: Exam vs Worksheet */}
          <div className="flex items-center rounded-xl bg-white p-1 border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => setPaperMode("exam")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                paperMode === "exam"
                  ? "bg-sky-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>পরীক্ষার প্রশ্নপত্র</span>
            </button>
            <button
              type="button"
              onClick={() => setPaperMode("worksheet")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                paperMode === "worksheet"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>ওয়ার্কশিট (রুলটানা)</span>
            </button>
          </div>

          {/* Column Switch */}
          <div className="flex items-center rounded-xl bg-white p-1 border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => setColumnLayout(1)}
              className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                columnLayout === 1
                  ? "bg-slate-800 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ১ কলাম
            </button>
            <button
              type="button"
              onClick={() => setColumnLayout(2)}
              title="কাগজ সাশ্রয়ী ২-কলাম প্রিন্ট ফরম্যাট"
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                columnLayout === 2
                  ? "bg-slate-800 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span>২ কলাম (সাশ্রয়ী)</span>
            </button>
          </div>

          {/* Font Size Adjuster */}
          <div className="flex items-center gap-1 rounded-xl bg-white px-2.5 py-1 border border-slate-200 shadow-xs">
            <span className="text-[11px] text-slate-500 font-semibold">ফন্ট:</span>
            <button
              type="button"
              onClick={() => setFontSize("compact")}
              className={`px-2 py-0.5 rounded text-[11px] font-bold ${fontSize === "compact" ? "bg-slate-200 text-slate-900" : "text-slate-500 hover:text-slate-900"}`}
            >
              ছোট
            </button>
            <button
              type="button"
              onClick={() => setFontSize("normal")}
              className={`px-2 py-0.5 rounded text-[11px] font-bold ${fontSize === "normal" ? "bg-slate-200 text-slate-900" : "text-slate-500 hover:text-slate-900"}`}
            >
              মাঝারি
            </button>
            <button
              type="button"
              onClick={() => setFontSize("large")}
              className={`px-2 py-0.5 rounded text-[11px] font-bold ${fontSize === "large" ? "bg-slate-200 text-slate-900" : "text-slate-500 hover:text-slate-900"}`}
            >
              বড়
            </button>
          </div>
        </div>

        {/* Draft Storage & Reset Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSaveDraft}
            title="প্রশ্নপত্রটি ব্রাউজারের লোকাল স্টোরেজে সংরক্ষণ করুন"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-200 shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-slate-600" />
            <span>ড্রাফট সেভ</span>
          </button>
          <button
            type="button"
            onClick={handleLoadDraft}
            title="পূর্বে সংরক্ষিত ড্রাফট ফিরিয়ে আনুন"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-200 shadow-xs transition-colors"
          >
            লোড
          </button>
          <button
            type="button"
            onClick={handleResetToDefault}
            title="এনসিটিবি মূল ডিফল্ট প্রশ্নে ফিরিয়ে নিন"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold border border-rose-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>রিসেট</span>
          </button>
        </div>
      </section>

      {/* 🎯 প্রাথমিক নির্বাচন ও তথ্য ফর্ম (শ্রেণি, বিষয়, অধ্যায়, মূল্যায়ন ও প্রতিষ্ঠান) */}
      <form 
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-3.5 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 print:hidden text-xs font-semibold text-slate-700 shadow-xs"
        aria-label="প্রশ্নপত্র কাস্টমাইজেশন ফর্ম"
      >
        <div>
          <label htmlFor="class-select" className="block mb-1.5 text-slate-800 font-bold">
            শ্রেণি
          </label>
          <select
            id="class-select"
            value={selectedClassId}
            onChange={(e) => handleClassChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-base sm:text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="pre-primary">প্রাক-প্রাথমিক (৪+ ও ৫+)</option>
            <option value="class-1">১ম শ্রেণি</option>
            <option value="class-2">২য় শ্রেণি</option>
            <option value="class-3">৩য় শ্রেণি</option>
            <option value="class-4">৪র্থ শ্রেণি</option>
            <option value="class-5">৫ম শ্রেণি</option>
          </select>
        </div>

        <div>
          <label htmlFor="subject-select-exam" className="block mb-1.5 text-slate-800 font-bold">
            বিষয়
          </label>
          <select
            id="subject-select-exam"
            value={selectedSubjectKey}
            onChange={(e) => handleSubjectChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-base sm:text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {availableSubjects.map((sub) => (
              <option key={sub.key} value={sub.key}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* 📚 Multi-Chapter / Unit & Lesson Selector */}
        <div>
          <ChapterMultiSelect
            chapters={currentChapters}
            selectedIds={selectedChapterIds}
            selectedLessonIds={selectedLessonIds}
            onChange={(chIds, lIds) => {
              setSelectedChapterIds(chIds);
              setSelectedLessonIds(lIds);
              const generated = buildDynamicExamFromPool(selectedClassId, selectedSubjectKey, blueprint, chIds, lIds, seenConfig);
              setActiveExam(generated);
              showToast(`নির্বাচিত ${unitLabel} ও Lesson অনুযায়ী প্রশ্ন সাজানো হয়েছে!`);
            }}
            unitLabel={unitLabel}
          />
        </div>

        <div>
          <label htmlFor="exam-type-select" className="block mb-1.5 text-slate-800 font-bold">
            মূল্যায়নের ধরন
          </label>
          <select
            id="exam-type-select"
            value={examType}
            onChange={(e) => {
              const val = e.target.value;
              setExamType(val);
              if (val.includes("১ম প্রান্তিক") || val.includes("প্রান্তিক") || val.includes("অর্ধবার্ষিক")) {
                handleApplyPreset("nctb_summative");
              } else if (val.includes("বার্ষিক")) {
                handleApplyPreset("annual");
              } else if (val.includes("ক্লাস টেস্ট") || val.includes("ধারাবাহিক")) {
                handleApplyPreset("class_test");
              } else if (val.includes("ওয়ার্কশিট") || val.includes("অনুশীলন")) {
                handleApplyPreset("quiz");
              } else {
                handleApplyPreset("nctb_summative");
              }
            }}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-base sm:text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="১ম প্রান্তিক মূল্যায়ন ২০২৬">১ম প্রান্তিক মূল্যায়ন ২০২৬</option>
            <option value="২য় প্রান্তিক মূল্যায়ন ২০২৬">২য় প্রান্তিক মূল্যায়ন ২০২৬</option>
            <option value="৩য় প্রান্তিক মূল্যায়ন ২০২৬">৩য় প্রান্তিক মূল্যায়ন ২০২৬</option>
            <option value="অর্ধবার্ষিক পরীক্ষা ২০২৬">অর্ধবার্ষিক পরীক্ষা ২০২৬</option>
            <option value="বার্ষিক পরীক্ষা ২০২৬">বার্ষিক পরীক্ষা ২০২৬</option>
            <option value="ধারাবাহিক মূল্যায়ন ও ক্লাস টেস্ট">ধারাবাহিক মূল্যায়ন ও ক্লাস টেস্ট</option>
            <option value="দৈনিক অনুশীলন ওয়ার্কশিট">দৈনিক অনুশীলন ওয়ার্কশিট</option>
          </select>
        </div>

        <div>
          <label htmlFor="time-input" className="block mb-1.5 text-slate-800 font-bold">
            নির্ধারিত সময়
          </label>
          <input
            id="time-input"
            type="text"
            value={examTime}
            onChange={(e) => setExamTime(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-base sm:text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="xl:col-span-2">
          <label htmlFor="school-input" className="block mb-1.5 text-slate-800 font-bold">
            বিদ্যালয়ের নাম
          </label>
          <input
            id="school-input"
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-base sm:text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </form>

      {/* 🎛️ ডাইনামিক প্রশ্ন কাঠামো ও নম্বর বিন্যাস কন্ট্রোলার প্যানেল */}
      <ExamBlueprintPanel
        blueprint={blueprint}
        onChange={(updated) => {
          setBlueprint(updated);
          setSelectedPreset("custom");
        }}
        selectedPreset={selectedPreset}
        onSelectPreset={handleApplyPreset}
        onGenerate={handleGenerateWithBlueprint}
        classId={selectedClassId}
        subjectKey={selectedSubjectKey}
        seenConfig={seenConfig}
        onSeenConfigChange={(updatedSeen) => {
          setSeenConfig(updatedSeen);
          setSelectedPreset("custom");
          const generated = buildDynamicExamFromPool(selectedClassId, selectedSubjectKey, blueprint, selectedChapterIds, selectedLessonIds, updatedSeen);
          setActiveExam(generated);
        }}
      />

      {/* 📄 Print-Ready Question Paper Sheet (A4 Responsive) */}
      <section 
        id="printable-exam-sheet"
        aria-label="প্রস্তুতকৃত পরীক্ষার প্রশ্নপত্র ও ওয়ার্কশিট"
        data-paper-card="true"
        className={`max-w-4xl mx-auto p-6 sm:p-12 rounded-2xl bg-white border border-slate-300 text-slate-900 shadow-sm print:p-0 print:border-none print:shadow-none print:max-w-none font-sans transition-colors ${fontSizeClasses}`}
      >
        {/* Institutional Exam Header */}
        <header className="header text-center pb-4 border-b-2 border-slate-900 space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{schoolName}</h2>
          <p className="text-base sm:text-lg font-bold text-slate-800">{examType}</p>
          <div className="flex items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700 pt-1 flex-wrap">
            <span>শ্রেণি: <strong>{classLabelText}</strong></span>
            <span aria-hidden="true">•</span>
            <span>বিষয়: <strong>{selectedSubjectName}</strong></span>
            <span aria-hidden="true">•</span>
            <span>{unitLabel}: <strong>{selectedChapterIds.length === 0 || selectedChapterIds.length === currentChapters.length ? "সম্পূর্ণ বই" : selectedLessonIds.length > 0 ? `${selectedChapterIds.length}টি ${unitLabel} (${selectedLessonIds.length}টি Lesson)` : `${selectedChapterIds.length}টি ${unitLabel}`}</strong></span>
            <span aria-hidden="true">•</span>
            <span>সময়: <strong>{examTime}</strong></span>
            <span aria-hidden="true">•</span>
            <span>পূর্ণমান: <strong>{calculatedTotalMarks}</strong></span>
            {selectedPreset === "nctb_summative" && (
              <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 border border-emerald-300 rounded-md px-2 py-0.5 print:hidden">
                ✓ এনসিটিবি ২০২৬ সরকারি কাঠামো
              </span>
            )}
          </div>
        </header>

        {/* Student Info Box */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 py-3 border-b border-slate-300 text-xs text-slate-700 font-medium">
          <div className="sm:col-span-2 border-b sm:border-b-0 sm:border-r border-slate-200 pb-2 sm:pb-0 flex items-center gap-1.5 min-w-0">
            <span className="shrink-0 font-bold">শিক্ষার্থীর নাম:</span>
            <span className="border-b border-dotted border-slate-400 flex-1 min-w-[70px] h-3"></span>
          </div>
          <div className="border-b sm:border-b-0 sm:border-r border-slate-200 pb-2 sm:pb-0 sm:px-2 flex items-center gap-2 min-w-0">
            <span className="shrink-0 font-bold">রোল:</span>
            <span className="border-b border-dotted border-slate-400 w-12 h-3"></span>
            <span className="shrink-0 ml-1 font-bold">শাখা:</span>
            <span className="border-b border-dotted border-slate-400 flex-1 min-w-[35px] h-3"></span>
          </div>
          <div className="flex items-center sm:justify-end gap-1.5 min-w-0">
            <span className="shrink-0 font-bold">{paperMode === "worksheet" ? "প্রাপ্ত নম্বর:" : "তারিখ:"}</span>
            <span className="border-b border-dotted border-slate-400 w-24 h-3"></span>
          </div>
        </div>

        {/* General Instructions */}
        <div className="pt-2.5 pb-2 text-[11px] sm:text-xs text-slate-600 text-center font-medium">
          {paperMode === "worksheet" 
            ? (isEnglish 
                ? "[ Instructions: Write your answers directly on the question sheet in the spaces provided. ]"
                : "[ নির্দেশিকা: প্রতিটি প্রশ্নের উত্তর নির্ধারিত ফাঁকা জায়গায় সুন্দর হস্তাক্ষরে লেখো। ]")
            : "[ দ্রষ্টব্য: ডান পাশের সংখ্যা প্রশ্নের পূর্ণমান জ্ঞাপক। সকল প্রশ্নের উত্তর দেওয়া আবশ্যক। ]"}
        </div>

        {/* Question Sections Layout (1 Column vs 2 Column) */}
        <div className={`pt-4 ${columnLayout === 2 ? "columns-1 md:columns-2 print:columns-2 gap-8 [column-fill:_auto]" : "space-y-6"}`}>
          
          {/* ========================================================= */}
          {/* 📖 PART - A: SEEN COMPREHENSION (পাঠ্যবইয়ের অনুচ্ছেদ ভিত্তিক মূল্যায়ন) */}
          {/* ========================================================= */}
          {seenPassage && (
            <section aria-labelledby="sec-seen-part-a" className="space-y-6 mb-8 p-4 sm:p-6 rounded-2xl border-2 border-slate-900 bg-amber-50/20">
              {/* Part A Header */}
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-900 text-white text-xs font-black px-2.5 py-1 rounded">
                    {selectedSubjectKey === "bangla" ? "ক - বিভাগ" : "PART - A"}
                  </span>
                  <h3 id="sec-seen-part-a" className="font-black text-sm sm:text-base text-slate-900 tracking-wide uppercase">
                    {selectedSubjectKey === "bangla" ? "পাঠ্যবইয়ের পাঠ্যাংশ বা অনুচ্ছেদভিত্তিক মূল্যায়ন" : "SEEN COMPREHENSION (পাঠ্যাংশ ভিত্তিক মূল্যায়ন)"}
                  </h3>
                </div>
                <span className="text-xs font-black bg-white border border-slate-300 px-2.5 py-1 rounded shadow-2xs">
                  পূর্ণমান: {seenTotalMarks}
                </span>
              </div>

              {/* Passage Presentation Card */}
              <div className="p-4 sm:p-5 rounded-xl border border-amber-300/80 bg-amber-50/50 text-slate-900 space-y-2 break-inside-avoid">
                <div className="border-b border-amber-200/70 pb-1.5">
                  <span className="italic font-serif text-xs font-bold text-slate-700">
                    {selectedSubjectKey === "bangla"
                      ? "নিচের অনুচ্ছেদটি মনোযোগ দিয়ে পড়ো এবং ১, ২, ৩ ও ৪ নং প্রশ্নের উত্তর দাও:"
                      : "Read the text carefully and answer questions 1, 2, 3 and 4:"}
                  </span>
                </div>
                {isEditMode ? (
                  <textarea
                    value={seenPassage.sourceText}
                    onChange={(e) => {
                      setActiveExam({
                        ...activeExam,
                        seenPassage: {
                          ...seenPassage,
                          sourceText: e.target.value
                        }
                      });
                    }}
                    rows={4}
                    className="w-full text-xs sm:text-sm font-serif p-2 border border-sky-300 rounded bg-sky-50/40"
                  />
                ) : (
                  <p className="text-xs sm:text-sm leading-relaxed font-serif text-slate-800 text-justify">
                    {seenPassage.sourceText}
                  </p>
                )}
              </div>

              {/* Sub-Question 1: MCQ */}
              {seenPassage.mcq && seenPassage.mcq.length > 0 && (
                <div className="space-y-3 pt-2 break-inside-avoid">
                  <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                    <h4 className="text-xs sm:text-sm">
                      {selectedSubjectKey === "bangla" ? "১. সঠিক উত্তরটি খাতায় লেখো:" : "1. Choose the best answer from the alternatives:"}
                    </h4>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                      {(seenPassage.mcq[0]?.marks || 1)} × {seenPassage.mcq.length} = {seenMcqMarks}
                    </span>
                  </div>
                  <ol className="space-y-3 pl-4 list-[lower-alpha]">
                    {seenPassage.mcq.map((m, idx) => (
                      <li key={m.id || idx} className="space-y-1">
                        <p className="font-semibold">{m.question}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5 text-xs">
                          {m.options.map((opt, oIdx) => {
                            const roman = oIdx === 0 ? "i" : oIdx === 1 ? "ii" : oIdx === 2 ? "iii" : "iv";
                            return (
                              <div key={oIdx} className="flex items-center gap-1.5">
                                <span className="text-slate-500 font-bold">({roman})</span>
                                <span className="text-slate-800">{opt}</span>
                              </div>
                            );
                          })}
                        </div>
                        {paperMode === "worksheet" && (
                          <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 font-medium">
                            <span>{selectedSubjectKey === "bangla" ? "উত্তর: " : "Ans: "}</span>
                            <span className="border-b border-dashed border-slate-400 flex-1 max-w-[140px] h-3"></span>
                          </div>
                        )}
                        {showAnswerKey && (
                          <div className={`mt-1 text-xs text-emerald-700 ${!printTeacherCopy ? "print:hidden" : ""} font-bold bg-emerald-50 p-1 rounded inline-block`}>
                            ✓ Ans: {m.answer}
                          </div>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Sub-Question 2: Fill in the blanks with clue box */}
              {seenPassage.fillInTheBlanks && seenPassage.fillInTheBlanks.length > 0 && (
                <div className="space-y-3 pt-2 break-inside-avoid">
                  <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                    <h4 className="text-xs sm:text-sm">
                      {selectedSubjectKey === "bangla" ? "২. প্রদত্ত শব্দগুলো দিয়ে শূন্যস্থান পূরণ করো:" : "2. Fill in the blanks with the given words from the box:"}
                    </h4>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                      {(seenPassage.fillInTheBlanks[0]?.marks || 1)} × {seenPassage.fillInTheBlanks.length} = {seenFillMarks}
                    </span>
                  </div>
                  {/* Clues Box */}
                  <div className="p-2 sm:p-2.5 bg-white border-2 border-dashed border-amber-300 rounded-xl flex items-center justify-center gap-2 sm:gap-4 flex-wrap text-xs font-semibold text-slate-800">
                    {seenPassage.clues.map((clue, cIdx) => (
                      <span key={cIdx} className="bg-amber-50/70 border border-amber-200 px-2.5 py-0.5 rounded-md">
                        {clue}
                      </span>
                    ))}
                  </div>
                  <ol className="space-y-2.5 pl-4 list-[lower-alpha]">
                    {seenPassage.fillInTheBlanks.map((f, idx) => (
                      <li key={f.id || idx} className="space-y-1">
                        <span>{f.sentence}</span>
                        {showAnswerKey && (
                          <span className="ml-2 text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                            [ Ans: {f.answer} ]
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Sub-Question 3: True / False */}
              {seenPassage.trueFalse && seenPassage.trueFalse.length > 0 && (
                <div className="space-y-3 pt-2 break-inside-avoid">
                  <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                    <h4 className="text-xs sm:text-sm">
                      {selectedSubjectKey === "bangla" ? "৩. সত্য অথবা মিথ্যা নির্ণয় করো:" : "3. Write 'True' for correct statement or 'False' for incorrect statement:"}
                    </h4>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                      {(seenPassage.trueFalse[0]?.marks || 1)} × {seenPassage.trueFalse.length} = {seenTfMarks}
                    </span>
                  </div>
                  <ol className="space-y-2.5 pl-4 list-[lower-alpha]">
                    {seenPassage.trueFalse.map((tf, idx) => (
                      <li key={tf.id || idx} className="space-y-1">
                        <div className="flex items-center justify-between w-full">
                          <p className="font-semibold">{tf.statement}</p>
                          <span className="text-slate-400 font-mono tracking-wider ml-2 shrink-0">................</span>
                        </div>
                        {showAnswerKey && (
                          <span className={`text-xs text-emerald-700 ${!printTeacherCopy ? "print:hidden" : ""} font-bold bg-emerald-50 px-2 py-0.5 rounded-md inline-block`}>
                            [ {selectedSubjectKey === "bangla" ? "উত্তর: " : "Ans: "}{selectedSubjectKey === "bangla" ? (tf.isTrue ? "শুদ্ধ" : "অশুদ্ধ") : (tf.isTrue ? "True" : tf.answer || "False")} ]
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Sub-Question 4: Short Answer Questions */}
              {seenPassage.shortQuestions && seenPassage.shortQuestions.length > 0 && (
                <div className="space-y-3 pt-2 break-inside-avoid">
                  <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                    <h4 className="text-xs sm:text-sm">
                      {selectedSubjectKey === "bangla" ? "৪. নিচের প্রশ্নগুলোর সংক্ষেপে উত্তর দাও:" : "4. Answer the following short questions in one or two sentences:"}
                    </h4>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                      {(seenPassage.shortQuestions[0]?.marks || 2)} × {seenPassage.shortQuestions.length} = {seenShortMarks}
                    </span>
                  </div>
                  <ol className="space-y-3 pl-4 list-[lower-alpha]">
                    {seenPassage.shortQuestions.map((q, idx) => (
                      <li key={q.id || idx} className="space-y-1">
                        <p className="font-semibold">{q.question}</p>
                        {paperMode === "worksheet" && (
                          <div className="space-y-1.5 pt-1">
                            <div className="border-b border-dashed border-slate-400 h-4 w-full"></div>
                            <div className="border-b border-dashed border-slate-400 h-4 w-full"></div>
                          </div>
                        )}
                        {showAnswerKey && (
                          <div className={`mt-1 text-xs text-emerald-800 ${!printTeacherCopy ? "print:hidden" : ""} bg-emerald-50 p-2 rounded-md font-medium border border-emerald-200`}>
                            <strong>Ans:</strong> {q.answer}
                          </div>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </section>
          )}

          {/* PART - B Header */}
          {seenPassage && (
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2 mb-6 break-inside-avoid">
              <div className="flex items-center gap-2">
                <span className="bg-slate-900 text-white text-xs font-black px-2.5 py-1 rounded">
                  {selectedSubjectKey === "bangla" ? "খ - বিভাগ" : "PART - B"}
                </span>
                <h3 className="font-black text-sm sm:text-base text-slate-900 tracking-wide uppercase">
                  {selectedSubjectKey === "bangla" ? "ব্যাকরণ, নির্মিতি ও অন্যান্য মূল্যায়ন" : "GRAMMAR, VOCABULARY & WRITING (ভাষাগত দক্ষতা ও অন্যান্য)"}
                </h3>
              </div>
            </div>
          )}
          
          {/* ১. বহুনির্বাচনি প্রশ্ন (MCQ) */}
          {activeExam.mcq.length > 0 && (
            <section aria-labelledby="sec-mcq" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <div className="flex items-center gap-2">
                  <h4 id="sec-mcq">
                    {questionSectionCounter++}. {isEnglish ? "Choose the correct answer:" : "সঠিক উত্তরটি খাতায় লেখ:"}
                  </h4>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={handleAddMcq}
                      className="print:hidden text-[10px] bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold px-2 py-0.5 rounded-md border border-sky-200 inline-flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> প্রশ্ন যোগ
                    </button>
                  )}
                </div>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.mcq[0]?.marks || 2)} × {activeExam.mcq.length} = {mcqMarks}
                </span>
              </div>
              <ol className="space-y-3 pl-4 list-decimal">
                {activeExam.mcq.map((m, idx) => (
                  <li key={m.id || idx} className="space-y-1 group">
                    <div className="flex items-start justify-between gap-2">
                      {isEditMode ? (
                        <input
                          type="text"
                          value={m.question}
                          onChange={(e) => handleUpdateMcq(idx, "question", e.target.value)}
                          className="w-full text-xs sm:text-sm font-semibold p-1 border border-sky-300 rounded bg-sky-50/40"
                        />
                      ) : (
                        <p className="font-semibold">{m.question}</p>
                      )}

                      {/* Edit Mode Action Tools */}
                      {isEditMode && (
                        <div className="flex items-center gap-1 shrink-0 print:hidden">
                          <button
                            type="button"
                            onClick={() => setActiveExam({ ...activeExam, mcq: moveItem(activeExam.mcq, idx, "up") })}
                            disabled={idx === 0}
                            className="p-1 rounded hover:bg-slate-200 disabled:opacity-30"
                          >
                            <ArrowUp className="w-3 h-3 text-slate-700" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveExam({ ...activeExam, mcq: moveItem(activeExam.mcq, idx, "down") })}
                            disabled={idx === activeExam.mcq.length - 1}
                            className="p-1 rounded hover:bg-slate-200 disabled:opacity-30"
                          >
                            <ArrowDown className="w-3 h-3 text-slate-700" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMcq(idx)}
                            className="p-1 rounded hover:bg-rose-100 text-rose-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* MCQ Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5 text-xs">
                      {m.options.map((opt, oIdx) => {
                        const prefix = isEnglish 
                          ? String.fromCharCode(97 + oIdx) 
                          : (oIdx === 0 ? "ক" : oIdx === 1 ? "খ" : oIdx === 2 ? "গ" : "ঘ");
                        return (
                          <div key={oIdx} className="flex items-center gap-1.5">
                            <span className="text-slate-600 shrink-0 font-bold">({prefix})</span>
                            {isEditMode ? (
                              <input
                                type="text"
                                value={opt}
                                onChange={(e) => handleUpdateMcqOption(idx, oIdx, e.target.value)}
                                className="w-full text-xs p-1 border border-slate-300 rounded bg-white"
                              />
                            ) : (
                              <span className="text-slate-800">{opt}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Worksheet Handwriting Line for MCQ */}
                    {paperMode === "worksheet" && (
                      <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 font-medium">
                        <span>{isEnglish ? "Ans: " : "উত্তর: "}</span>
                        <span className="border-b border-dashed border-slate-400 flex-1 max-w-[120px] h-3"></span>
                      </div>
                    )}

                    {/* Answer Key Display */}
                    {showAnswerKey && (
                      <div className={`mt-1 text-xs text-emerald-700 ${!printTeacherCopy ? "print:hidden" : ""} font-bold bg-emerald-50 p-1.5 rounded-md inline-block`}>
                        ✓ {isEnglish ? "Correct Ans: " : "সঠিক উত্তর: "}{m.answer}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* ২. শূন্যস্থান পূরণ */}
          {activeExam.fillInTheBlanks.length > 0 && (
            <section aria-labelledby="sec-fill" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <div className="flex items-center gap-2">
                  <h4 id="sec-fill">
                    {questionSectionCounter++}. {isEnglish ? "Fill in the blanks with suitable words:" : "উপযুক্ত শব্দ দিয়ে শূন্যস্থান পূরণ করো:"}
                  </h4>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={handleAddFill}
                      className="print:hidden text-[10px] bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold px-2 py-0.5 rounded-md border border-sky-200 inline-flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> প্রশ্ন যোগ
                    </button>
                  )}
                </div>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.fillInTheBlanks[0]?.marks || 2)} × {activeExam.fillInTheBlanks.length} = {fillMarks}
                </span>
              </div>
              <ol className="space-y-2.5 pl-4 list-decimal">
                {activeExam.fillInTheBlanks.map((f, idx) => (
                  <li key={f.id || idx} className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      {isEditMode ? (
                        <input
                          type="text"
                          value={f.sentence}
                          onChange={(e) => handleUpdateFill(idx, "sentence", e.target.value)}
                          className="w-full text-xs sm:text-sm p-1 border border-sky-300 rounded bg-sky-50/40 font-medium"
                        />
                      ) : (
                        <span>{f.sentence}</span>
                      )}

                      {isEditMode && (
                        <div className="flex items-center gap-1 shrink-0 print:hidden">
                          <button
                            type="button"
                            onClick={() => setActiveExam({ ...activeExam, fillInTheBlanks: moveItem(activeExam.fillInTheBlanks, idx, "up") })}
                            disabled={idx === 0}
                            className="p-1 rounded hover:bg-slate-200 disabled:opacity-30"
                          >
                            <ArrowUp className="w-3 h-3 text-slate-700" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveExam({ ...activeExam, fillInTheBlanks: moveItem(activeExam.fillInTheBlanks, idx, "down") })}
                            disabled={idx === activeExam.fillInTheBlanks.length - 1}
                            className="p-1 rounded hover:bg-slate-200 disabled:opacity-30"
                          >
                            <ArrowDown className="w-3 h-3 text-slate-700" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteFill(idx)}
                            className="p-1 rounded hover:bg-rose-100 text-rose-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Answer Key Display */}
                    {showAnswerKey && (
                      <span className="ml-2 text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                        [ {isEnglish ? "Ans: " : "উত্তর: "}{f.answer} ]
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* ৩. সত্য হলে 'শুদ্ধ' এবং মিথ্যা হলে 'অশুদ্ধ' নির্বাচন (NCTB 2026 Official Item) */}
          {activeExam.trueFalse && activeExam.trueFalse.length > 0 && (
            <section aria-labelledby="sec-tf" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <div className="flex items-center gap-2">
                  <h4 id="sec-tf">
                    {questionSectionCounter++}. {isEnglish ? "Write 'True' for correct statement or 'False' for incorrect statement:" : "সত্য হলে 'শুদ্ধ' এবং মিথ্যা হলে 'অশুদ্ধ' লেখো:"}
                  </h4>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={handleAddTrueFalse}
                      className="print:hidden text-[10px] bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold px-2 py-0.5 rounded-md border border-sky-200 inline-flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> প্রশ্ন যোগ
                    </button>
                  )}
                </div>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.trueFalse[0]?.marks || 1)} × {activeExam.trueFalse.length} = {tfMarks}
                </span>
              </div>
              <ol className="space-y-2.5 pl-4 list-decimal">
                {activeExam.trueFalse.map((tf, idx) => (
                  <li key={tf.id || idx} className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      {isEditMode ? (
                        <div className="w-full flex items-center gap-2">
                          <input
                            type="text"
                            value={tf.statement}
                            onChange={(e) => handleUpdateTrueFalse(idx, "statement", e.target.value)}
                            className="flex-1 text-xs sm:text-sm font-semibold p-1 border border-sky-300 rounded bg-sky-50/40"
                          />
                          <select
                            value={tf.isTrue ? "true" : "false"}
                            onChange={(e) => handleUpdateTrueFalse(idx, "isTrue", e.target.value === "true")}
                            className="text-xs p-1 border border-slate-300 rounded bg-white"
                          >
                            <option value="true">{isEnglish ? "True" : "শুদ্ধ"}</option>
                            <option value="false">{isEnglish ? "False" : "অশুদ্ধ"}</option>
                          </select>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <p className="font-semibold">{tf.statement}</p>
                          <span className="text-slate-400 font-mono tracking-wider ml-2 shrink-0">................</span>
                        </div>
                      )}

                      {isEditMode && (
                        <div className="flex items-center gap-1 shrink-0 print:hidden">
                          <button
                            type="button"
                            onClick={() => handleDeleteTrueFalse(idx)}
                            className="p-1 rounded hover:bg-rose-100 text-rose-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    {showAnswerKey && (
                      <span className={`text-xs text-emerald-700 ${!printTeacherCopy ? "print:hidden" : ""} font-bold bg-emerald-50 px-2 py-0.5 rounded-md inline-block`}>
                        [ {isEnglish ? "Ans: " : "উত্তর: "}{isEnglish ? (tf.isTrue ? "True" : "False") : (tf.isTrue ? "শুদ্ধ" : "অশুদ্ধ")} ]
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* ৪. বাম-ডান মিলকরণ */}
          {activeExam.matching.left.length > 0 && (
            <section aria-labelledby="sec-matching" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <div className="flex items-center gap-2">
                  <h4 id="sec-matching">
                    {questionSectionCounter++}. {isEnglish ? "Match the items of Column A with Column B:" : "বাম পাশের সাথে ডান পাশ মিল করো:"}
                  </h4>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={handleAddMatchingRow}
                      className="print:hidden text-[10px] bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold px-2 py-0.5 rounded-md border border-sky-200 inline-flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> সারি যোগ
                    </button>
                  )}
                </div>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {activeExam.matching.left.length > 0 ? ((matchMarks / activeExam.matching.left.length) % 1 === 0 ? (matchMarks / activeExam.matching.left.length) : (matchMarks / activeExam.matching.left.length).toFixed(1)) : 1} × {activeExam.matching.left.length} = {matchMarks}
                </span>
              </div>
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-xs sm:text-sm border border-slate-300">
                  <caption className="sr-only">বাম-ডান মিলকরণ ছক</caption>
                  <thead className="bg-slate-100 border-b border-slate-300">
                    <tr>
                      <th scope="col" className="p-2 border-r border-slate-300 w-1/2 font-bold">{isEnglish ? "Column A" : "বাম পাশ (ক)"}</th>
                      <th scope="col" className="p-2 w-1/2 font-bold">{isEnglish ? "Column B" : "ডান পাশ (খ)"}</th>
                      {isEditMode && <th scope="col" className="p-2 w-12 print:hidden font-bold">টুল</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {activeExam.matching.left.map((lItem, idx) => (
                      <tr key={idx}>
                        <td className="p-2 border-r border-slate-300">
                          {isEditMode ? (
                            <input
                              type="text"
                              value={lItem}
                              onChange={(e) => handleUpdateMatchingLeft(idx, e.target.value)}
                              className="w-full text-xs p-1 border border-slate-300 rounded bg-white"
                            />
                          ) : (
                            <span>({idx + 1}) {lItem}</span>
                          )}
                        </td>
                        <td className="p-2">
                          {isEditMode ? (
                            <input
                              type="text"
                              value={activeExam.matching.right[idx] || ""}
                              onChange={(e) => handleUpdateMatchingRight(idx, e.target.value)}
                              className="w-full text-xs p-1 border border-slate-300 rounded bg-white"
                            />
                          ) : (
                            <span>({String.fromCharCode(97 + idx)}) {activeExam.matching.right[idx]}</span>
                          )}
                        </td>
                        {isEditMode && (
                          <td className="p-2 text-center print:hidden">
                            <button
                              type="button"
                              onClick={() => handleDeleteMatchingRow(idx)}
                              className="p-1 rounded hover:bg-rose-100 text-rose-600"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {paperMode === "worksheet" && (
                <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-slate-700 flex-wrap">
                  <span className="font-bold">{isEnglish ? "Answer Matching:" : "উত্তর মেলানো:"}</span>
                  {activeExam.matching.left.map((_, mIdx) => (
                    <span key={mIdx} className="px-2.5 py-0.5 border border-slate-300 rounded bg-white font-mono shadow-2xs">
                      ({mIdx + 1}) + [ &nbsp;&nbsp;&nbsp;&nbsp; ]
                    </span>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ৪. শব্দার্থ (যদি থাকে) */}
          {activeExam.wordMeaning && activeExam.wordMeaning.length > 0 && (
            <section aria-labelledby="sec-words" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <div className="flex items-center gap-2">
                  <h4 id="sec-words">
                    {questionSectionCounter++}. {isEnglish ? "Write the Bengali meanings of the following words:" : "নিচের শব্দগুলোর অর্থ লেখো:"}
                  </h4>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={handleAddWord}
                      className="print:hidden text-[10px] bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold px-2 py-0.5 rounded-md border border-sky-200 inline-flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> শব্দ যোগ
                    </button>
                  )}
                </div>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.wordMeaning[0]?.marks || 2)} × {activeExam.wordMeaning.length} = {wordMarks}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeExam.wordMeaning.map((w, idx) => (
                  <div key={w.id || idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1">
                    <div className="flex items-center justify-between">
                      {isEditMode ? (
                        <input
                          type="text"
                          value={w.word}
                          onChange={(e) => handleUpdateWord(idx, "word", e.target.value)}
                          className="w-full text-xs font-bold p-1 border border-slate-300 rounded bg-white"
                        />
                      ) : (
                        <p className="font-bold text-slate-800">({idx + 1}) {w.word}</p>
                      )}

                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => handleDeleteWord(idx)}
                          className="p-1 rounded hover:bg-rose-100 text-rose-600 print:hidden shrink-0 ml-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {paperMode === "worksheet" && (
                      <div className="border-b border-dashed border-slate-400 h-4 w-full mt-1"></div>
                    )}

                    {showAnswerKey && (
                      <p className="text-xs text-emerald-700 font-semibold mt-1">
                        {isEnglish ? "Meaning: " : "অর্থ: "}{w.meaning}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ৫. যুক্তবর্ণ ভেঙে বাক্য গঠন (যদি থাকে) */}
          {activeExam.yuktaborno && activeExam.yuktaborno.length > 0 && (
            <section aria-labelledby="sec-yukta" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <div className="flex items-center gap-2">
                  <h4 id="sec-yukta">{questionSectionCounter++}. যুক্তবর্ণ ভেঙে শব্দ ও বাক্যে প্রয়োগ করো:</h4>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={handleAddYukta}
                      className="print:hidden text-[10px] bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold px-2 py-0.5 rounded-md border border-sky-200 inline-flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> যুক্তবর্ণ যোগ
                    </button>
                  )}
                </div>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.yuktaborno[0]?.marks || 3)} × {activeExam.yuktaborno.length} = {yuktaMarks}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeExam.yuktaborno.map((y, idx) => (
                  <div key={y.id || idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1">
                    <div className="flex items-center justify-between">
                      {isEditMode ? (
                        <input
                          type="text"
                          value={y.cluster}
                          onChange={(e) => handleUpdateYukta(idx, "cluster", e.target.value)}
                          className="w-20 text-sm font-bold p-1 border border-slate-300 rounded bg-white text-sky-800"
                        />
                      ) : (
                        <p className="font-bold text-base text-sky-800">({idx + 1}) {y.cluster}</p>
                      )}

                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => handleDeleteYukta(idx)}
                          className="p-1 rounded hover:bg-rose-100 text-rose-600 print:hidden"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {paperMode === "worksheet" && (
                      <div className="space-y-1.5 pt-1">
                        <div className="border-b border-dashed border-slate-400 h-4 w-full flex items-center text-[10px] text-slate-400">ভেঙে:</div>
                        <div className="border-b border-dashed border-slate-400 h-4 w-full flex items-center text-[10px] text-slate-400">শব্দ ও বাক্য:</div>
                      </div>
                    )}

                    {showAnswerKey && (
                      <div className="text-xs text-emerald-800 space-y-0.5 pt-1">
                        <p><strong>ভাঙলে হয়:</strong> {y.breakdown}</p>
                        <p><strong>শব্দ:</strong> {y.word}</p>
                        <p><strong>বাক্য:</strong> {y.sentence}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ৬. Rearrange / বাক্য পুনর্বিন্যাস (যদি থাকে) */}
          {activeExam.rearrange && activeExam.rearrange.length > 0 && (
            <section aria-labelledby="sec-rearrange" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <div className="flex items-center gap-2">
                  <h4 id="sec-rearrange">
                    {questionSectionCounter++}. {isEnglish ? "Rearrange the words in correct order to make meaningful sentences:" : "এলোমেলো শব্দগুলো সাজিয়ে অর্থপূর্ণ বাক্য তৈরি করো:"}
                  </h4>
                </div>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.rearrange[0]?.marks || 1)} × {activeExam.rearrange.length} = {rearrangeMarks}
                </span>
              </div>
              <div className="space-y-2.5">
                {activeExam.rearrange.map((r, idx) => (
                  <div key={r.id || idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col gap-1">
                    <p className="font-semibold text-slate-800 text-sm">
                      ({idx + 1}) <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-300 text-slate-700">{r.jumbled}</span>
                    </p>
                    {paperMode === "worksheet" && (
                      <div className="border-b border-dashed border-slate-400 h-5 w-full mt-1"></div>
                    )}
                    {showAnswerKey && (
                      <p className="text-xs text-emerald-700 font-bold mt-0.5">
                        সঠিক বাক্য: {r.correct}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ৭. বিপরীত শব্দ লিখন (যদি থাকে) */}
          {activeExam.oppositeWords && activeExam.oppositeWords.length > 0 && (
            <section aria-labelledby="sec-opposite" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <div className="flex items-center gap-2">
                  <h4 id="sec-opposite">
                    {questionSectionCounter++}. {isEnglish ? "Write the opposite words for the following:" : "প্রদত্ত শব্দগুলোর বিপরীত শব্দ লেখো:"}
                  </h4>
                </div>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.oppositeWords[0]?.marks || 1)} × {activeExam.oppositeWords.length} = {oppositeMarks}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeExam.oppositeWords.map((ow, idx) => (
                  <div key={ow.id || idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1">
                    <p className="font-bold text-slate-800">({idx + 1}) {ow.word}</p>
                    {paperMode === "worksheet" && (
                      <div className="border-b border-dashed border-slate-400 h-4 w-full mt-1"></div>
                    )}
                    {showAnswerKey && (
                      <p className="text-xs text-emerald-700 font-semibold mt-1">
                        বিপরীত: {ow.opposite}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ৮. ছড়া বা কবিতার স্তবক লিখন (যদি থাকে) */}
          {activeExam.poemCompletion && activeExam.poemCompletion.length > 0 && (
            <section aria-labelledby="sec-poem" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <div className="flex items-center gap-2">
                  <h4 id="sec-poem">
                    {questionSectionCounter++}. {isEnglish ? "Write the lines of the rhyme/poem from memory:" : "মুখস্থ ছড়া বা কবিতার স্তবক লেখো:"}
                  </h4>
                </div>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.poemCompletion[0]?.marks || 5)} × {activeExam.poemCompletion.length} = {poemMarks}
                </span>
              </div>
              <div className="space-y-3">
                {activeExam.poemCompletion.map((p, idx) => (
                  <div key={p.id || idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
                    <p className="font-bold text-slate-800">({idx + 1}) {p.prompt}</p>
                    {paperMode === "worksheet" && (
                      <div className="space-y-2 pt-1">
                        <div className="border-b border-dashed border-slate-400 h-4 w-full"></div>
                        <div className="border-b border-dashed border-slate-400 h-4 w-full"></div>
                        <div className="border-b border-dashed border-slate-400 h-4 w-full"></div>
                        <div className="border-b border-dashed border-slate-400 h-4 w-full"></div>
                      </div>
                    )}
                    {showAnswerKey && (
                      <div className="text-xs text-emerald-800 font-medium italic mt-2 bg-emerald-50/60 p-2 rounded border border-emerald-200">
                        {p.lines.map((l, li) => (
                          <p key={li}>{l}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ৬. সংক্ষিপ্ত প্রশ্ন */}
          {activeExam.shortQuestions.length > 0 && (
            <section aria-labelledby="sec-short" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <div className="flex items-center gap-2">
                  <h4 id="sec-short">
                    {questionSectionCounter++}. {isEnglish ? "Answer the following short questions:" : "সংক্ষিপ্ত প্রশ্নের উত্তর দাও:"}
                  </h4>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={handleAddShort}
                      className="print:hidden text-[10px] bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold px-2 py-0.5 rounded-md border border-sky-200 inline-flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> প্রশ্ন যোগ
                    </button>
                  )}
                </div>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.shortQuestions[0]?.marks || 3)} × {activeExam.shortQuestions.length} = {shortMarks}
                </span>
              </div>
              <ol className="space-y-3 pl-4 list-decimal">
                {activeExam.shortQuestions.map((q, idx) => (
                  <li key={q.id || idx} className="space-y-1 break-inside-avoid">
                    <div className="flex items-start justify-between gap-2">
                      {isEditMode ? (
                        <input
                          type="text"
                          value={q.question}
                          onChange={(e) => handleUpdateShort(idx, "question", e.target.value)}
                          className="w-full text-xs sm:text-sm font-semibold p-1 border border-sky-300 rounded bg-sky-50/40"
                        />
                      ) : (
                        <p className="font-semibold">{q.question}</p>
                      )}

                      {isEditMode && (
                        <div className="flex items-center gap-1 shrink-0 print:hidden">
                          <button
                            type="button"
                            onClick={() => setActiveExam({ ...activeExam, shortQuestions: moveItem(activeExam.shortQuestions, idx, "up") })}
                            disabled={idx === 0}
                            className="p-1 rounded hover:bg-slate-200 disabled:opacity-30"
                          >
                            <ArrowUp className="w-3 h-3 text-slate-700" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveExam({ ...activeExam, shortQuestions: moveItem(activeExam.shortQuestions, idx, "down") })}
                            disabled={idx === activeExam.shortQuestions.length - 1}
                            className="p-1 rounded hover:bg-slate-200 disabled:opacity-30"
                          >
                            <ArrowDown className="w-3 h-3 text-slate-700" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteShort(idx)}
                            className="p-1 rounded hover:bg-rose-100 text-rose-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Dotted Answer Lines in Worksheet Mode */}
                    {paperMode === "worksheet" && (
                      <div className="space-y-2 mt-2 pt-1">
                        <div className="border-b border-dashed border-slate-400 h-5 w-full flex items-center text-[10px] text-slate-400 pl-1">
                          {isEnglish ? "Ans: " : "উত্তর: "}
                        </div>
                        <div className="border-b border-dashed border-slate-400 h-5 w-full"></div>
                      </div>
                    )}

                    {/* Answer Key Display */}
                    {showAnswerKey && (
                      <p className={`text-xs text-emerald-800 ${!printTeacherCopy ? "print:hidden" : ""} bg-emerald-50 p-2 rounded-md font-medium leading-relaxed`}>
                        💡 {isEnglish ? "Sample Answer: " : "নমুনা উত্তর: "}{q.answer}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* ৭. বর্ণনামূলক প্রশ্ন */}
          {activeExam.broadQuestions.length > 0 && (
            <section aria-labelledby="sec-broad" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <div className="flex items-center gap-2">
                  <h4 id="sec-broad">
                    {questionSectionCounter++}. {isEnglish ? "Answer the following questions / Good handwriting:" : "সমস্যা সমাধান ও বর্ণনামূলক প্রশ্ন:"}
                  </h4>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={handleAddBroad}
                      className="print:hidden text-[10px] bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold px-2 py-0.5 rounded-md border border-sky-200 inline-flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> প্রশ্ন যোগ
                    </button>
                  )}
                </div>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.broadQuestions[0]?.marks || 5)} × {activeExam.broadQuestions.length} = {broadMarks}
                </span>
              </div>
              <ol className="space-y-3 pl-4 list-decimal">
                {activeExam.broadQuestions.map((b, idx) => (
                  <li key={b.id || idx} className="space-y-1 break-inside-avoid">
                    <div className="flex items-start justify-between gap-2">
                      {isEditMode ? (
                        <textarea
                          rows={2}
                          value={b.question}
                          onChange={(e) => handleUpdateBroad(idx, "question", e.target.value)}
                          className="w-full text-xs sm:text-sm font-semibold p-1 border border-sky-300 rounded bg-sky-50/40 leading-relaxed"
                        />
                      ) : (
                        <p className="font-semibold leading-relaxed">{b.question}</p>
                      )}

                      {isEditMode && (
                        <div className="flex items-center gap-1 shrink-0 print:hidden">
                          <button
                            type="button"
                            onClick={() => setActiveExam({ ...activeExam, broadQuestions: moveItem(activeExam.broadQuestions, idx, "up") })}
                            disabled={idx === 0}
                            className="p-1 rounded hover:bg-slate-200 disabled:opacity-30"
                          >
                            <ArrowUp className="w-3 h-3 text-slate-700" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveExam({ ...activeExam, broadQuestions: moveItem(activeExam.broadQuestions, idx, "down") })}
                            disabled={idx === activeExam.broadQuestions.length - 1}
                            className="p-1 rounded hover:bg-slate-200 disabled:opacity-30"
                          >
                            <ArrowDown className="w-3 h-3 text-slate-700" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBroad(idx)}
                            className="p-1 rounded hover:bg-rose-100 text-rose-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Dotted Answer Lines or Drawing Frame in Worksheet Mode */}
                    {paperMode === "worksheet" && (
                      (b.question.includes("আঁকো") || b.question.includes("ছবি") || b.question.includes("চিত্র") || b.question.includes("Draw") || b.question.includes("Color") || selectedClassId === "pre-primary") ? (
                        <div className="w-full h-36 border-2 border-dashed border-slate-300 rounded-xl bg-white flex flex-col items-center justify-center text-xs text-slate-400 gap-1 my-2 break-inside-avoid">
                          <span className="font-semibold text-slate-500">🎨 {isEnglish ? "Drawing & Coloring Box" : "এখানে ছবি অঙ্কন ও রঙ করার ফাঁকা জায়গা"}</span>
                        </div>
                      ) : (
                        <div className="space-y-2 mt-2 pt-1 break-inside-avoid">
                          <div className="border-b border-dashed border-slate-400 h-5 w-full flex items-center text-[10px] text-slate-400 pl-1">
                            {isEnglish ? "Answer / Writing: " : "সমাধান / উত্তর: "}
                          </div>
                          <div className="border-b border-dashed border-slate-400 h-5 w-full"></div>
                          <div className="border-b border-dashed border-slate-400 h-5 w-full"></div>
                          <div className="border-b border-dashed border-slate-400 h-5 w-full"></div>
                        </div>
                      )
                    )}

                    {/* Answer Key Display */}
                    {showAnswerKey && (
                      <p className={`text-xs text-emerald-800 ${!printTeacherCopy ? "print:hidden" : ""} bg-emerald-50 p-2.5 rounded-md font-medium leading-relaxed`}>
                        💡 {isEnglish ? "Detailed Answer: " : "বিস্তারিত নমুনা উত্তর: "}{b.answer}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* এক কথায় প্রকাশ */}
          {activeExam.oneWord && activeExam.oneWord.length > 0 && (
            <section aria-labelledby="sec-oneword" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <h4 id="sec-oneword">{questionSectionCounter++}. {isEnglish ? "Write in one word for the following phrases:" : "এক কথায় প্রকাশ করো:"}</h4>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.oneWord[0]?.marks || 1)} × {activeExam.oneWord.length} = {oneWordMarks}
                </span>
              </div>
              <ol className="space-y-2.5 pl-4 list-decimal">
                {activeExam.oneWord.map((ow, idx) => (
                  <li key={ow.id || idx} className="space-y-1">
                    <p className="font-semibold text-slate-800">{ow.phrase}</p>
                    {paperMode === "worksheet" && <div className="border-b border-dashed border-slate-400 h-4 w-48 mt-1"></div>}
                    {showAnswerKey && <p className="text-xs text-emerald-700 font-bold">উত্তর: {ow.answer}</p>}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* সমার্থক শব্দ */}
          {activeExam.synonyms && activeExam.synonyms.length > 0 && (
            <section aria-labelledby="sec-synonyms" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <h4 id="sec-synonyms">{questionSectionCounter++}. {isEnglish ? "Write a synonym for each word:" : "প্রদত্ত শব্দগুলোর সমার্থক শব্দ লেখো:"}</h4>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.synonyms[0]?.marks || 1)} × {activeExam.synonyms.length} = {synonymMarks}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeExam.synonyms.map((sy, idx) => (
                  <div key={sy.id || idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1">
                    <p className="font-bold text-slate-800">({idx + 1}) {sy.word}</p>
                    {paperMode === "worksheet" && <div className="border-b border-dashed border-slate-400 h-4 w-full mt-1"></div>}
                    {showAnswerKey && <p className="text-xs text-emerald-700 font-bold">সমার্থক: {sy.answer}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* যতিচিহ্ন ও ক্যাপিটালাইজেশন */}
          {activeExam.punctuation && activeExam.punctuation.length > 0 && (
            <section aria-labelledby="sec-punctuation" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <h4 id="sec-punctuation">{questionSectionCounter++}. {isEnglish ? "Rewrite the sentences using capital letters and correct punctuation marks:" : "সঠিক যতিচিহ্ন ও বড় হাতের অক্ষর ব্যবহার করে বাক্যগুলো পুনরায় লেখো:"}</h4>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.punctuation[0]?.marks || 1)} × {activeExam.punctuation.length} = {puncMarks}
                </span>
              </div>
              <ol className="space-y-3 pl-4 list-decimal">
                {activeExam.punctuation.map((p, idx) => (
                  <li key={p.id || idx} className="space-y-1">
                    <p className="font-mono text-slate-800 bg-white p-1.5 rounded border border-slate-200 inline-block">{p.unpunctuated}</p>
                    {paperMode === "worksheet" && <div className="border-b border-dashed border-slate-400 h-5 w-full mt-1"></div>}
                    {showAnswerKey && <p className="text-xs text-emerald-700 font-bold mt-1">সঠিক: {p.punctuated}</p>}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Wh-Questions */}
          {activeExam.whQuestions && activeExam.whQuestions.length > 0 && (
            <section aria-labelledby="sec-wh" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <h4 id="sec-wh">{questionSectionCounter++}. Make Wh-questions from the given sentences with the underlined words:</h4>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.whQuestions[0]?.marks || 2)} × {activeExam.whQuestions.length} = {whMarks}
                </span>
              </div>
              <ol className="space-y-3 pl-4 list-decimal">
                {activeExam.whQuestions.map((w, idx) => (
                  <li key={w.id || idx} className="space-y-1">
                    <p className="font-semibold text-slate-800">{w.statement}</p>
                    {paperMode === "worksheet" && <div className="border-b border-dashed border-slate-400 h-5 w-full mt-1"></div>}
                    {showAnswerKey && <p className="text-xs text-emerald-700 font-bold mt-1">প্রশ্ন: {w.expectedQuestion}</p>}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* অনুবাদ */}
          {activeExam.translation && activeExam.translation.length > 0 && (
            <section aria-labelledby="sec-translation" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <h4 id="sec-translation">{questionSectionCounter++}. {isEnglish ? "Translate the sentences into English / Bengali:" : "বাক্যগুলোর অনুবাদ লেখো:"}</h4>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.translation[0]?.marks || 2)} × {activeExam.translation.length} = {transMarks}
                </span>
              </div>
              <ol className="space-y-2.5 pl-4 list-decimal">
                {activeExam.translation.map((t, idx) => (
                  <li key={t.id || idx} className="space-y-1">
                    <p className="font-semibold text-slate-800">{t.source}</p>
                    {paperMode === "worksheet" && <div className="border-b border-dashed border-slate-400 h-5 w-full mt-1"></div>}
                    {showAnswerKey && <p className="text-xs text-emerald-700 font-bold mt-1">অনুবাদ: {t.target}</p>}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* বানান শুদ্ধিকরণ */}
          {activeExam.spelling && activeExam.spelling.length > 0 && (
            <section aria-labelledby="sec-spelling" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <h4 id="sec-spelling">{questionSectionCounter++}. {isEnglish ? "Identify or correct the spelling errors:" : "সঠিক বানানটি চিহ্নিত করো বা শুদ্ধ করে লেখো:"}</h4>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.spelling[0]?.marks || 1)} × {activeExam.spelling.length} = {spellMarks}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeExam.spelling.map((sp, idx) => (
                  <div key={sp.id || idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1">
                    <p className="font-semibold text-rose-700">({idx + 1}) {sp.incorrect} ❌</p>
                    {paperMode === "worksheet" && <div className="border-b border-dashed border-slate-400 h-4 w-full mt-1"></div>}
                    {showAnswerKey && <p className="text-xs text-emerald-700 font-bold">শুদ্ধ: {sp.correct} ✅</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* সংলাপ পূরণ */}
          {activeExam.dialogue && activeExam.dialogue.length > 0 && (
            <section aria-labelledby="sec-dialogue" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <h4 id="sec-dialogue">{questionSectionCounter++}. {isEnglish ? "Complete the conversation:" : "কথোপকথনটির খালি অংশ পূরণ করো:"}</h4>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.dialogue[0]?.marks || 3)} × {activeExam.dialogue.length} = {dialMarks}
                </span>
              </div>
              {activeExam.dialogue.map((d, idx) => (
                <div key={d.id || idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                  {d.context && <p className="text-xs text-slate-500 italic mb-1">({d.context})</p>}
                  <div className="space-y-1.5 pl-2 border-l-2 border-sky-400">
                    {d.conversation.map((line, li) => (
                      <p key={li} className="text-xs sm:text-sm font-medium">
                        <strong>{line.speaker}:</strong> {line.isBlank ? (paperMode === "worksheet" ? "________________________________" : "[ . . . . . . . . . . . . . . . . . ]") : line.text}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* ফরম ও কার্ড পূরণ */}
          {activeExam.formFillup && activeExam.formFillup.length > 0 && (
            <section aria-labelledby="sec-form" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <h4 id="sec-form">{questionSectionCounter++}. {isEnglish ? "Fill in the following card/form:" : "প্রদত্ত তথ্যের আলোকে ফরমটি পূরণ করো:"}</h4>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.formFillup[0]?.marks || 5)} × {activeExam.formFillup.length} = {formMarks}
                </span>
              </div>
              {activeExam.formFillup.map((f, idx) => (
                <div key={f.id || idx} className="p-4 rounded-xl border-2 border-slate-300 bg-white max-w-md mx-auto space-y-3">
                  <h5 className="font-black text-sm text-center border-b pb-2 text-slate-800">{f.formTitle}</h5>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    {f.fields.map((field, fi) => (
                      <div key={fi} className="flex items-center gap-2">
                        <span className="w-32 font-bold text-slate-700">{field.label}:</span>
                        <div className="flex-1 border-b border-dashed border-slate-400 h-5"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* মুখে মুখে গণনা / সংক্ষেপে উত্তর */}
          {activeExam.mentalMath && activeExam.mentalMath.length > 0 && (
            <section aria-labelledby="sec-mental" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <h4 id="sec-mental">{questionSectionCounter++}. সংক্ষেপে উত্তর দাও / মুখে মুখে গণনা করো:</h4>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.mentalMath[0]?.marks || 1)} × {activeExam.mentalMath.length} = {mentalMarks}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeExam.mentalMath.map((mm, idx) => (
                  <div key={mm.id || idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">({idx + 1}) {mm.problem}</span>
                    {paperMode === "worksheet" ? (
                      <div className="w-20 h-7 border border-slate-300 rounded bg-white"></div>
                    ) : null}
                    {showAnswerKey && <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">{mm.answer}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* সম্পর্ক প্রতীক বসাও */}
          {activeExam.relationSymbols && activeExam.relationSymbols.length > 0 && (
            <section aria-labelledby="sec-rel" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <h4 id="sec-rel">{questionSectionCounter++}. খালি ঘরে সঠিক সম্পর্ক প্রতীক (&lt;, &gt; বা =) বসাও:</h4>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.relationSymbols[0]?.marks || 1)} × {activeExam.relationSymbols.length} = {relationMarks}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeExam.relationSymbols.map((rs, idx) => (
                  <div key={rs.id || idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-center gap-2">
                    <span className="font-bold text-sm text-slate-800">({idx + 1}) {rs.left}</span>
                    <div className="w-8 h-8 rounded border-2 border-slate-400 bg-white flex items-center justify-center font-black text-emerald-700">
                      {showAnswerKey ? rs.correctSymbol : ""}
                    </div>
                    <span className="font-bold text-sm text-slate-800">{rs.right}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* স্থানীয় মান নির্ণয় */}
          {activeExam.placeValue && activeExam.placeValue.length > 0 && (
            <section aria-labelledby="sec-pv" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <h4 id="sec-pv">{questionSectionCounter++}. চিহ্নিত অঙ্কের স্থানীয় মান নির্ণয় করো:</h4>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.placeValue[0]?.marks || 2)} × {activeExam.placeValue.length} = {placeValMarks}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeExam.placeValue.map((pv, idx) => (
                  <div key={pv.id || idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1">
                    <p className="font-bold text-sm text-slate-800">({idx + 1}) সংখ্যা: {pv.number} (অঙ্ক: {pv.digit})</p>
                    {paperMode === "worksheet" && <div className="border-b border-dashed border-slate-400 h-4 w-full mt-1"></div>}
                    {showAnswerKey && <p className="text-xs text-emerald-700 font-bold">স্থানীয় মান: {pv.placeValue}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* কথায় ও অঙ্কে লেখা */}
          {activeExam.inWords && activeExam.inWords.length > 0 && (
            <section aria-labelledby="sec-iw" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <h4 id="sec-iw">{questionSectionCounter++}. সংখ্যাগুলো কথায় লেখো:</h4>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.inWords[0]?.marks || 1)} × {activeExam.inWords.length} = {inWordsMarks}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeExam.inWords.map((iw, idx) => (
                  <div key={iw.id || idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1">
                    <p className="font-bold text-base text-sky-800">({idx + 1}) {iw.figure}</p>
                    {paperMode === "worksheet" && <div className="border-b border-dashed border-slate-400 h-4 w-full mt-1"></div>}
                    {showAnswerKey && <p className="text-xs text-emerald-700 font-bold">কথায়: {iw.inWords}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* জ্যামিতি ও চিত্রাঙ্কন */}
          {activeExam.geometry && activeExam.geometry.length > 0 && (
            <section aria-labelledby="sec-geom" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <h4 id="sec-geom">{questionSectionCounter++}. চিত্রসহ সংজ্ঞা লেখো ও চিত্র অঙ্কন করো:</h4>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.geometry[0]?.marks || 5)} × {activeExam.geometry.length} = {geomMarks}
                </span>
              </div>
              <div className="space-y-4">
                {activeExam.geometry.map((g, idx) => (
                  <div key={g.id || idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <p className="font-bold text-slate-800">({idx + 1}) {g.drawInstruction}</p>
                    {paperMode === "worksheet" && (
                      <div className="w-full h-32 border-2 border-dashed border-slate-300 rounded-lg bg-white flex items-center justify-center text-xs text-slate-400">
                        এখানে চিত্র আঁকো ও চিহ্নিত করো
                      </div>
                    )}
                    {showAnswerKey && (
                      <div className="text-xs text-emerald-800 bg-emerald-50 p-2 rounded">
                        <p><strong>সংজ্ঞা ({g.term}):</strong> {g.definition}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* সময় ও পরিমাপ সম্পর্কিত হিসাব */}
          {activeExam.timeMeasurement && activeExam.timeMeasurement.length > 0 && (
            <section aria-labelledby="sec-tm" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <h4 id="sec-tm">{questionSectionCounter++}. সময় ও পরিমাপের সমস্যার সমাধান করো:</h4>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.timeMeasurement[0]?.marks || 3)} × {activeExam.timeMeasurement.length} = {timeMeasMarks}
                </span>
              </div>
              <ol className="space-y-3 pl-4 list-decimal">
                {activeExam.timeMeasurement.map((tm, idx) => (
                  <li key={tm.id || idx} className="space-y-1">
                    <p className="font-semibold text-slate-800">{tm.problem}</p>
                    {paperMode === "worksheet" && <div className="space-y-1.5 pt-1"><div className="border-b border-dashed border-slate-400 h-4 w-full"></div><div className="border-b border-dashed border-slate-400 h-4 w-full"></div></div>}
                    {showAnswerKey && <p className="text-xs text-emerald-700 font-bold mt-1">উত্তর: {tm.answer}</p>}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* ছক পূরণ ও শ্রেণিবিন্যাস */}
          {activeExam.classification && activeExam.classification.length > 0 && (
            <section aria-labelledby="sec-class" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <h4 id="sec-class">{questionSectionCounter++}. উপাদানগুলো সঠিক ছকে পৃথক করে লেখো:</h4>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.classification[0]?.marks || 5)} × {activeExam.classification.length} = {classMarks}
                </span>
              </div>
              {activeExam.classification.map((cl, idx) => (
                <div key={cl.id || idx} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2.5">
                  <p className="font-bold text-slate-800 text-xs sm:text-sm">
                    ({idx + 1}) {cl.title}:
                  </p>
                  <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                    <strong>উপাদান তালিকা:</strong> {cl.items.join(" , ")}
                  </p>
                  <div className="grid grid-cols-2 border border-slate-300 rounded-lg overflow-hidden">
                    {cl.columns.map((col, ci) => (
                      <div key={ci} className={ci > 0 ? "border-l border-slate-300" : ""}>
                        <div className="bg-slate-100 font-bold text-xs p-2 text-center text-slate-800 border-b border-slate-300">{col.name}</div>
                        <div className="p-2 space-y-1 min-h-[70px]">
                          {showAnswerKey ? (
                            col.items.map((it, iti) => <p key={iti} className="text-xs text-emerald-700 font-medium">• {it}</p>)
                          ) : (
                            paperMode === "worksheet" && <div className="space-y-2 pt-1"><div className="border-b border-dashed border-slate-300 h-4"></div><div className="border-b border-dashed border-slate-300 h-4"></div><div className="border-b border-dashed border-slate-300 h-4"></div></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* পার্থক্য বা তুলনা লিখন */}
          {activeExam.differences && activeExam.differences.length > 0 && (
            <section aria-labelledby="sec-diff" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <h4 id="sec-diff">{questionSectionCounter++}. {activeExam.differences[0]?.itemA} ও {activeExam.differences[0]?.itemB}-এর মধ্যে পার্থক্য লেখো:</h4>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.differences[0]?.marks || 5)} × {activeExam.differences.length} = {diffMarks}
                </span>
              </div>
              {activeExam.differences.map((df, idx) => (
                <div key={df.id || idx} className="p-3 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="grid grid-cols-3 border border-slate-300 rounded-lg overflow-hidden text-xs">
                    <div className="bg-slate-100 font-bold p-1.5 text-center border-b border-r border-slate-300">বৈশিষ্ট্য</div>
                    <div className="bg-slate-100 font-bold p-1.5 text-center border-b border-r border-slate-300 text-sky-900">{df.itemA}</div>
                    <div className="bg-slate-100 font-bold p-1.5 text-center border-b border-slate-300 text-emerald-900">{df.itemB}</div>
                    {df.points.map((pt, pti) => (
                      <React.Fragment key={pti}>
                        <div className="p-2 font-semibold bg-slate-50 border-r border-b border-slate-200 text-slate-700">{pt.aspect}</div>
                        <div className="p-2 border-r border-b border-slate-200">{showAnswerKey ? pt.valA : (paperMode === "worksheet" ? "____________" : "")}</div>
                        <div className="p-2 border-b border-slate-200">{showAnswerKey ? pt.valB : (paperMode === "worksheet" ? "____________" : "")}</div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* কারণ ও ফলাফল নির্ণয় */}
          {activeExam.causeEffect && activeExam.causeEffect.length > 0 && (
            <section aria-labelledby="sec-ce" className="space-y-3 break-inside-avoid mb-6">
              <div className="flex items-center justify-between font-bold border-b border-slate-200 pb-1">
                <h4 id="sec-ce">{questionSectionCounter++}. {activeExam.causeEffect[0]?.topic}-এর কারণ ও ক্ষতিকর প্রভাব লেখো:</h4>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-sm">
                  {(activeExam.causeEffect[0]?.marks || 4)} × {activeExam.causeEffect.length} = {causeMarks}
                </span>
              </div>
              {activeExam.causeEffect.map((ce, idx) => (
                <div key={ce.id || idx} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-2.5 rounded-lg border border-rose-200 bg-rose-50/30">
                      <h5 className="font-bold text-xs text-rose-800 mb-1 border-b border-rose-200 pb-1">কারণসমূহ:</h5>
                      <div className="space-y-1 text-xs">
                        {showAnswerKey ? ce.causes.map((c, ci) => <p key={ci}>• {c}</p>) : (paperMode === "worksheet" && <div className="space-y-2 pt-1"><div className="border-b border-dashed border-rose-300 h-4"></div><div className="border-b border-dashed border-rose-300 h-4"></div></div>)}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg border border-amber-200 bg-amber-50/30">
                      <h5 className="font-bold text-xs text-amber-800 mb-1 border-b border-amber-200 pb-1">ফলাফল ও ক্ষতিকর প্রভাব:</h5>
                      <div className="space-y-1 text-xs">
                        {showAnswerKey ? ce.effects.map((e, ei) => <p key={ei}>• {e}</p>) : (paperMode === "worksheet" && <div className="space-y-2 pt-1"><div className="border-b border-dashed border-amber-300 h-4"></div><div className="border-b border-dashed border-amber-300 h-4"></div></div>)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Paper Footer for Print */}
        <footer className="mt-8 pt-4 border-t border-slate-300 text-center text-xs text-slate-500 flex justify-between items-center print:flex">
          <span>প্রাথমিক পাঠশালা স্মার্ট এডুকেশন পোর্টাল</span>
          <span>পৃষ্ঠা: ১/১</span>
          <span>{paperMode === "worksheet" ? "শিক্ষকের স্বাক্ষর: ____________" : "শুভকামনা রইল 🌟"}</span>
        </footer>
      </section>

      {/* ✨ AI Exam Generator Modal */}
      <AiExamGeneratorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        currentClassId={selectedClassId}
        currentSubjectKey={selectedSubjectKey}
        onExamGenerated={handleAiExamGenerated}
      />
    </article>
  );
}
