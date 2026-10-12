"use client";

import React from "react";
import { FaBell, FaShieldAlt } from "react-icons/fa";
import Image from "@/components/molecules/CustomImage";

const AVAILABILITY = {
    in_stock: { label: "In Stock", badge: "border-green-500/20 bg-green-500/10 text-green-400" },
    backorder: { label: "Available To Order", badge: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400" },
    preorder: { label: "Pre Order", badge: "border-blue-500/20 bg-blue-500/10 text-blue-400" },
};
const OUT_OF_STOCK = { label: "Out of Stock", badge: "border-red-500/20 bg-red-500/10 text-red-400" };

export default function StickyBuyBar({ isVisible, image, name, subtitle, availability, price, priceNote, isRinging, onAddToCart, onBuyNow, onNotify }) {
    const stock = AVAILABILITY[availability] || OUT_OF_STOCK;
    const canNotify = availability === "backorder" || availability === "out_of_stock";
    const canAddToCart = availability !== "backorder";

    return (
        <div
            data-sticky-buy-bar
            data-visible={isVisible || undefined}
            inert={!isVisible}
            className={`fixed inset-x-0 bottom-0 z-40 md:bottom-4 md:px-4 transition-all duration-300 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-[calc(100%+1rem)] opacity-0 pointer-events-none"}`}
        >
            <div className="mx-auto flex max-w-[78rem] flex-col gap-3 rounded-t-2xl border-t border-white/10 bg-black/20 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:flex-row md:items-center md:gap-4 md:rounded-2xl md:border md:py-3">
                <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-4">
                    {image && (
                        <div className="relative h-11 w-11 md:h-14 md:w-14 shrink-0 overflow-hidden rounded-xl bg-white/5">
                            <Image src={image} alt={name} fill sizes="56px" quality={60} imageClassName="object-contain" />
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm lg:text-base font-black text-white">{name}</p>
                        {subtitle && <p className="truncate text-[11px] lg:text-xs font-medium text-zinc-400">{subtitle}</p>}
                        <span className={`mt-1 hidden md:inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${stock.badge}`}>
                            <FaShieldAlt className="text-[9px]" aria-hidden="true" />
                            {stock.label}
                        </span>
                    </div>

                    <div className="shrink-0 text-right">
                        <p className="text-lg md:text-xl lg:text-2xl font-black leading-none text-white">{price}</p>
                        <p className="mt-1 text-[9px] md:text-[10px] font-medium text-zinc-400">{priceNote}</p>
                    </div>
                </div>

                <span className="hidden lg:block h-12 w-px shrink-0 bg-white/10" aria-hidden="true" />

                <div className={`grid gap-2 md:flex md:shrink-0 lg:gap-3 ${canAddToCart ? "grid-cols-2" : "grid-cols-1"}`}>
                    {canAddToCart && (
                        <button
                            type="button"
                            onClick={onAddToCart}
                            className="rounded-xl border border-white/10 bg-white/10 px-4 lg:px-8 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-white/15 transition-colors duration-300 cursor-pointer"
                        >
                            Add to Cart
                        </button>
                    )}
                    {canNotify ? (
                        <button
                            type="button"
                            onClick={onNotify}
                            className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 lg:px-8 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-colors duration-300 cursor-pointer"
                        >
                            Notify Me
                            <FaBell className={`text-sm ${isRinging ? "animate-bell-ring" : ""}`} aria-hidden="true" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={onBuyNow}
                            className="rounded-xl bg-orange-500 px-4 lg:px-8 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-colors duration-300 cursor-pointer"
                        >
                            Buy Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
