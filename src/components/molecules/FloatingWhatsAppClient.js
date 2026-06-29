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

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const isDraggingRef = useRef(false);
    const dragStartPos = useRef({ x: 0, y: 0 });

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

    const HandleFormClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isDraggingRef.current) return;
        let message = `Hi, I’m enquiring about motorcycle tyres from the website.`;
        const phoneNumber = "916366625625";
        const isMobile = /iPhone|iPad|iPod|Android/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : '');
        const url = isMobile
            ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
            : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    }

    const handleDragStart = (e) => {
        if (e.type === 'mousedown') e.preventDefault();
        isDraggingRef.current = false;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        dragStartPos.current = {
            startX: clientX - position.x,
            startY: clientY - position.y,
            clickX: clientX,
            clickY: clientY,
        };

        const handleDragMove = (moveEvent) => {
            const currentX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
            const currentY = moveEvent.touches ? moveEvent.touches[0].clientY : moveEvent.clientY;

            if (Math.abs(currentX - dragStartPos.current.clickX) > 5 ||
                Math.abs(currentY - dragStartPos.current.clickY) > 5) {
                isDraggingRef.current = true;
            }

            setPosition({
                x: currentX - dragStartPos.current.startX,
                y: currentY - dragStartPos.current.startY,
            });
        };

        const handleDragEnd = () => {
            document.removeEventListener('mousemove', handleDragMove);
            document.removeEventListener('mouseup', handleDragEnd);
            document.removeEventListener('touchmove', handleDragMove);
            document.removeEventListener('touchend', handleDragEnd);

            setTimeout(() => {
                isDraggingRef.current = false;
            }, 100);
        };

        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
        document.addEventListener('touchmove', handleDragMove, { passive: false });
        document.addEventListener('touchend', handleDragEnd);
    };

    if (!mounted) return null;

    return (
        <div
            className="fixed bottom-3 lg:bottom-9 right-3 lg:right-9 z-[9999] font-[Inter,sans-serif] text-zinc-100 select-none"
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
            <button
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                onClick={HandleFormClick}
                className="relative cursor-pointer group w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_8px_30px_rgba(16,185,129,0.35)] flex items-center justify-center transition-all duration-300 active:scale-90"
                style={{ animation: 'float-gentle 4s ease-in-out infinite' }}
                aria-label="WhatsApp Support Chat"
            >

                <div className="radar-wave" />
                <div className="radar-wave-delayed" />




                <div className="transition-transform duration-300 group-hover:scale-110">
                    <FaWhatsapp size={28} />
                </div>
            </button>
        </div>
    );
}

export default FloatingWhatsAppClient;