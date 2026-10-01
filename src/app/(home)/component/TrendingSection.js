import React from 'react';
import TrendCard from '@/components/atoms/TrendCard';
import trendingService from '@/services/trending.service';
import TrendingCarouselClient from './TrendingCarouselClient';

async function TrendingSection() {
    let trendingProducts = [];

    try {
        const res = await trendingService.fetchAllTrending({ trendFirst: true });
        trendingProducts = res?.data || [];
    } catch (error) {
        console.error("Failed to fetch trending section items:", error);
        return null;
    }

    if (!trendingProducts || trendingProducts.length === 0) {
        return null;
    }

    return (
        <section className='' id='trending-section'>
            <div className='flex py-4 flex-col items-center text-center'>
                <div className='flex items-center gap-3'>
                    <span aria-hidden='true' className='h-px w-8 bg-gradient-to-r from-transparent to-orange-500/70 md:w-12' />
                    <span className='text-orange-500 [.light-mode_&]:text-orange-700 text-[10px] font-black uppercase tracking-[0.5em] transition-colors duration-1000'>
                        Top Performance
                    </span>
                    <span aria-hidden='true' className='h-px w-8 bg-gradient-to-l from-transparent to-orange-500/70 md:w-12' />
                </div>

                <h2 className='text-2xl md:text-5xl [.light-mode_&]:text-black [.dark-mode_&]:text-white font-black uppercase tracking-tighter text-black transition-colors duration-1000'>
                    Featured <span className='text-orange-500 [.light-mode_&]:text-orange-600 transition-colors duration-1000'>Upgrades</span>
                </h2>
            </div>

            <TrendingCarouselClient trendingProducts={trendingProducts} />
        </section>
    )
}

export default TrendingSection;