import { FaShieldAlt, FaLock } from "react-icons/fa";
import { MdVerified, MdSupportAgent } from "react-icons/md";

const TRUST_ITEMS = [
    // { label: "3 Month Warranty", sub: "On Every Tyre", Icon: FaShieldAlt, card: "border-orange-500/20 from-orange-500/10 hover:border-orange-500/50 hover:from-orange-500/15", badge: "bg-orange-500/15 ring-orange-500/30", icon: "text-orange-400" },
    {
        label: "Secure Payment",
        sub: "Safe Checkout",
        Icon: FaLock,
        card: "border-blue-500/20 from-blue-500/10 hover:border-blue-500/50 hover:from-blue-500/15",
        badge: "bg-blue-500/15 ring-blue-500/30",
        icon: "text-blue-400",
    },
    {
        label: "100% Genuine",
        sub: "Certified Brand",
        Icon: MdVerified,
        card: "border-emerald-500/20 from-emerald-500/10 hover:border-emerald-500/50 hover:from-emerald-500/15",
        badge: "bg-emerald-500/15 ring-emerald-500/30",
        icon: "text-emerald-400",
    },
    {
        label: "Expert Support",
        sub: "24/7 Help",
        Icon: MdSupportAgent,
        card: "border-orange-500/20 from-orange-500/10 hover:border-orange-500/50 hover:from-orange-500/15",
        badge: "bg-orange-500/15 ring-orange-500/30",
        icon: "text-orange-400",
    },
];

export default function ProductTrust({ className = "" }) {
    return (
        <ul aria-label="Why buy from Torque Block" className={`grid grid-cols-3 gap-2 sm:gap-3 ${className}`}>
            {TRUST_ITEMS.map(({ label, sub, Icon, card, badge, icon }) => (
                <li
                    key={label}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 rounded-xl border bg-gradient-to-b to-white/10 px-1 py-2.5 sm:px-2 sm:py-3 text-center backdrop-blur-sm transition-all duration-300 ${card}`}
                >
                    <span className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full ring-1 ${badge}`}>
                        <Icon className={`text-sm sm:text-lg ${icon}`} aria-hidden="true" />
                    </span>
                    <span className="flex flex-col">
                        <span className="text-[10px] md:text-[11px] font-bold leading-tight tracking-wide text-white/90">{label}</span>
                        <span className="text-[8px] md:text-[9px] leading-tight text-zinc-500">{sub}</span>
                    </span>
                </li>
            ))}
        </ul>
    );
}
