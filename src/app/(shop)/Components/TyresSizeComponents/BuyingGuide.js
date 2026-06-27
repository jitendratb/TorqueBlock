import React from 'react';
import { TbUserCheck, TbUserX, TbRoad, TbCheck, TbX, TbChevronRight } from 'react-icons/tb';

function BuyingGuide({ tyreData }) {
    const guide = tyreData?.buyingGuide;

    if (!guide) return null;

    const hasWhoShouldBuy = Array.isArray(guide.whoShouldBuy) && guide.whoShouldBuy.length > 0;
    const hasWhoShouldAvoid = Array.isArray(guide.whoShouldAvoid) && guide.whoShouldAvoid.length > 0;
    const hasBestUseCases = Array.isArray(guide.bestUseCases) && guide.bestUseCases.length > 0;

    if (!hasWhoShouldBuy && !hasWhoShouldAvoid && !hasBestUseCases) return null;

    return (
        <section className="space-y-3 py-4">
            <h2 className="text-sm md:text-lg font-semibold  uppercase tracking-[0.25em] text-orange-500">
                Tyre Buying Guide
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {hasWhoShouldBuy && (
                    <div className=" relative overflow-hidden rounded-2xl bg-white/10 to-zinc-950/60 border border-white/20 backdrop-blur-md p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:shadow-[0_12px_24px_-10px_rgba(16,185,129,0.15)]">

                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                    <TbUserCheck className="text-lg md:text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-sm md:text-base font-bold text-zinc-100">
                                        Who Should Buy
                                    </h3>
                                    <p className="text-[10px] text-zinc-500 font-medium">
                                        Ideal match for these riders
                                    </p>
                                </div>
                            </div>

                            <ul className="space-y-2.5">
                                {guide?.whoShouldBuy?.slice(0,6)?.map((item, idx) => (
                                    <li key={idx} className="group flex items-start gap-3 text-xs md:text-sm text-zinc-300 hover:text-white transition-colors duration-200">
                                        <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors mt-0.5">
                                            <TbCheck size={14} strokeWidth={2.5} />
                                        </span>
                                        <span className="leading-relaxed pt-0.5">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {hasWhoShouldAvoid && (
                    <div className="relative overflow-hidden rounded-2xl bg-white/10 to-zinc-950/60 border border-white/20 backdrop-blur-md p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-red-500/10 hover:shadow-[0_12px_24px_-10px_rgba(239,68,68,0.15)]">
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                                    <TbUserX className="text-lg md:text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-sm md:text-base font-bold text-zinc-100">
                                        Who Should Avoid
                                    </h3>
                                    <p className="text-[10px] text-zinc-500 font-medium">
                                        Considerations & trade-offs
                                    </p>
                                </div>
                            </div>

                            <ul className="space-y-2.5">
                                {guide?.whoShouldAvoid?.slice(0, 6)?.map((item, idx) => (
                                    <li key={idx} className="group flex items-start gap-3 text-xs md:text-sm text-zinc-300 hover:text-white transition-colors duration-200">
                                        <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 group-hover:bg-red-500/20 group-hover:text-red-300 transition-colors mt-0.5">
                                            <TbX size={14} strokeWidth={2.5} />
                                        </span>
                                        <span className="leading-relaxed pt-0.5">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {hasBestUseCases && (
                    <div className="relative overflow-hidden rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500/10 hover:shadow-[0_12px_24px_-10px_rgba(249,115,22,0.15)]">

                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                                    <TbRoad className="text-lg md:text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-sm md:text-base font-bold text-zinc-100">
                                        Best Use Cases
                                    </h3>
                                    <p className="text-[10px] text-zinc-500 font-medium">
                                        Optimal riding conditions
                                    </p>
                                </div>
                            </div>

                            <ul className="space-y-2.5">
                                {guide?.bestUseCases?.slice(0, 6)?.map((item, idx) => (
                                    <li key={idx} className="group flex items-start gap-3 text-xs md:text-sm text-zinc-300 hover:text-white transition-colors duration-200">
                                        <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:bg-orange-500/20 group-hover:text-orange-300 transition-colors mt-0.5">
                                            <TbChevronRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                                        </span>
                                        <span className="leading-relaxed pt-0.5">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default BuyingGuide;