'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import Carousel from '@/components/organisms/Carousel';
import CustomImage from '@/components/molecules/CustomImage';
import { getCategoryPreset } from './performanceBrandPresets';

const CATEGORY_DESCRIPTIONS = {
    'Dual Sport': 'For motorcycles that split time between road and light off-road riding.',
    'Racing Slicks': 'Track-focused grip and control for committed performance riding.',
    'Sport Touring': 'For highway riding, long-distance touring and everyday road use.',
    'Off-Roading': 'For dedicated off-road, motocross and trail-focused riding.',
    'Cruiser': 'Comfortable, stable performance for cruisers and heavyweight motorcycles.',
    'Super Sport': 'For sharp handling, high-performance road riding and spirited rides.',
};

function splitCategoryName(categoryName) {
    const [firstWord, ...restWords] = categoryName.trim().split(/\s+/);
    return { firstWord, restName: restWords.join(' ') };
}

function getDescription(categoryName, presetLabel) {
    const description = CATEGORY_DESCRIPTIONS[presetLabel];
    if (description) return description;
    return `Explore motorcycle tyres selected for ${categoryName.toLowerCase()} riding.`;
}

export default function CategoryCarouselClient({ categories = [] }) {
    if (!categories.length) return null;

    return (
        <Carousel
            items={categories}
            itemWidth="w-full sm:w-[360px]"
            gap={16}
            showArrows
            showDots={false}
            className="px-1"
            leftArrowClassName="!-left-3 p-2 border-white/20 bg-zinc-950/70"
            rightArrowClassName="!-right-3 p-2 border-white/20 bg-zinc-950/70"
            renderItem={(category) => {
                const categoryName = category?.name || 'Motorcycle Tyres';
                const { Icon, label } = getCategoryPreset(categoryName);
                const description = getDescription(categoryName, label);
                const { firstWord, restName } = splitCategoryName(categoryName);

                return (
                    <Link
                        href={`/category/${category.slug}`}
                        className="group mt-8 relative block h-[320px] lg:h-[420px] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#080d13] shadow-[0_18px_45px_rgba(0,0,0,0.32)] transition-[border-color,transform,box-shadow] transition-all duration-500 hover:-translate-y-1 mb-4 hover:border-orange-500/60 hover:shadow-[0_24px_55px_rgba(0,0,0,0.45)]"
                    >
                        <CustomImage
                            src={category.image || category.bannerImage}
                            alt={categoryName}
                            fill
                            sizes="(max-width: 639px) 280px, (max-width: 1023px) 320px, 300px"
                            quality={75}
                            imageClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,8,13,0.96)_0%,rgba(4,8,13,0.72)_34%,rgba(4,8,13,0.12)_72%,transparent_100%)]" />
                        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,8,13,0.25),transparent_75%)]" />

     <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-end p-4 sm:p-5">
         
                            <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 group-hover:border-orange-500 group-hover:bg-orange-500">
                                <FiArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 z-10 p-4">
                            <div className='flex gap-2 flex-col '>
                                <div className='flex gap-4'>
                                    <Icon aria-hidden="true" className="h-7 w-7 text-orange-500 drop-shadow-[0_0_12px_rgba(249,115,22,0.5)]" />
                                    <h3 className=" text-3xl font-black uppercase leading-[1.05] text-white">
                                        {firstWord}
                                        {restName && <span className="text-orange-500"> {restName}</span>}
                                    </h3>
                                </div>
                                <p className="text-sm font-semibold leading-relaxed text-white/75">
                                    {description}
                                </p>
                                <span className="inline-flex backdrop-blur-sm w-full items-center justify-center gap-2.5 rounded-lg border border-orange-500 px-3 py-3 text-xs font-bold uppercase tracking-wide text-orange-500 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                                    Explore Tyres
                                    <FiArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </div>
                        </div>
                    </Link>
                );
            }}
        />
    );
}
