'use client'

import Link from 'next/link'
import { FaArrowRight, FaCheckCircle, FaTruck, FaTools, FaWarehouse, } from 'react-icons/fa'

function B2BEnterpriseSection() {
    return (
        <section className="">
            <div className="relative">
                <div className=" gap-20 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 px-4 py-2 rounded-full mb-8">
                            <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                            <span className="text-orange-400 text-xs font-medium tracking-wide uppercase">
                                B2B Tyre Distribution
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black leading-[1.05] tracking-tight text-white">
                            Business & Workshop
                            <br />
                            Tyre Supply
                        </h2>

                        <p className="mt-4  text-zinc-400 text-sm">
                            Built for premium workshops, superbike garages,
                            performance tuners, and service centers across India.
                            Get priority tyre allocation, dealer pricing, and
                            nationwide logistics support.
                        </p>

                        <div className="mt-4 space-y-2">

                            {[
                                'Priority Tyre Allocation',
                                'Exclusive Partner Pricing',
                                'Pan-India Logistics Network',
                                'Fast Moving Superbikes Inventory',
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4"
                                >
                                    <div className="h-6 w-6 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                        <FaCheckCircle className="text-orange-500 text-sm" />
                                    </div>

                                    <span className="text-white  text-sm ">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default B2BEnterpriseSection