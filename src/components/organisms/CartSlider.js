"use client";

import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import useCartStore from '@/stores/cartStore';
import useCheckoutStore from '@/stores/checkoutStore';
import { useToast } from '@/context/ToastContext';
import Slider from './Slider';
import CartItem from '@/components/molecules/CartItem';
import { FaArrowRightLong } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";

export default function CartSlider() {
    const toast = useToast();
    const router = useRouter();
    const { cart, isSliderOpen, setSliderOpen, removeFromCart, updateQuantity, getCartTotal } = useCartStore();
    const openCheckout = useCheckoutStore((state) => state.openCheckout);

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

    const handleCheckout = useCallback(() => {
        if (hasOutOfStockItems) {
            toast.warning("Please remove out of stock items from your cart before proceeding.");
            return;
        }
        openCheckout(router);
    }, [hasOutOfStockItems, toast, openCheckout, router]);

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
        const subtotal = getCartTotal();

        return (
            <div className="space-y-4 pt-1">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">
                            Subtotal
                        </span>
                        <span className="text-base font-black text-white tracking-tight bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                            {formatPrice(subtotal)}
                        </span>
                    </div>
                </div>

                <div>
                    <button
                        type="button"
                        onClick={handleCheckout}
                        className={`group w-full py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] text-center transition-all duration-300 flex items-center justify-center gap-2 ${hasOutOfStockItems
                                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50 border border-white/5"
                                : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-[0_4px_20px_rgba(249,115,22,0.15)] hover:shadow-[0_4px_30px_rgba(249,115,22,0.35)] cursor-pointer"
                            }`}
                    >
                        Proceed to Checkout
                        <FaArrowRightLong className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>
            </div>
        );
    }, [cart, getCartTotal, formatPrice, handleCheckout, hasOutOfStockItems]);


    console.log('CartSlider render: cart length =', cart)
    return (
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
                            Choose high-performance tyres and tubes for your motorcycle to unlock ultimate grip and track control.
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
    );
}
