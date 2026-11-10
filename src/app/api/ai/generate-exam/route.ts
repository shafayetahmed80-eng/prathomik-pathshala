import { NextRequest, NextResponse } from "next/server";
import { EXAM_DATABASE, ExamQuestionItem } from "@/data/examQuestions";
import { buildRichExamFromPool } from "@/data/questionPool";

interface GenerateExamPayload {
  classId: string;
  subjectKey: string;
  inputMode: "chapter" | "passage" | "custom_topic";
  chapterName?: string;
  selectedChapterIds?: string[];
  selectedLessonIds?: string[];
  selectedChapterNames?: string[];
  customTopic?: string;
  customPassage?: string;
  difficulty?: "easy" | "medium" | "hard";
  targetCounts: {
    mcq: number;
    fillInTheBlanks: number;
    matching: number;
    wordMeaning: number;
    yuktaborno: number;
    shortQuestions: number;
    broadQuestions: number;
    trueFalse?: number;
  };
  userApiKey?: string;
}

const CLASS_NAMES: Record<string, string> = {
  "pre-primary": "প্রাক-প্রাথমিক (Pre-Primary)",
  "class-1": "১ম শ্রেণি (Class 1)",
  "class-2": "২য় শ্রেণি (Class 2)",
  "class-3": "৩য় শ্রেণি (Class 3)",
  "class-4": "৪র্থ শ্রেণি (Class 4)",
  "class-5": "৫ম শ্রেণি (Class 5)"
};

const SUBJECT_NAMES: Record<string, string> = {
  bangla: "বাংলা (Bangla)",
  english: "English",
  math: "প্রাথমিক গণিত (Mathematics)",
  science: "প্রাথমিক বিজ্ঞান (Elementary Science)",
  bgs: "বাংলাদেশ ও বিশ্বপরিচয় (Bangladesh and Global Studies)",
  religion: "ধর্ম ও নৈতিক শিক্ষা (Religious and Moral Education)",
  combined: "আমার বই - সমন্বিত (Amar Boi - Combined)"
};

export async function POST(req: NextRequest) {
  try {
    const payload: GenerateExamPayload = await req.json();
    const { 
      classId, 
      subjectKey, 
      inputMode, 
      chapterName, 
      selectedChapterIds,
      selectedLessonIds,
      selectedChapterNames,
      customTopic, 
      customPassage, 
      difficulty = "medium",
      targetCounts,
      userApiKey 
    } = payload;

    const apiKey = userApiKey?.trim() || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const gradeLabel = CLASS_NAMES[classId] || classId;
    const subjectLabel = SUBJECT_NAMES[subjectKey] || subjectKey;

    let contextSource = "";
    if (inputMode === "passage" && customPassage) {
      contextSource = `[অনুচ্ছেদ / পাঠ্যাংশ]:\n${customPassage}`;
    } else if (inputMode === "custom_topic" && customTopic) {
      contextSource = `[নির্দিষ্ট শিখনফল ও বিষয়]:\n${customTopic}`;
    } else if (selectedChapterNames && selectedChapterNames.length > 0) {
      contextSource = `[নির্বাচিত অধ্যায়সমূহ (${selectedChapterNames.length}টি অধ্যায়)]:\n` +
        selectedChapterNames.map((name, i) => `${i + 1}. ${name}`).join("\n") +
        "\nঅনুগ্রহ করে প্রশ্নগুলো এই নির্বাচিত অধ্যায়গুলোর মধ্যে সমানভাবে বণ্টন করুন।";
    } else {
      contextSource = `[পাঠ্যবইয়ের অধ্যায় ও বিষয়বস্তু]:\n${chapterName || "সম্পূর্ণ বইয়ের গুরুত্বপূর্ণ অংশসমূহ"}`;
    }

    const diffText = 
      difficulty === "easy" ? "সহজ ও স্মরণমূলক (Early cognitive, direct from text)" :
      difficulty === "hard" ? "চিন্তনদক্ষতামূলক ও বিশ্লেষণধর্মী (Higher Order Thinking, Creative)" :
      "মানসম্মত ও সুষম (Standard NCTB Primary Assessment Balance)";

    const isEarlyClass = classId === "pre-primary" || classId === "class-1" || classId === "class-2";
    const mcqMark = isEarlyClass ? 2 : 1;
    const fillMark = isEarlyClass ? 2 : (subjectKey === "math" ? 2 : (subjectKey === "english" ? 2 : 1));
    const matchingMark = isEarlyClass ? (subjectKey === "math" ? 5 : 10) : (subjectKey === "english" ? 10 : 5);
    const shortMark = isEarlyClass ? 2 : (subjectKey === "math" ? 3 : (subjectKey === "english" ? 2 : (subjectKey === "bangla" ? 1 : 3)));
    const broadMark = isEarlyClass ? (subjectKey === "math" ? 5 : 10) : (subjectKey === "math" ? 8 : (subjectKey === "science" || subjectKey === "bgs" ? 6 : 5));
    const wordMark = isEarlyClass ? 2 : 1;
    const yuktaMark = isEarlyClass ? 3 : 2;

    // System & User Prompts
    const prompt = `
You are an expert Chief Examiner and NCTB Curriculum Specialist for Primary Schools in Bangladesh (জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড, প্রাথমিক শিক্ষা অধিদপ্তর).
Your task is to generate a pristine, print-ready institutional question paper and worksheet according to the Bangladesh National Curriculum standards.

Target Details:
- শ্রেণি (Grade): ${gradeLabel}
- বিষয় (Subject): ${subjectLabel}
- মূল বিষয়বস্তু / উৎস: ${contextSource}
- প্রশ্নপত্রের কাঠিন্যের মাত্রা (Difficulty): ${diffText}

Language Rules:
- If Subject is English, write questions, options, passages and answers in clean, error-free English suitable for primary learners in Bangladesh.
- For all other subjects (বাংলা, গণিত, বিজ্ঞান, বাংলাদেশ ও বিশ্বপরিচয়), write purely in standard, elegant Bengali (শুদ্ধ প্রমিত বাংলা বানানে).

Target Question Distribution requested by teacher:
- MCQ (বহুনির্বাচনি প্রশ্ন): exactly ${targetCounts.mcq} items (each with 4 options labeled logically, 1 correct answer, marks: ${mcqMark})
- Fill in the blanks (শূন্যস্থান পূরণ): exactly ${targetCounts.fillInTheBlanks} items (each with a sentence containing "____", answer, marks: ${fillMark})
- True / False (শুদ্ধ ও অশুদ্ধ নির্বাচন - এনসিটিবি ২০২৬ নির্ধারিত): exactly ${targetCounts.trueFalse || 0} items (statement, isTrue: boolean, answer: "শুদ্ধ" | "অশুদ্ধ", marks: 1)
- Matching (ডান-বাম মিলকরণ): ${targetCounts.matching > 0 ? `1 table with 4 corresponding left and right items, marks: ${matchingMark}` : "0 items"}
- Word Meaning (শব্দার্থ): exactly ${targetCounts.wordMeaning} items (word, clear simple meaning, marks: ${wordMark})
- Yuktaborno (যুক্তবর্ণ বিশ্লেষণ): exactly ${targetCounts.yuktaborno} items (cluster, breakdown, word, sentence, marks: ${yuktaMark})
- Short Questions (সংক্ষিপ্ত প্রশ্ন): exactly ${targetCounts.shortQuestions} items (question, sample model answer, marks: ${shortMark})
- Broad / Word Problems (সমস্যা সমাধান / বর্ণনামূলক): exactly ${targetCounts.broadQuestions} items (creative word problem or descriptive inquiry, detailed step-by-step model answer, marks: ${broadMark})

Return ONLY a valid JSON object matching this exact schema:
{
  "mcq": [
    { "id": "m1", "question": "প্রশ্ন...", "options": ["ক...", "খ...", "গ...", "ঘ..."], "answer": "সঠিক উত্তর", "marks": ${mcqMark} }
  ],
  "fillInTheBlanks": [
    { "id": "f1", "sentence": "বাক্য ____ অংশ।", "answer": "উত্তর", "marks": ${fillMark} }
  ],
  "trueFalse": [
    { "id": "tf1", "statement": "বিবৃতি...", "isTrue": true, "answer": "শুদ্ধ", "marks": 1 }
  ],
  "matching": {
    "left": ["ক", "খ", "গ", "ঘ"],
    "right": ["১", "২", "৩", "৪"],
    "marks": ${matchingMark}
  },
  "wordMeaning": [
    { "id": "w1", "word": "শব্দ", "meaning": "অর্থ", "marks": ${wordMark} }
  ],
  "yuktaborno": [
    { "id": "y1", "cluster": "যুক্তবর্ণ", "breakdown": "ভাঙন", "word": "শব্দ", "sentence": "বাক্য", "marks": ${yuktaMark} }
  ],
  "shortQuestions": [
    { "id": "s1", "question": "সংক্ষিপ্ত প্রশ্ন...", "answer": "নমুনা উত্তর...", "marks": ${shortMark} }
  ],
  "broadQuestions": [
    { "id": "b1", "question": "বর্ণনামূলক প্রশ্ন...", "answer": "বিস্তারিত উত্তর...", "marks": ${broadMark} }
  ]
}
`.trim();

    // 1. Try Gemini API if key is available (first 1.5-flash, then 2.0-flash)
    if (apiKey) {
      const modelsToTry = ["gemini-1.5-flash", "gemini-2.0-flash"];
      for (const modelName of modelsToTry) {
        try {
          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [{ text: prompt }]
                  }
                ],
                generationConfig: {
                  responseMimeType: "application/json",
                  temperature: 0.35
                }
              })
            }
          );

          if (geminiRes.ok) {
            const geminiData = await geminiRes.json();
            const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
            if (rawText) {
              const parsed = JSON.parse(rawText);
              const sanitized = sanitizeAiOutput(parsed, classId, subjectKey);
              return NextResponse.json({
                success: true,
                source: `gemini-ai (${modelName})`,
                data: sanitized
              });
            }
          }
        } catch (geminiErr) {
          console.warn(`Gemini API call to ${modelName} failed:`, geminiErr);
        }
      }
    }

    // 2. Intelligent Curriculum-Based Synthesizer Fallback
    const synthesizedData = synthesizeFromCurriculum(classId, subjectKey, targetCounts, chapterName || customTopic, selectedChapterIds, selectedLessonIds);
    return NextResponse.json({
      success: true,
      source: apiKey ? "curriculum-synthesizer-quota-fallback" : "curriculum-synthesizer-offline",
      notice: apiKey 
        ? "এআই কোটা বা নেটওয়ার্ক সমস্যার কারণে প্রমিত এনসিটিবি কারিকুলাম ইঞ্জিন থেকে প্রশ্নপত্র সাজিয়ে দেওয়া হয়েছে।"
        : "Gemini API Key সংযুক্ত না থাকায় এনসিটিবি প্রমিত কারিকুলাম ইঞ্জিন থেকে তাৎক্ষণিক প্রশ্নপত্র সাজিয়ে দেওয়া হয়েছে। আপনি চাইলে উপরের সেটিংসে নিজস্ব ফ্রি Gemini Key যোগ করতে পারেন।",
      data: synthesizedData
    });

  } catch (error: any) {
    console.error("AI Exam Generator error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// Ensure returned AI data matches ExamQuestionItem structure
function sanitizeAiOutput(parsed: any, classId: string, subjectKey: string): ExamQuestionItem {
  const isEarlyClass = classId === "pre-primary" || classId === "class-1" || classId === "class-2";
  const defMcqMark = isEarlyClass ? 2 : 1;
  const defFillMark = isEarlyClass ? 2 : (subjectKey === "math" ? 2 : (subjectKey === "english" ? 2 : 1));
  const defMatchingMark = isEarlyClass ? (subjectKey === "math" ? 5 : 10) : (subjectKey === "english" ? 10 : 5);
  const defShortMark = isEarlyClass ? 2 : (subjectKey === "math" ? 3 : (subjectKey === "english" ? 2 : (subjectKey === "bangla" ? 1 : 3)));
  const defBroadMark = isEarlyClass ? (subjectKey === "math" ? 5 : 10) : (subjectKey === "math" ? 6 : (subjectKey === "science" || subjectKey === "bgs" ? 6 : 5));
  const defWordMark = isEarlyClass ? 2 : 1;
  const defYuktaMark = isEarlyClass ? 3 : 2;

  return {
    id: `ai-gen-${Date.now()}`,
    classId,
    subject: subjectKey,
    mcq: Array.isArray(parsed.mcq) ? parsed.mcq.map((m: any, idx: number) => ({
      id: m.id || `mcq-ai-${idx + 1}`,
      question: String(m.question || ""),
      options: Array.isArray(m.options) ? m.options.map(String) : ["ক", "খ", "গ", "ঘ"],
      answer: String(m.answer || ""),
      marks: Number(m.marks) || defMcqMark
    })) : [],
    fillInTheBlanks: Array.isArray(parsed.fillInTheBlanks) ? parsed.fillInTheBlanks.map((f: any, idx: number) => ({
      id: f.id || `fill-ai-${idx + 1}`,
      sentence: String(f.sentence || ""),
      answer: String(f.answer || ""),
      marks: Number(f.marks) || defFillMark
    })) : [],
    trueFalse: Array.isArray(parsed.trueFalse) ? parsed.trueFalse.map((tf: any, idx: number) => ({
      id: tf.id || `tf-ai-${idx + 1}`,
      statement: String(tf.statement || ""),
      isTrue: Boolean(tf.isTrue),
      answer: String(tf.answer || (tf.isTrue ? "শুদ্ধ" : "অশুদ্ধ")),
      marks: Number(tf.marks) || 1
    })) : [],
    matching: {
      left: Array.isArray(parsed.matching?.left) ? parsed.matching.left.map(String) : [],
      right: Array.isArray(parsed.matching?.right) ? parsed.matching.right.map(String) : [],
      marks: Number(parsed.matching?.marks) || defMatchingMark
    },
    shortQuestions: Array.isArray(parsed.shortQuestions) ? parsed.shortQuestions.map((s: any, idx: number) => ({
      id: s.id || `short-ai-${idx + 1}`,
      question: String(s.question || ""),
      answer: String(s.answer || ""),
      marks: Number(s.marks) || defShortMark
    })) : [],
    broadQuestions: Array.isArray(parsed.broadQuestions) ? parsed.broadQuestions.map((b: any, idx: number) => ({
      id: b.id || `broad-ai-${idx + 1}`,
      question: String(b.question || ""),
      answer: String(b.answer || ""),
      marks: Number(b.marks) || defBroadMark
    })) : [],
    yuktaborno: Array.isArray(parsed.yuktaborno) ? parsed.yuktaborno.map((y: any, idx: number) => ({
      id: y.id || `yukta-ai-${idx + 1}`,
      cluster: String(y.cluster || ""),
      breakdown: String(y.breakdown || ""),
      word: String(y.word || ""),
      sentence: String(y.sentence || ""),
      marks: Number(y.marks) || defYuktaMark
    })) : [],
    wordMeaning: Array.isArray(parsed.wordMeaning) ? parsed.wordMeaning.map((w: any, idx: number) => ({
      id: w.id || `word-ai-${idx + 1}`,
      word: String(w.word || ""),
      meaning: String(w.meaning || ""),
      marks: Number(w.marks) || defWordMark
    })) : []
  };
}

// Fallback intelligent curriculum synthesizer using deep question pools & algorithmic math
function synthesizeFromCurriculum(
  classId: string, 
  subjectKey: string, 
  targetCounts: GenerateExamPayload["targetCounts"],
  topicName?: string,
  selectedChapterIds?: string[],
  selectedLessonIds?: string[]
): ExamQuestionItem {
  const isEarlyClass = classId === "pre-primary" || classId === "class-1" || classId === "class-2";
  const defMcqMark = isEarlyClass ? 2 : 1;
  const defFillMark = isEarlyClass ? 2 : (subjectKey === "math" ? 2 : (subjectKey === "english" ? 2 : 1));
  const defShortMark = isEarlyClass ? 2 : (subjectKey === "math" ? 3 : (subjectKey === "english" ? 2 : (subjectKey === "bangla" ? 1 : 3)));
  const defBroadMark = isEarlyClass ? (subjectKey === "math" ? 5 : 10) : (subjectKey === "math" ? 6 : (subjectKey === "science" || subjectKey === "bgs" ? 6 : 5));
  const defWordMark = isEarlyClass ? 2 : 1;
  const defYuktaMark = isEarlyClass ? 3 : 2;

  const customMarks: Record<string, number> = {
    mcq: defMcqMark,
    fillInTheBlanks: defFillMark,
    shortQuestions: defShortMark,
    broadQuestions: defBroadMark,
    wordMeaning: defWordMark,
    yuktaborno: defYuktaMark
  };

  // First, draw uniquely from the rich question repository & dynamic math engine
  const richSample = buildRichExamFromPool(classId, subjectKey, targetCounts, selectedChapterIds, selectedLessonIds, customMarks);

  const queryKey = `${classId}-${subjectKey}`;
  const base = EXAM_DATABASE[queryKey] || EXAM_DATABASE["class-1-bangla"];

  // Complement any deficit items with topic-informed templates
  const ensureCount = (arr: any[], count: number, templateBuilder: (i: number) => any) => {
    if (count <= 0) return [];
    const result = [...arr];
    for (let i = result.length; i < count; i++) {
      result.push(templateBuilder(i + 1));
    }
    return result.slice(0, count);
  };

  const mcqs = ensureCount(richSample.mcq, targetCounts.mcq, (i) => ({
    id: `mcq-syn-${Date.now()}-${i}`,
    question: `${topicName ? `[${topicName}] ` : ""}পাঠের গুরুত্বপূর্ণ ধারণা সম্পর্কিত বহুনির্বাচনি প্রশ্ন (${i}): সঠিক উত্তর কোনটি?`,
    options: ["বিকল্প ক", "বিকল্প খ", "বিকল্প গ", "বিকল্প ঘ"],
    answer: "বিকল্প ক",
    marks: defMcqMark
  }));

  const fills = ensureCount(richSample.fillInTheBlanks, targetCounts.fillInTheBlanks, (i) => ({
    id: `fill-syn-${Date.now()}-${i}`,
    sentence: `${topicName ? `[${topicName}] ` : ""}পাঠের আলোকে নির্ধারিত স্থানটি ____ উপযুক্ত শব্দ দিয়ে পূর্ণ করো।`,
    answer: "সঠিক শব্দ",
    marks: defFillMark
  }));

  const shorts = ensureCount(richSample.shortQuestions, targetCounts.shortQuestions, (i) => ({
    id: `short-syn-${Date.now()}-${i}`,
    question: `${topicName ? `[${topicName}] ` : ""}পাঠ্যবইয়ের এই বিষয়ের মূল গুরুত্ব সংক্ষেপে ৩টি বাক্যে ব্যাখ্যা করো (${i})।`,
    answer: "পাঠের আলোকে সঠিক ধারণা উপস্থাপন করে ৩টি পূর্ণ বাক্যে উত্তর লিখতে হবে।",
    marks: defShortMark
  }));

  const broads = ensureCount(richSample.broadQuestions, targetCounts.broadQuestions, (i) => ({
    id: `broad-syn-${Date.now()}-${i}`,
    question: `${topicName ? `[${topicName}] ` : ""}বাস্তব জীবনের উদাহরণের আলোকে সমস্যাটি সমাধান করো এবং এর ফলাফল ৫টি বাক্যে বিস্তারিত লেখো (${i})।`,
    answer: "১. সমস্যা বিশ্লেষণ। ২. প্রয়োজনীয় ধাপসমূহ সম্পন্ন করা। ৩. সঠিক ফলাফল প্রদর্শন। ৪. সামাজিক বা ব্যবহারিক গুরুত্ব উপস্থাপন।",
    marks: defBroadMark
  }));

  const words = ensureCount(richSample.wordMeaning || [], targetCounts.wordMeaning, (i) => ({
    id: `word-syn-${Date.now()}-${i}`,
    word: `শব্দ-${i}`,
    meaning: "সহজ অর্থ",
    marks: defWordMark
  }));

  const yuktas = ensureCount(richSample.yuktaborno || [], targetCounts.yuktaborno, (i) => ({
    id: `yukta-syn-${Date.now()}-${i}`,
    cluster: "ক্ত",
    breakdown: "ক + ত",
    word: "শক্তি",
    sentence: "সততা মানবজীবনের সবচেয়ে বড় শক্তি।",
    marks: defYuktaMark
  }));

  const tfs = ensureCount(richSample.trueFalse || [], targetCounts.trueFalse || 0, (i) => ({
    id: `tf-syn-${Date.now()}-${i}`,
    statement: `${topicName ? `[${topicName}] ` : ""}পাঠের ধারণা অনুযায়ী এই বিবৃতিটি সঠিক (${i})।`,
    isTrue: i % 2 === 0,
    answer: i % 2 === 0 ? "শুদ্ধ" : "অশুদ্ধ",
    marks: 1
  }));

  return {
    id: `syn-${Date.now()}`,
    classId,
    subject: subjectKey,
    mcq: mcqs,
    fillInTheBlanks: fills,
    trueFalse: tfs.length > 0 ? tfs : undefined,
    matching: targetCounts.matching > 0 
      ? (richSample.matching.left.length > 0 ? richSample.matching : base.matching)
      : { left: [], right: [], marks: 0 },
    shortQuestions: shorts,
    broadQuestions: broads,
    wordMeaning: words,
    yuktaborno: yuktas
  };
}
