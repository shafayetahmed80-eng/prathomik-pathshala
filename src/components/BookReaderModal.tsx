"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  Download,
  Maximize2,
  Minimize2,
  Volume2,
  ExternalLink,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
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

type DocLoadState =
  | { key: string; status: "loading"; note?: string }
  | { key: string; status: "ready"; doc: PDFDocumentProxy; numPages: number }
  | { key: string; status: "error"; errorCode: string | null };

const MIN_ZOOM = 0.75;
const MAX_ZOOM = 2.25;
const ZOOM_STEP = 0.25;

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
  const [docState, setDocState] = useState<DocLoadState | null>(null);
  const [pageSelection, setPageSelection] = useState<{ key: string; page: number }>({
    key: "",
    page: 1,
  });
  const [pageInputDraft, setPageInputDraft] = useState<{ key: string; value: string } | null>(
    null
  );
  const [zoom, setZoom] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const [renderedPageKey, setRenderedPageKey] = useState("");
  const [isPageRendering, setIsPageRendering] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const pdfUrl = `/api/pdf?class=${encodeURIComponent(classId)}&type=${encodeURIComponent(type)}&file=${encodeURIComponent(bookName)}`;
  const downloadUrl = `${pdfUrl}&download=1`;
  const requestKey = `${pdfUrl}::${retryToken}`;

  const activeDocState = docState?.key === requestKey ? docState : null;
  const hasError = activeDocState?.status === "error";
  const errorCode = activeDocState?.status === "error" ? activeDocState.errorCode : null;
  const isDocReady = activeDocState?.status === "ready";
  const activeDoc = activeDocState?.status === "ready" ? activeDocState.doc : null;
  const numPages = activeDocState?.status === "ready" ? activeDocState.numPages : 0;

  const rawPage = pageSelection.key === requestKey ? pageSelection.page : 1;
  const currentPage =
    numPages > 0 ? Math.min(Math.max(1, rawPage), numPages) : Math.max(1, rawPage);

  const activeInputValue =
    pageInputDraft?.key === `${requestKey}::${currentPage}`
      ? pageInputDraft.value
      : String(currentPage);

  const currentRenderId = `${requestKey}::${currentPage}::${zoom}::${containerWidth}`;
  const isInitialLoading = !hasError && (!isDocReady || renderedPageKey === "");

  const goToPage = (target: number) => {
    if (numPages <= 0) return;
    const clamped = Math.min(Math.max(1, target), numPages);
    setPageSelection({ key: requestKey, page: clamped });
    setPageInputDraft(null);
    if (viewportRef.current) {
      viewportRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Load PDF document via PDF.js (local collection, direct R2 CORS, or automatic Range proxy)
  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    const controller = new AbortController();
    let loadedDoc: PDFDocumentProxy | null = null;
    let activeLoadingTask: { destroy: () => Promise<void> } | null = null;

    document.body.style.overflow = "hidden";

    const loadBook = async () => {
      try {
        const headRes = await fetch(pdfUrl, {
          method: "HEAD",
          signal: controller.signal,
        });

        if (cancelled) return;

        if (!headRes.ok) {
          setDocState({
            key: requestKey,
            status: "error",
            errorCode: headRes.headers.get("x-pdf-error-code") || "UNAVAILABLE",
          });
          return;
        }

        const rawLen = Number(
          headRes.headers.get("x-pdf-size") || headRes.headers.get("content-length") || "0"
        );
        const knownLength = Number.isFinite(rawLen) && rawLen > 0 ? rawLen : undefined;
        const pdfSource = headRes.headers.get("x-pdf-source");

        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
        if (cancelled) return;

        pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

        const openDocument = async (sourceUrl: string) => {
          const loadingTask = pdfjs.getDocument({
            url: sourceUrl,
            cMapUrl: "/pdfjs/cmaps/",
            cMapPacked: true,
            standardFontDataUrl: "/pdfjs/standard_fonts/",
            rangeChunkSize: 262144,
            disableAutoFetch: true,
            ...(knownLength ? { length: knownLength, disableStream: true } : {}),
          });
          activeLoadingTask = loadingTask;
          return loadingTask.promise;
        };

        let doc: PDFDocumentProxy;
        try {
          doc = await openDocument(pdfUrl);
        } catch (directErr) {
          if (cancelled) return;
          if (pdfSource === "cloudflare-r2") {
            setDocState({
              key: requestKey,
              status: "loading",
              note: "মোবাইল রিডার সংযোগ প্রস্তুত হচ্ছে...",
            });
            doc = await openDocument(`${pdfUrl}&proxy=1`);
          } else {
            throw directErr;
          }
        }

        if (cancelled) {
          doc.destroy().catch(() => {});
          return;
        }

        loadedDoc = doc;
        setDocState({
          key: requestKey,
          status: "ready",
          doc,
          numPages: doc.numPages,
        });
      } catch (err: unknown) {
        if (cancelled) return;
        if (err instanceof DOMException && err.name === "AbortError") return;
        setDocState({
          key: requestKey,
          status: "error",
          errorCode: "LOAD_FAILED",
        });
      }
    };

    loadBook();

    return () => {
      cancelled = true;
      controller.abort();
      document.body.style.overflow = "";
      stopSpeech();
      activeLoadingTask?.destroy().catch(() => {});
      loadedDoc?.destroy().catch(() => {});
    };
  }, [isOpen, pdfUrl, requestKey]);

  // Measure viewport width cleanly (adapts to mobile rotation & fullscreen toggle)
  useEffect(() => {
    if (!isOpen) return;
    const el = viewportRef.current;
    if (!el) return;

    const updateWidth = () => {
      setContainerWidth(el.clientWidth);
    };
    updateWidth();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width && width > 0) {
        setContainerWidth(Math.floor(width));
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [isOpen, isFullscreen]);

  // Keyboard shortcuts: Escape to close, ArrowLeft/Right for pages
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";

      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (isInput) return;

      if (e.key === "ArrowRight" || e.key === "PageDown") {
        if (numPages > 0 && currentPage < numPages) {
          e.preventDefault();
          setPageSelection({ key: requestKey, page: currentPage + 1 });
          setPageInputDraft(null);
        }
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        if (currentPage > 1) {
          e.preventDefault();
          setPageSelection({ key: requestKey, page: currentPage - 1 });
          setPageInputDraft(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, numPages, currentPage, requestKey]);

  // Render active PDF page into HiDPI canvas
  useEffect(() => {
    if (!isOpen || !activeDoc || containerWidth <= 0) return;

    let renderCancelled = false;
    const startTimer = setTimeout(() => {
      if (!renderCancelled) setIsPageRendering(true);
    }, 120);

    const renderPage = async () => {
      try {
        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch {}
          renderTaskRef.current = null;
        }

        const page = await activeDoc.getPage(currentPage);
        if (renderCancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        const baseViewport = page.getViewport({ scale: 1 });
        const horizontalPadding = window.innerWidth < 640 ? 16 : 48;
        const availWidth = Math.max(260, containerWidth - horizontalPadding);
        const fitScale = availWidth / baseViewport.width;
        const cssScale = fitScale * zoom;
        const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
        const renderViewport = page.getViewport({ scale: cssScale * dpr });

        canvas.width = Math.max(1, Math.floor(renderViewport.width));
        canvas.height = Math.max(1, Math.floor(renderViewport.height));
        canvas.style.width = `${Math.floor(baseViewport.width * cssScale)}px`;
        canvas.style.height = `${Math.floor(baseViewport.height * cssScale)}px`;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const task = page.render({
          canvasContext: ctx,
          viewport: renderViewport,
        });
        renderTaskRef.current = task;
        await task.promise;

        if (renderCancelled) return;
        clearTimeout(startTimer);
        setIsPageRendering(false);
        setRenderedPageKey(currentRenderId);

        // Silently warm next page in background for zero-lag page flipping
        if (currentPage < activeDoc.numPages) {
          activeDoc.getPage(currentPage + 1).catch(() => {});
        }
      } catch (err: unknown) {
        clearTimeout(startTimer);
        if (renderCancelled) return;
        const errName = (err as { name?: string } | null)?.name;
        if (errName === "RenderingCancelledException") return;
        setIsPageRendering(false);
      }
    };

    renderPage();

    return () => {
      renderCancelled = true;
      clearTimeout(startTimer);
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {}
        renderTaskRef.current = null;
      }
    };
  }, [isOpen, activeDoc, currentPage, zoom, containerWidth, currentRenderId]);

  if (!isOpen) return null;

  const handleSpeak = () => {
    const text = `${classNameTitle}-এর ${bookName}। বিষয়: ${subject}।`;
    safeSpeak(text, { lang: "bn-BD", rate: 0.9 });
  };

  const commitPageInput = () => {
    const parsed = parseInt(activeInputValue, 10);
    if (!Number.isNaN(parsed) && numPages > 0) {
      goToPage(parsed);
    } else {
      setPageInputDraft(null);
    }
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
          className="min-h-14 sm:min-h-16 py-2 px-3 sm:px-6 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200 shrink-0 gap-2 shadow-xs transition-colors"
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
                  className="font-black text-xs sm:text-base lg:text-lg text-slate-900 truncate max-w-[125px] sm:max-w-md"
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
              className="p-2 rounded-xl text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 border border-slate-200/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              title="নতুন ট্যাবে মূল পিডিএফ খুলুন"
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

        {/* PDF Canvas Viewport */}
        <div
          ref={viewportRef}
          onTouchStart={(e) => {
            if (e.touches.length === 1 && zoom <= 1.05) {
              touchStartRef.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
              };
            } else {
              touchStartRef.current = null;
            }
          }}
          onTouchEnd={(e) => {
            const start = touchStartRef.current;
            touchStartRef.current = null;
            if (!start || !isDocReady || e.changedTouches.length !== 1 || zoom > 1.05) return;
            const dx = e.changedTouches[0].clientX - start.x;
            const dy = e.changedTouches[0].clientY - start.y;
            if (Math.abs(dx) > 65 && Math.abs(dy) < 45) {
              if (dx < 0 && currentPage < numPages) {
                goToPage(currentPage + 1);
              } else if (dx > 0 && currentPage > 1) {
                goToPage(currentPage - 1);
              }
            }
          }}
          className="relative flex-1 bg-slate-200/80 overflow-auto p-2 sm:p-6 flex flex-col items-center touch-pan-x touch-pan-y"
        >
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
                    : "নেটওয়ার্ক সংযোগ বা ফাইল লোডে সাময়িক সমস্যা হয়েছে। আবার চেষ্টা করুন অথবা নতুন ট্যাবে মূল পিডিএফ খুলুন।"}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setRenderedPageKey("");
                    setRetryToken((t) => t + 1);
                  }}
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
              {(isInitialLoading || isPageRendering) && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`flex flex-col items-center justify-center gap-3 ${
                    isInitialLoading
                      ? "absolute inset-0 z-10 bg-slate-50"
                      : "fixed bottom-20 right-6 z-20 bg-white/95 px-4 py-2 rounded-2xl shadow-lg border border-slate-200 flex-row"
                  }`}
                >
                  <Loader2
                    className={`${isInitialLoading ? "w-10 h-10" : "w-4 h-4"} text-emerald-600 animate-spin`}
                    aria-hidden="true"
                  />
                  <p className="text-xs sm:text-sm font-semibold text-slate-600">
                    {activeDocState?.status === "loading" && activeDocState.note
                      ? activeDocState.note
                      : isInitialLoading
                        ? "বইয়ের পাতা প্রস্তুত হচ্ছে, একটু অপেক্ষা করুন..."
                        : `পৃষ্ঠা ${currentPage} লোড হচ্ছে...`}
                  </p>
                </div>
              )}

              <div className="my-auto shadow-xl rounded-lg overflow-hidden bg-white border border-slate-300/80">
                <canvas
                  ref={canvasRef}
                  aria-label={`${bookName} - পৃষ্ঠা ${currentPage}`}
                  className="block"
                />
              </div>
            </>
          )}
        </div>

        {/* Bottom Page & Zoom Navigation Bar */}
        {!hasError && (
          <footer
            data-paper-inner="true"
            className="px-3 sm:px-6 py-2.5 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs"
          >
            {/* Prev / Page Input / Next */}
            <div className="flex items-center gap-1.5 sm:gap-2 mx-auto sm:mx-0">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={!isDocReady || currentPage <= 1}
                className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-40 disabled:pointer-events-none text-slate-800 font-bold border border-slate-200/80 transition-colors min-h-[40px]"
                aria-label="আগের পাতা"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>আগের পাতা</span>
              </button>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  commitPageInput();
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold min-h-[40px]"
              >
                <span className="hidden xs:inline">পৃষ্ঠা</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={numPages || 1}
                  disabled={!isDocReady}
                  value={activeInputValue}
                  onChange={(e) =>
                    setPageInputDraft({
                      key: `${requestKey}::${currentPage}`,
                      value: e.target.value,
                    })
                  }
                  onBlur={commitPageInput}
                  aria-label="পৃষ্ঠা নম্বর"
                  className="w-12 text-center py-1 rounded-lg border border-slate-300 bg-white text-slate-900 font-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-slate-500">/ {numPages || "…"}</span>
              </form>

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={!isDocReady || currentPage >= numPages}
                className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:pointer-events-none text-white font-bold shadow-xs transition-colors min-h-[40px]"
                aria-label="পরের পাতা"
              >
                <span>পরের পাতা</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 mx-auto sm:mx-0">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(MIN_ZOOM, Number((z - ZOOM_STEP).toFixed(2))))}
                disabled={!isDocReady || zoom <= MIN_ZOOM}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none text-slate-700 border border-slate-200/80 min-w-[36px] min-h-[36px] flex items-center justify-center"
                title="ছোট করুন (Zoom Out)"
                aria-label="জুম কমান"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setZoom(1)}
                disabled={!isDocReady || zoom === 1}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-60 text-slate-800 font-bold border border-slate-200/80 min-h-[36px] inline-flex items-center gap-1"
                title="স্বাভাবিক আকার (১০০%)"
              >
                <RotateCcw className="w-3 h-3 text-slate-500" />
                <span>{Math.round(zoom * 100)}%</span>
              </button>

              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(MAX_ZOOM, Number((z + ZOOM_STEP).toFixed(2))))}
                disabled={!isDocReady || zoom >= MAX_ZOOM}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none text-slate-700 border border-slate-200/80 min-w-[36px] min-h-[36px] flex items-center justify-center"
                title="বড় করুন (Zoom In)"
                aria-label="জুম বাড়ান"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
