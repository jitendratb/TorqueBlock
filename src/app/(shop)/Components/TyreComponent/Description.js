'use client';
import React, { useEffect, useState } from 'react';
import { FaMotorcycle, FaCheckCircle, FaTimesCircle, FaFileAlt, FaChevronDown, FaTools } from 'react-icons/fa';
import { RiThumbUpFill, RiThumbDownFill, RiShieldCheckFill, RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri';
import { TbCheck, TbX } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import { FiArrowUpRight, FiMousePointer } from 'react-icons/fi';
import { GiCarWheel, GiTyre } from 'react-icons/gi';
import TyreCard from "@/components/atoms/TyreCard";
import Carousel from '@/components/organisms/Carousel';
import VehicleService from '@/services/vehicleService';

function Description({ tyre, desClassName = "space-y-2", sizesClassName }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [vehicale, setVehicale] = useState([])
    const router = useRouter();

    const sizesIdsFront = tyre?.sizesIds?.filter(item => item.position === 'Front').map(item => ({ ...item, productImages: tyre?.productImages && tyre.productImages[0] ? [tyre.productImages[0]] : (tyre?.image ? [tyre.image] : []), categoryId: tyre?.categoryId || tyre?.category || null, })) || [];
    const Front = sizesIdsFront.length > 0 ? sizesIdsFront : (tyre?.frontSizes || []);

    const sizesIdsRear = tyre?.sizesIds?.filter(item => item.position === 'Rear').map(item => ({ ...item, productImages: tyre?.productImages && tyre.productImages[0] ? [tyre.productImages[0]] : (tyre?.productImages && tyre.productImages[0] ? [tyre.productImages[0]] : (tyre?.image ? [tyre.image] : [])), categoryId: tyre?.categoryId || tyre?.category || null, })) || [];
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

    useEffect(() => {
        const vehicale = async () => {
            try {
                const vehicale = await VehicleService.getVehicleByProductId(tyre?._id)
                setVehicale(vehicale)
            } catch (error) {
                console.log(error || "failed to fetch vehicle")
            }
        }

        vehicale()
    }, [tyre])

    return (
        <div className="space-y-4">
            <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl ${desClassName}`}>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative flex border-b border-white/10 pb-4 items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                        <FaFileAlt className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between flex-1">
                        <div>
                            <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                                Description
                            </h2>
                            <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                                Tyre Details & Overview
                            </p>
                        </div>
                    </div>
                </div>

                <div id='allSizesLink' className='relative pt-4 '>
                    <p className="text-[13px] md:text-sm text-zinc-300/90 leading-relaxed font-medium tracking-wide transition-all duration-500" style={!isExpanded ? { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : {}} >
                        {tyre?.description || tyre?.hero?.subtitle}
                    </p>

                    {(tyre?.description || tyre?.hero?.subtitle) && (
                        <div className="mt-4 flex justify-start">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="group flex items-center gap-2 rounded-full border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-orange-600/5 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-orange-400 transition-all duration-300 hover:border-orange-500/50 hover:bg-orange-500/20 hover:text-orange-300"
                            >
                                {isExpanded ? 'Read Less' : 'Read More'}
                                <FaChevronDown className={`text-[10px] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <section className={`space-y-4 my-4 ${sizesClassName}`} id="fitment-section">
                <div  className="relative  space-y-4">
                    {Front.length > 0 && (
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl flex flex-col gap-4">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="relative flex border-b border-white/10 pb-4 items-center gap-3.5 ">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                                    <FaTools className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between flex-1">
                                    <div>
                                        <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                                            Select Your Front Size
                                        </h2>
                                        <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                                            Available Fitments For This Model
                                        </p>
                                    </div>

                                </div>
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
                                                className="group relative inline-flex items-center gap-1.5 px-4 py-2 md:px-5 md:py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-orange-500/10 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] text-xs md:text-sm text-zinc-300 hover:text-white font-bold transition-all duration-300 cursor-pointer whitespace-nowrap"
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
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl flex flex-col gap-4">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="relative flex border-b border-white/10 pb-4 items-center gap-3.5 ">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                                    <FaTools className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between flex-1">
                                    <div>
                                        <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                                            Select Your Rear Size
                                        </h2>
                                        <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                                            Available Fitments For This Model
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <div className="flex flex-1 min-w-0">
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
                                                className="group relative inline-flex items-center gap-1.5 px-4 py-2 md:px-5 md:py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-orange-500/10 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] text-xs md:text-sm text-zinc-300 hover:text-white font-bold transition-all duration-300 cursor-pointer whitespace-nowrap"
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
            </section>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl">
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative flex border-b border-white/10 pb-4 items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                        <FaMotorcycle className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between flex-1">
                        <div>
                            <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                                Commonly Used On
                            </h2>
                            <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                                Verified Compatible Vehicles
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative pt-4 space-y-4">
                    {tyre?.commonlyUsedOn && (
                        <p className="text-[13px] md:text-sm text-zinc-300/90 leading-relaxed font-medium tracking-wide">
                            {tyre?.commonlyUsedOn}
                        </p>
                    )}

                    <div className="w-full min-w-0">
                        {tyre?.compatibleVehicles?.length > 0 ? (
                            <Carousel
                                items={tyre?.compatibleVehicles}
                                itemWidth="w-auto"
                                showDots={false}
                                showArrows={true}
                                arrowSize={16}
                                leftArrowClassName="-left-2 p-1"
                                rightArrowClassName="-right-2 p-1"
                                gap={12}
                                renderItem={(brand, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-white/10 bg-white/5 text-xs md:text-sm text-zinc-300 font-bold hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300 whitespace-nowrap cursor-pointer"
                                    >
                                        <FaMotorcycle className="text-orange-500 text-sm drop-shadow-sm shrink-0" />
                                        <span>{brand?.brand} {brand?.model}</span>
                                    </div>
                                )}
                            />
                        ) : tyre?.commonlyUsedBikes?.length > 0 ? (
                            <Carousel
                                items={tyre?.commonlyUsedBikes}
                                itemWidth="w-auto"
                                showDots={false}
                                showArrows={true}
                                gap={12}
                                renderItem={(bike, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-white/10 bg-white/5 text-xs md:text-sm text-zinc-300 font-bold hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300 whitespace-nowrap cursor-pointer"
                                    >
                                        <FaMotorcycle className="text-orange-500 text-sm drop-shadow-sm shrink-0" />
                                        <span>{bike}</span>
                                    </div>
                                )}
                            />
                        ) : null}
                    </div>


                </div>
            </div>
            {(tyre?.pros?.length > 0 || tyre?.cons?.length > 0) && (
                <section className="relative">

                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative flex border-b border-white/10 pb-4 items-center gap-3.5">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                                <RiShieldCheckFill className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between flex-1">
                                <div>
                                    <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                                        Performance Analysis
                                    </h2>
                                    <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                                        Real-world strengths &amp; limitations of this tyre
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">

                            {tyre?.pros?.length > 0 && (
                                <article className="relative overflow-hidden rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:shadow-[0_12px_24px_-10px_rgba(16,185,129,0.15)]">
                                    <div className="relative z-10 space-y-2">
                                        <header className="flex items-center gap-2 border-b border-white/10 pb-2">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-xl border bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                                                <RiThumbUpFill className="text-lg md:text-xl" aria-hidden="true" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm md:text-base font-bold text-zinc-100">
                                                    Advantages
                                                </h3>
                                                <p className="text-[10px] text-zinc-500 font-medium">
                                                    What riders love about this tyre
                                                </p>
                                            </div>
                                        </header>

                                        <ul className="space-y-2" aria-label="Advantages">
                                            {tyre.pros?.slice(0, 6).map((pro, index) => (
                                                <li key={index} className="group flex items-start gap-3 text-xs md:text-sm text-zinc-300 hover:text-white transition-colors duration-200">
                                                    <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full border transition-colors mt-0.5 bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300">
                                                        <TbCheck size={14} className="stroke-[2.5px]" aria-hidden="true" />
                                                    </span>
                                                    <span className="leading-relaxed pt-0.5">{pro}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </article>
                            )}

                            {/* CONS */}
                            {tyre?.cons?.length > 0 && (
                                <article className="relative overflow-hidden rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-red-500/10 hover:shadow-[0_12px_24px_-10px_rgba(239,68,68,0.15)]">
                                    <div className="relative z-10 space-y-2">
                                        <header className="flex items-center gap-2 border-b border-white/10 pb-2">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-xl border bg-red-500/10 border-red-500/20 text-red-400">
                                                <RiThumbDownFill className="text-lg md:text-xl" aria-hidden="true" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm md:text-base font-bold text-zinc-100">
                                                    Limitations
                                                </h3>
                                                <p className="text-[10px] text-zinc-500 font-medium">
                                                    Areas where alternatives may perform better
                                                </p>
                                            </div>
                                        </header>

                                        <ul className="space-y-2" aria-label="Limitations">
                                            {tyre.cons?.slice(0, 6)?.map((con, index) => (
                                                <li key={index} className="group flex items-start gap-3 text-xs md:text-sm text-zinc-300 hover:text-white transition-colors duration-200">
                                                    <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full border transition-colors mt-0.5 bg-red-500/10 border-red-500/20 text-red-400 group-hover:bg-red-500/20 group-hover:text-red-300">
                                                        <TbX size={14} className="stroke-[2.5px]" aria-hidden="true" />
                                                    </span>
                                                    <span className="leading-relaxed pt-0.5">{con}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </article>
                            )}

                        </div>
                    </div>
                </section>
            )}

        </div>
    )
}

export default Description