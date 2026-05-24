import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';

export default function TyreDetailsLoading() {
  const breadcrumbItems = [
    { label: 'Tyres', href: '/tyres' },
    { label: 'Loading...', isLast: true },
  ];

  return (
    <div className="animate-fade-in space-y-4">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="py-4 space-y-12">
        <section className="w-full relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column: Image gallery skeleton */}
            <div className="flex flex-col-reverse md:grid md:grid-cols-[90px_1fr] gap-4">
              <div className="flex md:flex-col gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 w-20 bg-zinc-900 border border-zinc-850 rounded-lg animate-pulse" />
                ))}
              </div>
              <div className="relative h-[350px] md:h-[450px] bg-zinc-900/30 border border-zinc-900/50 rounded-2xl animate-pulse" />
            </div>

            {/* Right Column: Title and text specifications */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 animate-pulse">
                <div className="h-4 w-48 bg-zinc-900 rounded-full" />
                <div className="h-6 w-36 bg-zinc-900 rounded-full" />
              </div>
              <div className="space-y-3 animate-pulse">
                <div className="h-12 w-3/4 bg-zinc-900 rounded-xl" />
                <div className="h-8 w-1/2 bg-zinc-900 rounded-lg" />
              </div>
              <div className="flex gap-2 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-6 w-20 bg-zinc-905 rounded-full" />
                ))}
              </div>

              {/* Lists placeholders */}
              <div className="space-y-6 pt-4 border-t border-zinc-900 animate-pulse">
                <div className="space-y-2">
                  <div className="h-3.5 w-32 bg-zinc-800/80 rounded-full" />
                  <div className="h-4 w-2/3 bg-zinc-800/40 rounded-full" />
                  <div className="h-4 w-1/2 bg-zinc-800/40 rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="h-3.5 w-32 bg-zinc-800/80 rounded-full" />
                  <div className="h-4 w-2/3 bg-zinc-800/40 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
