'use client';

import React, { useState } from 'react';
import { FaMotorcycle } from 'react-icons/fa';
import { TbResize, TbAspectRatio, TbCircleDot, TbWeight, TbGauge, TbLayersLinked, TbLayersDifference, TbArrowLeftRight, TbFlask, TbCircle } from 'react-icons/tb';
import { AiOutlineColumnWidth } from "react-icons/ai";

function Description({ tyreData }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const text = tyreData?.description || tyreData?.availableTyres?.description || tyreData?.hero?.subtitle || tyreData?.availableTyres?.hero?.subtitle;

    const specs = [
        { label: 'Size', value: tyreData?.sizeCode || tyreData?.size, icon: TbResize },
        { label: 'Width', value: tyreData?.width ? `${tyreData.width} mm` : null, icon: AiOutlineColumnWidth },
        { label: 'Aspect Ratio', value: tyreData?.aspectRatio, icon: TbAspectRatio },
        { label: 'Rim Size', value: tyreData?.rimSize ? String(tyreData.rimSize).toUpperCase() : null, icon: TbCircle },
        { label: 'Load Index', value: tyreData?.loadIndex, icon: TbWeight },
        { label: 'Speed Rating', value: tyreData?.speedIndex, icon: TbGauge },
        { label: 'Compound', value: tyreData?.tripleCompound ? "Triple" :tyreData?.dualCompound  ? "Dual" : "Single", icon: TbFlask },
   ];

    const activeSpecs = specs.filter(s => s.value !== null && s.value !== undefined && s.value !== '');

    if (!text && activeSpecs.length === 0) return null;

    console.log(tyreData  , "sadfghjkhgfdsadfghjkhgfdsadfghjm")

    return (
        <div className='space-y-4'>
            {text && (
                <div className="space-y-2">
                    <h2 className="text-sm md:text-lg font-semibold uppercase tracking-[0.25em] text-orange-500">
                        Description
                    </h2>

                    <div className="space-y-1">
                        <p
                            className="text-xs md:text-sm text-zinc-400 leading-relaxed transition-all duration-300"
                            style={!isExpanded ? {
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            } : {}}
                        >
                            {text}
                        </p>

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-orange-500 hover:text-orange-400 text-[8px] lg:text-xs font-bold uppercase tracking-widest transition-colors"
                        >
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                    </div>
                </div>
            )}


            {/* {activeSpecs.length > 0 && (
                <div className="space-y-2">
                    <h2 className="text-sm md:text-lg font-semibold uppercase tracking-[0.25em] text-orange-500">
                        Technical Specifications
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 md:gap-4 relative z-10">
                        {activeSpecs.map((spec, idx) => (
                            <SpecItem key={idx} label={spec.label} value={spec.value} icon={spec.icon} />
                        ))}
                    </div>
                </div>
            )} */}

            {tyreData?.quickFacts?.popularBikes?.length > 0 && (
                <div className="space-y-2">
                    <h2 className="text-sm md:text-lg font-semibold uppercase tracking-[0.25em] text-orange-500">
                        Compatible Bikes
                    </h2>

                    <div className="flex flex-wrap gap-2.5 md:gap-3">
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