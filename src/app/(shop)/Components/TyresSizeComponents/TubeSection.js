"use client";

import React, { useEffect, useState } from 'react';
import TubeCard from '../TubesComponents/TubeCard';
import TubesService from '@/services/TubesService';
import { GiCarWheel } from 'react-icons/gi';
import Carousel from '@/components/organisms/Carousel';

export default function TubeSection({ productId, productIds }) {
    const [tubes, setTubes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const rawIds = productIds || productId;
        const idsArray = Array.isArray(rawIds) ? rawIds.filter(Boolean) : rawIds ? [rawIds] : [];

        if (idsArray.length === 0) {
            setTubes([]);
            setLoading(false);
            return;
        }

        let isMounted = true;

        const fetchTubes = async () => {
            setLoading(true);
            try {
                const response = await TubesService.getTubesByProductId(idsArray);
                if (isMounted && response?.data) {
                    const fetchedTubes = Array.isArray(response.data)
                        ? response.data
                        : (response.data.data || []);
                    setTubes(fetchedTubes);
                }
            } catch (error) {
                console.error("Error loading matching tubes:", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchTubes();

        return () => {
            isMounted = false;
        };
    }, [productId, JSON.stringify(productIds)]);

    if (loading) {
        return (
            <div className="w-full bg-zinc-900/40 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                        <GiCarWheel className="text-xl animate-spin" />
                    </div>
                    <div className="space-y-1">
                        <div className="h-4 w-36 bg-white/10 rounded-lg animate-pulse" />
                        <div className="h-3 w-48 bg-white/5 rounded-lg animate-pulse" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2].map((n) => (
                        <div key={n} className="h-64 rounded-3xl bg-white/5 border border-white/5 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (!tubes || tubes.length === 0) {
        return null;
    }

    return (
        <section className="">
            <div className="relative flex border-b border-white/10 pb-4 mb-4 items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                    <GiCarWheel className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between flex-1">
                    <div>
                        <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                            Recommended Inner Tubes
                        </h2>
                        <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                            Compatible Accessories & Inner Tubes
                        </p>
                    </div>
                </div>
            </div>

            <div className="">
               <Carousel 
               items={tubes} 
               itemWidth={"w-[280px] md:w-[300px]"}
               renderItem={(tube) => <TubeCard key={tube._id} tube={tube} addToCartStatus={true} />} />
            </div>
        </section>
    );
}