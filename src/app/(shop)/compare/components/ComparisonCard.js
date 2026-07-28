import React from 'react';
import Link from 'next/link';
import Image from '@/components/molecules/CustomImage';
import { FiArrowRight, FiCheckCircle, FiLayers } from 'react-icons/fi';

const parseTyreName = (name) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
        const brand = parts[0].toUpperCase();
        const model = parts.slice(1).join(' ').toUpperCase();
        return { brand, model };
    }
    return { brand: 'PREMIUM', model: name.toUpperCase() };
};

const ComparisonCard = ({ comparison, index }) => {
    const parts = (comparison?.identifier || '').split('-vs-');

    const tyre1Name = comparison?.tyre1?.name || comparison?.tyre1Id?.productName || (parts[0] ? parts[0].replace(/-/g, ' ') : 'TYRE 1');
    const tyre2Name = comparison?.tyre2?.name || comparison?.tyre2Id?.productName || (parts[1] ? parts[1].replace(/-/g, ' ') : 'TYRE 2');

    const tyre1Image = comparison?.tyre1?.image || comparison?.tyre1Id?.heroImage || comparison?.tyre1Id?.image || null;
    const tyre2Image = comparison?.tyre2?.image || comparison?.tyre2Id?.heroImage || comparison?.tyre2Id?.image || null;

    const t1 = parseTyreName(tyre1Name);
    const t2 = parseTyreName(tyre2Name);

    console.log(comparison)

    return (
        <Link
            href={`/compare/${comparison.identifier || '#'}`}
            className="group relative flex flex-col h-[20rem] bg-white/10 hover:bg-white/15 backdrop-blur-md border border-zinc-800 hover:border-zinc-700/60 rounded-2xl overflow-hidden transition-all duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
        >


            <div className="flex items-center justify-end px-4 pt-4 pb-2 relative z-20">
                <span className="flex items-center gap-1.5 text-[8px] font-mono tracking-wider text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20 font-bold">
                    <FiCheckCircle size={10} className="stroke-[2.5] text-orange-400" /> VERIFIED
                </span>
            </div>

            <div className="flex-1 grid grid-cols-2 relative min-h-0 z-10 px-2 ">

                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-r border-zinc-800/40 group-hover:border-zinc-700/40 transition-colors duration-500 pointer-events-none" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-8 h-8 rounded-full bg-orange-500/30 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />

                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:border-orange-500 group-hover:bg-white/10 group-hover:scale-110 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-all duration-500 relative">
                            <span className="text-white/90 group-hover:text-orange-500 text-[10px] font-black tracking-widest font-mono transition-colors duration-500 relative z-10">VS</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-start p-1 text-center relative">

                    <div className="relative w-full h-[8rem]  transition-transform duration-500 group-hover:scale-105 z-10">
                        {tyre1Image ? (
                            <Image src={tyre1Image} alt={tyre1Name} fill imageClassName="object-contain object-center" />
                        ) : (
                            <div className="w-full h-full bg-zinc-800/20 rounded-xl" />
                        )}
                    </div>
                    <div className="flex flex-col items-center z-10">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-orange-500/80 font-bold mb-1">{t1.brand}</span>
                        <h3 className="text-xs font-black text-zinc-200 leading-snug tracking-tight line-clamp-2 px-2 transition-colors group-hover:text-white">
                            {t1.model}
                        </h3>
                        <span className="mt-3 flex items-center gap-1 text-[8px] font-mono tracking-widest bg-white/5 border border-white/10 px-2 py-1 backdrop-blur-sm rounded text-zinc-300 uppercase">
                            <FiLayers size={10} className="text-orange-500" />
                            {comparison?.tyre1?.categoryName}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-start p-1 text-center relative">
                   
                    <div className="relative w-full h-[8rem] transition-transform duration-500 group-hover:scale-105 z-10">
                        {tyre2Image ? (
                            <Image src={tyre2Image} alt={tyre2Name} fill imageClassName="object-contain object-center" />
                        ) : (
                            <div className="w-full h-full bg-zinc-800/20 rounded-xl" />
                        )}
                    </div>
                    <div className="flex flex-col items-center z-10">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-blue-400/80 font-bold mb-1">{t2.brand}</span>
                        <h3 className="text-xs font-black text-zinc-200 leading-snug tracking-tight line-clamp-2 px-2 transition-colors group-hover:text-white">
                            {t2.model}
                        </h3>
                        <span className="mt-3 flex items-center gap-1 text-[8px] font-mono tracking-widest bg-white/5 border border-white/10 px-2 py-1 backdrop-blur-sm rounded text-zinc-300 uppercase">
                            <FiLayers size={10} className="text-blue-400" />
                            {comparison?.tyre2?.categoryName}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-auto px-6 py-3 bg-white/5 border-t border-white/10 flex items-center justify-between text-white/60 group-hover:text-orange-400 group-hover:bg-white/10 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="text-[9px] font-mono font-bold tracking-[0.25em] uppercase z-10">ANALYZE SPECS</span>
                <FiArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-500 z-10" />
            </div>
        </Link>
    );
};

export default React.memo(ComparisonCard);
