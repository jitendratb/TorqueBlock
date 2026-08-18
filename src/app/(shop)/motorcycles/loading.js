import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import { BikeBrandSkeletonGroup } from '@/app/(shop)/Components/TyreComponent/BikeBrandSkeleton';

export default function BikesLoading() {
  const breadcrumbItems = [
    { label: 'Bikes', isLast: true },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <Breadcrumb items={breadcrumbItems} />      

      <div className="space-y-4">
        <div className="relative w-full h-48 md:h-64 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl animate-pulse shadow-lg" />
        <div className="flex justify-end gap-4">
          <div className="w-full md:max-w-md h-12 bg-white/5 border border-white/10 rounded-2xl animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <BikeBrandSkeletonGroup count={8} />
        </div>
      </div>
    </div>
  );
}