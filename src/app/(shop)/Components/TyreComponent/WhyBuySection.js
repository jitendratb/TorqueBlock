"use client";
import React from 'react';
import { FiCheckCircle, FiShield, FiTruck, FiTool, FiZap } from 'react-icons/fi';
import FAQSection from '@/components/atoms/FAQSection';
const FAQS = [
    {
        question: "Where can I buy authentic superbike and motorcycle tyres online in India?",
        answer: "You can buy 100% genuine motorcycle and superbike tyres online at Torque Block. We are authorized partners for leading global brands including Pirelli, Michelin, Metzeler, Bridgestone, and Dunlop, offering pan-India door delivery with full manufacturer warranties."
    },
    {
        question: "How do I choose the right tyre compound for my motorcycle?",
        answer: "Selecting the ideal tyre compound depends on your riding environment: Track & Racing tyres feature soft sticky compounds for maximum cornering grip; Sport & Street tyres balance fast warm-up with daily durability; Touring tyres use dual-compound technology for high mileage; and Adventure tyres offer optimized tread blocks for dual-sport capabilities."
    },
    {
        question: "Does Torque Block offer professional tyre fitment support?",
        answer: "Yes, Torque Block provides dedicated expert fitment assistance in Bangalore and through trusted partner networks across major Indian metros, including dynamic wheel balancing and precision mounting."
    },
    {
        question: "What tyre sizes are available for superstock and performance motorcycles?",
        answer: "We stock all popular performance sizes including Front (120/70 ZR17, 110/70 R17, 100/90-19) and Rear (180/55 ZR17, 190/55 ZR17, 200/55 ZR17, 150/60 R17) across soft, medium, and hard rubber compounds."
    }
];

const MATRIX_ROWS = [
    {
        category: "Track & Superbike",
        intent: "Racing, Track Days, Circuit",
        tech: "SC Soft Compounds, WSBK Carcass, Semi-Slicks",
        models: "Pirelli Diablo Supercorsa V4, Michelin Power Cup 2"
    },
    {
        category: "Sport & Street",
        intent: "Fast Canyons, Daily Commute",
        tech: "Dual-Compound Silica, 0° Steel Belt, Rapid Warmup",
        models: "Metzeler Sportec M9 RR, Michelin Power 6"
    },
    {
        category: "Adventure & Trail",
        intent: "On/Off-Road 70/30 & 50/50",
        tech: "Interlocking Blocks, High Silica Wet Traction",
        models: "Metzeler Tourance Next 2, Pirelli Scorpion Trail III"
    },
    {
        category: "Sport Touring",
        intent: "Long Distance, All-Weather",
        tech: "Water Evacuation Channels, High Mileage Rubber",
        models: "Michelin Road 6, Metzeler Roadtec 02"
    }
];

export default function WhyBuySection() {
    return (
        <div className='flex flex-col gap-4 '>
        <section className="space-y-8 rounded-3xl border border-white/10 bg-white/10 p-4 md:p-6 backdrop-blur-xl shadow-2xl">

            {/* Header */}
            <div className="max-w-3xl space-y-3">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-400">
                    India's Official Superbike &amp; Performance Hub
                </span>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                    Why Buy Motorcycle Tyres from Torque Block?
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                    Torque Block is India's leading destination for high-performance motorcycle tyres, catering to track riders, tourers, commuters, and superbike enthusiasts. We partner directly with premium global manufacturers to ensure 100% authentic compound quality, fresh manufacturing batch codes, and full warranty protection.
                </p>
            </div>

            {/* Value Proposition Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl border border-white/5 bg-white/10 space-y-2">
                    <div className="flex items-center gap-2">
                        <FiShield className="text-orange-500 text-xl shrink-0" />
                        <h3 className="text-xs font-bold uppercase text-white tracking-wide">100% Genuine Guarantee</h3>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">Direct official imports with verified manufacturing dates &amp; full manufacturer warranties.</p>
                </div>
                <div className="p-4 rounded-2xl border border-white/5 bg-white/10 space-y-2">
                    <div className="flex items-center gap-2">
                        <FiTruck className="text-orange-500 text-xl shrink-0" />
                        <h3 className="text-xs font-bold uppercase text-white tracking-wide">Pan-India Express Shipping</h3>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">Safe, insured transit packaging to Bangalore, Mumbai, Delhi, Hyderabad, Chennai &amp; nationwide.</p>
                </div>
                <div className="p-4 rounded-2xl border border-white/5 bg-white/10 space-y-2">
                    <div className="flex items-center gap-2">
                        <FiTool className="text-orange-500 text-xl shrink-0" />
                        <h3 className="text-xs font-bold uppercase text-white tracking-wide">Expert Fitment Support</h3>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">Precision mounting, high-speed wheel balancing, and technical advice from compound specialists.</p>
                </div>
                <div className="p-4 rounded-2xl border border-white/5 bg-white/10 space-y-2">
                    <div className="flex items-center gap-2">
                        <FiCheckCircle className="text-orange-500 text-xl shrink-0" />
                        <h3 className="text-xs font-bold uppercase text-white tracking-wide">All Major Brands</h3>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">Complete inventory of Pirelli, Michelin, Metzeler, Apollo, Ceat, Eurogrip and more brands tyres.</p>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                    <FiZap className="text-orange-500 text-base shrink-0" />
                    <h3 className="text-sm font-black uppercase text-white tracking-wider">
                        Tyre Compound &amp; Riding Application Matrix
                    </h3>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
                    <table className="w-full text-left text-xs text-zinc-300 border-collapse min-w-[600px]">
                        <thead>
                            <tr className="border-b border-white/10 text-orange-400 uppercase text-[10px] tracking-wider bg-white/5">
                                <th className="py-3 px-4">Category</th>
                                <th className="py-3 px-4">Riding Intent</th>
                                <th className="py-3 px-4">Key Technologies</th>
                                <th className="py-3 px-4">Featured Models</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {MATRIX_ROWS.map((row) => (
                                <tr key={row.category}>
                                    <td className="py-3 px-4 font-bold text-white uppercase">{row.category}</td>
                                    <td className="py-3 px-4">{row.intent}</td>
                                    <td className="py-3 px-4">{row.tech}</td>
                                    <td className="py-3 px-4 text-orange-400 font-semibold">{row.models}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        
        </section>
            <FAQSection faqs={FAQS} />
           </div>
    );
}
