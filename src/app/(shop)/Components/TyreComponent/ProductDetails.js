"use client";

import WhatsAppButton from "@/components/atoms/WhatsAppButton";
import Image from "@/components/molecules/CustomImage"
import { useMemo, useState } from "react";
import { FaMotorcycle, FaRoad, FaBolt, FaFlagCheckered, FaShieldAlt, FaTag } from "react-icons/fa";
import { HiFire } from "react-icons/hi";
import { FaTools, FaTruck, FaUserTie } from "react-icons/fa";

const tagConfig = {
    Street: {
        icon: <FaRoad className="text-zinc-300 text-sm" />,
    },

    "Weekend Rides": {
        icon: <FaMotorcycle className="text-zinc-300 text-sm" />,
    },

    "High Performance": {
        icon: <HiFire className="text-orange-500 text-sm" />,
    },

    "Extreme Grip": {
        icon: <FaBolt className="text-yellow-400 text-sm" />,
    },

    "Bi-Compound": {
        icon: <FaFlagCheckered className="text-green-400 text-sm" />,
    },

    Supersport: {
        icon: <FaMotorcycle className="text-zinc-300 text-sm" />,
    },

    "Naked Sport": {
        icon: <FaMotorcycle className="text-zinc-300 text-sm" />,
    },
};

export default function ProductDetails({ tyre }) {
    const gallery = useMemo(() => tyre?.productImages || [], [tyre]);
    const [activeImage, setActiveImage] = useState(gallery[0])

    const allTags = useMemo(() => {
        const eyebrow = tyre?.hero?.eyebrowText || "";
        const subtitle = tyre?.hero?.subtitle || "";
        const combinedText = `${eyebrow} ${subtitle}`.toLowerCase();
        const tags = []

        Object.keys(tagConfig).forEach(tag => {
            if (tag !== "High Performance" && combinedText.includes(tag.toLowerCase())) {
                tags.push(tag);
            }
        });

        return [...new Set(tags), "High Performance"];
    }, [tyre]);

    return (
        <section className="w-full relative">
            <div className="grid grid-cols-1 gap-2 md:gap-4 lg:grid-cols-2">
                <div className="flex flex-col-reverse md:grid md:grid-cols-[90px_1fr] gap-4">
                    <div className="flex md:h-[450px] md:flex-col gap-3 overflow-y-auto pr-1">
                        {gallery?.map((item, idx) => {
                            const isActive = activeImage === item;

                            return (
                                <button key={idx} type="button" onClick={() => setActiveImage(item)} onMouseEnter={() => setActiveImage(item)} className={`relative cursor-pointer h-20 w-20 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 ${isActive ? "border-orange-500" : "border-zinc-800 hover:border-zinc-600"}`}>
                                    <Image src={item} alt={`${tyre?.name || "Tyre"} image ${idx + 1}`} fill sizes="40px" imageClassName="object-cover transition-transform duration-300 hover:scale-105" />
                                </button>
                            );
                        })}
                    </div>

                    <div className="relative flex h-[350px] md:h-[450px] w-auto  items-center justify-center overflow-hidden">
                        {activeImage && (
                            <Image
                                src={activeImage}
                                alt={tyre?.name || "Tyre"}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                                imageClassName="object-contain transition-transform w-full duration-300 hover:scale-105"
                            />
                        )}
                    </div>
                </div>

                <div className="space-y-4 mt-2 md:mt-0">
                    <div className="flex items-center gap-4">

                        <p className="text-[10px] lg:text-sm font-medium uppercase tracking-[0.2em] text-orange-500">
                            {tyre?.brand?.name} PERFORMANCE SERIES
                        </p>

                        <div className="absolute top-0 right-0 md:relative flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5 backdrop-blur-xl">
                            <FaShieldAlt className="text-xs text-green-400" />

                            <p className="text-xs font-medium text-green-100">
                                Trusted by 50,000+ riders
                            </p>
                        </div>

                    </div>


                    <div className="max-w-4xl">
                        <h1 className="flex flex-wrap items-end gap-x-4 gap-y-2 text-2xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl">
                            <span className="text-zinc-400 text-lg md:text-2xl font-normal">
                                Is
                            </span>
                            <span>{tyre?.productName}</span>
                            <span className="text-zinc-400 text-lg md:text-2xl font-normal">
                                right for your bike?
                            </span>
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {allTags?.map((tag) => {
                            return (
                                <div key={tag} className="flex items-center gap-2 rounded border border-white/10 bg-zinc-900/80 px-2 md:px-4 py-1 shadow-md backdrop-blur-md transition-all duration-300   "  >
                                    {tagConfig[tag]?.icon}
                                    <span className="text-xs md:text-sm font-medium text-white">
                                        {tag}
                                    </span>
                                </div>
                            )
                        })}
                        {tyre?.categoryId?.name && (
                            <div className="flex items-center gap-2 rounded border border-white/10 bg-zinc-900/80 px-2 md:px-4 py-1 shadow-md backdrop-blur-md transition-all duration-300   "  >
                                <FaTag className="text-blue-400 text-sm" />
                                <span className="text-xs md:text-sm font-medium text-white">
                                    {tyre?.categoryId?.name}
                                </span>
                            </div>
                        )}

                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <div className="">
                            <h3 className="mb-2 text-[10px] md:text-sm font-extrabold uppercase tracking-[0.2em] text-white">
                                Best Suited For
                            </h3>

                            <ul className="space-y-1">
                                {tyre?.bestSuitedFor?.map((item, index) => (
                                    <li key={index} className="flex items-center gap-3" >
                                        <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                                        <span className="text-xs md:text-sm leading-relaxed text-zinc-200">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-2 text-[10px] md:text-sm font-extrabold uppercase tracking-[0.2em] text-white">
                                Not Ideal If
                            </h3>

                            <ul className="space-y-1">
                                {tyre?.notIdealIf?.map((item, index) => (
                                    <li key={index} className="flex items-center gap-3" >
                                        <div className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]" />
                                        <span className="text-xs md:text-sm leading-relaxed text-zinc-200">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="pt-4 space-y-6">
                            <WhatsAppButton className="py-3" value={` I’m interested in ${tyre?.productName}. Please share: - Price - Available size - Delivery time -Installation support`} text="Get Best Price on WhatsApp" />

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">

                                <div className="flex items-center gap-2  text-center">
                                    <div className="rounded-full bg-green-500/10 p-3 text-green-400">
                                        <FaTools className="text-xs md:text-sm" />
                                    </div>
                                    <p className="text-xs md:text-sm font-medium text-white">
                                        Installation Support
                                    </p>
                                </div>

                                <div className=" flex  items-center text-center gap-2 ">
                                    <div className="rounded-full bg-orange-500/10 p-3 text-orange-400">
                                        <FaTruck className="text-xs md:text-sm" />
                                    </div>
                                    <p className="text-xs md:text-sm font-medium text-white ">
                                        Pan India Delivery
                                    </p>
                                </div>

                                <div className=" hidden md:flex items-center text-center gap-2">
                                    <div className=" rounded-full bg-blue-500/10 p-3 text-blue-400">
                                        <FaUserTie className="text-xs md:text-sm" />
                                    </div>
                                    <p className="text-xs md:text-sm font-medium text-white">
                                        Expert Assistance
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}