"use client";
import React, { useState, useEffect } from 'react'
import CustomImage from '@/components/molecules/CustomImage'
import { FiEye, FiHeart, FiAward } from 'react-icons/fi'
import { FaMotorcycle } from 'react-icons/fa6'
import { GiCarWheel } from 'react-icons/gi'
import { useRouter } from 'next/navigation';

function TrendingFirstCard({ trendingFirst }) {
    const router = useRouter();
    const bikeModel = trendingFirst?.bike?.bikeModel
    const bikeBrnad = trendingFirst?.bike?.bikeId?.brandId?.brandName

    return (
        <div onClick={() => router.push(`/trending/${trendingFirst?.slug}`)} className='relative w-full lg:max-w-5xl h-[400px] lg:h-[450px] rounded-[1rem] overflow-hidden  group cursor-pointer ring-1 ring-white/10 ring-inset bg-zinc-950'>
            {trendingFirst?.bannerImage ? (
                <CustomImage
                    src={trendingFirst.bannerImage}
                    alt={trendingFirst.tagline || trendingFirst.name || "Trending Tyre Banner"}
                    fill
                    imageClassName='object-cover transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:-translate-y-2'
                    priority={true}
                />
            ) : (
                <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
            )}

            <div className='absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500' />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent w-2/3" />

            <div className="absolute lg:top-6 lg:left-6 top-2 left-2 flex items-center gap-2 bg-orange-500/20 backdrop-blur-md border border-orange-500/40 rounded-full lg:px-2 lg:py-1.5 px-2 py-0.5">
                <FiAward className="text-orange-400  text-sm" />
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-300">
                    #{trendingFirst?.sortOrder} Trending · {trendingFirst?.trendType}
                </span>
            </div>

            <div className='absolute bottom-0 md:bottom-6 lg:bottom-4  inset-x-0 p-2 lg:p-6 flex flex-col sm:flex-row justify-end sm:justify-between items-start sm:items-end gap-4 sm:gap-6 h-full z-10'>

                <div className='flex flex-col gap-6 lg:flex-1 w-full lg:max-w-3xl '>
                    <div className='flex flex-wrap items-center gap-3 transform sm:translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-75'>
                        <div className='flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-white px-2 md:px-4 py-1 lg:py-1.5 rounded-full text-xs font-medium shadow-xl'>
                            <FaMotorcycle className="text-zinc-300" />
                            <span>{bikeBrnad} {bikeModel}</span>
                        </div>
                        <div className='flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-white px-2 md:px-4 py-1 lg:py-1.5 rounded-full text-xs  font-medium shadow-xl'>
                            <GiCarWheel className="text-zinc-300" />
                            <span>{trendingFirst?.productId?.productName}</span>
                        </div>
                    </div>

                    <div>
                        <h1 className='text-xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-2 sm:mb-4 leading-none transform sm:translate-y-8 opacity-100 sm:opacity-90 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out'>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-orange-400 bg-[length:200%_auto] bg-left group-hover:bg-right transition-[background-position] duration-700 ease-out uppercase tracking-tighter leading-none drop-shadow-md">{trendingFirst?.name} </span>
                            <span className="text-white/80 bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">{trendingFirst?.tyreModel}</span>
                        </h1>
                        <p className='text-xs lg:text-sm text-zinc-300 max-w-2xl font-light italic line-clamp-2 transform sm:translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-150'>
                            {trendingFirst?.shortDescription}
                        </p>
                    </div>
                </div>

         

            </div>
        </div>
    )
}

export default TrendingFirstCard