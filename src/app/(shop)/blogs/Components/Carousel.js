'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { HiChevronLeft, HiChevronRight, HiArrowRight } from 'react-icons/hi2';

export default function HeroCarousel({ slides = [] }) {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [progressKey, setProgressKey] = useState(0);
    const dragStartX = useRef(0);
    const total = slides.length;

    const goTo = useCallback((idx) => {
        setActiveIndex((idx + total) % total);
        setProgressKey(k => k + 1);
    }, [total]);

    const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
    const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

    useEffect(() => {
        if (total <= 1 || isPaused) return;
        const t = setTimeout(next, 5000);
        return () => clearTimeout(t);
    }, [activeIndex, isPaused, next, total]);

    useEffect(() => {
        const h = (e) => {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [next, prev]);

    const onDragStart = (x) => { dragStartX.current = x; setIsDragging(true); };
    const onDragEnd = (x) => {
        if (!isDragging) return;
        setIsDragging(false);
        const diff = dragStartX.current - x;
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    };

    if (total === 0) return null;

    return (
        <section
            className={`relative w-full h-[240px] md:h-[350px] xl:max-w-[950px] rounded-xl overflow-hidden  select-none`}
            aria-label="Featured blog posts"
            aria-roledescription="carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onMouseDown={(e) => onDragStart(e.clientX)}
            onMouseUp={(e) => onDragEnd(e.clientX)}
            onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
            onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
        >
            {slides.map((blog, i) => {
                const slug = blog.blogid ?? blog.header?.toLowerCase().replace(/\s+/g, '-');
                const isActive = i === activeIndex;

                return (
                    <div
                        key={i}
                        onClick={() => isActive && router.push(`/blogs/${slug}`)}
                        className={`
                            absolute inset-0 flex items-end
                            transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                            ${isActive ? 'opacity-100 z-20 pointer-events-auto' : 'opacity-0 z-10 pointer-events-none'}
                        `}
                        aria-hidden={!isActive}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${i + 1} of ${total}: ${blog.header}`}
                    >
                        {blog?.image && (
                            <div className="absolute inset-0 overflow-hidden">
                                <Image
                                    src={blog.image}
                                    alt={blog.header ?? 'Blog image'}
                                    fill
                                    priority={i === 0}
                                    className={`object-cover object-center transition-transform ease-linear ${isActive ? 'scale-110 duration-[8000ms]' : 'scale-100 duration-0'}`}
                                    sizes="100vw"
                                />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/90 via-[#0B0F19]/50 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/85 via-[#0B0F19]/20 to-transparent pointer-events-none" />

                  
                        <div className="relative z-10 flex flex-col gap-3 px-4 md:px-8 md:py-8 py-[38px] max-w-[60%] max-md:max-w-full ">

                            <h2 className={`
                                text-xl md:text-3xl font-black text-white
                                uppercase tracking-tighter leading-none drop-shadow-md m-0
                                transition-all ease-out line-clamp-2
                                ${isActive
                                    ? 'opacity-100 translate-y-0 duration-700 delay-100'
                                    : 'opacity-0 translate-y-6 duration-300 delay-0'}
                            `}>
                                {blog?.header}
                            </h2>

                            {blog.subHeader && (
                                <p className={`
                                    text-xs text-gray-300/85 leading-relaxed m-0 line-clamp-2
                                    transition-all ease-out
                                    ${isActive
                                        ? 'opacity-100 translate-y-0 duration-700 delay-200'
                                        : 'opacity-0 translate-y-6 duration-300 delay-0'}
                                `}>
                                    {blog?.subHeader}
                                </p>
                            )}

                            <div className={`transition-all hidden md:block ease-out ${isActive ? 'opacity-100 translate-y-0 duration-700 delay-300' : 'opacity-0 translate-y-6 duration-300 delay-0'}`}>
                                <Link
                                    href={`/blogs/${slug}`}
                                    tabIndex={isActive ? 0 : -1}
                                    className="group/cta inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[0.85rem] font-bold tracking-wide no-underline shadow-[0_6px_24px_rgba(249,115,22,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(249,115,22,0.5)] hover:gap-3"
                                >
                                    Read Article
                                    <HiArrowRight size={13} aria-hidden="true" className="transition-transform duration-300 " />
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}

            {total > 1 && (
                <>
                    {/* <button
                        onClick={prev}
                        aria-label="Previous slide"
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-gray-900/75 border border-white/10 text-white backdrop-blur-md transition-all duration-250 hover:bg-white/10 hover:border-transparent cursor-pointer"
                    >
                        <HiChevronLeft className='text-md' aria-hidden="true" />
                    </button>

                    <button
                        onClick={next}
                        aria-label="Next slide"
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-gray-900/75 border border-white/10 text-white backdrop-blur-md transition-all duration-250 hover:bg-white/10 hover:border-transparent cursor-pointer"
                    >
                        <HiChevronRight className='text-md' aria-hidden="true" />
                    </button> */}

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-white/10 px-2 py-1.5 rounded-full" role="tablist" aria-label="Carousel navigation">
                        {slides?.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                role="tab"
                                aria-selected={i === activeIndex}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`h-2 rounded-full border-none cursor-pointer p-0 transition-all duration-300 ${i === activeIndex ? 'w-7 bg-orange-500' : 'w-2 bg-white/35 hover:bg-white/60'}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
