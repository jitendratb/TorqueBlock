import { useRouter } from 'next/navigation';
import React from 'react';
import { FaCheck, FaArrowRight } from "react-icons/fa";

export default function MatchingTyreItem({ item, parentTyre, isSelected, parentAvailability, onSelect, formatPrice, onViewDetails }) {
    const router = useRouter();
    const availability = item.availability;
    const isOrderable = availability !== "out_of_stock" && availability === parentAvailability;

    const availBadgeClass = availability === "in_stock"
        ? "bg-green-500/10 border-green-500/20 text-green-400"
        : availability === "backorder"
            ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
            : availability === "preorder"
                ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                : "bg-red-500/10 border-red-500/20 text-red-400";

    const availLabel = availability === "in_stock" ? "In Stock"
        : availability === "backorder" ? "Avail. For Order"
            : availability === "preorder" ? "Pre Order"
                : "Out of Stock";

    const handleViewDetails = () => {
        const tyreIdentifier = parentTyre?.identifier || parentTyre?.productIdentifier || "unknown";
        router.push(`/tyres/${tyreIdentifier}/${item?.size?.toLowerCase().replace(/[\s/]/g, '-')}`);
    };


    return (
        <button
            onClick={() => isOrderable && onSelect(isSelected ? null : item)}
            disabled={!isOrderable}
            className={`flex flex-col p-3 w-full rounded-2xl border border-white/10 text-left transition-all duration-300 relative group ${!isOrderable
                ? "bg-zinc-900/30 border-white/10 opacity-50 cursor-not-allowed"
                : isSelected
                    ? "bg-orange-500/10 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.15)] cursor-pointer"
                    : "bg-white/5 border-white/5 hover:border-white/15 cursor-pointer"
                }`}
        >
            <div className="flex justify-between items-center w-full mb-1">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${isSelected ? "border-orange-500 bg-orange-500" : "border-zinc-700 bg-zinc-950/50"
                    }`}>
                    {isSelected && (
                        <FaCheck className="text-[8px] text-white" />
                    )}
                </div>
                <div className="flex gap-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border transition-all ${isSelected
                        ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
                        : "bg-white/20 border-white/80 text-white/80 group-hover:text-white"
                        }`}>
                        {item.position}
                    </span>

                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border transition-all ${availBadgeClass}`}>
                        {availLabel}
                    </span>
                </div>
            </div>

            <h4 className={`text-base font-black transition-colors tracking-tight mb-1 ${!isOrderable ? "text-zinc-500" : "text-white"}`}>
                {item.size}
            </h4>

            <div className="flex justify-between items-center w-full mt-2 pt-2 border-t border-white/5">
                <p className={`text-sm font-black ${!isOrderable ? "text-zinc-500" : "text-orange-300"}`}>
                    {formatPrice(item.price)}
                </p>

                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails();
                    }}
                    className="group/btn relative overflow-hidden px-2.5 py-1 rounded-md border border-white/10 bg-white/5 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300 flex items-center gap-1.5 cursor-pointer z-10"
                >
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 group-hover/btn:text-orange-400 transition-colors">
                        View
                    </span>
                    <FaArrowRight className="text-[8px] text-zinc-500 group-hover/btn:text-orange-400 transition-all group-hover/btn:translate-x-0.5" />
                </div>
            </div>
        </button>
    );
}
