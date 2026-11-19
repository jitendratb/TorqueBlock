"use client";

import React from 'react';
import Image from '@/components/molecules/CustomImage';
import { IoReceiptOutline } from 'react-icons/io5';

export default function CartSummary({ summary, formatPrice, onEditCart }) {
    const items = summary.items || [];
    const productDiscount = items.reduce(
        (sum, item) => sum + Math.max(0, (Number(item.mrp) - Number(item.price)) * item.quantity),
        0
    );
    const subtotal = Number(summary.subtotal) || 0;
    const couponDiscount = Number(summary.discount_total) || 0;
    const shippingCharge = Number(summary.shipping_total) || 0;
    const couponCode = summary.discounts?.[0]?.code;
    const totalSaved = productDiscount + couponDiscount;

    return (
        <section className="bg-white/10 border border-white/5 rounded-xl p-4 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                    <IoReceiptOutline className="text-orange-500 text-lg" />
                    <h2 className="text-xs md:text-sm font-black md:uppercase md:tracking-widest text-white">
                        Order Summary
                    </h2>
                </div>
                <button
                    type="button"
                    onClick={onEditCart}
                    className="text-[10px] font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
                >
                    Edit Cart
                </button>
            </div>

            <ul className="space-y-3 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                {items.map((item, index) => (
                    <li key={`${item.variant_id}-${index}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-black/40">
                            <Image src={item.image_url} alt={item.title} fill sizes="56px" imageClassName="object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[11px] md:text-xs font-bold text-white truncate">{item.title}</p>
                            <p className="text-[10px] text-zinc-400 font-semibold mt-1">
                                Qty {item.quantity} × {formatPrice(item.price)}
                            </p>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="text-xs font-black text-white">{formatPrice(item.total)}</p>
                            {Number(item.mrp) > Number(item.price) && (
                                <p className="text-[10px] text-zinc-500 line-through">{formatPrice(item.mrp * item.quantity)}</p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            <div className="p-4 rounded-xl bg-white/10 border border-white/5 space-y-3 text-xs font-semibold text-zinc-400">
                {productDiscount > 0 && (
                    <>
                        <div className="flex justify-between">
                            <span>Original Price</span>
                            <span className="text-zinc-400 line-through decoration-red-500/60 font-semibold">{formatPrice(subtotal + productDiscount)}</span>
                        </div>
                        <div className="flex justify-between items-center text-emerald-400 font-bold">
                            <span>Product Discount</span>
                            <span className="font-black">- {formatPrice(productDiscount)}</span>
                        </div>
                    </>
                )}

                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-zinc-200 font-bold">{formatPrice(subtotal)}</span>
                </div>

                {couponDiscount > 0 && (
                    <div className="flex justify-between items-center text-orange-400 font-bold">
                        <span>{couponCode ? `Coupon (${couponCode})` : 'Coupon Discount'}</span>
                        <span className="font-black">- {formatPrice(couponDiscount)}</span>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <span>Delivery Charge</span>
                    {shippingCharge === 0 ? (
                        <span className="text-orange-400 font-black uppercase tracking-wider text-[11px]">FREE</span>
                    ) : (
                        <span className="text-zinc-200">{formatPrice(shippingCharge)}</span>
                    )}
                </div>

                <div className="flex justify-between items-baseline border-t border-white/5 pt-3 mt-1.5">
                    <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-widest text-white">Total Amount</span>
                        {totalSaved > 0 && (
                            <span className="text-[10px] text-emerald-400 font-bold mt-0.5">
                                You saved {formatPrice(totalSaved)}
                            </span>
                        )}
                    </div>
                    <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 tracking-tight">
                        {formatPrice(summary.total)}
                    </span>
                </div>
            </div>
        </section>
    );
}
