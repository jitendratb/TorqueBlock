import React from 'react';

export function CommentCardSkeleton() {
    return (
        <div className="rounded-xl border border-white/5 bg-white/5 p-3.5 animate-pulse h-[100px] flex flex-col justify-between shadow-inner">
            <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-white/10 shrink-0" />
                <div className="flex flex-col gap-1.5 w-full">
                    <div className="h-2.5 w-24 bg-white/10 rounded-full" />
                    <div className="h-2 w-16 bg-white/5 rounded-full" />
                </div>
            </div>
            <div className="flex flex-col gap-1.5 mt-3">
                <div className="h-2 w-full bg-white/10 rounded-full" />
                <div className="h-2 w-3/4 bg-white/5 rounded-full" />
            </div>
        </div>
    );
}

export function ReviewContentSkeleton() {
    return (
        <div className="relative flex flex-col md:flex-row gap-4 border-t border-white/10 pt-4 mt-2 w-full animate-pulse">
            
            <div className="flex flex-col gap-4 md:w-[45%] shrink-0">
                {/* Stats Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-baseline gap-3">
                        <div className="h-10 w-16 bg-white/10 rounded-xl" />
                        <div className="flex flex-col gap-1.5">
                            <div className="h-3 w-20 bg-white/10 rounded-full" />
                            <div className="h-2 w-16 bg-white/5 rounded-full" />
                        </div>
                    </div>
                    <div className="h-6 w-20 bg-white/10 rounded-full" />
                </div>

                {/* Progress Bars */}
                <div className="space-y-3 mt-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="h-2 w-16 bg-white/10 rounded-full shrink-0" />
                            <div className="flex-1 h-1.5 bg-white/5 rounded-full" />
                            <div className="h-2 w-6 bg-white/10 rounded-full shrink-0" />
                        </div>
                    ))}
                </div>

                {/* Write Review Button */}
                <div className="h-10 w-full bg-white/10 rounded-xl mt-4 border border-white/5" />
            </div>

            {/* Dividers */}
            <div className="hidden md:block w-px bg-white/5 shrink-0" />
            <div className="md:hidden h-px w-full bg-white/5" />

            {/* Comments Grid */}
            <div className="flex-1 grid grid-cols-2 gap-2.5 max-h-[270px] overflow-hidden">
                {[1, 2, 3, 4].map(i => (
                    <CommentCardSkeleton key={i} />
                ))}
            </div>
            
        </div>
    );
}
