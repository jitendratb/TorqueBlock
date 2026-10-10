import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ARROWS = [
    { key: "prev", direction: -1, label: "Show previous images", Icon: FiChevronLeft, position: "-left-2" },
    { key: "next", direction: 1, label: "Show next images", Icon: FiChevronRight, position: "-right-2" },
];

export default function ThumbScrollArrows({ thumbScroll, onScroll }) {
    return ARROWS.map(({ key, direction, label, Icon, position }) => thumbScroll[key] && (
        <button
            key={key}
            type="button"
            aria-label={label}
            onClick={() => onScroll(direction)}
            className={`absolute top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/15 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-orange-500 ${position}`}
        >
            <Icon size={16} aria-hidden="true" />
        </button>
    ));
}
