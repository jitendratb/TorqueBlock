'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { IoSearchSharp } from 'react-icons/io5';
import useSearchStore from '@/stores/searchStore';

function SearchBar({
    placeholder = "Search for",
    searchItems = [
        { label: 'Tyres' },
        { label: 'Bike Brands' },
        { label: 'Models' },
        { label: 'Sizes' },
        { label: 'Tyre Comparisons' },
    ],
    onSearch,
    className = "",
    maxWidth = "320px",
    minWidth = "auto",
    showSuggestions = true,
    ...props
}) {
    const router = useRouter();
    const inputRef = useRef(null);

    const {
        searchInput,
        setSearchInput,
        showSuggestions: storeShowSuggestions,
        setShowSuggestions,
        activeIndex,
        setActiveIndex,
        loading,
        error,
        getSuggestions,
        clearSearch
    } = useSearchStore();

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((activeIndex + 1) % searchItems.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [searchItems.length, activeIndex, setActiveIndex]);

    useEffect(() => {
        const handleShortcut = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
            if (e.key === '/' && document.activeElement !== inputRef.current) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleShortcut);
        return () => window.removeEventListener('keydown', handleShortcut);
    }, []);

    const handleSearchSubmit = (query) => {
        if (!query.trim()) return;
        setShowSuggestions(false);
        if (onSearch) {
            onSearch(query);
        } else {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchInput.trim()) {
            e.preventDefault();
            handleSearchSubmit(searchInput);
        }
    };

    const suggestions = getSuggestions();

    return (
        <div className={`relative w-full ${className}`} style={{ maxWidth  }} {...props}>
            <div
                className="relative flex items-center w-full bg-gray-50 border border-gray-200 rounded-full px-2 lg:px-4 py-0.5 md:py-1 lg:py-2 transition-all duration-300 hover:bg-white hover:border-gray-300 hover:shadow-sm focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 focus-within:shadow-md cursor-text"
                onClick={() => inputRef.current?.focus()}
            >
                <IoSearchSharp className="text-gray-400 text-lg md:text-xl mr-1 md:mr-3 flex-shrink-0" />
                <div className="relative flex-1 min-h-[1.5rem] flex items-center">
                    {!searchInput && (
                        <div className="absolute inset-0 flex items-center pointer-events-none ">
                            <span className="text-gray-500 text-xs whitespace-nowrap mr-1 ">{placeholder}</span>

                            <div className="relative flex-1 h-full overflow-hidden">
                                <div
                                    className="absolute inset-0 w-full flex flex-col transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateY(-${activeIndex * 100}%)` }}
                                >
                                    {searchItems?.map((item, i) => (
                                        <div key={i} className="h-full w-full flex-shrink-0 flex items-center">
                                            <span className="font-semibold text-gray-700 text-xs truncate w-full">
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <input
                        ref={inputRef}
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => searchInput.trim() && showSuggestions && setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                        className="w-full bg-transparent text-gray-900 text-sm outline-none z-10 pl-0"
                        aria-label="Search"
                    />
                </div>
            </div>

            {showSuggestions && storeShowSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 w-full min-w-[200px] md:min-w-full rounded-2xl border border-slate-200/70 bg-white shadow-xl ring-1 ring-black/5 z-50 overflow-hidden">
                    <div className="p-1 max-h-60 overflow-y-auto">
                  
                        {!loading && !error && suggestions.map((item, index) => {
                            const getRoute = (type, identifier) => {
                                const id = identifier || item.query || item.label;
                                switch (type) {
                                    case 'Tyre Sizes':
                                        return `/tyres/${item?.availableTyres?.identifier}/${item?.size?.toLowerCase().replace(/[\s/]/g, '-')}`;
                                    case 'Tyre':
                                        return `/tyres/${id}`;
                                    case 'Bike':
                                        return `/bikes/${id}`;
                                    case 'Trending':
                                        return `/trending/${id}`;
                                    case 'Comparison':
                                        return `/compare/${id}`;
                                    case 'Blogs':
                                        return `/blogs/${id}`;
                                    default:
                                        return `/search?q=${encodeURIComponent(id)}`;
                                }
                            };

                            return (
                                <button
                                    key={`${item.type}-${index}`}
                                    type="button"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => { 
                                        router.push(getRoute(item.type, item.identifier)); 
                                        setShowSuggestions(false); 
                                        setSearchInput(""); 
                                    }}
                                    className="w-full text-left transition px-3 py-2 hover:bg-blue-50/70 rounded-xl flex items-center justify-between gap-2 cursor-pointer"
                                >
                                    <span className="font-semibold text-slate-800 truncate text-[10px] md:text-xs">{item.label}</span>
                                    <span className="rounded-full bg-black/5 text-slate-600 px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider">
                                        {item.type == "Tyre Sizes" ? "Size" : item.type === "Trending" ? "Featured" : item.type} 
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchBar;