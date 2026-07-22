import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function StarRating({ rating = 4.5, count = 356, isLoading = false }) {
    if (isLoading) {
        return (
            <div className="flex items-center gap-1.5 animate-pulse">
                <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-[12px] w-[12px] bg-white/10 rounded-sm" />
                    ))}
                </div>
                <div className="h-4 w-6 bg-white/10 rounded-full" />
                <div className="h-4 w-16 bg-white/5 rounded-full" />
            </div>
        );
    }

    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars.push(<FaStar key={i} className="text-orange-400 text-xs" />);
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            stars.push(<FaStarHalfAlt key={i} className="text-orange-400 text-xs" />);
        } else {
            stars.push(<FaRegStar key={i} className="text-zinc-600 text-xs" />);
        }
    }
    return (
        <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">{stars}</div>
            <span className="text-orange-400 text-xs font-bold">{Number(rating).toFixed(1)}</span>
            <span className="text-zinc-500 text-xs">({Number(count).toLocaleString()} reviews)</span>
        </div>
    );
}
