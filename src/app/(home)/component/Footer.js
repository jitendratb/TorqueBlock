
import Image from 'next/image'
import Link from 'next/link'
import {
    FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn, FaPhoneAlt, FaWhatsapp,
    FaEnvelope, FaMapMarkerAlt, FaChevronRight, FaArrowRight, FaShoppingCart,
    FaLayerGroup, FaUsers, FaHeadset, FaShieldAlt, FaTruck, FaCreditCard, FaBuilding
} from 'react-icons/fa'
import brandServiceInstance from "@/services/brandService";

const shopLinks = [
    { label: 'Shop Tyres', href: '/tyres' },
    { label: 'Shop by Motorcycle', href: '/motorcycles' },
    { label: 'Compare Tyres', href: '/compare' },
]

const exploreLinks = [
    { label: 'TBRN (Rider Community)', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
]

const supportLinks = [
    { label: 'Shipping Policy', href: '/shipping-policy' },
    { label: 'Return Policy', href: '/return-policy' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
]

const trustBadges = [
    { icon: FaShieldAlt, label: '100% Genuine Products' },
    { icon: FaTruck, label: 'Pan-India Delivery' },
    { icon: FaCreditCard, label: 'Secure Payments' },
]

const socialLinks = [
    { icon: <FaInstagram />, href: 'https://www.instagram.com/torque_block', label: 'Instagram' },
    { icon: <FaFacebookF />, href: 'https://www.facebook.com/torqueblock', label: 'Facebook' },
    { icon: <FaYoutube />, href: 'https://www.youtube.com/@torqueblock', label: 'YouTube' },
    { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/company/torque-block', label: 'LinkedIn' },
]

const formatBrandLabel = (name = "") => {
    if (!name) return "";
    const trimmed = name.trim();
    if (trimmed.toLowerCase().endsWith("tyres")) {
        return trimmed;
    }
    const upper = trimmed.toUpperCase();
    if (upper === "MRF" || upper === "CEAT") {
        return `${upper} Tyres`;
    }
    return `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1).toLowerCase()} Tyres`;
};

const getBrandPriority = (name = "") => {
    const lower = name?.toLowerCase() || "";
    if (lower === 'pirelli') return 1;
    if (lower === 'michelin') return 2;
    if (lower === 'metzeler') return 3;
    if (lower.includes('eurogrip')) return 4;
    if (lower.includes('vredestein')) return 5;
    return 6;
};

const FooterLink = ({ href, children }) => (
    <li>
        <Link href={href} className="group flex w-full items-center gap-2.5 text-zinc-400 hover:text-orange-500 transition text-[15px]">
            <FaChevronRight className="text-[10px] text-zinc-600 group-hover:text-orange-500 group-hover:translate-x-0.5 transition" />
            {children}
        </Link>
    </li>
);

const ColumnHeading = ({ icon: Icon, children }) => (
    <div className="flex items-center gap-3 mb-6">
        <Icon className="text-2xl text-orange-500" />
        <h3 className="text-white font-bold text-xl">{children}</h3>
    </div>
);

async function Footer() {
    let brandLinks = [];

    try {
        const data = await brandServiceInstance.getBrands({ isActive: true });
        const sortedBrands = (data || []).sort(
            (a, b) => getBrandPriority(a?.name) - getBrandPriority(b?.name)
        );

        brandLinks = sortedBrands.map((brand) => ({
            label: formatBrandLabel(brand?.name),
            href: `/brands/${brand?.slug || brand?._id}`,
            id: brand?._id,
        }));
    } catch (error) {
        console.error("Error fetching brands in Footer:", error);
    }

    return (
        <footer className="bg-black/95 border-t border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 pt-16 md:pb-4 ">
                <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-4">


                    <div className="">
                        <Link href="/" className="inline-block mb-4">
                            <Image src="/newlogo.webp" alt="Torque Block Logo" width={130} height={120} priority className="h-auto w-[110px] lg:w-[150px]" style={{ height: 'auto' }} />
                        </Link>

                        <p className="text-zinc-400 text-[15px] leading-relaxed max-w-xs">
                            Premium &amp; Value Performance Motorcycle Tyres, delivered across India.
                        </p>

                        <div className="mt-6 space-y-3">
                            <a href="https://wa.me/916366625625?text=Hi%20Torque%20Block" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-green-400 transition">
                                <FaWhatsapp className="text-lg" />
                                <span className="text-[15px]">WhatsApp Us</span>
                            </a>

                            <a href="tel:+916366625625" className="flex items-center gap-3 text-zinc-300 hover:text-white transition">
                                <FaPhoneAlt className="text-sm" />
                                <span className="text-[15px]">+91 6366 625 625</span>
                            </a>

                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ops@torqueblock.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-white transition">
                                <FaEnvelope className="text-sm" />
                                <span className="text-[15px]">ops@torqueblock.com</span>
                            </a>
                        </div>

                        <div className="mt-6 space-y-4">
                            <a href="https://share.google/4KLMb3GXpf429cCFn" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-zinc-400 hover:text-white transition">
                                <FaMapMarkerAlt className="mt-1 text-sm text-orange-500 shrink-0" />
                                <div>
                                    <span className="text-[11px] font-black uppercase tracking-wider text-orange-500 block mb-1">Bengaluru Hub</span>
                                    <p className="text-xs leading-5">8, Andree Rd, next to Bangalore Cafe, Bheemanna Garden, Shanti Nagar, Bengaluru, Karnataka 560027</p>
                                    <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-semibold text-orange-400 hover:text-orange-300 transition">
                                        View on Map <FaChevronRight className="text-[8px]" />
                                    </span>
                                </div>
                            </a>

                            <a href="https://share.google/tUeXufqut8begnL9f" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-zinc-400 hover:text-white transition">
                                <FaMapMarkerAlt className="mt-1 text-sm text-orange-500 shrink-0" />
                                <div>
                                    <span className="text-[11px] font-black uppercase tracking-wider text-orange-500 block mb-1">Delhi Hub</span>
                                    <p className="text-xs leading-5">Basement, Community Center, NH - 1, behind Block C, Naraina, New Delhi, Delhi 110028</p>
                                    <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-semibold text-orange-400 hover:text-orange-300 transition">
                                        View on Map <FaChevronRight className="text-[8px]" />
                                    </span>
                                </div>
                            </a>
                        </div>

                        <div className="flex items-center gap-3 mt-8">
                            {socialLinks.map((item, index) => (
                                <Link key={index} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`Follow Torque Block on ${item.label}`} className="h-11 w-11 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-300 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300">
                                    {item.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex lg:justify-between flex-col gap-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* SHOP */}
                            <div className="space-y-2">
                                <ColumnHeading icon={FaShoppingCart}>Shop</ColumnHeading>
                                <ul className="space-y-2">
                                    {shopLinks.map((item, index) => (
                                        <FooterLink key={index} href={item.href}>{item.label}</FooterLink>
                                    ))}
                                </ul>
                                <Link href="/tyres" className="inline-flex items-center gap-2 text-orange-500 font-bold text-[15px] hover:gap-3 transition-all">
                                    View All Tyres <FaArrowRight className="text-sm" />
                                </Link>
                            </div>

                            {/* BRANDS */}
                            <div className="space-y-2">
                                <ColumnHeading icon={FaLayerGroup}>Brands</ColumnHeading>
                                <ul className="space-y-2">
                                    {brandLinks.slice(0, 5).map((item, index) => (
                                        <FooterLink key={item.id || index} href={item.href}>{item.label}</FooterLink>
                                    ))}
                                </ul>
                                <Link href="/brands" className="inline-flex items-center gap-2 text-orange-500 font-bold text-[15px] hover:gap-3 transition-all">
                                    View All Brands <FaArrowRight className="text-sm" />
                                </Link>
                            </div>

                            {/* EXPLORE */}
                            <div>
                                <ColumnHeading icon={FaUsers}>Explore</ColumnHeading>
                                <ul className="space-y-2">
                                    {exploreLinks.map((item, index) => (
                                        <FooterLink key={index} href={item.href}>{item.label}</FooterLink>
                                    ))}
                                </ul>

                                <div className="mt-4">
                                    <div className="flex flex-col items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3.5">
                                        <div className="flex items-start gap-3">
                                            <FaBuilding className="text-orange-500 text-lg mt-0.5 shrink-0" />
                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-white font-bold text-sm">B2B Dealer Portal</span>
                                                    <span className="text-[9px] font-black uppercase tracking-wider text-orange-400 bg-orange-500/15 rounded-full px-2 py-0.5">Coming Soon</span>
                                                </div>

                                            </div>
                                        </div>


                                        <p className="text-zinc-500 text-xs mt-0.5">For dealers and resellers</p>
                                    </div>
                                </div>
                            </div>

                            {/* SUPPORT */}
                            <div>
                                <ColumnHeading icon={FaHeadset}>Support</ColumnHeading>
                                <ul className="space-y-2">
                                    {supportLinks.map((item, index) => (
                                        <FooterLink key={index} href={item.href}>{item.label}</FooterLink>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-zinc-800">
                            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                <p className="text-zinc-400 text-xs md:text-sm">
                                    © {new Date().getFullYear()} Torque Block. All Rights Reserved.
                                </p>

                                <div className="hidden md:flex items-center gap-2 md:gap-4 flex-wrap justify-center">
                                    {trustBadges.map(({ icon: Icon, label }, index) => (
                                        <div key={index} className="flex items-center gap-2 text-zinc-400 text-xs">
                                            <Icon className="text-orange-500" />
                                            <span>{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>





                </div>
            </div>


        </footer>
    )
}

export default Footer
