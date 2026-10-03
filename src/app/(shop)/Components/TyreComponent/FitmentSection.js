"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "@/components/molecules/CustomImage";
import Model from "@/components/organisms/CustomModel";

import { FaImages, FaChevronLeft, FaChevronRight } from "react-icons/fa";


const LAYOUTS = [
    { grid: "grid-cols-1 grid-rows-[240px] md:grid-rows-1", tiles: [] },
    { grid: "grid-cols-1 grid-rows-[240px_84px] md:grid-cols-[3fr_1fr] md:grid-rows-2", tiles: ["md:row-span-2"] },
    { grid: "grid-cols-2 grid-rows-[240px_84px] md:grid-cols-[3fr_1fr] md:grid-rows-2", tiles: ["", ""] },
    { grid: "grid-cols-3 grid-rows-[240px_84px] md:grid-cols-[3fr_1fr_1fr] md:grid-rows-2", tiles: ["", "", "md:col-span-2"] },
    { grid: "grid-cols-3 grid-rows-[240px_84px] md:grid-cols-[3fr_1fr_1fr] md:grid-rows-2", tiles: ["", "", "", "hidden md:block"] },
];
const MAX_SIDE_TILES = LAYOUTS.length - 1;
// Mobile shows three tiles under the hero; the fourth is desktop-only.
const MOBILE_SIDE_TILES = 3;

const altText = (image, name, index) => image?.alt || `${name} fitment ${index + 1}`;

function MosaicTile({ image, index, name, scale, sizes, className = "", onOpen, children }) {
    return (
        <div className={`group relative overflow-hidden rounded-xl bg-zinc-900 ring-1 ring-white/10 transition-shadow duration-300 hover:ring-orange-500/50 ${className}`}>
            <Image
                src={image?.url || image}
                alt={altText(image, name, index)}
                title={image?.title}
                caption={image?.caption}
                fill
                sizes={sizes}
                imageClassName={`object-cover transition-transform duration-700 ease-out ${scale ? "group-hover:scale-105" : ""}`}
            />
            <div className="pointer-events-none absolute inset-0 bg-orange-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <button
                type="button"
                onClick={() => onOpen(index)}
                aria-label={`View fitment photo ${index + 1}`}
                className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange-500"
            />
            {children}
        </div>
    );
}

function FitmentViewer({ open, onClose, gallery, index, onIndexChange, name }) {
    const total = gallery.length;
    const image = gallery[index];
    const stripRef = useRef(null);
    const activeThumbRef = useRef(null);

    const step = useCallback(
        (delta) => onIndexChange((index + delta + total) % total),
        [index, total, onIndexChange]
    );

    useEffect(() => {
        if (!open || total < 2) return;
        const onKeyDown = (e) => {
            if (e.key === "ArrowRight") step(1);
            else if (e.key === "ArrowLeft") step(-1);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, total, step]);

    useEffect(() => {
        const strip = stripRef.current;
        const thumb = activeThumbRef.current;
        if (!open || !strip || !thumb) return;
        strip.scrollTo({ left: thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2, behavior: "smooth" });
    }, [open, index]);

    return (
        <Model
            isOpen={open}
            onClose={onClose}
            title={`${name} fitment gallery`}
            subtitle={`Photo ${index + 1} of ${total}`}
            size="2xl"
        >
            <figure className="flex flex-col gap-3 relative">
                <div className="relative h-[45vh] md:h-[58vh] overflow-hidden rounded-lg">
                    <Image
                        key={index}
                        src={image?.url || image}
                        alt={altText(image, name, index)}
                        title={image?.title}
                        fill
                        sizes="(min-width: 1024px) 70vw, 95vw"
                        imageClassName="object-contain"
                    />
                    {total > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={() => step(-1)}
                                aria-label="Previous photo"
                                className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-orange-500 active:scale-95"
                            >
                                <FaChevronLeft />
                            </button>
                            <button
                                type="button"
                                onClick={() => step(1)}
                                aria-label="Next photo"
                                className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-orange-500 active:scale-95"
                            >
                                <FaChevronRight />
                            </button>
                        </>
                    )}
                </div>

                {(image?.title) && (
                    <figcaption className="absolute bottom-6 left-4 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_12px_rgba(0,0,0,0.7)]">
                     <span className="block text-xs md:text-sm font-semibold text-zinc-200">{image.title}</span>
                    </figcaption>
                )}
            </figure>

            {total > 1 && (
                <div ref={stripRef} className="mt-3 relative flex gap-2 overflow-x-auto pb-1">
                    {gallery.map((item, i) => (
                        <button
                            key={i}
                            type="button"
                            ref={i === index ? activeThumbRef : undefined}
                            onClick={() => onIndexChange(i)}
                            aria-label={`Show photo ${i + 1}`}
                            aria-current={i === index}
                            className={`relative h-14 w-14 md:h-16 md:w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border-1 transition-all duration-300 ${i === index ? "border-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.4)]" : "border-transparent opacity-60 hover:border-zinc-600 hover:opacity-100"}`}
                        >
                            <Image src={item?.url || item} alt="" fill sizes="64px" imageClassName="object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </Model>
    );
}

function FitmentSection({ tyre, h1tag = "Real-World Fitment", scale = true }) {
    const rawGallery = tyre?.gallery;
    const gallery = useMemo(() => Array.isArray(rawGallery) ? rawGallery : [], [rawGallery]);
    const name = tyre?.productName || "Tyre";

    const [viewer, setViewer] = useState({ mounted: false, open: false, index: 0 });
    const openViewer = useCallback((index = 0) => setViewer({ mounted: true, open: true, index }), []);
    const closeViewer = useCallback(() => setViewer((v) => ({ ...v, open: false })), []);
    const setViewerIndex = useCallback((index) => setViewer((v) => ({ ...v, index })), []);

    const sideImages = gallery.slice(1, 1 + MAX_SIDE_TILES);
    const layout = LAYOUTS[sideImages.length];
    const hasMore = gallery.length > 1 + MAX_SIDE_TILES;
    const hasMoreOnMobile = gallery.length > 1 + MOBILE_SIDE_TILES;

    // "See All" sits on the last tile visible at each breakpoint; null = no button on this tile.
    const seeAllVisibility = (i) => {
        const onMobile = hasMoreOnMobile && i === Math.min(sideImages.length, MOBILE_SIDE_TILES) - 1;
        const onDesktop = hasMore && i === sideImages.length - 1;
        if (onMobile && onDesktop) return "";
        if (onMobile) return "md:hidden";
        if (onDesktop) return "hidden md:block";
        return null;
    };

    return (
        <>
            <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative flex items-center gap-3.5 mb-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                        <FaImages className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                    </div>
                    <div>
                        <h2 className="text-xs md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                            {h1tag}
                        </h2>
                        <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                            Customer motorcycles gallery
                        </p>
                    </div>
                </div>

                <div className="relative border-t border-white/10 pt-4 mt-2">
                    {gallery.length > 0 && (
                        <div className={`grid gap-2 md:h-[460px] ${layout.grid}`}>
                            <MosaicTile
                                image={gallery[0]}
                                index={0}
                                name={name}
                                scale={scale}
                                sizes="(min-width: 768px) 60vw, 100vw"
                                onOpen={openViewer}
                                className={`col-span-full ${sideImages.length ? "md:col-span-1 md:row-span-2" : ""}`}
                            />
                            {sideImages.map((image, i) => (
                                <MosaicTile
                                    key={i}
                                    image={image}
                                    index={i + 1}
                                    name={name}
                                    scale={scale}
                                    sizes="(min-width: 768px) 25vw, 50vw"
                                    onOpen={openViewer}
                                    className={layout.tiles[i]}
                                >
                                    {seeAllVisibility(i) !== null && (
                                        <button
                                            type="button"
                                            onClick={() => openViewer(0)}
                                            className={`absolute bottom-1.5 min-w-[4rem] right-1.5 z-20 cursor-pointer rounded-lg border border-white/20  bg-black/15 backdrop-blur-sm px-2 py-1 text-[10px] font-bold text-white shadow-lg transition hover:bg-black/30 active:scale-95 md:bottom-3 md:right-3 md:px-3.5 md:py-2 md:text-sm ${seeAllVisibility(i)}`}
                                        >
                                            See All
                                        </button>
                                    )}
                                </MosaicTile>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {viewer.mounted && createPortal(
                <FitmentViewer
                    open={viewer.open}
                    onClose={closeViewer}
                    gallery={gallery}
                    index={viewer.index}
                    onIndexChange={setViewerIndex}
                    name={name}
                />,
                document.body
            )}
        </>
    );
}

export default FitmentSection;
