"use client";

import React, { useState } from "react";
import { 
  Users, 
  Briefcase, 
  BookOpen, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  Volume2, 
  Utensils, 
  Flower2, 
  Sprout, 
  Award,
  ChevronRight,
  RotateCcw
} from "lucide-react";

interface SagarFamilyVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  banglaRelation: string;
  ageOrJob: string;
  hobbyOrSpecialty: string;
  descriptionEn: string;
  emoji: string;
  themeColor: string;
}

const FAMILY_MEMBERS: FamilyMember[] = [
  { 
    id: "sagar", 
    name: "Sagar", 
    relation: "Self (Class 4 Student)", 
    banglaRelation: "সাগর (নিজে)", 
    ageOrJob: "9 years old • Class 4", 
    hobbyOrSpecialty: "Studies with grandfather, loves pitha", 
    descriptionEn: "Hi, I'm Sagar. I'm nine years old and I study in Class 4.", 
    emoji: "👦", 
    themeColor: "from-blue-500 to-indigo-600" 
  },
  { 
    id: "keya", 
    name: "Keya", 
    relation: "Little Sister", 
    banglaRelation: "ছোট বোন", 
    ageOrJob: "3 years old", 
    hobbyOrSpecialty: "Loves playing and hearing stories", 
    descriptionEn: "Keya is Sagar's three-year-old cute little sister.", 
    emoji: "👧", 
    themeColor: "from-pink-500 to-rose-600" 
  },
  { 
    id: "father", 
    name: "Mr. Father", 
    relation: "Father", 
    banglaRelation: "বাবা", 
    ageOrJob: "Lawyer (আইনজীবী)", 
    hobbyOrSpecialty: "Helps people in legal court", 
    descriptionEn: "Sagar's father is a respected lawyer.", 
    emoji: "👨‍💼", 
    themeColor: "from-slate-600 to-slate-800" 
  },
  { 
    id: "mother", 
    name: "Mrs. Mother", 
    relation: "Mother", 
    banglaRelation: "মা", 
    ageOrJob: "Homemaker (গৃহিণী)", 
    hobbyOrSpecialty: "Maintains a wonderful vegetable garden", 
    descriptionEn: "Sagar's mother is a homemaker. She grows delicious tomatoes and cucumbers.", 
    emoji: "👩‍🌾", 
    themeColor: "from-emerald-500 to-teal-700" 
  },
  { 
    id: "grandfather", 
    name: "Grandfather", 
    relation: "Grandfather", 
    banglaRelation: "দাদা", 
    ageOrJob: "Retired School Teacher", 
    hobbyOrSpecialty: "Helps with homework & plays with Sagar", 
    descriptionEn: "Grandfather was a school teacher. He helps Sagar with his studies.", 
    emoji: "👴", 
    themeColor: "from-amber-600 to-orange-700" 
  },
  { 
    id: "grandmother", 
    name: "Grandmother", 
    relation: "Grandmother", 
    banglaRelation: "দাদি", 
    ageOrJob: "Works at Home", 
    hobbyOrSpecialty: "Makes the best pithes in the world", 
    descriptionEn: "Grandmother makes the best pithes and helps in the garden.", 
    emoji: "👵", 
    themeColor: "from-purple-500 to-violet-700" 
  }
];

export const SagarFamilyVisualStage: React.FC<SagarFamilyVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"familyTree" | "garden" | "pithaKitchen">("familyTree");
  const [selectedMember, setSelectedMember] = useState<FamilyMember>(FAMILY_MEMBERS[0]);

  // Garden State
  const [waterCount, setWaterCount] = useState<number>(0);
  const [isHarvestReady, setIsHarvestReady] = useState<boolean>(false);

  // Pitha Kitchen State
  const [selectedPitha, setSelectedPitha] = useState<string>("ভাপা পিঠা (Vapa Pitha)");

  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMember(member);
    playChime("pop");
    handleSpeak(member.descriptionEn);
  };

  const handleWaterGarden = () => {
    if (waterCount + 1 >= 3) {
      setWaterCount(3);
      setIsHarvestReady(true);
      playChime("fanfare");
      handleSpeak("Wonderful! Tomatoes and cucumbers are ripe and delicious!");
    } else {
      setWaterCount(prev => prev + 1);
      playChime("correct");
      handleSpeak("Watering the vegetable plants!");
    }
  };

  const resetGarden = () => {
    setWaterCount(0);
    setIsHarvestReady(false);
    playChime("pop");
  };

  return (
    <div className={`w-full bg-gradient-to-br from-emerald-50/70 via-teal-50 to-blue-50/60 rounded-2xl border-2 border-emerald-200 overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xs ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-100 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
              Sagar and His Family
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Class 4 • Unit 3
              </span>
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              সাগরের পরিবার, পেশা, সুস্বাদু পিঠা এবং শসা ও টমেটোর বাগান
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-emerald-200 shadow-2xs">
          <button
            onClick={() => { setActiveTab("familyTree"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === "familyTree" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>ফ্যামিলি ট্রি</span>
          </button>
          <button
            onClick={() => { setActiveTab("garden"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === "garden" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>সবজি বাগান</span>
          </button>
          <button
            onClick={() => { setActiveTab("pithaKitchen"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === "pithaKitchen" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>দাদির পিঠাঘর</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="py-3 flex-1 flex flex-col justify-center">
        {/* TAB 1: INTERACTIVE FAMILY TREE */}
        {activeTab === "familyTree" && (
          <div className="space-y-3">
            {/* Family Members Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {FAMILY_MEMBERS.map((m) => {
                const isSelected = selectedMember.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleSelectMember(m)}
                    className={`p-2.5 rounded-xl text-center border-2 transition-all flex flex-col items-center justify-between ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-700 shadow-md scale-105"
                        : "bg-white hover:bg-emerald-50 text-slate-800 border-emerald-100 shadow-2xs hover:border-emerald-300"
                    }`}
                  >
                    <span className="text-2xl">{m.emoji}</span>
                    <span className="text-xs font-black truncate w-full mt-1">{m.name}</span>
                    <span className={`text-[10px] font-bold truncate w-full ${isSelected ? "text-emerald-100" : "text-emerald-700"}`}>
                      {m.banglaRelation}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Member Detail Showcase Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-emerald-200 shadow-md relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-4xl">{selectedMember.emoji}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {selectedMember.relation}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          {selectedMember.ageOrJob}
                        </span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5 flex items-center gap-2">
                        {selectedMember.name} ({selectedMember.banglaRelation})
                        <button
                          onClick={() => handleSpeak(selectedMember.descriptionEn)}
                          className="p-1 rounded-full text-emerald-600 hover:bg-emerald-50 transition-colors"
                          title="শুনুন"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
                    "{selectedMember.descriptionEn}"
                  </p>
                </div>

                <div className="px-3.5 py-3 rounded-2xl bg-amber-50 border border-amber-200 text-center shrink-0">
                  <span className="block text-[10px] font-bold text-amber-800 uppercase">পারিবারিক দায়িত্ব</span>
                  <span className="text-xs font-black text-amber-900 max-w-[130px] block leading-tight mt-1">
                    {selectedMember.hobbyOrSpecialty}
                  </span>
                </div>
              </div>

              {/* Next Member button */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="font-medium text-emerald-800">
                  ✓ যৌথ পরিবারের পারস্পরিক ভালোবাসা ও সহযোগিতার অনন্য উদাহরণ।
                </span>
                <button
                  onClick={() => {
                    const currentIndex = FAMILY_MEMBERS.findIndex(m => m.id === selectedMember.id);
                    const nextIndex = (currentIndex + 1) % FAMILY_MEMBERS.length;
                    handleSelectMember(FAMILY_MEMBERS[nextIndex]);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 flex items-center gap-1 shrink-0"
                >
                  <span>পরবর্তী সদস্য</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MOTHER & GRANDMOTHER'S VEGETABLE GARDEN */}
        {activeTab === "garden" && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-emerald-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200 inline-block mb-1">
                  🍅🥒 Mother's Wonderful Vegetable Garden
                </span>
                <h4 className="text-base font-black text-slate-900">
                  "She grows the best tomatoes and cucumbers in the neighborhood!"
                </h4>
                <p className="text-xs text-slate-600">
                  দাদি ও মা মিলে বাগানে পানি দেন ও যত্ন নেন। নিচে পানি দেওয়ার বাটনে ক্লিক করো:
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleWaterGarden}
                  className="px-3.5 py-2 rounded-xl text-xs font-black bg-emerald-600 text-white hover:bg-emerald-700 shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <span>💧 পানি দিন ({waterCount}/3)</span>
                </button>
                {isHarvestReady && (
                  <button onClick={resetGarden} className="p-2 hover:bg-slate-100 rounded-lg">
                    <RotateCcw className="w-4 h-4 text-slate-500" />
                  </button>
                )}
              </div>
            </div>

            {/* Plants Visualization */}
            <div className="grid grid-cols-2 gap-4">
              {/* Tomato Plant */}
              <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-center space-y-2">
                <span className="text-5xl block animate-bounce">
                  {isHarvestReady ? "🍅 🍅 🍅" : waterCount > 1 ? "🌿 🍅" : "🌱"}
                </span>
                <h5 className="font-black text-sm text-rose-900">Sweet Red Tomatoes (টমেটো)</h5>
                <span className="text-[11px] font-bold text-rose-700 block">
                  {isHarvestReady ? "পুষ্টিকর লাল টমেটো পেকেছে!" : "পানি পেয়ে চারাগাছ বড় হচ্ছে..."}
                </span>
              </div>

              {/* Cucumber Plant */}
              <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-center space-y-2">
                <span className="text-5xl block animate-bounce">
                  {isHarvestReady ? "🥒 🥒 🥒" : waterCount > 1 ? "🌿 🥒" : "🌱"}
                </span>
                <h5 className="font-black text-sm text-emerald-900">Crispy Cucumbers (শসা)</h5>
                <span className="text-[11px] font-bold text-emerald-700 block">
                  {isHarvestReady ? "টাটকা ও সুস্বাদু সবুজ শসা!" : "পানি পেয়ে ফুল ফুটছে..."}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GRANDMOTHER'S PITHA KITCHEN */}
        {activeTab === "pithaKitchen" && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-emerald-200 shadow-sm space-y-3">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-100 text-purple-800 border border-purple-200 inline-block mb-1">
                🥧 Grandmother's Traditional Pithes
              </span>
              <h4 className="text-base font-black text-slate-900">
                "She makes the best pithes in the world!"
              </h4>
              <p className="text-xs text-slate-600">
                দাদির হাতের তৈরি ঐতিহ্যবাহী পিঠার মধ্যে ক্লিক করে নাম ও স্বাদ জানো:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {[
                { name: "ভাপা পিঠা (Vapa Pitha)", desc: "Steamed rice cake with jaggery and coconut", emoji: "🥥" },
                { name: "চিতই পিঠা (Chitoi Pitha)", desc: "Warm fluffy cakes dipped in mustard or date syrup", emoji: "🫓" },
                { name: "পাটিসাপটা (Patishapta)", desc: "Sweet rolled crepes stuffed with kheer", emoji: "🥞" }
              ].map((p) => (
                <div
                  key={p.name}
                  onClick={() => { setSelectedPitha(p.name); playChime("pop"); handleSpeak(`${p.name}. ${p.desc}`); }}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                    selectedPitha === p.name ? "bg-purple-50 border-purple-400 shadow-md" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <span className="text-3xl">{p.emoji}</span>
                  <h5 className="font-black text-sm text-slate-900 mt-1">{p.name}</h5>
                  <p className="text-xs text-slate-600 mt-0.5">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Quote Pill */}
      <div className="mt-2 pt-2 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-900 font-medium">
        <span className="flex items-center gap-1.5 italic">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          "A loving family that works and studies together stays happy forever."
        </span>
        <span className="text-xs font-bold text-emerald-700">
          NCTB Class 4 Page 12–15
        </span>
      </div>
    </div>
  );
};

export default SagarFamilyVisualStage;
