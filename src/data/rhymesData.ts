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
  {
    "id": "pp-1",
    "classId": "pre-primary",
    "title": "আতা গাছে তোতা পাখি",
    "author": "প্রচলিত লোকছড়া",
    "gradeName": "প্রাক-প্রাথমিক",
    "category": "ছড়া ও কবিতা",
    "icon": "🦜",
    "themeColor": "from-pink-500 to-rose-500",
    "language": "bn-BD",
    "lines": [
      "আতা গাছে তোতা পাখি,",
      "ডালিম গাছে মৌ।",
      "এতো ডাকি তবু কথা,",
      "কও না কেন বউ?"
    ],
    "moralOrTheme": "ছন্দ ও রসাত্মক কল্পনার মাধ্যমে শিশুদের মুখের জড়তা দূর করা।"
  },
  {
    "id": "pp-2",
    "classId": "pre-primary",
    "title": "বাক বাকুম পায়রা",
    "author": "প্রচলিত লোকছড়া",
    "gradeName": "প্রাক-প্রাথমিক",
    "category": "ছড়া ও কবিতা",
    "icon": "🕊️",
    "themeColor": "from-sky-400 to-blue-500",
    "language": "bn-BD",
    "lines": [
      "বাক বাকুম পায়রা,",
      "মাথায় দিয়ে টায়রা।",
      "বউ সাজবে কাল কি,",
      "চড়বে সোনার পালকি।"
    ],
    "moralOrTheme": "ধ্বনি ও তালের মাধ্যমে ছন্দ সচেতনতা ও আনন্দের বিকাশ।"
  },
  {
    "id": "pp-3",
    "classId": "pre-primary",
    "title": "চাঁদ উঠেছে ফুল ফুটেছে",
    "author": "প্রচলিত লোকছড়া",
    "gradeName": "প্রাক-প্রাথমিক",
    "category": "ছড়া ও কবিতা",
    "icon": "🌙",
    "themeColor": "from-amber-400 to-orange-500",
    "language": "bn-BD",
    "lines": [
      "চাঁদ উঠেছে ফুল ফুটেছে,",
      "কদম তলায় কে?",
      "হাতি নাচছে ঘোড়া নাচছে,",
      "সোনামণির বে।"
    ],
    "moralOrTheme": "রাতের স্নিগ্ধ রূপ ও কল্পনাপ্রবণ আনন্দের প্রকাশ।"
  },
  {
    "id": "pp-4",
    "classId": "pre-primary",
    "title": "খোকন খোকন ডাক পাড়ি",
    "author": "প্রচলিত লোকছড়া",
    "gradeName": "প্রাক-প্রাথমিক",
    "category": "ছড়া ও কবিতা",
    "icon": "👶",
    "themeColor": "from-purple-500 to-indigo-600",
    "language": "bn-BD",
    "lines": [
      "খোকন খোকন ডাক পাড়ি,",
      "খোকন মোদের কার?",
      "না-খাওনেওয়ালা খোকন সোনা,",
      "দশ কাঠারও ধার।",
      "আয় রে খোকন ঘরে আয়,",
      "দুধ-ভাত মেখে দেব তোমায়।"
    ],
    "moralOrTheme": "বাৎসল্য স্নেহ ও পরিবারের মমতাময়ী বন্ধন।"
  },
  {
    "id": "pp-5",
    "classId": "pre-primary",
    "title": "ভোর হলো দোর খোলো",
    "author": "কাজী নজরুল ইসলাম",
    "gradeName": "প্রাক-প্রাথমিক",
    "category": "ছড়া ও কবিতা",
    "icon": "🌅",
    "themeColor": "from-amber-500 to-yellow-600",
    "language": "bn-BD",
    "lines": [
      "ভোর হলো দোর খোলো,",
      "খুকুমণি ওঠ রে!",
      "ঐ ডাকে জুঁই-শাখে,",
      "ফুলখুকি ছোট রে!",
      "খুকুমণি ওঠ রে!"
    ],
    "moralOrTheme": "ভোরের নির্মল আলো ও প্রকৃতির জাগরণের আনন্দ।"
  },
  {
    "id": "pp-6",
    "classId": "pre-primary",
    "title": "হাট্টিমা টিম টিম",
    "author": "রোকনুজ্জামান খান",
    "gradeName": "প্রাক-প্রাথমিক",
    "category": "ছড়া ও কবিতা",
    "icon": "🐦",
    "themeColor": "from-emerald-500 to-teal-600",
    "language": "bn-BD",
    "lines": [
      "হাট্টিমা টিম টিম,",
      "তারা মাঠে পাড়ে ডিম।",
      "তাদের খাঁড়া দুটো শিং,",
      "তারা হাট্টিমা টিম টিম।"
    ],
    "moralOrTheme": "হাস্যরস ও কল্পনাশক্তির সৃষ্টিশীল বিকাশ।"
  },
  {
    "id": "pp-7",
    "classId": "pre-primary",
    "title": "Twinkle Twinkle Little Star",
    "author": "Jane Taylor",
    "gradeName": "প্রাক-প্রাথমিক",
    "category": "English Rhymes",
    "icon": "⭐",
    "themeColor": "from-indigo-500 to-purple-600",
    "language": "en-US",
    "lines": [
      "Twinkle, twinkle, little star,",
      "How I wonder what you are!",
      "Up above the world so high,",
      "Like a diamond in the sky."
    ],
    "moralOrTheme": "Wonder about the beauty of nature and the night sky."
  },
  {
    "id": "pp-8",
    "classId": "pre-primary",
    "title": "Clap Your Hands",
    "author": "Traditional Action Song",
    "gradeName": "প্রাক-প্রাথমিক",
    "category": "English Rhymes",
    "icon": "👏",
    "themeColor": "from-blue-500 to-cyan-600",
    "language": "en-US",
    "lines": [
      "Clap, clap, clap your hands,",
      "Clap your hands together.",
      "Stamp, stamp, stamp your feet,",
      "Stamp your feet together.",
      "Smile, smile, smile around,",
      "Smile around together."
    ],
    "moralOrTheme": "Physical coordination, joyful movement and motor skill development."
  },
  {
    "id": "pp-9",
    "classId": "pre-primary",
    "title": "Baa Baa Black Sheep",
    "author": "Traditional Rhyme",
    "gradeName": "প্রাক-প্রাথমিক",
    "category": "English Rhymes",
    "icon": "🐑",
    "themeColor": "from-slate-600 to-slate-800",
    "language": "en-US",
    "lines": [
      "Baa, baa, black sheep,",
      "Have you any wool?",
      "Yes, sir, yes, sir,",
      "Three bags full.",
      "One for the master,",
      "And one for the dame,",
      "And one for the little boy",
      "Who lives down the lane."
    ],
    "moralOrTheme": "Rhythm, polite sharing and community friendship."
  },
  {
    "id": "pp-10",
    "classId": "pre-primary",
    "title": "পিঁপড়া ও ঘুঘু",
    "author": "ঈশপের শিক্ষণীয় নীতিকথা",
    "gradeName": "প্রাক-প্রাথমিক",
    "category": "শিক্ষণীয় গল্প",
    "icon": "🐜",
    "themeColor": "from-emerald-600 to-green-700",
    "language": "bn-BD",
    "lines": [
      "এক পিঁপড়া নদীর পানিতে ডুবে যাচ্ছিল।",
      "গাছের ডালে বসে থাকা একটি দয়ালু ঘুঘু তা দেখতে পেল।",
      "ঘুঘুটি পানিতে একটি গাছের পাতা ফেলে দিল।",
      "পিঁপড়া পাতায় চড়ে নিরাপদে ডাঙায় উঠে এলো।",
      "পরদিন এক শিকারি ঘুঘুর দিকে তীর তাক করল।",
      "পিঁপড়া শিকারির পায়ে জোরে কামড় বসিয়ে দিল।",
      "তীর লক্ষ্যভ্রষ্ট হলো এবং ঘুঘুর জীবন বেঁচে গেল।"
    ],
    "moralOrTheme": "অন্যের উপকার করলে বিপদের সময় নিজেও সাহায্য পাওয়া যায়।"
  },
  {
    "id": "c1-1",
    "classId": "class-1",
    "title": "ইতল বিতল",
    "author": "সুফিয়া কামাল (পাঠ ১৭, পৃ. ২৪)",
    "gradeName": "১ম শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🐸",
    "themeColor": "from-emerald-500 to-teal-600",
    "language": "bn-BD",
    "lines": [
      "ইতল বিতল গাছের পাতা,",
      "গাছের তলায় ব্যাঙের ছাতা।",
      "বৃষ্টি পড়ে ভাঙে ছাতা,",
      "ডোবায় ডুবে ব্যাঙের মাথা।"
    ],
    "moralOrTheme": "বৃষ্টির রূপ ও প্রকৃতির ছন্দময় সৌন্দর্য উপভোগ।"
  },
  {
    "id": "c1-2",
    "classId": "class-1",
    "title": "ভোর হলো",
    "author": "কাজী নজরুল ইসলাম (পাঠ ৪২, পৃ. ৬০)",
    "gradeName": "১ম শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🌸",
    "themeColor": "from-amber-500 to-orange-500",
    "language": "bn-BD",
    "lines": [
      "ভোর হলো দোর খোলো,",
      "খুকুমণি ওঠ রে!",
      "ঐ ডাকে জুঁই-শাখে,",
      "ফুলখুকি ছোট রে!",
      "খুকুমণি ওঠ রে!"
    ],
    "moralOrTheme": "ভোরে ঘুম থেকে ওঠার স্বাস্থ্যকর অভ্যাস ও প্রফুল্লতা।"
  },
  {
    "id": "c1-3",
    "classId": "class-1",
    "title": "মামার বাড়ি",
    "author": "জসীম উদ্‌দীন (পাঠ ৪০, পৃ. ৫৭)",
    "gradeName": "১ম শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🥭",
    "themeColor": "from-orange-500 to-red-500",
    "language": "bn-BD",
    "lines": [
      "ঝড়ের দিনে মামার দেশে,",
      "আম কুড়াতে সুখ।",
      "পাকা জামের মধুর রসে,",
      "রঙিন করি মুখ।"
    ],
    "moralOrTheme": "গ্রামবাংলার প্রকৃতি, ঋতুবৈচিত্র্য ও শৈশবের নির্মল সুখ।"
  },
  {
    "id": "c1-4",
    "classId": "class-1",
    "title": "ছুটি",
    "author": "রবীন্দ্রনাথ ঠাকুর (পাঠ ৪৮, পৃ. ৭০)",
    "gradeName": "১ম শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🌤️",
    "themeColor": "from-sky-400 to-blue-500",
    "language": "bn-BD",
    "lines": [
      "মেঘের কোলে রোদ হেসেছে,",
      "বাদল গেছে টুটি।",
      "আজ আমাদের ছুটি ও ভাই,",
      "আজ আমাদের ছুটি।"
    ],
    "moralOrTheme": "প্রকৃতির মুক্ত আলো-বাতাসে শিশুর নির্মল আনন্দের প্রকাশ।"
  },
  {
    "id": "c1-5",
    "classId": "class-1",
    "title": "আমাদের দেশ",
    "author": "আ ন ম বযলুর রশীদ (পাঠ ৪৯, পৃ. ৭১)",
    "gradeName": "১ম শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🇧🇩",
    "themeColor": "from-green-600 to-emerald-700",
    "language": "bn-BD",
    "lines": [
      "আমাদের দেশ তারে কত ভালোবাসি,",
      "সবুজ ঘাসের বুকে শেফালির হাসি।",
      "মাঠে মাঠে চরে গরু নদী বয়ে যায়,",
      "জেলে ভাই ধরে মাছ মেঘের ছায়ায়।"
    ],
    "moralOrTheme": "স্বদেশের সবুজ প্রকৃতি ও শ্রমজীবী মানুষের প্রতি ভালোবাসা।"
  },
  {
    "id": "c1-6",
    "classId": "class-1",
    "title": "ট্রেন",
    "author": "প্রচলিত ছড়া (পাঠ ২৫, পৃ. ৩৬)",
    "gradeName": "১ম শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🚂",
    "themeColor": "from-violet-500 to-purple-600",
    "language": "bn-BD",
    "lines": [
      "ঝকঝকাঝক ট্রেন চলেছে,",
      "রাত দুপুরে বাঁশি বাজে।",
      "একটু জিরোয় আবার ছোটে,",
      "মাঠ পেরিয়ে বন পেরোলে।"
    ],
    "moralOrTheme": "শব্দালংকার, গতিশীল তাল ও ভ্রমণের আনন্দ।"
  },
  {
    "id": "c1-7",
    "classId": "class-1",
    "title": "Two Little Blackbirds",
    "author": "English for Today (Unit 1, Lesson 6, p. 9)",
    "gradeName": "১ম শ্রেণি",
    "category": "English Rhymes",
    "icon": "🐦",
    "themeColor": "from-slate-700 to-slate-900",
    "language": "en-US",
    "lines": [
      "Two little blackbirds sitting on a hill,",
      "One named Jack and one named Jill.",
      "Fly away Jack, fly away Jill,",
      "Come back Jack, come back Jill."
    ],
    "moralOrTheme": "Spatial awareness, names, and direction words (away and back)."
  },
  {
    "id": "c1-8",
    "classId": "class-1",
    "title": "The Alphabet Song",
    "author": "English for Today (Unit 2, Lesson 1, p. 12)",
    "gradeName": "১ম শ্রেণি",
    "category": "English Rhymes",
    "icon": "🔤",
    "themeColor": "from-blue-600 to-indigo-600",
    "language": "en-US",
    "lines": [
      "A B C D E F G,",
      "H I J K L M N O P,",
      "Q R S, T U V,",
      "W X, Y and Z.",
      "Now I know my A B C,",
      "Next time won't you sing with me?"
    ],
    "moralOrTheme": "Alphabet mastery through melodic phonics and cheerful singing."
  },
  {
    "id": "c1-9",
    "classId": "class-1",
    "title": "Two Little Hands",
    "author": "English for Today (Unit 2, Lesson 5, p. 22)",
    "gradeName": "১ম শ্রেণি",
    "category": "English Rhymes",
    "icon": "🖐️",
    "themeColor": "from-pink-500 to-rose-600",
    "language": "en-US",
    "lines": [
      "Two little hands to clap, clap, clap,",
      "Two little feet to tap, tap, tap.",
      "Two little eyes are open wide,",
      "One little head goes side to side."
    ],
    "moralOrTheme": "Body parts awareness and action movement."
  },
  {
    "id": "c1-10",
    "classId": "class-1",
    "title": "Animal Sounds",
    "author": "English for Today (Unit 5, Lesson 1, p. 86)",
    "gradeName": "১ম শ্রেণি",
    "category": "English Rhymes",
    "icon": "🐶",
    "themeColor": "from-amber-500 to-orange-600",
    "language": "en-US",
    "lines": [
      "Bow-wow, says the dog,",
      "Mew-mew, says the cat.",
      "Grunt, grunt, goes the hog,",
      "And squeak goes the rat."
    ],
    "moralOrTheme": "Animal awareness and playful phonetic sounds."
  },
  {
    "id": "c1-11",
    "classId": "class-1",
    "title": "বাঘ ও রাখাল",
    "author": "শিক্ষণীয় গল্প (পাঠ ৯, পৃ. ১২)",
    "gradeName": "১ম শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "🐅",
    "themeColor": "from-amber-600 to-red-600",
    "language": "bn-BD",
    "lines": [
      "এক রাখাল ছেলে মাঠে গরু চরাত।",
      "একদিন সে দুষ্টুমি করে চিৎকার করল—'বাঘ এসেছে! বাঘ এসেছে!'",
      "গ্রামের মানুষ লাঠিসোঁটা নিয়ে ছুটে এলো। এসে দেখল কোনো বাঘ নেই, রাখাল হাসছে।",
      "কয়েকদিন পর সত্যি সত্যিই এক বাঘ এলো।",
      "রাখাল ভয়ে চিৎকার করল—'বাঘ! বাঁচাও!'",
      "কিন্তু কেউ আর তার কথায় বিশ্বাস করল না এবং সাহায্য করতে এলো না।",
      "বাঘটি রাখালের ক্ষতি করল। রাখাল বুঝল মিথ্যা বলা কতটা ক্ষতিকর।"
    ],
    "moralOrTheme": "মিথ্যাবাদীকে কেউ বিশ্বাস করে না, সবসময় সত্য কথা বলা উচিত।"
  },
  {
    "id": "c1-12",
    "classId": "class-1",
    "title": "পিঁপড়া ও পায়রার গল্প",
    "author": "শিক্ষণীয় গল্প (পাঠ ৪৬, পৃ. ৬৭)",
    "gradeName": "১ম শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "🕊️",
    "themeColor": "from-teal-500 to-emerald-600",
    "language": "bn-BD",
    "lines": [
      "নদীর পাড়ে গাছের ডালে এক পায়রা বসে ছিল।",
      "সে দেখল একটি ছোট্ট পিঁপড়া পানিতে ভেসে যাচ্ছে।",
      "পায়রাটি ঝটপট একটি পাতা ফেলে পিঁপড়াকে বাঁচাল।",
      "পরদিন এক শিকারি পায়রাকে লক্ষ্য করে তীর ছুড়তে চাইল।",
      "পিঁপড়াটি শিকারির পায়ে কামড় দিল। শিকারির তীর লক্ষ্যভ্রষ্ট হলো।",
      "পায়রাটি উড়ে বেঁচে গেল এবং দুই বন্ধু সুখে রইল।"
    ],
    "moralOrTheme": "উপকারের প্রতিদান সবসময় মঙ্গল বয়ে আনে।"
  },
  {
    "id": "c1-13",
    "classId": "class-1",
    "title": "মাছের রাজা",
    "author": "রূপকথা (পাঠ ৫০, পৃ. ৭৩)",
    "gradeName": "১ম শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "🐟",
    "themeColor": "from-cyan-500 to-blue-600",
    "language": "bn-BD",
    "lines": [
      "নদীতে ছিল ছোট-বড় অনেক মাছ।",
      "সবাই মিলে সিদ্ধান্ত নিল তারা একজন রাজা নির্বাচন করবে।",
      "রুপালি ইলিশ বলল—'আমি পদ্মার রাজা, আমি সবাইকে মিষ্টি গান শোনাব।'",
      "বোয়াল মাছ বলল—'আমি সবচেয়ে শক্তিশালী, আমি বিপদ থেকে রক্ষা করব।'",
      "সবাই মিলে শান্তিতে একসঙ্গে থাকার অঙ্গীকার করল।"
    ],
    "moralOrTheme": "শান্তি, ঐক্য এবং পারস্পরিক সহযোগিতার মূল্য।"
  },
  {
    "id": "c2-1",
    "classId": "class-2",
    "title": "আমাদের ছোটো নদী",
    "author": "রবীন্দ্রনাথ ঠাকুর (পাঠ ২৩, পৃ. ৫০)",
    "gradeName": "২য় শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🌊",
    "themeColor": "from-sky-500 to-cyan-600",
    "language": "bn-BD",
    "lines": [
      "আমাদের ছোটো নদী চলে বাঁকে বাঁকে,",
      "বৈশাখ মাসে তার হাঁটু জল থাকে।",
      "পার হয়ে যায় গরু, পার হয় গাড়ি,",
      "দুই ধার উঁচু তার, ঢালু তার পাড়ি।"
    ],
    "moralOrTheme": "গ্রামবাংলার নদীমাতৃক প্রাকৃতিক রূপ ও সাধারণ মানুষের জীবনচিত্র।"
  },
  {
    "id": "c2-2",
    "classId": "class-2",
    "title": "কাজের আনন্দ",
    "author": "নবকৃষ্ণ ভট্টাচার্য (পাঠ ১৫, পৃ. ৩০)",
    "gradeName": "২য় শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🐝",
    "themeColor": "from-amber-400 to-orange-500",
    "language": "bn-BD",
    "lines": [
      "মৌমাছি, মৌমাছি, কোথা যাও নাচি নাচি,",
      "দাঁড়াও না একবার ভাই।",
      "ওই ফুল ফোটে বনে যাই মধু আহরণে,",
      "দাঁড়াবার সময় তো নাই।"
    ],
    "moralOrTheme": "পরিশ্রম, সময়ের সদ্ব্যবহার ও কর্মোদ্যোগের প্রেরণা।"
  },
  {
    "id": "c2-3",
    "classId": "class-2",
    "title": "প্রজাপতি",
    "author": "কাজী নজরুল ইসলাম (পাঠ ১৯, পৃ. ৩৮)",
    "gradeName": "২য় শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🦋",
    "themeColor": "from-fuchsia-500 to-pink-600",
    "language": "bn-BD",
    "lines": [
      "প্রজাপতি প্রজাপতি, কোথায় পেলে ভাই এমন রঙিন পাখা?",
      "টুকটুকে লাল নীল ঝিলমিলি আঁকাবাঁকা!",
      "কুসুমের পরাগ মাখি পাখায়,",
      "চাঁদের কিরণ যেন মাখায়।"
    ],
    "moralOrTheme": "প্রকৃতির রঙের মেলা ও সৃষ্টির অপরূপ সৌন্দর্য।"
  },
  {
    "id": "c2-4",
    "classId": "class-2",
    "title": "একুশের গান",
    "author": "আবদুল গাফ্ফার চৌধুরী (পাঠ ১১, পৃ. ২২)",
    "gradeName": "২য় শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🌹",
    "themeColor": "from-rose-600 to-red-700",
    "language": "bn-BD",
    "lines": [
      "আমার ভাইয়ের রক্তে রাঙানো একুশে ফেব্রুয়ারি,",
      "আমি কি ভুলিতে পারি?",
      "ছেলেহারা শত মায়ের অশ্রু-গড়া এ ফেব্রুয়ারি,",
      "আমি কি ভুলিতে পারি?"
    ],
    "moralOrTheme": "মাতৃভাষার মর্যাদা ও ভাষা শহীদদের প্রতি বিনম্র শ্রদ্ধা।"
  },
  {
    "id": "c2-5",
    "classId": "class-2",
    "title": "আয় দেখে যা নাচ",
    "author": "প্রচলিত ছড়া (পাঠ ৬, পৃ. ১৫)",
    "gradeName": "২য় শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "💃",
    "themeColor": "from-purple-500 to-indigo-600",
    "language": "bn-BD",
    "lines": [
      "আয় দেখে যা নাচ রে ভাই,",
      "তালে তালে পা মেলাই।",
      "ঢোলের বাদ্যে বাজে কাড়া,",
      "খুশিতে মন দিশেহারা।"
    ],
    "moralOrTheme": "লোকছন্দের আনন্দ ও সম্মিলিত উৎসবের অনুভূতি।"
  },
  {
    "id": "c2-6",
    "classId": "class-2",
    "title": "বিড়াল ছানা",
    "author": "প্রচলিত ছড়া (পাঠ ২০, পৃ. ৪০)",
    "gradeName": "২য় শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🐱",
    "themeColor": "from-orange-400 to-amber-500",
    "language": "bn-BD",
    "lines": [
      "বিড়াল ছানা মিউ মিউ,",
      "দুধের বাটি ছুঁয়ো না কেউ।",
      "লেজ নেড়ে সে ডাকছে ভাই,",
      "মাছের টুকরো পেলে খাই।"
    ],
    "moralOrTheme": "পোষা প্রাণীর প্রতি স্নেহ ও কৌতুকপূর্ণ পর্যবেক্ষণ।"
  },
  {
    "id": "c2-7",
    "classId": "class-2",
    "title": "মুক্তিসেনা",
    "author": "কবিতা (পাঠ ২৬, পৃ. ৫৬)",
    "gradeName": "২য় শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🎖️",
    "themeColor": "from-emerald-600 to-teal-700",
    "language": "bn-BD",
    "lines": [
      "বীর বাঙালি মুক্তিসেনা,",
      "তাদের ঋণ তো শোধ হবে না।",
      "যুদ্ধ করে আনল জয়,",
      "দূর করে দিল পরাধীনতার ভয়।"
    ],
    "moralOrTheme": "মুক্তিযুদ্ধের বীরত্ব ও বীর সেনানীদের প্রতি কৃতজ্ঞতা।"
  },
  {
    "id": "c2-8",
    "classId": "class-2",
    "title": "Little Seed",
    "author": "English for Today (Unit 2, Lesson 5, p. 16)",
    "gradeName": "২য় শ্রেণি",
    "category": "English Rhymes",
    "icon": "🌱",
    "themeColor": "from-green-500 to-emerald-600",
    "language": "en-US",
    "lines": [
      "A little seed for me to sow,",
      "A little earth to make it grow.",
      "A little hole, a little pat,",
      "A little wish, and that is that.",
      "A little sun, a little shower,",
      "A little while—and then a flower!"
    ],
    "moralOrTheme": "Appreciation of plant growth and nature's miracles."
  },
  {
    "id": "c2-9",
    "classId": "class-2",
    "title": "Rainbow",
    "author": "English for Today (Unit 7, Lesson 2, p. 65)",
    "gradeName": "২য় শ্রেণি",
    "category": "English Rhymes",
    "icon": "🌈",
    "themeColor": "from-violet-500 to-pink-500",
    "language": "en-US",
    "lines": [
      "Red, orange, yellow, green and blue,",
      "Indigo and violet too.",
      "Rainbow, rainbow in the sky,",
      "High above the world so high."
    ],
    "moralOrTheme": "Color identification and admiring the colorful sky."
  },
  {
    "id": "c2-10",
    "classId": "class-2",
    "title": "Family",
    "author": "English for Today (Unit 8, Lesson 5, p. 83)",
    "gradeName": "২য় শ্রেণি",
    "category": "English Rhymes",
    "icon": "👨‍👩‍👧‍👦",
    "themeColor": "from-blue-500 to-indigo-600",
    "language": "en-US",
    "lines": [
      "Father, mother, sister, brother,",
      "Hand in hand with one another.",
      "In our home we laugh and play,",
      "Growing happier every day."
    ],
    "moralOrTheme": "Family values, love and togetherness."
  },
  {
    "id": "c2-11",
    "classId": "class-2",
    "title": "Two Little Birds",
    "author": "English for Today (Unit 5, Lesson 6, p. 52)",
    "gradeName": "২য় শ্রেণি",
    "category": "English Rhymes",
    "icon": "🐦",
    "themeColor": "from-teal-400 to-blue-500",
    "language": "en-US",
    "lines": [
      "Two little birds sitting on a tree,",
      "Singing happy songs for you and me.",
      "One flew high, one flew low,",
      "Watching the gentle breezes blow."
    ],
    "moralOrTheme": "Joy of bird watching and musical rhythm."
  },
  {
    "id": "c2-12",
    "classId": "class-2",
    "title": "ডালিমকুমার ও কঙ্কাবতী",
    "author": "বাংলার রূপকথা (পাঠ ৪, পৃ. ৭)",
    "gradeName": "২য় শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "👑",
    "themeColor": "from-purple-600 to-fuchsia-700",
    "language": "bn-BD",
    "lines": [
      "এক দেশে ছিল সাহসী এক রাজপুত্র ডালিমকুমার।",
      "তার বোন কঙ্কাবতী ছিল এক জাদুকরের হাতে বন্দি।",
      "ডালিমকুমার ভয় না পেয়ে বোনের উদ্ধারে দুর্গম পথে নামল।",
      "পথে সে তৃষ্ণার্ত পশুপাখিকে দয়া দেখাল।",
      "সেই পশুপাখিরা ডালিমকুমারকে জাদুকরের গোপন দুর্বলতার সন্ধান দিল।",
      "ডালিমকুমার বুদ্ধি ও সাহস দিয়ে কঙ্কাবতীকে উদ্ধার করল।"
    ],
    "moralOrTheme": "সাহস, দয়া ও উপস্থিত বুদ্ধির মাধ্যমে কঠিন বিপদও জয় করা যায়।"
  },
  {
    "id": "c2-13",
    "classId": "class-2",
    "title": "সিংহ আর ইঁদুরের গল্প",
    "author": "ঈশপের গল্প (পাঠ ৮, পৃ. ১৮)",
    "gradeName": "২য় শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "🦁",
    "themeColor": "from-amber-600 to-yellow-700",
    "language": "bn-BD",
    "lines": [
      "বনের এক সিংহ ঘুমে ছিল। একটি ছোট্ট ইঁদুর এসে তার গায়ে খেলা করতে লাগল।",
      "সিংহ রেগে ইঁদুরকে ধরে ফেলল।",
      "ইঁদুর বলল—'মহারাজ, ক্ষমা করুন! একদিন আমি আপনার উপকারে আসব।'",
      "সিংহ হেসে তাকে ছেড়ে দিল।",
      "কদিন পর সিংহটি এক শিকারির জালে আটকা পড়ল।",
      "ইঁদুর ছুটে এসে ধারালো দাঁত দিয়ে জাল কেটে সিংহকে মুক্ত করল।"
    ],
    "moralOrTheme": "ছোট বা দুর্বল কাউকেই অবহেলা করতে নেই, যে কেউ উপকারে আসতে পারে।"
  },
  {
    "id": "c2-14",
    "classId": "class-2",
    "title": "দুখু মিয়ার জীবন",
    "author": "নজরুল স্মৃতি (পাঠ ২৭, পৃ. ৫৮)",
    "gradeName": "২য় শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "📜",
    "themeColor": "from-emerald-700 to-teal-800",
    "language": "bn-BD",
    "lines": [
      "ছোটবেলায় কাজী নজরুল ইসলামকে সবাই দুখু মিয়া বলে ডাকত।",
      "দুখু মিয়ার শৈশব কেটেছিল চরম অভাব ও কষ্টে।",
      "তবু তিনি কখনো পড়াশোনা ও গান গাওয়া থামাননি।",
      "লেটো দলের গান গেয়ে তিনি মানুষকে মুগ্ধ করতেন।",
      "কঠোর পরিশ্রম ও প্রতিভায় তিনি আমাদের জাতীয় কবি হলেন।"
    ],
    "moralOrTheme": "কষ্ট ও প্রতিকূলতার মধ্যেও অধ্যবসায় বজায় রাখলে জীবনে বড় হওয়া যায়।"
  },
  {
    "id": "c2-15",
    "classId": "class-2",
    "title": "The Crow and the Jar",
    "author": "English for Today (Unit 10, Lesson 1, p. 93)",
    "gradeName": "২য় শ্রেণি",
    "category": "English Rhymes",
    "icon": "🦅",
    "themeColor": "from-slate-600 to-slate-800",
    "language": "en-US",
    "lines": [
      "A thirsty crow flew around searching for water.",
      "At last, he saw a pitcher in a garden.",
      "The water was too low for his beak to reach.",
      "The clever crow saw small pebbles on the ground.",
      "One by one, he dropped the pebbles into the pitcher.",
      "The water level rose up, and the crow drank joyfully."
    ],
    "moralOrTheme": "Patience and creative thinking solve difficult problems."
  },
  {
    "id": "c2-16",
    "classId": "class-2",
    "title": "The Boys and the Frog",
    "author": "English for Today (Unit 10, Lesson 2, p. 96)",
    "gradeName": "২য় শ্রেণি",
    "category": "English Rhymes",
    "icon": "🐸",
    "themeColor": "from-lime-600 to-green-700",
    "language": "en-US",
    "lines": [
      "Some boys were playing happily by a pond.",
      "They began throwing stones at frogs in the water.",
      "An old frog raised its head and said kindly:",
      "'Please stop! What is play to you is death to us.'",
      "The boys felt ashamed and stopped hurting the frogs."
    ],
    "moralOrTheme": "Never harm innocent creatures for momentary fun."
  },
  {
    "id": "c3-1",
    "classId": "class-3",
    "title": "আমি হব",
    "author": "কাজী নজরুল ইসলাম (পাঠ ৮, পৃ. ২৩)",
    "gradeName": "৩য় শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🐥",
    "themeColor": "from-amber-500 to-yellow-600",
    "language": "bn-BD",
    "lines": [
      "আমি হব সকাল বেলার পাখি,",
      "সবার আগে কুসুম-বাগে উঠব আমি ডাকি!",
      "সূর্যিমামা জাগার আগে উঠব আমি জেগে,",
      "হয়নি সকাল, ঘুমো এখনো, মা বলবেন রেগে।"
    ],
    "moralOrTheme": "ভোরে ঘুম থেকে ওঠার উদ্যম ও স্বতঃস্ফূর্ত জাগরণের আনন্দ।"
  },
  {
    "id": "c3-2",
    "classId": "class-3",
    "title": "আমাদের গ্রাম",
    "author": "বন্দে আলী মিয়া (পাঠ ১৩, পৃ. ৪২)",
    "gradeName": "৩য় শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🏡",
    "themeColor": "from-emerald-500 to-green-600",
    "language": "bn-BD",
    "lines": [
      "আমাদের ছোট গাঁয়ে ছোট ছোট ঘর,",
      "থাকি সেথা সবে মিলে কেহ নাহি পর।",
      "পাড়ার সকল ছেলে মোরা ভাই ভাই,",
      "একসাথে খেলি আর পাঠশালে যাই।"
    ],
    "moralOrTheme": "গ্রামীণ সৌহার্দ্য, ভ্রাতৃত্ববোধ ও সম্প্রীতির বন্ধন।"
  },
  {
    "id": "c3-3",
    "classId": "class-3",
    "title": "হাসি",
    "author": "সুকুমার রায় (পাঠ ১৬, পৃ. ৫৫)",
    "gradeName": "৩য় শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "😄",
    "themeColor": "from-pink-500 to-rose-500",
    "language": "bn-BD",
    "lines": [
      "হাসির চোটে পেট ফেটে যায়,",
      "চোখে জলের ধারা ধায়।",
      "মনটা যদি রাখতে চাও খাসা,",
      "সর্বদাই চাই একমুখ হাসি।"
    ],
    "moralOrTheme": "মন ভালো রাখার জন্য হাসিখুশি ও ইতিবাচক থাকা।"
  },
  {
    "id": "c3-4",
    "classId": "class-3",
    "title": "আজিকার শিশু",
    "author": "সুনির্মল বসু (পাঠ ১৯, পৃ. ৬৫)",
    "gradeName": "৩য় শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🌟",
    "themeColor": "from-cyan-500 to-blue-600",
    "language": "bn-BD",
    "lines": [
      "আজিকার শিশু আগামী দিনের আশা,",
      "তার প্রাণে জাগে নতুন ভালোবাসা।",
      "জ্ঞানে ও কর্মে গড়ে তুলবে বিশ্বখানা,",
      "নেই তার সামনে কোনো বাধা বা মানা।"
    ],
    "moralOrTheme": "শিশুর অফুরন্ত সম্ভাবনা ও সুন্দর ভবিষ্যৎ গড়ার স্বপ্ন।"
  },
  {
    "id": "c3-5",
    "classId": "class-3",
    "title": "আমার পণ",
    "author": "মদনমোহন তর্কালঙ্কার (পাঠ ২২, পৃ. ৭৬)",
    "gradeName": "৩য় শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "☀️",
    "themeColor": "from-orange-500 to-amber-600",
    "language": "bn-BD",
    "lines": [
      "সকালে উঠিয়া আমি মনে মনে বলি,",
      "সারাদিন আমি যেন ভালো হয়ে চলি।",
      "আদেশ করেন যাহা মোর গুরুজনে,",
      "আমি যেন সেই কাজ করি ভালো মনে।"
    ],
    "moralOrTheme": "চরিত্র গঠন, গুরুজনদের প্রতি শ্রদ্ধা ও নিয়মিত ভালো কাজের সংকল্প।"
  },
  {
    "id": "c3-6",
    "classId": "class-3",
    "title": "তালগাছ",
    "author": "রবীন্দ্রনাথ ঠাকুর (পাঠ ২৪, পৃ. ৮৩)",
    "gradeName": "৩য় শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🌴",
    "themeColor": "from-teal-600 to-emerald-700",
    "language": "bn-BD",
    "lines": [
      "তালগাছ এক পায়ে দাঁড়িয়ে,",
      "সব গাছ ছাড়িয়ে,",
      "উঁকি মারে আকাশে।",
      "মনে সাধ, কালো মেঘ ফুঁড়ে যায়,",
      "একেবারে উড়ে যায়,",
      "কোথা পাবে পাখা সে?"
    ],
    "moralOrTheme": "কল্পনাশক্তি, আকাশে ওড়ার স্বপ্ন এবং শেষ পর্যন্ত জন্মমাটিতে ফিরে আসার টান।"
  },
  {
    "id": "c3-7",
    "classId": "class-3",
    "title": "আদর্শ ছেলে",
    "author": "কুসুমকুমারী দাশ (পাঠ ২৬, পৃ. ৮৯)",
    "gradeName": "৩য় শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "👦",
    "themeColor": "from-blue-600 to-indigo-700",
    "language": "bn-BD",
    "lines": [
      "আমাদের দেশে হবে সেই ছেলে কবে,",
      "কথায় না বড় হয়ে কাজে বড় হবে?",
      "মুখে হাসি, বুকে বল, তেজে ভরা মন,",
      "মানুষ হইতে হবে—এই যার পণ।"
    ],
    "moralOrTheme": "বড় বড় কথা না বলে কাজে বড় হওয়া এবং আদর্শ মানুষ হিসেবে গড়ে ওঠা।"
  },
  {
    "id": "c3-8",
    "classId": "class-3",
    "title": "It's a Happy House",
    "author": "English For Today (Unit 2, Lesson 4, p. 19)",
    "gradeName": "৩য় শ্রেণি",
    "category": "English Rhymes",
    "icon": "🏠",
    "themeColor": "from-rose-500 to-pink-600",
    "language": "en-US",
    "lines": [
      "It's a happy house, a family home,",
      "Where love and joy will always bloom.",
      "With father, mother, sister and me,",
      "As happy as a family can be."
    ],
    "moralOrTheme": "Warmth of family life and caring for household members."
  },
  {
    "id": "c3-9",
    "classId": "class-3",
    "title": "Hello Hello, How Are You?",
    "author": "English For Today (Unit 3, Lesson 3, p. 29)",
    "gradeName": "৩য় শ্রেণি",
    "category": "English Rhymes",
    "icon": "👋",
    "themeColor": "from-blue-500 to-cyan-600",
    "language": "en-US",
    "lines": [
      "Hello, hello, how are you today?",
      "I'm very well, thank you, come and play!",
      "Let's sing together, let's learn and share,",
      "With kindness and smiles everywhere."
    ],
    "moralOrTheme": "Polite greetings, social warmth and friendship."
  },
  {
    "id": "c3-10",
    "classId": "class-3",
    "title": "Row, Row, Row Your Boat",
    "author": "English For Today (Unit 4, Lesson 3, p. 43)",
    "gradeName": "৩য় শ্রেণি",
    "category": "English Rhymes",
    "icon": "🚣",
    "themeColor": "from-sky-500 to-blue-600",
    "language": "en-US",
    "lines": [
      "Row, row, row your boat,",
      "Gently down the stream.",
      "Merrily, merrily, merrily, merrily,",
      "Life is but a dream."
    ],
    "moralOrTheme": "Cheerful rhythm and enjoying life's gentle journey."
  },
  {
    "id": "c3-11",
    "classId": "class-3",
    "title": "Sing a Rainbow",
    "author": "English For Today (Unit 7, Lesson 4, p. 83)",
    "gradeName": "৩য় শ্রেণি",
    "category": "English Rhymes",
    "icon": "🌈",
    "themeColor": "from-violet-500 to-purple-600",
    "language": "en-US",
    "lines": [
      "Red and yellow and pink and green,",
      "Purple and orange and blue.",
      "I can sing a rainbow,",
      "Sing a rainbow,",
      "Sing a rainbow too."
    ],
    "moralOrTheme": "Observing colors and singing in harmony."
  },
  {
    "id": "c3-12",
    "classId": "class-3",
    "title": "ঘাসফড়িং আর পিঁপড়ার গল্প",
    "author": "নীতিগল্প (পাঠ ৭, পৃ. ২০)",
    "gradeName": "৩য় শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "🦗",
    "themeColor": "from-lime-600 to-emerald-700",
    "language": "bn-BD",
    "lines": [
      "গ্রীষ্মের রোদে পিঁপড়ারা খাদ্য জমা করতে ব্যস্ত ছিল।",
      "ঘাসফড়িং অলসভাবে দিন কাটিয়ে তাদের দিকে তাকিয়ে হাসল।",
      "ঘাসফড়িং বলল—'এখনই এত কাজ কেন করছ? গান গাও!'",
      "পিঁপড়া বলল—'শীতের প্রস্তুতি এখনই নিতে হবে।'",
      "শীতকালে খাবার না পেয়ে ঘাসফড়িং কষ্টে পড়ল।",
      "সে বুঝতে পারল অলসতার পরিণতি কত কঠিন।"
    ],
    "moralOrTheme": "সময়ের কাজ সময়ে করা ও ভবিষ্যতের প্রস্তুতি রাখা উচিত।"
  },
  {
    "id": "c3-13",
    "classId": "class-3",
    "title": "ব্যাঙের সাজা",
    "author": "শিক্ষণীয় গল্প (পাঠ ৯, পৃ. ২৬)",
    "gradeName": "৩য় শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "🐸",
    "themeColor": "from-green-600 to-teal-700",
    "language": "bn-BD",
    "lines": [
      "এক অহংকারী ব্যাঙ নিজেকে নদীর সবচেয়ে বড় প্রাণী মনে করত।",
      "সে অন্য ছোট প্রাণীদের ভয় দেখাত।",
      "একদিন এক হাতি নদীর পানিতে পা রাখল।",
      "ব্যাঙ হাতির চেয়ে বড় হওয়ার জন্য পেট ফুলিয়ে ফুলিয়ে ফেটে যাওয়ার উপক্রম হলো।",
      "অবশেষে সে তার ভুল বুঝতে পেরে ক্ষমা চাইল।"
    ],
    "moralOrTheme": "অহংকার পতনের মূল, সাধ্যের বাইরে বড়াই করা উচিত নয়।"
  },
  {
    "id": "c3-14",
    "classId": "class-3",
    "title": "হার-জিতের গল্প",
    "author": "শিক্ষণীয় গল্প (পাঠ ১৫, পৃ. ৪৯)",
    "gradeName": "৩য় শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "🏆",
    "themeColor": "from-amber-500 to-orange-600",
    "language": "bn-BD",
    "lines": [
      "দুই বন্ধু এক দৌড় প্রতিযোগিতায় অংশ নিল।",
      "এক বন্ধু দ্রুত দৌড়ে সবার আগে যেতে চাইল, কিন্তু পথে অন্য একজন পড়ে গেলে সে থামল না।",
      "দ্বিতীয় বন্ধুটি বিজয়ের চেয়ে মানুষের সাহায্যকে বড় মনে করে আহত সহপাঠীকে তুলে নিল।",
      "বিচারকরা দ্বিতীয় বন্ধুকেই সততা ও মানবতার জন্য সত্যিকারের বিজয়ী ঘোষণা করলেন।"
    ],
    "moralOrTheme": "শুধুমাত্র জেতাই বড় কথা নয়, মানবতা ও সহমর্মিতাই আসল বিজয়।"
  },
  {
    "id": "c3-15",
    "classId": "class-3",
    "title": "রবীন্দ্রনাথ ঠাকুরের ছেলেবেলা",
    "author": "জীবনকথা (পাঠ ২৫, পৃ. ৮৬)",
    "gradeName": "৩য় শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "📖",
    "themeColor": "from-indigo-600 to-violet-700",
    "language": "bn-BD",
    "lines": [
      "রবীন্দ্রনাথ ঠাকুরের শৈশব কেটেছিল জোড়াসাঁকোর ঠাকুরবাড়িতে।",
      "তাঁকে পাহারা দিতেন চাকরেরা, চার দেওয়ালের মাঝে তাঁর মন উড়ত বাইরে।",
      "জানালা দিয়ে তিনি পুকুরঘাট আর বটগাছের দিকে চেয়ে থাকতেন।",
      "প্রকৃতির এই গভীর ভালোবাসাই তাঁকে বিশ্ববরেণ্য কবি ও নোবেলজয়ী বানিয়েছে।"
    ],
    "moralOrTheme": "প্রকৃতির সান্নিধ্য ও জানার কৌতূহল মানুষের মনকে বিশাল করে তোলে।"
  },
  {
    "id": "c3-16",
    "classId": "class-3",
    "title": "The Ant and the Grasshopper",
    "author": "English For Today (Unit 8, Lesson 1, p. 93)",
    "gradeName": "৩য় শ্রেণি",
    "category": "English Rhymes",
    "icon": "🐜",
    "themeColor": "from-emerald-600 to-teal-800",
    "language": "en-US",
    "lines": [
      "In summer, the hardworking ants gathered food all day.",
      "The playful grasshopper sang songs and laughed at them.",
      "When cold winter arrived, snow covered the ground.",
      "The grasshopper had no food and knocked at the ants' door.",
      "He learned that hard work and preparation keep us safe."
    ],
    "moralOrTheme": "Work hard today to enjoy a secure and happy tomorrow."
  },
  {
    "id": "c4-1",
    "classId": "class-4",
    "title": "কাজলা দিদি",
    "author": "যতীন্দ্রমোহন বাগচী (পাঠ ১২, পৃ. ৬৩)",
    "gradeName": "৪র্থ শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🎋",
    "themeColor": "from-emerald-600 to-teal-700",
    "language": "bn-BD",
    "lines": [
      "বাঁশবাগানের মাথার ওপর চাঁদ উঠেছে ওই,",
      "মাগো আমার শোলক-বলা কাজলা দিদি কই?",
      "পুকুরধারে নেবুর তলে থোকায় থোকায় জোনাক জ্বলে,",
      "ফুলের গন্ধে ঘুম আসে না, একলা জেগে রই।"
    ],
    "moralOrTheme": "পারিবারিক স্নেহ, হারানো দিদির স্মৃতি ও গভীর আবেগঘন ভালোবাসা।"
  },
  {
    "id": "c4-2",
    "classId": "class-4",
    "title": "লিচু-চোর",
    "author": "কাজী নজরুল ইসলাম (পাঠ ১৭, পৃ. ৮৯)",
    "gradeName": "৪র্থ শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🌳",
    "themeColor": "from-amber-500 to-orange-600",
    "language": "bn-BD",
    "lines": [
      "বাবুদের তালপুকুরে,",
      "হাবুদের ডাল-কুকুরে,",
      "সে কি ভাই করলে তাড়া,",
      "বলি শোন রক্ষে সারা!",
      "গাছে চড়ে লিচু পাড়তে,",
      "হাত যে লাগল কাঁপতে!"
    ],
    "moralOrTheme": "হাস্যরসাত্মক ছড়ার মাধ্যমে পরের বাগানে না বলে ঢোকার বিপদ।"
  },
  {
    "id": "c4-3",
    "classId": "class-4",
    "title": "ভয় পেয়ো না",
    "author": "সুকুমার রায় (পাঠ ২১, পৃ. ১০৯)",
    "gradeName": "৪র্থ শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🦀",
    "themeColor": "from-purple-500 to-indigo-600",
    "language": "bn-BD",
    "lines": [
      "ভয় পেয়ো না, ভয় পেয়ো না, তোমায় আমি মারব না!",
      "সত্যি বলছি, কুস্তি করে তোমার সাথে পারব না।",
      "মনটা আমার ভারী নরম, হাড়গুলো মোর শক্ত নয়,",
      "হুকুম পেলে কামড়াতে পারি, কিন্তু তাতে বিষ তো নয়!"
    ],
    "moralOrTheme": "অদ্ভুত রস ও শিশুদের ভীতি দূর করার নিপুণ হাস্যরস।"
  },
  {
    "id": "c4-4",
    "classId": "class-4",
    "title": "বৃষ্টির ছড়া",
    "author": "ছড়া (পাঠ ৯, পৃ. ৪৪)",
    "gradeName": "৪র্থ শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🌧️",
    "themeColor": "from-blue-500 to-cyan-600",
    "language": "bn-BD",
    "lines": [
      "রিমঝিম রিমঝিম বৃষ্টি নামে,",
      "সবুজ পাতা ভিজিয়ে দেয়।",
      "মেঘের ডাকে চমকে ওঠে,",
      "নদীর জলে ঢেউ জাগিয়ে দেয়।"
    ],
    "moralOrTheme": "বর্ষার স্নিগ্ধ প্রকৃতি ও শিশুদের মনের সতেজতা।"
  },
  {
    "id": "c4-5",
    "classId": "class-4",
    "title": "জন্মেছি এই দেশে",
    "author": "কবিতা (পাঠ ৫, পৃ. ২২)",
    "gradeName": "৪র্থ শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🇧🇩",
    "themeColor": "from-green-600 to-emerald-700",
    "language": "bn-BD",
    "lines": [
      "জন্মেছি এই শ্যামল দেশে ধন্য মোদের প্রাণ,",
      "এই দেশেরই মাটির প্রেমে গাইব মোরা গান।",
      "নদী-নালা সবুজ মাঠ আর সোনার ফসলে,",
      "মনটা জুড়ায় মায়ের মতো দেশের কোলে এলে।"
    ],
    "moralOrTheme": "মাতৃভূমির প্রতি গভীর কৃতজ্ঞতা ও নিঃস্বার্থ দেশপ্রেম।"
  },
  {
    "id": "c4-6",
    "classId": "class-4",
    "title": "একুশের কবিতা",
    "author": "কবিতা (পাঠ ৭, পৃ. ৩৪)",
    "gradeName": "৪র্থ শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🌺",
    "themeColor": "from-rose-600 to-red-700",
    "language": "bn-BD",
    "lines": [
      "ফেব্রুয়ারির রক্তে ভেজা একুশের ওই ফুল,",
      "মাতৃভাষার মর্যাদা দিতে করেনি তো ভুল।",
      "ভাষার তরে দিল যারা বুকের তাজা রক্ত,",
      "আমরা তাদের চিরকাল হব পরম ভক্ত।"
    ],
    "moralOrTheme": "মাতৃভাষার আত্মত্যাগ ও ভাষা আন্দোলনের চিরন্তন চেতনা।"
  },
  {
    "id": "c4-7",
    "classId": "class-4",
    "title": "প্রিয় স্বাধীনতা",
    "author": "কবিতা (পাঠ ১৫, পৃ. ৭৯)",
    "gradeName": "৪র্থ শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🕊️",
    "themeColor": "from-sky-500 to-blue-600",
    "language": "bn-BD",
    "lines": [
      "রক্ত দিয়ে কিনেছি মোরা প্রিয় স্বাধীনতা,",
      "লাখো শহীদের আত্মত্যাগের অমর এই গাঁথা।",
      "পতপত করে উড়ছে দেখো লাল-সবুজের নিশান,",
      "এই তো মোদের স্বাধীন দেশ, এই তো মোদের প্রাণ।"
    ],
    "moralOrTheme": "স্বাধীনতার মূল্য রক্ষা করা ও জাতীয় পতাকাকে সম্মান জানানো।"
  },
  {
    "id": "c4-8",
    "classId": "class-4",
    "title": "Poem: Tears of the Earth",
    "author": "English For Today (Unit 14, p. 64)",
    "gradeName": "৪র্থ শ্রেণি",
    "category": "English Rhymes",
    "icon": "🌍",
    "themeColor": "from-teal-600 to-cyan-700",
    "language": "en-US",
    "lines": [
      "The trees are cut, the rivers dry,",
      "Dark smoke covers up the sky.",
      "Listen to the gentle cry,",
      "As Mother Earth begins to sigh.",
      "Plant a tree and keep it green,",
      "Keep our earth so fresh and clean."
    ],
    "moralOrTheme": "Environmental protection, planting trees and combating pollution."
  },
  {
    "id": "c4-9",
    "classId": "class-4",
    "title": "বাঘখেকো শিয়ালের ছানা",
    "author": "উপেন্দ্রকিশোর রায়চৌধুরী (পাঠ ১১, পৃ. ৫৬)",
    "gradeName": "৪র্থ শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "🦊",
    "themeColor": "from-orange-500 to-amber-600",
    "language": "bn-BD",
    "lines": [
      "এক গর্তে বাস করত ছোট্ট শিয়ালের ছানা।",
      "একদিন সেখানে এক বিশাল বাঘ এসে দাঁড়াল।",
      "শিয়ালের ছানা ভয় না পেয়ে গম্ভীর গলায় গর্তের ভেতর থেকে হুংকার দিল—",
      "'হাতির সমান মাথা মোর, বাঘের রক্ত খাই! রোজ একটা করে বাঘ না পেলে শান্তি নাই!'",
      "বাঘ ভাবল গর্তের ভেতর ভয়ানক কোনো দানব রয়েছে!",
      "বাঘটি প্রাণভয়ে এমন দৌড় দিল যে আর কোনোদিন ফিরে তাকাল না।"
    ],
    "moralOrTheme": "বিপদের মুহূর্তে উপস্থিত বুদ্ধি ও সাহস বড় বড় বিপদকেও তাড়িয়ে দেয়।"
  },
  {
    "id": "c4-10",
    "classId": "class-4",
    "title": "অমল ও দইওয়ালা",
    "author": "রবীন্দ্রনাথ ঠাকুর (পাঠ ১৪, পৃ. ৭৩)",
    "gradeName": "৪র্থ শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "🏺",
    "themeColor": "from-amber-600 to-yellow-700",
    "language": "bn-BD",
    "lines": [
      "অমল অসুস্থ হয়ে ঘরের জানালা দিয়ে বাইরে চেয়ে থাকত।",
      "একদিন এক দইওয়ালা রাস্তা দিয়ে হেঁকে গেল—'চাই দই!'",
      "অমল তাকে ডেকে কথা বলল। তাদের নদী ও মিষ্টি দইয়ের গল্প শুনে অমলের মন ভরে উঠল।",
      "দইওয়ালা অমলের নিষ্পাপ ভালোবাসা দেখে তাকে বিনামূল্যে দই উপহার দিয়ে গেল।",
      "মানুষের প্রতি আন্তরিকতাই প্রকৃত আনন্দের চাবিকাঠি।"
    ],
    "moralOrTheme": "আন্তরিকতা ও সহমর্মিতার মাধ্যমে দূর সম্পর্কের মানুষও আপন হয়ে ওঠে।"
  },
  {
    "id": "c4-11",
    "classId": "class-4",
    "title": "কেমন বড়াই",
    "author": "শিক্ষণীয় গল্প (পাঠ ২, পৃ. ৭)",
    "gradeName": "৪র্থ শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "🦚",
    "themeColor": "from-violet-600 to-purple-700",
    "language": "bn-BD",
    "lines": [
      "এক বনে এক রূপবান ময়ূর তার পেখম মেলে অন্যদের অহংকার দেখাত।",
      "সে বকের সাদামাটা পালক নিয়ে উপহাস করত।",
      "একদিন এক শিকারি তাদের আক্রমণ করল।",
      "বকটি দ্রুত পাখা মেলে উড়ে নিরাপদে আকাশ দিয়ে পালিয়ে গেল।",
      "ভারী পেখমের কারণে ময়ূরটি দৌড়াতে গিয়ে বিপদে পড়ল এবং নিজের অহংকারের জন্য অনুতপ্ত হলো।"
    ],
    "moralOrTheme": "বাহ্যিক রূপ নিয়ে বড়াই করা বৃথা; কাজের দক্ষতাই আসল শক্তি।"
  },
  {
    "id": "c4-12",
    "classId": "class-4",
    "title": "সোনার থালা",
    "author": "রূপকথা (পাঠ ১৬, পৃ. ৮৩)",
    "gradeName": "৪র্থ শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "🍽️",
    "themeColor": "from-yellow-500 to-amber-600",
    "language": "bn-BD",
    "lines": [
      "এক সৎ ফেরিওয়ালা বাড়ি বাড়ি বাসন বিক্রি করত।",
      "এক গরিব বুড়ি তার পুরোনো ময়লা থালাটি দিয়ে সামান্য জিনিস চাইল।",
      "ফেরিওয়ালা পরীক্ষা করে দেখল এটি ধুলোয় ঢাকা খাঁটি সোনার থালা।",
      "ফেরিওয়ালা কোনো ধোঁকা না দিয়ে বুড়িকে তার থালার সঠিক মূল্য বুঝিয়ে দিল।",
      "সততার গুণে ফেরিওয়ালা সমাজে সম্মানিত হলো।"
    ],
    "moralOrTheme": "লোভ পরিত্যাগ করে সবসময় সততার পথ অনুসরণ করা পরম ধর্ম।"
  },
  {
    "id": "c4-13",
    "classId": "class-4",
    "title": "দানবীর মুহসিন",
    "author": "জীবনী (পাঠ ১৩, পৃ. ৬৮)",
    "gradeName": "৪র্থ শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "🤝",
    "themeColor": "from-emerald-700 to-teal-800",
    "language": "bn-BD",
    "lines": [
      "হাজী মুহাম্মদ মুহসিন ছিলেন এক মহান দানবীর।",
      "তিনি নিজের বিপুল ধনসম্পদ গরিব-দুঃখীদের শিক্ষা ও কল্যাণে দান করে গেছেন।",
      "এক রাতে এক চোর তাঁর ঘরে ঢুকলে তিনি চোরকে শাস্তি না দিয়ে ক্ষুধার্ত দেখে খাইয়েছিলেন এবং টাকা দিয়েছিলেন।",
      "মুহসিনের মহানুভবতায় চোরটি ভালো মানুষ হয়ে গিয়েছিল।"
    ],
    "moralOrTheme": "ক্ষমা, উদারতা ও নিঃস্বার্থ দানশীলতা মানুষকে অমর করে রাখে।"
  },
  {
    "id": "c5-1",
    "classId": "class-5",
    "title": "দূরের পাল্লা",
    "author": "সত্যেন্দ্রনাথ দত্ত (পাঠ ৩, পৃ. ১৯)",
    "gradeName": "৫ম শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "⛵",
    "themeColor": "from-blue-600 to-indigo-700",
    "language": "bn-BD",
    "lines": [
      "ছিপখান তিন-দাঁড়,",
      "তিনজন মাল্লা,",
      "চৌপর দিন-ভর,",
      "দেয় দূর-পাল্লা।",
      "পাড়ময় ঝোপঝাড়,",
      "জঙ্গল-জঞ্জাল,",
      "জলময় শৈবাল,",
      "পান্নার টক্সাল।"
    ],
    "moralOrTheme": "ছন্দের যাদুকরী দোলা এবং বাংলার নদী ও মাঝিদের সংগ্রামী সৌন্দর্য।"
  },
  {
    "id": "c5-2",
    "classId": "class-5",
    "title": "রাখাল ছেলে",
    "author": "জসীমউদ্দীন (পাঠ ১০, পৃ. ৫৩)",
    "gradeName": "৫ম শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🌾",
    "themeColor": "from-amber-500 to-emerald-600",
    "language": "bn-BD",
    "lines": [
      "রাখাল ছেলে! রাখাল ছেলে! বারেক ফিরে চাও,",
      "বাকাঁয়ে বাশীঁখানি সুরটি দিয়ে যাও।",
      "কোথায় তোমার মাঠের ধেনু, কোথায় তোমার বাশীঁ?",
      "সারাবেলা কাজ ফেলে কার মুখটি দেখে হাসি?"
    ],
    "moralOrTheme": "পল্লী প্রকৃতির স্নিগ্ধ রূপ এবং রাখাল বালকের সারল্যময় জীবন।"
  },
  {
    "id": "c5-3",
    "classId": "class-5",
    "title": "পাখির মতো",
    "author": "আল মাহমুদ (পাঠ ১৩, পৃ. ৬৯)",
    "gradeName": "৫ম শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🦅",
    "themeColor": "from-sky-500 to-cyan-600",
    "language": "bn-BD",
    "lines": [
      "পাখির মতো ওড়ার বড় সাধ,",
      "ডানা মেলে আকাশ করি পার।",
      "মেঘের দেশে হারিয়ে যাব আমি,",
      "নেই তো কোনো সীমানা বা দ্বার।"
    ],
    "moralOrTheme": "মুক্ত বিহঙ্গের মতো স্বাধীন চিন্তার বিকাশ ও বাধাহীন উড্ডয়নের স্বপ্ন।"
  },
  {
    "id": "c5-4",
    "classId": "class-5",
    "title": "সংকল্প",
    "author": "কাজী নজরুল ইসলাম (পাঠ ১৫, পৃ. ৮৪)",
    "gradeName": "৫ম শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🚀",
    "themeColor": "from-rose-500 to-red-600",
    "language": "bn-BD",
    "lines": [
      "থাকব না কো বদ্ধ ঘরে,",
      "দেখব এবার জগৎটাকে,",
      "কেমন করে ঘুরছে মানুষ,",
      "যুগান্তরের ঘূর্ণিপাকে।",
      "দেশ হতে দেশ দেশান্তরে,",
      "ছুটছে তারা কেমন করে।"
    ],
    "moralOrTheme": "অজানাকে জানার তীব্র কৌতূহল ও নবযাত্রার দুঃসাহসিক সংকল্প।"
  },
  {
    "id": "c5-5",
    "classId": "class-5",
    "title": "ইছামতী",
    "author": "রবীন্দ্রনাথ ঠাকুর (পাঠ ১৮, পৃ. ১০২)",
    "gradeName": "৫ম শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "🌊",
    "themeColor": "from-teal-500 to-blue-600",
    "language": "bn-BD",
    "lines": [
      "ইছামতী নদী চলে এঁকেবেঁকে দূর,",
      "দুই তীরে বাজে তার মিষ্টি মধুর সুর।",
      "জেলেরা ফেলে জাল, মাঝিরা বায় তরী,",
      "কলকল ছলছল শব্দে ওঠে ভরি।"
    ],
    "moralOrTheme": "নদীমাতৃক বাংলাদেশের চিরন্তন রূপ ও নদীর জীবনের প্রতি ভালোবাসা।"
  },
  {
    "id": "c5-6",
    "classId": "class-5",
    "title": "শিক্ষাগুরুর মর্যাদা",
    "author": "কাজী কাদের নওয়াজ (পাঠ ২০, পৃ. ১১২)",
    "gradeName": "৫ম শ্রেণি",
    "category": "ছড়া ও কবিতা",
    "icon": "👑",
    "themeColor": "from-purple-600 to-indigo-700",
    "language": "bn-BD",
    "lines": [
      "বাদশাহ্ আলমগীর—",
      "কুমার তাঁহার পড়িত একদা মৌলবি দিল্লির।",
      "একদিন প্রাতে গিয়া",
      "দেখেন বাদশাহ্—কুমার ঢালিতেছে জল শিক্ষকের চরণে,",
      "শিক্ষক শুধু নিজ হাত দিয়া ধুইতেছেন চরণ আপন মনে।"
    ],
    "moralOrTheme": "সমাজে শিক্ষকের মর্যাদা রাজসিংহাসনের চেয়েও উচ্চে—গুরুজনদের বিনম্র শ্রদ্ধা।"
  },
  {
    "id": "c5-7",
    "classId": "class-5",
    "title": "The Swing",
    "author": "Robert Louis Stevenson (Unit 10, p. 52)",
    "gradeName": "৫ম শ্রেণি",
    "category": "English Rhymes",
    "icon": "🎪",
    "themeColor": "from-sky-400 to-indigo-500",
    "language": "en-US",
    "lines": [
      "How do you like to go up in a swing,",
      "Up in the air so blue?",
      "Oh, I do think it the pleasantest thing",
      "Ever a child can do!",
      "Up in the air and over the wall,",
      "Till I can see so wide,",
      "Rivers and trees and cattle and all",
      "Over the countryside."
    ],
    "moralOrTheme": "Joy of childhood play and looking at the world from high above."
  },
  {
    "id": "c5-8",
    "classId": "class-5",
    "title": "The Secret Song",
    "author": "English For Today (Unit 15, p. 79)",
    "gradeName": "৫ম শ্রেণি",
    "category": "English Rhymes",
    "icon": "🎵",
    "themeColor": "from-violet-500 to-purple-600",
    "language": "en-US",
    "lines": [
      "Who saw the petals drop from the rose?",
      "I, said the spider, but nobody knows.",
      "Who heard the whisper of the green tree?",
      "I, said the robin, singing to me.",
      "Nature has secrets gentle and deep,",
      "Guarded in peace while the flowers sleep."
    ],
    "moralOrTheme": "Observing nature's quiet secrets and subtle harmonies."
  },
  {
    "id": "c5-9",
    "classId": "class-5",
    "title": "The Giving Tree",
    "author": "English For Today (Unit 16, p. 82)",
    "gradeName": "৫ম শ্রেণি",
    "category": "English Rhymes",
    "icon": "🌳",
    "themeColor": "from-green-600 to-emerald-700",
    "language": "en-US",
    "lines": [
      "Once there was a loving apple tree that loved a little boy.",
      "The boy played in her shade and ate her sweet apples.",
      "As he grew older, the tree gave her apples for him to sell, and branches to build his home.",
      "When he was old and weary, the tree offered her stump: 'Sit down, rest, and be happy.'",
      "The tree gave everything she had, happy just to see the boy smile."
    ],
    "moralOrTheme": "Selfless love, environmental gratitude, and caring for those who give."
  },
  {
    "id": "c5-10",
    "classId": "class-5",
    "title": "The Wind and the Sun",
    "author": "Aesop's Fable (Unit 19, p. 100)",
    "gradeName": "৫ম শ্রেণি",
    "category": "English Rhymes",
    "icon": "☀️",
    "themeColor": "from-amber-500 to-orange-600",
    "language": "en-US",
    "lines": [
      "The Wind and the Sun argued about who was stronger.",
      "They saw a traveler walking in a thick warm cloak.",
      "The Wind blew fiercely, but the traveler held his cloak even tighter.",
      "Then the Sun shone with gentle, radiant warmth.",
      "Feeling pleasantly warm, the traveler took off his cloak with a smile.",
      "The Wind conceded that gentle warmth is stronger than violent force."
    ],
    "moralOrTheme": "Kindness and gentleness always overcome force and rage."
  },
  {
    "id": "c5-11",
    "classId": "class-5",
    "title": "ঠিক আছে",
    "author": "শিক্ষণীয় গল্প (পাঠ ৫, পৃ. ২৮)",
    "gradeName": "৫ম শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "💡",
    "themeColor": "from-amber-600 to-yellow-600",
    "language": "bn-BD",
    "lines": [
      "এক পণ্ডিত ব্যক্তি মনে করতেন তিনি সবকিছু জানেন।",
      "তিনি সবাইকে কথার ফাঁদে ফেলে বলতেন—'ঠিক আছে!'",
      "একদিন এক সরল রাখাল বালক পণ্ডিতকে সহজ কিন্তু গভীর এক ধাঁধাঁ জিজ্ঞেস করল।",
      "পণ্ডিত কোনো উত্তর খুঁজে পেলেন না এবং বুঝলেন সবার কাছ থেকেই কিছু না কিছু শেখার আছে।",
      "তিনি গর্ব পরিহার করে বিনয়ী হলেন।"
    ],
    "moralOrTheme": "জ্ঞানের কোনো শেষ নেই, বিনয়ই প্রকৃত জ্ঞানীর ভূষণ।"
  },
  {
    "id": "c5-12",
    "classId": "class-5",
    "title": "সুখ আর দুখু",
    "author": "লোকগল্প (পাঠ ৬, পৃ. ৩২)",
    "gradeName": "৫ম শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "🪆",
    "themeColor": "from-emerald-600 to-teal-700",
    "language": "bn-BD",
    "lines": [
      "দুখু ছিল বড় সৎ ও দয়ালু এক মেয়ে।",
      "সে বনের পশুপাখি ও একটি বৃদ্ধা বুড়িকে নিঃস্বার্থভাবে সাহায্য করল।",
      "বুড়ি খুশি হয়ে তাকে একটি সুন্দর বাকসো দিল, যা খুলে সে অপার সুখ পেল।",
      "তা দেখে লোভী মেয়ে সুখু বুড়িকে সাহায্য না করে জোর করে বড় বাকসো নিল।",
      "লোভের কারণে সুখু উপযুক্ত শিক্ষা পেল।"
    ],
    "moralOrTheme": "সততা ও নিঃস্বার্থ সেবার পুরস্কার মিলে, লোভ মানুষকে ধ্বংস করে।"
  },
  {
    "id": "c5-13",
    "classId": "class-5",
    "title": "কুপোকাত",
    "author": "হাসির নাটকীয় গল্প (পাঠ ১৪, পৃ. ৭৪)",
    "gradeName": "৫ম শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "🥋",
    "themeColor": "from-orange-500 to-red-500",
    "language": "bn-BD",
    "lines": [
      "এক ভিনদেশি পালোয়ান এসে সবাইকে কুস্তির চ্যালেঞ্জ ছুড়ে দিল।",
      "গ্রামের কেউ ভয়ে তার সামনে আসতে চাইল না।",
      "তখন এক বুদ্ধিমান তরুণ পালোয়ানের সাথে শক্তির বদলে বুদ্ধির লড়াইয়ের প্রস্তাব দিল।",
      "পালোয়ান কিছু না বুঝেই কথার প্যাঁচে এমন ফাঁদে পড়ল যে নিজেই মাটিতে পড়ে কুপোকাত হলো!",
      "গ্রামবাসী হাসিতে ফেটে পড়ল।"
    ],
    "moralOrTheme": "শুধুমাত্র শারীরিক শক্তি নয়, বুদ্ধির জোর অনেক বড়।"
  },
  {
    "id": "c5-14",
    "classId": "class-5",
    "title": "বিদায় হজের ভাষণ",
    "author": "সর্বজনীন মানবাধিকার (পাঠ ২১, পৃ. ১১৯)",
    "gradeName": "৫ম শ্রেণি",
    "category": "শিক্ষণীয় গল্প",
    "icon": "📜",
    "themeColor": "from-emerald-700 to-teal-800",
    "language": "bn-BD",
    "lines": [
      "আরাফাতের ময়দানে হজরত মুহাম্মদ (সা) তাঁর ঐতিহাসিক অন্তিম ভাষণ দেন।",
      "তিনি ঘোষণা করলেন—'সকল মানুষ সমান। আরবের ওপর অনারবের কোনো শ্রেষ্ঠত্ব নেই।'",
      "তিনি নারীদের অধিকার নিশ্চিত করার এবং দুর্বলদের সাহায্য করার নির্দেশ দিলেন।",
      "তিনি বললেন—'কারও জান ও মালের ওপর অন্যায় আঘাত কোরো না।'",
      "এই ভাষণ বিশ্বভ্রাতৃত্ব ও সাম্যের শ্রেষ্ঠ দিকনির্দেশনা।"
    ],
    "moralOrTheme": "জাতি-ধর্ম-বর্ণ নির্বিশেষে সকল মানুষের সমমর্যাদা ও মানবাধিকারের শিক্ষা।"
  }
];
