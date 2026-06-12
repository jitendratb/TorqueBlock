'use client';
import { useEffect, useRef, useState, useCallback, } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Carousel({ items = [], renderItem, autoPlay = false, interval = 4000, itemWidth = 280, gap = 16, showArrows = true, showDots = true, onReachEnd, endThreshold = 80, className = "", children, }) {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const timerRef = useRef(null);
    const tickingRef = useRef(false);
    const endReachedRef = useRef(false);
    const [isEnd, setIsEnd] = useState(false);
    const [current, setCurrent] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);

    const total = items.length;
    const computeItemsPerView = useCallback(() => {
        if (!containerRef.current) return 1;
        const width = containerRef.current.clientWidth;
        
        let actualItemWidth = typeof itemWidth === 'number' ? itemWidth : 280;
        if (trackRef.current && trackRef.current.firstElementChild) {
            actualItemWidth = trackRef.current.firstElementChild.clientWidth || actualItemWidth;
        }

        return Math.max(
            1,
            Math.floor((width + gap) / (actualItemWidth + gap))
        );
    }, [itemWidth, gap]);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver(() => {
            setItemsPerView(computeItemsPerView());
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [computeItemsPerView]);

    const maxIndex = Math.max(total - itemsPerView, 0);

    const scrollToIndex = useCallback(
        (index) => {
            if (!trackRef.current) return;

            let actualItemWidth = typeof itemWidth === 'number' ? itemWidth : 280;
            if (trackRef.current.firstElementChild) {
                actualItemWidth = trackRef.current.firstElementChild.clientWidth || actualItemWidth;
            }

            const bounded = Math.min(Math.max(index, 0), maxIndex);

            trackRef.current.scrollTo({
                left: bounded * (actualItemWidth + gap),
                behavior: "smooth",
            });
        },
        [maxIndex, itemWidth, gap]
    );

    const onScroll = () => {
        if (!trackRef.current || tickingRef.current) return;

        tickingRef.current = true;

        requestAnimationFrame(() => {
            const el = trackRef.current;
            const { scrollLeft, scrollWidth, clientWidth } = el;

            let actualItemWidth = typeof itemWidth === 'number' ? itemWidth : 280;
            if (trackRef.current.firstElementChild) {
                actualItemWidth = trackRef.current.firstElementChild.clientWidth || actualItemWidth;
            }

            const index = Math.round(
                scrollLeft / (actualItemWidth + gap)
            );

            setCurrent(Math.min(Math.max(index, 0), maxIndex));
            setIsEnd(scrollLeft + clientWidth >= scrollWidth - 2);
            /* End detection */
            if (
                onReachEnd &&
                scrollLeft + clientWidth >= scrollWidth - endThreshold
            ) {
                if (!endReachedRef.current) {
                    endReachedRef.current = true;
                    onReachEnd();
                }
            } else {
                endReachedRef.current = false;
            }

            tickingRef.current = false;
        });
    };

    useEffect(() => {
        if (!autoPlay || total <= itemsPerView) return;

        timerRef.current = setInterval(() => {
            setCurrent((prev) => {
                const next = prev >= maxIndex ? 0 : prev + 1;
                scrollToIndex(next);
                return next;
            });
        }, interval);

        return () => clearInterval(timerRef.current);
    }, [
        autoPlay,
        interval,
        total,
        itemsPerView,
        maxIndex,
        scrollToIndex,
    ]);

    const hasLeft = current > 0;
    const hasRight = !isEnd;

    if (!items.length || !renderItem) return null;

    return (
        <div
            ref={containerRef}
            className={`relative w-full ${className}`}
        >
            <div className=" w-full overflow-hidden">
                <div
                    ref={trackRef}
                    onScroll={onScroll}
                    className="flex overflow-x-auto  scroll-smooth scrollbar-hide"
                    style={{ gap }}
                >
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className={`flex shrink-0 ${typeof itemWidth === 'string' ? itemWidth : ''}`}
                            style={typeof itemWidth === 'number' ? { width: itemWidth } : {}}
                        >
                            {renderItem(item, i)}
                        </div>
                    ))}
                    {children}
                </div>
            </div>

            {/* Left */}
            {showArrows && hasLeft && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        scrollToIndex(current - 1);
                    }}
                    aria-label="Previous slide"
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full border border-gray-300 bg-white/40 backdrop-blur-sm hover:bg-orange-500 text-white hover:text-white transition-all duration-300 shadow-xl"
                >
                    <FiChevronLeft size={20} />
                </button>
            )}

            {showArrows && hasRight && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        scrollToIndex(current + 1);
                    }}
                    aria-label="Next slide"
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full border border-gray-300 bg-white/40 backdrop-blur-sm hover:bg-orange-500 text-white  transition-all duration-300 shadow-xl"
                >
                    <FiChevronRight size={20} />
                </button>
            )}

            {showDots && maxIndex > 0 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                scrollToIndex(i);
                            }}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-2 rounded-full transition-all ${current === i
                                ? "bg-orange-500 w-4"
                                : "bg-zinc-600 w-2"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}