"use client";
import React, { useState } from 'react';
import CustomImage from '@/components/molecules/CustomImage';
import Link from 'next/link';
import { FiTrendingUp, FiEye, FiMousePointer, FiAward, FiCheck, FiX, FiChevronDown, FiChevronUp, FiCalendar, FiZap, FiTarget, FiStar, FiHeart, FiShield, FiTag, FiHeadphones } from 'react-icons/fi';
import { FaMotorcycle } from 'react-icons/fa6';
import { GiCarWheel, GiTyre } from 'react-icons/gi';
import WhatsAppButton from '@/components/atoms/WhatsAppButton';
import FAQSection from '@/components/atoms/FAQSection';
import Description from '../TyreComponent/Description';
import FitmentSection from '../TyreComponent/FitmentSection';


function StatPill({ icon: Icon, label, value, accent = false }) {
    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${accent ? 'bg-orange-500/10 border-orange-500/30' : 'bg-white/[0.03] border-white/10'}`}>
            <div className={`p-2 rounded-xl ${accent ? 'bg-orange-500/20' : 'bg-white/5'}`}>
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
                if (!trimmed) return null;

                const isHeadingBlock = trimmed.startsWith('#') || (
                    !trimmed.includes('\n') &&
                    !trimmed.endsWith('.') &&
                    !trimmed.startsWith('-') &&
                    !trimmed.startsWith('*') &&
                    trimmed.length < 100
                );

                if (isHeadingBlock) {
                    let title = trimmed;
                    if (trimmed.startsWith('#')) {
                        title = trimmed.replace(/^#+\s*/, '');
                    }
                    return (
                        <h2 key={index} className="text-sm md:text-lg font-semibold uppercase tracking-[0.25em] text-orange-500 mb-2">
                            {title}
                        </h2>
                    );
                }

                if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
                    const items = trimmed.split('\n').map(item => item.replace(/^[-*]\s*/, '').trim()).filter(Boolean);
                    return (
                        <ul key={index} className="space-y-2 my-2 list-none">
                            {items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-zinc-400 text-xs md:text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0 " />
                                    <span>{item}</span>
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
                                const [key, val] = line.split(':');
                                return (
                                    <p key={idx} className="text-xs md:text-sm flex justify-between max-w-xs border-b border-white/5 py-1.5">
                                        <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">{key.trim()}</span>
                                        <span className="text-orange-400 font-black">{val.trim()}</span>
                                    </p>
                                );
                            }
                            return (
                                <p key={idx} className="text-xs md:text-base text-zinc-400 leading-relaxed">
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
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0 " />
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
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
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
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
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
    const product = item?.productId;
    const score = item?.trendScore;
    const faqs = item?.faqs || [];
    const bikeBrand = bike?.bikeId?.brandId?.brandName || bike?.bikeId?.brandId;
    console.log(item)

    return (
        <div className="flex flex-col gap-4">
            <div className="relative w-full h-[60vh] min-h-[450px] rounded-3xl overflow-hidden">
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
                        #{item?.sortOrder} Trending · {item?.trendType}
                    </span>
                </div>

                <div className="absolute lg:top-6 lg:right-6 top-2 hidden md:flex right-2 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full lg:px-4 lg:py-2 px-2 py-1">
                    <FiTrendingUp className="text-emerald-400" />
                    <span className="text-xs md:text-sm font-black text-emerald-400">{score?.totalScore}%</span>
                    <span className="text-xs text-zinc-400">Trend Score</span>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-2 md:p-10 flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 text-xs font-medium text-white">
                            <FaMotorcycle className="text-zinc-300" />
                            <span>{bikeBrand} {bike?.bikeModel}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 text-xs font-medium text-white">
                            <GiCarWheel className="text-zinc-300" />
                            <span>{product?.productName}</span>
                        </div>
                    </div>
                    <h1 className="text-xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none max-w-4xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-orange-400">{item?.name}</span>
                    </h1>
                    <p className="text-zinc-300 text-xs lg:text-sm md:text-base font-light max-w-2xl italic leading-relaxed border-l-4 border-orange-500 pl-4">
                        {item?.shortDescription}
                    </p>
                </div>

                <div className="absolute bottom-0 right-0 p-6 md:p-10 hidden lg:flex flex-col gap-3 max-w-[250px]">
                    <StatPill icon={FiEye} label="Views" value={(item?.totalViews || 0).toLocaleString()} />
                    <StatPill icon={FiHeart} label="Likes" value={(item?.totalClicks || 0).toLocaleString()} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
                    {item?.description && (
                        <div className="space-y-2">
                            <p className="text-sm md:text-lg font-semibold uppercase tracking-[0.25em] text-orange-500">
                                Trending Overview
                            </p>
                            <div className="max-w-3xl text-xs md:text-base text-zinc-400">
                                {renderDescription(item.description)}
                            </div>
                        </div>
                    )}

                    <div className="border-t border-white/10" />

                    {item?.content?.topContent && (
                        <div className="relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/[0.02] rounded-full blur-3xl pointer-events-none" />
                            {renderMarkdownContent(item.content.topContent)}
                        </div>
                    )}

                    <Description tyre={product} desClassName="hidden" />
                    <FitmentSection tyre={product} h1tag="Tyre Sizing & Fitment Gallery" />

                    {item?.content?.bottomContent && (
                        <div className="bg-zinc-900/20 border border-white/5 rounded-3xl p-3 md:p-6 relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/[0.02] rounded-full blur-3xl pointer-events-none" />
                            {renderMarkdownContent(item.content.bottomContent)}
                        </div>
                    )}
                </div>

                <div className="sticky top-24 h-fit">
                    <div className="relative group rounded-3xl bg-zinc-950/60 backdrop-blur-xl overflow-hidden transition-all duration-500 ">

                        <div className="relative rounded-[22px] bg-zinc-900/95 p-3 md:p-6 flex flex-col gap-4 overflow-hidden">
                            <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] font-black uppercase tracking-wider text-emerald-400 shadow-sm">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                    </span>
                                    Fitment Verified
                                </span>

                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-[9px] font-black uppercase tracking-wider text-orange-400 shadow-sm">
                                    <span className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
                                    Rank #{item?.sortOrder || 1}
                                </span>
                            </div>

                            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden group/fitment">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover/fitment:translate-x-full transition-transform duration-1000" />

                                <div className="flex items-center justify-between text-[9px] text-zinc-500 font-black uppercase tracking-widest z-10">
                                    <span>Vehicle</span>
                                    <span>Tyre Match</span>
                                </div>

                                <div className="relative flex items-center justify-between gap-3 z-10">
                                    <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-white/10 z-0 pointer-events-none" />
                                    <div className="group/tooltip relative flex flex-col max-w-[42%] min-w-0 z-10 bg-zinc-900/80 p-2.5 rounded-xl border border-white/5 flex-1 shadow-inner cursor-default">
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider truncate">
                                            {bikeBrand}
                                        </span>
                                        <span className="text-xs font-black text-white truncate leading-tight uppercase mt-0.5">
                                            {bike?.bikeModel}
                                        </span>


                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-zinc-950 border border-white/10 text-white text-[10px] font-bold rounded-lg shadow-xl opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                                            {bikeBrand} {bike?.bikeModel}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-950" />
                                        </div>
                                    </div>

                                    <div className="relative z-10 shrink-0">
                                        <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 p-[1px] flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover/fitment:rotate-180 transition-transform duration-700">
                                            <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-orange-400">
                                                <GiCarWheel className="text-lg animate-[spin_12s_linear_infinite]" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group/tooltip relative flex flex-col max-w-[42%] min-w-0 text-right z-10 bg-zinc-900/80 p-2.5 rounded-xl border border-white/5 flex-1 shadow-inner cursor-default">
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider truncate">
                                            {product?.productName?.split(' ')?.[0]}
                                        </span>
                                        <span className="text-xs font-black text-white truncate leading-tight uppercase mt-0.5">
                                            {product?.productName?.split(' ')?.slice(1).join(' ')}
                                        </span>

                                        {/* Tooltip box */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-zinc-950 border border-white/10 text-white text-[10px] font-bold rounded-lg shadow-xl opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                                            {product?.productName}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-950" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 group/item">
                                    <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/5 border border-orange-500/20 text-orange-400 shadow-inner group-hover/item:scale-105 transition-transform duration-300">
                                        <FiZap className="text-xs" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-white uppercase tracking-wide leading-none">Check Availability</h4>
                                        <p className="text-[10px] text-zinc-400 mt-1 leading-normal">Verify live stock status, regional delivery timelines, and booking options.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 group/item">
                                    <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/5 border border-orange-500/20 text-orange-400 shadow-inner group-hover/item:scale-105 transition-transform duration-300">
                                        <FiStar className="text-xs" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-white uppercase tracking-wide leading-none">Best Price Match</h4>
                                        <p className="text-[10px] text-zinc-400 mt-1 leading-normal">Access real-time quotes, regional discounts, and seasonal offers.</p>
                                    </div>
                                </div>
                            </div>

                            <WhatsAppButton
                                text="Consult Fitment Expert (Free)"
                                value={`I'm looking at the ${product?.productName || 'tyre'} for my ${bike?.bikeModel || 'bike'}. Can you help with fitment, sizing and pricing?`}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-zinc-950/60 border border-white/5 backdrop-blur-xl transition-all duration-500 hover:border-orange-500/20">
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative p-3 md:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12 z-10">
                    <div className="flex flex-col gap-6 max-w-2xl text-left w-full">
                        <div className="space-y-3">
                            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-orange-500 font-bold">
                                Expert Assistance
                            </p>

                            <h2 className="text-xl md:text-xl font-black leading-tight text-white uppercase tracking-tight">
                                Confirm <span className='text-orange-500'>{product?.productName}</span> Fitment &amp; Availability for <span className='text-orange-500'>{bikeBrand} {bike?.bikeModel}</span>
                            </h2>

                            <p className="text-zinc-400 text-xs  leading-relaxed">
                                Our performance tyre experts will confirm the perfect fitment size, real-time stock levels, regional pricing, and delivery timelines for your motorcycle.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs md:text-sm text-zinc-400 w-full">
                            <div className="flex items-center gap-2">
                                <FiShield className="text-green-500 text-sm md:text-base" />
                                <span>Genuine Tyres</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <FiTag className="text-orange-500 text-sm md:text-base" />
                                <span>Best Price</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <FiHeadphones className="text-blue-500 text-sm md:text-base" />
                                <span>Expert Support</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <FiZap className="text-yellow-500 text-sm md:text-base" />
                                <span>Fast Response</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[320px] shrink-0 items-center lg:items-stretch">
                        <div className="relative group/btn w-full">
                            <div className="absolute inset-0 bg-green-500/20 rounded-xl blur-md opacity-40 group-hover/btn:opacity-75 transition-opacity" />
                            <WhatsAppButton
                                text={
                                    <span>
                                        Check Availability <span className="hidden md:inline">Before Stock Ends</span>
                                    </span>
                                }

                                value={`I'm checking stock availability and fitment of the ${product?.productName} for my ${bikeBrand} ${bike?.bikeModel}. Please confirm pricing and delivery times.`}

                            />
                        </div>
                        <p className="text-center text-[10px] text-zinc-500 font-medium">
                            Avg. 2 min reply time · 100% Free Consultation
                        </p>
                    </div>
                </div>
            </div>

            {faqs.length > 0 && (
                <FAQSection faqs={faqs} />
            )}
        </div>
    );
}
