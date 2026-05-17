import React, { useRef } from "react";
import { FiZap, FiCheckCircle, FiInfo, FiShield, FiMessageCircle, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GiCartwheel } from "react-icons/gi";

const PerformanceDNA = ({ points }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" 
                ? scrollLeft - clientWidth * 0.8 
                : scrollLeft + clientWidth * 0.8;
            
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <div className="md:col-span-12 space-y-4">
            <div className="flex items-center justify-between md:gap-4 md:px-4 ">
                <div className="flex items-center gap-4 flex-1 w-full">
                    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Performance DNA</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
                </div>

                <div className="flex md:hidden gap-2">
                    <button 
                        onClick={() => scroll("left")}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-orange-500 hover:text-black transition-all active:scale-95"
                    >
                        <FiChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={() => scroll("right")}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-orange-500 hover:text-black transition-all active:scale-95"
                    >
                        <FiChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div 
                ref={scrollRef}
                className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 snap-x snap-mandatory scrollbar-hide pb-4"
            >
                {points?.map((point, idx) => (
                    <div
                        key={idx}
                        className="group relative p-8 bg-zinc-950 border border-zinc-900 rounded-[1.5rem] md:rounded-[2.5rem] hover:border-orange-500/50 transition-all duration-500 overflow-hidden min-w-[85vw] md:min-w-0 snap-center"
                    >
          
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/5 blur-3xl group-hover:bg-orange-500/10 transition-colors" />

                        <div className="relative z-10 space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-500">
                                    {idx === 0 ? <FiZap className="text-orange-500 group-hover:text-black" size={24} /> :
                                        idx === 1 ? <GiCartwheel className="text-orange-500 group-hover:text-black" size={24} /> :
                                            idx === 2 ? <FiCheckCircle className="text-orange-500 group-hover:text-black" size={24} /> :
                                                idx === 3 ? <FiInfo className="text-orange-500 group-hover:text-black" size={24} /> :
                                                    idx === 4 ? <FiShield className="text-orange-500 group-hover:text-black" size={24} /> :
                                                        <FiMessageCircle className="text-orange-500 group-hover:text-black" size={24} />}
                                </div>
                                <span className="text-3xl font-black text-zinc-900 group-hover:text-orange-500/20 transition-colors italic">
                                    0{idx + 1}
                                </span>
                            </div>

                            <p className="text-zinc-400 text-lg font-medium leading-relaxed group-hover:text-white transition-colors">
                                {point}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PerformanceDNA;
