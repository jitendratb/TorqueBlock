"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import ProductGallery from "@/components/organisms/ProductGallery";
import ProductTrust from "@/components/molecules/ProductTrust";
import ShareButton from "@/components/molecules/ShareButton";
import useCartStore from "@/stores/cartStore";
import { useRouter } from "next/navigation";
import { FaTag, FaMotorcycle, FaWrench, FaBell } from "react-icons/fa";
import { RiSparkling2Fill } from "react-icons/ri";
import PriceCard from "../PriceCard";
import StickyBuyBar from "../StickyBuyBar";

const INR_FORMATTER = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
});

const formatPrice = (price) => INR_FORMATTER.format(price || 0);

export default function ProductDetails({ tube }) {
    const router = useRouter();
    const { addToCart } = useCartStore();
    const buyBarRef = useRef(null);

    const gallery = useMemo(() => {
        if (!tube) return [];
        const imgs = tube.images || tube.productImages || [];
        return Array.isArray(imgs) ? imgs : [];
    }, [tube]);

    const [isRinging, setIsRinging] = useState(false);

    useEffect(() => {
        let timer;
        if (isRinging) {
            timer = setTimeout(() => setIsRinging(false), 600);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isRinging]);

    // Show the bottom buy bar while the inline buttons are off screen
    const [showStickyBuyBar, setShowStickyBuyBar] = useState(false);
    useEffect(() => {
        const bar = buyBarRef.current;
        if (!bar) return;
        const observer = new IntersectionObserver(([entry]) => setShowStickyBuyBar(!entry.isIntersecting));
        observer.observe(bar);
        return () => observer.disconnect();
    }, [tube]);

    const brandName = useMemo(() => {
        if (!tube?.brand) return "TorqueBlock";
        return typeof tube.brand === "object" ? tube.brand.name || "TorqueBlock" : tube.brand;
    }, [tube]);

    const categoryName = tube?.categoryId?.name;

    // Tubes without an availability value have always been shown as in stock
    const availability = tube?.availability || "in_stock";

    // Split the name so the size can be highlighted, like the tyre size page title
    const titleParts = useMemo(() => {
        const name = tube?.name || "";
        const sizeIndex = tube?.size ? name.indexOf(tube.size) : -1;
        if (sizeIndex <= 0) return { main: name, size: "" };
        return { main: name.slice(0, sizeIndex).trim(), size: name.slice(sizeIndex).trim() };
    }, [tube]);

    const prices = useMemo(() => {
        if (!tube) {
            return { basePrice: 0, oppositePrice: 0, totalPrice: 0, baseOriginalPrice: 0, baseDiscountAmount: 0, baseDiscountPercentage: 0 };
        }
        const selling = tube.pricing?.sellingPrice ?? tube.startingPrice ?? tube.pricing?.mrp ?? 0;
        const mrp = tube.pricing?.mrp ?? selling;
        const discAmt = mrp > selling ? mrp - selling : (tube.pricing?.discountAmount || 0);
        const discPerc = tube.pricing?.discountPercentage || (mrp > 0 && discAmt > 0 ? Math.round((discAmt / mrp) * 100) : 0);

        return {
            basePrice: selling,
            oppositePrice: 0,
            totalPrice: selling,
            baseOriginalPrice: mrp,
            baseDiscountAmount: discAmt,
            baseDiscountPercentage: discPerc
        };
    }, [tube]);

    const handleAddToCart = useCallback(() => {
        if (!tube) return;
        const tubeProduct = {
            ...tube,
            type: "Tube",
            tubeId: tube._id,
            productName: tube.name || tube.productName || tube.hero?.title || "Motorcycle Tube"
        };
        const selectedGeneric = {
            _id: tube._id,
            tubeId: tube._id,
            size: tube.size || (tube.wheelSize ? `Rim ${tube.wheelSize}` : 'Standard'),
            price: tube.startingPrice || tube.pricing?.sellingPrice || tube.pricing?.mrp || 0,
            sku: tube.sku || '',
            type: "Tube",
            productName: tubeProduct.productName
        };
        addToCart(tubeProduct, null, null, selectedGeneric, true);
    }, [tube, addToCart]);

    const handleBuyNow = useCallback(() => {
        if (!tube) return;
        const tubeProduct = {
            ...tube,
            type: "Tube",
            tubeId: tube._id,
            productName: tube.name || tube.productName || tube.hero?.title || "Motorcycle Tube"
        };
        const selectedGeneric = {
            _id: tube._id,
            tubeId: tube._id,
            size: tube.size || (tube.wheelSize ? `Rim ${tube.wheelSize}` : 'Standard'),
            price: tube.startingPrice || tube.endingPrice || tube.pricing?.sellingPrice || tube.pricing?.mrp || 0,
            sku: tube.sku || '',
            type: "Tube",
            productName: tubeProduct.productName
        };
        addToCart(tubeProduct, null, null, selectedGeneric, false);
        router.push('/checkout');
    }, [tube, addToCart, router]);

    const handleNotify = useCallback(() => {
        setIsRinging(true);
        handleAddToCart();
    }, [handleAddToCart]);

    if (!tube) {
        return (
            <div className="w-full py-12 text-center text-zinc-500 rounded-2xl border border-zinc-800 bg-zinc-950/40">
                <p className="text-sm font-semibold">Product details currently unavailable.</p>
            </div>
        );
    }

    return (
        <section aria-labelledby="product-details-heading" className="w-full relative">
            <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-2 items-start">
                <div className="flex flex-col gap-4 lg:sticky lg:top-24">
                    <ProductGallery images={gallery} alt={tube.name || "Tube"} />
                </div>

                <div className="space-y-4 lg:space-y-3">
                    <header className="flex flex-col gap-0">
                        <div className="absolute top-4 left-2 right-2 z-20 flex items-center justify-between gap-3 md:static">
                            {/* Phones: this row sits over the gallery photo, so give it a dark glass backing */}
                            <div className="flex min-w-0 items-center gap-2.5 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-md md:bg-transparent md:p-0 md:backdrop-blur-none">
                                <span className="flex shrink-0 items-center gap-1.5">
                                    <RiSparkling2Fill size={14} className="text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" aria-hidden="true" />
                                    <span className="text-[10px] lg:text-xs font-black uppercase tracking-[0.3em] text-orange-400">
                                        {brandName}
                                    </span>
                                </span>

                                {categoryName && (
                                    <>
                                        <span className="h-3.5 w-px shrink-0 bg-white/25" aria-hidden="true" />
                                        <span className="truncate text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">
                                            {categoryName}
                                        </span>
                                    </>
                                )}
                            </div>

                            <ShareButton title={tube.name || "this tube"} />
                        </div>

                        <h1 id="product-details-heading" className="space-y-1 tracking-tighter drop-shadow-2xl">
                            <span className="block font-black text-2xl md:text-3xl leading-tight text-white">{titleParts.main}</span>
                            {titleParts.size && <span className="block font-black text-lg md:text-xl lg:text-2xl leading-tight text-orange-400">{titleParts.size}</span>}
                        </h1>

                        {tube.shortDescription && (
                            <p className="mt-2 text-xs text-zinc-400 font-medium leading-relaxed">
                                {tube.shortDescription}
                            </p>
                        )}
                    </header>

                    {(tube.tubeType || tube.position || tube.valveType) && (
                        <div className="flex items-center gap-2.5 flex-wrap" aria-label="Tube specifications">
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
                    )}

                    <PriceCard tyreData={{ ...tube, availability }} selectedOpposite={null} prices={prices} formatPrice={formatPrice} />

                    <div ref={buyBarRef} className={`grid gap-2 md:gap-4 ${availability === "backorder" ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className={`${availability === "backorder" ? 'hidden' : ''} py-4 lg:py-3 px-1 rounded-xl font-black uppercase tracking-widest text-xs sm:text-sm bg-white/10 text-white border border-white/10 hover:bg-white/15 backdrop-blur-md shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
                        >
                            Add to Cart
                        </button>

                        {(availability === "backorder" || availability === "out_of_stock") ? (
                            <button
                                type="button"
                                onClick={handleNotify}
                                className="py-4 lg:py-3 px-4 flex gap-2 items-center justify-center rounded-lg font-black uppercase tracking-widest text-xs sm:text-sm bg-orange-500 text-white hover:bg-orange-600 active:scale-95 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                CHECK AVAILABILITY
                                <FaBell className={`text-sm ${isRinging ? "animate-bell-ring" : ""}`} aria-hidden="true" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleBuyNow}
                                className="py-4 lg:py-3 px-1 flex gap-1 justify-center items-center rounded-lg font-black uppercase tracking-widest text-xs sm:text-sm bg-orange-500 text-white hover:bg-orange-600 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                Buy Now
                            </button>
                        )}
                    </div>

                    <ProductTrust />
                </div>
            </div>

            <StickyBuyBar
                isVisible={showStickyBuyBar}
                image={gallery[0]}
                name={titleParts.main}
                subtitle={titleParts.size}
                availability={availability}
                price={formatPrice(prices.totalPrice)}
                priceNote="(Incl. all taxes)"
                isRinging={isRinging}
                notifyLabel="Check Availability"
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onNotify={handleNotify}
            />
        </section>
    );
}
