'use client';

import React, { useState } from 'react';
import BrandCard from '@/app/(home)/component/BrandCard';
import { FiSearch, FiBox, FiCompass, FiCheckCircle } from 'react-icons/fi';
import WhatsAppButton from '@/components/atoms/WhatsAppButton';


function BrandCardSkeleton() {
    return (
        <div className="relative h-[200px] md:h-[180px] lg:h-[240px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-zinc-900/50 border border-white/5 shadow-2xl w-full backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent z-10" />
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-shimmer z-20" />

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 space-y-4 z-30">
                <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
                <div className="flex justify-between items-center w-full">
                    <div className="w-32 h-6 bg-white/10 rounded-lg overflow-hidden relative">
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/5 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </div>
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
        <>
            <div className="space-y-8 py-8 w-full max-w-[1400px] mx-auto">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
                    <div className="relative w-full sm:max-w-md group ">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-white transition-colors duration-300">
                            <FiSearch size={18} />
                        </div>
                        <input 
                            type="text"
                            placeholder="Search premium brands..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/[0.03] hover:bg-white/[0.05] focus:bg-zinc-950/60 border border-white/10 focus-within:bg-white/20 focus-within:border-white focus-within:ring-4 focus-within:ring-blue-500/20 focus-within:shadow-md cursor-text rounded-xl text-sm text-white placeholder-zinc-500 outline-none transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                        />
                    </div>
                    
                    <div className="hidden md:flex  items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 self-start sm:self-auto bg-white/[0.02] border border-white/5 rounded-full px-4 py-2 select-none shadow-md">
                        <FiCheckCircle className="text-emerald-500" size={14} />
                        <span>{filteredBrands.length} Partners verified</span>
                    </div>
                </div>

                {!brands || brands.length === 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <BrandCardSkeleton key={i} />
                        ))}
                    </div>
                ) : filteredBrands.length > 0 ? (
                    <div className="grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
                        {filteredBrands.map((brand, index) => (
                            <div 
                                key={brand._id || brand.name} 
                                style={{ animationDelay: `${index * 50}ms` }}
                            >


                                <BrandCard brand={brand} className="h-[200px] w-[20px] md:w-full md:h-full" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center p-12 max-w-xl mx-auto bg-gradient-to-b from-zinc-900/40 to-zinc-950/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 shadow-2xl mt-16 space-y-8">
                        <div className="relative w-28 h-28 flex items-center justify-center group">
                            <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl group-hover:bg-orange-500/30 transition-all duration-500" />
                            <div className="relative w-full h-full rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 shadow-inner group-hover:scale-105 transition-transform duration-500">
                                <FiBox size={42} className="text-orange-400/80 group-hover:text-orange-400 transition-colors duration-500" />
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tight">No Brands Found</h3>
                            <p className="text-zinc-400 text-base max-w-sm mx-auto leading-relaxed">
                                We couldn't find any partners matching <span className="text-white font-medium">"{searchQuery}"</span>. Check the spelling or explore other manufacturers.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 w-full">
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                Clear Search
                            </button>
                            <div className="w-full sm:w-auto">
                                <WhatsAppButton text="Talk to Specialist" value="Looking for a specific tyre brand" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default React.memo(BrandsClient);