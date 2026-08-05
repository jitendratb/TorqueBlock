"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import useCompareStore from "@/stores/compareStore";
import CompareBanner from "./CompareBanner";
import ComparisonCard from "./ComparisonCard";
import CardSkeleton from "./CardSkeleton";
import CompareSearch from "./CompareSearch";

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

            <CompareSearch 
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onClear={handleResetSearch}
                loading={loading && searchQuery && page === 1}
                placeholder="Search Compare  Tyres..."
            />

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

            <div ref={observerTarget} />
        </div>
    );
}

export default CompareClient;
