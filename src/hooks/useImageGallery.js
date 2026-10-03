import { useCallback, useEffect, useRef, useState } from "react";

const SWIPE_DISTANCE = 40;
const THUMB_SCROLL_EDGE = 8;
const NO_IMAGES = [];

const getStripAxis = (strip) => {
    const vertical = getComputedStyle(strip).flexDirection.startsWith("column");
    return vertical
        ? { to: "top", pos: "offsetTop", len: "offsetHeight", view: "clientHeight", scrolled: "scrollTop", total: "scrollHeight" }
        : { to: "left", pos: "offsetLeft", len: "offsetWidth", view: "clientWidth", scrolled: "scrollLeft", total: "scrollWidth" };
};


export default function useImageGallery(images) {
    const list = images ?? NO_IMAGES;
  
    const [selection, setSelection] = useState({ list, index: 0 });
    const activeIndex = selection.list === list ? selection.index : 0;
    const setActiveIndex = useCallback((index) => setSelection({ list, index }), [list]);
    const [thumbScroll, setThumbScroll] = useState({ prev: false, next: false });
    const thumbStripRef = useRef(null);
    const swipeStart = useRef(null);

    const updateThumbScroll = useCallback(() => {
        const strip = thumbStripRef.current;
        if (!strip) return;
        const axis = getStripAxis(strip);
        const scrolled = strip[axis.scrolled];
        const prev = scrolled > THUMB_SCROLL_EDGE;
        const next = strip[axis.total] - strip[axis.view] - scrolled > THUMB_SCROLL_EDGE;
        setThumbScroll((state) => (state.prev === prev && state.next === next ? state : { prev, next }));
    }, []);

    const scrollThumbs = useCallback((direction) => {
        const strip = thumbStripRef.current;
        if (!strip) return;
        const axis = getStripAxis(strip);
        strip.scrollBy({ [axis.to]: direction * strip[axis.view] * 0.8, behavior: "smooth" });
    }, []);

    const revealThumb = useCallback((index) => {
        const strip = thumbStripRef.current;
        const thumb = strip?.children[index];
        if (!thumb) return;
        const axis = getStripAxis(strip);
        const start = thumb[axis.pos];
        const end = start + thumb[axis.len];
        if (start < strip[axis.scrolled]) {
            strip.scrollTo({ [axis.to]: start, behavior: "smooth" });
        } else if (end > strip[axis.scrolled] + strip[axis.view]) {
            strip.scrollTo({ [axis.to]: end - strip[axis.view], behavior: "smooth" });
        }
    }, []);

    const swipeProps = {
        onTouchStart: (e) => {
            swipeStart.current = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
        },
        onTouchEnd: (e) => {
            const start = swipeStart.current;
            swipeStart.current = null;
            if (!start) return;
            const dx = e.changedTouches[0].clientX - start.x;
            const dy = e.changedTouches[0].clientY - start.y;
            if (Math.abs(dx) < SWIPE_DISTANCE || Math.abs(dx) < Math.abs(dy) * 1.5) return;
            const next = activeIndex + (dx < 0 ? 1 : -1);
            if (next < 0 || next >= list.length) return;
            setActiveIndex(next);
            revealThumb(next);
        },
        onTouchCancel: () => { swipeStart.current = null; },
    };

    useEffect(() => {
        thumbStripRef.current?.scrollTo({ left: 0, top: 0 });
    }, [list]);

    useEffect(() => {
        const strip = thumbStripRef.current;
        if (!strip) return;
        updateThumbScroll();
        const observer = new ResizeObserver(updateThumbScroll);
        observer.observe(strip);
        return () => observer.disconnect();
    }, [list, updateThumbScroll]);

    return {
        activeIndex,
        setActiveIndex,
        activeImage: list[activeIndex] ?? list[0] ?? null,
        thumbStripRef,
        thumbScroll,
        updateThumbScroll,
        scrollThumbs,
        swipeProps,
    };
}
