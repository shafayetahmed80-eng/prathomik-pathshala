"use client";

import { useState, useEffect } from "react";
import { Award, Printer, X, Sparkles, CheckCircle, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { playSuccessChime } from "@/utils/bornomalaAudio";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  stars: number;
  languageMode?: "bangla" | "english";
}

export default function BornomalaCertificateModal({ isOpen, onClose, stars, languageMode = "bangla" }: Props) {
  const [certLang, setCertLang] = useState<"bangla" | "english">(languageMode);
  const [studentName, setStudentName] = useState<string>(languageMode === "english" ? "Champion Learner" : "সোনামণি");
  const [todayDate, setTodayDate] = useState<string>("");

  useEffect(() => {
    setCertLang(languageMode);
    if (languageMode === "english") {
      setStudentName("Champion Learner");
    } else {
      setStudentName("সোনামণি");
    }
  }, [languageMode]);

  useEffect(() => {
    if (certLang === "english") {
      setTodayDate(
        new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    } else {
      setTodayDate(
        new Date().toLocaleDateString("bn-BD", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }
  }, [certLang]);

  // Keyboard Escape listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    playSuccessChime();
    window.print();
  };

  const isEn = certLang === "english";

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-title"
      >
        {/* Controls Bar (Hidden in Print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 print:hidden shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg font-bold">
              🎓
            </div>
            <div>
              <h3 id="cert-title" className="text-base sm:text-lg font-black text-slate-900">
                {isEn ? "Certificate of Excellence" : "হাতেখড়ি সম্মাননা সনদপত্র"}
              </h3>
              <p className="text-xs text-slate-500">
                {isEn ? "Recognition certificate for English Alphabet & Phonics" : "সফলভাবে বর্ণমালা শেখার স্বীকৃতি সনদ"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Cert Language Toggle */}
            <div className="flex items-center bg-slate-200 p-0.5 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setCertLang("bangla")}
                className={`px-2 py-1 rounded-lg transition-all ${
                  certLang === "bangla" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
                }`}
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => setCertLang("english")}
                className={`px-2 py-1 rounded-lg transition-all ${
                  certLang === "english" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
                }`}
              >
                English
              </button>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>{isEn ? "Print / Save" : "প্রিন্ট / সেভ করুন"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-200 transition-colors"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Input Bar (Hidden in Print) */}
        <div className="p-4 bg-amber-50/70 border-b border-amber-200 flex flex-wrap items-center gap-3 print:hidden">
          <label htmlFor="student-name-input" className="text-xs font-bold text-amber-900">
            {isEn ? "Student's Full Name:" : "শিক্ষার্থীর নাম লিখুন:"}
          </label>
          <input
            id="student-name-input"
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder={isEn ? "e.g., Aayan Ahmed" : "যেমন: আয়ান আহমেদ"}
            className="px-3.5 py-1.5 rounded-xl border border-amber-300 text-xs sm:text-sm font-bold bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 max-w-xs flex-1"
          />
        </div>

        {/* Certificate Printable Body */}
        <div className="p-4 sm:p-8 bg-slate-100 print:bg-white print:p-0">
          <div className="certificate-print-area cert-print-area max-w-[210mm] mx-auto bg-gradient-to-br from-amber-50/80 via-white to-pink-50/80 p-8 sm:p-12 border-8 border-double border-amber-400 rounded-3xl shadow-xl text-center relative overflow-hidden print:border-8 print:shadow-none print:w-full print:rounded-2xl">
            {/* Watermark Emblem */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none text-9xl">
              {isEn ? "🏆" : "🌺"}
            </div>

            {/* Header Emblem */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-white text-3xl shadow-lg border-4 border-white">
                🏅
              </div>
            </div>

            <div className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-1">
              {isEn ? "Prathomik Pathshala • Smart Primary Education Platform" : "প্রাথমিক পাঠশালা • স্মার্ট এডুকেশন প্ল্যাটফর্ম"}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-wide mb-2 font-serif">
              {isEn ? "Certificate of Excellence" : "হাতেখড়ি সম্মাননা সনদপত্র"}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6">
              {isEn 
                ? "This Certificate is Proudly Awarded For Successful Learning of English Alphabet, Phonics & Handwriting to:" 
                : "আনন্দের সাথে বাংলা বর্ণমালা ও সংখ্যা শিখন সফলভাবে সম্পন্ন করার জন্য প্রদান করা হলো:"}
            </p>

            {/* Recipient Name */}
            <div className="my-6 py-2 border-b-2 border-amber-400 max-w-md mx-auto">
              <span className="text-2xl sm:text-4xl font-black text-pink-600 font-serif">
                {studentName || (isEn ? "Champion Learner" : "সোনামণি")}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-lg mx-auto mb-8 font-medium">
              {isEn ? (
                <>
                  For demonstrating exceptional enthusiasm and mastering the 26 English letters (A-Z, a-z), 
                  Phonics pronunciations, and 4-line ruled handwriting, earning a total of{" "}
                  <strong className="text-amber-800 font-bold">{stars || 50} Golden Stars</strong>!
                </>
              ) : (
                <>
                  যিনি ডিজিটাল বর্ণমালা ও হাতেখড়ি ল্যাবে স্বরবর্ণ, ব্যঞ্জনবর্ণ ও সংখ্যা হাত ঘুরিয়ে সুন্দরভাবে লিখে এবং শুদ্ধ উচ্চারণে 
                  মোট <strong className="text-amber-800 font-bold">{stars || 50} স্টার পয়েন্ট</strong> অর্জন করেছেন।
                </>
              )}
            </p>

            {/* Badges / Rating */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-2xl text-amber-500 animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
                  ⭐
                </span>
              ))}
            </div>

            {/* Signatures & Date */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-dashed border-amber-300 max-w-md mx-auto text-xs text-slate-600">
              <div>
                <div className="font-bold text-slate-800 mb-1">{todayDate}</div>
                <div className="h-0.5 w-24 bg-slate-400 mx-auto mb-1" />
                <span>{isEn ? "Date of Award" : "প্রদানের তারিখ"}</span>
              </div>
              <div>
                <div className="font-bold text-slate-800 mb-1">{isEn ? "Teacher / Principal" : "প্রাথমিক পাঠশালা"}</div>
                <div className="h-0.5 w-24 bg-slate-400 mx-auto mb-1" />
                <span>{isEn ? "Signature / Evaluation" : "পরিচালক / শিক্ষক"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
