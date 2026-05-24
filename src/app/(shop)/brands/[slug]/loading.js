import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';

export default function BrandDetailPageLoading() {
  const breadcrumbItems = [
    { label: 'Brands', href: '/brands' },
    { label: 'Loading brand details...', isLast: true },
  ];

  return (
    <div className="space-y-4 pb-4 animate-fade-in">
      <Breadcrumb items={breadcrumbItems} />

      {/* Large Brand Banner Card skeleton */}
      <section className="relative h-[250px] sm:h-[340px] md:h-[420px] w-full bg-zinc-900/30 border border-zinc-850 rounded-[1rem] shadow-2xl flex flex-col justify-end p-6 sm:p-10 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />
        <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-end gap-6">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-zinc-800/40 border border-zinc-800 backdrop-blur-md shadow-xl shrink-0" />
          <div className="space-y-2 text-left">
            <div className="h-3.5 w-32 bg-zinc-800/50 rounded-full" />
            <div className="h-10 w-48 bg-zinc-800/60 rounded-xl" />
            <div className="h-4 w-64 bg-zinc-800/40 rounded-full" />
          </div>
        </div>
      </section>

      {/* Split grid contents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
        
        {/* Left Column specs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 sm:p-8 rounded-[1rem] bg-zinc-900/30 border border-zinc-900 space-y-4">
            <div className="h-6 w-48 bg-zinc-800/60 rounded-lg" />
            <div className="h-4 w-full bg-zinc-800/40 rounded-full" />
            <div className="h-4 w-11/12 bg-zinc-800/40 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-900 flex items-start gap-4">
                <div className="p-4 rounded-xl bg-zinc-800/40 shrink-0 h-10 w-10" />
                <div className="space-y-2 flex-1">
                  <div className="h-3 w-20 bg-zinc-800/50 rounded-full" />
                  <div className="h-5 w-32 bg-zinc-800/60 rounded-md" />
                  <div className="h-3.5 w-full bg-zinc-805/30 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column Sticky quote panel */}
        <div className="lg:col-span-1 flex flex-col justify-start">
          <div className="p-6 sm:p-8 rounded-[1rem] bg-zinc-900/30 border border-zinc-900 space-y-6 flex flex-col">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-800/40 shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-6 w-3/4 bg-zinc-800/60 rounded-lg" />
              </div>
            </div>
            <div className="h-10 w-full bg-zinc-800/40 rounded-full" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-zinc-800/30 rounded-full" />
              <div className="h-3 w-5/6 bg-zinc-800/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
