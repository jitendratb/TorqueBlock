"use client";

import WhatsAppButton from "@/components/atoms/WhatsAppButton";
import Image from "@/components/molecules/CustomImage";
import { useMemo, useState } from "react";
import {
    FaMotorcycle, FaRoad, FaBolt, FaFlagCheckered,
    FaShieldAlt, FaTag, FaTools, FaTruck, FaUserTie,
    FaStar, FaRegStar, FaStarHalfAlt, FaCheckCircle,
    FaFireAlt, FaAward, FaTimesCircle, FaLightbulb, FaBiking, FaLayerGroup,
} from "react-icons/fa";
import { HiFire } from "react-icons/hi";
import { MdVerified, MdLocalShipping, MdSupportAgent } from "react-icons/md";
import { RiSparkling2Fill } from "react-icons/ri";

const tagConfig = {
    Street: { icon: <FaRoad className="text-zinc-300 text-xs" /> },
    "Weekend Rides": { icon: <FaMotorcycle className="text-zinc-300 text-xs" /> },
    "High Performance": { icon: <HiFire className="text-orange-500 text-xs" /> },
    "Extreme Grip": { icon: <FaBolt className="text-yellow-400 text-xs" /> },
    "Bi-Compound": { icon: <FaFlagCheckered className="text-green-400 text-xs" /> },
    Supersport: { icon: <FaMotorcycle className="text-zinc-300 text-xs" /> },
    "Naked Sport": { icon: <FaMotorcycle className="text-zinc-300 text-xs" /> },
};

function StarRating({ rating = 4.5, count = 356 }) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars.push(<FaStar key={i} className="text-orange-400 text-xs" />);
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            stars.push(<FaStarHalfAlt key={i} className="text-orange-400 text-xs" />);
        } else {
            stars.push(<FaRegStar key={i} className="text-zinc-600 text-xs" />);
        }
    }
    return (
        <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">{stars}</div>
            <span className="text-orange-400 text-xs font-bold">{Number(rating).toFixed(1)}</span>
            <span className="text-zinc-500 text-xs">({Number(count).toLocaleString()} reviews)</span>
        </div>
    );
}

function PriceCard({ tyre }) {
    const startingPrice = tyre?.startingPrice;
    const pricing = tyre?.pricing;
    const inStock = tyre?.availability?.inStock;
    const stockCount = tyre?.availability?.stockCount;
    console.log(pricing)

    if (!startingPrice && !pricing) {
        return (
            <div className="relative overflow-hidden rounded-2xl border border-orange-500/20 bg-white/10 p-4 shadow-[0_0_40px_rgba(249,115,22,0.08)]">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-orange-600/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="relative space-y-3">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-1">Pricing Info</p>
                        <h4 className="text-lg font-bold text-white leading-tight">Price on Request</h4>
                        <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                            Connect with our experts to get the best custom rate and verified size compatibility for your motorcycle.
                        </p>
                    </div>
                    <WhatsAppButton 
                        text="Query Price & Size"
                        message={`Hi TorqueBlock, I'd like to check the price and size availability for the tyre: ${tyre?.productName}`}
                        className="w-full justify-center"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden rounded-2xl border border-orange-500/20 bg-white/10 shadow-[0_0_40px_rgba(249,115,22,0.08)]">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-orange-600/5 rounded-full blur-xl pointer-events-none" />

            <div className="relative p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-1">Starting Price</p>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl md:text-4xl font-black text-white tracking-tight">
                                &#8377;{Number(startingPrice || pricing?.frontTyrePrice ).toLocaleString("en-IN")}
                            </span>
                            
                        </div>
                        <p className="text-zinc-500 text-[11px] mt-0.5">Price varies by size &bull; Inclusive of taxes</p>
                    </div>
                </div>

            </div>
        </div>
    );
}



export default function ProductDetails({ tyre }) {
    const gallery = useMemo(() => tyre?.productImages || [], [tyre]);
    const [activeImage, setActiveImage] = useState(gallery[0]);

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

    return (
        <section className="w-full relative">
            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col-reverse md:grid md:grid-cols-[80px_1fr] gap-3 md:gap-4">
                        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:h-[460px] pb-1 md:pb-0 md:pr-1">
                            {gallery?.map((item, idx) => {
                                const isActive = activeImage === item;
                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setActiveImage(item)}
                                        onMouseEnter={() => setActiveImage(item)}
                                        className={`relative shrink-0 h-16 w-16 md:h-[70px] md:w-[70px] overflow-hidden rounded-xl border-2 transition-all duration-300 ${isActive ? "border-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.4)] scale-95" : "border-zinc-800 hover:border-zinc-600 opacity-60 hover:opacity-100"}`}
                                    >
                                        <Image
                                            src={item}
                                            alt={`${tyre?.productName || "Tyre"} thumbnail ${idx + 1}`}
                                            fill
                                            sizes="70px"
                                            imageClassName="object-cover"
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        <div className="relative group h-[320px] md:h-[460px] w-full overflow-hidden">
                            {activeImage && (
                                <Image
                                    src={activeImage}
                                    alt={tyre?.productName || "Tyre"}
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    imageClassName="object-contain transition-transform duration-500 group-hover:scale-105"
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="space-y-4 mt-2 md:mt-0">
                        <div className="flex items-center gap-4">

                            <p className="text-[10px] lg:text-sm font-medium uppercase tracking-[0.2em] text-orange-500">
                                {tyre?.brand?.name} PERFORMANCE SERIES
                            </p>

                            <div className="absolute top-0 right-0 md:relative flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5 backdrop-blur-xl">
                                <FaShieldAlt className="text-xs text-green-400" />

                                <p className="text-xs font-medium text-green-100">
                                    Trusted by 50,000+ riders
                                </p>
                            </div>

                        </div>
                        </div>


                        <div>
                            <h1 className="text-2xl md:text-4xl font-black leading-[1.08] tracking-tight text-white">
                                Is{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-orange-400">
                                    {tyre?.productName}
                                </span>
                                <br />
                                <span className="text-zinc-400 text-xl md:text-2xl font-semibold">right for your bike?</span>
                            </h1>
                            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                                <StarRating
                                    rating={tyre?.schemaMarkup?.aggregateRating || 4.9}
                                    count={tyre?.schemaMarkup?.reviewCount || 150}
                                />
                                <span className="text-zinc-400 text-xs">on Google</span>
                            </div>
                        </div>

                        {tyre?.hero?.highlights?.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
                                {tyre.hero.highlights.map((h, i) => (
                                    <div key={i} className="shrink-0 flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1.5">
                                        <RiSparkling2Fill className="text-orange-400 text-[10px] shrink-0" />
                                        <span className="text-[10px] font-semibold text-orange-300 whitespace-nowrap">{h}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-2">
                            {allTags?.map((tag) => (
                                <div
                                    key={tag}
                                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900/70 px-3 py-1 hover:border-orange-500/30 transition-colors duration-200"
                                >
                                    {tagConfig[tag]?.icon}
                                    <span className="text-[11px] font-semibold text-zinc-300">{tag}</span>
                                </div>
                            ))}
                            {tyre?.categoryId?.name && (
                                <div className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 px-3 py-1">
                                    <FaTag className="text-blue-400 text-xs" />
                                    <span className="text-[11px] font-semibold text-blue-300">{tyre.categoryId.name}</span>
                                </div>
                            )}
                        </div>
                        <PriceCard tyre={tyre} />

                        <div className="relative mt-1">
                            <div className="grid grid-cols-3 gap-2 px-1">
                                <div className="group relative flex flex-col items-center gap-1.5 rounded-xl border border-orange-500/20 bg-gradient-to-b from-orange-500/10 to-white/10 px-2 py-3 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:from-orange-500/15 hover:shadow-[0_0_18px_rgba(249,115,22,0.15)]">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/15 ring-1 ring-orange-500/30 transition-all duration-300 group-hover:ring-orange-500/60 group-hover:shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                                        <MdLocalShipping className="text-orange-400 text-lg" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-bold tracking-wide text-white/90 md:text-[11px]">Free Delivery</p>
                                        <p className="text-[8px] text-zinc-500 md:text-[9px]">Pan India</p>
                                    </div>
                                </div>

                                <div className="group relative flex flex-col items-center gap-1.5 rounded-xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/10 to-white/10 px-2 py-3 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:from-emerald-500/15 hover:shadow-[0_0_18px_rgba(16,185,129,0.15)]">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30 transition-all duration-300 group-hover:ring-emerald-500/60 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                                        <MdVerified className="text-emerald-400 text-lg" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-bold tracking-wide text-white/90 md:text-[11px]">100% Genuine</p>
                                        <p className="text-[8px] text-zinc-500 md:text-[9px]">Certified Brand</p>
                                    </div>
                                </div>

                                <div className="group relative flex flex-col items-center gap-1.5 rounded-xl border border-blue-500/20 bg-gradient-to-b from-blue-500/10 to-white/10 px-2 py-3 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:from-blue-500/15 hover:shadow-[0_0_18px_rgba(59,130,246,0.15)]">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/15 ring-1 ring-blue-500/30 transition-all duration-300 group-hover:ring-blue-500/60 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                        <MdSupportAgent className="text-blue-400 text-lg" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-bold tracking-wide text-white/90 md:text-[11px]">Expert Help</p>
                                        <p className="text-[8px] text-zinc-500 md:text-[9px]">24/7 Support</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
        </section>
    );
}
