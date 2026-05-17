"use client";

import WhatsAppButton from "@/components/atoms/WhatsAppButton";
import { FaWhatsapp, FaGoogle, FaTruck, FaAward, FaShieldAlt, } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import {
    FaCheckCircle,
    FaTags,
    FaHeadset,
    FaBolt
} from "react-icons/fa";

export default function TrustSection({tyre}) {
    const features = [
        {
            icon: <FaTruck />,
            title: "Pan India Delivery",
            description: "Fast & reliable delivery across India",
        },
        {
            icon: <FaAward />,
            title: "Best Price Guarantee",
            description: "Competitive pricing on genuine tyres",
        },
        {
            icon: <MdSupportAgent />,
            title: "Expert Support",
            description: "Performance tyre experts to guide you",
        },
        {
            icon: <FaShieldAlt />,
            title: "Secure & Safe",
            description: "Trusted support and secure communication",
        },
    ];

    return (
        <section className="">
            <div className="">
                <div className="overflow-hidden bg-white/[0.02] backdrop-blur-2xl border border-white/10">
                    <div className="p-4 md:p-8 flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-start gap-4 w-full">
                                    <div className="space-y-4 w-full">
                                        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-orange-500 font-bold text-center">
                                            Expert Assistance
                                        </p>

                                        <h2 className="text-sm md:text-xl md:text-3xl font-black leading-tight text-white text-center  w-full">
                                            Confirm Fitment & Availability on WhatsApp
                                        </h2>
                                    </div>

                                </div>

                                <p className="text-zinc-400 text-[10px] md:text-sm leading-relaxed w-full text-center">
                                    Share your bike model or tyre size and our experts
                                    will confirm the perfect fit, pricing, and
                                    delivery availability.
                                </p>

                            </div>


                            <div className="space-y-6">
                                <div className="w-full md:max-w-[450px] md:mx-auto">
                                    <WhatsAppButton text="Check Availability Before Stock Ends" value={` I'm interested in ${tyre?.productName} Please help me with • Tyre availabilit • Compatible tyre size • Bike fitment confirmatio • Price detail • Delivery timelin My Bike Model:`} />
                                </div>


                                <div
                                    className="flex flex-wrap justify-center items-center gap-5 text-sm text-zinc-400 " >

                                    <div className="flex items-center gap-2">
                                        <FaCheckCircle className="text-green-500 text-sm md:text-base" />
                                        <span>Genuine Tyres</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FaTags className="text-orange-500 text-sm md:text-base" />
                                        <span>Best Price</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FaHeadset className="text-blue-500 text-sm md:text-base" />
                                        <span>Expert Support</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs">
                                        <FaBolt className="text-yellow-500 text-sm md:text-base" />
                                        <span>Fast Response</span>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}