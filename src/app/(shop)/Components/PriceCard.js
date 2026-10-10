import React, { useEffect, useMemo, useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { deliveryService } from "@/services/deliveryService";

export default function PriceCard({ tyreData, selectedOpposite, prices, formatPrice }) {
    const { basePrice, oppositePrice, baseOriginalPrice, baseDiscountAmount, baseDiscountPercentage } = prices;
    const [delivery, setDelivery] = useState(null);

    useEffect(() => {
        let active = true;
        deliveryService.getDeliveryEstimate().then((estimate) => {
            if (active) setDelivery(estimate);
        });
        return () => { active = false; };
    }, []);

    const isExpressEligible = useMemo(() => {
        const mainInStock = tyreData?.quantity > 0 || tyreData?.availability === "in_stock";
        const oppInStock = !selectedOpposite || (selectedOpposite.quantity > 0 || selectedOpposite.availability !== "out_of_stock");
        return mainInStock && oppInStock;
    }, [tyreData?.quantity, tyreData?.availability, selectedOpposite]);

    const isFastDelivery = isExpressEligible && !!delivery?.isFast;

    return (
        <article className="relative overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent p-4 shadow-[0_0_40px_rgba(249,115,22,0.1)] backdrop-blur-xl group transition-all duration-500 hover:border-orange-500/50 flex flex-col gap-4">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-500/30 transition-colors duration-700" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col relative z-10 gap-3">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] md:text-xs font-black text-orange-500 uppercase tracking-[0.3em] drop-shadow-sm">
                            Price
                        </span>
                        {baseDiscountAmount > 0 ? (
                            <div className="flex flex-col gap-1 mt-1">
                                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                                    <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400 drop-shadow-sm tracking-tight">
                                        {formatPrice(basePrice)}
                                    </span>
                                    <div className="flex items-center gap-2.5 bg-black/20 rounded-full pl-3 pr-1 py-1 border border-white/5 backdrop-blur-md shadow-inner">
                                        <span className="text-xs md:text-sm font-semibold text-zinc-400 line-through decoration-red-500/60 decoration-[1.5px]" aria-label="Original price">
                                            {formatPrice(baseOriginalPrice)}
                                        </span>
                                        <div className="inline-flex min-w-[120px] items-center px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)] relative overflow-hidden">
                                            <span className="relative z-10 drop-shadow-md flex items-center gap-1">
                                                Save {formatPrice(baseDiscountAmount)}
                                                <span className="bg-black/20 px-1.5 py-0.5 rounded font-bold">({baseDiscountPercentage}%)</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase">
                                    (Incl. of all taxes)
                                </span>
                            </div>
                        ) : (
                            <div className="flex gap-2 items-end">
                                <span className="text-4xl md:text-5xl font-black text-white drop-shadow-lg tracking-tight">
                                    {formatPrice(basePrice)}
                                </span>
                                <span className="text-[10px] font-medium text-zinc-400 pb-1.5">
                                    (Incl. of all taxes)
                                </span>
                            </div>
                        )}
                    </div>

                    <div className={`flex min-w-[90px] absolute top-0 right-0 items-center gap-1.5 rounded-xl border px-2 py-1 backdrop-blur-xl shadow-lg transition-all duration-300 ${tyreData?.availability === "in_stock"
                        ? 'border-green-500/20 bg-green-500/10'
                        : tyreData?.availability === "backorder"
                            ? 'border-yellow-500/20 bg-yellow-500/10'
                            : tyreData?.availability === "preorder"
                                ? 'border-blue-500/20 bg-blue-500/10'
                                : 'border-red-500/20 bg-red-500/10'
                        }`}>
                        <FaShieldAlt className={`text-[9px] ${tyreData?.availability === "in_stock" ? 'text-green-400'
                            : tyreData?.availability === "backorder" ? 'text-yellow-400'
                                : tyreData?.availability === "preorder" ? 'text-blue-400'
                                    : 'text-red-400'
                            }`} aria-hidden="true" />
                        <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest ${tyreData?.availability === "in_stock" ? 'text-green-100'
                            : tyreData?.availability === "backorder" ? 'text-yellow-100'
                                : tyreData?.availability === "preorder" ? 'text-blue-100'
                                    : 'text-red-100'
                            }`}>
                            {tyreData?.availability === "in_stock" ? 'In Stock'
                                : tyreData?.availability === "backorder" ? 'Available To Order'
                                    : tyreData?.availability === "preorder" ? 'Pre Order'
                                        : 'Out of Stock'}
                        </p>
                    </div>
                </div>

                {tyreData?.availability !== "backorder" && (
                    <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                        <MdLocalShipping className="shrink-0 text-orange-400 text-base drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]" aria-hidden="true" />
                        <p className="min-w-0 leading-snug md:truncate text-[11px] md:text-xs font-medium text-zinc-400">
                            <span className="font-black uppercase tracking-wider text-orange-400">
                                Free Delivery
                            </span>
                            {" "}
                            {!delivery
                                ? "checking delivery date…"
                                : <>expected {isFastDelivery && "by "}<span className="font-bold text-white">{deliveryService.getDateText(isFastDelivery)}</span></>}
                            {delivery?.city && <> in <span className="font-semibold text-zinc-300">{delivery.city}</span></>}
                        </p>
                    </div>
                )}

                {selectedOpposite && (
                    <div className="pt-2 border-t border-white/10 flex flex-col gap-2.5 relative">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Order Summary</p>
                        <div className="flex flex-col gap-2 rounded-xl bg-white/10 border border-white/5 p-3.5 shadow-inner">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-1">
                                    <span className="text-[10px] font-medium text-zinc-500">{tyreData.size}</span>
                                    <span className="text-xs font-bold text-zinc-200 capitalize">( {tyreData?.position || 'Current Tyre'} )</span>
                                </div>
                                <span className="text-sm font-black text-zinc-200">{formatPrice(basePrice)}</span>
                            </div>
                            <div className="h-px w-full bg-white/5" />
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-1">
                                    <span className="text-[10px] font-medium text-zinc-500">{selectedOpposite.size}</span>
                                    <span className="text-xs font-bold text-emerald-400 capitalize">Matching {selectedOpposite.position}</span>
                                </div>
                                <span className="text-sm font-black text-emerald-400">{formatPrice(oppositePrice)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}
