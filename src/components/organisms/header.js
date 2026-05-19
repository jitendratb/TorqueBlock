"use client"

import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import SearchBar from './searchBar';
import { IoMdMenu } from "react-icons/io";

function Header() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [activeHover, setActiveHover] = useState(null);
    const [hoverTimeout, setHoverTimeout] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            setScrolled(scrollTop > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [sidebarOpen]);

    const handleMouseEnter = (menu) => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        setActiveHover(menu);
    };

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => setActiveHover(null), 120);
        setHoverTimeout(timeout);
    };

    const closeSidebar = () => setSidebarOpen(false);

    const toggleMobileExpanded = (name) => {
        setMobileExpanded(prev => prev === name ? null : name);
    };

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Tyres", href: "/tyres" },
        { name: "Bike Brands", href: "/bikes" },
        { name: "Tyre Comparison" },
    ];

    const mobileSubMenus = {
        Tyres: [
            { label: "Pirelli Angel ST", href: "/tyres/pirelli-angel-st" },
            { label: "Pirelli Sport Demon", href: "/tyres/pirelli-sport-demon" },
            { label: "Pirelli MT60 RS", href: "/tyres/pirelli-mt60-rs" },
            { label: "Pirelli Scorpion Trail III", href: "/tyres/pirelli-scorpion-trail-iii" },
            { label: "Pirelli Diablo Rosso IV Corsa", href: "/tyres/pirelli-diablo-rosso-iv-corsa" },
            { label: "Pirelli Diablo Powercruiser", href: "/tyres/pirelli-diablo-powercruiser" },
            { label: "Pirelli Night Dragon", href: "/tyres/pirelli-night-dragon" },
            { label: "Metzeler Racetec TD Slick", href: "/tyres/metzeler-racetec-td-slick" },
        ],
        "Bike Brands": [
            { label: "Harley-Davidson 1200 Custom", href: "/bikes/harley-davidson-1200-custom-tyres" },
            { label: "Harley-Davidson Heritage Classic", href: "/bikes/harley-davidson-heritage-classic-tyres" },
            { label: "Harley-Davidson Road King", href: "/bikes/harley-davidson-road-king-tyres" },
            { label: "Honda XL750 Transalp", href: "/bikes/honda-xl750-transalp-tyres" },
            { label: "Triumph Speed 400", href: "/bikes/triumph-speed-400-tyres" },
            { label: "Triumph Tiger 900 GT", href: "/bikes/triumph-tiger-900-gt-tyres" },
            { label: "Kawasaki Versys 1000", href: "/bikes/kawasaki-versys-1000-tyres" },
            { label: "Ducati Multistrada 1200 S", href: "/bikes/ducati-multistrada-1200-s-tyres" },
        ],
        "Tyre Comparison": [
            { label: "Wet vs Dry Grip", href: "/compare/grip" },
            { label: "Mileage vs Performance", href: "/compare/longevity" },
            { label: "Soft vs Hard Compound", href: "/compare/compound" },
            { label: "Radial vs Bias Ply", href: "/compare/radial-bias" },
            { label: "Street vs Track Tyres", href: "/compare/street-vs-track" },
            { label: "Touring vs Sport Tyres", href: "/compare/touring-vs-sport" },
            { label: "Slicks vs Treaded", href: "/compare/slicks-vs-treaded" },
            { label: "Dual Sport vs Adventure", href: "/compare/dual-sport-vs-adventure" },
        ],
    };

    const MegaMenuContent = () => {
        switch (activeHover) {
            case 'Tyres':
                return (
                    <div className="grid grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Pirelli Collection</h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li><Link href="/tyres/pirelli-angel-st" className="hover:text-orange-500 hover:translate-x-1 inline-block transition-all duration-200">Pirelli Angel ST</Link></li>
                                <li><Link href="/tyres/pirelli-sport-demon" className="hover:text-orange-500 hover:translate-x-1 inline-block transition-all duration-200">Pirelli Sport Demon</Link></li>
                                <li><Link href="/tyres/pirelli-mt60-rs" className="hover:text-orange-500 hover:translate-x-1 inline-block transition-all duration-200">Pirelli MT60 RS</Link></li>
                                <li><Link href="/tyres/pirelli-scorpion-trail-iii" className="hover:text-orange-500 hover:translate-x-1 inline-block transition-all duration-200">Pirelli Scorpion Trail III</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Track & Performance</h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li><Link href="/tyres/pirelli-diablo-rosso-iv-corsa" className="hover:text-orange-500 hover:translate-x-1 inline-block transition-all duration-200">Pirelli Diablo Rosso IV Corsa</Link></li>
                                <li><Link href="/tyres/pirelli-diablo-powercruiser" className="hover:text-orange-500 hover:translate-x-1 inline-block transition-all duration-200">Pirelli Diablo Powercruiser</Link></li>
                                <li><Link href="/tyres/pirelli-night-dragon" className="hover:text-orange-500 hover:translate-x-1 inline-block transition-all duration-200">Pirelli Night Dragon</Link></li>
                                <li><Link href="/tyres/metzeler-racetec-td-slick" className="hover:text-orange-500 hover:translate-x-1 inline-block transition-all duration-200">Metzeler Racetec TD Slick</Link></li>
                            </ul>
                        </div>
                        <div className="col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
                            <div className="relative z-10 flex flex-col h-full justify-center">
                                <span className="inline-block px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded mb-3 w-max uppercase tracking-widest">Smart Tool</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">Find the Perfect Tyre</h3>
                                <p className="text-sm text-gray-600 mb-4 max-w-sm leading-relaxed">Use our advanced recommendation engine to find the exact match for your vehicle.</p>
                                <span className="text-orange-500 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">Try Recommendation Engine<FaArrowRightLong /></span>
                            </div>
                            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-8 translate-y-8 group-hover:scale-110 transition-transform duration-700">
                                <div className="w-48 h-48 rounded-full border-[16px] border-blue-500"></div>
                            </div>
                        </div>
                    </div>
                );

            case 'Bike Brands':
                return (
                    <div className="grid grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="col-span-3">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 border-b border-gray-100 pb-2">Select by Motorcycle Model</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {mobileSubMenus['Bike Brands'].map((bike) => (
                                    <Link key={bike.label} href={bike.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex shrink-0 items-center justify-center group-hover:bg-orange-100 transition-all">
                                            <span className="text-xs font-bold text-gray-500 group-hover:text-orange-500">{bike.label.substring(0, 1)}</span>
                                        </div>
                                        <span className="text-[13px] font-medium text-gray-700 group-hover:text-orange-500 leading-tight">{bike.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 text-white flex flex-col justify-center relative overflow-hidden shadow-lg group">
                            <div className="relative z-10">
                                <span className="inline-block px-2 py-1 bg-white/20 text-white text-[10px] font-bold rounded mb-3 uppercase tracking-widest backdrop-blur-sm">Premium Segment</span>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">Superbikes & Tourers</h3>
                                <p className="text-sm text-gray-400 mb-6 leading-relaxed">Explore high-performance racing and touring tyres.</p>
                                <Link href="/superbikes" className="text-sm font-medium text-white hover:text-blue-400 flex items-center gap-2 group-hover:gap-3 transition-all">View Premium Collection<FaArrowRightLong /></Link>
                            </div>
                            <div className="absolute right-0 top-0 opacity-20 w-32 h-32 bg-blue-500 blur-3xl rounded-full"></div>
                        </div>
                    </div>
                );

            case 'Tyre Comparison':
                return (
                    <div className="grid grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Key Comparisons</h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                {mobileSubMenus['Tyre Comparison'].map(comp => (
                                    <li key={comp.label}><Link href={comp.href} className="hover:text-orange-500 transition-all">{comp.label}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-span-2 flex gap-6">
                            <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                                <div className="text-[10px] font-bold text-orange-500 mb-3 uppercase tracking-widest bg-blue-50 w-max px-2 py-1 rounded">Interactive Tool</div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">Head-to-Head Comparison</h4>
                                <p className="text-sm text-gray-500 mb-6 leading-relaxed">Compare tyre specs side-by-side.</p>
                                <button className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors">Start Comparing</button>
                            </div>
                            <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                                <div className="text-[10px] font-bold text-purple-600 mb-3 uppercase tracking-widest bg-purple-50 w-max px-2 py-1 rounded">Expert Guide</div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">Complete Buying Guide</h4>
                                <p className="text-sm text-gray-500 mb-6 leading-relaxed">Read our comprehensive tyre buying guide.</p>
                                <button className="w-full py-2.5 border-2 border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:border-purple-600 hover:text-purple-700 transition-colors">Read Guide</button>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const WHATSAPP_NUMBER = "916366625625";

    const handleTalkToExpert = (e) => {
        e.preventDefault();
        const message = `Hi Torque Black! I'd like to talk to a tyre expert. Can you help me find the right tyre for my bike?`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    };

    const handleContactUs = (e) => {
        e.preventDefault();
        const message = `Hi Torque Black! I found your website and I'd like to get in touch. Can you assist me?`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    };

    return (
        <div>
            <header className="header-root fixed left-0 right-0 w-full z-50" data-scrolled={scrolled}>
                <nav className={`header-nav flex text-white justify-between items-center gap-4 max-w-7xl mx-auto ${scrolled ? "bg-white/10 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)]" : ""}`}>
                    <Link href="/" className="text-2xl font-bold">
                        <Image src="/newlogo.webp" alt="Logo" width={130} height={120} priority className="inline-block h-auto w-[130px]" />
                    </Link>

                    <ul className='flex items-center gap-6 hidden lg:flex'>
                        {navItems?.map((item) => {
                            const isActive = pathname === item.name;
                            return (
                                <li key={item.name} className="relative cursor-pointer" onMouseEnter={() => handleMouseEnter(item.name)} onMouseLeave={handleMouseLeave}>
                                    {item.href ? (
                                        <Link href={item.href} className={`nav-link text-sm ${isActive ? "active" : ""}`}>{item.name}</Link>
                                    ) : (
                                        <span className={`nav-link text-sm ${isActive ? "active" : ""}`}>{item.name}</span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    <div className='flex items-center justify-end gap-4 w-full max-w-lg'>
                        <SearchBar />
                        <button onClick={handleTalkToExpert} style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }} className="text-sm min-w-[130px] text-white px-3 py-2 rounded-full hover:brightness-110 transition-all duration-300 hidden lg:block">
                            Talk to an Expert
                        </button>
                        <button onClick={handleContactUs} className="hdr-btn-login nav-link hidden lg:block">
                            <span className='text-sm flex gap-2 items-center justify-center min-w-[120px]'>Contact Us <FaArrowRightLong className='arrow-icon' /></span>
                        </button>

                        <button
                            aria-label="Open navigation menu"
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl gap-[5px] hover:bg-white/10 transition-all duration-200"
                        >
                            <IoMdMenu className='text-2xl' />
                        </button>
                    </div>
                </nav>
            </header>

            {activeHover && activeHover !== "Home" && (
                <div className="Hover-Modal fixed left-0 top-[88px] w-full z-40" data-scrolled={scrolled} onMouseEnter={() => { if (hoverTimeout) clearTimeout(hoverTimeout); }} onMouseLeave={handleMouseLeave}>
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.08)] rounded-lg p-8 mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                            <MegaMenuContent />
                        </div>
                    </div>
                </div>
            )}

            <div
                onClick={closeSidebar}
                aria-hidden="true"
                className={`fixed inset-0 z-60 bg-black/55 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            />

            <aside
                aria-label="Mobile navigation"
                style={{
                    background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)',
                    transform: sidebarOpen ? 'translateX(0)' : 'translateX(100%)',
                }}
                className="fixed top-0 right-0 bottom-0 w-[82vw] max-w-[340px] z-[70] flex flex-col overflow-y-auto shadow-[-8px_0_40px_rgba(0,0,0,0.4)] transition-transform duration-[380ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
                <div className="flex items-center justify-between px-5 py-[18px] border-b border-white/[0.07]">
                    <Image src="/newlogo.webp" alt="Torque Black" width={100} height={40} className="h-auto w-[100px]" />
                    <button
                        onClick={closeSidebar}
                        aria-label="Close menu"
                        className="w-9 h-9 rounded-[10px] bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white text-lg cursor-pointer transition-colors duration-200 hover:bg-white/[0.15]"
                    >
                        ✕
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-2 w-full  mx-auto">

                    <Link
                        href="/"
                        onClick={closeSidebar}
                        className={`flex items-center mt-2 rounded-sm px-4 py-3.5 text-[15px] font-semibold border-b border-white/[0.05] transition-colors duration-200 ${pathname === '/' ? 'text-orange-400 bg-orange-500/10' : 'text-slate-100 hover:text-orange-300'
                            }`}
                    >
                        Home
                    </Link>

                    {navItems.filter(item => item.name !== 'Home').map((item) => (
                        <div key={item.name} className="border-b border-white/[0.05]">

                            <p className="py-4  text-[11px] font-bold uppercase tracking-widest text-slate-500">
                                {item.name}
                            </p>
                            <div className='space-y-2'>
                                {mobileSubMenus[item.name]?.map((sub) => (
                                    <Link
                                        key={sub.label}
                                        href={sub.href}
                                        onClick={closeSidebar}
                                        className="flex rounded-sm items-center gap-2.5 pl-6 pr-5 py-2.5 border border-gray-500 bg-white/20 text-slate-300 text-sm font-medium transition-all duration-200 hover:text-orange-400 hover:pl-8"
                                    >
                                        {sub.label}
                                    </Link>
                                ))}
                            </div>


                            <div className="h-2" />
                        </div>
                    ))}

                </nav>

                <div className="py-4 px-2 border-t border-white/[0.07] flex flex-col gap-2.5">
                    <button
                        onClick={(e) => { closeSidebar(); handleTalkToExpert(e); }}
                        className="hidden xl:block w-full py-3 rounded-xl text-white text-sm font-semibold cursor-pointer transition-all duration-200 hover:brightness-110"
                        style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
                    >
                        Talk to an Expert
                    </button>
                    <button
                        onClick={(e) => { closeSidebar(); handleContactUs(e); }}
                        className="w-full py-3 rounded-xl bg-transparent text-slate-100 text-sm font-semibold border border-white/[0.15] flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:border-orange-400 hover:text-orange-400"
                    >
                        Contact Us <FaArrowRightLong />
                    </button>
                </div>
            </aside>
        </div>
    )
}

export default Header