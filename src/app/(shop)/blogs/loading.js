import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';

export default function BlogsLoading() {
  const breadcrumbItems = [{ label: 'Blogs', isLast: true }];

  return (
    <div className="min-h-screen space-y-8 animate-fade-in">
      <Breadcrumb items={breadcrumbItems} />

      {/* Main hero carousel block */}
      <section className="relative h-[250px] md:h-[450px] w-full bg-zinc-900/30 border border-zinc-850 rounded-2xl animate-pulse shadow-xl" />

      {/* Filter tab bar and card listings */}
      <section className="space-y-6">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="space-y-2">
            <div className="h-3 w-16 bg-zinc-900 rounded-full animate-pulse" />
            <div className="h-8 w-48 bg-zinc-900 rounded-md animate-pulse" />
          </div>
          <div className="h-10 w-64 bg-zinc-900 rounded-full animate-pulse" />
        </div>

        {/* 6 pulsing blog cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 flex flex-col gap-4">
              <div className="h-44 w-full bg-zinc-900/60 rounded-xl" />
              <div className="h-3 w-16 bg-zinc-900 rounded-full" />
              <div className="h-6 w-3/4 bg-zinc-900 rounded-lg" />
              <div className="h-12 w-full bg-zinc-900/40 rounded-lg" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
