"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Search,
  Smile,
  Pencil,
  FileText,
  Volume2,
  Presentation,
  Clock,
  Award,
} from "lucide-react";
import { CLASSES_DATA, ClassGrade } from "@/data/curriculum";
import BookReaderModal from "@/components/BookReaderModal";
import TeacherLessonPlanner from "@/components/TeacherLessonPlanner";
import InteractiveQuizHub from "@/components/InteractiveQuizHub";
import ExamWorksheetGenerator from "@/components/ExamWorksheetGenerator";
import BanglaBornomalaLab from "@/components/BanglaBornomalaLab";
import MultimediaSlideDeck from "@/components/MultimediaSlideDeck";
import StudentCertificateStudio from "@/components/StudentCertificateStudio";
import GlobalNCTBSearch from "@/components/GlobalNCTBSearch";
import AudioRhymesCorner from "@/components/AudioRhymesCorner";
import InstallAppButton from "@/components/InstallAppButton";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button, SegmentedControl, getButtonClasses } from "@/components/ui";

type UserRole = "student" | "teacher";
type StudentTab = "books" | "bornomala" | "quiz" | "rhymes" | "search";
type TeacherTab = "exams" | "slides" | "planner" | "certificates" | "guides" | "search";

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
        case "certificates": return "/certificates";
        case "guides": return "/books";
        default: return "/exams";
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 via-white to-amber-50/40 text-slate-900 antialiased selection:bg-emerald-200">
      {/* 🌟 Universal Responsive Site Header with Mobile Navigation Drawer */}
      <SiteHeader showBackLink={false} />

      {/* 🚀 Semantic Main Landmark */}
      <main id="main-content" className="flex-1 w-full flex flex-col items-center">
        {/* 🌟 Compact Inspiring Hero Section */}
        <section
          aria-labelledby="hero-heading"
          className="relative overflow-hidden pt-6 sm:pt-10 pb-6 sm:pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF8F3] border border-[#CBEADB] text-[#00563F] text-[11px] sm:text-xs font-semibold mb-4 max-w-xl mx-auto leading-normal">
            <Sparkles className="w-3.5 h-3.5 text-[#006A4E] shrink-0" aria-hidden="true" />
            <span className="pt-[1px]">জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) ২০২৬ ডিজিটাল কারিকুলাম</span>
          </div>

          <h1
            id="hero-heading"
            className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-snug sm:leading-tight max-w-4xl mx-auto tracking-tight"
          >
            {role === "student" ? (
              <>
                প্রাথমিকের শিশুদের জন্য{" "}
                <span className="text-[#006A4E]">আনন্দময় ও স্মার্ট</span>{" "}
                শেখার ঠিকানা
              </>
            ) : (
              <>
                প্রাথমিক শিক্ষকদের জন্য{" "}
                <span className="text-[#006A4E]">আধুনিক এআই টুলস ও ক্লাসরুম</span>{" "}
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
            <InstallAppButton variant="hero" />
          </div>

          {/* 🎛️ Primary Role Switcher (Student / Teacher Soft-Solid Segmented Control) */}
          <div className="mt-5 sm:mt-6 flex justify-center">
            <SegmentedControl<UserRole>
              ariaLabel="ব্যবহারকারীর ভূমিকা নির্বাচন"
              roleMode="radiogroup"
              size="md"
              value={role}
              onChange={setRole}
              options={[
                { value: "student", label: "শিক্ষার্থী মোড", shortLabel: "শিক্ষার্থী", icon: <span className="text-base leading-none">🎈</span> },
                { value: "teacher", label: "শিক্ষক স্টুডিও", shortLabel: "শিক্ষক", icon: <GraduationCap className="w-4 h-4" /> },
              ]}
            />
          </div>
        </section>

        {/* 🎛️ Master Dynamic Studio Workspace Section */}
        <section 
          id="studio-workspace" 
          aria-labelledby="studio-title"
          className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 pb-12 space-y-4"
        >
          {/* Studio Header Bar & Tab Switcher */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Left: Mode Title & Mobile Dedicated Button */}
            <div className="flex items-center justify-between w-full md:w-auto">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className={`w-9 h-9 rounded-[12px] flex items-center justify-center text-lg shrink-0 ${
                    role === "student"
                      ? "bg-[#EEF8F3] text-[#00563F] border border-[#CBEADB]"
                      : "bg-[#0F172A] text-white"
                  }`}
                >
                  {role === "student" ? "🎈" : "👩‍🏫"}
                </span>
                <div>
                  <h2 id="studio-title" className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    {role === "student" ? "শিক্ষার্থী লার্নিং স্টুডিও" : "শিক্ষক প্রফেশনাল স্টুডিও"}
                  </h2>
                  <p className="text-[11px] text-slate-500">যে টুলটি প্রয়োজন ট্যাবে নির্বাচন করুন</p>
                </div>
              </div>

              {/* Dedicated Route Button on Mobile */}
              <div className="md:hidden shrink-0">
                <Link
                  href={getDedicatedUrl()}
                  className={getButtonClasses({
                    variant: role === "student" ? "tonal" : "secondary",
                    size: "sm",
                    className: "px-3",
                  })}
                  title="এই টুলটি আলাদা ফুলস্ক্রিন পেজে খুলুন"
                >
                  <span>ফুল পেজ</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Middle: Soft-Solid Sliding Segmented Tabs */}
            <div className="w-full md:w-auto flex justify-center overflow-hidden">
              {role === "student" ? (
                <SegmentedControl<StudentTab>
                  ariaLabel="শিক্ষার্থী স্টুডিও টুলস তালিকা"
                  roleMode="tablist"
                  size="sm"
                  value={studentTab}
                  onChange={setStudentTab}
                  options={[
                    { value: "books", label: "পাঠ্যবই", icon: <BookOpen className="w-3.5 h-3.5" /> },
                    { value: "bornomala", label: "বর্ণমালা ল্যাব", icon: <Pencil className="w-3.5 h-3.5" /> },
                    { value: "quiz", label: "আনন্দ কুইজ", icon: <Smile className="w-3.5 h-3.5" /> },
                    { value: "rhymes", label: "ছড়া ও গল্প", icon: <Volume2 className="w-3.5 h-3.5" /> },
                    { value: "search", label: "সার্চ", icon: <Search className="w-3.5 h-3.5" /> },
                  ]}
                />
              ) : (
                <SegmentedControl<TeacherTab>
                  ariaLabel="শিক্ষক স্টুডিও টুলস তালিকা"
                  roleMode="tablist"
                  size="sm"
                  value={teacherTab}
                  onChange={setTeacherTab}
                  options={[
                    { value: "exams", label: "প্রশ্নপত্র মেকার", icon: <FileText className="w-3.5 h-3.5" /> },
                    { value: "slides", label: "স্লাইড হাব", icon: <Presentation className="w-3.5 h-3.5" /> },
                    { value: "planner", label: "লেসন প্ল্যানার", icon: <Clock className="w-3.5 h-3.5" /> },
                    { value: "certificates", label: "প্রত্যয়নপত্র মেকার", icon: <Award className="w-3.5 h-3.5" /> },
                    { value: "guides", label: "শিক্ষক সহায়িকা", icon: <BookOpen className="w-3.5 h-3.5" /> },
                    { value: "search", label: "সার্চ", icon: <Search className="w-3.5 h-3.5" /> },
                  ]}
                />
              )}
            </div>

            {/* Right: Open in Dedicated Route (Desktop) */}
            <div className="hidden md:block shrink-0">
              <Link
                href={getDedicatedUrl()}
                className={getButtonClasses({
                  variant: role === "student" ? "tonal" : "secondary",
                  size: "sm",
                })}
                title="এই টুলটি আলাদা ফুলস্ক্রিন পেজে খুলুন"
              >
                <span>ফুল পেজে খুলুন</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
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

                    {/* Grade Selector Buttons */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                      {CLASSES_DATA.map((cls) => (
                        <Button
                          key={cls.id}
                          variant={selectedClassId === cls.id ? "primary" : "secondary"}
                          size="sm"
                          onClick={() => setSelectedClassId(cls.id)}
                          aria-pressed={selectedClassId === cls.id}
                          className="shrink-0"
                        >
                          <span>{cls.banglaName}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Minimalist One-Tap Books Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                    {currentClass.textbooks.map((book) => (
                      <button
                        key={book.id}
                        type="button"
                        onClick={() => setReaderBook({
                          name: book.name,
                          classId: currentClass.id,
                          classNameTitle: currentClass.banglaName,
                          type: "textbook",
                          subject: book.subject,
                          icon: book.icon
                        })}
                        aria-label={`${book.name} বইটি পড়ুন`}
                        className="group p-3.5 sm:p-4 rounded-[16px] border border-[#D5DCE4] hover:border-[#006A4E] bg-white hover:bg-[#EEF8F3]/40 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center justify-between min-h-[135px] sm:min-h-[145px] cursor-pointer touch-manipulation active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006A4E]"
                      >
                        <span className="w-13 h-13 sm:w-14 sm:h-14 rounded-[14px] bg-[#EEF8F3] border border-[#CBEADB] flex items-center justify-center text-2xl sm:text-3xl transition-transform duration-200 group-hover:-translate-y-0.5">
                          {book.icon}
                        </span>
                        <span className="font-semibold text-slate-900 text-xs sm:text-sm group-hover:text-[#00563F] transition-colors line-clamp-2 leading-snug mt-2">
                          {book.name}
                        </span>
                      </button>
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
              ) : teacherTab === "certificates" ? (
                <StudentCertificateStudio />
              ) : teacherTab === "guides" ? (
                /* Teacher Guides Browser */
                <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-md space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">শিক্ষক সহায়িকা লাইব্রেরি</h3>
                      <p className="text-xs text-slate-500">এনসিটিবি কর্তৃক অনুমোদিত অফিশিয়াল শিখন ও মূল্যায়ন গাইড</p>
                    </div>

                    {/* Grade Selector Buttons (Teacher Ink) */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                      {CLASSES_DATA.map((cls) => (
                        <Button
                          key={cls.id}
                          variant={selectedClassId === cls.id ? "ink" : "secondary"}
                          size="sm"
                          onClick={() => setSelectedClassId(cls.id)}
                          aria-pressed={selectedClassId === cls.id}
                          className="shrink-0"
                        >
                          <span>{cls.banglaName}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Minimalist One-Tap Guides Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                    {currentClass.teachersGuides.map((tg) => (
                      <button
                        key={tg.id}
                        type="button"
                        onClick={() => setReaderBook({
                          name: tg.name,
                          classId: currentClass.id,
                          classNameTitle: currentClass.banglaName,
                          type: "teachers_guide",
                          subject: tg.subject,
                          icon: tg.icon
                        })}
                        aria-label={`${tg.name} শিক্ষক সহায়িকা খুলুন`}
                        className="group p-3.5 sm:p-4 rounded-[16px] border border-[#D5DCE4] hover:border-[#0F172A] bg-white hover:bg-slate-50/70 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center justify-between min-h-[135px] sm:min-h-[145px] cursor-pointer touch-manipulation active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006A4E]"
                      >
                        <span className="w-13 h-13 sm:w-14 sm:h-14 rounded-[14px] bg-slate-100 border border-slate-200/80 flex items-center justify-center text-2xl sm:text-3xl transition-transform duration-200 group-hover:-translate-y-0.5">
                          {tg.icon}
                        </span>
                        <span className="font-semibold text-slate-900 text-xs sm:text-sm group-hover:text-[#00563F] transition-colors line-clamp-2 leading-snug mt-2">
                          {tg.name}
                        </span>
                      </button>
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
            <h2 id="quick-launch-heading" className="text-2xl sm:text-3xl font-bold text-slate-900">
              প্ল্যাটফর্মের সকল ফিচার এক নজরে
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">যেকোনো টুলে সরাসরি প্রবেশ করতে নিচের কার্ডগুলোতে ক্লিক করুন</p>
          </header>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2.5 sm:gap-3.5">
            {[
              { href: "/books", label: "পাঠ্যবই", aria: "পাঠ্যবই লাইব্রেরি", icon: "📚", zone: "student" as const },
              { href: "/bornomala", label: "বর্ণমালা ল্যাব", aria: "বর্ণমালা ল্যাব", icon: "🎨", zone: "student" as const },
              { href: "/slides", label: "স্লাইড হাব", aria: "স্লাইড হাব", icon: "📽️", zone: "teacher" as const },
              { href: "/exams", label: "প্রশ্নপত্র", aria: "প্রশ্নপত্র মেকার", icon: "📝", zone: "teacher" as const },
              { href: "/quiz", label: "আনন্দ কুইজ", aria: "আনন্দ কুইজ", icon: "🎮", zone: "student" as const },
              { href: "/rhymes", label: "ছড়া ও গল্প", aria: "ছড়া ও গল্প", icon: "🌙", zone: "student" as const },
              { href: "/lesson-planner", label: "লেসন প্ল্যানার", aria: "লেসন প্ল্যানার", icon: "👩‍🏫", zone: "teacher" as const },
              { href: "/certificates", label: "প্রত্যয়নপত্র", aria: "প্রত্যয়নপত্র স্টুডিও", icon: "📜", zone: "teacher" as const },
            ].map((tile) => {
              const isStudent = tile.zone === "student";
              return (
                <Link
                  key={tile.href}
                  href={tile.href}
                  aria-label={tile.aria}
                  className={`group p-3 sm:p-4 rounded-[16px] bg-white border border-[#D5DCE4] hover:shadow-md transition-all flex flex-col items-center justify-between text-center min-h-[110px] sm:min-h-[125px] active:scale-[0.98] touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006A4E] cursor-pointer ${
                    isStudent
                      ? "hover:border-[#006A4E] hover:bg-[#EEF8F3]/35"
                      : "hover:border-[#0F172A] hover:bg-slate-50/70"
                  }`}
                >
                  <span
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-[14px] flex items-center justify-center text-2xl sm:text-3xl shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 ${
                      isStudent
                        ? "bg-[#EEF8F3] border border-[#CBEADB]"
                        : "bg-slate-100 border border-slate-200/80"
                    }`}
                  >
                    {tile.icon}
                  </span>
                  <span className="font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-[#00563F] transition-colors line-clamp-1 leading-tight mt-1.5">
                    {tile.label}
                  </span>
                </Link>
              );
            })}

            {/* 9: Search */}
            <button
              type="button"
              onClick={() => {
                if (role === "student") setStudentTab("search");
                else setTeacherTab("search");
                const el = document.getElementById("studio-workspace");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label="স্মার্ট কারিকুলাম সার্চ"
              className="group p-3 sm:p-4 rounded-[16px] bg-white border border-[#D5DCE4] hover:border-[#006A4E] hover:bg-[#EEF8F3]/35 hover:shadow-md transition-all flex flex-col items-center justify-between text-center min-h-[110px] sm:min-h-[125px] active:scale-[0.98] touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006A4E] cursor-pointer"
            >
              <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-[14px] bg-[#EEF8F3] border border-[#CBEADB] flex items-center justify-center text-2xl sm:text-3xl shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5">
                🔍
              </span>
              <span className="font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-[#00563F] transition-colors line-clamp-1 leading-tight mt-1.5">
                স্মার্ট সার্চ
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
