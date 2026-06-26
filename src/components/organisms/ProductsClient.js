'use client';

import TyreCard from "@/components/atoms/TyreCard";
import WhatsAppButton from "@/components/atoms/WhatsAppButton";
import { FiSearch, FiSliders } from "react-icons/fi";
import SearchBar from "./searchBar";

export default function ProductsClient({ products, pagination }) {
    return (
        <div className="relative space-y-4">
            <div className="relative overflow-hidden rounded-3xl bg-zinc-900/40 border border-white/5 p-4 shadow-2xl">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
                    <div className="flex flex-col gap-6 w-full md:w-2/3">
                        <div className="inline-flex w-fit items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(249,115,22,0.15)] backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            Premium Collection
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-orange-500 tracking-tight leading-[1.1] drop-shadow-lg">
                            Unleash Peak <br className="hidden md:block" /> Performance.
                        </h1>

                        <p className="text-base text-zinc-400 max-w-[600px] leading-relaxed font-medium">
                            Explore our curated selection of high-performance tyres. Engineered for relentless grip, ultimate durability, and unmatched style on any terrain.
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none" />

                {/* <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 relative z-10 border-b border-white/5">
                  
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900/80 rounded-xl text-sm font-medium text-zinc-300 border border-white/10 hover:text-white hover:border-orange-500/50 transition-all backdrop-blur-sm shadow-md">
                            <FiSliders className="w-4 h-4 text-orange-500" />
                            Filter & Sort
                        </button>
                    </div>
                </div> */}

                {products && products?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10 w-full">
                        {products?.map((product, index) => (
                            <TyreCard key={index} product={product} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 flex flex-col items-center justify-center text-zinc-500 gap-5 relative z-10">
                        <div className="w-24 h-24 mb-2 rounded-full bg-zinc-900/80 flex items-center justify-center border border-orange-500/20 shadow-[0_0_40px_rgba(249,115,22,0.15)] backdrop-blur-md">
                            <FiSearch className="w-10 h-10 text-orange-500" />
                        </div>
                        <h3 className="text-3xl font-black text-zinc-200 tracking-tight">No products found</h3>
                        <p className="text-lg text-center max-w-md text-zinc-400 mb-4">
                            We couldn't find any tyres matching your criteria. Need help finding a specific model?
                        </p>
                        <div className="mt-2">
                            <WhatsAppButton
                                text="Chat with our Experts"
                                value="Hi, I couldn't find the tyre I was looking for on your website. Can you help me?"
                                className="py-3.5 px-8 rounded-xl font-bold hover:scale-105 transition-transform"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
