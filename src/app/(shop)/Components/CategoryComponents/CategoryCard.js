'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import { getFallback } from './categoryFallbacks';

export default function CategoryCard({ category, featured = false, index = 0 }) {
    const name = category?.name || category?.categoryName || 'Category';
    const slug = category?.slug || name.toLowerCase().replace(/\s+/g, '-');
    const apiImage = category?.image || category?.imageUrl || null;
    const fallback = getFallback(name);
    const imageSrc = apiImage || fallback.src;
    const subtitle = category?.subtitle || fallback.subtitle;
    const description = category?.description || 'Engineered for peak performance in this riding style.';

    return (
        <Link
            href={`/category/${slug}`}
            className={`group relative overflow-hidden rounded-[2rem] border border-zinc-800 hover:border-orange-500/40 bg-zinc-950 
                transition-all duration-700 ease-out shadow-xl hover:shadow-[0_0_50px_rgba(249,115,22,0.18)]
                ${featured ? 'md:col-span-2 md:row-span-2 h-[240px] md:h-[380px] md:h-full' : 'h-[240px] md:h-[280px]'}
                block w-full`}
            style={{ animationDelay: `${index * 80}ms` }}
        >
            <Image
                src={imageSrc}
                alt={name}
                fill
                sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                className="object-cover transition-all duration-[1.8s] ease-out group-hover:scale-105 saturate-[0.6] group-hover:saturate-100"
                priority={index < 2}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="absolute top-5 left-5 z-20">
                <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-[0.25em] text-zinc-400 group-hover:border-orange-500/30 group-hover:text-orange-400 transition-all duration-300">
                    {subtitle}
                </div>
            </div>

            <div className={`absolute bottom-6 right-6 ${featured ? 'md:bottom-8 ' : ' top-6'} md:right-8 z-20 w-8 h-8 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 group-hover:scale-110 transition-all duration-500 delay-150 group-hover:border-white/50`}>
                <FiArrowUpRight className="text-white text-lg" />
            </div>

            <div className="absolute bottom-0 inset-x-0 p-4 md:px-4 md:py-8 lg:p-8 z-20 flex flex-col justify-end space-y-2">
                <div className="transform md:translate-y-8 translate-y-6 group-hover:translate-y-0 transition-all duration-500 delay-75">
                    <span className="text-orange-400 text-[10px] font-black uppercase tracking-[0.35em]">
                        Explore Collection →
                    </span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-lg transform md:translate-y-7 translate-y-5 group-hover:translate-y-0 transition-transform duration-500">
                    {name}
                </h3>
                <p className="text-zinc-400 text-xs md:text-sm font-medium italic max-w-sm line-clamp-2 transform md:translate-y-6 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-150 leading-relaxed">
                    "{description}"
                </p>
            </div>
        </Link>
    );
}
