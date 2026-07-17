
import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn, FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa'

const brandLinks = [
    { label: "Pirelli Tyres", href: "brands/6638c9c05085dcdf58c8a783" },
    { label: "Michelin Tyres", href: "/brands/6638c9c65085dcdf58c8a789" },
    { label: "Metzeler Tyres", href: "brands/6638c9ba5085dcdf58c8a77b" },
]

const valuePerformance = [
    { label: 'MRF Tyres', href: '/brands/6a142fd08099d040cd948c1a' },
    { label: 'Apollo Tyres', href: '/brands/6638c9b95085dcdf58c8a777' },
    { label: 'Reise Tyres', href: '/brands/6638c9b85085dcdf58c8a775' },
    { label: 'Maxxis Tyres', href: '/brands/6638c885d83cd3e79e927275' },
    { label: 'Ceat Tyres', href: '/brands/6a143105bb2657ce6fd147ba' },
    { label: 'Vredestein Tyres', href: '/brands/6a0daceaf569a00d2be4eb4c' },
    { label: 'Eurogrip Tyres', href: '/brands/6a0eb930ecab7f46337aadbc' },
]

const helpLinks = [
    { label: 'Trending', href: '/trending' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'About Us', href: '/about' },
    { label: 'Shipping Policy', href: '/shipping-policy' },
    { label: 'Return Policy', href: '/return-policy' },
]
const operatingLinks = ['Bengaluru', 'Delhi', 'Pan-India Delivery & Fitment']

function Footer() {
    return (
        <footer className="bg-black border-t border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-12">
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-2">
                            <Image src="/newlogo.webp" alt="Torque Block Logo" width={130} height={120} priority className="inline-block h-auto w-[85px] lg:w-[130px]" style={{ height: 'auto' }} />
                        </Link>

                        <p className="text-zinc-400  text-sm max-w-md">
                            Torque Block is India’s premium destination for
                            performance motorcycle tyres. Discover the best
                            high performance tyres from Pirelli, Michelin, Metzeler,
                            and more.
                        </p>

                        <div className="mt-8 space-y-3">
                            <a href="tel:+916366625625" className="flex items-center gap-3 text-zinc-300 hover:text-white transition" >
                                <FaPhoneAlt className="text-sm" />
                                <span className="text-md">
                                    +91 6366 625 625
                                </span>
                            </a>

                            <a href="https://wa.me/916366625625" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-green-400 transition">
                                <FaWhatsapp className="text-lg" />
                                <span className="text-md">WhatsApp Us</span>
                            </a>

                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=ops@torqueblock.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-zinc-300 hover:text-white transition"
                            >
                                <FaEnvelope className="text-sm" />

                                <span className="text-md">
                                    ops@torqueblock.com
                                </span>
                            </a>

                            <div className="space-y-4 border-t border-zinc-900 pt-4">
                                <a href="https://share.google/4KLMb3GXpf429cCFn" target="_blank" rel="noopener noreferrer" className="flex items-start cursor-pointer gap-3 text-zinc-300 hover:text-white transition">
                                    <FaMapMarkerAlt className="mt-1 text-sm text-orange-500 shrink-0" />
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-wider text-orange-500 block mb-1">Bengaluru Hub</span>
                                        <p className="text-xs leading-5">
                                            8, Andree Rd, next to Bangalore Cafe, Bheemanna Garden, Shanti Nagar, Bengaluru, Karnataka 560027
                                        </p>
                                        <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-semibold text-orange-400 hover:text-orange-300 transition">
                                            View on Map <FaChevronRight className="text-[8px]" />
                                        </span>
                                    </div>
                                </a>

                                <a href="https://share.google/tUeXufqut8begnL9f" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-zinc-300 hover:text-white transition">
                                    <FaMapMarkerAlt className="mt-1 text-sm text-orange-500 shrink-0" />
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-wider text-orange-500 block mb-1">Delhi Hub</span>
                                        <p className="text-xs leading-5">
                                            Basement, Community Center, NH - 1, behind Block C, Naraina, New Delhi, Delhi 110028
                                        </p>
                                        <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-semibold text-orange-400 hover:text-orange-300 transition">
                                            View on Map <FaChevronRight className="text-[8px]" />
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-8">
                            {[
                                {
                                    icon: <FaInstagram />,
                                    href: 'https://www.instagram.com/torque_block',
                                    label: 'Instagram',
                                },
                                {
                                    icon: <FaFacebookF />,
                                    href: 'https://www.facebook.com/torqueblock',
                                    label: 'Facebook',
                                },
                                {
                                    icon: <FaYoutube />,
                                    href: 'https://www.youtube.com/@torqueblock',
                                    label: 'YouTube',
                                },
                                {
                                    icon: <FaLinkedinIn />,
                                    href: 'https://www.linkedin.com/company/torque-block',
                                    label: 'LinkedIn',
                                },
                            ].map((item, index) => (
                                <Link key={index} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`Follow Torque Block on ${item.label}`} className="h-11 w-11 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-300 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300" >
                                    {item.icon}
                                </Link>
                            ))}
                        </div>
                    </div>


                    <div className='flex flex-col gap-4'>
                        <div>
                            <h3 className="text-white font-semibold text-lg mb-3 lg:mb-4">
                                Ultimate Performance
                            </h3>

                            <ul className="space-y-3 lg:space-y-4">
                                {brandLinks.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.href} className="group flex items-center text-zinc-400 hover:text-orange-500 transition text-sm " >
                                            <FaChevronRight className="mr-2 text-xs group-hover:translate-x-1 transition" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        <div>
                            <h3 className="text-white font-semibold text-lg mb-3 lg:mb-4">
                                Value Performance
                            </h3>

                            <ul className="space-y-3 lg:space-y-4">
                                {valuePerformance.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.href} className="group flex items-center text-zinc-400 hover:text-orange-500 transition text-sm " >
                                            <FaChevronRight className="mr-2 text-xs group-hover:translate-x-1 transition" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    {/* SUPPORT */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-3 lg:mb-4">
                            Support
                        </h3>

                        <ul className="space-y-3 lg:space-y-4">
                            {helpLinks.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.href} className="group flex items-center text-zinc-400 hover:text-orange-500 transition text-sm " >
                                        <FaChevronRight className="mr-2 text-xs group-hover:translate-x-1 transition" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-white font-semibold text-lg mb-3 lg:mb-4">
                            Operating From:
                        </h3>

                        <ul className="space-y-3 lg:space-y-4">
                            {operatingLinks.map((item, index) => (
                                <li key={index}>
                                    <span className="text-zinc-400 text-sm">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

            <div className="border-t border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

                    <p className="text-zinc-400 text-sm">
                        © {new Date().getFullYear()} Torque Block.
                        All rights reserved.
                    </p>

                    <div className="flex items-center gap-6 text-sm text-zinc-400">

                        <Link
                            href="/privacy-policy"
                            className="hover:text-white transition"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="hover:text-white transition"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer