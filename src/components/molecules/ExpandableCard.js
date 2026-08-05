"use client";

import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function ExpandableCard({ icon: Icon, title, subtitle, content, children, lineClamp = 3 , expandable = true , boundary="true" }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`${boundary && " rounded-2xl  border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl"}`}>

            <div className="relative flex border-b border-white/10 pb-3 items-center gap-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                    {Icon && <Icon className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2  justify-between flex-1">
                    <div>
                        <h2 className="text-xs md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide ">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="relative pt-3">
                {content ? (
                    <p 
                        className="text-[13px] md:text-sm text-zinc-300/90 leading-relaxed font-medium tracking-wide transition-all duration-500 whitespace-pre-wrap"
                        style={expandable && !isExpanded ? { display: '-webkit-box', WebkitLineClamp: lineClamp, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : {}}
                    >
                        {content}
                    </p>
                ) : (
                    <div 
                        className="text-[13px] md:text-sm text-zinc-300/90 leading-relaxed font-medium tracking-wide transition-all duration-500"
                        style={expandable && !isExpanded ? { display: '-webkit-box', WebkitLineClamp: lineClamp, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : {}}
                    >
                        {children}
                    </div>
                )}
                
                {expandable && (
                    <div className="mt-4 flex justify-start">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="group flex items-center gap-2 rounded-full border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-orange-600/5 px-2 py-1 text-[8px] font-black uppercase tracking-wider text-orange-400 transition-all duration-300 hover:border-orange-500/50 hover:bg-orange-500/20 hover:text-orange-300"
                        >
                            {isExpanded ? 'Read Less' : 'Read More'}
                            <FaChevronDown className={`text-[10px] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                )}
            </div> 
        </div>
    );
}
