"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "@/components/molecules/CustomImage";
import Link from "next/link";
import { BikeBrandSkeletonGroup } from "./BikeBrandSkeleton";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import vehicleService from "@/services/vehicleService";

import Pagination from "@/components/atoms/Pagination";
import BikeCard from "../BikeCard";

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
                   
                    <h1 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                        SELECT YOUR <br />
                        <span className="text-orange-500 outline-text text-transparent">WEAPON</span>
                    </h1>
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
                       <BikeCard key={brand?._id} brand={brand} index={index} />
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
