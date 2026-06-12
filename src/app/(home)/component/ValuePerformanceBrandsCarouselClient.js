'use client';

import React from 'react';
import Link from "next/link";
import CustomImage from "@/components/molecules/CustomImage";
import Carousel from "@/components/organisms/Carousel";

export default function ValuePerformanceBrandsCarouselClient({ brands }) {
    if (!brands || brands.length === 0) return null;

    return (
        <Carousel
            items={brands}
            itemWidth={360}
            gap={16}
            showArrows={true}
            showDots={false}
            renderItem={(brand, index) => (
                 <Link href={`/brands/${brand?._id}`} key={brand._id} className=" group w-full shrink-0">
                            <article className="grid grid-cols-2 min-w-[280px] md:min-w-[340px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                                <div className="relative h-[120px] md:h-[140px] rounded-3xl overflow-hidden">
                                    <CustomImage
                                        src={brand?.brandLogo}
                                        alt={brand?.name}
                                        fill
                                        priority={index < 4}
                                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                </div>

                                <div className="flex flex-col items-start gap-2 p-4">
                                    <span className="px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-400 bg-zinc-800/50 [.light-mode_&]:text-zinc-700 [.light-mode_&]:bg-zinc-200/80 rounded-full transition-colors duration-1000">
                                        Performance
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white [.light-mode_&]:text-zinc-900 transition-colors duration-1000 tracking-tight">
                                        {brand?.name}
                                    </h3>

                                    <div className=" flex items-center gap-2 text-xs md:text-sm font-semibold text-white [.light-mode_&]:text-zinc-900 group-hover:text-orange-500 transition-colors duration-1000">
                                        Explore Brand
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </article>
                        </Link>
            )}
        />
    );
}
