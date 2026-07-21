import React from 'react';
import { FiMap, FiShield, FiTarget } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa6';

export default function TyresPageBanner() {
    return (
        <div className="relative w-full h-48 md:h-64 rounded-3xl overflow-hidden  flex items-center justify-between px-6 border border-white/10 bg-white/10 [.light-mode_&]:bg-white/60 [.light-mode_&]:border-zinc-200 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/20 [.light-mode_&]:bg-orange-400/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 [.light-mode_&]:bg-blue-400/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center gap-1.5 text-[10px] border border-white/10 [.light-mode_&]:border-zinc-300 px-2.5 py-1 font-medium tracking-[0.3em] uppercase text-zinc-300 [.light-mode_&]:text-zinc-500 rounded-sm bg-white/5 backdrop-blur-sm">
                        <FaCrown size={12} className="text-orange-500 drop-shadow-md" />
                        Exclusive Collection
                    </span>
                </div>

                <h1 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-orange-400 bg-[length:200%_auto] bg-left group-hover:bg-right transition-[background-position] duration-700 ease-out uppercase tracking-tighter leading-none drop-shadow-md line-clamp-2">
                    Motorcycle Tyres
                </h1>

                <p className="text-zinc-400 [.light-mode_&]:text-zinc-500 text-sm mt-4 max-w-md leading-relaxed font-light">
                    Engineered for precision and safety. Discover the perfect compound for your next journey.
                </p>
            </div>

            <div className="relative z-10 hidden md:flex gap-5 items-center mr-4">
                <div className="flex flex-col gap-5 translate-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 [.light-mode_&]:bg-white/60 border border-white/10 [.light-mode_&]:border-zinc-200 flex items-center justify-center backdrop-blur-xl shadow-2xl transition-transform hover:-translate-y-1 duration-300">
                        <FiTarget size={22} className="text-orange-500 drop-shadow-md" />
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 [.light-mode_&]:bg-white/60 border border-white/10 [.light-mode_&]:border-zinc-200 flex items-center justify-center backdrop-blur-xl shadow-2xl -translate-x-6 transition-transform hover:-translate-y-1 duration-300">
                        <FiShield size={22} className="text-blue-500 drop-shadow-md" />
                    </div>
                </div>
                <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30 flex items-center justify-center backdrop-blur-2xl shadow-[0_0_40px_rgba(249,115,22,0.2)] transition-transform hover:-translate-y-2 duration-500">
                    <FiMap size={44} className="text-orange-400 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]" />
                </div>
            </div>
        </div>
    );
}
