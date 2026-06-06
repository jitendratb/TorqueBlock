'use client';

import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export default function CategorySearchBar({ searchQuery, setSearchQuery, count }) {
    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
            {/* Search input */}
            <div className="relative w-full sm:max-w-lg group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-orange-500 transition-colors duration-300">
                    <FiSearch size={18} />
                </div>
                <input
                    type="text"
                    placeholder="Search riding styles..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-zinc-900/60 hover:bg-zinc-900 focus:bg-black border border-zinc-800 focus:border-orange-500/50 rounded-2xl text-sm text-white placeholder-zinc-500 outline-none transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] focus:shadow-[0_0_20px_rgba(249,115,22,0.1)]"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-4 flex items-center text-zinc-500 hover:text-white transition-colors"
                        aria-label="Clear search"
                    >
                        <FiX size={16} />
                    </button>
                )}
            </div>

            {/* Live count badge */}
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-zinc-300 self-start sm:self-auto bg-zinc-900/80 border border-zinc-800 rounded-2xl px-5 py-3.5 shadow-sm whitespace-nowrap">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
                </span>
                {count} {count === 1 ? 'Category' : 'Categories'} Available
            </div>
        </div>
    );
}
