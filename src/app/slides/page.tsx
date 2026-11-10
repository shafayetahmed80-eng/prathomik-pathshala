"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MultimediaSlideDeck from "@/components/MultimediaSlideDeck";
import BrandHomeLink from "@/components/BrandHomeLink";
import InstallAppButton from "@/components/InstallAppButton";
import SiteFooter from "@/components/SiteFooter";

export default function SlidesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-white to-sky-50/30 text-slate-900">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 border-b border-purple-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-11 sm:h-12 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>হোমে ফিরুন</span>
            </Link>
            <div className="h-5 w-px bg-slate-200 hidden sm:block" />
            <span className="text-xs sm:text-sm font-black text-slate-900 truncate">
              মাল্টিমিডিয়া স্লাইড হাব • ক্লাসরুম মোড
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <InstallAppButton variant="compact" />
            <BrandHomeLink variant="compact" className="hidden sm:inline-flex" />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-2 sm:px-4 lg:px-6 py-2 sm:py-3">
        <MultimediaSlideDeck />
      </main>

      <SiteFooter />
    </div>
  );
}
