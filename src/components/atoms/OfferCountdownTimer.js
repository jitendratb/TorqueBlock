"use client";

import React, { useState, useEffect } from 'react';
import { FaClock } from 'react-icons/fa';

export default function OfferCountdownTimer({ targetDate, label = "Offer Ends In", className = "" }) {
    const calculateTimeLeft = () => {
        if (!targetDate) return null;
        const difference = new Date(targetDate).getTime() - new Date().getTime();
        
        if (difference <= 0) return null;

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            const left = calculateTimeLeft();
            setTimeLeft(left);
            if (!left) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) return null;

    const pad = (n) => String(n).padStart(2, '0');

    return (
        <div className={`flex  items-center justify-center gap-1.5 px-2 lg:px-4 py-1 lg:py-2 rounded-xl border border-orange-500/40 bg-zinc-950/80 backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.2)] max-w-full box-border ${className}`}>
            <div className="flex items-center gap-1 shrink-0">
                <FaClock className="text-orange-400 text-xs shrink-0 drop-shadow-[0_0_6px_rgba(249,115,22,0.8)]" aria-hidden="true" />
                <span className="text-[7px] lg:text-xs font-black uppercase text-orange-300 tracking-wider">
                    {label}
                </span>
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1 font-mono text-[9px] lg:text-xs font-black text-white shrink-0">
                {timeLeft.days > 0 && (
                    <>
                        <span className="text-orange-400">{pad(timeLeft.days)}d</span>
                        <span className="text-orange-500/60 font-bold">:</span>
                    </>
                )}
                <span className="  text-amber-300">{pad(timeLeft.hours)}h</span>
                <span className="text-orange-500/60 font-bold">:</span>
                <span className=" text-amber-300">{pad(timeLeft.minutes)}m</span>
                <span className="text-orange-500/60 font-bold">:</span>
                <span className="text-orange-400">{pad(timeLeft.seconds)}s</span>
            </div>
        </div>
    );
}
