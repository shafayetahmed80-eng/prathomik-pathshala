export interface AudioRhymeStory {
  id: string;
  classId: "pre-primary" | "class-1" | "class-2" | "class-3" | "class-4" | "class-5";
  gradeName: string;
  title: string;
  author: string;
  category: "ছড়া ও কবিতা" | "শিক্ষণীয় গল্প" | "English Rhymes";
  icon: string;
  themeColor: string;
  lines: string[];
  moralOrTheme: string;
  language: "bn-BD" | "en-US";
}

export const RHYMES_STORIES_DATA: AudioRhymeStory[] = [
  // ==========================================
  // 🧸 প্রাক-প্রাথমিক (Pre-Primary) - ৫টি আইটেম
  // ==========================================
  {
    id: "pp-1",
    classId: "pre-primary",
    title: "আতা গাছে তোতা পাখি",
    author: "প্রচলিত লোকছড়া",
    gradeName: "প্রাক-প্রাথমিক",
    category: "ছড়া ও কবিতা",
    icon: "🦜",
    themeColor: "from-pink-500 to-rose-500",
    language: "bn-BD",
    lines: [
      "আতা গাছে তোতা পাখি,",
      "ডালিম গাছে মৌ।",
      "এতো ডাকি তবু কথা,",
      "কও না কেন বউ?"
    ],
    moralOrTheme: "ছন্দ ও রসাত্মক কল্পনার মাধ্যমে শিশুদের মুখের জড়তা দূর করা।"
  },
  {
    id: "pp-2",
    classId: "pre-primary",
    title: "বাক বাকুম পায়রা",
    author: "প্রচলিত লোকছড়া",
    gradeName: "প্রাক-প্রাথমিক",
    category: "ছড়া ও কবিতা",
    icon: "🕊️",
    themeColor: "from-sky-400 to-blue-500",
    language: "bn-BD",
    lines: [
      "বাক বাকুম পায়রা,",
      "মাথায় দিয়ে টায়রা।",
      "বউ সাজবে কাল কি,",
      "চড়বে সোনার পালকি।"
    ],
    moralOrTheme: "ধ্বনি ও তালের মাধ্যমে ছন্দ সচেতনতা ও আনন্দের বিকাশ।"
  },
  {
    id: "pp-3",
    classId: "pre-primary",
    title: "চাঁদ উঠেছে ফুল ফুটেছে",
    author: "প্রচলিত লোকছড়া",
    gradeName: "প্রাক-প্রাথমিক",
    category: "ছড়া ও কবিতা",
    icon: "🌙",
    themeColor: "from-amber-400 to-orange-500",
    language: "bn-BD",
    lines: [
      "চাঁদ উঠেছে ফুল ফুটেছে,",
      "কদম তলায় কে?",
      "হাতি নাচছে ঘোড়া নাচছে,",
      "সোনামণির বে।"
    ],
    moralOrTheme: "রাতের স্নিগ্ধ রূপ ও কল্পনাপ্রবণ আনন্দের প্রকাশ।"
  },
  {
    id: "pp-4",
    classId: "pre-primary",
    title: "Twinkle Twinkle Little Star",
    author: "Jane Taylor",
    gradeName: "প্রাক-প্রাথমিক",
    category: "English Rhymes",
    icon: "⭐",
    themeColor: "from-indigo-500 to-purple-600",
    language: "en-US",
    lines: [
      "Twinkle, twinkle, little star,",
      "How I wonder what you are!",
      "Up above the world so high,",
      "Like a diamond in the sky."
    ],
    moralOrTheme: "Wonder about the beauty of nature and the night sky."
  },
  {
    id: "pp-5",
    classId: "pre-primary",
    title: "পিঁপড়া ও ঘুঘু",
    author: "ঈশপের শিক্ষণীয় নীতিকথা",
    gradeName: "প্রাক-প্রাথমিক",
    category: "শিক্ষণীয় গল্প",
    icon: "🐜",
    themeColor: "from-emerald-500 to-teal-600",
    language: "bn-BD",
    lines: [
      "এক পিঁপড়া নদীর পানিতে ডুবে যাচ্ছিল।",
      "গাছের ডালে বসে থাকা একটি দয়ালু ঘুঘু তা দেখতে পেল।",
      "ঘুঘুটি পানিতে একটি গাছের পাতা ফেলে দিল।",
      "পিঁপড়া পাতায় চড়ে নিরাপদে ডাঙায় উঠে এলো।",
      "পরদিন এক শিকারি ঘুঘুর দিকে তীর তাক করল।",
      "পিঁপড়া শিকারির পায়ে জোরে কামড় বসিয়ে দিল।",
      "তীর লক্ষ্যভ্রষ্ট হলো এবং ঘুঘুর জীবন বেঁচে গেল।"
    ],
    moralOrTheme: "অন্যের উপকার করলে বিপদের সময় নিজেও সাহায্য পাওয়া যায়।"
  },

  // ==========================================
  // 🎒 ১ম শ্রেণি (Class 1) - ৫টি আইটেম
  // ==========================================
  {
    id: "c1-1",
    classId: "class-1",
    title: "ছুটি (মেঘের কোলে রোদ হেসেছে)",
    author: "রবীন্দ্রনাথ ঠাকুর",
    gradeName: "১ম শ্রেণি",
    category: "ছড়া ও কবিতা",
    icon: "🌤️",
    themeColor: "from-amber-500 to-yellow-600",
    language: "bn-BD",
    lines: [
      "মেঘের কোলে রোদ হেসেছে,",
      "বাদল গেছে টুটি।",
      "আজ আমাদের ছুটি ও ভাই,",
      "আজ আমাদের ছুটি।"
    ],
    moralOrTheme: "প্রকৃতির মুক্ত আলো-বাতাসে শিশুর নির্মল আনন্দের প্রকাশ।"
  },
  {
    id: "c1-2",
    classId: "class-1",
    title: "মামার বাড়ি (ঝড়ের দিনে)",
    author: "জসীম উদ্‌দীন",
    gradeName: "১ম শ্রেণি",
    category: "ছড়া ও কবিতা",
    icon: "🥭",
    themeColor: "from-orange-500 to-red-500",
    language: "bn-BD",
    lines: [
      "ঝড়ের দিনে মামার দেশে,",
      "আম কুড়াতে সুখ।",
      "পাকা জামের মধুর রসে,",
      "রঙিন করি মুখ।"
    ],
    moralOrTheme: "গ্রামবাংলার প্রকৃতি, ঋতুবৈচিত্র্য ও শৈশবের নির্মল সুখ।"
  },
  {
    id: "c1-3",
    classId: "class-1",
    title: "ইটটি মারলে পাটকেলটি খেতে হয়",
    author: "প্রচলিত নীতিছড়া",
    gradeName: "১ম শ্রেণি",
    category: "ছড়া ও কবিতা",
    icon: "🧱",
    themeColor: "from-slate-600 to-slate-800",
    language: "bn-BD",
    lines: [
      "ইটটি মারলে পাটকেলটি,",
      "খেতে হয় তো ভাই।",
      "অন্যকে যে দুঃখ দিলে,",
      "সুখ তো মেলে নাই।"
    ],
    moralOrTheme: "সবার সাথে ভালো আচরণ করার ও ক্ষতি না করার নীতিশিক্ষা।"
  },
  {
    id: "c1-4",
    classId: "class-1",
    title: "Rain, Rain, Go Away",
    author: "Traditional Rhyme",
    gradeName: "১ম শ্রেণি",
    category: "English Rhymes",
    icon: "🌧️",
    themeColor: "from-sky-500 to-cyan-600",
    language: "en-US",
    lines: [
      "Rain, rain, go away,",
      "Come again another day.",
      "Little children want to play,",
      "Rain, rain, go away."
    ],
    moralOrTheme: "Joyful playfulness and cheerful expression."
  },
  {
    id: "c1-5",
    classId: "class-1",
    title: "একতাতেই বল",
    author: "প্রাচীন নীতিকথা",
    gradeName: "১ম শ্রেণি",
    category: "শিক্ষণীয় গল্প",
    icon: "🌾",
    themeColor: "from-lime-600 to-green-700",
    language: "bn-BD",
    lines: [
      "এক বৃদ্ধ কৃষকের চার ছেলে সবসময় ঝগড়া করত।",
      "একদিন কৃষক তাদের চারটি লাঠি আলাদাভাবে ভাঙতে বললেন।",
      "ছেলেরা সহজেই একটি করে লাঠি ভেঙে ফেলল।",
      "এরপর কৃষক চারটি লাঠি একসাথে বেঁধে ভাঙতে বললেন।",
      "এবার কেউই লাঠির আঁটি ভাঙতে পারল না।",
      "কৃষক বললেন: একা থাকলে দুর্বল, একসাথে থাকলে কেউ ভাঙতে পারবে না।"
    ],
    moralOrTheme: "একতাতেই মহাশক্তি, বিভেদে নেমে আসে ধ্বংস।"
  },

  // ==========================================
  // ✏️ ২য় শ্রেণি (Class 2) - ৫টি আইটেম
  // ==========================================
  {
    id: "c2-1",
    classId: "class-2",
    title: "আমাদের ছোট নদী",
    author: "রবীন্দ্রনাথ ঠাকুর",
    gradeName: "২য় শ্রেণি",
    category: "ছড়া ও কবিতা",
    icon: "⛵",
    themeColor: "from-sky-500 to-blue-600",
    language: "bn-BD",
    lines: [
      "আমাদের ছোট নদী চলে বাঁকে বাঁকে,",
      "বৈশাখ মাসে তার হাঁটু জল থাকে।",
      "পার হয়ে যায় গরু, পার হয় গাড়ি,",
      "দুই ধার উঁচু তার, ঢালু তার পাড়ি।",
      "চিক্ চিক্ করে বালি, কোথা নাই কাদা,",
      "একধারে কাশবন ফুলে ফুলে সাদা।"
    ],
    moralOrTheme: "বাংলার অপরূপ নদীমাতৃক প্রকৃতি ও গ্রামীণ সৌন্দর্যের মুগ্ধতা।"
  },
  {
    id: "c2-2",
    classId: "class-2",
    title: "প্রার্থনা",
    author: "সুফিয়া কামাল",
    gradeName: "২য় শ্রেণি",
    category: "ছড়া ও কবিতা",
    icon: "🤲",
    themeColor: "from-teal-500 to-emerald-600",
    language: "bn-BD",
    lines: [
      "তুলি দুই হাত করি মোনাজাত,",
      "হে রহিম রহমান।",
      "কত সুন্দর করিয়া ধরণী,",
      "মোদের করেছ দান।",
      "গাছে ফুল ফল নদীভরা জল,",
      "পাখির কণ্ঠে গান।"
    ],
    moralOrTheme: "স্রষ্টার অপরূপ সৃষ্টির প্রতি কৃতজ্ঞতা ও ভক্তির প্রকাশ।"
  },
  {
    id: "c2-3",
    classId: "class-2",
    title: "কাজের আনন্দ",
    author: "নবকৃষ্ণ ভট্টাচার্য",
    gradeName: "২য় শ্রেণি",
    category: "ছড়া ও কবিতা",
    icon: "🐝",
    themeColor: "from-amber-500 to-yellow-600",
    language: "bn-BD",
    lines: [
      "মৌমাছি, মৌমাছি,",
      "কোথা যাও নাচি নাচি,",
      "দাঁড়াও না একবার ভাই।",
      "ওই ফুল ফোটে বনে,",
      "যাই মধু আহরণে,",
      "দাঁড়াবার সময় তো নাই।"
    ],
    moralOrTheme: "অলসতা ত্যাগ করে সময়মতো পরিশ্রম করার অনুপ্রেরণা।"
  },
  {
    id: "c2-4",
    classId: "class-2",
    title: "আমি হব",
    author: "কাজী নজরুল ইসলাম",
    gradeName: "২য় শ্রেণি",
    category: "ছড়া ও কবিতা",
    icon: "🌅",
    themeColor: "from-rose-500 to-pink-600",
    language: "bn-BD",
    lines: [
      "আমি হব সকাল বেলার পাখি,",
      "সবার আগে কুসুম-বাগে",
      "উঠব আমি ডাকি!",
      "সূয্যিমামা জাগার আগে",
      "উঠব আমি জেগে।"
    ],
    moralOrTheme: "ভোরে ঘুম থেকে ওঠার স্বাস্থ্যকর অভ্যাস ও কর্মচাঞ্চল্য।"
  },
  {
    id: "c2-5",
    classId: "class-2",
    title: "The Thirsty Crow (বুদ্ধিমান কাক)",
    author: "Aesop's Fable",
    gradeName: "২য় শ্রেণি",
    category: "শিক্ষণীয় গল্প",
    icon: "🪶",
    themeColor: "from-blue-600 to-indigo-700",
    language: "en-US",
    lines: [
      "A thirsty crow is flying in search of water.",
      "He sees a pitcher with very little water at the bottom.",
      "His beak cannot reach the water.",
      "He sees pebbles on the ground and gets an idea.",
      "One by one, he drops pebbles into the pitcher.",
      "The water level rises to the top.",
      "The clever crow drinks water happily and flies away."
    ],
    moralOrTheme: "Where there is a will, there is a way."
  },

  // ==========================================
  // 📖 ৩য় শ্রেণি (Class 3) - ৫টি আইটেম
  // ==========================================
  {
    id: "c3-1",
    classId: "class-3",
    title: "আমাদের গ্রাম",
    author: "বন্দে আলী মিয়া",
    gradeName: "৩য় শ্রেণি",
    category: "ছড়া ও কবিতা",
    icon: "🏡",
    themeColor: "from-green-600 to-emerald-700",
    language: "bn-BD",
    lines: [
      "আমাদের ছোট গাঁয়ে ছোট ছোট ঘর,",
      "থাকি সেথা সবে মিলে কেহ নাহি পর।",
      "পাড়ার সকল ছেলে মোরা ভাই ভাই,",
      "একসাথে খেলি আর পাঠশালে যাই।",
      "হিংসা ও মারামারি কভু নাহি করি,",
      "পিতা-মাতা গুরুজনে সদা মোরা ডরি।"
    ],
    moralOrTheme: "গ্রামীণ সৌহার্দ্য, ভ্রাতৃত্ববোধ ও গুরুজনদের প্রতি শ্রদ্ধা।"
  },
  {
    id: "c3-2",
    classId: "class-3",
    title: "তালগাছ",
    author: "রবীন্দ্রনাথ ঠাকুর",
    gradeName: "৩য় শ্রেণি",
    category: "ছড়া ও কবিতা",
    icon: "🌴",
    themeColor: "from-teal-600 to-cyan-700",
    language: "bn-BD",
    lines: [
      "তালগাছ এক পায়ে দাঁড়িয়ে,",
      "সব গাছ ছাড়িয়ে,",
      "উঁকি মারে আকাশে।",
      "মনে সাধ, কালো মেঘ ফুঁড়ে যায়,",
      "একেবারে উড়ে যায়;",
      "কোথা পাবে পাখা সে?"
    ],
    moralOrTheme: "উচ্চাকাঙ্ক্ষার স্বপ্ন ও মাটির প্রতি ভালোবাসার শিক্ষা।"
  },
  {
    id: "c3-3",
    classId: "class-3",
    title: "The Ant and the Grasshopper",
    author: "Aesop's Fable (Unit 8)",
    gradeName: "৩য় শ্রেণি",
    category: "English Rhymes",
    icon: "🐜",
    themeColor: "from-amber-500 to-orange-600",
    language: "en-US",
    lines: [
      "An ant and a grasshopper are two good friends.",
      "It is a sunny summer morning.",
      "The grasshopper is dancing and singing happily.",
      "The ant is carrying corn to her house.",
      "The grasshopper laughs and says, 'Why do you work hard all the time?'",
      "The ant replies, 'Winter is coming. Let's collect food together.'",
      "When cold winter comes, the grasshopper finds no food and becomes sad.",
      "The ant has plenty of food in her cozy home.",
      "Moral: Work hard today, enjoy tomorrow!"
    ],
    moralOrTheme: "সময়ের কাজ সময়ে করা এবং ভবিষ্যতের জন্য প্রস্তুতি নেওয়ার নীতিশিক্ষা।"
  },
  {
    id: "c3-4",
    classId: "class-3",
    title: "কুহু ও কেকা",
    author: "সত্যেন্দ্রনাথ দত্ত",
    gradeName: "৩য় শ্রেণি",
    category: "ছড়া ও কবিতা",
    icon: "🦚",
    themeColor: "from-violet-600 to-purple-700",
    language: "bn-BD",
    lines: [
      "কুহু কুহু কোকিল ডাকে,",
      "বসে আমের ডালে।",
      "কেকা ডাকে ময়ূর নাচে,",
      "নূপুর বাজে তালে।",
      "প্রকৃতি হাসে রূপের সাজে,",
      "রঙিন সকাল বেলা।"
    ],
    moralOrTheme: "পাখিদের সুরের মূর্ছনা ও বাংলার প্রাণবৈচিত্র্যের সৌন্দর্য।"
  },
  {
    id: "c3-5",
    classId: "class-3",
    title: "মিথ্যাবাদী রাখাল (The Boy Who Cried Wolf)",
    author: "প্রাচীন শিক্ষণীয় নীতিকথা",
    gradeName: "৩য় শ্রেণি",
    category: "শিক্ষণীয় গল্প",
    icon: "🐺",
    themeColor: "from-red-600 to-rose-700",
    language: "bn-BD",
    lines: [
      "এক রাখাল বালক মাঠে ভেড়া চড়াত।",
      "একদিন মজা করতে সে চিৎকার করে বলল: বাঘ এসেছে! বাঘ এসেছে!",
      "গ্রামবাসীরা লাঠিসোঁটা নিয়ে ছুটে এলো কিন্তু কোনো বাঘ দেখল না।",
      "রাখাল হাসতে হাসতে বলল, আমি মিথ্যা বলেছি!",
      "কয়েকদিন পর সত্যি সত্যিই এক হিংস্র বাঘ এলো।",
      "রাখাল চিৎকার করে সাহায্য চাইল, কিন্তু কেউ আর বিশ্বাস করে এলো না।",
      "বাঘ রাখালের অনেকগুলো ভেড়া মেরে ফেলল।"
    ],
    moralOrTheme: "মিথ্যাবাদীকে সত্যি বললেও কেউ বিশ্বাস করে না।"
  },

  // ==========================================
  // 🔬 ৪র্থ শ্রেণি (Class 4) - ৫টি আইটেম
  // ==========================================
  {
    id: "c4-1",
    classId: "class-4",
    title: "চল্ চল্ চল্ (রণসঙ্গীত)",
    author: "কাজী নজরুল ইসলাম",
    gradeName: "৪র্থ শ্রেণি",
    category: "ছড়া ও কবিতা",
    icon: "🥁",
    themeColor: "from-emerald-600 to-teal-700",
    language: "bn-BD",
    lines: [
      "চল্ চল্ চল্!",
      "ঊর্ধ্ব গগনে বাজে মাদল,",
      "নিম্নে উতলা ধরণী তল,",
      "অরুণ প্রাতের তরুণ দল,",
      "চল্ রে চল্ রে চল্!",
      "চল্ চল্ চল্।"
    ],
    moralOrTheme: "দেশপ্রেম, তারুণ্যের উদ্দীপনা ও অদম্য সাহসিকতার চেতনা।"
  },
  {
    id: "c4-2",
    classId: "class-4",
    title: "মুক্তির ছড়া",
    author: "সানাউল হক",
    gradeName: "৪র্থ শ্রেণি",
    category: "ছড়া ও কবিতা",
    icon: "🇧🇩",
    themeColor: "from-red-600 to-emerald-700",
    language: "bn-BD",
    lines: [
      "আমার বাংলা তোমার বাংলা,",
      "সোনার বাংলাদেশ।",
      "সবুজ শ্যামল রূপের তাহার,",
      "নাইকো কোনো শেষ।",
      "লাখো শহীদের রক্তে লেখা,",
      "মুক্তির ইতিহাস।"
    ],
    moralOrTheme: "১৯৭১-এর মুক্তিযুদ্ধ ও শহীদদের আত্মত্যাগের মহিমা।"
  },
  {
    id: "c4-3",
    classId: "class-4",
    title: "পালকির গান",
    author: "সত্যেন্দ্রনাথ দত্ত",
    gradeName: "৪র্থ শ্রেণি",
    category: "ছড়া ও কবিতা",
    icon: "🛖",
    themeColor: "from-amber-600 to-yellow-700",
    language: "bn-BD",
    lines: [
      "পালকি চলে! পালকি চলে!",
      "গগন তলে আগুন জ্বলে।",
      "স্তব্ধ গাঁয়ে আদুল গায়ে,",
      "যাচ্ছে কারা রৌদ্রে ধায়ে?",
      "বেহারা কয়, হুংকার দেয়,",
      "হুপ হুপা হুপ পথ ছেড়ে দে।"
    ],
    moralOrTheme: "বাংলার লোকজ সংস্কৃতি ও দুপুর বেলার বাস্তব চিত্র।"
  },
  {
    id: "c4-4",
    classId: "class-4",
    title: "The Lion and the Mouse",
    author: "Aesop's Fable",
    gradeName: "৪র্থ শ্রেণি",
    category: "English Rhymes",
    icon: "🦁",
    themeColor: "from-amber-600 to-orange-700",
    language: "en-US",
    lines: [
      "A mighty lion is sleeping peacefully in the forest.",
      "A tiny mouse runs over his nose and wakes him up.",
      "The angry lion catches the mouse with his big paw.",
      "The mouse cries, 'Please forgive me! I may help you someday.'",
      "The lion laughs and lets the little mouse go.",
      "Days later, the lion gets caught in a hunter's strong net.",
      "The tiny mouse hears his roar and chews the ropes quickly.",
      "The lion becomes free and thanks his little friend."
    ],
    moralOrTheme: "Even small friends can be of great help."
  },
  {
    id: "c4-5",
    classId: "class-4",
    title: "সততার পুরস্কার (কাঠুরে ও জলপরী)",
    author: "লোকনীতিকথা",
    gradeName: "৪র্থ শ্রেণি",
    category: "শিক্ষণীয় গল্প",
    icon: "🪓",
    themeColor: "from-blue-600 to-cyan-700",
    language: "bn-BD",
    lines: [
      "এক দরিদ্র কাঠুরে নদীর পাড়ে কাঠ কাটছিল।",
      "হঠাৎ তার লোহার কুঠারটি গভীর পানিতে পড়ে গেল।",
      "কাঠুরে কাঁদতে লাগলে জলপরী পানি থেকে উঠে এলো।",
      "জলপরী প্রথমে একটি সোনার কুঠার দেখিয়ে বলল: এটা কি তোমার?",
      "কাঠুরে সৎভাবে বলল: না, এটা আমার নয়।",
      "এরপর রূপার কুঠারও কাঠুরে ফিরিয়ে দিল।",
      "শেষে নিজের লোহার কুঠার দেখে সে আনন্দে বলল: হ্যাঁ, এটা আমার!",
      "জলপরী তার সততায় মুগ্ধ হয়ে তিনটি কুঠারই উপহার দিল।"
    ],
    moralOrTheme: "সততাই সর্বোৎকৃষ্ট পন্থা ও প্রকৃত সম্পদ।"
  },

  // ==========================================
  // 🚀 ৫ম শ্রেণি (Class 5) - ৫টি আইটেম
  // ==========================================
  {
    id: "c5-1",
    classId: "class-5",
    title: "সংকল্প",
    author: "কাজী নজরুল ইসলাম",
    gradeName: "৫ম শ্রেণি",
    category: "ছড়া ও কবিতা",
    icon: "🚀",
    themeColor: "from-purple-600 to-indigo-700",
    language: "bn-BD",
    lines: [
      "থাকব না কো বদ্ধ ঘরে,",
      "দেখব এবার জগৎটাকে,",
      "কেমন করে ঘুরছে মানুষ",
      "যুগান্তরের ঘূর্ণিপাকে।",
      "দেশ হতে দেশ দেশান্তরে",
      "ছুটছে তারা কেমন করে।"
    ],
    moralOrTheme: "অজানাকে জানার কৌতূহল, বিজ্ঞানমনস্কতা ও বিশ্বজয়ের সংকল্প।"
  },
  {
    id: "c5-2",
    classId: "class-5",
    title: "স্বদেশ",
    author: "আহসান হাবীব",
    gradeName: "৫ম শ্রেণি",
    category: "ছড়া ও কবিতা",
    icon: "🌾",
    themeColor: "from-emerald-600 to-green-700",
    language: "bn-BD",
    lines: [
      "এই যে নদী, নদীর জোয়ার,",
      "নৌকা সারে সারে,",
      "একলা বসে আপন মনে",
      "বসে নদীর ধারে—",
      "এই ছবিটি চেনা।"
    ],
    moralOrTheme: "মাতৃভূমির স্নিগ্ধ চিত্র রূপ ও স্বদেশপ্রেমের গভীর অনুভূতি।"
  },
  {
    id: "c5-3",
    classId: "class-5",
    title: "ফেব্রুয়ারির গান",
    author: "লুৎফর রহমান রিটন",
    gradeName: "৫ম শ্রেণি",
    category: "ছড়া ও কবিতা",
    icon: "🌺",
    themeColor: "from-rose-600 to-pink-700",
    language: "bn-BD",
    lines: [
      "দোয়েল কোয়েল ময়না শ্যামা,",
      "সবার মুখে গান।",
      "সবার গানে মধুর সুরে,",
      "জুড়ায় যেন প্রাণ।",
      "একুশ আমাদের অহংকার,",
      "ভাষাশহীদের দান।"
    ],
    moralOrTheme: "মাতৃভাষার মর্যাদা ও রক্তঝরা একুশের অমর চেতনা।"
  },
  {
    id: "c5-4",
    classId: "class-5",
    title: "রৌদ্র লেখে জয়",
    author: "শামসুর রাহমান",
    gradeName: "৫ম শ্রেণি",
    category: "ছড়া ও কবিতা",
    icon: "☀️",
    themeColor: "from-amber-600 to-red-600",
    language: "bn-BD",
    lines: [
      "বর্গি এলো খাঁজনা নিতে,",
      "মারল মানুষ কত।",
      "পুড়ল শহর, পুড়ল শ্যামল,",
      "গ্রাম যে শত শত।",
      "হানাদারের সেই দানবের,",
      "রক্তে হলো লয়।"
    ],
    moralOrTheme: "অন্যায়ের বিরুদ্ধে রুখে দাঁড়ানো ও জাতীয় বিজয়ের আনন্দ।"
  },
  {
    id: "c5-5",
    classId: "class-5",
    title: "The Hare and the Tortoise",
    author: "Aesop's Fable (Unit 14)",
    gradeName: "৫ম শ্রেণি",
    category: "English Rhymes",
    icon: "🐢",
    themeColor: "from-teal-600 to-emerald-700",
    language: "en-US",
    lines: [
      "A speedy hare laughs at a slow-moving tortoise.",
      "The tortoise smiles and challenges him to a race.",
      "The hare runs fast and gets far ahead.",
      "Proud and confident, the hare sleeps under a tree.",
      "The tortoise keeps walking slowly and steadily without stopping.",
      "When the hare wakes up, the tortoise is already crossing the finish line.",
      "Moral: Slow and steady wins the race!"
    ],
    moralOrTheme: "ধৈর্য, একনিষ্ঠ প্রচেষ্টা ও অহংকারমুক্ত থাকার শিক্ষা।"
  }
];
