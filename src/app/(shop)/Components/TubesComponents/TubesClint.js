'use client';
import React, { useEffect, useRef } from 'react';
import useTubeStore from '@/stores/tubeStore';
import TubesList from './TubesList';
import RefreshButton from '../RefreshButton';
import TubeCardSkeleton from './TubeCardSkeleton';

export default function TubesClint({ initailTubes }) {
    const { tubes, loading, error, fetchTubes, hasMore, page, setInitialTubes } = useTubeStore();
    const observerTarget = useRef(null);
    const initialized = useRef(false);

    const ssrTubes = initailTubes?.data?.data || initailTubes?.data || initailTubes || [];
        useEffect(() => {
        if (!initialized.current) {
            if (initailTubes) {
                setInitialTubes(initailTubes);
            } else {
                fetchTubes({ page: 1, limit: 16 });
            }
            initialized.current = true;
        }
    }, [initailTubes, setInitialTubes, fetchTubes]);

    const displayTubes = tubes.length > 0 ? tubes : ssrTubes;

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    fetchTubes({ page: page + 1, limit: 16 });
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasMore, loading, page, fetchTubes]);

    if (error && displayTubes.length === 0) {
        return (
            <div className="flex min-h-[40vh] items-center justify-center rounded-xl bg-zinc-900/30 border border-zinc-800/50 p-8 text-center mt-6">
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-zinc-200">
                        Unable to load tubes
                    </h2>
                    <p className="text-zinc-400">
                        {error}
                    </p>
                    <RefreshButton />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <TubesList tubes={displayTubes} />
            
            {(loading || hasMore) && (
                <div ref={observerTarget} className="w-full pb-10 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[...Array(displayTubes.length === 0 ? 8 : 4)].map((_, i) => (
                            <TubeCardSkeleton key={`skeleton-${i}`} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}