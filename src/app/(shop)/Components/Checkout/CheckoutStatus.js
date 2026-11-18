"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import useCheckoutStore from '@/stores/checkoutStore';
import { useToast } from '@/context/ToastContext';
import PaymentVerifyingState from './PaymentVerifyingState';
import OrderSuccessView from './OrderSuccessView';

export default function CheckoutStatus() {
    const toast = useToast();
    const status = useCheckoutStore((state) => state.status);
    const order = useCheckoutStore((state) => state.order);
    const notice = useCheckoutStore((state) => state.notice);
    const clearNotice = useCheckoutStore((state) => state.clearNotice);
    const closeStatus = useCheckoutStore((state) => state.closeStatus);
    const popupOpen = useCheckoutStore((state) => state.popupOpen);
    const closeCheckout = useCheckoutStore((state) => state.closeCheckout);
    const [closeHost] = useState(() => (typeof document === 'undefined' ? null : document.createElement('div')));

    useEffect(() => {
        if (!notice) return;
        toast[notice.type]?.(notice.message);
        clearNotice();
    }, [notice, toast, clearNotice]);

    useEffect(() => {
        if (!popupOpen || !closeHost) return;
        document.body.appendChild(closeHost);
        const keepOnTop = new MutationObserver(() => {
            if (document.body.lastElementChild !== closeHost) document.body.appendChild(closeHost);
        });
        keepOnTop.observe(document.body, { childList: true });
        return () => {
            keepOnTop.disconnect();
            closeHost.remove();
        };
    }, [popupOpen, closeHost]);

    const closeButton = popupOpen && closeHost && createPortal(
        <button
            type="button"
            onClick={closeCheckout}
            aria-label="Close checkout"
            className="fixed top-3 right-3 z-[2147483647] flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-lg transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        >
            <IoClose aria-hidden="true" className="text-lg" />
            Close
        </button>,
        closeHost
    );

    if (status !== 'confirming' && !(status === 'placed' && order)) return closeButton || null;

    return (
        <div className="fixed inset-0 z-[110] overflow-y-auto overscroll-contain bg-black/90 backdrop-blur-xl px-4 py-6">
            {status === 'confirming'
                ? <PaymentVerifyingState />
                : <OrderSuccessView orderDetails={order} onClose={closeStatus} />}
        </div>
    );
}
