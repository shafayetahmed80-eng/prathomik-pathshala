"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

interface BrandHomeLinkProps {
  /** Visual layout variant for primary header, compact subpage header, or footer. */
  variant?: "header" | "compact" | "footer";
  /** Optional extra utility classes merged onto the link element. */
  className?: string;
}

const VARIANT_CLASSES: Record<NonNullable<BrandHomeLinkProps["variant"]>, string> = {
  header:
    "group flex items-center gap-2 sm:gap-3 min-w-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 transition-transform active:scale-[0.98] cursor-pointer",
  compact:
    "group items-center gap-2 px-2.5 py-1 rounded-xl hover:bg-slate-100/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all active:scale-95 shrink-0",
  footer:
    "group flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 transition-transform active:scale-[0.98]",
};

/**
 * Clickable brand emblem that navigates to `/` with a clean full page refresh,
 * resetting any active studio tabs, modals, or scroll state even from the homepage.
 */
export default function BrandHomeLink({
  variant = "header",
  className = "",
}: BrandHomeLinkProps) {
  const handleHomeRefresh = (event: MouseEvent<HTMLAnchorElement>) => {
    // Preserve native new-tab/window gestures (Ctrl/Cmd/Shift/Alt/middle-click).
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    if (
      window.location.pathname === "/" &&
      !window.location.search &&
      !window.location.hash
    ) {
      window.location.reload();
      return;
    }

    const homeUrl = new URL("/", window.location.origin);
    window.location.assign(homeUrl.toString());
  };

  return (
    <Link
      href="/"
      onClick={handleHomeRefresh}
      aria-label="প্রাথমিক পাঠশালা — হোম পেজ রিফ্রেশ করুন"
      title="হোম পেজে ফিরে যান ও রিফ্রেশ করুন"
      className={`${VARIANT_CLASSES[variant]} ${className}`.trim()}
    >
      {variant === "footer" && (
        <>
          <span
            className="text-2xl transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6"
            aria-hidden="true"
          >
            🎈
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                প্রাথমিক পাঠশালা
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                NCTB ২০২৬
              </span>
            </div>
            <p className="text-xs text-slate-500">
              বাংলাদেশের প্রাথমিক শিক্ষার আধুনিক প্ল্যাটফর্ম
            </p>
          </div>
        </>
      )}

      {variant === "compact" && (
        <>
          <span
            aria-hidden="true"
            className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white text-sm shadow-xs shadow-amber-500/20 transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-3"
          >
            🎈
          </span>
          <span className="text-sm font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
            প্রাথমিক পাঠশালা
          </span>
        </>
      )}

      {variant === "header" && (
        <>
          <div
            aria-hidden="true"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white text-lg sm:text-2xl shadow-md shadow-amber-500/20 shrink-0 transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-3"
          >
            🎈
          </div>
          <div className="min-w-0">
            <span className="text-lg sm:text-2xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent truncate block">
              প্রাথমিক পাঠশালা
            </span>
            <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 group-hover:bg-emerald-200/80 transition-colors">
              স্মার্ট এডুকেশন
            </span>
          </div>
        </>
      )}
    </Link>
  );
}
