/**
 * Mobile-resilient Hybrid Web Speech & Audio Streaming Utility
 * Solves silent Bengali audio on OSs lacking native Bengali TTS (Windows/macOS/iOS)
 * by streaming authentic studio Bengali pronunciation via /api/tts with browser synthesis fallback.
 * Includes sequence tracking, AbortError protection, audio caching, and stuck-state recovery.
 */

import { bgmEngine } from "./audioBgm";

export interface SafeSpeakOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  voice?: "nabanita" | "pradeep" | "ana" | "guy" | string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

let activeAudio: HTMLAudioElement | null = null;
let activeRequestId = 0;
let watchdogTimer: NodeJS.Timeout | null = null;

// In-memory preloaded audio cache for zero-latency seamless line transitions
const preloadedAudioMap = new Map<string, HTMLAudioElement>();

// Persistent browser CacheStorage name for rural / offline resilient classroom playback
const AUDIO_CACHE_NAME = "pp-rhymes-audio-v2";

/**
 * Checks persistent browser CacheStorage first, converts cached response to blob URL,
 * or background-fetches and saves into CacheStorage for offline replay.
 */
async function resolveAudioSource(audioUrl: string): Promise<string> {
  if (typeof window === "undefined" || !("caches" in window)) {
    return audioUrl;
  }

  try {
    const cache = await caches.open(AUDIO_CACHE_NAME);
    const cached = await cache.match(audioUrl);
    if (cached && cached.ok) {
      const blob = await cached.blob();
      return URL.createObjectURL(blob);
    }

    // Background store for future offline instant playback
    fetch(audioUrl)
      .then((res) => {
        if (res.ok) {
          cache.put(audioUrl, res.clone()).catch(() => {});
        }
      })
      .catch(() => {});

    return audioUrl;
  } catch {
    return audioUrl;
  }
}

export function getTtsAudioUrl(text: string, options?: SafeSpeakOptions): string {
  const targetLang = options?.lang || "bn-BD";
  const voiceQuery = options?.voice ? `&voice=${encodeURIComponent(options.voice)}` : "";
  const rateQuery = options?.rate ? `&rate=${encodeURIComponent(options.rate < 0.9 ? "-5%" : "+0%")}` : "";
  const pitchQuery = options?.pitch ? `&pitch=${encodeURIComponent(options.pitch > 1 ? "+3Hz" : "+0Hz")}` : "";
  return `/api/tts?text=${encodeURIComponent(text.trim())}&lang=${encodeURIComponent(targetLang)}${voiceQuery}${rateQuery}${pitchQuery}`;
}

/**
 * Pre-fetches and buffers the next line in the background
 * completely eliminating dead silence between stanzas in rhymes/stories.
 */
export function preloadSpeech(text: string, options?: SafeSpeakOptions) {
  if (typeof window === "undefined" || !text || !text.trim()) return;

  const audioUrl = getTtsAudioUrl(text, options);
  if (preloadedAudioMap.has(audioUrl)) return;

  try {
    const audio = new Audio();
    audio.preload = "auto";
    
    // Resolve via persistent CacheStorage if available
    resolveAudioSource(audioUrl).then((src) => {
      audio.src = src;
      audio.load();
    });

    // Maintain max 10 preloaded lines in memory
    if (preloadedAudioMap.size >= 10) {
      const oldestKey = preloadedAudioMap.keys().next().value;
      if (oldestKey) {
        const oldAudio = preloadedAudioMap.get(oldestKey);
        if (oldAudio) {
          oldAudio.src = "";
          oldAudio.load();
        }
        preloadedAudioMap.delete(oldestKey);
      }
    }
    preloadedAudioMap.set(audioUrl, audio);
  } catch {}
}

export function stopSpeech() {
  activeRequestId++; // Invalidate any ongoing speech callbacks
  if (watchdogTimer) {
    clearTimeout(watchdogTimer);
    watchdogTimer = null;
  }

  try {
    bgmEngine.stopBgm();
  } catch {}

  if (activeAudio) {
    activeAudio.onended = null;
    activeAudio.onerror = null;
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch {}
    activeAudio = null;
  }

  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      if (window.speechSynthesis.speaking || window.speechSynthesis.paused) {
        window.speechSynthesis.cancel();
      }
    } catch {}
  }
}

function fallbackBrowserSynthesis(
  text: string,
  targetLang: string,
  safeRate: number,
  currentReqId: number,
  options?: SafeSpeakOptions
) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    if (activeRequestId === currentReqId) options?.onError?.();
    return;
  }

  try {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices() || [];

    let chosenVoice: SpeechSynthesisVoice | null = null;
    if (targetLang.startsWith("bn")) {
      chosenVoice =
        voices.find(
          (v) =>
            v.lang.toLowerCase().includes("bn") ||
            v.lang.toLowerCase().includes("bengali") ||
            v.name.toLowerCase().includes("bangla") ||
            v.name.toLowerCase().includes("bengali")
        ) || null;
    } else {
      chosenVoice =
        voices.find((v) => v.lang.startsWith("en-US") || v.lang.startsWith("en-GB")) ||
        voices.find((v) => v.lang.startsWith("en")) ||
        null;
    }

    if (chosenVoice) {
      utterance.voice = chosenVoice;
      utterance.lang = chosenVoice.lang;
    } else {
      utterance.lang = targetLang;
    }

    utterance.rate = safeRate;
    if (options?.pitch) utterance.pitch = options.pitch;

    utterance.onstart = () => {
      if (activeRequestId === currentReqId) {
        options?.onStart?.();
      }
    };

    utterance.onend = () => {
      if (activeRequestId === currentReqId) {
        options?.onEnd?.();
      }
    };

    utterance.onerror = () => {
      if (activeRequestId === currentReqId) {
        options?.onError?.();
      }
    };

    window.speechSynthesis.speak(utterance);
  } catch {
    if (activeRequestId === currentReqId) {
      options?.onError?.();
    }
  }
}

export function safeSpeak(text: string, options?: SafeSpeakOptions) {
  if (typeof window === "undefined" || !text.trim()) return;

  const targetLang = options?.lang || "bn-BD";
  const rawRate = options?.rate ?? 0.88;
  const isMobile =
    typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const safeRate = isMobile ? Math.max(0.65, rawRate) : rawRate;

  // Cancel prior audio and advance sequence token
  stopSpeech();
  const currentReqId = activeRequestId;

  // Set adaptive safety watchdog timer to prevent stuck pulsing button state
  const adaptiveTimeout = Math.max(4500, Math.min(14000, text.length * 180));
  watchdogTimer = setTimeout(() => {
    if (activeRequestId === currentReqId) {
      stopSpeech();
      options?.onEnd?.();
    }
  }, adaptiveTimeout);

  const audioUrl = getTtsAudioUrl(text, options);

  // High-fidelity Neural Streaming (for both Bengali and English) with zero-latency preloaded audio
  try {
    let audio: HTMLAudioElement;

    if (preloadedAudioMap.has(audioUrl)) {
      audio = preloadedAudioMap.get(audioUrl)!;
      preloadedAudioMap.delete(audioUrl);
    } else {
      audio = new Audio();
      audio.preload = "auto";
      audio.src = audioUrl;
      resolveAudioSource(audioUrl).then((cachedSrc) => {
        if (cachedSrc !== audioUrl && audio.src === audioUrl) {
          audio.src = cachedSrc;
        }
      });
    }

    activeAudio = audio;
    activeAudio.playbackRate = safeRate;

    activeAudio.onplaying = () => {
      if (activeRequestId === currentReqId) {
        options?.onStart?.();
      }
    };

    activeAudio.onended = () => {
      if (activeRequestId === currentReqId) {
        if (watchdogTimer) clearTimeout(watchdogTimer);
        options?.onEnd?.();
      }
    };

    activeAudio.onerror = () => {
      if (activeRequestId === currentReqId) {
        // Fallback to browser synthesis if audio streaming fails (e.g. offline)
        fallbackBrowserSynthesis(text, targetLang, safeRate, currentReqId, options);
      }
    };

    const playPromise = activeAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Ignore normal AbortError caused by quick user switching
        if (err.name !== "AbortError" && activeRequestId === currentReqId) {
          fallbackBrowserSynthesis(text, targetLang, safeRate, currentReqId, options);
        }
      });
    }
  } catch {
    fallbackBrowserSynthesis(text, targetLang, safeRate, currentReqId, options);
  }
}
