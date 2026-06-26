import React from 'react';

export default function AddressSkeleton() {
    return (
        <div className="p-4 rounded-xl border border-white/5 bg-zinc-900/50 animate-pulse space-y-4 w-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 w-full">
                    <div className="w-5 h-5 rounded-full bg-white/10 shrink-0"></div>
                    <div className="h-4 bg-white/10 rounded w-1/3"></div>
                    <div className="h-3 bg-white/5 rounded-full w-12 ml-2"></div>
                </div>
                <div className="w-6 h-6 rounded bg-white/10 shrink-0"></div>
            </div>
            <div className="pl-7 space-y-2">
                <div className="h-3 bg-white/10 rounded w-full"></div>
                <div className="h-3 bg-white/10 rounded w-5/6"></div>
                <div className="h-3 bg-white/10 rounded w-1/2 pt-2"></div>
            </div>
        </div>
    );
}
