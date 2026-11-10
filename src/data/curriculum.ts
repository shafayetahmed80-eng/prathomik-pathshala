export interface BookItem {
  id: string;
  name: string;
  type: "textbook" | "teachers_guide";
  subject: string;
  color: string;
  icon: string;
  description: string;
}

export interface ClassGrade {
  id: string;
  name: string;
  banglaName: string;
  ageGroup: string;
  color: string;
  accent: string;
  icon: string;
  description: string;
  subjects: string[];
  textbooks: BookItem[];
  teachersGuides: BookItem[];
}

export const CLASSES_DATA: ClassGrade[] = [
  {
    id: "pre-primary",
    name: "Pre-Primary",
    banglaName: "প্রাক-প্রাথমিক",
    ageGroup: "৪-৫ বছর",
    color: "from-pink-500 to-rose-400",
    accent: "bg-rose-100 text-rose-700 border-rose-300",
    icon: "🧸",
    description: "খেলার ছলে বর্ণমালা, আঁকাআঁকি ও ছড়ার মাধ্যমে আনন্দের সাথে প্রথম পড়ালেখা শুরু।",
    subjects: [
      "এসো আঁকিবুঁকি করি",
      "আমার বই",
      "এসো লিখতে শিখি"
    ],
    textbooks: [
      {
        id: "pre-1",
        name: "এসো আঁকিবুঁকি করি (৪+)",
        type: "textbook",
        subject: "আঁকাআঁকি",
        color: "bg-pink-500",
        icon: "🎨",
        description: "রং ও রেখার সাথে পরিচয় এবং মুক্ত চিত্রাঙ্কন।"
      },
      {
        id: "pre-2",
        name: "আমার বই (৫+)",
        type: "textbook",
        subject: "সমন্বিত শিক্ষা",
        color: "bg-emerald-500",
        icon: "📖",
        description: "ভাষা, সংখ্যা ও পরিবেশ সচেতনতার আকর্ষণীয় পাঠ।"
      },
      {
        id: "pre-3",
        name: "এসো লিখতে শিখি (৫+)",
        type: "textbook",
        subject: "হাতেখড়ি",
        color: "bg-cyan-500",
        icon: "✏️",
        description: "পেন্সিল ধরা ও বর্ণ ট্রেসিংয়ের সহজ কৌশল।"
      }
    ],
    teachersGuides: [
      {
        id: "pre-tg-1",
        name: "৪+ বয়সী শিশুদের জন্য শিক্ষক সহায়িকা",
        type: "teachers_guide",
        subject: "পদ্ধতি ও রুটিন",
        color: "bg-purple-600",
        icon: "👩‍🏫",
        description: "শিশুবান্ধব আনন্দময় ক্লাস পরিচালনা ও শিখন নির্দেশিকা।"
      }
    ]
  },
  {
    id: "class-1",
    name: "Class 1",
    banglaName: "১ম শ্রেণি",
    ageGroup: "৬ বছর",
    color: "from-amber-500 to-orange-400",
    accent: "bg-amber-100 text-amber-700 border-amber-300",
    icon: "🎒",
    description: "বর্ণ চেনা, শব্দ গঠন, সহজ যোগ-বিয়োগ এবং আনন্দময় প্রাথমিক শিখন।",
    subjects: [
      "বাংলা",
      "English",
      "গণিত",
      "ধর্ম শিক্ষা",
      "বিজ্ঞান ও সমাজ",
      "শিল্পকলা",
      "স্বাস্থ্য"
    ],
    textbooks: [
      {
        id: "c1-1",
        name: "আমার বাংলা বই",
        type: "textbook",
        subject: "বাংলা",
        color: "bg-emerald-600",
        icon: "🇧🇩",
        description: "স্বরবর্ণ, ব্যঞ্জনবর্ণ, ছড়া ও শব্দ পরিচিতি।"
      },
      {
        id: "c1-2",
        name: "English for Today",
        type: "textbook",
        subject: "English",
        color: "bg-sky-600",
        icon: "🔤",
        description: "Rhymes, greetings, alphabet & early vocabulary."
      },
      {
        id: "c1-3",
        name: "প্রাথমিক গণিত",
        type: "textbook",
        subject: "গণিত",
        color: "bg-indigo-600",
        icon: "🔢",
        description: "১ থেকে ১০০ গণনা, আকার আকৃতি ও সহজ যোগ-বিয়োগ।"
      }
    ],
    teachersGuides: [
      {
        id: "c1-tg-1",
        name: "বাংলা শিক্ষক সহায়িকা",
        type: "teachers_guide",
        subject: "বাংলা",
        color: "bg-emerald-700",
        icon: "📘",
        description: "বাংলা পঠন ও লিখন দক্ষতার পাঠ পরিকল্পনা।"
      },
      {
        id: "c1-tg-2",
        name: "English Teacher's Guide",
        type: "teachers_guide",
        subject: "English",
        color: "bg-sky-700",
        icon: "📘",
        description: "Interactive communicative language teaching steps."
      },
      {
        id: "c1-tg-3",
        name: "গণিত শিক্ষক সহায়িকা",
        type: "teachers_guide",
        subject: "গণিত",
        color: "bg-indigo-700",
        icon: "📘",
        description: "বাস্তব উপকরণের সাহায্যে গণিত ধারণা দেওয়ার পদ্ধতি।"
      },
      {
        id: "c1-tg-4",
        name: "সামাজিক বিজ্ঞান ও প্রাথমিক বিজ্ঞান",
        type: "teachers_guide",
        subject: "বিজ্ঞান ও সমাজ",
        color: "bg-teal-700",
        icon: "📘",
        description: "পরিবেশ ও প্রাথমিক বিজ্ঞান শিখন নির্দেশনা।"
      },
      {
        id: "c1-tg-5",
        name: "ইসলাম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-emerald-800",
        icon: "📘",
        description: "নৈতিক মূল্যবোধ ও ইসলামিক শিষ্টাচার পাঠ।"
      },
      {
        id: "c1-tg-6",
        name: "হিন্দুধর্ম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-orange-700",
        icon: "📘",
        description: "হিন্দুধর্মীয় নীতি ও নৈতিক শিক্ষা সহায়িকা।"
      },
      {
        id: "c1-tg-7",
        name: "বৌদ্ধধর্ম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-amber-700",
        icon: "📘",
        description: "বৌদ্ধ অহিংস নীতি ও নৈতিক শিক্ষা সহায়িকা।"
      },
      {
        id: "c1-tg-8",
        name: "খ্রিষ্টধর্ম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-blue-700",
        icon: "📘",
        description: "খ্রিষ্টীয় মানবিক মূল্যবোধ ও সদাচার পাঠ।"
      },
      {
        id: "c1-tg-9",
        name: "শারীরিক ও মানসিক স্বাস্থ্য শিক্ষা",
        type: "teachers_guide",
        subject: "স্বাস্থ্য",
        color: "bg-rose-700",
        icon: "📘",
        description: "সুস্থ দেহ ও মন গঠনের আনন্দময় শারীরিক শিক্ষা।"
      },
      {
        id: "c1-tg-10",
        name: "শিল্পকলা শিক্ষক সহায়িকা",
        type: "teachers_guide",
        subject: "শিল্পকলা",
        color: "bg-pink-700",
        icon: "📘",
        description: "চিত্রাঙ্কন, সঙ্গীত ও নাটকের মাধ্যমে শিখন।"
      }
    ]
  },
  {
    id: "class-2",
    name: "Class 2",
    banglaName: "২য় শ্রেণি",
    ageGroup: "৭ বছর",
    color: "from-emerald-500 to-teal-400",
    accent: "bg-emerald-100 text-emerald-700 border-emerald-300",
    icon: "✏️",
    description: "বাক্য পড়া, ছোট গল্প বলা, নামতা ও পরিবেশ পরিচিতি।",
    subjects: [
      "বাংলা",
      "English",
      "গণিত",
      "ধর্ম শিক্ষা",
      "পরিবেশ পরিচিতি",
      "শিল্পকলা",
      "স্বাস্থ্য"
    ],
    textbooks: [
      {
        id: "c2-1",
        name: "আমার বাংলা বই",
        type: "textbook",
        subject: "বাংলা",
        color: "bg-emerald-600",
        icon: "🇧🇩",
        description: "যুক্তবর্ণ, শিক্ষণীয় গল্প ও কবিতার সহজ পাঠ।"
      },
      {
        id: "c2-2",
        name: "English for Today",
        type: "textbook",
        subject: "English",
        color: "bg-sky-600",
        icon: "🔤",
        description: "Short stories, questions & daily conversations."
      },
      {
        id: "c2-3",
        name: "প্রাথমিক গণিত",
        type: "textbook",
        subject: "গণিত",
        color: "bg-indigo-600",
        icon: "🔢",
        description: "গুণ ও ভাগের প্রাথমিক ধারণা, জ্যামিতি ও সময়।"
      }
    ],
    teachersGuides: [
      {
        id: "c2-tg-1",
        name: "বাংলা শিক্ষক সহায়িকা",
        type: "teachers_guide",
        subject: "বাংলা",
        color: "bg-emerald-700",
        icon: "📘",
        description: "ভাষার সাবলীলতা ও উচ্চারণ সংশোধনের পাঠ নির্দেশনা।"
      },
      {
        id: "c2-tg-2",
        name: "English Teacher's Guide",
        type: "teachers_guide",
        subject: "English",
        color: "bg-sky-700",
        icon: "📘",
        description: "Pair work & activity based teaching strategies."
      },
      {
        id: "c2-tg-3",
        name: "গণিত শিক্ষক সহায়িকা",
        type: "teachers_guide",
        subject: "গণিত",
        color: "bg-indigo-700",
        icon: "📘",
        description: "নামতা শেখানোর আনন্দময় গেম ও টেকনিক।"
      },
      {
        id: "c2-tg-4",
        name: "পরিবেশ পরিচিতি, সমাজ ও বিজ্ঞান",
        type: "teachers_guide",
        subject: "বিজ্ঞান ও সমাজ",
        color: "bg-teal-700",
        icon: "📘",
        description: "আমাদের পরিবেশ ও সমাজের সহজ পাঠদান কৌশল।"
      },
      {
        id: "c2-tg-5",
        name: "ইসলাম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-emerald-800",
        icon: "📘",
        description: "ইসলামিক আচরণ ও নৈতিক চরিত্র গঠন সহায়িকা।"
      },
      {
        id: "c2-tg-6",
        name: "হিন্দুধর্ম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-orange-700",
        icon: "📘",
        description: "হিন্দু ধর্মীয় শিক্ষা ও নৈতিকতার পাঠ নির্দেশিকা।"
      },
      {
        id: "c2-tg-7",
        name: "বৌদ্ধধর্ম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-amber-700",
        icon: "📘",
        description: "শান্তি ও সত্যনিষ্ঠার বৌদ্ধ শিক্ষা সহায়িকা।"
      },
      {
        id: "c2-tg-8",
        name: "খ্রিষ্টধর্ম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-blue-700",
        icon: "📘",
        description: "খ্রিষ্টধর্মীয় সেবা ও নৈতিকতার পাঠ সহায়িকা।"
      },
      {
        id: "c2-tg-9",
        name: "শারীরিক ও মানসিক স্বাস্থ্য শিক্ষা",
        type: "teachers_guide",
        subject: "স্বাস্থ্য",
        color: "bg-rose-700",
        icon: "📘",
        description: "দৈনিক ব্যায়াম ও স্বাস্থ্যসম্মত অভ্যাসের চর্চা।"
      },
      {
        id: "c2-tg-10",
        name: "শিল্পকলা শিক্ষক সহায়িকা",
        type: "teachers_guide",
        subject: "শিল্পকলা",
        color: "bg-pink-700",
        icon: "📘",
        description: "শিশুদের সৃজনশীল শিল্প ও চারুকলার বিকাশ।"
      }
    ]
  },
  {
    id: "class-3",
    name: "Class 3",
    banglaName: "৩য় শ্রেণি",
    ageGroup: "৮ বছর",
    color: "from-sky-500 to-blue-500",
    accent: "bg-sky-100 text-sky-700 border-sky-300",
    icon: "📖",
    description: "বিজ্ঞান, সমাজ, ধর্মশিক্ষা ও পরিবেশের নতুন দিগন্ত উন্মোচন।",
    subjects: [
      "বাংলা",
      "English",
      "গণিত",
      "প্রাথমিক বিজ্ঞান",
      "বাংলাদেশ ও বিশ্বপরিচয়",
      "ইসলাম শিক্ষা",
      "হিন্দুধর্ম",
      "বৌদ্ধধর্ম",
      "খ্রিষ্টধর্ম"
    ],
    textbooks: [
      {
        id: "c3-1",
        name: "আমার বাংলা বই",
        type: "textbook",
        subject: "বাংলা",
        color: "bg-emerald-600",
        icon: "🇧🇩",
        description: "দেশপ্রেম, প্রকৃতি ও নৈতিক শিক্ষামূলক সাহিত্য।"
      },
      {
        id: "c3-2",
        name: "English For Today",
        type: "textbook",
        subject: "English",
        color: "bg-sky-600",
        icon: "🔤",
        description: "Grammar, reading comprehension & dialogues."
      },
      {
        id: "c3-3",
        name: "প্রাথমিক গণিত",
        type: "textbook",
        subject: "গণিত",
        color: "bg-indigo-600",
        icon: "🔢",
        description: "চার নিয়ম (যোগ, বিয়োগ, গুণ, ভাগ) ও ভগ্নাংশের সূচনা।"
      },
      {
        id: "c3-4",
        name: "প্রাথমিক বিজ্ঞান",
        type: "textbook",
        subject: "বিজ্ঞান",
        color: "bg-teal-600",
        icon: "🔬",
        description: "জীব ও জড়, শক্তি, স্বাস্থ্যবিধি ও প্রযুক্তির ব্যবহার।"
      },
      {
        id: "c3-5",
        name: "বাংলাদেশ ও বিশ্বপরিচয়",
        type: "textbook",
        subject: "সমাজ",
        color: "bg-amber-600",
        icon: "🌍",
        description: "আমাদের অধিকার, পরিবেশ ও সমাজের রীতিনীতি।"
      },
      {
        id: "c3-6",
        name: "ইসলাম শিক্ষা",
        type: "textbook",
        subject: "ধর্ম",
        color: "bg-emerald-700",
        icon: "🌙",
        description: "আকাইদ, ইবাদত, কুরআন মাজিদ শিক্ষা ও মহানবী (সা.)-এর জীবনাদর্শ।"
      },
      {
        id: "c3-7",
        name: "হিন্দুধর্ম শিক্ষা",
        type: "textbook",
        subject: "ধর্ম",
        color: "bg-orange-600",
        icon: "🕉️",
        description: "ঈশ্বর ও দেবদেবী, পূজা-পার্বণ ও মহাপুরুষদের জীবনাদর্শ।"
      },
      {
        id: "c3-8",
        name: "বৌদ্ধধর্ম শিক্ষা",
        type: "textbook",
        subject: "ধর্ম",
        color: "bg-amber-600",
        icon: "☸️",
        description: "গৌতম বুদ্ধের জীবন ও পঞ্চশীল পালন।"
      },
      {
        id: "c3-9",
        name: "খ্রিষ্টধর্ম শিক্ষা",
        type: "textbook",
        subject: "ধর্ম",
        color: "bg-blue-600",
        icon: "✝️",
        description: "যিশুখ্রিষ্টের শিক্ষা, প্রার্থনা ও সদাচরণ।"
      }
    ],
    teachersGuides: [
      {
        id: "c3-tg-1",
        name: "আমার বাংলা বই",
        type: "teachers_guide",
        subject: "বাংলা",
        color: "bg-emerald-700",
        icon: "📘",
        description: "বাংলা ভাষা ও সাহিত্যের বিস্তারিত পাঠ পরিকল্পনা।"
      },
      {
        id: "c3-tg-2",
        name: "English For Today",
        type: "teachers_guide",
        subject: "English",
        color: "bg-sky-700",
        icon: "📘",
        description: "Interactive English lesson plans & teacher guidance."
      },
      {
        id: "c3-tg-3",
        name: "প্রাথমিক গণিত",
        type: "teachers_guide",
        subject: "গণিত",
        color: "bg-indigo-700",
        icon: "📘",
        description: "সমস্যা সমাধানভিত্তিক চিন্তাশক্তি গড়ে তোলার কৌশল।"
      },
      {
        id: "c3-tg-4",
        name: "বিজ্ঞান",
        type: "teachers_guide",
        subject: "বিজ্ঞান",
        color: "bg-teal-700",
        icon: "📘",
        description: "ছোট ছোট ব্যবহারিক পরীক্ষা ও পর্যবেক্ষণমূলক পাঠ।"
      },
      {
        id: "c3-tg-5",
        name: "বাংলাদেশ ও বিশ্বপরিচয়",
        type: "teachers_guide",
        subject: "সমাজ",
        color: "bg-amber-700",
        icon: "📘",
        description: "সামাজিক পরিবেশ ও নাগরিক অধিকার শিখন গাইড।"
      },
      {
        id: "c3-tg-6",
        name: "ইসলাম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-emerald-800",
        icon: "📘",
        description: "ইসলামি শিখন ও নৈতিক আচরণ শিক্ষণ পদ্ধতি।"
      },
      {
        id: "c3-tg-7",
        name: "হিন্দুধর্ম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-orange-700",
        icon: "📘",
        description: "হিন্দু ধর্মীয় আদর্শ ও নৈতিকতার পাঠ সহায়িকা।"
      },
      {
        id: "c3-tg-8",
        name: "বৌদ্ধধর্ম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-amber-700",
        icon: "📘",
        description: "বৌদ্ধ দর্শন ও অহিংস শিখন সহায়িকা।"
      },
      {
        id: "c3-tg-9",
        name: "খ্রিষ্টধর্ম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-blue-700",
        icon: "📘",
        description: "খ্রিষ্টীয় বিশ্বাস ও মানবপ্রেম পাঠ সহায়িকা।"
      },
      {
        id: "c3-tg-10",
        name: "শারীরিক ও মানসিক স্বাস্থ্য শিক্ষা",
        type: "teachers_guide",
        subject: "স্বাস্থ্য",
        color: "bg-rose-700",
        icon: "📘",
        description: "শারীরিক সুস্থতা ও মানসিক বিকাশ নির্দেশিকা।"
      },
      {
        id: "c3-tg-11",
        name: "শিল্পকলা",
        type: "teachers_guide",
        subject: "শিল্পকলা",
        color: "bg-pink-700",
        icon: "📘",
        description: "শিল্পকলা, সঙ্গীত ও নান্দনিক সৃজনশীলতা পাঠ।"
      }
    ]
  },
  {
    id: "class-4",
    name: "Class 4",
    banglaName: "৪র্থ শ্রেণি",
    ageGroup: "৯ বছর",
    color: "from-indigo-500 to-purple-500",
    accent: "bg-indigo-100 text-indigo-700 border-indigo-300",
    icon: "🔬",
    description: "বিশ্লেষণধর্মী পড়াশোনা, বিজ্ঞানের ব্যবহারিক পরীক্ষা ও ইতিহাস পরিচিতি।",
    subjects: [
      "বাংলা",
      "English",
      "গণিত",
      "প্রাথমিক বিজ্ঞান",
      "বাংলাদেশ ও বিশ্বপরিচয়",
      "ইসলাম শিক্ষা",
      "হিন্দুধর্ম",
      "বৌদ্ধধর্ম",
      "খ্রিষ্টধর্ম"
    ],
    textbooks: [
      {
        id: "c4-1",
        name: "আমার বাংলা বই",
        type: "textbook",
        subject: "বাংলা",
        color: "bg-emerald-600",
        icon: "🇧🇩",
        description: "মুক্তিযুদ্ধের ইতিহাস ও উন্নত ভাষা সাহিত্য।"
      },
      {
        id: "c4-2",
        name: "English For Today",
        type: "textbook",
        subject: "English",
        color: "bg-sky-600",
        icon: "🔤",
        description: "Reading passage, writing letters & descriptive English."
      },
      {
        id: "c4-3",
        name: "প্রাথমিক গণিত",
        type: "textbook",
        subject: "গণিত",
        color: "bg-indigo-600",
        icon: "🔢",
        description: "লসাগু, গসাগু, দশমিক ভগ্নাংশ ও পরিমাপ।"
      },
      {
        id: "c4-4",
        name: "প্রাথমিক বিজ্ঞান",
        type: "textbook",
        subject: "বিজ্ঞান",
        color: "bg-teal-600",
        icon: "🔬",
        description: "উদ্ভিদ, প্রাণী, মাটি, পানি ও আবহাওয়ার বিজ্ঞান।"
      },
      {
        id: "c4-5",
        name: "বাংলাদেশ ও বিশ্বপরিচয়",
        type: "textbook",
        subject: "সমাজ",
        color: "bg-amber-600",
        icon: "🌍",
        description: "বাংলাদেশের ভূপ্রকৃতি, নাগরিক দায়িত্ব ও কৃষ্টি।"
      },
      {
        id: "c4-6",
        name: "ইসলাম শিক্ষা",
        type: "textbook",
        subject: "ধর্ম",
        color: "bg-emerald-700",
        icon: "🌙",
        description: "ঈমান, আখলাক, সালাত ও চরিত্র গঠনের মূল শিক্ষা।"
      },
      {
        id: "c4-7",
        name: "হিন্দুধর্ম শিক্ষা",
        type: "textbook",
        subject: "ধর্ম",
        color: "bg-orange-600",
        icon: "🕉️",
        description: "ধর্মীয় উৎসব, পুণ্যশ্লোক ও মহাভারতের শিক্ষণীয় গল্প।"
      },
      {
        id: "c4-8",
        name: "বৌদ্ধধর্ম শিক্ষা",
        type: "textbook",
        subject: "ধর্ম",
        color: "bg-amber-600",
        icon: "☸️",
        description: "ত্রিশরণ, জাতকের গল্প ও বৌদ্ধ সংস্কৃতি।"
      },
      {
        id: "c4-9",
        name: "খ্রিষ্টধর্ম শিক্ষা",
        type: "textbook",
        subject: "ধর্ম",
        color: "bg-blue-600",
        icon: "✝️",
        description: "বাইবেলের শিক্ষণীয় কাহিনী ও খ্রিষ্টীয় আদর্শ।"
      }
    ],
    teachersGuides: [
      {
        id: "c4-tg-1",
        name: "আমার বাংলা বই",
        type: "teachers_guide",
        subject: "বাংলা",
        color: "bg-emerald-700",
        icon: "📘",
        description: "ব্যাকরণ ও সৃজনশীল সাহিত্য পাঠদান কৌশল।"
      },
      {
        id: "c4-tg-2",
        name: "English For Today",
        type: "teachers_guide",
        subject: "English",
        color: "bg-sky-700",
        icon: "📘",
        description: "Grammar, writing & comprehension facilitation guide."
      },
      {
        id: "c4-tg-3",
        name: "প্রাথমিক গণিত",
        type: "teachers_guide",
        subject: "গণিত",
        color: "bg-indigo-700",
        icon: "📘",
        description: "ভগ্নাংশ ও জ্যামিতির বাস্তবভিত্তিক পাঠ পরিচালনা।"
      },
      {
        id: "c4-tg-4",
        name: "বিজ্ঞান",
        type: "teachers_guide",
        subject: "বিজ্ঞান",
        color: "bg-teal-700",
        icon: "📘",
        description: "প্রকৃতি পর্যবেক্ষণ ও দলগত প্রজেক্টের পরিকল্পনা।"
      },
      {
        id: "c4-tg-5",
        name: "বাংলাদেশ ও বিশ্বপরিচয়",
        type: "teachers_guide",
        subject: "সমাজ",
        color: "bg-amber-700",
        icon: "📘",
        description: "ইতিহাস ও ভৌগোলিক পরিবেশ শিক্ষাদান সহায়িকা।"
      },
      {
        id: "c4-tg-6",
        name: "ইসলাম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-emerald-800",
        icon: "📘",
        description: "ইসলামি আদর্শ ও নৈতিকতা পাঠ সহায়িকা।"
      },
      {
        id: "c4-tg-7",
        name: "হিন্দুধর্ম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-orange-700",
        icon: "📘",
        description: "সনাতন ধর্ম ও মানবিক গুণাবলী শিক্ষণ পদ্ধতি।"
      },
      {
        id: "c4-tg-8",
        name: "বৌদ্ধধর্ম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-amber-700",
        icon: "📘",
        description: "বৌদ্ধ ধর্ম ও কৃষ্টি পাঠ পরিচালনা সহায়িকা।"
      },
      {
        id: "c4-tg-9",
        name: "খ্রিষ্টধর্ম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-blue-700",
        icon: "📘",
        description: "খ্রিষ্টীয় মূল্যবোধ ও নৈতিক শিক্ষা সহায়িকা।"
      },
      {
        id: "c4-tg-10",
        name: "শারীরিক ও মানসিক স্বাস্থ্য শিক্ষা",
        type: "teachers_guide",
        subject: "স্বাস্থ্য",
        color: "bg-rose-700",
        icon: "📘",
        description: "শারীরিক কসরত ও খেলাধুলার পাঠ পরিকল্পনা।"
      },
      {
        id: "c4-tg-11",
        name: "শিল্পকলা",
        type: "teachers_guide",
        subject: "শিল্পকলা",
        color: "bg-pink-700",
        icon: "📘",
        description: "চারু ও কারুকলার নান্দনিক দক্ষতা উন্নয়ন।"
      }
    ]
  },
  {
    id: "class-5",
    name: "Class 5",
    banglaName: "৫ম শ্রেণি",
    ageGroup: "১০ বছর",
    color: "from-purple-500 to-pink-500",
    accent: "bg-purple-100 text-purple-700 border-purple-300",
    icon: "🎓",
    description: "প্রাথমিক স্তরের চূড়ান্ত প্রস্তুতি, নেতৃত্ব গুণাবলী ও গভীর জ্ঞানার্জন।",
    subjects: [
      "বাংলা",
      "English",
      "গণিত",
      "প্রাথমিক বিজ্ঞান",
      "বাংলাদেশ ও বিশ্বপরিচয়",
      "ইসলাম শিক্ষা",
      "হিন্দুধর্ম",
      "বৌদ্ধধর্ম",
      "খ্রিষ্টধর্ম"
    ],
    textbooks: [
      {
        id: "c5-1",
        name: "আমার বাংলা বই",
        type: "textbook",
        subject: "বাংলা",
        color: "bg-emerald-600",
        icon: "🇧🇩",
        description: "বাংলাদেশের ঐতিহ্য, মননশীল প্রবন্ধ ও রচনা শৈলী।"
      },
      {
        id: "c5-2",
        name: "English For Today",
        type: "textbook",
        subject: "English",
        color: "bg-sky-600",
        icon: "🔤",
        description: "Comprehensive grammar, critical reading & storytelling."
      },
      {
        id: "c5-3",
        name: "প্রাথমিক গণিত",
        type: "textbook",
        subject: "গণিত",
        color: "bg-indigo-600",
        icon: "🔢",
        description: "ঐকিক নিয়ম, শতকড়া, লাভ-ক্ষতি, জ্যামিতিক কোণ ও বৃত্ত।"
      },
      {
        id: "c5-4",
        name: "প্রাথমিক বিজ্ঞান",
        type: "textbook",
        subject: "বিজ্ঞান",
        color: "bg-teal-600",
        icon: "🔬",
        description: "পরিবেশ দূষণ, স্বাস্থ্য ও রোগব্যাধি, মহাবিশ্ব ও তথ্যপ্রযুক্তি।"
      },
      {
        id: "c5-5",
        name: "বাংলাদেশ ও বিশ্বপরিচয়",
        type: "textbook",
        subject: "সমাজ",
        color: "bg-amber-600",
        icon: "🌍",
        description: "আমাদের মুক্তিযুদ্ধ, আন্তর্জাতিক সম্পর্ক ও গণতান্ত্রিক মূল্যবোধ।"
      },
      {
        id: "c5-6",
        name: "ইসলাম শিক্ষা",
        type: "textbook",
        subject: "ধর্ম",
        color: "bg-emerald-700",
        icon: "🌙",
        description: "কুরআন মাজিদ ও তাজবিদ, হাদিস শরীফ এবং নবীদের জীবনচরিত।"
      },
      {
        id: "c5-7",
        name: "হিন্দুধর্ম শিক্ষা",
        type: "textbook",
        subject: "ধর্ম",
        color: "bg-orange-600",
        icon: "🕉️",
        description: "শ্রীমদ্ভগবদ্গীতা, ভক্তিতত্ত্ব ও সনাতন জীবনাদর্শ।"
      },
      {
        id: "c5-8",
        name: "বৌদ্ধধর্ম শিক্ষা",
        type: "textbook",
        subject: "ধর্ম",
        color: "bg-amber-600",
        icon: "☸️",
        description: "চার আর্যসত্য, অষ্টাঙ্গিক মার্গ ও বৌদ্ধ ইতিহাস।"
      },
      {
        id: "c5-9",
        name: "খ্রিষ্টধর্ম শিক্ষা",
        type: "textbook",
        subject: "ধর্ম",
        color: "bg-blue-600",
        icon: "✝️",
        description: "খ্রিষ্টমণ্ডলীর ইতিহাস, অনুতাপ ও ক্ষমাশীলতার আদর্শ।"
      }
    ],
    teachersGuides: [
      {
        id: "c5-tg-1",
        name: "আমার বাংলা বই",
        type: "teachers_guide",
        subject: "বাংলা",
        color: "bg-emerald-700",
        icon: "📘",
        description: "প্রাথমিক সমাপনী স্তরের পূর্ণাঙ্গ বাংলা পাঠ পরিকল্পনা।"
      },
      {
        id: "c5-tg-2",
        name: "English For Today",
        type: "teachers_guide",
        subject: "English",
        color: "bg-sky-700",
        icon: "📘",
        description: "Communicative language teaching & assessment guide."
      },
      {
        id: "c5-tg-3",
        name: "প্রাথমিক গণিত",
        type: "teachers_guide",
        subject: "গণিত",
        color: "bg-indigo-700",
        icon: "📘",
        description: "ঐকিক নিয়ম ও শতকড়ার জটিল সমস্যা সহজে বোঝানোর পদ্ধতি।"
      },
      {
        id: "c5-tg-4",
        name: "বিজ্ঞান",
        type: "teachers_guide",
        subject: "বিজ্ঞান",
        color: "bg-teal-700",
        icon: "📘",
        description: "আইসিটি ও আধুনিক বিজ্ঞান শিক্ষাদানের কৌশল।"
      },
      {
        id: "c5-tg-5",
        name: "বাংলাদেশ ও বিশ্বপরিচয়",
        type: "teachers_guide",
        subject: "সমাজ",
        color: "bg-amber-700",
        icon: "📘",
        description: "মুক্তিযুদ্ধের ইতিহাস ও জাতীয় সংস্কৃতি শিক্ষণ নির্দেশিকা।"
      },
      {
        id: "c5-tg-6",
        name: "ইসলাম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-emerald-800",
        icon: "📘",
        description: "ইসলামি ধর্মীয় ও চারিত্রিক শিক্ষা সহায়তা।"
      },
      {
        id: "c5-tg-7",
        name: "হিন্দুধর্ম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-orange-700",
        icon: "📘",
        description: "সনাতন ধর্ম ও নীতিশিক্ষা পাঠদান সহায়িকা।"
      },
      {
        id: "c5-tg-8",
        name: "বৌদ্ধধর্ম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-amber-700",
        icon: "📘",
        description: "বৌদ্ধ ধর্মীয় অনুশাসন ও আদর্শ পাঠ সহায়িকা।"
      },
      {
        id: "c5-tg-9",
        name: "খ্রিষ্টধর্ম ও নৈতিক শিক্ষা",
        type: "teachers_guide",
        subject: "ধর্ম",
        color: "bg-blue-700",
        icon: "📘",
        description: "খ্রিষ্টধর্মীয় শিখন ও নৈতিক চেতনা গঠন।"
      },
      {
        id: "c5-tg-10",
        name: "শারীরিক ও মানসিক স্বাস্থ্য শিক্ষা",
        type: "teachers_guide",
        subject: "স্বাস্থ্য",
        color: "bg-rose-700",
        icon: "📘",
        description: "স্বাস্থ্যসম্মত জীবনযাপন ও শারীরিক কসরত সহায়িকা।"
      },
      {
        id: "c5-tg-11",
        name: "শিল্পকলা",
        type: "teachers_guide",
        subject: "শিল্পকলা",
        color: "bg-pink-700",
        icon: "📘",
        description: "সৃজনশীল শিল্পকলা ও সংস্কৃতি চর্চা সহায়িকা।"
      }
    ]
  }
];

export const FUN_QUIZ_SAMPLE = {
  question: "৫টি আম ছিল। দাদু আরও ৩টি আম দিলেন। এখন মোট কয়টি আম হলো?",
  image: "🥭",
  options: [
    { label: "৬টি", isCorrect: false },
    { label: "৮টি", isCorrect: true },
    { label: "৯টি", isCorrect: false },
    { label: "৭টি", isCorrect: false }
  ],
  explanation: "চমৎকার! ৫ + ৩ = ৮টি আম! 🎉 তুমি একদম সঠিক উত্তর দিয়েছ!"
};
