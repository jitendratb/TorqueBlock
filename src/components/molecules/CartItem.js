"use client";

import React, { memo } from 'react';
import Image from "@/components/molecules/CustomImage";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa6";

const CartItem = memo(({ item, formatPrice, updateQuantity, removeFromCart }) => {
    const product = item.product || {};
    const isTube = item.selectedGeneric?.type === 'Tube' || item.type === 'Tube' || product.type === 'Tube';
    const productName = product.name || product.productName || 'Product';
    const rawBrand =  product.brand?.name
    const brandName = rawBrand || (isTube ? 'TorqueBlock' : 'Performance');

    const itemImage = isTube
        ? (typeof product.images?.[0] === 'string' ? product.images[0] : product.images?.[0]?.url || product.productImages?.[0] || '')
        : (product.productImages?.[0] || (typeof product.images?.[0] === 'string' ? product.images[0] : product.images?.[0]?.url) || '');

    const specs = [];
    if (isTube) {
        if (item.selectedGeneric?.size) specs.push(`Size: ${item.selectedGeneric.size}`);
    } else {
        if (item.selectedFront) specs.push(`Front: ${item.selectedFront.size}`);
        if (item.selectedRear) specs.push(`Rear: ${item.selectedRear.size}`);
        if (item.selectedGeneric) specs.push(`Size: ${item.selectedGeneric.size}`);
    }

    const isFrontOut = item.selectedFront && item.selectedFront.availability === "out_of_stock";
    const isRearOut = item.selectedRear && item.selectedRear.availability === "out_of_stock";
    const isGenOut = item.selectedGeneric && item.selectedGeneric.availability === "out_of_stock";
    const isItemOutOfStock = isFrontOut || isRearOut || isGenOut;

    const selected = item.selectedFront || item.selectedRear || item.selectedGeneric || {};
    const unitDiscount = selected.discount || selected.discountAmount || item.discount || product.discount || 0;
    const unitOriginalPrice = item.price || selected.price || product.price || 0;
    const unitSalePrice = unitDiscount > 0 ? Math.max(0, unitOriginalPrice - unitDiscount) : unitOriginalPrice;

    const quantity = item.quantity || 1;
    const totalOriginalPrice = unitOriginalPrice * quantity;
    const totalSalePrice = unitSalePrice * quantity;
    const totalDiscount = unitDiscount * quantity;
    const discountPercentage = (unitOriginalPrice > 0 && unitDiscount > 0) ? Math.round((unitDiscount / unitOriginalPrice) * 100) : 0;

    return (
        <div className={`flex relative items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${isItemOutOfStock
                ? "bg-red-950/10 border border-red-500/15 hover:border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.05)]"
                : "bg-white/5 border border-white/15 hover:border-white/10 hover:bg-white/15"
            }`}>
            <div className="relative h-15 w-15 md:h-20 md:w-20 shrink-0 overflow-hidden rounded-xl border border-zinc-800 bg-black/40 flex items-center justify-center">
                {itemImage ? (
                    <Image
                        src={itemImage}
                        alt={productName}
                        fill
                        sizes="80px"
                        imageClassName="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <span className="text-[9px] font-bold text-zinc-600 uppercase">No Image</span>
                )}
            </div>

            {!isItemOutOfStock && (
                <span className="absolute top-4 left-4 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-[6px] md:text-[8px] font-black text-red-400 uppercase tracking-wider">
                    Out of Stock
                </span>
            )}

            <div className="flex-1 flex flex-col justify-between min-w-0 h-full">
                <div>
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="text-[8px] md:text-[9px] font-black text-orange-500 uppercase tracking-widest block">
                                    {brandName}
                                </span>
                            
                                <span className="px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 text-[7px] md:text-[8px] font-black tracking-wider border border-orange-500/30">
                                     {isTube ? "TUBE" :"TYRE"}
                                </span>
                            </div>
                            <h4 className="text-[10px] md:text-sm font-bold text-white tracking-tight truncate group-hover:text-orange-400 transition-colors">
                                {productName}
                            </h4>
                        </div>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-500 hover:text-orange-400 p-1 rounded-lg transition-colors cursor-pointer"
                            aria-label="Remove item"
                        >
                            <FaTrash className="text-[10px] md:text-xs" />
                        </button>
                    </div>
                    {specs.length > 0 && (
                        <p className="text-[8px] font-bold text-zinc-400 mt-1 uppercase tracking-wider">
                            {specs.join(' | ')}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between mt-1 md:mt-3 gap-2">
                    <div className="flex items-center bg-white/10 border border-white/10 rounded-lg md:rounded-xl md:p-0.5">
                        <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                        >
                            <FaMinus className="text-[8px]" />
                        </button>
                        <span className="w-6 md:w-8 text-center text-xs font-black text-white select-none">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                        >
                            <FaPlus className="text-[8px]" />
                        </button>
                    </div>

                    <div className="flex flex-col items-end shrink-0">
                        {unitDiscount > 0 ? (
                            <div className="flex flex-col items-end gap-0.5">
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-xs md:text-sm font-black text-white tracking-tight drop-shadow-sm">
                                        {formatPrice(totalSalePrice)}
                                    </span>
                                    <span className="text-[10px] font-semibold text-zinc-400 line-through decoration-red-500/70" aria-label="Original total price">
                                        {formatPrice(totalOriginalPrice)}
                                    </span>
                                </div>
                             
                            </div>
                        ) : (
                            <span className="text-xs md:text-sm font-black text-white">
                                {formatPrice(totalOriginalPrice)}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

CartItem.displayName = "CartItem";

export default CartItem;
