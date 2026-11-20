"use client";

import React from 'react';
import { IoLockClosedOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';

export default function PaymentVerifyingState() {
    return (
        <div className='min-h-[80vh] flex justify-center items-center' >
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center py-16 px-4 bg-white/10 border border-white/5 rounded-3xl backdrop-blur-xl max-w-2xl mx-auto space-y-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)]" role="status" aria-label="Verifying Payment">

          

                <div className="relative w-32 h-32 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 opacity-20 blur-xl animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-orange-500/20 animate-[spin_20s_linear_infinite]"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-amber-500 animate-spin"></div>

                    <div className="relative z-10 w-20 h-20 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center text-orange-500 shadow-[inset_0_0_20px_rgba(249,115,22,0.15)]">
                        <IoShieldCheckmarkOutline className="w-10 h-10 animate-pulse" />
                    </div>
                </div>

                <div className="space-y-3 z-10 max-w-md">
                    <h3 className="text-xl font-black uppercase tracking-widest text-white">
                        Verifying Payment
                    </h3>
                    <p className="text-zinc-400 text-xs font-semibold leading-relaxed">
                        Please do not close this window, refresh the page, or click the back button. We are securely validating your transaction with the payment gateway.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-2 z-10">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider animate-pulse">
                        Securing transaction details...
                    </span>
                </div>

                <div className="flex gap-4 items-center justify-center pt-4 border-t border-white/5 w-full max-w-xs z-10">
                    <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                        <IoLockClosedOutline className="text-orange-500 text-xs" />
                        <span>SSL Encrypted</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
                    <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                        <IoShieldCheckmarkOutline className="text-emerald-500 text-xs" />
                        <span>Razorpay Secure</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
