import type { SlideDeck } from "./slidesData";

// =========================================================================
// 🎈 PRIMARY PATHSHALA (NCTB 2026 OFFICIAL CURRICULUM)
// CLASS 3 ENGLISH FOR TODAY • UNIT 1 (LESSONS 1 TO 9) — 100% VERBATIM
// Ground Truth: C:/Projects/prathomik-pathshala/NCTB_Primary_Collection_Web/...
// =========================================================================

// =========================================================================
// LESSON 1: HELLO (pp. 1–2) — 100% NCTB 2026 VERBATIM
// =========================================================================
export const HELLO_GREETINGS_SLIDE_DECK: SlideDeck = {
  id: "hello-greetings",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 1: Greetings, Farewells, Introductions and Numbers",
  lesson: "Lesson 1: Hello (Activity A, B, C & Let's practise)",
  topic: "Greetings and Exchanging Names (pp. 1–2)",
  category: "english",
  thumbnailEmoji: "👋 🌅 👧",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Lesson 1: Hello",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১: সকালের শুভেচ্ছা ও কুশল বিনিময় (Orientation)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-amber-500 to-orange-600",
      imageEmoji: "👋 🌅 👦",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Welcome to Class 3 English for Today!",
          "Today we start Unit 1, Lesson 1: Hello from page 1 and page 2.",
          "When we meet someone in the morning, we say 'Good morning'.",
          "We ask 'What's your name?' and 'How are you?' politely.",
          "Let's practice the authentic conversations of Fatiha, Sanjoy, Rahat and Faria!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা ৩য় শ্রেণির ইংরেজি পাঠ্যবইয়ের ১ম ইউনিট ও ১ম পাঠ (পৃষ্ঠা ১ ও ২)-এর 'Hello' শিখব। সকালে কারো সাথে দেখা হলে কীভাবে 'Good morning' বলে কুশল বিনিময় করতে হয় এবং নাম জানতে চাইতে হয়, তা আমরা পাঠ্যবইয়ের হুবহু সংলাপ থেকে শিখব।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: সকালে বন্ধুদের সাথে দেখা হলে তারা কী বলে? ইংরেজিতে কীভাবে অভিবাদন জানাতে হয় তা বোর্ডে লিখে দেখান।",
      quickTeachingSteps: [
        "ধাপ ১: হাত নেড়ে 'Hello' এবং 'Good morning' বলে ক্লাস শুরু করুন।",
        "ধাপ ২: ১ পৃষ্ঠার Activity A-এর ফাতিহা ও সঞ্জয়ের ছবি দেখিয়ে মনোযোগ আকর্ষণ করুন।",
        "ধাপ ৩: মূল সংলাপ অনুশীলনে প্রবেশ করুন।"
      ]
    },
    {
      id: 2,
      title: "Key Vocabulary Lab & Morning Phonics",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১: মূল শব্দভাণ্ডার, অর্থ ও উচ্চারণ (Key Vocabulary)",
      phase: "২. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary & Phonics)",
      duration: "৭ মিনিট",
      themeColor: "from-orange-500 to-amber-600",
      imageEmoji: "🔤 🌅 📘",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Listen, repeat and learn the core vocabulary words with accurate pronunciation:"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ১ ও ২-এর মূল শব্দগুলোর অর্থ ও সিলেবল ভাঙন শিখে নিই:",
        vocabulary: [
          { word: "morning", syllables: ["morn", "ing"], phonetic: "/ˈmɔː.nɪŋ/", meaning: "সকাল / প্রভাত", partOfSpeech: "Noun", example: "Good morning, teacher.", icon: "🌅" },
          { word: "name", syllables: ["name"], phonetic: "/neɪm/", meaning: "নাম", partOfSpeech: "Noun", example: "What’s your name?", icon: "🏷️" },
          { word: "good", syllables: ["good"], phonetic: "/ɡʊd/", meaning: "ভালো / শুভ", partOfSpeech: "Adjective", example: "I’m good, thanks.", icon: "👍" },
          { word: "thanks", syllables: ["thanks"], phonetic: "/θæŋks/", meaning: "ধন্যবাদ", partOfSpeech: "Noun/Interjection", example: "I’m fine, thanks.", icon: "🙏" },
          { word: "fine", syllables: ["fine"], phonetic: "/faɪn/", meaning: "সুন্দর / ভালো", partOfSpeech: "Adjective", example: "I’m fine. Thank you.", icon: "😊" },
          { word: "hello", syllables: ["hel", "lo"], phonetic: "/həˈləʊ/", meaning: "ওহে / হ্যালো (অভিবাদন)", partOfSpeech: "Interjection", example: "Hello, Rahat. How are you?", icon: "👋" }
        ]
      },
      teacherNotes: "morn-ing এবং hel-lo শব্দের সিলেবল হাততালি দিয়ে ড্রিল করান। thanks ও thank you-এর কৃতজ্ঞতা প্রকাশের নিয়ম বুঝিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: শব্দের কার্ডে ক্লিক করে সঠিক অডিও উচ্চারণ শিক্ষার্থীদের শোনান।",
        "ধাপ ২: প্রতিটি শব্দের অর্থ ও প্রয়োগ বোর্ডে লিখুন।",
        "ধাপ ৩: সমস্বরে শিক্ষার্থীদের দিয়ে উচ্চারণ করান।"
      ]
    },
    {
      id: 3,
      title: "Activity A: Listen and say (Fatiha & Sanjoy)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১: ফাতিহা ও সঞ্জয়ের হুবহু সংলাপ (100% Verbatim Dialogue)",
      phase: "৩. মূল পাঠ্যাংশ ও সংলাপ (Authentic Dialogue - Activity A)",
      duration: "৮ মিনিট",
      themeColor: "from-amber-600 to-yellow-600",
      imageEmoji: "👧 👦 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Fatiha: Good morning. What’s your name?",
          "Sanjoy: Good morning. My name’s Sanjoy.",
          "Fatiha: How are you?",
          "Sanjoy: I’m good, thanks. And you?",
          "Fatiha: I’m also good."
        ],
        banglaExplanation: "এনসিটিবি হুবহু সংলাপ (পৃষ্ঠা ১):\nফাতিহা: শুভ সকাল। তোমার নাম কী?\nসঞ্জয়: শুভ সকাল। আমার নাম সঞ্জয়।\nফাতিহা: তুমি কেমন আছ?\nসঞ্জয়: আমি ভালো আছি, ধন্যবাদ। আর তুমি?\nফাতিহা: আমিও ভালো আছি।",
        dialogue: [
          { speaker: "Fatiha", team: "Team A", text: "Good morning. What’s your name?", avatar: "👧" },
          { speaker: "Sanjoy", team: "Team B", text: "Good morning. My name’s Sanjoy.", avatar: "👦" },
          { speaker: "Fatiha", team: "Team A", text: "How are you?", avatar: "👧" },
          { speaker: "Sanjoy", team: "Team B", text: "I’m good, thanks. And you?", avatar: "👦" },
          { speaker: "Fatiha", team: "Team A", text: "I’m also good.", avatar: "👧" }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের দুই দলে ভাগ করুন (টিম ফাতিহা ও টিম সঞ্জয়)। সংলাপটি ক্যারেক্টার ভয়েসে অভিনয় করে বলতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: সংলাপের মডেল অডিও চালান।",
        "ধাপ ২: শিক্ষার্থীদের দিয়ে সংলাপের প্রতিটি লাইন পুনরাবৃত্তি করান।",
        "ধাপ ৩: 'And you?' (আর তুমি?) দ্বারা বিপরীত প্রশ্ন করার নিয়ম ব্যাখ্যা করুন।"
      ]
    },
    {
      id: 4,
      title: "Activity B: Listen and say (Rahat & Faria)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ২: রাহাত ও ফারিয়ার হুবহু সংলাপ (100% Verbatim Dialogue)",
      phase: "৪. দ্বিতীয় সংলাপ পাঠ (Authentic Dialogue - Activity B)",
      duration: "৭ মিনিট",
      themeColor: "from-yellow-600 to-amber-700",
      imageEmoji: "👦 👧 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Rahat: Hello, Rahat. How are you?",
          "Faria: Hi, Faria. I’m fine. Thank you."
        ],
        banglaExplanation: "এনসিটিবি হুবহু সংলাপ (পৃষ্ঠা ২):\nরাহাত: হ্যালো, রাহাত। তুমি কেমন আছ?\nফারিয়া: হাই, ফারিয়া। আমি ভালো আছি। তোমাকে ধন্যবাদ।",
        dialogue: [
          { speaker: "Rahat", team: "Team A", text: "Hello, Rahat. How are you?", avatar: "👦" },
          { speaker: "Faria", team: "Team B", text: "Hi, Faria. I’m fine. Thank you.", avatar: "👧" }
        ]
      },
      teacherNotes: "'Hello' এবং 'Hi'-এর বন্ধুত্বপূর্ণ ব্যবহার শিক্ষার্থীদের শেখান। কুশল জানতে চাইলে 'I'm fine. Thank you.' বলতে হয় তা অনুশীলন করান।",
      quickTeachingSteps: [
        "ধাপ ১: Activity B-এর সংলাপ পড়ে শোনান।",
        "ধাপ ২: ক্লাসের শিক্ষার্থীদের নিজের বন্ধুর নাম বসিয়ে সংলাপ বলতে বলুন।",
        "ধাপ ৩: পরবর্তী পেয়ারওয়ার্ক অ্যাক্টিভিটিতে যান।"
      ]
    },
    {
      id: 5,
      title: "Activity C: Pairwork — Act out the dialogue",
      subtitle: "পাঠ্যবই পৃষ্ঠা ২: সহপাঠীর সাথে জোড়ায় সংলাপ অভিনয় (Interactive Pairwork)",
      phase: "৫. সহপাঠী কথন অনুশীলন (Speaking Pairwork)",
      duration: "৭ মিনিট",
      themeColor: "from-amber-600 to-orange-600",
      imageEmoji: "🤝 🎭 🗣️",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Pairwork: Act out the dialogue in activity B with your friend (page 2).",
          "Student 1: Good morning / Hello! What's your name?",
          "Student 2: Good morning / Hi! My name's [Your Name]. How are you?",
          "Student 1: I'm good / I'm fine, thanks. And you?",
          "Student 2: I'm also good. Thank you!"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ২ Activity C: সহপাঠীর সাথে জোড়া গঠন করে নিজের আসল নাম ব্যবহার করে এই সংলাপটি অভিনয় করে মুখে মুখে বলো।"
      },
      teacherNotes: "শিক্ষার্থীদের বেঞ্চে মুখোমুখি বসিয়ে দিন। একজন প্রশ্ন করবে এবং অন্যজন নিজের নাম ও কুশল বলবে। এরপর রোল পরিবর্তন করান।",
      quickTeachingSteps: [
        "ধাপ ১: ক্লাসে দুজন শিক্ষার্থীকে সামনে ডেকে এনে ডায়ালগ ডেমো দিন।",
        "ধাপ ২: সকল শিক্ষার্থীকে জোড়ায় জোড়ায় সংলাপ চর্চা করতে বলুন।",
        "ধাপ ৩: শিক্ষকের সহায়তায় উচ্চারণ সংশোধন করুন।"
      ]
    },
    {
      id: 6,
      title: "Let's practise: Fill in the Blanks (Rana, Sima, Sarah, Manik)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ২: বইয়ের আসল শূন্যস্থান পূরণ (Let's Practise 1)",
      phase: "৬. লিখিত অনুশীলন (Practice Activity 1)",
      duration: "৬ মিনিট",
      themeColor: "from-orange-600 to-red-600",
      imageEmoji: "✍️ 📋 🎯",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Let's practise 1. Look at activity A. Write the correct word in the box (page 2):",
          "a) Rana: Good morning. What’s your name?",
          "   Sima: Good morning, My name’s Sima.",
          "b) Sarah: _______________, What’s your name? (Ans: Good morning)",
          "   Manik: Good morning, My name’s Manik."
        ],
        banglaExplanation: "পাঠ্যবইয়ের ২ পৃষ্ঠার Let's practise ১ নম্বর অনুশীলন: Activity A লক্ষ করে বক্সের সঠিক শব্দ দিয়ে রানা ও সীমা, সারাহ ও মানিকের সংলাপের শূন্যস্থান পূরণ করো।"
      },
      teacherNotes: "শিক্ষার্থীদের পাঠ্যবইয়ের পৃষ্ঠা ২ খুলে পেনসিল দিয়ে শূন্যস্থান পূরণ করতে বলুন। সঠিক ক্যাপিটাল লেটার (Good morning, My name's) যাচাই করুন।",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডে শূন্যস্থান তুলে শিক্ষার্থীদের সঠিক শব্দ বলতে বলুন।",
        "ধাপ ২: খাতায় পুরো সংলাপটি নির্ভুল বানানে লিখতে দিন।",
        "ধাপ ৩: মূল্যায়ন করে ফিডব্যাক দিন।"
      ]
    },
    {
      id: 7,
      title: "Grammar & Speaking Focus: Contractions & Greetings",
      subtitle: "সংক্ষিপ্ত রূপ (Contractions): What's, Name's, I'm ও সম্ভাষণ ব্যাকরণ",
      phase: "৭. ব্যাকরণ ও ধ্বনিতত্ত্ব (Grammar Focus)",
      duration: "৫ মিনিট",
      themeColor: "from-red-600 to-amber-700",
      imageEmoji: "🧩 💡 📝",
      sceneType: "grammar",
      hasVisualStage: true,
      content: {
        englishText: [
          "Learn standard English contractions used in daily speech:",
          "• What's  =  What is",
          "• My name's  =  My name is",
          "• I'm  =  I am",
          "Punctuation Tip: Always use an apostrophe (') in contractions and end questions with a question mark (?)."
        ],
        banglaExplanation: "দৈনন্দিন ইংরেজিতে দ্রুত ও সাবলীলভাবে কথা বলার জন্য সংক্ষেপণ (Contraction) ব্যবহার করা হয়:\n• What's (হলো What is)\n• My name's (হলো My name is)\n• I'm (হলো I am)\nলক্ষ্য করো: প্রতিটি সংক্ষেপণে অ্যাপোস্ট্রফি (') চিহ্ন ব্যবহৃত হয়েছে।"
      },
      teacherNotes: "শিক্ষার্থীদের বোঝান যে কথ্য ইংরেজিতে 'I am'-এর বদলে 'I'm' এবং 'What is'-এর বদলে 'What's' বেশি ব্যবহৃত ও স্বাভাবিক শোনায়।",
      quickTeachingSteps: [
        "ধাপ ১: অ্যাপোস্ট্রফি (') চিহ্নের ব্যবহার বোর্ডে দেখান।",
        "ধাপ ২: পূর্ণরূপ ও সংক্ষিপ্ত রূপের মুখে মুখে ড্রিল করান।",
        "ধাপ ৩: কুইজে যাওয়ার প্রস্তুতি নিন।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "পাঠ মূল্যায়ন ও এনসিটিবি ২০২৬ ব্লুপ্রিন্ট অনুযায়ী প্রিন্টযোগ্য প্রশ্নপত্র",
      phase: "৮. চূড়ান্ত মূল্যায়ন ও বাড়ির কাজ (Evaluation & Assessment)",
      duration: "৪ মিনিট",
      themeColor: "from-amber-700 to-orange-800",
      imageEmoji: "🏆 📝 🌟",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed Unit 1, Lesson 1: Hello.",
          "Key Takeaways:",
          "• In the morning, we greet others with 'Good morning.'",
          "• To ask someone's name, we say 'What's your name?'",
          "• To introduce ourselves, we say 'My name's [Name].'",
          "• To inquire about well-being, we say 'How are you?' and reply 'I'm good, thanks / I'm fine. Thank you.'",
          "Now take the evaluation quiz and download your 20-mark companion worksheet!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা সফলভাবে ১ম পাঠ সম্পন্ন করেছ। এবার কুইজের উত্তর দাও এবং ২০ নম্বরের প্রিন্টযোগ্য ওয়ার্কশিট অনুশীলন করো।",
        quiz: {
          question: "When Fatiha asks 'How are you?', what does Sanjoy reply on page 1?",
          options: [
            "I’m good, thanks. And you?",
            "Goodbye, see you later.",
            "My name's Sanjoy.",
            "I like cricket."
          ],
          answer: "I’m good, thanks. And you?",
          hint: "Check Fatiha and Sanjoy's dialogue on page 1: 'Sanjoy: I’m good, thanks. And you?'"
        },
        activityTask: "তোমার ক্লাসের ৩ জন নতুন সহপাঠীর সাথে ইংরেজিতে কথা বলো, তাদের নাম ও কুশল জেনে খাতায় নোট করো।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রশংসা করুন এবং ২০ নম্বরের মূল্যায়ন ওয়ার্কশিটটি প্রিন্ট করে পরীক্ষা নেওয়ার ব্যবস্থা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: মূল শিখনফলগুলো এক নজরে শিক্ষার্থীদের সাথে পুনরাবৃত্তি করুন।",
        "ধাপ ২: কুইজে অংশ নিতে বলুন এবং সঠিক উত্তরের ব্যাখ্যা দিন।",
        "ধাপ ৩: ওয়ার্কশিট বাটনে ক্লিক করে মূল্যায়নপত্র ডাউনলোড বা প্রিন্ট করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Primary School Examination Board — Academic Year 2026",
    examTitle: "Class 3 English Assessment — Unit 1, Lesson 1: Hello",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today (NCTB 2026)",
    time: "40 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Multiple Choice Questions (5 Marks)",
        instruction: "Choose the correct answer and write the letter (a, b, c, or d) in the box:",
        content: [
          {
                    q: "1. What do we say when greeting someone in the morning?",
                    options: [
                              "a) Good night",
                              "b) Good morning",
                              "c) Goodbye",
                              "d) Good evening"
                    ],
                    answer: "a) Good night"
          },
          {
                    q: "2. Which sentence is used to ask someone's name?",
                    options: [
                              "a) How are you?",
                              "b) Where are you going?",
                              "c) What’s your name?",
                              "d) Who is she?"
                    ],
                    answer: "a) How are you?"
          },
          {
                    q: "3. What is the contracted form of 'I am'?",
                    options: [
                              "a) I's",
                              "b) I'm",
                              "c) I're",
                              "d) I've"
                    ],
                    answer: "a) I's"
          },
          {
                    q: "4. How did Fatiha reply when Sanjoy said 'And you?'",
                    options: [
                              "a) I'm also good.",
                              "b) See you later.",
                              "c) No, thank you.",
                              "d) It's time to go."
                    ],
                    answer: "a) I'm also good."
          },
          {
                    q: "5. 'Thank you' expresses —",
                    options: [
                              "a) Anger",
                              "b) Gratitude and politeness",
                              "c) Sadness",
                              "d) Sleep"
                    ],
                    answer: "a) Anger"
          }
]
      },
      {
        type: "fill_in_the_blanks",
        title: "Section B: Fill in the Blanks (Let's Practise p. 2) (5 Marks)",
        instruction: "Complete the dialogue using words from the textbook (page 2):",
        content: [
          "a) Rana: Good morning. What’s your ____________ ?",
          "b) Sima: ____________ morning, My name’s Sima.",
          "c) Sarah: Good morning, ____________ your name?",
          "d) Manik: Good morning, My ____________ Manik.",
          "e) Rahat: Hello, Faria. How ____________ you?"
        ]
      },
      {
        type: "true_false",
        title: "Section C: Write True or False (5 Marks)",
        instruction: "Write 'True' for correct statements and 'False' for incorrect statements:",
        content: [
          "a) Sanjoy says 'Good evening' to Fatiha on page 1.  [ _______ ]",
          "b) 'Thanks' means gratitude.  [ _______ ]",
          "c) Fatiha says 'I’m also good.'  [ _______ ]",
          "d) In Activity B, Faria says 'I'm fine. Thank you.'  [ _______ ]",
          "e) We say 'Good night' when arriving at school in the morning.  [ _______ ]"
        ]
      },
      {
        type: "short_questions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "Write the answers to the following questions in complete sentences:",
        content: [
          "1. What does Fatiha ask Sanjoy after saying Good morning?\n   Answer: ________________________________________________________________",
          "2. What is your name? (Write in a complete sentence: 'My name’s...')\n   Answer: ________________________________________________________________",
          "3. How do you respond when someone asks 'How are you?'\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// LESSON 2: TALKING ABOUT MYSELF (pp. 3–5) — 100% NCTB 2026 VERBATIM
// =========================================================================
export const TALKING_ABOUT_MYSELF_SLIDE_DECK: SlideDeck = {
  id: "talking-about-myself",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 1: Greetings, Farewells, Introductions and Numbers",
  lesson: "Lesson 2: Talking about myself (Activity A, B, C & Let's practise)",
  topic: "Expressing Personal Preferences: Game, Subject & Colour (pp. 3–5)",
  category: "english",
  thumbnailEmoji: "⚽ 🏏 🎨",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Lesson 2: Talking About Myself",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৩: নিজের পছন্দ, প্রিয় খেলা ও বিষয় প্রকাশ (Orientation)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-blue-600 to-cyan-600",
      imageEmoji: "⚽ 🏏 👦",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Welcome to Lesson 2: Talking about myself from pages 3 to 5!",
          "Everyone has a favourite game, a favourite colour, and a favourite subject.",
          "What is your favourite game? What is your favourite subject?",
          "Let's practice Alex's chain drill and Sakiba and Zahid's authentic conversation!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা ৩য় শ্রেণির ইংরেজি পাঠ্যবইয়ের পৃষ্ঠা ৩ থেকে ৫-এর 'Talking about myself' পাঠটি শিখব। আমাদের প্রত্যেকের প্রিয় খেলা, প্রিয় রং, প্রিয় ফুল ও প্রিয় বিষয় থাকে। এগুলো কীভাবে ইংরেজিতে সহজ বাক্যে বলতে ও লিখতে হয় তা আমরা শিখব।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তাদের কার কোন খেলা ও কোন বিষয় সবচেয়ে প্রিয়? 'favourite' শব্দের অর্থ ক্লাসে আলোচনা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: ফুটবল বা ক্রিকেটের ছবি দেখিয়ে পছন্দের খেলা সম্পর্কে জানতে চান।",
        "ধাপ ২: ৩ পৃষ্ঠার চেইন ড্রিল কবিতাটি শিক্ষার্থীদের শোনান।",
        "ধাপ ৩: মূল পাঠের শব্দভাণ্ডার আয়ত্ত করান।"
      ]
    },
    {
      id: 2,
      title: "Key Vocabulary Lab: Preferences & Sports",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৩–৫: প্রিয় বিষয় ও খেলাধুলার মূল শব্দভাণ্ডার (Vocabulary Lab)",
      phase: "২. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary & Phonics)",
      duration: "৭ মিনিট",
      themeColor: "from-cyan-600 to-teal-600",
      imageEmoji: "🔤 ⚽ 📘",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Learn key vocabulary words related to personal preferences and sports:"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ৩–৫ এর মূল শব্দগুলোর অর্থ ও উচ্চারণ শিখে নিই:",
        vocabulary: [
          { word: "favourite", syllables: ["fa", "vour", "ite"], phonetic: "/ˈfeɪ.vər.ɪt/", meaning: "সবচেয়ে পছন্দের / প্রিয়", partOfSpeech: "Adjective", example: "Cricket is my favourite game.", icon: "⭐" },
          { word: "game", syllables: ["game"], phonetic: "/ɡeɪm/", meaning: "খেলা / ক্রীড়া", partOfSpeech: "Noun", example: "Football is my game.", icon: "⚽" },
          { word: "football", syllables: ["foot", "ball"], phonetic: "/ˈfʊt.bɔːl/", meaning: "ফুটবল খেলা", partOfSpeech: "Noun", example: "I like to play football.", icon: "⚽" },
          { word: "cricket", syllables: ["crick", "et"], phonetic: "/ˈkrɪk.ɪt/", meaning: "ক্রিকেট খেলা", partOfSpeech: "Noun", example: "Cricket is Zahid's favourite game.", icon: "🏏" },
          { word: "subject", syllables: ["sub", "ject"], phonetic: "/ˈsʌb.dʒɪkt/", meaning: "পাঠ্য বিষয়", partOfSpeech: "Noun", example: "English is my favourite subject.", icon: "📚" },
          { word: "colour", syllables: ["col", "our"], phonetic: "/ˈkʌl.ər/", meaning: "রং / বর্ণ", partOfSpeech: "Noun", example: "Red is my colour.", icon: "🎨" },
          { word: "flower", syllables: ["flow", "er"], phonetic: "/ˈflaʊ.ər/", meaning: "ফুল", partOfSpeech: "Noun", example: "Rose is my flower.", icon: "🌹" }
        ]
      },
      teacherNotes: "fa-vour-ite এবং foot-ball শব্দের সিলেবল হাততালি দিয়ে ড্রিল করান। পৃষ্ঠা ৫-এর টিক চিহ্ন অনুসারে favourite = most liked তা স্পষ্ট করুন।",
      quickTeachingSteps: [
        "ধাপ ১: শব্দের কার্ডে ক্লিক করে অডিও শোনান।",
        "ধাপ ২: প্রতিটি শব্দের অর্থ খাতায় লিখতে বলুন।",
        "ধাপ ৩: সমস্বরে ড্রিল করান।"
      ]
    },
    {
      id: 3,
      title: "Activity A: Chain Drill (Alex's Rhyme)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৩: চেইন ড্রিল ছন্দ ও নাম-পছন্দ বলা (100% Verbatim)",
      phase: "৩. চেইন ড্রিল পাঠ (Authentic Chain Drill)",
      duration: "৮ মিনিট",
      themeColor: "from-blue-600 to-indigo-600",
      imageEmoji: "🔗 🗣️ 🌹",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Activity A. Chain drill (page 3):",
          "S1: Alex is my name. Football is my game. Red is my colour. Rose is my flower.",
          "S2: (Name) is my name. _____ is my game. _____ is my colour. ______ is my flower.",
          "Continue..................."
        ],
        banglaExplanation: "এনসিটিবি হুবহু চেইন ড্রিল (পৃষ্ঠা ৩):\nশিক্ষার্থী ১: অ্যালেক্স আমার নাম। ফুটবল আমার খেলা। লাল আমার রং। গোলাপ আমার ফুল।\nশিক্ষার্থী ২: (নিজের নাম) আমার নাম। _____ আমার খেলা। _____ আমার রং। _____ আমার ফুল।\nএভাবে ক্লাসের প্রতিটি শিক্ষার্থী পর্যায়ক্রমে চেইন চালিয়ে যাবে।"
      },
      teacherNotes: "শ্রেণিকক্ষের প্রথম বেঞ্চ থেকে শুরু করে শেষ বেঞ্চ পর্যন্ত চেইন ড্রিল করান। প্রতিটি শিক্ষার্থী তার নিজের নাম ও পছন্দের খেলা/রং/ফুল বসিয়ে পুরো ছন্দটি বলবে।",
      quickTeachingSteps: [
        "ধাপ ১: অ্যালেক্সের ছন্দটি শিক্ষক নিজে আবৃত্তি করে শোনান।",
        "ধাপ ২: শিক্ষার্থীদের ছন্দ মিলিয়ে বলতে বলুন।",
        "ধাপ ৩: ক্লাসের পুরো চেইন সফলভাবে সম্পন্ন করুন।"
      ]
    },
    {
      id: 4,
      title: "Activity B: Listen and say (Sakiba & Zahid)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৪: সাকিবা ও জাহিদের হুবহু সংলাপ (100% Verbatim Dialogue)",
      phase: "৪. মূল সংলাপ পাঠ (Authentic Dialogue - Activity B)",
      duration: "৮ মিনিট",
      themeColor: "from-teal-600 to-blue-700",
      imageEmoji: "👧 👦 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Sakiba: Hello, Zahid. What’s your favourite game?",
          "Zahid: Hi, Sakiba! Cricket is my favourite game. And yours?",
          "Sakiba: I like to play football.",
          "Zahid: What’s your favourite subject, Sakiba?",
          "Sakiba: English is my favourite subject.",
          "Zahid: Oh, I like English, too."
        ],
        banglaExplanation: "এনসিটিবি হুবহু সংলাপ (পৃষ্ঠা ৪):\nসাকিবা: হ্যালো, জাহিদ। তোমার প্রিয় খেলা কী?\nজাহিদ: হাই, সাকিবা! ক্রিকেট আমার প্রিয় খেলা। আর তোমার?\nসাকিবা: আমি ফুটবল খেলতে পছন্দ করি।\nজাহিদ: তোমার প্রিয় বিষয় কী, সাকিবা?\nসাকিবা: ইংরেজি আমার প্রিয় বিষয়।\nজাহিদ: ওহ, আমিও ইংরেজি পছন্দ করি।",
        dialogue: [
          { speaker: "Sakiba", team: "Team Sakiba", text: "Hello, Zahid. What’s your favourite game?", avatar: "👧" },
          { speaker: "Zahid", team: "Team Zahid", text: "Hi, Sakiba! Cricket is my favourite game. And yours?", avatar: "👦" },
          { speaker: "Sakiba", team: "Team Sakiba", text: "I like to play football.", avatar: "👧" },
          { speaker: "Zahid", team: "Team Zahid", text: "What’s your favourite subject, Sakiba?", avatar: "👦" },
          { speaker: "Sakiba", team: "Team Sakiba", text: "English is my favourite subject.", avatar: "👧" },
          { speaker: "Zahid", team: "Team Zahid", text: "Oh, I like English, too.", avatar: "👦" }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের দুই দলে ভাগ করে সাকিবা ও জাহিদের চরিত্রে সংলাপ অভিনয় করান (Activity C)। 'And yours?' এবং 'too'-এর ব্যবহার স্পষ্ট করুন।",
      quickTeachingSteps: [
        "ধাপ ১: সংলাপের অডিও কারাওকে চালান।",
        "ধাপ ২: প্রতিটি বাক্যের অর্থ ও এক্সপ্রেশন শিক্ষার্থীদের বুঝিয়ে দিন।",
        "ধাপ ৩: জোড়ায় সংলাপ অভিনয় করান।"
      ]
    },
    {
      id: 5,
      title: "Activity C: Sorting Game — Games vs Subjects vs Colours",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৩–৪: বিষয়, খেলা ও রঙের সর্টিং ল্যাব (Sorting Game)",
      phase: "৫. ইন্টারঅ্যাক্টিভ খেলা ও শ্রেণিবিভাগ (Sorting Game)",
      duration: "৬ মিনিট",
      themeColor: "from-indigo-600 to-purple-600",
      imageEmoji: "🧩 🗂️ 🎯",
      sceneType: "sorting",
      hasVisualStage: true,
      content: {
        englishText: [
          "Sort the words from pages 3-4 into their correct categories:",
          "Games: Football, Cricket",
          "Subjects: English, Bangla, Math",
          "Colours: Red, Blue, Green"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ৩ ও ৪-এর শব্দগুলোকে খেলা (Games) এবং পাঠ্য বিষয় (Subjects)-এর ভিত্তিতে সঠিক বক্সে সাজাও।",
        sortingGame: {
          instruction: "Sort the items from pages 3-4 into Games vs Subjects:",
          categories: {
            cat1: { id: "games", label: "Favourite Games", icon: "⚽", theme: "from-blue-500 to-indigo-600" },
            cat2: { id: "subjects", label: "Favourite Subjects", icon: "📚", theme: "from-purple-500 to-pink-600" }
          },
          items: [
            { id: "i1", label: "Cricket", category: "games", icon: "🏏" },
            { id: "i2", label: "Football", category: "games", icon: "⚽" },
            { id: "i3", label: "English", category: "subjects", icon: "📘" },
            { id: "i4", label: "Bangla", category: "subjects", icon: "📗" },
            { id: "i5", label: "Math", category: "subjects", icon: "📐" }
          ]
        }
      },
      teacherNotes: "স্ক্রিনের সর্টিং গেমে শিক্ষার্থীদের অংশগ্রহণ করান। কোনটি খেলা আর কোনটি পাঠ্য বিষয় তা আলাদা করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষার্থীদের বোর্ডে এসে ড্র্যাগ-অ্যান্ড-ড্রপ করতে বলুন।",
        "ধাপ ২: শব্দগুলোর সঠিক বানান ও উচ্চারণ যাচাই করুন।",
        "ধাপ ৩: অনুশীলনীতে প্রবেশ করুন।"
      ]
    },
    {
      id: 6,
      title: "Let's practise 1: Word Meanings & Tick Marks",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৫: বইয়ের আসল শব্দার্থ যাচাই (Let's Practise 1)",
      phase: "৬. শব্দার্থ যাচাই (Practice Activity 1)",
      duration: "৫ মিনিট",
      themeColor: "from-teal-600 to-emerald-600",
      imageEmoji: "✅ 📖 ✍️",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Let's practise 1. Put tick ( √ ) mark to the correct answer (page 5):",
          "1. Here ‘favourite’ means —",
          "   a) most liked  [ √ ]",
          "   b) disliked",
          "2. Here 'game' means —",
          "   a) sport  [ √ ]",
          "   b) reading book"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ৫-এর Let's practise ১ নম্বর অনুশীলন: সঠিক উত্তরে টিক চিহ্ন দাও। 'favourite' মানে সবচেয়ে পছন্দের (most liked) এবং 'game' মানে খেলাধুলা (sport)।"
      },
      teacherNotes: "শিক্ষার্থীদের পাঠ্যবইয়ের ৫ পৃষ্ঠার ১ নম্বর প্রশ্নে পেনসিল দিয়ে টিক চিহ্ন দিতে বলুন। সমার্থক শব্দ (most liked, sport) খাতায় লেখান।",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডে প্রশ্ন দুটি লিখে শিক্ষার্থীদের কাছ থেকে উত্তর নিন।",
        "ধাপ ২: কেন 'most liked' সঠিক উত্তর তা বুঝিয়ে দিন।",
        "ধাপ ৩: খাতায় টিক চিহ্ন সম্পন্ন করান।"
      ]
    },
    {
      id: 7,
      title: "Let's practise 2: Ask and Answer Questions",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৫: বইয়ের আসল ৩টি প্রশ্নোত্তর (100% Verbatim)",
      phase: "৭. লিখিত ও কথন প্রশ্নোত্তর (Practice Activity 2)",
      duration: "৭ মিনিট",
      themeColor: "from-emerald-600 to-cyan-700",
      imageEmoji: "❓ 📝 🗣️",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Let's practise 2. Ask and answer the following questions (page 5):",
          "a) What is Zahid’s favourite game?",
          "   Ans: Cricket is Zahid’s favourite game.",
          "b) What is Sakiba’s favourite subject?",
          "   Ans: English is Sakiba’s favourite subject.",
          "c) What do Zahid and Sakiba talk about?",
          "   Ans: Zahid and Sakiba talk about their favourite games and subjects."
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ৫-এর Let's practise ২ নম্বর অনুশীলন: পাঠ্যাংশ অনুসারে ৩টি প্রশ্নের উত্তর মুখে মুখে বলো এবং খাতায় লেখো।"
      },
      teacherNotes: "শিক্ষার্থীদের পূর্ণ বাক্যে উত্তর লিখতে উৎসাহিত করুন (Cricket is Zahid's favourite game)। ব্যাকরণ ও ক্যাপিটালিজেশন ঠিক রাখুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রশ্ন ৩টি শিক্ষার্থীদের ভালো করে বুঝিয়ে দিন।",
        "ধাপ ২: মুখে মুখে প্রশ্ন ও উত্তরের ড্রিল করান।",
        "ধাপ ৩: খাতায় উত্তরগুলো নির্ভুল বানানে লিখতে দিন।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "পাঠ মূল্যায়ন ও এনসিটিবি ২০২৬ ব্লুপ্রিন্ট অনুযায়ী প্রিন্টযোগ্য প্রশ্নপত্র",
      phase: "৮. চূড়ান্ত মূল্যায়ন ও বাড়ির কাজ (Evaluation & Assessment)",
      duration: "৪ মিনিট",
      themeColor: "from-cyan-700 to-blue-800",
      imageEmoji: "🏆 📝 🌟",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Outstanding effort! You have completed Lesson 2: Talking about myself.",
          "Key Takeaways:",
          "• To state our favourite game, we say 'Cricket/Football is my favourite game.'",
          "• To express our favorite subject, we say 'English is my favourite subject.'",
          "• 'Favourite' means 'most liked' and 'game' means 'sport.'",
          "Now take the evaluation quiz and download your 20-mark companion worksheet!"
        ],
        banglaExplanation: "চমৎকার অগ্রগতি! তোমরা সফলভাবে ২য় পাঠ সম্পন্ন করেছ। এবার কুইজের উত্তর দাও এবং ২০ নম্বরের প্রিন্টযোগ্য ওয়ার্কশিট অনুশীলন করো।",
        quiz: {
          question: "According to page 4, what is Sakiba's favourite subject?",
          options: [
            "English",
            "Science",
            "Math",
            "Art"
          ],
          answer: "English",
          hint: "Check Sakiba's line on page 4: 'Sakiba: English is my favourite subject.'"
        },
        activityTask: "তোমার নিজের নাম, প্রিয় খেলা, প্রিয় রং, প্রিয় ফুল ও প্রিয় বিষয় দিয়ে খাতায় একটি সুন্দর ৫ লাইনের অনুচ্ছেদ লেখো।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রশংসা করুন এবং ২০ নম্বরের মূল্যায়ন ওয়ার্কশিটটি প্রিন্ট করে পরীক্ষা নেওয়ার ব্যবস্থা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: মূল শিখনফলগুলো এক নজরে শিক্ষার্থীদের সাথে পুনরাবৃত্তি করুন।",
        "ধাপ ২: কুইজে অংশ নিতে বলুন এবং সঠিক উত্তরের ব্যাখ্যা দিন।",
        "ধাপ ৩: ওয়ার্কশিট বাটনে ক্লিক করে মূল্যায়নপত্র ডাউনলোড বা প্রিন্ট করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Primary School Examination Board — Academic Year 2026",
    examTitle: "Class 3 English Assessment — Unit 1, Lesson 2: Talking About Myself",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today (NCTB 2026)",
    time: "40 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Multiple Choice Questions (5 Marks)",
        instruction: "Choose the correct answer and write the letter (a, b, c, or d) in the box:",
        content: [
          {
                    q: "1. What is Zahid's favourite game on page 4?",
                    options: [
                              "a) Football",
                              "b) Cricket",
                              "c) Badminton",
                              "d) Chess"
                    ],
                    answer: "a) Football"
          },
          {
                    q: "2. What does Sakiba like to play?",
                    options: [
                              "a) Football",
                              "b) Cricket",
                              "c) Tennis",
                              "d) Ludo"
                    ],
                    answer: "a) Football"
          },
          {
                    q: "3. 'Favourite' means —",
                    options: [
                              "a) Disliked",
                              "b) Most liked",
                              "c) Boring",
                              "d) Old"
                    ],
                    answer: "a) Disliked"
          },
          {
                    q: "4. In Alex's chain drill, what is his flower?",
                    options: [
                              "a) Lotus",
                              "b) Water lily",
                              "c) Rose",
                              "d) Marigold"
                    ],
                    answer: "a) Lotus"
          },
          {
                    q: "5. 'English is my favourite subject' — who says this on page 4?",
                    options: [
                              "a) Zahid",
                              "b) Alex",
                              "c) Sakiba",
                              "d) Sanjoy"
                    ],
                    answer: "a) Zahid"
          }
]
      },
      {
        type: "fill_in_the_blanks",
        title: "Section B: Fill in the Blanks (Chain Drill & Dialogue) (5 Marks)",
        instruction: "Complete the sentences with appropriate words from pages 3-4:",
        content: [
          "a) Alex is my name. Football is my ____________ .",
          "b) Red is my colour. ____________ is my flower.",
          "c) Cricket is my favourite ____________ . And yours?",
          "d) I like to ____________ football.",
          "e) English is my favourite ____________ ."
        ]
      },
      {
        type: "true_false",
        title: "Section C: Write True or False (5 Marks)",
        instruction: "Write 'True' for correct statements and 'False' for incorrect statements:",
        content: [
          "a) Zahid's favourite subject is Math.  [ _______ ]",
          "b) Zahid likes English too.  [ _______ ]",
          "c) 'Game' means reading book on page 5.  [ _______ ]",
          "d) In Activity A, Alex's colour is Red.  [ _______ ]",
          "e) Sakiba and Zahid talk about their favourite games and subjects.  [ _______ ]"
        ]
      },
      {
        type: "short_questions",
        title: "Section D: Short Answer Questions (Let's Practise p. 5) (5 Marks)",
        instruction: "Answer the following questions in complete sentences based on the textbook:",
        content: [
          "1. What is Zahid’s favourite game?\n   Answer: ________________________________________________________________",
          "2. What is Sakiba’s favourite subject?\n   Answer: ________________________________________________________________",
          "3. What do Zahid and Sakiba talk about?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// LESSON 3: GREETINGS (pp. 6–7) — 100% NCTB 2026 VERBATIM
// =========================================================================
export const CLASSROOM_GREETINGS_SLIDE_DECK: SlideDeck = {
  id: "classroom-greetings",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 1: Greetings, Farewells, Introductions and Numbers",
  lesson: "Lesson 3: Greetings (Activity A, B, C)",
  topic: "Daily Greetings: Good Morning, Afternoon, Evening & Introducing Cousin (pp. 6–7)",
  category: "english",
  thumbnailEmoji: "☀️ 🏫 🌆",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Lesson 3: Greetings",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৬–৭: বিভিন্ন সময়ের সম্ভাষণ ও কাজিনের পরিচয় (Orientation)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-amber-500 to-yellow-600",
      imageEmoji: "☀️ 🏫 👦",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Welcome to Lesson 3: Greetings from pages 6 and 7!",
          "In the morning, we say 'Good morning'. In the afternoon, we say 'Good afternoon'.",
          "In the evening, we say 'Good evening'.",
          "When we introduce someone new, we say 'Nice to meet you'.",
          "Let's practice the classroom greetings and Rahat and Faria's authentic conversation!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা ৩য় শ্রেণির পাঠ্যবইয়ের পৃষ্ঠা ৬ ও ৭-এর 'Greetings' পাঠটি শিখব। সকাল, দুপুর ও সন্ধ্যায় কীভাবে সঠিক সম্ভাষণ জানাতে হয় এবং নতুন কারো সাথে পরিচিত হলে কীভাবে 'Nice to meet you' বলতে হয়, তা আমরা শিখব।"
      },
      teacherNotes: "দিনের বিভিন্ন সময়ের ছবি (সকাল, দুপুর, সন্ধ্যা) দেখিয়ে শিক্ষার্থীদের কাছে জানতে চান: কখন কোন সম্ভাষণ ব্যবহার করতে হয়?",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডের ঘড়িতে সময় দেখিয়ে সকাল, দুপুর ও সন্ধ্যার ধারণা দিন।",
        "ধাপ ২: পৃষ্ঠা ৬-এর শ্রেণিকক্ষের সম্ভাষণ পড়ে শোনান।",
        "ধাপ ৩: শব্দভাণ্ডার ড্রিল করান।"
      ]
    },
    {
      id: 2,
      title: "Key Vocabulary Lab: Greetings & Relationships",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৬–৭: সম্ভাষণ ও সম্পর্কের মূল শব্দভাণ্ডার (Vocabulary Lab)",
      phase: "২. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary & Phonics)",
      duration: "৭ মিনিট",
      themeColor: "from-yellow-600 to-amber-700",
      imageEmoji: "🔤 ☀️ 📘",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Learn key vocabulary words for daily greetings and introductions:"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ৬–৭ এর মূল শব্দগুলোর অর্থ ও সিলেবল ভাঙন শিখে নিই:",
        vocabulary: [
          { word: "afternoon", syllables: ["af", "ter", "noon"], phonetic: "/ˌɑːf.təˈnuːn/", meaning: "দুপুর / বিকাল", partOfSpeech: "Noun", example: "Good afternoon, teacher.", icon: "☀️" },
          { word: "evening", syllables: ["eve", "ning"], phonetic: "/ˈiːv.nɪŋ/", meaning: "সন্ধ্যা", partOfSpeech: "Noun", example: "Good evening, Faria.", icon: "🌆" },
          { word: "cousin", syllables: ["cous", "in"], phonetic: "/ˈkʌz.ən/", meaning: "চাচাতো / মামাতো / খালাতো ভাই বা বোন", partOfSpeech: "Noun", example: "She is my cousin, Rita.", icon: "👧" },
          { word: "friend", syllables: ["friend"], phonetic: "/frend/", meaning: "বন্ধু / সহপাঠী", partOfSpeech: "Noun", example: "He is my friend, Rahat.", icon: "🤝" },
          { word: "meet", syllables: ["meet"], phonetic: "/miːt/", meaning: "সাক্ষাৎ করা / পরিচয় হওয়া", partOfSpeech: "Verb", example: "Nice to meet you.", icon: "👥" }
        ]
      },
      teacherNotes: "af-ter-noon এবং eve-ning শব্দের সিলেবল হাততালি দিয়ে ড্রিল করান। 'cousin' শব্দের সঠিক অর্থ ও উচ্চারণ শিক্ষার্থীদের শেখান।",
      quickTeachingSteps: [
        "ধাপ ১: শব্দের কার্ডে ক্লিক করে অডিও শোনান।",
        "ধাপ ২: প্রতিটি শব্দের অর্থ বোর্ডে লিখে ব্যাখ্যা করুন।",
        "ধাপ ৩: সমস্বরে শিক্ষার্থীদের দিয়ে পাঠ করান।"
      ]
    },
    {
      id: 3,
      title: "Activity A & B: Classroom Greetings (Morning & Afternoon)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৬: শিক্ষক ও শিক্ষার্থীদের শ্রেণিকক্ষ সম্ভাষণ (100% Verbatim)",
      phase: "৩. শ্রেণিকক্ষ সম্ভাষণ পাঠ (Classroom Greetings - Activity A & B)",
      duration: "৭ মিনিট",
      themeColor: "from-amber-600 to-orange-600",
      imageEmoji: "🏫 👨‍🏫 👧",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Activity A (Morning):",
          "Teacher: Good morning, students.",
          "Students: Good morning, teacher.",
          "Activity B (Afternoon):",
          "Teacher: Hello students, Good afternoon.",
          "Students: Good afternoon, teacher."
        ],
        banglaExplanation: "এনসিটিবি হুবহু সম্ভাষণ (পৃষ্ঠা ৬):\nActivity A: শিক্ষক বলেন, 'শুভ সকাল, শিক্ষার্থীরা।' শিক্ষার্থীরা উত্তর দেয়, 'শুভ সকাল, শিক্ষক।'\nActivity B: শিক্ষক বলেন, 'হ্যালো শিক্ষার্থীরা, শুভ বিকাল।' শিক্ষার্থীরা উত্তর দেয়, 'শুভ বিকাল, শিক্ষক।'"
      },
      teacherNotes: "শিক্ষক নিজে ক্লাসে প্রবেশ করে 'Good morning/Good afternoon' বলবেন এবং শিক্ষার্থীরা সমস্বরে সঠিক উত্তর দেবে।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক ও শিক্ষার্থীদের দলগত ভূমিকা অভিনয় করান।",
        "ধাপ ২: সকাল ও দুপুরের অভিবাদনের পার্থক্য স্পষ্ট করুন।",
        "ধাপ ৩: পরবর্তী সন্ধ্যা ও নতুন বন্ধু পরিচিতি সংলাপে যান।"
      ]
    },
    {
      id: 4,
      title: "Activity C: Rahat, Faria and Rita (Introducing a Cousin)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৭: রাহাত, ফারিয়া ও কাজিন রীতার হুবহু সংলাপ (100% Verbatim Dialogue)",
      phase: "৪. মূল সংলাপ পাঠ (Authentic Dialogue - Activity C)",
      duration: "৮ মিনিট",
      themeColor: "from-orange-600 to-amber-700",
      imageEmoji: "👦 👧 👧 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Rahat: Good evening, Faria.",
          "Faria: Good evening, Rahat.",
          "Rahat: Who is she?",
          "Faria: She is my cousin, Rita. And Rita, he is my friend, Rahat.",
          "Rita: Nice to meet you.",
          "Rahat: Nice meeting you, too."
        ],
        banglaExplanation: "এনসিটিবি হুবহু সংলাপ (পৃষ্ঠা ৭):\nরাহাত: শুভ সন্ধ্যা, ফারিয়া।\nফারিয়া: শুভ সন্ধ্যা, রাহাত।\nরাহাত: সে কে?\nফারিয়া: সে আমার কাজিন, রীতা। আর রীতা, সে আমার বন্ধু, রাহাত।\nরীতা: তোমার সাথে দেখা হয়ে ভালো লাগল।\nরাহাত: তোমার সাথে দেখা হয়েও ভালো লাগল।",
        dialogue: [
          { speaker: "Rahat", team: "Rahat", text: "Good evening, Faria.", avatar: "👦" },
          { speaker: "Faria", team: "Faria", text: "Good evening, Rahat.", avatar: "👧" },
          { speaker: "Rahat", team: "Rahat", text: "Who is she?", avatar: "👦" },
          { speaker: "Faria", team: "Faria", text: "She is my cousin, Rita. And Rita, he is my friend, Rahat.", avatar: "👧" },
          { speaker: "Rita", team: "Rita", text: "Nice to meet you.", avatar: "👧" },
          { speaker: "Rahat", team: "Rahat", text: "Nice meeting you, too.", avatar: "👦" }
        ]
      },
      teacherNotes: "৩ জন শিক্ষার্থীকে (রাহাত, ফারিয়া, রীতা) সামনে এনে সংলাপটি অভিনয় করান। 'Nice to meet you' এর উত্তরে 'Nice meeting you, too' বলার ভদ্রতা শেখান।",
      quickTeachingSteps: [
        "ধাপ ১: ৩টি চরিত্রের সংলাপ পড়ে শোনান।",
        "ধাপ ২: 'Who is she?' এবং 'She is my cousin' এর অর্থ বুঝিয়ে দিন।",
        "ধাপ ৩: ক্লাসে ৩ জনের দলে ভাগ করে রিহার্সাল করান।"
      ]
    },
    {
      id: 5,
      title: "Interactive Time of Day Greeting Simulator",
      subtitle: "সময় অনুযায়ী সঠিক সম্ভাষণ বাছাই (Morning, Afternoon, Evening, Night)",
      phase: "৫. ইন্টারঅ্যাক্টিভ সম্ভাষণ ল্যাব (Greeting Simulator)",
      duration: "৬ মিনিট",
      themeColor: "from-amber-600 to-yellow-600",
      imageEmoji: "🕒 ☀️ 🌙",
      sceneType: "sorting",
      hasVisualStage: true,
      content: {
        englishText: [
          "Choose the appropriate greeting according to the time of day:",
          "• Morning (6:00 AM - 11:59 AM) -> Good morning",
          "• Afternoon (12:00 PM - 4:59 PM) -> Good afternoon",
          "• Evening (5:00 PM - 7:59 PM) -> Good evening",
          "• Bedtime / Night -> Good night"
        ],
        banglaExplanation: "দিনের বিভিন্ন প্রহরে সঠিক সম্ভাষণ ব্যবহার করার নিয়ম:\n• সকাল ৬টা থেকে দুপুর ১২টা পর্যন্ত: Good morning\n• দুপুর ১২টা থেকে বিকাল ৫টা পর্যন্ত: Good afternoon\n• সন্ধ্যা ৫টা থেকে রাত ৮টা পর্যন্ত: Good evening\n• রাতে ঘুমানোর সময় বা শেষ বিদায়ের সময়: Good night"
      },
      teacherNotes: "ঘড়ির কাঁটা ঘুরিয়ে শিক্ষার্থীদের কাছে জানতে চান: এখন কোন সম্ভাষণ বলতে হবে?",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডের ঘড়িতে ৮:০০ AM দেখিয়ে 'Good morning' বলান।",
        "ধাপ ২: ২:০০ PM দেখিয়ে 'Good afternoon' বলান।",
        "ধাপ ৩: ৬:৩০ PM দেখিয়ে 'Good evening' বলান।"
      ]
    },
    {
      id: 6,
      title: "Courtesy Focus: 'Nice to meet you' Workshop",
      subtitle: "কারো সাথে প্রথম সাক্ষাতে ভদ্রতা ও সৌজন্য প্রকাশের নিয়ম",
      phase: "৬. কথন ও সৌজন্য শিষ্টাচার (Politeness Workshop)",
      duration: "৫ মিনিট",
      themeColor: "from-yellow-600 to-orange-600",
      imageEmoji: "🤝 🌟 💬",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Polite Expressions for Introductions:",
          "Person 1: 'Nice to meet you.'",
          "Person 2: 'Nice meeting you, too.'",
          "Alternative standard response: 'Nice to meet you, too.'"
        ],
        banglaExplanation: "নতুন কারো সাথে পরিচিত হলে ইংরেজিতে 'Nice to meet you' (তোমার সাথে পরিচয় হয়ে আনন্দিত হলাম) বলা হয়। প্রতিউত্তরে 'Nice meeting you, too' বা 'Nice to meet you, too' বলা হয়।"
      },
      teacherNotes: "শিক্ষার্থীদের হ্যান্ডশেক বা করমর্দনের ভঙ্গি করে একে অপরকে 'Nice to meet you' ও 'Nice meeting you, too' বলতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক নিজে একজন শিক্ষার্থীর সাথে হাত মিলিয়ে ডেমো দিন।",
        "ধাপ ২: ক্লাসের সকল শিক্ষার্থীকে সহপাঠীদের সাথে চর্চা করতে বলুন।",
        "ধাপ ৩: পরবর্তী স্লাইডে যান।"
      ]
    },
    {
      id: 7,
      title: "Let's practise: Preview of Lesson 5 Exercise (p. 11)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১১: Activity C অনুসারে রতন, সালমা ও তানিমের শূন্যস্থান পূরণ",
      phase: "৭. লিখিত অনুশীলন ড্রিল (Practice Activity)",
      duration: "৬ মিনিট",
      themeColor: "from-orange-600 to-amber-700",
      imageEmoji: "✍️ 📋 🎯",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Look at activity C of lesson 3. Write the correct word in the box (page 11):",
          "Roton: Good evening, Salma.",
          "Salma: Good evening, Roton.",
          "Roton: Meet my friend, Tanim. And Tanim, she is my friend, Salma.",
          "Tanim: Nice to meet you.",
          "Salma: Nice meeting you, too."
        ],
        banglaExplanation: "পাঠ্যবইয়ের ১১ পৃষ্ঠার Let's practise ১ নম্বর অনুশীলন: ৩য় পাঠের Activity C-এর আলোকে রতন, সালমা ও তানিমের শূন্যস্থান পূরণ করো।"
      },
      teacherNotes: "শিক্ষার্থীদের খাতায় সংলাপটি সম্পূর্ণ লিখে শূন্যস্থান পূরণ করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডে শূন্যস্থান তুলে শিক্ষার্থীদের সঠিক শব্দ বলতে বলুন।",
        "ধাপ ২: খাতায় পুরো সংলাপটি লিখতে দিন।",
        "ধাপ ৩: মূল্যায়ন কুইজে অংশ নিন।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "পাঠ মূল্যায়ন ও এনসিটিবি ২০২৬ ব্লুপ্রিন্ট অনুযায়ী প্রিন্টযোগ্য প্রশ্নপত্র",
      phase: "৮. চূড়ান্ত মূল্যায়ন ও বাড়ির কাজ (Evaluation & Assessment)",
      duration: "৪ মিনিট",
      themeColor: "from-amber-700 to-orange-800",
      imageEmoji: "🏆 📝 🌟",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed Lesson 3: Greetings.",
          "Key Takeaways:",
          "• In the classroom in the morning, students say 'Good morning, teacher.'",
          "• In the afternoon, students say 'Good afternoon, teacher.'",
          "• To introduce a cousin or friend, we say 'She is my cousin / He is my friend.'",
          "• When meeting someone new, we politely say 'Nice to meet you.'",
          "Now take the evaluation quiz and download your 20-mark companion worksheet!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা সফলভাবে ৩য় পাঠ সম্পন্ন করেছ। এবার কুইজের উত্তর দাও এবং ২০ নম্বরের প্রিন্টযোগ্য ওয়ার্কশিট অনুশীলন করো।",
        quiz: {
          question: "When Rita says 'Nice to meet you' on page 7, what does Rahat reply?",
          options: [
            "Nice meeting you, too.",
            "Good morning, teacher.",
            "Goodbye, see you later.",
            "I'm going to school."
          ],
          answer: "Nice meeting you, too.",
          hint: "Check Rahat's closing line on page 7: 'Rahat: Nice meeting you, too.'"
        },
        activityTask: "তোমার পরিবারের কোনো কাজিন বা বন্ধুর পরিচয় দিয়ে ইংরেজিতে ৩টি বাক্য খাতায় লেখো।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রশংসা করুন এবং ২০ নম্বরের মূল্যায়ন ওয়ার্কশিটটি প্রিন্ট করে পরীক্ষা নেওয়ার ব্যবস্থা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: মূল শিখনফলগুলো পুনরাবৃত্তি করুন।",
        "ধাপ ২: কুইজে অংশ নিতে বলুন।",
        "ধাপ ৩: ওয়ার্কশিট বাটনে ক্লিক করে মূল্যায়নপত্র ডাউনলোড করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Primary School Examination Board — Academic Year 2026",
    examTitle: "Class 3 English Assessment — Unit 1, Lesson 3: Greetings",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today (NCTB 2026)",
    time: "40 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Multiple Choice Questions (5 Marks)",
        instruction: "Choose the correct answer and write the letter (a, b, c, or d) in the box:",
        content: [
          {
                    q: "1. What do students say to the teacher in the morning (page 6)?",
                    options: [
                              "a) Good afternoon, teacher",
                              "b) Good morning, teacher",
                              "c) Goodbye",
                              "d) Good night"
                    ],
                    answer: "a) Good afternoon, teacher"
          },
          {
                    q: "2. What greeting is used at 2:00 PM?",
                    options: [
                              "a) Good morning",
                              "b) Good night",
                              "c) Good afternoon",
                              "d) Hello goodbye"
                    ],
                    answer: "a) Good morning"
          },
          {
                    q: "3. Who is Rita on page 7?",
                    options: [
                              "a) Rahat's sister",
                              "b) Faria's cousin",
                              "c) Teacher",
                              "d) Doctor"
                    ],
                    answer: "a) Rahat's sister"
          },
          {
                    q: "4. When someone says 'Nice to meet you', what is the polite reply?",
                    options: [
                              "a) No thanks",
                              "b) Nice meeting you, too",
                              "c) What is your name",
                              "d) Where are you going"
                    ],
                    answer: "a) No thanks"
          },
          {
                    q: "5. 'Good evening' is used in the —",
                    options: [
                              "a) Morning",
                              "b) Afternoon",
                              "c) Evening",
                              "d) Deep night"
                    ],
                    answer: "a) Morning"
          }
]
      },
      {
        type: "fill_in_the_blanks",
        title: "Section B: Fill in the Blanks (Dialogue on page 7) (5 Marks)",
        instruction: "Complete the dialogue using words from the textbook (page 7):",
        content: [
          "a) Rahat: Good ____________ , Faria.",
          "b) Faria: Good evening, ____________ .",
          "c) Rahat: ____________ is she?",
          "d) Faria: She is my ____________ , Rita.",
          "e) Rita: Nice to ____________ you."
        ]
      },
      {
        type: "true_false",
        title: "Section C: Write True or False (5 Marks)",
        instruction: "Write 'True' for correct statements and 'False' for incorrect statements:",
        content: [
          "a) Rahat and Faria greet each other with 'Good morning' on page 7.  [ _______ ]",
          "b) Rita is Faria's cousin.  [ _______ ]",
          "c) Rahat is Faria's friend.  [ _______ ]",
          "d) In Activity B on page 6, students say 'Good afternoon, teacher.'  [ _______ ]",
          "e) 'Nice meeting you, too' is an impolite expression.  [ _______ ]"
        ]
      },
      {
        type: "short_questions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "Answer the following questions in complete sentences based on the textbook:",
        content: [
          "1. What do students say when the teacher says 'Good morning, students'?\n   Answer: ________________________________________________________________",
          "2. Who introduces Rita to Rahat on page 7?\n   Answer: ________________________________________________________________",
          "3. How do you introduce your friend to someone else?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// LESSON 4: GOODBYE 1 (pp. 8–9) — 100% NCTB 2026 VERBATIM
// =========================================================================
export const GOODBYE_PART1_SLIDE_DECK: SlideDeck = {
  id: "goodbye-part1",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 1: Greetings, Farewells, Introductions and Numbers",
  lesson: "Lesson 4: Goodbye 1 (Activity A, B, C, D)",
  topic: "Saying Goodbye & Asking Where Someone is Going (pp. 8–9)",
  category: "english",
  thumbnailEmoji: "👋 🎒 🏥",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Lesson 4: Goodbye 1",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৮–৯: বিদায় সম্ভাষণ ও গন্তব্য জিজ্ঞাসা (Orientation)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-blue-600 to-indigo-600",
      imageEmoji: "👋 🎒 🏫",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Welcome to Lesson 4: Goodbye 1 from pages 8 and 9!",
          "When school is over or we leave our friends, we say 'Goodbye'.",
          "When we meet someone on the street, we can ask 'Where are you going?'",
          "Let's practice the classroom dismissal and Rahat and Namira's authentic conversation!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা ৩য় শ্রেণির ইংরেজি পাঠ্যবইয়ের পৃষ্ঠা ৮ ও ৯-এর 'Goodbye 1' পাঠটি শিখব। স্কুল ছুটির পর শিক্ষক ও সহপাঠীদের কীভাবে বিদায় জানাতে হয় এবং রাস্তায় কারো সাথে দেখা হলে কীভাবে 'Where are you going?' (তুমি কোথায় যাচ্ছ?) জিজ্ঞেস করতে হয়, তা আমরা শিখব।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: স্কুল ছুটির সময় তারা শিক্ষক ও সহপাঠীদের কী বলে বিদায় জানায়? হাত নেড়ে 'Goodbye' ড্রিল করান।",
      quickTeachingSteps: [
        "ধাপ ১: হাত নেড়ে 'Goodbye' বলে পাঠ শুরু করুন।",
        "ধাপ ২: পৃষ্ঠা ৮-এর স্কুল ছুটির ছবি দেখিয়ে মনোযোগ আকর্ষণ করুন।",
        "ধাপ ৩: মূল শব্দভাণ্ডার ল্যাবে প্রবেশ করুন।"
      ]
    },
    {
      id: 2,
      title: "Key Vocabulary Lab: Farewells & Places",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৮–৯: বিদায় সম্ভাষণ ও প্রয়োজনীয় শব্দভাণ্ডার (Vocabulary Lab)",
      phase: "২. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary & Phonics)",
      duration: "৭ মিনিট",
      themeColor: "from-indigo-600 to-purple-600",
      imageEmoji: "🔤 👋 📘",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Learn key vocabulary words for farewells and daily activities:"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ৮–৯ এর মূল শব্দগুলোর অর্থ ও উচ্চারণ শিখে নিই:",
        vocabulary: [
          { word: "goodbye", syllables: ["good", "bye"], phonetic: "/ˌɡʊdˈbaɪ/", meaning: "বিদায়", partOfSpeech: "Interjection", example: "Goodbye, teacher.", icon: "👋" },
          { word: "time", syllables: ["time"], phonetic: "/taɪm/", meaning: "সময়", partOfSpeech: "Noun", example: "It’s time to go.", icon: "⏰" },
          { word: "medicines", syllables: ["med", "i", "cines"], phonetic: "/ˈmed.sənz/", meaning: "ঔষধপত্র", partOfSpeech: "Noun", example: "I’m going to buy some medicines.", icon: "💊" },
          { word: "later", syllables: ["la", "ter"], phonetic: "/ˈleɪ.tər/", meaning: "পরে / পরবর্তীতে", partOfSpeech: "Adverb", example: "See you later.", icon: "⏳" },
          { word: "going", syllables: ["go", "ing"], phonetic: "/ˈɡəʊ.ɪŋ/", meaning: "যাচ্ছি / গমনরত", partOfSpeech: "Verb", example: "Where are you going?", icon: "🚶" }
        ]
      },
      teacherNotes: "med-i-cines শব্দের সিলেবল হাততালি দিয়ে ড্রিল করান। 'See you later' (পরে দেখা হবে) শিষ্টাচার বাক্যের অর্থ স্পষ্ট করুন।",
      quickTeachingSteps: [
        "ধাপ ১: শব্দের কার্ডে ক্লিক করে সঠিক অডিও উচ্চারণ শিক্ষার্থীদের শোনান।",
        "ধাপ ২: প্রতিটি শব্দের অর্থ বোর্ডে লিখে ব্যাখ্যা করুন।",
        "ধাপ ৩: সমস্বরে শিক্ষার্থীদের দিয়ে উচ্চারণ করান।"
      ]
    },
    {
      id: 3,
      title: "Activity A & B: Classroom Dismissal (Goodbye, Teacher)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৮: শিক্ষক ও শিক্ষার্থীদের বিদায় সম্ভাষণ (100% Verbatim)",
      phase: "৩. শ্রেণিকক্ষ বিদায় পাঠ (Classroom Dismissal - Activity A & B)",
      duration: "৭ মিনিট",
      themeColor: "from-purple-600 to-indigo-700",
      imageEmoji: "🏫 🎒 👨‍🏫",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Activity A (Class Dismissal):",
          "Teacher: Goodbye, students. It’s time to go.",
          "Students: Goodbye, teacher.",
          "Activity B (Individual Student Dismissal):",
          "Teacher: Goodbye, Ripa.",
          "Ripa: Goodbye, teacher."
        ],
        banglaExplanation: "এনসিটিবি হুবহু সম্ভাষণ (পৃষ্ঠা ৮):\nActivity A: শিক্ষক বলেন, 'বিদায়, শিক্ষার্থীরা। এখন যাওয়ার সময় হয়েছে।' শিক্ষার্থীরা উত্তর দেয়, 'বিদায়, শিক্ষক।'\nActivity B: শিক্ষক বলেন, 'বিদায়, রিপা।' রিপা উত্তর দেয়, 'বিদায়, শিক্ষক।'"
      },
      teacherNotes: "শিক্ষক নিজে ক্লাসের শেষ মুহূর্তে ডেমো হিসেবে শিক্ষার্থীদের 'Goodbye, students' বলবেন এবং রিপা চরিত্রে শিক্ষার্থীদের ডেকে অনুশীলন করাবেন।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক ও শিক্ষার্থীদের দলগত ভূমিকা অভিনয় করান।",
        "ধাপ ২: 'It's time to go' (যাওয়ার সময় হয়েছে) বাক্যটির অর্থ স্পষ্ট করুন।",
        "ধাপ ৩: পরবর্তী রাস্তায় দেখা হওয়ার সংলাপে যান।"
      ]
    },
    {
      id: 4,
      title: "Activity C: Rahat & Namira (Where are you going?)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৯: রাহাত ও নামিরার হুবহু সংলাপ (100% Verbatim Dialogue)",
      phase: "৪. মূল সংলাপ পাঠ (Authentic Dialogue - Activity C)",
      duration: "৮ মিনিট",
      themeColor: "from-blue-600 to-cyan-600",
      imageEmoji: "👦 👧 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Rahat: Hello Namira, how are you?",
          "Namira: I’m fine, thanks. And you?",
          "Rahat: I’m good. Where are you going?",
          "Namira: I’m going to buy some medicines.",
          "Rahat: Okay, goodbye. See you later.",
          "Namira: Goodbye!"
        ],
        banglaExplanation: "এনসিটিবি হুবহু সংলাপ (পৃষ্ঠা ৯):\nরাহাত: হ্যালো নামিরা, তুমি কেমন আছ?\nনামিরা: আমি ভালো আছি, ধন্যবাদ। আর তুমি?\nরাহাত: আমি ভালো আছি। তুমি কোথায় যাচ্ছ?\nনামিরা: আমি কিছু ঔষধ কিনতে যাচ্ছি।\nরাহাত: ঠিক আছে, বিদায়। পরে দেখা হবে।\nনামিরা: বিদায়!",
        dialogue: [
          { speaker: "Rahat", team: "Rahat", text: "Hello Namira, how are you?", avatar: "👦" },
          { speaker: "Namira", team: "Namira", text: "I’m fine, thanks. And you?", avatar: "👧" },
          { speaker: "Rahat", team: "Rahat", text: "I’m good. Where are you going?", avatar: "👦" },
          { speaker: "Namira", team: "Namira", text: "I’m going to buy some medicines.", avatar: "👧" },
          { speaker: "Rahat", team: "Rahat", text: "Okay, goodbye. See you later.", avatar: "👦" },
          { speaker: "Namira", team: "Namira", text: "Goodbye!", avatar: "👧" }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের দুই দলে ভাগ করে রাহাত ও নামিরার চরিত্রে সংলাপ অভিনয় করান (Activity D)। 'Where are you going?' এবং 'See you later' এর ব্যবহার চর্চা করান।",
      quickTeachingSteps: [
        "ধাপ ১: সংলাপের অডিও কারাওকে চালিয়ে শোনান।",
        "ধাপ ২: প্রতিটি বাক্যের অর্থ ও অঙ্গভঙ্গি বুঝিয়ে দিন।",
        "ধাপ ৩: জোড়ায় সংলাপ অভিনয় করান।"
      ]
    },
    {
      id: 5,
      title: "Activity D: Roleplay Simulator — Where are you going?",
      subtitle: "বিভিন্ন গন্তব্য নিয়ে ইংরেজিতে প্রশ্ন ও উত্তর চর্চা (Roleplay Simulator)",
      phase: "৫. ইন্টারঅ্যাক্টিভ কথন ল্যাব (Speaking Simulator)",
      duration: "৬ মিনিট",
      themeColor: "from-teal-600 to-emerald-600",
      imageEmoji: "🚶 🏥 🏫",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice asking and answering with different destinations (page 9):",
          "• Student A: 'Where are you going?'",
          "• Student B: 'I'm going to buy some medicines.' (Textbook p. 9)",
          "• Student B: 'I'm going to the nearby shop.' (Textbook p. 11)",
          "• Student B: 'I'm going to school.' / 'I'm going home.'",
          "• Student A: 'Okay, goodbye. See you later!'",
          "• Student B: 'Goodbye!'"
        ],
        banglaExplanation: "বাস্তব জীবনের বিভিন্ন গন্তব্যের সাথে মিলিয়ে ইংরেজিতে প্রশ্ন করো ও উত্তর দাও। 'Where are you going?' (তুমি কোথায় যাচ্ছ?) এর উত্তরে 'I'm going to...' ব্যবহার করো।"
      },
      teacherNotes: "শিক্ষার্থীদের ভিন্ন ভিন্ন স্থান (দোকান, ফার্মেসি, স্কুল, বাড়ি) বোর্ডে লিখে দিয়ে জোড়ায় কথা বলতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডে মডেল প্রশ্ন ও উত্তর লিখুন।",
        "ধাপ ২: শিক্ষার্থীদের জোড়ায় সংলাপ তৈরি করতে দিন।",
        "ধাপ ৩: শিক্ষকের সামনে ডেমো অভিনয় করান।"
      ]
    },
    {
      id: 6,
      title: "Grammar Focus: Present Continuous & Polite Farewells",
      subtitle: "চলমান বর্তমান কাল (Going) ও বিদায়কালীন ভদ্রতা প্রকাশ",
      phase: "৬. ব্যাকরণ ও বাক্য গঠন (Grammar Focus)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-600 to-cyan-700",
      imageEmoji: "🧩 💡 📝",
      sceneType: "grammar",
      hasVisualStage: true,
      content: {
        englishText: [
          "Grammar Rule: Present Continuous for Current Action",
          "• I am going to buy medicines. (I am + verb-ing)",
          "• Where are you going? (Question form)",
          "Polite Parting Phrases:",
          "• 'It's time to go.' (যাওয়ার সময় হয়েছে)",
          "• 'See you later.' (পরে দেখা হবে)",
          "• 'See you again.' (আবার দেখা হবে)"
        ],
        banglaExplanation: "বর্তমানে কোনো কাজ ঘটছে বা কোথাও যাচ্ছি বোঝাতে Present Continuous Tense ব্যবহৃত হয়:\nI am going to buy some medicines.\nবিদায় জানানোর ভদ্র বাক্যগুলো মনে রাখো: 'See you later', 'See you tomorrow'।"
      },
      teacherNotes: "ভার্বের সাথে '-ing' যোগ করে বর্তমান কাজের রূপ শিক্ষার্থীদের বুঝিয়ে দিন (go -> going, buy -> buying)।",
      quickTeachingSteps: [
        "ধাপ ১: নিয়মের উদাহরণ বোর্ডে লিখুন।",
        "ধাপ ২: শিক্ষার্থীদের দিয়ে নতুন বাক্য তৈরি করান।",
        "ধাপ ৩: কুইজে যাওয়ার প্রস্তুতি নিন।"
      ]
    },
    {
      id: 7,
      title: "Preview of Lesson 5 Exercise (Asif & Rina Dialogue p. 11)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১১: Activity C অনুসারে আসিফ ও রীনার শূন্যস্থান পূরণ",
      phase: "৭. লিখিত অনুশীলন ড্রিল (Practice Activity)",
      duration: "৬ মিনিট",
      themeColor: "from-cyan-700 to-blue-700",
      imageEmoji: "✍️ 📋 🎯",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Look at activity C of lesson 4. Write the correct words in the box (page 11):",
          "Asif: Hello Rina, how are you?",
          "Rina: I’m fine, thanks. And you?",
          "Asif: I’m good. Where are you going?",
          "Rina: I’m going to the nearby shop.",
          "Asif: Okay, goodbye. See you later.",
          "Rina: Goodbye!"
        ],
        banglaExplanation: "পাঠ্যবইয়ের ১১ পৃষ্ঠার Let's practise ২ নম্বর অনুশীলন: ৪র্থ পাঠের Activity C-এর আলোকে আসিফ ও রীনার শূন্যস্থান পূরণ করো।"
      },
      teacherNotes: "শিক্ষার্থীদের খাতায় সংলাপটি সম্পূর্ণ লিখে শূন্যস্থান পূরণ করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডে শূন্যস্থান তুলে শিক্ষার্থীদের সঠিক শব্দ বলতে বলুন।",
        "ধাপ ২: খাতায় পুরো সংলাপটি লিখতে দিন।",
        "ধাপ ৩: মূল্যায়ন কুইজে অংশ নিন।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "পাঠ মূল্যায়ন ও এনসিটিবি ২০২৬ ব্লুপ্রিন্ট অনুযায়ী প্রিন্টযোগ্য প্রশ্নপত্র",
      phase: "৮. চূড়ান্ত মূল্যায়ন ও বাড়ির কাজ (Evaluation & Assessment)",
      duration: "৪ মিনিট",
      themeColor: "from-blue-700 to-indigo-800",
      imageEmoji: "🏆 📝 🌟",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed Lesson 4: Goodbye 1.",
          "Key Takeaways:",
          "• When class ends, the teacher says 'Goodbye, students. It’s time to go.'",
          "• Students reply politely 'Goodbye, teacher.'",
          "• To ask someone's destination, we say 'Where are you going?'",
          "• Namira is going to buy some medicines on page 9.",
          "• Before parting, we say 'Okay, goodbye. See you later.'",
          "Now take the evaluation quiz and download your 20-mark companion worksheet!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা সফলভাবে ৪র্থ পাঠ সম্পন্ন করেছ। এবার কুইজের উত্তর দাও এবং ২০ নম্বরের প্রিন্টযোগ্য ওয়ার্কশিট অনুশীলন করো।",
        quiz: {
          question: "Where is Namira going when Rahat meets her on page 9?",
          options: [
            "To buy some medicines",
            "To school",
            "To play cricket",
            "To the railway station"
          ],
          answer: "To buy some medicines",
          hint: "Check Namira's line on page 9: 'Namira: I’m going to buy some medicines.'"
        },
        activityTask: "রাস্তায় বন্ধুর সাথে দেখা হলে কীভাবে ইংরেজিতে কুশল ও গন্তব্য জিজ্ঞেস করবে, তা নিয়ে ৪ লাইনের একটি সংলাপ খাতায় লেখো।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রশংসা করুন এবং ২০ নম্বরের মূল্যায়ন ওয়ার্কশিটটি প্রিন্ট করে পরীক্ষা নেওয়ার ব্যবস্থা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: মূল শিখনফলগুলো এক নজরে শিক্ষার্থীদের সাথে পুনরাবৃত্তি করুন।",
        "ধাপ ২: কুইজে অংশ নিতে বলুন।",
        "ধাপ ৩: ওয়ার্কশিট বাটনে ক্লিক করে মূল্যায়নপত্র ডাউনলোড করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Primary School Examination Board — Academic Year 2026",
    examTitle: "Class 3 English Assessment — Unit 1, Lesson 4: Goodbye 1",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today (NCTB 2026)",
    time: "40 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Multiple Choice Questions (5 Marks)",
        instruction: "Choose the correct answer and write the letter (a, b, c, or d) in the box:",
        content: [
          {
                    q: "1. What does the teacher say when it is time to leave the classroom (page 8)?",
                    options: [
                              "a) Good morning, students",
                              "b) Goodbye, students. It’s time to go",
                              "c) Where are you going",
                              "d) What is your name"
                    ],
                    answer: "a) Good morning, students"
          },
          {
                    q: "2. Where is Namira going on page 9?",
                    options: [
                              "a) To buy medicines",
                              "b) To play football",
                              "c) To library",
                              "d) To Kushtia"
                    ],
                    answer: "a) To buy medicines"
          },
          {
                    q: "3. What does Rahat say before saying Goodbye on page 9?",
                    options: [
                              "a) See you tomorrow",
                              "b) See you later",
                              "c) Nice to meet you",
                              "d) Good night"
                    ],
                    answer: "a) See you tomorrow"
          },
          {
                    q: "4. Who says 'Goodbye, teacher' in Activity B on page 8?",
                    options: [
                              "a) Namira",
                              "b) Faria",
                              "c) Ripa",
                              "d) Sima"
                    ],
                    answer: "a) Namira"
          },
          {
                    q: "5. 'Where are you going?' asks about a person's —",
                    options: [
                              "a) Age",
                              "b) Name",
                              "c) Destination / Place",
                              "d) Favourite colour"
                    ],
                    answer: "a) Age"
          }
]
      },
      {
        type: "fill_in_the_blanks",
        title: "Section B: Fill in the Blanks (Dialogue on page 9) (5 Marks)",
        instruction: "Complete the dialogue using words from the textbook (page 9):",
        content: [
          "a) Rahat: Hello Namira, how ____________ you?",
          "b) Namira: I’m fine, ____________ . And you?",
          "c) Rahat: I’m good. Where are you ____________ ?",
          "d) Namira: I’m going to buy some ____________ .",
          "e) Rahat: Okay, goodbye. See you ____________ ."
        ]
      },
      {
        type: "true_false",
        title: "Section C: Write True or False (5 Marks)",
        instruction: "Write 'True' for correct statements and 'False' for incorrect statements:",
        content: [
          "a) Namira is going to school on page 9.  [ _______ ]",
          "b) 'It’s time to go' means class dismissal time.  [ _______ ]",
          "c) Rahat says 'See you later' to Namira.  [ _______ ]",
          "d) Ripa says 'Good morning' when leaving school on page 8.  [ _______ ]",
          "e) 'Medicines' means ঔষধ.  [ _______ ]"
        ]
      },
      {
        type: "short_questions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "Answer the following questions in complete sentences based on the textbook:",
        content: [
          "1. What does the teacher say to the students on page 8?\n   Answer: ________________________________________________________________",
          "2. Where is Namira going in Activity C on page 9?\n   Answer: ________________________________________________________________",
          "3. How do you say goodbye to your teacher when school is over?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// LESSON 5: GOODBYE 2 (pp. 10–11) — 100% NCTB 2026 VERBATIM
// =========================================================================
export const GOODBYE_SONG_SLIDE_DECK: SlideDeck = {
  id: "goodbye-song",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 1: Greetings, Farewells, Introductions and Numbers",
  lesson: "Lesson 5: Goodbye 2 (Activity A, B, C & Let's practise)",
  topic: "Night Greetings & The Goodbye Song (pp. 10–11)",
  category: "english",
  thumbnailEmoji: "🌙 🎵 🏠",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Lesson 5: Goodbye 2",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১০–১১: রাতের বিদায় সম্ভাষণ ও বিদায় গান (Orientation)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-indigo-600 to-purple-600",
      imageEmoji: "🌙 🎵 👦",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Welcome to Lesson 5: Goodbye 2 from pages 10 and 11!",
          "At night, we say 'Good night, see you tomorrow'.",
          "When we finish our school activities, we can sing the joyful Goodbye Song!",
          "Let's practice the night greetings and sing the authentic textbook song together!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা ৩য় শ্রেণির ইংরেজি পাঠ্যবইয়ের পৃষ্ঠা ১০ ও ১১-এর 'Goodbye 2' পাঠটি শিখব। রাতে ঘুমানোর পূর্বে বা রাতে দেখা শেষে কীভাবে 'Good night' বলতে হয় এবং ক্লাসের সকলে মিলে কীভাবে মিষ্টি সুরে 'The Goodbye Song' গাইতে হয়, তা আমরা শিখব।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: রাতে ঘুমাতে যাওয়ার সময় তারা মা-বাবা ও ভাইবোনদের কী বলে? 'Good night'-এর ব্যবহার ক্লাসে আলোচনা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: রাতের চাঁদের ছবি দেখিয়ে 'Good night' ড্রিল করান।",
        "ধাপ ২: ১০ পৃষ্ঠার বিদায় গানটির ছন্দ শিক্ষার্থীদের শোনান।",
        "ধাপ ৩: শব্দভাণ্ডার ল্যাবে প্রবেশ করুন।"
      ]
    },
    {
      id: 2,
      title: "Key Vocabulary Lab: Rhyme & Night Words",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১০–১১: গানের শব্দ ও ছন্দবিজ্ঞান (Vocabulary Lab)",
      phase: "২. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary & Phonics)",
      duration: "৭ মিনিট",
      themeColor: "from-purple-600 to-pink-600",
      imageEmoji: "🔤 🌙 📘",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Learn key vocabulary and rhyming words from the Goodbye Song:"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ১০ ও ১১ এর মূল শব্দগুলোর অর্থ ও সিলেবল ভাঙন শিখে নিই:",
        vocabulary: [
          { word: "night", syllables: ["night"], phonetic: "/naɪt/", meaning: "রাত / রজনী", partOfSpeech: "Noun", example: "Good night, see you tomorrow.", icon: "🌙" },
          { word: "tomorrow", syllables: ["to", "mor", "row"], phonetic: "/təˈmɒr.əʊ/", meaning: "আগামীকাল", partOfSpeech: "Noun/Adverb", example: "See you tomorrow.", icon: "📅" },
          { word: "home", syllables: ["home"], phonetic: "/həʊm/", meaning: "বাড়ি / নিজ গৃহ", partOfSpeech: "Noun", example: "It’s time to go home.", icon: "🏠" },
          { word: "fun", syllables: ["fun"], phonetic: "/fʌn/", meaning: "আনন্দ / মজা", partOfSpeech: "Noun", example: "I had so much fun.", icon: "🎉" },
          { word: "again", syllables: ["a", "gain"], phonetic: "/əˈɡen/", meaning: "আবার / পুনরায়", partOfSpeech: "Adverb", example: "See you again.", icon: "🔄" }
        ]
      },
      teacherNotes: "to-mor-row এবং a-gain শব্দের সিলেবল হাততালি দিয়ে ড্রিল করান। 'fun' ও 'home' শব্দের উচ্চারণ স্পষ্ট করুন।",
      quickTeachingSteps: [
        "ধাপ ১: শব্দের কার্ডে ক্লিক করে সঠিক অডিও উচ্চারণ শিক্ষার্থীদের শোনান।",
        "ধাপ ২: প্রতিটি শব্দের অর্থ বোর্ডে লিখে ব্যাখ্যা করুন।",
        "ধাপ ৩: সমস্বরে শিক্ষার্থীদের দিয়ে পাঠ করান।"
      ]
    },
    {
      id: 3,
      title: "Activity A: Night Farewells (Good night)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১০: রাতে বিদায় নেওয়ার হুবহু বাক্য (100% Verbatim)",
      phase: "৩. রাতের সম্ভাষণ পাঠ (Authentic Night Greetings - Activity A)",
      duration: "৬ মিনিট",
      themeColor: "from-indigo-700 to-purple-800",
      imageEmoji: "🌙 🛌 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Speaker 1: Good night, see you tomorrow.",
          "Speaker 2: Good night, see you in the morning."
        ],
        banglaExplanation: "এনসিটিবি হুবহু সম্ভাষণ (পৃষ্ঠা ১০):\nবক্তা ১: শুভ রাত্রি, আগামীকাল দেখা হবে।\nবক্তা ২: শুভ রাত্রি, সকালে দেখা হবে।"
      },
      teacherNotes: "শিক্ষার্থীদের শেখান যে রাতে বিদায়ের সময় বা ঘুমাতে যাওয়ার সময় 'Good night' বলা হয় এবং পরদিনের জন্য 'see you tomorrow' বা 'see you in the morning' বলা হয়।",
      quickTeachingSteps: [
        "ধাপ ১: রাতের সম্ভাষণের মডেল অডিও চালান।",
        "ধাপ ২: শিক্ষার্থীদের জোড়ায় সংলাপটি বলতে বলুন।",
        "ধাপ ৩: বিদায় গানে প্রবেশ করুন।"
      ]
    },
    {
      id: 4,
      title: "Activity B: The Goodbye Song (Listen and Sing)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১০: এনসিটিবির হুবহু বিদায় গান (100% Verbatim Song)",
      phase: "৪. মূল সঙ্গীত পাঠ (Authentic Rhyme Song - Activity B)",
      duration: "৮ মিনিট",
      themeColor: "from-pink-600 to-purple-700",
      imageEmoji: "🎵 🎤 🌟",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "It’s time to go home,",
          "It’s time to go home,",
          "It’s time to go home,",
          "It’s time to say goodbye.",
          "I had so much fun,",
          "And you had so much fun,",
          "We all had so much fun,",
          "And now we say goodbye.",
          "Goodbye, Goodbye,",
          "See you again.",
          "Goodbye, Goodbye,",
          "See you again."
        ],
        banglaExplanation: "এনসিটিবি হুবহু বিদায় গান (পৃষ্ঠা ১০):\nএখন বাড়ি যাওয়ার সময় হয়েছে,\nএখন বাড়ি যাওয়ার সময় হয়েছে,\nএখন বাড়ি যাওয়ার সময় হয়েছে,\nএখন বিদায় বলার সময় হয়েছে।\nআমি অনেক মজা করেছি,\nএবং তুমিও অনেক মজা করেছ,\nআমরা সবাই অনেক মজা করেছি,\nআর এখন আমরা বিদায় জানাচ্ছি।\nবিদায়, বিদায়,\nআবার দেখা হবে।\nবিদায়, বিদায়,\nআবার দেখা হবে।"
      },
      teacherNotes: "শিক্ষক নিজে হাততালি দিয়ে তাল মিলিয়ে গানটি প্রথমে গেয়ে শোনাবেন। শিক্ষার্থীরা গানের রিদম অনুসরণ করে দলগতভাবে গাইবে (Activity C)।",
      quickTeachingSteps: [
        "ধাপ ১: অডিও কারাওকে চালিয়ে গানের সুর ও ছন্দ শোনান।",
        "ধাপ ২: লাইন ধরে ধরে শিক্ষার্থীদের দিয়ে আবৃত্তি করান।",
        "ধাপ ৩: সমস্বরে হাততালি দিয়ে গানটি গান।"
      ]
    },
    {
      id: 5,
      title: "Activity C: Group Work — Sing the song in groups",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১০: দলগত সঙ্গীত পরিবেশনা (Group Singing)",
      phase: "৫. দলগত পরিবেশনা ল্যাব (Group Karaoke)",
      duration: "৬ মিনিট",
      themeColor: "from-purple-600 to-indigo-600",
      imageEmoji: "👥 🎶 👏",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Group work. Sing the song in groups (page 10):",
          "• Group 1: Stanza 1 ('It's time to go home...')",
          "• Group 2: Stanza 2 ('I had so much fun...')",
          "• All Groups together: Chorus ('Goodbye, Goodbye, See you again.')"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ১০ Activity C: ক্লাসের শিক্ষার্থীরা ছোট ছোট দলে ভাগ হয়ে গানটি সুরে সুরে পরিবেশন করো।"
      },
      teacherNotes: "দল ১, দল ২ ও দল ৩-কে ক্রমানুসারে গাইতে বলুন। ক্লাসে আনন্দের পরিবেশ সৃষ্টি করুন।",
      quickTeachingSteps: [
        "ধাপ ১: গ্রুপ ১-কে প্রথম স্তবক গাইতে বলুন।",
        "ধাপ ২: গ্রুপ ২-কে দ্বিতীয় স্তবক গাইতে বলুন।",
        "ধাপ ৩: সমস্বরে কোরাস গাওয়ান।"
      ]
    },
    {
      id: 6,
      title: "Let's practise 1: Roton, Salma & Tanim (p. 11)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১১: লেসন ৩-এর আলোকে সংলাপের শূন্যস্থান পূরণ (100% Verbatim)",
      phase: "৬. লিখিত অনুশীলন ১ (Practice Activity 1)",
      duration: "৬ মিনিট",
      themeColor: "from-indigo-600 to-blue-600",
      imageEmoji: "✍️ 📋 🎯",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Let's practise 1. Look at activity C of lesson 3. Write the correct word in the box (page 11):",
          "Roton : Good evening, Salma.",
          "Salma : Good evening, Roton.",
          "Roton : Meet my friend, Tanim. And Tanim, she is my friend, Salma.",
          "Tanim : Nice to meet you.",
          "Salma : Nice meeting you, too."
        ],
        banglaExplanation: "পাঠ্যবইয়ের ১১ পৃষ্ঠার Let's practise ১ নম্বর অনুশীলন: ৩য় পাঠের আলোকে বক্সের সঠিক শব্দ বসিয়ে রতন, সালমা ও তানিমের সংলাপ পূরণ করো।"
      },
      teacherNotes: "শিক্ষার্থীদের পাঠ্যবইয়ের ১১ পৃষ্ঠায় পেনসিল দিয়ে শব্দগুলো লিখতে বলুন। 'meet' এবং 'Nice' সঠিক বানানে লেখা যাচাই করুন।",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডে শূন্যস্থান তুলে শিক্ষার্থীদের উত্তর দিতে বলুন।",
        "ধাপ ২: খাতায় পুরো সংলাপটি লিখতে দিন।",
        "ধাপ ৩: সঠিক উত্তর মিলিয়ে দিন।"
      ]
    },
    {
      id: 7,
      title: "Let's practise 2: Asif & Rina (p. 11)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১১: লেসন ৪-এর আলোকে সংলাপের শূন্যস্থান পূরণ (100% Verbatim)",
      phase: "৭. লিখিত অনুশীলন ২ (Practice Activity 2)",
      duration: "৬ মিনিট",
      themeColor: "from-blue-600 to-cyan-600",
      imageEmoji: "✍️ 📋 🎯",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Let's practise 2. Look at activity C of lesson 4. Write the correct word/words in the box (page 11):",
          "Asif : Hello Rina, how are you?",
          "Rina : I’m fine, thanks. And you?",
          "Asif : I’m good. Where are you going?",
          "Rina : I’m going to the nearby shop.",
          "Asif : Okay, goodbye. See you later.",
          "Rina : Goodbye!"
        ],
        banglaExplanation: "পাঠ্যবইয়ের ১১ পৃষ্ঠার Let's practise ২ নম্বর অনুশীলন: ৪র্থ পাঠের আলোকে বক্সের সঠিক শব্দ বসিয়ে আসিফ ও রীনার সংলাপ পূরণ করো।"
      },
      teacherNotes: "শিক্ষার্থীদের খাতায় পুরো সংলাপটি নির্ভুল বানানে লিখতে দিন। 'fine, thanks', 'Where', 'See you later' যাচাই করুন।",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডে শূন্যস্থানগুলো তুলুন।",
        "ধাপ ২: শিক্ষার্থীদের মুখে মুখে বলতে বলুন।",
        "ধাপ ৩: খাতায় সম্পন্ন করান।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "পাঠ মূল্যায়ন ও এনসিটিবি ২০২৬ ব্লুপ্রিন্ট অনুযায়ী প্রিন্টযোগ্য প্রশ্নপত্র",
      phase: "৮. চূড়ান্ত মূল্যায়ন ও বাড়ির কাজ (Evaluation & Assessment)",
      duration: "৪ মিনিট",
      themeColor: "from-cyan-600 to-teal-700",
      imageEmoji: "🏆 📝 🌟",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Outstanding job! You have completed Lesson 5: Goodbye 2.",
          "Key Takeaways:",
          "• At bedtime, we say 'Good night, see you tomorrow.'",
          "• The Goodbye Song celebrates having fun together at school: 'I had so much fun, and you had so much fun.'",
          "• We end our song with 'Goodbye, Goodbye, See you again.'",
          "Now take the evaluation quiz and download your 20-mark companion worksheet!"
        ],
        banglaExplanation: "চমৎকার অগ্রগতি! তোমরা সফলভাবে ৫ম পাঠ সম্পন্ন করেছ। এবার কুইজের উত্তর দাও এবং ২০ নম্বরের প্রিন্টযোগ্য ওয়ার্কশিট অনুশীলন করো।",
        quiz: {
          question: "According to the Goodbye Song on page 10, what is it time to do?",
          options: [
            "It’s time to go home, It’s time to say goodbye",
            "It's time to play football",
            "It's time to buy medicines",
            "It's time to sleep in the morning"
          ],
          answer: "It’s time to go home, It’s time to say goodbye",
          hint: "Check Stanza 1 on page 10: 'It’s time to go home, It’s time to say goodbye.'"
        },
        activityTask: "The Goodbye Song-এর ৪ লাইনের ১ম স্তবকটি তোমার খাতায় সুন্দর হস্তাক্ষরে লেখো এবং মুখস্থ আবৃত্তি করো।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রশংসা করুন এবং ২০ নম্বরের মূল্যায়ন ওয়ার্কশিটটি প্রিন্ট করে পরীক্ষা নেওয়ার ব্যবস্থা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: মূল শিখনফলগুলো এক নজরে শিক্ষার্থীদের সাথে পুনরাবৃত্তি করুন।",
        "ধাপ ২: কুইজে অংশ নিতে বলুন।",
        "ধাপ ৩: ওয়ার্কশিট বাটনে ক্লিক করে মূল্যায়নপত্র ডাউনলোড করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Primary School Examination Board — Academic Year 2026",
    examTitle: "Class 3 English Assessment — Unit 1, Lesson 5: Goodbye 2",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today (NCTB 2026)",
    time: "40 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Multiple Choice Questions (5 Marks)",
        instruction: "Choose the correct answer and write the letter (a, b, c, or d) in the box:",
        content: [
          {
                    q: "1. What do we say at night before going to sleep (page 10)?",
                    options: [
                              "a) Good afternoon",
                              "b) Good night, see you tomorrow",
                              "c) Good morning",
                              "d) Hello hello"
                    ],
                    answer: "a) Good afternoon"
          },
          {
                    q: "2. In the Goodbye Song on page 10, where is it time to go?",
                    options: [
                              "a) To the shop",
                              "b) To school",
                              "c) To go home",
                              "d) To hospital"
                    ],
                    answer: "a) To the shop"
          },
          {
                    q: "3. 'We all had so much fun' expresses —",
                    options: [
                              "a) Happiness and enjoyment",
                              "b) Crying",
                              "c) Fighting",
                              "d) Studying grammar"
                    ],
                    answer: "a) Happiness and enjoyment"
          },
          {
                    q: "4. In Let's practise 2 on page 11, where is Rina going?",
                    options: [
                              "a) To the nearby shop",
                              "b) To buy medicines",
                              "c) To library",
                              "d) To Kushtia"
                    ],
                    answer: "a) To the nearby shop"
          },
          {
                    q: "5. 'See you again' means —",
                    options: [
                              "a) আর কখনো দেখা হবে না",
                              "b) আবার দেখা হবে",
                              "c) এখন ঘুমাও",
                              "d) ওষুধ খাও"
                    ],
                    answer: "a) আর কখনো দেখা হবে না"
          }
]
      },
      {
        type: "fill_in_the_blanks",
        title: "Section B: Fill in the Blanks (Let's Practise p. 11) (5 Marks)",
        instruction: "Complete the dialogue using words from the textbook (page 11):",
        content: [
          "a) Salma : Good ____________ , Roton.",
          "b) Tanim : Nice to ____________ you.",
          "c) Salma : Nice ____________ you, too.",
          "d) Asif : Hello Rina, ____________ are you going?",
          "e) Asif : Okay, goodbye. See you ____________ ."
        ]
      },
      {
        type: "true_false",
        title: "Section C: Write True or False (5 Marks)",
        instruction: "Write 'True' for correct statements and 'False' for incorrect statements:",
        content: [
          "a) In Activity A, Speaker 2 says 'Good night, see you in the morning.'  [ _______ ]",
          "b) In the Goodbye Song, the students had no fun.  [ _______ ]",
          "c) The song ends with 'See you again.'  [ _______ ]",
          "d) Rina is going to Mohonpur school on page 11.  [ _______ ]",
          "e) 'Tomorrow' means আগামীকাল.  [ _______ ]"
        ]
      },
      {
        type: "short_questions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "Answer the following questions in complete sentences based on the textbook:",
        content: [
          "1. What do you say when saying good night to someone?\n   Answer: ________________________________________________________________",
          "2. Write the first four lines of the Goodbye Song (page 10):\n   Answer: ________________________________________________________________",
          "3. Where is Rina going in Activity 2 on page 11?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// LESSON 6: NUMBERS 1-30 (pp. 12–14) — 100% NCTB 2026 VERBATIM
// =========================================================================
export const NUMBERS_1_30_SLIDE_DECK: SlideDeck = {
  id: "numbers-1-30-calendar",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 1: Greetings, Farewells, Introductions and Numbers",
  lesson: "Lesson 6: Numbers 1-30 (Activity A, B, C & Let's practise)",
  topic: "Reading the Calendar & Numbers in Words 1-30 (pp. 12–14)",
  category: "english",
  thumbnailEmoji: "📅 🔢 🗓️",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Lesson 6: Numbers 1–30",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১২–১৪: ক্যালেন্ডারের তারিখ ও ১ থেকে ৩০ সংখ্যা পাঠ (Orientation)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-teal-600 to-cyan-600",
      imageEmoji: "📅 🔢 👦",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Welcome to Lesson 6: Numbers 1-30 from pages 12 to 14!",
          "Numbers are all around us on calendars, clocks, and books.",
          "Can you read the numbers from 1 to 30 on the September 2026 calendar?",
          "Let's practice counting, writing numbers in words, and finding previous and next numbers!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা ৩য় শ্রেণির ইংরেজি পাঠ্যবইয়ের পৃষ্ঠা ১২ থেকে ১৪-এর 'Numbers 1-30' পাঠটি শিখব। সেপ্টেম্বর ২০২৬-এর ক্যালেন্ডার দেখে ১ থেকে ৩০ পর্যন্ত সংখ্যা চেনা, বানান করে কথায় লেখা এবং পূর্ববর্তী ও পরবর্তী সংখ্যা বের করার নিয়ম আমরা শিখব।"
      },
      teacherNotes: "শ্রেণিকক্ষের দেয়াল ক্যালেন্ডার দেখিয়ে শিক্ষার্থীদের কাছে জানতে চান: আজকের তারিখ কত? ক্যালেন্ডারে ১ থেকে ৩০ পর্যন্ত সংখ্যাগুলো কীভাবে সাজানো থাকে?",
      quickTeachingSteps: [
        "ধাপ ১: একটি ক্যালেন্ডারের পাতা দেখিয়ে ১ থেকে ৩০ পর্যন্ত সংখ্যা শিক্ষার্থীদের দৃষ্টিগোচর করুন।",
        "ধাপ ২: সংখ্যাগুলো জোরে জোরে গণনা করান।",
        "ধাপ ৩: বানান ল্যাবে প্রবেশ করুন।"
      ]
    },
    {
      id: 2,
      title: "Key Vocabulary Lab: Numbers in Words (1 to 10)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১২–১৪: ১ থেকে ১০ পর্যন্ত সংখ্যা ও বানান (Vocabulary Lab)",
      phase: "২. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary & Phonics)",
      duration: "৭ মিনিট",
      themeColor: "from-cyan-600 to-blue-600",
      imageEmoji: "🔤 🔢 📘",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Master the spelling and pronunciation of cardinal numbers 1 to 10:"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ১৪-এর কলাম মিলকরণের আলোকে ১ থেকে ১০ পর্যন্ত সংখ্যার বানান শিখে নিই:",
        vocabulary: [
          { word: "one", syllables: ["one"], phonetic: "/wʌn/", meaning: "এক (১)", partOfSpeech: "Numeral", example: "1 is one.", icon: "1️⃣" },
          { word: "two", syllables: ["two"], phonetic: "/tuː/", meaning: "দুই (২)", partOfSpeech: "Numeral", example: "2 is two.", icon: "2️⃣" },
          { word: "three", syllables: ["three"], phonetic: "/θriː/", meaning: "তিন (৩)", partOfSpeech: "Numeral", example: "3 is three.", icon: "3️⃣" },
          { word: "four", syllables: ["four"], phonetic: "/fɔːr/", meaning: "চার (৪)", partOfSpeech: "Numeral", example: "4 is four.", icon: "4️⃣" },
          { word: "five", syllables: ["five"], phonetic: "/faɪv/", meaning: "পাঁচ (৫)", partOfSpeech: "Numeral", example: "5 is five.", icon: "5️⃣" },
          { word: "six", syllables: ["six"], phonetic: "/sɪks/", meaning: "ছয় (৬)", partOfSpeech: "Numeral", example: "6 is six.", icon: "6️⃣" },
          { word: "seven", syllables: ["sev", "en"], phonetic: "/ˈsev.ən/", meaning: "সাত (৭)", partOfSpeech: "Numeral", example: "7 is seven.", icon: "7️⃣" },
          { word: "eight", syllables: ["eight"], phonetic: "/eɪt/", meaning: "আট (৮)", partOfSpeech: "Numeral", example: "8 is eight.", icon: "8️⃣" },
          { word: "nine", syllables: ["nine"], phonetic: "/naɪn/", meaning: "নয় (৯)", partOfSpeech: "Numeral", example: "9 is nine.", icon: "9️⃣" },
          { word: "ten", syllables: ["ten"], phonetic: "/ten/", meaning: "দশ (১০)", partOfSpeech: "Numeral", example: "10 is ten.", icon: "🔟" }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের সংখ্যাগুলোর বানান হাত দিয়ে লিখে ড্রিল করান (O-N-E, T-W-O, T-H-R-E-E...)। আট (eight) ও নয় (nine)-এর বানানের দিকে বিশেষ নজর দিন।",
      quickTeachingSteps: [
        "ধাপ ১: সংখ্যার কার্ডে ক্লিক করে ফোনেটিক সাউন্ড শোনান।",
        "ধাপ ২: ১ থেকে ১০ পর্যন্ত সংখ্যা ও বানান বোর্ডে লিখুন।",
        "ধাপ ৩: সমস্বরে ড্রিল করান।"
      ]
    },
    {
      id: 3,
      title: "Activity A: September 2026 Calendar Reading",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১২: সেপ্টেম্বর ২০২৬ ক্যালেন্ডারের ১ থেকে ৩০ সংখ্যা পাঠ (100% Verbatim)",
      phase: "৩. ক্যালেন্ডার পাঠ (Calendar Reading - Activity A)",
      duration: "৭ মিনিট",
      themeColor: "from-blue-600 to-indigo-600",
      imageEmoji: "🗓️ 📅 🔍",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Activity A. Look at the calendar page. Read the numbers (page 12):",
          "Month: September- 2026",
          "Numbers 1 to 10: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10",
          "Numbers 11 to 20: 11, 12, 13, 14, 15, 16, 17, 18, 19, 20",
          "Numbers 21 to 30: 21, 22, 23, 24, 25, 26, 27, 28, 29, 30"
        ],
        banglaExplanation: "এনসিটিবি হুবহু ক্যালেন্ডার পাঠ (পৃষ্ঠা ১২):\nসেপ্টেম্বর ২০২৬-এর ক্যালেন্ডার পাতায় ১ থেকে ৩০ পর্যন্ত তারিখগুলো দেখো এবং মুখে মুখে জোরে পড়ো।"
      },
      teacherNotes: "শিক্ষার্থীদের ক্যালেন্ডারের প্রতিটি তারিখে আঙুল দিয়ে নির্দেশ করে ১ থেকে ৩০ পর্যন্ত জোরে জোরে পড়তে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: স্ক্রিনের ক্যালেন্ডার গ্রিড দেখান।",
        "ধাপ ২: ১ থেকে ৩০ পর্যন্ত সংখ্যা পর্যায়ক্রমে উচ্চস্বরে পড়ান।",
        "ধাপ ৩: পরবর্তী ধাপে বানান লেখার অনুশীলনে যান।"
      ]
    },
    {
      id: 4,
      title: "Activity B & C: Numbers in Words & June 2026 Calendar",
          // Textbook verbatim: Cardinal Numbers (A) | Number in words (B)
      subtitle: "পাঠ্যবই পৃষ্ঠা ১২–১৩: কথায় সংখ্যা পড়া ও জুন ২০২৬ ক্যালেন্ডার পূরণ (Activity B & C)",
      phase: "৪. ক্যালেন্ডার পূরণ ল্যাব (Calendar Grid Lab - Activity B & C)",
      duration: "৮ মিনিট",
      themeColor: "from-indigo-600 to-purple-600",
      imageEmoji: "✏️ 🗓️ 🔢",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Activity B. Read and write the numbers in words (page 12):",
          "1: one, 2: two, 3: three, 4: four, 5: five ... 30: thirty",
          "Activity C. Write the numbers in the calendar page for the month of June (page 13):",
          "June - 2026 starts with 1, 2, 3 ... up to 30 days."
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ১২ ও ১৩: সংখ্যাগুলো কথায় পড়া ও লেখা এবং জুন ২০২৬ মাসের খালি ক্যালেন্ডার পৃষ্ঠায় ১ থেকে ৩০ পর্যন্ত সংখ্যা লিখে পূরণ করা।"
      },
      teacherNotes: "শিক্ষার্থীদের পাঠ্যবইয়ের পৃষ্ঠা ১৩ খুলে জুন ২০২৬-এর ক্যালেন্ডারের খালি ঘরগুলোতে ১ থেকে ৩০ পর্যন্ত সুন্দর করে লিখতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: জুনের ১ তারিখ থেকে শুরু করে ঘরগুলো চিহ্নিত করুন।",
        "ধাপ ২: শিক্ষার্থীদের খাতায় ক্যালেন্ডার গ্রিড পূরণ করতে দিন।",
        "ধাপ ৩: ভুল সংখ্যা সংশোধন করে দিন।"
      ]
    },
    {
      id: 5,
      title: "Let's practise 1: Column Matching (1 to 9)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৪: অঙ্ক ও কথায় সংখ্যার কলাম মিলকরণ (100% Verbatim)",
      phase: "৫. কলাম মিলকরণ (Matching - Practice 1)",
      duration: "৬ মিনিট",
      themeColor: "from-purple-600 to-pink-600",
      imageEmoji: "🧩 📋 🎯",
      sceneType: "sorting",
      hasVisualStage: true,
      content: {
        englishText: [
          "Let's practise 1. Match column A with column B (page 14):",
          "• 1  ->  one",
          "• 2  ->  two",
          "• 3  ->  three",
          "• 4  ->  four",
          "• 5  ->  five",
          "• 6  ->  six",
          "• 7  ->  seven",
          "• 8  ->  eight",
          "• 9  ->  nine"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ১৪-এর Let's practise ১ নম্বর অনুশীলন: কলাম A-এর অঙ্কের সাথে কলাম B-এর সঠিক বানানের দাগ টেনে মিল করো।"
      },
      teacherNotes: "বইয়ের ১৪ পৃষ্ঠার কলাম ম্যাচিং শিক্ষার্থীদের বইয়ে দাগ টেনে সম্পন্ন করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডে দুই পাশের কলাম লিখে মিল করতে ডাকুন।",
        "ধাপ ২: প্রতিটি বানানের নির্ভুলতা যাচাই করুন।",
        "ধাপ ৩: মিসিং নাম্বার ড্রিল করান।"
      ]
    },
    {
      id: 6,
      title: "Let's practise 2: Fill in the Missing Numbers in Words",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৪: ফাঁকা ঘরে মিসিং বানানের সংখ্যা পূরণ (100% Verbatim)",
      phase: "৬. লিখিত বানান শূন্যস্থান পূরণ (Practice 2)",
      duration: "৬ মিনিট",
      themeColor: "from-teal-600 to-emerald-600",
      imageEmoji: "✍️ 🔢 📝",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Let's practise 2. Write the missing number in words in the blanks (page 14):",
          "one, [ two ], three, [ four ], [ five ], six, [ seven ], [ eight ], nine, [ ten ].",
          "Textbook prompt: one, ______________, three, ______________, ______________, six",
          "Complete sequence: one, two, three, four, five, six, seven, eight, nine, ten."
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ১৪-এর Let's practise ২ নম্বর অনুশীলন: ফাঁকা স্থানে বাদ পড়া সংখ্যার ইংরেজি বানানটি লেখো (two, four, five, seven, eight, ten)।"
      },
      teacherNotes: "শিক্ষার্থীদের খাতায় পুরো অনুক্রমটি (one to ten) সুন্দর করে লিখতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডে ফাঁকা ঘরসহ সিকোয়েন্স লিখুন।",
        "ধাপ ২: শিক্ষার্থীদের ডেকে সঠিক বানান লিখতে বলুন।",
        "ধাপ ৩: পরবর্তী আগের ও পরের সংখ্যা ড্রিল করান।"
      ]
    },
    {
      id: 7,
      title: "Let's practise 3 & 4: Previous and Next Numbers",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৪: পূর্ববর্তী ও পরবর্তী সংখ্যা বের করা (Previous & Next)",
      phase: "৭. গাণিতিক দক্ষতা ও পূর্ববর্তী-পরবর্তী সংখ্যা (Practice 3 & 4)",
      duration: "৬ মিনিট",
      themeColor: "from-emerald-600 to-cyan-700",
      imageEmoji: "⬅️ 🔢 ➡️",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "3. Write the previous number in the box (page 14):",
          "• [ 8 ] 9   • [ 11 ] 12   • [ 13 ] 14   • [ 14 ] 15   • [ 16 ] 17   • [ 17 ] 18   • [ 22 ] 23   • [ 25 ] 26",
          "4. Write the next number in the box (page 14):",
          "• 23 [ 24 ]   • 26 [ 27 ]   • 27 [ 28 ]   • 28 [ 29 ]   • 29 [ 30 ]"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ১৪-এর Let's practise ৩ ও ৪ নম্বর অনুশীলন:\n৩. পূর্ববর্তী (আগের) সংখ্যাটি বক্সে লেখো (যেমন ৯-এর আগে ৮, ১২-এর আগে ১১)।\n৪. পরবর্তী (পরের) সংখ্যাটি বক্সে লেখো (যেমন ২৩-এর পরে ২৪, ২৯-এর পরে ৩০)।"
      },
      teacherNotes: "Previous (আগের) এবং Next (পরের) সংখ্যার ধারণা স্পষ্ট করুন। শিক্ষার্থীদের খাতায় বক্সের সংখ্যাগুলো সমাধান করান।",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডে বক্সের উদাহরণ দিন।",
        "ধাপ ২: ১ বিয়োগ করে পূর্ববর্তী এবং ১ যোগ করে পরবর্তী সংখ্যা বের করার নিয়ম দেখান।",
        "ধাপ ৩: খাতায় সমাধান সম্পন্ন করান।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "পাঠ মূল্যায়ন ও এনসিটিবি ২০২৬ ব্লুপ্রিন্ট অনুযায়ী প্রিন্টযোগ্য প্রশ্নপত্র",
      phase: "৮. চূড়ান্ত মূল্যায়ন ও বাড়ির কাজ (Evaluation & Assessment)",
      duration: "৪ মিনিট",
      themeColor: "from-cyan-700 to-blue-800",
      imageEmoji: "🏆 📝 🌟",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Outstanding job! You have completed Lesson 6: Numbers 1-30.",
          "Key Takeaways:",
          "• September and June months have 30 days in the 2026 calendar.",
          "• Cardinal number spellings: 1 (one) to 10 (ten).",
          "• Finding the previous number (8 before 9) and next number (30 after 29).",
          "Now take the evaluation quiz and download your 20-mark companion worksheet!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা সফলভাবে ৬ষ্ঠ পাঠ সম্পন্ন করেছ। এবার কুইজের উত্তর দাও এবং ২০ নম্বরের প্রিন্টযোগ্য ওয়ার্কশিট অনুশীলন করো।",
        quiz: {
          question: "What is the previous number of 15 according to Activity 3 on page 14?",
          options: [
            "14",
            "16",
            "13",
            "17"
          ],
          answer: "14",
          hint: "The previous number of 15 is 15 - 1 = 14."
        },
        activityTask: "১ থেকে ২০ পর্যন্ত সংখ্যাগুলো খাতায় অঙ্কে এবং পাশে সুন্দর করে বানান করে ইংরেজি শব্দে লেখো।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রশংসা করুন এবং ২০ নম্বরের মূল্যায়ন ওয়ার্কশিটটি প্রিন্ট করে পরীক্ষা নেওয়ার ব্যবস্থা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: মূল শিখনফলগুলো এক নজরে শিক্ষার্থীদের সাথে পুনরাবৃত্তি করুন।",
        "ধাপ ২: কুইজে অংশ নিতে বলুন।",
        "ধাপ ৩: ওয়ার্কশিট বাটনে ক্লিক করে মূল্যায়নপত্র ডাউনলোড করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Primary School Examination Board — Academic Year 2026",
    examTitle: "Class 3 English Assessment — Unit 1, Lesson 6: Numbers 1-30",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today (NCTB 2026)",
    time: "40 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Multiple Choice Questions (5 Marks)",
        instruction: "Choose the correct answer and write the letter (a, b, c, or d) in the box:",
        content: [
          {
                    q: "1. What is the number in words for '8' (page 14)?",
                    options: [
                              "a) Ate",
                              "b) Eight",
                              "c) Eighteen",
                              "d) Seven"
                    ],
                    answer: "a) Ate"
          },
          {
                    q: "2. Which number comes next after 29 (page 14 Activity 4)?",
                    options: [
                              "a) 28",
                              "b) 30",
                              "c) 31",
                              "d) 20"
                    ],
                    answer: "a) 28"
          },
          {
                    q: "3. What is the previous number of 12 (page 14 Activity 3)?",
                    options: [
                              "a) 13",
                              "b) 11",
                              "c) 10",
                              "d) 14"
                    ],
                    answer: "a) 13"
          },
          {
                    q: "4. How many days are shown in the September 2026 calendar on page 12?",
                    options: [
                              "a) 28",
                              "b) 29",
                              "c) 30",
                              "d) 31"
                    ],
                    answer: "a) 28"
          },
          {
                    q: "5. What is the correct spelling for 4?",
                    options: [
                              "a) For",
                              "b) Fore",
                              "c) Four",
                              "d) Fur"
                    ],
                    answer: "a) For"
          }
]
      },
      {
        type: "fill_in_the_blanks",
        title: "Section B: Fill in the Missing Words (p. 14 Activity 2) (5 Marks)",
        instruction: "Write the missing numbers in words from 1 to 10:",
        content: [
          "a) one, ____________ , three",
          "b) three, ____________ , five",
          "c) five, six, ____________",
          "d) seven, ____________ , nine",
          "e) nine, ____________"
        ]
      },
      {
        type: "true_false",
        title: "Section C: Write True or False (5 Marks)",
        instruction: "Write 'True' for correct statements and 'False' for incorrect statements:",
        content: [
          "a) 5 in words is 'five'.  [ _______ ]",
          "b) The next number of 23 is 22.  [ _______ ]",
          "c) The previous number of 9 is 8.  [ _______ ]",
          "d) 9 in words is 'nine'.  [ _______ ]",
          "e) June 2026 calendar on page 13 has 35 days.  [ _______ ]"
        ]
      },
      {
        type: "short_questions",
        title: "Section D: Previous and Next Numbers (5 Marks)",
        instruction: "Write the previous or next number for the following:",
        content: [
          "1. Write the previous number of 18:\n   Answer: Previous of 18 is _______",
          "2. Write the next number of 27:\n   Answer: Next of 27 is _______",
          "3. Write 7 and 9 in words:\n   Answer: 7 is _______________ and 9 is _______________"
        ]
      }
    ]
  }
};

// =========================================================================
// LESSON 7: INTRODUCING MYSELF — JERIN (pp. 15–16) — 100% NCTB 2026 VERBATIM
// =========================================================================
export const JERIN_INTRODUCING_DECK: SlideDeck = {
  id: "introducing-jerin",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 1: Greetings, Farewells, Introductions and Numbers",
  lesson: "Lesson 7: Introducing myself (Activity A, B, C & Let's practise)",
  topic: "Self-Introduction: Name, Age, Class & School (pp. 15–16)",
  category: "english",
  thumbnailEmoji: "👧 🎒 🏫",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Lesson 7: Introducing Myself",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৫–১৬: নিজের নাম, বয়স, শ্রেণি ও বিদ্যালয়ের পরিচয় (Orientation)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-sky-500 to-indigo-600",
      imageEmoji: "👧 🎒 🏫",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Welcome to Lesson 7: Introducing myself from pages 15 and 16!",
          "When we introduce ourselves, we tell our name, age, class, and school.",
          "Meet Jerin, an 8-year-old student from Mohonpur Government Primary School.",
          "Let's read Jerin's authentic text and learn how to introduce ourselves confidently!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা ৩য় শ্রেণির পাঠ্যবইয়ের পৃষ্ঠা ১৫ ও ১৬-এর 'Introducing myself' পাঠটি শিখব। কীভাবে নিজের নাম, বয়স, শ্রেণি, স্কুলের নাম এবং বাসস্থান সঠিকভাবে বলতে ও লিখতে হয়, তা আমরা মোহনপুর সরকারি প্রাথমিক বিদ্যালয়ের ছাত্রী জেরিনের আসল পাঠ্যাংশ থেকে শিখব।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তাদের বয়স কত এবং তাদের বিদ্যালয়ের নাম কী? বোর্ডে 'Name, Age, Class, School' লিখে দেখান।",
      quickTeachingSteps: [
        "ধাপ ১: জেরিনের ছবি দেখিয়ে শিক্ষার্থীদের দৃষ্টি আকর্ষণ করুন।",
        "ধাপ ২: ১৫ পৃষ্ঠার মূল পাঠ্যাংশের রিডিং মডেল দিন।",
        "ধাপ ৩: শব্দভাণ্ডার ল্যাবে প্রবেশ করুন।"
      ]
    },
    {
      id: 2,
      title: "Key Vocabulary Lab: School & Profile Words",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৫–১৬: আত্মপরিচয়ের মূল শব্দভাণ্ডার (Vocabulary Lab)",
      phase: "২. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary & Phonics)",
      duration: "৭ মিনিট",
      themeColor: "from-blue-600 to-cyan-600",
      imageEmoji: "🔤 🏫 📘",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Learn key vocabulary words for self-introduction and school life:"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ১৫ ও ১৬ এর মূল শব্দগুলোর অর্থ ও সিলেবল ভাঙন শিখে নিই:",
        vocabulary: [
          { word: "years", syllables: ["years"], phonetic: "/jɪəz/", meaning: "বছর / বয়স", partOfSpeech: "Noun", example: "I’m 8 years old.", icon: "🎂" },
          { word: "class", syllables: ["class"], phonetic: "/klɑːs/", meaning: "শ্রেণি", partOfSpeech: "Noun", example: "I’m in class 3.", icon: "🏫" },
          { word: "government", syllables: ["gov", "ern", "ment"], phonetic: "/ˈɡʌv.ən.mənt/", meaning: "সরকারি", partOfSpeech: "Noun/Adjective", example: "Mohonpur Government Primary School.", icon: "🏛️" },
          { word: "primary", syllables: ["pri", "ma", "ry"], phonetic: "/ˈpraɪ.mər.i/", meaning: "প্রাথমিক", partOfSpeech: "Adjective", example: "Primary education is important.", icon: "🎒" },
          { word: "school", syllables: ["school"], phonetic: "/skuːl/", meaning: "বিদ্যালয় / পাঠশালা", partOfSpeech: "Noun", example: "She goes to school every day.", icon: "🏫" },
          { word: "family", syllables: ["fam", "i", "ly"], phonetic: "/ˈfæm.əl.i/", meaning: "পরিবার", partOfSpeech: "Noun", example: "I live with my family.", icon: "👨‍👩‍👧‍👦" },
          { word: "live", syllables: ["live"], phonetic: "/lɪv/", meaning: "বাস করা / থাকা", partOfSpeech: "Verb", example: "I live in Mohonpur.", icon: "🏡" }
        ]
      },
      teacherNotes: "gov-ern-ment, pri-ma-ry এবং fam-i-ly শব্দের সিলেবল হাততালি দিয়ে ড্রিল করান। বানানগুলো বোর্ডে লিখে অভ্যাস করান।",
      quickTeachingSteps: [
        "ধাপ ১: শব্দের কার্ডে ক্লিক করে সঠিক উচ্চারণ শোনান।",
        "ধাপ ২: প্রতিটি শব্দের অর্থ ও প্রয়োগ খাতায় লেখান।",
        "ধাপ ৩: সমস্বরে পাঠ করান।"
      ]
    },
    {
      id: 3,
      title: "Activity A: Read the text (Jerin's Introduction)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৫: এনসিটিবির হুবহু মূল পাঠ্যাংশ (100% Verbatim Text)",
      phase: "৩. মূল পাঠ্যাংশ পাঠ (Authentic Reading - Activity A)",
      duration: "৮ মিনিট",
      themeColor: "from-sky-600 to-indigo-600",
      imageEmoji: "📖 👧 🏫",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello! I’m Jerin.",
          "I’m 8 years old.",
          "I’m in class 3 at Mohonpur Government Primary School.",
          "I live with my family in Mohonpur."
        ],
        banglaExplanation: "এনসিটিবি হুবহু পাঠ্যাংশ (পৃষ্ঠা ১৫):\nহ্যালো! আমি জেরিন।\nআমার বয়স ৮ বছর।\nআমি মোহনপুর সরকারি প্রাথমিক বিদ্যালয়ে ৩য় শ্রেণিতে পড়ি।\nআমি মোহনপুরে আমার পরিবারের সাথে বাস করি।"
      },
      teacherNotes: "শিক্ষার্থীদের বইয়ের ১৫ পৃষ্ঠায় আঙুল দিয়ে লাইন অনুসরণ করতে বলুন। প্রতিটি বাক্যের গঠন (I'm + Name, I'm + Age, I'm in + Class at + School, I live with + Family in + Place) শিক্ষার্থীদের বুঝিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: প্যাসেজের অডিও কারাওকে চালিয়ে সরব পাঠ দিন।",
        "ধাপ ২: বাক্য ধরে ধরে শিক্ষার্থীদের দিয়ে পুনরাবৃত্তি করান।",
        "ধাপ ৩: পরবর্তী প্রশ্নোত্তর পর্বে যান।"
      ]
    },
    {
      id: 4,
      title: "Activity B: Pairwork — 4 Authentic Questions & Answers",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৫: বইয়ের আসল ৪টি প্রশ্নোত্তর (100% Verbatim)",
      phase: "৪. জোড়ায় প্রশ্নোত্তর (Speaking Pairwork - Activity B)",
      duration: "৭ মিনিট",
      themeColor: "from-indigo-600 to-purple-600",
      imageEmoji: "❓ 🗣️ 👥",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Pairwork: Ask and answer the questions. Look at the information in activity A (page 15):",
          "1. What is the girl’s name?",
          "   Ans: The girl’s name is Jerin.",
          "2. How old is she?",
          "   Ans: She is 8 years old.",
          "3. Where does she live?",
          "   Ans: She lives in Mohonpur.",
          "4. What class is she in?",
          "   Ans: She is in class 3."
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ১৫ Activity B: পাঠ্যাংশের আলোকে ৪টি প্রশ্নের উত্তর জোড়ায় জোড়ায় মুখে মুখে অনুশীলন করো এবং খাতায় লেখো।"
      },
      teacherNotes: "শিক্ষার্থীদের ক্লাসরুমে জোড়ায় ভাগ করুন। একজন প্রশ্ন করবে এবং অন্যজন উত্তর দেবে। এরপর ভূমিকা পরিবর্তন করান।",
      quickTeachingSteps: [
        "ধাপ ১: প্রশ্নগুলো বোর্ডে লিখুন।",
        "ধাপ ২: পূর্ণ বাক্যে উত্তর দেওয়ার নিয়ম শেখান।",
        "ধাপ ৩: শিক্ষার্থীদের জোড়ায় ড্রিল করান।"
      ]
    },
    {
      id: 5,
      title: "Activity C: Complete the Table (Jerin's Profile)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৫: জেরিনের তথ্য দিয়ে ছক পূরণ (Information Table)",
      phase: "৫. তথ্য ছক পূরণ ল্যাব (Profile Table - Activity C)",
      duration: "৬ মিনিট",
      themeColor: "from-purple-600 to-pink-600",
      imageEmoji: "📋 👧 ✍️",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Complete the table with the information of Jerin from activity A (page 15):",
          "• Name: Jerin",
          "• Age: 8 years old",
          "• Class: Class 3",
          "• School’s name: Mohonpur Government Primary School"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ১৫ Activity C: Activity A-এর তথ্য অনুযায়ী জেরিনের নামের পাশে Jerin, বয়সের পাশে 8, শ্রেণির পাশে Class 3 এবং স্কুলের নামের পাশে Mohonpur Government Primary School লিখে ছকটি পূরণ করো।"
      },
      teacherNotes: "শিক্ষার্থীদের বইয়ের ১৫ পৃষ্ঠার ছকে সঠিক তথ্য লিখতে বলুন। বানানের দিকে বিশেষ দৃষ্টি দিন।",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডে ছকটি আঁকুন।",
        "ধাপ ২: শিক্ষার্থীদের ডেকে সঠিক তথ্য লিখতে দিন।",
        "ধাপ ৩: অনুশীলন সম্পন্ন করান।"
      ]
    },
    {
      id: 6,
      title: "Let's practise 1: Fill in the Blanks with Words from the Box",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৬: বক্সের শব্দ দিয়ে শূন্যস্থান পূরণ (100% Verbatim)",
      phase: "৬. লিখিত শূন্যস্থান পূরণ (Practice Activity 1)",
      duration: "৬ মিনিট",
      themeColor: "from-teal-600 to-cyan-600",
      imageEmoji: "✍️ 📋 🎯",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Let's practise 1. Choose the correct words from the box and fill in the blanks (page 16):",
          "Word Box: [ school | class | family | lives ]",
          "The girl’s name is Jerin. She is in __________ 3.",
          "She is in [ class ] 3.",
          "Her [ school ] is Mohonpur Government Primary School.",
          "She [ lives ] in Mohonpur.",
          "She lives with her [ family ]."
        ],
        banglaExplanation: "পাঠ্যবইয়ের ১৬ পৃষ্ঠার Let's practise ১ নম্বর অনুশীলন: বক্সের শব্দগুলো (school, class, family, lives) দিয়ে জেরিনের অনুচ্ছেদের শূন্যস্থান পূরণ করো।"
      },
      teacherNotes: "শিক্ষার্থীদের বইয়ের ১৬ পৃষ্ঠার শূন্যস্থানে পেনসিল দিয়ে শব্দগুলো বসাতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডে ৪টি শব্দ বক্স আকারে লিখুন।",
        "ধাপ ২: শিক্ষার্থীদের বাক্যগুলোর অর্থ বুঝিয়ে সঠিক শব্দ বসাতে বলুন।",
        "ধাপ ৩: খাতায় সম্পূর্ণ অনুচ্ছেদটি লেখান।"
      ]
    },
    {
      id: 7,
      title: "Let's practise 2: Complete the Table with YOUR Information",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৬: নিজের তথ্য দিয়ে ব্যক্তিগত আইডি কার্ড তৈরি (Personal Profile)",
      phase: "৭. ব্যক্তিগত পরিচিতি ল্যাব (Self-Profile Builder)",
      duration: "৬ মিনিট",
      themeColor: "from-cyan-600 to-blue-700",
      imageEmoji: "🆔 📝 🌟",
      sceneType: "id_card",
      hasVisualStage: true,
      content: {
        englishText: [
          "Let's practise 2. Complete the table with your information (page 16):",
          "• Name: [ Write your name ]",
          "• Age: [ Write your age, e.g., 8 years old ]",
          "• Class: Class 3",
          "• School’s name: [ Write your school's name ]"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ১৬ Let's practise ২ নম্বর অনুশীলন: এবার নিজের আসল নাম, বয়স, শ্রেণি ও স্কুলের নাম দিয়ে ছকটি পূরণ করো।"
      },
      teacherNotes: "প্রতিটি শিক্ষার্থী যাতে নিজের নাম ও স্কুলের নাম ইংরেজিতে নির্ভুল বানানে লিখতে পারে তা পর্যবেক্ষণ করুন।",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডে ডেমো স্টুডেন্ট প্রোফাইল দেখান।",
        "ধাপ ২: প্রতিটি শিক্ষার্থীকে নিজের তথ্য দিয়ে ছক পূরণ করতে দিন।",
        "ধাপ ৩: শিক্ষকের সহায়তায় বানান সংশোধন করুন।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "পাঠ মূল্যায়ন ও এনসিটিবি ২০২৬ ব্লুপ্রিন্ট অনুযায়ী প্রিন্টযোগ্য প্রশ্নপত্র",
      phase: "৮. চূড়ান্ত মূল্যায়ন ও বাড়ির কাজ (Evaluation & Assessment)",
      duration: "৪ মিনিট",
      themeColor: "from-blue-700 to-indigo-800",
      imageEmoji: "🏆 📝 🌟",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed Lesson 7: Introducing myself.",
          "Key Takeaways:",
          "• Jerin is 8 years old and in class 3 at Mohonpur Government Primary School.",
          "• She lives with her family in Mohonpur.",
          "• You can now introduce yourself in English with confidence!",
          "Now take the evaluation quiz and download your 20-mark companion worksheet!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা সফলভাবে ৭ম পাঠ সম্পন্ন করেছ। এবার কুইজের উত্তর দাও এবং ২০ নম্বরের প্রিন্টযোগ্য ওয়ার্কশিট অনুশীলন করো।",
        quiz: {
          question: "Where does Jerin live according to page 15?",
          options: [
            "In Mohonpur",
            "In Dhaka",
            "In Kushtia",
            "In Sylhet"
          ],
          answer: "In Mohonpur",
          hint: "Check the last sentence on page 15: 'I live with my family in Mohonpur.'"
        },
        activityTask: "জেরিনের মতো করে নিজের পরিচয় দিয়ে খাতায় একটি সুন্দর ৪ লাইনের অনুচ্ছেদ লেখো।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রশংসা করুন এবং ২০ নম্বরের মূল্যায়ন ওয়ার্কশিটটি প্রিন্ট করে পরীক্ষা নেওয়ার ব্যবস্থা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: মূল শিখনফলগুলো এক নজরে শিক্ষার্থীদের সাথে পুনরাবৃত্তি করুন।",
        "ধাপ ২: কুইজে অংশ নিতে বলুন।",
        "ধাপ ৩: ওয়ার্কশিট বাটনে ক্লিক করে মূল্যায়নপত্র ডাউনলোড করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Primary School Examination Board — Academic Year 2026",
    examTitle: "Class 3 English Assessment — Unit 1, Lesson 7: Introducing Myself",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today (NCTB 2026)",
    time: "40 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Multiple Choice Questions (5 Marks)",
        instruction: "Choose the correct answer and write the letter (a, b, c, or d) in the box:",
        content: [
          {
                    q: "1. What is the girl's name on page 15?",
                    options: [
                              "a) Faria",
                              "b) Sabiha",
                              "c) Jerin",
                              "d) Rita"
                    ],
                    answer: "a) Faria"
          },
          {
                    q: "2. How old is Jerin?",
                    options: [
                              "a) 7 years old",
                              "b) 8 years old",
                              "c) 9 years old",
                              "d) 10 years old"
                    ],
                    answer: "a) 7 years old"
          },
          {
                    q: "3. What class is Jerin in?",
                    options: [
                              "a) Class 2",
                              "b) Class 3",
                              "c) Class 4",
                              "d) Class 5"
                    ],
                    answer: "a) Class 2"
          },
          {
                    q: "4. What is the name of Jerin's school?",
                    options: [
                              "a) Dhaka Primary School",
                              "b) Mohonpur Government Primary School",
                              "c) Kushtia School",
                              "d) Model School"
                    ],
                    answer: "a) Dhaka Primary School"
          },
          {
                    q: "5. Who does Jerin live with in Mohonpur?",
                    options: [
                              "a) Her friends",
                              "b) Her family",
                              "c) Her teacher",
                              "d) Alone"
                    ],
                    answer: "a) Her friends"
          }
]
      },
      {
        type: "fill_in_the_blanks",
        title: "Section B: Fill in the Blanks (Let's Practise p. 16) (5 Marks)",
        instruction: "Complete the sentences using words from the box [ school | class | family | lives ]:",
        content: [
          "a) The girl’s name is ____________ .",
          "b) She is in ____________ 3.",
          "c) Her ____________ is Mohonpur Government Primary School.",
          "d) She ____________ in Mohonpur.",
          "e) She lives with her ____________ ."
        ]
      },
      {
        type: "true_false",
        title: "Section C: Write True or False (5 Marks)",
        instruction: "Write 'True' for correct statements and 'False' for incorrect statements:",
        content: [
          "a) Jerin is 9 years old.  [ _______ ]",
          "b) Jerin reads in class 3.  [ _______ ]",
          "c) Mohonpur Government Primary School is Jerin's school.  [ _______ ]",
          "d) Jerin lives in Bandarban.  [ _______ ]",
          "e) Jerin lives with her family.  [ _______ ]"
        ]
      },
      {
        type: "short_questions",
        title: "Section D: Short Answer Questions (Activity B p. 15) (5 Marks)",
        instruction: "Answer the following questions in complete sentences based on the text:",
        content: [
          "1. What is the girl’s name?\n   Answer: ________________________________________________________________",
          "2. Where does Jerin live?\n   Answer: ________________________________________________________________",
          "3. Write your own name, age, and class in English:\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// LESSON 8: INTRODUCING SOMEONE (pp. 17–18) — 100% NCTB 2026 VERBATIM
// =========================================================================
export const INTRODUCING_SOMEONE_SLIDE_DECK: SlideDeck = {
  id: "introducing-someone",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 1: Greetings, Farewells, Introductions and Numbers",
  lesson: "Lesson 8: Introducing someone (Activity A, B & Let's practise)",
  topic: "Introducing a Friend: Meet My Friend (pp. 17–18)",
  category: "english",
  thumbnailEmoji: "🤝 👦 👧",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Lesson 8: Introducing Someone",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৭–১৮: বন্ধুকে অন্য কারো সাথে পরিচয় করিয়ে দেওয়া (Orientation)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-teal-600 to-cyan-600",
      imageEmoji: "🤝 👦 👧",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Welcome to Lesson 8: Introducing someone from pages 17 and 18!",
          "When you are with two friends who don't know each other, how do you introduce them?",
          "We say 'Meet my friend, [Name]' and 'This is [Name]'.",
          "Let's practice the authentic dialogue of Zabed, Sabiha and Mahmud Hasan!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা ৩য় শ্রেণির পাঠ্যবইয়ের পৃষ্ঠা ১৭ ও ১৮-এর 'Introducing someone' পাঠটি শিখব। আমাদের কোনো বন্ধুকে অন্য কারো সাথে পরিচয় করিয়ে দেওয়ার সময় কীভাবে 'Meet my friend...' (আমার বন্ধুর সাথে পরিচিত হও) এবং 'This is...' (ইনি হলেন...) বলতে হয়, তা আমরা জাবেদ, সাবিহা ও মাহমুদ হাসানের কথোপকথন থেকে শিখব।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তারা কখনো এক বন্ধুকে আরেক বন্ধুর সাথে পরিচয় করিয়ে দিয়েছে কি না? ইংরেজিতে কীভাবে পরিচয় করাতে হয় তা বোর্ডে লিখে দেখান।",
      quickTeachingSteps: [
        "ধাপ ১: ৩ জন শিক্ষার্থীর ছবি দেখিয়ে মনোযোগ আকর্ষণ করুন।",
        "ধাপ ২: ১৭ পৃষ্ঠার মূল সংলাপের অডিও শোনান।",
        "ধাপ ৩: শব্দভাণ্ডার ল্যাবে প্রবেশ করুন।"
      ]
    },
    {
      id: 2,
      title: "Key Vocabulary Lab: Introductions & Politeness",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৭–১৮: পরিচয় করানোর মূল শব্দভাণ্ডার (Vocabulary Lab)",
      phase: "২. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary & Phonics)",
      duration: "৭ মিনিট",
      themeColor: "from-cyan-600 to-blue-600",
      imageEmoji: "🔤 🤝 📘",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Learn key vocabulary words for introducing someone:"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ১৭ ও ১৮ এর মূল শব্দগুলোর অর্থ ও উচ্চারণ শিখে নিই:",
        vocabulary: [
          { word: "someone", syllables: ["some", "one"], phonetic: "/ˈsʌm.wʌn/", meaning: "কেউ একজন / অন্য ব্যক্তি", partOfSpeech: "Pronoun", example: "Introducing someone to a friend.", icon: "👤" },
          { word: "meet", syllables: ["meet"], phonetic: "/miːt/", meaning: "পরিচিত হওয়া / সাক্ষাৎ করা", partOfSpeech: "Verb", example: "Meet my friend, Mahmud Hasan.", icon: "🤝" },
          { word: "this", syllables: ["this"], phonetic: "/ðɪs/", meaning: "এই ব্যক্তি / ইনি", partOfSpeech: "Pronoun", example: "This is Sabiha.", icon: "👉" },
          { word: "nice", syllables: ["nice"], phonetic: "/naɪs/", meaning: "সুন্দর / চমৎকার", partOfSpeech: "Adjective", example: "Nice to meet you.", icon: "😊" },
          { word: "fine", syllables: ["fine"], phonetic: "/faɪn/", meaning: "ভালো আছি", partOfSpeech: "Adjective", example: "Fine, thanks.", icon: "👍" }
        ]
      },
      teacherNotes: "'meet' এবং 'this is'-এর ব্যবহার স্পষ্ট করুন। কাউকে পরিচয় করানোর ভদ্র রীতি ড্রিল করান।",
      quickTeachingSteps: [
        "ধাপ ১: শব্দের কার্ডে ক্লিক করে ফোনেটিক উচ্চারণ শোনান।",
        "ধাপ ২: প্রতিটি শব্দের অর্থ বোর্ডে লিখুন।",
        "ধাপ ৩: সমস্বরে পাঠ করান।"
      ]
    },
    {
      id: 3,
      title: "Activity A: Listen, say and read (Zabed, Sabiha & Mahmud)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৭: জাবেদ, সাবিহা ও মাহমুদের হুবহু সংলাপ (100% Verbatim Dialogue)",
      phase: "৩. মূল সংলাপ পাঠ (Authentic Dialogue - Activity A)",
      duration: "৮ মিনিট",
      themeColor: "from-blue-600 to-indigo-600",
      imageEmoji: "👦 👧 👦 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Zabed: Hello, Sabiha!",
          "Sabiha: Hi, Zabed! How are you?",
          "Zabed: Fine, thanks. Sabiha, meet my friend, Mahmud Hasan. And Mahmud, this is Sabiha.",
          "Sabiha: Hello, Mahmud! Nice to meet you.",
          "Mahmud: Nice meeting you, too."
        ],
        banglaExplanation: "এনসিটিবি হুবহু সংলাপ (পৃষ্ঠা ১৭):\nজাবেদ: হ্যালো, সাবিহা!\nসাবিহা: হাই, জাবেদ! তুমি কেমন আছ?\nজাবেদ: ভালো, ধন্যবাদ। সাবিহা, আমার বন্ধু মাহমুদ হাসানের সাথে পরিচিত হও। আর মাহমুদ, ইনি হলেন সাবিহা।\nসাবিহা: হ্যালো, মাহমুদ! তোমার সাথে দেখা হয়ে ভালো লাগল।\nমাহমুদ: তোমার সাথে দেখা হয়েও ভালো লাগল।",
        dialogue: [
          { speaker: "Zabed", team: "Zabed", text: "Hello, Sabiha!", avatar: "👦" },
          { speaker: "Sabiha", team: "Sabiha", text: "Hi, Zabed! How are you?", avatar: "👧" },
          { speaker: "Zabed", team: "Zabed", text: "Fine, thanks. Sabiha, meet my friend, Mahmud Hasan. And Mahmud, this is Sabiha.", avatar: "👦" },
          { speaker: "Sabiha", team: "Sabiha", text: "Hello, Mahmud! Nice to meet you.", avatar: "👧" },
          { speaker: "Mahmud", team: "Mahmud", text: "Nice meeting you, too.", avatar: "👦" }
        ]
      },
      teacherNotes: "শ্রেণিকক্ষের ৩ জন শিক্ষার্থীকে (জাবেদ, সাবিহা ও মাহমুদ) সামনে এনে লাইভ রোল-প্লে করান। কীভাবে হাত নেড়ে বা নির্দেশ করে পরিচয় করাতে হয় তা শেখান।",
      quickTeachingSteps: [
        "ধাপ ১: সংলাপটির মডেল অডিও কারাওকে চালান।",
        "ধাপ ২: প্রতিটি লাইন অর্থসহ বুঝিয়ে দিন।",
        "ধাপ ৩: শিক্ষার্থীদের ৩ জনের দলে ভাগ করে সংলাপ চর্চা করান।"
      ]
    },
    {
      id: 4,
      title: "Activity B: Introduce a friend (Live Classroom Practice)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৭: শ্রেণিকক্ষে বাস্তব বন্ধুর পরিচয় দেওয়ার অনুশীলন (Activity B)",
      phase: "৪. সহপাঠী কথন ল্যাব (Friend Introduction Lab)",
      duration: "৭ মিনিট",
      themeColor: "from-indigo-600 to-purple-600",
      imageEmoji: "🗣️ 🤝 👥",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Activity B. Introduce a friend (page 17):",
          "Step 1: Greet your first friend: 'Hello, [Friend 1]!'",
          "Step 2: Respond politely: 'Fine, thanks.'",
          "Step 3: Introduce: '[Friend 1], meet my friend, [Friend 2]. And [Friend 2], this is [Friend 1].'",
          "Step 4: Polite exchange: 'Nice to meet you.' -> 'Nice meeting you, too.'"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ১৭ Activity B: নিজের ক্লাসের দুজন বন্ধুকে একে অপরের সাথে পরিচয় করিয়ে দেওয়ার বাস্তব প্র্যাকটিস।"
      },
      teacherNotes: "প্রতিটি বেঞ্চের শিক্ষার্থীদের একজন অন্য দুজনকে পরিচয় করিয়ে দেওয়ার সুযোগ দিন।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক নিজে দুজন শিক্ষার্থীর পরিচয় করিয়ে ডেমো দিন।",
        "ধাপ ২: শিক্ষার্থীদের নিজেদের মধ্যে অনুশীলন করতে বলুন।",
        "ধাপ ৩: শিক্ষকের সহায়তায় সংশোধন করুন।"
      ]
    },
    {
      id: 5,
      title: "Let's practise: Laila, Sagor & Mamun (p. 18)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৮: লায়লা, সাগর ও মামুনের হুবহু সংলাপের শূন্যস্থান পূরণ (100% Verbatim)",
      phase: "৫. লিখিত অনুশীলন (Practice Activity 1)",
      duration: "৬ মিনিট",
      themeColor: "from-purple-600 to-pink-600",
      imageEmoji: "✍️ 📋 🎯",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Let's practise 1. Look at activity A. Write the correct word/words in the blanks (page 18):",
          "Laila: Hello, Sagor!",
          "Sagor: Hi, Laila! [ How are you ]?",
          "Laila: Fine, thanks. Sagor, [ meet ] my friend, Mamun. And Mamun, this is Sagor.",
          "Sagor: Hello, Mamun! [ Nice ] to [ meet ] you.",
          "Laila / Mamun: Nice [ meeting ] you, too."
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ১৮ Let's practise ১ নম্বর অনুশীলন: Activity A লক্ষ করে লায়লা, সাগর ও মামুনের সংলাপের শূন্যস্থানগুলো সঠিক শব্দ দিয়ে পূরণ করো।"
      },
      teacherNotes: "শিক্ষার্থীদের পাঠ্যবইয়ের পৃষ্ঠা ১৮ খুলে শূন্যস্থানগুলো পেনসিল দিয়ে পূরণ করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডে শূন্যস্থানগুলো তুলুন।",
        "ধাপ ২: শিক্ষার্থীদের মুখে মুখে সঠিক শব্দ বলতে বলুন।",
        "ধাপ ৩: খাতায় সম্পূর্ণ সংলাপটি নির্ভুল বানানে লেখান।"
      ]
    },
    {
      id: 6,
      title: "Language Pattern: 'Meet my friend' & 'This is...'",
      subtitle: "পরিচয় করানোর ২টি প্রধান ইংরেজি বাক্য কাঠামোর ব্যবহার",
      phase: "৬. ব্যাকরণ ও বাক্য কাঠামো (Language Pattern)",
      duration: "৫ মিনিট",
      themeColor: "from-pink-600 to-rose-600",
      imageEmoji: "🧩 💡 📝",
      sceneType: "grammar",
      hasVisualStage: true,
      content: {
        englishText: [
          "Key Sentence Patterns for Introducing Others:",
          "1. 'Meet my friend, [Name].' (আমার বন্ধু [নাম]-এর সাথে পরিচিত হও)",
          "2. 'This is [Name].' (ইনি হলেন [নাম])",
          "Example: 'Sabiha, meet my friend, Mahmud Hasan. And Mahmud, this is Sabiha.'"
        ],
        banglaExplanation: "অন্যকে পরিচয় করিয়ে দেওয়ার সময় দুটি বাক্য কাঠামো সবচেয়ে বেশি ব্যবহৃত হয়:\n১. Meet my friend, [বন্ধুর নাম]।\n২. And [অপর বন্ধুর নাম], this is [প্রথম বন্ধুর নাম]।\nলক্ষ্য করো: 'This is'-এর পর সরাসরি নাম বসে।"
      },
      teacherNotes: "শিক্ষার্থীদের বোর্ডে বাক্য কাঠামোর ডায়াগ্রাম এঁকে বুঝিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: বাক্য দুটি বোর্ডে লিখুন।",
        "ধাপ ২: বন্ধুদের নাম পরিবর্তন করে মুখে মুখে ড্রিল করান।",
        "ধাপ ৩: কুইজে যাওয়ার প্রস্তুতি নিন।"
      ]
    },
    {
      id: 7,
      title: "Interactive Stage: 3-Friend Introduction Simulator",
      subtitle: "ভার্চুয়াল স্টেজে ৩ বন্ধুর কথোপকথন সিমুলেশন",
      phase: "৭. ইন্টারঅ্যাক্টিভ অনুশীলন ল্যাব (Interactive Simulation)",
      duration: "৬ মিনিট",
      themeColor: "from-rose-600 to-amber-700",
      imageEmoji: "👦 👧 👦 🌟",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Click on each student on stage to hear their introduction lines:",
          "1. Zabed welcomes Sabiha and introduces Mahmud.",
          "2. Sabiha greets Mahmud warmly: 'Nice to meet you.'",
          "3. Mahmud replies with a smile: 'Nice meeting you, too.'"
        ],
        banglaExplanation: "স্ক্রিনের ইন্টারেক্টিভ স্টেজে ক্লিক করে ৩ জন চরিত্রের মুখে সঠিক উচ্চারণে সংলাপ শোনো এবং পুনরাবৃত্তি করো।"
      },
      teacherNotes: "শিক্ষার্থীদের স্ক্রিনে ক্লিক করে প্রতিটি চরিত্রের কথা মনোযোগ দিয়ে শুনতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: অডিও সংলাপ শুনুন।",
        "ধাপ ২: শিক্ষার্থীদের স্বতঃস্ফূর্ত অংশগ্রহণ নিশ্চিত করুন।",
        "ধাপ ৩: মূল্যায়ন কুইজে প্রবেশ করুন।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "পাঠ মূল্যায়ন ও এনসিটিবি ২০২৬ ব্লুপ্রিন্ট অনুযায়ী প্রিন্টযোগ্য প্রশ্নপত্র",
      phase: "৮. চূড়ান্ত মূল্যায়ন ও বাড়ির কাজ (Evaluation & Assessment)",
      duration: "৪ মিনিট",
      themeColor: "from-amber-700 to-orange-800",
      imageEmoji: "🏆 📝 🌟",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed Lesson 8: Introducing someone.",
          "Key Takeaways:",
          "• Zabed introduces Mahmud Hasan to Sabiha on page 17.",
          "• We use 'Meet my friend, [Name]' and 'This is [Name]'.",
          "• When meeting someone for the first time, we say 'Nice to meet you.'",
          "Now take the evaluation quiz and download your 20-mark companion worksheet!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা সফলভাবে ৮ম পাঠ সম্পন্ন করেছ। এবার কুইজের উত্তর দাও এবং ২০ নম্বরের প্রিন্টযোগ্য ওয়ার্কশিট অনুশীলন করো।",
        quiz: {
          question: "Who is Zabed's friend introduced to Sabiha on page 17?",
          options: [
            "Mahmud Hasan",
            "Rahat",
            "Sanjoy",
            "Alex"
          ],
          answer: "Mahmud Hasan",
          hint: "Check Zabed's line on page 17: 'Sabiha, meet my friend, Mahmud Hasan.'"
        },
        activityTask: "তোমার ক্লাসের দুজন বন্ধুকে একে অপরের সাথে পরিচয় করিয়ে দেওয়ার একটি ৪ লাইনের সংলাপ খাতায় লেখো।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রশংসা করুন এবং ২০ নম্বরের মূল্যায়ন ওয়ার্কশিটটি প্রিন্ট করে পরীক্ষা নেওয়ার ব্যবস্থা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: মূল শিখনফলগুলো এক নজরে শিক্ষার্থীদের সাথে পুনরাবৃত্তি করুন।",
        "ধাপ ২: কুইজে অংশ নিতে বলুন।",
        "ধাপ ৩: ওয়ার্কশিট বাটনে ক্লিক করে মূল্যায়নপত্র ডাউনলোড করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Primary School Examination Board — Academic Year 2026",
    examTitle: "Class 3 English Assessment — Unit 1, Lesson 8: Introducing Someone",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today (NCTB 2026)",
    time: "40 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Multiple Choice Questions (5 Marks)",
        instruction: "Choose the correct answer and write the letter (a, b, c, or d) in the box:",
        content: [
          {
                    q: "1. Who introduces Mahmud Hasan on page 17?",
                    options: [
                              "a) Sabiha",
                              "b) Zabed",
                              "c) Rahat",
                              "d) Laila"
                    ],
                    answer: "a) Sabiha"
          },
          {
                    q: "2. Complete the sentence: 'Meet my ____________ , Mahmud Hasan.'",
                    options: [
                              "a) brother",
                              "b) friend",
                              "c) teacher",
                              "d) cousin"
                    ],
                    answer: "a) brother"
          },
          {
                    q: "3. What does Sabiha say to Mahmud Hasan on page 17?",
                    options: [
                              "a) Goodbye",
                              "b) Nice to meet you",
                              "c) Good night",
                              "d) Where are you going"
                    ],
                    answer: "a) Goodbye"
          },
          {
                    q: "4. How does Mahmud Hasan reply to Sabiha?",
                    options: [
                              "a) Nice meeting you, too",
                              "b) Fine thanks",
                              "c) I like football",
                              "d) No thank you"
                    ],
                    answer: "a) Nice meeting you, too"
          },
          {
                    q: "5. In Let's practise on page 18, who is Laila's friend?",
                    options: [
                              "a) Sagor",
                              "b) Mamun",
                              "c) Zabed",
                              "d) Alex"
                    ],
                    answer: "a) Sagor"
          }
]
      },
      {
        type: "fill_in_the_blanks",
        title: "Section B: Fill in the Blanks (Dialogue on page 18) (5 Marks)",
        instruction: "Complete the dialogue using words from the textbook (page 18):",
        content: [
          "a) Sagor: Hi, Laila! How ____________ you?",
          "b) Laila: Fine, thanks. Sagor, ____________ my friend, Mamun.",
          "c) Laila: And Mamun, this ____________ Sagor.",
          "d) Sagor: Hello, Mamun! Nice to ____________ you.",
          "e) Laila: Nice ____________ you, too."
        ]
      },
      {
        type: "true_false",
        title: "Section C: Write True or False (5 Marks)",
        instruction: "Write 'True' for correct statements and 'False' for incorrect statements:",
        content: [
          "a) Mahmud Hasan is Sabiha's brother.  [ _______ ]",
          "b) Zabed introduces Mahmud to Sabiha.  [ _______ ]",
          "c) Sabiha says 'Nice to meet you' to Mahmud.  [ _______ ]",
          "d) On page 18, Laila introduces Mamun to Sagor.  [ _______ ]",
          "e) 'Meet my friend' means আমার বন্ধুর সাথে পরিচিত হও।  [ _______ ]"
        ]
      },
      {
        type: "short_questions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "Answer the following questions in complete sentences based on the textbook:",
        content: [
          "1. What does Zabed say when introducing Mahmud Hasan to Sabiha?\n   Answer: ________________________________________________________________",
          "2. What do you say when meeting someone new for the first time?\n   Answer: ________________________________________________________________",
          "3. How does Mahmud reply to Sabiha on page 17?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// LESSON 9: NUMBERS 11-20 IN WORDS (pp. 19–20) — 100% NCTB 2026 VERBATIM
// =========================================================================
export const NUMBERS_11_20_WORDS_SLIDE_DECK: SlideDeck = {
  id: "numbers-11-20-words",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 1: Greetings, Farewells, Introductions and Numbers",
  lesson: "Lesson 9: Numbers 11-20 in words (Activity A, B, C & Let's practise)",
  topic: "Spelling and Matching Numbers 11 to 20 (pp. 19–20)",
  category: "english",
  thumbnailEmoji: "🔢 🔤 🎯",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Lesson 9: Numbers 11–20 in Words",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৯–২০: ১১ থেকে ২০ পর্যন্ত সংখ্যা বানান করে পড়া ও লেখা (Orientation)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-blue-600 to-cyan-600",
      imageEmoji: "🔢 🔤 👦",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Welcome to Lesson 9: Numbers 11-20 in words from pages 19 and 20!",
          "In Lesson 6, we learned numbers 1 to 10 in words.",
          "Today, we will master reading, writing, and spelling numbers 11 to 20 in words.",
          "Let's practice the authentic number words and classroom card games!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা ৩য় শ্রেণির পাঠ্যবইয়ের পৃষ্ঠা ১৯ ও ২০-এর 'Numbers 11-20 in words' পাঠটি শিখব। ১১ থেকে ২০ পর্যন্ত সংখ্যাগুলো কীভাবে ইংরেজিতে বানান করে পড়তে ও লিখতে হয় (eleven, twelve, thirteen... twenty), তা আমরা পাঠ্যবইয়ের অনুশীলনী ও গেমের মাধ্যমে শিখব।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: ১০-এর পরের সংখ্যাগুলোর ইংরেজি বানান তারা জানে কি না? বোর্ডে ১১ থেকে ২০ পর্যন্ত সংখ্যা লিখে দেখান।",
      quickTeachingSteps: [
        "ধাপ ১: ১১ থেকে ২০ সংখ্যা বোর্ডে বড় করে লিখুন।",
        "ধাপ ২: প্রতিটি সংখ্যার ইংরেজি বানান শিক্ষার্থীদের শোনান।",
        "ধাপ ৩: মূল শব্দভাণ্ডার ল্যাবে প্রবেশ করুন।"
      ]
    },
    {
      id: 2,
      title: "Key Vocabulary Lab: Number Spellings (11 to 15)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৯: ১১ থেকে ১৫ পর্যন্ত সংখ্যার বানান ও উচ্চারণ (Vocabulary Lab)",
      phase: "২. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary & Phonics 1)",
      duration: "৭ মিনিট",
      themeColor: "from-cyan-600 to-teal-600",
      imageEmoji: "🔤 🔢 📘",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Master the spelling and phonetics of numbers 11 to 15:"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ১৯-এর প্রথম ৫টি সংখ্যার বানান ও উচ্চারণ শিখে নিই:",
        vocabulary: [
          { word: "eleven", syllables: ["e", "lev", "en"], phonetic: "/ɪˈlev.ən/", meaning: "এগারো (১১)", partOfSpeech: "Numeral", example: "11 is eleven.", icon: "1️⃣" },
          { word: "twelve", syllables: ["twelve"], phonetic: "/twelv/", meaning: "বারো (১২)", partOfSpeech: "Numeral", example: "12 is twelve.", icon: "2️⃣" },
          { word: "thirteen", syllables: ["thir", "teen"], phonetic: "/ˌθɜːˈtiːn/", meaning: "তেরো (১৩)", partOfSpeech: "Numeral", example: "13 is thirteen.", icon: "3️⃣" },
          { word: "fourteen", syllables: ["four", "teen"], phonetic: "/ˌfɔːˈtiːn/", meaning: "চৌদ্দ (১৪)", partOfSpeech: "Numeral", example: "14 is fourteen.", icon: "4️⃣" },
          { word: "fifteen", syllables: ["fif", "teen"], phonetic: "/ˌfɪfˈtiːn/", meaning: "পনেরো (১৫)", partOfSpeech: "Numeral", example: "15 is fifteen.", icon: "5️⃣" }
        ]
      },
      teacherNotes: "e-lev-en এবং thir-teen শব্দের সিলেবল ড্রিল করান। twelve (twelv) ও fifteen (fif-teen) বানানের বিশেষ নিয়ম বুঝিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: শব্দের কার্ডে ক্লিক করে ফোনেটিক উচ্চারণ শোনান।",
        "ধাপ ২: ১১ থেকে ১৫ এর বানান খাতায় লেখান।",
        "ধাপ ৩: সমস্বরে পাঠ করান।"
      ]
    },
    {
      id: 3,
      title: "Key Vocabulary Lab: Number Spellings (16 to 20)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৯: ১৬ থেকে ২০ পর্যন্ত সংখ্যার বানান ও উচ্চারণ (Vocabulary Lab)",
      phase: "৩. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary & Phonics 2)",
      duration: "৭ মিনিট",
      themeColor: "from-teal-600 to-emerald-600",
      imageEmoji: "🔤 🔢 📘",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Master the spelling and phonetics of numbers 16 to 20:"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ১৯-এর পরবর্তী ৫টি সংখ্যার বানান ও উচ্চারণ শিখে নিই:",
        vocabulary: [
          { word: "sixteen", syllables: ["six", "teen"], phonetic: "/ˌsɪkˈstiːn/", meaning: "ষোলো (১৬)", partOfSpeech: "Numeral", example: "16 is sixteen.", icon: "6️⃣" },
          { word: "seventeen", syllables: ["sev", "en", "teen"], phonetic: "/ˌsev.ənˈtiːn/", meaning: "সতেরো (১৭)", partOfSpeech: "Numeral", example: "17 is seventeen.", icon: "7️⃣" },
          { word: "eighteen", syllables: ["eigh", "teen"], phonetic: "/ˌeɪˈtiːn/", meaning: "আঠারো (১৮)", partOfSpeech: "Numeral", example: "18 is eighteen.", icon: "8️⃣" },
          { word: "nineteen", syllables: ["nine", "teen"], phonetic: "/ˌnaɪnˈtiːn/", meaning: "উনিশ (১৯)", partOfSpeech: "Numeral", example: "19 is nineteen.", icon: "9️⃣" },
          { word: "twenty", syllables: ["twen", "ty"], phonetic: "/ˈtwen.ti/", meaning: "বিশ (২০)", partOfSpeech: "Numeral", example: "20 is twenty.", icon: "🔟" }
        ]
      },
      teacherNotes: "eighteen (একটি মাত্র 't') এবং twenty (twen-ty)-এর বানানের দিকে বিশেষ দৃষ্টি দিন।",
      quickTeachingSteps: [
        "ধাপ ১: ১৬ থেকে ২০ এর বানান বোর্ডে লিখুন।",
        "ধাপ ২: '-teen' প্রত্যয়ের উচ্চারণ শিক্ষার্থীদের স্পষ্ট করে শোনান।",
        "ধাপ ৩: সমস্বরে ড্রিল করান।"
      ]
    },
    {
      id: 4,
      title: "Activity A & B: Read and Write the Numbers in Words",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৯: ১১ থেকে ২০ পর্যন্ত সংখ্যা পড়া ও লেখা (100% Verbatim)",
      phase: "৪. লিখিত ও পঠন ড্রিল (Reading & Writing - Activity A & B)",
      duration: "৭ মিনিট",
      themeColor: "from-emerald-600 to-green-600",
      imageEmoji: "📖 ✏️ 🔢",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Activity A. Read and say (page 19):",
          "11: eleven, 12: twelve, 13: thirteen, 14: fourteen, 15: fifteen",
          "16: sixteen, 17: seventeen, 18: eighteen, 19: nineteen, 20: twenty",
          "Activity B. Write the numbers in words (page 19):",
          "Write each number word in your exercise book with accurate spelling."
        ],
        banglaExplanation: "এনসিটিবি হুবহু পাঠ্যাংশ (পৃষ্ঠা ১৯):\nActivity A: ১১ থেকে ২০ সংখ্যাগুলো মুখে মুখে জোরে পড়ো।\nActivity B: সংখ্যাগুলোর বানান খাতায় সুন্দর করে লেখো।"
      },
      teacherNotes: "শিক্ষার্থীদের খাতায় ১১ থেকে ২০ পর্যন্ত সংখ্যা অঙ্কে ও কথায় সুন্দর করে লিখতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: স্ক্রিনের প্রতিটি সংখ্যা জোরে উচ্চারণ করান।",
        "ধাপ ২: খাতায় লিখতে দিন।",
        "ধাপ ৩: ভুল বানান সংশোধন করে দিন।"
      ]
    },
    {
      id: 5,
      title: "Activity C: The Classroom Number Card Game",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৯: শ্রেণিকক্ষের অঙ্ক ও বানানের দলগত জোড়া খেলা (Activity C Game)",
      phase: "৫. ইন্টারঅ্যাক্টিভ দলগত খেলা (Number Game - Activity C)",
      duration: "৭ মিনিট",
      themeColor: "from-green-600 to-teal-700",
      imageEmoji: "🎮 👥 🃏",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Activity C. Game (page 19):",
          "Group 1: Every student picks a number card or wooden or plastic number in figure from 11 to 20. They make a line in order from 11 to 20.",
          "Group 2: Every student picks a number card in words. They show their cards and make a line from eleven to twenty.",
          "Finally, group-2 members choose their respective numbers from group-1 and make pairs. Continue……"
        ],
        banglaExplanation: "এনসিটিবি হুবহু গেম (পৃষ্ঠা ১৯):\nদল ১: প্রতিটি শিক্ষার্থী ১১ থেকে ২০ পর্যন্ত অঙ্কের কার্ড নিয়ে সারিবদ্ধভাবে দাঁড়াবে।\nদল ২: প্রতিটি শিক্ষার্থী eleven থেকে twenty পর্যন্ত বানানের কার্ড নিয়ে সারিবদ্ধভাবে দাঁড়াবে।\nএরপর দল ২-এর সদস্যরা দল ১-এর সংশ্লিষ্ট নম্বরের সাথে মিলিয়ে জোড়া গঠন করবে।"
      },
      teacherNotes: "শ্রেণিকক্ষে কার্ড তৈরি করে শিক্ষার্থীদের দুই দলে ভাগ করে এই খেলাটি পরিচালনা করুন। সংখ্যার সাথে বানানের সঠিক মিল নিশ্চিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: দল ১ ও দল ২-কে কার্ড বিতরণ করুন।",
        "ধাপ ২: দুই দলকে মুখোমুখি লাইনে দাঁড় করান।",
        "ধাপ ৩: জোড়া মেলানোর খেলা পরিচালনা করুন।"
      ]
    },
    {
      id: 6,
      title: "Let's practise 1: Match Column A with Column B (p. 20)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ২০: অঙ্ক ও বানানের কলাম মিলকরণ (100% Verbatim)",
      phase: "৬. কলাম মিলকরণ (Matching - Practice 1)",
      duration: "৬ মিনিট",
      themeColor: "from-teal-700 to-cyan-700",
      imageEmoji: "🧩 📋 🎯",
      sceneType: "sorting",
      hasVisualStage: true,
      content: {
        englishText: [
          "Let's practise 1. Match column A with column B. One is done for you (page 20):",
          "Numbers (A)   Numbers in words (B)",
          "• 11  ->  eleven",
          "• 12  ->  twelve",
          "• 15  ->  fifteen",
          "• 18  ->  eighteen",
          "• 20  ->  twenty"
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ২০-এর Let's practise ১ নম্বর অনুশীলন: কলাম A-এর নম্বরের সাথে কলাম B-এর সঠিক বানানের দাগ টেনে মিল করো।"
      },
      teacherNotes: "বইয়ের ২০ পৃষ্ঠার কলাম ম্যাচিং শিক্ষার্থীদের বইয়ে দাগ টেনে সম্পন্ন করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডে দুই পাশের কলাম লিখুন।",
        "ধাপ ২: শিক্ষার্থীদের ডেকে দাগ টেনে মিল করতে বলুন।",
        "ধাপ ৩: সঠিক উত্তর মিলিয়ে দিন।"
      ]
    },
    {
      id: 7,
      title: "Let's practise 2 & 3: Write in Words & Missing Numbers (p. 20)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ২০: কথায় সংখ্যা লেখা ও মিসিং বানান শূন্যস্থান পূরণ (100% Verbatim)",
      phase: "৭. লিখিত বানান ও শূন্যস্থান পূরণ (Practice 2 & 3)",
      duration: "৬ মিনিট",
      themeColor: "from-cyan-700 to-blue-700",
      imageEmoji: "✍️ 🔢 📝",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "2. Write the number in words (page 20):",
          "• 12: twelve   • 13: thirteen   • 14: fourteen   • 15: fifteen   • 18: eighteen   • 20: twenty",
          "3. Write the missing number in words in the blanks (page 20):",
          "[ eleven ], twelve, thirteen, [ fourteen ], fifteen, [ sixteen ], [ seventeen ], eighteen, [ nineteen ], [ twenty ]."
        ],
        banglaExplanation: "পাঠ্যবইয়ের পৃষ্ঠা ২০-এর Let's practise ২ ও ৩ নম্বর অনুশীলন:\n২. সংখ্যাগুলো দেখে বানান করে শব্দে লেখো।\n৩. ১১ থেকে ২০ পর্যন্ত বাদ পড়া সংখ্যার বানানগুলো শূন্যস্থানে বসাও।"
      },
      teacherNotes: "শিক্ষার্থীদের খাতায় পুরো অনুক্রমটি (eleven to twenty) নির্ভুল বানানে লিখতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডে শূন্যস্থানগুলো তুলুন।",
        "ধাপ ২: শিক্ষার্থীদের সঠিক বানান লিখতে বলুন।",
        "ধাপ ৩: খাতা দেখে মূল্যায়ন করুন।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "পাঠ মূল্যায়ন ও এনসিটিবি ২০২৬ ব্লুপ্রিন্ট অনুযায়ী প্রিন্টযোগ্য প্রশ্নপত্র",
      phase: "৮. চূড়ান্ত মূল্যায়ন ও বাড়ির কাজ (Evaluation & Assessment)",
      duration: "৪ মিনিট",
      themeColor: "from-blue-700 to-indigo-800",
      imageEmoji: "🏆 📝 🌟",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Outstanding job! You have completed Lesson 9: Numbers 11-20 in words.",
          "Key Takeaways:",
          "• Number spellings from 11 (eleven) to 20 (twenty).",
          "• In Activity C, Group 1 numbers match Group 2 words.",
          "• You have completed the entire Unit 1 of Class 3 English!",
          "Now take the evaluation quiz and download your 20-mark companion worksheet!"
        ],
        banglaExplanation: "চমৎকার অগ্রগতি! তোমরা সফলভাবে ৯ম পাঠ এবং সমগ্র ইউনিট ১ সম্পন্ন করেছ। এবার কুইজের উত্তর দাও এবং ২০ নম্বরের প্রিন্টযোগ্য ওয়ার্কশিট অনুশীলন করো।",
        quiz: {
          question: "What is the correct spelling of number 15 on page 19?",
          options: [
            "fifteen",
            "fiveteen",
            "fiftein",
            "fifty"
          ],
          answer: "fifteen",
          hint: "The correct spelling of 15 is f-i-f-t-e-e-n (fifteen)."
        },
        activityTask: "১১ থেকে ২০ পর্যন্ত সংখ্যাগুলো খাতায় অঙ্কে ও পাশে ৩ বার করে বানান করে লেখো।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রশংসা করুন এবং ২০ নম্বরের মূল্যায়ন ওয়ার্কশিটটি প্রিন্ট করে পরীক্ষা নেওয়ার ব্যবস্থা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: সমগ্র ইউনিট ১-এর প্রধান অর্জনগুলো পর্যালোচনা করুন।",
        "ধাপ ২: কুইজে অংশ নিতে বলুন।",
        "ধাপ ৩: ওয়ার্কশিট বাটনে ক্লিক করে মূল্যায়নপত্র ডাউনলোড করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Primary School Examination Board — Academic Year 2026",
    examTitle: "Class 3 English Assessment — Unit 1, Lesson 9: Numbers 11-20 in Words",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today (NCTB 2026)",
    time: "40 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Multiple Choice Questions (5 Marks)",
        instruction: "Choose the correct answer and write the letter (a, b, c, or d) in the box:",
        content: [
          {
                    q: "1. What is the number in words for '12' (page 19)?",
                    options: [
                              "a) Twelv",
                              "b) Twelve",
                              "c) Twenteen",
                              "d) Twanty"
                    ],
                    answer: "a) Twelv"
          },
          {
                    q: "2. Which number comes right after thirteen?",
                    options: [
                              "a) Twelve",
                              "b) Fourteen",
                              "c) Fifteen",
                              "d) Sixteen"
                    ],
                    answer: "a) Twelve"
          },
          {
                    q: "3. What is the spelling for 18 on page 20?",
                    options: [
                              "a) Eightteen",
                              "b) Eighteen",
                              "c) Eitin",
                              "d) Ateen"
                    ],
                    answer: "a) Eightteen"
          },
          {
                    q: "4. How many 't's are there in the word 'eighteen'?",
                    options: [
                              "a) One",
                              "b) Two",
                              "c) Three",
                              "d) None"
                    ],
                    answer: "a) One"
          },
          {
                    q: "5. What is the word for 20?",
                    options: [
                              "a) Twelve",
                              "b) Twenty",
                              "c) Two",
                              "d) Tenten"
                    ],
                    answer: "a) Twelve"
          }
]
      },
      {
        type: "fill_in_the_blanks",
        title: "Section B: Fill in the Missing Number Words (p. 20) (5 Marks)",
        instruction: "Write the missing number words in the blanks:",
        content: [
          "a) eleven, twelve, ____________",
          "b) thirteen, ____________ , fifteen",
          "c) fifteen, ____________ , seventeen",
          "d) seventeen, eighteen, ____________",
          "e) nineteen, ____________"
        ]
      },
      {
        type: "true_false",
        title: "Section C: Write True or False (5 Marks)",
        instruction: "Write 'True' for correct statements and 'False' for incorrect statements:",
        content: [
          "a) 11 in words is 'eleven'.  [ _______ ]",
          "b) 14 in words is 'fourteen'.  [ _______ ]",
          "c) 15 in words is 'fiveteen'.  [ _______ ]",
          "d) 20 in words is 'twenty'.  [ _______ ]",
          "e) In Activity C, Group 1 holds cards in figures 11 to 20.  [ _______ ]"
        ]
      },
      {
        type: "short_questions",
        title: "Section D: Write Numbers in Words (5 Marks)",
        instruction: "Write the following numbers in words with accurate spelling (page 20):",
        content: [
          "1. Write 13 in words:\n   Answer: ________________________________________________________________",
          "2. Write 15 in words:\n   Answer: ________________________________________________________________",
          "3. Write 20 in words:\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};
