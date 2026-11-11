"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { 
  Volume2, 
  RotateCcw, 
  Eraser, 
  Sparkles, 
  Pencil, 
  Award, 
  CheckCircle2, 
  Star,
  Printer,
  Download,
  Undo2,
  Redo2,
  Mic,
  Square,
  Play,
  Gamepad2,
  Eye,
  EyeOff,
  Sparkle
} from "lucide-react";
import { 
  VOWELS_DATA, 
  CONSONANTS_DATA, 
  KAR_DATA, 
  JUKTOBORNO_DATA, 
  NUMBERS_DATA, 
  BornomalaItem,
  MatraType
} from "@/data/bornomalaData";
import {
  ENGLISH_ALPHABET_DATA,
  ENGLISH_VOWELS,
  ENGLISH_CONSONANTS,
  ENGLISH_NUMBERS_DATA,
  EnglishAlphabetItem,
  EnglishCaseType,
  EnglishLetterAnatomy
} from "@/data/englishAlphabetData";
import { safeSpeak, stopSpeech } from "@/utils/mobileSpeech";
import { 
  playSuccessChime, 
  playPopSound, 
  playStarDing, 
  playDrawingScratch 
} from "@/utils/bornomalaAudio";
import BornomalaWorksheetModal from "./BornomalaWorksheetModal";
import BornomalaCertificateModal from "./BornomalaCertificateModal";
import BornomalaMiniGame from "./BornomalaMiniGame";
import BornomalaFlashcardModal from "./BornomalaFlashcardModal";

const COLOR_PALETTE = [
  { name: "নীল", hex: "#2563eb" },
  { name: "সবুজ", hex: "#16a34a" },
  { name: "লাল", hex: "#dc2626" },
  { name: "কমলা", hex: "#ea580c" },
  { name: "বেগুনি", hex: "#9333ea" },
  { name: "গোলাপি", hex: "#db2777" },
  { name: "হলুদ", hex: "#eab308" },
  { name: "কালো", hex: "#1e293b" },
];

export type LanguageMode = "bangla" | "english";
type ActiveTab = "vowels" | "consonants" | "karchinho" | "juktoborno" | "numbers";
type EnglishTab = "all" | "vowels" | "consonants" | "numbers";
type EnglishAnatomyFilter = "all" | EnglishLetterAnatomy;
type BrushMode = "pencil" | "chalk" | "rainbow" | "eraser";

export default function BanglaBornomalaLab() {
  // Language Mode state: বাংলা 🇧🇩 vs English 🇬🇧
  const [languageMode, setLanguageMode] = useState<LanguageMode>("bangla");

  // Category & Item selection state (Bangla)
  const [activeTab, setActiveTab] = useState<ActiveTab>("vowels");
  const [selectedMatraFilter, setSelectedMatraFilter] = useState<"all" | MatraType>("all");

  // Category & Item selection state (English)
  const [englishTab, setEnglishTab] = useState<EnglishTab>("all");
  const [englishCase, setEnglishCase] = useState<EnglishCaseType>("upper");
  const [englishAnatomyFilter, setEnglishAnatomyFilter] = useState<EnglishAnatomyFilter>("all");

  // Active item (can be Bangla or English)
  const [selectedItem, setSelectedItem] = useState<BornomalaItem | EnglishAlphabetItem>(VOWELS_DATA[0]);

  // View modes
  const [showMiniGame, setShowMiniGame] = useState<boolean>(false);
  const [isWorksheetOpen, setIsWorksheetOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isFlashcardOpen, setIsFlashcardOpen] = useState<boolean>(false);

  // Drawing Tools State
  const [brushColor, setBrushColor] = useState<string>("#2563eb");
  const [brushSize, setBrushSize] = useState<number>(12);
  const [brushMode, setBrushMode] = useState<BrushMode>("pencil");
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [showStrokeGuide, setShowStrokeGuide] = useState<boolean>(true);
  const [showRuledGrid, setShowRuledGrid] = useState<boolean>(true);

  // Audio & Recording State
  const [teacherVoice, setTeacherVoice] = useState<"nabanita" | "pradeep">("nabanita");
  const [englishTeacherVoice, setEnglishTeacherVoice] = useState<"ana" | "guy">("ana");
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPlayingRecorded, setIsPlayingRecorded] = useState<boolean>(false);
  const [recordCountdown, setRecordCountdown] = useState<number>(6);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const recordedAudioUrlRef = useRef<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const recordedAudioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Gamification & Accuracy
  const [stars, setStars] = useState<number>(20);
  const [accuracyScore, setAccuracyScore] = useState<number | null>(null);

  // Canvas Refs & Undo/Redo Stacks
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const undoStackRef = useRef<ImageData[]>([]);
  const redoStackRef = useRef<ImageData[]>([]);
  const rainbowHueRef = useRef<number>(0);

  // Filter current list based on Tab and Matra / English Filter
  const getTabList = useCallback((): (BornomalaItem | EnglishAlphabetItem)[] => {
    if (languageMode === "english") {
      switch (englishTab) {
        case "all": return ENGLISH_ALPHABET_DATA;
        case "vowels": return ENGLISH_VOWELS;
        case "consonants": return ENGLISH_CONSONANTS;
        case "numbers": return ENGLISH_NUMBERS_DATA;
        default: return ENGLISH_ALPHABET_DATA;
      }
    }
    switch (activeTab) {
      case "vowels": return VOWELS_DATA;
      case "consonants": return CONSONANTS_DATA;
      case "karchinho": return KAR_DATA;
      case "juktoborno": return JUKTOBORNO_DATA;
      case "numbers": return NUMBERS_DATA;
      default: return VOWELS_DATA;
    }
  }, [languageMode, englishTab, activeTab]);

  const rawList = getTabList();
  const filteredList = rawList.filter((item) => {
    if (languageMode === "english") {
      if (englishTab !== "numbers" && englishAnatomyFilter !== "all" && "anatomy" in item) {
        return item.anatomy === englishAnatomyFilter;
      }
      return true;
    }
    if ((activeTab === "vowels" || activeTab === "consonants") && selectedMatraFilter !== "all") {
      return item.matra === selectedMatraFilter;
    }
    return true;
  });

  const isEnglish = languageMode === "english";
  const englishItem = isEnglish && "upperChar" in selectedItem ? (selectedItem as EnglishAlphabetItem) : null;

  const getActiveChar = useCallback(() => {
    if (isEnglish && englishItem) {
      if (englishItem.type === "number") return englishItem.char;
      if (englishCase === "lower") return englishItem.lowerChar;
      if (englishCase === "pair") return englishItem.displayPair;
      return englishItem.upperChar;
    }
    return selectedItem.char;
  }, [isEnglish, englishItem, englishCase, selectedItem.char]);

  const activeChar = getActiveChar();

  // Save current canvas state to Undo stack
  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const state = ctx.getImageData(0, 0, canvas.width, canvas.height);
      if (undoStackRef.current.length >= 15) {
        undoStackRef.current.shift();
      }
      undoStackRef.current.push(state);
      redoStackRef.current = []; // Clear redo on new action
    } catch {}
  };

  // Draw background guidelines and guide character with resize preservation
  const setupCanvas = useCallback((preserveDrawing = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let savedDrawing: ImageData | null = null;
    if (preserveDrawing && canvas.width > 0 && canvas.height > 0) {
      const prevCtx = canvas.getContext("2d");
      if (prevCtx) {
        try {
          savedDrawing = prevCtx.getImageData(0, 0, canvas.width, canvas.height);
        } catch {}
      }
    }

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width > 0 ? rect.width : 540;
    const height = rect.height > 0 ? rect.height : 320;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    // Clean white sheet
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Draw Ruled Lines
    if (showRuledGrid) {
      if (isEnglish) {
        // 🇬🇧 English 4-Line Primary Ruled Grid
        const line1Y = Math.round(height * 0.18); // Ascender Top Line (Red)
        const line2Y = Math.round(height * 0.42); // Midline / Waistline (Blue dashed)
        const line3Y = Math.round(height * 0.66); // Baseline (Dark Navy Blue)
        const line4Y = Math.round(height * 0.88); // Descender Bottom Line (Red)

        // Soft sky-blue tint in Middle Zone (between Midline and Baseline)
        ctx.fillStyle = "rgba(224, 242, 254, 0.45)"; // sky-100 soft highlight
        ctx.fillRect(16, line2Y, width - 32, line3Y - line2Y);

        // Line 1: Top Red Ascender Line
        ctx.strokeStyle = "#f43f5e"; // rose-500
        ctx.lineWidth = 1.5;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(16, line1Y);
        ctx.lineTo(width - 16, line1Y);
        ctx.stroke();

        // Line 2: Midline (Sky Blue, Dashed)
        ctx.strokeStyle = "#0284c7"; // sky-600
        ctx.lineWidth = 1.2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(16, line2Y);
        ctx.lineTo(width - 16, line2Y);
        ctx.stroke();

        // Line 3: Baseline (Dark Navy Solid)
        ctx.strokeStyle = "#1e3a8a"; // blue-900
        ctx.lineWidth = 2.2;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(16, line3Y);
        ctx.lineTo(width - 16, line3Y);
        ctx.stroke();

        // Line 4: Bottom Red Descender Line
        ctx.strokeStyle = "#f43f5e"; // rose-500
        ctx.lineWidth = 1.5;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(16, line4Y);
        ctx.lineTo(width - 16, line4Y);
        ctx.stroke();
      } else {
        // 🇧🇩 Bengali 3-Line Primary Ruled Grid
        const topLineY = Math.round(height * 0.22);
        const midLineY = Math.round(height * 0.50);
        const baseLineY = Math.round(height * 0.78);

        // Top Matra line (soft rose)
        ctx.strokeStyle = "#fda4af"; // pink-300
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(16, topLineY);
        ctx.lineTo(width - 16, topLineY);
        ctx.stroke();

        // Middle line (soft sky)
        ctx.strokeStyle = "#bae6fd"; // sky-200
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(16, midLineY);
        ctx.lineTo(width - 16, midLineY);
        ctx.stroke();

        // Base line (soft slate)
        ctx.strokeStyle = "#cbd5e1"; // slate-300
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(16, baseLineY);
        ctx.lineTo(width - 16, baseLineY);
        ctx.stroke();
      }
    }

    // Draw Watermark/Dotted guide character in center
    if (isEnglish) {
      const isPair = englishCase === "pair" && activeChar.length > 1;
      const fontSize = Math.round(Math.min(width, height) * (isPair ? 0.44 : 0.54));
      ctx.fillStyle = "rgba(203, 213, 225, 0.85)"; // soft slate watermark
      ctx.font = `bold ${fontSize}px 'Nunito', 'Fredoka', 'Comic Sans MS', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(activeChar, width / 2, Math.round(height * 0.66));
    } else {
      const fontSize = Math.round(Math.min(width, height) * 0.54);
      let dynamicFont = "'Hind Siliguri', 'Noto Sans Bengali', sans-serif";
      try {
        const computedFont = getComputedStyle(document.documentElement).getPropertyValue("--font-active");
        if (computedFont && computedFont.trim().length > 0) {
          dynamicFont = computedFont.trim();
        }
      } catch {}

      ctx.fillStyle = "rgba(203, 213, 225, 0.85)"; // soft slate watermark
      ctx.font = `bold ${fontSize}px ${dynamicFont}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(activeChar, width / 2, height / 2 + 4);
    }

    // If preserving drawing across device rotation / window resize
    if (savedDrawing) {
      try {
        ctx.putImageData(savedDrawing, 0, 0);
      } catch {}
    } else {
      // Reset stacks on explicit letter change or clear
      undoStackRef.current = [];
      redoStackRef.current = [];
      setAccuracyScore(null);
    }
  }, [showRuledGrid, isEnglish, englishCase, activeChar]);

  useEffect(() => {
    const timer = setTimeout(() => setupCanvas(false), 30);
    const handleResize = () => setupCanvas(true);
    window.addEventListener("resize", handleResize);

    // Font loading listener to ensure dynamic Bengali web fonts render crisp
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        setupCanvas(undoStackRef.current.length > 0);
      });
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      stopSpeech();
      if (recordedAudioPlayerRef.current) {
        try {
          recordedAudioPlayerRef.current.pause();
          recordedAudioPlayerRef.current.currentTime = 0;
        } catch {}
        recordedAudioPlayerRef.current = null;
      }
      if (recordedAudioUrlRef.current) {
        URL.revokeObjectURL(recordedAudioUrlRef.current);
        recordedAudioUrlRef.current = null;
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        try {
          mediaRecorderRef.current.stop();
        } catch {}
      }
    };
  }, [setupCanvas]);

  // Stop child recording playback
  const stopRecordedAudio = () => {
    if (recordedAudioPlayerRef.current) {
      try {
        recordedAudioPlayerRef.current.pause();
        recordedAudioPlayerRef.current.currentTime = 0;
      } catch {}
      recordedAudioPlayerRef.current = null;
    }
    setIsPlayingRecorded(false);
  };

  // Cleanup recorded audio & active recording when switching letter/tab/language
  const selectItem = (nextItem: BornomalaItem | EnglishAlphabetItem) => {
    stopRecordedAudio();
    if (recordedAudioUrlRef.current) {
      URL.revokeObjectURL(recordedAudioUrlRef.current);
      recordedAudioUrlRef.current = null;
      setRecordedAudioUrl(null);
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
      setIsRecording(false);
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setRecordCountdown(6);
    setSelectedItem(nextItem);
  };

  // Helper to distinguish English alphabet item
  const isEnglishItem = (item: BornomalaItem | EnglishAlphabetItem): item is EnglishAlphabetItem => {
    return languageMode === "english" || ("upperChar" in item) || ("phonicsTtsPrompt" in item);
  };

  // Audio Playback with Selected Teacher Voice (Adaptive for Bangla and English)
  const handleSpeak = (text: string) => {
    stopRecordedAudio();
    setIsSpeaking(true);
    const isEn = /[a-zA-Z]/.test(text) && !/[\u0980-\u09FF]/.test(text);
    const targetLang = isEn ? "en-US" : "bn-BD";
    const voiceToUse = isEn ? englishTeacherVoice : teacherVoice;

    safeSpeak(text, {
      lang: targetLang,
      rate: isEn ? 0.88 : 0.85,
      voice: voiceToUse,
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleSpeakPure = (item: BornomalaItem | EnglishAlphabetItem) => {
    stopRecordedAudio();
    setIsSpeaking(true);

    if (isEnglishItem(item)) {
      // English Letter Phonics Articulation
      const text = item.phonicsTtsPrompt || `The letter ${item.upperChar}. Sound: ${item.pureSound}`;
      safeSpeak(text, {
        lang: "en-US",
        rate: 0.88,
        voice: englishTeacherVoice,
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } else {
      // Bengali Pure Sound Articulation
      const text = item.pureSound || item.name;
      safeSpeak(text, {
        lang: "bn-BD",
        rate: 0.85,
        voice: teacherVoice,
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  };

  const handleSpeakRhyme = (item: BornomalaItem | EnglishAlphabetItem) => {
    stopRecordedAudio();
    setIsSpeaking(true);

    if (isEnglishItem(item)) {
      // English Alphabet Rhyme
      const text = item.speechPrompt || `${item.name}. ${item.char} is for ${item.word}. ${item.rhyme}`;
      safeSpeak(text, {
        lang: "en-US",
        rate: 0.88,
        voice: englishTeacherVoice,
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } else {
      // Bengali Alphabet Rhyme
      const text = item.speechPrompt || `${item.name}। ${item.char}-তে ${item.word}। ${item.rhyme}`;
      safeSpeak(text, {
        lang: "bn-BD",
        rate: 0.85,
        voice: teacherVoice,
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  };

  // Undo Handler
  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || undoStackRef.current.length === 0) return;

    playPopSound();
    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    redoStackRef.current.push(currentState);

    const previousState = undoStackRef.current.pop()!;
    ctx.putImageData(previousState, 0, 0);
  };

  // Redo Handler
  const handleRedo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || redoStackRef.current.length === 0) return;

    playPopSound();
    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    undoStackRef.current.push(currentState);

    const nextState = redoStackRef.current.pop()!;
    ctx.putImageData(nextState, 0, 0);
  };

  // Pointer Draw Handlers (Pencil, Chalk, Rainbow, Eraser)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {}

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    saveCanvasState();

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (brushMode === "eraser") {
      ctx.lineWidth = brushSize * 2.5;
      ctx.strokeStyle = "#ffffff";
    } else if (brushMode === "chalk") {
      ctx.lineWidth = brushSize * 1.3;
      ctx.strokeStyle = `${brushColor}cc`; // slight soft chalk opacity
    } else if (brushMode === "rainbow") {
      rainbowHueRef.current = (rainbowHueRef.current + 25) % 360;
      ctx.lineWidth = brushSize;
      ctx.strokeStyle = `hsl(${rainbowHueRef.current}, 90%, 55%)`;
    } else {
      ctx.lineWidth = brushSize;
      ctx.strokeStyle = brushColor;
    }

    setIsDrawing(true);
    playDrawingScratch();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (brushMode === "rainbow") {
      rainbowHueRef.current = (rainbowHueRef.current + 4) % 360;
      ctx.strokeStyle = `hsl(${rainbowHueRef.current}, 90%, 55%)`;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    playDrawingScratch();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(false);
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {}
  };

  // 🎯 Genuine Computer-Vision Pixel Overlap Accuracy Algorithm
  const handleVerifyAccuracy = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width;
      const height = canvas.height;
      if (width === 0 || height === 0) return;

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      // 1. Create an offscreen reference mask canvas with the exact letter glyph
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      offCtx.scale(dpr, dpr);
      const cssWidth = width / dpr;
      const cssHeight = height / dpr;

      if (isEnglish) {
        const isPair = englishCase === "pair" && activeChar.length > 1;
        const fontSize = Math.round(Math.min(cssWidth, cssHeight) * (isPair ? 0.44 : 0.54));
        offCtx.font = `bold ${fontSize}px 'Nunito', 'Fredoka', 'Comic Sans MS', sans-serif`;
        offCtx.textAlign = "center";
        offCtx.textBaseline = "alphabetic";
        offCtx.fillStyle = "#000000";
        offCtx.fillText(activeChar, cssWidth / 2, Math.round(cssHeight * 0.66));
      } else {
        let dynamicFont = "'Hind Siliguri', 'Noto Sans Bengali', sans-serif";
        try {
          const computedFont = getComputedStyle(document.documentElement).getPropertyValue("--font-active");
          if (computedFont && computedFont.trim().length > 0) {
            dynamicFont = computedFont.trim();
          }
        } catch {}

        const fontSize = Math.round(Math.min(cssWidth, cssHeight) * 0.54);
        offCtx.font = `bold ${fontSize}px ${dynamicFont}`;
        offCtx.textAlign = "center";
        offCtx.textBaseline = "middle";
        offCtx.fillStyle = "#000000";
        offCtx.fillText(activeChar, cssWidth / 2, cssHeight / 2 + 4);
      }

      const refData = offCtx.getImageData(0, 0, width, height).data;

      let letterPixels = 0;
      let userDrawnPixels = 0;
      let matchedPixels = 0;
      let strayPixels = 0;

      // Downsample step for fast & accurate sampling
      const step = 2;
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (y * width + x) * 4;

          // Reference letter pixel (black text has high alpha)
          const isLetter = refData[idx + 3] > 60;
          if (isLetter) {
            letterPixels++;
          }

          // User drawn pixel on real canvas:
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          // Check if pixel is drawn by user (not pure white and not the faint gray watermark)
          const isDrawn = a > 50 && (r < 235 || g < 235 || b < 235) && !(r > 190 && g > 200 && b > 215);

          if (isDrawn) {
            userDrawnPixels++;
            if (isLetter) {
              matchedPixels++;
            } else {
              strayPixels++;
            }
          }
        }
      }

      // If barely drawn anything (< 80 sampled pixels)
      if (userDrawnPixels < 80) {
        setAccuracyScore(20);
        setTimeout(() => {
          if (isEnglish) {
            handleSpeak("Keep trying! Trace along the dotted lines carefully.");
          } else {
            handleSpeak("আরেকটু চেষ্টা করো! দাগের ওপর সুন্দর করে হাত ঘোরাও।");
          }
        }, 300);
        return;
      }

      // Compute coverage & precision
      const safeLetterPixels = Math.max(letterPixels, 100);
      const coverageRatio = Math.min(1, matchedPixels / (safeLetterPixels * 0.75));
      const precisionRatio = matchedPixels / Math.max(1, (matchedPixels + strayPixels * 0.65));

      // Calculate weighted score (60% letter stroke coverage, 40% precision inside the lines)
      const rawScore = (coverageRatio * 0.60 + precisionRatio * 0.40) * 100;
      const scorePercent = Math.max(25, Math.min(97, Math.round(rawScore)));
      setAccuracyScore(scorePercent);

      if (scorePercent >= 60) {
        setStars((prev) => prev + 15);
        playSuccessChime();
        playStarDing();
        confetti({
          particleCount: 110,
          spread: 75,
          origin: { y: 0.6 },
          colors: ["#ec4899", "#3b82f6", "#10b981", "#f59e0b"]
        });
        setTimeout(() => {
          if (isEnglish) {
            handleSpeak(`Excellent work! Your writing is ${scorePercent}% accurate!`);
          } else {
            handleSpeak(`অসাধারণ! তোমার লেখা প্রায় ${scorePercent}% নিখুঁত হয়েছে!`);
          }
        }, 400);
      } else {
        setTimeout(() => {
          if (isEnglish) {
            handleSpeak("Keep trying! Trace along the lines carefully.");
          } else {
            handleSpeak("আরেকটু চেষ্টা করো! দাগের ওপর সুন্দর করে হাত ঘোরাও।");
          }
        }, 300);
      }
    } catch {
      handleCelebrateManual();
    }
  };

  // Manual Celebrate
  const handleCelebrateManual = () => {
    setStars((prev) => prev + 10);
    playSuccessChime();
    playStarDing();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      if (isEnglish) {
        handleSpeak(`Superb! You wrote letter '${activeChar}' beautifully!`);
      } else {
        handleSpeak(`চমৎকার! তুমি '${selectedItem.char}' খুব সুন্দর লিখেছ!`);
      }
    }, 400);
  };

  // Download Child's Art as PNG
  const handleDownloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    playPopSound();
    const link = document.createElement("a");
    link.download = `prathomik-pathshala-${selectedItem.char}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // 🎙️ Voice Recording & Playback (Cross-platform Safari iOS / Android / Desktop)
  const getSupportedMimeType = () => {
    if (typeof MediaRecorder === "undefined") return "";
    const candidateTypes = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/mp4",
      "audio/aac",
      "audio/ogg"
    ];
    for (const t of candidateTypes) {
      if (MediaRecorder.isTypeSupported(t)) return t;
    }
    return "";
  };

  const stopActiveRecording = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setRecordCountdown(6);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
      setIsRecording(false);
    }
  };

  const handleToggleRecord = async () => {
    playPopSound();
    if (isRecording) {
      stopActiveRecording();
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mimeType = getSupportedMimeType();
        const options = mimeType ? { mimeType } : undefined;
        const mediaRecorder = new MediaRecorder(stream, options);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const finalMime = mimeType || "audio/webm";
          const audioBlob = new Blob(audioChunksRef.current, { type: finalMime });
          if (recordedAudioUrlRef.current) {
            URL.revokeObjectURL(recordedAudioUrlRef.current);
          }
          const audioUrl = URL.createObjectURL(audioBlob);
          recordedAudioUrlRef.current = audioUrl;
          setRecordedAudioUrl(audioUrl);
          stream.getTracks().forEach((track) => track.stop()); // release mic hardware
          setIsRecording(false);
        };

        mediaRecorder.start();
        setIsRecording(true);
        setRecordCountdown(6);

        // Auto-stop after 6 seconds countdown
        let remaining = 6;
        countdownIntervalRef.current = setInterval(() => {
          remaining -= 1;
          setRecordCountdown(remaining);
          if (remaining <= 0) {
            stopActiveRecording();
          }
        }, 1000);
      } catch {
        alert("মাইক্রোফোন চালু করা যায়নি। অনুগ্রহ করে ব্রাউজারের সেটিংসে গিয়ে মাইক ব্যবহারের পারমিশন দিন।");
      }
    }
  };

  const handlePlayRecorded = () => {
    if (!recordedAudioUrl) return;
    playPopSound();

    // If currently playing, stop it (toggle pause)
    if (isPlayingRecorded) {
      stopRecordedAudio();
      return;
    }

    // Stop teacher speech so voices don't clash
    stopSpeech();
    setIsSpeaking(false);

    try {
      const audio = new Audio(recordedAudioUrl);
      recordedAudioPlayerRef.current = audio;
      setIsPlayingRecorded(true);

      audio.onended = () => {
        setIsPlayingRecorded(false);
        recordedAudioPlayerRef.current = null;
      };
      audio.onerror = () => {
        setIsPlayingRecorded(false);
        recordedAudioPlayerRef.current = null;
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setIsPlayingRecorded(false);
          recordedAudioPlayerRef.current = null;
        });
      }
    } catch {
      setIsPlayingRecorded(false);
    }
  };

  return (
    <article 
      aria-labelledby="bornomala-lab-heading"
      className="bg-white rounded-3xl p-4 sm:p-7 lg:p-9 border border-slate-200 shadow-xl space-y-6 sm:space-y-8 w-full"
    >
      {/* 🌟 Top Header: Title + Language Switcher + Stars + Quick Action Modals */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3.5">
          <div className="flex items-center gap-3">
            <div 
              aria-hidden="true" 
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-2xl shadow-md shrink-0 transition-transform ${
                isEnglish 
                  ? "bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 shadow-blue-500/20" 
                  : "bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 shadow-pink-500/20"
              }`}
            >
              {isEnglish ? "🇬🇧" : "🎨"}
            </div>
            <div>
              <h1 id="bornomala-lab-heading" className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {isEnglish ? "English Alphabet & Phonics Lab" : "ডিজিটাল বর্ণমালা ও হাতেখড়ি ল্যাব"}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEnglish 
                  ? "NCTB English for Today: A-Z Letters, Phonics Sounds, 4-Line Handwriting & Rhymes"
                  : "প্রাক-প্রাথমিক ও ১ম শ্রেণির শিশুদের জন্য উচ্চারণ, মাত্রাভেদ, ছড়া ও হাত ঘুরিয়ে লেখার পূর্ণাঙ্গ ক্যানভাস"}
              </p>
            </div>
          </div>

          {/* 🌐 Language Switcher Pill */}
          <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => {
                if (languageMode === "bangla") return;
                playPopSound();
                stopSpeech();
                setLanguageMode("bangla");
                selectItem(VOWELS_DATA[0]);
                setActiveTab("vowels");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                languageMode === "bangla"
                  ? "bg-white text-pink-700 shadow-xs scale-102"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🇧🇩 বাংলা
            </button>
            <button
              type="button"
              onClick={() => {
                if (languageMode === "english") return;
                playPopSound();
                stopSpeech();
                setLanguageMode("english");
                selectItem(ENGLISH_ALPHABET_DATA[0]);
                setEnglishTab("all");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                languageMode === "english"
                  ? "bg-white text-blue-700 shadow-xs scale-102"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        {/* Global Toolbar: Stars, Game Switcher, Worksheet, Certificate */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          {/* Star Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm font-bold shadow-xs">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 animate-spin-slow" aria-hidden="true" />
            <span>{stars} স্টার পয়েন্ট</span>
          </div>

          {/* Mini Game Toggle Button */}
          <button
            type="button"
            onClick={() => {
              playPopSound();
              setShowMiniGame(!showMiniGame);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
              showMiniGame
                ? "bg-purple-600 text-white"
                : "bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200"
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>{showMiniGame ? "ক্যানভাসে ফিরুন" : "🎮 বর্ণ খেলা"}</span>
          </button>

          {/* Flashcard Modal Toggle */}
          <button
            type="button"
            onClick={() => {
              playPopSound();
              setIsFlashcardOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs sm:text-sm font-bold transition-all shadow-xs"
            title="ক্লাসরুম মাল্টিমিডিয়া অটোপ্লে ফ্ল্যাশ কার্ড"
          >
            <Play className="w-3.5 h-3.5 fill-pink-600 text-pink-600" />
            <span>ফ্ল্যাশ কার্ড</span>
          </button>

          {/* Printable Worksheet Modal Toggle */}
          <button
            type="button"
            onClick={() => {
              playPopSound();
              setIsWorksheetOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs sm:text-sm font-bold transition-all shadow-xs"
            title="A4 সাইজের অফলাইন প্রিন্ট শিট"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>ওয়ার্কশিট প্রিন্ট</span>
          </button>

          {/* Certificate Modal Toggle */}
          <button
            type="button"
            onClick={() => {
              playPopSound();
              setIsCertificateOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold transition-all shadow-xs"
            title="হাতেখড়ি সম্মাননা সনদপত্র তৈরি"
          >
            <Award className="w-4 h-4" />
            <span>সনদপত্র</span>
          </button>
        </div>
      </header>

      {/* 🎮 Mini Game Viewport (When Active) */}
      {showMiniGame ? (
        <BornomalaMiniGame
          key={languageMode}
          languageMode={languageMode}
          onBackToCanvas={() => setShowMiniGame(false)}
          onAddStars={(amount) => setStars((prev) => prev + amount)}
        />
      ) : (
        <>
          {/* 🧭 Category Navigation Tabs */}
          <div className="space-y-3">
            {isEnglish ? (
              // English Navigation Tabs
              <div className="space-y-2.5">
                <nav aria-label="English alphabet category selection" className="flex items-center gap-1.5 sm:gap-2 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto max-w-full no-scrollbar">
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setEnglishTab("all");
                      selectItem(ENGLISH_ALPHABET_DATA[0]);
                      setEnglishAnatomyFilter("all");
                    }}
                    aria-pressed={englishTab === "all"}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                      englishTab === "all"
                        ? "bg-white text-blue-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    All Letters (A-Z) (২৬)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setEnglishTab("vowels");
                      selectItem(ENGLISH_VOWELS[0]);
                      setEnglishAnatomyFilter("all");
                    }}
                    aria-pressed={englishTab === "vowels"}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                      englishTab === "vowels"
                        ? "bg-white text-pink-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Vowels (স্বরধ্বনি) (৫)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setEnglishTab("consonants");
                      selectItem(ENGLISH_CONSONANTS[0]);
                      setEnglishAnatomyFilter("all");
                    }}
                    aria-pressed={englishTab === "consonants"}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                      englishTab === "consonants"
                        ? "bg-white text-emerald-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Consonants (ব্যঞ্জনধ্বনি) (২১)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setEnglishTab("numbers");
                      selectItem(ENGLISH_NUMBERS_DATA[0]);
                    }}
                    aria-pressed={englishTab === "numbers"}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                      englishTab === "numbers"
                        ? "bg-white text-amber-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Numbers (0-20)
                  </button>
                </nav>

                {/* English Sub-bar: Case Switcher (Upper / Lower / Pair) + Letter Anatomy Filter */}
                {englishTab !== "numbers" && (
                  <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                    {/* Case Switcher */}
                    <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                      <span className="text-[11px] font-bold text-slate-500 pl-1.5 pr-0.5">রূপ:</span>
                      <button
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setEnglishCase("upper");
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          englishCase === "upper"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-white text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        বড়হাত (A-Z)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setEnglishCase("lower");
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          englishCase === "lower"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-white text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        ছোটহাত (a-z)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setEnglishCase("pair");
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          englishCase === "pair"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-white text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        উভয় রূপ (Aa)
                      </button>
                    </div>

                    {/* Anatomy Filter */}
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                      <span className="text-[11px] font-bold text-slate-500 shrink-0">লাইন বিন্যাস:</span>
                      <button
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setEnglishAnatomyFilter("all");
                        }}
                        className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all shrink-0 ${
                          englishAnatomyFilter === "all"
                            ? "bg-slate-800 text-white shadow-xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        সকল বর্ণ
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setEnglishAnatomyFilter("ascender");
                        }}
                        className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all shrink-0 ${
                          englishAnatomyFilter === "ascender"
                            ? "bg-pink-600 text-white shadow-xs"
                            : "bg-pink-50 text-pink-700 hover:bg-pink-100"
                        }`}
                        title="উর্ধ্বমুখী বর্ণ (b, d, f, h, k, l, t)"
                      >
                        উর্ধ্বমুখী (Ascender)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setEnglishAnatomyFilter("middle");
                        }}
                        className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all shrink-0 ${
                          englishAnatomyFilter === "middle"
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        }`}
                        title="মাঝারি বর্ণ (a, c, e, m, n, o, r, s, u, v, w, x, z)"
                      >
                        মাঝারি (Middle)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setEnglishAnatomyFilter("descender");
                        }}
                        className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all shrink-0 ${
                          englishAnatomyFilter === "descender"
                            ? "bg-amber-600 text-white shadow-xs"
                            : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                        }`}
                        title="নিম্নমুখী বর্ণ (g, j, p, q, y)"
                      >
                        নিম্নমুখী (Descender)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Bangla Navigation Tabs
              <>
                <nav aria-label="বর্ণমালা শ্রেণি নির্বাচন" className="flex items-center gap-1.5 sm:gap-2 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto max-w-full no-scrollbar">
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setActiveTab("vowels");
                      selectItem(VOWELS_DATA[0]);
                      setSelectedMatraFilter("all");
                    }}
                    aria-pressed={activeTab === "vowels"}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                      activeTab === "vowels"
                        ? "bg-white text-pink-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    স্বরবর্ণ (১১)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setActiveTab("consonants");
                      selectItem(CONSONANTS_DATA[0]);
                      setSelectedMatraFilter("all");
                    }}
                    aria-pressed={activeTab === "consonants"}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                      activeTab === "consonants"
                        ? "bg-white text-emerald-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    ব্যঞ্জনবর্ণ (৩৯)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setActiveTab("karchinho");
                      selectItem(KAR_DATA[0]);
                    }}
                    aria-pressed={activeTab === "karchinho"}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                      activeTab === "karchinho"
                        ? "bg-white text-blue-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    কারচিহ্ন (১০)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setActiveTab("juktoborno");
                      selectItem(JUKTOBORNO_DATA[0]);
                    }}
                    aria-pressed={activeTab === "juktoborno"}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                      activeTab === "juktoborno"
                        ? "bg-white text-purple-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    যুক্তবর্ণ (১৬)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setActiveTab("numbers");
                      selectItem(NUMBERS_DATA[0]);
                    }}
                    aria-pressed={activeTab === "numbers"}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                      activeTab === "numbers"
                        ? "bg-white text-amber-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    সংখ্যা (০-২০)
                  </button>
                </nav>

                {/* Matra Filter Sub-bar (Only for Vowels and Consonants) */}
                {(activeTab === "vowels" || activeTab === "consonants") && (
                  <div className="flex items-center gap-2 px-2 overflow-x-auto no-scrollbar">
                    <span className="text-xs font-bold text-slate-500 shrink-0">মাত্রাভেদ:</span>
                    <button
                      type="button"
                      onClick={() => {
                        playPopSound();
                        setSelectedMatraFilter("all");
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedMatraFilter === "all"
                          ? "bg-slate-800 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      সকল বর্ণ
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playPopSound();
                        setSelectedMatraFilter("full");
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedMatraFilter === "full"
                          ? "bg-pink-600 text-white shadow-xs"
                          : "bg-pink-50 text-pink-700 hover:bg-pink-100"
                      }`}
                    >
                      পূর্ণমাত্রা ({activeTab === "vowels" ? "৬টি" : "২৬টি"})
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playPopSound();
                        setSelectedMatraFilter("half");
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedMatraFilter === "half"
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      }`}
                    >
                      অর্ধমাত্রা ({activeTab === "vowels" ? "১টি" : "৭টি"})
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playPopSound();
                        setSelectedMatraFilter("none");
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedMatraFilter === "none"
                          ? "bg-amber-600 text-white shadow-xs"
                          : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                      }`}
                    >
                      মাত্রাহীন ({activeTab === "vowels" ? "৪টি" : "৬টি"})
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 🔤 Interactive Letter Selection Scroll Grid */}
          <div 
            role="region" 
            aria-label={isEnglish ? "English letter list" : "বর্ণ তালিকা"}
            className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 no-scrollbar"
          >
            {filteredList.map((item) => {
              const isSelected = selectedItem.id === item.id;
              const displayGlyph = isEnglish && "upperChar" in item
                ? (item.type === "number" ? item.char : englishCase === "lower" ? item.lowerChar : englishCase === "pair" ? item.displayPair : item.upperChar)
                : item.char;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    playPopSound();
                    selectItem(item);
                    if (isEnglish && "upperChar" in item) {
                      handleSpeak(item.type === "number" ? item.name : item.upperChar);
                    } else {
                      handleSpeak(item.pureSound || item.name);
                    }
                  }}
                  aria-pressed={isSelected}
                  className={`min-w-[64px] sm:min-w-[74px] h-18 sm:h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-0.5 shrink-0 transition-all ${
                    isSelected
                      ? isEnglish
                        ? "border-blue-500 bg-blue-50/90 text-blue-900 shadow-md scale-105 ring-2 ring-blue-500/20"
                        : "border-pink-500 bg-pink-50/90 text-pink-900 shadow-md scale-105 ring-2 ring-pink-500/20"
                      : "border-slate-200 bg-white hover:border-slate-300 text-slate-800"
                  }`}
                >
                  <span className={`font-black ${isEnglish && englishCase === "pair" ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"}`}>
                    {displayGlyph}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-600 px-1 truncate max-w-[66px] text-center">
                    {item.word}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 🎨 Dual Section: Left Info Card + Right Tracing Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Info & Phonics Card */}
            <section 
              aria-label={isEnglish ? "Selected letter information" : "নির্বাচিত বর্ণের তথ্য"}
              className={`lg:col-span-5 p-5 sm:p-6 rounded-3xl border space-y-5 text-center sm:text-left shadow-xs ${
                isEnglish
                  ? "bg-gradient-to-br from-blue-50/70 via-indigo-50/50 to-sky-50/50 border-blue-200/80"
                  : "bg-gradient-to-br from-pink-50/70 via-purple-50/50 to-amber-50/50 border-pink-200/80"
              }`}
            >
              <div className="flex items-center justify-center sm:justify-between gap-4">
                <div className="flex flex-col items-center sm:items-start">
                  <span className={`font-black bg-white px-5 py-2 rounded-3xl shadow-sm border ${
                    isEnglish
                      ? "text-5xl sm:text-6xl text-blue-600 border-blue-100"
                      : "text-6xl sm:text-7xl text-pink-600 border-pink-100"
                  }`}>
                    {isEnglish && englishItem
                      ? (englishItem.type === "number" ? englishItem.char : englishCase === "lower" ? englishItem.lowerChar : englishCase === "pair" ? englishItem.displayPair : englishItem.upperChar)
                      : selectedItem.char}
                  </span>
                  {selectedItem.matraLabel && (
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full mt-2 ${
                      isEnglish ? "text-blue-700 bg-blue-100" : "text-pink-700 bg-pink-100"
                    }`}>
                      {selectedItem.matraLabel}
                    </span>
                  )}
                  {isEnglish && englishItem && englishItem.anatomy && englishItem.type !== "number" && (
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md mt-1">
                      {englishItem.anatomy === "ascender" && "উর্ধ্বমুখী (Top Red to Baseline)"}
                      {englishItem.anatomy === "middle" && "মাঝারি (Midline to Baseline)"}
                      {englishItem.anatomy === "descender" && "নিম্নমুখী (Midline to Bottom Red)"}
                      {englishItem.anatomy === "capital" && "ক্যাপিটাল লেটার (Top to Baseline)"}
                    </span>
                  )}
                </div>
                <div 
                  aria-hidden="true" 
                  className={`text-5xl sm:text-6xl p-3 bg-white rounded-3xl shadow-sm border animate-pulse ${
                    isEnglish ? "border-blue-100" : "border-pink-100"
                  }`}
                >
                  {selectedItem.imageEmoji}
                </div>
              </div>

              {/* Title & Word Breakdown */}
              <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {selectedItem.name} — {selectedItem.word} {isEnglish && englishItem?.wordMeaningBn ? `(${englishItem.wordMeaningBn})` : ""}
                </h2>
                <div className={`p-2.5 rounded-xl border font-bold text-xs sm:text-sm ${
                  isEnglish ? "bg-white/80 text-blue-900 border-blue-100" : "bg-white/70 text-pink-800 border-pink-100"
                }`}>
                  <p>&quot;{selectedItem.rhyme}&quot;</p>
                  {isEnglish && englishItem?.rhymeBn && (
                    <p className="text-[11px] text-blue-700/80 font-medium mt-0.5">({englishItem.rhymeBn})</p>
                  )}
                </div>

                {/* If English Example Words exist */}
                {isEnglish && englishItem?.example && (
                  <div className="text-xs font-bold text-blue-900 bg-blue-50/90 p-3 rounded-2xl border border-blue-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1 text-[11px]">
                        <span>📚</span>
                        <span>আরও শব্দ ও উচ্চারণ:</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      {englishItem.example.split(",").map((exWord, eIdx) => {
                        const trimmed = exWord.trim();
                        if (!trimmed) return null;
                        return (
                          <button
                            key={eIdx}
                            type="button"
                            onClick={() => {
                              playPopSound();
                              handleSpeak(trimmed);
                            }}
                            className="px-2.5 py-1 bg-white hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold shadow-2xs hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-1"
                            title={`"${trimmed}" উচ্চারণ শোনো`}
                          >
                            <Volume2 className="w-3 h-3 text-blue-600" />
                            <span>{trimmed}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* If Juktoborno or Karchinho breakdown exists */}
                {!isEnglish && "breakdown" in selectedItem && selectedItem.breakdown && (
                  <div className="text-xs font-bold text-purple-900 bg-purple-50/90 p-3 rounded-2xl border border-purple-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1">
                        <span>🧩</span>
                        <span>বিশ্লেষণ ও উচ্চারণ:</span>
                      </span>
                      {"example" in selectedItem && selectedItem.example && (
                        <span className="text-[11px] font-medium text-purple-700 bg-white/80 px-2 py-0.5 rounded-md border border-purple-100">
                          যেমন: {selectedItem.example}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      {selectedItem.breakdown
                        .split(/(\s*[\+\=]\s*)/)
                        .filter(Boolean)
                        .map((part: string, pIdx: number) => {
                          const trimmed = part.trim();
                          if (!trimmed) return null;
                          if (trimmed === "+" || trimmed === "=") {
                            return (
                              <span key={pIdx} className="text-purple-400 font-black text-sm px-0.5">
                                {trimmed}
                              </span>
                            );
                          }
                          return (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => {
                                playPopSound();
                                handleSpeak(trimmed);
                              }}
                              className="px-2.5 py-1 bg-white hover:bg-purple-100 active:bg-purple-200 text-purple-900 border border-purple-300 rounded-xl text-xs font-bold shadow-2xs hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-1"
                              title={`"${trimmed}" উচ্চারণ শোনো`}
                            >
                              <Volume2 className="w-3 h-3 text-purple-600" />
                              <span>{trimmed}</span>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>

              {/* Teacher Voice Switcher Bar */}
              <div className="flex items-center justify-between gap-2 bg-white/80 p-2 rounded-2xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-600 text-[11px] flex items-center gap-1">
                  <span>🗣️</span>
                  <span>{isEnglish ? "Teacher's Voice:" : "শিক্ষকের কণ্ঠ:"}</span>
                </span>
                <div className="flex items-center gap-1">
                  {isEnglish ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setEnglishTeacherVoice("ana");
                        }}
                        className={`px-2.5 py-1 rounded-xl font-bold text-xs transition-all ${
                          englishTeacherVoice === "ana"
                            ? "bg-blue-600 text-white shadow-xs scale-102"
                            : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                        }`}
                        title="Teacher Ana (US English Child Friendly)"
                      >
                        👧 Teacher Ana
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setEnglishTeacherVoice("guy");
                        }}
                        className={`px-2.5 py-1 rounded-xl font-bold text-xs transition-all ${
                          englishTeacherVoice === "guy"
                            ? "bg-indigo-600 text-white shadow-xs scale-102"
                            : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                        }`}
                        title="Teacher Guy (US English Standard)"
                      >
                        👨‍🏫 Teacher Guy
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setTeacherVoice("nabanita");
                        }}
                        className={`px-2.5 py-1 rounded-xl font-bold text-xs transition-all ${
                          teacherVoice === "nabanita"
                            ? "bg-pink-600 text-white shadow-xs scale-102"
                            : "bg-pink-50 text-pink-700 hover:bg-pink-100"
                        }`}
                        title="নবনীতা ম্যাম (মহিলা কণ্ঠ)"
                      >
                        👩‍🏫 নবনীতা ম্যাম
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setTeacherVoice("pradeep");
                        }}
                        className={`px-2.5 py-1 rounded-xl font-bold text-xs transition-all ${
                          teacherVoice === "pradeep"
                            ? "bg-blue-600 text-white shadow-xs scale-102"
                            : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                        }`}
                        title="প্রদীপ স্যার (পুরুষ কণ্ঠ)"
                      >
                        👨‍🏫 প্রদীপ স্যার
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons: Letter Name (English), Pure Sound/Phonics, Rhyme, Record, Celebrate */}
              <div className="pt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
                {isEnglish && englishItem && (
                  <button
                    type="button"
                    onClick={() => handleSpeak(englishItem.name)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white text-sky-700 hover:bg-sky-50 border border-sky-200 shadow-xs transition-all"
                    title="অক্ষরের নাম শুনুন (Letter Name)"
                  >
                    <span>🔤 {englishItem.type === "number" ? "Number Name" : "Letter Name"}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleSpeakPure(selectedItem)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isSpeaking 
                      ? isEnglish ? "bg-blue-600 text-white animate-pulse" : "bg-pink-600 text-white animate-pulse" 
                      : isEnglish 
                        ? "bg-white text-blue-700 hover:bg-blue-50 border border-blue-200 shadow-xs"
                        : "bg-white text-pink-700 hover:bg-pink-50 border border-pink-200 shadow-xs"
                  }`}
                  title={isEnglish ? "Listen to pure Phonics sound" : "শুধু বিশুদ্ধ বর্ণধ্বনি শুনুন"}
                >
                  <Volume2 className={`w-4 h-4 ${isSpeaking ? "text-white" : isEnglish ? "text-blue-600" : "text-pink-600"}`} aria-hidden="true" />
                  <span>{isEnglish ? "🔊 Phonics Sound" : "🔊 বর্ণধ্বনি"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSpeakRhyme(selectedItem)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white border shadow-xs transition-all ${
                    isEnglish
                      ? "text-indigo-700 hover:bg-indigo-50 border-indigo-200"
                      : "text-purple-700 hover:bg-purple-50 border border-purple-200"
                  }`}
                  title={isEnglish ? "Listen to Phonics Rhyme & Sentence" : "ছড়া ও উদাহরণ বাক্য শুনুন"}
                >
                  <span>{isEnglish ? "🎵 Phonics Rhyme" : "🎵 ছড়া ও বাক্য"}</span>
                </button>

                {/* Voice Recording Button */}
                <button
                  type="button"
                  onClick={handleToggleRecord}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isRecording 
                      ? "bg-rose-600 text-white animate-pulse shadow-md" 
                      : "bg-white text-rose-700 hover:bg-rose-50 border border-rose-200 shadow-xs"
                  }`}
                  title="বাচ্চার উচ্চারণ রেকর্ড করুন"
                >
                  {isRecording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4 text-rose-600" />}
                  <span>{isRecording ? `রেকর্ড থামাও (${recordCountdown}s)` : "আমার কণ্ঠ রেকর্ড"}</span>
                </button>

                {/* Play Recorded Voice */}
                {recordedAudioUrl && !isRecording && (
                  <button
                    type="button"
                    onClick={handlePlayRecorded}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs animate-in zoom-in-95 ${
                      isPlayingRecorded
                        ? "bg-purple-600 text-white animate-pulse"
                        : "bg-purple-100 hover:bg-purple-200 text-purple-800"
                    }`}
                    title={isPlayingRecorded ? "বাজানো থামাও" : "আমার রেকর্ড করা কথা শুনো"}
                  >
                    {isPlayingRecorded ? (
                      <Square className="w-4 h-4 fill-white" />
                    ) : (
                      <Play className="w-4 h-4 fill-purple-700 text-purple-700" />
                    )}
                    <span>{isPlayingRecorded ? "রেকর্ড থামাও" : "আমার রেকর্ড শোনো"}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCelebrateManual}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  <span>বাহবা দাও!</span>
                </button>
              </div>

              {/* Stroke Order Guide Tip Box */}
              {showStrokeGuide && (
                <div className="p-3 bg-amber-50/90 rounded-2xl border border-amber-200/90 text-xs text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1 text-amber-800">
                    <span>✏️ {isEnglish ? "Handwriting Stroke Guide:" : "হাত ঘোরানোর সহজ নিয়ম:"}</span>
                  </div>
                  <p className="text-[11px] sm:text-xs leading-relaxed text-amber-950 font-medium">
                    {isEnglish && englishItem
                      ? englishCase === "lower"
                        ? englishItem.strokeGuideLower
                        : englishCase === "pair"
                          ? `Capital: ${englishItem.strokeGuideUpper} • Small: ${englishItem.strokeGuideLower}`
                          : englishItem.strokeGuideUpper
                      : selectedItem.strokeGuide}
                  </p>
                </div>
              )}
            </section>

            {/* Right Canvas Tracing Board */}
            <section 
              aria-label="হাত ঘুরিয়ে লেখার ক্যানভাস বোর্ড"
              className="lg:col-span-7 space-y-3"
            >
              {/* Drawing Tools Palette (Phase 2) */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 bg-slate-100 rounded-2xl border border-slate-200">
                {/* Brush Types (Pencil, Chalk, Rainbow, Eraser) */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setBrushMode("pencil");
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                      brushMode === "pencil" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"
                    }`}
                    title="সাধারণ পেন্সিল"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">পেন্সিল</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setBrushMode("chalk");
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                      brushMode === "chalk" ? "bg-purple-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"
                    }`}
                    title="চক পেন্সিল"
                  >
                    <Sparkle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">চক</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setBrushMode("rainbow");
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                      brushMode === "rainbow" ? "bg-gradient-to-r from-pink-500 to-amber-500 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"
                    }`}
                    title="জাদুকরী রংধনু ব্রাশ"
                  >
                    <span>🌈</span>
                    <span className="hidden sm:inline">রংধনু</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setBrushMode("eraser");
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                      brushMode === "eraser" ? "bg-rose-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"
                    }`}
                    title="ইরেজার (মুছে ফেলা)"
                  >
                    <Eraser className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">মুছুনি</span>
                  </button>
                </div>

                {/* Color Swatches */}
                {brushMode !== "rainbow" && brushMode !== "eraser" && (
                  <div className="flex items-center gap-1.5" role="group" aria-label="রং নির্বাচন">
                    {COLOR_PALETTE.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setBrushColor(c.hex);
                        }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-transform ${
                          brushColor === c.hex ? "scale-115 ring-2 ring-slate-800" : "hover:scale-105 active:scale-95"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                        aria-label={`${c.name} পেন্সিল`}
                      />
                    ))}
                  </div>
                )}

                {/* Brush Size Controls */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setBrushSize(6)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold ${brushSize === 6 ? "bg-slate-800 text-white" : "text-slate-600"}`}
                    title="চিকন দাগ"
                  >
                    চিকন
                  </button>
                  <button
                    type="button"
                    onClick={() => setBrushSize(12)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold ${brushSize === 12 ? "bg-slate-800 text-white" : "text-slate-600"}`}
                    title="মাঝারি দাগ"
                  >
                    মাঝারি
                  </button>
                  <button
                    type="button"
                    onClick={() => setBrushSize(22)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold ${brushSize === 22 ? "bg-slate-800 text-white" : "text-slate-600"}`}
                    title="মোটা দাগ"
                  >
                    মোটা
                  </button>
                </div>

                {/* Undo, Redo, Download & Clear */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleUndo}
                    className="p-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 border border-slate-200"
                    title="পেছনে যাও (Undo)"
                  >
                    <Undo2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleRedo}
                    className="p-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 border border-slate-200"
                    title="সামনে যাও (Redo)"
                  >
                    <Redo2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadDrawing}
                    className="p-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 border border-slate-200"
                    title="ছবি ডাউনলোড করো (PNG)"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      undoStackRef.current = [];
                      redoStackRef.current = [];
                      setupCanvas(false);
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1"
                    title="নতুন করে পরিষ্কার করো"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>পরিষ্কার</span>
                  </button>
                </div>
              </div>

              {/* Interactive Canvas Board */}
              <div className="relative rounded-3xl border-2 border-dashed border-slate-300 bg-white p-1 overflow-hidden shadow-inner flex items-center justify-center touch-none select-none overscroll-none">
                <canvas
                  ref={canvasRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  className="touch-none select-none w-full max-w-[560px] h-[270px] sm:h-[330px] rounded-2xl cursor-crosshair bg-white"
                  aria-label={`'${selectedItem.char}' বর্ণটি হাত ঘুরিয়ে লেখার ট্রেসিং ক্যানভাস`}
                />
              </div>

              {/* Bottom Tracing Controls Bar: Grid toggle, Accuracy verification */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRuledGrid(!showRuledGrid)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors"
                  >
                    {showRuledGrid ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>
                      {showRuledGrid
                        ? isEnglish ? "৪-দাগের রুল্ড লাইন লুকাও" : "৩-দাগের রুল্ড লাইন লুকাও"
                        : isEnglish ? "৪-দাগের ইংলিশ খাতা দেখাও" : "৩-দাগের রুল্ড খাতা দেখাও"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowStrokeGuide(!showStrokeGuide)}
                    className="text-xs font-semibold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-colors"
                  >
                    <span>{showStrokeGuide ? (isEnglish ? "Hide Rules" : "নিয়ম লুকাও") : (isEnglish ? "Show Stroke Rules" : "লেখার নিয়ম দেখাও")}</span>
                  </button>
                </div>

                {/* Accuracy Detection Button (Phase 3) */}
                <button
                  type="button"
                  onClick={handleVerifyAccuracy}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-105 active:scale-95 ${
                    isEnglish ? "bg-blue-600 hover:bg-blue-700" : "bg-pink-600 hover:bg-pink-700"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isEnglish ? "Verify Writing & Win Stars!" : "লেখা যাচাই করো ও স্টার নাও!"}</span>
                </button>
              </div>

              {/* Accuracy Feedback Banner */}
              {accuracyScore !== null && (
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 flex items-center justify-between animate-in zoom-in-95">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌟</span>
                    <div>
                      <span className="font-bold text-xs sm:text-sm">
                        {isEnglish 
                          ? `Your tracing is approximately ${accuracyScore}% accurate!` 
                          : `তোমার ট্রেসিং প্রায় ${accuracyScore}% নিখুঁত হয়েছে!`}
                      </span>
                      <span className="text-[11px] text-emerald-700 block">
                        {isEnglish 
                          ? "Great effort! Practice daily for perfect handwriting." 
                          : "দারুণ চেষ্টা! নিয়মিত লিখলে লেখা আরও সুন্দর হবে।"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                    <span>⭐⭐⭐</span>
                  </div>
                </div>
              )}
            </section>
          </div>
        </>
      )}

      {/* 🖨️ Offline Worksheet Modal (Phase 4 / Phase 5) */}
      <BornomalaWorksheetModal
        item={selectedItem}
        isOpen={isWorksheetOpen}
        onClose={() => setIsWorksheetOpen(false)}
        languageMode={languageMode}
        englishCase={englishCase}
      />

      {/* 🎓 Certificate Modal (Phase 4 / Phase 5) */}
      <BornomalaCertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        stars={stars}
        languageMode={languageMode}
      />

      {/* 🎴 Classroom Flashcard Modal (Phase 4 / Phase 5) */}
      <BornomalaFlashcardModal
        items={filteredList}
        isOpen={isFlashcardOpen}
        onClose={() => setIsFlashcardOpen(false)}
        languageMode={languageMode}
      />
    </article>
  );
}
