"use client";

import WhatsAppButton from "@/components/atoms/WhatsAppButton";
import Image from "@/components/molecules/CustomImage"
import { useMemo, useState, useEffect, useRef } from "react";
import { FaMotorcycle, FaRoad, FaBolt, FaFlagCheckered, FaShieldAlt, FaTag, FaCheck, FaBell } from "react-icons/fa";
import { HiFire } from "react-icons/hi";
import useCartStore from "@/stores/cartStore";
import { useToast } from "@/context/ToastContext";
import Carousel from "@/components/organisms/Carousel";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/authStore";
import Login from "@/components/organisms/login";
import { notifyService } from "@/services/notifyService";

export default function TyreDataDetails({ tyreData }) {
    const [isLogin, setIslogin] = useState(false);
    const [pendingCheckout, setPendingCheckout] = useState(false);
    const [pendingNotify, setPendingNotify] = useState(false);
    const [isRinging, setIsRinging] = useState(false);
    const router = useRouter();
    const { isAuthenticated } = useAuthStore()
    const { addToCart } = useCartStore();
    const toast = useToast();

    const parentTyre = tyreData?.availableTyres;
    const title = tyreData?.hero?.title
    const subtitle = tyreData?.hero?.subtitle || tyreData?.description || parentTyre?.hero?.subtitle || parentTyre?.description || "";
    const brandName = parentTyre?.brand?.name || tyreData?.brand?.name || "Torque Block";
    const categoryName = parentTyre?.categoryId?.name || tyreData?.categoryId?.name || tyreData?.category || "Premium Tyre";

    const gallery = useMemo(() => {
        if (tyreData?.sizeSpecificImages?.length > 0) {
            return tyreData.sizeSpecificImages;
        }
        return parentTyre?.productImages || parentTyre?.gallery || [];
    }, [tyreData, parentTyre]);

    const [activeImage, setActiveImage] = useState(gallery[0]);
    const [selectedOpposite, setSelectedOpposite] = useState(null);

    useEffect(() => {
        if (gallery.length > 0) {
            setActiveImage(gallery[0]);
        }
    }, [gallery]);

    useEffect(() => {
        setSelectedOpposite(null);
    }, [tyreData]);

    const basePrice = tyreData?.price || 0;
    const oppositePrice = selectedOpposite ? (selectedOpposite.price || 0) : 0;
    const totalPrice = basePrice + oppositePrice;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
    };

    const isMainInStock = tyreData?.quantity > 0 || tyreData?.availability === "in_stock";
    const isOppositeInStock = !selectedOpposite || (selectedOpposite.quantity > 0 || selectedOpposite.availability !== "out_of_stock");
    const isExpressEligible = isMainInStock && isOppositeInStock;

    const handleAddToCart = () => {
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

        addToCart(parentTyre, selectedFront, selectedRear, selectedGeneric);

    };

    const handleBuyNow = (bypassAuth = false) => {
        if (!tyreData?.availability) {
            toast.warning("This product is currently out of stock.");
            return;
        }

        if (!isAuthenticated && bypassAuth !== true) {
            setPendingCheckout(true);
            setIslogin(true);
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
    };

    useEffect(() => {
        if (isAuthenticated && pendingCheckout) {
            handleBuyNow(true);
            setPendingCheckout(false);
        }
        if (isAuthenticated && pendingNotify) {
            handleNotify(true);
            setPendingNotify(false);
        }
    }, [isAuthenticated, pendingCheckout, pendingNotify]);

    const handleNotify = async (bypassAuth = false) => {
        setIsRinging(true);
        setTimeout(() => setIsRinging(false), 600);

        if (!isAuthenticated && bypassAuth !== true) {
            setPendingNotify(true);
            setIslogin(true);
            return;
        }

        try {
            const notification = await notifyService.createNotification({
                tyreSizeId: tyreData._id,
            });

            toast.success(notification?.data?.message || notification?.message || "Notification set successfully!");
        } catch (error) {
            console.log(error || "");
            const errorMessage = error?.response?.data?.message || error?.message || "Failed to set notification";
            toast.error(errorMessage);
        }
    }

 

    return (
        <section className="w-full relative pb-4 lg:pb-0">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 items-start">

                <div className="flex flex-col gap-4 lg:sticky lg:top-24">
                    <div className="flex flex-col-reverse md:grid md:grid-cols-[90px_1fr] gap-4">
                        <div className="flex md:h-[450px] md:flex-col gap-3 overflow-y-auto pr-1 hide-scrollbar">
                            {gallery?.map((item, idx) => {
                                const isActive = activeImage === item;
                                return (
                                    <button key={idx} type="button" onClick={() => setActiveImage(item)} onMouseEnter={() => setActiveImage(item)} className={`relative cursor-pointer h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 ${isActive ? "border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]" : "border-zinc-800 hover:border-zinc-600"}`}>
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
                        </div>
                    </div>
                    <div className="relative hidden lg:flex flex-col mb-4 sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/10 border border-white/5 backdrop-blur-2xl shadow-2xl w-full overflow-hidden group hover:border-white/10 transition-all duration-500">
                        <div className="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left gap-2 w-full">
                            <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300 tracking-tight">Need Free Expert Advice?</h3>
                            <p className="text-xs sm:text-xs font-medium text-zinc-400 leading-relaxed sm:border-l-2 sm:border-green-500/50 sm:pl-3">
                                Ask our <span className="text-green-400 font-bold">Tyre Experts</span> for 1-on-1 fitment advice.
                            </p>
                        </div>
                        <div className="flex items-center shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                            <WhatsAppButton
                                text="Chat with a Tyre Expert"
                                value="I need some personalized advice on choosing the perfect tyres for my bike."
                                className="!w-auto w-full px-6 py-2.5 rounded-xl font-bold whitespace-nowrap shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-4 mt-2 md:mt-0">
                        <div className="flex items-center gap-4">

                            <p className="text-[10px] lg:text-sm font-medium uppercase tracking-[0.2em] text-orange-500">
                                {brandName} PERFORMANCE SERIES
                            </p>

                            <div className="absolute top-0 right-0 md:relative flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5 backdrop-blur-xl">
                                <FaShieldAlt className="text-xs text-green-400" />

                                <p className="text-xs font-medium text-green-100">
                                    Trusted by 50,000+ riders
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl md:text-4xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-orange-300 tracking-tighter leading-[1.05] drop-shadow-2xl">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-xs md:text-sm font-medium text-zinc-400 leading-relaxed max-w-xl md:border-l-2 md:border-orange-500/50 pl-0 md:pl-4 py-0.5">
                                {subtitle}
                            </p>
                        )}
                    </div>


                    <div className="space-y-5">
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-800/50 px-3 py-1.5 shadow-inner backdrop-blur-md transition-all duration-300">
                                <HiFire className="text-orange-500 text-sm" />
                                <span className="text-[9px] md:text-[11px] font-bold text-zinc-300 uppercase tracking-widest">
                                    High Performance
                                </span>
                            </div>

                            {categoryName && (
                                <div className="flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 shadow-inner backdrop-blur-md transition-all duration-300">
                                    <FaTag className="text-orange-400 text-[10px]" />
                                    <span className="text-[9px] md:text-[11px] font-black text-orange-400 uppercase tracking-widest">
                                        {categoryName}
                                    </span>
                                </div>
                            )}

                            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-800/50 px-3 py-1.5 shadow-inner backdrop-blur-md transition-all duration-300">
                                <FaMotorcycle className="text-orange-500 text-sm" />
                                <span className="text-[9px] md:text-[11px] font-bold text-zinc-300 uppercase tracking-widest">
                                    {tyreData?.position}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 p-4  rounded-3xl border border-white/5 shadow-2xl backdrop-blur-xl flex flex-col gap-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />

                        <div className="flex flex-col relative z-10 gap-3">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] md:text-xs font-black text-zinc-500 uppercase tracking-[0.3em]">
                                        {selectedOpposite ? "Combined Price" : "Price"}
                                    </span>
                                    <div className="flex gap-2 items-end">
                                        <span className="text-4xl md:text-5xl font-black text-white drop-shadow-lg tracking-tight">
                                            {formatPrice(totalPrice)}
                                        </span>
                                        <span className="text-[10px] font-medium text-zinc-400 ">
                                            (Incl. of all taxes)
                                        </span>
                                    </div>
                                </div>

                                <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1 backdrop-blur-xl shadow-lg transition-all duration-300 ${tyreData?.availability === "in_stock"
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
                                        }`} />
                                    <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest ${tyreData?.availability === "in_stock" ? 'text-green-100'
                                        : tyreData?.availability === "backorder" ? 'text-yellow-100'
                                            : tyreData?.availability === "preorder" ? 'text-blue-100'
                                                : 'text-red-100'
                                        }`}>
                                        {tyreData?.availability === "in_stock" ? 'In Stock'
                                            : tyreData?.availability === "backorder" ? 'Available For Order'
                                                : tyreData?.availability === "preorder" ? 'Pre Order'
                                                    : 'Out of Stock'}
                                    </p>
                                </div>
                            </div>

                            {selectedOpposite && (
                                <div className="border-t border-white/5 pt-3 space-y-1.5 text-xs text-zinc-400">
                                    <div className="flex justify-between">
                                        <span>Current Tyre ({tyreData.size})</span>
                                        <span className="font-bold text-zinc-200">{formatPrice(basePrice)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Matching {selectedOpposite.position} ({selectedOpposite.size})</span>
                                        <span className="font-bold text-zinc-200">{formatPrice(oppositePrice)}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={`p-4 rounded-2xl border backdrop-blur-md flex items-center gap-3.5 transition-all duration-300 ${isExpressEligible
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                        : "bg-white/10 border-white/5 text-zinc-400"
                        }`}>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isExpressEligible ? "bg-emerald-500/15 text-emerald-400" : "bg-zinc-800 text-zinc-500"
                            }`}>
                            <FaBolt className={`text-sm ${isExpressEligible ? "animate-pulse" : ""}`} />
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

                    {tyreData?.oppositeSizes && tyreData.oppositeSizes.length > 0 && (
                        <div className="bg-white/10 border border-white/5 rounded-3xl p-4 space-y-2 md:space-y-4 backdrop-blur-md relative overflow-hidden">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs md:text-md  font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                                    <FaMotorcycle className="text-lg text-orange-500 " />
                                    Complete Your Set <span className="hidden"> (Pairing)</span>
                                </h3>
                                <span className="text-[10px] hidden md:block bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                    Highly Recommended
                                </span>
                            </div>

                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Select a matching <span className="text-zinc-200 font-bold capitalize">{tyreData?.position?.toLowerCase() === 'front' ? 'Rear' : 'Front'}</span> tyre to purchase the complete front + rear set together.
                            </p>

                            <Carousel
                                items={tyreData.oppositeSizes}
                                itemWidth='w-[240px] md:w-[260px]'
                                gap={12}
                                showArrows={true}
                                showDots={false}
                                className="w-full pb-3 pt-1 px-1"
                                renderItem={(item) => {
                                    const isSelected = selectedOpposite?._id === item._id;
                                    const availability = item.availability;
                                    const isOrderable = availability !== "out_of_stock" && availability === tyreData?.availability;

                                    const availBadgeClass = availability === "in_stock"
                                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                                        : availability === "backorder"
                                            ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                                            : availability === "preorder"
                                                ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                                                : "bg-red-500/10 border-red-500/20 text-red-400";

                                    const availLabel = availability === "in_stock" ? "In Stock"
                                        : availability === "backorder" ? "Avail. For Order"
                                            : availability === "preorder" ? "Pre Order"
                                                : "Out of Stock";

                                    return (
                                        <button
                                            key={item._id}
                                            onClick={() => isOrderable && setSelectedOpposite(isSelected ? null : item)}
                                            disabled={!isOrderable}
                                            className={`flex flex-col p-4 w-full rounded-2xl border text-left transition-all duration-300 relative group ${!isOrderable
                                                ? "bg-zinc-900/30 border-white/5 opacity-50 cursor-not-allowed"
                                                : isSelected
                                                    ? "bg-orange-500/10 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.15)] cursor-pointer"
                                                    : "bg-black/20 border-white/5 hover:border-white/15 hover:bg-white/5 cursor-pointer"
                                                }`}
                                        >
                                            <div className="flex justify-between items-center w-full mb-3">
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${isSelected ? "border-orange-500 bg-orange-500" : "border-zinc-700 bg-zinc-950/50"
                                                    }`}>
                                                    {isSelected && (
                                                        <FaCheck className="text-[8px] text-white" />
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border transition-all ${isSelected
                                                        ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
                                                        : "bg-white/20 border-white/80 text-white/80 group-hover:text-white"
                                                        }`}>
                                                        {item.position}
                                                    </span>

                                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border transition-all ${availBadgeClass}`}>
                                                        {availLabel}
                                                    </span>
                                                </div>
                                            </div>

                                            <h4 className={`text-base font-black transition-colors tracking-tight mb-1 ${!isOrderable ? "text-zinc-500" : "text-white group-hover:text-orange-400"}`}>
                                                {item.size}
                                            </h4>

                                            <div className="flex justify-between items-baseline w-full mt-2 pt-2 border-t border-white/5">
                                                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
                                                    Price
                                                </span>
                                                <span className={`text-sm font-black ${!isOrderable ? "text-zinc-500" : "text-orange-300"}`}>
                                                    {formatPrice(item.price)}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                }}
                            />
                        </div>
                    )}

                    <div className={`grid gap-4  relative z-10 ${tyreData?.availability === "backorder" ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        <button
                            onClick={handleAddToCart}
                            className={`${tyreData?.availability === "backorder" && 'hidden'} py-4 px-4 rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm bg-white/10 text-white border border-white/10 hover:bg-white/10 backdrop-blur-md shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer `}
                        >
                            Add to Cart
                        </button>
                        {tyreData?.availability === "backorder" ? (
                        <button
                            onClick={handleNotify}
                            className="py-4 px-4 flex gap-2 items-center justify-center rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm bg-orange-500 text-white hover:bg-orange-600 active:scale-95 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        >
                            Notify  
                            <FaBell className={`text-sm ${isRinging ? "animate-bell-ring" : ""}`} />
                        </button>
                        ) : tyreData?.availability === "out_of_stock" ? (
                        <button
                            onClick={handleNotify}
                            className="py-4 px-4 flex gap-2 items-center justify-center rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm bg-orange-500 text-white hover:bg-orange-600 active:scale-95 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        >
                            Notify  
                            <FaBell className={`text-sm ${isRinging ? "animate-bell-ring" : ""}`} />
                        </button>
                        ) : (
                            <button
                                onClick={handleBuyNow}
                                className="py-4 px-4 flex gap-2 justify-center rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm bg-orange-500 text-white hover:bg-orange-600 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                Buy Now {selectedOpposite && <span className="hidden md:block"> ({formatPrice(totalPrice)})</span>}
                            </button>
                        )}

                    </div>
                </div>
            </div>

            <Login isOpen={isLogin} onClose={() => {
                setIslogin(false);
                if (!isAuthenticated) {
                    setPendingCheckout(false);
                    setPendingNotify(false);
                }
            }} />
        </section >
    );
}