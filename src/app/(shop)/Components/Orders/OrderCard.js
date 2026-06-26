"use client";

import React, { useState } from 'react';
import Image from '@/components/molecules/CustomImage';
import OrderStatusBadge from './OrderStatusBadge';
import { IoChevronDownOutline, IoChevronUpOutline, IoCalendarOutline, IoCardOutline, IoLocationOutline, IoReceiptOutline, IoCloseCircleOutline, IoTimeOutline } from 'react-icons/io5';

export default function OrderCard({ order, onCancelClick }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalAmount = order.items?.reduce((sum, item) => sum + (item.totalPrice || 0), 0) || 0;

  const shippingAddress = order.items?.[0]?.address;

  const formattedDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const nonCancellableStates = ['shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned'];
  const isCancellable = order.orderStatus && !nonCancellableStates.includes(order.orderStatus.toLowerCase());


 
  return (
    <div className="w-full bg-white/10 border border-white/5 hover:border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-xl transition-all duration-300 space-y-5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="space-y-1">
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Order Reference</span>
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm font-black text-white uppercase tracking-tight font-mono">
              #{order._id?.substring(order._id.length - 8) || 'N/A'}
            </span>
            <span className="text-[10px] text-zinc-600 font-bold hidden sm:inline">|</span>
            <span className="text-[10px] text-zinc-400 font-bold hidden sm:flex items-center gap-1">
              <IoCalendarOutline className="text-orange-500 text-xs shrink-0" />
              {formattedDate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <OrderStatusBadge status={order.orderStatus} />

          <div className="text-right">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block">Total Paid</span>
            <span className="text-sm md:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 tracking-tight">
              {formatPrice(totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Date visible for mobile */}
      <div className="flex sm:hidden items-center justify-between text-[10px] text-zinc-400 font-bold bg-black/20 p-2.5 rounded-xl border border-white/5">
        <span className="flex items-center gap-1">
          <IoCalendarOutline className="text-orange-500 shrink-0" />
          Placed: {formattedDate}
        </span>
        <span className="flex items-center gap-1 capitalize">
          <IoCardOutline className="text-orange-500 shrink-0" />
          {order.paymentMethod}
        </span>
      </div>

      {/* Items Section */}
      <div className="space-y-4">
        {order.items?.map((item, idx) => {
          const productImages = item.productId?.availableTyres?.productImages || [];
          const itemImage = productImages[0] || '';
          return (
            <div
              key={item._id || idx}
              className="flex items-center gap-4 p-3 rounded-xl bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-zinc-800 bg-black/40 flex items-center justify-center">
                {itemImage ? (
                  <Image
                    src={itemImage}
                    alt={item.productName || 'Tyre Product'}
                    fill
                    sizes="64px"
                    imageClassName="object-contain p-1"
                  />
                ) : (
                  <span className="text-[8px] font-bold text-zinc-600 uppercase">No Image</span>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest block mb-0.5">
                    Premium Quality
                  </span>
                  <h4 className="text-xs md:text-sm font-bold text-white tracking-tight truncate">
                    {item.productId?.hero?.title || 'Tyre Item'}
                  </h4>
                  <p className="text-[9px] font-black text-zinc-400 mt-1 uppercase tracking-wide">
                    Size: <span className="text-zinc-200">{item.size || 'Standard'}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-zinc-500 font-bold">
                    Qty: <span className="text-white font-black">{item.quantity}</span>
                  </span>
                  <span className="text-xs font-black text-white">
                    {formatPrice((item.unitPrice || 0) * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons & Expand Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/5">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all cursor-pointer select-none"
        >
          {isExpanded ? (
            <>
              Hide Details
              <IoChevronUpOutline className="text-xs" />
            </>
          ) : (
            <>
              View Details
              <IoChevronDownOutline className="text-xs" />
            </>
          )}
        </button>

        <div className="flex items-center gap-3">
          {isCancellable && (
            <button
              onClick={() => onCancelClick(order._id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-rose-500/20 hover:border-rose-500 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400 hover:text-rose-300 transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(244,63,94,0.05)] active:scale-[0.98]"
            >
              <IoCloseCircleOutline className="text-xs" />
              Cancel Order Request
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">

          <div className="space-y-4">
            {shippingAddress ? (
              <div className="p-4 rounded-xl bg-white/10 border border-white/5 space-y-2">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-orange-500 flex items-center gap-1">
                  <IoLocationOutline className="text-xs" />
                  Delivery Address
                </h4>
                <div className="text-xs font-bold text-white">{shippingAddress.fullName}</div>
                <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                  {shippingAddress.addressLine1}
                  {shippingAddress.addressLine2 && `, ${shippingAddress.addressLine2}`}
                  {shippingAddress.landmark && ` (Landmark: ${shippingAddress.landmark})`}
                  <br />
                  {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}
                </p>
                <div className="text-[10px] text-zinc-400 font-semibold mt-1">
                  Phone: <span className="text-zinc-200 font-bold">{shippingAddress.phone}</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-white/10 border border-white/5 text-xs text-zinc-500 italic">
                Shipping address details are unavailable.
              </div>
            )}

            <div className="p-4 rounded-xl bg-white/10 border border-white/5 space-y-3">
              <h4 className="text-[9px] font-black uppercase tracking-widest text-orange-500 flex items-center gap-1">
                <IoCardOutline className="text-xs" />
                Payment & Order Stats
              </h4>
              <div className="grid grid-cols-2 gap-3 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                <div>
                  <span className="text-zinc-500 block mb-0.5">Method</span>
                  <span className="text-white font-black">{order.paymentMethod || 'Razorpay'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">Payment Status</span>
                  <span className={`font-black ${order.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {order.paymentStatus || 'Pending'}
                  </span>
                </div>
                <div className="col-span-2 border-t border-white/5 pt-2">
                  <span className="text-zinc-500 block mb-0.5">Transaction Reference</span>
                  <span className="text-white font-black font-mono tracking-tight normal-case text-xs">
                    {order.transactionId || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/10 border border-white/5 space-y-4">
              <h4 className="text-[9px] font-black uppercase tracking-widest text-orange-500 flex items-center gap-1">
                <IoTimeOutline className="text-xs" />
                Order Timeline
              </h4>

              <div className="relative pl-6 space-y-4 before:absolute before:left-[7px] before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-gray-600">
                {order.statusHistory && order.statusHistory.length > 0 ? (
                  order.statusHistory.map((history, hIdx) => {
                    const isLast = hIdx === order.statusHistory.length - 1;
                    let dotColor = 'bg-gray-300';
                    let textClass = 'text-zinc-400';

                    const histStatus = (history.status || '').toLowerCase();
                    if (histStatus === 'cancelled' || histStatus === 'failed') {
                      dotColor = 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]';
                      textClass = 'text-rose-400';
                    } else if (histStatus === 'delivered') {
                      dotColor = 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]';
                      textClass = 'text-emerald-400';
                    } else if (isLast) {
                      dotColor = 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]';
                      textClass = 'text-orange-400 font-bold';
                    }

                    return (
                      <div key={history._id || hIdx} className="relative text-xs">
                        <div className={`absolute -left-[23.5px] top-1 w-3.5 h-3.5 rounded-full border border-gray-300/10 flex items-center justify-center ${dotColor} z-10`} />

                        <div className="space-y-0.5">
                          <div className={`font-black uppercase tracking-wider text-[10px] ${textClass}`}>
                            {history.status}
                          </div>
                          <p className="text-zinc-300 text-[11px] font-medium leading-relaxed">
                            {history.note || 'Status updated.'}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="relative text-xs">
                    <div className="absolute -left-[23.5px] top-1 w-3.5 h-3.5 rounded-full bg-orange-500 border border-gray-30 z-10" />
                    <div className="space-y-0.5">
                      <div className="font-black uppercase tracking-wider text-[10px] text-orange-400">
                        Order Initialized
                      </div>
                      <p className="text-zinc-300 text-[11px] font-medium">
                        Awaiting processing details.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
