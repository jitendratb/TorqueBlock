'use client';
import React, { useState } from 'react'
import { FaMotorcycle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function Description({ tyre, desClassName = "space-y-2", sizesClassName }) {
    const [isExpanded, setIsExpanded] = useState(false);

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
                    <div className="space-y-2 py-4">
                        <h2 className="text-sm md:text-lg font-semibold uppercase tracking-[0.25em] text-orange-500 ">
                            Commonly Available Sizes
                        </h2>

                        <div className="space-y-4">
                            {tyre?.frontSizes?.length > 0 && (
                                <div className="flex flex-wrap items-center ">
                                    <span className="text-orange-500 font-bold text-sm pb-2 md:pt-0 md:text-xl min-w-[80px]">
                                        Front:
                                    </span>

                                    <div className="flex flex-wrap gap-2">
                                        {tyre?.frontSizes?.map((size) => (
                                            <button
                                                key={size}
                                                className="px-2 md:px-3 py-1 md:py-2 rounded border border-white/10 bg-zinc-900 text-xs md:text-sm text-white font-semibold hover:border-orange-500 hover:bg-zinc-800 transition-all duration-300"
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Rear Sizes */}
                            {tyre?.rearSizes?.length > 0 && (
                                <div className="flex flex-wrap items-center">

                                    <span className="text-orange-500 font-bold text-sm pb-2 md:pt-0 md:text-xl min-w-[80px]">
                                        Rear:
                                    </span>

                                    <div className="flex flex-wrap gap-2">
                                        {tyre?.rearSizes?.map((size) => (
                                            <button
                                                key={size}
                                                className="px-2 md:px-3 py-1 md:py-2 rounded border border-white/10 bg-zinc-900 text-xs md:text-sm text-white font-semibold hover:border-orange-500 hover:bg-zinc-800 transition-all duration-300"
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <p className="text-zinc-400 italic text-[8px] md:text-xs">
                            Sizes vary by batch and bike compatibility. Availability is confirmed on WhatsApp.
                        </p>
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
                                {tyre?.compatibleVehicles?.map((brand, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 rounded border border-white/10 bg-zinc-900 text-xs md:text-sm text-white font-semibold hover:border-orange-500 hover:bg-zinc-800 transition-all duration-300"
                                    >
                                        <FaMotorcycle className="text-orange-500 text-sm md:text-base" />
                                        <span>{brand?.brand} {brand?.model}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="text-zinc-400 italic text-[8px] md:text-xs">
                                Final fitment depends on model year and tyre size. Confirmed on WhatsApp.
                            </p>
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
                            <div className="group relative overflow-hidden rounded-2xl border border-green-500/20 ">
                                <div className="p-4 lg:p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="h-12 w-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                            <FaCheckCircle className="text-green-400 text-xl" />
                                        </div>

                                        <div>
                                            <h3 className="text-white font-bold text-lg">
                                                Advantages
                                            </h3>
                                            <p className="text-zinc-400 text-xs">
                                                What riders love about this tyre
                                            </p>
                                        </div>
                                    </div>

                                    <ul className="space-y-2">
                                        {tyre.pros.map((pro, index) => (
                                            <li
                                                key={index}
                                                className="flex gap-3 text-xs md:text-sm text-zinc-300 hover:text-white transition-all"
                                            >
                                                <div className="mt-1.5 h-2 w-2 rounded-full bg-green-400 shrink-0" />
                                                <span className="leading-relaxed">
                                                    {pro}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* CONS */}
                        {tyre?.cons?.length > 0 && (
                            <div className="group relative overflow-hidden rounded-2xl border border-red-500/20">


                                <div className="p-4 md:p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="h-12 w-12 rounded-xl shrink-0 bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                            <FaTimesCircle className="text-red-400 text-xl" />
                                        </div>

                                        <div>
                                            <h3 className="text-white font-bold text-lg">
                                                Limitations
                                            </h3>
                                            <p className="text-zinc-400 text-xs">
                                                Areas where alternatives may perform better
                                            </p>
                                        </div>
                                    </div>

                                    <ul className="space-y-2">
                                        {tyre.cons.map((con, index) => (
                                            <li
                                                key={index}
                                                className="flex gap-3 text-xs md:text-sm text-zinc-300 hover:text-white transition-all"
                                            >
                                                <div className="mt-1.5 h-2 w-2 rounded-full bg-red-400 shrink-0" />
                                                <span className="leading-relaxed">
                                                    {con}
                                                </span>
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