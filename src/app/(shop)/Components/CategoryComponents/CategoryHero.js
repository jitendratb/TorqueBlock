'use client';

import React from 'react';
import { FiLayers } from 'react-icons/fi';

export default function CategoryHero() {
    return (
        <div className="relative mb-6">

            <div className="relative z-10 flex flex-col items-start space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] md:text-xs font-semibold uppercase tracking-widest text-orange-400 backdrop-blur-sm shadow-[0_0_15px_rgba(249,115,22,0.15)]">
                    <FiLayers size={14} className="mb-[1px]" />
                    <span>Curated Riding Styles</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95] uppercase">
                    Find the Best <br className="hidden md:block" />
                    <span className="text-transparent outline-text text-orange-500">Motorcycle</span>{' '}
                    <span className="text-transparent bg-clip-text bg-orange-500">
                        Tyres
                    </span>
                </h1>

                <p className="text-zinc-400 text-sm md:text-sm  leading-relaxed md:leading-loose">
                    Whether you ride on the track, tour across highways, commute daily, or explore off the beaten path, choosing the right motorcycle tyre makes all the difference. Compare performance tyres from Pirelli, Metzeler, and Michelin based on grip, mileage, comfort, wet-weather confidence, and riding conditions to find the perfect match for your bike.
                </p>
            </div>
        </div>
    );
}
