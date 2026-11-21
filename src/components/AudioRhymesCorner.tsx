"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Play, 
  RotateCcw, 
  Square, 
  Sparkles, 
  Music, 
  Mic, 
  MicOff, 
  Star, 
  CheckCircle2, 
  Smile, 
  Zap, 
  Drama, 
  Radio, 
  Trash2
} from "lucide-react";
import confetti from "canvas-confetti";
import { RHYMES_STORIES_DATA, AudioRhymeStory } from "@/data/rhymesData";
import { safeSpeak, stopSpeech, preloadSpeech } from "@/utils/mobileSpeech";
import { bgmEngine, BgmMood } from "@/utils/audioBgm";
import { studioAcoustics, AcousticPreset } from "@/utils/studioAcoustics";
import { Button, IconButton, SegmentedControl, AudioButton } from "@/components/ui";

// Detect best supported audio mime type for cross-platform MediaRecorder (iOS Safari / Android / PC)
function getSupportedMimeType(): string {
  if (typeof window === "undefined" || typeof MediaRecorder === "undefined") return "";
  const types = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/aac",
    "audio/ogg;codecs=opus",
    "audio/wav",
  ];
  for (const type of types) {
    if (MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  return "";
}

/**
 * 🌟 Phase 2: Calculates phonetic syllable weight for Bengali and English words
 * to keep the bouncing ball and word karaoke in sync with spoken audio.
 */
function getWordPhoneticWeight(word: string, isEnglish: boolean): number {
  const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()"।?!]/g, "").trim();
  if (!cleanWord) return 1.0;

  if (isEnglish) {
    const vowelClusters = cleanWord.match(/[aeiouy]{1,2}/gi);
    const baseCount = vowelClusters ? Math.max(1, vowelClusters.length) : 1;
    const syllableCount =
      cleanWord.length > 3 && cleanWord.endsWith("e") && !cleanWord.endsWith("le")
        ? Math.max(1, baseCount - 1)
        : baseCount;
    return Math.max(1.0, syllableCount * 1.35);
  }

  // Bengali Phonetic Syllable Estimation
  const vowels = cleanWord.match(/[অআইঈউঊঋএঐওঔািীুূৃেৈোৌংঃ]/g);
  const rawVowelCount = vowels ? vowels.length : 0;
  const consonants = cleanWord.match(/[ক-হড়-ঢ়য়]/g);
  const totalConsonants = consonants ? consonants.length : 0;
  const hasantaCount = (cleanWord.match(/্/g) || []).length;
  const effectiveConsonants = Math.max(0, totalConsonants - hasantaCount);

  const estimatedSyllables = Math.max(
    1,
    rawVowelCount > 0 ? rawVowelCount : Math.ceil(effectiveConsonants * 0.8)
  );

  // Extra breathing pause hold time for punctuation
  let punctuationBonus = 0;
  if (/[।?!]/.test(word)) punctuationBonus += 1.4;
  else if (/[,;]/.test(word)) punctuationBonus += 0.8;

  return Math.max(1.0, estimatedSyllables * 1.3 + punctuationBonus);
}

function cleanStringForMatch(str: string): string[] {
  return str
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()"।?!]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * 🌟 Phase 3: Computes word-level overlap and match percentage
 * between the target poem line and what the child recited.
 */
function calculateWordMatchScore(target: string, spoken: string): number {
  const targetWords = cleanStringForMatch(target);
  const spokenWords = cleanStringForMatch(spoken);
  if (targetWords.length === 0 || spokenWords.length === 0) return 0;

  let matched = 0;
  for (const tWord of targetWords) {
    if (
      spokenWords.some(
        (sWord) => sWord === tWord || sWord.includes(tWord) || tWord.includes(sWord)
      )
    ) {
      matched++;
    }
  }

  const score = Math.round((matched / targetWords.length) * 100);
  return Math.min(100, Math.max(0, score));
}

export interface VoicePersonaOption {
  id: string;
  name: string;
  role: string;
  avatar: string;
  sampleText: string;
  lang: string;
}

export const VOICE_PERSONAS: VoicePersonaOption[] = [
  {
    id: "didimoni",
    name: "স্নেহময়ী দিদিমণি",
    role: "মিষ্টি ও মমতাময়ী সুর",
    avatar: "👩‍🏫",
    sampleText: "খোকন খোকন ডাক পাড়ি, খোকন মোদের কার?",
    lang: "bn-BD",
  },
  {
    id: "shikkhok",
    name: "উদাত্ত শিক্ষক",
    role: "স্পষ্ট ও গম্ভীর কণ্ঠ",
    avatar: "👨‍🏫",
    sampleText: "আমাদের দেশ তারে কত ভালোবাসি!",
    lang: "bn-BD",
  },
  {
    id: "khukumoni",
    name: "ছোট্ট খুকুমণি",
    role: "কচি ও চঞ্চল সুর",
    avatar: "👧",
    sampleText: "আতা গাছে তোতা পাখি, ডালিম গাছে মৌ।",
    lang: "bn-BD",
  },
  {
    id: "kishor",
    name: "চঞ্চল কিশোর",
    role: "দ্রুত ও হাসিখুশি তাল",
    avatar: "👦",
    sampleText: "হাট্টিমা টিম টিম, তারা মাঠে পাড়ে ডিম!",
    lang: "bn-BD",
  },
  {
    id: "dadu",
    name: "গল্পের দাদু",
    role: "অভিজ্ঞ ও স্নেহভরা সুর",
    avatar: "👴",
    sampleText: "এক যে ছিল সোনার হরিণ, রূপকথার দেশে...",
    lang: "bn-BD",
  },
  {
    id: "buddy",
    name: "গ্লোবাল বাডি",
    role: "English Phonics Buddy",
    avatar: "🇬🇧",
    sampleText: "Twinkle twinkle little star, how I wonder what you are!",
    lang: "en-US",
  },
];

export interface DuetSpeaker {
  persona: string;
  name: string;
  avatar: string;
  colorClass: string;
}

export function detectDuetSpeaker(
  line: string,
  lineIndex: number,
  basePersona: string,
  title: string
): DuetSpeaker {
  const cleanLine = line.trim();

  // 1. Explicit character dialogue prefixes
  if (/^(মা|আম্মু|জননী)\s*[:—\-]/i.test(cleanLine)) {
    return { persona: "didimoni", name: "স্নেহময়ী মা", avatar: "👩‍🍼", colorClass: "text-rose-600 bg-rose-50 border-rose-200" };
  }
  if (/^(খোকন|খোকা|বাচ্চা|শিশু|মেয়ে|খুকু)\s*[:—\-]/i.test(cleanLine)) {
    return { persona: "khukumoni", name: "ছোট্ট খোকন", avatar: "👶", colorClass: "text-amber-600 bg-amber-50 border-amber-200" };
  }
  if (/^(রাখাল|কিশোর|ছেলে|বালক)\s*[:—\-]/i.test(cleanLine)) {
    return { persona: "kishor", name: "চঞ্চল রাখাল", avatar: "👦", colorClass: "text-blue-600 bg-blue-50 border-blue-200" };
  }
  if (/^(দাদু|নানা|বৃদ্ধ)\s*[:—\-]/i.test(cleanLine)) {
    return { persona: "dadu", name: "গল্পের দাদু", avatar: "👴", colorClass: "text-emerald-700 bg-emerald-50 border-emerald-200" };
  }
  if (/^(শিক্ষক|মাস্টার মশাই|গ্রামবাসী|শিকারি)\s*[:—\-]/i.test(cleanLine)) {
    return { persona: "shikkhok", name: "শিক্ষক মশাই", avatar: "👨‍🏫", colorClass: "text-indigo-600 bg-indigo-50 border-indigo-200" };
  }
  if (/^(বাঘ|সিংহ|শেয়াল|ভাল্লুক)\s*[:—\-]/i.test(cleanLine)) {
    return { persona: "dadu", name: "বনের রাজা", avatar: "🦁", colorClass: "text-orange-700 bg-orange-50 border-orange-200" };
  }
  if (/^(ইঁদুর|বিড়াল|খরগোশ|পাখি|তোতা|দোয়েল)\s*[:—\-]/i.test(cleanLine)) {
    return { persona: "khukumoni", name: "ছোট্ট জীব", avatar: "🐭", colorClass: "text-teal-600 bg-teal-50 border-teal-200" };
  }

  // 2. Specific Antiphonal Poems & Fables by title/content
  if (title.includes("খোকন") || cleanLine.includes("খোকন")) {
    if (lineIndex % 4 === 0) return { persona: "didimoni", name: "স্নেহময়ী মা", avatar: "👩‍🍼", colorClass: "text-rose-600 bg-rose-50 border-rose-200" };
    if (lineIndex % 4 === 1) return { persona: "dadu", name: "গল্পের দাদু", avatar: "👴", colorClass: "text-emerald-700 bg-emerald-50 border-emerald-200" };
    if (lineIndex % 4 === 2) return { persona: "didimoni", name: "স্নেহময়ী মা", avatar: "👩‍🍼", colorClass: "text-rose-600 bg-rose-50 border-rose-200" };
    return { persona: "khukumoni", name: "ছোট্ট খোকন", avatar: "👶", colorClass: "text-amber-600 bg-amber-50 border-amber-200" };
  }

  if (title.includes("কাঠবিড়ালী")) {
    if (lineIndex % 2 === 0) {
      return { persona: "khukumoni", name: "ছোট্ট খুকু", avatar: "👧", colorClass: "text-amber-600 bg-amber-50 border-amber-200" };
    } else {
      return { persona: "didimoni", name: "কাঠবিড়ালী / বউদিদি", avatar: "🐿️", colorClass: "text-orange-600 bg-orange-50 border-orange-200" };
    }
  }

  if (title.includes("রাখাল") || title.includes("বাঘ")) {
    if (cleanLine.includes("বাঘ")) {
      return { persona: "kishor", name: "রাখাল বালক", avatar: "👦", colorClass: "text-blue-600 bg-blue-50 border-blue-200" };
    }
    return { persona: "dadu", name: "গল্পের দাদু", avatar: "👴", colorClass: "text-emerald-700 bg-emerald-50 border-emerald-200" };
  }

  if (title.includes("সিংহ") || title.includes("ইঁদুর")) {
    if (lineIndex % 2 === 0) {
      return { persona: "shikkhok", name: "সিংহ মামা", avatar: "🦁", colorClass: "text-orange-700 bg-orange-50 border-orange-200" };
    } else {
      return { persona: "khukumoni", name: "ছোট্ট ইঁদুর", avatar: "🐭", colorClass: "text-teal-600 bg-teal-50 border-teal-200" };
    }
  }

  // 3. General antiphonal alternating lines (Couplets)
  if (lineIndex % 2 === 1) {
    return {
      persona: basePersona === "khukumoni" ? "didimoni" : "khukumoni",
      name: "সহ-আবৃত্তিকার",
      avatar: "👧",
      colorClass: "text-pink-600 bg-pink-50 border-pink-200",
    };
  }

  // Default to base persona
  return {
    persona: basePersona,
    name: "মূল আবৃত্তিকার",
    avatar: "🎙️",
    colorClass: "text-slate-700 bg-slate-50 border-slate-200",
  };
}

export function hasDialogueLines(item: AudioRhymeStory): boolean {
  if (
    item.title.includes("খোকন") ||
    item.title.includes("কাঠবিড়ালী") ||
    item.title.includes("রাখাল") ||
    item.title.includes("বাঘ") ||
    item.title.includes("সিংহ") ||
    item.title.includes("ইঁদুর")
  ) {
    return true;
  }
  return item.lines.some((line) =>
    /^(মা|আম্মু|খোকন|খোকা|রাখাল|দাদু|শিক্ষক|বাঘ|সিংহ|ইঁদুর|ছেলে)\s*[:—\-]/i.test(line.trim())
  );
}

const GRADE_OPTIONS = [
  { id: "all", label: "সকল শ্রেণি", icon: "🌈" },
  { id: "pre-primary", label: "প্রাক-প্রাথমিক", icon: "🧸" },
  { id: "class-1", label: "১ম শ্রেণি", icon: "🎒" },
  { id: "class-2", label: "২য় শ্রেণি", icon: "✏️" },
  { id: "class-3", label: "৩য় শ্রেণি", icon: "📖" },
  { id: "class-4", label: "৪র্থ শ্রেণি", icon: "🔬" },
  { id: "class-5", label: "৫ম শ্রেণি", icon: "🚀" },
];

const CATEGORY_OPTIONS: { id: string; label: string; icon: string }[] = [
  { id: "all", label: "সব ক্যাটাগরি", icon: "✨" },
  { id: "ছড়া ও কবিতা", label: "বাংলা ছড়া ও কবিতা", icon: "🌸" },
  { id: "English Rhymes", label: "English Rhymes & Fables", icon: "🇬🇧" },
  { id: "শিক্ষণীয় গল্প", label: "শিক্ষণীয় গল্প", icon: "💡" },
];

const SPEED_OPTIONS = [
  { value: 0.75, label: "০.৭৫x", title: "ধীর গতি (Slow)" },
  { value: 1.0, label: "১x", title: "স্বাভাবিক গতি (Normal)" },
  { value: 1.25, label: "১.২৫x", title: "দ্রুত গতি (Fast)" },
];

export default function AudioRhymesCorner() {
  const [selectedClassId, setSelectedClassId] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<AudioRhymeStory>(RHYMES_STORIES_DATA[0]);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(-1);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);

  // Language Detection & Dynamic Voices
  const isEnglishItem = selectedItem.language === "en-US" || selectedItem.category === "English Rhymes";
  const [selectedPersona, setSelectedPersona] = useState<string>("didimoni");
  const [echoPreset, setEchoPreset] = useState<AcousticPreset>("off");
  const [isDuetMode, setIsDuetMode] = useState<boolean>(false);
  const [currentDuetSpeaker, setCurrentDuetSpeaker] = useState<DuetSpeaker | null>(null);
  const [previewingPersona, setPreviewingPersona] = useState<string | null>(null);

  const effectiveVoice = isEnglishItem
    ? selectedPersona === "buddy" || selectedPersona === "ana" || selectedPersona === "guy"
      ? selectedPersona
      : "buddy"
    : selectedPersona;

  const [selectedMood, setSelectedMood] = useState<BgmMood>("melody");
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isBgmEnabled, setIsBgmEnabled] = useState<boolean>(true);

  // 🌟 Feature 3: Listen & Repeat Practice Mode State
  const [isRepeatMode, setIsRepeatMode] = useState<boolean>(false);
  const [repeatPhase, setRepeatPhase] = useState<"idle" | "speaking_system" | "waiting_user" | "user_success">("idle");
  const [completedLineIndices, setCompletedLineIndices] = useState<Set<number>>(new Set());
  const [countdown, setCountdown] = useState<number>(4);

  // Clamped earned stars (strictly bounded by total lines: 0 <= earnedStars <= totalLines)
  const earnedStars = Math.min(selectedItem.lines.length, completedLineIndices.size);

  // 🌟 Phase 3: Speech Recognition States for 'Listen & Repeat'
  const [userTranscript, setUserTranscript] = useState<string>("");
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [isRecognizing, setIsRecognizing] = useState<boolean>(false);
  const [isCompletedPoem, setIsCompletedPoem] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const speechRecognizerRef = useRef<any>(null);

  // 🌟 Feature 4: My Recitation Audio Recorder State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recorderError, setRecorderError] = useState<string | null>(null);

  const speechTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wordPacerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recordStartTimeRef = useRef<number>(0);

  // Stop playback and reset transient states
  const stopAudio = () => {
    stopSpeech();
    bgmEngine.stopBgm();
    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    if (wordPacerRef.current) {
      clearTimeout(wordPacerRef.current);
      wordPacerRef.current = null;
    }
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
      setIsRecording(false);
    }
    if (speechRecognizerRef.current) {
      try {
        speechRecognizerRef.current.abort();
      } catch {}
      speechRecognizerRef.current = null;
    }
    setIsPlaying(false);
    setIsRecognizing(false);
    setCurrentLineIndex(-1);
    setCurrentWordIndex(-1);
    setRepeatPhase("idle");
    setUserTranscript("");
    setMatchScore(null);
    setCurrentDuetSpeaker(null);
    setPreviewingPersona(null);
  };

  const updatePersona = (personaId: string) => {
    setSelectedPersona(personaId);
    try {
      localStorage.setItem("pp_rhyme_persona", personaId);
    } catch {}
  };

  const handleToggleEcho = () => {
    const next = studioAcoustics.toggleEcho();
    setEchoPreset(next);
    try {
      localStorage.setItem("pp_studio_echo", next);
    } catch {}
  };

  const updateDuetMode = (enabled: boolean) => {
    setIsDuetMode(enabled);
    try {
      localStorage.setItem("pp_duet_mode", String(enabled));
    } catch {}
  };

  const updateBgmEnabled = (enabled: boolean) => {
    setIsBgmEnabled(enabled);
    if (!enabled) bgmEngine.stopBgm();
    else if (isPlaying) bgmEngine.startBgm();
    try {
      localStorage.setItem("pp_bgm_enabled", String(enabled));
    } catch {}
  };

  const updatePlaybackSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    try {
      localStorage.setItem("pp_rhyme_speed", String(speed));
    } catch {}
  };

  const handleSelectItem = (item: AudioRhymeStory) => {
    stopAudio();
    setIsCompletedPoem(false);
    setCompletedLineIndices(new Set());
    setRecordedAudioUrl(null);
    setSelectedItem(item);

    const isEng = item.language === "en-US" || item.category === "English Rhymes";
    if (isEng && selectedPersona !== "buddy" && selectedPersona !== "ana" && selectedPersona !== "guy") {
      updatePersona("buddy");
    } else if (!isEng && (selectedPersona === "buddy" || selectedPersona === "ana" || selectedPersona === "guy")) {
      updatePersona("didimoni");
    }

    // ⚡ Pre-buffer first two lines immediately so playback begins with ZERO delay
    if (item.lines.length > 0) {
      const baseVoice = isEng ? "buddy" : selectedPersona;
      const firstDuet = isDuetMode ? detectDuetSpeaker(item.lines[0], 0, baseVoice, item.title) : null;
      const voice = firstDuet ? firstDuet.persona : baseVoice;
      const rate = getEffectiveRate();
      preloadSpeech(item.lines[0], { lang: item.language, rate, voice });
      if (item.lines.length > 1) {
        const secondDuet = isDuetMode ? detectDuetSpeaker(item.lines[1], 1, baseVoice, item.title) : null;
        preloadSpeech(item.lines[1], { lang: item.language, rate, voice: secondDuet ? secondDuet.persona : voice });
      }
    }
  };

  useEffect(() => {
    // Pre-buffer initial rhyme lines on client mount
    if (selectedItem.lines.length > 0) {
      const isEng = selectedItem.language === "en-US" || selectedItem.category === "English Rhymes";
      const voice = isEng ? "buddy" : selectedPersona;
      preloadSpeech(selectedItem.lines[0], { lang: selectedItem.language, rate: 0.85, voice });
    }

    // Load persisted audio studio preferences from localStorage on mount
    try {
      const savedPersona = localStorage.getItem("pp_rhyme_persona");
      const savedEcho = localStorage.getItem("pp_studio_echo");
      const savedDuet = localStorage.getItem("pp_duet_mode");
      const savedBgm = localStorage.getItem("pp_bgm_enabled");
      const savedSpeed = localStorage.getItem("pp_rhyme_speed");

      queueMicrotask(() => {
        if (savedPersona && VOICE_PERSONAS.some((p) => p.id === savedPersona)) {
          setSelectedPersona(savedPersona);
        }
        if (savedEcho === "studio" || savedEcho === "hall" || savedEcho === "off") {
          setEchoPreset(savedEcho);
          studioAcoustics.setPreset(savedEcho);
        }
        if (savedDuet !== null) {
          setIsDuetMode(savedDuet === "true");
        }
        if (savedBgm !== null) {
          setIsBgmEnabled(savedBgm === "true");
        }
        if (savedSpeed) {
          const parsed = parseFloat(savedSpeed);
          if ([0.75, 1.0, 1.25].includes(parsed)) {
            setPlaybackSpeed(parsed);
          }
        }
      });
    } catch {
      // Storage access may be restricted in sandboxed or private contexts
    }

    return () => {
      stopAudio();
      if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePreviewPersona = (personaId: string) => {
    const p = VOICE_PERSONAS.find((item) => item.id === personaId);
    if (!p) return;
    stopAudio();
    setPreviewingPersona(personaId);
    safeSpeak(p.sampleText, {
      lang: p.lang,
      voice: p.id,
      rate: 0.9,
      onEnd: () => setPreviewingPersona(null),
      onError: () => setPreviewingPersona(null),
    });
  };

  // Filtered dataset based on Grade and Category
  const filteredItems = RHYMES_STORIES_DATA.filter((item) => {
    const matchClass = selectedClassId === "all" || item.classId === selectedClassId;
    const matchCat = selectedCategory === "all" || item.category === selectedCategory;
    return matchClass && matchCat;
  });

  const handleClassFilter = (classId: string) => {
    stopAudio();
    setSelectedClassId(classId);
    const nextFiltered = RHYMES_STORIES_DATA.filter((item) => {
      const matchClass = classId === "all" || item.classId === classId;
      const matchCat = selectedCategory === "all" || item.category === selectedCategory;
      return matchClass && matchCat;
    });
    if (nextFiltered.length > 0 && !nextFiltered.some((i) => i.id === selectedItem.id)) {
      setSelectedItem(nextFiltered[0]);
    }
  };

  const handleCategoryFilter = (catId: string) => {
    stopAudio();
    setSelectedCategory(catId);
    const nextFiltered = RHYMES_STORIES_DATA.filter((item) => {
      const matchClass = selectedClassId === "all" || item.classId === selectedClassId;
      const matchCat = catId === "all" || item.category === catId;
      return matchClass && matchCat;
    });
    if (nextFiltered.length > 0 && !nextFiltered.some((i) => i.id === selectedItem.id)) {
      setSelectedItem(nextFiltered[0]);
    }
  };

  // Mood and Speed combined playback rate
  const getEffectiveRate = () => {
    let baseRate = 0.88;
    if (selectedMood === "beat") baseRate = 1.02;
    else if (selectedMood === "drama") baseRate = 0.78;
    return Number((baseRate * playbackSpeed).toFixed(2));
  };

  // 🌟 Phase 2: Syllable-Aware Bouncing Ball Word-by-Word Pacer
  const startWordPacing = (lineText: string, rate: number) => {
    if (wordPacerRef.current) clearTimeout(wordPacerRef.current);
    const words = lineText.split(" ").filter(Boolean);
    if (words.length === 0) return;

    setCurrentWordIndex(0);

    const weights = words.map((w) => getWordPhoneticWeight(w, isEnglishItem));
    const totalWeight = weights.reduce((acc, curr) => acc + curr, 0);
    const estimatedTotalMs = Math.max(1200, (lineText.length * 72) / rate);

    const wordDurations = weights.map((w) =>
      Math.max(260, Math.round((w / totalWeight) * estimatedTotalMs))
    );

    let currentIndex = 0;
    const scheduleNext = () => {
      currentIndex++;
      if (currentIndex < words.length) {
        setCurrentWordIndex(currentIndex);
        wordPacerRef.current = setTimeout(scheduleNext, wordDurations[currentIndex]);
      }
    };

    wordPacerRef.current = setTimeout(scheduleNext, wordDurations[0]);
  };

  const stopSpeechRecognition = () => {
    if (speechRecognizerRef.current) {
      try {
        speechRecognizerRef.current.abort();
      } catch {}
      speechRecognizerRef.current = null;
    }
    setIsRecognizing(false);
  };

  // 🌟 Phase 3: Interactive user completion with speech recognition scoring
  const handleUserFinishedLine = (index: number) => {
    stopSpeechRecognition();
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setRepeatPhase("user_success");
    setCompletedLineIndices((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
    bgmEngine.playCelebrationChime();
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ec4899", "#f59e0b", "#10b981", "#3b82f6"]
    });

    speechTimerRef.current = setTimeout(() => {
      speakLine(index + 1);
    }, 1500);
  };

  const startUserCountdown = (index: number, initialTime = 5) => {
    let timeLeft = initialTime;
    setCountdown(timeLeft);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);

    countdownTimerRef.current = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);
      if (timeLeft <= 0) {
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
        handleUserFinishedLine(index);
      }
    }, 1000);
  };

  // 🌟 Phase 3: Web Speech Recognition Engine
  const startListeningUser = (index: number) => {
    setUserTranscript("");
    setMatchScore(null);
    stopSpeechRecognition();

    const targetLine = selectedItem.lines[index];
    const isEn = selectedItem.language === "en-US" || selectedItem.category === "English Rhymes";

    // Check for browser SpeechRecognition API support
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRec = typeof window !== "undefined" ? ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition) : null;

    if (!SpeechRec) {
      // Clean fallback if browser lacks ASR support
      startUserCountdown(index, 4);
      return;
    }

    try {
      const recognizer = new SpeechRec();
      recognizer.lang = isEn ? "en-US" : "bn-BD";
      recognizer.interimResults = true;
      recognizer.continuous = false;
      recognizer.maxAlternatives = 1;

      recognizer.onstart = () => {
        setIsRecognizing(true);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognizer.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserTranscript(transcript);
        const score = calculateWordMatchScore(targetLine, transcript);
        setMatchScore(score);

        if (score >= 50) {
          // Successful recitation detected
          stopSpeechRecognition();
          handleUserFinishedLine(index);
        }
      };

      recognizer.onerror = () => {
        setIsRecognizing(false);
      };

      recognizer.onend = () => {
        setIsRecognizing(false);
      };

      speechRecognizerRef.current = recognizer;
      recognizer.start();

      startUserCountdown(index, 6);
    } catch {
      startUserCountdown(index, 4);
    }
  };

  const speakLine = (index: number) => {
    if (typeof window === "undefined") return;
    if (index >= selectedItem.lines.length) {
      stopAudio();
      setIsCompletedPoem(true);
      bgmEngine.playCelebrationChime();
      confetti({ particleCount: 160, spread: 90, origin: { y: 0.5 } });
      return;
    }

    setIsCompletedPoem(false);
    setCurrentLineIndex(index);
    const lineText = selectedItem.lines[index];
    const rate = getEffectiveRate();

    // 🎭 Dynamic Duet Speaker determination
    const activeDuet = isDuetMode
      ? detectDuetSpeaker(lineText, index, effectiveVoice, selectedItem.title)
      : null;
    const currentVoice = activeDuet ? activeDuet.persona : effectiveVoice;
    setCurrentDuetSpeaker(activeDuet);

    // ⚡ Pre-buffer next line immediately in background to eliminate dead silence between stanzas
    if (index + 1 < selectedItem.lines.length) {
      const nextLine = selectedItem.lines[index + 1];
      const nextDuet = isDuetMode
        ? detectDuetSpeaker(nextLine, index + 1, effectiveVoice, selectedItem.title)
        : null;
      const nextVoice = nextDuet ? nextDuet.persona : effectiveVoice;
      preloadSpeech(nextLine, {
        lang: selectedItem.language,
        rate,
        voice: nextVoice,
      });
    }

    // BGM handling with auto-ducking during speech
    if (isBgmEnabled) {
      bgmEngine.setMood(selectedMood);
      bgmEngine.startBgm();
      bgmEngine.duckBgm(true);
    }

    if (isRepeatMode) {
      setRepeatPhase("speaking_system");
    }

    safeSpeak(lineText, {
      lang: selectedItem.language,
      rate,
      voice: currentVoice,
      onStart: () => {
        // Start word-by-word bouncing ball animation with syllable-aware pacing exactly when audio starts playing
        startWordPacing(lineText, rate);
      },
      onEnd: () => {
        if (wordPacerRef.current) {
          clearTimeout(wordPacerRef.current);
        }

        // Un-duck BGM during pause
        if (isBgmEnabled) {
          bgmEngine.duckBgm(false);
        }

        if (isRepeatMode) {
          setRepeatPhase("waiting_user");
          startListeningUser(index);
        } else {
          // Because next line is pre-buffered in memory, this 500ms pause is true natural rhythm!
          speechTimerRef.current = setTimeout(() => {
            speakLine(index + 1);
          }, 500);
        }
      },
      onError: () => {
        stopAudio();
      }
    });
  };

  const handlePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      if (isRecording) {
        stopRecording();
      }
      setIsPlaying(true);
      speakLine(0);
    }
  };

  const handleRestart = () => {
    stopAudio();
    setCompletedLineIndices(new Set());
    setTimeout(() => {
      setIsPlaying(true);
      speakLine(0);
    }, 80);
  };

  // MediaRecorder Handlers with cross-platform MIME type detection (iOS Safari / Android / PC)
  const startRecording = async () => {
    try {
      setRecorderError(null);
      stopAudio();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      const mimeType = getSupportedMimeType();
      const options = mimeType ? { mimeType } : undefined;
      const mediaRecorder = new MediaRecorder(stream, options);
      const actualMimeType = mediaRecorder.mimeType || mimeType || "audio/webm";

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: actualMimeType });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      if (recordTimerRef.current) {
        clearInterval(recordTimerRef.current);
        recordTimerRef.current = null;
      }

      mediaRecorderRef.current = mediaRecorder;
      recordStartTimeRef.current = Date.now();
      setRecordingSeconds(0);
      mediaRecorder.start();
      setIsRecording(true);

      recordTimerRef.current = setInterval(() => {
        const elapsed = Math.max(0, Math.floor((Date.now() - recordStartTimeRef.current) / 1000));
        setRecordingSeconds(elapsed);
      }, 1000);
    } catch {
      setRecorderError("মাইক্রোফোন চালু করা যায়নি। ব্রাউজারের অডিও পারমিশন চেক করুন।");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      bgmEngine.playCelebrationChime();
    }
  };

  const itemTypeLabel =
    selectedItem.category === "শিক্ষণীয় গল্প"
      ? "গল্পটি"
      : isEnglishItem
      ? "Rhyme-টি"
      : "ছড়াটি";

  const playButtonLabel = isPlaying
    ? "থামাও"
    : isRepeatMode
    ? "অনুশীলন শুরু করো"
    : selectedItem.category === "শিক্ষণীয় গল্প"
    ? "গল্পটি শোনো"
    : "আবৃত্তি শোনো";

  const currentItemHasDialogue = hasDialogueLines(selectedItem);

  return (
    <article 
      aria-labelledby="audio-corner-heading"
      className="bg-white rounded-3xl p-3.5 sm:p-8 lg:p-10 border border-slate-200 shadow-xl space-y-6 sm:space-y-8 w-full max-w-full overflow-hidden"
    >
      {/* 🌟 Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4 min-w-0 w-full">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div 
            aria-hidden="true" 
            className="w-12 h-12 rounded-2xl bg-[#006A4E] flex items-center justify-center text-white text-2xl shadow-xs shrink-0"
          >
            🌙
          </div>
          <div className="min-w-0 flex-1">
            <h2 id="audio-corner-heading" className="text-lg sm:text-2xl font-bold text-slate-900 leading-snug break-words">
              গল্প ও ছড়ার অডিও কর্নার <span className="hidden sm:inline-block font-semibold text-slate-400 text-sm">(Interactive Poetry Studio)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              প্রাক-প্রাথমিক থেকে ৫ম শ্রেণি: বাউন্সিং বল কারাওকে, নিউরাল আবৃত্তি ও ৩টি ছড়ার মুড
            </p>
          </div>
        </div>

        {/* 🎭 Feature: Poetry Mood Selector (Soft-Solid 2.0 SegmentedControl) */}
        <div className="self-start sm:self-auto">
          <SegmentedControl
            value={selectedMood}
            onChange={(mood) => {
              setSelectedMood(mood);
              bgmEngine.setMood(mood);
            }}
            ariaLabel="ছড়ার মুড নির্বাচন"
            roleMode="radiogroup"
            size="sm"
            options={[
              { value: "melody", label: "মিষ্টি সুর", icon: <Smile className="w-3.5 h-3.5" /> },
              { value: "beat", label: "দ্রুত তাল", icon: <Zap className="w-3.5 h-3.5" /> },
              { value: "drama", label: "নাটকীয়", icon: <Drama className="w-3.5 h-3.5" /> },
            ]}
          />
        </div>
      </div>

      {/* 🏫 Grade Selection Tabs & Category Filters (Soft-Solid 2.0 Segmented Controls) */}
      <div className="space-y-3">
        <SegmentedControl
          value={selectedClassId}
          onChange={handleClassFilter}
          ariaLabel="শ্রেণি নির্বাচন"
          roleMode="tablist"
          size="md"
          options={GRADE_OPTIONS.map((grade) => ({
            value: grade.id,
            label: `${grade.icon} ${grade.label}`,
          }))}
        />

        <SegmentedControl
          value={selectedCategory}
          onChange={handleCategoryFilter}
          ariaLabel="ছড়া ও গল্প ক্যাটাগরি ফিল্টার"
          roleMode="tablist"
          size="sm"
          options={CATEGORY_OPTIONS.map((cat) => ({
            value: cat.id,
            label: `${cat.icon} ${cat.label}`,
          }))}
        />
      </div>

      {/* 🎶 Filtered Rhymes / Stories Carousel Bar */}
      {filteredItems.length > 0 ? (
        <nav aria-label="ছড়া ও গল্প তালিকা" className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
          {filteredItems.map((item) => {
            const isSelected = selectedItem.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectItem(item)}
                aria-pressed={isSelected}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-[14px] border-2 text-xs sm:text-sm font-semibold shrink-0 transition-all cursor-pointer touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006A4E] ${
                  isSelected
                    ? "border-[#006A4E] bg-[#EEF8F3] text-[#00563F] shadow-xs"
                    : "border-[#D5DCE4] bg-white hover:border-[#006A4E]/50 hover:bg-[#F8FAFC] text-slate-800"
                }`}
              >
                <span aria-hidden="true" className="text-lg">{item.icon}</span>
                <div className="text-left">
                  <span className="block leading-tight">{item.title}</span>
                  <span className="text-[10px] text-slate-500 font-normal">{item.gradeName}</span>
                </div>
              </button>
            );
          })}
        </nav>
      ) : (
        <div className="p-6 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2.5">
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            নির্বাচিত শ্রেণি ও ক্যাটাগরিতে কোনো ছড়া বা গল্প পাওয়া যায়নি।
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              handleClassFilter("all");
              handleCategoryFilter("all");
            }}
          >
            সব ফিল্টার রিসেট করুন
          </Button>
        </div>
      )}

      {/* 🎛️ Interactive Classroom Studio Control Ribbon */}
      <div className="bg-[#F8FAFC] p-3 sm:p-4 rounded-2xl border border-slate-200 space-y-3 w-full max-w-full overflow-hidden">
        {/* Row 1: Persona Dropdown & Playback Speed */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 w-full">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label htmlFor="persona-select" className="text-xs font-bold text-slate-700 flex items-center gap-1.5 shrink-0">
              <span>🎤</span>
              <span className="hidden xs:inline">কণ্ঠশিল্পী:</span>
              <span className="xs:hidden">কণ্ঠ:</span>
            </label>
            <div className="relative inline-flex items-center flex-1 sm:flex-initial min-w-0 max-w-[210px] sm:max-w-xs">
              <select
                id="persona-select"
                value={selectedPersona}
                onChange={(e) => {
                  stopAudio();
                  updatePersona(e.target.value);
                }}
                className="w-full appearance-none bg-white text-slate-800 text-xs sm:text-sm font-semibold pl-2.5 pr-7 py-2 rounded-xl border border-[#D5DCE4] hover:border-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#006A4E] cursor-pointer min-h-[38px] truncate"
              >
                {VOICE_PERSONAS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.avatar} {p.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Persona Preview AudioButton */}
            <AudioButton
              isPlaying={previewingPersona !== null}
              onClick={() => handlePreviewPersona(selectedPersona)}
              disabled={previewingPersona !== null}
              size="sm"
              ariaLabel="নির্বাচিত কণ্ঠের নমুনা শুনুন"
              playingAriaLabel="নমুনা বাজছে"
              title="নির্বাচিত কণ্ঠের একটি নমুনা শুনুন"
              className="shrink-0"
            />
          </div>

          {/* ⚡ Playback Speed Selector (০.৭৫x, ১x, ১.২৫x) */}
          <div className="self-start sm:self-auto shrink-0">
            <SegmentedControl
              value={String(playbackSpeed) as "0.75" | "1" | "1.25"}
              onChange={(val) => updatePlaybackSpeed(Number(val))}
              ariaLabel="আবৃত্তির গতি"
              roleMode="radiogroup"
              size="sm"
              options={SPEED_OPTIONS.map((opt) => ({
                value: String(opt.value) as "0.75" | "1" | "1.25",
                label: opt.label,
              }))}
            />
          </div>
        </div>

        {/* Row 2: Studio Audio Effects & Interactive Modes */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-200/60 w-full">
          {/* 🎙️ Studio Echo & Reverb Button */}
          <Button
            variant={echoPreset !== "off" ? "primary" : "secondary"}
            size="sm"
            leftIcon={<Radio className="w-3.5 h-3.5" />}
            onClick={handleToggleEcho}
            aria-pressed={echoPreset !== "off"}
            title="বাটন চেপে স্টুডিও ইকো এফেক্ট অন বা অফ করুন"
          >
            স্টুডিও ইকো:{" "}
            {echoPreset === "off" ? "বন্ধ" : echoPreset === "studio" ? "মিষ্টি স্টুডিও" : "হলরুম"}
          </Button>

          {/* 🎭 Duet Dialogue Mode Toggle */}
          <Button
            variant={isDuetMode ? "primary" : "secondary"}
            size="sm"
            leftIcon={<Drama className="w-3.5 h-3.5" />}
            onClick={() => {
              const next = !isDuetMode;
              updateDuetMode(next);
              if (next) bgmEngine.playCelebrationChime();
            }}
            aria-pressed={isDuetMode}
            title="দ্বৈত কণ্ঠ মোড: চরিত্র ও সংলাপ অনুযায়ী স্বয়ংক্রিয় কণ্ঠ বদল"
          >
            <span>দ্বৈত কণ্ঠ: {isDuetMode ? "চালু" : "বন্ধ"}</span>
            {currentItemHasDialogue && !isDuetMode && (
              <span className="text-[10px] font-bold text-[#3A2300] bg-[#FFB020]/30 px-1.5 py-0.5 rounded-full ml-0.5">
                সংলাপ আছে
              </span>
            )}
          </Button>

          {/* 🎵 BGM Toggle */}
          <Button
            variant={isBgmEnabled ? "tonal" : "secondary"}
            size="sm"
            leftIcon={<Music className="w-3.5 h-3.5" />}
            onClick={() => updateBgmEnabled(!isBgmEnabled)}
            aria-pressed={isBgmEnabled}
            title="আবহসঙ্গীত চালু বা বন্ধ করুন"
          >
            আবহসঙ্গীত: {isBgmEnabled ? "চালু" : "বন্ধ"}
          </Button>

          {/* ✨ Listen & Repeat Mode Toggle */}
          <Button
            variant={isRepeatMode ? "primary" : "secondary"}
            size="sm"
            leftIcon={<Sparkles className="w-3.5 h-3.5" />}
            onClick={() => {
              stopAudio();
              setIsRepeatMode(!isRepeatMode);
            }}
            aria-pressed={isRepeatMode}
            title="শিশুদের জন্য শোনো এবং বলো অনুশীলন মোড"
          >
            শোনো ও বলো: {isRepeatMode ? "চালু" : "বন্ধ"}
          </Button>
        </div>
      </div>

      {/* 🎭 Interactive Karaoke Audio Player Arena */}
      <section 
        aria-label="অডিও প্লেয়ার ও লিরিক্স ডিসপ্লে"
        data-paper-card="true"
        className="max-w-2xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#F8FAFC] text-slate-900 border border-slate-200 shadow-lg space-y-6 text-center relative overflow-hidden transition-colors"
      >
        {/* Story Metadata & Gamified Badge */}
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EEF8F3] text-[#00563F] border border-[#CBE5D8] inline-block">
              {selectedItem.category} • {selectedItem.gradeName}
            </span>
            {isRepeatMode && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FFFBEB] text-[#3A2300] border border-[#FFB020] flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#FFB020] text-[#D98A00]" />
                <span>স্টার: {earnedStars} / {selectedItem.lines.length}</span>
              </span>
            )}
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {selectedItem.title}
          </h3>
          <p className="text-xs text-slate-500 font-semibold">
            রচয়িতা: {selectedItem.author}
          </p>
        </div>

        {/* 🌟 Feature 1: Bouncing Ball Word-by-Word Karaoke Lines Display */}
        <div 
          role="region" 
          aria-live="polite"
          data-paper-inner="true"
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-inner space-y-4 min-h-[200px] flex flex-col justify-center relative z-10 transition-colors"
        >
          {/* 🎭 Live Duet Speaker Indicator */}
          {isDuetMode && currentDuetSpeaker && isPlaying && (
            <div className="flex items-center justify-center mb-1.5">
              <div 
                key={currentDuetSpeaker.name}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border-2 shadow-sm transition-all duration-300 animate-in fade-in zoom-in-90 ${currentDuetSpeaker.colorClass}`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006A4E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006A4E]"></span>
                </span>
                <span className="text-base sm:text-lg">
                  {currentDuetSpeaker.avatar}
                </span>
                <span>
                  {currentDuetSpeaker.name} <span className="font-normal opacity-80 text-[11px] sm:text-xs">আবৃত্তি করছেন...</span>
                </span>
              </div>
            </div>
          )}
          {isDuetMode && !isPlaying && (
            <div className="flex items-center justify-center mb-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-[#00563F] bg-[#EEF8F3] border border-[#CBE5D8]">
                <span>🎭 দ্বৈত কণ্ঠ সক্রিয় (চরিত্র ও সংলাপ অনুযায়ী স্বয়ংক্রিয়ভাবে কণ্ঠ পরিবর্তিত হবে)</span>
              </div>
            </div>
          )}
          {currentItemHasDialogue && !isDuetMode && (
            <div className="flex items-center justify-center mb-1">
              <Button
                variant="tonal"
                size="sm"
                leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                onClick={() => {
                  updateDuetMode(true);
                  bgmEngine.playCelebrationChime();
                }}
                title="দ্বৈত কণ্ঠ মোড চালু করুন"
              >
                এই ছড়ায় একাধিক চরিত্র আছে — দ্বৈত কণ্ঠ চালু করুন
              </Button>
            </div>
          )}
          {selectedItem.lines.map((line, idx) => {
            const isCurrentLine = currentLineIndex === idx;
            const words = line.split(" ").filter(Boolean);

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  stopAudio();
                  speakLine(idx);
                }}
                aria-label={`লাইন ${idx + 1}: ${line} - শুনতে বা অনুশীলন করতে ট্যাপ করুন`}
                aria-current={isCurrentLine ? "true" : undefined}
                className={`w-full text-center transition-all duration-200 py-2.5 px-3 rounded-[14px] cursor-pointer hover:bg-[#EEF8F3]/60 select-none touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006A4E] min-h-[44px] flex items-center justify-center ${
                  isCurrentLine
                    ? "bg-[#EEF8F3] border-2 border-[#006A4E] shadow-xs"
                    : currentLineIndex > idx
                    ? "text-slate-400"
                    : "text-slate-800 border-2 border-transparent"
                }`}
                title="এই লাইনটি শুনতে বা অনুশীলন করতে ক্লিক করুন"
              >
                {isCurrentLine ? (
                  /* Word-by-word active line with Bouncing Ball 🟡 */
                  <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                    {words.map((word, wIdx) => {
                      const isBouncingWord = currentWordIndex === wIdx;
                      return (
                        <span key={wIdx} className="relative inline-block">
                          {isBouncingWord && (
                            <span 
                              className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#FFB020] rounded-full animate-bounce shadow-sm" 
                              aria-hidden="true"
                            />
                          )}
                          <span
                            className={`text-base sm:text-xl transition-all duration-150 px-1.5 py-0.5 rounded-lg ${
                              isBouncingWord
                                ? "text-[#00563F] font-bold bg-[#FFB020]/35"
                                : "text-[#00563F] font-semibold"
                            }`}
                          >
                            {word}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-base sm:text-xl font-semibold">
                    {line}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* 🌟 Phase 3: 'Listen & Repeat' Real Speech Recognition & Interactive Prompt Banner */}
        {isRepeatMode && isPlaying && repeatPhase === "waiting_user" && (
          <div className="bg-[#0F172A] text-white p-4 rounded-2xl shadow-lg animate-fade-in flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                isRecognizing ? "bg-[#C0362C] ring-4 ring-rose-400/30" : "bg-white/15"
              }`}>
                <Mic className={`w-6 h-6 ${isRecognizing ? "text-white" : "text-[#FFB020]"}`} />
              </div>
              <div className="text-left space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm">এবার তোমার পালা! লাইনটি বলো...</h4>
                  {isRecognizing && (
                    <span className="text-[10px] bg-[#C0362C] text-white font-semibold px-2 py-0.5 rounded-full">
                      মাইক শুনছে 🔴
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300">
                  {isRecognizing ? "স্পষ্ট করে লাইনটি আবৃত্তি করো..." : `সময় বাকি: ${countdown} সেকেন্ড`}
                </p>
                {userTranscript && (
                  <p className="text-xs bg-white/10 px-2.5 py-1 rounded-xl text-amber-200 font-semibold border border-white/10 flex items-center gap-1.5 mt-1">
                    <span>তুমি বলেছো:</span>
                    <strong className="text-white">&ldquo;{userTranscript}&rdquo;</strong>
                    {matchScore !== null && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        matchScore >= 50 ? "bg-[#0A8257] text-white" : "bg-[#FFB020] text-[#3A2300]"
                      }`}>
                        {matchScore}% মিল
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="play-marigold"
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
                onClick={() => handleUserFinishedLine(currentLineIndex)}
                title="পরবর্তী লাইনে যেতে ক্লিক করুন"
              >
                আমি বলেছি! 👏
              </Button>
            </div>
          </div>
        )}

        {/* Success Feedback Banner */}
        {isRepeatMode && repeatPhase === "user_success" && (
          <div className="bg-[#0A8257] text-white py-2.5 px-4 rounded-2xl font-bold text-sm shadow-sm pp-pop flex items-center justify-center gap-2 relative z-10">
            <span>🎉 দারুণ আবৃত্তি হয়েছে! স্টার যুক্ত হলো! ⭐</span>
          </div>
        )}

        {/* 🏆 Phase 3: Recitation Completion Fanfare Card */}
        {isCompletedPoem && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#006A4E] text-white shadow-xl space-y-3 pp-pop relative z-10">
            <span className="text-4xl" aria-hidden="true">🏆</span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              অভিনন্দন! তুমি সম্পূর্ণ {itemTypeLabel} সফলভাবে শেষ করেছো!
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium">
              তুমি অর্জন করেছো মোট <strong className="text-white text-base font-bold px-1.5 py-0.5 rounded-md bg-white/15">{earnedStars}</strong>টি স্টার! ⭐
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Button
                variant="play-marigold"
                leftIcon={<RotateCcw className="w-4 h-4" />}
                onClick={handleRestart}
              >
                আবার প্রথম থেকে শুরু করো
              </Button>
            </div>
          </div>
        )}

        {/* Playback Controls Bar (Soft-Solid 2.0 Student Play + Audio Equalizer) */}
        <div className="flex items-center justify-center gap-3 pt-2 relative z-10">
          <IconButton
            icon={<RotateCcw className="w-5 h-5" />}
            ariaLabel="প্রথম থেকে শুরু করুন"
            variant="secondary"
            size="lg"
            onClick={handleRestart}
          />

          <Button
            variant={isPlaying ? "play-marigold" : "play-green"}
            leftIcon={
              isPlaying ? (
                <Square className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current" />
              )
            }
            onClick={handlePlay}
            className="px-7"
          >
            {playButtonLabel}
          </Button>

          <AudioButton
            isPlaying={isPlaying}
            onClick={isPlaying ? stopAudio : handlePlay}
            size="md"
            ariaLabel="আবৃত্তি শুরু করো"
            playingAriaLabel="অডিও থামাও"
          />
        </div>

        {/* 🎙️ Feature 4: My Recitation Audio Recorder Deck */}
        <div className="pt-4 border-t border-slate-200 space-y-3 relative z-10 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-[#006A4E]" />
              <span>আমার কণ্ঠে আবৃত্তি রেকর্ড করো (My Recitation)</span>
            </span>

            {isRecording && (
              <span className="text-xs font-bold text-[#C0362C] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C0362C] animate-ping" />
                রেকর্ডিং চলছে: {recordingSeconds}s
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {!isRecording ? (
              <Button
                variant="danger-tonal"
                size="sm"
                leftIcon={<Mic className="w-4 h-4" />}
                onClick={startRecording}
              >
                নিজের কণ্ঠে রেকর্ড শুরু করো
              </Button>
            ) : (
              <Button
                variant="danger"
                size="sm"
                leftIcon={<MicOff className="w-4 h-4" />}
                onClick={stopRecording}
              >
                রেকর্ডিং থামাও ({recordingSeconds}s)
              </Button>
            )}

            {recordedAudioUrl && !isRecording && (
              <div className="flex items-center gap-2 bg-[#EEF8F3] border border-[#CBE5D8] p-1.5 rounded-xl">
                <audio 
                  src={recordedAudioUrl} 
                  controls 
                  className="h-8 max-w-[210px] sm:max-w-[260px]"
                />
                <IconButton
                  icon={<Trash2 className="w-4 h-4" />}
                  ariaLabel="রেকর্ড মুছে ফেলুন"
                  variant="danger-tonal"
                  size="sm"
                  onClick={() => setRecordedAudioUrl(null)}
                />
              </div>
            )}
          </div>

          {recorderError && (
            <p className="text-[11px] text-[#C0362C] font-semibold">{recorderError}</p>
          )}
        </div>

        {/* Moral Theme Note */}
        <div className="pt-2 text-xs text-slate-600 border-t border-slate-200 font-medium relative z-10 text-center">
          💡 <strong className="text-slate-800">শিখন মূল্যবোধ:</strong> {selectedItem.moralOrTheme}
        </div>
      </section>
    </article>
  );
}
