"use client";

import React from 'react';

const themes = {
    emerald: { 
        container: "bg-emerald-500/10 border border-emerald-500/20 text-emerald-500",
        hover: "hover:border-emerald-500/20 hover:bg-emerald-500/10",
    },
    red: { 
        container: "bg-red-500/10 border border-red-500/20 text-red-500",
        hover: "hover:border-red-500/20 hover:bg-red-500/10",
    },
    orange: { 
        container: "bg-orange-500/10 border border-orange-500/20 text-orange-500",
        hover: "hover:border-orange-500/20 hover:bg-orange-500/10",
    },
};

export default function GuideColumn({ title, subtitle, mainIcon: MainIcon, themeColor = "emerald", items = [], renderItemIcon, maxItems = 6 }) {
    
    if (!items || items.length === 0) return null;

    const theme = themes[themeColor] || themes.emerald;

    return (
        <div className={`bg-white/5 border border-white/5 rounded-2xl p-3 transition-all duration-300 ${theme.hover} cursor-default`}>
            <div className="flex items-center gap-3 border-b border-white/5 pb-3 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${theme.container}`}>
                    {MainIcon && <MainIcon className="text-lg" />}
                </div>
                <div>
                    <h3 className="text-zinc-200 font-bold text-sm leading-tight">{title}</h3>
                    <p className="text-zinc-500 text-[10px]">{subtitle}</p>
                </div>
            </div>
            <ul className="space-y-3">
                {items.slice(0, maxItems).map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5 group cursor-default">
                        {renderItemIcon && renderItemIcon()}
                        <span className="text-zinc-300 text-xs leading-relaxed transition-colors duration-300 group-hover:text-white">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
