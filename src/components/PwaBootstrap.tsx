"use client";

import { useEffect } from "react";
import { startPwaMonitoring } from "@/utils/pwaInstall";

/**
 * Registers the PWA Service Worker and global install-prompt listeners once per session.
 */
export default function PwaBootstrap() {
  useEffect(() => {
    startPwaMonitoring();
  }, []);

  return null;
}
