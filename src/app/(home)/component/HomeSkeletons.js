import React from 'react';
import TyreCardSkeleton from '@/app/(home)/component/Tyre/TyreCardSkeleton';

export function FeatureCardSkeleton({ count = 4 }) {
    return (
        <div className='w-full flex flex-col gap-8 overflow-hidden animate-pulse my-10'>
            <div className='flex mx-auto flex-col items-center text-center space-y-2'>
                <div className="h-3 w-48 bg-orange-500/20 rounded-full" />
                <div className="h-10 md:h-12 w-64 md:w-96 bg-zinc-900/50 rounded-lg mt-2" />
            </div>
            <div className='w-full relative flex gap-4'>
                    {Array.from({ length: count }).map((_, i) => (
                            <TyreCardSkeleton key={i} className='w-[280pxx] md:w-[300px]' />
                    ))}
                </div>
        </div>
    );
}

export function CategorySkeleton() {
    return (
        <div className="w-full my-10 animate-pulse" id="category-skeleton">
            <div className="mb-10 text-center flex flex-col items-center">
                <div className="h-3 w-32 bg-orange-500/20 rounded-full" />
                <div className="h-10 md:h-12 w-64 md:w-96 bg-zinc-900/50 rounded-lg mt-2" />
            </div>
            <div className="flex flex-col gap-4">
                {[1, 2].map((rowIndex) => (
                    <div key={rowIndex} className="flex flex-col md:flex-row gap-4 h-[500px] lg:h-[450px]">
                        {[1, 2].map((idx) => (
                            <div key={idx} className="flex-1 bg-zinc-900/50 border border-zinc-800/30 rounded-[2rem] h-[250px] md:h-auto w-full" />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ValuePerformanceBrandsSkeleton() {
    return (
        <section className="py-8 w-full animate-pulse" id="value-brands-skeleton">
            <div className="mb-10 text-center flex flex-col items-center">
                <div className="h-3 w-48 bg-orange-500/20 rounded-full" />
                <div className="h-10 md:h-12 w-64 md:w-96 bg-zinc-900/50 rounded-lg mt-2" />
            </div>
            <div className="flex overflow-x-auto gap-4 w-full scrollbar-hide py-2">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="grid grid-cols-2 shrink-0 w-[360px] h-[120px] md:h-[140px] bg-white/20 rounded-3xl border border-zinc-800/30 p-4">
                        <div className="relative h-full bg-zinc-800/40 rounded-2xl animate-pulse" />
                        <div className="flex flex-col items-start gap-2 pl-4 justify-center">
                            <div className="h-4 w-20 bg-zinc-800/60 rounded-full animate-pulse" />
                            <div className="h-6 w-28 bg-zinc-800/60 rounded-lg animate-pulse" />
                            <div className="h-3.5 w-24 bg-zinc-800/40 rounded-full animate-pulse" />
                        </div>
                    </div>
                ))}
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
