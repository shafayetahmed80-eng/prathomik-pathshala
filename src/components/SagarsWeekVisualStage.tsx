"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Volume2, 
  Tv, 
  Sun, 
  Moon, 
  Heart, 
  TreePine, 
  Award,
  ChevronRight,
  School
} from "lucide-react";

interface SagarsWeekVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

interface RoutineActivity {
  id: string;
  time: string;
  title: string;
  bangla: string;
  type: "weekday" | "weekend";
  icon: string;
  detailsEn: string;
  highlight: string;
}

const WEEK_ACTIVITIES: RoutineActivity[] = [
  { id: "w1", time: "6:00 AM", title: "Wake Up & Prayers", bangla: "ঘুম থেকে ওঠা ও প্রার্থনা", type: "weekday", icon: "🤲", detailsEn: "On weekdays, Sagar gets up at 6:00 in the morning and says his morning prayers.", highlight: "Spiritual peace & fresh start" },
  { id: "w2", time: "7:00 AM", title: "Study with Grandfather", bangla: "দাদার সাথে পড়ালেখা", type: "weekday", icon: "👴", detailsEn: "Then he goes to his grandfather and studies Bangla and English with him.", highlight: "Bangla & English study guidance" },
  { id: "w3", time: "8:00 AM", title: "Morning Breakfast", bangla: "সকালের নাশতা", type: "weekday", icon: "🍳", detailsEn: "He has breakfast at 8:00 am with his family.", highlight: "Nutritious start before school" },
  { id: "w4", time: "9:00 AM", title: "Uniform & School", bangla: "পোশাক ও স্কুলে রওনা", type: "weekday", icon: "🎒", detailsEn: "Sagar puts on his uniform and leaves for school at 9:00 am because school starts at 10:00 am.", highlight: "Promptness & school readiness" },
  { id: "w5", time: "6:00 PM", title: "Bangla Homework", bangla: "সন্ধ্যার বাড়ির কাজ", type: "weekday", icon: "📖", detailsEn: "In the evening, Sagar does his homework. He loves Bangla; it's his favourite subject.", highlight: "Love for mother language Bangla" },
  { id: "w6", time: "9:00 PM", title: "Family TV & Grandparents", bangla: "পারিবারিক আড্ডা ও টিভি", type: "weekday", icon: "📺", detailsEn: "After homework, he spends time with his grandparents and watches TV with family.", highlight: "Quality family bonding" },
  { id: "w7", time: "11:00 PM", title: "Night Bedtime", bangla: "ঘুমাতে যাওয়া", type: "weekday", icon: "🌙", detailsEn: "He goes to bed at 11:00 pm after a productive day.", highlight: "Restful sleep" },
  { id: "we1", time: "Friday Afternoon", title: "Visit Aunt & Uncle", bangla: "চাচা-ফুফুর বাড়ি ভ্রমণ", type: "weekend", icon: "🏡", detailsEn: "On weekends, Sagar visits his aunt and uncle in the afternoon.", highlight: "Strengthening kinship" },
  { id: "we2", time: "Weekend Evening", title: "Park with Cousins", bangla: "কাজিনদের সাথে পার্কের খেলা", type: "weekend", icon: "🪁", detailsEn: "He and Keya play in the park with their cousins joyful outdoor games.", highlight: "Outdoor sports & fun with cousins" }
];

export const SagarsWeekVisualStage: React.FC<SagarsWeekVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeMode, setActiveMode] = useState<"all" | "weekday" | "weekend">("all");
  const [selectedAct, setSelectedAct] = useState<RoutineActivity>(WEEK_ACTIVITIES[0]);

  const filteredActivities = activeMode === "all" 
    ? WEEK_ACTIVITIES 
    : WEEK_ACTIVITIES.filter(a => a.type === activeMode);

  const handleSelectActivity = (act: RoutineActivity) => {
    setSelectedAct(act);
    playChime("pop");
    handleSpeak(act.detailsEn);
  };

  return (
    <div className={`w-full bg-gradient-to-br from-blue-50/70 via-indigo-50 to-teal-50/60 rounded-2xl border-2 border-indigo-200 overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xs ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
              Sagar's Weekly Routine
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                Class 4 • Unit 3 • Lesson 2
              </span>
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              কাজের দিন (Weekdays) বনাম ছুটির দিনের (Weekends) সুষম পরিকল্পনা
            </p>
          </div>
        </div>

        {/* Filter Toggle Buttons */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-indigo-200 shadow-2xs">
          <button
            onClick={() => { setActiveMode("all"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeMode === "all" 
                ? "bg-indigo-600 text-white shadow-xs" 
                : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            সব দিন
          </button>
          <button
            onClick={() => { setActiveMode("weekday"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeMode === "weekday" 
                ? "bg-indigo-600 text-white shadow-xs" 
                : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            কাজের দিন (Weekdays)
          </button>
          <button
            onClick={() => { setActiveMode("weekend"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeMode === "weekend" 
                ? "bg-indigo-600 text-white shadow-xs" 
                : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            ছুটির দিন (Weekends)
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="py-3 flex-1 flex flex-col justify-center space-y-3">
        {/* Ribbon of Activities */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-1.5">
          {filteredActivities.map((a) => {
            const isSelected = selectedAct.id === a.id;
            return (
              <button
                key={a.id}
                onClick={() => handleSelectActivity(a)}
                className={`p-2 rounded-xl text-center border-2 transition-all flex flex-col items-center justify-between ${
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-700 shadow-md scale-102"
                    : "bg-white hover:bg-indigo-50 text-slate-800 border-indigo-100 shadow-2xs hover:border-indigo-300"
                }`}
              >
                <span className="text-xl">{a.icon}</span>
                <span className="text-[10px] font-black truncate w-full mt-0.5">{a.time}</span>
                <span className={`text-[9px] font-bold truncate w-full ${isSelected ? "text-indigo-100" : "text-indigo-700"}`}>
                  {a.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Activity Spotlight Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-indigo-200 shadow-md relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-4xl">{selectedAct.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-100 text-indigo-800 border border-indigo-200">
                      {selectedAct.time}
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      {selectedAct.type === "weekday" ? "স্কুলের দিন" : "সাপ্তাহিক ছুটি"}
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5 flex items-center gap-2">
                    {selectedAct.title} ({selectedAct.bangla})
                    <button
                      onClick={() => handleSpeak(selectedAct.detailsEn)}
                      className="p-1 rounded-full text-indigo-600 hover:bg-indigo-50 transition-colors"
                      title="শুনুন"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100">
                "{selectedAct.detailsEn}"
              </p>
            </div>

            <div className="px-3.5 py-3 rounded-2xl bg-amber-50 border border-amber-200 text-center shrink-0">
              <span className="block text-[10px] font-bold text-amber-800 uppercase">মূল তাৎপর্য</span>
              <span className="text-xs font-black text-amber-900 max-w-[130px] block leading-tight mt-1">
                {selectedAct.highlight}
              </span>
            </div>
          </div>

          {/* Quick Navigation Footer inside card */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="font-medium text-indigo-800">
              ✓ সাগরের প্রিয় বিষয়: <strong>বাংলা (Bangla is his favourite subject)</strong>।
            </span>
            <button
              onClick={() => {
                const currentIndex = filteredActivities.findIndex(a => a.id === selectedAct.id);
                const nextIndex = (currentIndex + 1) % filteredActivities.length;
                handleSelectActivity(filteredActivities[nextIndex]);
              }}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-800 hover:bg-indigo-100 flex items-center gap-1 shrink-0"
            >
              <span>পরবর্তী রুটিন</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Quote Pill */}
      <div className="mt-2 pt-2 border-t border-indigo-100 flex items-center justify-between text-xs text-indigo-900 font-medium">
        <span className="flex items-center gap-1.5 italic">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          "Work hard on weekdays, enjoy family and nature on weekends!"
        </span>
        <span className="text-xs font-bold text-indigo-700">
          NCTB Class 4 Page 16–18
        </span>
      </div>
    </div>
  );
};

export default SagarsWeekVisualStage;
