"use client";

import AudioRhymesCorner from "@/components/AudioRhymesCorner";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function RhymesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-rose-50 via-white to-amber-50/30 text-slate-900 w-full overflow-x-clip">
      <SiteHeader
        pageTitle="গল্প ও ছড়ার অডিও কর্নার"
        pageSubtitle="প্রাক-প্রাথমিক থেকে ৫ম শ্রেণির ছড়া, কবিতা, আবৃত্তি ও কারাওকে"
      />

      <main className="flex-1 max-w-5xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AudioRhymesCorner />
      </main>

      <SiteFooter />
    </div>
  );
}
