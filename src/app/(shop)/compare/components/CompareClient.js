"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { FiSearch, FiChevronRight } from "react-icons/fi";
import useCompareStore from "@/stores/compareStore";
import CompareBanner from "./CompareBanner";
import ComparisonCard from "./ComparisonCard";
import CardSkeleton from "./CardSkeleton";

function CompareClient({ initialComparisons, initialPage, initialTotalPages, initialTotalCount }) {
    const { comparisons: storeComparisons, loading, fetchComparisons, hasMore } = useCompareStore();
    const [comparisons, setComparisons] = useState(initialComparisons || []);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [page, setPage] = useState(initialPage || 1);
    const [totalPages, setTotalPages] = useState(initialTotalPages || 1);

    const observerTarget = useRef(null);

    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleResetSearch = useCallback(() => {
        setSearchQuery("");
    }, []);

    useEffect(() => {
        if (storeComparisons) {
            setComparisons(storeComparisons);
        }
    }, [storeComparisons]);

    // Handle search query debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Fetch on search query change
    useEffect(() => {
        if (debouncedQuery !== "") {
            setPage(1);
            fetchComparisons({ page: 1, limit: 12, search: debouncedQuery });
        } else {
            if (initialComparisons) {
                setComparisons(initialComparisons);
            }
            setPage(initialPage || 1);
        }
    }, [debouncedQuery]);

    // Fetch on page change (for infinite scrolling load more)
    useEffect(() => {
        if (page > 1) {
            fetchComparisons({ page, limit: 12, search: debouncedQuery });
        }
    }, [page]);

    // Infinite scroll observer setup
    useEffect(() => {
        if (!hasMore || loading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 0.1, rootMargin: "100px" }
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
    }, [hasMore, loading]);

    return (
        <div className="space-y-6 relative min-h-screen">
            <CompareBanner />
            
            <div className="flex justify-end">
                <div className="relative w-full md:max-w-md group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                    <input
                        type="text"
                        placeholder="SEARCH BATTLES..."
                        className="relative w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3.5 text-sm text-white font-bold placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/40 focus:bg-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-500"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                        {loading && searchQuery && page === 1 ? (
                            <div className="animate-spin h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full" />
                        ) : (
                            <FiSearch size={20} className={searchQuery ? "text-orange-400 drop-shadow-[0_0_5px_rgba(251,146,60,0.8)]" : "text-zinc-500"} />
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {loading && page === 1 ? (
                    [...Array(8)].map((_, i) => (
                        <CardSkeleton key={i} />
                    ))
                ) : comparisons?.length > 0 ? (
                    <>
                        {comparisons.map((comparison, index) => (
                            <ComparisonCard key={comparison._id || index} comparison={comparison} index={index} />
                        ))}
                        {loading && page > 1 && (
                            [...Array(4)].map((_, i) => (
                                <CardSkeleton key={`next-skeleton-${i}`} />
                            ))
                        )}
                    </>
                ) : (
                    <div className="col-span-full py-24 text-center border border-white/5 rounded-3xl bg-white/5 backdrop-blur-xl shadow-2xl mx-2">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.5em] rounded-full mb-8 shadow-inner">
                            <div className="w-2 h-2 bg-zinc-600 rounded-full" />
                            No Battles Found
                        </div>
                        <p className="text-zinc-300 text-3xl font-black uppercase tracking-tighter">Adjust Your Radars</p>
                        <button
                            onClick={handleResetSearch}
                            className="mt-10 text-orange-400 hover:text-orange-300 font-bold uppercase tracking-[0.3em] text-[10px] transition-colors border-b border-orange-400/30 pb-1"
                        >
                            Reset Search
                        </button>
                    </div>
                )}
            </div>

            <div ref={observerTarget}  />
        </div>
    );
}

export default CompareClient;
