import React from 'react'
import SectionHeadingSkeleton from './SectionHeadingSkeleton'

/** Mirrors TrendCard: hero image, bike badge, category chip, name, blurb, CTA. */
export function TrendCardSkeletonCard({ className = 'w-full' }) {
  return (
    <div
      className={`relative block h-[420px] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-[0_30px_80px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div aria-hidden='true' className='absolute inset-0 bg-zinc-900/70' />
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,11,0)_0%,rgba(5,7,11,0.12)_0%,rgba(5,7,11,0.78)_60%,rgba(5,7,11,0.94)_100%)]'
      />

      <div className='absolute inset-x-0 bottom-0 z-10 space-y-3 p-5 md:p-6'>
        {/* Bike brand logo + model */}
        <div className='flex items-center justify-start gap-1'>
          <div className='h-8 w-16 shrink-0 rounded-md bg-zinc-800/80' />
          <div className='h-4 w-36 rounded-md bg-zinc-800' />
        </div>

        {/* Category chip */}
        <div className='flex items-center justify-start'>
          <div className='inline-flex h-7 w-36 items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 backdrop-blur-sm'>
            <div className='h-3.5 w-3.5 shrink-0 rounded-sm bg-orange-500/40' />
            <div className='h-2 w-16 rounded-full bg-white/25' />
          </div>
        </div>

        {/* Product name (second half renders orange) */}
        <div className='flex items-center gap-2'>
          <div className='h-5 w-24 rounded-md bg-zinc-800' />
          <div className='h-5 w-28 rounded-md bg-orange-500/25' />
        </div>

        {/* Short description */}
        <div className='max-w-[90%] space-y-2'>
          <div className='h-3 w-full rounded-full bg-white/15' />
          <div className='h-3 w-3/5 rounded-full bg-white/15' />
        </div>

        {/* View tyre CTA */}
        <div className='flex items-end justify-between gap-4'>
          <div className='flex h-[42px] w-full items-center justify-center rounded-xl border border-orange-500/40 bg-orange-500/5'>
            <div className='h-2.5 w-24 rounded-full bg-orange-500/30' />
          </div>
        </div>
      </div>
    </div>
  )
}

function TrendCardSkelton({ count = 4 }) {
  return (
    <section className='animate-pulse'>
      <SectionHeadingSkeleton
        className='py-4'
        eyebrowClassName='w-40'
        headingClassName='w-56 md:w-[22rem]'
      />

      {/* Mirrors the carousel track: w-full on mobile, 380px from md up */}
      <div className='flex w-full gap-4 overflow-hidden'>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className='flex w-full shrink-0 md:w-[380px]'>
            <TrendCardSkeletonCard />
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrendCardSkelton
