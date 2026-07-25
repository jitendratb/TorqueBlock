'use client';

import React from 'react';
import Image from "@/components/molecules/CustomImage";
import { FiArrowDownRight, FiBox, FiTrendingUp, FiArrowRight, FiShield, FiTag, FiHeadphones, FiZap, FiInfo } from "react-icons/fi";
import { FaCrown } from "react-icons/fa6";
import TopProductCard from '../TopProductCard';
import { useRouter } from "next/navigation";
import FAQSection from '@/components/atoms/FAQSection';
import WhatsAppButton from "@/components/atoms/WhatsAppButton";
import Carousel from '@/components/organisms/Carousel';
import ProductFamilyCard from '@/components/atoms/ProductFamilyCard';
import TyreSection from '../NewLaunchTyres';
import RecommendedTyres from '../BrandsComponents/RecommendedTyres';

export default function CategoryDetailsClient({ category }) {
    const router = useRouter();
    const nameParts = category.name.split(' ');
    const firstPart = nameParts[0];
    const secondPart = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ' Tyres';

    console.log(category)

    return (
        <div className="space-y-4 md:space-y-4 pb-4">
            <div className="relative w-full h-[450px] md:h-[550px] rounded-2xl overflow-hidden group border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
                <Image
                    src={category?.bannerImage || category?.image}
                    alt={`${category?.name} Premium Motorcycle Tyres Collection View`}
                    fill
                    imageClassName="object-cover transition-all duration-[2s] ease-out group-hover:scale-105 saturate-[0.6] group-hover:saturate-100"
                    priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="absolute bottom-0 inset-x-0 p-6 z-20 flex flex-col gap-2 md:gap-4">
                    <div className="flex flex-wrap items-center gap-3 transform md:translate-y-6 group-hover:translate-y-4 transition-all duration-500 delay-75">
                        <div className="flex items-center gap-2 bg-orange-500/10 backdrop-blur-md border border-orange-500/30 rounded-full px-3.5 py-1.5 md:py-2 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)] group-hover:bg-orange-500/20 transition-colors duration-300">
                            <FaCrown size={12} className="text-orange-500 drop-shadow-md mb-[1px]" />
                            <span>Premium Selection</span>
                        </div>
                        {/* <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1.5 md:py-2 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-zinc-300 group-hover:bg-white/10 transition-colors duration-300">
                            <FiBox size={14} className="text-zinc-400" />
                            <span>{category?.tyreIntents?.length || 0} Products</span>
                        </div> */}
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-zinc-400 uppercase tracking-tighter leading-[0.95] max-w-4xl transform md:translate-y-6 group-hover:translate-y-4 transition-transform duration-500 delay-100 drop-shadow-lg pb-1">
                        {firstPart}{' '}
                        <span className="text-orange-500">{secondPart}</span>
                    </h1>

                    <p className="text-zinc-400 text-xs md:text-sm lg:text-base font-medium max-w-2xl leading-relaxed transform md:translate-y-2  group-hover:translate-y-0 transition-all duration-500 delay-150">
                        {category?.shortDescription || `Experience the ultimate grip and performance with our premium ${category?.name} collection. Engineered for riders who demand perfection.`}
                    </p>
                </div>
            </div>

            {(category?.description || category?.content) && (
                <div className="grid grid-cols-1 gap-4">
                    {category?.description && (
                        <article className="group relative rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4">
                            <div className="relative flex border-b border-white/10 pb-4 items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                                    <FiInfo className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between flex-1">
                                    <div>
                                        <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                                            Overview
                                        </h2>
                                        <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide">
                                            Category Details
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-zinc-300 text-xs md:text-sm lg:text-base font-light leading-relaxed md:leading-loose">
                                {category.description}
                            </div>
                        </article>
                    )}
                    {category?.content && (
                        <article className="group relative rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4">
                            <div className="relative flex border-b border-white/10 pb-4 items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                                    <FiTrendingUp className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between flex-1">
                                    <div>
                                        <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                                            The {category.name} <span className="text-orange-500">Advantage</span>
                                        </h2>
                                        <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                                            Performance Benefits
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-zinc-300 text-xs md:text-sm lg:text-base font-light leading-relaxed md:leading-loose">
                                {category.content}
                            </div>
                        </article>
                    )}
                </div>
            )}

          <RecommendedTyres categoryId={category?._id} itemWidth='w-[280px] md:w-[300px]' title={`${category?.name || ''} Tyres`} subTitle='Top picks for this category' bgStatus={false} />
        
            <TyreSection
                categoryId={category?._id}
                title={`Explore ${category?.name || 'Category'} Tyres`}
                subtitle={`Shop premium ${category?.name || 'motorcycle'} tyres.`}
            />

            <FAQSection faqs={category?.faqs} />
        </div>
    );
}