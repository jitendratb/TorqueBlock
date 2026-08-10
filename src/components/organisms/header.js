"use client"

import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { FaArrowRightLong, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { MdCompareArrows } from "react-icons/md";
import { usePathname } from "next/navigation";
import SearchBar from './searchBar';
import { IoMdMenu } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import ManuSlider from './ManuSlider';
import CartSlider from './CartSlider';
import Login from './login';
import useCartStore from '@/stores/cartStore';
import useUiStore from '@/stores/uiStore';

const WHATSAPP_NUMBER = "916366625625";

const NAVIGATION_CONFIG = {
    whatsapp: {
        number: WHATSAPP_NUMBER,
        expertMessage: "Hi Torque Block! I'd like to talk to a tyre expert. Can you help me find the right tyre for my bike?",
        contactMessage: "Hi Torque Block! I found your website and I'd like to get in touch. Can you assist me?",
    },
    navItems: [
        { name: "Tyres", href: "/tyres" },
        { name: "Shop by Motorcycle", href: "/bikes" },
        { name: "Compare Tyres", href: "/compare" },
    ],
    mobileSubMenus: {
        Tyres: [
            { label: "Pirelli Scorpion Rally STR", href: "/tyres/pirelli-scorpion-rally-str" },
            { label: "Pirelli Scorpion Trail III", href: "/tyres/pirelli-scorpion-trail-iii" },
            { label: "Michelin Road 6", href: "/tyres/michelin-road-6" },
            { label: "Michelin Anakee Adventure", href: "/tyres/michelin-anakee-adventure" },
            { label: "Metzeler Tourance Next 2", href: "/tyres/metzeler-tourance-next-2" },

            { label: "Metzeler Cruisetec", href: "/tyres/metzeler-cruisetec" },
            { label: "Pirelli Diablo Rosso IV Corsa", href: "/tyres/pirelli-diablo-powercruiser" },
            { label: "Metzeler Racetec TD Slick", href: "/tyres/pirelli-night-dragon" },
            { label: "Metzeler Sportec M9 RR", href: "/tyres/pirelli-scorpion-trail-iii" },
            { label: "Michelin Power 6", href: "/tyres/michelin-power-6" },
        ],
        "Shop by Motorcycle": [
            { label: "Royal Enfield Himalayan 450", href: "/bikes/royal-enfield-himalayan-450-tyres" },
            { label: "KTM 390 Adventure", href: "/bikes/ktm-390-adventure-tyres" },
            { label: "BMW G 310 GS", href: "/bikes/bmw-g-310-gs-tyres" },
            { label: "Honda NX500", href: "/bikes/honda-nx500-tyres" },
            { label: "KTM Duke 390", href: "/bikes/ktm-duke-390-tyres" },
            // { label: "Yamaha R15 V4", href: "/bikes/yamaha-r15-v4-tyres" },
            { label: "Kawasaki Ninja 300", href: "/bikes/kawasaki-ninja-300-tyres" },
            { label: "Triumph Speed 400", href: "/bikes/triumph-speed-400-tyres" },
            { label: "Royal Enfield Interceptor 650", href: "/bikes/royal-enfield-interceptor-650-tyres" },
            { label: "Royal Enfield Continental GT 650", href: "/bikes/royal-enfield-continental-gt-650-tyres" }

        ],
        "Compare Tyres": [
            { label: "Michelin Road 6 vs Pirelli Angel GT II", href: "/compare/michelin-road-6-vs-pirelli-angel-gt-ii" },
            { label: "Pirelli Angel GT II vs Metzeler Sportec M9 RR", href: "/compare/pirelli-angel-gt-ii-vs-metzeler-sportec-m9-rr" },
            { label: "Michelin Road 6 vs Metzeler Roadtec 02", href: "/compare/michelin-road-6-vs-metzeler-roadtec-02" },
            { label: "Pirelli Diablo Rosso IV vs Metzeler Sportec M9 RR", href: "/compare/pirelli-diablo-rosso-iv-vs-metzeler-sportec-m9-rr" },
            { label: "Pirelli Diablo Rosso IV vs Michelin Power 6", href: "/compare/pirelli-diablo-rosso-iv-vs-michelin-power-6" },
            { label: "Michelin Power 6 vs Metzeler Sportec M9 RR", href: "/compare/michelin-power-6-vs-metzeler-sportec-m9-rr" },
            { label: "Pirelli Diablo Rosso IV Corsa vs Michelin Power 6", href: "/compare/pirelli-diablo-rosso-iv-corsa-vs-michelin-power-6" },
            { label: "Pirelli Scorpion Trail II vs Michelin Anakee Road", href: "/compare/pirelli-scorpion-trail-ii-vs-michelin-anakee-road" },
        ],
    }
};

const TyresMegaMenu = React.memo(({ tabIndex }) => (
    <div className="flex justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="flex-1 grid grid-cols-2 gap-8">
            <div>
                <h3 className="text-sm font-bold text-gray-900 tracking-wider mb-2 border-b border-gray-100 pb-2">Most Popular Tyres</h3>
                <div className="flex flex-col gap-2">
                    {NAVIGATION_CONFIG.mobileSubMenus.Tyres.slice(0, 5).map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            tabIndex={tabIndex}
                            className="group flex items-center gap-3 p-2 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-300 focus:outline-none"
                        >
                            <div className="flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-gray-300/50 text-black group-hover:bg-orange-100 group-hover:text-orange-500 transition-colors duration-300">
                                <span className="text-xs font-bold">{item.label.substring(0, 1)}</span>
                            </div>
                            <span className="text-[13px] font-medium text-gray-600 group-hover:text-gray-900 transition-colors leading-relaxed">
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-sm font-bold text-gray-900 tracking-wider mb-2 border-b border-gray-100 pb-2">Sport & Performance</h3>
                <div className="flex flex-col gap-2">
                    {NAVIGATION_CONFIG.mobileSubMenus.Tyres.slice(5).map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            tabIndex={tabIndex}
                            className="group flex items-center gap-3 p-2 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-300 focus:outline-none"
                        >
                            <div className="flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-gray-300/50 text-black group-hover:bg-orange-100 group-hover:text-orange-500 transition-colors duration-300">
                                <span className="text-xs font-bold">{item.label.substring(0, 1)}</span>
                            </div>
                            <span className="text-[13px] font-medium text-gray-600 group-hover:text-gray-900 transition-colors leading-relaxed">
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        <div>
            <Link
                href="/tyres"
                tabIndex={tabIndex}
                className="flex w-[320px] text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-2xl overflow-hidden"
            >
                <div className="relative flex-1 bg-gradient-to-br from-zinc-900 to-black p-6 text-white hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] transition-all duration-500 group border border-zinc-800 hover:border-orange-500/50 shadow-xl flex flex-col justify-between h-full w-full">
                    <div className="absolute -right-8 -bottom-8 opacity-20 w-36 h-36 bg-orange-500 blur-3xl rounded-full group-hover:scale-125 group-hover:opacity-40 transition-all duration-700 pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full">
                        <span className="inline-block px-3 py-1 bg-white/10 text-white text-[9px] font-extrabold rounded mb-3 w-max uppercase tracking-[0.2em] border border-white/20 backdrop-blur-sm group-hover:border-orange-500/30 group-hover:bg-orange-500/10 group-hover:text-orange-400 transition-all duration-300">Smart Tool</span>
                        <h4 className="text-lg font-extrabold text-white mb-2 group-hover:text-orange-400 transition-colors tracking-tight leading-snug">Find the Perfect Tyre</h4>
                        <p className="text-xs text-zinc-400 mb-6 leading-relaxed group-hover:text-zinc-300 transition-colors">Find the perfect motorcycle tyre with our intelligent recommendation engine.</p>
                        <div className="text-xs font-bold text-white group-hover:text-orange-400 flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                            Find My Tyre <FaArrowRightLong className="text-white group-hover:text-orange-500 transition-colors" />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    </div>
));

const BikeBrandsMegaMenu = React.memo(({ tabIndex }) => (
    <div className="flex justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 border-b border-gray-100 pb-2">Shop by Motorcycle</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {NAVIGATION_CONFIG.mobileSubMenus["Shop by Motorcycle"].map((bike) => (
                    <Link
                        key={bike.label}
                        href={bike.href}
                        tabIndex={tabIndex}
                        className="group flex items-center gap-3 p-2 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-300 focus:outline-none"
                    >
                        <div className="flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-gray-300/50 text-black group-hover:bg-orange-100 group-hover:text-orange-500 transition-colors duration-300">
                            <span className="text-xs font-bold">{bike.label.substring(0, 1)}</span>
                        </div>
                        <span className="text-[13px] font-medium text-gray-600 group-hover:text-gray-900 transition-colors leading-relaxed">
                            {bike.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
        <div>
            <Link
                href="/bikes"
                tabIndex={tabIndex}
                className="flex w-[320px] text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-2xl overflow-hidden"
            >
                <div className="relative flex-1 bg-gradient-to-br from-zinc-900 to-black p-6 text-white hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] transition-all duration-500 group border border-zinc-800 hover:border-orange-500/50 shadow-xl flex flex-col justify-between h-full w-full">
                    <div className="absolute -right-8 -bottom-8 opacity-20 w-36 h-36 bg-orange-500 blur-3xl rounded-full group-hover:scale-125 group-hover:opacity-40 transition-all duration-700 pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full">
                        <span className="inline-block px-3 py-1 bg-white/10 text-white text-[9px] font-extrabold rounded mb-3 w-max uppercase tracking-[0.2em] border border-white/20 backdrop-blur-sm group-hover:border-orange-500/30 group-hover:bg-orange-500/10 group-hover:text-orange-400 transition-all duration-300">Featured Collection</span>
                        <h4 className="text-lg font-extrabold text-white mb-2 group-hover:text-orange-400 transition-colors tracking-tight leading-snug">Superbikes & Tourers</h4>
                        <p className="text-xs text-zinc-400 mb-6 leading-relaxed group-hover:text-zinc-300 transition-colors">Explore premium motorcycle tyres for superbikes and touring.</p>
                        <div className="text-xs font-bold text-white group-hover:text-orange-400 flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                            View Premium Collection <FaArrowRightLong className="text-white group-hover:text-orange-500 transition-colors" />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    </div>

));

const TyreComparisonMegaMenu = React.memo(({ tabIndex }) => (
    <div className="flex  justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Compare Popular Tyres</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {NAVIGATION_CONFIG.mobileSubMenus["Compare Tyres"].map((comp) => (
                    <Link
                        key={comp.label}
                        href={comp.href}
                        tabIndex={tabIndex}
                        className="group flex items-center gap-3 p-2 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-300 focus:outline-none"
                    >
                        <div className="flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-gray-300/50 text-black group-hover:bg-orange-100 group-hover:text-orange-500 transition-colors duration-300">
                            <MdCompareArrows className="text-sm" />
                        </div>
                        <span className="text-[13px] font-medium text-gray-600 group-hover:text-gray-900 transition-colors leading-relaxed">
                            {comp.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
        <div>
            <Link
                href="/compare"
                tabIndex={tabIndex}
                className="flex w-[320px] text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-2xl overflow-hidden"
            >
                <div className="relative flex-1 bg-gradient-to-br from-zinc-900 to-black p-6 text-white hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] transition-all duration-500 group border border-zinc-800 hover:border-orange-500/50 shadow-xl flex flex-col justify-between h-full w-full">
                    <div className="absolute -right-8 -bottom-8 opacity-20 w-36 h-36 bg-orange-500 blur-3xl rounded-full group-hover:scale-125 group-hover:opacity-40 transition-all duration-700 pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full">
                        <span className="inline-block px-3 py-1 bg-white/10 text-white text-[9px] font-extrabold rounded mb-3 w-max uppercase tracking-[0.2em] border border-white/20 backdrop-blur-sm group-hover:border-orange-500/30 group-hover:bg-orange-500/10 group-hover:text-orange-400 transition-all duration-300">Expert Picks</span>
                        <h4 className="text-lg font-extrabold text-white mb-2 group-hover:text-orange-400 transition-colors tracking-tight leading-snug">Find Your Perfect Tyre</h4>
                        <p className="text-xs text-zinc-400 mb-6 leading-relaxed group-hover:text-zinc-300 transition-colors">Learn how to choose the right motorcycle tyre based on your riding style, performance needs, and motorcycle.</p>
                        <div className="text-xs font-bold text-white group-hover:text-orange-400 flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                            Unlock Tyre Guide with Compare Tyres <FaArrowRightLong className="text-white group-hover:text-orange-500 transition-colors" />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    </div>
));


function Header() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const isHeroSearchVisible = useUiStore((state) => state.isHeroSearchVisible);
    const heroObserverReady = useUiStore((state) => state.heroObserverReady);
    const [activeHover, setActiveHover] = useState(null);
    const [hoverTimeout, setHoverTimeout] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [searchBarAnimatedIn, setSearchBarAnimatedIn] = useState(false);

    const cart = useCartStore((state) => state.cart || []);
    const setCartSliderOpen = useCartStore((state) => state.setSliderOpen);
    const totalItems = isMounted ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;




    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            setScrolled(scrollTop > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const shouldRenderSearchBar = pathname !== '/' ? isMounted : (heroObserverReady && !isHeroSearchVisible);

    useEffect(() => {
        if (shouldRenderSearchBar) {
            const raf = requestAnimationFrame(() => setSearchBarAnimatedIn(true));
            return () => cancelAnimationFrame(raf);
        } else {
            setSearchBarAnimatedIn(false);
        }
    }, [shouldRenderSearchBar]);

    useEffect(() => {
        const handleGlobalKeys = (e) => {
            if (e.key === "Escape") {
                setSidebarOpen(false);
                setActiveHover(null);
            }
        };
        window.addEventListener("keydown", handleGlobalKeys);
        return () => window.removeEventListener("keydown", handleGlobalKeys);
    }, []);

    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [sidebarOpen]);

    const handleMouseEnter = useCallback((menu) => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        setActiveHover(menu);
    }, [hoverTimeout]);

    const handleMouseLeave = useCallback(() => {
        const timeout = setTimeout(() => setActiveHover(null), 120);
        setHoverTimeout(timeout);
    }, []);

    return (
        <div>
            <header className={`header-root fixed left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${scrolled ? "bg-transparent" : "bg-white/20 backdrop-blur-sm"}`} data-scrolled={scrolled}>
                <nav className={`header-nav flex text-white justify-between items-center gap-2 md:gap-4 max-w-7xl transition-all duration-300 ease-in-out ${scrolled ? "bg-white/20 backdrop-blur-sm border border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" : ""}`}>
                    <Link href="/" className="text-2xl font-bold flex-shrink-0" aria-label="Torque Block Home">
                        <Image src="/newlogo.webp" alt="Torque Block Logo" width={130} height={60} priority className="inline-block w-[100px] md:h-auto md:w-[130px]" style={{ objectFit: 'contain' }} />
                    </Link>

                    <ul className='flex items-center gap-6 hidden lg:flex' role="menubar">
                        {NAVIGATION_CONFIG.navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const isDropdown = item.name !== "Home";
                            return (
                                <li
                                    key={item.name}
                                    role="none"
                                    className="relative cursor-pointer"
                                    onMouseEnter={() => handleMouseEnter(item.name)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {item.href ? (
                                        <Link
                                            href={item.href}
                                            role="menuitem"
                                            aria-haspopup={isDropdown ? "true" : undefined}
                                            aria-expanded={isDropdown ? activeHover === item.name : undefined}
                                            onFocus={() => { if (isDropdown) handleMouseEnter(item.name); }}
                                            onBlur={(e) => {
                                                if (!e.relatedTarget?.closest('.Hover-Modal')) {
                                                    handleMouseLeave();
                                                }
                                            }}
                                            className={`nav-link text-sm font-bold ${isActive ? "active" : ""}`}
                                        >
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <span
                                            role="menuitem"
                                            tabIndex={0}
                                            aria-haspopup="true"
                                            aria-expanded={activeHover === item.name}
                                            onFocus={() => handleMouseEnter(item.name)}
                                            onBlur={(e) => {
                                                if (!e.relatedTarget?.closest('.Hover-Modal')) {
                                                    handleMouseLeave();
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    handleMouseEnter(item.name);
                                                }
                                            }}
                                            className={`nav-link text-xs uppercase tracking-wider font-bold ${isActive ? "active" : ""}`}
                                        >
                                            {item.name}
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    <div className='flex items-center justify-end gap-2 md:gap-4 w-full lg:max-w-sm xl:max-w-xl'>
                        {shouldRenderSearchBar && (
                            <div
                                className={`transition-all duration-500 ease-in-out ${searchBarAnimatedIn
                                    ? 'opacity-100 max-w-[500px] translate-x-0 visible'
                                    : 'opacity-0 max-w-0 translate-x-4 invisible'
                                    }`}
                            >
                                <SearchBar className='xl:min-w-[360px]' />
                            </div>
                        )}
                        <div>
                            <button
                                onClick={() => setCartSliderOpen(true)}
                                className="relative hidden md:flex border border-gray-400  items-center justify-center h-10 px-4 rounded-xl bg-white/10 hover:bg-white/20  transition-all duration-200 cursor-pointer text-white gap-2"
                                aria-label="Open cart"
                            >
                                <IoCartOutline className='text-xl' />
                                <span className="text-sm font-bold   hidden sm:block">Cart</span>
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full shadow-lg">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        </div>

                        <div className=''>
                            <button
                                aria-label="Open navigation menu"
                                aria-expanded={sidebarOpen}
                                onClick={() => setSidebarOpen(true)}
                                className="flex flex-col justify-center items-center w-10 h-10 rounded-xl gap-[5px] bg-white/10 hover:bg-white/20 transition-all duration-200 border border-gray-400 cursor-pointer text-white"
                            >
                                <IoMdMenu className='text-2xl' />
                            </button>
                        </div>
                    </div>
                </nav>

                {activeHover && activeHover !== "Home" && (
                    <div
                        className="Hover-Modal absolute left-0 right-0 top-full mx-auto max-w-7xl mt-2 bg-white rounded-2xl border border-slate-200/70 shadow-2xl p-6 text-gray-900 z-50 overflow-hidden"
                        onMouseEnter={() => handleMouseEnter(activeHover)}
                        onMouseLeave={handleMouseLeave}
                        data-scrolled={scrolled}
                    >
                        {activeHover === "Tyres" && (
                            <TyresMegaMenu />
                        )}
                        {activeHover === "Shop by Motorcycle" && (
                            <BikeBrandsMegaMenu />
                        )}
                        {activeHover === "Compare Tyres" && (
                            <TyreComparisonMegaMenu />
                        )}
                    </div>
                )}
            </header>

            <ManuSlider
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                setIsLoginOpen={setIsLoginOpen}
                whatsappNumber={WHATSAPP_NUMBER}
                whatsappMessage={NAVIGATION_CONFIG.whatsapp.contactMessage}
            />
            <CartSlider />
            <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </div>
    )
}

export default Header
