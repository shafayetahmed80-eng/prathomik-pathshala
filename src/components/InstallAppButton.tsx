"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, Download, PlusSquare, Share, Smartphone, X } from "lucide-react";
import { playPopSound, playSuccessChime } from "@/utils/bornomalaAudio";
import { promptNativePwaInstall, usePwaInstall } from "@/utils/pwaInstall";

interface InstallAppButtonProps {
  /** Visual placement style for header, hero pill, footer link, or subpage header. */
  variant?: "header" | "hero" | "footer" | "compact";
  /** Optional extra classes merged onto the button element. */
  className?: string;
}

/**
 * Cross-platform PWA App Install button modeled after Connect Tutors BD,
 * triggering native browser install prompts on Chromium/Android and displaying
 * clear Safari Share-sheet instructions on iPhone/iPad.
 */
export default function InstallAppButton({
  variant = "header",
  className = "",
}: InstallAppButtonProps) {
  const { isHydrated, isStandalone, canNativePrompt, isIOS } = usePwaInstall();
  const [guideOpen, setGuideOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!guideOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setGuideOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [guideOpen]);

  // Do not show install triggers before hydration or when already running inside installed PWA.
  if (!isHydrated || isStandalone) {
    return null;
  }

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => setToastMessage(null), 4000);
  };

  const handleInstallClick = async () => {
    playPopSound();

    if (canNativePrompt) {
      const outcome = await promptNativePwaInstall();
      if (outcome === "accepted") {
        playSuccessChime();
        showToast("🎉 প্রাথমিক পাঠশালা অ্যাপটি সফলভাবে ইনস্টল হয়েছে!");
      }
      return;
    }

    // Show tailored guide for iPhone/iPad Safari or browsers without beforeinstallprompt.
    setGuideOpen(true);
  };

  const buttonNode = (() => {
    if (variant === "footer") {
      return (
        <button
          type="button"
          onClick={handleInstallClick}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all hover:scale-102 active:scale-95 cursor-pointer ${className}`.trim()}
          title="মোবাইল বা ডেস্কটপে অ্যাপ হিসেবে ইনস্টল করুন"
        >
          <Download className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>অ্যাপ ইনস্টল করুন</span>
        </button>
      );
    }

    if (variant === "hero") {
      return (
        <button
          type="button"
          onClick={handleInstallClick}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer ${className}`.trim()}
          title="মোবাইল বা কম্পিউটারে অ্যাপ হিসেবে ইনস্টল করুন"
        >
          <Download className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>অ্যাপ হিসেবে ইনস্টল করুন</span>
        </button>
      );
    }

    if (variant === "compact") {
      return (
        <button
          type="button"
          onClick={handleInstallClick}
          aria-label="অ্যাপ ইনস্টল করুন"
          title="অ্যাপ হিসেবে ইনস্টল করুন"
          className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer shrink-0 ${className}`.trim()}
        >
          <Download className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">অ্যাপ ইনস্টল</span>
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={handleInstallClick}
        aria-label="অ্যাপ ইনস্টল করুন"
        title="অ্যাপ হিসেবে ইনস্টল করুন"
        className={`inline-flex items-center justify-center gap-1.5 h-9 sm:h-auto w-9 sm:w-auto sm:px-3 sm:py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs shadow-emerald-600/20 transition-all hover:scale-[1.03] active:scale-95 touch-manipulation cursor-pointer shrink-0 ${className}`.trim()}
      >
        <Download className="w-4 h-4 sm:w-3.5 sm:h-3.5 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline">অ্যাপ ইনস্টল</span>
      </button>
    );
  })();

  return (
    <>
      {buttonNode}

      {toastMessage &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm font-bold shadow-2xl border border-emerald-500/40 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
            <span>{toastMessage}</span>
          </div>,
          document.body
        )}

      {guideOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pwa-install-guide-title"
            onClick={() => setGuideOpen(false)}
          >
            <div
              className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white text-xl shadow-sm shrink-0">
                    🎈
                  </div>
                  <div>
                    <h3
                      id="pwa-install-guide-title"
                      className="text-base font-black text-slate-900"
                    >
                      প্রাথমিক পাঠশালা অ্যাপ ইনস্টল
                    </h3>
                    <p className="text-xs text-slate-600">
                      {isIOS
                        ? "আইফোন / আইপ্যাডে (Safari) হোমস্ক্রিনে যুক্ত করুন"
                        : "আপনার ডিভাইসে শর্টকাট অ্যাপ হিসেবে সেভ করুন"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setGuideOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
                  aria-label="নির্দেশনা বন্ধ করুন"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 space-y-4 text-sm text-slate-700">
                {isIOS ? (
                  <ol className="space-y-3">
                    <li className="flex items-start gap-3 p-3 rounded-2xl bg-sky-50/70 border border-sky-100">
                      <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        ১
                      </span>
                      <div>
                        <p className="font-bold text-slate-900 flex items-center gap-1.5 flex-wrap">
                          <span>Safari ব্রাউজারের Share</span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white border border-sky-200 text-sky-700 text-xs">
                            <Share className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Share</span>
                          </span>
                          <span>আইকনে ট্যাপ করুন।</span>
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          (স্ক্রিনের নিচে মাঝখানে অথবা উপরে ডানদিকে পাবেন)
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        ২
                      </span>
                      <div>
                        <p className="font-bold text-slate-900 flex items-center gap-1.5 flex-wrap">
                          <span>তালিকা থেকে</span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white border border-emerald-200 text-emerald-700 text-xs">
                            <PlusSquare className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Add to Home Screen</span>
                          </span>
                          <span>নির্বাচন করুন।</span>
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
                      <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        ৩
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">
                          উপরে ডানে <span className="text-emerald-700">&ldquo;Add&rdquo;</span> চাপুন!
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          সাথে সাথে আইফোনের হোমস্ক্রিনে 🎈 প্রাথমিক পাঠশালা অ্যাপটি যুক্ত হয়ে যাবে।
                        </p>
                      </div>
                    </li>
                  </ol>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                      <Smartphone
                        className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div className="space-y-1.5 text-xs sm:text-sm">
                        <p className="font-bold text-slate-900">
                          অ্যাপ হিসেবে ইনস্টল করার সহজ নিয়ম:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-slate-600 text-xs leading-relaxed">
                          <li>
                            <strong>Android (Chrome):</strong> উপরের ডানদিকে{" "}
                            <span className="font-semibold text-slate-800">⋮ মেনু</span> →{" "}
                            <span className="font-semibold text-emerald-700">
                              &ldquo;Install app&rdquo;
                            </span>{" "}
                            বা{" "}
                            <span className="font-semibold text-emerald-700">
                              &ldquo;Add to Home screen&rdquo;
                            </span>{" "}
                            ট্যাপ করুন।
                          </li>
                          <li>
                            <strong>iPhone / iPad (Safari):</strong>{" "}
                            <span className="font-semibold text-sky-700">Share (⎋)</span> →{" "}
                            <span className="font-semibold text-emerald-700">
                              &ldquo;Add to Home Screen&rdquo;
                            </span>{" "}
                            চাপুন।
                          </li>
                          <li>
                            <strong>কম্পিউটার (Chrome / Edge):</strong> অ্যাড্রেস বারের ডানদিকের{" "}
                            <span className="font-semibold text-emerald-700">Install (⊕)</span>{" "}
                            আইকনে ক্লিক করুন (সাধারণ উইন্ডোতে খুলুন, Incognito নয়)।
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-3.5 border-t border-slate-200 bg-slate-50 flex justify-end">
                <button
                  type="button"
                  onClick={() => setGuideOpen(false)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  বুঝেছি
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
