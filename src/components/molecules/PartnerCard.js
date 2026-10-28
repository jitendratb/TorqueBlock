import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FiLink, FiMapPin, FiStar, FiTag } from 'react-icons/fi';
import { MdTwoWheeler } from 'react-icons/md';
import CustomImage from '@/components/molecules/CustomImage';

const PARTNER_TYPES = {
    influencer: { label: 'Influencer', Icon: FiStar, className: 'bg-orange-500/15 text-orange-300 ring-orange-500/30' },
    affiliate: { label: 'Affiliate', Icon: FiLink, className: 'bg-sky-500/15 text-sky-300 ring-sky-500/30' },
};

const SOCIALS = [
    { key: 'instagram', label: 'Instagram', unit: 'followers', Icon: FaInstagram, iconClass: 'text-pink-500' },
    { key: 'youtube', label: 'YouTube', unit: 'subscribers', Icon: FaYoutube, iconClass: 'text-red-500' },
    { key: 'facebook', label: 'Facebook', unit: 'followers', Icon: FaFacebookF, iconClass: 'text-blue-500' },
];

const OPTIMIZABLE_HOST = /(^|\.)torqueblock\.com$|\.postimg\.cc$|(^|\.)postimage\.me$/i;
const compactNumber = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

const toText = (value) => (typeof value === 'string' ? value.trim() : '');
const toHttpUrl = (value) => (/^https?:\/\//i.test(toText(value)) ? toText(value) : '');

function isOptimizable(url) {
    try {
        return OPTIMIZABLE_HOST.test(new URL(url).hostname);
    } catch {
        return false;
    }
}

function memberSince(value) {
    const date = value ? new Date(value) : null;
    return date && !Number.isNaN(date.getTime())
        ? date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
        : '';
}

function PartnerCard({ partner, className = '' }) {
    const name = toText(partner?.name);
    if (!name) return null;

    const type = PARTNER_TYPES[partner.partnerType] || PARTNER_TYPES.affiliate;
    const avatar = toHttpUrl(partner.profile?.url);
    const bikes = [...new Set([partner.bikeModel].flat().map(toText).filter(Boolean))];
    const location = [toText(partner.city), toText(partner.state)].filter(Boolean).join(', ');
    const about = toText(partner.experienceFeedback);
    const code = toText(partner.Coupon?.name);
    const since = memberSince(partner.joinedAt);
    const socials = SOCIALS
        .map((social) => ({ ...social, url: toHttpUrl(partner[social.key]?.link), followers: Number(partner[social.key]?.followers) || 0 }))
        .filter((social) => social.url);

    return (
        <article className={`flex flex-col overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.03] shadow-[0_24px_60px_-34px_rgba(0,0,0,0.9)] transition-colors duration-500 hover:border-orange-500/40 ${className}`}>
            <div aria-hidden="true" className="h-16 bg-[radial-gradient(circle_at_15%_0%,rgba(249,115,22,0.45),transparent_60%),linear-gradient(135deg,#1f2937,#0B0F19)]" />

            <div className="flex flex-1 flex-col px-4 pb-4">
                <div className="-mt-8 flex items-end justify-between gap-3">
                    <span aria-hidden="true" className="inline-flex shrink-0 rounded-full bg-gradient-to-br from-orange-500 to-amber-300 p-[2px]">
                        <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#0B0F19] text-xl font-black uppercase text-white">
                            {name.charAt(0)}
                            {avatar && isOptimizable(avatar) && (
                                <span className="absolute inset-0">
                                    <CustomImage src={avatar} alt="" fill sizes="64px" imageClassName="object-cover" />
                                </span>
                            )}
                        </span>
                    </span>

                    <span className={`mb-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ring-1 ${type.className}`}>
                        <type.Icon aria-hidden="true" className="h-3 w-3" />
                        {type.label}
                    </span>
                </div>

                <h3 className="mt-3 truncate text-lg font-bold text-white">{name}</h3>
                {(location || since) && (
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400">
                        {location && (
                            <span className="inline-flex items-center gap-1.5">
                                <FiMapPin aria-hidden="true" className="h-3 w-3 shrink-0" />
                                {location}
                            </span>
                        )}
                        {since && <span>TBRN since {since}</span>}
                    </p>
                )}

                {bikes.length > 0 && (
                    <ul aria-label="Rides" className="mt-3 flex flex-wrap gap-1.5">
                        {bikes.map((bike) => (
                            <li key={bike} className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-200 ring-1 ring-white/10">
                                <MdTwoWheeler aria-hidden="true" className="h-3.5 w-3.5 text-orange-500" />
                                {bike}
                            </li>
                        ))}
                    </ul>
                )}

                {about && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-300">{about}</p>}

                {socials.length > 0 && (
                    <ul className="mt-auto flex flex-wrap gap-2 pt-4">
                        {socials.map(({ key, label, unit, Icon, iconClass, url, followers }) => (
                            <li key={key}>
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    aria-label={`${name} on ${label}${followers ? `, ${compactNumber.format(followers)} ${unit}` : ''}`}
                                    className="flex items-center gap-2 rounded-lg bg-white/5 px-2 py-2 ring-1 ring-white/10 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-orange-500"
                                >
                                    <Icon aria-hidden="true" className={`h-4 w-4 ${iconClass}`} />
                                    {followers > 0 ? (
                                        <span className="text-xs leading-tight">
                                            <span className="block font-bold text-white">{compactNumber.format(followers)}</span>
                                            <span className="text-zinc-400">{unit}</span>
                                        </span>
                                    ) : (
                                        <span className="text-xs font-semibold text-zinc-300">{label}</span>
                                    )}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </article>
    );
}

export default PartnerCard;
