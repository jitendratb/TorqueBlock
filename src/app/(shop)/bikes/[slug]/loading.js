import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';

export default function BikeModelsLoading() {
  const breadcrumbItems = [
    { label: 'Bikes', href: '/bikes' },
    { label: 'Loading...', isLast: true },
  ];

  return (
    <div className="space-y-6 pb-4 overflow-hidden animate-fade-in">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="relative space-y-8">
        {/* Large Hero Card Skeleton */}
        <div className="relative h-[80vh] md:h-[70vh] w-full bg-zinc-900/40 border border-zinc-800/30 rounded-[1.5rem] md:rounded-[3rem] overflow-hidden animate-pulse shadow-2xl flex flex-col justify-end p-8 md:p-16">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-10" />
          <div className="relative z-20 space-y-4 max-w-xl">
            <div className="h-6 w-32 bg-zinc-800/50 rounded-full" />
            <div className="h-4 w-24 bg-zinc-800/30 rounded-full" />
            <div className="h-10 w-2/3 bg-zinc-800/50 rounded-xl" />
            <div className="h-16 w-full bg-zinc-800/40 rounded-xl" />
          </div>
        </div>

        {/* Fitment Specifications Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="p-6 md:p-8 bg-zinc-900/30 border border-zinc-850 rounded-2xl animate-pulse flex flex-col gap-3">
              <div className="h-3 w-32 bg-zinc-800/50 rounded-full" />
              <div className="h-8 w-48 bg-zinc-800/50 rounded-lg" />
            </div>
          ))}
        </div>

        {/* Tyre recommendation roster header */}
        <div className="space-y-4">
          <div className="h-8 w-48 bg-zinc-900/50 rounded-lg animate-pulse" />
          <div className="h-4 w-32 bg-zinc-900/30 rounded-full animate-pulse" />
          
          {/* Tyre outline lists */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative pb-6 px-6 bg-zinc-950 border border-zinc-900 rounded-[2rem] animate-pulse flex flex-col items-center pt-24 gap-4">
                <div className="absolute -top-16 w-40 h-40 bg-zinc-900 rounded-full" />
                <div className="h-3 w-16 bg-zinc-800/50 rounded-full" />
                <div className="h-6 w-36 bg-zinc-800/50 rounded-lg" />
                <div className="h-10 w-full bg-zinc-800/40 rounded-lg" />
                <div className="h-10 w-28 bg-zinc-800/50 rounded-xl mt-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
