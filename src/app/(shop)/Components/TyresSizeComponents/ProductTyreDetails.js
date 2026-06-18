'use client';

import CustomImage from '@/components/molecules/CustomImage';
import WhatsAppButton from '@/components/atoms/WhatsAppButton';
import React, { useMemo, useState } from 'react';
import { FaShieldAlt, FaTag, FaTools, FaTruck, FaUserTie, FaMotorcycle, FaCheckCircle, FaCircle } from 'react-icons/fa';
import { HiFire } from 'react-icons/hi';
import { FiInfo } from 'react-icons/fi';

function ProductTyreDetails({ tyreData }) {
    const images = [
        ...(Array.isArray(tyreData?.sizeSpecificImages) ? tyreData.sizeSpecificImages : []),
        ...(Array.isArray(tyreData?.availableTyres?.productImages)
            ? tyreData.availableTyres.productImages.slice(0, 3)
            : []),
    ];
    const initialImage = images[0] || tyreData?.hero?.heroImage || '/newLogo.webp';
    const [activeImage, setActiveImage] = useState(initialImage);

    const getImageSrc = (image) => {
        if (!image) return '';
        return typeof image === 'string' ? image : image?.imageUrl || image?.src || '';
    };

    const getImageAlt = (image) => {
        return (
            (typeof image === 'object' && image?.alt) ||
            tyreData?.availableTyres?.productName ||
            tyreData?.productName ||
            tyreData?.hero?.title ||
            'Tyre'
        );
    };

    // ── Derived data ──
    const productName = tyreData?.availableTyres?.productName || tyreData?.productName || tyreData?.hero?.title || 'Performance Tyre';

    const brandName = tyreData?.availableTyres?.brand?.name ? `${tyreData.availableTyres.brand.name} Performance Series` : 'Premium Brand';

    const sizeLabel = tyreData?.sizeCode || tyreData?.size || tyreData?.hero?.title || '';
    const subtitle = tyreData?.hero?.subtitle || '';
    const minPrice = tyreData?.pricing?.minPrice || tyreData?.price || null;
    const maxPrice = tyreData?.pricing?.maxPrice || null;

    const specTags = useMemo(() => {
        const tags = [];
        if (tyreData?.position) tags.push({ label: tyreData.position, color: 'text-blue-400' });
        if (tyreData?.size) tags.push({ label: tyreData.size, color: 'text-orange-400' });
        if (tyreData?.compoundTechnology) tags.push({ label: tyreData.compoundTechnology, color: 'text-emerald-400' });
        if (tyreData?.dualCompound) tags.push({ label: 'Dual Compound', color: 'text-violet-400' });
        if (tyreData?.tripleCompound) tags.push({ label: 'Triple Compound', color: 'text-fuchsia-400' });
        if (tyreData?.speedIndex) tags.push({ label: `Speed: ${tyreData.speedIndex}`, color: 'text-white-400' });
        if (tyreData?.loadIndex) tags.push({ label: `Load: ${tyreData.loadIndex}`, color: 'text-cyan-400' });
        if (tyreData?.rimSize) tags.push({ label: `Rim ${tyreData.rimSize}`, color: 'text-zinc-300' });
        return tags;
    }, [tyreData]);

    const formatPrice = (price) => {
        if (!price) return null;
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const whatsappMessage = `Hi! I'm interested in the *${productName}*${sizeLabel ? `(Size: ${sizeLabel})` : ''}. Could you please share:\n• Best price for my bike model\n• Availability & delivery timeline\n• Installation support details`;

    return (
        <div className="grid grid-cols-1 gap-2 md:gap-4 lg:grid-cols-2 relative">
            <div className=' flex  flex-col gap-4'>
                <div className="flex flex-col-reverse md:grid md:grid-cols-[90px_1fr] gap-4">
                    <div className="flex md:h-[450px] md:flex-col gap-3 overflow-y-auto pr-1">
                        {images?.map((item, idx) => {
                            const imageSrc = getImageSrc(item);
                            const isActive = activeImage === imageSrc;
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setActiveImage(imageSrc)}
                                    onMouseEnter={() => setActiveImage(imageSrc)}
                                    className={`relative cursor-pointer h-20 w-20 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 ${isActive
                                        ? 'border-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                                        : 'border-zinc-800 hover:border-zinc-600'
                                        }`}
                                >
                                    <CustomImage src={imageSrc} alt={`${getImageAlt(item)} image ${idx + 1}`} fill sizes="40px" imageClassName="object-cover transition-transform duration-300 hover:scale-105" />
                                </button>
                            );
                        })}
                    </div>

                    <div className="relative flex h-[350px] md:h-[450px] w-auto items-center justify-center overflow-hidden">
                        {activeImage && (
                            <CustomImage
                                src={activeImage}
                                alt={productName}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                                imageClassName="object-contain transition-transform w-full duration-300 hover:scale-105"
                            />
                        )}
                    </div>
                </div>

                <div className="hidden lg:grid grid-cols-3 gap-2 ">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-green-500/10 p-2.5 text-green-400 shrink-0">
                            <FaTools className="text-xs md:text-sm" />
                        </div>
                        <p className="text-[10px] md:text-xs font-medium text-white leading-tight">
                            Installation Support
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-orange-500/10 p-2.5 text-orange-400 shrink-0">
                            <FaTruck className="text-xs md:text-sm" />
                        </div>
                        <p className="text-[10px] md:text-xs font-medium text-white leading-tight">
                            Pan India Delivery
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-blue-500/10 p-2.5 text-blue-400 shrink-0">
                            <FaUserTie className="text-xs md:text-sm" />
                        </div>
                        <p className="text-[10px] md:text-xs font-medium text-white leading-tight">
                            Expert Assistance
                        </p>
                    </div>
                </div>
            </div>


            <div className="space-y-5 mt-2 md:mt-0">

                <div className="flex items-center gap-4 flex-wrap">
                    <p className="text-[10px] lg:text-sm font-medium uppercase tracking-[0.2em] text-orange-500">
                        {brandName}
                    </p>
                    <div className="absolute top-0 right-0 md:relative flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5 backdrop-blur-xl">
                        <FaShieldAlt className="text-xs text-green-400" />
                        <p className="text-xs font-medium text-green-100">Trusted by 50,000+ riders</p>
                    </div>
                </div>

                <div className="max-w-xl">
                    <h1 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-orange-400 uppercase tracking-tighter leading-none">
                        {tyreData?.hero?.title}
                    </h1>
                    {tyreData?.hero?.subtitle && (
                        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{tyreData?.hero?.subtitle}</p>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2 rounded border border-white/10 bg-zinc-900/80 px-3 py-1 shadow-md backdrop-blur-md">
                        <HiFire className="text-orange-500 text-sm" />
                        <span className="text-xs font-medium text-white">High Performance</span>
                    </div>


                    {tyreData?.availableTyres?.categoryId?.name && (
                        <div className="flex items-center gap-2 rounded border border-white/10 bg-zinc-900/80 px-3 py-1 shadow-md backdrop-blur-md">
                            <FaTag className="text-blue-400 text-sm" />
                            <span className="text-xs font-medium text-white">{tyreData?.availableTyres?.categoryId?.name}</span>
                        </div>
                    )}

                    {tyreData?.position && (
                        <div className="flex items-center gap-2 rounded border border-white/10 bg-zinc-900/80 px-3 py-1 shadow-md backdrop-blur-md">
                            <FaMotorcycle className="text-orange-400 text-sm" />
                            <span className="text-xs font-medium text-white capitalize">{tyreData.position}</span>
                        </div>
                    )}

                </div>

                <div className="relative overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-5 shadow-[0_0_40px_rgba(249,115,22,0.08)]">
                    {/* Ambient glow */}
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-orange-600/5 rounded-full blur-xl pointer-events-none" />

                    <div className="">
                        {tyreData?.isStock !== undefined && (
                            <div className={`absolute top-2 right-2 flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider border ${tyreData.isStock
                                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                                : 'border-red-500/30 bg-red-500/10 text-red-400'
                                }`}>
                                <FaCircle className={`text-[5px] ${tyreData.isStock ? 'text-emerald-400 drop-shadow-[0_0_4px_rgba(52,211,153,0.8)]' : 'text-red-400 drop-shadow-[0_0_4px_rgba(248,113,113,0.8)]'}`} />
                                {tyreData.isStock ? 'In Stock' : 'Out of Stock'}
                            </div>
                        )}

                        <div className=" ">
                            <p className="text-xs text-zinc-400 font-medium uppercase">AVAILABLE ON-ROAD PRICE*</p >

                            <div className='flex items-baseline gap-2 flex-wrap'>
                                {tyreData?.price ? (
                                    <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 tracking-tight">
                                        {formatPrice(tyreData?.price)}
                                    </span>
                                ) : (
                                    <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 tracking-tight">
                                        Contact for Price
                                    </span>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

                {/* Highlights */}
                {tyreData?.hero?.highlights?.length > 0 && (
                    <div>
                        <h3 className="mb-3 text-[10px] md:text-xs font-extrabold uppercase tracking-[0.2em] text-zinc-500">
                            Key Highlights
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {tyreData.hero.highlights.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-zinc-900/60 px-3 py-2 backdrop-blur-md transition-all duration-300 hover:border-orange-500/30 hover:bg-zinc-800/60"
                                >
                                    <FaCheckCircle className="text-xs shrink-0 text-orange-500" />
                                    <span className="text-[10px] md:text-xs font-medium text-zinc-200">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="pb-4 lg:pb-4 space-y-4">
                    <WhatsAppButton
                        className="h-12 w-full"
                        value={whatsappMessage}
                        text="Get a Free Tyre Buying Guide"
                    />

                    <div className="grid grid-cols-3 gap-2 lg:hidden">
                        <div className="flex items-center gap-2">
                            <div className="rounded-full bg-green-500/10 p-2.5 text-green-400 shrink-0">
                                <FaTools className="text-xs md:text-sm" />
                            </div>
                            <p className="text-[10px] md:text-xs font-medium text-white leading-tight">
                                Installation Support
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="rounded-full bg-orange-500/10 p-2.5 text-orange-400 shrink-0">
                                <FaTruck className="text-xs md:text-sm" />
                            </div>
                            <p className="text-[10px] md:text-xs font-medium text-white leading-tight">
                                Pan India Delivery
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="rounded-full bg-blue-500/10 p-2.5 text-blue-400 shrink-0">
                                <FaUserTie className="text-xs md:text-sm" />
                            </div>
                            <p className="text-[10px] md:text-xs font-medium text-white leading-tight">
                                Expert Assistance
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProductTyreDetails;
