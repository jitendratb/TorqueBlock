"use client";

import React, { useEffect, useState } from "react";
import Image from "@/components/molecules/CustomImage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import vehicleService from "@/services/vehicleService";
import { FiCheckCircle, FiInfo, FiArrowRight, FiMaximize2, FiMessageCircle, FiZap, FiShield, FiTarget, FiChevronRight, FiBookOpen, FiAlertCircle, FiSettings } from "react-icons/fi";
import { FaWhatsapp, FaFileAlt, FaChevronDown, FaCogs, FaTachometerAlt, FaWeightHanging, FaCircleNotch } from "react-icons/fa";
import { GiCartwheel } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { AiFillStar } from "react-icons/ai";
import WhatsAppButton from "@/components/atoms/WhatsAppButton";
import PerformanceDNA from "@/components/molecules/PerformanceDNA";
import SupportTerminal from "@/components/molecules/SupportTerminal";
import TopProductCard from "./TopProductCard";
import CustomImage from "@/components/molecules/CustomImage";
import { RiSparkling2Fill } from "react-icons/ri";
import ExpandableCard from "@/components/molecules/ExpandableCard";
import GuideColumn from "@/components/molecules/GuideColumn";
import FitmentSection from "./TyreComponent/FitmentSection";
import FAQSection from "@/components/atoms/FAQSection";
import TyreCard from "@/components/atoms/TyreCard";
import Carousel from "@/components/organisms/Carousel";

function BikeModelsClient({ data }) {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState("all");

    const filterOptions = React.useMemo(() => {
        if (!data?.products || !Array.isArray(data.products)) return [];
        return data.products.map((g, idx) => ({
            id: g?.familyId?._id || g?.familyId?.productName || idx.toString(),
            name: g?.familyId?.productName || `Option ${idx + 1}`
        }));
    }, [data?.products]);

    const displayedItems = React.useMemo(() => {
        if (!data?.products || !Array.isArray(data.products)) return [];

        if (activeFilter === "all") {
            const allItems = [];
            data.products.forEach((productGroup) => {
                const groupProductIds = productGroup?.productIds || [];
                groupProductIds.forEach((productItem) => {
                    const opposteProductId = groupProductIds.filter(
                        (item) => item?._id?.toString() !== productItem?._id?.toString()
                    );
                    allItems.push({
                        productItem,
                        opposteProductId
                    });
                });
            });
            return allItems;
        } else {
            const targetGroup = data.products.find(
                (g, idx) => (g?.familyId?._id || g?.familyId?.productName || idx.toString()) === activeFilter
            );
            if (!targetGroup) return [];
            const groupProductIds = targetGroup?.productIds || [];
            return groupProductIds.map((productItem) => ({
                productItem,
                opposteProductId: groupProductIds.filter(
                    (item) => item?._id?.toString() !== productItem?._id?.toString()
                )
            }));
        }
    }, [data?.products, activeFilter]);

    const specsArray = [];
    if (data?.vehicleSpecs) {
        Object.entries(data.vehicleSpecs).forEach(([key, value]) => {
            if (key.toLowerCase() !== 'torque') {
                specsArray.push({ key: key.replace(/([A-Z])/g, ' $1').trim(), value: value, iconId: key });
            }
        });
    }
    if (data?.frontSizes?.length > 0) {
        specsArray.push({ key: "Front Tyre Size", value: data.frontSizes.join(", "), iconId: "frontTyre" });
    }
    if (data?.rearSizes?.length > 0) {
        specsArray.push({ key: "Rear Tyre Size", value: data.rearSizes.join(", "), iconId: "rearTyre" });
    }

    const getIconForKey = (key) => {
        const k = key.toLowerCase();
        if (k.includes('engine')) return <FaCogs className="text-orange-500/80 text-sm group-hover:text-orange-400 transition-colors duration-300" />;
        if (k.includes('power')) return <FiZap className="text-orange-500/80 text-sm group-hover:text-orange-400 transition-colors duration-300" />;
        if (k.includes('weight')) return <FaWeightHanging className="text-orange-500/80 text-sm group-hover:text-orange-400 transition-colors duration-300" />;
        if (k.includes('wheel')) return <GiCartwheel className="text-orange-500/80 text-sm group-hover:text-orange-400 transition-colors duration-300" />;
        return <FiInfo className="text-orange-500/80 text-sm group-hover:text-orange-400 transition-colors duration-300" />;
    };

    const whatsappMessage = encodeURIComponent(`Hi Torque Block! I need a high-performance tyre setup for my ${data.bikeBrand} ${data.bikeModel}. What's the best rubber for maximum grip?`);

    return (
        <div className="relative space-y-4">

            <section className="relative h-[70vh] md:h-[60vh] 2xl:h-[520px] w-full rounded-2xl md:rounded-3xl overflow-hidden group border border-white/10 shadow-2xl">
                <CustomImage
                    src={data?.hero?.banner || data.heroImage}
                    alt={`${data.bikeBrand} ${data.bikeModel}`}
                    fill
                    priority
                    quality={100}
                    sizes="100vw"
                    imageClassName="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent z-10" />

                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl md:rounded-3xl z-20 pointer-events-none" />

                <div className="absolute inset-0 p-4 md:p-6 z-20 flex flex-col justify-end">
                    <div className="max-w-4xl space-y-1">
                        <div className="inline-flex items-center gap-2.5 px-2 py-1.5 bg-white/20 backdrop-blur-xl border border-white/15 rounded-full shadow-lg">
                            <RiSparkling2Fill className="text-orange-500 text-sm" />
                            <span className="text-zinc-200 text-[9px]  font-black uppercase tracking-[0.25em]">
                                Perfect Fitment Guide
                            </span>
                        </div>

                        <h2 className="text-orange-500 text-lg md:text-2xl font-black uppercase tracking-widest drop-shadow-md">
                            {data.bikeBrand}
                        </h2>
                        <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-black text-white tracking-[-0.02em] leading-[0.9] drop-shadow-2xl">
                            {data.bikeModel}
                        </h1>
                        {data?.hero?.title && (
                            <h3 className="text-base md:text-xl pt-4 font-bold text-zinc-300 tracking-wide ">
                                {data.hero.title}
                            </h3>
                        )}

                        <p className="text-xs  text-zinc-400 max-w-3xl leading-relaxed ">
                            {data?.hero?.description || data.subTitle}
                        </p>
                    </div>
                </div>
            </section>

            <div className="space-y-4">
                {data?.description && (
                    <ExpandableCard
                        icon={FaFileAlt}
                        title="Overview"
                        subtitle={`About ${data.bikeBrand} ${data.bikeModel}`}
                        content={data.description}
                    />
                )}

                {specsArray.length > 0 && (
                    <ExpandableCard
                        icon={FiInfo}
                        title="Vehicle Specifications"
                        subtitle="Key mechanical details & tyre sizes"
                        expandable={false}
                    >
                        <div className="grid grid-cols-2 md:grid-cols-7 gap-3 md:gap-4 mt-2">
                            {specsArray.map((spec, index) => (
                                <div key={index} className="flex flex-col bg-white/5 border border-white/5 rounded-xl p-3 hover:bg-white/10 transition-colors duration-300 group cursor-default">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <div className="w-6 h-6 flex items-center justify-center rounded-md  group-hover:bg-or transition-colors duration-300 shadow-inner">
                                            {getIconForKey(spec.iconId)}
                                        </div>
                                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold transition-colors duration-300 group-hover:text-orange-500/80">
                                            {spec.key}
                                        </span>
                                    </div>
                                    <span className="text-zinc-200 text-xs md:text-[13px] font-medium transition-colors duration-300 group-hover:text-white pl-1">
                                        {spec.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </ExpandableCard>
                )}

                {(data?.highlights?.length > 0 || data?.whyTyreChoiceMatters?.length > 0 || data?.maintenanceTips?.length > 0) && (
                    <ExpandableCard
                        icon={FiShield}
                        title="Performance & Maintenance"
                        subtitle="Key highlights and care instructions"
                        expandable={false}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-2">


                            {data?.whyTyreChoiceMatters && data.whyTyreChoiceMatters.length > 0 && (
                                <GuideColumn
                                    title="Why Tyre Choice Matters"
                                    subtitle="Key performance factors"
                                    mainIcon={FiTarget}
                                    themeColor="orange"
                                    items={data?.whyTyreChoiceMatters}
                                    renderItemIcon={() => (
                                        <div className="flex-shrink-0 mt-0.5 flex items-center justify-center w-4 h-4 rounded-full border border-orange-500/50 bg-orange-500/10 transition-all duration-300 group-hover:bg-orange-500/20 group-hover:scale-110">
                                            <FiTarget className="text-orange-500 text-[8px] transition-transform duration-300 group-hover:rotate-12" />
                                        </div>
                                    )}
                                />
                            )}

                            {data?.maintenanceTips && data.maintenanceTips.length > 0 && (
                                <GuideColumn
                                    title="Maintenance Tips"
                                    subtitle="Prolong tyre life"
                                    mainIcon={FiSettings}
                                    themeColor="emerald"
                                    items={data?.maintenanceTips}
                                    renderItemIcon={() => (
                                        <div className="flex-shrink-0 mt-0.5 flex items-center justify-center w-4 h-4 rounded-full border border-emerald-500/50 bg-emerald-500/10 transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:scale-110">
                                            <FiCheckCircle className="text-emerald-500 text-[8px] transition-transform duration-300 group-hover:rotate-12" />
                                        </div>
                                    )}
                                />
                            )}
                        </div>
                    </ExpandableCard>
                )}

                <ExpandableCard
                    icon={FiBookOpen}
                    title="Tyre Buying Guide"
                    subtitle="Expert Recommendations & Use Cases"
                    expandable={false}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-2">
                        <GuideColumn
                            title="Buying Guide"
                            subtitle="Ideal considerations"
                            mainIcon={FiCheckCircle}
                            themeColor="emerald"
                            items={data?.buyingGuide}
                            renderItemIcon={() => <FiCheckCircle className="text-emerald-500 text-sm shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-125" />}
                        />

                        <GuideColumn
                            title="Common Problems"
                            subtitle="Considerations & trade-offs"
                            mainIcon={FiAlertCircle}
                            themeColor="red"
                            items={data?.commonProblems}
                            renderItemIcon={() => (
                                <div className="flex-shrink-0 mt-0.5 flex items-center justify-center w-4 h-4 rounded-full border border-red-500/50 bg-red-500/10 transition-all duration-300 group-hover:bg-red-500/20 group-hover:scale-110 group-hover:shadow-[0_0_8px_rgba(239,68,68,0.4)]">
                                    <FiAlertCircle className="text-red-500 text-[8px] transition-transform duration-300 group-hover:rotate-12" />
                                </div>
                            )}
                        />

                        <GuideColumn
                            title="Expert Tips"
                            subtitle="Optimal riding conditions"
                            mainIcon={FiTarget}
                            themeColor="orange"
                            items={data?.expertTips}
                            renderItemIcon={() => (
                                <div className="flex-shrink-0 mt-0.5 flex items-center justify-center w-4 h-4 rounded-full border border-orange-500/50 bg-orange-500/10 transition-all duration-300 group-hover:bg-orange-500/z0 group-hover:scale-110 group-hover:shadow-[0_0_8px_rgba(249,115,22,0.4)]">
                                    <FiChevronRight className="text-orange-500 text-[10px] transition-transform duration-300 group-hover:translate-x-0.5" />
                                </div>
                            )}
                        />
                    </div>
                </ExpandableCard>
                {data?.products && data.products.length > 0 && (
                    <ExpandableCard
                        icon={GiCartwheel}
                        title={`Recommended Tyres for ${data?.bikeBrand || ''} ${data?.bikeModel || ''}`}
                        subtitle={`Unleash the full potential of your ${data?.bikeModel || 'ride'}`}
                        expandable={false}
                        boundary={false}
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 px-0.5">
                                <button
                                    type="button"
                                    onClick={() => setActiveFilter("all")}
                                    className={`px-4 py-2 rounded-lg text-xs transition-all duration-300 ease-out whitespace-nowrap border cursor-pointer ${
                                        activeFilter === "all"
                                            ? "bg-orange-500 text-white border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.4)] font-black scale-105"
                                            : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 font-black hover:scale-102"
                                    }`}
                                >
                                    All
                                </button>
                                {filterOptions.map((opt) => (
                                    <button
                                        type="button"
                                        key={opt.id}
                                        onClick={() => setActiveFilter(opt.id)}
                                        className={`px-4 py-2 rounded-lg text-xs transition-all duration-300 ease-out whitespace-nowrap border cursor-pointer ${
                                            activeFilter === opt.id
                                                ? "bg-orange-500 text-white border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.4)] font-black scale-105"
                                                : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 font-black hover:scale-102"
                                        }`}
                                    >
                                        {opt.name}
                                    </button>
                                ))}
                            </div>

                            <div key={activeFilter} className="animate-fade-in-up">
                                <Carousel
                                    items={displayedItems}
                                    itemWidth="w-72 md:w-80"
                                    renderItem={(entry, pIndex) => (
                                        <TyreCard
                                            key={entry.productItem?._id || pIndex}
                                            product={entry.productItem}
                                            opposteProductId={entry.opposteProductId}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </ExpandableCard>
                )}


                <FitmentSection tyre={data} />
                <FAQSection faqs={data?.faq} />
            </div>
        </div>
    );
}

export default BikeModelsClient;
