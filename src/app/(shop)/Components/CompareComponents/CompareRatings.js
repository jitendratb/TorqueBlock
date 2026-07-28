import React, { useState, useEffect } from "react";
import { FiTrendingUp, FiAward } from "react-icons/fi";

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

const parseRating = (val) => {
    if (val === undefined || val === null || val === "") return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
};

export default function CompareRatings({
    tyre1Ratings = {},
    tyre2Ratings = {},
    tyre1Name,
    tyre2Name,
}) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (Object.keys(tyre1Ratings).length === 0 && Object.keys(tyre2Ratings).length === 0) return null;

    return (
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            {/* Header */}
            <div className="grid grid-cols-[3fr_1fr_1fr] md:grid-cols-[2fr_1fr_1fr] bg-white/5 border-b border-white/10 px-6 py-4 gap-4 items-center">
                <div className="text-[12px] flex gap-4 items-center md:text-base font-black uppercase bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm truncate">
                    <FiTrendingUp className="text-orange-500 shrink-0" size={14} />
                    <span className="truncate">Performance Metric</span>
                </div>
                <div 
                    className="text-[12px] md:text-base font-black uppercase bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(249,115,22,0.2)] truncate"
                    title={tyre1Name}
                >
                    {tyre1Name}
                </div>
                <div 
                    className="text-[12px] md:text-base font-black uppercase bg-white/80 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(59,130,246,0.2)] truncate"
                    title={tyre2Name}
                >
                    {tyre2Name}
                </div>
            </div>

            {/* List */}
            {Object.keys(RATING_LABELS).map((key, i) => {
                const v1 = parseRating(tyre1Ratings[key]);
                const v2 = parseRating(tyre2Ratings[key]);
                if (v1 === null && v2 === null) return null;

                const maxVal = 5;
                const pct1 = v1 !== null ? (v1 / maxVal) * 100 : 0;
                const pct2 = v2 !== null ? (v2 / maxVal) * 100 : 0;
                
                const width1 = isMounted ? pct1 : 0;
                const width2 = isMounted ? pct2 : 0;

                const hasBoth = v1 !== null && v2 !== null;
                const isDraw = hasBoth && v1 === v2;
                const v1Wins = hasBoth && v1 > v2;
                const v2Wins = hasBoth && v2 > v1;

                const v1Active = v1 !== null && !v2Wins;
                const v2Active = v2 !== null && !v1Wins;
                const scoreDiff = hasBoth ? v1 - v2 : null;

                return (
                    <div 
                        key={key} 
                        className={`px-6 py-4 border-b border-white/5 transition-all duration-300 hover:bg-white/5 ${
                            i % 2 === 0 ? "" : "bg-white/[0.02]"
                        }`}
                    >
                        <div className="grid grid-cols-[3fr_1fr_1fr] md:grid-cols-[2fr_1fr_1fr] items-center gap-4">
                            <div>
                                <p className="text-[10px] font-mono font-bold tracking-wider text-zinc-300 uppercase mb-2">
                                    {RATING_LABELS[key]}
                                </p>
                                <div className="flex gap-2 items-center">
                                    {/* Tyre 1 Bar (RTL Fill) */}
                                    <div 
                                        className="flex-1 h-2 bg-zinc-950/40 rounded-full border border-white/5 overflow-hidden flex justify-end"
                                        role="progressbar"
                                        aria-valuenow={v1 !== null ? v1 : 0}
                                        aria-valuemin="0"
                                        aria-valuemax="5"
                                        aria-label={`${RATING_LABELS[key]} rating for ${tyre1Name}`}
                                    >
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${
                                                v1Active 
                                                    ? "bg-gradient-to-l from-orange-500 to-orange-600/40 shadow-[0_0_10px_rgba(249,115,22,0.3)]" 
                                                    : "bg-orange-500/20"
                                            }`}
                                            style={{ width: `${width1}%` }}
                                        />
                                    </div>
                                    
                                    {/* Spine */}
                                    <div className="w-[2px] h-3.5 bg-white/10 shrink-0" />
                                    
                                    {/* Tyre 2 Bar (LTR Fill) */}
                                    <div 
                                        className="flex-1 h-2 bg-zinc-950/40 rounded-full border border-white/5 overflow-hidden"
                                        role="progressbar"
                                        aria-valuenow={v2 !== null ? v2 : 0}
                                        aria-valuemin="0"
                                        aria-valuemax="5"
                                        aria-label={`${RATING_LABELS[key]} rating for ${tyre2Name}`}
                                    >
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${
                                                v2Active 
                                                    ? "bg-white/80 shadow-[0_0_10px_rgba(59,130,246,0.3)]" 
                                                    : "bg-white/20"
                                            }`}
                                            style={{ width: `${width2}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Tyre 1 Score */}
                            <div className="flex items-center justify-center gap-1.5 w-14 md:w-auto">
                                <span className={`text-xs md:text-sm font-mono font-black ${
                                    v1Wins 
                                        ? "text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.5)]" 
                                        : isDraw 
                                            ? "text-orange-400/70"
                                            : "text-zinc-500"
                                }`}>
                                    {v1 !== null ? v1.toFixed(1) : "—"}
                                </span>
                                {v1Wins && (
                                    <div className="flex items-center gap-0.5 shrink-0">
                                        <FiAward size={12} className="text-orange-500 animate-pulse" />
                                        {scoreDiff !== null && (
                                            <span className="text-[9px] font-mono font-bold text-orange-400/90 bg-orange-500/10 px-0.5 rounded border border-orange-500/20">
                                                +{scoreDiff.toFixed(1)}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Tyre 2 Score */}
                            <div className="flex items-center justify-center gap-1.5 w-14 md:w-auto">
                                <span className={`text-xs md:text-sm font-mono font-black ${
                                    v2Wins 
                                        ? "text-white/80 drop-shadow-[0_0_6px_rgba(96,165,250,0.5)]" 
                                        : isDraw 
                                            ? "text-white/70"
                                            : "text-zinc-500"
                                }`}>
                                    {v2 !== null ? v2.toFixed(1) : "—"}
                                </span>
                                {v2Wins && (
                                    <div className="flex items-center gap-0.5 shrink-0">
                                        <FiAward size={12} className="text-white animate-pulse" />
                                        {scoreDiff !== null && (
                                            <span className="text-[9px] font-mono font-bold text-white/80 bg-white/10 px-0.5 rounded border border-white/20">
                                                +{Math.abs(scoreDiff).toFixed(1)}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
