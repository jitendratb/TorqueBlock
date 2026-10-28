'use client';

import React from 'react';
import Carousel from '@/components/organisms/Carousel';
import PartnerCard from '@/components/molecules/PartnerCard';

export default function PartnersCarouselClient({ partners }) {
    if (!partners || partners.length === 0) return null;

    return (
        <Carousel
            items={partners}
            itemWidth={`w-full w-full sm:w-[300px] lg:w-[340px]`}
            gap={16}
            showArrows={true}
            showDots={false}
            renderItem={(partner, index) => (
                <PartnerCard key={partner._id || index} partner={partner} className="h-full w-full" />
            )}
        />
    );
}
