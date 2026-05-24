import React from "react";

export default function CompareDescriptions({
    tyre1,
    tyre2,
    tyre1Name,
    tyre2Name,
}) {
    if (!tyre1?.description && !tyre2?.description) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
                { tyre: tyre1, name: tyre1Name, color: "orange" },
                { tyre: tyre2, name: tyre2Name, color: "white" },
            ].map(({ tyre, name, color }) => (
                tyre?.description ? (
                    <div
                        key={name}
                        className={`rounded-xl md:rounded-2xl border bg-zinc-900/60 backdrop-blur-xl p-5 ${
                            color === "orange" ? "border-orange-500/20" : "border-white/20"
                        }`}
                    >
                        <p
                            className={`text-[10px] font-black uppercase tracking-widest mb-2 ${
                                color === "orange" ? "text-orange-400" : "text-white"
                            }`}
                        >
                            {name}
                        </p>
                        <p className="text-zinc-300 text-sm leading-relaxed">{tyre.description}</p>
                    </div>
                ) : null
            ))}
        </div>
    );
}
