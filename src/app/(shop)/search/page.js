'use client';
import React, { useState, useCallback, useMemo, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import WhatsAppButton from '@/components/atoms/WhatsAppButton';
import Checkbox from '@/components/atoms/Checkbox';
import CustomDropdown from '@/components/atoms/CustomDropdown';
import searchServiceInstance from '@/services/searchService';
import { FiTarget, FiCloudRain, FiMap, FiSettings, FiArrowRight, FiStar, FiCalendar, FiTrendingUp, FiTag, FiEye, FiCompass } from 'react-icons/fi';

const getDeterministicRating = (id = '') => {
    let hash = 0;
    const str = String(id || 'default');
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const val = 4.5 + (Math.abs(hash) % 6) * 0.1;
    return val.toFixed(1);
};

const getDeterministicViews = (id = '') => {
    let hash = 0;
    const str = String(id || 'default');
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return (Math.abs(hash) % 9900) + 100;
};

const ViewDetailsButton = ({ text = "View Details" }) => (
    <div className="mt-4 px-4 inline-flex items-center justify-center w-full py-3 max-w-fit rounded-xl bg-orange-500 py-1 text-sm font-semibold text-white hover:bg-orange-400 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 ease-in-out gap-1"
    >
        <span>{text}</span>
        <FiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
    </div>
);

const Card = ({ item }) => {
    const router = useRouter();
    switch (item.type) {
        case 'Tyre Sizes': {
            const sizeSlug = item.size ? item.size.toLowerCase().replace(/[\s/]/g, '-') : '';
            const parentSlug = item.availableTyres?.identifier || item.identifier.replace(`-${sizeSlug}`, '');
            const route = `/tyres/${parentSlug}/${sizeSlug}`;
            return (
                <article onClick={() => router.push(route)} className="group relative cursor-pointer grid grid-cols-1 md:grid-cols-[35%_65%] md:h-auto rounded-2xl border border-gray-300/40 bg-white/10 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/5">
                    <div className="relative aspect-[16/9] md:aspect-auto md:h-full w-full border-r border-zinc-800/30 overflow-hidden flex items-center justify-center">
                        <div className="relative w-full h-full min-h-[140px] md:min-h-0">
                            <Image
                                src={item.availableTyres?.productImages?.[0] || '/newlogo.webp'}
                                alt={item.hero?.title || item.size}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-4 left-4 rounded-full border border-orange-500/30 bg-orange-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-400 backdrop-blur-md">
                            Size
                        </div>
                    </div>
                    <div className="p-4 space-y-2 flex flex-col justify-between h-full min-w-0">
                        <div className="space-y-2 flex-1 flex flex-col justify-center">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-orange-400">
                                    {item.availableTyres?.productName || "Tyre Size"}
                                </span>
                            </div>
                            <h3 className="text-lg md:text-xl xl:text-2xl font-extrabold text-white leading-snug line-clamp-2">
                                {item.hero?.title || item.size}
                            </h3>
                            <div className="flex flex-wrap gap-2 text-xs text-zinc-400 pt-1">
                                <span className="bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-zinc-300 font-medium">
                                    Size: {item.size}
                                </span>
                                <span className={`border px-2.5 py-0.5 rounded-full font-medium ${item.availability === "in_stock" ? 'border-green-500/20 bg-green-500/10 text-green-400' : item.availability === "backorder" ? 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400' : item.availability === "preorder" ? 'border-blue-500/20 bg-blue-500/10 text-blue-400' : 'border-red-500/20 bg-red-500/10 text-red-400'}`}>
                                    {item.availability === "in_stock" ? 'In Stock' : item.availability === "backorder" ? 'Available For Order' : item.availability === "preorder" ? 'Pre Order' : 'Out of Stock'}
                                </span>
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-normal">
                                {item.hero?.subtitle}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 ">
                            {item.price ? (
                                <div className="flex gap-2 items-baseline">
                                    <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                        ₹{item.price.toLocaleString()}
                                    </span>
                                    <span className="text-[10px] text-zinc-400 font-medium whitespace-nowrap">
                                        (inc. all taxes)
                                    </span>
                                </div>
                            ) : (
                                <div />
                            )}
                            <div className="flex items-center justify-end">
                                <ViewDetailsButton text="View Details" />
                            </div>
                        </div>
                    </div>
                </article>
            );
        }
        case 'Tyre': {
            const rating = getDeterministicRating(item._id || item.identifier);
            const quickFacts = item.quickFacts || item.aiSearch?.quickFacts || {};
            return (
                <article onClick={() => router.push(`/tyres/${item.identifier}`)} className="group relative cursor-pointer grid grid-cols-1 md:grid-cols-[35%_65%] md:h-auto rounded-2xl border border-gray-300/40 bg-white/10 hover:bg-orange-500/10 hover:border-orange-500/40 transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl hover:shadow-orange-500/5">
                    <div className="relative h-[180px] md:h-full w-full overflow-hidden bg-zinc-950 aspect-[16/9] md:aspect-auto">
                        <Image
                            src={item.hero?.heroImage || '/newlogo.webp'}
                            alt={item.productName || item.hero?.title || "Motorcycle Tyre"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-4 left-4 rounded-full border border-orange-500/30 bg-orange-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-400 backdrop-blur-md">
                            Tyre
                        </div>
                    </div>
                    <div className="p-4 flex flex-col justify-between h-full min-w-0 space-y-4">
                        <div className="space-y-2 flex-1 flex flex-col justify-center">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(`/brands/${item.brand?.identifier || item.brand?.name?.toLowerCase()}`);
                                }}
                                className="text-[10px] uppercase tracking-[0.2em] font-semibold text-orange-400 hover:text-white transition-colors w-fit text-left"
                            >
                                {item.brand?.name || 'Brand'}
                            </button>
                            <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-white leading-snug line-clamp-2">
                                {item.productName || item.hero?.title}
                            </h3>
                            <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                                {(item.categoryName || item.commonlyUsedOn) && (
                                    <span className="flex items-center gap-1 bg-white/10 border border-gray-300/30 px-2.5 py-0.5 rounded-full text-zinc-300 font-medium truncate max-w-[200px]">
                                        <FiTag className="text-orange-400 shrink-0 text-xs w-3 h-3" />
                                        <span>{item.categoryName || item.commonlyUsedOn}</span>
                                    </span>
                                )}
                                {item?.frontSizes?.length > 0 && (
                                    <span className="bg-white/10 border border-gray-300/30 px-2.5 py-0.5 rounded-full text-zinc-300 font-medium">
                                        Front: {item.frontSizes.slice(0, 2).join(', ')}
                                        {item.frontSizes.length > 2 && <span className="ml-1 text-[10px] text-zinc-400">+{item.frontSizes.length - 2}</span>}
                                    </span>
                                )}
                                {item?.rearSizes?.length > 0 && (
                                    <span className="bg-white/10 border border-gray-300/30 px-2.5 py-0.5 rounded-full text-zinc-300 font-medium">
                                        Rear: {item.rearSizes.slice(0, 2).join(', ')}
                                        {item.rearSizes.length > 2 && <span className="ml-1 text-[10px] text-zinc-400">+{item.rearSizes.length - 2}</span>}
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-x-4 gap-y-2  border-t border-zinc-800/40 text-xs text-zinc-400">
                                <div className="flex items-center gap-1.5 min-w-0" title={quickFacts.bestUse || item.bestSuitedFor?.[0]}>
                                    <FiTarget className="text-orange-400 shrink-0 text-xs w-3.5 h-3.5" />
                                    <span className="truncate">
                                        <span className="text-zinc-500 font-medium">Use:</span> {quickFacts?.bestUse || item.bestSuitedFor?.[0] || 'Sport Riding'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5 min-w-0" title={quickFacts?.wetGrip || item.bestSuitedFor?.[1]}>
                                    <FiCloudRain className="text-orange-400 shrink-0 text-xs w-3.5 h-3.5" />
                                    <span className="truncate">
                                        <span className="text-zinc-500 font-medium">Wet:</span> {quickFacts?.wetGrip || item.bestSuitedFor?.[1] || 'Excellent'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5 min-w-0" title={quickFacts?.mileage || item.bestSuitedFor?.[2]}>
                                    <FiMap className="text-orange-400 shrink-0 text-xs w-3.5 h-3.5" />
                                    <span className="truncate">
                                        <span className="text-zinc-500 font-medium">Mileage:</span> {quickFacts?.mileage || item.bestSuitedFor?.[2] || '8,000–15,000 km'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5 min-w-0" title={quickFacts?.tyreType || item.bestSuitedFor?.[3]}>
                                    <FiSettings className="text-orange-400 shrink-0 text-xs w-3.5 h-3.5" />
                                    <span className="truncate">
                                        <span className="text-zinc-500 font-medium">Type:</span> {quickFacts?.tyreType || item.bestSuitedFor?.[3] || 'Hypersport'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-auto">
                            <ViewDetailsButton text="View Tyre Details" />
                        </div>
                    </div>
                </article>
            );
        }
        case 'Trending': {
            const route = `/trending/${item.slug || item.identifier}`;
            return (
                <article onClick={() => router.push(route)} className="group relative cursor-pointer grid grid-cols-1 md:grid-cols-[35%_65%] md:h-auto rounded-2xl border border-gray-300/40 bg-white/10 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl hover:shadow-orange-500/5">
                    <div className="relative h-[100px] md:h-full w-full overflow-hidden bg-zinc-950 aspect-[16/9] md:aspect-auto">
                        <Image
                            src={item.image || item.bannerImage || '/newlogo.webp'}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-conver transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-4 left-4 rounded-full border border-orange-500/30 bg-orange-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-400 backdrop-blur-md">
                            Featured
                        </div>
                    </div>
                    <div className="p-4 flex flex-col justify-between h-full min-w-0">
                        <div className="space-y-1 flex-1 flex flex-col justify-center">
                            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold w-fit flex items-center gap-1.5">
                                <span className='bg-white/10 border border-orange-500/20 px-2 py-0.5 rounded-full w-fit min-w-30 flex gap-2'><FiTrendingUp className="text-xs" /> Popular Now</span>
                            </div>
                            <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-white leading-snug line-clamp-2">
                                {item.name}
                            </h3>
                            {(item.bikeName || item.bike?.bikeModel) && (
                                <div className="flex flex-wrap gap-2 text-xs text-zinc-400 mt-1">
                                    <span className="bg-white/10 border border-gray-300/10 px-2.5 py-0.5 rounded-full text-zinc-300 font-medium">
                                        Bike: {item.bikeName || item.bike.bikeModel}
                                    </span>
                                </div>
                            )}
                            <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                                {item.shortDescription || item.description}
                            </p>
                        </div>
                        <div className="flex items-center justify-end mt-auto pt-2">
                            <ViewDetailsButton text="Explore Feature" />
                        </div>
                    </div>
                </article>
            );
        }
        case 'Blogs': {
            const route = `/blogs/${item.slug || item.identifier}`;
            return (
                <article onClick={() => router.push(route)} className="group relative cursor-pointer grid grid-cols-1 md:grid-cols-[35%_65%] md:h-auto rounded-2xl border border-gray-300/40 bg-white/10 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl hover:shadow-orange-500/5">
                    <div className="relative h-[180px] md:h-full w-full overflow-hidden bg-zinc-950 aspect-[16/9] md:aspect-auto">
                        <Image
                            src={item.image || '/newlogo.webp'}
                            alt={item.header}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-4 left-4 rounded-full border border-orange-500/30 bg-orange-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-400 backdrop-blur-md">
                            Blog
                        </div>
                    </div>
                    <div className="p-5 flex flex-col justify-between h-full min-w-0">
                        <div className="space-y-1 flex-1 flex flex-col justify-center">
                            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-orange-400 flex items-center gap-1.5">
                              <div className='flex items-center gap-1.5 px-2 py-1 bg-white/10 border border-orange-300/10 rounded-full'><FiCalendar className="text-xs"/> Article</div>
                            </div>
                            <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-white leading-snug line-clamp-2">
                                {item.header}
                            </h3>
                            {item.tags && item.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 text-xs text-zinc-400 mt-1">
                                    {item.tags.slice(0, 2).map(tag => (
                                        <span key={tag} className="flex items-center gap-1 bg-white/10 border border-gray-300/10 px-2.5 py-0.5 rounded-full text-zinc-300 font-medium">
                                            <FiTag className="text-orange-400 shrink-0 text-xs w-3 h-3" />
                                            <span>{tag}</span>
                                        </span>
                                    ))}
                                </div>
                            )}
                            <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                                {item.subHeader}
                            </p>
                        </div>
                        <div className="flex items-center justify-end mt-auto pt-2">
                            <ViewDetailsButton text="Read Article" />
                        </div>
                    </div>
                </article>
            );
        }
        case 'Comparison': {
            const view = getDeterministicViews(item._id || item.identifier);
            const rating = getDeterministicRating(item._id || item.identifier);
            return (
                <article onClick={() => router.push(`/compare/${item.identifier}`)} className="group relative cursor-pointer grid grid-cols-1 md:grid-cols-[35%_65%] md:h-[240px] rounded-2xl border border-gray-300/40 bg-white/10 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl hover:shadow-orange-500/5">
                    <div className="relative grid h-[180px] md:h-full grid-cols-2 overflow-hidden w-full bg-zinc-950 aspect-[16/9] md:aspect-auto">
                        <div className="relative h-full w-full">
                            <Image
                                src={item.tyre1?.image || '/newlogo.webp'}
                                alt={item.tyre1?.productName || 'Tyre 1'}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative h-full w-full">
                            <Image
                                src={item.tyre2?.image || '/newlogo.webp'}
                                alt={item.tyre2?.productName || 'Tyre 2'}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                        <div className="absolute left-1/2 top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/80 backdrop-blur-md">
                            <span className="text-xs font-black tracking-wider text-white">VS</span>
                        </div>
                        <div className="absolute bottom-4 left-4 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-400 backdrop-blur-md">
                            Comparison
                        </div>
                    </div>
                    <div className="p-5 flex flex-col justify-between h-full min-w-0">
                        <div className="space-y-1 flex-1 flex flex-col justify-center">
                            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-orange-400 flex items-center gap-1.5">
                              <div className='flex items-center gap-1.5 px-2 py-1 bg-white/10 border border-orange-300/10 rounded-full'><FiCalendar className="text-xs"/> Tyre Comparison</div>
                            </div>
                            <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-white leading-snug line-clamp-1">
                                {item.tyre1?.productName} <span className="text-zinc-500 font-normal">vs</span> {item.tyre2?.productName}
                            </h3>
                            <div className="flex flex-wrap gap-2 text-xs text-zinc-400 mt-1">
                                <span className="flex items-center gap-1 bg-white/10 border border-gray-300/10 px-2.5 py-0.5 rounded-full text-zinc-300 font-medium">
                                    <FiStar className="text-amber-400 shrink-0 text-xs" />
                                    <span>{rating}</span>
                                </span>
                                <span className="flex items-center gap-1 bg-white/10 border border-gray-300/10 px-2.5 py-0.5 rounded-full text-zinc-300 font-medium">
                                    <FiEye className="text-orange-400 shrink-0 text-xs" />
                                    <span>{view}+ views</span>
                                </span>
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                                {item.seo?.description || 'Compare performance metrics, compounds, dry/wet grip, mileage, and user feedback.'}
                            </p>
                        </div>
                        <div className="flex items-center justify-end mt-auto pt-2">
                            <ViewDetailsButton text="Compare Tyres" />
                        </div>
                    </div>
                </article>
            );
        }
        case 'Bike': {
            return (
                <article onClick={() => router.push(`/bikes/${item.identifier}`)} className="group relative cursor-pointer grid grid-cols-1 md:grid-cols-[35%_65%] md:h-auto rounded-2xl border border-gray-300/40 bg-white/10 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/5">
                    <div className="relative h-[180px] md:h-full w-full overflow-hidden bg-zinc-950 aspect-[16/9] md:aspect-auto">
                        <Image
                            src={item.image || '/newlogo.webp'}
                            alt={item.bikeBrand && item.bikeModel ? `${item.bikeBrand} ${item.bikeModel}` : "Motorcycle"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-4 left-4 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-400 backdrop-blur-md">
                            Bike
                        </div>
                    </div>
                    <div className="p-4 flex flex-col justify-between h-full min-w-0">
                        <div className="space-y-1 flex-1 flex flex-col justify-center">
                            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-orange-400 flex items-center gap-1.5">
                              <div className='flex items-center gap-1.5 px-2 py-1 bg-white/10 border border-orange-300/10 rounded-full'>
                                  <FiCompass className="text-xs"/> {item.bikeBrand}
                              </div>
                            </div>
                            <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-white leading-snug line-clamp-2 mt-1">
                                {item.bikeModel}
                            </h3>
                            <div className="flex flex-wrap gap-2 text-xs text-zinc-400 mt-1">
                                <span className="bg-white/10 border border-gray-300/10 px-2.5 py-0.5 rounded-full text-zinc-300 font-medium">
                                    Motorcycle Fitment
                                </span>
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                                {item.subTitle || 'Find the exact compatible tyre models, performance recommendations, and dimensions.'}
                            </p>
                        </div>
                        <div className="flex items-center justify-end mt-auto">
                            <ViewDetailsButton text="View Details" />
                        </div>
                    </div>
                </article>
            );
        }
        default:
            return (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/95 p-4">
                    <h3 className="text-lg font-semibold text-white">{item.title || item.productName || 'Unknown Item'}</h3>
                    <p className="text-sm text-zinc-400 mt-2">{item.description || item.subTitle || 'No description available'}</p>
                </div>
            );
    }
};

const SearchResultSkeleton = () => (
    <article className="grid animate-pulse grid-cols-1 md:grid-cols-[40%_60%] md:h-[260px] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
        <div className="relative h-[160px] md:h-full overflow-hidden bg-zinc-900 w-full">
            <div className="absolute left-4 top-4 h-7 w-20 rounded-full bg-zinc-800" />
            <div className="absolute right-4 top-4 h-7 w-24 rounded-full bg-zinc-800" />
        </div>

        <div className="p-4 flex flex-col justify-between h-full">
            <div className="space-y-3 pb-2 min-h-0 flex-1 flex flex-col justify-start">
                <div className="h-3 w-24 rounded-full bg-zinc-800" />
                <div className="h-8 w-3/4 rounded-full bg-zinc-800" />

                <div className="flex flex-wrap gap-2 pt-1">
                    <div className="h-6 w-20 rounded-full bg-zinc-900" />
                    <div className="h-6 w-28 rounded-full bg-zinc-900" />
                </div>

                <div className="space-y-2 pt-2">
                    <div className="h-4 w-full rounded-full bg-zinc-800" />
                    <div className="h-4 w-11/12 rounded-full bg-zinc-800" />
                </div>
            </div>

            <div className="flex items-center justify-end mt-2 md:mt-0">
                <div className="h-11 w-[150px] rounded-xl bg-zinc-800" />
            </div>
        </div>
    </article>
);

function SearchPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryParam = searchParams.get('q') || '';
    const searchQuery = useMemo(() => queryParam, [queryParam]);
    const [sortBy, setSortBy] = useState('relevance');
    const [filters, setFilters] = useState({ brand: [], type: [], rating: 0, });
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [resultCounts, setResultCounts] = useState({ tyreIntent: 0, vehicleIntent: 0, comparison: 0 });
    const [filtersModal, setFiltersModal] = useState(false);

    useEffect(() => {
        const performSearch = async () => {
            if (!searchQuery.trim()) {
                setSearchResults([]);
                setTotalResults(0);
                setResultCounts({ tyreIntent: 0, vehicleIntent: 0, comparison: 0 });
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const results = await searchServiceInstance.search(searchQuery, { limit: 10, page: currentPage, category: filters.type.length > 0 ? filters.type.join(',') : undefined, brand: filters.brand.length > 0 ? filters.brand.join(',') : undefined, sorted: sortBy, rating: filters.rating > 0 ? filters.rating : undefined });
                if (results && results.results) {
                    const flattenedResults = [];
                    const counts = { tyreIntent: 0, vehicleIntent: 0, comparison: 0 };

                    if (results.results.tyreIntent?.data) {
                        const tyresWithType = results.results.tyreIntent.data.map(item => ({ ...item, type: 'Tyre' }));
                        flattenedResults.push(...tyresWithType);
                        counts.tyreIntent = results.results.tyreIntent.count || results.results.tyreIntent.data.length;
                    }

                    if (results.results.comparison?.data) {
                        const comparisonsWithType = results.results.comparison.data.map(item => ({ ...item, type: 'Comparison' }));
                        flattenedResults.push(...comparisonsWithType);
                        counts.comparison = results.results.comparison.count || results.results.comparison.data.length;
                    }

                    if (results.results.vehicleIntent?.data) {
                        const bikesWithType = results.results.vehicleIntent.data.map(item => ({ ...item, type: 'Bike' }));
                        flattenedResults.push(...bikesWithType);
                        counts.vehicleIntent = results.results.vehicleIntent.count || results.results.vehicleIntent.data.length;
                    }

                    if (results.results.tyreSizes?.data) {
                        const tyreSizesWithType = results.results.tyreSizes.data.map(item => ({ ...item, type: 'Tyre Sizes' }));
                        flattenedResults.push(...tyreSizesWithType);
                    }

                    if (results.results.blogs?.data) {
                        const blogsWithType = results.results.blogs.data.map(item => ({ ...item, type: 'Blogs' }));
                        flattenedResults.push(...blogsWithType);
                    }

                    if (results.results.trending?.data) {
                        const trendingWithType = results.results.trending.data.map(item => ({ ...item, type: 'Trending' }));
                        flattenedResults.push(...trendingWithType);
                    }

                    // Sort flattened results by relevance score descending
                    flattenedResults.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));

                    setSearchResults(flattenedResults);
                    setTotalResults(flattenedResults.length);
                    setResultCounts(counts);
                } else {
                    setSearchResults([]);
                    setTotalResults(0);
                    setResultCounts({ tyreIntent: 0, vehicleIntent: 0, comparison: 0 });
                }
            } catch (err) {
                setError('Failed to load search results');
                setSearchResults([]);
                setTotalResults(0);
                setResultCounts({ tyreIntent: 0, vehicleIntent: 0, comparison: 0 });
                console.error('Search error:', err);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(performSearch, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery, filters, sortBy, currentPage]);

    const brands = ['Pirelli', 'Michelin', 'Metzeler',];
    const types = ['Sports', 'Touring', 'Cruiser', 'Off-road',];

    const toggleFilter = useCallback((filterType, value) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: prev[filterType].includes(value)
                ? prev[filterType].filter((item) => item !== value)
                : [...prev[filterType], value],
        }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({ brand: [], type: [], rating: 0, });
    }, []);

    const breadcrumbItems = [
        {
            label: queryParam ? `Results for "${queryParam}"` : 'Results',
            href: '/search',
            isLast: true,
        },
    ];

    return (
        <div className="flex flex-col flex-1 min-h-0 space-y-4">
            <Breadcrumb items={breadcrumbItems} />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_1fr] relative flex flex-col flex-1 min-h-0 overflow-hidden">
                <aside className="hidden lg:block lg:sticky top-0 self-start mb-4 max-h-[calc(91vh-5rem)] overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className=" text-xl font-semibold text-white">Filters</h2>
                        </div>
                        {filters && (filters.brand.length > 0 || filters.type.length > 0 || filters.rating > 0) && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="text-sm text-zinc-400 transition hover:text-white"
                            >
                                Clear all
                            </button>
                        )}
                    </div>

                    <div className="space-y-4 overflow-y-auto h-full flex-1 ">
                        <div>
                            <h3 className="text-sm font-semibold text-white">Brands</h3>
                            <div className="mt-3 grid gap-2 ">
                                {brands.map((brand) => (
                                    <label key={brand} className="inline-flex items-center gap-3 rounded-lg  border border-gray-300/30 bg-white/10 px-4 py-3 text-sm text-zinc-300 transition hover:border-orange-500 hover:text-white">
                                        <Checkbox
                                            checked={filters.brand.includes(brand)}
                                            onChange={() => toggleFilter("brand", brand)}
                                        />
                                        <span>{brand}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white">Type</h3>
                            <div className="mt-3 grid gap-2">
                                {types.map((type) => (
                                    <label key={type} className="inline-flex items-center gap-3 rounded-lg  border border-gray-300/30 bg-white/10 px-4 py-3 text-sm text-zinc-300 transition hover:border-orange-500 hover:text-white">
                                        <Checkbox
                                            checked={filters.type.includes(type)}
                                            onChange={() => toggleFilter("type", type)}
                                        />
                                        <span>{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* <div>
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-white">Minimum rating</h3>
                                {filters?.rating > 0 && (<span className="text-sm text-zinc-400">{filters.rating}+</span>)}
                            </div>
                            <div className="mt-3 grid gap-2 border border-zinc-800 rounded-xl p-2 bg-zinc-900/95">
                                {[0, 4, 4.5].map((rating) => (
                                    <label key={rating} className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300 transition hover:border-orange-500 hover:text-white">
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={rating}
                                            checked={filters.rating === rating}
                                            onChange={() => setFilters((prev) => ({ ...prev, rating }))}
                                            className="h-4 w-4 cursor-pointer border border-zinc-800 bg-transparent text-black accent-white focus:ring-0 focus:ring-offset-0 " />
                                        <span>{rating === 0 ? 'All ratings' : `${rating}+ stars`}</span>
                                    </label>
                                ))}
                            </div>
                        </div> */}
                    </div>
                </aside>
                <div className='relative flex flex-col flex-1 max-h-[calc(93vh-5rem)] md:max-h-[calc(90vh-5rem)] lg:max-h-[calc(91vh-5rem)]'>
                    <div className="flex items-center justify-between mb-4">
                        <div className='hidden lg:block '>
                            <p className=" text-lg font-semibold text-white w-full">
                                {loading ? 'Searching...' : `${totalResults} Results${searchQuery ? ` for "${searchQuery}"` : ''}`}
                            </p>
                        </div>

                        <button onClick={() => setFiltersModal(true)} className="lg:hidden px-6 rounded-lg py-1 font-bold text-sm bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 active:scale-95 transition-all">
                            Filter
                        </button>
                        {filtersModal && (
                            <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
                                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <div className="flex items-center justify-between p-5 border-b border-zinc-800">
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-xl font-bold text-white">Filters</h2>
                                        </div>
                                        <button onClick={() => setFiltersModal(false)} className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scroll">
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Brands</h3>
                                                <span className="text-[10px] text-zinc-600 font-medium">{brands.length} Available</span>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2">
                                                {brands.map((brand) => (
                                                    <label key={brand} className={`flex items-center gap-3 rounded-xl border p-4 transition-all duration-200 cursor-pointer ${filters.brand.includes(brand) ? 'border-orange-500 bg-orange-500/5 text-white' : 'border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700'}`}>
                                                        <Checkbox
                                                            checked={filters.brand.includes(brand)}
                                                            onChange={() => toggleFilter("brand", brand)}
                                                            className={filters.brand.includes(brand) ? 'bg-orange-500 border-orange-500' : ''}
                                                        />
                                                        <span className="text-sm font-medium">{brand}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Type</h3>
                                                <span className="text-[10px] text-zinc-600 font-medium">{types.length} Available</span>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2">
                                                {types.map((type) => (
                                                    <label key={type} className={`flex items-center gap-3 rounded-xl border p-4 transition-all duration-200 cursor-pointer ${filters.type.includes(type) ? 'border-orange-500 bg-orange-500/5 text-white' : 'border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700'}`}>
                                                        <Checkbox
                                                            checked={filters.type.includes(type)}
                                                            onChange={() => toggleFilter("type", type)}
                                                            className={filters.type.includes(type) ? 'bg-orange-500 border-orange-500' : ''}
                                                        />
                                                        <span className="text-sm font-medium">{type}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="p-5 border-t border-zinc-800 bg-zinc-900/50 flex gap-3">
                                        <button
                                            onClick={clearFilters}
                                            className="flex-1 py-3 px-4 rounded-xl border border-zinc-800 text-zinc-400 font-semibold text-sm hover:bg-zinc-800 transition-colors"
                                        >
                                            Clear All
                                        </button>
                                        <button
                                            onClick={() => setFiltersModal(false)}
                                            className="flex-[2] py-3 px-4 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                                        >
                                            Apply Filters
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}


                        <div className="flex items-center gap-1 lg:gap-2">
                            <span className="text-xs lg:text-sm text-zinc-400 min-w-[3rem] md:min-w-[3.25rem]">Sort by:</span>
                            <CustomDropdown searchable={false} placeholder="Sort By"
                                options={[
                                    { label: 'Relevance', value: 'relevance' },
                                    { label: 'Newest', value: 'newest' },
                                    { label: 'Oldest', value: 'oldest' },
                                ]}
                                value={sortBy} onChange={(option) => setSortBy(option.value)} buttonClassName="text-xs lg:text-sm h-6 md:h-8"
                            />
                        </div>
                    </div>

                    <main className="space-y-4  overflow-y-auto custom-scroll  flex flex-col flex-1 max-h-[calc(93vh-5rem)]">
                        {loading ? (
                            <div className="grid gap-4 grid-cols-1">
                                <SearchResultSkeleton />
                                <SearchResultSkeleton />
                                <SearchResultSkeleton />
                            </div>
                        ) : error ? (
                            <div className="rounded-xl border border-red-800 bg-red-900/20 p-12 text-center text-white shadow-lg shadow-black/20">
                                <p className="text-sm text-red-300">Search Error</p>
                                <h3 className="mt-3 text-2xl font-semibold">{error}</h3>
                                <p className="mt-2 text-sm text-zinc-400">Please try again or contact support if the problem persists.</p>
                                <div className='flex gap-4 '>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="mt-4 inline-flex items-center justify-center w-full py-3 w-[120px] rounded-xl bg-red-500 py-1 text-sm font-semibold text-white hover:bg-red-400 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 ease-in-out"
                                    >
                                        Retry
                                    </button>
                                    <WhatsAppButton value={`I'm experiencing an issue with the search functionality. Please assist.`} text='Contact Support' className="w-[150px] mt-4" />
                                </div>
                            </div>
                        ) : searchResults.length > 0 ? (
                            <div className="grid gap-4 grid-cols-1 mr-1">
                                {searchResults.map((item, index) => (
                                    <div key={item.id || index}>
                                        <Card item={item} />
                                    </div>
                                ))}
                            </div>
                        ) : searchQuery && !loading && !error ? (
                            <div className="rounded-xl border border-zinc-800 bg-zinc-900/95 p-12 text-center text-white shadow-lg shadow-black/20">
                                <p className="text-sm text-orange-300">No matches found</p>
                                <h3 className="mt-3 text-2xl font-semibold">Try another query or loosen filters</h3>
                                <p className="mt-2 text-sm text-zinc-400">We couldn&apos;t find tyres matching your current selection.</p>
                                <div className='flex items-center justify-center gap-4 w-full mx-auto max-w-lg pt-4'>
                                    <button
                                        onClick={clearFilters}
                                        className=" inline-flex items-center justify-center w-full py-3 w-[120px] rounded-xl bg-orange-500 py-1 text-sm font-semibold text-white hover:bg-orange-400 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 ease-in-out"
                                    >
                                        Reset filters
                                    </button>
                                    <WhatsAppButton value={`Hi, I couldn't find what I was looking for. Do you have any stock or recommendations for ${searchQuery}?`} text='Ask an Expert' />
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-xl border border-zinc-800 bg-zinc-900/95 p-12 text-center text-white shadow-lg shadow-black/20">
                                <p className="text-sm text-orange-300">Start your search</p>
                                <h3 className="mt-3 text-2xl font-semibold">Enter a search term to find tyres</h3>
                                <p className="mt-2 text-sm text-zinc-400">Use the search bar above to find tyres, bikes, or comparisons.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

function SearchPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col flex-1 min-h-0 space-y-4">
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
                        <p className="text-zinc-400">Loading search...</p>
                    </div>
                </div>
            </div>
        }>
            <SearchPageContent />
        </Suspense>
    );
}

export default SearchPage;