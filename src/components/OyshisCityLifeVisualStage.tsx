"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Volume2, Heart, Bus, Flower2, BookOpen, Sun, Award, Check, RefreshCw, Star, Droplets } from "lucide-react";
import confetti from "canvas-confetti";

interface OyshisCityLifeVisualStageProps {
  slideId: number;
  playChime?: (type: "correct" | "click" | "fanfare") => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

interface PlantPot {
  id: string;
  name: string;
  bangla: string;
  icon: string;
  harvested: boolean;
  waterLevel: number;
}

interface LibraryBook {
  id: string;
  title: string;
  bangla: string;
  type: string;
  icon: string;
}

export default function OyshisCityLifeVisualStage({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}: OyshisCityLifeVisualStageProps) {
  // Modes: "rooftop" (Garden) | "library" (Mobile library bus) | "explore"
  const [activeMode, setActiveMode] = useState<"rooftop" | "library" | "explore">(() => {
    if (slideId === 5) return "rooftop";
    if (slideId === 6) return "library";
    return "rooftop";
  });

  // Plants in clay pots
  const [plants, setPlants] = useState<PlantPot[]>([
    { id: "tomatoes", name: "Red Tomatoes", bangla: "লাল টমেটো", icon: "🍅", harvested: false, waterLevel: 2 },
    { id: "chilies", name: "Green Chilies", bangla: "কাঁচামরিচ", icon: "🌶️", harvested: false, waterLevel: 1 },
    { id: "coriander", name: "Fresh Coriander", bangla: "ধনেপাতা", icon: "🌿", harvested: false, waterLevel: 2 },
    { id: "marigold", name: "Marigold Flowers", bangla: "গাঁদা ফুল", icon: "🌼", harvested: false, waterLevel: 3 },
  ]);

  const [isWatering, setIsWatering] = useState<boolean>(false);

  // Mobile Library Books
  const [borrowedBook, setBorrowedBook] = useState<LibraryBook | null>({
    id: "fairy1",
    title: "Illustrated Fairy Tales",
    bangla: "সচিত্র রূপকথার গল্প",
    type: "Fairy Tale",
    icon: "🧚",
  });

  const BOOKS: LibraryBook[] = [
    { id: "fairy1", title: "Illustrated Fairy Tales", bangla: "সচিত্র রূপকথার গল্প", type: "Fairy Tale", icon: "🧚" },
    { id: "science1", title: "Fun Science for Kids", bangla: "মজার বিজ্ঞান", type: "Science", icon: "🚀" },
    { id: "animal1", title: "Stories of Wild Animals", bangla: "পশুপাখির অভিযান", type: "Nature", icon: "🦁" },
    { id: "space1", title: "Stars and Planets", bangla: "নক্ষত্র ও গ্রহ", type: "Astronomy", icon: "🪐" },
  ];

  // Sync mode with slide changes
  useEffect(() => {
    if (slideId === 5) {
      setActiveMode("rooftop");
    } else if (slideId === 6) {
      setActiveMode("library");
    } else if (slideId === 2) {
      setActiveMode("explore");
    } else {
      setActiveMode("rooftop");
    }
  }, [slideId]);

  // Water the plants
  const handleWaterPlants = () => {
    setIsWatering(true);
    playChime?.("click");
    handleSpeak("Oyshi and her father water the red tomatoes, green chilies, coriander and marigold flowers in clay pots!");

    setPlants((prev) =>
      prev.map((p) => ({ ...p, waterLevel: 4 }))
    );

    setTimeout(() => {
      setIsWatering(false);
      playChime?.("fanfare");
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
    }, 1200);
  };

  // Harvest plant
  const handleHarvest = (id: string, name: string) => {
    playChime?.("correct");
    setPlants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, harvested: !p.harvested } : p))
    );
    handleSpeak(`Picked fresh ${name} from the rooftop garden! Delicious and organic!`);
  };

  // Borrow Book from Mobile Library
  const handleBorrowBook = (book: LibraryBook) => {
    setBorrowedBook(book);
    playChime?.("fanfare");
    handleSpeak(`Oyshi borrows '${book.title}' from the colourful mobile library bus! Happy reading!`);
    confetti({ particleCount: 35, spread: 65, origin: { y: 0.6 } });
  };

  return (
    <div className={`flex flex-col h-full rounded-3xl bg-linear-to-b from-emerald-50 via-sky-50 to-amber-50 border border-slate-200 shadow-2xs overflow-hidden ${isFullTheater ? "p-4 sm:p-6" : "p-3 sm:p-4"}`}>
      {/* Top Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2.5 border-b border-emerald-200/80 shrink-0">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-2xl bg-emerald-600 text-white shadow-xs text-base">
            🏙️
          </span>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-200">
                Dhaka City
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">
                6th Floor Apartment
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-black text-slate-800">
              Oyshi's City Life — Rooftop Garden & Mobile Library (ঐশীর ছাদবাগান)
            </h3>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 bg-white/80 p-1 rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => {
              setActiveMode("rooftop");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 whitespace-nowrap ${
              activeMode === "rooftop"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>🍅</span>
            <span>ছাদবাগান (Garden)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode("library");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 whitespace-nowrap ${
              activeMode === "library"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>🚌</span>
            <span>ভ্রাম্যমাণ লাইব্রেরি (Library)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode("explore");
              playChime?.("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 whitespace-nowrap ${
              activeMode === "explore"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>🔍</span>
            <span>নগরজীবন ল্যাব</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Canvas */}
      <div className="relative flex-1 min-h-[300px] w-full mt-2.5 rounded-2xl overflow-hidden border border-emerald-200/80 bg-linear-to-b from-sky-200 via-sky-100 to-emerald-100 select-none flex flex-col justify-between p-3">
        {/* Dhaka Skyline Backdrop */}
        <div className="absolute top-2.5 left-3 z-10 flex items-center gap-2">
          <div className="px-3 py-1 rounded-xl bg-white/95 backdrop-blur-xs border border-sky-300 shadow-2xs text-[11px] font-black text-slate-800 flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: "12s" }} />
            <span>ঢাকা মহানগরী • ৬ষ্ঠ তলার অ্যাপার্টমেন্টের ছাদবাগান</span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MODE 1: ROOFTOP GARDEN STUDIO                                 */}
        {/* ------------------------------------------------------------- */}
        {activeMode === "rooftop" && (
          <div className="relative w-full h-full flex flex-col justify-between z-10 pt-8">
            {/* Rooftop view with Father & Oyshi */}
            <div className="flex items-center justify-between px-2 sm:px-6">
              <div className="flex items-end gap-3">
                <div className="flex flex-col items-center">
                  <span className="px-1.5 py-0.2 rounded-md bg-emerald-600 text-white text-[9px] font-bold shadow-2xs">
                    Oyshi (ঐশী)
                  </span>
                  <span className="text-3xl sm:text-4xl filter drop-shadow-md">
                    👧🪴
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="px-1.5 py-0.2 rounded-md bg-sky-600 text-white text-[9px] font-bold shadow-2xs">
                    Father (বাবা)
                  </span>
                  <span className="text-3xl sm:text-4xl filter drop-shadow-md">
                    👨🌾
                  </span>
                </div>
              </div>

              {/* Watering Can Action Button */}
              <button
                type="button"
                onClick={handleWaterPlants}
                disabled={isWatering}
                className="px-3.5 py-2 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Droplets className={`w-4 h-4 fill-current ${isWatering ? "animate-bounce text-amber-300" : ""}`} />
                <span>{isWatering ? "গাছে পানি দেওয়া হচ্ছে..." : "গাছে পানি দাও ➔"}</span>
              </button>
            </div>

            {/* 4 Clay Pots on the Rooftop Railing */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3">
              {plants.map((plant) => (
                <div
                  key={plant.id}
                  onClick={() => handleHarvest(plant.id, plant.name)}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-between text-center ${
                    plant.harvested
                      ? "bg-amber-50 border-amber-400 scale-102 shadow-sm"
                      : "bg-white/95 border-emerald-300 hover:border-emerald-500 shadow-2xs hover:scale-105"
                  }`}
                >
                  <span className="text-3xl sm:text-4xl filter drop-shadow-xs mb-1">
                    {plant.icon}
                  </span>
                  <h5 className="font-black text-xs text-slate-800">{plant.name}</h5>
                  <p className="text-[10px] text-emerald-800 font-bold">{plant.bangla}</p>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-700 font-bold">
                      মাটির টব (Clay pot)
                    </span>
                    {plant.harvested && (
                      <span className="text-[9px] px-1 rounded-md bg-amber-400 text-amber-950 font-black">
                        তোলা হয়েছে!
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Motto */}
            <div className="p-2.5 rounded-2xl bg-white/95 border border-emerald-200 shadow-xs flex items-center justify-between text-xs text-slate-700 font-medium">
              <span>"She and her father grow red tomatoes, green chilies, coriander and marigolds."</span>
              <span className="text-emerald-800 font-black text-[11px] hidden sm:inline">
                মাটির টবে তাজা ও সুস্বাদু সবজির ছাদবাগান 🌱
              </span>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE 2: MOBILE LIBRARY BUS                                    */}
        {/* ------------------------------------------------------------- */}
        {activeMode === "library" && (
          <div className="relative w-full h-full flex flex-col justify-between z-10 pt-4">
            {/* Top Library Banner */}
            <div className="bg-amber-900/90 text-white p-2.5 rounded-2xl border border-amber-700 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🚌</span>
                <div>
                  <h4 className="text-xs font-black">বিশ্বসাহিত্য কেন্দ্র ভ্রাম্যমাণ লাইব্রেরি (Mobile Library Bus)</h4>
                  <p className="text-[10px] text-amber-200">"Every Friday afternoon, a colourful mobile library arrives."</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-amber-950">
                Friday Afternoon 📚
              </span>
            </div>

            {/* Currently Borrowed Book Spotlight */}
            <div className="flex-1 flex flex-col items-center justify-center my-2">
              <div className="w-full max-w-sm p-3 rounded-2xl bg-white border-2 border-amber-400 shadow-md flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl p-2 rounded-2xl bg-amber-100 border border-amber-200">
                    {borrowedBook?.icon || "📖"}
                  </span>
                  <div>
                    <span className="px-2 py-0.2 rounded-full text-[9px] font-black bg-amber-100 text-amber-900">
                      Borrowed Book (নেওয়া বই)
                    </span>
                    <h5 className="font-black text-xs sm:text-sm text-slate-900 mt-0.5">
                      {borrowedBook?.title}
                    </h5>
                    <p className="text-[10px] text-slate-600 font-bold">
                      {borrowedBook?.bangla}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleSpeak(`Oyshi is reading ${borrowedBook?.title}. A delightful book from the mobile library!`)}
                  className="p-2 rounded-xl bg-amber-100 text-amber-800 hover:bg-amber-200 shadow-2xs"
                  title="শুনুন"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Shelf of Available Books inside the Bus */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 w-full">
                {BOOKS.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => handleBorrowBook(book)}
                    className="p-2 rounded-xl bg-white/90 border border-amber-300 hover:border-amber-500 cursor-pointer shadow-2xs text-center flex flex-col items-center justify-between"
                  >
                    <span className="text-2xl">{book.icon}</span>
                    <span className="text-[10px] font-black text-slate-800 mt-1 line-clamp-1">{book.title}</span>
                    <span className="text-[9px] text-amber-800 font-bold">{book.type}</span>
                    <span className="mt-1 text-[9px] px-2 py-0.2 rounded-md bg-amber-500 text-white font-bold">
                      বই নাও ➔
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Motto */}
            <div className="p-2 rounded-2xl bg-white border border-amber-200 text-center text-xs text-amber-950 font-bold">
              ঐশী প্রতি শুক্রবার বিকেলে লাইব্রেরি বাস থেকে নতুন বই নেয় এবং সচিত্র রূপকথা ও বিজ্ঞানের বই পড়তে ভালোবাসে।
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE 3: CITY LIFE EXPLORER                                    */}
        {/* ------------------------------------------------------------- */}
        {activeMode === "explore" && (
          <div className="relative w-full h-full flex flex-col justify-between z-10 pt-4">
            {/* Top Banner */}
            <div className="bg-purple-900/90 text-white p-2.5 rounded-2xl border border-purple-700 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔍</span>
                <div>
                  <h4 className="text-xs font-black">নগরজীবন ও উদ্ভাবন ল্যাব (City Life & Innovation Explorer)</h4>
                  <p className="text-[10px] text-purple-200">শহরের সীমাবদ্ধতার মাঝেও আনন্দ ও প্রকৃতির মেলবন্ধন</p>
                </div>
              </div>
            </div>

            {/* 4 Thematic Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-2 flex-1">
              <div
                onClick={() => handleSpeak("Oyshi lives in a sixth-floor apartment in Dhaka city.")}
                className="p-3 rounded-2xl bg-white border-2 border-sky-200 hover:border-sky-400 cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏢</span>
                  <h5 className="font-black text-xs text-sky-950">৬ষ্ঠ তলার অ্যাপার্টমেন্ট (Apartment)</h5>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  খোলা মাঠ না থাকলেও আধুনিক শহরের বহুতল ভবনে বসবাস করে ঐশী।
                </p>
              </div>

              <div
                onClick={() => handleSpeak("Oyshi has a wonderful rooftop garden with tomatoes and chilies.")}
                className="p-3 rounded-2xl bg-white border-2 border-emerald-200 hover:border-emerald-400 cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🪴</span>
                  <h5 className="font-black text-xs text-emerald-950">ছাদবাগান (Rooftop Garden)</h5>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  বাবার সাথে মাটির টবে তাজা টমেটো, মরিচ ও গাঁদা ফুল ফুটিয়ে ছাদকে সবুজ উদ্যানে রূপান্তর।
                </p>
              </div>

              <div
                onClick={() => handleSpeak("Every Friday afternoon, a colourful mobile library arrives.")}
                className="p-3 rounded-2xl bg-white border-2 border-amber-200 hover:border-amber-400 cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚌</span>
                  <h5 className="font-black text-xs text-amber-950">ভ্রাম্যমাণ লাইব্রেরি (Mobile Library)</h5>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  দরজার কাছেই জ্ঞানের জগৎ; প্রতি সপ্তাহে নতুন রূপকথা ও বিজ্ঞানের সচিত্র বই পড়ার সুযোগ।
                </p>
              </div>

              <div
                onClick={() => handleSpeak("Oyshi enjoys her lively city life very much.")}
                className="p-3 rounded-2xl bg-white border-2 border-purple-200 hover:border-purple-400 cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌟</span>
                  <h5 className="font-black text-xs text-purple-950">প্রফুল্ল নগরজীবন (Lively City Life)</h5>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  প্রকৃতি ও বইয়ের সান্নিধ্যে আনন্দের সাথে শহর জীবন উপভোগ করার অনুপ্রেরণা।
                </p>
              </div>
            </div>

            {/* Bottom Motto */}
            <div className="p-2 rounded-2xl bg-white border border-purple-200 text-center text-xs text-purple-950 font-bold">
              "Oyshi enjoys her lively city life very much."
            </div>
          </div>
        )}
      </div>

      {/* Footer Educational Motto Bar */}
      <div className="mt-2.5 pt-2 border-t border-emerald-200/80 flex items-center justify-between text-[11px] text-emerald-950 font-bold shrink-0">
        <span className="flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>"Green rooftop gardens and good books make city life vibrant and joyful."</span>
        </span>
        <span className="text-emerald-800 text-[10px] font-semibold hidden sm:inline">
          সবুজ ছাদবাগান ও বইয়ের আলোয় উজ্জ্বল নগরজীবন 🌸
        </span>
      </div>
    </div>
  );
}
