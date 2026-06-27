"use client";

import React from 'react';
import { IoShieldCheckmarkOutline, IoCashOutline, IoCardOutline } from 'react-icons/io5';

export default function PaymentSection({ paymentMethod, onSelectMethod }) {
    return (
        <section className="bg-white/10 border border-white/5 rounded-3xl p-4 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <IoShieldCheckmarkOutline className="text-orange-500 text-lg" />
                <h2 className="text-xs md:text-sm font-black md:uppercase md:tracking-widest text-white">
                    Payment Method
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                    className="relative p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 bg-white/[0.02] border-white/5 opacity-40 cursor-not-allowed select-none"
                >
                    <div className="p-3 rounded-xl flex items-center justify-center shrink-0 bg-zinc-800 text-zinc-500">
                        <IoCashOutline className="text-xl" />
                    </div>

                    <div className="space-y-1">
                        <h4 className="text-xs md:text-sm font-black text-white flex items-center gap-2">
                            Cash on Delivery
                            <span className="text-[9px] font-extrabold uppercase bg-red-500/15 text-red-400 px-2 py-0.5 rounded border border-red-500/20">
                                Unavailable
                            </span>
                        </h4>
                        <p className="text-[9px] text-zinc-400 leading-relaxed font-medium">
                            Currently not available. Please use online payment options.
                        </p>
                    </div>
                </div>

                <div
                    onClick={() => onSelectMethod('razorpay')}
                    className={`group relative p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                        paymentMethod === 'razorpay'
                            ? "bg-orange-500/5 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.15)]"
                            : "bg-black/10 border-white/5 hover:border-white/10 hover:bg-zinc-900/50"
                    }`}
                >
                    <div className={`p-3 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        paymentMethod === 'razorpay' ? 'bg-orange-500/10 text-orange-500' : 'bg-zinc-800 text-zinc-500 group-hover:text-zinc-300'
                    }`}>
                        <IoCardOutline className="text-xl" />
                    </div>

                    <div className="space-y-1">
                        <h4 className="text-xs md:text-sm font-black text-white flex items-center gap-2">
                            Online Payment
                            <span className="text-[9px] font-extrabold uppercase bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded border border-orange-500/25">
                                Razorpay
                            </span>
                        </h4>
                        <p className="text-[9px] text-zinc-400 leading-relaxed font-medium">
                            Pay securely via Credit/Debit Cards, UPI, Netbanking, or Wallets.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
