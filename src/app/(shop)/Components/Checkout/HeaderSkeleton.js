import React from 'react';

export default function HeaderSkeleton() {
    return (
        <div className="relative z-10 space-y-4 py-4 animate-pulse w-full">
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 shrink-0"></div>
                        <div className="space-y-2">
                            <div className="h-3 bg-white/10 rounded w-28"></div>
                            <div className="h-6 bg-white/10 rounded w-36"></div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3 p-2.5 px-4 rounded-2xl bg-white/[0.02] border border-white/5 self-start lg:self-auto">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-white/10 shrink-0"></div>
                            <div className="h-3 bg-white/10 rounded w-12"></div>
                        </div>
                        <div className="w-5 md:w-8 h-[2px] bg-white/10 rounded-full shrink-0" />
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-white/10 shrink-0"></div>
                            <div className="h-3 bg-white/10 rounded w-14"></div>
                        </div>
                        <div className="w-5 md:w-8 h-[2px] bg-white/10 rounded-full shrink-0" />
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-white/10 shrink-0"></div>
                            <div className="h-3 bg-white/10 rounded w-10"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
