'use client';

import React, { useState } from 'react';
import Image from "@/components/molecules/CustomImage";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

export default function ProductCard({ tyre, className }) {
    const router = useRouter();
    const [currentImg, setCurrentImg] = useState(0);

    console.log(tyre, "tyre")

    const title = tyre?.productName || "Tyre";
    const categoryName = tyre?.categoryId?.name || "Premium Tyre";
    const brandName = tyre?.brand?.name;

    const images = tyre?.productImages?.length > 0 ? tyre.productImages : (tyre?.hero?.heroImage ? [tyre.hero.heroImage] : []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const displayPrice = formatPrice(tyre?.startingPrice);

    const handleCardClick = () => {
        router.push(`/tyres/${tyre?.identifier}`);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImg((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImg((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div
            onClick={handleCardClick}
            className={`group mt-1 cursor-pointer relative flex flex-col w-full bg-white/20 hover:bg-white/10 [.light-mode_&]:bg-white/20  [.light-mode_&]:backdrop-blur-3xl hover:bg-white/10 [.light-mode_&]:hover:bg-zinc-950/20 backdrop-blur-md border border-white/5 [.light-mode_&]:border-white/30 hover:border-orange-500/30 [.light-mode_&]:hover:border-orange-400/50 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] [.light-mode_&]:shadow-[0_2px_15px_rgba(0,0,0,0.04)] [.light-mode_&]:hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 ${className}`}
        >

            <div className="relative w-full h-[200px] flex items-center justify-center p-4  transition-colors duration-500">
                <Image
                    src={images[currentImg]}
                    alt={title}
                    fill
                    imageClassName="object-contain group-hover:scale-110 transition-transform duration-700"
                />

                {images.length > 1 && (
                    <>
                        <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 hover:bg-orange-500 transition-all duration-300 z-20">
                            <FaChevronLeft className="text-xs" />
                        </button>
                        <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 hover:bg-orange-500 transition-all duration-300 z-20" >
                            <FaChevronRight className="text-xs" />
                        </button>
                    </>
                )}
            </div>

            <div className="flex flex-col p-4 gap-2 flex-1 justify-between relative">
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black text-zinc-400 [.light-mode_&]:text-zinc-500 uppercase tracking-widest">
                            {categoryName}
                        </span>
                        {brandName && (
                            <span className="text-[10px] font-bold border border-white/30 px-2 py-1 rounded-lg text-white/50 [.light-mode_&]:text-zinc-400 uppercase tracking-wider">
                                {brandName}
                            </span>
                        )}
                    </div>

                    <h3 className="text-lg md:text-xl font-black text-white tracking-tight line-clamp-1 [.light-mode_&]:text-zinc-800 transition-colors duration-500 leading-tight">
                        {title}
                    </h3>
                </div>

                <div className="flex items-end justify-between gap-3 pt-2 border-t border-white/10 [.light-mode_&]:border-zinc-200 transition-colors duration-500">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-400 [.light-mode_&]:text-zinc-500 font-bold uppercase tracking-widest mb-0.5">
                            Starts At
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl md:text-2xl font-black text-white [.light-mode_&]:text-zinc-900 tracking-tight">
                                {displayPrice}
                            </span>
                        </div>
                    </div>

                    <div
                        className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider justify-center w-auto h-9 px-4 rounded-lg bg-white/5 [.light-mode_&]:bg-zinc-100 text-white [.light-mode_&]:text-zinc-800 border border-white/10 [.light-mode_&]:border-zinc-200 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white transition-all duration-300"
                    >
                        Explore
                        <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </div>
    );
}
