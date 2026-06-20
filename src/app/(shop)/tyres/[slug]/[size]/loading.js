import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';

export default function TyreSizeLoading() {
  const breadcrumbItems = [
    { label: 'Tyres', href: '/tyres' },
    { label: 'Loading...', href: '#' },
    { label: 'Loading Size...', isLast: true },
  ];

  return (
    <div className="animate-fade-in space-y-6 pb-12">
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 relative">
        
        <div className="flex flex-col-reverse md:grid md:grid-cols-[90px_1fr] gap-4">
          {/* Thumbnails */}
          <div className="flex md:h-[450px] md:flex-col gap-3 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 w-20 shrink-0 rounded-lg border border-zinc-800 bg-zinc-900/50 animate-pulse"
              />
            ))}
          </div>
          <div className="relative flex h-[350px] md:h-[450px] w-auto items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30 animate-pulse" />
        </div>

        <div className="space-y-6 mt-2 md:mt-0">
          
          {/* Brand & Trust Header */}
          <div className="flex items-center justify-between gap-4 flex-wrap animate-pulse">
            <div className="h-4 w-32 bg-zinc-900 rounded-full" />
            <div className="h-7 w-48 bg-green-500/10 border border-green-500/20 rounded-full" />
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-3 animate-pulse">
            <div className="h-10 w-3/4 bg-zinc-900 rounded-xl" />
            <div className="h-4 w-1/2 bg-zinc-900/60 rounded-md" />
          </div>

          {/* Performance Tags */}
          <div className="flex flex-wrap gap-2 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-7 w-28 bg-zinc-900/80 border border-white/10 rounded-lg" />
            ))}
          </div>

          {/* Price & Stock Card */}
          <div className="relative overflow-hidden rounded-2xl border border-orange-500/10 bg-zinc-950 p-5 shadow-[0_0_40px_rgba(249,115,22,0.03)] animate-pulse">
            <div className="absolute top-2 right-2 h-5 w-24 bg-zinc-900 rounded-full" />
            <div className="space-y-2">
              <div className="h-3 w-36 bg-zinc-900 rounded-full" />
              <div className="h-8 w-44 bg-zinc-900 rounded-lg" />
            </div>
          </div>

          {/* Key Highlights */}
          <div className="space-y-3 animate-pulse">
            <div className="h-3.5 w-24 bg-zinc-900 rounded-full" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-32 bg-zinc-900 border border-white/[0.04] rounded-lg" />
              ))}
            </div>
          </div>

          {/* CTA & Features Desktop */}
          <div className="space-y-4 animate-pulse">
            <div className="h-12 w-full bg-zinc-900 rounded-xl" />
            <div className="hidden lg:grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-zinc-900" />
                  <div className="h-3.5 w-20 bg-zinc-900 rounded-full" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Description & Technical Specifications Skeleton */}
      <div className="space-y-6 pt-4 animate-pulse">
        {/* Description Text */}
        <div className="space-y-3">
          <div className="h-4.5 w-28 bg-zinc-900 rounded-full" />
          <div className="space-y-2">
            <div className="h-3.5 w-full bg-zinc-900/60 rounded-md" />
            <div className="h-3.5 w-11/12 bg-zinc-900/60 rounded-md" />
          </div>
        </div>

        {/* Technical Specs Grid */}
        <div className="space-y-3">
          <div className="h-4.5 w-48 bg-zinc-900 rounded-full" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 md:gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="h-16 rounded-xl bg-zinc-900/40 border border-white/10 p-3 flex flex-col justify-between"
              >
                <div className="h-2 w-10 bg-zinc-800 rounded-full" />
                <div className="h-3.5 w-16 bg-zinc-800 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Compatible Bikes Badges */}
        <div className="space-y-3">
          <div className="h-4.5 w-36 bg-zinc-900 rounded-full" />
          <div className="flex flex-wrap gap-2.5 md:gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-9 w-28 rounded-xl bg-zinc-900/40 border border-white/10"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Buying Guide Skeleton */}
      <section className="space-y-3 py-4 animate-pulse">
        <div className="h-4.5 w-40 bg-zinc-900 rounded-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((cardIdx) => (
            <div
              key={cardIdx}
              className="rounded-2xl bg-zinc-900/20 border border-white/10 p-5 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5" />
                <div className="space-y-1.5">
                  <div className="h-3.5 w-24 bg-zinc-900 rounded-full" />
                  <div className="h-2.5 w-28 bg-zinc-900/60 rounded-full" />
                </div>
              </div>
              <div className="space-y-2.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-zinc-900 shrink-0" />
                    <div className="h-3 w-3/4 bg-zinc-900/60 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Card Skeleton */}
      <div className="border border-white/10 bg-zinc-950/20 backdrop-blur-sm p-4 lg:p-8 rounded-2xl flex flex-col lg:flex-row gap-4 items-center animate-pulse">
        <div className="md:flex-1 space-y-6 text-center lg:text-left w-full">
          <div className="space-y-3">
            <div className="h-5 w-32 bg-zinc-900 rounded-full mx-auto lg:mx-0" />
            <div className="h-8 w-3/4 bg-zinc-900 rounded-xl mx-auto lg:mx-0" />
            <div className="h-3.5 w-5/6 bg-zinc-900/60 rounded-md mx-auto lg:mx-0" />
          </div>
          <div className="hidden md:flex gap-2 md:gap-4 justify-center lg:justify-start">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-28 bg-zinc-900 rounded-full" />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[350px] shrink-0 space-y-2">
          <div className="w-full h-12 bg-zinc-900 rounded-xl" />
          <div className="h-3 w-48 bg-zinc-900/60 rounded-full mx-auto" />
        </div>
      </div>

    </div>
  );
}