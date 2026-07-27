"use client";
import React, { useState, useEffect } from 'react';
import CustomImage from '@/components/molecules/CustomImage';
import Link from 'next/link';
import { FiTrendingUp, FiEye, FiMousePointer, FiAward, FiCheck, FiX, FiChevronDown, FiChevronUp, FiCalendar, FiZap, FiTarget, FiStar, FiHeart, FiShield, FiTag, FiHeadphones, FiInfo, FiAlertCircle } from 'react-icons/fi';
import { FaMotorcycle, FaFileAlt } from 'react-icons/fa';
import { GiCarWheel, GiTyre } from 'react-icons/gi';
import WhatsAppButton from '@/components/atoms/WhatsAppButton';
import FAQSection from '@/components/atoms/FAQSection';
import Description from '../TyreComponent/Description';
import FitmentSection from '../TyreComponent/FitmentSection';
import trendingService from '@/services/trending.service';
import { useToast } from '@/context/ToastContext';
import TyreCard from "@/components/atoms/TyreCard"
import RecommendedTyres from '../BrandsComponents/RecommendedTyres';
import Carousel from '@/components/organisms/Carousel';


function StatPill({ icon: Icon, label, value, accent = false, onClick, disabled }) {
    return (
        <div
            onClick={!disabled ? onClick : undefined}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-300 ${accent
                ? 'bg-orange-500/10 border-orange-500/30'
                : 'bg-white/[0.03] border-white/10'
                } ${onClick && !disabled
                    ? 'cursor-pointer hover:bg-white/10 active:scale-95 hover:border-white/20'
                    : ''
                } ${disabled ? 'opacity-70 cursor-not-allowed' : ''
                }`}
        >
            <div className={`p-2 rounded-xl ${accent ? 'bg-orange-500/20' : 'bg-white/5'} transition-all duration-300`}>
                <Icon className={`text-base ${accent ? 'text-orange-400' : 'text-zinc-300'}`} />
            </div>
            <div>
                <div className={`text-base font-black leading-none ${accent ? 'text-orange-400' : 'text-white'}`}>{value}</div>
                <div className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest mt-0.5">{label}</div>
            </div>
        </div>
    );
}

function renderMarkdownContent(text) {
    if (!text) return null;
    const blocks = text.split(/\n\s*\n/);

    return (
        <div className="space-y-4 text-zinc-300 text-sm leading-relaxed">
            {blocks.map((block, index) => {
                const trimmed = block.trim();
                const isHeadingBlock = trimmed.startsWith('#') || (
                    !trimmed.includes('\n') &&
                    !trimmed.endsWith('.') &&
                    !trimmed.startsWith('-') &&
                    !trimmed.startsWith('*') &&
                    trimmed.length < 100
                );


                if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
                    const items = trimmed.split('\n').map(item => item.replace(/^[-*]\s*/, '').trim()).filter(Boolean);
                    return (
                        <ul key={index} className="space-y-4 my-4 list-none">
                            {items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3.5 text-zinc-300 text-xs md:text-[14px] font-medium transition-all hover:text-white duration-300">
                                    <div className="mt-0.5 p-1 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/5 text-orange-400 ring-1 ring-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.1)]">
                                        <FiCheck className="text-[12px]" />
                                    </div>
                                    <span className="leading-relaxed pt-0.5">{item}</span>
                                </li>
                            ))}
                        </ul>
                    );
                }

                const lines = trimmed.split('\n');
                return (
                    <div key={index} className="space-y-2">
                        {lines.map((line, idx) => {
                            if (line.includes(':') && line.length < 40) {
                                const parts = line.split(':');
                                const key = parts[0];
                                const val = parts.slice(1).join(':');
                                return (
                                    <div key={idx} className="flex items-center justify-between px-4 py-3.5 my-2 rounded-xl bg-white/10 border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300 group">
                                        <span className="text-white/80 font-bold uppercase tracking-[0.15em] text-[10px] md:text-xs flex items-center gap-2.5 group-hover:text-zinc-400 transition-colors">
                                            <FiTag className="text-orange-500/70 text-sm shrink-0" />
                                            {key.trim()}
                                        </span>
                                        <span className="text-orange-400 font-black tracking-wide text-xs md:text-sm drop-shadow-sm group-hover:text-orange-300 transition-colors text-right">{val.trim()}</span>
                                    </div>
                                );
                            }
                            
                            return (
                                <p key={idx} className="text-zinc-300 text-xs md:text-sm leading-relaxed">
                                    {line}
                                </p>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

function renderDescription(text) {
    if (!text) return null;
    const lines = text.split('\n');

    const elements = [];
    let currentList = [];

    lines.forEach((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
            if (currentList.length > 0) {
                elements.push(
                    <ul key={`list-${idx}`} className="space-y-2 my-3 list-none pl-1">
                        {currentList.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-zinc-400 text-xs md:text-sm">
                                <FiCheck className="text-orange-500 mt-0.5 shrink-0 text-sm" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                );
                currentList = [];
            }
            return;
        }

        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*');

        if (isBullet) {
            const cleanText = trimmed.replace(/^[•\-*]\s*/, '').trim();
            currentList.push(cleanText);
        } else {
            if (currentList.length > 0) {
                elements.push(
                    <ul key={`list-${idx}`} className="space-y-2 my-3 list-none pl-1">
                        {currentList.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-zinc-400 text-xs md:text-sm">
                                <FiCheck className="text-orange-500 mt-0.5 shrink-0 text-sm" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                );
                currentList = [];
            }

            const isHeading = trimmed.endsWith(':') && trimmed.length < 55;
            if (isHeading) {
                elements.push(
                    <p key={idx} className="text-xs md:text-sm font-black text-orange-500 uppercase tracking-widest mt-4 mb-2">
                        {trimmed}
                    </p>
                );
            } else {
                elements.push(
                    <p key={idx} className="text-xs md:text-base text-zinc-400 leading-relaxed my-1">
                        {trimmed}
                    </p>
                );
            }
        }
    });

    if (currentList.length > 0) {
        elements.push(
            <ul key="list-end" className="space-y-2 my-3 list-none pl-1">
                {currentList.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-zinc-400 text-xs md:text-sm">
                        <FiCheck className="text-orange-500 mt-0.5 shrink-0 text-sm" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        );
    }

    return <div className="space-y-1">{elements}</div>;
}

export default function TrendingDetailsClient({ item }) {
    const bike = item?.bike;
    const product = item?.tyreSizeId
    const score = item?.trendScore;
    const faqs = item?.faqs || [];
    const bikeBrand = bike?.bikeId?.brandId?.brandName || bike?.bikeId?.brandId;


    const toast = useToast();

    const [views, setViews] = useState(item?.totalViews || 0);
    const [likes, setLikes] = useState(item?.totalClicks || 0);
    const [hasLiked, setHasLiked] = useState(false);
    const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);

    useEffect(() => {
        if (item?.slug) {
            trendingService.interact(item.slug, 'view')
                .then(res => {
                    if (res?.data?.totalViews !== undefined) {
                        setViews(res.data.totalViews);
                    } else {
                        setViews(prev => prev + 1);
                    }
                })
                .catch(err => {
                    console.error("Error logging view:", err);
                    setViews(prev => prev + 1);
                });
        }
    }, [item?.slug]);

    const handleLike = async () => {
        if (!item?.slug) return;
        try {
            const res = await trendingService.interact(item.slug, 'like');
            if (res?.data?.totalClicks !== undefined) {
                setLikes(res.data.totalClicks);
                setHasLiked(true);
            } else {
                setLikes(prev => prev + 1);
                setHasLiked(true);
            }
            toast.success("Like recorded successfully!");
        } catch (error) {
            toast.info("You already liked this!");
        }
    };

    return (
        <div className="flex flex-col gap-4 pb-4">
            <div className="relative w-full h-[60vh] min-h-[450px] rounded-3xl overflow-hidden border border-white/10">
                <CustomImage
                    src={item?.bannerImage}
                    alt={item?.name}
                    fill
                    imageClassName="object-cover"
                    priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent" />

                <div className="absolute lg:top-6 lg:left-6 top-2 left-2 flex items-center gap-2 bg-orange-500/20 backdrop-blur-md border border-orange-500/40 rounded-full lg:px-4 lg:py-2 px-2 py-1">
                    <FiAward className="text-orange-400  " />
                    <span className="text-xs font-black uppercase tracking-widest text-orange-300">
                        {item?.trendType}
                    </span>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-2 md:p-10 flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 text-xs font-medium text-white">
                            <FaMotorcycle className="text-orange-500" />
                            <span>{bikeBrand} {bike?.bikeModel}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 text-xs font-medium text-white">
                            <GiCarWheel className="text-orange-500" />
                            <span>{item?.productId?.productName}</span>
                        </div>
                    </div>
                    <h1 className="text-xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none max-w-4xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-orange-400">{item?.name}</span>
                    </h1>
                    <p className="text-zinc-300 text-xs lg:text-sm md:text-base font-light max-w-2xl italic leading-relaxed">
                        {item?.shortDescription}
                    </p>
                </div>

                {/* <div className="absolute bottom-0 right-0 p-6 md:p-10 hidden lg:flex flex-col gap-3 max-w-[250px]">
                    <StatPill icon={FiEye} label="Views" value={views.toLocaleString()} />
                    <StatPill
                        icon={FiHeart}
                        label="Likes"
                        value={likes.toLocaleString()}
                        accent={hasLiked}
                        onClick={handleLike}
                    />
                </div> */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
                    {item?.description && (
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative flex border-b border-white/10 pb-4 items-center gap-3.5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                                    <FaFileAlt className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between flex-1">
                                    <div>
                                        <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                                            Trending Overview
                                        </h2>
                                        <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                                            Insights & Details
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='relative'>
                                <div className="text-[13px] md:text-sm text-zinc-300/90 leading-relaxed font-medium tracking-wide transition-all duration-500">
                                    {renderDescription(item.description)}
                                </div>


                            </div>
                        </div>
                    )}


                    {item?.content?.topContent && (
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative flex border-b border-white/10 pb-4 items-center gap-3 mb-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                                    <FiInfo className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between flex-1">
                                    <div>
                                        <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                                            Highlights
                                        </h2>
                                        <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                                            Key Features & Information
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                {renderMarkdownContent(item?.content?.topContent)}
                            </div>
                        </div>
                    )}

                    <FitmentSection tyre={item?.productId} h1tag="Tyre Sizing & Fitment Gallery" />

                    {item?.content?.bottomContent && (
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative flex border-b border-white/10 pb-4 items-center gap-3 mb-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                                    <FiStar className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between flex-1">
                                    <div>
                                        <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                                            Why Riders Choose Apollo Tramplr XR
                                        </h2>
                                        <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                                            More Specs & Insights
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                {renderMarkdownContent(item.content.bottomContent)}
                            </div>
                        </div>
                    )}
                </div>

                <div className="sticky top-24 h-fit">
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 lg:p-6 backdrop-blur-xl shadow-xl space-y-5">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <div
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                                style={{
                                    background: `linear-gradient(to bottom right, #f9731633, #f973161A)`,
                                    boxShadow: `0 0 0 1px #f973164D, 0 0 14px #f9731626`
                                }}
                            >
                                <FiZap size={18} style={{ color: '#f97316' }} />
                            </div>
                            <div>
                                <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                                    Featured Product
                                </h2>
                                <p className="text-zinc-500 text-[10px] mt-0.5">
                                    Get this tyre for your ride
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <Carousel
                                items={Array.isArray(product) ? product : (product ? [product] : [])}
                                itemWidth="w-[280px] md:w-[300px] lg:w-[350px]"
                                renderItem={(tyre) => (
                                    <TyreCard product={tyre} />
                                )}
                                gap={16}
                                showArrows={true}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {faqs.length > 0 && (
                <FAQSection faqs={faqs} />
            )}
        </div>
    );
}
