import React from "react";

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
                { tyre: tyre1, name: tyre1Name, color: "orange" },
                { tyre: tyre2, name: tyre2Name, color: "white" },
            ].map(({ tyre, name, color }) => (
                tyre?.best_use_case?.length > 0 ? (
                    <div
                        key={name}
                        className={`rounded-xl md:rounded-2xl border bg-zinc-900/60 backdrop-blur-xl p-5 ${
                            color === "orange" ? "border-orange-500/20" : "border-white/20"
                        }`}
                    >
                        <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${
                            color === "orange" ? "text-orange-400" : "text-white"
                        }`}>
                            {name} — Best For
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {tyre.best_use_case.map((u) => (
                                <span
                                    key={u}
                                    className={`text-[10px] font-bold px-3 py-1.5 rounded-full ${
                                        color === "orange"
                                            ? "bg-orange-500/15 text-orange-300 border border-orange-500/25"
                                            : "bg-white/15 text-white-300 border border-white/25"
                                    }`}
                                >
                                    {u}
                                </span>
                            ))}
                        </div>
                    </div>
                ) : null
            ))}
        </div>
    );
}
