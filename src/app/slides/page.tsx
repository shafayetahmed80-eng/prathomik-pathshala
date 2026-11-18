"use client";

import MultimediaSlideDeck from "@/components/MultimediaSlideDeck";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function SlidesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-white to-sky-50/30 text-slate-900 w-full overflow-x-clip">
      <SiteHeader
        pageTitle="মাল্টিমিডিয়া স্লাইড হাব • ক্লাসরুম মোড"
        pageSubtitle="ডিজিটাল প্রেজেন্টেশন ও ইন্টারেক্টিভ পাঠদান"
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-2 sm:px-4 lg:px-6 py-2 sm:py-3">
        <MultimediaSlideDeck />
      </main>

      <SiteFooter />
    </div>
  );
}
