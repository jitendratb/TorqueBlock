"use client";

import React, { useState, useMemo } from 'react';
import Image from '@/components/molecules/CustomImage';
import OrderStatusBadge from './OrderStatusBadge';
import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoCalendarOutline,
  IoCardOutline,
  IoLocationOutline,
  IoCloseCircleOutline,
  IoTimeOutline,
  IoRocketOutline,
  IoOpenOutline,
  IoPricetagOutline
} from 'react-icons/io5';

// Helper to safely parse image strings, subdocuments {url}, or character-indexed objects
const parseImageUrl = (img) => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object') {
    if (img.url && typeof img.url === 'string') return img.url;

    const numericKeys = Object.keys(img)
      .filter(k => k !== '_id' && !isNaN(k))
      .sort((a, b) => Number(a) - Number(b));
    if (numericKeys.length > 0) {
      return numericKeys.map(k => img[k]).join('');
    }
  }
  return '';
};

export default function OrderCard({ order }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalAmount = useMemo(() => {
    return (
      order.paidAmount ??
      order.totalAmount ??
      order.items?.reduce((sum, item) => sum + (item.totalPrice || ((item.unitPrice || 0) * item.quantity)), 0) ??
      0
    );
  }, [order.paidAmount, order.totalAmount, order.items]);

  const isPaymentFailed = (order.paymentStatus || '').toLowerCase() === 'failed';
  const isOrderCancelled = (order.orderStatus || '').toLowerCase() === 'cancelled';
  const deliveryStatus = order.delivery?.status;
  const isDeliveryProgressed = deliveryStatus && ['shipped', 'out_for_delivery', 'delivered', 'in_transit'].includes(deliveryStatus.toLowerCase().replace(/\s+/g, '_'));
  const effectiveStatus = (isPaymentFailed || isOrderCancelled)
    ? 'cancelled'
    : (isDeliveryProgressed ? deliveryStatus : (order.orderStatus || 'pending'));

  const shippingAddress = order.items?.[0]?.address || order.shippingAddress || order.address;

  const formattedDate = useMemo(() => {
    return order.createdAt
      ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      : 'N/A';
  }, [order.createdAt]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const timelineHistory = useMemo(() => {
    const list = [...(order.statusHistory || [])];
    const hasShippedInHistory = list.some(h => (h.status || '').toLowerCase() === 'shipped');
    if (order.delivery?.status && order.delivery.status.toLowerCase() === 'shipped' && !hasShippedInHistory) {
      list.push({
        _id: 'delivery-shipped',
        status: 'shipped',
        note: `Dispatched via ${order.delivery.courierPartner || 'Delhivery'}${order.delivery.trackingNumber ? ` (Tracking #${order.delivery.trackingNumber})` : ''}.`,
        createdAt: order.delivery.updatedAt || order.updatedAt,
      });
    }
    const hasDeliveredInHistory = list.some(h => (h.status || '').toLowerCase() === 'delivered');
    if (order.delivery?.status && order.delivery.status.toLowerCase() === 'delivered' && !hasDeliveredInHistory) {
      list.push({
        _id: 'delivery-delivered',
        status: 'delivered',
        note: 'Package delivered to recipient successfully.',
        createdAt: order.delivery.updatedAt || order.updatedAt,
      });
    }
    return list;
  }, [order.statusHistory, order.delivery, order.updatedAt]);

  const nonCancellableStates = ['shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned'];
  const isCancellable = order.orderStatus && !nonCancellableStates.includes(effectiveStatus.toLowerCase());

  return (
    <div className="w-full bg-white/10 border border-white/5 hover:border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-xl transition-all duration-300 space-y-5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="space-y-1">
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Order Reference</span>
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm font-black text-white uppercase tracking-tight font-mono">
              #{order._id}
            </span>
            <span className="text-[10px] text-zinc-600 font-bold hidden sm:inline">|</span>
            <span className="text-[10px] text-zinc-400 font-bold hidden sm:flex items-center gap-1">
              <IoCalendarOutline className="text-orange-500 text-xs shrink-0" />
              {formattedDate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <OrderStatusBadge status={effectiveStatus} />

          <div className="text-right">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block">Total Paid</span>
            <span className="text-sm md:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 tracking-tight">
              {formatPrice(totalAmount)}
            </span>
          </div>
        </div>
      </div>


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
          const isTube = Boolean(item.tubeId);
          const tubeObj = typeof item.tubeId === 'object' ? item.tubeId : null;
          const tyreObj = typeof item.productId === 'object' ? item.productId : null;

          const productName = isTube
            ? (tubeObj?.name || item.productName || 'Tube Product')
            : (tyreObj?.hero?.title || item.productName || 'Tyre Product');

          const rawBrand = isTube
            ? (typeof tubeObj?.brand === 'object' ? tubeObj.brand?.name : tubeObj?.brand)
            : (typeof tyreObj?.brand === 'object' ? tyreObj.brand?.name : tyreObj?.brand);
          const brandName = rawBrand ||
            (item.productName ? item.productName.split(' ')[0] : null) ||
            (isTube ? 'TorqueBlock' : 'Performance');

          const rawImg = isTube
            ? (tubeObj?.images?.[0] || item.image || '')
            : (tyreObj?.availableTyres?.productImages?.[0] || tyreObj?.productImages?.[0] || tyreObj?.hero?.heroImage || item.image || '');

          const itemImage = parseImageUrl(rawImg);

          const displaySize = item.size || (isTube ? tubeObj?.size : tyreObj?.size) || 'Standard';

          return (
            <div
              key={item._id || idx}
              className="flex items-center gap-4 p-3.5 rounded-xl bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl flex items-center justify-center bg-black/20">
                {itemImage ? (
                  <Image
                    src={itemImage}
                    alt={productName}
                    fill
                    sizes="64px"
                    imageClassName="object-contain"
                  />
                ) : (
                  <span className="text-[8px] font-bold text-zinc-600 uppercase">No Image</span>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest block">
                      {brandName}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 text-[8px] font-black tracking-wider border border-orange-500/30">
                      {isTube ? "TUBE" : "TYRE"}
                    </span>
                  </div>
                  <h4 className="text-xs md:text-sm font-bold text-white tracking-tight truncate">
                    {productName}
                  </h4>
                  <p className="text-[9px] font-black text-zinc-400 mt-1 uppercase tracking-wide">
                    Size: <span className="text-zinc-200">{displaySize}</span>
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


      <div className="flex flex-wrap items-center justify-between gap-2">
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

        {order.delivery?.trackingUrl && (
          <a
            href={order.delivery.trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-orange-400 hover:text-white bg-orange-500/10 hover:bg-orange-500/25 border border-orange-500/30 px-3.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(249,115,22,0.15)]"
          >
            <IoRocketOutline className="text-xs" />
            Track Package
            <IoOpenOutline className="text-xs ml-0.5" />
          </a>
        )}
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 animate-fadeIn">

          <div className="space-y-2">
            {order.delivery && (
              <div className="p-4 rounded-xl bg-white/10 border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-orange-500 flex items-center gap-1">
                    <IoRocketOutline className="text-xs" />
                    Courier & Delivery
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                  <div>
                    <span className="text-zinc-500 block mb-0.5">Delivery Partner</span>
                    <span className="text-white font-black">{order.delivery.courierPartner || order.delivery.deliveryMethod || 'Delhivery'}</span>
                  </div>
                  {order.delivery.trackingNumber && (
                    <div className="col-span-2 border-t border-white/5 pt-2 flex items-center justify-between">
                      <div>
                        <span className="text-zinc-500 block mb-0.5">Tracking Number (AWB)</span>
                        <span className="text-white font-mono font-black tracking-wider text-xs">
                          {order.delivery.trackingNumber}
                        </span>
                      </div>
                      {order.delivery.trackingUrl && (
                        <a
                          href={order.delivery.trackingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-orange-400 hover:text-orange-300 bg-orange-500/15 hover:bg-orange-500/30 border border-orange-500/30 px-2.5 py-1 rounded-lg transition-all"
                        >
                          Track Live
                          <IoOpenOutline className="text-xs" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {shippingAddress ? (
              <div className="p-4 rounded-xl bg-white/10 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-orange-500 flex items-center gap-1">
                    <IoLocationOutline className="text-xs" />
                    Delivery Address
                  </h4>
                  {shippingAddress.addressType && (
                    <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-zinc-400 border border-white/10">
                      {shippingAddress.addressType}
                    </span>
                  )}
                </div>
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
                {shippingAddress.gst && (
                  <div className="text-[9px] text-zinc-500 font-mono mt-1">
                    GSTIN: <span className="text-zinc-300 font-bold uppercase">{shippingAddress.gst}</span>
                  </div>
                )}
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
                  <span className="text-white font-black capitalize">{order.paymentMethod || 'Razorpay'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">Payment Status</span>
                  <span className={`font-black uppercase ${(order.paymentStatus || '').toLowerCase() === 'paid' ? 'text-emerald-400' : (order.paymentStatus || '').toLowerCase() === 'failed' ? 'text-rose-400' : 'text-amber-400'}`}>
                    {order.paymentStatus || 'Pending'}
                  </span>
                </div>
                {order.couponDiscount > 0 && (
                  <div className="col-span-2 border-t border-white/5 pt-2 flex items-center justify-between text-xs">
                    <span className="text-zinc-400 flex items-center gap-1 font-bold">
                      <IoPricetagOutline className="text-emerald-400" />
                      Coupon Discount
                    </span>
                    <span className="text-emerald-400 font-black">
                      -{formatPrice(order.couponDiscount)}
                    </span>
                  </div>
                )}
                <div className="col-span-2 border-t border-white/5 pt-2">
                  <span className="text-zinc-500 block mb-0.5">Transaction Reference</span>
                  <span className="text-white font-black font-mono tracking-tight normal-case text-xs block truncate">
                    {order.transactionId || 'N/A'}
                  </span>
                </div>
                {order.paymentId && (
                  <div className="col-span-2 border-t border-white/5 pt-2">
                    <span className="text-zinc-500 block mb-0.5">Razorpay Payment ID</span>
                    <span className="text-white font-black font-mono tracking-tight normal-case text-xs block truncate">
                      {order.paymentId}
                    </span>
                  </div>
                )}
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
                {timelineHistory && timelineHistory.length > 0 ? (
                  timelineHistory.map((history, hIdx) => {
                    const isLast = hIdx === timelineHistory.length - 1;
                    let dotColor = 'bg-gray-300';
                    let textClass = 'text-zinc-400';

                    const histStatus = (history.status || '').toLowerCase();
                    if (histStatus === 'cancelled' || histStatus === 'failed') {
                      dotColor = 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]';
                      textClass = 'text-rose-400';
                    } else if (histStatus === 'delivered') {
                      dotColor = 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]';
                      textClass = 'text-emerald-400';
                    } else if (histStatus === 'shipped') {
                      dotColor = 'bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.3)]';
                      textClass = 'text-violet-400 font-bold';
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

