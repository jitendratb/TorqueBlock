import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

const Autocomplete = ({
    id, label, options = [], value, onChange,
    placeholder = "Search or enter...",
    disabled = false, allowCustom = false, onSearchChange,
    isLoading = false, isFetchingMore = false, hasMore = false, onLoadMore
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [openUpwards, setOpenUpwards] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        if (value && !isOpen) {
            const selectedOpt = options.find(o => o.value === value);
            setSearchTerm(selectedOpt ? selectedOpt.label : value);
        } else if (!value && !isOpen) {
            setSearchTerm('');
        }
    }, [value, isOpen, options]);

    useEffect(() => {
        if (isOpen && dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();

            let spaceBelow = window.innerHeight - rect.bottom;
            let spaceAbove = rect.top;

            const scrollParent = dropdownRef.current.closest('.overflow-y-auto, .overflow-y-scroll');
            if (scrollParent) {
                const parentRect = scrollParent.getBoundingClientRect();
                spaceBelow = parentRect.bottom - rect.bottom;
                spaceAbove = rect.top - parentRect.top;
            }

            setOpenUpwards(spaceBelow < 250 && spaceAbove > spaceBelow);
        }
    }, [isOpen]);

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollHeight - scrollTop <= clientHeight + 10) {
            if (!isLoading && !isFetchingMore && hasMore && onLoadMore) {
                onLoadMore();
            }
        }
    };

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                if (allowCustom && searchTerm) {
                    const exists = options.some(o => o.label?.toString().toLowerCase() === searchTerm.toLowerCase());
                    if (!exists) {
                        onChange({ target: { id, value: searchTerm, type: 'autocomplete' } });
                    }
                } else {
                    const selectedOpt = options.find(o => o.value === value);
                    setSearchTerm(selectedOpt ? selectedOpt.label : (value || ''));
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, searchTerm, allowCustom, options, value, id, onChange]);

    const handleInputChange = (e) => {
        const val = e.target.value;
        setSearchTerm(val);
        setHighlightedIndex(0);
        if (!isOpen) setIsOpen(true);
        if (onSearchChange) onSearchChange(val);
    };

    const handleSelect = (optValue, optLabel) => {
        setSearchTerm(optLabel);
        setIsOpen(false);
        inputRef.current?.blur();
        onChange({ target: { id, value: optValue, type: 'autocomplete' } });
    };

    const filteredOptions = options.filter(opt => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        const lbl = opt.label?.toString().toLowerCase() || '';
        const val = opt.value?.toString().toLowerCase() || '';
        return lbl.includes(term) || val.includes(term);
    });

    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === "ArrowDown" || e.key === "Enter") {
                e.preventDefault();
                setIsOpen(true);
            }
            return;
        }

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setHighlightedIndex(prev => prev < filteredOptions.length - 1 ? prev + 1 : 0);
                break;
            case "ArrowUp":
                e.preventDefault();
                setHighlightedIndex(prev => prev > 0 ? prev - 1 : filteredOptions.length - 1);
                break;
            case "Enter":
                e.preventDefault();
                const selected = filteredOptions[highlightedIndex];
                if (selected) {
                    handleSelect(selected.value, selected.label);
                } else if (allowCustom && searchTerm) {
                    handleSelect(searchTerm, searchTerm);
                }
                break;
            case "Escape":
                e.preventDefault();
                setIsOpen(false);
                break;
            default:
                break;
        }
    };

    // Auto-scroll to keep highlighted item in view
    useEffect(() => {
        if (isOpen && listRef.current) {
            const list = listRef.current;
            const activeItem = list.children[highlightedIndex];
            if (activeItem) {
                const itemTop = activeItem.offsetTop;
                const itemBottom = itemTop + activeItem.offsetHeight;
                const listTop = list.scrollTop;
                const listBottom = listTop + list.offsetHeight;

                if (itemTop < listTop) {
                    list.scrollTop = itemTop;
                } else if (itemBottom > listBottom) {
                    list.scrollTop = itemBottom - list.offsetHeight;
                }
            }
        }
    }, [highlightedIndex, isOpen]);

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-xs font-bold uppercase tracking-widest text-gray-200">
                    {label}
                </label>
            )}
            <div className="relative w-full" ref={dropdownRef}>
                <div
                    onClick={() => { if (!disabled) { setIsOpen(true); inputRef.current?.focus(); } }}
                    className={`cursor-pointer flex items-center justify-between w-full px-2.5 md:px-3.5 py-2 md:py-3 rounded-xl border text-sm shadow-sm transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed border-white/10 bg-white/[0.02]' : isOpen ? 'border-orange-500 bg-white/[0.02] ring-1 ring-orange-500/50' : 'border-white/10 bg-white/[0.02] hover:border-white/20'}`}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        id={id}
                        disabled={disabled}
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm text-white font-medium placeholder:font-normal placeholder:text-zinc-500 m-0 caret-orange-400"
                        autoComplete="off"
                    />
                    <FiChevronDown
                        className={`text-lg text-orange-500 transition-transform duration-200 shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`}
                        onClick={(e) => { e.stopPropagation(); if (!disabled) { setIsOpen(prev => !prev); if (!isOpen) inputRef.current?.focus(); } }}
                    />
                </div>
                {isOpen && (
                    <div className={`absolute z-50 w-full rounded-lg  overflow-hidden  bg-white shadow-xl ${openUpwards ? 'bottom-full mb-2' : 'mt-2'}`}>
                        <ul className="max-h-60 overflow-y-auto custom-scroll" onScroll={handleScroll} ref={listRef}>
                            {isLoading && options.length === 0 && (<li className="px-4 py-3 text-xs text-gray-400 text-center">Loading...</li>)}
                            {!isLoading && filteredOptions.length === 0 && (
                                <li className="px-4 py-3 text-xs text-gray-400 text-center">
                                    {allowCustom && searchTerm ? `Click outside to use "${searchTerm}"` : 'No results found'}
                                </li>
                            )}
                            {filteredOptions.map((opt, index) => {
                                const active = value === opt.value;
                                return (
                                    <li key={opt.value}>
                                        <button type="button" onClick={() => handleSelect(opt.value, opt.label)}
                                            className={`flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left text-sm transition-all 
                                                ${active ? 'bg-orange-500 text-white font-semibold' 
                                                : 
                                                 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}>
                                            <span>{opt.label}</span>
                                            {active && <FiCheck className="text-white shrink-0" />}
                                        </button>
                                    </li>
                                );
                            })}
                            {allowCustom && searchTerm && !filteredOptions.find(o => o.label.toLowerCase() === searchTerm.toLowerCase()) && !isLoading && (
                                <li>
                                    <button type="button" onClick={() => handleSelect(searchTerm, searchTerm)}
                                        className="w-full text-left px-4 py-3 text-sm text-orange-400 hover:bg-orange-500/10 font-medium transition-all">
                                        Use "{searchTerm}"
                                    </button>
                                </li>
                            )}
                            {isFetchingMore && (<li className="px-4 py-2 text-xs text-gray-400 text-center">Loading more...</li>)}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Autocomplete;
