'use client';

import React, { useState } from 'react';
import CategoryHero from './CategoryHero';
import StatsBar from './StatsBar';
import CategorySearchBar from './CategorySearchBar';
import CategoryCard from './CategoryCard';
import CategoryCardSkeleton from './CategoryCardSkeleton';
import CategoryEmptyState from './CategoryEmptyState';
import CategoryCTABanner from './CategoryCTABanner';

export default function CategoryClient({ categories = [] }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = categories.filter(c => {
        const name = (c?.name || c?.categoryName || '').toLowerCase();
        return name.includes(searchQuery.toLowerCase());
    });

    const [featured, ...rest] = filtered;

    return (
        <div className="space-y-4 py-4">
            <CategoryHero />
            {categories.length > 0 && <StatsBar count={categories.length} />}

            <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-8" />
            {!categories || categories.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[280px]">
                    <CategoryCardSkeleton featured />
                    {Array.from({ length: 4 }).map((_, i) => (
                        <CategoryCardSkeleton key={i} />
                    ))}
                </div>

            ) : filtered.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[280px]">
                    {featured && (
                        <CategoryCard category={featured} featured index={0} />
                    )}
                    {rest.map((cat, i) => (
                        <CategoryCard
                            key={cat._id || cat.name || i}
                            category={cat}
                            index={i + 1}
                        />
                    ))}
                </div>
            )}

            {/* {categories.length > 0 && <CategoryCTABanner />} */}
        </div>
    );
}
