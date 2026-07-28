import React from "react";
import ProductFamilyCard from "@/components/atoms/ProductFamilyCard";
import { FiTarget } from "react-icons/fi";

export default function CompareProducts({
    tyre1,
    tyre2,
    tyre1Name,
    tyre2Name,
}) {
    const hasTyre1 = tyre1 && Object.keys(tyre1).length > 0;
    const hasTyre2 = tyre2 && Object.keys(tyre2).length > 0;

    const name1 = tyre1Name || tyre1?.productName || "Tyre 1";
    const name2 = tyre2Name || tyre2?.productName || "Tyre 2";

    if (!hasTyre1 && !hasTyre2) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tyre 1 Card Container */}
            <div className="p-4 border border-orange-500/15 hover:border-orange-500/30 rounded-2xl bg-white/5 backdrop-blur-2xl transition-all duration-300 hover:bg-white/10 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl border border-orange-500/25 bg-orange-500/10 flex items-center justify-center shrink-0">
                        <FiTarget size={18} className="text-orange-500" />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span
                            className="text-[12px] md:text-base font-black uppercase bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent truncate drop-shadow-sm"
                            title={name1}
                        >
                            {name1}
                        </span>
                        <span className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase mt-0.5">
                            PRODUCT SPECIFICATIONS
                        </span>
                    </div>
                </div>

                {hasTyre1 ? (
                    <ProductFamilyCard tyre={tyre1} />
                ) : (
                    <div className="rounded-3xl border border-white/5 bg-white/5 backdrop-blur-2xl p-8 flex items-center justify-center min-h-[300px]">
                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">No product specifications</span>
                    </div>
                )}
            </div>

            {/* Tyre 2 Card Container */}
            <div className="p-4 border border-white/15 hover:border-white/30 rounded-2xl bg-white/5 backdrop-blur-2xl transition-all duration-300 hover:bg-white/10 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl border border-white/25 bg-white/10 flex items-center justify-center shrink-0">
                        <FiTarget size={18} className="text-white" />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span
                            className="text-[12px] md:text-base font-black uppercase bg-gradient-to-r from-white to-white bg-clip-text text-transparent truncate drop-shadow-sm"
                            title={name2}
                        >
                            {name2}
                        </span>
                        <span className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase mt-0.5">
                            PRODUCT SPECIFICATIONS
                        </span>
                    </div>
                </div>

                {hasTyre2 ? (
                    <ProductFamilyCard tyre={tyre2} />
                ) : (
                    <div className="rounded-3xl border border-white/5 bg-white/5 backdrop-blur-2xl p-8 flex items-center justify-center min-h-[300px]">
                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">No product specifications</span>
                    </div>
                )}
            </div>
        </div>
    );
}
