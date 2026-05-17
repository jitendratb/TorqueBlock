import React from 'react';

function BrandCardSkeleton() {
  return (
    // <div className="cursor-pointer">
      <div className="relative flex justify-center bg-zinc-800 rounded-xl h-60 min-w-80 overflow-hidden animate-pulse">
        <div className="absolute inset-0 bg-zinc-700/60" />
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
          <div className="h-6 w-28 bg-zinc-600 rounded-md" />
          <div className="h-1 w-12 bg-orange-500/40 rounded-full my-1" />
          <div className="h-3 w-full bg-zinc-600/70 rounded-md" />
          <div className="h-3 w-4/5 bg-zinc-600/50 rounded-md" />
          <div className="h-3 w-2/3 bg-zinc-600/30 rounded-md" />
        </div>
      {/* </div> */}
    </div>
  );
}


export function BrandCardSkeletonGroup({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <BrandCardSkeleton key={i} />
      ))}
    </>
  );
}

export default BrandCardSkeleton;
