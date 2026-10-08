"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import Image from "@/components/molecules/CustomImage";
import { TAP_SLOP, SLIDE_EASE, isSwipe, resist } from "@/utils/galleryGestures";

const MAX_SCALE = 4;
const DOUBLE_TAP_ZOOM = 2.5;
const DOUBLE_TAP_MS = 300;
const DOUBLE_TAP_DIST = 30;
const IDLE_VIEW = { scale: 1, x: 0, y: 0 };
const ZOOM_EASE = "transform 200ms ease-out";

const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const midpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

export default function Lightbox({ images, index, onChange, onClose, alt }) {
    const count = images.length;
    const boxRef = useRef(null);
    const closeRef = useRef(null);
    const pointers = useRef(new Map());
    const gesture = useRef(null);
    const moved = useRef(false);
    const lastTap = useRef({ time: 0, x: 0, y: 0 });
    const viewRef = useRef(IDLE_VIEW);
    const [view, setView] = useState(IDLE_VIEW);
    const [dragX, setDragX] = useState(0);
    const [gesturing, setGesturing] = useState(false);

    const applyView = (next) => {
        viewRef.current = next;
        setView(next);
    };

    const go = (next) => {
        if (next < 0 || next >= count) return;
        applyView(IDLE_VIEW);
        onChange(next);
    };

    const onKey = useEffectEvent((e) => {
        if (e.key === "Escape") onClose();
        else if (e.key === "ArrowRight") go(index + 1);
        else if (e.key === "ArrowLeft") go(index - 1);
    });

    useEffect(() => {
        const opener = document.activeElement;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();
        const handler = (e) => onKey(e);
        window.addEventListener("keydown", handler);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", handler);
            opener?.focus?.();
        };
    }, []);

    const fit = (scale, x, y) => {
        const r = boxRef.current?.getBoundingClientRect();
        if (!r || scale <= 1) return IDLE_VIEW;
        const mx = (r.width * (scale - 1)) / 2;
        const my = (r.height * (scale - 1)) / 2;
        return { scale, x: Math.max(-mx, Math.min(mx, x)), y: Math.max(-my, Math.min(my, y)) };
    };

    const fromCenter = (p) => {
        const r = boxRef.current.getBoundingClientRect();
        return { x: p.x - (r.left + r.width / 2), y: p.y - (r.top + r.height / 2) };
    };

    const beginGesture = () => {
        const pts = [...pointers.current.values()];
        const v = viewRef.current;
        if (pts.length >= 2) {
            const m = fromCenter(midpoint(pts[0], pts[1]));
            gesture.current = {
                type: "pinch",
                d: dist(pts[0], pts[1]) || 1,
                scale: v.scale,
                cx: (m.x - v.x) / v.scale,
                cy: (m.y - v.y) / v.scale,
            };
        } else if (pts.length === 1) {
            gesture.current = { type: "pan", sx: pts[0].x, sy: pts[0].y, ox: v.x, oy: v.y, t: Date.now() };
        }
    };

    const toggleZoom = (clientX, clientY) => {
        if (viewRef.current.scale > 1) {
            applyView(IDLE_VIEW);
            return;
        }
        const p = fromCenter({ x: clientX, y: clientY });
        const k = 1 - DOUBLE_TAP_ZOOM;
        applyView(fit(DOUBLE_TAP_ZOOM, p.x * k, p.y * k));
    };

    const handleTap = (e) => {
        const now = Date.now();
        const last = lastTap.current;
        if (now - last.time < DOUBLE_TAP_MS && Math.hypot(e.clientX - last.x, e.clientY - last.y) < DOUBLE_TAP_DIST) {
            lastTap.current = { time: 0, x: 0, y: 0 };
            toggleZoom(e.clientX, e.clientY);
        } else {
            lastTap.current = { time: now, x: e.clientX, y: e.clientY };
        }
    };

    const onPointerDown = (e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        if (pointers.current.size === 0) moved.current = false;
        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        setGesturing(true);
        beginGesture();
    };

    const onPointerMove = (e) => {
        if (!pointers.current.has(e.pointerId)) return;
        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        const g = gesture.current;
        if (!g) return;

        if (g.type === "pinch") {
            const [a, b] = [...pointers.current.values()];
            const scale = Math.max(1, Math.min(MAX_SCALE, (g.scale * dist(a, b)) / g.d));
            const m = fromCenter(midpoint(a, b));
            moved.current = true;
            applyView(fit(scale, m.x - g.cx * scale, m.y - g.cy * scale));
            return;
        }

        const dx = e.clientX - g.sx;
        const dy = e.clientY - g.sy;
        if (Math.abs(dx) > TAP_SLOP || Math.abs(dy) > TAP_SLOP) moved.current = true;
        const { scale } = viewRef.current;
        if (scale > 1) applyView(fit(scale, g.ox + dx, g.oy + dy));
        else if (moved.current) setDragX(resist(dx, index, count));
    };

    const endPointer = (e, cancelled) => {
        if (!pointers.current.delete(e.pointerId)) return;
        if (pointers.current.size > 0) {
            moved.current = true;
            beginGesture();
            return;
        }
        const g = gesture.current;
        gesture.current = null;
        setGesturing(false);
        setDragX(0);
        if (cancelled || !g) return;
        if (!moved.current) {
            handleTap(e);
            return;
        }
        if (g.type === "pan" && viewRef.current.scale === 1) {
            const dx = e.clientX - g.sx;
            if (isSwipe(dx, Date.now() - g.t, boxRef.current?.offsetWidth || 1)) go(index + (dx < 0 ? 1 : -1));
        }
    };


    const isOnImage = (e) => {
        const img = boxRef.current?.firstElementChild?.children[index]?.querySelector("img");
        if (!img || !img.naturalWidth) return true;
        const r = img.getBoundingClientRect();
        const k = Math.min(r.width / img.naturalWidth, r.height / img.naturalHeight);
        const w = img.naturalWidth * k;
        const h = img.naturalHeight * k;
        const left = r.left + (r.width - w) / 2;
        const top = r.top + (r.height - h) / 2;
        return e.clientX >= left && e.clientX <= left + w && e.clientY >= top && e.clientY <= top + h;
    };

    const onBoxClick = (e) => {
        if (moved.current || viewRef.current.scale > 1) return;
        if (!isOnImage(e)) onClose();
    };

    const navButton = "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-orange-500 md:flex";

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex touch-none items-center justify-center overscroll-contain bg-black/95"
            role="dialog"
            aria-modal="true"
            aria-label={`${alt} gallery`}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close gallery"
                className="group absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-black/50 text-white backdrop-blur-md transition-all duration-300 starting:-translate-y-3 starting:opacity-0 hover:rotate-90 hover:border-orange-500 hover:bg-orange-500 hover:shadow-[0_0_16px_rgba(249,115,22,0.5)] focus-visible:rotate-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 active:scale-90 motion-reduce:transition-none"
            >
                <FiX size={20} aria-hidden="true" />
            </button>
            {index > 0 && (
                <button type="button" aria-label="Previous image" onClick={() => go(index - 1)} className={`${navButton} left-3`}>
                    <FiChevronLeft size={22} aria-hidden="true" />
                </button>
            )}
            {index < count - 1 && (
                <button type="button" aria-label="Next image" onClick={() => go(index + 1)} className={`${navButton} right-3`}>
                    <FiChevronRight size={22} aria-hidden="true" />
                </button>
            )}
            <div
                ref={boxRef}
                className="relative h-[80dvh] w-full max-w-5xl touch-none select-none overflow-hidden"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={(e) => endPointer(e, false)}
                onPointerCancel={(e) => endPointer(e, true)}
                onClick={onBoxClick}
            >
                <div
                    className="flex h-full w-full"
                    style={{
                        transform: `translateX(calc(${-index * 100}% + ${dragX}px))`,
                        transition: gesturing ? "none" : SLIDE_EASE,
                    }}
                >
                    {images.map((img, i) => (
                        <div key={i} className="relative h-full w-full shrink-0 overflow-hidden">
                            {Math.abs(i - index) <= 1 && (
                                <div
                                    className="absolute inset-0"
                                    style={i === index ? {
                                        transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
                                        transition: gesturing ? "none" : ZOOM_EASE,
                                    } : undefined}
                                >
                                    <Image
                                        src={img?.url || "/newlogo.webp"}
                                        alt={img?.alt || alt}
                                        fill
                                        quality={90}
                                        sizes="(max-width: 1024px) 100vw, 1024px"
                                        draggable={false}
                                        imageClassName="object-contain"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {count > 1 && (
                <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center rounded-full border border-white/10 bg-black/50 px-2 backdrop-blur-md">
                    <span className="sr-only" aria-live="polite">Image {index + 1} of {count}</span>
                    {images.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`Go to image ${i + 1}`}
                            aria-current={i === index}
                            onClick={() => go(i)}
                            className="group flex h-6 items-center px-[3px]"
                        >
                            <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-5 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" : "w-1.5 bg-white/40 group-hover:bg-white/70"}`} />
                        </button>
                    ))}
                </div>
            )}

            
        </div>,
        document.body
    );
}
