"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown, FiCheck, FiSearch, } from "react-icons/fi";

export default function CustomDropdown({ options = [], value = "", onChange, placeholder = "Select Option", searchable = true, disabled = false, className = "", buttonClassName="h-12" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const dropdownRef = useRef(null);
    const selectedOption = useMemo(() => {
        return options.find((item) => item.value === value);
    }, [options, value]);

    const filteredOptions = useMemo(() => {
        return options.filter((item) =>
            item.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [options, search]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    const handleKeyDown = (e) => {
        if (!isOpen) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();

                setHighlightedIndex((prev) =>
                    prev < filteredOptions.length - 1
                        ? prev + 1
                        : 0
                );

                break;

            case "ArrowUp":
                e.preventDefault();

                setHighlightedIndex((prev) =>
                    prev > 0
                        ? prev - 1
                        : filteredOptions.length - 1
                );

                break;

            case "Enter":
                e.preventDefault();

                const selected =
                    filteredOptions[highlightedIndex];

                if (selected) {
                    onChange(selected);
                    setIsOpen(false);
                    setSearch("");
                }

                break;

            case "Escape":
                setIsOpen(false);
                break;

            default:
                break;
        }
    };

    return (
        <div
            ref={dropdownRef}
            className={`relative w-full ${className}`}
        >

            <button
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen((prev) => !prev)}
                onKeyDown={handleKeyDown}
                className={`cursor-pointer
          flex w-full items-center justify-between
          rounded-xl border border-gray-300 bg-white
          px-4 text-sm shadow-sm transition-all ${buttonClassName}
          ${disabled ? "cursor-not-allowed opacity-50" : "hover:border-gray-400 focus:border-orange-500 focus:outline-none"}`}
            >
                <span
                    className={
                        selectedOption
                            ? "font-medium text-black"
                            : "text-zinc-600"
                    }
                >
                    {selectedOption
                        ? selectedOption.label
                        : placeholder}
                </span>

                <FiChevronDown
                    className={`text-lg text-orange-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white text-black/80 backdrop-blur-lg shadow-2xl">
                    {/* Search */}
                    {searchable && (
                        <div className="border-b border-gray-100 p-3">
                            <div className="flex items-center rounded-lg border border-gray-200 px-3">
                                <FiSearch className="text-gray-400" />

                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setHighlightedIndex(0);
                                    }}
                                    className="h-10 w-full bg-transparent px-2 text-sm outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* Options */}
                    <ul className="max-h-64 overflow-y-auto custom-scroll py-2">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((item, index) => {
                                const active =
                                    value === item.value;

                                const highlighted =
                                    highlightedIndex === index;

                                return (
                                    <li key={item.value}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onChange(item);
                                                setIsOpen(false);
                                                setSearch("");
                                            }}
                                            className={`
                        flex w-full items-center cursor-pointer
                        justify-between px-4 py-3
                        text-left text-sm transition-all
                    
                        ${active ? "bg-orange-100 font-semibold" : "hover:bg-gray-50 hover:text-gray-500"}
                      `}
                                        >
                                            <span>{item.label}</span>

                                            {active && (
                                                <FiCheck className="text-orange-500" />
                                            )}
                                        </button>
                                    </li>
                                );
                            })
                        ) : (
                            <div className="px-4 py-6 text-center text-sm text-gray-500">
                                No results found
                            </div>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}