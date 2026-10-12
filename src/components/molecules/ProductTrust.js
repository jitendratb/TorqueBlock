import { TbShieldCheck, TbRosetteDiscountCheckFilled, TbTruckDelivery } from "react-icons/tb";
import { MdSupportAgent } from "react-icons/md";

const TRUST_ITEMS = [
    // { label: "3 Month Warranty", sub: "On Every Tyre", Icon: FaShieldAlt, card: "border-orange-500/20 from-orange-500/10 hover:border-orange-500/50 hover:from-orange-500/15", badge: "bg-orange-500/15 ring-orange-500/30", icon: "text-orange-400" },
    {
        label: "Secure Payments",
        sub: "Safe Online Checkout",
        Icon: TbShieldCheck,
        card: "border-blue-500/30 from-blue-500/10 hover:border-blue-500/60",
        badge: "bg-blue-500/10 ring-blue-500/40 shadow-[0_0_14px_rgba(59,130,246,0.35)]",
        icon: "text-blue-400",
    },
    {
        label: "100% Genuine Products",
        sub: "Authentic Branded Tyres",
        Icon: TbRosetteDiscountCheckFilled,
        card: "border-emerald-500/30 from-emerald-500/10 hover:border-emerald-500/60",
        badge: "bg-emerald-500/10 ring-emerald-500/40 shadow-[0_0_14px_rgba(16,185,129,0.35)]",
        icon: "text-emerald-400",
    },
    // {
    //     label: "Pan-India Delivery",
    //     sub: "Delivered Across India",
    //     Icon: TbTruckDelivery,
    //     card: "border-orange-500/30 from-orange-500/10 hover:border-orange-500/60",
    //     badge: "bg-orange-500/10 ring-orange-500/40 shadow-[0_0_14px_rgba(249,115,22,0.35)]",
    //     icon: "text-orange-400",
    // },
    {
        label: "Expert Guidance",
        sub: "Tyre Advice When Needed",
        Icon: MdSupportAgent,
        card: "border-violet-500/30 from-violet-500/10 hover:border-violet-500/60",
        badge: "bg-violet-500/10 ring-violet-500/40 shadow-[0_0_14px_rgba(139,92,246,0.35)]",
        icon: "text-violet-400",
    },
];

export default function ProductTrust({ className = "" }) {
    return (
        <ul aria-label="Why buy from Torque Block" className={`grid grid-cols-1 gap-2 md:grid-cols-3 ${className}`}>
            {TRUST_ITEMS.map(({ label, sub, Icon, card, badge, icon }) => (
                <li
                    key={label}
                    className={`flex items-center gap-2.5 rounded-xl border bg-gradient-to-br to-transparent p-2.5 text-left backdrop-blur-sm transition-colors duration-300 lg:flex-col lg:gap-1.5 lg:text-center xl:flex-row xl:gap-2.5 xl:text-left ${card}`}
                >
                    <span className={`flex h-8 w-8 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-full ring-1 ${badge}`}>
                        <Icon className={`text-base md:text-lg ${icon}`} aria-hidden="true" />
                    </span>
                    <span aria-hidden="true" className="h-8 w-px shrink-0 bg-white/10 lg:hidden xl:block" />
                    <span className="flex min-w-0 flex-col gap-0.5">
                        <span className="text-[10px] md:text-[10px] font-bold leading-tight text-white">{label}</span>
                        <span className="text-[9px] md:text-[10px] leading-tight text-zinc-400">{sub}</span>
                    </span>
                </li>
            ))}
        </ul>
    );
}
