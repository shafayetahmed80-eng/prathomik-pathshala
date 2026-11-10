"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, GraduationCap, ChevronRight, Volume2, Sparkles, Heart } from "lucide-react";
import { CLASSES_DATA, ClassGrade } from "@/data/curriculum";
import BookReaderModal from "@/components/BookReaderModal";
import BrandHomeLink from "@/components/BrandHomeLink";
import SiteFooter from "@/components/SiteFooter";

export default function BooksPage() {
  const [selectedClassId, setSelectedClassId] = useState<string>("class-1");
  const [activeTab, setActiveTab] = useState<"textbooks" | "teachersGuides">("textbooks");
  const [readerBook, setReaderBook] = useState<{
    name: string;
    classId: string;
    classNameTitle: string;
    type: "textbook" | "teachers_guide";
    subject: string;
    icon: string;
  } | null>(null);

  const currentClass: ClassGrade = CLASSES_DATA.find((c) => c.id === selectedClassId) || CLASSES_DATA[1];
  const totalBooks = CLASSES_DATA.reduce((acc, c) => acc + c.textbooks.length + c.teachersGuides.length, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 via-white to-amber-50/40 text-slate-900">
      {/* Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 border-b border-sky-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>হোমে ফিরুন</span>
            </Link>
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
            <div>
              <h1 className="text-sm sm:text-xl font-black text-slate-900 truncate max-w-[200px] sm:max-w-none">
                এনসিটিবি পাঠ্যবই ও শিক্ষক সহায়িকা
              </h1>
              <p className="text-[11px] text-slate-500 hidden sm:block">প্রাক-প্রাথমিক থেকে ৫ম শ্রেণির সকল বোর্ড বই</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 hidden md:inline-block">
              {totalBooks}টি বই সংরক্ষিত
            </span>
            <BrandHomeLink variant="compact" className="hidden sm:inline-flex" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Grade Selection Grid */}
        <div 
          role="region" 
          aria-label="শ্রেণি নির্বাচন তালিকা"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          {CLASSES_DATA.map((cls) => {
            const isSelected = cls.id === selectedClassId;
            return (
              <button
                key={cls.id}
                type="button"
                onClick={() => setSelectedClassId(cls.id)}
                aria-pressed={isSelected}
                className={`p-3.5 sm:p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between h-32 sm:h-36 ${
                  isSelected
                    ? "border-emerald-500 bg-white shadow-lg shadow-emerald-500/15 scale-102 ring-2 ring-emerald-500/20"
                    : "border-slate-200 bg-white/80 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-2xl sm:text-3xl shrink-0">{cls.icon}</span>
                  <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold shrink-0 ${cls.accent}`}>
                    {cls.ageGroup}
                  </span>
                </div>
                <div className="mt-2 min-w-0">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-lg leading-tight truncate">
                    {cls.banglaName}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {cls.textbooks.length}টি পাঠ্যবই
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Class Panel */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-md">
          <header className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-3xl sm:text-4xl p-2.5 sm:p-3 bg-slate-100 rounded-2xl shrink-0">
                {currentClass.icon}
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{currentClass.banglaName}</h2>
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-slate-100 text-slate-700">
                    বয়সসীমা: {currentClass.ageGroup}
                  </span>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">{currentClass.description}</p>
              </div>
            </div>

            {/* Toggle Tabs */}
            <nav aria-label="বই ও সহায়িকা প্রকারভেদ" className="flex bg-slate-100 p-1.5 rounded-2xl self-start md:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("textbooks")}
                aria-pressed={activeTab === "textbooks"}
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "textbooks"
                    ? "bg-white text-emerald-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>পাঠ্যবই ({currentClass.textbooks.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("teachersGuides")}
                aria-pressed={activeTab === "teachersGuides"}
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "teachersGuides"
                    ? "bg-white text-purple-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <GraduationCap className="w-4 h-4 text-purple-600" />
                <span>শিক্ষক সহায়িকা ({currentClass.teachersGuides.length})</span>
              </button>
            </nav>
          </header>

          {/* Book Cards Grid */}
          <div 
            role="region" 
            aria-label={activeTab === "textbooks" ? "পাঠ্যবই তালিকা" : "শিক্ষক সহায়িকা তালিকা"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pt-6 sm:pt-8"
          >
            {activeTab === "textbooks" ? (
              currentClass.textbooks.map((book) => (
                <article
                  key={book.id}
                  className="group p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 bg-slate-50/50 hover:bg-emerald-50/20 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl sm:text-3xl p-2 sm:p-2.5 bg-white rounded-xl shadow-xs border border-slate-100">
                        {book.icon}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                        {book.subject}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-emerald-700 transition-colors">
                        {book.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {book.description}
                      </p>
                    </div>
                  </div>

                  <footer className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400">অনলাইন রিডার</span>
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
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors"
                    >
                      <span>বইটি পড়ুন</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </footer>
                </article>
              ))
            ) : (
              currentClass.teachersGuides.map((tg) => (
                <article
                  key={tg.id}
                  className="group p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-purple-300 bg-slate-50/50 hover:bg-purple-50/20 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl sm:text-3xl p-2 sm:p-2.5 bg-white rounded-xl shadow-xs border border-slate-100">
                        {tg.icon}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800">
                        শিক্ষক সহায়িকা
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-purple-700 transition-colors">
                        {tg.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {tg.description}
                      </p>
                    </div>
                  </div>

                  <footer className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 truncate mr-2">
                      শিখনফল ও মূল্যায়ন
                    </span>
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
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-purple-700 bg-purple-100 hover:bg-purple-200 transition-colors shrink-0"
                    >
                      <span>গাইডটি খুলুন</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </footer>
                </article>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Reader Modal */}
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

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
