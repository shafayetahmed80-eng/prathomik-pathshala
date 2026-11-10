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
    { key: "bgs", name: "বাংলাদেশ ও বিশ্বপরিচয়" }
  ],
  "class-4": [
    { key: "bangla", name: "বাংলা" },
    { key: "english", name: "English" },
    { key: "math", name: "গণিত" },
    { key: "science", name: "প্রাথমিক বিজ্ঞান" },
    { key: "bgs", name: "বাংলাদেশ ও বিশ্বপরিচয়" }
  ],
  "class-5": [
    { key: "bangla", name: "বাংলা" },
    { key: "english", name: "English" },
    { key: "math", name: "গণিত" },
    { key: "science", name: "প্রাথমিক বিজ্ঞান" },
    { key: "bgs", name: "বাংলাদেশ ও বিশ্বপরিচয়" }
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
      { id: "c4b-m1", question: "‘বীরপুরুষ’ কবিতায় খোকা মাকে নিয়ে কোথায় যাচ্ছিল?", options: ["হাটে", "মামার বাড়ি", "দূর বিদেশ", "মেলায়"], answer: "দূর বিদেশ", marks: 2 },
      { id: "c4b-m2", question: "মহীয়সী বেগম রোকেয়া কোন জেলায় জন্মগ্রহণ করেন?", options: ["ঢাকা", "রংপুর", "পায়রাবন্দ, রংপুর", "যশোর"], answer: "পায়রাবন্দ, রংপুর", marks: 2 },
      { id: "c4b-m3", question: "‘সততা’ শব্দের অর্থ কী?", options: ["মিথ্যা বলা", "সাধুতা বা সত্যবাদিতা", "রাগ করা", "ভয় পাওয়া"], answer: "সাধুতা বা সত্যবাদিতা", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c4b-f1", sentence: "বেগম রোকেয়া নারী শিক্ষার ____ ছিলেন।", answer: "অগ্রদূত", marks: 2 },
      { id: "c4b-f2", sentence: "ডালিম গাছে মৌ, এতো ডাকি তবু কথা ____ কেন বউ?", answer: "কও না", marks: 2 },
      { id: "c4b-f3", sentence: "সততা মানবজীবনের সবচেয়ে বড় ____।", answer: "গুণ বা সম্পদ", marks: 2 }
    ],
    matching: {
      left: ["নির্ভীক", "অগ্রদূত", "সংকল্প", "মেধা"],
      right: ["যিনি পথ দেখান", "যার ভয় নেই", "প্রখর বুদ্ধি", "দৃঢ় প্রতিজ্ঞা"],
      marks: 4
    },
    shortQuestions: [
      { id: "c4b-s1", question: "‘বীরপুরুষ’ কবিতায় খোকা কীভাবে ডাকাতদের তাড়িয়েছিল?", answer: "খোকা তলোয়ার নিয়ে ঘোড়া ছুটিয়ে সাহসের সাথে লড়াই করে ডাকাতদের তাড়িয়ে দিয়েছিল।", marks: 3 },
      { id: "c4b-s2", question: "নারী শিক্ষায় বেগম রোকেয়ার অবদান সংক্ষেপে লেখো।", answer: "বেগম রোকেয়া প্রতিকূল সমাজে মেয়েদের জন্য বিদ্যালয় প্রতিষ্ঠা করেন এবং ঘরে ঘরে গিয়ে অভিভাবকদের বুঝিয়ে ছাত্রীদের বিদ্যালয়ে নিয়ে আসেন।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c4b-b1", question: "‘বড় রাজা ও ছোট রাজা’ গল্পে বড় রাজা কেন ছোট রাজার রাজ্য জয় করতে পারেননি?", answer: "ছোট রাজার রাজ্য ছিল এত ক্ষুদ্র যে বড় রাজার বিশাল কামান ও সৈন্য দিয়ে তাকে ধরা যাচ্ছিল না। বড় রাজার অহংকার চূর্ণ হয়েছিল এবং তিনি বুঝতে পারেন কোনো ক্ষুদ্র বস্তুকে তুচ্ছ তাচ্ছিল্য করা উচিত নয়।", marks: 5 }
    ],
    yuktaborno: [
      { id: "c4b-y1", cluster: "জ্ঞ", breakdown: "জ + ঞ", word: "বিজ্ঞান", sentence: "বিজ্ঞান মানুষের জীবনকে সহজ করেছে।", marks: 3 },
      { id: "c4b-y2", cluster: "ঙ্গ", breakdown: "ঙ + গ", word: "বঙ্গ", sentence: "বঙ্গবন্ধু আমাদের জাতির পিতা।", marks: 3 }
    ]
  },

  "class-4-english": {
    id: "c4-e",
    classId: "class-4",
    subject: "English",
    mcq: [
      { id: "c4e-m1", chapterId: "c4-e-u1", question: "How old is Mahi in Unit 1?", options: ["8 years old", "9 years old", "10 years old", "11 years old"], answer: "9 years old", marks: 1 },
      { id: "c4e-m2", chapterId: "c4-e-u2", question: "What time does Mita get up in the morning?", options: ["At 5:00 AM", "At 6:00 AM", "At 7:00 AM", "At 8:00 AM"], answer: "At 6:00 AM", marks: 1 },
      { id: "c4e-m3", chapterId: "c4-e-u3", question: "What is Sagar's father's profession?", options: ["A doctor", "A lawyer", "A teacher", "A banker"], answer: "A lawyer", marks: 1 },
      { id: "c4e-m4", chapterId: "c4-e-u7", question: "What does the red traffic light tell drivers to do?", options: ["Go fast", "Wait", "Stop", "Turn back"], answer: "Stop", marks: 1 },
      { id: "c4e-m5", chapterId: "c4-e-u8", question: "What is Raju's present occupation?", options: ["A doctor", "A full-time firefighter", "A driver", "A pilot"], answer: "A full-time firefighter", marks: 1 }
    ],
    fillInTheBlanks: [
      { id: "c4e-f1", chapterId: "c4-e-u1", sentence: "Mahi is ____ years old and reads in Class 4.", answer: "nine / 9", marks: 1 },
      { id: "c4e-f2", chapterId: "c4-e-u2", sentence: "Mita gets up from bed at ____ o'clock in the morning.", answer: "six / 6", marks: 1 },
      { id: "c4e-f3", chapterId: "c4-e-u3", sentence: "Sagar's father is a ____ and his mother is a housewife.", answer: "lawyer", marks: 1 },
      { id: "c4e-f4", chapterId: "c4-e-u7", sentence: "A traffic light has three colors: red, yellow, and ____.", answer: "green", marks: 1 },
      { id: "c4e-f5", chapterId: "c4-e-u8", sentence: "Raju put out fires as a ____ without getting paid.", answer: "volunteer", marks: 1 }
    ],
    trueFalse: [
      { id: "c4e-tf1", chapterId: "c4-e-u1", statement: "Mahi reads in Class 4 at a primary school.", isTrue: true, answer: "True", marks: 1 },
      { id: "c4e-tf2", chapterId: "c4-e-u2", statement: "Mita walks to school because it is close to her house.", isTrue: true, answer: "True", marks: 1 },
      { id: "c4e-tf3", chapterId: "c4-e-u3", statement: "Sagar's father is a doctor in a government hospital.", isTrue: false, answer: "False (His father is a lawyer)", marks: 1 },
      { id: "c4e-tf4", chapterId: "c4-e-u7", statement: "Green traffic light gives vehicles permission to go.", isTrue: true, answer: "True", marks: 1 },
      { id: "c4e-tf5", chapterId: "c4-e-u8", statement: "Raju visits schools to educate students about fire prevention.", isTrue: true, answer: "True", marks: 1 }
    ],
    matching: {
      id: "c4e-mat1",
      chapterId: "c4-e-u7",
      left: ["Red light", "Yellow light", "Green light", "Zebra crossing"],
      right: ["Tells vehicles to stop immediately", "Tells drivers to wait and get ready", "Tells vehicles they can go", "Safe pathway for crossing the road"],
      marks: 5
    },
    shortQuestions: [
      { id: "c4e-s1", chapterId: "c4-e-u1", question: "Who is Mahi and which class does he read in?", answer: "Mahi is a nine-year-old student who reads in Class 4.", marks: 2 },
      { id: "c4e-s2", chapterId: "c4-e-u2", question: "When does Mita get up and what does she do first?", answer: "Mita gets up at 6:00 AM, washes her face, and brushes her teeth.", marks: 2 },
      { id: "c4e-s3", chapterId: "c4-e-u3", question: "How many members are there in Sagar's family? Name them.", answer: "There are six members: Sagar, his parents, little sister Keya, and his grandparents.", marks: 2 },
      { id: "c4e-s4", chapterId: "c4-e-u7", question: "What do the three colors of a traffic light indicate?", answer: "Red means stop, yellow means wait and get ready, and green means go.", marks: 2 },
      { id: "c4e-s5", chapterId: "c4-e-u8", question: "What was Raju's role as a volunteer firefighter?", answer: "He put out dangerous fires bravely without taking any money or salary.", marks: 2 }
    ],
    broadQuestions: [
      { id: "c4e-b1", chapterId: "c4-e-u2", question: "Write a short paragraph of 5-7 sentences about 'Mita's Daily Routine'.", answer: "1. Mita is a diligent student who reads in Class 4. 2. She gets up early at 6:00 AM and washes her face. 3. She has her breakfast at 7:00 AM and brushes her teeth. 4. She walks to school with a cheerful heart at 8:30 AM. 5. Her classes begin at 9:00 AM and end in the afternoon. 6. At 5:00 PM, she visits her beloved grandmother. 7. She returns home, studies carefully, and goes to bed by 10:00 PM.", marks: 5 },
      { id: "c4e-b2", chapterId: "c4-e-u3", question: "Write 5-7 sentences describing 'Sagar and His Family'.", answer: "1. Sagar is a nine-year-old student reading in Class 4. 2. There are six members in his loving family. 3. His father is an honest lawyer and his mother is a dedicated homemaker. 4. His little sister Keya is three years old and very playful. 5. His grandfather was a respected school teacher who helps Sagar with his studies. 6. His grandmother grows fresh vegetables and makes delicious traditional pithas. 7. Sagar feels proud and blessed to live in such a happy family.", marks: 5 },
      { id: "c4e-b3", chapterId: "c4-e-u8", question: "Write a short composition of 5-7 sentences about 'Raju, The Brave Firefighter'.", answer: "1. Raju is a dedicated full-time firefighter in Bangladesh. 2. When he was in Class 5, he saw a fire in his school building. 3. The courage of the firefighters inspired him deeply to join the service. 4. After finishing his studies, he served as a volunteer firefighter without salary. 5. Now he works as a full-time professional firefighter protecting people's lives. 6. In his leisure time, he visits schools to educate students about fire prevention. 7. Raju's bravery and selfless devotion make him a role model for everyone.", marks: 5 },
      { id: "c4e-b4", chapterId: "c4-e-u11", question: "Write 5-7 sentences about 'Reshma: The Garments Worker'.", answer: "1. Reshma is an eighteen-year-old hardworking girl from Kurigram. 2. Her family lost their home and farmland due to severe river erosion by the Jamuna. 3. They moved to Dhaka in search of livelihood and settled in Mirpur. 4. Reshma works in a garment factory stitching quality garments. 5. She works long hours with patience and dignity. 6. She sends part of her earnings to educate her younger brother Babul. 7. Reshma represents the courage and resilience of working women in Bangladesh.", marks: 5 }
    ]
  },

  "class-4-math": {
    id: "c4-m",
    classId: "class-4",
    subject: "গণিত",
    mcq: [
      { id: "c4m-m1", question: "পাঁচ অঙ্কের ক্ষুদ্রতম সংখ্যা কোনটি?", options: ["১০০০১", "১০০০০", "৯৯৯৯৯", "১০১১১"], answer: "১০০০০", marks: 2 },
      { id: "c4m-m2", question: "১২ ও ১৮ এর গরিষ্ঠ সাধারণ গুণনীয়ক (গ.সা.গু) কত?", options: ["২", "৩", "৬", "৩৬"], answer: "৬", marks: 2 },
      { id: "c4m-m3", question: "সমকোণের মান কত ডিগ্রি?", options: ["৪৫°", "৬০°", "৯০°", "১৮০°"], answer: "৯০°", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c4m-f1", sentence: "১ কিলোমিটার = ____ মিটার।", answer: "১০০০", marks: 2 },
      { id: "c4m-f2", sentence: "ত্রিভুজের তিন কোণের সমষ্টি ____ ডিগ্রি।", answer: "১৮০", marks: 2 },
      { id: "c4m-f3", sentence: "যেকোনো সংখ্যাকে সেই সংখ্যা দ্বারা ভাগ করলে ভাগফল হয় ____।", answer: "১", marks: 2 }
    ],
    matching: {
      left: ["সমকোণ", "সরলকোণ", "সূক্ষ্মকোণ", "স্থূলকোণ"],
      right: ["১৮০ ডিগ্রি", "৯০ ডিগ্রি", "৯০ ডিগ্রির বেশি", "৯০ ডিগ্রির কম"],
      marks: 4
    },
    shortQuestions: [
      { id: "c4m-s1", question: "গ.সা.গু এবং ল.সা.গু এর পূর্ণরূপ কী?", answer: "গ.সা.গু = গরিষ্ঠ সাধারণ গুণনীয়ক। ল.সা.গু = লঘিষ্ঠ সাধারণ গুণিতক।", marks: 3 },
      { id: "c4m-s2", question: "৩/৭ এবং ৫/৭ এর মধ্যে কোনটি বড় এবং কেন?", answer: "৫/৭ বড়; কারণ হর একই হলে যে ভগ্নাংশের লব বড়, সেই ভগ্নাংশটি বড় হয়।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c4m-b1", question: "একটি ফলের বাগানে ১২ সারি আম গাছ আছে। প্রতি সারিতে ২৫টি করে গাছ থাকলে বাগানে মোট কতটি আম গাছ আছে? যদি প্রতিটি গাছ থেকে গড়ে ৫০টি আম পাড়া হয়, তবে মোট কতটি আম পাওয়া যাবে?", answer: "মোট আম গাছ = ১২ × ২৫ = ৩০০টি। মোট আম = ৩০০ × ৫০ = ১৫,০০০টি আম।", marks: 5 }
    ]
  },

  "class-4-science": {
    id: "c4-s",
    classId: "class-4",
    subject: "প্রাথমিক বিজ্ঞান",
    mcq: [
      { id: "c4s-m1", question: "উদ্ভিদ নিজের খাদ্য তৈরির জন্য বায়ু থেকে সরাসরি কোন গ্যাস গ্রহণ করে?", options: ["অক্সিজেন", "কার্বন ডাই-অক্সাইড", "নাইট্রোজেন", "মিথেন"], answer: "কার্বন ডাই-অক্সাইড", marks: 2 },
      { id: "c4s-m2", question: "কোন ভিটামিনের অভাবে রাতকানা রোগ হয়?", options: ["ভিটামিন এ", "ভিটামিন বি", "ভিটামিন সি", "ভিটামিন ডি"], answer: "ভিটামিন এ", marks: 2 },
      { id: "c4s-m3", question: "শব্দদূষণের ফলে মানুষের কোন ইন্দ্রিয়ের মারাত্মক ক্ষতি হয়?", options: ["চোখ", "কান", "নাক", "ত্বক"], answer: "কান", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c4s-f1", sentence: "ভিটামিন 'ডি'-এর একটি প্রধান প্রাকৃতিক উৎস হলো ____।", answer: "সূর্যালোক", marks: 2 },
      { id: "c4s-f2", sentence: "আলো এক প্রকার ____।", answer: "শক্তি", marks: 2 },
      { id: "c4s-f3", sentence: "পানি জমে বরফে পরিণত হলে তা পদার্থের ____ অবস্থা।", answer: "কঠিন", marks: 2 }
    ],
    matching: {
      left: ["ভিটামিন এ", "ভিটামিন সি", "ভিটামিন ডি", "লৌহ বা আয়রন"],
      right: ["দাঁতের মাড়ি সুস্থ রাখে", "রাতকানা রোগ প্রতিরোধ করে", "রক্তস্বল্পতা দূর করে", "হাড় ও দাঁত মজবুত করে"],
      marks: 4
    },
    shortQuestions: [
      { id: "c4s-s1", question: "উদ্ভিদের পুষ্টি উপাদানের প্রধান দুটি উৎস কী কী?", answer: "১. মাটি থেকে প্রাপ্ত পানি ও খনিজ লবণ এবং ২. বাতাস থেকে প্রাপ্ত কার্বন ডাই-অক্সাইড ও সূর্যের আলো।", marks: 3 },
      { id: "c4s-s2", question: "বায়ুদূষণ রোধে ২টি কার্যকর পদক্ষেপ লেখো।", answer: "১. বেশি করে গাছ লাগানো। ২. কালো ধোঁয়া সৃষ্টিকারী যানবাহন ও কলকারখানায় ফিল্টার ব্যবহার করা।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c4s-b1", question: "পদার্থ কাকে বলে? পদার্থের তিনটি অবস্থার নাম লিখে এদের কণার বৈশিষ্ট্য ও গঠন ব্যাখ্যা করো।", answer: "যার নির্দিষ্ট ভর আছে এবং স্থান দখল করে তাকে পদার্থ বলে। তিনটি অবস্থা: কঠিন (কণাগুলো খুব ঘন ও সুশৃঙ্খল), তরল (কণাগুলোর দূরত্ব কিছুটা বেশি ও সহজে প্রবাহিত হয়), এবং বায়বীয় (কণাগুলো পরস্পর অনেক দূরে ও মুক্তভাবে ছোটাছুটি করে)।", marks: 5 }
    ]
  },

  "class-4-bgs": {
    id: "c4-bgs",
    classId: "class-4",
    subject: "বাংলাদেশ ও বিশ্বপরিচয়",
    mcq: [
      { id: "c4bgs-m1", question: "১৯৭১ সালের মুক্তিযুদ্ধে বাংলাদেশের সর্বাধিনায়ক কে ছিলেন?", options: ["বঙ্গবন্ধু শেখ মুজিবুর রহমান", "জেনারেল এম এ জি ওসমানী", "তাজউদ্দীন আহমদ", "সৈয়দ নজরুল ইসলাম"], answer: "বঙ্গবন্ধু শেখ মুজিবুর রহমান", marks: 2 },
      { id: "c4bgs-m2", question: "বরেন্দ্রভূমি অঞ্চলের মাটির রং সাধারণত কেমন?", options: ["কালো", "লালচে ও ধুসর", "সাদা", "হলুদ"], answer: "লালচে ও ধুসর", marks: 2 },
      { id: "c4bgs-m3", question: "বাংলাদেশের জাতীয় সংসদের সদস্য সংখ্যা কত?", options: ["৩০০", "৩৩০", "৩৫০", "৪০০"], answer: "৩৫০", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c4bgs-f1", sentence: "১৯৭১ সালের ____ মার্চ মুক্তিযুদ্ধ শুরু হয়।", answer: "২৬", marks: 2 },
      { id: "c4bgs-f2", sentence: "বাংলাদেশের সর্বোচ্চ পর্বতশৃঙ্গ হলো ____।", answer: "তাজিংডং / বিজয়", marks: 2 },
      { id: "c4bgs-f3", sentence: "আইন মান্য করা প্রত্যেক নাগরিকের অন্যতম প্রধান ____।", answer: "দায়িত্ব বা কর্তব্য", marks: 2 }
    ],
    matching: {
      left: ["২৫ মার্চ", "২৬ মার্চ", "১৬ ডিসেম্বর", "২১ ফেব্রুয়ারি"],
      right: ["মহান স্বাধীনতা দিবস", "কালরাত", "আন্তর্জাতিক মাতৃভাষা দিবস", "মহান বিজয় দিবস"],
      marks: 4
    },
    shortQuestions: [
      { id: "c4bgs-s1", question: "মুক্তিযুদ্ধের সময় বাংলাদেশকে পরিচালনার সুবিধার্থে কয়টি সেক্টরে ভাগ করা হয়েছিল?", answer: "১১টি সেক্টরে ভাগ করা হয়েছিল।", marks: 3 },
      { id: "c4bgs-s2", question: "নাগরিকের তিনটি প্রধান মৌলিক অধিকারের নাম লেখো।", answer: "১. খাদ্য ও বস্ত্রের অধিকার, ২. শিক্ষার অধিকার, ৩. চিকিৎসার অধিকার।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c4bgs-b1", question: "প্রাকৃতিক দুর্যোগ কী? বন্যা ও ঘূর্ণিঝড়ের সময় জানমাল রক্ষার্থে আমাদের কী কী প্রস্তুতি নেওয়া উচিত ৫টি বাক্যে লেখো।", answer: "১. রেডিও-টিভির আবহাওয়ার পূর্বাভাস নিয়মিত শোনা। ২. শুকনা খাবার ও বিশুদ্ধ পানি সংরক্ষণ করা। ৩. জরুরি দলিলপত্র পলিথিনে মুড়ে নিরাপদ স্থানে রাখা। ৪. সংকেত পাওয়ার সাথে সাথে আশ্রয়কেন্দ্রে যাওয়া। ৫. দুর্যোগের পর সাবধানে চলাচল করা ও একে অপরকে সাহায্য করা।", marks: 5 }
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
      { id: "c5b-m1", question: "‘এই দেশ এই মানুষ’ প্রবন্ধে বাংলাদেশের কোন দিকটিকে সবচেয়ে বড় সার্থকতা ও সম্পদ বলা হয়েছে?", options: ["প্রাকৃতিক সম্পদ", "নানা জাতি ও ধর্মের মানুষের পারস্পরিক সম্প্রীতি", "পাহাড়-পর্বত", "নদীনালা"], answer: "নানা জাতি ও ধর্মের মানুষের পারস্পরিক সম্প্রীতি", marks: 2 },
      { id: "c5b-m2", question: "‘সংকল্প’ কবিতায় কিশোর কবি কোথায় ঘুরে বেড়াতে চেয়েছেন?", options: ["বাড়ির আঙিনায়", "বিশ্বজগতের সবখানে", "শহরের রাস্তায়", "বনের ভেতর"], answer: "বিশ্বজগতের সবখানে", marks: 2 },
      { id: "c5b-m3", question: "সুন্দরবনের সবচেয়ে বিখ্যাত ও অহংকারের প্রতীক প্রাণী কোনটি?", options: ["চিত্রা হরিণ", "রয়েল বেঙ্গল টাইগার", "কুমির", "বানর"], answer: "রয়েল বেঙ্গল টাইগার", marks: 2 }
    ],
    fillInTheBlanks: [
      { id: "c5b-f1", sentence: "সকল ধর্মের মানুষ এদেশে পরম ____ বসবাস করে।", answer: "সম্প্রীতিতে", marks: 2 },
      { id: "c5b-f2", sentence: "থাকব না কো ____ ঘরে, দেখব এবার জগৎটাকে।", answer: "বদ্ধ", marks: 2 },
      { id: "c5b-f3", sentence: "বাঘ দেখতে যেমন সুন্দর, তেমনি তার শিকারের চালচলনও ____।", answer: "ভয়ংকর", marks: 2 }
    ],
    matching: {
      left: ["সংকল্প", "বিশ্বজগৎ", "মিতব্যয়ী", "অতুলনীয়"],
      right: ["সারা পৃথিবী", "দৃঢ় প্রতিজ্ঞা", "যার কোনো তুলনা নেই", "যিনি অপচয় করেন না"],
      marks: 4
    },
    shortQuestions: [
      { id: "c5b-s1", question: "সুন্দরবনের রয়েল বেঙ্গল টাইগারকে বিলুপ্তির হাত থেকে বাঁচাতে আমাদের কী করণীয়?", answer: "অবৈধ শিকার বন্ধ করা, বনের পরিবেশ সংরক্ষণ করা এবং কঠোর বন্যপ্রাণী সংরক্ষণ আইন বাস্তবায়ন করা।", marks: 3 },
      { id: "c5b-s2", question: "‘সংকল্প’ কবিতায় কবি মনের কী কী ইচ্ছা প্রকাশ করেছেন?", answer: "কবি জগতের সকল রহস্য উদঘাটন করতে চান, দুঃসাহসী অভিযাত্রীদের মতো পাতাল ও মহাশূন্যে ঘুরে বেড়াতে চান।", marks: 3 }
    ],
    broadQuestions: [
      { id: "c5b-b1", question: "‘এই দেশ এই মানুষ’ পাঠের আলোকে দেশকে কেন মায়ের সাথে তুলনা করা হয়েছে এবং দেশের প্রতি আমাদের কর্তব্য কী?", answer: "মা যেমন স্নেহ, ভালোবাসা ও মমতা দিয়ে আমাদের আগলে রাখেন, তেমনি এই দেশ তার আলো, বাতাস, পানি ও খাদ্য দিয়ে আমাদের জীবন বাঁচিয়ে রেখেছে। তাই দেশকে মায়ের মতো ভালোবাসতে হবে এবং সততার সাথে দেশের সেবায় কাজ করতে হবে।", marks: 5 }
    ],
    yuktaborno: [
      { id: "c5b-y1", cluster: "ত্র", breakdown: "ত + র-ফলা", word: "ছাত্র", sentence: "ছাত্ররা নিয়মিত পড়াশোনা করে।", marks: 3 },
      { id: "c5b-y2", cluster: "ম্প", breakdown: "ম + প", word: "সম্পদ", sentence: "সততা জীবনের অমূল্য সম্পদ।", marks: 3 }
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
