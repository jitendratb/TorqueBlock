"use client";

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import useCartStore from '@/stores/cartStore';
import useAuthStore from '@/stores/authStore';
import useAddressStore from '@/stores/addressStore';
import useOrderStore from '@/stores/orderStore';
import { useToast } from '@/context/ToastContext';
import dynamic from 'next/dynamic';
import AddressSkeleton from './AddressSkeleton';
import PaymentSkeleton from './PaymentSkeleton';
import CartSummarySkeleton from './CartSummarySkeleton';
import HeaderSkeleton from './HeaderSkeleton';
import PaymentVerifyingState from './PaymentVerifyingState';
import OrderSuccessView from './OrderSuccessView';
import EmptyCartView from './EmptyCartView';
import Login from '@/components/organisms/login';
import { IoLockClosedOutline, IoShieldCheckmarkOutline, IoRibbonOutline } from 'react-icons/io5';
import { CgSpinner } from 'react-icons/cg';

const AddressSection = dynamic(() => import('./AddressSection'), {
    loading: () => <AddressSkeleton />,
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

const AddressModal = dynamic(() => import('./AddressModal'), {
    ssr: false
});

export default function CheckoutClient() {
    const toast = useToast();
    const [isMounted, setIsMounted] = useState(false);
    const [addressModalOpen, setAddressModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const { cart, getCartTotal, clearCart, fetchCart } = useCartStore();
    const { isAuthenticated, user } = useAuthStore();
    const { addresses, fetchAddresses, loading: addressLoading } = useAddressStore();
    const { createOrder, verifyPayment, paymentFailed, loading: orderLoading } = useOrderStore();
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('razorpay');
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isOrderPlacing, setIsOrderPlacing] = useState(false);
    const [orderPlacedSuccess, setOrderPlacedSuccess] = useState(false);
    const [placedOrderDetails, setPlacedOrderDetails] = useState(null);
    const [verifyLoading, setVerifyLoading] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleCloseAddressModal = useCallback(() => {
        setAddressModalOpen(false);
        setEditingAddress(null);
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchAddresses();
            fetchCart();
        }
    }, [isAuthenticated, fetchAddresses, fetchCart]);

    useEffect(() => {
        if (addresses.length > 0 && !selectedAddressId) {
            const defaultAddr = addresses.find(a => a.isDefault && a.isActive !== false) || addresses[0];
            setSelectedAddressId(defaultAddr._id);
        }
    }, [addresses, selectedAddressId]);

    const subtotal = useMemo(() => getCartTotal(), [getCartTotal, cart]);
    const deliveryCharge = useMemo(() => (subtotal > 0 ? 0 : 0), [subtotal]);
    const finalTotal = useMemo(() => subtotal + deliveryCharge, [subtotal, deliveryCharge]);

    const handlePlaceOrder = useCallback(async () => {
        if (!selectedAddressId) {
            toast.error("Please select a delivery address.");
            return;
        }

        setIsOrderPlacing(true);
        try {
            const items = cart.map((item) => {
                const sizeObj = item.selectedFront || item.selectedRear || item.selectedGeneric || {};
                const isTube = item.selectedGeneric?.type?.toLowerCase() === 'tube' || item.type?.toLowerCase() === 'tube' || item.product?.type?.toLowerCase() === 'tube';
                const targetId = item.product?._id || sizeObj._id;
                const unitDiscount = sizeObj.discount || sizeObj.discountAmount || item.discount || item.product?.discount || 0;

                return {
                    ...(isTube ? { tubeId: targetId } : { productId: sizeObj._id || targetId }),
                    quantity: item.quantity,
                    deliveryMode: 'standard',
                    installation: false,
                    addressId: selectedAddressId,
                    size: sizeObj.size || 'Standard',
                    shippingCharge: 0,
                    taxAmount: 0,
                    discount: unitDiscount * (item.quantity || 1)
                };
            });

            const orderData = {
                paymentMethod,
                items
            };

            const response = await createOrder(orderData);

            if (response?.success) {
                if (paymentMethod === 'razorpay' && response.razorpayOrder) {
                    if (typeof window === 'undefined' || typeof window.Razorpay === 'undefined') {
                        toast.error("Razorpay payment gateway failed to load. Please refresh the page and try again.");
                        setIsOrderPlacing(false);
                        return;
                    }

                    const razorpayOrderId = response.razorpayOrder.id;
                    const selectedAddr = addresses.find(a => a._id === selectedAddressId);
                    const options = {
                        key: response.razorpayKey,
                        amount: response.razorpayOrder.amount,
                        currency: response.razorpayOrder.currency,
                        name: "TorqueBlock",
                        description: "Purchase of High-Performance Tyres & Tubes",
                        order_id: razorpayOrderId,
                        handler: async (payResponse) => {
                            setVerifyLoading(true);
                            try {
                                const verifyRes = await verifyPayment({
                                    razorpay_payment_id: payResponse.razorpay_payment_id,
                                    razorpay_order_id: payResponse.razorpay_order_id,
                                    razorpay_signature: payResponse.razorpay_signature
                                });

                                if (verifyRes?.success) {
                                    toast.success("Payment successful! Order placed.");
                                    setPlacedOrderDetails(verifyRes.data);
                                    setOrderPlacedSuccess(true);
                                    await clearCart();
                                } else {
                                    toast.error(verifyRes?.message || "Payment verification failed.");
                                }
                            } catch (err) {
                                toast.error(err?.response?.data?.message || "Payment verification failed.");
                            } finally {
                                setVerifyLoading(false);
                                setIsOrderPlacing(false);
                            }
                        },
                        prefill: {
                            name: selectedAddr?.fullName || user?.name || "",
                            email: selectedAddr?.email || user?.email || "",
                            contact: selectedAddr?.phone || user?.phone || ""
                        },
                        theme: {
                            color: "#f97316"
                        },
                        modal: {
                            ondismiss: async () => {
                                setIsOrderPlacing(false);
                                toast.warning("Payment cancelled by user.");
                                try {
                                    await paymentFailed({
                                        razorpay_order_id: razorpayOrderId,
                                        reason: "Payment modal closed by user."
                                    });
                                } catch (e) {
                                    console.error("Error updating cancelled order status:", e);
                                }
                            }
                        }
                    };

                    const rzpay = new window.Razorpay(options);

                    rzpay.on('payment.failed', async function (failedResponse) {
                        console.error("Razorpay Payment Failed:", failedResponse?.error);
                        const desc = failedResponse?.error?.description || "Payment failed on payment gateway.";
                        toast.error(desc);
                        setIsOrderPlacing(false);
                        try {
                            await paymentFailed({
                                razorpay_order_id: razorpayOrderId,
                                reason: desc
                            });
                        } catch (e) {
                            console.error("Failed to report payment failure to backend:", e);
                        }
                    });

                    try {
                        rzpay.open();
                    } catch (sdkErr) {
                        console.error("Razorpay SDK open() failed:", sdkErr);
                        toast.error("Failed to open payment gateway. Please try again.");
                        setIsOrderPlacing(false);
                    }
                    return;
                } else {
                    toast.success("Order placed successfully!");
                    setPlacedOrderDetails(response.data);
                    setOrderPlacedSuccess(true);
                    await clearCart();
                }
            } else {
                toast.error(response?.message || "Failed to place order.");
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to place order. Please try again.");
        } finally {
            setIsOrderPlacing(false);
        }
    }, [cart, selectedAddressId, paymentMethod, createOrder, verifyPayment, paymentFailed, addresses, user, clearCart, toast]);

    if (!isMounted) {
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

    if (verifyLoading) {
        return <PaymentVerifyingState />;
    }

    if (orderPlacedSuccess && placedOrderDetails) {
        return <OrderSuccessView orderDetails={placedOrderDetails} />;
    }

    if (cart.length === 0) {
        return <EmptyCartView />;
    }

    return (
        <>
            <div className="relative z-10 space-y-4 py-4">
                <div className="p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] relative overflow-hidden">

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-2">

                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 shrink-0">
                                    <IoLockClosedOutline className="text-xl md:text-2xl" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-400">
                                            Secure Transaction
                                        </span>
                                    </div>
                                    <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                                        Checkout
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 md:gap-3 p-2.5 px-4 rounded-xl bg-white/[0.02] border border-white/5 self-start lg:self-auto">
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
                <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

                <div className="space-y-4">
                    <AddressSection
                        selectedAddressId={selectedAddressId}
                        onSelectAddress={setSelectedAddressId}
                        setAddressModalOpen={setAddressModalOpen}
                        setEditingAddress={setEditingAddress}
                    />

                    <PaymentSection
                        paymentMethod={paymentMethod}
                        onSelectMethod={setPaymentMethod}
                    />
                </div>

                <div className="lg:sticky lg:top-24 space-y-4">
                    <CartSummary
                        subtotal={subtotal}
                        deliveryCharge={deliveryCharge}
                        finalTotal={finalTotal}
                    />

                    <button
                        onClick={handlePlaceOrder}
                        disabled={isOrderPlacing || orderLoading || !selectedAddressId}
                        aria-busy={isOrderPlacing}
                        className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-[0_4px_20px_rgba(249,115,22,0.15)] hover:shadow-[0_4px_30px_rgba(249,115,22,0.35)] disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                    >
                        {isOrderPlacing ? (
                            <>
                                <CgSpinner className="animate-spin text-lg" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <IoLockClosedOutline className="text-sm" />
                                {paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
                            </>
                        )}
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex gap-2 items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 text-center gap-1.5 transition-colors hover:bg-white/10">
                            <IoShieldCheckmarkOutline className="text-orange-400 text-xl" />
                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Secure Payment</span>
                        </div>
                        <div className="flex gap-2 items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 text-center gap-1.5 transition-colors hover:bg-white/10">
                            <IoRibbonOutline className="text-orange-400 text-xl" />
                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">100% Genuine</span>
                        </div>
                    </div>
                </div>

                <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
                <AddressModal isOpen={addressModalOpen} address={editingAddress} onClose={handleCloseAddressModal} />
            </div>
        </>
    );
}
