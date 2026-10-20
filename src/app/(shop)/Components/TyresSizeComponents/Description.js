'use client';

import React, { useState, useMemo } from 'react';
import { FaFileAlt, FaChevronDown } from 'react-icons/fa';
import { TbResize, TbAspectRatio, TbWeight, TbGauge, TbLayersLinked } from 'react-icons/tb';
import { AiOutlineColumnWidth } from "react-icons/ai";

function Description({ tyreData }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const text = tyreData?.description || tyreData?.availableTyres?.description || tyreData?.hero?.subtitle || tyreData?.availableTyres?.hero?.subtitle;
    const isHtmlDescription = useMemo(() => {
        return typeof text === 'string' && /<[a-z][\s\S]*>/i.test(text);
    }, [text]);

    const specs = [
        { label: 'Manufacturer', value: tyreData?.brand?.name || tyreData?.availableTyres?.brand?.name, icon: TbLayersLinked },
        { label: 'Size', value: tyreData?.sizeCode || tyreData?.size, icon: TbResize },
        { label: 'Width', value: tyreData?.width ? `${tyreData.width} mm` : null, icon: AiOutlineColumnWidth },
        { label: 'Aspect Ratio', value: tyreData?.aspectRatio, icon: TbAspectRatio },
        { label: 'Load Index', value: tyreData?.loadIndex, icon: TbWeight },
        { label: 'Speed Rating', value: tyreData?.speedIndex, icon: TbGauge },
        // { label: 'Tube Type', value: Array.isArray(tyreData?.tubeType) ? tyreData.tubeType.join(', ') : tyreData?.tubeType, icon: TbCircleDot },
        // { label: 'Manufacture Year', value: tyreData?.manuFactureYear, icon: FaCalendarAlt },
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
                        {isHtmlDescription ? (
                            <div
                                className="text-[13px] md:text-sm text-zinc-300/90 leading-relaxed font-medium tracking-wide transition-all duration-500 [&>p]:mb-2.5 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-2.5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-2.5 [&>strong]:text-white [&>b]:text-white [&>strong]:font-semibold [&>b]:font-semibold"
                                style={!isExpanded ? { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : {}}
                                dangerouslySetInnerHTML={{ __html: text }}
                            />
                        ) : (
                            <p
                                className="text-[13px] md:text-sm text-zinc-300/90 leading-relaxed font-medium tracking-wide transition-all duration-500 whitespace-pre-line"
                                style={!isExpanded ? { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : {}}
                            >
                                {text}
                            </p>
                        )}

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

        </div>
    );
}

export default Description;