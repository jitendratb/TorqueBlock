'use client';
import React, { useState } from 'react';
import { FaMotorcycle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { FiArrowUpRight, FiMousePointer } from 'react-icons/fi';
import { TbCheck, TbX, TbThumbUp, TbThumbDown } from 'react-icons/tb';
function Description({ tyre, desClassName = "space-y-2", sizesClassName }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();

    const sizesIdsFront = tyre?.sizesIds?.filter(item => item.position === 'Front') || [];
    const Front = sizesIdsFront.length > 0 ? sizesIdsFront : (tyre?.frontSizes || []);

    const sizesIdsRear = tyre?.sizesIds?.filter(item => item.position === 'Rear') || [];
    const Rear = sizesIdsRear.length > 0 ? sizesIdsRear : (tyre?.rearSizes || []);

    const handleSizeClick = (item) => {
        if (!item) return;
        const sizeValue = typeof item === 'object' ? item?.size : item;
        if (!sizeValue) return;
        router.push(`/products/${tyre?.identifier}/${sizeValue.toLowerCase().replace(/[\s/]/g, '-')}`);
    };

    return (
        <div className="space-y-4">
            <div className={desClassName}>
                <h2 className="text-sm md:text-lg font-semibold uppercase tracking-[0.25em] text-orange-500">
                    Description
                </h2>
                <div>
                    <p className="text-xs md:text-base text-zinc-400" style={!isExpanded ? { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', } : {}} >
                        {tyre?.description || tyre?.hero?.subtitle}
                    </p>
                    {(tyre?.description || tyre?.hero?.subtitle) && (
                        <button onClick={() => setIsExpanded(!isExpanded)} className="text-orange-500 hover:text-orange-400 text-xs md:text-sm font-semibold mt-1"  >
                            {isExpanded ? 'Hide' : 'more'}
                        </button>
                    )}
                </div>
            </div>
            <section className={`border-t border-white/10  my-4 ${sizesClassName}`}>
                <div className="">
                    <div className="space-y-4 py-4">
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 justify-between">
                            <h2 className="text-sm md:text-lg font-bold uppercase tracking-[0.25em] text-orange-500">
                                Select Your Size
                            </h2>
                            {tyre?.sizesIds?.length > 0 ? (
                                <span className="text-[10px] md:text-xs text-orange-500 font-semibold bg-orange-500/5 px-2.5 py-1 rounded-full border border-orange-500/10">
                                    Interactive Size Specs Available
                                </span>
                            ) : (
                                <span className="text-[10px] md:text-xs text-zinc-500 font-medium">
                                    Select your motorcycle size below
                                </span>
                            )}
                        </div>

                        <div className="space-y-4">
                            {Front.length > 0 && (
                                <div className="flex flex-wrap items-center gap-4">
                                    <span className="text-zinc-500 font-extrabold text-[10px] md:text-xs uppercase tracking-[0.15em] w-14 shrink-0">
                                        Front
                                    </span>

                                    <div className="flex flex-wrap gap-2.5">
                                        {Front.map((item) => {
                                            const isInteractive = typeof item === 'object';
                                            const sizeValue = isInteractive ? item?.size : item;
                                            const sizeId = isInteractive ? item?._id : item;
                                            return isInteractive ? (
                                                <button
                                                    key={sizeId}
                                                    onClick={() => handleSizeClick(item)}
                                                    className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded border border-white/10 bg-zinc-900/60 hover:bg-zinc-900 hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] text-xs md:text-sm text-zinc-300 hover:text-white font-semibold transition-all duration-300 cursor-pointer"
                                                >
                                                    <span>{sizeValue}</span>
                                                    <FiArrowUpRight className="text-zinc-500 group-hover:text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-xs md:text-sm" />
                                                </button>
                                            ) : (
                                                <span
                                                    key={sizeId}
                                                    onClick={() => handleWhatsapp(item)}
                                                    className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded border border-white/10 bg-zinc-900/60 hover:bg-zinc-900 hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] text-xs md:text-sm text-zinc-300 hover:text-white font-semibold transition-all duration-300 cursor-pointer"
                                                >
                                                    {sizeValue}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {Rear.length > 0 && (
                                <div className="flex flex-wrap items-center gap-4">
                                    <span className="text-zinc-500 font-extrabold text-[10px] md:text-xs uppercase tracking-[0.15em] w-14 shrink-0">
                                        Rear
                                    </span>

                                    <div className="flex flex-wrap gap-2.5">
                                        {Rear.map((item) => {
                                            const isInteractive = typeof item === 'object';
                                            const sizeValue = isInteractive ? item?.size : item;
                                            const sizeId = isInteractive ? item?._id : item;
                                            return isInteractive ? (
                                                <button
                                                    key={sizeId}
                                                    onClick={() => handleSizeClick(item)}
                                                    className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded border border-white/10 bg-zinc-900/60 hover:bg-zinc-900 hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] text-xs md:text-sm text-zinc-300 hover:text-white font-semibold transition-all duration-300 cursor-pointer"
                                                >
                                                    <span>{sizeValue}</span>
                                                    <FiArrowUpRight className="text-zinc-500 group-hover:text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-xs md:text-sm" />
                                                </button>
                                            ) : (
                                                <span
                                                    key={sizeId}
                                                    onClick={() => handleWhatsapp(item)}
                                                    className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded border border-white/10 bg-zinc-900/60 hover:bg-zinc-900 hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] text-xs md:text-sm text-zinc-300 hover:text-white font-semibold transition-all duration-300 cursor-pointer"
                                                >
                                                    {sizeValue}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="border-t border-white/10 "></div>
                    <div className="py-4">
                        <h2 className="text-sm md:text-lg font-semibold uppercase tracking-[0.25em] text-orange-500">
                            Commonly Used On
                        </h2>

                        <div className="space-y-2">
                            <p className="text-xs md:text-md text-zinc-200 leading-relaxed">
                                {tyre?.commonlyUsedOn}
                            </p>

                            <div className="flex flex-wrap gap-2">
                       
                                  {  tyre?.compatibleVehicles?.map((brand, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 rounded border border-white/10 bg-zinc-900 text-xs md:text-sm text-white font-semibold hover:border-orange-500 hover:bg-zinc-800 transition-all duration-300"
                                        >
                                            <FaMotorcycle className="text-orange-500 text-sm md:text-base" />
                                            <span>{brand?.bike?.brandId?.brandName} {brand?.bike?.modelName}</span>
                                        </div>
                                  ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            {(tyre?.pros?.length > 0 || tyre?.cons?.length > 0) && (
                <section className="relative border-t border-white/10 mt-4 py-4">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-sm md:text-lg font-semibold uppercase tracking-[0.25em] text-orange-500">
                                Performance Analysis
                            </h2>
                            <p className="text-zinc-400 text-xs">
                                Real-world strengths and limitations of this tyre.
                            </p>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {tyre?.pros?.length > 0 && (
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900/30 to-zinc-950/60 border border-white/20 backdrop-blur-md p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:shadow-[0_12px_24px_-10px_rgba(16,185,129,0.15)]">
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                            <TbThumbUp className="text-lg md:text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm md:text-base font-bold text-zinc-100">
                                                Advantages
                                            </h3>
                                            <p className="text-[10px] text-zinc-500 font-medium">
                                                What riders love about this tyre
                                            </p>
                                        </div>
                                    </div>

                                    <ul className="space-y-2.5">
                                        {tyre.pros?.slice(0,6).map((pro, index) => (
                                            <li key={index} className="group flex items-start gap-3 text-xs md:text-sm text-zinc-300 hover:text-white transition-colors duration-200">
                                                <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors mt-0.5">
                                                    <TbCheck size={14} strokeWidth={2.5} />
                                                </span>
                                                <span className="leading-relaxed pt-0.5">{pro}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* CONS */}
                        {tyre?.cons?.length > 0 && (
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900/30 to-zinc-950/60 border border-white/20 backdrop-blur-md p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-red-500/10 hover:shadow-[0_12px_24px_-10px_rgba(239,68,68,0.15)]">
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                                            <TbThumbDown className="text-lg md:text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm md:text-base font-bold text-zinc-100">
                                                Limitations
                                            </h3>
                                            <p className="text-[10px] text-zinc-500 font-medium">
                                                Areas where alternatives may perform better
                                            </p>
                                        </div>
                                    </div>

                                    <ul className="space-y-2.5">
                                        {tyre?.cons?.slice(0,6).map((con, index) => (
                                            <li key={index} className="group flex items-start gap-3 text-xs md:text-sm text-zinc-300 hover:text-white transition-colors duration-200">
                                                <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 group-hover:bg-red-500/20 group-hover:text-red-300 transition-colors mt-0.5">
                                                    <TbX size={14} strokeWidth={2.5} />
                                                </span>
                                                <span className="leading-relaxed pt-0.5">{con}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                    </div>
                </section>
            )}

        </div>
    )
}

export default Description