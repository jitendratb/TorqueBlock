import React from "react";
import { FaMotorcycle } from "react-icons/fa6";

export default function CompareSizes({
    tyre1,
    tyre2,
    tyre1Name,
    tyre2Name,
}) {
    const hasTyre1Sizes = tyre1?.frontSizes?.length > 0 || tyre1?.rearSizes?.length > 0;
    const hasTyre2Sizes = tyre2?.frontSizes?.length > 0 || tyre2?.rearSizes?.length > 0;
    
    if (!hasTyre1Sizes && !hasTyre2Sizes) return null;

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
                        badge: "text-orange-400 bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20"
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
                        badge: "text-white bg-white/10 border-white/20 hover:bg-white/20"
                    }
                },
            ].map(({ tyre, name, theme }) => (
                <div
                    key={name}
                    className={`rounded-2xl border bg-white/5 backdrop-blur-2xl p-4 transition-all duration-300 hover:bg-white/10 ${theme.border} flex flex-col justify-between`}
                >
                    <div>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${theme.iconBg}`}>
                                <FaMotorcycle size={18} className={theme.iconColor} />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span 
                                    className={`text-[12px] md:text-base font-black uppercase bg-gradient-to-r ${theme.titleGradient} bg-clip-text text-transparent truncate drop-shadow-sm`}
                                    title={name}
                                >
                                    {name}
                                </span>
                                <span className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase mt-0.5">
                                    AVAILABLE FITMENT SIZES
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-white/5 my-4" />

                        {/* Front Sizes */}
                        {tyre?.frontSizes?.length > 0 && (
                            <div className="mb-4">
                                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Front Specs</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {tyre.frontSizes.map((s) => (
                                        <span
                                            key={s}
                                            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-colors ${theme.badge}`}
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Rear Sizes */}
                        {tyre?.rearSizes?.length > 0 && (
                            <div className="mb-4">
                                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Rear Specs</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {tyre.rearSizes.map((s) => (
                                        <span
                                            key={s}
                                            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-colors ${theme.badge}`}
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Empty Fallback */}
                        {!tyre?.frontSizes?.length && !tyre?.rearSizes?.length && (
                            <p className="text-zinc-500 text-xs italic py-2">No size specifications available.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
