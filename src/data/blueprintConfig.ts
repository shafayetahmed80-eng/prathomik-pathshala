import { CategoryBlueprintConfig, ExamBlueprintConfig, SeenBlueprintConfig } from "./examQuestions";

export type CategoryGroup = "core" | "language" | "math" | "science";

export interface CategoryMeta {
  key: string;
  label: string;
  defaultMarks: number;
  applicableSubjects: string[];
  description: string;
  group: CategoryGroup;
}

export const ALL_CATEGORIES_META: CategoryMeta[] = [
  // 🏛️ মৌলিক প্রশ্ন ক্যাটাগরি (Core Categories - সকল বিষয়ে প্রযোজ্য)
  { key: "mcq", label: "সঠিক উত্তর / টিক চিহ্ন (MCQ)", defaultMarks: 1, applicableSubjects: ["bangla", "english", "math", "science", "bgs", "religion", "combined"], description: "৪টি অপশন থেকে ১টি সঠিক উত্তর নির্বাচন", group: "core" },
  { key: "fillInTheBlanks", label: "শূন্যস্থান পূরণ (Fill in blanks)", defaultMarks: 1, applicableSubjects: ["bangla", "english", "math", "science", "bgs", "religion", "combined"], description: "উপযুক্ত শব্দ দিয়ে খালি ঘর পূরণ", group: "core" },
  { key: "trueFalse", label: "সত্য বা মিথ্যা যাচাই (True / False)", defaultMarks: 1, applicableSubjects: ["english", "science", "bgs", "religion", "bangla"], description: "প্রদত্ত তথ্যটি সত্য নাকি মিথ্যা নির্ণয়", group: "core" },
  { key: "shortQuestions", label: "সংক্ষিপ্ত প্রশ্নোত্তর (Short Questions)", defaultMarks: 2, applicableSubjects: ["bangla", "english", "math", "science", "bgs", "religion", "combined"], description: "১-২ বাক্যে নির্দিষ্ট উত্তর লিখন", group: "core" },
  { key: "matching", label: "বাম-ডান মিলকরণ (Matching)", defaultMarks: 5, applicableSubjects: ["bangla", "english", "science", "bgs", "religion", "math", "combined"], description: "বাম পাশের বাক্যাংশের সাথে ডান পাশ মিলকরণ", group: "core" },
  { key: "broadQuestions", label: "বর্ণনামূলক / বড় প্রশ্ন (Broad)", defaultMarks: 5, applicableSubjects: ["bangla", "english", "math", "science", "bgs", "religion", "combined"], description: "সৃজনশীল বা বিস্তারিত বর্ণনামূলক উত্তর", group: "core" },

  // 📖 ভাষা ও ব্যাকরণ ক্যাটাগরি (Language & Grammar - বাংলা ও ইংরেজি)
  { key: "rearrange", label: "শব্দ/বাক্য পুনর্বিন্যাস (Rearrange)", defaultMarks: 1, applicableSubjects: ["english", "bangla"], description: "এলোমেলো শব্দ সাজিয়ে অর্থপূর্ণ বাক্য গঠন", group: "language" },
  { key: "wordMeaning", label: "শব্দার্থ ও বাক্য রচনা (Word Meanings)", defaultMarks: 2, applicableSubjects: ["bangla", "english", "combined"], description: "শব্দের অর্থ লিখে বাক্য তৈরি", group: "language" },
  { key: "oppositeWords", label: "বিপরীত শব্দ লিখন (Opposite Words)", defaultMarks: 1, applicableSubjects: ["bangla", "english"], description: "প্রদত্ত শব্দের বিপরীত শব্দ লেখা", group: "language" },
  { key: "oneWord", label: "এক কথায় প্রকাশ (One Word Substitution)", defaultMarks: 1, applicableSubjects: ["bangla", "english"], description: "বাক্য বা বাক্যাংশকে এক কথায় প্রকাশ", group: "language" },
  { key: "synonyms", label: "সমার্থক শব্দ / প্রতিশব্দ (Synonyms)", defaultMarks: 1, applicableSubjects: ["bangla", "english"], description: "শব্দের একই অর্থের ভিন্ন শব্দ লেখা", group: "language" },
  { key: "punctuation", label: "যতিচিহ্ন ও বড় হাতের অক্ষরের ব্যবহার (Punctuation)", defaultMarks: 1, applicableSubjects: ["english", "bangla"], description: "সঠিক স্থানে কমা, দাড়ি ও ক্যাপিটাল লেটার বসানো", group: "language" },
  { key: "whQuestions", label: "Wh-Questions তৈরি করা (Making Questions)", defaultMarks: 2, applicableSubjects: ["english"], description: "Who, What, Where ইত্যাদি দিয়ে প্রশ্ন গঠন", group: "language" },
  { key: "translation", label: "অনুবাদ (Translation: বাংলা ↔ ইংরেজি)", defaultMarks: 2, applicableSubjects: ["english", "bangla"], description: "সহজ বাক্যের ইংরেজি বা বাংলা অনুবাদ", group: "language" },
  { key: "spelling", label: "বানান শুদ্ধিকরণ (Spelling Correction)", defaultMarks: 1, applicableSubjects: ["bangla", "english"], description: "ভুল বানান থেকে সঠিক বানান চিহ্নিত ও সংশোধন", group: "language" },
  { key: "dialogue", label: "কথোপকথন বা সংলাপ পূরণ (Dialogue)", defaultMarks: 3, applicableSubjects: ["english", "bangla"], description: "দুই জনের কথোপকথনের শূন্যস্থান পূরণ", group: "language" },
  { key: "formFillup", label: "ফরম ও কার্ড পূরণ (Form & Card Fill-up)", defaultMarks: 5, applicableSubjects: ["english", "bangla"], description: "লাইব্রেরি কার্ড বা ফরম ব্যক্তিগত তথ্য দিয়ে পূরণ", group: "language" },
  { key: "yuktaborno", label: "যুক্তবর্ণ ভাঙা ও বাক্যে প্রয়োগ", defaultMarks: 3, applicableSubjects: ["bangla"], description: "যুক্তবর্ণ ভেঙে শব্দ ও বাক্য তৈরি", group: "language" },
  { key: "poemCompletion", label: "ছড়া/কবিতার স্তবক লিখন (Poem / Rhyme)", defaultMarks: 5, applicableSubjects: ["bangla", "english", "combined"], description: "ছড়া বা কবিতার প্রথম ৪-৬ লাইন মুখস্থ লেখা", group: "language" },

  // 🧮 গণিত বিশেষ ক্যাটাগরি (Mathematics Specialized)
  { key: "mentalMath", label: "সংক্ষেপে উত্তর / মুখে মুখে গণনা (Mental Math)", defaultMarks: 1, applicableSubjects: ["math"], description: "সংক্ষিপ্ত গণনা ও মৌলিক প্রশ্নের সরাসরি উত্তর", group: "math" },
  { key: "relationSymbols", label: "সম্পর্ক প্রতীক বসাও (<, >, =)", defaultMarks: 1, applicableSubjects: ["math"], description: "দুই পাশের সংখ্যার তুলনা করে সঠিক প্রতীক বসানো", group: "math" },
  { key: "placeValue", label: "স্থানীয় মান নির্ণয় (Place Value)", defaultMarks: 2, applicableSubjects: ["math"], description: "সংখ্যার নির্দিষ্ট অঙ্কের স্থানীয় মান লেখা", group: "math" },
  { key: "inWords", label: "কথায় ও অঙ্কে লেখা (In Words & Figures)", defaultMarks: 1, applicableSubjects: ["math"], description: "সংখ্যাকে কথায় অথবা কথায় লেখা সংখ্যাকে অঙ্কে প্রকাশ", group: "math" },
  { key: "geometry", label: "জ্যামিতি ও চিত্রাঙ্কন (Geometry & Shapes)", defaultMarks: 5, applicableSubjects: ["math"], description: "চিত্রসহ কোণ, ত্রিভুজ বা চতুর্ভুজের সংজ্ঞা ও অঙ্কন", group: "math" },
  { key: "timeMeasurement", label: "পরিমাপ ও সময় সম্পর্কিত হিসাব (Time & Measure)", defaultMarks: 3, applicableSubjects: ["math"], description: "ঘণ্টা-মিনিট, মিটার-সেন্টিমিটার ও ক্যালেন্ডারের সমস্যা", group: "math" },

  // 🔬 বিজ্ঞান, সমাজ ও ধর্ম ক্যাটাগরি (Science, BGS & Religion)
  { key: "classification", label: "ছক পূরণ ও শ্রেণিবিন্যাস (Classification)", defaultMarks: 5, applicableSubjects: ["science", "bgs", "religion"], description: "প্রাকৃতিক/মানবসৃষ্ট বা উদ্ভিজ্জ/প্রাণিজ উপাদানের ছক পূরণ", group: "science" },
  { key: "differences", label: "পার্থক্য বা তুলনা লিখন (Differences)", defaultMarks: 5, applicableSubjects: ["science", "bgs", "religion"], description: "দুটি বিষয়ের মধ্যে ৩-৪টি সুস্পষ্ট পার্থক্য লেখা", group: "science" },
  { key: "causeEffect", label: "কারণ ও ফলাফল নির্ণয় (Cause & Effect)", defaultMarks: 4, applicableSubjects: ["science", "bgs"], description: "পরিবেশ দূষণ বা প্রাকৃতিক ঘটনার কারণ ও ক্ষতিকর প্রভাব", group: "science" }
];

export type PresetType = "nctb_summative" | "class_test" | "quiz" | "annual" | "custom";

export const PRESET_OPTIONS: { id: PresetType; label: string; subLabel: string; marksBadge: string }[] = [
  { id: "class_test", label: "শ্রেণি পরীক্ষা", subLabel: "Class Test (কুইক অ্যাসেসমেন্ট)", marksBadge: "২০ নম্বর" },
  { id: "quiz", label: "সাপ্তাহিক কুইজ", subLabel: "Weekly Quiz (MCQ ও শর্ট)", marksBadge: "১৫ নম্বর" },
  { id: "nctb_summative", label: "NCTB সামষ্টিক মূল্যায়ন", subLabel: "সরকারি নির্দেশিকা ২০২৬ অনুযায়ী", marksBadge: "৫০/৭০ নম্বর" },
  { id: "annual", label: "পূর্ণাঙ্গ বার্ষিক পরীক্ষা", subLabel: "Annual Examination", marksBadge: "১০০ নম্বর" },
  { id: "custom", label: "কাস্টম ব্লুপ্রিন্ট", subLabel: "নিজের ইচ্ছামতো নম্বর ও প্রশ্ন সাজান", marksBadge: "ডাইনামিক" }
];

export function getDefaultBlueprint(
  classId: string,
  subjectKey: string,
  preset: PresetType
): ExamBlueprintConfig {
  const isEarlyClass = classId === "pre-primary" || classId === "class-1" || classId === "class-2";
  const blueprint: ExamBlueprintConfig = {};

  // Initialize all applicable categories as disabled with 0 count
  ALL_CATEGORIES_META.forEach(meta => {
    if (meta.applicableSubjects.includes(subjectKey)) {
      blueprint[meta.key] = {
        key: meta.key,
        label: meta.label,
        enabled: false,
        count: 0,
        marksPerQuestion: meta.defaultMarks,
        defaultMarks: meta.defaultMarks,
        description: meta.description,
        group: meta.group
      };
    }
  });

  // Configure based on Preset
  if (preset === "class_test") {
    // 🎯 শ্রেণি পরীক্ষা: ২০ নম্বর
    if (isEarlyClass && subjectKey === "english") {
      if (blueprint["fillInTheBlanks"]) { blueprint["fillInTheBlanks"].enabled = true; blueprint["fillInTheBlanks"].count = 5; blueprint["fillInTheBlanks"].marksPerQuestion = 1; } // 5
      if (blueprint["wordMeaning"]) { blueprint["wordMeaning"].enabled = true; blueprint["wordMeaning"].count = 5; blueprint["wordMeaning"].marksPerQuestion = 1; } // 5
      if (blueprint["matching"]) { blueprint["matching"].enabled = true; blueprint["matching"].count = 1; blueprint["matching"].marksPerQuestion = 5; } // 5
      if (blueprint["shortQuestions"]) { blueprint["shortQuestions"].enabled = true; blueprint["shortQuestions"].count = 2; blueprint["shortQuestions"].marksPerQuestion = 2.5; } // 5
    } else {
      if (blueprint["mcq"]) { blueprint["mcq"].enabled = true; blueprint["mcq"].count = 5; blueprint["mcq"].marksPerQuestion = 1; }
      if (blueprint["fillInTheBlanks"]) { blueprint["fillInTheBlanks"].enabled = true; blueprint["fillInTheBlanks"].count = 5; blueprint["fillInTheBlanks"].marksPerQuestion = 1; }
      if (blueprint["trueFalse"]) { blueprint["trueFalse"].enabled = true; blueprint["trueFalse"].count = 5; blueprint["trueFalse"].marksPerQuestion = 1; }
      else if (blueprint["mentalMath"]) { blueprint["mentalMath"].enabled = true; blueprint["mentalMath"].count = 5; blueprint["mentalMath"].marksPerQuestion = 1; }
      else if (blueprint["rearrange"]) { blueprint["rearrange"].enabled = true; blueprint["rearrange"].count = 5; blueprint["rearrange"].marksPerQuestion = 1; }
      if (blueprint["shortQuestions"]) { blueprint["shortQuestions"].enabled = true; blueprint["shortQuestions"].count = 2; blueprint["shortQuestions"].marksPerQuestion = 2.5; }
      else if (blueprint["matching"]) { blueprint["matching"].enabled = true; blueprint["matching"].count = 1; blueprint["matching"].marksPerQuestion = 5; }
    }
  } else if (preset === "quiz") {
    // 🎯 সাপ্তাহিক কুইজ: ১৫ নম্বর
    if (isEarlyClass && subjectKey === "english") {
      if (blueprint["fillInTheBlanks"]) { blueprint["fillInTheBlanks"].enabled = true; blueprint["fillInTheBlanks"].count = 5; blueprint["fillInTheBlanks"].marksPerQuestion = 1; } // 5
      if (blueprint["wordMeaning"]) { blueprint["wordMeaning"].enabled = true; blueprint["wordMeaning"].count = 5; blueprint["wordMeaning"].marksPerQuestion = 1; } // 5
      if (blueprint["matching"]) { blueprint["matching"].enabled = true; blueprint["matching"].count = 1; blueprint["matching"].marksPerQuestion = 5; } // 5
    } else {
      if (blueprint["mcq"]) { blueprint["mcq"].enabled = true; blueprint["mcq"].count = 5; blueprint["mcq"].marksPerQuestion = 1; }
      if (blueprint["fillInTheBlanks"]) { blueprint["fillInTheBlanks"].enabled = true; blueprint["fillInTheBlanks"].count = 5; blueprint["fillInTheBlanks"].marksPerQuestion = 1; }
      if (blueprint["trueFalse"]) { blueprint["trueFalse"].enabled = true; blueprint["trueFalse"].count = 5; blueprint["trueFalse"].marksPerQuestion = 1; }
      else if (blueprint["mentalMath"]) { blueprint["mentalMath"].enabled = true; blueprint["mentalMath"].count = 5; blueprint["mentalMath"].marksPerQuestion = 1; }
      else if (blueprint["shortQuestions"]) { blueprint["shortQuestions"].enabled = true; blueprint["shortQuestions"].count = 5; blueprint["shortQuestions"].marksPerQuestion = 1; }
    }
  } else if (preset === "annual") {
    // 🎯 বার্ষিক পরীক্ষা: ১০০ নম্বর
    if (blueprint["mcq"]) { blueprint["mcq"].enabled = true; blueprint["mcq"].count = 10; blueprint["mcq"].marksPerQuestion = 1; } // 10
    if (blueprint["fillInTheBlanks"]) { blueprint["fillInTheBlanks"].enabled = true; blueprint["fillInTheBlanks"].count = 10; blueprint["fillInTheBlanks"].marksPerQuestion = 1; } // 10
    if (blueprint["trueFalse"]) { blueprint["trueFalse"].enabled = true; blueprint["trueFalse"].count = 10; blueprint["trueFalse"].marksPerQuestion = 1; } // 10
    if (blueprint["matching"]) { blueprint["matching"].enabled = true; blueprint["matching"].count = 1; blueprint["matching"].marksPerQuestion = 10; } // 10
    if (blueprint["rearrange"]) { blueprint["rearrange"].enabled = true; blueprint["rearrange"].count = 5; blueprint["rearrange"].marksPerQuestion = 2; } // 10
    if (blueprint["shortQuestions"]) { blueprint["shortQuestions"].enabled = true; blueprint["shortQuestions"].count = 10; blueprint["shortQuestions"].marksPerQuestion = 2; } // 20
    if (blueprint["broadQuestions"]) { blueprint["broadQuestions"].enabled = true; blueprint["broadQuestions"].count = 4; blueprint["broadQuestions"].marksPerQuestion = 5; } // 20
    if (blueprint["poemCompletion"]) { blueprint["poemCompletion"].enabled = true; blueprint["poemCompletion"].count = 1; blueprint["poemCompletion"].marksPerQuestion = 10; } // 10
  } else {
    // 🎯 NCTB সরকারি সামষ্টিক মূল্যায়ন ২০২৬ (NCTB Summative)
    if (isEarlyClass) {
      // প্রাক-প্রাথমিক ও শ্রেণি ১-২: ৫০ নম্বর
      if (subjectKey === "math") {
        if (blueprint["mcq"]) { blueprint["mcq"].enabled = true; blueprint["mcq"].count = 5; blueprint["mcq"].marksPerQuestion = 2; } // 10
        if (blueprint["fillInTheBlanks"]) { blueprint["fillInTheBlanks"].enabled = true; blueprint["fillInTheBlanks"].count = 5; blueprint["fillInTheBlanks"].marksPerQuestion = 2; } // 10
        if (blueprint["matching"]) { blueprint["matching"].enabled = true; blueprint["matching"].count = 1; blueprint["matching"].marksPerQuestion = 5; } // 5
        if (blueprint["shortQuestions"]) { blueprint["shortQuestions"].enabled = true; blueprint["shortQuestions"].count = 5; blueprint["shortQuestions"].marksPerQuestion = 2; } // 10
        if (blueprint["broadQuestions"]) { blueprint["broadQuestions"].enabled = true; blueprint["broadQuestions"].count = 3; blueprint["broadQuestions"].marksPerQuestion = 5; } // 15
      } else if (subjectKey === "combined") {
        // 🧸 আমার বই - প্রাক-প্রাথমিক সমন্বিত (৪+ ও ৫+ স্তর): ৫০ নম্বর
        if (blueprint["mcq"]) { blueprint["mcq"].enabled = true; blueprint["mcq"].count = 5; blueprint["mcq"].marksPerQuestion = 1; } // 5
        if (blueprint["fillInTheBlanks"]) { blueprint["fillInTheBlanks"].enabled = true; blueprint["fillInTheBlanks"].count = 5; blueprint["fillInTheBlanks"].marksPerQuestion = 2; } // 10
        if (blueprint["matching"]) { blueprint["matching"].enabled = true; blueprint["matching"].count = 1; blueprint["matching"].marksPerQuestion = 10; } // 10
        if (blueprint["wordMeaning"]) { blueprint["wordMeaning"].enabled = true; blueprint["wordMeaning"].count = 5; blueprint["wordMeaning"].marksPerQuestion = 1; } // 5
        if (blueprint["shortQuestions"]) { blueprint["shortQuestions"].enabled = true; blueprint["shortQuestions"].count = 5; blueprint["shortQuestions"].marksPerQuestion = 2; } // 10
        if (blueprint["broadQuestions"]) { blueprint["broadQuestions"].enabled = true; blueprint["broadQuestions"].count = 1; blueprint["broadQuestions"].marksPerQuestion = 5; } // 5
        if (blueprint["poemCompletion"]) { blueprint["poemCompletion"].enabled = true; blueprint["poemCompletion"].count = 1; blueprint["poemCompletion"].marksPerQuestion = 5; } // 5
      } else if (subjectKey === "english") {
        if (classId === "pre-primary") {
          // 🧸 প্রাক-প্রাথমিক (৪+ ও ৫+ সমন্বিত): ৫০ নম্বর
          if (blueprint["mcq"]) { blueprint["mcq"].enabled = true; blueprint["mcq"].count = 5; blueprint["mcq"].marksPerQuestion = 1; } // 5 (ছবির প্রথম বর্ণ / সংখ্যা টিক)
          if (blueprint["matching"]) { blueprint["matching"].enabled = true; blueprint["matching"].count = 1; blueprint["matching"].marksPerQuestion = 10; } // 10 (ক্যাপিটাল-স্মল ও ছবি-শব্দ মিল)
          if (blueprint["fillInTheBlanks"]) { blueprint["fillInTheBlanks"].enabled = true; blueprint["fillInTheBlanks"].count = 5; blueprint["fillInTheBlanks"].marksPerQuestion = 2; } // 10 (ফাঁকা ঘরে বর্ণ ও সংখ্যা)
          if (blueprint["wordMeaning"]) { blueprint["wordMeaning"].enabled = true; blueprint["wordMeaning"].count = 5; blueprint["wordMeaning"].marksPerQuestion = 1; } // 5 (সহজ শব্দের বাংলা অর্থ)
          if (blueprint["shortQuestions"]) { blueprint["shortQuestions"].enabled = true; blueprint["shortQuestions"].count = 5; blueprint["shortQuestions"].marksPerQuestion = 2; } // 10 (বস্তু গুনে সংখ্যা, অ্যাকশন, পরিচিতি)
          if (blueprint["poemCompletion"]) { blueprint["poemCompletion"].enabled = true; blueprint["poemCompletion"].count = 1; blueprint["poemCompletion"].marksPerQuestion = 5; } // 5 (ছড়া আবৃত্তি ও অভিনয়)
          if (blueprint["broadQuestions"]) { blueprint["broadQuestions"].enabled = true; blueprint["broadQuestions"].count = 1; blueprint["broadQuestions"].marksPerQuestion = 5; } // 5 (ডট মিলিয়ে আঁকাআঁকি ও রঙ করা)
        } else if (classId === "class-1") {
          // ১ম শ্রেণি: ৫০ নম্বর
          if (blueprint["matching"]) { blueprint["matching"].enabled = true; blueprint["matching"].count = 1; blueprint["matching"].marksPerQuestion = 10; } // 10
          if (blueprint["fillInTheBlanks"]) { blueprint["fillInTheBlanks"].enabled = true; blueprint["fillInTheBlanks"].count = 5; blueprint["fillInTheBlanks"].marksPerQuestion = 2; } // 10
          if (blueprint["wordMeaning"]) { blueprint["wordMeaning"].enabled = true; blueprint["wordMeaning"].count = 5; blueprint["wordMeaning"].marksPerQuestion = 2; } // 10
          if (blueprint["shortQuestions"]) { blueprint["shortQuestions"].enabled = true; blueprint["shortQuestions"].count = 5; blueprint["shortQuestions"].marksPerQuestion = 2; } // 10
          if (blueprint["broadQuestions"]) { blueprint["broadQuestions"].enabled = true; blueprint["broadQuestions"].count = 1; blueprint["broadQuestions"].marksPerQuestion = 10; } // 10
        } else {
          // ২য় শ্রেণি: ৫০ নম্বর
          if (blueprint["wordMeaning"]) { blueprint["wordMeaning"].enabled = true; blueprint["wordMeaning"].count = 5; blueprint["wordMeaning"].marksPerQuestion = 2; } // 10
          if (blueprint["fillInTheBlanks"]) { blueprint["fillInTheBlanks"].enabled = true; blueprint["fillInTheBlanks"].count = 5; blueprint["fillInTheBlanks"].marksPerQuestion = 2; } // 10
          if (blueprint["rearrange"]) { blueprint["rearrange"].enabled = true; blueprint["rearrange"].count = 5; blueprint["rearrange"].marksPerQuestion = 1; } // 5
          if (blueprint["matching"]) { blueprint["matching"].enabled = true; blueprint["matching"].count = 1; blueprint["matching"].marksPerQuestion = 5; } // 5
          if (blueprint["shortQuestions"]) { blueprint["shortQuestions"].enabled = true; blueprint["shortQuestions"].count = 5; blueprint["shortQuestions"].marksPerQuestion = 2; } // 10
          if (blueprint["broadQuestions"]) { blueprint["broadQuestions"].enabled = true; blueprint["broadQuestions"].count = 1; blueprint["broadQuestions"].marksPerQuestion = 10; } // 10
        }
      } else {
        // বাংলা (৫০ নম্বর - প্রাক-প্রাথমিক, ১ম ও ২য় শ্রেণি)
        if (classId === "pre-primary") {
          if (blueprint["mcq"]) { blueprint["mcq"].enabled = true; blueprint["mcq"].count = 5; blueprint["mcq"].marksPerQuestion = 1; } // 5
          if (blueprint["fillInTheBlanks"]) { blueprint["fillInTheBlanks"].enabled = true; blueprint["fillInTheBlanks"].count = 5; blueprint["fillInTheBlanks"].marksPerQuestion = 2; } // 10
          if (blueprint["matching"]) { blueprint["matching"].enabled = true; blueprint["matching"].count = 1; blueprint["matching"].marksPerQuestion = 10; } // 10
          if (blueprint["wordMeaning"]) { blueprint["wordMeaning"].enabled = true; blueprint["wordMeaning"].count = 5; blueprint["wordMeaning"].marksPerQuestion = 1; } // 5
          if (blueprint["shortQuestions"]) { blueprint["shortQuestions"].enabled = true; blueprint["shortQuestions"].count = 5; blueprint["shortQuestions"].marksPerQuestion = 2; } // 10
          if (blueprint["broadQuestions"]) { blueprint["broadQuestions"].enabled = true; blueprint["broadQuestions"].count = 1; blueprint["broadQuestions"].marksPerQuestion = 5; } // 5
          if (blueprint["poemCompletion"]) { blueprint["poemCompletion"].enabled = true; blueprint["poemCompletion"].count = 1; blueprint["poemCompletion"].marksPerQuestion = 5; } // 5
        } else if (classId === "class-1") {
          if (blueprint["matching"]) { blueprint["matching"].enabled = true; blueprint["matching"].count = 1; blueprint["matching"].marksPerQuestion = 10; } // 10
          if (blueprint["fillInTheBlanks"]) { blueprint["fillInTheBlanks"].enabled = true; blueprint["fillInTheBlanks"].count = 5; blueprint["fillInTheBlanks"].marksPerQuestion = 2; } // 10
          if (blueprint["wordMeaning"]) { blueprint["wordMeaning"].enabled = true; blueprint["wordMeaning"].count = 5; blueprint["wordMeaning"].marksPerQuestion = 2; } // 10
          if (blueprint["shortQuestions"]) { blueprint["shortQuestions"].enabled = true; blueprint["shortQuestions"].count = 5; blueprint["shortQuestions"].marksPerQuestion = 2; } // 10
          if (blueprint["broadQuestions"]) { blueprint["broadQuestions"].enabled = true; blueprint["broadQuestions"].count = 1; blueprint["broadQuestions"].marksPerQuestion = 10; } // 10
        } else {
          // ২য় শ্রেণি
          if (blueprint["yuktaborno"]) { blueprint["yuktaborno"].enabled = true; blueprint["yuktaborno"].count = 5; blueprint["yuktaborno"].marksPerQuestion = 2; } // 10
          if (blueprint["wordMeaning"]) { blueprint["wordMeaning"].enabled = true; blueprint["wordMeaning"].count = 5; blueprint["wordMeaning"].marksPerQuestion = 2; } // 10
          if (blueprint["fillInTheBlanks"]) { blueprint["fillInTheBlanks"].enabled = true; blueprint["fillInTheBlanks"].count = 5; blueprint["fillInTheBlanks"].marksPerQuestion = 1; } // 5
          if (blueprint["rearrange"]) { blueprint["rearrange"].enabled = true; blueprint["rearrange"].count = 5; blueprint["rearrange"].marksPerQuestion = 1; } // 5
          if (blueprint["shortQuestions"]) { blueprint["shortQuestions"].enabled = true; blueprint["shortQuestions"].count = 5; blueprint["shortQuestions"].marksPerQuestion = 2; } // 10
          if (blueprint["broadQuestions"]) { blueprint["broadQuestions"].enabled = true; blueprint["broadQuestions"].count = 1; blueprint["broadQuestions"].marksPerQuestion = 10; } // 10
        }
      }
    } else {
      // শ্রেণি ৩, ৪ ও ৫: ৭০ নম্বর
      if (subjectKey === "science" || subjectKey === "bgs" || subjectKey === "religion") {
        if (blueprint["mcq"]) { blueprint["mcq"].enabled = true; blueprint["mcq"].count = 10; blueprint["mcq"].marksPerQuestion = 1; } // 10
        if (blueprint["fillInTheBlanks"]) { blueprint["fillInTheBlanks"].enabled = true; blueprint["fillInTheBlanks"].count = 5; blueprint["fillInTheBlanks"].marksPerQuestion = 1; } // 5
        if (blueprint["trueFalse"]) { blueprint["trueFalse"].enabled = true; blueprint["trueFalse"].count = 5; blueprint["trueFalse"].marksPerQuestion = 1; } // 5
        if (blueprint["matching"]) { blueprint["matching"].enabled = true; blueprint["matching"].count = 1; blueprint["matching"].marksPerQuestion = 5; } // 5
        if (blueprint["shortQuestions"]) { blueprint["shortQuestions"].enabled = true; blueprint["shortQuestions"].count = 5; blueprint["shortQuestions"].marksPerQuestion = 3; } // 15
        if (blueprint["broadQuestions"]) { blueprint["broadQuestions"].enabled = true; blueprint["broadQuestions"].count = 5; blueprint["broadQuestions"].marksPerQuestion = 6; } // 30
      } else if (subjectKey === "english") {
        // 🇬🇧 NCTB ২০২৬ কাঠামো: পার্ট-এ (সিন প্যাসেজ ২৫ নম্বর) + পার্ট-বি (ব্যাকরণ ও রচনা ৪৫ নম্বর) = মোট ৭০ নম্বর
        if (blueprint["rearrange"]) { blueprint["rearrange"].enabled = true; blueprint["rearrange"].count = 5; blueprint["rearrange"].marksPerQuestion = 1; } // 5
        if (blueprint["whQuestions"]) { blueprint["whQuestions"].enabled = true; blueprint["whQuestions"].count = 5; blueprint["whQuestions"].marksPerQuestion = 2; } // 10
        if (blueprint["punctuation"]) { blueprint["punctuation"].enabled = true; blueprint["punctuation"].count = 5; blueprint["punctuation"].marksPerQuestion = 1; } // 5
        if (blueprint["oppositeWords"]) { blueprint["oppositeWords"].enabled = true; blueprint["oppositeWords"].count = 5; blueprint["oppositeWords"].marksPerQuestion = 1; } // 5
        if (blueprint["matching"]) { blueprint["matching"].enabled = true; blueprint["matching"].count = 1; blueprint["matching"].marksPerQuestion = 5; } // 5
        if (blueprint["dialogue"]) { blueprint["dialogue"].enabled = true; blueprint["dialogue"].count = 1; blueprint["dialogue"].marksPerQuestion = 5; } // 5
        if (blueprint["poemCompletion"]) { blueprint["poemCompletion"].enabled = true; blueprint["poemCompletion"].count = 1; blueprint["poemCompletion"].marksPerQuestion = 5; } // 5
        if (blueprint["broadQuestions"]) { blueprint["broadQuestions"].enabled = true; blueprint["broadQuestions"].count = 1; blueprint["broadQuestions"].marksPerQuestion = 5; } // 5
      } else if (subjectKey === "math") {
        if (blueprint["mcq"]) { blueprint["mcq"].enabled = true; blueprint["mcq"].count = 10; blueprint["mcq"].marksPerQuestion = 1; } // 10
        if (blueprint["fillInTheBlanks"]) { blueprint["fillInTheBlanks"].enabled = true; blueprint["fillInTheBlanks"].count = 5; blueprint["fillInTheBlanks"].marksPerQuestion = 1; } // 5
        if (blueprint["shortQuestions"]) { blueprint["shortQuestions"].enabled = true; blueprint["shortQuestions"].count = 5; blueprint["shortQuestions"].marksPerQuestion = 3; } // 15
        if (blueprint["broadQuestions"]) { blueprint["broadQuestions"].enabled = true; blueprint["broadQuestions"].count = 5; blueprint["broadQuestions"].marksPerQuestion = 8; } // 40
      } else {
        // বাংলা (৭০ নম্বর: সিন অনুচ্ছেদ ২৫ নম্বর + ব্যাকরণ ও নির্মিতি ৪৫ নম্বর)
        if (blueprint["yuktaborno"]) { blueprint["yuktaborno"].enabled = true; blueprint["yuktaborno"].count = 5; blueprint["yuktaborno"].marksPerQuestion = 2; } // 10
        if (blueprint["punctuation"]) { blueprint["punctuation"].enabled = true; blueprint["punctuation"].count = 1; blueprint["punctuation"].marksPerQuestion = 5; } // 5
        if (blueprint["oppositeWords"]) { blueprint["oppositeWords"].enabled = true; blueprint["oppositeWords"].count = 5; blueprint["oppositeWords"].marksPerQuestion = 1; } // 5
        if (blueprint["oneWord"]) { blueprint["oneWord"].enabled = true; blueprint["oneWord"].count = 5; blueprint["oneWord"].marksPerQuestion = 1; } // 5
        if (blueprint["poemCompletion"]) { blueprint["poemCompletion"].enabled = true; blueprint["poemCompletion"].count = 1; blueprint["poemCompletion"].marksPerQuestion = 10; } // 10
        if (blueprint["broadQuestions"]) { blueprint["broadQuestions"].enabled = true; blueprint["broadQuestions"].count = 1; blueprint["broadQuestions"].marksPerQuestion = 10; } // 10
      }
    }
  }

  return blueprint;
}

export function getDefaultSeenConfig(
  classId: string,
  subjectKey: string,
  preset: PresetType
): SeenBlueprintConfig {
  const isEnglishOrBangla = subjectKey === "english" || subjectKey === "bangla";
  const isEarlyClass = classId === "pre-primary" || classId === "class-1" || classId === "class-2";
  const shouldEnable = isEnglishOrBangla && !isEarlyClass && (preset === "nctb_summative" || preset === "annual");
  return {
    enabled: shouldEnable,
    passageId: "auto",
    subQuestions: {
      mcqCount: 5,
      mcqMarks: 1,
      fillCount: 5,
      fillMarks: 1,
      trueFalseCount: 5,
      trueFalseMarks: 1,
      shortCount: 5,
      shortMarks: 2
    }
  };
}

export function calculateSeenMarks(config?: SeenBlueprintConfig): { totalQuestions: number; totalMarks: number } {
  if (!config || !config.enabled) return { totalQuestions: 0, totalMarks: 0 };
  const sq = config.subQuestions;
  const questions = (sq.mcqCount || 0) + (sq.fillCount || 0) + (sq.trueFalseCount || 0) + (sq.shortCount || 0);
  const marks = (sq.mcqCount * sq.mcqMarks) + 
                (sq.fillCount * sq.fillMarks) + 
                (sq.trueFalseCount * sq.trueFalseMarks) + 
                (sq.shortCount * sq.shortMarks);
  return { totalQuestions: questions, totalMarks: marks };
}

export function calculateBlueprintTotal(
  blueprint: ExamBlueprintConfig,
  seenConfig?: SeenBlueprintConfig
): { totalQuestions: number; totalMarks: number } {
  let totalQuestions = 0;
  let totalMarks = 0;
  Object.values(blueprint).forEach(c => {
    if (c.enabled && c.count > 0) {
      totalQuestions += c.count;
      totalMarks += c.count * c.marksPerQuestion;
    }
  });

  if (seenConfig && seenConfig.enabled) {
    const seenTotals = calculateSeenMarks(seenConfig);
    totalQuestions += seenTotals.totalQuestions;
    totalMarks += seenTotals.totalMarks;
  }

  return { totalQuestions, totalMarks };
}
