'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoSearchSharp } from 'react-icons/io5';
import useSearchStore from '@/stores/searchStore';
import Link from 'next/link';

const PLACEHOLDERS = [
  'Search "Royal Enfield Hunter 350"...',
  'Search "TVS Apache RTR 310"...',
  'Search tyre size "110/70-17"...',
  'Search "140/70 R17 Rear"...',
  'Search "Pirelli Diablo Rosso IV"...',
  'Search "Michelin Road 6"...',
  'Search "Apollo Alpha H1"...',
  'Search "CEAT Zoom Cruz"...',
  "Search by brand or tyre model...",
  "Find front & rear tyre sets...",
  "Compare motorcycle tyres...",
];

function SearchBar({
    placeholder = "Search for",
    searchItems = [],
    onSearch,
    className = "",
    maxWidth = "320px",
    minWidth = "auto",
    showSuggestions = true,
    ...props
}) {
    const router = useRouter();
    const inputRef = useRef(null);
    const searchBarRef = useRef(null);
    const suggestionsContainerRef = useRef(null);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    
    const [placeholderText, setPlaceholderText] = useState("");
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

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
        if (isFocused || searchInput.length > 0) return;

        const currentPlaceholder = PLACEHOLDERS[placeholderIndex];
        let typingSpeed = isDeleting ? 30 : 60;

        if (!isDeleting && charIndex === currentPlaceholder.length) {
            const timeout = setTimeout(() => setIsDeleting(true), 2500);
            return () => clearTimeout(timeout);
        } else if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
            return;
        }

        const timeout = setTimeout(() => {
            setPlaceholderText(currentPlaceholder.substring(0, charIndex + (isDeleting ? -1 : 1)));
            setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, placeholderIndex, isFocused, searchInput.length]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (event.target.closest('.search-container-ignore-outside')) {
                return;
            }
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                if (!document.contains(event.target)) return;
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setShowSuggestions]);

    useEffect(() => {
        setSelectedSuggestionIndex(-1);
    }, [searchInput]);

    useEffect(() => {
        if (selectedSuggestionIndex >= 0 && suggestionsContainerRef.current) {
            const container = suggestionsContainerRef.current;
            const selectedElement = container.children[selectedSuggestionIndex];
            if (selectedElement) {
                selectedElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }
        }
    }, [selectedSuggestionIndex]);

    useEffect(() => {
        if (searchItems.length > 0) {
            const interval = setInterval(() => {
                setActiveIndex((activeIndex + 1) % searchItems.length);
            }, 3000);
            return () => clearInterval(interval);
        }
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

    const suggestions = getSuggestions();

    const getRoute = (type, identifier, item) => {
        const id = identifier || item?.query || item?.label;
        const lowerType = type?.toLowerCase() || '';
        switch (lowerType) {
            case 'tyre sizes':
                return `/tyres/${item?.availableTyres?.identifier || 'size'}/${item?.size?.toLowerCase().replace(/[\s/]/g, '-')}`;
            case 'tyre':
                return `/tyres/${id}`;
            case 'bike':
                return `/bikes/${id}`;
            case 'trending':
                return `/trending/${id}`;
            case 'comparison':
                return `/compare/${id}`;
            case 'blogs':
                return `/blogs/${id}`;
            default:
                return `/search?q=${encodeURIComponent(id)}`;
        }
    };

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
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (storeShowSuggestions && suggestions.length > 0) {
                setSelectedSuggestionIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (storeShowSuggestions && suggestions.length > 0) {
                setSelectedSuggestionIndex(prev => (prev > 0 ? prev - 1 : prev));
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (storeShowSuggestions && selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
                const item = suggestions[selectedSuggestionIndex];
                router.push(getRoute(item.type, item.identifier, item));
                setShowSuggestions(false);
                setSearchInput("");
                setSelectedSuggestionIndex(-1);
            } else if (searchInput.trim()) {
                handleSearchSubmit(searchInput);
            }
        }
    };

    return (
        <div ref={searchBarRef} className={`relative w-full search-container-ignore-outside ${className}`} style={{ maxWidth }} {...props}>
            <div
                className="relative flex items-center w-full bg-white/10 border border-white/30 rounded-full px-2 lg:px-4 py-2 transition-all duration-300 hover:bg-white/20 hover:border-gray-300 hover:shadow-sm focus-within:bg-white/20 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 focus-within:shadow-md cursor-text"
                onClick={() => inputRef.current?.focus()}
            >
                <IoSearchSharp className="text-white text-lg md:text-xl mr-1 md:mr-3 flex-shrink-0" />
                <div className="relative flex-1 min-h-[1.6rem] flex items-center">
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholderText}
                        onFocus={() => {
                            setIsFocused(true);
                            searchInput.trim() && showSuggestions && setShowSuggestions(true);
                        }}
                        onBlur={() => setIsFocused(false)}
                        className="w-full bg-transparent text-white text-sm outline-none z-10 pl-0"
                        aria-label="Search"
                    />
                </div>
            </div>

            {showSuggestions && storeShowSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 w-full min-w-[200px] md:min-w-full rounded-2xl border border-slate-200/70 bg-white shadow-xl ring-1 ring-black/5 z-50 overflow-hidden">
                    <div ref={suggestionsContainerRef} className="p-1 max-h-60 overflow-y-auto scroll-smooth">
                  
                        {!loading && !error && suggestions.map((item, index) => {
                            return (
                                <Link
                                    href={getRoute(item.type, item.identifier, item)}
                                    key={`${item.type}-${index}`}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => { 
                                        setShowSuggestions(false); 
                                        setSearchInput(""); 
                                    }}
                                    className={`w-full text-left transition px-3 py-2 rounded-xl flex items-center justify-between gap-2 cursor-pointer ${selectedSuggestionIndex === index ? 'bg-blue-100/80' : 'hover:bg-blue-50/70'}`}
                                >
                                    <span className="font-semibold text-slate-800 truncate text-[10px] md:text-xs">{item.label}</span>
                                    <span className="rounded-full bg-black/5 text-slate-600 px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider">
                                        {item.type === "Tyre Sizes" ? "Size" : item.type === "Trending" ? "Featured" : item.type === "Bike" ? "Motorcycle" : item.type} 
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchBar;