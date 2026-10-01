import React from 'react';
import SectionHeadingSkeleton from '@/components/atoms/SectionHeadingSkeleton';

/** Mirrors PerformanceBrandCard: banner image, logo, headline, chips, CTA. */
function BrandCardSkeleton({ className = 'w-full' }) {
  return (
    <div
      className={`relative flex h-[420px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#07090d] [.light-mode_&]:border-black/10 ${className}`}
    >
      <div aria-hidden='true' className='absolute inset-0 z-0 bg-zinc-900/70' />
      <span
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(0deg,rgba(6,8,12,0.97)_0%,rgba(6,8,12,0.84)_28%,rgba(6,8,12,0.3)_60%,transparent_100%)]'
      />

      <div className='relative z-30 flex h-full flex-col justify-end gap-4 p-4'>
        {/* Brand logo */}
        <div className='h-10 w-36 rounded-md bg-zinc-800/80 sm:h-11 sm:w-40' />

        {/* Focus keyword headline (second line renders orange) */}
        <div className='space-y-2'>
          <div className='h-6 w-11/12 rounded-md bg-zinc-800 sm:h-7' />
          <div className='h-6 w-2/3 rounded-md bg-orange-500/25 sm:h-7' />
        </div>

        {/* Category chips: icon stacked over label */}
        <div className='flex flex-wrap items-center gap-1.5'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='flex flex-col items-center gap-1.5 px-2.5 py-1'>
              <div className='h-[22px] w-[22px] rounded-md bg-orange-500/25' />
              <div className='h-2.5 w-14 rounded-full bg-white/20' />
            </div>
          ))}
        </div>

        {/* Shop CTA */}
        <div className='flex h-11 w-full items-center justify-center rounded-xl border border-orange-500/40 bg-orange-500/10'>
          <div className='h-2.5 w-28 rounded-full bg-orange-500/30' />
        </div>
      </div>
    </div>
  );
}

export function BrandCardSkeletonGroup({ count = 3 }) {
  return (
    <div className='w-full mx-auto flex animate-pulse flex-col gap-6'>
      <SectionHeadingSkeleton eyebrowClassName='w-36' headingClassName='w-56 md:w-[22rem]' />

      <div className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: count }).map((_, i) => (
          <BrandCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default BrandCardSkeleton;
