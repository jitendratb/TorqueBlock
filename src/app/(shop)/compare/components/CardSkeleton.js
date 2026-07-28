import React from 'react';

export default function CardSkeleton() {
    return (
        <div className="flex flex-col h-[20rem] bg-white/5 border border-zinc-800/60 rounded-2xl overflow-hidden animate-pulse">
            {/* Top Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <div className="h-2 w-16 bg-zinc-800 rounded" />
                <div className="h-4 w-12 bg-zinc-800 rounded-full" />
            </div>
            {/* Mid Grid */}
            <div className="flex-1 grid grid-cols-2 relative px-2 mt-2">
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-r border-zinc-800/40" />
                {/* Left side */}
                <div className="flex flex-col items-center justify-start p-1">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full mb-4" />
                    <div className="h-2 w-12 bg-zinc-800 rounded mb-1.5" />
                    <div className="h-3.5 w-20 bg-zinc-800 rounded mb-3" />
                    <div className="h-4 w-14 bg-zinc-800 rounded" />
                </div>
                {/* Right side */}
                <div className="flex flex-col items-center justify-start p-1">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full mb-4" />
                    <div className="h-2 w-12 bg-zinc-800 rounded mb-1.5" />
                    <div className="h-3.5 w-20 bg-zinc-800 rounded mb-3" />
                    <div className="h-4 w-14 bg-zinc-800 rounded" />
                </div>
            </div>
            {/* Bottom CTA */}
            <div className="mt-auto px-6 py-3 bg-white/5 border-t border-white/10 flex items-center justify-between">
                <div className="h-2.5 w-24 bg-zinc-800 rounded" />
                <div className="h-3 w-3 bg-zinc-800 rounded" />
            </div>
        </div>
    );
}
