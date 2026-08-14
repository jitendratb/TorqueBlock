"use client";

import React, { useCallback, useMemo } from 'react';
import useCartStore from '@/stores/cartStore';
import CartItem from '@/components/molecules/CartItem';
import { IoReceiptOutline } from 'react-icons/io5';

export default function CartSummary({ subtotal, deliveryCharge, finalTotal }) {
    const { cart, removeFromCart, updateQuantity } = useCartStore();

    const formatPrice = useCallback((price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    }, []);

    const totalDiscount = useMemo(() => {
        return cart.reduce((acc, item) => {
            const selected = item.selectedFront || item.selectedRear || item.selectedGeneric || {};
            const disc = selected.discount || selected.discountAmount || item.discount || item.product?.discount || 0;
            return acc + (disc * (item.quantity || 1));
        }, 0);
    }, [cart]);

    const originalSubtotal = useMemo(() => subtotal + totalDiscount, [subtotal, totalDiscount]);

    return (
        <section className="bg-white/10 border border-white/5 rounded-xl p-4 backdrop-blur-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <IoReceiptOutline className="text-orange-500 text-lg" />
                <h2 className="text-xs md:text-sm font-black md:uppercase md:tracking-widest text-white">
                    Order Summary
                </h2>
            </div>

            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                {cart.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        formatPrice={formatPrice}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                    />
                ))}
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/5 space-y-3 text-xs font-semibold text-zinc-400">
                {totalDiscount > 0 ? (
                    <>
                        <div className="flex justify-between">
                            <span>Original Price</span>
                            <span className="text-zinc-400 line-through decoration-red-500/60 font-semibold">{formatPrice(originalSubtotal)}</span>
                        </div>

                        <div className="flex justify-between items-center text-emerald-400 font-bold">
                            <span>Total Discount</span>
                            <span className="font-black">- {formatPrice(totalDiscount)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="text-zinc-200 font-bold">{formatPrice(subtotal)}</span>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="text-zinc-200">{formatPrice(subtotal)}</span>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <span>Delivery Charge</span>
                    {deliveryCharge === 0 ? (
                        <span className="text-orange-400 font-black uppercase tracking-wider text-[11px]">FREE</span>
                    ) : (
                        <span className="text-zinc-200">{formatPrice(deliveryCharge)}</span>
                    )}
                </div>

                <div className="flex justify-between items-baseline border-t border-white/5 pt-3 mt-1.5">
                    <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-widest text-white">Total Amount</span>
                        {totalDiscount > 0 && (
                            <span className="text-[10px] text-emerald-400 font-bold mt-0.5">
                                You saved {formatPrice(totalDiscount)}
                            </span>
                        )}
                    </div>
                    <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 tracking-tight">
                        {formatPrice(finalTotal)}
                    </span>
                </div>
            </div>
        </section>
    );
}
