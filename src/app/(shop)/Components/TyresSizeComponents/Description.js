'use client';

import React, { useState } from 'react';
import { FaMotorcycle, FaFileAlt, FaChevronDown, FaCalendarAlt } from 'react-icons/fa';
import { TbResize, TbAspectRatio, TbCircleDot, TbWeight, TbGauge, TbLayersLinked, TbLayersDifference, TbArrowLeftRight, TbFlask, TbCircle } from 'react-icons/tb';
import { AiOutlineColumnWidth } from "react-icons/ai";

const SpecItem = ({ label, value, icon: Icon }) => {
    if (!value) return null;
    return (
        <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-3 md:p-4 transition-all duration-500 hover:border-orange-500/30 hover:bg-orange-500/5 hover:shadow-[0_8px_30px_-12px_rgba(249,115,22,0.3)]">
            <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-orange-500/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-1.5 md:gap-2">
                <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-zinc-400 group-hover:bg-orange-500/20 group-hover:text-orange-400 transition-colors duration-300">
                        {Icon && <Icon className="text-sm" />}
                    </div>
                    <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-orange-400/80 transition-colors duration-300">
                        {label}
                    </span>
                </div>
                <span className="text-sm md:text-base font-black text-zinc-200 group-hover:text-white transition-colors duration-300">
                    {value}
                </span>
            </div>
        </div>
    );
};

function Description({ tyreData }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const text = tyreData?.description || tyreData?.availableTyres?.description || tyreData?.hero?.subtitle || tyreData?.availableTyres?.hero?.subtitle;

    const specs = [
        { label: 'Manufacturer', value: tyreData?.brand?.name || tyreData?.availableTyres?.brand?.name, icon: TbLayersLinked },
        { label: 'Size', value: tyreData?.sizeCode || tyreData?.size, icon: TbResize },
        { label: 'Width', value: tyreData?.width ? `${tyreData.width} mm` : null, icon: AiOutlineColumnWidth },
        { label: 'Aspect Ratio', value: tyreData?.aspectRatio, icon: TbAspectRatio },
        { label: 'Load Index', value: tyreData?.loadIndex, icon: TbWeight },
        { label: 'Speed Rating', value: tyreData?.speedIndex, icon: TbGauge },
        // { label: 'Tube Type', value: Array.isArray(tyreData?.tubeType) ? tyreData.tubeType.join(', ') : tyreData?.tubeType, icon: TbCircleDot },
     /   // { label: 'Manufacture Year', value: tyreData?.manuFactureYear, icon: FaCalendarAlt },
   ];

    const activeSpecs = specs.filter(s => s.value !== null && s.value !== undefined && s.value !== '');

    if (!text && activeSpecs.length === 0) return null;


    return (
        <div className='space-y-4'>
            {text && (
                <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl`}>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative flex border-b border-white/10 pb-4 items-center gap-3.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                            <FaFileAlt className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between flex-1">
                            <div>
                                <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                                    Description
                                </h2>
                                <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                                    Tyre Details & Overview
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='relative pt-4'>
                        <p className="text-[13px] md:text-sm text-zinc-300/90 leading-relaxed font-medium tracking-wide transition-all duration-500" style={!isExpanded ? { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : {}} >
                            {text}
                        </p>

                        <div className="mt-4 flex justify-start">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="group flex items-center gap-2 rounded-full border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-orange-600/5 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-orange-400 transition-all duration-300 hover:border-orange-500/50 hover:bg-orange-500/20 hover:text-orange-300"
                            >
                                {isExpanded ? 'Read Less' : 'Read More'}
                                <FaChevronDown className={`text-[10px] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {activeSpecs.length > 0 && (
                <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl`}>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative flex border-b border-white/10 pb-4 mb-4 items-center gap-3.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                            <TbGauge className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                        </div>
                        <div className="flex flex-col flex-1">
                            <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                                Technical Specifications
                            </h2>
                            <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                                Engineered Performance Metrics
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4 relative z-10">
                        {activeSpecs.map((spec, idx) => (
                            <SpecItem key={idx} label={spec.label} value={spec.value} icon={spec.icon} />
                        ))}
                    </div>
                </div>
            )}

            {tyreData?.quickFacts?.popularBikes?.length > 0 && (
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

                    <div className="flex flex-wrap gap-2.5 md:gap-3 relative z-10">
                        {tyreData.quickFacts.popularBikes.map((bike, idx) => (
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
                </div>
            )}

        </div>
    );
}

export default Description;