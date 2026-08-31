"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
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

export default function CustomImage({ 
    src, 
    alt = "image", 
    width, 
    height, 
    fill = false, 
    className = "", 
    imageClassName = "", 
    priority = false, 
    sizes, 
    quality = 85, 
    skeletonClassName = "", 
    fallback = "/fallback.webp", 
    ...props 
}) {
    const [loading, setLoading] = useState(!priority);
    const [error, setError] = useState(false);
    const imgRef = useRef(null);

    const actualSrc = parseImageUrl(src);
    const safeSrc = (typeof actualSrc === "string" && actualSrc.trim()) ? actualSrc.trim() : fallback;
    const finalAlt = (alt && alt !== "image") ? alt : (typeof src === 'object' && src?.alt ? src.alt : alt);

    const defaultSizes = fill ? "100vw" : undefined;
    const finalSizes = sizes !== undefined ? sizes : defaultSizes;

    // Check if the image is already cached/complete on mount or when safeSrc changes (crucial for iOS Safari / priority images)
    useEffect(() => {
        setError(false);
        if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
            setLoading(false);
        }
    }, [safeSrc]);

    return (
        <div className={clsx("relative overflow-hidden", fill ? "w-full h-full" : "", className)} style={!fill ? { width, height } : undefined} >
            {loading && !error && !priority && (
                <div className={clsx("absolute inset-0 animate-pulse bg-zinc-800 pointer-events-none z-0", skeletonClassName)}>
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#999_1px,transparent_1px)] [background-size:16px_16px]" />
                </div>
            )}
            <Image 
                ref={imgRef}
                src={error ? fallback : safeSrc} 
                alt={finalAlt} 
                fill={fill} 
                width={!fill ? width : undefined} 
                height={!fill ? height : undefined} 
                priority={priority} 
                quality={quality} 
                sizes={finalSizes} 
                className={clsx(
                    "transition-opacity duration-300", 
                    loading ? "opacity-0" : "opacity-100", 
                    imageClassName
                )}
                onLoad={(e) => {
                    if (e.currentTarget?.naturalWidth > 0 || e.target?.naturalWidth > 0) {
                        setLoading(false);
                    }
                }}
                onError={() => { 
                    setError(true); 
                    setLoading(false); 
                }}    
                {...props} 
            />
        </div>
    );
}