"use client";

import React, { useEffect, useRef } from 'react';
import useUiStore from '@/stores/uiStore';

export default function HeroSearchObserver({ children }) {
    const ref = useRef(null);
    const hasInitialized = useRef(false);
    const setHeroSearchVisible = useUiStore((state) => state.setHeroSearchVisible);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Skip the first false-negative callback that can happen
                // before layout settles (hero is always in view on load)
                if (!hasInitialized.current) {
                    hasInitialized.current = true;
                    if (!entry.isIntersecting) return;
                }
                setHeroSearchVisible(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0, 
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [setHeroSearchVisible]);

    return (
        <div ref={ref} className="w-full">
            {children}
        </div>
    );
}
