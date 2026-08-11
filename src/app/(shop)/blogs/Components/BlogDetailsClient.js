import Image from 'next/image';
import React from 'react';
import { HiClock, HiUser, HiCalendar, HiArrowLeft, HiTag, HiHashtag, HiChevronLeft } from 'react-icons/hi2';
import CustomImage from '@/components/molecules/CustomImage';
import WhatsAppButton from '@/components/atoms/WhatsAppButton';
import Link from 'next/link';
import FAQSection from '@/components/atoms/FAQSection';
import TyreSection from '../../Components/NewLaunchTyres';

function BlogDetailsClient({ blog }) {
    const { header, subHeader, content, image, editor, timeToRead, timeofCreation, tags } = blog || {};

    const formattedDate = timeofCreation
        ? new Date(timeofCreation).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className='space-y-6 pt-1'>
          
            <header className="relative w-full h-[320px] md:h-[480px] overflow-hidden rounded-2xl border border-white/10 group shadow-2xl">
                <CustomImage
                    src={image}
                    alt={header || 'Blog cover banner'}
                    fill
                    priority
                    sizes="100vw"
                    quality={100}
                    imageClassName="object-cover brightness-[0.85] group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />

                <div className="absolute inset-x-0 bottom-0 z-20 p-4 md:p-6 flex flex-col gap-3 justify-end h-full">
                    {blog?.category?.category && (
                        <span className="inline-flex items-center gap-1.5 w-fit px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(249,115,22,0.15)]">
                            <HiTag className="text-orange-400 text-xs md:text-sm shrink-0" />
                            <span>{blog.category.category}</span>
                        </span>
                    )}

                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-[1.15] text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-orange-400 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] max-w-4xl">
                        {header}
                    </h1>

                    <div className="flex flex-wrap items-center gap-3 text-zinc-300 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                        {editor && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
                                <HiUser className="text-orange-500 h-3.5 w-3.5" />
                                <span>{editor}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
                            <HiCalendar className="text-orange-500 h-3.5 w-3.5" />
                            <span>{formattedDate}</span>
                        </div>
                        {timeToRead && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
                                <HiClock className="text-orange-500 h-3.5 w-3.5" />
                                <span>{timeToRead} MIN READ</span>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
                <article className="space-y-4 shadow-xl">
                    {subHeader && (
                        <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10 backdrop-blur-md">
                            <p className="text-sm md:text-base font-medium italic text-zinc-200 leading-relaxed">
                                "{subHeader}"
                            </p>
                        </div>
                    )}

                    <div className="prose prose-invert prose-orange max-w-none text-zinc-300 text-sm md:text-base leading-relaxed">
                        {content?.content ? (
                            <div
                                dangerouslySetInnerHTML={{ __html: content.content }}
                                className="blog-content-styles"
                            />
                        ) : (
                            <p className="text-zinc-500 italic">No post content available.</p>
                        )}
                    </div>

                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-white/10">
                            <span className="text-xs font-black text-orange-500 uppercase tracking-widest mr-1 flex items-center gap-1">
                                <HiHashtag className="text-orange-400" /> Tags:
                            </span>
                            {tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1.5 rounded-full border border-white/10 bg-zinc-950 text-zinc-300 hover:text-white hover:border-orange-500/40 hover:bg-orange-500/10 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-default"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <FAQSection FaqData={blog?.faq} />
                </article>

                <aside className="space-y-6 lg:sticky lg:top-8">
                    <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-4 backdrop-blur-xl shadow-xl">
                        <TyreSection
                            categoryId=""
                            title="Recommended Tyres"
                            subtitle="Popular fitment options"
                            primaryColor="#f97316"
                        />
                    </div>

                                  {editor && (
                        <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-xl shadow-xl">
                            <h4 className="text-xs font-black text-orange-500 uppercase tracking-[0.2em] mb-4">Published By</h4>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 text-base font-bold uppercase shadow-[0_0_12px_rgba(249,115,22,0.15)]">
                                    {editor.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-white uppercase tracking-wide leading-none mb-1">{editor}</h4>
                                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Torque Block Editorial</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Explore More Card */}
                    <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-xl flex flex-col gap-4 shadow-xl">
                        <h4 className="text-xs font-black text-orange-500 uppercase tracking-[0.2em]">Explore More</h4>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                            Stay up-to-date with our latest insight articles, compound reviews, and expert advice.
                        </p>
                        <Link
                            href="/blogs"
                            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-zinc-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 text-xs font-bold uppercase tracking-wider transition-all duration-300"
                        >
                            <HiArrowLeft className="h-4 w-4" /> View All Articles
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default BlogDetailsClient;