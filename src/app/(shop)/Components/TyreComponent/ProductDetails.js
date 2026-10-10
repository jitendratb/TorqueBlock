"use client";

import { memo, useMemo, useCallback, useState, Suspense, use } from "react";
import StarRating from "@/components/atoms/StarRating";
import PriceCard from "./PriceCard";
import ProductGallery from "@/components/organisms/ProductGallery";

import { FaMotorcycle, FaRoad, FaBolt, FaFlagCheckered, FaShieldAlt, FaTag, FaChevronDown } from "react-icons/fa";
import { HiFire } from "react-icons/hi";
import { MdVerified, MdLocalShipping, MdSupportAgent } from "react-icons/md";
import { RiSparkling2Fill } from "react-icons/ri";

const tagConfig = {
    Street: { icon: <FaRoad className="text-zinc-300 text-xs" /> },
    "Weekend Rides": { icon: <FaMotorcycle className="text-zinc-300 text-xs" /> },
    "High Performance": { icon: <HiFire className="text-orange-500 text-xs" /> },
    "Extreme Grip": { icon: <FaBolt className="text-yellow-400 text-xs" /> },
    "Bi-Compound": { icon: <FaFlagCheckered className="text-orange-400 text-xs" /> },
    Supersport: { icon: <FaMotorcycle className="text-zinc-300 text-xs" /> },
    "Naked Sport": { icon: <FaMotorcycle className="text-zinc-300 text-xs" /> },
};

const ProductDetails = memo(function ProductDetails({ tyre, reviewsPromise }) {


    const allTags = useMemo(() => {
        const eyebrow = tyre?.hero?.eyebrowText || "";
        const subtitle = tyre?.hero?.subtitle || "";
        const combinedText = `${eyebrow} ${subtitle}`.toLowerCase();
        const tags = [];

        Object.keys(tagConfig).forEach(tag => {
            if (tag !== "High Performance" && combinedText.includes(tag.toLowerCase())) {
                tags.push(tag);
            }
        });

        return [...new Set(tags), "High Performance"];
    }, [tyre]);


    const [firstWord, ...otherWords] = (tyre?.productName || "").trim().split(/\s+/);
    const restOfName = otherWords.join(" ");

    const scrollToSizes = useCallback(() => {
        document.getElementById("allSizesLink")?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);


    return (
        <section className="w-full relative">
            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 ">
                <div className="flex flex-col gap-4">
                    <ProductGallery images={tyre?.productImages} alt={tyre?.alt || "Tyre"} />
                </div>

                <div className="flex flex-col gap-4">
                    <div className="mt-2 flex flex-wrap items-center gap-3 md:mt-0">
                        <div className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-orange-500/30 bg-gradient-to-r from-orange-500/15 via-orange-500/5 to-white/10 px-4 py-1.5 shadow-[0_0_20px_rgba(249,115,22,0.15)] backdrop-blur-xl">
                            <RiSparkling2Fill size={14} className="z-10 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                            <span className="z-10 text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 lg:text-xs">
                                {tyre?.brand?.name}
                            </span>
                        </div>

                        {tyre?.categoryId?.name && (
                            <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5">
                                <FaTag className="text-xs text-orange-400" />
                                <span className="text-[11px] font-semibold text-orange-300">{tyre.categoryId.name}</span>
                            </div>
                        )}
                    </div>


                    <div className="">
                        <h1 className="text-3xl md:text-5xl lg:text-3xl font-black leading-[1.05] tracking-tighter text-white">
                            <span className="sr-only">
                                {tyre?.brand?.name ? `${tyre.brand.name} ${tyre?.productName}` : tyre?.productName} Motorcycle Tyre
                            </span>
                            <span aria-hidden="true">
                                Is {" "}
                                <span className="lg:text-[3rem] drop-shadow-lg">
                                    <span className="text-white">{firstWord}</span>
                                    {restOfName && (
                                        <>
                                            {" "}
                                            <span className="text-orange-500">{restOfName}</span>
                                        </>
                                    )}
                                </span>
                                <span className="block text-zinc-400 text-xl md:text-2xl lg:text-3xl font-medium tracking-tight">
                                    right for your motorcycle?
                                </span>
                            </span>
                        </h1>


                        {/* <Suspense fallback={<div className="mt-2.5 min-h-[20px]" />}>
                            <HeroRating reviewsPromise={reviewsPromise} />
                        </Suspense> */}
                    </div>


                    {tyre?.hero?.highlights?.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none px-1">
                            {tyre.hero.highlights.slice(0, 3).map((h, i) => (
                                <div key={i} className="shrink-0 flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1.5">
                                    <RiSparkling2Fill className="text-orange-400 text-[10px] shrink-0" />
                                    <span className="text-[10px] font-semibold text-orange-300 whitespace-nowrap">{h}</span>
                                </div>
                            ))}
                        </div>
                    )}


                    <p className={`text-sm leading-relaxed text-zinc-400 md:text-[15px] line-clamp-3`}>
                        {tyre?.hero?.subtitle}
                    </p>


                    <PriceCard tyre={tyre} />

                    <div className="w-full">
                        <button
                            onClick={scrollToSizes}
                            className="group relative w-full flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <span className="relative z-10 text-xs md:text-sm font-black uppercase tracking-[0.25em] text-white drop-shadow-md">
                                View All {tyre?.sizesIds?.length} Sizes
                            </span>
                            <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-y-1">
                                <FaChevronDown className="text-white text-xs drop-shadow-sm" />
                            </div>
                        </button>
                    </div>

                    <div className="relative">
                        <div className="grid grid-cols-3 gap-2 px-1">
                            <div className="group relative flex flex-col sm:flex-row justify-center items-center gap-1.5 sm:gap-3 rounded-xl border border-orange-500/20 bg-gradient-to-b from-orange-500/10 to-white/10 px-1.5 py-3 sm:px-2 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:from-orange-500/15 hover:shadow-[0_0_18px_rgba(249,115,22,0.15)]">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/15 ring-1 ring-orange-500/30 transition-all duration-300 group-hover:ring-orange-500/60 group-hover:shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                                    <MdLocalShipping className="text-orange-400 text-lg" />
                                </div>
                                <div className="text-center">
                                    <p className="text-[11px] font-bold leading-tight tracking-wide text-white/90">Free Delivery</p>
                                    <p className="text-[9px] text-zinc-500">Pan India</p>
                                </div>
                            </div>

                            <div className="group relative flex flex-col sm:flex-row justify-center items-center gap-1.5 sm:gap-3 rounded-xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/10 to-white/10 px-1.5 py-3 sm:px-2 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:from-emerald-500/15 hover:shadow-[0_0_18px_rgba(16,185,129,0.15)]">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30 transition-all duration-300 group-hover:ring-emerald-500/60 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                                    <MdVerified className="text-emerald-400 text-lg" />
                                </div>
                                <div className="text-center">
                                    <p className="text-[11px] font-bold leading-tight tracking-wide text-white/90">100% Genuine</p>
                                    <p className="text-[9px] text-zinc-500">Certified Brand</p>
                                </div>
                            </div>

                            <div className="group relative flex flex-col sm:flex-row justify-center items-center gap-1.5 sm:gap-3 rounded-xl border border-orange-500/20 bg-gradient-to-b from-orange-500/10 to-white/10 px-1.5 py-3 sm:px-2 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:from-orange-500/15 hover:shadow-[0_0_18px_rgba(59,130,246,0.15)]">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/15 ring-1 ring-orange-500/30 transition-all duration-300 group-hover:ring-orange-500/60 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                    <MdSupportAgent className="text-orange-400 text-lg" />
                                </div>
                                <div className="text-center">
                                    <p className="text-[11px] font-bold leading-tight tracking-wide text-white/90">Expert Help</p>
                                    <p className="text-[9px] text-zinc-500">24/7 Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
});

export default ProductDetails;
