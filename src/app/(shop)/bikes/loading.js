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

      <div className="space-y-8 md:space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 px-2">
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
              SELECT YOUR <br />
              <span className="text-orange-500 outline-text text-transparent">WEAPON</span>
            </h2>
          </div>

          <div className="relative w-full md:max-w-md">
            <div className="w-full h-[58px] md:h-[68px] bg-zinc-950/60 border border-zinc-900 rounded-xl md:rounded-2xl flex items-center justify-between px-5 md:px-6 transition-all duration-300">
              <span className="text-zinc-800 text-sm md:text-base font-black tracking-wider animate-pulse">SEARCH BRAND...</span>
              <div className="text-zinc-800 animate-pulse">
                <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2">
          <BikeBrandSkeletonGroup count={6} />
        </div>
      </div>
    </div>
  );
}