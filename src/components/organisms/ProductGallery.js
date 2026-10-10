"use client";

import { useMemo } from "react";
import Image from "@/components/molecules/CustomImage";
import SwipeGallery from "@/components/molecules/SwipeGallery";
import ThumbScrollArrows from "@/components/atoms/ThumbScrollArrows";
import useImageGallery from "@/hooks/useImageGallery";

const toSlide = (img) => {
    if (!img) return null;
    if (typeof img === "string") return { url: img };
    const url = img.url || img.imageUrl;
    return url ? { ...img, url } : null;
};

export default function ProductGallery({ images, alt = "Product", className = "h-[300px] lg:h-[540px]", children }) {
    const slides = useMemo(() => (Array.isArray(images) ? images : images ? [images] : []).map(toSlide).filter(Boolean), [images]);
    const { activeIndex, setActiveIndex, thumbStripRef, thumbScroll, updateThumbScroll, scrollThumbs, revealThumb } = useImageGallery(slides);

    if (!slides.length) return null;

    return (
        <div className="space-y-4">
            <div className={`relative  w-full rounded-lg overflow-hidden ${className}`}>
                <SwipeGallery
                    images={slides}
                    activeIndex={activeIndex}
                    onChange={(i) => { setActiveIndex(i); revealThumb(i); }}
                    alt={alt}
                    className="h-full"
                />
                {children}
            </div>

            <div className="relative">
                <div
                    ref={thumbStripRef}
                    role="tablist"
                    aria-label="Product images"
                    onScroll={updateThumbScroll}
                    className="relative flex gap-3 overflow-x-auto pb-1 hide-scrollbar"
                >
                    {slides.map((item, idx) => {
                        const isActive = idx === activeIndex;
                        return (
                            <button
                                key={idx}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => setActiveIndex(idx)}
                                onMouseEnter={() => setActiveIndex(idx)}
                                className={`relative cursor-pointer h-15 w-15 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 ${isActive ? "border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]" : "border-zinc-800 hover:border-zinc-600"}`}
                            >
                                <Image
                                    src={item.url}
                                    alt={item.alt || `${alt} image ${idx + 1}`}
                                    title={item.title}
                                    caption={item.caption}
                                    fill
                                    sizes="60px"
                                    imageClassName="object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </button>
                        );
                    })}
                </div>

                <ThumbScrollArrows thumbScroll={thumbScroll} onScroll={scrollThumbs} />
            </div>
        </div>
    );
}
