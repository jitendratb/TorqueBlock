import WhatsAppButton from '@/components/atoms/WhatsAppButton';
import React from 'react';
import { FaCheckCircle, FaTags, FaHeadset, FaBolt } from 'react-icons/fa';

function TrustCard({ tyre }) {
    return (
        <div className="border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 lg:p-8 rounded-2xl flex flex-col lg:flex-row gap-8 items-center transition-colors hover:border-white/20 hover:bg-white/[0.04]">
            <div className="flex-1 space-y-6 text-center lg:text-left">
                <div className="space-y-3">
                    <p className="text-[10px] md:text-xs uppercase text-orange-500 font-bold">
                        Get a Free Expert Advice
                    </p>
                    <h2 className="text-2xl md:text-3xl font-black leading-tight text-white">
                        Confirm Fitment & Availability on WhatsApp
                    </h2>
                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        Share your bike model or tyre size and our experts will confirm the perfect fit, pricing, and delivery availability.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 md:gap-4 text-sm text-zinc-300">
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 transition-colors hover:bg-white/10 hover:border-white/10">
                        <FaCheckCircle className="text-green-500 text-sm md:text-base" />
                        <span className="font-medium text-xs">Genuine Tyres</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 transition-colors hover:bg-white/10 hover:border-white/10">
                        <FaTags className="text-orange-500 text-sm md:text-base" />
                        <span className="font-medium text-xs">Best Price</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 transition-colors hover:bg-white/10 hover:border-white/10">
                        <FaHeadset className="text-blue-500 text-sm md:text-base" />
                        <span className="font-medium text-xs">Expert Support</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 transition-colors hover:bg-white/10 hover:border-white/10">
                        <FaBolt className="text-yellow-500 text-sm md:text-base" />
                        <span className="font-medium text-xs">Fast Response</span>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-[350px] shrink-0 space-y-2">
              
                
                <WhatsAppButton
                    className="w-full shadow-lg shadow-green-500/10 transition-transform duration-300 hover:scale-[1.02]"
                    value={`I'm interested in ${tyre?.productName || 'this tyre'}. Please help me with:\n• Tyre availability\n• Compatible tyre size\n• Bike fitment confirmation\n• Price details\n• Delivery timeline\n\nMy Bike Model:`}
                    text="Check Fitment & Get Best Price"
                />
                <p className='text-[10px] text-zinc-500 text-center font-medium px-4'>
                    Get Instant Reply from our experts
                </p>
            </div>
        </div>
    );
}

export default TrustCard;