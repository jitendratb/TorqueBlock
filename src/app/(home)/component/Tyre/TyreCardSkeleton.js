import React from 'react';

function TyreCardSkeleton({ className = "" }) {
  return (
    <div className={`mt-1 relative flex flex-col w-full bg-white/10 [.light-mode_&]:bg-zinc-950/10 backdrop-blur-md border border-white/5 [.light-mode_&]:border-white/30 rounded-3xl overflow-hidden animate-pulse ${className}`}>
        
        <div className="relative w-full h-[180px] flex items-center justify-center p-4 bg-zinc-800/20 [.light-mode_&]:bg-zinc-200/20">
            {/* Image Placeholder */}
            <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-700/50 [.light-mode_&]:bg-zinc-300/50" />
            
            {/* In Stock Pill */}
            <div className="absolute top-4 right-4 h-6 w-16 bg-zinc-700/50 [.light-mode_&]:bg-zinc-300/50 rounded-full" />
        </div>

        <div className="flex flex-col p-4 gap-3 flex-1 justify-between">
            <div className="space-y-3">
                {/* Category */}
                <div className="h-5 w-24 bg-zinc-700/50 [.light-mode_&]:bg-zinc-300/50 rounded-md" />
                
                {/* Title */}
                <div className="space-y-2 pt-1">
                    <div className="h-5 w-full bg-zinc-700/50 [.light-mode_&]:bg-zinc-300/50 rounded-md" />
                    <div className="h-5 w-3/4 bg-zinc-700/50 [.light-mode_&]:bg-zinc-300/50 rounded-md" />
                </div>
            </div>

            <div className="flex items-end justify-between gap-2 pt-3 border-t border-white/10 mt-2">
                <div className="flex flex-col gap-1.5 w-1/2">
                    {/* Price Label */}
                    <div className="h-3 w-10 bg-zinc-700/50 [.light-mode_&]:bg-zinc-300/50 rounded-md" />
                    {/* Price */}
                    <div className="h-6 w-20 bg-zinc-700/50 [.light-mode_&]:bg-zinc-300/50 rounded-md" />
                </div>

                {/* View Details Button */}
                <div className="w-24 h-8 md:h-9 bg-zinc-700/50 [.light-mode_&]:bg-zinc-300/50 rounded-lg" />
            </div>
        </div>
    </div>
  );
}

export function TyreCardSkeletonGroup({ count = 4 }) {
  return (
    <div className='flex gap-4'>
      {Array.from({ length: count }).map((_, i) => (
        <TyreCardSkeleton key={i} className="w-[280pxx] md:w-[300px]" />
      ))}
    </div>
  );
}

export default TyreCardSkeleton;
