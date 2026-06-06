'use client';

import React, { useState } from 'react';
import BrandCard from '@/app/(home)/component/BrandCard';
import { FiSearch, FiBox, FiCompass } from 'react-icons/fi';
import WhatsAppButton from '@/components/atoms/WhatsAppButton';

function BrandCardSkeleton() {
    return (
        <div className="relative h-[200px] md:h-[180px] lg:h-[240px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-white/[0.02] border border-white/5 shadow-2xl w-full animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 space-y-4">
                <div className="w-16 h-2 bg-white/5 rounded-full" />
                <div className="flex justify-between items-center w-full">
                    <div className="w-32 h-6 bg-white/10 rounded-lg" />
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/5 border border-white/5" />
                </div>
            </div>
        </div>
    );
}

function BrandsClient({ brands = [] }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBrands = brands.filter(brand => {
        const name = (brand?.name || brand?.brandName || '').toLowerCase();
        return name.includes(searchQuery.toLowerCase());
    });

    return (
        <div className="space-y-4 py-4">
            <div className="flex flex-col items-start justify-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-orange-400">
                    Official Partnerships
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
                    Premium <span className="text-orange-500 outline-text text-transparent">Brands</span>
                </h1>
                <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
                    Discover elite tyre manufacturers engineered for safety, peak performance, and refined driving dynamics. We partner with the world's most trusted brands.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
                <div className="relative w-full sm:max-w-md group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-orange-500 transition-colors duration-300">
                        <FiSearch size={18} />
                    </div>
                    <input 
                        type="text"
                        placeholder="Search premium brands..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/[0.03] hover:bg-white/[0.05] focus:bg-zinc-950/60 border border-white/10 focus:border-orange-500/50 rounded-xl text-sm text-white placeholder-zinc-500 outline-none transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                    />
                </div>
                
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 self-start sm:self-auto bg-white/[0.02] border border-white/5 rounded-full px-4 py-2 select-none shadow-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>{filteredBrands.length} Partners verified</span>
                </div>
            </div>

            {!brands || brands.length === 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <BrandCardSkeleton key={i} />
                    ))}
                </div>
            ) : filteredBrands.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4">
                    {filteredBrands.map((brand) => (
                        <div 
                            key={brand._id || brand.name} 
                            className="transform hover:-translate-y-1.5 transition-all duration-300"
                        >
                            <BrandCard brand={brand} className="w-full" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center p-12 max-w-md mx-auto bg-white/[0.02] rounded-3xl border border-white/5 shadow-2xl mt-8 space-y-5 animate-[fadeIn_0.4s_ease-out]">
                    <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-400 shadow-md">
                        <FiBox size={28} className="text-orange-500/80" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider">No Brands Found</h3>
                        <p className="text-zinc-500 text-xs max-w-xs leading-relaxed">
                            We couldn't find any partners matching "{searchQuery}". Check the spelling or try searching another manufacturer.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2 w-full">
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="px-6 py-2.5 rounded-full bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 text-xs font-bold text-orange-400 uppercase tracking-widest transition-all active:scale-95 cursor-pointer"
                        >
                            Reset Search
                        </button>
                        <WhatsAppButton text="Talk to Specialist" value="Looking for a specific tyre brand" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default BrandsClient;