"use client";

import { useSyncExternalStore } from "react";

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  prompt: () => Promise<void>;
}

export interface PwaInstallSnapshot {
  isHydrated: boolean;
  isStandalone: boolean;
  canNativePrompt: boolean;
  isIOS: boolean;
}

const SERVER_SNAPSHOT: PwaInstallSnapshot = {
  isHydrated: false,
  isStandalone: false,
  canNativePrompt: false,
  isIOS: false,
};

const listeners = new Set<() => void>();
let deferredPrompt: BeforeInstallPromptEvent | null = null;
let initialized = false;
let swRegistered = false;
let currentSnapshot: PwaInstallSnapshot = SERVER_SNAPSHOT;

function detectStandalone(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const nav = window.navigator as Navigator & { standalone?: boolean };
    return (
      window.matchMedia?.("(display-mode: standalone)").matches === true ||
      nav.standalone === true
    );
  } catch {
    return false;
  }
}

function detectIOS(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const ua = window.navigator.userAgent || "";
    const isClassicIOS = /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);
    const isModernIPad =
      window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1;
    return isClassicIOS || isModernIPad;
  } catch {
    return false;
  }
}

function computeSnapshot(): void {
  const next: PwaInstallSnapshot = {
    isHydrated: true,
    isStandalone: detectStandalone(),
    canNativePrompt: deferredPrompt !== null && !detectStandalone(),
    isIOS: detectIOS(),
  };

  if (
    currentSnapshot.isHydrated === next.isHydrated &&
    currentSnapshot.isStandalone === next.isStandalone &&
    currentSnapshot.canNativePrompt === next.canNativePrompt &&
    currentSnapshot.isIOS === next.isIOS
  ) {
    return;
  }

  currentSnapshot = next;
  listeners.forEach((fn) => fn());
}

function registerServiceWorker(): void {
  if (swRegistered || typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;

  swRegistered = true;
  const doRegister = () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .catch(() => {
        swRegistered = false;
      });
  };

  if (document.readyState === "complete") {
    doRegister();
  } else {
    window.addEventListener("load", doRegister, { once: true });
  }
}

/**
 * Initializes global PWA listeners (`beforeinstallprompt`, `appinstalled`, display-mode)
 * and registers `/sw.js` once per browser session.
 */
export function startPwaMonitoring(): void {
  if (typeof window === "undefined") return;

  registerServiceWorker();

  if (initialized) {
    computeSnapshot();
    return;
  }

  initialized = true;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event as BeforeInstallPromptEvent;
    computeSnapshot();
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    computeSnapshot();
  });

  try {
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    mediaQuery.addEventListener?.("change", computeSnapshot);
  } catch {
    // Ignore matchMedia listener errors on older browsers
  }

  computeSnapshot();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): PwaInstallSnapshot {
  return currentSnapshot;
}

function getServerSnapshot(): PwaInstallSnapshot {
  return SERVER_SNAPSHOT;
}

/**
 * Triggers the native browser PWA installation prompt when available.
 */
export async function promptNativePwaInstall(): Promise<
  "accepted" | "dismissed" | "unavailable"
> {
  const promptEvent = deferredPrompt;
  if (!promptEvent) return "unavailable";

  deferredPrompt = null;
  computeSnapshot();

  try {
    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    return outcome;
  } catch {
    return "dismissed";
  }
}

/**
 * React hook subscribing to live PWA installation capability and standalone state.
 */
export function usePwaInstall(): PwaInstallSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
