'use client';

import React from 'react';
import Image from "@/components/molecules/CustomImage";
import { FiArrowDownRight, FiBox, FiTrendingUp, FiArrowRight, FiShield, FiTag, FiHeadphones, FiZap } from "react-icons/fi";
import TopProductCard from '../TopProductCard';
import { useRouter } from "next/navigation";
import FAQSection from '@/components/atoms/FAQSection';
import WhatsAppButton from "@/components/atoms/WhatsAppButton";

export default function CategoryDetailsClient({ category }) {
    const router = useRouter();

    const nameParts = category.name.split(' ');
    const firstPart = nameParts[0];
    const secondPart = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ' Tyres';

    console.log(category)
    return (
        <div className="space-y-4 pb-4">
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden group">
                <Image
                    src={category?.bannerImage || category?.image}
                    alt={`${category?.name} Premium Motorcycle Tyres Collection View`}
                    fill
                    imageClassName="object-cover transition-all duration-[1.8s] ease-out group-hover:scale-105 saturate-[0.8] group-hover:saturate-100"
                    priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent" />

                <div className="absolute lg:top-6 lg:left-6 top-2 left-2 flex items-center gap-2 bg-orange-500/20 backdrop-blur-md border border-orange-500/40 rounded-full lg:px-4 lg:py-2 px-2 py-1">
                    <FiBox className="text-orange-400" />
                    <span className="text-xs font-black uppercase tracking-widest text-orange-300">
                        {category?.name} Collection
                    </span>
                </div>

                <div className="absolute lg:top-6 lg:right-6 top-2 hidden md:flex right-2 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full lg:px-4 lg:py-2 px-2 py-1">
                    <FiTrendingUp className="text-emerald-400" />
                    <span className="text-xs md:text-sm font-black text-emerald-400">{(category?.totalViews || 541036).toLocaleString()}</span>
                    <span className="text-xs text-zinc-400">Category Views</span>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-4 md:p-10 flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 text-xs font-medium text-white">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            <span>Premium Quality</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 text-xs font-medium text-white">
                            <FiBox className="text-zinc-300" />
                            <span>{category?.tyreIntents?.length} Products</span>
                        </div>
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none max-w-4xl mt-2">
                        <span className="text-transparent bg-clip-text bg-white">{firstPart} </span>
                        <span className="text-orange-500">{secondPart}</span>
                    </h1>
                    
                    <p className="text-zinc-300 text-xs lg:text-sm md:text-base font-light max-w-2xl italic leading-relaxed border-l-4 border-orange-500 pl-4 mt-2">
                        {category?.shortDescription || `Experience the ultimate grip and performance with our premium ${category?.name} collection. Engineered for riders who demand perfection.`}
                    </p>
                </div>
            </div>
            

            {(category?.description || category?.content) && (
                <div className="grid grid-cols-1  gap-4">
                    {category?.description && (
                        <div className="">
                            <h3 className="text-xl md:text-2xl font-black text-orange-500 uppercase tracking-widest flex items-center gap-3">
                                Overview
                            </h3>
                            <p className="text-zinc-300 text-xs md:text-base leading-relaxed md:leading-loose">
                                {category.description}
                            </p>
                        </div>
                    )}
                    {category?.content && (
                        <div className="">
                            <h3 className="text-lg md:text-2xl font-black text-white uppercase tracking-widest">
                                The {category.name} <span className="text-orange-500">Advantage</span>
                            </h3>
                            <div className="text-zinc-300 text-xs md:text-base leading-relaxed md:leading-loose">
                                {category.content}
                            </div>
                        </div>
                    )}
                </div>
            )}


            <section className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="lg:space-y-4 lg:max-w-2xl text-left">
                        <h2 className="text-2xl md:text-2xl font-black text-white uppercase tracking-tighter leading-none">
                            EXPLORE <span className="text-orange-500 text-2xl md:text-8xl outline-text text-transparent"> INVENTORY</span>
                        </h2>
                        <p className="text-zinc-500 text-xs lg:text-xl font-bold italic">Browse the finest selection of {category.name} tyres.</p>
                    </div>
                </div>

                <div className="flex overflow-y-auto gap-6">
                    {category?.tyreIntents?.map((intent, index) => {
                        const mappedProduct = {
                            name: intent?.productName,
                            description: intent?.hero?.subtitle || "Premium high-performance tyre",
                            image: intent?.productImages?.[0],
                            link: `/tyres/${intent?.identifier}`
                        };
                        return (
                            <TopProductCard 
                                key={index} 
                                index={index} 
                                product={mappedProduct} 
                                bikeModel={category.name} 
                                className='w-full shrink-0 lg:w-[360px]'
                            />
                        );
                    })}
                </div>

                <div className="relative overflow-hidden rounded-3xl bg-zinc-950/60 border border-white/5 backdrop-blur-xl transition-all duration-500 hover:border-orange-500/20 ">
                    <div className="absolute -top-32 -left-32 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12 z-10">
                        <div className="flex flex-col gap-6 max-w-3xl text-left w-full">
                            <div className="space-y-3">
                                <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-orange-500 font-bold">
                                    Expert Assistance
                                </p>

                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-white uppercase tracking-tight">
                                    Find the Perfect <span className='text-orange-500'>{category?.name}</span> Tyres
                                </h2>

                                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                                    Not sure which tyre fits your specific riding geometry? Our performance tyre experts will confirm the perfect fitment size, real-time stock levels, and regional pricing for your motorcycle.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs md:text-sm text-zinc-400 w-full mt-2">
                                <div className="flex items-center gap-2">
                                    <FiShield className="text-green-500 text-base md:text-lg" />
                                    <span className="font-medium">Genuine Tyres</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <FiTag className="text-orange-500 text-base md:text-lg" />
                                    <span className="font-medium">Best Price</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <FiHeadphones className="text-blue-500 text-base md:text-lg" />
                                    <span className="font-medium">Expert Support</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <FiZap className="text-yellow-500 text-base md:text-lg" />
                                    <span className="font-medium">Fast Response</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[320px] shrink-0 items-center lg:items-stretch">
                            <div className="relative group/btn w-full">
                                <div className="absolute inset-0 bg-orange-500/20 rounded-xl blur-md opacity-40 group-hover/btn:opacity-75 transition-opacity duration-300" />
                                <WhatsAppButton
                                    text={
                                        <span>
                                            Consult Fitment Expert <span className="hidden md:inline">(Free)</span>
                                        </span>
                                    }
                                    value={`I'm looking for ${category?.name} tyres for my motorcycle. Can you help me find the best fitment, availability, and pricing?`}
                                    className="py-4 rounded-2xl w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <FAQSection faqs={category?.faqs} />
            </section>
        </div>
    );
}