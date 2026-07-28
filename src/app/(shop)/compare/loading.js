import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import CardSkeleton from './components/CardSkeleton';

export default function ComparePortalLoading() {
  const breadcrumbItems = [{ label: 'Compare', isLast: true }];

  return (
    <div className="space-y-6 mb-4">
      <Breadcrumb items={breadcrumbItems} />

      {/* Banner Skeleton */}
      <div className="w-full h-48 md:h-64 bg-white/5 border border-zinc-800/60 rounded-3xl animate-pulse" />

      {/* Search Bar Skeleton */}
      <div className="flex justify-end">
        <div className="h-[52px] w-full md:max-w-md bg-white/5 border border-zinc-800/60 rounded-2xl animate-pulse" />
      </div>

      {/* 8 pulsing battle cards grid matching the CompareClient layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <CardSkeleton key={i} /> 
        ))}
      </div>
    </div>
  );
}
