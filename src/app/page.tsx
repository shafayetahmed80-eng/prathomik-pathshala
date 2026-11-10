"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  ChevronRight, 
  ExternalLink,
  Layers,
  Search,
  Smile,
  Pencil,
  FileText,
  Volume2,
  Heart,
  Presentation,
  CheckCircle2,
  HelpCircle,
  Clock
} from "lucide-react";
import { CLASSES_DATA, ClassGrade } from "@/data/curriculum";
import BookReaderModal from "@/components/BookReaderModal";
import TeacherLessonPlanner from "@/components/TeacherLessonPlanner";
import InteractiveQuizHub from "@/components/InteractiveQuizHub";
import ExamWorksheetGenerator from "@/components/ExamWorksheetGenerator";
import BanglaBornomalaLab from "@/components/BanglaBornomalaLab";
import MultimediaSlideDeck from "@/components/MultimediaSlideDeck";
import GlobalNCTBSearch from "@/components/GlobalNCTBSearch";
import AudioRhymesCorner from "@/components/AudioRhymesCorner";
import BrandHomeLink from "@/components/BrandHomeLink";
import SiteFooter from "@/components/SiteFooter";

type UserRole = "student" | "teacher";
type StudentTab = "books" | "bornomala" | "quiz" | "rhymes" | "search";
type TeacherTab = "exams" | "slides" | "planner" | "guides" | "search";

export default function HomePage() {
  const [role, setRole] = useState<UserRole>("student");
  const [studentTab, setStudentTab] = useState<StudentTab>("books");
  const [teacherTab, setTeacherTab] = useState<TeacherTab>("exams");

  // Selected class for books / guides
  const [selectedClassId, setSelectedClassId] = useState<string>("class-1");

  // Active book for the in-browser interactive PDF reader
  const [readerBook, setReaderBook] = useState<{
    name: string;
    classId: string;
    classNameTitle: string;
    type: "textbook" | "teachers_guide";
    subject: string;
    icon: string;
  } | null>(null);

  const currentClass: ClassGrade = CLASSES_DATA.find((c) => c.id === selectedClassId) || CLASSES_DATA[1];

  // Map active tab to dedicated route URL
  const getDedicatedUrl = () => {
    if (role === "student") {
      switch (studentTab) {
        case "books": return "/books";
        case "bornomala": return "/bornomala";
        case "quiz": return "/quiz";
        case "rhymes": return "/rhymes";
        default: return "/books";
      }
    } else {
      switch (teacherTab) {
        case "exams": return "/exams";
        case "slides": return "/slides";
        case "planner": return "/lesson-planner";
        case "guides": return "/books";
        default: return "/exams";
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 via-white to-amber-50/40 text-slate-900 antialiased selection:bg-emerald-200">
      {/* 🌟 Semantic Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 border-b border-sky-100 shadow-xs print:hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
          <BrandHomeLink />

          {/* Quick Nav Links */}
          <nav aria-label="প্রধান লিঙ্কসমূহ" className="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
            <Link href="/books" className="px-3 py-1.5 rounded-xl hover:bg-white hover:text-emerald-700 transition-colors">
              পাঠ্যবই
            </Link>
            <Link href="/bornomala" className="px-3 py-1.5 rounded-xl hover:bg-white hover:text-pink-700 transition-colors">
              বর্ণমালা
            </Link>
            <Link href="/slides" className="px-3 py-1.5 rounded-xl hover:bg-white hover:text-purple-700 transition-colors">
              স্লাইড হাব
            </Link>
            <Link href="/exams" className="px-3 py-1.5 rounded-xl hover:bg-white hover:text-sky-700 transition-colors">
              প্রশ্নপত্র মেকার
            </Link>
            <Link href="/quiz" className="px-3 py-1.5 rounded-xl hover:bg-white hover:text-amber-700 transition-colors">
              কুইজ
            </Link>
            <Link href="/rhymes" className="px-3 py-1.5 rounded-xl hover:bg-white hover:text-rose-700 transition-colors">
              ছড়া ও গল্প
            </Link>
          </nav>

          {/* Role Mode Segmented Switcher in Header */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <div 
              role="radiogroup" 
              aria-label="ব্যবহারকারীর ভূমিকা নির্বাচন"
              className="flex items-center p-0.5 sm:p-1 bg-slate-100 rounded-xl sm:rounded-2xl border border-slate-200/80"
            >
              <button
                type="button"
                onClick={() => setRole("student")}
                aria-checked={role === "student"}
                role="radio"
                className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all touch-manipulation min-h-[36px] sm:min-h-0 active:scale-95 ${
                  role === "student"
                    ? "bg-white text-emerald-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>🎈 শিক্ষার্থী</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                aria-checked={role === "teacher"}
                role="radio"
                className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all touch-manipulation min-h-[36px] sm:min-h-0 active:scale-95 ${
                  role === "teacher"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />
                <span>শিক্ষক</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 🚀 Semantic Main Landmark */}
      <main id="main-content" className="flex-1 w-full flex flex-col items-center">
        {/* 🌟 Compact Inspiring Hero Section */}
        <section 
          aria-labelledby="hero-heading"
          className="relative overflow-hidden pt-6 sm:pt-10 pb-6 sm:pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl sm:rounded-full bg-emerald-100/90 border border-emerald-200 text-emerald-800 text-[11px] sm:text-xs font-bold mb-4 max-w-xl mx-auto leading-normal">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse shrink-0" aria-hidden="true" />
            <span>জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) ২০২৬ ডিজিটাল কারিকুলাম</span>
          </div>

          <h1 
            id="hero-heading"
            className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-snug sm:leading-tight max-w-4xl mx-auto"
          >
            {role === "student" ? (
              <>
                প্রাথমিকের শিশুদের জন্য{" "}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
                  আনন্দময় ও স্মার্ট
                </span>{" "}
                শেখার ঠিকানা
              </>
            ) : (
              <>
                প্রাথমিক শিক্ষকদের জন্য{" "}
                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                  আধুনিক এআই টুলস ও ক্লাসরুম
                </span>{" "}
                সহায়িকা
              </>
            )}
          </h1>

          <p className="mt-3 text-xs sm:text-sm lg:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed px-2">
            {role === "student"
              ? "প্রাক-প্রাথমিক থেকে ৫ম শ্রেণি পর্যন্ত সকল পাঠ্যবই, বর্ণমালা লেখার ক্যানভাস, আনন্দ কুইজ ও ছড়া শোনার উন্মুক্ত প্ল্যাটফর্ম।"
              : "প্রশ্নপত্র তৈরি, ক্লাসরুম প্রেজেন্টেশন স্লাইড, এআই লেসন প্ল্যানার ও ৯২টি অফিশিয়াল শিক্ষক সহায়িকা এক ছাদের নিচে।"}
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2 sm:gap-4 flex-wrap text-[11px] sm:text-xs font-semibold text-slate-600">
            <span className="px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs">
              📚 ৯২টি সরকারি বই ও সহায়িকা
            </span>
            <span className="px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs">
              📽️ ক্লাসরুম মাল্টিমিডিয়া স্লাইড
            </span>
            <span className="px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs">
              📝 ১-ক্লিক প্রশ্নপত্র জেনারেটর
            </span>
          </div>
        </section>

        {/* 🎛️ Master Dynamic Studio Workspace Section */}
        <section 
          id="studio-workspace" 
          aria-labelledby="studio-title"
          className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 pb-12 space-y-4"
        >
          {/* Studio Header Bar & Tab Switcher */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Left: Mode Title & Mobile Dedicated Button */}
            <div className="flex items-center justify-between w-full md:w-auto">
              <div className="flex items-center gap-2.5">
                <span 
                  aria-hidden="true" 
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                    role === "student" ? "bg-emerald-100 text-emerald-800" : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {role === "student" ? "🎈" : "👩‍🏫"}
                </span>
                <div>
                  <h2 id="studio-title" className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                    {role === "student" ? "শিক্ষার্থী লার্নিং স্টুডিও" : "শিক্ষক প্রফেশনাল স্টুডিও"}
                  </h2>
                  <p className="text-[11px] text-slate-500">যে টুলটি প্রয়োজন ট্যাবে নির্বাচন করুন</p>
                </div>
              </div>

              {/* Dedicated Route Button on Mobile */}
              <div className="md:hidden shrink-0">
                <Link
                  href={getDedicatedUrl()}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                    role === "student"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-purple-50 text-purple-800 border border-purple-200"
                  }`}
                  title="এই টুলটি আলাদা ফুলস্ক্রিন পেজে খুলুন"
                >
                  <span>ফুল পেজ</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Middle: Segmented Tabs */}
            <nav 
              role="tablist" 
              aria-label="স্টুডিও টুলস তালিকা"
              className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1.5 no-scrollbar bg-slate-100/90 rounded-2xl"
            >
              {role === "student" ? (
                <>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={studentTab === "books"}
                    onClick={() => setStudentTab("books")}
                    className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all touch-manipulation min-h-[38px] active:scale-95 ${
                      studentTab === "books" ? "bg-white text-emerald-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>পাঠ্যবই</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={studentTab === "bornomala"}
                    onClick={() => setStudentTab("bornomala")}
                    className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all touch-manipulation min-h-[38px] active:scale-95 ${
                      studentTab === "bornomala" ? "bg-white text-pink-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>বর্ণমালা ল্যাব</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={studentTab === "quiz"}
                    onClick={() => setStudentTab("quiz")}
                    className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all touch-manipulation min-h-[38px] active:scale-95 ${
                      studentTab === "quiz" ? "bg-white text-amber-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Smile className="w-3.5 h-3.5" />
                    <span>আনন্দ কুইজ</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={studentTab === "rhymes"}
                    onClick={() => setStudentTab("rhymes")}
                    className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all touch-manipulation min-h-[38px] active:scale-95 ${
                      studentTab === "rhymes" ? "bg-white text-rose-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>ছড়া ও গল্প</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={studentTab === "search"}
                    onClick={() => setStudentTab("search")}
                    className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all touch-manipulation min-h-[38px] active:scale-95 ${
                      studentTab === "search" ? "bg-white text-teal-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>সার্চ</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={teacherTab === "exams"}
                    onClick={() => setTeacherTab("exams")}
                    className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all touch-manipulation min-h-[38px] active:scale-95 ${
                      teacherTab === "exams" ? "bg-white text-sky-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>প্রশ্নপত্র মেকার</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={teacherTab === "slides"}
                    onClick={() => setTeacherTab("slides")}
                    className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all touch-manipulation min-h-[38px] active:scale-95 ${
                      teacherTab === "slides" ? "bg-white text-purple-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Presentation className="w-3.5 h-3.5" />
                    <span>স্লাইড হাব</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={teacherTab === "planner"}
                    onClick={() => setTeacherTab("planner")}
                    className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all touch-manipulation min-h-[38px] active:scale-95 ${
                      teacherTab === "planner" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>লেসন প্ল্যানার</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={teacherTab === "guides"}
                    onClick={() => setTeacherTab("guides")}
                    className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all touch-manipulation min-h-[38px] active:scale-95 ${
                      teacherTab === "guides" ? "bg-white text-emerald-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>শিক্ষক সহায়িকা</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={teacherTab === "search"}
                    onClick={() => setTeacherTab("search")}
                    className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all touch-manipulation min-h-[38px] active:scale-95 ${
                      teacherTab === "search" ? "bg-white text-teal-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>সার্চ</span>
                  </button>
                </>
              )}
            </nav>

            {/* Right: Open in Dedicated Route (Desktop) */}
            <div className="hidden md:block shrink-0">
              <Link
                href={getDedicatedUrl()}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                  role === "student"
                    ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : "bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200"
                }`}
                title="এই টুলটি আলাদা ফুলস্ক্রিন পেজে খুলুন"
              >
                <span>ফুল পেজে খুলুন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Active Workspace Viewport Frame (Option 2 Engine) */}
          <div 
            role="tabpanel" 
            aria-labelledby="studio-title"
            className="w-full transition-all duration-300"
          >
            {role === "student" ? (
              studentTab === "books" ? (
                /* Compact Grade Books Browser */
                <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-md space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">শ্রেণি নির্বাচন করো</h3>
                      <p className="text-xs text-slate-500">তোমার শ্রেণি বাছাই করে যেকোনো বোর্ড বই সরাসরি ব্রাউজারে পড়ো</p>
                    </div>

                    {/* Grade Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {CLASSES_DATA.map((cls) => (
                        <button
                          key={cls.id}
                          type="button"
                          onClick={() => setSelectedClassId(cls.id)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                            selectedClassId === cls.id
                              ? "bg-emerald-600 text-white shadow-xs"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {cls.banglaName}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Books Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentClass.textbooks.map((book) => (
                      <article
                        key={book.id}
                        className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 bg-slate-50/50 hover:bg-emerald-50/20 transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl p-2 bg-white rounded-xl shadow-2xs border border-slate-100">
                              {book.icon}
                            </span>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              {book.subject}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-base">{book.name}</h4>
                            <p className="text-xs text-slate-500 mt-0.5">{book.description}</p>
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-slate-200/60 flex justify-end">
                          <button
                            type="button"
                            onClick={() => setReaderBook({
                              name: book.name,
                              classId: currentClass.id,
                              classNameTitle: currentClass.banglaName,
                              type: "textbook",
                              subject: book.subject,
                              icon: book.icon
                            })}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors"
                          >
                            <span>বইটি পড়ুন</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : studentTab === "bornomala" ? (
                <BanglaBornomalaLab />
              ) : studentTab === "quiz" ? (
                <div className="max-w-4xl mx-auto">
                  <InteractiveQuizHub />
                </div>
              ) : studentTab === "rhymes" ? (
                <AudioRhymesCorner />
              ) : (
                <GlobalNCTBSearch onOpenBook={setReaderBook} />
              )
            ) : (
              teacherTab === "exams" ? (
                <ExamWorksheetGenerator />
              ) : teacherTab === "slides" ? (
                <MultimediaSlideDeck />
              ) : teacherTab === "planner" ? (
                <TeacherLessonPlanner />
              ) : teacherTab === "guides" ? (
                /* Teacher Guides Browser */
                <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-md space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">শিক্ষক সহায়িকা লাইব্রেরি</h3>
                      <p className="text-xs text-slate-500">এনসিটিবি কর্তৃক অনুমোদিত অফিশিয়াল শিখন ও মূল্যায়ন গাইড</p>
                    </div>

                    {/* Grade Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {CLASSES_DATA.map((cls) => (
                        <button
                          key={cls.id}
                          type="button"
                          onClick={() => setSelectedClassId(cls.id)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                            selectedClassId === cls.id
                              ? "bg-purple-600 text-white shadow-xs"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {cls.banglaName}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentClass.teachersGuides.map((tg) => (
                      <article
                        key={tg.id}
                        className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 bg-slate-50/50 hover:bg-purple-50/20 transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl p-2 bg-white rounded-xl shadow-2xs border border-slate-100">
                              {tg.icon}
                            </span>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                              শিক্ষক গাইড
                            </span>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-base">{tg.name}</h4>
                            <p className="text-xs text-slate-500 mt-0.5">{tg.description}</p>
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-slate-200/60 flex justify-end">
                          <button
                            type="button"
                            onClick={() => setReaderBook({
                              name: tg.name,
                              classId: currentClass.id,
                              classNameTitle: currentClass.banglaName,
                              type: "teachers_guide",
                              subject: tg.subject,
                              icon: tg.icon
                            })}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-purple-700 bg-purple-100 hover:bg-purple-200 transition-colors"
                          >
                            <span>গাইডটি খুলুন</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : (
                <GlobalNCTBSearch onOpenBook={setReaderBook} />
              )
            )}
          </div>
        </section>

        {/* ⚡ Quick Launch Showcase Grid (এক নজরে সকল টুলস ও ফিচার) */}
        <section 
          aria-labelledby="quick-launch-heading"
          className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-200/80"
        >
          <header className="text-center mb-8 space-y-1">
            <h2 id="quick-launch-heading" className="text-2xl sm:text-3xl font-black text-slate-900">
              প্ল্যাটফর্মের সকল ফিচার এক নজরে
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">যেকোনো টুলে সরাসরি প্রবেশ করতে নিচের কার্ডগুলোতে ক্লিক করুন</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Books */}
            <Link 
              href="/books"
              className="group p-5 rounded-3xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  📚
                </span>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors">
                    পাঠ্যবই লাইব্রেরি
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    প্রাক-প্রাথমিক থেকে ৫ম শ্রেণির সকল বোর্ড বই ও শিক্ষক সহায়িকা সরাসরি পড়ুন।
                  </p>
                </div>
              </div>
              <span className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center gap-1">
                <span>লাইব্রেরিতে যান</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Card 2: Bornomala */}
            <Link 
              href="/bornomala"
              className="group p-5 rounded-3xl bg-white border border-slate-200 hover:border-pink-400 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🎨
                </span>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-pink-700 transition-colors">
                    বর্ণমালা ও ড্রয়িং ল্যাব
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    শিশুদের হাতেখড়ি ও হাত ঘুরিয়ে লেখার জন্য ৬ রঙের রঙিন টাচ ক্যানভাস বোর্ড।
                  </p>
                </div>
              </div>
              <span className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-pink-600 flex items-center gap-1">
                <span>ল্যাবে যান</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Card 3: Slides Hub */}
            <Link 
              href="/slides"
              className="group p-5 rounded-3xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  📽️
                </span>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-purple-700 transition-colors">
                    মাল্টিমিডিয়া স্লাইড হাব
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    শ্রেণিকক্ষে প্রজেক্টরে ক্লাস নেওয়ার জন্য এনসিটিবি নির্দেশিকা সিঙ্ক করা রেডি স্লাইড।
                  </p>
                </div>
              </div>
              <span className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-purple-600 flex items-center gap-1">
                <span>স্লাইড হাব খুলুন</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Card 4: Exam Maker */}
            <Link 
              href="/exams"
              className="group p-5 rounded-3xl bg-white border border-slate-200 hover:border-sky-400 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  📝
                </span>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-sky-700 transition-colors">
                    স্মার্ট প্রশ্নপত্র মেকার
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    বিদ্যালয়ের নাম ও পূর্ণমান দিয়ে A4 সাইজে ১-ক্লিকে প্রিন্ট-রেডি পরীক্ষার প্রশ্ন তৈরি।
                  </p>
                </div>
              </div>
              <span className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-sky-600 flex items-center gap-1">
                <span>প্রশ্নপত্র তৈরি করুন</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Card 5: Quiz */}
            <Link 
              href="/quiz"
              className="group p-5 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🎮
                </span>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-amber-700 transition-colors">
                    আনন্দ কুইজ হাব
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    স্টার পয়েন্ট, স্ট্রিক ও কনফেটি উদযাপনের সাথে মজার জ্ঞান চর্চা।
                  </p>
                </div>
              </div>
              <span className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-amber-600 flex items-center gap-1">
                <span>কুইজ খেলুন</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Card 6: Rhymes */}
            <Link 
              href="/rhymes"
              className="group p-5 rounded-3xl bg-white border border-slate-200 hover:border-rose-400 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🌙
                </span>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-rose-700 transition-colors">
                    গল্প ও ছড়ার অডিও
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    কারাওকে স্টাইল টেক্সট হাইলাইটের সাথে মিষ্টি ছড়া ও শিক্ষণীয় গল্পের অডিও আবৃত্তি।
                  </p>
                </div>
              </div>
              <span className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-rose-600 flex items-center gap-1">
                <span>ছড়া শুনুন</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Card 7: Lesson Planner */}
            <Link 
              href="/lesson-planner"
              className="group p-5 rounded-3xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  👩‍🏫
                </span>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-700 transition-colors">
                    এআই লেসন প্ল্যানার
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    ৪০ মিনিটের আদর্শ পাঠ পরিকল্পনা, উপকরণ, শিখনফল ও মূল্যায়ন ছক তৈরি।
                  </p>
                </div>
              </div>
              <span className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-indigo-600 flex items-center gap-1">
                <span>প্ল্যান তৈরি করুন</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Card 8: Search */}
            <button
              type="button"
              onClick={() => {
                if (role === "student") setStudentTab("search");
                else setTeacherTab("search");
                const el = document.getElementById("studio-workspace");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group p-5 rounded-3xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-lg transition-all flex flex-col justify-between text-left"
            >
              <div className="space-y-3">
                <span className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🔍
                </span>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-teal-700 transition-colors">
                    স্মার্ট কারিকুলাম সার্চ
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    ৯২টি বইয়ের যেকোনো কবিতা, ব্যাকরণ বা অধ্যায় দ্রুত খুঁজে বের করার সার্চ ইঞ্জিন।
                  </p>
                </div>
              </div>
              <span className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-teal-600 flex items-center gap-1">
                <span>স্টুডিওতে খুঁজুন</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </section>
      </main>

      {/* 📖 In-Browser Book Reader Modal */}
      {readerBook && (
        <BookReaderModal
          isOpen={Boolean(readerBook)}
          onClose={() => setReaderBook(null)}
          bookName={readerBook.name}
          classNameTitle={readerBook.classNameTitle}
          classId={readerBook.classId}
          type={readerBook.type}
          subject={readerBook.subject}
          icon={readerBook.icon}
        />
      )}

      {/* 🦶 Semantic Dynamic Footer */}
      <SiteFooter />
    </div>
  );
}
