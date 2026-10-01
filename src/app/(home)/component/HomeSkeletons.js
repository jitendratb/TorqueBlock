import React from 'react';
import TyreCardSkeleton from '@/app/(home)/component/Tyre/TyreCardSkeleton';
import SectionHeadingSkeleton from '@/components/atoms/SectionHeadingSkeleton';
import BrandCardSkeleton from './BrandCardSkeleton';

export function FeatureCardSkeleton({ count = 4 }) {
    return (
        <div className='w-full flex flex-col gap-8 overflow-hidden animate-pulse my-10'>
            <div className='flex mx-auto flex-col items-center text-center space-y-2'>
                <div className="h-3 w-48 bg-orange-500/20 rounded-full" />
                <div className="h-10 md:h-12 w-64 md:w-96 bg-zinc-900/50 rounded-lg mt-2" />
            </div>
            <div className='w-full relative flex gap-4 overflow-x-auto'>
                    {Array.from({ length: count }).map((_, i) => (
                            <TyreCardSkeleton key={i} className='w-[280px] md:w-[300px] shrink-0' />
                    ))}
                </div>
        </div>
    );
}

export function CategorySkeleton({ count = 4 }) {
    return (
        <div className="w-full animate-pulse" id="category-skeleton">
            <SectionHeadingSkeleton eyebrowClassName="w-32" headingClassName="w-60 md:w-[24rem]" />

            {/* Mirrors the carousel track: w-full on mobile, 360px from sm up */}
            <div className="flex w-full gap-4 overflow-hidden px-1">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="flex w-full shrink-0 sm:w-[360px]">
                        <div className="relative mt-8 mb-4 h-[430px] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#080d13] shadow-[0_18px_45px_rgba(0,0,0,0.32)]">
                            <div aria-hidden="true" className="absolute inset-0 bg-zinc-900/70" />
                            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,8,13,0.96)_0%,rgba(4,8,13,0.72)_34%,rgba(4,8,13,0.12)_72%,transparent_100%)]" />

                            {/* Corner arrow badge */}
                            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-end p-4 sm:p-5">
                                <div className="h-10 w-10 rounded-full border border-white/20 bg-black/30" />
                            </div>

                            <div className="absolute inset-x-0 bottom-0 z-10 p-4">
                                <div className="flex flex-col gap-2">
                                    {/* Category icon + name */}
                                    <div className="flex items-center gap-4">
                                        <div className="h-7 w-7 shrink-0 rounded-md bg-orange-500/30" />
                                        <div className="h-8 w-40 rounded-lg bg-zinc-800" />
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <div className="h-3.5 w-full rounded-full bg-white/15" />
                                        <div className="h-3.5 w-4/5 rounded-full bg-white/15" />
                                    </div>

                                    {/* Explore CTA */}
                                    <div className="flex h-11 w-full items-center justify-center rounded-lg border border-orange-500/40 bg-orange-500/5">
                                        <div className="h-2.5 w-24 rounded-full bg-orange-500/30" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ValuePerformanceBrandsSkeleton({ count = 4 }) {
    return (
        <section className="w-full animate-pulse" id="value-brands-skeleton">
            <SectionHeadingSkeleton eyebrowClassName="w-56" headingClassName="w-64 md:w-[28rem]" />

            {/* Mirrors the carousel track: fixed 370px items */}
            <div className="pt-8">
                <div className="flex w-full gap-4 overflow-hidden">
                    {Array.from({ length: count }).map((_, i) => (
                        <div key={i} className="flex w-[370px] shrink-0">
                            <BrandCardSkeleton />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function B2BEnterpriseSkeleton() {
    return (
        <section className="animate-pulse py-8" id="b2b-skeleton">
            <div className="inline-flex items-center gap-2 border border-zinc-800/30 bg-zinc-900/50 px-4 py-2 rounded-full mb-8">
                <div className="h-2.5 w-32 bg-orange-500/20 rounded-full" />
            </div>
            <div className="space-y-4">
                <div className="h-8 w-64 bg-zinc-900/50 rounded" />
                <div className="h-4 w-full max-w-lg bg-zinc-900/30 rounded" />
                <div className="h-4 w-4/5 max-w-lg bg-zinc-900/30 rounded" />
                <div className="space-y-3 pt-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="h-6 w-6 rounded-full bg-zinc-900/50" />
                            <div className="h-4 w-48 bg-zinc-900/40 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function ReviewsSectionSkeleton() {
    return (
        <section className="w-full my-10 animate-pulse" id="reviews-skeleton">
            <div>
                <div className="flex flex-col justify-start">
                    <div className="w-auto">
                        <div className="h-8 w-64 md:w-96 bg-zinc-900/50 rounded-lg mb-2" />
                        <div className="h-1 mt-2 lg:mt-3 mb-4 bg-orange-500/20 w-[150px] md:w-[250px] rounded-full" />
                    </div>
                </div>

                <div className="relative min-h-[350px] overflow-hidden">
                    <div className="absolute inset-0 z-10 flex flex-col w-full bg-black/90 pt-6 rounded-lg">
                        <div className="w-full px-4 mb-6">
                            <div className="bg-zinc-900/50 rounded-lg flex flex-col md:flex-row gap-4 items-center justify-between px-4 py-3">
                                <div className="flex flex-wrap gap-4 items-center">
                                    <div className="w-20 h-6 bg-zinc-800 rounded" />
                                    <div className="w-16 h-4 bg-zinc-800 rounded" />
                                    <div className="w-28 h-5 bg-zinc-800 rounded" />
                                    <div className="w-32 h-4 bg-zinc-800 rounded" />
                                </div>
                                <div className="w-32 h-10 border border-zinc-700 rounded-lg" />
                            </div>
                        </div>

                        <div className="flex overflow-hidden gap-6 w-full pb-4 mx-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="min-w-[300px] w-[300px] bg-zinc-900/50 border border-gray-800 p-6 rounded-xl flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-zinc-800 shrink-0" />
                                        <div className="flex flex-col gap-2">
                                            <div className="w-24 h-4 bg-zinc-800 rounded" />
                                            <div className="w-16 h-3 bg-zinc-800 rounded" />
                                        </div>
                                    </div>

                                    <div className="w-24 h-4 bg-zinc-800 rounded" />

                                    <div className="flex flex-col gap-2">
                                        <div className="w-full h-3 bg-zinc-800 rounded" />
                                        <div className="w-full h-3 bg-zinc-800 rounded" />
                                        <div className="w-full h-3 bg-zinc-800 rounded" />
                                        <div className="w-3/4 h-3 bg-zinc-800 rounded" />
                                        <div className="w-16 h-3 bg-zinc-800 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function FeaturedProductBannerSkeleton() {
    return (
        <div className="h-[96px] w-full animate-pulse rounded-2xl bg-zinc-900 ring-1 ring-white/10 sm:h-[120px] lg:h-[140px] [.light-mode_&]:ring-black/10">
            <div className="flex h-full items-center pl-6 sm:pl-10 lg:pl-14">
                <div className="h-6 w-56 rounded-md bg-zinc-800 sm:h-9 sm:w-80 lg:h-11 lg:w-[28rem]" />
            </div>
        </div>
    );
}
