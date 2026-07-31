"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Image from "@/components/molecules/CustomImage";
import useCartStore from "@/stores/cartStore";
import { useRouter } from "next/navigation";
import { FaTag, FaMotorcycle, FaWrench, FaShieldAlt, FaBell } from "react-icons/fa";
import { MdVerified, MdLocalShipping, MdSupportAgent } from "react-icons/md";
import { RiSparkling2Fill } from "react-icons/ri";
import { HiLightningBolt } from "react-icons/hi";

const INR_FORMATTER = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
});

const formatPrice = (price) => INR_FORMATTER.format(price || 0);

const getImageUrl = (item) => {
    if (!item) return "/newlogo.webp";
    if (typeof item === "string") return item;
    return item.url || "/newlogo.webp";
};

export default function ProductDetails({ tube }) {
    const router = useRouter();
    const { addToCart } = useCartStore();

    const gallery = useMemo(() => {
        if (!tube) return [];
        const imgs = tube.images || tube.productImages || [];
        return Array.isArray(imgs) ? imgs : [];
    }, [tube]);

    const [activeImage, setActiveImage] = useState(() => gallery[0] || null);
    const [isRinging, setIsRinging] = useState(false);

    useEffect(() => {
        if (gallery.length > 0) {
            setActiveImage(gallery[0]);
        } else {
            setActiveImage(null);
        }
    }, [gallery]);

    useEffect(() => {
        let timer;
        if (isRinging) {
            timer = setTimeout(() => setIsRinging(false), 600);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isRinging]);

    const brandName = useMemo(() => {
        if (!tube?.brand) return "TorqueBlock";
        return typeof tube.brand === "object" ? tube.brand.name || "TorqueBlock" : tube.brand;
    }, [tube]);

    const { basePrice, baseOriginalPrice, baseDiscountAmount, baseDiscountPercentage } = useMemo(() => {
        if (!tube) {
            return { basePrice: 0, baseOriginalPrice: 0, baseDiscountAmount: 0, baseDiscountPercentage: 0 };
        }
        const selling = tube.pricing?.sellingPrice ?? tube.startingPrice ?? tube.pricing?.mrp ?? 0;
        const mrp = tube.pricing?.mrp ?? selling;
        const discAmt = mrp > selling ? mrp - selling : (tube.pricing?.discountAmount || 0);
        const discPerc = tube.pricing?.discountPercentage || (mrp > 0 && discAmt > 0 ? Math.round((discAmt / mrp) * 100) : 0);

        return {
            basePrice: selling,
            baseOriginalPrice: mrp,
            baseDiscountAmount: discAmt,
            baseDiscountPercentage: discPerc
        };
    }, [tube]);

    const handleAddToCart = useCallback(() => {
        if (!tube) return;
        const selectedGeneric = {
            _id: tube._id,
            size: tube.size || (tube.wheelSize ? `Rim ${tube.wheelSize}` : 'Standard'),
            price: tube.startingPrice || tube.pricing?.sellingPrice || tube.pricing?.mrp || 0,
            sku: tube.sku || '',
            type: "Tube"
        };
        addToCart(tube, null, null, selectedGeneric, true);
    }, [tube, addToCart]);

    const handleBuyNow = useCallback(() => {
        if (!tube) return;
        const selectedGeneric = {
            _id: tube._id,
            size: tube.size || (tube.wheelSize ? `Rim ${tube.wheelSize}` : 'Standard'),
            price: tube.startingPrice || tube.endingPrice || tube.pricing?.sellingPrice || tube.pricing?.mrp || 0,
            sku: tube.sku || '',
            type: "Tube"
        };
        addToCart(tube, null, null, selectedGeneric, false);
        router.push('/checkout');
    }, [tube, addToCart, router]);

    const handleNotify = useCallback(() => {
        setIsRinging(true);
        handleAddToCart();
    }, [handleAddToCart]);

    const handleThumbnailKeyDown = useCallback((e, item) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setActiveImage(item);
        }
    }, []);

    if (!tube) {
        return (
            <div className="w-full py-12 text-center text-zinc-500 rounded-2xl border border-zinc-800 bg-zinc-950/40">
                <p className="text-sm font-semibold">Product details currently unavailable.</p>
            </div>
        );
    }

    const activeImgSrc = getImageUrl(activeImage);

    return (
        <section className="w-full relative" aria-label="Product Details">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col-reverse md:grid md:grid-cols-[80px_1fr] gap-3 md:gap-4">
                        <div 
                            className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:h-[460px] pb-1 md:pb-0 md:pr-1 hide-scrollbar"
                            role="tablist"
                            aria-label="Product images gallery"
                        >
                            {gallery.map((item, idx) => {
                                const imgSrc = getImageUrl(item);
                                const isActive = activeImgSrc === imgSrc;
                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        aria-label={`View thumbnail image ${idx + 1}`}
                                        onClick={() => setActiveImage(item)}
                                        onMouseEnter={() => setActiveImage(item)}
                                        onKeyDown={(e) => handleThumbnailKeyDown(e, item)}
                                        className={`relative shrink-0 h-16 w-16 md:h-[70px] md:w-[70px] overflow-hidden rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                            isActive
                                                ? "border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)] scale-95"
                                                : "border-zinc-800 hover:border-zinc-600 opacity-60 hover:opacity-100"
                                        }`}
                                    >
                                        <Image
                                            src={imgSrc}
                                            alt={`${tube.name || "Tube"} thumbnail ${idx + 1}`}
                                            fill
                                            sizes="70px"
                                            imageClassName="object-cover"
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        <div 
                            className="relative group h-[320px] md:h-[460px] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-black/20"
                            role="tabpanel"
                            aria-label="Active product image preview"
                        >
                            <div className="absolute inset-0 bg-radial from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            {activeImage && (
                                <Image
                                    src={activeImgSrc}
                                    alt={tube.name || "Tube Image"}
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    imageClassName="object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-gradient-to-r from-orange-500/15 via-orange-500/5 to-white/10 backdrop-blur-xl shadow-[0_0_20px_rgba(249,115,22,0.15)] group relative overflow-hidden">
                            <RiSparkling2Fill size={14} className="text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] z-10" aria-hidden="true" />
                            <span className="text-[10px] lg:text-xs font-black uppercase tracking-wider text-orange-400 z-10">
                                {brandName}
                            </span>
                        </div>

                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-emerald-950/30 backdrop-blur-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] group relative overflow-hidden">
                            <HiLightningBolt className="text-xs text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] z-10" aria-hidden="true" />
                            <span className="text-[10px] lg:text-xs font-black uppercase tracking-wider text-emerald-300 z-10">
                                3000+ Sold this month
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl md:text-4xl lg:text-4.5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-orange-300 tracking-tight leading-[1.1] drop-shadow-2xl">
                            {tube.name}
                        </h1>
                        {tube.shortDescription && (
                            <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                                {tube.shortDescription}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-2.5 flex-wrap my-1">
                        {tube.tubeType && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/60 bg-orange-950/40 backdrop-blur-md shadow-sm">
                                <FaTag size={12} className="text-orange-400" aria-hidden="true" />
                                <span className="text-xs font-extrabold uppercase tracking-wider text-orange-400">
                                    {tube.tubeType}
                                </span>
                            </div>
                        )}

                        {tube.position && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700/60 bg-[#16181e] backdrop-blur-md shadow-sm">
                                <FaMotorcycle size={13} className="text-orange-500" aria-hidden="true" />
                                <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                                    {tube.position}
                                </span>
                            </div>
                        )}

                        {tube.valveType && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700/60 bg-[#16181e] backdrop-blur-md shadow-sm">
                                <FaWrench size={13} className="text-orange-500" aria-hidden="true" />
                                <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                                    {tube.valveType} {tube.valveAngle ? `(${tube.valveAngle})` : ''}
                                </span>
                            </div>
                        )}
                    </div>

                    <article className="relative overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-zinc-900/40 to-transparent p-4 md:p-5 shadow-[0_0_40px_rgba(249,115,22,0.1)] backdrop-blur-xl group transition-all duration-500 hover:border-orange-500/50 flex flex-col gap-4">
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
                                                    <span className="text-xs md:text-sm font-semibold text-zinc-400 line-through decoration-red-500/60 decoration-[1.5px]" aria-label={`Original price ${formatPrice(baseOriginalPrice)}`}>
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

                                <div className={`flex min-w-[90px] items-center gap-1.5 rounded-xl border px-2.5 py-1 backdrop-blur-xl shadow-lg transition-all duration-300 ${
                                    tube.availability === "in_stock" || !tube.availability
                                        ? 'border-green-500/20 bg-green-500/10'
                                        : tube.availability === "backorder"
                                            ? 'border-yellow-500/20 bg-yellow-500/10'
                                            : tube.availability === "preorder"
                                                ? 'border-blue-500/20 bg-blue-500/10'
                                                : 'border-red-500/20 bg-red-500/10'
                                }`}>
                                    <FaShieldAlt className={`text-[9px] ${
                                        tube.availability === "in_stock" || !tube.availability ? 'text-green-400'
                                            : tube.availability === "backorder" ? 'text-yellow-400'
                                                : tube.availability === "preorder" ? 'text-blue-400'
                                                    : 'text-red-400'
                                    }`} aria-hidden="true" />
                                    <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest ${
                                        tube.availability === "in_stock" || !tube.availability ? 'text-green-100'
                                            : tube.availability === "backorder" ? 'text-yellow-100'
                                                : tube.availability === "preorder" ? 'text-blue-100'
                                                    : 'text-red-100'
                                    }`}>
                                        {tube.availability === "in_stock" || !tube.availability ? 'In Stock'
                                            : tube.availability === "backorder" ? 'Available To Order'
                                                : tube.availability === "preorder" ? 'Pre Order'
                                                    : 'Out of Stock'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>

                    <div className="rounded-2xl border border-emerald-500/30 bg-[#0c1c17]/80 backdrop-blur-xl p-3.5 flex items-center gap-3.5 shadow-lg">
                        <div className="h-9 w-9 shrink-0 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-inner">
                            <HiLightningBolt size={18} aria-hidden="true" />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-[11px] md:text-xs font-black uppercase tracking-wider text-emerald-400">
                                Ships Within 24 Hours
                            </h2>
                            <p className="text-[10px] text-zinc-400 font-medium">
                                Order dispatched within 24 hours*
                            </p>
                        </div>
                    </div>

                    <div className={`grid gap-4 relative z-10 w-full ${tube.availability === "backorder" ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className={`${tube.availability === "backorder" ? 'hidden' : ''} py-4 px-4 rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm bg-white/10 text-white border border-white/10 hover:bg-white/15 backdrop-blur-md shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer  flex justify-center items-center focus:outline-none`}
                        >
                            Add to Cart
                        </button>

                        {(tube.availability === "backorder" || tube.availability === "out_of_stock") ? (
                            <button
                                type="button"
                                onClick={handleNotify}
                                className="py-4 px-4 flex gap-2 items-center justify-center rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm bg-orange-500 text-white hover:bg-orange-600 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transform hover:-translate-y-1 transition-all duration-300 cursor-pointer focus:outline-none"
                            >
                                CHECK AVAILABILITY
                                <FaBell className={`text-sm ${isRinging ? "animate-bell-ring" : ""}`} aria-hidden="true" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleBuyNow}
                                className="py-4 px-4 flex gap-2 justify-center items-center rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm bg-orange-500 text-white hover:bg-orange-600 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transform hover:-translate-y-1 transition-all duration-300 cursor-pointer focus:outline-none"
                            >
                                Buy Now
                            </button>
                        )}
                    </div>

                    <div className="relative mt-1">
                        <div className="grid grid-cols-3 gap-2 px-1">
                            <div className="group relative flex justify-center items-center gap-2.5 rounded-xl border border-orange-500/20 bg-gradient-to-b from-orange-500/10 to-white/10 px-2 py-3 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:from-orange-500/15">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/15 ring-1 ring-orange-500/30">
                                    <MdLocalShipping className="text-orange-400 text-lg" aria-hidden="true" />
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] font-bold tracking-wide text-white/90 md:text-[11px]">Free Delivery</p>
                                    <p className="text-[8px] text-zinc-500 md:text-[9px]">Pan India</p>
                                </div>
                            </div>

                            <div className="group relative flex justify-center items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/10 to-white/10 px-2 py-3 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:from-emerald-500/15">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30">
                                    <MdVerified className="text-emerald-400 text-lg" aria-hidden="true" />
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] font-bold tracking-wide text-white/90 md:text-[11px]">100% Genuine</p>
                                    <p className="text-[8px] text-zinc-500 md:text-[9px]">Certified Brand</p>
                                </div>
                            </div>

                            <div className="group relative flex justify-center items-center gap-2.5 rounded-xl border border-blue-500/20 bg-gradient-to-b from-blue-500/10 to-white/10 px-2 py-3 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:from-blue-500/15">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/15 ring-1 ring-blue-500/30">
                                    <MdSupportAgent className="text-blue-400 text-lg" aria-hidden="true" />
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] font-bold tracking-wide text-white/90 md:text-[11px]">Expert Help</p>
                                    <p className="text-[8px] text-zinc-500 md:text-[9px]">24/7 Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
