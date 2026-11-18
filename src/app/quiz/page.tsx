"use client";

import InteractiveQuizHub from "@/components/InteractiveQuizHub";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function QuizPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-white to-orange-50/30 text-slate-900 w-full overflow-x-clip">
      <SiteHeader
        pageTitle="আনন্দ কুইজ ও ব্রেন বুস্টার"
        pageSubtitle="প্রাক-প্রাথমিক থেকে ৫ম শ্রেণির ইন্টারেক্টিভ কুইজ ও জ্ঞান অন্বেষণ"
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <InteractiveQuizHub />
      </main>

      <SiteFooter />
    </div>
  );
}
