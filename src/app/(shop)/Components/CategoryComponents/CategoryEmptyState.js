'use client';

import React from 'react';
import { TbMountain } from 'react-icons/tb';
import WhatsAppButton from '@/components/atoms/WhatsAppButton';

export default function CategoryEmptyState({ searchQuery, onClear }) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 max-w-md mx-auto space-y-6">
            {/* Pulsing icon */}
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-orange-500/10 animate-ping" />
                <div className="relative w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <TbMountain size={36} className="text-orange-500/80" />
                </div>
            </div>

            {/* Text */}
            <div className="space-y-2">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">No Match Found</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                    No category matched &ldquo;<span className="text-white font-semibold">{searchQuery}</span>&rdquo;. Try a different style like{' '}
                    <span className="text-orange-400">cruiser</span>,{' '}
                    <span className="text-orange-400">off-road</span>, or{' '}
                    <span className="text-orange-400">sport</span>.
                </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <button
                    onClick={onClear}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-sm font-black text-white uppercase tracking-widest transition-all hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] active:scale-95"
                >
                    Clear Search
                </button>
                <WhatsAppButton
                    text="Ask a Specialist"
                    value="I need help finding a tyre category at Torque Block"
                />
            </div>
        </div>
    );
}
