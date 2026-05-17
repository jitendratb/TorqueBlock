"use client";

import Image from "next/image";
import { useState } from "react";

function FitmentSection({ tyre }) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className=" border-t border-white/10 overflow-hidden">
            <div className="pt-4">

                <div className="space-y-2">
                    <h2 className="text-lg md:text-2xl md:text-4xl font-black tracking-tight text-orange-500">
                        Real-World Fitment
                    </h2>

                    <p className="text-zinc-400 text-xs md:text-base max-w-3xl">
                        See how this tyre looks when fitted on customers motorcycles.
                    </p>
                </div>

                <div className="flex h-[260px] md:h-[480px] overflow-hidden my-4 rounded">
                    {tyre?.gallery?.map((image, index) => (
                <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`
                        group relative overflow-hidden cursor-pointer
                        transition-all duration-700 ease-in-out
                        ${activeIndex === index ? "flex-2 md:flex-[1.2]" : "flex-1"}
                        md:hover:flex-[1.2]
                    `}
                >
                    <Image
                        src={image}
                        alt={`${tyre?.productName} fitment ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 ease-out"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-20 transition-all duration-500" />
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500" />
                </div>
            ))}
                </div>
            </div>
        </section>
    );
}

export default FitmentSection;