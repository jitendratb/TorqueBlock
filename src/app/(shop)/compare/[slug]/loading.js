import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';

export default function CompareDetailsLoading() {
  const breadcrumbItems = [
    { label: 'Compare', href: '/compare' },
    { label: 'Loading Battle...', isLast: true },
  ];

  return (
    <div className="space-y-4 mb-4 animate-fade-in">
      <Breadcrumb items={breadcrumbItems} />

      {/* Main Duel Header Banner Skeleton */}
      <div className="relative rounded-xl md:rounded-[2rem] overflow-hidden border border-zinc-850 bg-zinc-900/30 p-8 flex flex-col items-center gap-6 animate-pulse">
        <div className="h-6 w-32 bg-zinc-800/50 rounded-full" />
        <div className="h-10 w-3/4 bg-zinc-800/50 rounded-xl" />
        
        {/* Symmetrical Twin Images Skeletons */}
        <div className="flex items-end justify-between w-full max-w-4xl px-8 mt-6">
          <div className="h-32 w-32 bg-zinc-800/30 rounded-2xl" />
          <div className="w-12 h-12 rounded-full bg-zinc-950 flex items-center justify-center shrink-0">
            <span className="text-zinc-700 text-xs font-black">VS</span>
          </div>
          <div className="h-32 w-32 bg-zinc-800/30 rounded-2xl" />
        </div>
      </div>

      {/* Performance Metrics Table Skeleton */}
      <div className="rounded-xl md:rounded-[1.5rem] overflow-hidden border border-zinc-850 bg-zinc-900/30 animate-pulse">
        <div className="grid grid-cols-[2fr_1fr_1fr] bg-zinc-950/80 px-6 py-3 gap-4 border-b border-zinc-800">
          <div className="h-3 w-24 bg-zinc-800/50 rounded-full" />
          <div className="h-3 w-16 bg-zinc-800/50 rounded-full justify-self-center" />
          <div className="h-3 w-16 bg-zinc-800/50 rounded-full justify-self-center" />
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="px-6 py-4 border-b border-zinc-850 grid grid-cols-[2fr_1fr_1fr] items-center gap-4">
            <div className="space-y-2">
              <div className="h-3.5 w-32 bg-zinc-800/60 rounded-full" />
              <div className="flex gap-2 w-full">
                <div className="flex-1 h-1.5 bg-zinc-800 rounded-full" />
                <div className="flex-1 h-1.5 bg-zinc-800 rounded-full" />
              </div>
            </div>
            <div className="h-4 w-8 bg-zinc-800/60 rounded-md justify-self-center" />
            <div className="h-4 w-8 bg-zinc-800/60 rounded-md justify-self-center" />
          </div>
        ))}
      </div>
    </div>
  );
}
