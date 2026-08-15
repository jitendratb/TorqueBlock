"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { BikeBrandSkeletonGroup } from "./BikeBrandSkeleton";
import { FiRotateCcw, FiAlertCircle } from "react-icons/fi";
import vehicleService from "@/services/vehicleService";

import BikeCard from "../BikeCard";
import TyresPageBanner from "../TyresPageBanner";
import CompareSearch from "../../compare/components/CompareSearch";

function BikesClient({ initialBrands }) {
    const initialData = Array.isArray(initialBrands) ? initialBrands : initialBrands?.vehicleBrandsData || [];
    const initialPage = initialBrands?.pagination?.page || 1;
    const initialTotalPages = initialBrands?.pagination?.totalPages || 1;

    const [brands, setBrands] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [page, setPage] = useState(initialPage);
    const [hasMore, setHasMore] = useState(initialPage < initialTotalPages);

    const observerTarget = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        if (debouncedQuery !== "") {
            setPage(1);
            fetchBrands(1, debouncedQuery, false);
        } else {
            setBrands(initialData);
            setPage(initialPage);
            setHasMore(initialPage < initialTotalPages);
        }
    }, [debouncedQuery]);

    useEffect(() => {
        if (page > 1) {
            fetchBrands(page, debouncedQuery, true);
        }
    }, [page]);

    const handleLoadMore = useCallback(() => {
        if (hasMore && !loading) {
            setPage((prev) => prev + 1);
        }
    }, [hasMore, loading]);

    useEffect(() => {
        if (!hasMore || loading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    handleLoadMore();
                }
            },
            { threshold: 0.1, rootMargin: "150px" }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasMore, loading, handleLoadMore]);

    async function fetchBrands(pageNum, query, isAppend = false) {
        try {
            setLoading(true);
            const response = await vehicleService.getVehicleBrands({
                page: pageNum,
                limit: 16,
                query
            });

            const responseData = response?.vehicleBrandsData;
            const pagination = response?.pagination;

            if (isAppend && pageNum > 1) {
                setBrands(prev => [...prev, ...responseData]);
            } else {
                setBrands(responseData);
            }

            if (pagination) {
                setHasMore(pageNum < pagination.totalPages);
            } else {
                setHasMore(responseData.length >= 16);
            }
        } catch (error) {
            console.error("Failed to fetch bike brands", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-4">
            <TyresPageBanner
                badge="Exclusive Brands"
                title="Motorcycle Brands"
                description="Find precision-engineered tyres built specifically for your motorcycle brand and model."
            />



            <div className="flex justify-end  gap-4 ">


                <CompareSearch
                    searchQuery={searchQuery}
                    onSearchChange={(e) => setSearchQuery(e.target.value)}
                    onClear={() => setSearchQuery("")}
                    loading={loading && page === 1}
                    placeholder="SEARCH BRAND..."
                    className="w-full "
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {loading && page === 1 ? (
                    <BikeBrandSkeletonGroup count={8} />
                ) : brands.length > 0 ? (
                    <>
                        {brands.map((brand, index) => (
                            <BikeCard key={brand?._id || index} brand={brand} index={index} />
                        ))}
                        {loading && page > 1 && (
                            <BikeBrandSkeletonGroup count={4} />
                        )}
                    </>
                ) : (
                    <div className="col-span-full py-16 md:py-24 text-center border border-dashed border-zinc-800/80 rounded-3xl bg-white/10 backdrop-blur-xl mx-2 px-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                            <FiAlertCircle size={14} />
                            <span>No Results Found</span>
                        </div>
                        <h3 className="text-zinc-200 text-xl md:text-3xl font-black uppercase tracking-tight mb-2">
                            No Matching Brands Found
                        </h3>
                        <p className="text-zinc-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed mb-6">
                            {searchQuery ? (
                                <>We couldn't find any motorcycle brands matching <span className="text-orange-400 font-semibold">"{searchQuery}"</span>. Please try refining your query or clear the search.</>
                            ) : (
                                <>No motorcycle brands are currently available. Please check back later.</>
                            )}
                        </p>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:border-orange-500/40 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-lg"
                            >
                                <FiRotateCcw size={14} className="text-orange-500" />
                                <span>Reset Search</span>
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div ref={observerTarget} className=" w-full" />
        </div>
    );
}

export default BikesClient;
