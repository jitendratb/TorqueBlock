import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TbUserCheck, TbUserX, TbRoad, TbCheck, TbX, TbChevronRight } from 'react-icons/tb';
import { FaBookOpen } from 'react-icons/fa';

const GuideSection = React.memo(({ title, subtitle, items, Icon, ItemIcon, theme }) => {
    if (!Array.isArray(items) || items.length === 0) return null;

    const themeStyles = {
        emerald: {
            wrapper: "hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:shadow-[0_12px_24px_-10px_rgba(16,185,129,0.15)]",
            iconWrapper: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
            itemIconWrapper: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300",
        },
        red: {
            wrapper: "hover:border-red-500/30 hover:bg-red-500/10 hover:shadow-[0_12px_24px_-10px_rgba(239,68,68,0.15)]",
            iconWrapper: "bg-red-500/10 border-red-500/20 text-red-400",
            itemIconWrapper: "bg-red-500/10 border-red-500/20 text-red-400 group-hover:bg-red-500/20 group-hover:text-red-300",
        },
        orange: {
            wrapper: "hover:border-orange-500/40 hover:bg-orange-500/10 hover:shadow-[0_12px_24px_-10px_rgba(249,115,22,0.15)]",
            iconWrapper: "bg-orange-500/10 border-orange-500/20 text-orange-400",
            itemIconWrapper: "bg-orange-500/10 border-orange-500/20 text-orange-400 group-hover:bg-orange-500/20 group-hover:text-orange-300",
        }
    };

    const currentTheme = themeStyles[theme] || themeStyles.emerald;

    return (
        <article className={`relative overflow-hidden rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${currentTheme.wrapper}`}>
            <div className="relative z-10 space-y-2">
                <header className="flex items-center gap-2 border-b border-white/10 pb-2">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl border ${currentTheme.iconWrapper}`}>
                        <Icon className="text-lg md:text-xl" aria-hidden="true" />
                    </div>
                    <div>
                        <h3 className="text-sm md:text-base font-bold text-zinc-100">
                            {title}
                        </h3>
                        <p className="text-[10px] text-zinc-500 font-medium">
                            {subtitle}
                        </p>
                    </div>
                </header>

                <ul className="space-y-2" aria-label={title}>
                    {items.slice(0, 7).map((item, idx) => (
                        <li key={idx} className="group flex items-start gap-3 text-xs md:text-sm text-zinc-300 hover:text-white transition-colors duration-200">
                            <span className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full border transition-colors mt-0.5 ${currentTheme.itemIconWrapper}`}>
                                <ItemIcon 
                                    size={14} 
                                    strokeWidth={2.5} 
                                    className={theme === 'orange' ? "group-hover:translate-x-0.5 transition-transform" : ""} 
                                    aria-hidden="true" 
                                />
                            </span>
                            <span className="leading-relaxed pt-0.5">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
});

const BuyingGuide = React.memo(({ tyreData }) => {
    const guide = tyreData?.buyingGuide;

    const { hasWhoShouldBuy, hasWhoShouldAvoid, hasBestUseCases } = useMemo(() => {
        return {
            hasWhoShouldBuy: Array.isArray(guide?.whoShouldBuy) && guide.whoShouldBuy.length > 0,
            hasWhoShouldAvoid: Array.isArray(guide?.whoShouldAvoid) && guide.whoShouldAvoid.length > 0,
            hasBestUseCases: Array.isArray(guide?.bestUseCases) && guide.bestUseCases.length > 0,
        };
    }, [guide]);

    if (!guide || (!hasWhoShouldBuy && !hasWhoShouldAvoid && !hasBestUseCases)) {
        return null;
    }

    return (
        <section aria-labelledby="buying-guide-title" className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

            <header className="relative flex border-b border-white/10 pb-4 mb-4 items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                    <FaBookOpen className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" aria-hidden="true" />
                </div>
                <div className="flex flex-col flex-1">
                    <h2 id="buying-guide-title" className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                        Tyre Buying Guide
                    </h2>
                    <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                        Expert Recommendations & Use Cases
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                {hasWhoShouldBuy && (
                    <GuideSection
                        title="Who Should Buy"
                        subtitle="Ideal match for these riders"
                        items={guide.whoShouldBuy}
                        Icon={TbUserCheck}
                        ItemIcon={TbCheck}
                        theme="emerald"
                    />
                )}
                
                {hasWhoShouldAvoid && (
                    <GuideSection
                        title="Who Should Avoid"
                        subtitle="Considerations & trade-offs"
                        items={guide.whoShouldAvoid}
                        Icon={TbUserX}
                        ItemIcon={TbX}
                        theme="red"
                    />
                )}

                {hasBestUseCases && (
                    <GuideSection
                        title="Best Use Cases"
                        subtitle="Optimal riding conditions"
                        items={guide.bestUseCases}
                        Icon={TbRoad}
                        ItemIcon={TbChevronRight}
                        theme="orange"
                    />
                )}
            </div>
        </section>
    );
});

export default BuyingGuide;