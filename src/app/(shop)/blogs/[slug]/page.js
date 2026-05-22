import Breadcrumb from '@/components/atoms/BreadCrumb';
import blogService from '@/services/blogService';
import Link from 'next/link';
import React from 'react';

import BlogDetailsClient from '../Components/BlogDetailsClient';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const data = await blogService.getBlogById(slug);
    const blog = data?.blogData;
    return {
        title: blog?.metaTitle || `${blog?.header || 'Blog'} | Torque Black`,
        description: blog?.metaDescription || blog?.subHeader || 'Expert motorcycle tyre reviews, riding tips, and product guides.',
        keywords: blog?.metaKeyWords || 'motorcycle, tyres, riding, guides',
        openGraph: {
            title: blog?.metaTitle || blog?.header,
            description: blog?.metaDescription || blog?.subHeader,
            images: blog?.image ? [{ url: blog.image }] : [],
            type: 'article',
        }
    };
}

async function Blog({ params }) {
    const { slug } = await params;
    const data = await blogService.getBlogById(slug);
    const blog = data?.blogData;

    const breadcrumbItems = [
        { label: 'Blogs', href: '/blogs' },
        { label: slug.replace(/-/g, ' ') || 'Blog Post', isLast: true },
    ];

    if (!blog) {
        return (
            <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-zinc-950 text-white">
                <span className="text-6xl mb-6 animate-bounce"></span>
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 mb-4">
                    Blog Post Not Found
                </h1>
                <p className="text-zinc-500 max-w-md text-sm md:text-base mb-8">
                    {"We couldn't retrieve the blog post you are searching for. It might have been relocated or removed."}
                </p>
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-black text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-orange-500/20"
                >
                    <HiArrowLeft size={16} /> Return to Blogs
                </Link>
            </main>
        );
    }

 
    return (
        <main className="min-h-screen pb-2 font-[Inter,sans-serif] overflow-x-hidden">
            <div className="">
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <BlogDetailsClient blog={blog} />
        </main>
    );
}

export default Blog;