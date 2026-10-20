"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FiTrendingUp, FiAward } from "react-icons/fi";

const MAX_RATING = 5;

const toRows = (data) =>
    (Array.isArray(data) ? data : [])
        .map((item) => ({ label: item?.label?.trim?.() || "", value: Number(item?.value) }))
        .filter((item) => item.label && item.value !== null && !isNaN(item.value));

const GuideRating = React.memo(function GuideRating({ data, tyreName }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setIsMounted(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    const rows = useMemo(() => toRows(data), [data]);
    const topValue = rows.length > 1 ? Math.max(...rows.map((row) => row.value)) : null;

    if (rows.length === 0) return null;

    return (
        <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl p-4">
            <div className="grid md:grid-cols-[3fr_1fr] items-center md:gap-4 border-b pb-4 border-gray-300/20">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/10 ring-1 ring-orange-500/30 shadow-[0_0_14px_rgba(249,115,22,0.15)]">
                        <FiTrendingUp className="text-orange-500" size={18} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.12em] @md:tracking-[0.2em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent truncate">
                     PERFORMANCE METRICS
                        </h2>
                        <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5 @md:truncate">
                            How this tyre performs on the road
                        </p>
                    </div>
                </div>
                <div
                    className="hidden md:block pl-12 md:pl-0 text-[12px] md:text-base text-left @md:text-center font-black uppercase bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(249,115,22,0.2)] break-words @md:truncate"
                    title={tyreName}
                >
                    {tyreName}
                </div>
            </div>

            {rows.map((row, i) => {
                const pct = Math.min(Math.max(row.value / MAX_RATING, 0), 1) * 100;
                const isTop = topValue !== null && row.value === topValue;

                return (
                    <div
                        key={`${row.label}-${i}`}
                        className={` pt-3 transition-all duration-300`}
                    >
               <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 @md:grid-cols-[3fr_1fr] @md:gap-x-4">
                            <p className="min-w-0 break-words text-[10px] font-mono font-bold tracking-wider text-zinc-300 uppercase">
                                {row.label}
                            </p>

                            <div className="flex items-center justify-end gap-1.5 @md:row-span-2 @md:justify-center">
                                <span
                                    className={`text-xs md:text-sm font-mono font-black ${
                                        isTop ? "text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.5)]" : "text-zinc-300"
                                    }`}
                                >
                                    {row.value.toFixed(1)}
                                    <span className="text-[10px] text-zinc-500 font-bold">/{MAX_RATING}</span>
                                </span>
                                {isTop && (
                                    <FiAward size={12} className="text-orange-500 animate-pulse shrink-0" aria-label="Top rated" />
                                )}
                            </div>

                            <div
                                className="col-span-2 @md:col-span-1 h-2 bg-zinc-950/40 rounded-full border border-white/5 overflow-hidden"
                                role="progressbar"
                                aria-valuenow={row.value}
                                aria-valuemin="0"
                                aria-valuemax={MAX_RATING}
                                aria-label={`${row.label} rating for ${tyreName}`}
                            >
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${
                                        isTop
                                            ? "bg-gradient-to-r from-orange-600/40 to-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]"
                                            : "bg-gradient-to-r from-orange-600/30 to-orange-500/70"
                                    }`}
                                    style={{ width: `${isMounted ? pct : 0}%` }}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
});

export default GuideRating;
