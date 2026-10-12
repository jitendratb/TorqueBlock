"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiLink, FiShare2 } from "react-icons/fi";
import { useToast } from "@/context/ToastContext";

const copyText = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        textarea.remove();
        return copied;
    }
};

export default function ShareButton({ title, getUrl = () => window.location.href, className = "" }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const toast = useToast();

    useEffect(() => {
        if (!isOpen) return;
        const handlePointerDown = (e) => {
            if (!menuRef.current?.contains(e.target)) setIsOpen(false);
        };
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const handleCopy = async () => {
        setIsOpen(false);
        if (await copyText(getUrl())) {
            toast.success("Product link copied");
        } else {
            toast.error("Couldn't copy the link");
        }
    };

    const handleWhatsApp = () => {
        setIsOpen(false);
        const message = `Check out ${title} on Torque Block:\n${getUrl()}`;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const url = isMobile
            ? `https://wa.me/?text=${encodeURIComponent(message)}`
            : `https://web.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div ref={menuRef} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-label="Share product"
                className={`flex items-center gap-2 rounded-lg border p-2 md:px-4 md:py-1.5 backdrop-blur-xl transition-all duration-300 cursor-pointer ${isOpen
                    ? "border-orange-500/50 bg-orange-500/15 text-orange-400"
                    : "border-white/40 md:border-white/15 bg-black/30 md:bg-white/5 text-white md:text-zinc-300 hover:border-orange-500/50 hover:text-orange-400"
                    }`}
            >
                <FiShare2 className="text-sm" aria-hidden="true" />
                <span className="hidden md:inline text-[10px] lg:text-xs font-black uppercase tracking-[0.2em]">Share</span>
            </button>

            {isOpen && (
                <div role="menu" className="absolute right-0 top-full mt-2 z-40 w-56 rounded-xl border border-white/10 bg-white/20 p-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                    <button
                        type="button"
                        role="menuitem"
                        onClick={handleCopy}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-bold text-zinc-200 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <FiLink className="shrink-0 text-base text-orange-400" aria-hidden="true" />
                        Copy Product Link
                    </button>
                    <button
                        type="button"
                        role="menuitem"
                        onClick={handleWhatsApp}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-bold text-zinc-200 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <FaWhatsapp className="shrink-0 text-base text-green-400" aria-hidden="true" />
                        Share on WhatsApp
                    </button>
                </div>
            )}
        </div>
    );
}
