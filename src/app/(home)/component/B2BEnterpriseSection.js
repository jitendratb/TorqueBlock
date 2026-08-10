
import Link from 'next/link'
import { FaArrowRight, FaCheckCircle, FaTruck, FaTools, FaWarehouse, FaBuilding } from 'react-icons/fa'

function B2BEnterpriseSection() {
    const listItems = [
        { text: 'Priority Tyre Allocation', icon: FaCheckCircle },
        { text: 'Exclusive Partner Pricing', icon: FaWarehouse },
        { text: 'Pan-India Logistics Network', icon: FaTruck },
        { text: 'Fast-Moving Superbike Inventory', icon: FaTools },
    ];

    return (
        <section className="">
            <div className="relative">
                <div className=" gap-20 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 [.light-mode_&]:border-orange-700/40 [.light-mode_&]:bg-orange-700/5 px-4 py-2 rounded-full mb-4 transition-colors duration-1000">
                            <FaBuilding className="text-orange-500 [.light-mode_&]:text-orange-700 text-xs" />
                            <span className="text-orange-400 [.light-mode_&]:text-orange-700 text-xs font-medium tracking-wide uppercase transition-colors duration-1000">
                                B2B Tyre Distribution
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black leading-[1.05] tracking-tight text-white [.light-mode_&]:text-zinc-900 transition-colors duration-1000">
                            Business & Workshop
                            <br />
                            Tyre Supply
                        </h2>

                        <p className="mt-4 text-zinc-400 [.light-mode_&]:text-zinc-800 text-sm transition-colors duration-1000">
                            Built for premium workshops, superbike garages,
                            performance tuners, and service centers across India.
                            Get priority tyre allocation, dealer pricing, and
                            nationwide logistics support.
                        </p>

                        <div className="mt-4 space-y-2">

                            {listItems.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="h-6 w-6 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center transition-colors duration-1000">
                                            <IconComponent className="text-orange-500 [.light-mode_&]:text-orange-700 text-xs transition-colors duration-1000" />
                                        </div>

                                        <span className="text-white [.light-mode_&]:text-zinc-900 text-sm transition-colors duration-1000">
                                            {item.text}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default B2BEnterpriseSection