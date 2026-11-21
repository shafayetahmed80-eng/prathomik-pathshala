"use client";

import React, { forwardRef } from "react";
import { Pause, Volume2 } from "lucide-react";
import { cn } from "@/utils/cn";

export interface AudioButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  isPlaying: boolean;
  ariaLabel?: string;
  playingAriaLabel?: string;
  size?: "sm" | "md";
  playingMode?: "equalizer" | "pause";
}

/**
 * Circular Soft-Solid 2.0 Audio button (36px or 44px).
 * Idle: tonal green with speaker icon. Playing: Brand Green (#006A4E) with 3 staggered 3px equalizer bars.
 */
export const AudioButton = forwardRef<HTMLButtonElement, AudioButtonProps>(
  function AudioButton(
    {
      isPlaying,
      ariaLabel = "উচ্চারণ শুনুন",
      playingAriaLabel = "শব্দ বাজছে, থামাতে চাপুন",
      size = "md",
      playingMode = "equalizer",
      type = "button",
      className,
      ...rest
    },
    ref
  ) {
    const dimClass = size === "sm" ? "w-9 h-9" : "w-11 h-11";
    const iconClass = size === "sm" ? "w-4 h-4" : "w-[19px] h-[19px]";

    return (
      <button
        ref={ref}
        type={type}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? playingAriaLabel : ariaLabel}
        data-playing={isPlaying ? "true" : "false"}
        className={cn("pp-audio-btn", dimClass, className)}
        {...rest}
      >
        {isPlaying ? (
          playingMode === "pause" ? (
            <Pause className={iconClass} aria-hidden="true" />
          ) : (
            <span className="pp-eq-bars" aria-hidden="true">
              <span className="pp-eq-bar" />
              <span className="pp-eq-bar" />
              <span className="pp-eq-bar" />
            </span>
          )
        ) : (
          <Volume2 className={iconClass} aria-hidden="true" />
        )}
      </button>
    );
  }
);

export default AudioButton;
