import React from 'react';

export default function CartSummarySkeleton() {
    return (
        <div className="bg-white/10 border border-white/5 rounded-xl p-4 backdrop-blur-xl space-y-4 animate-pulse">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <div className="w-5 h-5 rounded-md bg-white/10"></div>
                <div className="h-4 bg-white/10 rounded w-1/3"></div>
            </div>

            <div className="space-y-3">
                {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="w-16 h-16 rounded-lg bg-white/10 shrink-0"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-3.5 bg-white/10 rounded w-3/4"></div>
                            <div className="h-3 bg-white/10 rounded w-1/2"></div>
                            <div className="h-3 bg-white/10 rounded w-1/4"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 rounded-xl bg-white/10 border border-white/5 space-y-3">
                <div className="flex justify-between items-center">
                    <div className="h-3 bg-white/10 rounded w-16"></div>
                    <div className="h-3 bg-white/10 rounded w-16"></div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="h-3 bg-white/10 rounded w-20"></div>
                    <div className="h-3 bg-white/10 rounded w-12"></div>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-3">
                    <div className="h-4 bg-white/10 rounded w-24"></div>
                    <div className="h-5 bg-white/10 rounded w-20"></div>
                </div>
            </div>
        </div>
    );
}
