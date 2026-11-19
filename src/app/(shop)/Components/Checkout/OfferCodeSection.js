"use client";

import React, { useCallback, useState } from 'react';
import { Input } from '@/components/atoms/input';
import { useToast } from '@/context/ToastContext';
import { IoTicketOutline, IoChevronDown, IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5';

export default function OfferCodeSection({ coupons, applied, busy, disabled, onApply, onRemove, formatPrice }) {
    const toast = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const expanded = isOpen || Boolean(applied);

    const handleApply = useCallback(async (value) => {
        const discountCode = String(value || '').trim();
        if (!discountCode) {
            setError('Please enter a coupon code');
            return;
        }

        setError('');
        const result = await onApply(discountCode);
        if (result?.success) {
            setCode('');
            toast.success('Coupon applied successfully');
        } else if (result?.message) {
            setError(result.message);
        }
    }, [onApply, toast]);

    const handleRemove = useCallback(async () => {
        setError('');
        const result = await onRemove();
        if (!result?.success && result?.message) setError(result.message);
    }, [onRemove]);

    return (
        <div className="bg-white/10 border border-white/10 rounded-2xl backdrop-blur-sm">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={expanded}
                aria-controls="offer-code-panel"
                className="flex w-full cursor-pointer items-center gap-3 rounded-2xl p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
                <IoTicketOutline aria-hidden="true" className="shrink-0 text-2xl text-orange-400" />
                <span className="flex-1 text-sm font-semibold text-white">
                    {applied ? 'Offer code applied' : 'Have an offer code?'}
                </span>
                <IoChevronDown
                    aria-hidden="true"
                    className={`shrink-0 text-lg text-zinc-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                />
            </button>

            <div
                id="offer-code-panel"
                inert={!expanded}
                className={`grid transition-[grid-template-rows,margin-top] duration-300 ${expanded ? 'grid-rows-[1fr] -mt-3' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="px-4 pb-4">
                        {applied ? (
                            <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
                                <div className="min-w-0">
                                    <p className="text-sm font-black tracking-wider text-white truncate">{applied.code}</p>
                                    <p className="mt-0.5 flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                                        <IoCheckmarkCircleOutline aria-hidden="true" className="text-base" />
                                        You save {formatPrice(applied.amount)}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRemove}
                                    disabled={busy || disabled}
                                    className="shrink-0 cursor-pointer px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <IoCloseCircleOutline aria-hidden="true" className="text-lg" />
                                    {busy ? 'Removing...' : 'Remove'}
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className="pl-9 text-xs leading-relaxed text-zinc-400">
                                    Enter your code if you received one from a Torque Block campaign or partner.
                                </p>
                                <div className="mt-4 flex gap-2 items-start">
                                    <Input
                                        value={code}
                                        onChange={(e) => {
                                            setCode(e.target.value.toUpperCase());
                                            if (error) setError('');
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleApply(code);
                                            }
                                        }}
                                        aria-label="Offer code"
                                        placeholder="Enter offer code"
                                        variant="glass"
                                        disabled={busy || disabled}
                                        error={error}
                                        wrapperClassName="flex-1"
                                        size="md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleApply(code)}
                                        disabled={busy || disabled || !code}
                                        className="shrink-0 cursor-pointer rounded-lg border border-orange-500 bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {busy ? 'Applying...' : 'Apply'}
                                    </button>
                                </div>

                                {coupons.length > 0 && (
                                    <ul className="mt-4 space-y-2">
                                        {coupons.map((coupon) => {
                                            const eligible = coupon.eligibility === 'true';
                                            return (
                                                <li key={coupon.code} className="flex items-center justify-between gap-3 rounded-lg border border-dashed border-white/15 bg-white/5 px-3 py-2.5">
                                                    <div className="min-w-0">
                                                        <p className="text-xs font-black tracking-wider text-white">
                                                            {coupon.code}
                                                            {eligible && Number(coupon.amount) > 0 && (
                                                                <span className="ml-2 text-emerald-400">Save {formatPrice(coupon.amount)}</span>
                                                            )}
                                                        </p>
                                                        {(coupon.description || coupon.tnc) && (
                                                            <p className="mt-0.5 text-[10px] text-zinc-400 line-clamp-2">
                                                                {[coupon.description, coupon.tnc].filter(Boolean).join(' · ')}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleApply(coupon.code)}
                                                        disabled={!eligible || busy || disabled}
                                                        className="shrink-0 cursor-pointer text-[10px] font-black uppercase tracking-wider text-orange-400 hover:text-orange-300 disabled:cursor-not-allowed disabled:text-zinc-500"
                                                    >
                                                        {eligible ? 'Apply' : 'Not eligible'}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </>
                        )}

                        {applied && error && (
                            <p role="alert" className="mt-2 text-xs font-semibold text-red-400">{error}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
