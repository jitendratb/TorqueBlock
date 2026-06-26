"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import useCartStore from '@/stores/cartStore';
import useAuthStore from '@/stores/authStore';
import useAddressStore from '@/stores/addressStore';
import useOrderStore from '@/stores/orderStore';
import { useToast } from '@/context/ToastContext';
import AddressSection from './AddressSection';
import CartSummary from './CartSummary';
import PaymentSection from './PaymentSection';
import Login from '@/components/organisms/login';
import { IoCartOutline, IoLockClosedOutline } from 'react-icons/io5';
import { CgSpinner } from 'react-icons/cg';
import AddressModal from './AddressModal';

export default function CheckoutClient() {
    const toast = useToast();
    const [addressModalOpen, setAddressModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const { cart, getCartTotal, clearCart } = useCartStore();
    const { isAuthenticated } = useAuthStore();
    const { addresses, fetchAddresses, loading: addressLoading } = useAddressStore();
    const { createOrder, verifyPayment, loading: orderLoading } = useOrderStore();
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('razorpay');
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isOrderPlacing, setIsOrderPlacing] = useState(false);
    const [orderPlacedSuccess, setOrderPlacedSuccess] = useState(false);
    const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

    const handleCloseAddressModal = useCallback(() => {
        setAddressModalOpen(false);
        setEditingAddress(null);
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchAddresses();
        }
    }, [isAuthenticated, fetchAddresses]);

    useEffect(() => {
        if (addresses.length > 0 && !selectedAddressId) {
            const defaultAddr = addresses.find(a => a.isDefault && a.isActive !== false) || addresses[0];
            setSelectedAddressId(defaultAddr._id);
        }
    }, [addresses, selectedAddressId]);

    const subtotal = getCartTotal();
    const gstAmount = Math.round(subtotal * 0.18);
    const deliveryCharge = subtotal > 0 ? 0 : 0;
    const finalTotal = 1;

    const handlePlaceOrder = useCallback(async () => {
        if (!selectedAddressId) {
            toast.error("Please select a delivery address.");
            return;
        }

        setIsOrderPlacing(true);
        try {
            const items = cart.map((item, index) => {
                const sizeObj = item.selectedFront || item.selectedRear || item.selectedGeneric;
                return {
                    productId: sizeObj._id,
                    quantity: item.quantity,
                    deliveryMode: 'standard',
                    installation: false,
                    addressId: selectedAddressId,
                    size: sizeObj.size,
                    shippingCharge: index === 0 ? 0 : 0,
                    taxAmount: 1,
                    discount: 0
                };
            });

            const orderData = {
                paymentMethod: paymentMethod,
                items: items
            };

            const response = await createOrder(orderData);

            if (response?.success) {
                if (paymentMethod === 'razorpay' && response.razorpayOrder) {
                    const options = {
                        key: response.razorpayKey,
                        amount: response.razorpayOrder.amount,
                        currency: response.razorpayOrder.currency,
                        name: "TorqueBlock",
                        description: "Purchase of High-Performance Tyres",
                        order_id: response.razorpayOrder.id,
                        handler: async (payResponse) => {
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
                                    clearCart();
                                } else {
                                    toast.error(verifyRes?.message || "Payment verification failed.");
                                }
                            } catch (err) {
                                toast.error("Payment verification failed.");
                            }
                        },
                        prefill: {
                            name: addresses.find(a => a._id === selectedAddressId)?.fullName || "",
                            email: addresses.find(a => a._id === selectedAddressId)?.email || "",
                            contact: addresses.find(a => a._id === selectedAddressId)?.phone || ""
                        },
                        theme: {
                            color: "#f97316"
                        },
                        modal: {
                            ondismiss: () => {
                                setIsOrderPlacing(false);
                                toast.warning("Payment cancelled by user.");
                            }
                        }
                    };

                    const rzpay = new window.Razorpay(options);
                    rzpay.open();
                } else {
                    toast.success("Order placed successfully!");
                    setPlacedOrderDetails(response.data);
                    setOrderPlacedSuccess(true);
                    clearCart();
                }
            } else {
                toast.error(response?.message || "Failed to place order.");
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to place order. Please try again.");
        } finally {
            setIsOrderPlacing(false);
        }
    }, [cart, selectedAddressId, paymentMethod, createOrder, verifyPayment, addresses, clearCart, toast]);

    if (orderPlacedSuccess && placedOrderDetails) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-zinc-900/40 border border-white/5 rounded-3xl backdrop-blur-xl max-w-2xl mx-auto space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-bounce shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-black uppercase tracking-wider text-white">Order Confirmed!</h2>
                    <p className="text-zinc-400 text-sm max-w-md mx-auto">
                        Thank you for your purchase! Your order has been placed and is currently being processed.
                    </p>
                </div>

                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 w-full text-left space-y-3">
                    <div className="flex justify-between border-b border-white/5 pb-2.5 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                        <span>Order Details</span>
                        <span className="text-white normal-case font-black">ID: {placedOrderDetails._id || placedOrderDetails.transactionId}</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold text-zinc-400">
                        <span>Payment Method</span>
                        <span className="text-white uppercase font-bold">{placedOrderDetails.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold text-zinc-400">
                        <span>Payment Status</span>
                        <span className="text-emerald-400 uppercase font-bold">{placedOrderDetails.paymentStatus}</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold text-zinc-400">
                        <span>Total Amount Paid</span>
                        <span className="text-orange-400 font-black">
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(finalTotal)}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                    <Link
                        href="/orders"
                        className="px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all text-center"
                    >
                        View My Orders
                    </Link>
                    <Link
                        href="/tyres"
                        className="px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all text-center"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-zinc-900/40 border border-white/5 rounded-3xl backdrop-blur-xl max-w-lg mx-auto gap-6">
                <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center text-zinc-500 shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]">
                    <IoCartOutline className="text-2xl" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xs font-black text-white uppercase tracking-widest">Your Cart is Empty</h3>
                    <p className="text-xs text-gray-400 max-w-[260px] leading-relaxed">
                        Add high-performance tyres to your cart before proceeding to checkout.
                    </p>
                </div>
                <Link
                    href="/tyres"
                    className="px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest bg-orange-500 hover:bg-orange-600 text-white transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                >
                    Explore Tyres
                </Link>
            </div>
        );
    }



    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-4 items-start">
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
                    gstAmount={gstAmount}
                    deliveryCharge={deliveryCharge}
                    finalTotal={finalTotal}
                />

                <button
                    onClick={handlePlaceOrder}
                    disabled={isOrderPlacing || orderLoading || !selectedAddressId}
                    className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-[0_4px_20px_rgba(249,115,22,0.15)] hover:shadow-[0_4px_30px_rgba(249,115,22,0.35)] disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                    {isOrderPlacing ? (
                        <>
                            <CgSpinner className="animate-spin text-lg" />
                            Placing Order...
                        </>
                    ) : (
                        <>
                            <IoLockClosedOutline className="text-sm" />
                            Place Order & Pay
                        </>
                    )}
                </button>

                <div className="flex justify-center items-center gap-1.5 text-[9px] text-zinc-400 font-black tracking-wider uppercase select-none">
                    <IoLockClosedOutline className="text-orange-500 text-xs shrink-0" />
                    <span>Secure 256-Bit SSL Encrypted Connection</span>
                </div>
            </div>

            <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <AddressModal isOpen={addressModalOpen} address={editingAddress} onClose={handleCloseAddressModal} />
            <script src="https://checkout.razorpay.com/v1/checkout.js" async />
        </div>
    );
}
