"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiChevronDown, FiCheck, FiSearch } from "react-icons/fi";
import clsx from "clsx";

const SIZE_CLASSES = {
    sm: { button: "px-2.5 py-1.5", option: "px-3 py-2" },
    md: { button: "px-4 md:px-3.5 py-2 md:py-3", option: "px-4 py-3" },
};

const MENU_STYLES = {
    glass: {
        panel: "border border-white/20 bg-zinc-950/10 text-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-3xl",
        searchRow: "border-white/10",
        searchBox: "border-white/10 bg-white/5",
        searchIcon: "text-gray-300",
        searchInput: "text-white placeholder-gray-400",
        option: "text-zinc-200 hover:bg-white/10 hover:text-white",
        optionHighlight: "bg-white/10 text-white",
        optionActive: "bg-orange-500/25 text-white font-semibold",
        check: "text-orange-400",
        empty: "text-gray-300",
    },
    outlined: {
        panel: "bg-white shadow-xl text-gray-900",
        searchRow: "border-gray-100",
        searchBox: "border-gray-200 bg-gray-50/50",
        searchIcon: "text-gray-400",
        searchInput: "text-gray-900 placeholder-gray-400",
        option: "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
        optionHighlight: "bg-gray-50 text-gray-900",
        optionActive: "bg-orange-500 text-white font-semibold",
        check: "text-white",
        empty: "text-gray-400",
    },
};

const MENU_GAP = 8;
const MENU_MAX_HEIGHT = 300;

export default function CustomDropdown({
    options = [],
    value = "",
    onChange,
    placeholder = "Select Option",
    searchable = true,
    disabled = false,
    className = "",
    buttonClassName = "h-11",
    variant = "glass",
    size = "md"
}) {
    const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;
    const menu = MENU_STYLES[variant] || MENU_STYLES.outlined;
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [menuPosition, setMenuPosition] = useState(null);

    const dropdownRef = useRef(null);
    const menuRef = useRef(null);
    const selectedOption = useMemo(() => {
        return options.find((item) => item.value === value);
    }, [options, value]);

    const filteredOptions = useMemo(() => {
        return options.filter((item) =>
            item.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [options, search]);

    const updateMenuPosition = useCallback(() => {
        const rect = dropdownRef.current?.getBoundingClientRect();
        if (!rect) return;

        const spaceBelow = window.innerHeight - rect.bottom;
        const openUp = spaceBelow < MENU_MAX_HEIGHT && rect.top > spaceBelow;

        setMenuPosition({
            left: rect.left,
            width: rect.width,
            ...(openUp
                ? { bottom: window.innerHeight - rect.top + MENU_GAP }
                : { top: rect.bottom + MENU_GAP }),
        });
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !menuRef.current?.contains(event.target)
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

    useEffect(() => {
        if (!isOpen) return;

        window.addEventListener("resize", updateMenuPosition);
        window.addEventListener("scroll", updateMenuPosition, true);

        return () => {
            window.removeEventListener("resize", updateMenuPosition);
            window.removeEventListener("scroll", updateMenuPosition, true);
        };
    }, [isOpen, updateMenuPosition]);

    const toggleMenu = () => {
        if (!isOpen) {
            updateMenuPosition();
            setHighlightedIndex(-1);
        }
        setIsOpen((prev) => !prev);
    };

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
                onClick={toggleMenu}
                onKeyDown={handleKeyDown}
                className={clsx(
                    "cursor-pointer flex w-full items-center justify-between rounded-lg text-sm shadow-sm transition-all duration-300 focus:outline-none",
                    sizeClass.button,

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
                            ? selectedOption ? "font-medium text-white" : "text-gray-300"
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

            {isOpen && menuPosition && createPortal(
                <div
                    ref={menuRef}
                    style={menuPosition}
                    className={clsx(
                        "fixed z-[110] overflow-hidden rounded-lg",
                        menu.panel
                    )}
                >
                    {variant === "glass" && (
                        <>
                            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] via-cyan-500/[0.02] to-orange-500/[0.03] opacity-80 mix-blend-screen" />
                            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                        </>
                    )}

                    {searchable && (
                        <div className={clsx("relative p-3 border-b", menu.searchRow)}>
                            <div className={clsx("flex items-center rounded-lg border px-3", menu.searchBox)}>
                                <FiSearch className={clsx("shrink-0", menu.searchIcon)} />

                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setHighlightedIndex(0);
                                    }}
                                    className={clsx("h-9 w-full bg-transparent px-2 text-sm outline-none", menu.searchInput)}
                                />
                            </div>
                        </div>
                    )}

                    <ul className="relative max-h-60 overflow-y-auto custom-scroll">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((item, index) => {
                                const active =
                                    value === item.value;

                                return (
                                    <li key={item.value ? `${item.value}-${index}` : `item-${index}`}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onChange(item);
                                                setIsOpen(false);
                                                setSearch("");
                                            }}
                                            className={clsx(
                                                "flex w-full items-center cursor-pointer justify-between text-left text-sm transition-all",
                                                sizeClass.option,
                                                active
                                                    ? menu.optionActive
                                                    : index === highlightedIndex ? menu.optionHighlight : menu.option
                                            )}
                                        >
                                            <span>{item.label}</span>

                                            {active && (
                                                <FiCheck className={clsx("shrink-0", menu.check)} />
                                            )}
                                        </button>
                                    </li>
                                );
                            })
                        ) : (
                            <div className={clsx("px-4 py-6 text-center text-xs", menu.empty)}>
                                No results found
                            </div>
                        )}
                    </ul>
                </div>,
                document.body
            )}
        </div>
    );
}
