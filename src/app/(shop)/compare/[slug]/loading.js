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
      <div className="relative rounded-xl md:rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900/60 p-8 flex flex-col items-center gap-6 animate-pulse">
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

      {/* Descriptions Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-800/50" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-1/2 bg-zinc-800/50 rounded-md" />
                <div className="h-3 w-1/3 bg-zinc-800/30 rounded-md" />
              </div>
            </div>
            <div className="border-t border-white/5 my-2" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-zinc-800/30 rounded-md" />
              <div className="h-3 w-5/6 bg-zinc-800/30 rounded-md" />
              <div className="h-3 w-4/5 bg-zinc-800/30 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Performance Metrics Table Skeleton */}
      <div className="rounded-xl md:rounded-[1.5rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl animate-pulse">
        <div className="grid grid-cols-[3fr_1fr_1fr] md:grid-cols-[2fr_1fr_1fr] bg-white/5 px-6 py-3 gap-4 border-b border-white/10">
          <div className="h-3 w-24 bg-zinc-800/50 rounded-full" />
          <div className="h-3 w-16 bg-zinc-800/50 rounded-full justify-self-center" />
          <div className="h-3 w-16 bg-zinc-800/50 rounded-full justify-self-center" />
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="px-6 py-4 border-b border-white/5 grid grid-cols-[3fr_1fr_1fr] md:grid-cols-[2fr_1fr_1fr] items-center gap-4">
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

      {/* Sizes Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-800/50" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-1/2 bg-zinc-800/50 rounded-md" />
                <div className="h-3 w-1/3 bg-zinc-800/30 rounded-md" />
              </div>
            </div>
            <div className="border-t border-white/5 my-2" />
            <div className="space-y-3">
              <div>
                <div className="h-2.5 w-16 bg-zinc-800/50 rounded-md mb-2" />
                <div className="flex gap-1.5 flex-wrap">
                  <div className="h-6 w-20 bg-zinc-800/30 rounded-lg" />
                  <div className="h-6 w-24 bg-zinc-800/30 rounded-lg" />
                </div>
              </div>
              <div>
                <div className="h-2.5 w-16 bg-zinc-800/50 rounded-md mb-2" />
                <div className="flex gap-1.5 flex-wrap">
                  <div className="h-6 w-24 bg-zinc-800/30 rounded-lg" />
                  <div className="h-6 w-20 bg-zinc-800/30 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Choose If Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-800/50" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-1/2 bg-zinc-800/50 rounded-md" />
                <div className="h-3 w-1/3 bg-zinc-800/30 rounded-md" />
              </div>
            </div>
            <div className="border-t border-white/5 my-2" />
            <div className="space-y-2.5">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex items-start gap-2.5">
                  <div className="w-3.5 h-3.5 rounded bg-zinc-800/50 shrink-0 mt-0.5" />
                  <div className="h-3 w-5/6 bg-zinc-800/30 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Best Use Cases Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-800/50" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-1/2 bg-zinc-800/50 rounded-md" />
                <div className="h-3 w-1/3 bg-zinc-800/30 rounded-md" />
              </div>
            </div>
            <div className="border-t border-white/5 my-2" />
            <div className="flex flex-wrap gap-2">
              <div className="h-7 w-20 bg-zinc-800/30 rounded-full" />
              <div className="h-7 w-28 bg-zinc-800/30 rounded-full" />
              <div className="h-7 w-24 bg-zinc-800/30 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Product Specification Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
        {[1, 2].map((i) => (
          <div key={i} className="p-4 border border-white/5 rounded-2xl bg-white/5 backdrop-blur-2xl flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-800/50" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-1/2 bg-zinc-800/50 rounded-md" />
                <div className="h-3 w-1/3 bg-zinc-800/30 rounded-md" />
              </div>
            </div>
            {/* Mock ProductFamilyCard */}
            <div className="w-full bg-white/10 rounded-3xl overflow-hidden border border-white/5 p-4 space-y-4">
              <div className="w-full h-[200px] bg-zinc-800/20 rounded-xl flex items-center justify-center" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-3 w-20 bg-zinc-800/50 rounded-md" />
                  <div className="h-5 w-16 bg-zinc-800/50 rounded-lg" />
                </div>
                <div className="h-6 w-3/4 bg-zinc-800/60 rounded-md" />
              </div>
              <div className="flex justify-between items-end pt-2 border-t border-white/5">
                <div className="space-y-1">
                  <div className="h-2.5 w-12 bg-zinc-800/40 rounded-md" />
                  <div className="h-6 w-24 bg-zinc-800/50 rounded-md" />
                </div>
                <div className="h-9 w-24 bg-zinc-800/60 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
