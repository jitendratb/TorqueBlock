'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram, FaFacebookF, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa'

const brandLinks = ['Pirelli', 'Michelin', 'Metzeler',]
const helpLinks = ['Contact Us', 'About Us', 'Shipping Policy', 'Return Policy',]
const operatingLinks = ['Bengaluru', 'Delhi', 'Pan-India Delivery & Fitment']

function Footer() {
    return (
        <footer className="bg-black border-t border-zinc-800">


            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-2">
                            <Image src="/newlogo.webp" alt="Torque Block Logo" width={130} height={120} priority className="inline-block h-auto w-[85px] lg:w-[130px]" />
                        </Link>

                        <p className="text-zinc-400  text-sm max-w-md">
                            Torque Block is India’s premium destination for
                            performance motorcycle tyres. Discover the best
                            high performance tyres from Pirelli, Michelin, Metzeler,
                            and more.
                        </p>

                        <div className="mt-8 space-y-5">
                            <a href="tel:+916366625625" className="flex items-center gap-3 text-zinc-300 hover:text-white transition" >
                                <FaPhoneAlt className="text-sm" />
                                <span className="text-sm">
                                    +91 6366 625 625
                                </span>
                            </a>

                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=ops@torqueblock.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-zinc-300 hover:text-white transition"
                            >
                                <FaEnvelope className="text-sm" />

                                <span className="text-sm">
                                    ops@torqueblock.com
                                </span>
                            </a>

                            <div className="flex items-start gap-3 text-zinc-300">
                                <FaMapMarkerAlt className="mt-1 text-sm" />
                                <span className="text-sm leading-6"> Bangalore, Karnataka, India </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-8">
                            {[
                                {
                                    icon: <FaInstagram />,
                                    href: 'https://www.instagram.com/torque_block',
                                },
                                {
                                    icon: <FaFacebookF />,
                                    href: 'https://www.facebook.com/torqueblock',
                                },
                                {
                                    icon: <FaYoutube />,
                                    href: 'https://www.youtube.com/@torqueblock',
                                },
                            ].map((item, index) => (
                                <Link key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="h-11 w-11 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-300 hover:bg-white hover:text-black transition-all duration-300" >
                                    {item.icon}
                                </Link>
                            ))}
                        </div>
                    </div>




                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">
                            Top Brands
                        </h3>

                        <ul className="space-y-4">
                            {brandLinks.map((item, index) => (
                                <li key={index}>
                                    <Link href="/" className="group flex items-center text-zinc-400 hover:text-white transition text-sm " >
                                        <FaChevronRight className="mr-2 text-xs group-hover:translate-x-1 transition" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* SUPPORT */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">
                            Support
                        </h3>

                        <ul className="space-y-4">
                            {helpLinks.map((item, index) => (
                                <li key={index}>
                                    <Link href="/" className="group flex items-center text-zinc-400 hover:text-white transition text-sm " >
                                        <FaChevronRight className="mr-2 text-xs group-hover:translate-x-1 transition" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">
                            Operating From:
                        </h3>

                        <ul className="space-y-4">
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

                    <p className="text-zinc-500 text-sm">
                        © {new Date().getFullYear()} Torque Block.
                        All rights reserved.
                    </p>

                    <div className="flex items-center gap-6 text-sm text-zinc-500">

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