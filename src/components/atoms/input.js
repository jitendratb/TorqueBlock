"use client";

import React, { forwardRef } from "react";
import clsx from "clsx";

export const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    variant = "outlined",
    size = "md",
    fullWidth = true,
    leftIcon,
    rightIcon,
    onChange,
    className,
    wrapperClassName,
    id,
    ...props
  },
  ref
) {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  return (
    <div className={clsx("flex flex-col gap-1.5", fullWidth && "w-full")}>
      
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={clsx(
            "font-medium transition-colors duration-300",
            variant === "glass"
              ? "text-xs font-bold uppercase tracking-widest text-gray-200"
              : "text-sm text-gray-700"
          )}
        >
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div
        className={clsx(
          "flex items-center border transition-all duration-300",
          {
            // Outlined / default variants
            "border-gray-300 focus-within:border-gray-500 rounded-lg": variant === "outlined" && !error,
            "bg-gray-100 border-transparent focus-within:border-gray-500 rounded-lg": variant === "filled" && !error,
            "border-red-500 rounded-lg": error && variant !== "glass",
            
            // Glass variant
            "bg-white/[0.02] border-white/10 hover:border-white/20 focus-within:border-orange-500/50 focus-within:ring-1 focus-within:ring-orange-500/50 rounded-xl": variant === "glass" && !error,
            "bg-white/[0.02] border-red-500/30 focus-within:border-red-500/50 focus-within:ring-1 focus-within:ring-red-500/50 rounded-xl": variant === "glass" && error,

            // Sizing
            "px-2.5 py-1.5 text-xs": size === "sm",
            "px-3.5 py-3 text-sm": size === "md",
            "px-4 py-3.5 text-sm": size === "lg",
          },
          wrapperClassName
        )}
      >
        {leftIcon && <span className="flex items-center justify-center text-zinc-400 mr-2 shrink-0">{leftIcon}</span>}

        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          onChange={onChange}
          className={clsx(
            "w-full bg-transparent outline-none text-sm border-none p-0 m-0 focus:ring-0",
            variant === "glass" ? "text-white placeholder-gray-300" : "text-gray-900 placeholder-gray-400",
            className
          )}
          {...props}
        />

        {rightIcon && <span className="flex items-center justify-center text-zinc-400 ml-2 shrink-0">{rightIcon}</span>}
      </div>

      {error ? (
        <p id={errorId} className={clsx("text-xs font-semibold mt-0.5", variant === "glass" ? "text-red-400" : "text-red-500")}>
          {error}
        </p>
      ) : (
        helperText && (
          <p id={helperId} className={clsx("text-xs mt-0.5", variant === "glass" ? "text-zinc-500" : "text-gray-500")}>
            {helperText}
          </p>
        )
      )}
    </div>
  );
});
