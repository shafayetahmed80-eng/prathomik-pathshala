"use client";

import { useState, useEffect, useRef } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX,
  Download, 
  Printer, 
  Clock, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  Info,
  PenTool,
  RotateCcw,
  Play,
  Pause,
  Trash2,
  FileText,
  Award,
  X,
  Check,
  Music,
  Sun,
  Snowflake,
  Layers,
  Smile,
  Undo2,
  Redo2,
  Eraser,
  Highlighter,
  Zap,
  Circle,
  Square,
  ArrowRight,
  Camera,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Flashlight,
  Stamp,
  Heart,
  Mic,
  Puzzle,
  Trophy,
  Eye,
  EyeOff,
  Languages,
  Wind,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  BookOpen,
  LayoutList,
  Columns2,
  Image as ImageIcon,
  Search
} from "lucide-react";
import confetti from "canvas-confetti";
import { SLIDE_DECKS, PILOT_SLIDE_DECK, SlideItem, SyllableWord, SortingItem, PunctuationChallenge, SlideDeck } from "@/data/slidesData";
import ActivityAColoringCanvas from "./ActivityAColoringCanvas";
import StoryVisualStage from "./StoryVisualStage";
import KiteCraftingVisualStage from "./KiteCraftingVisualStage";
import IntroducingJerinVisualStage from "./IntroducingJerinVisualStage";
import SabihasFamilyVisualStage from "./SabihasFamilyVisualStage";
import SunilRahatFriendshipVisualStage from "./SunilRahatFriendshipVisualStage";
import PorshisSchoolVisualStage from "./PorshisSchoolVisualStage";
import NusairCleanlinessVisualStage from "./NusairCleanlinessVisualStage";
import WaterPollutionVisualStage from "./WaterPollutionVisualStage";
import OsmansVillageLifeVisualStage from "./OsmansVillageLifeVisualStage";
import FazleAnitaBreakfastVisualStage from "./FazleAnitaBreakfastVisualStage";
import CalendarMonthsVisualStage from "./CalendarMonthsVisualStage";
import SchoolLibraryCardVisualStage from "./SchoolLibraryCardVisualStage";
import MitasDayVisualStage from "./MitasDayVisualStage";
import SagarFamilyVisualStage from "./SagarFamilyVisualStage";
import SagarsWeekVisualStage from "./SagarsWeekVisualStage";
import StationeryShopVisualStage from "./StationeryShopVisualStage";
import TrafficSafetyVisualStage from "./TrafficSafetyVisualStage";
import RajuFirefighterVisualStage from "./RajuFirefighterVisualStage";
import SreemangalTeaVisualStage from "./SreemangalTeaVisualStage";
import ReshmaGarmentsWorkerVisualStage from "./ReshmaGarmentsWorkerVisualStage";
import LionAndMouseVisualStage from "./LionAndMouseVisualStage";
import CleverCrowVisualStage from "./CleverCrowVisualStage";
import SimaJessicaVisualStage from "./SimaJessicaVisualStage";
import SaikatsFamilyVisualStage from "./SaikatsFamilyVisualStage";
import FoodPyramidVisualStage from "./FoodPyramidVisualStage";
import DoctorsAdviceVisualStage from "./DoctorsAdviceVisualStage";
import RajuOccupationsC5VisualStage from "./RajuOccupationsC5VisualStage";
import { KishoreganjDistrictVisualStage } from "./KishoreganjDistrictVisualStage";
import { SaintMartinsIslandVisualStage } from "./SaintMartinsIslandVisualStage";
import { HareAndTortoiseVisualStage } from "./HareAndTortoiseVisualStage";
import { LiberationWarMuseumVisualStage } from "./LiberationWarMuseumVisualStage";
import { MariaLifeIsBeautifulVisualStage } from "./MariaLifeIsBeautifulVisualStage";
import OyshisCityLifeVisualStage from "./OyshisCityLifeVisualStage";
import HandwashingVisualStage from "./HandwashingVisualStage";
import InclusiveEducationVisualStage from "./InclusiveEducationVisualStage";
import SaveWaterVisualStage from "./SaveWaterVisualStage";
import HillFestivalVisualStage from "./HillFestivalVisualStage";

export default function MultimediaSlideDeck() {
  const [selectedDeckId, setSelectedDeckId] = useState<string>("introducing-jerin");
  const [isDeckSelectorOpen, setIsDeckSelectorOpen] = useState<boolean>(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const deckContainerRef = useRef<HTMLElement | null>(null);
  const [isTeacherNotesExpanded, setIsTeacherNotesExpanded] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [sfxEnabled, setSfxEnabled] = useState<boolean>(true);

  // Dual Accent Engine & Speed Control
  const [accentMode, setAccentMode] = useState<"bd" | "intl">("bd"); // Default: Bangladeshi Classroom Phonics
  const [speechSpeed, setSpeechSpeed] = useState<0.25 | 0.5 | 0.7 | 0.85>(0.5); // Default: 0.5x (Ultra-slow Phonics)

  // Real-time Synchronized Word Karaoke Tracking
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number | null>(null);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);

  // Robust Audio Engine: Edge Neural Bengali TTS & Speech Anchoring
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speechWatchdogRef = useRef<NodeJS.Timeout | null>(null);
  const audioStreamPlayerRef = useRef<HTMLAudioElement | null>(null);
  const [isBanglaSpeaking, setIsBanglaSpeaking] = useState<boolean>(false);

  // Lesson Picker Filter & Search State
  const [modalClassFilter, setModalClassFilter] = useState<"all" | "class3" | "class4" | "class5">("all");
  const [modalSearchQuery, setModalSearchQuery] = useState<string>("");

  // Active word in Syllable Phonics Inspector modal
  const [inspectedWord, setInspectedWord] = useState<SyllableWord | null>(null);

  // Teacher Smart Marker / Annotation Suite (Full Phase 1 & Phase 2 Suite)
  const [isPenActive, setIsPenActive] = useState<boolean>(false);
  const [markerTool, setMarkerTool] = useState<"pen" | "highlighter" | "laser" | "eraser" | "shape" | "stamp" | "spotlight">("pen");
  const [shapeType, setShapeType] = useState<"circle" | "arrow" | "box">("circle");
  const [selectedStamp, setSelectedStamp] = useState<string>("⭐");
  const [penColor, setPenColor] = useState<string>("#ef4444"); // Red, Amber, Emerald, Sky, Purple, Dark
  const [brushSize, setBrushSize] = useState<"fine" | "medium" | "bold">("medium");
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);
  const [markerPopover, setMarkerPopover] = useState<"color" | "shape" | "stamp" | null>(null);

  // Draggable & Minimizable Floating Toolbar States
  const [isToolbarMinimized, setIsToolbarMinimized] = useState<boolean>(false);
  const [toolbarPos, setToolbarPos] = useState<{ x: number; y: number } | null>(null);
  const isDraggingToolbarRef = useRef<boolean>(false);
  const dragStartOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const penCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const laserCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const shapeStartCoordsRef = useRef<{ x: number; y: number } | null>(null);

  // Undo / Redo Stacks
  const undoStackRef = useRef<ImageData[]>([]);
  const redoStackRef = useRef<ImageData[]>([]);

  // Slide-wise drawing persistence
  const slideDrawingsRef = useRef<{ [slideIndex: number]: ImageData }>({});
  const prevSlideIndexRef = useRef<number>(currentSlideIndex);

  // Magic Laser Pointer Trail with Auto-Fade RAF loop
  const laserTrailRef = useRef<Array<{ x: number; y: number; time: number }>>([]);
  const laserRafIdRef = useRef<number | null>(null);

  // Classroom Countdown Timer
  const [timerSeconds, setTimerSeconds] = useState<number>(180); // 3 minutes default
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showTimerWidget, setShowTimerWidget] = useState<boolean>(false);

  // 🌟 10 Content Interactive Features States
  // 1. Voice Practice (Speak & Score with Mic)
  const [activeMicSentence, setActiveMicSentence] = useState<number | null>(null);
  const [speechFeedback, setSpeechFeedback] = useState<{ sentenceIdx: number; score: number; text: string; status: "listening" | "success" | "retry" } | null>(null);

  // 2. Character Roleplay Mode (Team Ant vs Team Grasshopper)
  const [roleplayMode, setRoleplayMode] = useState<"none" | "ant" | "grasshopper">("none");

  // 3. Sentence Builder Puzzle
  const [showSentencePuzzle, setShowSentencePuzzle] = useState<boolean>(false);
  const [puzzleTargetSentence, setPuzzleTargetSentence] = useState<string>("");
  const [scrambledWords, setScrambledWords] = useState<Array<{ id: string; word: string }>>([]);
  const [userBuiltWords, setUserBuiltWords] = useState<Array<{ id: string; word: string }>>([]);
  const [puzzleSolved, setPuzzleSolved] = useState<boolean>(false);

  // 5. Memory Blinder (Cloze hide words)
  const [isMemoryBlinderActive, setIsMemoryBlinderActive] = useState<boolean>(false);
  const [revealedWords, setRevealedWords] = useState<{ [key: string]: boolean }>({});

  // 6. Classroom Team Battle Scoreboard
  const [showScoreboard, setShowScoreboard] = useState<boolean>(false);
  const [teamShaplaScore, setTeamShaplaScore] = useState<number>(0);
  const [teamGolapScore, setTeamGolapScore] = useState<number>(0);
  const [scoreboardWinner, setScoreboardWinner] = useState<string | null>(null);

  // 7. Ambient Story Soundscape
  const [isAmbiencePlaying, setIsAmbiencePlaying] = useState<boolean>(false);
  const ambienceOscRef = useRef<any>(null);

  // 8. Dual-Language Interlinear Translation
  const [showInterlinear, setShowInterlinear] = useState<boolean>(false);

  // Story Reading Presentation Layout Mode (Natural Paragraph vs Focus Sentence Cards)
  const [storyLayoutMode, setStoryLayoutMode] = useState<"paragraph" | "strips">("paragraph");

  // 3-in-1 Story Presentation Layout Mode (Split-View 50/50, Full Theater Scene, Full-Width Reading)
  const [storyViewMode, setStoryViewMode] = useState<"split" | "visual" | "text">("split");

  // Story Sub-tab Mode (Reading vs Roleplay Dialogue - Option ক)
  const [activeStorySubTab, setActiveStorySubTab] = useState<"reading" | "roleplay">("reading");

  // 9. Interactive Moral Compass Decision (Slide 6)
  const [moralVote, setMoralVote] = useState<"help" | "strict" | null>(null);

  // Sorting Game State (Slide 6 & 7)
  const [sortedItems, setSortedItems] = useState<{ [id: string]: string }>({});
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  // Punctuation Game State (Slide 8)
  const [punctuationAnswers, setPunctuationAnswers] = useState<{ [id: string]: string }>({});

  // Worksheet Print Modal
  const [showWorksheetModal, setShowWorksheetModal] = useState<boolean>(false);

  // Snowflake Canvas ref for winter scene
  const snowCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeDeck: SlideDeck = SLIDE_DECKS[selectedDeckId] || PILOT_SLIDE_DECK;
  const currentSlide: SlideItem = activeDeck.slides[currentSlideIndex] || activeDeck.slides[0];
  const totalSlides = activeDeck.slides.length;

  // Reusable sound chime helper using Web Audio API (Mobile-Safe Singleton)
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playChime = (type: "correct" | "click" | "fanfare" | "pop" | "wrong") => {
    if (!sfxEnabled || typeof window === "undefined") return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const audioCtx = audioCtxRef.current;
      if (audioCtx.state === "suspended") {
        audioCtx.resume().catch(() => {});
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === "correct") {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.15); // E5
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else if (type === "click") {
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      } else if (type === "pop") {
        // High-pitched pleasant bubble pop (700Hz -> 1250Hz)
        osc.type = "sine";
        osc.frequency.setValueAtTime(700, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1250, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.09);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.09);
      } else if (type === "wrong") {
        // Soft downward chime for retry (240Hz -> 140Hz)
        osc.type = "triangle";
        osc.frequency.setValueAtTime(240, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.22);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.24);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.24);
      } else if (type === "fanfare") {
        const now = audioCtx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const o = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          o.connect(g);
          g.connect(audioCtx.destination);
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.1, now + i * 0.1);
          g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.3);
          o.start(now + i * 0.1);
          o.stop(now + i * 0.1 + 0.3);
        });
      }
    } catch {
      // AudioContext not allowed or not supported on this device
    }
  };


  // Countdown timer interval
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      timer = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            playChime("fanfare");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerRunning, timerSeconds]);

  // Snowfall Particle Animation for Winter scenes (Slide 5)
  useEffect(() => {
    if (currentSlide.sceneType !== "winter") return;
    const canvas = snowCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    canvas.width = canvas.parentElement?.clientWidth || 800;
    canvas.height = canvas.parentElement?.clientHeight || 450;

    const snowflakes = Array.from({ length: 65 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      density: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.3
    }));

    const renderSnow = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";

      snowflakes.forEach((f) => {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 240, 255, ${f.alpha})`;
        ctx.fill();

        f.y += f.density;
        f.x += Math.sin(f.y * 0.02) * 0.5;

        if (f.y > canvas.height) {
          f.y = -5;
          f.x = Math.random() * canvas.width;
        }
      });

      animationFrame = requestAnimationFrame(renderSnow);
    };

    renderSnow();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentSlide.sceneType]);

  // Helper to map speech boundary charIndex to word index
  const getWordIndexAtChar = (text: string, charIndex: number): number => {
    let charCount = 0;
    const words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
      const len = words[i].length;
      if (charIndex >= charCount && charIndex <= charCount + len) {
        return i;
      }
      charCount += len + 1; // +1 for space
    }
    return Math.max(0, words.length - 1);
  };

  // Pre-fetch voices on mount (critical for mobile Chrome & iOS Safari)
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      const onVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.onvoiceschanged = onVoicesChanged;
      return () => {
        if ("speechSynthesis" in window) {
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
    }
  }, []);

  // Helper to pick best available voice on this device
  const getDeviceVoiceAndLang = (mode: "bd" | "intl") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return { voice: null, lang: "en-US" };
    }
    const voices = window.speechSynthesis.getVoices() || [];
    let chosen: SpeechSynthesisVoice | null = null;
    let fallbackLang = "en-US";

    if (mode === "bd") {
      chosen = voices.find((v) => v.lang.includes("en-IN") || v.name.includes("India") || v.name.includes("Ravi") || v.name.includes("Heera"))
            || voices.find((v) => v.lang.startsWith("en-GB"))
            || voices.find((v) => v.lang.startsWith("en-US") || v.lang.startsWith("en"))
            || (voices.length > 0 ? voices[0] : null);
      fallbackLang = chosen ? chosen.lang : "en-IN";
    } else {
      chosen = voices.find((v) => (v.lang.startsWith("en-US") || v.lang.startsWith("en-GB")) && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Online")))
            || voices.find((v) => v.lang.startsWith("en-US") || v.lang.startsWith("en-GB"))
            || voices.find((v) => v.lang.startsWith("en"))
            || (voices.length > 0 ? voices[0] : null);
      fallbackLang = chosen ? chosen.lang : "en-US";
    }

    return { voice: chosen, lang: fallbackLang };
  };

  // Safe speed for mobile TTS engines (Android Google TTS crashes if rate < 0.5)
  const getSafeSpeed = (spd: number) => {
    if (typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      return Math.max(0.5, spd);
    }
    return spd;
  };

  // Stop all active audio streams, syntheses, and recognition
  const stopAllSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    if (audioStreamPlayerRef.current) {
      try {
        audioStreamPlayerRef.current.pause();
        audioStreamPlayerRef.current.currentTime = 0;
      } catch {}
      audioStreamPlayerRef.current = null;
    }
    if (speechWatchdogRef.current) {
      clearTimeout(speechWatchdogRef.current);
      speechWatchdogRef.current = null;
    }
    activeUtteranceRef.current = null;
    setIsSpeaking(false);
    setIsBanglaSpeaking(false);
    setActiveSentenceIndex(null);
    setActiveWordIndex(null);
    setActiveMicSentence(null);
  };

  // Auto-stop speech on slide change or deck switch
  useEffect(() => {
    stopAllSpeech();
  }, [selectedDeckId, currentSlideIndex]);

  // Stream Microsoft Edge Neural Bengali Voice (/api/tts)
  const speakBangla = async (text: string) => {
    stopAllSpeech();
    try {
      setIsBanglaSpeaking(true);
      const url = `/api/tts?text=${encodeURIComponent(text)}&lang=bn-BD&voice=nabanita`;
      const audio = new Audio(url);
      audioStreamPlayerRef.current = audio;
      audio.onended = () => {
        setIsBanglaSpeaking(false);
        audioStreamPlayerRef.current = null;
      };
      audio.onerror = () => {
        setIsBanglaSpeaking(false);
        audioStreamPlayerRef.current = null;
      };
      await audio.play();
    } catch (err) {
      console.warn("Bengali TTS stream playback failed", err);
      setIsBanglaSpeaking(false);
    }
  };

  // Play an individual sentence with word-by-word motion karaoke & GC-leak protection
  const playSentence = (
    sentenceText: string, 
    sentenceIndex: number, 
    speaker?: string, 
    onComplete?: () => void
  ) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    stopAllSpeech();

    setActiveSentenceIndex(sentenceIndex);
    setActiveWordIndex(0);

    const utterance = new SpeechSynthesisUtterance(sentenceText);
    activeUtteranceRef.current = utterance; // Anchor reference against Chromium GC bug

    const { voice, lang } = getDeviceVoiceAndLang(accentMode);
    if (voice) utterance.voice = voice;
    utterance.lang = lang;

    const effectiveSpeed = getSafeSpeed(speechSpeed);
    utterance.rate = effectiveSpeed;
    utterance.pitch = (speaker === "Ant" || speaker?.includes("Ant") || speaker?.includes("Guide") || speaker?.includes("Student A")) 
      ? 1.15 
      : (speaker === "Grasshopper" || speaker?.includes("Maker") || speaker?.includes("Student B")) 
      ? 0.95 
      : (accentMode === "bd" ? 1.05 : 1.0);

    // Fallback word highlighting for mobile devices where onboundary is not supported
    const words = sentenceText.split(" ");
    let currentWordIdx = 0;
    let boundaryFired = false;
    let fallbackTimer: NodeJS.Timeout | null = null;

    const approxMsPerWord = Math.max(220, (sentenceText.length * 60) / (effectiveSpeed * (words.length || 1)));

    // Word boundary tracking for real-time motion karaoke
    utterance.onboundary = (event) => {
      if (event.name === "word") {
        boundaryFired = true;
        if (fallbackTimer) clearInterval(fallbackTimer);
        const idx = getWordIndexAtChar(sentenceText, event.charIndex);
        setActiveWordIndex(idx);
      }
    };

    // If boundary doesn't fire within approx duration, start fallback pacing
    fallbackTimer = setInterval(() => {
      if (boundaryFired) {
        if (fallbackTimer) clearInterval(fallbackTimer);
        return;
      }
      currentWordIdx++;
      if (currentWordIdx < words.length) {
        setActiveWordIndex(currentWordIdx);
      } else {
        if (fallbackTimer) clearInterval(fallbackTimer);
      }
    }, approxMsPerWord);

    setIsSpeaking(true);

    const cleanup = () => {
      if (fallbackTimer) clearInterval(fallbackTimer);
      if (speechWatchdogRef.current) {
        clearTimeout(speechWatchdogRef.current);
        speechWatchdogRef.current = null;
      }
      if (activeUtteranceRef.current === utterance) {
        activeUtteranceRef.current = null;
      }
      setIsSpeaking(false);
      setActiveSentenceIndex(null);
      setActiveWordIndex(null);
    };

    utterance.onend = () => {
      cleanup();
      if (onComplete) onComplete();
    };

    utterance.onerror = () => {
      cleanup();
    };

    // Adaptive watchdog timer to prevent speech engine freezing indefinitely
    const maxSafeDuration = Math.max(12000, approxMsPerWord * words.length * 1.6);
    if (speechWatchdogRef.current) clearTimeout(speechWatchdogRef.current);
    speechWatchdogRef.current = setTimeout(() => {
      if (activeUtteranceRef.current === utterance) {
        try { window.speechSynthesis.cancel(); } catch {}
        cleanup();
        if (onComplete) onComplete();
      }
    }, maxSafeDuration);

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.speak(utterance);
    } catch {
      cleanup();
    }
  };

  // Play all sentences & dialogues sequentially on the slide with word-by-word karaoke
  const playSlideAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isSpeaking || isBanglaSpeaking) {
      stopAllSpeech();
      return;
    }

    const sentences = currentSlide.content.englishText || [];
    const dialogues = currentSlide.content.dialogue || [];
    if (sentences.length === 0 && dialogues.length === 0) return;

    let sIdx = 0;
    let dIdx = 0;

    const playNextDialogue = () => {
      if (dIdx < dialogues.length) {
        const curD = dialogues[dIdx];
        const curIdx = 100 + dIdx;
        dIdx++;
        playSentence(curD.text, curIdx, curD.speaker, playNextDialogue);
      } else {
        stopAllSpeech();
      }
    };

    const playNextSentence = () => {
      if (sIdx < sentences.length) {
        const curIdx = sIdx;
        sIdx++;
        playSentence(sentences[curIdx], curIdx, undefined, playNextSentence);
      } else if (dialogues.length > 0) {
        playNextDialogue();
      } else {
        stopAllSpeech();
      }
    };

    playNextSentence();
  };

  // Dual-Accent Speech Synthesis Engine (🇧🇩 Bangladeshi Classroom Phonics vs 🌐 International Accent)
  // Auto-routes Bengali phrases to Microsoft Edge Neural Bengali Voice (/api/tts)
  const handleSpeak = (text: string, forceAccent?: "bd" | "intl", customSpeed?: 0.25 | 0.5 | 0.7 | 0.85) => {
    if (!text || text.trim().length === 0) return;

    // If text contains Bengali characters, route to Edge Neural Bengali Voice
    if (/[\u0980-\u09FF]/.test(text)) {
      speakBangla(text);
      return;
    }

    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    stopAllSpeech();

    // Strip punctuation for crisp single-word articulation
    const cleanWord = text.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "").trim();
    const targetText = cleanWord.length > 0 ? cleanWord : text;

    const effectiveAccent = forceAccent || accentMode;
    const effectiveSpeed = getSafeSpeed(customSpeed || speechSpeed);
    const utterance = new SpeechSynthesisUtterance(targetText);
    activeUtteranceRef.current = utterance; // Anchor reference against GC

    const { voice, lang } = getDeviceVoiceAndLang(effectiveAccent);

    if (voice) utterance.voice = voice;
    utterance.lang = lang;
    utterance.rate = effectiveSpeed;
    utterance.pitch = effectiveAccent === "bd" ? 1.05 : 1.0;

    setIsSpeaking(true);
    utterance.onend = () => {
      if (activeUtteranceRef.current === utterance) activeUtteranceRef.current = null;
      setIsSpeaking(false);
    };
    utterance.onerror = () => {
      if (activeUtteranceRef.current === utterance) activeUtteranceRef.current = null;
      setIsSpeaking(false);
    };

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.speak(utterance);
    } catch {
      activeUtteranceRef.current = null;
      setIsSpeaking(false);
    }
  };

  const handleNext = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setActiveSentenceIndex(null);
    setActiveWordIndex(null);
    setActiveStorySubTab("reading");
    setIsTeacherNotesExpanded(false);
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      setQuizAnswer(null);
      playChime("click");
    }
  };

  const handlePrev = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setActiveSentenceIndex(null);
    setActiveWordIndex(null);
    setActiveStorySubTab("reading");
    setIsTeacherNotesExpanded(false);
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      setQuizAnswer(null);
      playChime("click");
    }
  };

  // Native Fullscreen API integration with seamless fallback
  const toggleFullscreen = async () => {
    try {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        isFullscreen
      );

      if (!isCurrentlyFullscreen) {
        const container = deckContainerRef.current || document.documentElement;
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if ((container as any).webkitRequestFullscreen) {
          await (container as any).webkitRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
          if (document.exitFullscreen) {
            await document.exitFullscreen();
          } else if ((document as any).webkitExitFullscreen) {
            await (document as any).webkitExitFullscreen();
          }
        }
        setIsFullscreen(false);
      }
    } catch {
      // Fallback to CSS pseudo-fullscreen if native API is restricted by iframe/policy
      setIsFullscreen((prev) => !prev);
    }
    playChime("click");
  };

  // Sync state when native fullscreen state changes (e.g. via F11 or Esc)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const activeFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement
      );
      setIsFullscreen(activeFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Keyboard & Wireless Presenter Remote Navigation (PageDown, PageUp, Arrows, Space, F, Home, End)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in form inputs/modals
      const target = e.target as HTMLElement;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable) {
        return;
      }

      // If user is actively drawing a stroke with pen, don't trigger navigation
      if (isDrawing) return;

      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " " || e.code === "Space") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Home") {
        e.preventDefault();
        setCurrentSlideIndex(0);
        setQuizAnswer(null);
        playChime("click");
      } else if (e.key === "End") {
        e.preventDefault();
        setCurrentSlideIndex(totalSlides - 1);
        setQuizAnswer(null);
        playChime("click");
      } else if ((e.key === "f" || e.key === "F") && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === "Escape") {
        if (isTeacherNotesExpanded) {
          setIsTeacherNotesExpanded(false);
          playChime("click");
          return;
        }
        if (isFullscreen) {
          toggleFullscreen();
        }
      } else if ((e.key === "v" || e.key === "V") && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setStoryViewMode((prev) => (prev === "split" ? "visual" : prev === "visual" ? "text" : "split"));
        playChime("click");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlideIndex, totalSlides, isFullscreen, isDrawing]);

  // Smart Marker Size Presets (Phase 1)
  const getPenWidth = (size: "fine" | "medium" | "bold") => {
    switch (size) {
      case "fine": return 2.5;
      case "medium": return 5;
      case "bold": return 10;
    }
  };

  const getHighlighterWidth = (size: "fine" | "medium" | "bold") => {
    switch (size) {
      case "fine": return 14;
      case "medium": return 24;
      case "bold": return 38;
    }
  };

  const getEraserWidth = (size: "fine" | "medium" | "bold") => {
    switch (size) {
      case "fine": return 16;
      case "medium": return 28;
      case "bold": return 44;
    }
  };

  // Synchronize drawing & laser canvas resolution with exact display pixels
  useEffect(() => {
    if (!isPenActive) return;
    const canvas = penCanvasRef.current;
    const laserCanvas = laserCanvasRef.current;
    if (!canvas) return;

    const syncCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const dpr = window.devicePixelRatio || 1;
        const targetW = Math.round(rect.width * dpr);
        const targetH = Math.round(rect.height * dpr);

        const oldW = canvas.width;
        const oldH = canvas.height;
        let offscreen: HTMLCanvasElement | null = null;
        if (oldW > 0 && oldH > 0) {
          offscreen = document.createElement("canvas");
          offscreen.width = oldW;
          offscreen.height = oldH;
          const offCtx = offscreen.getContext("2d");
          if (offCtx) {
            offCtx.drawImage(canvas, 0, 0);
          }
        }

        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(dpr, dpr);
          if (offscreen && oldW > 0 && oldH > 0) {
            ctx.drawImage(offscreen, 0, 0, rect.width, rect.height);
          } else if (slideDrawingsRef.current[currentSlideIndex]) {
            try {
              ctx.putImageData(slideDrawingsRef.current[currentSlideIndex], 0, 0);
            } catch {}
          }
        }

        if (laserCanvas) {
          laserCanvas.width = targetW;
          laserCanvas.height = targetH;
          const laserCtx = laserCanvas.getContext("2d");
          if (laserCtx) {
            laserCtx.scale(dpr, dpr);
          }
        }
      }
    };

    const timer = setTimeout(syncCanvasSize, 50);
    window.addEventListener("resize", syncCanvasSize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", syncCanvasSize);
    };
  }, [isPenActive, isFullscreen, currentSlideIndex]);

  // Slide-wise drawing persistence (remembers each slide's annotations)
  useEffect(() => {
    const canvas = penCanvasRef.current;
    if (!canvas) {
      prevSlideIndexRef.current = currentSlideIndex;
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Save drawing of previous slide
    try {
      slideDrawingsRef.current[prevSlideIndexRef.current] = ctx.getImageData(0, 0, canvas.width, canvas.height);
    } catch {}

    // Clear canvas
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    // If active slide has saved notes, restore them
    if (slideDrawingsRef.current[currentSlideIndex]) {
      try {
        ctx.putImageData(slideDrawingsRef.current[currentSlideIndex], 0, 0);
      } catch {}
    }

    // Reset undo/redo stacks for the new slide
    undoStackRef.current = [];
    redoStackRef.current = [];
    setCanUndo(false);
    setCanRedo(false);

    // Clear laser points and canvas
    if (laserCanvasRef.current) {
      const laserCtx = laserCanvasRef.current.getContext("2d");
      if (laserCtx) {
        laserCtx.save();
        laserCtx.setTransform(1, 0, 0, 1, 0, 0);
        laserCtx.clearRect(0, 0, laserCanvasRef.current.width, laserCanvasRef.current.height);
        laserCtx.restore();
      }
    }
    laserTrailRef.current = [];

    prevSlideIndexRef.current = currentSlideIndex;
  }, [currentSlideIndex]);

  // Magic Laser Auto-Fade Animation Loop using requestAnimationFrame
  const startLaserLoop = () => {
    if (laserRafIdRef.current !== null) return;

    const renderLaser = () => {
      const laserCanvas = laserCanvasRef.current;
      if (!laserCanvas) {
        laserRafIdRef.current = null;
        return;
      }
      const ctx = laserCanvas.getContext("2d");
      if (!ctx) {
        laserRafIdRef.current = null;
        return;
      }

      const now = performance.now();
      // Auto-fade trail: remove points older than 650ms
      laserTrailRef.current = laserTrailRef.current.filter((p) => now - p.time < 650);

      // Clear laser canvas
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, laserCanvas.width, laserCanvas.height);
      ctx.restore();

      if (laserTrailRef.current.length > 0) {
        const points = laserTrailRef.current;

        // Draw glowing neon trail
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const age = now - p2.time;
          const ratio = Math.max(0, 1 - age / 650);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(239, 68, 68, ${ratio * 0.9})`;
          ctx.lineWidth = 3 + ratio * 5;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.shadowBlur = 12 * ratio;
          ctx.shadowColor = "#ef4444";
          ctx.stroke();
        }

        // Draw glowing laser head at the latest point
        const head = points[points.length - 1];
        ctx.shadowBlur = 16;
        ctx.shadowColor = "#ef4444";

        // Outer halo
        ctx.beginPath();
        ctx.arc(head.x, head.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(239, 68, 68, 0.35)";
        ctx.fill();

        // Core laser dot
        ctx.beginPath();
        ctx.arc(head.x, head.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#ef4444";
        ctx.fill();

        // White-hot center
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        ctx.shadowBlur = 0;

        laserRafIdRef.current = requestAnimationFrame(renderLaser);
      } else {
        laserRafIdRef.current = null;
      }
    };

    laserRafIdRef.current = requestAnimationFrame(renderLaser);
  };

  // Clear spotlight or preview overlay when switching away from spotlight
  useEffect(() => {
    if (markerTool !== "spotlight" && laserCanvasRef.current) {
      const ctx = laserCanvasRef.current.getContext("2d");
      if (ctx) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, laserCanvasRef.current.width, laserCanvasRef.current.height);
        ctx.restore();
      }
    }
  }, [markerTool]);

  // Helper to accurately map screen coordinates 1:1 with canvas display pixels
  const getCanvasCoords = (clientX: number, clientY: number) => {
    const canvas = penCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  // Helper to draw geometric shapes (Circle, Arrow, Box)
  const renderShapePath = (
    ctx: CanvasRenderingContext2D,
    type: "circle" | "arrow" | "box",
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    color: string,
    width: number
  ) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (type === "circle") {
      const radiusX = Math.abs(endX - startX) / 2;
      const radiusY = Math.abs(endY - startY) / 2;
      const centerX = Math.min(startX, endX) + radiusX;
      const centerY = Math.min(startY, endY) + radiusY;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, Math.max(1, radiusX), Math.max(1, radiusY), 0, 0, Math.PI * 2);
      ctx.stroke();
    } else if (type === "box") {
      const left = Math.min(startX, endX);
      const top = Math.min(startY, endY);
      const w = Math.abs(endX - startX);
      const h = Math.abs(endY - startY);
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(left, top, w, h, 8);
      } else {
        ctx.rect(left, top, w, h);
      }
      ctx.stroke();
    } else if (type === "arrow") {
      const angle = Math.atan2(endY - startY, endX - startX);
      const headLen = Math.max(14, width * 2.8);

      // Main line
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Directional arrow head
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(
        endX - headLen * Math.cos(angle - Math.PI / 6),
        endY - headLen * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(endX, endY);
      ctx.lineTo(
        endX - headLen * Math.cos(angle + Math.PI / 6),
        endY - headLen * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();
    }
    ctx.restore();
  };

  const drawShapePreview = (startX: number, startY: number, endX: number, endY: number) => {
    const laserCanvas = laserCanvasRef.current;
    if (!laserCanvas) return;
    const ctx = laserCanvas.getContext("2d");
    if (!ctx) return;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, laserCanvas.width, laserCanvas.height);
    ctx.restore();

    renderShapePath(ctx, shapeType, startX, startY, endX, endY, penColor, getPenWidth(brushSize));
  };

  const commitShapeToCanvas = (startX: number, startY: number, endX: number, endY: number) => {
    const penCanvas = penCanvasRef.current;
    if (!penCanvas) return;
    const ctx = penCanvas.getContext("2d");
    if (!ctx) return;

    // Save snapshot to undo stack
    try {
      const snapshot = ctx.getImageData(0, 0, penCanvas.width, penCanvas.height);
      undoStackRef.current.push(snapshot);
      if (undoStackRef.current.length > 20) undoStackRef.current.shift();
      redoStackRef.current = [];
      setCanUndo(true);
      setCanRedo(false);
    } catch {}

    renderShapePath(ctx, shapeType, startX, startY, endX, endY, penColor, getPenWidth(brushSize));
  };

  // Helper to draw classroom spotlight beam
  const drawSpotlight = (x: number, y: number) => {
    const laserCanvas = laserCanvasRef.current;
    if (!laserCanvas) return;
    const ctx = laserCanvas.getContext("2d");
    if (!ctx) return;

    const rect = laserCanvas.getBoundingClientRect();
    const radius = brushSize === "fine" ? 65 : brushSize === "medium" ? 100 : 145;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, laserCanvas.width, laserCanvas.height);
    ctx.restore();

    // Dark slate classroom veil
    ctx.fillStyle = "rgba(15, 23, 42, 0.78)";
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Cut out clear circular hole
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Glowing border around spotlight beam
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.9)";
    ctx.lineWidth = 3.5;
    ctx.shadowBlur = 14;
    ctx.shadowColor = "#38bdf8";
    ctx.stroke();

    ctx.restore();
  };

  // Export Annotated Slide as PNG Handnote
  const exportAnnotatedSlide = () => {
    const penCanvas = penCanvasRef.current;
    const width = 1600;
    const height = 900;

    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return;

    // 1. Soft themed background gradient matching slide
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    if (currentSlide.sceneType === "winter") {
      bgGrad.addColorStop(0, "#e0f2fe");
      bgGrad.addColorStop(0.5, "#f0f9ff");
      bgGrad.addColorStop(1, "#bae6fd");
    } else {
      bgGrad.addColorStop(0, "#f8fafc");
      bgGrad.addColorStop(0.5, "#ffffff");
      bgGrad.addColorStop(1, "#fdf4ff");
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Decorative Card frame
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0, 0, 0, 0.08)";
    ctx.shadowBlur = 24;
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(60, 60, width - 120, height - 120, 24);
    } else {
      ctx.rect(60, 60, width - 120, height - 120);
    }
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Header Meta Pill
    ctx.fillStyle = "#f3e8ff";
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(100, 95, 450, 42, 21);
    } else {
      ctx.rect(100, 95, 450, 42);
    }
    ctx.fill();
    ctx.fillStyle = "#6b21a8";
    ctx.font = "bold 18px 'Hind Siliguri', -apple-system, sans-serif";
    ctx.fillText("Class 3 English • Unit 8: Facts & Fables", 125, 122);

    // Slide Title
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 38px 'Hind Siliguri', -apple-system, sans-serif";
    ctx.fillText(`${currentSlide.title} • ${currentSlide.subtitle}`, 100, 185);

    // Slide Content Text preview
    if (currentSlide.content.englishText && currentSlide.content.englishText.length > 0) {
      ctx.fillStyle = "#334155";
      ctx.font = "bold 24px 'Hind Siliguri', -apple-system, sans-serif";
      currentSlide.content.englishText.slice(0, 4).forEach((line, idx) => {
        ctx.fillText(`“${line}”`, 100, 250 + idx * 46);
      });
    } else if (currentSlide.content.dialogue && currentSlide.content.dialogue.length > 0) {
      currentSlide.content.dialogue.slice(0, 3).forEach((d, idx) => {
        ctx.fillStyle = d.speaker === "Ant" ? "#d97706" : "#0284c7";
        ctx.font = "bold 22px 'Hind Siliguri', -apple-system, sans-serif";
        ctx.fillText(`${d.avatar} ${d.speaker}: ${d.text}`, 100, 260 + idx * 56);
      });
    }

    // 2. Overlay teacher's drawn notes & stamps from penCanvas
    if (penCanvas) {
      ctx.drawImage(penCanvas, 0, 0, width, height);
    }

    // Footer Watermark
    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 16px 'Hind Siliguri', -apple-system, sans-serif";
    ctx.fillText("প্রাথমিক পাঠশালা • স্মার্ট ক্লাসরুম হ্যান্ডনোট ও শিক্ষক সহায়িকা", 100, height - 90);
    ctx.fillText(`স্লাইড: ${currentSlideIndex + 1}/${totalSlides}`, width - 240, height - 90);

    // Trigger download
    const link = document.createElement("a");
    link.download = `Class_3_English_Unit_8_Slide_${currentSlideIndex + 1}_Handnote.png`;
    link.href = offscreen.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    playChime("fanfare");
  };

  // Draggable toolbar pointer handlers
  const handleToolbarDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    isDraggingToolbarRef.current = true;
    const currentX = toolbarPos ? toolbarPos.x : (window.innerWidth / 2) - 260;
    const currentY = toolbarPos ? toolbarPos.y : 16;
    dragStartOffsetRef.current = {
      x: e.clientX - currentX,
      y: e.clientY - currentY,
    };
  };

  const handleToolbarDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingToolbarRef.current) return;
    e.preventDefault();
    const newX = Math.max(10, Math.min(window.innerWidth - 300, e.clientX - dragStartOffsetRef.current.x));
    const newY = Math.max(8, Math.min(window.innerHeight - 80, e.clientY - dragStartOffsetRef.current.y));
    setToolbarPos({ x: newX, y: newY });
  };

  const handleToolbarDragEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingToolbarRef.current) {
      isDraggingToolbarRef.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // Drawing Canvas Functions for Teacher Pen tool using Pointer Events
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPenActive) return;
    setMarkerPopover(null);
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    const { x, y } = getCanvasCoords(e.clientX, e.clientY);

    // Spotlight mode
    if (markerTool === "spotlight") {
      drawSpotlight(x, y);
      setIsDrawing(true);
      return;
    }

    // Stamp mode
    if (markerTool === "stamp") {
      const canvas = penCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Save snapshot to undo stack
      try {
        const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        undoStackRef.current.push(snapshot);
        if (undoStackRef.current.length > 20) undoStackRef.current.shift();
        redoStackRef.current = [];
        setCanUndo(true);
        setCanRedo(false);
      } catch {}

      // Draw stamp emoji with subtle drop shadow
      ctx.save();
      const fontSize = brushSize === "fine" ? 34 : brushSize === "medium" ? 48 : 64;
      ctx.font = `bold ${fontSize}px 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
      ctx.fillText(selectedStamp, x, y);
      ctx.restore();

      playChime("correct");

      // Mini reward confetti at click point
      const normX = e.clientX / window.innerWidth;
      const normY = e.clientY / window.innerHeight;
      confetti({
        particleCount: 20,
        spread: 55,
        origin: { x: normX, y: normY },
        colors: ["#f59e0b", "#10b981", "#6366f1", "#ec4899", "#38bdf8"]
      });
      return;
    }

    // Shape mode
    if (markerTool === "shape") {
      shapeStartCoordsRef.current = { x, y };
      setIsDrawing(true);
      return;
    }

    // Laser mode
    if (markerTool === "laser") {
      laserTrailRef.current = [{ x, y, time: performance.now() }];
      startLaserLoop();
      setIsDrawing(true);
      return;
    }

    // Pen / Highlighter / Eraser
    const canvas = penCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Save snapshot to undo stack before drawing
    try {
      const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
      undoStackRef.current.push(snapshot);
      if (undoStackRef.current.length > 20) undoStackRef.current.shift();
      redoStackRef.current = [];
      setCanUndo(true);
      setCanRedo(false);
    } catch {}

    ctx.beginPath();
    ctx.moveTo(x, y);

    if (markerTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = getEraserWidth(brushSize);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    } else if (markerTool === "highlighter") {
      ctx.globalCompositeOperation = "source-over";
      // 35% translucent color so text remains crisp and readable underneath
      ctx.strokeStyle = penColor.length === 7 ? penColor + "55" : penColor;
      ctx.lineWidth = getHighlighterWidth(brushSize);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = penColor;
      ctx.lineWidth = getPenWidth(brushSize);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }

    setIsDrawing(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPenActive) return;
    const { x, y } = getCanvasCoords(e.clientX, e.clientY);

    // Spotlight follows pointer smoothly
    if (markerTool === "spotlight") {
      drawSpotlight(x, y);
      return;
    }

    if (!isDrawing) return;
    e.preventDefault();

    // Shapes: live preview on top laserCanvasRef
    if (markerTool === "shape" && shapeStartCoordsRef.current) {
      drawShapePreview(shapeStartCoordsRef.current.x, shapeStartCoordsRef.current.y, x, y);
      return;
    }

    // Laser
    if (markerTool === "laser") {
      laserTrailRef.current.push({ x, y, time: performance.now() });
      startLaserLoop();
      return;
    }

    // Pen / Highlighter / Eraser
    const canvas = penCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing && markerTool !== "shape") return;
    setIsDrawing(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    // Commit shape to permanent ink layer
    if (markerTool === "shape" && shapeStartCoordsRef.current) {
      const { x, y } = getCanvasCoords(e.clientX, e.clientY);
      commitShapeToCanvas(shapeStartCoordsRef.current.x, shapeStartCoordsRef.current.y, x, y);
      shapeStartCoordsRef.current = null;

      // Clear preview from laser canvas
      if (laserCanvasRef.current) {
        const lCtx = laserCanvasRef.current.getContext("2d");
        if (lCtx) {
          lCtx.save();
          lCtx.setTransform(1, 0, 0, 1, 0, 0);
          lCtx.clearRect(0, 0, laserCanvasRef.current.width, laserCanvasRef.current.height);
          lCtx.restore();
        }
      }
      playChime("click");
      return;
    }

    if (markerTool !== "laser" && markerTool !== "spotlight" && markerTool !== "stamp") {
      const canvas = penCanvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx) {
        ctx.closePath();
        ctx.globalCompositeOperation = "source-over";
      }
    }
  };

  const handleUndo = () => {
    const canvas = penCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || undoStackRef.current.length === 0) return;

    try {
      const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      redoStackRef.current.push(current);
      const prev = undoStackRef.current.pop()!;
      ctx.putImageData(prev, 0, 0);
      setCanUndo(undoStackRef.current.length > 0);
      setCanRedo(true);
      playChime("click");
    } catch {}
  };

  const handleRedo = () => {
    const canvas = penCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || redoStackRef.current.length === 0) return;

    try {
      const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      undoStackRef.current.push(current);
      const next = redoStackRef.current.pop()!;
      ctx.putImageData(next, 0, 0);
      setCanUndo(true);
      setCanRedo(redoStackRef.current.length > 0);
      playChime("click");
    } catch {}
  };

  const clearPenCanvas = () => {
    const canvas = penCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      // Save snapshot so "Clear" is reversible by Undo!
      const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
      undoStackRef.current.push(snapshot);
      redoStackRef.current = [];
      setCanUndo(true);
      setCanRedo(false);

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      playChime("click");
    } catch {}
  };

  // Sorting game action (Slide 6 & 7)
  const handleSortItem = (itemId: string, targetCategory: string) => {
    const item = currentSlide.content.sortingGame?.items.find((i) => i.id === itemId);
    if (!item) return;

    if (item.category === targetCategory) {
      playChime("correct");
    } else {
      playChime("click");
    }

    setSortedItems((prev) => ({
      ...prev,
      [itemId]: targetCategory
    }));
  };

  // Punctuation detective action (Slide 8)
  const handlePunctuationAnswer = (challengeId: string, mark: string) => {
    setPunctuationAnswers((prev) => ({
      ...prev,
      [challengeId]: mark
    }));
    playChime("correct");
  };

  // Word-by-Word Interlinear Bangla Dictionary
  const WORD_BANGLA_MAP: { [key: string]: string } = {
    an: "একটি",
    ant: "পিঁপড়া",
    and: "এবং",
    a: "একটি",
    grasshopper: "ঘাসফড়িং",
    are: "হয়",
    two: "দুই",
    good: "ভালো",
    friends: "বন্ধু",
    they: "তারা",
    live: "বাস করে",
    in: "মাঠে/মধ্যে",
    grassy: "ঘাসযুক্ত/শ্যামল",
    field: "মাঠ",
    it: "ইহা",
    is: "হয়",
    sunny: "রৌদ্রময়",
    summer: "গ্রীষ্ম",
    morning: "সকাল",
    the: "টি",
    enjoying: "উপভোগ করছে",
    sun: "সূর্য",
    he: "সে",
    dancing: "নাচছে",
    singing: "গান গাইছে",
    happily: "আনন্দে",
    does: "করে",
    not: "না",
    usually: "সাধারণত",
    like: "পছন্দ করে",
    to: "করতে",
    work: "কাজ",
    now: "এখন",
    passing: "যাচ্ছে",
    by: "পাশ দিয়ে",
    she: "সে",
    carrying: "বহন করছে",
    ear: "শীষ",
    of: "এর",
    corn: "শস্য",
    her: "তার",
    house: "ঘর",
    storing: "জমা করছে",
    food: "খাবার",
    for: "জন্য",
    winter: "শীত",
    laughs: "হাসে",
    at: "প্রতি",
    speaks: "কথা বলে",
    hard: "কঠোরভাবে",
    all: "সব",
    time: "সময়",
    come: "এসো",
    join: "যুক্ত হও",
    me: "আমার সাথে",
    "let's": "চলো",
    enjoy: "উপভোগ করি",
    coming: "আসছে",
    collect: "সংগ্রহ করি",
    some: "কিছু",
    corns: "শস্যদানা",
    together: "একসাথে",
    listen: "শোনা",
    so: "তাই",
    goes: "যায়",
    way: "পথ",
    continues: "চালিয়ে যায়",
    after: "পরে",
    begins: "শুরু হয়",
    days: "দিনগুলো",
    become: "হয়",
    very: "খুব",
    cold: "ঠান্ডা",
    leaves: "পাতাগুলো",
    falling: "ঝরছে/পড়ছে",
    start: "শুরু করে",
    fall: "ঝরতে",
    everywhere: "সব জায়গায়",
    finds: "খুঁজে পায়",
    eat: "খেতে",
    starves: "অনাহারে থাকে",
    weak: "দুর্বল",
    says: "বলে",
    sad: "বিষণ্ন",
    other: "অন্য",
    hand: "দিকে",
    has: "আছে",
    plenty: "প্রচুর",
    cozy: "উষ্ণ-আরামদায়ক",
    home: "ঘর",
    where: "কোথায়",
    do: "করে",
    what: "কী",
    happens: "ঘটে",
    carry: "বহন করে",
    today: "আজ",
    tomorrow: "আগামীকাল",
    tra: "ত্রা",
    la: "লা",
    lovely: "সুন্দর",
    day: "দিন",
    hey: "আরে",
    why: "কেন",
    oh: "ওহ",
    brrr: "হাড় কাঁপানো ঠান্ডা",
    wind: "বাতাস",
    hungry: "ক্ষুধার্ত",
    making: "বানানো",
    paper: "কাগজের",
    kite: "ঘুড়ি",
    fun: "মজার",
    easy: "সহজ",
    first: "প্রথমে",
    take: "নাও",
    square: "চারকোনা",
    piece: "টুকরো",
    thin: "পাতলা",
    coloured: "রঙিন",
    next: "এরপর",
    get: "নাও/সংগ্রহ করো",
    bamboo: "বাঁশের",
    sticks: "কাঠিগুলো",
    stick: "কাঠি",
    place: "রাখো/বসাও",
    one: "একটি",
    straight: "সোজাভাবে",
    down: "নিচে",
    middle: "মাঝখান",
    bend: "বাঁকা করো",
    second: "দ্বিতীয়",
    into: "রূপান্তর করে",
    arc: "ধনুকাকৃতি",
    across: "আড়াআড়ি",
    fasten: "দৃঢ়ভাবে আটকাও",
    securely: "নিরাপদে/শক্তভাবে",
    with: "দিয়ে",
    strong: "শক্তিশালী",
    glue: "আঠা",
    tape: "টেপ",
    then: "তারপর",
    tie: "বাঁধো",
    long: "লম্বা",
    light: "হালকা",
    string: "সুতা",
    finally: "সবশেষে",
    attach: "সংযুক্ত করো",
    colourful: "রঙবেরঙের",
    ribbons: "ফিতাগুলো",
    bottom: "তলদেশ/নিচে",
    tail: "লেজ",
    ready: "প্রস্তুত",
    fly: "ওড়াতে",
    windy: "দমকা বাতাসযুক্ত",
    sky: "আকাশ",
    hello: "হ্যালো/ওহে",
    jerin: "জেরিন",
    eight: "আট",
    years: "বছর",
    old: "বয়সী",
    class: "শ্রেণি",
    primary: "প্রাথমিক",
    school: "বিদ্যালয়",
    mohonpur: "মোহনপুর",
    father: "বাবা/পিতা",
    mother: "মা/মাতা",
    teacher: "শিক্ষক",
    banker: "ব্যাংক কর্মকর্তা",
    brother: "ভাই",
    family: "পরিবার",
    happy: "সুখী",
    // Handwashing Lesson additions
    washing: "ধোয়া",
    hands: "হাতগুলো",
    properly: "সঠিকভাবে",
    best: "সর্বোত্তম",
    prevent: "প্রতিরোধ করা",
    germs: "রোগজীবাণু",
    diseases: "রোগসমূহ",
    doctors: "চিকিৎসকেরা",
    doctor: "ডাক্তার/চিকিৎসক",
    recommend: "পরামর্শ দেন",
    six: "ছয়",
    steps: "ধাপগুলো",
    step: "ধাপ",
    wash: "ধোয়া",
    our: "আমাদের",
    wet: "ভেজা/ভেজাও",
    your: "তোমার",
    running: "বহমান",
    water: "পানি",
    apply: "প্রয়োগ করো/লাগাঁও",
    soap: "সাবান",
    rub: "ঘষা/ঘষো",
    palms: "হাতের তালু",
    back: "পিঠ",
    both: "উভয়",
    clean: "পরিষ্কার করো",
    between: "মাঝখানে/ফাঁকে",
    fingers: "আঙুলগুলো",
    third: "তৃতীয়",
    fourth: "চতুর্থ",
    fifth: "পঞ্চম",
    sixth: "ষষ্ঠ",
    around: "চারপাশে",
    thumbs: "বুড়ো আঙুল",
    fingertips: "আঙুলের ডগা ও নখ",
    wrists: "কবজিগুলো",
    rinse: "পানিতে ধুয়ে ফেলা",
    thoroughly: "পুঙ্খানুপুঙ্খভাবে",
    dry: "শুকনো/মোছা",
    towel: "তোয়ালে",
    must: "অবশ্যই",
    always: "সবসময়",
    before: "আগে",
    eating: "খাওয়া",
    toilet: "শৌচাগার",
    coughing: "কাশি দেওয়া",
    sneezing: "হাঁচি দেওয়া",
    touching: "স্পর্শ করা",
    pets: "পোষা প্রাণী",
    healthy: "সুস্থ",
    living: "জীবন্ত",
    organisms: "অণুজীবসমূহ",
    cause: "কারণ হওয়া",
    sickness: "অসুস্থতা",
    cannot: "পারে না",
    see: "দেখতে",
    eyes: "চোখগুলো",
    hide: "লুকিয়ে থাকে",
    dirty: "নোংরা",
    spot: "শনাক্ত করা",
    scrub: "ঘষে পরিষ্কার করা",
    seconds: "সেকেন্ড",
    twenty: "বিশ",
    song: "গান",
    habits: "অভ্যাসসমূহ",
    traps: "ফাঁদসমূহ",
    nusair: "নুসাইর",
    jesmin: "জেসমিন",
    energetic: "কর্মচঞ্চল",
    safe: "নিরাপদ",
    bubble: "বুদবুদ/ফেনা",
    lather: "ফেনা তোলা",
    interlace: "আঙুল জড়ানো",
    // Inclusive Education (Rani in Wheelchair) additions
    wheelchair: "হুইলচেয়ার",
    ramp: "ঢালু পথ/র‍্যাম্প",
    cheerful: "হাসিখুশি/প্রফুল্ল",
    caring: "যত্নশীল/সহমর্মী",
    lonely: "একাকী",
    classmates: "সহপাঠীরা",
    classmate: "সহপাঠী",
    push: "ঠেলা/ধাক্কা দেওয়া",
    arranges: "আয়োজন করেন",
    special: "বিশেষ",
    valued: "মূল্যায়িত",
    respected: "সম্মানিত",
    equally: "সমানভাবে",
    recitation: "আবৃত্তি",
    storytelling: "গল্প বলা",
    legs: "পাগুলো",
    child: "শিশু",
    disability: "প্রতিবন্ধকতা",
    hold: "ধরে রাখা",
    excited: "উত্তেজিত/উৎসাহিত",
    sweet: "মিষ্টি/স্নেহশীল",
    physical: "শারীরিক",
    education: "শিক্ষা",
    mita: "মিতা",
    rani: "রানি",
    porshi: "পড়শী",
    joypur: "জয়পুর",
    // Save Our Water additions
    survive: "বেঁচে থাকা",
    precious: "মূল্যবান",
    limited: "সীমিত",
    utensils: "থালাবাসন",
    waste: "অপচয় করা",
    unnecessarily: "অনর্থক/অপ্রয়োজনে",
    tightly: "শক্তভাবে",
    leaky: "ফুটোযুক্ত",
    protect: "রক্ষা করা",
    pipe: "নল/পাইপ",
    tap: "পানির কল",
    inform: "জানানো",
    adults: "বড়রা/অভিভাবক",
    immediately: "অবিলম্বে/সাথে সাথে",
    fix: "মেরামত করা",
    saving: "বাঁচানো",
    drop: "ফোঁটা",
    future: "ভবিষ্যৎ",
    creature: "জীব/প্রাণী",
    plant: "উদ্ভিদ/গাছপালা",
    cooking: "রান্নাবান্না",
    meals: "খাবারগুলো",
    bathing: "গোসল করা",
    dishes: "থালাবাসন",
    growing: "ফলানো/উৎপাদন করা",
    crops: "ফসলগুলো",
    teeth: "দাঁতগুলো",
    knob: "কলের হাতল",
    pure: "বিশুদ্ধ",
    kaniz: "কানিজ",
    shihab: "শিহাব",
    drip: "ফোঁটা ফোঁটা পড়া",
    dripping: "ফোঁটা পড়া",
    broken: "ভাঙা",
    // Hill Festival (Biju in Bandarban) additions
    traditional: "ঐতিহ্যবাহী",
    celebrate: "উদযাপন করা",
    dawn: "ভোরবেলা/প্রত্যুষ",
    floating: "ভাসমান/ভাসানো",
    float: "ভাসিয়ে দেওয়া",
    pachan: "পাঁচন (পাহাড়ি ব্যঞ্জন)",
    herbs: "ভেষজ/শাকসবজি",
    herb: "ভেষজ",
    blessings: "আশীর্বাদসমূহ",
    blessing: "আশীর্বাদ",
    harmony: "সম্প্রীতি/মেলবন্ধন",
    unity: "একতা/ঐক্য",
    hilly: "পাহাড়ি",
    district: "জেলা",
    bandarban: "বান্দরবান",
    savana: "সাভানা",
    anika: "আনিকা",
    phool: "ফুল",
    biju: "বিজু",
    mul: "মূল",
    gajjya: "গোজ্যা",
    pajjya: "পোজ্যা",
    peaceful: "শান্তিময়",
    elders: "বয়োজ্যেষ্ঠরা/গুরুজন",
    prayers: "প্রার্থনাগুলো",
    peace: "শান্তি",
    wild: "বুনো/বন্য",
    forest: "বন/জঙ্গল",
    flowers: "ফুলগুলো",
    thirty: "ত্রিশ",
    prepared: "প্রস্তুতকৃত",
    fills: "ভরিয়ে তোলে",
    heart: "হৃদয়/মন",
    orchids: "অর্কিড ফুলগুলো",
    sangu: "সাংগু",
    // Sabiha's Family additions
    sabiha: "সাবিহা",
    alvi: "আলভী",
    fatema: "ফাতেমা",
    begum: "বেগম",
    aminul: "আমিনুল",
    islam: "ইসলাম",
    homemaker: "গৃহিণী",
    younger: "ছোট/কনিষ্ঠ",
    dearly: "গভীরভাবে/পরম স্নেহে",
    members: "সদস্যগণ",
    member: "সদস্য",
    toddler: "ছোট শিশু",
    sister: "বোন",
    // Oyshi's City Life additions
    oyshi: "ঐশী",
    apartment: "ফ্ল্যাট/বাসস্থান",
    rooftop: "ছাদ",
    coriander: "ধনেপাতা",
    marigold: "গাঁদা ফুল",
    marigolds: "গাঁদা ফুলগুলো",
    pots: "মাটির পাত্র/টবগুলো",
    eagerly: "আগ্রহভরে/ব্যগ্রভাবে",
    borrow: "ধার নেওয়া",
    borrows: "ধার নেয়",
    fairy: "পরী/রূপকথা",
    tales: "গল্পগুলো",
    illustrated: "চিত্রসমৃদ্ধ/ছবিতে সাজানো",
    lively: "প্রাণবন্ত/আনন্দমুখর",
    // Porshi's School additions
    kushtia: "কুষ্টিয়া",
    assembly: "সমাবেশ",
    anthem: "জাতীয় সঙ্গীত",
    exercises: "শারীরিক কসরত/ব্যায়াম",
    divides: "ভাগ করে দেন",
    puzzles: "ধাঁধাসমূহ",
    poems: "কবিতাগুলো",
    // Nusair's Good Habits additions
    neat: "পরিপাটি",
    strictly: "কঠোরভাবে/নিষ্ঠার সাথে",
    refreshing: "সতেজতাদায়ক",
    fingernails: "হাতের নখগুলো",
    toenails: "পায়ের নখগুলো",
    ironed: "ইস্ত্রি করা",
    rarely: "কদাচিৎ/খুব কমই",
    // Water Pollution (Shihab & Kaniz at Pond) additions
    murky: "ঘোলাটে",
    garbage: "আবর্জনা/ময়লা",
    cattle: "গবাদিপশু",
    greasy: "তেলতেলে",
    cholera: "কলেরা",
    typhoid: "টাইফয়েড",
    diarrhea: "ডায়রিয়া",
    headteacher: "প্রধান শিক্ষক",
    rally: "শোভাযাত্রা/র‍্যালি",
    packets: "প্যাকেটগুলো",
    // Osman's Village Life additions
    osman: "ওসমান",
    surrounded: "ঘেরা/বেষ্টিত",
    paddy: "ধানক্ষেত",
    lentils: "ডাল",
    muddy: "কাদাময়/কাঁচা",
    hadudu: "হা-ডু-ডু",
    lamp: "কুপি বাতি/প্রদীপ",
    simplicity: "সরলতা",
    // Breakfast with Fazle & Anita additions
    fazle: "ফজলে",
    anita: "অনীতা",
    breakfast: "সকালের নাশতা",
    boiled: "সেদ্ধ",
    bananas: "কলাগুলো",
    mangoes: "আমগুলো",
    ruti: "রুটি",
    // My Friend - Sunil & Rahat additions
    sunil: "সুনীল",
    rahat: "রাহাত",
    banyan: "বটগাছ",
    tiffin: "টিফিন",
    adventure: "দুঃসাহসিক অভিযান",
    homemade: "ঘরের তৈরি",
    // The Calendar & 12 Months additions
    calendar: "ক্যালেন্ডার / দিনপঞ্জি",
    normal: "স্বাভাবিক / সাধারণ",
    twelfth: "দ্বাদশ / ১২তম",
    january: "জানুয়ারি",
    february: "ফেব্রুয়ারি",
    december: "ডিসেম্বর",
    // School Library Card additions
    library: "গ্রন্থাগার / পাঠাগার",
    silence: "নীরবতা",
    gently: "আলতোভাবে / সাবধানে",
    photograph: "ছবি / আলোকচিত্র",
    // Mita's Daily Routine additions
    routine: "দিনলিপি / রুটিন",
    grandmother: "নানি / দাদি",
    returns: "ফিরে আসে",
    // Sagar and His Family additions
    sagar: "সাগর",
    keya: "কেয়া",
    lawyer: "আইনজীবী",
    cucumber: "শসা",
    delicious: "সুস্বাদু",
    neighborhood: "প্রতিবেশ / পাড়া",
    // Sagar's Weekly Routine additions
    weekdays: "কাজের দিনসমূহ",
    favourite: "সবচেয়ে পছন্দের / প্রিয়",
    uniform: "পোশাক / ইউনিফর্ম",
    cousins: "কাজিনরা / ভাই-বোন",
    // At the Stationery Shop additions
    stationery: "লেখাপড়ার সরঞ্জাম",
    shopkeeper: "দোকানদার",
    eraser: "ইরেজার / রাবার",
    notebook: "নোটবই / খাতা",
    politely: "ভদ্রভাবে / বিনীতভাবে"
  };

  // 1. Voice Practice (Speak & Score with Mic)
  const startVoicePractice = (targetSentence: string, sIdx: number) => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("আপনার ডিভাইসের এই ব্রাউজারে সরাসরি মাইক্রোফোন স্পিচ সাপোর্ট পাওয়া যায়নি। গুগল ক্রোম বা এজ ব্রাউজার ব্যবহার করুন।");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = accentMode === "bd" ? "en-IN" : "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setSpeechFeedback({ sentenceIdx: sIdx, score: 0, text: "শুনছি... এখন বলো! 🎙️", status: "listening" });
      setActiveMicSentence(sIdx);

      recognition.onresult = (e: any) => {
        setActiveMicSentence(null);
        const spokenText = e.results[0][0].transcript.toLowerCase();
        const targetWords = targetSentence.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "").split(" ");
        const spokenWords = spokenText.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "").split(" ");

        let matchCount = 0;
        targetWords.forEach((tw: string) => {
          if (spokenWords.includes(tw)) matchCount++;
        });
        const score = Math.min(100, Math.round((matchCount / Math.max(1, targetWords.length)) * 100));

        if (score >= 50) {
          setSpeechFeedback({
            sentenceIdx: sIdx,
            score,
            text: `চমৎকার হয়েছে! "${spokenText}" (${score}% সঠিক)`,
            status: "success"
          });
          playChime("fanfare");
          confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
        } else {
          setSpeechFeedback({
            sentenceIdx: sIdx,
            score,
            text: `আবার চেষ্টা করো! শুনা গেছে: "${spokenText}" (${score}%)`,
            status: "retry"
          });
          playChime("wrong");
        }
      };

      recognition.onerror = () => {
        setActiveMicSentence(null);
        setSpeechFeedback({
          sentenceIdx: sIdx,
          score: 0,
          text: "কথা বোঝা যায়নি, স্পষ্ট করে আবার বলুন।",
          status: "retry"
        });
        playChime("wrong");
      };

      recognition.onend = () => {
        setActiveMicSentence(null);
      };

      recognition.start();
    } catch {
      setActiveMicSentence(null);
      setSpeechFeedback({
        sentenceIdx: sIdx,
        score: 0,
        text: "মাইক্রোফোন চালু করা সম্ভব হয়নি। পারমিশন চেক করুন।",
        status: "retry"
      });
    }
  };

  // 2. Sentence Builder Puzzle
  const initSentencePuzzle = (sentence: string) => {
    setPuzzleTargetSentence(sentence);
    const cleanWords = sentence.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "").split(" ").filter(Boolean);
    const items = cleanWords.map((w, idx) => ({ id: `puz-${idx}-${w}`, word: w }));
    // Shuffle
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setScrambledWords(shuffled);
    setUserBuiltWords([]);
    setPuzzleSolved(false);
    setShowSentencePuzzle(true);
    playChime("click");
  };

  const handlePickPuzzleWord = (item: { id: string; word: string }) => {
    const nextBuilt = [...userBuiltWords, item];
    setUserBuiltWords(nextBuilt);
    setScrambledWords((prev) => prev.filter((w) => w.id !== item.id));

    // Check if finished
    const targetClean = puzzleTargetSentence.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "").split(" ").filter(Boolean).join(" ").toLowerCase();
    const currentBuilt = nextBuilt.map((w) => w.word).join(" ").toLowerCase();

    if (currentBuilt === targetClean) {
      setPuzzleSolved(true);
      playChime("fanfare");
      confetti({ particleCount: 45, spread: 75, origin: { y: 0.6 } });
      setTimeout(() => {
        handleSpeak(puzzleTargetSentence);
      }, 700);
    } else {
      playChime("click");
      handleSpeak(item.word);
    }
  };

  const handleRemovePuzzleWord = (item: { id: string; word: string }) => {
    setUserBuiltWords((prev) => prev.filter((w) => w.id !== item.id));
    setScrambledWords((prev) => [...prev, item]);
    setPuzzleSolved(false);
    playChime("click");
  };

  // 3. Ambient Story Soundscape
  const toggleAmbience = () => {
    if (isAmbiencePlaying) {
      if (ambienceOscRef.current) {
        try { ambienceOscRef.current.stop(); } catch {}
        ambienceOscRef.current = null;
      }
      setIsAmbiencePlaying(false);
    } else {
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === "suspended") ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        if (currentSlide.sceneType === "winter") {
          // Cold wind whistle
          osc.type = "sine";
          osc.frequency.setValueAtTime(140, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 3);
          gain.gain.setValueAtTime(0.025, ctx.currentTime);
        } else {
          // Warm summer breeze
          osc.type = "triangle";
          osc.frequency.setValueAtTime(220, ctx.currentTime);
          gain.gain.setValueAtTime(0.02, ctx.currentTime);
        }

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        ambienceOscRef.current = osc;
        setIsAmbiencePlaying(true);
      } catch {}
    }
  };

  // Helper to check if a word is key word for Cloze
  const isKeyword = (word: string) => {
    const clean = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "");
    return clean.length >= 4 && !["that", "this", "they", "from", "with"].includes(clean);
  };

  // Download Standalone Offline HTML Presentation
  const handleDownloadOfflineHtml = () => {
    const deckData = JSON.stringify(activeDeck, null, 2);
    const htmlTemplate = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${activeDeck.grade} - ${activeDeck.lesson} (আন্তর্জাতিক অফলাইন স্লাইড)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print {
      .no-print { display: none !important; }
      body { background: white !important; }
      .slide-page { page-break-after: always; height: auto !important; }
    }
    @keyframes pulseSlow {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.08); opacity: 0.9; }
    }
    .animate-pulse-slow {
      animation: pulseSlow 4s infinite ease-in-out;
    }
  </style>
</head>
<body class="bg-gradient-to-b from-purple-50 via-white to-sky-50 text-slate-900 min-h-screen flex flex-col font-sans antialiased">
  <div id="deck-container" class="flex-1 flex flex-col h-screen overflow-hidden">
    <!-- Tier 1: Clean Top Command Header -->
    <header class="px-4 sm:px-6 py-3 bg-white/95 border-b border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between no-print shrink-0 shadow-xs gap-2">
      <div class="flex items-start sm:items-center gap-3 min-w-0">
        <span class="text-2xl p-1.5 bg-purple-100 rounded-xl shrink-0">📽️</span>
        <div class="min-w-0 space-y-0.5">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-xs px-2.5 py-0.5 rounded-full font-bold bg-sky-100 text-sky-800 border border-sky-200">${activeDeck.unit}</span>
            <span class="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">${activeDeck.grade}</span>
          </div>
          <h1 class="text-xs sm:text-base font-black text-slate-900 leading-snug break-words">${activeDeck.lesson}</h1>
        </div>
      </div>
      <div class="flex items-center gap-2 self-end sm:self-auto shrink-0">
        <button id="notes-btn" onclick="toggleNotes()" class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 shadow-xs whitespace-nowrap">
          👩‍🏫 শিক্ষক সহায়িকা
        </button>
        <button onclick="window.print()" class="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200" title="প্রিন্ট করো">
          🖨️
        </button>
      </div>
    </header>

    <!-- Tier 2: Dedicated Audio & Phonics Teaching Ribbon -->
    <nav aria-label="উচ্চারণ ও ফোনেটিক্স কন্ট্রোল বার" class="px-6 py-2.5 bg-white border-b border-purple-100 flex items-center justify-between gap-3 flex-wrap no-print shadow-2xs">
      <div class="flex items-center gap-2 flex-wrap">
        <button id="audio-play-btn" onclick="speakSlide()" class="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs flex items-center gap-1.5 shadow-xs whitespace-nowrap" title="শব্দ ধরে ধরে পাঠ শোনো">
          🔊 <span id="audio-btn-text">পাঠ শোনো</span>
        </button>
        <button id="accent-btn" onclick="toggleAccent()" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs whitespace-nowrap">
          🇧🇩 দেশীয় উচ্চারণ
        </button>
        <!-- Offline Speed Controls: 0.25x, 0.5x, 0.7x, 0.85x -->
        <div class="flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200">
          <span class="text-[10px] font-bold text-slate-500 px-1.5">গতি:</span>
          <button id="spd-btn-025" onclick="setSpeed(0.25)" class="px-2 py-0.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900" title="খুব ধীর গতি (সিলেবল ড্রিল)">🐢 ০.২৫x</button>
          <button id="spd-btn-05" onclick="setSpeed(0.5)" class="px-2 py-0.5 rounded-lg text-xs font-bold bg-purple-600 text-white shadow-2xs" title="ধীর ও স্পষ্ট গতি">০.৫x</button>
          <button id="spd-btn-07" onclick="setSpeed(0.7)" class="px-2 py-0.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900" title="মাঝারি গতি">০.৭x</button>
          <button id="spd-btn-085" onclick="setSpeed(0.85)" class="px-2 py-0.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900" title="স্বাভাবিক গতি">স্বাভাবিক</button>
        </div>
      </div>
      <div class="text-xs font-bold text-slate-500">
        🔊 যেকোনো শব্দে ক্লিক করে উচ্চারণ শুনুন
      </div>
    </nav>

    <!-- Slide Content -->
    <main class="flex-1 flex flex-col justify-between p-6 sm:p-10 bg-slate-50/50 overflow-y-auto">
      <div class="max-w-4xl mx-auto w-full space-y-6">
        <div class="flex items-center justify-between">
          <span id="slide-phase" class="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-200"></span>
          <span id="slide-num" class="text-xs font-bold text-slate-500"></span>
        </div>

        <div class="flex items-center justify-between gap-4">
          <div>
            <h2 id="slide-title" class="text-3xl sm:text-4xl font-black text-slate-900"></h2>
            <p id="slide-sub" class="text-slate-600 font-semibold mt-1"></p>
          </div>
          <div id="slide-emoji" class="text-6xl p-3 bg-white rounded-3xl border border-slate-200 shadow-xs shrink-0"></div>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div id="slide-sentences" class="space-y-2 text-xl font-bold text-slate-800"></div>
          <div id="slide-dialogue" class="space-y-2"></div>
          <div id="slide-vocab" class="pt-2"></div>
          <div id="slide-bangla-box" class="pt-3 border-t border-slate-100 text-sm text-slate-600 font-medium">
            <strong>বাংলা ভাবার্থ:</strong> <span id="slide-bangla"></span>
          </div>
        </div>

        <div id="teacher-notes-box" class="p-4 rounded-2xl bg-purple-50/90 border border-purple-200 text-purple-950 text-xs sm:text-sm">
          <strong class="block text-purple-800 font-bold mb-1">👩‍🏫 এনসিটিবি শিক্ষক সহায়িকা নির্দেশনা:</strong>
          <p id="slide-notes"></p>
        </div>
      </div>

      <!-- Controls -->
      <footer class="max-w-4xl mx-auto w-full pt-6 mt-4 border-t border-slate-200 flex items-center justify-between gap-4 no-print shrink-0">
        <button onclick="prevSlide()" class="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-bold text-sm hover:bg-slate-100 shadow-xs">
          ◀ পূর্ববর্তী স্লাইড
        </button>
        <div id="dots-container" class="flex items-center gap-1.5"></div>
        <button onclick="nextSlide()" class="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 shadow-md shadow-purple-600/20">
          পরবর্তী স্লাইড ▶
        </button>
      </footer>
    </main>
  </div>

  <script>
    const deck = ${deckData};
    let currentIdx = 0;
    let showNotes = true;
    let accentMode = 'bd';
    let speechSpeed = 0.5;
    let isSpeaking = false;

    function getWordIndexAtChar(text, charIndex) {
      let charCount = 0;
      const words = text.split(' ');
      for (let i = 0; i < words.length; i++) {
        const len = words[i].length;
        if (charIndex >= charCount && charIndex <= charCount + len) {
          return i;
        }
        charCount += len + 1;
      }
      return Math.max(0, words.length - 1);
    }

    function renderSlide() {
      const slide = deck.slides[currentIdx];
      document.getElementById('slide-phase').innerText = slide.phase + ' (' + slide.duration + ')';
      document.getElementById('slide-num').innerText = 'স্লাইড ' + (currentIdx + 1) + ' / ' + deck.slides.length;
      document.getElementById('slide-title').innerText = slide.title;
      document.getElementById('slide-sub').innerText = slide.subtitle;
      document.getElementById('slide-emoji').innerText = slide.imageEmoji;
      const banglaBox = document.getElementById('slide-bangla-box');
      if (slide.content.banglaExplanation) {
        document.getElementById('slide-bangla').innerText = slide.content.banglaExplanation;
        if (banglaBox) banglaBox.style.display = 'block';
      } else {
        if (banglaBox) banglaBox.style.display = 'none';
      }
      document.getElementById('slide-notes').innerText = slide.teacherNotes;

      // Sentences with interactive clickable words & karaoke span IDs
      const sentContainer = document.getElementById('slide-sentences');
      sentContainer.innerHTML = slide.content.englishText.map((s, sIdx) => {
        const words = s.split(' ').map((w, wIdx) => 
          \`<span id="sent-\${sIdx}-word-\${wIdx}" onclick="speakWord('\${w.replace(/[.,/#!$%^&*;:{}=\-_\\\`~()?"']/g, '')}')" class="offline-word cursor-pointer px-1 py-0.5 rounded-lg transition-all duration-150 hover:bg-slate-100 hover:text-emerald-700" title="উচ্চারণ শোনো">\${w}</span>\`
        ).join(' ');

        return \`
          <div class="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors">
            <button onclick="speakSentence(\${sIdx})" class="mt-0.5 p-1 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 shrink-0" title="এই বাক্যটি শোনো">
              🔊
            </button>
            <p class="flex-1 flex flex-wrap gap-x-1.5 gap-y-1 text-slate-800">\${words}</p>
          </div>
        \`;
      }).join('');

      // Dialogue with team styling
      const diaContainer = document.getElementById('slide-dialogue');
      if (slide.content.dialogue && slide.content.dialogue.length) {
        diaContainer.innerHTML = slide.content.dialogue.map((d, dIdx) => {
          const diaWords = d.text.split(' ').map((w, wIdx) => 
            \`<span id="dia-\${dIdx}-word-\${wIdx}" onclick="speakWord('\${w.replace(/[.,/#!$%^&*;:{}=\-_\\\`~()?"']/g, '')}')" class="offline-word cursor-pointer px-1 py-0.5 rounded transition-all duration-150" title="উচ্চারণ শোনো">\${w}</span>\`
          ).join(' ');

          return \`
            <div class="p-3.5 rounded-2xl border \${d.speaker === 'Ant' ? 'bg-amber-50 border-amber-200 text-amber-950' : 'bg-sky-50 border-sky-200 text-sky-950'} flex items-start gap-3">
              <span class="text-3xl p-1 bg-white rounded-xl shadow-2xs">\${d.avatar}</span>
              <div>
                <strong class="text-xs uppercase tracking-wider \${d.speaker === 'Ant' ? 'text-amber-800' : 'text-sky-800'}">\${d.speaker} (\${d.team}):</strong>
                <p class="text-base font-bold italic mt-1 flex flex-wrap gap-x-1 gap-y-1">\${diaWords}</p>
              </div>
            </div>
          \`;
        }).join('');
      } else {
        diaContainer.innerHTML = '';
      }

      // Vocab
      const vocabContainer = document.getElementById('slide-vocab');
      if (slide.content.vocabulary && slide.content.vocabulary.length) {
        vocabContainer.innerHTML = '<p class="text-xs uppercase tracking-wider text-slate-500 font-bold mb-2">শব্দভাণ্ডার ও সিলেবল ভাঙন (ক্লিক করে শুনুন):</p><div class="grid grid-cols-2 sm:grid-cols-3 gap-2">' +
          slide.content.vocabulary.map(v => \`
            <div onclick="speakWord('\${v.word}')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 cursor-pointer transition-all">
              <div class="flex justify-between items-center"><strong class="text-emerald-800 text-sm">\${v.icon} \${v.word}</strong><span class="text-[10px] text-slate-400 font-mono">\${v.phonetic}</span></div>
              <span class="text-[11px] text-purple-700 font-semibold block mt-0.5">\${v.syllables.join(' • ')}</span>
              <span class="text-xs text-slate-600 mt-0.5 block">\${v.meaning}</span>
            </div>
          \`).join('') + '</div>';
      } else {
        vocabContainer.innerHTML = '';
      }

      // Dots
      const dotsContainer = document.getElementById('dots-container');
      dotsContainer.innerHTML = deck.slides.map((_, i) => \`
        <button onclick="gotoSlide(\${i})" class="h-2.5 rounded-full transition-all \${i === currentIdx ? 'w-6 bg-purple-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}"></button>
      \`).join('');
    }

    function clearWordHighlights() {
      document.querySelectorAll('.offline-word').forEach(el => {
        el.className = 'offline-word cursor-pointer px-1 py-0.5 rounded-lg transition-all duration-150 hover:bg-slate-100 hover:text-emerald-700';
      });
    }

    function highlightWord(elementId) {
      clearWordHighlights();
      const el = document.getElementById(elementId);
      if (el) {
        el.className = 'offline-word cursor-pointer px-1.5 py-0.5 rounded-lg bg-amber-300 text-amber-950 font-black scale-110 shadow-sm ring-2 ring-amber-400 border border-amber-400';
      }
    }

    function setSpeed(spd) {
      speechSpeed = spd;
      [0.25, 0.5, 0.7, 0.85].forEach(val => {
        const id = 'spd-btn-' + (val === 0.25 ? '025' : val === 0.5 ? '05' : val === 0.7 ? '07' : '085');
        const btn = document.getElementById(id);
        if (btn) {
          if (val === spd) {
            btn.className = 'px-2 py-1 rounded-lg text-xs font-bold bg-purple-600 text-white shadow-2xs';
          } else {
            btn.className = 'px-2 py-1 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900';
          }
        }
      });
    }

    function toggleAccent() {
      accentMode = accentMode === 'bd' ? 'intl' : 'bd';
      const btn = document.getElementById('accent-btn');
      btn.innerText = accentMode === 'bd' ? '🇧🇩 দেশীয় উচ্চারণ' : '🌐 আন্তর্জাতিক এক্সেন্ট';
      btn.className = accentMode === 'bd' 
        ? 'px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs' 
        : 'px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-50 text-sky-800 border border-sky-300 shadow-2xs';
    }

    function toggleNotes() {
      showNotes = !showNotes;
      document.getElementById('teacher-notes-box').style.display = showNotes ? 'block' : 'none';
      document.getElementById('notes-btn').classList.toggle('opacity-50', !showNotes);
    }

    function getSafeRate(rate) {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      return isMobile ? Math.max(0.5, rate) : rate;
    }

    function speakWord(word) {
      if (!('speechSynthesis' in window)) return;
      try { window.speechSynthesis.cancel(); } catch(e) {}
      clearWordHighlights();

      const utterance = new SpeechSynthesisUtterance(word);
      const voices = window.speechSynthesis.getVoices() || [];
      const safeSpeed = getSafeRate(speechSpeed);

      if (accentMode === 'bd') {
        const bdVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India')) || voices.find(v => v.lang.startsWith('en')) || voices[0];
        if (bdVoice) { utterance.voice = bdVoice; utterance.lang = bdVoice.lang; }
        else { utterance.lang = 'en-IN'; }
        utterance.rate = safeSpeed;
        utterance.pitch = 1.05;
      } else {
        const intlVoice = voices.find(v => v.lang.includes('en-US') || v.lang.includes('en-GB')) || voices.find(v => v.lang.startsWith('en')) || voices[0];
        if (intlVoice) { utterance.voice = intlVoice; utterance.lang = intlVoice.lang; }
        else { utterance.lang = 'en-US'; }
        utterance.rate = safeSpeed;
        utterance.pitch = 1.0;
      }

      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.speak(utterance);
    }

    function speakSentence(sIdx, onDone) {
      if (!('speechSynthesis' in window)) return;
      try { window.speechSynthesis.cancel(); } catch(e) {}

      const sentenceText = deck.slides[currentIdx].content.englishText[sIdx];
      const utterance = new SpeechSynthesisUtterance(sentenceText);
      const voices = window.speechSynthesis.getVoices() || [];
      const safeSpeed = getSafeRate(speechSpeed);

      if (accentMode === 'bd') {
        const bdVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India')) || voices.find(v => v.lang.startsWith('en')) || voices[0];
        if (bdVoice) { utterance.voice = bdVoice; utterance.lang = bdVoice.lang; }
        else { utterance.lang = 'en-IN'; }
        utterance.rate = safeSpeed;
        utterance.pitch = 1.05;
      } else {
        const intlVoice = voices.find(v => v.lang.includes('en-US') || v.lang.includes('en-GB')) || voices.find(v => v.lang.startsWith('en')) || voices[0];
        if (intlVoice) { utterance.voice = intlVoice; utterance.lang = intlVoice.lang; }
        else { utterance.lang = 'en-US'; }
        utterance.rate = safeSpeed;
        utterance.pitch = 1.0;
      }

      utterance.onboundary = (e) => {
        if (e.name === 'word') {
          const wIdx = getWordIndexAtChar(sentenceText, e.charIndex);
          highlightWord('sent-' + sIdx + '-word-' + wIdx);
        }
      };

      utterance.onend = () => {
        clearWordHighlights();
        if (onDone) onDone();
      };
      utterance.onerror = () => {
        clearWordHighlights();
      };

      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.speak(utterance);
    }

    function speakSlide() {
      if (!('speechSynthesis' in window)) return;
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        clearWordHighlights();
        isSpeaking = false;
        document.getElementById('audio-btn-text').innerText = 'পাঠ শোনো';
        return;
      }

      const sentences = deck.slides[currentIdx].content.englishText || [];
      if (sentences.length === 0) return;

      isSpeaking = true;
      document.getElementById('audio-btn-text').innerText = 'থামাও';

      let sIdx = 0;
      function next() {
        if (sIdx < sentences.length && isSpeaking) {
          const cur = sIdx++;
          speakSentence(cur, next);
        } else {
          isSpeaking = false;
          clearWordHighlights();
          document.getElementById('audio-btn-text').innerText = 'পাঠ শোনো';
        }
      }
      next();
    }

    function prevSlide() {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      clearWordHighlights();
      isSpeaking = false;
      if (currentIdx > 0) { currentIdx--; renderSlide(); }
    }

    function nextSlide() {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      clearWordHighlights();
      isSpeaking = false;
      if (currentIdx < deck.slides.length - 1) { currentIdx++; renderSlide(); }
    }

    function gotoSlide(i) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      clearWordHighlights();
      isSpeaking = false;
      currentIdx = i; renderSlide();
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
      else if (e.key === 'ArrowLeft') prevSlide();
    });

    renderSlide();
  </script>
</body>
</html>`;

    const blob = new Blob([htmlTemplate], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeDeck.grade}_${activeDeck.lesson}_Presentation.html`.replace(/[^a-zA-Z0-9_\-\.]/g, "_");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const isStorySlide = Boolean(currentSlide.hasVisualStage || currentSlide.id === 3 || currentSlide.id === 4 || currentSlide.id === 5);

  // Reusable Story Reading & Roleplay Dialogue Arena Renderer (Option ক: Sub-tabbed Architecture)
  const renderStoryContent = () => {
    const hasDialogue = Boolean(currentSlide.content.dialogue && currentSlide.content.dialogue.length > 0);

    return (
      <div className="space-y-3">
        {/* Sub-tab Switcher Header when slide has dialogue */}
        {hasDialogue ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-purple-100 gap-2 shrink-0">
            <div className="flex items-center gap-1 p-0.5 sm:p-1 bg-purple-100/70 rounded-2xl border border-purple-200 shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  setActiveStorySubTab("reading");
                  playChime("click");
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  activeStorySubTab === "reading"
                    ? "bg-purple-600 text-white shadow-xs scale-102"
                    : "text-purple-700 hover:text-purple-950 hover:bg-purple-200/50"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>📖 গল্প পাঠ</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveStorySubTab("roleplay");
                  playChime("click");
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  activeStorySubTab === "roleplay"
                    ? "bg-purple-600 text-white shadow-xs scale-102"
                    : "text-purple-700 hover:text-purple-950 hover:bg-purple-200/50"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>🎭 রোলপ্লে সংলাপ</span>
              </button>
            </div>

            {activeStorySubTab === "reading" ? (
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200 shadow-2xs self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => {
                    setStoryLayoutMode("paragraph");
                    playChime("click");
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    storyLayoutMode === "paragraph"
                      ? "bg-white text-purple-900 shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="বইয়ের মতো অনুচ্ছেদ"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>অনুচ্ছেদ</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStoryLayoutMode("strips");
                    playChime("click");
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    storyLayoutMode === "strips"
                      ? "bg-white text-purple-900 shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="বাক্য কার্ড"
                >
                  <LayoutList className="w-3 h-3" />
                  <span>বাক্য কার্ড</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 p-0.5 bg-purple-100/70 rounded-xl border border-purple-200 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => { setRoleplayMode("none"); playChime("click"); }}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all ${
                    roleplayMode === "none" ? "bg-white text-purple-900 shadow-2xs" : "text-purple-700 hover:text-purple-950"
                  }`}
                >
                  সকল
                </button>
                <button
                  type="button"
                  onClick={() => { setRoleplayMode("ant"); playChime("click"); }}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all ${
                    roleplayMode === "ant" ? "bg-amber-500 text-white shadow-2xs" : "text-purple-700 hover:text-purple-950"
                  }`}
                >
                  🐜 দল পিঁপড়া
                </button>
                <button
                  type="button"
                  onClick={() => { setRoleplayMode("grasshopper"); playChime("click"); }}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all ${
                    roleplayMode === "grasshopper" ? "bg-sky-500 text-white shadow-2xs" : "text-purple-700 hover:text-purple-950"
                  }`}
                >
                  🦗 দল ঘাসফড়িং
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Standard Reading Helper Bar with View Switcher */
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 pb-2 border-b border-purple-100/70 gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 font-bold text-purple-900">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <span>গল্প পাঠ (Story Reading)</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-400 hidden md:inline-flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-purple-500" />
                <span>বাক্য বা শব্দে ক্লিক করে উচ্চারণ শুনুন</span>
              </span>
            </div>

            {/* Layout Mode Switcher Toggle (Paragraph vs Sentence Strips) */}
            <div className="flex items-center gap-1 bg-purple-100/70 p-1 rounded-xl border border-purple-200 self-end sm:self-auto shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  setStoryLayoutMode("paragraph");
                  playChime("click");
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  storyLayoutMode === "paragraph"
                    ? "bg-purple-600 text-white shadow-xs scale-102"
                    : "text-purple-700 hover:text-purple-950 hover:bg-purple-200/50"
                }`}
                title="পাঠ্যবইয়ের মতো স্বাভাবিক অনুচ্ছেদ (Paragraph) আকারে দেখুন"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>বইয়ের অনুচ্ছেদ</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setStoryLayoutMode("strips");
                  playChime("click");
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  storyLayoutMode === "strips"
                    ? "bg-purple-600 text-white shadow-xs scale-102"
                    : "text-purple-700 hover:text-purple-950 hover:bg-purple-200/50"
                }`}
                title="প্রতিটি বাক্য আলাদা ফোকাস কার্ড আকারে দেখুন"
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>বাক্য কার্ড</span>
              </button>
            </div>
          </div>
        )}

        {/* Sub-Tab 1: Reading Text Area */}
        {(!hasDialogue || activeStorySubTab === "reading") && (
          <div className="space-y-3">

      {/* Mode 1: Natural Flowing Textbook Paragraph */}
      {storyLayoutMode === "paragraph" ? (
        <div className="p-4 sm:p-6 md:p-7 rounded-3xl bg-gradient-to-br from-amber-50/40 via-white to-purple-50/30 border border-purple-200/80 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-3.5 text-xl sm:text-2xl md:text-[27px] font-bold text-slate-800 leading-relaxed sm:leading-[1.85]">
            {currentSlide.content.englishText.map((sentence, sIdx) => {
              const words = sentence.split(" ");
              const isCurrentSentence = activeSentenceIndex === sIdx;
              const isMicActive = activeMicSentence === sIdx;

              return (
                <span
                  key={sIdx}
                  onClick={() => playSentence(sentence, sIdx)}
                  className={`inline-flex flex-wrap items-baseline gap-x-1.5 py-1 px-2 rounded-2xl transition-all cursor-pointer select-none touch-manipulation group ${
                    isCurrentSentence
                      ? "bg-purple-100/90 ring-2 ring-purple-300 text-purple-950 shadow-xs"
                      : "hover:bg-purple-50/80"
                  }`}
                  title="সম্পূর্ণ বাক্যটি শুনতে ক্লিক করুন"
                >
                  {words.map((w, wIdx) => {
                    const cleanWord = w.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_\x60~()?"']/g, "");
                    const isHighlighted = isCurrentSentence && activeWordIndex === wIdx;
                    const wKey = `${sIdx}-${wIdx}-${cleanWord}`;
                    const isMasked = isMemoryBlinderActive && isKeyword(w) && !revealedWords[wKey];
                    const banglaMeaning = WORD_BANGLA_MAP[cleanWord];

                    return (
                      <span key={wIdx} className="inline-flex flex-col items-center">
                        {isMasked ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setRevealedWords(prev => ({ ...prev, [wKey]: true }));
                              playChime("click");
                            }}
                            className="px-2 py-0.5 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-900 font-mono font-black text-xs border border-amber-400 shadow-2xs animate-pulse"
                            title="ক্লিক করে লুকানো শব্দটি উন্মোচন করো"
                          >
                            [ ? ]
                          </button>
                        ) : (
                          <span
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeak(w);
                            }}
                            className={`cursor-pointer select-none active:scale-95 touch-manipulation transition-all duration-150 inline-block px-1 rounded-lg ${
                              isHighlighted
                                ? "bg-gradient-to-r from-amber-300 to-yellow-300 text-amber-950 font-black scale-110 shadow-xs ring-2 ring-amber-400 border border-amber-400 animate-pulse"
                                : "hover:bg-purple-200/60 hover:text-purple-900"
                            }`}
                            title="উচ্চারণ শুনতে ক্লিক করুন"
                          >
                            {w}
                          </span>
                        )}

                        {showInterlinear && banglaMeaning && (
                          <span className="text-[11px] font-semibold text-purple-700 -mt-0.5 select-none animate-fade-in leading-tight">
                            {banglaMeaning}
                          </span>
                        )}
                      </span>
                    );
                  })}

                  {/* Inline Audio & Mic Quick Action for this sentence */}
                  <span className="inline-flex items-center gap-0.5 opacity-50 group-hover:opacity-100 transition-opacity ml-1 align-middle">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playSentence(sentence, sIdx);
                      }}
                      className="p-1 rounded-lg text-slate-400 hover:text-purple-700 hover:bg-purple-100 transition-colors"
                      title="এই বাক্যটি শুনুন"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        startVoicePractice(sentence, sIdx);
                      }}
                      className={`p-1 rounded-lg transition-colors ${
                        isMicActive && speechFeedback?.status === "listening"
                          ? "text-rose-600 bg-rose-50 animate-pulse"
                          : "text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      }`}
                      title="মাইক দিয়ে উচ্চারণ প্র্যাকটিস করো"
                    >
                      <Mic className="w-3.5 h-3.5" />
                    </button>
                  </span>
                </span>
              );
            })}
          </div>

          {/* Active Speech Recognition Feedback Badge for Paragraph mode */}
          {speechFeedback && (
            <div className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-between gap-2 border animate-scale-up ${
              speechFeedback.status === "listening"
                ? "bg-rose-50 text-rose-700 border-rose-200"
                : speechFeedback.status === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                : "bg-amber-50 text-amber-800 border-amber-300"
            }`}>
              <span className="flex items-center gap-1.5">
                {speechFeedback.status === "listening" ? "🎙️" : speechFeedback.status === "success" ? "🌟" : "💡"}
                <span>{speechFeedback.text}</span>
              </span>
              <button
                type="button"
                onClick={() => setSpeechFeedback(null)}
                className="text-[10px] text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded bg-white shadow-2xs"
              >
                বন্ধ
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Mode 2: Compact Interactive Sentence Strips */
        <div className="space-y-2">
          {currentSlide.content.englishText.map((sentence, sIdx) => {
            const words = sentence.split(" ");
            const isCurrentSentence = activeSentenceIndex === sIdx;
            const isMicActive = activeMicSentence === sIdx;

            return (
              <div 
                key={sIdx} 
                onClick={() => playSentence(sentence, sIdx)}
                className={`p-2.5 sm:p-3 rounded-2xl transition-all cursor-pointer select-none touch-manipulation relative group border ${
                  isCurrentSentence 
                    ? "bg-purple-50/90 border-purple-300 shadow-sm ring-2 ring-purple-300/40" 
                    : "bg-white hover:bg-purple-50/40 border-slate-200/80 hover:border-purple-200 shadow-2xs"
                }`}
                title="পুরো বাক্যটি শুনতে ক্লিক করুন"
              >
                <div className="flex items-center justify-between gap-3">
                  {/* Sentence Number Badge */}
                  <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg shrink-0">
                    {sIdx + 1}
                  </span>

                  {/* Words with Karaoke, Memory Blinder & Interlinear */}
                  <div className="flex flex-wrap gap-x-2 gap-y-1.5 items-end text-lg sm:text-xl md:text-2xl font-bold text-slate-800 leading-normal flex-1">
                    {words.map((w, wIdx) => {
                      const cleanWord = w.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_\x60~()?"']/g, "");
                      const isHighlighted = isCurrentSentence && activeWordIndex === wIdx;
                      const wKey = `${sIdx}-${wIdx}-${cleanWord}`;
                      const isMasked = isMemoryBlinderActive && isKeyword(w) && !revealedWords[wKey];
                      const banglaMeaning = WORD_BANGLA_MAP[cleanWord];

                      return (
                        <div key={wIdx} className="inline-flex flex-col items-center">
                          {isMasked ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setRevealedWords(prev => ({ ...prev, [wKey]: true }));
                                playChime("click");
                              }}
                              className="px-2.5 py-0.5 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-900 font-mono font-black text-xs border border-amber-400 shadow-2xs animate-pulse"
                              title="ক্লিক করে লুকানো শব্দটি উন্মোচন করো"
                            >
                              [ ? ]
                            </button>
                          ) : (
                            <span
                              role="button"
                              tabIndex={0}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSpeak(w);
                              }}
                              className={`cursor-pointer select-none active:scale-95 touch-manipulation transition-all duration-150 inline-block px-1.5 py-0.5 rounded-xl ${
                                isHighlighted
                                  ? "bg-gradient-to-r from-amber-300 to-yellow-300 text-amber-950 font-black scale-110 shadow-xs ring-2 ring-amber-400 border border-amber-400 animate-pulse"
                                  : "hover:bg-purple-100 hover:text-purple-800"
                              }`}
                              title="উচ্চারণ শুনতে ক্লিক করুন"
                            >
                              {w}
                            </span>
                          )}

                          {/* Dual Language Interlinear Word Meaning */}
                          {showInterlinear && banglaMeaning && (
                            <span className="text-[11px] font-semibold text-purple-700 -mt-0.5 select-none animate-fade-in leading-tight">
                              {banglaMeaning}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Subtle on-hover quick actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity self-center shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playSentence(sentence, sIdx);
                      }}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-purple-700 hover:bg-purple-100/70 transition-colors"
                      title="এই বাক্যটি শুনুন"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        startVoicePractice(sentence, sIdx);
                      }}
                      className={`p-1.5 rounded-xl transition-colors ${
                        isMicActive && speechFeedback?.status === "listening"
                          ? "text-rose-600 bg-rose-50 animate-pulse"
                          : "text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      }`}
                      title="মাইক দিয়ে উচ্চারণ প্র্যাকটিস করো"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Voice Practice Speech Recognition Feedback Badge */}
                {speechFeedback && speechFeedback.sentenceIdx === sIdx && (
                  <div className={`mt-2 p-2 rounded-xl text-xs font-bold flex items-center justify-between gap-2 border animate-scale-up ${
                    speechFeedback.status === "listening"
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : speechFeedback.status === "success"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                      : "bg-amber-50 text-amber-800 border-amber-300"
                  }`}>
                    <span className="flex items-center gap-1.5">
                      {speechFeedback.status === "listening" ? "🎙️" : speechFeedback.status === "success" ? "🌟" : "💡"}
                      <span>{speechFeedback.text}</span>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSpeechFeedback(null);
                      }}
                      className="text-[10px] text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded bg-white shadow-2xs"
                    >
                      বন্ধ
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  )}

  {/* Sub-Tab 2: Roleplay Dialogue Arena (Slide 4) */}
  {hasDialogue && activeStorySubTab === "roleplay" && (
    <div className="space-y-3 animate-fade-in">
      <div className="grid grid-cols-1 gap-2.5">
            {currentSlide.content.dialogue?.map((d, dIdx) => {
              const isAntOrGuide = d.speaker === "Ant" || d.speaker.includes("Guide") || d.speaker.includes("Student A");
              const isMyTeam = (roleplayMode === "ant" && isAntOrGuide) || (roleplayMode === "grasshopper" && !isAntOrGuide);
              const isOtherTeam = (roleplayMode === "ant" && !isAntOrGuide) || (roleplayMode === "grasshopper" && isAntOrGuide);

              return (
                <div 
                  key={dIdx}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    playSentence(d.text, 100 + dIdx, d.speaker);
                    if (isMyTeam) {
                      playChime("fanfare");
                      confetti({ particleCount: 25, spread: 50, origin: { y: 0.6 } });
                    }
                  }}
                  className={`p-4 rounded-2xl border text-sm font-semibold flex items-start gap-3.5 cursor-pointer hover:shadow-md transition-all touch-manipulation select-none active:scale-98 relative ${
                    isAntOrGuide 
                      ? "bg-amber-50/80 border-amber-200 text-amber-950 hover:border-amber-300 active:bg-amber-100" 
                      : "bg-sky-50/80 border-sky-200 text-sky-950 hover:border-sky-300 active:bg-sky-100"
                  } ${isMyTeam ? "ring-2 ring-purple-500 shadow-md scale-102" : isOtherTeam ? "opacity-75" : ""}`}
                  title="সংলাপটি শব্দ ধরে ধরে শুনতে ক্লিক করুন"
                >
                  {isMyTeam && (
                    <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-black shadow-xs flex items-center gap-1 animate-pulse">
                      <span>⭐ তোমার দলের সংলাপ!</span>
                    </span>
                  )}
                  <span className="text-3xl shrink-0 p-1 bg-white rounded-xl shadow-2xs" aria-hidden="true">
                    {d.avatar}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <strong className={`block text-xs uppercase tracking-wider ${d.speaker === "Ant" ? "text-amber-800" : "text-sky-800"}`}>
                        {d.speaker}:
                      </strong>
                      <span className="text-[10px] px-2 py-0.2 rounded-full font-bold bg-white/80 border border-slate-200 text-slate-600">
                        {d.team}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base mt-1 italic font-bold flex flex-wrap gap-x-1.5 gap-y-1">
                      {d.text.split(" ").map((dw, dwIdx) => {
                        const isDwHighlighted = activeSentenceIndex === (100 + dIdx) && activeWordIndex === dwIdx;
                        return (
                          <span
                            key={dwIdx}
                            className={`inline-block px-1 py-0.5 rounded transition-all ${
                              isDwHighlighted ? "bg-amber-300 text-amber-950 font-black scale-110 ring-2 ring-amber-400" : ""
                            }`}
                          >
                            {dw}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

  return (
    <article 
      ref={deckContainerRef}
      aria-labelledby="slideshow-title"
      className={`bg-white border border-slate-200 shadow-xl transition-all flex flex-col relative select-none ${
        isFullscreen 
          ? "fixed inset-0 z-50 rounded-none h-screen w-screen overflow-hidden bg-slate-900" 
          : "w-full min-h-[520px] sm:min-h-[680px] rounded-2xl sm:rounded-3xl overflow-visible sm:overflow-hidden"
      }`}
    >
      {/* 🌟 Consolidated Command Header & Classroom Studio Dock (Row 1) */}
      <header className={`px-3 sm:px-6 bg-gradient-to-r from-purple-50/95 via-white to-sky-50/95 backdrop-blur-md flex flex-wrap items-center justify-between border-b border-purple-100/90 shrink-0 gap-2 print:hidden shadow-2xs z-30 transition-all ${
        isFullscreen ? "py-1.5" : "py-2 sm:py-2.5"
      }`}>
        {/* Left: Lesson & Grade Branding */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <button
            type="button"
            onClick={() => {
              setIsDeckSelectorOpen(true);
              playChime("click");
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-black bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 active:scale-95 transition-all shadow-xs cursor-pointer shrink-0"
            title="অন্য পাঠ বা অধ্যায় নির্বাচন করতে ক্লিক করুন"
          >
            <span>📚 পাঠ পরিবর্তন</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <div className="min-w-0 flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-bold bg-sky-100 text-sky-800 border border-sky-200 shrink-0">
              {activeDeck.unit}
            </span>
            <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
              {activeDeck.grade}
            </span>
            <h3 id="slideshow-title" className="font-black text-xs sm:text-sm text-slate-900 truncate max-w-[140px] sm:max-w-[220px] md:max-w-none">
              {activeDeck.lesson}
            </h3>
          </div>
        </div>

        {/* Center: 3-in-1 Story Presentation Mode Switcher (Integrated directly into Top Dock) */}
        {isStorySlide && (
          <div className="flex items-center gap-1 p-0.5 sm:p-1 rounded-2xl bg-purple-100/80 border border-purple-200 shadow-2xs">
            <button
              type="button"
              onClick={() => {
                setStoryViewMode("split");
                playChime("click");
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                storyViewMode === "split"
                  ? "bg-purple-600 text-white shadow-xs scale-102"
                  : "text-purple-700 hover:text-purple-950 hover:bg-purple-200/50"
              }`}
              title="স্প্লিট-ভিউ: ৫০% ছবি ও ৫০% গল্প পাঠ (V চাপুন)"
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">স্প্লিট (৫০/৫০)</span>
              <span className="sm:hidden">স্প্লিট</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setStoryViewMode("visual");
                playChime("click");
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                storyViewMode === "visual"
                  ? "bg-purple-600 text-white shadow-xs scale-102"
                  : "text-purple-700 hover:text-purple-950 hover:bg-purple-200/50"
              }`}
              title="ফুল স্ক্রিন সিনেমাটিক দৃশ্যপট (V চাপুন)"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>ছবি</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setStoryViewMode("text");
                playChime("click");
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                storyViewMode === "text"
                  ? "bg-purple-600 text-white shadow-xs scale-102"
                  : "text-purple-700 hover:text-purple-950 hover:bg-purple-200/50"
              }`}
              title="ফুল স্ক্রিন বড় হরফে গল্প পাঠ (V চাপুন)"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>লেখা</span>
            </button>
          </div>
        )}

        {/* Right: Audio Phonics Capsule & Studio Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Audio Capsule */}
          <div className="flex items-center gap-1 bg-slate-100/90 p-0.5 sm:p-1 rounded-2xl border border-slate-200/80 shadow-2xs">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={playSlideAudio}
              className={`px-3 py-1 rounded-xl transition-all font-bold text-xs flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 whitespace-nowrap ${
                isSpeaking 
                  ? "bg-amber-500 text-white shadow-md shadow-amber-500/25 animate-pulse" 
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs"
              }`}
              title={`শব্দ ধরে ধরে পাঠ শুনুন (${accentMode === "bd" ? "🇧🇩 দেশীয় সহজ উচ্চারণ" : "🌐 আন্তর্জাতিক এক্সেন্ট"})`}
            >
              <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isSpeaking ? "থামাও" : "পাঠ শোনো"}</span>
            </button>

            {/* Accent Mode Toggle */}
            <div className="flex items-center p-0.5 bg-white rounded-xl border border-slate-200/70">
              <button
                type="button"
                onClick={() => {
                  setAccentMode("bd");
                  playChime("click");
                }}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all ${
                  accentMode === "bd"
                    ? "bg-emerald-600 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="সহজ দেশীয় উচ্চারণ"
              >
                🇧🇩 দেশীয়
              </button>
              <button
                type="button"
                onClick={() => {
                  setAccentMode("intl");
                  playChime("click");
                }}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all ${
                  accentMode === "intl"
                    ? "bg-sky-600 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="আন্তর্জাতিক এক্সেন্ট"
              >
                🌐
              </button>
            </div>

            {/* Speed Selector */}
            <div className="hidden md:flex items-center p-0.5 bg-white rounded-xl border border-slate-200/70">
              {([0.25, 0.5, 0.7, 0.85] as const).map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => {
                    setSpeechSpeed(spd);
                    playChime("click");
                  }}
                  className={`px-1.5 py-0.5 rounded-lg text-[10px] font-black transition-all ${
                    speechSpeed === spd
                      ? "bg-purple-600 text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title={`উচ্চারণ গতি: ${spd}x`}
                >
                  {spd === 0.25 ? "🐢 .২৫" : spd === 0.5 ? ".৫x" : spd === 0.7 ? ".৭x" : "১x"}
                </button>
              ))}
            </div>

            {/* Sound FX Toggle */}
            <button
              type="button"
              onClick={() => setSfxEnabled(!sfxEnabled)}
              className={`p-1.5 rounded-xl transition-all border border-slate-200/80 ${
                sfxEnabled ? "bg-sky-100 text-sky-800" : "bg-white text-slate-400"
              }`}
              title={sfxEnabled ? "সাউন্ড ইফেক্ট চালু" : "সাউন্ড বন্ধ"}
            >
              <Music className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Teacher Digital Pen */}
          <button
            type="button"
            onClick={() => {
              setIsPenActive(!isPenActive);
              playChime("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
              isPenActive 
                ? "bg-rose-600 text-white shadow-xs" 
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80"
            }`}
            title="স্ক্রিনে লেখার ডিজিটাল পেন"
          >
            <PenTool className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden sm:inline">মার্কার</span>
          </button>

          {/* Classroom Timer */}
          <button
            type="button"
            onClick={() => setShowTimerWidget(!showTimerWidget)}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
              showTimerWidget 
                ? "bg-amber-500 text-white shadow-xs" 
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80"
            }`}
            title="ক্লাসরুম টাইমার"
          >
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">টাইমার</span>
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className={`p-1.5 rounded-xl transition-colors shrink-0 flex items-center gap-1 ${
              isFullscreen
                ? "bg-purple-100 text-purple-900 border border-purple-300 shadow-2xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80"
            }`}
            title={isFullscreen ? "ফুলস্ক্রিন বন্ধ করুন (Esc / F)" : "ক্লাসরুম ফুলস্ক্রিন (F)"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* 🌟 Slide Context & Utilities Ribbon (Row 2 - Meta Ribbon) */}
      <div className={`px-3 sm:px-6 bg-purple-50/60 backdrop-blur-md border-b border-purple-100/80 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar print:hidden z-20 shadow-2xs touch-pan-x shrink-0 transition-all ${
        isFullscreen ? "py-1" : "py-1.5"
      }`}>
        {/* Left: Slide Number, Phase, Slide Title */}
        <div className="flex items-center gap-2 shrink-0 min-w-0">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-600 text-white shadow-2xs shrink-0">
            <span>স্লাইড {currentSlideIndex + 1}/{totalSlides}</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-white text-purple-900 border border-purple-200 shrink-0">
            <Clock className="w-3 h-3 text-purple-600" />
            <span>{currentSlide.phase} ({currentSlide.duration})</span>
          </span>
          <h2 className="text-xs sm:text-sm font-black text-slate-800 truncate max-w-[200px] sm:max-w-md">
            {currentSlide.title}
          </h2>
        </div>

        {/* Right: Learning Modes, Scoreboard, Teacher Notes Drawer Trigger, Worksheet, Download */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Dual Language Interlinear */}
          <button
            type="button"
            onClick={() => { setShowInterlinear(!showInterlinear); playChime("click"); }}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              showInterlinear ? "bg-purple-600 text-white shadow-2xs ring-2 ring-purple-300" : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
            title="প্রতিটি ইংরেজি শব্দের নিচে বাংলা শব্দার্থ দেখুন"
          >
            <Languages className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">শব্দার্থ</span>
          </button>

          {/* Memory Blinder */}
          <button
            type="button"
            onClick={() => {
              setIsMemoryBlinderActive(!isMemoryBlinderActive);
              if (!isMemoryBlinderActive) setRevealedWords({});
              playChime("click");
            }}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              isMemoryBlinderActive ? "bg-amber-500 text-white shadow-2xs ring-2 ring-amber-300" : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
            title="কঠিন শব্দগুলো লুকিয়ে স্মৃতি পরীক্ষা করুন"
          >
            {isMemoryBlinderActive ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">স্মৃতি পরীক্ষা</span>
          </button>

          {/* Ambience Audio Toggle */}
          <button
            type="button"
            onClick={toggleAmbience}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              isAmbiencePlaying
                ? "bg-sky-600 text-white shadow-2xs ring-2 ring-sky-300 animate-pulse"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
            title="গল্পের আবহ শব্দ"
          >
            <Wind className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isAmbiencePlaying ? "আবহ চালু" : "আবহ ধ্বনি"}</span>
          </button>

          {/* Team Scoreboard Toggle */}
          <button
            type="button"
            onClick={() => { setShowScoreboard(!showScoreboard); playChime("click"); }}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              showScoreboard ? "bg-emerald-600 text-white shadow-2xs ring-2 ring-emerald-300" : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
            title="শ্রেণিকক্ষে দল শাপলা ও গোলাপ এর স্কোর কাউন্টার"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden md:inline">টিম স্কোর</span>
          </button>

          <div className="h-4 w-px bg-purple-200 mx-0.5 hidden sm:block" />

          {/* Teacher Guide Slide-Up Drawer Trigger */}
          <button
            type="button"
            onClick={() => {
              setIsTeacherNotesExpanded(!isTeacherNotesExpanded);
              playChime("click");
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
              isTeacherNotesExpanded 
                ? "bg-purple-600 text-white shadow-xs" 
                : "bg-white text-purple-900 hover:bg-purple-50 border border-purple-200"
            }`}
            title="এনসিটিবি শিক্ষক সহায়িকা টেলিপ্রম্পটার খুলুন"
            aria-pressed={isTeacherNotesExpanded}
          >
            <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
            <span>শিক্ষক সহায়িকা</span>
          </button>

          {/* Worksheet Print */}
          <button
            type="button"
            onClick={() => setShowWorksheetModal(true)}
            className="px-2 py-1 rounded-xl bg-white hover:bg-purple-50 text-purple-800 border border-purple-200 font-bold text-xs flex items-center gap-1 transition-colors shadow-2xs"
            title="১ পাতার প্র্যাকটিস শিট প্রিন্ট করুন"
          >
            <FileText className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden lg:inline">ওয়ার্কশিট</span>
          </button>

          {/* Download HTML */}
          <button
            type="button"
            onClick={handleDownloadOfflineHtml}
            className="p-1 sm:px-2 sm:py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-xs"
            title="অফলাইন স্লাইড ডাউনলোড (.html)"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">ডাউনলোড</span>
          </button>
        </div>
      </div>

      {/* ⏱️ Floating Classroom Activity Countdown Timer Widget */}
      {showTimerWidget && (
        <aside 
          aria-label="ক্লাসরুম টাইমার"
          className="absolute top-28 right-4 z-40 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-amber-200 shadow-xl space-y-3 w-64 animate-fade-in"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-amber-800 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600 animate-spin" />
              <span>ক্লাসরুম ড্রিল টাইমার</span>
            </span>
            <button
              type="button"
              onClick={() => setShowTimerWidget(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-3xl font-black text-center text-slate-800 font-mono tracking-wider py-1 bg-amber-50 rounded-xl border border-amber-200">
            {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, "0")}
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1 shadow-xs ${
                isTimerRunning ? "bg-amber-600 hover:bg-amber-700" : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isTimerRunning ? "থামাও" : "শুরু"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(180);
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>রিসেট</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-1 pt-1 border-t border-slate-100 text-[11px] text-slate-500">
            <span>দ্রুত সেট:</span>
            <button onClick={() => { setTimerSeconds(60); setIsTimerRunning(false); }} className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-bold">১মি</button>
            <button onClick={() => { setTimerSeconds(180); setIsTimerRunning(false); }} className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-bold">৩মি</button>
            <button onClick={() => { setTimerSeconds(300); setIsTimerRunning(false); }} className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-bold">৫মি</button>
          </div>
        </aside>
      )}

      {/* 📽️ Main Slide Display Arena with Dynamic Motion Scenery Engine */}
      <main className={`flex-1 flex flex-col justify-between relative bg-gradient-to-br from-slate-50/80 via-white to-purple-50/20 min-h-0 overflow-y-auto transition-all ${
        isFullscreen ? "p-3 sm:p-6 lg:p-8" : "p-3.5 sm:p-8 lg:p-10"
      }`}>
        {/* 🖍️ Teacher Smart Marker / Annotation Suite (Phase 1) */}
        {isPenActive && (
          <div className="absolute inset-0 z-30 pointer-events-auto overflow-hidden">
            {/* Floating Smart Marker Dock (Draggable & Minimizable) */}
            {isToolbarMinimized ? (
              <div
                style={toolbarPos ? { left: `${toolbarPos.x}px`, top: `${toolbarPos.y}px` } : undefined}
                className={toolbarPos ? "fixed z-50 pointer-events-auto flex items-center gap-1.5" : "absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 z-40 pointer-events-auto flex items-center gap-1.5"}
              >
                <button
                  type="button"
                  onClick={() => { setIsToolbarMinimized(false); playChime("click"); }}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 text-slate-800 shadow-xl backdrop-blur-md border border-purple-300 text-xs font-bold transition-all hover:scale-105 active:scale-95 animate-in fade-in zoom-in-95 duration-150"
                  title="মার্কার টুলস বড় করুন"
                >
                  <PenTool className="w-3.5 h-3.5 text-purple-600" />
                  <span>মার্কার মেনু</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  type="button"
                  onClick={() => { setIsPenActive(false); playChime("click"); }}
                  className="p-1.5 rounded-full bg-white/95 text-rose-600 shadow-xl backdrop-blur-md border border-rose-200 hover:bg-rose-50 transition-all active:scale-95"
                  title="মার্কার মোড বন্ধ করুন"
                  aria-label="মার্কার মোড বন্ধ করুন"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <aside 
                role="toolbar" 
                aria-label="স্মার্ট মার্কার ও ক্লাসরুম অ্যানোটেশন টুলস"
                style={toolbarPos ? { left: `${toolbarPos.x}px`, top: `${toolbarPos.y}px` } : undefined}
                className={toolbarPos 
                  ? "fixed z-50 p-1.5 sm:p-2 rounded-2xl bg-white/95 backdrop-blur-md border border-purple-200/90 shadow-2xl flex items-center gap-1 sm:gap-1.5 max-w-[96vw] animate-in fade-in duration-150 select-none touch-manipulation" 
                  : "absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 p-1.5 sm:p-2 rounded-2xl bg-white/95 backdrop-blur-md border border-purple-200/90 shadow-2xl flex items-center gap-1 sm:gap-1.5 z-40 max-w-[96vw] animate-in fade-in duration-150 select-none touch-manipulation"
                }
              >
                {/* Drag Handle */}
                <div
                  onPointerDown={handleToolbarDragStart}
                  onPointerMove={handleToolbarDragMove}
                  onPointerUp={handleToolbarDragEnd}
                  onPointerCancel={handleToolbarDragEnd}
                  className="cursor-grab active:cursor-grabbing p-1 text-slate-400 hover:text-purple-600 transition-colors select-none shrink-0"
                  title="টুলবারটি ড্র্যাগ করে যেকোনো পাশে সরান"
                >
                  <GripVertical className="w-4 h-4" />
                </div>

                {/* Primary Tool Mode Cluster */}
                <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-100 p-0.5 rounded-xl shrink-0">
                  {/* Pen */}
                  <button
                    type="button"
                    onClick={() => { setMarkerTool("pen"); playChime("click"); }}
                    className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      markerTool === "pen"
                        ? "bg-white text-rose-700 shadow-xs ring-1 ring-rose-200"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    title="কলম / পেন মোড (লিখুন ও দাগ দিন)"
                  >
                    <PenTool className="w-3.5 h-3.5 text-rose-500" />
                    <span className="hidden xl:inline">পেন</span>
                  </button>

                  {/* Highlighter */}
                  <button
                    type="button"
                    onClick={() => { setMarkerTool("highlighter"); playChime("click"); }}
                    className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      markerTool === "highlighter"
                        ? "bg-white text-amber-700 shadow-xs ring-1 ring-amber-200"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    title="হাইলাইটার মোড (টেক্সট দৃশ্যমান রেখে হাইলাইট করুন)"
                  >
                    <Highlighter className="w-3.5 h-3.5 text-amber-500" />
                    <span className="hidden xl:inline">হাইলাইটার</span>
                  </button>

                  {/* Shape with Popover Trigger */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        if (markerTool !== "shape") {
                          setMarkerTool("shape");
                          playChime("click");
                        } else {
                          setMarkerPopover(markerPopover === "shape" ? null : "shape");
                          playChime("click");
                        }
                      }}
                      className={`p-1.5 sm:px-2 sm:py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-0.5 ${
                        markerTool === "shape"
                          ? "bg-white text-purple-700 shadow-xs ring-1 ring-purple-300"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                      title="স্মার্ট শেইপস (ক্লিক করে বৃত্ত/তীর/বক্স পছন্দ করুন)"
                    >
                      {shapeType === "circle" ? (
                        <Circle className="w-3.5 h-3.5 text-purple-600" />
                      ) : shapeType === "arrow" ? (
                        <ArrowRight className="w-3.5 h-3.5 text-purple-600" />
                      ) : (
                        <Square className="w-3.5 h-3.5 text-purple-600" />
                      )}
                      <ChevronDown className="w-3 h-3 text-purple-400" />
                    </button>

                    {/* Shape Popover Menu */}
                    {markerPopover === "shape" && (
                      <div className="absolute top-full left-0 mt-2 z-50 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-purple-200 p-1.5 flex items-center gap-1 animate-in fade-in zoom-in-95 duration-100 min-w-max">
                        <button
                          type="button"
                          onClick={() => { setShapeType("circle"); setMarkerPopover(null); playChime("click"); }}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            shapeType === "circle" ? "bg-purple-100 text-purple-900 shadow-2xs" : "hover:bg-slate-100 text-slate-700"
                          }`}
                        >
                          <Circle className="w-3.5 h-3.5 text-purple-600" />
                          <span>বৃত্ত</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => { setShapeType("arrow"); setMarkerPopover(null); playChime("click"); }}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            shapeType === "arrow" ? "bg-purple-100 text-purple-900 shadow-2xs" : "hover:bg-slate-100 text-slate-700"
                          }`}
                        >
                          <ArrowRight className="w-3.5 h-3.5 text-purple-600" />
                          <span>তীর</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => { setShapeType("box"); setMarkerPopover(null); playChime("click"); }}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            shapeType === "box" ? "bg-purple-100 text-purple-900 shadow-2xs" : "hover:bg-slate-100 text-slate-700"
                          }`}
                        >
                          <Square className="w-3.5 h-3.5 text-purple-600" />
                          <span>বক্স</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Laser */}
                  <button
                    type="button"
                    onClick={() => { setMarkerTool("laser"); playChime("click"); }}
                    className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      markerTool === "laser"
                        ? "bg-white text-red-700 shadow-xs ring-1 ring-red-400"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    title="ম্যাজিক লেজার পয়েন্টার (ক্ষণস্থায়ী আলো)"
                  >
                    <Zap className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    <span className="hidden xl:inline">লেজার</span>
                  </button>

                  {/* Spotlight */}
                  <button
                    type="button"
                    onClick={() => { setMarkerTool("spotlight"); playChime("click"); }}
                    className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      markerTool === "spotlight"
                        ? "bg-white text-sky-700 shadow-xs ring-1 ring-sky-400"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    title="ক্লাসরুম স্পটলাইট (সার্চলাইট)"
                  >
                    <Flashlight className="w-3.5 h-3.5 text-sky-600" />
                    <span className="hidden xl:inline">স্পটলাইট</span>
                  </button>

                  {/* Stamp with Popover Trigger */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        if (markerTool !== "stamp") {
                          setMarkerTool("stamp");
                          playChime("click");
                        } else {
                          setMarkerPopover(markerPopover === "stamp" ? null : "stamp");
                          playChime("click");
                        }
                      }}
                      className={`p-1.5 sm:px-2 sm:py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-0.5 ${
                        markerTool === "stamp"
                          ? "bg-white text-emerald-700 shadow-xs ring-1 ring-emerald-400"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                      title="রিওয়ার্ড স্ট্যাম্প (ক্লিক করে স্ট্যাম্প পরিবর্তন করুন)"
                    >
                      <span className="text-sm leading-none">{selectedStamp}</span>
                      <ChevronDown className="w-3 h-3 text-emerald-600" />
                    </button>

                    {/* Stamp Popover Menu */}
                    {markerPopover === "stamp" && (
                      <div className="absolute top-full left-0 mt-2 z-50 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-amber-200 p-1.5 flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-100 min-w-max">
                        {["⭐", "✔️", "👏", "💯", "❤️"].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => {
                              setSelectedStamp(s);
                              setMarkerPopover(null);
                              playChime("click");
                            }}
                            className={`p-1.5 rounded-xl text-lg transition-all ${
                              selectedStamp === s ? "bg-amber-100 scale-125 shadow-2xs ring-1 ring-amber-400" : "hover:bg-slate-100 hover:scale-110"
                            }`}
                            title={`${s} স্ট্যাম্প`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Eraser */}
                  <button
                    type="button"
                    onClick={() => { setMarkerTool("eraser"); playChime("click"); }}
                    className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      markerTool === "eraser"
                        ? "bg-white text-indigo-700 shadow-xs ring-1 ring-indigo-200"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    title="ইরেজার (ভুল দাগ মুছে ফেলুন)"
                  >
                    <Eraser className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="hidden xl:inline">ইরেজার</span>
                  </button>
                </div>

                {/* 🎨 Color & Brush Size Flyout Popover Trigger */}
                {markerTool !== "eraser" && markerTool !== "laser" && markerTool !== "spotlight" && markerTool !== "stamp" && (
                  <div className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setMarkerPopover(markerPopover === "color" ? null : "color");
                        playChime("click");
                      }}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-xl border transition-all ${
                        markerPopover === "color"
                          ? "bg-purple-50 border-purple-300 ring-2 ring-purple-400/50 shadow-2xs"
                          : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                      }`}
                      title="রং ও ব্রাশ সাইজ নির্বাচন করুন"
                      aria-label="রং ও সাইজ প্যালেট"
                    >
                      {/* Active Color Swatch Dot */}
                      <span
                        className="w-4 h-4 rounded-full border border-slate-400/60 shadow-2xs shrink-0"
                        style={{ backgroundColor: penColor }}
                      />
                      {/* Active Brush Size Dot */}
                      <span className="flex items-center gap-0.5 shrink-0">
                        <span 
                          className="rounded-full bg-slate-700 shrink-0"
                          style={{
                            width: brushSize === "fine" ? "4px" : brushSize === "medium" ? "7px" : "10px",
                            height: brushSize === "fine" ? "4px" : brushSize === "medium" ? "7px" : "10px",
                          }}
                        />
                      </span>
                      <ChevronDown className="w-3 h-3 text-slate-500" />
                    </button>

                    {/* Flyout Color & Size Popover Palette */}
                    {markerPopover === "color" && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-200 p-3 space-y-3 animate-in fade-in zoom-in-95 duration-100 w-52 select-none">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                          <span className="text-[11px] font-black uppercase text-purple-900 tracking-wider">রং ও ব্রাশের মাপ</span>
                          <button
                            type="button"
                            onClick={() => setMarkerPopover(null)}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Color Swatches Grid */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-slate-500 block">মার্কার রং:</span>
                          <div className="grid grid-cols-6 gap-1.5" role="group" aria-label="রং নির্বাচন">
                            {[
                              { color: "#ef4444", name: "লাল" },
                              { color: "#f59e0b", name: "হলুদ" },
                              { color: "#10b981", name: "সবুজ" },
                              { color: "#0ea5e9", name: "নীল" },
                              { color: "#8b5cf6", name: "বেগুনি" },
                              { color: "#0f172a", name: "কালো" },
                            ].map((item) => (
                              <button
                                key={item.color}
                                type="button"
                                onClick={() => {
                                  setPenColor(item.color);
                                  playChime("click");
                                }}
                                className={`w-6 h-6 rounded-full border-2 transition-transform ${
                                  penColor === item.color
                                    ? "border-slate-900 scale-120 ring-2 ring-purple-400"
                                    : "border-white hover:scale-110 shadow-2xs"
                                }`}
                                style={{ backgroundColor: item.color }}
                                title={`${item.name} রং`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Brush Thickness Buttons */}
                        <div className="space-y-1 pt-1 border-t border-slate-100">
                          <span className="text-[10px] font-bold text-slate-500 block">ব্রাশের মাপ:</span>
                          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                            <button
                              type="button"
                              onClick={() => { setBrushSize("fine"); playChime("click"); }}
                              className={`py-1 rounded-lg text-[11px] font-bold flex flex-col items-center gap-1 transition-all ${
                                brushSize === "fine" ? "bg-white text-purple-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                              <span>চিকন</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => { setBrushSize("medium"); playChime("click"); }}
                              className={`py-1 rounded-lg text-[11px] font-bold flex flex-col items-center gap-1 transition-all ${
                                brushSize === "medium" ? "bg-white text-purple-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                              <span>মাঝারি</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => { setBrushSize("bold"); playChime("click"); }}
                              className={`py-1 rounded-lg text-[11px] font-bold flex flex-col items-center gap-1 transition-all ${
                                brushSize === "bold" ? "bg-white text-purple-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              <span className="w-3.5 h-3.5 rounded-full bg-slate-800" />
                              <span>মোটা</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="h-4 w-[1px] bg-slate-200 shrink-0 mx-0.5" />

                {/* Action Buttons: Undo, Redo, Camera, Clear, Minimize, Close */}
                <div className="flex items-center gap-0.5 shrink-0">
                  <button
                    type="button"
                    onClick={handleUndo}
                    disabled={!canUndo}
                    className={`p-1.5 rounded-lg border transition-all ${
                      canUndo
                        ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 active:scale-95"
                        : "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed"
                    }`}
                    title="পূর্বের অবস্থায় ফিরুন (Undo)"
                  >
                    <Undo2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleRedo}
                    disabled={!canRedo}
                    className={`p-1.5 rounded-lg border transition-all ${
                      canRedo
                        ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 active:scale-95"
                        : "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed"
                    }`}
                    title="পরবর্তী অবস্থায় যান (Redo)"
                  >
                    <Redo2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={exportAnnotatedSlide}
                    className="p-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-colors active:scale-95"
                    title="নোটসহ স্লাইড ছবি হিসেবে সেভ করুন (Save PNG)"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={clearPenCanvas}
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors active:scale-95"
                    title="স্লাইডের সব আঁকা মুছে ফেলুন (Clear All)"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => { setIsToolbarMinimized(true); playChime("click"); }}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-colors active:scale-95"
                    title="টুলবার ছোট করে রাখুন (Minimize)"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPenActive(false)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-colors active:scale-95"
                    title="মার্কার টুলবার বন্ধ করুন (Close)"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </aside>
            )}

            {/* Permanent Ink Canvas Layer (Pen, Highlighter, Shapes, Stamps, Eraser) */}
            <canvas
              ref={penCanvasRef}
              className="absolute inset-0 w-full h-full touch-none"
            />

            {/* Auto-Fade Magic Laser / Spotlight / Shape Preview Layer */}
            <canvas
              ref={laserCanvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="absolute inset-0 w-full h-full touch-none"
              style={{
                cursor:
                  markerTool === "laser"
                    ? "crosshair"
                    : markerTool === "eraser"
                    ? "cell"
                    : markerTool === "highlighter"
                    ? "crosshair"
                    : markerTool === "spotlight"
                    ? "none"
                    : markerTool === "stamp"
                    ? "copy"
                    : "crosshair",
              }}
            />
          </div>
        )}
        {/* Dynamic Winter Snow Particle Canvas (Only active on winter scene) */}
        {currentSlide.sceneType === "winter" && (
          <canvas
            ref={snowCanvasRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-80"
          />
        )}

        <div className={`mx-auto w-full space-y-3 sm:space-y-4 relative z-10 transition-all ${isFullscreen ? "max-w-6xl" : "max-w-5xl"}`}>
          {/* 🏆 Classroom Team Battle Scoreboard (Collapsible when toggled from top bar) */}
          {showScoreboard && (
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-50/90 via-white to-purple-50/90 border border-amber-200 shadow-sm animate-scale-up space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-amber-200/60">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                  <h4 className="text-xs font-black uppercase text-slate-800">শ্রেণিকক্ষ টিম ব্যাটেল স্কোরবোর্ড</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowScoreboard(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold px-2 py-0.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  ✕ বন্ধ করুন
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto">
                {/* Team Shapla */}
                <div className="p-3 rounded-2xl bg-emerald-100/80 border border-emerald-300 text-center space-y-1.5 shadow-2xs">
                  <div className="text-xs font-bold text-emerald-900 flex items-center justify-center gap-1">
                    <span>🌸</span>
                    <span>দল শাপলা</span>
                  </div>
                  <div className="text-2xl font-black text-emerald-800">{teamShaplaScore}</div>
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      type="button"
                      onClick={() => { setTeamShaplaScore(s => s + 1); playChime("fanfare"); }} 
                      className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-sm hover:bg-emerald-700 flex items-center justify-center active:scale-95 shadow-2xs"
                      title="পয়েন্ট যোগ"
                    >
                      +
                    </button>
                    <button 
                      type="button"
                      onClick={() => setTeamShaplaScore(s => Math.max(0, s - 1))} 
                      className="w-7 h-7 rounded-lg bg-emerald-200 text-emerald-900 font-black text-sm hover:bg-emerald-300 flex items-center justify-center active:scale-95"
                      title="পয়েন্ট বিয়োগ"
                    >
                      -
                    </button>
                  </div>
                </div>

                {/* Team Golap */}
                <div className="p-3 rounded-2xl bg-rose-100/80 border border-rose-300 text-center space-y-1.5 shadow-2xs">
                  <div className="text-xs font-bold text-rose-900 flex items-center justify-center gap-1">
                    <span>🌹</span>
                    <span>দল গোলাপ</span>
                  </div>
                  <div className="text-2xl font-black text-rose-800">{teamGolapScore}</div>
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      type="button"
                      onClick={() => { setTeamGolapScore(s => s + 1); playChime("fanfare"); }} 
                      className="w-7 h-7 rounded-lg bg-rose-600 text-white font-black text-sm hover:bg-rose-700 flex items-center justify-center active:scale-95 shadow-2xs"
                      title="পয়েন্ট যোগ"
                    >
                      +
                    </button>
                    <button 
                      type="button"
                      onClick={() => setTeamGolapScore(s => Math.max(0, s - 1))} 
                      className="w-7 h-7 rounded-lg bg-rose-200 text-rose-900 font-black text-sm hover:bg-rose-300 flex items-center justify-center active:scale-95"
                      title="পয়েন্ট বিয়োগ"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>

              {/* Winner Announcement Banner */}
              {scoreboardWinner && (
                <div className="p-3 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-white font-black text-center text-xs sm:text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 animate-bounce">
                  <span className="text-lg">🏆</span>
                  <span>{scoreboardWinner}</span>
                </div>
              )}

              {/* Declare Winner */}
              <div className="text-center pt-1 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    playChime("fanfare");
                    confetti({ particleCount: 65, spread: 85, origin: { y: 0.6 } });
                    const winner = teamShaplaScore > teamGolapScore 
                      ? "দল শাপলা 🌸 বিজয়ী হয়েছে!" 
                      : teamGolapScore > teamShaplaScore 
                      ? "দল গোলাপ 🌹 বিজয়ী হয়েছে!" 
                      : "উভয় দলই সমান পারদর্শী হয়েছে! 🤝";
                    setScoreboardWinner(winner);
                    speakBangla(`অভিনন্দন! ${winner}`);
                  }}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-all active:scale-95 inline-flex items-center justify-center gap-1.5"
                  title="ফলাফল ঘোষণা ও কনফেটি"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>ফলাফল ঘোষণা ও কনফেটি</span>
                </button>
                {scoreboardWinner && (
                  <button
                    type="button"
                    onClick={() => setScoreboardWinner(null)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs font-bold"
                    title="ব্যানার লুকান"
                  >
                    বন্ধ
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 📖 Slide Presentation Arena */}
          <div className="w-full">
            {/* 🎨 Activity A: Interactive SVG Coloring Studio (Ant & Grasshopper Slide 1 Exclusive) */}
            {currentSlide.id === 1 && selectedDeckId === "ant-and-grasshopper" && (
              <div className="p-3.5 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                <ActivityAColoringCanvas playChime={playChime} />
              </div>
            )}

            {/* 🌟 3-in-1 Story & Activity Presentation Layout (Visual Stage Slides) */}
            {isStorySlide ? (
              <div className="space-y-3">
                {/* Mode 1: Split-View (50/50 Side-by-Side) */}
                {storyViewMode === "split" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 items-stretch min-h-[460px] lg:h-[calc(100vh-215px)] lg:max-h-[580px]">
                    {/* Left 50%: Story / Crafting / Campus Visual Stage */}
                    <div className="h-full flex flex-col min-h-0">
                      {selectedDeckId === "handwashing-steps" ? (
                        <HandwashingVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "inclusive-rani" ? (
                        <InclusiveEducationVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "save-water" ? (
                        <SaveWaterVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "hill-festival" ? (
                        <HillFestivalVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "mitas-day" ? (
                        <MitasDayVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "sagar-family" ? (
                        <SagarFamilyVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "sagar-week" ? (
                        <SagarsWeekVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "stationery-shop" ? (
                        <StationeryShopVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "traffic-safety" ? (
                        <TrafficSafetyVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "raju-firefighter-c4" ? (
                        <RajuFirefighterVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "sreemangal-tea" ? (
                        <SreemangalTeaVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "reshma-worker" ? (
                        <ReshmaGarmentsWorkerVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "lion-and-mouse" ? (
                        <LionAndMouseVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "clever-crow" ? (
                        <CleverCrowVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "sima-jessica" ? (
                        <SimaJessicaVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "saikats-family" ? (
                        <SaikatsFamilyVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "food-pyramid" ? (
                        <FoodPyramidVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "doctors-advice" ? (
                        <DoctorsAdviceVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "maria-life-is-beautiful" ? (
                        <MariaLifeIsBeautifulVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "liberation-war-museum" ? (
                        <LiberationWarMuseumVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "hare-and-tortoise" ? (
                        <HareAndTortoiseVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "saint-martins-island" ? (
                        <SaintMartinsIslandVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "kishoreganj-district" ? (
                        <KishoreganjDistrictVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "raju-occupations-c5" ? (
                        <RajuOccupationsC5VisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "introducing-jerin" ? (
                        <IntroducingJerinVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "sabiha-family" ? (
                        <SabihasFamilyVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "sunil-rahat-friends" ? (
                        <SunilRahatFriendshipVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "school-library-card" ? (
                        <SchoolLibraryCardVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "breakfast-routine" ? (
                        <FazleAnitaBreakfastVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "calendar-months" ? (
                        <CalendarMonthsVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "porshi-school" ? (
                        <PorshisSchoolVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "osman-village" ? (
                        <OsmansVillageLifeVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "oyshi-city-life" ? (
                        <OyshisCityLifeVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "nusair-habits" ? (
                        <NusairCleanlinessVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "water-pollution" ? (
                        <WaterPollutionVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : selectedDeckId === "making-a-paper-kite" ? (
                        <KiteCraftingVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      ) : (
                        <StoryVisualStage
                          slideId={currentSlide.id}
                          playChime={playChime}
                          handleSpeak={handleSpeak}
                          isFullTheater={false}
                        />
                      )}
                    </div>
                    {/* Right 50%: Tabbed Story Reading & Roleplay Arena */}
                    <div className="h-full flex flex-col min-h-0 p-3.5 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs">
                      <div className="flex-1 overflow-y-auto pr-1 sm:pr-1.5 scrollbar-thin scrollbar-thumb-purple-200 hover:scrollbar-thumb-purple-300 min-h-0">
                        {renderStoryContent()}
                      </div>
                      {currentSlide.content.banglaExplanation && (
                        <div className="mt-2.5 pt-2 border-t border-purple-100 flex items-start justify-between gap-2 shrink-0">
                          <p className="text-[11px] sm:text-xs text-purple-900 font-medium leading-relaxed">
                            <strong className="text-purple-950 font-bold">বাংলা ভাবার্থ:</strong> {currentSlide.content.banglaExplanation}
                          </p>
                          <button
                            type="button"
                            onClick={() => isBanglaSpeaking ? stopAllSpeech() : speakBangla(currentSlide.content.banglaExplanation!)}
                            className={`shrink-0 px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
                              isBanglaSpeaking 
                                ? "bg-rose-500 text-white animate-pulse" 
                                : "bg-purple-100 hover:bg-purple-200 text-purple-800"
                            }`}
                            title="বাংলায় ভাবার্থ শুনুন"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>{isBanglaSpeaking ? "থামাও" : "ভাবার্থ শোনো"}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                    {/* Mode 2: Full-Screen Visual Theater */}
                    {storyViewMode === "visual" && (
                      <div className="space-y-3">
                        {selectedDeckId === "handwashing-steps" ? (
                          <HandwashingVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "inclusive-rani" ? (
                          <InclusiveEducationVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "save-water" ? (
                          <SaveWaterVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "hill-festival" ? (
                          <HillFestivalVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "mitas-day" ? (
                          <MitasDayVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "sagar-family" ? (
                          <SagarFamilyVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "sagar-week" ? (
                          <SagarsWeekVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "stationery-shop" ? (
                          <StationeryShopVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "traffic-safety" ? (
                          <TrafficSafetyVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "raju-firefighter-c4" ? (
                          <RajuFirefighterVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "sreemangal-tea" ? (
                          <SreemangalTeaVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "reshma-worker" ? (
                          <ReshmaGarmentsWorkerVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "lion-and-mouse" ? (
                          <LionAndMouseVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "clever-crow" ? (
                          <CleverCrowVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "sima-jessica" ? (
                          <SimaJessicaVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "saikats-family" ? (
                          <SaikatsFamilyVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "food-pyramid" ? (
                          <FoodPyramidVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "doctors-advice" ? (
                          <DoctorsAdviceVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "maria-life-is-beautiful" ? (
                          <MariaLifeIsBeautifulVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "liberation-war-museum" ? (
                          <LiberationWarMuseumVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "hare-and-tortoise" ? (
                          <HareAndTortoiseVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "saint-martins-island" ? (
                          <SaintMartinsIslandVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "kishoreganj-district" ? (
                          <KishoreganjDistrictVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "raju-occupations-c5" ? (
                          <RajuOccupationsC5VisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                      ) : selectedDeckId === "introducing-jerin" ? (
                          <IntroducingJerinVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "sabiha-family" ? (
                          <SabihasFamilyVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "sunil-rahat-friends" ? (
                          <SunilRahatFriendshipVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "school-library-card" ? (
                          <SchoolLibraryCardVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "breakfast-routine" ? (
                          <FazleAnitaBreakfastVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "calendar-months" ? (
                          <CalendarMonthsVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "porshi-school" ? (
                          <PorshisSchoolVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "osman-village" ? (
                          <OsmansVillageLifeVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "oyshi-city-life" ? (
                          <OyshisCityLifeVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "nusair-habits" ? (
                          <NusairCleanlinessVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "water-pollution" ? (
                          <WaterPollutionVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : selectedDeckId === "making-a-paper-kite" ? (
                          <KiteCraftingVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        ) : (
                          <StoryVisualStage
                            slideId={currentSlide.id}
                            playChime={playChime}
                            handleSpeak={handleSpeak}
                            isFullTheater={true}
                          />
                        )}
                        {/* Cinema Subtitle Bar below the visual stage */}
                        <div className="p-3.5 rounded-2xl bg-white border border-purple-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="p-2 bg-purple-100 text-purple-700 rounded-xl">
                              <Volume2 className="w-4 h-4" />
                            </span>
                            <div>
                              <p className="text-xs sm:text-sm font-bold text-slate-800">
                                {activeSentenceIndex !== null && currentSlide.content.englishText[activeSentenceIndex]
                                  ? currentSlide.content.englishText[activeSentenceIndex]
                                  : currentSlide.content.englishText[0]}
                              </p>
                              <p className="text-[11px] text-slate-500 font-medium">
                                চলমান বাক্য • শব্দে শব্দে উচ্চারণ শুনতে ছবিতে ক্লিক করুন
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={playSlideAudio}
                              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
                            >
                              <Play className="w-3.5 h-3.5" />
                              <span>পুরো দৃশ্য শুনুন</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setStoryViewMode("text");
                                playChime("click");
                              }}
                              className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 font-bold text-xs flex items-center gap-1.5 transition-all"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>বড় টেক্সট পড়ুন ➔</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mode 3: Full-Width Story Text Reading */}
                    {storyViewMode === "text" && (
                      <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs">
                        {renderStoryContent()}
                        {currentSlide.content.banglaExplanation && (
                          <div className="mt-3 pt-2.5 border-t border-purple-100 flex items-start justify-between gap-2">
                            <p className="text-xs sm:text-sm text-purple-900 font-medium leading-relaxed">
                              <strong className="text-purple-950 font-bold">বাংলা ভাবার্থ:</strong> {currentSlide.content.banglaExplanation}
                            </p>
                            <button
                              type="button"
                              onClick={() => isBanglaSpeaking ? stopAllSpeech() : speakBangla(currentSlide.content.banglaExplanation!)}
                              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
                                isBanglaSpeaking 
                                  ? "bg-rose-500 text-white animate-pulse" 
                                  : "bg-purple-100 hover:bg-purple-200 text-purple-800"
                              }`}
                              title="বাংলায় ভাবার্থ শুনুন"
                            >
                              <Volume2 className="w-4 h-4" />
                              <span>{isBanglaSpeaking ? "থামাও" : "ভাবার্থ শোনো"}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : currentSlide.id !== 1 ? (
                  <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                    {currentSlide.content.englishText && currentSlide.content.englishText.length > 0 && renderStoryContent()}

                {/* 🔤 Syllable Phonics Lab & Visual Picture Cards (Slide 2) */}
                {currentSlide.content.vocabulary && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                      <p className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>শব্দভাণ্ডার ও পিকচার ফ্ল্যাশকার্ড (শব্দে ক্লিক করে বড় করে দেখুন):</span>
                      </p>
                      <span className="text-[11px] text-emerald-700 font-bold hidden sm:inline">🎴 ভিজ্যুয়াল ফ্ল্যাশকার্ড ভিউ</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {currentSlide.content.vocabulary.map((v, vIdx) => (
                        <button
                          key={vIdx}
                          type="button"
                          onClick={() => {
                            setInspectedWord(v);
                            handleSpeak(v.word);
                            playChime("click");
                          }}
                          className="group p-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 hover:bg-emerald-50 hover:border-emerald-300 active:bg-emerald-100 text-left transition-all hover:scale-102 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-2xs touch-manipulation select-none relative overflow-hidden"
                        >
                          <div className="flex items-center justify-between">
                            <strong className="text-emerald-800 text-sm sm:text-base flex items-center gap-1.5 group-hover:scale-105 transition-transform">
                              <span className="text-xl sm:text-2xl p-1 bg-white rounded-lg shadow-2xs">{v.icon}</span>
                              <span>{v.word}</span>
                            </strong>
                            <span className="text-[10px] text-slate-400 font-mono">{v.phonetic}</span>
                          </div>
                          <div className="text-[11px] font-bold text-purple-700 mt-2 flex items-center gap-1">
                            <span>{v.syllables.join(" • ")}</span>
                          </div>
                          <span className="text-xs text-slate-600 block mt-0.5 font-medium">{v.meaning}</span>
                          <div className="mt-2 text-[10px] font-bold text-emerald-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>🔍 বিস্তারিত ফ্ল্যাশকার্ড খুলুন</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 🧺 Dynamic Sorting Game (Materials vs Steps / Summer vs Winter) */}
                {currentSlide.content.sortingGame && (() => {
                  const categories = currentSlide.content.sortingGame.categories || {
                    cat1: { id: "summer", label: "☀️ Summer Basket (গ্রীষ্মের ঝুড়ি)", icon: "☀️", theme: "amber" },
                    cat2: { id: "winter", label: "❄️ Winter Basket (শীতের ঝুড়ি)", icon: "❄️", theme: "sky" }
                  };

                  return (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                        <span className="text-xs font-black uppercase text-amber-800 tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          <span>{currentSlide.content.sortingGame.instruction || "শব্দ বাছাই খেলা (Sorting Game)"}</span>
                        </span>
                        <span className="text-[11px] text-slate-500 font-semibold">কার্ডে ক্লিক করে সঠিক ঝুড়িতে পাঠাও</span>
                      </div>

                      {/* Two Baskets Arena */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Basket 1 */}
                        <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-300/80 space-y-2 min-h-[140px] flex flex-col">
                          <div className="flex items-center justify-between">
                            <span className="font-black text-amber-900 text-sm flex items-center gap-1.5">
                              <span>{categories.cat1.icon}</span>
                              <span>{categories.cat1.label}</span>
                            </span>
                            <span className="text-xs font-bold text-amber-800 px-2 py-0.5 rounded-full bg-white">
                              {Object.values(sortedItems).filter((v) => v === categories.cat1.id).length} টি আইটেম
                            </span>
                          </div>
                          <div className="flex-1 flex flex-wrap gap-1.5 content-start pt-1">
                            {currentSlide.content.sortingGame.items
                              .filter((item) => sortedItems[item.id] === categories.cat1.id)
                              .map((item) => (
                                <span 
                                  key={item.id} 
                                  className="px-2.5 py-1 rounded-xl text-xs font-bold bg-white text-amber-900 border border-amber-200 shadow-2xs flex items-center gap-1 animate-scale-up"
                                >
                                  <span>{item.icon}</span>
                                  <span>{item.label}</span>
                                </span>
                              ))}
                          </div>
                        </div>

                        {/* Basket 2 */}
                        <div className="p-4 rounded-2xl bg-sky-50/80 border-2 border-sky-300/80 space-y-2 min-h-[140px] flex flex-col">
                          <div className="flex items-center justify-between">
                            <span className="font-black text-sky-900 text-sm flex items-center gap-1.5">
                              <span>{categories.cat2.icon}</span>
                              <span>{categories.cat2.label}</span>
                            </span>
                            <span className="text-xs font-bold text-sky-800 px-2 py-0.5 rounded-full bg-white">
                              {Object.values(sortedItems).filter((v) => v === categories.cat2.id).length} টি আইটেম
                            </span>
                          </div>
                          <div className="flex-1 flex flex-wrap gap-1.5 content-start pt-1">
                            {currentSlide.content.sortingGame.items
                              .filter((item) => sortedItems[item.id] === categories.cat2.id)
                              .map((item) => (
                                <span 
                                  key={item.id} 
                                  className="px-2.5 py-1 rounded-xl text-xs font-bold bg-white text-sky-900 border border-sky-200 shadow-2xs flex items-center gap-1 animate-scale-up"
                                >
                                  <span>{item.icon}</span>
                                  <span>{item.label}</span>
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>

                      {/* Available Unsorted Words Pool */}
                      <div className="space-y-1.5 pt-1">
                        <p className="text-[11px] font-bold uppercase text-slate-500">বাকি আইটেমগুলো ঝুড়িতে পাঠাও (ক্লিক করো):</p>
                        <div className="flex flex-wrap gap-2">
                          {currentSlide.content.sortingGame.items
                            .filter((item) => !sortedItems[item.id])
                            .map((item) => (
                              <div key={item.id} className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                                <span className="text-xs font-bold px-2 py-0.5 text-slate-800">{item.icon} {item.label}</span>
                                <button
                                  onClick={() => handleSortItem(item.id, categories.cat1.id)}
                                  className="px-2.5 py-1 rounded-lg bg-amber-500 text-white font-bold text-[11px] hover:bg-amber-600 active:scale-95 touch-manipulation select-none"
                                  title={`${categories.cat1.label} এ দাও`}
                                >
                                  {categories.cat1.label.split("(")[0]}
                                </button>
                                <button
                                  onClick={() => handleSortItem(item.id, categories.cat2.id)}
                                  className="px-2.5 py-1 rounded-lg bg-sky-500 text-white font-bold text-[11px] hover:bg-sky-600 active:scale-95 touch-manipulation select-none"
                                  title={`${categories.cat2.label} এ দাও`}
                                >
                                  {categories.cat2.label.split("(")[0]}
                                </button>
                              </div>
                            ))}
                          {currentSlide.content.sortingGame.items.every((item) => sortedItems[item.id]) && (
                            <div className="w-full p-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs text-center flex items-center justify-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>চমৎকার! সকল উপাদান সঠিকভাবে সাজানো সম্পন্ন হয়েছে! 🎉</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* ✍️ Punctuation Detective Drill (Slide 8) */}
                {currentSlide.content.punctuationDrill && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                      <span className="text-xs font-black uppercase text-indigo-800 tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <span>এনসিটিবি Page 113: বিরামচিহ্ন ডিটেকটিভ (Punctuation Detective)</span>
                      </span>
                      <span className="text-[11px] text-slate-500 font-semibold">সঠিক চিহ্ন বাছাই করো</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentSlide.content.punctuationDrill.challenges.map((c) => {
                        const userChoice = punctuationAnswers[c.id];
                        const isCorrect = userChoice === c.missingMark;

                        return (
                          <div key={c.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                            <p className="font-bold text-sm text-slate-800">
                              <span>{c.sentenceBefore} </span>
                              <span className={`inline-block px-2 py-0.5 rounded-md font-mono font-black text-sm border ${
                                userChoice
                                  ? isCorrect
                                    ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                    : "bg-rose-100 text-rose-800 border-rose-300"
                                  : "bg-white text-slate-400 border-slate-300"
                              }`}>
                                {userChoice || "[ ? ]"}
                              </span>
                              <span> {c.sentenceAfter || ""}</span>
                            </p>
                            <p className="text-[11px] text-slate-500 font-medium">অর্থ: {c.meaning}</p>
                            <div className="flex items-center gap-1.5 pt-1">
                              {c.options.map((opt) => (
                                <button
                                  key={opt}
                                  onClick={() => handlePunctuationAnswer(c.id, opt)}
                                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                                    userChoice === opt
                                      ? isCorrect
                                        ? "bg-emerald-600 text-white border-emerald-700"
                                        : "bg-rose-500 text-white border-rose-600"
                                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Interactive MCQ Quiz Activity */}
                {currentSlide.content.quiz && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-purple-700">
                      শ্রেণিকক্ষের কুইজ: {currentSlide.content.quiz.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentSlide.content.quiz.options.map((opt, oIdx) => {
                        const isCorrect = opt === currentSlide.content.quiz?.answer;
                        const isSelected = quizAnswer === opt;
                        let btnStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100";

                        if (quizAnswer) {
                          if (isCorrect) {
                            btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-sm";
                          } else if (isSelected && !isCorrect) {
                            btnStyle = "bg-rose-500 text-white border-rose-600";
                          } else {
                            btnStyle = "bg-slate-50 border-slate-200 opacity-60";
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => {
                              setQuizAnswer(opt);
                              if (isCorrect) playChime("fanfare");
                              else playChime("click");
                            }}
                            className={`p-3 rounded-xl border font-bold text-xs sm:text-sm text-left transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 🤔 Moral Compass: Moral Dilemma (Ant and Grasshopper Slide 5 & 6) */}
                {(currentSlide.id === 6 || currentSlide.id === 5) && selectedDeckId === "ant-and-grasshopper" && (
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 border-2 border-purple-200/80 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-purple-900 tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span>🤔 মোরাল কম্পাস: নৈতিক সিদ্ধান্ত (Moral Dilemma)</span>
                      </span>
                      <span className="text-[11px] font-bold text-purple-700 bg-white/90 px-2 py-0.5 rounded-full border border-purple-200">
                        শ্রেণিকক্ষে বিতর্ক
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800">
                      &quot;তুমি যদি সেই পরিশ্রমী পিঁপড়া হতে, তবে অনাহারে কাঁপতে থাকা বন্ধু ঘাসফড়িংকে খাবার দিতে?&quot;
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setMoralVote("help");
                          playChime("fanfare");
                          confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
                        }}
                        className={`p-3 rounded-xl border text-left transition-all active:scale-95 ${
                          moralVote === "help"
                            ? "bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-400 font-bold"
                            : "bg-white text-slate-800 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 font-semibold"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span>💚 অপশন ১: খাবার দিয়ে বাঁচাতাম</span>
                          {moralVote && <span className="font-mono font-black text-xs">৬৪% শিক্ষার্থী</span>}
                        </div>
                        <p className={`text-[11px] mt-1 ${moralVote === "help" ? "text-emerald-100" : "text-slate-500"}`}>
                          কারণ: বিপদের দিনে প্রকৃত বন্ধুকে ফিরিয়ে দেওয়া যায় না (সহমর্মিতা ও বন্ধুত্ব)।
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setMoralVote("strict");
                          playChime("click");
                          confetti({ particleCount: 20, spread: 40, origin: { y: 0.6 } });
                        }}
                        className={`p-3 rounded-xl border text-left transition-all active:scale-95 ${
                          moralVote === "strict"
                            ? "bg-amber-600 text-white border-amber-700 shadow-md ring-2 ring-amber-400 font-bold"
                            : "bg-white text-slate-800 border-slate-200 hover:bg-amber-50 hover:border-amber-300 font-semibold"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span>🧡 অপশন ২: কঠোর হয়ে শিক্ষা দিতাম</span>
                          {moralVote && <span className="font-mono font-black text-xs">৩৬% শিক্ষার্থী</span>}
                        </div>
                        <p className={`text-[11px] mt-1 ${moralVote === "strict" ? "text-amber-100" : "text-slate-500"}`}>
                          কারণ: অলসতার কুফল না বুঝলে সে ভবিষ্যতেও পরিশ্রম করতে শিখবে না (দায়িত্ববোধ)।
                        </p>
                      </button>
                    </div>

                    {moralVote && (
                      <div className="p-2.5 rounded-xl bg-white/90 border border-purple-200 text-xs font-semibold text-purple-900 flex items-center justify-between gap-2 animate-fade-in">
                        <span>💡 শিক্ষক সহায়িকা নোট: উভয় উত্তরেরই যৌক্তিক ভিত্তি রয়েছে। শিক্ষার্থীদের যুক্তি উপস্থাপনের সুযোগ দিন!</span>
                        <button
                          type="button"
                          onClick={() => setMoralVote(null)}
                          className="text-[11px] text-purple-600 hover:underline shrink-0 font-bold"
                        >
                          ভোট রিসেট
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Bangla Meaning & Context Box */}
                {currentSlide.content.banglaExplanation && (
                  <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-start justify-between gap-2">
                    <p className="text-xs sm:text-sm text-purple-950 leading-relaxed font-medium">
                      <strong className="text-purple-900 font-bold">বাংলা ভাবার্থ:</strong> {currentSlide.content.banglaExplanation}
                    </p>
                    <button
                      type="button"
                      onClick={() => isBanglaSpeaking ? stopAllSpeech() : speakBangla(currentSlide.content.banglaExplanation!)}
                      className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
                        isBanglaSpeaking 
                          ? "bg-rose-500 text-white animate-pulse" 
                          : "bg-purple-200/80 hover:bg-purple-300 text-purple-900"
                      }`}
                      title="বাংলায় ভাবার্থ শুনুন"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{isBanglaSpeaking ? "থামাও" : "ভাবার্থ শোনো"}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>

        {/* 🧭 Navigation & Slide Progress Bar (Sticky & Compact) */}
        <nav 
          aria-label="স্লাইড নেভিগেশন ও জাম্প বার"
          className={`mx-auto w-full pt-2 sm:pt-2.5 mt-2 sm:mt-3 border-t border-purple-100/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 z-10 sticky bottom-0 bg-white/95 backdrop-blur-md pb-1.5 rounded-t-2xl px-3 shadow-2xs transition-all ${
            isFullscreen ? "max-w-6xl" : "max-w-5xl"
          }`}
        >
          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-2 order-2 sm:order-1">
            <button
              type="button"
              disabled={currentSlideIndex === 0}
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs touch-manipulation select-none active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              <span>পূর্ববর্তী স্লাইড</span>
            </button>

            <button
              type="button"
              disabled={currentSlideIndex === totalSlides - 1}
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all touch-manipulation select-none active:scale-95"
            >
              <span>পরবর্তী স্লাইড</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2 flex-wrap justify-center py-1">
            {activeDeck.slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setCurrentSlideIndex(idx);
                  setQuizAnswer(null);
                  playChime("click");
                }}
                className="p-1 sm:p-0.5 flex items-center justify-center min-w-[28px] min-h-[28px] sm:min-w-0 sm:min-h-0 touch-manipulation group"
                title={`স্লাইড ${idx + 1}`}
                aria-label={`স্লাইড ${idx + 1} এ যান`}
                aria-current={currentSlideIndex === idx ? "step" : undefined}
              >
                <span
                  className={`h-3 rounded-full transition-all ${
                    currentSlideIndex === idx
                      ? "w-8 bg-purple-600 shadow-xs"
                      : "w-3 bg-slate-300 group-hover:bg-slate-400 group-active:scale-95"
                  }`}
                />
              </button>
            ))}
          </div>
        </nav>
      </main>

      {/* 👩‍🏫 NCTB Teacher's Guide Slide-Up Teleprompter Drawer (User Option: Drawer Mode) */}
      {isTeacherNotesExpanded && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-label="এনসিটিবি শিক্ষক সহায়িকা নির্দেশনা"
          onClick={() => {
            setIsTeacherNotesExpanded(false);
            playChime("click");
          }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-xs p-0 sm:p-4 animate-fade-in pointer-events-auto"
        >
          <div 
            className="bg-white rounded-t-3xl sm:rounded-3xl border border-purple-200 shadow-2xl w-full max-w-4xl max-h-[85vh] sm:max-h-[75vh] flex flex-col overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-3.5 sm:p-4 bg-gradient-to-r from-purple-50 via-white to-indigo-50 border-b border-purple-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-purple-100 text-purple-700 shadow-2xs">
                  <GraduationCap className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-purple-950 flex items-center gap-2">
                    <span>এনসিটিবি শিক্ষক সহায়িকা নির্দেশনা (Teacher&apos;s Guide)</span>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200">
                      NCTB TG 2026
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {currentSlide.phase} • সময় বরাদ্দ: {currentSlide.duration}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsTeacherNotesExpanded(false);
                  playChime("click");
                }}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                title="বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-purple-950 font-medium leading-relaxed">
                <p>{currentSlide.teacherNotes}</p>
              </div>

              {currentSlide.quickTeachingSteps && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-slate-600">৩-ধাপের ক্লাসরুম পাঠদান কৌশল (Quick Steps):</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {currentSlide.quickTeachingSteps.map((step, sIdx) => (
                      <div key={sIdx} className="p-3 rounded-xl bg-white border border-purple-100 shadow-2xs font-semibold text-purple-900 flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-black shrink-0">
                          {sIdx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <span>কিবোর্ড শর্টকাট: <kbd className="px-1.5 py-0.5 bg-white border rounded">Esc</kbd> চেপে বন্ধ করুন</span>
              <button
                type="button"
                onClick={() => {
                  setIsTeacherNotesExpanded(false);
                  playChime("click");
                }}
                className="px-4 py-1.5 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors shadow-2xs"
              >
                বুঝেছি, বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🧩 3. Interactive Sentence Builder Puzzle Modal */}
      {showSentencePuzzle && (
        <div 
          role="dialog" 
          aria-modal="true" 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-3 sm:p-4 animate-fade-in"
        >
          <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-xl w-full border border-slate-200 shadow-2xl space-y-5 animate-scale-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-100 text-amber-900 rounded-xl text-xl">🧩</span>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-slate-900">
                    সেন্টেন্স বিল্ডার পাজল (Sentence Builder)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">এলোমেলো শব্দগুলো সাজিয়ে সঠিক বাক্য তৈরি করো</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSentencePuzzle(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target hint & audio button */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">লক্ষ্য বাক্য অডিও (Target Audio):</span>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 italic">সঠিক ক্রম শুনে শব্দে ক্লিক করো</p>
              </div>
              <button
                type="button"
                onClick={() => handleSpeak(puzzleTargetSentence)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-2xs transition-all active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>বাক্যটি শুনুন</span>
              </button>
            </div>

            {/* Assembled Sentence Area */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 uppercase">তোমার সাজানো বাক্য (শব্দ বাদ দিতে ক্লিক করো):</span>
                {userBuiltWords.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setScrambledWords((prev) => [...prev, ...userBuiltWords]);
                      setUserBuiltWords([]);
                      setPuzzleSolved(false);
                    }}
                    className="text-[11px] text-rose-600 hover:underline font-bold"
                  >
                    রিসেট ↺
                  </button>
                )}
              </div>
              <div className="min-h-[64px] p-3 rounded-2xl bg-amber-50/60 border-2 border-dashed border-amber-300 flex flex-wrap gap-2 items-center">
                {userBuiltWords.length === 0 ? (
                  <span className="text-xs text-amber-800/60 font-medium italic">নিচের শব্দগুলোতে ক্লিক করে এখানে যোগ করো...</span>
                ) : (
                  userBuiltWords.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleRemovePuzzleWord(item)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 shadow-2xs text-slate-900 font-bold text-sm hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 transition-all active:scale-95 flex items-center gap-1"
                      title="মুছে ফেলতে ক্লিক করো"
                    >
                      <span>{item.word}</span>
                      <span className="text-xs text-slate-400 font-normal">✕</span>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Scrambled Word Bank */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600 uppercase">শব্দ ভাণ্ডার (ক্লিক করে বাক্যে বসাও):</span>
              <div className="flex flex-wrap gap-2 min-h-[48px] p-2 bg-slate-50 rounded-2xl border border-slate-200">
                {scrambledWords.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handlePickPuzzleWord(item)}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-xs hover:from-purple-700 hover:to-indigo-700 active:scale-95 transition-all"
                  >
                    {item.word}
                  </button>
                ))}
                {scrambledWords.length === 0 && !puzzleSolved && (
                  <span className="text-xs text-slate-400 italic">সকল শব্দ সাজানো হয়েছে, যাচাই হচ্ছে...</span>
                )}
              </div>
            </div>

            {/* Completion Banner */}
            {puzzleSolved && (
              <div className="p-3.5 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 flex items-center justify-between gap-3 animate-bounce">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎉</span>
                  <div>
                    <p className="font-black text-sm">অসাধারণ! বাক্য গঠন সম্পূর্ণ হয়েছে!</p>
                    <p className="text-xs font-medium text-emerald-700">&quot;{puzzleTargetSentence}&quot;</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playChime("fanfare");
                    confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs"
                >
                  👏 সাবাশ!
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🔍 Syllable Phonics Inspector Modal */}
      {inspectedWord && (
        <div 
          role="dialog" 
          aria-modal="true" 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-3 sm:p-4 animate-fade-in overflow-y-auto"
        >
          <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 max-h-[88vh] overflow-y-auto no-scrollbar my-auto">
            <div className="flex items-center justify-between">
              <span className="text-3xl p-2 bg-emerald-50 rounded-2xl border border-emerald-100">
                {inspectedWord.icon}
              </span>
              <button
                onClick={() => setInspectedWord(null)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {inspectedWord.partOfSpeech}
              </span>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                {inspectedWord.word}
              </h3>
              <p className="text-xs font-mono text-slate-400">{inspectedWord.phonetic}</p>
            </div>

            {/* Syllables Clap Box */}
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2 text-center">
              <p className="text-xs font-bold text-purple-900 uppercase">সিলেবল ভাঙন (ক্লিক করে হাততালি ড্রিল করো):</p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {inspectedWord.syllables.map((syl, sIdx) => (
                  <button 
                    key={sIdx}
                    type="button"
                    onClick={() => {
                      playChime("click");
                      handleSpeak(syl);
                    }}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-purple-100 active:scale-95 border-2 border-purple-300 text-purple-950 font-black text-lg shadow-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
                    title={`শুনুন: ${syl}`}
                  >
                    <span>👏</span>
                    <span>{syl}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <strong className="text-xs uppercase text-slate-500 block">বাংলা অর্থ:</strong>
              <p className="text-base font-bold text-slate-800">{inspectedWord.meaning}</p>
            </div>

            <div className="space-y-1">
              <strong className="text-xs uppercase text-slate-500 block">বাক্যে প্রয়োগ (Example Sentence):</strong>
              <p className="text-sm font-semibold text-slate-700 italic bg-slate-50 p-3 rounded-xl border border-slate-200">
                &quot;{inspectedWord.example}&quot;
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold">সিলেবল শোনার গতি:</span>
                <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200">
                  {([0.25, 0.5, 0.7, 0.85] as const).map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => setSpeechSpeed(spd)}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                        speechSpeed === spd
                          ? "bg-purple-600 text-white shadow-2xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {spd === 0.25 ? "🐢 ০.২৫x" : spd === 0.5 ? "০.৫x" : spd === 0.7 ? "০.৭x" : "স্বাভাবিক"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 w-full">
                <button
                  type="button"
                  onClick={() => handleSpeak(inspectedWord.word, "bd")}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
                  title="সহজ ও স্পষ্ট বাংলাদেশি ক্লাসরুম উচ্চারণ"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>🇧🇩 দেশীয় উচ্চারণ</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSpeak(inspectedWord.word, "intl")}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
                  title="আন্তর্জাতিক ব্রিটিশ/আমেরিকান এক্সেন্ট"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>🌐 আন্তর্জাতিক এক্সেন্ট</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 📄 1-Click Printable Lesson 1 Practice Worksheet Modal */}
      {showWorksheetModal && (
        <div 
          role="dialog" 
          aria-modal="true" 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-2 sm:p-4 animate-fade-in overflow-y-auto"
        >
          <div className="bg-white rounded-3xl p-4 sm:p-8 max-w-3xl w-full border border-slate-200 shadow-2xl space-y-6 my-auto max-h-[92vh] overflow-y-auto no-scrollbar">
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600 shrink-0" />
                <h3 className="font-black text-sm sm:text-lg text-slate-900 leading-snug">
                  ক্লাসরুম প্র্যাকটিস ওয়ার্কশিট
                </h3>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>প্রিন্ট করুন</span>
                </button>
                <button
                  onClick={() => setShowWorksheetModal(false)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable A4 Paper Layout Preview */}
            <div className="worksheet-print-area p-4 sm:p-8 rounded-2xl border-2 border-slate-300 bg-white space-y-5 text-slate-900 print:border-none print:p-0">
              {/* Paper Top Heading */}
              <div className="text-center border-b-2 border-slate-900 pb-3 space-y-1">
                <h2 className="text-lg sm:text-xl font-black">{activeDeck.worksheetCompanion.schoolHeader}</h2>
                <h3 className="text-sm sm:text-base font-bold text-slate-700">{activeDeck.worksheetCompanion.examTitle}</h3>
                <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs font-semibold pt-1 flex-wrap">
                  <span>শ্রেণি: {activeDeck.worksheetCompanion.classGrade}</span>
                  <span>•</span>
                  <span>বিষয়: {activeDeck.worksheetCompanion.subject}</span>
                  <span>•</span>
                  <span>সময়: {activeDeck.worksheetCompanion.time}</span>
                  <span>•</span>
                  <span>পূর্ণমান: {activeDeck.worksheetCompanion.marks}</span>
                </div>
                <div className="pt-2 flex flex-wrap gap-2 justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 flex-1 min-w-[140px]">
                    <span className="shrink-0 font-bold">শিক্ষার্থীর নাম:</span>
                    <span className="border-b border-dotted border-slate-400 flex-1 min-w-[50px] h-3"></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="shrink-0 font-bold">রোল:</span>
                    <span className="border-b border-dotted border-slate-400 w-10 h-3"></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="shrink-0 font-bold">তারিখ:</span>
                    <span className="border-b border-dotted border-slate-400 w-20 h-3"></span>
                  </div>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-4 text-xs sm:text-sm">
                {activeDeck.worksheetCompanion.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="font-black text-slate-900">{sec.title}</h4>
                    <p className="text-slate-600 font-medium italic">{sec.instruction}</p>

                    {sec.type === "mcq" && (
                      <div className="space-y-2 pl-2">
                        {(sec.content as { q: string; options: string[]; answer?: string }[]).map((q, qIdx: number) => (
                          <div key={qIdx} className="space-y-1">
                            <p className="font-bold">{q.q}</p>
                            <div className="grid grid-cols-2 gap-2 pl-4">
                              {q.options.map((opt: string, oIdx: number) => (
                                <span key={oIdx} className="text-slate-700">▢ {opt}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {sec.type === "matching" && (
                      <div className="grid grid-cols-2 gap-3 pl-2">
                        <div className="space-y-1 font-bold">
                          <p className="underline text-slate-500">Column A</p>
                          {(sec.content as { a: string; b: string }[]).map((m, mIdx: number) => (
                            <p key={mIdx}>{mIdx + 1}. {m.a}</p>
                          ))}
                        </div>
                        <div className="space-y-1 font-bold">
                          <p className="underline text-slate-500">Column B</p>
                          {(sec.content as { a: string; b: string }[]).map((m, mIdx: number) => (
                            <p key={mIdx}>(__) {m.b}</p>
                          ))}
                        </div>
                      </div>
                    )}

                    {sec.type === "punctuation" && (
                      <div className="space-y-1.5 pl-2 font-bold">
                        {(sec.content as string[]).map((line: string, lIdx: number) => (
                          <p key={lIdx}>{line}</p>
                        ))}
                      </div>
                    )}

                    {sec.type === "fillInTheBlanks" && (
                      <div className="space-y-1.5 pl-2 font-bold">
                        {(sec.content as string[]).map((line: string, lIdx: number) => (
                          <p key={lIdx}>{line}</p>
                        ))}
                      </div>
                    )}

                    {sec.type === "drawing" && (
                      <div className="space-y-2 pl-2">
                        <div className="h-28 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 font-medium">
                          (শিক্ষার্থীরা এখানে চিত্র আঁকবে ও লেবেল করবে)
                        </div>
                        {(sec.content as string[]).map((line: string, lIdx: number) => (
                          <p key={lIdx} className="font-semibold text-slate-600">{line}</p>
                        ))}
                      </div>
                    )}

                    {sec.type === "moral" && (
                      <div className="space-y-1 pl-2 font-mono text-slate-600">
                        {(sec.content as string[]).map((line: string, lIdx: number) => (
                          <p key={lIdx}>{line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 📚 Lesson Selector Modal */}
      {isDeckSelectorOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 animate-fade-in"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-scale-up flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-50 via-sky-50 to-emerald-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-2xl bg-purple-600 text-white shadow-md text-xl">📚</span>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-slate-900">
                    মাল্টিমিডিয়া পাঠ ও অধ্যায় নির্বাচন (Lesson Hub)
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">শ্রেণিকক্ষে উপস্থাপনার জন্য এনসিটিবি অনুমোদিত অধ্যায় বেছে নিন</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDeckSelectorOpen(false)}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-500 border border-slate-200 shadow-2xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="p-3.5 sm:p-4 bg-slate-50 border-b border-slate-200 space-y-3 shrink-0">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={modalSearchQuery}
                  onChange={(e) => setModalSearchQuery(e.target.value)}
                  placeholder="পাঠ বা বিষয় খুঁজুন (उदा: Ant, Mita, Jerin, Unit, শ্রেণি)..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 placeholder-slate-400 shadow-2xs"
                />
                {modalSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setModalSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Class Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 text-xs font-bold">
                {[
                  { id: "all", label: "সকল পাঠ (৩৭)" },
                  { id: "class3", label: "৩য় শ্রেণি (১৭)" },
                  { id: "class4", label: "৪র্থ শ্রেণি (১০)" },
                  { id: "class5", label: "৫ম শ্রেণি (১০)" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setModalClassFilter(tab.id as any);
                      playChime("click");
                    }}
                    className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                      modalClassFilter === tab.id
                        ? "bg-purple-600 text-white shadow-xs"
                        : "bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Decks List */}
            <div className="p-3 sm:p-5 overflow-y-auto space-y-3 flex-1 scrollbar-thin scrollbar-thumb-purple-200">
              {(() => {
                const allDecks = Object.values(SLIDE_DECKS);
                const filtered = allDecks.filter((deck) => {
                  // Class filter
                  if (modalClassFilter === "class3" && !deck.grade.includes("3") && !deck.grade.includes("৩")) return false;
                  if (modalClassFilter === "class4" && !deck.grade.includes("4") && !deck.grade.includes("৪")) return false;
                  if (modalClassFilter === "class5" && !deck.grade.includes("5") && !deck.grade.includes("৫")) return false;

                  // Search query
                  if (modalSearchQuery.trim()) {
                    const q = modalSearchQuery.toLowerCase();
                    const matchId = deck.id.toLowerCase().includes(q);
                    const matchGrade = deck.grade.toLowerCase().includes(q);
                    const matchUnit = deck.unit.toLowerCase().includes(q);
                    const matchLesson = deck.lesson.toLowerCase().includes(q);
                    const matchTopic = deck.topic.toLowerCase().includes(q);
                    const matchSubtitle = (deck.slides[0]?.subtitle || "").toLowerCase().includes(q);
                    return matchId || matchGrade || matchUnit || matchLesson || matchTopic || matchSubtitle;
                  }
                  return true;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="text-center py-12 text-slate-400 space-y-2">
                      <p className="text-2xl">🔍</p>
                      <p className="text-sm font-semibold">কোনো পাঠ পাওয়া যায়নি</p>
                      <button
                        type="button"
                        onClick={() => { setModalSearchQuery(""); setModalClassFilter("all"); }}
                        className="text-xs text-purple-600 hover:underline font-bold"
                      >
                        ফিল্টার রিসেট করুন
                      </button>
                    </div>
                  );
                }

                return filtered.map((deck) => {
                  const isSelected = selectedDeckId === deck.id;
                  const isClass3 = deck.grade.includes("3") || deck.grade.includes("৩");
                  const isClass4 = deck.grade.includes("4") || deck.grade.includes("৪");
                  const badgeColor = isClass3 
                    ? "bg-purple-100 text-purple-800 border-purple-200" 
                    : isClass4 
                    ? "bg-amber-100 text-amber-800 border-amber-200" 
                    : "bg-emerald-100 text-emerald-800 border-emerald-200";

                  return (
                    <div
                      key={deck.id}
                      onClick={() => {
                        stopAllSpeech();
                        setSelectedDeckId(deck.id);
                        setCurrentSlideIndex(0);
                        setIsDeckSelectorOpen(false);
                        setSortedItems({});
                        setPunctuationAnswers({});
                        playChime("fanfare");
                      }}
                      className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                        isSelected
                          ? "border-purple-500 bg-purple-50/70 shadow-md ring-2 ring-purple-300"
                          : "border-slate-200 bg-white hover:border-purple-300 hover:bg-slate-50/80 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <span className="text-2xl sm:text-3xl p-2 rounded-2xl bg-slate-100 border border-slate-200 shrink-0 shadow-2xs">
                            {deck.thumbnailEmoji || "📖"}
                          </span>
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${badgeColor}`}>
                                {deck.grade}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 truncate max-w-[200px]">
                                {deck.unit}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">
                                {deck.slides.length}টি স্লাইড
                              </span>
                            </div>
                            <h4 className="font-black text-sm sm:text-base text-slate-900 truncate">
                              {deck.lesson}
                            </h4>
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                              {deck.topic} {deck.slides[0]?.subtitle ? `— ${deck.slides[0].subtitle}` : ""}
                            </p>
                          </div>
                        </div>

                        {isSelected ? (
                          <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-purple-600 text-white shrink-0 shadow-xs flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">চলমান</span>
                          </span>
                        ) : (
                          <button 
                            type="button"
                            className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-purple-600 hover:text-white transition-all shrink-0"
                          >
                            পাঠ খুলুন ➔
                          </button>
                        )}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
            
            {/* Modal Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <span>যেকোনো পাঠে ক্লিক করলেই স্লাইড স্বয়ংক্রিয়ভাবে লোড হবে</span>
              <button
                type="button"
                onClick={() => setIsDeckSelectorOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-200 text-slate-800 font-bold hover:bg-slate-300 transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
