'use client';
import React, { useEffect } from 'react'
import TyreCard from '@/components/atoms/TyreCard'
import Carousel from '@/components/organisms/Carousel'
import useTyresStore from '@/stores/tyreStore'
import TyreCardSkeleton from '@/app/(home)/component/Tyre/TyreCardSkeleton'

function FeatureCard() {
    const { recommendedTyres, recommendedLoading, recommendedPage, hasMoreRecommended, fetchRecommendedTyres } = useTyresStore();
    console.log(recommendedTyres)

    useEffect(() => {
        if (recommendedTyres.length === 0) {
            fetchRecommendedTyres(1);
        }
    }, [fetchRecommendedTyres, recommendedTyres.length]);

    const handleReachEnd = () => {
        if (hasMoreRecommended && !recommendedLoading) {
            fetchRecommendedTyres(recommendedPage + 1);
        }
    };

    return (
        <div className='w-full flex flex-col gap-8 '>
            <div className='flex mx-auto flex-col items-center text-center space-y-2'>
                <span className="text-orange-500 [.light-mode_&]:text-orange-700 text-[10px] font-black uppercase tracking-[0.5em] transition-colors duration-1000">TOP PICKS</span>
                <h2 className='text-3xl md:text-5xl font-black uppercase tracking-tighter mt-2 text-black [.light-mode_&]:text-black [.dark-mode_&]:text-white transition-colors duration-1000'>
                    Featured <span className="text-orange-500 [.light-mode_&]:text-orange-600 transition-colors duration-1000">Products</span>
                </h2>
            </div>

            <div className='w-full relative px-2'>
                {recommendedTyres.length > 0 ? (
                    <Carousel
                        items={recommendedTyres}
                        renderItem={(tyre) => (
                            <div className="px-2 w-full h-full">
                                <TyreCard product={tyre}  />
                            </div>
                        )}
                        itemWidth="w-[280px] md:w-[300px]"
                        gap={4}
                        onReachEnd={handleReachEnd}
                        showArrows={true}
                        autoPlay={false}
                    >
                    </Carousel>
                ) : recommendedLoading ? (
                    <div className="flex gap-4 overflow-hidden px-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex-none w-[280px]">
                                <TyreCardSkeleton />
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default FeatureCard;