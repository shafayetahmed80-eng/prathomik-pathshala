import type { SlideDeck } from "./slidesData";

// =========================================================================
// DECK: CLASS 3 ENGLISH - UNIT 7 LESSON 2: USES OF WATER (NCTB 2026 VERBATIM)
// Authentic Textbook Reference: pp. 101–103 (PDF pp. 107–109)
// =========================================================================
export const USES_OF_WATER_SLIDE_DECK: SlideDeck = {
  id: "uses-of-water",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 7: Save Our Water",
  lesson: "Lesson 2: Uses of water (Activity A, B, C, D, E & Let's practise)",
  topic: "Uses of water, Sources, and Preventing Pollution (pp. 101–103)",
  category: "english",
  thumbnailEmoji: "💧 🌾 🌿",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Unit 7: Uses of Water",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১০১: পানিকে কেন জীবন বলা হয় এবং পানির উৎস (Orientation)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-sky-500 to-cyan-600",
      imageEmoji: "💧 🌍 🌿",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Welcome, learners! Welcome to Class 3 English for Today.",
          "Today we will read Unit 7, Lesson 2: Uses of water from pages 101 to 103.",
          "Look at the world around us: humans, animals, and plants all need water to live.",
          "Oceans, rivers, rain, and ponds are the main sources of water.",
          "Let's read the authentic story and learn why water is called life!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) ২০২৬ অনুমোদিত ৩য় শ্রেণির পাঠ্যবইয়ের ইউনিট ৭, লেসন ২ (পৃষ্ঠা ১০১–১০৩)-এর 'Uses of water' পাঠটি শিখব। পানিকে কেন জীবন বলা হয়, পানির প্রধান উৎসগুলো কী কী এবং কেন পানিকে দূষণ থেকে রক্ষা করতে হবে—তা আমরা পাঠ্যবইয়ের হুবহু বাক্য থেকে জানব।"
      },
      teacherNotes: "পাঠ্যবইয়ের ১০১ পৃষ্ঠার ছবি দেখিয়ে শিক্ষার্থীদের কাছে জানতে চান: ছবিতে মানুষ, কৃষক, গাছপালা কী করছে? তারা প্রতিদিন কী কী কাজে পানি ব্যবহার করে?",
      quickTeachingSteps: [
        "ধাপ ১: ১০১ পৃষ্ঠার Activity A-এর ছবিগুলো শিক্ষার্থীদের মনোযোগ দিয়ে দেখতে বলুন।",
        "ধাপ ২: পানি ছাড়া কোনো জীব বা উদ্ভিদ বাঁচতে পারে কি না তা প্রশ্ন করুন।",
        "ধাপ ৩: মূল পাঠের শব্দভাণ্ডারে প্রবেশ করুন।"
      ]
    },
    {
      id: 2,
      title: "Activity A: Look and say (Key Vocabulary)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১০১: এনসিটিবি অনুমোদিত মূল ৮টি শব্দ (Vocabulary Lab)",
      phase: "২. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary & Phonics)",
      duration: "৭ মিনিট",
      themeColor: "from-cyan-600 to-blue-600",
      imageEmoji: "🔤 💧 📘",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Look at the pictures on page 101 and say the words aloud with accurate pronunciation:"
        ],
        banglaExplanation: "পাঠ্যবইয়ের ১০১ পৃষ্ঠার Activity A-এর ৮টি মূল শব্দ, সিলেবল ভাঙন ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "humans",
            syllables: ["hu", "mans"],
            phonetic: "/ˈhjuː.mənz/",
            meaning: "মানুষ / মানবজাতি",
            partOfSpeech: "Noun",
            example: "All humans need water to live.",
            icon: "👥"
          },
          {
            word: "plants",
            syllables: ["plants"],
            phonetic: "/plɑːnts/",
            meaning: "উদ্ভিদ / গাছপালা",
            partOfSpeech: "Noun",
            example: "Plants and trees take water from the soil.",
            icon: "🌱"
          },
          {
            word: "rain",
            syllables: ["rain"],
            phonetic: "/reɪn/",
            meaning: "বৃষ্টি / বৃষ্টির পানি",
            partOfSpeech: "Noun",
            example: "Rain is one of the main sources of water.",
            icon: "🌧️"
          },
          {
            word: "cooking",
            syllables: ["cook", "ing"],
            phonetic: "/ˈkʊk.ɪŋ/",
            meaning: "রান্নাবান্না করা",
            partOfSpeech: "Noun",
            example: "We use clean water for cooking food.",
            icon: "🍳"
          },
          {
            word: "bathing",
            syllables: ["bath", "ing"],
            phonetic: "/ˈbɑː.ðɪŋ/",
            meaning: "গোসল করা",
            partOfSpeech: "Noun",
            example: "We use water for bathing every day.",
            icon: "🚿"
          },
          {
            word: "soil",
            syllables: ["soil"],
            phonetic: "/sɔɪl/",
            meaning: "মাটি",
            partOfSpeech: "Noun",
            example: "Plants take water from the soil for their growth.",
            icon: "🪴"
          },
          {
            word: "farmer",
            syllables: ["farm", "er"],
            phonetic: "/ˈfɑː.mər/",
            meaning: "কৃষক",
            partOfSpeech: "Noun",
            example: "The farmers use water to grow crops.",
            icon: "👨‍🌾"
          },
          {
            word: "crops",
            syllables: ["crops"],
            phonetic: "/krɒps/",
            meaning: "ফসল / শস্য",
            partOfSpeech: "Noun",
            example: "Farmers need water to grow healthy crops.",
            icon: "🌾"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের hu-mans, cook-ing, bath-ing, farm-er শব্দের সিলেবল ভাঙন হাততালি দিয়ে ড্রিল করান। প্রতিটি শব্দের কার্ডে ক্লিক করে সঠিক অডিও শোনান।",
      quickTeachingSteps: [
        "ধাপ ১: Activity A-এর ৮টি শব্দ বোর্ডে লিখে জোরে উচ্চারণ করান।",
        "ধাপ ২: প্রতিটি শব্দের বাংলা অর্থ ও বাস্তব উদাহরণের সাথে মিলিয়ে দিন।",
        "ধাপ ৩: শিক্ষার্থীদের একক ও সমস্বরে পাঠ করান।"
      ]
    },
    {
      id: 3,
      title: "Activity B: Read the text (Part 1 - Water is Life)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১০১: এনসিটিবির হুবহু মূল পাঠ্যাংশ (Paragraph 1 - 100% Verbatim)",
      phase: "৩. মূল পাঠ্যাংশ পাঠ (Authentic Reading - Part 1)",
      duration: "৮ মিনিট",
      themeColor: "from-blue-600 to-indigo-600",
      imageEmoji: "📖 💧 🌊",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Water is called life.",
          "All humans, animals and plants need water to live.",
          "Oceans, rivers, rain and ponds are the main sources of water.",
          "We need water every day.",
          "We use water for drinking, cooking, bathing and cleaning.",
          "Animals drink water every day.",
          "Plants and trees also take water from the soil for their growth.",
          "The farmers use water to grow crops.",
          "So, we cannot live without water."
        ],
        banglaExplanation: "এনসিটিবি হুবহু পাঠ্যাংশ: পানিকে জীবন বলা হয়। বেঁচে থাকার জন্য সকল মানুষ, পশুপাখি এবং উদ্ভিদের পানি প্রয়োজন। সমুদ্র, নদী, বৃষ্টি এবং পুকুর হলো পানির প্রধান উৎস। প্রতিদিন আমাদের পানির প্রয়োজন হয়। আমরা পান করা, রান্না করা, গোসল করা এবং পরিষ্কার-পরিচ্ছন্নতার জন্য পানি ব্যবহার করি। প্রাণীরা প্রতিদিন পানি পান করে। গাছপালা তাদের বৃদ্ধির জন্য মাটি থেকে পানি গ্রহণ করে। কৃষকেরা ফসল ফলাতে পানি ব্যবহার করেন। তাই পানি ছাড়া আমরা বাঁচতে পারি না।"
      },
      teacherNotes: "পাঠ্যবইয়ের ১০১ পৃষ্ঠার ১ম প্যারাগ্রাফটি শিক্ষক প্রথমে পরিষ্কার উচ্চারণে পড়ে শোনাবেন। শিক্ষার্থীরা লাইনের নিচে আঙুল দিয়ে অনুসরণ করবে এবং পরে সমস্বরে পড়বে।",
      quickTeachingSteps: [
        "ধাপ ১: বাক্য ধরে ধরে অডিও কারাওকে চালিয়ে সরব পাঠ করান।",
        "ধাপ ২: 'Water is called life' এবং 'sources of water' বাক্যগুলোর অর্থ বুঝিয়ে দিন।",
        "ধাপ ৩: পানির ৪টি প্রধান উৎস (oceans, rivers, rain, ponds) শিক্ষার্থীদের মুখ দিয়ে বলিয়ে নিন।"
      ]
    },
    {
      id: 4,
      title: "Activity B: Read the text (Part 2 - Save Water from Pollution)",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১০১: এনসিটিবির হুবহু মূল পাঠ্যাংশ (Paragraph 2 - 100% Verbatim)",
      phase: "৪. মূল পাঠ্যাংশ পাঠ (Authentic Reading - Part 2)",
      duration: "৮ মিনিট",
      themeColor: "from-indigo-600 to-teal-700",
      imageEmoji: "🛑 🚯 🌍",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Sometimes, we do not get clean water for our everyday use.",
          "We pollute the water sources.",
          "It degrades the quality of water.",
          "Polluted water is also dangerous for our life.",
          "So, we must save water from pollution.",
          "We should not throw any rubbish, plastics, etc. into ponds, rivers and oceans.",
          "We must keep the rubbish in a fixed place."
        ],
        banglaExplanation: "এনসিটিবি হুবহু পাঠ্যাংশ: মাঝে মাঝে আমরা আমাদের প্রাত্যহিক ব্যবহারের জন্য পরিষ্কার পানি পাই না। আমরা পানির উৎসগুলোকে দূষিত করি। এটি পানির গুণগত মান নষ্ট করে। দূষিত পানি আমাদের জীবনের জন্যও বিপজ্জনক। তাই পানিকে দূষণ থেকে আমাদের অবশ্যই রক্ষা করতে হবে। পুকুর, নদী ও সমুদ্রে আমাদের কোনো আবর্জনা, প্লাস্টিক ইত্যাদি ফেলা উচিত নয়। আমাদের অবশ্যই একটি নির্দিষ্ট স্থানে আবর্জনা রাখতে হবে।"
      },
      teacherNotes: "শিক্ষার্থীদের বোঝান কেন খোলা পানিতে প্লাস্টিক বা ময়লা ফেলা উচিত নয়। 'fixed place' (নির্দিষ্ট স্থান বা ডাস্টবিন)-এ ময়লা ফেলার অভ্যাস ক্লাসরুমেও চর্চা করান।",
      quickTeachingSteps: [
        "ধাপ ১: ২য় প্যারাগ্রাফটি মডেল রিডিং দিন।",
        "ধাপ ২: 'pollute', 'degrades', 'dangerous' এবং 'fixed place' শব্দের তাৎপর্য ব্যাখ্যা করুন।",
        "ধাপ ৩: শিক্ষার্থীদের জোড়ায় জোড়ায় (Pair reading) একে অপরকে পড়ে শোনাতে বলুন।"
      ]
    },
    {
      id: 5,
      title: "Activity C: Complete the sentences with the right words",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১০২: আসল শূন্যস্থান পূরণ ও সর্টিং ল্যাব (Activity C)",
      phase: "৫. পাঠভিত্তিক অনুশীলন (Activity C)",
      duration: "৬ মিনিট",
      themeColor: "from-teal-600 to-emerald-600",
      imageEmoji: "✏️ 📋 🧩",
      sceneType: "sorting",
      hasVisualStage: true,
      content: {
        englishText: [
          "Complete the sentences with the right words from the textbook box (page 102):",
          "Word Box: [ soil | damages | life | harmful | water ]",
          "a) Water is a part of our life.",
          "b) Animals need water to live.",
          "c) Plants take water from the soil.",
          "d) Pollution damages the water quality.",
          "e) Polluted water is harmful for our life."
        ],
        banglaExplanation: "পাঠ্যবইয়ের ১০২ পৃষ্ঠার Activity C: বক্সের ৫টি সঠিক শব্দ দিয়ে বাক্যগুলো পূরণ করো। কুইজ ও শূন্যস্থান পূরণের মাধ্যমে শব্দগুলোর সঠিক প্রয়োগ আত্মস্থ করো।",
        sortingGame: {
          instruction: "Categorize the items according to textbook page 101 into Sources of Water vs Uses of Water:",
          categories: {
            cat1: { id: "sources", label: "Sources of Water", icon: "🌊", theme: "from-sky-500 to-blue-600" },
            cat2: { id: "uses", label: "Uses of Water", icon: "🚰", theme: "from-teal-500 to-emerald-600" }
          },
          items: [
            { id: "i1", label: "Oceans", category: "sources", icon: "🌊" },
            { id: "i2", label: "Rivers", category: "sources", icon: "🏞️" },
            { id: "i3", label: "Rain", category: "sources", icon: "🌧️" },
            { id: "i4", label: "Ponds", category: "sources", icon: "🦆" },
            { id: "i5", label: "Drinking", category: "uses", icon: "🥛" },
            { id: "i6", label: "Cooking", category: "uses", icon: "🍳" },
            { id: "i7", label: "Bathing", category: "uses", icon: "🚿" },
            { id: "i8", label: "Cleaning", category: "uses", icon: "🧼" }
          ]
        }
      },
      teacherNotes: "শিক্ষার্থীদের খাতায় Activity C-এর উত্তরগুলো লিখতে বলুন। বইয়ের পৃষ্ঠা ১০২-এর Activity C শতভাগ সম্পন্ন হয়েছে কি না তা পর্যবেক্ষণ করুন।",
      quickTeachingSteps: [
        "ধাপ ১: স্ক্রিনের সর্টিং গেমে পানির উৎস ও পানির ব্যবহার আলাদা করান।",
        "ধাপ ২: Activity C-এর ৫টি শূন্যস্থান খাতায় লিখে পূরণ করতে বলুন।",
        "ধাপ ৩: সঠিক উত্তর মিলিয়ে দিন।"
      ]
    },
    {
      id: 6,
      title: "Activity D & E: Ask and answer in pairs",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১০২: জোড়ায় কথন ও প্রশ্নোত্তর অনুশীলন (Pairwork Dialogue)",
      phase: "৬. প্রশ্নোত্তর ও কথন দক্ষতা (Speaking & Comprehension)",
      duration: "৬ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "💬 👦 👧",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Read the text in B again. Ask and answer in pairs (Activity D & E, page 102):"
        ],
        banglaExplanation: "পাঠ্যবইয়ের ১০২ পৃষ্ঠার Activity D ও E: পাঠ্যাংশটি পুনরায় পড়ে সহপাঠীর সাথে জোড়ায় প্রশ্ন ও উত্তর অনুশীলন করো এবং অনুশীলন খাতায় লেখো:",
        dialogue: [
          {
            speaker: "Fatiha (Student A)",
            team: "Team A",
            text: "What are the main sources of water?",
            avatar: "👧"
          },
          {
            speaker: "Sanjoy (Student B)",
            team: "Team B",
            text: "Oceans, rivers, rain and ponds are the main sources of water.",
            avatar: "👦"
          },
          {
            speaker: "Fatiha (Student A)",
            team: "Team A",
            text: "What do we do with water in our everyday life?",
            avatar: "👧"
          },
          {
            speaker: "Sanjoy (Student B)",
            team: "Team B",
            text: "We use water for drinking, cooking, bathing and cleaning.",
            avatar: "👦"
          },
          {
            speaker: "Fatiha (Student A)",
            team: "Team A",
            text: "Why do trees take water from the soil?",
            avatar: "👧"
          },
          {
            speaker: "Sanjoy (Student B)",
            team: "Team B",
            text: "Plants and trees take water from the soil for their growth.",
            avatar: "👦"
          },
          {
            speaker: "Fatiha (Student A)",
            team: "Team A",
            text: "How can you save water from pollution?",
            avatar: "👧"
          },
          {
            speaker: "Sanjoy (Student B)",
            team: "Team B",
            text: "We should not throw rubbish or plastics into ponds, rivers and oceans.",
            avatar: "👦"
          },
          {
            speaker: "Fatiha (Student A)",
            team: "Team A",
            text: "Why should you keep all rubbish in a fixed place?",
            avatar: "👧"
          },
          {
            speaker: "Sanjoy (Student B)",
            team: "Team B",
            text: "We must keep rubbish in a fixed place to save water and keep our life safe.",
            avatar: "👦"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের ক্লাসরুমে জোড়ায় ভাগ করুন। একজন প্রশ্ন করবে এবং অন্যজন উত্তর দেবে। এরপর ভূমিকা পরিবর্তন করে আবার চর্চা করান।",
      quickTeachingSteps: [
        "ধাপ ১: প্রশ্ন ও উত্তরের মডেল পাঠ দিন।",
        "ধাপ ২: জোড়ায় ভাগ করে ৫টি প্রশ্নের উত্তর মুখে মুখে বলতে দিন।",
        "ধাপ ৩: উত্তরগুলো খাতায় লিখতে বলুন (Activity E)।"
      ]
    },
    {
      id: 7,
      title: "Let's practise: Rearrange Letters & True/False",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১০৩: বর্ণ সাজিয়ে শব্দ গঠন ও সত্য-মিথ্যা যাচাই (100% Verbatim)",
      phase: "৭. যোগ্যতা যাচাই ও ব্যাকরণ ড্রিল (Practice & Grammar Drill)",
      duration: "৬ মিনিট",
      themeColor: "from-teal-700 to-cyan-800",
      imageEmoji: "🧩 ✍️ 🎯",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "1. Rearrange the letters to make words. Start with the capital letter (page 103):",
          "• P a l t n  ->  Plant",
          "• i n R a  ->  Rain",
          "• S i o l  ->  Soil",
          "• C o p r  ->  Crop",
          "• r m F a e r  ->  Farmer",
          "2. Write True or False for the sentences below (page 103):",
          "a. Water is important for our life.  ->  True",
          "b. Trees and crops are the sources of water.  ->  False",
          "c. Plants take water from the soil.  ->  True",
          "d. Pollution increases the water quality.  ->  False",
          "e. We should throw rubbish at any place.  ->  False"
        ],
        banglaExplanation: "পাঠ্যবইয়ের ১০৩ পৃষ্ঠার Let's practise অংশের ১ ও ২ নম্বর অনুশীলন। বড় হাতের বর্ণ দিয়ে শুরু করে এলোমেলো বর্ণ সাজিয়ে শব্দ তৈরি এবং সত্য/মিথ্যা যাচাই।"
      },
      teacherNotes: "১০৩ পৃষ্ঠার ১ নম্বরের রি-অ্যারেঞ্জ এবং ২ নম্বরের ট্রু/ফলস শিক্ষার্থীদের খাতায় লিখে সম্পন্ন করতে বলুন। মিথ্যা বাক্যগুলোর সঠিক উত্তর কী হবে তা ক্লাসে আলোচনা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: এলোমেলো বর্ণ বোর্ডে লিখে শিক্ষার্থীদের ডেকে সঠিক বানান তৈরি করান।",
        "ধাপ ২: ট্রু/ফলস বাক্যগুলো পড়ে কারণসহ সত্য বা মিথ্যা নির্ধারণ করান।",
        "ধাপ ৩: Activity 3 অনুযায়ী plant, pond, pollution, drink, throw দিয়ে বাক্য তৈরি করার দিকনির্দেশনা দিন।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "পাঠ মূল্যায়ন ও এনসিটিবি ২০২৬ ব্লুপ্রিন্ট অনুযায়ী প্রিন্টযোগ্য প্রশ্নপত্র",
      phase: "৮. চূড়ান্ত মূল্যায়ন ও বাড়ির কাজ (Evaluation & Assessment)",
      duration: "৪ মিনিট",
      themeColor: "from-cyan-800 to-blue-900",
      imageEmoji: "🏆 📝 🌟",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Outstanding job! You have completed Unit 7, Lesson 2: Uses of water (pages 101–103).",
          "Key Learnings:",
          "• Water is called life. We need water every day for drinking, cooking, bathing and cleaning.",
          "• Oceans, rivers, rain and ponds are the main sources of water.",
          "• Plants and trees take water from the soil for their growth, and farmers use it to grow crops.",
          "• We must never throw rubbish or plastics into water sources, and always keep rubbish in a fixed place.",
          "Now take the evaluation quiz and download your 20-mark companion worksheet!"
        ],
        banglaExplanation: "চমৎকার অগ্রগতি! তোমরা ৩য় শ্রেণির পাঠ্যবইয়ের ইউনিট ৭, লেসন ২ (পৃষ্ঠা ১০১–১০৩)-এর পুরো পাঠ সফলভাবে সম্পন্ন করেছ। এবার মূল্যায়ন কুইজে অংশ নাও এবং ২০ নম্বরের প্রিন্টযোগ্য ওয়ার্কশিট অনুশীলন করো।",
        quiz: {
          question: "Where do plants and trees take water from for their growth according to page 101?",
          options: [
            "From the soil",
            "From plastic bottles",
            "From dirty rubbish",
            "From chemical waste"
          ],
          answer: "From the soil",
          hint: "Check the textbook sentence on page 101: 'Plants and trees also take water from the soil for their growth.'"
        },
        activityTask: "বইয়ের পৃষ্ঠা ১০৩-এর Activity 3 অনুযায়ী plant, pond, pollution, drink এবং throw শব্দগুলো দিয়ে ১টি করে বাক্য লিখে হোমওয়ার্ক হিসেবে জমা দাও।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রশংসা করুন এবং ২০ নম্বরের প্রিন্টযোগ্য ওয়ার্কশিটটি প্রিন্ট করে পরীক্ষা নেওয়ার ব্যবস্থা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: মূল শিখনফলগুলো এক নজরে শিক্ষার্থীদের সাথে পুনরাবৃত্তি করুন।",
        "ধাপ ২: কুইজে অংশ নিতে বলুন এবং সঠিক উত্তরের ব্যাখ্যা দিন।",
        "ধাপ ৩: ওয়ার্কশিট বাটনে ক্লিক করে মূল্যায়নপত্র ডাউনলোড বা প্রিন্ট করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Primary School Examination Board — Academic Year 2026",
    examTitle: "Class 3 English Assessment — Unit 7, Lesson 2: Uses of Water",
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
                    q: "1. What is water called in the textbook (page 101)?",
                    options: [
                              "a) Food",
                              "b) Life",
                              "c) Game",
                              "d) Stone"
                    ],
                    answer: "a) Food"
          },
          {
                    q: "2. Which one is a main source of water?",
                    options: [
                              "a) Mountain",
                              "b) Forest",
                              "c) Rain and river",
                              "d) Sand"
                    ],
                    answer: "a) Mountain"
          },
          {
                    q: "3. What do plants and trees take water from?",
                    options: [
                              "a) Air",
                              "b) Soil",
                              "c) Plastic",
                              "d) Wall"
                    ],
                    answer: "a) Air"
          },
          {
                    q: "4. Who uses water to grow crops?",
                    options: [
                              "a) Doctors",
                              "b) Drivers",
                              "c) Farmers",
                              "d) Tailors"
                    ],
                    answer: "a) Doctors"
          },
          {
                    q: "5. Where must we keep rubbish to prevent water pollution?",
                    options: [
                              "a) In the pond",
                              "b) In the river",
                              "c) In the ocean",
                              "d) In a fixed place"
                    ],
                    answer: "a) In the pond"
          }
]
      },
      {
        type: "fill_in_the_blanks",
        title: "Section B: Fill in the Blanks with Words from the Box (5 Marks)",
        instruction: "Complete the sentences with the right words from the box [ soil | damages | life | harmful | water ] (page 102 Activity C):",
        content: [
          "a) Water is a part of our ____________ .",
          "b) Animals need ____________ to live.",
          "c) Plants take water from the ____________ .",
          "d) Pollution ____________ the water quality.",
          "e) Polluted water is ____________ for our life."
        ]
      },
      {
        type: "true_false",
        title: "Section C: Write True or False (5 Marks)",
        instruction: "Write 'True' for correct statements and 'False' for incorrect statements (page 103 Activity 2):",
        content: [
          "a) Water is important for our life.  [ _______ ]",
          "b) Trees and crops are the sources of water.  [ _______ ]",
          "c) Plants take water from the soil.  [ _______ ]",
          "d) Pollution increases the water quality.  [ _______ ]",
          "e) We should throw rubbish at any place.  [ _______ ]"
        ]
      },
      {
        type: "short_questions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "Answer the following questions in complete sentences based on the textbook (page 102 Activity D):",
        content: [
          "1. What are the main sources of water?\n   Answer: ________________________________________________________________",
          "2. What do we use water for in our everyday life?\n   Answer: ________________________________________________________________",
          "3. How can you save water from pollution?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};
