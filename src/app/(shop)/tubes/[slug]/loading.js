import React from 'react';

export default function TubeDetailsLoading() {
    return (
        <div className="animate-pulse ">
            <div className="flex items-center gap-2 pb-4">
                <div className="h-4 w-16 bg-white/10 rounded-md" />
                <span className="text-zinc-600 text-xs">/</span>
                <div className="h-4 w-20 bg-white/10 rounded-md" />
                <span className="text-zinc-600 text-xs">/</span>
                <div className="h-4 w-36 bg-white/10 rounded-md" />
            </div>

            {/* Main Product Skeleton Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left: Gallery Skeleton */}
                <div className="space-y-4">
                    <div className="w-full h-[380px] md:h-[460px] bg-zinc-900/50 border border-white/5 rounded-3xl relative overflow-hidden flex items-center justify-center backdrop-blur-xl">
                        <div className="absolute top-4 right-4 h-6 w-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full" />
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-20 h-20 shrink-0 rounded-2xl bg-zinc-900/50 border border-white/5" />
                        ))}
                    </div>
                </div>

                {/* Right: Details & Buying Skeleton */}
                <div className="space-y-6">
                    {/* Badge & Title */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-24 bg-orange-500/20 rounded-full border border-orange-500/30" />
                            <div className="h-5 w-16 bg-white/10 rounded-full" />
                        </div>
                        <div className="h-8 w-3/4 bg-white/10 rounded-xl" />
                        <div className="h-4 w-1/2 bg-white/5 rounded-lg" />
                    </div>

                    {/* Price Block */}
                    <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl space-y-3">
                        <div className="flex items-baseline gap-3">
                            <div className="h-8 w-32 bg-orange-500/20 rounded-xl" />
                            <div className="h-5 w-20 bg-white/10 rounded-lg" />
                        </div>
                        <div className="h-3 w-40 bg-emerald-500/20 rounded-md" />
                    </div>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                                <div className="h-3 w-16 bg-white/10 rounded" />
                                <div className="h-4 w-24 bg-white/20 rounded-md" />
                            </div>
                        ))}
                    </div>

                    {/* Quantity & CTA Buttons */}
                    <div className="space-y-4 pt-2">
                        <div className="flex gap-4">
                            <div className="h-14 w-32 bg-white/5 border border-white/5 rounded-2xl" />
                            <div className="h-14 flex-1 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded-2xl border border-orange-500/20" />
                        </div>
                        <div className="h-14 w-full bg-white/10 rounded-2xl" />
                    </div>
                </div>
            </div>

            {/* Bottom: Tabs / Description Skeleton */}
            <div className="p-6 md:p-8 rounded-3xl bg-zinc-900/40 border border-white/5 space-y-6">
                <div className="flex gap-6 border-b border-white/5 pb-4">
                    <div className="h-6 w-28 bg-white/10 rounded-lg" />
                    <div className="h-6 w-36 bg-white/5 rounded-lg" />
                </div>
                <div className="space-y-3">
                    <div className="h-4 w-full bg-white/5 rounded-lg" />
                    <div className="h-4 w-5/6 bg-white/5 rounded-lg" />
                    <div className="h-4 w-4/6 bg-white/5 rounded-lg" />
                </div>
            </div>
        </div>
    );
}