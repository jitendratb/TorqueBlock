import WhatsAppButton from '@/components/atoms/WhatsAppButton';
import React from 'react';
import { FaCheckCircle, FaHeadset, FaBolt, FaGift } from 'react-icons/fa';

function TrustCard({ tyre }) {
    const productName = tyre?.availableTyres?.productName || tyre?.productName || 'Performance Tyre';
    const sizeLabel = tyre?.size || tyre?.sizeCode || '';
    const whatsappMessage = `Hi! I'm checking out the *${productName}*${sizeLabel ? ` (${sizeLabel})` : ''} on Torque Block. I'd like to confirm the fitment for my bike and claim the exclusive WhatsApp offer!\n\n• Bike Model & Year: \n• Current Tyre Size: `;

    return (
        <div className="border border-white/10 bg-white/10 backdrop-blur-sm p-4 lg:p-8 rounded-2xl flex flex-col lg:flex-row gap-4 items-center transition-colors hover:border-white/20 hover:bg-white/[0.04]">
            <div className="md:flex-1 space-y-6 text-center lg:text-left">
                <div className="space-y-3">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                        <FaGift className="text-orange-500" />
                        <span>Limited Time Offer</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black leading-tight text-white uppercase tracking-tight">
                        Unlock Special Pricing & Fitment Check
                    </h2>
                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        Don't risk a wrong fit! Connect with our technical experts on WhatsApp to guarantee 100% compatibility for your motorcycle and get an exclusive offer on your purchase today.
                    </p>
                </div>

                <div className="hidden md:flex md:flex-wrap md:justify-start gap-2 md:gap-4 text-xs text-zinc-300 ">
                    <div className="flex items-center gap-2 bg-white/5 px-2 py-2 lg:px-4 lg:py-2 rounded-full border border-white/5 transition-colors hover:bg-white/10 hover:border-white/10">
                        <FaCheckCircle className="text-green-500 text-xs md:text-base" />
                        <span className="font-medium text-[10px] lg:text-xs">Genuine Tyres</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-2 py-2 lg:px-4 lg:py-2 rounded-full border border-white/5 transition-colors hover:bg-white/10 hover:border-white/10">
                        <FaHeadset className="text-blue-500 text-xs lg:text-xs md:text-base" />
                        <span className="font-medium text-[10px] lg:text-xs">Expert Support</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-2 py-2 lg:px-4 lg:py-2 rounded-full border border-white/5 transition-colors hover:bg-white/10 hover:border-white/10">
                        <FaBolt className="text-yellow-500 text-xs lg:text-xs md:text-base" />
                        <span className="font-medium text-[10px] lg:text-xs">Fast Response</span>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-[350px] shrink-0 space-y-2 ">
                <WhatsAppButton
                    className="w-full h-12 shadow-lg shadow-green-500/10 transition-transform duration-300 hover:scale-[1.02]"
                    value={whatsappMessage}
                    text="Chat to Unlock Offer"
                />
                <p className='text-[10px] text-zinc-500 text-center font-medium px-4'>
                    Get instant confirmation from our tyre specialists
                </p>
            </div>
        </div>
    );
}

export default TrustCard;