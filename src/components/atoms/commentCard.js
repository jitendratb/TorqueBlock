"use client";

import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaUserCircle } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

export default function CommentCard({ review }) {
    const [expanded, setExpanded] = useState(false);

    const reviewText = review?.review || "";
    const words = reviewText.split(" ");
    const isLong = words.length > 18;
    const preview = words.slice(0, 18).join(" ") + (isLong ? "…" : "");
    console.log(review)
    const name = review?.name || review?.userId?.address?.fullName || review?.userId?.name || "Anonymous";
    const rating = review?.rating || 0;

    return (
        <div className={`rounded-xl border border-zinc-800/70 bg-white/10 p-3 transition-all duration-300 hover:border-zinc-700/70 overflow-hidden flex flex-col ${expanded ? 'max-h-[260px]' : 'max-h-[100px]'}`}>
            <div className="flex items-center justify-between mb-1.5 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/30 to-orange-600/10 ring-1 ring-orange-500/30">
                        <FaUserCircle className="text-orange-400 text-base" />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-white leading-none flex gap-1">
                            {name}
                            {name !== "Anonymous" && (
                                <span><MdVerified className="text-green-400 text-xs shrink-0" title="Verified Purchase" /></span>
                            )}
                        </p>
                        <div className="flex items-center gap-0.5 mt-0.5">
                            {[1, 2, 3, 4, 5].map((i) => {
                                if (rating >= i) {
                                    return <FaStar key={i} className="text-[8px] text-orange-400" />;
                                } else if (rating >= i - 0.5) {
                                    return <FaStarHalfAlt key={i} className="text-[8px] text-orange-400" />;
                                } else {
                                    return <FaStar key={i} className="text-[8px] text-white/20" />;
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-zinc-400 text-[10px] leading-relaxed">
                {expanded || !isLong ? reviewText : preview}
            </p>

            {isLong && (
                <button
                    onClick={() => setExpanded((p) => !p)}
                    className="mt-1 text-[9px] font-bold text-orange-400 hover:text-orange-300 transition-colors duration-150"
                >
                    {expanded ? "Hide ↑" : "Read more ↓"}
                </button>
            )}
        </div>
    );
}
