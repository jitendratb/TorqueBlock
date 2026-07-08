"use client";

import React, { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import useCartStore from '@/stores/cartStore';
import useAuthStore from '@/stores/authStore';
import { useToast } from '@/context/ToastContext';
import Login from '@/components/organisms/login';
import Image from "@/components/molecules/CustomImage";
import Slider from './Slider';
import { FaTrash, FaPlus, FaMinus, FaArrowRightLong } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";

export default function CartSlider() {
    const [isLogin, setIsLogin] = useState(false);
    const { isAuthenticated } = useAuthStore();
    const toast = useToast();
    const { cart, isSliderOpen, setSliderOpen, removeFromCart, updateQuantity, getCartTotal } = useCartStore();

    const hasOutOfStockItems = useMemo(() => {
        return cart.some(item => {
            const frontOut = item.selectedFront && item.selectedFront.availability === "out_of_stock";
            const rearOut = item.selectedRear && item.selectedRear.availability === "out_of_stock";
            const genOut = item.selectedGeneric && item.selectedGeneric.availability === "out_of_stock";
            return frontOut || rearOut || genOut;
        });
    }, [cart]);

    const formatPrice = useCallback((price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    }, []);

    const totalItems = useMemo(() => {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    }, [cart]);

    const handleClose = useCallback(() => {
        setSliderOpen(false);
    }, [setSliderOpen]);

    const renderCartItem = useCallback((item) => {
        const product = item.product;
        const specs = [];
        if (item.selectedFront) specs.push(`Front: ${item.selectedFront.size}`);
        if (item.selectedRear) specs.push(`Rear: ${item.selectedRear.size}`);
        if (item.selectedGeneric) specs.push(`Size: ${item.selectedGeneric.size}`);

        const itemImage = product.productImages?.[0] || '';
        const isFrontOut = item.selectedFront && item.selectedFront.availability === "out_of_stock";
        const isRearOut = item.selectedRear && item.selectedRear.availability === "out_of_stock";
        const isGenOut = item.selectedGeneric && item.selectedGeneric.availability === "out_of_stock";
        const isItemOutOfStock = isFrontOut || isRearOut || isGenOut;

        return (
            <div key={item.id} className={`flex relative items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${isItemOutOfStock
                    ? "bg-red-950/10 border border-red-500/15 hover:border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.05)]"
                    : "bg-zinc-900/40 border border-white/5 hover:border-white/10 hover:bg-zinc-900/60"
                }`}  >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-zinc-800 bg-black/40 flex items-center justify-center">
                    {itemImage ? (
                        <Image
                            src={itemImage}
                            alt={product.productName}
                            fill
                            sizes="80px"
                            imageClassName="object-contain  transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <span className="text-[9px] font-bold text-zinc-600 uppercase">No Image</span>
                    )}


                </div>

                {isItemOutOfStock && (
                    <span className="absolute top-4 left-4 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-[8px] font-black text-red-400 uppercase tracking-wider">
                        Out of Stock
                    </span>
                )}

                <div className="flex-1 flex flex-col justify-between min-w-0 h-full">
                    <div>
                        <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                                <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest block mb-0.5">
                                    {product.brand?.name || 'Performance'}
                                </span>
                                <h4 className="text-sm font-bold text-white tracking-tight truncate group-hover:text-orange-400 transition-colors">
                                    {product.productName}
                                </h4>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-zinc-500 hover:text-red-400 p-1 rounded-lg transition-colors cursor-pointer"
                                aria-label="Remove item"
                            >
                                <FaTrash className="text-xs" />
                            </button>
                        </div>
                        {specs.length > 0 && (
                            <p className="text-[10px] font-bold text-zinc-400 mt-1 uppercase tracking-wider">
                                {specs.join(' | ')}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-3 gap-2">
                        <div className="flex items-center bg-black/50 border border-white/10 rounded-xl p-0.5">
                            <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                aria-label="Decrease quantity"
                            >
                                <FaMinus className="text-[8px]" />
                            </button>
                            <span className="w-8 text-center text-xs font-black text-white select-none">
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

                        <span className="text-sm font-black text-white">
                            {formatPrice(item.price * item.quantity)}
                        </span>
                    </div>
                </div>
            </div>
        );
    }, [formatPrice, updateQuantity, removeFromCart]);

    const headerTitle = useMemo(() => {
        return (
            <div className="flex items-center gap-2">
                <IoCartOutline className="text-orange-500 text-2xl" />
                <h3 className="text-xs font-black uppercase tracking-widest text-white">
                    Shopping Cart
                </h3>
                {totalItems > 0 && (
                    <span className="ml-2 px-2 py-0.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[10px] font-black text-orange-400">
                        {totalItems} items
                    </span>
                )}
            </div>
        );
    }, [totalItems]);

    const footerContent = useMemo(() => {
        if (cart.length === 0) return null;

        return (
            <div className="space-y-4 pt-1">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">
                            Subtotal
                        </span>
                        <span className="text-base font-black text-white tracking-tight bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                            {formatPrice(getCartTotal())}
                        </span>
                    </div>
                </div>

              

                <div>
                    <Link
                        href="/checkout"
                        onClick={(e) => {
                            if (hasOutOfStockItems) {
                                e.preventDefault();
                                toast.warning("Please remove out of stock items from your cart before proceeding.");
                            } else if (!isAuthenticated) {
                                e.preventDefault();
                                setIsLogin(true);
                            } else {
                                handleClose();
                            }
                        }}
                        className={`group w-full py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] text-center transition-all duration-300 flex items-center justify-center gap-2 ${hasOutOfStockItems
                                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50 border border-white/5"
                                : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-[0_4px_20px_rgba(249,115,22,0.15)] hover:shadow-[0_4px_30px_rgba(249,115,22,0.35)] cursor-pointer"
                            }`}
                    >
                       Proceed to Checkout 
                        <FaArrowRightLong className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </div>
        );
    }, [cart, getCartTotal, formatPrice, handleClose, isAuthenticated, hasOutOfStockItems, toast]);

    return (
        <>
            <Slider
                isOpen={isSliderOpen}
                onClose={handleClose}
                title={headerTitle}
                footer={footerContent}
                size="sm"
                placement="right"
            >
                {cart.length > 0 ? (
                    <div className="space-y-4">
                        {cart.map(renderCartItem)}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12 px-6 gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-zinc-900/40 border border-white/5 flex items-center justify-center text-zinc-500 shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]">
                            <IoCartOutline className="text-2xl" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-xs font-black text-white uppercase tracking-widest">
                                Your Cart is Empty
                            </h4>
                            <p className="text-xs text-gray-400 max-w-[240px] leading-relaxed font-medium">
                                Choose high-performance tyres for your motorcycle to unlock ultimate grip and track control.
                            </p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
                        >
                            Continue Browsing
                        </button>
                    </div>
                )}
            </Slider>
            <Login isOpen={isLogin} onClose={() => setIsLogin(false)} />
        </>
    );
}
