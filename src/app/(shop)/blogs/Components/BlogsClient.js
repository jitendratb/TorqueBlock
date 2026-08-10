'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import { FaBookOpen, FaFilter } from 'react-icons/fa';
import { HiSparkles, HiFire } from 'react-icons/hi2';
import HeroCarousel from './Carousel';
import BlogCard from './BlogCard';
import InfiniteScroll from '@/components/atoms/InfiniteScroll';
import blogService from '@/services/blogService';

export default function BlogsClient({ blogs = [], pagination = {} }) {
    const [allBlogs, setAllBlogs] = useState(blogs);
    const [activeCategory, setActiveCategory] = useState('All');
    const [page, setPage] = useState(pagination?.currentPage || 1);
    const [totalPages, setTotalPages] = useState(pagination?.totalPages || 1);
    const [loadingMore, setLoadingMore] = useState(false);

    const sectionRef = useRef(null);

    const categories = useMemo(() => {
        const seen = new Set();
        const cats = ['All', 'Trending'];
        allBlogs.forEach(b => {
            const name = b.category?.category;
            if (name && !seen.has(name)) {
                seen.add(name);
                cats.push(name);
            }
        });
        return cats;
    }, [allBlogs]);

    const heroSlides = useMemo(() => allBlogs.slice(0, 6), [allBlogs]);

    const filteredBlogs = useMemo(() => {
        if (activeCategory === 'All') return allBlogs;
        if (activeCategory === 'Trending') return allBlogs.slice(0, 10);
        return allBlogs.filter(b => b.category?.category === activeCategory);
    }, [activeCategory, allBlogs]);

    const hasMore = page < totalPages && activeCategory === 'All';

    const handleLoadMore = useCallback(async () => {
        if (loadingMore || !hasMore) return;
        setLoadingMore(true);

        try {
            const nextPage = page + 1;
            const res = await blogService.getAllBlogs({ page: nextPage, limit: 20 });
            const newBlogs = res?.blogs || [];

            if (newBlogs.length > 0) {
                setAllBlogs((prev) => {
                    const existingSlugs = new Set(prev.map(b => b.slug || b.blogid || b._id));
                    const filteredNew = newBlogs.filter(b => !existingSlugs.has(b.slug || b.blogid || b._id));
                    return [...prev, ...filteredNew];
                });
                setPage(nextPage);
                if (res.pagination?.totalPages) {
                    setTotalPages(res.pagination.totalPages);
                }
            } else {
                setTotalPages(page);
            }
        } catch (err) {
            console.error('[BlogsClient] Failed to load more blogs:', err);
        } finally {
            setLoadingMore(false);
        }
    }, [page, totalPages, hasMore, loadingMore]);

    if (allBlogs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 py-16 text-center">
                <span className="text-6xl animate-bounce">📝</span>
                <h2 className="text-2xl font-black text-white uppercase tracking-wider">No blogs found</h2>
                <p className="text-sm text-zinc-400 max-w-md">
                    Great motorcycle tyre guides and news are coming soon. Stay tuned!
                </p>
            </div>
        );
    }

    return (
        <div className="relative w-full space-y-10 py-4">
         
            <section aria-label="Featured blog posts">
                <HeroCarousel slides={heroSlides} />
            </section>

            <section ref={sectionRef} className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div className="flex items-center gap-3.5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                            <FaBookOpen className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-base md:text-lg font-black uppercase tracking-[0.2em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                                    All Articles & Guides
                                </h2>
                            </div>
                            <p className="text-zinc-400 text-xs font-medium tracking-wide mt-0.5">
                                Explore Tyre Reviews, Riding Tips & Superbike Recommendations
                            </p>
                        </div>
                    </div>

                 
                </div>

                <InfiniteScroll
                    hasMore={hasMore}
                    loading={loadingMore}
                    onLoadMore={handleLoadMore}
                    endMessage="You've explored all articles."
                >
                    <div id="blog-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredBlogs.map((blog, i) => (
                            <BlogCard
                                key={blog._id || blog.slug || blog.blogid || i}
                                blog={blog}
                                size={i === 0 && activeCategory === 'Trending' ? 'featured' : 'standard'}
                                index={i}
                            />
                        ))}
                    </div>
                </InfiniteScroll>
            </section>
        </div>
    );
}
