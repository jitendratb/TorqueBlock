"use client"

import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { FaArrowRightLong, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import SearchBar from './searchBar';
import { IoMdMenu } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import ManuSlider from './ManuSlider';
import CartSlider from './CartSlider';
import Login from './login';
import useCartStore from '@/stores/cartStore';

const WHATSAPP_NUMBER = "916366625625";

const NAVIGATION_CONFIG = {
    whatsapp: {
        number: WHATSAPP_NUMBER,
        expertMessage: "Hi Torque Block! I'd like to talk to a tyre expert. Can you help me find the right tyre for my bike?",
        contactMessage: "Hi Torque Block! I found your website and I'd like to get in touch. Can you assist me?",
    },
    navItems: [
        { name: "Home", href: "/" },
        { name: "Tyres", href: "/tyres" },
        { name: "Motorcycles", href: "/bikes" },
        { name: "Tyre Comparison", href: "/compare" },
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
        "Motorcycles": [
            { label: "Royal Enfield Himalayan 450", href: "/bikes/royal-enfield-himalayan-450-tyres" },
            { label: "KTM 390 Adventure", href: "/bikes/ktm-390-adventure-tyres" },
            { label: "BMW G 310 GS", href: "/bikes/bmw-g-310-gs-tyres" },
            { label: "Honda NX500", href: "/bikes/honda-nx500-tyres" },
            { label: "KTM Duke 390", href: "/bikes/ktm-duke-390-tyres" },
            // { label: "Yamaha R15 V4", href: "/bikes/yamaha-r15-v4-tyres" },
            { label: "Kawasaki Ninja 300", href: "/bikes/kawasaki-ninja-300-tyres" },
            { label: "Triumph Speed 400", href: "/bikes/triumph-speed-400-tyres" },
            {label:"Royal Enfield Interceptor 650" , href:"/bikes/royal-enfield-interceptor-650-tyres"},
            {label:"Royal Enfield Continental GT 650", href:"/bikes/royal-enfield-continental-gt-650-tyres"}

        ],
        "Tyre Comparison": [
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


const TyresMegaMenu = React.memo(({ tabIndex, onAction }) => (
    <div className="grid grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 border-b border-gray-100 pb-2">High Demanding Tyres</h3>
            <ul className="space-y-2 text-sm text-gray-600">
                {NAVIGATION_CONFIG.mobileSubMenus.Tyres.slice(0, 5).map((item) => (
                    <li key={item.label}>
                        <Link href={item.href} tabIndex={tabIndex} className="hover:text-orange-500 hover:translate-x-1 inline-block transition-all duration-200">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 border-b border-gray-100 pb-2">Track & Performance</h3>
            <ul className="space-y-2 text-sm text-gray-600">
                {NAVIGATION_CONFIG.mobileSubMenus.Tyres.slice(5).map((item) => (
                    <li key={item.label}>
                        <Link href={item.href} tabIndex={tabIndex} className="hover:text-orange-500 hover:translate-x-1 inline-block transition-all duration-200">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        <button
            onClick={() => onAction("I want to find the perfect tyre for my motorcycle. Can you help me find the best match based on my bike model and riding style?")}
            tabIndex={tabIndex}
            className="col-span-2 text-left bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <div className="relative z-10 flex flex-col h-full justify-center">
                <span className="inline-block px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded mb-3 w-max uppercase tracking-widest">Smart Tool</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">Find the Perfect Tyre</h3>
                <p className="text-sm text-gray-600 mb-4 max-w-sm leading-relaxed">Use our advanced recommendation engine to find the exact match for your vehicle.</p>
                <span className="text-orange-500 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                    Try Recommendation Engine <FaArrowRightLong />
                </span>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-8 translate-y-8 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                <div className="w-48 h-48 rounded-full border-[16px] border-blue-500"></div>
            </div>
        </button>
    </div>
));
TyresMegaMenu.displayName = "TyresMegaMenu";

const BikeBrandsMegaMenu = React.memo(({ tabIndex, onAction }) => (
    <div className="grid grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="col-span-3">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 border-b border-gray-100 pb-2">Find Perfect Tyres for Your Bike</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {NAVIGATION_CONFIG.mobileSubMenus["Motorcycles"].map((bike) => (
                    <Link
                        key={bike.label}
                        href={bike.href}
                        tabIndex={tabIndex}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all group focus:outline-none focus:bg-gray-50"
                    >
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex shrink-0 items-center justify-center group-hover:bg-orange-100 transition-all">
                            <span className="text-xs font-bold text-gray-500 group-hover:text-orange-500">{bike.label.substring(0, 1)}</span>
                        </div>
                        <span className="text-[13px] font-medium text-gray-700 group-hover:text-orange-500 leading-tight">{bike.label}</span>
                    </Link>
                ))}
            </div>
        </div>
        <button
            onClick={() => onAction("I want to find the perfect tyre for my motorcycle. Can you help me find the best match based on my bike model and riding style?")}
            tabIndex={tabIndex}
            className="text-left bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 text-white flex flex-col justify-center relative overflow-hidden shadow-lg group focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
            <div className="relative z-10">
                <span className="inline-block px-2 py-1 bg-white/20 text-white text-[10px] font-bold rounded mb-3 uppercase tracking-widest backdrop-blur-sm">Premium Segment</span>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">Superbikes & Tourers</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">Explore high-performance racing and touring tyres.</p>
                <div className="text-sm font-medium text-white group-hover:text-blue-400 flex items-center gap-2 group-hover:gap-3 transition-all">
                    View Premium Collection <FaArrowRightLong />
                </div>
            </div>
            <div className="absolute right-0 top-0 opacity-20 w-32 h-32 bg-blue-500 blur-3xl rounded-full"></div>
        </button>
    </div>
));
BikeBrandsMegaMenu.displayName = "BikeBrandsMegaMenu";

const TyreComparisonMegaMenu = React.memo(({ tabIndex, onAction }) => (
    <div className="flex justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Key Comparisons</h3>
            <ul className="space-y-3 text-sm text-gray-600 grid grid-cols-2 gap-x-8 gap-y-2">
                {NAVIGATION_CONFIG.mobileSubMenus["Tyre Comparison"].map((comp) => (
                    <li key={comp.label}>
                        <Link href={comp.href} tabIndex={tabIndex} className="hover:text-orange-500 transition-all focus:outline-none focus:text-orange-500">
                            {comp.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        <button
            onClick={() => onAction("I want to find the perfect tyre for my motorcycle. Can you help me find the best match based on my bike model and riding style?")}
            tabIndex={tabIndex}
            className="flex w-[320px] text-left focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-2xl overflow-hidden"
        >
            <div className="relative flex-1 bg-gradient-to-br from-purple-900/90 to-indigo-950/95 p-6 text-white hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)] transition-all duration-500 hover:-translate-y-1.5 group border border-purple-500/20 shadow-xl flex flex-col justify-between h-full w-full">
                <div className="absolute -right-8 -bottom-8 opacity-30 w-36 h-36 bg-purple-500 blur-3xl rounded-full group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                    <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-[9px] font-extrabold rounded mb-3 w-max uppercase tracking-[0.2em] border border-purple-500/30">Expert Guide</span>
                    <h4 className="text-lg font-extrabold text-white mb-2 group-hover:text-purple-300 transition-colors tracking-tight leading-snug">Ultimate Buying Blueprint</h4>
                    <p className="text-xs text-purple-200/70 mb-6 leading-relaxed">Master tyre compounds, performance metrics, and track compatibility to build the perfect setup.</p>
                    <div className="text-sm font-bold text-white group-hover:text-purple-300 flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                        Unlock Tyre Guide <FaArrowRightLong className="text-purple-400 group-hover:text-purple-300 transition-colors" />
                    </div>
                </div>
            </div>
        </button>
    </div>
));
TyreComparisonMegaMenu.displayName = "TyreComparisonMegaMenu";

// --- Main Header Component ---

function Header() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [activeHover, setActiveHover] = useState(null);
    const [hoverTimeout, setHoverTimeout] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const cart = useCartStore((state) => state.cart || []);
    const setCartSliderOpen = useCartStore((state) => state.setSliderOpen);
    const totalItems = isMounted ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;


    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Dynamic Whatsapp lead generation triggers
    const handleTalkToExpert = useCallback((e) => {
        e.preventDefault();
        const message = NAVIGATION_CONFIG.whatsapp.expertMessage;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    }, []);

    const handleContactUs = useCallback((e) => {
        e.preventDefault();
        const message = NAVIGATION_CONFIG.whatsapp.contactMessage;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    }, []);

    const handleTalk = useCallback((message) => {
        const mess = `Hi Torque Block! ${message}`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mess)}`, "_blank");
    }, []);

    // Passive scroll listener for sleek backdrop-blur toggles
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(document.documentElement.scrollTop > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Global Key Events for full Accessibility (Escape closes overlays)
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

    // Mobile scroll-lock management
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

    const closeSidebar = useCallback(() => setSidebarOpen(false), []);

    const toggleMobileExpanded = useCallback((name) => {
        setMobileExpanded(prev => prev === name ? null : name);
    }, []);

    return (
        <div>
            <header className="header-root fixed left-0 right-0 w-full z-50" data-scrolled={scrolled}>
                <nav className={`header-nav flex text-white justify-between items-center gap-4 max-w-7xl mx-auto ${scrolled ? "bg-white/10 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)]" : ""}`}>
                    <Link href="/" className="text-2xl font-bold" aria-label="Torque Block Home">
                        <Image src="/newlogo.webp" alt="Torque Block Logo" width={130} height={120} priority className="inline-block h-auto w-[130px]" style={{ height: 'auto' }} />
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
                                            className={`nav-link text-xs uppercase font-bold ${isActive ? "active" : ""}`}
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

                    <div className='flex items-center justify-end gap-4 w-full lg:max-w-sm xl:max-w-lg'>
                        <SearchBar />
                        <button
                            onClick={() => setCartSliderOpen(true)}
                            className="relative flex items-center justify-center h-10 px-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 cursor-pointer text-white gap-2"
                            aria-label="Open cart"
                        >
                            <IoCartOutline className='text-xl' /> 
                            <span className="text-sm font-bold uppercase  hidden sm:block">Cart</span>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full shadow-lg">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        <button
                            aria-label="Open navigation menu"
                            aria-expanded={sidebarOpen}
                            onClick={() => setSidebarOpen(true)}
                            className="flex flex-col justify-center items-center w-10 h-10 rounded-xl gap-[5px] bg-white/10 hover:bg-white/20 transition-all duration-200 cursor-pointer text-white"
                        >
                            <IoMdMenu className='text-2xl' />
                        </button>
                    </div>
                </nav>
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
