"use client";

import React, { useCallback } from 'react';
import useCartStore from '@/stores/cartStore';
import Image from '@/components/molecules/CustomImage';
import { IoReceiptOutline } from 'react-icons/io5';

export default function CartSummary({ subtotal, deliveryCharge, finalTotal }) {
    const { cart } = useCartStore();

    const formatPrice = useCallback((price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    }, []);

    return (
        <section className="bg-white/10 border border-white/5 rounded-3xl p-4 backdrop-blur-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <IoReceiptOutline className="text-orange-500 text-lg" />
                <h2 className="text-xs md:text-sm font-black md:uppercase md:tracking-widest text-white">
                    Order Summary
                </h2>
            </div>

            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                {cart.map((item) => {
                    const product = item.product;
                    const sizeObj = item.selectedFront || item.selectedRear || item.selectedGeneric;
                    const sizeText = sizeObj ? sizeObj.size : 'Standard';
                    const positionText = item.selectedFront ? 'Front' : item.selectedRear ? 'Rear' : 'Tyre';
                    const itemImage = product.productImages?.[0] || '';

                    return (
                        <div key={item.id} className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-300">
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-zinc-800 bg-black/40 flex items-center justify-center">
                                {itemImage ? (
                                    <Image
                                        src={itemImage}
                                        alt={product.productName}
                                        fill
                                        sizes="60px"
                                        imageClassName="object-contain"
                                    />
                                ) : (
                                    <span className="text-[8px] font-bold text-zinc-600 uppercase">No Image</span>
                                )}
                            </div>

                            <div className="flex-1 min-w-0 h-full flex flex-col justify-between">
                                <div>
                                    <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest block mb-0.5">
                                        {product.brand?.name || 'Performance'}
                                    </span>
                                    <h4 className="text-xs font-bold text-white tracking-tight truncate">
                                        {product.productName}
                                    </h4>
                                    <p className="text-[9px] font-black text-zinc-400 mt-0.5 uppercase tracking-wide">
                                        {positionText}: <span className="text-zinc-200">{sizeText}</span>
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-1.5">
                                    <span className="text-[10px] text-zinc-500 font-bold">
                                        Qty: <span className="text-white font-black">{item.quantity}</span>
                                    </span>
                                    <span className="text-xs font-black text-white">
                                        {formatPrice(item.price * item.quantity)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/5 space-y-3 text-xs font-semibold text-zinc-400">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-zinc-200">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                    <span>Delivery Charge</span>
                    <span className="text-zinc-200">{formatPrice(deliveryCharge)}</span>
                </div>

                {/* Grand Total */}
                <div className="flex justify-between items-baseline border-t border-white/5 pt-3 mt-1.5">
                    <span className="text-xs font-black uppercase tracking-widest text-white">Total Amount</span>
                    <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 tracking-tight">
                        {formatPrice(finalTotal)}
                    </span>
                </div>
            </div>
        </section>
    );
}
