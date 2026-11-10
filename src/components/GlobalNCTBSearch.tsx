"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  X, 
  BookOpen, 
  GraduationCap, 
  ChevronRight, 
  Filter, 
  Sparkles, 
  Tag, 
  Layers 
} from "lucide-react";
import { NCTB_SEARCH_INDEX, SearchIndexItem } from "@/data/searchIndex";

interface GlobalNCTBSearchProps {
  onOpenBook: (bookInfo: {
    name: string;
    classId: string;
    classNameTitle: string;
    type: "textbook" | "teachers_guide";
    subject: string;
    icon: string;
  }) => void;
}

const GRADE_FILTERS = [
  { id: "all", label: "সকল শ্রেণি" },
  { id: "pre-primary", label: "প্রাক-প্রাথমিক" },
  { id: "class-1", label: "১ম শ্রেণি" },
  { id: "class-2", label: "২য় শ্রেণি" },
  { id: "class-3", label: "৩য় শ্রেণি" },
  { id: "class-4", label: "৪র্থ শ্রেণি" },
  { id: "class-5", label: "৫ম শ্রেণি" },
];

const SUBJECT_FILTERS = [
  "সকল বিষয়",
  "বাংলা",
  "English",
  "গণিত",
  "বিজ্ঞান",
  "সমাজ"
];

const SUGGESTED_TAGS = [
  "The Ant and the Grasshopper",
  "পাখিদের কথা",
  "লসাগু",
  "শতকড়া",
  "সালোকসংশ্লেষণ",
  "মুজিবনগর সরকার",
  "যোগের ধারণা",
  "স্বরবর্ণ"
];

export default function GlobalNCTBSearch({ onOpenBook }: GlobalNCTBSearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("সকল বিষয়");

  const filteredResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return NCTB_SEARCH_INDEX.filter((item) => {
      // Grade filter
      if (selectedGrade !== "all" && item.classId !== selectedGrade) {
        return false;
      }

      // Subject filter
      if (selectedSubject !== "সকল বিষয়" && !item.subject.includes(selectedSubject)) {
        return false;
      }

      // Search term query
      if (!term) return true;

      const matchesTitle = item.title.toLowerCase().includes(term);
      const matchesChapter = item.chapterName.toLowerCase().includes(term);
      const matchesSnippet = item.snippet.toLowerCase().includes(term);
      const matchesSubject = item.subject.toLowerCase().includes(term);
      const matchesBook = item.bookName.toLowerCase().includes(term);
      const matchesKeywords = item.keywords.some((k) => k.toLowerCase().includes(term));

      return matchesTitle || matchesChapter || matchesSnippet || matchesSubject || matchesBook || matchesKeywords;
    });
  }, [searchTerm, selectedGrade, selectedSubject]);

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedGrade("all");
    setSelectedSubject("সকল বিষয়");
  };

  return (
    <article 
      aria-labelledby="global-search-heading"
      className="bg-white rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200 shadow-xl space-y-6 sm:space-y-8 w-full"
    >
      {/* 🌟 Top Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div className="flex items-center gap-3">
          <div 
            aria-hidden="true" 
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-600 flex items-center justify-center text-white text-2xl shadow-md shadow-emerald-500/20 shrink-0"
          >
            🔍
          </div>
          <div>
            <h3 id="global-search-heading" className="text-xl sm:text-2xl font-black text-slate-900">
              স্মার্ট এনসিটিবি পাঠ্যক্রম সার্চ ও ইনডেক্সিং
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              ৯২টি সরকারি পাঠ্যবই ও শিক্ষক সহায়িকার যেকোনো অধ্যায়, কবিতা, ব্যাকরণ বা বিষয় এক ক্লিকে খুঁজুন
            </p>
          </div>
        </div>

        {/* Found Results Count Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3.5 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs sm:text-sm font-bold shadow-xs">
            {filteredResults.length}টি ফলাফল পাওয়া গেছে
          </span>
        </div>
      </header>

      {/* 🔎 Semantic Search Bar Input */}
      <form 
        onSubmit={(e) => e.preventDefault()}
        role="search"
        aria-label="এনসিটিবি পাঠ্যক্রম অনুসন্ধান ফর্ম"
        className="relative w-full max-w-3xl mx-auto"
      >
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" aria-hidden="true" />
          <input
            id="nctb-search-input"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="যেকোনো বিষয় লিখুন (যেমন: লসাগু, পাখির নাম, Grasshopper)..."
            className="w-full pl-12 pr-12 py-3.5 sm:py-4 rounded-2xl border-2 border-slate-200 bg-slate-50 hover:bg-white focus:bg-white text-slate-900 text-sm sm:text-base font-medium placeholder:text-slate-400 shadow-xs focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all"
            aria-label="এনসিটিবি পাঠ্যক্রম অনুসন্ধান ইনপুট"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-4 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              title="মুছে ফেলুন"
              aria-label="অনুসন্ধান টেক্সট মুছে ফেলুন"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </form>

      {/* 🏷️ Suggested Keywords & Trending Tags */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar" role="region" aria-label="জনপ্রিয় অনুসন্ধান ট্যাগ">
        <span className="text-slate-400 font-bold shrink-0 flex items-center gap-1">
          <Tag className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
          <span>পরামর্শ:</span>
        </span>
        {SUGGESTED_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagClick(tag)}
            className="px-3 py-1 rounded-full bg-slate-100 hover:bg-teal-100 hover:text-teal-900 text-slate-700 font-medium shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 🎛️ Dual Filter Bar: Grade & Subject */}
      <div className="space-y-3 pt-2">
        {/* Grade Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar" role="group" aria-label="শ্রেণি ফিল্টার">
          {GRADE_FILTERS.map((gf) => {
            const isSelected = selectedGrade === gf.id;
            return (
              <button
                key={gf.id}
                type="button"
                onClick={() => setSelectedGrade(gf.id)}
                aria-pressed={isSelected}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                  isSelected
                    ? "bg-teal-600 text-white shadow-xs font-bold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {gf.label}
              </button>
            );
          })}
        </div>

        {/* Subject Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar" role="group" aria-label="বিষয় ফিল্টার">
          {SUBJECT_FILTERS.map((subj) => {
            const isSelected = selectedSubject === subj;
            return (
              <button
                key={subj}
                type="button"
                onClick={() => setSelectedSubject(subj)}
                aria-pressed={isSelected}
                className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                  isSelected
                    ? "bg-teal-600 text-white"
                    : "bg-teal-50/80 text-teal-800 hover:bg-teal-100"
                }`}
              >
                {subj}
              </button>
            );
          })}
        </div>
      </div>

      {/* 📋 Search Results Cards Grid */}
      <section aria-label="অনুসন্ধানের ফলাফল তালিকা" className="space-y-4 pt-2">
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResults.map((item) => (
              <article
                key={item.id}
                className="group p-5 rounded-2xl border border-slate-200 hover:border-teal-300 bg-slate-50/50 hover:bg-teal-50/20 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <header className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl p-2 bg-white rounded-xl shadow-xs border border-slate-100" aria-hidden="true">
                      {item.icon}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-800">
                        {item.gradeName}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                        {item.subject}
                      </span>
                    </div>
                  </header>

                  <div>
                    <h4 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-teal-900/80 font-semibold mt-1">
                      অধ্যায়: {item.chapterName}
                    </p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {item.snippet}
                    </p>
                  </div>
                </div>

                <footer className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-500 truncate max-w-[170px] sm:max-w-[220px]">
                    {item.bookName}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      onOpenBook({
                        name: item.bookName,
                        classId: item.classId,
                        classNameTitle: item.gradeName,
                        type: item.type,
                        subject: item.subject,
                        icon: item.icon
                      });
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-teal-700 bg-teal-100 hover:bg-teal-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                  >
                    <span>বইটি পড়ুন</span>
                    <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </footer>
              </article>
            ))}
          </div>
        ) : (
          /* Empty Search Fallback */
          <div className="py-12 text-center space-y-4 max-w-md mx-auto">
            <div className="text-5xl" aria-hidden="true">🔍</div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-slate-800">কোনো ফলাফল পাওয়া যায়নি!</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                &quot;{searchTerm}&quot; দিয়ে কোনো বিষয় পাওয়া যায়নি। বানান পরীক্ষা করুন অথবা ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।
              </p>
            </div>
            <button
              type="button"
              onClick={clearSearch}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors shadow-xs"
            >
              <span>ফিল্টার রিসেট করুন</span>
            </button>
          </div>
        )}
      </section>
    </article>
  );
}
