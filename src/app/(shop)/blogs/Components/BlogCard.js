'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function BlogCard({ blog, size = 'standard', index = 0 }) {
  if (!blog) return null;

  const { image, header, subHeader, category, blogid, createdAt, date } = blog;
  const categoryName = category?.category ?? 'Guide';
  const slug = blogid?.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  const isFeatured = size === 'featured';

  const formattedDate = date || (createdAt ? new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : categoryName);

  return (
    <Link
      href={`/blogs/${slug}`}
      aria-label={`Read blog: ${header}`}
      className={`group flex flex-col gap-3 cursor-pointer no-underline text-inherit ${
        isFeatured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Rounded Top Image Container */}
      <div className={`relative w-full rounded-2xl overflow-hidden bg-zinc-900 ${isFeatured ? 'h-[240px] md:h-[300px]' : 'h-[200px]'}`}>
        {image ? (
          <Image
            src={image}
            alt={header ?? 'Blog cover'}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            priority={index < 3}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 text-zinc-600 text-2xl font-black">
            TB
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 px-1">
        <span className="text-xs font-bold text-orange-500 tracking-wide">
          {formattedDate}
        </span>

        <h3 className="text-base md:text-md font-black uppercase tracking-tight line-clamp-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-orange-400 bg-[length:200%_auto] bg-left group-hover:bg-right transition-[background-position] duration-700 ease-out">
          {header}
        </h3>

       
      </div>
    </Link>
  );
}
