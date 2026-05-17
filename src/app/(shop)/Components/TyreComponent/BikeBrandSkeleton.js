import React from 'react';

export const BikeBrandSkeleton = () => (
    <div className="relative h-64 bg-zinc-900/20 border border-zinc-800/30 rounded-xl overflow-hidden animate-pulse shadow-2xl">
        {/* Shadow Overlay Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-10" />
        
        {/* Content Placeholders */}
        <div className="absolute bottom-8 left-8 z-20 w-full pr-16">
            {/* Brand Name Placeholder */}
            <div className="h-8 w-2/3 bg-zinc-800/50 rounded-lg mb-4" />
            
            {/* Accent Line Placeholder */}
            <div className="h-1 w-12 bg-zinc-800/50 rounded-full mb-6" />
            
            {/* Info Tag Placeholder */}
            <div className="flex items-center gap-2">
                <div className="h-2 w-20 bg-zinc-800/50 rounded-full" />
                <div className="h-3 w-3 bg-zinc-800/50 rounded-full" />
            </div>
        </div>
    </div>
);

export const BikeBrandSkeletonGroup = ({ count = 6 }) => (
    <>
        {Array.from({ length: count }).map((_, i) => (
            <BikeBrandSkeleton key={i} />
        ))}
    </>
);

export default BikeBrandSkeletonGroup;
