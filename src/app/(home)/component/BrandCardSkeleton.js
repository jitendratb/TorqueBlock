import React from 'react';

function BrandCardSkeleton() {
  return (
    <div className="relative flex justify-center bg-zinc-900 rounded-[1.5rem] md:rounded-[2rem] h-[250px] md:h-[220px] lg:h-[240px] w-[280px] md:w-[320px] overflow-hidden animate-pulse border border-zinc-800/50">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-zinc-800/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-center justify-between">
        <div className="w-full">
          <div className="h-2.5 w-20 bg-zinc-800/70 rounded-full mb-2" />
          <div className="flex justify-between items-end w-full gap-4">
            <div className="h-7 w-36 bg-zinc-800 rounded-md" />
            <div className="w-10 h-10 rounded-full bg-zinc-800/80 flex-shrink-0 border border-zinc-700/30" />
          </div>
        </div>
      </div>
    </div>
  );
}


export function BrandCardSkeletonGroup({ count = 3 }) {
  return (
    <div className="w-full mx-auto flex flex-col gap-6 overflow-hidden">
      <div className="mb-10 text-center flex flex-col items-center">
        <div className="h-3 w-48 bg-orange-500/20 rounded-full" />
        <div className="h-10 md:h-12 w-64 md:w-96 bg-zinc-900/50 rounded-lg mt-2" />
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full items-center md:justify-center md:py-6">
        {Array.from({ length: count }).map((_, i) => (
          <BrandCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default BrandCardSkeleton;
