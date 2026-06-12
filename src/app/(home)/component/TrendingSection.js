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
        <section className='py-4'>
            <div className='flex flex-col items-center mb-8 text-center space-y-2'>
                <span className="text-orange-500 [.light-mode_&]:text-orange-700 text-[10px] font-black uppercase tracking-[0.5em] transition-colors duration-1000">Real-Time Data</span>
                <h2 className='text-3xl md:text-5xl font-black uppercase tracking-tighter mt-2 text-black transition-colors duration-1000'>
                    Trending on <span className="text-orange-500 [.light-mode_&]:text-orange-600 transition-colors duration-1000"> Torque Block</span>
                </h2>
            </div>

            <TrendingCarouselClient trendingProducts={trendingProducts} />
        </section>
    )
}

export default TrendingSection;