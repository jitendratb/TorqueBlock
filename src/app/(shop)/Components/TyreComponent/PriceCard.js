"use client";

import React from 'react';
import WhatsAppButton from "@/components/atoms/WhatsAppButton";
import { MdVerified } from "react-icons/md";

export default function PriceCard({ tyre }) {
    const startingPrice = tyre?.startingPrice;
    const endingPrice = tyre?.endingPrice;
    const pricing = tyre?.pricing;

    const priceMin = Number(startingPrice || pricing?.frontTyrePrice);
    const priceMax = Number(endingPrice);
    const isRange = priceMax > 0 && priceMin !== priceMax;

    if (!priceMin) {
        return (
            <div className="relative overflow-hidden rounded-2xl border border-orange-500/20 bg-white/10 p-5 shadow-[0_0_40px_rgba(249,115,22,0.08)] backdrop-blur-xl">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-orange-600/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="relative space-y-3">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-1 drop-shadow-sm">Pricing Info</p>
                        <h4 className="text-xl font-bold text-white leading-tight">Price on Request</h4>
                        <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
                            Connect with our experts to get the best custom rate and verified size compatibility for your motorcycle.
                        </p>
                    </div>
                    <WhatsAppButton 
                        text="Query Price & Size"
                        message={`Hi TorqueBlock, I'd like to check the price and size availability for the tyre: ${tyre?.productName}`}
                        className="w-full justify-center mt-2"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent p-4 shadow-[0_0_40px_rgba(249,115,22,0.1)] backdrop-blur-xl group transition-all duration-500 hover:border-orange-500/50">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-500/30 transition-colors duration-700" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-2 drop-shadow-sm">
                    {isRange ? "Price Range" : "Starting Price"}
                </p>
                <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1">
                    <span className="text-3xl md:text-4xl font-black text-white tracking-tighter drop-shadow-md">
                        &#8377;{priceMin.toLocaleString("en-IN")}
                    </span>
                    
                    {isRange && (
                        <>
                            <span className="text-xl font-bold text-zinc-500 mx-1 drop-shadow-sm">-</span>
                            <span className="text-xl font-black text-zinc-300 tracking-tighter drop-shadow-md">
                                &#8377;{priceMax.toLocaleString("en-IN")}
                            </span>
                        </>
                    )}
                </div>
                <div className="mt-2 flex items-center gap-2 border-t border-white/10 pt-2">
                    <MdVerified className="text-green-400 text-sm drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <p className="text-zinc-400 text-[11px] font-medium tracking-wide">
                        Inclusive of all taxes &bull; Varies by size
                    </p>
                </div>
            </div>
        </div>
    );
}
