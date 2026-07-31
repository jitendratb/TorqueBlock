'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { 
    FaFileAlt, FaChevronDown, FaTools, FaMotorcycle, FaCircle, FaCogs, 
    FaRulerCombined, FaWeightHanging, FaFlask, FaTags, FaHashtag, FaShieldAlt, 
    FaStar, FaRoute, FaMountain, FaExchangeAlt 
} from 'react-icons/fa';
import { GiCarWheel } from 'react-icons/gi';

const getTagIcon = (tag) => {
    if (!tag || typeof tag !== 'string') return FaHashtag;
    const lower = tag.toLowerCase();
    if (lower.includes('off-road') || lower.includes('dirt')) return FaMountain;
    if (lower.includes('touring') || lower.includes('adventure') || lower.includes('route')) return FaRoute;
    if (lower.includes('puncture') || lower.includes('durable') || lower.includes('heavy-duty') || lower.includes('resistant')) return FaShieldAlt;
    if (lower.includes('premium') || lower.includes('quality')) return FaStar;
    if (lower.includes('motorcycle') || lower.includes('bike')) return FaMotorcycle;
    if (lower.includes('replacement')) return FaExchangeAlt;
    if (/\d+[\/-]\d+/.test(lower) || lower.includes('inch') || lower.includes('wheel')) return GiCarWheel;
    if (lower.includes('tube')) return FaCircle;
    return FaHashtag;
};

const SpecCard = React.memo(({ label, value, Icon }) => (
    <div className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between h-full group">
        <div className="flex items-center gap-1.5 mb-1.5">
            <div className="p-1 rounded-md transition-colors">
                <Icon className="text-[11px] group-hover:text-orange-500" aria-hidden="true" />
            </div>
            <p className="text-[10px] text-zinc-500 font-bold uppercase group-hover:text-orange-500 tracking-wider">{label}</p>
        </div>
        <p className="text-sm text-zinc-200 font-semibold group-hover:text-white transition-colors truncate">{value}</p>
    </div>
));


function TubeDescription({ tube, desClassName = "space-y-2" }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    const descriptionText = useMemo(() => {
        return tube?.description || tube?.hero?.subtitle || "";
    }, [tube]);

    const specifications = useMemo(() => {
        if (!tube) return [];
        return [
            { label: 'Tube Type', value: tube.tubeType, Icon: FaCircle },
            { label: 'Valve Type', value: tube.valveType, Icon: FaCogs },
            { label: 'Valve Angle', value: tube.valveAngle, Icon: FaRulerCombined },
            { label: 'Size', value: tube.size, Icon: GiCarWheel },
            { label: 'Position', value: tube.position, Icon: FaMotorcycle },
            { label: 'Material', value: tube.specifications?.material, Icon: FaFlask },
            { label: 'Weight', value: tube.specifications?.weight ? `${tube.specifications.weight} kg` : null, Icon: FaWeightHanging }
        ].filter(spec => spec.value);
    }, [tube]);

    const tagList = useMemo(() => {
        if (Array.isArray(tube?.tags) && tube.tags.length > 0) return tube.tags;
        if (Array.isArray(tube?.seo?.keywords) && tube.seo.keywords.length > 0) return tube.seo.keywords;
        return [];
    }, [tube]);

    if (!tube) return null;

    return (
        <section className="space-y-4" aria-label="Tube Detailed Description and Specifications">
            {/* Description Section */}
            {descriptionText && (
                <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl ${desClassName}`}>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative flex border-b border-white/10 pb-4 items-center gap-3.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                            <FaFileAlt className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" aria-hidden="true" />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between flex-1">
                            <div>
                                <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                                    Description
                                </h2>
                                <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                                    Tube Details & Overview
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative pt-4">
                        <p 
                            id="tube-description-text"
                            className="text-[13px] md:text-sm text-zinc-300/90 leading-relaxed font-medium tracking-wide transition-all duration-500" 
                            style={!isExpanded ? { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : {}}
                        >
                            {descriptionText}
                        </p>

                        <div className="mt-4 flex justify-start">
                            <button
                                type="button"
                                onClick={toggleExpanded}
                                aria-expanded={isExpanded}
                                aria-controls="tube-description-text"
                                className="group flex items-center gap-2 rounded-full border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-orange-600/5 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-orange-400 transition-all duration-300 hover:border-orange-500/50 hover:bg-orange-500/20 hover:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                            >
                                <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                                <FaChevronDown className={`text-[10px] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Specifications Section */}
            {specifications.length > 0 && (
                <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl ${desClassName}`}>
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative flex border-b border-white/10 pb-4 items-center gap-3.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                            <FaTools className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" aria-hidden="true" />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between flex-1">
                            <div>
                                <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                                    Specifications
                                </h2>
                                <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                                    Technical Details & Features
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative pt-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                            {specifications.map((spec, index) => (
                                <SpecCard key={spec.label || index} {...spec} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Tags / Keywords Section */}
            {tagList.length > 0 && (
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl mt-4">
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative flex border-b border-white/10 pb-4 items-center gap-3.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                            <FaTags className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" aria-hidden="true" />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between flex-1">
                            <div>
                                <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                                    Product Attributes & Tags
                                </h2>
                                <p className="text-zinc-400 text-[10px] md:text-xs font-medium tracking-wide mt-0.5">
                                    Key characteristics, performance traits & fitment index
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative pt-4">
                        <div className="flex flex-wrap gap-2">
                            {tagList.map((tag, index) => {
                                const TagIcon = getTagIcon(tag);
                                return (
                                    <span
                                        key={tag || index}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-[11px] md:text-xs text-zinc-300 font-medium hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300 cursor-default group"
                                    >
                                        <TagIcon className="text-orange-500/60 group-hover:text-orange-400 transition-colors text-[11px]" aria-hidden="true" />
                                        <span>{tag}</span>
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default React.memo(TubeDescription);