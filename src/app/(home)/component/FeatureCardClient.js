'use client';
import React, { useEffect, useRef } from 'react'
import TyreCard from '@/components/atoms/TyreCard'
import Carousel from '@/components/organisms/Carousel'
import useTyresStore from '@/stores/tyreStore'
import { TyreCardSkeletonGroup } from '@/app/(home)/component/Tyre/TyreCardSkeleton'

function FeatureCardClient({ initialTyres, initialPagination }) {
    const { recommendedTyres, recommendedLoading, recommendedPage, hasMoreRecommended, fetchRecommendedTyres } = useTyresStore();
    const isHydrated = useRef(false);

    useEffect(() => {
        if (!isHydrated.current && recommendedTyres.length === 0 && initialTyres?.length > 0) {
            useTyresStore.setState({
                recommendedTyres: initialTyres,
                recommendedPage: 1,
                hasMoreRecommended: 1 < initialPagination?.totalPages,
                recommendedLoading: false,
                recommendedError: null
            });
            isHydrated.current = true;
        } else if (recommendedTyres.length === 0 && !initialTyres?.length) {
            fetchRecommendedTyres(1);
        }
    }, [initialTyres, initialPagination, fetchRecommendedTyres, recommendedTyres.length]);

    const handleReachEnd = () => {
        if (hasMoreRecommended && !recommendedLoading) {
            fetchRecommendedTyres(recommendedPage + 1);
        }
    };

    const displayTyres = recommendedTyres.length > 0 ? recommendedTyres : initialTyres;

    return (
        <div className='w-full flex flex-col gap-8 '>
            <div className='flex mx-auto flex-col items-center text-center space-y-2'>
                <span className="text-orange-500 [.light-mode_&]:text-orange-700 text-[10px] font-black uppercase tracking-[0.5em] transition-colors duration-1000">TOP PICKS</span>
                <h2 className='text-3xl md:text-5xl font-black uppercase tracking-tighter mt-2 text-black [.light-mode_&]:text-black [.dark-mode_&]:text-white transition-colors duration-1000'>
                    Featured <span className="text-orange-500 [.light-mode_&]:text-orange-600 transition-colors duration-1000">Products</span>
                </h2>
            </div>

            <div className='w-full relative '>

                <Carousel
                    items={displayTyres}
                    renderItem={(tyre) => (
                        <div className="px-2 w-full h-full">
                            <TyreCard product={tyre} />
                        </div>
                    )}
                    itemWidth="w-[280px] md:w-[300px]"
                    gap={4}
                    onReachEnd={handleReachEnd}
                    showArrows={true}
                    autoPlay={false}
                >
                    {recommendedLoading && hasMoreRecommended && (
                        <div className="pl-2">
                            <TyreCardSkeletonGroup count={1} />
                        </div>
                    )}
                </Carousel>

            </div>
        </div>
    )
}

export default FeatureCardClient;
