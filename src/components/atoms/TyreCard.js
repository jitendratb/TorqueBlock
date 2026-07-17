'use client';

import React from 'react';
import Image from "@/components/molecules/CustomImage";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";

export default function ProductCard({ product, tyre, className  }) {
    const router = useRouter();

    const isSingleSize = !!product?.price;
    const title = product?.hero?.title || tyre?.productName || "Tyre";
    const categoryName = product?.categoryId?.name || product?.availableTyres?.categoryId?.name || "Premium Tyre";


    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const displayPrice = formatPrice(product?.price)


    const labelText = "Price"
    const sizeCountText = product?.availability === "in_stock" ? "In Stock"
        : product?.availability === "backorder" ? "Available To Order"
            : product?.availability === "preorder" ? "Pre Order"
                : "Out of Stock";


    const handleCardClick = () => {
        const tyreIdentifier = product?.availableTyres?.identifier || tyre?.identifier || "unknown";
        router.push(`/tyres/${tyreIdentifier}/${product?.size?.toLowerCase().replace(/[\s/]/g, '-')}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className={`group mt-1 cursor-pointer relative flex flex-col w-full bg-white/20 hover:bg-white/10 [.light-mode_&]:bg-white/20  [.light-mode_&]:backdrop-blur-3xl hover:bg-white/10 [.light-mode_&]:hover:bg-zinc-950/20 backdrop-blur-md border border-white/5 [.light-mode_&]:border-white/30 hover:border-orange-500/30 [.light-mode_&]:hover:border-orange-400/50 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] [.light-mode_&]:shadow-[0_2px_15px_rgba(0,0,0,0.04)] [.light-mode_&]:hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/5 [.light-mode_&]:to-orange-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative w-full h-45 flex items-center justify-center p-4">
                <Image
                    src={product?.productImages?.[0] || product?.availableTyres?.productImages?.[0] || tyre?.productImages?.[0] || '/newLogo.webp'}
                    alt={title}
                    fill
                    imageClassName="object-contain group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-lg"
                />

                <span className={`absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-md border transition-all duration-300 ${product?.availability === "in_stock"
                    ? "bg-emerald-500/10 [.light-mode_&]:bg-emerald-50 border-emerald-500/20 [.light-mode_&]:border-emerald-200 text-emerald-400 [.light-mode_&]:text-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                    : product?.availability === "backorder"
                        ? "bg-yellow-500/10 [.light-mode_&]:bg-yellow-50 border-yellow-500/20 [.light-mode_&]:border-yellow-200 text-yellow-400 [.light-mode_&]:text-yellow-600 shadow-[0_0_10px_rgba(234,179,8,0.1)]"
                        : product?.availability === "preorder"
                            ? "bg-blue-500/10 [.light-mode_&]:bg-blue-50 border-blue-500/20 [.light-mode_&]:border-blue-200 text-blue-400 [.light-mode_&]:text-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                            : "bg-red-500/10 [.light-mode_&]:bg-red-50 border-red-500/20 [.light-mode_&]:border-red-200 text-red-400 [.light-mode_&]:text-red-600 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
                    }`}>
                    <span className="relative flex h-1.5 w-1.5">
                        {product?.availability === "in_stock" && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        )}
                        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${product?.availability === "in_stock" ? "bg-emerald-500"
                            : product?.availability === "backorder" ? "bg-yellow-500"
                                : product?.availability === "preorder" ? "bg-blue-500"
                                    : "bg-red-500"
                            }`}></span>
                    </span>
                    <span>{sizeCountText}</span>
                </span>
            </div>

            <div className="flex flex-col p-4 gap-3 flex-1 justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 [.light-mode_&]:text-black/60 uppercase tracking-wider transition-colors duration-500">
                        <span className="bg-white/5 [.light-mode_&]:bg-white/10  border border-white/10  px-2 py-0.5 rounded-md transition-colors duration-500">
                            {categoryName}
                        </span>

                    </div>

                    <h3 className="text-base md:text-lg font-black text-zinc-100 [.light-mode_&]:text-zinc-800 group-hover:text-white [.light-mode_&]:group-hover:text-zinc-950 uppercase tracking-tight line-clamp-2 transition-colors duration-500">
                        {title}
                    </h3>
                </div>

                <div className="flex items-end justify-between gap-2 pt-3 border-t border-white/10 transition-colors duration-500">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-white/80 [.light-mode_&]:text-zinc-600 font-bold uppercase tracking-wider mb-0.5 transition-colors duration-500">{labelText}</span>
                        <span className="text-base md:text-lg font-black text-white [.light-mode_&]:text-zinc-900 transition-colors duration-500">
                            {displayPrice}
                        </span>
                    </div>

                    <div
                        className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider justify-center w-auto h-9 px-4 rounded-lg bg-white/5 [.light-mode_&]:bg-zinc-100 text-white [.light-mode_&]:text-zinc-800 border border-white/10 [.light-mode_&]:border-zinc-200 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white transition-all duration-300"
                    >
                        View Details
                        <FiArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </div>
    );
}
