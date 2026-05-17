"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { BikeBrandSkeletonGroup } from "./BikeBrandSkeleton";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import vehicleService from "@/services/vehicleService";

import Pagination from "@/components/atoms/Pagination";

function BikesClient({ initialBrands }) {
    const initialData = Array.isArray(initialBrands) ? initialBrands : initialBrands?.vehicleBrandsData || [];
    const initialPage = initialBrands?.pagination?.page || 1;
    const initialTotalPages = initialBrands?.pagination?.totalPages || 1;
    const initialTotalCount = initialBrands?.pagination?.totalCount || 0;

    const [brands, setBrands] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [page, setPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const [totalCount, setTotalCount] = useState(initialTotalCount);

    
    const topRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        if (debouncedQuery !== "") {
            setPage(1);
            fetchBrands(1, debouncedQuery);
        } else if (debouncedQuery === "") {
            setBrands(initialData);
            setPage(initialPage);
            setTotalPages(initialTotalPages);
            setTotalCount(initialTotalCount);
        }
    }, [debouncedQuery]);

    useEffect(() => {
        if (page !== initialPage || debouncedQuery !== "") {
            fetchBrands(page, debouncedQuery);
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [page]);

    async function fetchBrands(pageNum, query) {
        try {
            setLoading(true);
            const response = await vehicleService.getVehicleBrands({ 
                page: pageNum, 
                limit: 24, 
                query 
            });
            
            const responseData = Array.isArray(response) ? response : response?.vehicleBrandsData || [];
            const pagination = response?.pagination;
            
            setBrands(responseData);
            if (pagination) {
                setTotalPages(pagination.totalPages);
                setTotalCount(pagination.totalCount);
            }
        } catch (error) {
            console.error("Failed to fetch bike brands", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-8 md:space-y-12" ref={topRef}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 px-2">
                <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-zinc-900 border border-zinc-800 rounded-full w-fit">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full animate-pulse" />
                        <span className="text-[8px] lg:text-[10px] font-black text-white uppercase tracking-[0.3em] ">Vehicle Roster / Ready</span>
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                        SELECT YOUR <br />
                        <span className="text-orange-500 outline-text text-transparent">WEAPON</span>
                    </h2>
                </div>

                <div className="relative w-full md:max-w-md group">
                    <input
                        type="text"
                        placeholder="SEARCH BRAND..."
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl md:rounded-2xl px-5 py-4 md:px-6 md:py-5 text-sm md:text-base text-white font-black placeholder:text-zinc-700 focus:outline-none focus:border-orange-500 transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute right-5 md:right-6 top-1/2 -translate-y-1/2">
                        {loading && searchQuery ? (
                            <div className="animate-spin h-4 w-4 md:h-5 md:w-5 border-2 border-orange-500 border-t-transparent rounded-full" />
                        ) : (
                            <FiSearch size={20} className={searchQuery ? "text-orange-500" : "text-zinc-700"} />
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2">
                {loading ? (
                    <BikeBrandSkeletonGroup count={6} />
                ) : brands.length > 0 ? (
                    brands.map((brand, index) => (
                        <Link
                            key={brand._id}
                            href={`/bikes/${brand.identifier || brand.bikeBrand.toLowerCase().replace(/\s+/g, '-')}`}
                            className="group relative h-[24rem] md:h-[30rem] bg-zinc-950 border border-zinc-900 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden hover:border-orange-500/50 transition-all duration-700 shadow-2xl"
                        >
                            <div className="absolute inset-0">
                                <Image
                                    src={brand?.heroImage}
                                    alt={`${brand?.bikeBrand}`}
                                    fill
                                    priority={index < 6}
                                    className="object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110 saturate-[0.1] md:saturate-[0.1] group-hover:saturate-100 group-hover:brightness-110"
                                />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                            
                            <div className="absolute inset-0 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                <div className="absolute top-6 left-6 md:top-8 md:left-8 w-8 h-8 md:w-12 md:h-12 border-t-2 border-l-2 border-orange-500/50" />
                                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-8 h-8 md:w-12 md:h-12 border-b-2 border-r-2 border-orange-500/50" />
                                
                                <div className="absolute top-8 left-8 hidden lg:flex flex-col gap-1">
                                    <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest animate-pulse">READY FOR DEPLOYMENT</span>
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">ID: TB-00{index + 1}</span>
                                </div>
                            </div>

                            <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10 z-30 space-y-3 md:space-y-4 w-[80%]">
                                <div className="space-y-0">
                                    <span className="text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] block mb-1 md:mb-2 opacity-100 lg:opacity-0 group-hover:opacity-100 translate-y-0 lg:translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        Elite Grade
                                    </span>
                                    <h3 className="text-4xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none transition-transform duration-500 group-hover:-translate-y-2">
                                        {brand.bikeBrand}
                                    </h3>
                                    <p className="text-zinc-500 text-[10px] md:text-sm font-black uppercase tracking-widest mt-1 md:mt-2">
                                        Performance Intent
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 md:gap-4 pt-2 md:pt-4 opacity-100 lg:opacity-0 group-hover:opacity-100 translate-y-0 lg:translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                    <div className="px-4 py-1.5 md:px-6 md:py-2 bg-orange-500 text-black text-[8px] md:text-[10px] font-black uppercase tracking-widest rounded-full">
                                        Enter Roster
                                    </div>
                                    <FiArrowRight size={16} className="text-white group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>

                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full py-20 md:py-32 text-center border-2 border-dashed border-zinc-900 rounded-[2rem] md:rounded-[3rem] bg-zinc-950 mx-2">
                        <div className="inline-flex items-center gap-3 px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] rounded-full mb-6 md:mb-8">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                            System Failure
                        </div>
                        <p className="text-zinc-500 text-2xl md:text-4xl font-black uppercase tracking-tighter">No Brands Located</p>
                        <button
                            onClick={() => setSearchQuery("")}
                            className="mt-8 md:mt-12 text-zinc-400 hover:text-white font-black uppercase tracking-[0.3em] text-[10px] transition-colors border-b border-zinc-800 pb-2"
                        >
                            REBOOT SEARCH
                        </button>
                    </div>
                )}
            </div>

            <div className="">
                <Pagination 
                    page={page}
                    totalPages={totalPages}
                    totalCount={totalCount}
                    onPageChange={setPage}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default BikesClient;
