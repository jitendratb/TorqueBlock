import { TbShieldCheck, TbRosetteDiscountCheck, TbHeadset } from "react-icons/tb";

const TRUST_ITEMS = [
    // { label: "3 Month Warranty", sub: "On every tyre", Icon: TbShieldCheck },
    { label: "Secure Payments", sub: "Safe online checkout", Icon: TbShieldCheck },
    { label: "100% Genuine Products", sub: "Authentic branded tyres", Icon: TbRosetteDiscountCheck },
    // { label: "Pan-India Delivery", sub: "Delivered across India", Icon: TbTruckDelivery },
    { label: "Expert Guidance", sub: "Tyre advice when needed", Icon: TbHeadset },
];

export default function ProductTrust({ className = "" }) {
    return (
        <ul aria-label="Why buy from Torque Block" className={`grid grid-cols-1 gap-2 md:grid-cols-3 ${className}`}>
            {TRUST_ITEMS.map(({ label, sub, Icon }) => (
                <li
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors duration-300 hover:border-orange-500/40"
                >
                    <Icon className="shrink-0 text-2xl md:text-[28px] text-orange-500" aria-hidden="true" />
                    <span className="flex min-w-0 flex-col gap-0.5">
                        <span className="text-xs font-bold leading-tight text-white">{label}</span>
                        <span className="text-[10px] md:text-[11px] leading-tight text-zinc-400">{sub}</span>
                    </span>
                </li>
            ))}
        </ul>
    );
}
