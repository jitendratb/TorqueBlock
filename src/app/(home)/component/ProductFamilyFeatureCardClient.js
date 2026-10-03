'use client';
import React, { useState } from 'react'
import Carousel from '@/components/organisms/Carousel'
import ProductFamilyCard from '@/components/atoms/ProductFamilyCard';
import TyresService from '@/services/tyresService';
import { TyreCardSkeletonGroup } from '@/app/(home)/component/Tyre/TyreCardSkeleton';

function ProductFamilyFeatureCardClient({ recommendedTyre }) {
    const [tyres, setTyres] = useState(recommendedTyre?.data || recommendedTyre || []);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(recommendedTyre?.pagination?.totalPages > 1);
    const [loading, setLoading] = useState(false);

    const handleReachEnd = async () => {
        if (hasMore && !loading) {
            setLoading(true);
            const nextPage = page + 1;
            const res = await TyresService.getTyreByFamily({ isBestSeller: true, limit: 16, page: nextPage });

            if (res?.success && res.data) {
                setTyres(prev => [...prev, ...res.data]);
                setPage(nextPage);
                setHasMore(nextPage < res.pagination?.totalPages);
            }
            setLoading(false);
        }
    };


    return (
        <div className='w-full flex flex-col gap-8 '>
            <div className='flex flex-col items-center text-center'>
                <div className='flex items-center gap-3'>
                    <span aria-hidden='true' className='h-px w-8 bg-gradient-to-r from-transparent to-orange-500/70 md:w-12' />
                    <span className='text-orange-500 [.light-mode_&]:text-orange-700 text-[10px] font-black uppercase tracking-[0.5em] transition-colors duration-1000'>
                        Trusted By Riders
                    </span>
                    <span aria-hidden='true' className='h-px w-8 bg-gradient-to-l from-transparent to-orange-500/70 md:w-12' />
                </div>

                <h2 className='text-2xl md:text-5xl [.light-mode_&]:text-black [.dark-mode_&]:text-white font-black uppercase tracking-tighter text-black transition-colors duration-1000'>
                    Best Selling <span className='text-orange-500 [.light-mode_&]:text-orange-600 transition-colors duration-1000'>Motorcycle Tyres</span>
                </h2>
            </div>

            <div className='w-full relative'>
                {tyres.length > 0 && (
                    <Carousel
                        items={tyres}
                        renderItem={(tyre) => (
                            <div className="px-2 w-full h-full">
                                <ProductFamilyCard tyre={tyre} />
                            </div>
                        )}
                        itemWidth="w-full md:w-[320px]"
                        gap={4}
                        onReachEnd={handleReachEnd}
                        showArrows={true}
                        autoPlay={false}
                    >
                        {loading && hasMore && (
                            <div className="pl-2">
                                <TyreCardSkeletonGroup count={2} />
                            </div>
                        )}
                    </Carousel>
                )}
            </div>
        </div>
    )
}

export default ProductFamilyFeatureCardClient;