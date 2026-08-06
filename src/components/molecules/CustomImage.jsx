"use client";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

export default function CustomImage({ src, alt = "image", width, height, fill = false, className = "", imageClassName = "", priority = false, sizes, quality = 90, skeletonClassName = "", fallback = "/fallback.webp", ...props }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const actualSrc = typeof src === 'object' && src !== null ? (src.url || '') : src;
    const safeSrc = (typeof actualSrc === "string" && actualSrc.trim()) ? actualSrc.trim() : fallback;
    const finalAlt = (alt && alt !== "image") ? alt : (typeof src === 'object' && src?.alt ? src.alt : alt);

    const defaultSizes = fill ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined;
    const finalSizes = sizes !== undefined ? sizes : defaultSizes;

    return (
        <div className={clsx("relative overflow-hidden", fill ? "w-full h-full" : "", className)} style={!fill ? { width, height } : undefined} >
            {loading && (
                <div className={clsx("absolute inset-0 animate-pulse bg-zinc-800", skeletonClassName)}>
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#999_1px,transparent_1px)] [background-size:16px_16px]" />
                </div>
            )}
            <Image src={error ? fallback : safeSrc} alt={finalAlt} fill={fill} width={!fill ? width : undefined} height={!fill ? height : undefined} priority={priority} quality={quality} sizes={finalSizes} className={clsx("duration-500 ease-in-out", loading ? "scale-105 blur-sm" : "scale-100 blur-0", imageClassName)}
                onLoad={() => setLoading(false)}
                onError={() => { setError(true); setLoading(false); }}    {...props} />
        </div>
    );
}