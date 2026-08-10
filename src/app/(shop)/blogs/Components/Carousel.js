'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiArrowRight, HiSparkles } from 'react-icons/hi2';
import Carousel from '@/components/organisms/Carousel';

export default function HeroCarousel({ slides = [] }) {
  if (!slides || slides.length === 0) return null;

  return (
    <div className="w-full  mx-auto">
      <Carousel
        items={slides}
        autoPlay={true}
        interval={5000}
        itemWidth="w-full"
        gap={0}
        showArrows={true}
        showDots={true}
        className="rounded-xl"
   
        renderItem={(blog, i) => {
          const slug = blog.blogid ?? blog.header?.toLowerCase().replace(/\s+/g, '-');
          return (
            <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] select-none flex items-end overflow-hidden group">
              {blog?.image && (
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.header ?? 'Blog image'}
                    fill
                    priority={i === 0}
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="100vw"
                  />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/50 to-transparent pointer-events-none" />

         
              <div className="relative z-10 flex flex-col items-start gap-3 p-6 sm:p-8 md:p-10 max-w-[75%] max-md:max-w-full">
                <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 px-3 py-1 rounded-full shadow-[0_0_12px_rgba(249,115,22,0.15)]">
                  <HiSparkles className="text-orange-400 text-xs" />
                  <span className="text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-orange-400">
                    {blog.category?.category || 'Featured Guide'}
                  </span>
                </div>

                <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight drop-shadow-lg m-0 line-clamp-2">
                  {blog?.header}
                </h2>

                {blog.subHeader && (
                  <p className="text-xs sm:text-sm text-zinc-300/90 leading-relaxed font-medium m-0 line-clamp-2 max-w-xl">
                    {blog?.subHeader}
                  </p>
                )}

                <div className="mt-1">
                  <Link
                    href={`/blogs/${slug}`}
                    className="group/cta inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-extrabold uppercase tracking-widest shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Read Full Story</span>
                    <HiArrowRight className="text-sm transition-transform duration-300 group-hover/cta:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
