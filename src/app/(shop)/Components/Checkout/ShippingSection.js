"use client";

import React from 'react';
import { IoCarOutline, IoCheckmarkCircle, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { CgSpinner } from 'react-icons/cg';

export default function ShippingSection({ methods, selectedId, hasAddress, addressState, loading, disabled, onSelect, formatPrice }) {
    const emptyText = !hasAddress
        ? 'Add a delivery address to see shipping options.'
        : addressState === 'error'
            ? 'Fix the delivery address to see shipping options.'
            : addressState !== 'saved'
                ? 'Checking delivery options for your address...'
                : 'Delivery is not available for this pincode yet.';

    return (
        <section className="bg-white/10 border border-white/5 rounded-xl p-4 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-4">
                <h2 className="text-xs md:text-sm font-black md:uppercase md:tracking-widest text-white flex items-center gap-2">
                    <IoCarOutline className="text-orange-500 text-lg" />
                    Shipping Method
                </h2>
                {loading && <CgSpinner aria-hidden="true" className="animate-spin text-orange-400" />}
            </div>

            {methods.length === 0 ? (
                <p className="text-[11px] text-zinc-400 font-medium">{emptyText}</p>
            ) : (
                <div role="radiogroup" aria-label="Shipping method" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {methods.map((method) => {
                        const isSelected = method.id === selectedId;
                        return (
                            <button
                                key={method.id}
                                type="button"
                                role="radio"
                                aria-checked={isSelected}
                                disabled={disabled}
                                onClick={() => !isSelected && onSelect(method.id)}
                                className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer disabled:cursor-not-allowed ${isSelected
                                    ? 'bg-orange-500/10 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.1)]'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                    }`}
                            >
                                <span className="flex items-center gap-2 min-w-0">
                                    {isSelected ? (
                                        <IoCheckmarkCircle className="text-orange-500 text-xl shrink-0" />
                                    ) : (
                                        <IoCheckmarkCircleOutline className="text-zinc-500 text-xl shrink-0" />
                                    )}
                                    <span className="text-xs font-black text-white uppercase tracking-wider truncate">{method.title}</span>
                                </span>
                                {Number(method.price) > 0 ? (
                                    <span className="text-xs font-bold text-zinc-200 shrink-0">{formatPrice(method.price)}</span>
                                ) : (
                                    <span className="text-orange-400 font-black uppercase tracking-wider text-[11px] shrink-0">FREE</span>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
