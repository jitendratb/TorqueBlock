import React from 'react';
import CheckoutClient from '../Components/Checkout/CheckoutClient';

export const metadata = {
    title: 'Checkout',
    description: 'Complete your purchase of premium, high-performance motorcycle tyres on TorqueBlock.',
};

export default function CheckoutPage() {
    return (
        <main className="py-4 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10">
                <div className="flex flex-col gap-2 mb-8 border-l-2 border-orange-500 pl-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
                        Secure Transaction
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                        Checkout
                    </h1>
                </div>

                <CheckoutClient />
            </div>
        </main>
    );
}