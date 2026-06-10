'use client';

import React from 'react';
import Carousel from '@/components/organisms/Carousel';
import TrendCard from '@/components/atoms/TrendCard';

export default function TrendingCarouselClient({ trendingProducts }) {
    if (!trendingProducts || trendingProducts.length === 0) return null;

    return (
        <Carousel
            items={trendingProducts}
            itemWidth={360}
            gap={16}
            showArrows={true}
            showDots={false}
            renderItem={(item, index) => (
                <TrendCard key={index} item={item} className="w-full shrink-0" />
            )}
        />
    );
}
