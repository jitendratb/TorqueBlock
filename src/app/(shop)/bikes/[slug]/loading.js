import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';

export default function BikeModelsLoading() {
  const breadcrumbItems = [
    { label: 'Bikes', href: '/bikes' },
    { label: 'Loading...', isLast: true },
  ];

  return (
    <div className="space-y-4 pb-4">
      <Breadcrumb items={breadcrumbItems} />

      <div className="relative space-y-4">
        {/* Hero Section Skeleton */}
        <div className="relative h-[70vh] md:h-[60vh] 2xl:h-[520px] w-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900/60 animate-pulse flex flex-col justify-end p-4 md:p-6">
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10" />
          <div className="relative z-20 space-y-3 max-w-3xl">
            <div className="h-6 w-36 bg-white/10 rounded-full" />
            <div className="h-5 w-28 bg-white/15 rounded-md" />
            <div className="h-12 md:h-16 w-3/4 bg-white/20 rounded-2xl" />
            <div className="h-4 w-1/2 bg-white/10 rounded-md" />
            <div className="h-3 w-5/6 bg-white/5 rounded-md" />
          </div>
        </div>

        {/* Overview Card Skeleton */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10" />
            <div className="space-y-1">
              <div className="h-4 w-28 bg-white/15 rounded-md" />
              <div className="h-3 w-44 bg-white/5 rounded-md" />
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-3 w-full bg-white/5 rounded-md" />
            <div className="h-3 w-11/12 bg-white/5 rounded-md" />
            <div className="h-3 w-4/5 bg-white/5 rounded-md" />
          </div>
        </div>

        {/* Specifications Skeleton */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10" />
            <div className="space-y-1">
              <div className="h-4 w-44 bg-white/15 rounded-md" />
              <div className="h-3 w-56 bg-white/5 rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-3 md:gap-4 pt-2">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-white/5 border border-white/5 p-3 space-y-2">
                <div className="h-3 w-12 bg-white/10 rounded-md" />
                <div className="h-3 w-16 bg-white/15 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Performance & Maintenance Skeleton */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10" />
            <div className="space-y-1">
              <div className="h-4 w-52 bg-white/15 rounded-md" />
              <div className="h-3 w-60 bg-white/5 rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 pt-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-40 rounded-2xl bg-white/5 border border-white/5 p-4 space-y-3">
                <div className="h-4 w-36 bg-white/15 rounded-md" />
                <div className="h-3 w-full bg-white/5 rounded-md" />
                <div className="h-3 w-4/5 bg-white/5 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Tyre Carousel Product Cards Skeleton */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10" />
            <div className="space-y-1">
              <div className="h-4 w-40 bg-white/15 rounded-md" />
              <div className="h-3 w-52 bg-white/5 rounded-md" />
            </div>
          </div>
          <div className="flex gap-4 overflow-hidden pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-72 md:w-80 h-96 shrink-0 rounded-3xl bg-white/5 border border-white/5 p-4 flex flex-col justify-between">
                <div className="w-full h-44 rounded-2xl bg-white/5" />
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-white/10 rounded-md" />
                  <div className="h-5 w-48 bg-white/15 rounded-md" />
                  <div className="h-4 w-24 bg-white/10 rounded-md" />
                </div>
                <div className="h-10 w-full rounded-xl bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
