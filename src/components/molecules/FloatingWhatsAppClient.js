'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { FaWhatsapp, FaPaperPlane, FaTimes } from 'react-icons/fa';

const formatAdminName = (email) => {
    if (!email) return "Torque Block Expert";
    const username = email.split('@')[0];
    return username.split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
};

const getHumanoidMessage = (msg) => {
    if (!msg) return "";

    let formatted = msg
        .replace(/whatsapp us now/gi, "let me know right here")
        .replace(/–/g, "")
        .replace(/-/g, "")
        .trim();

    if (formatted.toLowerCase().includes("not sure which tyre")) {
        return "Not sure which tyre is right for you? Just let me know and I'll help you pick the best one!";
    }

    if (formatted.toLowerCase().includes("get expert advice")) {
        return "Let me know your machine and riding style so I can give you some expert advice!";
    }

    return formatted;
};

const getFormattedTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
};

function FloatingWhatsAppClient({ data }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [unreadCount, setUnreadCount] = useState(1);
    const [statusText, setStatusText] = useState('Online');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const autoOpenTimer = useRef(null);
    const sequenceTimers = useRef([]);
    const chatEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    const clearTimers = () => {
        sequenceTimers.current.forEach(timer => clearTimeout(timer));
        sequenceTimers.current = [];
    };

    const startSequence = () => {
        if (messages.length > 0) return;

        clearTimers();

        setIsTyping(true);
        setStatusText('typing...');

        const t1 = setTimeout(() => {
            setIsTyping(false);
            setStatusText('Online');
            setMessages([{ id: 1, text: "Hello Sir", time: getFormattedTime() }]);

            const t2 = setTimeout(() => {
                setIsTyping(true);
                setStatusText('typing...');
            }, 800);
            sequenceTimers.current.push(t2);

            const t3 = setTimeout(() => {
                // setIsTyping(false);
                // setStatusText('Online');
                // setMessages(prev => [
                //     ...prev,
                //     {
                //         id: 2,
                //         text: "Not sure which tyre is right for you? Just let me know and I'll help you pick the best one!",
                //         time: getFormattedTime()
                //     }
                // ]);

                if (data?.message) {
                    const t4 = setTimeout(() => {
                        setIsTyping(true);
                        setStatusText('typing...');
                    }, 800);
                    sequenceTimers.current.push(t4);

                    const t5 = setTimeout(() => {
                        setIsTyping(false);
                        setStatusText('Online');
                        setMessages(prev => [
                            ...prev,
                            { id: 3, text: getHumanoidMessage(data.message), time: getFormattedTime() }
                        ]);
                    }, 6800);
                    sequenceTimers.current.push(t5);
                }
            }, 6800);
            sequenceTimers.current.push(t3);

        }, 3000);

        sequenceTimers.current.push(t1);
    };

    useEffect(() => {
        autoOpenTimer.current = setTimeout(() => {
            setIsOpen(true);
            setUnreadCount(0);
            startSequence();
        }, 4000);

        return () => {
            if (autoOpenTimer.current) clearTimeout(autoOpenTimer.current);
            clearTimers();
        };
    }, [data]);

    useEffect(() => {
        const scrollTimer = setTimeout(() => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTo({
                    top: chatContainerRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }, 100);
        return () => clearTimeout(scrollTimer);
    }, [messages, isTyping]);

    const handleToggle = () => {
        if (autoOpenTimer.current) {
            clearTimeout(autoOpenTimer.current);
        }
        const nextState = !isOpen;
        setIsOpen(nextState);
        if (nextState) {
            setUnreadCount(0);
            startSequence();
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();

        const baseMessage = `Hi Team Torque Block!,
        ${inputValue.trim() ? inputValue.trim() : "I’m enquiring about motorcycle tyres from the website."}`;
        const phoneNumber = "916366625625";
        const isMobile = /iPhone|iPad|iPod|Android/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : '');
        const url = isMobile
            ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(baseMessage)}`
            : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(baseMessage)}`;
        window.open(url, "_blank");
    };

    const HandleFormClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let message = `Hi, I’m enquiring about motorcycle tyres from the website.`;
        const phoneNumber = "916366625625";
        const isMobile = /iPhone|iPad|iPod|Android/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : '');
        const url = isMobile
            ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
            : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    }

    if (!mounted) return null;

    return (
        <div className="fixed bottom-3 lg:bottom-9 right-3 lg:right-9 z-[9999] font-[Inter,sans-serif] text-zinc-100 select-none">
            <div className={`
                absolute bottom-20 right-0 w-[350px] max-w-[calc(100vw-32px)] 
                rounded-3xl  bg-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.85)] 
                overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom-right
                ${isOpen
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-75 translate-y-10 pointer-events-none'
                }
            `}>
                <div className="relative px-5 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 flex items-center gap-3.5 border-b border-white/[0.06] shadow-md">
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-xs" />

                    <div className="relative z-10 w-11 h-11 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center overflow-hidden">
                        {data?.avatar ? (
                            <Image src={data.avatar} alt="Real Avatar" className="w-full h-full object-cover" fill sizes="44px" priority />
                        ) : (
                            <span className="text-lg font-black text-white select-none">
                                {(data?.name || formatAdminName(data?.adminemail))?.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </div>

                    <div className="relative z-10 flex-1 flex flex-col">
                        <span className="text-sm font-black uppercase tracking-tight text-white leading-none">
                            {data?.name || formatAdminName(data?.adminemail)}
                        </span>
                        <div className="flex items-center gap-1.5 mt-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${statusText === 'typing...' ? 'bg-orange-400 animate-pulse' : 'bg-green-400'}`} />
                            <span className="text-[10px] font-bold tracking-wide text-emerald-100 uppercase">{statusText}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="relative z-10 p-2 rounded-xl text-emerald-100 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                        aria-label="Minimize Chat"
                    >
                        <FaTimes size={16} />
                    </button>
                </div>

                <div
                    ref={chatContainerRef}
                    className="h-[240px] p-5 overflow-y-auto bg-zinc-900/60 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.06)_0%,transparent_70%)] flex flex-col gap-3 scrollbar-hide"
                >
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`relative max-w-[85%] rounded-2xl p-3.5  shadow-md animate-[slideUp_0.4s_ease-out_both] ${msg.isUser
                                ? 'rounded-tr-none bg-gradient-to-br from-emerald-600 to-teal-700 self-end'
                                : 'rounded-tl-none bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/5 self-start'
                                }`}
                        >
                            <p className={`leading-relaxed text-sm font-medium m-0 font-[Inter,sans-serif] pb-2 ${msg.isUser ? 'text-white' : 'text-zinc-300'}`}>
                                {msg.text}
                            </p>
                            <span className={`absolute right-3 bottom-1.5 text-[8px] font-bold uppercase tracking-wider ${msg.isUser ? 'text-emerald-100' : 'text-zinc-500'}`}>
                                {msg.time}
                            </span>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="max-w-[75%] rounded-2xl rounded-tl-none bg-zinc-900 border border-white/5 p-3 flex items-center gap-2 self-start animate-fade-in shadow-md">
                            <div className="flex gap-1 items-center py-1 px-1">
                                <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full dot-anim-1" />
                                <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full dot-anim-2" />
                                <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full dot-anim-3" />
                            </div>
                        </div>
                    )}

                    <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="p-3 border-t border-white/[0.06] bg-zinc-950 flex gap-2 items-center">
                    <input
                        type="text"
                        placeholder="Type message & ask expert..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-1 bg-zinc-900/90 border border-white/[0.08] hover:border-white/15 focus:border-emerald-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition-all"
                    />
                    <button
                        type="submit"
                        className="p-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white shadow-md shadow-emerald-500/10 hover:shadow-emerald-400/25 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center"
                        aria-label="Send Message"
                    >
                        <FaPaperPlane size={12} />
                    </button>
                </form>
            </div>

            <button
                onClick={HandleFormClick}
                className="relative cursor-pointer group w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_8px_30px_rgba(16,185,129,0.35)] flex items-center justify-center transition-all duration-300 active:scale-90"
                style={{ animation: 'float-gentle 4s ease-in-out infinite' }}
                aria-label="WhatsApp Support Chat"
            >
                {!isOpen && (
                    <>
                        <div className="radar-wave" />
                        <div className="radar-wave-delayed" />
                    </>
                )}

                {unreadCount > 0 && !isOpen && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-orange-500 text-[10px] font-black text-white flex items-center justify-center border-2 border-transparent animate-bounce shadow-md">
                        {unreadCount}
                    </span>
                )}

                <div className="transition-transform duration-300 group-hover:scale-110">
                    <FaWhatsapp size={28} />
                </div>
            </button>
        </div>
    );
}

export default FloatingWhatsAppClient;