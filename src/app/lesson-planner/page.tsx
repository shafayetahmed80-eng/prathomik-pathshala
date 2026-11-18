"use client";

import TeacherLessonPlanner from "@/components/TeacherLessonPlanner";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function LessonPlannerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-white to-slate-50 text-slate-900 w-full overflow-x-clip">
      <SiteHeader
        pageTitle="স্মার্ট এআই লেসন প্ল্যানার"
        pageSubtitle="এনসিটিবি ২০২৬ প্রাথমিক শিক্ষাক্রমের ৫-ধাপীয় পাঠ পরিকল্পনা"
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <TeacherLessonPlanner />
      </main>

      <SiteFooter />
    </div>
  );
}
