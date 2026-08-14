"use client";

import React from 'react';
import Model from '@/components/organisms/CustomModel';
import { CgSpinner } from 'react-icons/cg';

export default function DeleteAddressModal({
    isOpen,
    onClose,
    address,
    onConfirm,
    isDeleting
}) {
    return (
        <Model
            isOpen={isOpen}
            onClose={() => {
                if (!isDeleting) {
                    onClose();
                }
            }}
            title="Delete Address"
            subtitle="Are you sure you want to delete this delivery address?"
            size="sm"
            themeGlow="orange"
            closeOnBackdropClick={!isDeleting}
            showCloseButton={!isDeleting}
        >
            <div className="space-y-4 py-2">
                {address && (
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 space-y-1">
                        <p className="font-black text-white uppercase tracking-wider">{address.fullName}</p>
                        <p className="text-zinc-400 leading-relaxed font-medium">
                            {address.addressLine1}{address.addressLine2 ? `, ${address.addressLine2}` : ''}, {address.city}, {address.state} - {address.pincode || address.pinCode}
                        </p>
                        <p className="text-zinc-300 font-bold tracking-wide pt-1">
                            Mobile: {address.phone}
                        </p>
                    </div>
                )}

                <div className="flex gap-3 pt-2 justify-end">
                    <button
                        type="button"
                        disabled={isDeleting}
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition cursor-pointer disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={isDeleting}
                        onClick={onConfirm}
                        className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)] transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isDeleting ? (
                            <>
                                <CgSpinner className="animate-spin text-sm" />
                                Deleting...
                            </>
                        ) : (
                            'Delete Address'
                        )}
                    </button>
                </div>
            </div>
        </Model>
    );
}
