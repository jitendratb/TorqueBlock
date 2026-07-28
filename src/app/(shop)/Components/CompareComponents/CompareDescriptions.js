import React from "react";
import { FiFileText } from "react-icons/fi";

export default function CompareDescriptions({
    tyre1,
    tyre2,
    tyre1Name,
    tyre2Name,
}) {
    if (!tyre1?.description && !tyre2?.description) return null;

    const cards = [
        { 
            tyre: tyre1, 
            name: tyre1Name, 
            subtitle: "PRIMARY TYRE SUMMARY", 
            theme: {
                border: "border-orange-500/15 hover:border-orange-500/30",
                iconBg: "bg-orange-500/10 border-orange-500/25",
                iconColor: "text-orange-500",
            }
        },
        { 
            tyre: tyre2, 
            name: tyre2Name, 
            subtitle: "COMPARISON TARGET SUMMARY", 
            theme: {
                border: "border-white/15 hover:border-white/30",
                iconBg: "bg-white/10 border-white/25",
                iconColor: "text-white",
            }
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map(({ tyre, name, subtitle, theme }) => (
                tyre?.description ? (
                    <div
                        key={name}
                        className={`rounded-2xl border bg-white/5 backdrop-blur-xl p-4 transition-all duration-500 hover:bg-white/10 ${theme.border}`}
                    >
                        {/* Header Section */}
                        <div className="flex items-center gap-3">
                            {/* Icon Box */}
                            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${theme.iconBg}`}>
                                <FiFileText size={18} className={theme.iconColor} />
                            </div>
                            {/* Title & Subtitle */}
                            <div className="flex flex-col">
                                <span className="text-[12px] md:text-base font-black uppercase  bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                                    {name}
                                </span>
                                <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mt-0.5">
                                    {subtitle}
                                </span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-white/5 my-2" />

                        {/* Description Content */}
                        <p className="text-zinc-300 text-[13px] leading-relaxed font-normal">
                            {tyre.description}
                        </p>
                    </div>
                ) : null
            ))}
        </div>
    );
}
