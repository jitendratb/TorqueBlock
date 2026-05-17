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
    id,
    ...props
  },
  ref
) {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  return (
    <div className={clsx("flex flex-col gap-1", fullWidth && "w-full")}>
      
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div
        className={clsx(
          "flex items-center border rounded-lg transition",
          {
            "border-gray-300 focus-within:border-gray-500": !error,
            "border-red-500": error,
            "bg-gray-100": variant === "filled",
            "px-2 py-1 text-xs": size === "sm",
            "px-3 py-2 text-sm": size === "md",
            "px-4 py-3 text-sm": size === "lg",
          }
        )}
      >
        {leftIcon && <span className="mr-2">{leftIcon}</span>}

        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          onChange={onChange}
          className={clsx(
            "w-full bg-transparent outline-none text-sm",
            className
          )}
          {...props}
        />

        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </div>

      {error ? (
        <p id={errorId} className="text-xs text-red-500">
          {error}
        </p>
      ) : (
        helperText && (
          <p id={helperId} className="text-xs text-gray-500">
            {helperText}
          </p>
        )
      )}
    </div>
  );
});