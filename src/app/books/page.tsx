"use client";

import { useState } from "react";
import { BookOpen, GraduationCap } from "lucide-react";
import { CLASSES_DATA, ClassGrade } from "@/data/curriculum";
import BookReaderModal from "@/components/BookReaderModal";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SegmentedControl } from "@/components/ui";

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
                className={`p-3 sm:p-4 rounded-[16px] text-center border-2 transition-all flex flex-col items-center justify-center gap-2 touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006A4E] cursor-pointer ${
                  isSelected
                    ? "border-[#006A4E] bg-[#EEF8F3]/70 shadow-sm"
                    : "border-[#D5DCE4] bg-white hover:border-[#006A4E]/50 hover:bg-[#F8FAFC]"
                }`}
              >
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#EEF8F3] border border-[#CBE5D8] flex items-center justify-center text-2xl sm:text-3xl shrink-0">
                  {cls.icon}
                </span>
                <span className={`font-semibold text-xs sm:text-sm leading-tight block ${isSelected ? "text-[#00563F]" : "text-slate-900"}`}>
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

            {/* Toggle Tabs (Soft-Solid 2.0 Sliding SegmentedControl) */}
            <div className="self-start md:self-auto">
              <SegmentedControl
                value={activeTab}
                onChange={setActiveTab}
                ariaLabel="বই ও সহায়িকা প্রকারভেদ"
                roleMode="tablist"
                size="md"
                options={[
                  {
                    value: "textbooks",
                    label: `পাঠ্যবই (${currentClass.textbooks.length})`,
                    icon: <BookOpen className="w-4 h-4" />,
                  },
                  {
                    value: "teachersGuides",
                    label: `শিক্ষক সহায়িকা (${currentClass.teachersGuides.length})`,
                    icon: <GraduationCap className="w-4 h-4" />,
                  },
                ]}
              />
            </div>
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
                  className="group p-4 sm:p-5 rounded-[16px] border-2 border-[#D5DCE4] hover:border-[#006A4E] bg-white hover:bg-[#EEF8F3]/40 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center justify-between min-h-[140px] sm:min-h-[155px] cursor-pointer touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006A4E]"
                >
                  <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#EEF8F3] border border-[#CBE5D8] flex items-center justify-center text-3xl sm:text-4xl">
                    {book.icon}
                  </span>
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm group-hover:text-[#00563F] transition-colors line-clamp-2 leading-snug mt-2">
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
                  className="group p-4 sm:p-5 rounded-[16px] border-2 border-[#D5DCE4] hover:border-[#0F172A] bg-white hover:bg-slate-50 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center justify-between min-h-[140px] sm:min-h-[155px] cursor-pointer touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006A4E]"
                >
                  <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-3xl sm:text-4xl">
                    {tg.icon}
                  </span>
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm group-hover:text-[#0F172A] transition-colors line-clamp-2 leading-snug mt-2">
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
