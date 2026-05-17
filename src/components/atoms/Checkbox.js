"use client";

import React from "react";
import clsx from "clsx";

const Checkbox = ({
  checked = false,
  onChange,
  className = "",
  disabled = false,
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
        border border-zinc-500 bg-black
        transition-all duration-200

        checked:border-white

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
        disabled:opacity-50
        `,
        className
      )}
      {...props}
    />
  );
};

export default Checkbox;