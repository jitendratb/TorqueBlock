"use client";

import { useRef, useState } from "react";
import { FiMaximize2 } from "react-icons/fi";
import Image from "@/components/molecules/CustomImage";
import Lightbox from "@/components/molecules/Lightbox";
import { TAP_SLOP, SLIDE_EASE, isSwipe, resist } from "@/utils/galleryGestures";

export default function SwipeGallery({ images, activeIndex, onChange, alt = "Image", className = "", imageClassName = "" }) {
    const wrapRef = useRef(null);
    const start = useRef(null);
    const dragged = useRef(false);
    const [dragX, setDragX] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [open, setOpen] = useState(false);
    const count = images?.length || 0;

    const reset = () => {
        start.current = null;
        setDragging(false);
        setDragX(0);
    };

    const onTouchStart = (e) => {
        dragged.current = false;
        if (e.touches.length !== 1) { start.current = null; return; }
        start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now(), lock: null };
    };

    const onTouchMove = (e) => {
        const s = start.current;
        if (!s || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - s.x;
        const dy = e.touches[0].clientY - s.y;
        if (!s.lock && (Math.abs(dx) > TAP_SLOP || Math.abs(dy) > TAP_SLOP)) {
            s.lock = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        }
        if (s.lock !== "x") return;
        dragged.current = true;
        setDragging(true);
        setDragX(resist(dx, activeIndex, count));
    };

    const onTouchEnd = (e) => {
        const s = start.current;
        reset();
        if (!s || s.lock !== "x") return;
        const dx = e.changedTouches[0].clientX - s.x;
        if (!isSwipe(dx, Date.now() - s.t, wrapRef.current?.offsetWidth || 1)) return;
        const next = activeIndex + (dx < 0 ? 1 : -1);
        if (next >= 0 && next < count) onChange(next);
    };

    // A drag that ends with a click must not open the modal.
    const onClick = () => {
        if (dragged.current) {
            dragged.current = false;
            return;
        }
        setOpen(true);
    };

    const onKeyDown = (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        setOpen(true);
    };

    if (!count) return null;

    return (
        <>
            <div
                ref={wrapRef}
                role="button"
                tabIndex={0}
                aria-label={`View ${alt} full screen`}
                className={`group relative w-full cursor-zoom-in touch-pan-y overflow-hidden ${className}`}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onTouchCancel={reset}
                onClick={onClick}
                onKeyDown={onKeyDown}
            >
                <div
                    className="flex h-full w-full"
                    style={{
                        transform: `translateX(calc(${-activeIndex * 100}% + ${dragX}px))`,
                        transition: dragging ? "none" : SLIDE_EASE,
                    }}
                >
                    {images.map((item, idx) => (
                        <div key={idx} className="relative h-full w-full shrink-0">
                            {Math.abs(idx - activeIndex) <= 1 && (
                                <Image
                                    src={item?.url || "/newlogo.webp"}
                                    alt={item?.alt || alt}
                                    title={item?.title}
                                    caption={item?.caption}
                                    fill
                                    priority={idx === 0}
                                    quality={75}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    draggable={false}
                                    imageClassName={`object-contain  transition-transform duration-500 group-hover:scale-105 ${imageClassName}`}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/20 text-white/80 backdrop-blur-xl transition-colors group-hover:border-orange-500/40 group-hover:text-orange-400"
                >
                    <FiMaximize2 className="text-sm" />
                </span>
                {count > 1 && (
                    <div className="pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
                        {images.map((_, i) => (
                            <span key={i} className={`h-1.5 rounded-full transition-all ${i === activeIndex ? "w-4 bg-orange-500" : "w-1.5 bg-zinc-500"}`} />
                        ))}
                    </div>
                )}
            </div>
            {open && (
                <Lightbox images={images} index={activeIndex} onChange={onChange} onClose={() => setOpen(false)} alt={alt} />
            )}
        </>
    );
}
