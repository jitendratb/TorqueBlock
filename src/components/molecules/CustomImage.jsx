"use client";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

const parseImageUrl = (img) => {
    if (!img) return '';
    if (typeof img === 'string') return img;
    if (typeof img === 'object' && img !== null) {
        if (img.url && typeof img.url === 'string') return img.url;

        const numericKeys = Object.keys(img)
            .filter(k => k !== '_id' && !isNaN(k))
            .sort((a, b) => Number(a) - Number(b));
        if (numericKeys.length > 0) {
            return numericKeys.map(k => img[k]).join('');
        }
    }
    return '';
};

export default function CustomImage({ src, alt = "image", width, height, fill = false, className = "", imageClassName = "", priority = false, sizes, quality = 100, skeletonClassName = "", fallback = "/fallback.webp", ...props }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const actualSrc = parseImageUrl(src);
    const safeSrc = (typeof actualSrc === "string" && actualSrc.trim()) ? actualSrc.trim() : fallback;
    const finalAlt = (alt && alt !== "image") ? alt : (typeof src === 'object' && src?.alt ? src.alt : alt);

    const defaultSizes = fill ? "100vw" : undefined;
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