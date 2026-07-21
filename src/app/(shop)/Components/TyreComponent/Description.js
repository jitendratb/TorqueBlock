'use client';
import React, { useState } from 'react';
import { FaMotorcycle, FaCheckCircle, FaTimesCircle, FaFileAlt, FaChevronDown, FaTools } from 'react-icons/fa';
import { RiThumbUpFill, RiThumbDownFill, RiShieldCheckFill, RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { FiArrowUpRight, FiMousePointer } from 'react-icons/fi';
import { GiCarWheel, GiTyre } from 'react-icons/gi';
import TyreCard from "@/components/atoms/TyreCard";
import Carousel from '@/components/organisms/Carousel';

function Description({ tyre, desClassName = "space-y-2", sizesClassName }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();

    const sizesIdsFront = tyre?.sizesIds?.filter(item => item.position === 'Front').map(item => ({
        ...item,
        productImages: tyre?.productImages && tyre.productImages[0] ? [tyre.productImages[0]] : (tyre?.image ? [tyre.image] : []),
        categoryId: tyre?.categoryId || tyre?.category || null,
    })) || [];
    const Front = sizesIdsFront.length > 0 ? sizesIdsFront : (tyre?.frontSizes || []);

    const sizesIdsRear = tyre?.sizesIds?.filter(item => item.position === 'Rear').map(item => ({
        ...item,
        productImages: tyre?.productImages && tyre.productImages[0] ? [tyre.productImages[0]] : (tyre?.productImages && tyre.productImages[0] ? [tyre.productImages[0]] : (tyre?.image ? [tyre.image] : [])),
        categoryId: tyre?.categoryId || tyre?.category || null,
    })) || [];
    const Rear = sizesIdsRear.length > 0 ? sizesIdsRear : (tyre?.rearSizes || []);

    const isFrontObjects = Front.length > 0 && typeof Front[0] === 'object';
    const isRearObjects = Rear.length > 0 && typeof Rear[0] === 'object';

    const handleWhatsapp = (item) => {
        let message = `Hi Torque Block, I am interested in buying ${tyre?.productName} in size ${item}`;
        const phoneNumber = "916366625625";
        const isMobile = /iPhone|iPad|iPod|Android/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : '');
        const url = isMobile ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}` : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    }

    return (
        <div className="space-y-4">
            <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl ${desClassName}`}>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative flex items-center gap-3.5 mb-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                        <FaFileAlt className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                    </div>
                    <div>
                        <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                            Description
                        </h2>
                        <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                            Tyre Details & Overview
                        </p>
                    </div>
                </div>

                <div className='relative border-t border-white/10 pt-2'>
                    <p className="text-[13px] md:text-sm text-zinc-300/90 leading-relaxed font-medium tracking-wide transition-all duration-500" style={!isExpanded ? { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : {}} >
                        {tyre?.description || tyre?.hero?.subtitle}
                    </p>
                    
                    {(tyre?.description || tyre?.hero?.subtitle) && (
                        <div className="mt-4 flex justify-start">
                            <button 
                                onClick={() => setIsExpanded(!isExpanded)} 
                                className="group flex items-center gap-2 rounded-full border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-orange-600/5 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-orange-400 transition-all duration-300 hover:border-orange-500/50 hover:bg-orange-500/20 hover:text-orange-300"
                            >
                                {isExpanded ? 'Read Less' : 'Read More'}
                                <FaChevronDown className={`text-[10px] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <section className={`space-y-4 my-4 ${sizesClassName}`} id="fitment-section">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative flex items-center gap-3.5 mb-2">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                            <FaTools className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between flex-1">
                            <div>
                                <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                                    Select Your Size
                                </h2>
                                <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                                    Available Fitments For This Model
                                </p>
                            </div>
                            {tyre?.sizesIds?.length > 0 ? (
                                <span className="text-[9px] md:text-[10px] text-orange-400 font-black uppercase tracking-wider bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20 shadow-[0_0_12px_rgba(249,115,22,0.1)] w-fit shrink-0">
                                    Interactive Size Specs
                                </span>
                            ) : (
                                <span className="text-[9px] md:text-[10px] text-zinc-500 font-bold uppercase tracking-wider w-fit shrink-0">
                                    Select Below
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="relative border-t border-white/10 pt-2 space-y-6">
                        {Front.length > 0 && (
                            <div id='allSizesLink' className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.15)]">
                                        <GiTyre className="text-orange-400 text-sm animate-[spin_4s_linear_infinite]" />
                                    </div>
                                    <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                                        Front Fitment
                                    </h3>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <Carousel
                                        items={Front}
                                        itemWidth={isFrontObjects ? 280 : "320"}
                                        showDots={false}
                                        showArrows={true}
                                        gap={16}
                                        renderItem={(item) => {
                                            const isInteractive = typeof item === 'object';
                                            const sizeValue = isInteractive ? item?.size : item;
                                            const sizeId = isInteractive ? item?._id : item;
                                            return isInteractive ? (
                                                <TyreCard key={item.id} tyre={tyre} product={item} className="w-full" />
                                            ) : (
                                                <span
                                                    key={sizeId}
                                                    onClick={() => handleWhatsapp(item)}
                                                    className="group relative inline-flex items-center gap-1.5 px-4 py-2 md:px-5 md:py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-orange-500/10 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] text-xs md:text-sm text-zinc-300 hover:text-white font-bold transition-all duration-300 cursor-pointer whitespace-nowrap"
                                                >
                                                    {sizeValue}
                                                </span>
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {Rear.length > 0 && (
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.15)]">
                                        <GiTyre className="text-orange-400 text-sm animate-[spin_4s_linear_infinite]" />
                                    </div>
                                    <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                                        Rear Fitment
                                    </h3>
                                </div>

                                <div className="flex flex-1 min-w-0">
                                    <Carousel
                                        items={Rear}
                                        itemWidth={isRearObjects ? 280 : "w-auto"}
                                        showDots={false}
                                        showArrows={true}
                                        gap={16}
                                        renderItem={(item) => {
                                            const isInteractive = typeof item === 'object';
                                            const sizeValue = isInteractive ? item?.size : item;
                                            const sizeId = isInteractive ? item?._id : item;
                                            return isInteractive ? (
                                                <TyreCard key={item.id} tyre={tyre} product={item} className="w-full" />
                                            ) : (
                                                <span
                                                    key={sizeId}
                                                    onClick={() => handleWhatsapp(item)}
                                                    className="group relative inline-flex items-center gap-1.5 px-4 py-2 md:px-5 md:py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-orange-500/10 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] text-xs md:text-sm text-zinc-300 hover:text-white font-bold transition-all duration-300 cursor-pointer whitespace-nowrap"
                                                >
                                                    {sizeValue}
                                                </span>
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Commonly Used On Card */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl">
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative flex items-center gap-3.5 mb-2">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                            <FaMotorcycle className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                        </div>
                        <div>
                            <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                                Commonly Used On
                            </h2>
                            <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                                Verified Compatible Vehicles
                            </p>
                        </div>
                    </div>

                    <div className="relative border-t border-white/10 pt-2 space-y-4">
                        {tyre?.commonlyUsedOn && (
                            <p className="text-[13px] md:text-sm text-zinc-300/90 leading-relaxed font-medium tracking-wide">
                                {tyre?.commonlyUsedOn}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-2.5">
                            {/* {tyre?.compatibleVehicles?.length > 0 ? (
                                tyre?.compatibleVehicles?.map((brand, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-white/10 bg-white/5 text-xs md:text-sm text-zinc-300 font-bold hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300"
                                    >
                                        <FaMotorcycle className="text-orange-500 text-sm drop-shadow-sm" />
                                        <span>{brand?.brand} {brand?.model}</span>
                                    </div>
                                ))) : (tyre?.commonlyUsedBikes?.map((bike, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-white/10 bg-white/5 text-xs md:text-sm text-zinc-300 font-bold hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300"
                                    >
                                        <FaMotorcycle className="text-orange-500 text-sm drop-shadow-sm" />
                                        <span>{bike}</span>
                                    </div>)
                                ))} */}
                        </div>

                  
                    </div>
                </div>
            </section>
            {(tyre?.pros?.length > 0 || tyre?.cons?.length > 0) && (
                <section className="relative border-t border-white/10 mt-4 py-4">

                    {/* Section Header */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 ring-1 ring-orange-500/30 shadow-[0_0_14px_rgba(249,115,22,0.15)]">
                            <RiShieldCheckFill className="text-orange-400 text-base" />
                        </div>
                        <div>
                            <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                                Performance Analysis
                            </h2>
                            <p className="text-zinc-500 text-[10px] mt-0.5">
                                Real-world strengths &amp; limitations of this tyre
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                        {tyre?.pros?.length > 0 && (
                            <div className="group relative overflow-hidden rounded-2xl border border-zinc-700/60 bg-white/10 hover:bg-green-500/10 cursor-pointer transition-all duration-300 hover:border-green-500/40 hover:shadow-[0_4px_24px_rgba(16,185,129,0.10)]">

                                <div className="p-4 lg:p-5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/15 transition-all duration-300 group-hover:bg-green-500/25">
                                            <RiThumbUpFill className="text-green-400 text-lg" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-sm leading-tight">
                                                Advantages
                                            </h3>
                                            <p className="text-zinc-500 text-[10px] mt-0.5">
                                                What riders love about this tyre
                                            </p>
                                        </div>
                                    </div>

                                    <ul className="space-y-2">
                                        {tyre.pros?.slice(0, 6).map((pro, index) => (
                                            <li key={index} className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-300 transition-colors duration-150 hover:text-white">
                                                <RiCheckboxCircleFill className="mt-0.5 shrink-0 text-sm text-green-400" />
                                                <span className="leading-relaxed">{pro}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* CONS */}
                        {tyre?.cons?.length > 0 && (
                            <div className="group relative overflow-hidden rounded-2xl border border-zinc-700/60 bg-white/10 hover:bg-red-500/10 cursor-pointer transition-all duration-300 hover:border-red-500/40 hover:shadow-[0_4px_24px_rgba(239,68,68,0.10)]">

                                <div className="p-4 lg:p-5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/15 transition-all duration-300 group-hover:bg-red-500/25">
                                            <RiThumbDownFill className="text-red-400 text-lg" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-sm leading-tight">
                                                Limitations
                                            </h3>
                                            <p className="text-zinc-500 text-[10px] mt-0.5">
                                                Areas where alternatives may perform better
                                            </p>
                                        </div>
                                    </div>

                                    <ul className="space-y-2">
                                        {tyre.cons?.slice(0, 6)?.map((con, index) => (
                                            <li key={index} className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-300 transition-colors duration-150 hover:text-white">
                                                <RiCloseCircleFill className="mt-0.5 shrink-0 text-sm text-red-400" />
                                                <span className="leading-relaxed">{con}</span>
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