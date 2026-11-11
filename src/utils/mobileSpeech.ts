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
  voice?: "nabanita" | "pradeep" | "ana" | "guy" | "neerja" | "prabhat" | string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

let activeAudio: HTMLAudioElement | null = null;
let activeRequestId = 0;
let watchdogTimer: NodeJS.Timeout | null = null;

// Single reusable audio element so chained onended sentences inherit user-tap activation on mobile
let sharedAudio: HTMLAudioElement | null = null;
let audioUnlocked = false;
let sharedAudioCtx: AudioContext | null = null;
const SILENT_WAV_DATA_URI =
  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";

// In-memory preloaded blob/source cache for zero-latency seamless line transitions
const preloadedSrcMap = new Map<string, string>();

// Persistent browser CacheStorage name for rural / offline resilient classroom playback
const AUDIO_CACHE_NAME = "pp-rhymes-audio-v2";

export function isMobileBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  return (
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function getSharedAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined" || typeof Audio === "undefined") return null;
  if (!sharedAudio) {
    sharedAudio = new Audio();
    sharedAudio.preload = "auto";
  }
  return sharedAudio;
}

/**
 * Unlocks Web Audio & HTMLAudioElement playback inside a user tap handler on iOS Safari / Android Chrome
 * so subsequent async sentence chains inside onended are not blocked by autoplay policies.
 */
export function unlockMobileAudio(options?: { primeSilent?: boolean }) {
  if (typeof window === "undefined") return;

  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      if (!sharedAudioCtx) {
        sharedAudioCtx = new AudioCtx();
      }
      if (sharedAudioCtx.state === "suspended") {
        sharedAudioCtx.resume().catch(() => {});
      }
    }
  } catch {}

  const audio = getSharedAudio();
  if (!audio) return;

  if (options?.primeSilent && !audioUnlocked && activeAudio !== audio) {
    try {
      audio.onplaying = null;
      audio.onended = null;
      audio.onerror = null;
      audio.src = SILENT_WAV_DATA_URI;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            audioUnlocked = true;
          })
          .catch(() => {});
      }
    } catch {}
  }
}

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

function getServerRatePercent(speed?: number): number {
  if (speed === undefined || Number.isNaN(speed)) return 0;
  if (speed <= 0.35) return -35;
  if (speed <= 0.55) return -24;
  if (speed <= 0.75) return -12;
  if (speed < 0.92) return -5;
  return 0;
}

export function getTtsAudioUrl(text: string, options?: SafeSpeakOptions): string {
  const targetLang = options?.lang || "bn-BD";
  const voiceQuery = options?.voice ? `&voice=${encodeURIComponent(options.voice)}` : "";
  const ratePct = getServerRatePercent(options?.rate);
  const rateQuery =
    options?.rate !== undefined
      ? `&rate=${encodeURIComponent(`${ratePct >= 0 ? "+" : ""}${ratePct}%`)}`
      : "";
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
  if (preloadedSrcMap.has(audioUrl)) return;

  resolveAudioSource(audioUrl)
    .then((src) => {
      if (preloadedSrcMap.size >= 10) {
        const oldestKey = preloadedSrcMap.keys().next().value;
        if (oldestKey) {
          const oldSrc = preloadedSrcMap.get(oldestKey);
          if (oldSrc && oldSrc.startsWith("blob:") && sharedAudio?.src !== oldSrc) {
            try {
              URL.revokeObjectURL(oldSrc);
            } catch {}
          }
          preloadedSrcMap.delete(oldestKey);
        }
      }
      preloadedSrcMap.set(audioUrl, src);
    })
    .catch(() => {});
}

export function stopSpeech(options?: { preserveBgm?: boolean }) {
  activeRequestId++; // Invalidate any ongoing speech callbacks
  if (watchdogTimer) {
    clearTimeout(watchdogTimer);
    watchdogTimer = null;
  }

  if (!options?.preserveBgm) {
    try {
      bgmEngine.stopBgm();
    } catch {}
  }

  if (activeAudio) {
    activeAudio.onplaying = null;
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
    } else if (targetLang.toLowerCase().includes("in")) {
      chosenVoice =
        voices.find((v) => v.lang.toLowerCase().includes("en-in")) ||
        voices.find((v) => v.lang.startsWith("en-GB") || v.lang.startsWith("en-US")) ||
        voices.find((v) => v.lang.startsWith("en")) ||
        null;
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
  const isMobile = isMobileBrowser();
  const serverPct = getServerRatePercent(options?.rate);
  // Keep mobile client playbackRate at 1.0 (Edge TTS SSML already applies speed natively)
  // to avoid Android/iOS playbackRate codec distortion, buffering stalls, or silence.
  const clientPlaybackRate = isMobile
    ? 1.0
    : rawRate >= 0.92
    ? rawRate
    : Math.max(0.75, Math.min(1.0, rawRate / (1 + serverPct / 100)));
  const fallbackRate = isMobile ? Math.max(0.7, rawRate) : rawRate;

  // Cancel prior spoken audio without killing active poetry BGM, and advance sequence token
  stopSpeech({ preserveBgm: true });
  const currentReqId = activeRequestId;

  // Set adaptive safety watchdog timer scaled by rate, never truncating actively progressing audio
  const rateFactor = rawRate < 0.75 ? 1.6 : 1.1;
  const adaptiveTimeout = Math.max(8000, Math.min(30000, Math.round(text.length * 220 * rateFactor)));
  let watchdogExtensions = 0;

  const scheduleWatchdog = (delayMs: number) => {
    watchdogTimer = setTimeout(() => {
      if (activeRequestId !== currentReqId) return;
      if (
        activeAudio &&
        !activeAudio.paused &&
        !activeAudio.ended &&
        activeAudio.readyState >= 3 &&
        activeAudio.currentTime > 0 &&
        watchdogExtensions < 2
      ) {
        watchdogExtensions++;
        const remainingMs =
          isFinite(activeAudio.duration) && activeAudio.duration > activeAudio.currentTime
            ? Math.ceil(((activeAudio.duration - activeAudio.currentTime) * 1000) / clientPlaybackRate) + 2500
            : 8000;
        scheduleWatchdog(Math.min(20000, remainingMs));
        return;
      }
      stopSpeech({ preserveBgm: true });
      options?.onEnd?.();
    }, delayMs);
  };
  scheduleWatchdog(adaptiveTimeout);

  const audioUrl = getTtsAudioUrl(text, options);

  // High-fidelity Neural Streaming reusing one unlocked HTMLAudioElement across sentence chains
  try {
    const audio = getSharedAudio();
    if (!audio) {
      fallbackBrowserSynthesis(text, targetLang, fallbackRate, currentReqId, options);
      return;
    }

    const preloadedSrc = preloadedSrcMap.get(audioUrl);
    const targetSrc = preloadedSrc || audioUrl;
    if (!preloadedSrc) {
      // Warm persistent CacheStorage in the background without mutating active audio.src mid-playback
      resolveAudioSource(audioUrl)
        .then((cachedSrc) => {
          if (cachedSrc !== audioUrl && !preloadedSrcMap.has(audioUrl)) {
            preloadedSrcMap.set(audioUrl, cachedSrc);
          }
        })
        .catch(() => {});
    }

    audio.onplaying = null;
    audio.onended = null;
    audio.onerror = null;
    audio.src = targetSrc;
    audio.defaultPlaybackRate = clientPlaybackRate;
    audio.playbackRate = clientPlaybackRate;
    activeAudio = audio;

    const triggerFallback = () => {
      if (activeRequestId !== currentReqId) return;
      audio.onplaying = null;
      audio.onended = null;
      audio.onerror = null;
      activeAudio = null;
      fallbackBrowserSynthesis(text, targetLang, fallbackRate, currentReqId, options);
    };

    audio.onplaying = () => {
      if (activeRequestId === currentReqId) {
        audioUnlocked = true;
        options?.onStart?.();
      }
    };

    audio.onended = () => {
      if (activeRequestId === currentReqId) {
        if (watchdogTimer) {
          clearTimeout(watchdogTimer);
          watchdogTimer = null;
        }
        activeAudio = null;
        options?.onEnd?.();
      }
    };

    audio.onerror = () => {
      if (activeRequestId !== currentReqId) return;
      if (audio.src.startsWith("blob:") && preloadedSrcMap.has(audioUrl)) {
        preloadedSrcMap.delete(audioUrl);
        audio.src = audioUrl;
        audio.defaultPlaybackRate = clientPlaybackRate;
        audio.playbackRate = clientPlaybackRate;
        audio.play().catch(triggerFallback);
        return;
      }
      triggerFallback();
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (activeRequestId === currentReqId) {
            audioUnlocked = true;
          }
        })
        .catch((err) => {
          if (err?.name === "NotAllowedError") {
            audioUnlocked = false;
          }
          // Ignore normal AbortError caused by quick user switching
          if (err?.name !== "AbortError") {
            triggerFallback();
          }
        });
    }
  } catch {
    fallbackBrowserSynthesis(text, targetLang, fallbackRate, currentReqId, options);
  }
}
