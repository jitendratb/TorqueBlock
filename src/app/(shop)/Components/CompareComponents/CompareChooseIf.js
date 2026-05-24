import React from "react";
import { FiCheck } from "react-icons/fi";

export default function CompareChooseIf({
    tyre1,
    tyre2,
    tyre1Name,
    tyre2Name,
}) {
    if (!tyre1?.choose_if?.length && !tyre2?.choose_if?.length) return null;

    return (
        <div className="rounded-xl md:rounded-[1.5rem] overflow-hidden border border-white/10 bg-zinc-900/60 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <div className="grid grid-cols-2 bg-zinc-950/80 border-b border-white/10">
                <div className="py-3 px-5 text-[10px] font-black text-orange-400 uppercase tracking-widest border-r border-white/10 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
                    Choose {tyre1Name.split(" ").slice(-2).join(" ")} If
                </div>
                <div className="py-3 px-5 text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                    Choose {tyre2Name.split(" ").slice(-2).join(" ")} If
                </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-white/5">
                <div className="p-5 space-y-2.5">
                    {(tyre1?.choose_if || []).map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                            <FiCheck className="text-orange-400 shrink-0 mt-0.5" size={13} />
                            <p className="text-zinc-300 text-xs leading-snug">{item}</p>
                        </div>
                    ))}
                </div>
                <div className="p-5 space-y-2.5">
                    {(tyre2?.choose_if || []).map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                            <FiCheck className="text-white shrink-0 mt-0.5" size={13} />
                            <p className="text-zinc-300 text-xs leading-snug">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
