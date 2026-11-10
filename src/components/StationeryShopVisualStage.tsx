"use client";

import React, { useState } from "react";
import { 
  Store, 
  ShoppingBag, 
  Coins, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  Volume2, 
  DollarSign, 
  CreditCard, 
  Award,
  Plus,
  Minus,
  MessageSquare
} from "lucide-react";

interface StationeryShopVisualStageProps {
  slideId: number;
  playChime: (type: "correct" | "click" | "fanfare" | any) => void;
  handleSpeak: (text: string) => void;
  isFullTheater?: boolean;
}

interface StationeryItem {
  id: string;
  name: string;
  bangla: string;
  price: number;
  emoji: string;
  count: number;
}

export const StationeryShopVisualStage: React.FC<StationeryShopVisualStageProps> = ({
  slideId,
  playChime,
  handleSpeak,
  isFullTheater = false,
}) => {
  const [activeTab, setActiveTab] = useState<"store" | "dialogue" | "cashier">("store");

  // Shopping Cart Items
  const [items, setItems] = useState<StationeryItem[]>([
    { id: "pencil", name: "Pencil (পেন্সিল)", bangla: "১০ টাকা প্রতিটি", price: 10, emoji: "✏️", count: 2 },
    { id: "eraser", name: "Eraser (ইরেজার/রাবার)", bangla: "৫ টাকা প্রতিটি", price: 5, emoji: "🧼", count: 1 },
    { id: "notebook", name: "Notebook (খাতা)", bangla: "৩০ টাকা প্রতিটি", price: 30, emoji: "📓", count: 1 },
    { id: "ruler", name: "Ruler (স্কেল)", bangla: "১৫ টাকা প্রতিটি", price: 15, emoji: "📏", count: 0 },
    { id: "sharpener", name: "Sharpener (শার্পনার)", bangla: "৮ টাকা প্রতিটি", price: 8, emoji: "✂️", count: 0 }
  ]);

  const [paid, setPaid] = useState<boolean>(false);

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.count, 0);
  };

  const updateCount = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const next = Math.max(0, item.count + delta);
        return { ...item, count: next };
      }
      return item;
    }));
    setPaid(false);
    playChime("pop");
  };

  const handlePay = () => {
    setPaid(true);
    playChime("fanfare");
    handleSpeak(`Tania's father pays ${calculateTotal()} taka. The shopkeeper gives the items neatly with a smile!`);
  };

  const resetCart = () => {
    setItems([
      { id: "pencil", name: "Pencil (পেন্সিল)", bangla: "১০ টাকা প্রতিটি", price: 10, emoji: "✏️", count: 2 },
      { id: "eraser", name: "Eraser (ইরেজার/রাবার)", bangla: "৫ টাকা প্রতিটি", price: 5, emoji: "🧼", count: 1 },
      { id: "notebook", name: "Notebook (খাতা)", bangla: "৩০ টাকা প্রতিটি", price: 30, emoji: "📓", count: 1 },
      { id: "ruler", name: "Ruler (স্কেল)", bangla: "১৫ টাকা প্রতিটি", price: 15, emoji: "📏", count: 0 },
      { id: "sharpener", name: "Sharpener (শার্পনার)", bangla: "৮ টাকা প্রতিটি", price: 8, emoji: "✂️", count: 0 }
    ]);
    setPaid(false);
    playChime("pop");
  };

  const totalTaka = calculateTotal();

  return (
    <div className={`w-full bg-gradient-to-br from-amber-50/70 via-orange-50 to-emerald-50/60 rounded-2xl border-2 border-amber-200 overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-xs ${
      isFullTheater ? "min-h-[580px]" : "min-h-[460px]"
    }`}>
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
              At the Stationery Shop
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                Class 4 • Unit 6
              </span>
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              পেন্সিল, খাতা ও ইরেজার কেনা, ভদ্র সম্ভাষণ এবং টাকার সঠিক হিসাব
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-amber-200 shadow-2xs">
          <button
            onClick={() => { setActiveTab("store"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === "store" 
                ? "bg-amber-600 text-white shadow-xs" 
                : "text-slate-600 hover:text-amber-600 hover:bg-amber-50"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>দোকান ও কার্ট</span>
          </button>
          <button
            onClick={() => { setActiveTab("dialogue"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === "dialogue" 
                ? "bg-amber-600 text-white shadow-xs" 
                : "text-slate-600 hover:text-amber-600 hover:bg-amber-50"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>ভদ্র কথোপকথন</span>
          </button>
          <button
            onClick={() => { setActiveTab("cashier"); playChime("pop"); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === "cashier" 
                ? "bg-amber-600 text-white shadow-xs" 
                : "text-slate-600 hover:text-amber-600 hover:bg-amber-50"
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>টাকা ও ক্যাশিয়ার</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="py-3 flex-1 flex flex-col justify-center">
        {/* TAB 1: INTERACTIVE STORE & SHOPPING CART */}
        {activeTab === "store" && (
          <div className="space-y-3">
            {/* Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3 border-2 border-amber-100 hover:border-amber-300 shadow-2xs flex flex-col justify-between"
                >
                  <div className="text-center">
                    <span className="text-3xl block mb-1">{item.emoji}</span>
                    <h5 className="font-black text-xs text-slate-900 leading-tight">{item.name}</h5>
                    <span className="text-[11px] font-bold text-amber-700 block mt-0.5">৳ {item.price} টাকা</span>
                  </div>

                  <div className="flex items-center justify-between gap-1 mt-2.5 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => updateCount(item.id, -1)}
                      className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 flex items-center justify-center font-black text-xs transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-black text-xs text-slate-900">{item.count}</span>
                    <button
                      onClick={() => updateCount(item.id, 1)}
                      className="w-6 h-6 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 flex items-center justify-center font-black text-xs transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Shopping Bill & Checkout Banner */}
            <div className="bg-white rounded-2xl p-4 border-2 border-amber-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                  ৳
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">মোট কেনাকাটার বিল (Total Amount)</span>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-2xl font-black text-slate-900">৳ {totalTaka} টাকা</h4>
                    <span className="text-xs text-slate-500 font-medium">({totalTaka} Taka)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!paid ? (
                  <button
                    onClick={handlePay}
                    className="px-4 py-2.5 rounded-xl text-xs font-black bg-amber-600 text-white hover:bg-amber-700 shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
                  >
                    <Coins className="w-4 h-4" />
                    <span>টাকা পরিশোধ করুন (Pay Bill)</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-300 text-emerald-800 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>পরিশোধ সম্পন্ন! হাসি মুখে জিনিসপত্র প্রদান!</span>
                    <button onClick={resetCart} className="p-1 hover:bg-emerald-100 rounded-lg">
                      <RotateCcw className="w-3.5 h-3.5 text-emerald-700" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: POLITE DIALOGUE SIMULATOR */}
        {activeTab === "dialogue" && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-amber-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-200">
                💬 Polite Customer & Shopkeeper Conversation
              </span>
              <button
                onClick={() => handleSpeak("Shopkeeper: Can I help you? Tania: Yes, please. I need two pencils, an eraser and a notebook.")}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>পুরো সংলাপ শুনুন</span>
              </button>
            </div>

            {/* Conversation Bubbles */}
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="text-2xl">👨‍💼</span>
                <div>
                  <strong className="text-slate-900 block font-bold">Shopkeeper (দোকানদার):</strong>
                  <p className="text-slate-700 font-medium">"Can I help you?" (আমি কি আপনাকে সাহায্য করতে পারি?)</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <span className="text-2xl">👧</span>
                <div>
                  <strong className="text-amber-900 block font-bold">Tania (তানিয়া):</strong>
                  <p className="text-amber-800 font-medium">"Yes, please. I need two pencils, an eraser and a notebook." (হ্যাঁ, দয়া করে। আমার দুটি পেন্সিল, একটি ইরেজার এবং একটি খাতা প্রয়োজন।)</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="text-2xl">👨‍💼</span>
                <div>
                  <strong className="text-slate-900 block font-bold">Shopkeeper (দোকানদার):</strong>
                  <p className="text-slate-700 font-medium">"The pencils are ten taka each, the eraser is five taka and the notebook is thirty taka." (পেন্সিল প্রতিটি ১০ টাকা, ইরেজার ৫ টাকা এবং খাতা ৩০ টাকা।)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CURRENCY & CASHIER DETAILS */}
        {activeTab === "cashier" && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-amber-200 shadow-sm space-y-3">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200 inline-block mb-1">
                💵 Bangladeshi Currency Breakdown
              </span>
              <h4 className="text-base font-black text-slate-900">
                তানিয়ার বাবার মোট ৫৫ টাকার সঠিক নোট ও কয়েন বিন্যাস:
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex items-center gap-3">
                <div className="w-14 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                  ৳ ৫০
                </div>
                <div>
                  <h5 className="font-black text-sm text-emerald-900">Fifty Taka Note (৫০ টাকার নোট)</h5>
                  <p className="text-xs text-emerald-700">খাতা (৩০ টাকা) + ২ পেন্সিল (২০ টাকা) = ৫০ টাকা</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-base shadow-sm">
                  ৳ ৫
                </div>
                <div>
                  <h5 className="font-black text-sm text-amber-900">Five Taka Coin (৫ টাকার কয়েন)</h5>
                  <p className="text-xs text-amber-700">১টি ইরেজার = ৫ টাকা</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Quote Pill */}
      <div className="mt-2 pt-2 border-t border-amber-100 flex items-center justify-between text-xs text-amber-900 font-medium">
        <span className="flex items-center gap-1.5 italic">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          "Good manners and polite words like 'Please' and 'Thank you' make everyone smile!"
        </span>
        <span className="text-xs font-bold text-amber-700">
          NCTB Class 4 Page 30–33
        </span>
      </div>
    </div>
  );
};

export default StationeryShopVisualStage;
