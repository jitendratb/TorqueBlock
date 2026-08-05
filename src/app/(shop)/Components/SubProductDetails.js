"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import WhatsAppButton from "@/components/atoms/WhatsAppButton";
import Image from "@/components/molecules/CustomImage";
import { FaMotorcycle, FaBolt, FaShieldAlt, FaTag, FaBell } from "react-icons/fa";
import { HiFire } from "react-icons/hi";
import { RiSparkling2Fill } from "react-icons/ri";
import useCartStore from "@/stores/cartStore";
import { useToast } from "@/context/ToastContext";
import Carousel from "@/components/organisms/Carousel";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/authStore";
import Login from "@/components/organisms/login";
import { notifyService } from "@/services/notifyService";
import StarRating from "@/components/atoms/StarRating";
import MatchingTyreItem from "./MatchingTyreItem";
import OfferCountdownTimer from "@/components/atoms/OfferCountdownTimer";

const priceFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const formatPrice = (price) => priceFormatter.format(price);

const TyreDataDetails = React.memo(({ tyreData, reviewData, setProductIds }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [pendingCheckout, setPendingCheckout] = useState(false);
    const [pendingNotify, setPendingNotify] = useState(false);
    const [isRinging, setIsRinging] = useState(false);

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

    const gallery = useMemo(() => {
        if (tyreData?.sizeSpecificImages?.length > 0) {
            return tyreData.sizeSpecificImages;
        }
        return parentTyre?.productImages || parentTyre?.gallery || [];
    }, [tyreData, parentTyre]);

    const tubeTypes = useMemo(() => Array.isArray(tyreData?.tubeType) ? tyreData.tubeType : tyreData?.tubeType ? [tyreData.tubeType] : ["TL"], [tyreData?.tubeType]);

    const [activeImage, setActiveImage] = useState(gallery[0]);
    const [selectedOpposite, setSelectedOpposite] = useState(null);
    const [selectedTubeType, setSelectedTubeType] = useState(tubeTypes[0]);

    useEffect(() => {
        if (gallery.length > 0) {
            setActiveImage(gallery[0]);
        }
    }, [gallery]);

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
                setSelectedOpposite(matchingItem);
                return;
            }
        }

        setSelectedOpposite(null);
    }, [tyreData, isOfferActive, hasExclusiveTag]);

    useEffect(() => {
        if (typeof setProductIds === 'function' && tyreData?._id) {
            const ids = [tyreData._id];
            if (selectedOpposite?._id) {
                ids.push(selectedOpposite._id);
            }
            setProductIds(ids);
        }
    }, [tyreData?._id, selectedOpposite?._id, setProductIds]);

    const {
        basePrice,
        oppositePrice,
        totalPrice,
        baseOriginalPrice,
        baseDiscountAmount,
        baseDiscountPercentage
    } = useMemo(() => {
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

    const { isExpressEligible } = useMemo(() => {
        const mainInStock = tyreData?.quantity > 0 || tyreData?.availability === "in_stock";
        const oppInStock = !selectedOpposite || (selectedOpposite.quantity > 0 || selectedOpposite.availability !== "out_of_stock");
        return {
            isExpressEligible: mainInStock && oppInStock
        };
    }, [tyreData?.quantity, tyreData?.availability, selectedOpposite]);

    const handleAddToCart = useCallback(() => {
        if (!parentTyre) {
            toast.error("Product details not fully loaded");
            return;
        }

        const position = tyreData?.position?.toLowerCase();
        let selectedFront = null;
        let selectedRear = null;
        let selectedGeneric = null;

        const updatedTyreData = { ...tyreData, selectedTubeType };

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
    }, [parentTyre, tyreData, selectedTubeType, selectedOpposite, addToCart, toast]);

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

    console.log('tireData', tyreData)

    return (
        <section aria-labelledby="product-details-heading" className="w-full relative  lg:pb-0">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 items-start">
                {/* Left Column - Gallery and Expert Advice */}
                <div className="flex flex-col gap-4 lg:sticky lg:top-24">
                    <div className="flex flex-col-reverse md:grid md:grid-cols-[90px_1fr] gap-4">
                        <div role="tablist" aria-label="Product images" className="flex md:h-[450px] md:flex-col gap-3 overflow-y-auto pr-1 hide-scrollbar">
                            {gallery?.map((item, idx) => {
                                const isActive = activeImage === item;
                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() => setActiveImage(item)}
                                        onMouseEnter={() => setActiveImage(item)}
                                        className={`relative cursor-pointer h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 ${isActive ? "border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]" : "border-zinc-800 hover:border-zinc-600"}`}
                                    >
                                        <Image src={item} alt={`${title} image ${idx + 1}`} fill sizes="40px" imageClassName="object-cover transition-transform duration-300 hover:scale-105" />
                                    </button>
                                );
                            })}
                        </div>

                        <div className="relative flex h-[350px] md:h-[450px] w-full items-center justify-center overflow-hidden">
                            {activeImage && (
                                <Image
                                    src={activeImage}
                                    alt={title}
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    imageClassName="object-contain transition-transform w-full duration-500 hover:scale-105 drop-shadow-2xl"
                                />
                            )}

                            {isOfferActive && hasExclusiveTag && offerExpireDate && (
                                <div className="absolute bottom-4  right-4 border-t border-white/10 flex items-center justify-between gap-2">
                                    <OfferCountdownTimer targetDate={offerExpireDate} label="Exclusive Offer Ends In" />
                                </div>
                            )}
                        </div>
                    </div>
                    <aside className="relative hidden lg:flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/10 border border-white/5 backdrop-blur-2xl shadow-2xl w-full overflow-hidden group hover:border-white/10 transition-all duration-500">
                        <div className="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left w-full">
                            <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300 tracking-tight">Still Have a Question?</h3>
                            <p className="text-xs font-medium text-zinc-400 leading-relaxed">
                                Ask our <span className="text-orange-400 font-bold">Tyre Experts</span> for 1-on-1 fitment advice.
                            </p>
                        </div>
                        <div className="flex items-center shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                            <WhatsAppButton
                                text="Contact Support"
                                value="I need some personalized advice on choosing the perfect tyres for my motorcycle."
                                className="!w-auto w-full px-6 py-2.5 rounded-xl font-bold whitespace-nowrap shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all"
                            />
                        </div>
                    </aside>
                </div>

                {/* Right Column - Product Details */}
                <div className="space-y-4">
                    <header className="space-y-4 mt-2 md:mt-0">
                        <div className="flex items-center gap-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-gradient-to-r from-orange-500/15 via-orange-500/5 to-white/10 backdrop-blur-xl shadow-[0_0_20px_rgba(249,115,22,0.15)] group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] ]" />
                                <RiSparkling2Fill size={14} className="text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] z-10" aria-hidden="true" />
                                <span className="text-[10px] lg:text-xs font-black uppercase tracking-[0.3em] text-orange-400 z-10">
                                    {brandName}
                                </span>
                            </div>

                            <div className="absolute top-0 right-0 md:relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-gradient-to-r from-green-500/15 via-green-500/5 to-white/10 backdrop-blur-xl shadow-[0_0_20px_rgba(34,197,94,0.15)] group overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_2.5s_infinite]" />
                                <FaShieldAlt className="text-xs text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)] z-10" aria-hidden="true" />
                                <span className="text-[10px] lg:text-xs font-bold uppercase tracking-wider text-green-100 z-10">
                                    Trusted by 50,000+ riders
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h1 id="product-details-heading" className="text-2xl md:text-4xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-orange-300 tracking-tighter leading-[1.05] drop-shadow-2xl">
                                {title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-1">
                                <StarRating rating={reviewData?.avgRating?.overall}
                                    count={reviewData?.pagination?.total}
                                    isLoading={reviewData?.data?.length > 0} />
                            </div>
                        </div>
                    </header>

                    <div className="space-y-5">
                        <div className="flex flex-wrap items-center gap-2" aria-label="Product features">
                            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-800/50 px-3 py-1.5 shadow-inner backdrop-blur-md transition-all duration-300">
                                <HiFire className="text-orange-500 text-sm" aria-hidden="true" />
                                <span className="text-[9px] md:text-[11px] font-bold text-zinc-300 uppercase tracking-widest">
                                    High Performance
                                </span>
                            </div>

                            {categoryName && (
                                <div className="flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 shadow-inner backdrop-blur-md transition-all duration-300">
                                    <FaTag className="text-orange-400 text-[10px]" aria-hidden="true" />
                                    <span className="text-[9px] md:text-[11px] font-black text-orange-400 uppercase tracking-widest">
                                        {categoryName}
                                    </span>
                                </div>
                            )}

                            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-800/50 px-3 py-1.5 shadow-inner backdrop-blur-md transition-all duration-300">
                                <FaMotorcycle className="text-orange-500 text-sm" aria-hidden="true" />
                                <span className="text-[9px] md:text-[11px] font-bold text-zinc-300 uppercase tracking-widest">
                                    {tyreData?.position}
                                </span>
                            </div>
                        </div>
                    </div>

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

                            {selectedOpposite && (
                                <div className="pt-2 border-t border-white/10 flex flex-col gap-2.5 relative">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Order Summary</h4>
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

                    {/* {tubeTypes?.length > 0 && (
                        <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md" role="radiogroup" aria-labelledby="tube-type-label">
                            <span id="tube-type-label" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Tube Type</span>
                            <div className="flex flex-wrap gap-2">
                                {tubeTypes.map((type) => (
                                    <button
                                        key={type}
                                        role="radio"
                                        aria-checked={selectedTubeType === type}
                                        onClick={() => setSelectedTubeType(type)}
                                        className={`relative overflow-hidden px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${selectedTubeType === type
                                            ? "bg-orange-500/20 text-orange-400 border border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                                            : "bg-black/40 text-zinc-400 border border-white/10 hover:border-white/20 hover:text-zinc-200"
                                            }`}
                                    >
                                        <span className="relative z-10">{type}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )} */}

                    {tyreData?.availability !== "backorder" && (
                        <div className={`p-4 rounded-2xl border backdrop-blur-md flex items-center gap-3.5 transition-all duration-300 ${isExpressEligible
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                            : "bg-white/10 border-white/5 text-zinc-400"
                            }`}>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isExpressEligible ? "bg-emerald-500/15 text-emerald-400" : "bg-zinc-800 text-zinc-500"}`}>
                                <FaBolt className="text-sm" aria-hidden="true" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-black uppercase tracking-wider">
                                    {isExpressEligible ? "Ships Within 24 Hours" : "Standard Delivery"}
                                </span>
                                <span className="text-[10px] font-medium text-zinc-400">
                                    {isExpressEligible
                                        ? "Order dispatched within 24 hours*"
                                        : "Pre-ordered items are delivered in 5-7 business days"}
                                </span>
                            </div>
                        </div>
                    )}

                    {tyreData?.oppositeSizes && tyreData.oppositeSizes.length > 0 && (
                        <section aria-labelledby="matching-tyres-heading" className="bg-white/10 relative border border-white/10 rounded-xl p-4 space-y-2 md:space-y-4 backdrop-blur-md overflow-hidden">
                            <header className="relative flex items-start md:items-center gap-3.5">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300 mt-1 md:mt-0">
                                    <FaMotorcycle className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" aria-hidden="true" />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between flex-1">
                                    <div className="flex flex-col">
                                        <h3 id="matching-tyres-heading" className="text-xs md:text-sm font-black uppercase tracking-[0.25em] bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
                                            Complete Your Tyre Set
                                        </h3>
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
                            />
                        </section>
                    )}

                    <div className={`grid gap-4 relative z-10 ${tyreData?.availability === "backorder" ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                        <button
                            onClick={handleAddToCart}
                            className={`${tyreData?.availability === "backorder" && 'hidden'} py-4 px-4 rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm bg-white/10 text-white border border-white/10 hover:bg-white/15 backdrop-blur-md shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
                        >
                            Add to Cart
                        </button>

                        {(tyreData?.availability === "backorder" || tyreData?.availability === "out_of_stock") ? (
                            <button
                                onClick={() => handleNotify(false)}
                                className="py-4 px-4 flex gap-2 items-center justify-center rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm bg-orange-500 text-white hover:bg-orange-600 active:scale-95 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                CHECK AVAILABILITY
                                <FaBell className={`text-sm ${isRinging ? "animate-bell-ring" : ""}`} aria-hidden="true" />
                            </button>
                        ) : (
                            <button
                                onClick={() => handleBuyNow(false)}
                                className="py-4 px-4 flex gap-2 justify-center items-center rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm bg-orange-500 text-white hover:bg-orange-600 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                Buy Now {selectedOpposite && <span className="inline-block ml-1"> ({formatPrice(totalPrice)})</span>}
                            </button>
                        )}
                    </div>


                    <aside className="relative  flex lg:hidden flex-col md:flex-row items-center justify-between gap-2 md:gap-4 p-4 rounded-2xl bg-white/10 border border-white/5 backdrop-blur-2xl shadow-2xl w-full overflow-hidden group hover:border-white/10 transition-all duration-500">
                        <div className="relative z-10  flex flex-col items-center sm:items-start text-center sm:text-left w-full">
                            <h3 className="text-sm sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300 tracking-tight">Still Have a Question?</h3>
                            <p className="text-[10px] md:text-xs font-medium text-zinc-400 leading-relaxed">
                                Ask our <span className="text-orange-400 font-bold">Tyre Experts</span> for 1-on-1 fitment advice.
                            </p>
                        </div>
                        <div className="flex items-center shrink-0 w-full md:w-auto  sm:mt-0">
                            <WhatsAppButton
                                text="Contact Support"
                                value="I need some personalized advice on choosing the perfect tyres for my motorcycle."
                                className="md:!w-auto w-full px-6 py-2.5 rounded-xl font-bold whitespace-nowrap shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all"
                            />
                        </div>
                    </aside>
                </div>


            </div>

            <Login isOpen={isLogin} onClose={handleCloseLogin} />
        </section>
    );
});

export default TyreDataDetails;