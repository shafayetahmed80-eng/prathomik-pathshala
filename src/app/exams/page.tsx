"use client";

import ExamWorksheetGenerator from "@/components/ExamWorksheetGenerator";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function ExamsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 via-white to-emerald-50/30 text-slate-900 w-full overflow-x-clip">
      <SiteHeader
        pageTitle="স্মার্ট প্রশ্নপত্র ও ওয়ার্কশিট মেকার"
        pageSubtitle="এনসিটিবি ২০২৬ প্রাথমিক শিক্ষাক্রম অনুযায়ী কাস্টম প্রশ্নপত্র"
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 sm:py-8 print:p-0 print:m-0 print:max-w-none">
        <ExamWorksheetGenerator />
      </main>

      <SiteFooter />
    </div>
  );
}
