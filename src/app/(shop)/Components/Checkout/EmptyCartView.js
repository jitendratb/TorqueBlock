"use client";

import React from 'react';
import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';

export default function EmptyCartView() {
    return (
        <div className='min-h-[80vh] flex justify-center  items-center' >
         <div className="flex flex-col items-center justify-center text-center py-20 px-6  max-w-lg mx-auto gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/5 flex items-center justify-center text-zinc-500 shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]">
                <IoCartOutline className="text-2xl" />
            </div>
            <div className="space-y-2">
                <h3 className="text-xs font-black text-white uppercase tracking-widest">Your Cart is Empty</h3>
                <p className="text-xs text-gray-400 max-w-[260px] leading-relaxed font-medium">
                    Add high-performance tyres or tubes to your cart before proceeding to checkout.
                </p>
            </div>
            <Link
                href="/tyres"
                className="px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest bg-orange-500 hover:bg-orange-600 text-white transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            >
                Explore Products
            </Link>
        </div>    
        </div>
       
    );
}
