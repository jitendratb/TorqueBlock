"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiZap, FiMessageCircle } from "react-icons/fi";
import useCompareStore from "@/stores/compareStore";
import Pagination from "@/components/atoms/Pagination";
import WhatsAppButton from "@/components/atoms/WhatsAppButton";

function CompareClient({ initialComparisons, initialPage, initialTotalPages, initialTotalCount }) {
    const {
        comparisons: storeComparisons,
        loading,
        fetchComparisons,
    } = useCompareStore();

    const [comparisons, setComparisons] = useState(initialComparisons || []);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [page, setPage] = useState(initialPage || 1);
    const [totalPages, setTotalPages] = useState(initialTotalPages || 1);

    const topRef = useRef(null);

    useEffect(() => {
        if (storeComparisons) {
            setComparisons(storeComparisons);
        }
    }, [storeComparisons]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        if (debouncedQuery !== "") {
            setPage(1);
            fetchComparisons({ page: 1, limit: 12, query: debouncedQuery });
        } else if (debouncedQuery === "") {
            if (initialComparisons) {
                setComparisons(initialComparisons);
            }
            setPage(initialPage || 1);
        }
    }, [debouncedQuery]);

    useEffect(() => {
        if (page !== (initialPage || 1) || debouncedQuery !== "") {
            fetchComparisons({ page, limit: 12, query: debouncedQuery });
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [page]);


    return (
        <div className="space-y-4 relative min-h-screen" ref={topRef}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-zinc-900 border border-zinc-800 rounded-full w-fit">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full animate-pulse" />
                        <span className="text-[8px] lg:text-[10px] font-black text-white uppercase tracking-[0.3em]">Battle Arena / Active</span>
                    </div>
                    <h2 className="text-4xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                        FACE THE <br />
                        <span className="text-orange-500 outline-text text-transparent">COMPETITION</span>
                    </h2>
                </div>

                <div className="relative w-full md:max-w-md group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-rose-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                    <input
                        type="text"
                        placeholder="SEARCH BATTLES..."
                        className="relative w-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 text-base text-white font-bold placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 focus:bg-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                        {loading && searchQuery ? (
                            <div className="animate-spin h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full" />
                        ) : (
                            <FiSearch size={22} className={searchQuery ? "text-orange-400 drop-shadow-[0_0_5px_rgba(251,146,60,0.8)]" : "text-zinc-500"} />
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {loading ? (
                    [...Array(6)].map((_, i) => (
                        <div key={i} className="h-[24rem] bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-xl md:rounded-[2rem] animate-pulse shadow-xl" />
                    ))
                ) : comparisons?.length > 0 ? (
                    comparisons.map((comparison, index) => {
                        const parts = (comparison?.identifier || '').split('-vs-');

                        const tyre1Name = comparison?.tyre1?.name || comparison?.tyre1Id?.productName || (parts[0] ? parts[0].replace(/-/g, ' ') : 'TYRE 1');
                        const tyre2Name = comparison?.tyre2?.name || comparison?.tyre2Id?.productName || (parts[1] ? parts[1].replace(/-/g, ' ') : 'TYRE 2');

                        const tyre1Image = comparison?.tyre1?.image || comparison?.tyre1Id?.heroImage || comparison?.tyre1Id?.image || null;
                        const tyre2Image = comparison?.tyre2?.image || comparison?.tyre2Id?.heroImage || comparison?.tyre2Id?.image || null;

                        return (
                            <Link
                                key={comparison._id || index}
                                href={`/compare/${comparison.identifier || '#'}`}
                                className="group relative h-[20rem] md:h-[24rem] bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-xl md:rounded-[2rem] overflow-hidden hover:border-orange-500/50 transition-all duration-700 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(249,115,22,0.2)] flex flex-col"
                            >
                                <div className="absolute inset-0 flex opacity-40 group-hover:opacity-70 transition-opacity duration-700">
                                    <div className="w-1/2 h-full bg-gradient-to-br from-orange-500/40 via-orange-500/10 to-transparent" />
                                    <div className="w-1/2 h-full bg-gradient-to-bl from-blue-500/40 via-blue-500/10 to-transparent" />
                                </div>

                                <div className="absolute inset-0 flex items-center justify-between p-4 mt-8 opacity-80 group-hover:opacity-100 transition-all duration-500 z-10">
                                    <div className="relative w-[45%] h-[65%] group-hover:scale-110 group-hover:-translate-x-3 group-hover:-rotate-3 transition-transform duration-700">
                                        {tyre1Image ? (
                                            <Image src={tyre1Image} alt={tyre1Name} fill className="object-contain object-center drop-shadow-2xl" />
                                        ) : (
                                            <div className="w-full h-full bg-zinc-800/50 rounded-xl" />
                                        )}
                                    </div>
                                    <div className="relative w-[45%] h-[65%] group-hover:scale-110 group-hover:translate-x-3 group-hover:rotate-3 transition-transform duration-700">
                                        {tyre2Image ? (
                                            <Image src={tyre2Image} alt={tyre2Name} fill className="object-contain object-center drop-shadow-2xl" />
                                        ) : (
                                            <div className="w-full h-full bg-zinc-800/50 rounded-xl" />
                                        )}
                                    </div>
                                </div>

                                <div className="absolute inset-0 z-10 pointer-events-none">
                                    <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                        <line x1="50" y1="0" x2="50" y2="100" className="stroke-white/10 stroke-[0.5] group-hover:stroke-white/30 transition-colors duration-500" />
                                    </svg>
                                </div>

                                <div className="relative z-20 flex-1 flex flex-col justify-between p-6">
                                    {/* Top Tags */}
                                    <div className="flex justify-between items-start w-full">
                                        <span className="text-[10px] font-bold text-orange-400 bg-orange-400/10 px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md border border-orange-400/20 shadow-[0_0_15px_rgba(251,146,60,0.2)]">Alpha</span>
                                        <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md border border-blue-400/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">Beta</span>
                                    </div>

                                    <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                                        <div className="w-14 h-14 rounded-full bg-zinc-950/90 backdrop-gray-2xl border border-white/20 flex items-center justify-center relative shadow-2xl group-hover:border-orange-500/50 transition-colors duration-500 group-hover:scale-110">
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/50 to-blue-500/50 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                                            <span className="text-white text-base font-black italic relative z-10">VS</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end w-full mt-auto pt-16 gap-4">
                                        <h3 className="w-1/2 text-left text-lg md:text-xl font-black text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                            {tyre1Name}
                                        </h3>
                                        <h3 className="w-1/2 text-left lg:text-right text-lg md:text-xl font-black text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                            {tyre2Name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-40 bg-zinc-900/90 backdrop-blur-3xl border-t border-orange-500/50">
                                    <div className="flex items-center justify-center">
                                        <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest group-hover:text-orange-400 transition-colors">
                                            <FiZap className="text-orange-400" /> Discover Winner
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div className="col-span-full py-24 text-center border border-white/10 rounded-[3rem] bg-zinc-900/50 backdrop-blur-xl shadow-2xl mx-2">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-zinc-800/50 border border-white/5 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.5em] rounded-full mb-8 shadow-inner">
                            <div className="w-2 h-2 bg-zinc-500 rounded-full" />
                            No Battles Found
                        </div>
                        <p className="text-zinc-300 text-3xl font-black uppercase tracking-tighter">Adjust Your Radars</p>
                        <button
                            onClick={() => setSearchQuery("")}
                            className="mt-10 text-orange-400 hover:text-orange-300 font-bold uppercase tracking-[0.3em] text-[10px] transition-colors border-b border-orange-400/30 pb-1"
                        >
                            Reset Search
                        </button>
                    </div>
                )}
            </div>

            <div className=" my-4 relative rounded-lg md:rounded-[2rem] overflow-hidden border border-orange-500/20 bg-zinc-950/60 backdrop-blur-2xl shadow-[0_20px_60px_rgba(249,115,22,0.15)] group">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.15)_0%,transparent_70%)]" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-4 md:p-8 gap-8">
                    <div className="space-y-5 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full backdrop-blur-md">
                            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
                            <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Expert Support Online</span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight drop-shadow-md">
                            STILL UNDECIDED ON YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-500 animate-pulse">WEAPON?</span>
                        </h3>
                        <p className="text-zinc-400 font-medium max-w-xl text-xs md:text-sm leading-relaxed">
                            Skip the guesswork. Connect with our elite tyre specialists via WhatsApp for a personalized recommendation tailored perfectly to your riding style and machine.
                        </p>
                    </div>

                    <WhatsAppButton text="Deploy Expert" value={'Hi Torque Black! I am comparing tyres in the Battle Arena and need expert advice to choose the perfect weapon for my machine.'} className="max-w-[350px]" />
                </div>
            </div>

            <div className="flex justify-center relative z-50">
                <Pagination
                    page={page || 0}
                    totalPages={totalPages || 40}
                    onPageChange={setPage}
                    totalCount={initialTotalCount || 40}
                />

            </div>

        </div>
    );
}

export default CompareClient;
