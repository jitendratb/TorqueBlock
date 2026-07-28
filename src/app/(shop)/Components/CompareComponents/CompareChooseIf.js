import React from "react";
import { FiCheck, FiCheckCircle } from "react-icons/fi";

export default function CompareChooseIf({
    tyre1,
    tyre2,
    tyre1Name,
    tyre2Name,
}) {
    if (!tyre1?.choose_if?.length && !tyre2?.choose_if?.length) return null;

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
                        checkColor: "text-orange-500"
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
                        checkColor: "text-white"
                    }
                },
            ].map(({ tyre, name, theme }) => (
                <div
                    key={name}
                    className={`rounded-2xl border bg-white/5 backdrop-blur-2xl p-4 transition-all duration-300 hover:bg-white/10 ${theme.border} flex flex-col`}
                >
                    <div>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${theme.iconBg}`}>
                                <FiCheckCircle size={18} className={theme.iconColor} />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span 
                                    className={`text-[12px] md:text-base font-black uppercase bg-gradient-to-r ${theme.titleGradient} bg-clip-text text-transparent truncate drop-shadow-sm`}
                                    title={name}
                                >
                                    {name}
                                </span>
                                <span className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase mt-0.5">
                                    WHY CHOOSE THIS TYRE
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-white/5 my-4" />

                        <div className="space-y-3">
                            {(tyre?.choose_if || []).map((item, i) => (
                                <div key={i} className="flex items-start gap-2.5">
                                    <FiCheck className={`${theme.checkColor} shrink-0 mt-0.5`} size={14} />
                                    <p className="text-zinc-300 text-xs leading-snug">{item}</p>
                                </div>
                            ))}

                            {(!tyre?.choose_if || tyre.choose_if.length === 0) && (
                                <p className="text-zinc-500 text-xs italic py-2">No recommendation criteria specified.</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
