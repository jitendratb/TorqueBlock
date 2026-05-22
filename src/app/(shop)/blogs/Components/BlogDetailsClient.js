import Image from 'next/image';
import React from 'react'
import { HiClock, HiUser, HiCalendar, HiArrowLeft } from 'react-icons/hi2';
import WhatsAppButton from '@/components/atoms/WhatsAppButton';
import Link from 'next/link';

function BlogDetailsClient({ blog }) {
    const { header, subHeader, content, image, editor, timeToRead, timeofCreation, tags } = blog;
    const categoryName = blog.category?.category ?? 'Insights';

   

    const formattedDate = timeofCreation
        ? new Date(timeofCreation).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className='space-y-4 pt-2'>
            <div className="">
                <header className="relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-xl border border-white/10 group">
                    {image ? (
                        <Image
                            src={image}
                            alt={header || 'Blog cover banner'}
                            fill
                            priority
                            className="object-cover brightness-[0.8]"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />

                    <div className="absolute inset-x-0 bottom-0 z-20 p-4 md:p-8 flex flex-col justify-end h-full">
                        <span className="w-fit px-3 py-1 mb-4 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest backdrop-blur-sm shadow-inner">
                            {categoryName}
                        </span>

                        <h1 className="text-lg md:text-xl lg:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-orange-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] max-w-4xl">
                            {header}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-6 text-zinc-400 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                            {editor && (
                                <div className="flex items-center gap-1.5">
                                    <HiUser className="text-orange-500 h-4 w-4" />
                                    <span>{editor}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-1.5">
                                <HiCalendar className="text-orange-500 h-4 w-4" />
                                <span>{formattedDate}</span>
                            </div>
                            {timeToRead && (
                                <div className="flex items-center gap-1.5">
                                    <HiClock className="text-orange-500 h-4 w-4" />
                                    <span>{timeToRead} MIN READ</span>
                                </div>
                            )}
                        </div>
                    </div>
                </header>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-4 items-start">
                <article className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 md:p-8 backdrop-blur-xl">
                    {subHeader && (
                        <p className="text-sm md:text-lg font-medium italic text-zinc-300 border-l-4 border-orange-500 pl-4 mb-8 leading-relaxed">
                            {subHeader}
                        </p>
                    )}

                    <div className="prose prose-invert prose-orange max-w-none text-zinc-300 text-xs md:text-base leading-relaxed space-y-4">
                        {content?.content ? (
                            <div
                                dangerouslySetInnerHTML={{ __html: content.content }}
                                className="blog-content-styles"
                            />
                        ) : (
                            <p className="text-zinc-500 italic">No post content available.</p>
                        )}
                    </div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .blog-content-styles p {
                            margin-bottom: 1.5rem;
                            line-height: 1.75;
                            color: #d4d4d8;
                        }
                        .blog-content-styles h2 {
                            font-size: clamp(1rem, 2.5vw, 1.8rem);
                            font-weight: 900;
                            text-transform: uppercase;
                            color: #ffffff;
                            margin-top: 2.5rem;
                            margin-bottom: 1rem;
                            letter-spacing: -0.025em;
                            background: linear-gradient(to right, #fff, #a1a1aa);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                        }
                        .blog-content-styles h3 {
                            font-size: clamp(0.9rem, 2vw, 1.4rem);
                            font-weight: 800;
                            color: #ffffff;
                            margin-top: 2rem;
                            margin-bottom: 0.75rem;
                        }
                        .blog-content-styles ul, .blog-content-styles ol {
                            margin-left: 1.5rem;
                            margin-bottom: 1.5rem;
                        }
                        .blog-content-styles ul {
                            list-style-type: disc;
                        }
                        .blog-content-styles ol {
                            list-style-type: decimal;
                        }
                        .blog-content-styles li {
                            margin-bottom: 0.5rem;
                            line-height: 1.6;
                        }
                        .blog-content-styles strong {
                            color: #ffffff;
                            font-weight: 700;
                        }
                        .blog-content-styles blockquote {
                            border-left: 4px solid #f97316;
                            padding-left: 1.25rem;
                            font-style: italic;
                            color: #e4e4e7;
                            background-color: rgba(255, 255, 255, 0.02);
                            padding-top: 0.75rem;
                            padding-bottom: 0.75rem;
                            border-radius: 0 0.75rem 0.75rem 0;
                            margin: 1.5rem 0;
                        }
                        .blog-content-styles a {
                            color: #f97316;
                            text-decoration: underline;
                            font-weight: 600;
                            transition: color 0.2s;
                        }
                        .blog-content-styles a:hover {
                            color: #ea580c;
                        }
                        .blog-content-styles img {
                            border-radius: 1.5rem;
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            margin: 2rem auto;
                            max-width: 100%;
                            height: auto;
                            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                        }
                    `}} />

                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-8 pt-4 border-t border-zinc-800">
                            {tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-3.5 py-1.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/5 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-default"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </article>

                <aside className="space-y-4 lg:sticky lg:top-8">

                    <div className="relative rounded-3xl border border-orange-500/20 bg-zinc-900/60 backdrop-blur-2xl p-6 shadow-[0_20px_50px_rgba(249,115,22,0.1)] overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.12)_0%,transparent_70%)] pointer-events-none" />

                        <div className="relative z-10 flex flex-col gap-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full w-fit">
                                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
                                <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest">Connect With Experts</span>
                            </div>

                            <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-snug">
                                Need Advice on compounds?
                            </h3>

                            <p className="text-zinc-400 text-xs leading-relaxed">
                                {"Don't let speculation guide your ride. Reach out directly to our performance experts to claim your tailored fitment plan."}
                            </p>

                            <WhatsAppButton
                                text="Ask a Specialist"
                                value={`Hi Torque Block! I was reading your blog post "${header}" and wanted to ask some questions regarding tyre recommendations for my machine.`}
                                className="w-full mt-2"
                            />
                        </div>
                    </div>

                    {editor && (
                        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 backdrop-blur-xl">
                            <h4 className="text-xs font-black text-orange-500 uppercase tracking-[0.2em] mb-4">Published By</h4>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 text-base font-bold uppercase">
                                    {editor.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-white uppercase tracking-wide leading-none mb-1">{editor}</h4>
                                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Torque Block Editorial</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 backdrop-blur-xl flex flex-col gap-4">
                        <h4 className="text-xs font-black text-orange-500 uppercase tracking-[0.2em]">Explore More</h4>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                            Stay up-to-date with our latest insight articles, compound reviews, and expert advice.
                        </p>
                        <Link
                            href="/blogs"
                            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/5 text-xs font-bold uppercase tracking-wider transition-all duration-300"
                        >
                            <HiArrowLeft className="h-4 w-4" /> View All Articles
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default BlogDetailsClient;