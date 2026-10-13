"use client";

import { memo, useMemo, useCallback, useState, Suspense, use } from "react";
import StarRating from "@/components/atoms/StarRating";
import PriceCard from "./PriceCard";
import ProductGallery from "@/components/organisms/ProductGallery";
import ProductTrust from "@/components/molecules/ProductTrust";

import { FaMotorcycle, FaRoad, FaBolt, FaFlagCheckered, FaShieldAlt, FaChevronDown } from "react-icons/fa";
import { HiFire } from "react-icons/hi";
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
                    <div className="mt-2 flex min-w-0 items-center gap-2.5 md:mt-0">
                        <span className="flex shrink-0 items-center gap-1.5 ">
                            <RiSparkling2Fill size={14} className="text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" aria-hidden="true" />
                            <span className="text-[10px] lg:text-xs font-black uppercase tracking-[0.3em] text-orange-400">
                                {tyre?.brand?.name}
                            </span>
                        </span>

                        {tyre?.categoryId?.name && (
                            <>
                                <span className="h-3.5 w-px shrink-0 bg-white/25" aria-hidden="true" />
                                <span className="truncate text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">
                                    {tyre.categoryId.name}
                                </span>
                            </>
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

                    <ProductTrust />
                </div>

            </div>
        </section>
    );
});

export default ProductDetails;
