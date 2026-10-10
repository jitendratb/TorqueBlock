"use client";

import React, { useMemo, useState, useEffect, useCallback, useRef } from "react";
import WhatsAppButton from "@/components/atoms/WhatsAppButton";
import { FaMotorcycle, FaBolt, FaTag, FaBell } from "react-icons/fa";
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

const priceFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const formatPrice = (price) => priceFormatter.format(price);
const TUBE_TYPE_LABELS = { TT: 'Tube Type (TT)', TL: 'Tubeless (TL)' };

const TyreDataDetails = React.memo(({ tyreData, setProductIds, opposteProductId }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [pendingCheckout, setPendingCheckout] = useState(false);
    const [pendingNotify, setPendingNotify] = useState(false);
    const [isRinging, setIsRinging] = useState(false);
    const buyBarRef = useRef(null);
    const [isBuyBarStuck, setIsBuyBarStuck] = useState(true);

    useEffect(() => {
        const bar = buyBarRef.current;
        if (!bar) return;
        let frame = 0;
        const measure = () => {
            frame = 0;
            const prev = bar.previousElementSibling;
            if (!prev) return;
            const naturalTop = prev.getBoundingClientRect().bottom + parseFloat(getComputedStyle(prev).marginBottom) + parseFloat(getComputedStyle(bar).marginTop);
            setIsBuyBarStuck(bar.getBoundingClientRect().top < naturalTop - 1);
        };
        const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
        measure();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        window.visualViewport?.addEventListener("resize", schedule);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            window.visualViewport?.removeEventListener("resize", schedule);
        };
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

                <div className="space-y-4">
                    <header className="flex flex-col gap-0">
                        <div className="absolute top-4 left-2 md:static md:flex md:items-center md:gap-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/40 md:border-orange-500/30 bg-gradient-to-r from-orange-500/15 via-orange-500/5 to-white/10 backdrop-blur-xl shadow-[0_0_20px_rgba(249,115,22,0.15)] group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] ]" />
                                <RiSparkling2Fill size={14} className="text-white md:text-orange-400 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] md:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] z-10" aria-hidden="true" />
                                <span className="text-[10px] lg:text-xs font-black uppercase tracking-[0.3em] text-white md:text-orange-400 z-10">
                                    {brandName}
                                </span>
                            </div>
                        </div>

                        <h1 id="product-details-heading" className="space-y-1  tracking-tighter drop-shadow-2xl">
                            {titleWords.matched && <span className="block font-black text-2xl md:text-3xl lg:text-4xl leading-tight text-white">{titleWords.matched}</span>}
                            {titleWords.unmatched && <span className="block font-black text-lg md:text-xl lg:text-3xl leading-tight text-orange-400">{titleWords.unmatched}</span>}
                        </h1>

                    </header>

                    <div className="">
                        <div className="flex flex-wrap items-center gap-2" aria-label="Product features">
                            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-800/50 px-3 py-1.5 shadow-inner backdrop-blur-md transition-all duration-300">
                                <FaMotorcycle className="text-orange-500 text-sm" aria-hidden="true" />
                                <span className="text-[9px] md:text-[11px] font-bold text-zinc-300 uppercase tracking-widest">
                                    {tyreData?.position}
                                </span>
                            </div>

                            {tyreData?.size && (
                                <div className="flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-gradient-to-r from-orange-500/15 to-orange-600/5 px-3 py-1.5 shadow-inner backdrop-blur-md transition-all duration-300 hover:border-orange-500/60 hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]">
                                    <FiMaximize2 className="text-orange-400 text-sm" aria-hidden="true" />
                                    <span className="text-[9px] md:text-[11px] font-bold text-orange-200 uppercase tracking-widest">
                                        {tyreData.size}
                                    </span>
                                </div>
                            )}
                            {tyreData?.tyretype && (
                                <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-gradient-to-r from-emerald-500/15 to-emerald-600/5 px-3 py-1.5 shadow-inner backdrop-blur-md transition-all duration-300 hover:border-emerald-500/60 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                                    <GiTyre className="text-emerald-400 text-sm" aria-hidden="true" />
                                    <span className="text-[9px] md:text-[11px] font-bold text-emerald-200  tracking-widest">
                                        {tyreData.tyretype}
                                    </span>
                                </div>
                            )}


                            {categoryName && (
                                <div className="flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 shadow-inner backdrop-blur-md transition-all duration-300">
                                    <FaTag className="text-orange-400 text-sm" aria-hidden="true" />
                                    <span className="text-[9px] md:text-[11px] font-black text-orange-400 uppercase tracking-widest">
                                        {categoryName}
                                    </span>
                                </div>
                            )}

                            {tyreData?.tubeType?.length > 0 && (
                                <div className="hidden md:flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-gradient-to-r from-orange-500/15 to-orange-600/5 px-3 py-1.5 shadow-inner backdrop-blur-md transition-all duration-300 hover:border-orange-500/60 hover:shadow-[0_0_12px_rgba(249,115,22,0.2)]">
                                    <TbCircleDot className="text-orange-400 text-sm" aria-hidden="true" />
                                    <span className="text-[9px] md:text-[11px] font-bold text-orange-200 uppercase tracking-widest">
                                        {tubeTypes.map((type) => TUBE_TYPE_LABELS[type] || type).join(" / ")}
                                    </span>
                                </div>
                            )}

                        </div>
                    </div>

                    <PriceCard tyreData={tyreData} selectedOpposite={selectedOpposite} prices={prices} formatPrice={formatPrice} />


                    {tyreData?.oppositeSizes && tyreData.oppositeSizes.length > 0 && (
                        <section aria-labelledby="matching-tyres-heading" className="bg-white/10 relative border border-white/10 rounded-xl p-4 space-y-2 md:space-y-4 backdrop-blur-md overflow-hidden">
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
                                itemWidth='w-[240px] md:w-[260px]'
                                gap={12}
                                showArrows={true}
                                showDots={false}
                                arrowSize={10}
                                leftArrowClassName={"-left-4 p-1"}
                                rightArrowClassName={"-right-4 p-1"}
                                className="w-full"
                                renderItem={renderCarouselItem}
                                activeIndex={selectedOpposite ? tyreData.oppositeSizes.findIndex(item => (item._id || item.id) === (selectedOpposite._id || selectedOpposite.id)) : undefined}
                            />
                        </section>
                    )}

                    <div ref={buyBarRef} data-mobile-buy-bar className={`sticky bottom-0 z-30 ${isBuyBarStuck ? '-mx-4 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-[#0B0F19]/95 backdrop-blur-xl border-t border-white/10' : 'py-0'} md:mx-0 md:px-0 md:py-0 md:relative md:bg-transparent md:backdrop-blur-none md:border-0 grid gap-2 md:gap-4 ${tyreData?.availability === "backorder" ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        <button
                            onClick={handleAddToCart}
                            className={`${tyreData?.availability === "backorder" && 'hidden'} py-4 px-1 rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm bg-white/10 text-white border border-white/10 hover:bg-white/15 backdrop-blur-md shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
                        >
                            Add to Cart
                        </button>

                        {(tyreData?.availability === "backorder" || tyreData?.availability === "out_of_stock") ? (
                            <button
                                onClick={() => handleNotify(false)}
                                className="py-4 px-4 flex gap-2 items-center justify-center rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm bg-orange-500 text-white hover:bg-orange-600 active:scale-95 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                NOTIFY ME
                                <FaBell className={`text-sm ${isRinging ? "animate-bell-ring" : ""}`} aria-hidden="true" />
                            </button>
                        ) : (
                            <button
                                onClick={() => handleBuyNow(false)}
                                className="py-4 px-1 flex gap-1 justify-center items-center rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm bg-orange-500 text-white hover:bg-orange-600 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                Buy Now {selectedOpposite && <span className="inline-block"> ({formatPrice(prices.totalPrice)})</span>}
                            </button>
                        )}
                    </div>

                    <ProductTrust />
                </div>
            </div>
            <Login isOpen={isLogin} onClose={handleCloseLogin} />
        </section>
    );
});

export default TyreDataDetails;