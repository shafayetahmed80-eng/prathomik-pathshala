export interface SyllableWord {
  word: string;
  syllables: string[];
  phonetic: string;
  meaning: string;
  partOfSpeech: string;
  example: string;
  icon: string;
}

export interface SortingItem {
  id: string;
  label: string;
  category: string;
  icon: string;
}

export interface PunctuationChallenge {
  id: string;
  sentenceBefore: string;
  missingMark: string;
  sentenceAfter?: string;
  meaning: string;
  options: string[];
}

export interface SlideItem {
  id: number;
  title: string;
  subtitle: string;
  phase: string;
  duration: string;
  themeColor: string;
  imageEmoji: string;
  sceneType?: "summer" | "winter" | "dialogue" | "activity" | "grammar" | "kite_sky" | "crafting" | "crafting_step" | "kite_builder" | "campus" | "id_card" | string;
  hasVisualStage?: boolean;
  content: {
    englishText: string[];
    banglaExplanation?: string;
    vocabulary?: SyllableWord[];
    dialogue?: { 
      speaker: string; 
      team: string;
      text: string; 
      avatar: string;
    }[];
    sortingGame?: {
      instruction: string;
      categories?: {
        cat1: { id: string; label: string; icon: string; theme?: string };
        cat2: { id: string; label: string; icon: string; theme?: string };
      };
      items: SortingItem[];
    };
    punctuationDrill?: {
      instruction: string;
      challenges: PunctuationChallenge[];
    };
    quiz?: { 
      question: string; 
      options: string[]; 
      answer: string;
      hint: string;
    };
    activityTask?: string;
  };
  teacherNotes: string;
  quickTeachingSteps?: string[];
}

export interface SlideDeck {
  id: string;
  grade: string;
  subject: string;
  unit: string;
  lesson: string;
  topic: string;
  category: "english" | "bangla" | "math";
  thumbnailEmoji: string;
  totalSlides: number;
  slides: SlideItem[];
  worksheetCompanion: {
    schoolHeader: string;
    examTitle: string;
    classGrade: string;
    subject: string;
    time: string;
    marks: number;
    sections: {
      type: string;
      title: string;
      instruction: string;
      content: unknown;
    }[];
  };
}

// =========================================================================
// DECK 1: CLASS 3 ENGLISH - THE ANT AND THE GRASSHOPPER (PILOT)
// =========================================================================
export const ANT_AND_GRASSHOPPER_DECK: SlideDeck = {
  id: "ant-and-grasshopper",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 8: Facts and Fables",
  lesson: "Lesson 1: The Ant and the Grasshopper",
  topic: "এনসিটিবি পাঠ্যবই পৃষ্ঠা ১০৯-১১৩ (100% Authentic Text)",
  category: "english",
  thumbnailEmoji: "🐜 🦗",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Activity A: Colour the Picture",
      subtitle: "Unit 8: Facts and Fables | Lesson 1 (Page 109 Activity A)",
      phase: "১. প্রেষণা ও পূর্বজ্ঞান যাচাই (Warm-up)",
      duration: "৫ মিনিট",
      themeColor: "from-amber-500 to-orange-500",
      imageEmoji: "🎨 🐜 🦗",
      sceneType: "summer",
      content: {
        englishText: [],
        activityTask: "শিক্ষার্থীদের স্ক্রিনের ইন্টারেক্টিভ এসভিজি ছবিতে রং করতে বলুন এবং পিঁপড়া ও ঘাসফড়িং নিয়ে প্রাক-পঠন আলোচনা করান।"
      },
      teacherNotes: "শিক্ষার্থীদের পাঠের প্রতি আগ্রহী করতে শুরুতেই প্রজেক্টরে পিঁপড়া ও ঘাসফড়িংয়ের আউটলাইন ড্রয়িং দেখিয়ে আলোচনা করতে দিন। সবাইকে হাত তুলে কথা বলতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: স্ক্রিনের ছবিতে রং দিয়ে দৃশ্যপট সাজাতে বলুন।",
        "ধাপ ২: শিক্ষার্থীদের জিজ্ঞেস করুন ছবিতে পিঁপড়া ও ঘাসফড়িং কী করছে।",
        "ধাপ ৩: প্রাক-পঠন আলোচনা শেষে পরবর্তী শব্দভাণ্ডার স্লাইডে যান।"
      ]
    },
    {
      id: 2,
      title: "Key Vocabulary Lab",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১০৯-১১৩: মূল শব্দভাণ্ডার ও সিলেবল ভাঙন (Vocabulary & Syllables)",
      phase: "২. শব্দ পরিচিতি ও সরব পাঠ (Vocabulary Lab)",
      duration: "৭ মিনিট",
      themeColor: "from-emerald-500 to-teal-500",
      imageEmoji: "🔤 🐜 🦗",
      sceneType: "summer",
      content: {
        englishText: [],
        vocabulary: [
          {
            word: "Grasshopper",
            syllables: ["Grass", "hop", "per"],
            phonetic: "/ˈɡræsˌhɑː.pər/",
            meaning: "ঘাসফড়িং (আমোদপ্রিয় পতঙ্গ)",
            partOfSpeech: "Noun",
            example: "The grasshopper is enjoying the sun.",
            icon: "🦗"
          },
          {
            word: "Grassy",
            syllables: ["Grass", "y"],
            phonetic: "/ˈɡræs.i/",
            meaning: "ঘাসযুক্ত / শ্যামল (মাঠের বিশেষণ)",
            partOfSpeech: "Adjective",
            example: "They live in a grassy field.",
            icon: "🌾"
          },
          {
            word: "Summer",
            syllables: ["Sum", "mer"],
            phonetic: "/ˈsʌm.ər/",
            meaning: "গ্রীষ্মকাল (রৌদ্রময় ঋতু)",
            partOfSpeech: "Noun",
            example: "It is a sunny summer morning.",
            icon: "☀️"
          },
          {
            word: "Winter",
            syllables: ["Win", "ter"],
            phonetic: "/ˈwɪn.tər/",
            meaning: "শীতকাল (ঠান্ডা ঋতু)",
            partOfSpeech: "Noun",
            example: "She is storing food for the winter.",
            icon: "❄️"
          },
          {
            word: "Corn",
            syllables: ["Corn"],
            phonetic: "/kɔːrn/",
            meaning: "শস্য / ভুট্টা (খাদ্যশস্য)",
            partOfSpeech: "Noun",
            example: "She is carrying an ear of corn.",
            icon: "🌽"
          },
          {
            word: "Cozy",
            syllables: ["Co", "zy"],
            phonetic: "/ˈkoʊ.zi/",
            meaning: "উষ্ণ ও আরামদায়ক",
            partOfSpeech: "Adjective",
            example: "She is passing time happily at her cozy home.",
            icon: "🏡"
          },
          {
            word: "Gloomy",
            syllables: ["Gloom", "y"],
            phonetic: "/ˈɡluː.mi/",
            meaning: "বিষণ্ন / মেঘাচ্ছন্ন (Page 112)",
            partOfSpeech: "Adjective",
            example: "Winter days can be cold and gloomy.",
            icon: "☁️"
          }
        ]
      },
      teacherNotes: "প্রতিটি শব্দের ওপর ক্লিক করে দেশীয় সহজ উচ্চারণ শিক্ষার্থীদের শোনান। সিলেবল ভাঙন (যেমন: Grass-hop-per) হাততালি দিয়ে তাল মিলিয়ে অনুশীলন করান।",
      quickTeachingSteps: [
        "ধাপ ১: শব্দের কার্ডে ক্লিক করে ফোনেটিক্স সাউন্ড শোনান।",
        "ধাপ ২: প্রতিটি সিলেবলের সাথে হাততালি দিয়ে শিশুদের ড্রিল করান।",
        "ধাপ ৩: বাক্যে প্রয়োগটি পড়ে শুনিয়ে অর্থ পরিষ্কার করুন।"
      ]
    },
    {
      id: 3,
      title: "Story Part 1: The Two Friends",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১০৯: মূল গল্প পাঠ (Activity B Paragraph 1)",
      phase: "৩. মূল গল্প পাঠ উপস্থাপন (Story Presentation)",
      duration: "৮ মিনিট",
      themeColor: "from-amber-400 to-yellow-500",
      imageEmoji: "☀️ 🦗 🐜",
      sceneType: "summer",
      hasVisualStage: true,
      content: {
        englishText: [
          "An ant and a grasshopper are two good friends.",
          "They live in a grassy field.",
          "It is a sunny summer morning.",
          "The grasshopper is enjoying the sun.",
          "He is dancing and singing happily.",
          "He does not usually like to work."
        ],
        banglaExplanation: "এনসিটিবি পৃষ্ঠা ১০৯: একটি পিঁপড়া এবং একটি ঘাসফড়িং ছিল দুই ভালো বন্ধু। তারা একটি ঘাসযুক্ত মাঠে বাস করত। এটি একটি রৌদ্রোজ্জ্বল গ্রীষ্মের সকাল। ঘাসফড়িং রোদ উপভোগ করছে। সে আনন্দে নাচছে আর গান গাইছে। সাধারণত কাজ করতে তার একদম ভালো লাগে না।"
      },
      teacherNotes: "ঘাসফড়িংয়ের নাচের ও গানের অঙ্গভঙ্গি অভিনয় করে শিক্ষার্থীদের দেখান। শিক্ষার্থীদের জিজ্ঞেস করুন: ঘাসফড়িং কাজ না করে কী করছে?",
      quickTeachingSteps: [
        "ধাপ ১: গ্রীষ্মের মনোরম আবহ তুলে ধরুন।",
        "ধাপ ২: ঘাসফড়িংয়ের নাচের আনন্দের অভিব্যক্তি শিক্ষার্থীদের সাথে আলোচনা করুন।",
        "ধাপ ৩: বাক্যের প্রতিটি শব্দে ক্লিক করে অডিও শোনান।"
      ]
    },
    {
      id: 4,
      title: "Story Part 2: Hard Work vs. Play",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১১০: মূল সংলাপ ও দলগত অভিনয় (Activity B & F)",
      phase: "৪. চরিত্র সংলাপ ও দ্বৈত অভিনয় (Roleplay)",
      duration: "৮ মিনিট",
      themeColor: "from-blue-500 to-indigo-500",
      imageEmoji: "🐜 🌽 🦗",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Now the ant is passing by the grasshopper.",
          "She is carrying an ear of corn to her house.",
          "She is storing food for the winter.",
          "The grasshopper laughs at her and says:"
        ],
        banglaExplanation: "এনসিটিবি পৃষ্ঠা ১১০: এমন সময় পিঁপড়াটি ঘাসফড়িংয়ের পাশ দিয়ে যাচ্ছিল। সে তার ঘরে একটি ভুট্টার ছড়া বয়ে নিয়ে যাচ্ছিল। সে শীতের জন্য খাদ্য জমা করছে। ঘাসফড়িং তাকে দেখে হেসে বলল: 'আরে পিঁপড়া! তুমি সারাক্ষণ এত পরিশ্রম করো কেন? এসো আমার সাথে রোদ উপভোগ করো।' পিঁপড়া তার পথ ধরে চলে গেল এবং কাজ চালিয়ে গেল।",
        dialogue: [
          {
            speaker: "Grasshopper",
            team: "Team B (Grasshopper)",
            text: "Hey Ant! Why do you work hard all the time? Come and join me. Let's enjoy the sun.",
            avatar: "🦗"
          },
          {
            speaker: "Ant",
            team: "Team A (Ant)",
            text: "The ant goes her way and continues her work.",
            avatar: "🐜"
          }
        ]
      },
      teacherNotes: "এনসিটিবি পৃষ্ঠা ১১৩-এর Activity F অনুযায়ী শিক্ষার্থীদের জোড়ায় ভাগ করে পিঁপড়া ও ঘাসফড়িঙের সংলাপ অভিনয় করান (Roleplay in pairs)।",
      quickTeachingSteps: [
        "ধাপ ১: বাম পাশের দলকে পিঁপড়ার চরিত্র ও ডান পাশের দলকে ঘাসফড়িংয়ের ডায়লগ পড়তে বলুন।",
        "ধাপ ২: ডায়লগে মুখের ভাব ও স্বরের ওঠানামা বজায় রাখতে বলুন।",
        "ধাপ ৩: ডায়লগ শেষ হলে দল পরিবর্তন করে পুনরায় চর্চা করান।"
      ]
    },
    {
      id: 5,
      title: "Story Part 3: Winter Arrives",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১১০-১১১: শীতের আগমন ও পরিণতি (Story Paragraph 3)",
      phase: "৫. ফলাফল ও পরিণতি বিশ্লেষণ (Consequence)",
      duration: "৫ মিনিট",
      themeColor: "from-cyan-600 to-blue-700",
      imageEmoji: "❄️ 🍂 🥶",
      sceneType: "winter",
      hasVisualStage: true,
      content: {
        englishText: [
          "After the summer, the winter begins.",
          "The days become very cold. The leaves are falling everywhere.",
          "The grasshopper finds no food to eat. He starves, and he becomes weak and sad.",
          "On the other hand, the ant has plenty of food. She is passing her time happily at her cozy home."
        ],
        banglaExplanation: "এনসিটিবি পৃষ্ঠা ১১০-১১১: গ্রীষ্মের পর শীত শুরু হলো। দিনগুলো খুব ঠান্ডা হয়ে গেল। চারদিকে পাতা ঝরতে লাগল। ঘাসফড়িং খাওয়ার মতো কোনো খাবার পেল না। সে অনাহারে থাকল এবং দুর্বল ও দুঃখিত হয়ে পড়ল। অন্যদিকে পিঁপড়ার প্রচুর খাবার রয়েছে। সে তার উষ্ণ ও আরামদায়ক ঘরে সুখে সময় কাটাচ্ছে।"
      },
      teacherNotes: "পরিশ্রমের সুফল এবং অলসতার কুফল নিয়ে শিক্ষার্থীদের অনুভূতি জানতে চান। পিঁপড়া কেন সুখে আছে আর ঘাসফড়িং কেন কষ্টে পড়ল?",
      quickTeachingSteps: [
        "ধাপ ১: বরফ পড়ার অ্যানিমেশনের সাথে শীতের আবহ বর্ণনা করুন।",
        "ধাপ ২: ঘাসফড়িংয়ের কষ্টের অনুভূতি শিক্ষার্থীদের মুখে প্রকাশ করতে বলুন।",
        "ধাপ ৩: পিঁপড়ার দূরদর্শিতার প্রশংসা করে আলোচনা করুন।"
      ]
    },
    {
      id: 6,
      title: "Ask and Answer in Pairs",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১১২: জোড়ায় প্রশ্নোত্তর অনুশীলন (Textbook Activity D)",
      phase: "৫. প্রশ্নোত্তর ও নীতিশিক্ষা (Activity D & Moral)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-600 to-pink-600",
      imageEmoji: "💡 👥 🌟",
      sceneType: "summer",
      content: {
        englishText: [
          "Activity D: Ask and answer the following questions in pairs:",
          "1. Where do the ant and the grasshopper live? -> They live in a grassy field.",
          "2. What does the ant carry to her house? -> She carries an ear of corn.",
          "3. What happens to the grasshopper in the winter? -> The grasshopper finds no food to eat. He starves, and he becomes weak and sad.",
          "Moral Lesson: 'Work hard today, enjoy tomorrow.'"
        ],
        banglaExplanation: "এনসিটিবি পৃষ্ঠা ১১২ Activity D: জোড়ায় প্রশ্ন ও উত্তর অনুশীলন করো। গল্প থেকে আমরা শিখলাম: সময়ের কাজ সময়ে করলে ভবিষ্যৎ নিরাপদ ও আনন্দময় হয়।",
        activityTask: "সহপাঠীর সাথে প্রশ্ন-উত্তর অনুশীলন: একজন প্রশ্ন করবে, অন্যজন উত্তর দেবে।"
      },
      teacherNotes: "শিশুদের দৈনন্দিন জীবনের সাথে মিলান: যেমন পরীক্ষার প্রস্তুতি আগে নিলে নিশ্চিন্ত থাকা যায় এবং বন্ধুদের বিপদে সাহায্য করা মহৎ গুণ।",
      quickTeachingSteps: [
        "ধাপ ১: প্রশ্নগুলো বোর্ডে উচ্চারণ করিয়ে শোনান।",
        "ধাপ ২: জোড়ায় শিক্ষার্থীদের একে অপরকে প্রশ্ন করতে বলুন।",
        "ধাপ ৩: নীতিবাক্যটি বোর্ডে লিখে সবাইকে খাতায় তুলতে বলুন।"
      ]
    },
    {
      id: 7,
      title: "Activity E: Summer vs. Winter Sorting",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১১২: ঋতুভিত্তিক শব্দ বাছাই খেলা (Sorting Game)",
      phase: "৭. আনন্দদায়ক খেলা (Interactive Game)",
      duration: "৬ মিনিট",
      themeColor: "from-rose-500 to-amber-500",
      imageEmoji: "🧺 ☀️ ❄️",
      sceneType: "activity",
      content: {
        englishText: [],
        banglaExplanation: "এনসিটিবি পৃষ্ঠা ১১২ Activity E-এর হুবহু শব্দগুলো: dry leaves, sunny, enjoying the sun, gloomy, warm day, cold। সঠিক ঝুড়িতে বাছাই করো:",
        sortingGame: {
          instruction: "পাঠ্যবইয়ের Activity E-এর শব্দগুলো সঠিক ঝুড়িতে পাঠাও:",
          items: [
            { id: "item-1", label: "sunny", category: "summer", icon: "☀️" },
            { id: "item-2", label: "dry leaves", category: "winter", icon: "🍂" },
            { id: "item-3", label: "enjoying the sun", category: "summer", icon: "🌱" },
            { id: "item-4", label: "gloomy", category: "winter", icon: "☁️" },
            { id: "item-5", label: "warm day", category: "summer", icon: "🌽" },
            { id: "item-6", label: "cold", category: "winter", icon: "❄️" }
          ]
        }
      },
      teacherNotes: "প্রজেক্টরের কাছে শিক্ষার্থীদের ডেকে এনে ড্র্যাগ বা টাচ করে সঠিক ঝুড়িতে শব্দ রাখতে বলুন। Activity E সম্পূর্ণ হলে প্রশংসা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: বইয়ের পৃষ্ঠা ১১২-এর Activity E খুলে দেখতে বলুন।",
        "ধাপ ২: শিক্ষার্থীদের বোর্ডে ডেকে সঠিক সিজন নির্বাচন করতে দিন।",
        "ধাপ ৩: দুটি দলের মধ্যে পয়েন্ট দিয়ে প্রতিযোগিতা করান।"
      ]
    },
    {
      id: 8,
      title: "Grammar Focus: Punctuation Marks",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১১৩: বিরাম চিহ্নের সঠিক নিয়ম ও অনুশীলন (Activity G & H)",
      phase: "৭. ব্যাকরণ ও পূর্ণাঙ্গ মূল্যায়ন (Page 113 Grammar)",
      duration: "৫ মিনিট",
      themeColor: "from-indigo-600 to-violet-600",
      imageEmoji: "✍️ ❓ ❗️",
      sceneType: "grammar",
      content: {
        englishText: [
          "NCTB Page 113 Grammar Focus: Use of punctuation marks:",
          "1. For a surprise, an exclamation mark (!). Example: 'What a beautiful bird!'",
          "2. For a question, a question mark (?). Example: 'Who is he?'",
          "3. For a pause in a sentence, a comma (,). Example: 'I read, write and play.'",
        ],
        banglaExplanation: "পাঠ্যবই পৃষ্ঠা ১১৩: বিস্ময় প্রকাশে বিস্ময়সূচক চিহ্ন (!), প্রশ্নে প্রশ্নবোধক চিহ্ন (?), এবং থামার জন্য কমা (,) বসে। নিচের শূন্যস্থানে সঠিক চিহ্ন বসাও:",
        punctuationDrill: {
          instruction: "পাঠ্যবইয়ের Activity H-এর বাক্যের সঠিক বিরামচিহ্ন নির্বাচন করো:",
          challenges: [
            {
              id: "punc-1",
              sentenceBefore: "What a bright day",
              missingMark: "!",
              meaning: "কি চমৎকার উজ্জ্বল দিন! (Activity H)",
              options: ["!", "?", ","]
            },
            {
              id: "punc-2",
              sentenceBefore: "The grasshopper is dancing",
              sentenceAfter: "singing and playing in the sun.",
              missingMark: ",",
              meaning: "ঘাসফড়িং রোদে নাচছে, গান গাইছে ও খেলছে। (Activity H)",
              options: [",", "!", "?"]
            },
            {
              id: "punc-3",
              sentenceBefore: "What is the ant doing",
              missingMark: "?",
              meaning: "পিঁপড়াটি কী করছে? (Activity H)",
              options: ["?", "!", ","]
            },
            {
              id: "punc-4",
              sentenceBefore: "What a beautiful bird",
              missingMark: "!",
              meaning: "কি সুন্দর পাখি! (Textbook Example)",
              options: ["!", "?", ","]
            }
          ]
        }
      },
      teacherNotes: "বোর্ডে বিরামচিহ্নের কার্ডগুলো দেখিয়ে প্রতিটি বাক্যের অর্থ বুঝিয়ে দিন। ক্লাস শেষে ১-ক্লিকে বাড়ির কাজের প্রিন্ট শিট দিন।",
      quickTeachingSteps: [
        "ধাপ ১: ৩টি প্রধান বিরামচিহ্নের কাজ ব্যাখ্যা করুন।",
        "ধাপ ২: Activity H-এর প্যাসেজটি খাতায় লিখে পাঙ্কচুয়েশন বসাতে দিন।",
        "ধাপ ৩: 'ওয়ার্কশিট প্রিন্ট' বাটনে ক্লিক করে বাড়ির কাজ বিতরণ করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "সরকারি প্রাথমিক বিদ্যালয়, মডেল ক্লাসরুম",
    examTitle: "Classroom Practice Worksheet: The Ant and the Grasshopper (Unit 8, Lesson 1)",
    classGrade: "Class 3 (তৃতীয় শ্রেণি)",
    subject: "English for Today (Pages 109-114)",
    time: "20 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Choose the best answer (Textbook Activity C)",
        instruction: "Read the questions and tick (✓) the correct answer:",
        content: [
          {
            q: "1. What is the grasshopper doing in the summer morning?",
            options: ["A) Sleeping", "B) Dancing and singing happily", "C) Storing food", "D) Working in the field"],
            answer: "B) Dancing and singing happily"
          },
          {
            q: "2. What is the ant carrying to her house?",
            options: ["A) An ear of corn", "B) A piece of bread", "C) Dry leaves", "D) Cold water"],
            answer: "A) An ear of corn"
          },
          {
            q: "3. What happens to the grasshopper in the winter?",
            options: ["A) He is very happy", "B) He finds plenty of food", "C) He finds no food and becomes sad", "D) He goes to sleep"],
            answer: "C) He finds no food and becomes sad"
          }
        ]
      },
      {
        type: "matching",
        title: "Section B: Column Sorting (Textbook Activity E)",
        instruction: "Match each word/phrase to its correct season (Summer or Winter):",
        content: [
          { a: "sunny", b: "Summer" },
          { a: "dry leaves", b: "Winter" },
          { a: "warm day", b: "Summer" },
          { a: "gloomy / cold", b: "Winter" }
        ]
      },
      {
        type: "punctuation",
        title: "Section C: Punctuation Marks (Textbook Activity H)",
        instruction: "Put the correct punctuation mark (!, ?, ,) in the blanks:",
        content: [
          "a) What a bright day __",
          "b) The grasshopper is dancing __ singing and playing in the sun.",
          "c) What is the ant doing __",
          "d) Who is he __"
        ]
      },
      {
        type: "moral",
        title: "Section D: Moral Question",
        instruction: "Write 1 or 2 sentences: Why is it important to work hard like the ant?",
        content: [
          "Answer: ____________________________________________________________________",
          "____________________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 2: CLASS 3 ENGLISH - MAKING A PAPER KITE (NEW!)
// =========================================================================
export const KITE_SLIDE_DECK: SlideDeck = {
  id: "making-a-paper-kite",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 3: Commands & Instructions",
  lesson: "Lesson 2: Following Instructions — Making a Paper Kite",
  topic: "এনসিটিবি পাঠ্যবই পৃষ্ঠা ৩৫-৪০ (Crafting & Sequential Instructions)",
  category: "english",
  thumbnailEmoji: "🪁 🎋",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Activity A: Let's Fly a Kite! (ঘুড়ির ভুবন)",
      subtitle: "Unit 3: Commands & Instructions | Lesson 2 (Page 35 Activity A)",
      phase: "১. প্রেষণা ও পূর্বজ্ঞান যাচাই (Warm-up)",
      duration: "৫ মিনিট",
      themeColor: "from-sky-500 to-indigo-500",
      imageEmoji: "🪁 🌤️ 🎋",
      sceneType: "kite_sky",
      hasVisualStage: true,
      content: {
        englishText: [
          "Do you like flying kites?",
          "What shape and colours are your favourite kites?",
          "Let's look at the sky and see how high a kite can fly!"
        ],
        activityTask: "শিক্ষার্থীদের স্ক্রিনের নীল আকাশে উড়ন্ত রঙিন ঘুড়ি দেখিয়ে ঘুড়ির বিভিন্ন রং ও ওড়ানোর আনন্দ নিয়ে ক্লাসে আলোচনা করুন।",
        banglaExplanation: "এনসিটিবি পৃষ্ঠা ৩৫ Activity A: ঘুড়ি ওড়ানো শিশুদের ভীষণ প্রিয় একটি খেলা। আকাশে ঘুড়ি কীভাবে ভাসে এবং কী কী উপকরণ দিয়ে ঘুড়ি বানানো যায়, তা নিয়ে শুরুতেই মুক্ত আলোচনা করুন।"
      },
      teacherNotes: "ক্লাসের শুরুতে প্রজেক্টরে উড়ন্ত ঘুড়ি ও দমকা হাওয়ার দৃশ্য দেখিয়ে শিক্ষার্থীদের আগ্রহ তৈরি করুন। আকাশে ঘুড়ি দেখে তারা কী অনুভব করে তা ইংরেজিতে প্রকাশ করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: স্ক্রিনের আকাশে ঘুড়ির গতি ও বিভিন্ন রঙের নাম শিক্ষার্থীদের বলতে বলুন।",
        "ধাপ ২: 'দমকা হাওয়া' বাটনে ক্লিক করে বাতাসের গতি পরিবর্তনের প্রভাব দেখান।",
        "ধাপ ৩: প্রাক-আলোচনা শেষে পরবর্তী শব্দভাণ্ডার (Vocabulary) ল্যাবে যান।"
      ]
    },
    {
      id: 2,
      title: "Key Vocabulary & Syllables Lab",
      subtitle: "পাঠ্যবই: প্রয়োজনীয় উপকরণ ও ক্রিয়াপদের সিলেবল ভাঙন (Materials & Action Verbs)",
      phase: "২. শব্দ পরিচিতি ও সরব পাঠ (Vocabulary Lab)",
      duration: "৭ মিনিট",
      themeColor: "from-emerald-500 to-teal-500",
      imageEmoji: "🔤 🪁 ✂️",
      sceneType: "crafting",
      content: {
        englishText: [],
        vocabulary: [
          {
            word: "Kite",
            syllables: ["Kite"],
            phonetic: "/kaɪt/",
            meaning: "ঘুড়ি (হাওয়ায় ওড়ার খেলনা)",
            partOfSpeech: "Noun",
            example: "The colourful kite is flying in the sky.",
            icon: "🪁"
          },
          {
            word: "Square",
            syllables: ["Square"],
            phonetic: "/skweər/",
            meaning: "বর্গাকার / চারকোনা সমান আকৃতি",
            partOfSpeech: "Adjective",
            example: "Take a square piece of thin coloured paper.",
            icon: "⏹️"
          },
          {
            word: "Bamboo",
            syllables: ["Bam", "boo"],
            phonetic: "/bæmˈbuː/",
            meaning: "বাঁশ / বাঁশের তৈরি কাঠি",
            partOfSpeech: "Noun",
            example: "We need two thin bamboo sticks.",
            icon: "🎋"
          },
          {
            word: "Bend",
            syllables: ["Bend"],
            phonetic: "/bend/",
            meaning: "বাঁকা করা / ধনুকের মতো বাঁকানো",
            partOfSpeech: "Verb",
            example: "Bend the second stick into an arc.",
            icon: "🏹"
          },
          {
            word: "Fasten",
            syllables: ["Fas", "ten"],
            phonetic: "/ˈfæs.ən/",
            meaning: "দৃঢ়ভাবে আটকানো / শক্ত করে বাঁধা",
            partOfSpeech: "Verb",
            example: "Fasten the sticks securely with strong glue.",
            icon: "🧷"
          },
          {
            word: "Ribbons",
            syllables: ["Rib", "bons"],
            phonetic: "/ˈrɪb.ənz/",
            meaning: "রঙিন ফিতা (লেজে ব্যবহৃত)",
            partOfSpeech: "Noun",
            example: "Attach colourful ribbons for the tail.",
            icon: "🎀"
          },
          {
            word: "Windy",
            syllables: ["Win", "dy"],
            phonetic: "/ˈwɪn.di/",
            meaning: "দমকা বাতাসযুক্ত আবহাওয়া",
            partOfSpeech: "Adjective",
            example: "The kite flies high in the windy sky.",
            icon: "💨"
          }
        ]
      },
      teacherNotes: "প্রতিটি শব্দের ওপর ক্লিক করে দেশীয় সহজ উচ্চারণ শিক্ষার্থীদের শোনান। বিশেষ করে 'Fasten' শব্দের 't' অনুচ্চারিত (silent t) থাকে—তা শিক্ষার্থীদের লক্ষ্য করান।",
      quickTeachingSteps: [
        "ধাপ ১: শব্দের কার্ডে ক্লিক করে সঠিক ফোনেটিক্স সাউন্ড শোনান।",
        "ধাপ ২: সিলেবল ভাঙন (যেমন: Bam-boo, Fas-ten) হাততালি দিয়ে প্র্যাকটিস করান।",
        "ধাপ ৩: বাক্যে প্রয়োগটি পড়ে শুনিয়ে বাংলা অর্থ পরিষ্কার করুন।"
      ]
    },
    {
      id: 3,
      title: "Step-by-Step Instructions: Making a Paper Kite",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৩৫-৩৬: অনুক্রমিক নির্দেশনামূলক পাঠ (Sequencer Words)",
      phase: "৩. মূল পাঠ উপস্থাপন (Instruction Presentation)",
      duration: "৮ মিনিট",
      themeColor: "from-amber-400 to-orange-500",
      imageEmoji: "📄 🎋 🪁",
      sceneType: "crafting_step",
      hasVisualStage: true,
      content: {
        englishText: [
          "Making a paper kite is fun and easy.",
          "First, take a square piece of thin coloured paper.",
          "Next, get two thin bamboo sticks.",
          "Place one stick straight down the middle of the paper.",
          "Bend the second stick into an arc across the paper.",
          "Fasten the sticks securely with strong glue and tape.",
          "Then, tie a long piece of light string to the sticks.",
          "Finally, attach colourful paper ribbons at the bottom for the tail.",
          "Now your kite is ready to fly in the windy sky!"
        ],
        banglaExplanation: "এনসিটিবি পাঠ্য: কাগজের ঘুড়ি বানানো খুবই সহজ এবং মজার। প্রথমে, একটি পাতলা চারকোনা রঙিন কাগজ নাও। এরপর, দুটি পাতলা বাঁশের কাঠি নাও। একটি কাঠি কাগজের ঠিক মাঝখান দিয়ে সোজাভাবে রাখো। দ্বিতীয় কাঠিটিকে ধনুকের মতো বাঁকিয়ে কাগজের আড়াআড়ি রাখো। আঠা ও টেপ দিয়ে কাঠি দুটি দৃঢ়ভাবে শক্ত করে লাগাও। তারপর, কাঠিগুলোর সাথে লম্বা ও হালকা সুতা বাঁধো। সবশেষে, নিচে লেজের জন্য রঙিন কাগজের ফিতা জুড়ে দাও। ব্যাস! এখন তোমার ঘুড়ি দমকা বাতাসে ওড়ার জন্য প্রস্তুত!"
      },
      teacherNotes: "শিক্ষার্থীদের অনুক্রমিক শব্দগুলোর (First, Next, Then, Finally, Now) দিকে মনোযোগ দিতে বলুন। প্রতিটি বাক্যে ক্লিক করে স্পিচ ও শব্দার্থ লক্ষ্য করান।",
      quickTeachingSteps: [
        "ধাপ ১: বাম পাশের ভিজ্যুয়াল স্টেজে ধাপে ধাপে তৈরির চিত্র প্রদর্শন করুন।",
        "ধাপ ২: বাক্যের অনুক্রমিক শব্দগুলো হাত তুলে শিক্ষার্থীদের উচ্চস্বরে পড়তে বলুন।",
        "ধাপ ৩: সরব পাঠ শেষে পুরো প্রক্রিয়াটি সংক্ষেপে পুনরাবৃত্তি করুন।"
      ]
    },
    {
      id: 4,
      title: "Pair Dialogue: Master Kite Maker",
      subtitle: "সহপাঠীর সাথে জোড়ায় আলোচনা: ঘুড়ি তৈরির কথোপকথন (Activity B Dialogue)",
      phase: "৪. চরিত্র সংলাপ ও দ্বৈত অভিনয় (Roleplay)",
      duration: "৮ মিনিট",
      themeColor: "from-blue-500 to-indigo-500",
      imageEmoji: "🗣️ 🪁 🤝",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice the dialogue in pairs.",
          "One student acts as the Guide (নির্দেশক) and the other acts as the Maker (কারিগর):"
        ],
        banglaExplanation: "এনসিটিবি নির্দেশিকা অনুযায়ী শ্রেণিকক্ষে জোড়ায় সংলাপ চর্চা (Pair Work): একজন বন্ধু ঘুড়ি বানানোর প্রতিটি ধাপ নির্দেশ করবে এবং অন্যজন সেই অনুযায়ী উপকরণ সাজাবে।",
        dialogue: [
          {
            speaker: "Student A (Guide)",
            team: "Team A (Guide)",
            text: "Hello! Let's make a colourful paper kite together!",
            avatar: "👦"
          },
          {
            speaker: "Student B (Maker)",
            team: "Team B (Maker)",
            text: "Great idea! What do we need first?",
            avatar: "👧"
          },
          {
            speaker: "Student A (Guide)",
            team: "Team A (Guide)",
            text: "First, take a square sheet of thin paper and two bamboo sticks.",
            avatar: "👦"
          },
          {
            speaker: "Student B (Maker)",
            team: "Team B (Maker)",
            text: "How do I place the sticks on the paper?",
            avatar: "👧"
          },
          {
            speaker: "Student A (Guide)",
            team: "Team A (Guide)",
            text: "Place one straight down the middle, and bend the other into an arc!",
            avatar: "👦"
          },
          {
            speaker: "Student B (Maker)",
            team: "Team B (Maker)",
            text: "Then fasten with glue, tie the string, and attach the tail ribbons!",
            avatar: "👧"
          },
          {
            speaker: "Student A (Guide)",
            team: "Team A (Guide)",
            text: "Hooray! Now our kite is soaring high in the windy sky!",
            avatar: "👦"
          }
        ]
      },
      teacherNotes: "শ্রেণিকক্ষে শিক্ষার্থীদের দুটি দলে ভাগ করে নিন: বাম দল Team A (Guide) এবং ডান দল Team B (Maker)। ডায়লগে মুখের ভাব ও স্বরের ওঠানামা বজায় রাখতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: Team A ও Team B-কে চিহ্নিত করে ডায়লগ কার্ড বুঝিয়ে দিন।",
        "ধাপ ২: প্রতিটি সংলাপ শেষে হাততালি দিয়ে শিক্ষার্থীদের উৎসাহিত করুন।",
        "ধাপ ৩: ভূমিকা বদল (Role Swap) করে পুনরায় ড্রিল করান।"
      ]
    },
    {
      id: 5,
      title: "Interactive Kite Studio: Build & Fly!",
      subtitle: "স্ক্রিনে ধাপে ধাপে নিজের ঘুড়ি তৈরি করো ও আকাশে ওড়াও (Step-by-Step Crafting)",
      phase: "৫. ব্যবহারিক প্রয়োগ ও অভিজ্ঞতা (Hands-on Crafting)",
      duration: "৭ মিনিট",
      themeColor: "from-cyan-500 to-blue-600",
      imageEmoji: "🛠️ 🪁 💨",
      sceneType: "kite_builder",
      hasVisualStage: true,
      content: {
        englishText: [
          "Step 1: Choose your paper color (রঙিন কাগজ পছন্দ করো).",
          "Step 2: Place the straight bamboo stick (সোজা কাঠি বসাও).",
          "Step 3: Bend the second stick into an arc (ধনুকাকৃতি কাঠি জুড়ে দাও).",
          "Step 4: Fasten securely with tape and glue (আঠা ও টেপ দিয়ে আটকাও).",
          "Step 5: Tie the string and tail ribbons (সুতা ও লেজের ফিতা বাঁধো).",
          "Step 6: Release and fly into the windy sky! (বাতাসে ঘুড়ি উড়াও!)"
        ],
        banglaExplanation: "স্ক্রিনের ইন্টারেক্টিভ বাটনে ক্লিক করে নিজের পছন্দের রঙের ঘুড়ি তৈরি করো। প্রতিটি উপাদানে ক্লিক করে উচ্চারণ ও কাজ শিখে নাও!"
      },
      teacherNotes: "শিক্ষার্থীদের একে একে প্রজেক্টরের সামনে ডেকে আনুন। তারা নিজের পছন্দের রং বেছে নিয়ে ধাপগুলো সম্পূর্ণ করবে এবং আকাশে ঘুড়ি ওড়াবে।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষার্থীদের পছন্দের রঙ (Red, Gold, Sky, Emerald, Purple) নির্বাচন করতে বলুন।",
        "ধাপ ২: ১ থেকে ৫ নম্বর ধাপে ক্রমানুসারে ক্লিক করে ঘুড়ি সম্পূর্ণ করান।",
        "ধাপ ৩: 'ওড়াও' বাটনে ক্লিক করে আকাশে ওড়ানোর আনন্দ উপভোগ করুন।"
      ]
    },
    {
      id: 6,
      title: "Activity C: Materials vs. Action Steps Sorting",
      subtitle: "পাঠ্যবই: উপকরণ ও তৈরির ধাপ আলাদা করার মজার খেলা (Sorting Game)",
      phase: "৬. আনন্দদায়ক খেলা ও মূল্যায়ন (Interactive Game)",
      duration: "৬ মিনিট",
      themeColor: "from-rose-500 to-amber-500",
      imageEmoji: "🧺 🧩 🏆",
      sceneType: "activity",
      content: {
        englishText: [],
        banglaExplanation: "ঘুড়ি তৈরির উপকরণ (Materials) এবং তৈরির ধাপগুলো (Action Steps) আলাদা করো। কার্ডে ক্লিক করে সঠিক ঝুড়িতে পাঠাও:",
        sortingGame: {
          instruction: "উপকরণগুলোকে Materials ঝুড়িতে এবং কাজগুলোকে Steps ঝুড়িতে পাঠাও:",
          categories: {
            cat1: { id: "materials", label: "📦 Materials (উপকরণ)", icon: "📦", theme: "amber" },
            cat2: { id: "steps", label: "⚡ Action Steps (কাজের ধাপ)", icon: "⚡", theme: "sky" }
          },
          items: [
            { id: "k-item-1", label: "Square coloured paper", category: "materials", icon: "📄" },
            { id: "k-item-2", label: "Bend stick into an arc", category: "steps", icon: "🏹" },
            { id: "k-item-3", label: "Two thin bamboo sticks", category: "materials", icon: "🎋" },
            { id: "k-item-4", label: "Tie long light string", category: "steps", icon: "🧵" },
            { id: "k-item-5", label: "Strong glue and tape", category: "materials", icon: "🧷" },
            { id: "k-item-6", label: "Attach tail ribbons", category: "steps", icon: "🎀" }
          ]
        }
      },
      teacherNotes: "বোর্ডে শিক্ষার্থীদের ডেকে এনে উপকরণ ও ধাপগুলোর পার্থক্য জিজ্ঞেস করুন। সঠিক ঝুড়িতে ফেললে পয়েন্ট দিন।",
      quickTeachingSteps: [
        "ধাপ ১: Materials (কী কী লাগে) এবং Steps (কী কী করতে হয়) বুঝিয়ে বলুন।",
        "ধাপ ২: শিক্ষার্থীদের বোতামে চাপ দিয়ে সঠিক ঝুড়ি নির্ধারণ করতে দিন।",
        "ধাপ ৩: খেলা শেষ হলে দলগত স্কোরবোর্ডে পয়েন্ট যোগ করুন।"
      ]
    },
    {
      id: 7,
      title: "Grammar Focus: Commands and Imperative Verbs",
      subtitle: "কীভাবে নির্দেশনামূলক বাক্য (Commands & Instructions) গঠন করতে হয়",
      phase: "৭. ভাষার গঠন ও ব্যাকরণ (Language Focus)",
      duration: "৫ মিনিট",
      themeColor: "from-indigo-600 to-purple-600",
      imageEmoji: "💡 ✏️ 🎯",
      sceneType: "grammar",
      content: {
        englishText: [
          "Commands and instructions always begin with a Base Verb (ক্রিয়াপদ):",
          "1. 'Take' a square piece of paper.",
          "2. 'Place' one stick straight down the middle.",
          "3. 'Bend' the second stick into an arc.",
          "4. 'Fasten' the sticks securely with glue and tape.",
          "5. 'Tie' a long piece of light string.",
          "6. 'Fly' the kite in the windy sky!"
        ],
        banglaExplanation: "ইংরেজি ব্যাকরণ নোট: কাউকে কোনো নির্দেশ বা কাজের ধাপ বলতে বাক্যের শুরুতেই ক্রিয়াপদ (Verb) বসে, যেমন: Take, Place, Bend, Fasten, Tie। এগুলোকে Imperative বা নির্দেশনামূলক বাক্য বলা হয়।",
        punctuationDrill: {
          instruction: "সঠিক নির্দেশনামূলক ক্রিয়াপদটি (Action Verb) দিয়ে বাক্য পূর্ণ করো:",
          challenges: [
            {
              id: "cmd-1",
              sentenceBefore: "",
              missingMark: "Take",
              sentenceAfter: "a square piece of thin coloured paper.",
              meaning: "একটি চারকোনা পাতলা রঙিন কাগজ নাও।",
              options: ["Take", "Taking", "Takes"]
            },
            {
              id: "cmd-2",
              sentenceBefore: "",
              missingMark: "Bend",
              sentenceAfter: "the second stick into an arc.",
              meaning: "দ্বিতীয় কাঠিটিকে ধনুকের মতো বাঁকা করো।",
              options: ["Bend", "Bending", "Bended"]
            },
            {
              id: "cmd-3",
              sentenceBefore: "",
              missingMark: "Fasten",
              sentenceAfter: "the sticks securely with glue and tape.",
              meaning: "আঠা ও টেপ দিয়ে কাঠিগুলো শক্তভাবে আটকাও।",
              options: ["Fasten", "Fastens", "Fastening"]
            },
            {
              id: "cmd-4",
              sentenceBefore: "",
              missingMark: "Tie",
              sentenceAfter: "a long piece of light string to the sticks.",
              meaning: "কাঠিগুলোর সাথে লম্বা একখণ্ড হালকা সুতা বাঁধো।",
              options: ["Tie", "Tying", "Tied"]
            }
          ]
        }
      },
      teacherNotes: "শিক্ষার্থীদের মনে করিয়ে দিন নির্দেশমূলক বাক্যে শুরুতে কোনো Subject (যেমন You/He) সাধারণত উল্লেখ থাকে না, সরাসরি Verb দিয়ে শুরু হয়।",
      quickTeachingSteps: [
        "ধাপ ১: বাক্যের শুরুর অ্যাকশন ভার্বগুলো চিহ্নিত করুন।",
        "ধাপ ২: শিক্ষার্থীদের বোর্ডে সঠিক অপশন নির্বাচন করতে দিন।",
        "ধাপ ৩: নিজের ভাষায় অন্য কোনো কাজের নির্দেশ (যেমন Open the door) বলতে বলুন।"
      ]
    },
    {
      id: 8,
      title: "Comprehension Quiz & Wrap-up",
      subtitle: "পাঠ শেষে দ্রুত প্রশ্নোত্তর ও বাড়ির কাজের প্রস্তুতি (Assessment)",
      phase: "৮. মূল্যায়ন ও সমাপনী (Assessment & Wrap-up)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "📝 🌟 🏅",
      sceneType: "activity",
      content: {
        englishText: [
          "Activity D: Ask and answer the questions in pairs:",
          "1. What shape of paper is needed? -> A square piece of paper.",
          "2. How many bamboo sticks are used? -> Two thin bamboo sticks.",
          "3. How is the second stick shaped? -> Into an arc.",
          "4. What is attached at the bottom for the tail? -> Colourful paper ribbons.",
          "5. Where does the kite fly? -> In the windy sky."
        ],
        banglaExplanation: "পাঠ সমাপ্তি: শিক্ষার্থীরা সহজ ইংরেজি নির্দেশ অনুসরণ করে জিনিস তৈরি করতে শিখেছে। ক্লাস শেষে ১-ক্লিকে বাড়ির কাজের প্রিন্ট শিট দিন।",
        activityTask: "সহপাঠীর সাথে প্রশ্ন-উত্তর অনুশীলন: একজন প্রশ্ন করবে, অন্যজন উত্তর দেবে।"
      },
      teacherNotes: "ক্লাস শেষে শিক্ষার্থীদের প্রশংসা করুন এবং 'ওয়ার্কশিট প্রিন্ট' বোতামে চাপ দিয়ে সবার জন্য অফলাইন অনুশীলন শিট সংগ্রহ করুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রশ্নগুলো বোর্ডে উচ্চারণ করিয়ে শোনান।",
        "ধাপ ২: শিশুদের মুখে মুখে উত্তর বলতে বলুন।",
        "ধাপ ৩: 'ওয়ার্কশিট প্রিন্ট' বাটনে ক্লিক করে বাড়ির কাজ বিতরণ করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "সরকারি প্রাথমিক বিদ্যালয়, মডেল ক্লাসরুম",
    examTitle: "Classroom Practice Worksheet: Making a Paper Kite (Unit 3, Lesson 2)",
    classGrade: "Class 3 (তৃতীয় শ্রেণি)",
    subject: "English for Today (Pages 35-40)",
    time: "20 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Choose the best answer (Textbook Activity C)",
        instruction: "Read the questions and tick (✓) the correct answer:",
        content: [
          {
            q: "1. What shape of paper is needed to make a kite?",
            options: ["A) Circle", "B) Square", "C) Triangle", "D) Oval"],
            answer: "B) Square"
          },
          {
            q: "2. How many bamboo sticks are needed?",
            options: ["A) One", "B) Two", "C) Three", "D) Four"],
            answer: "B) Two"
          },
          {
            q: "3. How should the second bamboo stick be shaped?",
            options: ["A) Straight", "B) Into an arc", "C) Broken", "D) In a ring"],
            answer: "B) Into an arc"
          },
          {
            q: "4. What is attached at the bottom of the kite?",
            options: ["A) Stones", "B) Colourful paper ribbons for the tail", "C) Leaves", "D) Cloth"],
            answer: "B) Colourful paper ribbons for the tail"
          }
        ]
      },
      {
        type: "matching",
        title: "Section B: Sequencer Matching (Chronological Order)",
        instruction: "Match each sequencer word with its correct action step:",
        content: [
          { a: "First", b: "Take a square piece of thin coloured paper" },
          { a: "Next", b: "Place one bamboo stick straight down the middle" },
          { a: "Then", b: "Tie a long piece of light string to the sticks" },
          { a: "Finally", b: "Attach colourful ribbons at the bottom for the tail" }
        ]
      },
      {
        type: "fillInTheBlanks",
        title: "Section C: Imperative Action Verbs",
        instruction: "Fill in each blank with the correct verb from the box: [Take, Bend, Fasten, Fly]",
        content: [
          "a) ________ a square piece of thin paper.",
          "b) ________ the second stick into an arc.",
          "c) ________ the sticks securely with strong glue.",
          "d) ________ the kite high in the windy sky!"
        ]
      },
      {
        type: "drawing",
        title: "Section D: Creative Crafting & Drawing Task",
        instruction: "Draw your favourite kite in the box below and label: Paper, Bamboo sticks, and Tail Ribbons.",
        content: [
          "[ Draw your dream kite here ]",
          "My Kite's Name: _____________________ | Favourite Colour: _____________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 3: CLASS 3 ENGLISH - INTRODUCING MYSELF: JERIN (UNIT 1 LESSON 7)
// =========================================================================
export const JERIN_INTRODUCING_DECK: SlideDeck = {
  id: "introducing-jerin",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 1: Greetings & Introductions",
  lesson: "Lesson 7: Introducing Myself — Jerin",
  topic: "এনসিটিবি পাঠ্যবই পৃষ্ঠা ১৫-১৭ (Self-Introduction & Family)",
  category: "english",
  thumbnailEmoji: "👧 🏫",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Activity A: Meet Jerin at School!",
      subtitle: "Unit 1: Greetings & Introductions | Lesson 7 (Page 15 Activity A)",
      phase: "১. প্রেষণা ও পূর্বজ্ঞান যাচাই (Warm-up)",
      duration: "৫ মিনিট",
      themeColor: "from-sky-500 to-indigo-500",
      imageEmoji: "👧 🏫 🎒",
      sceneType: "campus",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello! Welcome to our school.",
          "What is your name? How old are you?",
          "Let's meet our new friend Jerin at Mohonpur Primary School!"
        ],
        activityTask: "শিক্ষার্থীদের স্ক্রিনের মোহনপুর প্রাইমারি স্কুলের ছবি দেখিয়ে নিজেদের স্কুলের নাম ও বন্ধুদের পরিচয় নিয়ে ক্লাসে আলোচনা করুন।",
        banglaExplanation: "এনসিটিবি পৃষ্ঠা ১৫ Activity A: নতুন সহপাঠীদের সাথে শুভেচ্ছা বিনিময় এবং নিজের পরিচয় দেওয়া। জেরিনের সাথে পরিচিত হয়ে শিক্ষার্থীরা নিজেদের নাম ও বয়স ইংরেজিতে বলা শিখবে।"
      },
      teacherNotes: "ক্লাসের শুরুতে শিক্ষার্থীদের হাত তুলে নিজের নাম ইংরেজিতে বলতে উৎসাহিত করুন। স্ক্রিনের স্কুলে জাতীয় পতাকা ও স্কুলের সাইনবোর্ড দেখিয়ে আলোচনা শুরু করুন।",
      quickTeachingSteps: [
        "ধাপ ১: স্ক্রিনের মোহনপুর প্রাথমিক বিদ্যালয়ের আঙিনা শিক্ষার্থীদের দেখান।",
        "ধাপ ২: জেরিনের হাত নাড়ার অঙ্গভঙ্গি দেখে নিজেদের নাম ইংরেজিতে বলতে বলুন।",
        "ধাপ ৩: প্রাক-পঠন আলোচনা শেষে পরবর্তী শব্দভাণ্ডার (Vocabulary) ল্যাবে যান।"
      ]
    },
    {
      id: 2,
      title: "Key Vocabulary & Syllables Lab",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৫-১৭: আত্মপরিচয় ও পারিবারিক পেশার শব্দভাণ্ডার (Vocabulary & Syllables)",
      phase: "২. শব্দ পরিচিতি ও সরব পাঠ (Vocabulary Lab)",
      duration: "৭ মিনিট",
      themeColor: "from-emerald-500 to-teal-500",
      imageEmoji: "🔤 👧 👨‍👩‍👦",
      sceneType: "campus",
      content: {
        englishText: [],
        vocabulary: [
          {
            word: "Eight",
            syllables: ["Eight"],
            phonetic: "/eɪt/",
            meaning: "আট (বয়স নির্দেশক সংখ্যা)",
            partOfSpeech: "Number",
            example: "I am eight years old.",
            icon: "8️⃣"
          },
          {
            word: "Primary",
            syllables: ["Pri", "ma", "ry"],
            phonetic: "/ˈpraɪ.mer.i/",
            meaning: "প্রাথমিক (বিদ্যালয় স্তর)",
            partOfSpeech: "Noun/Adjective",
            example: "Mohonpur Primary School is beautiful.",
            icon: "🏫"
          },
          {
            word: "Teacher",
            syllables: ["Teach", "er"],
            phonetic: "/ˈtiː.tʃər/",
            meaning: "শিক্ষক (সম্মানিত পেশা)",
            partOfSpeech: "Noun",
            example: "My father is a teacher.",
            icon: "👨‍🏫"
          },
          {
            word: "Banker",
            syllables: ["Bank", "er"],
            phonetic: "/ˈbæŋ.kər/",
            meaning: "ব্যাংক কর্মকর্তা (অর্থনৈতিক পেশা)",
            partOfSpeech: "Noun",
            example: "My mother is a banker.",
            icon: "👩‍💼"
          },
          {
            word: "Brother",
            syllables: ["Bro", "ther"],
            phonetic: "/ˈbrʌð.ər/",
            meaning: "ভাই / সহোদর",
            partOfSpeech: "Noun",
            example: "My brother is two years old.",
            icon: "👶"
          },
          {
            word: "Family",
            syllables: ["Fam", "i", "ly"],
            phonetic: "/ˈfæm.əl.i/",
            meaning: "পরিবার / পরিজন",
            partOfSpeech: "Noun",
            example: "We are a very happy family.",
            icon: "👨‍👩‍👦"
          },
          {
            word: "Mohonpur",
            syllables: ["Mo", "hon", "pur"],
            phonetic: "/moʊ.hɒn.pʊr/",
            meaning: "মোহনপুর (জেরিনের গ্রাম ও স্কুলের এলাকা)",
            partOfSpeech: "Proper Noun",
            example: "I live with my family in Mohonpur.",
            icon: "🏡"
          }
        ]
      },
      teacherNotes: "প্রতিটি শব্দের ওপর ক্লিক করে দেশীয় সহজ উচ্চারণ শিক্ষার্থীদের শোনান। পরিবারের সদস্যদের পেশা (Teacher, Banker) নিয়ে শিক্ষার্থীদের পরিবারের সাথে মিল আলোচনা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: শব্দের কার্ডে ক্লিক করে সঠিক ফোনেটিক্স সাউন্ড শোনান।",
        "ধাপ ২: সিলেবল ভাঙন (যেমন: Pri-ma-ry, Teach-er, Bank-er) হাততালি দিয়ে ড্রিল করান।",
        "ধাপ ৩: বাক্যে প্রয়োগটি পড়ে শুনিয়ে বাংলা অর্থ পরিষ্কার করুন।"
      ]
    },
    {
      id: 3,
      title: "Main Text: Introducing Jerin",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১৫: মূল আত্মপরিচয় পাঠ (Textbook Activity B)",
      phase: "৩. মূল পাঠ উপস্থাপন (Text Presentation)",
      duration: "৮ মিনিট",
      themeColor: "from-amber-400 to-orange-500",
      imageEmoji: "📖 👧 🏫",
      sceneType: "campus",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello! I am Jerin.",
          "I am eight years old.",
          "I'm in Class 3 at Mohonpur Primary School.",
          "I live with my family in Mohonpur.",
          "My father is a teacher and my mother is a banker.",
          "My brother is two years old.",
          "We are a very happy family."
        ],
        banglaExplanation: "এনসিটিবি পাঠ্য: হ্যালো! আমি জেরিন। আমার বয়স আট বছর। আমি মোহনপুর প্রাথমিক বিদ্যালয়ে ৩য় শ্রেণিতে পড়ি। আমি মোহনপুরে আমার পরিবারের সাথে বাস করি। আমার বাবা একজন শিক্ষক এবং আমার মা একজন ব্যাংক কর্মকর্তা। আমার ভাইয়ের বয়স দুই বছর। আমরা একটি অত্যন্ত সুখী পরিবার।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রতিটি বাক্যের প্রতি মনোযোগ দিতে বলুন। 'I am' এবং 'My father is' এর ব্যবহারের পার্থক্য বুঝিয়ে দিন। শব্দে ক্লিক করে ইন্টারঅ্যাক্টিভ স্পিচ শোনান।",
      quickTeachingSteps: [
        "ধাপ ১: বাম পাশের দৃশ্যে জেরিনের পরিবার ও স্কুলের পরিচয় দিন।",
        "ধাপ ২: মূল টেক্সটের বাক্যগুলোতে শব্দ ধরে ধরে সরব পাঠ করান।",
        "ধাপ ৩: সম্পূর্ণ পাঠ শেষে জেরিন সম্পর্কে ছোট ছোট প্রশ্ন করুন।"
      ]
    },
    {
      id: 4,
      title: "Pair Dialogue: Getting to Know Each Other",
      subtitle: "সহপাঠীর সাথে জোড়ায় সংলাপ: একে অপরের পরিচয় জানা (Activity C Dialogue)",
      phase: "৪. চরিত্র সংলাপ ও দ্বৈত অভিনয় (Roleplay)",
      duration: "৮ মিনিট",
      themeColor: "from-blue-500 to-indigo-500",
      imageEmoji: "🗣️ 🤝 👧",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice the dialogue in pairs.",
          "Student A asks questions and Student B (Jerin) answers politely:"
        ],
        banglaExplanation: "এনসিটিবি নির্দেশিকা অনুযায়ী শ্রেণিকক্ষে জোড়ায় সংলাপ চর্চা (Pair Work): একজন শিক্ষার্থী প্রশ্ন করবে এবং অন্যজন জেরিনের চরিত্র হয়ে সঠিক উত্তর প্রদান করবে।",
        dialogue: [
          {
            speaker: "Student A (Friend)",
            team: "Team A (Friend)",
            text: "Hello! What is your name?",
            avatar: "👦"
          },
          {
            speaker: "Student B (Jerin)",
            team: "Team B (Jerin)",
            text: "Hello! I am Jerin. Nice to meet you!",
            avatar: "👧"
          },
          {
            speaker: "Student A (Friend)",
            team: "Team A (Friend)",
            text: "How old are you, Jerin?",
            avatar: "👦"
          },
          {
            speaker: "Student B (Jerin)",
            team: "Team B (Jerin)",
            text: "I am eight years old. What about you?",
            avatar: "👧"
          },
          {
            speaker: "Student A (Friend)",
            team: "Team A (Friend)",
            text: "I am eight years old too! What class are you in?",
            avatar: "👦"
          },
          {
            speaker: "Student B (Jerin)",
            team: "Team B (Jerin)",
            text: "I am in Class 3 at Mohonpur Primary School.",
            avatar: "👧"
          },
          {
            speaker: "Student A (Friend)",
            team: "Team A (Friend)",
            text: "What do your parents do?",
            avatar: "👦"
          },
          {
            speaker: "Student B (Jerin)",
            team: "Team B (Jerin)",
            text: "My father is a teacher and my mother is a banker!",
            avatar: "👧"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের জোড়ায় ভাগ করে দিন: একজন প্রশ্নকারী ও অন্যজন জেরিন। ডায়লগে মুখের ভাব ও স্বরের ওঠানামা বজায় রাখতে বলুন। এরপর ভূমিকা বদল করান।",
      quickTeachingSteps: [
        "ধাপ ১: Team A ও Team B-কে সংলাপের কার্ড বুঝিয়ে দিন।",
        "ধাপ ২: প্রশ্ন ও উত্তরের স্বরভঙ্গি ঠিক রেখে শিক্ষার্থীদের রিডিং ড্রিল করান।",
        "ধাপ ৩: এবার শিক্ষার্থীরা নিজেদের আসল নাম ও পরিবার দিয়ে ডায়লগটি বলবে।"
      ]
    },
    {
      id: 5,
      title: "Student ID Studio: Create Your Identity Card",
      subtitle: "স্ক্রিনে নিজের ছবি ও তথ্য দিয়ে ডিজিটাল আইডি কার্ড তৈরি করো (ID Badge Studio)",
      phase: "৫. ব্যবহারিক প্রয়োগ ও অভিজ্ঞতা (ID Studio)",
      duration: "৭ মিনিট",
      themeColor: "from-purple-500 to-indigo-600",
      imageEmoji: "🆔 📸 🌟",
      sceneType: "id_card",
      hasVisualStage: true,
      content: {
        englishText: [
          "Step 1: Choose your student avatar (জেরিন, আলিফ, রিয়া, ফারহান).",
          "Step 2: Read and check your Class 3 identity card details.",
          "Step 3: Click 'পরিচয় শোনো' to listen to the full self-introduction.",
          "Step 4: Now stand up and introduce yourself in English to your classmates!"
        ],
        banglaExplanation: "শিক্ষার্থীরা বোর্ডে এসে নিজের পছন্দের স্টুডেন্ট কার্ড নির্বাচন করবে এবং 'পরিচয় শোনো' বাটনে চাপ দিয়ে স্পষ্ট উচ্চারণে নিজের আত্মপরিচয় ক্লাসের সবার সামনে উপস্থাপন করবে।"
      },
      teacherNotes: "শিক্ষার্থীদের একে একে প্রজেক্টরের সামনে ডেকে আনুন। তারা নিজের নাম, বয়স ও পেশার তথ্য বোর্ডে দেখে আত্মবিশ্বাসের সাথে ক্লাসে ইংরেজি বলবে।",
      quickTeachingSteps: [
        "ধাপ ১: আইডি কার্ডের বিভিন্ন অংশ (Name, Age, School, Parents) চিহ্নিত করতে বলুন।",
        "ধাপ ২: 'পরিচয় শোনো' বোতামে চাপ দিয়ে ফ্লুয়েন্ট স্পিচ শোনান।",
        "ধাপ ৩: প্রতিটি শিক্ষার্থীকে দাঁড়িয়ে নিজের পরিচয় ইংরেজিতে দেওয়ার সুযোগ দিন।"
      ]
    },
    {
      id: 6,
      title: "Activity D: Occupations vs. Places Sorting",
      subtitle: "পাঠ্যবই: পেশা ও স্থানের নাম আলাদা করার মজার খেলা (Sorting Game)",
      phase: "৬. আনন্দদায়ক খেলা ও মূল্যায়ন (Interactive Game)",
      duration: "৬ মিনিট",
      themeColor: "from-rose-500 to-amber-500",
      imageEmoji: "🧺 👨‍💼 🏫",
      sceneType: "activity",
      content: {
        englishText: [],
        banglaExplanation: "পেশা (Occupations) এবং স্থান বা জায়গার নাম (Places) আলাদা করো। কার্ডে ক্লিক করে সঠিক ঝুড়িতে পাঠাও:",
        sortingGame: {
          instruction: "পেশাগুলোকে 'Occupations' ঝুড়িতে এবং স্থানগুলোকে 'Places' ঝুড়িতে পাঠাও:",
          categories: {
            cat1: { id: "occupations", label: "💼 Occupations (পেশাসমূহ)", icon: "💼", theme: "amber" },
            cat2: { id: "places", label: "🏫 Places (স্থানসমূহ)", icon: "🏫", theme: "sky" }
          },
          items: [
            { id: "j-item-1", label: "Teacher (শিক্ষক)", category: "occupations", icon: "👨‍🏫" },
            { id: "j-item-2", label: "Mohonpur (মোহনপুর)", category: "places", icon: "🏡" },
            { id: "j-item-3", label: "Banker (ব্যাংক কর্মকর্তা)", category: "occupations", icon: "👩‍💼" },
            { id: "j-item-4", label: "Primary School (বিদ্যালয়)", category: "places", icon: "🏫" },
            { id: "j-item-5", label: "Doctor (চিকিৎসক)", category: "occupations", icon: "👨‍⚕️" },
            { id: "j-item-6", label: "Classroom (শ্রেণিকক্ষ)", category: "places", icon: "🚪" }
          ]
        }
      },
      teacherNotes: "শিক্ষার্থীদের বোর্ডে ডেকে পেশা ও স্থানের পার্থক্য জিজ্ঞেস করুন। সঠিক ঝুড়িতে ড্র্যাগ বা ক্লিক করলে পয়েন্ট দিন।",
      quickTeachingSteps: [
        "ধাপ ১: Occupations (পেশা) ও Places (স্থান)-এর অর্থ ব্যাখ্যা করুন।",
        "ধাপ ২: শিক্ষার্থীদের বোতামে চাপ দিয়ে শব্দগুলোকে সঠিক ঝুড়িতে বাছাই করতে দিন।",
        "ধাপ ৩: খেলা শেষ হলে দলগত স্কোরবোর্ডে পয়েন্ট যোগ করুন।"
      ]
    },
    {
      id: 7,
      title: "Grammar Focus: Use of 'am', 'is', 'are' and 'My'",
      subtitle: "কীভাবে নিজের ও অন্যের পরিচয় দিয়ে বাক্য গঠন করতে হয় (Language Focus)",
      phase: "৭. ভাষার গঠন ও ব্যাকরণ (Language Focus)",
      duration: "৫ মিনিট",
      themeColor: "from-indigo-600 to-purple-600",
      imageEmoji: "💡 ✏️ 🎯",
      sceneType: "grammar",
      content: {
        englishText: [
          "Simple Present Be-Verbs Rules:",
          "1. I 'am' eight years old. (I-এর সাথে 'am')",
          "2. My father 'is' a teacher. (Singular ব্যক্তি-র সাথে 'is')",
          "3. My mother 'is' a banker.",
          "4. My brother 'is' two years old.",
          "5. We 'are' a very happy family. (We/Plural-এর সাথে 'are')"
        ],
        banglaExplanation: "ইংরেজি ব্যাকরণ নিয়ম: নিজের পরিচয় দিতে 'I am', একবচনে কারও পরিচয় দিতে 'is' (যেমন: My father is, My brother is), এবং বহুবচনে 'are' (যেমন: We are) বসে।",
        punctuationDrill: {
          instruction: "সঠিক Be-Verb (am / is / are) বাছাই করে বাক্য সম্পূর্ণ করো:",
          challenges: [
            {
              id: "be-1",
              sentenceBefore: "I",
              missingMark: "am",
              sentenceAfter: "eight years old.",
              meaning: "আমার বয়স আট বছর।",
              options: ["am", "is", "are"]
            },
            {
              id: "be-2",
              sentenceBefore: "My father",
              missingMark: "is",
              sentenceAfter: "a teacher.",
              meaning: "আমার বাবা একজন শিক্ষক।",
              options: ["is", "am", "are"]
            },
            {
              id: "be-3",
              sentenceBefore: "My brother",
              missingMark: "is",
              sentenceAfter: "two years old.",
              meaning: "আমার ভাইয়ের বয়স দুই বছর।",
              options: ["is", "are", "am"]
            },
            {
              id: "be-4",
              sentenceBefore: "We",
              missingMark: "are",
              sentenceAfter: "a very happy family.",
              meaning: "আমরা একটি অত্যন্ত সুখী পরিবার।",
              options: ["are", "is", "am"]
            }
          ]
        }
      },
      teacherNotes: "বোর্ডে শিক্ষার্থীদের দিয়ে am, is, are এর শূন্যস্থান পূরণ করান। বিশেষ করে I am বনাম My father is এর পার্থক্য স্পষ্ট করুন।",
      quickTeachingSteps: [
        "ধাপ ১: Be-Verb গুলোর ব্যবহারের নিয়ম সহজে বুঝিয়ে দিন।",
        "ধাপ ২: স্ক্রিনে ক্লিক করে সঠিক অপশন বাছাই করতে দিন।",
        "ধাপ ৩: শিক্ষার্থীদের নিজের বাবা-মায়ের পেশা নিয়ে একটি করে বাক্য বলতে বলুন।"
      ]
    },
    {
      id: 8,
      title: "Comprehension Quiz & Wrap-up",
      subtitle: "পাঠ শেষে দ্রুত প্রশ্নোত্তর ও বাড়ির কাজের প্রস্তুতি (Assessment)",
      phase: "৮. মূল্যায়ন ও সমাপনী (Assessment & Wrap-up)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "📝 🌟 🏅",
      sceneType: "activity",
      content: {
        englishText: [
          "Activity E: Ask and answer the questions in pairs:",
          "1. How old is Jerin? -> Jerin is eight years old.",
          "2. What class is she in? -> She is in Class 3.",
          "3. Where does she live? -> She lives with her family in Mohonpur.",
          "4. What does her father do? -> Her father is a teacher.",
          "5. What does her mother do? -> Her mother is a banker.",
          "6. How old is her brother? -> Her brother is two years old."
        ],
        banglaExplanation: "পাঠ সমাপ্তি: শিক্ষার্থীরা ইংরেজিতে আত্মপরিচয় দেওয়া এবং সহপাঠীর পরিচয় জানতে চাওয়া শিখেছে। ক্লাস শেষে ১-ক্লিকে বাড়ির কাজের প্রিন্ট শিট দিন।",
        activityTask: "সহপাঠীর সাথে প্রশ্ন-উত্তর অনুশীলন: একজন প্রশ্ন করবে, অন্যজন উত্তর দেবে।"
      },
      teacherNotes: "ক্লাস শেষে শিক্ষার্থীদের প্রশংসা করুন এবং 'ওয়ার্কশিট প্রিন্ট' বোতামে চাপ দিয়ে সবার জন্য অফলাইন অনুশীলন শিট সংগ্রহ করুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রশ্নগুলো বোর্ডে উচ্চারণ করিয়ে শোনান।",
        "ধাপ ২: শিশুদের মুখে মুখে উত্তর বলতে বলুন।",
        "ধাপ ৩: 'ওয়ার্কশিট প্রিন্ট' বাটনে ক্লিক করে বাড়ির কাজ বিতরণ করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "সরকারি প্রাথমিক বিদ্যালয়, মডেল ক্লাসরুম",
    examTitle: "Classroom Practice Worksheet: Introducing Jerin (Unit 1, Lesson 7)",
    classGrade: "Class 3 (তৃতীয় শ্রেণি)",
    subject: "English for Today (Pages 15-17)",
    time: "20 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Choose the best answer (Textbook Activity C)",
        instruction: "Read the questions and tick (✓) the correct answer:",
        content: [
          {
            q: "1. How old is Jerin?",
            options: ["A) Six years old", "B) Seven years old", "C) Eight years old", "D) Nine years old"],
            answer: "C) Eight years old"
          },
          {
            q: "2. What school does Jerin go to?",
            options: ["A) Dhaka Primary", "B) Mohonpur Primary School", "C) Model Primary", "D) Green Primary"],
            answer: "B) Mohonpur Primary School"
          },
          {
            q: "3. What is Jerin's mother's profession?",
            options: ["A) Teacher", "B) Banker", "C) Doctor", "D) Pilot"],
            answer: "B) Banker"
          },
          {
            q: "4. How old is Jerin's brother?",
            options: ["A) Two years old", "B) Three years old", "C) Four years old", "D) Five years old"],
            answer: "A) Two years old"
          }
        ]
      },
      {
        type: "matching",
        title: "Section B: Column Matching",
        instruction: "Match Column A with Column B according to the text:",
        content: [
          { a: "Jerin's Father", b: "A teacher" },
          { a: "Jerin's Mother", b: "A banker" },
          { a: "Jerin's Age", b: "Eight years old" },
          { a: "Little Brother", b: "Two years old" }
        ]
      },
      {
        type: "fillInTheBlanks",
        title: "Section C: Complete with 'am', 'is' or 'are'",
        instruction: "Fill in each blank with the correct be-verb: [am, is, are]",
        content: [
          "a) I ________ eight years old.",
          "b) My father ________ a teacher.",
          "c) My mother ________ a banker.",
          "d) We ________ a very happy family."
        ]
      },
      {
        type: "drawing",
        title: "Section D: Write 4 sentences about yourself",
        instruction: "Fill in the lines with your own information: [My name is... | I am... | I read in... | My father is...]",
        content: [
          "1. My name is ___________________________________________________________.",
          "2. I am ________________________________________________________ years old.",
          "3. I read in Class 3 at ____________________________________ Primary School.",
          "4. My family lives in ____________________________________________________."
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 4: CLASS 3 ENGLISH - CLEANLINESS: 6 STEPS OF WASHING HANDS (UNIT 6 LESSON 2)
// =========================================================================
export const HANDWASHING_SLIDE_DECK: SlideDeck = {
  id: "handwashing-steps",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 6: Cleanliness & Healthy Living",
  lesson: "Lesson 2: Six Steps of Washing Hands",
  topic: "এনসিটিবি পাঠ্যবই পৃষ্ঠা ৮৭-৯১ (Steps of Handwashing & Hygiene)",
  category: "english",
  thumbnailEmoji: "🧼 🖐️",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Activity A: Why Do We Wash Our Hands?",
      subtitle: "Unit 6: Cleanliness | Lesson 2 (Page 87 Activity A - Spotting Germs)",
      phase: "১. প্রেষণা ও পূর্বজ্ঞান যাচাই (Warm-up & Germ Discovery)",
      duration: "৫ মিনিট",
      themeColor: "from-teal-500 to-cyan-500",
      imageEmoji: "🧼 🦠 💧",
      sceneType: "handwash",
      hasVisualStage: true,
      content: {
        englishText: [
          "Clean hands keep us healthy and energetic.",
          "Germs are tiny living organisms that make us sick.",
          "We cannot see germs with our eyes, but they hide on unwashed hands.",
          "Can you spot where germs hide on our dirty fingers and palms?"
        ],
        activityTask: "স্ক্রিনের হাত ও জীবাণু মনস্টারদের (🦠) শিক্ষার্থীদের দেখিয়ে আলোচনা করুন তারা কখন কখন হাত ধোয় এবং হাত না ধুলে কী হতে পারে।",
        banglaExplanation: "এনসিটিবি পৃষ্ঠা ৮৭ Activity A: হাত পরিষ্কার রাখা আমাদের শরীর সুস্থ ও সবল রাখে। জীবাণু হলো অত্যন্ত ক্ষুদ্র অণুজীব যা অসুখ-বিসুখ ছড়ায়। আমরা খালি চোখে জীবাণু দেখতে পাই না, কিন্তু নোংরা হাতে এরা লুকিয়ে থাকে।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান তারা কখন কখন হাত ধোয়। জীবাণু কীভাবে আমাদের শরীরে প্রবেশ করে সে বিষয়ে সচেতনতা তৈরি করুন।",
      quickTeachingSteps: [
        "ধাপ ১: বাম পাশের ভিজ্যুয়াল স্টেজে হাত ও জীবাণু মনস্টারদের (🦠) শিক্ষার্থীদের দেখান।",
        "ধাপ ২: হাত ধোয়ার প্রয়োজনীয়তা ও সাবানের ভূমিকা নিয়ে শ্রেণিকক্ষে মুক্ত আলোচনা করুন।",
        "ধাপ ৩: প্রাক-পঠন আলোচনা শেষে পরবর্তী শব্দভাণ্ডার (Vocabulary) ল্যাবে যান।"
      ]
    },
    {
      id: 2,
      title: "Key Vocabulary Lab & Silent Letters",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৮৮: সিলেবল ভাঙন, অর্থ ও নীরব বর্ণের (Silent Letters) ড্রিল",
      phase: "২. শব্দ পরিচিতি ও ধ্বনিবিজ্ঞান (Phonics & Vocabulary)",
      duration: "৮ মিনিট",
      themeColor: "from-emerald-500 to-teal-600",
      imageEmoji: "🔤 🖐️ 🫧",
      sceneType: "vocabulary",
      content: {
        englishText: [],
        vocabulary: [
          {
            word: "Germs",
            syllables: ["Germs"],
            phonetic: "/dʒɜːrmz/",
            meaning: "রোগজীবাণু (অতি ক্ষুদ্র ক্ষতিকর জীব)",
            partOfSpeech: "Noun",
            example: "Washing hands properly prevents harmful germs.",
            icon: "🦠"
          },
          {
            word: "Palms",
            syllables: ["Palms"],
            phonetic: "/pɑːmz/",
            meaning: "হাতের তালু (Note: 'l' বর্ণটি নীরব বা Silent)",
            partOfSpeech: "Noun",
            example: "Rub your palms together with soap and water.",
            icon: "✋"
          },
          {
            word: "Thumbs",
            syllables: ["Thumbs"],
            phonetic: "/θʌmz/",
            meaning: "হাতের বুড়ো আঙুল (Note: 'b' বর্ণটি নীরব বা Silent)",
            partOfSpeech: "Noun",
            example: "Rub around your thumbs thoroughly.",
            icon: "👍"
          },
          {
            word: "Wrists",
            syllables: ["Wrists"],
            phonetic: "/rɪsts/",
            meaning: "হাতের কবজি (Note: 'w' বর্ণটি নীরব বা Silent)",
            partOfSpeech: "Noun",
            example: "Always remember to wash your wrists.",
            icon: "🦾"
          },
          {
            word: "Fingertips",
            syllables: ["Fin", "ger", "tips"],
            phonetic: "/ˈfɪŋ.ɡər.tɪps/",
            meaning: "আঙুলের অগ্রভাগ ও নখের অংশ",
            partOfSpeech: "Noun",
            example: "Rub your fingertips on your wet palms.",
            icon: "👆"
          },
          {
            word: "Thoroughly",
            syllables: ["Thor", "ough", "ly"],
            phonetic: "/ˈθʌr.ə.li/",
            meaning: "পুঙ্খানুপুঙ্খভাবে / সম্পূর্ণ ভালো করে",
            partOfSpeech: "Adverb",
            example: "Rinse your hands thoroughly with clean water.",
            icon: "✨"
          },
          {
            word: "Towel",
            syllables: ["Tow", "el"],
            phonetic: "/ˈtaʊ.əl/",
            meaning: "তোয়ালে / পরিষ্কার হাত মোছার কাপড়",
            partOfSpeech: "Noun",
            example: "Dry your hands with a clean dry towel.",
            icon: "🧖"
          },
          {
            word: "Prevent",
            syllables: ["Pre", "vent"],
            phonetic: "/prɪˈvent/",
            meaning: "প্রতিরোধ করা / দূরে রাখা",
            partOfSpeech: "Verb",
            example: "Clean habits help to prevent diseases.",
            icon: "🛡️"
          }
        ]
      },
      teacherNotes: "বিশেষভাবে Palms (silent 'l'), Thumbs (silent 'b'), এবং Wrists (silent 'w') এর সঠিক উচ্চারণ বোর্ডে লিখে শিক্ষার্থীদের হাততালি দিয়ে ড্রিল করান।",
      quickTeachingSteps: [
        "ধাপ ১: শব্দের কার্ডে ক্লিক করে সঠিক ফোনেটিক্স সাউন্ড শিক্ষার্থীদের শোনান।",
        "ধাপ ২: নীরব বর্ণ (Silent letters: l in Palms, b in Thumbs, w in Wrists) চিহ্নিত করান।",
        "ধাপ ৩: বাক্যে প্রতিটি শব্দের প্রয়োগ বুঝিয়ে দিয়ে অর্থ পরিষ্কার করুন।"
      ]
    },
    {
      id: 3,
      title: "Main Text: 6 Steps of Washing Hands",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৮৯: এনসিটিবি অনুমোদিত হাত ধোয়ার ৬টি বিজ্ঞানসম্মত ধাপ (Activity B)",
      phase: "৩. মূল পাঠ উপস্থাপন (Text Presentation)",
      duration: "১০ মিনিট",
      themeColor: "from-sky-500 to-blue-600",
      imageEmoji: "📖 🧼 ⏱️",
      sceneType: "handwash",
      hasVisualStage: true,
      content: {
        englishText: [
          "Washing hands properly is the best way to prevent germs and diseases.",
          "Doctors recommend six steps to wash our hands:",
          "First, wet your hands with clean running water and apply soap.",
          "Second, rub your palms together.",
          "Third, rub the back of both hands.",
          "Fourth, clean between your fingers.",
          "Fifth, rub around your thumbs.",
          "Sixth, rub your fingertips on the palms and wash your wrists.",
          "Rinse thoroughly with water and dry with a clean towel.",
          "We must always wash our hands before eating, after using the toilet, and after coughing, sneezing or touching pets."
        ],
        banglaExplanation: "এনসিটিবি পাঠ্য: সঠিক নিয়মে হাত ধোয়া হলো জীবাণু ও রোগ প্রতিরোধ করার সর্বোত্তম উপায়। চিকিৎসকেরা হাত ধোয়ার জন্য ৬টি ধাপ মেনে চলার পরামর্শ দেন। প্রথমত, পরিষ্কার বহমান পানিতে হাত ভেজাও ও সাবান লাগাও। দ্বিতীয়ত, দুই হাতের তালু একসাথে ঘষো। তৃতীয়ত, উভয় হাতের পিঠ ঘষো। চতুর্থত, আঙুলের ফাঁকগুলো পরিষ্কার করো। পঞ্চমত, দুই বুড়ো আঙুলের চারপাশ ঘষো। ষষ্ঠত, তালুর ওপর আঙুলের ডগা ও নখ ঘষো এবং কবজি ধুয়ে নাও। পানি দিয়ে ভালো করে ধুয়ে পরিষ্কার তোয়ালে দিয়ে মোছো। খাওয়ার আগে, শৌচাগার ব্যবহারের পরে এবং হাঁচি-কাশি বা পোষা প্রাণী স্পর্শের পর আমাদের অবশ্যই হাত ধুতে হবে।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রতিটি অনুক্রমিক শব্দ (First, Second, Third, Fourth, Fifth, Sixth) এবং নির্দেশনামূলক ক্রিয়াপদ (Wet, Apply, Rub, Clean, Rinse, Dry) লক্ষ্য করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: বাম পাশের ভিজ্যুয়াল স্টেজে হাত ও সাবানের ফেনা শিক্ষার্থীদের দেখান।",
        "ধাপ ২: ১ থেকে ৬ নম্বর ধাপ ক্রমানুসারে হাত দিয়ে অভিনয় করে দেখান।",
        "ধাপ ৩: বাক্যগুলোর শব্দ ধরে ধরে অডিও কারাওকে চালিয়ে সরব পাঠ করান।"
      ]
    },
    {
      id: 4,
      title: "Pair Dialogue: Doctor & Student",
      subtitle: "সহপাঠীর সাথে জোড়ায় সংলাপ: ডা. জেসমিন ও নুসাইরের কথোপকথন (Activity C Dialogue)",
      phase: "৪. চরিত্র সংলাপ ও দ্বৈত অভিনয় (Roleplay)",
      duration: "৮ মিনিট",
      themeColor: "from-teal-600 to-emerald-600",
      imageEmoji: "👩‍⚕️ 👦 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice the health dialogue in pairs.",
          "Student A plays Dr. Jesmin and Student B plays Nusair:"
        ],
        banglaExplanation: "এনসিটিবি নির্দেশিকা অনুযায়ী শ্রেণিকক্ষে জোড়ায় সংলাপ চর্চা (Pair Work): একজন শিক্ষার্থী ডাক্তারের চরিত্রে এবং অন্যজন নুসাইরের চরিত্রে অভিনয় করে সঠিক হাত ধোয়ার নিয়ম আলোচনা করবে।",
        dialogue: [
          {
            speaker: "Doctor (Dr. Jesmin)",
            team: "Team A (Doctor)",
            text: "Hello Nusair! Do you know why washing hands is so important?",
            avatar: "👩‍⚕️"
          },
          {
            speaker: "Student (Nusair)",
            team: "Team B (Student)",
            text: "Hello Doctor! Yes, it kills germs and keeps us safe from sickness.",
            avatar: "👦"
          },
          {
            speaker: "Doctor (Dr. Jesmin)",
            team: "Team A (Doctor)",
            text: "Very good! How many steps do we follow, and for how long?",
            avatar: "👩‍⚕️"
          },
          {
            speaker: "Student (Nusair)",
            team: "Team B (Student)",
            text: "Six steps! And we scrub with soap for at least 20 seconds!",
            avatar: "👦"
          },
          {
            speaker: "Doctor (Dr. Jesmin)",
            team: "Team A (Doctor)",
            text: "Excellent! When must we always wash our hands?",
            avatar: "👩‍⚕️"
          },
          {
            speaker: "Student (Nusair)",
            team: "Team B (Student)",
            text: "Before eating, after using toilet, and after sneezing or touching pets!",
            avatar: "👦"
          },
          {
            speaker: "Doctor (Dr. Jesmin)",
            team: "Team A (Doctor)",
            text: "Brilliant, Nusair! Keep clean every day to stay strong and healthy!",
            avatar: "👩‍⚕️"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের দুই দলে ভাগ করে একজন ডাক্তার এবং অপরজন নুসাইর হয়ে সংলাপটি আত্মবিশ্বাসের সাথে বলতে বলুন। ২০ সেকেন্ড সময়ের জন্য 'Happy Birthday' গান দুইবার গাওয়ার টিপস দিন।",
      quickTeachingSteps: [
        "ধাপ ১: ডক্টর ও নুসাইরের ডায়লগটি স্পিকারে চালিয়ে শিক্ষার্থীদের শোনান।",
        "ধাপ ২: ছেলে ও মেয়ে শিক্ষার্থীদের দুটি দলে ভাগ করে পালাক্রমে ডায়লগ বলান।",
        "ধাপ ৩: হাত ধোয়ার তিনটি প্রধান উপলক্ষ্য (Before eating, after toilet, after sneezing) মুখস্থ ড্রিল করান।"
      ]
    },
    {
      id: 5,
      title: "Interactive Handwashing & Germ Zapping Studio",
      subtitle: "ভার্চুয়াল বেসিন, বহমান পানি ও সাবানের ৬টি ধাপ হ্যান্ডস-অন ল্যাব (Simulator)",
      phase: "৫. সিমুলেশন ও ব্যবহারিক অনুশীলন (Hands-on Practice)",
      duration: "৮ মিনিট",
      themeColor: "from-cyan-500 to-teal-500",
      imageEmoji: "🚰 🫧 🦠",
      sceneType: "handwash",
      hasVisualStage: true,
      content: {
        englishText: [
          "Welcome to the Interactive Handwashing Lab!",
          "Click the step buttons from 1 to 6 in order to wash properly:",
          "1. Water & Soap: Turn on tap and lather soap.",
          "2. Palms: Rub your palms together.",
          "3. Back of Hands: Rub the back of each hand.",
          "4. Between Fingers: Interlace and clean between fingers.",
          "5. Thumbs: Clean around both thumbs.",
          "6. Fingertips & Wrists: Scrub nails on palms and wash wrists.",
          "Watch all germs disappear and your hands shine clean!"
        ],
        activityTask: "শিক্ষার্থীরা ইন্টারঅ্যাক্টিভ স্টেজে প্রতিটি বাটনে ক্লিক করে ধাপে ধাপে হাত পরিষ্কার করবে এবং জীবাণু ধ্বংসের অ্যানিমেশন উপভোগ করবে।",
        banglaExplanation: "ব্যবহারিক অনুশীলন: সিমুলেটরে প্রতিটি ধাপে ক্লিক করে পানি ও সাবান দিয়ে হাত ধোয়ার ৬টি নিয়ম স্বচক্ষে দেখে নিজে নিজে ক্লাসে অনুকরণ করা।"
      },
      teacherNotes: "বোর্ডে শিক্ষার্থীদের ডাকুন এবং স্টেপ বাটনে ক্লিক করে হাত ধোয়ার প্রতিটি অঙ্গভঙ্গি ক্লাসের সবাইকে সাথে নিয়ে করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: স্টেপ ১ থেকে ৬ ক্রমানুসারে ক্লিক করে অ্যানিমেশন ও সাউন্ড শোনান।",
        "ধাপ ২: পানির কল চালু ও বন্ধ করে পানির অপচয় রোধের গুরুত্ব বলুন।",
        "ধাপ ৩: জীবাণু ধ্বংসের পর হাত চকচকে হওয়ার মুহূর্তটি উদযাপন করুন।"
      ]
    },
    {
      id: 6,
      title: "Sorting Game: Clean Habits vs. Germ Traps",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৯১: সুভ্যাস বনাম ক্ষতিকর জীবাণুযুক্ত অভ্যাস বাছাই খেলা (Activity D)",
      phase: "৬. দলগত খেলা ও বাছাই অনুশীলন (Sorting Game)",
      duration: "৭ মিনিট",
      themeColor: "from-emerald-500 to-green-600",
      imageEmoji: "🧼 🆚 🪰",
      sceneType: "activity",
      content: {
        englishText: [
          "Look at the daily habits below.",
          "Sort each habit into 'Clean Habits (সুভ্যাস)' or 'Germ Traps (জীবাণুর ফাঁদ)'."
        ],
        sortingGame: {
          instruction: "Drag or click the habits into the correct category box:",
          categories: {
            cat1: { id: "clean_habits", label: "Clean Habits (সুভ্যাস)", icon: "✨", theme: "emerald" },
            cat2: { id: "germ_traps", label: "Germ Traps (জীবাণুর ফাঁদ)", icon: "⚠️", theme: "amber" }
          },
          items: [
            { id: "h1", label: "Washing hands before eating", category: "clean_habits", icon: "🥗" },
            { id: "h2", label: "Eating food with dirty hands", category: "germ_traps", icon: "🍔" },
            { id: "h3", label: "Using soap after the toilet", category: "clean_habits", icon: "🚽" },
            { id: "h4", label: "Sneezing into bare hands without washing", category: "germ_traps", icon: "🤧" },
            { id: "h5", label: "Drying hands with a clean dry towel", category: "clean_habits", icon: "🧖" },
            { id: "h6", label: "Touching street dogs then rubbing eyes", category: "germ_traps", icon: "🐕" },
            { id: "h7", label: "Scrubbing palms and thumbs for 20 seconds", category: "clean_habits", icon: "⏱️" },
            { id: "h8", label: "Biting dirty fingernails", category: "germ_traps", icon: "💅" }
          ]
        },
        banglaExplanation: "সুভ্যাস বনাম জীবাণুর ফাঁদ খেলা: শিক্ষার্থীরা প্রতিদিনের অভ্যাসগুলোর মধ্য থেকে কোনগুলো স্বাস্থ্যকর সুভ্যাস এবং কোনগুলো রোগজীবাণু ছড়াতে পারে তা সঠিকভাবে বাছাই করবে।"
      },
      teacherNotes: "শিক্ষার্থীদের দলগতভাবে যুক্ত করে কোনটি ভালো অভ্যাস এবং কোনটি ক্ষতিকর তা যুক্তি দিয়ে বলতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি কার্ডের লেখা পড়ে বাংলা অর্থ ব্যাখ্যা করুন।",
        "ধাপ ২: শিক্ষার্থীরা হাত তুলে বলবে এটি 'Clean Habits' নাকি 'Germ Traps'।",
        "ধাপ ৩: সঠিক উত্তর ড্রপ করে কনফেটি অ্যানিমেশন দিয়ে উৎসাহিত করুন।"
      ]
    },
    {
      id: 7,
      title: "Language Focus: Ordinals & Imperative Verbs",
      subtitle: "অনুক্রমিক ক্রমবাচক শব্দ (First to Sixth) ও নির্দেশনামূলক বাক্য গঠন (Grammar Focus)",
      phase: "৭. ব্যাকরণ ও বাক্য গঠন (Grammar & Language Focus)",
      duration: "৭ মিনিট",
      themeColor: "from-indigo-500 to-purple-600",
      imageEmoji: "🎯 📝 ⚡",
      sceneType: "grammar",
      content: {
        englishText: [
          "Ordinal numbers tell us the order or steps: First, Second, Third, Fourth, Fifth, Sixth.",
          "Imperative verbs give instructions: Wet, Apply, Rub, Clean, Rinse, Dry.",
          "Complete the challenge sentences below:"
        ],
        punctuationDrill: {
          instruction: "Choose the correct missing word to complete each handwashing rule:",
          challenges: [
            {
              id: "c1",
              sentenceBefore: "_______, wet your hands with clean water and apply soap.",
              missingMark: "First",
              meaning: "প্রথমত, পরিষ্কার পানিতে হাত ভেজাও ও সাবান লাগাও।",
              options: ["First", "Second", "Third", "Sixth"]
            },
            {
              id: "c2",
              sentenceBefore: "Second, rub your _______ together.",
              missingMark: "palms",
              meaning: "দ্বিতীয়ত, দুই হাতের তালু একসাথে ঘষো।",
              options: ["palms", "shoes", "hair", "eyes"]
            },
            {
              id: "c3",
              sentenceBefore: "Clean between your fingers _______",
              missingMark: ".",
              meaning: "আঙুলের ফাঁকগুলো পরিষ্কার করো (নির্দেশনামূলক বাক্যের শেষে ফুলস্টপ বসবে)।",
              options: [".", "?", "!", ","]
            },
            {
              id: "c4",
              sentenceBefore: "We must wash our hands _______ eating.",
              missingMark: "before",
              meaning: "খাওয়ার আগে আমাদের অবশ্যই হাত ধুতে হবে।",
              options: ["before", "afterwards", "never", "behind"]
            }
          ]
        },
        banglaExplanation: "ক্রমবাচক শব্দ (First, Second, Third...) কোনো কাজের পর্যায় বা ধাপ বোঝায় এবং নির্দেশনামূলক ক্রিয়াপদ (Wet, Apply, Rub...) কীভাবে কাজটি করতে হবে তা প্রকাশ করে।"
      },
      teacherNotes: "শিক্ষার্থীদের দিয়ে First থেকে Sixth পর্যন্ত ক্রমানুসারে হাত ধোয়ার বাক্যগুলো বলান এবং বোর্ডের ড্রিল সম্পন্ন করান।",
      quickTeachingSteps: [
        "ধাপ ১: ক্রমবাচক শব্দের তালিকা বোর্ডে লিখে অনুশীলন করান।",
        "ধাপ ২: নির্দেশনামূলক ক্রিয়াপদগুলোর অর্থ বুঝিয়ে দিন।",
        "ধাপ ৩: শূন্যস্থান পূরণে সঠিক অপশনে ক্লিক করে তাৎক্ষণিক ফিডব্যাক দিন।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "শ্রেণিকক্ষ কুইজ এবং অধ্যায়ভিত্তিক ২০ নম্বরের পূর্ণাঙ্গ প্র্যাকটিস শিট (Evaluation)",
      phase: "৮. মূল্যায়ন ও ওয়ার্কশিট (Quiz & Assessment)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-500 to-pink-500",
      imageEmoji: "🏆 📋 ⭐",
      sceneType: "activity",
      content: {
        englishText: [
          "Well done! You have completed the 6 steps of handwashing.",
          "Answer the quiz question and download your 20-mark printable practice worksheet."
        ],
        quiz: {
          question: "How many steps of handwashing do doctors recommend?",
          options: ["A) Three steps", "B) Four steps", "C) Six steps", "D) Ten steps"],
          answer: "C) Six steps",
          hint: "Doctors recommend six standard steps to clean all parts of our hands!"
        },
        banglaExplanation: "মূল্যায়ন পর্ব: সম্পূর্ণ পাঠের ওপর ভিত্তি করে কুইজের সঠিক উত্তর দেওয়া এবং শ্রেণিকক্ষে বা বাড়ির কাজের জন্য ২০ নম্বরের এনসিটিবি ফরম্যাটের প্রশ্নপত্র ডাউনলোড করা।"
      },
      teacherNotes: "শিক্ষার্থীদের কুইজে অংশগ্রহণে উৎসাহিত করুন। সঠিক উত্তরের পর 'Download Printable Worksheet' বাটনে ক্লিক করে অফলাইন প্রশ্নপত্র সংগ্রহ করার পরামর্শ দিন।",
      quickTeachingSteps: [
        "ধাপ ১: কুইজের প্রশ্নটি ক্লাসে সরবে পাঠ করুন।",
        "ধাপ ২: শিক্ষার্থীরা সঠিক অপশনে ক্লিক করে ফলাফল যাচাই করবে।",
        "ধাপ ৩: ২০ নম্বরের ওয়ার্কশিট ডাউনলোডের মাধ্যমে পাঠ সমাপ্ত করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Government Primary School, Bangladesh",
    examTitle: "Class 3 English Assessment — Unit 6, Lesson 2: Cleanliness & Handwashing",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today",
    time: "20 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Choose the best answer (4 Marks)",
        instruction: "Read the questions and tick (✓) the correct answer:",
        content: [
          {
            q: "1. What is the best way to prevent germs and diseases?",
            options: ["A) Washing hands properly", "B) Sleeping all day", "C) Eating candy", "D) Watching TV"],
            answer: "A) Washing hands properly"
          },
          {
            q: "2. Which letter is silent in the word 'thumbs'?",
            options: ["A) Letter 't'", "B) Letter 'h'", "C) Letter 'b'", "D) Letter 's'"],
            answer: "C) Letter 'b'"
          },
          {
            q: "3. How long should we scrub our hands with soap?",
            options: ["A) 2 seconds", "B) 5 seconds", "C) At least 20 seconds", "D) 10 minutes"],
            answer: "C) At least 20 seconds"
          },
          {
            q: "4. Which letter is silent in the word 'palms'?",
            options: ["A) Letter 'l'", "B) Letter 'p'", "C) Letter 'm'", "D) Letter 's'"],
            answer: "A) Letter 'l'"
          }
        ]
      },
      {
        type: "matching",
        title: "Section B: Column Matching (4 Marks)",
        instruction: "Match Column A with Column B according to the handwashing steps:",
        content: [
          { a: "First step", b: "Wet hands and apply soap" },
          { a: "Second step", b: "Rub palms together" },
          { a: "Fifth step", b: "Rub around thumbs" },
          { a: "After rinsing", b: "Dry with a clean towel" }
        ]
      },
      {
        type: "fillInTheBlanks",
        title: "Section C: Complete with Action Verbs (4 Marks)",
        instruction: "Fill in each blank with the correct word from the box: [apply, clean, rinse, dry]",
        content: [
          "a) Wet your hands and ________ soap.",
          "b) ________ between your fingers.",
          "c) ________ thoroughly with clean running water.",
          "d) ________ your hands with a clean dry towel."
        ]
      },
      {
        type: "ordering",
        title: "Section D: Sequence the 6 Steps of Handwashing (4 Marks)",
        instruction: "Write numbers 1 to 4 to order these steps correctly:",
        content: [
          "(   ) Clean between your fingers.",
          "(   ) Wet hands with water and apply soap.",
          "(   ) Rub your palms together.",
          "(   ) Rub around your thumbs."
        ]
      },
      {
        type: "shortQuestions",
        title: "Section E: Short Answer Questions (4 Marks)",
        instruction: "Write short answers to the following questions in complete sentences:",
        content: [
          "1. When must we always wash our hands? (Mention two times)",
          "   Answer: ________________________________________________________________",
          "2. Why should we keep our hands clean?",
          "   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 5: CLASS 3 ENGLISH - INCLUSIVE EDUCATION: RANI IN A WHEELCHAIR (UNIT 5 LESSON 2)
// =========================================================================
export const INCLUSIVE_RANI_SLIDE_DECK: SlideDeck = {
  id: "inclusive-rani",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 5: Friends & School Life",
  lesson: "Lesson 2: Inclusive Education — Rani in a Wheelchair",
  topic: "এনসিটিবি পাঠ্যবই পৃষ্ঠা ৬৮-৭১ (Rani and Her Caring Friends)",
  category: "english",
  thumbnailEmoji: "👩‍🦽 🏫",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Activity A: Everyone is Special at School!",
      subtitle: "Unit 5: Friends & School Life | Lesson 2 (Page 68 Activity A - Welcoming Friends)",
      phase: "১. প্রেষণা ও পূর্বজ্ঞান যাচাই (Warm-up & Empathy)",
      duration: "৫ মিনিট",
      themeColor: "from-amber-500 to-orange-500",
      imageEmoji: "🏫 👩‍🦽 🌸",
      sceneType: "ramp",
      hasVisualStage: true,
      content: {
        englishText: [
          "Welcome to Joypur Primary School!",
          "Every child in our school has unique qualities and special talents.",
          "Some friends run fast, and some friends use a wheelchair.",
          "How can we make our school friendly, caring, and accessible for everyone?"
        ],
        activityTask: "স্ক্রিনের জয়পুর প্রাইমারি স্কুলের ক্যাম্পাস ও হুইলচেয়ার র‍্যাম্প শিক্ষার্থীদের দেখিয়ে আলোচনা করুন কীভাবে ক্লাসে সবাইকে সমান মর্যাদা দেওয়া যায়।",
        banglaExplanation: "এনসিটিবি পৃষ্ঠা ৬৮ Activity A: বিদ্যালয়ে সবার জন্য বন্ধুত্বপূর্ণ ও আনন্দময় পরিবেশ তৈরি করা। কিছু শিক্ষার্থী পায়ে হেঁটে চলে, আবার কিছু সহপাঠী হুইলচেয়ার ব্যবহার করে। সবাইকে সাথে নিয়ে কীভাবে আনন্দ নিয়ে পড়ালেখা করা যায় তা নিয়ে প্রাক-পঠন আলোচনা।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান তারা এমন কাউকে চেনে কি না যে হুইলচেয়ার ব্যবহার করে। অন্তর্ভুক্তিমূলক শিক্ষার গুরুত্ব সহজ ভাষায় বুঝিয়ে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: বাম পাশের দৃশ্যে জয়পুর প্রাইমারি স্কুলের ক্যাম্পাস ও হুইলচেয়ার র‍্যাম্প শিক্ষার্থীদের দেখান।",
        "ধাপ ২: রানি ও তার হাসিমুখ দেখে ক্লাসে সহমর্মিতার বার্তা ছড়িয়ে দিন।",
        "ধাপ ৩: প্রাক-পঠন আলোচনা শেষে পরবর্তী শব্দভাণ্ডার (Vocabulary) ল্যাবে যান।"
      ]
    },
    {
      id: 2,
      title: "Key Vocabulary Lab & Inclusive Concepts",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৬৯: সিলেবল ভাঙন, অর্থ ও সহমর্মিতামূলক শব্দভাণ্ডার (Vocabulary Lab)",
      phase: "২. শব্দ পরিচিতি ও ধ্বনিবিজ্ঞান (Phonics & Vocabulary)",
      duration: "৮ মিনিট",
      themeColor: "from-purple-500 to-indigo-600",
      imageEmoji: "🔤 ♿ 📖",
      sceneType: "vocabulary",
      content: {
        englishText: [],
        vocabulary: [
          {
            word: "Wheelchair",
            syllables: ["Wheel", "chair"],
            phonetic: "/ˈwiːl.tʃeər/",
            meaning: "হুইলচেয়ার (চলাচলের চাকাযুক্ত বিশেষ চেয়ার)",
            partOfSpeech: "Noun",
            example: "Rani uses a wheelchair to move around.",
            icon: "♿"
          },
          {
            word: "Ramp",
            syllables: ["Ramp"],
            phonetic: "/ræmp/",
            meaning: "ঢালু পথ (সিঁড়ির বিকল্প মসৃণ পথ)",
            partOfSpeech: "Noun",
            example: "Mita pushes the wheelchair up the ramp.",
            icon: "📐"
          },
          {
            word: "Cheerful",
            syllables: ["Cheer", "ful"],
            phonetic: "/ˈtʃɪə.fəl/",
            meaning: "হাসিখুশি / প্রফুল্ল চিত্তের",
            partOfSpeech: "Adjective",
            example: "Rani is a cheerful student of Class 3.",
            icon: "😊"
          },
          {
            word: "Caring",
            syllables: ["Car", "ing"],
            phonetic: "/ˈkeə.rɪŋ/",
            meaning: "যত্নশীল / সহমর্মী",
            partOfSpeech: "Adjective",
            example: "Her classmates are very kind and caring.",
            icon: "🤝"
          },
          {
            word: "Recitation",
            syllables: ["Rec", "i", "ta", "tion"],
            phonetic: "/ˌres.ɪˈteɪ.ʃən/",
            meaning: "কবিতা আবৃত্তি",
            partOfSpeech: "Noun",
            example: "Rani is very good at recitation.",
            icon: "🎙️"
          },
          {
            word: "Storytelling",
            syllables: ["Sto", "ry", "tell", "ing"],
            phonetic: "/ˈstɔː.riˌtel.ɪŋ/",
            meaning: "গল্প বলা / গল্প শোনানোর দক্ষতা",
            partOfSpeech: "Noun",
            example: "She loves English storytelling.",
            icon: "📖"
          },
          {
            word: "Valued",
            syllables: ["Val", "ued"],
            phonetic: "/ˈvæl.juːd/",
            meaning: "মূল্যায়িত / মূল্যবান বিবেচিত",
            partOfSpeech: "Adjective",
            example: "Every child is valued in our school.",
            icon: "💎"
          },
          {
            word: "Respected",
            syllables: ["Re", "spect", "ed"],
            phonetic: "/rɪˈspek.tɪd/",
            meaning: "সম্মানিত / শ্রদ্ধাশীল",
            partOfSpeech: "Adjective",
            example: "All students are respected equally.",
            icon: "🏅"
          }
        ]
      },
      teacherNotes: "প্রতিটি শব্দের সিলেবল ভাগ করে হাততালি ড্রিল করান। Cheerful (Cheer-ful), Recitation (Rec-i-ta-tion) শব্দের অর্থ ও প্রয়োগ স্পষ্ট করুন।",
      quickTeachingSteps: [
        "ধাপ ১: শব্দের কার্ডে ক্লিক করে সঠিক ফোনেটিক্স সাউন্ড শিক্ষার্থীদের শোনান।",
        "ধাপ ২: সিলেবল ভাঙন (Wheel-chair, Cheer-ful, Car-ing) হাততালি দিয়ে ড্রিল করান।",
        "ধাপ ৩: বাক্যে প্রতিটি শব্দের প্রয়োগ বুঝিয়ে দিয়ে অর্থ পরিষ্কার করুন।"
      ]
    },
    {
      id: 3,
      title: "Main Text: Rani and Her Caring Friends",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৭০: এনসিটিবি অনুমোদিত মূল পাঠ (Authentic Passage - Activity B)",
      phase: "৩. মূল পাঠ উপস্থাপন (Text Presentation)",
      duration: "১০ মিনিট",
      themeColor: "from-amber-500 to-emerald-600",
      imageEmoji: "📖 👩‍🦽 💖",
      sceneType: "ramp",
      hasVisualStage: true,
      content: {
        englishText: [
          "Rani is a cheerful student of Class 3.",
          "She cannot walk with her legs, so she uses a wheelchair to move around.",
          "But Rani never feels lonely or sad at school.",
          "Her classmates are very kind and caring.",
          "Every morning, her friend Mita helps her push the wheelchair up the ramp into the classroom.",
          "During games time, their physical education teacher arranges special passing ball games so that Rani can play with everyone.",
          "Rani is very good at recitation and storytelling.",
          "In our school, every child is valued and respected equally."
        ],
        banglaExplanation: "এনসিটিবি পাঠ্য: রানি তৃতীয় শ্রেণির একজন হাসিখুশি শিক্ষার্থী। সে পায়ে হেঁটে চলতে পারে না, তাই চলাচলের জন্য হুইলচেয়ার ব্যবহার করে। কিন্তু রানি স্কুলে কখনো একা বা বিষণ্ণ বোধ করে না। তার সহপাঠীরা অত্যন্ত দয়ালু ও যত্নশীল। প্রতিদিন সকালে তার বান্ধবী মিতা ক্লাসরুমে ঢোকার জন্য র‍্যাম্প দিয়ে হুইলচেয়ারটি ঠেলতে সাহায্য করে। খেলার সময় শরীরচর্চা শিক্ষক বিশেষ বল পাসিং খেলার আয়োজন করেন যাতে রানিও সবার সাথে খেলতে পারে। রানি কবিতা আবৃত্তি ও গল্প বলায় অত্যন্ত পারদর্শী। আমাদের বিদ্যালয়ে প্রতিটি শিশুকে সমানভাবে মূল্যায়ন ও সম্মান করা হয়।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রতিটি বাক্যের প্রতি মনোযোগ দিতে বলুন। 'cannot walk', 'so she uses', এবং 'valued and respected equally' এর সুন্দর নৈতিক বার্তা বুঝিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: বাম পাশের ভিজ্যুয়াল স্টেজে মিতা ও রানির র‍্যাম্প বেয়ে ক্লাসরুমে ওঠার দৃশ্য দেখান।",
        "ধাপ ২: বাক্যগুলোর শব্দ ধরে ধরে অডিও কারাওকে চালিয়ে সরব পাঠ করান।",
        "ধাপ ৩: সম্পূর্ণ পাঠ শেষে সহপাঠীদের ভূমিকা সম্পর্কে ছোট ছোট প্রশ্ন করুন।"
      ]
    },
    {
      id: 4,
      title: "Pair Dialogue: Mita & Rani",
      subtitle: "সহপাঠীর সাথে জোড়ায় সংলাপ: সকালের আন্তরিক শুভেচ্ছা ও ক্লাসে প্রবেশ (Activity C Dialogue)",
      phase: "৪. চরিত্র সংলাপ ও দ্বৈত অভিনয় (Roleplay)",
      duration: "৮ মিনিট",
      themeColor: "from-teal-600 to-indigo-600",
      imageEmoji: "👧 👩‍🦽 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice the morning dialogue in pairs.",
          "Student A plays Mita and Student B plays Rani:"
        ],
        banglaExplanation: "এনসিটিবি নির্দেশিকা অনুযায়ী শ্রেণিকক্ষে জোড়ায় সংলাপ চর্চা (Pair Work): একজন শিক্ষার্থী মিতার চরিত্রে এবং অন্যজন রানির চরিত্রে অভিনয় করে শুভেচ্ছা ও সহযোগিতার কথা বলবে।",
        dialogue: [
          {
            speaker: "Mita",
            team: "Team A (Mita)",
            text: "Good morning, Rani! How are you feeling today?",
            avatar: "👧"
          },
          {
            speaker: "Rani",
            team: "Team B (Rani)",
            text: "Good morning, Mita! I am feeling cheerful and ready for class!",
            avatar: "👩‍🦽"
          },
          {
            speaker: "Mita",
            team: "Team A (Mita)",
            text: "Hold on tight! Let me help you push your wheelchair up the ramp.",
            avatar: "👧"
          },
          {
            speaker: "Rani",
            team: "Team B (Rani)",
            text: "Thank you so much, Mita! You are such a caring and sweet friend.",
            avatar: "👩‍🦽"
          },
          {
            speaker: "Mita",
            team: "Team A (Mita)",
            text: "Are you excited for the passing ball game during sports period?",
            avatar: "👧"
          },
          {
            speaker: "Rani",
            team: "Team B (Rani)",
            text: "Yes, very much! And today I want to recite a new English poem for all our friends!",
            avatar: "👩‍🦽"
          },
          {
            speaker: "Mita",
            team: "Team A (Mita)",
            text: "Wonderful, Rani! In our school, we all learn and play together happily!",
            avatar: "👧"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের দুই দলে ভাগ করে একজন মিতা এবং অপরজন রানি হয়ে সংলাপটি আবেগ ও সঠিক উচ্চারণে বলতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: সংলাপটি স্পিকারে চালিয়ে শিক্ষার্থীদের সঠিক বাচনভঙ্গি শোনান।",
        "ধাপ ২: ছেলে ও মেয়ে শিক্ষার্থীদের দুটি দলে ভাগ করে পালাক্রমে রোলপ্লে করান।",
        "ধাপ ৩: বন্ধুত্বের সুন্দর বাক্যগুলো (You are such a caring friend) ক্লাসে সবাইকে বলতে উৎসাহিত করুন।"
      ]
    },
    {
      id: 5,
      title: "Interactive Classroom & Inclusive Ball Game Stage",
      subtitle: "সবার জন্য খেলাধুলা: ইন্টারঅ্যাক্টিভ বল পাসিং খেলা ও র‍্যাম্প সিমুলেটর (Activity Stage)",
      phase: "৫. সিমুলেশন ও ব্যবহারিক অনুশীলন (Hands-on Practice)",
      duration: "৮ মিনিট",
      themeColor: "from-emerald-500 to-teal-500",
      imageEmoji: "⚽ 👩‍🦽 🥳",
      sceneType: "ball_game",
      hasVisualStage: true,
      content: {
        englishText: [
          "Welcome to the Inclusive Sports Playground!",
          "In an inclusive school, games are designed so that every child can participate equally.",
          "Click on friends to pass the ball smoothly to Rani in the center.",
          "Cheer for Rani as she catches the ball and passes it back to her caring classmates!",
          "Notice how sports bring smiles, cooperation, and true friendship!"
        ],
        activityTask: "শিক্ষার্থীরা ইন্টারঅ্যাক্টিভ খেলার মাঠে বন্ধুদের নামের ওপর ক্লিক করে রানিকে বল পাস করবে এবং রানি বল ধরলে কনফেটি উল্লাস উপভোগ করবে।",
        banglaExplanation: "ব্যবহারিক অনুশীলন: শ্রেণিকক্ষে শিক্ষক এমন খেলার নিয়ম তৈরি করবেন যাতে শারীরিক প্রতিবন্ধকতা থাকা সত্ত্বেও রানি সবার সাথে আনন্দ নিয়ে খেলতে পারে।"
      },
      teacherNotes: "শিক্ষার্থীদের বোর্ডে ডেকে বল পাসিং খেলা পরিচালনায় অংশ নিতে দিন। শারীরিক ভিন্নতা সত্ত্বেও সবার অন্তর্ভুক্তি নিশ্চিত করার মানসিকতা গড়ে তুলুন।",
      quickTeachingSteps: [
        "ধাপ ১: খেলার মাঠে শিক্ষক, মিতা ও পড়শীর অবস্থান শিক্ষার্থীদের দেখান।",
        "ধাপ ২: 'রানিকে বল দাও' বাটনে ক্লিক করে বল পাসের অ্যানিমেশন ও শব্দ শোনান।",
        "ধাপ ৩: রানির বল ধরার সাফল্যে পুরো ক্লাসের সাথে করতালি দিয়ে উদযাপন করুন।"
      ]
    },
    {
      id: 6,
      title: "Sorting Game: Caring Actions vs. Excluding Actions",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৭১: সহমর্মী অন্তর্ভুক্তি বনাম উপেক্ষা ও বাধা সৃষ্টিকারী আচরণ বাছাই খেলা (Activity D)",
      phase: "৬. দলগত খেলা ও বাছাই অনুশীলন (Sorting Game)",
      duration: "৭ মিনিট",
      themeColor: "from-emerald-500 to-green-600",
      imageEmoji: "🤝 🆚 🚫",
      sceneType: "activity",
      content: {
        englishText: [
          "Look at the actions below.",
          "Sort each action into 'Caring Actions (সহমর্মী আচরণ)' or 'Excluding Actions (বাধা সৃষ্টিকারী আচরণ)'."
        ],
        sortingGame: {
          instruction: "Drag or click the actions into the correct category box:",
          categories: {
            cat1: { id: "caring_actions", label: "Caring Actions (সহমর্মী আচরণ)", icon: "💖", theme: "emerald" },
            cat2: { id: "excluding_actions", label: "Excluding Actions (বাধা সৃষ্টিকারী আচরণ)", icon: "⚠️", theme: "amber" }
          },
          items: [
            { id: "a1", label: "Helping a wheelchair friend up the ramp", category: "caring_actions", icon: "📐" },
            { id: "a2", label: "Leaving a disabled student alone during games", category: "excluding_actions", icon: "😢" },
            { id: "a3", label: "Arranging passing ball games for everyone", category: "caring_actions", icon: "⚽" },
            { id: "a4", label: "Laughing at a friend who cannot run fast", category: "excluding_actions", icon: "❌" },
            { id: "a5", label: "Listening politely to Rani's poem recitation", category: "caring_actions", icon: "🎙️" },
            { id: "a6", label: "Blocking the wheelchair path with heavy bags", category: "excluding_actions", icon: "🚧" },
            { id: "a7", label: "Sharing tiffin and studying together happily", category: "caring_actions", icon: "🍱" },
            { id: "a8", label: "Respecting every child equally in school", category: "caring_actions", icon: "🏅" }
          ]
        },
        banglaExplanation: "সহমর্মী আচরণ বনাম বাধা সৃষ্টিকারী আচরণ: শিক্ষার্থীরা প্রতিদিনের কাজের মধ্য থেকে কোনগুলো অন্তর্ভুক্তিমূলক ও সুন্দর আচরণ এবং কোনগুলো ক্ষতিকর তা আলাদা করবে।"
      },
      teacherNotes: "শিক্ষার্থীদের দলগতভাবে যুক্ত করে কোনটি ভালো আচরণ এবং কোনটি বর্জনীয় তা ক্লাসে আলোচনা করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি কার্ডের লেখা পড়ে বাংলা অর্থ বুঝিয়ে দিন।",
        "ধাপ ২: শিক্ষার্থীরা হাত তুলে বলবে এটি 'Caring Actions' নাকি 'Excluding Actions'।",
        "ধাপ ৩: সঠিক উত্তর ড্রপ করে কনফেটি অ্যানিমেশন দিয়ে উৎসাহিত করুন।"
      ]
    },
    {
      id: 7,
      title: "Language Focus: Modals & Conjunctions (can / cannot, so, but, because)",
      subtitle: "কারণ, ফলাফল ও সম্ভাবনা নির্দেশক শব্দ (Grammar & Sentence Building)",
      phase: "৭. ব্যাকরণ ও বাক্য গঠন (Grammar & Language Focus)",
      duration: "৭ মিনিট",
      themeColor: "from-indigo-500 to-purple-600",
      imageEmoji: "🎯 📝 ⚡",
      sceneType: "grammar",
      content: {
        englishText: [
          "We use 'cannot' to express inability: Rani cannot walk with her legs.",
          "We use 'so' to show result: She cannot walk, so she uses a wheelchair.",
          "We use 'but' to show contrast: She uses a wheelchair, but she never feels sad.",
          "We use 'because' to show reason: Mita helps Rani because she is a caring friend."
        ],
        punctuationDrill: {
          instruction: "Choose the correct missing word or punctuation mark to complete each sentence:",
          challenges: [
            {
              id: "c1",
              sentenceBefore: "Rani _______ walk with her legs, so she uses a wheelchair.",
              missingMark: "cannot",
              meaning: "রানি তার পা দিয়ে হাঁটতে পারে না, তাই সে হুইলচেয়ার ব্যবহার করে।",
              options: ["cannot", "can", "always", "running"]
            },
            {
              id: "c2",
              sentenceBefore: "Mita helps Rani _______ she is a caring friend.",
              missingMark: "because",
              meaning: "মিতা রানিকে সাহায্য করে কারণ সে একজন যত্নশীল বান্ধবী।",
              options: ["because", "but", "so", "or"]
            },
            {
              id: "c3",
              sentenceBefore: "In our school, every child is valued and respected equally _______",
              missingMark: ".",
              meaning: "আমাদের স্কুলে প্রতিটি শিশু সমানভাবে মূল্যায়িত ও সম্মানিত (বাক্য সমাপ্তিতে ফুলস্টপ)।",
              options: [".", "?", "!", ","]
            },
            {
              id: "c4",
              sentenceBefore: "Rani uses a wheelchair, _______ she never feels sad at school.",
              missingMark: "but",
              meaning: "রানি হুইলচেয়ার ব্যবহার করে, কিন্তু স্কুলে সে কখনো দুঃখিত বোধ করে না।",
              options: ["but", "so", "and", "under"]
            }
          ]
        },
        banglaExplanation: "ব্যাকরণ চর্চা: কোনো কাজ করতে না পারার ক্ষেত্রে 'cannot', কোনো কাজের ফলাফলের জন্য 'so', বিপরীতভাব প্রকাশের জন্য 'but' এবং কারণ প্রকাশের জন্য 'because' ব্যবহার করা হয়।"
      },
      teacherNotes: "শিক্ষার্থীদের 'cannot' এবং 'so' এর ব্যবহার বোর্ডের বাক্যে প্রয়োগ করে দেখান এবং চ্যালেঞ্জগুলোতে অংশ নিতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: cannot, so, but, because এর অর্থ বোর্ডে লিখে অনুশীলন করান।",
        "ধাপ ২: বাক্যের শূন্যস্থানে সঠিক শব্দ বসিয়ে সম্পূর্ণ অর্থ বোঝান।",
        "ধাপ ৩: অপশনে ক্লিক করে শিক্ষার্থীদের তাত্ক্ষণিক ফিডব্যাক দিন।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "শ্রেণিকক্ষ কুইজ এবং অধ্যায়ভিত্তিক ২০ নম্বরের পূর্ণাঙ্গ প্র্যাকটিস শিট (Evaluation)",
      phase: "৮. মূল্যায়ন ও ওয়ার্কশিট (Quiz & Assessment)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-500 to-pink-500",
      imageEmoji: "🏆 📋 ⭐",
      sceneType: "activity",
      content: {
        englishText: [
          "Well done! You have completed the lesson on Inclusive Education.",
          "Answer the quiz question and download your 20-mark printable practice worksheet."
        ],
        quiz: {
          question: "Why does Rani use a wheelchair to move around?",
          options: [
            "A) She cannot walk with her legs",
            "B) She likes racing cars",
            "C) Her shoes are dirty",
            "D) It is a fun game"
          ],
          answer: "A) She cannot walk with her legs",
          hint: "Rani has a physical disability and cannot walk with her feet, so she uses a wheelchair."
        },
        banglaExplanation: "মূল্যায়ন পর্ব: সম্পূর্ণ পাঠের ওপর ভিত্তি করে কুইজের সঠিক উত্তর দেওয়া এবং শ্রেণিকক্ষে বা বাড়ির কাজের জন্য ২০ নম্বরের এনসিটিবি ফরম্যাটের প্রশ্নপত্র ডাউনলোড করা।"
      },
      teacherNotes: "শিক্ষার্থীদের কুইজে অংশগ্রহণে উৎসাহিত করুন। সঠিক উত্তরের পর 'Download Printable Worksheet' বাটনে ক্লিক করে অফলাইন প্রশ্নপত্র সংগ্রহ করার পরামর্শ দিন।",
      quickTeachingSteps: [
        "ধাপ ১: কুইজের প্রশ্নটি ক্লাসে সরবে পাঠ করুন।",
        "ধাপ ২: শিক্ষার্থীরা সঠিক অপশনে ক্লিক করে ফলাফল যাচাই করবে।",
        "ধাপ ৩: ২০ নম্বরের ওয়ার্কশিট ডাউনলোডের মাধ্যমে পাঠ সমাপ্ত করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Government Primary School, Bangladesh",
    examTitle: "Class 3 English Assessment — Unit 5, Lesson 2: Inclusive Education — Rani in a Wheelchair",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today",
    time: "20 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Choose the best answer (4 Marks)",
        instruction: "Read the questions and tick (✓) the correct answer:",
        content: [
          {
            q: "1. What class does Rani read in?",
            options: ["A) Class 1", "B) Class 2", "C) Class 3", "D) Class 4"],
            answer: "C) Class 3"
          },
          {
            q: "2. How does Rani enter the classroom smoothly?",
            options: ["A) By climbing stairs", "B) By wheelchair ramp", "C) By jumping", "D) By elevator"],
            answer: "B) By wheelchair ramp"
          },
          {
            q: "3. Who helps Rani push the wheelchair in the morning?",
            options: ["A) Her friend Mita", "B) A driver", "C) The gatekeeper", "D) Her little brother"],
            answer: "A) Her friend Mita"
          },
          {
            q: "4. What special talent does Rani have?",
            options: ["A) Football running", "B) High jump", "C) Cycling", "D) Recitation and storytelling"],
            answer: "D) Recitation and storytelling"
          }
        ]
      },
      {
        type: "matching",
        title: "Section B: Column Matching (4 Marks)",
        instruction: "Match Column A with Column B according to the passage:",
        content: [
          { a: "Rani", b: "Uses a wheelchair to move around" },
          { a: "Mita", b: "Helps push the wheelchair up the ramp" },
          { a: "P.E. Teacher", b: "Arranges special passing ball games" },
          { a: "Our School", b: "Every child is valued and respected equally" }
        ]
      },
      {
        type: "fillInTheBlanks",
        title: "Section C: Complete with Words from the Box (4 Marks)",
        instruction: "Fill in each blank with the correct word from the box: [wheelchair, ramp, caring, respected]",
        content: [
          "a) Rani uses a ________ to move around.",
          "b) Mita helps Rani push her wheelchair up the ________.",
          "c) Rani's classmates are very kind and ________.",
          "d) In our school, all children are ________ equally."
        ]
      },
      {
        type: "trueFalse",
        title: "Section D: Write True or False (4 Marks)",
        instruction: "Read the statements and write True or False beside each:",
        content: [
          "a) Rani is kept alone during games time. -> [ False ]",
          "b) Rani's classmates are kind and helpful. -> [ True ]",
          "c) Rani can run fast with her legs. -> [ False ]",
          "d) Rani is very good at recitation and storytelling. -> [ True ]"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section E: Short Answer Questions (4 Marks)",
        instruction: "Write short answers to the following questions in complete sentences:",
        content: [
          "1. Why does Rani need a wheelchair to move?",
          "   Answer: ________________________________________________________________",
          "2. How do classmates in Joypur school create a friendly environment for Rani?",
          "   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 6: CLASS 3 ENGLISH - SAVE OUR WATER: PREVENTING WASTAGE (UNIT 7 LESSON 3)
// =========================================================================
export const SAVE_WATER_SLIDE_DECK: SlideDeck = {
  id: "save-water",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 7: Save Our Water",
  lesson: "Lesson 3: Saving Water — Preventing Wastage",
  topic: "এনসিটিবি পাঠ্যবই পৃষ্ঠা ১০২-১০৭ (Why Water is Life and How to Save It)",
  category: "english",
  thumbnailEmoji: "💧 🚰",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Activity A: Why is Water Called Life?",
      subtitle: "Unit 7: Save Our Water | Lesson 3 (Page 102 Activity A - Uses in Nature)",
      phase: "১. প্রেষণা ও পূর্বজ্ঞান যাচাই (Warm-up & Observation)",
      duration: "৫ মিনিট",
      themeColor: "from-sky-500 to-cyan-500",
      imageEmoji: "💧 🌍 🌿",
      sceneType: "uses",
      hasVisualStage: true,
      content: {
        englishText: [
          "Look around! Plants, birds, animals, and humans all need water.",
          "Can any living creature survive without drinking water?",
          "Pure drinking water is very precious and limited on our planet Earth.",
          "How can we protect every single drop of water in our daily life?"
        ],
        activityTask: "স্ক্রিনের ভিজ্যুয়াল স্টেজে পানির ৫টি অপরিহার্য ব্যবহার শিক্ষার্থীদের দেখিয়ে আলোচনা করুন পানি ছাড়া কেন কোনো জীব বা উদ্ভিদ বাঁচতে পারে না।",
        banglaExplanation: "এনসিটিবি পৃষ্ঠা ১০২ Activity A: পানিকে কেন জীবন বলা হয় এবং জীবজগতের জন্য বিশুদ্ধ পানির অপরিহার্যতা নিয়ে প্রাক-পঠন আলোচনা। পৃথিবীতে খাবার পানির পরিমাণ সীমিত এবং অমূল্য।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান পানি ছাড়া মানুষ বা গাছপালা কয়দিন বেঁচে থাকতে পারে। পানির অপচয় কীভাবে আমাদের ভবিষ্যৎকে বিপদে ফেলতে পারে তা বোঝান।",
      quickTeachingSteps: [
        "ধাপ ১: বাম পাশের ভিজ্যুয়াল স্টেজে পানির ৫টি প্রধান ব্যবহার শিক্ষার্থীদের দেখান।",
        "ধাপ ২: প্রতিদিনের জীবনে কত লিটার পানির প্রয়োজন হয় তা নিয়ে ক্লাসে মুক্ত আলোচনা করুন।",
        "ধাপ ৩: প্রাক-পঠন আলোচনা শেষে পরবর্তী শব্দভাণ্ডার (Vocabulary) ল্যাবে যান।"
      ]
    },
    {
      id: 2,
      title: "Key Vocabulary Lab & Environmental Phonics",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১০৩: সিলেবল ভাঙন, অর্থ ও পানি সংরক্ষণের পরিভাষা (Vocabulary Lab)",
      phase: "২. শব্দ পরিচিতি ও ধ্বনিবিজ্ঞান (Phonics & Vocabulary)",
      duration: "৮ মিনিট",
      themeColor: "from-cyan-500 to-blue-600",
      imageEmoji: "🔤 💧 📘",
      sceneType: "vocabulary",
      content: {
        englishText: [],
        vocabulary: [
          {
            word: "Survive",
            syllables: ["Sur", "vive"],
            phonetic: "/səˈvaɪv/",
            meaning: "বেঁচে থাকা / টিকে থাকা",
            partOfSpeech: "Verb",
            example: "No plant or animal can survive without water.",
            icon: "🌱"
          },
          {
            word: "Precious",
            syllables: ["Pre", "cious"],
            phonetic: "/ˈpreʃ.əs/",
            meaning: "অত্যন্ত মূল্যবান ও অমূল্য",
            partOfSpeech: "Adjective",
            example: "Pure clean water is precious and limited.",
            icon: "💎"
          },
          {
            word: "Limited",
            syllables: ["Lim", "i", "ted"],
            phonetic: "/ˈlɪm.ɪ.tɪd/",
            meaning: "সীমিত / পরিমিত পরিমাণে বিদ্যমান",
            partOfSpeech: "Adjective",
            example: "Fresh drinking water resources are limited.",
            icon: "⏳"
          },
          {
            word: "Utensils",
            syllables: ["U", "ten", "sils"],
            phonetic: "/juːˈten.sɪlz/ ",
            meaning: "থালাবাসন ও রান্নার তৈজসপত্র",
            partOfSpeech: "Noun",
            example: "We need clean water for washing kitchen utensils.",
            icon: "🍽️"
          },
          {
            word: "Waste",
            syllables: ["Waste"],
            phonetic: "/weɪst/",
            meaning: "অপচয় করা / নষ্ট করা",
            partOfSpeech: "Verb",
            example: "We must never waste water unnecessarily.",
            icon: "🛑"
          },
          {
            word: "Tightly",
            syllables: ["Tight", "ly"],
            phonetic: "/ˈtaɪt.li/",
            meaning: "দৃঢ়ভাবে / শক্তভাবে",
            partOfSpeech: "Adverb",
            example: "Always turn off the water tap tightly.",
            icon: "🔒"
          },
          {
            word: "Leaky",
            syllables: ["Leak", "y"],
            phonetic: "/ˈliː.ki/",
            meaning: "ফুটোযুক্ত / যেখান দিয়ে ফোঁটা ফোঁটা পানি পড়ে",
            partOfSpeech: "Adjective",
            example: "Repair any leaky pipe or broken tap immediately.",
            icon: "💧"
          },
          {
            word: "Protect",
            syllables: ["Pro", "tect"],
            phonetic: "/prəˈtekt/",
            meaning: "রক্ষা করা / সুরক্ষা দেওয়া",
            partOfSpeech: "Verb",
            example: "Saving water will protect our future tomorrow.",
            icon: "🛡️"
          }
        ]
      },
      teacherNotes: "Precious (Pre-cious) ও Tightly (Tight-ly) শব্দের সিলেবল ভাঙন এবং ক্রিয়াবিশেষণ (Adverb of manner) এর ব্যবহার শিক্ষার্থীদের হাততালি ড্রিল করান।",
      quickTeachingSteps: [
        "ধাপ ১: শব্দের কার্ডে ক্লিক করে সঠিক ফোনেটিক্স সাউন্ড শিক্ষার্থীদের শোনান।",
        "ধাপ ২: সিলেবল ভাঙন (Pre-cious, U-ten-sils, Tight-ly) ড্রিল করান।",
        "ধাপ ৩: বাক্যে প্রতিটি শব্দের প্রয়োগ বুঝিয়ে দিয়ে অর্থ পরিষ্কার করুন।"
      ]
    },
    {
      id: 3,
      title: "Main Text: Why Water is Life and How to Save It",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১০৪: এনসিটিবি অনুমোদিত মূল পাঠ (Authentic Passage - Activity B)",
      phase: "৩. মূল পাঠ উপস্থাপন (Text Presentation)",
      duration: "১০ মিনিট",
      themeColor: "from-sky-500 to-blue-600",
      imageEmoji: "📖 🚰 💧",
      sceneType: "tap_lab",
      hasVisualStage: true,
      content: {
        englishText: [
          "Water is called life because no living creature or plant can survive without it.",
          "We need clean water for drinking, cooking meals, bathing, washing utensils, and growing crops in the fields.",
          "However, pure water is very precious and limited.",
          "We must never waste water unnecessarily.",
          "Always turn off the water tap tightly while brushing your teeth or washing dishes.",
          "If you notice any leaky pipe or broken tap, inform adults immediately to fix it.",
          "Saving every single drop of water today will protect our future tomorrow."
        ],
        banglaExplanation: "এনসিটিবি পাঠ্য: পানিকে জীবন বলা হয় কারণ পানি ছাড়া কোনো জীব বা উদ্ভিদ বাঁচতে পারে না। পান করা, রান্না করা, গোসল করা, বাসনকোসন ধোয়া এবং মাঠে ফসল ফলানোর জন্য আমাদের পরিষ্কার পানি প্রয়োজন। তবে বিশুদ্ধ পানি খুবই মূল্যবান ও সীমিত। অনর্থক আমাদের কখনোই পানির অপচয় করা উচিত নয়। দাঁত মাজার সময় বা বাসন ধোয়ার সময় সবসময় পানির কল শক্তভাবে বন্ধ রাখুন। কোনো ফুটো পাইপ বা ভাঙা কল দেখলে তা মেরামতের জন্য সাথে সাথে বড়দের জানান। আজ পানির প্রতিটি ফোঁটা বাঁচানোই আমাদের আগামীকালকে সুরক্ষিত করবে।"
      },
      teacherNotes: "শিক্ষার্থীদের 'water is called life', 'precious and limited', এবং 'turn off the tap tightly' বাক্যগুলোর প্রতি বিশেষ দৃষ্টি দিতে বলুন। শব্দে ক্লিক করে অডিও শোনান।",
      quickTeachingSteps: [
        "ধাপ ১: বাম পাশের সিমুলেটরে পানির কল চালু ও বন্ধের প্রক্রিয়া দেখান।",
        "ধাপ ২: বাক্যগুলোর শব্দ ধরে ধরে অডিও কারাওকে চালিয়ে সরব পাঠ করান।",
        "ধাপ ৩: সম্পূর্ণ পাঠ শেষে পানির অপচয় রোধে করণীয় ৩টি কাজ শিক্ষার্থীদের কাছ থেকে জানতে চান।"
      ]
    },
    {
      id: 4,
      title: "Pair Dialogue: Shihab & Kaniz",
      subtitle: "সহপাঠীর সাথে জোড়ায় সংলাপ: বাগানের ফুটো কল মেরামত ও সচেতনতা (Activity C Dialogue)",
      phase: "৪. চরিত্র সংলাপ ও দ্বৈত অভিনয় (Roleplay)",
      duration: "৮ মিনিট",
      themeColor: "from-teal-600 to-cyan-600",
      imageEmoji: "👦 👧 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice the conservation dialogue in pairs.",
          "Student A plays Shihab and Student B plays Kaniz:"
        ],
        banglaExplanation: "এনসিটিবি নির্দেশিকা অনুযায়ী শ্রেণিকক্ষে জোড়ায় সংলাপ চর্চা (Pair Work): একজন শিক্ষার্থী শিহাবের চরিত্রে এবং অন্যজন কানিজের চরিত্রে অভিনয় করে স্কুলের কল বন্ধ ও পানি বাঁচানোর বিষয়ে কথা বলবে।",
        dialogue: [
          {
            speaker: "Shihab",
            team: "Team A (Shihab)",
            text: "Hello Kaniz! Did you hear that dripping sound near the garden tap?",
            avatar: "👦"
          },
          {
            speaker: "Kaniz",
            team: "Team B (Kaniz)",
            text: "Yes, Shihab! Drip... drip... drip! The tap was left slightly open!",
            avatar: "👧"
          },
          {
            speaker: "Shihab",
            team: "Team A (Shihab)",
            text: "Oh no! Pure water is so precious and limited. We must not waste a drop!",
            avatar: "👦"
          },
          {
            speaker: "Kaniz",
            team: "Team B (Kaniz)",
            text: "Look, I have turned the knob tightly. The dripping has stopped completely!",
            avatar: "👧"
          },
          {
            speaker: "Shihab",
            team: "Team A (Shihab)",
            text: "Well done, Kaniz! What should we always remember while brushing our teeth?",
            avatar: "👦"
          },
          {
            speaker: "Kaniz",
            team: "Team B (Kaniz)",
            text: "Always turn off the tap tightly while brushing! Never let clean water run away!",
            avatar: "👧"
          },
          {
            speaker: "Shihab",
            team: "Team A (Shihab)",
            text: "Brilliant! Save water today, protect our future tomorrow!",
            avatar: "👦"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের দুই দলে ভাগ করে একজন শিহাব এবং অপরজন কানিজ হয়ে সংলাপটি আত্মবিশ্বাসের সাথে বলতে বলুন। 'Drip... drip... drip!' ধ্বনিটি অনুকরণ করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: সংলাপটি স্পিকারে চালিয়ে শিক্ষার্থীদের কথোপকথনের সুর শোনান।",
        "ধাপ ২: ছেলে ও মেয়ে শিক্ষার্থীদের দুটি দলে ভাগ করে পালাক্রমে ডায়লগ চর্চা করান।",
        "ধাপ ৩: পানি বাঁচানোর প্রধান স্লোগানটি ক্লাসে সমস্বরে পুনরাবৃত্তি করান।"
      ]
    },
    {
      id: 5,
      title: "Interactive Water Tap & Leak Detective Studio",
      subtitle: "ভার্চুয়াল কল, পাইপের ফুটো মেরামত ও ওয়াটার সেভিং লাইভ মিটার (Simulation Lab)",
      phase: "৫. সিমুলেশন ও ব্যবহারিক অনুশীলন (Hands-on Practice)",
      duration: "৮ মিনিট",
      themeColor: "from-sky-500 to-teal-500",
      imageEmoji: "🚰 🔧 💧",
      sceneType: "tap_lab",
      hasVisualStage: true,
      content: {
        englishText: [
          "Welcome to the Water Saving Simulation Lab!",
          "Click 'Turn on' to observe running water, and 'Turn off' to save 5 Liters.",
          "Click 'Fix Leak' to tighten the pipe leak and save 15 Liters instantly.",
          "Watch your live water counter go up as you prevent unnecessary wastage!",
          "Every single drop of water saved protects our future!"
        ],
        activityTask: "শিক্ষার্থীরা ইন্টারঅ্যাক্টিভ সিমুলেটরে কল চালু-বন্ধ করবে এবং ফুটো পাইপ মেরামত করে পানি অপচয় রোধের লাইভ লিটার মিটার বাড়াবে।",
        banglaExplanation: "ব্যবহারিক অনুশীলন: সিমুলেটরে কল বন্ধ করে এবং ফুটো পাইপ মেরামত করে শিক্ষার্থীরা চাক্ষুষভাবে বুঝবে কীভাবে প্রতিদিন লিটারকে লিটার বিশুদ্ধ পানি অপচয় থেকে বাঁচানো সম্ভব।"
      },
      teacherNotes: "বোর্ডে শিক্ষার্থীদের ডেকে এনে কল বন্ধ করতে এবং ফুটো মেরামতের বাটনে ক্লিক করতে বলুন। কত লিটার পানি বাঁচল তা গণনা করতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: কল চালু করে পানি পড়ার দৃশ্য ও ফোঁটা পড়ার শব্দ শিক্ষার্থীদের দেখান।",
        "ধাপ ২: 'কল বন্ধ করো' বাটনে ক্লিক করে সাথে সাথে পানি প্রবাহ থামান।",
        "ধাপ ৩: ফুটো পাইপ মেরামত করে লাইভ কাউন্টারে ২০ লিটার পানি বাঁচানোর মুহূর্ত উদযাপন করুন।"
      ]
    },
    {
      id: 6,
      title: "Sorting Game: Water Saving Habits vs. Wastage",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১০৬: পানি বাঁচানোর সুভ্যাস বনাম পানির অপচয়কারী বদভ্যাস বাছাই খেলা (Activity D)",
      phase: "৬. দলগত খেলা ও বাছাই অনুশীলন (Sorting Game)",
      duration: "৭ মিনিট",
      themeColor: "from-emerald-500 to-green-600",
      imageEmoji: "💧 🆚 🚯",
      sceneType: "activity",
      content: {
        englishText: [
          "Look at the daily water habits below.",
          "Sort each habit into 'Saving Water (পানি বাঁচানোর সুভ্যাস)' or 'Wasting Water (পানির অপচয়)'."
        ],
        sortingGame: {
          instruction: "Drag or click the habits into the correct category box:",
          categories: {
            cat1: { id: "saving_habits", label: "Saving Water (পানি বাঁচানো)", icon: "✨", theme: "emerald" },
            cat2: { id: "wasting_habits", label: "Wasting Water (পানির অপচয়)", icon: "⚠️", theme: "amber" }
          },
          items: [
            { id: "w1", label: "Turning off tap tightly while brushing teeth", category: "saving_habits", icon: "🪥" },
            { id: "w2", label: "Leaving tap running while soaping hands", category: "wasting_habits", icon: "🧼" },
            { id: "w3", label: "Fixing leaky pipes and broken taps immediately", category: "saving_habits", icon: "🔧" },
            { id: "w4", label: "Letting water bucket overflow onto floor", category: "wasting_habits", icon: "🪣" },
            { id: "w5", label: "Using a mug of water to rinse mouth", category: "saving_habits", icon: "🥛" },
            { id: "w6", label: "Playing with running hosepipe for fun", category: "wasting_habits", icon: "🚿" },
            { id: "w7", label: "Watering plants in early morning or evening", category: "saving_habits", icon: "🌱" },
            { id: "w8", label: "Ignoring broken and dripping school taps", category: "wasting_habits", icon: "❌" }
          ]
        },
        banglaExplanation: "পানি বাঁচানোর সুভ্যাস বনাম পানির অপচয়: প্রতিদিনের অভ্যাসের মধ্য থেকে কোনগুলো দায়িত্বশীল আচরণ এবং কোনগুলো ক্ষতিকর অপচয় তা শিক্ষার্থীরা আলাদা করবে।"
      },
      teacherNotes: "শিক্ষার্থীদের দলগতভাবে যুক্ত করে কোনটি ভালো অভ্যাস এবং কোনটি ক্ষতিকর অপচয় তা ক্লাসে যুক্তি দিয়ে বলতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি কার্ডের লেখা পড়ে বাংলা অর্থ ব্যাখ্যা করুন।",
        "ধাপ ২: শিক্ষার্থীরা হাত তুলে বলবে এটি 'Saving Water' নাকি 'Wasting Water'।",
        "ধাপ ৩: সঠিক উত্তর ড্রপ করে কনফেটি অ্যানিমেশন দিয়ে উৎসাহিত করুন।"
      ]
    },
    {
      id: 7,
      title: "Language Focus: Imperatives & Adverbs of Manner",
      subtitle: "নির্দেশনামূলক বাক্য (Imperatives) ও ক্রিয়াবিশেষণ (Adverbs: tightly, immediately)",
      phase: "৭. ব্যাকরণ ও বাক্য গঠন (Grammar & Language Focus)",
      duration: "৭ মিনিট",
      themeColor: "from-indigo-500 to-purple-600",
      imageEmoji: "🎯 📝 ⚡",
      sceneType: "grammar",
      content: {
        englishText: [
          "Imperative verbs give direct commands: Turn off, Inform, Fix, Save.",
          "Adverbs of manner describe HOW an action is done: tightly, immediately, unnecessarily.",
          "Complete the challenge sentences below:"
        ],
        punctuationDrill: {
          instruction: "Choose the correct missing word or punctuation mark to complete each rule:",
          challenges: [
            {
              id: "c1",
              sentenceBefore: "Always turn off the water tap _______.",
              missingMark: "tightly",
              meaning: "সবসময় পানির কল শক্তভাবে বন্ধ রাখুন।",
              options: ["tightly", "loosely", "slowly", "never"]
            },
            {
              id: "c2",
              sentenceBefore: "We must never waste water _______.",
              missingMark: "unnecessarily",
              meaning: "অনর্থক বা অপ্রয়োজনে আমাদের কখনোই পানির অপচয় করা উচিত নয়।",
              options: ["unnecessarily", "happily", "loudly", "early"]
            },
            {
              id: "c3",
              sentenceBefore: "If you notice a leaky pipe, inform adults _______",
              missingMark: "immediately",
              meaning: "ফুটো পাইপ দেখলে সাথে সাথে বা তাৎক্ষণিকভাবে বড়দের জানান।",
              options: ["immediately", "yesterday", "never", "carefully"]
            },
            {
              id: "c4",
              sentenceBefore: "Saving every single drop of water today will protect our future _______",
              missingMark: ".",
              meaning: "আজ পানির প্রতিটি ফোঁটা বাঁচানোই আমাদের ভবিষ্যৎ সুরক্ষিত করবে (বাক্য সমাপ্তিতে ফুলস্টপ)।",
              options: [".", "?", "!", ","]
            }
          ]
        },
        banglaExplanation: "ব্যাকরণ চর্চা: নির্দেশনামূলক ক্রিয়াপদ (Turn off, Inform...) কাজের নির্দেশ দেয় এবং ক্রিয়াবিশেষণ (tightly, immediately...) কাজটি কীভাবে করতে হবে তা প্রকাশ করে।"
      },
      teacherNotes: "শিক্ষার্থীদের 'tightly' এবং 'immediately' শব্দ দুটির সঠিক ব্যবহার বোর্ডের বাক্যে ড্রিল করান।",
      quickTeachingSteps: [
        "ধাপ ১: নির্দেশনামূলক ক্রিয়াপদ ও ক্রিয়াবিশেষণের তালিকা বোর্ডে লিখে অনুশীলন করান।",
        "ধাপ ২: বাক্যের শূন্যস্থানে সঠিক শব্দ বসিয়ে সম্পূর্ণ অর্থ পরিষ্কার করুন।",
        "ধাপ ৩: অপশনে ক্লিক করে শিক্ষার্থীদের তাত্ক্ষণিক ফিডব্যাক দিন।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "শ্রেণিকক্ষ কুইজ এবং অধ্যায়ভিত্তিক ২০ নম্বরের পূর্ণাঙ্গ প্র্যাকটিস শিট (Evaluation)",
      phase: "৮. মূল্যায়ন ও ওয়ার্কশিট (Quiz & Assessment)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-500 to-pink-500",
      imageEmoji: "🏆 📋 ⭐",
      sceneType: "activity",
      content: {
        englishText: [
          "Well done! You have learned how to protect and save our precious water.",
          "Answer the quiz question and download your 20-mark printable practice worksheet."
        ],
        quiz: {
          question: "Why is water called life?",
          options: [
            "A) No living creature or plant can survive without it",
            "B) It is colorful and sweet",
            "C) It is made of sugar",
            "D) It can fly in the sky"
          ],
          answer: "A) No living creature or plant can survive without it",
          hint: "Water is essential for the survival of all living creatures and plants!"
        },
        banglaExplanation: "মূল্যায়ন পর্ব: সম্পূর্ণ পাঠের ওপর ভিত্তি করে কুইজের সঠিক উত্তর দেওয়া এবং শ্রেণিকক্ষে বা বাড়ির কাজের জন্য ২০ নম্বরের এনসিটিবি ফরম্যাটের প্রশ্নপত্র ডাউনলোড করা।"
      },
      teacherNotes: "শিক্ষার্থীদের কুইজে অংশগ্রহণে উৎসাহিত করুন। সঠিক উত্তরের পর 'Download Printable Worksheet' বাটনে ক্লিক করে অফলাইন প্রশ্নপত্র সংগ্রহ করার পরামর্শ দিন।",
      quickTeachingSteps: [
        "ধাপ ১: কুইজের প্রশ্নটি ক্লাসে সরবে পাঠ করুন।",
        "ধাপ ২: শিক্ষার্থীরা সঠিক অপশনে ক্লিক করে ফলাফল যাচাই করবে।",
        "ধাপ ৩: ২০ নম্বরের ওয়ার্কশিট ডাউনলোডের মাধ্যমে পাঠ সমাপ্ত করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Government Primary School, Bangladesh",
    examTitle: "Class 3 English Assessment — Unit 7, Lesson 3: Save Our Water & Preventing Wastage",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today",
    time: "20 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Choose the best answer (4 Marks)",
        instruction: "Read the questions and tick (✓) the correct answer:",
        content: [
          {
            q: "1. Why is water called life?",
            options: [
              "A) No living creature can survive without it",
              "B) It is red in color",
              "C) It tastes like chocolate",
              "D) It makes loud sounds"
            ],
            answer: "A) No living creature can survive without it"
          },
          {
            q: "2. How should we turn off the water tap?",
            options: ["A) Loosely", "B) Carelessly", "C) Tightly", "D) Halfway"],
            answer: "C) Tightly"
          },
          {
            q: "3. What should we do if we see a leaky pipe or broken tap?",
            options: [
              "A) Hide it",
              "B) Inform adults immediately to fix it",
              "C) Ignore it",
              "D) Break it more"
            ],
            answer: "B) Inform adults immediately to fix it"
          },
          {
            q: "4. Why should we save water today?",
            options: [
              "A) To waste it later",
              "B) To play games",
              "C) To throw it away",
              "D) To protect our future tomorrow"
            ],
            answer: "D) To protect our future tomorrow"
          }
        ]
      },
      {
        type: "matching",
        title: "Section B: Column Matching (4 Marks)",
        instruction: "Match Column A with Column B according to the text:",
        content: [
          { a: "Drinking water", b: "Keeps human body healthy and hydrated" },
          { a: "Growing crops", b: "In the agricultural fields" },
          { a: "Leaky pipe", b: "Inform adults immediately to fix" },
          { a: "Water tap", b: "Always turn off tightly after use" }
        ]
      },
      {
        type: "fillInTheBlanks",
        title: "Section C: Complete with Words from the Box (4 Marks)",
        instruction: "Fill in each blank with the correct word from the box: [tightly, survive, waste, immediately]",
        content: [
          "a) No creature can ________ without clean water.",
          "b) We must never ________ water unnecessarily.",
          "c) Always turn off the water tap ________.",
          "d) Inform adults ________ to fix leaky pipes."
        ]
      },
      {
        type: "trueFalse",
        title: "Section D: Write True or False (4 Marks)",
        instruction: "Read the statements and write True or False beside each:",
        content: [
          "a) Pure drinking water is unlimited on Earth. -> [ False ]",
          "b) We should turn off the tap while brushing teeth. -> [ True ]",
          "c) Leaky pipes save a lot of water. -> [ False ]",
          "d) Saving water today protects our future tomorrow. -> [ True ]"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section E: Short Answer Questions (4 Marks)",
        instruction: "Write short answers to the following questions in complete sentences:",
        content: [
          "1. Mention two important uses of clean water in our daily life.",
          "   Answer: ________________________________________________________________",
          "2. What should we do when brushing teeth to prevent water wastage?",
          "   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 7: CLASS 3 ENGLISH - ENJOYING A HILL FESTIVAL: BIJU IN BANDARBAN (UNIT 8 LESSON 2)
// =========================================================================
export const HILL_FESTIVAL_SLIDE_DECK: SlideDeck = {
  id: "hill-festival",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 8: Facts, Fables & Festivals",
  lesson: "Lesson 2: Story: Enjoying a Hill Festival — Biju in Bandarban",
  topic: "এনসিটিবি পাঠ্যবই পৃষ্ঠা ১২০-১২৯ (Biju Festival in Bandarban)",
  category: "english",
  thumbnailEmoji: "🏔️ 🌸",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Activity A: Welcome to the Hills of Bandarban!",
      subtitle: "Unit 8: Facts & Festivals | Lesson 2 (Page 120 Activity A - Hill Nature & Culture)",
      phase: "১. প্রেষণা ও পূর্বজ্ঞান যাচাই (Warm-up & Cultural Introduction)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-500 to-teal-500",
      imageEmoji: "🏔️ 🌸 🌿",
      sceneType: "phool",
      hasVisualStage: true,
      content: {
        englishText: [
          "Welcome to the beautiful green hills of Bandarban!",
          "Every year in mid-April, people celebrate the traditional Biju festival to welcome the new year.",
          "Have you ever seen wild flowers floating on the river at dawn?",
          "Let's join Savana and Anika to explore the three joyful days of Biju!"
        ],
        activityTask: "স্ক্রিনের ভিজ্যুয়াল স্টেজে বান্দরবানের সবুজ পাহাড় ও সাংগু নদী শিক্ষার্থীদের দেখিয়ে পাহাড়ি ক্ষুদ্র নৃগোষ্ঠীর ঐতিহ্যবাহী বিজু উৎসব সম্পর্কে প্রাক-পঠন আলোচনা করুন।",
        banglaExplanation: "এনসিটিবি পৃষ্ঠা ১২০ Activity A: বাংলাদেশের পাহাড়ি জেলা বান্দরবানের প্রাকৃতিক সৌন্দর্য এবং ঐতিহ্যবাহী বিজু উৎসব সম্পর্কে প্রাক-পঠন আলোচনা। তিন দিনব্যাপী এই উৎসবের মাধ্যমে পাহাড়ি জনগোষ্ঠী বাংলা নববর্ষকে স্বাগত জানায়।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান তারা বান্দরবান বা কোনো পাহাড়ি এলাকায় গিয়েছে কি না। পাহাড়ি সংস্কৃতির বৈচিত্র্য ও সুন্দর উৎসবগুলো সম্পর্কে কৌতূহল তৈরি করুন।",
      quickTeachingSteps: [
        "ধাপ ১: বাম পাশের ভিজ্যুয়াল স্টেজে বান্দরবানের সবুজ পাহাড় ও সাংগু নদী দেখান।",
        "ধাপ ২: ফুল বিজু, মূল বিজু ও গোজ্যাপোজ্যা—এই ৩টি দিনের নাম পরিচয় করিয়ে দিন।",
        "ধাপ ৩: প্রাক-পঠন আলোচনা শেষে পরবর্তী শব্দভাণ্ডার (Vocabulary) ল্যাবে যান।"
      ]
    },
    {
      id: 2,
      title: "Key Vocabulary Lab & Hill Festival Phonics",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১২১: সিলেবল ভাঙন, অর্থ ও পাহাড়ি উৎসবের পরিভাষা (Vocabulary Lab)",
      phase: "২. শব্দ পরিচিতি ও ধ্বনিবিজ্ঞান (Phonics & Vocabulary)",
      duration: "৮ মিনিট",
      themeColor: "from-teal-500 to-emerald-600",
      imageEmoji: "🔤 🌸 🍲",
      sceneType: "vocabulary",
      content: {
        englishText: [],
        vocabulary: [
          {
            word: "Traditional",
            syllables: ["Tra", "di", "tion", "al"],
            phonetic: "/trəˈdɪʃ.ən.əl/",
            meaning: "ঐতিহ্যবাহী / পরম্পরাগত",
            partOfSpeech: "Adjective",
            example: "Biju is a traditional hill festival of Bandarban.",
            icon: "🏛️"
          },
          {
            word: "Celebrate",
            syllables: ["Cel", "e", "brate"],
            phonetic: "/ˈsel.ə.breɪt/",
            meaning: "উদযাপন করা / পালন করা",
            partOfSpeech: "Verb",
            example: "They celebrate the festival for three joyful days.",
            icon: "🎉"
          },
          {
            word: "Dawn",
            syllables: ["Dawn"],
            phonetic: "/dɔːn/",
            meaning: "ভোরবেলা / প্রত্যুষ",
            partOfSpeech: "Noun",
            example: "Children wake up at dawn to collect wild flowers.",
            icon: "🌅"
          },
          {
            word: "Floating",
            syllables: ["Float", "ing"],
            phonetic: "/ˈfləʊ.tɪŋ/",
            meaning: "ভাসমান / ভাসিয়ে দেওয়া",
            partOfSpeech: "Verb",
            example: "Floating wild flowers in the river brings peace.",
            icon: "🌺"
          },
          {
            word: "Pachan",
            syllables: ["Pa", "chan"],
            phonetic: "/pɑːˈtʃʌn/",
            meaning: "পাঁচন (৩০+ পদের ভেষজ দিয়ে রান্না পাহাড়ি ব্যঞ্জন)",
            partOfSpeech: "Noun",
            example: "Pachan is cooked with more than thirty herbs.",
            icon: "🍲"
          },
          {
            word: "Herbs",
            syllables: ["Herbs"],
            phonetic: "/hɜːbz/",
            meaning: "ভেষজ / শাকসবজি ও ওষধি লতাপাতা",
            partOfSpeech: "Noun",
            example: "Fresh wild herbs make Pachan aromatic and tasty.",
            icon: "🌿"
          },
          {
            word: "Blessings",
            syllables: ["Bless", "ings"],
            phonetic: "/ˈbles.ɪŋz/",
            meaning: "আশীর্বাদ / শুভকামনা",
            partOfSpeech: "Noun",
            example: "Children visit elders for New Year blessings.",
            icon: "🕊️"
          },
          {
            word: "Harmony",
            syllables: ["Har", "mo", "ny"],
            phonetic: "/ˈhɑː.mə.ni/",
            meaning: "সম্প্রীতি / মেলবন্ধন ও সামাজিক ঐক্য",
            partOfSpeech: "Noun",
            example: "The festival fills everyone's heart with harmony.",
            icon: "🤝"
          }
        ]
      },
      teacherNotes: "Traditional (Tra-di-tion-al) ও Harmony (Har-mo-ny) শব্দের সিলেবল ভাঙন হাততালি দিয়ে ড্রিল করান।",
      quickTeachingSteps: [
        "ধাপ ১: শব্দের কার্ডে ক্লিক করে সঠিক ফোনেটিক্স সাউন্ড শিক্ষার্থীদের শোনান।",
        "ধাপ ২: সিলেবল ভাঙন (Tra-di-tion-al, Cel-e-brate, Har-mo-ny) ড্রিল করান।",
        "ধাপ ৩: বাক্যে প্রতিটি শব্দের প্রয়োগ বুঝিয়ে দিয়ে অর্থ পরিষ্কার করুন।"
      ]
    },
    {
      id: 3,
      title: "Main Text: Enjoying the Biju Festival in Bandarban",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১২২: এনসিটিবি অনুমোদিত মূল পাঠ (Authentic Passage - Activity B)",
      phase: "৩. মূল পাঠ উপস্থাপন (Text Presentation)",
      duration: "১০ মিনিট",
      themeColor: "from-amber-500 to-rose-600",
      imageEmoji: "📖 🌸 🍲",
      sceneType: "phool",
      hasVisualStage: true,
      content: {
        englishText: [
          "Savana and her friend Anika live in the beautiful hilly district of Bandarban.",
          "Every year in mid-April, they celebrate the traditional Biju festival to welcome the new year.",
          "The festival lasts for three joyful days.",
          "On the first day, called Phool Biju, children wake up at dawn, collect wild forest flowers and float them in the river with prayers for peace.",
          "The second day is Mul Biju, when delicious traditional mixed vegetable dish called 'Pachan' is prepared with more than thirty herbs.",
          "The third day is Gajjya Pajjya, a peaceful day of rest and visiting elders for blessings.",
          "The hill festival fills everyone's heart with joy, harmony and unity."
        ],
        banglaExplanation: "এনসিটিবি পাঠ্য: সাভানা ও তার বান্ধবী আনিকা বান্দরবানের সুন্দর পাহাড়ি জেলায় বাস করে। প্রতি বছর মধ্য এপ্রিলে তারা নতুন বছরকে স্বাগত জানাতে ঐতিহ্যবাহী বিজু উৎসব উদযাপন করে। এই উৎসব তিন আনন্দময় দিন ধরে চলে। প্রথম দিন ফুল বিজু—ভোরে শিশুরা ঘুম থেকে উঠে বুনো ফুল সংগ্রহ করে এবং শান্তির প্রার্থনায় তা নদীতে ভাসিয়ে দেয়। দ্বিতীয় দিন মূল বিজু—এদিন ত্রিশটিরও বেশি শাকসবজি ও ভেষজ দিয়ে সুস্বাদু ঐতিহ্যবাহী 'পাঁচন' রান্না করা হয়। তৃতীয় দিন গোজ্যাপোজ্যা—একটি শান্তিময় বিশ্রামের দিন এবং বয়োজ্যেষ্ঠদের কাছে গিয়ে আশীর্বাদ নেওয়ার দিন। পাহাড়ি এই উৎসব সবার মনকে আনন্দ, সম্প্রীতি ও ঐক্যে ভরিয়ে তোলে।"
      },
      teacherNotes: "শিক্ষার্থীদের বিজুর তিন দিনের নামের উচ্চারণ (Phool Biju, Mul Biju, Gajjya Pajjya) এবং বাক্যগুলোর সরব পাঠ করান। শব্দ ধরে অডিও কারাওকে চালিয়ে উচ্চারণ স্পষ্ট করুন।",
      quickTeachingSteps: [
        "ধাপ ১: বাম পাশের ভিজ্যুয়াল স্টেজে নদীতে ফুল ভাসানোর অ্যানিমেশন দেখান।",
        "ধাপ ২: বাক্যগুলোর শব্দ ধরে ধরে অডিও কারাওকে চালিয়ে সরব পাঠ করান।",
        "ধাপ ৩: সম্পূর্ণ পাঠ শেষে বিজু উৎসবের তিন দিনের বৈশিষ্ট্য নিয়ে ছোট ছোট প্রশ্ন করুন।"
      ]
    },
    {
      id: 4,
      title: "Pair Dialogue: Savana & Anika",
      subtitle: "সহপাঠীর সাথে জোড়ায় সংলাপ: বিজু উৎসবের তিন দিনের প্রস্তুতি ও অনুভূতি (Activity C Dialogue)",
      phase: "৪. চরিত্র সংলাপ ও দ্বৈত অভিনয় (Roleplay)",
      duration: "৮ মিনিট",
      themeColor: "from-rose-600 to-teal-600",
      imageEmoji: "👧 👧 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice the hill festival dialogue in pairs.",
          "Student A plays Savana and Student B plays Anika:"
        ],
        banglaExplanation: "এনসিটিবি নির্দেশিকা অনুযায়ী শ্রেণিকক্ষে জোড়ায় সংলাপ চর্চা (Pair Work): একজন শিক্ষার্থী সাভানার চরিত্রে এবং অন্যজন আনিকার চরিত্রে অভিনয় করে বিজুর আনন্দ ও আয়োজন নিয়ে কথা বলবে।",
        dialogue: [
          {
            speaker: "Savana",
            team: "Team A (Savana)",
            text: "Subho Biju, Anika! Did you collect the wild forest flowers for Phool Biju?",
            avatar: "👧"
          },
          {
            speaker: "Anika",
            team: "Team B (Anika)",
            text: "Subho Biju, Savana! Yes, look at these bright orchids! Let's float them in the river.",
            avatar: "👧"
          },
          {
            speaker: "Savana",
            team: "Team A (Savana)",
            text: "They look so beautiful floating on the sparkling water! What is your mother cooking for Mul Biju?",
            avatar: "👧"
          },
          {
            speaker: "Anika",
            team: "Team B (Anika)",
            text: "She is preparing aromatic Pachan with bamboo shoots and thirty herbs! You must come over to eat!",
            avatar: "👧"
          },
          {
            speaker: "Savana",
            team: "Team A (Savana)",
            text: "I would love to! And on the third day, Gajjya Pajjya, we will visit Dadu for New Year blessings.",
            avatar: "👧"
          },
          {
            speaker: "Anika",
            team: "Team B (Anika)",
            text: "Yes! Biju brings so much love, harmony and happiness to our whole hill town!",
            avatar: "👧"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের দুই দলে ভাগ করে একজন সাভানা এবং অপরজন আনিকা হয়ে সংলাপটি প্রফুল্ল চিত্তে বলতে বলুন। 'Subho Biju' সম্ভাষণটি ক্লাসে সবাইকে বলতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: সংলাপটি স্পিকারে চালিয়ে শিক্ষার্থীদের শোনান।",
        "ধাপ ২: ছেলে ও মেয়ে শিক্ষার্থীদের দুটি দলে ভাগ করে পালাক্রমে রোলপ্লে করান।",
        "ধাপ ৩: পাহাড়ি সংস্কৃতির মিষ্টি বাক্যগুলো শ্রেণিকক্ষে সবাইকে দিয়ে বলান।"
      ]
    },
    {
      id: 5,
      title: "Interactive 3-Day Hill Festival Celebration Studio",
      subtitle: "নদীতে ফুল ভাসানো, পাঁচন রান্না ও প্রবীণদের আশীর্বাদের ইন্টারঅ্যাক্টিভ ল্যাব (Simulator)",
      phase: "৫. সিমুলেশন ও ব্যবহারিক অনুশীলন (Hands-on Practice)",
      duration: "৮ মিনিট",
      themeColor: "from-teal-500 to-amber-500",
      imageEmoji: "🌺 🍲 🕊️",
      sceneType: "phool",
      hasVisualStage: true,
      content: {
        englishText: [
          "Welcome to the 3-Day Biju Festival Celebration Studio!",
          "Day 1 (Phool Biju): Click to float fresh colorful orchids and marigolds in Sangu river.",
          "Day 2 (Mul Biju): Add bamboo shoots, sweet pumpkin and wild herbs into the steaming Pachan pot.",
          "Day 3 (Gajjya Pajjya): Seek elders' loving blessings for a bright and harmonious new year.",
          "Experience the warmth, unity and cultural richness of Bandarban!"
        ],
        activityTask: "শিক্ষার্থীরা ইন্টারঅ্যাক্টিভ স্টেজে ফুল ভাসাবে, পাঁচন রাঁধবে এবং প্রবীণদের আশীর্বাদ গ্রহণের বোতামে ক্লিক করে তিন দিনের বিজু উৎসবের অভিজ্ঞতা লাভ করবে।",
        banglaExplanation: "ব্যবহারিক অনুশীলন: সিমুলেটরে ৩টি দিনের ভিন্ন ভিন্ন কার্যক্রম নিজে নিজে চালিয়ে শিক্ষার্থীরা বিজু উৎসবের সংস্কৃতি ও সম্প্রীতি প্রত্যক্ষ করবে।"
      },
      teacherNotes: "শিক্ষার্থীদের বোর্ডে ডেকে ফুল ভাসানো ও পাঁচন রান্নার বাটনে ক্লিক করতে বলুন। উৎসবের আনন্দময় আবহ পুরো ক্লাসে ছড়িয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: ফুল বিজু ট্যাবে ক্লিক করে নদীতে রঙিন ফুল ভাসানোর দৃশ্য দেখান।",
        "ধাপ ২: মূল বিজু ট্যাবে উপাদানগুলো দিয়ে পাঁচন রান্নার আনন্দ উদযাপন করুন।",
        "ধাপ ৩: গোজ্যাপোজ্যা ট্যাবে গুরুজনদের আশীর্বাদ বাণীতে ক্লিক করে পাঠ এগিয়ে নিন।"
      ]
    },
    {
      id: 6,
      title: "Sorting Game: Matching the 3 Days of Biju",
      subtitle: "পাঠ্যবই পৃষ্ঠা ১২৬: ফুল বিজু বনাম মূল বিজু উৎসবের কার্যক্রম বাছাই খেলা (Activity D)",
      phase: "৬. দলগত খেলা ও বাছাই অনুশীলন (Sorting Game)",
      duration: "৭ মিনিট",
      themeColor: "from-emerald-500 to-green-600",
      imageEmoji: "🌸 🍲 🕊️",
      sceneType: "activity",
      content: {
        englishText: [
          "Look at the festival activities below.",
          "Sort each activity into 'Phool Biju (ফুল বিজু)' or 'Mul Biju (মূল বিজু)'."
        ],
        sortingGame: {
          instruction: "Drag or click the activities into the correct day box:",
          categories: {
            cat1: { id: "phool_biju", label: "Phool Biju (ফুল বিজু)", icon: "🌸", theme: "rose" },
            cat2: { id: "mul_biju", label: "Mul Biju (মূল বিজু)", icon: "🍲", theme: "amber" }
          },
          items: [
            { id: "b1", label: "Waking up at dawn to collect forest flowers", category: "phool_biju", icon: "🌅" },
            { id: "b2", label: "Cooking delicious Pachan with 30+ herbs", category: "mul_biju", icon: "🍲" },
            { id: "b3", label: "Floating wild flower petals in the river", category: "phool_biju", icon: "🌊" },
            { id: "b4", label: "Inviting friends and relatives for feast", category: "mul_biju", icon: "🍱" },
            { id: "b5", label: "Praying for peace beside the morning stream", category: "phool_biju", icon: "🕊️" },
            { id: "b6", label: "Preparing bamboo shoots and fresh vegetables", category: "mul_biju", icon: "🎋" },
            { id: "b7", label: "Weaving fresh floral garlands at sunrise", category: "phool_biju", icon: "🌺" },
            { id: "b8", label: "Sharing vegetable curry with neighbors", category: "mul_biju", icon: "🥣" }
          ]
        },
        banglaExplanation: "ফুল বিজু বনাম মূল বিজু: কোন কাজগুলো ফুল বিজুর অংশ এবং কোনগুলো মূল বিজুর অংশ তা শিক্ষার্থীরা আলাদা করে সঠিক বাক্সে রাখবে।"
      },
      teacherNotes: "শিক্ষার্থীদের দলগতভাবে যুক্ত করে বিজুর প্রতিটি দিনের তাৎপর্য ক্লাসে আলোচনা করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি কার্ডের লেখা পড়ে বাংলা অর্থ ব্যাখ্যা করুন।",
        "ধাপ ২: শিক্ষার্থীরা হাত তুলে বলবে এটি 'Phool Biju' নাকি 'Mul Biju'।",
        "ধাপ ৩: সঠিক উত্তর ড্রপ করে কনফেটি অ্যানিমেশন দিয়ে উৎসাহিত করুন।"
      ]
    },
    {
      id: 7,
      title: "Language Focus: Time Markers & Descriptive Adjectives",
      subtitle: "সময় নির্দেশক শব্দ (Time Markers) ও বর্ণনামূলক বাক্য গঠন (Grammar Focus)",
      phase: "৭. ব্যাকরণ ও বাক্য গঠন (Grammar & Language Focus)",
      duration: "৭ মিনিট",
      themeColor: "from-indigo-500 to-purple-600",
      imageEmoji: "🎯 📝 ⚡",
      sceneType: "grammar",
      content: {
        englishText: [
          "Prepositions of time and place: in mid-April, at dawn, in the river.",
          "Connecting words: when delicious Pachan is prepared.",
          "Complete the challenge sentences below:"
        ],
        punctuationDrill: {
          instruction: "Choose the correct missing word or punctuation mark to complete each sentence:",
          challenges: [
            {
              id: "c1",
              sentenceBefore: "The Biju festival lasts _______ three joyful days.",
              missingMark: "for",
              meaning: "বিজু উৎসব তিন আনন্দময় দিন ধরে স্থায়ী হয়।",
              options: ["for", "since", "under", "never"]
            },
            {
              id: "c2",
              sentenceBefore: "On the first day, children float flowers _______ the river.",
              missingMark: "in",
              meaning: "প্রথম দিন শিশুরা নদীর পানিতে ফুল ভাসিয়ে দেয়।",
              options: ["in", "on", "over", "behind"]
            },
            {
              id: "c3",
              sentenceBefore: "The second day is Mul Biju, _______ delicious Pachan is prepared.",
              missingMark: "when",
              meaning: "দ্বিতীয় দিন হলো মূল বিজু, যখন সুস্বাদু পাঁচন রান্না করা হয়।",
              options: ["when", "why", "who", "which"]
            },
            {
              id: "c4",
              sentenceBefore: "The hill festival fills everyone's heart with joy, harmony and unity _______",
              missingMark: ".",
              meaning: "পাহাড়ি উৎসব সবার মনকে আনন্দ, সম্প্রীতি ও ঐক্যে ভরিয়ে তোলে (পূর্ণ বাক্যের শেষে ফুলস্টপ)।",
              options: [".", "?", "!", ","]
            }
          ]
        },
        banglaExplanation: "ব্যাকরণ চর্চা: সময়কালের জন্য 'for', নির্দিষ্ট স্থানের জন্য 'in' এবং সময়ের যোগসূত্রের জন্য 'when' ব্যবহারের নিয়ম।"
      },
      teacherNotes: "শিক্ষার্থীদের সময় নির্দেশক শব্দগুলোর প্রয়োগ বোর্ডে লিখে অনুশীলন করান।",
      quickTeachingSteps: [
        "ধাপ ১: for, in, when এর ব্যবহার বোর্ডে বুঝিয়ে দিন।",
        "ধাপ ২: বাক্যের শূন্যস্থানে সঠিক শব্দ বসিয়ে সম্পূর্ণ অর্থ পরিষ্কার করুন।",
        "ধাপ ৩: অপশনে ক্লিক করে শিক্ষার্থীদের তাত্ক্ষণিক ফিডব্যাক দিন।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "শ্রেণিকক্ষ কুইজ এবং অধ্যায়ভিত্তিক ২০ নম্বরের পূর্ণাঙ্গ প্র্যাকটিস শিট (Evaluation)",
      phase: "৮. মূল্যায়ন ও ওয়ার্কশিট (Quiz & Assessment)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-500 to-pink-500",
      imageEmoji: "🏆 📋 ⭐",
      sceneType: "activity",
      content: {
        englishText: [
          "Congratulations! You have completed all 5 Class 3 English interactive slide lessons!",
          "Answer the quiz question and download your 20-mark printable practice worksheet."
        ],
        quiz: {
          question: "What is the traditional mixed vegetable dish cooked on Mul Biju called?",
          options: ["A) Khichuri", "B) Pachan", "C) Payesh", "D) Halwa"],
          answer: "B) Pachan",
          hint: "Pachan is a special traditional curry cooked with more than thirty wild herbs and vegetables!"
        },
        banglaExplanation: "মূল্যায়ন পর্ব: সম্পূর্ণ পাঠের ওপর ভিত্তি করে কুইজের সঠিক উত্তর দেওয়া এবং শ্রেণিকক্ষে বা বাড়ির কাজের জন্য ২০ নম্বরের এনসিটিবি ফরম্যাটের প্রশ্নপত্র ডাউনলোড করা।"
      },
      teacherNotes: "সম্পূর্ণ পাঠ ও পুরো কোর্স সফলভাবে সমাপ্তির জন্য শিক্ষার্থীদের করতালি দিয়ে অভিনন্দন জানান।",
      quickTeachingSteps: [
        "ধাপ ১: কুইজের প্রশ্নটি ক্লাসে সরবে পাঠ করুন।",
        "ধাপ ২: শিক্ষার্থীরা সঠিক অপশনে ক্লিক করে ফলাফল যাচাই করবে।",
        "ধাপ ৩: ২০ নম্বরের ওয়ার্কশিট ডাউনলোডের মাধ্যমে লেসন সমাপ্ত করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Government Primary School, Bangladesh",
    examTitle: "Class 3 English Assessment — Unit 8, Lesson 2: Enjoying a Hill Festival (Biju)",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today",
    time: "20 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Choose the best answer (4 Marks)",
        instruction: "Read the questions and tick (✓) the correct answer:",
        content: [
          {
            q: "1. In which district do Savana and Anika live?",
            options: ["A) Dhaka", "B) Bandarban", "C) Sylhet", "D) Khulna"],
            answer: "B) Bandarban"
          },
          {
            q: "2. How long does the Biju festival last?",
            options: ["A) One day", "B) Two days", "C) Three joyful days", "D) One month"],
            answer: "C) Three joyful days"
          },
          {
            q: "3. What do children float in the river on Phool Biju?",
            options: ["A) Wild forest flowers", "B) Paper boats", "C) Candles", "D) Fruit baskets"],
            answer: "A) Wild forest flowers"
          },
          {
            q: "4. What is 'Pachan' in the Biju festival?",
            options: [
              "A) A folk song",
              "B) A traditional dance",
              "C) A bamboo whistle",
              "D) A mixed vegetable dish with 30+ herbs"
            ],
            answer: "D) A mixed vegetable dish with 30+ herbs"
          }
        ]
      },
      {
        type: "matching",
        title: "Section B: Column Matching (4 Marks)",
        instruction: "Match Column A with Column B according to the passage:",
        content: [
          { a: "Phool Biju", b: "Floating wild flowers in the river" },
          { a: "Mul Biju", b: "Cooking delicious Pachan with 30+ herbs" },
          { a: "Gajjya Pajjya", b: "A peaceful day of rest and visiting elders" },
          { a: "Bandarban", b: "A beautiful green hilly district" }
        ]
      },
      {
        type: "fillInTheBlanks",
        title: "Section C: Complete with Words from the Box (4 Marks)",
        instruction: "Fill in each blank with the correct word from the box: [celebrate, dawn, herbs, harmony]",
        content: [
          "a) People in Bandarban ________ the Biju festival in mid-April.",
          "b) Children wake up at ________ to pick fresh wild flowers.",
          "c) Pachan is prepared with more than thirty ________.",
          "d) The festival fills everyone's heart with joy and ________."
        ]
      },
      {
        type: "trueFalse",
        title: "Section D: Write True or False (4 Marks)",
        instruction: "Read the statements and write True or False beside each:",
        content: [
          "a) Biju is celebrated in the winter season of December. -> [ False ]",
          "b) Children float flowers in the river for peace. -> [ True ]",
          "c) The Biju festival lasts for only one hour. -> [ False ]",
          "d) Gajjya Pajjya is a peaceful day of rest and blessings. -> [ True ]"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section E: Short Answer Questions (4 Marks)",
        instruction: "Write short answers to the following questions in complete sentences:",
        content: [
          "1. What do children do early in the morning on Phool Biju?",
          "   Answer: ________________________________________________________________",
          "2. What special food is prepared on Mul Biju, and what are its ingredients?",
          "   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 8: CLASS 3 ENGLISH - MY FAMILY: SABIHA'S FAMILY (UNIT 2 LESSON 3)
// =========================================================================
export const SABIHA_FAMILY_SLIDE_DECK: SlideDeck = {
  id: "sabiha-family",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 2: My Friends, Family and Numbers",
  lesson: "Lesson 3: My Family — Sabiha's Family",
  topic: "এনসিটিবি পাঠ্যবই পৃষ্ঠা ২৫-২৭ (Sabiha's Family)",
  category: "english",
  thumbnailEmoji: "👨‍👩‍👧‍👦 🏡",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Activity A: Talking about Our Family",
      subtitle: "Unit 2: My Friends & Family | Lesson 3 (Page 25 Activity A - Family Members)",
      phase: "১. প্রেষণা ও পূর্বজ্ঞান যাচাই (Warm-up & Discussion)",
      duration: "৫ মিনিট",
      themeColor: "from-amber-500 to-rose-500",
      imageEmoji: "👨‍👩‍👧‍👦 🏡 💖",
      sceneType: "family_home",
      hasVisualStage: true,
      content: {
        englishText: [
          "How many members are there in your family?",
          "Who lives with you in your cozy home?",
          "Today, let's meet Sabiha and her loving family in a peaceful village.",
          "Family gives us love, care, support and happiness every day!"
        ],
        activityTask: "স্ক্রিনের ভিজ্যুয়াল স্টেজে সাবিহার পরিবারের ৪ সদস্য শিক্ষার্থীদের দেখিয়ে নিজেদের পরিবার ও সদস্যদের ভূমিকা নিয়ে ক্লাসে আলোচনা করুন।",
        banglaExplanation: "এনসিটিবি পৃষ্ঠা ২৫ Activity A: পরিবারের সদস্য ও আত্মীয়দের নিয়ে শ্রেণিকক্ষে মুক্ত আলোচনা। নিজের পরিবারে কে কে আছেন এবং তাদের সাথে সম্পর্কের গুরুত্ব প্রকাশ।"
      },
      teacherNotes: "শিক্ষার্থীদের পরিবারের সদস্য সংখ্যা জানতে চান এবং বাবা-মা ভাই-বোনের ইংরেজি নাম বলতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: বাম পাশের ভিজ্যুয়াল স্টেজে সাবিহার পরিবারের ৪ সদস্য শিক্ষার্থীদের দেখান।",
        "ধাপ ২: পিতা, মাতা, বোন ও ভাইয়ের ইংরেজি নাম ড্রিল করান।",
        "ধাপ ৩: প্রাক-পঠন আলোচনা শেষে পরবর্তী শব্দভাণ্ডার (Vocabulary) ল্যাবে যান।"
      ]
    },
    {
      id: 2,
      title: "Key Vocabulary Lab & Family Relationships",
      subtitle: "পাঠ্যবই পৃষ্ঠা ২৬: সিলেবল ভাঙন, অর্থ ও পারিবারিক সম্পর্কের শব্দভাণ্ডার (Vocabulary Lab)",
      phase: "২. শব্দ পরিচিতি ও ধ্বনিবিজ্ঞান (Phonics & Vocabulary)",
      duration: "৮ মিনিট",
      themeColor: "from-rose-500 to-amber-600",
      imageEmoji: "🔤 👨‍👩‍👦 📖",
      sceneType: "vocabulary",
      content: {
        englishText: [],
        vocabulary: [
          {
            word: "Member",
            syllables: ["Mem", "ber"],
            phonetic: "/ˈmem.bər/",
            meaning: "সদস্য / পরিবারের ব্যক্তি",
            partOfSpeech: "Noun",
            example: "There are four members in her family.",
            icon: "👥"
          },
          {
            word: "Primary",
            syllables: ["Pri", "ma", "ry"],
            phonetic: "/ˈpraɪ.mer.i/",
            meaning: "প্রাথমিক পর্যায়",
            partOfSpeech: "Noun/Adjective",
            example: "Her father is a primary school teacher.",
            icon: "🏫"
          },
          {
            word: "Homemaker",
            syllables: ["Home", "mak", "er"],
            phonetic: "/ˈhəʊmˌmeɪ.kər/",
            meaning: "গৃহিণী (যিনি সংসারের যত্ন নেন)",
            partOfSpeech: "Noun",
            example: "Her mother is a caring homemaker.",
            icon: "👩‍🍳"
          },
          {
            word: "Younger",
            syllables: ["Young", "er"],
            phonetic: "/ˈjʌŋ.ɡər/",
            meaning: "বয়সে ছোট / কনিষ্ঠ",
            partOfSpeech: "Adjective",
            example: "Sabiha has a younger brother named Alvi.",
            icon: "👶"
          },
          {
            word: "Peaceful",
            syllables: ["Peace", "ful"],
            phonetic: "/ˈpiːs.fəl/",
            meaning: "শান্তিময় / প্রশান্তিময়",
            partOfSpeech: "Adjective",
            example: "They live in a peaceful village.",
            icon: "🌿"
          },
          {
            word: "Dearly",
            syllables: ["Dear", "ly"],
            phonetic: "/ˈdɪə.li/",
            meaning: "গভীরভাবে / পরম স্নেহে",
            partOfSpeech: "Adverb",
            example: "They love each other dearly.",
            icon: "❤️"
          },
          {
            word: "Village",
            syllables: ["Vil", "lage"],
            phonetic: "/ˈvɪl.ɪdʒ/",
            meaning: "গ্রাম / পল্লী এলাকা",
            partOfSpeech: "Noun",
            example: "Their village is green and quiet.",
            icon: "🏡"
          },
          {
            word: "Teacher",
            syllables: ["Teach", "er"],
            phonetic: "/ˈtiː.tʃər/",
            meaning: "শিক্ষক / শিক্ষাগুরু",
            partOfSpeech: "Noun",
            example: "Mr. Aminul Islam is a respected teacher.",
            icon: "👨‍🏫"
          }
        ]
      },
      teacherNotes: "Homemaker (Home-mak-er), Peaceful (Peace-ful), এবং Dearly (Dear-ly) শব্দের সিলেবল ভাঙন হাততালি দিয়ে ড্রিল করান।",
      quickTeachingSteps: [
        "ধাপ ১: শব্দের কার্ডে ক্লিক করে সঠিক ফোনেটিক্স সাউন্ড শিক্ষার্থীদের শোনান।",
        "ধাপ ২: সিলেবল ভাঙন (Mem-ber, Home-mak-er, Peace-ful) ড্রিল করান।",
        "ধাপ ৩: বাক্যে প্রতিটি শব্দের প্রয়োগ বুঝিয়ে দিয়ে অর্থ পরিষ্কার করুন।"
      ]
    },
    {
      id: 3,
      title: "Main Reading: Sabiha's Family",
      subtitle: "পাঠ্যবই পৃষ্ঠা ২৬: এনসিটিবি অনুমোদিত মূল পাঠ (Authentic Passage - Activity B)",
      phase: "৩. মূল পাঠ উপস্থাপন (Text Presentation)",
      duration: "১০ মিনিট",
      themeColor: "from-amber-500 to-rose-600",
      imageEmoji: "📖 🏡 👨‍👩‍👧‍👦",
      sceneType: "family_home",
      hasVisualStage: true,
      content: {
        englishText: [
          "Sabiha is eight years old.",
          "She is a student of Class 3.",
          "There are four members in her family.",
          "Her father, Mr. Aminul Islam, is a primary school teacher.",
          "Her mother, Mrs. Fatema Begum, is a caring homemaker.",
          "Sabiha has a younger brother named Alvi.",
          "Alvi is only three years old.",
          "They live in a peaceful village and love each other dearly."
        ],
        banglaExplanation: "এনসিটিবি পাঠ্য: সাবিহার বয়স আট বছর। সে তৃতীয় শ্রেণির একজন ছাত্রী। তার পরিবারে চারজন সদস্য আছেন। তার বাবা জনাব আমিনুল ইসলাম একজন প্রাথমিক বিদ্যালয়ের শিক্ষক। তার মা মিসেস ফাতেমা বেগম একজন যত্নশীল গৃহিণী। সাবিহার আলভী নামে একটি ছোট ভাই আছে। আলভীর বয়স মাত্র তিন বছর। তারা একটি শান্তিময় গ্রামে বাস করে এবং একে অপরকে অত্যন্ত ভালোবাসে।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রতিটি বাক্যের সরব পাঠ করান। 'primary school teacher', 'caring homemaker', এবং 'live in a peaceful village' বাক্যাংশগুলোর সুন্দর অর্থ পরিষ্কার করুন।",
      quickTeachingSteps: [
        "ধাপ ১: বাম পাশের ভিজ্যুয়াল স্টেজে সাবিহার পরিবারের সদস্যদের ওপর ক্লিক করে পরিচয় করান।",
        "ধাপ ২: বাক্যগুলোর শব্দ ধরে ধরে অডিও কারাওকে চালিয়ে সরব পাঠ করান।",
        "ধাপ ৩: পাঠ শেষে সাবিহার পরিবারের সদস্য ও তাদের বয়স সম্পর্কে ছোট ছোট প্রশ্ন করুন।"
      ]
    },
    {
      id: 4,
      title: "Pair Dialogue: Introducing Family",
      subtitle: "সহপাঠীর সাথে জোড়ায় সংলাপ: নিজের পরিবার পরিচয় করিয়ে দেওয়া (Activity C Dialogue)",
      phase: "৪. চরিত্র সংলাপ ও দ্বৈত অভিনয় (Roleplay)",
      duration: "৮ মিনিট",
      themeColor: "from-rose-600 to-teal-600",
      imageEmoji: "👧 👧 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice the family dialogue in pairs.",
          "Student A plays Friend and Student B plays Sabiha:"
        ],
        banglaExplanation: "এনসিটিবি নির্দেশিকা অনুযায়ী শ্রেণিকক্ষে জোড়ায় সংলাপ চর্চা (Pair Work): একজন শিক্ষার্থী প্রশ্নকর্তা বান্ধবী হিসেবে এবং অন্যজন সাবিহার চরিত্রে অভিনয় করে পরিবারের পরিচয় দেবে।",
        dialogue: [
          {
            speaker: "Friend",
            team: "Team A (Friend)",
            text: "Hello Sabiha! How many people are there in your family?",
            avatar: "👧"
          },
          {
            speaker: "Sabiha",
            team: "Team B (Sabiha)",
            text: "Hello! There are four members in my family.",
            avatar: "👧"
          },
          {
            speaker: "Friend",
            team: "Team A (Friend)",
            text: "What does your father do, Sabiha?",
            avatar: "👧"
          },
          {
            speaker: "Sabiha",
            team: "Team B (Sabiha)",
            text: "My father is a primary school teacher. He loves teaching children!",
            avatar: "👧"
          },
          {
            speaker: "Friend",
            team: "Team A (Friend)",
            text: "And what does your mother do?",
            avatar: "👧"
          },
          {
            speaker: "Sabiha",
            team: "Team B (Sabiha)",
            text: "My mother is a homemaker. She takes loving care of all of us.",
            avatar: "👧"
          },
          {
            speaker: "Friend",
            team: "Team A (Friend)",
            text: "Do you have any brothers or sisters?",
            avatar: "👧"
          },
          {
            speaker: "Sabiha",
            team: "Team B (Sabiha)",
            text: "Yes, I have a younger brother named Alvi. He is three years old!",
            avatar: "👧"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের দুই দলে ভাগ করে একজন বান্ধবী এবং অপরজন সাবিহা হয়ে সংলাপটি বলতে বলুন। নিজের পরিবারের তথ্য বসিয়ে সংলাপটি পুনরাবৃত্তি করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: সংলাপটি স্পিকারে চালিয়ে শিক্ষার্থীদের শোনান।",
        "ধাপ ২: জোড়ায় শিক্ষার্থীদের দাঁড় করিয়ে ডায়লগ অভিনয় করান।",
        "ধাপ ৩: 'What does your father do?' প্রশ্নটি ক্লাসে সবাইকে জিজ্ঞাসা করান।"
      ]
    },
    {
      id: 5,
      title: "Interactive Family Tree Studio",
      subtitle: "সাবিহার ফ্যামিলি ট্রি, সদস্যের সম্পর্ক ও পারিবারিক পরিচয় সিমুলেটর (Simulator)",
      phase: "৫. সিমুলেশন ও ব্যবহারিক অনুশীলন (Hands-on Practice)",
      duration: "৮ মিনিট",
      themeColor: "from-emerald-500 to-teal-500",
      imageEmoji: "🌳 👨‍👩‍👧‍👦 ⭐",
      sceneType: "family_tree",
      hasVisualStage: true,
      content: {
        englishText: [
          "Welcome to the Interactive Family Tree Studio!",
          "Click on each family member to see their relationship and role:",
          "Father: Mr. Aminul Islam (Primary School Teacher)",
          "Mother: Mrs. Fatema Begum (Caring Homemaker)",
          "Sister: Sabiha (8 years old, Class 3 student)",
          "Brother: Alvi (3 years old, playful toddler)",
          "Click 'ভালোবাসা ❤️' to celebrate family unity and happiness!"
        ],
        activityTask: "শিক্ষার্থীরা ইন্টারঅ্যাক্টিভ ফ্যামিলি ট্রিতে সদস্যদের ছবির ওপর ক্লিক করে পরিবারের গঠন ও প্রজন্মের সম্পর্ক বুঝবে।",
        banglaExplanation: "ব্যবহারিক অনুশীলন: ফ্যামিলি ট্রির মাধ্যমে বাবা-মা এবং ভাই-বোনের সম্পর্ক স্পষ্টভাবে উপলব্ধি করা এবং প্রতিটি সদস্যের দায়িত্ব জানা।"
      },
      teacherNotes: "শিক্ষার্থীদের দিয়ে নিজেদের পরিবারের একটি ছোট ফ্যামিলি ট্রি খাতায় আঁকতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: ফ্যামিলি ট্রির প্রথম প্রজন্ম (Parents) ও দ্বিতীয় প্রজন্ম (Children) দেখান।",
        "ধাপ ২: প্রতিটি সদস্যের কার্ডে ক্লিক করে ভয়েস ইন্ট্রো শোনান।",
        "ধাপ ৩: 'ভালোবাসা ❤️' বাটনে ক্লিক করে কনফেটি অ্যানিমেশন উপভোগ করুন।"
      ]
    },
    {
      id: 6,
      title: "Sorting Game: Professions & Family Roles",
      subtitle: "পেশা (Professions) বনাম পারিবারিক সম্পর্ক (Family Roles) বাছাই খেলা (Activity D)",
      phase: "৬. দলগত খেলা ও বাছাই অনুশীলন (Sorting Game)",
      duration: "৭ মিনিট",
      themeColor: "from-emerald-500 to-green-600",
      imageEmoji: "💼 🆚 🏡",
      sceneType: "activity",
      content: {
        englishText: [
          "Look at the words below.",
          "Sort each card into 'Professions (পেশা)' or 'Family Roles (পারিবারিক সম্পর্ক)'."
        ],
        sortingGame: {
          instruction: "Drag or click the words into the correct category box:",
          categories: {
            cat1: { id: "professions", label: "Professions (পেশা ও কর্মক্ষেত্র)", icon: "💼", theme: "emerald" },
            cat2: { id: "family_roles", label: "Family Roles (পারিবারিক সম্পর্ক)", icon: "💖", theme: "amber" }
          },
          items: [
            { id: "f1", label: "Primary School Teacher", category: "professions", icon: "👨‍🏫" },
            { id: "f2", label: "Loving Father", category: "family_roles", icon: "👨" },
            { id: "f3", label: "Caring Mother", category: "family_roles", icon: "👩" },
            { id: "f4", label: "Banker", category: "professions", icon: "👩‍💼" },
            { id: "f5", label: "Younger Brother", category: "family_roles", icon: "👶" },
            { id: "f6", label: "Doctor", category: "professions", icon: "👩‍⚕️" },
            { id: "f7", label: "Elder Sister", category: "family_roles", icon: "👧" },
            { id: "f8", label: "Farmer", category: "professions", icon: "🌾" }
          ]
        },
        banglaExplanation: "পেশা বনাম পারিবারিক ভূমিকা: কোন শব্দটি পেশা প্রকাশ করে এবং কোন শব্দটি পরিবারের সম্পর্ক প্রকাশ করে তা শিক্ষার্থীরা বাছাই করবে।"
      },
      teacherNotes: "শিক্ষার্থীদের শব্দগুলোর পার্থক্য বুঝিয়ে দিয়ে দলগতভাবে খেলায় অংশ নিতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি কার্ডের লেখা পড়ে বাংলা অর্থ ব্যাখ্যা করুন।",
        "ধাপ ২: শিক্ষার্থীরা হাত তুলে বলবে এটি 'Profession' নাকি 'Family Role'।",
        "ধাপ ৩: সঠিক উত্তর ড্রপ করে কনফেটি অ্যানিমেশন দিয়ে উৎসাহিত করুন।"
      ]
    },
    {
      id: 7,
      title: "Language Focus: Possessives & Be-Verbs (Her, is, are, has)",
      subtitle: "অধিকারসূচক সর্বনাম (Possessives) ও Be-Verbs এর সঠিক ব্যবহার (Grammar Focus)",
      phase: "৭. ব্যাকরণ ও বাক্য গঠন (Grammar & Language Focus)",
      duration: "৭ মিনিট",
      themeColor: "from-indigo-500 to-purple-600",
      imageEmoji: "🎯 📝 ⚡",
      sceneType: "grammar",
      content: {
        englishText: [
          "Possessive words: her father, her mother, her family.",
          "Be-verbs: There are four members (plural), Her father is a teacher (singular).",
          "Complete the challenge sentences below:"
        ],
        punctuationDrill: {
          instruction: "Choose the correct missing word or punctuation mark to complete each sentence:",
          challenges: [
            {
              id: "c1",
              sentenceBefore: "There _______ four members in her family.",
              missingMark: "are",
              meaning: "তার পরিবারে চারজন সদস্য আছেন (বহুবচনে are)।",
              options: ["are", "is", "am", "was"]
            },
            {
              id: "c2",
              sentenceBefore: "Her father _______ a primary school teacher.",
              missingMark: "is",
              meaning: "তার বাবা একজন প্রাথমিক বিদ্যালয়ের শিক্ষক (একবচনে is)।",
              options: ["is", "are", "am", "were"]
            },
            {
              id: "c3",
              sentenceBefore: "Sabiha _______ a younger brother named Alvi.",
              missingMark: "has",
              meaning: "সাবিহার আলভী নামে একটি ছোট ভাই আছে (has)।",
              options: ["has", "have", "had", "are"]
            },
            {
              id: "c4",
              sentenceBefore: "They live in a peaceful village and love each other dearly _______",
              missingMark: ".",
              meaning: "তারা একটি শান্তিময় গ্রামে বাস করে এবং একে অপরকে ভালোবাসে (পূর্ণ বাক্যের শেষে ফুলস্টপ)।",
              options: [".", "?", "!", ","]
            }
          ]
        },
        banglaExplanation: "ব্যাকরণ চর্চা: একবচনে 'is' এবং বহুবচনে 'are' ব্যবহার করা হয়। কোনো কিছু নিজের বা অন্যের অধিকারে থাকলে 'has' (একবচন) বা 'have' (বহুবচন/I) বসে।"
      },
      teacherNotes: "is, are, has এর পার্থক্য বোর্ডে উদাহরণ দিয়ে শিক্ষার্থীদের স্পষ্ট করুন।",
      quickTeachingSteps: [
        "ধাপ ১: একবচন ও বহুবচনে Be-verb ব্যবহারের নিয়ম বোর্ডে দেখান।",
        "ধাপ ২: শূন্যস্থানে সঠিক শব্দ বসিয়ে সম্পূর্ণ বাক্যটি সমস্বরে পড়ান।",
        "ধাপ ৩: অপশনে ক্লিক করে শিক্ষার্থীদের তাত্ক্ষণিক ফিডব্যাক দিন।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "শ্রেণিকক্ষ কুইজ এবং অধ্যায়ভিত্তিক ২০ নম্বরের পূর্ণাঙ্গ প্র্যাকটিস শিট (Evaluation)",
      phase: "৮. মূল্যায়ন ও ওয়ার্কশিট (Quiz & Assessment)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-500 to-pink-500",
      imageEmoji: "🏆 📋 ⭐",
      sceneType: "activity",
      content: {
        englishText: [
          "Well done! You have completed the lesson on Sabiha's Family.",
          "Answer the quiz question and download your 20-mark printable practice worksheet."
        ],
        quiz: {
          question: "How many members are there in Sabiha's family?",
          options: ["A) Three", "B) Four", "C) Five", "D) Six"],
          answer: "B) Four",
          hint: "Father, Mother, Sabiha, and little brother Alvi make four members!"
        },
        banglaExplanation: "মূল্যায়ন পর্ব: সম্পূর্ণ পাঠের ওপর ভিত্তি করে কুইজের সঠিক উত্তর দেওয়া এবং শ্রেণিকক্ষে বা বাড়ির কাজের জন্য ২০ নম্বরের এনসিটিবি ফরম্যাটের প্রশ্নপত্র ডাউনলোড করা।"
      },
      teacherNotes: "শিক্ষার্থীদের কুইজে অংশগ্রহণে উৎসাহিত করুন। সঠিক উত্তরের পর 'Download Printable Worksheet' বাটনে ক্লিক করে অফলাইন প্রশ্নপত্র সংগ্রহ করার পরামর্শ দিন।",
      quickTeachingSteps: [
        "ধাপ ১: কুইজের প্রশ্নটি ক্লাসে সরবে পাঠ করুন।",
        "ধাপ ২: শিক্ষার্থীরা সঠিক অপশনে ক্লিক করে ফলাফল যাচাই করবে।",
        "ধাপ ৩: ২০ নম্বরের ওয়ার্কশিট ডাউনলোডের মাধ্যমে পাঠ সমাপ্ত করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Government Primary School, Bangladesh",
    examTitle: "Class 3 English Assessment — Unit 2, Lesson 3: My Family (Sabiha's Family)",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today",
    time: "20 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Choose the best answer (4 Marks)",
        instruction: "Read the questions and tick (✓) the correct answer:",
        content: [
          {
            q: "1. How old is Sabiha?",
            options: ["A) Six years old", "B) Seven years old", "C) Eight years old", "D) Nine years old"],
            answer: "C) Eight years old"
          },
          {
            q: "2. What does Sabiha's father do?",
            options: [
              "A) Primary school teacher",
              "B) Banker",
              "C) Doctor",
              "D) Pilot"
            ],
            answer: "A) Primary school teacher"
          },
          {
            q: "3. What is Sabiha's mother's profession?",
            options: [
              "A) Teacher",
              "B) Caring homemaker",
              "C) Nurse",
              "D) Police officer"
            ],
            answer: "B) Caring homemaker"
          },
          {
            q: "4. How old is Sabiha's younger brother Alvi?",
            options: ["A) One year old", "B) Two years old", "C) Three years old", "D) Four years old"],
            answer: "C) Three years old"
          }
        ]
      },
      {
        type: "matching",
        title: "Section B: Column Matching (4 Marks)",
        instruction: "Match Column A with Column B according to the passage:",
        content: [
          { a: "Sabiha", b: "Class 3 student, 8 years old" },
          { a: "Mr. Aminul Islam", b: "Primary school teacher" },
          { a: "Mrs. Fatema Begum", b: "Caring homemaker" },
          { a: "Alvi", b: "Younger brother, 3 years old" }
        ]
      },
      {
        type: "fillInTheBlanks",
        title: "Section C: Complete with Words from the Box (4 Marks)",
        instruction: "Fill in each blank with the correct word from the box: [is, are, has, live]",
        content: [
          "a) There ________ four members in Sabiha's family.",
          "b) Her father ________ a teacher.",
          "c) Sabiha ________ a younger brother.",
          "d) They ________ in a peaceful village."
        ]
      },
      {
        type: "trueFalse",
        title: "Section D: Write True or False (4 Marks)",
        instruction: "Read the statements and write True or False beside each:",
        content: [
          "a) Sabiha is in Class 5. -> [ False ]",
          "b) Sabiha's mother is a doctor. -> [ False ]",
          "c) Alvi is three years old. -> [ True ]",
          "d) Sabiha's family lives in a peaceful village. -> [ True ]"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section E: Short Answer Questions (4 Marks)",
        instruction: "Write short answers to the following questions in complete sentences:",
        content: [
          "1. Who are the four members of Sabiha's family?",
          "   Answer: ________________________________________________________________",
          "2. Write two sentences about your own family.",
          "   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 9: Unit 5, Lesson 4 — Oyshi's City Life (Rooftop Garden & Mobile Library)
// =========================================================================
export const OYSHI_CITY_SLIDE_DECK: SlideDeck = {
  id: "oyshi-city-life",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 5: Their Days",
  lesson: "Lesson 4: Oyshi's city life - Rooftop garden & Mobile library",
  topic: "ঐশীর শহরের জীবন, ছাদবাগান ও ভ্রাম্যমাণ লাইব্রেরি (pp. 76–80)",
  category: "english",
  thumbnailEmoji: "🪴 🏢 🚌",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Oyshi's World in Dhaka City",
      subtitle: "ঢাকা শহরের ষষ্ঠ তলার ফ্ল্যাট, ছাদবাগান ও ভ্রাম্যমাণ লাইব্রেরির গল্প (Warm-up & Orientation)",
      phase: "১. প্রাক-পাঠ ও ভূমিকা (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-emerald-500 to-teal-600",
      imageEmoji: "🏢 🪴 📚",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello, curious learners! Welcome to Class 3 English.",
          "Today we will visit Oyshi in Dhaka city.",
          "She lives in a 6th-floor apartment with no open fields nearby.",
          "How does she grow fresh vegetables and borrow wonderful books?",
          "Let's explore her rooftop garden and colourful mobile library!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা ঢাকা শহরের ষষ্ঠ তলার ফ্ল্যাটে বসবাসকারী ঐশীর সাথে পরিচিত হব। বাড়ির পাশে বড় খেলার মাঠ না থাকলেও ঐশী কীভাবে ছাদে সুন্দর বাগান করেছে এবং ভ্রাম্যমাণ লাইব্রেরি থেকে বই ধার নেয়, তা আমরা শিখব।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তোমাদের কারো কি ছাদবাগান আছে? শহরে খেলার মাঠ না থাকলে গাছ লাগানো বা বই পড়া কীভাবে আমাদের আনন্দ দেয়?",
      quickTeachingSteps: [
        "ধাপ ১: শহরের বহুতল ভবন ও ছাদবাগানের ছবি দেখিয়ে আগ্রহ তৈরি করুন।",
        "ধাপ ২: ফ্ল্যাটে থেকেও কীভাবে প্রকৃতির সাথে থাকা যায় তা আলোচনা করুন।",
        "ধাপ ৩: মোবাইল লাইব্রেরি বা ভ্রাম্যমাণ গাড়িতে বই পড়ার অভিজ্ঞতা জানতে চান।"
      ]
    },
    {
      id: 2,
      title: "Vocabulary Workshop: City & Nature Words",
      subtitle: "নতুন শব্দভাণ্ডার: অর্থ, উচ্চারণ ও বাক্যে প্রয়োগ (Key Vocabulary)",
      phase: "২. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-teal-500 to-cyan-600",
      imageEmoji: "🌱 📖 🚌",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Listen, repeat and learn the key words with correct pronunciation:"
        ],
        banglaExplanation: "পাঠটি ভালোভাবে বোঝার জন্য নিচের গুরুত্বপূর্ণ শব্দগুলোর উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Apartment",
            syllables: ["A", "part", "ment"],
            phonetic: "/əˈpɑːt.mənt/",
            meaning: "ফ্ল্যাট / বহুতল ভবনের বাসস্থান",
            partOfSpeech: "Noun",
            example: "Oyshi lives in a sixth-floor apartment.",
            icon: "🏢"
          },
          {
            word: "Rooftop",
            syllables: ["Roof", "top"],
            phonetic: "/ˈruːf.tɒp/",
            meaning: "ভবনের ছাদ",
            partOfSpeech: "Noun",
            example: "She has a green garden on the rooftop.",
            icon: "🪴"
          },
          {
            word: "Coriander",
            syllables: ["Co", "ri", "an", "der"],
            phonetic: "/ˌkɒr.iˈæn.dər/",
            meaning: "ধনেপাতা / সুগন্ধি মশলা পাতা",
            partOfSpeech: "Noun",
            example: "Her father grows fresh coriander in pots.",
            icon: "🌿"
          },
          {
            word: "Marigold",
            syllables: ["Mar", "i", "gold"],
            phonetic: "/ˈmær.ɪ.ɡəʊld/",
            meaning: "গাঁদা ফুল",
            partOfSpeech: "Noun",
            example: "Bright marigold flowers bloom on the roof.",
            icon: "🌼"
          },
          {
            word: "Borrow",
            syllables: ["Bor", "row"],
            phonetic: "/ˈbɒr.əʊ/",
            meaning: "ধার নেওয়া / ব্যবহারের জন্য নেওয়া",
            partOfSpeech: "Verb",
            example: "Oyshi borrows fairy tales from the library.",
            icon: "📚"
          },
          {
            word: "Illustrated",
            syllables: ["Il", "lus", "tra", "ted"],
            phonetic: "/ˈɪl.ə.streɪ.tɪd/",
            meaning: "চিত্রসমৃদ্ধ / ছবিতে সাজানো",
            partOfSpeech: "Adjective",
            example: "Children love illustrated storybooks.",
            icon: "🎨"
          },
          {
            word: "Lively",
            syllables: ["Live", "ly"],
            phonetic: "/ˈlaɪv.li/",
            meaning: "প্রাণবন্ত / আনন্দমুখর",
            partOfSpeech: "Adjective",
            example: "Oyshi enjoys her lively city life.",
            icon: "✨"
          },
          {
            word: "Mobile",
            syllables: ["Mo", "bile"],
            phonetic: "/ˈməʊ.baɪl/",
            meaning: "ভ্রাম্যমাণ / যা ঘুরে ঘুরে সেবা দেয়",
            partOfSpeech: "Adjective",
            example: "A mobile library visits every Friday.",
            icon: "🚌"
          }
        ]
      },
      teacherNotes: "Coriander (Co-ri-an-der) ও Illustrated (Il-lus-tra-ted) শব্দের সিলেবল ভাঙন শিক্ষার্থীদের হাততালি দিয়ে প্র্যাকটিস করান।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি কার্ডে ক্লিক করে সঠিক অডিও প্রোনাউন্সিয়েশন শোনান।",
        "ধাপ ২: শিক্ষার্থীদের সমস্বরে সিলেবল ভাগ করে উচ্চারণ করতে বলুন।",
        "ধাপ ৩: শব্দের অর্থ ও বাস্তব জীবনের উদাহরণ পরিষ্কার করুন।"
      ]
    },
    {
      id: 3,
      title: "Main Reading: Oyshi's City Life",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৭৬: এনসিটিবি অনুমোদিত মূল পাঠ (Authentic Passage - Activity A)",
      phase: "৩. মূল পাঠ উপস্থাপন (Text Presentation)",
      duration: "১০ মিনিট",
      themeColor: "from-blue-600 to-indigo-600",
      imageEmoji: "📖 🏙️ 🪴",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Oyshi lives with her parents in a sixth-floor apartment in Dhaka city.",
          "Although there are no big open fields near her home, Oyshi has a wonderful rooftop garden.",
          "She and her father grow red tomatoes, green chilies, coriander and marigold flowers in clay pots.",
          "Every Friday afternoon, a colourful mobile library bus arrives near their apartment building.",
          "Oyshi eagerly runs to the bus to return her old book and borrow new illustrated fairy tales and science books.",
          "Oyshi enjoys her lively city life very much."
        ],
        banglaExplanation: "এনসিটিবি পাঠ্য: ঐশী ঢাকা শহরের একটি বহুতল ভবনের ষষ্ঠ তলার ফ্ল্যাটে তার বাবা-মায়ের সাথে থাকে। যদিও তার বাড়ির কাছে কোনো বড় খোলা মাঠ নেই, তবুও ঐশীর একটি চমৎকার ছাদবাগান আছে। সে এবং তার বাবা মাটির টবে লাল টমেটো, কাঁচামরিচ, ধনেপাতা এবং গাঁদা ফুল চাষ করে। প্রতি শুক্রবার বিকেলে তাদের ভবনের কাছে একটি রঙিন ভ্রাম্যমাণ লাইব্রেরির বাস আসে। ঐশী আগ্রহ নিয়ে বাসে ছুটে যায় পুরনো বই ফেরত দিতে এবং নতুন ছবি আঁকা রূপকথা ও বিজ্ঞানের বই ধার নিতে। ঐশী তার এই প্রাণবন্ত শহরের জীবন খুবই উপভোগ করে।"
      },
      teacherNotes: "শিক্ষার্থীদের বাক্য ধরে ধরে সরব পাঠ করান। 'Although', 'clay pots', এবং 'mobile library bus' বাক্যাংশগুলোর অর্থ বোর্ডে লিখে বুঝিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: বাম পাশের ভিজ্যুয়াল স্টেজে ছাদবাগান ও ভ্রাম্যমাণ বাস প্রদর্শন করুন।",
        "ধাপ ২: প্রতিটি বাক্যে ক্লিক করে অডিও কারাওকে সাথে সাথে সরব পাঠ করান।",
        "ধাপ ৩: মূল পাঠের ওপর ভিত্তি করে ছোট ছোট বোধগম্যতা প্রশ্ন করুন।"
      ]
    },
    {
      id: 4,
      title: "Pair Dialogue: Talking About Rooftop & Books",
      subtitle: "সহপাঠীর সাথে জোড়ায় সংলাপ: শহরের শখ ও লাইব্রেরি (Activity B Dialogue)",
      phase: "৪. চরিত্র সংলাপ ও দ্বৈত অভিনয় (Roleplay)",
      duration: "৮ মিনিট",
      themeColor: "from-violet-600 to-purple-600",
      imageEmoji: "👧 👧 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice the dialogue in pairs.",
          "Student A plays Friend and Student B plays Oyshi:"
        ],
        banglaExplanation: "এনসিটিবি নির্দেশিকা অনুযায়ী জোড়ায় সংলাপ অনুশীলন: একজন বান্ধবী ও অপরজন ঐশীর চরিত্রে অভিনয় করে ছাদবাগান ও লাইব্রেরি সম্পর্কে কথোপকথন করবে।",
        dialogue: [
          {
            speaker: "Friend",
            team: "Team A (Friend)",
            text: "Hello Oyshi! Do you miss having a playground near your apartment?",
            avatar: "👧"
          },
          {
            speaker: "Oyshi",
            team: "Team B (Oyshi)",
            text: "Not really! I have a wonderful rooftop garden where I grow vegetables and flowers with my father.",
            avatar: "👧"
          },
          {
            speaker: "Friend",
            team: "Team A (Friend)",
            text: "What do you grow in your clay pots?",
            avatar: "👧"
          },
          {
            speaker: "Oyshi",
            team: "Team B (Oyshi)",
            text: "We grow juicy red tomatoes, spicy green chilies, coriander and yellow marigolds!",
            avatar: "👧"
          },
          {
            speaker: "Friend",
            team: "Team A (Friend)",
            text: "That sounds delicious! Where do you get your storybooks?",
            avatar: "👧"
          },
          {
            speaker: "Oyshi",
            team: "Team B (Oyshi)",
            text: "Every Friday afternoon, a mobile library bus comes! I return old books and borrow fairy tales and science books.",
            avatar: "👧"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের দুই দলে ভাগ করে একজন বান্ধবী এবং একজন ঐশী হয়ে সংলাপটি বলতে বলুন। সংলাপের সময় শারীরিক অঙ্গভঙ্গি ও বাচনভঙ্গিতে জোর দিন।",
      quickTeachingSteps: [
        "ধাপ ১: সংলাপের অডিও প্লে করে সঠিক স্বরাঘাত প্রদর্শন করুন।",
        "ধাপ ২: ক্লাসের শিক্ষার্থীদের জোড়ায় দাঁড় করিয়ে রোলপ্লে করান।",
        "ধাপ ৩: ছাদবাগান ও বই ধার করা নিয়ে নিজের ভাষায় ২ বাক্য বলতে বলুন।"
      ]
    },
    {
      id: 5,
      title: "Interactive Rooftop Garden Studio",
      subtitle: "ঐশীর ছাদবাগান সিমুলেটর: টবে জল দেওয়া ও ফসল তোলা (Simulator)",
      phase: "৫. সিমুলেশন ও ব্যবহারিক অনুশীলন (Hands-on Practice)",
      duration: "৮ মিনিট",
      themeColor: "from-emerald-500 to-green-600",
      imageEmoji: "🪴 🍅 🌼",
      sceneType: "garden_studio",
      hasVisualStage: true,
      content: {
        englishText: [
          "Step onto Oyshi's rooftop in Dhaka city!",
          "Click the watering can to water all 4 clay pots.",
          "Harvest ripe red tomatoes, green chilies, coriander and marigold flowers.",
          "Watch how urban gardening brings nature into the city!"
        ],
        banglaExplanation: "ব্যবহারিক সিমুলেটর: ঢাকা শহরের ছাদে মাটির টবে গাছপালার পরিচর্যা করুন। ওয়াটারিং ক্যান দিয়ে গাছে পানি দিন এবং পাকা টমেটো, কাঁচামরিচ, ধনেপাতা ও গাঁদা ফুল সংগ্রহ করুন।"
      },
      teacherNotes: "শিক্ষার্থীদের মাটির টবে গাছ লাগানোর প্রয়োজনীয়তা এবং কীভাবে পানি ও রোদের প্রয়োজন হয় তা ভিজ্যুয়াল স্টেজের মাধ্যমে প্রত্যক্ষ করান।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে 'Water Rooftop Garden' বাটনে ক্লিক করতে বলুন।",
        "ধাপ ২: প্রতিটি মাটির পাত্রে ক্লিক করে ফসল তোলা ও তাজা ফুল পর্যবেক্ষণ করান।",
        "ধাপ ৩: চার ধরনের গাছের নাম ইংরেজিতে সমস্বরে উচ্চারণ করান।"
      ]
    },
    {
      id: 6,
      title: "Mobile Library Bus Explorer",
      subtitle: "ভ্রাম্যমাণ লাইব্রেরি বাস: রূপকথা ও বিজ্ঞানের বই ধার নেওয়া (Interactive Library)",
      phase: "৬. দলগত মিথস্ক্রিয়া ও অনুসন্ধান (Library Activity)",
      duration: "৮ মিনিট",
      themeColor: "from-amber-500 to-orange-600",
      imageEmoji: "🚌 📚 🧚",
      sceneType: "library_bus",
      hasVisualStage: true,
      content: {
        englishText: [
          "Honk honk! The colourful mobile library bus has arrived!",
          "Every Friday afternoon, children gather to borrow exciting books.",
          "Choose between Illustrated Fairy Tales, Science Books, or Wild Animals.",
          "Return the old book and receive your new reading card!"
        ],
        banglaExplanation: "ভ্রাম্যমাণ লাইব্রেরি অনুসন্ধান: প্রতি শুক্রবার বিকেলে শিশুদের জন্য জ্ঞানের ভাণ্ডার নিয়ে আসে রঙিন লাইব্রেরি বাস। পুরনো বই ফেরত দিয়ে নতুন রূপকথা বা বিজ্ঞানের বই বেছে নিন।"
      },
      teacherNotes: "ভ্রাম্যমাণ লাইব্রেরি কীভাবে বই পড়ার সুযোগ বাড়ায় এবং শুক্রবারের সঠিক ব্যবহার নিশ্চিত করে তা শিক্ষার্থীদের বুঝিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: লাইব্রেরি বাসের বুক-শেলফে বিভিন্ন বইয়ের উপর ক্লিক করুন।",
        "ধাপ ২: বই ধার নেওয়া (Borrow) ও ফেরত দেওয়ার (Return) নিয়ম শিখান।",
        "ধাপ ৩: বইগুলোর টাইটেল ও ছবি দেখে গল্প অনুমান করতে বলুন।"
      ]
    },
    {
      id: 7,
      title: "Grammar & Connectors Workshop: 'Although' & Adverbs",
      subtitle: "বাক্য গঠন ও যোজক পদের ব্যবহার (Language Practice & Connectors)",
      phase: "৭. ব্যাকরণ ও বাক্য অনুশীলন (Language Practice)",
      duration: "৬ মিনিট",
      themeColor: "from-blue-600 to-cyan-600",
      imageEmoji: "✏️ 🧩 📝",
      sceneType: "grammar",
      content: {
        englishText: [
          "Master sentence connectors and adverbials:",
          "1. 'Although' (যদিও) joins two contrasting ideas.",
          "2. 'Every Friday afternoon' tells us about a regular weekly routine.",
          "3. 'Eagerly' (আগ্রহ নিয়ে) describes how Oyshi runs to the bus."
        ],
        punctuationDrill: {
          instruction: "Complete the sentences with correct connectors and words:",
          challenges: [
            {
              id: "c1",
              sentenceBefore: "_______ there is no open field, Oyshi has a rooftop garden.",
              missingMark: "Although",
              meaning: "যদিও কোনো খোলা মাঠ নেই, ঐশীর একটি ছাদবাগান আছে।",
              options: ["Although", "Because", "So", "And"]
            },
            {
              id: "c2",
              sentenceBefore: "The mobile library bus arrives _______ afternoon.",
              missingMark: "every Friday",
              meaning: "ভ্রাম্যমাণ লাইব্রেরি বাসটি প্রতি শুক্রবার বিকেলে আসে।",
              options: ["every Friday", "yesterday", "every morning", "at night"]
            },
            {
              id: "c3",
              sentenceBefore: "Oyshi runs _______ to borrow illustrated fairy tales.",
              missingMark: "eagerly",
              meaning: "ঐশী আগ্রহ ও উৎসাহের সাথে ছুটে যায় (eagerly)।",
              options: ["eagerly", "sadly", "slowly", "angrily"]
            },
            {
              id: "c4",
              sentenceBefore: "She and her father grow chilies and marigolds in clay _______.",
              missingMark: "pots",
              meaning: "তারা মাটির টবে (clay pots) মরিচ ও গাঁদা ফুল চাষ করে।",
              options: ["pots", "bags", "boxes", "cups"]
            }
          ]
        },
        banglaExplanation: "ব্যাকরণ চর্চা: দুটি বিপরীতমুখী ধারণাকে যুক্ত করতে 'Although' (যদিও) ব্যবহৃত হয়। কোনো কাজ কীভাবে সম্পন্ন হয় তা প্রকাশ করতে Adverb (যেমন: eagerly) বসে।"
      },
      teacherNotes: "Although এবং Eagerly এর ব্যবহার দিয়ে শিক্ষার্থীদের নিজেদের জীবন থেকে ছোট ছোট বাক্য রচনা করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: Although দিয়ে বিপরীত ভাব প্রকাশের নিয়ম বোর্ডে লিখুন।",
        "ধাপ ২: প্রতিটি শূন্যস্থানের জন্য সঠিক অপশন ক্লিক করে যাচাই করান।",
        "ধাপ ৩: পুরো বাক্যটি অর্থসহ শিক্ষার্থীদের সমস্বরে উচ্চারণ করতে বলুন।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "শ্রেণিকক্ষ কুইজ এবং অধ্যায়ভিত্তিক ২০ নম্বরের পূর্ণাঙ্গ প্র্যাকটিস শিট (Evaluation)",
      phase: "৮. মূল্যায়ন ও ওয়ার্কশিট (Quiz & Assessment)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-500 to-pink-500",
      imageEmoji: "🏆 📋 ⭐",
      sceneType: "activity",
      content: {
        englishText: [
          "Fantastic job! You have explored Oyshi's city life, rooftop garden, and mobile library.",
          "Answer the quiz question and download your 20-mark printable practice worksheet."
        ],
        quiz: {
          question: "When does the mobile library bus arrive near Oyshi's building?",
          options: ["A) Every Monday morning", "B) Every Wednesday evening", "C) Every Friday afternoon", "D) Only on Sundays"],
          answer: "C) Every Friday afternoon",
          hint: "The bus comes on the weekend holiday: Friday afternoon!"
        },
        banglaExplanation: "মূল্যায়ন পর্ব: সম্পূর্ণ পাঠের ওপর ভিত্তি করে কুইজের সঠিক উত্তর দেওয়া এবং শ্রেণিকক্ষে বা বাড়ির কাজের জন্য ২০ নম্বরের এনসিটিবি ফরম্যাটের প্রশ্নপত্র ডাউনলোড করা।"
      },
      teacherNotes: "শিক্ষার্থীদের কুইজে অংশগ্রহণে উৎসাহিত করুন। সঠিক উত্তরের পর 'Download Printable Worksheet' বাটনে ক্লিক করে অফলাইন প্রশ্নপত্র সংগ্রহ করার পরামর্শ দিন।",
      quickTeachingSteps: [
        "ধাপ ১: কুইজের প্রশ্নটি ক্লাসে সরবে পাঠ করুন।",
        "ধাপ ২: শিক্ষার্থীরা সঠিক অপশনে ক্লিক করে ফলাফল যাচাই করবে।",
        "ধাপ ৩: ২০ নম্বরের ওয়ার্কশিট ডাউনলোডের মাধ্যমে পাঠ সমাপ্ত করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Government Primary School, Bangladesh",
    examTitle: "Class 3 English Assessment — Unit 5, Lesson 4: Oyshi's City Life",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today",
    time: "20 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Choose the best answer (4 Marks)",
        instruction: "Read the questions and tick (✓) the correct answer:",
        content: [
          {
            q: "1. Where does Oyshi live?",
            options: ["A) In a village", "B) In Dhaka city", "C) In Rajshahi", "D) In Khulna"],
            answer: "B) In Dhaka city"
          },
          {
            q: "2. Which floor of the apartment building does Oyshi live on?",
            options: ["A) Second floor", "B) Fourth floor", "C) Sixth floor", "D) Tenth floor"],
            answer: "C) Sixth floor"
          },
          {
            q: "3. What flowers bloom in Oyshi's rooftop garden?",
            options: ["A) Rose", "B) Marigold", "C) Sunflower", "D) Lotus"],
            answer: "B) Marigold"
          },
          {
            q: "4. What kind of books does Oyshi borrow from the mobile library?",
            options: ["A) Newspapers", "B) Dictionaries", "C) Illustrated fairy tales and science books", "D) Cookbooks"],
            answer: "C) Illustrated fairy tales and science books"
          }
        ]
      },
      {
        type: "matching",
        title: "Section B: Column Matching (4 Marks)",
        instruction: "Match Column A with Column B according to the passage:",
        content: [
          { a: "Sixth-floor apartment", b: "Oyshi's residence in Dhaka" },
          { a: "Clay pots", b: "Tomatoes, chilies and coriander" },
          { a: "Mobile library bus", b: "Arrives every Friday afternoon" },
          { a: "Fairy tales & science books", b: "Borrowed by eager Oyshi" }
        ]
      },
      {
        type: "fillInTheBlanks",
        title: "Section C: Complete with Words from the Box (4 Marks)",
        instruction: "Fill in each blank with the correct word from the box: [apartment, rooftop, clay, Friday]",
        content: [
          "a) Oyshi lives in a sixth-floor ________ in Dhaka city.",
          "b) She has a wonderful ________ garden.",
          "c) She grows tomatoes and chilies in ________ pots.",
          "d) The mobile library arrives every ________ afternoon."
        ]
      },
      {
        type: "trueFalse",
        title: "Section D: Write True or False (4 Marks)",
        instruction: "Read the statements and write True or False beside each:",
        content: [
          "a) There are big open fields right beside Oyshi's home. -> [ False ]",
          "b) Oyshi and her father grow marigold flowers in clay pots. -> [ True ]",
          "c) The mobile library bus arrives every Monday morning. -> [ False ]",
          "d) Oyshi enjoys her lively city life very much. -> [ True ]"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section E: Short Answer Questions (4 Marks)",
        instruction: "Write short answers to the following questions in complete sentences:",
        content: [
          "1. What plants and flowers grow in Oyshi's rooftop garden?",
          "   Answer: ________________________________________________________________",
          "2. Why does Oyshi run to the mobile library bus every Friday?",
          "   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 10: Unit 5, Lesson 1 — Joyful School Time: Porshi in Kushtia
// =========================================================================
export const PORSHI_SCHOOL_SLIDE_DECK: SlideDeck = {
  id: "porshi-school",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 5: Their Days",
  lesson: "Lesson 1: Joyful school time 1 - Porshi in Kushtia",
  topic: "পড়শীর আনন্দময় বিদ্যালয় ও কুষ্টিয়া (pp. 65–67)",
  category: "english",
  thumbnailEmoji: "🏫 🇧🇩 🌸",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Porshi's Joyful School in Kushtia",
      subtitle: "কুষ্টিয়ার জয়পুর সরকারি প্রাথমিক বিদ্যালয় ও প্রাত্যহিক সমাবেশের গল্প (Warm-up & Orientation)",
      phase: "১. প্রাক-পাঠ ও ভূমিকা (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-emerald-500 to-teal-600",
      imageEmoji: "🏫 🎒 👧",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello, wonderful students! Welcome to Class 3 English.",
          "Today we will meet eight-year-old Porshi from Kushtia district.",
          "She studies at Joypur Government Primary School.",
          "Her school days are packed with assembly, national anthem, poems and flower gardening!",
          "Let's join Porshi and discover how school brings joy and learning every single day."
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা কুষ্টিয়া জেলার জয়পুর সরকারি প্রাথমিক বিদ্যালয়ের আট বছর বয়সী ছাত্রী পড়শীর সাথে পরিচিত হব। প্রতিদিনের সমাবেশ, জাতীয় সঙ্গীত, শারীরিক কসরত, দলগত ধাঁধা সমাধান এবং ফুলের বাগান করার মধ্য দিয়ে কীভাবে বিদ্যালয় এক আনন্দময় শেখার স্থানে পরিণত হয়, তা আমরা জানব।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: সকালে বিদ্যালয়ে এসে তোমাদের প্রথম কী কাজ করতে ভালো লাগে? জাতীয় সঙ্গীতের সময় কীভাবে দাঁড়াতে হয়?",
      quickTeachingSteps: [
        "ধাপ ১: বিদ্যালয়ের ছবি ও পতাকা উত্তোলনের দৃশ্য দেখিয়ে মনোযোগ আকর্ষণ করুন।",
        "ধাপ ২: প্রতিদিনের রুটিন এবং সমাবেশের গুরুত্ব নিয়ে আলোচনা করুন।",
        "ধাপ ৩: কুষ্টিয়া জেলার নাম ও পড়শীর পরিচয় তুলে ধরুন।"
      ]
    },
    {
      id: 2,
      title: "Vocabulary Workshop: School & Joy Words",
      subtitle: "নতুন শব্দভাণ্ডার: অর্থ, উচ্চারণ ও বাক্যে প্রয়োগ (Key Vocabulary)",
      phase: "২. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-teal-500 to-cyan-600",
      imageEmoji: "📚 🔤 💡",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Listen, repeat and learn the key vocabulary words with accurate pronunciation:"
        ],
        banglaExplanation: "পাঠটি ভালোভাবে আয়ত্ত করার জন্য নিচের গুরুত্বপূর্ণ শব্দগুলোর উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Assembly",
            syllables: ["As", "sem", "bly"],
            phonetic: "/əˈsem.bli/",
            meaning: "প্রাত্যহিক সমাবেশ / জমায়েত",
            partOfSpeech: "Noun",
            example: "The school begins with the morning assembly.",
            icon: "🚩"
          },
          {
            word: "Anthem",
            syllables: ["An", "them"],
            phonetic: "/ˈæn.θəm/",
            meaning: "জাতীয় সঙ্গীত / বিশেষ গান",
            partOfSpeech: "Noun",
            example: "Students proudly sing the national anthem.",
            icon: "🎶"
          },
          {
            word: "Exercise",
            syllables: ["Ex", "er", "cise"],
            phonetic: "/ˈek.sə.saɪz/",
            meaning: "শারীরিক কসরত / ব্যায়াম",
            partOfSpeech: "Noun",
            example: "Physical exercises keep our bodies healthy.",
            icon: "🏃"
          },
          {
            word: "Friendly",
            syllables: ["Friend", "ly"],
            phonetic: "/ˈfrend.li/",
            meaning: "বন্ধুত্বপূর্ণ / আন্তরিক",
            partOfSpeech: "Adjective",
            example: "They work together in small friendly groups.",
            icon: "🤝"
          },
          {
            word: "Divide",
            syllables: ["Di", "vide"],
            phonetic: "/dɪˈvaɪd/",
            meaning: "ভাগ করা / বিভক্ত করা",
            partOfSpeech: "Verb",
            example: "The teacher divides the class into teams.",
            icon: "👥"
          },
          {
            word: "Puzzle",
            syllables: ["Puz", "zle"],
            phonetic: "/ˈpʌz.əl/",
            meaning: "ধাঁধা / বুদ্ধিদীপ্ত সমস্যা",
            partOfSpeech: "Noun",
            example: "Children enjoy solving word puzzles.",
            icon: "🧩"
          },
          {
            word: "Garden",
            syllables: ["Gar", "den"],
            phonetic: "/ˈɡɑː.dən/",
            meaning: "বাগান / পুষ্পোদ্যান",
            partOfSpeech: "Noun",
            example: "There is a flower garden in front of the school.",
            icon: "🌸"
          },
          {
            word: "Joy",
            syllables: ["Joy"],
            phonetic: "/dʒɔɪ/",
            meaning: "আনন্দ / পরম উল্লাস",
            partOfSpeech: "Noun",
            example: "School is a place of great joy and learning.",
            icon: "✨"
          }
        ]
      },
      teacherNotes: "Assembly (As-sem-bly) এবং Exercise (Ex-er-cise) শব্দের সিলেবল বিভাজন হাততালি দিয়ে প্র্যাকটিস করান।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি শব্দ কার্ডে ক্লিক করে সঠিক অডিও ড্রিল করান।",
        "ধাপ ২: সিলেবল ভাঙন অনুযায়ী হাততালি দিয়ে শিক্ষার্থীদের একসাথে উচ্চারণ করান।",
        "ধাপ ৩: বাক্যে প্রতিটি শব্দের প্রয়োগ ও ব্যবহারিক উদাহরণ দিন।"
      ]
    },
    {
      id: 3,
      title: "Main Reading: Porshi's Joyful School Time",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৬৫: এনসিটিবি অনুমোদিত মূল পাঠ (Authentic Passage - Activity A)",
      phase: "৩. মূল পাঠ উপস্থাপন (Text Presentation)",
      duration: "১০ মিনিট",
      themeColor: "from-blue-600 to-indigo-600",
      imageEmoji: "📖 🏫 👧",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Porshi is eight years old and reads in Class 3 at Joypur Government Primary School in Kushtia.",
          "She loves going to school every day.",
          "The school day begins with the morning assembly, national anthem and physical exercises.",
          "In the classroom, teacher divides students into small friendly groups to solve puzzles and read poems.",
          "During the break, Porshi and her friends water the flower garden in front of their school building.",
          "School is a place of great joy and learning for Porshi."
        ],
        banglaExplanation: "এনসিটিবি পাঠ্য: পড়শীর বয়স আট বছর এবং সে কুষ্টিয়ার জয়পুর সরকারি প্রাথমিক বিদ্যালয়ে তৃতীয় শ্রেণিতে পড়ে। সে প্রতিদিন স্কুলে যেতে খুব ভালোবাসে। সকালের সমাবেশ, জাতীয় সঙ্গীত এবং শারীরিক ব্যায়ামের মাধ্যমে স্কুলের কার্যক্রম শুরু হয়। শ্রেণিকক্ষে শিক্ষক শিক্ষার্থীদের ছোট ছোট বন্ধুত্বপূর্ণ দলে ভাগ করে দেন যাতে তারা ধাঁধা সমাধান করতে পারে এবং কবিতা আবৃত্তি করতে পারে। ছুটির বিরতির সময় পড়শী এবং তার বন্ধুরা তাদের বিদ্যালয় ভবনের সামনের ফুলের বাগানে পানি দেয়। পড়শীর কাছে বিদ্যালয় হলো পরম আনন্দ ও শিক্ষার এক সুন্দর স্থান।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রতিটি বাক্য আঙুল দিয়ে ধরে ধরে সরব পাঠ করান। 'morning assembly', 'friendly groups', এবং 'place of great joy' বাক্যগুলোর ওপর বিশেষ জোর দিন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে বিদ্যালয় প্রাঙ্গণ ও সমাবেশ প্রদর্শন করুন।",
        "ধাপ ২: অডিও কারাওকে চালু করে প্রতি বাক্যের সাথে সাথে সরব পাঠ করান।",
        "ধাপ ৩: পাঠ শেষে কে, কোথায়, কীভাবে পড়ে তা নিয়ে ছোট ছোট প্রশ্ন করুন।"
      ]
    },
    {
      id: 4,
      title: "Pair Dialogue: Talking About School Life",
      subtitle: "সহপাঠীর সাথে জোড়ায় সংলাপ: স্কুলের প্রিয় কাজসমূহ (Activity B Dialogue)",
      phase: "৪. চরিত্র সংলাপ ও দ্বৈত অভিনয় (Roleplay)",
      duration: "৮ মিনিট",
      themeColor: "from-violet-600 to-purple-600",
      imageEmoji: "👧 👦 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice the school dialogue in pairs.",
          "Student A plays Classmate and Student B plays Porshi:"
        ],
        banglaExplanation: "এনসিটিবি পাঠ্যক্রম অনুযায়ী জোড়ায় সংলাপ অনুশীলন: একজন সহপাঠী ও অন্যজন পড়শীর ভূমিকায় অভিনয় করে বিদ্যালয়ের বিভিন্ন কার্যক্রম সম্পর্কে আলোচনা করবে।",
        dialogue: [
          {
            speaker: "Classmate",
            team: "Team A (Classmate)",
            text: "Good morning Porshi! Which school do you go to in Kushtia?",
            avatar: "👦"
          },
          {
            speaker: "Porshi",
            team: "Team B (Porshi)",
            text: "Good morning! I go to Joypur Government Primary School. I love it very much!",
            avatar: "👧"
          },
          {
            speaker: "Classmate",
            team: "Team A (Classmate)",
            text: "How does your school day begin every morning?",
            avatar: "👦"
          },
          {
            speaker: "Porshi",
            team: "Team B (Porshi)",
            text: "It begins with morning assembly, singing our national anthem and physical exercises!",
            avatar: "👧"
          },
          {
            speaker: "Classmate",
            team: "Team A (Classmate)",
            text: "What do you do during the tiffin break?",
            avatar: "👦"
          },
          {
            speaker: "Porshi",
            team: "Team B (Porshi)",
            text: "My friends and I water the beautiful flower garden right in front of our building!",
            avatar: "👧"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের ক্লাসের সামনে জোড়ায় জোড়ায় ডেকে এই সংলাপটি অভিনয় করতে বলুন। সঠিক বাচনভঙ্গি ও চোখের সংযোগ বজায় রাখতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: সংলাপের অডিও চালিয়ে স্পষ্ট উচ্চারণ ও স্বরাঘাত শোনান।",
        "ধাপ ২: ক্লাসের শিক্ষার্থীদের দুই দলে ভাগ করে সংলাপের ডায়লগ প্র্যাকটিস করান।",
        "ধাপ ৩: নিজের বিদ্যালয়ের নাম ও পছন্দের কাজ যুক্ত করে ডায়লগ বলতে বলুন।"
      ]
    },
    {
      id: 5,
      title: "Morning Assembly & Flag Salute Simulator",
      subtitle: "প্রাত্যহিক সমাবেশ সিমুলেটর: জাতীয় পতাকাকে সম্মান ও শারীরিক কসরত (Simulator)",
      phase: "৫. সিমুলেশন ও ব্যবহারিক অনুশীলন (Hands-on Practice)",
      duration: "৮ মিনিট",
      themeColor: "from-emerald-500 to-green-600",
      imageEmoji: "🚩 🇧🇩 ☀️",
      sceneType: "assembly_simulator",
      hasVisualStage: true,
      content: {
        englishText: [
          "Step into the school playground with Porshi!",
          "Stand straight in orderly lines for the morning assembly.",
          "Sing 'Amar Shonar Bangla' with pride and respect.",
          "Perform healthy morning physical exercises to stay fit and energetic!"
        ],
        banglaExplanation: "ব্যবহারিক সিমুলেটর: জয়পুর সরকারি প্রাথমিক বিদ্যালয়ের সমাবেশ প্রাঙ্গণে শিক্ষার্থীদের সাথে সুশৃঙ্খল লাইনে দাঁড়ান, জাতীয় সঙ্গীত গান এবং পিটি শারীরিক কসরত সম্পন্ন করুন।"
      },
      teacherNotes: "জাতীয় পতাকার প্রতি সম্মান প্রদর্শন এবং প্রাত্যহিক পিটি ও শারীরিক কসরতের শারীরিক উপকারিতা বুঝিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে 'Start Morning Assembly' বাটনে ক্লিক করুন।",
        "ধাপ ২: শিক্ষার্থীদের ক্লাসরুমেই সোজা হয়ে দাঁড়ানোর কায়দা (Attention & Stand at ease) দেখান।",
        "ধাপ ৩: পতাকার রঙ ও প্রতীক নিয়ে প্রশ্ন করুন।"
      ]
    },
    {
      id: 6,
      title: "Interactive Rhyme Puzzles & Garden Care",
      subtitle: "ছন্দ মেলানো ধাঁধা খেলা এবং বিদ্যালয়ের পুষ্পোদ্যান পরিচর্যা (Classroom & Garden)",
      phase: "৬. দলগত মিথস্ক্রিয়া ও অনুসন্ধান (Interactive Practice)",
      duration: "৮ মিনিট",
      themeColor: "from-amber-500 to-orange-600",
      imageEmoji: "🧩 🌸 💧",
      sceneType: "rhyme_garden",
      hasVisualStage: true,
      content: {
        englishText: [
          "Work in small friendly teams just like Porshi's class!",
          "Match the rhyming words: School-Cool, Play-Day, Learn-Turn, Sun-Fun.",
          "Head out to the front courtyard and water the roses, marigolds and sunflowers.",
          "Ring the school bell for the joyful break!"
        ],
        banglaExplanation: "দলগত মিথস্ক্রিয়া: শ্রেণিকক্ষে বন্ধুদের সাথে ছন্দ মেলানো শব্দ ধাঁধা সমাধান করুন এবং টিফিনের অবসরে বিদ্যালয়ের সামনের গোলাপ, গাঁদা ও সূর্যমুখী ফুলের গাছে পানি দিয়ে প্রফুল্ল থাকুন।"
      },
      teacherNotes: "শিক্ষার্থীদের পরিবেশ সচেতনতা এবং গাছপালার প্রতি মমত্ববোধ জাগ্রত করতে ফুলের বাগান পরিচর্যার গুরুত্ব তুলে ধরুন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজের 'Puzzles' ট্যাবে গিয়ে ছন্দ মেলানোর খেলাটি করান।",
        "ধাপ ২: 'Garden' ট্যাবে গিয়ে গাছে পানি দেওয়ার অ্যানিমেশন পর্যবেক্ষণ করান।",
        "ধাপ ৩: বিদ্যালয়ের ঘণ্টা বাজিয়ে ছুটির আনন্দের ধ্বনি উপভোগ করান।"
      ]
    },
    {
      id: 7,
      title: "Grammar & Routine Verbs Workshop: Present Simple",
      subtitle: "নিত্যদিনের কাজের ক্রিয়াপদ ও একবচন নিয়ম (Present Simple & Routine Actions)",
      phase: "৭. ব্যাকরণ ও বাক্য অনুশীলন (Language Practice)",
      duration: "৬ মিনিট",
      themeColor: "from-blue-600 to-cyan-600",
      imageEmoji: "✏️ 🧩 📝",
      sceneType: "grammar",
      content: {
        englishText: [
          "Master Present Simple verbs for daily routines:",
          "1. When the subject is third-person singular (Porshi / She / He), add '-s' or '-es' to the verb.",
          "Examples: reads, begins, loves, divides, waters.",
          "2. When the subject is plural (They / Friends), use the base verb: water, sing."
        ],
        punctuationDrill: {
          instruction: "Complete each sentence with the correct form of the verb:",
          challenges: [
            {
              id: "c1",
              sentenceBefore: "Porshi _______ in Class 3 at Joypur Primary School.",
              missingMark: "reads",
              meaning: "পড়শী তৃতীয় শ্রেণিতে পড়ে (third-person singular subject requires 'reads')।",
              options: ["reads", "read", "reading", "is read"]
            },
            {
              id: "c2",
              sentenceBefore: "The school day _______ with the morning assembly.",
              missingMark: "begins",
              meaning: "বিদ্যালয়ের কার্যক্রম শুরু হয় (The school day একবচন, তাই 'begins')।",
              options: ["begins", "begin", "beginning", "began"]
            },
            {
              id: "c3",
              sentenceBefore: "Teacher _______ students into small friendly groups.",
              missingMark: "divides",
              meaning: "শিক্ষক শিক্ষার্থীদের দলে ভাগ করেন (Teacher একবচন, তাই 'divides')।",
              options: ["divides", "divide", "dividing", "divided"]
            },
            {
              id: "c4",
              sentenceBefore: "During the break, Porshi and her friends _______ the flowers.",
              missingMark: "water",
              meaning: "পড়শী ও তার বন্ধুরা (বহুবচন কর্তা) ফুলে পানি দেয়, তাই মূল রূপ 'water' বসবে।",
              options: ["water", "waters", "watering", "watered"]
            }
          ]
        },
        banglaExplanation: "ব্যাকরণ চর্চা: নিত্যদিনের কাজ প্রকাশ করতে Present Simple Tense ব্যবহৃত হয়। সাবজেক্ট তৃতীয় পুরুষ একবচন (He/She/Porshi) হলে ক্রিয়াপদের সাথে s/es যুক্ত হয়; কিন্তু বহুবচন হলে মূল ভার্ব বসে।"
      },
      teacherNotes: "বোর্ডে reads বনাম read, এবং waters বনাম water এর পার্থক্য স্পষ্ট করে দেখিয়ে শিক্ষার্থীদের ড্রিল করান।",
      quickTeachingSteps: [
        "ধাপ ১: Present Simple-এর s/es যুক্ত করার নিয়ম বোর্ডে লিখে দিন।",
        "ধাপ ২: প্রতিটি চ্যালেঞ্জিং প্রশ্নের জন্য সঠিক অপশনটি শিক্ষার্থীদের বেছে নিতে বলুন।",
        "ধাপ ৩: বাক্যগুলো উচ্চৈঃস্বরে রিডিং পড়িয়ে রুল পাকা করুন।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "শ্রেণিকক্ষ কুইজ এবং অধ্যায়ভিত্তিক ২০ নম্বরের পূর্ণাঙ্গ প্র্যাকটিস শিট (Evaluation)",
      phase: "৮. মূল্যায়ন ও ওয়ার্কশিট (Quiz & Assessment)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-500 to-pink-500",
      imageEmoji: "🏆 📋 ⭐",
      sceneType: "activity",
      content: {
        englishText: [
          "Splendid effort! You have learned all about Porshi's joyful school time in Kushtia.",
          "Answer the evaluation question and download your 20-mark printable practice worksheet."
        ],
        quiz: {
          question: "How does the school day begin at Joypur Government Primary School?",
          options: [
            "A) With a football match",
            "B) With morning assembly, national anthem and physical exercises",
            "C) With eating tiffin snacks",
            "D) With drawing pictures"
          ],
          answer: "B) With morning assembly, national anthem and physical exercises",
          hint: "The morning starts with the flag salute, singing anthem and physical exercises!"
        },
        banglaExplanation: "মূল্যায়ন পর্ব: সম্পূর্ণ পাঠের ওপর ভিত্তি করে কুইজের সঠিক উত্তর দেওয়া এবং শ্রেণিকক্ষে বা বাড়ির কাজের জন্য ২০ নম্বরের এনসিটিবি ফরম্যাটের প্রশ্নপত্র ডাউনলোড করা।"
      },
      teacherNotes: "সকল শিক্ষার্থীকে কুইজে অংশ নিতে বলুন। পাঠ শেষে ২০ নম্বরের মূল্যায়ন ওয়ার্কশিট ডাউনলোড করিয়ে অফলাইন মূল্যায়নে ব্যবহার করুন।",
      quickTeachingSteps: [
        "ধাপ ১: কুইজের প্রশ্নটি ক্লাসে সরবে পাঠ করুন।",
        "ধাপ ২: শিক্ষার্থীরা সঠিক অপশনে ক্লিক করে ফলাফল যাচাই করবে।",
        "ধাপ ৩: ২০ নম্বরের ওয়ার্কশিট ডাউনলোডের মাধ্যমে পাঠ সমাপ্ত করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Government Primary School, Bangladesh",
    examTitle: "Class 3 English Assessment — Unit 5, Lesson 1: Joyful School Time (Porshi in Kushtia)",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today",
    time: "20 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Choose the best answer (4 Marks)",
        instruction: "Read the questions and tick (✓) the correct answer:",
        content: [
          {
            q: "1. Where is Joypur Government Primary School located?",
            options: ["A) In Dhaka", "B) In Kushtia", "C) In Sylhet", "D) In Khulna"],
            answer: "B) In Kushtia"
          },
          {
            q: "2. How old is Porshi?",
            options: ["A) Seven years old", "B) Eight years old", "C) Nine years old", "D) Ten years old"],
            answer: "B) Eight years old"
          },
          {
            q: "3. What do the students sing during the morning assembly?",
            options: ["A) Birthday song", "B) Rhymes", "C) National anthem", "D) Lullaby"],
            answer: "C) National anthem"
          },
          {
            q: "4. What do Porshi and her friends do during the break?",
            options: [
              "A) Water the flower garden",
              "B) Sleep in class",
              "C) Watch television",
              "D) Go home"
            ],
            answer: "A) Water the flower garden"
          }
        ]
      },
      {
        type: "matching",
        title: "Section B: Column Matching (4 Marks)",
        instruction: "Match Column A with Column B according to the passage:",
        content: [
          { a: "Morning assembly", b: "National anthem and physical exercises" },
          { a: "Classroom groups", b: "Solving puzzles and reading poems" },
          { a: "During the break", b: "Watering the flower garden" },
          { a: "School for Porshi", b: "A place of great joy and learning" }
        ]
      },
      {
        type: "fillInTheBlanks",
        title: "Section C: Complete with Words from the Box (4 Marks)",
        instruction: "Fill in each blank with the correct word from the box: [reads, assembly, garden, joy]",
        content: [
          "a) Porshi ________ in Class 3 at Joypur Primary School.",
          "b) The day begins with the morning ________.",
          "c) Students water the flower ________ in front of the building.",
          "d) School is a place of great ________ and learning."
        ]
      },
      {
        type: "trueFalse",
        title: "Section D: Write True or False (4 Marks)",
        instruction: "Read the statements and write True or False beside each:",
        content: [
          "a) Porshi dislikes going to school. -> [ False ]",
          "b) Joypur Government Primary School is in Kushtia. -> [ True ]",
          "c) Students do physical exercises during morning assembly. -> [ True ]",
          "d) Students cut down the flower garden during break. -> [ False ]"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section E: Short Answer Questions (4 Marks)",
        instruction: "Write short answers to the following questions in complete sentences:",
        content: [
          "1. What activities take place during the morning assembly at Porshi's school?",
          "   Answer: ________________________________________________________________",
          "2. What do students do in their small friendly groups inside the classroom?",
          "   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 11: Unit 6, Lesson 1 — Good Habits: Nusair's Cleanliness Routine
// =========================================================================
export const NUSAIR_HABITS_SLIDE_DECK: SlideDeck = {
  id: "nusair-habits",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 6: Cleanliness",
  lesson: "Lesson 1: Good habits - Nusair's cleanliness routine",
  topic: "নুসাইরের পরিষ্কার-পরিচ্ছন্নতার সুঅভ্যাস (pp. 83–86)",
  category: "english",
  thumbnailEmoji: "🧼 🪥 👔",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Nusair's Cleanliness World",
      subtitle: "সুস্বাস্থ্য ও ব্যক্তিগত পরিচ্ছন্নতার স্বাস্থ্যবিধি (Warm-up & Orientation)",
      phase: "১. প্রাক-পাঠ ও ভূমিকা (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-teal-500 to-cyan-600",
      imageEmoji: "🧼 👦 ✨",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello, healthy champions! Welcome to Class 3 English.",
          "Today we will meet Nusair, a neat and active Class 3 student.",
          "How does he keep himself free from germs and sickness?",
          "He brushes his teeth twice a day, takes daily baths, and trims his nails every Friday!",
          "Let's explore his daily habits and learn how cleanliness keeps us strong and happy."
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা তৃতীয় শ্রেণির একজন পরিপাটি ও স্বাস্থ্যবান বালক নুসাইরের সাথে পরিচিত হব। সে কীভাবে প্রতিদিন নিজেকে রোগজীবাণু ও অসুস্থতা থেকে দূরে রাখে? সে দিনে দুইবার দাঁত মাজে, প্রতিদিন গোসল করে এবং প্রতি শুক্রবারে নখ কাটে। এসো তার সুঅভ্যাসগুলো সম্পর্কে জেনে নিই।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তোমরা দিনে কতবার দাঁত মাজো? নখে ময়লা জমলে কী ক্ষতি হতে পারে?",
      quickTeachingSteps: [
        "ধাপ ১: পরিচ্ছন্ন ও সুস্থ বালকের ছবি দেখিয়ে ক্লাসে প্রশ্ন করুন।",
        "ধাপ ২: প্রতিদিনের পরিচ্ছন্নতা কীভাবে আমাদের অসুখ থেকে বাঁচায় তা বুঝিয়ে দিন।",
        "ধাপ ৩: সুঅভ্যাসগুলোর একটি তালিকা শিক্ষার্থীদের সাথে বোর্ডে তৈরি করুন।"
      ]
    },
    {
      id: 2,
      title: "Vocabulary Workshop: Hygiene & Health Words",
      subtitle: "নতুন শব্দভাণ্ডার: অর্থ, উচ্চারণ ও বাক্যে প্রয়োগ (Key Vocabulary)",
      phase: "২. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-cyan-500 to-blue-600",
      imageEmoji: "🪥 ✂️ 🧼",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Listen, repeat and learn the key words with correct pronunciation:"
        ],
        banglaExplanation: "পাঠটি অর্থসহ বুঝতে নিচের প্রয়োজনীয় শব্দগুলোর উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Neat",
            syllables: ["Neat"],
            phonetic: "/niːt/",
            meaning: "পরিপাটি / পরিষ্কার-পরিচ্ছন্ন",
            partOfSpeech: "Adjective",
            example: "Nusair is a neat and healthy boy.",
            icon: "✨"
          },
          {
            word: "Strictly",
            syllables: ["Strict", "ly"],
            phonetic: "/ˈstrɪkt.li/",
            meaning: "কঠোরভাবে / নিষ্ঠার সাথে",
            partOfSpeech: "Adverb",
            example: "He strictly follows cleanliness rules.",
            icon: "📋"
          },
          {
            word: "Refreshing",
            syllables: ["Re", "fresh", "ing"],
            phonetic: "/rɪˈfreʃ.ɪŋ/",
            meaning: "সতেজতাদায়ক / আরামদায়ক",
            partOfSpeech: "Adjective",
            example: "He takes a refreshing bath daily.",
            icon: "🚿"
          },
          {
            word: "Toilet Soap",
            syllables: ["Toi", "let", "Soap"],
            phonetic: "/ˈtɔɪ.lət səʊp/",
            meaning: "গা ধোয়ার সুগন্ধি সাবান",
            partOfSpeech: "Noun",
            example: "Wash your body with toilet soap.",
            icon: "🧼"
          },
          {
            word: "Trim",
            syllables: ["Trim"],
            phonetic: "/trɪm/",
            meaning: "কেটে ছোট বা পরিপাটি করা",
            partOfSpeech: "Verb",
            example: "Every Friday, he trims his fingernails.",
            icon: "✂️"
          },
          {
            word: "Fingernails",
            syllables: ["Fin", "ger", "nails"],
            phonetic: "/ˈfɪŋ.ɡə.neɪlz/",
            meaning: "হাতের নখগুলো",
            partOfSpeech: "Noun",
            example: "Dirt collects under long fingernails.",
            icon: "💅"
          },
          {
            word: "Ironed",
            syllables: ["I", "roned"],
            phonetic: "/ˈaɪənd/",
            meaning: "ইস্ত্রি করা / মসৃণ",
            partOfSpeech: "Adjective",
            example: "He wears a clean and ironed uniform.",
            icon: "👔"
          },
          {
            word: "Rarely",
            syllables: ["Rare", "ly"],
            phonetic: "/ˈreə.li/",
            meaning: "কদাচিৎ / খুব কমই",
            partOfSpeech: "Adverb",
            example: "Because of clean habits, he rarely falls ill.",
            icon: "🛡️"
          }
        ]
      },
      teacherNotes: "Refreshing (Re-fresh-ing) এবং Fingernails (Fin-ger-nails) শব্দের সিলেবল ভাঙন হাততালি দিয়ে ক্লাসে ড্রিল করান।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি কার্ডে ক্লিক করে স্পষ্ট উচ্চারণ শিক্ষার্থীদের শোনান।",
        "ধাপ ২: শিক্ষার্থীদের সমস্বরে সিলেবল ভাগ করে উচ্চারণ করতে বলুন।",
        "ধাপ ৩: বাক্যে প্রতিটি শব্দের প্রয়োগ ও ব্যবহারিক উদাহরণ বুঝিয়ে দিন।"
      ]
    },
    {
      id: 3,
      title: "Main Reading: Nusair's Cleanliness Routine",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৮৩: এনসিটিবি অনুমোদিত মূল পাঠ (Authentic Passage - Activity A)",
      phase: "৩. মূল পাঠ উপস্থাপন (Text Presentation)",
      duration: "১০ মিনিট",
      themeColor: "from-teal-600 to-emerald-600",
      imageEmoji: "📖 🧼 👦",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Nusair is a neat and healthy boy who studies in Class 3.",
          "He strictly follows good cleanliness habits every single day.",
          "He brushes his teeth twice a day—once after waking up in the morning and once before going to bed at night.",
          "He takes a refreshing bath daily with clean water and toilet soap.",
          "Every Friday, he trims his fingernails and toenails so that dirt cannot enter his mouth.",
          "He always wears clean and ironed school uniform.",
          "Because of his clean habits, Nusair rarely falls ill."
        ],
        banglaExplanation: "এনসিটিবি পাঠ্য: নুসাইর একজন পরিপাটি ও স্বাস্থ্যবান বালক যে তৃতীয় শ্রেণিতে পড়ে। সে প্রতিদিন নিষ্ঠার সাথে পরিচ্ছন্নতার সুঅভ্যাস পালন করে। সে দিনে দুইবার দাঁত মাজে—একবার সকালে ঘুম থেকে উঠে এবং আরেকবার রাতে ঘুমাতে যাওয়ার আগে। সে প্রতিদিন পরিষ্কার পানি ও গায়ে মাখার সাবান দিয়ে সতেজতাদায়ক গোসল করে। প্রতি শুক্রবার সে তার হাত ও পায়ের নখ কাটে যাতে পেটে বা মুখে কোনো ময়লা ঢুকতে না পারে। সে সবসময় পরিষ্কার ও ইস্ত্রি করা স্কুলের পোশাক পরিধান করে। তার এই পরিচ্ছন্ন অভ্যাসের কারণে নুসাইর খুব কমই অসুস্থ হয়।"
      },
      teacherNotes: "শিক্ষার্থীদের বাক্য ধরে ধরে সরব পাঠ করান। 'twice a day', 'toilet soap', এবং 'rarely falls ill' বাক্যাংশগুলোর অর্থ ব্যাখ্যা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে নুসাইরের সুঅভ্যাসের চিত্র প্রদর্শন করুন।",
        "ধাপ ২: প্রতিটি বাক্যে ক্লিক করে অডিও কারাওকে সাথে সাথে সরব পাঠ করান।",
        "ধাপ ৩: নুসাইরের প্রতিদিনের ও শুক্রবারের অভ্যাস নিয়ে প্রশ্ন করুন।"
      ]
    },
    {
      id: 4,
      title: "Pair Dialogue: Talking About Hygiene Routines",
      subtitle: "সহপাঠীর সাথে জোড়ায় সংলাপ: নিজের পরিচ্ছন্নতার অভ্যাস (Activity B Dialogue)",
      phase: "৪. চরিত্র সংলাপ ও দ্বৈত অভিনয় (Roleplay)",
      duration: "৮ মিনিট",
      themeColor: "from-blue-600 to-indigo-600",
      imageEmoji: "👦 👦 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice the hygiene dialogue in pairs.",
          "Student A plays Friend and Student B plays Nusair:"
        ],
        banglaExplanation: "এনসিটিবি পাঠ্যক্রম অনুযায়ী জোড়ায় সংলাপ অনুশীলন: একজন সহপাঠী ও অন্যজন নুসাইর হয়ে প্রতিদিনের পরিচ্ছন্নতা নিয়ে কথা বলবে।",
        dialogue: [
          {
            speaker: "Friend",
            team: "Team A (Friend)",
            text: "Hello Nusair! You always look so cheerful and neat. What is your secret?",
            avatar: "👦"
          },
          {
            speaker: "Nusair",
            team: "Team B (Nusair)",
            text: "Hello! I strictly follow clean habits every single day.",
            avatar: "👦"
          },
          {
            speaker: "Friend",
            team: "Team A (Friend)",
            text: "How often do you brush your teeth?",
            avatar: "👦"
          },
          {
            speaker: "Nusair",
            team: "Team B (Nusair)",
            text: "I brush twice a day—once in the morning and once before going to bed at night!",
            avatar: "👦"
          },
          {
            speaker: "Friend",
            team: "Team A (Friend)",
            text: "And when do you trim your fingernails?",
            avatar: "👦"
          },
          {
            speaker: "Nusair",
            team: "Team B (Nusair)",
            text: "Every Friday! That way dirt cannot enter my mouth. Clean habits keep me healthy!",
            avatar: "👦"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের দুই দলে ভাগ করে একজন বন্ধু এবং অপরজন নুসাইর হয়ে সংলাপটি অভিনয় করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: সংলাপের অডিও চালিয়ে স্বাভাবিক কথ্য স্বরাঘাত প্রদর্শন করুন।",
        "ধাপ ২: ক্লাসের জোড়ায় জোড়ায় রোলপ্লে অনুশীলন করান।",
        "ধাপ ৩: নিজের অভ্যাসের সাথে তুলনা করে এক বাক্য বলতে উৎসাহিত করুন।"
      ]
    },
    {
      id: 5,
      title: "Daily Hygiene Checklist & Shield Arena",
      subtitle: "পরিচ্ছন্নতার ৪ সুঅভ্যাস চেকলিস্ট ও হেলথ শিল্ড মিটার (Simulator)",
      phase: "৫. সিমুলেশন ও ব্যবহারিক অনুশীলন (Hands-on Practice)",
      duration: "৮ মিনিট",
      themeColor: "from-teal-500 to-cyan-600",
      imageEmoji: "🛡️ 📋 🌟",
      sceneType: "hygiene_simulator",
      hasVisualStage: true,
      content: {
        englishText: [
          "Step into Nusair's daily routine!",
          "Check off all 4 habits: Brushing twice, Daily bath, Friday nail trim, Clean uniform.",
          "Fill your Healthy Shield to 100% protection against illness.",
          "Remember: Clean habits protect our health every day!"
        ],
        banglaExplanation: "ব্যবহারিক সিমুলেটর: নুসাইরের ৪টি পরিচ্ছন্নতার অভ্যাস সম্পন্ন করে নিজের স্বাস্থ্য সুরক্ষার হেলথ শিল্ড ১০০% পূর্ণ করুন।"
      },
      teacherNotes: "প্রতিটি অভ্যাসের ওপর ক্লিক করিয়ে শিক্ষার্থীদের নিজস্ব স্বাস্থ্য সুরক্ষা তালিকা পর্যবেক্ষণ করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে প্রতিটি হ্যাবিট কার্ডে টিক চিহ্ন দিন।",
        "ধাপ ২: ১০০% প্রোটেকশন শিল্ড অর্জনের আনন্দ উপভোগ করান।",
        "ধাপ ৩: নিয়মিত নখ কাটার প্রয়োজনীয়তা আলোচনা করুন।"
      ]
    },
    {
      id: 6,
      title: "Interactive Toothbrushing & Grooming Studio",
      subtitle: "দাঁত মাজা সিমুলেটর এবং পরিপাটি পোশাকের প্রস্তুতি (Interactive Studio)",
      phase: "৬. দলগত মিথস্ক্রিয়া ও অনুসন্ধান (Grooming Studio)",
      duration: "৮ মিনিট",
      themeColor: "from-sky-500 to-blue-600",
      imageEmoji: "🪥 🚿 👔",
      sceneType: "grooming_studio",
      hasVisualStage: true,
      content: {
        englishText: [
          "Join Nusair in the bathroom mirror!",
          "Start the 2-minute circular toothbrushing simulator.",
          "Inspect clean and ironed school uniforms before heading to class.",
          "Keep teeth shining bright and uniform fresh every morning!"
        ],
        banglaExplanation: "মিথস্ক্রিয়া পর্ব: আয়নার সামনে দাঁড়িয়ে দাঁত মাজার সিমুলেটর চালু করুন এবং ইস্ত্রি করা পরিপাটি স্কুল ইউনিফর্মের গুরুত্ব জানুন।"
      },
      teacherNotes: "দাঁত মাজার সঠিক নিয়ম (গোলাকারভাবে উপর-নিচ ব্রাশ করা) শিক্ষার্থীদের প্রদর্শন করুন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে 'Start Brushing' বাটনে ক্লিক করে প্র্যাকটিস করান।",
        "ধাপ ২: দিনে কখন কখন দাঁত মাজা দরকার তা শিক্ষার্থীদের কাছ থেকে জেনে নিন।",
        "ধাপ ৩: পরিষ্কার পোশাক পরার আত্মবিশ্বাস সম্পর্কে আলোচনা করুন।"
      ]
    },
    {
      id: 7,
      title: "Grammar & Frequency Adverbs Workshop: 'Twice', 'Always', 'Rarely'",
      subtitle: "কাজের পুনরাবৃত্তি ও সময়সূচক ক্রিয়া-বিশেষণ (Adverbs of Frequency)",
      phase: "৭. ব্যাকরণ ও বাক্য অনুশীলন (Language Practice)",
      duration: "৬ মিনিট",
      themeColor: "from-blue-600 to-cyan-600",
      imageEmoji: "✏️ 🧩 📝",
      sceneType: "grammar",
      content: {
        englishText: [
          "Master Adverbs of Frequency in daily routines:",
          "1. 'Twice a day' = দিনে দুইবার (morning and night).",
          "2. 'Daily' = প্রতিদিন (regular everyday action).",
          "3. 'Always' = সবসময় (100% of the time).",
          "4. 'Rarely' = কদাচিৎ / খুব কমই (almost never)."
        ],
        punctuationDrill: {
          instruction: "Choose the correct adverb of frequency to complete each sentence:",
          challenges: [
            {
              id: "c1",
              sentenceBefore: "Nusair brushes his teeth _______ a day.",
              missingMark: "twice",
              meaning: "নুসাইর দিনে দুইবার (twice a day) দাঁত মাজে।",
              options: ["twice", "once", "three", "never"]
            },
            {
              id: "c2",
              sentenceBefore: "He takes a refreshing bath _______ with soap.",
              missingMark: "daily",
              meaning: "সে প্রতিদিন (daily) সাবান দিয়ে গোসল করে।",
              options: ["daily", "rarely", "yearly", "never"]
            },
            {
              id: "c3",
              sentenceBefore: "He _______ wears clean and ironed school uniform.",
              missingMark: "always",
              meaning: "সে সবসময় (always) পরিষ্কার ও ইস্ত্রি করা পোশাক পরে।",
              options: ["always", "never", "seldom", "sometimes"]
            },
            {
              id: "c4",
              sentenceBefore: "Because of his clean habits, Nusair _______ falls ill.",
              missingMark: "rarely",
              meaning: "পরিচ্ছন্ন অভ্যাসের কারণে নুসাইর খুব কমই / কদাচিৎ (rarely) অসুস্থ হয়।",
              options: ["rarely", "always", "often", "everyday"]
            }
          ]
        },
        banglaExplanation: "ব্যাকরণ চর্চা: কোনো কাজ কতবার বা কত ঘন ঘন ঘটে তা বোঝাতে Adverb of Frequency (যেমন: twice a day, daily, always, rarely) ব্যবহৃত হয়।"
      },
      teacherNotes: "বোর্ডে Always (সবসময়), Daily (প্রতিদিন), Twice a day (দিনে দুবার), এবং Rarely (কদাচিৎ) এর তালিকা তৈরি করে বাক্য রচনা করান।",
      quickTeachingSteps: [
        "ধাপ ১: Adverb of Frequency এর অর্থ ও ব্যবহার বোর্ডে পরিষ্কার করুন।",
        "ধাপ ২: প্রতিটি শূন্যস্থানের সঠিক অপশনে ক্লিক করে তাৎক্ষণিক ফিডব্যাক দিন।",
        "ধাপ ৩: শিক্ষার্থীরা সমস্বরে সম্পূর্ণ বাক্যটি পড়ে রুল আয়ত্ত করবে।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "শ্রেণিকক্ষ কুইজ এবং অধ্যায়ভিত্তিক ২০ নম্বরের পূর্ণাঙ্গ প্র্যাকটিস শিট (Evaluation)",
      phase: "৮. মূল্যায়ন ও ওয়ার্কশিট (Quiz & Assessment)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-500 to-pink-500",
      imageEmoji: "🏆 📋 ⭐",
      sceneType: "activity",
      content: {
        englishText: [
          "Outstanding work! You have learned all about Nusair's daily cleanliness routine.",
          "Answer the evaluation question and download your 20-mark printable practice worksheet."
        ],
        quiz: {
          question: "When does Nusair trim his fingernails and toenails?",
          options: [
            "A) Every Monday",
            "B) Every Wednesday",
            "C) Every Friday",
            "D) Only on his birthday"
          ],
          answer: "C) Every Friday",
          hint: "He trims his nails every Friday so dirt cannot enter his mouth!"
        },
        banglaExplanation: "মূল্যায়ন পর্ব: সম্পূর্ণ পাঠের ওপর ভিত্তি করে কুইজের সঠিক উত্তর দেওয়া এবং শ্রেণিকক্ষে বা বাড়ির কাজের জন্য ২০ নম্বরের এনসিটিবি ফরম্যাটের প্রশ্নপত্র ডাউনলোড করা।"
      },
      teacherNotes: "শিক্ষার্থীদের কুইজে অংশগ্রহণে উৎসাহিত করুন এবং ২০ নম্বরের অফলাইন প্রশ্নপত্র ডাউনলোড করার পরামর্শ দিন।",
      quickTeachingSteps: [
        "ধাপ ১: কুইজের প্রশ্নটি ক্লাসে সরবে পাঠ করুন।",
        "ধাপ ২: শিক্ষার্থীরা সঠিক অপশনে ক্লিক করে ফলাফল যাচাই করবে।",
        "ধাপ ৩: ২০ নম্বরের ওয়ার্কশিট ডাউনলোডের মাধ্যমে পাঠ সমাপ্ত করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Government Primary School, Bangladesh",
    examTitle: "Class 3 English Assessment — Unit 6, Lesson 1: Good Habits (Nusair's Cleanliness)",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today",
    time: "20 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Choose the best answer (4 Marks)",
        instruction: "Read the questions and tick (✓) the correct answer:",
        content: [
          {
            q: "1. Which class does Nusair study in?",
            options: ["A) Class 1", "B) Class 2", "C) Class 3", "D) Class 4"],
            answer: "C) Class 3"
          },
          {
            q: "2. How many times does Nusair brush his teeth in a day?",
            options: ["A) Once", "B) Twice", "C) Three times", "D) Four times"],
            answer: "B) Twice"
          },
          {
            q: "3. What does Nusair use for his daily bath?",
            options: [
              "A) Dirty pond water",
              "B) Clean water and toilet soap",
              "C) Only mud",
              "D) Oil only"
            ],
            answer: "B) Clean water and toilet soap"
          },
          {
            q: "4. Why does Nusair rarely fall ill?",
            options: [
              "A) Because he sleeps all day",
              "B) Because of his clean habits",
              "C) Because he eats candies",
              "D) Because he watches cartoons"
            ],
            answer: "B) Because of his clean habits"
          }
        ]
      },
      {
        type: "matching",
        title: "Section B: Column Matching (4 Marks)",
        instruction: "Match Column A with Column B according to the passage:",
        content: [
          { a: "Brush teeth", b: "Twice a day (morning and night)" },
          { a: "Refreshing bath", b: "Daily with clean water and toilet soap" },
          { a: "Trim fingernails", b: "Every Friday to prevent dirt" },
          { a: "School uniform", b: "Clean and neatly ironed" }
        ]
      },
      {
        type: "fillInTheBlanks",
        title: "Section C: Complete with Words from the Box (4 Marks)",
        instruction: "Fill in each blank with the correct word from the box: [healthy, twice, Friday, ironed]",
        content: [
          "a) Nusair is a neat and ________ boy.",
          "b) He brushes his teeth ________ a day.",
          "c) Every ________, he trims his fingernails.",
          "d) He wears a clean and ________ uniform."
        ]
      },
      {
        type: "trueFalse",
        title: "Section D: Write True or False (4 Marks)",
        instruction: "Read the statements and write True or False beside each:",
        content: [
          "a) Nusair never brushes his teeth before bed. -> [ False ]",
          "b) Nusair takes a bath daily with clean water and soap. -> [ True ]",
          "c) Nusair trims his fingernails every Friday. -> [ True ]",
          "d) Nusair falls ill very frequently. -> [ False ]"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section E: Short Answer Questions (4 Marks)",
        instruction: "Write short answers to the following questions in complete sentences:",
        content: [
          "1. When does Nusair brush his teeth every day?",
          "   Answer: ________________________________________________________________",
          "2. Why does Nusair trim his fingernails and toenails every Friday?",
          "   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 12: Unit 7, Lesson 1 — Water Pollution: Shihab & Kaniz at Village Pond
// =========================================================================
export const WATER_POLLUTION_SLIDE_DECK: SlideDeck = {
  id: "water-pollution",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 7: Save Our Water",
  lesson: "Lesson 1: Water pollution - Shihab & Kaniz at the village pond",
  topic: "পুকুরের পানি দূষণ ও শিক্ষার্থীদের সচেতনতা র‍্যালি (pp. 97–100)",
  category: "english",
  thumbnailEmoji: "🌊 🚫 📢",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Shihab & Kaniz's Village Pond Visit",
      subtitle: "গ্রামের পুকুরের করুণ দশা ও পানি দূষণের বিরুদ্ধে রুখে দাঁড়ানো (Warm-up & Orientation)",
      phase: "১. প্রাক-পাঠ ও ভূমিকা (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-cyan-600 to-teal-600",
      imageEmoji: "🌊 👦 👧",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello, eco-guardians! Welcome to Class 3 English.",
          "Today we join Shihab and Kaniz on a visit to their village pond.",
          "They are deeply saddened to see murky water filled with plastic packets, bottles and garbage.",
          "How does water pollution harm our health and village nature?",
          "Let's see how these brave young students organize a rally to protect their pond!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা শিহাব ও কানিজের সাথে তাদের গ্রামের পুকুর পরিদর্শনে যাব। প্লাস্টিকের প্যাকেট, বোতল ও বর্জ্যে পুকুরের পানি ঘোলা ও নোংরা দেখে তারা ব্যথিত হয়। দূষিত পানি কীভাবে আমাদের স্বাস্থ্যহানি ঘটায় এবং কীভাবে এই শিক্ষার্থীরা প্রধান শিক্ষকের সাথে কথা বলে র‍্যালি করে পুকুর রক্ষা করে, তা আমরা শিখব।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: পুকুরের পানি ঘোলা ও নোংরা হওয়ার কারণ কী? প্লাস্টিক বা আবর্জনা পানিতে ফেললে কী ক্ষতি হয়?",
      quickTeachingSteps: [
        "ধাপ ১: দূষিত পুকুর ও আবর্জনা ফেলার বাস্তব চিত্র দেখিয়ে আলোচনা শুরু করুন।",
        "ধাপ ২: পানি দূষণের মূল কারণগুলো শিক্ষার্থীদের কাছ থেকে চিহ্নিত করান।",
        "ধাপ ৩: বিদ্যালয়ের মাধ্যমে সচেতনতা তৈরির উপায় নিয়ে ভাবনা জাগ্রত করুন।"
      ]
    },
    {
      id: 2,
      title: "Vocabulary Workshop: Pollution & Environment Words",
      subtitle: "নতুন শব্দভাণ্ডার: অর্থ, উচ্চারণ ও বাক্যে প্রয়োগ (Key Vocabulary)",
      phase: "২. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-teal-600 to-cyan-700",
      imageEmoji: "🗑️ 🚯 📢",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Listen, repeat and learn the key vocabulary words with accurate pronunciation:"
        ],
        banglaExplanation: "পাঠের অর্থ গভীরভাবে উপলব্ধি করতে নিচের শব্দগুলোর উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Murky",
            syllables: ["Mur", "ky"],
            phonetic: "/ˈmɜː.ki/",
            meaning: "ঘোলাটে / অন্ধকারাচ্ছন্ন ময়লা",
            partOfSpeech: "Adjective",
            example: "The pond water looked murky and dirty.",
            icon: "🌫️"
          },
          {
            word: "Garbage",
            syllables: ["Gar", "bage"],
            phonetic: "/ˈɡɑː.bɪdʒ/",
            meaning: "গৃহস্থালির আবর্জনা / বর্জ্য",
            partOfSpeech: "Noun",
            example: "People threw kitchen garbage into the pond.",
            icon: "🗑️"
          },
          {
            word: "Cattle",
            syllables: ["Cat", "tle"],
            phonetic: "/ˈkæt.əl/",
            meaning: "গবাদিপশু / গরু-মহিষ",
            partOfSpeech: "Noun",
            example: "Villagers were bathing cattle in the water.",
            icon: "🐄"
          },
          {
            word: "Greasy",
            syllables: ["Greas", "y"],
            phonetic: "/ˈɡriː.si/",
            meaning: "তেলতেলে / চর্বিযুক্ত",
            partOfSpeech: "Adjective",
            example: "Washing greasy clothes pollutes fresh water.",
            icon: "🧼"
          },
          {
            word: "Spread",
            syllables: ["Spread"],
            phonetic: "/spred/",
            meaning: "ছড়ানো / বিস্তার লাভ করা",
            partOfSpeech: "Verb",
            example: "Polluted water spreads deadly diseases.",
            icon: "🦠"
          },
          {
            word: "Diarrhea",
            syllables: ["Di", "ar", "rhe", "a"],
            phonetic: "/ˌdaɪ.əˈriː.ə/",
            meaning: "ডায়রিয়া / পেটের অসুখ",
            partOfSpeech: "Noun",
            example: "Dirty water causes cholera and diarrhea.",
            icon: "💧"
          },
          {
            word: "Headteacher",
            syllables: ["Head", "teach", "er"],
            phonetic: "/ˈhedˌtiː.tʃər/",
            meaning: "বিদ্যালয়ের প্রধান শিক্ষক",
            partOfSpeech: "Noun",
            example: "They talked to the school headteacher.",
            icon: "👨‍🏫"
          },
          {
            word: "Rally",
            syllables: ["Ral", "ly"],
            phonetic: "/ˈræl.i/",
            meaning: "জনসচেতনতামূলক শোভাযাত্রা / সমাবেশ",
            partOfSpeech: "Noun",
            example: "Students arranged a rally to stop water pollution.",
            icon: "📢"
          }
        ]
      },
      teacherNotes: "Garbage (Gar-bage) ও Diarrhea (Di-ar-rhe-a) শব্দের সিলেবল বিভাজন হাততালি দিয়ে প্র্যাকটিস করান।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি কার্ডে ক্লিক করে স্পষ্ট উচ্চারণ শোনান।",
        "ধাপ ২: সিলেবল ভাঙন অনুযায়ী হাততালি দিয়ে শিক্ষার্থীদের ড্রিল করান।",
        "ধাপ ৩: বাক্যে প্রতিটি শব্দের অর্থ ও ক্ষতিকর প্রভাব বুঝিয়ে দিন।"
      ]
    },
    {
      id: 3,
      title: "Main Reading: Shihab and Kaniz at the Village Pond",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৯৭: এনসিটিবি অনুমোদিত মূল পাঠ (Authentic Passage - Activity A)",
      phase: "৩. মূল পাঠ উপস্থাপন (Text Presentation)",
      duration: "১০ মিনিট",
      themeColor: "from-blue-600 to-teal-600",
      imageEmoji: "📖 🌊 👧",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "One sunny afternoon, Shihab and Kaniz went to visit their village pond.",
          "They were saddened to see that the water looked murky and dirty.",
          "People were throwing empty plastic packets, bottles and kitchen garbage into the water.",
          "Nearby, some villagers were bathing cattle and washing greasy clothes.",
          "Shihab told Kaniz that polluted water spreads cholera, typhoid and diarrhea.",
          "They decided to talk to the village school headteacher and arrange a student rally to stop water pollution and protect their village pond."
        ],
        banglaExplanation: "এনসিটিবি পাঠ্য: এক রৌদ্রোজ্জ্বল বিকেলে শিহাব ও কানিজ তাদের গ্রামের পুকুর দেখতে গেল। তারা দেখে ব্যথিত হলো যে পুকুরের পানি ভীষণ ঘোলা ও নোংরা দেখাচ্ছে। মানুষজন সেখানে খালি প্লাস্টিকের প্যাকেট, বোতল এবং রান্নাঘরের ময়লা-আবর্জনা পানিতে ছুড়ে ফেলছিল। কাছেই কিছু গ্রামবাসী গরু-বাছুর গোসল করাচ্ছিল এবং তেলতেলে ময়লা কাপড় কাচছিল। শিহাব কানিজকে জানাল যে এই দূষিত পানি কলেরা, টাইফয়েড এবং ডায়রিয়ার মতো মারাত্মক রোগ ছড়ায়। তারা সিদ্ধান্ত নিল যে তারা গ্রামের বিদ্যালয়ের প্রধান শিক্ষকের সাথে কথা বলবে এবং পানি দূষণ বন্ধ করে গ্রামের পুকুরকে রক্ষা করতে শিক্ষার্থীদের নিয়ে একটি সচেতনতামূলক শোভাযাত্রা (র‍্যালি) আয়োজন করবে।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রতিটি বাক্য ধরে সরব পাঠ করান। 'were throwing', 'were bathing', এবং 'student rally' বাক্যাংশগুলোর অর্থ ব্যাখ্যা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে দূষিত পুকুর ও সচেতনতা শোভাযাত্রার দৃশ্য দেখান।",
        "ধাপ ২: প্রতিটি বাক্যের অডিও কারাওকে চালিয়ে সমস্বরে সরব পাঠ করান।",
        "ধাপ ৩: পানি দূষণের ফলে কী কী রোগ ছড়ায় তা নিয়ে শিক্ষার্থীদের প্রশ্ন করুন।"
      ]
    },
    {
      id: 4,
      title: "Pair Dialogue: Standing Up for Clean Water",
      subtitle: "সহপাঠীর সাথে জোড়ায় সংলাপ: পুকুর রক্ষার পরিকল্পনা (Activity B Dialogue)",
      phase: "৪. চরিত্র সংলাপ ও দ্বৈত অভিনয় (Roleplay)",
      duration: "৮ মিনিট",
      themeColor: "from-teal-600 to-indigo-600",
      imageEmoji: "👦 👧 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice the environmental dialogue in pairs.",
          "Student A plays Shihab and Student B plays Kaniz:"
        ],
        banglaExplanation: "এনসিটিবি নির্দেশিকা অনুযায়ী জোড়ায় সংলাপ অনুশীলন: একজন সহপাঠী শিহাব ও অন্যজন কানিজের ভূমিকায় অভিনয় করে পুকুরের পানি রক্ষার পরিকল্পনা করবে।",
        dialogue: [
          {
            speaker: "Kaniz",
            team: "Team A (Kaniz)",
            text: "Look Shihab! The water is so murky and black. People are throwing plastics and garbage!",
            avatar: "👧"
          },
          {
            speaker: "Shihab",
            team: "Team B (Shihab)",
            text: "Yes, Kaniz. And look over there, cattle are bathing and washing greasy clothes right in the pond!",
            avatar: "👦"
          },
          {
            speaker: "Kaniz",
            team: "Team A (Kaniz)",
            text: "This is very dangerous! Won't this dirty water make everyone sick?",
            avatar: "👧"
          },
          {
            speaker: "Shihab",
            team: "Team B (Shihab)",
            text: "Exactly. Polluted water spreads cholera, typhoid and diarrhea in our village.",
            avatar: "👦"
          },
          {
            speaker: "Kaniz",
            team: "Team A (Kaniz)",
            text: "What should we do to save our village pond?",
            avatar: "👧"
          },
          {
            speaker: "Shihab",
            team: "Team B (Shihab)",
            text: "Let's meet our headteacher right now and organize a student awareness rally!",
            avatar: "👦"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের জোড়ায় দাঁড় করিয়ে শিহাব ও কানিজের চরিত্র নিয়ে সংলাপ অভিনয় করতে বলুন। সঠিক আবেগ ও কণ্ঠের উঠানামায় জোর দিন।",
      quickTeachingSteps: [
        "ধাপ ১: সংলাপের অডিও প্লে করে সঠিক উচ্চারণ ও আবেগ প্রদর্শন করুন।",
        "ধাপ ২: শিক্ষার্থীদের জোড়ায় সংলাপটি অনুশীলন করতে বলুন।",
        "ধাপ ৩: পরিবেশ সুরক্ষায় নিজেদের এলাকায় তারা কী করতে পারে তা জানতে চান।"
      ]
    },
    {
      id: 5,
      title: "Village Pond Cleanup Simulator",
      subtitle: "পুকুর পরিচ্ছন্নতা সিমুলেটর: প্লাস্টিক ও বর্জ্য অপসারণ (Simulator)",
      phase: "৫. সিমুলেশন ও ব্যবহারিক অনুশীলন (Hands-on Practice)",
      duration: "৮ মিনিট",
      themeColor: "from-cyan-500 to-teal-600",
      imageEmoji: "🌊 🗑️ ✨",
      sceneType: "pond_simulator",
      hasVisualStage: true,
      content: {
        englishText: [
          "Step up to Shihab and Kaniz's village pond!",
          "Click on floating plastic bottles, chips packets, and greasy waste to clean them up.",
          "Raise the pond health meter from 0% to 100% sparkling clean.",
          "Watch colorful fish swim happily in clean, safe water!"
        ],
        banglaExplanation: "ব্যবহারিক সিমুলেটর: পুকুরের পানিতে ভাসমান প্লাস্টিকের বোতল, চিপসের প্যাকেট ও তেলতেলে বর্জ্য তুলে ফেলে পুকুরের স্বাস্থ্য ১০০% বিশুদ্ধ ও সুন্দর করে তুলুন।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রত্যেকটি বর্জ্যের ওপর ক্লিক করিয়ে কীভাবে পরিবেশ পরিচ্ছন্ন করতে হয় তা প্রত্যক্ষ করান।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে 'Click to Clean' বাটনে ক্লিক করে ময়লা অপসারণ করান।",
        "ধাপ ২: পানি পরিষ্কার হলে মাছের আনন্দে সাঁতার কাটার দৃশ্য দেখান।",
        "ধাপ ৩: পুকুরে ময়লা না ফেলার শপথ পাঠ করান।"
      ]
    },
    {
      id: 6,
      title: "Student Awareness Rally & Campaign Hub",
      subtitle: "শিক্ষার্থীদের সচেতনতা শোভাযাত্রা ও স্লোগান উৎসব (Interactive Rally)",
      phase: "৬. দলগত মিথস্ক্রিয়া ও অনুসন্ধান (Awareness Rally)",
      duration: "৮ মিনিট",
      themeColor: "from-amber-500 to-orange-600",
      imageEmoji: "📢 🚩 👧",
      sceneType: "rally_hub",
      hasVisualStage: true,
      content: {
        englishText: [
          "Grab your placards with the school headteacher!",
          "Lead the rally with powerful environmental slogans:",
          "'Stop Water Pollution! Protect Our Village Pond!'",
          "Awaken the whole village to keep water sources sparkling and disease-free!"
        ],
        banglaExplanation: "মিথস্ক্রিয়া পর্ব: প্রধান শিক্ষকের সাথে প্ল্যাকার্ড হাতে শিক্ষার্থীদের র‍্যালির নেতৃত্ব দিন। 'পানি দূষণ বন্ধ করো, পুকুর মোদের রক্ষা করো' স্লোগান দিয়ে গ্রামবাসীকে সচেতন করুন।"
      },
      teacherNotes: "শিক্ষার্থীদের নিজেদের ক্লাসেও স্লোগান দিয়ে পরিবেশ রক্ষার প্রত্যয় ব্যক্ত করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে 'Lead Student Rally' বাটনে ক্লিক করুন।",
        "ধাপ ২: ক্লাসের সবাইকে হাত তুলে সমস্বরে স্লোগান দিতে উৎসাহিত করুন।",
        "ধাপ ৩: প্ল্যাকার্ডের বাক্যগুলো ইংরেজিতে পাঠ করান।"
      ]
    },
    {
      id: 7,
      title: "Grammar Workshop: Past Continuous & Simple Past",
      subtitle: "অতীতের চলমান কাজ ও অতীত ক্রিয়াপদ (Past Continuous & Simple Past)",
      phase: "৭. ব্যাকরণ ও বাক্য অনুশীলন (Language Practice)",
      duration: "৬ মিনিট",
      themeColor: "from-blue-600 to-teal-600",
      imageEmoji: "✏️ 🧩 📝",
      sceneType: "grammar",
      content: {
        englishText: [
          "Master Past Continuous vs Simple Past:",
          "1. Past Continuous shows an action that was going on in the past: 'were throwing', 'were bathing'.",
          "Structure: was/were + verb(-ing). Example: People were throwing garbage.",
          "2. Simple Past expresses completed actions: 'went', 'told', 'decided'."
        ],
        punctuationDrill: {
          instruction: "Complete each sentence with the correct past tense verb form:",
          challenges: [
            {
              id: "c1",
              sentenceBefore: "People _______ plastic bottles into the water.",
              missingMark: "were throwing",
              meaning: "মানুষজন পানিতে প্লাস্টিকের বোতল ছুড়ছিল (Past Continuous: were throwing)।",
              options: ["were throwing", "are throw", "thrown", "throws"]
            },
            {
              id: "c2",
              sentenceBefore: "Some villagers _______ cattle nearby.",
              missingMark: "were bathing",
              meaning: "কিছু গ্রামবাসী গবাদিপশু গোসল করাচ্ছিল (were bathing)।",
              options: ["were bathing", "bathed", "is bathing", "bathe"]
            },
            {
              id: "c3",
              sentenceBefore: "Shihab _______ Kaniz about waterborne diseases.",
              missingMark: "told",
              meaning: "শিহাব কানিজকে বলেছিল (Simple Past: told)।",
              options: ["told", "tells", "telling", "was told"]
            },
            {
              id: "c4",
              sentenceBefore: "They _______ to arrange a student rally.",
              missingMark: "decided",
              meaning: "তারা একটি র‍্যালি করার সিদ্ধান্ত নিয়েছিল (Simple Past: decided)।",
              options: ["decided", "decides", "deciding", "was decide"]
            }
          ]
        },
        banglaExplanation: "ব্যাকরণ চর্চা: অতীতে কোনো কাজ চলছিল বোঝাতে Past Continuous Tense (was/were + verb-ing) এবং অতীতের সাধারণ কাজ বোঝাতে Simple Past Tense (Past form of verb) ব্যবহৃত হয়।"
      },
      teacherNotes: "বোর্ডে 'were throwing' বনাম 'threw' এবং 'were bathing' বনাম 'bathed' এর পার্থক্য উদাহরণ দিয়ে স্পষ্ট করুন।",
      quickTeachingSteps: [
        "ধাপ ১: Past Continuous গঠনের নিয়ম বোর্ডে লিখে দিন।",
        "ধাপ ২: প্রতিটি শূন্যস্থানে সঠিক অপশন ক্লিক করে যাচাই করান।",
        "ধাপ ৩: বাক্যগুলো উচ্চৈঃস্বরে উচ্চারণ করিয়ে ব্যাকরণ রুল মজবুত করুন।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "শ্রেণিকক্ষ কুইজ এবং অধ্যায়ভিত্তিক ২০ নম্বরের পূর্ণাঙ্গ প্র্যাকটিস শিট (Evaluation)",
      phase: "৮. মূল্যায়ন ও ওয়ার্কশিট (Quiz & Assessment)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-500 to-pink-500",
      imageEmoji: "🏆 📋 ⭐",
      sceneType: "activity",
      content: {
        englishText: [
          "Outstanding leadership! You have learned all about water pollution and student action.",
          "Answer the evaluation question and download your 20-mark printable practice worksheet."
        ],
        quiz: {
          question: "What diseases does polluted water spread according to Shihab?",
          options: [
            "A) Cough and cold",
            "B) Cholera, typhoid and diarrhea",
            "C) Toothache and headache",
            "D) Eye pain"
          ],
          answer: "B) Cholera, typhoid and diarrhea",
          hint: "Polluted water spreads cholera, typhoid and diarrhea!"
        },
        banglaExplanation: "মূল্যায়ন পর্ব: সম্পূর্ণ পাঠের ওপর ভিত্তি করে কুইজের সঠিক উত্তর দেওয়া এবং শ্রেণিকক্ষে বা বাড়ির কাজের জন্য ২০ নম্বরের এনসিটিবি ফরম্যাটের প্রশ্নপত্র ডাউনলোড করা।"
      },
      teacherNotes: "সকল শিক্ষার্থীকে কুইজে অংশগ্রহণে উৎসাহিত করুন এবং ২০ নম্বরের অফলাইন প্রশ্নপত্র সংগ্রহ করার পরামর্শ দিন।",
      quickTeachingSteps: [
        "ধাপ ১: কুইজের প্রশ্নটি ক্লাসে সরবে পাঠ করুন।",
        "ধাপ ২: শিক্ষার্থীরা সঠিক অপশনে ক্লিক করে ফলাফল যাচাই করবে।",
        "ধাপ ৩: ২০ নম্বরের ওয়ার্কশিট ডাউনলোডের মাধ্যমে পাঠ সমাপ্ত করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Government Primary School, Bangladesh",
    examTitle: "Class 3 English Assessment — Unit 7, Lesson 1: Water Pollution (Shihab & Kaniz)",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today",
    time: "20 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Choose the best answer (4 Marks)",
        instruction: "Read the questions and tick (✓) the correct answer:",
        content: [
          {
            q: "1. Where did Shihab and Kaniz go one sunny afternoon?",
            options: [
              "A) To the bazaar",
              "B) To the village pond",
              "C) To the river bank",
              "D) To a tea garden"
            ],
            answer: "B) To the village pond"
          },
          {
            q: "2. How did the pond water look?",
            options: [
              "A) Sparkling blue",
              "B) Crystal clear",
              "C) Murky and dirty",
              "D) Fresh and sweet"
            ],
            answer: "C) Murky and dirty"
          },
          {
            q: "3. What were villagers doing near the pond?",
            options: [
              "A) Planting trees",
              "B) Bathing cattle and washing greasy clothes",
              "C) Catching big fish",
              "D) Swimming for sport"
            ],
            answer: "B) Bathing cattle and washing greasy clothes"
          },
          {
            q: "4. What did Shihab and Kaniz decide to arrange?",
            options: [
              "A) A picnic party",
              "B) A football tournament",
              "C) A student rally to stop water pollution",
              "D) A music concert"
            ],
            answer: "C) A student rally to stop water pollution"
          }
        ]
      },
      {
        type: "matching",
        title: "Section B: Column Matching (4 Marks)",
        instruction: "Match Column A with Column B according to the passage:",
        content: [
          { a: "Murky and dirty water", b: "Filled with plastic packets and garbage" },
          { a: "Polluted water", b: "Spreads cholera, typhoid and diarrhea" },
          { a: "School headteacher", b: "Consulted by Shihab and Kaniz" },
          { a: "Student rally", b: "Arranged to protect the village pond" }
        ]
      },
      {
        type: "fillInTheBlanks",
        title: "Section C: Complete with Words from the Box (4 Marks)",
        instruction: "Fill in each blank with the correct word from the box: [murky, garbage, spreads, rally]",
        content: [
          "a) The water of the pond looked ________ and dirty.",
          "b) People were throwing kitchen ________ into the water.",
          "c) Polluted water ________ dangerous diseases.",
          "d) They arranged a student ________ to protect the pond."
        ]
      },
      {
        type: "trueFalse",
        title: "Section D: Write True or False (4 Marks)",
        instruction: "Read the statements and write True or False beside each:",
        content: [
          "a) Shihab and Kaniz were happy to see plastic bottles in the pond. -> [ False ]",
          "b) Bathing cattle in pond water causes pollution. -> [ True ]",
          "c) Clean water spreads cholera and typhoid. -> [ False ]",
          "d) Students talked to the headteacher to organize a rally. -> [ True ]"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section E: Short Answer Questions (4 Marks)",
        instruction: "Write short answers to the following questions in complete sentences:",
        content: [
          "1. What were people throwing into the village pond?",
          "   Answer: ________________________________________________________________",
          "2. Why did Shihab and Kaniz arrange a student rally?",
          "   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 13: Unit 5, Lesson 3 — Osman's Village Life
// =========================================================================
export const OSMAN_VILLAGE_SLIDE_DECK: SlideDeck = {
  id: "osman-village",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 5: Their Days",
  lesson: "Lesson 3: Osman's village life",
  topic: "ওসমানের শান্তিময় গ্রামীণ জীবন (pp. 71–75)",
  category: "english",
  thumbnailEmoji: "🌾 🏡 🐄",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Osman's Green Village",
      subtitle: "শান্ত ছায়াঘেরা গ্রাম, মেঠোপথ ও নির্মল প্রকৃতির গল্প (Warm-up & Orientation)",
      phase: "১. প্রাক-পাঠ ও ভূমিকা (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-emerald-500 to-teal-600",
      imageEmoji: "🌾 🏡 👦",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello, nature lovers! Welcome to Class 3 English.",
          "Today we will visit Osman in his peaceful green village.",
          "His home is surrounded by lush paddy fields, singing birds and tall trees.",
          "How does he spend his day with cows, goats, school, and ha-du-du?",
          "Let's explore Osman's simple, joyful rural life in Bangladesh!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা সবুজে ঘেরা শান্ত গ্রামে ওসমানের বাড়িতে বেড়াতে যাব। তার বাড়ির চারপাশে সবুজ ধানের ক্ষেত, গাছে পাখির গান ও নির্মল বাতাস। সকালে পশুপাখির যত্ন নেওয়া থেকে শুরু করে মেঠোপথ ধরে স্কুলে যাওয়া, বিকেলে বন্ধুদের সাথে হা-ডু-ডু খেলা এবং সন্ধ্যায় কুপি বাতির আলোয় পড়ার গল্প আমরা জানব।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: গ্রামে কাদের বাড়ি আছে? সকালে ঘুম থেকে উঠে গ্রামে কী কী পাখি বা পশুর ডাক শোনা যায়?",
      quickTeachingSteps: [
        "ধাপ ১: ধানক্ষেত ও গ্রামীণ মেঠোপথের ছবি দেখিয়ে আলোচনা শুরু করুন।",
        "ধাপ ২: শহর জীবন (ঐশীর মতো) বনাম গ্রাম জীবনের (ওসমানের মতো) পার্থক্য তুলে ধরুন।",
        "ধাপ ৩: ওসমানের প্রাত্যহিক রুটিন সম্পর্কে ধারণা দিন।"
      ]
    },
    {
      id: 2,
      title: "Vocabulary Workshop: Village & Routine Words",
      subtitle: "নতুন শব্দভাণ্ডার: অর্থ, উচ্চারণ ও বাক্যে প্রয়োগ (Key Vocabulary)",
      phase: "২. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-teal-500 to-green-600",
      imageEmoji: "🌱 🍚 🪔",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Listen, repeat and learn the key vocabulary words with accurate pronunciation:"
        ],
        banglaExplanation: "পাঠের অর্থ গভীরভাবে উপলব্ধি করতে নিচের শব্দগুলোর উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Surrounded",
            syllables: ["Sur", "round", "ed"],
            phonetic: "/səˈraʊn.dɪd/",
            meaning: "ঘেরা / চারপাশ দিয়ে বেষ্টিত",
            partOfSpeech: "Adjective",
            example: "The village is surrounded by green paddy fields.",
            icon: "🌾"
          },
          {
            word: "Lentils",
            syllables: ["Len", "tils"],
            phonetic: "/ˈlen.tɪlz/",
            meaning: "ডাল / মসুর ডাল",
            partOfSpeech: "Noun",
            example: "He eats hot rice and lentils for breakfast.",
            icon: "🍲"
          },
          {
            word: "Muddy",
            syllables: ["Mud", "dy"],
            phonetic: "/ˈmʌd.i/",
            meaning: "কাদাময় / কাঁচা মেঠোপথ",
            partOfSpeech: "Adjective",
            example: "He walks along the muddy village path.",
            icon: "👣"
          },
          {
            word: "Ha-du-du",
            syllables: ["Ha", "du", "du"],
            phonetic: "/hɑː duː duː/",
            meaning: "বাংলাদেশের ঐতিহ্যবাহী খেলা কাবাডি",
            partOfSpeech: "Noun",
            example: "Children play ha-du-du on the open field.",
            icon: "🏃"
          },
          {
            word: "Hide-and-seek",
            syllables: ["Hide", "and", "seek"],
            phonetic: "/ˌhaɪd.ənˈsiːk/",
            meaning: "লুকোচুরি খেলা",
            partOfSpeech: "Noun",
            example: "They play hide-and-seek after school.",
            icon: "🙈"
          },
          {
            word: "Homework",
            syllables: ["Home", "work"],
            phonetic: "/ˈhəʊm.wɜːk/",
            meaning: "বাড়ির কাজ / পাঠ্য পড়ালেখা",
            partOfSpeech: "Noun",
            example: "He finishes his homework in the evening.",
            icon: "📝"
          },
          {
            word: "Lamp",
            syllables: ["Lamp"],
            phonetic: "/læmp/",
            meaning: "কুপি বাতি / হারিকেন",
            partOfSpeech: "Noun",
            example: "He studies under the soft light of a lamp.",
            icon: "🪔"
          },
          {
            word: "Simplicity",
            syllables: ["Sim", "plic", "i", "ty"],
            phonetic: "/sɪmˈplɪs.ə.ti/",
            meaning: "সরলতা / অনাড়ম্বর জীবন",
            partOfSpeech: "Noun",
            example: "Osman loves the simplicity of village life.",
            icon: "✨"
          }
        ]
      },
      teacherNotes: "Surrounded (Sur-round-ed) ও Simplicity (Sim-plic-i-ty) শব্দের সিলেবল বিভাজন হাততালি দিয়ে প্র্যাকটিস করান।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি কার্ডে ক্লিক করে স্পষ্ট উচ্চারণ শোনান।",
        "ধাপ ২: সিলেবল ভাঙন অনুযায়ী হাততালি দিয়ে শিক্ষার্থীদের ড্রিল করান।",
        "ধাপ ৩: বাক্যে প্রতিটি শব্দের অর্থ ও বাস্তব উদাহরণ বুঝিয়ে দিন।"
      ]
    },
    {
      id: 3,
      title: "Main Reading: Osman's Village Life",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৭১: এনসিটিবি অনুমোদিত মূল পাঠ (Authentic Passage - Activity A)",
      phase: "৩. মূল পাঠ উপস্থাপন (Text Presentation)",
      duration: "১০ মিনিট",
      themeColor: "from-blue-600 to-emerald-600",
      imageEmoji: "📖 🌾 👦",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Osman lives in a quiet green village surrounded by paddy fields and trees.",
          "He wakes up early when the birds start singing.",
          "First, he helps his elder brother feed green grass to their cows and goats.",
          "Then he eats hot rice and lentils for breakfast and walks along the muddy village path to school.",
          "In the afternoon, Osman and his friends gather on the open green field to play ha-du-du and hide-and-seek.",
          "In the evening, he finishes his homework under the soft light of a lamp.",
          "Osman loves the fresh air and simplicity of his village."
        ],
        banglaExplanation: "এনসিটিবি পাঠ্য: ওসমান ধানক্ষেত ও গাছে ঘেরা এক শান্ত সবুজ গ্রামে বাস করে। ভোরে যখন পাখিরা গান গাইতে শুরু করে, তখন সে ঘুম থেকে ওঠে। প্রথমে সে তার বড় ভাইকে তাদের গরু ও ছাগলকে সবুজ ঘাস খাওয়াতে সাহায্য করে। তারপর সে সকালের নাস্তায় গরম ভাত ও ডাল খায় এবং মেঠোপথ ধরে হেঁটে বিদ্যালয়ে যায়। বিকেলে ওসমান ও তার বন্ধুরা খোলা সবুজ মাঠে জড়ো হয়ে হা-ডু-ডু ও লুকোচুরি খেলে। সন্ধ্যায় সে কুপি বাতির মৃদু আলোয় তার বাড়ির পড়ালেখা শেষ করে। ওসমান তার গ্রামের নির্মল বাতাস ও সহজ-সরল জীবন খুব ভালোবাসে।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রতিটি বাক্য ধরে সরব পাঠ করান। 'paddy fields', 'ha-du-du', এবং 'soft light of a lamp' বাক্যাংশগুলোর অর্থ বোর্ডে লিখে বুঝিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে গ্রাম ও গৃহস্থালির দৃশ্য দেখান।",
        "ধাপ ২: প্রতিটি বাক্যের অডিও কারাওকে চালিয়ে সমস্বরে সরব পাঠ করান।",
        "ধাপ ৩: ওসমানের সারাদিনের কাজগুলো ধারাবাহিকভাবে জিজ্ঞাসা করুন।"
      ]
    },
    {
      id: 4,
      title: "Pair Dialogue: Village Life vs City Life",
      subtitle: "সহপাঠীর সাথে জোড়ায় সংলাপ: গ্রাম ও শহরের জীবনের তুলনা (Activity B Dialogue)",
      phase: "৪. চরিত্র সংলাপ ও দ্বৈত অভিনয় (Roleplay)",
      duration: "৮ মিনিট",
      themeColor: "from-emerald-600 to-teal-600",
      imageEmoji: "👦 👧 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice the dialogue in pairs.",
          "Student A plays Friend and Student B plays Osman:"
        ],
        banglaExplanation: "এনসিটিবি নির্দেশিকা অনুযায়ী জোড়ায় সংলাপ অনুশীলন: একজন সহপাঠী ও অন্যজন ওসমানের ভূমিকায় অভিনয় করে গ্রামের জীবন সম্পর্কে কথা বলবে।",
        dialogue: [
          {
            speaker: "Friend",
            team: "Team A (Friend)",
            text: "Hello Osman! Tell me, what is the best thing about living in your village?",
            avatar: "👧"
          },
          {
            speaker: "Osman",
            team: "Team B (Osman)",
            text: "Hello! I love the fresh morning air, the birds singing, and the vast green paddy fields all around!",
            avatar: "👦"
          },
          {
            speaker: "Friend",
            team: "Team A (Friend)",
            text: "What do you do early in the morning before school?",
            avatar: "👧"
          },
          {
            speaker: "Osman",
            team: "Team B (Osman)",
            text: "First, I help my elder brother feed fresh green grass to our cows and goats. Then I eat hot rice and lentils!",
            avatar: "👦"
          },
          {
            speaker: "Friend",
            team: "Team A (Friend)",
            text: "What games do you play with friends in the afternoon?",
            avatar: "👧"
          },
          {
            speaker: "Osman",
            team: "Team B (Osman)",
            text: "We run freely on the big open green field and play ha-du-du and hide-and-seek! It is so much fun!",
            avatar: "👦"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের ক্লাসের সামনে জোড়ায় জোড়ায় ডেকে সংলাপ অভিনয় করান। উচ্চারণ ও স্বরাঘাতের দিকে খেয়াল রাখুন।",
      quickTeachingSteps: [
        "ধাপ ১: সংলাপের অডিও প্লে করে স্বাভাবিক স্বরাঘাত প্রদর্শন করুন।",
        "ধাপ ২: শিক্ষার্থীদের জোড়ায় সংলাপটি অনুশীলন করতে বলুন।",
        "ধাপ ৩: গ্রামে থাকার কোনো বিশেষ অভিজ্ঞতা নিজের ভাষায় ২ বাক্যে বলতে বলুন।"
      ]
    },
    {
      id: 5,
      title: "Interactive Village Farm & Chores Simulator",
      subtitle: "ওসমানের সকালের কাজ: গবাদিপশুকে ঘাস খাওয়ানো ও নাশতা (Simulator)",
      phase: "৫. সিমুলেশন ও ব্যবহারিক অনুশীলন (Hands-on Practice)",
      duration: "৮ মিনিট",
      themeColor: "from-emerald-500 to-green-600",
      imageEmoji: "🐄 🐐 🌱",
      sceneType: "farm_simulator",
      hasVisualStage: true,
      content: {
        englishText: [
          "Step into Osman's village homestead at sunrise!",
          "Click the grass bundle to feed cows and goats with Osman's elder brother.",
          "Enjoy hot morning rice and lentils before walking to primary school.",
          "Experience how rural chores build strong, responsible habits!"
        ],
        banglaExplanation: "ব্যবহারিক সিমুলেটর: ওসমানের গ্রামীণ খামারে বড় ভাইকে সাহায্য করে গরু ও ছাগলকে তাজা সবুজ ঘাস খাওয়ান এবং গরম ডাল-ভাত খেয়ে মেঠোপথ ধরে বিদ্যালয়ে যান।"
      },
      teacherNotes: "শিক্ষার্থীদের গৃহপালিত পশুপাখির যত্ন নেওয়া এবং পরিবারের কাজে সাহায্য করার সামাজিক মূল্যবোধ ব্যাখ্যা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে 'Feed Green Grass' বাটনে ক্লিক করান।",
        "ধাপ ২: গরু ও ছাগলকে খাবার দেওয়ার অ্যানিমেশন প্রত্যক্ষ করান।",
        "ধাপ ৩: সকালে পরিবারের কাজে সাহায্য করার উপকারিতা আলোচনা করুন।"
      ]
    },
    {
      id: 6,
      title: "Afternoon Ha-du-du & Evening Lamp Study",
      subtitle: "খোলা মাঠে হা-ডু-ডু খেলা ও সন্ধ্যায় কুপি বাতির আলোয় পড়ালেখা (Interactive Arena)",
      phase: "৬. দলগত মিথস্ক্রিয়া ও অনুসন্ধান (Interactive Games)",
      duration: "৮ মিনিট",
      themeColor: "from-amber-500 to-orange-600",
      imageEmoji: "🏃 🏆 🪔",
      sceneType: "hadudu_lamp",
      hasVisualStage: true,
      content: {
        englishText: [
          "Join Osman and his friends on the open green field!",
          "Chant 'Ha-du-du-du-du' and score points for your team.",
          "When evening falls, switch on the soft lamp light on the wooden desk.",
          "Complete English and Math homework with quiet dedication!"
        ],
        banglaExplanation: "মিথস্ক্রিয়া পর্ব: বিকেলে মুক্ত বাতাসে বন্ধুদের সাথে ঐতিহ্যবাহী হা-ডু-ডু খেলুন এবং সন্ধ্যায় শান্ত ঘরে কুপি বাতির আলোয় পাঠ্যবইয়ের বাড়ির কাজ সম্পন্ন করুন।"
      },
      teacherNotes: "হা-ডু-ডু বা কাবাডি বাংলাদেশের জাতীয় খেলা—এর নিয়ম ও শারীরিক উপকারিতা বুঝিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে 'Raid in Ha-du-du' বাটনে ক্লিক করে পয়েন্ট অর্জন করান।",
        "ধাপ ২: 'Lamp Study' ট্যাবে গিয়ে সন্ধ্যায় বাড়ির কাজ করার সিমুলেশন দেখান।",
        "ধাপ ৩: নিয়মিত পড়ার টেবিল ও পড়াশোনার অভ্যাস নিয়ে কথা বলুন।"
      ]
    },
    {
      id: 7,
      title: "Grammar & Sequence Connectors: 'First', 'Then', 'In the evening'",
      subtitle: "কাজের ধারাবাহিকতা ও সময়সূচক সংযোজক (Sequence Connectors & Routine)",
      phase: "৭. ব্যাকরণ ও বাক্য অনুশীলন (Language Practice)",
      duration: "৬ মিনিট",
      themeColor: "from-blue-600 to-teal-600",
      imageEmoji: "✏️ 🧩 📝",
      sceneType: "grammar",
      content: {
        englishText: [
          "Master Sequence Connectors for daily routine:",
          "1. 'First' (প্রথমে) introduces the very first action: First, he feeds green grass.",
          "2. 'Then' (তারপর) shows the next step: Then he eats hot rice and lentils.",
          "3. 'In the afternoon' (বিকেলে) expresses afternoon activities (ha-du-du).",
          "4. 'In the evening' (সন্ধ্যায়) tells about night study by lamp light."
        ],
        punctuationDrill: {
          instruction: "Choose the correct sequence connector to complete each sentence:",
          challenges: [
            {
              id: "c1",
              sentenceBefore: "_______, Osman helps feed green grass to cows and goats.",
              missingMark: "First",
              meaning: "প্রথমে (First) সে গরু ও ছাগলকে ঘাস খাওয়ায়।",
              options: ["First", "Finally", "Yesterday", "Never"]
            },
            {
              id: "c2",
              sentenceBefore: "_______ he eats hot rice and lentils for breakfast.",
              missingMark: "Then",
              meaning: "তারপর (Then) সে সকালের নাশতা খায়।",
              options: ["Then", "Before", "While", "Because"]
            },
            {
              id: "c3",
              sentenceBefore: "_______ the afternoon, he plays ha-du-du with friends.",
              missingMark: "In",
              meaning: "বিকেলে (In the afternoon) সে হা-ডু-ডু খেলে।",
              options: ["In", "On", "At", "By"]
            },
            {
              id: "c4",
              sentenceBefore: "He finishes his homework under the soft light _______ a lamp.",
              missingMark: "of",
              meaning: "কুপি বাতির (of a lamp) মৃদু আলোয় সে বাড়ির কাজ শেষ করে।",
              options: ["of", "to", "for", "with"]
            }
          ]
        },
        banglaExplanation: "ব্যাকরণ চর্চা: কোনো কাজ একের পর এক কীভাবে ঘটে তা বোঝাতে Sequence Connectors (যেমন: First, Then, After that, In the afternoon, In the evening) ব্যবহৃত হয়।"
      },
      teacherNotes: "বোর্ডে First, Then, In the afternoon, In the evening লিখে শিক্ষার্থীদের সারাদিনের কাজের তালিকা ইংরেজিতে বলতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: Sequence Connectors এর নিয়ম ও অর্থ বোর্ডে তুলে ধরুন।",
        "ধাপ ২: প্রতিটি শূন্যস্থানে সঠিক অপশন ক্লিক করে যাচাই করান।",
        "ধাপ ৩: সম্পূর্ণ বাক্যটি শিক্ষার্থীদের মুখে মুখে ড্রিল করান।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "শ্রেণিকক্ষ কুইজ এবং অধ্যায়ভিত্তিক ২০ নম্বরের পূর্ণাঙ্গ প্র্যাকটিস শিট (Evaluation)",
      phase: "৮. মূল্যায়ন ও ওয়ার্কশিট (Quiz & Assessment)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-500 to-pink-500",
      imageEmoji: "🏆 📋 ⭐",
      sceneType: "activity",
      content: {
        englishText: [
          "Wonderful job! You have explored Osman's peaceful village life, farm, and sports.",
          "Answer the evaluation question and download your 20-mark printable practice worksheet."
        ],
        quiz: {
          question: "What game does Osman play with his friends on the open green field?",
          options: [
            "A) Cricket and tennis",
            "B) Ha-du-du and hide-and-seek",
            "C) Video games",
            "D) Carrom only"
          ],
          answer: "B) Ha-du-du and hide-and-seek",
          hint: "They run on the green field to play traditional ha-du-du and hide-and-seek!"
        },
        banglaExplanation: "মূল্যায়ন পর্ব: সম্পূর্ণ পাঠের ওপর ভিত্তি করে কুইজের সঠিক উত্তর দেওয়া এবং শ্রেণিকক্ষে বা বাড়ির কাজের জন্য ২০ নম্বরের এনসিটিবি ফরম্যাটের প্রশ্নপত্র ডাউনলোড করা।"
      },
      teacherNotes: "সকল শিক্ষার্থীকে কুইজে অংশ নিতে বলুন এবং অফলাইন মূল্যায়নের জন্য ২০ নম্বরের প্রশ্নপত্র সংগ্রহ করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: কুইজের প্রশ্নটি ক্লাসে সরবে পাঠ করুন।",
        "ধাপ ২: শিক্ষার্থীরা সঠিক অপশনে ক্লিক করে ফলাফল যাচাই করবে।",
        "ধাপ ৩: ২০ নম্বরের ওয়ার্কশিট ডাউনলোডের মাধ্যমে পাঠ সমাপ্ত করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Government Primary School, Bangladesh",
    examTitle: "Class 3 English Assessment — Unit 5, Lesson 3: Osman's Village Life",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today",
    time: "20 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Choose the best answer (4 Marks)",
        instruction: "Read the questions and tick (✓) the correct answer:",
        content: [
          {
            q: "1. Where does Osman live?",
            options: [
              "A) In a big town",
              "B) In an apartment in Dhaka",
              "C) In a quiet green village",
              "D) Near the sea port"
            ],
            answer: "C) In a quiet green village"
          },
          {
            q: "2. What does Osman do first in the morning?",
            options: [
              "A) Plays computer games",
              "B) Feeds green grass to cows and goats",
              "C) Goes to the market",
              "D) Sleeps till noon"
            ],
            answer: "B) Feeds green grass to cows and goats"
          },
          {
            q: "3. What does Osman eat for breakfast?",
            options: [
              "A) Hot rice and lentils",
              "B) Cake and burger",
              "C) Noodles",
              "D) Biscuits"
            ],
            answer: "A) Hot rice and lentils"
          },
          {
            q: "4. Where does Osman finish his homework in the evening?",
            options: [
              "A) Under bright neon lights",
              "B) Under the soft light of a lamp",
              "C) In the playground",
              "D) At the shop"
            ],
            answer: "B) Under the soft light of a lamp"
          }
        ]
      },
      {
        type: "matching",
        title: "Section B: Column Matching (4 Marks)",
        instruction: "Match Column A with Column B according to the passage:",
        content: [
          { a: "Green village", b: "Surrounded by paddy fields and trees" },
          { a: "Cows and goats", b: "Fed with fresh green grass" },
          { a: "Open green field", b: "Playing ha-du-du and hide-and-seek" },
          { a: "Evening homework", b: "Done under the soft light of a lamp" }
        ]
      },
      {
        type: "fillInTheBlanks",
        title: "Section C: Complete with Words from the Box (4 Marks)",
        instruction: "Fill in each blank with the correct word from the box: [quiet, grass, lentils, lamp]",
        content: [
          "a) Osman lives in a ________ green village.",
          "b) He feeds green ________ to cows and goats.",
          "c) He eats hot rice and ________ for breakfast.",
          "d) He studies under the soft light of a ________."
        ]
      },
      {
        type: "trueFalse",
        title: "Section D: Write True or False (4 Marks)",
        instruction: "Read the statements and write True or False beside each:",
        content: [
          "a) Osman wakes up late at noon. -> [ False ]",
          "b) Osman helps his elder brother with farm animals. -> [ True ]",
          "c) Osman plays football inside his bedroom. -> [ False ]",
          "d) Osman loves the simplicity of village life. -> [ True ]"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section E: Short Answer Questions (4 Marks)",
        instruction: "Write short answers to the following questions in complete sentences:",
        content: [
          "1. What animals does Osman help feed in the morning?",
          "   Answer: ________________________________________________________________",
          "2. Why does Osman love his village life?",
          "   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 14: Unit 4, Lesson 2 — Breakfast with Fazle and Anita
// =========================================================================
export const BREAKFAST_FAZLE_ANITA_DECK: SlideDeck = {
  id: "breakfast-routine",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 4: Let's Play with Sounds and Numbers",
  lesson: "Lesson 2: Breakfast with Fazle and Anita",
  topic: "ফজলে ও অনীতার সকালের পুষ্টিকর নাশতা (pp. 54–57)",
  category: "english",
  thumbnailEmoji: "🍳 🥛 🍌",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Fazle and Anita's Breakfast Table",
      subtitle: "সকাল সাতটার ডাইনিং টেবিল ও সুষম খাদ্যের পুষ্টিগুণ (Warm-up & Orientation)",
      phase: "১. প্রাক-পাঠ ও ভূমিকা (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-amber-500 to-orange-600",
      imageEmoji: "🍳 👧 👦",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Good morning, healthy learners! Welcome to Class 3 English.",
          "It is seven o'clock in the morning, and the breakfast table is ready!",
          "Fazle and Anita are having a delicious and balanced breakfast.",
          "What makes boiled eggs, bananas, ruti and warm milk so healthy?",
          "Let's join them and discover how good food keeps us strong, active and cheerful!"
        ],
        banglaExplanation: "শুভ সকাল প্রিয় শিক্ষার্থীরা! সকাল সাতটায় ফজলে ও অনীতার নাস্তার টেবিলে খাবার প্রস্তুত। অনীতা পছন্দ করে সেদ্ধ ডিম, মিষ্টি কলা, আম ও এক গ্লাস কুসুম গরম দুধ; আর ফজলে পছন্দ করে গরম রুটি, মিশ্র সবজি ও চা। স্বাস্থ্যকর খাবার কীভাবে আমাদের কর্মঠ ও প্রফুল্ল রাখে, এসো তা জানি।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তোমরা প্রতিদিন সকালে নাশতায় কী খাও? খাবারের আগে হাত ধোয়া কেন জরুরি?",
      quickTeachingSteps: [
        "ধাপ ১: নাস্তার টেবিল ও পুষ্টিকর খাবারের ছবি দেখিয়ে আলোচনা শুরু করুন।",
        "ধাপ ২: প্রতিদিন সকালে নাশতা খাওয়ার প্রয়োজনীয়তা বুঝিয়ে দিন।",
        "ধাপ ৩: ফজলে ও অনীতার খাদ্যতালিকা নিয়ে আগ্রহ তৈরি করুন।"
      ]
    },
    {
      id: 2,
      title: "Vocabulary Workshop: Food & Health Words",
      subtitle: "নতুন শব্দভাণ্ডার: অর্থ, উচ্চারণ ও বাক্যে প্রয়োগ (Key Vocabulary)",
      phase: "২. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-orange-500 to-amber-600",
      imageEmoji: "🥛 🍌 🥗",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Listen, repeat and learn the key vocabulary words with accurate pronunciation:"
        ],
        banglaExplanation: "পাঠটি ভালোভাবে বোঝার জন্য নিচের প্রয়োজনীয় শব্দগুলোর উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Breakfast",
            syllables: ["Break", "fast"],
            phonetic: "/ˈbrek.fəst/",
            meaning: "সকালের নাশতা / প্রাতরাশ",
            partOfSpeech: "Noun",
            example: "They have a healthy breakfast at seven o'clock.",
            icon: "🍳"
          },
          {
            word: "Boiled",
            syllables: ["Boiled"],
            phonetic: "/bɔɪld/",
            meaning: "সেদ্ধ করা / পানিতে ফোটানো",
            partOfSpeech: "Adjective",
            example: "Anita likes a warm boiled egg.",
            icon: "🥚"
          },
          {
            word: "Vegetables",
            syllables: ["Veg", "e", "ta", "bles"],
            phonetic: "/ˈvedʒ.tə.bəlz/",
            meaning: "শাকসবজি / তরিতরকারি",
            partOfSpeech: "Noun",
            example: "Green vegetables keep us healthy.",
            icon: "🥗"
          },
          {
            word: "Active",
            syllables: ["Ac", "tive"],
            phonetic: "/ˈæk.tɪv/",
            meaning: "কর্মচঞ্চল / সচল ও সতেজ",
            partOfSpeech: "Adjective",
            example: "Good food makes students active all day.",
            icon: "🏃"
          },
          {
            word: "Cheerful",
            syllables: ["Cheer", "ful"],
            phonetic: "/ˈtʃɪə.fəl/",
            meaning: "হাসিখুশি / প্রফুল্ল চিত্ত",
            partOfSpeech: "Adjective",
            example: "She has a cheerful smile on her face.",
            icon: "😊"
          },
          {
            word: "Warm",
            syllables: ["Warm"],
            phonetic: "/wɔːm/",
            meaning: "কুসুম গরম / আরামদায়ক উষ্ণ",
            partOfSpeech: "Adjective",
            example: "She drinks a glass of warm milk.",
            icon: "🥛"
          },
          {
            word: "Ruti",
            syllables: ["Ru", "ti"],
            phonetic: "/ˈruː.ti/",
            meaning: "গমের তৈরি নরম রুটি",
            partOfSpeech: "Noun",
            example: "Fazle likes hot homemade ruti.",
            icon: "🫓"
          },
          {
            word: "Healthy",
            syllables: ["Health", "y"],
            phonetic: "/ˈhel.θi/",
            meaning: "স্বাস্থ্যকর / পুষ্টিকর",
            partOfSpeech: "Adjective",
            example: "Fruits and milk are healthy food.",
            icon: "✨"
          }
        ]
      },
      teacherNotes: "Breakfast (Break-fast) ও Vegetables (Veg-e-ta-bles) শব্দের সিলেবল বিভাজন হাততালি দিয়ে প্র্যাকটিস করান।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি কার্ডে ক্লিক করে স্পষ্ট উচ্চারণ শোনান।",
        "ধাপ ২: সিলেবল ভাঙন অনুযায়ী হাততালি দিয়ে শিক্ষার্থীদের ড্রিল করান।",
        "ধাপ ৩: বাক্যে প্রতিটি শব্দের অর্থ ও পুষ্টিগুণ বুঝিয়ে দিন।"
      ]
    },
    {
      id: 3,
      title: "Main Reading: Fazle and Anita's Healthy Breakfast",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৫৪: এনসিটিবি অনুমোদিত মূল পাঠ (Authentic Passage - Activity A)",
      phase: "৩. মূল পাঠ উপস্থাপন (Text Presentation)",
      duration: "১০ মিনিট",
      themeColor: "from-amber-600 to-orange-600",
      imageEmoji: "📖 🍳 👧",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "It is seven o'clock in the morning.",
          "Fazle and Anita are sitting at the table to have breakfast.",
          "Anita likes boiled eggs, sweet bananas and fresh mangoes.",
          "She also drinks a glass of warm milk every morning.",
          "Fazle likes hot ruti, mixed vegetables and a cup of tea.",
          "They know healthy food makes them strong, active and cheerful.",
          "They always wash their hands with soap and water before eating."
        ],
        banglaExplanation: "এনসিটিবি পাঠ্য: এখন সকাল সাতটা। ফজলে ও অনীতা সকালের নাস্তা করার জন্য টেবিলে বসেছে। অনীতা সেদ্ধ ডিম, মিষ্টি কলা এবং তাজা আম পছন্দ করে। সে প্রতিদিন সকালে এক গ্লাস কুসুম গরম দুধও পান করে। ফজলে গরম রুটি, মিশ্র সবজি এবং এক কাপ চা পছন্দ করে। তারা জানে যে স্বাস্থ্যকর খাবার তাদের শক্তিশালী, কর্মচঞ্চল এবং প্রফুল্ল রাখে। তারা খাবার খাওয়ার পূর্বে সবসময় সাবান ও পানি দিয়ে ভালো করে হাত ধুয়ে নেয়।"
      },
      teacherNotes: "শিক্ষার্থীদের বাক্য ধরে ধরে সরব পাঠ করান। 'boiled eggs', 'mixed vegetables', এবং 'strong, active and cheerful' বাক্যাংশগুলোর অর্থ ব্যাখ্যা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে সকালের নাশতার টেবিল ও খাবার প্রদর্শন করুন।",
        "ধাপ ২: প্রতিটি বাক্যে ক্লিক করে অডিও কারাওকে সাথে সাথে সরব পাঠ করান।",
        "ধাপ ৩: অনীতা ও ফজলে কে কী খেতে ভালোবাসে তা নিয়ে প্রশ্ন করুন।"
      ]
    },
    {
      id: 4,
      title: "Pair Dialogue: Polite Table Manners",
      subtitle: "সহপাঠীর সাথে জোড়ায় সংলাপ: টেবিলে বিনয়ী অনুরোধ (Activity B Dialogue)",
      phase: "৪. চরিত্র সংলাপ ও দ্বৈত অভিনয় (Roleplay)",
      duration: "৮ মিনিট",
      themeColor: "from-orange-600 to-rose-600",
      imageEmoji: "👦 👧 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice polite table manners in pairs.",
          "Student A plays Fazle and Student B plays Anita:"
        ],
        banglaExplanation: "এনসিটিবি নির্দেশিকা অনুযায়ী জোড়ায় সংলাপ অনুশীলন: ফজলে ও অনীতা একে অপরের কাছে বিনয়ের সাথে খাবার চাইবে এবং ধন্যবাদ জানাবে।",
        dialogue: [
          {
            speaker: "Fazle",
            team: "Team A (Fazle)",
            text: "Good morning Anita! What do you have on your plate today?",
            avatar: "👦"
          },
          {
            speaker: "Anita",
            team: "Team B (Anita)",
            text: "Good morning! I have a boiled egg, sweet bananas, and fresh milk. It makes me strong!",
            avatar: "👧"
          },
          {
            speaker: "Fazle",
            team: "Team A (Fazle)",
            text: "Can I have a banana, please?",
            avatar: "👦"
          },
          {
            speaker: "Anita",
            team: "Team B (Anita)",
            text: "Sure! Here you are, Fazle. Enjoy your breakfast!",
            avatar: "👧"
          },
          {
            speaker: "Fazle",
            team: "Team A (Fazle)",
            text: "Thank you so much, Anita! You are very kind.",
            avatar: "👦"
          },
          {
            speaker: "Anita",
            team: "Team B (Anita)",
            text: "You are welcome! Let's eat and get ready for school!",
            avatar: "👧"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের ক্লাসের সামনে জোড়ায় ডেকে 'Can I have..., please?' এবং 'Thank you!' বলার শিষ্টাচার অভিনয় করান।",
      quickTeachingSteps: [
        "ধাপ ১: সংলাপের অডিও প্লে করে স্বাভাবিক স্বরাঘাত প্রদর্শন করুন।",
        "ধাপ ২: শিক্ষার্থীদের জোড়ায় সংলাপটি অনুশীলন করতে বলুন।",
        "ধাপ ৩: খাওয়ার টেবিলে বিনয়ী আচরণের নিয়ম আলোচনা করুন।"
      ]
    },
    {
      id: 5,
      title: "Interactive Breakfast Dining Table Simulator",
      subtitle: "সকালের পুষ্টিকর খাদ্য পরিবেশন ও এনার্জি মিটার (Simulator)",
      phase: "৫. সিমুলেশন ও ব্যবহারিক অনুশীলন (Hands-on Practice)",
      duration: "৮ মিনিট",
      themeColor: "from-amber-500 to-orange-600",
      imageEmoji: "🍽️ 🥛 🥗",
      sceneType: "table_simulator",
      hasVisualStage: true,
      content: {
        englishText: [
          "Step into Fazle and Anita's breakfast room at 7:00 AM!",
          "Click on foods to serve boiled eggs, bananas, mangoes and milk to Anita.",
          "Serve hot ruti, mixed vegetables and tea to Fazle.",
          "Watch the Energy Meter rise to 100% Strong, Active & Cheerful!"
        ],
        banglaExplanation: "ব্যবহারিক সিমুলেটর: অনীতা ও ফজলের প্লেটে খাবার পরিবেশন করে ১০০% পুষ্টি ও এনার্জি মিটার পূর্ণ করুন।"
      },
      teacherNotes: "সুষম খাদ্যের উপাদান (শর্করা, আমিষ, ভিটামিন ও খনিজ লবণ) খাবারের তালিকার মাধ্যমে শিক্ষার্থীদের সহজে বোঝান।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে প্রতিটি খাবারে ক্লিক করে পরিবেশন করান।",
        "ধাপ ২: এনার্জি মিটার পূর্ণ হওয়ার আনন্দ উপভোগ করান।",
        "ধাপ ৩: কোন খাবারে কী পুষ্টি আছে তা নিয়ে প্রশ্ন করুন।"
      ]
    },
    {
      id: 6,
      title: "Table Manners & Handwashing Hero Station",
      subtitle: "খাবারের পূর্বে সাবান দিয়ে হাত ধোয়া ও বিনয়ী অনুরোধ (Interactive Manners)",
      phase: "৬. দলগত মিথস্ক্রিয়া ও অনুসন্ধান (Manners & Hygiene)",
      duration: "৮ মিনিট",
      themeColor: "from-teal-500 to-cyan-600",
      imageEmoji: "🧼 🤲 💬",
      sceneType: "manners_station",
      hasVisualStage: true,
      content: {
        englishText: [
          "Remember the golden rule before eating: Wash hands with soap and water!",
          "Click 'Wash Hands Now' to make hands clean and germ-free.",
          "Practice polite requests: 'Can I have some..., please?'",
          "Always say 'Thank you' when someone passes you food!"
        ],
        banglaExplanation: "স্বাস্থ্যবিধি ও শিষ্টাচার: খাওয়ার আগে সাবান-পানি দিয়ে হাত ধুয়ে নেওয়া এবং টেবিলে কোনো কিছু নেওয়ার সময় বিনয়ের সাথে 'Please' ও 'Thank you' বলা।"
      },
      teacherNotes: "শিক্ষার্থীদের ক্লাসরুমেই খাবার গ্রহণের আগে হাত ধোয়ার সঠিক অভ্যাস ও শিষ্টাচার চর্চা করান।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে 'Wash Hands Now' বাটনে ক্লিক করান।",
        "ধাপ ২: 'Manners' ট্যাবে গিয়ে বিনয়ী অনুরোধের ডায়লগগুলো প্লে করুন।",
        "ধাপ ৩: বাস্তব জীবনে এই নিয়মগুলো মেনে চলার শপথ করান।"
      ]
    },
    {
      id: 7,
      title: "Grammar Workshop: 'likes' vs 'like' & 'Can I have...'",
      subtitle: "পছন্দ প্রকাশে একবচন-বহুবচন ভার্ব ও বিনয়ী অনুরোধ (Expressing Preferences)",
      phase: "৭. ব্যাকরণ ও বাক্য অনুশীলন (Language Practice)",
      duration: "৬ মিনিট",
      themeColor: "from-blue-600 to-amber-600",
      imageEmoji: "✏️ 🧩 📝",
      sceneType: "grammar",
      content: {
        englishText: [
          "Master 'likes' vs 'like' & Polite Questions:",
          "1. He / She / Anita / Fazle + likes (third-person singular).",
          "Example: Anita likes boiled eggs. Fazle likes hot ruti.",
          "2. I / You / We / They + like (plural or first person). Example: They like healthy food.",
          "3. Polite request: 'Can I have a banana, please?'"
        ],
        punctuationDrill: {
          instruction: "Complete each sentence with the correct word:",
          challenges: [
            {
              id: "c1",
              sentenceBefore: "Anita _______ boiled eggs and fresh mangoes.",
              missingMark: "likes",
              meaning: "অনীতা একবচন কর্তা, তাই 'likes' বসবে।",
              options: ["likes", "like", "liking", "is like"]
            },
            {
              id: "c2",
              sentenceBefore: "They _______ healthy food makes them strong.",
              missingMark: "know",
              meaning: "তারা জানে (They বহুবচন, তাই 'know' বসবে)।",
              options: ["know", "knows", "knowing", "knew"]
            },
            {
              id: "c3",
              sentenceBefore: "Can I _______ some milk, please?",
              missingMark: "have",
              meaning: "অনুরোধে Can এর পর মূল ভার্ব 'have' বসে।",
              options: ["have", "has", "had", "having"]
            },
            {
              id: "c4",
              sentenceBefore: "They always wash their hands _______ eating.",
              missingMark: "before",
              meaning: "খাওয়ার পূর্বে (before eating) তারা হাত ধোয়।",
              options: ["before", "after", "during", "while"]
            }
          ]
        },
        banglaExplanation: "ব্যাকরণ চর্চা: একবচন সাবজেক্টের সাথে like-এর শেষে 's' যুক্ত হয়ে 'likes' হয়; কিন্তু বহুবচন সাবজেক্টের সাথে 'like' বসে। বিনয়ী অনুরোধে 'Can I have... please?' ব্যবহৃত হয়।"
      },
      teacherNotes: "বোর্ডে Anita likes... বনাম I like... এর পার্থক্য উদাহরণ দিয়ে ড্রিল করান।",
      quickTeachingSteps: [
        "ধাপ ১: likes ও like এর ব্যবহারের নিয়ম বোর্ডে লিখে দিন।",
        "ধাপ ২: প্রতিটি শূন্যস্থানে সঠিক অপশন ক্লিক করে শিক্ষার্থীদের যাচাই করান।",
        "ধাপ ৩: বাক্যগুলো উচ্চৈঃস্বরে উচ্চারণ করিয়ে ব্যাকরণ রুল পাকা করুন।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "শ্রেণিকক্ষ কুইজ এবং অধ্যায়ভিত্তিক ২০ নম্বরের পূর্ণাঙ্গ প্র্যাকটিস শিট (Evaluation)",
      phase: "৮. মূল্যায়ন ও ওয়ার্কশিট (Quiz & Assessment)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-500 to-pink-500",
      imageEmoji: "🏆 📋 ⭐",
      sceneType: "activity",
      content: {
        englishText: [
          "Superb effort! You have learned all about healthy breakfast, nutrition and table manners.",
          "Answer the evaluation question and download your 20-mark printable practice worksheet."
        ],
        quiz: {
          question: "What does healthy food make Fazle and Anita?",
          options: [
            "A) Lazy and sleepy",
            "B) Strong, active and cheerful",
            "C) Sick and weak",
            "D) Angry and hungry"
          ],
          answer: "B) Strong, active and cheerful",
          hint: "Healthy food gives energy to make us strong, active and cheerful!"
        },
        banglaExplanation: "মূল্যায়ন পর্ব: সম্পূর্ণ পাঠের ওপর ভিত্তি করে কুইজের সঠিক উত্তর দেওয়া এবং শ্রেণিকক্ষে বা বাড়ির কাজের জন্য ২০ নম্বরের এনসিটিবি ফরম্যাটের প্রশ্নপত্র ডাউনলোড করা।"
      },
      teacherNotes: "সকল শিক্ষার্থীকে কুইজে অংশ নিতে বলুন এবং অফলাইন মূল্যায়নের জন্য ২০ নম্বরের প্রশ্নপত্র সংগ্রহ করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: কুইজের প্রশ্নটি ক্লাসে সরবে পাঠ করুন।",
        "ধাপ ২: শিক্ষার্থীরা সঠিক অপশনে ক্লিক করে ফলাফল যাচাই করবে।",
        "ধাপ ৩: ২০ নম্বরের ওয়ার্কশিট ডাউনলোডের মাধ্যমে পাঠ সমাপ্ত করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Government Primary School, Bangladesh",
    examTitle: "Class 3 English Assessment — Unit 4, Lesson 2: Breakfast with Fazle and Anita",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today",
    time: "20 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Choose the best answer (4 Marks)",
        instruction: "Read the questions and tick (✓) the correct answer:",
        content: [
          {
            q: "1. What time is it in the morning?",
            options: ["A) 6 o'clock", "B) 7 o'clock", "C) 8 o'clock", "D) 9 o'clock"],
            answer: "B) 7 o'clock"
          },
          {
            q: "2. What fruit does Anita like for breakfast?",
            options: [
              "A) Apples and grapes",
              "B) Sweet bananas and fresh mangoes",
              "C) Guavas",
              "D) Oranges only"
            ],
            answer: "B) Sweet bananas and fresh mangoes"
          },
          {
            q: "3. What does Fazle like to eat?",
            options: [
              "A) Pizza and burger",
              "B) Hot ruti, mixed vegetables and tea",
              "C) Ice cream",
              "D) Chocolates"
            ],
            answer: "B) Hot ruti, mixed vegetables and tea"
          },
          {
            q: "4. What do they always do before eating?",
            options: [
              "A) Watch television",
              "B) Wash hands with soap and water",
              "C) Go to the market",
              "D) Sleep"
            ],
            answer: "B) Wash hands with soap and water"
          }
        ]
      },
      {
        type: "matching",
        title: "Section B: Column Matching (4 Marks)",
        instruction: "Match Column A with Column B according to the passage:",
        content: [
          { a: "Anita", b: "Boiled eggs, bananas and warm milk" },
          { a: "Fazle", b: "Hot ruti, mixed vegetables and tea" },
          { a: "Healthy food", b: "Makes children strong, active and cheerful" },
          { a: "Before eating", b: "Wash hands with soap and water" }
        ]
      },
      {
        type: "fillInTheBlanks",
        title: "Section C: Complete with Words from the Box (4 Marks)",
        instruction: "Fill in each blank with the correct word from the box: [table, milk, strong, soap]",
        content: [
          "a) Fazle and Anita sit at the ________ to have breakfast.",
          "b) Anita drinks a glass of warm ________ every morning.",
          "c) Healthy food makes them ________ and active.",
          "d) They wash their hands with ________ and water."
        ]
      },
      {
        type: "trueFalse",
        title: "Section D: Write True or False (4 Marks)",
        instruction: "Read the statements and write True or False beside each:",
        content: [
          "a) Breakfast is at 10 o'clock at night. -> [ False ]",
          "b) Anita drinks warm milk every morning. -> [ True ]",
          "c) They eat food with dirty hands. -> [ False ]",
          "d) Healthy food keeps us active and cheerful. -> [ True ]"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section E: Short Answer Questions (4 Marks)",
        instruction: "Write short answers to the following questions in complete sentences:",
        content: [
          "1. What does Anita like for her breakfast?",
          "   Answer: ________________________________________________________________",
          "2. Why should we wash our hands before eating?",
          "   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 15: Unit 2, Lesson 5 — My Friend: Sunil & Rahat
// =========================================================================
export const SUNIL_RAHAT_SLIDE_DECK: SlideDeck = {
  id: "sunil-rahat-friends",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 2: My Friends, Family and Numbers",
  lesson: "Lesson 5: My friend - Sunil & Rahat",
  topic: "সুনীল ও রাহাতের গভীর বন্ধুত্ব (pp. 31–34)",
  category: "english",
  thumbnailEmoji: "🤝 🌳 ⚽",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Sunil and Rahat's World of Friendship",
      subtitle: "সহপাঠী, বন্ধুতা ও সহমর্মিতার সুন্দর গল্প (Warm-up & Orientation)",
      phase: "১. প্রাক-পাঠ ও ভূমিকা (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-emerald-500 to-teal-600",
      imageEmoji: "🤝 👦 👦",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello, wonderful friends! Welcome to Class 3 English.",
          "Today we will meet Sunil and Rahat, two inseparable classmates.",
          "Every morning, they walk to school together side by side.",
          "During the break, they share homemade tiffin under a big banyan tree.",
          "Let's explore how their unique hobbies and mutual support make friendship truly special!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা তৃতীয় শ্রেণির দুই অন্তরঙ্গ বন্ধু সুনীল ও রাহাতের সাথে পরিচিত হব। তারা প্রতিদিন সকালে একসাথে হেঁটে স্কুলে যায়, টিফিন পিরিয়ডে বিশাল বটগাছের ছায়ায় বসে বাড়ির খাবার ভাগাভাগি করে খায়, সুনীল ছবি আঁকে আর রাহাত রোমাঞ্চকর বই পড়ে। বন্ধুদের পারস্পরিক ভালোবাসা ও শ্রদ্ধা কীভাবে বন্ধুত্বকে সুন্দর করে, তা আমরা শিখব।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তোমার সবচেয়ে প্রিয় বন্ধু কে? তোমরা টিফিনে একে অপরের সাথে খাবার ভাগ করে খাও কি না?",
      quickTeachingSteps: [
        "ধাপ ১: দুই বন্ধুর বন্ধুত্বের ছবি দেখিয়ে আলোচনা শুরু করুন।",
        "ধাপ ২: ক্লাসে বন্ধুত্বের গুরুত্ব ও সহমর্মিতা নিয়ে কথা বলুন।",
        "ধাপ ৩: সুনীল ও রাহাতের পরিচয় তুলে ধরুন।"
      ]
    },
    {
      id: 2,
      title: "Vocabulary Workshop: Friendship & Activities Words",
      subtitle: "নতুন শব্দভাণ্ডার: অর্থ, উচ্চারণ ও বাক্যে প্রয়োগ (Key Vocabulary)",
      phase: "২. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-teal-500 to-cyan-600",
      imageEmoji: "🌳 🍱 🎨",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Listen, repeat and learn the key vocabulary words with accurate pronunciation:"
        ],
        banglaExplanation: "পাঠটি ভালোভাবে বোঝার জন্য নিচের প্রয়োজনীয় শব্দগুলোর উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Classmates",
            syllables: ["Class", "mates"],
            phonetic: "/ˈklɑːs.meɪts/",
            meaning: "সহপাঠীগণ / একই শ্রেণির ছাত্র",
            partOfSpeech: "Noun",
            example: "Sunil and Rahat are classmates.",
            icon: "👥"
          },
          {
            word: "Banyan",
            syllables: ["Ban", "yan"],
            phonetic: "/ˈbæn.jæn/",
            meaning: "বটগাছ / ছায়াঘেরা বিশাল বৃক্ষ",
            partOfSpeech: "Noun",
            example: "They sit under a big banyan tree.",
            icon: "🌳"
          },
          {
            word: "Tiffin",
            syllables: ["Tif", "fin"],
            phonetic: "/ˈtɪf.ɪn/",
            meaning: "টিফিন / দুপুরের হালকা খাবার",
            partOfSpeech: "Noun",
            example: "They eat tiffin during the break.",
            icon: "🍱"
          },
          {
            word: "Share",
            syllables: ["Share"],
            phonetic: "/ʃeər/",
            meaning: "ভাগাভাগি করা / একসাথে খাওয়া",
            partOfSpeech: "Verb",
            example: "Good friends share their homemade food.",
            icon: "🤝"
          },
          {
            word: "Adventure",
            syllables: ["Ad", "ven", "ture"],
            phonetic: "/ədˈven.tʃər/",
            meaning: "দুঃসাহসিক অভিযান / রোমাঞ্চ",
            partOfSpeech: "Noun",
            example: "Rahat loves reading adventure stories.",
            icon: "🗺️"
          },
          {
            word: "Drawing",
            syllables: ["Draw", "ing"],
            phonetic: "/ˈdrɔː.ɪŋ/",
            meaning: "চিত্রাঙ্কন / ছবি আঁকা",
            partOfSpeech: "Noun",
            example: "Sunil loves drawing nature pictures.",
            icon: "🎨"
          },
          {
            word: "Ground",
            syllables: ["Ground"],
            phonetic: "/ɡraʊnd/",
            meaning: "খেলার মাঠ / প্রাঙ্গণ",
            partOfSpeech: "Noun",
            example: "They play football in the school ground.",
            icon: "⚽"
          },
          {
            word: "Together",
            syllables: ["To", "geth", "er"],
            phonetic: "/təˈɡeð.ər/",
            meaning: "একসাথে / দলবদ্ধভাবে",
            partOfSpeech: "Adverb",
            example: "They walk to school together.",
            icon: "🚶‍♂️"
          }
        ]
      },
      teacherNotes: "Adventure (Ad-ven-ture) ও Together (To-geth-er) শব্দের সিলেবল বিভাজন হাততালি দিয়ে ক্লাসে ড্রিল করান।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি কার্ডে ক্লিক করে স্পষ্ট উচ্চারণ শিক্ষার্থীদের শোনান।",
        "ধাপ ২: সিলেবল ভাঙন অনুযায়ী হাততালি দিয়ে শিক্ষার্থীদের উচ্চারণ করান।",
        "ধাপ ৩: বাক্যে প্রতিটি শব্দের প্রয়োগ ও ব্যবহারিক উদাহরণ বুঝিয়ে দিন।"
      ]
    },
    {
      id: 3,
      title: "Main Reading: Sunil and Rahat's Friendship",
      subtitle: "পাঠ্যবই পৃষ্ঠা ৩১: এনসিটিবি অনুমোদিত মূল পাঠ (Authentic Passage - Activity A)",
      phase: "৩. মূল পাঠ উপস্থাপন (Text Presentation)",
      duration: "১০ মিনিট",
      themeColor: "from-emerald-600 to-teal-600",
      imageEmoji: "📖 👦 👦",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Sunil and Rahat are classmates and best friends.",
          "Both of them read in Class 3 at school.",
          "Every morning, they walk to school together.",
          "During the tiffin break, they sit under a big banyan tree and share their homemade food.",
          "Sunil loves drawing pictures, while Rahat loves reading adventure stories.",
          "In the afternoon, they play football with other friends in the school ground."
        ],
        banglaExplanation: "এনসিটিবি পাঠ্য: সুনীল ও রাহাত একই শ্রেণির সহপাঠী এবং ঘনিষ্ঠ বন্ধু। তারা দুজনেই বিদ্যালয়ের তৃতীয় শ্রেণিতে পড়ে। প্রতিদিন সকালে তারা একসাথে হেঁটে স্কুলে যায়। টিফিনের অবসরে তারা একটি বড় বটগাছের নিচে বসে এবং তাদের বাড়ি থেকে আনা খাবার ভাগাভাগি করে খায়। সুনীল ছবি আঁকতে ভালোবাসে, অন্যদিকে রাহাত ভালোবাসে রোমাঞ্চকর গল্পের বই পড়তে। বিকেলে তারা বিদ্যালয়ের মাঠে অন্যান্য বন্ধুদের সাথে ফুটবল খেলে।"
      },
      teacherNotes: "শিক্ষার্থীদের বাক্য ধরে ধরে সরব পাঠ করান। 'best friends', 'banyan tree', এবং 'while Rahat loves' বাক্যাংশগুলোর অর্থ ব্যাখ্যা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে বটগাছ ও বন্ধুদের ছবি দেখান।",
        "ধাপ ২: অডিও কারাওকে চালিয়ে প্রতিটি বাক্য একসাথে সমস্বরে পড়ান।",
        "ধাপ ৩: সুনীল ও রাহাতের পছন্দ ও খেলাধুলা নিয়ে ছোট ছোট প্রশ্ন করুন।"
      ]
    },
    {
      id: 4,
      title: "Pair Dialogue: Talking About Hobbies with Friends",
      subtitle: "সহপাঠীর সাথে জোড়ায় সংলাপ: বন্ধুত্ব ও পছন্দের শখ (Activity B Dialogue)",
      phase: "৪. চরিত্র সংলাপ ও দ্বৈত অভিনয় (Roleplay)",
      duration: "৮ মিনিট",
      themeColor: "from-teal-600 to-indigo-600",
      imageEmoji: "👦 👦 💬",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice the friendship dialogue in pairs.",
          "Student A plays Sunil and Student B plays Rahat:"
        ],
        banglaExplanation: "এনসিটিবি নির্দেশিকা অনুযায়ী জোড়ায় সংলাপ অনুশীলন: একজন সুনীল ও অন্যজন রাহাত হয়ে বন্ধুত্ব ও শখ সম্পর্কে কথা বলবে।",
        dialogue: [
          {
            speaker: "Sunil",
            team: "Team A (Sunil)",
            text: "Hello Rahat! Let's sit under our favourite banyan tree. What did you bring for tiffin?",
            avatar: "👦"
          },
          {
            speaker: "Rahat",
            team: "Team B (Rahat)",
            text: "Hello Sunil! My mother made sweet mangoes and samosas. Let's share them together!",
            avatar: "👦"
          },
          {
            speaker: "Sunil",
            team: "Team A (Sunil)",
            text: "Delicious! I have homemade parata. After tiffin, I will show you the riverboat picture I drew!",
            avatar: "👦"
          },
          {
            speaker: "Rahat",
            team: "Team B (Rahat)",
            text: "Great! And I am reading a wonderful book about jungle explorers. Will you play football this afternoon?",
            avatar: "👦"
          },
          {
            speaker: "Sunil",
            team: "Team A (Sunil)",
            text: "Yes, definitely! We will score lots of goals together in the school ground!",
            avatar: "👦"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের দুই দলে ভাগ করে একজন সুনীল ও একজন রাহাত হয়ে সংলাপটি অভিনয় করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: সংলাপের অডিও চালিয়ে স্বাভাবিক স্বরাঘাত প্রদর্শন করুন।",
        "ধাপ ২: ক্লাসের শিক্ষার্থীদের জোড়ায় দাঁড় করিয়ে ডায়লগ অভিনয় করান।",
        "ধাপ ৩: নিজের প্রিয় বন্ধুর নাম ও শখ দিয়ে নতুন করে সংলাপ বলতে বলুন।"
      ]
    },
    {
      id: 5,
      title: "Interactive Banyan Tree Tiffin Spot",
      subtitle: "বটগাছের ছায়ায় টিফিন ভাগাভাগি ও সম্প্রীতি সিমুলেটর (Simulator)",
      phase: "৫. সিমুলেশন ও ব্যবহারিক অনুশীলন (Hands-on Practice)",
      duration: "৮ মিনিট",
      themeColor: "from-emerald-500 to-teal-600",
      imageEmoji: "🌳 🍱 ❤️",
      sceneType: "banyan_simulator",
      hasVisualStage: true,
      content: {
        englishText: [
          "Join Sunil and Rahat under the cool shade of the banyan tree!",
          "Click 'Share Tiffin' to share homemade parata, sweets and fruits.",
          "Watch their Friendship Moments meter fill with warm golden stars.",
          "Remember: Sharing food brings friends closer together!"
        ],
        banglaExplanation: "ব্যবহারিক সিমুলেটর: বিশাল বটগাছের শান্ত ছায়ায় বন্ধুদের সাথে বাড়ির তৈরি টিফিন ভাগাভাগি করার সুন্দর মুহূর্ত উপভোগ করুন।"
      },
      teacherNotes: "টিফিন শেয়ার করার মানসিকতা ও বন্ধুদের যত্ন নেওয়ার মানবিক গুণাবলী নিয়ে আলোচনা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে 'Share Tiffin' বাটনে ক্লিক করান।",
        "ধাপ ২: খাবার শেয়ারের অ্যানিমেশন ও স্টারের বৃদ্ধি পর্যবেক্ষণ করান।",
        "ধাপ ৩: ক্লাসে সহপাঠীদের সাথে মিলেমিশে থাকার গুরুত্ব বোঝান।"
      ]
    },
    {
      id: 6,
      title: "Creative Hobbies & Football Match Hub",
      subtitle: "ছবি আঁকা, দুঃসাহসিক গল্প পড়া ও ফুটবল খেলা (Interactive Hub)",
      phase: "৬. দলগত মিথস্ক্রিয়া ও অনুসন্ধান (Interactive Hub)",
      duration: "৮ মিনিট",
      themeColor: "from-amber-500 to-emerald-600",
      imageEmoji: "🎨 📖 ⚽",
      sceneType: "hobbies_football",
      hasVisualStage: true,
      content: {
        englishText: [
          "Explore the two friends' wonderful creative worlds!",
          "Sunil loves drawing colourful pictures of riverboats and nature.",
          "Rahat loves turning the pages of thrilling jungle adventure books.",
          "Click 'Kick & Score Goal' to play afternoon football on the school field!"
        ],
        banglaExplanation: "মিথস্ক্রিয়া পর্ব: সুনীলের ছবি আঁকা ও রাহাতের অ্যাডভেঞ্চার গল্পের বই পড়ার শখ উপভোগ করুন এবং বিকেলে ফুটবল মাঠে গোল দেওয়ার খেলায় অংশ নিন।"
      },
      teacherNotes: "শিক্ষার্থীদের বিভিন্ন ধরনের শখের প্রতি আগ্রহী করে তুলুন এবং শারীরিক সুস্থতায় বিকেলের খেলাধুলার ভূমিকা তুলে ধরুন।",
      quickTeachingSteps: [
        "ধাপ ১: 'Hobbies' ট্যাবে ছবি আঁকা ও বই পড়ার ফিচার দেখান।",
        "ধাপ ২: 'Football' ট্যাবে ক্লিক করে গোল করার আনন্দ উপভোগ করান।",
        "ধাপ ৩: প্রতিটি শিক্ষার্থীর প্রিয় শখ কী তা জানতে চান।"
      ]
    },
    {
      id: 7,
      title: "Grammar & Connectors: 'Both of them' & 'while'",
      subtitle: "উভয় বোঝাতে 'Both' এবং বৈপরীত্য বোঝাতে 'While' (Connectors Workshop)",
      phase: "৭. ব্যাকরণ ও বাক্য অনুশীলন (Language Practice)",
      duration: "৬ মিনিট",
      themeColor: "from-blue-600 to-indigo-600",
      imageEmoji: "✏️ 🧩 📝",
      sceneType: "grammar",
      content: {
        englishText: [
          "Master 'Both of them' and 'While':",
          "1. 'Both of them' (তারা দুজনেই) refers to two people together: Both of them read in Class 3.",
          "2. 'While' (যেখানে / অন্যদিকে) connects two contrasting actions happening together:",
          "Example: Sunil loves drawing, while Rahat loves reading."
        ],
        punctuationDrill: {
          instruction: "Choose the correct word to complete each sentence:",
          challenges: [
            {
              id: "c1",
              sentenceBefore: "_______ of them read in Class 3 at school.",
              missingMark: "Both",
              meaning: "তাদের দুজনেই (Both of them) তৃতীয় শ্রেণিতে পড়ে।",
              options: ["Both", "All", "Every", "None"]
            },
            {
              id: "c2",
              sentenceBefore: "Sunil loves drawing pictures, _______ Rahat loves reading stories.",
              missingMark: "while",
              meaning: "অন্যদিকে / যেখানে (while) রাহাত বই পড়তে ভালোবাসে।",
              options: ["while", "because", "so", "or"]
            },
            {
              id: "c3",
              sentenceBefore: "During the break, they sit under a big _______ tree.",
              missingMark: "banyan",
              meaning: "তারা একটি বড় বটগাছের (banyan tree) নিচে বসে।",
              options: ["banyan", "mango", "banana", "pine"]
            },
            {
              id: "c4",
              sentenceBefore: "Every morning, they walk to school _______.",
              missingMark: "together",
              meaning: "প্রতিদিন সকালে তারা একসাথে (together) স্কুলে যায়।",
              options: ["together", "alone", "sadly", "slowly"]
            }
          ]
        },
        banglaExplanation: "ব্যাকরণ চর্চা: দুই ব্যক্তি একই কাজ করলে 'Both of them' এবং দুটি ভিন্ন পছন্দের তুলনা বোঝাতে 'while' ব্যবহৃত হয়।"
      },
      teacherNotes: "বোর্ডে Both of them এবং While দিয়ে দুটি বাক্যের তুলনা স্পষ্ট করে দেখিয়ে ড্রিল করান।",
      quickTeachingSteps: [
        "ধাপ ১: Both of them ও While এর প্রয়োগ বোর্ডে লিখে দিন।",
        "ধাপ ২: প্রতিটি শূন্যস্থানে সঠিক অপশনটি শিক্ষার্থীদের বেছে নিতে বলুন।",
        "ধাপ ৩: সমস্বরে পুরো বাক্যটি পড়িয়ে ব্যাকরণ স্পষ্ট করুন।"
      ]
    },
    {
      id: 8,
      title: "Classroom Assessment Quiz & 20-Mark Worksheet",
      subtitle: "শ্রেণিকক্ষ কুইজ এবং অধ্যায়ভিত্তিক ২০ নম্বরের পূর্ণাঙ্গ প্র্যাকটিস শিট (Evaluation)",
      phase: "৮. মূল্যায়ন ও ওয়ার্কশিট (Quiz & Assessment)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-500 to-pink-500",
      imageEmoji: "🏆 📋 ⭐",
      sceneType: "activity",
      content: {
        englishText: [
          "Brilliant work! You have learned all about Sunil and Rahat's warm friendship.",
          "Answer the evaluation question and download your 20-mark printable practice worksheet."
        ],
        quiz: {
          question: "Where do Sunil and Rahat sit during the tiffin break?",
          options: [
            "A) On the roof of the school",
            "B) Under a big banyan tree",
            "C) Inside the headteacher's room",
            "D) In a shopping mall"
          ],
          answer: "B) Under a big banyan tree",
          hint: "They sit under the cool shade of a big banyan tree to share homemade food!"
        },
        banglaExplanation: "মূল্যায়ন পর্ব: সম্পূর্ণ পাঠের ওপর ভিত্তি করে কুইজের সঠিক উত্তর দেওয়া এবং শ্রেণিকক্ষে বা বাড়ির কাজের জন্য ২০ নম্বরের এনসিটিবি ফরম্যাটের প্রশ্নপত্র ডাউনলোড করা।"
      },
      teacherNotes: "সকল শিক্ষার্থীকে কুইজে অংশ নিতে বলুন এবং ২০ নম্বরের অফলাইন প্রশ্নপত্র ডাউনলোড করার পরামর্শ দিন।",
      quickTeachingSteps: [
        "ধাপ ১: কুইজের প্রশ্নটি ক্লাসে সরবে পাঠ করুন।",
        "ধাপ ২: শিক্ষার্থীরা সঠিক অপশনে ক্লিক করে ফলাফল যাচাই করবে।",
        "ধাপ ৩: ২০ নম্বরের ওয়ার্কশিট ডাউনলোডের মাধ্যমে পাঠ সমাপ্ত করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "Government Primary School, Bangladesh",
    examTitle: "Class 3 English Assessment — Unit 2, Lesson 5: My Friend (Sunil & Rahat)",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today",
    time: "20 Minutes",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Choose the best answer (4 Marks)",
        instruction: "Read the questions and tick (✓) the correct answer:",
        content: [
          {
            q: "1. What is the relation between Sunil and Rahat?",
            options: [
              "A) Strangers",
              "B) Classmates and best friends",
              "C) Cousins",
              "D) Enemies"
            ],
            answer: "B) Classmates and best friends"
          },
          {
            q: "2. How do they go to school every morning?",
            options: [
              "A) By bus",
              "B) They walk together",
              "C) By taxi",
              "D) By boat"
            ],
            answer: "B) They walk together"
          },
          {
            q: "3. What does Sunil love doing in his free time?",
            options: [
              "A) Drawing pictures",
              "B) Cooking food",
              "C) Sleeping",
              "D) Singing songs"
            ],
            answer: "A) Drawing pictures"
          },
          {
            q: "4. What game do they play in the afternoon?",
            options: [
              "A) Cricket",
              "B) Football",
              "C) Chess",
              "D) Badminton"
            ],
            answer: "B) Football"
          }
        ]
      },
      {
        type: "matching",
        title: "Section B: Column Matching (4 Marks)",
        instruction: "Match Column A with Column B according to the passage:",
        content: [
          { a: "Every morning", b: "Walk to school together" },
          { a: "Under banyan tree", b: "Share homemade tiffin" },
          { a: "Sunil", b: "Loves drawing pictures" },
          { a: "Rahat", b: "Loves reading adventure stories" }
        ]
      },
      {
        type: "fillInTheBlanks",
        title: "Section C: Complete with Words from the Box (4 Marks)",
        instruction: "Fill in each blank with the correct word from the box: [classmates, together, share, football]",
        content: [
          "a) Sunil and Rahat are ________ and best friends.",
          "b) Every morning, they walk to school ________.",
          "c) They ________ their homemade food under the tree.",
          "d) In the afternoon, they play ________ with friends."
        ]
      },
      {
        type: "trueFalse",
        title: "Section D: Write True or False (4 Marks)",
        instruction: "Read the statements and write True or False beside each:",
        content: [
          "a) Sunil and Rahat study in Class 5. -> [ False ]",
          "b) They sit under a banyan tree during tiffin break. -> [ True ]",
          "c) Rahat hates reading adventure stories. -> [ False ]",
          "d) They play football in the afternoon. -> [ True ]"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section E: Short Answer Questions (4 Marks)",
        instruction: "Write short answers to the following questions in complete sentences:",
        content: [
          "1. What do Sunil and Rahat do during the tiffin break?",
          "   Answer: ________________________________________________________________",
          "2. What are the different hobbies of Sunil and Rahat?",
          "   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 16: Unit 4, Lesson 6 — The Calendar & 12 Months (pp. 60–64)
// =========================================================================
export const CALENDAR_MONTHS_SLIDE_DECK: SlideDeck = {
  id: "calendar-months",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 4: Days, Calendar and Numbers",
  lesson: "Lesson 6: The Calendar & 12 Months",
  topic: "The Calendar, 12 Months of the Year & Ordinal Numbers (pp. 60–64)",
  category: "english",
  thumbnailEmoji: "📅",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to The Calendar & 12 Months",
      subtitle: "ক্যালেন্ডার, ইংরেজি ১২ মাস এবং ৩৬৫ দিনের সময়যাত্রা (Orientation)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-indigo-500 to-sky-600",
      imageEmoji: "📅 🗓️ ⏰",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello, wonderful students! Welcome to English for Today.",
          "Today we will explore the wonderful world of the calendar.",
          "A calendar shows the days, weeks and months of a year.",
          "There are twelve months in an English year.",
          "There are three hundred and sixty-five days in a normal year.",
          "Let's learn their names, order, and special facts together!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা ক্যালেন্ডার ও ইংরেজি ১২ মাসের পরিচিতি জানব। ক্যালেন্ডার আমাদের বছরের দিন, সপ্তাহ ও মাস দেখায়। ইংরেজি বছরে ১২টি মাস থাকে এবং একটি সাধারণ বছরে ৩৬৫ দিন থাকে।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: আজকের দিনটি কী বার এবং আজ কোন মাস? ক্যালেন্ডার দেখে তারা কীভাবে ছুটির দিন গুনে তা আলোচনা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: ক্যালেন্ডারের ছবি ও দেয়াল পঞ্জিকা দেখিয়ে ক্লাস শুরু করুন।",
        "ধাপ ২: বছরের ১২ মাসের নাম সমস্বরে আবৃত্তি করান।",
        "ধাপ ৩: বছরের দিন ও সপ্তাহের সংখ্যা স্পষ্ট করুন।"
      ]
    },
    {
      id: 2,
      title: "Reading & Listening: Calendar Structure",
      subtitle: "পাঠ্যাংশ পাঠ ও অনুধাবন: ক্যালেন্ডার ও বছরের হিসাব (NCTB Text)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-sky-500 to-indigo-600",
      imageEmoji: "📖 🗓️ ☀️",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "A calendar shows the days, weeks and months of a year.",
          "There are twelve months in an English year.",
          "January is the first month, and December is the twelfth and last month of the year.",
          "There are three hundred and sixty-five days in a normal year.",
          "Each week has seven days.",
          "Seven months have thirty-one days, while four months have thirty days.",
          "February is a special month with twenty-eight days.",
          "The calendar helps us plan our school days and holidays."
        ],
        banglaExplanation: "ক্যালেন্ডার একটি বছরের দিন, সপ্তাহ এবং মাস প্রদর্শন করে। একটি ইংরেজি বছরে ১২টি মাস থাকে। জানুয়ারি প্রথম মাস এবং ডিসেম্বর দ্বাদশ ও শেষ মাস। একটি সাধারণ বছরে ৩৬৫ দিন থাকে। প্রতিটি সপ্তাহে ৭ দিন থাকে। ৭টি মাসে ৩১ দিন এবং ৪টি মাসে ৩০ দিন থাকে। ফেব্রুয়ারি একটি বিশেষ মাস যাতে ২৮ দিন থাকে। ক্যালেন্ডার আমাদের স্কুলের দিন ও ছুটির পরিকল্পনা করতে সহায়তা করে।"
      },
      teacherNotes: "শিক্ষার্থীদের জোর দিয়ে পড়তে বলুন: 'twelfth and last month', 'three hundred and sixty-five days', 'plan our school days and holidays'।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক নিজে আদর্শ পাঠ দেবেন।",
        "ধাপ ২: শিক্ষার্থীরা দলবদ্ধভাবে পুনরাবৃত্তি করবে।",
        "ধাপ ৩: গুরুত্বপূর্ণ তথ্যগুলোর নিচে দাগ দিতে বলুন।"
      ]
    },
    {
      id: 3,
      title: "Vocabulary Workshop: Essential Time Words",
      subtitle: "শব্দসম্ভার: ক্যালেন্ডার ও সময়ের গুরুত্বপূর্ণ ইংরেজি শব্দ (Key Vocabulary)",
      phase: "৩. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-indigo-600 to-purple-600",
      imageEmoji: "💡 📚 🏷️",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Master the essential words related to calendar, time, and planning:"
        ],
        banglaExplanation: "ক্যালেন্ডার ও সময়ের হিসাব সম্পর্কিত শব্দার্থ ও সঠিক উচ্চারণ চর্চা করি:",
        vocabulary: [
          {
            word: "Calendar",
            syllables: ["Cal", "en", "dar"],
            phonetic: "/ˈkæl.ɪn.dər/",
            meaning: "দিনপঞ্জিকা / ক্যালেন্ডার",
            partOfSpeech: "Noun",
            example: "We look at the calendar to see holidays.",
            icon: "📅"
          },
          {
            word: "Normal",
            syllables: ["Nor", "mal"],
            phonetic: "/ˈnɔː.məl/",
            meaning: "স্বাভাবিক / সাধারণ",
            partOfSpeech: "Adjective",
            example: "There are 365 days in a normal year.",
            icon: "⚖️"
          },
          {
            word: "Special",
            syllables: ["Spe", "cial"],
            phonetic: "/ˈspeʃ.əl/",
            meaning: "বিশেষ / স্বতন্ত্র",
            partOfSpeech: "Adjective",
            example: "February is a special month with 28 days.",
            icon: "✨"
          },
          {
            word: "Plan",
            syllables: ["Plan"],
            phonetic: "/plæn/",
            meaning: "পরিকল্পনা করা",
            partOfSpeech: "Verb",
            example: "We plan our school study schedule.",
            icon: "📝"
          },
          {
            word: "Twelfth",
            syllables: ["Twelfth"],
            phonetic: "/twelfθ/",
            meaning: "দ্বাদশ / ১২তম",
            partOfSpeech: "Adjective / Ordinal",
            example: "December is the twelfth month of the year.",
            icon: "🏆"
          }
        ]
      },
      teacherNotes: "প্রতিটি শব্দের সিলেবল আলাদা করে হাততালি দিয়ে শিক্ষার্থীদের সাথে উচ্চারণ অনুশীলন করান।",
      quickTeachingSteps: [
        "ধাপ ১: সিলেবল ও উচ্চারণ কার্ড শিক্ষার্থীদের দেখান।",
        "ধাপ ২: ইংরেজি অর্থ ও বাংলা প্রতিশব্দ মিলিয়ে পড়তে বলুন।",
        "ধাপ ৩: ছোট ছোট বাক্যে শব্দের প্রয়োগ করান।"
      ]
    },
    {
      id: 4,
      title: "Ordinal Numbers: 1st to 12th Month Order",
      subtitle: "অর্ডিনাল সংখ্যা: প্রথম থেকে দ্বাদশ মাসের ক্রমবিন্যাস (Ordinal Numbers Focus)",
      phase: "৪. অর্ডিনাল সংখ্যা বিশ্লেষণ (Grammar & Sequence)",
      duration: "৬ মিনিট",
      themeColor: "from-blue-600 to-indigo-700",
      imageEmoji: "🔢 🥇 🥈",
      sceneType: "grammar",
      hasVisualStage: true,
      content: {
        englishText: [
          "Ordinal numbers tell the position or order of something:",
          "1st = First (January), 2nd = Second (February), 3rd = Third (March)",
          "4th = Fourth (April), 5th = Fifth (May), 6th = Sixth (June)",
          "7th = Seventh (July), 8th = Eighth (August), 9th = Ninth (September)",
          "10th = Tenth (October), 11th = Eleventh (November), 12th = Twelfth (December)"
        ],
        banglaExplanation: "অর্ডিনাল সংখ্যা কোনো বস্তু বা সময়ের ক্রম বা অবস্থান নির্দেশ করে। যেমন: ১st (first), ২nd (second), ৩rd (third), ৪th (fourth)... ১২শ (twelfth)।",
        sortingGame: {
          instruction: "Sort the months into their correct ordinal halves:",
          categories: {
            cat1: { id: "first-half", label: "1st to 6th Months (Jan to Jun)", icon: "🌱", theme: "emerald" },
            cat2: { id: "second-half", label: "7th to 12th Months (Jul to Dec)", icon: "🍁", theme: "amber" }
          },
          items: [
            { id: "sm-1", label: "January (1st)", category: "first-half", icon: "❄️" },
            { id: "sm-2", label: "March (3rd)", category: "first-half", icon: "🌿" },
            { id: "sm-3", label: "May (5th)", category: "first-half", icon: "🥭" },
            { id: "sm-4", label: "July (7th)", category: "second-half", icon: "🌧️" },
            { id: "sm-5", label: "September (9th)", category: "second-half", icon: "🌾" },
            { id: "sm-6", label: "December (12th)", category: "second-half", icon: "🏆" }
          ]
        }
      },
      teacherNotes: "শিক্ষার্থীদের বানান খেয়াল করতে বলুন: Ninth (কোনো 'e' নেই), Fifth ('ve' বদলে 'f' হয়েছে), Twelfth ('ve' বদলে 'f' হয়েছে)।",
      quickTeachingSteps: [
        "ধাপ ১: কার্ডিনাল সংখ্যা (1, 2, 3) বনাম অর্ডিনাল সংখ্যার (1st, 2nd, 3rd) তুলনা দেখান।",
        "ধাপ ২: প্রতিটি মাসের ক্রম বলতে বলুন: 'Which month is fifth? May!'",
        "ধাপ ৩: ড্র্যাগ অ্যান্ড ড্রপ বাছাই গেমটি খেলতে দিন।"
      ]
    },
    {
      id: 5,
      title: "Days in Each Month: 31, 30 & 28 Days Rule",
      subtitle: "মাসের দিন সংখ্যা: ৩১ দিন, ৩০ দিন ও ২৮ দিনের সহজ কৌশল (Days Rule)",
      phase: "৫. মাস ও দিনের নিয়ম (Categorization)",
      duration: "৫ মিনিট",
      themeColor: "from-teal-600 to-emerald-700",
      imageEmoji: "📆 🖐️ 🧮",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Remember the magic rule of days in a month:",
          "Seven months have 31 days: January, March, May, July, August, October, December.",
          "Four months have 30 days: April, June, September, November.",
          "February is a special month with 28 days (29 in a leap year).",
          "Popular rhyme: 'Thirty days has September, April, June, and November...'"
        ],
        banglaExplanation: "বছরের ৭টি মাসে ৩১ দিন থাকে: জানুয়ারি, মার্চ, মে, জুলাই, আগস্ট, অক্টোবর, ডিসেম্বর। ৪টি মাসে ৩০ দিন থাকে: এপ্রিল, জুন, সেপ্টেম্বর, নভেম্বর। আর ফেব্রুয়ারি মাসে ২৮ দিন থাকে।"
      },
      teacherNotes: "হাতের আঙুলের গাঁট (knuckle) গুনে ৩১ দিন ও ৩০ দিন বের করার সহজ কৌশলটি বোর্ডে এঁকে দেখান।",
      quickTeachingSteps: [
        "ধাপ ১: ৩১ দিনের ৭টি মাসের তালিকা বোর্ডে লিখুন।",
        "ধাপ ২: ৩০ দিনের ৪টি মাসের তালিকা লিখুন।",
        "ধাপ ৩: ফেব্রুয়ারির বিশেষত্ব ব্যাখ্যা করুন।"
      ]
    },
    {
      id: 6,
      title: "Days of the Week: 7 Days Routine",
      subtitle: "সপ্তাহের সাত দিন ও স্কুলের সাপ্তাহিক দিনপঞ্জি (Days of the Week)",
      phase: "৬. সাপ্তাহিক দিনপঞ্জি (Days of the Week)",
      duration: "৪ মিনিট",
      themeColor: "from-cyan-600 to-blue-700",
      imageEmoji: "🗓️ 🎒 🏫",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Each week has seven days:",
          "Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, and Saturday.",
          "Sunday to Thursday are our school days.",
          "Friday and Saturday are the weekend holidays in Bangladesh.",
          "We use the weekly calendar to organize homework and sports."
        ],
        banglaExplanation: "সপ্তাহে সাতটি দিন থাকে: রবিবার, সোমবার, মঙ্গলবার, বুধবার, বৃহস্পতিবার, শুক্রবার ও শনিবার। বাংলাদেশে রবি থেকে বৃহস্পতি স্কুল খোলা থাকে এবং শুক্র ও শনিবার সাপ্তাহিক ছুটি।"
      },
      teacherNotes: "সপ্তাহের দিনগুলোর সঠিক উচ্চারণ করান: Wednesday উচ্চারণ 'ওয়েনজ-ডে', Tuesday 'টিউজ-ডে'।",
      quickTeachingSteps: [
        "ধাপ ১: রবি থেকে শনি সপ্তাহের দিনগুলোর নাম ধারাবাহিকভাবে পড়া।",
        "ধাপ ২: ছুটির দিন ও স্কুলের দিন চিহ্নিত করা।",
        "ধাপ ৩: নিয়মিত পড়ালেখার রুটিন তৈরিতে ক্যালেন্ডারের ভূমিকা আলোচনা।"
      ]
    },
    {
      id: 7,
      title: "Grammar & Punctuation: Capitalization Rules",
      subtitle: "ব্যাকরণ ও যতিচিহ্ন: দিন ও মাসের নামের বড় হাতের অক্ষর (Capital Letters)",
      phase: "৭. ব্যাকরণ ও যতিচিহ্ন প্রয়োগ (Language Mechanics)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-600 to-indigo-700",
      imageEmoji: "✍️ 🔤 📝",
      sceneType: "grammar",
      hasVisualStage: true,
      content: {
        englishText: [
          "Proper Noun Capitalization Rule:",
          "Always write the first letter of days and months with a CAPITAL letter.",
          "Incorrect: january, february, sunday, friday ❌",
          "Correct: January, February, Sunday, Friday ✔️",
          "Every statement ends with a full stop (.)."
        ],
        banglaExplanation: "ইংরেজি ব্যাকরণে দিন এবং মাসের নামের প্রথম অক্ষর সর্বদা ক্যাপিটাল বা বড় হাতের অক্ষরে লিখতে হয়। বাক্য শেষে ফুলস্টপ (.) দিতে হবে।",
        punctuationDrill: {
          instruction: "Choose the correct punctuation mark to fix each sentence:",
          challenges: [
            {
              id: "pc-1",
              sentenceBefore: "February is a special month with twenty-eight days",
              missingMark: ".",
              meaning: "ফেব্রুয়ারি ২৮ দিনের একটি বিশেষ মাস।",
              options: [".", "?", "!", ","]
            },
            {
              id: "pc-2",
              sentenceBefore: "There are twelve months in an English year",
              missingMark: ".",
              meaning: "একটি ইংরেজি বছরে বারোটি মাস থাকে।",
              options: [".", "?", "!", ","]
            }
          ]
        }
      },
      teacherNotes: "শিক্ষার্থীদের খাতায় ৫টি মাসের নাম লিখতে দিন এবং দেখুন তারা প্রথম অক্ষর ক্যাপিটাল লেটারে লিখেছে কি না।",
      quickTeachingSteps: [
        "ধাপ ১: ক্যাপিটাল লেটারের নিয়মটি বোর্ডে বড় করে লিখে দিন।",
        "ধাপ ২: ছোট হাতের ভুল উদাহরণ দিয়ে সংশোধন করতে বলুন।",
        "ধাপ ৩: যতিচিহ্ন অনুশীলনীটি সম্পন্ন করান।"
      ]
    },
    {
      id: 8,
      title: "Interactive Review Quiz & 20-Mark Worksheet",
      subtitle: "চূড়ান্ত মূল্যায়ন ও অনুশীলন ওয়ার্কশিট (Comprehensive Evaluation)",
      phase: "৮. মূল্যায়ন ও ওয়ার্কশিট (Assessment)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "🎯 📋 🌟",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Wonderful achievement! You have mastered the Calendar and 12 Months.",
          "You know the 12 months, ordinal numbers 1st to 12th, and days in each month.",
          "Now let's complete the final quiz and 20-mark companion worksheet!"
        ],
        banglaExplanation: "দারুণ সাফল্য! তোমরা ক্যালেন্ডার ও ১২ মাসের নিয়ম, অর্ডিনাল সংখ্যা এবং দিনের হিসাব চমৎকারভাবে শিখেছ। এবার চূড়ান্ত কুইজ ও ২০ নম্বরের ওয়ার্কশিটটি পূরণ করো।",
        quiz: {
          question: "Which month is the twelfth and last month of the year?",
          options: ["January", "November", "December", "October"],
          answer: "December",
          hint: "It is the month of winter and Victory Day (16th December)."
        }
      },
      teacherNotes: "শিক্ষার্থীদের প্রশংসা করুন এবং ওয়ার্কশিটটি ডাউনলোড বা প্রিন্ট করে সমাধান জমা দিতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: চূড়ান্ত কুইজটি সমাধান করান।",
        "ধাপ ২: ২০ নম্বরের ওয়ার্কশিটটি বুঝিয়ে দিন।",
        "ধাপ ৩: অর্জিত জ্ঞানের সারসংক্ষেপ পুনরাবৃত্তি করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 3 English Evaluation — The Calendar & 12 Months",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today (Unit 4, Lesson 6)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Multiple Choice Questions (5 Marks)",
        instruction: "সঠিক উত্তরের পাশে টিক (✓) চিহ্ন দাও (প্রতিটি ১ নম্বর):",
        content: [
          "1. How many months are there in an English year?\n   a) 7    b) 10    c) 12    d) 365",
          "2. Which is the first month of the year?\n   a) December    b) March    c) January    d) February",
          "3. How many days are there in a normal year?\n   a) 360    b) 365    c) 366    d) 300",
          "4. How many months have thirty-one days?\n   a) 4    b) 6    c) 7    d) 5",
          "5. Which month is the special month with 28 days?\n   a) April    b) February    c) June    d) November"
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Ordinal Numbers & Words (5 Marks)",
        instruction: "উপযুক্ত অর্ডিনাল সংখ্যা বা শব্দ দিয়ে শূন্যস্থান পূরণ করো:",
        content: [
          "1. January is the ____________________ month of the year.",
          "2. December is the ____________________ and last month of the year.",
          "3. Each week has ____________________ days.",
          "4. Four months have ____________________ days.",
          "5. The calendar helps us plan our school days and ____________________."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে 'True' এবং মিথ্যা হলে 'False' লেখো:",
        content: [
          "1. A calendar shows the days, weeks and months of a year. ( __________ )",
          "2. February has thirty-one days in a normal year. ( __________ )",
          "3. There are seven months with thirty-one days. ( __________ )",
          "4. The name of a month starts with a small letter. ( __________ )",
          "5. April and June have thirty days. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. What does a calendar show?\n   Answer: ________________________________________________________________",
          "2. Name any two months that have thirty days.\n   Answer: ________________________________________________________________",
          "3. Why is February called a special month?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 17: Unit 3, Lesson 4 — Our School Library Rules & Card (pp. 48–52)
// =========================================================================
export const SCHOOL_LIBRARY_SLIDE_DECK: SlideDeck = {
  id: "school-library-card",
  grade: "Class 3 (৩য় শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 3: School and Family",
  lesson: "Lesson 4: Our School Library Rules & Card",
  topic: "Our School Library Rules, Membership Card & Reading Habits (pp. 48–52)",
  category: "english",
  thumbnailEmoji: "📚 🏫 🔖",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Our School Library",
      subtitle: "জ্ঞানের শান্ত নীড়: আমাদের স্কুল লাইব্রেরি ও পাঠকেন্দ্র (Orientation)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-emerald-500 to-teal-600",
      imageEmoji: "🏫 📚 ✨",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello, curious learners! Welcome to Class 3 English.",
          "Today we will step inside our school's bright and quiet library.",
          "Every student in Class 3 has an official library membership card.",
          "Inside the library, we discover magical storybooks and explore new ideas.",
          "Let's learn how to borrow books, follow rules, and keep books clean!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা আমাদের স্কুলের সুন্দর ও শান্ত লাইব্রেরিতে প্রবেশ করব। তৃতীয় শ্রেণির প্রতিটি শিক্ষার্থীর একটি অফিসিয়াল লাইব্রেরি কার্ড থাকে। লাইব্রেরিতে কীভাবে বই ধার করতে হয়, নিয়ম মেনে চলতে হয় এবং বইয়ের যত্ন নিতে হয়—আজ আমরা তা শিখব।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তারা স্কুলের লাইব্রেরিতে গিয়ে কখনো গল্পের বই পড়েছে কি না এবং লাইব্রেরিতে কেন নিঃশব্দে থাকতে হয়।",
      quickTeachingSteps: [
        "ধাপ ১: লাইব্রেরির বুকসেলফ ও রিডিং রুমের ছবি দেখিয়ে আলোচনা শুরু করুন।",
        "ধাপ ২: প্রতিটি শিক্ষার্থীর লাইব্রেরি কার্ডের গুরুত্ব ব্যাখ্যা করুন।",
        "ধাপ ৩: পাঠের মূল উদ্দেশ্যের সাথে পরিচয় করিয়ে দিন।"
      ]
    },
    {
      id: 2,
      title: "Reading & Listening: Library Environment",
      subtitle: "পাঠ্যাংশ পাঠ ও অনুধাবন: লাইব্রেরির পরিবেশ ও নিয়মাবলি (NCTB Text)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-teal-500 to-emerald-600",
      imageEmoji: "📖 🤫 🏢",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Our school has a bright and quiet library.",
          "Every student of Class 3 has a library card with their name, roll number and photograph.",
          "Students can borrow one storybook at a time for seven days.",
          "Inside the library, everyone must maintain strict silence.",
          "We should turn the pages gently and keep the books clean.",
          "Reading books opens our minds and helps us learn many new things about the world."
        ],
        banglaExplanation: "আমাদের স্কুলে একটি উজ্জ্বল ও শান্ত লাইব্রেরি রয়েছে। তৃতীয় শ্রেণির প্রতিটি শিক্ষার্থীর নাম, রোল নম্বর ও ছবিযুক্ত একটি লাইব্রেরি কার্ড আছে। শিক্ষার্থীরা একবারে ৭ দিনের জন্য একটি গল্পের বই ধার নিতে পারে। লাইব্রেরির ভেতরে সবাইকে অবশ্যই গভীর নীরবতা বজায় রাখতে হবে। আমাদের পৃষ্ঠাগুলো আলতোভাবে উল্টানো উচিত এবং বইগুলো পরিষ্কার রাখা উচিত। বই পড়া আমাদের মনকে বিকশিত করে এবং বিশ্ব সম্পর্কে বহু নতুন বিষয় শিখতে সাহায্য করে।"
      },
      teacherNotes: "শিক্ষার্থীদের 'strict silence', 'borrow one storybook at a time', 'opens our minds' অংশগুলোতে বিশেষ মনোযোগ দিয়ে পড়তে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক স্পষ্ট উচ্চারণে অনুচ্ছেদটি পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে প্রতিটি লাইন অনুসরণ করবে।",
        "ধাপ ৩: মূল বাক্যগুলোর অর্থ বুঝিয়ে দিন।"
      ]
    },
    {
      id: 3,
      title: "Vocabulary Workshop: Library & Book Terms",
      subtitle: "শব্দসম্ভার: লাইব্রেরি ও বই পড়ার গুরুত্বপূর্ণ ইংরেজি শব্দ (Key Vocabulary)",
      phase: "৩. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-emerald-600 to-cyan-600",
      imageEmoji: "💡 📚 🏷️",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Learn key words related to library facilities, borrowing, and ethics:"
        ],
        banglaExplanation: "লাইব্রেরি ও বইয়ের যত্ন সম্পর্কিত প্রয়োজনীয় শব্দার্থ ও উচ্চারণ শিখে নিই:",
        vocabulary: [
          {
            word: "Library",
            syllables: ["Li", "brary"],
            phonetic: "/ˈlaɪ.brər.i/",
            meaning: "গ্রন্থাগার / পাঠাগার",
            partOfSpeech: "Noun",
            example: "Our school library has hundreds of interesting storybooks.",
            icon: "🏛️"
          },
          {
            word: "Borrow",
            syllables: ["Bor", "row"],
            phonetic: "/ˈbɒr.əʊ/",
            meaning: "ধার নেওয়া / সাময়িক ব্যবহারার্থে নেওয়া",
            partOfSpeech: "Verb",
            example: "I borrow one storybook from the library.",
            icon: "📖"
          },
          {
            word: "Silence",
            syllables: ["Si", "lence"],
            phonetic: "/ˈsaɪ.ləns/",
            meaning: "নীরবতা / নিঃশব্দতা",
            partOfSpeech: "Noun",
            example: "Maintain strict silence in the reading room.",
            icon: "🤫"
          },
          {
            word: "Gently",
            syllables: ["Gent", "ly"],
            phonetic: "/ˈdʒent.li/",
            meaning: "ধীরে ধীরে / আলতোভাবে",
            partOfSpeech: "Adverb",
            example: "Turn the book pages gently so they do not tear.",
            icon: "🍃"
          },
          {
            word: "Photograph",
            syllables: ["Pho", "to", "graph"],
            phonetic: "/ˈfəʊ.tə.ɡrɑːf/",
            meaning: "আলোকচিত্র / ছবি",
            partOfSpeech: "Noun",
            example: "My library card has my photograph.",
            icon: "🖼️"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের সিলেবল ভাগ করে হাততালি দিয়ে শব্দগুলোর উচ্চারণ অনুশীলন করান।",
      quickTeachingSteps: [
        "ধাপ ১: সিলেবল ও উচ্চারণ কার্ড শিক্ষার্থীদের দেখান।",
        "ধাপ ২: ইংরেজি অর্থ ও বাংলা প্রতিশব্দ বুঝিয়ে বলুন।",
        "ধাপ ৩: বাক্যে প্রয়োগ করে উচ্চারণ ড্রিল করান।"
      ]
    },
    {
      id: 4,
      title: "Library Card: Personal Information & Form Filling",
      subtitle: "লাইব্রেরি কার্ড: তথ্য পূরণ ও কার্ড পরিচিতি (Membership Details)",
      phase: "৪. ফরম পূরণ ও কার্ড পরিচিতি (Practical Application)",
      duration: "৬ মিনিট",
      themeColor: "from-blue-600 to-teal-700",
      imageEmoji: "🪪 📝 👤",
      sceneType: "grammar",
      hasVisualStage: true,
      content: {
        englishText: [
          "A library card contains vital student identity details:",
          "1. Name of the student (e.g. Sadia Sultana)",
          "2. Class and section (Class 3, Lotus)",
          "3. Roll number (e.g. 07)",
          "4. Recent passport-sized photograph",
          "5. Issue date and 7-day borrowing condition."
        ],
        banglaExplanation: "একটি লাইব্রেরি কার্ডে শিক্ষার্থীর নাম, শ্রেণি, শাখা, রোল নম্বর, ছবি ও কার্ড ইস্যুর তারিখ থাকে। এটি দিয়ে শিক্ষার্থীরা বৈধভাবে বই ইস্যু করাতে পারে।"
      },
      teacherNotes: "বোর্ডে একটি নমুনা লাইব্রেরি কার্ড এঁকে শিক্ষার্থীদের তাদের নিজের নাম ও রোল নম্বর দিয়ে ফরমটি পূরণ করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে লাইব্রেরি কার্ডটি প্রদর্শন করুন।",
        "ধাপ ২: প্রতিটি ফিল্ডের (Name, Class, Roll, Photo) ইংরেজি অর্থ আলোচনা করুন।",
        "ধাপ ৩: শিক্ষার্থীদের নিজের তথ্য দিয়ে কার্ড বানাতে উৎসাহিত করুন।"
      ]
    },
    {
      id: 5,
      title: "The 7-Day Borrowing & Return Rule",
      subtitle: "বই ধার ও ফেরতের ৭ দিনের নিয়ম (Borrowing Ethics)",
      phase: "৫. বই ধার ও সময়ানুবর্তিতা (Borrowing Procedure)",
      duration: "৫ মিনিট",
      themeColor: "from-amber-600 to-emerald-700",
      imageEmoji: "🗓️ ⏳ 📚",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Borrowing Rules to Always Remember:",
          "Rule 1: Students can borrow one storybook at a time.",
          "Rule 2: You can keep the book for seven (7) days.",
          "Rule 3: Return the book on or before the due date so other friends can read it.",
          "Returning books on time is a hallmark of good student character."
        ],
        banglaExplanation: "বই ধারের গুরুত্বপূর্ণ নিয়মাবলি: একবারে শুধুমাত্র ১টি গল্পের বই ধার নেওয়া যায়, সর্বোচ্চ ৭ দিন কাছে রাখা যায় এবং নির্ধারিত তারিখের মধ্যে অবশ্যই তা লাইব্রেরিয়ানের কাছে ফেরত দিতে হয়।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রশ্ন করুন: যদি কেউ বই সময়মতো ফেরত না দেয়, তবে অন্য শিক্ষার্থীদের কী সমস্যা হতে পারে?",
      quickTeachingSteps: [
        "ধাপ ১: ৭ দিনের সময়সীমা ক্যালেন্ডার দেখিয়ে স্পষ্ট করুন।",
        "ধাপ ২: বই ফেরত দেওয়ার প্রক্রিয়াটি অনুশীলন করান।",
        "ধাপ ৩: দায়িত্বশীলতার গুরুত্ব তুলে ধরুন।"
      ]
    },
    {
      id: 6,
      title: "Library Ethics: Silence & Proper Conduct",
      subtitle: "লাইব্রেরির শিষ্টাচার ও আচরণবিধি (Strict Silence & Care)",
      phase: "৬. লাইব্রেরি আচরণবিধি (Library Manners)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-600 to-indigo-700",
      imageEmoji: "🤫 🚫 🧼",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Library Etiquette Guidelines:",
          "1. Maintain strict silence: Whispering or shouting disturbs readers.",
          "2. Walk quietly and push your chair in gently.",
          "3. No food or drinks are allowed near books.",
          "4. Keep your school bag in the designated bag rack."
        ],
        banglaExplanation: "লাইব্রেরির শিষ্টাচার: ভেতরে সম্পূর্ণ নীরবতা রক্ষা করতে হবে, কথা বলা বা চিৎকার করা যাবে না, পা টিপে নিঃশব্দে হাঁটতে হবে এবং বইয়ের পাশে কোনো প্রকার খাবার খাওয়া যাবে না।",
        sortingGame: {
          instruction: "Sort the actions into 'Good Library Habits' and 'Forbidden in Library':",
          categories: {
            cat1: { id: "good-habits", label: "Good Library Habits (উত্তম আচরণ)", icon: "✔️", theme: "emerald" },
            cat2: { id: "forbidden", label: "Forbidden in Library (নিষিদ্ধ কাজ)", icon: "❌", theme: "rose" }
          },
          items: [
            { id: "lib-1", label: "Maintaining strict silence", category: "good-habits", icon: "🤫" },
            { id: "lib-2", label: "Turning pages gently", category: "good-habits", icon: "📖" },
            { id: "lib-3", label: "Shouting or running", category: "forbidden", icon: "🏃" },
            { id: "lib-4", label: "Eating snacks near books", category: "forbidden", icon: "🍪" },
            { id: "lib-5", label: "Using a neat bookmark", category: "good-habits", icon: "🔖" },
            { id: "lib-6", label: "Tearing pages or scribbling", category: "forbidden", icon: "🖍️" }
          ]
        }
      },
      teacherNotes: "শিক্ষার্থীদের ক্লাসরুমে ২ মিনিটের জন্য সম্পূর্ণ নীরবতা পালন করিয়ে লাইব্রেরির পরিবেশের অভিজ্ঞতা দিন।",
      quickTeachingSteps: [
        "ধাপ ১: শিষ্টাচারের নিয়মগুলো পয়েন্ট আকারে উপস্থাপন করুন।",
        "ধাপ ২: ভালো আচরণ বনাম নিষিদ্ধ কাজের ড্র্যাগ অ্যান্ড ড্রপ বাছাই করান।",
        "ধাপ ৩: নীরবতার গুরুত্ব নিয়ে মন্তব্য করুন।"
      ]
    },
    {
      id: 7,
      title: "Grammar Workshop: Modal Verbs (Must & Should)",
      subtitle: "ব্যাকরণ চর্চা: বাধ্যবাধকতা ও উপদেশে 'Must' ও 'Should'-এর সঠিক প্রয়োগ",
      phase: "৭. ব্যাকরণ ও যতিচিহ্ন প্রয়োগ (Language Mechanics)",
      duration: "৫ মিনিট",
      themeColor: "from-teal-600 to-emerald-700",
      imageEmoji: "⚖️ ✍️ 📋",
      sceneType: "grammar",
      hasVisualStage: true,
      content: {
        englishText: [
          "Using Modal Verbs: Must vs Should",
          "1. 'Must' expresses absolute necessity / strict obligation:",
          "   'Inside the library, everyone must maintain strict silence.'",
          "2. 'Should' expresses advice or moral duty:",
          "   'We should turn the pages gently and keep the books clean.'",
          "Every rule sentence begins with a capital letter and ends with a full stop."
        ],
        banglaExplanation: "'Must' দিয়ে অবশ্য পালনীয় বাধ্যবাধকতা বোঝায় (অবশ্যই করতে হবে) এবং 'Should' দিয়ে উচিত বা উপদেশমূলক কাজ নির্দেশ করা হয়।",
        punctuationDrill: {
          instruction: "Select the correct punctuation mark to complete each library rule:",
          challenges: [
            {
              id: "lc-1",
              sentenceBefore: "Inside the library everyone must maintain strict silence",
              missingMark: ".",
              meaning: "লাইব্রেরির ভেতরে সবাইকে অবশ্যই গভীর নীরবতা বজায় রাখতে হবে।",
              options: [".", "?", "!", ","]
            },
            {
              id: "lc-2",
              sentenceBefore: "We should turn the pages gently and keep the books clean",
              missingMark: ".",
              meaning: "আমাদের বইয়ের পৃষ্ঠা আলতো করে উল্টানো উচিত এবং বই পরিষ্কার রাখা উচিত।",
              options: [".", "?", "!", ","]
            }
          ]
        }
      },
      teacherNotes: "শিক্ষার্থীদের নিজের ভাষায় 'must' এবং 'should' দিয়ে আরও দুটি করে বাক্য তৈরি করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: Must ও Should-এর মধ্যকার পার্থক্য স্পষ্ট করে বোঝান।",
        "ধাপ ২: যতিচিহ্ন চ্যালেঞ্জগুলো সমাধান করান।",
        "ধাপ ৩: সঠিক উচ্চারণে বাক্যগুলো পড়তে বলুন।"
      ]
    },
    {
      id: 8,
      title: "Interactive Review Quiz & 20-Mark Worksheet",
      subtitle: "চূড়ান্ত মূল্যায়ন ও অনুশীলন ওয়ার্কশিট (Comprehensive Evaluation)",
      phase: "৮. মূল্যায়ন ও ওয়ার্কশিট (Assessment)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "🎯 📋 🌟",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed the School Library Rules and Card lesson.",
          "You know how to fill a library card, borrow books responsibly, and maintain silence.",
          "Now let's complete the final quiz and 20-mark companion worksheet!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা আমাদের স্কুল লাইব্রেরির নিয়ম, কার্ডের ব্যবহার ও বই পড়ার অভ্যাস চমৎকারভাবে আয়ত্ত করেছ। এবার চূড়ান্ত কুইজ ও ২০ নম্বরের ওয়ার্কশিটটি পূরণ করো।",
        quiz: {
          question: "For how many days can a student borrow a storybook from the school library?",
          options: ["3 days", "5 days", "7 days", "14 days"],
          answer: "7 days",
          hint: "The text says: 'Students can borrow one storybook at a time for seven days.'"
        }
      },
      teacherNotes: "শিক্ষার্থীদের প্রশংসা করুন এবং ওয়ার্কশিটটি প্রিন্ট করে স্কুলের মূল্যায়নের জন্য জমা দিতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: চূড়ান্ত কুইজটি সমাধান করান।",
        "ধাপ ২: ২০ নম্বরের ওয়ার্কশিটের ৪টি সেকশন বুঝিয়ে দিন।",
        "ধাপ ৩: নিয়মিত বই পড়ার অভ্যাস গড়ে তোলার শপথ নিন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 3 English Evaluation — Our School Library Rules & Card",
    classGrade: "Class 3 (৩য় শ্রেণি)",
    subject: "English for Today (Unit 3, Lesson 4)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Multiple Choice Questions (5 Marks)",
        instruction: "সঠিক উত্তরের পাশে টিক (✓) চিহ্ন দাও (প্রতিটি ১ নম্বর):",
        content: [
          "1. What kind of library does the school have?\n   a) Dark and noisy    b) Bright and quiet    c) Small and dusty    d) Empty",
          "2. What information is on a student's library card?\n   a) Only age    b) Name, roll and photo    c) Phone number only    d) Blood group",
          "3. How many storybooks can a student borrow at a time?\n   a) One    b) Two    c) Three    d) Four",
          "4. For how many days can students keep a borrowed book?\n   a) 3 days    b) 5 days    c) 7 days    d) 10 days",
          "5. How should we turn the pages of a book?\n   a) Roughly    b) Fast    c) Gently    d) Carelessly"
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Library Words (5 Marks)",
        instruction: "পাঠ্যাংশ থেকে উপযুক্ত শব্দ দিয়ে শূন্যস্থান পূরণ করো:",
        content: [
          "1. Our school has a bright and ____________________ library.",
          "2. Every student of Class 3 has a library ____________________.",
          "3. Students can borrow one storybook for ____________________ days.",
          "4. Inside the library, everyone must maintain strict ____________________.",
          "5. Reading books opens our ____________________."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে 'True' এবং মিথ্যা হলে 'False' লেখো:",
        content: [
          "1. The school library is bright and quiet. ( __________ )",
          "2. Students can make loud noise inside the library. ( __________ )",
          "3. We should keep the library books clean. ( __________ )",
          "4. A library card has the student's photograph. ( __________ )",
          "5. Reading books helps us learn new things. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. What does a student's library card contain?\n   Answer: ________________________________________________________________",
          "2. What is the rule about silence inside the library?\n   Answer: ________________________________________________________________",
          "3. Why should we read books?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 18: Class 4, Unit 2, Lesson 1 — Mita's Daily Routine (pp. 6–9)
// =========================================================================
export const MITAS_DAY_SLIDE_DECK: SlideDeck = {
  id: "mitas-day",
  grade: "Class 4 (৪র্থ শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 2: From Morning Till Night (Mita's Day)",
  lesson: "Lesson 1: Mita's Day (A, B, C)",
  topic: "Mita's Daily Routine, Clock Times & Healthy Habits (pp. 6–9)",
  category: "english",
  thumbnailEmoji: "⏰ 🎒 👵",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Mita's Daily Routine",
      subtitle: "সকাল থেকে রাত: মিতার সুশৃঙ্খল দিনলিপি ও সময়জ্ঞান (Orientation)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-amber-500 to-orange-600",
      imageEmoji: "⏰ 🌅 👧",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello, active learners! Welcome to Class 4 English.",
          "Today we will follow Mita through her daily routine from morning till night.",
          "Mita is a disciplined student in Class 4.",
          "She wakes up early, brushes her teeth, and walks to school.",
          "Let's explore how keeping a daily routine helps us stay healthy and smart!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা চতুর্থ শ্রেণির পাঠ্যবইয়ের মিতার দৈনন্দিন রুটিন সম্পর্কে জানব। মিতা চতুর্থ শ্রেণির একজন মনোযোগী ছাত্রী। সে ভোরে ঘুম থেকে ওঠে, দাঁত ব্রাশ করে, সময়মতো স্কুলে যায় এবং নানির যত্ন নেয়। প্রতিদিনের সঠিক সময়জ্ঞান ও সুঅভ্যাস কীভাবে আমাদের জীবনকে সুন্দর করে, তা আমরা শিখব।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তারা সকালে কয়টায় ঘুম থেকে ওঠে এবং স্কুলের পর কী করে। ঘড়ি দেখে সময় বলতে পারে কি না তা যাচাই করুন।",
      quickTeachingSteps: [
        "ধাপ ১: একটি দেয়াল ঘড়ির ছবি দেখিয়ে সময় সম্পর্কে প্রশ্ন করুন।",
        "ধাপ ২: মিতার পরিচয় ও দৈনন্দিন রুটিনের গুরুত্ব তুলে ধরুন।",
        "ধাপ ৩: মূল পাঠের সাথে শিক্ষার্থীদের সম্পৃক্ত করুন।"
      ]
    },
    {
      id: 2,
      title: "Reading & Listening: Mita's Day",
      subtitle: "পাঠ্যাংশ পাঠ ও অনুধাবন: মিতার প্রতিদিনের কর্মসূচি (NCTB Text)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-orange-500 to-amber-600",
      imageEmoji: "📖 🍳 🎒",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Mita is in Class 4. She gets up at six o'clock in the morning.",
          "She washes her face. She has breakfast at seven o'clock.",
          "Then she brushes her teeth. She leaves home for school at nine o'clock.",
          "She walks to her school.",
          "After school, at three o'clock, she visits her grandmother.",
          "Then, Mita returns home at five o'clock.",
          "In the evening, she does her homework and goes to bed at ten o'clock."
        ],
        banglaExplanation: "মিতা চতুর্থ শ্রেণিতে পড়ে। সে সকাল ছয়টায় ঘুম থেকে ওঠে। সে মুখ ধোয়। সে সকাল সাতটায় নাশতা করে। তারপর সে দাঁত ব্রাশ করে। সে সকাল নয়টায় স্কুলের উদ্দেশ্যে বাড়ি ছাড়ে। সে হেঁটে স্কুলে যায়। স্কুল ছুটির পর, বেলা তিনটায় সে তার নানির বাড়িতে যায়। তারপর মিতা বিকেল পাঁচটায় বাড়ি ফিরে আসে। সন্ধ্যায় সে স্কুলের বাড়ির কাজ করে এবং রাত দশটায় ঘুমাতে যায়।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রতিটি সময় বাচক শব্দ এবং ক্রিয়াপদের উচ্চারণের প্রতি বিশেষ লক্ষ্য রাখতে বলুন: 'gets up', 'has breakfast', 'leaves', 'returns' ইত্যাদি।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক নিজে স্পষ্ট ও সঠিক উচ্চারণে টেক্সটটি পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা শিক্ষকের সাথে বাক্যগুলো পুনরাবৃত্তি করবে।",
        "ধাপ ৩: সময়ের সাথে সাথে মিতার কাজের তালিকা মিলাতে বলুন।"
      ]
    },
    {
      id: 3,
      title: "Vocabulary Workshop: Daily Life & Actions",
      subtitle: "শব্দসম্ভার: দৈনন্দিন কাজ ও সময়ের গুরুত্বপূর্ণ ইংরেজি শব্দ (Key Vocabulary)",
      phase: "৩. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-amber-600 to-yellow-600",
      imageEmoji: "💡 📚 🏷️",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Learn key action words related to daily routine and time:"
        ],
        banglaExplanation: "দৈনন্দিন কাজের সাথে জড়িত ইংরেজি শব্দগুলোর সঠিক উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Routine",
            syllables: ["Rou", "tine"],
            phonetic: "/ruːˈtiːn/",
            meaning: "নিয়মিত কাজের তালিকা / দিনলিপি",
            partOfSpeech: "Noun",
            example: "Mita follows a healthy daily routine.",
            icon: "📋"
          },
          {
            word: "Breakfast",
            syllables: ["Break", "fast"],
            phonetic: "/ˈbrek.fəst/",
            meaning: "সকালের প্রথম আহার / নাশতা",
            partOfSpeech: "Noun",
            example: "She has breakfast at seven o'clock.",
            icon: "🍳"
          },
          {
            word: "Leaves",
            syllables: ["Leaves"],
            phonetic: "/liːvz/",
            meaning: "ত্যাগ করে / রওনা হয়",
            partOfSpeech: "Verb",
            example: "Mita leaves home for school at nine o'clock.",
            icon: "🚪"
          },
          {
            word: "Grandmother",
            syllables: ["Grand", "moth", "er"],
            phonetic: "/ˈɡræn.mʌð.ər/",
            meaning: "দাদি বা নানি",
            partOfSpeech: "Noun",
            example: "She visits her loving grandmother after school.",
            icon: "👵"
          },
          {
            word: "Returns",
            syllables: ["Re", "turns"],
            phonetic: "/rɪˈtɜːnz/",
            meaning: "ফিরে আসে / প্রত্যাবর্তন করে",
            partOfSpeech: "Verb",
            example: "Mita returns home at five o'clock.",
            icon: "🏡"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের 'Breakfast' শব্দের উচ্চারণ অনুশীলন করান—উচ্চারণ 'ব্রেক-ফাস্ট' (ব্রেকফাস্ট), 'ব্রেক-ফেস্ট' নয়।",
      quickTeachingSteps: [
        "ধাপ ১: সিলেবল কার্ড প্রদর্শন ও হাততালি দিয়ে প্র্যাকটিস।",
        "ধাপ ২: প্রতিটি শব্দের বাংলা প্রতিশব্দ ব্যাখ্যা করা।",
        "ধাপ ৩: ছোট ছোট বাক্যে শব্দের ব্যবহার শেখানো।"
      ]
    },
    {
      id: 4,
      title: "Clock & Time-Telling Simulator",
      subtitle: "ঘড়ি ও সময় বলার ইংরেজি কৌশল (Telling Time with o'clock)",
      phase: "৪. সময় ধারণা ও ঘড়ির কাঁটা (Time Concept)",
      duration: "৬ মিনিট",
      themeColor: "from-sky-600 to-indigo-700",
      imageEmoji: "⏰ 🕒 ☀️",
      sceneType: "grammar",
      hasVisualStage: true,
      content: {
        englishText: [
          "How to tell time in English:",
          "When the minute hand is at 12, we use 'o'clock':",
          "6:00 -> It is six o'clock (Morning wake up)",
          "7:00 -> It is seven o'clock (Breakfast time)",
          "9:00 -> It is nine o'clock (School time)",
          "3:00 -> It is three o'clock (Visit grandmother)",
          "10:00 -> It is ten o'clock (Bedtime)"
        ],
        banglaExplanation: "ঘড়ির মিনিটের কাঁটা যখন ১২-এর ঘরে থাকে, তখন ঘণ্টার সংখ্যার পর 'o'clock' ব্যবহার করা হয়। যেমন: ছয়টা বাজে = 'It is six o'clock'।"
      },
      teacherNotes: "শিক্ষার্থীদের বলুন: সময়ের পূর্বে সর্বদা Preposition 'at' বসে (যেমন: at six o'clock, at night)।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে ঘড়ির কাঁটা ঘুরিয়ে সময় দেখান।",
        "ধাপ ২: বিভিন্ন সময় জিজ্ঞাসা করুন: 'What time is it?'",
        "ধাপ ৩: 'It is ... o'clock' কাঠামোতে উত্তর দিতে উৎসাহিত করুন।"
      ]
    },
    {
      id: 5,
      title: "Routine Sequence & Sorting Game",
      subtitle: "সকাল থেকে রাত: কাজের ক্রমবিন্যাস খেলা (Daily Routine Sequencing)",
      phase: "৫. ক্রমবিন্যাস ও বিশ্লেষণ (Sequencing Activity)",
      duration: "৫ মিনিট",
      themeColor: "from-teal-600 to-emerald-700",
      imageEmoji: "🌅 🌇 🌙",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Sort Mita's activities into Morning, Afternoon, and Evening/Night:",
          "Morning: Gets up, washes face, has breakfast, brushes teeth, leaves for school.",
          "Afternoon: Visits grandmother, returns home.",
          "Evening & Night: Does homework, goes to bed."
        ],
        banglaExplanation: "মিতার কাজগুলোকে সকাল, দুপুর ও সন্ধ্যা/রাতের ভাগে সঠিকভাবে শ্রেণিবিন্যাস করি।",
        sortingGame: {
          instruction: "Sort the activities into Morning Routine and Afternoon/Night Routine:",
          categories: {
            cat1: { id: "morning", label: "Morning Routine (সকালের কাজ)", icon: "🌅", theme: "amber" },
            cat2: { id: "afternoon-night", label: "Afternoon & Night (বিকেল ও রাতের কাজ)", icon: "🌙", theme: "indigo" }
          },
          items: [
            { id: "mr-1", label: "Washes face & has breakfast", category: "morning", icon: "🍳" },
            { id: "mr-2", label: "Brushes teeth & goes to school", category: "morning", icon: "🎒" },
            { id: "mr-3", label: "Visits grandmother at 3 o'clock", category: "afternoon-night", icon: "👵" },
            { id: "mr-4", label: "Returns home at 5 o'clock", category: "afternoon-night", icon: "🏡" },
            { id: "mr-5", label: "Does homework in evening", category: "afternoon-night", icon: "📖" },
            { id: "mr-6", label: "Goes to bed at 10 o'clock", category: "afternoon-night", icon: "🌙" }
          ]
        }
      },
      teacherNotes: "শিক্ষার্থীদের বলুন: সময়ের ধারাবাহিকতা রক্ষা করা একটি বড় শৃঙ্খলা।",
      quickTeachingSteps: [
        "ধাপ ১: সকাল ও রাতের কাজের পার্থক্য আলোচনা করুন।",
        "ধাপ ২: সর্টিং গেমটি সমাধান করান।",
        "ধাপ ৩: সঠিক অর্ডারে বাক্যগুলো বলতে দিন।"
      ]
    },
    {
      id: 6,
      title: "Speaking & Role-play: Daily Habits",
      subtitle: "কথোপকথন ও প্রশ্নোত্তরে দৈনন্দিন রুটিন চর্চা (Speaking Practice)",
      phase: "৬. মৌখিক কথোপকথন (Dialogue & Role-play)",
      duration: "৪ মিনিট",
      themeColor: "from-cyan-600 to-blue-700",
      imageEmoji: "🗣️ 💬 🤝",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice the dialogue with your partner:",
          "Raju: 'When do you get up, Mita?'",
          "Mita: 'I get up at six o'clock in the morning.'",
          "Raju: 'What time do you go to school?'",
          "Mita: 'I leave home for school at nine o'clock.'",
          "Raju: 'When do you go to bed?'",
          "Mita: 'I go to bed at ten o'clock.'"
        ],
        banglaExplanation: "বন্ধুর সাথে ইংরেজিতে দৈনন্দিন কাজের সময় নিয়ে প্রশ্ন ও উত্তর অনুশীলন করো। 'When do you...' দিয়ে প্রশ্ন করতে হয়।"
      },
      teacherNotes: "শিক্ষার্থীদের মাইক্রোফোন অন করে প্রতিটি বাক্য স্পষ্টভাবে বলার সুযোগ দিন।",
      quickTeachingSteps: [
        "ধাপ ১: দুইজন শিক্ষার্থীকে রাজু ও মিতার ভূমিকায় ডায়লগ বলতে দিন।",
        "ধাপ ২: প্রশ্ন করার ধরণ ও উত্তরের সুর (intonation) লক্ষ্য করুন।",
        "ধাপ ৩: নিজের আসল রুটিন নিয়েও প্রশ্ন-উত্তর করান।"
      ]
    },
    {
      id: 7,
      title: "Grammar & Punctuation: Present Simple & Prepositions",
      subtitle: "ব্যাকরণ ও যতিচিহ্ন: Third Person Singular '-s/-es' এবং 'at'-এর নিয়ম",
      phase: "৭. ব্যাকরণ ও যতিচিহ্ন প্রয়োগ (Language Mechanics)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-600 to-indigo-700",
      imageEmoji: "✍️ 🔤 📝",
      sceneType: "grammar",
      hasVisualStage: true,
      content: {
        englishText: [
          "Key Grammar Rules to Remember:",
          "1. Third Person Singular (He / She / Mita): Verb adds '-s' or '-es':",
          "   She gets up, she washes, she brushes, she leaves, she returns.",
          "2. Preposition of Time: Always use 'at' before exact clock times:",
          "   at six o'clock, at nine o'clock, at ten o'clock.",
          "Every sentence starts with a CAPITAL letter and ends with a full stop (.)."
        ],
        banglaExplanation: "Third Person Singular (She / Mita) হলে Present Indefinite Tense-এ ভার্বের শেষে 's' বা 'es' যোগ হয়। যেমন: wash -> washes, brush -> brushes, go -> goes। নির্দিষ্ট সময়ের পূর্বে 'at' বসে।",
        punctuationDrill: {
          instruction: "Fix each sentence by selecting the correct punctuation mark:",
          challenges: [
            {
              id: "md-1",
              sentenceBefore: "Mita gets up at six o'clock in the morning",
              missingMark: ".",
              meaning: "মিতা সকাল ছয়টায় ঘুম থেকে ওঠে।",
              options: [".", "?", "!", ","]
            },
            {
              id: "md-2",
              sentenceBefore: "When does Mita leave home for school",
              missingMark: "?",
              meaning: "মিতা কখন স্কুলের উদ্দেশ্যে বাড়ি ছাড়ে?",
              options: ["?", ".", "!", ","]
            }
          ]
        }
      },
      teacherNotes: "শিক্ষার্থীদের খাতায় ৫টি বাক্যে 'She + verb-s + at + time' স্ট্রাকচার লিখে অনুশীলন করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: বোর্ডে 'wash -> washes', 'brush -> brushes' রূপান্তর দেখান।",
        "ধাপ ২: 'at'-এর ব্যবহার স্পষ্ট করুন।",
        "ধাপ ৩: যতিচিহ্ন ড্রিলটি সম্পন্ন করান।"
      ]
    },
    {
      id: 8,
      title: "Interactive Review Quiz & 20-Mark Worksheet",
      subtitle: "চূড়ান্ত মূল্যায়ন ও অনুশীলন ওয়ার্কশিট (Comprehensive Assessment)",
      phase: "৮. মূল্যায়ন ও ওয়ার্কশিট (Assessment)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "🎯 📋 🌟",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Outstanding effort! You have mastered Mita's Daily Routine and Time-Telling.",
          "You know how to use clock times, routine action verbs, and prepositions.",
          "Now let's complete the final quiz and 20-mark companion worksheet!"
        ],
        banglaExplanation: "অসাধারণ সাফল্য! তোমরা মিতার দিনলিপি, সময় বলার নিয়ম এবং নিয়মিত স্বাস্থ্যকর অভ্যাসগুলো চমৎকারভাবে আয়ত্ত করেছ। এবার চূড়ান্ত কুইজ ও ২০ নম্বরের ওয়ার্কশিটটি পূরণ করো।",
        quiz: {
          question: "When does Mita go to bed at night?",
          options: ["At eight o'clock", "At nine o'clock", "At ten o'clock", "At eleven o'clock"],
          answer: "At ten o'clock",
          hint: "The text says: 'In the evening, she does her homework and goes to bed at ten o'clock.'"
        }
      },
      teacherNotes: "শিক্ষার্থীদের প্রশংসা করুন এবং ওয়ার্কশিটটি ডাউনলোড বা প্রিন্ট করে সমাধান জমা দিতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: চূড়ান্ত কুইজটি সমাধান করান।",
        "ধাপ ২: ২০ নম্বরের ওয়ার্কশিটটির প্রশ্নগুলো বুঝিয়ে দিন।",
        "ধাপ ৩: নিয়মিত রুটিন মেনে চলার পরামর্শ দিয়ে পাঠ শেষ করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 4 English Evaluation — Mita's Daily Routine",
    classGrade: "Class 4 (৪র্থ শ্রেণি)",
    subject: "English for Today (Unit 2, Lesson 1)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Multiple Choice Questions (5 Marks)",
        instruction: "সঠিক উত্তরের পাশে টিক (✓) চিহ্ন দাও (প্রতিটি ১ নম্বর):",
        content: [
          "1. What class is Mita in?\n   a) Class 2    b) Class 3    c) Class 4    d) Class 5",
          "2. When does Mita get up in the morning?\n   a) At 5 o'clock    b) At 6 o'clock    c) At 7 o'clock    d) At 8 o'clock",
          "3. What does Mita do at seven o'clock?\n   a) Leaves for school    b) Has breakfast    c) Visits grandmother    d) Goes to bed",
          "4. How does Mita go to school?\n   a) By bus    b) By rickshaw    c) She walks    d) By bicycle",
          "5. Who does Mita visit at three o'clock after school?\n   a) Her teacher    b) Her grandmother    c) Her aunt    d) Her friend"
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Routine Words (5 Marks)",
        instruction: "নিচের বাক্যগুলোতে উপযুক্ত শব্দ বা সময় বসিয়ে শূন্যস্থান পূরণ করো:",
        content: [
          "1. Mita gets up at ____________________ o'clock in the morning.",
          "2. After having breakfast, she brushes her ____________________.",
          "3. She leaves home for school at ____________________ o'clock.",
          "4. Mita returns home at ____________________ o'clock in the afternoon.",
          "5. She goes to bed at ____________________ o'clock at night."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে 'True' এবং মিথ্যা হলে 'False' লেখো:",
        content: [
          "1. Mita is in Class 5. ( __________ )",
          "2. She walks to her school. ( __________ )",
          "3. Mita visits her grandmother at three o'clock. ( __________ )",
          "4. She does her homework in the morning. ( __________ )",
          "5. She goes to bed at nine o'clock. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. When does Mita wake up in the morning?\n   Answer: ________________________________________________________________",
          "2. What does Mita do after having breakfast?\n   Answer: ________________________________________________________________",
          "3. When does Mita do her homework and go to sleep?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 19: Class 4, Unit 3, Lesson 1 — Sagar and His Family (pp. 12–15)
// =========================================================================
export const SAGAR_FAMILY_SLIDE_DECK: SlideDeck = {
  id: "sagar-family",
  grade: "Class 4 (৪র্থ শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 3: Family (Sagar and His Family)",
  lesson: "Lesson 1: Sagar and His Family (A, B, C)",
  topic: "Sagar and His Family, Occupations & Wonderful Garden (pp. 12–15)",
  category: "english",
  thumbnailEmoji: "👨‍👩‍👧‍👦 🪴 🥧",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Sagar and His Family",
      subtitle: "সাগরের আন্তরিক পরিবার ও পারস্পরিক সহযোগিতা (Warm-up & Orientation)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-emerald-500 to-teal-600",
      imageEmoji: "👨‍👩‍👧‍👦 👦 👧",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello, wonderful students! Welcome to Class 4 English.",
          "Today we will meet Sagar and his loving joint family.",
          "Sagar is nine years old and reads in Class 4.",
          "He lives with his little sister Keya, parents, and loving grandparents.",
          "Let's explore each family member's profession, role, and special talents!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা চতুর্থ শ্রেণির সাগরের পরিবারের সাথে পরিচিত হব। সাগরের বয়স ৯ বছর এবং সে চতুর্থ শ্রেণিতে পড়ে। সাগরের একটি ছোট বোন কেয়া, আইনজীবী বাবা, গৃহিণী মা এবং স্নেহময় দাদা-দাদি আছেন। পরিবারের প্রতিটি সদস্যের পারস্পরিক মমতা ও সহযোগিতা নিয়ে আমরা আজ শিখব।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তাদের পরিবারে কয়জন সদস্য আছেন এবং দাদি বা নানির হাতের কোন খাবার তাদের সবচেয়ে প্রিয়।",
      quickTeachingSteps: [
        "ধাপ ১: পরিবারের সদস্যদের ছবি প্রদর্শন করে আলোচনা শুরু করুন।",
        "ধাপ ২: সাগরের পরিচয় ও পরিবারের ৬ সদস্যের নাম বলুন।",
        "ধাপ ৩: মূল পাঠের সাথে শিক্ষার্থীদের সংযুক্ত করুন।"
      ]
    },
    {
      id: 2,
      title: "Reading & Listening: Sagar's Family",
      subtitle: "পাঠ্যাংশ পাঠ ও অনুধাবন: সাগরের পরিবারের বর্ণনা (NCTB Text)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-teal-500 to-emerald-600",
      imageEmoji: "📖 🪴 🥧",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hi! I'm Sagar. I'm in Class 4. I'm nine years old.",
          "I have a little sister named Keya. She is only three years old.",
          "My father is a lawyer and my mother is a homemaker.",
          "My grandfather was a school teacher, but he doesn't work now.",
          "My grandfather helps me with my homework and plays with me.",
          "My grandmother works at home. She makes the best pithes in the world!",
          "She also helps my mother in the garden. My mother has a wonderful garden.",
          "She grows the best tomatoes and cucumbers in the neighborhood. They are delicious!"
        ],
        banglaExplanation: "হ্যালো! আমি সাগর। আমি চতুর্থ শ্রেণিতে পড়ি। আমার বয়স নয় বছর। কেয়া নামে আমার একটি ছোট বোন আছে, যার বয়স মাত্র তিন বছর। আমার বাবা একজন আইনজীবী এবং আমার মা একজন গৃহিণী। আমার দাদা একজন স্কুল শিক্ষক ছিলেন, কিন্তু এখন অবসরপ্রাপ্ত। তিনি আমার পড়ার কাজে সাহায্য করেন এবং আমার সাথে খেলেন। আমার দাদি বাড়িতে কাজ করেন। তিনি পৃথিবীর সেরা পিঠা বানান! তিনি বাগানে আমার মাকে সাহায্য করেন। আমার মায়ের একটি চমৎকার বাগান আছে। তিনি পাড়ার সবচেয়ে সেরা টমেটো ও শসা ফলান, যা খুবই সুস্বাদু!"
      },
      teacherNotes: "শিক্ষার্থীদের 'lawyer', 'homemaker', 'pithes', 'cucumbers', 'delicious' শব্দগুলোর শুদ্ধ উচ্চারণের প্রতি খেয়াল রাখতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক স্পষ্ট স্বরে অনুচ্ছেদটি পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে বাক্যগুলো পাঠ করবে।",
        "ধাপ ৩: পরিবারের সদস্যদের ভূমিকা চিহ্নিত করান।"
      ]
    },
    {
      id: 3,
      title: "Vocabulary Workshop: Family & Professions",
      subtitle: "শব্দসম্ভার: পরিবার, পেশা ও বাগানের গুরুত্বপূর্ণ ইংরেজি শব্দ (Key Vocabulary)",
      phase: "৩. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-emerald-600 to-cyan-600",
      imageEmoji: "💡 📚 🏷️",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Master key vocabulary related to professions, family bonds, and gardening:"
        ],
        banglaExplanation: "পেশা ও পরিবারের সাথে সম্পর্কিত ইংরেজি শব্দার্থ ও উচ্চারণ শিখে নিই:",
        vocabulary: [
          {
            word: "Lawyer",
            syllables: ["Law", "yer"],
            phonetic: "/ˈlɔɪ.ər/",
            meaning: "আইনজীবী / উকিল",
            partOfSpeech: "Noun",
            example: "Sagar's father is a lawyer.",
            icon: "⚖️"
          },
          {
            word: "Homemaker",
            syllables: ["Home", "mak", "er"],
            phonetic: "/ˈhəʊmˌmeɪ.kər/",
            meaning: "গৃহিণী / গৃহপরিচালনাকারী",
            partOfSpeech: "Noun",
            example: "His mother is a caring homemaker.",
            icon: "🏡"
          },
          {
            word: "Cucumber",
            syllables: ["Cu", "cum", "ber"],
            phonetic: "/ˈkjuː.kʌm.bər/",
            meaning: "শসা",
            partOfSpeech: "Noun",
            example: "Fresh cucumbers grow in the garden.",
            icon: "🥒"
          },
          {
            word: "Delicious",
            syllables: ["De", "li", "cious"],
            phonetic: "/dɪˈlɪʃ.əs/",
            meaning: "সুস্বাদু / অতি উপাদেয়",
            partOfSpeech: "Adjective",
            example: "Grandmother makes delicious pithes.",
            icon: "🥧"
          },
          {
            word: "Neighborhood",
            syllables: ["Neigh", "bor", "hood"],
            phonetic: "/ˈneɪ.bə.hʊd/",
            meaning: "প্রতিবেশ / পাড়া",
            partOfSpeech: "Noun",
            example: "They have the best garden in the neighborhood.",
            icon: "🏘️"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের 'Delicious' এবং 'Cucumber' সিলেবল ভাগ করে হাততালি দিয়ে উচ্চারণ প্র্যাকটিস করান।",
      quickTeachingSteps: [
        "ধাপ ১: সিলেবল কার্ড প্রদর্শন ও উচ্চারণ ড্রিল।",
        "ধাপ ২: প্রতিটি পেশার অর্থ আলোচনা করা।",
        "ধাপ ৩: বাক্যে প্রয়োগের মাধ্যমে অর্থ আত্মস্থ করানো।"
      ]
    },
    {
      id: 4,
      title: "Family Tree & Roles Showcase",
      subtitle: "ফ্যামিলি ট্রি: পরিবারের সদস্য ও তাঁদের পারস্পরিক দায়িত্ব (Interactive Family Tree)",
      phase: "৪. পারিবারিক কাঠামো ও দায়িত্ব (Family Dynamics)",
      duration: "৬ মিনিট",
      themeColor: "from-blue-600 to-indigo-700",
      imageEmoji: "🌳 👨‍👩‍👧‍👦 📜",
      sceneType: "grammar",
      hasVisualStage: true,
      content: {
        englishText: [
          "Understanding Family Relationships:",
          "1. Sagar: 9-year-old student (Class 4)",
          "2. Keya: 3-year-old little sister",
          "3. Father: Professional lawyer",
          "4. Mother: Homemaker & master gardener",
          "5. Grandfather: Former teacher & study partner",
          "6. Grandmother: Home chef & pitha maker."
        ],
        banglaExplanation: "ভিজ্যুয়াল স্টেজের 'ফ্যামিলি ট্রি' ট্যাবে ক্লিক করে পরিবারের প্রতিটি সদস্যের বয়স, পেশা ও দায়িত্ব জেনে নাও।"
      },
      teacherNotes: "শিক্ষার্থীদের তাদের নিজেদের পরিবারের সদস্যদের সম্পর্ক ইংরেজি শব্দে (father, mother, brother, sister) বলতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: ফ্যামিলি ট্রির শাখা-প্রশাখা বুঝিয়ে দিন।",
        "ধাপ ২: প্রত্যেক সদস্যের অবদান আলোচনা করুন।",
        "ধাপ ৩: পারস্পরিক শ্রদ্ধাবোধের গুরুত্ব তুলে ধরুন।"
      ]
    },
    {
      id: 5,
      title: "Gardening & Pitha Kitchen Activity",
      subtitle: "সবজি বাগান ও ঐতিহ্যবাহী পিঠা তৈরি (Garden & Kitchen Simulation)",
      phase: "৫. ব্যবহারিক কর্মকাণ্ড (Simulation Activity)",
      duration: "৫ মিনিট",
      themeColor: "from-teal-600 to-emerald-700",
      imageEmoji: "🍅 🥒 🥧",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Family members collaborate and share hobbies:",
          "Grandmother helps Mother in the garden watering tomatoes and cucumbers.",
          "Grandmother makes mouth-watering traditional pithes for the whole family.",
          "Grandfather spends loving time helping Sagar with homework."
        ],
        banglaExplanation: "পরিবারে কাজের ভাগাভাগি: দাদি মাকে বাগানে সাহায্য করেন, পরিবারের জন্য পিঠা তৈরি করেন এবং দাদা সাগরকে পড়াশোনায় সহায়তা করেন।",
        sortingGame: {
          instruction: "Sort the items into 'Garden Produce' and 'Kitchen Delicacies':",
          categories: {
            cat1: { id: "garden", label: "Garden Produce (বাগানের সবজি)", icon: "🌱", theme: "emerald" },
            cat2: { id: "kitchen", label: "Kitchen Delicacies (রান্নাঘরের পিঠা)", icon: "🥧", theme: "amber" }
          },
          items: [
            { id: "sf-1", label: "Ripe Red Tomatoes", category: "garden", icon: "🍅" },
            { id: "sf-2", label: "Crisp Green Cucumbers", category: "garden", icon: "🥒" },
            { id: "sf-3", label: "Steamed Vapa Pitha", category: "kitchen", icon: "🥥" },
            { id: "sf-4", label: "Sweet Patishapta Pitha", category: "kitchen", icon: "🥞" },
            { id: "sf-5", label: "Fresh Vegetable Vines", category: "garden", icon: "🌿" },
            { id: "sf-6", label: "Hot Chitoi Pitha", category: "kitchen", icon: "🫓" }
          ]
        }
      },
      teacherNotes: "শসা ও টমেটোর পুষ্টিগুণ এবং দেশীয় পিঠার পুষ্টি উপাদান শিক্ষার্থীদের বুঝিয়ে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: সবজি বাগান ট্যাবে পানি দিয়ে ফসল ফলানোর সিমুলেশন দেখান।",
        "ধাপ ২: পিঠাঘরের ঐতিহ্যবাহী পিঠার নাম আলোচনা করুন।",
        "ধাপ ৩: সর্টিং গেমটি সমাধান করান।"
      ]
    },
    {
      id: 6,
      title: "Speaking & Dialogue: Introducing Family",
      subtitle: "নিজের পরিবার নিয়ে ইংরেজিতে কথা বলার চর্চা (Speaking Practice)",
      phase: "৬. মৌখিক কথোপকথন (Speaking Practice)",
      duration: "৪ মিনিট",
      themeColor: "from-cyan-600 to-blue-700",
      imageEmoji: "🗣️ 💬 👥",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice introducing your family members:",
          "Student A: 'What does your father do, Sagar?'",
          "Sagar: 'My father is a lawyer.'",
          "Student A: 'What does your mother grow in her garden?'",
          "Sagar: 'She grows delicious tomatoes and cucumbers.'",
          "Student A: 'Who makes the best pithes in your house?'",
          "Sagar: 'My grandmother makes the best pithes in the world!'"
        ],
        banglaExplanation: "বন্ধুর সাথে প্রশ্নোত্তর অনুশীলন করো। 'What does your father do?' এবং 'What does your mother do?' দিয়ে পেশা জানতে চাওয়া হয়।"
      },
      teacherNotes: "শিক্ষার্থীদের মাইক্রোফোন অন করে নিজের পরিবারের কথা বলতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: ডায়লগটি ক্লাসে মডেল করে দেখান।",
        "ধাপ ২: পেয়ার ওয়ার্কে শিক্ষার্থীদের একে অপরের পরিবারের তথ্য জানতে বলুন।",
        "ধাপ ৩: সাবলীল উচ্চারণের প্রশংসা করুন।"
      ]
    },
    {
      id: 7,
      title: "Grammar & Punctuation: Possessives & Superlatives",
      subtitle: "ব্যাকরণ চর্চা: অধিকারসূচক সর্বনাম (Possessives) ও 'Best' (Superlative)",
      phase: "৭. ব্যাকরণ ও যতিচিহ্ন প্রয়োগ (Language Mechanics)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-600 to-indigo-700",
      imageEmoji: "✍️ 🔤 📝",
      sceneType: "grammar",
      hasVisualStage: true,
      content: {
        englishText: [
          "Grammar Focus: Possessive Pronouns & Superlative Adjectives",
          "1. Possessives: My father, his sister, her garden, their pithes.",
          "2. Superlative Adjective: 'the best' (good -> better -> the best):",
          "   'She makes the best pithes in the world.'",
          "   'She grows the best tomatoes in the neighborhood.'",
          "Proper punctuation: Use exclamation mark (!) for excitement."
        ],
        banglaExplanation: "Possessive Pronoun মালিকানা বা সম্পর্ক নির্দেশ করে (my = আমার, his = তার)। 'Good' এর Superlative রূপ হলো 'the best' (সেরা)। বিস্ময় বা আনন্দ প্রকাশে Exclamation mark (!) বসে।",
        punctuationDrill: {
          instruction: "Select the correct punctuation mark to complete each sentence:",
          challenges: [
            {
              id: "sf-p1",
              sentenceBefore: "She makes the best pithes in the world",
              missingMark: "!",
              meaning: "তিনি পৃথিবীর সেরা পিঠা বানান!",
              options: ["!", ".", "?", ","]
            },
            {
              id: "sf-p2",
              sentenceBefore: "What does Sagar's father do",
              missingMark: "?",
              meaning: "সাগরের বাবা কী করেন?",
              options: ["?", ".", "!", ","]
            }
          ]
        }
      },
      teacherNotes: "শিক্ষার্থীদের বলুন: 'the best' এর আগে সর্বদা 'the' আর্টিকেল বসে।",
      quickTeachingSteps: [
        "ধাপ ১: 'Good, Better, Best' তুলনা বোর্ডে লিখুন।",
        "ধাপ ২: বিস্ময়সূচক চিহ্নের আবেগ প্রকাশ করে পাঠ করান।",
        "ধাপ ৩: যতিচিহ্ন ড্রিলটি সমাধান করান।"
      ]
    },
    {
      id: 8,
      title: "Interactive Review Quiz & 20-Mark Worksheet",
      subtitle: "চূড়ান্ত মূল্যায়ন ও অনুশীলন ওয়ার্কশিট (Comprehensive Evaluation)",
      phase: "৮. মূল্যায়ন ও ওয়ার্কশিট (Assessment)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "🎯 📋 🌟",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Wonderful job! You have explored Sagar and His Family thoroughly.",
          "You know the family relationships, occupations, and gardening terms.",
          "Now let's complete the final quiz and 20-mark companion worksheet!"
        ],
        banglaExplanation: "চমৎকার সাফল্য! তোমরা সাগরের পরিবার, সদস্যদের দায়িত্ব, পেশা এবং সবজি বাগানের বিষয়টি চমৎকারভাবে শিখেছ। এবার চূড়ান্ত কুইজ ও ২০ নম্বরের ওয়ার্কশিটটি পূরণ করো।",
        quiz: {
          question: "What vegetables does Sagar's mother grow in her garden?",
          options: ["Potatoes and cabbages", "Tomatoes and cucumbers", "Carrots and beans", "Pumpkins"],
          answer: "Tomatoes and cucumbers",
          hint: "The text says: 'She grows the best tomatoes and cucumbers in the neighborhood.'"
        }
      },
      teacherNotes: "শিক্ষার্থীদের প্রশংসা করুন এবং ওয়ার্কশিটটি সমাধান করে অভিভাবক বা শিক্ষকের স্বাক্ষর নিতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: কুইজের উত্তর নিশ্চিত করান।",
        "ধাপ ২: ২০ নম্বরের ওয়ার্কশিটটির প্রশ্নগুলো বুঝিয়ে দিন।",
        "ধাপ ৩: যৌথ পরিবারের মূল্যবোধ চর্চার উপদেশ দিন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 4 English Evaluation — Sagar and His Family",
    classGrade: "Class 4 (৪র্থ শ্রেণি)",
    subject: "English for Today (Unit 3, Lesson 1)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Multiple Choice Questions (5 Marks)",
        instruction: "সঠিক উত্তরের পাশে টিক (✓) চিহ্ন দাও (প্রতিটি ১ নম্বর):",
        content: [
          "1. How old is Sagar?\n   a) 7 years old    b) 8 years old    c) 9 years old    d) 10 years old",
          "2. How old is Sagar's sister Keya?\n   a) 2 years old    b) 3 years old    c) 4 years old    d) 5 years old",
          "3. What is Sagar's father's profession?\n   a) Teacher    b) Doctor    c) Lawyer    d) Banker",
          "4. What was Sagar's grandfather?\n   a) A school teacher    b) A farmer    c) An engineer    d) A merchant",
          "5. What does Sagar's grandmother make best?\n   a) Biscuits    b) Sweets    c) Pithes    d) Cakes"
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Family Words (5 Marks)",
        instruction: "পাঠ্যাংশ থেকে উপযুক্ত শব্দ বসিয়ে শূন্যস্থান পূরণ করো:",
        content: [
          "1. Sagar is in Class ____________________.",
          "2. Keya is Sagar's little ____________________.",
          "3. Sagar's mother is a caring ____________________.",
          "4. Grandfather helps Sagar with his ____________________.",
          "5. Mother grows tomatoes and ____________________ in her garden."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে 'True' এবং মিথ্যা হলে 'False' লেখো:",
        content: [
          "1. Sagar is eight years old. ( __________ )",
          "2. His father is a lawyer. ( __________ )",
          "3. Grandfather still works in a school. ( __________ )",
          "4. Grandmother makes the best pithes in the world. ( __________ )",
          "5. The tomatoes and cucumbers are delicious. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. What class is Sagar in and how old is he?\n   Answer: ________________________________________________________________",
          "2. What do Sagar's parents do?\n   Answer: ________________________________________________________________",
          "3. How does Sagar's grandfather help him?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 20: Class 4, Unit 3, Lesson 2 — Sagar's Weekly Routine (pp. 16–18)
// =========================================================================
export const SAGARS_WEEK_SLIDE_DECK: SlideDeck = {
  id: "sagar-week",
  grade: "Class 4 (৪র্থ শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 3: Family (Sagar and His Family)",
  lesson: "Lesson 2: Sagar's Week",
  topic: "Sagar's Weekly Routine, Weekdays vs Weekends & Favourite Subject (pp. 16–18)",
  category: "english",
  thumbnailEmoji: "🗓️ 🤲 🪁",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Sagar's Week",
      subtitle: "কাজের দিন ও ছুটির দিনের ভারসাম্যপূর্ণ রুটিন (Warm-up & Orientation)",
      phase: "১. প্রাক-পাঠ ও ভূমিকা (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-blue-500 to-indigo-600",
      imageEmoji: "🗓️ 🌅 👦",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello, bright minds! Welcome back to Class 4 English.",
          "Today we will explore how Sagar organizes his entire week.",
          "He balances his weekdays with study, prayers, and school.",
          "On weekends, he enjoys visiting relatives and playing in the park.",
          "Let's learn how to plan our weekdays and weekends wisely!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা সাগরের সাপ্তাহিক দিনপঞ্জি নিয়ে জানব। সে সপ্তাহের কাজের দিনগুলোতে সকাল ৬টায় ওঠে, সকালে প্রার্থনা করে, দাদার কাছে বাংলা ও ইংরেজি পড়ে এবং সময়মতো স্কুলে যায়। আবার ছুটির দিনে আত্মীয়দের বাড়ি যায় এবং কাজিনদের সাথে পার্কে খেলাধুলা করে।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: ছুটির দিনে তারা কী করে এবং স্কুলের কাজের দিনগুলোর সাথে ছুটির দিনের পার্থক্য কী।",
      quickTeachingSteps: [
        "ধাপ ১: ক্যালেন্ডারের কাজের দিন (Sunday-Thursday) ও ছুটির দিন (Friday-Saturday) চিহ্নিত করুন।",
        "ধাপ ২: সাগরের সকালের নিয়মিত অভ্যাসগুলো তুলে ধরুন।",
        "ধাপ ৩: প্রিয় বিষয় সম্পর্কে শিক্ষার্থীদের মতামত নিন।"
      ]
    },
    {
      id: 2,
      title: "Reading & Listening: Sagar's Week",
      subtitle: "পাঠ্যাংশ পাঠ ও অনুধাবন: সপ্তাহের সাত দিনের সময়সূচি (NCTB Text)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-indigo-500 to-blue-600",
      imageEmoji: "📖 🤲 🎒",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "On weekdays, Sagar gets up at 6:00 in the morning. He first says his morning prayers.",
          "Then he goes to his grandfather and studies Bangla and English with him.",
          "He has breakfast at 8:00 am. Sagar puts on his uniform and leaves for school at 9:00 am because school starts at 10:00 am.",
          "In the evening, Sagar does his homework. He loves Bangla. It's his favourite subject.",
          "After doing homework, he spends time with his grandparents.",
          "He watches TV with his family and goes to bed at 11:00 pm.",
          "On weekends, Sagar visits his aunt and uncle in the afternoon.",
          "He and Keya play in the park with their cousins."
        ],
        banglaExplanation: "কাজের দিনগুলোতে সাগর সকাল ৬টায় ঘুম থেকে ওঠে। সে প্রথমে সকালের প্রার্থনা করে। তারপর সে তার দাদার কাছে যায় এবং তাঁর সাথে বাংলা ও ইংরেজি পড়ে। সে সকাল ৮টায় নাশতা করে। সাগর স্কুলের পোশাক পরে সকাল ৯টায় রওনা হয় কারণ সকাল ১০টায় স্কুল শুরু হয়। সন্ধ্যায় সাগর তার বাড়ির কাজ করে। সে বাংলা খুব ভালোবাসে, এটা তার প্রিয় বিষয়। পড়ার পর সে দাদা-দাদির সাথে সময় কাটায়। সে পরিবারের সাথে টিভি দেখে এবং রাত ১১টায় ঘুমাতে যায়। ছুটির দিনে বিকেলে সাগর তার চাচা-ফুফুর বাড়ি বেড়াতে যায়। সে এবং কেয়া পার্কে তাদের কাজিনদের সাথে খেলা করে।"
      },
      teacherNotes: "শিক্ষার্থীদের 'favourite', 'weekdays', 'uniform', 'prayers' শব্দগুলোর উচ্চারণ অনুশীলন করান।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক নিজে আদর্শ পাঠ দেবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে বাক্যগুলো পড়বে।",
        "ধাপ ৩: মূল বাক্যগুলোর নিচে দাগ দিয়ে প্রশ্ন করান।"
      ]
    },
    {
      id: 3,
      title: "Vocabulary Workshop: Routine & Activities",
      subtitle: "শব্দসম্ভার: রুটিন ও পছন্দের বিষয়ের ইংরেজি শব্দ (Key Vocabulary)",
      phase: "৩. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-blue-600 to-indigo-700",
      imageEmoji: "💡 📚 🏷️",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Learn key words related to weekly routines, subjects, and leisure:"
        ],
        banglaExplanation: "সাপ্তাহিক রুটিন সম্পর্কিত প্রয়োজনীয় শব্দগুলোর অর্থ ও সঠিক উচ্চারণ শিখে নিই:",
        vocabulary: [
          {
            word: "Weekdays",
            syllables: ["Week", "days"],
            phonetic: "/ˈwiːk.deɪz/",
            meaning: "কাজের দিনসমূহ (রবি থেকে বৃহস্পতি)",
            partOfSpeech: "Noun",
            example: "On weekdays, school starts at 10:00 am.",
            icon: "🗓️"
          },
          {
            word: "Prayers",
            syllables: ["Pray", "ers"],
            phonetic: "/preəz/",
            meaning: "প্রার্থনা / উপাসনা",
            partOfSpeech: "Noun",
            example: "Sagar says his morning prayers first.",
            icon: "🤲"
          },
          {
            word: "Favourite",
            syllables: ["Fa", "vour", "ite"],
            phonetic: "/ˈfeɪ.vər.ɪt/",
            meaning: "সর্বাপেক্ষা প্রিয় / পছন্দের",
            partOfSpeech: "Adjective",
            example: "Bangla is Sagar's favourite subject.",
            icon: "❤️"
          },
          {
            word: "Uniform",
            syllables: ["U", "ni", "form"],
            phonetic: "/ˈjuː.nɪ.fɔːm/",
            meaning: "নির্দিষ্ট পোশাক / ইউনিফর্ম",
            partOfSpeech: "Noun",
            example: "He puts on his clean school uniform.",
            icon: "👔"
          },
          {
            word: "Cousins",
            syllables: ["Cous", "ins"],
            phonetic: "/ˈkʌz.ənz/",
            meaning: "চাচাতো / মামাতো / খালাতো ভাই-বোন",
            partOfSpeech: "Noun",
            example: "They play with their cousins in the park.",
            icon: "🧒"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের 'Favourite' (ফে-ভা-রিট) শব্দের ব্রিটিশ বানান ও উচ্চারণ অনুশীলন করান।",
      quickTeachingSteps: [
        "ধাপ ১: সিলেবল কার্ড প্রদর্শন ও উচ্চারণ ড্রিল।",
        "ধাপ ২: প্রতিটি শব্দের বাংলা প্রতিশব্দ ব্যাখ্যা করা।",
        "ধাপ ৩: বাক্যে প্রয়োগের মাধ্যমে শব্দগুলো স্থায়ী করানো।"
      ]
    },
    {
      id: 4,
      title: "Interactive Weekdays vs Weekends Planner",
      subtitle: "কাজের দিন বনাম ছুটির দিনের ইন্টারঅ্যাক্টিভ প্ল্যানার (Weekly Planner)",
      phase: "৪. সময় ব্যবস্থাপনা ও পরিকল্পনা (Planning Concept)",
      duration: "৬ মিনিট",
      themeColor: "from-indigo-600 to-purple-700",
      imageEmoji: "🗓️ ⏰ 🌟",
      sceneType: "grammar",
      hasVisualStage: true,
      content: {
        englishText: [
          "Compare Weekday Schedule vs Weekend Fun:",
          "Weekdays: 6:00 AM Wake up & Prayers -> Study with Grandfather -> 8:00 AM Breakfast -> 9:00 AM Leave for school -> Evening Homework -> Family TV -> 11:00 PM Bed.",
          "Weekends: Afternoon visit to aunt & uncle -> Evening outdoor games in the park with Keya and cousins."
        ],
        banglaExplanation: "কাজের দিনের সুশৃঙ্খল সময়তালিকা এবং ছুটির দিনের আত্মীয়দের সাথে দেখা ও পার্কে খেলার আনন্দ—ভিজ্যুয়াল স্টেজের ফিল্টারে ক্লিক করে পর্যবেক্ষণ করো।"
      },
      teacherNotes: "শিক্ষার্থীদের নিজেদের সাপ্তাহিক ছুটির রুটিন ও পড়ার সময়ের ভারসাম্য বজায় রাখতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে 'কাজের দিন' ও 'ছুটির দিন' বাটনে ক্লিক করে পার্থক্য দেখান।",
        "ধাপ ২: কোন কাজ কখন হয় তা শিক্ষার্থীদের দিয়ে বলান।",
        "ধাপ ৩: সময়নিষ্ঠার গুরুত্ব তুলে ধরুন।"
      ]
    },
    {
      id: 5,
      title: "Activity Categorization Game",
      subtitle: "সাপ্তাহিক কাজের শ্রেণিবিন্যাস খেলা (Activity Sorter)",
      phase: "৫. বিশ্লেষণ ও শ্রেণিবিন্যাস (Sorting Game)",
      duration: "৫ মিনিট",
      themeColor: "from-teal-600 to-emerald-700",
      imageEmoji: "🎒 🪁 🗂️",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Sort the activities into Weekday Activities and Weekend Leisure:",
          "Weekday: Says morning prayers, Studies Bangla with grandfather, Leaves for school at 9 am, Does homework in evening.",
          "Weekend: Visits aunt and uncle, Plays in the park with cousins."
        ],
        banglaExplanation: "কোন কাজটি স্কুলের কাজের দিন হয় এবং কোনটি ছুটির দিনে হয় তা সঠিক ঝুড়িতে বাছাই করো।",
        sortingGame: {
          instruction: "Sort the activities into Weekday Routine and Weekend Activities:",
          categories: {
            cat1: { id: "weekday", label: "Weekday Routine (কাজের দিন)", icon: "🎒", theme: "blue" },
            cat2: { id: "weekend", label: "Weekend Activities (ছুটির দিন)", icon: "🪁", theme: "amber" }
          },
          items: [
            { id: "sw-1", label: "Studies Bangla with grandfather", category: "weekday", icon: "👴" },
            { id: "sw-2", label: "Leaves for school at 9:00 am", category: "weekday", icon: "🏫" },
            { id: "sw-3", label: "Visits aunt and uncle", category: "weekend", icon: "🏡" },
            { id: "sw-4", label: "Plays in park with cousins", category: "weekend", icon: "🪁" },
            { id: "sw-5", label: "Says morning prayers at 6 am", category: "weekday", icon: "🤲" },
            { id: "sw-6", label: "Goes to bed at 11:00 pm", category: "weekday", icon: "🌙" }
          ]
        }
      },
      teacherNotes: "শিক্ষার্থীদের জিজ্ঞাসা করুন: কেন সপ্তাহে অন্তত একদিন খোলা জায়গায় খেলাধুলা করা জরুরি।",
      quickTeachingSteps: [
        "ধাপ ১: সর্টিং গেমের নির্দেশনা বুঝিয়ে দিন।",
        "ধাপ ২: প্রতিটি আইটেমের অর্থ আলোচনা করে সঠিক গ্রুপে রাখুন।",
        "ধাপ ৩: সঠিক সমাধানের পর প্রশংসা করুন।"
      ]
    },
    {
      id: 6,
      title: "Speaking & Role-play: Favourite Subjects & Weekends",
      subtitle: "পছন্দের বিষয় ও ছুটির দিন নিয়ে কথোপকথন (Speaking Dialogue)",
      phase: "৬. মৌখিক কথোপকথন (Speaking Practice)",
      duration: "৪ মিনিট",
      themeColor: "from-cyan-600 to-blue-700",
      imageEmoji: "🗣️ 💬 📚",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice the conversation with your friend:",
          "Rani: 'What is your favourite subject, Sagar?'",
          "Sagar: 'I love Bangla. It's my favourite subject!'",
          "Rani: 'What do you do on weekends?'",
          "Sagar: 'On weekends, Keya and I play in the park with our cousins.'"
        ],
        banglaExplanation: "'What is your favourite subject?' দিয়ে পছন্দের বিষয় এবং 'What do you do on weekends?' দিয়ে ছুটির দিনের পরিকল্পনা জানতে চাওয়া হয়।"
      },
      teacherNotes: "শিক্ষার্থীদের মাইক্রোফোন অন করে নিজের প্রিয় বিষয় ও প্রিয় ছুটির কাজের কথা বলতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক ও একজন শিক্ষার্থী মিলে সংলাপটি অভিনয় করবেন।",
        "ধাপ ২: সব শিক্ষার্থী জোড়ায় জোড়ায় অনুশীলন করবে।",
        "ধাপ ৩: সাবলীল উচ্চারণের জন্য উৎসাহ দিন।"
      ]
    },
    {
      id: 7,
      title: "Grammar & Punctuation: Prepositions 'On' vs 'At'",
      subtitle: "ব্যাকরণ চর্চা: সময় ও দিনের পূর্বে Preposition 'At' ও 'On'-এর সঠিক ব্যবহার",
      phase: "৭. ব্যাকরণ ও যতিচিহ্ন প্রয়োগ (Language Mechanics)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-600 to-indigo-700",
      imageEmoji: "✍️ 🔤 📝",
      sceneType: "grammar",
      hasVisualStage: true,
      content: {
        englishText: [
          "Preposition Rules for Time & Days:",
          "1. Use 'On' before days and weekends:",
          "   On weekdays, on weekends, on Friday, on Sunday.",
          "2. Use 'At' before specific clock times:",
          "   at 6:00 am, at 8:00 am, at 10:00 am, at 11:00 pm.",
          "3. Use 'In' before parts of the day:",
          "   in the morning, in the afternoon, in the evening (exception: at night)."
        ],
        banglaExplanation: "নির্দিষ্ট ঘড়ির সময়ের পূর্বে 'at' বসে (at 6:00 am), বার বা দিনের পূর্বে 'on' বসে (on weekdays, on Fridays) এবং দিনের খণ্ডের পূর্বে 'in' বসে (in the morning, in the evening)।",
        punctuationDrill: {
          instruction: "Choose the correct punctuation mark to complete each sentence:",
          challenges: [
            {
              id: "sw-p1",
              sentenceBefore: "On weekdays Sagar gets up at 6:00 in the morning",
              missingMark: ".",
              meaning: "কাজের দিনগুলোতে সাগর সকাল ৬টায় ঘুম থেকে ওঠে।",
              options: [".", "?", "!", ","]
            },
            {
              id: "sw-p2",
              sentenceBefore: "What is Sagar's favourite subject",
              missingMark: "?",
              meaning: "সাগরের প্রিয় বিষয় কোনটি?",
              options: ["?", ".", "!", ","]
            }
          ]
        }
      },
      teacherNotes: "শিক্ষার্থীদের খাতায় ৩টি উদাহরণ লিখতে বলুন: 'at 9 am', 'on Friday', 'in the afternoon'।",
      quickTeachingSteps: [
        "ধাপ ১: Preposition এর ৩টি গোল্ডেন রুল বোর্ডে লিখুন।",
        "ধাপ ২: শিক্ষার্থীদের ছোট ছোট শূন্যস্থান পূরণ করতে দিন।",
        "ধাপ ৩: যতিচিহ্ন ড্রিলটি সম্পন্ন করান।"
      ]
    },
    {
      id: 8,
      title: "Interactive Review Quiz & 20-Mark Worksheet",
      subtitle: "চূড়ান্ত মূল্যায়ন ও অনুশীলন ওয়ার্কশিট (Comprehensive Evaluation)",
      phase: "৮. মূল্যায়ন ও ওয়ার্কশিট (Assessment)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "🎯 📋 🌟",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Fantastic achievement! You have mastered Sagar's Weekly Routine.",
          "You know how to plan weekdays and weekends and use time prepositions.",
          "Now let's complete the final quiz and 20-mark companion worksheet!"
        ],
        banglaExplanation: "দারুণ সাফল্য! তোমরা সাগরের পুরো সপ্তাহের কর্মসূচি, সময় সচেতনতা এবং ইংরেজি ব্যাকরণের নিয়ম চমৎকারভাবে আয়ত্ত করেছ। এবার চূড়ান্ত কুইজ ও ২০ নম্বরের ওয়ার্কশিটটি পূরণ করো।",
        quiz: {
          question: "What is Sagar's favourite subject?",
          options: ["English", "Math", "Bangla", "Science"],
          answer: "Bangla",
          hint: "The text says: 'He loves Bangla. It's his favourite subject.'"
        }
      },
      teacherNotes: "শিক্ষার্থীদের প্রশংসা করুন এবং ওয়ার্কশিটটি সমাধান করে অভিভাবক বা শিক্ষকের স্বাক্ষর নিতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: কুইজের উত্তর যাচাই করান।",
        "ধাপ ২: ২০ নম্বরের ওয়ার্কশিটটির প্রশ্নগুলো বুঝিয়ে দিন।",
        "ধাপ ৩: সপ্তাহের সঠিক পরিকল্পনার গুরুত্ব আলোচনা করে শেষ করুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 4 English Evaluation — Sagar's Weekly Routine",
    classGrade: "Class 4 (৪র্থ শ্রেণি)",
    subject: "English for Today (Unit 3, Lesson 2)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Multiple Choice Questions (5 Marks)",
        instruction: "সঠিক উত্তরের পাশে টিক (✓) চিহ্ন দাও (প্রতিটি ১ নম্বর):",
        content: [
          "1. What does Sagar do first after waking up?\n   a) Plays football    b) Says morning prayers    c) Eats breakfast    d) Watches TV",
          "2. Who does Sagar study Bangla and English with?\n   a) His teacher    b) His grandfather    c) His father    d) His uncle",
          "3. When does Sagar leave for school?\n   a) At 8:00 am    b) At 9:00 am    c) At 10:00 am    d) At 7:00 am",
          "4. What is Sagar's favourite subject?\n   a) Math    b) English    c) Bangla    d) Science",
          "5. Where do Sagar and Keya play on weekends?\n   a) At school    b) In the park with cousins    c) In the river    d) On the roof"
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Routine Words (5 Marks)",
        instruction: "পাঠ্যাংশ থেকে উপযুক্ত শব্দ বসিয়ে শূন্যস্থান পূরণ করো:",
        content: [
          "1. On weekdays, Sagar gets up at ____________________ in the morning.",
          "2. Sagar puts on his ____________________ and leaves for school.",
          "3. School starts at ____________________ am.",
          "4. In the evening, Sagar does his ____________________.",
          "5. He goes to bed at ____________________ pm."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে 'True' এবং মিথ্যা হলে 'False' লেখো:",
        content: [
          "1. Sagar studies Bangla and English with his grandfather. ( __________ )",
          "2. School starts at nine o'clock. ( __________ )",
          "3. English is Sagar's favourite subject. ( __________ )",
          "4. Sagar visits his aunt and uncle on weekends. ( __________ )",
          "5. He goes to bed at 11:00 pm. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. When does Sagar wake up on weekdays and what does he do first?\n   Answer: ________________________________________________________________",
          "2. What is Sagar's favourite subject and why?\n   Answer: ________________________________________________________________",
          "3. What do Sagar and Keya do on weekends?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// DECK 21: Class 4, Unit 6, Lesson 1 — At the Stationery Shop (pp. 30–33)
// =========================================================================
export const STATIONERY_SHOP_SLIDE_DECK: SlideDeck = {
  id: "stationery-shop",
  grade: "Class 4 (৪র্থ শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 6: At the Shop and Healthy Food",
  lesson: "Lesson 1: At the stationery shop",
  topic: "At the Stationery Shop, Buying School Supplies & Currency (pp. 30–33)",
  category: "english",
  thumbnailEmoji: "🏪 ✏️ 💵",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to the Stationery Shop",
      subtitle: "দোকানে কেনাকাটা, ভদ্র সম্ভাষণ ও হিসাবনিকাশ (Orientation)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-amber-500 to-orange-600",
      imageEmoji: "🏪 ✏️ 👧",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello, enthusiastic learners! Welcome to Class 4 English.",
          "Today we will join Tania and her father at a local stationery shop.",
          "Tania needs new pencils, an eraser, and a notebook for her school classes.",
          "We will learn polite phrases like 'Can I help you?' and 'Yes, please.'",
          "Let's practice counting money and making polite requests together!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা তানিয়া ও তার বাবার সাথে পাড়ার স্টেশনারি দোকানে যাব। তানিয়ার স্কুলের জন্য নতুন পেন্সিল, ইরেজার ও খাতা প্রয়োজন। দোকানে গিয়ে কীভাবে ভদ্রভাবে কথা বলতে হয় এবং টাকার সঠিক হিসাব করতে হয়, আজ আমরা তা শিখব।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তারা কখনো স্টেশনারি দোকানে একা বা মা-বাবার সাথে গিয়ে কী কী জিনিস কিনেছে।",
      quickTeachingSteps: [
        "ধাপ ১: খাতা, পেন্সিল ও ইরেজার ক্লাসে প্রদর্শন করুন।",
        "ধাপ ২: দোকানদারের সাথে ভদ্র সম্ভাষণের ভূমিকা আলোচনা করুন।",
        "ধাপ ৩: মূল পাঠের সাথে শিক্ষার্থীদের সম্পৃক্ত করুন।"
      ]
    },
    {
      id: 2,
      title: "Reading & Listening: At the Shop",
      subtitle: "পাঠ্যাংশ পাঠ ও অনুধাবন: দোকানে কেনাকাটার দৃশ্য (NCTB Text)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-orange-500 to-amber-600",
      imageEmoji: "📖 📓 💵",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Tania wants to buy some school stationery. She goes to a nearby stationery shop with her father.",
          "The shopkeeper greets them politely and asks, 'Can I help you?'",
          "Tania says, 'Yes, please. I need two pencils, an eraser and a notebook.'",
          "The shopkeeper shows her the items and says, 'The pencils are ten taka each, the eraser is five taka and the notebook is thirty taka.'",
          "Tania's father hands over a fifty taka note and a five taka coin to the shopkeeper.",
          "The shopkeeper gives them the items packed neatly with a bright smile."
        ],
        banglaExplanation: "তানিয়া কিছু স্কুলের স্টেশনারি জিনিসপত্র কিনতে চায়। সে তার বাবার সাথে কাছের একটি স্টেশনারি দোকানে যায়। দোকানদার তাদের ভদ্রভাবে অভিবাদন জানিয়ে জিজ্ঞেস করলেন, 'আমি কি আপনাকে সাহায্য করতে পারি?' তানিয়া বলল, 'হ্যাঁ, দয়া করে। আমার দুটি পেন্সিল, একটি ইরেজার এবং একটি খাতা প্রয়োজন।' দোকানদার জিনিসগুলো দেখিয়ে বললেন, 'পেন্সিল প্রতিটির দাম দশ টাকা, ইরেজার পাঁচ টাকা এবং খাতা ত্রিশ টাকা।' তানিয়ার বাবা দোকানদারকে একটি পঞ্চাশ টাকার নোট এবং একটি পাঁচ টাকার মুদ্রা দিলেন। দোকানদার একটি উজ্জ্বল হাসিমুখে জিনিসগুলো সুন্দরভাবে প্যাক করে তাদের দিলেন।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রতিটি আইটেমের দাম হিসাব করতে বলুন: ২টি পেন্সিল = ২০ টাকা, ১টি ইরেজার = ৫ টাকা, ১টি খাতা = ৩০ টাকা। মোট = ৫৫ টাকা।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক সঠিক উচ্চারণে অনুচ্ছেদটি পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে প্রতিটি লাইন পড়বে।",
        "ধাপ ৩: কথোপকথনের বাক্যগুলো আলাদা করে চিহ্নিত করুন।"
      ]
    },
    {
      id: 3,
      title: "Vocabulary Workshop: Stationery & Shopping",
      subtitle: "শব্দসম্ভার: কেনাকাটা ও স্টেশনারি সম্পর্কিত গুরুত্বপূর্ণ শব্দ (Key Vocabulary)",
      phase: "৩. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-amber-600 to-yellow-600",
      imageEmoji: "💡 📚 🏷️",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Learn key vocabulary words related to shopping, money, and courtesy:"
        ],
        banglaExplanation: "কেনাকাটা ও শিষ্টাচার সম্পর্কিত ইংরেজি শব্দগুলোর উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Stationery",
            syllables: ["Sta", "tion", "ery"],
            phonetic: "/ˈsteɪ.ʃən.ər.i/",
            meaning: "লেখাপড়ার সরঞ্জাম / স্টেশনারি",
            partOfSpeech: "Noun",
            example: "Tania buys school stationery from the shop.",
            icon: "📐"
          },
          {
            word: "Shopkeeper",
            syllables: ["Shop", "keep", "er"],
            phonetic: "/ˈʃɒpˌkiː.pər/",
            meaning: "দোকানদার / দোকানপরিচালক",
            partOfSpeech: "Noun",
            example: "The shopkeeper greets customers with a smile.",
            icon: "👨‍💼"
          },
          {
            word: "Eraser",
            syllables: ["E", "ras", "er"],
            phonetic: "/ɪˈreɪ.zər/",
            meaning: "পেন্সিলের দাগ মোছার রাবার / ইরেজার",
            partOfSpeech: "Noun",
            example: "The eraser costs five taka.",
            icon: "🧼"
          },
          {
            word: "Notebook",
            syllables: ["Note", "book"],
            phonetic: "/ˈnəʊt.bʊk/",
            meaning: "খাতা / নোটবই",
            partOfSpeech: "Noun",
            example: "She writes notes in her clean notebook.",
            icon: "📓"
          },
          {
            word: "Politely",
            syllables: ["Po", "lite", "ly"],
            phonetic: "/pəˈlaɪt.li/",
            meaning: "ভদ্রভাবে / বিনীতভাবে",
            partOfSpeech: "Adverb",
            example: "Always speak politely to the shopkeeper.",
            icon: "🤝"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের 'Stationery' (স্টেশ-না-রি) শব্দের সিলেবল ভাগ করে সঠিক উচ্চারণ করান।",
      quickTeachingSteps: [
        "ধাপ ১: সিলেবল ও উচ্চারণ কার্ড প্রদর্শন।",
        "ধাপ ২: প্রতিটি শব্দের বাংলা প্রতিশব্দ ব্যাখ্যা করা।",
        "ধাপ ৩: বাক্যে প্রয়োগের মাধ্যমে অর্থ আয়ত্ত করানো।"
      ]
    },
    {
      id: 4,
      title: "Interactive Stationery Store & Cart",
      subtitle: "ইন্টারঅ্যাক্টিভ দোকান ও স্বয়ংক্রিয় টাকার হিসাব (Shopping Simulation)",
      phase: "৪. বাস্তব বাজার ও গাণিতিক হিসাব (Simulation Activity)",
      duration: "৬ মিনিট",
      themeColor: "from-sky-600 to-indigo-700",
      imageEmoji: "🛒 💵 🧮",
      sceneType: "grammar",
      hasVisualStage: true,
      content: {
        englishText: [
          "Calculate the total bill accurately:",
          "1. Two pencils @ 10 taka = 20 taka",
          "2. One eraser @ 5 taka = 5 taka",
          "3. One notebook @ 30 taka = 30 taka",
          "Total Bill: 20 + 5 + 30 = 55 Taka.",
          "Payment: Fifty taka note + Five taka coin = 55 Taka."
        ],
        banglaExplanation: "ভিজ্যুয়াল স্টেজের দোকানে গিয়ে পেন্সিল, ইরেজার ও খাতা কার্টে যোগ করো এবং টাকার স্বয়ংক্রিয় হিসাব ও পরিশোধের খেলা উপভোগ করো।"
      },
      teacherNotes: "শিক্ষার্থীদের যোগফল করতে দিন: ২০ + ৫ + ৩০ = কত? এবং কোন কোন নোট দিয়ে তা পরিশোধ করা যায়।",
      quickTeachingSteps: [
        "ধাপ ১: আইটেমগুলোর মূল্য বোর্ডে লিখুন।",
        "ধাপ ২: কার্টে যোগ-বিয়োগের সিমুলেশন দেখান।",
        "ধাপ ৩: সঠিকভাবে টাকা পরিশোধের আনন্দ উদযাপন করুন।"
      ]
    },
    {
      id: 5,
      title: "Price & Item Matching Activity",
      subtitle: "দ্রব্যের নাম ও সঠিক মূল্যের জোড়া মেলানো (Price Matching Game)",
      phase: "৫. বিশ্লেষণ ও জোড়া মেলানো (Matching Game)",
      duration: "৫ মিনিট",
      themeColor: "from-teal-600 to-emerald-700",
      imageEmoji: "🏷️ ✏️ 🧼",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Match each item with its correct price from the passage:",
          "Pencil: 10 Taka each",
          "Eraser: 5 Taka",
          "Notebook: 30 Taka",
          "Ruler: 15 Taka",
          "Two Pencils: 20 Taka."
        ],
        banglaExplanation: "কোন জিনিসটির দাম কত টাকা তা সঠিক মূল্যের ক্যাটাগরিতে বাছাই করো।",
        sortingGame: {
          instruction: "Sort the items into 'Under 20 Taka' and '20 Taka or More':",
          categories: {
            cat1: { id: "under-20", label: "Under 20 Taka (২০ টাকার কম)", icon: "🪙", theme: "amber" },
            cat2: { id: "twenty-above", label: "20 Taka or More (২০ টাকা বা বেশি)", icon: "💵", theme: "emerald" }
          },
          items: [
            { id: "st-1", label: "One Eraser (5 Tk)", category: "under-20", icon: "🧼" },
            { id: "st-2", label: "One Pencil (10 Tk)", category: "under-20", icon: "✏️" },
            { id: "st-3", label: "One Notebook (30 Tk)", category: "twenty-above", icon: "📓" },
            { id: "st-4", label: "Two Pencils (20 Tk)", category: "twenty-above", icon: "✏️" },
            { id: "st-5", label: "One Ruler (15 Tk)", category: "under-20", icon: "📏" },
            { id: "st-6", label: "Total Bill (55 Tk)", category: "twenty-above", icon: "💰" }
          ]
        }
      },
      teacherNotes: "শিক্ষার্থীদের তুলনা করতে বলুন: কোনটি সবচেয়ে কম দামি এবং কোনটি সবচেয়ে বেশি দামি।",
      quickTeachingSteps: [
        "ধাপ ১: মূল্যের তালিকা পর্যালোচনা করান।",
        "ধাপ ২: সর্টিং গেমটি সমাধান করান।",
        "ধাপ ৩: সঠিক মূল্যের ধারণা নিশ্চিত করুন।"
      ]
    },
    {
      id: 6,
      title: "Speaking & Dialogue: Polite Shopping",
      subtitle: "দোকানে ভদ্রভাবে কেনাকাটার সংলাপ অনুশীলন (Customer Dialogue)",
      phase: "৬. মৌখিক কথোপকথন (Speaking Practice)",
      duration: "৪ মিনিট",
      themeColor: "from-cyan-600 to-blue-700",
      imageEmoji: "🗣️ 💬 🏪",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Practice the shopping dialogue in pairs:",
          "Shopkeeper: 'Can I help you?'",
          "Tania: 'Yes, please. I need two pencils and a notebook.'",
          "Shopkeeper: 'Sure. Here they are.'",
          "Tania: 'How much are they?'",
          "Shopkeeper: 'That is fifty taka in total.'",
          "Tania's Father: 'Here is the money. Thank you.'",
          "Shopkeeper: 'You are welcome!'"
        ],
        banglaExplanation: "দোকানে গিয়ে 'Can I help you?', 'Yes, please', 'Here you are' এবং 'Thank you' বলে ভদ্রভাবে কেনাকাটা করার সংলাপ অনুশীলন করো।"
      },
      teacherNotes: "শিক্ষার্থীদের দোকানে কেনাকাটার অভিনয় করে ডায়লগটি ক্লাসে পরিবেশন করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক ও একজন শিক্ষার্থী দোকানদার ও ক্রেতা সেজে মডেল করুন।",
        "ধাপ ২: সকল শিক্ষার্থী জোড়ায় সংলাপটি অনুশীলন করবে।",
        "ধাপ ৩: ভদ্র শব্দের ব্যবহারের প্রশংসা করুন।"
      ]
    },
    {
      id: 7,
      title: "Grammar & Punctuation: Polite Modals & Currency",
      subtitle: "ব্যাকরণ চর্চা: অনুরোধে 'Can I...', 'Please' এবং যতিচিহ্নের ব্যবহার",
      phase: "৭. ব্যাকরণ ও যতিচিহ্ন প্রয়োগ (Language Mechanics)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-600 to-indigo-700",
      imageEmoji: "✍️ 🔤 📝",
      sceneType: "grammar",
      hasVisualStage: true,
      content: {
        englishText: [
          "Polite Shopping Mechanics:",
          "1. Asking politely: 'Can I help you?' (Ends with a question mark ?)",
          "2. Responding with courtesy: 'Yes, please.' (Comma after Yes)",
          "3. Plural nouns for counted items: one pencil -> two pencils, one eraser -> three erasers.",
          "4. Direct speech quotes: 'The pencils are ten taka each,' said the shopkeeper."
        ],
        banglaExplanation: "সাহায্য চাইতে 'Can I help you?' ব্যবহৃত হয় এবং শেষে প্রশ্নবোধক চিহ্ন (?) বসে। সম্মতিতে 'Yes, please.' বসে। একবচন থেকে বহুবচনে 's' যোগ হয় (pencil -> pencils)।",
        punctuationDrill: {
          instruction: "Select the correct punctuation mark to fix each sentence:",
          challenges: [
            {
              id: "st-p1",
              sentenceBefore: "Can I help you",
              missingMark: "?",
              meaning: "আমি কি আপনাকে সাহায্য করতে পারি?",
              options: ["?", ".", "!", ","]
            },
            {
              id: "st-p2",
              sentenceBefore: "Yes please I need an eraser",
              missingMark: ",",
              meaning: "হ্যাঁ, দয়া করে, আমার একটি ইরেজার প্রয়োজন।",
              options: [",", ".", "?", "!"]
            }
          ]
        }
      },
      teacherNotes: "শিক্ষার্থীদের কমা ও প্রশ্নবোধক চিহ্নের অবস্থান স্পষ্টভাবে বুঝিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: 'Can I...' এর প্রশ্নবোধক গঠন বোর্ডে লিখুন।",
        "ধাপ ২: প্লুরাল 's' ব্যবহারের নিয়ম আলোচনা করুন।",
        "ধাপ ৩: যতিচিহ্ন ড্রিলটি সম্পন্ন করান।"
      ]
    },
    {
      id: 8,
      title: "Interactive Review Quiz & 20-Mark Worksheet",
      subtitle: "চূড়ান্ত মূল্যায়ন ও অনুশীলন ওয়ার্কশিট (Comprehensive Assessment)",
      phase: "৮. মূল্যায়ন ও ওয়ার্কশিট (Assessment)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "🎯 📋 🌟",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Outstanding work! You have mastered Shopping at the Stationery Shop.",
          "You know how to greet politely, calculate prices, and pay bills.",
          "Now let's complete the final quiz and 20-mark companion worksheet!"
        ],
        banglaExplanation: "চমৎকার সাফল্য! তোমরা দোকানে কেনাকাটার শিষ্টাচার, জিনিসপত্রের দাম ও টাকার হিসাব চমৎকারভাবে শিখেছ। এবার চূড়ান্ত কুইজ ও ২০ নম্বরের ওয়ার্কশিটটি পূরণ করো।",
        quiz: {
          question: "How much total money does Tania's father give to the shopkeeper?",
          options: ["Forty taka", "Fifty taka", "Fifty-five taka", "Sixty taka"],
          answer: "Fifty-five taka",
          hint: "The text says: 'Tania's father hands over a fifty taka note and a five taka coin (50 + 5 = 55 taka).'"
        }
      },
      teacherNotes: "শিক্ষার্থীদের প্রশংসা করুন এবং ওয়ার্কশিটটি সমাধান করে অভিভাবক বা শিক্ষকের স্বাক্ষর নিতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: কুইজের উত্তর নিশ্চিত করান।",
        "ধাপ ২: ২০ নম্বরের ওয়ার্কশিটের ৪টি সেকশন বুঝিয়ে দিন।",
        "ধাপ ৩: বাস্তব জীবনে ভদ্র আচরণের পরামর্শ দিন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 4 English Evaluation — At the Stationery Shop",
    classGrade: "Class 4 (৪র্থ শ্রেণি)",
    subject: "English for Today (Unit 6, Lesson 1)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "mcq",
        title: "Section A: Multiple Choice Questions (5 Marks)",
        instruction: "সঠিক উত্তরের পাশে টিক (✓) চিহ্ন দাও (প্রতিটি ১ নম্বর):",
        content: [
          "1. Where does Tania go with her father?\n   a) To a pharmacy    b) To a stationery shop    c) To a bakery    d) To a toy shop",
          "2. How many pencils does Tania want to buy?\n   a) One    b) Two    c) Three    d) Four",
          "3. What is the price of each pencil?\n   a) 5 taka    b) 10 taka    c) 15 taka    d) 20 taka",
          "4. How much does the notebook cost?\n   a) 20 taka    b) 25 taka    c) 30 taka    d) 40 taka",
          "5. How much total money does Tania's father pay?\n   a) 40 taka    b) 50 taka    c) 55 taka    d) 60 taka"
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Shopping Words (5 Marks)",
        instruction: "পাঠ্যাংশ থেকে উপযুক্ত শব্দ বসিয়ে শূন্যস্থান পূরণ করো:",
        content: [
          "1. Tania goes to a nearby ____________________ shop.",
          "2. The shopkeeper greets them ____________________.",
          "3. The eraser is ____________________ taka.",
          "4. The notebook is ____________________ taka.",
          "5. The shopkeeper gives the items packed neatly with a bright ____________________."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে 'True' এবং মিথ্যা হলে 'False' লেখো:",
        content: [
          "1. Tania goes to the shop with her mother. ( __________ )",
          "2. The shopkeeper says, 'Can I help you?' ( __________ )",
          "3. Each pencil costs ten taka. ( __________ )",
          "4. Tania buys two notebooks. ( __________ )",
          "5. Tania's father gives a fifty taka note and a five taka coin. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. What items does Tania need from the stationery shop?\n   Answer: ________________________________________________________________",
          "2. What are the individual prices of the pencils, eraser, and notebook?\n   Answer: ________________________________________________________________",
          "3. How does Tania's father pay the total bill?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};


// =========================================================================
// CLASS 4: UNIT 7 - TRAFFIC LIGHTS AND ROAD SAFETY (pp. 36–39)
// =========================================================================
// =========================================================================
// CLASS 4: UNIT 7 - TRAFFIC LIGHTS AND ROAD SAFETY (pp. 36–39)
// =========================================================================
export const TRAFFIC_SAFETY_SLIDE_DECK: SlideDeck = {
  id: "traffic-safety",
  grade: "Class 4 (৪র্থ শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 7: Traffic Rules and Safety",
  lesson: "Lesson 1: Traffic lights & signals",
  topic: "Traffic Lights, Pedestrian Safety & Road Rules (pp. 36–39)",
  category: "english",
  thumbnailEmoji: "🚦 🛑 🚸",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Traffic Lights and Road Safety",
      subtitle: "শহরের ট্রাফিক বাতি ও সড়ক নিরাপত্তার প্রাথমিক ধারণা (Orientation)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-rose-600 to-amber-600",
      imageEmoji: "🚦 🏙️ 🚗",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello class! Today we will learn about traffic lights and road safety.",
          "In modern cities and towns, traffic lights control the movement of vehicles.",
          "They keep roads safe for everyone — both drivers and pedestrians.",
          "Let's learn what red, yellow, and green lights tell us to do!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা ট্রাফিক বাতি এবং সড়ক নিরাপত্তা নিয়ে শিখব। আধুনিক শহর এবং নগরগুলোতে ট্রাফিক বাতি যানবাহনের চলাচল নিয়ন্ত্রণ করে এবং প্রত্যেকের জন্য রাস্তা নিরাপদ রাখে।"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তারা কি কখনও শহরে ট্রাফিক বাতি দেখেছে? সেখানে কয়টি রঙের আলো থাকে?",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষার্থীদের বাস্তব ট্রাফিক বাতির অভিজ্ঞতা শেয়ার করতে বলুন।",
        "ধাপ ২: লাল, হলুদ ও সবুজ রঙের গুরুত্ব সংক্ষেপে তুলে ধরুন।",
        "ধাপ ৩: মূল পাঠের সাথে পরিচয় করিয়ে দিন।"
      ]
    },
    {
      id: 2,
      title: "Reading & Listening: Road Safety Rules",
      subtitle: "পাঠ্যাংশ পাঠ ও অনুধাবন: ট্রাফিক লাইট ও নিরাপদে পথ চলা (NCTB Text)",
      phase: "২. মূল পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-red-600 to-rose-700",
      imageEmoji: "📖 🚦 🚸",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "In modern cities and towns, traffic lights control the movement of vehicles and keep roads safe for everyone.",
          "A traffic light has three distinct coloured lights: red, yellow and green.",
          "When the red light is on, all cars, buses and trucks must stop immediately.",
          "When the yellow light appears, drivers must slow down and wait.",
          "When the green light shines, vehicles can go safely.",
          "Pedestrians should always cross the busy road using the zebra crossing or foot overbridge.",
          "We must never run across a busy road. Following traffic rules saves human lives."
        ],
        banglaExplanation: "আধুনিক শহর এবং নগরগুলোতে ট্রাফিক বাতি যানবাহনের চলাচল নিয়ন্ত্রণ করে এবং প্রত্যেকের জন্য রাস্তা নিরাপদ রাখে। একটি ট্রাফিক বাতিতে তিনটি আলাদা রঙের বাতি থাকে: লাল, হলুদ এবং সবুজ। যখন লাল বাতি জ্বলে, সমস্ত গাড়ি, বাস এবং ট্রাক অবশ্যই অবিলম্বে থেমে যাবে। যখন হলুদ বাতি দেখা দেয়, চালকদের অবশ্যই গতি কমাতে হবে এবং অপেক্ষা করতে হবে। যখন সবুজ বাতি জ্বলে, যানবাহনগুলো নিরাপদে যেতে পারে। পথচারীদের সর্বদা জেব্রা ক্রসিং বা ফুটওভার ব্রিজ ব্যবহার করে ব্যস্ত রাস্তা পার হওয়া উচিত। আমাদের কখনোই ব্যস্ত রাস্তার ওপর দিয়ে দৌড়ানো উচিত নয়। ট্রাফিক নিয়ম মেনে চলা মানুষের অমূল্য জীবন রক্ষা করে।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রতিটি সিগন্যালের অর্থ স্পষ্ট করে বলুন: Red = Stop, Yellow = Slow Down & Wait, Green = Go Safely.",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক সঠিক উচ্চারণে অনুচ্ছেদটি পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে প্রতিটি লাইন পড়বে।",
        "ধাপ ৩: পথচারীদের নিরাপত্তা নির্দেশিকা আলাদা করে চিহ্নিত করুন।"
      ]
    },
    {
      id: 3,
      title: "Vocabulary Workshop: Traffic & Safety",
      subtitle: "শব্দসম্ভার: ট্রাফিক ও নিরাপত্তা সম্পর্কিত গুরুত্বপূর্ণ শব্দ (Key Vocabulary)",
      phase: "৩. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-amber-600 to-yellow-600",
      imageEmoji: "💡 📚 🔤",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Learn key vocabulary words related to road safety and traffic signals:"
        ],
        banglaExplanation: "সড়ক নিরাপত্তা ও ট্রাফিক সংকেত সম্পর্কিত ইংরেজি শব্দগুলোর সঠিক উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Traffic",
            syllables: ["Traf", "fic"],
            phonetic: "/ˈtræf.ɪk/",
            meaning: "যানবাহন চলাচল / ট্রাফিক",
            partOfSpeech: "Noun",
            example: "Traffic lights control vehicle movement in towns.",
            icon: "🚦"
          },
          {
            word: "Vehicles",
            syllables: ["Ve", "hi", "cles"],
            phonetic: "/ˈviː.ɪ.kəlz/",
            meaning: "যানবাহনগুলো (গাড়ি, বাস, ট্রাক)",
            partOfSpeech: "Noun",
            example: "Cars, buses, and trucks are different vehicles.",
            icon: "🚗"
          },
          {
            word: "Pedestrians",
            syllables: ["Pe", "des", "tri", "ans"],
            phonetic: "/pəˈdes.tri.ənz/",
            meaning: "পথচারীরা (যারা হেঁটে চলাচল করেন)",
            partOfSpeech: "Noun",
            example: "Pedestrians must cross on the zebra crossing.",
            icon: "🚶"
          },
          {
            word: "Immediately",
            syllables: ["Im", "me", "di", "ate", "ly"],
            phonetic: "/ɪˈmiː.di.ət.li/",
            meaning: "অবিলম্বে / তৎক্ষণাৎ",
            partOfSpeech: "Adverb",
            example: "Cars must stop immediately on red light.",
            icon: "⏱️"
          },
          {
            word: "Overbridge",
            syllables: ["O", "ver", "bridge"],
            phonetic: "/ˈoʊ.vɚ.brɪdʒ/",
            meaning: "উড়াল পারাপার সেতু / ফুটওভার ব্রিজ",
            partOfSpeech: "Noun",
            example: "Use the foot overbridge to cross highway safely.",
            icon: "🌉"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের 'Pedestrian' ও 'Immediately' শব্দের সিলেবল বিভাজন ও উচ্চারণ অনুশীলন করান।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি শব্দের সিলেবল করতালি দিয়ে উচ্চারণ করান।",
        "ধাপ ২: শব্দের বাংলা অর্থ ও বাস্তব উদাহরণ দিন।",
        "ধাপ ৩: শিক্ষার্থীরা নিজস্ব বাক্য গঠন করবে।"
      ]
    },
    {
      id: 4,
      title: "The Three Traffic Lights in Action",
      subtitle: "লাল, হলুদ ও সবুজ বাতির অর্থ ও প্রয়োগ (Signal Breakdown)",
      phase: "৪. সংকেত বিশ্লেষণ (Signal Rules)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "🔴 🟡 🟢",
      sceneType: "grammar",
      hasVisualStage: true,
      content: {
        englishText: [
          "Let's master the three distinct coloured lights of a traffic signal:",
          "1. RED LIGHT: STOP immediately! All vehicles must pause.",
          "2. YELLOW LIGHT: SLOW DOWN and WAIT! Prepare for the change.",
          "3. GREEN LIGHT: GO safely! Vehicles can move forward smoothly.",
          "Remember: Pedestrians cross only when vehicular traffic has safely stopped!"
        ],
        banglaExplanation: "ট্রাফিক সিগন্যালের তিনটি আলোর নিয়ম: ১. লাল বাতি: অবিলম্বে থামো! ২. হলুদ বাতি: গতি কমাও ও অপেক্ষা করো! ৩. সবুজ বাতি: নিরাপদে এগিয়ে যাও!"
      },
      teacherNotes: "ইন্টারেক্টিভ ভিজ্যুয়াল স্টেজে প্রতিটি বাতিতে ক্লিক করে শিক্ষার্থীদের সরাসরি গাড়ি থামাতে ও চালাতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে Red, Yellow, Green ক্লিক করে প্রতিক্রিয়া দেখুন।",
        "ধাপ ২: শিক্ষার্থীরা বাতির নাম শুনলেই হাত তুলে Stop/Wait/Go অঙ্গভঙ্গি করবে।",
        "ধাপ ৩: সংকেতের নিয়মগুলো মুখস্থ করুন।"
      ]
    },
    {
      id: 5,
      title: "Pedestrian Crossing: Zebra & Overbridge",
      subtitle: "নিরাপদে রাস্তা পারাপার: জেব্রা ক্রসিং ও ফুটওভার ব্রিজ (Crossing Safety)",
      phase: "৫. পথচারী নিরাপত্তা (Pedestrian Safety)",
      duration: "৫ মিনিট",
      themeColor: "from-blue-600 to-indigo-700",
      imageEmoji: "🦓 🚸 🌉",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "How can pedestrians cross busy city streets safely?",
          "1. Always use the zebra crossing with its white stripes painted on the road.",
          "2. On wide highways, always use the foot overbridge to cross above traffic.",
          "3. Look right, look left, and look right again before stepping onto the road.",
          "4. Golden Rule: NEVER run across a busy road!"
        ],
        banglaExplanation: "পথচারীরা কীভাবে নিরাপদে রাস্তা পার হবেন: ১. রাস্তায় সাদা দাগ টানা জেব্রা ক্রসিং ব্যবহার করো। ২. বড় সড়কে ফুটওভার ব্রিজ দিয়ে ওপর দিয়ে পার হও। ৩. ডানে তাকাও, বামে তাকাও, আবার ডানে তাকাও। ৪. সোনালী নিয়ম: কখনোই ব্যস্ত রাস্তার ওপর দৌড়াবে না!"
      },
      teacherNotes: "শিক্ষার্থীদের ক্লাসরুমে জেব্রা ক্রসিং দিয়ে শান্তভাবে পারাপারের মহড়া করান।",
      quickTeachingSteps: [
        "ধাপ ১: জেব্রা ক্রসিং কীভাবে নাম পেল (জেব্রার মতো সাদা-কালো দাগ) তা বলুন।",
        "ধাপ ২: ফুটওভার ব্রিজ ব্যবহারের উপকারিতা ব্যাখ্যা করুন।",
        "ধাপ ৩: ক্লাসে 'Look right, look left, look right' ড্রিল করান।"
      ]
    },
    {
      id: 6,
      title: "Interactive Road Safety Controller",
      subtitle: "ইন্টারেক্টিভ সিমুলেশন: ট্রাফিক লাইট ও পথচারী পারাপার (Interactive Stage)",
      phase: "৬. ইন্টারেক্টিভ সিমুলেশন (Interactive Stage)",
      duration: "৫ মিনিট",
      themeColor: "from-indigo-600 to-purple-600",
      imageEmoji: "🎮 🚦 🚶",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Take control of the city intersection on our interactive stage!",
          "Switch between Red, Yellow, and Green lights.",
          "Guide the pedestrian safely across the zebra crossing when the light is RED.",
          "Check off all four essential safety rules in your Junior Safety Checklist!"
        ],
        banglaExplanation: "আমাদের ইন্টারেক্টিভ স্টেজে শহরের মোড়ের ট্রাফিক নিয়ন্ত্রণ করো! বাতি পরিবর্তন করো এবং পথচারীকে নিরাপদে জেব্রা ক্রসিং দিয়ে পার হতে সাহায্য করো।"
      },
      teacherNotes: "শিক্ষার্থীদের ডেকে এনে বাতি পরিবর্তন এবং জেব্রা ক্রসিং পারাপার বোতাম চাপতে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: ইন্টারেক্টিভ স্টেজের ট্রাফিক লাইট পরীক্ষা করুন।",
        "ধাপ ২: পথচারীকে নিরাপদে রাস্তা পার করান।",
        "ধাপ ৩: চারটি নিরাপত্তা চেকলিস্ট পূরণ করুন।"
      ]
    },
    {
      id: 7,
      title: "Quick Review & Formative Check",
      subtitle: "দ্রুত যাচাই ও মূল্যায়ন: ট্রাফিক সংকেতের তাৎক্ষণিক প্রশ্নোত্তর (Quick Assessment)",
      phase: "৭. গঠনমূলক মূল্যায়ন (Formative Assessment)",
      duration: "৪ মিনিট",
      themeColor: "from-teal-600 to-cyan-700",
      imageEmoji: "🎯 📝 ⚡",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Test your road safety knowledge with rapid-fire questions:",
          "1. What colour tells vehicles to stop immediately? (Red)",
          "2. What should drivers do when the yellow light appears? (Slow down and wait)",
          "3. Where should pedestrians cross a busy street? (Zebra crossing / Overbridge)",
          "4. Why must we never run across a road? (To prevent serious accidents)"
        ],
        banglaExplanation: "দ্রুত প্রশ্নের উত্তর দাও এবং নিজের সড়ক নিরাপত্তা জ্ঞান যাচাই করো!"
      },
      teacherNotes: "শিক্ষার্থীদের হাত তুলতে বলুন এবং দলগতভাবে সঠিক উত্তর দিন।",
      quickTeachingSteps: [
        "ধাপ ১: স্ক্রিনের প্রশ্নগুলো এক এক করে জিজ্ঞেস করুন।",
        "ধাপ ২: শিক্ষার্থীদের স্বতঃস্ফূর্ত উত্তর দিতে উৎসাহিত করুন।",
        "ধাপ ৩: সঠিক উত্তরের প্রশংসা করুন।"
      ]
    },
    {
      id: 8,
      title: "Summary & Companion Worksheet",
      subtitle: "পাঠের সারসংক্ষেপ ও ২০ নম্বরের পূর্ণাঙ্গ মূল্যায়ন ওয়ার্কশিট (Summary & Assessment)",
      phase: "৮. সারসংক্ষেপ ও মূল্যায়ন (Summary & Assessment)",
      duration: "৩ মিনিট",
      themeColor: "from-slate-700 to-slate-900",
      imageEmoji: "📋 🏆 🌟",
      sceneType: "summary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed the Traffic Lights and Road Safety lesson.",
          "Key Takeaways:",
          "• Red means Stop, Yellow means Slow Down & Wait, Green means Go Safely.",
          "• Always cross on zebra crossings or foot overbridges.",
          "• Never run across the road — Following rules saves human lives!",
          "Now complete the 20-mark companion worksheet below to earn your Junior Road Safety Certificate!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা সফলভাবে ট্রাফিক লাইট ও সড়ক নিরাপত্তার পাঠ সম্পন্ন করেছ। মনে রেখো: ট্রাফিক নিয়ম মেনে চলা মানুষের অমূল্য জীবন বাঁচায়!"
      },
      teacherNotes: "শিক্ষার্থীদের ২০ নম্বরের পূর্ণাঙ্গ সঙ্গী ওয়ার্কশিট সম্পন্ন করতে দিন এবং মূল্যায়ন করুন।",
      quickTeachingSteps: [
        "ধাপ ১: পুরো পাঠের ৩টি প্রধান বার্তা পুনরাবৃত্তি করুন।",
        "ধাপ ২: ২০ নম্বরের ওয়ার্কশিট খুলুন।",
        "ধাপ ৩: শিক্ষার্থীদের স্বাধীনভাবে উত্তর লিখতে বলুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 4 English Evaluation — Traffic Lights and Road Safety",
    classGrade: "Class 4 (৪র্থ শ্রেণি)",
    subject: "English for Today (Unit 7, Lesson 1)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "matching",
        title: "Section A: Column Matching (5 Marks)",
        instruction: "Column A-এর সাথে Column B-এর সঠিক অংশের অর্থপূর্ণ মিল করো:",
        content: [
          { a: "1. Red light", b: "a. using zebra crossing or overbridge." },
          { a: "2. Yellow light", b: "b. saves human lives and prevents accidents." },
          { a: "3. Green light", b: "c. all cars, buses and trucks must stop immediately." },
          { a: "4. Pedestrians cross", b: "d. drivers must slow down and wait." },
          { a: "5. Obeying traffic rules", b: "e. vehicles can go safely across the road." }
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Clues (5 Marks)",
        instruction: "ক্লু বক্স থেকে উপযুক্ত শব্দ নিয়ে শূন্যস্থান পূরণ করো: [ zebra, lights, immediately, slow, lives ]",
        content: [
          "1. Traffic ____________ control the movement of vehicles in cities.",
          "2. When red light is on, vehicles must stop ____________.",
          "3. When yellow light appears, drivers must ____________ down and wait.",
          "4. Pedestrians should always cross the road using the ____________ crossing.",
          "5. Following traffic rules saves valuable human ____________."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে True এবং মিথ্যা হলে False লেখো:",
        content: [
          "1. A traffic light has four distinct colours. ( __________ )",
          "2. Drivers must speed up when the yellow light appears. ( __________ )",
          "3. When the green light shines, vehicles can go safely. ( __________ )",
          "4. Pedestrians can safely cross using a foot overbridge. ( __________ )",
          "5. It is completely safe to run across a busy road. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. What do the three colours of traffic lights mean?\n   Answer: ________________________________________________________________",
          "2. How should pedestrians cross a busy road safely?\n   Answer: ________________________________________________________________",
          "3. Why should we never run across a busy road?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};


// =========================================================================
// CLASS 4: UNIT 8 - RAJU THE FIREFIGHTER (pp. 42–45)
// =========================================================================
export const RAJU_FIREFIGHTER_C4_SLIDE_DECK: SlideDeck = {
  id: "raju-firefighter-c4",
  grade: "Class 4 (৪র্থ শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 8: A Fire and a Firefighter (Raju)",
  lesson: "Lesson 2: Raju the Firefighter",
  topic: "Raju the Firefighter: Bravery, Volunteering & Fire Safety (pp. 42–45)",
  category: "english",
  thumbnailEmoji: "👨‍🚒 🚒 🔥",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Raju the Firefighter",
      subtitle: "সাহসী রাজু ও ফায়ার সার্ভিস কর্মীদের গল্প (Orientation & Pre-reading)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-red-600 to-amber-600",
      imageEmoji: "👨‍🚒 🚒 🏫",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello learners! Welcome to Class 4 English.",
          "Today we will meet Raju, a brave firefighter who loves helping people.",
          "We will learn what happened when a sudden fire broke out in his school.",
          "Let's explore how Raju became a firefighter and how to stay safe from fire!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা রাজু নামের একজন সাহসী অগ্নিনির্বাপক কর্মীর সাথে পরিচিত হব, যিনি মানুষকে সাহায্য করতে ভালোবাসেন। তাঁর স্কুলে হঠাৎ আগুন লাগার দিনে কী ঘটেছিল এবং কীভাবে তিনি ফায়ার সার্ভিসে যোগ দিলেন, তা আজ আমরা জানব!"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তারা কি কখনো ফায়ার সার্ভিসের লাল রঙের গাড়ি দেখেছে বা সাইরেন শুনেছে?",
      quickTeachingSteps: [
        "ধাপ ১: ফায়ার সার্ভিসের ভূমিকা সংক্ষেপে ক্লাসে তুলে ধরুন।",
        "ধাপ ২: আগুন লাগলে ভয় না পেয়ে শান্ত থাকার গুরুত্ব বোঝান।",
        "ধাপ ৩: মূল পাঠের সাথে শিক্ষার্থীদের যুক্ত করুন।"
      ]
    },
    {
      id: 2,
      title: "Reading & Listening: The School Fire",
      subtitle: "পাঠ্যাংশ পাঠ: রাজুর স্কুলের আকস্মিক অগ্নিকাণ্ড (NCTB Text Part 1)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-orange-600 to-red-600",
      imageEmoji: "📖 🔥 🏃",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "A long time ago, when Raju was in Class 5, there was a sudden fire in his school.",
          "Everyone was very afraid, but no one panicked.",
          "The teachers helped the students leave the school building quietly and safely.",
          "Soon the firefighters came and put out the fire.",
          "Raju watched the brave firefighters from the school yard."
        ],
        banglaExplanation: "অনেক দিন আগে, রাজু যখন পঞ্চম শ্রেণিতে পড়ত, তখন তার বিদ্যালয়ে হঠাৎ আগুন লেগেছিল। সবাই খুব ভয় পেয়েছিল, কিন্তু কেউ আতঙ্কিত হয়নি। শিক্ষকেরা শিক্ষার্থীদের শান্তভাবে ও নিরাপদে বিদ্যালয় ভবন থেকে বের হতে সাহায্য করেছিলেন। শীঘ্রই অগ্নিনির্বাপক কর্মীরা এলেন এবং আগুন নিভিয়ে ফেললেন। রাজু বিদ্যালয় প্রাঙ্গণ থেকে সেই সাহসী ফায়ার ফাইটারদের দেখেছিল।"
      },
      teacherNotes: "শিক্ষার্থীদের 'panicked' শব্দের অর্থ স্পষ্ট করে বলুন: আতঙ্কিত হয়ে বিশৃঙ্খলা না করা।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক সঠিক বাচনভঙ্গিতে অনুচ্ছেদটি পড়ে শোনাবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে পুনরাবৃত্তি করবে।",
        "ধাপ ৩: শিক্ষকেরা কীভাবে নিরাপদে বের করেছিলেন তা আলোচনা করুন।"
      ]
    },
    {
      id: 3,
      title: "Reading & Listening: Raju's Calling",
      subtitle: "পাঠ্যাংশ পাঠ: স্বেচ্ছাসেবক থেকে পেশাদার কর্মী (NCTB Text Part 2)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-red-600 to-rose-700",
      imageEmoji: "🤝 👨‍🚒 🎓",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "He thought about the fire and the firefighters for a long time.",
          "After college, Raju joined a volunteer fire department.",
          "Now, Raju is a full-time firefighter. It is his job, so he earns money for it, but most of the time his work is volunteer.",
          "When there is a fire, Raju helps put it out. He also teaches young people about fire safety."
        ],
        banglaExplanation: "সে অনেক দিন ধরে সেই আগুন ও দমকল কর্মীদের কথা চিন্তা করেছিল। কলেজ শেষ করার পর রাজু একটি স্বেচ্ছাসেবী ফায়ার সার্ভিসে যোগ দেয়। এখন রাজু একজন পূর্ণকালীন অগ্নিনির্বাপক কর্মী। এটি তার চাকরি, তাই সে এর জন্য বেতন পায়; কিন্তু তার বেশিরভাগ কাজই স্বেচ্ছাসেবা। যখন কোথাও আগুন লাগে, রাজু তা নেভাতে সাহায্য করে। সে তরুণদের অগ্নি নিরাপত্তা সম্পর্কেও শিক্ষা দেয়।"
      },
      teacherNotes: "শিক্ষার্থীদের 'volunteer' এবং 'full-time job' এর পার্থক্য বুঝিয়ে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: রাজু কীভাবে ফায়ার সার্ভিসে যোগ দিল তা চিহ্নিত করুন।",
        "ধাপ ২: স্বেচ্ছাসেবার মহৎ উদ্দেশ্য ব্যাখ্যা করুন।",
        "ধাপ ৩: শিক্ষার্থীদের রাজুর মতো সমাজসেবায় উৎসাহিত করুন।"
      ]
    },
    {
      id: 4,
      title: "Vocabulary Workshop: Heroes & Safety",
      subtitle: "শব্দসম্ভার: ফায়ার সার্ভিস ও নিরাপত্তা বিষয়ক শব্দ (Key Vocabulary)",
      phase: "৩. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-amber-600 to-orange-600",
      imageEmoji: "💡 📚 🔤",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Learn key vocabulary words from Raju's story:"
        ],
        banglaExplanation: "রাজুর গল্প থেকে গুরুত্বপূর্ণ ইংরেজি শব্দগুলোর সঠিক উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Firefighter",
            syllables: ["Fire", "fight", "er"],
            phonetic: "/ˈfaɪəˌfaɪ.tər/",
            meaning: "দমকল কর্মী / অগ্নিনির্বাপক",
            partOfSpeech: "Noun",
            example: "The firefighter put out the fire quickly.",
            icon: "👨‍🚒"
          },
          {
            word: "Volunteer",
            syllables: ["Vol", "un", "teer"],
            phonetic: "/ˌvɒl.ənˈtɪər/",
            meaning: "স্বেচ্ছাসেবক (যিনি বিনা পারিশ্রমিকে সেবা দেন)",
            partOfSpeech: "Noun / Verb",
            example: "Raju joined a volunteer fire department.",
            icon: "🤝"
          },
          {
            word: "Panicked",
            syllables: ["Pan", "icked"],
            phonetic: "/ˈpæn.ɪkt/",
            meaning: "আতঙ্কগ্রস্ত হওয়া / ভয়ে বিভ্রান্ত হওয়া",
            partOfSpeech: "Verb (Past)",
            example: "Everyone was afraid, but no one panicked.",
            icon: "😱"
          },
          {
            word: "Quietly",
            syllables: ["Qui", "et", "ly"],
            phonetic: "/ˈkwaɪ.ət.li/",
            meaning: "শান্তভাবে / নিঃশব্দে",
            partOfSpeech: "Adverb",
            example: "Students left the school quietly and safely.",
            icon: "🤫"
          },
          {
            word: "Safety",
            syllables: ["Safe", "ty"],
            phonetic: "/ˈseɪf.ti/",
            meaning: "নিরাপত্তা",
            partOfSpeech: "Noun",
            example: "Raju teaches young students fire safety.",
            icon: "🛡️"
          }
        ]
      },
      teacherNotes: "প্রতিটি শব্দের উচ্চারণ এবং সিলেবল বিভাজন হাততালি দিয়ে অনুশীলন করান।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক প্রতিটি শব্দ স্পষ্ট উচ্চারণে পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে পুনরাবৃত্তি করবে।",
        "ধাপ ৩: প্রতিটি শব্দ দিয়ে একটি করে বাস্তব বাক্য তৈরি করান।"
      ]
    },
    {
      id: 5,
      title: "Interactive Stage: Fire Drill & Tools",
      subtitle: "ইন্টারেক্টিভ সিমুলেশন: ফায়ার সার্ভিসের সরঞ্জাম ও মহড়া (Interactive Stage)",
      phase: "৪. প্রায়োগিক মহড়া (Interactive Drill)",
      duration: "৫ মিনিট",
      themeColor: "from-red-600 to-amber-700",
      imageEmoji: "🚒 🌊 🧯",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Explore the fire station and practice fire rescue on the interactive stage!",
          "Inspect essential firefighting equipment:",
          "• Fire Truck: Carries water tanks and long rescue ladders.",
          "• Water Hose: Sprays powerful water streams to stop the fire.",
          "• Fire Helmet: Shields firefighters from extreme heat and falling objects.",
          "• Fire Extinguisher: Puts out sudden small fires."
        ],
        banglaExplanation: "ইন্টারেক্টিভ স্টেজে ফায়ার স্টেশনের যন্ত্রপাতি পরীক্ষা করো এবং পানির হোসপাইপ দিয়ে ভার্চুয়াল আগুন নিভিয়ে নিরাপদ করো!"
      },
      teacherNotes: "শিক্ষার্থীদের স্টেজে 'পানি ছিটান' বোতামে ক্লিক করে আগুন নিভানোর অভিজ্ঞতা নিতে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: ফায়ার ট্রাক ও হোসপাইপের কাজ ব্যাখ্যা করুন।",
        "ধাপ ২: শিক্ষার্থীদের বোতামে ক্লিক করে ভার্চুয়াল আগুন নিভাতে বলুন।",
        "ধাপ ৩: যন্ত্রপাতিগুলোর ইংরেজি নাম মুখে মুখে বলা নিশ্চিত করুন।"
      ]
    },
    {
      id: 6,
      title: "Raju's 4 Golden Fire Safety Rules",
      subtitle: "রাজুর ৪টি অপরিহার্য অগ্নি নিরাপত্তা নিয়মাবলী (Safety Principles)",
      phase: "৫. নিরাপত্তা নির্দেশিকা (Fire Safety Rules)",
      duration: "৪ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "🛡️ 💡 📞",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Follow Raju's four golden fire safety rules:",
          "1. DO NOT PANIC: Keep your head cool and stay calm.",
          "2. LEAVE QUIETLY: Walk out in an orderly line without pushing.",
          "3. CRAWL UNDER SMOKE: Stay low to the ground where clean air exists.",
          "4. CALL 999: Quickly alert adults and the national emergency fire service."
        ],
        banglaExplanation: "রাজুর চারটি সোনালী নিরাপত্তা নিয়ম: ১. আতঙ্কিত হবে না। ২. শান্তভাবে ও সারিবদ্ধভাবে বের হও। ৩. ধোঁয়ার নিচ দিয়ে হামাগুড়ি দাও। ৪. জাতীয় জরুরি নম্বর ৯৯৯-এ দমকল বাহিনীকে খবর দাও।"
      },
      teacherNotes: "ক্লাসরুমে শিক্ষার্থীদের মাটিতে নিচু হয়ে ধোঁয়ার নিচে হাঁটার অভিনয় করান।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি নিয়মের বৈজ্ঞানিক কারণ ব্যাখ্যা করুন (ধোঁয়া ওপরের দিকে ওঠে)।",
        "ধাপ ২: ৯৯৯ জরুরি নম্বরের গুরুত্ব আলোচনা করুন।",
        "ধাপ ৩: শিক্ষার্থীরা সমস্বরে নিরাপত্তা শপথ উচ্চারণ করবে।"
      ]
    },
    {
      id: 7,
      title: "Interactive Comprehension & Rapid Quiz",
      subtitle: "দ্রুত যাচাই ও পাঠ মূল্যায়ন (Formative Assessment)",
      phase: "৬. গঠনমূলক মূল্যায়ন (Rapid Quiz)",
      duration: "৪ মিনিট",
      themeColor: "from-blue-600 to-indigo-700",
      imageEmoji: "🎯 ⚡ 📝",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Let's test our understanding with quick questions:",
          "1. What class was Raju in when the fire broke out? (Class 5)",
          "2. Who helped students leave the school safely? (The teachers)",
          "3. What did Raju join after finishing college? (A volunteer fire department)",
          "4. What does Raju teach young people today? (Fire safety rules)"
        ],
        banglaExplanation: "প্রশ্নগুলোর উত্তর দাও এবং রাজুর বীরত্বপূর্ণ জীবনের গুরুত্বপূর্ণ তথ্যগুলো পুনরাবৃত্তি করো!"
      },
      teacherNotes: "শিক্ষার্থীদের দ্রুত হাত তুলে উত্তর দিতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি প্রশ্ন ক্লাসে জিজ্ঞেস করুন।",
        "ধাপ ২: শিক্ষার্থীদের স্বতঃস্ফূর্ত উত্তরের প্রশংসা করুন।",
        "ধাপ ৩: সঠিক উত্তর বোর্ডের মাধ্যমে নিশ্চিত করুন।"
      ]
    },
    {
      id: 8,
      title: "Summary & 20-Mark Companion Worksheet",
      subtitle: "পাঠের সারসংক্ষেপ ও পূর্ণাঙ্গ ২০ নম্বরের মূল্যায়ন (Summary & Worksheet)",
      phase: "৭. সারসংক্ষেপ ও মূল্যায়ন (Wrap-up)",
      duration: "৩ মিনিট",
      themeColor: "from-slate-800 to-stone-900",
      imageEmoji: "🏆 🌟 📝",
      sceneType: "summary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Well done! You have completed the story of Raju the Firefighter.",
          "Key Takeaways:",
          "• Stay calm in emergencies; never panic.",
          "• Firefighters and teachers are real-life heroes who save lives.",
          "• Volunteering and helping others makes our society beautiful.",
          "Now open and solve the 20-mark companion worksheet below!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা ফায়ার ফাইটার রাজুর পাঠ সফলভাবে সম্পন্ন করেছ। মনে রেখো: বিপদে শান্ত থাকা এবং নিঃস্বার্থভাবে অন্যের সেবা করাই প্রকৃত বীরের পরিচয়!"
      },
      teacherNotes: "শিক্ষার্থীদের ২০ নম্বরের পূর্ণাঙ্গ সঙ্গী ওয়ার্কশিট সমাধান করতে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: পাঠের মূল শিক্ষা সংক্ষেপে মনে করিয়ে দিন।",
        "ধাপ ২: ওয়ার্কশিট খুলুন।",
        "ধাপ ৩: শিক্ষার্থীদের স্বাবলম্বীভাবে পরীক্ষা শেষ করতে বলুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 4 English Evaluation — Raju the Firefighter",
    classGrade: "Class 4 (৪র্থ শ্রেণি)",
    subject: "English for Today (Unit 8, Lesson 2)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "matching",
        title: "Section A: Column Matching (5 Marks)",
        instruction: "Column A-এর সাথে Column B-এর সঠিক অংশের অর্থপূর্ণ মিল করো:",
        content: [
          { a: "1. A fire broke out", b: "a. helped the students leave quietly." },
          { a: "2. The brave teachers", b: "b. when Raju was in Class 5." },
          { a: "3. Firefighters came", b: "c. a volunteer fire department." },
          { a: "4. After college, Raju joined", d: "d. and put out the fire quickly." },
          { a: "5. Today Raju teaches", e: "e. young people about fire safety." }
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Clues (5 Marks)",
        instruction: "ক্লু বক্স থেকে উপযুক্ত শব্দ নিয়ে শূন্যস্থান পূরণ করো: [ volunteer, Class 5, panicked, firefighters, safety ]",
        content: [
          "1. When Raju was in ____________, there was a sudden fire in his school.",
          "2. Everyone was very afraid, but no one ____________.",
          "3. Soon the ____________ came and put out the fire.",
          "4. Raju joined a ____________ fire department after college.",
          "5. Raju teaches young people about fire ____________."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে True এবং মিথ্যা হলে False লেখো:",
        content: [
          "1. Raju was in Class 4 when the fire occurred in his school. ( __________ )",
          "2. The students panicked and ran everywhere. ( __________ )",
          "3. Teachers helped students leave the building safely. ( __________ )",
          "4. Raju is now a full-time firefighter. ( __________ )",
          "5. Raju never teaches fire safety to young children. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. What did the teachers do when the fire broke out in the school?\n   Answer: ________________________________________________________________",
          "2. What did Raju join after college?\n   Answer: ________________________________________________________________",
          "3. What does Raju do in his job as a firefighter?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};


// =========================================================================
// CLASS 4: UNIT 10 - SREEMANGAL: THE TEA CAPITAL OF BANGLADESH (pp. 52–55)
// =========================================================================
export const SREEMANGAL_TEA_SLIDE_DECK: SlideDeck = {
  id: "sreemangal-tea",
  grade: "Class 4 (৪র্থ শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 10: Sreemangal - The Land of Tea",
  lesson: "Lesson 1: Sreemangal - The Land of Tea",
  topic: "Sreemangal: The Tea Capital of Bangladesh, Lawachara Rainforest & Tea Culture (pp. 52–55)",
  category: "english",
  thumbnailEmoji: "🍃 ☕ 🐒",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Welcome to Sreemangal",
      subtitle: "বাংলাদেশের চায়ের রাজধানী শ্রীমঙ্গলে স্বাগতম (Orientation & Geography)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "🍃 🏞️ ☕",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello wonderful students! Welcome to our English class.",
          "Today we will take a journey to Sreemangal, the tea capital of Bangladesh.",
          "We will explore lush green tea gardens spreading across gentle hill slopes.",
          "We will also visit the famous Lawachara National Park and discover rare wildlife!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা বাংলাদেশের চায়ের রাজধানী শ্রীমঙ্গলে একটি চমৎকার ভ্রমণ করব। আমরা ঢেউখেলানো পাহাড়ের ঢালে অবস্থিত দিগন্তজোড়া সবুজ চা বাগান ঘুরে দেখব এবং বিখ্যাত লাউয়াছড়া জাতীয় উদ্যানের দুর্লভ বন্যপ্রাণী ও পাখির সাথে পরিচিত হব!"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তারা কি কখনো সিলেটে বা কোনো চা বাগানে গিয়েছে? চা কীভাবে তৈরি হয় তারা কি জানে?",
      quickTeachingSteps: [
        "ধাপ ১: বাংলাদেশের চা শিল্পের গুরুত্ব ও শ্রীমঙ্গলের অবস্থান ব্যাখ্যা করুন।",
        "ধাপ ২: চা বাগানের দৃশ্য কল্পনা করতে বলুন।",
        "ধাপ ৩: মূল পাঠের সাথে শিক্ষার্থীদের যুক্ত করুন।"
      ]
    },
    {
      id: 2,
      title: "Reading & Listening: The Tea Capital",
      subtitle: "পাঠ্যাংশ পাঠ: সবুজ পাহাড়ের ঢাল ও চা বাগান (NCTB Text Part 1)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-teal-600 to-emerald-700",
      imageEmoji: "📖 ⛰️ 🍃",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Sreemangal is known as the tea capital of Bangladesh.",
          "It is located in the Moulvibazar district under Sylhet division.",
          "Sreemangal is famous for its miles after miles of lush green tea gardens on rolling hill slopes.",
          "Women tea pluckers with large bamboo baskets tied to their backs pluck fresh tender tea leaves with skillful hands."
        ],
        banglaExplanation: "শ্রীমঙ্গল বাংলাদেশের চায়ের রাজধানী হিসেবে পরিচিত। এটি সিলেট বিভাগের অধীন মৌলভীবাজার জেলায় অবস্থিত। শ্রীমঙ্গল ঢেউখেলানো পাহাড়ের ঢালে মাইলের পর মাইল বিস্তৃত ঘন সবুজ চা বাগানের জন্য বিখ্যাত। নারী চা শ্রমিকেরা পিঠে বড় বাঁশের খাঁচা বেঁধে দক্ষ হাতে কচি ও তাজা চা পাতা তোলেন।"
      },
      teacherNotes: "'two leaves and a bud' (দুটি পাতা একটি কুঁড়ি) ধারণাটি শিক্ষার্থীদের ব্যাখ্যা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক সঠিক উচ্চারণে ও অভিব্যক্তিতে অনুচ্ছেদটি পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে পুনরাবৃত্তি করবে।",
        "ধাপ ৩: মৌলভীবাজার জেলা ও সিলেট বিভাগের মানচিত্র নির্দেশ করুন।"
      ]
    },
    {
      id: 3,
      title: "Reading & Listening: Lawachara & Tourism",
      subtitle: "পাঠ্যাংশ পাঠ: লাউয়াছড়া রেইনফরেস্ট ও শান্ত প্রকৃতি (NCTB Text Part 2)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-700 to-green-800",
      imageEmoji: "🌲 🐒 🦌",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Near the tea gardens lies the Lawachara National Park, home to rare monkeys, deer and colorful birds.",
          "Many tourists visit Sreemangal to enjoy its refreshing cool breeze and peaceful green nature.",
          "Visitors can walk through evergreen canopy trails and listen to chirping forest birds.",
          "Sreemangal is truly one of the most beautiful eco-tourism destinations of Bangladesh."
        ],
        banglaExplanation: "চা বাগানের কাছেই অবস্থিত লাউয়াছড়া জাতীয় উদ্যান, যা বিরল বানর (উল্লুক), হরিণ ও রঙিন পাখির আবাসস্থল। অনেক পর্যটক শ্রীমঙ্গলের সতেজ শীতল বাতাস এবং শান্ত সবুজ প্রকৃতি উপভোগ করতে আসেন। দর্শনার্থীরা চিরসবুজ বনের মধ্য দিয়ে হেঁটে যেতে পারেন এবং পাখিদের সুমধুর কলকাকলি শুনতে পান। শ্রীমঙ্গল সত্যিই বাংলাদেশের অন্যতম সুন্দর পরিবেশ-বান্ধব পর্যটন স্থান।"
      },
      teacherNotes: "লাউয়াছড়ার বিপন্ন প্রাণী 'উল্লুক' (Hoolock Gibbon) সম্পর্কে তথ্য দিন।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষার্থীদের লাউয়াছড়া উদ্যানের প্রাকৃতিক পরিবেশ বর্ণনা করতে বলুন।",
        "ধাপ ২: 'Tourists' ও 'National Park' শব্দের অর্থ আলোচনা করুন।",
        "ধাপ ৩: বন্যপ্রাণী সুরক্ষার গুরুত্ব আলোচনা করুন।"
      ]
    },
    {
      id: 4,
      title: "Vocabulary Workshop: Nature & Geography",
      subtitle: "শব্দসম্ভার: চা ও প্রকৃতি বিষয়ক গুরুত্বপূর্ণ শব্দ (Key Vocabulary)",
      phase: "৩. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-amber-600 to-emerald-700",
      imageEmoji: "💡 📚 🔤",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Learn key vocabulary words related to Sreemangal and its nature:"
        ],
        banglaExplanation: "শ্রীমঙ্গল এবং প্রকৃতি বিষয়ক ইংরেজি শব্দগুলোর সঠিক উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Pluckers",
            syllables: ["Pluck", "ers"],
            phonetic: "/ˈplʌk.ərz/",
            meaning: "পাতা চয়নকারী / যারা পাতা তোলে",
            partOfSpeech: "Noun",
            example: "Tea pluckers harvest leaves with skillful hands.",
            icon: "👩‍🌾"
          },
          {
            word: "Slopes",
            syllables: ["Slopes"],
            phonetic: "/sloʊps/",
            meaning: "পাহাড়ের ঢালসমূহ",
            partOfSpeech: "Noun",
            example: "Tea bushes grow beautifully on rolling hill slopes.",
            icon: "⛰️"
          },
          {
            word: "National Park",
            syllables: ["Na", "tion", "al", "Park"],
            phonetic: "/ˈnæʃ.ən.əl pɑːrk/",
            meaning: "জাতীয় উদ্যান / সংরক্ষিত বনাঞ্চল",
            partOfSpeech: "Noun",
            example: "Lawachara is a famous national park.",
            icon: "🌲"
          },
          {
            word: "Tourists",
            syllables: ["Tour", "ists"],
            phonetic: "/ˈtʊə.rɪsts/",
            meaning: "পর্যটকবৃন্দ / ভ্রমণকারী",
            partOfSpeech: "Noun",
            example: "Many tourists visit Sreemangal every winter.",
            icon: "🧳"
          },
          {
            word: "Breeze",
            syllables: ["Breeze"],
            phonetic: "/briːz/",
            meaning: "মৃদুমন্দ শীতল বাতাস",
            partOfSpeech: "Noun",
            example: "Tourists enjoy the cool breeze of tea hills.",
            icon: "🍃"
          }
        ]
      },
      teacherNotes: "'Slopes' ও 'Pluckers' শব্দের উচ্চারণ ও বানান মনোযোগ দিয়ে শেখান।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি শব্দের সঠিক উচ্চারণ ও সিলেবল করতালি দিয়ে শেখান।",
        "ধাপ ২: প্রতিটি শব্দের বাংলা অর্থ স্পষ্ট করুন।",
        "ধাপ ৩: শিক্ষার্থীরা নতুন বাক্য তৈরি করবে।"
      ]
    },
    {
      id: 5,
      title: "Interactive Stage: Tea Plucking & Rainforest",
      subtitle: "ইন্টারেক্টিভ সিমুলেশন: চা চয়ন ও লাউয়াছড়ার বন্যপ্রাণী (Interactive Stage)",
      phase: "৪. প্রায়োগিক সিমুলেশন (Interactive Stage)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-600 to-teal-800",
      imageEmoji: "🌱 🧺 🐒",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Step into the scenic tea gardens of Sreemangal on our interactive stage!",
          "Experience hands-on tea harvesting: Click to pluck 'two leaves and a bud' into the bamboo basket.",
          "Explore Lawachara Rainforest wildlife: Meet the Hoolock Gibbon ape, barking deer, and great hornbill.",
          "Discover the mystery of the famous Seven-Layer Tea in one single glass!"
        ],
        banglaExplanation: "আমাদের ইন্টারেক্টিভ স্টেজে শ্রীমঙ্গলের চা বাগানে প্রবেশ করো! 'দুটি পাতা একটি কুঁড়ি' চয়ন করে বাঁশের খাঁচায় ভর এবং লাউয়াছড়ার দুর্লভ প্রাণীদের ডাক শোনো!"
      },
      teacherNotes: "শিক্ষার্থীদের স্টেজে পাতা চয়ন করার এবং সাত রঙের চায়ের গল্প শোনার সুযোগ দিন।",
      quickTeachingSteps: [
        "ধাপ ১: চা চয়ন সিমুলেশন চালু করুন।",
        "ধাপ ২: লাউয়াছড়ার উল্লুক ও মায়াহরিণ প্রদর্শন করুন।",
        "ধাপ ৩: শিক্ষার্থীদের সাত রঙের চায়ের বৈশিষ্ট্য জিজ্ঞেস করুন।"
      ]
    },
    {
      id: 6,
      title: "Seven-Layer Tea & Cultural Heritage",
      subtitle: "নীলকণ্ঠের সাত রঙের চা ও শ্রীমঙ্গলের বিশেষ ঐতিহ্য (Cultural Heritage)",
      phase: "৫. ঐতিহ্য ও সংস্কৃতি (Cultural Heritage)",
      duration: "৪ মিনিট",
      themeColor: "from-amber-600 to-orange-700",
      imageEmoji: "☕ 🌈 ✨",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Did you know Sreemangal is famous for a unique drink called Seven-Layer Tea?",
          "A local tea master invented a special method to layer seven different tea flavors in one transparent glass.",
          "Each layer has a different color, aroma, and taste — from black tea to green tea, lemon, and spice!",
          "Tourists from all over the world travel to Sreemangal to taste this astonishing tea."
        ],
        banglaExplanation: "তোমরা কি জানো শ্রীমঙ্গল একটি বিশেষ পানীয়ের জন্য বিশ্বখ্যাত, যার নাম 'সাত রঙের চা'? স্থানীয় চা কারিগর একটি কাচের গ্লাসে সাতটি আলাদা রঙের ও স্বাদের চায়ের স্তর তৈরি করার বিশেষ কৌশল উদ্ভাবন করেন। বিশ্বজুড়ে পর্যটকেরা এই চমৎকার চা পান করতে শ্রীমঙ্গলে আসেন।"
      },
      teacherNotes: "সাত রঙের চায়ের আবিষ্কারক রমেশ রাম গৌড় ও নীলকণ্ঠ টি কেবিনের গল্প শিক্ষার্থীদের শোনান।",
      quickTeachingSteps: [
        "ধাপ ১: কীভাবে সাতটি স্তর আলাদা থাকে (ঘনত্বের তারতম্য) তা সহজ ভাষায় বোঝান।",
        "ধাপ ২: চা কীভাবে বাংলাদেশের অর্থনীতিতে ভূমিকা রাখে তা আলোচনা করুন।",
        "ধাপ ৩: পর্যটনের গুরুত্ব শিক্ষার্থীদের কাছে তুলে ধরুন।"
      ]
    },
    {
      id: 7,
      title: "Interactive Review & Quick Quiz",
      subtitle: "দ্রুত যাচাই ও মূল্যায়ন: শ্রীমঙ্গলের ভূগোল ও পরিবেশ (Quick Check)",
      phase: "৬. গঠনমূলক মূল্যায়ন (Rapid Quiz)",
      duration: "৪ মিনিট",
      themeColor: "from-teal-600 to-cyan-700",
      imageEmoji: "🎯 📝 ⚡",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Answer these rapid quiz questions about Sreemangal:",
          "1. What is Sreemangal known as? (The tea capital of Bangladesh)",
          "2. In which district is Sreemangal situated? (Moulvibazar district)",
          "3. What do women tea pluckers carry on their backs? (Large bamboo baskets)",
          "4. Name the national park located near the tea gardens. (Lawachara National Park)"
        ],
        banglaExplanation: "দ্রুত প্রশ্নের উত্তর দাও এবং শ্রীমঙ্গলের গুরুত্বপূর্ণ তথ্যগুলো পুনরায় ঝালিয়ে নাও!"
      },
      teacherNotes: "শিক্ষার্থীদের দ্রুত হাত তুলতে বলুন এবং উত্তর দিতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি প্রশ্ন ক্লাসে জিজ্ঞেস করুন।",
        "ধাপ ২: শিক্ষার্থীদের স্বতঃস্ফূর্ত উত্তরের প্রশংসা করুন।",
        "ধাপ ৩: বোর্ডে জেলা ও বিভাগের নাম লিখে দিন।"
      ]
    },
    {
      id: 8,
      title: "Summary & 20-Mark Companion Worksheet",
      subtitle: "পাঠের সারসংক্ষেপ ও পূর্ণাঙ্গ ২০ নম্বরের মূল্যায়ন (Summary & Assessment)",
      phase: "৭. সারসংক্ষেপ ও মূল্যায়ন (Wrap-up)",
      duration: "৩ মিনিট",
      themeColor: "from-slate-800 to-emerald-950",
      imageEmoji: "🏆 🌟 📝",
      sceneType: "summary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed the tour of Sreemangal, the Tea Capital.",
          "Key Takeaways:",
          "• Sreemangal is in Moulvibazar, famous for miles of rolling tea gardens.",
          "• Hardworking tea pluckers harvest fresh tea with bamboo baskets.",
          "• Lawachara National Park protects endangered wildlife like Hoolock gibbons.",
          "Now open and solve your 20-mark companion worksheet below!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা শ্রীমঙ্গলের পাঠ সফলভাবে শেষ করেছ। চায়ের রাজধানী ও লাউয়াছড়ার সবুজ প্রকৃতির প্রতি ভালোবাসা বজায় রাখো এবং ২০ নম্বরের ওয়ার্কশিটটি সম্পন্ন করো!"
      },
      teacherNotes: "শিক্ষার্থীদের ২০ নম্বরের পূর্ণাঙ্গ সঙ্গী ওয়ার্কশিট সমাধান করতে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: শ্রীমঙ্গলের ৩টি প্রধান আকর্ষণ পুনরাবৃত্তি করুন।",
        "ধাপ ২: ওয়ার্কশিট খুলুন।",
        "ধাপ ৩: শিক্ষার্থীদের স্বাবলম্বীভাবে পরীক্ষা শেষ করতে বলুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 4 English Evaluation — Sreemangal: The Tea Capital",
    classGrade: "Class 4 (৪র্থ শ্রেণি)",
    subject: "English for Today (Unit 10, Lesson 1)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "matching",
        title: "Section A: Column Matching (5 Marks)",
        instruction: "Column A-এর সাথে Column B-এর সঠিক অংশের অর্থপূর্ণ মিল করো:",
        content: [
          { a: "1. Sreemangal is known as", b: "a. tied to their backs." },
          { a: "2. Located in Moulvibazar", b: "b. under Sylhet division." },
          { a: "3. Large bamboo baskets", c: "c. home to rare monkeys and deer." },
          { a: "4. Lawachara National Park", d: "d. the tea capital of Bangladesh." },
          { a: "5. Many tourists visit", e: "e. to enjoy cool breeze and green nature." }
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Clues (5 Marks)",
        instruction: "ক্লু বক্স থেকে উপযুক্ত শব্দ নিয়ে শূন্যস্থান পূরণ করো: [ Lawachara, capital, bamboo, pluck, Moulvibazar ]",
        content: [
          "1. Sreemangal is known as the tea ____________ of Bangladesh.",
          "2. It is situated in the ____________ district.",
          "3. Women tea pluckers ____________ fresh tender tea leaves.",
          "4. Tea pluckers tie large ____________ baskets to their backs.",
          "5. Near the gardens lies the famous ____________ National Park."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে True এবং মিথ্যা হলে False লেখো:",
        content: [
          "1. Sreemangal is located in Chittagong division. ( __________ )",
          "2. Tea gardens are situated on rolling hill slopes. ( __________ )",
          "3. Women carry metal buckets to collect tea leaves. ( __________ )",
          "4. Lawachara National Park is home to rare monkeys. ( __________ )",
          "5. Tourists visit Sreemangal for its refreshing nature. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. Where is Sreemangal located?\n   Answer: ________________________________________________________________",
          "2. How do women tea pluckers harvest tea leaves?\n   Answer: ________________________________________________________________",
          "3. What animals and birds live in Lawachara National Park?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};


// =========================================================================
// CLASS 4: UNIT 11 - RESHMA: THE GARMENTS WORKER (pp. 58–61)
// =========================================================================
export const RESHMA_WORKER_SLIDE_DECK: SlideDeck = {
  id: "reshma-worker",
  grade: "Class 4 (৪র্থ শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 11: Working People (Reshma the Garments Worker)",
  lesson: "Lesson 1: Reshma's Story",
  topic: "Reshma: The Garments Worker, Family Support & Dignity of Labor (pp. 58–61)",
  category: "english",
  thumbnailEmoji: "👩‍🏭 🧵 👕",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Reshma: The Garments Worker",
      subtitle: "কঠোর পরিশ্রমী রেশমা ও তার অনুপ্রেরণামূলক জীবনের গল্প (Orientation & Pre-reading)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-indigo-600 to-rose-600",
      imageEmoji: "👩‍🏭 🏢 🧵",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello learners! Welcome to Class 4 English.",
          "Today we will read the inspiring story of Reshma, a dedicated garment worker in Dhaka.",
          "We will learn how her family overcame river erosion in Kurigram and started a new life.",
          "Let's explore how hard work and honesty help her support her family with dignity!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা ঢাকার মিরপুরের একজন কর্মনিষ্ঠ পোশাক শ্রমিক রেশমার অনুপ্রেরণামূলক গল্প পড়ব। কুড়িগ্রামের নদীভাঙনে সবকিছু হারিয়ে কীভাবে তাঁর পরিবার নতুন করে জীবন শুরু করল এবং রেশমা কীভাবে নিজের পরিশ্রমে পরিবারকে সাহায্য করছে ও ছোট ভাইকে স্কুলে পড়াচ্ছে, তা আজ আমরা জানব!"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তারা কি পোশাক কারখানায় তৈরি পোশাক পরে? বাংলাদেশের তৈরি পোশাক বিশ্বজুড়ে কীভাবে খ্যাতি পেয়েছে?",
      quickTeachingSteps: [
        "ধাপ ১: বাংলাদেশের তৈরি পোশাক শিল্পের গুরুত্ব আলোচনা করুন।",
        "ধাপ ২: শ্রমের মর্যাদা (Dignity of Labor) সম্পর্কে ধারণা দিন।",
        "ধাপ ৩: মূল পাঠের সাথে শিক্ষার্থীদের যুক্ত করুন।"
      ]
    },
    {
      id: 2,
      title: "Reading & Listening: From Kurigram to Mirpur",
      subtitle: "পাঠ্যাংশ পাঠ: নদীভাঙন ও ঢাকায় আগমন (NCTB Text Part 1)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-blue-600 to-indigo-700",
      imageEmoji: "📖 🌊 🏚️",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Reshma is eighteen years old. She is a dedicated garment worker in Mirpur, Dhaka.",
          "Eight years ago, river erosion in Kurigram took away her family's home and farmland.",
          "So her family came to Dhaka in search of work.",
          "Reshma's uncle helped her find a job in a garment factory."
        ],
        banglaExplanation: "রেশমার বয়স আঠারো বছর। সে ঢাকার মিরপুরের একজন একনিষ্ঠ পোশাক শ্রমিক। আট বছর আগে কুড়িগ্রামের নদীভাঙন তাদের পরিবারের ঘরবাড়ি ও ফসলি জমি কেড়ে নিয়েছিল। তাই তার পরিবার কাজের সন্ধানে ঢাকায় চলে আসে। রেশমার চাচা তাকে একটি পোশাক কারখানায় কাজ খুঁজে পেতে সাহায্য করেছিলেন।"
      },
      teacherNotes: "শিক্ষার্থীদের নদীভাঙন (River erosion) প্রাকৃতিক দুর্যোগের বাস্তবতা সহজ ভাষায় ব্যাখ্যা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক সঠিক উচ্চারণে অনুচ্ছেদটি পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে প্রতিটি বাক্য পড়বে।",
        "ধাপ ৩: কুড়িগ্রাম ও মিরপুরের ভৌগোলিক অবস্থান বোর্ডে দেখান।"
      ]
    },
    {
      id: 3,
      title: "Reading & Listening: Hard Work & Dignity",
      subtitle: "পাঠ্যাংশ পাঠ: কর্মঘণ্টা, ভাইয়ের পড়াশোনা ও আত্মমর্যাদা (NCTB Text Part 2)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-rose-600 to-purple-700",
      imageEmoji: "⏰ 👦 💖",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "She works hard from 8:00 am to 5:00 pm every day.",
          "Sometimes she does overtime work to earn extra money.",
          "She sends money to her parents in the village and supports her younger brother Babul's education in school.",
          "Reshma is proud to earn her own living with dignity."
        ],
        banglaExplanation: "সে প্রতিদিন সকাল ৮:০০টা থেকে বিকেল ৫:০০টা পর্যন্ত কঠোর পরিশ্রম করে। মাঝে মাঝে সে অতিরিক্ত অর্থ উপার্জনের জন্য ওভারটাইম বা অতিরিক্ত সময় কাজ করে। সে গ্রামের বাড়িতে মা-বাবার কাছে টাকা পাঠায় এবং তার ছোট ভাই বাবুলের স্কুলের পড়াশোনার খরচ চালায়। রেশমা আত্মমর্যাদার সাথে নিজের জীবিকা নির্বাহ করতে পেরে গর্বিত।"
      },
      teacherNotes: "'Overtime' এবং 'Dignity' শব্দের তাৎপর্য শিক্ষার্থীদের ভালোভাবে অনুধাবন করান।",
      quickTeachingSteps: [
        "ধাপ ১: রেশমার দৈনিক কাজের সময়সূচি আলোচনা করুন।",
        "ধাপ ২: ছোট ভাইয়ের প্রতি বোনের ভালোবাসার দিকটি তুলে ধরুন।",
        "ধাপ ৩: সৎভাবে উপার্জন করার আনন্দ ও আত্মতৃপ্তি নিয়ে কথা বলুন।"
      ]
    },
    {
      id: 4,
      title: "Vocabulary Workshop: Labor & Values",
      subtitle: "শব্দসম্ভার: পেশা, শিল্প ও নৈতিক মূল্যবোধ বিষয়ক শব্দ (Key Vocabulary)",
      phase: "৩. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-amber-600 to-rose-600",
      imageEmoji: "💡 📚 🔤",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Learn key vocabulary words from Reshma's story:"
        ],
        banglaExplanation: "রেশমার গল্প থেকে প্রয়োজনীয় ইংরেজি শব্দগুলোর সঠিক উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Garment",
            syllables: ["Gar", "ment"],
            phonetic: "/ˈɡɑːr.mənt/",
            meaning: "পোশাক / তৈরি পোশাক",
            partOfSpeech: "Noun",
            example: "Reshma works in a garment factory in Mirpur.",
            icon: "👗"
          },
          {
            word: "Erosion",
            syllables: ["E", "ro", "sion"],
            phonetic: "/ɪˈroʊ.ʒən/",
            meaning: "ভাঙন / ক্ষয়",
            partOfSpeech: "Noun",
            example: "River erosion took away their village home.",
            icon: "🌊"
          },
          {
            word: "Overtime",
            syllables: ["O", "ver", "time"],
            phonetic: "/ˈoʊ.vɚ.taɪm/",
            meaning: "অতিরিক্ত কাজের সময় / ওভারটাইম",
            partOfSpeech: "Noun / Adverb",
            example: "She works overtime to earn extra money.",
            icon: "⏱️"
          },
          {
            word: "Supports",
            syllables: ["Sup", "ports"],
            phonetic: "/səˈpɔːrts/",
            meaning: "সহায়তা করে / খরচ বহন করে",
            partOfSpeech: "Verb",
            example: "Reshma supports her younger brother's schooling.",
            icon: "🤝"
          },
          {
            word: "Dignity",
            syllables: ["Dig", "ni", "ty"],
            phonetic: "/ˈdɪɡ.nə.ti/",
            meaning: "মর্যাদা / আত্মসম্মান",
            partOfSpeech: "Noun",
            example: "She is proud to earn her living with dignity.",
            icon: "👑"
          }
        ]
      },
      teacherNotes: "'Dignity' এবং 'Erosion' শব্দের সঠিক সিলেবল বিভাজন ও উচ্চারণ বারবার অনুশীলন করান।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক প্রতিটি শব্দ স্পষ্ট উচ্চারণে পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে প্রতিটি শব্দের উচ্চারণ করবে।",
        "ধাপ ৩: প্রতিটি শব্দ দিয়ে সংক্ষিপ্ত বাক্য গঠন করান।"
      ]
    },
    {
      id: 5,
      title: "Interactive Stage: Factory & Sewing Station",
      subtitle: "ইন্টারেক্টিভ সিমুলেশন: সেলাই মেশিন ও কর্মঘণ্টা (Interactive Stage)",
      phase: "৪. প্রায়োগিক সিমুলেশন (Interactive Stage)",
      duration: "৫ মিনিট",
      themeColor: "from-indigo-600 to-rose-700",
      imageEmoji: "🧵 ⚙️ 👕",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Step into Reshma's garment factory workspace on our interactive stage!",
          "Click the stitch button to operate the modern sewing machine.",
          "Inspect her daily shift schedule: 8:00 am to 5:00 pm, plus overtime.",
          "Trace Reshma's inspiring journey from Kurigram to becoming an independent, dignified earner in Dhaka."
        ],
        banglaExplanation: "আমাদের ইন্টারেক্টিভ স্টেজে রেশমার পোশাক কারখানায় প্রবেশ করো! সেলাই মেশিন চালিয়ে পোশাক তৈরি করো এবং রেশমার কাজের সময়সূচি ও পরিবারের ত্যাগ সম্পর্কে জানো!"
      },
      teacherNotes: "শিক্ষার্থীদের স্টেজে সেলাই বোতামে ক্লিক করতে এবং কাজের সময়সূচি পর্যবেক্ষণ করতে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: সেলাই মেশিন সিমুলেশন চালু করুন।",
        "ধাপ ২: নিয়মিত কর্মঘণ্টা ও ওভারটাইমের পার্থক্য দেখান।",
        "ধাপ ৩: ছোট ভাই বাবুলের শিক্ষার গল্প তুলে ধরুন।"
      ]
    },
    {
      id: 6,
      title: "Values & Morals: Dignity of Labor",
      subtitle: "শ্রমের মর্যাদা ও পরিবারের দায়িত্বশীলতা (Values & Life Lessons)",
      phase: "৫. নৈতিক শিক্ষা ও মূল্যবোধ (Social Values)",
      duration: "৪ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "💖 🌟 🤝",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "What valuable life lessons do we learn from Reshma?",
          "1. NO WORK IS SMALL: Any honest and lawful job brings great dignity.",
          "2. COURAGE IN ADVERSITY: When river erosion struck, her family did not give up.",
          "3. SIBLING & FAMILY LOVE: Supporting parents and helping her brother Babul study brings immense joy.",
          "4. SELF-RELIANCE: Earning your own living makes you strong, confident, and proud."
        ],
        banglaExplanation: "রেশমার গল্প থেকে আমাদের জীবনশিক্ষা: ১. কোনো সৎ কাজই ছোট নয়—শ্রমের মর্যাদা সবার উপরে। ২. বিপদে মনোবল হারানো যাবে না। ৩. পরিবার ও ভাইবোনের প্রতি দায়িত্বশীল থাকা। ৪. নিজের পায়ে দাঁড়ানোই প্রকৃত গর্ব।"
      },
      teacherNotes: "ক্লাসে শিক্ষার্থীদের জিজ্ঞেস করুন: তারা ভবিষ্যতে কীভাবে মা-বাবা ও পরিবারকে সাহায্য করতে চায়?",
      quickTeachingSteps: [
        "ধাপ ১: শ্রমের মর্যাদা নিয়ে মুক্ত আলোচনা করুন।",
        "ধাপ ২: ভাই বাবুলের পড়াশোনার ক্ষেত্রে বোনের অবদানের প্রশংসা করুন।",
        "ধাপ ৩: শিক্ষার্থীরা আত্মমর্যাদার শপথ নেবে।"
      ]
    },
    {
      id: 7,
      title: "Interactive Review & Quick Quiz",
      subtitle: "দ্রুত যাচাই ও মূল্যায়ন: রেশমার জীবনের প্রশ্নোত্তর (Quick Check)",
      phase: "৬. গঠনমূলক মূল্যায়ন (Rapid Quiz)",
      duration: "৪ মিনিট",
      themeColor: "from-indigo-600 to-cyan-700",
      imageEmoji: "🎯 ⚡ 📝",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Test your comprehension with rapid quiz questions:",
          "1. How old is Reshma? (18 years old)",
          "2. Where did Reshma's family move from? (Kurigram, due to river erosion)",
          "3. What are her daily working hours? (8:00 am to 5:00 pm)",
          "4. Whom does Reshma support with her earnings? (Her parents and younger brother Babul)"
        ],
        banglaExplanation: "দ্রুত প্রশ্নের উত্তর দিয়ে পাঠের গুরুত্বপূর্ণ তথ্যগুলো পুনরাবৃত্তি করো!"
      },
      teacherNotes: "শিক্ষার্থীদের দ্রুত হাত তুলতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি প্রশ্ন ক্লাসে জিজ্ঞেস করুন।",
        "ধাপ ২: শিক্ষার্থীদের স্বতঃস্ফূর্ত উত্তরের প্রশংসা করুন।",
        "ধাপ ৩: সঠিক উত্তর বোর্ডের মাধ্যমে নিশ্চিত করুন।"
      ]
    },
    {
      id: 8,
      title: "Summary & 20-Mark Companion Worksheet",
      subtitle: "পাঠের সারসংক্ষেপ ও পূর্ণাঙ্গ ২০ নম্বরের মূল্যায়ন (Summary & Assessment)",
      phase: "৭. সারসংক্ষেপ ও মূল্যায়ন (Wrap-up)",
      duration: "৩ মিনিট",
      themeColor: "from-slate-800 to-indigo-950",
      imageEmoji: "🏆 🌟 📝",
      sceneType: "summary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed the story of Reshma the Garments Worker.",
          "Key Takeaways:",
          "• Honesty and hard work overcome life's biggest challenges.",
          "• Reshma works hard in Mirpur to educate her brother and help parents.",
          "• Earning one's living with dignity is a matter of great pride.",
          "Now open and solve your 20-mark companion worksheet below!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা পোশাক শ্রমিক রেশমার পাঠ সফলভাবে শেষ করেছ। সততা, নিষ্ঠা এবং শ্রমের মর্যাদা জীবনে ধারণ করো এবং ২০ নম্বরের সঙ্গী ওয়ার্কশিটটি সম্পন্ন করো!"
      },
      teacherNotes: "শিক্ষার্থীদের ২০ নম্বরের পূর্ণাঙ্গ সঙ্গী ওয়ার্কশিট সমাধান করতে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: রেশমার গল্পের ৩টি মূল শিক্ষা পুনরাবৃত্তি করুন।",
        "ধাপ ২: ওয়ার্কশিট খুলুন।",
        "ধাপ ৩: শিক্ষার্থীদের স্বাবলম্বীভাবে পরীক্ষা শেষ করতে বলুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 4 English Evaluation — Reshma: The Garments Worker",
    classGrade: "Class 4 (৪র্থ শ্রেণি)",
    subject: "English for Today (Unit 11, Lesson 1)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "matching",
        title: "Section A: Column Matching (5 Marks)",
        instruction: "Column A-এর সাথে Column B-এর সঠিক অংশের অর্থপূর্ণ মিল করো:",
        content: [
          { a: "1. Reshma is", b: "a. took away her family's home." },
          { a: "2. River erosion in Kurigram", b: "b. an 18-year-old dedicated garment worker." },
          { a: "3. Reshma works in", c: "c. younger brother Babul's education." },
          { a: "4. She supports her", d: "d. a garment factory in Mirpur, Dhaka." },
          { a: "5. Reshma is proud to", e: "e. earn her living with dignity." }
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Clues (5 Marks)",
        instruction: "ক্লু বক্স থেকে উপযুক্ত শব্দ নিয়ে শূন্যস্থান পূরণ করো: [ eighteen, Kurigram, overtime, Babul, dignity ]",
        content: [
          "1. Reshma is ____________ years old.",
          "2. Eight years ago, river erosion in ____________ took away their home.",
          "3. Sometimes Reshma works ____________ to earn extra money.",
          "4. She supports her younger brother ____________'s education.",
          "5. Reshma is proud to earn her living with ____________."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে True এবং মিথ্যা হলে False লেখো:",
        content: [
          "1. Reshma works as a nurse in a hospital. ( __________ )",
          "2. Reshma's uncle helped her find a job in Dhaka. ( __________ )",
          "3. Her working hours are from 8:00 am to 5:00 pm. ( __________ )",
          "4. Reshma never sends money to her parents in the village. ( __________ )",
          "5. Babul is Reshma's younger brother who goes to school. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. Why did Reshma's family leave Kurigram and come to Dhaka?\n   Answer: ________________________________________________________________",
          "2. What are Reshma's daily working hours in the factory?\n   Answer: ________________________________________________________________",
          "3. How does Reshma support her family and brother?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};


// =========================================================================
// CLASS 4: UNIT 12 - THE LION AND THE MOUSE (pp. 64–67)
// =========================================================================
export const LION_AND_MOUSE_SLIDE_DECK: SlideDeck = {
  id: "lion-and-mouse",
  grade: "Class 4 (৪র্থ শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 12: Fables and Stories",
  lesson: "Lesson 1: Story: The Lion and the Mouse",
  topic: "The Lion and the Mouse: Kindness, Gratitude & Lifelong Friendship (pp. 64–67)",
  category: "english",
  thumbnailEmoji: "🦁 🐭 🌿",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "The Lion and the Mouse",
      subtitle: "সিংহ ও ইঁদুরের বিখ্যাত শিক্ষণীয় উপকথা (Orientation & Storytelling)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-amber-600 to-orange-700",
      imageEmoji: "🦁 🐭 🌳",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello story lovers! Welcome to our English class.",
          "Today we will enter a deep green jungle and meet a mighty lion and a tiny mouse.",
          "We will discover how a small act of kindness can save a mighty life.",
          "Let's see how the king of the jungle and a humble little mouse became best friends!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় গল্পপ্রিয় শিক্ষার্থীরা! আজ আমরা গভীর অরণ্যে প্রবেশ করব এবং এক পরাক্রমশালী সিংহ ও ছোট্ট ইঁদুরের চমৎকার গল্প শুনব। আমরা দেখব কীভাবে একটি ছোট দয়া একজন মহারাজার জীবন বাঁচাতে পারে এবং কীভাবে বিশাল সিংহ ও ক্ষুদ্র ইঁদুর আজীবনের অকৃত্রিম বন্ধুতে পরিণত হলো!"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তারা কি কখনো সিংহ বা ইঁদুর দেখেছে? একজন ক্ষুদ্র প্রাণী কি কোনো শক্তিশালীকে সাহায্য করতে পারে?",
      quickTeachingSteps: [
        "ধাপ ১: উপকথার (Fable) সংজ্ঞা ও নীতিকথার গুরুত্ব বোঝান।",
        "ধাপ ২: সিংহ ও ইঁদুরের বৈপরীত্য আলোচনা করুন।",
        "ধাপ ৩: মূল পাঠের সাথে শিক্ষার্থীদের যুক্ত করুন।"
      ]
    },
    {
      id: 2,
      title: "Reading & Listening: Meeting in the Jungle",
      subtitle: "পাঠ্যাংশ পাঠ: ঘুমন্ত সিংহ, খেলার ছলে ইঁদুর ও ক্ষমা (NCTB Text Part 1)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-orange-600 to-amber-700",
      imageEmoji: "📖 😴 🦁",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Once upon a time, a mighty lion was sleeping peacefully in a deep jungle.",
          "A tiny mouse began playing nearby and ran over the lion's nose.",
          "The lion woke up angrily and caught the little mouse in his huge paw.",
          "The mouse pleaded, 'O King of the jungle! Please forgive me this time. I will never forget your kindness. Maybe one day I can help you!'",
          "The lion laughed at the idea of a tiny mouse helping him, but let him go."
        ],
        banglaExplanation: "একদা এক পরাক্রমশালী সিংহ গভীর বনে শান্তিতে ঘুমাচ্ছিল। একটি ছোট্ট ইঁদুর কাছেই খেলছিল এবং হঠাৎ সিংহের নাকের ওপর দিয়ে দৌড়ে গেল। সিংহটি রেগে জেগে উঠল এবং তার বিশাল থাবায় ছোট্ট ইঁদুরটিকে চেপে ধরল। ইঁদুরটি মিনতি করল, 'হে বনের রাজা! দয়া করে এবার আমাকে ক্ষমা করুন। আমি আপনার দয়া কখনো ভুলব না। হয়তো একদিন আমি আপনাকে সাহায্য করতে পারব!' একটি ছোট্ট ইঁদুর তাকে সাহায্য করবে—এই কথা ভেবে সিংহটি হাসল, কিন্তু তাকে ছেড়ে দিল।"
      },
      teacherNotes: "শিক্ষার্থীদের 'pleaded' ও 'forgive' শব্দের অর্থ বাচনভঙ্গির মাধ্যমে বুঝিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক সিংহ ও ইঁদুরের স্বর পরিবর্তন করে পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে প্রতিটি লাইন উচ্চারণ করবে।",
        "ধাপ ৩: সিংহের বিশাল থাবা ও ইঁদুরের ক্ষুদ্র আকারের তুলনা করুন।"
      ]
    },
    {
      id: 3,
      title: "Reading & Listening: The Hunter's Net & Rescue",
      subtitle: "পাঠ্যাংশ পাঠ: শিকারির জাল, গর্জন ও ইঁদুরের উদ্ধার (NCTB Text Part 2)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-red-600 to-amber-800",
      imageEmoji: "🪤 🐭 ✂️",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "A few days later, the lion was caught in a hunter's strong rope net.",
          "He roared loudly in helplessness.",
          "Hearing the roar, the little mouse ran quickly to the spot.",
          "Using his sharp little teeth, the mouse chewed through the heavy ropes and set the lion free.",
          "From that day on, the lion and the mouse became lifelong friends."
        ],
        banglaExplanation: "কয়েক দিন পর, সিংহটি এক শিকারির শক্ত দড়ির জালে আটকা পড়ল। সে অসহায় হয়ে জোরে জোরে গর্জন করতে লাগল। গর্জন শুনে ছোট্ট ইঁদুরটি দ্রুত ঘটনাস্থলে ছুটে এলো। তার ধারালো ছোট দাঁত দিয়ে ইঁদুরটি ভারী দড়িগুলো কেটে ফেলল এবং সিংহটিকে মুক্ত করল। সেই দিন থেকে সিংহ এবং ইঁদুরটি চিরদিনের বন্ধু হয়ে গেল।"
      },
      teacherNotes: "ইঁদুরের কৃতজ্ঞতাবোধ ও সাহসের প্রশংসা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: গর্জন ও উদ্ধারের দৃশ্য আবেগ দিয়ে পাঠ করান।",
        "ধাপ ২: 'chewed through' শব্দটির অর্থ ব্যাখ্যা করুন।",
        "ধাপ ৩: চিরস্থায়ী বন্ধুত্বের বার্তা শিক্ষার্থীদের হৃদয়ে পৌঁছে দিন।"
      ]
    },
    {
      id: 4,
      title: "Vocabulary Workshop: Fable Words",
      subtitle: "শব্দসম্ভার: উপকথা ও বন্যজীবন বিষয়ক গুরুত্বপূর্ণ শব্দ (Key Vocabulary)",
      phase: "৩. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-amber-600 to-yellow-600",
      imageEmoji: "💡 📚 🔤",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Master key vocabulary words from this memorable fable:"
        ],
        banglaExplanation: "উপকথাটির গুরুত্বপূর্ণ ইংরেজি শব্দগুলোর সঠিক উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Mighty",
            syllables: ["Migh", "ty"],
            phonetic: "/ˈmaɪ.ti/",
            meaning: "পরাক্রমশালী / অত্যন্ত শক্তিশালী",
            partOfSpeech: "Adjective",
            example: "The mighty lion rules over the deep jungle.",
            icon: "🦁"
          },
          {
            word: "Pleaded",
            syllables: ["Plead", "ed"],
            phonetic: "/ˈpliː.dɪd/",
            meaning: "মিনতি করল / আকুল প্রার্থনা করল",
            partOfSpeech: "Verb (Past)",
            example: "The little mouse pleaded for his life.",
            icon: "🙏"
          },
          {
            word: "Forgive",
            syllables: ["For", "give"],
            phonetic: "/fəˈɡɪv/",
            meaning: "ক্ষমা করা / মাফ করা",
            partOfSpeech: "Verb",
            example: "Please forgive me this time, King!",
            icon: "❤️"
          },
          {
            word: "Chewed",
            syllables: ["Chewed"],
            phonetic: "/tʃuːd/",
            meaning: "দাঁত দিয়ে চিবিয়ে বা কুটে কেটে ফেলল",
            partOfSpeech: "Verb (Past)",
            example: "The mouse chewed through the heavy ropes.",
            icon: "🐭"
          },
          {
            word: "Lifelong",
            syllables: ["Life", "long"],
            phonetic: "/ˈlaɪf.lɒŋ/",
            meaning: "আজীবন / চিরদিনের",
            partOfSpeech: "Adjective",
            example: "They became lifelong and loyal friends.",
            icon: "🤝"
          }
        ]
      },
      teacherNotes: "'Mighty' এবং 'Pleaded' শব্দের উচ্চারণ শিক্ষার্থীদের অনুশীলন করান।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি শব্দের সঠিক উচ্চারণ ও সিলেবল হাততালি দিয়ে অনুশীলন করান।",
        "ধাপ ২: বাংলা অর্থ স্পষ্ট করুন।",
        "ধাপ ৩: শিক্ষার্থীরা বাক্য রচনা করবে।"
      ]
    },
    {
      id: 5,
      title: "Interactive Stage: Jungle Play & Net Rescue",
      subtitle: "ইন্টারেক্টিভ সিমুলেশন: সিংহের নাক স্পর্শ ও দড়ি কেটে উদ্ধার (Interactive Stage)",
      phase: "৪. প্রায়োগিক নাট্যাভিনয় (Interactive Drama)",
      duration: "৫ মিনিট",
      themeColor: "from-amber-600 to-emerald-700",
      imageEmoji: "🎮 🦁 🐭",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Enter the interactive fable stage!",
          "In Scene 1: Click the mouse to run over the lion's nose and listen to the dialogue.",
          "In Scene 2: Click to chew through the hunter's 4 heavy ropes and set the trapped lion free!",
          "In Scene 3: Celebrate their lifelong bond of friendship and learn the timeless moral."
        ],
        banglaExplanation: "আমাদের ইন্টারেক্টিভ স্টেজে গল্পটির জীবন্ত দৃশ্য উপভোগ করো! ইঁদুরকে দৌড়াও, শিকারির দড়ির জাল কাটো এবং সিংহকে মুক্ত করে বন্ধুত্বের জয় উদ্‌যাপন করো!"
      },
      teacherNotes: "শিক্ষার্থীদের স্টেজে দড়ি কাটার বোতামে ক্লিক করতে দিন এবং উদ্ধারের আনন্দ ভাগ করে নিন।",
      quickTeachingSteps: [
        "ধাপ ১: সিংহের ঘুমের দৃশ্য সক্রিয় করুন।",
        "ধাপ ২: শিকারির জাল কাটার সিমুলেশন পরিচালনা করুন।",
        "ধাপ ৩: সিংহ ও ইঁদুরের বন্ধুত্বের আনন্দ ক্লাসে ভাগ করে নিন।"
      ]
    },
    {
      id: 6,
      title: "Moral Lessons: Kindness is Never Wasted",
      subtitle: "উপকথার ৩টি প্রধান জীবনশিক্ষা (Moral Wisdom)",
      phase: "৫. নীতিকথা ও নৈতিক মূল্যবোধ (Moral Wisdom)",
      duration: "৪ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "🌟 💖 👑",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "What eternal truths does Aesop's fable teach us?",
          "1. NO ACT OF KINDNESS IS EVER WASTED: When you show mercy, goodness returns to you.",
          "2. DO NOT UNDERESTIMATE ANYONE: Never laugh at or look down on someone small or quiet.",
          "3. EVEN THE SMALLEST FRIEND CAN BE MIGHTY: In danger, a humble friend may have the exact skill needed to save you!"
        ],
        banglaExplanation: "উপকথাটির তিনটি চিরন্তন শিক্ষা: ১. কোনো দয়াই কখনো বৃথা যায় না—মহানুভবতা সবসময় শুভ ফল বয়ে আনে। ২. কাউকে ছোট বা দুর্বল ভেবে অবজ্ঞা করবে না। ৩. ক্ষুদ্রতম বন্ধুও বিপদের দিনে পরম ত্রাণকর্তা হতে পারে!"
      },
      teacherNotes: "শিক্ষার্থীদের দৈনন্দিন জীবনে সহপাঠীদের সাহায্য করার উদাহরণ দিতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: নীতিকথাগুলো ক্লাসের বোর্ডে বড় করে লিখুন।",
        "ধাপ ২: শিক্ষার্থীরা তাদের সহমর্মিতার অভিজ্ঞতা শেয়ার করবে।",
        "ধাপ ৩: সমস্বরে নীতিকথা পাঠ করুন।"
      ]
    },
    {
      id: 7,
      title: "Interactive Story Sequence & Quick Quiz",
      subtitle: "দ্রুত যাচাই ও মূল্যায়ন: গল্পের ক্রমবিন্যাস ও প্রশ্নোত্তর (Quick Check)",
      phase: "৬. গঠনমূলক মূল্যায়ন (Rapid Quiz)",
      duration: "৪ মিনিট",
      themeColor: "from-amber-600 to-indigo-700",
      imageEmoji: "🎯 ⚡ 📝",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Answer these rapid quiz questions on The Lion and the Mouse:",
          "1. What was the mighty lion doing when the mouse arrived? (Sleeping peacefully)",
          "2. What did the mouse run over? (The lion's nose)",
          "3. How was the lion trapped later? (In a hunter's strong rope net)",
          "4. How did the little mouse free the king of the jungle? (By chewing the ropes with sharp teeth)"
        ],
        banglaExplanation: "দ্রুত প্রশ্নের উত্তর দাও এবং গল্পের ঘটনাবলি ধারাবাহিকভাবে স্মরণ করো!"
      },
      teacherNotes: "শিক্ষার্থীদের দ্রুত হাত তুলতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি প্রশ্ন ক্লাসে জিজ্ঞেস করুন।",
        "ধাপ ২: শিক্ষার্থীদের স্বতঃস্ফূর্ত উত্তরের প্রশংসা করুন।",
        "ধাপ ৩: সঠিক উত্তর বোর্ডের মাধ্যমে নিশ্চিত করুন।"
      ]
    },
    {
      id: 8,
      title: "Summary & 20-Mark Companion Worksheet",
      subtitle: "পাঠের সারসংক্ষেপ ও পূর্ণাঙ্গ ২০ নম্বরের মূল্যায়ন (Summary & Assessment)",
      phase: "৭. সারসংক্ষেপ ও মূল্যায়ন (Wrap-up)",
      duration: "৩ মিনিট",
      themeColor: "from-slate-800 to-amber-950",
      imageEmoji: "🏆 🌟 📝",
      sceneType: "summary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed the beloved fable of The Lion and the Mouse.",
          "Key Takeaways:",
          "• Kindness and mercy always bear sweet fruit.",
          "• True friends help each other in times of great trouble.",
          "• Size does not matter; courage and devotion matter most.",
          "Now open and solve your 20-mark companion worksheet below!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা সিংহ ও ইঁদুরের বিখ্যাত উপকথা সফলভাবে সম্পন্ন করেছ। সবার প্রতি সদয় হও এবং ২০ নম্বরের সঙ্গী ওয়ার্কশিটটি সম্পন্ন করো!"
      },
      teacherNotes: "শিক্ষার্থীদের ২০ নম্বরের পূর্ণাঙ্গ সঙ্গী ওয়ার্কশিট সমাধান করতে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: উপকথার মূল নীতিকথা সংক্ষেপে পুনরাবৃত্তি করুন।",
        "ধাপ ২: ওয়ার্কশিট খুলুন।",
        "ধাপ ৩: শিক্ষার্থীদের স্বাবলম্বীভাবে পরীক্ষা শেষ করতে বলুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 4 English Evaluation — The Lion and the Mouse",
    classGrade: "Class 4 (৪র্থ শ্রেণি)",
    subject: "English for Today (Unit 12, Lesson 1)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "matching",
        title: "Section A: Column Matching (5 Marks)",
        instruction: "Column A-এর সাথে Column B-এর সঠিক অংশের অর্থপূর্ণ মিল করো:",
        content: [
          { a: "1. A mighty lion was", b: "a. ran over the lion's nose." },
          { a: "2. The tiny mouse", b: "b. sleeping peacefully in a deep jungle." },
          { a: "3. The lion was caught", c: "c. chewed through the heavy ropes." },
          { a: "4. The mouse's sharp teeth", d: "d. in a hunter's strong rope net." },
          { a: "5. They became", e: "e. lifelong and loyal friends." }
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Clues (5 Marks)",
        instruction: "ক্লু বক্স থেকে উপযুক্ত শব্দ নিয়ে শূন্যস্থান পূরণ করো: [ paw, roar, hunter, mouse, forgive ]",
        content: [
          "1. A tiny ____________ ran over the lion's nose.",
          "2. The lion caught the little mouse in his huge ____________.",
          "3. The mouse pleaded, 'Please ____________ me this time.'",
          "4. Later, the lion was caught in a ____________'s net.",
          "5. Hearing the loud ____________, the little mouse ran to help."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে True এবং মিথ্যা হলে False লেখো:",
        content: [
          "1. The lion was swimming in a river. ( __________ )",
          "2. The mouse bit the lion angrily. ( __________ )",
          "3. The lion showed kindness and let the mouse go. ( __________ )",
          "4. The mouse used sharp teeth to cut the heavy ropes. ( __________ )",
          "5. The lion and the mouse fought each other at the end. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. Why did the lion wake up angrily?\n   Answer: ________________________________________________________________",
          "2. How did the little mouse help the lion when he was trapped?\n   Answer: ________________________________________________________________",
          "3. What is the moral lesson of this fable?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};


// =========================================================================
// CLASS 4: UNIT 12 - THE CLEVER CROW (pp. 68–71)
// =========================================================================
export const CLEVER_CROW_SLIDE_DECK: SlideDeck = {
  id: "clever-crow",
  grade: "Class 4 (৪র্থ শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 12: Fables and Stories",
  lesson: "Lesson 2: Story: The Clever Crow",
  topic: "The Clever Crow: Water Displacement, Problem Solving & Determination (pp. 68–71)",
  category: "english",
  thumbnailEmoji: "🐦‍⬛ 🏺 🪨",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "The Clever Crow",
      subtitle: "বুদ্ধিমান কাকের বিজ্ঞানসম্মত কৌশল ও সমস্যা সমাধান (Orientation & Science Fable)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-amber-600 to-sky-700",
      imageEmoji: "🐦‍⬛ ☀️ 🏺",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello clever minds! Welcome to Class 4 English.",
          "Today we will read the world-famous fable of The Clever Crow.",
          "On a scorching hot summer day, a thirsty crow discovered a tall clay pitcher.",
          "Let's see how smart thinking and small pebbles helped the crow quench his thirst!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা বুদ্ধিমান কাকের বিশ্বখ্যাত শিক্ষণীয় গল্পটি পড়ব। প্রচণ্ড গরমের এক দুপুরে এক তৃষ্ণার্ত কাক কীভাবে তার বুদ্ধিমত্তা ও নুড়িপাথর ব্যবহার করে কলসির তলানির পানি ওপরে তুলে তৃষ্ণা মেটাল, তা আজ আমরা জানব!"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: কাককে কেন অন্যতম বুদ্ধিমান পাখি বলা হয়? কোনো সমস্যায় পড়লে তারা কীভাবে চিন্তা করে?",
      quickTeachingSteps: [
        "ধাপ ১: বিজ্ঞান ও বুদ্ধিমত্তার মেলবন্ধন হিসেবে গল্পটি উপস্থাপন করুন।",
        "ধাপ ২: কলসিতে নুড়িপাথর ফেললে পানি কেন ওপরে ওঠে তা সংক্ষেপে বলুন।",
        "ধাপ ৩: মূল পাঠের সাথে শিক্ষার্থীদের যুক্ত করুন।"
      ]
    },
    {
      id: 2,
      title: "Reading & Listening: The Thirsty Flight",
      subtitle: "পাঠ্যাংশ পাঠ: প্রখর গ্রীষ্মের দুপুর ও মাটির কলসি (NCTB Text Part 1)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-orange-600 to-amber-700",
      imageEmoji: "📖 ☀️ 🐦‍⬛",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "On a scorching summer afternoon, a thirsty crow was flying all over the village in search of water.",
          "At last, he saw a tall clay pitcher under a shady tree.",
          "The crow flew down happily and looked inside.",
          "There was a little water at the very bottom of the pitcher, but his beak could not reach it.",
          "The crow tried to overturn the pitcher, but it was too heavy."
        ],
        banglaExplanation: "এক প্রচণ্ড গরমের গ্রীষ্মের দুপুরে, একটি তৃষ্ণার্ত কাক পানির সন্ধানে পুরো গ্রামজুড়ে উড়ে বেড়াচ্ছিল। অবশেষে, সে একটি ছায়াঘেরা গাছের নিচে একটি লম্বা মাটির কলসি দেখতে পেল। কাকটি আনন্দের সাথে উড়ে নেমে ভেতরে তাকাল। কলসির একেবারে নিচে সামান্য পানি ছিল, কিন্তু তার ঠোঁট সেখানে পৌঁছাতে পারল না। কাকটি কলসিটিকে উল্টে ফেলার চেষ্টা করল, কিন্তু সেটি ছিল অত্যন্ত ভারী।"
      },
      teacherNotes: "শিক্ষার্থীদের 'scorching' এবং 'pitcher' শব্দের অর্থ স্পষ্টভাবে বুঝিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক সঠিক উচ্চারণে ও আবেগে অনুচ্ছেদটি পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে প্রতিটি লাইন পড়বে।",
        "ধাপ ৩: কাকটির সমস্যার কারণ (ছোট ঠোঁট ও ভারী কলসি) চিহ্নিত করুন।"
      ]
    },
    {
      id: 3,
      title: "Reading & Listening: Pebbles and the Rising Water",
      subtitle: "পাঠ্যাংশ পাঠ: নুড়িপাথর ফেলা ও পানির স্তর বৃদ্ধি (NCTB Text Part 2)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-sky-600 to-teal-700",
      imageEmoji: "🪨 💧 🐦‍⬛",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Then he noticed small pebbles scattered on the ground.",
          "The clever crow took pebbles one by one in his beak and dropped them into the pitcher.",
          "Slowly, the water level rose to the brim.",
          "The crow drank the refreshing cool water happily and flew away with joy."
        ],
        banglaExplanation: "তখন সে মাটিতে ছড়িয়ে থাকা ছোট ছোট নুড়িপাথর দেখতে পেল। চতুর কাকটি এক এক করে ঠোঁটে করে নুড়িপাথর তুলে এনে কলসির ভেতর ফেলতে লাগল। ধীরে ধীরে পানির স্তর কলসির কানা পর্যন্ত উঠে এলো। কাকটি আনন্দের সাথে সতেজ শীতল পানি পান করল এবং খুশিতে উড়াল দিল।"
      },
      teacherNotes: "'rose to the brim' (কানায় কানায় পূর্ণ হলো) শব্দগুচ্ছের অর্থ শেখান।",
      quickTeachingSteps: [
        "ধাপ ১: এক এক করে নুড়ি ফেলার ধৈর্যশীল প্রক্রিয়া আলোচনা করুন।",
        "ধাপ ২: পানি ওপরে ওঠার বৈজ্ঞানিক নিয়ম (অপসারণ) বুঝিয়ে দিন।",
        "ধাপ ৩: তৃষ্ণা মেটার পর কাকের আনন্দের অনুভূতি আলোচনা করুন।"
      ]
    },
    {
      id: 4,
      title: "Vocabulary Workshop: Science & Bird Words",
      subtitle: "শব্দসম্ভার: বৈজ্ঞানিক পর্যবেক্ষণ ও উপকথা বিষয়ক শব্দ (Key Vocabulary)",
      phase: "৩. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-amber-600 to-sky-600",
      imageEmoji: "💡 📚 🔤",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Master key vocabulary words from The Clever Crow:"
        ],
        banglaExplanation: "গল্পটির গুরুত্বপূর্ণ ইংরেজি শব্দগুলোর সঠিক উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Scorching",
            syllables: ["Scorch", "ing"],
            phonetic: "/ˈskɔːr.tʃɪŋ/",
            meaning: "প্রচণ্ড উত্তপ্ত / ঝলসানো রোদ",
            partOfSpeech: "Adjective",
            example: "The sun was scorching on that summer day.",
            icon: "☀️"
          },
          {
            word: "Pitcher",
            syllables: ["Pitch", "er"],
            phonetic: "/ˈpɪtʃ.ər/",
            meaning: "মাটির কলসি / জলপাত্র",
            partOfSpeech: "Noun",
            example: "A tall clay pitcher stood under the shady tree.",
            icon: "🏺"
          },
          {
            word: "Beak",
            syllables: ["Beak"],
            phonetic: "/biːk/",
            meaning: "পাখির শক্ত ঠোঁট / চঞ্চু",
            partOfSpeech: "Noun",
            example: "The crow carried small pebbles in his beak.",
            icon: "🐦‍⬛"
          },
          {
            word: "Pebbles",
            syllables: ["Peb", "bles"],
            phonetic: "/ˈpeb.əlz/",
            meaning: "ছোট গোল পাথর / নুড়িপাথর",
            partOfSpeech: "Noun (Plural)",
            example: "He dropped pebbles into the deep pitcher.",
            icon: "🪨"
          },
          {
            word: "Brim",
            syllables: ["Brim"],
            phonetic: "/brɪm/",
            meaning: "পাত্রের কানায় কানায় বা উপচে পড়ার প্রান্ত",
            partOfSpeech: "Noun",
            example: "The water level rose right to the brim.",
            icon: "💧"
          }
        ]
      },
      teacherNotes: "'Scorching' এবং 'Pebbles' শব্দের উচ্চারণ ও বানান মনোযোগ দিয়ে অনুশীলন করান।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি শব্দের সঠিক উচ্চারণ ও সিলেবল হাততালি দিয়ে অনুশীলন করান।",
        "ধাপ ২: বাস্তব উদাহরণের মাধ্যমে অর্থ স্পষ্ট করুন।",
        "ধাপ ৩: শিক্ষার্থীরা নিজস্ব বাক্য তৈরি করবে।"
      ]
    },
    {
      id: 5,
      title: "Interactive Stage: The Pebble Dropping Experiment",
      subtitle: "ইন্টারেক্টিভ সিমুলেশন: নুড়িপাথর ফেলে পানির স্তর বৃদ্ধি (Interactive Science Stage)",
      phase: "৪. বিজ্ঞানসম্মত সিমুলেশন (Interactive Experiment)",
      duration: "৫ মিনিট",
      themeColor: "from-sky-600 to-indigo-800",
      imageEmoji: "🎮 🏺 🪨",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Enter our interactive science fable stage!",
          "Click to pick up pebbles from the ground and drop them into the tall clay pitcher.",
          "Watch the blue water level rise with each pebble: 20%, 35%, 50%, 68%, 85%, and finally 96% to the brim!",
          "When the water reaches the top, help the clever crow drink the cool water and quench his thirst!"
        ],
        banglaExplanation: "আমাদের ইন্টারেক্টিভ স্টেজে কলসিতে নুড়িপাথর ফেলে পানির স্তর বৃদ্ধি পরীক্ষা করো! ৫টি নুড়ি ফেলে পানি কানায় কানায় তুলে কাকটিকে তৃষ্ণা মেটাতে সাহায্য করো!"
      },
      teacherNotes: "শিক্ষার্থীদের স্টেজে একের পর এক নুড়িপাথর ফেলে পানির উচ্চতা পর্যবেক্ষণ করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: কলসির প্রাথমিক পানির স্তর দেখান।",
        "ধাপ ২: শিক্ষার্থীদের বোতামে ক্লিক করে নুড়ি ফেলতে বলুন।",
        "ধাপ ৩: পানি কানায় পৌঁছালে পানি পানের অ্যানিমেশন উদ্‌যাপন করুন।"
      ]
    },
    {
      id: 6,
      title: "Moral Lessons: Where There Is a Will, There Is a Way",
      subtitle: "ইচ্ছা থাকলে উপায় হয়: বুদ্ধিমত্তা ও আত্মবিশ্বাসের জয় (Problem-Solving Wisdom)",
      phase: "৫. নীতিকথা ও অনুপ্রেরণা (Moral Wisdom)",
      duration: "৪ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "💡 🌟 🏆",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "What great wisdom does the clever crow teach us?",
          "1. 'WHERE THERE IS A WILL, THERE IS A WAY': If you are determined, you will surely find a solution.",
          "2. THINK SCIENTIFICALLY: Brute force (overturning the pitcher) failed, but scientific displacement worked!",
          "3. PATIENCE AND DILIGENCE: Dropping stones one by one requires continuous, focused patience."
        ],
        banglaExplanation: "কাকের গল্প আমাদের কী শেখায়: ১. 'ইচ্ছা থাকলে উপায় হয়'—দৃঢ় সংকল্প থাকলে কঠিনতম সমস্যারও সমাধান মেলে। ২. গায়ের জোরের চেয়ে বুদ্ধির জোর অনেক বেশি কার্যকর। ৩. ধৈর্য ও একাগ্রতার সাথে লেগে থাকলে সফলতা আসবেই।"
      },
      teacherNotes: "শিক্ষার্থীদের ক্লাসের পড়াশোনা বা গণিতের সমস্যায় হতাশ না হয়ে বুদ্ধি খাটাতে অনুপ্রাণিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: 'Where there is a will, there is a way' প্রবাদটি বোর্ডে লিখে দিন।",
        "ধাপ ২: শিক্ষার্থীরা বাস্তব জীবনে সমস্যা সমাধানের অভিজ্ঞতা শেয়ার করবে।",
        "ধাপ ৩: সমস্বরে প্রবাদটি আবৃত্তি করান।"
      ]
    },
    {
      id: 7,
      title: "Interactive Review & Quick Quiz",
      subtitle: "দ্রুত যাচাই ও মূল্যায়ন: কাকের বুদ্ধি ও ঘটনার ক্রমপর্যায় (Quick Check)",
      phase: "৬. গঠনমূলক মূল্যায়ন (Rapid Quiz)",
      duration: "৪ মিনিট",
      themeColor: "from-sky-600 to-indigo-700",
      imageEmoji: "🎯 ⚡ 📝",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Answer these rapid quiz questions on The Clever Crow:",
          "1. What kind of weather was it? (A scorching summer afternoon)",
          "2. Where was the clay pitcher situated? (Under a shady tree)",
          "3. Why was the pitcher difficult to overturn? (It was too heavy)",
          "4. How did the crow make the water rise? (By dropping pebbles one by one into the pitcher)"
        ],
        banglaExplanation: "দ্রুত প্রশ্নের উত্তর দাও এবং গল্পের প্রতিটি গুরুত্বপূর্ণ তথ্য ঝালিয়ে নাও!"
      },
      teacherNotes: "শিক্ষার্থীদের দ্রুত হাত তুলতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি প্রশ্ন ক্লাসে জিজ্ঞেস করুন।",
        "ধাপ ২: শিক্ষার্থীদের স্বতঃস্ফূর্ত উত্তরের প্রশংসা করুন।",
        "ধাপ ৩: সঠিক উত্তর বোর্ডের মাধ্যমে নিশ্চিত করুন।"
      ]
    },
    {
      id: 8,
      title: "Summary & 20-Mark Companion Worksheet",
      subtitle: "পাঠের সারসংক্ষেপ ও পূর্ণাঙ্গ ২০ নম্বরের মূল্যায়ন (Summary & Assessment)",
      phase: "৭. সারসংক্ষেপ ও মূল্যায়ন (Wrap-up)",
      duration: "৩ মিনিট",
      themeColor: "from-slate-800 to-sky-950",
      imageEmoji: "🏆 🌟 📝",
      sceneType: "summary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed the story of The Clever Crow.",
          "Key Takeaways:",
          "• Never give up when facing difficulties.",
          "• Use observation and intelligent thinking to solve problems.",
          "• 'Where there is a will, there is a way!'",
          "Now open and solve your 20-mark companion worksheet below!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা বুদ্ধিমান কাকের গল্প সফলভাবে সম্পন্ন করেছ। জীবনের প্রতিটি পদক্ষেপে ধৈর্য ও বুদ্ধিমত্তা প্রয়োগ করো এবং ২০ নম্বরের সঙ্গী ওয়ার্কশিটটি সম্পন্ন করো!"
      },
      teacherNotes: "শিক্ষার্থীদের ২০ নম্বরের পূর্ণাঙ্গ সঙ্গী ওয়ার্কশিট সমাধান করতে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: উপকথার মূল বার্তা সংক্ষেপে পুনরাবৃত্তি করুন।",
        "ধাপ ২: ওয়ার্কশিট খুলুন।",
        "ধাপ ৩: শিক্ষার্থীদের স্বাবলম্বীভাবে পরীক্ষা শেষ করতে বলুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 4 English Evaluation — The Clever Crow",
    classGrade: "Class 4 (৪র্থ শ্রেণি)",
    subject: "English for Today (Unit 12, Lesson 2)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "matching",
        title: "Section A: Column Matching (5 Marks)",
        instruction: "Column A-এর সাথে Column B-এর সঠিক অংশের অর্থপূর্ণ মিল করো:",
        content: [
          { a: "1. A thirsty crow was", b: "a. under a shady tree." },
          { a: "2. A tall clay pitcher was", b: "b. flying all over the village for water." },
          { a: "3. The water was at", c: "c. rose slowly to the brim." },
          { a: "4. The clever crow dropped", d: "d. the very bottom of the pitcher." },
          { a: "5. The water level", e: "e. small pebbles one by one." }
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Clues (5 Marks)",
        instruction: "ক্লু বক্স থেকে উপযুক্ত শব্দ নিয়ে শূন্যস্থান পূরণ করো: [ pebbles, beak, brim, thirsty, heavy ]",
        content: [
          "1. A ____________ crow was looking for water in the village.",
          "2. His ____________ could not reach the bottom of the pitcher.",
          "3. The clay pitcher was too ____________ to overturn.",
          "4. The crow dropped small ____________ into the pitcher.",
          "5. Finally, the water level rose to the ____________."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে True এবং মিথ্যা হলে False লেখো:",
        content: [
          "1. The story took place on a cold winter night. ( __________ )",
          "2. The crow found a pitcher filled to the brim with water. ( __________ )",
          "3. The crow overturned the pitcher easily. ( __________ )",
          "4. The crow used small pebbles to raise the water level. ( __________ )",
          "5. The crow drank the refreshing water and flew away happily. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. Why could the crow not drink water from the pitcher at first?\n   Answer: ________________________________________________________________",
          "2. How did the crow solve the problem and reach the water?\n   Answer: ________________________________________________________________",
          "3. What is the moral lesson of The Clever Crow story?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};


// =========================================================================
// CLASS 5: UNIT 1 - HELLO! SIMA AND JESSICA AT RAILWAY STATION (pp. 2–5)
// =========================================================================
export const SIMA_JESSICA_SLIDE_DECK: SlideDeck = {
  id: "sima-jessica",
  grade: "Class 5 (৫ম শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 1: Hello!",
  lesson: "Lesson 1: Hello! - Sima and Jessica at Railway Station",
  topic: "Sima and Jessica at Railway Station: Introductions & Travel Courtesies (pp. 2–5)",
  category: "english",
  thumbnailEmoji: "🚂 🇬🇧 🇧🇩",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Hello! At the Railway Station",
      subtitle: "রেলওয়ে স্টেশনে কুশল বিনিময় ও নতুন বন্ধুত্বের সূচনা (Orientation & Greetings)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-blue-600 to-indigo-700",
      imageEmoji: "🚂 👧 👱‍♀️",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello and welcome to Class 5 English!",
          "Today we will visit a bustling railway station and meet Sima and Jessica.",
          "Sima is from Bangladesh, traveling to Sylhet with her family.",
          "Jessica is a friendly visitor from the United Kingdom on holiday with her father.",
          "Let's learn how to introduce ourselves and exchange warm travel wishes in English!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা ৫ম শ্রেণির ইংরেজিতে! আজ আমরা একটি কর্মব্যস্ত রেলওয়ে স্টেশনে সীমা এবং জেসিকার সাথে পরিচিত হব। সীমা তার পরিবারের সাথে ট্রেনে করে সিলেট যাচ্ছে। অন্যদিকে জেসিকা যুক্তরাজ্য (UK) থেকে তার বাবার সাথে বাংলাদেশে ছুটিতে বেড়াতে এসেছে। কীভাবে ইংরেজিতে ভদ্রভাবে নিজের পরিচয় দিতে হয় এবং ভ্রমণের শুভকামনা জানাতে হয়, তা আজ আমরা শিখব!"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তারা কি কখনো রেলস্টেশনে কোনো নতুন বন্ধুর সাথে কথা বলেছে? ইংরেজিতে কীভাবে পরিচয় দিতে হয়?",
      quickTeachingSteps: [
        "ধাপ ১: নতুন মানুষের সাথে কথা শুরু করার ভদ্র শিষ্টাচার ব্যাখ্যা করুন।",
        "ধাপ ২: 'May I introduce myself?' বাক্যটি ক্লাসে ড্রিল করান।",
        "ধাপ ৩: মূল পাঠের সাথে শিক্ষার্থীদের যুক্ত করুন।"
      ]
    },
    {
      id: 2,
      title: "Reading & Listening: Meeting at the Station",
      subtitle: "পাঠ্যাংশ পাঠ: সীমা ও জেসিকার পরিচয় (NCTB Text Part 1)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-indigo-600 to-blue-700",
      imageEmoji: "📖 🚉 🤝",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Sima and Jessica are at the railway station. They are talking.",
          "Sima is going to Sylhet with her family.",
          "Jessica is from the United Kingdom. She is on holiday in Bangladesh with her father.",
          "Her train is leaving in 10 minutes."
        ],
        banglaExplanation: "সীমা এবং জেসিকা রেলওয়ে স্টেশনে অবস্থান করছে। তারা একে অপরের সাথে কথা বলছে। সীমা তার পরিবারের সাথে সিলেট যাচ্ছে। জেসিকা যুক্তরাজ্য থেকে এসেছে। সে তার বাবার সাথে বাংলাদেশে ছুটিতে এসেছে। তার ট্রেন আর মাত্র ১০ মিনিট পরই ছেড়ে যাবে।"
      },
      teacherNotes: "যুক্তরাজ্য (United Kingdom) এর ভৌগোলিক অবস্থান এবং বাংলাদেশের সাথে দূরত্বের কথা সংক্ষেপে আলোচনা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক সঠিক বাচনভঙ্গিতে ও ব্রিটিশ/বাংলাদেশি উচ্চারণে পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা জোড়ায় জোড়ায় অনুচ্ছেদটি পাঠ করবে।",
        "ধাপ ৩: ভ্রমণের গন্তব্য ও সময়সীমা চিহ্নিত করুন।"
      ]
    },
    {
      id: 3,
      title: "Reading & Listening: Good Journeys & Warm Goodbyes",
      subtitle: "পাঠ্যাংশ পাঠ: শুভেচ্ছা বিনিময় ও বিদায় সম্ভাষণ (NCTB Text Part 2)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-blue-700 to-teal-700",
      imageEmoji: "👋 🚆 💖",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Sima and Jessica wish each other a good journey and a good time in Bangladesh.",
          "Jessica says she is having a great time in Bangladesh and she likes the people very much.",
          "They say goodbye politely as their trains arrive at the platform.",
          "They both board their trains with happy hearts and fond memories."
        ],
        banglaExplanation: "সীমা এবং জেসিকা একে অপরের শুভযাত্রা এবং বাংলাদেশে সুন্দর সময় কাটানোর শুভকামনা জানায়। জেসিকা বলে যে সে বাংলাদেশে চমৎকার সময় কাটাচ্ছে এবং এখানকার মানুষদের খুব পছন্দ করে। তাদের ট্রেন প্ল্যাটফর্মে এসে পৌঁছালে তারা অত্যন্ত ভদ্রভাবে পরস্পরকে বিদায় জানায়। আনন্দভরা মন ও মধুর স্মৃতি নিয়ে তারা নিজ নিজ ট্রেনে চড়ে বসে।"
      },
      teacherNotes: "বিদেশি পর্যটকদের প্রতি বাঙালিদের আতিথেয়তার ঐতিহ্য ক্লাসে আলোচনা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: 'Have a good journey' বাক্যটি সঠিক সুরে অনুশীলন করান।",
        "ধাপ ২: পর্যটকদের প্রতি সম্মান ও বন্ধুভাবাপন্ন আচরণের গুরুত্ব বোঝান।",
        "ধাপ ৩: বিদায় জানানোর বিভিন্ন ইংরেজি বাক্যাংশ চিহ্নিত করুন।"
      ]
    },
    {
      id: 4,
      title: "Vocabulary Workshop: Travel & Courtesy",
      subtitle: "শব্দসম্ভার: ভ্রমণ, রেলওয়ে ও শিষ্টাচার বিষয়ক শব্দ (Key Vocabulary)",
      phase: "৩. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-amber-600 to-blue-700",
      imageEmoji: "💡 📚 🔤",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Master key vocabulary words from Sima and Jessica's conversation:"
        ],
        banglaExplanation: "ভ্রমণ ও কথোপকথন বিষয়ক প্রয়োজনীয় ইংরেজি শব্দগুলোর সঠিক উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Railway Station",
            syllables: ["Rail", "way", "Sta", "tion"],
            phonetic: "/ˈreɪl.weɪ ˌsteɪ.ʃən/",
            meaning: "রেলওয়ে স্টেশন / ট্রেন থামার স্থান",
            partOfSpeech: "Noun",
            example: "They met at the busy railway station.",
            icon: "🚉"
          },
          {
            word: "Holiday",
            syllables: ["Hol", "i", "day"],
            phonetic: "/ˈhɒl.ə.deɪ/",
            meaning: "ছুটি / অবকাশ যাপন",
            partOfSpeech: "Noun",
            example: "Jessica is on holiday with her father.",
            icon: "🏖️"
          },
          {
            word: "Journey",
            syllables: ["Jour", "ney"],
            phonetic: "/ˈdʒɜː.ni/",
            meaning: "যাত্রা / ভ্রমণ",
            partOfSpeech: "Noun",
            example: "Have a safe and pleasant journey!",
            icon: "🚆"
          },
          {
            word: "Platform",
            syllables: ["Plat", "form"],
            phonetic: "/ˈplæt.fɔːm/",
            meaning: "প্ল্যাটফর্ম (যাত্রীদের ট্রেনে ওঠার উঁচু চত্বর)",
            partOfSpeech: "Noun",
            example: "Their trains arrived at the platform.",
            icon: "🛤️"
          },
          {
            word: "Politely",
            syllables: ["Po", "lite", "ly"],
            phonetic: "/pəˈlaɪt.li/",
            meaning: "ভদ্রভাবে / শিষ্টতার সাথে",
            partOfSpeech: "Adverb",
            example: "They waved and said goodbye politely.",
            icon: "😊"
          }
        ]
      },
      teacherNotes: "'Politely' এবং 'Journey' শব্দের সিলেবল বিভাজন ও উচ্চারণ বারবার অনুশীলন করান।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক প্রতিটি শব্দ স্পষ্ট উচ্চারণে পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে প্রতিটি শব্দের উচ্চারণ করবে।",
        "ধাপ ৩: প্রতিটি শব্দ দিয়ে নতুন বাক্য তৈরি করান।"
      ]
    },
    {
      id: 5,
      title: "Interactive Stage: Platform Dialogue & Departure",
      subtitle: "ইন্টারেক্টিভ সিমুলেশন: ট্রেনের কাউন্টডাউন ও কথোপকথন (Interactive Stage)",
      phase: "৪. প্রায়োগিক সংলাপ (Interactive Dialogue)",
      duration: "৫ মিনিট",
      themeColor: "from-blue-600 to-indigo-800",
      imageEmoji: "💬 🚆 ⏰",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Step onto Platform 1 & 2 on our interactive railway stage!",
          "Follow the 6-step dialogue between Sima and Jessica.",
          "Check the 10-minute departure clock counting down for Jessica's train.",
          "Click to board the train with a cheerful whistle and practice saying polite goodbyes!"
        ],
        banglaExplanation: "আমাদের ইন্টারেক্টিভ স্টেজে রেলওয়ে প্ল্যাটফর্মে প্রবেশ করো! সীমা ও জেসিকার সংলাপ শোনো, ১০ মিনিটের ঘড়ি পর্যবেক্ষণ করো এবং ট্রেনে ওঠার চমৎকার মুহূর্ত উদ্‌যাপন করো!"
      },
      teacherNotes: "শিক্ষার্থীদের স্টেজে দুই চরিত্রের সংলাপ পরিবর্তনের বোতাম চাপতে দিন এবং একসাথে সংলাপ বলতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: সংলাপের ধাপগুলো এক এক করে এগিয়ে নিন।",
        "ধাপ ২: শিক্ষার্থীদের সীমা ও জেসিকার ভূমিকায় সংলাপ অভিনয় করতে বলুন।",
        "ধাপ ৩: ট্রেনে ওঠার বোতাম চেপে অ্যানিমেশন উপভোগ করুন।"
      ]
    },
    {
      id: 6,
      title: "Conversational Etiquette: Travel Phrases",
      subtitle: "ভ্রমণকালীন ভদ্র শিষ্টাচার ও শুভেচ্ছা বিনিময় (Social Etiquette)",
      phase: "৫. ব্যবহারিক ইংরেজি ও শিষ্টাচার (Conversational Skills)",
      duration: "৪ মিনিট",
      themeColor: "from-teal-600 to-emerald-700",
      imageEmoji: "🤝 🌟 💬",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Every polite English speaker uses these standard phrases:",
          "1. INTRODUCTIONS: 'May I introduce myself? I'm [Name].'",
          "2. TRAVEL WISHES: 'Have a good journey!' / 'Safe travels!'",
          "3. COMPLIMENTS: 'I'm having a great time here! The people are so welcoming.'",
          "4. FAREWELL: 'Nice meeting you! Goodbye!'"
        ],
        banglaExplanation: "প্রতিটি ভদ্র কথোপকথনে ব্যবহৃত মূল বাক্যাংশ: ১. পরিচয় দেওয়া: 'May I introduce myself?' ২. শুভকামনা: 'Have a good journey!' ৩. প্রশংসা করা: 'I like the people very much.' ৪. বিদায় নেওয়া: 'Nice meeting you! Goodbye!'"
      },
      teacherNotes: "ক্লাসরুমে দুজন দুজন করে শিক্ষার্থীকে এই চারটি বাক্যের মাধ্যমে রোল-প্লে করান।",
      quickTeachingSteps: [
        "ধাপ ১: বাক্যাংশগুলো সঠিক স্বরে আবৃত্তি করান।",
        "ধাপ ২: রোল-প্লে জুড়ি তৈরি করে অনুশীলন করান।",
        "ধাপ ৩: আত্মবিশ্বাসের সাথে ইংরেজি বলতে শিক্ষার্থীদের উৎসাহিত করুন।"
      ]
    },
    {
      id: 7,
      title: "Interactive Review & Quick Quiz",
      subtitle: "দ্রুত যাচাই ও মূল্যায়ন: সীমা ও জেসিকার প্রশ্নোত্তর (Quick Check)",
      phase: "৬. গঠনমূলক মূল্যায়ন (Rapid Quiz)",
      duration: "৪ মিনিট",
      themeColor: "from-blue-600 to-indigo-700",
      imageEmoji: "🎯 ⚡ 📝",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Answer these rapid quiz questions on Sima and Jessica:",
          "1. Where are Sima and Jessica talking? (At the railway station)",
          "2. Where is Sima traveling with her family? (To Sylhet)",
          "3. Where is Jessica from? (The United Kingdom)",
          "4. In how many minutes is Jessica's train leaving? (In 10 minutes)"
        ],
        banglaExplanation: "দ্রুত প্রশ্নের উত্তর দাও এবং পাঠের গুরুত্বপূর্ণ তথ্যগুলো ঝালিয়ে নাও!"
      },
      teacherNotes: "শিক্ষার্থীদের দ্রুত হাত তুলতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি প্রশ্ন ক্লাসে জিজ্ঞেস করুন।",
        "ধাপ ২: শিক্ষার্থীদের স্বতঃস্ফূর্ত উত্তরের প্রশংসা করুন।",
        "ধাপ ৩: সঠিক উত্তর বোর্ডের মাধ্যমে নিশ্চিত করুন।"
      ]
    },
    {
      id: 8,
      title: "Summary & 20-Mark Companion Worksheet",
      subtitle: "পাঠের সারসংক্ষেপ ও পূর্ণাঙ্গ ২০ নম্বরের মূল্যায়ন (Summary & Assessment)",
      phase: "৭. সারসংক্ষেপ ও মূল্যায়ন (Wrap-up)",
      duration: "৩ মিনিট",
      themeColor: "from-slate-800 to-blue-950",
      imageEmoji: "🏆 🌟 📝",
      sceneType: "summary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed the first lesson of Class 5 English.",
          "Key Takeaways:",
          "• Always introduce yourself politely to new friends.",
          "• Wish fellow travelers a safe and pleasant journey.",
          "• Hospitality and courtesy make our world a friendlier place.",
          "Now open and solve your 20-mark companion worksheet below!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা ৫ম শ্রেণির প্রথম পাঠ সফলভাবে সম্পন্ন করেছ। ভদ্র শিষ্টাচার ও চমৎকার ইংরেজি প্রয়োগ বজায় রাখো এবং ২০ নম্বরের সঙ্গী ওয়ার্কশিটটি সম্পন্ন করো!"
      },
      teacherNotes: "শিক্ষার্থীদের ২০ নম্বরের পূর্ণাঙ্গ সঙ্গী ওয়ার্কশিট সমাধান করতে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: পাঠের মূল শিক্ষা সংক্ষেপে পুনরাবৃত্তি করুন।",
        "ধাপ ২: ওয়ার্কশিট খুলুন।",
        "ধাপ ৩: শিক্ষার্থীদের স্বাবলম্বীভাবে পরীক্ষা শেষ করতে বলুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 5 English Evaluation — Sima and Jessica at Railway Station",
    classGrade: "Class 5 (৫ম শ্রেণি)",
    subject: "English for Today (Unit 1, Lesson 1)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "matching",
        title: "Section A: Column Matching (5 Marks)",
        instruction: "Column A-এর সাথে Column B-এর সঠিক অংশের অর্থপূর্ণ মিল করো:",
        content: [
          { a: "1. Sima is going to", b: "a. on holiday with her father." },
          { a: "2. Jessica is from", b: "b. Sylhet with her family." },
          { a: "3. Jessica is in Bangladesh", c: "c. as their trains arrive at platform." },
          { a: "4. Her train is leaving", d: "d. the United Kingdom." },
          { a: "5. They say goodbye politely", e: "e. in 10 minutes." }
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Clues (5 Marks)",
        instruction: "ক্লু বক্স থেকে উপযুক্ত শব্দ নিয়ে শূন্যস্থান পূরণ করো: [ railway, United Kingdom, Sylhet, holiday, politely ]",
        content: [
          "1. Sima and Jessica are talking at the ____________ station.",
          "2. Sima is traveling to ____________ with her family.",
          "3. Jessica is from the ____________.",
          "4. Jessica is on ____________ with her father.",
          "5. They wish each other a good journey and say goodbye ____________."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে True এবং মিথ্যা হলে False লেখো:",
        content: [
          "1. Sima and Jessica met at an airport. ( __________ )",
          "2. Sima is going to Chittagong with her friends. ( __________ )",
          "3. Jessica is visiting Bangladesh for work. ( __________ )",
          "4. Jessica's train leaves in ten minutes. ( __________ )",
          "5. Jessica likes the people of Bangladesh very much. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. Where are Sima and Jessica talking?\n   Answer: ________________________________________________________________",
          "2. Why is Jessica visiting Bangladesh?\n   Answer: ________________________________________________________________",
          "3. What do Sima and Jessica wish each other before leaving?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};


// =========================================================================
// CLASS 5: UNIT 3 - SAIKAT'S FAMILY: LIFE IN BOGURA (pp. 10–13)
// =========================================================================
export const SAIKATS_FAMILY_SLIDE_DECK: SlideDeck = {
  id: "saikats-family",
  grade: "Class 5 (৫ম শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 3: Saikat's Family",
  lesson: "Lesson 1: Saikat's Family - Life in Bogura",
  topic: "Saikat's Family: Life in Bogura, Constructive Hobbies & Improving English (pp. 10–13)",
  category: "english",
  thumbnailEmoji: "👨‍👩‍👦 📺 📚",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Saikat's Family in Bogura",
      subtitle: "বগুড়ার একটি সুখী পরিবার, পেশা ও অবসরের সৃজনশীল শখ (Orientation & Family Intro)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-indigo-600 to-purple-600",
      imageEmoji: "👨‍👩‍👦 🏢 📚",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello learners! Welcome to Class 5 English.",
          "Today we will visit an apartment in Bogura to meet Saikat Islam and his parents.",
          "We will explore how each family member spends their working hours and free time.",
          "We will also discover Saikat's secret strategy for improving his English every day!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা বগুড়ার একটি সুন্দর ফ্ল্যাটে সৈকত ইসলাম এবং তার মা-বাবার সাথে পরিচিত হব। সৈকতের বাবা ব্যাংকার, মা গৃহিণী এবং সৈকত পঞ্চম শ্রেণির একজন ভালো ছাত্র। অবসরে সৃজনশীল শখ চর্চা এবং ইংরেজি শেখার চমৎকার কৌশল আজ আমরা জানব!"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তারা অবসরে কী করে? তাদের পরিবারে কে কোন পেশায় নিয়োজিত?",
      quickTeachingSteps: [
        "ধাপ ১: পরিবার ও শখের (Hobbies) গুরুত্ব আলোচনা করুন।",
        "ধাপ ২: ইংরেজি শেখার বিভিন্ন মজার উপায় শিক্ষার্থীদের জিজ্ঞেস করুন।",
        "ধাপ ৩: মূল পাঠের সাথে শিক্ষার্থীদের যুক্ত করুন।"
      ]
    },
    {
      id: 2,
      title: "Reading & Listening: Father and Mother",
      subtitle: "পাঠ্যাংশ পাঠ: বাবার ব্যাংকিং ও গল্প লেখা, মায়ের সেলাই (NCTB Text Part 1)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-600 to-indigo-700",
      imageEmoji: "📖 👨‍💼 👩",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Saikat Islam lives with his parents in an apartment in Bogura.",
          "His father Mr. Rashidul Islam is a banker. But in his free time, Mr. Islam writes stories and listens to music.",
          "Saikat's mother is Mrs. Monwara Islam. She is a housewife.",
          "In her free time, she enjoys sewing. She makes dresses. She often gets orders from her friends and neighbours."
        ],
        banglaExplanation: "সৈকত ইসলাম বগুড়ার একটি ফ্ল্যাটে তার মা-বাবার সাথে বাস করে। তার বাবা জনাব রাশিদুল ইসলাম একজন ব্যাংকার। কিন্তু অবসর সময়ে জনাব ইসলাম গল্প লেখেন এবং গান শোনেন। সৈকতের মা বেগম মনোয়ারা ইসলাম। তিনি একজন গৃহিণী। অবসর সময়ে তিনি সেলাই করতে ভালোবাসেন। তিনি পোশাক তৈরি করেন। তিনি প্রায়ই তাঁর বান্ধবীদের ও প্রতিবেশীদের কাছ থেকে পোশাক তৈরির ফরমায়েশ পান।"
      },
      teacherNotes: "শিক্ষার্থীদের বাবার পেশা ও শখ এবং মায়ের পেশা ও শখের পার্থক্য ছক আকারে বুঝিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক সঠিক উচ্চারণে অনুচ্ছেদটি পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে প্রতিটি বাক্য পড়বে।",
        "ধাপ ৩: বাবা ও মায়ের পেশা ও শখ বোর্ডে লিখে তুলনা করুন।"
      ]
    },
    {
      id: 3,
      title: "Reading & Listening: Saikat's Learning Strategy",
      subtitle: "পাঠ্যাংশ পাঠ: কার্টুন দেখা ও প্রাণীদের গল্পের বই পড়া (NCTB Text Part 2)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-indigo-600 to-sky-700",
      imageEmoji: "👦 📺 🐅",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Saikat is in Class 5. He is a good student.",
          "He wants to improve his English, so he watches cartoons on TV every day.",
          "He also reads English books.",
          "He likes books about animals, especially tigers and lions."
        ],
        banglaExplanation: "সৈকত পঞ্চম শ্রেণিতে পড়ে। সে একজন ভালো ছাত্র। সে তার ইংরেজির দক্ষতা বাড়াতে চায়, তাই সে প্রতিদিন টিভিতে কার্টুন দেখে। সে ইংরেজি বইও পড়ে। সে পশু-পাখির বই পছন্দ করে, বিশেষ করে বাঘ এবং সিংহের গল্প।"
      },
      teacherNotes: "ইংরেজি কার্টুন ও বই পড়ার মাধ্যমে শব্দভাণ্ডার ও বাচনভঙ্গি কীভাবে উন্নত হয় তা বুঝিয়ে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: সৈকতের ইংরেজি চর্চার দুটি মূল পদ্ধতি চিহ্নিত করুন (কার্টুন ও বই)।",
        "ধাপ ২: শিক্ষার্থীদের তাদের প্রিয় পশু সম্পর্কে এক-দুটি ইংরেজি বাক্য বলতে বলুন।",
        "ধাপ ৩: প্রতিদিন ২০ মিনিট ইংরেজি অনুশীলনের অভ্যাস গড়ে তোলার পরামর্শ দিন।"
      ]
    },
    {
      id: 4,
      title: "Vocabulary Workshop: Family & Learning",
      subtitle: "শব্দসম্ভার: পরিবার, পেশা ও পড়াশোনা বিষয়ক গুরুত্বপূর্ণ শব্দ (Key Vocabulary)",
      phase: "৩. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-amber-600 to-indigo-700",
      imageEmoji: "💡 📚 🔤",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Learn key vocabulary words from Saikat's family story:"
        ],
        banglaExplanation: "পরিবার ও শিক্ষা সম্পর্কিত প্রয়োজনীয় ইংরেজি শব্দগুলোর সঠিক উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Apartment",
            syllables: ["A", "part", "ment"],
            phonetic: "/əˈpɑːt.mənt/",
            meaning: "ফ্ল্যাট / বহুতল ভবনের একক বাসস্থান",
            partOfSpeech: "Noun",
            example: "Saikat lives in an apartment in Bogura.",
            icon: "🏢"
          },
          {
            word: "Banker",
            syllables: ["Bank", "er"],
            phonetic: "/ˈbæŋ.kər/",
            meaning: "ব্যাংক কর্মকর্তা / ব্যাংকার",
            partOfSpeech: "Noun",
            example: "His father works as a banker in a bank.",
            icon: "👨‍💼"
          },
          {
            word: "Sewing",
            syllables: ["Sew", "ing"],
            phonetic: "/ˈsoʊ.ɪŋ/",
            meaning: "সেলাই কাজ / সুই-সুতো দিয়ে তৈরি",
            partOfSpeech: "Noun",
            example: "His mother enjoys sewing colourful dresses.",
            icon: "🧵"
          },
          {
            word: "Improve",
            syllables: ["Im", "prove"],
            phonetic: "/ɪmˈpruːv/",
            meaning: "উন্নতি করা / দক্ষতা বৃদ্ধি করা",
            partOfSpeech: "Verb",
            example: "Saikat wants to improve his English skills.",
            icon: "📈"
          },
          {
            word: "Especially",
            syllables: ["Es", "pe", "cial", "ly"],
            phonetic: "/ɪˈspeʃ.əl.i/",
            meaning: "বিশেষভাবে / বিশেষ করে",
            partOfSpeech: "Adverb",
            example: "He likes animals, especially tigers and lions.",
            icon: "🌟"
          }
        ]
      },
      teacherNotes: "'Especially' এবং 'Apartment' শব্দের সঠিক উচ্চারণ ও সিলেবল হাততালি দিয়ে অনুশীলন করান।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক প্রতিটি শব্দ স্পষ্ট উচ্চারণে পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে প্রতিটি শব্দের উচ্চারণ করবে।",
        "ধাপ ৩: প্রতিটি শব্দ দিয়ে নতুন বাক্য তৈরি করান।"
      ]
    },
    {
      id: 5,
      title: "Interactive Stage: Family Showcase & TV Corner",
      subtitle: "ইন্টারেক্টিভ সিমুলেশন: পরিবারের পরিচিতি ও কার্টুন রুম (Interactive Stage)",
      phase: "৪. প্রায়োগিক সিমুলেশন (Interactive Stage)",
      duration: "৫ মিনিট",
      themeColor: "from-indigo-600 to-purple-800",
      imageEmoji: "🎮 👨‍👩‍👦 📺",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Enter Saikat's Bogura apartment on our interactive stage!",
          "Click on each family member: Saikat, Father, and Mother to hear their self-introductions.",
          "Visit the English corner: Turn on the TV to play cartoons and open animal storybooks.",
          "Explore how constructive hobbies enrich their lives every day."
        ],
        banglaExplanation: "আমাদের ইন্টারেক্টিভ স্টেজে সৈকতের ফ্ল্যাটে প্রবেশ করো! পরিবারের সদস্যদের পরিচিতি শোনো, টিভি চালিয়ে কার্টুন দেখো এবং ইংরেজি শেখার কৌশল পর্যবেক্ষণ করো!"
      },
      teacherNotes: "শিক্ষার্থীদের স্টেজে টিভি চালু করার বোতাম চাপতে দিন এবং কার্টুনের ইংরেজি শোনার অনুভূতি জানতে চান।",
      quickTeachingSteps: [
        "ধাপ ১: সৈকত, বাবা ও মায়ের পরিচিতি কার্ড পরিবর্তন করুন।",
        "ধাপ ২: কার্টুন টিভি চালু করে শিক্ষার্থীদের শুনান।",
        "ধাপ ৩: বাঘ ও সিংহের বইয়ের প্রতি সৈকতের আগ্রহ নিয়ে কথা বলুন।"
      ]
    },
    {
      id: 6,
      title: "Study Tips: 4 Ways to Improve English",
      subtitle: "দৈনন্দিন জীবনে ইংরেজি দক্ষতা বাড়ানোর ৪টি সহজ উপায় (Learning Habits)",
      phase: "৫. কার্যকর শিখন কৌশল (Study Habits)",
      duration: "৪ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "💡 🌟 📖",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Follow Saikat's proven habits to master English:",
          "1. WATCH ENGLISH CARTOONS: Listening to simple dialogues improves your listening and pronunciation.",
          "2. READ STORYBOOKS: Reading books about your favorite topics (like animals or space) expands vocabulary.",
          "3. PRACTICE SPEAKING: Talk to family and friends using simple daily English sentences.",
          "4. CONSISTENCY: Spend just 15 to 20 minutes every single day!"
        ],
        banglaExplanation: "সৈকতের অনুসরণে ইংরেজি শেখার ৪টি অভ্যাস: ১. ইংরেজি কার্টুন দেখা (উচ্চারণ ও শোনার দক্ষতা বাড়ে)। ২. প্রিয় বিষয়ের গল্পের বই পড়া (নতুন শব্দ শেখা যায়)। ৩. বন্ধু ও পরিবারের সাথে ছোট ছোট ইংরেজি বাক্যে কথা বলা। ৪. প্রতিদিন নিয়ম করে ১৫-২০ মিনিট চর্চা করা।"
      },
      teacherNotes: "শিক্ষার্থীদের প্রতিদিন একটি করে নতুন ইংরেজি শব্দ শেখার ডায়েরি রাখতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: চারটি কৌশল ক্লাসে আলোচনা করুন।",
        "ধাপ ২: শিক্ষার্থীরা তাদের প্রিয় ইংরেজি কার্টুনের নাম বলবে।",
        "ধাপ ৩: প্রতিদিন ইংরেজি চর্চার শপথ নিন।"
      ]
    },
    {
      id: 7,
      title: "Interactive Review & Quick Quiz",
      subtitle: "দ্রুত যাচাই ও মূল্যায়ন: সৈকতের পরিবারের প্রশ্নোত্তর (Quick Check)",
      phase: "৬. গঠনমূলক মূল্যায়ন (Rapid Quiz)",
      duration: "৪ মিনিট",
      themeColor: "from-indigo-600 to-sky-700",
      imageEmoji: "🎯 ⚡ 📝",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Answer these rapid quiz questions on Saikat's Family:",
          "1. Where does Saikat Islam live? (In an apartment in Bogura)",
          "2. What is his father's profession? (A banker)",
          "3. What does his mother do in her free time? (Enjoys sewing and makes dresses)",
          "4. What does Saikat do to improve his English? (Watches cartoons on TV and reads animal books)"
        ],
        banglaExplanation: "দ্রুত প্রশ্নের উত্তর দাও এবং পাঠের গুরুত্বপূর্ণ তথ্যগুলো পুনরাবৃত্তি করো!"
      },
      teacherNotes: "শিক্ষার্থীদের দ্রুত হাত তুলতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি প্রশ্ন ক্লাসে জিজ্ঞেস করুন।",
        "ধাপ ২: শিক্ষার্থীদের স্বতঃস্ফূর্ত উত্তরের প্রশংসা করুন।",
        "ধাপ ৩: সঠিক উত্তর বোর্ডের মাধ্যমে নিশ্চিত করুন।"
      ]
    },
    {
      id: 8,
      title: "Summary & 20-Mark Companion Worksheet",
      subtitle: "পাঠের সারসংক্ষেপ ও পূর্ণাঙ্গ ২০ নম্বরের মূল্যায়ন (Summary & Assessment)",
      phase: "৭. সারসংক্ষেপ ও মূল্যায়ন (Wrap-up)",
      duration: "৩ মিনিট",
      themeColor: "from-slate-800 to-indigo-950",
      imageEmoji: "🏆 🌟 📝",
      sceneType: "summary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed the story of Saikat's Family in Bogura.",
          "Key Takeaways:",
          "• Family members support each other with love and constructive hobbies.",
          "• Free time should be used creatively in reading, sewing, writing, or learning.",
          "• You can easily improve your English by watching cartoons and reading books!",
          "Now open and solve your 20-mark companion worksheet below!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা সৈকতের পরিবারের পাঠ সফলভাবে সম্পন্ন করেছ। পরিবারকে ভালোবাসো, সৃজনশীল শখ চর্চা করো এবং ২০ নম্বরের সঙ্গী ওয়ার্কশিটটি সম্পন্ন করো!"
      },
      teacherNotes: "শিক্ষার্থীদের ২০ নম্বরের পূর্ণাঙ্গ সঙ্গী ওয়ার্কশিট সমাধান করতে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: পাঠের মূল শিক্ষা সংক্ষেপে পুনরাবৃত্তি করুন।",
        "ধাপ ২: ওয়ার্কশিট খুলুন।",
        "ধাপ ৩: শিক্ষার্থীদের স্বাবলম্বীভাবে পরীক্ষা শেষ করতে বলুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 5 English Evaluation — Saikat's Family: Life in Bogura",
    classGrade: "Class 5 (৫ম শ্রেণি)",
    subject: "English for Today (Unit 3, Lesson 1)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "matching",
        title: "Section A: Column Matching (5 Marks)",
        instruction: "Column A-এর সাথে Column B-এর সঠিক অংশের অর্থপূর্ণ মিল করো:",
        content: [
          { a: "1. Saikat Islam lives in", b: "a. writes stories and listens to music." },
          { a: "2. His father Mr. Rashidul", b: "b. an apartment in Bogura." },
          { a: "3. In his free time, Mr. Islam", c: "c. is a housewife who enjoys sewing." },
          { a: "4. Saikat's mother Mrs. Monwara", d: "d. is a banker by profession." },
          { a: "5. Saikat watches cartoons on TV", e: "e. to improve his English every day." }
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Clues (5 Marks)",
        instruction: "ক্লু বক্স থেকে উপযুক্ত শব্দ নিয়ে শূন্যস্থান পূরণ করো: [ Bogura, banker, sewing, improve, cartoons ]",
        content: [
          "1. Saikat Islam lives with his parents in ____________.",
          "2. Saikat's father is a ____________.",
          "3. In her free time, his mother enjoys ____________.",
          "4. Saikat wants to ____________ his English.",
          "5. He watches ____________ on TV every day."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে True এবং মিথ্যা হলে False লেখো:",
        content: [
          "1. Saikat Islam lives in an apartment in Dhaka. ( __________ )",
          "2. Mr. Rashidul Islam writes stories in his free time. ( __________ )",
          "3. Mrs. Monwara Islam never makes dresses for neighbours. ( __________ )",
          "4. Saikat is a student of Class 5. ( __________ )",
          "5. Saikat dislikes books about animals. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. What do Saikat's father and mother do in their free time?\n   Answer: ________________________________________________________________",
          "2. How does Saikat improve his English?\n   Answer: ________________________________________________________________",
          "3. What kind of books does Saikat like to read?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};


// =========================================================================
// CLASS 5: UNIT 6 - EAT HEALTHY: THE FOOD PYRAMID (pp. 22–25)
// =========================================================================
export const FOOD_PYRAMID_SLIDE_DECK: SlideDeck = {
  id: "food-pyramid",
  grade: "Class 5 (৫ম শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 6: Eat Healthy",
  lesson: "Lesson 1: Eat Healthy - The Food Pyramid",
  topic: "Eat Healthy: The Food Pyramid, 4 Food Tiers & Balanced Diet (pp. 22–25)",
  category: "english",
  thumbnailEmoji: "🔺 🥗 🍎",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Eat Healthy: What Food is Good Food?",
      subtitle: "খাদ্য পিরামিড ও সুষম খাদ্যের প্রাথমিক ধারণা (Orientation & Food Groups)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "🔺 🥗 🥦",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello healthy learners! Welcome to Class 5 English.",
          "What food is good food? Sometimes the food we like to eat isn't the healthiest food for us.",
          "Today we will explore the Food Pyramid, which helps us understand different food groups.",
          "It tells us how much of each food group we should eat every day to stay strong and energetic!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! কোন খাবারটি আমাদের জন্য ভালো খাবার? অনেক সময় আমাদের পছন্দের সুস্বাদু খাবারটি স্বাস্থ্যের জন্য উপকারী নাও হতে পারে। আজ আমরা খাদ্য পিরামিড সম্পর্কে জানব, যা আমাদের বিভিন্ন খাদ্যগোষ্ঠী এবং প্রতিদিন প্রতিটি দলের খাবার কতটুকু খাওয়া উচিত তা বুঝতে সাহায্য করে!"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তারা প্রতিদিন সকাল, দুপুর ও রাতে কী কী খাবার খায়? ফাস্টফুড কি প্রতিদিন খাওয়া ভালো?",
      quickTeachingSteps: [
        "ধাপ ১: স্বাস্থ্যকর ও অস্বাস্থ্যকর খাবারের তুলনা করুন।",
        "ধাপ ২: পিরামিডের আকৃতি ও স্তরের অর্থ ব্যাখ্যা করুন।",
        "ধাপ ৩: মূল পাঠের সাথে শিক্ষার্থীদের যুক্ত করুন।"
      ]
    },
    {
      id: 2,
      title: "Reading & Listening: Grains, Fruits & Vegetables",
      subtitle: "পাঠ্যাংশ পাঠ: শস্যদানা ও শাকসবজি (NCTB Text Part 1)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-amber-600 to-emerald-700",
      imageEmoji: "📖 🍚 🥕",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Look at the bottom of the Food Pyramid. These are foods made from grain, for example, rice, ruti and bread.",
          "Potatoes are not grains, but they are similar. Grains give us energy.",
          "Fruit and vegetables are in the next level. These are also very important for us.",
          "They have vitamins. They help our eyes and our health."
        ],
        banglaExplanation: "খাদ্য পিরামিডের তলদেশের দিকে তাকাও। এগুলো দানাদার শস্যজাতীয় খাবার, যেমন—ভাত, রুটি এবং পাউরুটি। আলু শস্যদানা নয়, তবে এগুলোর মতোই। শস্যজাতীয় খাবার আমাদের শক্তি জোগায়। ফলমূল এবং শাকসবজি পরবর্তী স্তরে অবস্থিত। এগুলোও আমাদের জন্য অত্যন্ত গুরুত্বপূর্ণ। এগুলোতে প্রচুর ভিটামিন থাকে। এগুলো আমাদের চোখ এবং সামগ্রিক স্বাস্থ্য ভালো রাখে।"
      },
      teacherNotes: "শিক্ষার্থীদের বোঝান কেন পিরামিডের সবচেয়ে চওড়া ভিত্তি স্তরে শস্যদানা রয়েছে (কারণ আমাদের শক্তি বেশি প্রয়োজন)।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক সঠিক উচ্চারণে অনুচ্ছেদটি পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে প্রতিটি বাক্য পড়বে।",
        "ধাপ ৩: শস্যদানা ও শাকসবজির স্বাস্থ্যগত উপকারিতা বোর্ডে লিখুন।"
      ]
    },
    {
      id: 3,
      title: "Reading & Listening: Protein, Dairy, Fat & Oil",
      subtitle: "পাঠ্যাংশ পাঠ: প্রোটিন, দুগ্ধজাত খাবার ও তেল-চর্বি (NCTB Text Part 2)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-600 to-rose-700",
      imageEmoji: "🐟 🥛 🧈",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "On the next level, there are fish, meat, dairy products, beans and lentils.",
          "Meat, fish and chicken have protein. Beans and lentils do, too!",
          "Dairy products are things like milk and egg. They help our teeth and bones.",
          "Fat and oil are at the top of the Food Pyramid. These make food delicious, but our body does not need very much of them."
        ],
        banglaExplanation: "পরের স্তরে রয়েছে মাছ, মাংস, দুগ্ধজাত দ্রব্য, শিম এবং ডাল। মাংস, মাছ এবং মুরগির মাংসে প্রোটিন রয়েছে। শিম এবং ডালেও প্রচুর প্রোটিন থাকে! দুধ এবং ডিমের মতো দুগ্ধজাত দ্রব্য আমাদের দাঁত ও হাড় গঠনে সাহায্য করে। তেল ও চর্বিজাতীয় খাবার খাদ্য পিরামিডের শীর্ষে রয়েছে। এগুলো খাবারকে সুস্বাদু করে, কিন্তু আমাদের শরীরের জন্য এগুলোর খুব বেশি প্রয়োজন নেই।"
      },
      teacherNotes: "মাছ, ডাল ও দুধের মতো সহজলভ্য পুষ্টিকর খাবারের ওপর জোর দিন।",
      quickTeachingSteps: [
        "ধাপ ১: মাংস ও মাছ ছাড়াও ডাল-শিমে যে প্রোটিন আছে তা শেখান।",
        "ধাপ ২: দাঁত ও হাড় শক্ত করতে দুধ ও ডিমের ভূমিকা আলোচনা করুন।",
        "ধাপ ৩: তেল ও মিষ্টি জাতীয় খাবার কেন সামান্য খেতে হবে তা বোঝান।"
      ]
    },
    {
      id: 4,
      title: "Vocabulary Workshop: Nutrition & Wellness",
      subtitle: "শব্দসম্ভার: খাদ্য উপাদান ও পুষ্টি বিষয়ক শব্দ (Key Vocabulary)",
      phase: "৩. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-amber-600 to-teal-700",
      imageEmoji: "💡 📚 🔤",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Master key vocabulary words from The Food Pyramid:"
        ],
        banglaExplanation: "পুষ্টি ও স্বাস্থ্য সম্পর্কিত প্রয়োজনীয় ইংরেজি শব্দগুলোর সঠিক উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Pyramid",
            syllables: ["Pyr", "a", "mid"],
            phonetic: "/ˈpɪr.ə.mɪd/",
            meaning: "পিরামিড (ত্রিভুজাকার স্তরযুক্ত রূপরেখা)",
            partOfSpeech: "Noun",
            example: "The Food Pyramid shows daily food groups.",
            icon: "🔺"
          },
          {
            word: "Grains",
            syllables: ["Grains"],
            phonetic: "/ɡreɪnz/",
            meaning: "দানাদার খাদ্যশস্য (ধান, গম ইত্যাদি)",
            partOfSpeech: "Noun (Plural)",
            example: "Rice and ruti are foods made from grain.",
            icon: "🌾"
          },
          {
            word: "Energy",
            syllables: ["En", "er", "gy"],
            phonetic: "/ˈen.ə.dʒi/",
            meaning: "শক্তি / কর্মক্ষমতা",
            partOfSpeech: "Noun",
            example: "Carbohydrates in grain give us energy.",
            icon: "⚡"
          },
          {
            word: "Protein",
            syllables: ["Pro", "tein"],
            phonetic: "/ˈproʊ.tiːn/",
            meaning: "আমিষ / প্রোটিন (দেহ গঠনকারী উপাদান)",
            partOfSpeech: "Noun",
            example: "Fish, chicken, and lentils are rich in protein.",
            icon: "🍗"
          },
          {
            word: "Delicious",
            syllables: ["De", "li", "cious"],
            phonetic: "/dɪˈlɪʃ.əs/",
            meaning: "সুস্বাদু / অতি মুখরোচক",
            partOfSpeech: "Adjective",
            example: "Fats and oils make fried food delicious.",
            icon: "😋"
          }
        ]
      },
      teacherNotes: "'Delicious' এবং 'Protein' শব্দের উচ্চারণ ও বানান মনোযোগ দিয়ে করান।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি শব্দের সঠিক উচ্চারণ ও সিলেবল হাততালি দিয়ে অনুশীলন করান।",
        "ধাপ ২: প্রতিটি শব্দের স্বাস্থ্যগত গুরুত্ব স্পষ্ট করুন।",
        "ধাপ ৩: শিক্ষার্থীরা নিজস্ব খাদ্যতালিকার বাক্য তৈরি করবে।"
      ]
    },
    {
      id: 5,
      title: "Interactive Stage: The 4-Tier Food Pyramid",
      subtitle: "ইন্টারেক্টিভ সিমুলেশন: পিরামিডের ৪টি স্তর ও সুষম থালা (Interactive Stage)",
      phase: "৪. প্রায়োগিক সিমুলেশন (Interactive Stage)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-600 to-indigo-800",
      imageEmoji: "🎮 🔺 🍽️",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Explore the 4 tiers of the Food Pyramid on our interactive stage!",
          "Tier 4 (Base): Grains — Eat most for sustained physical and mental energy.",
          "Tier 3: Fruits & Vegetables — Eat plenty for essential vitamins and sharp eyesight.",
          "Tier 2: Protein & Dairy — Eat moderately for muscle growth, strong teeth, and bones.",
          "Tier 1 (Top): Fat & Oil — Eat least! Use the plate builder to build a 100% balanced lunch!"
        ],
        banglaExplanation: "আমাদের ইন্টারেক্টিভ স্টেজে খাদ্য পিরামিডের ৪টি স্তর ক্লিক করে আবিষ্কার করো এবং সুষম থালায় ভাত, শাকসবজি, মাছ ও ফল সাজিয়ে ১০০% সুষম খাবারের অভিজ্ঞতা নাও!"
      },
      teacherNotes: "শিক্ষার্থীদের স্টেজে প্রতিটি স্তরে ক্লিক করতে দিন এবং সুষম থালা সাজানোর খেলায় অংশ নিতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: পিরামিডের নিচ থেকে ওপরের স্তরগুলো এক এক করে প্রদর্শন করুন।",
        "ধাপ ২: শিক্ষার্থীদের থালায় খাবার যোগ করতে বলুন।",
        "ধাপ ৩: সুষম খাবার প্রস্তুত হলে ক্লাসে করতালি দিন।"
      ]
    },
    {
      id: 6,
      title: "Healthy Habits: Say No to Junk Food",
      subtitle: "স্বাস্থ্যবিধি: ফাস্টফুড বর্জন ও সুষম আহারের সুফল (Healthy Lifestyle)",
      phase: "৫. পুষ্টি শিক্ষা ও স্বাস্থ্যবিধি (Nutrition Education)",
      duration: "৪ মিনিট",
      themeColor: "from-teal-600 to-emerald-700",
      imageEmoji: "🚫 🍟 🥗",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Follow these golden rules of healthy nutrition:",
          "1. EAT A VARIETY: Don't eat only one food item. Mix grains, veggies, and protein.",
          "2. LIMIT JUNK FOOD: French fries, chips, and sodas have excessive fat and sugar that harm teeth and body.",
          "3. DRINK PURE WATER: Drink plenty of clean water every day to keep your body hydrated.",
          "4. FRESH IS BEST: Eat seasonal local fruits like papayas, mangoes, and bananas!"
        ],
        banglaExplanation: "সুস্থ থাকার সোনালী নিয়ম: ১. বিভিন্ন ধরনের খাবারের সমন্বয় করো। ২. চিপস, ভাজাপোড়া ও কোল্ড ড্রিঙ্কসের মতো জাঙ্কফুড পরিহার করো। ৩. প্রতিদিন প্রচুর বিশুদ্ধ পানি পান করো। ৪. দেশীয় তাজা ও মৌসুমী ফলমূল বেশি বেশি খাও!"
      },
      teacherNotes: "শিক্ষার্থীদের স্কুলের টিফিনে বাইরের চিপসের বদলে বাড়ি থেকে আনা সুষম টিফিন খাওয়ার উৎসাহ দিন।",
      quickTeachingSteps: [
        "ধাপ ১: ফাস্টফুডের ক্ষতিকর দিকগুলো আলোচনা করুন।",
        "ধাপ ২: মৌসুমি দেশীয় ফলের তালিকা তৈরি করুন।",
        "ধাপ ৩: শিক্ষার্থীরা সুষম টিফিনের অঙ্গীকার করবে।"
      ]
    },
    {
      id: 7,
      title: "Interactive Review & Quick Quiz",
      subtitle: "দ্রুত যাচাই ও মূল্যায়ন: খাদ্য পিরামিডের প্রশ্নোত্তর (Quick Check)",
      phase: "৬. গঠনমূলক মূল্যায়ন (Rapid Quiz)",
      duration: "৪ মিনিট",
      themeColor: "from-emerald-600 to-sky-700",
      imageEmoji: "🎯 ⚡ 📝",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Answer these rapid quiz questions on The Food Pyramid:",
          "1. What food group is at the bottom base of the Food Pyramid? (Foods made from grain: rice, ruti, bread)",
          "2. What do grains give us? (Energy)",
          "3. Which foods give us vitamins for our eyes and health? (Fruits and vegetables)",
          "4. Which foods help our teeth and bones? (Dairy products like milk and eggs)"
        ],
        banglaExplanation: "দ্রুত প্রশ্নের উত্তর দাও এবং প্রতিটি খাদ্যস্তরের পুষ্টিগুণ পুনরাবৃত্তি করো!"
      },
      teacherNotes: "শিক্ষার্থীদের দ্রুত হাত তুলতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি প্রশ্ন ক্লাসে জিজ্ঞেস করুন।",
        "ধাপ ২: শিক্ষার্থীদের স্বতঃস্ফূর্ত উত্তরের প্রশংসা করুন।",
        "ধাপ ৩: সঠিক উত্তর বোর্ডের মাধ্যমে নিশ্চিত করুন।"
      ]
    },
    {
      id: 8,
      title: "Summary & 20-Mark Companion Worksheet",
      subtitle: "পাঠের সারসংক্ষেপ ও পূর্ণাঙ্গ ২০ নম্বরের মূল্যায়ন (Summary & Assessment)",
      phase: "৭. সারসংক্ষেপ ও মূল্যায়ন (Wrap-up)",
      duration: "৩ মিনিট",
      themeColor: "from-slate-800 to-teal-950",
      imageEmoji: "🏆 🌟 📝",
      sceneType: "summary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed The Food Pyramid lesson.",
          "Key Takeaways:",
          "• Grains give us energy; fruits and vegetables give us vitamins.",
          "• Fish, meat, dairy, and lentils build muscle and strong bones.",
          "• Eat fats and oils sparingly to keep your heart healthy.",
          "Now open and solve your 20-mark companion worksheet below!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা খাদ্য পিরামিডের পাঠ সফলভাবে সম্পন্ন করেছ। সুষম খাবার খাও, সুস্থ থাকো এবং ২০ নম্বরের সঙ্গী ওয়ার্কশিটটি সম্পন্ন করো!"
      },
      teacherNotes: "শিক্ষার্থীদের ২০ নম্বরের পূর্ণাঙ্গ সঙ্গী ওয়ার্কশিট সমাধান করতে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: খাদ্য পিরামিডের ৪টি প্রধান বার্তা পুনরাবৃত্তি করুন।",
        "ধাপ ২: ওয়ার্কশিট খুলুন।",
        "ধাপ ৩: শিক্ষার্থীদের স্বাবলম্বীভাবে পরীক্ষা শেষ করতে বলুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 5 English Evaluation — Eat Healthy: The Food Pyramid",
    classGrade: "Class 5 (৫ম শ্রেণি)",
    subject: "English for Today (Unit 6, Lesson 1)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "matching",
        title: "Section A: Column Matching (5 Marks)",
        instruction: "Column A-এর সাথে Column B-এর সঠিক অংশের অর্থপূর্ণ মিল করো:",
        content: [
          { a: "1. Foods made from grain", b: "a. help our teeth and bones." },
          { a: "2. Grains give our body", b: "b. give us vitamins for eyes and health." },
          { a: "3. Fruits and vegetables", c: "c. are at the bottom of the pyramid." },
          { a: "4. Dairy products like milk", d: "d. energy to study and play." },
          { a: "5. Fat and oil make food delicious", e: "e. but our body needs very little of them." }
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Clues (5 Marks)",
        instruction: "ক্লু বক্স থেকে উপযুক্ত শব্দ নিয়ে শূন্যস্থান পূরণ করো: [ energy, vitamins, bottom, protein, top ]",
        content: [
          "1. Grains are at the ____________ of the Food Pyramid.",
          "2. Grains give us ____________.",
          "3. Fruits and vegetables contain essential ____________.",
          "4. Fish, chicken, and lentils have ____________.",
          "5. Fat and oil are at the ____________ of the Food Pyramid."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে True এবং মিথ্যা হলে False লেখো:",
        content: [
          "1. Potatoes are grains. ( __________ )",
          "2. Fruits and vegetables help our eyes and health. ( __________ )",
          "3. Beans and lentils do not have any protein. ( __________ )",
          "4. Milk and eggs help build strong teeth and bones. ( __________ )",
          "5. We should eat large amounts of fat and oil every day. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. What is the Food Pyramid and how does it help us?\n   Answer: ________________________________________________________________",
          "2. Which food group gives us energy?\n   Answer: ________________________________________________________________",
          "3. Why are dairy products like milk and eggs important for our body?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};


// =========================================================================
// CLASS 5: UNIT 8 - WRITE TO ME SOON! DOCTOR'S ADVICE FOR SIMA (pp. 30–33)
// =========================================================================
export const DOCTORS_ADVICE_SLIDE_DECK: SlideDeck = {
  id: "doctors-advice",
  grade: "Class 5 (৫ম শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 8: Write to Me Soon!",
  lesson: "Lesson 1: Doctor's Advice for Sima",
  topic: "Doctor's Advice for Sima: Illness, Rest, Fluids & Hygiene (pp. 30–33)",
  category: "english",
  thumbnailEmoji: "🩺 🤒 🧻",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Doctor's Advice for Sima",
      subtitle: "সীমার অসুস্থতা, ফ্লুর লক্ষণ ও সুস্থ হয়ে ওঠার স্বাস্থ্যবিধি (Orientation & Health Care)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-rose-600 to-indigo-700",
      imageEmoji: "🩺 🤒 🏡",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello caring learners! Welcome to Class 5 English.",
          "Today we visit Sima at her home. She couldn't attend school because she is feeling unwell.",
          "The doctor came to examine her last night and gave her five essential rules to recover quickly.",
          "Let's learn how resting, eating energy foods, and practicing clean hygiene protect us from the flu!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা সীমার বাড়িতে যাব। সীমা অসুস্থ বোধ করায় আজ বিদ্যালয়ে যেতে পারেনি। গতকাল রাতে একজন ডাক্তার এসে তাকে দেখেছেন এবং দ্রুত সুস্থ হয়ে ওঠার জন্য পাঁচটি অত্যন্ত গুরুত্বপূর্ণ স্বাস্থ্যবিধি দিয়েছেন। বিশ্রাম, শক্তিবর্ধক খাবার এবং পরিচ্ছন্ন স্বাস্থ্যবিধি কীভাবে আমাদের সুস্থ রাখে, তা আজ আমরা শিখব!"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তাদের কখনো ঠান্ডা বা জ্বর হয়েছে কি না? তখন তারা কেমন বোধ করেছিল?",
      quickTeachingSteps: [
        "ধাপ ১: অসুস্থ হলে প্রাথমিক স্বাস্থ্যসচেতনতার গুরুত্ব আলোচনা করুন।",
        "ধাপ ২: ফ্লু (ইনফ্লুয়েঞ্জা) কীভাবে ছড়ায় তা সংক্ষেপে বুঝিয়ে দিন।",
        "ধাপ ৩: মূল পাঠের সাথে শিক্ষার্থীদের যুক্ত করুন।"
      ]
    },
    {
      id: 2,
      title: "Reading & Listening: Sima's Symptoms",
      subtitle: "পাঠ্যাংশ পাঠ: সীমার কাশি, গলাব্যথা ও জ্বর (NCTB Text Part 1)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-rose-600 to-pink-700",
      imageEmoji: "📖 🌡️ 👧",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "Sima is at home today. She didn't go to school because she is ill.",
          "She has a cough and a sore throat. She also feels very warm because she has a fever.",
          "She has the flu.",
          "The doctor visited Sima last night. He said she needs some medicine.",
          "He also told her what to do in order to get well soon."
        ],
        banglaExplanation: "সীমা আজ বাড়িতেই রয়েছে। সে অসুস্থ হওয়ায় বিদ্যালয়ে যায়নি। তার কাশি এবং গলাব্যথা হয়েছে। তার শরীর খুব গরম লাগছে কারণ তার জ্বর এসেছে। তার ইনফ্লুয়েঞ্জা বা ফ্লু হয়েছে। গতকাল রাতে ডাক্তার সীমাকে দেখতে এসেছিলেন। তিনি বলেছেন তার কিছু ওষুধের প্রয়োজন। তিনি তাকে দ্রুত আরোগ্য লাভের জন্য কী কী করতে হবে তাও বলে দিয়েছেন।"
      },
      teacherNotes: "শিক্ষার্থীদের 'sore throat' (গলাব্যথা) ও 'fever' (জ্বর) এর অনুভূতি ও শব্দার্থ পরিষ্কার করুন।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক সঠিক উচ্চারণে ও সমানুভূতিশীল কণ্ঠে পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে প্রতিটি লাইন পড়বে।",
        "ধাপ ৩: সীমার ৩টি প্রধান লক্ষণ (কাশি, গলাব্যথা, জ্বর) বোর্ডে লিখুন।"
      ]
    },
    {
      id: 3,
      title: "Reading & Listening: The Doctor's Advice",
      subtitle: "পাঠ্যাংশ পাঠ: ডাক্তারের ৫টি জীবনরক্ষাকারী স্বাস্থ্যবিধি (NCTB Text Part 2)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-amber-600 to-emerald-700",
      imageEmoji: "🩺 🍲 🧼",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "The doctor's advice: Eat food that gives your body energy. Try to eat, even if you aren't hungry. You need to be strong.",
          "Rest! Stay at home. Don't go to school or work.",
          "Drink a lot of water or juice. These are better than soft drinks.",
          "Are you coughing or sneezing? Cover your mouth and nose! Use a tissue, not your hand!",
          "Wash your hands regularly. Use your own plate, cup and glass. Other people can catch your illness from these things."
        ],
        banglaExplanation: "ডাক্তারের পরামর্শ: এমন খাবার খাও যা শরীরে শক্তি জোগায়। ক্ষুধা না থাকলেও খাওয়ার চেষ্টা করো; তোমাকে শক্তিশালী হতে হবে। বিশ্রাম নাও! ঘরে অবস্থান করো। বিদ্যালয়ে বা কাজে যেও না। প্রচুর পানি বা ফলের রস পান করো। এগুলো কোমল পানীয়ের চেয়ে অনেক ভালো। তুমি কি কাশছ বা হাঁচছ? তোমার মুখ ও নাক ঢেকে রাখো! টিস্যু ব্যবহার করো, খালি হাত নয়! নিয়মিত হাত ধোও। তোমার নিজস্ব থালা, কাপ এবং গ্লাস ব্যবহার করো। অন্য লোকেরা এসব জিনিস থেকে তোমার রোগে আক্রান্ত হতে পারে।"
      },
      teacherNotes: "হাঁচি-কাশির শিষ্টাচার ও ব্যক্তিগত তৈজসপত্র ব্যবহারের গুরুত্ব বোঝান।",
      quickTeachingSteps: [
        "ধাপ ১: ডাক্তারের ৫টি নিয়ম আলাদা করে শিক্ষার্থীদের মুখস্থ করান।",
        "ধাপ ২: টিস্যু ব্যবহারের সঠিক পদ্ধতি ক্লাসে অভিনয় করে দেখান।",
        "ধাপ ৩: ২০ সেকেন্ড সাবান দিয়ে হাত ধোয়ার স্বাস্থ্যবিধি স্মরণ করিয়ে দিন।"
      ]
    },
    {
      id: 4,
      title: "Vocabulary Workshop: Medical & Hygiene",
      subtitle: "শব্দসম্ভার: স্বাস্থ্য, চিকিৎসা ও পরিচ্ছন্নতা বিষয়ক শব্দ (Key Vocabulary)",
      phase: "৩. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-indigo-600 to-rose-600",
      imageEmoji: "💡 📚 🔤",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Learn key medical and hygiene vocabulary from Sima's lesson:"
        ],
        banglaExplanation: "স্বাস্থ্য ও চিকিৎসা বিষয়ক প্রয়োজনীয় ইংরেজি শব্দগুলোর সঠিক উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Fever",
            syllables: ["Fe", "ver"],
            phonetic: "/ˈfiː.vər/",
            meaning: "জ্বর (শরীরের তাপমাত্রা বৃদ্ধি)",
            partOfSpeech: "Noun",
            example: "She feels warm because she has a fever.",
            icon: "🌡️"
          },
          {
            word: "Sore Throat",
            syllables: ["Sore", "Throat"],
            phonetic: "/sɔːr θroʊt/",
            meaning: "গলাব্যথা / গলার ভেতরের প্রদাহ",
            partOfSpeech: "Noun",
            example: "Drinking warm water soothes a sore throat.",
            icon: "🗣️"
          },
          {
            word: "Medicine",
            syllables: ["Med", "i", "cine"],
            phonetic: "/ˈmed.sən/",
            meaning: "ওষুধ / ভেষজ প্রতিকার",
            partOfSpeech: "Noun",
            example: "The doctor prescribed medicine for her flu.",
            icon: "💊"
          },
          {
            word: "Sneezing",
            syllables: ["Sneez", "ing"],
            phonetic: "/ˈsniː.zɪŋ/",
            meaning: "হাঁচি দেওয়া",
            partOfSpeech: "Verb / Noun",
            example: "Cover your nose with tissue when sneezing.",
            icon: "🤧"
          },
          {
            word: "Regularly",
            syllables: ["Reg", "u", "lar", "ly"],
            phonetic: "/ˈreɡ.jə.lər.li/",
            meaning: "নিয়মিতভাবে / প্রতিদিন নিয়মমাফিক",
            partOfSpeech: "Adverb",
            example: "Wash your hands regularly with soap.",
            icon: "🧼"
          }
        ]
      },
      teacherNotes: "'Regularly' এবং 'Medicine' শব্দের উচ্চারণ ও সিলেবল হাততালি দিয়ে অনুশীলন করান।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি শব্দের সঠিক উচ্চারণ ও সিলেবল হাততালি দিয়ে অনুশীলন করান।",
        "ধাপ ২: প্রতিটি শব্দের স্বাস্থ্যগত গুরুত্ব স্পষ্ট করুন।",
        "ধাপ ৩: শিক্ষার্থীরা বাক্য গঠন করবে।"
      ]
    },
    {
      id: 5,
      title: "Interactive Stage: The Doctor's 5 Recovery Prescriptions",
      subtitle: "ইন্টারেক্টিভ সিমুলেশন: ডাক্তারের ৫টি পরামর্শ ও আরোগ্য চেকলিস্ট (Interactive Stage)",
      phase: "৪. প্রায়োগিক স্বাস্থ্যবিধি (Interactive Checklist)",
      duration: "৫ মিনিট",
      themeColor: "from-amber-600 to-rose-700",
      imageEmoji: "🎮 🩺 📋",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Enter our interactive clinic and patient care stage!",
          "Examine Sima's symptoms: Fever, cough, and sore throat.",
          "Click off all 5 items on the doctor's recovery checklist:",
          "1. Eat energy food  2. Rest at home  3. Drink water/juice  4. Use tissue  5. Separate utensils."
        ],
        banglaExplanation: "আমাদের ইন্টারেক্টিভ স্টেজে প্রবেশ করো! সীমার লক্ষণগুলো পর্যবেক্ষণ করো এবং দ্রুত আরোগ্য লাভের ৫টি ডাক্তারের পরামর্শের চেকলিস্ট পূরণ করো!"
      },
      teacherNotes: "শিক্ষার্থীদের স্টেজে প্রতিটি স্বাস্থ্যবিধির বোতাম ক্লিক করতে দিন এবং উচ্চারণ অনুশীলন করান।",
      quickTeachingSteps: [
        "ধাপ ১: সীমার লক্ষণগুলো স্টেজে প্রদর্শন করুন।",
        "ধাপ ২: ৫টি স্বাস্থ্যবিধি চেকলিস্ট পূরণ করান।",
        "ধাপ ৩: স্বাস্থ্যবিধিগুলো একসাথে আবৃত্তি করুন।"
      ]
    },
    {
      id: 6,
      title: "Infection Control: Stopping Germs",
      subtitle: "জীবাণু ছড়ানো রোধ: ব্যক্তিগত পাত্র ও হাত ধোয়ার বৈজ্ঞানিক নিয়ম (Infection Prevention)",
      phase: "৫. সংক্রমণ নিয়ন্ত্রণ ও সচেতনতা (Hygiene Science)",
      duration: "৪ মিনিট",
      themeColor: "from-teal-600 to-emerald-700",
      imageEmoji: "🧼 🛡️ 🦠",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "Why did the doctor say: 'Use your own plate, cup and glass'?",
          "1. GERMS SPREAD ON SURFACES: Viruses stay on cups, spoons, and glasses. Sharing spreads illness to family members.",
          "2. HAND TO FACE TRANSMISSION: Never sneeze into bare hands. If you touch door handles or books, others will get sick.",
          "3. 20-SECOND SOAP WASH: Lather soap all over hands, fingers, and nails before rinsing with clean water.",
          "4. RESTING PROTECTS CLASSMATES: Staying home stops the flu from spreading to school friends!"
        ],
        banglaExplanation: "ডাক্তার কেন নিজের আলাদা থালা-বাসন ব্যবহার করতে বললেন: ১. ভাইরাসের জীবাণু কাপ, গ্লাস ও চামচে লেগে থাকে; তাই ভাগ করে খেলে অন্যরাও আক্রান্ত হয়। ২. হাতে হাঁচি দিলে দরজার হাতল ও বইয়ে জীবাণু ছড়িয়ে পড়ে। ৩. সাবান দিয়ে ২০ সেকেন্ড হাত ধোয়ার নিয়ম মানতে হবে। ৪. ঘরে বিশ্রাম নিলে সহপাঠীদের মধ্যে রোগ ছড়ায় না!"
      },
      teacherNotes: "ক্লাসে শিক্ষার্থীদের বুঝিয়ে বলুন কীভাবে নিজের সামান্য সচেতনতা পুরো পরিবার ও স্কুলের সুরক্ষা নিশ্চিত করে।",
      quickTeachingSteps: [
        "ধাপ ১: জীবাণু ছড়ানোর মাধ্যমগুলো আলোচনা করুন।",
        "ধাপ ২: সাবান দিয়ে হাত ধোয়ার ৬টি ধাপ প্রদর্শন করুন।",
        "ধাপ ৩: শিক্ষার্থীরা পরিচ্ছন্নতার অঙ্গীকার করবে।"
      ]
    },
    {
      id: 7,
      title: "Interactive Review & Quick Quiz",
      subtitle: "দ্রুত যাচাই ও মূল্যায়ন: ডাক্তারের পরামর্শের প্রশ্নোত্তর (Quick Check)",
      phase: "৬. গঠনমূলক মূল্যায়ন (Rapid Quiz)",
      duration: "৪ মিনিট",
      themeColor: "from-rose-600 to-indigo-700",
      imageEmoji: "🎯 ⚡ 📝",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Answer these rapid quiz questions on Doctor's Advice for Sima:",
          "1. Why is Sima at home today? (She is ill with the flu)",
          "2. What should Sima eat even if she isn't hungry? (Food that gives energy)",
          "3. What drinks did the doctor recommend? (A lot of water or juice)",
          "4. What should Sima use when coughing or sneezing? (A tissue, not her hand)"
        ],
        banglaExplanation: "দ্রুত প্রশ্নের উত্তর দিয়ে পাঠের গুরুত্বপূর্ণ তথ্যগুলো পুনরাবৃত্তি করো!"
      },
      teacherNotes: "শিক্ষার্থীদের দ্রুত হাত তুলতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি প্রশ্ন ক্লাসে জিজ্ঞেস করুন।",
        "ধাপ ২: শিক্ষার্থীদের স্বতঃস্ফূর্ত উত্তরের প্রশংসা করুন।",
        "ধাপ ৩: সঠিক উত্তর বোর্ডের মাধ্যমে নিশ্চিত করুন।"
      ]
    },
    {
      id: 8,
      title: "Summary & 20-Mark Companion Worksheet",
      subtitle: "পাঠের সারসংক্ষেপ ও পূর্ণাঙ্গ ২০ নম্বরের মূল্যায়ন (Summary & Assessment)",
      phase: "৭. সারসংক্ষেপ ও মূল্যায়ন (Wrap-up)",
      duration: "৩ মিনিট",
      themeColor: "from-slate-800 to-rose-950",
      imageEmoji: "🏆 🌟 📝",
      sceneType: "summary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed the Doctor's Advice lesson.",
          "Key Takeaways:",
          "• Rest and eat energy foods to help your body heal.",
          "• Drink plenty of water and natural fruit juice.",
          "• Cover sneezes with tissue and wash hands to protect everyone.",
          "Now open and solve your 20-mark companion worksheet below!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা ডাক্তারের পরামর্শের পাঠ সফলভাবে সম্পন্ন করেছ। স্বাস্থ্যবিধি মেনে চলো, সুস্থ থাকো এবং ২০ নম্বরের সঙ্গী ওয়ার্কশিটটি সম্পন্ন করো!"
      },
      teacherNotes: "শিক্ষার্থীদের ২০ নম্বরের পূর্ণাঙ্গ সঙ্গী ওয়ার্কশিট সমাধান করতে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: ডাক্তারের ৫টি স্বাস্থ্যবিধি সংক্ষেপে পুনরাবৃত্তি করুন।",
        "ধাপ ২: ওয়ার্কশিট খুলুন।",
        "ধাপ ৩: শিক্ষার্থীদের স্বাবলম্বীভাবে পরীক্ষা শেষ করতে বলুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 5 English Evaluation — Doctor's Advice for Sima",
    classGrade: "Class 5 (৫ম শ্রেণি)",
    subject: "English for Today (Unit 8, Lesson 1)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "matching",
        title: "Section A: Column Matching (5 Marks)",
        instruction: "Column A-এর সাথে Column B-এর সঠিক অংশের অর্থপূর্ণ মিল করো:",
        content: [
          { a: "1. Sima is at home today", b: "a. because she has a fever." },
          { a: "2. She feels very warm", b: "b. because she has the flu." },
          { a: "3. Eat food that gives", c: "c. a tissue, not your bare hand." },
          { a: "4. When coughing, use", d: "d. your body energy and strength." },
          { a: "5. Wash your hands regularly", e: "e. and use your own plate and cup." }
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Clues (5 Marks)",
        instruction: "ক্লু বক্স থেকে উপযুক্ত শব্দ নিয়ে শূন্যস্থান পূরণ করো: [ energy, tissue, school, throat, hands ]",
        content: [
          "1. Sima didn't go to ____________ today because she is ill.",
          "2. She has a cough and a sore ____________.",
          "3. Eat food that gives your body ____________.",
          "4. Cover your mouth and nose with a ____________.",
          "5. Wash your ____________ regularly with soap."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে True এবং মিথ্যা হলে False লেখো:",
        content: [
          "1. Sima went to school today. ( __________ )",
          "2. Sima has a fever and the flu. ( __________ )",
          "3. The doctor advised Sima to drink a lot of soft drinks. ( __________ )",
          "4. You should sneeze into your bare hand. ( __________ )",
          "5. Using your own cup and glass prevents spreading illness. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. What are Sima's symptoms of illness?\n   Answer: ________________________________________________________________",
          "2. What did the doctor advise Sima to drink?\n   Answer: ________________________________________________________________",
          "3. Why should Sima use her own plate, cup, and glass?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};


// =========================================================================
// CLASS 5: UNIT 9 - OCCUPATIONS: RAJU THE FIREFIGHTER (pp. 34–37)
// =========================================================================
export const RAJU_OCCUPATIONS_C5_SLIDE_DECK: SlideDeck = {
  id: "raju-occupations-c5",
  grade: "Class 5 (৫ম শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 9: Occupations",
  lesson: "Lesson 1: Occupations - Raju the Firefighter",
  topic: "Occupations: Raju the Firefighter, Volunteering, Training & Safety (pp. 34–37)",
  category: "english",
  thumbnailEmoji: "👨‍🚒 🚒 🎓",
  totalSlides: 8,
  slides: [
    {
      id: 1,
      title: "Occupations: Raju the Firefighter",
      subtitle: "পেশা, নিঃস্বার্থ সমাজসেবা ও অগ্নিনিরাপত্তা সচেতনতা (Orientation & Noble Careers)",
      phase: "১. প্রাক-পাঠ ও পরিচিতি (Warm-up)",
      duration: "৩ মিনিট",
      themeColor: "from-red-600 to-amber-700",
      imageEmoji: "👨‍🚒 🚒 🏫",
      sceneType: "welcome",
      hasVisualStage: true,
      content: {
        englishText: [
          "Hello future leaders! Welcome to Class 5 English.",
          "Today we will explore different occupations and meet Raju the Firefighter once again.",
          "In Class 5, we learn not only how Raju puts out fires, but also how he trains new firefighters and visits schools.",
          "Let's discover the beauty of volunteering and how helping others enriches our lives!"
        ],
        banglaExplanation: "স্বাগতম প্রিয় শিক্ষার্থীরা! আজ আমরা বিভিন্ন পেশা নিয়ে আলোচনা করব এবং সাহসী ফায়ার ফাইটার রাজুর কর্মজীবনের বিস্তৃত দিকগুলো জানব। ৫ম শ্রেণিতে আমরা দেখব কীভাবে রাজু শুধু আগুনই নেভায় না, বরং নতুন দমকল কর্মীদের প্রশিক্ষণ দেয় এবং নিজের অবসর সময়ে বিভিন্ন বিদ্যালয়ে গিয়ে শিক্ষার্থীদের অগ্নিনিরাপত্তা শেখায়!"
      },
      teacherNotes: "শিক্ষার্থীদের কাছে জানতে চান: তারা বড় হয়ে কোন পেশা বেছে নিতে চায়? সমাজসেবামূলক কাজ করতে কার ভালো লাগে?",
      quickTeachingSteps: [
        "ধাপ ১: বিভিন্ন পেশা (Occupations) নিয়ে সংক্ষিপ্ত আলোচনা করুন।",
        "ধাপ ২: পারিশ্রমিক ছাড়া কাজ করার 'স্বেচ্ছাসেবা' (Volunteering) ধারণা দিন।",
        "ধাপ ৩: মূল পাঠের সাথে শিক্ষার্থীদের যুক্ত করুন।"
      ]
    },
    {
      id: 2,
      title: "Reading & Listening: Fire in Class 5 & Calmness",
      subtitle: "পাঠ্যাংশ পাঠ: বিদ্যালয়ে অগ্নিকাণ্ড ও শান্তভাবে প্রস্থান (NCTB Text Part 1)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-amber-600 to-red-600",
      imageEmoji: "📖 🔥 🏫",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "A long time ago, when Raju was in Class 5, there was a fire in his school.",
          "Everyone was very afraid, but no one panicked.",
          "The teachers helped the students to leave the building quietly and safely.",
          "Soon the firefighters came and put out the fire.",
          "Raju watched the firefighters from the school yard. He thought about the fire and the firefighters for a long time."
        ],
        banglaExplanation: "অনেক দিন আগে, রাজু যখন পঞ্চম শ্রেণিতে পড়ত, তখন তার বিদ্যালয়ে আগুন লেগেছিল। সবাই খুব ভয় পেয়েছিল, কিন্তু কেউ আতঙ্কিত হয়নি। শিক্ষকেরা শিক্ষার্থীদের শান্তভাবে ও নিরাপদে ভবন থেকে বের হতে সাহায্য করেছিলেন। শীঘ্রই দমকল কর্মীরা এলেন এবং আগুন নিভিয়ে দিলেন। রাজু স্কুল প্রাঙ্গণ থেকে দমকল কর্মীদের দেখেছিলেন। তিনি দীর্ঘ সময় সেই আগুন ও দমকল কর্মীদের কথা চিন্তা করেছিলেন।"
      },
      teacherNotes: "শিক্ষার্থীদের 'leave the building quietly and safely' নীতিটি জীবনের যেকোনো জরুরি মুহূর্তে অনুশীলনের আহ্বান জানান।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক সঠিক উচ্চারণে অনুচ্ছেদটি পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে প্রতিটি লাইন পড়বে।",
        "ধাপ ৩: শান্ত থাকার সুফল আলোচনা করুন।"
      ]
    },
    {
      id: 3,
      title: "Reading & Listening: Volunteer, Job & School Visits",
      subtitle: "পাঠ্যাংশ পাঠ: স্বেচ্ছাসেবা থেকে প্রশিক্ষক ও বিদ্যালয় পরিদর্শন (NCTB Text Part 2)",
      phase: "২. অনুচ্ছেদ পাঠ ও অনুধাবন (Reading Comprehension)",
      duration: "৫ মিনিট",
      themeColor: "from-red-600 to-purple-700",
      imageEmoji: "🤝 👨‍🏫 👦",
      sceneType: "reading",
      hasVisualStage: true,
      content: {
        englishText: [
          "After college, Raju joined a volunteer fire department. As a volunteer, he didn't get any money for his work. But Raju didn't mind.",
          "Now Raju is a full-time firefighter. It is his job, so he earns money for it.",
          "Most of the time his work is putting out fires, but he also teaches new firefighters about safety. He likes teaching very much.",
          "In his free time, Raju visits schools. He talks to students about fire safety. He tells them what to do if there is a fire. They shouldn't panic. They should listen to their teachers and leave the building quietly."
        ],
        banglaExplanation: "কলেজ শেষ করার পর রাজু একটি স্বেচ্ছাসেবী ফায়ার সার্ভিসে যোগ দেন। একজন স্বেচ্ছাসেবক হিসেবে তিনি তাঁর কাজের জন্য কোনো পারিশ্রমিক পেতেন না। কিন্তু রাজু এতে কিছু মনে করেননি। এখন রাজু একজন পূর্ণকালীন অগ্নিনির্বাপক কর্মী। এটি তাঁর চাকরি, তাই তিনি এর জন্য বেতন পান। তাঁর কাজের বেশিরভাগ সময়ই আগুন নেভাতে কাটে, তবে তিনি নতুন অগ্নিনির্বাপক কর্মীদেরও নিরাপত্তা সম্পর্কে প্রশিক্ষণ দেন। তিনি শেখাতে খুব পছন্দ করেন। অবসর সময়ে রাজু বিভিন্ন বিদ্যালয়ে যান। তিনি শিক্ষার্থীদের সাথে অগ্নিনিরাপত্তা নিয়ে কথা বলেন। কোথাও আগুন লাগলে কী করতে হবে তা তিনি তাদের শেখান। তাদের আতঙ্কিত হওয়া উচিত নয়। তাদের শিক্ষকদের নির্দেশ শোনা উচিত এবং শান্তভাবে ভবন থেকে বের হয়ে যাওয়া উচিত।"
      },
      teacherNotes: "'Raju didn't mind' (রাজু কিছু মনে করেননি) বাক্যটি দিয়ে নিঃস্বার্থ মানসিকতা আলোচনা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: রাজুর সমাজসেবামূলক কাজের তালিকা তৈরি করুন।",
        "ধাপ ২: শিক্ষার্থীদের রাজুর ৩টি পরামর্শ পুনরাবৃত্তি করান।",
        "ধাপ ৩: নতুন কর্মীদের প্রশিক্ষণ দেওয়ার গুরুত্ব বোঝান।"
      ]
    },
    {
      id: 4,
      title: "Vocabulary Workshop: Occupations & Values",
      subtitle: "শব্দসম্ভার: পেশা, প্রশিক্ষণ ও নৈতিক গুণাবলি বিষয়ক শব্দ (Key Vocabulary)",
      phase: "৩. শব্দভাণ্ডার ও উচ্চারণ (Vocabulary)",
      duration: "৭ মিনিট",
      themeColor: "from-amber-600 to-red-600",
      imageEmoji: "💡 📚 🔤",
      sceneType: "vocabulary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Master key vocabulary words from Raju's occupations story:"
        ],
        banglaExplanation: "পেশা ও সচেতনতা বিষয়ক গুরুত্বপূর্ণ ইংরেজি শব্দগুলোর সঠিক উচ্চারণ ও অর্থ শিখে নিই:",
        vocabulary: [
          {
            word: "Occupation",
            syllables: ["Oc", "cu", "pa", "tion"],
            phonetic: "/ˌɒk.jəˈpeɪ.ʃən/",
            meaning: "পেশা / জীবিকা / বৃত্তি",
            partOfSpeech: "Noun",
            example: "Firefighting is a heroic occupation.",
            icon: "💼"
          },
          {
            word: "Volunteer",
            syllables: ["Vol", "un", "teer"],
            phonetic: "/ˌvɒl.ənˈtɪər/",
            meaning: "স্বেচ্ছাসেবক (বিনাবেতনে যে কাজ করে)",
            partOfSpeech: "Noun / Adjective",
            example: "He worked as a volunteer firefighter.",
            icon: "🤝"
          },
          {
            word: "Full-time",
            syllables: ["Full", "time"],
            phonetic: "/ˌfʊlˈtaɪm/",
            meaning: "পূর্ণকালীন (নিয়মিত বেতনভুক্ত স্থায়ী চাকরি)",
            partOfSpeech: "Adjective",
            example: "Now Raju is a full-time firefighter.",
            icon: "⏱️"
          },
          {
            word: "Panicked",
            syllables: ["Pan", "icked"],
            phonetic: "/ˈpæn.ɪkt/",
            meaning: "আতঙ্কিত হয়েছিল / ভয়ে দিশেহারা হয়েছিল",
            partOfSpeech: "Verb (Past)",
            example: "Everyone was afraid, but no one panicked.",
            icon: "😱"
          },
          {
            word: "Didn't Mind",
            syllables: ["Did", "n't", "Mind"],
            phonetic: "/ˈdɪd.ənt maɪnd/",
            meaning: "কিছু মনে করেনি / সানন্দে মেনে নিয়েছে",
            partOfSpeech: "Phrase",
            example: "He didn't get money, but he didn't mind.",
            icon: "😊"
          }
        ]
      },
      teacherNotes: "'Occupation' এবং 'Volunteer' শব্দের সঠিক সিলেবল বিভাজন ও উচ্চারণ বারবার অনুশীলন করান।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষক প্রতিটি শব্দ স্পষ্ট উচ্চারণে পাঠ করবেন।",
        "ধাপ ২: শিক্ষার্থীরা সমস্বরে প্রতিটি শব্দের উচ্চারণ করবে।",
        "ধাপ ৩: প্রতিটি শব্দ দিয়ে নতুন বাক্য গঠন করান।"
      ]
    },
    {
      id: 5,
      title: "Interactive Stage: Career Steps & School Drill",
      subtitle: "ইন্টারেক্টিভ সিমুলেশন: রাজুর কর্মজীবন ও বিদ্যালয়ের অগ্নিনিরাপত্তা মহড়া (Interactive Stage)",
      phase: "৪. প্রায়োগিক মহড়া (Interactive Drill)",
      duration: "৫ মিনিট",
      themeColor: "from-red-600 to-amber-700",
      imageEmoji: "🎮 👨‍🚒 🏫",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Enter our interactive career and school drill stage!",
          "Trace Raju's 4 career steps: Class 5 fire -> Volunteer -> Full-time firefighter -> Safety trainer.",
          "Run the interactive school fire safety drill: Observe students listening to teachers and evacuating quietly.",
          "Explore the noble dignity of community occupations."
        ],
        banglaExplanation: "আমাদের ইন্টারেক্টিভ স্টেজে রাজুর কর্মজীবনের ৪টি ধাপ পর্যবেক্ষণ করো এবং বিদ্যালয়ের অগ্নিনিরাপত্তা মহড়ায় অংশ নিয়ে শান্তভাবে নিরাপদে বের হওয়ার নিয়মগুলো শেখো!"
      },
      teacherNotes: "শিক্ষার্থীদের স্টেজে মহড়া চালানোর বোতাম চাপতে দিন এবং জরুরি মুহূর্তে শান্ত থাকার নিয়ম ড্রিল করান।",
      quickTeachingSteps: [
        "ধাপ ১: রাজুর কর্মজীবনের ৪টি ধাপ উপস্থাপন করুন।",
        "ধাপ ২: বিদ্যালয়ের অগ্নিনিরাপত্তা মহড়া পরিচালনা করুন।",
        "ধাপ ৩: শান্তভাবে বের হওয়ার মহড়া ক্লাসরুমে সম্পন্ন করুন।"
      ]
    },
    {
      id: 6,
      title: "Values: The Spirit of Volunteering",
      subtitle: "স্বেচ্ছাসেবকতার মহৎ চেতনা ও সমাজসেবার আনন্দ (Spirit of Service)",
      phase: "৫. নৈতিক মূল্যবোধ ও সমাজসেবা (Social Values)",
      duration: "৪ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "💖 🤝 🌟",
      sceneType: "practice",
      hasVisualStage: true,
      content: {
        englishText: [
          "What makes a true community hero?",
          "1. VOLUNTEERING ADDS MEANING: Working to help others without expecting money shows great character.",
          "2. SHARING KNOWLEDGE: Using your free time to visit schools and teach children saves future lives.",
          "3. BRAVERY AND CALM: Courage isn't the absence of fear, but staying calm and doing your duty.",
          "4. RESPECT ALL OCCUPATIONS: Teachers, firefighters, doctors, and farmers all build our nation together!"
        ],
        banglaExplanation: "প্রকৃত নায়কের পরিচয়: ১. বিনা পারিশ্রমিকে মানুষের পাশে দাঁড়ানোর মানসিকতাই প্রকৃত মহত্ত্ব। ২. নিজের অর্জিত জ্ঞান শিক্ষার্থীদের মাঝে ছড়িয়ে দেওয়া জীবন রক্ষার সমান। ৩. বিপদের মুখে ভয় না পেয়ে শান্ত থেকে দায়িত্ব পালন করাই আসল সাহস। ৪. প্রতিটি সৎ পেশাকে সমান সম্মান জানানো সুনাগরিকের গুণ!"
      },
      teacherNotes: "শিক্ষার্থীদের বিদ্যালয়ে ও পাড়ায় বিভিন্ন সামাজিক কাজের উদাহরণ দিতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: সমাজের সেবামূলক পেশাগুলোর অবদান আলোচনা করুন।",
        "ধাপ ২: শিক্ষার্থীরা নিজেদের সমাজসেবামূলক লক্ষ্য শেয়ার করবে।",
        "ধাপ ৩: সমস্বরে সমাজসেবার অঙ্গীকার করুন।"
      ]
    },
    {
      id: 7,
      title: "Interactive Review & Quick Quiz",
      subtitle: "দ্রুত যাচাই ও মূল্যায়ন: রাজুর পেশা ও সমাজসেবার প্রশ্নোত্তর (Quick Check)",
      phase: "৬. গঠনমূলক মূল্যায়ন (Rapid Quiz)",
      duration: "৪ মিনিট",
      themeColor: "from-amber-600 to-red-700",
      imageEmoji: "🎯 ⚡ 📝",
      sceneType: "activity",
      hasVisualStage: true,
      content: {
        englishText: [
          "Answer these rapid quiz questions on Raju the Firefighter (Class 5):",
          "1. What did Raju join right after finishing college? (A volunteer fire department)",
          "2. Did Raju get paid as a volunteer? (No, but he didn't mind)",
          "3. What extra task does Raju do in his full-time job? (He teaches new firefighters about safety)",
          "4. What does Raju do in his free time? (He visits schools and talks to students about fire safety)"
        ],
        banglaExplanation: "দ্রুত প্রশ্নের উত্তর দাও এবং রাজুর কর্মজীবনের গুরুত্বপূর্ণ তথ্যগুলো ঝালিয়ে নাও!"
      },
      teacherNotes: "শিক্ষার্থীদের দ্রুত হাত তুলতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি প্রশ্ন ক্লাসে জিজ্ঞেস করুন।",
        "ধাপ ২: শিক্ষার্থীদের স্বতঃস্ফূর্ত উত্তরের প্রশংসা করুন।",
        "ধাপ ৩: সঠিক উত্তর বোর্ডের মাধ্যমে নিশ্চিত করুন।"
      ]
    },
    {
      id: 8,
      title: "Summary & 20-Mark Companion Worksheet",
      subtitle: "পাঠের সারসংক্ষেপ ও পূর্ণাঙ্গ ২০ নম্বরের মূল্যায়ন (Summary & Assessment)",
      phase: "৭. সারসংক্ষেপ ও মূল্যায়ন (Wrap-up)",
      duration: "৩ মিনিট",
      themeColor: "from-slate-800 to-red-950",
      imageEmoji: "🏆 🌟 📝",
      sceneType: "summary",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed Unit 9 Occupations: Raju the Firefighter.",
          "Key Takeaways:",
          "• Raju worked as a volunteer first, showing selfless community spirit.",
          "• Now as a full-time firefighter, he puts out fires and trains new recruits.",
          "• In free time, he educates students to stay calm and follow safety rules.",
          "Now open and solve your 20-mark companion worksheet below!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা ৫ম শ্রেণির অকুপেশনস ইউনিটের রাজু দ্য ফায়ার ফাইটার পাঠ সফলভাবে শেষ করেছ। সমাজসেবায় অংশ নাও এবং ২০ নম্বরের সঙ্গী ওয়ার্কশিটটি সম্পন্ন করো!"
      },
      teacherNotes: "শিক্ষার্থীদের ২০ নম্বরের পূর্ণাঙ্গ সঙ্গী ওয়ার্কশিট সমাধান করতে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: পাঠের মূল শিক্ষা সংক্ষেপে পুনরাবৃত্তি করুন।",
        "ধাপ ২: ওয়ার্কশিট খুলুন।",
        "ধাপ ৩: শিক্ষার্থীদের স্বাবলম্বীভাবে পরীক্ষা শেষ করতে বলুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 5 English Evaluation — Occupations: Raju the Firefighter",
    classGrade: "Class 5 (৫ম শ্রেণি)",
    subject: "English for Today (Unit 9, Lesson 1)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "matching",
        title: "Section A: Column Matching (5 Marks)",
        instruction: "Column A-এর সাথে Column B-এর সঠিক অংশের অর্থপূর্ণ মিল করো:",
        content: [
          { a: "1. When Raju was in Class 5", b: "a. a volunteer fire department." },
          { a: "2. The brave teachers helped", b: "b. there was a fire in his school." },
          { a: "3. After college, Raju joined", c: "c. new firefighters about safety." },
          { a: "4. Besides fighting fires, he teaches", d: "d. students leave quietly and safely." },
          { a: "5. In his free time, Raju visits", e: "e. schools to teach students fire safety." }
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Clues (5 Marks)",
        instruction: "ক্লু বক্স থেকে উপযুক্ত শব্দ নিয়ে শূন্যস্থান পূরণ করো: [ volunteer, panic, money, full-time, quietly ]",
        content: [
          "1. Everyone was afraid, but no one ____________.",
          "2. Students left the building ____________ and safely.",
          "3. As a volunteer, Raju didn't get any ____________ for his work.",
          "4. Now Raju is a ____________ firefighter.",
          "5. Students shouldn't ____________ if there is a fire."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে True এবং মিথ্যা হলে False লেখো:",
        content: [
          "1. Raju was in Class 4 when the school fire occurred. ( __________ )",
          "2. As a volunteer, Raju earned a very high salary. ( __________ )",
          "3. Raju hates teaching new firefighters. ( __________ )",
          "4. Raju visits schools during his free time. ( __________ )",
          "5. Students should listen to teachers during emergencies. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. What did Raju do as a volunteer firefighter?\n   Answer: ________________________________________________________________",
          "2. What does Raju do in his full-time job besides putting out fires?\n   Answer: ________________________________________________________________",
          "3. What advice does Raju give to students about fire safety?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// CLASS 5 - UNIT 10 - LESSON 1: MY HOME DISTRICT - KISHOREGANJ
// =========================================================================
export const KISHOREGANJ_DISTRICT_SLIDE_DECK: SlideDeck = {
  id: "kishoreganj-district",
  grade: "Class 5 (৫ম শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 10: My Home District",
  lesson: "Lesson 1: My Home District - Kishoreganj",
  topic: "My Home District: Kishoreganj, Landmarks & Great Personalities (pp. 38–42)",
  category: "english",
  thumbnailEmoji: "🕌 🏛️ 🎨",
  totalSlides: 7,
  slides: [
    {
      id: 1,
      title: "Introduction: Kishoreganj District & Location",
      subtitle: "কিশোরগঞ্জ জেলার ভৌগোলিক অবস্থান ও নামকরণের পটভূমি (Activity A)",
      phase: "১. সূচনা ও ভৌগোলিক পরিচিতি (Introduction)",
      duration: "৪ মিনিট",
      themeColor: "from-teal-600 to-cyan-700",
      imageEmoji: "🗺️ 🚗 📍",
      sceneType: "cultural",
      hasVisualStage: true,
      content: {
        englishText: [
          "My home district is Kishoreganj.",
          "It is about 145 kilometres from Dhaka.",
          "It is an administrative district.",
          "The name Kishoreganj comes from the name of an old landlord known as Brojosundor Roy or Brojokishore Roy."
        ],
        banglaExplanation: "আমার নিজের জেলা কিশোরগঞ্জ। এটি ঢাকা থেকে প্রায় ১৪৫ কিলোমিটার দূরে অবস্থিত। এটি একটি প্রশাসনিক জেলা। একজন প্রাচীন জমিদার ব্রজসুন্দর রায় বা ব্রজকিশোর রায়ের নাম থেকে কিশোরগঞ্জ নামটির উৎপত্তি হয়েছে।",
        vocabulary: [
          {
            word: "district",
            syllables: ["dis", "trict"],
            phonetic: "/ˈdɪs.trɪkt/",
            meaning: "জেলা / প্রশাসনিক এলাকা",
            partOfSpeech: "Noun",
            example: "My home district is Kishoreganj.",
            icon: "🗺️"
          },
          {
            word: "administrative",
            syllables: ["ad", "min", "is", "tra", "tive"],
            phonetic: "/ədˈmɪn.ə.strə.tɪv/",
            meaning: "প্রশাসনিক",
            partOfSpeech: "Adjective",
            example: "Kishoreganj is an administrative district.",
            icon: "🏛️"
          },
          {
            word: "landlord",
            syllables: ["land", "lord"],
            phonetic: "/ˈlænd.lɔːd/",
            meaning: "জমিদার / ভূম্যধিকারী",
            partOfSpeech: "Noun",
            example: "Brojokishore Roy was a famous landlord.",
            icon: "👑"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের মানচিত্রে ঢাকা থেকে কিশোরগঞ্জের অবস্থান ও দূরত্ব দেখান। জেলার নামকরণের ইতিহাস বুঝিয়ে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষার্থীদের তাদের নিজ জেলা সম্পর্কে জিজ্ঞাসা করুন।",
        "ধাপ ২: ঢাকা থেকে কিশোরগঞ্জের দূরত্ব ও দিক মানচিত্রে দেখান।",
        "ধাপ ৩: landlord এবং administrative শব্দের উচ্চারণ অনুশীলন করান।"
      ]
    },
    {
      id: 2,
      title: "District Profile: Numbers & Administrative Units",
      subtitle: "জেলার প্রশাসনিক পরিসংখ্যান: পৌরসভা, উপজেলা, ইউনিয়ন ও গ্রাম",
      phase: "২. পরিসংখ্যান ও তথ্য বিশ্লেষণ (Data & Facts)",
      duration: "৫ মিনিট",
      themeColor: "from-cyan-600 to-blue-700",
      imageEmoji: "📊 🏢 🌾",
      sceneType: "comprehension",
      hasVisualStage: true,
      content: {
        englishText: [
          "The district has 8 municipalities, 13 upazilas, 108 unions and 1745 villages.",
          "The area of Kishoreganj municipality is about 10 square kilometres.",
          "The river Narasunda flows through the town.",
          "Kishoreganj is a small town, but there are many important places in and around it."
        ],
        banglaExplanation: "এই জেলায় ৮টি পৌরসভা, ১৩টি উপজেলা, ১০৮টি ইউনিয়ন এবং ১৭৪৫টি গ্রাম রয়েছে। কিশোরগঞ্জ পৌরসভার আয়তন প্রায় ১০ বর্গ কিলোমিটার। নরসুন্দা নদী শহরের বুক চিরে বয়ে গেছে। কিশোরগঞ্জ একটি ছোট শহর হলেও এর ভেতরে ও আশেপাশে অনেক গুরুত্বপূর্ণ স্থান রয়েছে।",
        vocabulary: [
          {
            word: "municipality",
            syllables: ["mu", "nic", "i", "pal", "i", "ty"],
            phonetic: "/mjuːˌnɪs.əˈpæl.ə.ti/",
            meaning: "পৌরসভা / শহর কর্তৃপক্ষ",
            partOfSpeech: "Noun",
            example: "The district has 8 municipalities.",
            icon: "🏢"
          },
          {
            word: "flows",
            syllables: ["flows"],
            phonetic: "/floʊz/",
            meaning: "প্রবাহিত হয়",
            partOfSpeech: "Verb",
            example: "The river Narasunda flows through the town.",
            icon: "🌊"
          },
          {
            word: "important",
            syllables: ["im", "por", "tant"],
            phonetic: "/ɪmˈpɔː.tənt/",
            meaning: "গুরুত্বপূর্ণ",
            partOfSpeech: "Adjective",
            example: "There are many important places in Kishoreganj.",
            icon: "⭐"
          }
        ]
      },
      teacherNotes: "সংখ্যাবাচক তথ্যগুলো (৮, ১৩, ১০৮, ১৭৪৫, ১০ বর্গ কিমি) শিক্ষার্থীদের খাতায় ছক আকারে লিখতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজের স্ট্যাটস গ্রিড দেখান।",
        "ধাপ ২: দ্রুত প্রশ্নোত্তরের মাধ্যমে সংখ্যাগুলো যাচাই করুন।",
        "ধাপ ৩: নরসুন্দা নদীর অবস্থান ব্যাখ্যা করুন।"
      ]
    },
    {
      id: 3,
      title: "Reading Aloud: The Beautiful River Narasunda",
      subtitle: "সরব পাঠ: শহরের প্রাণপ্রবাহ নরসুন্দা নদী",
      phase: "৩. নিবিড় পাঠ ও উচ্চারণ (Read Aloud)",
      duration: "৫ মিনিট",
      themeColor: "from-sky-600 to-teal-700",
      imageEmoji: "⛵ 🌊 🏙️",
      sceneType: "cultural",
      hasVisualStage: true,
      content: {
        englishText: [
          "Let us read together about the heart of Kishoreganj:",
          "The river Narasunda flows gently through Kishoreganj town.",
          "In the past, traders and merchants travelled along this scenic river.",
          "Today, the peaceful riverfront is a beloved attraction for all visitors."
        ],
        banglaExplanation: "এসো আমরা একসাথে কিশোরগঞ্জের প্রাণপ্রবাহ সম্পর্কে পড়ি: নরসুন্দা নদী কিশোরগঞ্জ শহরের বুক চিরে শান্তভাবে বয়ে গেছে। অতীতে সওদাগর ও ব্যবসায়ীরা এই মনোরম নদীর পথ দিয়ে যাতায়াত করতেন। আজ এই শান্ত নদীর তীর সকল দর্শনার্থীদের জন্য এক প্রিয় আকর্ষণ।"
      },
      teacherNotes: "শিক্ষার্থীদের নরসুন্দা নদীর সৌন্দর্য ও শহরের পরিবেশ নিয়ে কথা বলতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি বাক্য শিক্ষক প্রথমে পড়বেন, পরে শিক্ষার্থীরা সমস্বরে পড়বে।",
        "ধাপ ২: নদীর তীরবর্তী জীবন ও বাণিজ্য নিয়ে আলোচনা করুন।",
        "ধাপ ৩: 'flows through the town' বাক্যটি বোর্ডে অনুশীলন করান।"
      ]
    },
    {
      id: 4,
      title: "Famous Landmarks: Solakia Eid Ground & Pagla Mosque",
      subtitle: "বিখ্যাত ঐতিহাসিক স্থান: শোলাকিয়া ঈদগাহ ময়দান ও পাগলা মসজিদ",
      phase: "৪. দর্শনীয় স্থান পরিচিতি (Landmarks)",
      duration: "৬ মিনিট",
      themeColor: "from-emerald-600 to-teal-800",
      imageEmoji: "🕌 🪙 ✨",
      sceneType: "cultural",
      hasVisualStage: true,
      content: {
        englishText: [
          "The largest Eid fairgrounds, called Solakia Eid Ground, and the well-known Pagla Mosque are in this district.",
          "Outside the town, you can visit the fort of Isah Khan at Jangalbari.",
          "You can also see the Shah Muhammad Mosque at Egaroshindhur."
        ],
        banglaExplanation: "বাংলাদেশের বৃহত্তম ঈদের মাঠ, যার নাম শোলাকিয়া ঈদগাহ ময়দান, এবং সুপরিচিত পাগলা মসজিদ এই জেলায় অবস্থিত। শহরের বাইরে তোমরা জঙ্গলবাড়িতে ঈশা খাঁর দুর্গ ঘুরে দেখতে পারো। এছাড়া এগারসিন্দুরে শাহ মুহাম্মদ মসজিদও দর্শন করতে পারো।",
        vocabulary: [
          {
            word: "fairgrounds",
            syllables: ["fair", "grounds"],
            phonetic: "/ˈfeə.ɡraʊndz/",
            meaning: "মেলার মাঠ / ময়দান",
            partOfSpeech: "Noun",
            example: "Solakia is the largest Eid fairgrounds in the country.",
            icon: "🕌"
          },
          {
            word: "fort",
            syllables: ["fort"],
            phonetic: "/fɔːt/",
            meaning: "দুর্গ / কেল্লা",
            partOfSpeech: "Noun",
            example: "You can visit the fort of Isah Khan at Jangalbari.",
            icon: "🏰"
          },
          {
            word: "well-known",
            syllables: ["well", "known"],
            phonetic: "/ˌwel ˈnəʊn/",
            meaning: "সুপরিচিত / সুবিখ্যাত",
            partOfSpeech: "Adjective",
            example: "Pagla Mosque is a well-known historic site.",
            icon: "✨"
          }
        ]
      },
      teacherNotes: "শোলাকিয়া ঈদগাহের বিশালতা এবং জঙ্গলবাড়িতে বারো ভূঁইয়ার প্রধান ঈশা খাঁর ইতিহাস শিক্ষার্থীদের সংক্ষেপে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে শোলাকিয়া ঈদগাহ ও পাগলা মসজিদের তথ্য কার্ড দেখান।",
        "ধাপ ২: এগারসিন্দুর ও জঙ্গলবাড়ির ঐতিহাসিক গুরুত্ব আলোচনা করুন।",
        "ধাপ ৩: নতুন শব্দগুলোর অর্থ ও বানান যাচাই করুন।"
      ]
    },
    {
      id: 5,
      title: "Great Personalities: Literary Legends of Kishoreganj",
      subtitle: "সাহিত্য ও চিত্রকলার বরেণ্য মনীষী: চন্দ্রাবতী, সুকুমার রায় ও জয়নুল আবেদিন",
      phase: "৫. মনীষী পরিচিতি (Great Personalities)",
      duration: "৬ মিনিট",
      themeColor: "from-amber-600 to-orange-700",
      imageEmoji: "🪶 📚 🎨",
      sceneType: "comprehension",
      hasVisualStage: true,
      content: {
        englishText: [
          "Kishoreganj is also the birthplace of some famous people.",
          "Chandrabati, the first woman poet of Bangla literature, was born here.",
          "Two writers of children's literature, Upendrakishore Roy Chowdhury and Sukumar Ray, were also from here.",
          "The great painter Zainul Abedin comes from Kishoreganj, too."
        ],
        banglaExplanation: "কিশোরগঞ্জ কিছু বিখ্যাত মানুষেরও জন্মস্থান। বাংলা সাহিত্যের প্রথম মহিলা কবি চন্দ্রাবতী এখানে জন্মগ্রহণ করেছিলেন। শিশুসাহিত্যের দুই অমর লেখক উপেন্দ্রকিশোর রায়চৌধুরী এবং সুকুমার রায়ও এই জেলার ছিলেন। মহান চিত্রশিল্পী জয়নুল আবেদিনও কিশোরগঞ্জের কৃতী সন্তান।",
        vocabulary: [
          {
            word: "birthplace",
            syllables: ["birth", "place"],
            phonetic: "/ˈbɜːθ.pleɪs/",
            meaning: "জন্মস্থান",
            partOfSpeech: "Noun",
            example: "Kishoreganj is the birthplace of famous legends.",
            icon: "🏡"
          },
          {
            word: "literature",
            syllables: ["lit", "er", "a", "ture"],
            phonetic: "/ˈlɪt.rə.tʃər/",
            meaning: "সাহিত্য",
            partOfSpeech: "Noun",
            example: "Chandrabati was the first woman poet of Bangla literature.",
            icon: "📚"
          },
          {
            word: "painter",
            syllables: ["paint", "er"],
            phonetic: "/ˈpeɪn.tər/",
            meaning: "চিত্রশিল্পী",
            partOfSpeech: "Noun",
            example: "Zainul Abedin is a world-famous painter.",
            icon: "🎨"
          }
        ]
      },
      teacherNotes: "চন্দ্রাবতীর রামায়ণ, সুকুমার রায়ের আবোল-তাবোল এবং জয়নুল আবেদিনের দুর্ভিক্ষ চিত্রমালার কথা শিক্ষার্থীদের গর্বের সাথে জানান।",
      quickTeachingSteps: [
        "ধাপ ১: প্রতিটি মনীষীর নাম ও কাজের ছবি ও বিবরণ প্রদর্শন করুন।",
        "ধাপ ২: 'first woman poet of Bangla literature' বাক্যটি মুখস্থ উচ্চারণ করান।",
        "ধাপ ৩: শিক্ষার্থীদের পছন্দের একজন মনীষী সম্পর্কে বলতে বলুন।"
      ]
    },
    {
      id: 6,
      title: "Hero of Independence: Syed Nazrul Islam & Civic Pride",
      subtitle: "স্বাধীনতার মহানায়ক সৈয়দ নজরুল ইসলাম ও নিজ জেলার প্রতি ভালোবাসা",
      phase: "৬. মুক্তিযুদ্ধ ও জাতীয় গৌরব (National Pride)",
      duration: "৫ মিনিট",
      themeColor: "from-rose-600 to-red-700",
      imageEmoji: "🎖️ 🇧🇩 ❤️",
      sceneType: "cultural",
      hasVisualStage: true,
      content: {
        englishText: [
          "Syed Nazrul Islam, the first acting President of Bangladesh, is also from here.",
          "He courageously led the nation during the 1971 Liberation War.",
          "Kishoreganj has enriched Bangladesh with literature, arts, and freedom.",
          "I love my home district!"
        ],
        banglaExplanation: "বাংলাদেশের প্রথম অস্থায়ী রাষ্ট্রপতি সৈয়দ নজরুল ইসলামও এই জেলার মানুষ ছিলেন। তিনি ১৯৭১ সালের মুক্তিযুদ্ধে বীরত্বের সাথে দেশকে নেতৃত্ব দিয়েছিলেন। কিশোরগঞ্জ সাহিত্য, শিল্প ও স্বাধীনতায় বাংলাদেশকে সমৃদ্ধ করেছে। আমি আমার নিজের জেলাকে অনেক ভালোবাসি!",
        vocabulary: [
          {
            word: "president",
            syllables: ["pres", "i", "dent"],
            phonetic: "/ˈprez.ɪ.dənt/",
            meaning: "রাষ্ট্রপতি",
            partOfSpeech: "Noun",
            example: "Syed Nazrul Islam was the first acting President.",
            icon: "🎖️"
          },
          {
            word: "courageously",
            syllables: ["cour", "a", "geous", "ly"],
            phonetic: "/kəˈreɪ.dʒəs.li/",
            meaning: "সাহসিকতার সাথে",
            partOfSpeech: "Adverb",
            example: "He courageously led the nation.",
            icon: "🦁"
          }
        ]
      },
      teacherNotes: "মুজিবনগর সরকারের অস্থায়ী রাষ্ট্রপতি সৈয়দ নজরুল ইসলামের ভূমিকা ব্যাখ্যা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: মুক্তিযুদ্ধে সৈয়দ নজরুল ইসলামের অবদান সংক্ষেপে বলুন।",
        "ধাপ ২: 'I love my home district' বাক্যটি আবেগ সহকারে পাঠ করান।",
        "ধাপ ৩: শিক্ষার্থীদের তাদের নিজ জেলা নিয়ে এক বাক্য বলতে বলুন।"
      ]
    },
    {
      id: 7,
      title: "Wrap-up & 20-Mark Companion Worksheet",
      subtitle: "পাঠ মূল্যায়ন ও সঙ্গী ওয়ার্কশিট সমাধান",
      phase: "৭. পর্যালোচনা ও মূল্যায়ন (Review & Worksheet)",
      duration: "৪ মিনিট",
      themeColor: "from-teal-600 to-emerald-700",
      imageEmoji: "📝 🌟 🏆",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have explored Kishoreganj district successfully:",
          "• Located 145 km from Dhaka, named after landlord Brojokishore Roy.",
          "• 8 municipalities, 13 upazilas, 108 unions, 1745 villages.",
          "• Home to Solakia Eid Ground, Pagla Mosque, and Narasunda river.",
          "• Birthplace of Chandrabati, Sukumar Ray, Zainul Abedin, and Syed Nazrul Islam.",
          "Now complete the 20-mark companion worksheet below!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা ৫ম শ্রেণির 'মাই হোম ডিস্ট্রিক্ট: কিশোরগঞ্জ' পাঠটি সম্পূর্ণ করেছ। এবার নিচের ২০ নম্বরের সঙ্গী ওয়ার্কশিটটি পূরণ করো!"
      },
      teacherNotes: "শিক্ষার্থীদের ২০ নম্বরের পূর্ণাঙ্গ সঙ্গী ওয়ার্কশিট সমাধান করতে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: পাঠের মূল তথ্যগুলো সংক্ষেপে ঝালাই করে নিন।",
        "ধাপ ২: ওয়ার্কশিট খুলে লিখতে উৎসাহিত করুন।",
        "ধাপ ৩: শিক্ষার্থীদের স্বাবলম্বীভাবে পরীক্ষা শেষ করতে বলুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 5 English Evaluation — My Home District: Kishoreganj",
    classGrade: "Class 5 (৫ম শ্রেণি)",
    subject: "English for Today (Unit 10, Lesson 1)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "matching",
        title: "Section A: Column Matching (5 Marks)",
        instruction: "Column A-এর সাথে Column B-এর সঠিক অংশের অর্থপূর্ণ মিল করো:",
        content: [
          { a: "1. Kishoreganj is about 145 km", b: "a. the first woman poet of Bangla literature." },
          { a: "2. The name Kishoreganj comes from", b: "b. from Dhaka." },
          { a: "3. The river Narasunda flows", c: "c. through Kishoreganj town." },
          { a: "4. Solakia Eid Ground is", d: "d. landlord Brojokishore Roy." },
          { a: "5. Chandrabati was", e: "e. the largest Eid fairgrounds in the country." }
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Clues (5 Marks)",
        instruction: "ক্লু বক্স থেকে উপযুক্ত শব্দ নিয়ে শূন্যস্থান পূরণ করো: [ Narasunda, 145, Sukumar, Solakia, eight ]",
        content: [
          "1. Kishoreganj is about ____________ kilometres from Dhaka.",
          "2. There are ____________ municipalities in Kishoreganj district.",
          "3. The river ____________ flows through the town.",
          "4. The largest Eid fairground is called ____________ Eid Ground.",
          "5. Upendrakishore Roy Chowdhury and ____________ Ray wrote children's literature."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে True এবং মিথ্যা হলে False লেখো:",
        content: [
          "1. Kishoreganj is only 20 kilometres away from Dhaka. ( __________ )",
          "2. The area of Kishoreganj municipality is about 10 square kilometres. ( __________ )",
          "3. The fort of Isah Khan is located at Jangalbari. ( __________ )",
          "4. Zainul Abedin was a famous football player. ( __________ )",
          "5. Syed Nazrul Islam was the first acting President of Bangladesh. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. How did Kishoreganj get its name?\n   Answer: ________________________________________________________________",
          "2. Name two famous places to visit in or around Kishoreganj.\n   Answer: ________________________________________________________________",
          "3. Who was Chandrabati and why is she famous?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// CLASS 5 - UNIT 12 - LESSON 1: HOW FAR IS SAINT MARTIN'S? (CORAL ISLAND)
// =========================================================================
export const SAINT_MARTINS_SLIDE_DECK: SlideDeck = {
  id: "saint-martins-island",
  grade: "Class 5 (৫ম শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 12: How Far is Saint Martin's?",
  lesson: "Lesson 1: How Far is Saint Martin's? - Coral Island",
  topic: "Coral Island: Saint Martin's, Marine Turtles, Corals & Sea Voyage (pp. 46–49)",
  category: "english",
  thumbnailEmoji: "🏝️ 🐢 🚢",
  totalSlides: 7,
  slides: [
    {
      id: 1,
      title: "Introduction: The Only Coral Island in Bangladesh",
      subtitle: "সেন্ট মার্টিন্স: বাংলাদেশের একমাত্র প্রবাল দ্বীপ ও বঙ্গোপসাগরের নীল জল (Activity A)",
      phase: "১. সূচনা ও ভৌগোলিক বৈশিষ্ট্য (Introduction)",
      duration: "৪ মিনিট",
      themeColor: "from-cyan-600 to-blue-700",
      imageEmoji: "🏝️ 🌊 ☀️",
      sceneType: "cultural",
      hasVisualStage: true,
      content: {
        englishText: [
          "Saint Martin's Island is a special place in Bangladesh.",
          "It is the only coral island in Bangladesh, and you can see coral in different shapes and colours.",
          "The water in the Bay of Bengal is very clean and blue!"
        ],
        banglaExplanation: "সেন্ট মার্টিন্স দ্বীপ বাংলাদেশের একটি অত্যন্ত বিশেষ স্থান। এটি বাংলাদেশের একমাত্র প্রবাল দ্বীপ, এবং এখানে বিভিন্ন আকার ও রঙের প্রবাল দেখতে পাওয়া যায়। বঙ্গোপসাগরের পানি এখানে অত্যন্ত স্বচ্ছ ও নীল!",
        vocabulary: [
          {
            word: "coral",
            syllables: ["cor", "al"],
            phonetic: "/ˈkɒr.əl/",
            meaning: "প্রবাল / শৈলশ্রেণী",
            partOfSpeech: "Noun",
            example: "Saint Martin's is the only coral island in Bangladesh.",
            icon: "🪸"
          },
          {
            word: "island",
            syllables: ["is", "land"],
            phonetic: "/ˈaɪ.lənd/",
            meaning: "দ্বীপ (চারিদিকে পানি দ্বারা বেষ্টিত ভূখণ্ড)",
            partOfSpeech: "Noun",
            example: "Saint Martin's Island is in the Bay of Bengal.",
            icon: "🏝️"
          },
          {
            word: "special",
            syllables: ["spe", "cial"],
            phonetic: "/ˈspeʃ.əl/",
            meaning: "বিশেষ / অনন্য",
            partOfSpeech: "Adjective",
            example: "Saint Martin's is a very special place.",
            icon: "✨"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের মানচিত্রে টেকনাফ থেকে সেন্ট মার্টিন্সের অবস্থান দেখান এবং প্রবাল কী তা সহজ ভাষায় বুঝিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: মানচিত্রে বঙ্গোপসাগরের বুকে সেন্ট মার্টিন্স দ্বীপের অবস্থান দেখান।",
        "ধাপ ২: প্রবাল (coral) ও নীল পানির সৌন্দর্য ব্যাখ্যা করুন।",
        "ধাপ ৩: 'coral' ও 'island' শব্দের সঠিক উচ্চারণ অনুশীলন করান।"
      ]
    },
    {
      id: 2,
      title: "Marine Life: Corals of Different Shapes & Colours",
      subtitle: "সাগরতলের রূপকথা: বৈচিত্র্যময় প্রবালের গঠন ও রঙিন সামুদ্রিক পরিবেশ",
      phase: "২. প্রবালের বৈচিত্র্য (Coral Wonders)",
      duration: "৫ মিনিট",
      themeColor: "from-teal-600 to-cyan-800",
      imageEmoji: "🪸 🐠 🌈",
      sceneType: "comprehension",
      hasVisualStage: true,
      content: {
        englishText: [
          "Under the crystal clear water, living corals build magnificent underwater gardens.",
          "You can see brain corals, staghorn corals, and colourful fan corals.",
          "They provide food and shelter for thousands of tiny colourful sea fish."
        ],
        banglaExplanation: "স্বচ্ছ স্ফটিক পানির নিচে জীবন্ত প্রবালরা গড়ে তোলে অপূর্ব সমুদ্রতল বাগান। এখানে ব্রেন কোরাল, হরিণের শিংয়ের মতো প্রবাল এবং রঙিন পাখা প্রবাল দেখতে পাওয়া যায়। এগুলো হাজার হাজার রঙিন ছোট সামুদ্রিক মাছের খাবার ও আশ্রয় দেয়।"
      },
      teacherNotes: "ভিজ্যুয়াল স্টেজের প্রবাল গ্যালারি দেখিয়ে শিক্ষার্থীদের প্রবাল সংরক্ষণের গুরুত্ব জানান।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে বিভিন্ন ধরনের প্রবালের গঠন দেখান।",
        "ধাপ ২: জীবন্ত প্রবাল কেন পাথর নয়, প্রাণী ও বাস্তুতন্ত্র তা ব্যাখ্যা করুন।",
        "ধাপ ৩: শিক্ষার্থীদের পছন্দের একটি প্রবাল আঁকতে বলুন।"
      ]
    },
    {
      id: 3,
      title: "Sea Turtles: Nesting on the Sandy Beach",
      subtitle: "সামুদ্রিক কচ্ছপ: বালুকাময় সৈকতে ডিম পাড়া ও জীবনচক্র",
      phase: "৩. সামুদ্রিক প্রাণী ও প্রকৃতি (Sea Turtles)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "🐢 🏖️ 🥚",
      sceneType: "comprehension",
      hasVisualStage: true,
      content: {
        englishText: [
          "You can also see the turtles on the island.",
          "The turtles make their nests on the beach and then they lay their eggs in them.",
          "You can see many fish, too."
        ],
        banglaExplanation: "তোমরা এই দ্বীপে সামুদ্রিক কচ্ছপও দেখতে পারো। কচ্ছপগুলো বালুকাময় সৈকতে তাদের বাসা বানায় এবং সেখানে তাদের ডিম পাড়ে। এছাড়া তোমরা অসংখ্য মাছও দেখতে পাবে।",
        vocabulary: [
          {
            word: "turtles",
            syllables: ["tur", "tles"],
            phonetic: "/ˈtɜː.təlz/",
            meaning: "সামুদ্রিক কচ্ছপ",
            partOfSpeech: "Noun",
            example: "Turtles lay their eggs on the sandy beach.",
            icon: "🐢"
          },
          {
            word: "nests",
            syllables: ["nests"],
            phonetic: "/nests/",
            meaning: "বাসা / ডিম পাড়ার গর্ত",
            partOfSpeech: "Noun",
            example: "The turtles make their nests on the beach.",
            icon: "🪺"
          },
          {
            word: "beach",
            syllables: ["beach"],
            phonetic: "/biːtʃ/",
            meaning: "সমুদ্র সৈকত",
            partOfSpeech: "Noun",
            example: "The sandy beach is warm and sunny.",
            icon: "🏖️"
          }
        ]
      },
      teacherNotes: "কচ্ছপের জীবনচক্র সিমুলেটর চালিয়ে শিক্ষার্থীদের প্রতিটি ধাপ (সৈকতে আসা, গর্ত খোঁড়া, ডিম পাড়া, সাগরে ফিরে যাওয়া) দেখান।",
      quickTeachingSteps: [
        "ধাপ ১: কচ্ছপ ডিম পাড়ার ৪টি ধাপ ক্রমানুসারে ব্যাখ্যা করুন।",
        "ধাপ ২: ডিমের সুরক্ষায় সৈকতে কোলাহল না করার প্রয়োজনীয়তা বলুন।",
        "ধাপ ৩: 'lay their eggs' বাক্যাংশটি বুঝিয়ে বোর্ডে লেখান।"
      ]
    },
    {
      id: 4,
      title: "Exciting Sea Voyage: Teknaf to Saint Martin's",
      subtitle: "রোমাঞ্চকর সমুদ্রযাত্রা: টেকনাফ থেকে কাঠের নৌকা বা সি-ট্রাক",
      phase: "৪. ভ্রমণ ও যাতায়াত (Sea Voyage)",
      duration: "৬ মিনিট",
      themeColor: "from-blue-600 to-indigo-700",
      imageEmoji: "🚢 ⛰️ 🌊",
      sceneType: "cultural",
      hasVisualStage: true,
      content: {
        englishText: [
          "You can go on a wooden boat or a sea truck to get there.",
          "The journeys from Teknaf to Saint Martin's Island are exciting.",
          "You can see the green hills of Myanmar on one side and the blue sea on the other.",
          "It takes about two to two and a half hours to reach the island."
        ],
        banglaExplanation: "সেখানে যাওয়ার জন্য তোমরা কাঠের নৌকা বা সি-ট্রাকে চড়ে যেতে পারো। টেকনাফ থেকে সেন্ট মার্টিন্স দ্বীপের ভ্রমণ অত্যন্ত রোমাঞ্চকর। যাত্রাপথে একদিকে মায়ানমারের সবুজ পাহাড় এবং অন্যদিকে নীল সমুদ্র দেখতে পাওয়া যায়। দ্বীপে পৌঁছাতে প্রায় দুই থেকে আড়াই ঘণ্টা সময় লাগে।",
        vocabulary: [
          {
            word: "journey",
            syllables: ["jour", "ney"],
            phonetic: "/ˈdʒɜː.ni/",
            meaning: "ভ্রমণ / যাত্রা",
            partOfSpeech: "Noun",
            example: "The journey by sea truck is exciting.",
            icon: "🚢"
          },
          {
            word: "exciting",
            syllables: ["ex", "cit", "ing"],
            phonetic: "/ɪkˈsaɪ.tɪŋ/",
            meaning: "রোমাঞ্চকর / উত্তেজনাকর",
            partOfSpeech: "Adjective",
            example: "The journey is very exciting.",
            icon: "🎉"
          },
          {
            word: "wooden",
            syllables: ["wood", "en"],
            phonetic: "/ˈwʊd.ən/",
            meaning: "কাঠের তৈরি",
            partOfSpeech: "Adjective",
            example: "They travelled on a wooden boat.",
            icon: "🛶"
          }
        ]
      },
      teacherNotes: "যাত্রাপথের দুই ধারের দৃশ্য (একপাশে মিয়ানমারের পাহাড়, অন্যপাশে সাগরের খোলা নীল জল) শিক্ষার্থীদের কল্পনা করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজের সমুদ্রযাত্রা সিমুলেটর চালু করুন।",
        "ধাপ ২: টেকনাফ থেকে নাফ নদী পেরিয়ে সাগরে প্রবেশের পথ চিহ্নিত করুন।",
        "ধাপ ৩: ভ্রমণের সময়কাল (২ থেকে ২.৫ ঘণ্টা) মনে রাখতে বলুন।"
      ]
    },
    {
      id: 5,
      title: "Island Delights: Sweet Coconut Water & Delicious Fish",
      subtitle: "দ্বীপের সুস্বাদু আপ্যায়ন: মিষ্টি ডাবের পানি ও টাটকা সামুদ্রিক মাছ",
      phase: "৫. স্থানীয় খাবার ও পরিবেশ (Island Life)",
      duration: "৫ মিনিট",
      themeColor: "from-amber-600 to-emerald-700",
      imageEmoji: "🥥 🐟 🌴",
      sceneType: "cultural",
      hasVisualStage: true,
      content: {
        englishText: [
          "You can drink sweet coconut water and eat delicious sea fish there.",
          "The island is peaceful and clean.",
          "Gentle sea breezes blow through the tall coconut trees.",
          "Visitors love walking along the quiet sandy beaches."
        ],
        banglaExplanation: "তোমরা সেখানে মিষ্টি ডাবের পানি পান করতে পারো এবং সুস্বাদু সামুদ্রিক মাছ খেতে পারো। এই দ্বীপটি শান্ত এবং পরিচ্ছন্ন। লম্বা নারিকেল গাছের ফাঁক দিয়ে শীতল সমুদ্রের বাতাস বয়ে যায়। দর্শনার্থীরা শান্ত বালুকাময় সৈকত ধরে হাঁটতে খুব ভালোবাসে।",
        vocabulary: [
          {
            word: "coconut",
            syllables: ["co", "co", "nut"],
            phonetic: "/ˈkəʊ.kə.nʌt/",
            meaning: "নারিকেল / ডাব",
            partOfSpeech: "Noun",
            example: "We drank sweet coconut water on the beach.",
            icon: "🥥"
          },
          {
            word: "delicious",
            syllables: ["de", "li", "cious"],
            phonetic: "/dɪˈlɪʃ.əs/",
            meaning: "সুস্বাদু / মজাদার",
            partOfSpeech: "Adjective",
            example: "The sea fish was fresh and delicious.",
            icon: "😋"
          },
          {
            word: "peaceful",
            syllables: ["peace", "ful"],
            phonetic: "/ˈpiːs.fəl/",
            meaning: "শান্তিময় / শান্ত",
            partOfSpeech: "Adjective",
            example: "The island is peaceful and clean.",
            icon: "🕊️"
          }
        ]
      },
      teacherNotes: "দ্বীপের প্রাকৃতিক সৌন্দর্য ও পরিচ্ছন্নতা রক্ষার গুরুত্ব তুলে ধরুন।",
      quickTeachingSteps: [
        "ধাপ ১: ডাবের পানি ও সামুদ্রিক খাবারের পুষ্টিগুণ নিয়ে আলোচনা করুন।",
        "ধাপ ২: 'peaceful and clean' শব্দের ভাবার্থ বুঝিয়ে দিন।",
        "ধাপ ৩: শিক্ষার্থীদের দ্বীপের অনুভূতি নিয়ে দুই বাক্য বলতে বলুন।"
      ]
    },
    {
      id: 6,
      title: "Eco-Responsibility: Protecting Our Coral Treasure",
      subtitle: "পরিবেশ সচেতনতা: প্রবাল ও সৈকত পরিচ্ছন্ন রাখার অঙ্গীকার",
      phase: "৬. পরিবেশ সংরক্ষণ ও সচেতনতা (Eco-Conservation)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-700 to-cyan-700",
      imageEmoji: "🌱 🚯 🛡️",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "Saint Martin's is our national natural wonder.",
          "Never throw plastic bottles or polythene into the blue sea.",
          "Do not step on living corals or disturb nesting turtles.",
          "Keep the island peaceful and clean for generations to come!"
        ],
        banglaExplanation: "সেন্ট মার্টিন্স আমাদের জাতীয় প্রাকৃতিক বিস্ময়। নীল সাগরে কখনো প্লাস্টিকের বোতল বা পলিথিন ফেলবে না। জীবন্ত প্রবালের উপর পা ফেলবে না বা কচ্ছপের বাসায় বিঘ্ন ঘটাবে না। ভবিষ্যৎ প্রজন্মের জন্য এই দ্বীপটিকে সর্বদা শান্ত ও পরিচ্ছন্ন রাখো!"
      },
      teacherNotes: "শিক্ষার্থীদের পরিবেশবাদী আচরণ ও পরিচ্ছন্নতার শপথ করান।",
      quickTeachingSteps: [
        "ধাপ ১: প্লাস্টিক বর্জ্যের ক্ষতিকর প্রভাব ব্যাখ্যা করুন।",
        "ধাপ ২: প্রবাল ভাঙা বা বিক্রির নিষেধাজ্ঞা সম্পর্কে জানান।",
        "ধাপ ৩: পরিবেশ সচেতন স্লোগান সমস্বরে পাঠ করান।"
      ]
    },
    {
      id: 7,
      title: "Wrap-up & 20-Mark Companion Worksheet",
      subtitle: "পাঠ পর্যালোচনা ও পূর্ণাঙ্গ ২০ নম্বরের মূল্যায়ন ওয়ার্কশিট",
      phase: "৭. পর্যালোচনা ও মূল্যায়ন (Review & Worksheet)",
      duration: "৫ মিনিট",
      themeColor: "from-cyan-600 to-teal-700",
      imageEmoji: "📝 🌟 🏆",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed the Saint Martin's Island lesson:",
          "• Only coral island in Bangladesh located in the Bay of Bengal.",
          "• Home to living corals, marine turtles, and colourful fish.",
          "• Journey by wooden boat or sea truck from Teknaf takes 2 to 2.5 hours.",
          "• Famous for sweet coconut water, delicious fish, and peaceful beaches.",
          "Now complete your 20-mark companion worksheet below!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা সেন্ট মার্টিন্স প্রবাল দ্বীপের পাঠ সফলভাবে সমাপ্ত করেছ। এবার নিচের ২০ নম্বরের পূর্ণাঙ্গ সঙ্গী ওয়ার্কশিটটি পূরণ করো!"
      },
      teacherNotes: "শিক্ষার্থীদের ২০ নম্বরের পূর্ণাঙ্গ সঙ্গী ওয়ার্কশিট সমাধান করতে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: পাঠের মূল তথ্যগুলো সংক্ষেপে ঝালাই করে নিন।",
        "ধাপ ২: ওয়ার্কশিট খুলে লিখতে উৎসাহিত করুন।",
        "ধাপ ৩: শিক্ষার্থীদের স্বাবলম্বীভাবে পরীক্ষা শেষ করতে বলুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 5 English Evaluation — How Far is Saint Martin's?",
    classGrade: "Class 5 (৫ম শ্রেণি)",
    subject: "English for Today (Unit 12, Lesson 1)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "matching",
        title: "Section A: Column Matching (5 Marks)",
        instruction: "Column A-এর সাথে Column B-এর সঠিক অংশের অর্থপূর্ণ মিল করো:",
        content: [
          { a: "1. Saint Martin's is the only", b: "a. very clean and blue." },
          { a: "2. The water in the Bay of Bengal is", b: "b. coral island in Bangladesh." },
          { a: "3. Turtles make their nests", c: "c. on the sandy beach." },
          { a: "4. The journeys from Teknaf", d: "d. to reach the island." },
          { a: "5. It takes about two to 2.5 hours", e: "e. are exciting." }
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Clues (5 Marks)",
        instruction: "ক্লু বক্স থেকে উপযুক্ত শব্দ নিয়ে শূন্যস্থান পূরণ করো: [ Teknaf, coral, coconut, eggs, Myanmar ]",
        content: [
          "1. Saint Martin's is the only ____________ island in Bangladesh.",
          "2. The turtles lay their ____________ in nests on the beach.",
          "3. Boats and sea trucks depart from ____________ to the island.",
          "4. On one side of the journey, you can see the green hills of ____________.",
          "5. You can drink sweet ____________ water on the island."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে True এবং মিথ্যা হলে False লেখো:",
        content: [
          "1. Saint Martin's is a desert island with no water. ( __________ )",
          "2. Corals come in different shapes and colours. ( __________ )",
          "3. Turtles lay eggs on tree branches. ( __________ )",
          "4. The journey from Teknaf takes about two to two and a half hours. ( __________ )",
          "5. The island is peaceful and clean. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. What kind of island is Saint Martin's?\n   Answer: ________________________________________________________________",
          "2. What can you see on either side during the journey from Teknaf?\n   Answer: ________________________________________________________________",
          "3. What delicious things can you drink and eat on Saint Martin's?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// CLASS 5 - UNIT 14 - LESSON 1: STORY: THE HARE AND THE TORTOISE
// =========================================================================
export const HARE_AND_TORTOISE_SLIDE_DECK: SlideDeck = {
  id: "hare-and-tortoise",
  grade: "Class 5 (৫ম শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 14: Story: The Hare and the Tortoise",
  lesson: "Lesson 1: Story: The Hare and the Tortoise",
  topic: "Story: The Hare and the Tortoise, Race & Moral Wisdom (pp. 54–57)",
  category: "english",
  thumbnailEmoji: "🐇 🐢 🏁",
  totalSlides: 7,
  slides: [
    {
      id: 1,
      title: "Characters in the Forest: The Fastest & The Slowest",
      subtitle: "বনের দুই প্রাণী: দ্রুততম খরগোশ ও ধীরগতির কচ্ছপের পরিচয় (Activity A)",
      phase: "১. সূচনা ও চরিত্র পরিচিতি (Introduction)",
      duration: "৪ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "🌳 🐇 🐢",
      sceneType: "cultural",
      hasVisualStage: true,
      content: {
        englishText: [
          "One day, a hare was walking in the forest when he saw a tortoise.",
          "The hare was the fastest animal in the forest.",
          "The tortoise was the slowest animal in the forest."
        ],
        banglaExplanation: "একদিন বনের মধ্যে একটি খরগোশ হেঁটে যাওয়ার সময় একটি কচ্ছপকে দেখতে পেল। খরগোশটি ছিল সেই বনের সবচেয়ে দ্রুতগতির প্রাণী। আর কচ্ছপটি ছিল সেই বনের সবচেয়ে ধীরগতির প্রাণী।",
        vocabulary: [
          {
            word: "fastest",
            syllables: ["fast", "est"],
            phonetic: "/ˈfɑːs.tɪst/",
            meaning: "দ্রুততম / সবচেয়ে দ্রুতগামী",
            partOfSpeech: "Adjective",
            example: "The hare was the fastest animal in the forest.",
            icon: "⚡"
          },
          {
            word: "slowest",
            syllables: ["slow", "est"],
            phonetic: "/ˈsləʊ.ɪst/",
            meaning: "ধীরতম / সবচেয়ে ধীরগতির",
            partOfSpeech: "Adjective",
            example: "The tortoise was the slowest animal in the forest.",
            icon: "🐢"
          },
          {
            word: "forest",
            syllables: ["for", "est"],
            phonetic: "/ˈfɒr.ɪst/",
            meaning: "বন / অরণ্য",
            partOfSpeech: "Noun",
            example: "They lived together in a green forest.",
            icon: "🌲"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের 'fastest' ও 'slowest' সুপারলেটিভ ডিগ্রি দুটি বোর্ডে লিখে বুঝিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: শিক্ষার্থীদের খরগোশ ও কচ্ছপের গতির তুলনা করতে বলুন।",
        "ধাপ ২: fastest ও slowest শব্দের উচ্চারণ ও রূপান্তর (fast-faster-fastest) দেখান।",
        "ধাপ ৩: বাক্যের অর্থ ও প্রেক্ষাপট বুঝিয়ে বলুন।"
      ]
    },
    {
      id: 2,
      title: "The Boastful Challenge & Starting Agreement",
      subtitle: "উপহাস ও দৌড় প্রতিযোগিতার প্রস্তাব ও শর্ত নির্ধারণ",
      phase: "২. সংলাপ ও দ্বন্দ্ব (Dialogue & Challenge)",
      duration: "৫ মিনিট",
      themeColor: "from-amber-600 to-orange-700",
      imageEmoji: "🗣️ 🌲 🏁",
      sceneType: "dialogue",
      hasVisualStage: true,
      content: {
        englishText: [
          "The hare called out to the tortoise, 'Hurry up! You are so slow! Can\'t you walk faster? Can\'t you run?',",
          "The tortoise felt angry and said, 'Why don\'t we have a race? Maybe I can win!',",
          "The hare laughed and laughed. 'Sure! I will win!' the hare said.",
          "They agreed to start next to a big tree and finish at the river."
        ],
        banglaExplanation: "খরগোশটি কচ্ছপকে ডেকে বলল, 'তাড়াতাড়ি চলো! তুমি এত ধীর! তুমি কি দ্রুত হাঁটতে পারো না? দৌড়াতে পারো না?' কচ্ছপ রেগে গিয়ে বলল, 'আমরা একটা দৌড় প্রতিযোগিতা করছি না কেন? হয়তো আমি জিতে যেতে পারি!' খরগোশ হেসেই খুন হলো। 'অবশ্যই! আমিই জিতব!' তারা বড় একটি গাছের পাশ থেকে শুরু করে নদীর পাড়ে গিয়ে শেষ করার ব্যাপারে একমত হলো।",
        vocabulary: [
          {
            word: "tortoise",
            syllables: ["tor", "toise"],
            phonetic: "/ˈtɔː.təs/",
            meaning: "স্থল কচ্ছপ",
            partOfSpeech: "Noun",
            example: "The tortoise accepted the challenge.",
            icon: "🐢"
          },
          {
            word: "angry",
            syllables: ["an", "gry"],
            phonetic: "/ˈæŋ.ɡri/",
            meaning: "রাগান্বিত / ক্ষুব্ধ",
            partOfSpeech: "Adjective",
            example: "The tortoise felt angry at the mockery.",
            icon: "😠"
          },
          {
            word: "agreed",
            syllables: ["a", "greed"],
            phonetic: "/əˈɡriːd/",
            meaning: "সম্মত হলো / একমত হলো",
            partOfSpeech: "Verb",
            example: "They agreed to start next to a big tree.",
            icon: "🤝"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের দু'দলে ভাগ করে খরগোশ ও কচ্ছপের সংলাপটি অভিনয় করান।",
      quickTeachingSteps: [
        "ধাপ ১: খরগোশের অহংকারী কণ্ঠ এবং কচ্ছপের দৃঢ় কণ্ঠস্বর স্পষ্ট করে শোনান।",
        "ধাপ ২: জোড়ায় শিক্ষার্থীদের দ্বারা সংলাপটি অভিনয় করান।",
        "ধাপ ৩: প্রতিযোগিতার সূচনা ও সমাপ্তির স্থান চিহ্নিত করুন।"
      ]
    },
    {
      id: 3,
      title: "The Race Begins: The Hare Sprints Ahead",
      subtitle: "দৌড়ের সূচনা: বিদ্যুৎগতিতে খরগোশের দৃষ্টির বাইরে চলে যাওয়া",
      phase: "৩. নিবিড় পাঠ ও দৃশ্যায়ন (Action Scene)",
      duration: "৫ মিনিট",
      themeColor: "from-blue-600 to-indigo-700",
      imageEmoji: "💨 🏃‍♂️ 🌲",
      sceneType: "comprehension",
      hasVisualStage: true,
      content: {
        englishText: [
          "Then they began their race.",
          "The hare ran as fast as he could.",
          "In a few minutes the hare was out of sight."
        ],
        banglaExplanation: "তারপর তারা তাদের দৌড় শুরু করল। খরগোশ তার সর্বোচ্চ গতিতে দৌড়াল। মাত্র কয়েক মিনিটের মধ্যে খরগোশ দৃষ্টির সীমানা পেরিয়ে গেল।"
      },
      teacherNotes: "'as fast as he could' এবং 'out of sight' বাগধারা দুটি বুঝিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজের ট্র্যাকে খরগোশের দৌড় দেখান।",
        "ধাপ ২: 'out of sight' বাগধারাটির অর্থ বোর্ডে লিখুন।",
        "ধাপ ৩: বাক্যগুলো সমস্বরে পাঠ করান।"
      ]
    },
    {
      id: 4,
      title: "Careless Nap: Sleeping Under the Shady Tree",
      subtitle: "অহংকারের ফল: গাছের নিচে খরগোশের এক ঘণ্টার ঘুম",
      phase: "৪. গল্পের বাঁক পরিবর্তন (Plot Twist)",
      duration: "৫ মিনিট",
      themeColor: "from-amber-700 to-yellow-800",
      imageEmoji: "💤 🌳 😴",
      sceneType: "cultural",
      hasVisualStage: true,
      content: {
        englishText: [
          "The hare said to himself, 'The tortoise is very far behind. I can walk a bit, and then I can have a nap.',",
          "Soon the hare was asleep under a tree next to the path.",
          "The hare slept for an hour."
        ],
        banglaExplanation: "খরগোশ মনে মনে ভাবল, 'কচ্ছপ তো অনেক পেছনে পড়ে আছে। আমি একটু আস্তে হাঁটতে পারি এবং তারপর কিছুক্ষণ ঘুমিয়ে নিতে পারি।' কিছুক্ষণের মধ্যেই খরগোশ পথের পাশের একটি গাছের নিচে ঘুমিয়ে পড়ল। খরগোশ টানা এক ঘণ্টা ঘুমাল।",
        vocabulary: [
          {
            word: "nap",
            syllables: ["nap"],
            phonetic: "/næp/",
            meaning: "স্বল্পকালীন ঘুম / তন্দ্রা",
            partOfSpeech: "Noun",
            example: "The hare decided to take a short nap.",
            icon: "💤"
          },
          {
            word: "asleep",
            syllables: ["a", "sleep"],
            phonetic: "/əˈsliːp/",
            meaning: "নিদ্রিত / ঘুমে বিভোর",
            partOfSpeech: "Adjective",
            example: "Soon the hare was fast asleep.",
            icon: "😴"
          },
          {
            word: "behind",
            syllables: ["be", "hind"],
            phonetic: "/bɪˈhaɪnd/",
            meaning: "পেছনে",
            partOfSpeech: "Preposition",
            example: "The tortoise was far behind.",
            icon: "🔙"
          }
        ]
      },
      teacherNotes: "অতিরিক্ত আত্মবিশ্বাস কীভাবে মানুষের লক্ষ্যভ্রষ্ট করে তা খরগোশের উদাহরণের মাধ্যমে আলোচনা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: খরগোশের ঘুমের দৃশ্য ও কারণ ব্যাখ্যা করুন।",
        "ধাপ ২: 'slept for an hour' বাক্যাংশটি লক্ষ করতে বলুন।",
        "ধাপ ৩: খরগোশের এই কাজের পরিণতি কী হতে পারে শিক্ষার্থীদের কাছে জানতে চান।"
      ]
    },
    {
      id: 5,
      title: "Steadily On and On: The Tortoise Passes By",
      subtitle: "ধৈর্য ও একাগ্রতা: ঘুমন্ত খরগোশকে অতিক্রম করে কচ্ছপের যাত্রা",
      phase: "৫. অধ্যবসায়ের দৃষ্টান্ত (Persistence)",
      duration: "৫ মিনিট",
      themeColor: "from-teal-600 to-emerald-700",
      imageEmoji: "🐢 🐾 🌿",
      sceneType: "comprehension",
      hasVisualStage: true,
      content: {
        englishText: [
          "The tortoise walked steadily on and on.",
          "He didn't stop.",
          "Soon, he passed the sleeping hare."
        ],
        banglaExplanation: "কচ্ছপটি অবিরাম ও অবিচল পদক্ষেপে হেঁটে চলল। সে এক মুহূর্তের জন্যও থামল না। শীঘ্রই সে ঘুমন্ত খরগোশটিকে ছাড়িয়ে সামনে এগিয়ে গেল।",
        vocabulary: [
          {
            word: "steadily",
            syllables: ["stead", "i", "ly"],
            phonetic: "/ˈsted.əl.i/",
            meaning: "অবিচলভাবে / স্থির পদক্ষেপে",
            partOfSpeech: "Adverb",
            example: "The tortoise walked steadily on and on.",
            icon: "🚶‍♂️"
          },
          {
            word: "passed",
            syllables: ["passed"],
            phonetic: "/pɑːst/",
            meaning: "অতিক্রম করল / ছাড়িয়ে গেল",
            partOfSpeech: "Verb",
            example: "He passed the sleeping hare quietly.",
            icon: "➡️"
          }
        ]
      },
      teacherNotes: "'steadily' শব্দের গভীর অর্থ এবং নিয়মিত অধ্যবসায়ের মূল্য শিক্ষার্থীদের হৃদয়ঙ্গম করান।",
      quickTeachingSteps: [
        "ধাপ ১: 'steadily on and on' বাক্যটির ছন্দময় উচ্চারণ করান।",
        "ধাপ ২: কচ্ছপ কেন থামেনি তা নিয়ে প্রশ্ন করুন।",
        "ধাপ ৩: পড়ালেখা ও জীবনে নিয়মিত পরিশ্রমের গুরুত্ব আলোচনা করুন।"
      ]
    },
    {
      id: 6,
      title: "Victory at the Finish Line: Slow and Steady Wins!",
      subtitle: "চূড়ান্ত বিজয়: কচ্ছপের ফিনিশ লাইন অতিক্রম ও খরগোশের বিস্ময়",
      phase: "৬. পরিণতি ও নৈতিক শিক্ষা (Moral & Triumph)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-700 to-teal-800",
      imageEmoji: "🏆 🏁 🌟",
      sceneType: "cultural",
      hasVisualStage: true,
      content: {
        englishText: [
          "When he woke up, he looked at the finish line.",
          "He could not believe his eyes! The tortoise was almost at the finish line!",
          "The hare ran as fast as he could, but it was too late.",
          "The tortoise crossed the finish line and won the competition.",
          "The tortoise looked back at the hare and smiled. 'Slow and steady wins the race,' he said."
        ],
        banglaExplanation: "যখন খরগোশের ঘুম ভাঙল, সে ফিনিশ লাইনের দিকে তাকাল। সে নিজের চোখকে বিশ্বাস করতে পারল না! কচ্ছপ প্রায় ফিনিশ লাইনে পৌঁছে গেছে! খরগোশ তার সর্বোচ্চ গতিতে দৌড়াল, কিন্তু বড্ড দেরি হয়ে গিয়েছিল। কচ্ছপ ফিনিশ লাইন অতিক্রম করে প্রতিযোগিতায় বিজয়ী হলো। কচ্ছপ পেছনে ফিরে খরগোশের দিকে তাকিয়ে হাসল। সে বলল, 'ধীর কিন্তু অবিচল ব্যক্তিই দৌড়ে জয়ী হয়।'"
      },
      teacherNotes: "গল্পের অমর নীতিবাক্য 'Slow and steady wins the race' বোর্ডে বড় অক্ষরে লিখে সবাইকে দিয়ে পড়ান।",
      quickTeachingSteps: [
        "ধাপ ১: নাট্যরূপের মাধ্যমে ক্লাইম্যাক্স দৃশ্যটি শিক্ষার্থীদের দিয়ে পাঠ করান।",
        "ধাপ ২: প্রবাদটির অর্থ ও তাৎপর্য নিয়ে মুক্ত আলোচনা করুন।",
        "ধাপ ৩: শিক্ষার্থীদের নিজের জীবনের কোনো অভিজ্ঞতার সাথে মেলাতে বলুন।"
      ]
    },
    {
      id: 7,
      title: "Wrap-up & 20-Mark Companion Worksheet",
      subtitle: "পাঠ পর্যালোচনা ও পূর্ণাঙ্গ ২০ নম্বরের মূল্যায়ন ওয়ার্কশিট",
      phase: "৭. পর্যালোচনা ও মূল্যায়ন (Review & Worksheet)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-600 to-teal-700",
      imageEmoji: "📝 🌟 🏆",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed the story of The Hare and the Tortoise:",
          "• The boastful hare and patient tortoise agreed on a race from tree to river.",
          "• The hare slept under a tree for an hour, being overconfident.",
          "• The tortoise walked steadily on and on without stopping.",
          "• Tortoise won the race: 'Slow and steady wins the race!',",
          "Now complete your 20-mark companion worksheet below!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা খরগোশ ও কচ্ছপের কালজয়ী গল্পের পাঠ সফলভাবে সম্পন্ন করেছ। এবার নিচের ২০ নম্বরের সঙ্গী ওয়ার্কশিটটি পূরণ করো!"
      },
      teacherNotes: "শিক্ষার্থীদের ২০ নম্বরের পূর্ণাঙ্গ সঙ্গী ওয়ার্কশিট সমাধান করতে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: গল্পের ঘটনাপ্রবাহ সংক্ষেপে পুনরাবৃত্তি করুন।",
        "ধাপ ২: ওয়ার্কশিট খুলে লিখতে দিন।",
        "ধাপ ৩: শিক্ষার্থীদের সততা ও একাগ্রতার সাথে পরীক্ষা শেষ করতে বলুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 5 English Evaluation — Story: The Hare and the Tortoise",
    classGrade: "Class 5 (৫ম শ্রেণি)",
    subject: "English for Today (Unit 14, Lesson 1)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "matching",
        title: "Section A: Column Matching (5 Marks)",
        instruction: "Column A-এর সাথে Column B-এর সঠিক অংশের অর্থপূর্ণ মিল করো:",
        content: [
          { a: "1. The hare was the fastest", b: "a. steadily on and on." },
          { a: "2. The tortoise walked", b: "b. animal in the forest." },
          { a: "3. They agreed to finish", c: "c. wins the race." },
          { a: "4. The hare slept under a tree", d: "d. at the river." },
          { a: "5. Slow and steady", e: "e. for an hour." }
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Clues (5 Marks)",
        instruction: "ক্লু বক্স থেকে উপযুক্ত শব্দ নিয়ে শূন্যস্থান পূরণ করো: [ slowest, hour, finish, river, tree ]",
        content: [
          "1. The tortoise was the ____________ animal in the forest.",
          "2. The race started next to a big ____________.",
          "3. The finish line was at the ____________.",
          "4. The hare slept under a tree for an ____________.",
          "5. The tortoise was the first to cross the ____________ line."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে True এবং মিথ্যা হলে False লেখো:",
        content: [
          "1. The tortoise ran faster than the hare from the beginning. ( __________ )",
          "2. The hare took a nap because he thought the tortoise was far behind. ( __________ )",
          "3. The tortoise stopped to eat grass during the race. ( __________ )",
          "4. The hare woke up in time and easily won the race. ( __________ )",
          "5. 'Slow and steady wins the race' is the moral of the story. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. Where did the race start and where was the finish line?\n   Answer: ________________________________________________________________",
          "2. Why did the hare decide to take a nap?\n   Answer: ________________________________________________________________",
          "3. What did the tortoise say when he crossed the finish line?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// CLASS 5 - UNIT 19 - LESSON 1: THE LIBERATION WAR MUSEUM - A FIELD TRIP
// =========================================================================
export const LIBERATION_WAR_MUSEUM_SLIDE_DECK: SlideDeck = {
  id: "liberation-war-museum",
  grade: "Class 5 (৫ম শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 19: The Liberation War Museum",
  lesson: "Lesson 1: The Liberation War Museum - A Field Trip",
  topic: "A Field Trip to Liberation War Museum: Galleries, Declaration & Martyrs (pp. 74–77)",
  category: "english",
  thumbnailEmoji: "🏛️ 🇧🇩 🎖️",
  totalSlides: 7,
  slides: [
    {
      id: 1,
      title: "The Field Trip on 14 December",
      subtitle: "১৪ ডিসেম্বরের শিক্ষাসফর: মুক্তিযুদ্ধ জাদুঘরের উদ্দেশ্যে যাত্রা (Activity A)",
      phase: "১. সূচনা ও পটভূমি (Introduction)",
      duration: "৪ মিনিট",
      themeColor: "from-red-700 to-emerald-800",
      imageEmoji: "🚌 📅 📍",
      sceneType: "cultural",
      hasVisualStage: true,
      content: {
        englishText: [
          "On 14 December, our class went on a field trip to the Liberation War Museum at Segunbagicha, Dhaka.",
          "The trip was planned as part of our Bangladesh and Global Studies course.",
          "Our bus reached the museum at 10 a.m."
        ],
        banglaExplanation: "১৪ ডিসেম্বর আমাদের শ্রেণির শিক্ষার্থীরা ঢাকার সেগুনবাগিচায় অবস্থিত মুক্তিযুদ্ধ জাদুঘরে একটি শিক্ষাসফরে গিয়েছিল। বাংলাদেশ ও বিশ্বপরিচয় বিষয়ের অংশ হিসেবে এই সফরের পরিকল্পনা করা হয়েছিল। সকাল ১০টায় আমাদের বাস জাদুঘরে পৌঁছাল।",
        vocabulary: [
          {
            word: "field trip",
            syllables: ["field", "trip"],
            phonetic: "/fiːld trɪp/",
            meaning: "শিক্ষাসফর / মাঠপর্যায়ের শিক্ষা ভ্রমণ",
            partOfSpeech: "Noun",
            example: "Our class went on a field trip.",
            icon: "🚌"
          },
          {
            word: "museum",
            syllables: ["mu", "se", "um"],
            phonetic: "/mjuːˈziː.əm/",
            meaning: "জাদুঘর / স্মৃতি সংগ্রহশালা",
            partOfSpeech: "Noun",
            example: "The Liberation War Museum preserves our history.",
            icon: "🏛️"
          },
          {
            word: "planned",
            syllables: ["planned"],
            phonetic: "/plænd/",
            meaning: "পরিকল্পিত / আয়োজন করা হয়েছিল",
            partOfSpeech: "Verb",
            example: "The trip was planned carefully.",
            icon: "📋"
          }
        ]
      },
      teacherNotes: "১৪ ডিসেম্বর কেন বিশেষ (শহীদ বুদ্ধিজীবী দিবস) তা শিক্ষার্থীদের স্মরণ করিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: ১৪ ডিসেম্বরের ঐতিহাসিক গুরুত্ব আলোচনা করুন।",
        "ধাপ ২: শিক্ষাসফরের উদ্দেশ্য ও সময়সূচি বোর্ডে লিখুন।",
        "ধাপ ৩: 'field trip' ও 'museum' শব্দের উচ্চারণ অনুশীলন করান।"
      ]
    },
    {
      id: 2,
      title: "Warm Welcome & The Documentary Video Clip",
      subtitle: "গাইড কর্তৃক উষ্ণ অভ্যর্থনা ও মুক্তিযুদ্ধবিষয়ক তথ্যচিত্র প্রদর্শন",
      phase: "২. তথ্যচিত্র ও প্রারম্ভিক পরিচিতি (Documentary)",
      duration: "৫ মিনিট",
      themeColor: "from-emerald-700 to-teal-800",
      imageEmoji: "🎬 🙋‍♂️ 📽️",
      sceneType: "cultural",
      hasVisualStage: true,
      content: {
        englishText: [
          "A guide was waiting for us.",
          "He welcomed us warmly and took us on a quick tour of the different galleries.",
          "At first we watched a video clip on our liberation war and our independence."
        ],
        banglaExplanation: "একজন গাইড আমাদের জন্য অপেক্ষা করছিলেন। তিনি আমাদের উষ্ণ অভ্যর্থনা জানালেন এবং বিভিন্ন গ্যালারিতে নিয়ে একটি সংক্ষিপ্ত পরিদর্শন করালেন। প্রথমে আমরা আমাদের মুক্তিযুদ্ধ ও স্বাধীনতার ওপর একটি তথ্যচিত্র দেখলাম।",
        vocabulary: [
          {
            word: "guide",
            syllables: ["guide"],
            phonetic: "/ɡaɪd/",
            meaning: "পথপ্রদর্শক / গাইড",
            partOfSpeech: "Noun",
            example: "A guide welcomed the students warmly.",
            icon: "🙋‍♂️"
          },
          {
            word: "warmly",
            syllables: ["warm", "ly"],
            phonetic: "/ˈwɔːm.li/",
            meaning: "আন্তরিকভাবে / উষ্ণভাবে",
            partOfSpeech: "Adverb",
            example: "He welcomed us warmly.",
            icon: "🤝"
          },
          {
            word: "independence",
            syllables: ["in", "de", "pen", "dence"],
            phonetic: "/ˌɪn.dɪˈpen.dəns/",
            meaning: "স্বাধীনতা",
            partOfSpeech: "Noun",
            example: "We fought for our independence in 1971.",
            icon: "🇧🇩"
          }
        ]
      },
      teacherNotes: "জাদুঘরের গাইডের দায়িত্ব এবং তথ্যচিত্রের মাধ্যমে কীভাবে ইতিহাস তুলে ধরা হয় তা জানান।",
      quickTeachingSteps: [
        "ধাপ ১: গাইডের ভূমিকা ব্যাখ্যা করুন।",
        "ধাপ ২: তথ্যচিত্রের গুরুত্ব আলোচনা করুন।",
        "ধাপ ৩: 'independence' শব্দের সিলেবল বিভাজন দেখান।"
      ]
    },
    {
      id: 3,
      title: "The Four Permanent Galleries of History",
      subtitle: "ইতিহাসের স্মারক: ৪টি স্থায়ী গ্যালারির দুর্লভ আলোকচিত্র ও দলিল",
      phase: "৩. গ্যালারি পরিদর্শন ও প্রদর্শনী (Galleries)",
      duration: "৫ মিনিট",
      themeColor: "from-blue-700 to-slate-800",
      imageEmoji: "📜 📷 📰",
      sceneType: "comprehension",
      hasVisualStage: true,
      content: {
        englishText: [
          "There were four permanent galleries that exhibited rare photographs, documents and newspaper clippings, and objects used by the freedom fighters and the martyrs of our liberation war."
        ],
        banglaExplanation: "সেখানে চারটি স্থায়ী গ্যালারি ছিল যেখানে দুর্লভ আলোকচিত্র, গুরুত্বপূর্ণ দলিল, সংবাদপত্রের কাটিং এবং আমাদের মুক্তিযুদ্ধের বীর মুক্তিযোদ্ধা ও শহীদদের ব্যবহৃত স্মৃতিচিহ্ন প্রদর্শিত হয়েছিল।",
        vocabulary: [
          {
            word: "galleries",
            syllables: ["gal", "ler", "ies"],
            phonetic: "/ˈɡæl.ər.iz/",
            meaning: "প্রদর্শনী কক্ষসমূহ",
            partOfSpeech: "Noun",
            example: "There were four permanent galleries in the museum.",
            icon: "🏛️"
          },
          {
            word: "exhibited",
            syllables: ["ex", "hib", "it", "ed"],
            phonetic: "/ɪɡˈzɪb.ɪ.tɪd/",
            meaning: "প্রদর্শিত হয়েছিল",
            partOfSpeech: "Verb",
            example: "Rare historical documents were exhibited.",
            icon: "🖼️"
          },
          {
            word: "martyrs",
            syllables: ["mar", "tyrs"],
            phonetic: "/ˈmɑː.təz/",
            meaning: "শহীদগণ / আত্মোৎসর্গকারী বীরবৃন্দ",
            partOfSpeech: "Noun",
            example: "We honour the martyrs of our nation.",
            icon: "🌹"
          }
        ]
      },
      teacherNotes: "চারটি গ্যালারির বিষয়বস্তু এবং জাদুঘরের সংগ্রহের তাৎপর্য বুঝিয়ে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: ভিজ্যুয়াল স্টেজে ৪টি গ্যালারির তালিকা দেখান।",
        "ধাপ ২: ঐতিহাসিক দলিলের গুরুত্ব ব্যাখ্যা করুন।",
        "ধাপ ৩: 'permanent galleries' বাক্যাংশটি সমস্বরে পাঠ করান।"
      ]
    },
    {
      id: 4,
      title: "Gallery 2: The Declaration of Independence",
      subtitle: "গ্যালারি ২: আমাদের অধিকার, আমাদের আত্মত্যাগ ও স্বাধীনতার ঘোষণা",
      phase: "৪. স্বাধীনতার ঘোষণা ও তাৎপর্য (The Declaration)",
      duration: "৬ মিনিট",
      themeColor: "from-amber-700 to-red-800",
      imageEmoji: "📢 📜 🇧🇩",
      sceneType: "cultural",
      hasVisualStage: true,
      content: {
        englishText: [
          "At 'Gallery 2 - Our Rights, Our Sacrifices', our teacher read out to us the Declaration of Independence by Bangabandhu Sheikh Mujibur Rahman.",
          "Some other visitors also stopped and listened attentively."
        ],
        banglaExplanation: "গ্যালারি ২- 'আমাদের অধিকার, আমাদের আত্মত্যাগ'-এ আমাদের শিক্ষক বঙ্গবন্ধু শেখ মুজিবুর রহমানের স্বাধীনতার ঐতিহাসিক ঘোষণাটি আমাদের পড়ে শোনালেন। অন্যান্য দর্শনার্থীরাও থেমে গভীর মনোযোগ দিয়ে তা শুনলেন।",
        vocabulary: [
          {
            word: "declaration",
            syllables: ["dec", "la", "ra", "tion"],
            phonetic: "/ˌdek.ləˈreɪ.ʃən/",
            meaning: "ঘোষণা / বিবৃতি",
            partOfSpeech: "Noun",
            example: "The Declaration of Independence united the nation.",
            icon: "📢"
          },
          {
            word: "sacrifices",
            syllables: ["sac", "ri", "fic", "es"],
            phonetic: "/ˈsæk.rɪ.faɪs.ɪz/",
            meaning: "আত্মত্যাগসমূহ",
            partOfSpeech: "Noun",
            example: "We remember the supreme sacrifices of our heroes.",
            icon: "🎖️"
          },
          {
            word: "attentively",
            syllables: ["at", "ten", "tive", "ly"],
            phonetic: "/əˈten.tɪv.li/",
            meaning: "মনোযোগ সহকারে",
            partOfSpeech: "Adverb",
            example: "All visitors listened attentively.",
            icon: "👂"
          }
        ]
      },
      teacherNotes: "বঙ্গবন্ধু শেখ মুজিবুর রহমানের ২৬ মার্চের স্বাধীনতার ঘোষণার ঐতিহাসিক গুরুত্ব তুলে ধরুন।",
      quickTeachingSteps: [
        "ধাপ ১: স্বাধীনতার ঘোষণার ঐতিহাসিক প্রেক্ষাপট আলোচনা করুন।",
        "ধাপ ২: শিক্ষক ও দর্শনার্থীদের গভীর মনোযোগ ও শ্রদ্ধার অনুভূতি তুলে ধরুন।",
        "ধাপ ৩: 'listened attentively' বাক্যটি বোর্ডে অনুশীলন করান।"
      ]
    },
    {
      id: 5,
      title: "Gallery 4: Solemn Silence & Personal Belongings",
      subtitle: "গ্যালারি ৪: আমাদের বিজয়, আমাদের মূল্যবোধ — নীরব শ্রদ্ধা ও স্মৃতিচিহ্ন",
      phase: "৫. শহীদ বুদ্ধিজীবীদের স্মারক (Martyrs' Belongings)",
      duration: "৬ মিনিট",
      themeColor: "from-slate-800 to-rose-950",
      imageEmoji: "🕊️ 👓 ✒️",
      sceneType: "comprehension",
      hasVisualStage: true,
      content: {
        englishText: [
          "As we went inside 'Gallery 4 - Our Victory, Our Values', we fell silent.",
          "We were sad as we looked at the personal belongings of some of our martyred intellectuals and freedom fighters - a pair of glasses, a pen, a notebook, a money-bag, a soiled shirt and other such things."
        ],
        banglaExplanation: "যখন আমরা গ্যালারি ৪- 'আমাদের বিজয়, আমাদের মূল্যবোধ'-এর ভেতরে গেলাম, আমরা সবাই নীরব হয়ে গেলাম। আমাদের কিছু শহীদ বুদ্ধিজীবী ও মুক্তিযোদ্ধার ব্যক্তিগত জিনিসপত্র- একজোড়া চশমা, একটি কলম, একটি নোটবুক, একটি মানিব্যাগ, একটি রক্তাক্ত শার্ট ও এই ধরনের জিনিস দেখে আমরা ব্যথিত হলাম।",
        vocabulary: [
          {
            word: "intellectuals",
            syllables: ["in", "tel", "lec", "tu", "als"],
            phonetic: "/ˌɪn.təlˈek.tʃu.əlz/",
            meaning: "বুদ্ধিজীবীগণ (শিক্ষক, লেখক, ডাক্তার, সাংবাদিক)",
            partOfSpeech: "Noun",
            example: "Martyred intellectuals sacrificed their lives for Bangladesh.",
            icon: "🎓"
          },
          {
            word: "belongings",
            syllables: ["be", "long", "ings"],
            phonetic: "/bɪˈlɒŋ.ɪŋz/",
            meaning: "ব্যক্তিগত জিনিসপত্র / সামগ্রী",
            partOfSpeech: "Noun",
            example: "We saw the personal belongings of martyrs.",
            icon: "👓"
          },
          {
            word: "silent",
            syllables: ["si", "lent"],
            phonetic: "/ˈsaɪ.lənt/",
            meaning: "নীরব / নিস্তব্ধ",
            partOfSpeech: "Adjective",
            example: "Everyone fell silent in deep respect.",
            icon: "🤫"
          }
        ]
      },
      teacherNotes: "শহীদদের ব্যবহৃত সাধারণ জিনিসগুলো (চশমা, কলম, শার্ট) কেন এত মূল্যবান তা শিক্ষার্থীদের হৃদয়ঙ্গম করান।",
      quickTeachingSteps: [
        "ধাপ ১: চশমা, কলম, নোটবুক ও শার্টের প্রদর্শনী দেখান।",
        "ধাপ ২: নীরবতার মাধ্যমে গভীর শ্রদ্ধাবোধ প্রকাশের শিক্ষা দিন।",
        "ধাপ ৩: শহীদদের আত্মত্যাগের প্রতি শ্রদ্ধা জানাতে এক মিনিট নীরবতা পালন করান।"
      ]
    },
    {
      id: 6,
      title: "An Unforgettable Experience for Life",
      subtitle: "সফর সমাপ্তি ও চিরস্মরণীয় অভিজ্ঞতার অনুভূতি",
      phase: "৬. মূল্যায়ন ও আত্মোপলব্ধি (Reflections)",
      duration: "৪ মিনিট",
      themeColor: "from-emerald-700 to-green-900",
      imageEmoji: "🌟 🇧🇩 ❤️",
      sceneType: "cultural",
      hasVisualStage: true,
      content: {
        englishText: [
          "We left the museum at 12:30 p.m.",
          "It was an experience we would never forget.",
          "We returned home with pride in our freedom fighters and eternal respect for our martyrs."
        ],
        banglaExplanation: "আমরা দুপুর ১২:৩০ মিনিটে জাদুঘর ত্যাগ করলাম। এটি ছিল এমন এক অভিজ্ঞতা যা আমরা কখনোই ভুলব না। আমরা বীর মুক্তিযোদ্ধাদের প্রতি গর্ব এবং শহীদদের প্রতি চিরন্তন শ্রদ্ধা নিয়ে ঘরে ফিরলাম।",
        vocabulary: [
          {
            word: "experience",
            syllables: ["ex", "pe", "ri", "ence"],
            phonetic: "/ɪkˈspɪə.ri.əns/",
            meaning: "অভিজ্ঞতা",
            partOfSpeech: "Noun",
            example: "It was an unforgettable experience.",
            icon: "✨"
          },
          {
            word: "forget",
            syllables: ["for", "get"],
            phonetic: "/fəˈɡet/",
            meaning: "ভুলে যাওয়া",
            partOfSpeech: "Verb",
            example: "We will never forget their sacrifice.",
            icon: "🧠"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের সফরের অনুভূতি নিজেদের ভাষায় বলতে উৎসাহিত করুন।",
      quickTeachingSteps: [
        "ধাপ ১: জাদুঘর ত্যাগের সময় (দুপুর ১২:৩০) মনে করিয়ে দিন।",
        "ধাপ ২: 'never forget' কথাটির আবেগ ব্যাখ্যা করুন।",
        "ধাপ ৩: দেশের প্রতি ভালোবাসা ও দায়িত্ববোধ নিয়ে আলোচনা করুন।"
      ]
    },
    {
      id: 7,
      title: "Wrap-up & 20-Mark Companion Worksheet",
      subtitle: "পাঠ পর্যালোচনা ও পূর্ণাঙ্গ ২০ নম্বরের মূল্যায়ন ওয়ার্কশিট",
      phase: "৭. পর্যালোচনা ও মূল্যায়ন (Review & Worksheet)",
      duration: "৫ মিনিট",
      themeColor: "from-red-700 to-emerald-700",
      imageEmoji: "📝 🌟 🏆",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed the Liberation War Museum field trip lesson:",
          "• Visited the museum on 14 December (10:00 a.m. to 12:30 p.m.).",
          "• Explored 4 permanent galleries with rare photos and documents.",
          "• Listened attentively to the Declaration of Independence by Bangabandhu.",
          "• Saw the personal belongings of martyred intellectuals with deep respect.",
          "Now complete your 20-mark companion worksheet below!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা মুক্তিযুদ্ধ জাদুঘর শিক্ষাসফরের পাঠ সফলভাবে সম্পন্ন করেছ। এবার নিচের ২০ নম্বরের সঙ্গী ওয়ার্কশিটটি সমাধান করো!"
      },
      teacherNotes: "শিক্ষার্থীদের ২০ নম্বরের পূর্ণাঙ্গ সঙ্গী ওয়ার্কশিট সমাধান করতে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: পাঠের মূল তথ্যগুলো সংক্ষেপে ঝালাই করে নিন।",
        "ধাপ ২: ওয়ার্কশিট খুলে লিখতে দিন।",
        "ধাপ ৩: শিক্ষার্থীদের স্বাবলম্বীভাবে পরীক্ষা শেষ করতে বলুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 5 English Evaluation — The Liberation War Museum: A Field Trip",
    classGrade: "Class 5 (৫ম শ্রেণি)",
    subject: "English for Today (Unit 19, Lesson 1)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "matching",
        title: "Section A: Column Matching (5 Marks)",
        instruction: "Column A-এর সাথে Column B-এর সঠিক অংশের অর্থপূর্ণ মিল করো:",
        content: [
          { a: "1. The class visited the museum on", b: "a. reached the museum at 10 a.m." },
          { a: "2. The school bus", b: "b. 14 December." },
          { a: "3. There were four", c: "c. permanent galleries in the museum." },
          { a: "4. The teacher read out the Declaration", d: "d. at 12:30 p.m." },
          { a: "5. The students left the museum", e: "e. of Independence by Bangabandhu." }
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Clues (5 Marks)",
        instruction: "ক্লু বক্স থেকে উপযুক্ত শব্দ নিয়ে শূন্যস্থান পূরণ করো: [ silent, four, video, Segunbagicha, glasses ]",
        content: [
          "1. The Liberation War Museum was located at ____________, Dhaka.",
          "2. At first, the students watched a ____________ clip on the liberation war.",
          "3. There were ____________ permanent galleries in the museum.",
          "4. Inside Gallery 4, the students fell ____________ in deep respect.",
          "5. They saw a pair of ____________, a pen, and a notebook of a martyr."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে True এবং মিথ্যা হলে False লেখো:",
        content: [
          "1. The students visited the museum on 26 March. ( __________ )",
          "2. A warm guide welcomed the students at the museum. ( __________ )",
          "3. Bangabandhu's Declaration of Independence was read in Gallery 2. ( __________ )",
          "4. The students laughed and made noise inside Gallery 4. ( __________ )",
          "5. The visit was an unforgettable experience for the students. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. When and where did the class go on a field trip?\n   Answer: ________________________________________________________________",
          "2. What did the students see in Gallery 2?\n   Answer: ________________________________________________________________",
          "3. Mention three personal belongings of the martyred intellectuals seen in Gallery 4.\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// CLASS 5 - UNIT 20 - LESSON 1: LIFE IS BEAUTIFUL - MARIA'S INSPIRING STORY
// =========================================================================
export const MARIA_BEAUTIFUL_SLIDE_DECK: SlideDeck = {
  id: "maria-life-is-beautiful",
  grade: "Class 5 (৫ম শ্রেণি)",
  subject: "English for Today",
  unit: "Unit 20: Life is Beautiful",
  lesson: "Lesson 1: Life is Beautiful - Maria's Inspiring Story",
  topic: "Life is Beautiful: Maria's Story, Braille Reading & High Dreams (pp. 78–81)",
  category: "english",
  thumbnailEmoji: "🌸 ✋ 💖",
  totalSlides: 7,
  slides: [
    {
      id: 1,
      title: "A Beautiful Spring Morning: Feeling the Warmth",
      subtitle: "বসন্তের এক মনোরম সকাল: জানালায় হাত রেখে উষ্ণতা অনুভব (Activity A)",
      phase: "১. সূচনা ও পঞ্চইন্দ্রিয়ের অনুভূতি (Introduction)",
      duration: "৪ মিনিট",
      themeColor: "from-amber-600 to-rose-700",
      imageEmoji: "🌸 ☀️ 🪟",
      sceneType: "cultural",
      hasVisualStage: true,
      content: {
        englishText: [
          "It's a beautiful spring day. Maria wakes up early. She feels happy.",
          "She knows that it is a nice day because she puts her hand on the window glass. It is very warm.",
          "She opens the window and the singing of the birds fills the room."
        ],
        banglaExplanation: "এটি বসন্তের এক মনোরম দিন। মারিয়া খুব ভোরে ঘুম থেকে ওঠে। তার মন খুব আনন্দিত। সে জানে যে আজ একটি সুন্দর দিন, কারণ সে জানালার কাচে হাত রাখে। কাচটি খুব উষ্ণ। সে জানালা খুলে দেয় এবং পাখির মিষ্টি গানে ঘরটি ভরে ওঠে।",
        vocabulary: [
          {
            word: "spring",
            syllables: ["spring"],
            phonetic: "/sprɪŋ/",
            meaning: "বসন্তকাল (ঋতুরাজ)",
            partOfSpeech: "Noun",
            example: "It is a beautiful spring morning.",
            icon: "🌸"
          },
          {
            word: "warm",
            syllables: ["warm"],
            phonetic: "/wɔːm/",
            meaning: "উষ্ণ / আরামদায়ক গরম",
            partOfSpeech: "Adjective",
            example: "The window glass feels warm.",
            icon: "☀️"
          },
          {
            word: "fills",
            syllables: ["fills"],
            phonetic: "/fɪlz/",
            meaning: "পরিপূর্ণ করে দেয়",
            partOfSpeech: "Verb",
            example: "The singing of birds fills the room.",
            icon: "🐦"
          }
        ]
      },
      teacherNotes: "শিক্ষার্থীদের মারিয়ার ইন্দ্রিয়ানুভূতির বিশেষত্ব (হাত দিয়ে কাচ স্পর্শ করে উষ্ণতা বোঝা) আলোচনা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: মারিয়ার সকালের অনুভূতির দৃশ্যপট তুলে ধরুন।",
        "ধাপ ২: বসন্ত ঋতুর বৈশিষ্ট্য আলোচনা করুন।",
        "ধাপ ৩: 'spring' ও 'warm' শব্দের সঠিক উচ্চারণ অনুশীলন করান।"
      ]
    },
    {
      id: 2,
      title: "Sweet Scents & Morning Readiness for School",
      subtitle: "ফুলের সুমিষ্ট সুবাস ও বিদ্যালয়ের জন্য আনন্দময় প্রস্তুতি",
      phase: "২. প্রাত্যহিক রুটিন ও সহপাঠী জীবন (Morning Routine)",
      duration: "৫ মিনিট",
      themeColor: "from-rose-600 to-amber-700",
      imageEmoji: "🌺 🎒 🏫",
      sceneType: "comprehension",
      hasVisualStage: true,
      content: {
        englishText: [
          "She can smell the flowers outside her home. They smell sweet and fresh.",
          "After Maria gets dressed and has her breakfast, she puts her books in her bag. She is ready for school.",
          "Maria is a lot like any other students in her neighbourhood. She goes to school and likes to be with her friends."
        ],
        banglaExplanation: "সে তার বাড়ির বাইরের ফুলের সুবাস পায়। ফুলগুলো থেকে মিষ্টি ও তাজা গন্ধ আসছে। পোশাক পরা ও সকালের নাস্তা খাওয়ার পর মারিয়া তার বইগুলো ব্যাগে রাখে। সে বিদ্যালয়ের জন্য প্রস্তুত। মারিয়া তার পাড়ার অন্য যেকোনো শিক্ষার্থীর মতোই। সে বিদ্যালয়ে যায় এবং বন্ধুদের সাথে থাকতে ভালোবাসে।",
        vocabulary: [
          {
            word: "neighbourhood",
            syllables: ["neigh", "bour", "hood"],
            phonetic: "/ˈneɪ.bə.hʊd/",
            meaning: "প্রতিবেশ / পাড়া / এলাকা",
            partOfSpeech: "Noun",
            example: "She is like any other student in her neighbourhood.",
            icon: "🏡"
          },
          {
            word: "fresh",
            syllables: ["fresh"],
            phonetic: "/freʃ/",
            meaning: "তাজা / সতেজ",
            partOfSpeech: "Adjective",
            example: "The flowers smell sweet and fresh.",
            icon: "🌿"
          }
        ]
      },
      teacherNotes: "মারিয়া কীভাবে অন্য যেকোনো সাধারণ শিক্ষার্থীর মতো আনন্দ ও বন্ধুদের ভালোবাসে তা তুলে ধরুন।",
      quickTeachingSteps: [
        "ধাপ ১: মারিয়ার সকালের কাজের ধারাবাহিকতা জিজ্ঞাসা করুন।",
        "ধাপ ২: সুবাস নেওয়ার ইন্দ্রিয়ানুভূতি ব্যাখ্যা করুন।",
        "ধাপ ৩: বন্ধুদের প্রতি মারিয়ার ভালোবাসার কথা আলোচনা করুন।"
      ]
    },
    {
      id: 3,
      title: "Understanding Visual Impairment with Empathy",
      subtitle: "দৃষ্টিপ্রতিবন্ধকতা: চোখে দেখতে না পাওয়ার সীমাবদ্ধতা ও সহানুভূতি",
      phase: "৩. সংবেদনশীলতা ও সহমর্মিতা (Empathy)",
      duration: "৫ মিনিট",
      themeColor: "from-purple-700 to-indigo-800",
      imageEmoji: "👁️ 💔 🕊️",
      sceneType: "cultural",
      hasVisualStage: true,
      content: {
        englishText: [
          "But Maria cannot see the beautiful spring day.",
          "She cannot see the lovely flowers, the blue sky, or the singing birds.",
          "She cannot see the new green leaves on the trees.",
          "She cannot see these because she is visually impaired. She has been unable to see since she was born."
        ],
        banglaExplanation: "কিন্তু মারিয়া বসন্তের এই সুন্দর দিনটি দেখতে পায় না। সে সুন্দর ফুল, নীল আকাশ বা গান গাওয়া পাখিগুলো দেখতে পায় না। সে গাছের নতুন সবুজ পাতাগুলো দেখতে পায় না। সে এগুলো দেখতে পায় না কারণ সে দৃষ্টিপ্রতিবন্ধী। সে জন্মের পর থেকেই চোখে দেখতে অক্ষম।",
        vocabulary: [
          {
            word: "impaired",
            syllables: ["im", "paired"],
            phonetic: "/ɪmˈpeəd/",
            meaning: "প্রতিবন্ধী / ক্ষতিগ্রস্ত",
            partOfSpeech: "Adjective",
            example: "Maria is visually impaired.",
            icon: "👁️"
          },
          {
            word: "unable",
            syllables: ["un", "a", "ble"],
            phonetic: "/ʌnˈeɪ.bəl/",
            meaning: "অক্ষম / অসমর্থ",
            partOfSpeech: "Adjective",
            example: "She has been unable to see since birth.",
            icon: "🛡️"
          }
        ]
      },
      teacherNotes: "সহমর্মিতার সাথে 'visually impaired' (দৃষ্টিপ্রতিবন্ধী) শব্দটির যথাযথ ব্যবহার শিক্ষার্থীদের শেখান।",
      quickTeachingSteps: [
        "ধাপ ১: দৃষ্টিপ্রতিবন্ধকতা সত্ত্বেও মারিয়ার মনের প্রশান্তি তুলে ধরুন।",
        "ধাপ ২: শিক্ষার্থীদের চোখ বন্ধ করে চারপাশের শব্দ ও স্পর্শ অনুভব করতে বলুন।",
        "ধাপ ৩: বিশেষ চাহিদাসম্পন্ন সহপাঠীদের প্রতি যত্নশীল হওয়ার গুরুত্ব জানান।"
      ]
    },
    {
      id: 4,
      title: "Reading with Raised Dots: The Wonder of Braille",
      subtitle: "উঁচু বিন্দুর স্পর্শের ভাষা: ব্রেইল লিপির আবিষ্কার ও মারিয়ার পড়াশোনা",
      phase: "৪. ব্রেইল লিপি পরিচিতি (The Braille Script)",
      duration: "৬ মিনিট",
      themeColor: "from-amber-600 to-yellow-700",
      imageEmoji: "✋ ⠃ 📖",
      sceneType: "comprehension",
      hasVisualStage: true,
      content: {
        englishText: [
          "But Maria is happy. She goes to school every day.",
          "She can learn the information because she reads Braille.",
          "Braille is a script that uses raised dots. Each letter is made from dots.",
          "People move their fingers across the raised dots to read. Maria learned to read Braille as a young child."
        ],
        banglaExplanation: "কিন্তু মারিয়া সুখী। সে প্রতিদিন বিদ্যালয়ে যায়। সে তথ্য ও জ্ঞান অর্জন করতে পারে কারণ সে ব্রেইল পদ্ধতিতে পড়ে। ব্রেইল হলো এমন একটি লিপি যা উঁচু বিন্দু ব্যবহার করে। প্রতিটি অক্ষর বিন্দু দিয়ে তৈরি। মানুষ পড়ার জন্য উঁচু বিন্দুগুলোর ওপর দিয়ে তাদের আঙুল বুলিয়ে নেয়। মারিয়া ছোট বয়সেই ব্রেইল পড়তে শিখেছিল।",
        vocabulary: [
          {
            word: "Braille",
            syllables: ["Braille"],
            phonetic: "/breɪl/",
            meaning: "ব্রেইল লিপি (দৃষ্টিপ্রতিবন্ধীদের স্পর্শভিত্তিক বর্ণমালা)",
            partOfSpeech: "Noun",
            example: "Maria reads books using Braille.",
            icon: "✋"
          },
          {
            word: "script",
            syllables: ["script"],
            phonetic: "/skrɪpt/",
            meaning: "লিপি / বর্ণমালা পদ্ধতি",
            partOfSpeech: "Noun",
            example: "Braille is a special raised-dot script.",
            icon: "📜"
          },
          {
            word: "fingers",
            syllables: ["fin", "gers"],
            phonetic: "/ˈfɪŋ.ɡəz/",
            meaning: "আঙুলসমূহ",
            partOfSpeech: "Noun",
            example: "She moves her fingers across the raised dots.",
            icon: "👆"
          }
        ]
      },
      teacherNotes: "ভিজ্যুয়াল স্টেজের ব্রেইল বর্ণমালা সিমুলেটর দেখিয়ে আঙুল বুলিয়ে পড়ার বিস্ময়কর পদ্ধতি ব্যাখ্যা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: ব্রেইল বর্ণমালার উঁচু বিন্দুর গঠন প্রদর্শন করুন।",
        "ধাপ ২: লুই ব্রেইলের এই বৈপ্লবিক উদ্ভাবন সম্পর্কে সংক্ষেপে বলুন।",
        "ধাপ ৩: 'reads with raised dots' বাক্যটির অর্থ বুঝিয়ে দিন।"
      ]
    },
    {
      id: 5,
      title: "High Ambition: Going to University & Higher Studies",
      subtitle: "উচ্চশিক্ষা ও বিশ্ববিদ্যালয়ের স্বপ্ন: মারিয়ার প্রতি শিক্ষকদের আস্থা",
      phase: "৫. উচ্চশিক্ষা ও আত্মবিশ্বাস (Ambition)",
      duration: "৫ মিনিট",
      themeColor: "from-teal-600 to-blue-700",
      imageEmoji: "🎓 🏛️ 🌟",
      sceneType: "comprehension",
      hasVisualStage: true,
      content: {
        englishText: [
          "She wants to go to university one day.",
          "Her teachers think that she can.",
          "With dedication and Braille books, no dream is impossible for Maria!"
        ],
        banglaExplanation: "সে একদিন বিশ্ববিদ্যালয়ে যেতে চায়। তার শিক্ষকরা মনে করেন যে সে অবশ্যই পারবে। নিষ্ঠা ও ব্রেইল বইয়ের সহায়তায় মারিয়ার কাছে কোনো স্বপ্নই অসম্ভব নয়!",
        vocabulary: [
          {
            word: "university",
            syllables: ["u", "ni", "ver", "si", "ty"],
            phonetic: "/ˌjuː.nɪˈvɜː.sə.ti/",
            meaning: "বিশ্ববিদ্যালয় / উচ্চশিক্ষা প্রতিষ্ঠান",
            partOfSpeech: "Noun",
            example: "Maria wants to go to university one day.",
            icon: "🎓"
          },
          {
            word: "teachers",
            syllables: ["teach", "ers"],
            phonetic: "/ˈtiː.tʃəz/",
            meaning: "শিক্ষকমণ্ডলী",
            partOfSpeech: "Noun",
            example: "Her teachers believe in her ability.",
            icon: "👩‍🏫"
          }
        ]
      },
      teacherNotes: "শিক্ষকদের উৎসাহ ও আত্মবিশ্বাস শিক্ষার্থীদের বড় স্বপ্ন দেখতে কীভাবে সাহায্য করে তা আলোচনা করুন।",
      quickTeachingSteps: [
        "ধাপ ১: মারিয়ার উচ্চশিক্ষার স্বপ্ন নিয়ে কথা বলুন।",
        "ধাপ ২: শিক্ষকের উৎসাহের গুরুত্ব তুলে ধরুন।",
        "ধাপ ৩: শিক্ষার্থীদের নিজের জীবনের বড় স্বপ্ন লিখতে বলুন।"
      ]
    },
    {
      id: 6,
      title: "Becoming a Writer & Founding a School of Hope",
      subtitle: "ভবিষ্যৎ লক্ষ্য: লেখক হওয়া এবং দৃষ্টিপ্রতিবন্ধীদের জন্য বিদ্যালয় প্রতিষ্ঠা",
      phase: "৬. পরোপকার ও ভবিষ্যৎ স্বপ্ন (Noble Dreams)",
      duration: "৫ মিনিট",
      themeColor: "from-rose-600 to-pink-800",
      imageEmoji: "✍️ 🏫 💖",
      sceneType: "cultural",
      hasVisualStage: true,
      content: {
        englishText: [
          "Maria wants to set up a school of her own so that she can teach visually impaired children.",
          "Before this, Maria wants to be a writer.",
          "She wants to write a book about her feelings and experiences."
        ],
        banglaExplanation: "মারিয়া নিজের একটি বিদ্যালয় প্রতিষ্ঠা করতে চায় যাতে সে দৃষ্টিপ্রতিবন্ধী শিশুদের শিক্ষা দিতে পারে। এর আগে, মারিয়া একজন লেখক হতে চায়। সে তার অনুভূতি ও অভিজ্ঞতা নিয়ে একটি বই লিখতে চায়।",
        vocabulary: [
          {
            word: "writer",
            syllables: ["writ", "er"],
            phonetic: "/ˈraɪ.tər/",
            meaning: "লেখক / গ্রন্থকার",
            partOfSpeech: "Noun",
            example: "Maria wants to be an inspiring writer.",
            icon: "✍️"
          },
          {
            word: "experiences",
            syllables: ["ex", "pe", "ri", "en", "ces"],
            phonetic: "/ɪkˈspɪə.ri.ən.sɪz/",
            meaning: "অভিজ্ঞতাসমূহ",
            partOfSpeech: "Noun",
            example: "She wants to write about her experiences.",
            icon: "📖"
          }
        ]
      },
      teacherNotes: "মারিয়ার মহৎ লক্ষ্য—অন্য দৃষ্টিপ্রতিবন্ধী শিশুদের সেবা করা এবং লেখক হওয়া—শিক্ষার্থীদের অনুপ্রাণিত করতে বলুন।",
      quickTeachingSteps: [
        "ধাপ ১: মারিয়ার দুটি বড় ভবিষ্যৎ লক্ষ্য (লেখক হওয়া ও বিদ্যালয় গড়া) বোর্ডে লিখুন।",
        "ধাপ ২: সমাজসেবার মহত্ত্ব আলোচনা করুন।",
        "ধাপ ৩: 'Life is Beautiful' শিরোনামের সার্থকতা পর্যালোচনা করুন।"
      ]
    },
    {
      id: 7,
      title: "Grand Finale: 20-Mark Companion Worksheet",
      subtitle: "সম্পূর্ণ কারিকুলাম সফল সমাপ্তি ও চূড়ান্ত ২০ নম্বরের মূল্যায়ন",
      phase: "৭. পর্যালোচনা ও মূল্যায়ন (Review & Worksheet)",
      duration: "৫ মিনিট",
      themeColor: "from-amber-600 to-emerald-700",
      imageEmoji: "📝 🌟 🏆",
      sceneType: "quiz",
      hasVisualStage: true,
      content: {
        englishText: [
          "Congratulations! You have completed the story of Life is Beautiful:",
          "• Maria feels the warm spring day through the window and smells sweet flowers.",
          "• She is visually impaired since birth, but cheerful and loves going to school.",
          "• She reads using Braille (raised dots touched with fingertips).",
          "• Her dreams: go to university, become a writer, and build a school for children.",
          "Now solve your 20-mark companion worksheet below!"
        ],
        banglaExplanation: "অভিনন্দন! তোমরা 'লাইফ ইজ বিউটিফুল: মারিয়ার অনুপ্রেরণাদায়ী গল্প' পাঠটি সফলভাবে সম্পন্ন করেছ। এবার নিচের ২০ নম্বরের চূড়ান্ত মূল্যায়ন ওয়ার্কশিটটি সমাধান করো!"
      },
      teacherNotes: "শিক্ষার্থীদের ২০ নম্বরের পূর্ণাঙ্গ সঙ্গী ওয়ার্কশিট সমাধান করতে দিন।",
      quickTeachingSteps: [
        "ধাপ ১: পাঠের মূল শিক্ষা ও মারিয়ার প্রেরণা সংক্ষেপে পুনরাবৃত্তি করুন।",
        "ধাপ ২: ওয়ার্কশিট খুলুন।",
        "ধাপ ৩: শিক্ষার্থীদের স্বাবলম্বীভাবে পরীক্ষা শেষ করতে বলুন।"
      ]
    }
  ],
  worksheetCompanion: {
    schoolHeader: "প্রাথমিক পাঠশালা ডিজিটাল মূল্যায়ন পরীক্ষা ২০২৬",
    examTitle: "Class 5 English Evaluation — Life is Beautiful: Maria's Story",
    classGrade: "Class 5 (৫ম শ্রেণি)",
    subject: "English for Today (Unit 20, Lesson 1)",
    time: "২৫ মিনিট",
    marks: 20,
    sections: [
      {
        type: "matching",
        title: "Section A: Column Matching (5 Marks)",
        instruction: "Column A-এর সাথে Column B-এর সঠিক অংশের অর্থপূর্ণ মিল করো:",
        content: [
          { a: "1. Maria knows it is a nice day", b: "a. raised dots touched with fingers." },
          { a: "2. The singing of birds", b: "b. by feeling the warm window glass." },
          { a: "3. Maria reads books using Braille", c: "c. fills the entire room." },
          { a: "4. Braille is a script that uses", d: "d. to teach visually impaired children." },
          { a: "5. Maria wants to set up a school", e: "e. to learn information." }
        ]
      },
      {
        type: "fillBlanks",
        title: "Section B: Fill in the Blanks with Clues (5 Marks)",
        instruction: "ক্লু বক্স থেকে উপযুক্ত শব্দ নিয়ে শূন্যস্থান পূরণ করো: [ dots, writer, spring, warm, Braille ]",
        content: [
          "1. It is a beautiful ____________ day.",
          "2. The window glass feels very ____________.",
          "3. Maria reads using a special script called ____________.",
          "4. In Braille, each letter is made from raised ____________.",
          "5. Maria wants to be a ____________ and write an inspiring book."
        ]
      },
      {
        type: "trueFalse",
        title: "Section C: True or False (5 Marks)",
        instruction: "বাক্যটি সত্য হলে True এবং মিথ্যা হলে False লেখো:",
        content: [
          "1. Maria was able to see when she was a baby. ( __________ )",
          "2. Maria can smell the sweet and fresh flowers outside. ( __________ )",
          "3. Maria hates going to school and has no friends. ( __________ )",
          "4. People move their fingers across raised dots to read Braille. ( __________ )",
          "5. Maria dreams of going to university one day. ( __________ )"
        ]
      },
      {
        type: "shortQuestions",
        title: "Section D: Short Answer Questions (5 Marks)",
        instruction: "নিচের প্রশ্নগুলোর সম্পূর্ণ বাক্যে সংক্ষিপ্ত উত্তর দাও:",
        content: [
          "1. How does Maria know that it is a warm spring day?\n   Answer: ________________________________________________________________",
          "2. What is Braille and how do people read it?\n   Answer: ________________________________________________________________",
          "3. What are Maria's future dreams and goals?\n   Answer: ________________________________________________________________"
        ]
      }
    ]
  }
};

// =========================================================================
// REGISTRY OF ALL AVAILABLE SLIDE DECKS
// =========================================================================
export const SLIDE_DECKS: Record<string, SlideDeck> = {
  "maria-life-is-beautiful": MARIA_BEAUTIFUL_SLIDE_DECK,
  "liberation-war-museum": LIBERATION_WAR_MUSEUM_SLIDE_DECK,
  "hare-and-tortoise": HARE_AND_TORTOISE_SLIDE_DECK,
  "saint-martins-island": SAINT_MARTINS_SLIDE_DECK,
  "kishoreganj-district": KISHOREGANJ_DISTRICT_SLIDE_DECK,
  "raju-occupations-c5": RAJU_OCCUPATIONS_C5_SLIDE_DECK,
  "doctors-advice": DOCTORS_ADVICE_SLIDE_DECK,
  "food-pyramid": FOOD_PYRAMID_SLIDE_DECK,
  "saikats-family": SAIKATS_FAMILY_SLIDE_DECK,
  "sima-jessica": SIMA_JESSICA_SLIDE_DECK,
  "clever-crow": CLEVER_CROW_SLIDE_DECK,
  "lion-and-mouse": LION_AND_MOUSE_SLIDE_DECK,
  "reshma-worker": RESHMA_WORKER_SLIDE_DECK,
  "sreemangal-tea": SREEMANGAL_TEA_SLIDE_DECK,
  "raju-firefighter-c4": RAJU_FIREFIGHTER_C4_SLIDE_DECK,
  "traffic-safety": TRAFFIC_SAFETY_SLIDE_DECK,
  "mitas-day": MITAS_DAY_SLIDE_DECK,
  "sagar-family": SAGAR_FAMILY_SLIDE_DECK,
  "sagar-week": SAGARS_WEEK_SLIDE_DECK,
  "stationery-shop": STATIONERY_SHOP_SLIDE_DECK,
  "introducing-jerin": JERIN_INTRODUCING_DECK,
  "sabiha-family": SABIHA_FAMILY_SLIDE_DECK,
  "sunil-rahat-friends": SUNIL_RAHAT_SLIDE_DECK,
  "school-library-card": SCHOOL_LIBRARY_SLIDE_DECK,
  "breakfast-routine": BREAKFAST_FAZLE_ANITA_DECK,
  "calendar-months": CALENDAR_MONTHS_SLIDE_DECK,
  "porshi-school": PORSHI_SCHOOL_SLIDE_DECK,
  "osman-village": OSMAN_VILLAGE_SLIDE_DECK,
  "oyshi-city-life": OYSHI_CITY_SLIDE_DECK,
  "nusair-habits": NUSAIR_HABITS_SLIDE_DECK,
  "water-pollution": WATER_POLLUTION_SLIDE_DECK,
  "handwashing-steps": HANDWASHING_SLIDE_DECK,
  "inclusive-rani": INCLUSIVE_RANI_SLIDE_DECK,
  "save-water": SAVE_WATER_SLIDE_DECK,
  "hill-festival": HILL_FESTIVAL_SLIDE_DECK,
  "making-a-paper-kite": KITE_SLIDE_DECK,
  "ant-and-grasshopper": ANT_AND_GRASSHOPPER_DECK,
};

// For backward compatibility
export const PILOT_SLIDE_DECK = ANT_AND_GRASSHOPPER_DECK;
