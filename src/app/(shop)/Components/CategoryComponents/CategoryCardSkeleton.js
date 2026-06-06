'use client';

import React from 'react';

export default function CategoryCardSkeleton({ featured = false }) {
    return (
        <div
            className={`relative ${featured ? 'md:col-span-2 md:row-span-2 h-[400px] md:h-full' : 'h-[240px] md:h-[280px]'
                } rounded-[2rem] overflow-hidden bg-zinc-900/80 border border-zinc-800 shadow-2xl w-full animate-pulse`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 space-y-3">
                <div className="w-16 h-2.5 bg-zinc-700/60 rounded-full" />
                <div className="w-36 h-8 bg-zinc-700/50 rounded-xl" />
                <div className="w-24 h-2 bg-zinc-800 rounded-full" />
            </div>
        </div>
    );
}
