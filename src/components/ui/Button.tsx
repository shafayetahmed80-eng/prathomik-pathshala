"use client";

import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

export type ButtonVariant =
  | "primary"
  | "ink"
  | "secondary"
  | "tonal"
  | "ghost"
  | "danger"
  | "danger-tonal"
  | "play-marigold"
  | "play-green";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonState = "idle" | "loading" | "success" | "error";

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
  className?: string;
}

const VARIANT_MAP: Record<ButtonVariant, string> = {
  primary: "pp-btn--primary",
  ink: "pp-btn--ink",
  secondary: "pp-btn--secondary",
  tonal: "pp-btn--tonal",
  ghost: "pp-btn--ghost",
  danger: "pp-btn--danger",
  "danger-tonal": "pp-btn--danger-tonal",
  "play-marigold": "pp-btn--play-marigold",
  "play-green": "pp-btn--play-green",
};

const SIZE_MAP: Record<ButtonSize, string> = {
  sm: "pp-btn--sm",
  md: "pp-btn--md",
  lg: "pp-btn--lg",
};

const ICON_SIZE_MAP: Record<ButtonSize, string> = {
  sm: "pp-btn--icon-sm",
  md: "pp-btn--icon-md",
  lg: "pp-btn--icon-lg",
};

/**
 * Generates unified Soft-Solid 2.0 button classes for both `<Button>` and Next.js `<Link>` actions.
 */
export function getButtonClasses({
  variant = "primary",
  size = "md",
  iconOnly = false,
  className,
}: ButtonStyleOptions = {}): string {
  const isPlayVariant = variant === "play-marigold" || variant === "play-green";
  const sizeClass = iconOnly
    ? ICON_SIZE_MAP[size]
    : isPlayVariant
      ? ""
      : SIZE_MAP[size];

  return cn("pp-btn", VARIANT_MAP[variant], sizeClass, className);
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;
  state?: ButtonState;
  loadingLabel?: string;
  successLabel?: string;
}

/**
 * Soft-Solid 2.0 core Button component for Prathomik Pathshala.
 * Supports semantic variants, Bangla optical baseline alignment, and async morph states.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    iconOnly = false,
    state = "idle",
    loadingLabel,
    successLabel,
    type = "button",
    disabled,
    className,
    children,
    ...rest
  },
  ref
) {
  const isLoading = state === "loading";
  const isSuccess = state === "success";
  const isDisabled = Boolean(disabled || isLoading);

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      data-state={state !== "idle" ? state : undefined}
      className={getButtonClasses({ variant, size, iconOnly, className })}
      {...rest}
    >
      {isLoading ? (
        <>
          <span className="pp-spinner" aria-hidden="true" />
          {!iconOnly && <span>{loadingLabel ?? children}</span>}
        </>
      ) : isSuccess ? (
        <>
          <svg
            className="w-4 h-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path className="pp-check-draw" d="M20 6 9 17l-5-5" />
          </svg>
          {!iconOnly && <span>{successLabel ?? children}</span>}
        </>
      ) : (
        <>
          {leftIcon && (
            <span className="inline-flex shrink-0 items-center" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span className="inline-flex shrink-0 items-center" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
});

export default Button;
