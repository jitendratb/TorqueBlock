'use client';

import React from 'react';
import Image from "@/components/molecules/CustomImage";
import { useRouter } from "next/navigation";
import WhatsAppButton from "@/components/atoms/WhatsAppButton";

export default function TopProductCard({ product, index, bikeModel, className }) {
    const router = useRouter();

    return (
        <div 
            onClick={() => router.push(`${product?.link}`)} 
            className={`group relative mt-20 lg:mt-24 pb-4 md:pb-10 px-4 md:px-2 lg:px-8 bg-zinc-950 border border-orange-900 rounded-[2rem] lg:rounded-[4rem] hover:border-orange-500 transition-all duration-700 hover:bg-zinc-900/40 cursor-pointer ${className}`}
        >
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-56 h-56 lg:w-62 lg:h-62 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 ease-out z-20">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    imageClassName="object-contain"
                />
            </div>

            <div className="relative z-10 flex flex-col items-center pt-28 lg:pt-34 text-center space-y-2">
                <div className="space-y-4 md:min-h-20">
                    <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.5em]">Choice 0{index + 1}</span>
                    <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-orange-400 bg-[length:200%_auto] bg-left group-hover:bg-right transition-[background-position] duration-700 ease-out uppercase tracking-tighter leading-none drop-shadow-md line-clamp-2">
                        {product.name}
                    </h3>
                </div>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed md:h-[70px] over-flow-hidden line-clamp-3">
                    {product.description}
                </p>

                <WhatsAppButton text="Check Price & Availability" value={`I'm interested in the ${product?.name} for my ${bikeModel}. Can you check live availability`} />
            </div>
        </div>
    );
}
