"use client";

import React, { useLayoutEffect, useRef } from "react";
import { cn } from "@/utils/cn";

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  shortLabel?: string;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  roleMode?: "tablist" | "radiogroup";
  size?: "sm" | "md";
  fullWidth?: boolean;
  className?: string;
}

/**
 * Soft-Solid 2.0 Pill Segmented Control with a smooth 260ms sliding thumb.
 * Uses direct DOM style sync via ResizeObserver so variable-width Bengali tabs animate cleanly.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  roleMode = "tablist",
  size = "sm",
  fullWidth = false,
  className,
}: SegmentedControlProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLSpanElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hasMeasuredRef = useRef(false);

  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  );

  useLayoutEffect(() => {
    const syncThumb = (instant: boolean) => {
      const thumb = thumbRef.current;
      const activeBtn = itemRefs.current[activeIndex];
      if (!thumb || !activeBtn) return;

      if (instant) {
        thumb.style.transition = "none";
      } else {
        thumb.style.transition = "";
      }

      thumb.style.width = `${activeBtn.offsetWidth}px`;
      thumb.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
      thumb.style.opacity = "1";

      if (instant) {
        // Force layout flush so subsequent selections animate smoothly
        void thumb.offsetWidth;
        thumb.style.transition = "";
      }
    };

    syncThumb(!hasMeasuredRef.current);
    hasMeasuredRef.current = true;

    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => syncThumb(true));
    observer.observe(container);
    itemRefs.current.forEach((btn) => {
      if (btn) observer.observe(btn);
    });

    return () => observer.disconnect();
  }, [activeIndex, options.length, value]);

  const itemRole = roleMode === "tablist" ? "tab" : "radio";
  const heightClass =
    size === "md"
      ? "h-10 px-4 text-sm pt-[1px]"
      : "h-9 px-3 sm:px-3.5 text-xs pt-[1px]";

  return (
    <div
      ref={containerRef}
      role={roleMode}
      aria-label={ariaLabel}
      className={cn(
        "pp-seg overflow-x-auto no-scrollbar max-w-full",
        fullWidth && "w-full flex",
        className
      )}
    >
      <span
        ref={thumbRef}
        aria-hidden="true"
        className="pp-seg-thumb opacity-0"
      />
      {options.map((opt, idx) => {
        const isActive = opt.value === value;
        const ariaState =
          roleMode === "tablist"
            ? { "aria-selected": isActive }
            : { "aria-checked": isActive };

        return (
          <button
            key={opt.value}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            type="button"
            role={itemRole}
            {...ariaState}
            onClick={() => onChange(opt.value)}
            className={cn(
              "pp-seg-item shrink-0 cursor-pointer",
              heightClass,
              fullWidth && "flex-1"
            )}
          >
            {opt.icon && (
              <span className="inline-flex shrink-0 items-center" aria-hidden="true">
                {opt.icon}
              </span>
            )}
            {opt.shortLabel ? (
              <>
                <span className="hidden sm:inline">{opt.label}</span>
                <span className="sm:hidden">{opt.shortLabel}</span>
              </>
            ) : (
              <span>{opt.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
