"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Printer,
  Download,
  Sparkles,
  RotateCcw,
  Check,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FolderArchive,
  Building2,
  GraduationCap,
  PenTool,
  Eye,
  X
} from "lucide-react";

// ==========================================
// 🏛️ SVG EMBLEMS & ORNAMENTS
// ==========================================

// বাংলাদেশ সরকারের জাতীয় প্রতীক (Govt Emblem SVG)
export function GovtEmblemSvg({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden="true">
      {/* Outer Circle Ring */}
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="43" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
      {/* Water Waves */}
      <path d="M 22 72 Q 36 68 50 72 T 78 72" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 28 77 Q 39 74 50 77 T 72 77" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Shapla (Water Lily) Petals */}
      <path d="M 50 36 C 45 48 45 62 50 67 C 55 62 55 48 50 36 Z" fill="currentColor" />
      <path d="M 50 44 C 40 48 34 56 36 65 C 42 66 46 62 50 67" fill="currentColor" opacity="0.9" />
      <path d="M 50 44 C 60 48 66 56 64 65 C 58 66 54 62 50 67" fill="currentColor" opacity="0.9" />
      <path d="M 50 50 C 35 52 27 59 27 66 C 35 67 43 64 50 67" fill="currentColor" opacity="0.8" />
      <path d="M 50 50 C 65 52 73 59 73 66 C 65 67 57 64 50 67" fill="currentColor" opacity="0.8" />
      {/* Paddy Sheaves (Left & Right) */}
      <path d="M 23 68 C 17 52 20 35 34 23 C 32 32 28 48 30 63" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 77 68 C 83 52 80 35 66 23 C 68 32 72 48 70 63" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Jute Leaves on Top */}
      <path d="M 50 18 C 47 23 48 29 50 32 C 52 29 53 23 50 18 Z" fill="currentColor" />
      <path d="M 45 22 C 40 26 43 30 48 32 C 46 29 44 25 45 22 Z" fill="currentColor" />
      <path d="M 55 22 C 60 26 57 30 52 32 C 54 29 56 25 55 22 Z" fill="currentColor" />
      {/* Four Stars (Two Left, Two Right) */}
      <polygon points="36,19 37.5,23 41.5,23 38.5,25.5 39.5,29.5 36,27 32.5,29.5 33.5,25.5 30.5,23 34.5,23" fill="currentColor" />
      <polygon points="27,27 28.5,31 32.5,31 29.5,33.5 30.5,37.5 27,35 23.5,37.5 24.5,33.5 21.5,31 25.5,31" fill="currentColor" />
      <polygon points="64,19 65.5,23 69.5,23 66.5,25.5 67.5,29.5 64,27 60.5,29.5 61.5,25.5 58.5,23 62.5,23" fill="currentColor" />
      <polygon points="73,27 74.5,31 78.5,31 75.5,33.5 76.5,37.5 73,35 69.5,37.5 70.5,33.5 67.5,31 71.5,31" fill="currentColor" />
    </svg>
  );
}

// প্রাথমিক শিক্ষা অধিদপ্তর প্রতীক (DPE Emblem SVG)
export function DpeEmblemSvg({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,2" />
      {/* Radiant Sun Rays */}
      <path d="M 50 15 L 50 22 M 25 25 L 30 30 M 75 25 L 70 30 M 15 50 L 22 50 M 85 50 L 78 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Flaming Torch of Education */}
      <path d="M 48 32 C 45 28 48 24 50 22 C 52 24 55 28 52 32 C 51 34 49 34 48 32 Z" fill="#e11d48" />
      <path d="M 49 33 L 47 48 L 53 48 L 51 33 Z" fill="currentColor" />
      {/* Open Book */}
      <path d="M 50 56 C 40 48 28 50 22 54 L 22 75 C 28 71 40 70 50 78 C 60 70 72 71 78 75 L 78 54 C 72 50 60 48 50 56 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <line x1="50" y1="56" x2="50" y2="78" stroke="currentColor" strokeWidth="2" />
      {/* DPE Bangla Curved Text Indicator */}
      <path d="M 30 83 Q 50 87 70 83" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// লাল ফিতা বিশিষ্ট মেডেল / সনদ ব্যাজ (Red Ribbon Medal Badge SVG)
export function RibbonMedalBadgeSvg({ className = "w-16 h-16", text = "সনদপত্র" }: { className?: string; text?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-hidden="true">
        {/* Ribbon Tails */}
        <polygon points="40,80 32,116 50,105 60,116 56,82" fill="#991b1b" />
        <polygon points="80,80 88,116 70,105 60,116 64,82" fill="#b91c1c" />
        {/* Rosette Teeth */}
        <circle cx="60" cy="54" r="38" fill="#dc2626" />
        <circle cx="60" cy="54" r="35" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
        <circle cx="60" cy="54" r="31" fill="#7f1d1d" />
        <circle cx="60" cy="54" r="28" fill="#b91c1c" stroke="#fef08a" strokeWidth="1" strokeDasharray="2,2" />
        {/* Inner Gold Starburst */}
        <circle cx="60" cy="54" r="23" fill="#d97706" />
      </svg>
      <span className="absolute top-[32%] text-amber-100 font-black text-xs sm:text-sm tracking-wide select-none drop-shadow-sm">
        {text}
      </span>
    </div>
  );
}

// গোল সিলমোহর (Official School Seal Stamp SVG)
export function SchoolSealSvg({
  schoolName = "সরকারি প্রাথমিক বিদ্যালয়",
  upazila = "সদর",
  zilla = "কুমিল্লা",
  className = "w-28 h-28"
}: {
  schoolName?: string;
  upazila?: string;
  zilla?: string;
  className?: string;
}) {
  return (
    <div className={`relative inline-flex items-center justify-center opacity-85 select-none ${className}`}>
      <svg viewBox="0 0 160 160" className="w-full h-full text-indigo-900" fill="currentColor">
        {/* Outer Circular Rims */}
        <circle cx="80" cy="80" r="76" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="80" cy="80" r="71" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3,2" />
        <circle cx="80" cy="80" r="50" fill="none" stroke="currentColor" strokeWidth="1.8" />

        {/* Circular Curved Text Paths */}
        <path id="seal-top-path" d="M 22 80 A 58 58 0 0 1 138 80" fill="none" />
        <path id="seal-bottom-path" d="M 138 80 A 58 58 0 0 1 22 80" fill="none" />

        <text fontSize="10.5" fontWeight="bold" fill="currentColor" letterSpacing="1">
          <textPath href="#seal-top-path" startOffset="50%" textAnchor="middle">
            {schoolName.length > 28 ? schoolName.slice(0, 26) + "..." : schoolName}
          </textPath>
        </text>

        <text fontSize="9.5" fontWeight="bold" fill="currentColor" letterSpacing="1">
          <textPath href="#seal-bottom-path" startOffset="50%" textAnchor="middle">
            ★ {upazila}, {zilla} ★
          </textPath>
        </text>

        {/* Center Emblem / Year */}
        <circle cx="80" cy="80" r="48" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <text x="80" y="74" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor">
          সিলমোহর
        </text>
        <line x1="62" y1="78" x2="98" y2="78" stroke="currentColor" strokeWidth="1" />
        <text x="80" y="90" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="currentColor">
          অফিসিয়াল
        </text>
      </svg>
    </div>
  );
}

// ক্লাসিক কর্নার অর্নামেন্ট (Classic Victorian / Baroque Corner)
export function ClassicCornerSvg({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="currentColor" aria-hidden="true">
      <path d="M 4 4 L 56 4 L 56 12 L 12 12 L 12 56 L 4 56 Z" />
      <path d="M 16 16 L 46 16 L 46 20 L 20 20 L 20 46 L 16 46 Z" opacity="0.75" />
      <circle cx="28" cy="28" r="4" />
      <path d="M 24 24 C 20 18 18 20 24 24 Z" />
    </svg>
  );
}

// গোল্ডেন কর্নার ব্র্যাকেট (Royal Golden Corner Flourish)
export function RoyalGoldenCornerSvg({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="currentColor" aria-hidden="true">
      <path d="M 6 6 L 74 6 L 74 12 L 12 12 L 12 74 L 6 74 Z" fill="currentColor" />
      <path d="M 16 16 L 60 16 C 45 22 22 45 16 60 Z" fill="currentColor" opacity="0.6" />
      <circle cx="26" cy="26" r="5" fill="currentColor" />
      <path d="M 32 16 C 40 28 28 40 16 32" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

// ফ্লোরাল মেরুন কর্নার (Vintage Floral Corner)
export function FloralCornerSvg({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="currentColor" aria-hidden="true">
      <path d="M 4 4 L 76 4 L 76 10 L 10 10 L 10 76 L 4 76 Z" />
      <path d="M 16 16 C 24 16 32 20 36 28 C 32 36 24 36 16 28 Z" opacity="0.8" />
      <path d="M 28 36 C 36 32 36 24 28 16 C 20 24 20 32 28 36 Z" opacity="0.8" />
      <circle cx="22" cy="22" r="3.5" />
      <path d="M 14 48 C 22 40 40 22 48 14" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" fill="none" />
    </svg>
  );
}

// ==========================================
// 🎨 TEMPLATE TYPES & DATA INTERFACES
// ==========================================

export type CertificateTemplateId =
  | "classic-black"
  | "official-sonod"
  | "dpe-green"
  | "vintage-maroon"
  | "golden-royal";

export type PrintMode = "filled" | "blank";

export interface CertificateData {
  // School Meta
  schoolName: string;
  schoolType: string;
  ministryName: string;
  establishedYear: string;
  schoolCode: string;
  emisCode: string;
  village: string;
  postOffice: string;
  upazila: string;
  zilla: string;

  // Memo & Meta
  memoNo: string;
  issueDate: string;
  certificateType: "প্রত্যয়নপত্র" | "সনদপত্র" | "চারিত্রিক সনদ" | "ছাড়পত্র প্রত্যয়ন";

  // Student Meta
  studentName: string;
  fatherName: string;
  motherName: string;
  studentVillage: string;
  studentPost: string;
  studentUpazila: string;
  studentZilla: string;

  // Academic & Evaluation
  academicYear: string;
  passedClass: string;
  assessmentStage: string;
  rollNo: string;
  section: string;
  grade: string;
  gradeScore: string;
  evaluationRemark: string;
  isPromoted: boolean;
  promotedText: string;
  conductRemark: string;

  // Signatures & Stamp
  headTeacherName: string;
  headTeacherDesignation: string;
  classTeacherName: string;
  showRoundSeal: boolean;
  sealText: string;
}

export const INITIAL_CERTIFICATE_DATA: CertificateData = {
  schoolName: "৭৭নং উত্তর বারপাড়া সরকারি প্রাথমিক বিদ্যালয়",
  schoolType: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার",
  ministryName: "প্রাথমিক ও গণশিক্ষা মন্ত্রণালয় • প্রাথমিক শিক্ষা অধিদপ্তর",
  establishedYear: "১৯৬৮",
  schoolCode: "০৫",
  emisCode: "৯১৩০১১০৩০০৫",
  village: "বারপাড়া",
  postOffice: "উত্তর বারপাড়া",
  upazila: "সদর",
  zilla: "কুমিল্লা",

  memoNo: "উঃবাঃসঃপ্রাঃবিঃ/২০২৬/০৮",
  issueDate: "১২/১১/২০২৬",
  certificateType: "প্রত্যয়নপত্র",

  studentName: "মোসাঃ সুমাইয়া জান্নাত",
  fatherName: "মোহাম্মদ রফিকুল ইসলাম",
  motherName: "মোসাঃ ফাতেমা বেগম",
  studentVillage: "বারপাড়া",
  studentPost: "উত্তর বারপাড়া",
  studentUpazila: "সদর",
  studentZilla: "কুমিল্লা",

  academicYear: "২০২৫",
  passedClass: "৫ম শ্রেণি",
  assessmentStage: "৩য় প্রান্তিক মূল্যায়ন",
  rollNo: "০৩",
  section: "ক",
  grade: "ক",
  gradeScore: "৮০ - ১০০%",
  evaluationRemark: "অতি উত্তম",
  isPromoted: true,
  promotedText: "সে পরবর্তী শ্রেণিতে উন্নীত হওয়ার যোগ্য।",
  conductRemark:
    "আমার জানামতে সে কোন রাষ্ট্র ও সমাজ বিরোধী কাজের সাথে জড়িত নয়। তাহার স্বভাব-চরিত্র ভালো ও প্রশংসনীয়।",

  headTeacherName: "মোঃ আব্দুল করিম",
  headTeacherDesignation: "প্রধান শিক্ষক",
  classTeacherName: "আয়েশা সিদ্দিকা",
  showRoundSeal: true,
  sealText: "সরকারি প্রাথমিক বিদ্যালয় • সিলমোহর"
};

export const TEMPLATE_CONFIGS: {
  id: CertificateTemplateId;
  name: string;
  englishTitle: string;
  badge: string;
  borderThemeClass: string;
  accentColor: string;
  description: string;
  sampleImg: string;
}[] = [
  {
    id: "classic-black",
    name: "১. ক্লাসিক ব্ল্যাক অ্যান্ড হোয়াইট",
    englishTitle: "Classic B&W Official",
    badge: "প্রিন্ট-ফ্রেন্ডলি",
    borderThemeClass: "border-slate-900 text-slate-900 bg-white",
    accentColor: "#0f172a",
    description: "আসল নমুনার মতো কালো ফ্রেম ও ক্লাসিক ফন্ট; সাধারণ ফটোকপি বা প্রিন্টারে নিখুঁত ও সাশ্রয়ী প্রিন্ট।",
    sampleImg: "/certificates/sample-1-classic-black.jpg"
  },
  {
    id: "official-sonod",
    name: "২. লাল ফিতা মেডেল সনদপত্র",
    englishTitle: "Official Sonod Badge",
    badge: "লাল ফিতা পদক",
    borderThemeClass: "border-amber-900 text-slate-900 bg-amber-50/20",
    accentColor: "#dc2626",
    description: "মাঝখানে দৃষ্টিনন্দন লাল ফিতা মেডেল ব্যাজ সহ বিশেষ সমাপনী সনদপত্র বা কৃতিত্ব প্রত্যয়ন।",
    sampleImg: "/certificates/sample-2-official-sonod.jpg"
  },
  {
    id: "dpe-green",
    name: "৩. ডিপিই মডার্ন গ্রিন",
    englishTitle: "DPE Modern Emerald Green",
    badge: "ডিপিই সবুজ",
    borderThemeClass: "border-emerald-800 text-emerald-950 bg-emerald-50/20",
    accentColor: "#059669",
    description: "প্রাথমিক শিক্ষা অধিদপ্তরের প্রিয় সবুজ থিম, ডাবল ফ্রেম ও পাতার মোটিফে আধুনিক রূপ।",
    sampleImg: "/certificates/sample-3-dpe-green.jpg"
  },
  {
    id: "vintage-maroon",
    name: "৪. ভিন্টেজ মেরুন ফ্লোরাল",
    englishTitle: "Vintage Maroon Floral",
    badge: "অভিজাত মেরুন",
    borderThemeClass: "border-rose-950 text-rose-950 bg-rose-50/20",
    accentColor: "#881337",
    description: "গাঢ় লালচে মেরুন বর্ডার, ক্লাসিক ফ্লোরাল কর্নার ও ভিক্টোরিয়ান প্যাটার্নে ঐতিহ্যবাহী সনদ।",
    sampleImg: "/certificates/sample-4-vintage-maroon.jpg"
  },
  {
    id: "golden-royal",
    name: "৫. রয়্যাল গোল্ডেন প্রিমিয়াম",
    englishTitle: "Royal Golden Border",
    badge: "গোল্ডেন রাজকীয়",
    borderThemeClass: "border-amber-700 text-amber-950 bg-amber-50/10",
    accentColor: "#d97706",
    description: "সোনালী রাজকীয় ফ্রেম, ওয়াটারমার্ক সরকারি প্রতীক ও আধুনিক চার স্তরের মূল্যায়ন স্কেল।",
    sampleImg: "/certificates/sample-5-golden-royal.jpg"
  }
];

function getInitialCertificateData(): CertificateData {
  if (typeof window === "undefined") return INITIAL_CERTIFICATE_DATA;
  try {
    const saved = localStorage.getItem("pp_school_certificate_meta");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...INITIAL_CERTIFICATE_DATA,
        schoolName: parsed.schoolName || INITIAL_CERTIFICATE_DATA.schoolName,
        schoolType: parsed.schoolType || INITIAL_CERTIFICATE_DATA.schoolType,
        ministryName: parsed.ministryName || INITIAL_CERTIFICATE_DATA.ministryName,
        establishedYear: parsed.establishedYear || INITIAL_CERTIFICATE_DATA.establishedYear,
        schoolCode: parsed.schoolCode || INITIAL_CERTIFICATE_DATA.schoolCode,
        emisCode: parsed.emisCode || INITIAL_CERTIFICATE_DATA.emisCode,
        village: parsed.village || INITIAL_CERTIFICATE_DATA.village,
        postOffice: parsed.postOffice || INITIAL_CERTIFICATE_DATA.postOffice,
        upazila: parsed.upazila || INITIAL_CERTIFICATE_DATA.upazila,
        zilla: parsed.zilla || INITIAL_CERTIFICATE_DATA.zilla,
        headTeacherName: parsed.headTeacherName || INITIAL_CERTIFICATE_DATA.headTeacherName,
        classTeacherName: parsed.classTeacherName || INITIAL_CERTIFICATE_DATA.classTeacherName
      };
    }
  } catch {
    // Ignore localStorage errors
  }
  return INITIAL_CERTIFICATE_DATA;
}

// ==========================================
// 🚀 MAIN CERTIFICATE STUDIO COMPONENT
// ==========================================

export default function StudentCertificateStudio() {
  const [data, setData] = useState<CertificateData>(getInitialCertificateData);
  const [template, setTemplate] = useState<CertificateTemplateId>("classic-black");
  const [printMode, setPrintMode] = useState<PrintMode>("filled");
  const [zoomScale, setZoomScale] = useState<number>(100);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeFormTab, setActiveFormTab] = useState<"school" | "student" | "signatures" | "gallery">("school");
  const [previewSampleModal, setPreviewSampleModal] = useState<string | null>(null);

  const printAreaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-fit calculation for any screen width
  const handleAutoFit = useCallback(() => {
    if (!containerRef.current) return;
    const availableWidth = containerRef.current.clientWidth - 24;
    const targetWidthPx = 1077; // ~285mm at 96dpi
    const fitPercent = Math.max(30, Math.min(100, Math.floor((availableWidth / targetWidthPx) * 100)));
    setZoomScale(fitPercent);
    setToastMessage(`স্ক্রিন অনুযায়ী জুম ${fitPercent}% অ্যাডজাস্ট করা হয়েছে`);
    setTimeout(() => setToastMessage(null), 2500);
  }, []);

  // Run auto-fit on mount when loaded on small screens (mobile/tablet < 1150px)
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1150) {
      const timer = setTimeout(() => {
        if (containerRef.current) {
          const availableWidth = containerRef.current.clientWidth - 24;
          const fitPercent = Math.max(30, Math.min(100, Math.floor((availableWidth / 1077) * 100)));
          setZoomScale(fitPercent);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  // Save school metadata to localStorage on update
  const saveSchoolMetaLocally = (updated: CertificateData) => {
    try {
      const toSave = {
        schoolName: updated.schoolName,
        schoolType: updated.schoolType,
        ministryName: updated.ministryName,
        establishedYear: updated.establishedYear,
        schoolCode: updated.schoolCode,
        emisCode: updated.emisCode,
        village: updated.village,
        postOffice: updated.postOffice,
        upazila: updated.upazila,
        zilla: updated.zilla,
        headTeacherName: updated.headTeacherName,
        classTeacherName: updated.classTeacherName
      };
      localStorage.setItem("pp_school_certificate_meta", JSON.stringify(toSave));
    } catch {
      // Ignore
    }
  };

  const handleInputChange = (field: keyof CertificateData, value: string | boolean) => {
    setData((prev) => {
      const updated = { ...prev, [field]: value };
      saveSchoolMetaLocally(updated);
      return updated;
    });
  };

  // 1-Click Sample Autofill
  const handleAutofillDemo = () => {
    setData(INITIAL_CERTIFICATE_DATA);
    setToastMessage("নমুনা তথ্য সফলভাবে লোড হয়েছে!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Reset / Clear Fields
  const handleReset = () => {
    setData((prev) => ({
      ...prev,
      studentName: "",
      fatherName: "",
      motherName: "",
      studentVillage: "",
      studentPost: "",
      rollNo: "",
      section: "",
      grade: "ক"
    }));
    setToastMessage("শিক্ষার্থীর তথ্য সফলভাবে পরিষ্কার করা হয়েছে!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Trigger Native Print Dialog
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-6">
      {/* 🖨️ LANDSCAPE PRINT CSS DIRECTIVE */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          @page {
            size: A4 landscape !important;
            margin: 5mm 6mm !important;
          }
          #site-header, #site-footer, nav, aside, .print\\:hidden, [role="tablist"], .studio-controls {
            display: none !important;
          }
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .certificate-print-area {
            position: absolute !important;
            left: 0 !important;
            right: 0 !important;
            top: 0 !important;
            width: 285mm !important;
            height: 198mm !important;
            max-width: 285mm !important;
            max-height: 198mm !important;
            margin: 0 auto !important;
            box-sizing: border-box !important;
            box-shadow: none !important;
            transform: none !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .certificate-print-area * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `
        }}
      />

      {/* 🌟 HERO & CONTROLS TOOLBAR */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-sm space-y-5 print:hidden">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl shadow-xs">
              📜
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  প্রত্যয়নপত্র ও সনদপত্র স্টুডিও
                </h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  A4 ল্যান্ডস্কেপ রেডি
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                বাংলাদেশ প্রাথমিক বিদ্যালয়ের ৫টি সরকারি ফরম্যাট • ডিজিটাল ফিল্ড বা হাতে লেখার ব্ল্যাঙ্ক প্রিন্ট
              </p>
            </div>
          </div>

          {/* Action Buttons: Autofill, Blank/Filled Mode & Print */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleAutofillDemo}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-all touch-manipulation min-h-[40px] active:scale-95"
              title="বাস্তব নমুনা তথ্য লোড করুন"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>নমুনা তথ্য পূরণ</span>
            </button>

            {/* Print Mode Switcher (Filled vs Blank) */}
            <div
              role="radiogroup"
              aria-label="প্রিন্ট মোড"
              className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80"
            >
              <button
                type="button"
                role="radio"
                aria-checked={printMode === "filled"}
                onClick={() => setPrintMode("filled")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[34px] ${
                  printMode === "filled"
                    ? "bg-white text-emerald-800 shadow-xs border border-emerald-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="কম্পিউটারাইজড ফিল্ড কপি প্রিভিউ"
              >
                ডিজিটাল পূরণকৃত
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={printMode === "blank"}
                onClick={() => setPrintMode("blank")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[34px] ${
                  printMode === "blank"
                    ? "bg-white text-blue-800 shadow-xs border border-blue-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="হাতে কলমে লেখার জন্য ডটেড ব্ল্যাঙ্ক কপি"
              >
                ব্ল্যাঙ্ক প্রিন্ট ফরম
              </button>
            </div>

            {/* Direct Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all hover:scale-102 active:scale-95 min-h-[40px]"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট / PDF সেভ (Ctrl+P)</span>
            </button>
          </div>
        </div>

        {/* 🎨 5 TEMPLATE SWITCHER TABS */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>ডিজাইন টেমপ্লেট নির্বাচন করুন (জিপ নমুনার ৫টি ফ্রেম):</span>
            <span className="text-[11px] text-slate-400">
              নির্বাচিত: {TEMPLATE_CONFIGS.find((t) => t.id === template)?.name}
            </span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {TEMPLATE_CONFIGS.map((t) => {
              const isSelected = t.id === template;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTemplate(t.id)}
                  aria-pressed={isSelected}
                  className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-2 touch-manipulation ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-500/20 shadow-xs scale-101"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: t.accentColor }}
                      aria-hidden="true"
                    />
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {t.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-900 leading-tight">{t.name}</h3>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{t.englishTitle}</p>
                  </div>
                  {isSelected && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 pt-1 border-t border-emerald-100">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>সক্রিয় টেমপ্লেট</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 🎛️ DATA ENTRY TABS (SCHOOL / STUDENT / SIGNATURES / SAMPLES) */}
        <div className="pt-2">
          <div
            role="tablist"
            aria-label="তথ্য এন্ট্রি ফরম"
            className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-slate-200 no-scrollbar"
          >
            <button
              id="tab-school"
              role="tab"
              aria-selected={activeFormTab === "school"}
              aria-controls="panel-school"
              type="button"
              onClick={() => setActiveFormTab("school")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-t-xl text-xs font-bold transition-all border-b-2 shrink-0 ${
                activeFormTab === "school"
                  ? "border-emerald-600 text-emerald-700 bg-emerald-50/50"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building2 className="w-3.5 h-3.5 shrink-0" />
              <span className="sm:hidden">১. বিদ্যালয়</span>
              <span className="hidden sm:inline">১. বিদ্যালয়ের তথ্য (অটো-সেভ)</span>
            </button>

            <button
              id="tab-student"
              role="tab"
              aria-selected={activeFormTab === "student"}
              aria-controls="panel-student"
              type="button"
              onClick={() => setActiveFormTab("student")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-t-xl text-xs font-bold transition-all border-b-2 shrink-0 ${
                activeFormTab === "student"
                  ? "border-emerald-600 text-emerald-700 bg-emerald-50/50"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 shrink-0" />
              <span className="sm:hidden">২. শিক্ষার্থী</span>
              <span className="hidden sm:inline">২. শিক্ষার্থীর তথ্য ও ফলাফল</span>
            </button>

            <button
              id="tab-signatures"
              role="tab"
              aria-selected={activeFormTab === "signatures"}
              aria-controls="panel-signatures"
              type="button"
              onClick={() => setActiveFormTab("signatures")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-t-xl text-xs font-bold transition-all border-b-2 shrink-0 ${
                activeFormTab === "signatures"
                  ? "border-emerald-600 text-emerald-700 bg-emerald-50/50"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <PenTool className="w-3.5 h-3.5 shrink-0" />
              <span className="sm:hidden">৩. স্বাক্ষর ও সিল</span>
              <span className="hidden sm:inline">৩. স্মারক, স্বাক্ষর ও সিলমোহর</span>
            </button>

            <button
              id="tab-gallery"
              role="tab"
              aria-selected={activeFormTab === "gallery"}
              aria-controls="panel-gallery"
              type="button"
              onClick={() => setActiveFormTab("gallery")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-t-xl text-xs font-bold transition-all border-b-2 shrink-0 ${
                activeFormTab === "gallery"
                  ? "border-amber-600 text-amber-700 bg-amber-50/50"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <FolderArchive className="w-3.5 h-3.5 shrink-0" />
              <span className="sm:hidden">৪. নমুনা গ্যালারি</span>
              <span className="hidden sm:inline">৪. নমুনা জিপ ও ডাউনলোড গ্যালারি</span>
            </button>
          </div>

          {/* TAB 1: SCHOOL INFORMATION */}
          {activeFormTab === "school" && (
            <div
              role="tabpanel"
              id="panel-school"
              aria-labelledby="tab-school"
              className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
            >
              <div className="space-y-1 sm:col-span-2">
                <label htmlFor="cert-school-name" className="text-xs font-bold text-slate-700">
                  বিদ্যালয়ের নাম (পূর্ণ নাম)*
                </label>
                <input
                  id="cert-school-name"
                  type="text"
                  value={data.schoolName}
                  onChange={(e) => handleInputChange("schoolName", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="যেমন: ৭৭নং উত্তর বারপাড়া সরকারি প্রাথমিক বিদ্যালয়"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="cert-emis-code" className="text-xs font-bold text-slate-700">
                  ইএমআইএস (EMIS) কোড
                </label>
                <input
                  id="cert-emis-code"
                  type="text"
                  value={data.emisCode}
                  onChange={(e) => handleInputChange("emisCode", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="যেমন: ৯১৩০১১০৩০০৫"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-700 block">বিদ্যালয় কোড / স্থাপিত</span>
                <div className="flex gap-1.5">
                  <label htmlFor="cert-school-code" className="sr-only">
                    বিদ্যালয় কোড
                  </label>
                  <input
                    id="cert-school-code"
                    type="text"
                    value={data.schoolCode}
                    onChange={(e) => handleInputChange("schoolCode", e.target.value)}
                    className="w-1/2 px-2.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="কোড: ০৫"
                  />
                  <label htmlFor="cert-established-year" className="sr-only">
                    স্থাপিত বছর
                  </label>
                  <input
                    id="cert-established-year"
                    type="text"
                    value={data.establishedYear}
                    onChange={(e) => handleInputChange("establishedYear", e.target.value)}
                    className="w-1/2 px-2.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="স্থাপিত: ১৯৬৮"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="cert-village" className="text-xs font-bold text-slate-700">
                  গ্রাম / এলাকা
                </label>
                <input
                  id="cert-village"
                  type="text"
                  value={data.village}
                  onChange={(e) => handleInputChange("village", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="যেমন: বারপাড়া"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="cert-post-office" className="text-xs font-bold text-slate-700">
                  ডাকঘর
                </label>
                <input
                  id="cert-post-office"
                  type="text"
                  value={data.postOffice}
                  onChange={(e) => handleInputChange("postOffice", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="যেমন: উত্তর বারপাড়া"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="cert-upazila" className="text-xs font-bold text-slate-700">
                  উপজেলা / থানা
                </label>
                <input
                  id="cert-upazila"
                  type="text"
                  value={data.upazila}
                  onChange={(e) => handleInputChange("upazila", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="যেমন: সদর"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="cert-zilla" className="text-xs font-bold text-slate-700">
                  জেলা
                </label>
                <input
                  id="cert-zilla"
                  type="text"
                  value={data.zilla}
                  onChange={(e) => handleInputChange("zilla", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="যেমন: কুমিল্লা"
                />
              </div>
            </div>
          )}

          {/* TAB 2: STUDENT & ASSESSMENT INFORMATION */}
          {activeFormTab === "student" && (
            <div
              role="tabpanel"
              id="panel-student"
              aria-labelledby="tab-student"
              className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
            >
              <div className="space-y-1 sm:col-span-2">
                <label htmlFor="cert-student-name" className="text-xs font-bold text-slate-700">
                  শিক্ষার্থীর নাম*
                </label>
                <input
                  id="cert-student-name"
                  type="text"
                  value={data.studentName}
                  onChange={(e) => handleInputChange("studentName", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="যেমন: মোসাঃ সুমাইয়া জান্নাত"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="cert-father-name" className="text-xs font-bold text-slate-700">
                  পিতার নাম*
                </label>
                <input
                  id="cert-father-name"
                  type="text"
                  value={data.fatherName}
                  onChange={(e) => handleInputChange("fatherName", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="যেমন: মোহাম্মদ রফিকুল ইসলাম"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="cert-mother-name" className="text-xs font-bold text-slate-700">
                  মাতার নাম*
                </label>
                <input
                  id="cert-mother-name"
                  type="text"
                  value={data.motherName}
                  onChange={(e) => handleInputChange("motherName", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="যেমন: মোসাঃ ফাতেমা বেগম"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-700 block">শিক্ষার্থীর ঠিকানা (গ্রাম ও ডাক)</span>
                <div className="flex gap-1.5">
                  <label htmlFor="cert-student-village" className="sr-only">
                    গ্রাম
                  </label>
                  <input
                    id="cert-student-village"
                    type="text"
                    value={data.studentVillage}
                    onChange={(e) => handleInputChange("studentVillage", e.target.value)}
                    className="w-1/2 px-2.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="গ্রাম"
                  />
                  <label htmlFor="cert-student-post" className="sr-only">
                    ডাকঘর
                  </label>
                  <input
                    id="cert-student-post"
                    type="text"
                    value={data.studentPost}
                    onChange={(e) => handleInputChange("studentPost", e.target.value)}
                    className="w-1/2 px-2.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="ডাকঘর"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-700 block">শ্রেণি ও শিক্ষাবর্ষ</span>
                <div className="flex gap-1.5">
                  <label htmlFor="cert-passed-class" className="sr-only">
                    উত্তীর্ণ শ্রেণি
                  </label>
                  <select
                    id="cert-passed-class"
                    value={data.passedClass}
                    onChange={(e) => handleInputChange("passedClass", e.target.value)}
                    className="w-1/2 px-2 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="প্রাক-প্রাথমিক">প্রাক-প্রাথমিক</option>
                    <option value="১ম শ্রেণি">১ম শ্রেণি</option>
                    <option value="২য় শ্রেণি">২য় শ্রেণি</option>
                    <option value="৩য় শ্রেণি">৩য় শ্রেণি</option>
                    <option value="৪র্থ শ্রেণি">৪র্থ শ্রেণি</option>
                    <option value="৫ম শ্রেণি">৫ম শ্রেণি</option>
                  </select>
                  <label htmlFor="cert-academic-year" className="sr-only">
                    শিক্ষাবর্ষ
                  </label>
                  <input
                    id="cert-academic-year"
                    type="text"
                    value={data.academicYear}
                    onChange={(e) => handleInputChange("academicYear", e.target.value)}
                    className="w-1/2 px-2.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="যেমন: ২০২৫"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="cert-assessment-stage" className="text-xs font-bold text-slate-700">
                  মূল্যায়ন পর্যায়
                </label>
                <select
                  id="cert-assessment-stage"
                  value={data.assessmentStage}
                  onChange={(e) => handleInputChange("assessmentStage", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="৩য় প্রান্তিক মূল্যায়ন">৩য় প্রান্তিক মূল্যায়ন</option>
                  <option value="বার্ষিক মূল্যায়ন">বার্ষিক মূল্যায়ন</option>
                  <option value="প্রাথমিক শিক্ষা সমাপনী">প্রাথমিক শিক্ষা সমাপনী</option>
                  <option value="শ্রেণি সমাপনী মূল্যায়ন">শ্রেণি সমাপনী মূল্যায়ন</option>
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-700 block">রোল, শাখা ও প্রাপ্ত গ্রেড</span>
                <div className="flex gap-1.5">
                  <label htmlFor="cert-roll-no" className="sr-only">
                    রোল
                  </label>
                  <input
                    id="cert-roll-no"
                    type="text"
                    value={data.rollNo}
                    onChange={(e) => handleInputChange("rollNo", e.target.value)}
                    className="w-1/3 px-2 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="রোল: ০৩"
                  />
                  <label htmlFor="cert-section" className="sr-only">
                    শাখা
                  </label>
                  <input
                    id="cert-section"
                    type="text"
                    value={data.section}
                    onChange={(e) => handleInputChange("section", e.target.value)}
                    className="w-1/3 px-2 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="শাখা: ক"
                  />
                  <label htmlFor="cert-grade" className="sr-only">
                    গ্রেড
                  </label>
                  <select
                    id="cert-grade"
                    value={data.grade}
                    onChange={(e) => {
                      const g = e.target.value;
                      let score = "৮০ - ১০০%";
                      let remark = "অতি উত্তম";
                      if (g === "খ") {
                        score = "৬০ - ৭৯%";
                        remark = "উত্তম";
                      } else if (g === "গ") {
                        score = "৪০ - ৫৯%";
                        remark = "সন্তোষজনক";
                      } else if (g === "ঘ") {
                        score = "৩৩ - ৩৯%";
                        remark = "অগ্রগতি প্রয়োজন";
                      }
                      setData((prev) => ({
                        ...prev,
                        grade: g,
                        gradeScore: score,
                        evaluationRemark: remark
                      }));
                    }}
                    className="w-1/3 px-2 py-2 rounded-xl border border-slate-300 text-xs font-black text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="ক">ক (৮০-১০০%)</option>
                    <option value="খ">খ (৬০-৭৯%)</option>
                    <option value="গ">গ (৪০-৫৯%)</option>
                    <option value="ঘ">ঘ (৩৩-৩৯%)</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2 flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="promotion-checkbox"
                  checked={data.isPromoted}
                  onChange={(e) => handleInputChange("isPromoted", e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded-sm border-slate-300 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="promotion-checkbox" className="text-xs font-bold text-slate-800 cursor-pointer">
                  পরবর্তী শ্রেণিতে উন্নীত হওয়ার বাক্য যুক্ত রাখুন (&ldquo;সে পরবর্তী শ্রেণিতে উন্নীত হওয়ার যোগ্য।&rdquo;)
                </label>
              </div>

              <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>শিক্ষার্থীর তথ্য মুছুন</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SIGNATURES, MEMO & STAMPS */}
          {activeFormTab === "signatures" && (
            <div
              role="tabpanel"
              id="panel-signatures"
              aria-labelledby="tab-signatures"
              className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
            >
              <div className="space-y-1">
                <label htmlFor="cert-certificate-type" className="text-xs font-bold text-slate-700">
                  সনদের শিরোনাম
                </label>
                <select
                  id="cert-certificate-type"
                  value={data.certificateType}
                  onChange={(e) =>
                    handleInputChange("certificateType", e.target.value as CertificateData["certificateType"])
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="প্রত্যয়নপত্র">প্রত্যয়নপত্র (ডিফল্ট)</option>
                  <option value="সনদপত্র">সনদপত্র (সার্টিফিকেট)</option>
                  <option value="চারিত্রিক সনদ">চারিত্রিক সনদ</option>
                  <option value="ছাড়পত্র প্রত্যয়ন">ছাড়পত্র প্রত্যয়ন</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="cert-memo-no" className="text-xs font-bold text-slate-700">
                  স্মারক নম্বর (মেমো নং)
                </label>
                <input
                  id="cert-memo-no"
                  type="text"
                  value={data.memoNo}
                  onChange={(e) => handleInputChange("memoNo", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="যেমন: উঃবাঃসঃপ্রাঃবিঃ/২০২৬/০৮"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="cert-issue-date" className="text-xs font-bold text-slate-700">
                  ইস্যু তারিখ
                </label>
                <input
                  id="cert-issue-date"
                  type="text"
                  value={data.issueDate}
                  onChange={(e) => handleInputChange("issueDate", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="১২/১১/২০২৬"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="round-seal-checkbox" className="text-xs font-bold text-slate-700">
                  অফিসিয়াল গোল সিলমোহর
                </label>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="round-seal-checkbox"
                    checked={data.showRoundSeal}
                    onChange={(e) => handleInputChange("showRoundSeal", e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded-sm border-slate-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="round-seal-checkbox" className="text-xs font-bold text-slate-800 cursor-pointer">
                    গোল সিলমোহর প্রদর্শন করুন
                  </label>
                </div>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <span className="text-xs font-bold text-slate-700 block">প্রধান শিক্ষকের নাম ও পদবি</span>
                <div className="flex gap-2">
                  <label htmlFor="cert-head-teacher-name" className="sr-only">
                    প্রধান শিক্ষকের নাম
                  </label>
                  <input
                    id="cert-head-teacher-name"
                    type="text"
                    value={data.headTeacherName}
                    onChange={(e) => handleInputChange("headTeacherName", e.target.value)}
                    className="w-2/3 px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="প্রধান শিক্ষকের নাম"
                  />
                  <label htmlFor="cert-head-teacher-designation" className="sr-only">
                    পদবি
                  </label>
                  <input
                    id="cert-head-teacher-designation"
                    type="text"
                    value={data.headTeacherDesignation}
                    onChange={(e) => handleInputChange("headTeacherDesignation", e.target.value)}
                    className="w-1/3 px-2 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="পদবি (প্রধান শিক্ষক)"
                  />
                </div>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label htmlFor="cert-class-teacher-name" className="text-xs font-bold text-slate-700">
                  শ্রেণি শিক্ষকের নাম (ঐচ্ছিক)
                </label>
                <input
                  id="cert-class-teacher-name"
                  type="text"
                  value={data.classTeacherName}
                  onChange={(e) => handleInputChange("classTeacherName", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="যেমন: আয়েশা সিদ্দিকা"
                />
              </div>

              <div className="space-y-1 sm:col-span-4">
                <label htmlFor="cert-conduct-remark" className="text-xs font-bold text-slate-700">
                  চারিত্রিক প্রশংসাসূচক বাক্য
                </label>
                <input
                  id="cert-conduct-remark"
                  type="text"
                  value={data.conductRemark}
                  onChange={(e) => handleInputChange("conductRemark", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="আমার জানামতে সে কোন রাষ্ট্র ও সমাজ বিরোধী কাজের সাথে জড়িত নয়..."
                />
              </div>
            </div>
          )}

          {/* TAB 4: SAMPLES GALLERY & ZIP DOWNLOAD */}
          {activeFormTab === "gallery" && (
            <div className="pt-4 space-y-4">
              {/* Hero ZIP Download Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FolderArchive className="w-6 h-6 shrink-0" />
                    <h2 className="text-base sm:text-lg font-black">
                      মূল প্রত্যয়নপত্রের জিপ ফাইল (Certificate_Sample.zip)
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-100">
                    স্কুলের আসল ৫টি মূল সনদের স্ক্যান কপি সম্বলিত জিপ ফাইল সরাসরি ডাউনলোড করে কম্পিউটারে সংরক্ষণ করুন।
                  </p>
                </div>
                <a
                  href="/certificates/Certificate_Sample.zip"
                  download="Certificate_Sample.zip"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-amber-900 font-black text-xs sm:text-sm shadow-md hover:bg-amber-50 transition-all hover:scale-105 active:scale-95 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>জিপ ফাইল ডাউনলোড (৯৩১ KB)</span>
                </a>
              </div>

              {/* 5 Scanned Samples Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {TEMPLATE_CONFIGS.map((t, idx) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-2xl border border-slate-200 bg-white hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-2">
                      <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={t.sampleImg}
                          alt={t.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => setPreviewSampleModal(t.sampleImg)}
                          className="absolute inset-0 bg-slate-900/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-xs font-bold"
                        >
                          <Eye className="w-4 h-4" />
                          <span>বড় করে দেখুন</span>
                        </button>
                      </div>

                      <div>
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900">
                          নমুনা #{idx + 1}
                        </span>
                        <h3 className="text-xs font-bold text-slate-900 mt-1 leading-snug">{t.name}</h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setTemplate(t.id);
                          setActiveFormTab("school");
                          setToastMessage(`টেমপ্লেট '${t.name}' নির্বাচন করা হয়েছে!`);
                          setTimeout(() => setToastMessage(null), 2500);
                        }}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] transition-colors text-center"
                      >
                        ব্যবহার করুন
                      </button>
                      <a
                        href={t.sampleImg}
                        download={`certificate-sample-${idx + 1}.jpg`}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="ছবিটি ডাউনলোড করুন"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 🔍 PREVIEW ZOOM & WORKSPACE TOOLBAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 print:hidden">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <span>লাইভ সনদপত্র প্রিভিউ (A4 ল্যান্ডস্কেপ):</span>
          <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
            {printMode === "filled" ? "ডিজিটাল কপি" : "ব্ল্যাঙ্ক ফরম"}
          </span>
        </div>

        {/* Zoom Controls with Auto-Fit */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={handleAutoFit}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors"
            title="স্ক্রিনের সাথে অটো-ফিট করুন"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>অটো-ফিট</span>
          </button>
          <div className="h-4 w-px bg-slate-200" />
          <button
            type="button"
            onClick={() => setZoomScale((prev) => Math.max(30, prev - 10))}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="জুম আউট"
            aria-label="জুম আউট"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-black text-slate-700 w-12 text-center" aria-live="polite">
            {zoomScale}%
          </span>
          <button
            type="button"
            onClick={() => setZoomScale((prev) => Math.min(130, prev + 10))}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="জুম ইন"
            aria-label="জুম ইন"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomScale(100)}
            className="px-2 py-0.5 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            ১০০%
          </button>
        </div>
      </div>

      {/* ========================================================
          📜 A4 LANDSCAPE CERTIFICATE CANVAS (PRINT & PREVIEW)
          Standard A4 Landscape: 297mm x 210mm (Ratio: ~1.414)
          ======================================================== */}
      <div
        ref={containerRef}
        className="w-full overflow-x-auto pb-8 flex flex-col items-center bg-slate-200/60 p-2 sm:p-6 rounded-3xl border border-slate-300/80 shadow-inner"
      >
        <div
          style={{
            width: `${285 * (zoomScale / 100)}mm`,
            height: `${200 * (zoomScale / 100)}mm`,
            maxWidth: "100%"
          }}
          className="relative overflow-hidden transition-[width,height] duration-200 shrink-0"
        >
          <div
            style={{
              transform: `scale(${zoomScale / 100})`,
              transformOrigin: "top left",
              width: "285mm",
              height: "200mm"
            }}
            className="absolute top-0 left-0"
          >
            {/* Certificate Container */}
            <article
              ref={printAreaRef}
              aria-label="প্রত্যয়নপত্র প্রিন্ট প্রিভিউ"
              className={`certificate-print-area relative w-[285mm] h-[200mm] p-6 sm:p-8 bg-white shadow-2xl rounded-sm transition-all duration-300 font-['Hind_Siliguri',sans-serif] selection:bg-amber-200 overflow-hidden flex flex-col justify-between border-[12px] box-border ${
              template === "classic-black"
                ? "border-slate-950 text-slate-950"
                : template === "official-sonod"
                ? "border-amber-900 text-slate-950 bg-amber-50/15"
                : template === "dpe-green"
                ? "border-emerald-800 text-emerald-950 bg-emerald-50/15"
                : template === "vintage-maroon"
                ? "border-rose-950 text-rose-950 bg-rose-50/15"
                : "border-amber-800 text-slate-950 bg-amber-50/10"
            }`}
          >
            {/* INNER DECORATIVE DOUBLE BORDER */}
            <div
              className={`absolute inset-2 sm:inset-3 border-2 border-dashed pointer-events-none ${
                template === "classic-black"
                  ? "border-slate-800"
                  : template === "official-sonod"
                  ? "border-amber-700/80"
                  : template === "dpe-green"
                  ? "border-emerald-700/80"
                  : template === "vintage-maroon"
                  ? "border-rose-800/80"
                  : "border-amber-700/80"
              }`}
            />

            {/* CORNER ORNAMENTS */}
            <div className="absolute top-4 left-4 pointer-events-none">
              {template === "golden-royal" ? (
                <RoyalGoldenCornerSvg className="w-14 h-14 text-amber-700" />
              ) : template === "vintage-maroon" ? (
                <FloralCornerSvg className="w-14 h-14 text-rose-900" />
              ) : (
                <ClassicCornerSvg
                  className={`w-12 h-12 ${
                    template === "dpe-green"
                      ? "text-emerald-800"
                      : template === "official-sonod"
                      ? "text-amber-800"
                      : "text-slate-900"
                  }`}
                />
              )}
            </div>

            <div className="absolute top-4 right-4 pointer-events-none rotate-90">
              {template === "golden-royal" ? (
                <RoyalGoldenCornerSvg className="w-14 h-14 text-amber-700" />
              ) : template === "vintage-maroon" ? (
                <FloralCornerSvg className="w-14 h-14 text-rose-900" />
              ) : (
                <ClassicCornerSvg
                  className={`w-12 h-12 ${
                    template === "dpe-green"
                      ? "text-emerald-800"
                      : template === "official-sonod"
                      ? "text-amber-800"
                      : "text-slate-900"
                  }`}
                />
              )}
            </div>

            <div className="absolute bottom-4 left-4 pointer-events-none -rotate-90">
              {template === "golden-royal" ? (
                <RoyalGoldenCornerSvg className="w-14 h-14 text-amber-700" />
              ) : template === "vintage-maroon" ? (
                <FloralCornerSvg className="w-14 h-14 text-rose-900" />
              ) : (
                <ClassicCornerSvg
                  className={`w-12 h-12 ${
                    template === "dpe-green"
                      ? "text-emerald-800"
                      : template === "official-sonod"
                      ? "text-amber-800"
                      : "text-slate-900"
                  }`}
                />
              )}
            </div>

            <div className="absolute bottom-4 right-4 pointer-events-none rotate-180">
              {template === "golden-royal" ? (
                <RoyalGoldenCornerSvg className="w-14 h-14 text-amber-700" />
              ) : template === "vintage-maroon" ? (
                <FloralCornerSvg className="w-14 h-14 text-rose-900" />
              ) : (
                <ClassicCornerSvg
                  className={`w-12 h-12 ${
                    template === "dpe-green"
                      ? "text-emerald-800"
                      : template === "official-sonod"
                      ? "text-amber-800"
                      : "text-slate-900"
                  }`}
                />
              )}
            </div>

            {/* WATERMARK BACKGROUND (SUBTLE EMBLEM IN CENTER) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
              <GovtEmblemSvg className="w-96 h-96 text-slate-950" />
            </div>

            {/* -------------------------------------------
                1. HEADER SECTION (GOVT, DPE & SCHOOL NAME)
                ------------------------------------------- */}
            <div className="certificate-print-header relative z-10 space-y-1.5 text-center">
              {/* Top Subheaders & Side Grading Scale Table */}
              <div className="flex items-start justify-between gap-2 px-6">
                {/* Left: DPE / Govt Logo & School Code */}
                <div className="w-48 text-left space-y-0.5 pt-1">
                  <div className="flex items-center gap-2">
                    {template === "dpe-green" ? (
                      <DpeEmblemSvg className="w-12 h-12 text-emerald-800" />
                    ) : (
                      <GovtEmblemSvg className="w-12 h-12 text-slate-900" />
                    )}
                    <div>
                      <p className="text-[11px] font-bold text-slate-600">বিদ্যালয় কোড: {data.schoolCode || "০৫"}</p>
                      <p className="text-[11px] font-bold text-slate-600">
                        স্থাপিত: {data.establishedYear || "১৯৬৮"} খ্রিঃ
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center: Ministry & Govt Designation */}
                <div className="flex-1 text-center space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold tracking-wide uppercase text-slate-700">
                    {data.schoolType || "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার"}
                  </p>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-600">
                    {data.ministryName || "প্রাথমিক ও গণশিক্ষা মন্ত্রণালয় • প্রাথমিক শিক্ষা অধিদপ্তর"}
                  </p>
                  {/* Primary School Name */}
                  <h2
                    className={`text-2xl sm:text-3xl font-black tracking-tight leading-tight pt-1 ${
                      template === "dpe-green"
                        ? "text-emerald-900"
                        : template === "vintage-maroon"
                        ? "text-rose-950"
                        : template === "official-sonod"
                        ? "text-amber-950"
                        : "text-slate-950"
                    }`}
                  >
                    {data.schoolName || "৭৭নং উত্তর বারপাড়া সরকারি প্রাথমিক বিদ্যালয়"}
                  </h2>
                  {/* Address & EMIS */}
                  <p className="text-xs sm:text-sm font-semibold text-slate-700">
                    গ্রাম: {data.village || "..."} • ডাকঘর: {data.postOffice || "..."} • উপজেলা:{" "}
                    {data.upazila || "..."} • জেলা: {data.zilla || "..."}
                  </p>
                  <p className="text-xs font-bold text-slate-800">
                    ইএমআইএস (EMIS) কোড:{" "}
                    <span className="font-mono tracking-widest">{data.emisCode || "৯১৩০১১০৩০০৫"}</span>
                  </p>
                </div>

                {/* Right: Bangladesh Primary Grading Scale Box */}
                <div className="w-52 text-right">
                  <div
                    className={`inline-block text-left p-1.5 rounded-lg border text-[10px] font-bold leading-tight ${
                      template === "dpe-green"
                        ? "border-emerald-700 bg-emerald-50/60 text-emerald-950"
                        : template === "vintage-maroon"
                        ? "border-rose-700 bg-rose-50/60 text-rose-950"
                        : "border-slate-400 bg-slate-50 text-slate-900"
                    }`}
                  >
                    <div className="text-center font-black pb-0.5 border-b border-current mb-0.5">
                      মূল্যায়ন গ্রেডিং স্কেল
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[9.5px]">
                      <span>ক (৮০-১০০%)</span>
                      <span className="font-black text-right">অতি উত্তম</span>
                      <span>খ (৬০-৭৯%)</span>
                      <span className="font-black text-right">উত্তম</span>
                      <span>গ (৪০-৫৯%)</span>
                      <span className="font-black text-right">সন্তোষজনক</span>
                      <span>ঘ (৩৩-৩৯%)</span>
                      <span className="font-black text-right">অগ্রগতি প্রয়োজন</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* MEMO NO & ISSUE DATE BAR */}
              <div className="flex items-center justify-between px-8 pt-2 text-xs sm:text-sm font-bold border-b border-slate-300/80 pb-1.5">
                <div>
                  <span>স্মারক নং: </span>
                  <span className="font-medium underline decoration-dotted underline-offset-4">
                    {data.memoNo || "উঃবাঃসঃপ্রাঃবিঃ/২০২৬/০৮"}
                  </span>
                </div>

                {/* Center Title Badge */}
                <div className="relative">
                  {template === "official-sonod" ? (
                    <RibbonMedalBadgeSvg text={data.certificateType} className="w-20 h-20 -my-3" />
                  ) : (
                    <div
                      className={`inline-block px-8 py-1 rounded-full border-2 text-base sm:text-xl font-black tracking-wider shadow-xs ${
                        template === "dpe-green"
                          ? "bg-emerald-800 text-white border-emerald-950"
                          : template === "vintage-maroon"
                          ? "bg-rose-900 text-white border-rose-950"
                          : template === "golden-royal"
                          ? "bg-amber-800 text-white border-amber-950"
                          : "bg-slate-950 text-white border-slate-800"
                      }`}
                    >
                      {data.certificateType}
                    </div>
                  )}
                </div>

                <div>
                  <span>তারিখ: </span>
                  <span className="font-medium underline decoration-dotted underline-offset-4">
                    {data.issueDate || "১২/১১/২০২৬ খ্রিঃ"}
                  </span>
                </div>
              </div>
            </div>

            {/* -------------------------------------------
                2. BODY TEXT (FILLED VS BLANK FORMAT)
                ------------------------------------------- */}
            <div
              role="region"
              aria-label="প্রত্যয়নপত্রের মূল বিবরণ"
              className="certificate-print-body relative z-10 px-6 sm:px-10 py-3 text-slate-950 leading-relaxed sm:leading-[2.4] text-justify text-sm sm:text-base md:text-[17px]"
            >
              {printMode === "filled" ? (
                /* 🌟 DIGITAL FILLED MODE */
                <p>
                  এই মর্মে প্রত্যয়ন করা যাইতেছে যে,{" "}
                  <strong className="font-black text-slate-950 underline decoration-slate-400 underline-offset-4">
                    {data.studentName || "................................................"}
                  </strong>
                  , পিতা:{" "}
                  <strong className="font-bold underline decoration-slate-400 underline-offset-4">
                    {data.fatherName || "...................................."}
                  </strong>
                  , মাতা:{" "}
                  <strong className="font-bold underline decoration-slate-400 underline-offset-4">
                    {data.motherName || "...................................."}
                  </strong>
                  , গ্রাম:{" "}
                  <span className="font-semibold underline decoration-slate-400 underline-offset-4">
                    {data.studentVillage || data.village || "..........."}
                  </span>
                  , ডাকঘর:{" "}
                  <span className="font-semibold underline decoration-slate-400 underline-offset-4">
                    {data.studentPost || data.postOffice || "..........."}
                  </span>
                  , উপজেলা:{" "}
                  <span className="font-semibold underline decoration-slate-400 underline-offset-4">
                    {data.studentUpazila || data.upazila || "..........."}
                  </span>
                  , জেলা:{" "}
                  <span className="font-semibold underline decoration-slate-400 underline-offset-4">
                    {data.studentZilla || data.zilla || "..........."}
                  </span>
                  । সে এই বিদ্যালয়ের{" "}
                  <strong className="font-black underline decoration-slate-400 underline-offset-4">
                    {data.academicYear || "২০২৫"}
                  </strong>{" "}
                  শিক্ষাবর্ষে{" "}
                  <strong className="font-bold underline decoration-slate-400 underline-offset-4">
                    {data.assessmentStage || "৩য় প্রান্তিক মূল্যায়ন"}
                  </strong>
                  -এ অংশ গ্রহণ করিয়া{" "}
                  <strong className="font-black underline decoration-slate-400 underline-offset-4">
                    {data.passedClass || "৫ম শ্রেণি"}
                  </strong>{" "}
                  হইতে উত্তীর্ণ হইয়াছে। তাহার প্রাপ্ত গ্রেড:{" "}
                  <strong className="font-black text-emerald-800 text-lg px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-300">
                    &ldquo;{data.grade || "ক"}&rdquo; ({data.evaluationRemark || "অতি উত্তম"})
                  </strong>
                  , শ্রেণি রোল নম্বর:{" "}
                  <strong className="font-black underline decoration-slate-400 underline-offset-4">
                    {data.rollNo || "০৩"}
                  </strong>
                  , শাখা:{" "}
                  <strong className="font-bold underline decoration-slate-400 underline-offset-4">
                    {data.section || "ক"}
                  </strong>
                  । {data.isPromoted && <span className="font-bold">{data.promotedText}</span>}
                  <br />
                  <span className="mt-2 block">
                    {data.conductRemark ||
                      "আমার জানামতে সে কোন রাষ্ট্র ও সমাজ বিরোধী কাজের সাথে জড়িত নয়। তাহার স্বভাব-চরিত্র ভালো ও প্রশংসনীয়।"}
                  </span>
                  <span className="mt-1 block font-semibold text-slate-800">
                    আমি তাহার ভবিষ্যৎ জীবনের সর্বাঙ্গীন উন্নতি ও উজ্জ্বল সাফল্য কামনা করি।
                  </span>
                </p>
              ) : (
                /* 📝 BLANK HANDWRITTEN FORMAT MODE (DOTTED LINES) */
                <p>
                  এই মর্মে প্রত্যয়ন করা যাইতেছে যে,{" "}
                  <span className="font-mono tracking-widest text-slate-400">
                    .....................................................................................................................
                  </span>
                  , পিতা:{" "}
                  <span className="font-mono tracking-widest text-slate-400">
                    ..............................................................................
                  </span>
                  , মাতা:{" "}
                  <span className="font-mono tracking-widest text-slate-400">
                    ..............................................................................
                  </span>
                  , গ্রাম:{" "}
                  <span className="font-mono tracking-widest text-slate-400">..............................</span>,
                  ডাকঘর:{" "}
                  <span className="font-mono tracking-widest text-slate-400">..............................</span>,
                  উপজেলা:{" "}
                  <span className="font-mono tracking-widest text-slate-400">..............................</span>,
                  জেলা:{" "}
                  <span className="font-mono tracking-widest text-slate-400">..............................</span>। সে
                  এই বিদ্যালয়ের{" "}
                  <span className="font-mono tracking-widest text-slate-400">...................</span> শিক্ষাবর্ষে{" "}
                  <span className="font-mono tracking-widest text-slate-400">
                    ............................................................
                  </span>
                  -এ অংশ গ্রহণ করিয়া{" "}
                  <span className="font-mono tracking-widest text-slate-400">..............................</span>{" "}
                  হইতে উত্তীর্ণ হইয়াছে। তাহার প্রাপ্ত গ্রেড:{" "}
                  <span className="font-mono tracking-widest text-slate-400">..............................</span>,
                  শ্রেণি রোল নম্বর:{" "}
                  <span className="font-mono tracking-widest text-slate-400">..................</span>, শাখা:{" "}
                  <span className="font-mono tracking-widest text-slate-400">..................</span>। সে পরবর্তী
                  শ্রেণিতে উন্নীত হওয়ার যোগ্য।
                  <br />
                  <span className="mt-2 block">
                    আমার জানামতে সে কোন রাষ্ট্র ও সমাজ বিরোধী কাজের সাথে জড়িত নয়। তাহার স্বভাব-চরিত্র ভালো ও প্রশংসনীয়।
                  </span>
                  <span className="mt-1 block font-semibold text-slate-800">
                    আমি তাহার ভবিষ্যৎ জীবনের সর্বাঙ্গীন উন্নতি ও উজ্জ্বল সাফল্য কামনা করি।
                  </span>
                </p>
              )}
            </div>

            {/* -------------------------------------------
                3. FOOTER SIGNATURES & ROUND STAMP
                ------------------------------------------- */}
            <div className="certificate-print-footer relative z-10 px-8 pb-3 pt-2">
              <div className="flex items-end justify-between gap-4">
                {/* Left: Class Teacher Signature */}
                <div className="w-56 text-center space-y-1">
                  <div className="h-10 flex items-end justify-center">
                    <span className="font-['Kalpurush',cursive] text-slate-500 text-sm italic">
                      {data.classTeacherName ? `Signed: ${data.classTeacherName}` : ""}
                    </span>
                  </div>
                  <div className="border-t-2 border-slate-700/80 pt-1">
                    <p className="text-xs sm:text-sm font-bold text-slate-900">শ্রেণি শিক্ষকের স্বাক্ষর</p>
                    <p className="text-[11px] text-slate-500">তারিখ: .......................</p>
                  </div>
                </div>

                {/* Center: Official Round Seal Stamp (Toggleable) */}
                <div className="flex-1 flex justify-center items-center">
                  {data.showRoundSeal ? (
                    <SchoolSealSvg
                      schoolName={data.schoolName}
                      upazila={data.upazila}
                      zilla={data.zilla}
                      className="w-24 h-24 text-indigo-900/85 -mb-2"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-[10px] text-slate-400 font-bold select-none">
                      গোল সিলমোহর
                    </div>
                  )}
                </div>

                {/* Right: Head Teacher Signature & Seal */}
                <div className="w-64 text-center space-y-1">
                  <div className="h-10 flex items-end justify-center">
                    <span className="font-['Kalpurush',cursive] text-slate-700 text-sm font-bold italic">
                      {data.headTeacherName ? `Signed: ${data.headTeacherName}` : ""}
                    </span>
                  </div>
                  <div className="border-t-2 border-slate-700/80 pt-1">
                    <p className="text-xs sm:text-sm font-black text-slate-950">
                      {data.headTeacherDesignation || "প্রধান শিক্ষক"}
                    </p>
                    <p className="text-xs font-bold text-slate-700 leading-tight">
                      {data.schoolName}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {data.upazila ? `${data.upazila}, ` : ""}{data.zilla}।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

      {/* 🖼️ LIGHTBOX MODAL FOR ORIGINAL SCANNED SAMPLES */}
      {previewSampleModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-4xl w-full bg-white rounded-3xl p-4 shadow-2xl border border-slate-300 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                মূল স্ক্যানকৃত প্রত্যয়নপত্রের নমুনা প্রিভিউ
              </h3>
              <button
                type="button"
                onClick={() => setPreviewSampleModal(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative max-h-[75vh] overflow-auto rounded-2xl bg-slate-100 flex items-center justify-center p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewSampleModal}
                alt="Certificate Sample Large Preview"
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-md"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={previewSampleModal}
                download="certificate-sample-full.jpg"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-all"
              >
                <Download className="w-4 h-4" />
                <span>আসল সাইজে ছবি ডাউনলোড করুন</span>
              </a>

              <button
                type="button"
                onClick={() => setPreviewSampleModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔔 FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm font-bold shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
