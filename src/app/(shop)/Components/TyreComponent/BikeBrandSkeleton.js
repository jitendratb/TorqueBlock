import React from 'react';

export const BikeBrandSkeleton = () => (
    <div className="relative h-[320px] bg-zinc-950/60 border border-white/10 rounded-[2rem] overflow-hidden animate-pulse shadow-xl flex flex-col justify-end p-5">
        {/* Shadow Overlay Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10" />
        
        {/* Content Placeholders */}
        <div className="relative z-20 space-y-3">
            {/* Tag Badge Placeholder */}
            <div className="h-6 w-28 bg-white/10 rounded-full" />
            
            {/* Title Placeholder */}
            <div className="h-7 w-3/4 bg-white/10 rounded-lg" />
            
            {/* Description Line Placeholder */}
            <div className="h-4 w-5/6 bg-white/5 rounded-md" />
        </div>
    </div>
);

export const BikeBrandSkeletonGroup = ({ count = 8 }) => (
    <>
        {Array.from({ length: count }).map((_, i) => (
            <BikeBrandSkeleton key={i} />
        ))}
    </>
);

export default BikeBrandSkeletonGroup;
