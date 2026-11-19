"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowLeft,
  BookOpen,
  Sparkles,
  Presentation,
  FileQuestion,
  Award,
  Lightbulb,
  HelpCircle,
  Music,
  Home,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import BrandHomeLink from "@/components/BrandHomeLink";
import InstallAppButton from "@/components/InstallAppButton";

export interface NavItem {
  href: string;
  label: string;
  shortLabel: string;
  icon: string;
  lucideIcon?: React.ElementType;
  badge?: string;
  category: "student" | "teacher";
  description: string;
  accent: {
    activeBg: string;
    activeText: string;
    hoverText: string;
    pillBg: string;
    pillText: string;
  };
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    href: "/books",
    label: "পাঠ্যবই",
    shortLabel: "পাঠ্যবই",
    icon: "📚",
    lucideIcon: BookOpen,
    category: "student",
    description: "প্রাক-প্রাথমিক থেকে ৫ম শ্রেণির সকল বোর্ড বই ও শিক্ষক সহায়িকা",
    accent: {
      activeBg: "bg-emerald-600 text-white shadow-xs",
      activeText: "text-emerald-700",
      hoverText: "hover:text-emerald-700",
      pillBg: "bg-emerald-100",
      pillText: "text-emerald-800",
    },
  },
  {
    href: "/bornomala",
    label: "বর্ণমালা",
    shortLabel: "বর্ণমালা",
    icon: "🔤",
    lucideIcon: Sparkles,
    category: "student",
    description: "ডিজিটাল বর্ণমালা ও হাতেখড়ি ল্যাব, ট্রেসিং ক্যানভাস ও আর্কেড গেমস",
    accent: {
      activeBg: "bg-pink-600 text-white shadow-xs",
      activeText: "text-pink-700",
      hoverText: "hover:text-pink-700",
      pillBg: "bg-pink-100",
      pillText: "text-pink-800",
    },
  },
  {
    href: "/slides",
    label: "স্লাইড হাব",
    shortLabel: "স্লাইড হাব",
    icon: "🖥️",
    lucideIcon: Presentation,
    category: "teacher",
    description: "মাল্টিমিডিয়া ক্লাসরুম স্লাইড, সাউন্ড এফেক্ট ও অডিও আবৃত্তি",
    accent: {
      activeBg: "bg-purple-600 text-white shadow-xs",
      activeText: "text-purple-700",
      hoverText: "hover:text-purple-700",
      pillBg: "bg-purple-100",
      pillText: "text-purple-800",
    },
  },
  {
    href: "/exams",
    label: "প্রশ্নপত্র মেকার",
    shortLabel: "প্রশ্নপত্র",
    icon: "📝",
    lucideIcon: FileQuestion,
    category: "teacher",
    description: "এনসিটিবি ২০২৬ সিলেবাস অনুযায়ী স্বয়ংক্রিয় পরীক্ষার প্রশ্নপত্র ও ওয়ার্কশিট",
    accent: {
      activeBg: "bg-sky-600 text-white shadow-xs",
      activeText: "text-sky-700",
      hoverText: "hover:text-sky-700",
      pillBg: "bg-sky-100",
      pillText: "text-sky-800",
    },
  },
  {
    href: "/certificates",
    label: "প্রত্যয়নপত্র",
    shortLabel: "প্রত্যয়নপত্র",
    icon: "📜",
    lucideIcon: Award,
    category: "teacher",
    description: "৫টি সরকারি ফরম্যাটে প্রত্যয়নপত্র ও সনদপত্র তৈরি, প্রিন্ট ও আসল কপি",
    accent: {
      activeBg: "bg-amber-600 text-white shadow-xs",
      activeText: "text-amber-800",
      hoverText: "hover:text-amber-700",
      pillBg: "bg-amber-100",
      pillText: "text-amber-800",
    },
  },
  {
    href: "/lesson-planner",
    label: "লেসন প্ল্যানার",
    shortLabel: "প্ল্যানার",
    icon: "💡",
    lucideIcon: Lightbulb,
    badge: "নতুন",
    category: "teacher",
    description: "এনসিটিবি ২০২৬ স্মার্ট এআই পাঠ পরিকল্পনা ও শিক্ষক ডায়েরি",
    accent: {
      activeBg: "bg-indigo-600 text-white shadow-xs",
      activeText: "text-indigo-700",
      hoverText: "hover:text-indigo-700",
      pillBg: "bg-indigo-100",
      pillText: "text-indigo-800",
    },
  },
  {
    href: "/quiz",
    label: "কুইজ",
    shortLabel: "কুইজ",
    icon: "🎯",
    lucideIcon: HelpCircle,
    category: "student",
    description: "আনন্দ কুইজ হাব, জ্ঞান অন্বেষণ ও ব্রেন বুস্টার গেমস",
    accent: {
      activeBg: "bg-teal-600 text-white shadow-xs",
      activeText: "text-teal-700",
      hoverText: "hover:text-teal-700",
      pillBg: "bg-teal-100",
      pillText: "text-teal-800",
    },
  },
  {
    href: "/rhymes",
    label: "ছড়া ও গল্প",
    shortLabel: "ছড়া ও গল্প",
    icon: "🎵",
    lucideIcon: Music,
    category: "student",
    description: "গল্প ও ছড়ার অডিও কর্নার, কারাওকে ও আবৃত্তি",
    accent: {
      activeBg: "bg-rose-600 text-white shadow-xs",
      activeText: "text-rose-700",
      hoverText: "hover:text-rose-700",
      pillBg: "bg-rose-100",
      pillText: "text-rose-800",
    },
  },
];

interface SiteHeaderProps {
  /** Optional title of current subpage */
  pageTitle?: string;
  /** Optional subtitle or badge */
  pageSubtitle?: string;
  /** Optional extra elements on the right */
  rightActions?: React.ReactNode;
  /** Whether to show 'হোমে ফিরুন' back link (defaults to true if pathname !== '/') */
  showBackLink?: boolean;
}

export default function SiteHeader({
  pageTitle,
  pageSubtitle,
  rightActions,
  showBackLink,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isHomePage = pathname === "/";
  const shouldShowBack = showBackLink !== undefined ? showBackLink : !isHomePage;

  // Prevent background body scroll when mobile drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [drawerOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 border-b border-sky-100/90 shadow-2xs print:hidden transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2">
        {/* Left Section: Brand & Optional Subpage Title / Back Button */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {shouldShowBack ? (
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0 active:scale-95 touch-manipulation"
                title="হোম পেজে ফিরে যান"
                aria-label="হোম পেজে ফিরে যান"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">হোমে ফিরুন</span>
              </Link>
              <div className="h-5 w-px bg-slate-200 hidden sm:block shrink-0" />
              {pageTitle ? (
                <div className="min-w-0">
                  <h1 className="text-xs sm:text-base font-black text-slate-900 truncate max-w-[150px] xs:max-w-[200px] sm:max-w-[320px] md:max-w-none">
                    {pageTitle}
                  </h1>
                  {pageSubtitle && (
                    <p className="text-[10px] text-slate-500 hidden sm:block truncate">
                      {pageSubtitle}
                    </p>
                  )}
                </div>
              ) : (
                <BrandHomeLink variant="compact" />
              )}
            </div>
          ) : (
            <BrandHomeLink variant="header" />
          )}
        </div>

        {/* Center / Desktop Navigation Links (Visible on >= 1180px) */}
        <nav
          aria-label="প্রধান লিঙ্কসমূহ"
          className="hidden xl:flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60"
        >
          {MAIN_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 touch-manipulation ${
                  isActive
                    ? item.accent.activeBg
                    : `hover:bg-white ${item.accent.hoverText} text-slate-700`
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && !isActive && (
                  <span className="text-[9px] px-1 py-0.2 rounded-full font-black bg-rose-500 text-white leading-none">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Compact Custom Actions, Install Button & Mobile Hamburger Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {rightActions}
          <InstallAppButton variant="compact" />

          {/* Mobile & Tablet Hamburger Button */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="প্রধান নেভিগেশন মেনু খুলুন"
            aria-expanded={drawerOpen}
            className="p-2 sm:p-2.5 rounded-xl text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/70 transition-all touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95 cursor-pointer"
            title="সকল মডিউল ও মেনু দেখুন"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>

    {/* ========================================================
        📱 SLIDE-OVER MOBILE & TABLET NAVIGATION DRAWER
        Rendered via React Portal directly into document.body to
        prevent CSS backdrop-filter containing-block clipping.
        ======================================================== */}
    {mounted && drawerOpen && typeof document !== "undefined" && createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-label="প্রধান নেভিগেশন মেনু"
        className="fixed inset-0 z-50 flex justify-end bg-slate-950/45 backdrop-blur-xs animate-fade-in"
        onClick={(e) => {
          if (e.target === e.currentTarget) setDrawerOpen(false);
        }}
      >
          <div className="w-full max-w-sm sm:max-w-md h-full bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-slide-left overflow-hidden">
            {/* Drawer Top Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-sky-50/70 to-emerald-50/70">
              <div className="flex items-center gap-2">
                <span className="text-2xl" aria-hidden="true">🎈</span>
                <div>
                  <span className="text-sm font-black text-slate-900 block">
                    প্রাথমিক পাঠশালা
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700">
                    NCTB ২০২৬ ডিজিটাল কারিকুলাম
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="মেনু বন্ধ করুন"
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-white/80 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer touch-manipulation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Home Jump */}
            <div className="p-3 border-b border-slate-100 bg-slate-50/60">
              <Link
                href="/"
                onClick={() => setDrawerOpen(false)}
                className={`flex items-center justify-between p-3 min-h-[48px] rounded-xl transition-all touch-manipulation ${
                  isHomePage
                    ? "bg-emerald-600 text-white font-bold shadow-xs"
                    : "hover:bg-white text-slate-700 font-semibold"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-lg bg-white/20 text-sm">🏠</span>
                  <span className="text-sm">হোম পেজে যান</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </Link>
            </div>

            {/* Drawer Navigation List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* Student Corner Category */}
              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5 px-2">
                  <span>🎈</span>
                  <span>শিক্ষার্থী কর্নার (Student Corner)</span>
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {MAIN_NAV_ITEMS.filter((i) => i.category === "student").map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDrawerOpen(false)}
                        className={`p-3 min-h-[52px] rounded-2xl flex items-center justify-between transition-all border touch-manipulation cursor-pointer ${
                          isActive
                            ? `${item.accent.pillBg} border-slate-300 font-black shadow-xs`
                            : "bg-slate-50/70 hover:bg-slate-100 border-slate-200/80 font-semibold text-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-2xl p-1.5 rounded-xl bg-white shadow-2xs border border-slate-100 shrink-0">
                            {item.icon}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm truncate">{item.label}</span>
                              {item.badge && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-rose-500 text-white">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 font-normal truncate mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Teacher Professional Studio Category */}
              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5 px-2">
                  <span>💼</span>
                  <span>শিক্ষক স্টুডিও (Teacher Studio)</span>
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {MAIN_NAV_ITEMS.filter((i) => i.category === "teacher").map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDrawerOpen(false)}
                        className={`p-3 min-h-[52px] rounded-2xl flex items-center justify-between transition-all border touch-manipulation cursor-pointer ${
                          isActive
                            ? `${item.accent.pillBg} border-slate-300 font-black shadow-xs`
                            : "bg-slate-50/70 hover:bg-slate-100 border-slate-200/80 font-semibold text-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-2xl p-1.5 rounded-xl bg-white shadow-2xs border border-slate-100 shrink-0">
                            {item.icon}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm truncate">{item.label}</span>
                              {item.badge && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-rose-500 text-white">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 font-normal truncate mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Drawer Bottom Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <InstallAppButton variant="hero" className="w-full justify-center min-h-[44px] py-2.5 text-sm" />
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-full sm:w-auto px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer touch-manipulation flex items-center justify-center"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
