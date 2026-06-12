"use client";

import Image from "@/components/molecules/CustomImage";
import { useState } from "react";

function FitmentSection({ tyre, h1tag = "Real-World Fitment" , scale=true }) {
    const [activeIndex, setActiveIndex] = useState();

    return (
        <section className=" border-t border-white/10 overflow-hidden">
            <div className="pt-4">

                <div className="space-y-2">
                    <h2 className="text-lg md:text-2xl md:text-4xl font-black tracking-tight text-orange-500">
                        {h1tag}
                    </h2>

                    <p className="text-zinc-400 text-xs md:text-base max-w-3xl">
                        See how this tyre looks when fitted on customers motorcycles.
                    </p>
                </div>

                <div className="flex h-[320px] md:h-[500px]  overflow-hidden my-6  p-[1px] bg-gradient-to-b from-white/10 to-transparent">
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