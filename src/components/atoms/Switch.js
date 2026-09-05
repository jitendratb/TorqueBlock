"use client";

import React from "react";
import clsx from "clsx";

const Switch = ({
  checked = false,
  onChange,
  className = "",
  disabled = false,
  name,
  id,
  ...props
}) => {
  return (
    <label
      htmlFor={id || name}
      className={clsx(
        "relative inline-flex items-center cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <input
        type="checkbox"
        id={id || name}
        name={name}
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <div
        className={clsx(
          "w-9 h-5 bg-white/[0.05] border border-white/10 rounded-full peer-focus:outline-none",
          "peer peer-checked:after:translate-x-full peer-checked:after:border-white",
          "after:content-[''] after:absolute after:top-[2px] after:left-[2px]",
          "after:bg-zinc-300 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all",
          "peer-checked:bg-orange-500/80 peer-checked:border-orange-500 peer-checked:after:bg-white"
        )}
      ></div>
    </label>
  );
};

export default Switch;
