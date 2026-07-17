'use client';
import React, { useState } from 'react'
import Carousel from '@/components/organisms/Carousel'
import ProductFamilyCard from '@/components/atoms/ProductFamilyCard';
import TyresService from '@/services/tyresService';
import { TyreCardSkeletonGroup } from '@/app/(home)/component/Tyre/TyreCardSkeleton';

function ProductFamilyFeatureCardClient({ recommendedTyre }) {
    const [tyres, setTyres] = useState(recommendedTyre || []);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(recommendedTyre?.pagination?.totalPages > 1);
    const [loading, setLoading] = useState(false);

    const handleReachEnd = async () => {
        if (hasMore && !loading) {
            setLoading(true);
            const nextPage = page + 1;
            const res = await TyresService.getTyreByFamily({ isNewLaunch: true, limit: 16, page: nextPage });
            
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
            <div className='flex mx-auto flex-col items-center text-center space-y-2'>
                <span className="text-orange-500 [.light-mode_&]:text-orange-700 text-[10px] font-black uppercase tracking-[0.5em] transition-colors duration-1000">NEW RELEASES</span>
                <h2 className='text-3xl md:text-5xl font-black uppercase tracking-tighter mt-2 text-black [.light-mode_&]:text-black [.dark-mode_&]:text-white transition-colors duration-1000'>
                    Fresh  <span className="text-orange-500 [.light-mode_&]:text-orange-600 transition-colors duration-1000">Stock</span>
                </h2>
            </div>

            <div className='w-full relative '>
                {tyres.length > 0 && (
                    <Carousel
                        items={tyres}
                        renderItem={(tyre) => (
                            <div className="px-2 w-full h-full">
                                <ProductFamilyCard tyre={tyre} />
                            </div>
                        )}
                        itemWidth="w-[280px] md:w-[300px]"
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