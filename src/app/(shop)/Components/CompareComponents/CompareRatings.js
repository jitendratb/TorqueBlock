import React from "react";

const RATING_LABELS = {
    dry_grip: "Dry Grip",
    wet_grip: "Wet Grip",
    mileage: "Mileage",
    sport_handling: "Sport Handling",
    touring_comfort: "Touring Comfort",
    high_speed_stability: "High Speed Stability",
    cornering_confidence: "Cornering Confidence",
    warm_up_performance: "Warm-up Performance",
    track_capability: "Track Capability",
    adventure_capability: "Adventure Capability",
    all_weather_reliability: "All-Weather Reliability",
};

export default function CompareRatings({
    tyre1Ratings = {},
    tyre2Ratings = {},
    tyre1Name,
    tyre2Name,
}) {
    if (Object.keys(tyre1Ratings).length === 0 && Object.keys(tyre2Ratings).length === 0) return null;

    return (
        <div className="rounded-xl md:rounded-[1.5rem] overflow-hidden border border-white/10 bg-zinc-900/60 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[2fr_1fr_1fr] bg-zinc-950/80 border-b border-white/10 px-4 md:px-6 py-3 gap-4">
                <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Performance Metric</div>
                <div className="text-[10px] font-black text-orange-400 uppercase tracking-widest text-center w-12 md:w-auto">{tyre1Name}</div>
                <div className="text-[10px] font-black text-white uppercase tracking-widest text-center w-12 md:w-auto">{tyre2Name}</div>
            </div>

            {Object.keys(RATING_LABELS).map((key, i) => {
                const v1 = tyre1Ratings[key] ?? null;
                const v2 = tyre2Ratings[key] ?? null;
                if (v1 === null && v2 === null) return null;

                const maxVal = 5;
                const pct1 = ((v1 || 0) / maxVal) * 100;
                const pct2 = ((v2 || 0) / maxVal) * 100;
                const v1Wins = v1 !== null && v2 !== null && v1 > v2;
                const v2Wins = v1 !== null && v2 !== null && v2 > v1;

                return (
                    <div key={key} className={`px-4 md:px-6 py-3 border-b border-white/5 ${i % 2 === 0 ? "" : "bg-zinc-900/30"}`}>
                        <div className="grid grid-cols-[3fr_auto_auto] md:grid-cols-[2fr_1fr_1fr] items-center gap-4">
                            <div>
                                <p className="text-[11px] md:text-xs font-bold text-zinc-300 mb-1.5">{RATING_LABELS[key]}</p>
                                <div className="flex gap-1.5 items-center">
                                    {/* Orange bar (left, RTL fill) */}
                                    <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden flex justify-end">
                                        <div
                                            className={`h-full rounded-full ${v1Wins ? "bg-orange-500" : "bg-orange-500/40"}`}
                                            style={{ width: `${pct1}%` }}
                                        />
                                    </div>
                                    <div className="w-px h-3 bg-white/20 shrink-0" />
                                    <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${v2Wins ? "bg-white" : "bg-white/40"}`}
                                            style={{ width: `${pct2}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={`text-xs md:text-sm font-black text-center w-12 md:w-auto ${v1Wins ? "text-orange-400" : "text-zinc-400"}`}>
                                {v1 !== null ? v1 : "—"}
                                {v1Wins && <span className="text-[8px] ml-1">▲</span>}
                            </div>
                            <div className={`text-xs md:text-sm font-black text-center w-12 md:w-auto ${v2Wins ? "text-white" : "text-zinc-400"}`}>
                                {v2 !== null ? v2 : "—"}
                                {v2Wins && <span className="text-[8px] ml-1">▲</span>}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
