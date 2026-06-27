import React from 'react';

export default function TyreCardSkelton({ className = '' }) {
    return (
        <div 
            className={`group mt-1 relative flex flex-col w-full bg-white/5 border border-white/5 rounded-3xl overflow-hidden animate-pulse ${className}`}
        >
            <div className="relative w-full h-45 flex items-center justify-center p-4 bg-zinc-950/20">
                <div className="w-24 h-24 rounded-full bg-white/[0.03] border border-white/[0.05]" />
                
                <div className="absolute top-4 right-4 w-16 h-5 rounded-full bg-white/5 border border-white/10" />
            </div>

            <div className="flex flex-col p-4 gap-3 flex-1 justify-between">
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-16 h-4 bg-white/5 border border-white/10 rounded-md" />
                    </div>

                    <div className="space-y-2">
                        <div className="w-4/5 h-4 bg-white/5 rounded-md" />
                        <div className="w-3/5 h-4 bg-white/5 rounded-md" />
                    </div>
                </div>

                <div className="flex items-end justify-between gap-2 pt-3 border-t border-white/10">
                    <div className="flex flex-col gap-1.5">
                        <div className="w-8 h-2 bg-white/5 rounded" />
                        <div className="w-20 h-5 bg-white/5 rounded-md" />
                    </div>

                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-white/5 border border-white/10" />
                </div>
            </div>
        </div>
    );
}