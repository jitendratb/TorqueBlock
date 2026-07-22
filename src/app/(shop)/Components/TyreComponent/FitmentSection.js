"use client";

import Image from "@/components/molecules/CustomImage";
import { useState } from "react";

import { FaImages } from "react-icons/fa";

function FitmentSection({ tyre, h1tag = "Real-World Fitment" , scale=true }) {
    const [activeIndex, setActiveIndex] = useState();

    return (
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex items-center gap-3.5 mb-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                    <FaImages className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                </div>
                <div>
                    <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                        {h1tag}
                    </h2>
                    <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                        Customer motorcycles gallery
                    </p>
                </div>
            </div>

            <div className="relative border-t border-white/10 pt-4 mt-2">
                <div className="flex h-[320px] md:h-[500px] overflow-hidden rounded-xl bg-gradient-to-b from-white/10 to-transparent p-[1px]">
                    {tyre?.gallery?.map((image, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`
                                group relative overflow-hidden cursor-pointer 
                                transition-all duration-700 ease-in-out
                                ${activeIndex === index ? "flex-[2]" : "flex-1"}
                                md:hover:flex-[2]
                            `}
                        >
                            <Image
                                src={image}
                                alt={`${tyre?.productName} fitment ${index + 1}`}
                                fill
                                imageClassName={`object-cover transition-transform duration-700 ease-out ${scale ? "group-hover:scale-105" : ""} ${activeIndex === index ? "scale-105" : ""}`}
                            />

                            {/* Vignette Gradients */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-80 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Slide Number / Label */}
                            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white z-10 transition-transform duration-500 group-hover:translate-x-1">
                                <span className="text-xs font-black bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                                    {index + 1}
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    Fitment #{index + 1}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FitmentSection;