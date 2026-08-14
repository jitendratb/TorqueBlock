"use client";

import React from 'react';
import Link from 'next/link';

export default function OrderSuccessView({ orderDetails }) {
    if (!orderDetails) return null;

    const totalPaidAmount = orderDetails?.paidAmount || orderDetails?.items?.reduce((sum, item) => sum + (item.totalPrice || ((item.unitPrice || 0) * (item.quantity || 1))), 0) || 0;

    return (
        <div className='min-h-[85vh] flex justify-center  items-center ' >
            <div className="flex flex-col items-center  justify-center text-center  max-w-2xl mx-auto space-y-4">
                <div className="w-15 h-15 md:w-20 md:h-20 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 animate-bounce shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                    <svg className="w-7 h-7 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white">Order Confirmed</h2>
                    <p className="text-zinc-400 text-[10px] md:text-sm md:max-w-md md:mx-auto font-medium">
                        Thank you for your purchase! Your order has been placed and is currently being processed.
                    </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/5 w-full text-left space-y-3">
                    <div className="flex justify-between border-b border-white/5 pb-2.5 text-xs font-bold text-zinc-400 uppercase lg:tracking-wider">
                        <span className="min-w-[70px] text-[10px] lg:text-xs">Order ID</span>
                        <span className="text-white text-[10px] lg:text-xs normal-case font-black break-all text-right ml-4">{orderDetails._id || orderDetails.transactionId}</span>
                    </div>
                    <div className="flex justify-between text-[10px] lg:text-xs font-semibold text-zinc-400">
                        <span>Payment Method</span>
                        <span className="text-white text-[10px] lg:text-xs uppercase font-bold">{orderDetails?.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between text-[10px] lg:text-xs font-semibold text-zinc-400">
                        <span>Payment Status</span>
                        <span className="text-orange-400 text-[10px] lg:text-xs uppercase font-bold">{orderDetails?.paymentStatus}</span>
                    </div>
                    <div className="flex justify-between text-[10px] lg:text-xs font-semibold text-zinc-400">
                        <span>Total Amount Paid</span>
                        <span className="text-orange-400 text-[10px] lg:text-xs font-black">
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalPaidAmount)}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                    <Link
                        href="/orders"
                        className="px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all text-center"
                    >
                        View My Orders
                    </Link>
                    <Link
                        href="/tyres"
                        className="px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all text-center"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
