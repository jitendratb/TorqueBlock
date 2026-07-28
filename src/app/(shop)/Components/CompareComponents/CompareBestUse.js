import React from "react";
import { FiTarget } from "react-icons/fi";

export default function CompareBestUse({
    tyre1,
    tyre2,
    tyre1Name,
    tyre2Name,
}) {
    if (!tyre1?.best_use_case?.length && !tyre2?.best_use_case?.length) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
                { 
                    tyre: tyre1, 
                    name: tyre1Name, 
                    theme: {
                        border: "border-orange-500/15 hover:border-orange-500/30",
                        iconBg: "bg-orange-500/10 border-orange-500/25",
                        iconColor: "text-orange-500",
                        titleGradient: "from-orange-400 to-orange-600",
                        badge: "bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20"
                    }
                },
                { 
                    tyre: tyre2, 
                    name: tyre2Name, 
                    theme: {
                        border: "border-white/15 hover:border-white/30",
                        iconBg: "bg-white/10 border-white/25",
                        iconColor: "text-white",
                        titleGradient: "from-white to-white",
                        badge: "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                    }
                },
            ].map(({ tyre, name, theme }) => (
                <div
                    key={name}
                    className={`rounded-2xl border bg-white/5 backdrop-blur-2xl p-4 transition-all duration-300 hover:bg-white/10 ${theme.border} flex flex-col justify-between`}
                >
                    <div>
                        {/* Header Box (Target icon + stacked titles) */}
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${theme.iconBg}`}>
                                <FiTarget size={18} className={theme.iconColor} />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span 
                                    className={`text-[12px] md:text-base font-black uppercase bg-gradient-to-r ${theme.titleGradient} bg-clip-text text-transparent truncate drop-shadow-sm`}
                                    title={name}
                                >
                                    {name}
                                </span>
                                <span className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase mt-0.5">
                                    BEST ROAD & RIDE USE CASES
                                </span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-white/5 my-4" />

                        {/* Best Use Cases Tags */}
                        {tyre?.best_use_case?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {tyre.best_use_case.map((u) => (
                                    <span
                                        key={u}
                                        className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-colors ${theme.badge}`}
                                    >
                                        {u}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-zinc-500 text-xs italic py-2">No usage recommendations available.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
