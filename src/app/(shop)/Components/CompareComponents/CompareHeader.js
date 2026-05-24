import React from "react";
import Image from "@/components/molecules/CustomImage";

export default function CompareHeader({
    category,
    tyre1Name,
    tyre2Name,
    tyre1Image,
    tyre2Image,
    seo,
}) {
    return (
        <div className="relative rounded-xl md:rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900/60 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 flex pointer-events-none">
                <div className="w-1/2 h-full bg-gradient-to-br from-orange-500/20 via-orange-500/5 to-transparent" />
                <div className="w-1/2 h-full bg-gradient-to-bl from-white/20 via-white/5 to-transparent" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-white/10 pointer-events-none z-10" />

            <div className="relative z-20 flex flex-col items-center gap-2 pt-8 pb-2 px-4">
                <div className="flex items-center gap-2 px-4 py-1.5 bg-zinc-900 border border-zinc-700 rounded-full w-fit">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">
                        {category || "Head-to-Head Battle"}
                    </span>
                </div>
                <h1 className="w-full flex items-center justify-center text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-none mt-1">
                    <span className="flex-1 text-right text-orange-500">{tyre1Name}</span>
                    <span className="text-zinc-600 mx-4 md:mx-6 italic text-xl md:text-4xl shrink-0">vs</span>
                    <span className="flex-1 text-left text-white">{tyre2Name}</span>
                </h1>
                {seo?.description && (
                    <p className="text-zinc-500 text-[10px] md:text-xs text-center max-w-2xl leading-relaxed mt-1 px-4">
                        {seo.description}
                    </p>
                )}
            </div>

            <div className="relative z-20 flex items-end justify-between px-4 md:px-16 gap-4 md:mt-6">
                <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full min-w-[100px] max-w-[200px] aspect-square mx-auto drop-shadow-2xl">
                        {tyre1Image ? (
                            <Image src={tyre1Image} alt={tyre1Name} fill imageClassName="object-contain" />
                        ) : (
                            <div className="w-full h-full bg-zinc-800/60 rounded-2xl flex items-center justify-center">
                                <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">No Image</span>
                            </div>
                        )}
                    </div>
                    <span className="text-[10px] font-bold text-orange-400 bg-orange-400/10 px-4 py-1.5 rounded-full uppercase tracking-widest border border-orange-400/20 mb-3">Alpha</span>
                </div>

                <div className="flex flex-col items-center shrink-0 mb-12">
                    <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-zinc-950 border border-white/20 flex items-center justify-center shadow-2xl relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/40 to-white/40 blur-md" />
                        <span className="text-white text-xs md:text-base font-black italic relative z-10">VS</span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full min-w-[100px] max-w-[200px] aspect-square mx-auto drop-shadow-2xl">
                        {tyre2Image ? (
                            <Image src={tyre2Image} alt={tyre2Name} fill imageClassName="object-contain" />
                        ) : (
                            <div className="w-full h-full bg-zinc-800/60 rounded-2xl flex items-center justify-center">
                                <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">No Image</span>
                            </div>
                        )}
                    </div>
                    <span className="text-[10px] font-bold text-white bg-white/10 px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/20 mb-3">Beta</span>
                </div>
            </div>
        </div>
    );
}
