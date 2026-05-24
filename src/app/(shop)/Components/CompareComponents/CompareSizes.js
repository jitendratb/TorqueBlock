import React from "react";
import WhatsAppButton from "@/components/atoms/WhatsAppButton";

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
                { tyre: tyre1, name: tyre1Name, color: "orange" },
                { tyre: tyre2, name: tyre2Name, color: "white" },
            ].map(({ tyre, name, color }) => (
                <div
                    key={name}
                    className={`rounded-xl md:rounded-2xl border bg-zinc-900/60 backdrop-blur-xl p-5 ${
                        color === "orange" ? "border-orange-500/20" : "border-white/20"
                    } flex flex-col justify-between`}
                >
                    <div>
                        <p className={`text-[10px] font-black uppercase tracking-widest mb-4 ${color === "orange" ? "text-orange-400" : "text-white"}`}>
                            {name} — Available Sizes
                        </p>
                        {tyre?.frontSizes?.length > 0 && (
                            <div className="mb-3">
                                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Front</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {tyre.frontSizes.map((s) => (
                                        <span
                                            key={s}
                                            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${
                                                color === "orange"
                                                    ? "text-orange-300 bg-orange-500/10 border-orange-500/20"
                                                    : "text-white bg-white/10 border-white/20"
                                            }`}
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {tyre?.rearSizes?.length > 0 && (
                            <div>
                                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Rear</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {tyre.rearSizes.map((s) => (
                                        <span
                                            key={s}
                                            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${
                                                color === "orange"
                                                    ? "text-orange-300 bg-orange-500/10 border-orange-500/20"
                                                    : "text-white bg-white/10 border-white/20"
                                            }`}
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-4">
                        <WhatsAppButton
                            text="Secure My Fitment Size"
                            value={`I was checking the ${name} tyre sizes and I'm interested in buying it for my bike. Can you help me with availability, pricing, and fitment for my motorcycle?`}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
