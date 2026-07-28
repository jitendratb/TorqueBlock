'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from "@/components/molecules/CustomImage";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';

const priceFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
});

const ProductCard = ({ tyre, className = "" }) => {
    const router = useRouter();
    const [currentImg, setCurrentImg] = useState(0);
    
    const { title, categoryName, brandName, images, displayPrice } = useMemo(() => {
        const title = tyre?.productName || "Tyre";
        const categoryName = tyre?.categoryId?.name || "Premium Tyre";
        const brandName = tyre?.brand?.name;
        
        const images = tyre?.productImages?.length > 0 
            ? tyre.productImages 
            : (tyre?.hero?.heroImage ? [tyre.hero.heroImage] : []);
            
        const displayPrice = tyre?.startingPrice != null 
            ? priceFormatter.format(tyre.startingPrice) 
            : 'N/A';

        return { title, categoryName, brandName, images, displayPrice };
    }, [tyre]);

    const handleCardClick = useCallback(() => {
        if (tyre?.identifier) {
            router.push(`/tyres/${tyre.identifier}`);
        }
    }, [router, tyre?.identifier]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
        }
    }, [handleCardClick]);

    const nextImage = useCallback((e) => {
        e.stopPropagation();
        if (images.length > 0) {
            setCurrentImg((prev) => (prev + 1) % images.length);
        }
    }, [images.length]);

    const prevImage = useCallback((e) => {
        e.stopPropagation();
        if (images.length > 0) {
            setCurrentImg((prev) => (prev - 1 + images.length) % images.length);
        }
    }, [images.length]);

    return (
        <article
            onClick={handleCardClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${title}`}
            className={`group mt-1 cursor-pointer relative flex flex-col w-full bg-white/20 hover:bg-white/10 [.light-mode_&]:bg-white/20  [.light-mode_&]:backdrop-blur-3xl hover:bg-white/10 [.light-mode_&]:hover:bg-zinc-950/20 backdrop-blur-md border border-white/5 [.light-mode_&]:border-white/30 hover:border-orange-500/30 [.light-mode_&]:hover:border-orange-400/50 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] [.light-mode_&]:shadow-[0_2px_15px_rgba(0,0,0,0.04)] [.light-mode_&]:hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 ${className}`}
        >
            <div className="relative w-full h-[200px] flex items-center justify-center p-4 transition-colors duration-500">
                {images.length > 0 ? (
                    images.map((img, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 p-4 transition-opacity duration-200 ${
                                index === currentImg ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                            }`}
                        >
                            <Image
                                src={img}
                                alt={`${title} - Image ${index + 1}`}
                                fill
                                priority={index === 0}
                                imageClassName="object-contain group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                    ))
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-800/20 [.light-mode_&]:bg-zinc-200/50 rounded-xl">
                        <span className="text-zinc-500 text-xs font-medium">No image</span>
                    </div>
                )}

                {images.length > 1 && (
                    <>
                        <button 
                            onClick={prevImage} 
                            aria-label="Previous image"
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 hover:bg-orange-500 focus:opacity-100 transition-all duration-300 z-20"
                        >
                            <FaChevronLeft className="text-xs" />
                        </button>
                        <button 
                            onClick={nextImage} 
                            aria-label="Next image"
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 hover:bg-orange-500 focus:opacity-100 transition-all duration-300 z-20" 
                        >
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
                        aria-hidden="true"
                        className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider justify-center w-auto h-9 px-4 rounded-lg bg-white/5 [.light-mode_&]:bg-zinc-100 text-white [.light-mode_&]:text-zinc-800 border border-white/10 [.light-mode_&]:border-zinc-200 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white transition-all duration-300"
                    >
                        Explore
                        <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default React.memo(ProductCard);
