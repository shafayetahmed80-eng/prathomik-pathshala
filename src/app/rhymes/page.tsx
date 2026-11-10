"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AudioRhymesCorner from "@/components/AudioRhymesCorner";
import SiteFooter from "@/components/SiteFooter";

export default function RhymesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-rose-50 via-white to-amber-50/30 text-slate-900">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 border-b border-rose-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>হোমে ফিরুন</span>
            </Link>
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
            <span className="text-sm sm:text-lg font-black text-slate-900 truncate max-w-[200px] sm:max-w-none">
              গল্প ও ছড়ার অডিও কর্নার
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AudioRhymesCorner />
      </main>

      <SiteFooter />
    </div>
  );
}
