"use client";

import React, { useCallback, useId, useState } from 'react';
import { IoTicketOutline, IoChevronDown, IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5';
import { Input } from '@/components/atoms/input';
import couponService from '@/services/couponService';
import useCheckoutStore, { hasOfferItem } from '@/stores/checkoutStore';
import { useToast } from '@/context/ToastContext';

export default function OfferCodeBox({ cart, discount, formatPrice }) {
    const toast = useToast();
    const panelId = useId();
    const coupon = useCheckoutStore((state) => state.coupon);
    const setCoupon = useCheckoutStore((state) => state.setCoupon);
    const [isOpen, setIsOpen] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [isApplying, setIsApplying] = useState(false);
    const offerInCart = hasOfferItem(cart);

    const handleApply = useCallback(async () => {
        if (!code) {
            setError('Please enter a coupon code');
            return;
        }
        if (offerInCart) {
            setError('Not eligible: your cart already has an exclusive offer discount.');
            return;
        }
        setError('');
        setIsApplying(true);
        try {
            const response = await couponService.applyCoupon(code);
            if (response?.success) {
                setCoupon(response.data);
                toast.success('Coupon applied successfully');
            } else {
                setCoupon(null);
                setError(response?.message || 'Invalid coupon');
            }
        } catch (err) {
            setCoupon(null);
            setError(err?.response?.data?.message || 'Failed to apply coupon');
        } finally {
            setIsApplying(false);
        }
    }, [code, offerInCart, setCoupon, toast]);

    const handleRemove = useCallback(() => {
        setCoupon(null);
        setCode('');
        setError('');
    }, [setCoupon]);

    return (
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl p-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
                <IoTicketOutline aria-hidden="true" className="shrink-0 text-lg text-orange-400" />
                <span className="flex-1 text-xs font-semibold text-white">Have an offer code?</span>
                <IoChevronDown
                    aria-hidden="true"
                    className={`shrink-0 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <div
                id={panelId}
                inert={!isOpen}
                className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="px-3.5 pb-3.5">
                        <div className="flex gap-2 items-start">
                            <Input
                                value={code}
                                onChange={(e) => {
                                    setCode(e.target.value.toUpperCase());
                                    if (error) setError('');
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !coupon) {
                                        e.preventDefault();
                                        handleApply();
                                    }
                                }}
                                aria-label="Offer code"
                                placeholder="Enter offer code"
                                variant="glass"
                                disabled={isApplying || !!coupon}
                                error={error}
                                wrapperClassName="flex-1"
                                size="md"
                            />
                            {!coupon ? (
                                <button
                                    type="button"
                                    onClick={handleApply}
                                    disabled={isApplying || !code}
                                    className="shrink-0 cursor-pointer rounded-lg border border-orange-500 bg-orange-500 px-4 py-2.5 md:py-3.5 text-xs font-semibold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isApplying ? 'Applying...' : 'Apply'}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleRemove}
                                    className="shrink-0 cursor-pointer rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5 md:py-3.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-500/20 flex items-center gap-1"
                                >
                                    <IoCloseCircleOutline className="text-base" />
                                    Remove
                                </button>
                            )}
                        </div>
                        {coupon && discount > 0 && (
                            <div className="mt-2 text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                                <IoCheckmarkCircleOutline className="text-base" />
                                Coupon applied! You save {formatPrice(discount)}
                            </div>
                        )}
                        {coupon && discount === 0 && (
                            <div className="mt-2 text-[11px] font-bold text-orange-400">
                                {offerInCart
                                    ? 'Not eligible: your cart already has an exclusive offer discount.'
                                    : 'Coupon applied, but not applicable to your items.'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
