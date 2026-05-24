import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';

export default function TyresLoading() {
  const breadcrumbItems = [{ label: 'Tyres', isLast: true }];

  return (
    <div className="space-y-16 pb-4 animate-fade-in">
      <Breadcrumb items={breadcrumbItems} />

      {/* Giant cover banner layout card */}
      <section className="relative h-[400px] md:h-[600px] w-full bg-zinc-900/40 border border-zinc-800/30 rounded-[2.5rem] overflow-hidden animate-pulse shadow-2xl flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />
        <div className="relative z-20 space-y-6 max-w-xl flex flex-col items-center">
          <div className="h-8 w-32 bg-zinc-800/50 rounded-full" />
          <div className="h-16 w-3/4 bg-zinc-800/50 rounded-xl" />
          <div className="h-6 w-2/3 bg-zinc-800/30 rounded-full" />
          <div className="h-12 w-64 bg-zinc-800/40 rounded-full" />
        </div>
      </section>

      {/* Categories grid skeleton */}
      <section className="space-y-8 px-4">
        <div className="space-y-3">
          <div className="h-4 w-20 bg-zinc-900/50 rounded-full animate-pulse" />
          <div className="h-10 w-64 bg-zinc-900/50 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center justify-center p-8 bg-zinc-950 border border-zinc-900 rounded-[2rem] animate-pulse gap-4">
              <div className="h-12 w-12 bg-zinc-900 rounded-full" />
              <div className="h-4 w-16 bg-zinc-800/50 rounded-full" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
