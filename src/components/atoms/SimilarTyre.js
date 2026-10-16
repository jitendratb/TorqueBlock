"use client";

import React from "react";
import { FiLayers } from "react-icons/fi";
import Carousel from "@/components/organisms/Carousel";
import TyreCard from "@/components/atoms/TyreCard";

function SimilarTyre({ items = [], title = "Similar Tyres", subtitle = "Similar tyres you might like" }) {
    const tyres = Array.isArray(items) ? items.filter((item) => item && typeof item === "object") : [];

    if (tyres.length === 0) return null;

    return (
        <section className="relative space-y-4">
            <div className="flex items-center gap-3 lg:border-b lg:border-white/10 lg:pb-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/10 ring-1 ring-orange-500/30 shadow-[0_0_14px_rgba(249,115,22,0.15)]">
                    <FiLayers size={18} className="text-orange-500" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                        {title}
                    </h2>
                    <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                        {subtitle}
                    </p>
                </div>
            </div>
            <div className="relative">
                <Carousel
                    items={tyres}
                    itemWidth="w-[280px] md:w-[300px]"
                    renderItem={(item) => <TyreCard key={item._id} product={item} />}
                    gap={16}
                    showArrows={true}
                />
            </div>
        </section>
    );
}

export default SimilarTyre;
