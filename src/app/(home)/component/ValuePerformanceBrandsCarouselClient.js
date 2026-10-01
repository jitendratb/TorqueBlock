'use client';

import React from 'react';
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import CustomImage from "@/components/molecules/CustomImage";
import Carousel from "@/components/organisms/Carousel";
import { getCategoryPreset } from "./performanceBrandPresets";
import PerformanceBrandCard from './PerformanceBrandCard';

const MAX_CHIPS = 3;

export default function ValuePerformanceBrandsCarouselClient({ brands }) {
    if (!brands || brands.length === 0) return null;
    return (
        <Carousel
            items={brands}
            itemWidth={`w-full sm:w-[360px]`}
            gap={16}
            showArrows={true}
            showDots={false}
            renderItem={(brand, index) => {
                return (
               < PerformanceBrandCard key={brand._id || index} brand={brand} />
                );
            }}
        />
    );
}
