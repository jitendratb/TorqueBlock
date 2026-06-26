'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiTarget, FiCloudRain, FiMap, FiSettings } from 'react-icons/fi';
import WhatsAppButton from '@/components/atoms/WhatsAppButton';

const getDeterministicRating = (id = '') => {
    let hash = 0;
    const str = String(id || 'default');
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const val = 4.5 + (Math.abs(hash) % 6) * 0.1;
    return val.toFixed(1);
};

export default function ProductCard({ item }) {
    const router = useRouter();
    const rating = getDeterministicRating(item._id || item.identifier);
    const quickFacts = item.aiSearch?.quickFacts || {};

    const price = item.pricing?.frontTyrePrice || item.pricing?.rearTyrePrice || item.pricing?.comboPrice || null;

    return (
        <article onClick={() => router.push(`/tyres/${item.identifier}`)} className="group cursor-pointer grid grid-cols-1 md:grid-cols-[40%_60%] md:h-[260px] rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:bg-zinc-800/60 hover:border-orange-500/50 transition-all duration-300">
            <div className="relative h-[180px] md:h-full w-full overflow-hidden bg-zinc-950 flex items-center justify-center p-4">
                <Image
                    src={item.hero?.heroImage || '/placeholder-tyre.jpg'}
                    alt={item.productName || item.hero?.title || "Motorcycle Tyre"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="object-contain transition duration-700 ease-out group-hover:scale-110 group-hover:-rotate-6"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                {item.categoryId?.name && (
                    <div className="absolute top-4 left-4 rounded-full border border-orange-500/30 bg-orange-500/20 px-3 py-1 text-[10px] uppercase text-orange-500 backdrop-blur-md font-semibold tracking-widest z-10">
                        {item.categoryId.name}
                    </div>
                )}
            </div>

            <div className="p-5 flex flex-col justify-between h-full relative z-10">
                <div className='space-y-2 min-h-0 flex-1 flex flex-col justify-start'>
                    <div className="flex items-start justify-between gap-4">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if(item.brand?.identifier) router.push(`/brands/${item.brand.identifier}`);
                            }}
                            className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-orange-400/80 hover:text-white transition-colors"
                        >
                            {item.brand?.name || 'Brand'}
                        </button>
                        <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
                            <span className="text-yellow-500 text-xs">★</span>
                            <span className="text-zinc-300 text-xs font-medium">{rating}</span>
                        </div>
                    </div>
                    
                    <h3 className="text-xl lg:text-2xl font-black text-white leading-snug line-clamp-2 uppercase tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-orange-400 transition-all duration-500">
                        {item.productName || item.hero?.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 text-xs text-zinc-400 pt-1">
                        {item?.commonlyUsedOn && (
                            <span className="rounded-full bg-white/10 text-zinc-300 px-3 py-1 truncate max-w-[200px]">
                                {item.commonlyUsedOn}
                            </span>
                        )}

                        {item?.rearSizes?.length > 0 && (
                            <span className="rounded-full bg-white/10 text-zinc-300 px-3 py-1">
                                {item.rearSizes.length} Sizes Available
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-auto pt-3 border-t border-zinc-800/40 text-[11px] text-zinc-400">
                        <div className="flex items-center gap-1.5 min-w-0" title={quickFacts.bestUse || item.bestSuitedFor?.[0]}>
                            <FiTarget className={`text-orange-400 shrink-0 text-xs w-3.5 h-3.5 ${(!quickFacts?.bestUse && !item.bestSuitedFor?.[0]) && "hidden"}`} />
                            <span className="truncate">
                                <span className={`text-zinc-500 font-medium ${(!quickFacts?.bestUse && !item.bestSuitedFor?.[0]) && "hidden"}`}>Use:</span> {quickFacts?.bestUse || item.bestSuitedFor?.[0]}
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5 min-w-0" title={quickFacts?.wetGrip || item?.bestSuitedFor?.[1]}>
                            <FiCloudRain className={`text-orange-400 shrink-0 text-xs w-3.5 h-3.5 ${(!quickFacts?.wetGrip && !item.bestSuitedFor?.[1]) && "hidden"}`} />
                            <span className="truncate">
                                <span className={`text-zinc-500 font-medium ${(!quickFacts?.wetGrip && !item.bestSuitedFor?.[1]) && "hidden"}`}>Wet:</span> {quickFacts?.wetGrip || item.bestSuitedFor?.[1]}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-end justify-between mt-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">Starting From</span>
                        {price ? (
                            <span className="text-xl font-bold text-white">₹{price.toLocaleString('en-IN')}</span>
                        ) : (
                            <span className="text-sm font-semibold text-orange-400">Price on Request</span>
                        )}
                    </div>
                    <WhatsAppButton 
                        value={`I'm interested in the ${item.productName || item.hero?.title}. Can you share more details and current pricing?`} 
                        text='Check Deals' 
                        className="py-2 px-4 h-auto text-xs" 
                    />
                </div>
            </div>
        </article>
    );
}
