"use client";

import React from "react";
import { FiZap } from "react-icons/fi";
import WhatsAppButton from "@/components/atoms/WhatsAppButton";
import BikeCard from "../BikeCard";
import FitmentGalleryClient from "../FitmentGalleryClient";

import CompareHeader from "./CompareHeader";
import CompareDescriptions from "./CompareDescriptions";
import CompareRatings from "./CompareRatings";
import CompareSizes from "./CompareSizes";
import CompareChooseIf from "./CompareChooseIf";
import CompareBestUse from "./CompareBestUse";

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <WhatsAppButton
                    text={`Get ${tyre1Name} Deal`}
                    value={`Hi Torque Block! I was comparing tyres and I'm interested in getting the best deal on the ${tyre1Name} tyre. Can you assist me with stock, price, and fitment?`}
                />

                <WhatsAppButton
                    text={`Get ${tyre2Name} Deal`}
                    value={`Hi Torque Block! I was comparing tyres and I'm interested in getting the best deal on the ${tyre2Name} tyre. Can you assist me with stock, price, and fitment?`}
                />
            </div>

            {(tyre1Gallery.length > 0 || tyre2Gallery.length > 0) && (
                <FitmentGalleryClient
                    tyre1Gallery={tyre1Gallery}
                    tyre2Gallery={tyre2Gallery}
                    tyre1Name={tyre1Name}
                    tyre2Name={tyre2Name}
                />
            )}

            {compatibleBikes.length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <FiZap className="text-orange-400" size={16} />
                        <h2 className="text-lg font-black text-white uppercase tracking-widest">Compatible Bikes</h2>
                    </div>
                    <div className="flex gap-4 overflow-x-auto w-full scroll-smooth">
                        {compatibleBikes.map((bike, index) => (
                            <BikeCard key={bike?._id} brand={bike} index={index} className="w-[260px] md:w-[360px] shrink-0" />
                        ))}
                    </div>
                </div>
            )}

            <div className="relative rounded-xl md:rounded-[1.5rem] overflow-hidden border border-orange-500/20 bg-zinc-950/60 backdrop-blur-2xl shadow-[0_20px_60px_rgba(249,115,22,0.12)]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.15)_0%,transparent_70%)] pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-6">
                    <div className="space-y-3 max-w-xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
                            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
                            <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest">Expert Support Online</span>
                        </div>
                        <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight">
                            Can't Decide Your{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-500">Weapon?</span>
                        </h3>
                        <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-md">
                            Skip the guesswork. Our tyre specialists will help you pick the perfect match for your ride & style.
                        </p>
                    </div>
                    <div className="w-full md:max-w-[300px] shrink-0">
                        <WhatsAppButton text="Get Expert Advice" value={waMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
}
