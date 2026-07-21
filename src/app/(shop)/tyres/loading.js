import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import TyreCardSkeleton from '@/app/(home)/component/Tyre/TyreCardSkeleton';

export default function TyresLoading() {
  const breadcrumbItems = [{ label: 'Tyres', isLast: true }];

  return (
    <main>
        <div className="space-y-4 pb-4 animate-fade-in">
          <Breadcrumb items={breadcrumbItems} />

          {/* Banner Skeleton */}
          <div className="w-full h-48 md:h-64 rounded-3xl bg-zinc-900/30 border border-zinc-800/40 overflow-hidden animate-pulse shadow-md" />

          {/* Categories Sections Skeletons */}
          <div className="space-y-8 pt-4">
            {[1, 2].map((sectionIndex) => (
              <section key={sectionIndex} className="w-full">
                {/* Section Header Skeleton */}
                <div className="mb-6 space-y-2">
                  <div className="h-7 w-56 bg-zinc-800/40 rounded-lg animate-pulse" />
                  <div className="h-4 w-72 bg-zinc-800/20 rounded-md animate-pulse" />
                </div>
                
                {/* Tyre Cards Grid/Slider Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {[1, 2, 3, 4, 5].map((cardIndex) => (
                    <div key={cardIndex} className={`${cardIndex > 2 ? "hidden lg:block" : ""} ${cardIndex > 1 ? "hidden md:block" : ""}`}>
                        <TyreCardSkeleton />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
    </main>
  );
}
