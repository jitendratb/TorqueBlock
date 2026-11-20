import React from 'react';

export default function Loading() {
    return (
        <main className="py-4 relative overflow-hidden min-h-screen">
            {/* Background Glows matching page.js */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 animate-pulse">
                {/* Title Skeleton */}
                <div className="flex flex-col gap-2 mb-8 border-l-2 border-orange-500/40 pl-4">
                    <div className="h-3 w-32 bg-orange-500/20 rounded" />
                    <div className="h-8 w-48 bg-zinc-800 rounded mt-1" />
                </div>

                {/* Main Grid Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-4 items-start">
                    
                    {/* Left Column: Address & Payment */}
                    <div className="space-y-4">
                        {/* Address Box Skeleton */}
                        <div className="bg-white/5 border border-white/5 rounded-3xl p-5 space-y-4 backdrop-blur-xl">
                            <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                <div className="h-4 w-36 bg-zinc-800 rounded" />
                                <div className="h-7 w-28 bg-zinc-800 rounded-xl" />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {/* Address Card 1 */}
                                <div className="border border-white/5 bg-black/20 p-4 rounded-2xl space-y-3">
                                    <div className="flex justify-between items-center">
                                        <div className="h-4 w-24 bg-zinc-800 rounded" />
                                        <div className="h-3.5 w-12 bg-zinc-800 rounded-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-3.5 w-full bg-zinc-800/80 rounded" />
                                        <div className="h-3.5 w-3/4 bg-zinc-800/80 rounded" />
                                    </div>
                                    <div className="h-3 w-28 bg-zinc-800/60 rounded pt-1" />
                                </div>

                                {/* Address Card 2 */}
                                <div className="border border-white/5 bg-black/20 p-4 rounded-2xl space-y-3 opacity-60">
                                    <div className="flex justify-between items-center">
                                        <div className="h-4 w-28 bg-zinc-800 rounded" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-3.5 w-full bg-zinc-800/80 rounded" />
                                        <div className="h-3.5 w-2/3 bg-zinc-800/80 rounded" />
                                    </div>
                                    <div className="h-3 w-28 bg-zinc-800/60 rounded pt-1" />
                                </div>
                            </div>
                        </div>

                        {/* Payment Box Skeleton */}
                        <div className="bg-white/5 border border-white/5 rounded-3xl p-5 space-y-4 backdrop-blur-xl">
                            <div className="border-b border-white/5 pb-3">
                                <div className="h-4 w-40 bg-zinc-800 rounded" />
                            </div>
                            
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-black/20">
                                    <div className="w-5 h-5 rounded-full bg-zinc-800 shrink-0" />
                                    <div className="space-y-1.5 flex-1">
                                        <div className="h-4 w-24 bg-zinc-800 rounded" />
                                        <div className="h-3 w-48 bg-zinc-800/60 rounded" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-black/20 opacity-60">
                                    <div className="w-5 h-5 rounded-full bg-zinc-800 shrink-0" />
                                    <div className="space-y-1.5 flex-1">
                                        <div className="h-4 w-36 bg-zinc-800 rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Cart Summary */}
                    <div className="space-y-4">
                        {/* Cart Summary Card */}
                        <div className="bg-white/5 border border-white/5 rounded-3xl p-5 space-y-4 backdrop-blur-xl">
                            <div className="border-b border-white/5 pb-3">
                                <div className="h-4 w-32 bg-zinc-800 rounded" />
                            </div>
                            
                            {/* Product Item 1 */}
                            <div className="flex items-center gap-3 py-2 border-b border-white/5">
                                <div className="w-14 h-14 rounded-xl bg-zinc-800 shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3.5 w-3/4 bg-zinc-800 rounded" />
                                    <div className="h-3 w-1/2 bg-zinc-800/60 rounded" />
                                </div>
                                <div className="h-4 w-12 bg-zinc-800 rounded self-start" />
                            </div>

                            {/* Product Item 2 */}
                            <div className="flex items-center gap-3 py-2 border-b border-white/5 opacity-80">
                                <div className="w-14 h-14 rounded-xl bg-zinc-800 shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3.5 w-2/3 bg-zinc-800 rounded" />
                                    <div className="h-3 w-1/3 bg-zinc-800/60 rounded" />
                                </div>
                                <div className="h-4 w-12 bg-zinc-800 rounded self-start" />
                            </div>

                            {/* Calculation Rows */}
                            <div className="space-y-2.5 pt-2">
                                <div className="flex justify-between">
                                    <div className="h-3 w-16 bg-zinc-800/60 rounded" />
                                    <div className="h-3.5 w-16 bg-zinc-800 rounded" />
                                </div>
                                <div className="flex justify-between">
                                    <div className="h-3 w-20 bg-zinc-800/60 rounded" />
                                    <div className="h-3.5 w-16 bg-zinc-800 rounded" />
                                </div>
                                <div className="flex justify-between border-t border-white/5 pt-3">
                                    <div className="h-4 w-20 bg-zinc-800 rounded" />
                                    <div className="h-4 w-24 bg-orange-500/30 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* Order Button Skeleton */}
                        <div className="w-full h-14 rounded-xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/10 flex items-center justify-center">
                            <div className="h-4 w-40 bg-orange-500/30 rounded" />
                        </div>

                        {/* Security Text Skeleton */}
                        <div className="flex justify-center items-center gap-2">
                            <div className="w-3.5 h-3.5 rounded bg-zinc-800" />
                            <div className="h-3 w-48 bg-zinc-800/50 rounded" />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}