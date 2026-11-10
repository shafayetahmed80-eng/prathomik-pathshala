"use client";

import React, { useState } from "react";
import { 
  Apple, 
  Fish, 
  Wheat, 
  Droplet, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck,
  Utensils
} from "lucide-react";

interface FoodPyramidVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

export const FoodPyramidVisualStage: React.FC<FoodPyramidVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"pyramid" | "plate" | "guide">("pyramid");

  // Selected pyramid tier
  const [selectedTier, setSelectedTier] = useState<1 | 2 | 3 | 4>(4);

  // Plate items state
  const [plateItems, setPlateItems] = useState<{ [key: string]: boolean }>({
    rice: true,
    vegetables: true,
    fish: false,
    fruit: false
  });

  const tiers = {
    1: {
      name: "Top Level: Fat & Oil",
      bangla: "শীর্ষ স্তর: তেল ও চর্বি",
      foods: "Butter, Ghee, Cooking Oil, Sweets (🧈 🫒 🍯)",
      benefit: "Makes food delicious, but our body needs very little of them. Eat sparingly!",
      portion: "Eat Least (খুব সামান্য খাও)",
      color: "from-amber-600 to-red-600"
    },
    2: {
      name: "3rd Level: Protein & Dairy",
      bangla: "৩য় স্তর: প্রোটিন ও দুগ্ধজাত খাবার",
      foods: "Fish, Meat, Chicken, Eggs, Milk, Lentils/Dal, Beans (🐟 🍗 🥚 🥛 🫘)",
      benefit: "Rich in protein and calcium. Builds strong muscles, healthy teeth, and sturdy bones!",
      portion: "Eat Moderately (পরিমিত খাও)",
      color: "from-purple-600 to-indigo-700"
    },
    3: {
      name: "2nd Level: Fruits & Vegetables",
      bangla: "২য় স্তর: ফলমূল ও শাকসবজি",
      foods: "Carrots, Papaya, Spinach, Bananas, Mangoes (🥕 🥦 🍌 🥭)",
      benefit: "Packed with essential vitamins. Protects our eyes, boosts immunity, and keeps body healthy!",
      portion: "Eat Plenty (প্রচুর পরিমাণে খাও)",
      color: "from-emerald-600 to-teal-700"
    },
    4: {
      name: "Bottom Level: Grains (Base)",
      bangla: "ভিত্তি স্তর: দানাদার খাদ্যশস্য",
      foods: "Rice, Ruti, Bread, Potatoes (🍚 🫓 🍞 🥔)",
      benefit: "Grains provide carbohydrates that give us energy to study, run, play, and work!",
      portion: "Eat Most (সবচেয়ে বেশি খাও)",
      color: "from-amber-500 to-yellow-600"
    }
  };

  const togglePlateItem = (key: string) => {
    setPlateItems(prev => {
      const next = { ...prev, [key]: !prev[key] };
      playChime("pop");
      return next;
    });
  };

  const plateCount = Object.values(plateItems).filter(Boolean).length;

  return (
    <div className={`w-full bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 rounded-2xl border-2 border-emerald-600/60 text-white overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xl ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800/40 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
            <Utensils className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <h3 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
              The Food Pyramid — Eat Healthy
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                Class 5 • Unit 6
              </span>
            </h3>
            <p className="text-xs text-emerald-200/80 font-medium">
              পুষ্টিকর খাবার, খাদ্যের ৪টি স্তর ও সুস্থ সবল জীবনের নির্দেশিকা
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-emerald-900/60 shadow-2xs">
          <button
            onClick={() => { setActiveTab("pyramid"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "pyramid" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🔺 খাদ্য পিরামিড
          </button>
          <button
            onClick={() => { setActiveTab("plate"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "plate" 
                ? "bg-teal-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            🍽️ সুষম থালা সাজান
          </button>
          <button
            onClick={() => { setActiveTab("guide"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "guide" 
                ? "bg-amber-600 text-white shadow-xs" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            📋 পুষ্টি নির্দেশিকা
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="my-3 flex-1 flex flex-col justify-center">
        {activeTab === "pyramid" && (
          <div className="space-y-3.5">
            {/* Interactive Pyramid Display */}
            <div className="flex flex-col items-center gap-1.5 max-w-md mx-auto w-full">
              {/* Tier 1 (Top) */}
              <button
                onClick={() => {
                  setSelectedTier(1);
                  playChime("click");
                  handleSpeak("Top of the Food Pyramid: Fat and oil make food delicious, but our body does not need very much of them. Eat very little!");
                }}
                className={`w-28 py-2 rounded-xl text-center border transition-all ${
                  selectedTier === 1 
                    ? "bg-gradient-to-r from-amber-600 to-red-600 border-amber-300 shadow-md ring-2 ring-amber-300" 
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span className="text-xs font-black block">🧈 Fat & Oil</span>
                <span className="text-[9px] text-amber-200">Eat Least</span>
              </button>

              {/* Tier 2 */}
              <button
                onClick={() => {
                  setSelectedTier(2);
                  playChime("click");
                  handleSpeak("Third level: Fish, meat, dairy products, beans and lentils. Meat and fish have protein. Dairy products like milk and egg help our teeth and bones!");
                }}
                className={`w-44 py-2.5 rounded-xl text-center border transition-all ${
                  selectedTier === 2 
                    ? "bg-gradient-to-r from-purple-600 to-indigo-700 border-purple-300 shadow-md ring-2 ring-purple-300" 
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span className="text-xs font-black block">🐟 Meat, Fish, Dairy, Beans</span>
                <span className="text-[9px] text-purple-200">Protein & Calcium</span>
              </button>

              {/* Tier 3 */}
              <button
                onClick={() => {
                  setSelectedTier(3);
                  playChime("click");
                  handleSpeak("Second level: Fruit and vegetables. They are very important. They have vitamins that help our eyes and our health!");
                }}
                className={`w-64 py-2.5 rounded-xl text-center border transition-all ${
                  selectedTier === 3 
                    ? "bg-gradient-to-r from-emerald-600 to-teal-700 border-emerald-300 shadow-md ring-2 ring-emerald-300" 
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span className="text-xs font-black block">🥕 Fruits & Vegetables</span>
                <span className="text-[9px] text-emerald-200">Vitamins for Health & Eyes</span>
              </button>

              {/* Tier 4 (Bottom Base) */}
              <button
                onClick={() => {
                  setSelectedTier(4);
                  playChime("click");
                  handleSpeak("Bottom level: Foods made from grain like rice, ruti and bread. Grains give us energy!");
                }}
                className={`w-80 py-3 rounded-xl text-center border transition-all ${
                  selectedTier === 4 
                    ? "bg-gradient-to-r from-amber-500 to-yellow-600 border-yellow-300 shadow-md ring-2 ring-yellow-300 text-slate-900" 
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span className="text-xs font-black block">🍚 Grains: Rice, Ruti, Bread</span>
                <span className={`text-[10px] font-bold ${selectedTier === 4 ? "text-slate-900" : "text-amber-200"}`}>
                  Carbohydrates • Gives Us Energy (Eat Most)
                </span>
              </button>
            </div>

            {/* Selected Tier Detail Card */}
            <div className="bg-slate-800/90 p-3.5 rounded-2xl border border-slate-700 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-black text-amber-300">
                    {tiers[selectedTier].name} ({tiers[selectedTier].bangla})
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    {tiers[selectedTier].portion}
                  </span>
                </div>
                <p className="text-[11px] text-slate-200 font-medium mt-1">
                  <strong>Foods:</strong> {tiers[selectedTier].foods}
                </p>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  <strong>Nutritional Value:</strong> {tiers[selectedTier].benefit}
                </p>
              </div>

              <button
                onClick={() => {
                  playChime("click");
                  handleSpeak(`${tiers[selectedTier].name}. ${tiers[selectedTier].foods}. ${tiers[selectedTier].benefit}`);
                }}
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shrink-0 ml-2 shadow-sm"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === "plate" && (
          <div className="space-y-3.5">
            <div className="bg-teal-950/40 p-4 rounded-2xl border border-teal-700/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-teal-400" />
                  <div>
                    <h4 className="text-sm font-bold text-teal-200">
                      Build Your Balanced Lunch Plate (সুষম খাদ্য থালা)
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      থালায় ৪টি গুরুত্বপূর্ণ খাদ্যগোষ্ঠী যোগ করুন ({plateCount}/4 টি উপাদান নির্বাচিত)
                    </p>
                  </div>
                </div>

                <span className={`text-xs font-black px-2.5 py-1 rounded-xl ${plateCount === 4 ? "bg-emerald-600 text-white" : "bg-slate-700 text-slate-300"}`}>
                  {plateCount === 4 ? "100% Balanced! ✓" : `${plateCount * 25}% Balanced`}
                </span>
              </div>

              {/* 4 Interactive Food Checkers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => togglePlateItem("rice")}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    plateItems.rice ? "bg-amber-600/30 border-amber-400 text-white" : "bg-slate-800/60 border-slate-700 text-slate-400"
                  }`}
                >
                  <span className="text-2xl block mb-1">🍚</span>
                  <span className="text-xs font-bold block">Grains (Rice/Ruti)</span>
                  <span className="text-[10px] text-amber-200">Energy (শক্তি)</span>
                </button>

                <button
                  onClick={() => togglePlateItem("vegetables")}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    plateItems.vegetables ? "bg-emerald-600/30 border-emerald-400 text-white" : "bg-slate-800/60 border-slate-700 text-slate-400"
                  }`}
                >
                  <span className="text-2xl block mb-1">🥦</span>
                  <span className="text-xs font-bold block">Vegetables</span>
                  <span className="text-[10px] text-emerald-200">Vitamins (ভিটামিন)</span>
                </button>

                <button
                  onClick={() => togglePlateItem("fish")}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    plateItems.fish ? "bg-indigo-600/30 border-indigo-400 text-white" : "bg-slate-800/60 border-slate-700 text-slate-400"
                  }`}
                >
                  <span className="text-2xl block mb-1">🐟</span>
                  <span className="text-xs font-bold block">Protein (Fish/Meat)</span>
                  <span className="text-[10px] text-indigo-200">Body Building</span>
                </button>

                <button
                  onClick={() => togglePlateItem("fruit")}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    plateItems.fruit ? "bg-rose-600/30 border-rose-400 text-white" : "bg-slate-800/60 border-slate-700 text-slate-400"
                  }`}
                >
                  <span className="text-2xl block mb-1">🍌</span>
                  <span className="text-xs font-bold block">Fresh Fruit</span>
                  <span className="text-[10px] text-rose-200">Minerals & Fibre</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                playChime("fanfare");
                handleSpeak("A healthy balanced diet contains grains for energy, vegetables and fruits for vitamins, and fish or meat for protein. Eat healthy to grow strong!");
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>সুষম খাবারের অঙ্গীকার (Balanced Diet Pledge)</span>
            </button>
          </div>
        )}

        {activeTab === "guide" && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <h5 className="font-bold text-xs text-amber-300">1. Why Grains Matter</h5>
                <p className="text-[11px] text-slate-300 mt-1">
                  Rice, bread, and ruti provide complex carbohydrates that give children energy for school and play.
                </p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <h5 className="font-bold text-xs text-emerald-300">2. Vitamins for Eyes & Immunity</h5>
                <p className="text-[11px] text-slate-300 mt-1">
                  Carrots and leafy greens contain Vitamin A which protects eyesight and strengthens the immune system.
                </p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <h5 className="font-bold text-xs text-indigo-300">3. Protein & Calcium</h5>
                <p className="text-[11px] text-slate-300 mt-1">
                  Fish, eggs, lentils, and milk build strong bones, healthy teeth, and repair body tissues.
                </p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <h5 className="font-bold text-xs text-rose-300">4. Limit Fat, Oil & Sugar</h5>
                <p className="text-[11px] text-slate-300 mt-1">
                  Excess oily and sugary fast foods lead to sluggishness and health problems. Eat sparingly!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-emerald-800/40 pt-2.5 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>The Food Pyramid Suite • NCTB Class 5 English</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-300 font-bold">
          <span>🥦 Eat healthy, stay strong! (সুষম খাবার খাও)</span>
        </div>
      </div>
    </div>
  );
};

export default FoodPyramidVisualStage;
