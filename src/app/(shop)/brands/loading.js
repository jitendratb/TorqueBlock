import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';

export default function BrandsLoading() {
  const breadcrumbItems = [{ label: 'Brands', isLast: true }];

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <Breadcrumb items={breadcrumbItems} />

      {/* Header telemetry blocks */}
      <div className="flex flex-col items-start justify-start space-y-3 animate-pulse">
        <div className="h-6 w-40 bg-zinc-900 border border-gray-100 rounded-full" />
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-none">
          Premium <span className="text-zinc-800">Brands</span>
        </div>
        <div className="h-16 w-full max-w-xl bg-zinc-900/50 rounded-xl" />
      </div>

      {/* Search filters outline */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6 animate-pulse">
        <div className="h-[48px] w-full sm:max-w-md bg-zinc-900 rounded-xl" />
        <div className="h-[36px] w-40 bg-zinc-900 border border-zinc-850 rounded-full self-start sm:self-auto" />
      </div>

      {/* 8 pulsing partner cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4 animate-pulse">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="relative h-[200px] md:h-[180px] lg:h-[240px] rounded-[1.5rem] md:rounded-[2rem] bg-zinc-900/30 border border-zinc-850 p-6 flex flex-col justify-end gap-3 shadow-xl">
            <div className="h-3.5 w-16 bg-zinc-800/50 rounded-full" />
            <div className="flex justify-between items-center w-full">
              <div className="h-6 w-32 bg-zinc-800/60 rounded-lg" />
              <div className="w-10 h-10 rounded-full bg-zinc-800/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
