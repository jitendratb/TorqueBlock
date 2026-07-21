"use client"
import React, { useMemo, memo } from 'react';
import TyreSection from '@/app/(shop)/Components/NewLaunchTyres';

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#eab308'];


const TyreClient = memo(function TyreClient({ categoryId, title, subtitle }) {
    const primaryColor = useMemo(() => {
        if (!title) return COLORS[0];
        
        let hash = 0;
        for (let i = 0; i < title.length; i++) {
            hash = title.charCodeAt(i) + ((hash << 5) - hash);
        }
        return COLORS[Math.abs(hash) % COLORS.length];
    }, [title]);

    return (
        <div className="relative w-full group/section transition-all duration-700">
            <div
                className="absolute inset-0 opacity-0 group-hover/section:opacity-[0.03] transition-opacity duration-1000 blur-3xl rounded-[100px] pointer-events-none"
                style={{ backgroundColor: primaryColor }}
                aria-hidden="true"
            />

            <div className="relative z-10">
                <TyreSection
                    categoryId={categoryId}
                    title={title}
                    subtitle={subtitle || "Explore products in this category"}
                    primaryColor={primaryColor}
                />
            </div>
        </div>
    );
});

export default TyreClient;