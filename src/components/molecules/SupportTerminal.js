import React from "react";
import WhatsAppButton from "@/components/atoms/WhatsAppButton";

const SupportTerminal = ({ bikeBrand, bikeModel }) => {
    return (
        <section className="">
            <div className="relative p-12 md:p-32 bg-[#050505] border border-zinc-900 rounded-[4rem] flex flex-col md:flex-row justify-between items-center gap-16 overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.6)]">
            
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-500/10 blur-[150px] rounded-full pointer-events-none group-hover:bg-orange-500/20 transition-all duration-1000" />
                
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/50 to-transparent" />
                    <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/50 to-transparent" />
                    <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/50 to-transparent" />
                </div>

                <div className="space-y-8 relative z-10 text-center md:text-left max-w-3xl">
                    <div className="space-y-0">
                        <h2 className="text-[5rem] md:text-[10rem] font-black text-white/5 uppercase tracking-tighter leading-[0.7] mb-2 outline-text translate-x-[-4px]">
                            STILL
                        </h2>
                        <h2 className="text-[6rem] md:text-[12rem] font-black text-orange-500 uppercase tracking-tighter leading-[0.7] italic drop-shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                            LOST?
                        </h2>
                    </div>
                    <p className="text-zinc-500 text-xl md:text-3xl font-medium tracking-tight leading-tight max-w-xl">
                        Stop guessing the rubber. <br />
                        Chat with our <span className="text-white font-black underline decoration-orange-500/50 underline-offset-8">Performance Squad</span> now.
                    </p>
                </div>

                <div className="relative z-10 flex flex-col items-center md:items-end gap-6">
                    <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Consultant Live / System Ready</span>
                    </div>
                    <div className="hover:scale-105 transition-transform duration-500">
                        <WhatsAppButton 
                            text="TALK TO AN EXPERT" 
                            value={`Hi Torque Block! I'm looking for a pro-level tyre setup for my ${bikeBrand} ${bikeModel}. Can you help me find the best rubber for my riding style? 🏁`}
                            className="h-20 min-w-[320px] shadow-[0_20px_50px_rgba(249,115,22,0.2)]"
                        />
                    </div>
                    <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Avg. Response: 2 Mins</p>
                </div>
            </div>
        
        </section>
    );
};

export default SupportTerminal;
