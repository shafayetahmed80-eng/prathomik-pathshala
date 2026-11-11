"use client";

import { useEffect, useState } from "react";
import { X, Download, Maximize2, Minimize2, Volume2, ExternalLink, Loader2 } from "lucide-react";
import { safeSpeak, stopSpeech } from "@/utils/mobileSpeech";

interface BookReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookName: string;
  classNameTitle: string;
  classId: string;
  type: "textbook" | "teachers_guide";
  subject: string;
  icon: string;
}

export default function BookReaderModal({
  isOpen,
  onClose,
  bookName,
  classNameTitle,
  classId,
  type,
  subject,
  icon,
}: BookReaderModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [retryToken, setRetryToken] = useState(0);
  const [probeState, setProbeState] = useState<{
    key: string;
    status: "loaded" | "error";
    errorCode: string | null;
  } | null>(null);

  const pdfUrl = `/api/pdf?class=${encodeURIComponent(classId)}&type=${encodeURIComponent(type)}&file=${encodeURIComponent(bookName)}`;
  const downloadUrl = `${pdfUrl}&download=1`;
  const requestKey = `${pdfUrl}::${retryToken}`;

  const hasError = probeState?.key === requestKey && probeState.status === "error";
  const errorCode = hasError ? probeState.errorCode : null;
  const isLoading =
    !hasError && !(probeState?.key === requestKey && probeState.status === "loaded");

  useEffect(() => {
    if (!isOpen) return;

    const controller = new AbortController();
    document.body.style.overflow = "hidden";

    fetch(pdfUrl, { method: "HEAD", signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          setProbeState({
            key: requestKey,
            status: "error",
            errorCode: res.headers.get("x-pdf-error-code") || "UNAVAILABLE",
          });
        }
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
      });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      controller.abort();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      stopSpeech();
    };
  }, [isOpen, pdfUrl, requestKey, onClose]);

  if (!isOpen) return null;

  const handleSpeak = () => {
    const text = `${classNameTitle}-এর ${bookName}। বিষয়: ${subject}।`;
    safeSpeak(text, { lang: "bn-BD", rate: 0.9 });
  };

  const isStorageMissing =
    errorCode === "PDF_STORAGE_NOT_CONFIGURED" || errorCode === "CDN_FILE_MISSING";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-1 sm:p-4 animate-fade-in"
    >
      <div
        data-paper-card="true"
        className={`bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 transition-all ${
          isFullscreen
            ? "w-full h-full rounded-none"
            : "w-full max-w-6xl h-[95vh] sm:h-[92vh]"
        }`}
      >
        {/* Header Bar - Eye-Friendly Soft Light Theme */}
        <header
          data-paper-inner="true"
          className="min-h-16 py-2 px-3 sm:px-6 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200 shrink-0 gap-2 shadow-xs transition-colors"
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span
              aria-hidden="true"
              className="text-xl sm:text-2xl p-1.5 sm:p-2 bg-slate-100 rounded-xl shrink-0 border border-slate-200/60"
            >
              {icon}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h3
                  id="reader-modal-title"
                  className="font-black text-xs sm:text-base lg:text-lg text-slate-900 truncate max-w-[110px] sm:max-w-md"
                >
                  {bookName}
                </h3>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                  {classNameTitle}
                </span>
                <span className="text-[11px] sm:text-xs px-2 py-0.5 rounded-full font-bold bg-sky-100 text-sky-800 border border-sky-200 hidden md:inline-block shrink-0">
                  {subject}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={handleSpeak}
              className="p-2 rounded-xl text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 border border-slate-200/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              title="বইয়ের বিবরণ পড়ে শোনাও"
              aria-label="বইয়ের বিবরণ পড়ে শোনাও"
            >
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </button>

            <a
              href={downloadUrl}
              download={`${bookName}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 border border-slate-200/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              title="পিডিএফ ডাউনলোড করুন"
              aria-label="পিডিএফ ফাইল ডাউনলোড করুন"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </a>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 border border-slate-200/80 transition-colors hidden sm:inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              title="নতুন ট্যাবে খুলুন"
              aria-label="নতুন ব্রাউজার ট্যাবে পিডিএফ খুলুন"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 border border-slate-200/80 transition-colors hidden sm:inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              title={isFullscreen ? "ছোট করুন" : "ফুলস্ক্রিন করুন"}
              aria-label={
                isFullscreen ? "উইন্ডো স্বাভাবিক আকারে ফিরিয়ে আনুন" : "ফুলস্ক্রিন মোডে দেখুন"
              }
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              ) : (
                <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-xl bg-rose-100 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200 transition-colors ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 touch-manipulation min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0"
              title="রিডার বন্ধ করুন"
              aria-label="রিডার বন্ধ করুন"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Mobile Quick Action Banner */}
        {!hasError && (
          <div className="bg-amber-50 border-b border-amber-200 px-3 py-2 flex items-center justify-between gap-2 text-xs text-amber-900 sm:hidden shrink-0">
            <span className="truncate">📱 মোবাইলে পড়তে সমস্যা হলে সরাসরি খুলুন:</span>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shrink-0 shadow-xs flex items-center gap-1 min-h-[36px] touch-manipulation"
            >
              <span>পিডিএফ খুলুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* PDF Reader Container */}
        <div className="relative flex-1 bg-slate-100 overflow-hidden">
          {hasError ? (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50 gap-4 p-6 text-center animate-fade-in">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl shadow-xs">
                {isStorageMissing ? "☁️" : "📖"}
              </div>
              <div className="space-y-1.5 max-w-md">
                <h4 className="font-extrabold text-base text-slate-900">
                  {isStorageMissing
                    ? "ডিজিটাল বইটি ক্লাউড লাইব্রেরিতে যুক্ত হচ্ছে"
                    : "বইটি লোড করতে সমস্যা হয়েছে"}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isStorageMissing
                    ? "বড় সাইজের সরকারি পিডিএফ বইগুলো দ্রুত পড়ার জন্য ক্লাউড CDN-এ সংযুক্ত করা হচ্ছে। আপনি কিছুক্ষণ পর আবার চেষ্টা করতে পারেন অথবা সরকারি এনসিটিবি ওয়েবসাইট থেকে পড়তে পারেন।"
                    : "ব্রাউজার সিকিউরিটি বা নেটওয়ার্ক সংযোগের কারণে প্রিভিউ আটকে থাকতে পারে। অনুগ্রহ করে আবার চেষ্টা করুন অথবা নতুন ট্যাবে খুলুন।"}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setRetryToken((t) => t + 1)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  আবার চেষ্টা করুন
                </button>
                {isStorageMissing ? (
                  <a
                    href="https://nctb.portal.gov.bd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
                  >
                    <span>এনসিটিবি ওয়েবসাইট</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
                  >
                    নতুন ট্যাবে খুলুন
                  </a>
                )}
              </div>
            </div>
          ) : (
            <>
              {isLoading && (
                <div
                  role="status"
                  aria-live="polite"
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50 gap-3"
                >
                  <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" aria-hidden="true" />
                  <p className="text-sm font-semibold text-slate-600">
                    বইটি প্রস্তুত হচ্ছে, একটু অপেক্ষা করুন...
                  </p>
                </div>
              )}

              <iframe
                key={requestKey}
                src={pdfUrl}
                onLoad={() =>
                  setProbeState({ key: requestKey, status: "loaded", errorCode: null })
                }
                className="w-full h-full border-0 touch-auto"
                title={`${classNameTitle} - ${bookName}`}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
