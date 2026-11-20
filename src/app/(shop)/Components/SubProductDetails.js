"use client";

import React, { useMemo, useState, useEffect, useCallback, useRef } from "react";
import WhatsAppButton from "@/components/atoms/WhatsAppButton";
import { FaMotorcycle, FaBolt, FaBell } from "react-icons/fa";
import { HiFire } from "react-icons/hi";
import { RiSparkling2Fill } from "react-icons/ri";
import { MdStraighten } from "react-icons/md";
import { TbDimensions, TbCircleDot } from "react-icons/tb";
import { GiTyre } from "react-icons/gi";
import useCartStore from "@/stores/cartStore";
import { useToast } from "@/context/ToastContext";
import Carousel from "@/components/organisms/Carousel";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/authStore";
import Login from "@/components/organisms/login";
import { notifyService } from "@/services/notifyService";
import StarRating from "@/components/atoms/StarRating";
import MatchingTyreItem from "./MatchingTyreItem";
import PriceCard from "./PriceCard";
import OfferCountdownTimer from "@/components/atoms/OfferCountdownTimer";
import { FiMaximize2 } from "react-icons/fi";
import ProductGallery from "@/components/organisms/ProductGallery";
import ProductTrust from "@/components/molecules/ProductTrust";
import ShareButton from "@/components/molecules/ShareButton";
import StickyBuyBar from "./StickyBuyBar";

const priceFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const formatPrice = (price) => priceFormatter.format(price);
const TUBE_TYPE_LABELS = { TT: 'Tube Type (TT)', TL: 'Tubeless (TL)' };

const TyreDataDetails = React.memo(({ tyreData, setProductIds, opposteProductId }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [pendingCheckout, setPendingCheckout] = useState(false);
    const [pendingNotify, setPendingNotify] = useState(false);
    const [isRinging, setIsRinging] = useState(false);
    const buyBarRef = useRef(null);

    const [showStickyBuyBar, setShowStickyBuyBar] = useState(false);
    useEffect(() => {
        const bar = buyBarRef.current;
        if (!bar) return;
        const observer = new IntersectionObserver(([entry]) => setShowStickyBuyBar(!entry.isIntersecting));
        observer.observe(bar);
        return () => observer.disconnect();
    }, []);

    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const { addToCart } = useCartStore();
    const toast = useToast();

    const { parentTyre, title, brandName, categoryName } = useMemo(() => {
        const parent = tyreData?.availableTyres;
        return {
            parentTyre: parent,
            title: tyreData?.hero?.title,
            brandName: parent?.brand?.name || tyreData?.brand?.name || "Torque Block",
            categoryName: parent?.categoryId?.name || tyreData?.categoryId?.name || tyreData?.category || "Premium Tyre"
        };
    }, [tyreData]);

    const titleWords = useMemo(() => {
        const nameWords = (parentTyre?.productName || "").split(/\s+/).filter(Boolean);
        const nameSet = new Set(nameWords.map((w) => w.toLowerCase()));
        const rest = (title || "").split(/\s+/).filter((w) => w && !nameSet.has(w.toLowerCase()));
        return { matched: nameWords.join(" "), unmatched: rest.join(" ") };
    }, [parentTyre?.productName, title]);

    const gallery = useMemo(() => {
        const toUrl = (img) => (typeof img === "string" ? img : img?.imageUrl || img?.url || null);
        const toList = (v) => (Array.isArray(v) ? v : v ? [v] : []);
        const specific = toList(tyreData?.sizeSpecificImages).map(toUrl).filter(Boolean);
        if (specific.length > 0) return specific;
        return toList(parentTyre?.productImages).map(toUrl).filter(Boolean);
    }, [tyreData?.sizeSpecificImages, parentTyre]);

    const tubeTypes = useMemo(() => Array.isArray(tyreData?.tubeType) ? tyreData.tubeType : tyreData?.tubeType ? [tyreData.tubeType] : ["TL"], [tyreData?.tubeType]);

    const [selectedOpposite, setSelectedOpposite] = useState(null);
    const [selectedTubeType, setSelectedTubeType] = useState(tubeTypes[0]);

    useEffect(() => {
        if (tubeTypes.length > 0 && !tubeTypes.includes(selectedTubeType)) {
            setSelectedTubeType(tubeTypes[0]);
        }
    }, [tubeTypes, selectedTubeType]);

    const { isOfferActive, hasExclusiveTag, offerExpireDate } = useMemo(() => {
        const expireDate = tyreData?.offerExpireDate || tyreData?.offer?.offerExpireDate || tyreData?.offer?.expireDate;
        const active = expireDate ? new Date(expireDate).getTime() > Date.now() : false;

        const tags = tyreData?.tags || tyreData?.offer?.tags || [];
        const exclusive = Array.isArray(tags) && tags.some(tag => {
            const normalized = String(tag).toLowerCase().trim();
            return normalized.includes('excusively') || normalized.includes('exclusively') || normalized.includes('offer only for you') || normalized.includes('order for you only');
        });

        return { isOfferActive: active, hasExclusiveTag: exclusive, offerExpireDate: expireDate };
    }, [tyreData?.offerExpireDate, tyreData?.offer, tyreData?.tags]);

    useEffect(() => {
        if (!tyreData) {
            setSelectedOpposite(null);
            return;
        }

        const offerProductId = tyreData?.offerProductId || tyreData?.offer?.offerProductId;

        if (isOfferActive && hasExclusiveTag && offerProductId && tyreData?.oppositeSizes?.length > 0) {
            const matchingItem = tyreData.oppositeSizes.find(item => {
                const itemId = String(item._id || item.id || '');
                const isMatched = Array.isArray(offerProductId)
                    ? offerProductId.some(id => String(id) === itemId)
                    : String(offerProductId) === itemId;

                if (!isMatched) return false;

                const availability = item?.availability;
                const parentAvailability = tyreData?.availability;
                const isOrderable = availability !== "out_of_stock" && (parentAvailability ? availability === parentAvailability : true);
                const isStock = item?.quantity === undefined || item?.quantity > 0;

                return isOrderable && isStock;
            });

            if (matchingItem) {
                setSelectedOpposite({
                    ...matchingItem,
                    isOfferItem: true,
                    offerId: tyreData?.offerId || tyreData?.offer?._id || tyreData?.offer?.offerId
                });
                return;
            }
        }

        if (opposteProductId && tyreData?.oppositeSizes?.length > 0) {
            const matchingItem = tyreData.oppositeSizes.find(item => {
                const itemId = String(item._id || item.id || '');
                let isMatched = false;

                if (typeof opposteProductId === 'string') {
                    isMatched = opposteProductId.split(',').some(id => id.trim() === itemId);
                } else if (Array.isArray(opposteProductId)) {
                    isMatched = opposteProductId.some(id => String(id) === itemId);
                }

                if (!isMatched) return false;

                const availability = item?.availability;
                const parentAvailability = tyreData?.availability;
                const isOrderable = availability !== "out_of_stock" && (parentAvailability ? availability === parentAvailability : true);
                const isStock = item?.quantity === undefined || item?.quantity > 0;

                return isOrderable && isStock;
            });

            if (matchingItem) {
                setSelectedOpposite(matchingItem);
                return;
            }
        }

        setSelectedOpposite(null);
    }, [tyreData, isOfferActive, hasExclusiveTag, opposteProductId]);

    useEffect(() => {
        if (typeof setProductIds === 'function' && tyreData?._id) {
            const ids = [tyreData._id];
            if (selectedOpposite?._id) {
                ids.push(selectedOpposite._id);
            }
            setProductIds(ids);
        }
    }, [tyreData?._id, selectedOpposite?._id, setProductIds]);

    const prices = useMemo(() => {
        const bp = tyreData?.price || 0;
        const bd = tyreData?.discount || 0;
        const baseSalePrice = Math.max(0, bp - bd);
        const basePerc = bp > 0 ? Math.round((bd / bp) * 100) : 0;
        const op = selectedOpposite?.price || 0;
        const od = selectedOpposite?.discount || 0;
        const oppositeSalePrice = op > 0 ? Math.max(0, op - od) : 0;
        const sale = baseSalePrice + oppositeSalePrice;

        return {
            basePrice: baseSalePrice,
            oppositePrice: oppositeSalePrice,
            totalPrice: sale,
            baseOriginalPrice: bp,
            baseDiscountAmount: bd,
            baseDiscountPercentage: basePerc
        };
    }, [tyreData?.price, tyreData?.discount, selectedOpposite?.price, selectedOpposite?.discount]);

    const handleAddToCart = useCallback(() => {
        if (!parentTyre) {
            toast.error("Product details not fully loaded");
            return;
        }

        const position = tyreData?.position?.toLowerCase();
        let selectedFront = null;
        let selectedRear = null;
        let selectedGeneric = null;

        const offerId = tyreData?.offerId || tyreData?.offer?._id || tyreData?.offer?.offerId;
        const updatedTyreData = {
            ...tyreData,
            selectedTubeType,
            isOfferItem: Boolean(isOfferActive && hasExclusiveTag),
            offerId
        };

        if (position?.includes('front')) {
            selectedFront = updatedTyreData;
            if (selectedOpposite) {
                selectedRear = selectedOpposite;
            }
        } else if (position?.includes('rear')) {
            selectedRear = updatedTyreData;
            if (selectedOpposite) {
                selectedFront = selectedOpposite;
            }
        } else {
            selectedGeneric = updatedTyreData;
        }

        addToCart(parentTyre, selectedFront, selectedRear, selectedGeneric);
    }, [parentTyre, tyreData, selectedTubeType, selectedOpposite, isOfferActive, hasExclusiveTag, addToCart, toast]);

    const handleBuyNow = useCallback((bypassAuth = false) => {
        if (!tyreData?.availability) {
            toast.warning("This product is currently out of stock.");
            return;
        }

        if (!isAuthenticated && bypassAuth !== true) {
            setPendingCheckout(true);
            setIsLogin(true);
            return;
        }

        if (!parentTyre) {
            toast.error("Product details not fully loaded");
            return;
        }

        const position = tyreData?.position?.toLowerCase();
        let selectedFront = null;
        let selectedRear = null;
        let selectedGeneric = null;

        if (position?.includes('front')) {
            selectedFront = tyreData;
            if (selectedOpposite) {
                selectedRear = selectedOpposite;
            }
        } else if (position?.includes('rear')) {
            selectedRear = tyreData;
            if (selectedOpposite) {
                selectedFront = selectedOpposite;
            }
        } else {
            selectedGeneric = tyreData;
        }

        addToCart(parentTyre, selectedFront, selectedRear, selectedGeneric, false);
        router.push('/checkout');
    }, [tyreData, isAuthenticated, parentTyre, selectedOpposite, addToCart, router, toast]);

    const handleNotify = useCallback(async (bypassAuth = false) => {
        setIsRinging(true);
        setTimeout(() => setIsRinging(false), 600);

        if (!isAuthenticated && bypassAuth !== true) {
            setPendingNotify(true);
            setIsLogin(true);
            return;
        }

        try {
            const notification = await notifyService.createNotification({
                tyreSizeId: [tyreData?._id, selectedOpposite?._id].filter(Boolean),
            });

            toast.success(notification?.data?.message || notification?.message || "Notification set successfully!");
        } catch (error) {
            console.log(error || "");
            const errorMessage = error?.response?.data?.message || error?.message || "Failed to set notification";
            toast.error(errorMessage);
        }
    }, [isAuthenticated, tyreData?._id, selectedOpposite?._id, toast]);

    useEffect(() => {
        if (isAuthenticated && pendingCheckout) {
            handleBuyNow(true);
            setPendingCheckout(false);
        }
        if (isAuthenticated && pendingNotify) {
            handleNotify(true);
            setPendingNotify(false);
        }
    }, [isAuthenticated, pendingCheckout, pendingNotify, handleBuyNow, handleNotify]);

    const handleCloseLogin = useCallback(() => {
        setIsLogin(false);
        if (!isAuthenticated) {
            setPendingCheckout(false);
            setPendingNotify(false);
        }
    }, [isAuthenticated]);

    const renderCarouselItem = useCallback((item) => {
        const offerProductId = tyreData?.offerProductId || tyreData?.offer?.offerProductId;
        const itemId = String(item._id || item.id || '');
        const isOfferItem = Boolean(
            offerProductId && (
                Array.isArray(offerProductId)
                    ? offerProductId.some(id => String(id) === itemId)
                    : String(offerProductId) === itemId
            )
        );

        return (
            <MatchingTyreItem
                key={item._id || item.id}
                item={item}
                parentTyre={parentTyre}
                isSelected={selectedOpposite?._id === item._id}
                parentAvailability={tyreData?.availability}
                isOfferItem={isOfferItem}
                isOfferActive={isOfferActive && hasExclusiveTag}
                onSelect={setSelectedOpposite}
                formatPrice={formatPrice}
            />
        );
    }, [selectedOpposite, tyreData, parentTyre, isOfferActive, hasExclusiveTag]);

    // Share the page as it's set up now, so the customer opens it with the same matching tyre selected
    const getShareUrl = useCallback(() => {
        const url = new URL(window.location.href);
        url.hash = "";
        if (selectedOpposite?._id) url.searchParams.set("opposteProductId", selectedOpposite._id);
        else url.searchParams.delete("opposteProductId");
        return url.toString();
    }, [selectedOpposite?._id]);

    return (
        <section aria-labelledby="product-details-heading" className="w-full relative  lg:pb-0">
            <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-2 items-start">
                <div className="flex flex-col gap-4 lg:sticky lg:top-24">
                    <ProductGallery images={gallery} alt={title || "Tyre"}>
                        {isOfferActive && hasExclusiveTag && offerExpireDate && (
                            <div className="absolute bottom-4  right-4 border-t border-white/10 flex items-center justify-between gap-2">
                                <OfferCountdownTimer targetDate={offerExpireDate} label="Exclusive Offer Ends In" />
                            </div>
                        )}
                    </ProductGallery>
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

                            <ShareButton title={title || parentTyre?.productName || "this tyre"} getUrl={getShareUrl} />
                        </div>

                        <h1 id="product-details-heading" className="space-y-1  tracking-tighter drop-shadow-2xl">
                            {titleWords.matched && <span className="block font-black text-2xl md:text-3xl leading-tight text-white">{titleWords.matched}</span>}
                            {titleWords.unmatched && <span className="block font-black text-lg md:text-xl lg:text-2xl leading-tight text-orange-400">{titleWords.unmatched}</span>}
                        </h1>

                    </header>

                    <PriceCard tyreData={tyreData} selectedOpposite={selectedOpposite} prices={prices} formatPrice={formatPrice} />

                    {tyreData?.oppositeSizes && tyreData.oppositeSizes.length > 0 && (
                        <section aria-labelledby="matching-tyres-heading" className="bg-white/10 relative border border-white/10 rounded-xl p-4 lg:p-3 space-y-2 md:space-y-4 lg:space-y-2 backdrop-blur-md overflow-hidden">
                            <header className="relative flex items-start md:items-center gap-3.5">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300 mt-1 md:mt-0">
                                    <FaMotorcycle className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" aria-hidden="true" />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between flex-1">
                                    <div className="flex flex-col">
                                        <h2 id="matching-tyres-heading" className="text-xs md:text-sm font-black uppercase tracking-[0.25em] bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
                                            Complete Your Tyre Set
                                        </h2>
                                        <p className="text-zinc-400 text-[10px] md:text-[11px] font-semibold tracking-wide">
                                            Recommended matching <span className="text-zinc-200 font-bold capitalize">{tyreData?.position?.toLowerCase() === 'front' ? 'Rear' : 'Front'}</span> tyre.
                                        </p>
                                    </div>
                                    {isOfferActive && hasExclusiveTag && (
                                        <span className="hidden md:inline-flex text-[9px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-black uppercase tracking-widest whitespace-nowrap shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                                            Exclusive Offer Included
                                        </span>
                                    )}
                                </div>
                            </header>

                            <Carousel
                                items={tyreData.oppositeSizes}
                                itemWidth='w-full md:w-[260px]'
                                gap={12}
                                showArrows={true}
                                showDots={false}
                                arrowSize={10}
                                leftArrowClassName={"-left-2 p-1"}
                                rightArrowClassName={"-right-2 p-1"}
                                className="w-full"
                                renderItem={renderCarouselItem}
                                activeIndex={selectedOpposite ? tyreData.oppositeSizes.findIndex(item => (item._id || item.id) === (selectedOpposite._id || selectedOpposite.id)) : undefined}
                            />
                        </section>
                    )}

                    <div ref={buyBarRef} className={`grid gap-2 md:gap-4 ${tyreData?.availability === "backorder" ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        <button
                            onClick={handleAddToCart}
                            className={`${tyreData?.availability === "backorder" && 'hidden'} py-4 lg:py-3 px-1 rounded-xl font-black uppercase tracking-widest text-xs sm:text-sm bg-white/10 text-white border border-white/10 hover:bg-white/15 backdrop-blur-md shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
                        >
                            Add to Cart
                        </button>

                        {(tyreData?.availability === "backorder" || tyreData?.availability === "out_of_stock") ? (
                            <button
                                onClick={() => handleNotify(false)}
                                className="py-4 lg:py-3 px-4 flex gap-2 items-center justify-center rounded-lg font-black uppercase tracking-widest text-xs sm:text-sm bg-orange-500 text-white hover:bg-orange-600 active:scale-95 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                NOTIFY ME
                                <FaBell className={`text-sm ${isRinging ? "animate-bell-ring" : ""}`} aria-hidden="true" />
                            </button>
                        ) : (
                            <button
                                onClick={() => handleBuyNow(false)}
                                className="py-4 lg:py-3 px-1 flex gap-1 justify-center items-center rounded-lg font-black uppercase tracking-widest text-xs sm:text-sm bg-orange-500 text-white hover:bg-orange-600 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                Buy Now {selectedOpposite && <span className="inline-block"> ({formatPrice(prices.totalPrice)})</span>}
                            </button>
                        )}
                    </div>

                    <ProductTrust />
                </div>
            </div>
            <StickyBuyBar
                isVisible={showStickyBuyBar}
                image={gallery[0]}
                name={titleWords.matched || title}
                subtitle={titleWords.matched ? titleWords.unmatched : ""}
                availability={tyreData?.availability}
                price={formatPrice(prices.totalPrice)}
                priceNote={selectedOpposite ? "Set of 2 (Incl. all taxes)" : "(Incl. all taxes)"}
                isRinging={isRinging}
                onAddToCart={handleAddToCart}
                onBuyNow={() => handleBuyNow(false)}
                onNotify={() => handleNotify(false)}
            />
            <Login isOpen={isLogin} onClose={handleCloseLogin} />
        </section>
    );
});

export default TyreDataDetails;