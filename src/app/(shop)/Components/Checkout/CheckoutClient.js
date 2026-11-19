"use client";

import React, { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import useCartStore from '@/stores/cartStore';
import useAuthStore from '@/stores/authStore';
import useAddressStore from '@/stores/addressStore';
import useCheckoutStore, { getAddressKey, getCheckoutItems } from '@/stores/checkoutStore';
import AddressSkeleton from './AddressSkeleton';
import PaymentSkeleton from './PaymentSkeleton';
import CartSummarySkeleton from './CartSummarySkeleton';
import HeaderSkeleton from './HeaderSkeleton';
import EmptyCartView from './EmptyCartView';
import { IoLockClosedOutline, IoShieldCheckmarkOutline, IoRibbonOutline, IoAlertCircleOutline } from 'react-icons/io5';
import { CgSpinner } from 'react-icons/cg';

const AddressSection = dynamic(() => import('./AddressSection'), {
    loading: () => <AddressSkeleton />,
    ssr: false
});

const ShippingSection = dynamic(() => import('./ShippingSection'), {
    loading: () => <PaymentSkeleton />,
    ssr: false
});

const PaymentSection = dynamic(() => import('./PaymentSection'), {
    loading: () => <PaymentSkeleton />,
    ssr: false
});

const CartSummary = dynamic(() => import('./CartSummary'), {
    loading: () => <CartSummarySkeleton />,
    ssr: false
});

const OfferCodeSection = dynamic(() => import('./OfferCodeSection'), {
    ssr: false
});

const AddressModal = dynamic(() => import('./AddressModal'), {
    ssr: false
});

const subscribeToNothing = () => () => {};

const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
}).format(Number(price) || 0);

function CheckoutSkeleton() {
    return (
        <>
            <HeaderSkeleton />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-4 items-start">
                <div className="space-y-4">
                    <AddressSkeleton />
                    <PaymentSkeleton />
                </div>
                <div className="space-y-4">
                    <CartSummarySkeleton />
                </div>
            </div>
        </>
    );
}

function CheckoutMessage({ icon, title, text, actionLabel, onAction }) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center py-16">
            <div className="flex flex-col items-center text-center gap-5 max-w-sm">
                <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500">
                    {icon}
                </div>
                <div className="space-y-2">
                    <h1 className="text-sm font-black uppercase tracking-widest text-white">{title}</h1>
                    <p className="text-xs text-zinc-400 leading-relaxed font-medium">{text}</p>
                </div>
                <button
                    type="button"
                    onClick={onAction}
                    className="px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest bg-orange-500 hover:bg-orange-600 text-white transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] cursor-pointer"
                >
                    {actionLabel}
                </button>
            </div>
        </div>
    );
}

export default function CheckoutClient() {
    const router = useRouter();
    const isMounted = useSyncExternalStore(subscribeToNothing, () => true, () => false);
    const [addressModalOpen, setAddressModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [chosenAddressId, setChosenAddressId] = useState(null);

    const { cart, setSliderOpen } = useCartStore();
    const { isAuthenticated } = useAuthStore();
    const { addresses, fetchAddresses } = useAddressStore();
    const {
        cartId,
        summary,
        coupons,
        preparing,
        prepareError,
        updating,
        addressKey,
        addressState,
        shippingId,
        status,
        requestLogin,
        prepareCheckout,
        setShippingAddress,
        setShippingOption,
        applyDiscount,
        removeDiscount,
        pay
    } = useCheckoutStore();

    const itemsKey = useMemo(() => JSON.stringify(getCheckoutItems(cart)), [cart]);
    const selectedAddress = useMemo(() => (
        addresses.find((address) => address._id === chosenAddressId)
        || addresses.find((address) => address.isDefault && address.isActive !== false)
        || addresses[0]
        || null
    ), [addresses, chosenAddressId]);
    const isPaying = status === 'starting' || status === 'open' || status === 'confirming';

    useEffect(() => {
        if (isMounted && !isAuthenticated) requestLogin(router);
    }, [isMounted, isAuthenticated, requestLogin, router]);

    useEffect(() => {
        if (isAuthenticated) fetchAddresses();
    }, [isAuthenticated, fetchAddresses]);

    useEffect(() => {
        if (isAuthenticated && itemsKey !== '[]') prepareCheckout();
    }, [isAuthenticated, itemsKey, prepareCheckout]);

    useEffect(() => {
        if (!cartId || !selectedAddress || getAddressKey(selectedAddress) === addressKey) return;
        setShippingAddress(selectedAddress);
    }, [cartId, selectedAddress, addressKey, setShippingAddress]);

    const handleCloseAddressModal = useCallback(() => {
        setAddressModalOpen(false);
        setEditingAddress(null);
    }, []);

    const handleEditCart = useCallback(() => setSliderOpen(true), [setSliderOpen]);

    const handlePay = useCallback(() => pay(selectedAddress?.phone), [pay, selectedAddress]);

    if (!isMounted) {
        return <CheckoutSkeleton />;
    }

    if (!isAuthenticated) {
        return (
            <CheckoutMessage
                icon={<IoLockClosedOutline className="text-2xl" />}
                title="Log in to checkout"
                text="Log in with your WhatsApp number to choose a delivery address and pay for your order."
                actionLabel="Log in"
                onAction={() => requestLogin(router)}
            />
        );
    }

    if (cart.length === 0) {
        return <EmptyCartView />;
    }

    if (prepareError && !preparing) {
        return (
            <CheckoutMessage
                icon={<IoAlertCircleOutline className="text-2xl" />}
                title="Checkout could not start"
                text={prepareError}
                actionLabel="Try again"
                onAction={prepareCheckout}
            />
        );
    }

    if (!summary) {
        return <CheckoutSkeleton />;
    }

    const shippingMethods = addressState === 'saved' ? summary.available_shipping_methods || [] : [];
    const payHint = !selectedAddress
        ? 'Add a delivery address to continue.'
        : addressState === 'error'
            ? 'Please edit this address or choose another one.'
            : addressState !== 'saved'
                ? 'Saving your delivery address...'
                : shippingMethods.length === 0
                    ? 'Delivery is not available for this pincode yet.'
                    : !shippingId
                        ? 'Select a shipping method to continue.'
                        : null;
    const canPay = !payHint && !updating && !isPaying && Number(summary.total) > 0;

    return (
        <>
            <div className="relative z-10 space-y-4 py-4">
                <div className="p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 shrink-0">
                                <IoLockClosedOutline className="text-xl md:text-2xl" />
                            </div>
                            <div className="flex flex-col items-start gap-1">
                                <h1 className="text-xl md:text-xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                                    SECURE CHECKOUT
                                </h1>
                                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-400">
                                    Complete your order securely
                                </span>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-2 md:gap-3 p-2.5 px-4 rounded-xl bg-white/[0.02] border border-white/5 self-start lg:self-auto">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-orange-500 text-white font-black text-[11px] flex items-center justify-center shadow-[0_0_12px_rgba(249,115,22,0.4)]">
                                    1
                                </div>
                                <span className="text-xs font-bold text-white uppercase tracking-wider">Address</span>
                            </div>

                            <div className="w-5 md:w-8 h-[2px] bg-gradient-to-r from-orange-500 to-zinc-700 rounded-full" />

                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-white/10 text-zinc-400 font-bold text-[11px] flex items-center justify-center">
                                    2
                                </div>
                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Payment</span>
                            </div>

                            <div className="w-5 md:w-8 h-[2px] bg-zinc-800 rounded-full" />

                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-white/10 text-zinc-400 font-bold text-[11px] flex items-center justify-center">
                                    3
                                </div>
                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Order</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-4 items-start">
                <div className="space-y-4">
                    <AddressSection
                        selectedAddressId={selectedAddress?._id || null}
                        onSelectAddress={setChosenAddressId}
                        setAddressModalOpen={setAddressModalOpen}
                        setEditingAddress={setEditingAddress}
                    />

                    <ShippingSection
                        methods={shippingMethods}
                        selectedId={shippingId}
                        hasAddress={Boolean(selectedAddress)}
                        addressState={addressState}
                        loading={updating === 'address' || updating === 'shipping'}
                        disabled={Boolean(updating) || isPaying}
                        onSelect={setShippingOption}
                        formatPrice={formatPrice}
                    />

                    <PaymentSection />
                </div>

                <div className="lg:sticky lg:top-24 space-y-4">
                    <CartSummary summary={summary} formatPrice={formatPrice} onEditCart={handleEditCart} />

                    <OfferCodeSection
                        coupons={coupons}
                        applied={summary.discounts?.[0] || null}
                        busy={updating === 'coupon'}
                        disabled={isPaying}
                        onApply={applyDiscount}
                        onRemove={removeDiscount}
                        formatPrice={formatPrice}
                    />

                    <button
                        type="button"
                        onClick={handlePay}
                        disabled={!canPay}
                        aria-busy={isPaying}
                        className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-[0_4px_20px_rgba(249,115,22,0.15)] hover:shadow-[0_4px_30px_rgba(249,115,22,0.35)] disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                    >
                        {isPaying ? (
                            <>
                                <CgSpinner className="animate-spin text-lg" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <IoLockClosedOutline className="text-sm" />
                                Pay {formatPrice(summary.total)}
                            </>
                        )}
                    </button>

                    {payHint && (
                        <p role="status" className="text-center text-[11px] font-semibold text-zinc-400">
                            {payHint}
                        </p>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex gap-2 items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 text-center transition-colors hover:bg-white/10">
                            <IoShieldCheckmarkOutline className="text-orange-400 text-xl" />
                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Secure Payment</span>
                        </div>
                        <div className="flex gap-2 items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 text-center transition-colors hover:bg-white/10">
                            <IoRibbonOutline className="text-orange-400 text-xl" />
                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">100% Genuine Products</span>
                        </div>
                    </div>
                </div>

                <AddressModal isOpen={addressModalOpen} address={editingAddress} onClose={handleCloseAddressModal} />
            </div>
        </>
    );
}
