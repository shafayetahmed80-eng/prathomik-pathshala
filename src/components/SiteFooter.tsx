"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import confetti from "canvas-confetti";
import { 
  Check, 
  X, 
  CheckCircle2, 
  ChevronDown,
  Heart
} from "lucide-react";
import { playSuccessChime, playPopSound } from "@/utils/bornomalaAudio";

export interface FontOption {
  id: string;
  name: string;
  englishName: string;
  cssFamily: string;
  description: string;
  badge: string;
}

export const AVAILABLE_FONTS: FontOption[] = [
  {
    id: "hind-siliguri",
    name: "হিন্দ শিলিগুড়ি",
    englishName: "Hind Siliguri",
    cssFamily: "'Hind Siliguri', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    description: "আধুনিক, পরিচ্ছন্ন ও ডিজিটাল স্ক্রিনে সুস্পষ্ট",
    badge: "ডিফল্ট",
  },
  {
    id: "kalpurush",
    name: "কালপুরুষ",
    englishName: "Kalpurush",
    cssFamily: "'Kalpurush', 'SolaimanLipi', 'Hind Siliguri', sans-serif",
    description: "এনসিটিবি পাঠ্যবই ও পরীক্ষার প্রশ্নপত্রের মতো রূপ",
    badge: "পাঠ্যবই",
  },
  {
    id: "noto-sans",
    name: "নোটো স্যান্স বাংলা",
    englishName: "Noto Sans Bengali",
    cssFamily: "'Noto Sans Bengali', -apple-system, BlinkMacSystemFont, sans-serif",
    description: "গুগলের আন্তর্জাতিক মানের নিখুঁত ফন্ট",
    badge: "গুগল",
  },
  {
    id: "atma",
    name: "আত্মা (প্লেফুল)",
    englishName: "Atma",
    cssFamily: "'Atma', cursive, sans-serif",
    description: "প্রাক-প্রাথমিক শিশুদের উপযোগী মজার কার্টুন ফন্ট",
    badge: "বাচ্চাদের প্রিয়",
  },
  {
    id: "anek-bangla",
    name: "আনেক বাংলা",
    englishName: "Anek Bangla",
    cssFamily: "'Anek Bangla', sans-serif",
    description: "বোল্ড ও আধুনিক আকর্ষণীয় ডিসপ্লে ফন্ট",
    badge: "মডার্ন",
  },
  {
    id: "mina",
    name: "মীনা",
    englishName: "Mina",
    cssFamily: "'Mina', sans-serif",
    description: "সহজ পাঠযোগ্য একাডেমিক প্রাতিষ্ঠানিক ফন্ট",
    badge: "একাডেমিক",
  },
  {
    id: "noto-serif",
    name: "নোটো সেরিফ বাংলা",
    englishName: "Noto Serif Bengali",
    cssFamily: "'Noto Serif Bengali', serif",
    description: "ঐতিহ্যবাহী সাহিত্যিক ভাবগাম্ভীর্যপূর্ণ সেরিফ ফন্ট",
    badge: "সাহিত্যিক",
  },
];

export interface FontSizeOption {
  id: string;
  name: string;
  scale: string;
  label: string;
}

export const AVAILABLE_FONT_SIZES: FontSizeOption[] = [
  { id: "normal", name: "স্বাভাবিক", scale: "100%", label: "A (১০০%)" },
  { id: "medium", name: "মাঝারি", scale: "110%", label: "A+ (১১০%)" },
  { id: "large", name: "বড়", scale: "125%", label: "A++ (১২৫%)" },
];

const subscribeFont = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("font-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("font-change", callback);
    window.removeEventListener("storage", callback);
  };
};

const getFontSnapshot = () => {
  if (typeof window === "undefined") return "hind-siliguri";
  const saved = localStorage.getItem("pp_active_font_id");
  return saved && AVAILABLE_FONTS.some((f) => f.id === saved) ? saved : "hind-siliguri";
};

const getSizeSnapshot = () => {
  if (typeof window === "undefined") return "normal";
  const saved = localStorage.getItem("pp_active_font_size_id");
  return saved && AVAILABLE_FONT_SIZES.some((s) => s.id === saved) ? saved : "normal";
};

const subscribePaperMode = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("paper-mode-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("paper-mode-change", callback);
    window.removeEventListener("storage", callback);
  };
};

const getPaperModeSnapshot = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("pp_paper_mode") === "true";
};

const getPaperModeServerSnapshot = () => false;

export default function SiteFooter() {
  // Current active preferences via useSyncExternalStore
  const activeFontId = useSyncExternalStore(subscribeFont, getFontSnapshot, () => "hind-siliguri");
  const activeSizeId = useSyncExternalStore(subscribeFont, getSizeSnapshot, () => "normal");

  // Modal Open & Selection inside modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalFontId, setModalFontId] = useState<string>("hind-siliguri");
  const [modalSizeId, setModalSizeId] = useState<string>("normal");

  // Paper Theme Mode (সুপারিশ ক: হাইব্রিড ওয়ার্ম বেইজ থিম)
  const isPaperMode = useSyncExternalStore(subscribePaperMode, getPaperModeSnapshot, getPaperModeServerSnapshot);

  // Success Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Ensure root CSS variables match saved preferences on client mount (pure DOM effect, no setState)
  useEffect(() => {
    try {
      const savedFont = localStorage.getItem("pp_active_font_id");
      const savedSize = localStorage.getItem("pp_active_font_size_id");

      if (savedFont && AVAILABLE_FONTS.some((f) => f.id === savedFont)) {
        const fontObj = AVAILABLE_FONTS.find((f) => f.id === savedFont)!;
        document.documentElement.style.setProperty("--font-active", fontObj.cssFamily);
      }

      if (savedSize && AVAILABLE_FONT_SIZES.some((s) => s.id === savedSize)) {
        const sizeObj = AVAILABLE_FONT_SIZES.find((s) => s.id === savedSize)!;
        document.documentElement.style.setProperty("--font-scale", sizeObj.scale);
      }
    } catch {}
  }, []);

  // Toggle Paper Theme Mode
  const togglePaperMode = () => {
    const nextMode = !isPaperMode;
    playPopSound();

    if (nextMode) {
      document.documentElement.classList.add("paper-mode");
      try {
        localStorage.setItem("pp_paper_mode", "true");
      } catch {}
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.85 },
        colors: ["#905A04", "#ECE1CE", "#2F240E", "#D4AF37"]
      });
      setToastMessage("📜 ক্লাসিক কাগজের থিম চালু হয়েছে! (চোখের জন্য আরামদায়ক)");
    } else {
      document.documentElement.classList.remove("paper-mode");
      try {
        localStorage.setItem("pp_paper_mode", "false");
      } catch {}
      setToastMessage("ডিফল্ট থিমে ফিরে আসা হয়েছে।");
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("paper-mode-change"));
    }

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Open customization modal
  const handleOpenModal = () => {
    playPopSound();
    setModalFontId(activeFontId);
    setModalSizeId(activeSizeId);
    setIsModalOpen(true);
  };

  // Close modal without saving
  const handleCloseModal = () => {
    playPopSound();
    setIsModalOpen(false);
  };

  // Confirm and Apply Changes
  const handleConfirmChanges = () => {
    const fontObj = AVAILABLE_FONTS.find((f) => f.id === modalFontId) || AVAILABLE_FONTS[0];
    const sizeObj = AVAILABLE_FONT_SIZES.find((s) => s.id === modalSizeId) || AVAILABLE_FONT_SIZES[0];

    // Apply to CSS variables on root
    document.documentElement.style.setProperty("--font-active", fontObj.cssFamily);
    document.documentElement.style.setProperty("--font-scale", sizeObj.scale);

    try {
      localStorage.setItem("pp_active_font_id", fontObj.id);
      localStorage.setItem("pp_active_font_size_id", sizeObj.id);
    } catch {}

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("font-change"));
    }

    playSuccessChime();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#ec4899", "#3b82f6", "#10b981", "#f59e0b"]
    });

    setIsModalOpen(false);
    setToastMessage(`ফন্ট সফলভাবে '${fontObj.name}' (${sizeObj.label})-এ পরিবর্তিত হয়েছে!`);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const activeFont = AVAILABLE_FONTS.find((f) => f.id === activeFontId) || AVAILABLE_FONTS[0];
  const modalFont = AVAILABLE_FONTS.find((f) => f.id === modalFontId) || AVAILABLE_FONTS[0];
  const modalSize = AVAILABLE_FONT_SIZES.find((s) => s.id === modalSizeId) || AVAILABLE_FONT_SIZES[0];

  return (
    <>
      {/* 🦶 Minimalist, Elegant, Compact Footer */}
      <footer className="mt-auto border-t border-slate-200/90 bg-white/95 py-5 px-4 sm:px-6 lg:px-8 w-full print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Clean Brand Branding */}
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">🎈</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">প্রাথমিক পাঠশালা</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  NCTB ২০২৬
                </span>
              </div>
              <p className="text-xs text-slate-500">
                বাংলাদেশের প্রাথমিক শিক্ষার আধুনিক প্ল্যাটফর্ম
              </p>
            </div>
          </div>

          {/* Center: Sleek Font & Paper Mode Switch Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 transition-all">
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 text-slate-800 hover:text-blue-700 font-bold text-xs shadow-xs border border-slate-200/80 transition-all hover:scale-102"
              title="ফন্ট বা সাইজ পরিবর্তন করতে ক্লিক করুন"
            >
              <span className="w-5 h-5 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-black">
                Aa
              </span>
              <span>ফন্ট: <strong className="text-blue-600 font-black">{activeFont.name}</strong></span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* 📜 Classic Paper Mode Toggle (সুপারিশ ক: হাইব্রিড ওয়ার্ম বেইজ থিম) */}
            <button
              type="button"
              onClick={togglePaperMode}
              aria-pressed={isPaperMode}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-xs hover:scale-102 active:scale-98 ${
                isPaperMode
                  ? "bg-[#ECE1CE] text-[#2F240E] border-[#905A04]/40 ring-2 ring-[#905A04]/20 shadow-inner"
                  : "bg-white hover:bg-amber-50/50 text-slate-700 hover:text-amber-900 border-slate-200/80"
              }`}
              title={isPaperMode ? "সাধারণ থিমে ফিরে যেতে ক্লিক করুন" : "চোখের আরামদায়ক ক্লাসিক কাগজের থিম চালু করতে ক্লিক করুন"}
            >
              <span className="text-sm" aria-hidden="true">📜</span>
              <span className="hidden sm:inline">কাগজের থিম:</span>
              <span className="sm:hidden">কাগজ:</span>
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-black transition-all ${
                  isPaperMode
                    ? "bg-[#905A04] text-white shadow-xs"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-all ${
                    isPaperMode ? "bg-amber-300 animate-pulse" : "bg-slate-400"
                  }`}
                />
                <span>{isPaperMode ? "চালু" : "বন্ধ"}</span>
              </span>
            </button>
          </div>

          {/* Right: Copyright */}
          <div className="text-center md:text-right text-xs text-slate-500">
            <p className="flex items-center justify-center md:justify-end gap-1">
              <span>তৈরি করা হয়েছে</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" aria-hidden="true" />
              <span>শিশুদের হাসিমুখের জন্য</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              © ২০২৬ প্রাথমিক পাঠশালা • সর্বস্বত্ব সংরক্ষিত
            </p>
          </div>

        </div>
      </footer>

      {/* 🔔 Toast Notification on Save */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm font-bold shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 🎨 POPUP WINDOW (MODAL): Font & Size Customization with Live Preview */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="font-modal-title"
        >
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-base font-bold shadow-xs">
                  Aa
                </div>
                <div>
                  <h3 id="font-modal-title" className="text-base font-black text-slate-900">
                    বাংলা ফন্ট ও হরফের আকার নির্বাচন
                  </h3>
                  <p className="text-xs text-slate-500">
                    পছন্দমতো ফন্ট বেছে লাইভ প্রিভিউ দেখে কনফার্ম করুন
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors"
                aria-label="বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              
              {/* 1. Font Selection Grid */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  ১. বাংলা ফন্ট বেছে নিন:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {AVAILABLE_FONTS.map((font) => {
                    const isSelected = font.id === modalFontId;
                    return (
                      <button
                        key={font.id}
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setModalFontId(font.id);
                        }}
                        className={`p-2.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-1 ${
                          isSelected
                            ? "border-blue-600 bg-blue-50/50 shadow-xs ring-2 ring-blue-500/20"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            {font.badge}
                          </span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                          )}
                        </div>

                        <div>
                          <span 
                            className="text-base font-bold text-slate-900 block leading-tight truncate"
                            style={{ fontFamily: font.cssFamily }}
                          >
                            {font.name}
                          </span>
                          <span className="text-[10px] text-slate-400 block truncate">
                            {font.englishName}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Font Size Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  ২. হরফের আকার নির্ধারণ করুন:
                </label>
                <div className="flex items-center gap-2">
                  {AVAILABLE_FONT_SIZES.map((size) => {
                    const isSelected = size.id === modalSizeId;
                    return (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setModalSizeId(size.id);
                        }}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border-2 transition-all text-center ${
                          isSelected
                            ? "border-blue-600 bg-blue-600 text-white shadow-xs"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {size.label} ({size.name})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Live Preview Card */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-600 flex items-center justify-between">
                  <span>লাইভ প্রিভিউ (Live Preview):</span>
                  <span className="text-[11px] text-blue-600 font-semibold">
                    {modalFont.name} • {modalSize.name}
                  </span>
                </span>
                
                <div 
                  className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border-2 border-dashed border-blue-200 text-slate-900 space-y-2 transition-all"
                  style={{ 
                    fontFamily: modalFont.cssFamily,
                    fontSize: modalSize.scale
                  }}
                >
                  <p className="font-bold leading-relaxed text-slate-900">
                    &ldquo;আমার সোনার বাংলা, আমি তোমায় ভালোবাসি। চিরদিন তোমার আকাশ, তোমার বাতাস, আমার প্রাণে বাজায় বাঁশি।&rdquo;
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    অ আ ই ঈ উ ঊ • ক খ গ ঘ ঙ • ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯ ০
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-slate-200 bg-slate-50">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors"
              >
                বাতিল
              </button>

              <button
                type="button"
                onClick={handleConfirmChanges}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>নিশ্চিত করুন ও সেভ করুন</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
