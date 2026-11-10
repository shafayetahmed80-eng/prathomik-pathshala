"use client";

import { useState } from "react";
import { Sparkles, Printer, Copy, Check, BookOpen, Clock, Target, HelpCircle, Layers, Award } from "lucide-react";

interface LessonPlanData {
  title: string;
  grade: string;
  subject: string;
  duration: string;
  outcomes: string[];
  materials: string[];
  steps: {
    phase: string;
    time: string;
    activities: string;
    teacherRole: string;
    studentRole: string;
  }[];
  evaluation: string[];
  homework: string;
}

const GRADE_NAME_MAP: Record<string, string> = {
  "pre-primary": "প্রাক-প্রাথমিক",
  "class-1": "১ম শ্রেণি",
  "class-2": "২য় শ্রেণি",
  "class-3": "৩য় শ্রেণি",
  "class-4": "৪র্থ শ্রেণি",
  "class-5": "৫ম শ্রেণি",
};

// Intelligent Curriculum-Aligned Lesson Plan Engine for all Primary Subjects
function buildCurriculumLessonPlan(gradeId: string, subject: string, customTopic: string): LessonPlanData {
  const gradeLabel = GRADE_NAME_MAP[gradeId] || "১ম শ্রেণি";
  const trimmedTopic = customTopic.trim();

  if (subject === "English") {
    const title = trimmedTopic || (gradeId === "pre-primary" || gradeId === "class-1" ? "Alphabet Fun & Simple Greetings" : "Reading, Vocabulary & Dialogue Practice");
    return {
      title,
      grade: gradeLabel,
      subject: "English for Today",
      duration: "৪০ মিনিট",
      outcomes: [
        "Recognize and pronounce target words and phrases with authentic phonics and correct stress.",
        "Participate in simple classroom conversations and exchange greetings appropriately.",
        "Read short sentences and comprehend meaning from context and pictures."
      ],
      materials: ["NCTB Textbook", "Word/Alphabet Flashcards", "Picture Prompts", "Whiteboard & Marker"],
      steps: [
        {
          phase: "1. Warm-up & Motivation",
          time: "5 মিনিট",
          activities: "Sing an energetic greeting rhyme or show pictures related to the lesson topic to activate prior knowledge.",
          teacherRole: "Greet students warmly, model natural speech, and encourage active participation.",
          studentRole: "Respond cheerfully to greetings, chant along, and guess the lesson theme."
        },
        {
          phase: "2. Input & Guided Practice",
          time: "15 মিনিট",
          activities: "Teacher demonstrates model pronunciation and guided choral reading. Focus on key vocabulary and sentence structures.",
          teacherRole: "Read aloud with accurate intonation, point to keywords on the board, and check articulation.",
          studentRole: "Listen attentively, follow text with fingers, and repeat after the teacher with proper rhythm."
        },
        {
          phase: "3. Pair & Group Work",
          time: "10 মিনিট",
          activities: "Students practice dialogue in pairs (e.g., asking names, describing objects) using flashcards.",
          teacherRole: "Circulate around the classroom, provide gentle feedback, and assist shy learners.",
          studentRole: "Take turns speaking with a partner, practice communicative dialogues, and share findings."
        },
        {
          phase: "4. Assessment & Feedback",
          time: "7 মিনিট",
          activities: "Quick oral questions, vocabulary matching, or filling in missing letters on the board.",
          teacherRole: "Ask formative check questions and praise confident efforts.",
          studentRole: "Volunteer answers individually or in small groups."
        },
        {
          phase: "5. Wrap-up & Homework",
          time: "3 মিনিট",
          activities: "Summarize the key words learned today and assign a simple, fun home activity.",
          teacherRole: "Give clear instructions for the home task and close the session with positive reinforcement.",
          studentRole: "Note down the task in their notebooks and pack bags neatly."
        }
      ],
      evaluation: [
        "Oral check: What is the meaning and pronunciation of today's key words?",
        "Interactive check: Practice one dialogue exchange with your teacher or partner."
      ],
      homework: "Practice reading the lesson passage twice at home and draw a picture related to the story."
    };
  }

  if (subject === "বিজ্ঞান") {
    const title = trimmedTopic || (gradeId === "class-5" ? "আমাদের জীবনে তথ্য ও প্রযুক্তি" : (gradeId === "class-4" ? "মাটি ও পরিবেশ সংরক্ষণ" : "জীব ও জড়ের বৈশিষ্ট্য এবং পরিবেশ"));
    return {
      title,
      grade: gradeLabel,
      subject: "প্রাথমিক বিজ্ঞান",
      duration: "৪০ মিনিট",
      outcomes: [
        "বাস্তব পর্যবেক্ষণ ও অনুসন্ধানের মাধ্যমে পাঠের মূল বৈজ্ঞানিক ধারণা চিহ্নিত করতে পারবে।",
        "প্রকৃতি ও পরিবেশের বিভিন্ন উপাদানের কার্যকারিতা ও প্রয়োজনীয়তা ব্যাখ্যা করতে পারবে।",
        "দৈনন্দিন জীবনে বিজ্ঞান ও প্রযুক্তির সঠিক ও নিরাপদ ব্যবহার সম্পর্কে সচেতন হবে।"
      ],
      materials: ["বাস্তব উপকরণ / নমুনা (উদ্ভিদ, মাটি, পানি ইত্যাদি)", "বিজ্ঞান চার্ট / পোস্টার", "পাঠ্যবই", "বোর্ড ও মার্কার"],
      steps: [
        {
          phase: "১. প্রেষণা সৃষ্টি ও কৌতূহল উদ্দীপন",
          time: "৫ মিনিট",
          activities: "বাস্তব নমুনা বা একটি প্রাসঙ্গিক বৈজ্ঞানিক প্রশ্ন (যেমন: গাছ কীভাবে খাবার তৈরি করে?) ছুড়ে দিয়ে আলোচনা শুরু করা।",
          teacherRole: "শিক্ষার্থীদের কৌতূহলী করে তোলা এবং তাদের মুক্ত চিন্তার মতামত শোনা।",
          studentRole: "নিজের অভিজ্ঞতা থেকে উত্তর দেওয়া এবং নতুন বিষয়টি জানার আগ্রহ প্রকাশ করা।"
        },
        {
          phase: "২. বিষয় উপস্থাপন ও পর্যবেক্ষণ",
          time: "১৫ মিনিট",
          activities: "চার্ট ও নমুনার সাহায্যে পাঠের মূল অংশ প্রদর্শন ও পাঠ্যবইয়ের সাথে সংযোগ স্থাপন।",
          teacherRole: "সহজ ভাষায় বৈজ্ঞানিক কার্যকারণ ব্যাখ্যা করা ও গুরুত্বপূর্ণ টার্ম বোর্ডে লিখে দেওয়া।",
          studentRole: "মনোযোগ দিয়ে নমুনা পর্যবেক্ষণ করা এবং নিজের খাতায় মূল বৈশিষ্ট্যগুলো টুকে নেওয়া।"
        },
        {
          phase: "৩. দলগত অনুসন্ধান ও তালিকা প্রণয়ন",
          time: "১০ মিনিট",
          activities: "শিক্ষার্থীদের ৪-৫ জনের দলে ভাগ করে নির্দিষ্ট ছক পূরণ বা অনুসন্ধানী কাজ সম্পন্ন করতে দেওয়া।",
          teacherRole: "দলে দলে ঘুরে পর্যবেক্ষণ করা এবং প্রয়োজনে সাহায্য করা।",
          studentRole: "দলের বন্ধুদের সাথে আলোচনা করে পর্যবেক্ষণ ফলাফল খাতায় ছক আকারে লিপিবদ্ধ করা।"
        },
        {
          phase: "৪. শিখন মূল্যায়ন ও যাচাই",
          time: "৭ মিনিট",
          activities: "সংক্ষিপ্ত মৌখিক প্রশ্ন এবং বোর্ডের ছকে সঠিক শব্দ বসিয়ে বিষয়টির স্পষ্টতা যাচাই।",
          teacherRole: "শিক্ষার্থীদের দুর্বলতা চিহ্নিত করে তাৎক্ষণিক বুঝিয়ে দেওয়া।",
          studentRole: "প্রশ্নের স্পষ্ট উত্তর দেওয়া এবং সহপাঠীদের মতামত শোনা।"
        },
        {
          phase: "৫. সারসংক্ষেপ ও বাড়ির কাজ",
          time: "৩ মিনিট",
          activities: "আজকের পাঠের মূল ৩টি শিখনফল পুনরাবৃত্তি করে বাস্তব জীবনের একটি পর্যবেক্ষণ কাজ দেওয়া।",
          teacherRole: "প্রকৃতি ও পরিবেশ সংরক্ষণে শিক্ষার্থীদের উদ্বুদ্ধ করা।",
          studentRole: "ডায়েরিতে বাড়ির কাজ লিখে নেওয়া।"
        }
      ],
      evaluation: [
        "মৌখিক প্রশ্ন: আজকের পাঠ্য বিষয়ের প্রধান দুটি গুরুত্ব বা বৈশিষ্ট্য কী কী?",
        "প্রয়োগমূলক প্রশ্ন: পরিবেশ রক্ষায় আমরা নিজেদের বাড়িতে কী কী পদক্ষেপ নিতে পারি?"
      ],
      homework: "তোমার বাড়ির চারপাশের পরিবেশ পর্যবেক্ষণ করে ৩টি গুরুত্বপূর্ণ উপাদান বা উদাহরণ খাতায় লিখে আনবে।"
    };
  }

  if (subject === "সমাজ" || subject.includes("বিশ্বপরিচয়")) {
    const title = trimmedTopic || (gradeId === "class-5" ? "আমাদের মুক্তিযুদ্ধ ও বীরশ্রেষ্ঠদের অবদান" : "আমাদের সমাজ, পরিবেশ ও নাগরিক দায়িত্ব");
    return {
      title,
      grade: gradeLabel,
      subject: "বাংলাদেশ ও বিশ্বপরিচয়",
      duration: "৪০ মিনিট",
      outcomes: [
        "আমাদের সমাজ, সংস্কৃতি ও ঐতিহাসিক প্রেক্ষাপটের মূল ঘটনাবলি বর্ণনা করতে পারবে।",
        "পরিবার, বিদ্যালয় ও সমাজে নিজের অধিকার এবং দায়িত্ব-কর্তব্য উপলব্ধি করতে পারবে।",
        "পরমতসহিষ্ণুতা, সহযোগিতা ও দেশপ্রেমের মূল্যবোধে উদ্বুদ্ধ হবে।"
      ],
      materials: ["ঐতিহাসিক ছবি / পোস্টার", "বাংলাদেশের মানচিত্র", "পাঠ্যবই", "বোর্ড ও মার্কার"],
      steps: [
        {
          phase: "১. প্রেষণা সৃষ্টি ও ভূমিকা",
          time: "৫ মিনিট",
          activities: "মানচিত্র বা মুক্তিযুদ্ধের একটি ঐতিহাসিক ছবি প্রদর্শন করে শিক্ষার্থীদের পূর্বজ্ঞান যাচাই করা।",
          teacherRole: "গল্পের ছলে আলোচনা শুরু করা এবং প্রাসঙ্গিক প্রশ্ন করে মনোযোগ আকর্ষণ করা।",
          studentRole: "ছবি দেখে নিজের চেনা কথা শেয়ার করা ও আগ্রহের সাথে শোনা।"
        },
        {
          phase: "২. মূল পাঠ উপস্থাপন ও আলোচনা",
          time: "১৫ মিনিট",
          activities: "পাঠ্যাংশের আদর্শ পাঠ ও সামাজিক প্রেক্ষাপটের বাস্তব উদাহরণের সাহায্যে আলোচনা।",
          teacherRole: "সহজ ও প্রাঞ্জল ভাষায় ইতিহাস ও সামাজিক ধারণাসমূহ বুঝিয়ে দেওয়া।",
          studentRole: "বইয়ের পাঠ্যাংশ সরবে পড়া এবং শিক্ষকের সাথে অর্থপূর্ণ আলোচনায় অংশ নেওয়া।"
        },
        {
          phase: "৩. জোড়ায় কাজ ও ছক পূরণ",
          time: "১০ মিনিট",
          activities: "সহপাঠীর সাথে আলোচনা করে অধিকার ও দায়িত্বের বা ঐতিহাসিক তথ্যের একটি তালিকা তৈরি করা।",
          teacherRole: "শ্রেণিকক্ষে ঘুরে শিক্ষার্থীদের আলোচনা পরিচালনা ও পরামর্শ প্রদান।",
          studentRole: "সহপাঠীর সাথে যৌথভাবে ছকটি খাতায় লেখা ও তথ্য বাছাই করা।"
        },
        {
          phase: "৪. শিখন মূল্যায়ন",
          time: "৭ মিনিট",
          activities: "কুইজের মাধ্যমে গুরুত্বপূর্ণ সাল, স্থান, দায়িত্ব বা ঐতিহাসিক ব্যক্তিবর্গের ভূমিকা যাচাই।",
          teacherRole: "সঠিক উত্তরের জন্য উৎসাহ দেওয়া ও ভ্রান্তি দূর করা।",
          studentRole: "স্বতঃস্ফূর্তভাবে প্রশ্নের নির্ভুল উত্তর দেওয়া।"
        },
        {
          phase: "৫. উপসংহার ও বাড়ির কাজ",
          time: "৩ মিনিট",
          activities: "সুনাগরিক হিসেবে সমাজে আমাদের করণীয় মনে করিয়ে দিয়ে পাঠ শেষ করা।",
          teacherRole: "দেশপ্রেম ও মানবিক মূল্যবোধের বার্তা দিয়ে ক্লাসের সমাপ্তি ঘোষণা।",
          studentRole: "বাড়ির কাজ ডায়েরিতে লিখে নেওয়া।"
        }
      ],
      evaluation: [
        "মৌখিক প্রশ্ন: সমাজ ও পরিবারের প্রতি আমাদের প্রধান দুটি দায়িত্ব কী কী?",
        "তথ্যভিত্তিক প্রশ্ন: আজকের পাঠ থেকে যে কোনো একজন জাতীয় ব্যক্তিত্ব বা ঐতিহ্যের অবদান উল্লেখ করো।"
      ],
      homework: "তোমার পরিবার বা সমাজে ভালো কাজ করেন এমন একজন মানুষের অবদান সম্পর্কে ৪টি বাক্য লিখে আনবে।"
    };
  }

  if (subject === "বাংলা") {
    const title = trimmedTopic || (gradeId === "class-1" || gradeId === "pre-primary" ? "স্বরবর্ণ ও ব্যঞ্জনবর্ণের রূপ এবং ছড়া পাঠ" : (gradeId === "class-5" ? "এই দেশ এই মানুষ (প্রবন্ধ পাঠ)" : "পাখিদের কথা ও পরিবেশ সচেতনতা"));
    return {
      title,
      grade: gradeLabel,
      subject: "আমার বাংলা বই",
      duration: "৪০ মিনিট",
      outcomes: [
        "শুদ্ধ উচ্চারণ, সঠিক জ্যোতিচিহ্ন বজায় রেখে পাঠ্যাংশটি স্পষ্ট ও সাবলীলভাবে পড়তে পারবে।",
        "পাঠের নতুন শব্দের অর্থ বুঝে সঠিক বাক্যে প্রয়োগ করতে পারবে এবং যুক্তবর্ণ ভেঙে লিখতে পারবে।",
        "পাঠ্যাংশের মূলভাব অনুধাবন করে প্রাসঙ্গিক প্রশ্নের উত্তর নিজের ভাষায় লিখতে পারবে।"
      ],
      materials: ["বর্ণ/শব্দ কার্ড", "পাঠ্যবইয়ের রঙিন চিত্র ও পোস্টার", "যুক্তবর্ণ তালিকা চার্ট", "হোয়াইটবোর্ড ও মার্কার"],
      steps: [
        {
          phase: "১. প্রেষণা সৃষ্টি ও কুশল বিনিময়",
          time: "৫ মিনিট",
          activities: "পাঠের বিষয়ের সাথে সম্পর্কিত একটি ছোট ছড়া বা ছবির মাধ্যমে শিক্ষার্থীদের কৌতূহল সৃষ্টি।",
          teacherRole: "শিশুদের পাঠের প্রতি আকৃষ্ট করা এবং তাদের মুক্ত মন্তব্য শোনা।",
          studentRole: "ছবি দেখে কথা বলা এবং নিজের অভিজ্ঞতা থেকে ধারণা প্রকাশ করা।"
        },
        {
          phase: "২. আদর্শ পাঠ ও সরব পাঠ",
          time: "১৫ মিনিট",
          activities: "শিক্ষক শুদ্ধ প্রমিত উচ্চারণে আদর্শ পাঠ দেবেন। এরপর শিক্ষার্থীরা সমস্বরে ও এককভাবে সরব পাঠ করবে।",
          teacherRole: "উচ্চারণ ত্রুটি শুধরে দেওয়া, নতুন শব্দ ও যুক্তবর্ণ বোর্ডে লিখে বুঝিয়ে দেওয়া।",
          studentRole: "আঙুল দিয়ে বইয়ের লাইন ধরে রাখা, শিক্ষকের পরে অনুকরণ করে সরব পাঠ করা।"
        },
        {
          phase: "৩. জোড়ায় কাজ ও শব্দার্থ অনুশীলন",
          time: "১০ মিনিট",
          activities: "সহপাঠীর সাথে আলোচনা করে পাঠ্যবই থেকে ৩টি নতুন শব্দ বাছাই এবং বাক্য তৈরি করা।",
          teacherRole: "প্রতিটি বেঞ্চে গিয়ে পর্যবেক্ষণ ও দুর্বল শিক্ষার্থীদের আলাদা সহায়তা করা।",
          studentRole: "খাতায় নতুন শব্দের অর্থ লেখা এবং সুন্দর বাক্য তৈরি করা।"
        },
        {
          phase: "৪. শিখন মূল্যায়ন ও প্রশ্নোত্তর",
          time: "৭ মিনিট",
          activities: "মৌখিক প্রশ্ন এবং বোর্ডে যুক্তবর্ণ ভেঙে শব্দ তৈরির সংক্ষিপ্ত মূল্যায়ন।",
          teacherRole: "সবার অংশগ্রহণ নিশ্চিত করা ও সঠিক উত্তরে বাহবা দেওয়া।",
          studentRole: "হাত তুলে শিক্ষকের প্রশ্নের আত্মবিশ্বাসের সাথে উত্তর দেওয়া।"
        },
        {
          phase: "৫. বাড়ির কাজ ও সমাপ্তি",
          time: "৩ মিনিট",
          activities: "পাঠের শিক্ষণীয় বার্তা সংক্ষেপে পুনর্ব্যক্ত করে একটি সৃজনশীল বাড়ির কাজ দেওয়া।",
          teacherRole: "ইতিবাচক বার্তা দিয়ে ক্লাস শেষ করা।",
          studentRole: "ডায়েরিতে বাড়ির কাজ টুকে নেওয়া।"
        }
      ],
      evaluation: [
        "উচ্চারণ ও পাঠ: পাঠ্যাংশ থেকে যেকোনো দুটি লাইন শুদ্ধ উচ্চারণে পড়ে শোনাও।",
        "শব্দার্থ: আজকের পাঠে শেখা দুটি নতুন শব্দের অর্থ ও বাক্য বলো।"
      ],
      homework: "আজকের পাঠ্যাংশটি বাড়িতে ২ বার সরবে পড়বে এবং ৩টি নতুন শব্দ দিয়ে সুন্দর ৩টি বাক্য লিখে আনবে।"
    };
  }

  // Default: প্রাথমিক গণিত (Mathematics)
  const title = trimmedTopic || (gradeId === "class-5" ? "ঐকিক নিয়ম ও ভগ্নাংশের বাস্তব সমস্যা" : (gradeId === "class-4" ? "চার প্রক্রিয়া সম্পর্কিত সমস্যা ও জ্যামিতি" : (gradeId === "class-3" ? "গুণ ও ভাগ সংক্রান্ত বাস্তব সমস্যা" : "যোগ ও বিয়োগের প্রাথমিক ধারণা")));
  return {
    title,
    grade: gradeLabel,
    subject: "প্রাথমিক গণিত",
    duration: "৪০ মিনিট",
    outcomes: [
      "বাস্তব ও অর্ধ-বাস্তব উপকরণের সাহায্যে গণনা করে গাণিতিক প্রক্রিয়াটি সঠিকভাবে সম্পন্ন করতে পারবে।",
      "গাণিতিক প্রতীক ও নিয়মাবলি নির্ভুলভাবে ব্যবহার করে বাস্তব জীবনের সমস্যার সমাধান করতে পারবে।",
      "গাণিতিক চিন্তনদক্ষতা ও সমস্যা সমাধানের আত্মবিশ্বাস অর্জন করবে।"
    ],
    materials: ["গণনা কাঠি / মার্বেল / ব্লক", "সংখ্যা ও প্রক্রিয়া কার্ড", "পাঠ্যবই", "বোর্ড ও মার্কার"],
    steps: [
      {
        phase: "১. প্রেষণা সৃষ্টি ও পূর্বজ্ঞান যাচাই",
        time: "৫ মিনিট",
        activities: "বাস্তব কিছু সামগ্রী (যেমন: কাঠি বা পেনসিল) দেখিয়ে একটি ছোট সমস্যা উপস্থাপন করা।",
        teacherRole: "শিক্ষার্থীদের কাছে বাস্তব জীবনের হিসাব জানতে চাওয়া ও আগ্রহ তৈরি করা।",
        studentRole: "কাঠি দেখে দ্রুত গণনা করা এবং নিজের হিসাব শিক্ষককে বলা।"
      },
      {
        phase: "২. গাণিতিক প্রক্রিয়ার উন্মোচন ও আদর্শ সমাধান",
        time: "১৫ মিনিট",
        activities: "বোর্ডে গাণিতিক বাক্য লিখে ধাপে ধাপে সমস্যাটি সমাধানের পদ্ধতি প্রদর্শন করা।",
        teacherRole: "প্রক্রিয়াটি স্পষ্ট করে ব্যাখ্যা করা এবং শিক্ষার্থীদের যুক্তি প্রদান করতে উৎসাহিত করা।",
        studentRole: "বোর্ডের দিকে গভীর মনোযোগ দেওয়া এবং খাতায় ধাপগুলো তুলে নেওয়া।"
      },
      {
        phase: "৩. দলীয় / জোড়ায় সমস্যা সমাধান",
        time: "১০ মিনিট",
        activities: "শিক্ষার্থীদের ৪ জনের দলে ভাগ করে বাস্তব সমস্যা সংবলিত কাজের কার্ড সমাধান করতে দেওয়া।",
        teacherRole: "প্রতিটি দলে ঘুরে পর্যবেক্ষণ করা এবং পিছিয়ে পড়া শিক্ষার্থীদের ব্যক্তিগতভাবে সহায়তা করা।",
        studentRole: "দলের বন্ধুদের সাথে মিলে যুক্তি আলোচনা করে সঠিক সমাধান বের করা।"
      },
      {
        phase: "৪. শিখন মূল্যায়ন ও একক যাচাই",
        time: "৭ মিনিট",
        activities: "বোর্ডে একটি অনুরূপ সমস্যা দিয়ে ব্যক্তিগতভাবে প্রতিটি শিক্ষার্থীর সমাধান ক্ষমতা যাচাই করা।",
        teacherRole: "সঠিক সমাধানের জন্য প্রশংসা করা ও ত্রুটি থাকলে পুনরায় বুঝিয়ে দেওয়া।",
        studentRole: "নিজের খাতায় বা স্লেটে স্বাধীনভাবে সমাধান করে শিক্ষককে দেখানো।"
      },
      {
        phase: "৫. সারসংক্ষেপ ও বাড়ির কাজ",
        time: "৩ মিনিট",
        activities: "আজকের মূল নিয়মটির সারসংক্ষেপ তুলে ধরে পাঠ্যবইয়ের নির্দিষ্ট অনুশীলনী বাড়ির কাজ হিসেবে দেওয়া।",
        teacherRole: "দৈনন্দিন জীবনে গণিতের প্রয়োজনীয়তা মনে করিয়ে ক্লাস সমাপ্ত করা।",
        studentRole: "ডায়েরিতে বাড়ির কাজ লিখে নেওয়া।"
      }
    ],
    evaluation: [
      "মৌখিক প্রশ্ন: এই সমস্যাটির গাণিতিক বাক্য কীভাবে লিখতে হয়?",
      "লিখিত কাজ: বোর্ডে দেওয়া গাণিতিক সমস্যাটি ১ মিনিটে সমাধান করে দেখাও।"
    ],
    homework: "পাঠ্যবইয়ের নির্ধারিত পৃষ্ঠার ১ ও ২ নম্বর সমস্যাটি সমাধান করে কাল ক্লাসে নিয়ে আসবে।"
  };
}

export default function TeacherLessonPlanner() {
  const [selectedGrade, setSelectedGrade] = useState<string>("class-3");
  const [selectedSubject, setSelectedSubject] = useState<string>("গণিত");
  const [topic, setTopic] = useState<string>("");
  const [currentPlan, setCurrentPlan] = useState<LessonPlanData>(() => buildCurriculumLessonPlan("class-3", "গণিত", ""));
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = buildCurriculumLessonPlan(selectedGrade, selectedSubject, topic);
      setCurrentPlan(generated);
      setIsGenerating(false);
    }, 250);
  };

  const handleCopy = () => {
    const text = `
পাঠ পরিকল্পনা: ${currentPlan.title}
শ্রেণি: ${currentPlan.grade} | বিষয়: ${currentPlan.subject} | সময়: ${currentPlan.duration}

শিখনফল:
${currentPlan.outcomes.map((o, i) => `${i + 1}. ${o}`).join("\n")}

প্রয়োজনীয় উপকরণ:
${currentPlan.materials.join(", ")}

পর্যায়ক্রমিক ক্লাস পরিচালনা:
${currentPlan.steps.map((s) => `${s.phase} (${s.time}):\n- কার্যকলাপ: ${s.activities}\n- শিক্ষকের কাজ: ${s.teacherRole}\n- শিক্ষার্থীর কাজ: ${s.studentRole}`).join("\n\n")}

মূল্যায়ন:
${currentPlan.evaluation.join("\n")}

বাড়ির কাজ:
${currentPlan.homework}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <article 
      aria-labelledby="lesson-planner-heading"
      className="bg-white rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200 shadow-xl space-y-6 sm:space-y-8 print:p-0 print:border-none print:shadow-none w-full"
    >
      {/* Top Banner Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 print:hidden">
        <div className="flex items-center gap-3">
          <div 
            aria-hidden="true" 
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-md shadow-purple-500/20 shrink-0"
          >
            👩‍🏫
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-100 text-purple-900 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" aria-hidden="true" />
              <span>এনসিটিবি ২০২৬ স্মার্ট লেসন প্ল্যানার</span>
            </div>
            <h2 id="lesson-planner-heading" className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              শিক্ষক পাঠ পরিকল্পনা ও ডায়েরি
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            aria-label="পাঠ পরিকল্পনা কপি করুন"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
            <span>{copied ? "কপি হয়েছে!" : "কপি করুন"}</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            aria-label="পাঠ পরিকল্পনা প্রিন্ট করুন অথবা পিডিএফ ডাউনলোড করুন"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            <span>প্রিন্ট / PDF</span>
          </button>
        </div>
      </header>

      {/* Semantic Inputs Form */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerate();
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 print:hidden"
        aria-label="পাঠ পরিকল্পনা তৈরির ফর্ম"
      >
        <div>
          <label htmlFor="grade-select" className="block text-xs font-bold text-slate-700 mb-1.5">
            শ্রেণি নির্বাচন
          </label>
          <select
            id="grade-select"
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-base sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="pre-primary">প্রাক-প্রাথমিক</option>
            <option value="class-1">১ম শ্রেণি</option>
            <option value="class-2">২য় শ্রেণি</option>
            <option value="class-3">৩য় শ্রেণি</option>
            <option value="class-4">৪র্থ শ্রেণি</option>
            <option value="class-5">৫ম শ্রেণি</option>
          </select>
        </div>

        <div>
          <label htmlFor="subject-select" className="block text-xs font-bold text-slate-700 mb-1.5">
            বিষয় নির্বাচন
          </label>
          <select
            id="subject-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-base sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="গণিত">প্রাথমিক গণিত</option>
            <option value="বাংলা">আমার বাংলা বই</option>
            <option value="English">English for Today</option>
            <option value="বিজ্ঞান">প্রাথমিক বিজ্ঞান</option>
            <option value="সমাজ">বাংলাদেশ ও বিশ্বপরিচয়</option>
          </select>
        </div>

        <div>
          <label htmlFor="topic-input" className="block text-xs font-bold text-slate-700 mb-1.5">
            পাঠের বিষয় / শিরোনাম (ঐচ্ছিক)
          </label>
          <input
            id="topic-input"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="যেমন: যোগের ধারণা / পাখিদের কথা"
            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-base sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>{isGenerating ? "তৈরি হচ্ছে..." : "পরিকল্পনা তৈরি করুন"}</span>
          </button>
        </div>
      </form>

      {/* Structured Document Body */}
      <section 
        aria-label="পাঠ পরিকল্পনার বিবরণ"
        className="space-y-6 sm:space-y-8 text-slate-800 border-2 border-slate-200 rounded-3xl p-5 sm:p-8 bg-white"
      >
        {/* Document Header */}
        <div className="border-b-2 border-slate-800 pb-4 text-center space-y-1">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            {currentPlan.title}
          </h3>
          <div className="flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold text-slate-600 flex-wrap pt-1">
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-600" aria-hidden="true" />
              <span>শ্রেণি: {currentPlan.grade}</span>
            </span>
            <span aria-hidden="true">•</span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-purple-600" aria-hidden="true" />
              <span>বিষয়: {currentPlan.subject}</span>
            </span>
            <span aria-hidden="true">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-600" aria-hidden="true" />
              <span>সময়: {currentPlan.duration}</span>
            </span>
          </div>
        </div>

        {/* Section 1: Learning Outcomes */}
        <div className="space-y-3">
          <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" aria-hidden="true" />
            <span>১. নির্দিষ্ট শিখনফল (Learning Outcomes)</span>
          </h4>
          <ul className="space-y-2 pl-2">
            {currentPlan.outcomes.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-slate-700">
                <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 2: Materials & Teaching Aids */}
        <div className="space-y-3">
          <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 shrink-0" aria-hidden="true" />
            <span>২. প্রয়োজনীয় শিখন-শেখানো উপকরণ (Teaching Aids)</span>
          </h4>
          <div className="flex flex-wrap gap-2 pl-2">
            {currentPlan.materials.map((mat, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs sm:text-sm font-semibold"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>

        {/* Section 3: Step-by-Step Pedagogical Phases */}
        <div className="space-y-3">
          <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0" aria-hidden="true" />
            <span>৩. পর্যায়ক্রমিক শ্রেণি পরিচালনা (Pedagogical Steps)</span>
          </h4>
          
          <div className="space-y-4">
            {currentPlan.steps.map((step, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between font-black text-xs sm:text-sm text-indigo-950 border-b border-slate-200/80 pb-1.5">
                  <span>{step.phase}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[11px] font-bold">
                    {step.time}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong>কার্যক্রম:</strong> {step.activities}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-0.5">👩‍🏫 শিক্ষকের কাজ:</span>
                    <p className="text-slate-600">{step.teacherRole}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-0.5">🎒 শিক্ষার্থীর কাজ:</span>
                    <p className="text-slate-600">{step.studentRole}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Evaluation and Assessment */}
        <div className="space-y-3">
          <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0" aria-hidden="true" />
            <span>৪. শিখন মূল্যায়ন (Assessment for Learning)</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
            {currentPlan.evaluation.map((evalItem, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 font-medium">
                {evalItem}
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Homework */}
        <div className="space-y-2 p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950">
          <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-purple-900">
            <HelpCircle className="w-4 h-4 text-purple-600" aria-hidden="true" />
            <span>৫. অর্থবহ বাড়ির কাজ (Meaningful Homework):</span>
          </div>
          <p className="text-xs sm:text-sm font-medium leading-relaxed pl-6">
            {currentPlan.homework}
          </p>
        </div>
      </section>
    </article>
  );
}
