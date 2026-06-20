'use client';
import React, { useState } from 'react';
import { FaMotorcycle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { FiArrowUpRight, FiMousePointer } from 'react-icons/fi';

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
        router.push(`/tyres/${tyre?.identifier}/${sizeValue.toLowerCase().replace(/[\s/]/g, '-')}`);
    };

       const handleWhatsapp = (item) => {
    let message = `Hi Torque Block, I am interested in buying ${tyre?.productName} in size ${item}`;
    const phoneNumber = "916366625625";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : '');
    const url = isMobile 
        ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

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
                                    Select your bike size below
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
                                {tyre?.compatibleVehicles?.length > 0 ? (
                                    tyre?.compatibleVehicles?.map((brand, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 rounded border border-white/10 bg-zinc-900 text-xs md:text-sm text-white font-semibold hover:border-orange-500 hover:bg-zinc-800 transition-all duration-300"
                                        >
                                            <FaMotorcycle className="text-orange-500 text-sm md:text-base" />
                                            <span>{brand?.brand} {brand?.model}</span>
                                        </div>
                                    ))) : (tyre?.commonlyUsedBikes?.map((bike, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 rounded border border-white/10 bg-zinc-900 text-xs md:text-sm text-white font-semibold hover:border-orange-500 hover:bg-zinc-800 transition-all duration-300"
                                        >
                                            <FaMotorcycle className="text-orange-500 text-sm md:text-base" />
                                            <span>{bike}</span>
                                        </div>)
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