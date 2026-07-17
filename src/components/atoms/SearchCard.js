'use client';

import React from 'react';
import Image from "@/components/molecules/CustomImage";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";

export default function SearchCard({ product, tyre, className }) {
    const router = useRouter();

    const isSingleSize = !!product?.price;
    const title = product?.hero?.title || product?.productName || product?.name || product?.size || "Tyre";
    const categoryName = tyre?.category || "Premium Tyre";

    console.log(product, tyre)

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const displayPrice = isSingleSize
        ? formatPrice(product.price)
        : minPrice > 0
            ? minPrice === maxPrice
                ? formatPrice(minPrice)
                : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
            : "Request Price";

    const labelText = "Price"
    const sizeCountText = product?.availability === "in_stock" ? "In Stock"
        : product?.availability === "backorder" ? "Available To Order"
            : product?.availability === "preorder" ? "Pre Order"
                : "Out of Stock";


    const handleCardClick = () => {
        router.push(`/tyres/${tyre?.identifier}/${product?.size.toLowerCase().replace(/[\s/]/g, '-')}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className={`group cursor-pointer mt-1 relative flex flex-col w-full bg-zinc-900/30 backdrop-blur-md border border-white/5 hover:border-orange-500/30 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] hover:-translate-y-1 ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative w-full h-30  flex items-center justify-center p-4">
                <Image
                    src={product?.productImages?.[0] || product?.image || tyre?.productImages[0]}
                    alt={title}
                    fill
                    imageClassName="object-contain group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-lg"
                />

                <span className={`absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-extrabold uppercase tracking-wider backdrop-blur-md border transition-all duration-300 ${product?.availability === "in_stock"
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                    : product?.availability === "backorder"
                        ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.1)]"
                        : product?.availability === "preorder"
                            ? "bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                            : "bg-red-500/10 border-red-500/20 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
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
                <div className="flex absolute bottom-0 left-2 items-center gap-2 text-[8px] font-bold text-white/80 uppercase tracking-wider">
                    <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
                        {categoryName}
                    </span>

                </div>
            </div>

            <div className="flex flex-col px-2 py-2 gap-2 flex-1 justify-between">
                <div className="space-y-2">


                    <h3 className="text-sm font-bold text-zinc-100 group-hover:text-white uppercase tracking-tight line-clamp-2 transition-colors duration-300">
                        {title}
                    </h3>
                </div>

                <div className="flex items-end justify-between gap-2">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-white/80 font-bold uppercase tracking-wider mb-0.5">{labelText}</span>
                        <span className="text-sm font-black text-white">
                            {displayPrice}
                        </span>
                    </div>

                    <div
                        className="flex text-xs items-center font-semibold justify-center w-auto p-2 rounded-full bg-white/10 text-white group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-sm"
                    >
                        <FiArrowRight />
                    </div>
                </div>
            </div>
        </div>
    );
}
