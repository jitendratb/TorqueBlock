'use client';

import React from 'react';
import { FiLayers, FiCompass, FiWind } from 'react-icons/fi';
import { FaMotorcycle } from 'react-icons/fa6';

export default function CategoryHero() {
    return (
        <div className="relative w-full rounded-3xl overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 border border-white/10 bg-white/10 [.light-mode_&]:bg-white/60 [.light-mode_&]:border-zinc-200 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/20 [.light-mode_&]:bg-orange-400/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 [.light-mode_&]:bg-blue-400/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 w-full space-y-2 md:max-w-2xl">
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-[10px] md:text-xs border border-white/10 [.light-mode_&]:border-zinc-300 px-3 py-1.5 font-medium tracking-[0.3em] uppercase text-zinc-300 [.light-mode_&]:text-zinc-500 rounded-sm bg-white/5 backdrop-blur-sm">
                        <FiLayers size={14} className="text-orange-500 drop-shadow-md" />
                        Curated Riding Styles
                    </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-orange-400 bg-[length:200%_auto] bg-left hover:bg-right transition-[background-position] duration-700 ease-out uppercase tracking-tighter leading-[0.95] drop-shadow-md">
                    Shop Tyres By <br className="hidden md:block" />
                    <span className="text-transparent text-orange-500">Riding</span>{' '}
                    <span className="text-transparent bg-clip-text bg-orange-500">
                        Style
                    </span>
                </h1>

                <p className="text-zinc-400 [.light-mode_&]:text-zinc-500 text-xs md:text-sm leading-relaxed font-light md:max-w-xl">
                    Explore our premium selection of motorcycle tyres categorized by riding style. Find the perfect rubber for dual-sport, street, touring, adventure, and track racing to ensure optimal grip, mileage, and confidence for your specific journey.
                </p>
            </div>

            <div className="relative z-10 hidden lg:flex gap-5 items-center mr-8">
                <div className="flex flex-col gap-5 translate-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 [.light-mode_&]:bg-white/60 border border-white/10 [.light-mode_&]:border-zinc-200 flex items-center justify-center backdrop-blur-xl shadow-2xl transition-transform hover:-translate-y-1 duration-300">
                        <FiWind size={22} className="text-blue-500 drop-shadow-md" />
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 [.light-mode_&]:bg-white/60 border border-white/10 [.light-mode_&]:border-zinc-200 flex items-center justify-center backdrop-blur-xl shadow-2xl -translate-x-6 transition-transform hover:-translate-y-1 duration-300">
                        <FiCompass size={22} className="text-orange-500 drop-shadow-md" />
                    </div>
                </div>
                <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30 flex items-center justify-center backdrop-blur-2xl shadow-[0_0_40px_rgba(249,115,22,0.2)] transition-transform hover:-translate-y-2 duration-500">
                    <FaMotorcycle size={44} className="text-orange-400 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]" />
                </div>
            </div>
        </div>
    );
}
