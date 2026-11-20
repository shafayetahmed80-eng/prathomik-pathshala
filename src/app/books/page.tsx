"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, GraduationCap } from "lucide-react";
import { CLASSES_DATA, ClassGrade } from "@/data/curriculum";
import BookReaderModal from "@/components/BookReaderModal";
import BrandHomeLink from "@/components/BrandHomeLink";
import InstallAppButton from "@/components/InstallAppButton";
import SiteHeader from "@/components/SiteHeader";
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 via-white to-amber-50/40 text-slate-900 w-full overflow-x-clip">
      {/* 🌟 Universal Responsive Header with Global Navigation */}
      <SiteHeader
        pageTitle="এনসিটিবি পাঠ্যবই ও শিক্ষক সহায়িকা"
        pageSubtitle="প্রাক-প্রাথমিক থেকে ৫ম শ্রেণির সকল বোর্ড বই"
        rightActions={
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 hidden md:inline-block">
            {totalBooks}টি বই সংরক্ষিত
          </span>
        }
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Grade Selection Grid */}
        <div 
          role="region" 
          aria-label="শ্রেণি নির্বাচন তালিকা"
          className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-4"
        >
          {CLASSES_DATA.map((cls) => {
            const isSelected = cls.id === selectedClassId;
            return (
              <button
                key={cls.id}
                type="button"
                onClick={() => setSelectedClassId(cls.id)}
                aria-pressed={isSelected}
                className={`p-3 sm:p-4 rounded-2xl text-center border-2 transition-all flex flex-col items-center justify-center gap-2 touch-manipulation active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer ${
                  isSelected
                    ? "border-emerald-500 bg-white shadow-md shadow-emerald-500/15 scale-102 ring-2 ring-emerald-500/20"
                    : "border-slate-200/90 bg-white/80 hover:border-emerald-300 hover:bg-white shadow-2xs"
                }`}
              >
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-2xl sm:text-3xl shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                  {cls.icon}
                </span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm leading-tight block">
                  {cls.banglaName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Class Panel */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-3xl sm:text-4xl p-2.5 sm:p-3 bg-slate-100 rounded-2xl shrink-0">
                {currentClass.icon}
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{currentClass.banglaName}</h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">{currentClass.description}</p>
              </div>
            </div>

            {/* Toggle Tabs */}
            <nav aria-label="বই ও সহায়িকা প্রকারভেদ" className="flex bg-slate-100 p-1.5 rounded-2xl self-start md:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("textbooks")}
                aria-pressed={activeTab === "textbooks"}
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
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
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "teachersGuides"
                    ? "bg-white text-purple-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <GraduationCap className="w-4 h-4 text-purple-600" />
                <span>শিক্ষক সহায়িকা ({currentClass.teachersGuides.length})</span>
              </button>
            </nav>
          </div>

          {/* Minimalist One-Tap Book Tiles Grid */}
          <div 
            role="region" 
            aria-label={activeTab === "textbooks" ? "পাঠ্যবই তালিকা" : "শিক্ষক সহায়িকা তালিকা"}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 pt-6 sm:pt-8"
          >
            {activeTab === "textbooks" ? (
              currentClass.textbooks.map((book) => (
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
                  className="group p-4 sm:p-5 rounded-2xl border-2 border-slate-200/90 hover:border-emerald-500 bg-white hover:bg-emerald-50/20 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center justify-between min-h-[140px] sm:min-h-[155px] cursor-pointer touch-manipulation active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl sm:text-4xl shadow-inner group-hover:scale-108 transition-transform">
                    {book.icon}
                  </span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug mt-2">
                    {book.name}
                  </span>
                </button>
              ))
            ) : (
              currentClass.teachersGuides.map((tg) => (
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
                  className="group p-4 sm:p-5 rounded-2xl border-2 border-slate-200/90 hover:border-purple-500 bg-white hover:bg-purple-50/20 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center justify-between min-h-[140px] sm:min-h-[155px] cursor-pointer touch-manipulation active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-3xl sm:text-4xl shadow-inner group-hover:scale-108 transition-transform">
                    {tg.icon}
                  </span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-purple-700 transition-colors line-clamp-2 leading-snug mt-2">
                    {tg.name}
                  </span>
                </button>
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
