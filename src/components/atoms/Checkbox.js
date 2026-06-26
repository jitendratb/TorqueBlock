"use client";

import React from "react";
import clsx from "clsx";

const Checkbox = ({
  checked = false,
  onChange,
  className = "",
  disabled = false,
  variant = "glass",
  ...props
}) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={clsx(
        `
        peer relative h-4 w-4 cursor-pointer appearance-none rounded
        border transition-all duration-200
        outline-none focus:outline-none

        after:absolute
        after:left-1/2
        after:top-1/2
        after:h-2.5
        after:w-1
        after:-translate-x-1/2
        after:-translate-y-1/2
        after:rotate-45
        after:border-b-2
        after:border-r-2
        after:border-white
        after:content-['']
        after:opacity-0

        checked:after:opacity-100

        disabled:cursor-not-allowed
        disabled:opacity-40
        `,
        variant === "glass" ? `
          bg-white/[0.02] border-white/10 hover:bg-white/[0.06] hover:border-white/20
          checked:bg-orange-500/20 checked:border-orange-500
          checked:shadow-[0_0_8px_rgba(249,115,22,0.35)]
          focus:ring-1 focus:ring-orange-500/30
        ` : `
          bg-black border-zinc-500
          checked:border-white
        `,
        className
      )}
      {...props}
    />
  );
};

export default Checkbox;