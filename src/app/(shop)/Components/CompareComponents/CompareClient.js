"use client";

import React from "react";
import { FiZap } from "react-icons/fi";
import { FaMotorcycle } from "react-icons/fa6";
import WhatsAppButton from "@/components/atoms/WhatsAppButton";
import BikeCard from "../BikeCard";
import FitmentGalleryClient from "../FitmentGalleryClient";

import CompareHeader from "./CompareHeader";
import CompareDescriptions from "./CompareDescriptions";
import CompareRatings from "./CompareRatings";
import CompareSizes from "./CompareSizes";
import CompareChooseIf from "./CompareChooseIf";
import CompareBestUse from "./CompareBestUse";
import CompareProducts from "./CompareProducts";

export default function CompareClient({ data, slug }) {
    if (!data) return null;

    const parts = (slug || "").split("-vs-");
    const tyre1 = data?.tyre1 || {};
    const tyre2 = data?.tyre2 || {};
    const tyre1Name = tyre1?.productName || parts[0]?.replace(/-/g, " ") || "Tyre 1";
    const tyre2Name = tyre2?.productName || parts[1]?.replace(/-/g, " ") || "Tyre 2";
    const tyre1Image = tyre1?.productImages?.[0] || null;
    const tyre2Image = tyre2?.productImages?.[0] || null;
    const tyre1Gallery = tyre1?.gallery || [];
    const tyre2Gallery = tyre2?.gallery || [];
    const tyre1Ratings = tyre1?.ratings || {};
    const tyre2Ratings = tyre2?.ratings || {};
    const compatibleBikes = data?.compatibleBikes || [];
    const category = data?.category || "";
    const seo = data?.seo || {};

    const waMessage = `I just compared ${tyre1Name} vs ${tyre2Name} and need expert advice to choose the perfect tyre for my machine.`;

    return (
        <div className="space-y-4 mb-4">
            <CompareHeader
                category={category}
                tyre1Name={tyre1Name}
                tyre2Name={tyre2Name}
                tyre1Image={tyre1Image}
                tyre2Image={tyre2Image}
                seo={seo}
                tyre1={tyre1}
                tyre2={tyre2}
            />

            <CompareDescriptions
                tyre1={tyre1}
                tyre2={tyre2}
                tyre1Name={tyre1Name}
                tyre2Name={tyre2Name}
            />

            <CompareRatings
                tyre1Ratings={tyre1Ratings}
                tyre2Ratings={tyre2Ratings}
                tyre1Name={tyre1Name}
                tyre2Name={tyre2Name}
            />

            <CompareSizes
                tyre1={tyre1}
                tyre2={tyre2}
                tyre1Name={tyre1Name}
                tyre2Name={tyre2Name}
            />

            <CompareChooseIf
                tyre1={tyre1}
                tyre2={tyre2}
                tyre1Name={tyre1Name}
                tyre2Name={tyre2Name}
            />

            <CompareBestUse
                tyre1={tyre1}
                tyre2={tyre2}
                tyre1Name={tyre1Name}
                tyre2Name={tyre2Name}
            />


            {(tyre1Gallery.length > 0 || tyre2Gallery.length > 0) && (
                <FitmentGalleryClient
                    tyre1Gallery={tyre1Gallery}
                    tyre2Gallery={tyre2Gallery}
                    tyre1Name={tyre1Name}
                    tyre2Name={tyre2Name}
                />
            )}

            <CompareProducts tyre1={tyre1} tyre2={tyre2} tyre1Name={tyre1Name} tyre2Name={tyre2Name} />

            {compatibleBikes.length > 0 && (
                <div className="">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl border border-orange-500/25 bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                            <FaMotorcycle size={18} />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-xs md:text-sm font-black tracking-widest text-zinc-100 uppercase">
                                COMMONLY USED ON
                            </span>
                            <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase mt-0.5 tracking-wider">
                                Verified Compatible Vehicles
                            </span>
                        </div>
                    </div>
                    <div className="border-t border-white/5 my-4" />
                    <div className="flex gap-4 overflow-x-auto w-full scroll-smooth pb-2">
                        {compatibleBikes.map((bike, index) => (
                            <BikeCard key={bike?._id} brand={bike} index={index} className="w-[260px] md:w-[300px] shrink-0" />
                        ))}
                    </div>
                </div>
            )}


        </div>
    );
}
