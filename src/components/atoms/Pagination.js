import React from 'react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ 
    page, 
    totalPages, 
    onPageChange, 
    loading = false, 
    totalCount = 0,
    itemsPerPage = 24,
    showSummary = true 
}) => {
    if (totalPages <= 1) return null;

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && !loading) {
            onPageChange(newPage);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const boundaryCount = 1; // Number of pages to show at start and end
        const siblingCount = 1; // Number of pages to show on each side of the current page
        
        // Always show the first page
        for (let i = 1; i <= Math.min(boundaryCount, totalPages); i++) {
            pages.push(i);
        }

        // Calculate sibling range
        const startSibling = Math.max(boundaryCount + 1, page - siblingCount);
        const endSibling = Math.min(totalPages - boundaryCount, page + siblingCount);

        // Add start ellipsis if needed
        if (startSibling > boundaryCount + 1) {
            pages.push('...');
        } else if (boundaryCount + 1 < totalPages && startSibling === boundaryCount + 1) {
            // No ellipsis needed but ensure we don't skip a page
        }

        // Add siblings
        for (let i = startSibling; i <= endSibling; i++) {
            if (!pages.includes(i)) pages.push(i);
        }

        // Add end ellipsis if needed
        if (endSibling < totalPages - boundaryCount) {
            pages.push('...');
        }

        // Always show the last page
        for (let i = Math.max(totalPages - boundaryCount + 1, endSibling + 1); i <= totalPages; i++) {
            if (!pages.includes(i)) pages.push(i);
        }

        return pages;
    };

    return (
        <div className="flex flex-row justify-between items-center gap-4 py-4  border-t border-zinc-800/50 w-full overflow-hidden">
            <div className="flex items-center gap-1 sm:gap-2 max-w-full overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1 || loading}
                    className="p-2 md:p-3 rounded-lg sm:rounded-xl border border-zinc-800 text-zinc-400 hover:text-orange-500 hover:border-orange-500/50 hover:bg-orange-500/5 disabled:opacity-20 disabled:hover:bg-transparent transition-all duration-300"
                    aria-label="Previous page"
                >
                    <FiChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                <div className="flex items-center gap-1 sm:gap-2">
                    {getPageNumbers().map((p, idx) => (
                        p === '...' ? (
                            <span key={`ellipsis-${idx}`} className="px-1 sm:px-2 text-zinc-600 font-bold">...</span>
                        ) : (
                            <button
                                key={`page-${p}`}
                                onClick={() => handlePageChange(p)}
                                disabled={loading}
                                className={`w-6 h-6 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                                    page === p
                                        ? "bg-orange-500 text-black shadow-lg shadow-orange-500/20"
                                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                                }`}
                            >
                                {p}
                            </button>
                        )
                    ))}
                </div>

                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages || loading}
                    className="p-1 sm:p-3 rounded-lg sm:rounded-xl border border-zinc-800 text-zinc-400 hover:text-orange-500 hover:border-orange-500/50 hover:bg-orange-500/5 disabled:opacity-20 disabled:hover:bg-transparent transition-all duration-300"
                    aria-label="Next page"
                >
                    <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>

            <div className="flex items-center gap-1 md:gap-2 text-[10px] sm:text-xs md:text-sm font-bold text-zinc-500 whitespace-nowrap bg-zinc-950/50  md:px-4 py-1 md:py-2 md:rounded-full md:border md:border-zinc-800/80 shadow-inner">
                <span className="uppercase tracking-widest opacity-60">Page</span>
                <div className="flex items-center gap-2">
                    <span className="text-orange-500 text-sm">{page}</span>
                    <span className="text-zinc-700">/</span>
                    <span className="text-zinc-300">{totalPages}</span>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
