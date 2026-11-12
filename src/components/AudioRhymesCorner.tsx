"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Play, 
  RotateCcw, 
  Volume2, 
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
  Trash2,
  Filter,
  Gauge
} from "lucide-react";
import confetti from "canvas-confetti";
import { RHYMES_STORIES_DATA, AudioRhymeStory } from "@/data/rhymesData";
import { safeSpeak, stopSpeech, preloadSpeech } from "@/utils/mobileSpeech";
import { bgmEngine, BgmMood } from "@/utils/audioBgm";

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
  const [selectedBnVoice, setSelectedBnVoice] = useState<"nabanita" | "pradeep">("nabanita");
  const [selectedEnVoice, setSelectedEnVoice] = useState<"ana" | "guy">("ana");
  const effectiveVoice = isEnglishItem ? selectedEnVoice : selectedBnVoice;

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
  };

  const handleSelectItem = (item: AudioRhymeStory) => {
    stopAudio();
    setIsCompletedPoem(false);
    setCompletedLineIndices(new Set());
    setRecordedAudioUrl(null);
    setSelectedItem(item);

    // ⚡ Pre-buffer first two lines immediately so playback begins with ZERO delay
    if (item.lines.length > 0) {
      const isEng = item.language === "en-US" || item.category === "English Rhymes";
      const voice = isEng ? selectedEnVoice : selectedBnVoice;
      const rate = getEffectiveRate();
      preloadSpeech(item.lines[0], { lang: item.language, rate, voice });
      if (item.lines.length > 1) {
        preloadSpeech(item.lines[1], { lang: item.language, rate, voice });
      }
    }
  };

  useEffect(() => {
    // Pre-buffer initial rhyme lines on client mount
    if (selectedItem.lines.length > 0) {
      const isEng = selectedItem.language === "en-US" || selectedItem.category === "English Rhymes";
      const voice = isEng ? selectedEnVoice : selectedBnVoice;
      preloadSpeech(selectedItem.lines[0], { lang: selectedItem.language, rate: 0.85, voice });
    }
    return () => {
      stopAudio();
      if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    // ⚡ Pre-buffer next line immediately in background to eliminate dead silence between stanzas
    if (index + 1 < selectedItem.lines.length) {
      preloadSpeech(selectedItem.lines[index + 1], {
        lang: selectedItem.language,
        rate,
        voice: effectiveVoice,
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
      voice: effectiveVoice,
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

  return (
    <article 
      aria-labelledby="audio-corner-heading"
      className="bg-white rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200 shadow-xl space-y-6 sm:space-y-8 w-full"
    >
      {/* 🌟 Top Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div className="flex items-center gap-3">
          <div 
            aria-hidden="true" 
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white text-2xl shadow-md shadow-rose-500/20 shrink-0"
          >
            🌙
          </div>
          <div>
            <h3 id="audio-corner-heading" className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              গল্প ও ছড়ার অডিও কর্নার <span className="hidden sm:inline-block font-semibold text-slate-400 text-sm">(Interactive Poetry Studio)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              প্রাক-প্রাথমিক থেকে ৫ম শ্রেণি: বাউন্সিং বল কারাওকে, নিউরাল আবৃত্তি ও ৩টি ছড়ার মুড
            </p>
          </div>
        </div>

        {/* 🎭 Feature: Poetry Mood Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto">
          <span className="text-[11px] font-bold text-slate-500 pl-2 pr-1">মুড:</span>
          <button
            type="button"
            onClick={() => {
              setSelectedMood("melody");
              bgmEngine.setMood("melody");
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              selectedMood === "melody"
                ? "bg-rose-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="মিষ্টি সুরের শান্ত আবৃত্তি"
          >
            <Smile className="w-3.5 h-3.5" />
            <span>মিষ্টি সুর</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedMood("beat");
              bgmEngine.setMood("beat");
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              selectedMood === "beat"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="দ্রুত তালের ছড়া"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>দ্রুত তাল</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedMood("drama");
              bgmEngine.setMood("drama");
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              selectedMood === "drama"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="নাটকীয় ভাবগম্ভীর আবৃত্তি"
          >
            <Drama className="w-3.5 h-3.5" />
            <span>নাটকীয়</span>
          </button>
        </div>
      </header>

      {/* 🏫 Grade Selection Tabs (প্রাক-প্রাথমিক থেকে ৫ম শ্রেণি) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar touch-pan-x">
          {GRADE_OPTIONS.map((grade) => {
            const isSelected = selectedClassId === grade.id;
            return (
              <button
                key={grade.id}
                type="button"
                onClick={() => handleClassFilter(grade.id)}
                aria-pressed={isSelected}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                  isSelected
                    ? "bg-rose-600 text-white border-rose-600 shadow-md scale-102"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                <span>{grade.icon}</span>
                <span>{grade.label}</span>
              </button>
            );
          })}
        </div>

        {/* 🏷️ Category Filter Chips (বাংলা ছড়া, English, শিক্ষণীয় গল্প) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-slate-400 font-bold flex items-center gap-1 shrink-0 pl-1">
            <Filter className="w-3 h-3" /> ফিল্টার:
          </span>
          {CATEGORY_OPTIONS.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryFilter(cat.id)}
                aria-pressed={isSelected}
                className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isSelected
                    ? "bg-amber-500 text-white border-amber-500 shadow-xs scale-102"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span>{cat.icon} </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 text-xs sm:text-sm font-bold shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                  isSelected
                    ? "border-rose-500 bg-rose-50/80 text-rose-950 shadow-md scale-102 ring-2 ring-rose-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                }`}
              >
                <span aria-hidden="true" className="text-lg">{item.icon}</span>
                <div className="text-left">
                  <span className="block leading-tight">{item.title}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{item.gradeName}</span>
                </div>
              </button>
            );
          })}
        </nav>
      ) : (
        <div className="p-6 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            নির্বাচিত শ্রেণি ও ক্যাটাগরিতে কোনো ছড়া বা গল্প পাওয়া যায়নি।
          </p>
          <button
            type="button"
            onClick={() => {
              handleClassFilter("all");
              handleCategoryFilter("all");
            }}
            className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-xs hover:bg-rose-700 transition-colors"
          >
            সব ফিল্টার রিসেট করুন
          </button>
        </div>
      )}

      {/* 🎛️ Interactive Classroom Studio Control Ribbon */}
      <div className="bg-slate-50/90 p-3 sm:p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        {/* Dynamic Voice Selector (Bengali vs English Rhymes) */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
            🎤 কণ্ঠশিল্পী:
          </span>
          {isEnglishItem ? (
            <>
              <button
                type="button"
                onClick={() => setSelectedEnVoice("ana")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedEnVoice === "ana"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
                title="এজ নিউরাল চাইল্ড ভয়েস (Sweet Kids Voice)"
              >
                👧 আনা (মিষ্টি শিশু কণ্ঠ)
              </button>
              <button
                type="button"
                onClick={() => setSelectedEnVoice("guy")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedEnVoice === "guy"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
                title="আমেরিকান স্পষ্ট উচ্চারণ (Clear Voice)"
              >
                👨 গাই (আমেরিকান স্পষ্ট)
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setSelectedBnVoice("nabanita")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedBnVoice === "nabanita"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                👩‍🏫 নবনীতা (মিষ্টি কণ্ঠ)
              </button>
              <button
                type="button"
                onClick={() => setSelectedBnVoice("pradeep")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedBnVoice === "pradeep"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                👨‍🏫 প্রদীপ (উদাত্ত কণ্ঠ)
              </button>
            </>
          )}

          {/* ⚡ Playback Speed Selector (০.৭৫x, ১x, ১.২৫x) */}
          <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200 shadow-2xs ml-1">
            <span className="text-[11px] font-bold text-slate-500 pl-2 pr-1 flex items-center gap-1">
              <Gauge className="w-3 h-3 text-slate-400" /> গতি:
            </span>
            {SPEED_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPlaybackSpeed(opt.value)}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  playbackSpeed === opt.value
                    ? "bg-rose-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
                title={opt.title}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Switches: BGM & Repeat Mode */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* BGM Toggle */}
          <button
            type="button"
            onClick={() => {
              const next = !isBgmEnabled;
              setIsBgmEnabled(next);
              if (!next) bgmEngine.stopBgm();
              else if (isPlaying) bgmEngine.startBgm();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
              isBgmEnabled
                ? "bg-amber-100 border-amber-300 text-amber-900"
                : "bg-white border-slate-200 text-slate-400"
            }`}
            title="আবহসঙ্গীত চালু বা বন্ধ করুন"
          >
            <Music className="w-3.5 h-3.5" />
            <span>আবহসঙ্গীত (BGM): {isBgmEnabled ? "চালু" : "বন্ধ"}</span>
          </button>

          {/* Listen & Repeat Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              stopAudio();
              setIsRepeatMode(!isRepeatMode);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
              isRepeatMode
                ? "bg-purple-600 border-purple-600 text-white shadow-xs animate-pulse"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
            title="শিশুদের জন্য শোনো এবং বলো অনুশীলন মোড"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>শোনো ও বলো: {isRepeatMode ? "চালু ✨" : "বন্ধ"}</span>
          </button>
        </div>
      </div>

      {/* 🎭 Interactive Karaoke Audio Player Arena */}
      <section 
        aria-label="অডিও প্লেয়ার ও লিরিক্স ডিসপ্লে"
        data-paper-card="true"
        className="max-w-2xl mx-auto p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-rose-50/90 via-white to-amber-50/70 text-slate-900 border border-rose-200/80 shadow-xl space-y-6 text-center relative overflow-hidden transition-colors"
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-rose-400/10 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />

        {/* Story Metadata & Gamified Badge */}
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 inline-block shadow-2xs">
              {selectedItem.category} • {selectedItem.gradeName}
            </span>
            {isRepeatMode && (
              <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1 shadow-2xs animate-bounce">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                <span>স্টার: {earnedStars} / {selectedItem.lines.length}</span>
              </span>
            )}
          </div>
          <h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {selectedItem.title}
          </h4>
          <p className="text-xs text-slate-500 font-semibold">
            রচয়িতা: {selectedItem.author}
          </p>
        </div>

        {/* 🌟 Feature 1: Bouncing Ball Word-by-Word Karaoke Lines Display */}
        <div 
          role="region" 
          aria-live="polite"
          data-paper-inner="true"
          className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-rose-100 shadow-inner space-y-4 min-h-[200px] flex flex-col justify-center relative z-10 transition-colors"
        >
          {selectedItem.lines.map((line, idx) => {
            const isCurrentLine = currentLineIndex === idx;
            const words = line.split(" ").filter(Boolean);

            return (
              <div
                key={idx}
                onClick={() => {
                  stopAudio();
                  speakLine(idx);
                }}
                className={`transition-all duration-200 py-1.5 px-3 rounded-2xl cursor-pointer hover:bg-rose-50/70 select-none ${
                  isCurrentLine
                    ? "bg-rose-100/90 border border-rose-300 shadow-xs ring-2 ring-rose-300/40 scale-102"
                    : currentLineIndex > idx
                    ? "text-slate-400 opacity-60"
                    : "text-slate-700"
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
                          {/* Bouncing Ball Indicator */}
                          {isBouncingWord && (
                            <span 
                              className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce shadow-md shadow-amber-500/50" 
                              aria-hidden="true"
                            />
                          )}
                          <span
                            className={`text-base sm:text-xl transition-all duration-150 px-1 py-0.5 rounded-lg ${
                              isBouncingWord
                                ? "text-rose-800 font-black bg-rose-200/90 shadow-2xs scale-105"
                                : "text-rose-900 font-bold"
                            }`}
                          >
                            {word}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  /* Inactive line */
                  <p className="text-base sm:text-xl font-bold">
                    {line}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* 🌟 Phase 3: 'Listen & Repeat' Real Speech Recognition & Interactive Prompt Banner */}
        {isRepeatMode && isPlaying && repeatPhase === "waiting_user" && (
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-600 text-white p-4 rounded-2xl shadow-xl animate-fade-in flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10 border border-purple-400/30">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-md transition-all ${
                isRecognizing ? "bg-rose-500 animate-pulse ring-4 ring-rose-300/40" : "bg-white/20"
              }`}>
                <Mic className={`w-6 h-6 ${isRecognizing ? "text-white" : "text-amber-300"}`} />
              </div>
              <div className="text-left space-y-0.5">
                <div className="flex items-center gap-2">
                  <h5 className="font-black text-sm">এবার তোমার পালা! লাইনটি বলো...</h5>
                  {isRecognizing && (
                    <span className="text-[10px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full animate-pulse">
                      মাইক শুনছে 🔴
                    </span>
                  )}
                </div>
                <p className="text-xs text-purple-200">
                  {isRecognizing ? "স্পষ্ট করে লাইনটি আবৃত্তি করো..." : `সময় বাকি: ${countdown} সেকেন্ড`}
                </p>
                {userTranscript && (
                  <p className="text-xs bg-black/25 px-2.5 py-1 rounded-xl text-amber-200 font-semibold border border-white/10 flex items-center gap-1.5 mt-1">
                    <span>তুমি বলেছো:</span>
                    <strong className="text-white">&ldquo;{userTranscript}&rdquo;</strong>
                    {matchScore !== null && (
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                        matchScore >= 50 ? "bg-emerald-500 text-white" : "bg-amber-500 text-slate-900"
                      }`}>
                        {matchScore}% মিল
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleUserFinishedLine(currentLineIndex)}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                title="পরবর্তী লাইনে যেতে ক্লিক করুন"
              >
                <CheckCircle2 className="w-4 h-4 text-slate-900" />
                <span>আমি বলেছি! 👏</span>
              </button>
            </div>
          </div>
        )}

        {/* Success Feedback Banner */}
        {isRepeatMode && repeatPhase === "user_success" && (
          <div className="bg-emerald-500 text-white py-2.5 px-4 rounded-2xl font-black text-sm shadow-md animate-bounce flex items-center justify-center gap-2 relative z-10">
            <span>🎉 দারুণ আবৃত্তি হয়েছে! স্টার যুক্ত হলো! ⭐</span>
          </div>
        )}

        {/* 🏆 Phase 3: Recitation Completion Fanfare Card */}
        {isCompletedPoem && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-2xl space-y-3 animate-in zoom-in-95 duration-200 relative z-10 border border-amber-300/40">
            <span className="text-4xl" aria-hidden="true">🏆</span>
            <h4 className="text-xl sm:text-2xl font-black tracking-tight">
              অভিনন্দন! তুমি সম্পূর্ণ {itemTypeLabel} সফলভাবে শেষ করেছো!
            </h4>
            <p className="text-xs sm:text-sm text-amber-100 font-medium">
              তুমি অর্জন করেছো মোট <strong className="text-white text-base font-black px-1.5 py-0.5 rounded-md bg-white/20">{earnedStars}</strong>টি স্টার! ⭐
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-black text-xs sm:text-sm shadow-md hover:bg-amber-50 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <RotateCcw className="w-4 h-4 text-rose-600" />
                <span>আবার প্রথম থেকে শুরু করো</span>
              </button>
            </div>
          </div>
        )}

        {/* Playback Controls Bar */}
        <div className="flex items-center justify-center gap-3 pt-2 relative z-10">
          <button
            type="button"
            onClick={handleRestart}
            className="p-3.5 rounded-2xl bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-300 shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            title="প্রথম থেকে শুরু করুন"
            aria-label="প্রথম থেকে শুরু করুন"
          >
            <RotateCcw className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={handlePlay}
            className={`px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
              isPlaying
                ? "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/30 animate-pulse"
                : "bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-rose-500/30"
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-5 h-5 fill-current" aria-hidden="true" />
                <span>থামাও</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" aria-hidden="true" />
                <span>{playButtonLabel}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={stopAudio}
            className="p-3.5 rounded-2xl bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-300 shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            title="বন্ধ করো"
            aria-label="অডিও বন্ধ করো"
          >
            <Volume2 className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* 🎙️ Feature 4: My Recitation Audio Recorder Deck */}
        <div className="pt-4 border-t border-rose-100 space-y-3 relative z-10 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-rose-500" />
              <span>আমার কণ্ঠে আবৃত্তি রেকর্ড করো (My Recitation)</span>
            </span>

            {isRecording && (
              <span className="text-xs font-black text-rose-600 flex items-center gap-1 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                রেকর্ডিং চলছে: {recordingSeconds}s
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {!isRecording ? (
              <button
                type="button"
                onClick={startRecording}
                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center gap-2 transition-all shadow-2xs"
              >
                <Mic className="w-4 h-4 text-rose-600" />
                <span>নিজের কণ্ঠে রেকর্ড শুরু করো</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={stopRecording}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md animate-pulse"
              >
                <MicOff className="w-4 h-4" />
                <span>রেকর্ডিং থামাও ({recordingSeconds}s)</span>
              </button>
            )}

            {recordedAudioUrl && !isRecording && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 p-1.5 rounded-xl">
                <audio 
                  src={recordedAudioUrl} 
                  controls 
                  className="h-8 max-w-[210px] sm:max-w-[260px]"
                />
                <button
                  type="button"
                  onClick={() => setRecordedAudioUrl(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="রেকর্ড মুছে ফেলুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {recorderError && (
            <p className="text-[11px] text-rose-600 font-semibold">{recorderError}</p>
          )}
        </div>

        {/* Moral Theme Note */}
        <footer className="pt-2 text-xs text-slate-600 border-t border-rose-100 font-medium relative z-10 text-center">
          💡 <strong className="text-slate-800">শিখন মূল্যবোধ:</strong> {selectedItem.moralOrTheme}
        </footer>
      </section>
    </article>
  );
}
