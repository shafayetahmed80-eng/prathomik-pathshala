export interface QuestionBase {
  id?: string;
  marks: number;
  chapterId?: string;
  lessonId?: string;
}

export interface McqQuestion extends QuestionBase {
  question: string;
  options: string[];
  answer: string;
}

export interface FillBlankQuestion extends QuestionBase {
  sentence: string;
  answer: string;
}

export interface MatchingQuestion extends QuestionBase {
  left: string[];
  right: string[];
}

export interface ShortQuestion extends QuestionBase {
  question: string;
  answer: string;
}

export interface BroadQuestion extends QuestionBase {
  question: string;
  answer: string;
}

export interface YuktabornoQuestion extends QuestionBase {
  cluster: string;
  breakdown: string;
  word: string;
  sentence: string;
}

export interface WordMeaningQuestion extends QuestionBase {
  word: string;
  meaning: string;
}

export interface TrueFalseQuestion extends QuestionBase {
  statement: string;
  isTrue: boolean;
  answer: string;
}

export interface RearrangeQuestion extends QuestionBase {
  jumbled: string;
  correct: string;
}

export interface OppositeWordQuestion extends QuestionBase {
  word: string;
  opposite: string;
}

export interface PoemCompletionQuestion extends QuestionBase {
  title: string;
  prompt: string;
  lines: string[];
}

export interface ComprehensionQuestion extends QuestionBase {
  passage: string;
  questions: { question: string; answer: string; marks: number }[];
}

export interface OneWordQuestion extends QuestionBase {
  phrase: string;
  answer: string;
}

export interface SynonymQuestion extends QuestionBase {
  word: string;
  synonyms: string[];
  answer: string;
}

export interface PunctuationQuestion extends QuestionBase {
  unpunctuated: string;
  punctuated: string;
}

export interface WhQuestion extends QuestionBase {
  statement: string;
  underlined: string;
  expectedQuestion: string;
}

export interface TranslationQuestion extends QuestionBase {
  source: string;
  target: string;
  direction: "bn_to_en" | "en_to_bn";
}

export interface SpellingQuestion extends QuestionBase {
  incorrect: string;
  correct: string;
  options?: string[];
}

export interface DialogueQuestion extends QuestionBase {
  context: string;
  conversation: { speaker: string; text: string; isBlank?: boolean }[];
}

export interface FormFillupQuestion extends QuestionBase {
  formTitle: string;
  fields: { label: string; placeholder?: string; value?: string }[];
}

export interface MentalMathQuestion extends QuestionBase {
  problem: string;
  answer: string;
}

export interface RelationSymbolQuestion extends QuestionBase {
  left: string;
  right: string;
  correctSymbol: "<" | ">" | "=";
}

export interface PlaceValueQuestion extends QuestionBase {
  number: string;
  digit: string;
  placeValue: string;
}

export interface InWordsQuestion extends QuestionBase {
  figure: string;
  inWords: string;
}

export interface GeometryQuestion extends QuestionBase {
  term: string;
  definition: string;
  drawInstruction: string;
}

export interface TimeMeasurementQuestion extends QuestionBase {
  problem: string;
  answer: string;
}

export interface ClassificationQuestion extends QuestionBase {
  title: string;
  items: string[];
  columns: { name: string; items: string[] }[];
}

export interface DifferencesQuestion extends QuestionBase {
  itemA: string;
  itemB: string;
  points: { aspect: string; valA: string; valB: string }[];
}

export interface CauseEffectQuestion extends QuestionBase {
  topic: string;
  causes: string[];
  effects: string[];
}

export interface SeenPassageItem {
  id: string;
  classId: string;
  subjectKey: string;
  unitNumber: number;
  unitTitle: string;
  lessonId?: string;
  lessonTitle?: string;
  title: string;
  sourceText: string;
  clues: string[];
  mcq: McqQuestion[];
  fillInTheBlanks: FillBlankQuestion[];
  trueFalse: TrueFalseQuestion[];
  shortQuestions: ShortQuestion[];
}

export interface SeenSubQuestionConfig {
  mcqCount: number;
  mcqMarks: number;
  fillCount: number;
  fillMarks: number;
  trueFalseCount: number;
  trueFalseMarks: number;
  shortCount: number;
  shortMarks: number;
}

export interface SeenBlueprintConfig {
  enabled: boolean;
  passageId: string; // "auto" or specific passage ID
  subQuestions: SeenSubQuestionConfig;
}

export interface CategoryBlueprintConfig {
  key: string;
  label: string;
  enabled: boolean;
  count: number;
  marksPerQuestion: number;
  defaultMarks: number;
  description?: string;
  group?: "core" | "language" | "math" | "science";
}

export type ExamBlueprintConfig = Record<string, CategoryBlueprintConfig>;

export interface ExamQuestionItem {
  id: string;
  classId: string;
  subject: string;
  seenPassage?: SeenPassageItem;
  mcq: McqQuestion[];
  fillInTheBlanks: FillBlankQuestion[];
  matching: MatchingQuestion;
  shortQuestions: ShortQuestion[];
  broadQuestions: BroadQuestion[];
  yuktaborno?: YuktabornoQuestion[];
  wordMeaning?: WordMeaningQuestion[];
  trueFalse?: TrueFalseQuestion[];
  rearrange?: RearrangeQuestion[];
  oppositeWords?: OppositeWordQuestion[];
  poemCompletion?: PoemCompletionQuestion[];
  comprehension?: ComprehensionQuestion[];
  oneWord?: OneWordQuestion[];
  synonyms?: SynonymQuestion[];
  punctuation?: PunctuationQuestion[];
  whQuestions?: WhQuestion[];
  translation?: TranslationQuestion[];
  spelling?: SpellingQuestion[];
  dialogue?: DialogueQuestion[];
  formFillup?: FormFillupQuestion[];
  mentalMath?: MentalMathQuestion[];
  relationSymbols?: RelationSymbolQuestion[];
  placeValue?: PlaceValueQuestion[];
  inWords?: InWordsQuestion[];
  geometry?: GeometryQuestion[];
  timeMeasurement?: TimeMeasurementQuestion[];
  classification?: ClassificationQuestion[];
  differences?: DifferencesQuestion[];
  causeEffect?: CauseEffectQuestion[];
}

export interface SubjectOption {
  key: string;
  name: string;
  icon?: string;
}

export const CLASS_SUBJECTS_MAP: Record<string, SubjectOption[]> = {
  "pre-primary": [
    { key: "english", name: "English (৪+ ও ৫+ সমন্বিত)" },
    { key: "combined", name: "আমার বই - সমন্বিত (৪+ ও ৫+)" },
    { key: "bangla", name: "বাংলা ও বর্ণমালা (৪+ ও ৫+)" },
    { key: "math", name: "গণিত ও প্রাক-সংখ্যা ধারণা (৪+ ও ৫+)" }
  ],
  "class-1": [
    { key: "bangla", name: "বাংলা" },
    { key: "english", name: "English" },
    { key: "math", name: "গণিত" }
  ],
  "class-2": [
    { key: "bangla", name: "বাংলা" },
    { key: "english", name: "English" },
    { key: "math", name: "গণিত" }
  ],
  "class-3": [
    { key: "bangla", name: "বাংলা" },
    { key: "english", name: "English" },
    { key: "math", name: "গণিত" },
    { key: "science", name: "প্রাথমিক বিজ্ঞান" },
    { key: "bgs", name: "বাংলাদেশ ও বিশ্বপরিচয়" },
    { key: "islamic", name: "ইসলাম ও নৈতিক শিক্ষা" },
    { key: "hindu", name: "হিন্দুধর্ম ও নৈতিক শিক্ষা" }
  ],
  "class-4": [
    { key: "bangla", name: "বাংলা" },
    { key: "english", name: "English" },
    { key: "math", name: "প্রাথমিক গণিত" },
    { key: "science", name: "প্রাথমিক বিজ্ঞান" },
    { key: "bgs", name: "বাংলাদেশ ও বিশ্বপরিচয়" },
    { key: "islamic", name: "ইসলাম ও নৈতিক শিক্ষা" },
    { key: "hindu", name: "হিন্দুধর্ম ও নৈতিক শিক্ষা" },
    { key: "buddhist", name: "বৌদ্ধধর্ম ও নৈতিক শিক্ষা" },
    { key: "christian", name: "খ্রিষ্টধর্ম ও নৈতিক শিক্ষা" }
  ],
  "class-5": [
    { key: "bangla", name: "বাংলা" },
    { key: "english", name: "English" },
    { key: "math", name: "গণিত" },
    { key: "science", name: "প্রাথমিক বিজ্ঞান" },
    { key: "bgs", name: "বাংলাদেশ ও বিশ্বপরিচয়" },
    { key: "islamic", name: "ইসলাম ও নৈতিক শিক্ষা" },
    { key: "hindu", name: "হিন্দুধর্ম ও নৈতিক শিক্ষা" }
  ]
};

export const EXAM_DATABASE: Record<string, ExamQuestionItem> = {
  // ==========================================
  // 🧸 PRE-PRIMARY (প্রাক-প্রাথমিক: ৪+ ও ৫+ সমন্বিত)
  // ==========================================
  "pre-primary-bangla": {
    id: "pp-b",
    classId: "pre-primary",
    subject: "বাংলা",
    mcq: [
      { id: "ppb-m1", question: "🥭 আম ছবির প্রথম বর্ণ কোনটি?", options: ["অ", "আ", "ই", "ঈ"], answer: "আ", marks: 1 },
      { id: "ppb-m2", question: "🐟 ইলিশ মাছের ছবির প্রথম বর্ণ কোনটি?", options: ["ই", "ঈ", "উ", "ঋ"], answer: "ই", marks: 1 },
      { id: "ppb-m3", question: "✏️ কলম ছবির প্রথম বর্ণ কোনটি?", options: ["ক", "খ", "গ", "ঘ"], answer: "ক", marks: 1 },
      { id: "ppb-m4", question: "⭐️⭐️⭐️ এখানে কয়টি তারা আছে?", options: ["১", "২", "৩", "৪"], answer: "৩", marks: 1 },
      { id: "ppb-m5", question: "আমাদের জাতীয় ফুলের নাম কী?", options: ["গোলাপ", "শাপলা", "জবা", "গাঁদা"], answer: "শাপলা", marks: 1 }
    ],
    fillInTheBlanks: [
      { id: "ppb-f1", sentence: "অ, [       ], ই, [       ], উ (খালি ঘরে বর্ণ বসাও)", answer: "আ, ঈ", marks: 2 },
      { id: "ppb-f2", sentence: "ক, [       ], গ, [       ], ঙ (খালি ঘরে বর্ণ বসাও)", answer: "খ, ঘ", marks: 2 },
      { id: "ppb-f3", sentence: "১, ২, [       ], ৪, [       ] (খালি ঘরে সংখ্যা বসাও)", answer: "৩, ৫", marks: 2 },
      { id: "ppb-f4", sentence: "আতা গাছে তোতা পাখি, ডালিম গাছে ____।", answer: "মৌ", marks: 2 },
      { id: "ppb-f5", sentence: "আম গাছে ধরে ____ ফল।", answer: "মিষ্টি", marks: 2 }
    ],
    matching: {
      id: "ppb-mat1",
      marks: 10,
      left: ["🥭 আম", "🐟 ইলিশ", "✏️ কলম", "🌺 শাপলা", "⚽ বল"],
      right: ["ক", "ব", "আ", "ই", "শ"]
    },
    wordMeaning: [
      { id: "ppb-wm1", word: "আম", meaning: "একটি মিষ্টি ও রসালো ফল", marks: 1 },
      { id: "ppb-wm2", word: "বল", meaning: "খেলার গোল বস্তু", marks: 1 },
      { id: "ppb-wm3", word: "দোয়েল", meaning: "আমাদের জাতীয় পাখি", marks: 1 },
      { id: "ppb-wm4", word: "শাপলা", meaning: "আমাদের জাতীয় ফুল", marks: 1 },
      { id: "ppb-wm5", word: "নদী", meaning: "বহমান পানির ধারা", marks: 1 }
    ],
    shortQuestions: [
      { id: "ppb-sq1", question: "⭐️⭐️⭐️⭐️ এখানে কয়টি তারা আছে? গুনে সংখ্যায় লেখো: [       ]", answer: "৪", marks: 2 },
      { id: "ppb-sq2", question: "তোমার নিজের নাম বাংলায় বলো বা লেখো: [                   ]", answer: "শিক্ষার্থীর নাম", marks: 2 },
      { id: "ppb-sq3", question: "পেন্সিল দিয়ে ডট মিলিয়ে একটি বৃত্ত (গোল ○) আঁকো: .  .  .  .", answer: "বৃত্ত অঙ্কন", marks: 2 },
      { id: "ppb-sq4", question: "আমাদের জাতীয় পাখির নাম কী?", answer: "দোয়েল", marks: 2 },
      { id: "ppb-sq5", question: "পেন্সিল দিয়ে সোজা খাড়া রেখা টানো: |  |  |", answer: "রেখা অঙ্কন", marks: 2 }
    ],
    poemCompletion: [
      {
        id: "ppb-p1",
        title: "আতা গাছে তোতা পাখি",
        prompt: "আতা গাছে তোতা পাখি ছড়াটি মুখস্থ আবৃত্তি করো",
        lines: [
          "আতা গাছে তোতা পাখি,",
          "ডালিম গাছে মৌ,",
          "এত ডাকি তবু কথা",
          "কও না কেন বউ?"
        ],
        marks: 5
      }
    ],
    broadQuestions: [
      { id: "ppb-bq1", question: "পেন্সিল দিয়ে ডট মিলিয়ে একটি সুন্দর আমের (Mango) ছবি আঁকো এবং তাতে হলুদ রঙ করো।", answer: "আমের ছবি অঙ্কন ও রঙ সম্পন্ন করা।", marks: 5 }
    ]
  },
  "pre-primary-math": {
    id: "pp-m",
    classId: "pre-primary",
    subject: "গণিত",
    mcq: [
      { id: "ppm-m1", question: "কোন ছবিটি সবচেয়ে বড়? 🐘 হাতি নাকি 🐁 ইঁদুর?", options: ["হাতি", "ইঁদুর", "দুটোই সমান", "কোনোটিই নয়"], answer: "হাতি", marks: 1 },
      { id: "ppm-m2", question: "🍎🍎 এখানে কয়টি আপেল আছে?", options: ["১টি", "২টি", "৩টি", "৪টি"], answer: "২টি", marks: 1 },
      { id: "ppm-m3", question: "গোল বা বৃত্তাকার আকৃতি কোনটি?", options: ["○ (গোল)", "△ (তিনকোনা)", "▢ (চারকোনা)", "+ (যোগ)"], answer: "○ (গোল)", marks: 1 },
      { id: "ppm-m4", question: "১, ২, ৩ - এর পরের সংখ্যাটি কী?", options: ["৪", "৫", "২", "৬"], answer: "৪", marks: 1 },
      { id: "ppm-m5", question: "একটিও না থাকলে বা খালি থাকলে কোন সংখ্যা হয়?", options: ["০ (শূন্য)", "১ (এক)", "৫ (পাঁচ)", "১০ (দশ)"], answer: "০ (শূন্য)", marks: 1 }
    ],
    fillInTheBlanks: [
      { id: "ppm-f1", sentence: "১, [       ], ৩, [       ], ৫ (খালি ঘরে সংখ্যা বসাও)", answer: "২, ৪", marks: 2 },
      { id: "ppm-f2", sentence: "৬, ৭, [       ], ৯, [       ] (খালি ঘরে সংখ্যা বসাও)", answer: "৮, ১০", marks: 2 },
      { id: "ppm-f3", sentence: "তিনকোনা আকৃতি দেখতে অনেকটা ____ এর মতো।", answer: "সিঙ্গাড়ার", marks: 2 }
    ],
    matching: {
      left: ["🍎 (১টি আপেল)", "⭐️⭐️ (২টি তারা)", "🌸🌸🌸 (৩টি ফুল)", "🚗🚗🚗🚗 (৪টি গাড়ি)"],
      right: ["৩", "১", "৪", "২"],
      marks: 10
    },
    shortQuestions: [
      { id: "ppm-s1", question: "তোমার এক হাতে কয়টি আঙুল আছে গুনে বলো।", answer: "৫টি আঙুল আছে।", marks: 2 },
      { id: "ppm-s2", question: "১টি পাখির সাথে আরেকটি পাখি উড়ে আসলে মোট কয়টি পাখি হবে?", answer: "২টি পাখি হবে।", marks: 2 },
      { id: "ppm-s3", question: "৩টি বেলুন থেকে ১টি ফুটে গেলে কয়টি বেলুন থাকবে?", answer: "২টি বেলুন থাকবে।", marks: 2 },
      { id: "ppm-s4", question: "চারকোনা আকৃতির একটি জিনিসের নাম বলো।", answer: "বই বা টেবিল।", marks: 2 },
      { id: "ppm-s5", question: "১ থেকে ৫ পর্যন্ত সংখ্যাগুলো মুখে মুখে বলো।", answer: "১, ২, ৩, ৪, ৫।", marks: 2 }
    ],
    broadQuestions: [
      { id: "ppm-b1", question: "পেন্সিল দিয়ে ১টি গোল বৃত্ত (○) ও ১টি তিনকোনা (△) আকৃতি সুন্দর করে আঁকো এবং রঙ করো।", answer: "আকৃতিদ্বয় অঙ্কন ও রঙিন সম্পন্ন।", marks: 5 },
      { id: "ppm-b2", question: "ডট মিলিয়ে ১ থেকে ৫ পর্যন্ত সংখ্যাগুলো ট্রেস (Trace) করো: ১ . . ২ . . ৩ . . ৪ . . ৫", answer: "সংখ্যা ট্রেসিং সম্পন্ন।", marks: 5 }
    ]
  },


  "pre-primary-english": {
    id: "pp-eng",
    classId: "pre-primary",
    subject: "English",
    mcq: [
      { id: "ppe-m1", question: "🍎 Look at the picture. Which is the first letter? (ছবির প্রথম বর্ণ কোনটি?)", options: ["A", "B", "C", "D"], answer: "A", marks: 2 },
      { id: "ppe-m2", question: "⚽ What is the first letter of Ball? (Ball-এর প্রথম বর্ণ কোনটি?)", options: ["B", "D", "P", "T"], answer: "B", marks: 2 },
      { id: "ppe-m3", question: "⭐️⭐️⭐️ Count the stars (কয়টি তারা আছে?):", options: ["1", "2", "3", "4"], answer: "3", marks: 2 },
      { id: "ppe-m4", question: "🔴 What color is this circle? (এই বৃত্তটির রঙ কী?)", options: ["Red (লাল)", "Blue (নীল)", "Green (সবুজ)", "Yellow (হলুদ)"], answer: "Red (লাল)", marks: 2 },
      { id: "ppe-m5", question: "Capital 'A' এর Small letter কোনটি?", options: ["a", "b", "c", "d"], answer: "a", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "ppe-f1", sentence: "A, [   ], C, [   ], E (Write missing letters: B, D)", answer: "B, D", marks: 2 },
      { id: "ppe-f2", sentence: "F, [   ], H, [   ], J (Write missing letters: G, I)", answer: "G, I", marks: 2 },
      { id: "ppe-f3", sentence: "1, 2, [   ], 4, [   ] (Write missing numbers: 3, 5)", answer: "3, 5", marks: 2 },
      { id: "ppe-f4", sentence: "C - [   ] - T (Complete word Cat with: a / o)", answer: "a", marks: 2 },
      { id: "ppe-f5", sentence: "D - [   ] - G (Complete word Dog with: o / u)", answer: "o", marks: 2 }
    ],
    matching: {
      id: "ppe-mat1",
      marks: 5,
      left: ["A (Capital)", "B (Capital)", "C (Capital)", "D (Capital)", "E (Capital)"],
      right: ["c (small)", "e (small)", "a (small)", "b (small)", "d (small)"]
    },
    wordMeaning: [
      { id: "ppe-wm1", word: "Apple", meaning: "আপেল", marks: 2 },
      { id: "ppe-wm2", word: "Ball", meaning: "বল", marks: 2 },
      { id: "ppe-wm3", word: "Cat", meaning: "বিড়াল", marks: 2 },
      { id: "ppe-wm4", word: "Sun", meaning: "সূর্য", marks: 2 },
      { id: "ppe-wm5", word: "Book", meaning: "বই", marks: 2 }
    ],
    shortQuestions: [
      { id: "ppe-sq1", question: "⭐️⭐️⭐️ এখানে কয়টি তারা আছে? গুনে পাশের ঘরে লেখো: [       ]", answer: "3", marks: 2 },
      { id: "ppe-sq2", question: "🐱 ছবির প্রথম বর্ণটি ইংরেজি বড় হাতের অক্ষরে লেখো: [       ]", answer: "C", marks: 2 },
      { id: "ppe-sq3", question: "What is your name? (তোমার নাম ইংরেজিতে বলো বা লেখো): My name is ____________", answer: "Student's Name", marks: 2 },
      { id: "ppe-sq4", question: "How are you? (কেমন আছো?): I am ____________ (Fine)", answer: "Fine", marks: 2 },
      { id: "ppe-sq5", question: "পেন্সিল দিয়ে বিন্দুগুলো মিলিয়ে একটি সোজা দাগ (Standing Line) টানো: . . . . .", answer: "Straight line drawn", marks: 2 }
    ],
    poemCompletion: [
      {
        id: "ppe-p1",
        title: "Twinkle, Twinkle, Little Star",
        prompt: "Recite and complete the nursery rhyme 'Twinkle, Twinkle, Little Star'",
        lines: [
          "Twinkle, twinkle, little star,",
          "How I wonder what you are!",
          "Up above the world so high,",
          "Like a diamond in the sky."
        ],
        marks: 5
      }
    ],
    broadQuestions: [
      { id: "ppe-bq1", question: "পেন্সিল দিয়ে বিন্দুগুলো (Dots) মিলিয়ে একটি সুন্দর আপেল (Apple) আঁকো এবং তাতে লাল (Red) রঙ করো।", answer: "আপেল অঙ্কন ও রঙ সম্পন্ন করা।", marks: 5 }
    ]
  },

  // ==========================================
  // 🎒 CLASS 1 (১ম শ্রেণি)
  // ==========================================
  "class-1-bangla": {
    id: "c1-b",
    classId: "class-1",
    subject: "বাংলা",
    mcq: [
      { id: "c1b-m1", question: "আমাদের জাতীয় পাখির নাম কী?", options: ["দোয়েল", "কাক", "ময়না", "টিয়া"], answer: "দোয়েল", marks: 2 },
      { id: "c1b-m2", question: "‘অ’-এর পরের বর্ণ কোনটি?", options: ["ই", "আ", "উ", "ঋ"], answer: "আ", marks: 2 },
      { id: "c1b-m3", question: "বাংলা বর্ণমালায় মোট স্বরবর্ণ কয়টি?", options: ["৯টি", "১০টি", "১১টি", "১২টি"], answer: "১১টি", marks: 2 },
      { id: "c1b-m4", question: "আমাদের জাতীয় ফুলের নাম কী?", options: ["গোলাপ", "শাপলা", "জবা", "বেলি"], answer: "শাপলা", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c1b-f1", sentence: "ই-তে ____ খাবো।", answer: "ইলিশ", marks: 2 },
      { id: "c1b-f2", sentence: "আমাদের দেশের নাম ____।", answer: "বাংলাদেশ", marks: 2 },
      { id: "c1b-f3", sentence: "সকালে সূর্য ____ দিকে ওঠে।", answer: "পূর্ব", marks: 2 }
    ],
    matching: {
      left: ["অ", "আ", "ই", "ঈ"],
      right: ["আম", "অলি", "ঈগল", "ইলিশ"],
      marks: 4
    },
    shortQuestions: [
      { id: "c1b-s1", question: "আমাদের জাতীয় পতাকায় কয়টি রং আছে ও কী কী?", answer: "২টি রং: গাঢ় সবুজ ও লাল।", marks: 3 },
      { id: "c1b-s2", question: "যেকোনো ৩টি ফলের নাম লেখো।", answer: "আম, জাম, কাঁঠাল।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c1b-b1", question: "তোমার পাঠ্যবইয়ের যেকোনো ৪ লাইনের একটি ছড়া শুদ্ধ বানানে লেখো।", answer: "আতা গাছে তোতা পাখি / ডালিম গাছে মৌ / এতো ডাকি তবু কথা / কও না কেন বউ?", marks: 5 }
    ],
    wordMeaning: [
      { id: "c1b-w1", word: "অলি", meaning: "মৌমাছি", marks: 2 },
      { id: "c1b-w2", word: "রবি", meaning: "সূর্য", marks: 2 },
      { id: "c1b-w3", word: "বেলা", meaning: "সময়", marks: 2 }
    ]
  },

  "class-1-english": {
    id: "c1-e",
    classId: "class-1",
    subject: "English",
    mcq: [
      { id: "c1e-m1", question: "What is the first letter of the English alphabet?", options: ["B", "C", "A", "Z"], answer: "A", marks: 2 },
      { id: "c1e-m2", question: "What color is the sun?", options: ["Blue", "Yellow", "Green", "Black"], answer: "Yellow", marks: 2 },
      { id: "c1e-m3", question: "Which animal says 'Meow'?", options: ["Dog", "Cat", "Cow", "Bird"], answer: "Cat", marks: 2 },
      { id: "c1e-m4", question: "What is the English word for 'মাছ'?", options: ["Fish", "Bird", "Tree", "Pen"], answer: "Fish", marks: 2 },
      { id: "c1e-m5", question: "Which number comes after 4?", options: ["3", "5", "6", "2"], answer: "5", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c1e-f1", sentence: "C _ T (Fill missing letter: a / o)", answer: "a", marks: 2 },
      { id: "c1e-f2", sentence: "B _ L L (Fill missing letter: a / e)", answer: "a", marks: 2 },
      { id: "c1e-f3", sentence: "F _ S H (Fill missing letter: i / u)", answer: "i", marks: 2 },
      { id: "c1e-f4", sentence: "A, B, ____, D, E.", answer: "C", marks: 2 },
      { id: "c1e-f5", sentence: "Good ____, teacher. (morning / night)", answer: "morning", marks: 2 }
    ],
    matching: {
      left: ["A", "B", "C", "D", "E"],
      right: ["b", "c", "a", "e", "d"],
      marks: 10
    },
    wordMeaning: [
      { id: "c1e-w1", word: "Apple", meaning: "আপেল", marks: 2 },
      { id: "c1e-w2", word: "Ball", meaning: "বল", marks: 2 },
      { id: "c1e-w3", word: "Cat", meaning: "বিড়াল", marks: 2 },
      { id: "c1e-w4", word: "Fish", meaning: "মাছ", marks: 2 },
      { id: "c1e-w5", word: "Pen", meaning: "কলম", marks: 2 }
    ],
    shortQuestions: [
      { id: "c1e-s1", question: "What is your name? [Ans: My name is ....................]", answer: "My name is [Student Name].", marks: 2 },
      { id: "c1e-s2", question: "What class are you in? [Ans: I am in class ....................]", answer: "I am in class 1.", marks: 2 },
      { id: "c1e-s3", question: "How old are you? [Ans: I am .................... years old.]", answer: "I am 6 years old.", marks: 2 },
      { id: "c1e-s4", question: "How are you? [Ans: I am ...................., thank you.]", answer: "I am fine, thank you.", marks: 2 },
      { id: "c1e-s5", question: "Write in words: 5 = ....................", answer: "Five", marks: 2 }
    ],
    broadQuestions: [
      { id: "c1e-b1", question: "Good Handwriting: Copy the letters neatly in four lines:\nA  B  C  D  E  F  G", answer: "A B C D E F G (Neat handwriting)", marks: 10 }
    ]
  },

  "class-1-math": {
    id: "c1-m",
    classId: "class-1",
    subject: "গণিত",
    mcq: [
      { id: "c1m-m1", question: "৫ এর সাথে ৩ যোগ করলে কত হয়?", options: ["৬", "৭", "৮", "৯"], answer: "৮", marks: 2 },
      { id: "c1m-m2", question: "কোন সংখ্যাটি সবচেয়ে বড়?", options: ["৭", "৩", "৯", "৫"], answer: "৯", marks: 2 },
      { id: "c1m-m3", question: "৮ থেকে ৩ বাদ (বিয়োগ) দিলে কত থাকে?", options: ["৫", "৪", "৬", "৩"], answer: "৫", marks: 2 },
      { id: "c1m-m4", question: "একটি হাতের আঙুল কয়টি?", options: ["৪টি", "৫টি", "৬টি", "১০টি"], answer: "৫টি", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c1m-f1", sentence: "১, ২, ৩, ____, ৫।", answer: "৪", marks: 2 },
      { id: "c1m-f2", sentence: "যোগ করার জন্য আমরা ____ চিহ্ন ব্যবহার করি।", answer: "+", marks: 2 },
      { id: "c1m-f3", sentence: "দশটি এক মিলে হয় এক ____।", answer: "দশ", marks: 2 }
    ],
    matching: {
      left: ["৪ + ১", "৭ - ২", "৩ + ৩", "৯ - ১"],
      right: ["৬", "৮", "৫", "৫"],
      marks: 4
    },
    shortQuestions: [
      { id: "c1m-s1", question: "তোমার কাছে ৪টি চকলেট ছিল, মা তোমাকে আরও ২টি দিলেন। মোট কয়টি হলো?", answer: "৪ + ২ = ৬টি চকলেট।", marks: 3 },
      { id: "c1m-s2", question: "১ থেকে ১০ পর্যন্ত জোড় সংখ্যাগুলো লেখো।", answer: "২, ৪, ৬, ৮, ১০।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c1m-b1", question: "একটি গাছে ৬টি পাখি বসে ছিল। সেখান থেকে ২টি পাখি উড়ে গেল। গাছে আর কয়টি পাখি রইল? গাণিতিক বাক্যে হিসাব করো।", answer: "গাণিতিক বাক্য: ৬ - ২ = ৪। অতএব গাছে ৪টি পাখি রইল।", marks: 5 }
    ]
  },

  // ==========================================
  // 🎒 CLASS 2 (২য় শ্রেণি)
  // ==========================================
  "class-2-bangla": {
    id: "c2-b",
    classId: "class-2",
    subject: "বাংলা",
    mcq: [
      { id: "c2b-m1", question: "‘আমাদের ছোট নদী’ কবিতার কবি কে?", options: ["কাজী নজরুল ইসলাম", "রবীন্দ্রনাথ ঠাকুর", "জসীমউদ্দীন", "শামসুর রাহমান"], answer: "রবীন্দ্রনাথ ঠাকুর", marks: 2 },
      { id: "c2b-m2", question: "‘ক্ষ’ যুক্তবর্ণটি কোন দুটি বর্ণের মিলনে গঠিত?", options: ["ক + ষ", "ক + খ", "খ + ষ", "হ + ম"], answer: "ক + ষ", marks: 2 },
      { id: "c2b-m3", question: "বৈশাখ মাসে ছোট নদীর জল কেমন থাকে?", options: ["গলা সমান", "হাঁটু সমান", "বুক সমান", "মাথা সমান"], answer: "হাঁটু সমান", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c2b-f1", sentence: "বৈশাখ মাসে ছোট নদী ____ জলে বয়ে চলে।", answer: "হাঁটু", marks: 2 },
      { id: "c2b-f2", sentence: "গুরুজনকে সর্বদা ____ করতে হয়।", answer: "শ্রদ্ধা / মান্য", marks: 2 },
      { id: "c2b-f3", sentence: "আমরা আমাদের দেশকে অনেক ____ বাসি।", answer: "ভালো", marks: 2 }
    ],
    matching: {
      left: ["নদী", "সকাল", "বন", "ফুল"],
      right: ["ভোর", "জল", "সৌরভ", "জঙ্গল"],
      marks: 4
    },
    shortQuestions: [
      { id: "c2b-s1", question: "আমাদের জাতীয় কবির নাম কী?", answer: "কাজী নজরুল ইসলাম।", marks: 3 },
      { id: "c2b-s2", question: "ছোট নদীর দুই তীরে কী কী দেখা যায়?", answer: "ছোট নদীর দুই তীরে কাশবন, সাদা বকের সারি ও ছায়ার মতো গাছপালা দেখা যায়।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c2b-b1", question: "‘আমাদের ছোট নদী’ কবিতাটির প্রথম ৪টি লাইন কবির নামসহ মুখস্থ লেখো।", answer: "আমাদের ছোট নদী চলে বাঁকে বাঁকে / বৈশাখ মাসে তার হাঁটু জল থাকে। / পার হয়ে যায় গরু, পার হয় গাড়ি / দুই ধার উঁচু তার, ঢালু তার পাড়ি।", marks: 5 }
    ],
    yuktaborno: [
      { id: "c2b-y1", cluster: "ক্ত", breakdown: "ক + ত", word: "রক্ত", sentence: "আমাদের রক্তের রং লাল।", marks: 3 },
      { id: "c2b-y2", cluster: "ক্ষ", breakdown: "ক + ষ", word: "শিক্ষক", sentence: "শিক্ষক আমাদের পরম শ্রদ্ধেয়।", marks: 3 }
    ]
  },

  "class-2-english": {
    id: "c2-e",
    classId: "class-2",
    subject: "English",
    wordMeaning: [
      { id: "c2e-w1", word: "Farmer", meaning: "কৃষক", marks: 2 },
      { id: "c2e-w2", word: "River", meaning: "নদী", marks: 2 },
      { id: "c2e-w3", word: "School", meaning: "বিদ্যালয়", marks: 2 },
      { id: "c2e-w4", word: "Water", meaning: "পানি", marks: 2 },
      { id: "c2e-w5", word: "Hut", meaning: "কুঁড়েঘর", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c2e-f1", sentence: "There are ____ days in a week. (seven / six)", answer: "seven", marks: 2 },
      { id: "c2e-f2", sentence: "This is ____ apple. (a / an)", answer: "an", marks: 2 },
      { id: "c2e-f3", sentence: "A cow gives us ____. (milk / ink)", answer: "milk", marks: 2 },
      { id: "c2e-f4", sentence: "The sky is ____. (blue / red)", answer: "blue", marks: 2 },
      { id: "c2e-f5", sentence: "Saturday, Sunday, ____, Tuesday.", answer: "Monday", marks: 2 }
    ],
    rearrange: [
      { id: "c2e-r1", jumbled: "o - o - k - b", correct: "book", marks: 1 },
      { id: "c2e-r2", jumbled: "e - t - r - e", correct: "tree", marks: 1 },
      { id: "c2e-r3", jumbled: "d - i - r - b", correct: "bird", marks: 1 },
      { id: "c2e-r4", jumbled: "w - a - t - e - r", correct: "water", marks: 1 },
      { id: "c2e-r5", jumbled: "c - h - o - o - l - s", correct: "school", marks: 1 }
    ],
    matching: {
      left: ["Saturday", "Sunday", "Red", "Green", "Cat"],
      right: ["১ম দিন", "২য় দিন", "লাল", "সবুজ", "বিড়াল"],
      marks: 5
    },
    shortQuestions: [
      { id: "c2e-s1", question: "How many days are there in a week?", answer: "There are 7 days in a week.", marks: 2 },
      { id: "c2e-s2", question: "What is the colour of a crow?", answer: "A crow is black.", marks: 2 },
      { id: "c2e-s3", question: "Where do birds live?", answer: "Birds live in nests.", marks: 2 },
      { id: "c2e-s4", question: "What class do you read in?", answer: "I read in class 2.", marks: 2 },
      { id: "c2e-s5", question: "What do you do in the morning?", answer: "I brush my teeth and wash my face.", marks: 2 }
    ],
    broadQuestions: [
      { id: "c2e-b1", question: "Write 4 lines of the rhyme 'Rain, Rain, Go Away' from memory, or copy the sentences neatly:\n\"Speak the truth always. Obey your parents and teachers.\"", answer: "Rain, rain, go away,\nCome again another day.\nLittle children want to play,\nRain, rain, go away.", marks: 10 }
    ],
    mcq: [
      { id: "c2e-m1", question: "How many days are there in a week?", options: ["5", "6", "7", "8"], answer: "7", marks: 2 },
      { id: "c2e-m2", question: "What day comes after Friday?", options: ["Sunday", "Saturday", "Monday", "Thursday"], answer: "Saturday", marks: 2 },
      { id: "c2e-m3", question: "A crow is usually ____.", options: ["White", "Black", "Green", "Red"], answer: "Black", marks: 2 }
    ]
  },

  "class-2-math": {
    id: "c2-m",
    classId: "class-2",
    subject: "গণিত",
    mcq: [
      { id: "c2m-m1", question: "২৫ + ১৭ = কত?", options: ["৪২", "৪১", "৪৩", "৪০"], answer: "৪২", marks: 2 },
      { id: "c2m-m2", question: "৪ × ৫ = কত?", options: ["১৫", "২০", "২৫", "১৬"], answer: "২০", marks: 2 },
      { id: "c2m-m3", question: "১০০ পয়সায় কত টাকা?", options: ["১ টাকা", "১০ টাকা", "৫০ টাকা", "২ টাকা"], answer: "১ টাকা", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c2m-f1", sentence: "গুণ হলো বারবার ____ করার সহজ নিয়ম।", answer: "যোগ", marks: 2 },
      { id: "c2m-f2", sentence: "৪৮ - ১৯ = ____।", answer: "২৯", marks: 2 },
      { id: "c2m-f3", sentence: "৫ এর ৪ গুণ হলো ____।", answer: "২০", marks: 2 }
    ],
    matching: {
      left: ["৩ × ৬", "৫ × ৭", "৪০ - ২০", "৩০ + ১৫"],
      right: ["৩৫", "১৮", "৪৫", "২০"],
      marks: 4
    },
    shortQuestions: [
      { id: "c2m-s1", question: "একটি প্যাকেটে ৮টি বিস্কুট আছে। এরূপ ৩টি প্যাকেটে মোট কতটি বিস্কুট থাকবে?", answer: "৮ × ৩ = ২৪টি বিস্কুট।", marks: 3 },
      { id: "c2m-s2", question: "ত্রিভুজের কয়টি বাহু ও কয়টি কোণ থাকে?", answer: "ত্রিভুজের ৩টি বাহু ও ৩টি কোণ থাকে।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c2m-b1", question: "রাজুর কাছে ৪৫ টাকা ছিল। তার বাবা তাকে আরও ৩৫ টাকা দিলেন। সে ২০ টাকার একটি খাতা কিনল। তার কাছে আর কত টাকা রইল?", answer: "মোট টাকা = ৪৫ + ৩৫ = ৮০ টাকা। খাতা কেনার পর অবশিষ্ট রইল = ৮০ - ২০ = ৬০ টাকা।", marks: 5 }
    ]
  },

  // ==========================================
  // 🎒 CLASS 3 (৩য় শ্রেণি)
  // ==========================================
  "class-3-bangla": {
    id: "c3-b",
    classId: "class-3",
    subject: "বাংলা",
    mcq: [
      { id: "c3b-m1", question: "‘রাজা ও তাঁর তিন কন্যা’ গল্পে ছোট কন্যার নাম কী?", options: ["শিমুল", "বকুল", "পারুল", "চম্পা"], answer: "পারুল", marks: 2 },
      { id: "c3b-m2", question: "‘বিপদ’ শব্দের বিপরীত শব্দ কোনটি?", options: ["সম্পদ", "আপদ", "মুসিবত", "আনন্দ"], answer: "সম্পদ", marks: 2 },
      { id: "c3b-m3", question: "কুঁজো বুড়ির কয়টি কুকুর ছিল?", options: ["১টি", "২টি", "৩টি", "৪টি"], answer: "৩টি", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c3b-f1", sentence: "পারুল রাজাকে বলেছিল সে তাকে ____ মতো ভালোবাসে।", answer: "নুনের", marks: 2 },
      { id: "c3b-f2", sentence: "মানুষ অভ্যাসের ____।", answer: "দাস", marks: 2 },
      { id: "c3b-f3", sentence: "প্রতিদিন সকালে ও রাতে দাঁত ____ করতে হয়।", answer: "পরিষ্কার / ব্রাশ", marks: 2 }
    ],
    matching: {
      left: ["অমূল্য", "অরণ্য", "সখ্য", "হর্ষ"],
      right: ["বন", "যার মূল্য নির্ধারণ করা যায় না", "আনন্দ", "বন্ধুত্ব"],
      marks: 4
    },
    shortQuestions: [
      { id: "c3b-s1", question: "রাজা কেন ছোট কন্যা পারুলকে বনবাসে পাঠিয়েছিলেন?", answer: "পারুল রাজাকে নুনের মতো ভালোবাসে বলায় রাজা রেগে গিয়ে তাকে বনবাসে পাঠান।", marks: 3 },
      { id: "c3b-s2", question: "কুঁজো বুড়ি কীভাবে বাঘ ও শিয়ালের হাত থেকে রক্ষা পেয়েছিল?", answer: "লাউয়ের খোলসের ভেতরে ঢুকে এবং কুকুরদের সাহায্যে সে রক্ষা পেয়েছিল।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c3b-b1", question: "পারুল কীভাবে বিনা লবণে খাবার রান্না করে রাজাকে লবণের গুরুত্ব ও তার ভালোবাসার প্রমাণ বুঝিয়েছিল?", answer: "পারুল নানা সুস্বাদু খাবার লবণ ছাড়া রান্না করেছিল। রাজা মুখে দিয়ে বুঝতে পারেন নুন ছাড়া কোনো খাবারের স্বাদ পাওয়া যায় না এবং পারুলের ভালোবাসা কত গভীর ছিল।", marks: 5 }
    ],
    yuktaborno: [
      { id: "c3b-y1", cluster: "ণ্ড", breakdown: "ণ + ড", word: "কাণ্ড", sentence: "গাছের শক্ত কাণ্ড আছে।", marks: 3 },
      { id: "c3b-y2", cluster: "ষ্ণ", breakdown: "ষ + ণ", word: "উষ্ণ", sentence: "শীতকালে আমরা উষ্ণ রোদ উপভোগ করি।", marks: 3 }
    ]
  },

  "class-3-english": {
    id: "c3-e",
    classId: "class-3",
    subject: "English",
    mcq: [
      { id: "c3e-m1", chapterId: "c3-e-u1", question: "Where does Jerin study?", options: ["Mohonpur Primary School", "Joypur Primary School", "Dhaka Ideal School", "Chittagong High School"], answer: "Mohonpur Primary School", marks: 1 },
      { id: "c3e-m2", chapterId: "c3-e-u2", question: "What is Sabiha's father's profession?", options: ["School teacher", "Doctor", "Banker", "Shopkeeper"], answer: "School teacher", marks: 1 },
      { id: "c3e-m3", chapterId: "c3-e-u5", question: "Where is Porshi's school located?", options: ["Joypur, Kushtia", "Mohonpur, Rajshahi", "Dhanmondi, Dhaka", "Bandarban"], answer: "Joypur, Kushtia", marks: 1 },
      { id: "c3e-m4", chapterId: "c3-e-u6", question: "How many times a day should we brush our teeth?", options: ["Once a week", "Once a day", "Twice a day", "Four times a day"], answer: "Twice a day", marks: 1 },
      { id: "c3e-m5", chapterId: "c3-e-u8", question: "What was the ant doing during the sunny summer days?", options: ["Dancing and singing", "Sleeping under a tree", "Storing food for winter", "Swimming in the river"], answer: "Storing food for winter", marks: 1 }
    ],
    fillInTheBlanks: [
      { id: "c3e-f1", chapterId: "c3-e-u1", sentence: "My name is Jerin. I am ____ years old.", answer: "8 / eight", marks: 1 },
      { id: "c3e-f2", chapterId: "c3-e-u2", sentence: "Sabiha's father is a school ____.", answer: "teacher", marks: 1 },
      { id: "c3e-f3", chapterId: "c3-e-u5", sentence: "Rani uses a ____ because she cannot walk.", answer: "wheelchair", marks: 1 },
      { id: "c3e-f4", chapterId: "c3-e-u6", sentence: "Always wash your hands with clean water and ____.", answer: "soap", marks: 1 },
      { id: "c3e-f5", chapterId: "c3-e-u7", sentence: "Always ____ the tap tightly after using water.", answer: "close / turn off", marks: 1 }
    ],
    trueFalse: [
      { id: "c3e-tf1", chapterId: "c3-e-u1", statement: "Jerin reads in Class 3 at Mohonpur Primary School.", isTrue: true, answer: "True", marks: 1 },
      { id: "c3e-tf2", chapterId: "c3-e-u2", statement: "Sabiha's mother is a homemaker.", isTrue: true, answer: "True", marks: 1 },
      { id: "c3e-tf3", chapterId: "c3-e-u5", statement: "Rani's classmates help her move her wheelchair and play together.", isTrue: true, answer: "True", marks: 1 },
      { id: "c3e-tf4", chapterId: "c3-e-u6", statement: "We should wash our hands with soap before eating any meal.", isTrue: true, answer: "True", marks: 1 },
      { id: "c3e-tf5", chapterId: "c3-e-u8", statement: "The grasshopper worked hard all summer to prepare for winter.", isTrue: false, answer: "False", marks: 1 }
    ],
    matching: {
      id: "c3e-mat1",
      chapterId: "c3-e-u5",
      left: ["Porshi", "Rani", "Osman", "Oyshi"],
      right: ["School in Kushtia", "Uses a wheelchair", "Enjoys village life", "Rooftop garden & mobile library"],
      marks: 5
    },
    shortQuestions: [
      { id: "c3e-s1", chapterId: "c3-e-u1", question: "Who is Jerin and which school does she go to?", answer: "Jerin is an 8-year-old student who reads in Class 3 at Mohonpur Primary School.", marks: 2 },
      { id: "c3e-s2", chapterId: "c3-e-u3", question: "Write two classroom commands given by your English teacher.", answer: "1. Stand up and open your book. 2. Raise your hand to ask a question.", marks: 2 },
      { id: "c3e-s3", chapterId: "c3-e-u5", question: "How do classmates in Joypur school help Rani?", answer: "They wheel her gently, help her reach the desk, and include her in all fun activities.", marks: 2 },
      { id: "c3e-s4", chapterId: "c3-e-u6", question: "When are the two most essential times to wash hands with soap?", answer: "The two most essential times are before eating meals and after using the toilet.", marks: 2 },
      { id: "c3e-s5", chapterId: "c3-e-u8", question: "What is the moral of the story 'The Ant and the Grasshopper'?", answer: "Timely hard work and preparing for the future brings safety, whereas laziness leads to suffering.", marks: 2 }
    ],
    broadQuestions: [
      { id: "c3e-b1", chapterId: "c3-e-u1", question: "Write 5 sentences introducing yourself (your name, age, class, school name, and favorite subject).", answer: "1. My name is Jerin. 2. I am 8 years old. 3. I read in Class 3. 4. My school name is Mohonpur Primary School. 5. My favorite subject is English.", marks: 10 },
      { id: "c3e-b2", chapterId: "c3-e-u2", question: "Write 5 sentences about Sabiha's family based on Unit 2.", answer: "1. Sabiha is an eight-year-old girl reading in Class 3. 2. There are four members in her family. 3. Her father is a respected school teacher. 4. Her mother is a loving homemaker. 5. She has a sweet little brother who is two years old.", marks: 10 },
      { id: "c3e-b3", chapterId: "c3-e-u6", question: "Describe the 6 standard steps of washing hands properly with soap and clean water.", answer: "1. Wet your hands thoroughly with clean running water. 2. Apply enough soap to lather both hands. 3. Rub palms together in circular motions. 4. Rub the back of each hand and clean between your fingers. 5. Wash your thumbs and fingertips carefully. 6. Rinse hands completely with clean water and dry with a clean towel.", marks: 10 },
      { id: "c3e-b4", chapterId: "c3-e-u8", question: "Write 5 sentences summarizing the story 'The Ant and the Grasshopper'.", answer: "1. On a sunny summer day, a grasshopper was singing merrily while an ant worked hard storing grains. 2. The grasshopper mocked the ant for working instead of playing. 3. The ant advised the grasshopper to prepare food for the upcoming winter. 4. When freezing winter arrived with heavy snow, the ant had plenty of food, but the grasshopper was starving. 5. The grasshopper learned that timely hard work and planning are essential for life.", marks: 10 }
    ]
  },

  "class-3-math": {
    id: "c3-m",
    classId: "class-3",
    subject: "গণিত",
    mcq: [
      { id: "c3m-m1", question: "৪৫ ÷ ৫ = কত?", options: ["৮", "৯", "৭", "৬"], answer: "৯", marks: 2 },
      { id: "c3m-m2", question: "১ মিটারে কত সেন্টিমিটার?", options: ["১০ সে.মি.", "৫০ সে.মি.", "১০০ সে.মি.", "১০০০ সে.মি."], answer: "১০০ সে.মি.", marks: 2 },
      { id: "c3m-m3", question: "যেকোনো সংখ্যাকে ০ (শূন্য) দিয়ে গুণ করলে গুণফল কত হয়?", options: ["একই সংখ্যা", "১", "০", "১০"], answer: "০", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c3m-f1", sentence: "ভাজ্য = ভাজক × ভাগফল + ____।", answer: "ভাগশেষ", marks: 2 },
      { id: "c3m-f2", sentence: "১ ঘণ্টায় ____ মিনিট হয়।", answer: "৬০", marks: 2 },
      { id: "c3m-f3", sentence: "৭ এর ৮ গুণ হলো ____।", answer: "৫৬", marks: 2 }
    ],
    matching: {
      left: ["৮ × ৭", "৬৩ ÷ ৯", "১০০ - ৩৫", "২৫ + ৭৫"],
      right: ["৫৬", "৭", "৬৫", "১০০"],
      marks: 4
    },
    shortQuestions: [
      { id: "c3m-s1", question: "একটি শ্রেণিকক্ষে ৮টি বেঞ্চ আছে। প্রতি বেঞ্চে ৪ জন শিক্ষার্থী বসলে মোট কতজন বসতে পারবে?", answer: "৮ × ৪ = ৩২ জন শিক্ষার্থী।", marks: 3 },
      { id: "c3m-s2", question: "ভগ্নাংশ কাকে বলে? একটি উদাহরণ দাও।", answer: "কোনো বস্তুর সমান অংশের এক বা একাধিক অংশ প্রকাশ করার সংখ্যাকে ভগ্নাংশ বলে। যেমন: ১/২।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c3m-b1", question: "রহিম বাজার থেকে প্রতিটি ২৫ টাকা দরে ৪টি খাতা এবং প্রতিটি ১০ টাকা দরে ৫টি কলম কিনল। সে দোকানদারকে ২০০ টাকার একটি নোট দিল। দোকানদার তাকে কত টাকা ফেরত দেবেন?", answer: "খাতার দাম = ৪ × ২৫ = ১০০ টাকা। কলমের দাম = ৫ × ১০ = ৫০ টাকা। মোট খরচ = ১০০ + ৫০ = ১৫০ টাকা। দোকানদার ফেরত দেবেন = ২০০ - ১৫০ = ৫০ টাকা।", marks: 5 }
    ]
  },

  "class-3-science": {
    id: "c3-s",
    classId: "class-3",
    subject: "প্রাথমিক বিজ্ঞান",
    mcq: [
      { id: "c3s-m1", question: "কোনটি মেরুদণ্ডী প্রাণী?", options: ["কেঁচো", "মাছ", "চিংড়ি", "মশা"], answer: "মাছ", marks: 2 },
      { id: "c3s-m2", question: "উদ্ভিদের কোন অংশ মাটি থেকে পানি ও খনিজ লবণ শোষণ করে?", options: ["পাতা", "ফুল", "মূল বা শিকড়", "কাণ্ড"], answer: "মূল বা শিকড়", marks: 2 },
      { id: "c3s-m3", question: "পানির কয়টি অবস্থা দেখতে পাওয়া যায়?", options: ["১টি", "২টি", "৩টি", "৪টি"], answer: "৩টি", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c3s-f1", sentence: "সূর্য সকল ____ মূল উৎস।", answer: "শক্তির", marks: 2 },
      { id: "c3s-f2", sentence: "বরফ হলো পানির ____ অবস্থা।", answer: "কঠিন", marks: 2 },
      { id: "c3s-f3", sentence: "উদ্ভিদ নিজের খাদ্য তৈরিতে ____ ত্যাগ করে।", answer: "অক্সিজেন", marks: 2 }
    ],
    matching: {
      left: ["মাছ", "পাখি", "ব্যাঙ", "গরু"],
      right: ["ডানা ও পালক আছে", "ফুলকা দিয়ে শ্বাস নেয়", "স্তন্যপায়ী প্রাণী", "উভচর প্রাণী"],
      marks: 4
    },
    shortQuestions: [
      { id: "c3s-s1", question: "মেরুদণ্ডী ও অমেরুদণ্ডী প্রাণীর মধ্যে ২টি পার্থক্য লেখো।", answer: "১. মেরুদণ্ডী প্রাণীর পিঠে শিরদাঁড়া বা মেরুদণ্ড থাকে, অমেরুদণ্ডী প্রাণীর থাকে না। ২. মেরুদণ্ডী প্রাণীর দেহ সাধারণত শক্ত কঙ্কালযুক্ত।", marks: 3 },
      { id: "c3s-s2", question: "সুষম খাদ্য কাকে বলে?", answer: "যে খাদ্যে দেহের প্রয়োজনীয় সব পুষ্টি উপাদান সঠিক পরিমাণে থাকে তাকে সুষম খাদ্য বলে।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c3s-b1", question: "উদ্ভিদের প্রধান অংশগুলোর নাম লেখো এবং মূল ও পাতার কাজ বিস্তারিত ব্যাখ্যা করো।", answer: "উদ্ভিদের প্রধান অংশ: মূল, কাণ্ড, পাতা, ফুল ও ফল। মূলের কাজ: উদ্ভিদকে মাটির সাথে শক্ত করে আঁকড়ে রাখা এবং পানি ও খনিজ লবণ শোষণ করা। পাতার কাজ: সূর্যের আলোর উপস্থিতিতে সালোকসংশ্লেষণ প্রক্রিয়ায় খাদ্য তৈরি করা।", marks: 5 }
    ]
  },

  "class-3-bgs": {
    id: "c3-bgs",
    classId: "class-3",
    subject: "বাংলাদেশ ও বিশ্বপরিচয়",
    mcq: [
      { id: "c3bgs-m1", question: "সামাজিক পরিবেশের উপাদান কোনটি?", options: ["গাছপালা", "বিদ্যালয় ও খেলার মাঠ", "নদী", "পাহাড়"], answer: "বিদ্যালয় ও খেলার মাঠ", marks: 2 },
      { id: "c3bgs-m2", question: "নিরাপদে রাস্তা পারাপারের জন্য কোনটি ব্যবহার করা উচিত?", options: ["জেব্রা ক্রসিং ও ফুটওভার ব্রিজ", "চলন্ত গাড়ির ফাঁক", "দ্রুত দৌড়ানো", "মোবাইল দেখা"], answer: "জেব্রা ক্রসিং ও ফুটওভার ব্রিজ", marks: 2 },
      { id: "c3bgs-m3", question: "আমাদের দেশে সাধারণত কয়টি ঋতু রয়েছে?", options: ["৪টি", "৫টি", "৬টি", "৭টি"], answer: "৬টি", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c3bgs-f1", sentence: "মানুষ ও তাদের তৈরি উপাদান নিয়ে গড়ে ওঠে ____ পরিবেশ।", answer: "সামাজিক", marks: 2 },
      { id: "c3bgs-f2", sentence: "ট্রাফিক বাতির লাল আলো দেখলে গাড়ি ____ করতে হয়।", answer: "থামাতে", marks: 2 },
      { id: "c3bgs-f3", sentence: "কৃষক মাঠে নানা রকমের ____ ফলান।", answer: "ফসল", marks: 2 }
    ],
    matching: {
      left: ["ডাক্তার", "শিক্ষক", "কৃষক", "চালক"],
      right: ["বিদ্যালয়ে পাঠদান করেন", "রোগীর চিকিৎসা করেন", "যানবাহন চালান", "ফসল উৎপাদন করেন"],
      marks: 4
    },
    shortQuestions: [
      { id: "c3bgs-s1", question: "পরিবেশকে প্রধানত কয়টি ভাগে ভাগ করা যায় ও কী কী?", answer: "পরিবেশকে প্রধানত দুই ভাগে ভাগ করা যায়: ১. প্রাকৃতিক পরিবেশ এবং ২. সামাজিক পরিবেশ।", marks: 3 },
      { id: "c3bgs-s2", question: "ট্রাফিক লাইটের হলুদ ও সবুজ বাতি কী নির্দেশ করে?", answer: "হলুদ বাতি প্রস্তুত হওয়ার নির্দেশ দেয় এবং সবুজ বাতি নিরাপদে চলার নির্দেশ দেয়।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c3bgs-b1", question: "বিদ্যালয়ের আঙিনা সুন্দর ও পরিচ্ছন্ন রাখতে শিক্ষার্থীদের কী কী করণীয় ৫টি বাক্যে লেখো।", answer: "১. ময়লা কাগজ ও ফলের খোসা নির্দিষ্ট ঝুড়িতে ফেলা। ২. ক্লাসরুম ও বেঞ্চ পরিষ্কার রাখা। ৩. ফুলগাছের যত্ন নেওয়া ও নতুন চারা রোপণ করা। ৪. দেয়ালে দাগ না দেওয়া। ৫. সহপাঠীদের পরিচ্ছন্নতার ব্যাপারে সচেতন করা।", marks: 5 }
    ]
  },

  // ==========================================
  // 🎒 CLASS 4 (৪র্থ শ্রেণি)
  // ==========================================
  "class-4-bangla": {
    id: "c4-b",
    classId: "class-4",
    subject: "বাংলা",
    mcq: [
      { id: "c4b-m1", chapterId: "c4-b-l1", question: "বাংলাদেশে কয়টি মাস মিলে একটি ঋতু গঠিত হয়?", options: ["একটি", "দুইটি", "তিনটি", "চারটি"], answer: "দুইটি", marks: 1 },
      { id: "c4b-m2", chapterId: "c4-b-l2", question: "‘কেমন বড়াই’ গল্পের লেখক কে?", options: ["হাবীবুর রহমান", "সুকুমার রায়", "রবীন্দ্রনাথ ঠাকুর", "কাজী নজরুল ইসলাম"], answer: "হাবীবুর রহমান", marks: 1 },
      { id: "c4b-m3", chapterId: "c4-b-l6", question: "আমাদের জাতীয় পাখি দোয়েল সাধারণত কোথায় বাসা বাঁধে?", options: ["গাছের কোটরে বা ঘরের ফাঁকে", "মাটিতে গর্ত করে", "পুকুরের পানিতে", "পাহাড়ের চূড়ায়"], answer: "গাছের কোটরে বা ঘরের ফাঁকে", marks: 1 },
      { id: "c4b-m4", chapterId: "c4-b-l10", question: "ঐতিহাসিক শালবন বিহার কোন জেলায় অবস্থিত?", options: ["কুমিল্লা", "ঢাকা", "বগুড়া", "চট্টগ্রাম"], answer: "কুমিল্লা", marks: 1 },
      { id: "c4b-m5", chapterId: "c4-b-l18", question: "মহীয়সী বেগম রোকেয়া কোন জেলায় জন্মগ্রহণ করেন?", options: ["রংপুর", "ঢাকা", "যশোর", "খুলনা"], answer: "রংপুর", marks: 1 }
    ],
    fillInTheBlanks: [
      { id: "c4b-f1", chapterId: "c4-b-l1", sentence: "পৌষ ও মাঘ এই দুই মাস নিয়ে ____ ঋতু হয়।", answer: "শীত", marks: 1 },
      { id: "c4b-f2", chapterId: "c4-b-l18", sentence: "বেগম রোকেয়া নারী শিক্ষার ____ ছিলেন।", answer: "অগ্রদূত", marks: 1 },
      { id: "c4b-f3", chapterId: "c4-b-l22", sentence: "হজরত উমর (রা.) মুসলমানদের ____ খলিফা ছিলেন।", answer: "দ্বিতীয়", marks: 1 },
      { id: "c4b-f4", chapterId: "c4-b-l12", sentence: "বাঁশবাগানের মাথার উপর ____ উঠেছে ওই।", answer: "চাঁদ", marks: 1 },
      { id: "c4b-f5", chapterId: "c4-b-l13", sentence: "হাজি মুহম্মদ মুহসিন ছিলেন একজন পরম ____ মানুষ।", answer: "দানবীর", marks: 1 }
    ],
    matching: {
      id: "c4b-mat1",
      chapterId: "c4-b-l1",
      left: ["গ্রীষ্মকাল", "বর্ষাকাল", "শরৎকাল", "বসন্তকাল"],
      right: ["আম ও লিচু পাকে", "কদম ও কেয়া ফোটে", "সাদা মেঘ ও কাশফুল", "কোকিলের কুহু কুহু ডাক"],
      marks: 4
    },
    shortQuestions: [
      { id: "c4b-s1", chapterId: "c4-b-l1", question: "বাংলাদেশে ষড়ঋতু বলতে কী বোঝায়? ঋতুগুলোর নাম লেখো।", answer: "বাংলাদেশে বছরে ছয়টি ঋতু পর্যায়ক্রমে আসে বলে বাংলাদেশকে ষড়ঋতুর দেশ বলা হয়। ঋতু ছয়টি হলো: গ্রীষ্ম, বর্ষা, শরৎ, হেমন্ত, শীত ও বসন্ত।", marks: 3 },
      { id: "c4b-s2", chapterId: "c4-b-l18", question: "বেগম রোকেয়াকে কেন নারী জাগরণের অগ্রদূত বলা হয়?", answer: "বেগম রোকেয়া প্রতিকূল সমাজে কুসংস্কার ও বাধার মুখে মেয়েদের শিক্ষার অধিকার প্রতিষ্ঠা করেন এবং বিদ্যালয় খুলে নারী মুক্তির পথ দেখিয়েছিলেন বলে তাঁকে নারী জাগরণের অগ্রদূত বলা হয়।", marks: 3 },
      { id: "c4b-s3", chapterId: "c4-b-l22", question: "হজরত উমর (রা.) রাতের বেলা ঘুরে ঘুরে প্রজাদের অবস্থা দেখতেন কেন?", answer: "প্রজাদের কোনো অভাব-অনটন, দুঃখ-কষ্ট বা ক্ষুধার জ্বালা আছে কি না তা সরাসরি নিজে জেনে প্রয়োজনীয় ব্যবস্থা নেওয়ার জন্য তিনি রাতের বেলা ঘুরে বেড়াতেন।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c4b-b1", chapterId: "c4-b-l1", question: "‘রূপময় বাংলাদেশ’ পাঠ অনুসরণে এ দেশের প্রাকৃতিক সৌন্দর্য ও ঋতুবৈচিত্র্যের বর্ণনা দাও।", answer: "বাংলাদেশ এক রূপময় ও সুন্দর দেশ। এ দেশে প্রতি দুই মাস পর পর ঋতু বদল হয়। গ্রীষ্মে তীব্র রোদের সাথে রসালো ফল পাকে, বর্ষায় খাল-বিল পানিতে ভরে কদম ফুল ফোটে। শরতের নীল আকাশে সাদা মেঘ ও নদীপাড়ে কাশফুল ফোটে। হেমন্তে সোনালি ধানে মাঠ ভরে যায়। শীতে কুয়াশা ও উত্তুরে ঠান্ডা বাতাস নামে এবং বসন্তে রঙিন ফুলের মেলা বসে ও কোকিল ডাকে। এছাড়া নদী, পাহাড়, সুন্দরবন ও বঙ্গোপসাগর এ দেশের প্রকৃতিকে অনন্য রূপ দিয়েছে।", marks: 5 },
      { id: "c4b-b2", chapterId: "c4-b-l18", question: "মহীয়সী বেগম রোকেয়ার শিক্ষালাভের প্রচেষ্টা এবং সমাজে নারী শিক্ষায় তাঁর অবদান বর্ণনা করো।", answer: "তৎকালীন সমাজে মেয়েদের পড়ালেখার কোনো সুযোগ ছিল না। বেগম রোকেয়া রাতের বেলা মোমবাতি জ্বালিয়ে বড় ভাই ইব্রাহীম সাবেরের কাছে গোপনে বাংলা ও ইংরেজি শেখেন। বিয়ের পর স্বামী সৈয়দ সাখাওয়াত হোসেনের প্রেরণায় তিনি লেখালেখি চালিয়ে যান। স্বামীর মৃত্যুর পর তাঁর রেখে যাওয়া অর্থে ভাগলপুরে ও পরবর্তীতে কলকাতায় মেয়েদের জন্য সাখাওয়াত মেমোরিয়াল গার্লস স্কুল প্রতিষ্ঠা করেন। বাড়ি বাড়ি গিয়ে ছাত্রী সংগ্রহ করে তিনি নারী শিক্ষার দ্বার উন্মোচন করেন।", marks: 5 }
    ],
    yuktaborno: [
      { id: "c4b-y1", cluster: "গ্র", breakdown: "গ + র-ফলা", word: "গ্রীষ্ম", sentence: "গ্রীষ্মকালে গাছে গাছে রসালো আম পাকে।", marks: 2 },
      { id: "c4b-y2", cluster: "ষ্ক", breakdown: "ষ + ক", word: "পরিষ্কার", sentence: "আমাদের বিদ্যালয় প্রাঙ্গণ সবসময় পরিষ্কার-পরিচ্ছন্ন রাখা উচিত।", marks: 2 },
      { id: "c4b-y3", cluster: "ন্ধ", breakdown: "ন + ধ", word: "অন্ধকার", sentence: "সূর্য ওঠার সাথে সাথে চারদিকের অন্ধকার দূর হয়ে যায়।", marks: 2 },
      { id: "c4b-y4", cluster: "প্র", breakdown: "প + র-ফলা", word: "প্রকৃতি", sentence: "বাংলার অপরূপ প্রকৃতি আমাদের মন ভরিয়ে দেয়।", marks: 2 }
    ]
  },

    "class-4-english": {
    id: "c4-e",
    classId: "class-4",
    subject: "English",
    mcq: [
      { id: "c4e-m1", chapterId: "c4-e-u1", question: "Where is Fariha from in Unit 1?", options: ["Sylhet", "Chattogram", "Khulna", "Rajshahi"], answer: "Chattogram", marks: 1 },
      { id: "c4e-m2", chapterId: "c4-e-u5", question: "What is the primary role of the Little Doctor Team in school?", options: ["Checking basic health and hygiene", "Teaching English", "Driving a school bus", "Cooking school meals"], answer: "Checking basic health and hygiene", marks: 1 },
      { id: "c4e-m3", chapterId: "c4-e-u8", question: "What was Alvi's grandfather's profession?", options: ["A retired school teacher", "A lawyer", "A banker", "A shopkeeper"], answer: "A retired school teacher", marks: 1 },
      { id: "c4e-m4", chapterId: "c4-e-u15", question: "Which human activity causes severe air pollution?", options: ["Planting green trees", "Black smoke from vehicles and factories", "Drinking pure water", "Cleaning classrooms"], answer: "Black smoke from vehicles and factories", marks: 1 },
      { id: "c4e-m5", chapterId: "c4-e-u16", question: "Where does Pasang live?", options: ["In Nepal", "In Bhutan", "In India", "In Bangladesh"], answer: "In Nepal", marks: 1 }
    ],
    fillInTheBlanks: [
      { id: "c4e-f1", chapterId: "c4-e-u1", sentence: "Fariha and Shuvo are students in Class ____.", answer: "4", marks: 1 },
      { id: "c4e-f2", chapterId: "c4-e-u5", sentence: "We must wash our hands with soap before ____ and after using the toilet.", answer: "meals", marks: 1 },
      { id: "c4e-f3", chapterId: "c4-e-u8", sentence: "Alvi lives with his ____ in a peaceful village.", answer: "family", marks: 1 },
      { id: "c4e-f4", chapterId: "c4-e-u14", sentence: "In the poem 'Tears of the Earth', cutting down trees makes the Earth ____.", answer: "sad / cry", marks: 1 },
      { id: "c4e-f5", chapterId: "c4-e-u15", sentence: "Dumping polythene bags into drains causes serious water ____.", answer: "pollution", marks: 1 }
    ],
    trueFalse: [
      { id: "c4e-tf1", chapterId: "c4-e-u1", statement: "Fariha and Shuvo introduce themselves politely to each other.", isTrue: true, answer: "True", marks: 1 },
      { id: "c4e-tf2", chapterId: "c4-e-u5", statement: "The Little Doctors check height, weight, and fingernails of their peers.", isTrue: true, answer: "True", marks: 1 },
      { id: "c4e-tf3", chapterId: "c4-e-u8", statement: "Alvi's grandfather assists him in his studies and loves gardening.", isTrue: true, answer: "True", marks: 1 },
      { id: "c4e-tf4", chapterId: "c4-e-u14", statement: "The poem 'Tears of the Earth' encourages us to plant more trees to heal the Earth.", isTrue: true, answer: "True", marks: 1 },
      { id: "c4e-tf5", chapterId: "c4-e-u16", statement: "Pasang enjoys walking to school across the mountain paths.", isTrue: true, answer: "True", marks: 1 }
    ],
    matching: {
      id: "c4e-mat1",
      chapterId: "c4-e-u5",
      left: ["Little Doctor", "Soap & Water", "Fingernails", "Healthy habits"],
      right: ["Inspects health & cleanliness", "Essential for washing hands", "Must be kept short and trimmed", "Keep us cheerful and strong"],
      marks: 4
    },
    shortQuestions: [
      { id: "c4e-s1", chapterId: "c4-e-u1", question: "How do you introduce yourself to a new classmate?", answer: "Hello! My name is [Name]. I am in Class 4. Nice to meet you!", marks: 2 },
      { id: "c4e-s2", chapterId: "c4-e-u5", question: "Mention two duties performed by the Little Doctor Team in your school.", answer: "1. Checking height, weight, and eyesight. 2. Teaching proper handwashing with soap before meals.", marks: 2 },
      { id: "c4e-s3", chapterId: "c4-e-u8", question: "Who are the family members of Alvi?", answer: "Alvi lives with his parents, younger sister, and loving grandparents.", marks: 2 },
      { id: "c4e-s4", chapterId: "c4-e-u14", question: "Why is the Earth weeping in the poem 'Tears of the Earth'?", answer: "Because humans are cutting down trees indiscriminately and polluting nature.", marks: 2 },
      { id: "c4e-s5", chapterId: "c4-e-u16", question: "What does Pasang love doing in his free time?", answer: "Pasang loves playing with his friends and enjoying the scenic beauty of the mountains.", marks: 2 }
    ],
    broadQuestions: [
      { id: "c4e-b1", chapterId: "c4-e-u5", question: "Write a short composition of 5-7 sentences about 'The Little Doctor Team in My School'.", answer: "1. In our school, we have an active Little Doctor Team. 2. Students from Class 4 and 5 are selected as members. 3. Every month, they check our height, weight, and eyesight. 4. They teach us to wash hands with soap before meals. 5. They guide us to keep our fingernails clean and short. 6. A local medical doctor trains our little doctors every year. 7. We are very proud of our helpful Little Doctor Team.", marks: 5 },
      { id: "c4e-b2", chapterId: "c4-e-u8", question: "Write 5-7 sentences about 'My Family'.", answer: "1. I live in a warm and happy family with six members. 2. My father works hard and my mother takes caring steps for everyone. 3. My grandparents tell us fascinating moral stories every evening. 4. My younger sibling and I go to school together with joy. 5. We always share our meals and spend quality leisure time together. 6. We respect and help each other during difficulties. 7. I am deeply thankful to God for blessed family life.", marks: 5 },
      { id: "c4e-b3", chapterId: "c4-e-u15", question: "Write 5-7 sentences describing how we can prevent environment pollution.", answer: "1. We must plant more green trees around our houses and schools. 2. We should never throw plastic packets or bottles into ponds and drains. 3. Dustbins should always be used to dispose of household garbage. 4. We should use bicycles or walk for short trips instead of motorized vehicles. 5. Industries should filter smoke and purify liquid waste before release. 6. Awareness campaigns should be conducted among students. 7. Keeping nature clean keeps all living beings healthy.", marks: 5 }
    ]
  },

  "class-4-math": {
    id: "c4-m",
    classId: "class-4",
    subject: "প্রাথমিক গণিত",
    mcq: [
      { id: "c4m-m1", chapterId: "c4-m-ch1", question: "৮৭,৬৫,৪৩২ সংখ্যাটিতে ৭ এর স্থানীয় মান কত?", options: ["৭ শত", "৭ হাজার", "৭ অযুত", "৭ লক্ষ"], answer: "৭ লক্ষ", marks: 1 },
      { id: "c4m-m2", chapterId: "c4-m-ch2", question: "৮৫,০০০ - ৩৫,০০০ = কত?", options: ["৪০,০০০", "৪৫,০০০", "৫০,০০০", "৫৫,০০০"], answer: "৫০,০০০", marks: 1 },
      { id: "c4m-m3", chapterId: "c4-m-ch3", question: "২৫০ × ২০ = কত?", options: ["২,৫০০", "৪,০০০", "৫,০০০", "১০,০০০"], answer: "৫,০০০", marks: 1 },
      { id: "c4m-m4", chapterId: "c4-m-ch4", question: "৮,৪০০ ÷ ১০০ = কত?", options: ["৮৪", "৮৪০", "৮", "৮৪০৪"], answer: "৮৪", marks: 1 },
      { id: "c4m-m5", chapterId: "c4-m-ch5", question: "গাণিতিক বাক্যে খালি ঘরে কোন সংখ্যা বসবে? (১২ + [ ]) × ৪ = ৮০", options: ["৬", "৮", "১০", "১২"], answer: "৮", marks: 1 },
      { id: "c4m-m6", chapterId: "c4-m-ch6", question: "১২ ও ১৮ এর গরিষ্ঠ সাধারণ গুণনীয়ক (গ.সা.গু) কত?", options: ["২", "৩", "৬", "৩৬"], answer: "৬", marks: 1 },
      { id: "c4m-m7", chapterId: "c4-m-ch7", question: "নিচের কোনটি প্রকৃত ভগ্নাংশ?", options: ["৩/৫", "৫/৩", "৭/৪", "৯/২"], answer: "৩/৫", marks: 1 },
      { id: "c4m-m8", chapterId: "c4-m-ch8", question: "০.৭ + ০.৫ = কত?", options: ["১.০", "১.১", "১.২", "০.১২"], answer: "১.২", marks: 1 },
      { id: "c4m-m9", chapterId: "c4-m-ch9", question: "১ কিলোমিটার = কত মিটার?", options: ["১০০ মিটার", "১০০০ মিটার", "১০,০০০ মিটার", "৫০ মিটার"], answer: "১০০০ মিটার", marks: 1 },
      { id: "c4m-m10", chapterId: "c4-m-ch10", question: "সমকোণের পরিমাপ কত ডিগ্রি?", options: ["৪৫°", "৬০°", "৯০°", "১৮০°"], answer: "৯০°", marks: 1 }
    ],
    fillInTheBlanks: [
      { id: "c4m-f1", chapterId: "c4-m-ch1", sentence: "১০টি দশ হাজার মিলে তৈরি হয় এক ____।", answer: "লক্ষ", marks: 1 },
      { id: "c4m-f2", chapterId: "c4-m-ch2", sentence: "যে সংখ্যা থেকে অন্য সংখ্যা বিয়োগ করা হয় তাকে ____ বলে।", answer: "বিয়োজ্য", marks: 1 },
      { id: "c4m-f3", chapterId: "c4-m-ch4", sentence: "ভাজ্য = (ভাজক × ____) + ভাগশেষ।", answer: "ভাগফল", marks: 1 },
      { id: "c4m-f4", chapterId: "c4-m-ch7", sentence: "যে ভগ্নাংশের লব হরের চেয়ে ছোট তাকে ____ ভগ্নাংশ বলে।", answer: "প্রকৃত", marks: 1 },
      { id: "c4m-f5", chapterId: "c4-m-ch10", sentence: "ত্রিভুজের তিন কোণের সমষ্টি ____ ডিগ্রি।", answer: "১৮০", marks: 1 }
    ],
    matching: {
      id: "c4m-mat1",
      chapterId: "c4-m-ch10",
      left: ["সমকোণ", "সরলকোণ", "সূক্ষ্মকোণ", "স্থূলকোণ"],
      right: ["৯০ ডিগ্রি", "১৮০ ডিগ্রি", "৯০ ডিগ্রির চেয়ে কম", "৯০ ডিগ্রির চেয়ে বেশি কিন্তু ১৮০ ডিগ্রির চেয়ে কম"],
      marks: 4
    },
    shortQuestions: [
      { id: "c4m-s1", chapterId: "c4-m-ch1", question: "সম্পর্ক প্রতীক (<, >) ব্যবহার করে তুলনা করো: ৯৫,৪২০ [ ] ৯৫,২৪০", answer: "৯৫,৪২০ > ৯৫,২৪০", marks: 3 },
      { id: "c4m-s2", chapterId: "c4-m-ch5", question: "বন্ধনী ব্যবহারের নিয়ম মেনে হিসাব করো: ২৪ ÷ (৪ + ২) × ৩", answer: "২৪ ÷ (৪ + ২) × ৩ = ২৪ ÷ ৬ × ৩ = ৪ × ৩ = ১২", marks: 3 },
      { id: "c4m-s3", chapterId: "c4-m-ch6", question: "গ.সা.গু ও ল.সা.গু-এর পূর্ণরূপ লেখো।", answer: "গ.সা.গু = গরিষ্ঠ সাধারণ গুণনীয়ক, ল.সা.গু = লঘিষ্ঠ সাধারণ গুণিতক।", marks: 3 },
      { id: "c4m-s4", chapterId: "c4-m-ch7", question: "৩/৮ এবং ৫/৮ এর মধ্যে কোনটি বড় এবং কেন?", answer: "৫/৮ বড়; কারণ হর একই হলে যে ভগ্নাংশের লব বড়, সেই ভগ্নাংশটি বড় হয়।", marks: 3 },
      { id: "c4m-s5", chapterId: "c4-m-ch9", question: "একটি আয়তাকার মেঝের দৈর্ঘ্য ৮ মিটার এবং প্রস্থ ৫ মিটার হলে এর ক্ষেত্রফল কত?", answer: "ক্ষেত্রফল = দৈর্ঘ্য × প্রস্থ = ৮ × ৫ = ৪০ বর্গমিটার।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c4m-b1", chapterId: "c4-m-ch2", question: "একটি গুদামে ৮৫,৭৫০ বস্তা চাল ছিল। প্রথম দিন ১২,৪০০ বস্তা এবং দ্বিতীয় দিন ১৮,৩৫০ বস্তা চাল বিক্রি হলো। গুদামে আর কত বস্তা চাল অবশিষ্ট রইল?", answer: "মোট বিক্রি = ১২,৪০০ + ১৮,৩৫০ = ৩০,৭৫০ বস্তা। গুদামে অবশিষ্ট রইল = ৮৫,৭৫০ - ৩০,৭৫০ = ৫৫,০০০ বস্তা চাল।", marks: 6 },
      { id: "c4m-b2", chapterId: "c4-m-ch3", question: "একটি বিদ্যালয়ের প্রতিটি শ্রেণিতে ৪৫ জন শিক্ষার্থী আছে। বিদ্যালয়ে মোট ৮টি শ্রেণি থাকলে মোট শিক্ষার্থীর সংখ্যা কত? প্রত্যেক শিক্ষার্থীকে ৬টি করে খাতা দেওয়া হলে মোট কতটি খাতা প্রয়োজন হবে?", answer: "মোট শিক্ষার্থী = ৪৫ × ৮ = ৩৬০ জন। মোট খাতা = ৩৬০ × ৬ = ২,১৬০টি খাতা প্রয়োজন।", marks: 6 },
      { id: "c4m-b3", chapterId: "c4-m-ch6", question: "একটি পরিবারে ১২টি আপেল ও ১৮টি কমলা আছে। কোনো ফল না কেটে সর্বোচ্চ কতজন শিশুর মধ্যে ফলগুলো সমানভাবে ভাগ করে দেওয়া যাবে? প্রত্যেকে কয়টি করে আপেল ও কমলা পাবে?", answer: "১২ ও ১৮ এর গ.সা.গু = ৬। সুতরাং সর্বোচ্চ ৬ জন শিশুর মধ্যে সমানভাবে ভাগ করে দেওয়া যাবে। প্রত্যেকে আপেল পাবে = ১২ ÷ ৬ = ২টি এবং কমলা পাবে = ১৮ ÷ ৬ = ৩টি।", marks: 6 },
      { id: "c4m-b4", chapterId: "c4-m-ch10", question: "চিত্রসহ সমকোণী ত্রিভুজ ও স্থূলকোণী ত্রিভুজের সংজ্ঞা ও বৈশিষ্ট্য লেখো।", answer: "১. সমকোণী ত্রিভুজ: যে ত্রিভুজের একটি কোণ সমকোণ (৯০°), তাকে সমকোণী ত্রিভুজ বলে। ২. স্থূলকোণী ত্রিভুজ: যে ত্রিভুজের একটি কোণ স্থূলকোণ (৯০° এর চেয়ে বড় কিন্তু ১৮০° এর চেয়ে ছোট), তাকে স্থূলকোণী ত্রিভুজ বলে।", marks: 6 }
    ]
  },

  "class-4-science": {
    id: "c4-s",
    classId: "class-4",
    subject: "প্রাথমিক বিজ্ঞান",
    mcq: [
      { id: "c4s-m1", chapterId: "c4-s-ch1", question: "উদ্ভিদ নিজের খাদ্য তৈরির জন্য বায়ু থেকে সরাসরি কোন গ্যাস গ্রহণ করে?", options: ["অক্সিজেন", "কার্বন ডাই-অক্সাইড", "নাইট্রোজেন", "মিথেন"], answer: "কার্বন ডাই-অক্সাইড", marks: 1 },
      { id: "c4s-m2", chapterId: "c4-s-ch2", question: "কোন ভিটামিনের অভাবে রাতকানা রোগ হয়?", options: ["ভিটামিন এ", "ভিটামিন বি", "ভিটামিন সি", "ভিটামিন ডি"], answer: "ভিটামিন এ", marks: 1 },
      { id: "c4s-m3", chapterId: "c4-s-ch3", question: "শরীরের কোনো অংশ আগুনে পুড়ে গেলে তৎক্ষণাৎ কী করা উচিত?", options: ["তাজা ঠান্ডা পানি অন্তত ১০ মিনিট ঢালা", "তুলা দিয়ে চেপে ধরা", "তেল মালিশ করা", "বরফ ঘষা"], answer: "তাজা ঠান্ডা পানি অন্তত ১০ মিনিট ঢালা", marks: 1 },
      { id: "c4s-m4", chapterId: "c4-s-ch4", question: "পদার্থের যে অবস্থায় নির্দিষ্ট আয়তন আছে কিন্তু নির্দিষ্ট আকার নেই তাকে কী বলে?", options: ["কঠিন", "তরল", "বায়বীয়", "প্লাজমা"], answer: "তরল", marks: 1 },
      { id: "c4s-m5", chapterId: "c4-s-ch5", question: "পৃথিবীতে সকল শক্তির মূল উৎস কোনটি?", options: ["সূর্য", "চাঁদ", "বিদ্যুৎ", "বায়ুপ্রবাহ"], answer: "সূর্য", marks: 1 }
    ],
    fillInTheBlanks: [
      { id: "c4s-f1", chapterId: "c4-s-ch1", sentence: "উদ্ভিদের বংশবৃদ্ধির স্বাভাবিক প্রক্রিয়াকে ____ বলে।", answer: "প্রজনন", marks: 1 },
      { id: "c4s-f2", chapterId: "c4-s-ch2", sentence: "সূর্যের আলো আমাদের ত্বকে ভিটামিন ____ তৈরিতে সহায়তা করে।", answer: "ডি", marks: 1 },
      { id: "c4s-f3", chapterId: "c4-s-ch4", sentence: "যার নির্দিষ্ট ভর আছে এবং স্থান দখল করে তাকে ____ বলে।", answer: "পদার্থ", marks: 1 },
      { id: "c4s-f4", chapterId: "c4-s-ch5", sentence: "কাজ করার সামর্থ্যকে ____ বলে।", answer: "শক্তি", marks: 1 },
      { id: "c4s-f5", chapterId: "c4-s-ch7", sentence: "সূর্যের আলো ও বায়ুপ্রবাহ হলো ____ প্রাকৃতিক সম্পদ।", answer: "নবায়নযোগ্য", marks: 1 }
    ],
    trueFalse: [
      { id: "c4s-tf1", chapterId: "c4-s-ch1", statement: "উদ্ভিদ সালোকসংশ্লেষণ প্রক্রিয়ায় নিজের খাদ্য নিজেই তৈরি করে।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4s-tf2", chapterId: "c4-s-ch2", statement: "ভিটামিন 'সি'-এর অভাবে দাঁতের মাড়ি দিয়ে রক্ত পড়ার স্কার্ভি রোগ হয়।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4s-tf3", chapterId: "c4-s-ch3", statement: "পানিতে ডোবা ব্যক্তিকে উদ্ধারের পর পেট থেকে জোর করে পানি বের করতে হয়।", isTrue: false, answer: "False (শ্বাস-প্রশ্বাস চালুর জন্য মুখে মুখ দিয়ে কৃত্রিম শ্বাস দিতে হয়)", marks: 1 },
      { id: "c4s-tf4", chapterId: "c4-s-ch5", statement: "বিদ্যুৎ শক্তি দিয়ে আমরা ফ্যান ও বাতি চালাই।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4s-tf5", chapterId: "c4-s-ch8", statement: "পৃথিবী সূর্যের চারদিকে একবার ঘুরে আসতে প্রায় ৩৬৫ দিন ৬ ঘণ্টা সময় নেয়।", isTrue: true, answer: "True", marks: 1 }
    ],
    matching: {
      id: "c4s-mat1",
      chapterId: "c4-s-ch2",
      left: ["ভিটামিন এ", "ভিটামিন সি", "ভিটামিন ডি", "লৌহ বা আয়রন"],
      right: ["রাতকানা রোগ প্রতিরোধ করে", "দাঁতের মাড়ি সুস্থ রাখে", "হাড় ও দাঁত মজবুত করে", "রক্তস্বল্পতা দূর করে"],
      marks: 4
    },
    shortQuestions: [
      { id: "c4s-s1", chapterId: "c4-s-ch1", question: "উদ্ভিদের খাদ্য তৈরির জন্য কী কী উপাদান প্রয়োজন?", answer: "১. সূর্যের আলো, ২. বাতাস থেকে কার্বন ডাই-অক্সাইড এবং ৩. মাটি থেকে পানি ও খনিজ লবণ।", marks: 3 },
      { id: "c4s-s2", chapterId: "c4-s-ch2", question: "সুষম খাদ্যের প্রধান উপাদান কয়টি ও কী কী?", answer: "প্রধান উপাদান ৬টি: শর্করা, আমিষ, স্নেহ বা চর্বি, ভিটামিন, খনিজ লবণ এবং পানি।", marks: 3 },
      { id: "c4s-s3", chapterId: "c4-s-ch3", question: "শরীরের কোনো অংশ আগুনে পুড়ে গেলে তৎক্ষণাৎ করণীয় দুটি কাজ লেখো।", answer: "১. সাথে সাথে পরিষ্কার ঠান্ডা পানি অন্তত ১০ মিনিট ঢালতে হবে। ২. ফোস্কা পড়লে তা গলানো যাবে না এবং পরিষ্কার কাপড়ে ঢেকে চিকিৎসকের কাছে নিতে হবে।", marks: 3 },
      { id: "c4s-s4", chapterId: "c4-s-ch4", question: "পদার্থের তিনটি অবস্থার নাম ও গঠন বৈশিষ্ট্য সংক্ষেপে লেখো।", answer: "কঠিন (কণাগুলো খুব ঘন সন্নিবিষ্ট), তরল (কণাগুলো কিছুটা আলগা ও প্রবাহিত হয়), এবং বায়বীয় (কণাগুলো অনেক দূরে ও মুক্ত)।", marks: 3 },
      { id: "c4s-s5", chapterId: "c4-s-ch7", question: "নবায়নযোগ্য প্রাকৃতিক সম্পদ কাকে বলে? দুটি উদাহরণ দাও।", answer: "যেসব প্রাকৃতিক সম্পদ ব্যবহার করলেও নিঃশেষ হয়ে যায় না এবং বারবার ব্যবহার করা যায়, তাদের নবায়নযোগ্য সম্পদ বলে। যেমন: সূর্যের আলো ও বায়ুপ্রবাহ।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c4s-b1", chapterId: "c4-s-ch2", question: "সুষম খাদ্য কাকে বলে? সুষম খাদ্য নিয়মিত গ্রহণের গুরুত্ব ৫টি বাক্যে লেখো।", answer: "যে খাদ্যে খাদ্যের ছয়টি উপাদানই সঠিক অনুপাতে উপস্থিত থাকে তাকে সুষম খাদ্য বলে। গুরুত্ব: ১. এটি দেহের যথাযথ বৃদ্ধি নিশ্চিত করে। ২. রোগ প্রতিরোধ ক্ষমতা বাড়িয়ে সুস্থ রাখে। ৩. কাজ করার প্রয়োজনীয় শক্তি জোগায়। ৪. মেধার বিকাশ ও মনোযোগ বৃদ্ধিতে সহায়তা করে। ৫. অপুষ্টিজনিত মারাত্মক রোগব্যাধি থেকে শরীরকে সুরক্ষা দেয়।", marks: 6 },
      { id: "c4s-b2", chapterId: "c4-s-ch5", question: "শক্তির রূপান্তর কাকে বলে? বিদ্যুৎ শক্তি কীভাবে আলো ও তাপ শক্তিতে রূপান্তরিত হয় ব্যাখ্যা করো।", answer: "শক্তি এক রূপ থেকে অন্য রূপে পরিবর্তিত হওয়াকে শক্তির রূপান্তর বলে। যেমন: যখন আমরা বৈদ্যুতিক সুইচে চাপ দিয়ে বাল্ব জ্বালাই, তখন তারের মধ্য দিয়ে প্রবাহিত বিদ্যুৎ শক্তি বাল্বের ফিলামেন্টে গিয়ে আলোক শক্তি ও তাপ শক্তিতে রূপান্তরিত হয়। এভাবে বিদ্যুৎ শক্তি থেকে আমরা আলো ও উত্তাপ পাই।", marks: 6 },
      { id: "c4s-b3", chapterId: "c4-s-ch7", question: "প্রাকৃতিক সম্পদ সংরক্ষণের প্রয়োজনীয়তা এবং সম্পদ সংরক্ষণে আমাদের তিনটি করণীয় লেখো।", answer: "প্রাকৃতিক সম্পদের সঠিক সংরক্ষণ আমাদের ভবিষ্যৎ বংশধরদের বেঁচে থাকার জন্য অপরিহার্য। করণীয়: ১. বিনা প্রয়োজনে বৈদ্যুতিক বাতি ও ফ্যান বন্ধ রাখা। ২. রান্নার পর গ্যাসের চুলা এবং ব্যবহারের পর পানির কল সাথে সাথে বন্ধ করা। ৩. কাগজের অপচয় রোধ করা এবং বৃক্ষরোপণ বাড়ানো।", marks: 6 }
    ]
  },

  "class-4-bgs": {
    id: "c4-bgs",
    classId: "class-4",
    subject: "বাংলাদেশ ও বিশ্বপরিচয়",
    mcq: [
      { id: "c4bgs-m1", chapterId: "c4-bgs-ch1", question: "আমাদের প্রাকৃতিক পরিবেশের প্রধান উপাদান কোনটি?", options: ["মাটি, পানি ও বাতাস", "ঘরবাড়ি", "রাস্তাঘাট", "সেতু"], answer: "মাটি, পানি ও বাতাস", marks: 1 },
      { id: "c4bgs-m2", chapterId: "c4-bgs-ch2", question: "ধর্ম যার যার, উৎসব সবার—এটি সমাজে কী বৃদ্ধি করে?", options: ["সাম্প্রদায়িক সম্প্রীতি", "বিভেদ", "অসহিষ্ণুতা", "হিংসা"], answer: "সাম্প্রদায়িক সম্প্রীতি", marks: 1 },
      { id: "c4bgs-m3", chapterId: "c4-bgs-ch4", question: "গারো জনগোষ্ঠীর প্রধান ধর্মীয় ও সামাজিক উৎসবের নাম কী?", options: ["ওয়ানগালা", "বিঝু", "সাংগ্রাই", "বৈসাবি"], answer: "ওয়ানগালা", marks: 1 },
      { id: "c4bgs-m4", chapterId: "c4-bgs-ch5", question: "১৯৭১ সালের মহান মুক্তিযুদ্ধে সর্বাধিনায়ক কে ছিলেন?", options: ["বঙ্গবন্ধু শেখ মুজিবুর রহমান", "জেনারেল এম এ জি ওসমানী", "তাজউদ্দীন আহমদ", "সৈয়দ নজরুল ইসলাম"], answer: "বঙ্গবন্ধু শেখ মুজিবুর রহমান", marks: 1 },
      { id: "c4bgs-m5", chapterId: "c4-bgs-ch8", question: "রাস্তা পারাপারের সময় আমাদের সবসময় কী ব্যবহার করা উচিত?", options: ["জেব্রা ক্রসিং ও ফুটওভার ব্রিজ", "রাস্তার মাঝখান দিয়ে দৌড় দেওয়া", "গাড়ির সামনে দিয়ে যাওয়া", "রেললাইন ধরে হাঁটা"], answer: "জেব্রা ক্রসিং ও ফুটওভার ব্রিজ", marks: 1 }
    ],
    fillInTheBlanks: [
      { id: "c4bgs-f1", chapterId: "c4-bgs-ch3", sentence: "ছেলে ও মেয়ে উভয়েই পরিবারের সমান গুরুত্বপূর্ণ ____।", answer: "সদস্য", marks: 1 },
      { id: "c4bgs-f2", chapterId: "c4-bgs-ch5", sentence: "১৯৭১ সালের ____ মার্চ মুক্তিযুদ্ধ শুরু হয়।", answer: "২৬", marks: 1 },
      { id: "c4bgs-f3", chapterId: "c4-bgs-ch8", sentence: "আইন মান্য করা প্রত্যেক নাগরিকের অন্যতম প্রধান ____।", answer: "দায়িত্ব বা কর্তব্য", marks: 1 },
      { id: "c4bgs-f4", chapterId: "c4-bgs-ch10", sentence: "বাংলাদেশের রাজধানী ঢাকা ____ নদীর তীরে অবস্থিত।", answer: "বুড়িগঙ্গা", marks: 1 },
      { id: "c4bgs-f5", chapterId: "c4-bgs-ch14", sentence: "বন্যা ও ঘূর্ণিঝড় হলো আমাদের দেশের প্রধান দুটি ____ দুর্যোগ।", answer: "প্রাকৃতিক", marks: 1 }
    ],
    trueFalse: [
      { id: "c4bgs-tf1", chapterId: "c4-bgs-ch2", statement: "বাংলাদেশে সকল ধর্মের মানুষ পারস্পরিক সম্প্রীতি ও শ্রদ্ধাবোধ নিয়ে বসবাস করে।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4bgs-tf2", chapterId: "c4-bgs-ch3", statement: "পরিবারে ছেলে ও মেয়েকে সমান সুযোগ এবং শিক্ষা দেওয়া উচিত।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4bgs-tf3", chapterId: "c4-bgs-ch5", statement: "১৯৭১ সালের ১৬ ডিসেম্বর বাংলাদেশ চূড়ান্ত বিজয় অর্জন করে।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4bgs-tf4", chapterId: "c4-bgs-ch8", statement: "বিদ্যালয়ের সম্পদ নষ্ট করা একজন সচেতন শিক্ষার্থীর বৈশিষ্ট্য।", isTrue: false, answer: "False (বিদ্যালয়ের সম্পদ রক্ষা করা শিক্ষার্থীর দায়িত্ব)", marks: 1 },
      { id: "c4bgs-tf5", chapterId: "c4-bgs-ch14", statement: "ঘূর্ণিঝড়ের সংকেত পেলে সাথে সাথে আশ্রয়কেন্দ্রে যাওয়া উচিত।", isTrue: true, answer: "True", marks: 1 }
    ],
    matching: {
      id: "c4bgs-mat1",
      chapterId: "c4-bgs-ch5",
      left: ["২৬ মার্চ", "১৬ ডিসেম্বর", "২১ ফেব্রুয়ারি", "১৪ ডিসেম্বর"],
      right: ["মহান স্বাধীনতা দিবস", "মহান বিজয় দিবস", "আন্তর্জাতিক মাতৃভাষা দিবস", "শহিদ বুদ্ধিজীবী দিবস"],
      marks: 4
    },
    shortQuestions: [
      { id: "c4bgs-s1", chapterId: "c4-bgs-ch1", question: "সামাজিক পরিবেশের তিনটি মানবসৃষ্ট উপাদানের নাম লেখো।", answer: "১. বিদ্যালয়, ২. ঘরবাড়ি এবং ৩. রাস্তাঘাট ও সেতু।", marks: 3 },
      { id: "c4bgs-s2", chapterId: "c4-bgs-ch4", question: "বাংলাদেশের দুটি ক্ষুদ্র নৃগোষ্ঠীর নাম ও তাদের প্রধান উৎসবের নাম লেখো।", answer: "১. গারো (উৎসব: ওয়ানগালা) এবং ২. চাকমা (উৎসব: বিঝু)।", marks: 3 },
      { id: "c4bgs-s3", chapterId: "c4-bgs-ch5", question: "মুক্তিযুদ্ধে কতজন বীর শ্রেষ্ঠ খেতাব পেয়েছিলেন এবং তাঁদের দু'জনের নাম লেখো।", answer: "মুক্তিযুদ্ধে মোট ৭ জন বীর শ্রেষ্ঠ খেতাব পান। দু'জন হলেন: বীরশ্রেষ্ঠ ক্যাপ্টেন মহিউদ্দীন জাহাঙ্গীর এবং বীরশ্রেষ্ঠ সিপাহি মোস্তফা কামাল।", marks: 3 },
      { id: "c4bgs-s4", chapterId: "c4-bgs-ch8", question: "নাগরিক হিসেবে রাষ্ট্রের প্রতি আমাদের প্রধান দুটি মৌলিক দায়িত্ব লেখো।", answer: "১. রাষ্ট্রের প্রচলিত আইন মেনে চলা এবং ২. নিয়মিত কর বা খাজনা প্রদান করা।", marks: 3 },
      { id: "c4bgs-s5", chapterId: "c4-bgs-ch14", question: "বন্যা পরিস্থিতির সময় বিশুদ্ধ পানির অভাবে আমরা কী করতে পারি?", answer: "পানি অন্তত ২০ মিনিট ফুটিয়ে অথবা ফিটকিরি ও পানি বিশুদ্ধকরণ ট্যাবলেট ব্যবহার করে পান করতে হবে।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c4bgs-b1", chapterId: "c4-bgs-ch5", question: "১৯৭১ সালের মহান মুক্তিযুদ্ধের পটভূমি ও ঐতিহাসিক তাৎপর্য বর্ণনা করো।", answer: "১৯৪৭ সালে পাকিস্তান রাষ্ট্র সৃষ্টির পর থেকেই পশ্চিম পাকিস্তানি শাসকগোষ্ঠী পূর্ব পাকিস্তানের ওপর চরম শোষণ ও নির্যাতন চালায়। ১৯৫২-এর ভাষা আন্দোলন, ১৯৬৬-এর ছয় দফা ও ১৯৬৯-এর গণঅভ্যুত্থানের পর ১৯৭০-এর নির্বাচনে বাঙালি জাতি বিপুল ভোটে জয়লাভ করে। কিন্তু পাকিস্তানিরা ক্ষমতা হস্তান্তর না করে ১৯৭১ সালের ২৫ মার্চ কালরাতে নিরস্ত্র বাঙালিদের ওপর গণহত্যা চালায়। ২৬ মার্চ জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান স্বাধীনতার ঘোষণা দেন। দীর্ঘ নয় মাসের রক্তক্ষয়ী যুদ্ধের পর ৩০ লাখ শহীদের রক্তের বিনিময়ে ১৬ ডিসেম্বর আমরা চূড়ান্ত বিজয় অর্জন করি।", marks: 6 },
      { id: "c4bgs-b2", chapterId: "c4-bgs-ch8", question: "পরিবেশ দূষণ রোধে এবং বিদ্যালয় ও সমাজকে পরিচ্ছন্ন রাখতে আমরা কী কী ভূমিকা পালন করতে পারি ৫টি বাক্যে লেখো।", answer: "১. নির্দিষ্ট ময়লা ফেলার পাত্রে সবসময় আবর্জনা ফেলব। ২. পলিথিন ও প্লাস্টিকের ব্যবহার যথাসম্ভব পরিহার করব। ৩. বিদ্যালয়ের আঙিনায় বেশি করে ফলদ ও ওষধি গাছ লাগাব। ৪. শ্রেণিকক্ষের দেয়াল, বেঞ্চ ও ব্ল্যাকবোর্ড সবসময় পরিষ্কার রাখব। ৫. সহপাঠী ও প্রতিবেশীদের পরিবেশ সুরক্ষার গুরুত্ব সম্পর্কে সচেতন করব।", marks: 6 },
      { id: "c4bgs-b3", chapterId: "c4-bgs-ch14", question: "প্রাকৃতিক দুর্যোগ কী? ঘূর্ণিঝড় ও জলোচ্ছ্বাসের পূর্বে এবং পরে আমাদের করণীয় প্রস্তুতি আলোচনা করো।", answer: "প্রকৃতির স্বাভাবিক নিয়মের ব্যাঘাত ঘটে যখন মানুষের জানমালের ব্যাপক ক্ষতি হয় তাকে প্রাকৃতিক দুর্যোগ বলে। করণীয়: ১. রেডিও ও টেলিভিশনে নিয়মিত আবহাওয়া বার্তা শোনা। ২. শুকনা খাবার, দিয়াশলাই ও বিশুদ্ধ পানি সংরক্ষণ করা। ৩. জরুরি দলিলপত্র পলিথিনে মুড়ে সাথে নিয়ে নিকটস্থ আশ্রয়কেন্দ্রে যাওয়া। ৪. দুর্যোগের পর দ্রুত উপদ্রুতদের উদ্ধার ও চিকিৎসায় এগিয়ে আসা। ৫. পচা-বাসি খাবার না খেয়ে বিশুদ্ধ পানি ও স্যালাইন ব্যবহার করা।", marks: 6 }
    ]
  },

  "class-4-islamic": {
    id: "c4-isl",
    classId: "class-4",
    subject: "ইসলাম ও নৈতিক শিক্ষা",
    mcq: [
      { id: "c4isl-m1", chapterId: "c4-isl-ch1", question: "আল্লাহ তাআলার সুন্দরতম নামসমূহকে এককথায় কী বলা হয়?", options: ["আসমাউল হুসনা", "কালেমা", "আহকাম", "আরকান"], answer: "আসমাউল হুসনা", marks: 1 },
      { id: "c4isl-m2", chapterId: "c4-isl-ch2", question: "দৈনিক পাঁচ ওয়াক্ত সালাতে মোট কয়টি ফরজ রাকাত রয়েছে?", options: ["১২টি", "১৪টি", "১৭টি", "২০টি"], answer: "১৭টি", marks: 1 },
      { id: "c4isl-m3", chapterId: "c4-isl-ch3", question: "পিতা-মাতার অবাধ্য হওয়া ইসলামের দৃষ্টিতে কেমন কাজ?", options: ["মহা পাপ বা কবিরা গুনাহ", "ছোট ভুল", "উত্তম কাজ", "সাধারণ বিষয়"], answer: "মহা পাপ বা কবিরা গুনাহ", marks: 1 },
      { id: "c4isl-m4", chapterId: "c4-isl-ch4", question: "কুরআন মজিদ শুদ্ধভাবে তিলাওয়াত করার নিয়মকে কী বলে?", options: ["তাজবিদ", "তারতিল", "তাফসির", "হাদিস"], answer: "তাজবিদ", marks: 1 },
      { id: "c4isl-m5", chapterId: "c4-isl-ch5", question: "সর্বশেষ ও সর্বশ্রেষ্ঠ নবি ও রাসুল কে?", options: ["হজরত মুহাম্মদ (সা.)", "হজরত ইব্রাহিম (আ.)", "হজরত মুসা (আ.)", "হজরত ঈসা (আ.)"], answer: "হজরত মুহাম্মদ (সা.)", marks: 1 }
    ],
    fillInTheBlanks: [
      { id: "c4isl-f1", chapterId: "c4-isl-ch1", sentence: "আল্লাহু খালেকুন অর্থ আল্লাহ আমাদের ____।", answer: "স্রষ্টা", marks: 1 },
      { id: "c4isl-f2", chapterId: "c4-isl-ch2", sentence: "সালাত হলো ইসলামের ____ স্তম্ভ।", answer: "দ্বিতীয়", marks: 1 },
      { id: "c4isl-f3", chapterId: "c4-isl-ch3", sentence: "পরোপকার একটি মহৎ মানবিক ও ইসলামিক ____।", answer: "গুণ", marks: 1 },
      { id: "c4isl-f4", chapterId: "c4-isl-ch4", sentence: "কুরআন মজিদ আল্লাহর ____ বাণী।", answer: "পবিত্র", marks: 1 },
      { id: "c4isl-f5", chapterId: "c4-isl-ch5", sentence: "আমাদের প্রিয় নবি হজরত মুহাম্মদ (সা.) ____ শহরে জন্মগ্রহণ করেন।", answer: "মক্কা", marks: 1 }
    ],
    trueFalse: [
      { id: "c4isl-tf1", chapterId: "c4-isl-ch1", statement: "আল্লাহ এক ও অদ্বিতীয়, তাঁর কোনো শরিক নেই।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4isl-tf2", chapterId: "c4-isl-ch2", statement: "অজু ছাড়া সালাত আদায় করা যায় না।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4isl-tf3", chapterId: "c4-isl-ch3", statement: "সদা সত্য কথা বলা চরিত্রবান মানুষের শ্রেষ্ঠ বৈশিষ্ট্য।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4isl-tf4", chapterId: "c4-isl-ch4", statement: "কুরআন মজিদ দ্রুত না বুঝে অশুদ্ধভাবে পড়া বেশি সওয়াবের কাজ।", isTrue: false, answer: "False (কুরআন মজিদ তাজবিদ সহকারে সহিহ-শুদ্ধভাবে তিলাওয়াত করতে হয়)", marks: 1 },
      { id: "c4isl-tf5", chapterId: "c4-isl-ch5", statement: "হিলফুল ফুজুল অসহায় মানুষদের সাহায্যের জন্য গঠিত হয়েছিল।", isTrue: true, answer: "True", marks: 1 }
    ],
    matching: {
      id: "c4isl-mat1",
      chapterId: "c4-isl-ch1",
      left: ["আল্লাহু গাফুরুন", "আল্লাহু সামিউন", "আল্লাহু বাসিরুন", "আল্লাহু কাদিরুন"],
      right: ["আল্লাহ পরম ক্ষমাশীল", "আল্লাহ সর্বশ্রোতা", "আল্লাহ সর্বদ্রষ্টা", "আল্লাহ সর্বশক্তিমান"],
      marks: 4
    },
    shortQuestions: [
      { id: "c4isl-s1", chapterId: "c4-isl-ch1", question: "ইমান কাকে বলে? ইমানের মূল কথা কী?", answer: "আল্লাহ, তাঁর ফেরেশতাগণ, কিতাবসমূহ, রাসুলগণ, পরকাল ও তকদিরের ওপর অন্তরে দৃঢ় বিশ্বাস স্থাপন করাকে ইমান বলে।", marks: 3 },
      { id: "c4isl-s2", chapterId: "c4-isl-ch2", question: "অজুর ফরজ কয়টি ও কী কী?", answer: "অজুর ফরজ ৪টি: ১. সম্পূর্ণ মুখমণ্ডল ধোয়া, ২. দুই হাত কনুইসহ ধোয়া, ৩. মাথার এক-চতুর্থাংশ মাসেহ করা এবং ৪. দুই পা টাখনুসহ ধোয়া।", marks: 3 },
      { id: "c4isl-s3", chapterId: "c4-isl-ch3", question: "প্রতিবেশীর হক বা অধিকার সম্পর্কে নবি করিম (সা.) কী বলেছেন?", answer: "নবি করিম (সা.) বলেছেন, যে ব্যক্তি নিজে পেট পুরে খায় অথচ তার প্রতিবেশী ক্ষুধার্ত থাকে, সে প্রকৃত মুমিন নয়।", marks: 3 },
      { id: "c4isl-s4", chapterId: "c4-isl-ch4", question: "মাখরাজ কাকে বলে? আরবি হরফের মাখরাজ কয়টি?", answer: "আরবি হরফ উচ্চারণের স্থানকে মাখরাজ বলে। আরবি হরফের মাখরাজ ১৭টি।", marks: 3 },
      { id: "c4isl-s5", chapterId: "c4-isl-ch5", question: "মক্কার কাফেররা রাসুলুল্লাহ (সা.)-কে কেন 'আল-আমিন' বলত?", answer: "তাঁর অনুপম সত্যবাদিতা, সততা, আমানতদারি ও বিশ্বস্ততার কারণে সবাই তাঁকে 'আল-আমিন' বা পরম বিশ্বাসী উপাধি দিয়েছিল।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c4isl-b1", chapterId: "c4-isl-ch2", question: "সালাতের গুরুত্ব ও নিয়মাবলি বর্ণনা করো। জামায়াতে সালাত আদায়ের ফযিলত কী?", answer: "সালাত ইসলামের অন্যতম প্রধান স্তম্ভ। দৈনিক পাঁচ ওয়াক্ত সালাত আদায় করা প্রত্যেক প্রাপ্তবয়স্ক মুসলমানের ওপর ফরজ। সালাত মানুষকে অন্যায় ও অশ্লীল কাজ থেকে বিরত রাখে এবং অন্তরে আল্লাহর ভয় সৃষ্টি করে। জামায়াতে সালাত আদায়ের ফযিলত অপরিসীম; একা একা পড়ার চেয়ে জামায়াতে সালাত আদায় করলে ২৭ গুণ বেশি সওয়াব পাওয়া যায়। এটি মুসলমানদের মধ্যে পারস্পরিক ভ্রাতৃত্ব ও সাম্য গড়ে তোলে।", marks: 6 },
      { id: "c4isl-b2", chapterId: "c4-isl-ch3", question: "পিতা-মাতার সেবার গুরুত্ব এবং সত্যবাদিতা সম্পর্কে ইসলামের অনুশাসন আলোচনা করো।", answer: "পিতা-মাতার মর্যাদা ইসলামে অত্যন্ত উচ্চে। কোরআনে কারিমে আল্লাহর ইবাদতের পরেই পিতা-মাতার সাথে সদ্ব্যবহারের নির্দেশ দেওয়া হয়েছে। মহানবি (সা.) বলেছেন, মায়ের পায়ের নিচে সন্তানের জান্নাত। পিতা-মাতার সন্তুষ্টিতে আল্লাহ সন্তুষ্ট হন। অপরদিকে সত্যবাদিতা মানুষকে মুক্তির পথে নিয়ে যায় আর মিথ্যা মানুষকে ধ্বংস করে। একজন প্রকৃত মুসলমান সর্বাবস্থায় সত্য কথা বলে এবং মিথ্যা পরিহার করে।", marks: 6 },
      { id: "c4isl-b3", chapterId: "c4-isl-ch5", question: "মহানবি হজরত মুহাম্মদ (সা.)-এর শৈশব-কৈশোরের চরিত্র এবং সমাজসেবামূলক কর্মকাণ্ডের বর্ণনা দাও।", answer: "মহানবি (সা.) শৈশব থেকেই ছিলেন অনন্য চরিত্রের অধিকারী। তিনি কখনো মিথ্যা বলেননি, কাউকে কষ্ট দেননি এবং মূর্তিপূজা করেননি। কৈশোরে ফুজ্জারের রক্তক্ষয়ী যুদ্ধ দেখে ব্যথিত হয়ে তিনি শান্তিকামী যুবকদের নিয়ে 'হিলফুল ফুজুল' বা শান্তিসংঘ গঠন করেন। এই সংঘের মাধ্যমে তিনি মজলুম ও অসহায় মানুষের অধিকার রক্ষা করতেন এবং আরবে শান্তি ফিরিয়ে আনেন।", marks: 6 }
    ]
  },

  "class-4-hindu": {
    id: "c4-hin",
    classId: "class-4",
    subject: "হিন্দুধর্ম ও নৈতিক শিক্ষা",
    mcq: [
      { id: "c4hin-m1", chapterId: "c4-hin-ch1", question: "ঈশ্বর যখন জীবের মধ্যে আত্মারূপে অবস্থান করেন তখন তাঁকে কী বলে?", options: ["জীবাত্মা", "পরমাত্মা", "ভগবান", "ব্রহ্ম"], answer: "জীবাত্মা", marks: 1 },
      { id: "c4hin-m2", chapterId: "c4-hin-ch2", question: "জ্ঞান ও বিদ্যার দেবী কাকে বলা হয়?", options: ["দেবী সরস্বতী", "দেবী লক্ষ্মী", "দেবী দুর্গা", "দেবী কালী"], answer: "দেবী সরস্বতী", marks: 1 },
      { id: "c4hin-m3", chapterId: "c4-hin-ch3", question: "বাঙালি সনাতন ধর্মাবলম্বীদের প্রধান ধর্মীয় উৎসব কোনটি?", options: ["শারদীয় দুর্গাপূজা", "জন্মাষ্টমী", "দোলযাত্রা", "শিবরাত্রি"], answer: "শারদীয় দুর্গাপূজা", marks: 1 },
      { id: "c4hin-m4", chapterId: "c4-hin-ch4", question: "অহিংসা পরম ধর্ম—এই বাণীর মূল অর্থ কী?", options: ["কোনো জীবকে কষ্ট বা হিংসা না করা", "সবাইকে সমান না ভাবা", "শুধু নিজের চিন্তা করা", "প্রতিশোধ নেওয়া"], answer: "কোনো জীবকে কষ্ট বা হিংসা না করা", marks: 1 },
      { id: "c4hin-m5", chapterId: "c4-hin-ch5", question: "শ্রীরামচন্দ্রের পরম ভক্ত ও সেবক কে ছিলেন?", options: ["ভক্ত হনুমান", "বিভীষণ", "সুগ্রীব", "ভরত"], answer: "ভক্ত হনুমান", marks: 1 }
    ],
    fillInTheBlanks: [
      { id: "c4hin-f1", chapterId: "c4-hin-ch1", sentence: "যিনি সকল সৃষ্টির আদি ও পালনকর্তা তিনি ____।", answer: "ঈশ্বর", marks: 1 },
      { id: "c4hin-f2", chapterId: "c4-hin-ch2", sentence: "ধন-সম্পদ ও সৌভাগ্যের দেবী হলেন দেবী ____।", answer: "লক্ষ্মী", marks: 1 },
      { id: "c4hin-f3", chapterId: "c4-hin-ch3", sentence: "দেব-দেবীর উদ্দেশ্যে ভক্তিভরে নিবেদন করাকে ____ বলে।", answer: "পূজা", marks: 1 },
      { id: "c4hin-f4", chapterId: "c4-hin-ch4", sentence: "সত্য ও ন্যায়পথে চলা মানুষের জীবনের প্রধান ____।", answer: "ধর্ম", marks: 1 },
      { id: "c4hin-f5", chapterId: "c4-hin-ch5", sentence: "স্বামী বিবেকানন্দের পরম শ্রদ্ধেয় গুরু ছিলেন শ্রী ____।", answer: "রামকৃষ্ণ পরমহংস", marks: 1 }
    ],
    trueFalse: [
      { id: "c4hin-tf1", chapterId: "c4-hin-ch1", statement: "ঈশ্বর এক এবং তিনি অনন্ত রূপ ও শক্তির অধিকারী।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4hin-tf2", chapterId: "c4-hin-ch2", statement: "সরস্বতী পূজার দিন শিক্ষার্থীরা বই-খাতা দেবীর চরণে দিয়ে অঞ্জলি দেয়।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4hin-tf3", chapterId: "c4-hin-ch3", statement: "পূজা কেবল উৎসব নয়, এটি ঈশ্বরের প্রতি গভীর শ্রদ্ধা নিবেদনের মাধ্যম।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4hin-tf4", chapterId: "c4-hin-ch4", statement: "জীবে দয়া করলে ঈশ্বর অসন্তুষ্ট হন।", isTrue: false, answer: "False (জীবে প্রেম বা দয়া করাই প্রকৃত ঈশ্বর সেবা)", marks: 1 },
      { id: "c4hin-tf5", chapterId: "c4-hin-ch5", statement: "ভক্ত প্রহ্লাদ চরম বিপদের মুখেও হরিনাম ও সত্য ধর্ম ত্যাগ করেননি।", isTrue: true, answer: "True", marks: 1 }
    ],
    matching: {
      id: "c4hin-mat1",
      chapterId: "c4-hin-ch2",
      left: ["দেবী দুর্গা", "দেবী সরস্বতী", "দেবী লক্ষ্মী", "দেবতা গণেশ"],
      right: ["দশভুজা মহাশক্তির দেবী", "বিদ্যার ও জ্ঞানের দেবী", "সম্পদ ও সৌভাগ্যের দেবী", "সিদ্ধিদাতা ও বিঘ্ননাশক দেবতা"],
      marks: 4
    },
    shortQuestions: [
      { id: "c4hin-s1", chapterId: "c4-hin-ch1", question: "আমরা কীভাবে চারপাশের প্রকৃতি ও জীবে ঈশ্বরের অস্তিত্ব অনুভব করি?", answer: "সূর্যের আলো, নদীর জল, গাছপালার ফুল-ফল ও প্রতিটি জীবের প্রাণের স্পন্দনে আমরা ঈশ্বরের অনন্ত করুণা অনুভব করি।", marks: 3 },
      { id: "c4hin-s2", chapterId: "c4-hin-ch2", question: "দেবী সরস্বতীর রূপের বর্ণনা সংক্ষেপে দাও।", answer: "দেবী সরস্বতী শ্বেতবস্ত্র পরিহিতা, তাঁর এক হাতে বীণা এবং অন্য হাতে পুস্তক ও পদ্মফুল থাকে। তাঁর বাহন শ্বেতহংস।", marks: 3 },
      { id: "c4hin-s3", chapterId: "c4-hin-ch3", question: "পূজা ও প্রার্থনার মধ্যে মূল পার্থক্য কী?", answer: "উপচার নিবেদন করে দেব-দেবীর আরাধনাকে পূজা বলে, আর অন্তরের ভক্তিভরে ঈশ্বরের কাছে কল্যাণ চাওয়াকে প্রার্থনা বলে।", marks: 3 },
      { id: "c4hin-s4", chapterId: "c4-hin-ch4", question: "স্বামী বিবেকানন্দের জীবে সেবা সম্পর্কিত অমর বাণীটি লেখো।", answer: "'বহুরূপে সম্মুখে তোমার ছাড়ি কোথা খুঁজিছ ঈশ্বর? জীবে প্রেম করে যেই জন, সেই জন সেবিছে ঈশ্বর।'", marks: 3 },
      { id: "c4hin-s5", chapterId: "c4-hin-ch5", question: "শ্রীচৈতন্য মহাপ্রভুর প্রধান শিক্ষা কী ছিল?", answer: "শ্রীচৈতন্য মহাপ্রভু জাতি-ধর্ম-বর্ণ নির্বিশেষে সকল মানুষকে ভালোবাসা ও হরিনাম সংকীর্তনের মাধ্যমে মুক্তির পথ দেখিয়েছিলেন।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c4hin-b1", chapterId: "c4-hin-ch1", question: "শ্রীমদ্ভগবদ্গীতা অনুসারে জীবের সেবা এবং ঈশ্বর উপাসনার তাৎপর্য আলোচনা করো।", answer: "ভগবদ্গীতায় বলা হয়েছে, ঈশ্বর সকল প্রাণীর হৃদয়ে অবস্থান করেন। তাই কোনো প্রাণীকে কষ্ট না দিয়ে তার সেবা করলেই ঈশ্বরের প্রকৃত আরাধনা করা হয়। নিঃস্বার্থ কর্মের মাধ্যমে মানবের সেবা করাই শ্রেষ্ঠ পূজা। এর ফলে মনের অহংকার দূর হয় এবং আত্মশুদ্ধি লাভ ঘটে।", marks: 6 },
      { id: "c4hin-b2", chapterId: "c4-hin-ch4", question: "দৈনন্দিন জীবনে অহিংসা, সত্যবাদিতা ও পরোপকারের গুরুত্ব ৫টি বাক্যে লেখো।", answer: "১. সত্যবাদিতা মানুষকে নির্ভীক ও সমাজে সম্মানিত করে। ২. অহিংসার অনুশীলন পারিবারিক ও সামাজিক শান্তি বজায় রাখে। ৩. বিপদে মানুষের পাশে দাঁড়ালে পারস্পরিক ভালোবাসা বৃদ্ধি পায়। ৪. জীবে দয়া প্রদর্শন আমাদের চরিত্রকে উন্নত করে। ৫. ভালো কাজের মাধ্যমে আমরা ঈশ্বরের কৃপা লাভ করতে পারি।", marks: 6 },
      { id: "c4hin-b3", chapterId: "c4-hin-ch5", question: "মহাপুরুষ শ্রীরামকৃষ্ণ পরমহংসদেবের 'যত মত, তত পথ' বাণীর তাৎপর্য ব্যাখ্যা করো।", answer: "শ্রীরামকৃষ্ণ পরমহংসদেব উপলব্ধি করেছিলেন যে সকল ধর্মের মূল লক্ষ্য এক ও অভিন্ন ঈশ্বরকে লাভ করা। বিভিন্ন নদী যেমন বিভিন্ন দিক থেকে প্রবাহিত হয়ে একই সাগরে মেশে, তেমনি সকল ধর্মের মানুষ ভিন্ন ভিন্ন আচার পালন করলেও এক ঈশ্বরের কাছেই পৌঁছায়। তাঁর এই উদার বাণী সমাজে পারস্পরিক সম্প্রীতি ও ভ্রাতৃত্ববোধ গড়ে তোলার শ্রেষ্ঠ পাথেয়।", marks: 6 }
    ]
  },

  "class-4-buddhist": {
    id: "c4-bud",
    classId: "class-4",
    subject: "বৌদ্ধধর্ম ও নৈতিক শিক্ষা",
    mcq: [
      { id: "c4bud-m1", chapterId: "c4-bud-ch1", question: "সিদ্ধার্থ গৌতম কোন বৃক্ষের নিচে ধ্যানমগ্ন হয়ে বুদ্ধত্ব বা বোধি লাভ করেন?", options: ["বোধিবৃক্ষ বা অশ্বত্থ বৃক্ষ", "বটবৃক্ষ", "শালবৃক্ষ", "আমবৃক্ষ"], answer: "বোধিবৃক্ষ বা অশ্বত্থ বৃক্ষ", marks: 1 },
      { id: "c4bud-m2", chapterId: "c4-bud-ch2", question: "বুদ্ধের প্রধান দুই প্রজ্ঞাবান শিষ্যের নাম কী?", options: ["সারিপুত্ত ও মহামোগ্গল্লান", "আনন্দ ও উপালি", "দেবদত্ত ও রাহুল", "সুজাত ও কশ্যপ"], answer: "সারিপুত্ত ও মহামোগ্গল্লান", marks: 1 },
      { id: "c4bud-m3", chapterId: "c4-bud-ch3", question: "বৌদ্ধ গৃহীদের প্রাত্যহিক পালনীয় শীলকে কী বলে?", options: ["পঞ্চশীল", "অষ্টশীল", "দশশীল", "বিনয়"], answer: "পঞ্চশীল", marks: 1 },
      { id: "c4bud-m4", chapterId: "c4-bud-ch4", question: "বৌদ্ধ ধর্মাবলম্বীদের সবচেয়ে পবিত্র ও প্রধান উৎসব কোনটি?", options: ["বৈশাখী পূর্ণিমা", "মাঘী পূর্ণিমা", "আষাঢ়ী পূর্ণিমা", "মধু পূর্ণিমা"], answer: "বৈশাখী পূর্ণিমা", marks: 1 },
      { id: "c4bud-m5", chapterId: "c4-bud-ch5", question: "বুদ্ধের পূর্বজন্মের পুণ্যময় কাহিনিগুলো কোন গ্রন্থে সংকলিত?", options: ["জাতক", "ধম্মপদ", "সুত্তপিটক", "ত্রিপিটক"], answer: "জাতক", marks: 1 }
    ],
    fillInTheBlanks: [
      { id: "c4bud-f1", chapterId: "c4-bud-ch1", sentence: "গৌতম বুদ্ধের বাল্যকালের নাম ছিল কুমার ____।", answer: "সিদ্ধার্থ", marks: 1 },
      { id: "c4bud-f2", chapterId: "c4-bud-ch2", sentence: "সম্রাট অশোকের কন্যা সংঘমিত্রা সিংহলে (শ্রীলঙ্কায়) ____ ধর্ম প্রচার করেন।", answer: "বৌদ্ধ", marks: 1 },
      { id: "c4bud-f3", chapterId: "c4-bud-ch3", sentence: "জগতের সকল জীবের প্রতি অহিংস ও কল্যাণকর মনোভাবকে ____ বলে।", answer: "মৈত্রী", marks: 1 },
      { id: "c4bud-f4", chapterId: "c4-bud-ch4", sentence: "কঠিন চীবর দান বৌদ্ধদের এক মহৎ ও অনন্য ____ অনুষ্ঠান।", answer: "দান", marks: 1 },
      { id: "c4bud-f5", chapterId: "c4-bud-ch5", sentence: "অহিংসা বৌদ্ধধর্মের মূল ভিত্তি ও পরম ____।", answer: "আদর্শ", marks: 1 }
    ],
    trueFalse: [
      { id: "c4bud-tf1", chapterId: "c4-bud-ch1", statement: "বৈশাখী পূর্ণিমার পুণ্যলগ্নে বুদ্ধের জন্ম, বোধিলাভ ও মহাপরিনির্বাণ ঘটেছিল।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4bud-tf2", chapterId: "c4-bud-ch2", statement: "সারিপুত্ত বুদ্ধের শিষ্যদের মধ্যে ধর্মে সর্বশ্রেষ্ঠ প্রজ্ঞাবান ছিলেন।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4bud-tf3", chapterId: "c4-bud-ch3", statement: "পঞ্চশীলের প্রথম শীল হলো প্রাণী হত্যা থেকে বিরত থাকা।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4bud-tf4", chapterId: "c4-bud-ch4", statement: "ময়নামতি ও শালবন বিহার বাংলাদেশের বিখ্যাত ঐতিহাসিক বৌদ্ধ প্রত্নতত্ত্ব স্থান।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4bud-tf5", chapterId: "c4-bud-ch5", statement: "জাতকের গল্পগুলো হিংসা ও যুদ্ধ করতে উৎসাহিত করে।", isTrue: false, answer: "False (জাতকের গল্প ক্ষমা, ত্যাগ ও করুণা শিক্ষা দেয়)", marks: 1 }
    ],
    matching: {
      id: "c4bud-mat1",
      chapterId: "c4-bud-ch4",
      left: ["বৈশাখী পূর্ণিমা", "আষাঢ়ী পূর্ণিমা", "মাঘী পূর্ণিমা", "কঠিন চীবর দান"],
      right: ["বুদ্ধের ত্রিস্মৃতিবিজড়িত পুণ্যতিথি", "বুদ্ধের গৃহত্যাগ ও প্রথম ধর্মচক্র প্রবর্তন", "বুদ্ধের আয়ুসংস্কার বর্জন ও মহাপ্রয়াণের ঘোষণা", "ভিক্ষুসংঘকে পরিধেয় চীবর বস্ত্র প্রদান"],
      marks: 4
    },
    shortQuestions: [
      { id: "c4bud-s1", chapterId: "c4-bud-ch1", question: "চতুরার্য সত্যের চারটি সত্য কী কী?", answer: "১. দুঃখ সত্য, ২. দুঃখ সমুদয় (উৎপত্তি) সত্য, ৩. দুঃখ নিরোধ সত্য এবং ৪. দুঃখ নিরোধ মার্গ (উপায়) সত্য।", marks: 3 },
      { id: "c4bud-s2", chapterId: "c4-bud-ch2", question: "সংঘমিত্রা কীভাবে সিংহলে (শ্রীলঙ্কায়) বৌদ্ধধর্ম ও ভিক্ষুণীসংঘ প্রতিষ্ঠা করেন?", answer: "তিনি পিতা সম্রাট অশোকের আদেশে ভারতের বোধিবৃক্ষের একটি শাখা নিয়ে সিংহলে যান এবং সেখানে নারী ভিক্ষুণী সংঘ গড়ে তোলেন।", marks: 3 },
      { id: "c4bud-s3", chapterId: "c4-bud-ch3", question: "পঞ্চশীলের যেকোনো দুটি শীলের অর্থ বাংলায় লেখো।", answer: "১. প্রাণী হত্যা থেকে বিরত থাকা এবং ২. অদত্ত বা অপরের জিনিস চুরি করা থেকে বিরত থাকা।", marks: 3 },
      { id: "c4bud-s4", chapterId: "c4-bud-ch4", question: "বৌদ্ধ বিহার বা ক্যাং কী কাজে ব্যবহৃত হয়?", answer: "বিহার হলো বৌদ্ধ ভিক্ষুদের আবাসস্থল এবং উপাসকদের ধর্মীয় প্রার্থনা, সাধনা ও ধর্মীয় শিক্ষালাভের পবিত্র স্থান।", marks: 3 },
      { id: "c4bud-s5", chapterId: "c4-bud-ch5", question: "জাতকের নীতিগল্প থেকে শিশুরা কী কী গুণ অর্জন করতে পারে?", answer: "অহিংসা, সত্যবাদিতা, পরোপকার, বড়দের প্রতি ভক্তি এবং সকল প্রাণীর প্রতি দয়াভাবের মতো সদগুণ অর্জন করতে পারে।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c4bud-b1", chapterId: "c4-bud-ch1", question: "রাজকুমার সিদ্ধার্থের বৈরাগ্য ও চার নিমিত্ত দর্শনের সংক্ষিপ্ত বিবরণ দাও।", answer: "রাজকুমার সিদ্ধার্থ রাজপ্রাসাদের অপরিসীম বিলাসের মধ্যেও জীবনের প্রকৃত সত্য অনুসন্ধানে ব্যাকুল ছিলেন। নগর পরিভ্রমণে গিয়ে তিনি যথাক্রমে একজন জরাগ্রস্ত বৃদ্ধ, একজন যন্ত্রণাকাতর ব্যাধিগ্রস্ত রোগী, একজন মৃত ব্যক্তি এবং একজন শান্ত সমাহিত সন্ন্যাসী প্রত্যক্ষ করেন। এই চার নিমিত্ত বা দৃশ্য দেখে তিনি মানবজীবনের দুঃখের গভীরতা উপলব্ধি করেন এবং পরম সত্যের সন্ধানে রাজপ্রাসাদ, স্ত্রী ও পুত্র ত্যাগ করে সন্ন্যাস গ্রহণ করেন।", marks: 6 },
      { id: "c4bud-b2", chapterId: "c4-bud-ch3", question: "পঞ্চশীল পালনের সুফল এবং সমাজে শান্তি প্রতিষ্ঠায় অহিংসার অবদান ৫টি বাক্যে লেখো।", answer: "১. পঞ্চশীল মানুষকে পাপ ও অনৈতিক আচরণ থেকে মুক্ত রাখে। ২. এটি সমাজে চুরি, মিথ্যাচার ও সহিংসতা দূর করে। ৩. অহিংসার অনুশীলন মানুষের মনকে শান্ত ও সংযমী করে তোলে। ৪. পারস্পরিক শ্রদ্ধা ও সামাজিক শান্তি সুদৃঢ় হয়। ৫. পঞ্চশীল পালনে ব্যক্তি সমাজে সম্মানিত ও সর্বজনপ্রিয় হয়ে ওঠে।", marks: 6 },
      { id: "c4bud-b3", chapterId: "c4-bud-ch4", question: "ঐতিহাসিক শালবন বিহার ও পাহাড়পুর বৌদ্ধবিহারের প্রত্নতাত্ত্বিক গুরুত্ব বর্ণনা করো।", answer: "কুমিল্লার ময়নামতিতে অবস্থিত শালবন বিহার এবং নওগাঁর পাহাড়পুরে অবস্থিত সোমপুর মহাবিহার প্রাচীন বাংলার গৌরবময় বৌদ্ধ স্থাপত্য ও বিদ্যাপীঠের নিদর্শন। অষ্টম শতাব্দীতে নির্মিত এসব বিহারে ভারত ও বিদেশের পণ্ডিতেরা উচ্চতর বৌদ্ধ দর্শন ও বিজ্ঞান চর্চা করতেন। এগুলো প্রাচীন বাংলার উন্নত সংস্কৃতি, চারুকলা ও স্থাপত্যকলার অনন্য ঐতিহাসিক স্মারক।", marks: 6 }
    ]
  },

  "class-4-christian": {
    id: "c4-chr",
    classId: "class-4",
    subject: "খ্রিষ্টধর্ম ও নৈতিক শিক্ষা",
    mcq: [
      { id: "c4chr-m1", chapterId: "c4-chr-ch1", question: "সিনাই পর্বতে ঈশ্বর কার মাধ্যমে মানবজাতিকে দশ আজ্ঞা দান করেন?", options: ["মোশী", "আব্রাহাম", "দাউদ", "সোলোমন"], answer: "মোশী", marks: 1 },
      { id: "c4chr-m2", chapterId: "c4-chr-ch2", question: "প্রভু যীশু খ্রিষ্টের পুণ্য জন্মস্থান কোথায়?", options: ["বৈৎলেহম", "জেরুসালেম", "নাজারেত", "রোম"], answer: "বৈৎলেহম", marks: 1 },
      { id: "c4chr-m3", chapterId: "c4-chr-ch3", question: "যীশু খ্রিষ্টের প্রদত্ত সবচেয়ে বড় দুটি ভালোবাসার আজ্ঞা কী?", options: ["ঈশ্বরকে ভালোবাসা এবং প্রতিবেশীকে নিজের মতো ভালোবাসা", "ধনসম্পদ বৃদ্ধি করা", "শত্রুকে শাস্তি দেওয়া", "শুধু নিজের উপাসনা করা"], answer: "ঈশ্বরকে ভালোবাসা এবং প্রতিবেশীকে নিজের মতো ভালোবাসা", marks: 1 },
      { id: "c4chr-m4", chapterId: "c4-chr-ch4", question: "উত্তম শমরীয়ের দৃষ্টান্তমূলক গল্পের মূল বার্তা কী?", options: ["অসহায় ও আর্তমানবতার নিঃস্বার্থ সেবা", "যুদ্ধ ও বিবাদ", "বাণিজ্য ও মুনাফা", "হিংসা ও অহংকার"], answer: "অসহায় ও আর্তমানবতার নিঃস্বার্থ সেবা", marks: 1 },
      { id: "c4chr-m5", chapterId: "c4-chr-ch5", question: "ঈশ্বরের সৃষ্ট সুন্দর প্রকৃতির যত্ন নেওয়া প্রতিটি খ্রিষ্টভক্তের কেমন দায়িত্ব?", options: ["পবিত্র ও ধর্মীয় দায়িত্ব", "ঐচ্ছিক কাজ", "অর্থহীন বিষয়", "সরকারি দায়িত্ব"], answer: "পবিত্র ও ধর্মীয় দায়িত্ব", marks: 1 }
    ],
    fillInTheBlanks: [
      { id: "c4chr-f1", chapterId: "c4-chr-ch1", sentence: "পিতা-মাতাকে সমাদর করা ঈশ্বরের ____ আজ্ঞা।", answer: "চতুর্থ", marks: 1 },
      { id: "c4chr-f2", chapterId: "c4-chr-ch2", sentence: "যীশু খ্রিষ্ট ক্রুশের ওপর আত্মবলিদান দিয়ে মানবজাতিকে ____ করেন।", answer: "উদ্ধার বা মুক্তিদান", marks: 1 },
      { id: "c4chr-f3", chapterId: "c4-chr-ch3", sentence: "অন্যের ভুল ও অপরাধ ক্ষমা করা একটি মহৎ ____ গুণ।", answer: "খ্রীষ্টীয়", marks: 1 },
      { id: "c4chr-f4", chapterId: "c4-chr-ch4", sentence: "যে ব্যক্তি আমাদের সাহায্যের প্রয়োজন বোধ করে সে-ই আমাদের প্রকৃত ____।", answer: "প্রতিবেশী", marks: 1 },
      { id: "c4chr-f5", chapterId: "c4-chr-ch5", sentence: "গাছপালা রোপণ ও পরিবেশ সংরক্ষণ হলো ঈশ্বরের সৃষ্টির প্রতি ____ প্রকাশ।", answer: "ভালোবাসা ও যত্ন", marks: 1 }
    ],
    trueFalse: [
      { id: "c4chr-tf1", chapterId: "c4-chr-ch1", statement: "ঈশ্বরের দশ আজ্ঞা মানুষের ব্যক্তিগত ও সামাজিক জীবনে শৃঙ্খলা ও শান্তি প্রতিষ্ঠা করে।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4chr-tf2", chapterId: "c4-chr-ch2", statement: "যীশু খ্রিষ্ট রোগীদের আরোগ্য ও পাপীদের মুক্তির সুসংবাদ দিয়েছিলেন।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4chr-tf3", chapterId: "c4-chr-ch3", statement: "অন্যকে ক্ষমা না করে প্রতিশোধ নেওয়াই যীশুর শিক্ষা।", isTrue: false, answer: "False (যীশু শত্রুকেও ভালোবাসতে এবং অন্তরে ক্ষমা করতে বলেছেন)", marks: 1 },
      { id: "c4chr-tf4", chapterId: "c4-chr-ch4", statement: "উত্তম শমরীয় জাতপাত বিচার না করে আহত ব্যক্তির সেবা করেছিলেন।", isTrue: true, answer: "True", marks: 1 },
      { id: "c4chr-tf5", chapterId: "c4-chr-ch5", statement: "প্রকৃতি দূষণ ঈশ্বরের সৃষ্টির প্রতি অবজ্ঞার শামিল।", isTrue: true, answer: "True", marks: 1 }
    ],
    matching: {
      id: "c4chr-mat1",
      chapterId: "c4-chr-ch1",
      left: ["১ম আজ্ঞা", "৪র্থ আজ্ঞা", "৫ম আজ্ঞা", "৮ম আজ্ঞা"],
      right: ["একমাত্র ঈশ্বরকে উপাসনা করা", "পিতা-মাতাকে সমাদর করা", "মানুষ হত্যা না করা", "মিথ্যা সাক্ষ্য না দেওয়া"],
      marks: 4
    },
    shortQuestions: [
      { id: "c4chr-s1", chapterId: "c4-chr-ch1", question: "ঈশ্বরের দশ আজ্ঞা মানবজাতির জন্য কেন এত গুরুত্বপূর্ণ?", answer: "দশ আজ্ঞা হলো ঈশ্বরের দেওয়া নৈতিক বিধান যা মানুষকে পাপ থেকে দূরে রেখে ন্যায়, সততা ও প্রেমের পথে পরিচালিত করে।", marks: 3 },
      { id: "c4chr-s2", chapterId: "c4-chr-ch2", question: "যীশু খ্রিষ্টের জীবনের প্রধান মানবীয় গুণগুলো কী কী ছিল?", answer: "নম্রতা, ক্ষমাশীলতা, আর্তমানবতার সেবা, সত্যবাদিতা এবং গভীর ঈশ্বরভক্তি।", marks: 3 },
      { id: "c4chr-s3", chapterId: "c4-chr-ch3", question: "যীশুর শিক্ষায় 'ক্ষমাশীলতা' কেন সবচেয়ে বড় গুণ হিসেবে বর্ণিত হয়েছে?", answer: "কারণ আমরা যদি অপরের অপরাধ ক্ষমা না করি, তবে ঈশ্বরও আমাদের পাপ ক্ষমা করবেন না। ক্ষমার মাধ্যমে হৃদয়ে শান্তি আসে।", marks: 3 },
      { id: "c4chr-s4", chapterId: "c4-chr-ch4", question: "উত্তম শমরীয়ের দৃষ্টান্তে কে প্রকৃত প্রতিবেশী হয়েছিল?", answer: "যে শমরীয় জাতিগত বৈষম্য ভুলে গিয়ে ডাকাতদের হাতে আহত মুমূর্ষু ব্যক্তির শুশ্রূষা করেছিল, সে-ই প্রকৃত প্রতিবেশী হয়েছিল।", marks: 3 },
      { id: "c4chr-s5", chapterId: "c4-chr-ch5", question: "জলবায়ু পরিবর্তন ও পরিবেশ দূষণ রোধে খ্রিষ্টীয় দৃষ্টিভঙ্গি কী?", answer: "ঈশ্বর এই সুন্দর বিশ্ব সৃষ্টি করে মানুষকে তার পরিচারক বা যত্নকারী হিসেবে দায়িত্ব দিয়েছেন; তাই প্রকৃতিকে ভালোবাসা ও সুরক্ষা দেওয়া আমাদের পবিত্র দায়িত্ব।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c4chr-b1", chapterId: "c4-chr-ch1", question: "ঈশ্বরের দশ আজ্ঞার মূল শিক্ষা এবং বর্তমান সমাজ গঠনে এর প্রয়োজনীয়তা ব্যাখ্যা করো।", answer: "ঈশ্বরের দশ আজ্ঞা মানুষের সাথে ঈশ্বরের এবং মানুষের সাথে মানুষের পবিত্র সম্পর্ক নির্ধারণ করে। প্রথম তিনটি আজ্ঞা ঈশ্বরের উপাসনা ও মর্যাদার সাথে সম্পর্কিত এবং পরবর্তী সাতটি আজ্ঞা পিতামাতার প্রতি ভক্তি, জীবনের পবিত্রতা, সততা, পরস্ত্রীর প্রতি লোভ না করা ও সত্যবাদিতা শিক্ষা দেয়। বর্তমান সমাজে এই আজ্ঞাগুলো নিষ্ঠার সাথে পালন করলে সমাজে অন্যায়, লোভ, কলহ ও দুর্নীতি দূর হবে এবং শান্তি প্রতিষ্ঠিত হবে।", marks: 6 },
      { id: "c4chr-b2", chapterId: "c4-chr-ch4", question: "উত্তম শমরীয়ের দৃষ্টান্তের মাধ্যমে যীশু খ্রিষ্ট মানবতার যে মহান বার্তা দিয়েছেন তা ৫টি বাক্যে লেখো।", answer: "১. জাত, ধর্ম বা বর্ণের পার্থক্য ভুলে প্রতিটি অসহায় মানুষই আমাদের প্রতিবেশী। ২. কেবল ধর্মীয় উপাসনাই যথেষ্ট নয়, বিপদগ্রস্তের সেবা করাই প্রধান ধর্ম। ৩. শত্রুভাবাপন্ন ব্যক্তিকেও বিপদের দিনে সহমর্মিতা ও ভালোবাসা প্রদর্শন করতে হবে। ৪. নিঃস্বার্থ ত্যাগের মাধ্যমেই প্রকৃত মানবতাবোধ প্রকাশ পায়। ৫. যীশু আমাদের নির্দেশ দিয়েছেন আমরাও যেন উত্তম শমরীয়ের মতো আর্তের সেবায় এগিয়ে যাই।", marks: 6 },
      { id: "c4chr-b3", chapterId: "c4-chr-ch5", question: "ঈশ্বরের সুন্দর এই পৃথিবী ও প্রকৃতিকে দূষণমুক্ত রাখতে আমাদের ব্যক্তিগত ও সামাজিক দায়িত্ব বর্ণনা করো।", answer: "ঈশ্বর প্রকৃতি ও সমস্ত জীব সৃষ্টি করে মানুষকে দায়িত্বশীলভাবে তার যত্ন নিতে বলেছেন। আমাদের দায়িত্ব: ১. বিনা কারণে গাছ না কেটে প্রতি বছর নতুন গাছ লাগানো। ২. নদী, খাল ও পুকুরে প্লাস্টিক ও ক্ষতিকর বর্জ্য ফেলা বন্ধ করা। ৩. পানিসহ সকল প্রাকৃতিক সম্পদের অপচয় রোধ করা। ৪. বিদ্যালয়ে ও বাড়িতে পরিচ্ছন্নতা অভিযান পরিচালনা করা। ৫. ঈশ্বরপ্রদত্ত এই অপরূপ সৃষ্টিকে ভালোবাসা ও ভবিষ্যৎ প্রজন্মের জন্য বাসযোগ্য রাখা।", marks: 6 }
    ]
  },

  // ==========================================
  // 🎒 CLASS 5 (৫ম শ্রেণি)
  // ==========================================
  "class-5-bangla": {
    id: "c5-b",
    classId: "class-5",
    subject: "বাংলা",
    mcq: [
      { id: "c5b-m1", question: "রাখাইনদের প্রধান ঐতিহ্যবাহী উৎসব কোনটি?", options: ["সাংগ্রাই", "বিজু", "বৈসাবি", "ওয়ানগালা"], answer: "সাংগ্রাই", marks: 2 },
      { id: "c5b-m2", question: "শহীদ তিতুমীর ইংরেজদের বিরুদ্ধে প্রতিরোধের জন্য কোথায় বাঁশের কেল্লা নির্মাণ করেছিলেন?", options: ["নারিকেলবাড়িয়ায়", "বারাসাতে", "হুগলিতে", "মুর্শিদাবাদে"], answer: "নারিকেলবাড়িয়ায়", marks: 2 },
      { id: "c5b-m3", question: "‘দূরের পাল্লা’ কবিতাটি কোন কবির লেখা?", options: ["সত্যেন্দ্রনাথ দত্ত", "কাজী নজরুল ইসলাম", "রবীন্দ্রনাথ ঠাকুর", "জসীমউদ্দীন"], answer: "সত্যেন্দ্রনাথ দত্ত", marks: 2 },
      { id: "c5b-m4", question: "সুন্দরবনের কোন প্রাণীটি বিশ্বজুড়ে বাংলাদেশের অহংকার ও প্রতীক?", options: ["রয়েল বেঙ্গল টাইগার", "চিত্রা হরিণ", "কুমির", "মেছো বাঘ"], answer: "রয়েল বেঙ্গল টাইগার", marks: 2 },
      { id: "c5b-m5", question: "‘সংকল্প’ কবিতায় কিশোর কবি মনে কী প্রতিজ্ঞা করেছেন?", options: ["বদ্ধ ঘরে থাকবে না, বিশ্বজগৎ দেখবে", "শুধু দেশ ভ্রমণ করবে", "পাহাড়চূড়ায় উঠবে", "মহাকাশে উড়বে"], answer: "বদ্ধ ঘরে থাকবে না, বিশ্বজগৎ দেখবে", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c5b-f1", sentence: "বৈচিত্র্য আর ভিন্নতাই ________ করেছে বাংলাদেশকে।", answer: "সমৃদ্ধ", marks: 2 },
      { id: "c5b-f2", sentence: "তিতুমীর ১৮৩১ সালে নারিকেলবাড়িয়ায় বিখ্যাত ________ কেল্লা গড়ে তোলেন।", answer: "বাঁশের", marks: 2 },
      { id: "c5b-f3", sentence: "ছিপখান তিন-দাঁড়, তিনজন ________, চৌপর দিন-ভোর দেয় দূর-পাল্লা।", answer: "মাল্লা", marks: 2 },
      { id: "c5b-f4", sentence: "থাকব না কো ________ ঘরে, দেখব এবার জগৎটাকে।", answer: "বদ্ধ", marks: 2 }
    ],
    matching: {
      left: ["সাংগ্রাই", "বাঁশের কেল্লা", "ছন্দের জাদুকর", "রয়েল বেঙ্গল টাইগার"],
      right: ["রাখাইনদের উৎসব", "তিতুমীরের প্রতিরোধ", "সত্যেন্দ্রনাথ দত্ত", "সুন্দরবনের অহংকার"],
      marks: 4
    },
    shortQuestions: [
      { id: "c5b-s1", question: "তিতুমীর ইংরেজ ও নীলকরদের বিরুদ্ধে কেন বাঁশের কেল্লা নির্মাণ করেছিলেন?", answer: "বাংলার গরিব কৃষক ও সাধারণ মানুষকে ইংরেজদের অন্যায় শাসন ও নীলকরদের বর্বর অত্যাচার থেকে রক্ষা করার জন্য তিতুমীর নারিকেলবাড়িয়ায় বাঁশের কেল্লা তৈরি করে প্রতিরোধ গড়ে তোলেন।", marks: 3 },
      { id: "c5b-s2", question: "‘দূরের পাল্লা’ কবিতায় নদীর দুই তীরের কী কী দৃশ্য ফুটে উঠেছে?", answer: "নদীর তীরে ঝোপঝাড়, বনজঙ্গল ও নতুন জেগে ওঠা চর দেখা যায়। নদীর জলে সবুজ শৈবাল পান্নার মতো চকচক করে এবং বুনো হাঁস ও পানকৌড়ি জলে ডুব দিয়ে খেলা করে।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c5b-b1", question: "বাংলাদেশের বিভিন্ন ধর্ম ও নৃগোষ্ঠীর মানুষের মধ্যে যে সম্প্রীতি বিদ্যমান, তা ‘বৈচিত্র্যময় বাংলাদেশ’ পাঠের আলোকে বর্ণনা করো।", answer: "বাংলাদেশে বাঙালি ছাড়াও চাকমা, মারমা, গারো, সাঁওতাল, তঞ্চঙ্গ্যা, রাখাইন প্রভৃতি ক্ষুদ্র নৃগোষ্ঠীর মানুষ পরম সম্প্রীতিতে বাস করে। এখানে মুসলিমদের ঈদ, হিন্দুদের দুর্গাপূজা, বৌদ্ধদের বুদ্ধপূর্ণিমা, খ্রিস্টানদের বড়দিন এবং রাখাইনদের সাংগ্রাই ও চাকমাদের বিজু উৎসব জাতি-ধর্ম নির্বিশেষে সবাই আনন্দের সাথে উপভোগ করে। এই নানা রঙের বৈচিত্র্য ও পারস্পরিক শ্রদ্ধাবোধই বাংলাদেশকে এক অখণ্ড ও সুন্দর সম্প্রীতির দেশে পরিণত করেছে।", marks: 5 }
    ],
    yuktaborno: [
      { id: "c5b-y1", cluster: "ক্ত", breakdown: "ক + ত", word: "রক্ত, ভক্তি", sentence: "লাখো শহিদের রক্তের বিনিময়ে অর্জিত এই প্রিয় স্বাধীনতা।", marks: 3 },
      { id: "c5b-y2", cluster: "ক্ষ", breakdown: "ক + ষ", word: "শিক্ষক, পরীক্ষা", sentence: "শিক্ষক সমাজকে সত্য ও জ্ঞানের আলো দেখান।", marks: 3 }
    ]
  },

  "class-5-english": {
    id: "c5-e",
    classId: "class-5",
    subject: "English",
    mcq: [
      { id: "c5e-m1", chapterId: "c5-e-u1", question: "Where are Sima and Jessica talking?", options: ["At a bus terminal", "At the railway station", "At an airport", "At a school library"], answer: "At the railway station", marks: 1 },
      { id: "c5e-m2", chapterId: "c5-e-u3", question: "Where does Saikat Islam live with his parents?", options: ["In Dhaka", "In an apartment in Bogura", "In Sylhet", "In Khulna"], answer: "In an apartment in Bogura", marks: 1 },
      { id: "c5e-m3", chapterId: "c5-e-u9", question: "What is Raju's present occupation?", options: ["A volunteer", "A full-time firefighter", "A doctor", "A pilot"], answer: "A full-time firefighter", marks: 1 },
      { id: "c5e-m4", chapterId: "c5-e-u10", question: "How far is Kishoreganj from Dhaka?", options: ["About 100 km", "About 145 km", "About 200 km", "About 250 km"], answer: "About 145 km", marks: 1 },
      { id: "c5e-m5", chapterId: "c5-e-u12", question: "What is the only coral island in Bangladesh?", options: ["Maheshkhali", "Sandwip", "Saint Martin's Island", "Bhola"], answer: "Saint Martin's Island", marks: 1 }
    ],
    fillInTheBlanks: [
      { id: "c5e-f1", chapterId: "c5-e-u1", sentence: "Sima and Jessica are having a conversation at the ____ station.", answer: "railway", marks: 1 },
      { id: "c5e-f2", chapterId: "c5-e-u3", sentence: "Saikat's father Mr. Rashidul Islam is a ____.", answer: "banker", marks: 1 },
      { id: "c5e-f3", chapterId: "c5-e-u6", sentence: "Foods made from grain give our bodies essential ____.", answer: "energy", marks: 1 },
      { id: "c5e-f4", chapterId: "c5-e-u9", sentence: "Now Raju works as a dedicated ____ firefighter.", answer: "full-time", marks: 1 },
      { id: "c5e-f5", chapterId: "c5-e-u10", sentence: "The river ____ flows smoothly through Kishoreganj town.", answer: "Narasunda", marks: 1 }
    ],
    trueFalse: [
      { id: "c5e-tf1", chapterId: "c5-e-u1", statement: "Sima is going to Sylhet with her family.", isTrue: true, answer: "True", marks: 1 },
      { id: "c5e-tf2", chapterId: "c5-e-u3", statement: "Saikat watches cartoons on TV to improve his English.", isTrue: true, answer: "True", marks: 1 },
      { id: "c5e-tf3", chapterId: "c5-e-u8", statement: "The doctor advised Sima to drink ice-cold soft drinks.", isTrue: false, answer: "False (The doctor advised water or juice)", marks: 1 },
      { id: "c5e-tf4", chapterId: "c5-e-u10", statement: "Solakia is the largest Eid congregation ground in Bangladesh.", isTrue: true, answer: "True", marks: 1 },
      { id: "c5e-tf5", chapterId: "c5-e-u12", statement: "Saint Martin's is the only coral island in Bangladesh.", isTrue: true, answer: "True", marks: 1 }
    ],
    matching: {
      id: "c5e-mat1",
      chapterId: "c5-e-u10",
      left: ["Solakia", "Narasunda", "Chandrabati", "Zainul Abedin"],
      right: ["Largest Eid fairground", "River flowing through town", "First woman poet of Bangla literature", "Pioneering great artist of Bangladesh"],
      marks: 5
    },
    shortQuestions: [
      { id: "c5e-s1", chapterId: "c5-e-u1", question: "Where are Sima and Jessica and where are they going?", answer: "They are at the railway station; Sima is going to Sylhet and Jessica is returning to Dhaka.", marks: 2 },
      { id: "c5e-s2", chapterId: "c5-e-u3", question: "Where does Saikat live and what class does he read in?", answer: "Saikat lives in an apartment in Bogura and reads in Class 5.", marks: 2 },
      { id: "c5e-s3", chapterId: "c5-e-u8", question: "What symptoms does Sima have and what did the doctor prescribe?", answer: "Sima has a cough, sore throat and fever; the doctor prescribed medicine, rest, and plenty of fluids.", marks: 2 },
      { id: "c5e-s4", chapterId: "c5-e-u9", question: "What advice does Raju give to students about fire safety?", answer: "He tells them never to panic during a fire and to listen to their teachers.", marks: 2 },
      { id: "c5e-s5", chapterId: "c5-e-u12", question: "What makes Saint Martin's Island unique in Bangladesh?", answer: "It is the only coral island in Bangladesh, surrounded by crystal blue water and sea turtles.", marks: 2 }
    ],
    broadQuestions: [
      { id: "c5e-b1", chapterId: "c5-e-u3", question: "Write a short composition of 5-7 sentences about 'Saikat's Family'.", answer: "1. Saikat Islam is a diligent student who reads in Class 5. 2. He lives with his parents in an apartment in Bogura. 3. His father Mr. Rashidul Islam is an honest banker who writes stories in his free time. 4. His mother Mrs. Monwara Islam is a caring housewife who enjoys sewing dresses. 5. Saikat watches cartoons on TV every day to improve his English pronunciation. 6. He also enjoys reading English books about wild animals like lions and tigers. 7. Saikat's family is a loving, peaceful and happy family.", marks: 5 },
      { id: "c5e-b2", chapterId: "c5-e-u10", question: "Write 5-7 sentences describing 'My Home District: Kishoreganj'.", answer: "1. Kishoreganj is an important administrative district situated 145 kilometres from Dhaka. 2. The scenic river Narasunda flows peacefully through the town. 3. It is famous for the historic Solakia Eid Ground, where the largest Eid congregation is held. 4. You can also visit the historic Pagla Mosque and the ancient fort of Isah Khan at Jangalbari. 5. Kishoreganj is the proud birthplace of Chandrabati, the first woman poet of Bangla literature. 6. World-famous painter Shilpacharya Zainul Abedin and Syed Nazrul Islam were born here. 7. I feel immense pride and joy in calling Kishoreganj my home district.", marks: 5 },
      { id: "c5e-b3", chapterId: "c5-e-u19", question: "Write a short composition of 5-7 sentences about 'A Visit to the Liberation War Museum'.", answer: "1. On 14 December, our class went on a memorable field trip to the Liberation War Museum. 2. The museum was situated at Segunbagicha in Dhaka. 3. A welcoming guide showed us four permanent galleries rich in historical photographs and documents. 4. In Gallery 2, our teacher read aloud the historic Declaration of Independence by Bangabandhu. 5. In Gallery 4, we saw personal relics of martyred freedom fighters and intellectuals. 6. Looking at their spectacles, notebooks and pens filled our hearts with solemn respect. 7. This visit taught us the supreme value of our freedom and independence.", marks: 5 },
      { id: "c5e-b4", chapterId: "c5-e-u20", question: "Write 5-7 sentences about 'Life is Beautiful: Maria's Inspiring Story'.", answer: "1. Maria is a cheerful and bright student who has been visually impaired since birth. 2. Although she cannot see, she perceives nature through touch, smell, and hearing. 3. She wakes up early on spring mornings to smell fresh flowers and listen to singing birds. 4. She goes to school every day and learns lessons enthusiastically using Braille script. 5. Her fingers move swiftly across raised dots to read poems, history, and science. 6. Maria dreams of attending university and becoming a writer of inspiring books. 7. She also wishes to set up a dedicated school to teach visually impaired children.", marks: 5 }
    ]
  },

  "class-5-math": {
    id: "c5-m",
    classId: "class-5",
    subject: "গণিত",
    mcq: [
      { id: "c5m-m1", question: "১ ডজন কলার দাম ৬০ টাকা হলে, ১টি কলার দাম কত?", options: ["৪ টাকা", "৫ টাকা", "৬ টাকা", "১০ টাকা"], answer: "৫ টাকা", marks: 2 },
      { id: "c5m-m2", question: "শতকরা বলতে কী বোঝায়?", options: ["প্রতি ১০০ তে কত", "প্রতি ১০ এ কত", "প্রতি ১০০০ এ কত", "একটি ভগ্নাংশ"], answer: "প্রতি ১০০ তে কত", marks: 2 },
      { id: "c5m-m3", question: "আয়তক্ষেত্রের ক্ষেত্রফল নির্ণয়ের সূত্র কোনটি?", options: ["দৈর্ঘ্য + প্রস্থ", "২ × (দৈর্ঘ্য + প্রস্থ)", "দৈর্ঘ্য × প্রস্থ", "বাহু × বাহু"], answer: "দৈর্ঘ্য × প্রস্থ", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c5m-f1", sentence: "আসল × বার্ষিক মুনাফার হার ÷ ১০০ = ____।", answer: "বার্ষিক মুনাফা", marks: 2 },
      { id: "c5m-f2", sentence: "১ কুইন্টাল = ____ কিলোগ্রাম।", answer: "১০০", marks: 2 },
      { id: "c5m-f3", sentence: "গড় = রাশিগুলোর যোগফল ÷ ____।", answer: "রাশিগুলোর সংখ্যা", marks: 2 }
    ],
    matching: {
      left: ["লাভ", "ক্ষতি", "বর্গক্ষেত্রের ক্ষেত্রফল", "সামান্তরিকের ক্ষেত্রফল"],
      right: ["ক্রয়মূল্য - বিক্রয়মূল্য", "বিক্রয়মূল্য - ক্রয়মূল্য", "ভূমি × উচ্চতা", "বাহু × বাহু"],
      marks: 4
    },
    shortQuestions: [
      { id: "c5m-s1", question: "চার প্রক্রিয়া সম্পর্কিত সমস্যা সমাধানের ক্ষেত্রে বন্ধনী ও চিহ্নের অগ্রাধিকারের নিয়ম কী?", answer: "প্রথমে প্রথম বন্ধনী, দ্বিতীয় বন্ধনী, তৃতীয় বন্ধনী এবং চিহ্নের ক্ষেত্রে ‘এর’, তারপর ভাগ, গুণ, যোগ এবং শেষে বিয়োগের কাজ করতে হয়।", marks: 3 },
      { id: "c5m-s2", question: "৮, ১২, ১৬ এবং ২৪ এর গড় নির্ণয় করো।", answer: "যোগফল = ৮ + ১২ + ১৬ + ২৪ = ৬০। সংখ্যা = ৪। গড় = ৬০ ÷ ৪ = ১৫।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c5m-b1", question: "একজন কৃষক বার্ষিক ৮% সরল মুনাফায় ব্যাংক থেকে ৫,০০০ টাকা ঋণ নিলেন। ৩ বছর পর তাকে কত টাকা মুনাফা দিতে হবে এবং মোট কত টাকা পরিশোধ করতে হবে?", answer: "১ বছরের মুনাফা = (৫০০০ × ৮) ÷ ১০০ = ৪০০ টাকা। ৩ বছরের মুনাফা = ৪০০ × ৩ = ১২০০ টাকা। মোট পরিশোধ করতে হবে (আসল + মুনাফা) = ৫০০০ + ১২০০ = ৬,২০০ টাকা।", marks: 5 }
    ]
  },

  "class-5-science": {
    id: "c5-s",
    classId: "class-5",
    subject: "প্রাথমিক বিজ্ঞান",
    mcq: [
      { id: "c5s-m1", question: "উদ্ভিদ নিজের খাদ্য তৈরির প্রক্রিয়ায় কোন গ্যাস উৎপন্ন করে পরিবেশে ছাড়ে?", options: ["নাইট্রোজেন", "কার্বন ডাই-অক্সাইড", "অক্সিজেন", "জলীয় বাষ্প"], answer: "অক্সিজেন", marks: 2 },
      { id: "c5s-m2", question: "বায়ুদূষণের প্রধান কারণ কোনটি?", options: ["গাছ লাগানো", "কলকারখানা ও যানবাহনের কালো ধোঁয়া", "সৌরশক্তির ব্যবহার", "বৃষ্টিপাত"], answer: "কলকারখানা ও যানবাহনের কালো ধোঁয়া", marks: 2 },
      { id: "c5s-m3", question: "পানি বিশুদ্ধ করার নিরাপদ রাসায়নিক উপাদান কোনটি?", options: ["ব্লিচিং পাউডার বা ফিটকিরি", "লবণ", "চুন", "ডিটারজেন্ট"], answer: "ব্লিচিং পাউডার বা ফিটকিরি", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c5s-f1", sentence: "সূর্য সকল ____ প্রধান উৎস।", answer: "শক্তির", marks: 2 },
      { id: "c5s-f2", sentence: "বায়ুমণ্ডলে নাইট্রোজেনের পরিমাণ প্রায় ____ ভাগ।", answer: "৭৮", marks: 2 },
      { id: "c5s-f3", sentence: "জীবাশ্ম জ্বালানি পোড়ালে বায়ুমণ্ডলে ____ গ্যাসের পরিমাণ বৃদ্ধি পায়।", answer: "কার্বন ডাই-অক্সাইড", marks: 2 }
    ],
    matching: {
      left: ["সালোকসংশ্লেষণ", "শব্দদূষণ", "পানিচক্র", "সবুজ শক্তির উৎস"],
      right: ["অতিরিক্ত হর্ন বাজানো", "সৌরবিদ্যুৎ ও বায়ুকল", "উদ্ভিদের খাদ্য তৈরি", "বৃষ্টি ও মেঘ সৃষ্টি"],
      marks: 4
    },
    shortQuestions: [
      { id: "c5s-s1", question: "সবুজ বিপ্লব ও পরিবেশবান্ধব জ্বালানি বলতে কী বোঝায়?", answer: "পরিবেশ দূষণ না করে পুনর্নবায়নযোগ্য উৎস (যেমন: সূর্য, বায়ুপ্রবাহ) থেকে শক্তি উৎপাদনকে বোঝায়।", marks: 3 },
      { id: "c5s-s2", question: "সংক্রামক রোগ প্রতিরোধের ২টি উপায় লেখো।", answer: "১. সাবান দিয়ে নিয়মিত হাত ধোয়া। ২. আক্রান্ত ব্যক্তির হাঁচি-কাশির সময় দূরত্ব বজায় রাখা।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c5s-b1", question: "পরিবেশ সংরক্ষণে প্রাথমিক বিদ্যালয়ের শিক্ষার্থীদের কী কী দায়িত্ব পালন করা উচিত? ৫টি বাক্যে ব্যাখ্যা করো।", answer: "১. বিদ্যালয়ের আঙিনায় বেশি করে গাছ লাগানো ও পরিচর্যা করা। ২. ময়লা-আবর্জনা যেখানে-সেখানে না ফেলে নির্দিষ্ট ডাস্টবিনে ফেলা। ৩. অপ্রয়োজনে লাইট, ফ্যান চালু না রেখে বিদ্যুতের অপচয় রোধ করা। ৪. পানির কল খোলা না রেখে সচেতন হওয়া। ৫. সহপাঠী ও পরিবারের সবাইকে পরিবেশ পরিচ্ছন্ন রাখতে উদ্বুদ্ধ করা।", marks: 5 }
    ]
  },

  "class-5-bgs": {
    id: "c5-bgs",
    classId: "class-5",
    subject: "বাংলাদেশ ও বিশ্বপরিচয়",
    mcq: [
      { id: "c5bgs-m1", question: "১৯৭১ সালে মুজিবনগর সরকার কোন তারিখে আনুষ্ঠানিকভাবে শপথ গ্রহণ করে?", options: ["১০ এপ্রিল ১৯৭১", "১৭ এপ্রিল ১৯৭১", "২৫ মার্চ ১৯৭১", "১৬ ডিসেম্বর ১৯৭১"], answer: "১৭ এপ্রিল ১৯৭১", marks: 2 },
      { id: "c5bgs-m2", question: "ব্রিটিশ আমলে বাংলার কোন বিশ্বখ্যাত বস্ত্রশিল্পটি ধ্বংস হয়ে যায়?", options: ["জামদানি", "মসলিন", "খাদি", "রেশম"], answer: "মসলিন", marks: 2 },
      { id: "c5bgs-m3", question: "জাতিসংঘের প্রধান লক্ষ্য কোনটি?", options: ["যুদ্ধ পরিচালনা", "বিশ্বশান্তি ও নিরাপত্তা রক্ষা", "বাণিজ্য দখল", "অস্ত্র বিক্রি"], answer: "বিশ্বশান্তি ও নিরাপত্তা রক্ষা", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c5bgs-f1", sentence: "মেহেরপুরের বৈদ্যনাথতলার বর্তমান নাম ____।", answer: "মুজিবনগর", marks: 2 },
      { id: "c5bgs-f2", sentence: "সকলের শিক্ষা লাভের সুযোগ একটি মৌলিক ____।", answer: "অধিকার", marks: 2 },
      { id: "c5bgs-f3", sentence: "সমাজে শান্তি বজায় রাখতে অন্যের মতের প্রতি ____ প্রদর্শন করা উচিত।", answer: "শ্রদ্ধা বা সহনশীলতা", marks: 2 }
    ],
    matching: {
      left: ["১৯৫২ সাল", "১৯৬৬ সাল", "১৯৬৯ সাল", "১৯৭১ সাল"],
      right: ["৬ দফা আন্দোলন", "মহান ভাষা আন্দোলন", "মহান মুক্তিযুদ্ধ", "ঐতিহাসিক গণঅভ্যুত্থান"],
      marks: 4
    },
    shortQuestions: [
      { id: "c5bgs-s1", question: "মুজিবনগর সরকারের রাষ্ট্রপতি ও প্রধানমন্ত্রী কে ছিলেন?", answer: "রাষ্ট্রপতি ছিলেন বঙ্গবন্ধু শেখ মুজিবুর রহমান এবং প্রধানমন্ত্রী ছিলেন তাজউদ্দীন আহমদ।", marks: 3 },
      { id: "c5bgs-s2", question: "গণতান্ত্রিক মনোভাব বলতে কী বোঝায়?", answer: "সকলের মতামতকে শ্রদ্ধা করা এবং সংখ্যাগরিষ্ঠের মতানুযায়ী সিদ্ধান্ত গ্রহণ করার চর্চাকে গণতান্ত্রিক মনোভাব বলে।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c5bgs-b1", question: "১৯৭১ সালের মুক্তিযুদ্ধে সাধারণ মানুষের পাশাপাশি নারী ও বুদ্ধিজীবীদের গৌরবোজ্জ্বল অবদান বিস্তারিত আলোচনা করো।", answer: "মুক্তিযুদ্ধে সাধারণ মানুষ মুক্তিযোদ্ধাদের আশ্রয়, খাবার ও তথ্য দিয়ে সহায়তা করেছেন। নারীরা অস্ত্র বহন, চিকিৎসা ও সরাসরি অস্ত্র হাতে লড়াই করেছেন। পাকিস্তানি বাহিনী পরাজয় নিশ্চিত জেনে ১৪ ডিসেম্বর দেশের শ্রেষ্ঠ বুদ্ধিজীবীদের হত্যা করে। তাঁদের এই আত্মত্যাগ চিরস্মরণীয়।", marks: 5 }
    ]
  }
};
