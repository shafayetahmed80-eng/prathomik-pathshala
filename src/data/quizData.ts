export interface QuizQuestion {
  id: string;
  classId: string;
  gradeName: string;
  subject: string;
  question: string;
  imageEmoji: string;
  options: {
    label: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  hint?: string;
}

export const QUIZ_BANK: QuizQuestion[] = [
  // 🧸 Pre-Primary
  {
    id: "pre-1",
    classId: "pre-primary",
    gradeName: "প্রাক-প্রাথমিক",
    subject: "বাংলা ও বর্ণমালা",
    question: "‘অলি’ শব্দটি কোন বর্ণ দিয়ে শুরু হয়?",
    imageEmoji: "🐝",
    options: [
      { label: "অ", isCorrect: true },
      { label: "আ", isCorrect: false },
      { label: "ই", isCorrect: false },
      { label: "উ", isCorrect: false }
    ],
    explanation: "সাবাশ! ‘অ’-তে অলি ও অজগর! অলি মানে মৌমাছি। 🎉",
    hint: "মৌমাছিকে আমরা আরেক নামে 'অলি' ডাকি।"
  },
  {
    id: "pre-2",
    classId: "pre-primary",
    gradeName: "প্রাক-প্রাথমিক",
    subject: "ছড়া ও আনন্দ",
    question: "‘আতা গাছে তোতা পাখি, ডালিম গাছে...’ পরের শব্দটি কী হবে?",
    imageEmoji: "🦜",
    options: [
      { label: "মৌ", isCorrect: true },
      { label: "বউ", isCorrect: false },
      { label: "পাখি", isCorrect: false },
      { label: "ফুল", isCorrect: false }
    ],
    explanation: "খুব সুন্দর! ‘আতা গাছে তোতা পাখি, ডালিম গাছে মৌ’। চমৎকার বলেছ! 🌟",
    hint: "ছড়ার লাইনটি মনে করে দেখো।"
  },
  {
    id: "pre-3",
    classId: "pre-primary",
    gradeName: "প্রাক-প্রাথমিক",
    subject: "মজার গণনা",
    question: "এখানে কয়টি রঙিন বেলুন দেখতে পাচ্ছ? 🎈 🎈 🎈",
    imageEmoji: "🎈",
    options: [
      { label: "২টি", isCorrect: false },
      { label: "৩টি", isCorrect: true },
      { label: "৪টি", isCorrect: false },
      { label: "১টি", isCorrect: false }
    ],
    explanation: "একদম সঠিক! এক, দুই, তিন — মোট ৩টি বেলুন! 🎈🎈🎈",
    hint: "আঙুল দিয়ে এক এক করে গণনা করো।"
  },

  // 🎒 Class 1
  {
    id: "c1-1",
    classId: "class-1",
    gradeName: "১ম শ্রেণি",
    subject: "প্রাথমিক গণিত",
    question: "তোমার কাছে ৫টি আম ছিল। দাদু আরও ৩টি আম দিলেন। এখন মোট কয়টি আম হলো?",
    imageEmoji: "🥭",
    options: [
      { label: "৬টি", isCorrect: false },
      { label: "৮টি", isCorrect: true },
      { label: "৯টি", isCorrect: false },
      { label: "৭টি", isCorrect: false }
    ],
    explanation: "চমৎকার! ৫ + ৩ = ৮টি আম! 🎉",
    hint: "৫ এর সাথে আরও ৩ যোগ করো।"
  },
  {
    id: "c1-2",
    classId: "class-1",
    gradeName: "১ম শ্রেণি",
    subject: "বাংলা",
    question: "আমাদের জাতীয় ফুলের নাম কী?",
    imageEmoji: "🪷",
    options: [
      { label: "গোলাপ", isCorrect: false },
      { label: "সাদা শাপলা", isCorrect: true },
      { label: "সূর্যমুখী", isCorrect: false },
      { label: "বেলি", isCorrect: false }
    ],
    explanation: "সঠিক! সাদা শাপলা হলো আমাদের বাংলাদেশের জাতীয় ফুল। 🇧🇩",
    hint: "পানিতে ফোটে এবং এটি সাদা রঙের।"
  },
  {
    id: "c1-3",
    classId: "class-1",
    gradeName: "১ম শ্রেণি",
    subject: "English",
    question: "What is the Bengali meaning of the word 'Apple'?",
    imageEmoji: "🍎",
    options: [
      { label: "আপেল", isCorrect: true },
      { label: "কমলা", isCorrect: false },
      { label: "কলা", isCorrect: false },
      { label: "আম", isCorrect: false }
    ],
    explanation: "Great job! 'Apple' means আপেল। 🍏",
    hint: "এটি লাল রঙের মিষ্টি একটি ফল।"
  },

  // ✏️ Class 2
  {
    id: "c2-1",
    classId: "class-2",
    gradeName: "২য় শ্রেণি",
    subject: "প্রাথমিক গণিত",
    question: "৪ এর ঘরের নামতা অনুযায়ী ৪ × ৩ = কত?",
    imageEmoji: "🔢",
    options: [
      { label: "১০", isCorrect: false },
      { label: "১২", isCorrect: true },
      { label: "১৪", isCorrect: false },
      { label: "১৬", isCorrect: false }
    ],
    explanation: "ঠিক উত্তর! চার একে চার, চার দুগুণে আট, তিন চারে বারো (১২)। 👏",
    hint: "৪ কে তিনবার যোগ করো (৪ + ৪ + ৪)।"
  },
  {
    id: "c2-2",
    classId: "class-2",
    gradeName: "২য় শ্রেণি",
    subject: "বাংলা",
    question: "‘ভোর’ শব্দের সঠিক সমার্থক শব্দ কোনটি?",
    imageEmoji: "🌅",
    options: [
      { label: "রাত", isCorrect: false },
      { label: "সকাল", isCorrect: true },
      { label: "দুপুর", isCorrect: false },
      { label: "সন্ধ্যা", isCorrect: false }
    ],
    explanation: "চমৎকার! ভোর বা প্রভাত মানে সকালবেলা যখন সূর্য ওঠে। ☀️",
    hint: "দিনের শুরুর সময়কে নির্দেশ করে।"
  },
  {
    id: "c2-3",
    classId: "class-2",
    gradeName: "২য় শ্রেণি",
    subject: "পরিবেশ ও স্বাস্থ্য",
    question: "খাওয়ার আগে ও শৌচাগার ব্যবহারের পরে কী দিয়ে ভালোভাবে হাত ধোয়া উচিত?",
    imageEmoji: "🧼",
    options: [
      { label: "শুধু পানি দিয়ে", isCorrect: false },
      { label: "সাবান ও পরিষ্কার পানি দিয়ে", isCorrect: true },
      { label: "পোশাক দিয়ে মুছে", isCorrect: false },
      { label: "ধোয়ার প্রয়োজন নেই", isCorrect: false }
    ],
    explanation: "একদম ঠিক! সাবান-পানি দিয়ে অন্তত ২০ সেকেন্ড হাত ধুলে জীবাণু ধ্বংস হয়। 🧼",
    hint: "জীবাণুমুক্ত থাকার সঠিক স্বাস্থ্যবিধি।"
  },

  // 📖 Class 3
  {
    id: "c3-1",
    classId: "class-3",
    gradeName: "৩য় শ্রেণি",
    subject: "প্রাথমিক গণিত",
    question: "একটি প্যাকেটে ২৪টি লজেন্স আছে। ৪ জন শিশুর মধ্যে সমানভাগে ভাগ করে দিলে প্রত্যেকে কয়টি পাবে?",
    imageEmoji: "🍬",
    options: [
      { label: "৫টি", isCorrect: false },
      { label: "৬টি", isCorrect: true },
      { label: "৭টি", isCorrect: false },
      { label: "৮টি", isCorrect: false }
    ],
    explanation: "সঠিক হিসাব! ২৪ ÷ ৪ = ৬টি। প্রত্যেকে ৬টি করে লজেন্স পাবে! 🎯",
    hint: "২৪ কে ৪ দিয়ে ভাগ করো।"
  },
  {
    id: "c3-2",
    classId: "class-3",
    gradeName: "৩য় শ্রেণি",
    subject: "প্রাথমিক বিজ্ঞান",
    question: "উদ্ভিদ নিজের খাদ্য তৈরির জন্য বাতাসের কোন উপাদানটি গ্রহণ করে?",
    imageEmoji: "🌱",
    options: [
      { label: "অক্সিজেন", isCorrect: false },
      { label: "কার্বন ডাই-অক্সাইড", isCorrect: true },
      { label: "নাইট্রোজেন", isCorrect: false },
      { label: "হিলিয়াম", isCorrect: false }
    ],
    explanation: "দারুণ বিজ্ঞান জ্ঞান! উদ্ভিদ সালোকসংশ্লেষণ প্রক্রিয়ায় কার্বন ডাই-অক্সাইড গ্রহণ করে এবং অক্সিজেন ত্যাগ করে। 🌿",
    hint: "প্রাণী যে গ্যাস ত্যাগ করে উদ্ভিদ সেটি গ্রহণ করে।"
  },
  {
    id: "c3-3",
    classId: "class-3",
    gradeName: "৩য় শ্রেণি",
    subject: "বাংলা সাহিত্য",
    question: "আমাদের জাতীয় কবি কাজী নজরুল ইসলামকে কোন উপাধিতে ডাকা হয়?",
    imageEmoji: "✍️",
    options: [
      { label: "বিশ্বকবি", isCorrect: false },
      { label: "বিদ্রোহী কবি", isCorrect: true },
      { label: "পল্লিকবি", isCorrect: false },
      { label: "চারণ কবি", isCorrect: false }
    ],
    explanation: "সঠিক উত্তর! কাজী নজরুল ইসলাম আমাদের 'বিদ্রোহী কবি' এবং জাতীয় কবি। 🇧🇩",
    hint: "অন্যায় ও শোষণের বিরুদ্ধে তাঁর তেজস্বী কবিতার জন্য এই উপাধি।"
  },

  // 🔬 Class 4
  {
    id: "c4-1",
    classId: "class-4",
    gradeName: "৪র্থ শ্রেণি",
    subject: "প্রাথমিক গণিত",
    question: "১২ এবং ১৮-এর গরিষ্ঠ সাধারণ গুণনীয়ক (গ.সা.গু) কত?",
    imageEmoji: "📐",
    options: [
      { label: "২", isCorrect: false },
      { label: "৩", isCorrect: false },
      { label: "৬", isCorrect: true },
      { label: "৩৬", isCorrect: false }
    ],
    explanation: "সঠিক! ১২-এর গুণনীয়ক: ১,২,৩,৪,৬,১২ এবং ১৮-এর গুণনীয়ক: ১,২,৩,৬,৯,১৮। এদের সাধারণ ও সর্বোচ্চ হলো ৬। 🎯",
    hint: "যে বৃহত্তম সংখ্যা দিয়ে ১২ ও ১৮ উভয়কেই ভাগ করা যায়।"
  },
  {
    id: "c4-2",
    classId: "class-4",
    gradeName: "৪র্থ শ্রেণি",
    subject: "প্রাথমিক বিজ্ঞান",
    question: "উদ্ভিদের মূল বা শিকড়ের প্রধান কাজ কোনটি?",
    imageEmoji: "🌳",
    options: [
      { label: "মাটি থেকে পানি ও খনিজ লবণ শোষণ করা", isCorrect: true },
      { label: "ফুল ও ফল ধারণ করা", isCorrect: false },
      { label: "সূর্যের আলো শোষণ করা", isCorrect: false },
      { label: "বীজ তৈরি করা", isCorrect: false }
    ],
    explanation: "চমৎকার! মূল গাছকে শক্তভাবে মাটির সাথে আটকে রাখে এবং মাটি থেকে পানি ও পুষ্টি উপাদান সংগ্রহ করে। 💧",
    hint: "মাটির নিচে অবস্থান করে জলীয় উপাদান সংগ্রহ করে।"
  },
  {
    id: "c4-3",
    classId: "class-4",
    gradeName: "৪র্থ শ্রেণি",
    subject: "বাংলাদেশ ও বিশ্বপরিচয়",
    question: "কত তারিখে বাংলাদেশের বিজয় দিবস উদযাপিত হয়?",
    imageEmoji: "🎖️",
    options: [
      { label: "২৬শে মার্চ", isCorrect: false },
      { label: "১৬ই ডিসেম্বর", isCorrect: true },
      { label: "২১শে ফেব্রুয়ারি", isCorrect: false },
      { label: "১৫ই আগস্ট", isCorrect: false }
    ],
    explanation: "সঠিক! ১৯৭১ সালের ১৬ই ডিসেম্বর নয় মাসের রক্তক্ষয়ী মুক্তিযুদ্ধের পর চূড়ান্ত বিজয় অর্জিত হয়েছিল। 🇧🇩",
    hint: "ডিসেম্বর মাসের মাঝামাঝি সময়ের ঐতিহাসিক দিন।"
  },

  // 🎓 Class 5
  {
    id: "c5-1",
    classId: "class-5",
    gradeName: "৫ম শ্রেণি",
    subject: "প্রাথমিক গণিত",
    question: "একটি বইয়ের লিখিত মূল্য ২০০ টাকা। দোকানদার ২৫% ছাড় দিলে বইটির বিক্রয়মূল্য কত টাকা?",
    imageEmoji: "🏷️",
    options: [
      { label: "১৭৫ টাকা", isCorrect: false },
      { label: "১৫০ টাকা", isCorrect: true },
      { label: "১৬০ টাকা", isCorrect: false },
      { label: "১২৫ টাকা", isCorrect: false }
    ],
    explanation: "অসাধারণ! ২০০ টাকার ২৫% = (২০০ × ২৫)/১০০ = ৫০ টাকা ছাড়। অতএব বিক্রয়মূল্য = ২০০ - ৫০ = ১৫০ টাকা! 🎯",
    hint: "প্রথমে ২৫% ছাড়ের পরিমাণ বের করে লিখিত মূল্য থেকে বিয়োগ করো।"
  },
  {
    id: "c5-2",
    classId: "class-5",
    gradeName: "৫ম শ্রেণি",
    subject: "প্রাথমিক বিজ্ঞান",
    question: "বায়ুমণ্ডলে শতকরা কোন গ্যাসের পরিমাণ সর্বাধিক?",
    imageEmoji: "🌍",
    options: [
      { label: "অক্সিজেন (২১%)", isCorrect: false },
      { label: "নাইট্রোজেন (৭৮%)", isCorrect: true },
      { label: "কার্বন ডাই-অক্সাইড (০.০৩%)", isCorrect: false },
      { label: "আর্গন (০.৯%)", isCorrect: false }
    ],
    explanation: "একদম সঠিক! বায়ুমণ্ডলের প্রায় ৭৮ ভাগই নাইট্রোজেন গ্যাস এবং প্রায় ২১ ভাগ অক্সিজেন গ্যাস। 💨",
    hint: "এই গ্যাসটি বায়ুমণ্ডলের প্রায় চার-পঞ্চমাংশ দখল করে আছে।"
  },
  {
    id: "c5-3",
    classId: "class-5",
    gradeName: "৫ম শ্রেণি",
    subject: "বাংলাদেশ ও বিশ্বপরিচয়",
    question: "১৯৭১ সালের ১৭ই এপ্রিল ঐতিহাসিক মুজিবনগর সরকার কোথায় শপথ গ্রহণ করে?",
    imageEmoji: "🏛️",
    options: [
      { label: "মেহেরপুরের বৈদ্যনাথতলার আম্রকাননে", isCorrect: true },
      { label: "ঢাকার রেসকোর্স ময়দানে", isCorrect: false },
      { label: "চট্টগ্রামের কালুরঘাটে", isCorrect: false },
      { label: "কুষ্টিয়ার শিলাইদহে", isCorrect: false }
    ],
    explanation: "অসাধারণ ঐতিহাসিক জ্ঞান! মেহেরপুর জেলার বৈদ্যনাথতলার (বর্তমান মুজিবনগর) ভবেরপাড়া আমবাগানে স্বাধীন বাংলাদেশের প্রথম সরকার শপথ গ্রহণ করে। 🇧🇩",
    hint: "মেহেরপুর জেলার একটি বিখ্যাত আম্রকানন।"
  }
];
