'use client';

import React, { useMemo } from 'react';
import { FaMotorcycle } from 'react-icons/fa';
import CompatibleBikes from '../TyreComponent/CompatibleBikes';

// Shows linked bike pages when the size has them, else the plain popularBikes names.
function CompatibleBikesSection({ compatibleModel, popularBikes = [] }) {
    // CompatibleBikes reads `tyre.compatibleVehicles`; keep only populated bike pages
    const compatibleBikes = useMemo(() => {
        const bikes = Array.isArray(compatibleModel)
            ? compatibleModel.filter((bike) => bike && typeof bike === 'object')
            : [];
        return { compatibleVehicles: bikes };
    }, [compatibleModel]);
    const hasCompatibleModel = compatibleBikes.compatibleVehicles.length > 0;

    if (!hasCompatibleModel && popularBikes.length === 0) return null;

    return (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex border-b border-white/10 pb-4 mb-4 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                    <FaMotorcycle className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                </div>
                <div className="flex flex-col flex-1">
                    <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                        Compatible Bikes
                    </h2>
                    <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                        Engineered for Perfect Fitment
                    </p>
                </div>
            </div>
            {hasCompatibleModel ? (
                <div className="relative z-10">
                    <CompatibleBikes tyre={compatibleBikes} />
                </div>
            ) : (
                <div className="flex flex-wrap gap-2.5 md:gap-3 relative z-10">
                    {popularBikes.map((bike, idx) => (
                        <div
                            key={idx}
                            className="group/bike flex items-center gap-2.5 px-3.5 py-2 md:px-4 md:py-2.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-xs md:text-sm font-semibold text-zinc-300 hover:text-white hover:-translate-y-0.5 hover:border-orange-500/40 hover:shadow-[0_8px_20px_-8px_rgba(249,115,22,0.25)] transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/bike:opacity-100 pointer-events-none" />
                            <FaMotorcycle className="relative z-10 text-zinc-500 group-hover/bike:text-orange-500 text-sm md:text-base transition-colors duration-300 shrink-0" />
                            <span className="relative z-10">{bike}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CompatibleBikesSection;
