"use client";

import BanglaBornomalaLab from "@/components/BanglaBornomalaLab";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function BornomalaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 via-white to-purple-50/30 text-slate-900 w-full overflow-x-clip">
      <SiteHeader
        pageTitle="ডিজিটাল বর্ণমালা ও হাতেখড়ি ল্যাব"
        pageSubtitle="স্বরবর্ণ, ব্যঞ্জনবর্ণ, কার-চিহ্ন, যুক্তবর্ণ ও আর্কেড গেমস"
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <BanglaBornomalaLab />
      </main>

      <SiteFooter />
    </div>
  );
}
