"use client";

import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { Button, type ButtonSize, type ButtonVariant } from "./Button";

export interface IconButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "aria-label"
  > {
  icon: React.ReactNode;
  ariaLabel: string;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom";
  showTooltip?: boolean;
  variant?: Extract<
    ButtonVariant,
    "secondary" | "tonal" | "ghost" | "primary" | "danger-tonal"
  >;
  size?: ButtonSize;
}

/**
 * Square Soft-Solid 2.0 Icon-only button (36/44/52px) with optional 150ms hover ink tooltip.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      icon,
      ariaLabel,
      tooltip,
      tooltipPosition = "top",
      showTooltip = true,
      variant = "secondary",
      size = "md",
      className,
      title,
      ...rest
    },
    ref
  ) {
    const tooltipText = tooltip ?? ariaLabel;

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        iconOnly
        aria-label={ariaLabel}
        title={showTooltip ? undefined : title ?? ariaLabel}
        data-tooltip={showTooltip ? tooltipText : undefined}
        data-tooltip-pos={showTooltip ? tooltipPosition : undefined}
        className={cn(showTooltip && "pp-icon-tooltip", className)}
        {...rest}
      >
        <span className="inline-flex items-center justify-center" aria-hidden="true">
          {icon}
        </span>
      </Button>
    );
  }
);

export default IconButton;
