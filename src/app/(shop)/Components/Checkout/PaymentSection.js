"use client";

import React from 'react';
import { IoShieldCheckmarkOutline, IoCardOutline } from 'react-icons/io5';

export default function PaymentSection() {
    return (
        <section className="bg-white/10 border border-white/5 rounded-xl p-4 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <IoShieldCheckmarkOutline className="text-orange-500 text-lg" />
                <h2 className="text-xs md:text-sm font-black md:uppercase md:tracking-widest text-white">
                    Payment Method
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative p-4 rounded-2xl border text-left flex items-start gap-4 bg-orange-500/5 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
                    <div className="p-3 rounded-xl flex items-center justify-center shrink-0 bg-orange-500/10 text-orange-500">
                        <IoCardOutline className="text-xl" />
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-xs md:text-sm font-black text-white flex items-center gap-2">
                            Online Payment
                            <span className="text-[9px] font-extrabold uppercase bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded border border-orange-500/25">
                                GoKwik
                            </span>
                        </h3>
                        <p className="text-[9px] text-zinc-400 leading-relaxed font-medium">
                            Pay securely via UPI, Credit/Debit Cards, Netbanking, or Wallets. The payment window opens when you tap Pay.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
