"use client"
import React, { useState, useEffect, useRef } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { FaArrowUp } from "react-icons/fa6";
import { FiUpload, FiCamera } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import useSearchStore from '@/stores/searchStore';
import Link from 'next/link';
import TyreCard from '@/components/atoms/TyreCard';
import Carousel from '@/components/organisms/Carousel';
import SearchCard from '@/components/atoms/SearchCard';
import useUiStore from '@/stores/uiStore';

const PLACEHOLDERS = [
  "Search by Motorcycle, Tyre, Size or Brand...",
  "Find tyres for your motorcycle...",
  'Search "Royal Enfield Hunter 350"...',
  'Search "TVS Apache RTR 310"...',
  'Search tyre size "110/70-17"...',
  'Search "140/70 R17 Rear"...',
  'Search "Pirelli Diablo Rosso IV"...',
  'Search "Michelin Road 6"...',
  'Search "Apollo Alpha H1"...',
  'Search "CEAT Zoom Cruz"...',
  "Find adventure motorcycle tyres...",
  "Find sport motorcycle tyres...",
  "Find touring motorcycle tyres...",
  "Search by brand or tyre model...",
  "Find front & rear tyre sets...",
  "Compare motorcycle tyres...",
  "Find tyres under ₹5,000...",
  "Search by riding style...",
  "Explore premium motorcycle tyres...",
  "Find the perfect tyre for your ride..."
];

function SearchBar({ onSearch, searchItems = [] }) {
  const [showSearch, setShowSearch] = useState(false);
  const searchBarRef = useRef(null);
  const router = useRouter();
  const inputRef = useRef(null);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isDropdownUp, setIsDropdownUp] = useState(false);
  const suggestionsContainerRef = useRef(null);
  const wrapperRef = useRef(null);

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

  const [placeholderText, setPlaceholderText] = useState(PLACEHOLDERS[0]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(PLACEHOLDERS[0].length);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isHeroSearchVisible = useUiStore((state) => state.isHeroSearchVisible);

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

  const suggestions = getSuggestions();

  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.closest('.search-container-ignore-outside')) {
        return;
      }
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (!document.contains(event.target)) return;

        setShowSearch(false);
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
    if ((storeShowSuggestions && suggestions.length > 0) || showSearch) {
      if (searchBarRef.current) {
        const rect = searchBarRef.current.getBoundingClientRect();
        if (window.innerHeight - rect.bottom < 300) {
          setIsDropdownUp(true);
        } else {
          setIsDropdownUp(false);
        }
      }
    }
  }, [storeShowSuggestions, suggestions.length, showSearch]);

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

  const firstTyreIndex = suggestions.findIndex(i => i.type === "Tyre" && i.sizesIds && i.sizesIds.length > 0);

  return (
    <div ref={wrapperRef} className={`relative search-container-ignore-outside ${isHeroSearchVisible ? "" : "hidden"}`}>

      <div className={`absolute   left-0 right-0 w-full rounded-2xl border border-white/20 bg-zinc-950/10 backdrop-blur-3xl text-white shadow-xl z-50  transition-all duration-300 ${isDropdownUp ? 'bottom-full mb-2 origin-bottom ' : 'top-full mt-2 origin-top '} ${storeShowSuggestions && suggestions.length > 0 ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-95"}`} >
        <div ref={suggestionsContainerRef} className="p-2 max-h-80 overflow-y-auto">
          {!loading && !error && suggestions.map((item, index) => {
            const isSelected = selectedSuggestionIndex === index;

            return (
              <div
                key={`${item.type}-${index}`}
                className={`w-full flex flex-col mb-1 rounded-xl transition ${isSelected ? 'bg-white/30' : 'hover:bg-white/20'}`}
              >
                <Link
                  href={getRoute(item.type, item.identifier, item)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setShowSuggestions(false);
                    setSearchInput("");
                  }}
                  className="w-full text-left px-2 py-2 flex items-center justify-between gap-2 cursor-pointer"
                >
                  <span className="font-semibold text-white truncate text-[10px] md:text-xs">{item.label}</span>
                  <span className="rounded-full bg-white/30 text-white px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider">
                    {item.type === "Tyre Sizes" ? "Size" : item.type === "Trending" ? "Featured" : item.type === "Bike" ? "Motorcycle" : item.type}
                  </span>
                </Link>

                {index === firstTyreIndex && (
                  <div className="w-full px-2 lg:px-4 pb-2" onMouseDown={(e) => e.stopPropagation()}>
                    <Carousel
                      items={item.sizesIds}
                      itemWidth="w-[160px]"
                      gap={12}
                      arrowSize={16}
                      leftArrowClassName="!-left-2 !p-1.5"
                      rightArrowClassName="!-right-2 !p-1.5"
                      renderItem={(sizeItem) => (
                        <SearchCard product={sizeItem} tyre={item} />
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className={`absolute text-base p-3 z-50 bg-white/20  backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 left-0 w-92 flex flex-col gap-1 overflow-hidden transform transition-all duration-300 ${isDropdownUp ? 'bottom-full mb-3 origin-bottom-left' : 'top-full mt-3 origin-top-left'} ${showSearch ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
        <button className='flex rounded-xl items-center gap-4 p-2 hover:bg-white/20 transition-all duration-300 text-left group'>
          <div className='p-2.5 bg-white/20 text-orange-500 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-sm'>
            <FiUpload size={20} />
          </div>
          <div className='flex-1'>
            <p className='font-semibold text-white group-hover:text-orange-400 transition-colors'>Upload Images</p>
            <p className='text-xs text-gray-300 group-hover:text-white/90 transition-colors'>Search by uploading</p>
          </div>
          <span className='text-[10px] font-bold tracking-widest uppercase bg-white/20 text-white px-2.5 py-1 rounded-full'> Coming Soon</span>
        </button>
        <button className='flex rounded-xl items-center gap-4 p-2 hover:bg-white/20 transition-all duration-300 text-left group'>
          <div className='p-2.5 bg-white/20 text-orange-500 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-sm'>
            <FiCamera size={20} />
          </div>
          <div className='flex-1'>
            <p className='font-semibold text-white group-hover:text-orange-400 transition-colors'>Click Photo</p>
            <p className='text-xs text-gray-300 group-hover:text-white/90 transition-colors'>Take a picture</p>
          </div>
          <span className='text-[10px] font-bold tracking-widest uppercase bg-white/20 text-white px-2.5 py-1 rounded-full'> Coming Soon</span>
        </button>
      </div>

      <div ref={searchBarRef} className='search-bar-animated-border relative bg-white/20 rounded-full backdrop-blur-sm h-14 lg:h-16 flex items-center w-full px-1.5 lg:px-3 gap-2 lg:gap-4 border border-white/20 transition-all duration-300 focus-within:bg-white/20 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 focus-within:shadow-md cursor-text"'>
        <div>
          <button onClick={() => setShowSearch(!showSearch)} className={`p-2 bg-white/30 rounded-full transition-transform duration-300 ${showSearch ? "rotate-45" : "rotate-0"}`} >
            <AiOutlinePlus className='text-lg md:text-xl' />
          </button>
        </div>
        <div className='w-full'>
          <input
            ref={inputRef}
            type='text'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsFocused(true);
              searchInput.trim() && setShowSuggestions(true);
            }}
            onBlur={() => setIsFocused(false)}
            className='w-full flex items-center font-normal placeholder:font-normal truncate line-clamp-1 bg-transparent outline-none text-base lg:text-lg py-2'
            placeholder={placeholderText}
          />
        </div>

        <div>
          <button
            onClick={() => handleSearchSubmit(searchInput)}
            disabled={!searchInput.trim()}
            className={`p-2 rounded-full transition-all duration-300 ${searchInput.trim() ? 'bg-orange-500/80 cursor-pointer' : 'bg-gray-400 opacity-50 cursor-not-allowed'}`}
          >
            <FaArrowUp className='text-lg md:text-xl' />
          </button>
        </div>
      </div>
    </div>

  )
}

export default SearchBar