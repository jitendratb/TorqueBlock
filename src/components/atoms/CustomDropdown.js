"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown, FiCheck, FiSearch } from "react-icons/fi";
import clsx from "clsx";

export default function CustomDropdown({
    options = [],
    value = "",
    onChange,
    placeholder = "Select Option",
    searchable = true,
    disabled = false,
    className = "",
    buttonClassName = "h-11",
    variant = "glass"
}) {
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
            className={clsx("relative w-full", className)}
        >

            <button
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen((prev) => !prev)}
                onKeyDown={handleKeyDown}
                className={clsx(
                    "cursor-pointer flex w-full items-center justify-between rounded-lg px-4 text-sm shadow-sm transition-all duration-300 focus:outline-none px-2.5 md:px-3.5 py-2 md:py-3",
              
                    {
                        // Outlined variant
                        "border border-gray-300 bg-white text-black hover:border-gray-400 focus:border-orange-500": variant === "outlined" && !isOpen,
                        "border border-orange-500 bg-white text-black": variant === "outlined" && isOpen,
                        
                        // Glass variant (matching AutoComplete background & border)
                        "border border-white/10 bg-white/[0.02] text-white hover:border-white/20": variant === "glass" && !isOpen,
                        "border border-orange-500 bg-white/[0.02] text-white ring-1 ring-orange-500/50": variant === "glass" && isOpen,
                        
                        "cursor-not-allowed opacity-50": disabled
                    }
                )}
            >
                <span
                    className={clsx(
                        variant === "glass"
                            ? selectedOption ? "font-medium text-white" : "text-zinc-500"
                            : selectedOption ? "font-medium text-black" : "text-zinc-600"
                    )}
                >
                    {selectedOption
                        ? selectedOption.label
                        : placeholder}
                </span>

                <FiChevronDown
                    className={clsx(
                        "text-lg text-orange-500 transition-transform duration-200 shrink-0 ml-2",
                        isOpen && "rotate-180"
                    )}
                />
            </button>

            {isOpen && (
                <div
                    className={clsx(
                        "absolute z-50 mt-2 w-full overflow-hidden rounded-lg bg-white shadow-xl text-gray-900"
                    )}
                >
                    {searchable && (
                        <div className="p-3 border-b border-gray-100">
                            <div className="flex items-center rounded-lg border border-gray-200 px-3 bg-gray-50/50">
                                <FiSearch className="text-gray-400 shrink-0" />

                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setHighlightedIndex(0);
                                    }}
                                    className="h-9 w-full bg-transparent px-2 text-sm text-gray-900 placeholder-gray-400 outline-none"
                                />
                            </div>
                        </div>
                    )}

                    <ul className="max-h-60 overflow-y-auto custom-scroll">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((item, index) => {
                                const active =
                                    value === item.value;

                                return (
                                    <li key={item.value}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onChange(item);
                                                setIsOpen(false);
                                                setSearch("");
                                            }}
                                            className={clsx(
                                                "flex w-full items-center cursor-pointer justify-between px-4 py-3 text-left text-sm transition-all",
                                                active
                                                    ? "bg-orange-500 text-white font-semibold"
                                                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                            )}
                                        >
                                            <span>{item.label}</span>

                                            {active && (
                                                <FiCheck className="text-white shrink-0" />
                                            )}
                                        </button>
                                    </li>
                                );
                            })
                        ) : (
                            <div className="px-4 py-6 text-center text-xs text-gray-400">
                                No results found
                            </div>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
