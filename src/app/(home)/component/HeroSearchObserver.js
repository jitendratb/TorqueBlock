"use client";

import React, { useEffect, useRef } from 'react';
import useUiStore from '@/stores/uiStore';

export default function HeroSearchObserver({ children }) {
    const ref = useRef(null);
    const setHeroSearchVisible = useUiStore((state) => state.setHeroSearchVisible);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {

                if (!entry.isIntersecting && el.contains(document.activeElement)) return;
                setHeroSearchVisible(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [setHeroSearchVisible]);

    return (
        <div ref={ref} className="w-full">
            {children}
        </div>
    );
}
