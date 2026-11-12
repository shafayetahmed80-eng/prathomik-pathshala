/**
 * জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)
 * প্রাথমিক স্তরের মূল্যায়ন নির্দেশিকা ২০২৬ (১ম থেকে ৫ম শ্রেণি)
 * সরকারি প্রশ্ন কাঠামো ও মানবণ্টন ব্লুপ্রিন্ট
 */

export interface NctbQuestionSectionSpec {
  itemNo: number | string;
  name: string;
  totalQuestions?: number;
  toAnswer?: number;
  marksPerQuestion: number;
  totalMarks: number;
  cognitiveDomain?: string; // জ্ঞান, অনুধাবন, প্রয়োগ, উচ্চতর দক্ষতা
  instructions?: string;
  type: "mcq" | "fillInTheBlanks" | "trueFalse" | "matching" | "shortQuestions" | "broadQuestions" | "yuktaborno" | "wordMeaning" | "special";
}

export interface NctbExamBlueprint {
  classId: "pre-primary" | "class-1" | "class-2" | "class-3" | "class-4" | "class-5";
  subjectKey: string;
  subjectName: string;
  examType: "summative" | "formative_class_test";
  examName: string;
  totalMarks: number;
  duration: string;
  recommendedMode: "exam" | "worksheet";
  notes?: string;
  sections: NctbQuestionSectionSpec[];
}

export const NCTB_2026_BLUEPRINTS: Record<string, NctbExamBlueprint> = {
  // ==========================================
  // 🧸 প্রাক-প্রাথমিক (পূর্ণমান: ৫০, সময়: ১ ঘণ্টা, ওয়ার্কশিট মোড)
  // ==========================================
  "pre-primary-english": {
    classId: "pre-primary",
    subjectKey: "english",
    subjectName: "English",
    examType: "summative",
    examName: "প্রাক-প্রাথমিক মূল্যায়ন ২০২৬ (৪+ ও ৫+ সমন্বিত)",
    totalMarks: 50,
    duration: "১ ঘণ্টা",
    recommendedMode: "worksheet",
    notes: "প্রাক-প্রাথমিক স্তরে সম্পূর্ণ ওয়ার্কশিট পদ্ধতিতে মূল্যায়ন অনুষ্ঠিত হবে। ৪+ ও ৫+ উভয় বয়সভিত্তিক দক্ষতা সমন্বিত করে প্রশ্নপত্রেই উত্তর লেখার ব্যবস্থা রাখা হয়েছে।",
    sections: [
      { itemNo: 1, name: "Matching Capital & Small Letters / Pictures (৪+ ও ৫+ স্তর)", marksPerQuestion: 2, totalMarks: 10, type: "matching", instructions: "Match Column A with Column B by drawing lines (2×5=10)" },
      { itemNo: 2, name: "Fill in the missing letters in alphabet (৫+ স্তর)", marksPerQuestion: 2, totalMarks: 10, type: "fillInTheBlanks", instructions: "Write the missing letters in the blank spaces (2×5=10)" },
      { itemNo: 3, name: "Identify first letter of pictures / Multiple choice (৪+ স্তর)", marksPerQuestion: 1, totalMarks: 5, type: "mcq", instructions: "Look at the picture and tick (✓) the correct first letter (1×5=5)" },
      { itemNo: 4, name: "Counting objects and writing numbers 1 to 10 (৪+ ও ৫+ স্তর)", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "Count the objects and write the number in the box (1×5=5)" },
      { itemNo: 5, name: "Writing Bengali meaning of simple words (৪+ ও ৫+ স্তর)", marksPerQuestion: 1, totalMarks: 5, type: "wordMeaning", instructions: "Write or say the Bengali meaning of the words (1×5=5)" },
      { itemNo: 6, name: "Identify shapes, colors & action responses (৪+ স্তর)", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "Identify colors, shapes or respond to simple actions (1×5=5)" },
      { itemNo: 7, name: "Recite or complete nursery rhymes (৪+ ও ৫+ স্তর)", marksPerQuestion: 5, totalMarks: 5, type: "broadQuestions", instructions: "Recite or complete the nursery rhyme with actions (5 marks)" },
      { itemNo: 8, name: "Tracing, drawing & coloring shapes (৪+ স্তর)", marksPerQuestion: 5, totalMarks: 5, type: "broadQuestions", instructions: "Join the dots to draw and color the picture (5 marks)" }
    ]
  },

  // ==========================================
  // ১ম শ্রেণি (পূর্ণমান: ৫০, সময়: ১ ঘণ্টা, ওয়ার্কশিট মোড)
  // ==========================================
    "pre-primary-bangla": {
    "classId": "pre-primary",
    "subjectKey": "bangla",
    "subjectName": "বাংলা",
    "examType": "summative",
    "examName": "প্রাক-প্রাথমিক মূল্যায়ন ২০২৬ (বাংলা ও বর্ণমালা)",
    "totalMarks": 50,
    "duration": "১ ঘণ্টা",
    "recommendedMode": "worksheet",
    "notes": "প্রাক-প্রাথমিক স্তরে সম্পুর্ণ কার্যপত্র (Worksheet) পদ্ধতিতে মূল্যায়ন হবে। ৪+ ও ৫+ উভয় স্তরের বর্ণ চেনা, ছবি মিল, গণনা ও আঁকাআঁকি সমন্বিত করা হয়েছে।",
    "sections": [
        {
            "itemNo": 1,
            "name": "ছবির সাথে প্রথম বর্ণ দাগ টেনে মিলকরণ (Matching)",
            "marksPerQuestion": 2,
            "totalMarks": 10,
            "type": "matching",
            "instructions": "বামপাশের ছবির সাথে ডানপাশের প্রথম বর্ণ দাগ টেনে মেলাও (২×৫=১০)"
        },
        {
            "itemNo": 2,
            "name": "স্বরবর্ণ ও ব্যঞ্জনবর্ণের ফাঁকা ঘর পূরণ (Fill in Blanks)",
            "marksPerQuestion": 2,
            "totalMarks": 10,
            "type": "fillInTheBlanks",
            "instructions": "পরের বা আগের বর্ণ বসিয়ে খালি ঘর পূরণ করো (২×৫=১০)"
        },
        {
            "itemNo": 3,
            "name": "ছবি দেখে সঠিক বর্ণে গোল দাগ / টিক চিহ্ন (MCQ)",
            "marksPerQuestion": 1,
            "totalMarks": 5,
            "type": "mcq",
            "instructions": "ছবি দেখে নামের প্রথম বর্ণটিতে গোল দাগ দাও (১×৫=৫)"
        },
        {
            "itemNo": 4,
            "name": "ছবি দেখে বস্তুর নাম বলা বা লেখা (Word Meaning)",
            "marksPerQuestion": 1,
            "totalMarks": 5,
            "type": "wordMeaning",
            "instructions": "প্রদত্ত ছবি বা শব্দের সঠিক অর্থ লেখো (১×৫=৫)"
        },
        {
            "itemNo": 5,
            "name": "বস্তু গণনা করে সংখ্যা লেখা (১-১০) (Short Questions)",
            "marksPerQuestion": 2,
            "totalMarks": 10,
            "type": "shortQuestions",
            "instructions": "ছবি গণনা করে পাশের বাক্সে সঠিক সংখ্যাটি লেখো (২×৫=১০)"
        },
        {
            "itemNo": 6,
            "name": "বিন্দু মিলিয়ে বর্ণ ও চিত্র অঙ্কন (Broad / Drawing)",
            "marksPerQuestion": 5,
            "totalMarks": 5,
            "type": "broadQuestions",
            "instructions": "পেন্সিল দিয়ে ডট মিলিয়ে বর্ণ ও ফল/ফুলের ছবি আঁকো (৫ নম্বর)"
        },
        {
            "itemNo": 7,
            "name": "শিশুতোষ ছড়া আবৃত্তি ও অভিনয় (Poem Completion)",
            "marksPerQuestion": 5,
            "totalMarks": 5,
            "type": "broadQuestions",
            "instructions": "পাঠ্যবইয়ের যেকোনো একটি ছড়া অভিনয়সহ মুখস্থ আবৃত্তি করো (৫ নম্বর)"
        }
    ]
},

  "class-1-bangla": {
    classId: "class-1",
    subjectKey: "bangla",
    subjectName: "বাংলা",
    examType: "summative",
    examName: "১ম/২য়/৩য় প্রান্তিক সামষ্টিক মূল্যায়ন ২০২৬",
    totalMarks: 50,
    duration: "১ ঘণ্টা",
    recommendedMode: "worksheet",
    notes: "১ম শ্রেণিতে প্রশ্নপত্রেই উত্তর লেখার ব্যবস্থা করতে হবে।",
    sections: [
      { itemNo: 1, name: "ধারাবাহিকভাবে স্বরবর্ণ লেখা", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "খালি ঘরে ধারাবাহিকভাবে স্বরবর্ণ লেখো (১×৫=৫)" },
      { itemNo: 2, name: "ধারাবাহিকভাবে ব্যঞ্জনবর্ণ লেখা", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "খালি ঘরে ধারাবাহিকভাবে ব্যঞ্জনবর্ণ লেখো (১×৫=৫)" },
      { itemNo: 3, name: "বর্ণ ও কারচিহ্ন মিলকরণ", marksPerQuestion: 2, totalMarks: 10, type: "matching", instructions: "বামপাশের বর্ণের সাথে ডানপাশের কারচিহ্ন দাগ টেনে মেলাও (২×৫=১০)" },
      { itemNo: 4, name: "পরের ও আগের বর্ণ লেখা", marksPerQuestion: 2, totalMarks: 10, type: "fillInTheBlanks", instructions: "আগের ও পরের বর্ণটি খালি ঘরে বসাও (২×৫=১০)" },
      { itemNo: 5, name: "ফাঁকা ঘরে কারচিহ্ন বসিয়ে শব্দ তৈরি", marksPerQuestion: 2, totalMarks: 10, type: "fillInTheBlanks", instructions: "সঠিক কারচিহ্ন বসিয়ে অর্থপূর্ণ শব্দ তৈরি করো (২×৫=১০)" },
      { itemNo: 6, name: "এলোমেলো বর্ণ সাজিয়ে শব্দ লেখা", marksPerQuestion: 2, totalMarks: 10, type: "wordMeaning", instructions: "বর্ণগুলো সঠিক ক্রমে সাজিয়ে অর্থপূর্ণ শব্দ লেখো (২×৫=১০)" }
    ]
  },

  "class-1-english": {
    classId: "class-1",
    subjectKey: "english",
    subjectName: "English",
    examType: "summative",
    examName: "1st/2nd/3rd Terminal Summative Assessment 2026",
    totalMarks: 50,
    duration: "1 hour",
    recommendedMode: "worksheet",
    notes: "১ম শ্রেণির ইংরেজি মূল্যায়ন হবে ওয়ার্কশিট পদ্ধতিতে। শিক্ষার্থীরা প্রশ্নপত্রের নির্ধারিত স্থানেই উত্তর লিখবে।",
    sections: [
      { itemNo: 1, name: "Matching capital and small letters or words", marksPerQuestion: 2, totalMarks: 10, type: "matching", instructions: "Match the items of Column A with Column B (2×5=10)" },
      { itemNo: 2, name: "Writing missing letters in alphabet or words", marksPerQuestion: 2, totalMarks: 10, type: "fillInTheBlanks", instructions: "Fill in the missing letters to complete the words (2×5=10)" },
      { itemNo: 3, name: "Writing word meanings in Bengali", marksPerQuestion: 2, totalMarks: 10, type: "wordMeaning", instructions: "Write the Bengali meanings of the following words (2×5=10)" },
      { itemNo: 4, name: "Counting and writing numbers in figures and words", marksPerQuestion: 2, totalMarks: 10, type: "shortQuestions", instructions: "Count the objects and write numbers in figures and words (2×5=10)" },
      { itemNo: 5, name: "Answering short personal questions & neat handwriting", marksPerQuestion: 2, totalMarks: 10, type: "shortQuestions", instructions: "Answer the following short questions in the spaces provided (2×5=10)" }
    ]
  },

  "class-1-math": {
    classId: "class-1",
    subjectKey: "math",
    subjectName: "গণিত",
    examType: "summative",
    examName: "১ম/২য়/৩য় প্রান্তিক সামষ্টিক মূল্যায়ন ২০২৬",
    totalMarks: 50,
    duration: "১ ঘণ্টা",
    recommendedMode: "worksheet",
    notes: "১ম শ্রেণির গণিত প্রশ্নপত্রে ছবি ও সংখ্যার মিলকরণ থাকবে।",
    sections: [
      { itemNo: 1, name: "ছবি দেখে তুলনা করা (কম/বেশি)", marksPerQuestion: 1, totalMarks: 5, type: "mcq", instructions: "ছবি দেখে সঠিক উত্তরে টিক চিহ্ন দাও (১×৫=৫)" },
      { itemNo: 2, name: "ছবি গণনা করে সংখ্যা শনাক্তকরণ", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "ছবি গুনে পাশে সঠিক সংখ্যাটি লেখো (১×৫=৫)" },
      { itemNo: 3, name: "দাগ টেনে মিল করা", marksPerQuestion: 1, totalMarks: 5, type: "matching", instructions: "বামের বস্তুর সংখ্যার সাথে ডানের সংখ্যা দাগ টেনে মেলাও (১×৫=৫)" },
      { itemNo: 4, name: "খালি ঘর পূরণ করা", marksPerQuestion: 1, totalMarks: 5, type: "fillInTheBlanks", instructions: "পরবর্তী সংখ্যা বসিয়ে খালি ঘর পূরণ করো (১×৫=৫)" },
      { itemNo: 5, name: "ছোট থেকে বড় ক্রমে সাজানো", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "সংখ্যাগুলোকে ছোট থেকে বড় ক্রমে সাজিয়ে লেখো (১×৫=৫)" },
      { itemNo: 6, name: "পাশাপাশি যোগ করা (অনূর্ধ্ব ১০/৪০)", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "যোগফল নির্ণয় করো (১×৫=৫)" },
      { itemNo: 7, name: "পাশাপাশি বিয়োগ করা (অনূর্ধ্ব ১০/৪০)", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "বিয়োগফল নির্ণয় করো (১×৫=৫)" },
      { itemNo: 8, name: "চিত্র দেখে আকৃতির নাম লেখা বা আঁকা", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "জ্যামিতিক আকৃতির নাম লেখো (গোল, তিনকোনা, চারকোনা) (১×৫=৫)" },
      { itemNo: 9, name: "যোগ সম্পর্কিত বাস্তব সমস্যা", marksPerQuestion: 2.5, totalMarks: 5, type: "broadQuestions", instructions: "কথার অংক পড়ে যোগ করে সমাধান করো (৫ নম্বর)" },
      { itemNo: 10, name: "বিয়োগ সম্পর্কিত বাস্তব সমস্যা", marksPerQuestion: 2.5, totalMarks: 5, type: "broadQuestions", instructions: "কথার অংক পড়ে বিয়োগ করে সমাধান করো (৫ নম্বর)" }
    ]
  },

  // ==========================================
  // ২য় শ্রেণি (পূর্ণমান: ৫০, সময়: ১ ঘণ্টা)
  // ==========================================
  "class-2-bangla": {
    classId: "class-2",
    subjectKey: "bangla",
    subjectName: "বাংলা",
    examType: "summative",
    examName: "১ম/২য়/৩য় প্রান্তিক সামষ্টিক মূল্যায়ন ২০২৬",
    totalMarks: 50,
    duration: "১ ঘণ্টা",
    recommendedMode: "worksheet",
    sections: [
      { itemNo: 1, name: "এলোমেলো শব্দ সাজিয়ে বাক্য লেখা", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "এলোমেলো শব্দগুলো সাজিয়ে অর্থপূর্ণ বাক্য তৈরি করো (১×৫=৫)" },
      { itemNo: 2, name: "যুক্তব্যঞ্জন ভেঙে লেখা ও শব্দ তৈরি", marksPerQuestion: 2, totalMarks: 10, type: "yuktaborno", instructions: "যুক্তবর্ণ ভেঙে দুটি করে শব্দ তৈরি করো (২×৫=১০)" },
      { itemNo: 3, name: "প্রশ্নের উত্তর লেখা", marksPerQuestion: 2, totalMarks: 10, type: "shortQuestions", instructions: "পাঠ্যবইয়ের আলোকে নিচের প্রশ্নগুলোর উত্তর লেখো (২×৫=১০)" },
      { itemNo: 4, name: "সঠিক উত্তর বাছাই / খালি ঘর পূরণ", marksPerQuestion: 1, totalMarks: 5, type: "fillInTheBlanks", instructions: "বন্ধনী থেকে সঠিক শব্দ বাছাই করে খালি ঘরে বসাও (১×৫=৫)" },
      { itemNo: 5, name: "ছড়া বা কবিতার চরণ লেখা", marksPerQuestion: 10, totalMarks: 10, type: "broadQuestions", instructions: "পাঠ্যবইয়ের যেকোনো একটি ছড়ার প্রথম ৪টি চরণ মুখস্থ লেখো (১০ নম্বর)" },
      { itemNo: 6, name: "বিষয় সম্পর্কে ৫টি বাক্য লেখা", marksPerQuestion: 5, totalMarks: 5, type: "broadQuestions", instructions: "প্রদত্ত বিষয় সম্পর্কে ৫টি বাক্য লেখো (৫ নম্বর)" },
      { itemNo: 7, name: "বিরামচিহ্ন ব্যবহার করে বাক্য লেখা", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "উপযুক্ত বিরামচিহ্ন (দাঁড়ি, কমা, প্রশ্নচিহ্ন) বসাও (১×৫=৫)" }
    ]
  },

  "class-2-english": {
    classId: "class-2",
    subjectKey: "english",
    subjectName: "English",
    examType: "summative",
    examName: "1st/2nd/3rd Terminal Summative Assessment 2026",
    totalMarks: 50,
    duration: "1 hour",
    recommendedMode: "worksheet",
    notes: "২য় শ্রেণির ইংরেজি মূল্যায়ন হবে ওয়ার্কশিট পদ্ধতিতে। শিক্ষার্থীরা প্রশ্নপত্রের নির্ধারিত স্থানেই উত্তর লিখবে।",
    sections: [
      { itemNo: 1, name: "Write the Bengali meanings of the words", marksPerQuestion: 2, totalMarks: 10, type: "wordMeaning", instructions: "Write the Bengali meanings of the following words (2×5=10)" },
      { itemNo: 2, name: "Fill in the blanks with suitable words / articles", marksPerQuestion: 2, totalMarks: 10, type: "fillInTheBlanks", instructions: "Fill in the blanks with suitable words from the text (2×5=10)" },
      { itemNo: 3, name: "Rearrange the jumbled letters to make words", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "Rearrange the letters to make meaningful words (1×5=5)" },
      { itemNo: 4, name: "Match Column A with Column B", marksPerQuestion: 1, totalMarks: 5, type: "matching", instructions: "Match the words in Column A with Column B (1×5=5)" },
      { itemNo: 5, name: "Answer the following short questions", marksPerQuestion: 2, totalMarks: 10, type: "shortQuestions", instructions: "Answer the following questions in the spaces provided (2×5=10)" },
      { itemNo: 6, name: "Write 4 lines of a rhyme or neat handwriting", marksPerQuestion: 10, totalMarks: 10, type: "broadQuestions", instructions: "Write 4 lines of the rhyme from memory or copy the sentence neatly (10 marks)" }
    ]
  },

  "class-2-math": {
    classId: "class-2",
    subjectKey: "math",
    subjectName: "গণিত",
    examType: "summative",
    examName: "১ম/২য়/৩য় প্রান্তিক সামষ্টিক মূল্যায়ন ২০২৬",
    totalMarks: 50,
    duration: "১ ঘণ্টা",
    recommendedMode: "worksheet",
    sections: [
      { itemNo: 1, name: "কথায় লেখা (১ থেকে ১০০)", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "সংখ্যাগুলো কথায় লেখো (১×৫=৫)" },
      { itemNo: 2, name: "অঙ্কে লেখা", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "কথায় লেখা সংখ্যাগুলোকে অঙ্কে লেখো (১×৫=৫)" },
      { itemNo: 3, name: "স্থানীয় মান নির্ণয় (শতক, দশক, একক)", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "নির্দিষ্ট অঙ্কের স্থানীয় মান লেখো (১×৫=৫)" },
      { itemNo: 4, name: "ছোট থেকে বড় ক্রমানুসারে সাজানো", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "সংখ্যাগুলোকে ছোট থেকে বড় ক্রমে সাজাও (১×৫=৫)" },
      { itemNo: 5, name: "জোড় ও বিজোড় সংখ্যা আলাদা করা", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "প্রদত্ত সংখ্যা থেকে জোড় ও বিজোড় সংখ্যা আলাদা করো (১×৫=৫)" },
      { itemNo: 6, name: "পরবর্তী ও পূর্ববর্তী সংখ্যা নির্ণয়", marksPerQuestion: 1, totalMarks: 5, type: "fillInTheBlanks", instructions: "পরবর্তী ও আগের সংখ্যাটি খালি ঘরে লেখো (১×৫=৫)" },
      { itemNo: 7, name: "ক্রমবাচক সংখ্যা লেখা", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "সংখ্যার ক্রমবাচক রূপ লেখো (১ম, ২য়, ৩য়...) (১×৫=৫)" },
      { itemNo: 8, name: "হাতে না রেখে ও হাতে রেখে যোগ-বিয়োগ", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "যোগ ও বিয়োগফল নির্ণয় করো (১×৫=৫)" },
      { itemNo: 9, name: "বাস্তব জীবনের যোগ-বিয়োগ সমস্যা", marksPerQuestion: 5, totalMarks: 5, type: "broadQuestions", instructions: "সমস্যাটি পড়ে গাণিতিক বাক্যে রূপান্তর করে সমাধান করো (৫ নম্বর)" },
      { itemNo: 10, name: "জ্যামিতিক আকৃতি শনাক্তকরণ ও অঙ্কন", marksPerQuestion: 5, totalMarks: 5, type: "shortQuestions", instructions: "চিত্র দেখে জ্যামিতিক আকৃতির নাম লেখো (গোল, তিনকোনা, চারকোনা) (৫ নম্বর)" }
    ]
  },

  // ==========================================
  // ৩য়, ৪র্থ ও ৫ম শ্রেণি (পূর্ণমান: ৭০, সময়: ২ ঘণ্টা ৩০ মিনিট)
  // ==========================================

  // বাংলা (৩য়-৫ম শ্রেণি: পূর্ণমান ৭০)
  "class-3-bangla": {
    classId: "class-3",
    subjectKey: "bangla",
    subjectName: "বাংলা",
    examType: "summative",
    examName: "১ম/২য়/৩য় প্রান্তিক সামষ্টিক মূল্যায়ন ২০২৬",
    totalMarks: 70,
    duration: "২ ঘণ্টা ৩০ মিনিট",
    recommendedMode: "exam",
    notes: "এনসিটিবি ২০২৬ অনুযায়ী ৩য় শ্রেণির বাংলা পরীক্ষার পূর্ণমান ৭০ নম্বর।",
    sections: [
      { itemNo: 1, name: "কবি ও কবিতার নামসহ কবিতা লিখন", marksPerQuestion: 5, totalMarks: 5, type: "broadQuestions", instructions: "পাঠ্যবইয়ের যেকোনো একটি কবিতার প্রথম ৬-৮ চরণ কবি ও কবিতার নামসহ লেখো (৫ নম্বর)" },
      { itemNo: 2, name: "সংক্ষিপ্ত উত্তর প্রশ্ন (৭টির মধ্যে ৫টি)", marksPerQuestion: 3, totalMarks: 15, toAnswer: 5, totalQuestions: 7, type: "shortQuestions", instructions: "যেকোনো ৫টি প্রশ্নের সংক্ষিপ্ত উত্তর দাও (৩×৫=১৫)" },
      { itemNo: 3, name: "রচনামূলক প্রশ্ন (৩টির মধ্যে ২টি)", marksPerQuestion: 5, totalMarks: 10, toAnswer: 2, totalQuestions: 3, type: "broadQuestions", instructions: "যেকোনো ২টি প্রশ্নের বিস্তারিত উত্তর লেখো (৫×২=১০)" },
      { itemNo: 4, name: "শূন্যস্থান পূরণ / শব্দ দিয়ে বাক্য তৈরি", marksPerQuestion: 1, totalMarks: 5, type: "fillInTheBlanks", instructions: "উপযুক্ত শব্দ বসিয়ে শূন্যস্থান পূরণ করো (১×৫=৫)" },
      { itemNo: 5, name: "যুক্তবর্ণ ভেঙে শব্দ ও বাক্য তৈরি", marksPerQuestion: 1, totalMarks: 5, toAnswer: 5, totalQuestions: 7, type: "yuktaborno", instructions: "যুক্তবর্ণ ভেঙে শব্দ ও একটি করে বাক্য তৈরি করো (১×৫=৫)" },
      { itemNo: 6, name: "শব্দার্থ লিখন (৭টির মধ্যে ৫টি)", marksPerQuestion: 1, totalMarks: 5, toAnswer: 5, totalQuestions: 7, type: "wordMeaning", instructions: "যেকোনো ৫টি শব্দের সহজ অর্থ লেখো (১×৫=৫)" },
      { itemNo: 7, name: "বিরামচিহ্নের ব্যবহার / এককথায় প্রকাশ", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "উপযুক্ত স্থানে বিরামচিহ্ন বসিয়ে অনুচ্ছেদটি পুনরায় লেখো (১×৫=৫)" },
      { itemNo: 8, name: "বিপরীত শব্দ / সমার্থক শব্দ", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "প্রদত্ত শব্দগুলোর বিপরীত শব্দ লেখো (১×৫=৫)" },
      { itemNo: 9, name: "ফরম পূরণ / আবেদনপত্র লিখন", marksPerQuestion: 5, totalMarks: 5, type: "broadQuestions", instructions: "বই নেওয়ার ফরম পূরণ করো অথবা ছুটির জন্য প্রধান শিক্ষকের নিকট আবেদনপত্র লেখো (৫ নম্বর)" },
      { itemNo: 10, name: "অনুচ্ছেদ বা রচনা লিখন (৩টির মধ্যে ১টি)", marksPerQuestion: 10, totalMarks: 10, type: "broadQuestions", instructions: "যেকোনো একটি বিষয়ে অনুচ্ছেদ/রচনা লেখো (১০ নম্বর)" }
    ]
  },

  // গণিত (৩য়-৫ম শ্রেণি: পূর্ণমান ৭০)
  "class-3-math": {
    classId: "class-3",
    subjectKey: "math",
    subjectName: "গণিত",
    examType: "summative",
    examName: "১ম/২য়/৩য় প্রান্তিক সামষ্টিক মূল্যায়ন ২০২৬",
    totalMarks: 70,
    duration: "২ ঘণ্টা ৩০ মিনিট",
    recommendedMode: "exam",
    notes: "এনসিটিবি ২০২৬ অনুযায়ী গণিতের লিখিত পরীক্ষার পূর্ণমান ৭০ নম্বর।",
    sections: [
      { itemNo: 1, name: "বহুনির্বাচনি প্রশ্ন (১০টি)", marksPerQuestion: 1, totalMarks: 10, type: "mcq", cognitiveDomain: "গাণিতিক ধারণা ৩টি, প্রক্রিয়াগত ৪টি, সমস্যা সমাধান ৩টি", instructions: "সঠিক উত্তরটি খাতায় লেখো (১০টি প্রশ্নই বাধ্যতামূলক) (১×১০=১০)" },
      { itemNo: 2, name: "শূন্যস্থান পূরণ (৫টি)", marksPerQuestion: 2, totalMarks: 10, type: "fillInTheBlanks", instructions: "সঠিক সংখ্যা বা শব্দ বসিয়ে খালি ঘর পূরণ করো (২×৫=১০)" },
      { itemNo: 3, name: "সংক্ষিপ্ত উত্তর প্রশ্ন (১০টি)", marksPerQuestion: 1, totalMarks: 10, type: "shortQuestions", cognitiveDomain: "গাণিতিক ধারণা ৩টি, প্রক্রিয়াগত ৪টি, সমস্যা সমাধান ৩টি", instructions: "সংক্ষেপে উত্তর লেখো (১০টি প্রশ্নই বাধ্যতামূলক) (১×১০=১০)" },
      { itemNo: 4, name: "চার প্রক্রিয়া সংক্রান্ত কাঠামোবদ্ধ সমস্যা (যোগ-বিয়োগ)", marksPerQuestion: 6, totalMarks: 6, type: "broadQuestions", instructions: "সমস্যাটি সমাধান করো (৬ নম্বর)" },
      { itemNo: 5, name: "গুণ ও ভাগ সংক্রান্ত বাস্তব সমস্যা", marksPerQuestion: 6, totalMarks: 6, type: "broadQuestions", instructions: "সমস্যাটি সমাধান করো (৬ নম্বর)" },
      { itemNo: 6, name: "ভগ্নাংশ ও পরিমাপ সংক্রান্ত সমস্যা", marksPerQuestion: 6, totalMarks: 6, type: "broadQuestions", instructions: "ভগ্নাংশ বা পরিমাপ সংক্রান্ত সমস্যা সমাধান করো (৬ নম্বর)" },
      { itemNo: 7, name: "বাংলাদেশি মুদ্রা ও নোট সংক্রান্ত সমস্যা", marksPerQuestion: 6, totalMarks: 6, type: "broadQuestions", instructions: "মুদ্রা ও টাকা-পয়সার সমস্যা সমাধান করো (৬ নম্বর)" },
      { itemNo: 8, name: "উপাত্ত সংগ্রহ ও বিন্যস্তকরণ", marksPerQuestion: 6, totalMarks: 6, type: "broadQuestions", instructions: "তালিকা দেখে উপাত্ত সাজাও ও প্রশ্নের উত্তর দাও (৬ নম্বর)" },
      { itemNo: 9, name: "জ্যামিতি (চিত্রাঙ্কন ও বৈশিষ্ট্য লিখন)", marksPerQuestion: 5, totalMarks: 10, type: "broadQuestions", instructions: "চিত্রসহ সংজ্ঞা ও ৩টি করে বৈশিষ্ট্য লেখো (কোণ, ত্রিভুজ, বৃত্ত) (৫×২=১০)" }
    ]
  },

  // প্রাথমিক বিজ্ঞান (৩য়, ৪র্থ, ৫ম শ্রেণি: পূর্ণমান ৭০)
  "class-3-science": {
    classId: "class-3",
    subjectKey: "science",
    subjectName: "প্রাথমিক বিজ্ঞান",
    examType: "summative",
    examName: "১ম/২য়/৩য় প্রান্তিক সামষ্টিক মূল্যায়ন ২০২৬",
    totalMarks: 70,
    duration: "২ ঘণ্টা ৩০ মিনিট",
    recommendedMode: "exam",
    notes: "এনসিটিবি ২০২৬ নির্দেশিকার পৃষ্ঠা ৪৭ অনুযায়ী বিজ্ঞানের ৭০ নম্বরের সুনির্দিষ্ট কাঠামো।",
    sections: [
      { itemNo: 1, name: "বহুনির্বাচনি প্রশ্ন (১০টি)", marksPerQuestion: 1, totalMarks: 10, type: "mcq", cognitiveDomain: "জ্ঞান ৪টি, অনুধাবন ৩টি, প্রয়োগ ২টি, উচ্চতর দক্ষতা ১টি", instructions: "সঠিক উত্তরটির পাশে টিক চিহ্ন দাও বা খাতায় লেখো (১×১০=১০)" },
      { itemNo: 2, name: "শূন্যস্থান পূরণ (৫টি)", marksPerQuestion: 1, totalMarks: 5, type: "fillInTheBlanks", cognitiveDomain: "জ্ঞান ৫টি", instructions: "উপযুক্ত শব্দ বসিয়ে শূন্যস্থান পূরণ করো (১×৫=৫)" },
      { itemNo: 3, name: "শুদ্ধ ও অশুদ্ধ নির্বাচন (৫টি)", marksPerQuestion: 1, totalMarks: 5, type: "trueFalse", cognitiveDomain: "জ্ঞান ৫টি", instructions: "বাক্যটি শুদ্ধ হলে 'শুদ্ধ' এবং ভুল হলে 'অশুদ্ধ' লেখো (১×৫=৫)" },
      { itemNo: 4, name: "মিলকরণ (৫টি বাক্য, ডানপাশে ২টি অতিরিক্ত বিকল্পসহ)", marksPerQuestion: 1, totalMarks: 5, type: "matching", cognitiveDomain: "অনুধাবন ৫টি", instructions: "বামপাশের বাক্যাংশের সাথে ডানপাশের বাক্যাংশ মেলাও (ডানপাশে ২টি অতিরিক্ত থাকবে) (১×৫=৫)" },
      { itemNo: 5, name: "সংক্ষিপ্ত উত্তর প্রশ্ন (৭টির মধ্যে ৫টি)", marksPerQuestion: 3, totalMarks: 15, toAnswer: 5, totalQuestions: 7, type: "shortQuestions", cognitiveDomain: "জ্ঞান ৩টি, অনুধাবন ২টি, প্রয়োগ ১টি, উচ্চতর দক্ষতা ১টি", instructions: "যেকোনো ৫টি প্রশ্নের সংক্ষিপ্ত উত্তর দাও (৩×৫=১৫)" },
      { itemNo: 6, name: "বর্ণনামূলক / কাঠামোবদ্ধ প্রশ্ন (৭টির মধ্যে ৫টি)", marksPerQuestion: 6, totalMarks: 30, toAnswer: 5, totalQuestions: 7, type: "broadQuestions", cognitiveDomain: "জ্ঞান ১টি, অনুধাবন ২টি, প্রয়োগ ২টি, উচ্চতর দক্ষতা ১টি (চিত্রাঙ্কনসহ)", instructions: "যেকোনো ৫টি প্রশ্নের বিস্তারিত উত্তর দাও (চিত্রসহ) (৬×৫=৩০)" }
    ]
  },

  // বাংলাদেশ ও বিশ্বপরিচয় (৩য়, ৪র্থ, ৫ম শ্রেণি: পূর্ণমান ৭০)
  "class-3-bgs": {
    classId: "class-3",
    subjectKey: "bgs",
    subjectName: "বাংলাদেশ ও বিশ্বপরিচয়",
    examType: "summative",
    examName: "১ম/২য়/৩য় প্রান্তিক সামষ্টিক মূল্যায়ন ২০২৬",
    totalMarks: 70,
    duration: "২ ঘণ্টা ৩০ মিনিট",
    recommendedMode: "exam",
    notes: "এনসিটিবি ২০২৬ নির্দেশিকার পৃষ্ঠা ৪৯ অনুযায়ী বিজিএসের ৭০ নম্বরের সুনির্দিষ্ট কাঠামো।",
    sections: [
      { itemNo: 1, name: "বহুনির্বাচনি প্রশ্ন (১০টি)", marksPerQuestion: 1, totalMarks: 10, type: "mcq", cognitiveDomain: "জ্ঞান ৪টি, দক্ষতা ৪টি, মূল্যবোধ ও দৃষ্টিভঙ্গি ২টি", instructions: "সঠিক উত্তরটি খাতায় লেখো (১×১০=১০)" },
      { itemNo: 2, name: "শূন্যস্থান পূরণ (৫টি)", marksPerQuestion: 1, totalMarks: 5, type: "fillInTheBlanks", cognitiveDomain: "জ্ঞান ২টি, দক্ষতা ২টি, মূল্যবোধ ১টি", instructions: "উপযুক্ত শব্দ বসিয়ে শূন্যস্থান পূরণ করো (১×৫=৫)" },
      { itemNo: 3, name: "বিকল্প নির্বাচন (শুদ্ধ/অশুদ্ধ) (৫টি)", marksPerQuestion: 1, totalMarks: 5, type: "trueFalse", cognitiveDomain: "জ্ঞান ২টি, দক্ষতা ২টি, মূল্যবোধ ১টি", instructions: "সত্য হলে শুদ্ধ এবং মিথ্যা হলে অশুদ্ধ লেখো (১×৫=৫)" },
      { itemNo: 4, name: "বাম ও ডান মিলকরণ (৫টি)", marksPerQuestion: 1, totalMarks: 5, type: "matching", cognitiveDomain: "জ্ঞান ২টি, দক্ষতা ২টি, মূল্যবোধ ১টি", instructions: "বামপাশের বাক্যাংশের সাথে ডানপাশের বাক্যাংশ মেলাও (১×৫=৫)" },
      { itemNo: 5, name: "অল্প কথায় উত্তর (৭টির মধ্যে ৫টি)", marksPerQuestion: 3, totalMarks: 15, toAnswer: 5, totalQuestions: 7, type: "shortQuestions", cognitiveDomain: "জ্ঞান ৩টি, দক্ষতা ৩টি, মূল্যবোধ ১টি", instructions: "যেকোনো ৫টি প্রশ্নের অল্প কথায় উত্তর দাও (৩×৫=১৫)" },
      { itemNo: 6, name: "বর্ণনামূলক প্রশ্ন (৭টির মধ্যে ৫টি)", marksPerQuestion: 6, totalMarks: 30, toAnswer: 5, totalQuestions: 7, type: "broadQuestions", cognitiveDomain: "জ্ঞান ৩টি, দক্ষতা ৩টি, মূল্যবোধ ১টি", instructions: "যেকোনো ৫টি প্রশ্নের বর্ণনামূলক উত্তর দাও (৬×৫=৩০)" }
    ]
  },

  // ধর্ম ও নৈতিক শিক্ষা (৩য়, ৪র্থ, ৫ম শ্রেণি: পূর্ণমান ৭০)
  "class-3-religion": {
    classId: "class-3",
    subjectKey: "religion",
    subjectName: "ধর্ম ও নৈতিক শিক্ষা",
    examType: "summative",
    examName: "১ম/২য়/৩য় প্রান্তিক সামষ্টিক মূল্যায়ন ২০২৬",
    totalMarks: 70,
    duration: "২ ঘণ্টা ৩০ মিনিট",
    recommendedMode: "exam",
    notes: "এনসিটিবি ২০২৬ নির্দেশিকার পৃষ্ঠা ৫১ অনুযায়ী ধর্মশিক্ষার ৭০ নম্বরের সুনির্দিষ্ট কাঠামো।",
    sections: [
      { itemNo: 1, name: "বহুনির্বাচনি প্রশ্ন (১০টি)", marksPerQuestion: 1, totalMarks: 10, type: "mcq", cognitiveDomain: "জ্ঞান ৪টি, দক্ষতা ৪টি, মূল্যবোধ ও দৃষ্টিভঙ্গি ২টি", instructions: "সঠিক উত্তরটি বেছে নিয়ে লেখো (১×১০=১০)" },
      { itemNo: 2, name: "শূন্যস্থান পূরণ (৫টি)", marksPerQuestion: 1, totalMarks: 5, type: "fillInTheBlanks", instructions: "সঠিক শব্দ দিয়ে শূন্যস্থান পূরণ করো (১×৫=৫)" },
      { itemNo: 3, name: "বিকল্প নির্বাচন (শুদ্ধ/অশুদ্ধ) (৫টি)", marksPerQuestion: 1, totalMarks: 5, type: "trueFalse", instructions: "শুদ্ধ অথবা অশুদ্ধ নির্ণয় করো (১×৫=৫)" },
      { itemNo: 4, name: "বাম ও ডান মিলকরণ (৫টি)", marksPerQuestion: 1, totalMarks: 5, type: "matching", instructions: "বামপাশের সাথে ডানপাশের বাক্য মিল করো (১×৫=৫)" },
      { itemNo: 5, name: "অল্প কথায় উত্তর (৭টির মধ্যে ৫টি)", marksPerQuestion: 3, totalMarks: 15, toAnswer: 5, totalQuestions: 7, type: "shortQuestions", instructions: "যেকোনো ৫টি প্রশ্নের অল্প কথায় উত্তর লেখো (৩×৫=১৫)" },
      { itemNo: 6, name: "বর্ণনামূলক প্রশ্ন (৭টির মধ্যে ৫টি)", marksPerQuestion: 6, totalMarks: 30, toAnswer: 5, totalQuestions: 7, type: "broadQuestions", instructions: "যেকোনো ৫টি প্রশ্নের বর্ণনামূলক উত্তর দাও (৬×৫=৩০)" }
    ]
  },

  // ইংরেজি (৩য়, ৪র্থ, ৫ম শ্রেণি: পূর্ণমান ৭০)
  "class-3-english": {
    classId: "class-3",
    subjectKey: "english",
    subjectName: "English",
    examType: "summative",
    examName: "Terminal Summative Assessment 2026",
    totalMarks: 70,
    duration: "2 hours 30 mins",
    recommendedMode: "exam",
    notes: "According to NCTB 2026 Assessment Guideline, Page 39.",
    sections: [
      { itemNo: 1, name: "Multiple Choice Questions / True or False", marksPerQuestion: 1, totalMarks: 5, type: "mcq", instructions: "Read the text from EFT and choose the best answer (1×5=5)" },
      { itemNo: 2, name: "Fill in the blanks with words from the box", marksPerQuestion: 1, totalMarks: 5, type: "fillInTheBlanks", instructions: "Fill in the blanks using suitable words from the box (1×5=5)" },
      { itemNo: 3, name: "Short questions from text (5 questions)", marksPerQuestion: 2, totalMarks: 10, type: "shortQuestions", instructions: "Answer the following short questions based on the passage (2×5=10)" },
      { itemNo: 4, name: "Matching words with their meanings", marksPerQuestion: 2, totalMarks: 10, type: "matching", instructions: "Match words in Column A with their meanings in Column B (2×5=10)" },
      { itemNo: 5, name: "Writing numbers in words / Ordinal numbers", marksPerQuestion: 2, totalMarks: 10, type: "shortQuestions", instructions: "Write the numbers in words or ordinal forms (2×5=10)" },
      { itemNo: 6, name: "Rearranging words to make meaningful sentences", marksPerQuestion: 2, totalMarks: 10, type: "shortQuestions", instructions: "Rearrange the given words in correct order to make meaningful sentences (2×5=10)" },
      { itemNo: 7, name: "Using capital letters and punctuation marks", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "Rewrite the sentences using capital letters and correct punctuation marks (1×5=5)" },
      { itemNo: 8, name: "Grammar: Parts of speech / Prepositions / Tenses", marksPerQuestion: 1, totalMarks: 5, type: "shortQuestions", instructions: "Answer the grammar questions as directed (1×5=5)" },
      { itemNo: 9, name: "Writing short composition with clues", marksPerQuestion: 10, totalMarks: 10, type: "broadQuestions", instructions: "Write at least five sentences about the given topic (10 marks)" }
    ]
  },

  // ৫ম শ্রেণি গণিত (পূর্ণমান ৭০)
  "class-5-math": {
    classId: "class-5",
    subjectKey: "math",
    subjectName: "গণিত",
    examType: "summative",
    examName: "১ম/২য়/৩য় প্রান্তিক সামষ্টিক মূল্যায়ন ২০২৬",
    totalMarks: 70,
    duration: "২ ঘণ্টা ৩০ মিনিট",
    recommendedMode: "exam",
    notes: "এনসিটিবি ২০২৬ নির্দেশিকার পৃষ্ঠা ৪৫ অনুযায়ী ৫ম শ্রেণির গণিত প্রশ্ন কাঠামো।",
    sections: [
      { itemNo: 1, name: "বহুনির্বাচনি প্রশ্ন (১০টি)", marksPerQuestion: 1, totalMarks: 10, type: "mcq", cognitiveDomain: "গাণিতিক ধারণা ৩টি, প্রক্রিয়াগত ৪টি, সমস্যা সমাধান ৩টি", instructions: "সঠিক উত্তরটি খাতায় লেখো (১×১০=১০)" },
      { itemNo: 2, name: "শূন্যস্থান পূরণ (৫টি)", marksPerQuestion: 2, totalMarks: 10, type: "fillInTheBlanks", instructions: "সঠিক উত্তর বসিয়ে শূন্যস্থান পূরণ করো (২×৫=১০)" },
      { itemNo: 3, name: "সংক্ষিপ্ত উত্তর প্রশ্ন (১০টি)", marksPerQuestion: 1, totalMarks: 10, type: "shortQuestions", cognitiveDomain: "গাণিতিক ধারণা ৩টি, প্রক্রিয়াগত ৪টি, সমস্যা সমাধান ৩টি", instructions: "সংক্ষেপে উত্তর দাও (১×১০=১০)" },
      { itemNo: 4, name: "গুণ, ভাগ ও চার প্রক্রিয়া সংক্রান্ত কাঠামোবদ্ধ সমস্যা (৩টির মধ্যে ২টি)", marksPerQuestion: 6, totalMarks: 12, toAnswer: 2, totalQuestions: 3, type: "broadQuestions", instructions: "যেকোনো ২টি সমস্যার সমাধান করো (৬×২=১২)" },
      { itemNo: 5, name: "সাধারণ ভগ্নাংশ ও দশমিক ভগ্নাংশ সমস্যা (৩টির মধ্যে ২টি)", marksPerQuestion: 6, totalMarks: 12, toAnswer: 2, totalQuestions: 3, type: "broadQuestions", instructions: "যেকোনো ২টি সমস্যার সমাধান করো (৬×২=১২)" },
      { itemNo: 6, name: "শতকরা ও লাভ-ক্ষতি সংক্রান্ত সমস্যা (২টির মধ্যে ১টি)", marksPerQuestion: 6, totalMarks: 6, toAnswer: 1, totalQuestions: 2, type: "broadQuestions", instructions: "যেকোনো ১টি সমস্যার সমাধান করো (৬ নম্বর)" },
      { itemNo: 7, name: "জ্যামিতি (চিত্রাঙ্কন ও ৩টি করে বৈশিষ্ট্য লিখন)", marksPerQuestion: 5, totalMarks: 10, type: "broadQuestions", instructions: "চিত্রসহ সংজ্ঞা ও ৩টি করে বৈশিষ্ট্য লেখো (আয়ত, বর্গ, রম্বস, সামান্তরিক বা বৃত্ত) (৫×২=১০)" }
    ]
  }
,

  // ==========================================
  // ৪র্থ শ্রেণি বাংলা (পূর্ণমান ৭০)
  // ==========================================
  "class-4-bangla": {
    "classId": "class-4",
    "subjectKey": "bangla",
    "subjectName": "বাংলা",
    "examType": "summative",
    "examName": "১ম/২য়/৩য় প্রান্তিক সামষ্টিক মূল্যায়ন ২০২৬",
    "totalMarks": 70,
    "duration": "২ ঘণ্টা ৩০ মিনিট",
    "recommendedMode": "exam",
    "notes": "এনসিটিবি ২০২৬ অনুযায়ী ৪র্থ শ্রেণির বাংলা প্রশ্নপত্র পাঠ্যবইয়ের অনুচ্ছেদ, ব্যাকরণ ও নির্মিতি সমন্বয়ে প্রণীত।",
    "sections": [
        {
            "itemNo": 1,
            "name": "অনুচ্ছেদ পড়ে শব্দার্থ লিখন (Word Meaning)",
            "marksPerQuestion": 1,
            "totalMarks": 5,
            "type": "wordMeaning",
            "instructions": "প্রদত্ত অনুচ্ছেদ থেকে যেকোনো ৫টি শব্দের অর্থ লেখো (১×৫=৫)"
        },
        {
            "itemNo": 2,
            "name": "অনুচ্ছেদ পড়ে প্রশ্নের উত্তর লিখন (Short Questions)",
            "marksPerQuestion": 3.33,
            "totalMarks": 10,
            "type": "shortQuestions",
            "instructions": "অনুচ্ছেদ পড়ে নিচের প্রশ্নগুলোর উত্তর লেখো (১০ নম্বর)"
        },
        {
            "itemNo": 3,
            "name": "যুক্তবর্ণ ভেঙে শব্দ তৈরি ও বাক্যে প্রয়োগ (Yuktaborno)",
            "marksPerQuestion": 2,
            "totalMarks": 10,
            "type": "yuktaborno",
            "instructions": "যুক্তবর্ণ ভেঙে দুটি করে শব্দ তৈরি করো এবং বাক্যে প্রয়োগ করো (২×৫=১০)"
        },
        {
            "itemNo": 4,
            "name": "সঠিক স্থানে বিরামচিহ্ন বসানো (Punctuation)",
            "marksPerQuestion": 1,
            "totalMarks": 5,
            "type": "shortQuestions",
            "instructions": "নিচের অনুচ্ছেদটিতে সঠিক বিরামচিহ্ন (দাঁড়ি, কমা, প্রশ্নচিহ্ন) বসাও (৫ নম্বর)"
        },
        {
            "itemNo": 5,
            "name": "এক কথায় প্রকাশ (One Word Substitution)",
            "marksPerQuestion": 1,
            "totalMarks": 5,
            "type": "shortQuestions",
            "instructions": "যেকোনো ৫টি বাক্যাংশের এক কথায় প্রকাশ লেখো (১×৫=৫)"
        },
        {
            "itemNo": 6,
            "name": "বিপরীত শব্দ লিখন (Opposite Words)",
            "marksPerQuestion": 1,
            "totalMarks": 5,
            "type": "shortQuestions",
            "instructions": "যেকোনো ৫টি শব্দের বিপরীত শব্দ লেখো (১×৫=৫)"
        },
        {
            "itemNo": 7,
            "name": "কবিতা / ছড়ার স্তবক মুখস্থ লিখন ও মূলভাব (Poem)",
            "marksPerQuestion": 10,
            "totalMarks": 10,
            "type": "broadQuestions",
            "instructions": "পাঠ্যবইয়ের কবিতার প্রথম ৬-৮ চরণ মুখস্থ লেখো ও মূলভাব বলো (১০ নম্বর)"
        },
        {
            "itemNo": 8,
            "name": "ছুটির জন্য প্রধান শিক্ষকের নিকট আবেদনপত্র লিখন",
            "marksPerQuestion": 5,
            "totalMarks": 5,
            "type": "broadQuestions",
            "instructions": "অসুস্থতার কারণে ৩ দিনের ছুটির জন্য আবেদনপত্র লেখো (৫ নম্বর)"
        },
        {
            "itemNo": 9,
            "name": "সংকেত অনুসারে রচনা লিখন (২০০ শব্দ)",
            "marksPerQuestion": 10,
            "totalMarks": 10,
            "type": "broadQuestions",
            "instructions": "প্রদত্ত সংকেত অবলম্বনে যেকোনো একটি বিষয়ে রচনা লেখো (১০ নম্বর)"
        }
    ]
},

  // ==========================================
  // ৫ম শ্রেণি বাংলা (পূর্ণমান ৭০)
  // ==========================================
  "class-5-bangla": {
    "classId": "class-5",
    "subjectKey": "bangla",
    "subjectName": "বাংলা",
    "examType": "summative",
    "examName": "১ম/২য়/৩য় প্রান্তিক সামষ্টিক মূল্যায়ন ২০২৬",
    "totalMarks": 70,
    "duration": "২ ঘণ্টা ৩০ মিনিট",
    "recommendedMode": "exam",
    "notes": "এনসিটিবি ২০২৬ অনুযায়ী ৫ম শ্রেণির বাংলা মূল্যায়ন কাঠামো: পাঠ্যবইয়ের অনুচ্ছেদ, ব্যাকরণিক দক্ষতা ও নির্মিতি সমন্বিত।",
    "sections": [
        {
            "itemNo": 1,
            "name": "পাঠ্যবইয়ের অনুচ্ছেদ পড়ে শব্দার্থ লিখন (Word Meaning)",
            "marksPerQuestion": 1,
            "totalMarks": 5,
            "type": "wordMeaning",
            "instructions": "প্রদত্ত অনুচ্ছেদ থেকে যেকোনো ৫টি শব্দের অর্থ লেখো (১×৫=৫)"
        },
        {
            "itemNo": 2,
            "name": "অনুচ্ছেদ পড়ে ৩টি প্রশ্নের উত্তর লিখন (Short Questions)",
            "marksPerQuestion": 3.33,
            "totalMarks": 10,
            "type": "shortQuestions",
            "instructions": "অনুচ্ছেদের আলোকে নিচের প্রশ্নগুলোর উত্তর লেখো (১০ নম্বর)"
        },
        {
            "itemNo": 3,
            "name": "যুক্তবর্ণ ভেঙে শব্দ তৈরি ও অর্থপূর্ণ বাক্যে প্রয়োগ (Yuktaborno)",
            "marksPerQuestion": 2,
            "totalMarks": 10,
            "type": "yuktaborno",
            "instructions": "যেকোনো ৫টি যুক্তবর্ণ ভেঙে শব্দ গঠন ও অর্থপূর্ণ বাক্যে প্রয়োগ করো (২×৫=১০)"
        },
        {
            "itemNo": 4,
            "name": "সঠিক স্থানে বিরামচিহ্ন বসানো (Punctuation)",
            "marksPerQuestion": 1,
            "totalMarks": 5,
            "type": "shortQuestions",
            "instructions": "অনুচ্ছেদটিতে উপযুক্ত বিরামচিহ্ন (দাঁড়ি, কমা, কোলন, প্রশ্নচিহ্ন) বসাও (৫ নম্বর)"
        },
        {
            "itemNo": 5,
            "name": "এক কথায় প্রকাশ (One Word Substitution)",
            "marksPerQuestion": 1,
            "totalMarks": 5,
            "type": "shortQuestions",
            "instructions": "যেকোনো ৫টি বাক্যাংশের এক কথায় প্রকাশ লেখো (১×৫=৫)"
        },
        {
            "itemNo": 6,
            "name": "বিপরীত শব্দ লিখন (Opposite Words)",
            "marksPerQuestion": 1,
            "totalMarks": 5,
            "type": "shortQuestions",
            "instructions": "যেকোনো ৫টি শব্দের বিপরীত শব্দ লেখো (১×৫=৫)"
        },
        {
            "itemNo": 7,
            "name": "কবিতাংশ পড়ে মূলভাব ও প্রশ্নের উত্তর লিখন",
            "marksPerQuestion": 10,
            "totalMarks": 10,
            "type": "broadQuestions",
            "instructions": "কবিতাংশটি পড়ে এর মূলভাব ও সংশ্লিষ্ট প্রশ্নের উত্তর লেখো (১০ নম্বর)"
        },
        {
            "itemNo": 8,
            "name": "ফরম পূরণ অথবা দরখাস্ত লিখন (Form / Application)",
            "marksPerQuestion": 5,
            "totalMarks": 5,
            "type": "broadQuestions",
            "instructions": "লাইব্রেরি কার্ডের ফরম পূরণ অথবা প্রধান শিক্ষকের নিকট আবেদনপত্র লেখো (৫ নম্বর)"
        },
        {
            "itemNo": 9,
            "name": "প্রদত্ত সংকেত অবলম্বনে পূর্ণাঙ্গ রচনা লিখন (২০০ শব্দ)",
            "marksPerQuestion": 10,
            "totalMarks": 10,
            "type": "broadQuestions",
            "instructions": "সংকেত অনুসারে যেকোনো একটি বিষয়ে ২০০ শব্দের মধ্যে রচনা লেখো (১০ নম্বর)"
        }
    ]
}
,

  // ==========================================
  // 🧸 প্রাক-প্রাথমিক: গণিত ও সংখ্যা ধারণা (৪+ ও ৫+ সমন্বিত) (পূর্ণমান: ৫০, সময়: ১ ঘণ্টা)
  // ==========================================
  "pre-primary-math": {
    classId: "pre-primary",
    subjectKey: "math",
    subjectName: "গণিত ও সংখ্যা ধারণা",
    examType: "summative",
    examName: "১ম/২য়/৩য় প্রান্তিক সামষ্টিক মূল্যায়ন ২০২৬ (প্রাক-প্রাথমিক)",
    totalMarks: 50,
    duration: "১ ঘণ্টা",
    recommendedMode: "worksheet",
    notes: "প্রাক-প্রাথমিক ৪+ ও ৫+ সমন্বিত গণিত ওয়ার্কশিট: ছবি গণনা, দাগ টেনে মিল, ছোট-বড় তুলনা, আকৃতি ও সংখ্যা ট্রেসিং।",
    sections: [
      { itemNo: 1, name: "তুলনাভিত্তিক বহুনির্বাচনি (কম/বেশি, ছোট/বড়)", marksPerQuestion: 1, totalMarks: 5, type: "mcq", instructions: "ছবি দেখে সঠিক উত্তরে টিক (✓) চিহ্ন দাও (১×৫=৫)" },
      { itemNo: 2, name: "ছবি গণনা করে সংখ্যা মেলানো / শূন্যস্থান", marksPerQuestion: 1, totalMarks: 5, type: "fillInTheBlanks", instructions: "ছবি গুনে খালি ঘরে সঠিক সংখ্যা লেখো (১×৫=৫)" },
      { itemNo: 3, name: "দাগ টেনে সংখ্যার সাথে ছবি মিলকরণ", marksPerQuestion: 2, totalMarks: 10, type: "matching", instructions: "বামের ছবির সাথে ডানের সঠিক সংখ্যা দাগ টেনে মেলাও (২×৫=১০)" },
      { itemNo: 4, name: "সংক্ষিপ্ত প্রশ্নোত্তর (আকৃতি ও গণনা)", marksPerQuestion: 2, totalMarks: 10, type: "shortQuestions", instructions: "প্রশ্নের পাশে সংখ্যা বা আকৃতির নাম লেখো (২×৫=১০)" },
      { itemNo: 5, name: "সহজ একত্রীকরণ ও বাদ দেওয়া (যোগ-বিয়োগের সূচনা)", marksPerQuestion: 2, totalMarks: 10, type: "shortQuestions", instructions: "ছবি একত্র করে বা বাদ দিয়ে মোট সংখ্যা লেখো (২×৫=১০)" },
      { itemNo: 6, name: "আঁকাআঁকি ও ট্রেসিং (আকৃতি ও সংখ্যা)", marksPerQuestion: 5, totalMarks: 10, type: "broadQuestions", instructions: "পেন্সিল দিয়ে ডট মিলিয়ে আকৃতি আঁকো ও রঙ করো (৫×২=১০)" }
    ]
  },

  // ==========================================
  // ৪র্থ শ্রেণি: প্রাথমিক গণিত (পূর্ণমান: ৭০, সময়: ২ ঘণ্টা ৩০ মিনিট)
  // ==========================================
  "class-4-math": {
    classId: "class-4",
    subjectKey: "math",
    subjectName: "প্রাথমিক গণিত",
    examType: "summative",
    examName: "১ম/২য়/৩য় প্রান্তিক সামষ্টিক মূল্যায়ন ২০২৬",
    totalMarks: 70,
    duration: "২ ঘণ্টা ৩০ মিনিট",
    recommendedMode: "exam",
    notes: "এনসিটিবি ২০২৬ নির্দেশিকা অনুযায়ী ৪র্থ শ্রেণির গণিত প্রশ্ন কাঠামো (পূর্ণমান ৭০ নম্বর)।",
    sections: [
      { itemNo: 1, name: "বহুনির্বাচনি প্রশ্ন (১০টি)", marksPerQuestion: 1, totalMarks: 10, type: "mcq", cognitiveDomain: "গাণিতিক ধারণা ৩টি, প্রক্রিয়াগত ৪টি, সমস্যা সমাধান ৩টি", instructions: "সঠিক উত্তরটি খাতায় লেখো (১×১০=১০)" },
      { itemNo: 2, name: "শূন্যস্থান পূরণ (৫টি)", marksPerQuestion: 2, totalMarks: 10, type: "fillInTheBlanks", instructions: "সঠিক উত্তর বসিয়ে শূন্যস্থান পূরণ করো (২×৫=১০)" },
      { itemNo: 3, name: "সংক্ষিপ্ত উত্তর প্রশ্ন (১০টি)", marksPerQuestion: 1, totalMarks: 10, type: "shortQuestions", cognitiveDomain: "গাণিতিক ধারণা ৩টি, প্রক্রিয়াগত ৪টি, সমস্যা সমাধান ৩টি", instructions: "সংক্ষেপে উত্তর দাও (১×১০=১০)" },
      { itemNo: 4, name: "চার প্রক্রিয়া ও বন্ধনী সংক্রান্ত কাঠামোবদ্ধ সমস্যা (২টির মধ্যে ১টি)", marksPerQuestion: 6, totalMarks: 6, toAnswer: 1, totalQuestions: 2, type: "broadQuestions", instructions: "যেকোনো ১টি সমস্যার সমাধান করো (৬ নম্বর)" },
      { itemNo: 5, name: "গুণনীয়ক, গুণিতক ও ভগ্নাংশ সংক্রান্ত কাঠামোবদ্ধ সমস্যা (২টির মধ্যে ১টি)", marksPerQuestion: 6, totalMarks: 6, toAnswer: 1, totalQuestions: 2, type: "broadQuestions", instructions: "যেকোনো ১টি সমস্যার সমাধান করো (৬ নম্বর)" },
      { itemNo: 6, name: "দশমিক ভগ্নাংশ ও পরিমাপ সংক্রান্ত কাঠামোবদ্ধ সমস্যা (২টির মধ্যে ১টি)", marksPerQuestion: 6, totalMarks: 6, toAnswer: 1, totalQuestions: 2, type: "broadQuestions", instructions: "যেকোনো ১টি সমস্যার সমাধান করো (৬ নম্বর)" },
      { itemNo: 7, name: "সময় ও উপাত্ত বিন্যস্তকরণ সংক্রান্ত সমস্যা (২টির মধ্যে ১টি)", marksPerQuestion: 6, totalMarks: 6, toAnswer: 1, totalQuestions: 2, type: "broadQuestions", instructions: "যেকোনো ১টি সমস্যার সমাধান করো (৬ নম্বর)" },
      { itemNo: 8, name: "জ্যামিতি (চিত্রাঙ্কন ও ৩টি করে বৈশিষ্ট্য লিখন)", marksPerQuestion: 5, totalMarks: 10, type: "broadQuestions", instructions: "চিত্রসহ সংজ্ঞা ও ৩টি করে বৈশিষ্ট্য লেখো (কোণ, সমকোণী/সমবাহু ত্রিভুজ বা লম্ব/সমান্তরাল রেখা) (৫×২=১০)" }
    ]
  },
};

/**
 * সহকারী ফাংশন: যেকোনো শ্রেণি ও বিষয়ের জন্য এনসিটিবি ২০২৬ ব্লুপ্রিন্ট খুঁজে বের করা
 */
export function getNctb2026Blueprint(classId: string, subjectKey: string): NctbExamBlueprint {
  const normalizedSubject = (subjectKey === "islamic" || subjectKey === "hindu") ? "religion" : subjectKey;
  const specificKey = `${classId}-${subjectKey}`;
  if (NCTB_2026_BLUEPRINTS[specificKey]) {
    return NCTB_2026_BLUEPRINTS[specificKey];
  }

  const religionSpecificKey = `${classId}-${normalizedSubject}`;
  if (NCTB_2026_BLUEPRINTS[religionSpecificKey]) {
    const base = NCTB_2026_BLUEPRINTS[religionSpecificKey];
    return {
      ...base,
      subjectKey: subjectKey as any,
      subjectName: subjectKey === "islamic" ? "ইসলাম ও নৈতিক শিক্ষা" : (subjectKey === "hindu" ? "হিন্দুধর্ম ও নৈতিক শিক্ষা" : base.subjectName)
    };
  }

  // Fallback to class generic or Class 3/1 equivalent
  const isClass1Or2 = classId === "class-1" || classId === "class-2";
  const fallbackKey = isClass1Or2 ? `class-1-${normalizedSubject}` : `class-3-${normalizedSubject}`;

  if (NCTB_2026_BLUEPRINTS[fallbackKey]) {
    return {
      ...NCTB_2026_BLUEPRINTS[fallbackKey],
      classId: classId as any,
      subjectKey: subjectKey as any,
      subjectName: subjectKey === "islamic" ? "ইসলাম ও নৈতিক শিক্ষা" : (subjectKey === "hindu" ? "হিন্দুধর্ম ও নৈতিক শিক্ষা" : NCTB_2026_BLUEPRINTS[fallbackKey].subjectName)
    };
  }

  // Ultimate fallback
  return isClass1Or2 ? NCTB_2026_BLUEPRINTS["class-1-bangla"] : NCTB_2026_BLUEPRINTS["class-3-bangla"];
}
