import { FaInstagram, FaRegStar, FaStar, FaStarHalfAlt, FaYoutube } from 'react-icons/fa';
import { FiAward, FiHeadphones, FiThumbsUp, FiTruck, FiUsers } from 'react-icons/fi';
import { RiDoubleQuotesL } from 'react-icons/ri';
import CustomImage from '@/components/molecules/CustomImage';

const ACCENTS = ['#f97316', '#38bdf8', '#a78bfa', '#f472b6', '#34d399', '#fbbf24'];

const CATEGORIES = {
    product_quality: { label: 'Product Quality', Icon: FiAward },
    customer_service: { label: 'Customer Service', Icon: FiHeadphones },
    delivery: { label: 'Delivery', Icon: FiTruck },
    community: { label: 'Community', Icon: FiUsers },
    overall: { label: 'Overall Experience', Icon: FiThumbsUp },
};

const SOCIALS = [
    { key: 'instagram', label: 'Instagram', Icon: FaInstagram, hoverClass: 'hover:text-pink-500 focus-visible:text-pink-500' },
    { key: 'youtube', label: 'YouTube', Icon: FaYoutube, hoverClass: 'hover:text-red-500 focus-visible:text-red-500' },
];

const OPTIMIZABLE_HOST = /(^|\.)torqueblock\.com$|\.postimg\.cc$|(^|\.)postimage\.me$/i;

const toText = (value) => (typeof value === 'string' ? value.trim() : '');
const toHttpUrl = (value) => (/^https?:\/\//i.test(toText(value)) ? toText(value) : '');

function pickAccent(seed) {
    let hash = 0;
    for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    return ACCENTS[hash % ACCENTS.length];
}

function isOptimizable(url) {
    try {
        return OPTIMIZABLE_HOST.test(new URL(url).hostname);
    } catch {
        return false;
    }
}

function Stars({ rating }) {
    return (
        <div className="flex items-center gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
            {[1, 2, 3, 4, 5].map((i) => {
                const Icon = rating >= i ? FaStar : rating >= i - 0.5 ? FaStarHalfAlt : FaRegStar;
                const filled = Icon !== FaRegStar;
                return (
                    <Icon
                        key={i}
                        aria-hidden="true"
                        className={`h-3 w-3 ${filled ? 'text-amber-400' : 'text-white/20 [.light-mode_&]:text-slate-300'}`}
                    />
                );
            })}
        </div>
    );
}

function TestimonialCard({ testimonial, clamp = false, className = '' }) {
    const name = toText(testimonial?.name);
    const quote = toText(testimonial?.experienceFeedback);
    if (!name || !quote) return null;

    const accent = pickAccent(String(testimonial._id ?? name));
    const rating = Number(testimonial.experienceRating);
    const tag = CATEGORIES[testimonial.experienceCategory];
    const avatar = toHttpUrl(testimonial.profile?.url);
    const bikes = [testimonial.bikeModel].flat().map(toText).filter(Boolean);
    const location = [toText(testimonial.city), toText(testimonial.state)].filter(Boolean).join(', ');
    const subline = [bikes.join(', '), location].filter(Boolean).join(' · ') || 'Torque Block Affiliate';
    const socials = SOCIALS.map((social) => ({ ...social, url: toHttpUrl(testimonial[social.key]?.link) })).filter((social) => social.url);

    return (
        <figure
            className={`relative flex flex-col overflow-hidden rounded-[1.25rem] border border-white/10 p-4 shadow-[0_24px_60px_-34px_rgba(0,0,0,0.9)] transition-colors duration-500 hover:border-white/20 [.light-mode_&]:border-white/80 [.light-mode_&]:bg-white/60 [.light-mode_&]:shadow-[0_20px_60px_-24px_rgba(30,27,75,0.25)] ${className}`}
            style={{
                backgroundImage: `radial-gradient(circle at 100% 0%, ${accent}2b, transparent 55%), linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.015))`,
            }}
        >
            <div className="flex min-h-5 items-center justify-between gap-3">
                {rating >= 1 && rating <= 5 ? <Stars rating={rating} /> : <span />}

                {tag && (
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-zinc-300 ring-1 ring-white/10 [.light-mode_&]:bg-white/70 [.light-mode_&]:text-slate-600 [.light-mode_&]:ring-slate-900/5">
                        <tag.Icon aria-hidden="true" className="h-3 w-3" style={{ color: accent }} />
                        {tag.label}
                    </span>
                )}
            </div>

            <blockquote className="mt-2 flex flex-1 gap-1.5 text-sm leading-normal text-zinc-300 [.light-mode_&]:text-slate-700">
                <RiDoubleQuotesL aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} />
                <p className={clamp ? 'line-clamp-3' : ''}>{quote}</p>
            </blockquote>

            <figcaption className="mt-3 flex items-center gap-2.5 border-t border-white/10 pt-3 [.light-mode_&]:border-slate-900/5">
                <span
                    aria-hidden="true"
                    className="inline-flex shrink-0 rounded-full p-[2px]"
                    style={{ backgroundImage: `linear-gradient(135deg, ${accent}, #fdba74)` }}
                >
                    <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#0B0F19] text-xs font-bold uppercase text-white [.light-mode_&]:bg-white [.light-mode_&]:text-slate-800">
                        {name.charAt(0)}
                        {avatar && isOptimizable(avatar) && (
                            <span className="absolute inset-0">
                                <CustomImage src={avatar} alt="" fill sizes="36px" imageClassName="object-cover" />
                            </span>
                        )}
                    </span>
                </span>

                <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-white [.light-mode_&]:text-slate-900">{name}</span>
                    <span className="block truncate text-[11px] text-zinc-400 [.light-mode_&]:text-slate-500">{subline}</span>
                </span>

                {socials.length > 0 && (
                    <span className="flex shrink-0 items-center gap-1.5">
                        {socials.map(({ key, label, Icon, hoverClass, url }) => (
                            <a
                                key={key}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                aria-label={`${name} on ${label}`}
                                className={`flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-zinc-400 ring-1 ring-white/10 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-orange-500 [.light-mode_&]:bg-white/70 [.light-mode_&]:text-slate-500 [.light-mode_&]:ring-slate-900/5 ${hoverClass}`}
                            >
                                <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                            </a>
                        ))}
                    </span>
                )}
            </figcaption>
        </figure>
    );
}

export default TestimonialCard;
