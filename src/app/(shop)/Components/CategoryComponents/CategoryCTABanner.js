'use client';

import React from 'react';
import { FiActivity } from 'react-icons/fi';
import WhatsAppButton from '@/components/atoms/WhatsAppButton';

export default function CategoryCTABanner() {
    return (
        <div className="mt-16 relative rounded-[2rem] overflow-hidden border border-zinc-800 bg-zinc-950 p-8 md:p-12">
            {/* Background glows */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-orange-500/5 blur-[80px] pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                {/* Left: text content */}
                <div className="space-y-3 max-w-xl">
                    <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">
                        <FiActivity size={11} /> Expert Consultation
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight">
                        Not Sure Which Category Fits?
                    </h2>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        Our certified tyre specialists will help you pick the perfect rubber for your bike and riding style — completely free of charge.
                    </p>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                        {['Free Expert Advice', 'Live Stock Check', 'Best Price Guarantee'].map(item => (
                            <li key={item} className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wide">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: CTA button */}
                <div className="flex-shrink-0">
                    <WhatsAppButton
                        text="Talk to a Tyre Expert"
                        value="Hi Torque Block! I need help choosing the right tyre category for my motorcycle."
                    />
                </div>
            </div>
        </div>
    );
}
