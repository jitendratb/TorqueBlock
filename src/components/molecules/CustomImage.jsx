"use client";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

export default function CustomImage({ src, alt = "image", width, height, fill = false, className = "", imageClassName = "", priority = false, sizes = "100vw", quality = 90, skeletonClassName = "", fallback = "/fallback.webp", ...props }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <div className={clsx("relative overflow-hidden", fill ? "w-full h-full" : "", className)} style={!fill ? { width, height } : undefined} >
            {loading && (
                <div className={clsx("absolute inset-0 animate-pulse bg-zinc-800", skeletonClassName)}>
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#999_1px,transparent_1px)] [background-size:16px_16px]" />
                </div>
            )}
            <Image src={error ? fallback : src} alt={alt} fill={fill} width={!fill ? width : undefined} height={!fill ? height : undefined} priority={priority} quality={quality} sizes={sizes} className={clsx("duration-500 ease-in-out", loading ? "scale-105 blur-sm" : "scale-100 blur-0", imageClassName)}
                onLoad={() => setLoading(false)}
                onError={() => { setError(true); setLoading(false); }}    {...props} />
        </div>
    );
}