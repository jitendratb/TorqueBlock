import React from 'react';

function TyreCardSkeleton() {
  return (
    <div className='min-w-[280px] md:min-w-[320px] w-full flex flex-col bg-zinc-950/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] overflow-hidden shrink-0'>
      <div className='relative h-[240px] w-full overflow-hidden shrink-0 bg-zinc-800/50 animate-pulse'>
        <div className="absolute left-6 top-6 z-20 h-6 w-24 bg-zinc-700/50 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.2)]" />
      </div>

      <div className='p-6 md:p-8 flex flex-col flex-grow justify-between gap-6 z-20 -mt-12'>
        <div className="space-y-3 relative">
          <div className="flex items-center gap-3 mb-1">
            <span className="w-6 h-[2px] bg-zinc-700 rounded-full animate-pulse"></span>
            <span className="w-16 h-2 bg-zinc-700 rounded-full animate-pulse"></span>
          </div>
          <div className="h-6 md:h-8 w-4/5 bg-zinc-700/80 rounded-md animate-pulse" />
          <div className="h-6 md:h-8 w-1/2 bg-zinc-700/80 rounded-md animate-pulse" />
        </div>

        <div className="flex flex-col gap-5 mt-auto">
          <div className="h-12 w-full bg-green-900/30 rounded-[100px] animate-pulse" />
        </div>
      </div>
    </div>
  );
}


export function TyreCardSkeletonGroup({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <TyreCardSkeleton key={i} />
      ))}
    </>
  );
}

export default TyreCardSkeleton;
