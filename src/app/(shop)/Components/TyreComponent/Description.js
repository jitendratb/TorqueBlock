'use client';
import React, { useState } from 'react';
import { FaMotorcycle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { FiArrowUpRight, FiMousePointer } from 'react-icons/fi';
import TyreCard from "@/components/atoms/TyreCard";
import Carousel from '@/components/organisms/Carousel';

function Description({ tyre, desClassName = "space-y-2", sizesClassName }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();

    const sizesIdsFront = tyre?.sizesIds?.filter(item => item.position === 'Front').map(item => ({
        ...item,
        productImages: tyre?.productImages && tyre.productImages[0] ? [tyre.productImages[0]] : (tyre?.image ? [tyre.image] : []),
        categoryId: tyre?.categoryId || tyre?.category || null,
    })) || [];
    const Front = sizesIdsFront.length > 0 ? sizesIdsFront : (tyre?.frontSizes || []);

    const sizesIdsRear = tyre?.sizesIds?.filter(item => item.position === 'Rear').map(item => ({
        ...item,
        productImages: tyre?.productImages && tyre.productImages[0] ? [tyre.productImages[0]] : (tyre?.productImages && tyre.productImages[0] ? [tyre.productImages[0]] : (tyre?.image ? [tyre.image] : [])),
        categoryId: tyre?.categoryId || tyre?.category || null,
    })) || [];
    const Rear = sizesIdsRear.length > 0 ? sizesIdsRear : (tyre?.rearSizes || []);

    const isFrontObjects = Front.length > 0 && typeof Front[0] === 'object';
    const isRearObjects = Rear.length > 0 && typeof Rear[0] === 'object';

    const handleWhatsapp = (item) => {
        let message = `Hi Torque Block, I am interested in buying ${tyre?.productName} in size ${item}`;
        const phoneNumber = "916366625625";
        const isMobile = /iPhone|iPad|iPod|Android/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : '');
        const url = isMobile ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}` : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    }

    return (
        <div className="space-y-4">
            <div className={desClassName}>
                <div className="flex items-center gap-3 border-l-2 border-orange-500 pl-3 mb-3">
                    <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                        Description
                    </h2>
                </div>
                <div>
                    <p className="text-xs md:text-base text-zinc-400" style={!isExpanded ? { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', } : {}} >
                        {tyre?.description || tyre?.hero?.subtitle}
                    </p>
                    {(tyre?.description || tyre?.hero?.subtitle) && (
                        <button onClick={() => setIsExpanded(!isExpanded)} className="text-orange-500 hover:text-orange-400 text-xs md:text-sm font-semibold mt-1"  >
                            {isExpanded ? 'Hide' : 'more'}
                        </button>
                    )}
                </div>
            </div>
            <section className={`border-t border-white/10  my-4 ${sizesClassName}`}>
                <div className="">
                    <div className="space-y-4 py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between border-l-2 border-orange-500 pl-3 mb-6">
                            <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                                Select Your Size
                            </h2>
                            {tyre?.sizesIds?.length > 0 ? (
                                <span className="text-[9px] md:text-[10px] text-orange-400 font-black uppercase tracking-wider bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20 shadow-[0_0_12px_rgba(249,115,22,0.1)]">
                                    Interactive Size Specs Available
                                </span>
                            ) : (
                                <span className="text-[9px] md:text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                                    Select your bike size below
                                </span>
                            )}
                        </div>

                        <div className="space-y-4">
                            {Front.length > 0 && (
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-2 border-l border-orange-500/50 pl-3">
                                        <h3 className="text-[11px] md:text-xs font-black uppercase tracking-[0.2em] bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                                            Front Fitment
                                        </h3>
                                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <Carousel
                                            items={Front}
                                            itemWidth={isFrontObjects ? 280 : "320"}
                                            showDots={false}
                                            showArrows={true}
                                            gap={16}
                                            renderItem={(item) => {
                                                const isInteractive = typeof item === 'object';
                                                const sizeValue = isInteractive ? item?.size : item;
                                                const sizeId = isInteractive ? item?._id : item;
                                                return isInteractive ? (
                                                    <TyreCard key={item.id} tyre={tyre} product={item} className="w-full" />
                                                ) : (
                                                    <span
                                                        key={sizeId}
                                                        onClick={() => handleWhatsapp(item)}
                                                        className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded border border-white/10 bg-zinc-900/60 hover:bg-zinc-900 hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] text-xs md:text-sm text-zinc-300 hover:text-white font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap"
                                                    >
                                                        {sizeValue}
                                                    </span>
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {Rear.length > 0 && (
                                <div className="flex flex-col  gap-4">
                                    <div className="flex items-center gap-2 border-l border-orange-500/50 pl-3">
                                        <h3 className="text-[11px] md:text-xs font-black uppercase tracking-[0.2em] bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                                            Rear Fitment
                                        </h3>
                                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                                    </div>

                                    <div className=" flex flex-1 min-w-0 ">
                                        <Carousel
                                            items={Rear}
                                            itemWidth={isRearObjects ? 280 : "w-auto"}
                                            showDots={false}
                                            showArrows={true}
                                            gap={16}
                                            renderItem={(item) => {
                                                const isInteractive = typeof item === 'object';
                                                const sizeValue = isInteractive ? item?.size : item;
                                                const sizeId = isInteractive ? item?._id : item;
                                                return isInteractive ? (
                                                    <TyreCard key={item.id} tyre={tyre} product={item} className="w-full" />
                                                ) : (
                                                    <span
                                                        key={sizeId}
                                                        onClick={() => handleWhatsapp(item)}
                                                        className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded border border-white/10 bg-zinc-900/60 hover:bg-zinc-900 hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] text-xs md:text-sm text-zinc-300 hover:text-white font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap"
                                                    >
                                                        {sizeValue}
                                                    </span>
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="border-t border-white/10 "></div>
                    <div className="py-4">
                        <div className="flex items-center gap-3 border-l-2 border-orange-500 pl-3 mb-4">
                            <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                                Commonly Used On
                            </h2>
                        </div>

                        <div className="space-y-2">
                            <p className="text-xs md:text-md text-zinc-200 leading-relaxed">
                                {tyre?.commonlyUsedOn}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {tyre?.compatibleVehicles?.length > 0 ? (
                                    tyre?.compatibleVehicles?.map((brand, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 rounded border border-white/10 bg-zinc-900 text-xs md:text-sm text-white font-semibold hover:border-orange-500 hover:bg-zinc-800 transition-all duration-300"
                                        >
                                            <FaMotorcycle className="text-orange-500 text-sm md:text-base" />
                                            <span>{brand?.brand} {brand?.model}</span>
                                        </div>
                                    ))) : (tyre?.commonlyUsedBikes?.map((bike, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 rounded border border-white/10 bg-zinc-900 text-xs md:text-sm text-white font-semibold hover:border-orange-500 hover:bg-zinc-800 transition-all duration-300"
                                        >
                                            <FaMotorcycle className="text-orange-500 text-sm md:text-base" />
                                            <span>{bike}</span>
                                        </div>)
                                    ))}
                            </div>

                            <p className="text-zinc-400 italic text-[8px] md:text-xs">
                                Final fitment depends on model year and tyre size. Confirmed on WhatsApp.
                            </p>
                        </div>
                    </div>

                </div>
            </section>
            {(tyre?.pros?.length > 0 || tyre?.cons?.length > 0) && (
                <section className="relative border-t border-white/10 mt-4 py-4">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="flex items-center gap-3 border-l-2 border-orange-500 pl-3 mb-2">
                                <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                                    Performance Analysis
                                </h2>
                            </div>
                            <p className="text-zinc-400 text-xs">
                                Real-world strengths and limitations of this tyre.
                            </p>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {tyre?.pros?.length > 0 && (
                            <div className="group relative overflow-hidden rounded-2xl border border-green-500/20 ">
                                <div className="p-4 lg:p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="h-12 w-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                            <FaCheckCircle className="text-green-400 text-xl" />
                                        </div>

                                        <div>
                                            <h3 className="text-white font-bold text-lg">
                                                Advantages
                                            </h3>
                                            <p className="text-zinc-400 text-xs">
                                                What riders love about this tyre
                                            </p>
                                        </div>
                                    </div>

                                    <ul className="space-y-2">
                                        {tyre.pros.map((pro, index) => (
                                            <li
                                                key={index}
                                                className="flex gap-3 text-xs md:text-sm text-zinc-300 hover:text-white transition-all"
                                            >
                                                <div className="mt-1.5 h-2 w-2 rounded-full bg-green-400 shrink-0" />
                                                <span className="leading-relaxed">
                                                    {pro}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* CONS */}
                        {tyre?.cons?.length > 0 && (
                            <div className="group relative overflow-hidden rounded-2xl border border-red-500/20">


                                <div className="p-4 md:p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="h-12 w-12 rounded-xl shrink-0 bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                            <FaTimesCircle className="text-red-400 text-xl" />
                                        </div>

                                        <div>
                                            <h3 className="text-white font-bold text-lg">
                                                Limitations
                                            </h3>
                                            <p className="text-zinc-400 text-xs">
                                                Areas where alternatives may perform better
                                            </p>
                                        </div>
                                    </div>

                                    <ul className="space-y-2">
                                        {tyre.cons.map((con, index) => (
                                            <li
                                                key={index}
                                                className="flex gap-3 text-xs md:text-sm text-zinc-300 hover:text-white transition-all"
                                            >
                                                <div className="mt-1.5 h-2 w-2 rounded-full bg-red-400 shrink-0" />
                                                <span className="leading-relaxed">
                                                    {con}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                    </div>
                </section>
            )}

        </div>
    )
}

export default Description