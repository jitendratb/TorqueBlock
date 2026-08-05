"use client";

import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

export default function CompareSearch({
    searchQuery = "",
    onSearchChange,
    onClear,
    loading = false,
    placeholder = "SEARCH...",
    className = "",
}) {
    const handleClear = () => {
        if (onClear) {
            onClear();
        } else if (onSearchChange) {
            onSearchChange({ target: { value: "" } });
        }
    };

    return (
        <div className={`flex justify-end ${className}`}>
            <div className="relative w-full md:max-w-lg group">
                <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    {loading ? (
                        <div className="animate-spin h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full" />
                    ) : (
                        <FiSearch size={20}  />
                    )}
                </div>

                <input
                    type="text"
                    placeholder={placeholder}
                    className="relative w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-white font-bold placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/40 focus:bg-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-500"
                    value={searchQuery}
                    onChange={onSearchChange}
                />

                {searchQuery && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10 text-zinc-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                        title="Clear search"
                        aria-label="Clear search"
                    >
                        <FiX size={18} />
                    </button>
                )}
            </div>
        </div>
    );
}
