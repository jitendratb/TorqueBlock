"use client";

import { useState } from "react";
import { FaStar, FaAward, FaPen, FaUserCircle } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

// Sample comments fallback if no reviews passed
const SAMPLE_COMMENTS = [
    {
        name: "Rajesh K.",
        rating: 5,
        comment:
            "Absolutely brilliant tyre! The grip on wet roads is exceptional. I've been using these for 6 months and there's no visible wear. Highly recommend to every biker who rides in monsoon season.",
    },
    {
        name: "Priya M.",
        rating: 4,
        comment:
            "Great value for money. Handling has improved significantly after switching to these tyres. Wet performance is solid and the ride feels planted on highways.",
    },
    {
        name: "Arun S.",
        rating: 5,
        comment:
            "Superb quality! Delivery was fast and the fitment was perfect. No vibrations at high speed. Really impressed with the durability after 3000 km of mixed riding.",
    },
    {
        name: "Deepak T.",
        rating: 4,
        comment:
            "Good tyre overall. Mileage is decent and grip levels are consistent. Would have given 5 stars but the sidewall stiffness is slightly more than expected.",
    },
    {
        name: "Meena R.",
        rating: 5,
        comment:
            "Torque Block made the whole buying process seamless. The tyre performs exactly as advertised — excellent cornering and stability. Will definitely buy again!",
    },
];

function CommentCard({ review }) {
    const [expanded, setExpanded] = useState(false);
    const words = review.comment.split(" ");
    const isLong = words.length > 18;
    const preview = words.slice(0, 18).join(" ") + (isLong ? "…" : "");

    return (
        <div className="rounded-xl border border-zinc-800/70 bg-white/10 p-3 transition-all duration-200 hover:border-zinc-700/70">
            <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/30 to-orange-600/10 ring-1 ring-orange-500/30">
                        <FaUserCircle className="text-orange-400 text-base" />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-white leading-none flex gap-1">{review.name}            <span><MdVerified className="text-green-400 text-xs shrink-0" title="Verified Purchase" /></span>     </p>
                        <div className="flex items-center gap-0.5 mt-0.5">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <FaStar
                                    key={i}
                                    className={`text-[8px] ${i <= review.rating ? "text-orange-400" : "text-zinc-700"}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-zinc-400 text-[10px] leading-relaxed">
                {expanded || !isLong ? review.comment : preview}
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

export default function ReviewsCard({ reviews }) {
    const [hovered, setHovered] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const rating = reviews?.aggregateRating || 4.5;
    const reviewCount = reviews?.reviewCount || 0;
    const comments = reviews?.comments?.length ? reviews.comments : SAMPLE_COMMENTS;

    const highlights = [
        { label: "Grip", score: 4.8 },
        { label: "Wet Perf.", score: 4.6 },
        { label: "Durability", score: 4.2 },
        { label: "Value", score: 4.4 },
    ];

    return (
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-white/10 p-4">
            <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-orange-500/5 blur-3xl" />

            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-3">
                Rider Reviews
            </p>

            <div className="flex flex-col md:flex-row gap-4">

                <div className="flex flex-col gap-4 md:w-[45%] shrink-0">

                    <div className="flex items-start justify-between">
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-white leading-none">
                                {Number(rating).toFixed(1)}
                            </span>
                            <div className="flex flex-col gap-0.5">
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <FaStar
                                            key={i}
                                            className={`text-xs ${i <= Math.round(rating) ? "text-orange-400" : "text-zinc-700"}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-zinc-500 text-[10px]">
                                    {Number(reviewCount).toLocaleString()} verified riders
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/5">
                            <FaAward className="text-orange-400 text-[10px]" />
                            <span className="text-orange-400 text-[10px] font-bold">Top Rated</span>
                        </div>
                    </div>

                    <div className="space-y-2.5">
                        {highlights.map(({ label, score }) => (
                            <div key={label} className="flex items-center gap-3">
                                <span className="text-zinc-400 text-[10px] font-medium w-16 shrink-0">{label}</span>
                                <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-700"
                                        style={{ width: `${(score / 5) * 100}%` }}
                                    />
                                </div>
                                <span className="text-orange-400 text-[10px] font-bold w-6 text-right">{score}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-zinc-800/60">
                        <MdVerified className="text-green-400 text-sm shrink-0" />
                        <p className="text-zinc-500 text-[10px]">Verified purchasers via Torque Block</p>
                    </div>

                    <button
                        onClick={() => { }}
                        className="group flex w-full items-center justify-center gap-2 rounded-xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-4 py-2.5 text-sm font-bold text-orange-400 transition-all duration-300 hover:border-orange-500/60 hover:from-orange-500/20 hover:to-orange-600/20 hover:shadow-[0_0_18px_rgba(249,115,22,0.2)] active:scale-95"
                    >
                        <FaPen className="text-xs transition-transform duration-300 group-hover:-rotate-12" />
                        Write a Review
                    </button>

                </div>

                <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-zinc-700/40 to-transparent shrink-0" />
                <div className="md:hidden h-px w-full bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent" />

                <div className="flex-1 grid grid-cols-2 gap-2.5 max-h-[270px] overflow-y-auto pr-1 scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700 hover:scrollbar-thumb-orange-500/50">
                    {comments.map((review, idx) => (
                        <CommentCard key={idx} review={review} />
                    ))}
                </div>
            </div>
        </div>
    );
}