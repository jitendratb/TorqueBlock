'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HiArrowTrendingUp, HiClock } from 'react-icons/hi2';
import HeroCarousel from './Carousel';
import BlogCard from './BlogCard';
import Pagination from '@/components/atoms/Pagination';


export default function BlogsClient({ blogs = [], pagination = {} }) {
    const router = useRouter();
    const categories = useMemo(() => {
        const seen = new Set();
        return blogs.reduce((acc, b) => {
            const name = b.category?.category;
            if (name && !seen.has(name)) { seen.add(name); acc.push(name); }
            return acc;
        }, []);
    }, [blogs]);

    const tabs = useMemo(() => ['Trending', 'Recent', ...categories], [categories]);
    const [activeTab, setActiveTab] = useState('Trending');
    const tabBarRef = useRef(null);
    const indicatorRef = useRef(null);
    const sectionRef = useRef(null);

    const handlePageChange = (newPage) => {
        router.push(`/blogs?page=${newPage}`, { scroll: false });
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    useEffect(() => {
        const bar = tabBarRef.current;
        const ind = indicatorRef.current;
        if (!bar || !ind) return;
        const active = bar.querySelector('[data-active="true"]');
        if (!active) return;
        const barRect = bar.getBoundingClientRect();
        const activeRect = active.getBoundingClientRect();
        ind.style.left = `${activeRect.left - barRect.left}px`;
        ind.style.width = `${activeRect.width}px`;
    }, [activeTab]);

    const heroSlides = useMemo(() => blogs.slice(0, 6), [blogs]);

    const filteredBlogs = useMemo(() => {
        if (activeTab === 'Trending') return blogs.slice(0, 11);
        if (activeTab === 'Recent') return blogs.slice(0, 18);
        return blogs.filter(b => b.category?.category === activeTab);
    }, [activeTab, blogs]);

    const sectionTitle =
        activeTab === 'Trending' ? 'Trending Now' :
            activeTab === 'Recent' ? 'Latest Articles' :
                activeTab;
    const countFor = (tab) => {
        if (tab === 'Trending') return Math.min(blogs.length, 11);
        if (tab === 'Recent') return Math.min(blogs.length, 18);
        return blogs.filter(b => b.category?.category === tab).length;
    };

    if (blogs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 py-10 text-center">
                <span className="text-5xl">📝</span>
                <h2 className="text-[1.6rem] font-extrabold text-gray-100 m-0">No blogs yet</h2>
                <p className="text-[0.95rem] text-gray-500 m-0">Great content is on its way — check back soon.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <section aria-label="Featured blog posts">
                <HeroCarousel slides={heroSlides} />
            </section>

            <section ref={sectionRef} className="flex flex-col gap-4">
                <div className="flex items-end justify-between gap-4 md:gap-6 flex-wrap">
                    <div className="flex flex-col gap-1">
                        <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-orange-500"> Explore</span>
                        <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold text-gray-100 m-0 leading-tight"> {sectionTitle} </h2>
                    </div>

                    <nav ref={tabBarRef} role="tablist" aria-label="Blog categories" className="relative flex items-center gap-1 bg-gray-900/70 border border-white/[0.08] rounded-full px-1.5 py-1.5 backdrop-blur-md overflow-x-auto scrollbar-hide max-md:self-stretch max-md:w-full" >
                        <div ref={indicatorRef} aria-hidden="true" className="absolute top-1.5 h-[calc(100%-12px)] bg-orange-500/15 border border-orange-500/35 rounded-full transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none z-0" />

                        {tabs.map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <button
                                    key={tab}
                                    role="tab"
                                    id={`tab-${tab}`}
                                    aria-selected={isActive}
                                    aria-controls="blog-grid"
                                    data-active={isActive}
                                    onClick={() => setActiveTab(tab)}
                                    className={`
                                        relative z-10 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-none cursor-pointer
                                        whitespace-nowrap text-[0.82rem] font-semibold font-[Inter,sans-serif]
                                        transition-colors duration-250
                                        ${isActive ? 'text-orange-500' : 'text-gray-400 hover:text-gray-100'}
                                        bg-transparent
                                    `}
                                >
                                    {tab === 'Trending' && (
                                        <HiArrowTrendingUp size={14} aria-hidden="true" />
                                    )}
                                    {tab === 'Recent' && (
                                        <HiClock size={14} aria-hidden="true" />
                                    )}
                                    {tab}
                                    <span className="inline-flex items-center justify-center min-w-[20px] h-[18px] px-1.5 rounded-full text-[0.68rem] font-bold bg-orange-500/15 text-orange-500">
                                        {countFor(tab)}
                                    </span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div id="blog-grid" role="tabpanel" aria-labelledby={`tab-${activeTab}`} key={activeTab} className="grid grid-cols-3 gap-6 animate-[fadeIn_0.4s_ease_both] max-lg:grid-cols-2 max-md:grid-cols-1"   >
                    {filteredBlogs.map((blog, i) => (
                        <BlogCard key={`${activeTab}-${i}`} blog={blog} size={i === 0 && activeTab === 'Trending' ? 'featured' : 'standard'} index={i} />
                    ))}
                </div>

                {pagination?.totalPages > 1 && (
                    <Pagination 
                        page={pagination?.currentPage} 
                        totalPages={pagination?.totalPages} 
                        onPageChange={handlePageChange} 
                    />
                )}
            </section>
        </div>
    );
}
