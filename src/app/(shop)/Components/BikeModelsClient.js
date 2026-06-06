"use client";

import React, { useEffect, useState } from "react";
import Image from "@/components/molecules/CustomImage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import vehicleService from "@/services/vehicleService";
import { FiCheckCircle, FiInfo, FiArrowRight, FiMaximize2, FiMessageCircle, FiZap, FiShield, FiTarget } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { GiCartwheel } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { AiFillStar } from "react-icons/ai";
import WhatsAppButton from "@/components/atoms/WhatsAppButton";
import PerformanceDNA from "@/components/molecules/PerformanceDNA";
import SupportTerminal from "@/components/molecules/SupportTerminal";
import TopProductCard from "./TopProductCard";

function BikeModelsClient({  data }) {
    const router = useRouter();

    const whatsappMessage = encodeURIComponent(`Hi Torque Block! I need a high-performance tyre setup for my ${data.bikeBrand} ${data.bikeModel}. What's the best rubber for maximum grip?`);

    return (
        <div className="relative space-y-4 lg:space-y-8">
            <div className="absolute top-[20%] -left-20 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-[60%] -right-20 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

            <section className="relative h-[80vh] md:h-[70vh]  2xl:h-[500px] w-full rounded-[1rem] md:rounded-[3rem] overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5">
                <Image
                    src={data.heroImage}
                    alt={`${data.bikeBrand} ${data.bikeModel}`}
                    fill
                    imageClassName="object-cover transition-transform duration-[3s] group-hover:scale-110 brightness-75"
                    priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

                <div className="absolute top-2 right-2 md:right-8 z-30 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <a
                        href="https://g.page/r/Cb6WqK2TfF-S/review"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex cursor-pointer items-center gap-1 md:gap-3 px-3 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-zinc-950 to-zinc-900/80 backdrop-blur-xl border border-white/5 rounded-full shadow-2xl hover:scale-105 transition-transform cursor-pointer"
                    >
                        <FcGoogle className="text-md lg:text-lg" />
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <AiFillStar key={i} className="text-yellow-500 text-xs lg:text-sm" />
                            ))}
                        </div>
                        <div className="flex items-center">
                            <span className="text-white/60 font-black text-xs lg:text-sm">4.9</span>
                            <span className="text-zinc-400 text-[9px] lg:text-xs font-medium uppercase tracking-widest ml-1 border-l-2 border-white/60 pl-1">2000+ Reviews</span>
                        </div>
                    </a>
                </div>

                <div className="absolute top-12 left-12 z-20 hidden md:flex flex-col gap-4">
                    <div className="w-1 h-32 bg-gradient-to-b from-orange-500 to-transparent" />
                    <div className="rotate-90 origin-left text-[10px] font-black uppercase tracking-[1em] text-zinc-500">
                        Performance Intent
                    </div>
                </div>

                <div className="absolute bottom-4 lg:bottom-16 left-4 md:left-24 z-20 max-w-5xl space-y-2 xl:space-y-8 pr-2 md:pr-4">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.3em] rounded-full shadow-2xl animate-bounce-slow">
                        <FiZap className="text-orange-500" />
                        Next-Gen Traction
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-orange-500 text-lg lg:text-2xl md:text-xl font-black lg:tracking-tighter uppercase italic leading-none opacity-90">
                            {data.bikeBrand}
                        </h2>
                        <h1 className="text-2xl md:text-[3rem] xl:text-[4rem] font-black text-white   md:tracking-[-0.05em] uppercase leading-[0.85] select-none">
                            {data.bikeModel}
                        </h1>
                    </div>

                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 xl:gap-16 pt-4 lg:pt-8">
                        <p className="text-sm md:text-xl xl:text-3xl text-zinc-300 font-medium leading-tight max-w-xl border-l-4 border-orange-500 pl-3 lg:pl-6">
                            {data.subTitle}
                        </p>
                        <div className="flex gap-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Torque Grade</span>
                                <span className="text-2xl font-black text-white">ELITE</span>
                            </div>
                            <div className="w-px h-10 bg-zinc-800" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Intent ID</span>
                                <span className="text-2xl font-black text-white">#00{Math.floor(Math.random() * 99)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div className="p-4 md:p-8 bg-zinc-900 border border-zinc-800 rounded-2xl relative overflow-hidden group hover:border-zinc-700 transition-all duration-300">
                    <div className="relative z-10 space-y-2">
                        <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Front Standard Fitment</span>
                        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                            {data.frontSizes?.[0]}
                        </h3>
                    </div>
                    <div className="absolute -bottom-8 -right-8 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500">
                        <GiCartwheel size={150} className="text-white" />
                    </div>
                </div>

                <div className="p-4 md:p-8 bg-zinc-900 border border-zinc-800 rounded-2xl relative overflow-hidden group hover:border-zinc-700 transition-all duration-300">
                    <div className="relative z-10 space-y-2">
                        <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Rear Standard Fitment</span>
                        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                            {data.rearSizes?.[0]}
                        </h3>
                    </div>
                    <div className="absolute -bottom-8 -right-8 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500">
                        <GiCartwheel size={150} className="text-white" />
                    </div>
                </div>

                <div className="md:col-span-2 ">
                    <PerformanceDNA points={data.whyTyreChoiceMatters} />
                </div>
            </div>

            <section className="">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 px-4">
                    <div className="space-y-4 max-w-2xl lg:text-center text-left">
                        <h2 className="text-4xl md:text-2xl font-black text-white uppercase tracking-tighter leading-none">
                            THE <span className="text-orange-500 text-6xl md:text-8xl outline-text text-transparent">RUBBER</span> LIST
                        </h2>
                        <p className="text-zinc-500 text-sm lg:text-xl font-bold italic">Top 3 picks for the {data.bikeModel} geometry.</p>
                    </div>
                    <button
                        onClick={() => router.push(`/search?q=${data.bikeBrand}`)}
                        className="hidden lg:inline-flex items-center gap-3 px-2 lg:px-4 py-2 lg:py-4 border-2 border-orange-500 text-orange-500 font-black uppercase  text-[10px] rounded-full hover:bg-orange-500 hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(249,115,22,0.15)] group"
                    >
                        View All {data.bikeBrand} Tyres
                        <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
                    {data.topProducts?.map((product, index) => (
                        <TopProductCard 
                            key={index} 
                            product={product} 
                            index={index} 
                            bikeModel={data.bikeModel} 
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default BikeModelsClient;
