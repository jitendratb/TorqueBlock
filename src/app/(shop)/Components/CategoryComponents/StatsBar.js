'use client';

import React from 'react';
import { FiZap, FiShield, FiAward } from 'react-icons/fi';
import { TbBike } from 'react-icons/tb';
import AnimatedCount from './AnimatedCount';

export default function StatsBar({ count }) {
    const stats = [
        { icon: <TbBike size={18} />, label: 'Riding Styles', value: count, suffix: '+' },
        { icon: <FiZap size={16} />, label: 'Premium Brands', value: 12, suffix: '+' },
        { icon: <FiShield size={16} />, label: 'Genuine Products', value: 100, suffix: '%' },
        { icon: <FiAward size={16} />, label: 'Happy Riders', value: 25000, suffix: '+' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 ">
            {stats.map((s, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-orange-500/40 transition-colors duration-300"
                >
                    <div className="text-orange-500 bg-orange-500/10 rounded-full p-2 flex-shrink-0">{s.icon}</div>
                    <div>
                        <div className="text-lg font-black text-white leading-none">
                            <AnimatedCount end={s.value} />{s.suffix}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mt-0.5">
                            {s.label}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
