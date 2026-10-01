'use client';

import React from 'react';
import Carousel from '@/components/organisms/Carousel';
import PerformanceBrandCard from './PerformanceBrandCard';

export default function BrandsCarouselClient({ brands }) {
    if (!brands || brands.length === 0) return null;

    return (
        <Carousel
            items={brands}
            itemWidth={`w-full sm:w-[360px] lg:w-[calc((100%-2rem)/3)]`}
            gap={16}
            showArrows={true}
            showDots={false}
            renderItem={(brand, index) => (
                <PerformanceBrandCard key={brand._id || index} brand={brand} />
            )}
        />
    );
}
