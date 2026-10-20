import React from 'react';


function TestimonialCardSkeleton({ className = '' }) {
    return (
        <div className={`flex flex-col rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4 [.light-mode_&]:border-white/80 [.light-mode_&]:bg-white/40 ${className}`}>
            <div className="flex min-h-5 items-center justify-between gap-3">
                <div className="h-3 w-20 rounded-full bg-amber-400/20" />
                <div className="h-5 w-24 rounded-full bg-white/10 [.light-mode_&]:bg-black/10" />
            </div>

            <div className="mt-3 space-y-2">
                <div className="h-2.5 w-full rounded-full bg-white/10 [.light-mode_&]:bg-black/10" />
                <div className="h-2.5 w-11/12 rounded-full bg-white/10 [.light-mode_&]:bg-black/10" />
                <div className="h-2.5 w-2/3 rounded-full bg-white/10 [.light-mode_&]:bg-black/10" />
            </div>

            <div className="mt-3 flex items-center gap-2.5 border-t border-white/10 pt-3 [.light-mode_&]:border-black/5">
                <div className="h-10 w-10 shrink-0 rounded-full bg-white/10 [.light-mode_&]:bg-black/10" />
                <div className="space-y-1.5">
                    <div className="h-2.5 w-24 rounded-full bg-white/10 [.light-mode_&]:bg-black/10" />
                    <div className="h-2 w-36 rounded-full bg-white/5 [.light-mode_&]:bg-black/5" />
                </div>
            </div>
        </div>
    );
}

export default TestimonialCardSkeleton;
