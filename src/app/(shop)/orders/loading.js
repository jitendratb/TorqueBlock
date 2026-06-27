import React from 'react';
import OrderSkeleton from '@/app/(shop)/Components/Orders/OrderSkeleton';

export default function Loading() {
    return (
        <main className="py-4 relative overflow-hidden min-h-screen">
            {/* Background Glows matching page.js */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 animate-pulse space-y-6">
                {/* Title Skeleton */}
                <div className="flex flex-col gap-2 mb-8 border-l-2 border-orange-500/40 pl-4">
                    <span className="h-3 w-28 bg-orange-500/20 rounded" />
                    <h1 className="h-8 w-44 bg-zinc-800 rounded mt-1" />
                </div>

                {/* Stats Grid Skeleton */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4.5 backdrop-blur-xl flex items-center justify-between gap-4">
                            <div className="space-y-2 flex-1">
                                <div className="h-3 w-16 bg-zinc-800 rounded" />
                                <div className="h-6 w-10 bg-zinc-800 rounded" />
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-zinc-800 shrink-0" />
                        </div>
                    ))}
                </div>

                {/* Filters Tab Skeleton */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-xl">
                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-9 w-24 bg-zinc-800 rounded-xl" />
                        ))}
                    </div>
                </div>

                {/* Orders List Skeleton */}
                <OrderSkeleton />
            </div>
        </main>
    );
}